### 2026-10-18 · accounts-fix-reread-1018 · privacy-reviewer
- did: Re-read beb83bfd4/de5ff7013: P-1, P-2 closed on reading (tests not run); ruled W-1710 (author default stands), login-CSRF cue required before go-live, added D23
- learned: No Postgres server and no node_modules in this worktree, so DB tests C4-C8 can only be read (tests/accounts/client-sync.test.mjs)
- learned: s3c:events:v1 is not restored at sign-out and still has no reader (src/lib/account-client.ts)
- know: Rulings are in section 2 of company/reviews/_privacy/2026-10-18-accounts-rebuild-reread.md
- open: Login-CSRF cue (merge screen names the account, one-line notice) needs words and wiring before go-live (src/components/account/AccountView.tsx)
