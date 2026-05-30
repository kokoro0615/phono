#!/usr/bin/env node

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const candidateDocPath = path.join(rootDir, "docs", "figma-asset-candidates.md");
const nodeManifestPath = path.join(
  rootDir,
  ".Codex",
  "docs",
  "research",
  "phono-reproduction",
  "04-figma-node-manifest.md",
);
const fallbackDocPath = path.join(rootDir, "docs", "figma-node-url-routing.md");
const jsonManifestPath = path.join(rootDir, "public", "figma-assets", "manifest.json");
const markdownManifestPath = path.join(rootDir, "docs", "figma-asset-manifest.md");
const supportedFormats = new Set(["svg", "png"]);
const localEnvFiles = [".env.local", ".env.development.local", ".env"];

function parseArgs(argv) {
  const options = {
    dryRun: false,
    force: false,
    format: null,
    limit: null,
    node: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--format") {
      const value = argv[index + 1];
      if (!supportedFormats.has(value)) {
        throw new Error("--format must be svg or png");
      }
      options.format = value;
      index += 1;
    } else if (arg === "--limit") {
      const value = Number.parseInt(argv[index + 1], 10);
      if (!Number.isInteger(value) || value < 1) {
        throw new Error("--limit must be a positive integer");
      }
      options.limit = value;
      index += 1;
    } else if (arg === "--node") {
      const value = argv[index + 1];
      if (!value) {
        throw new Error("--node requires a node id");
      }
      options.node = normalizeNodeId(value);
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

function parseEnvLine(line) {
  const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
  if (!match) {
    return null;
  }

  const [, key, rawValue] = match;
  let value = rawValue;

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return { key, value };
}

async function loadLocalEnv() {
  for (const fileName of localEnvFiles) {
    const filePath = path.join(rootDir, fileName);
    if (!(await pathExists(filePath))) {
      continue;
    }

    const content = await readFile(filePath, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const entry = parseEnvLine(line);
      if (entry && !process.env[entry.key]) {
        process.env[entry.key] = entry.value;
      }
    }
  }
}

async function readSourceDocument() {
  let sourcePath = candidateDocPath;

  if (!(await pathExists(sourcePath))) {
    sourcePath = (await pathExists(nodeManifestPath)) ? nodeManifestPath : fallbackDocPath;
  }

  return {
    sourcePath,
    content: await readFile(sourcePath, "utf8"),
  };
}

function parseFigmaUrl(value) {
  const url = new URL(value);
  const pathParts = url.pathname.split("/").filter(Boolean);
  const fileKey = pathParts[1];
  const nodeFromQuery = url.searchParams.get("node-id");

  if (!fileKey || !nodeFromQuery) {
    return null;
  }

  return {
    fileKey,
    nodeId: normalizeNodeId(nodeFromQuery),
  };
}

function normalizeNodeId(value) {
  return decodeURIComponent(value).replace(/-/g, ":");
}

function safeNodeId(nodeId) {
  return nodeId.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function slugify(value) {
  const slug = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/export_as_(svg|png)/gi, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "figma-asset";
}

function extractSourceFileKey(content) {
  const sourceMatch = content.match(/Source file:\s*`([^`]+)`/i);
  return sourceMatch ? sourceMatch[1] : null;
}

function formatsForLine(line) {
  const formats = [];
  if (line.includes("EXPORT_AS_SVG")) {
    formats.push("svg");
  }
  if (line.includes("EXPORT_AS_PNG")) {
    formats.push("png");
  }
  return formats;
}

function extractFigmaUrls(line) {
  return [...line.matchAll(/https:\/\/www\.figma\.com\/[^\s)`|]+/g)].map((match) => match[0]);
}

function extractNodeIds(line) {
  return [...line.matchAll(/`([0-9]+[:\-][0-9]+)`/g)].map((match) => normalizeNodeId(match[1]));
}

function parseCandidates(content) {
  const fallbackFileKey = extractSourceFileKey(content);
  const candidates = [];
  let heading = "figma-asset";

  content.split(/\r?\n/).forEach((line, index) => {
    const headingMatch = line.match(/^#+\s+(.+)$/);
    if (headingMatch) {
      heading = headingMatch[1];
    }

    const formats = formatsForLine(line);
    if (formats.length === 0) {
      return;
    }

    const tableCells = line.startsWith("|")
      ? line
          .slice(1, -1)
          .split("|")
          .map((cell) => cell.trim())
      : [];
    const name = tableCells[1]?.replace(/`/g, "") || heading;
    const figmaUrl = tableCells[2]?.replace(/`/g, "") || null;
    const usedIn = tableCells[6]
      ? tableCells[6]
          .split(/<br\s*\/?>|,/i)
          .map((item) => item.replace(/`/g, "").trim())
          .filter(Boolean)
      : [];

    const urls = extractFigmaUrls(line);
    const parsedTargets = urls.map(parseFigmaUrl).filter(Boolean);

    if (parsedTargets.length === 0 && fallbackFileKey) {
      parsedTargets.push(
        ...extractNodeIds(line).map((nodeId) => ({
          fileKey: fallbackFileKey,
          nodeId,
        })),
      );
    }

    for (const target of parsedTargets) {
      for (const format of formats) {
        const slug = slugify(name || line.replace(/\|/g, " ") || heading);
        const extension = format;
        const relativePath = `/figma-assets/${format}/${slug}--${safeNodeId(target.nodeId)}.${extension}`;
        const outputPath = path.join(rootDir, "public", relativePath);

        candidates.push({
          fileKey: target.fileKey,
          figmaUrl: figmaUrl || urls[0] || "",
          format,
          line: index + 1,
          localPath: relativePath,
          name,
          nodeId: target.nodeId,
          outputPath,
          slug,
          usedIn,
        });
      }
    }
  });

  return candidates;
}

function applyFilters(candidates, options) {
  let filtered = candidates;

  if (options.format) {
    filtered = filtered.filter((candidate) => candidate.format === options.format);
  }

  if (options.node) {
    filtered = filtered.filter((candidate) => candidate.nodeId === options.node);
  }

  if (options.limit) {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}

function exportUrl(fileKey, nodeIds, format) {
  const url = new URL(`https://api.figma.com/v1/images/${fileKey}`);
  url.searchParams.set("ids", nodeIds.join(","));
  url.searchParams.set("format", format);

  if (format === "svg") {
    url.searchParams.set("svg_outline_text", "true");
  } else if (format === "png") {
    url.searchParams.set("scale", "2");
  }

  return url;
}

async function fetchJson(url, token) {
  const response = await fetch(url, {
    headers: {
      "X-Figma-Token": token,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma image export failed with HTTP ${response.status}`);
  }

  return response.json();
}

async function downloadFile(url, outputPath) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Asset download failed with HTTP ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, bytes);
}

function groupCandidates(candidates) {
  const groups = new Map();

  for (const candidate of candidates) {
    const key = `${candidate.fileKey}:${candidate.format}`;
    const group = groups.get(key) || {
      fileKey: candidate.fileKey,
      format: candidate.format,
      items: [],
    };
    group.items.push(candidate);
    groups.set(key, group);
  }

  return [...groups.values()];
}

async function filterExisting(candidates, force) {
  const result = [];

  for (const candidate of candidates) {
    if (!force && (await pathExists(candidate.outputPath))) {
      console.log(`skip existing ${candidate.localPath}`);
      continue;
    }
    result.push(candidate);
  }

  return result;
}

async function syncAssets(candidates, token) {
  const downloaded = [];

  for (const group of groupCandidates(candidates)) {
    const nodeIds = [...new Set(group.items.map((item) => item.nodeId))];
    const payload = await fetchJson(exportUrl(group.fileKey, nodeIds, group.format), token);

    for (const item of group.items) {
      const temporaryUrl = payload.images?.[item.nodeId];
      if (!temporaryUrl) {
        console.warn(`missing export URL for ${item.nodeId}`);
        continue;
      }

      await downloadFile(temporaryUrl, item.outputPath);
      downloaded.push({
        fileKey: item.fileKey,
        figmaUrl: item.figmaUrl,
        format: item.format,
        localPath: item.localPath,
        name: item.name,
        nodeId: item.nodeId,
        slug: item.slug,
        status: "downloaded",
        usedIn: item.usedIn,
      });
      console.log(`downloaded ${item.localPath}`);
    }
  }

  return downloaded;
}

async function readExistingJsonManifest() {
  if (!(await pathExists(jsonManifestPath))) {
    return { assets: [] };
  }

  return JSON.parse(await readFile(jsonManifestPath, "utf8"));
}

function mergeManifest(existingManifest, downloaded) {
  const byKey = new Map();

  for (const asset of existingManifest.assets || []) {
    byKey.set(`${asset.format}:${asset.nodeId}:${asset.localPath}`, asset);
  }

  for (const asset of downloaded) {
    byKey.set(`${asset.format}:${asset.nodeId}:${asset.localPath}`, {
      ...asset,
      notes: "",
      status: "downloaded",
      updatedAt: new Date().toISOString(),
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    assets: [...byKey.values()].sort((a, b) => a.localPath.localeCompare(b.localPath)),
  };
}

function toMarkdownManifest(manifest) {
  const rows = manifest.assets
    .map(
      (asset) =>
        `| ${asset.name || asset.slug || asset.nodeId} | \`${asset.nodeId}\` | ${asset.format} | \`${asset.localPath}\` | ${(asset.usedIn || []).map((item) => `\`${item}\``).join(", ") || "-"} | ${asset.status || "downloaded"} | ${asset.notes || ""} |`,
    )
    .join("\n");

  return [
    "# Figma Asset Manifest",
    "",
    `Generated at: ${manifest.generatedAt}`,
    "",
    "| Asset | Figma Node | Format | Local Path | Used In | Status | Notes |",
    "|---|---|---|---|---|---|---|",
    rows || "| - | - | - | - | - | - | No downloaded assets yet. |",
    "",
  ].join("\n");
}

async function writeManifests(downloaded) {
  if (downloaded.length === 0) {
    return;
  }

  const existingManifest = await readExistingJsonManifest();
  const manifest = mergeManifest(existingManifest, downloaded);
  await mkdir(path.dirname(jsonManifestPath), { recursive: true });
  await mkdir(path.dirname(markdownManifestPath), { recursive: true });
  await writeFile(jsonManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(markdownManifestPath, toMarkdownManifest(manifest));
}

function printPlan(sourcePath, candidates) {
  console.log(`source ${path.relative(rootDir, sourcePath)}`);
  console.log(`planned ${candidates.length} asset(s)`);

  for (const candidate of candidates) {
    console.log(
      `${candidate.format} ${candidate.fileKey} ${candidate.nodeId} -> ${candidate.localPath}`,
    );
  }
}

async function main() {
  await loadLocalEnv();

  const options = parseArgs(process.argv.slice(2));
  const { sourcePath, content } = await readSourceDocument();
  const candidates = applyFilters(parseCandidates(content), options);

  if (options.dryRun) {
    printPlan(sourcePath, candidates);
    return;
  }

  const pending = await filterExisting(candidates, options.force);
  if (pending.length === 0) {
    console.log("no assets to sync");
    return;
  }

  if (!process.env.FIGMA_ACCESS_TOKEN) {
    console.error("FIGMA_ACCESS_TOKEN is required for asset sync. No files were created.");
    process.exitCode = 1;
    return;
  }

  const downloaded = await syncAssets(pending, process.env.FIGMA_ACCESS_TOKEN);
  await writeManifests(downloaded);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
