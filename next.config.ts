import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Browser automation and local previews use the loopback IP while Next.js
  // advertises `localhost` by default. Without this explicit origin, Next 16
  // rejects the dev HMR WebSocket and client components never hydrate.
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: projectRoot
  },
  images: {
    // All SVGs are first-party Figma exports under public/figma-assets (trusted,
    // not user-uploaded). Allow the optimizer to serve them while forcing a
    // non-executable content disposition + a script-blocking CSP for safety.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};

export default nextConfig;
