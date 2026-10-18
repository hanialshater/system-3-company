### 2026-10-17 · trace-excludes-readiness · principal-engineer-ops
- did: Approved with conditions C1-C4 the tier-2 readiness for next.config outputFileTracingExcludes (52db8a0a); rebuilt before/after myself: 18->0 nft files citing artifacts/ and ops/deployments, events trace unchanged
- learned: The worktree sandbox rejects compound or variable-bearing commands that mention git; run builds, greps and git as separate plain commands, and edit records with Edit instead of a python heredoc (company/engineering/readiness/2026-10-17-trace-excludes.md)
- know: Production deploy stages with --skip-domain and promotes only after smoke, so a failed Vercel step leaves the previous release live; the smoke does not hit /api/events (tools/deploy.mjs)
- open: C2 founder approval must cover the new r9 SHA; C4 untraceable HQ readers and the proposed trace-excludes risk need a W-id from root (company/engineering/readiness/2026-10-17-trace-excludes.md)
