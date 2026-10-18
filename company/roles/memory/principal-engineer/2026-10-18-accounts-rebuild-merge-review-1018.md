### 2026-10-18 · accounts-rebuild-merge-review-1018 · principal-engineer
- did: Tier-2 merge review of accounts rebuild 29a75310d; ran test:accounts on throwaway PG16, built-route, browser and flow probes; record written
- learned: A per-lesson 'delta' that sends the slug's stored entry re-uploads pre-sign-in history; check what a sink sends, not its name (src/kit/progress.ts)
- learned: fetch cache:no-store bypasses a server max-age; a cacheable 404 claim needs a reload probe (src/lib/account-client.ts)
- learned: tools/kudos.mjs add writes company/ops/events.jsonl; under a no-events.jsonl brief, put kudos in the record instead (tools/kudos.mjs)
- know: Turbopack refuses a node_modules symlink outside the repo root; build a baseline inside the worktree via git archive (company/engineering/reviews/2026-10-18-accounts-rebuild-review.md)
- know: Isolation hook blocks su; setpriv --reuid=postgres runs initdb/pg_ctl (company/engineering/reviews/2026-10-18-accounts-rebuild-review.md)
- open: MC1-MC4 before merge, PC1-PC8 before staff preview, CI amendment for test:accounts (company/engineering/reviews/2026-10-18-accounts-rebuild-review.md)
