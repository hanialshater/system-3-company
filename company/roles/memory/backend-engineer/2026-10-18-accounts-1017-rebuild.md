### 2026-10-18 · accounts-1017-rebuild · backend-engineer
- did: Rebuilt EDD-008 accounts (lost branch) plus PRD-005 likes/saves on accounts-1017: migrations 001/002, Better Auth magic link, progress rows, export, deletion, counts; 42 accounts tests on local PG 16, both builds pass
- learned: Better Auth caches a schema mismatch until the instance restarts; migrate before the deploy that turns accounts on (company/engineering/notes/2026-10-17-accounts-hand-qa.md)
- learned: initdb refuses root and the session scratch tree is root-only with reset perms; run the throwaway cluster as postgres under /var/tmp (company/engineering/notes/2026-10-17-accounts-hand-qa.md)
- know: Settings-lane compat: accountUserId, query, accountsEnabled are exported from src/lib/server/account-route.ts; export/deletion handle a settings table if present (company/engineering/edd/EDD-008-accounts-and-server-progress.md)
- know: Full upload on every load was dropped: explicit merge, per-load pull, deltas; a delta lost offline at tab close waits for the next merge (company/engineering/edd/EDD-008-accounts-and-server-progress.md)
- open: Privacy re-read of the rebuild and the migration 002 schema diff; principal merge review; readiness approval (company/engineering/readiness/2026-10-16-accounts.md)
- open: vercel.json functions regions fra1 for account routes (W-1149) and browser-cookie check not rebuilt (company/engineering/readiness/2026-10-16-accounts.md)
