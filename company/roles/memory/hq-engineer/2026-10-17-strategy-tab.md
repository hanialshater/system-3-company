### 2026-10-17 · strategy-tab · hq-engineer
- did: Added /hq/strategy (Strategy tab) rendering company/strategy/master-plan.md via the Library loader and Markdown; as-of stale flag at 14 days
- learned: The Library links only backticked or markdown-link .md paths, so bare company/... paths are backticked first (src/lib/hq-strategy-server.ts)
- learned: Client components must not import fs-touching libs; keep pure logic apart from the *-server.ts file or Turbopack fails (src/lib/hq-strategy.ts)
- know: A production build needs HQ_PUBLIC=1 to show HQ; no outputFileTracingIncludes exists, HQ reads company/ via process.cwd() (next.config.mjs)
- open: HQ.tsx draws its own tab bar apart from HqTop.tsx, so each new tab goes in both (src/app/hq/HQ.tsx)
