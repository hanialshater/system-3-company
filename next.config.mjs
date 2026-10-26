import path from "node:path";
import { flagOnBuildRefusal } from "./tools/lib/lesson-frames.mjs";

// Worktrees live inside the main checkout (.claude/worktrees/<name>) and symlink its node_modules.
// Turbopack refuses files outside its root, so the root is the main checkout in both cases.
// See company/rituals/records/2026-10-12-eng-review.md.
const cwd = process.cwd();
const marker = `${path.sep}.claude${path.sep}worktrees${path.sep}`;
const root = cwd.includes(marker) ? cwd.slice(0, cwd.indexOf(marker)) : cwd;

// Lesson frames pilot, O1 (company/decisions/2026-10-26-lesson-frames-gate-scope.md): a build with the flag on refuses
// a manifest that is stale or otherwise fails the gate's rules. A flag-off build never reads the manifest.
const framesRefusal = flagOnBuildRefusal();
if (framesRefusal) throw new Error(framesRefusal);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Separate build dirs let parallel agents build without clobbering each other.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  turbopack: { root },
  // Lesson frames pilot: always define the flag, so an unset flag is the constant "off" and DemoHost's frame branch
  // folds away at build time (P4, company/engineering/reviews/2026-10-25-content-hub-production-review.md).
  env: { NEXT_PUBLIC_LESSON_FRAMES: process.env.NEXT_PUBLIC_LESSON_FRAMES === "pilot-50" ? "pilot-50" : "off" },
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
