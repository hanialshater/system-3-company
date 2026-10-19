### 2026-10-18 · accounts-pc10-reread3-1018 · principal-engineer
- did: Re-read PC10 fix 96e8654fc code-first; test:accounts 62/66 on PG16; server-only mutant fails 30,C12-C14; probed S18 scanner with 10 cases; appended third re-read
- learned: A taint scan that follows named fields misses the whole object that holds them (knownMe, AccountState carry tag and email); probe whole-object sends (tests/accounts/tag-scan.mjs)
- learned: Mutating only the server check (boundWrite always passes) shows whether binding tests test the server, not the client refusing (src/lib/server/account-api.ts)
- know: Worktrees have no node_modules; symlink the main checkout's for tests only, remove before commit; chained setpriv with variables is refused by the isolation hook, run each command plainly (company/engineering/reviews/2026-10-18-accounts-rebuild-review.md)
- open: PC11 S18 limits (backend-engineer); privacy A8.2 ruling and D23; Like/Save not gated on merge answer, note for controls wiring (company/engineering/reviews/2026-10-18-accounts-rebuild-review.md)
