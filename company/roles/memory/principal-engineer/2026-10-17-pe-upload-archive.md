### 2026-10-17 · pe-upload-archive · principal-engineer
- did: Reviewed a10b3c1f deploy diagnostics + HQ turbopackIgnore; approved override of my trace-excludes Q2; added --archive=tgz to prebuilt upload; rulings R1-R3 in the note
- learned: vercel 63.1.2 packs prebuilt output into chunked tgz parts with --archive=tgz; same advice for too_many_files, api-upload-*, payload too large (node_modules/vercel/dist/chunks/chunk-GNY6U33Z.js)
- learned: The exclude list fixed .vercelignore collisions but not whole-repo tracing; measure traces before calling a config sufficient (company/engineering/reviews/2026-10-17-deploy-upload-failure.md)
- know: HQ_PUBLIC=1 on a Vercel deploy is now unsupported and needs an EDD; supersedes trace-excludes C3 (company/engineering/reviews/2026-10-17-deploy-upload-failure.md)
- open: principal-engineer-ops readiness approval, founder-approved deploy proof; if it succeeds the original cause stays unconfirmed (company/engineering/readiness/2026-10-17-deploy-upload-failure.md)
