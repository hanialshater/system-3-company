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
  // HQ routes read the working tree via process.cwd(), so output file tracing pulls in whatever
  // is on disk, including QA screenshots verify writes just before `vercel build`. Vercel fails
  // the deploy when a traced file matches .vercelignore (run 39032703960). Keep this list in step
  // with the .vercelignore entries that could be traced. HQ is gated off in production.
  // See company/engineering/reviews/2026-10-17-trace-excludes.md.
  outputFileTracingExcludes: {
    "*": [
      "artifacts/**",
      "test-results/**",
      "test-results-*/**",
      "playwright-report/**",
      ".next-*/**",
      ".claude/**",
      "company/ops/deployments/**",
    ],
  },
};
export default nextConfig;
