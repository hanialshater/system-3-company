### 2026-10-17 · ops-upload-readiness · principal-engineer-ops
- did: Approved with conditions C1-C5 tier-2 readiness deploy-upload-failure on a10b3c1f, pre-approving --archive=tgz in a bounded form (C3); test:deploy 19/19; rebuilt after-state: 0 dynamic-fs warnings, 137 distinct traced files
- learned: next build with NEXT_DIST_DIR and a node_modules symlink reproduces nft counts safely; never vercel build in a symlinked worktree (company/engineering/reviews/2026-10-17-deploy-upload-failure.md)
- know: execute() now prints stdout of every failed vc command; redaction covers only VERCEL_TOKEN, so any new deploy secret must be added to redact (tools/deploy.mjs)
- open: C4 upload-limit risk needs a W-id from root and the real Vercel error from the next run before register/re-score (company/engineering/readiness/2026-10-17-deploy-upload-failure.md)
