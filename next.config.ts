import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
