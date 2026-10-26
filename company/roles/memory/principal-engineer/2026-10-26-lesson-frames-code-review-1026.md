### 2026-10-26 · lesson-frames-code-review-1026 · principal-engineer
- did: Code review of feat/lesson-frames-pilot (W-2097), O1 gate-scope decision (W-2104) and commit 3ef3619ca on the branch; four builder corrections accepted; Next fix routed to ship alone
- learned: verify is not on every release path: [deploy] commits build on Vercel with npm run build only, and --prebuilt builds with the pulled Vercel env, so a flag-dependent gate belongs in the build (vercel.json)
- learned: A CSP header with default-src 'none' and no script-src blocks inline import maps even when a meta CSP allows them by hash; both policies apply (company/engineering/reviews/2026-10-26-lesson-frames-code-review.md)
- know: The scratchpad volume is nearly full (about 1 GB free); one npm ci plus a next build is about 1.8 GB, so build one tree at a time and delete it (company/engineering/reviews/2026-10-26-lesson-frames-code-review.md)
- know: Board items created on a branch (W-2101..W-2104) are copied byte for byte to main before board moves, or IDs fork (company/ops/board.json)
- open: W-2107/W-2108 security deploy of exactly 80c847c55; W-2105 before merge; W-2106 globals.css in kit hash before prod flag-on (company/engineering/reviews/2026-10-26-lesson-frames-code-review.md)
