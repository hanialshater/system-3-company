### 2026-10-18 · accounts-fix-reread-1018 · principal-engineer
- did: Re-read accounts fixes de5ff7013 code-first; reran test:accounts/platform on PG16, built off-server tests 31/34, first-load; two client-harness probes; appended Re-read section
- learned: Better Auth verify takes callbackURL as an editable query param and accepts any same-origin path, so a URL marker set at start proves nothing about who signed in (src/lib/server/account-api.ts)
- learned: A memoised ready promise reset on sign-out with no starter hangs a remounted consumer; probe remount after reset (src/lib/account-client.ts)
- know: client-sync harness (fresh module copy per page load) is the cheap way to probe client flows against real handlers; copy it to a temp test file, delete after (tests/accounts/client-sync.test.mjs)
- open: PC3 account binding, PC9 remount hang, PC5/PC6, D23 and W-1710 before preview-on (company/engineering/reviews/2026-10-18-accounts-rebuild-review.md)
