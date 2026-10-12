import path from "node:path";

// Worktrees live inside the main checkout (.claude/worktrees/<name>) and symlink its node_modules.
// Turbopack refuses files outside its root, so the root is the main checkout in both cases.
// See company/rituals/records/2026-10-12-eng-review.md.
const cwd = process.cwd();
const marker = `${path.sep}.claude${path.sep}worktrees${path.sep}`;
const root = cwd.includes(marker) ? cwd.slice(0, cwd.indexOf(marker)) : cwd;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Separate build dirs let parallel agents build without clobbering each other.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  turbopack: { root },
};
export default nextConfig;
