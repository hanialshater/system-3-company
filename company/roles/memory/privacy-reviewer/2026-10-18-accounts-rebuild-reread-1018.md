### 2026-10-18 · accounts-rebuild-reread-1018 · privacy-reviewer
- did: Re-read rebuild 29a75310d (flags off): M1-M6 met, PRD-005 merge rows met; wrote review and data-inventory D20-D22 plus status delta
- learned: Progress sink pushes the whole local entry per slug, so Don't import is undone for touched slugs and a second account on a shared device inherits the first's entries (src/kit/progress.ts, src/lib/account-client.ts)
- learned: No Like/Save/count UI exists yet, so C4.2, C2.5 and Q1.1 are untestable until it is built (src/lib/account-client.ts)
- know: Postgres tests were not run by me (no server); static S14 fails only for missing node_modules (tests/accounts/static.test.mjs)
- know: Verdict and conditions live in company/reviews/_privacy/2026-10-18-accounts-rebuild-reread.md
- open: P-1/P-2 fix by backend-engineer, then re-read the diff (company/reviews/_privacy/2026-10-18-accounts-rebuild-reread.md)
