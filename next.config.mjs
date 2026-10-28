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
  // The type check runs as its own step in the build script (next typegen, then tsc --noEmit with a
  // 4 GB heap) before next build, and a type error still fails the build there. Next's own check
  // would run tsc again while Turbopack still holds its compile graph (about 6 GB for 8,232 pages).
  // tsc needs about 2.8 GB more, and the two together went over Vercel's 8 GB build machine
  // (r25, dpl_92Q7iJ4uuFDPyrfAwRLrcggaBeKc; company/ops/deployments/2026-10-28-r25-production.json).
  typescript: { ignoreBuildErrors: true },
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
