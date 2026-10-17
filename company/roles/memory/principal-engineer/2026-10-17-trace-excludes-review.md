### 2026-10-17 · trace-excludes-review · principal-engineer
- did: Approved with conditions the outputFileTracingExcludes diff 52db8a0a; ruling appended to company/engineering/reviews/2026-10-17-trace-excludes.md
- learned: Deploy writes artifacts/qa and the deployments record before the prebuilt vercel build, so HQ cwd readers trace them (tools/deploy.mjs)
- know: hqEnabled gates every HQ reader; catalog is the only non-HQ cwd reader, on content/curriculum (src/lib/hq.ts)
- open: C1 release-manager deploy proof; C2 platform-engineer vercelignore drift test (company/engineering/reviews/2026-10-17-trace-excludes.md)
