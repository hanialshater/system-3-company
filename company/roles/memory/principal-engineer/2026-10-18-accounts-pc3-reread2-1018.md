### 2026-10-18 · accounts-pc3-reread2-1018 · principal-engineer
- did: Re-read 7c7f488ad code-first; test:accounts 57/61 on PG16; reverted client to show C9-C11 fail; probes 3 (open tab) and 4 (rotation); appended second re-read section
- learned: A per-page-load binding check leaves an already-open tab writing with the new cookie; bind writes on the server, not only at load (company/engineering/reviews/2026-10-18-accounts-rebuild-review.md)
- learned: Better Auth 1.7.10 also reads versioned BETTER_AUTH_SECRETS; changing BETTER_AUTH_SECRET signs every session out (src/lib/server/auth.ts)
- know: Reverting only the client file to the parent proves client tests fail on old code; server can stay new (tests/accounts/client-sync.test.mjs)
- open: PC10 server-bound account writes + probe-3 test, D23 rotation wording; PC5/PC6/W-1710 before preview-on (company/engineering/reviews/2026-10-18-accounts-rebuild-review.md)
