import { existsSync, readFileSync, rmSync } from "node:fs";
import { createServer } from "node:net";
import { join } from "node:path";
import { cwd, kill } from "node:process";

const port = Number(process.env.PORT ?? 3000);
const cleanCache = process.argv.includes("--clean-turbo-cache");

function isPidAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) {
    return false;
  }

  try {
    kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function getDevLock() {
  const lockPath = join(cwd(), ".next", "dev", "lock");

  if (!existsSync(lockPath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(lockPath, "utf8"));
  } catch {
    return { invalid: true };
  }
}

function assertPortAvailable(targetPort) {
  return new Promise((resolve, reject) => {
    const server = createServer();

    server.once("error", (error) => {
      reject(error);
    });

    server.once("listening", () => {
      server.close(resolve);
    });

    server.listen(targetPort, "127.0.0.1");
  });
}

function removeTurbopackCache() {
  const cachePath = join(cwd(), ".next", "dev", "cache", "turbopack");
  const logPath = join(cwd(), ".next", "dev", "logs", "next-development.log");

  rmSync(cachePath, { recursive: true, force: true });
  rmSync(logPath, { force: true });
}

const lock = getDevLock();

if (lock?.pid && isPidAlive(lock.pid)) {
  console.error(`Next dev server is already recorded in .next/dev/lock: pid=${lock.pid}, url=${lock.appUrl ?? "unknown"}`);
  console.error("Stop that process before starting a new dev server.");
  process.exit(1);
}

try {
  await assertPortAvailable(port);
} catch (error) {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Next would otherwise auto-select another port.`);
    console.error(`Find the process with: lsof -nP -iTCP:${port} -sTCP:LISTEN`);
    console.error("Then stop it, or run: PORT=3001 npm run dev");
    process.exit(1);
  }

  if (error.code === "EPERM") {
    console.error(`Cannot start the local dev server because this environment cannot bind 127.0.0.1:${port}.`);
    console.error(`Opening http://localhost:${port} will show ERR_CONNECTION_REFUSED until a dev server is actually listening.`);
    console.error("Run npm run dev from a terminal or container where local port binding is allowed.");
    process.exit(1);
  } else {
    throw error;
  }
}

if (cleanCache) {
  removeTurbopackCache();
  console.log("Removed .next/dev Turbopack cache and dev log.");
}
