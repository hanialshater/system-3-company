### 2026-10-18 · accounts-mc4-readiness · principal-engineer-ops
- did: Approved with conditions (C1 verify incl qa on merged tree, C2 path-limited rollback) the accounts readiness for merge with all flags off on de5ff7013; re-ran A-17 test 31 on a built off server: pass; ruled error-code allow-list and R-d
- learned: next build with NEXT_DIST_DIR rewrites tsconfig.json include lines; restore it before committing (company/engineering/readiness/2026-10-16-accounts.md)
- learned: tests/accounts need --import ./tests/lifehacks/register.mjs; bare node --test fails on .ts imports (package.json)
- know: A-7 production-404 check moved from merge to first production deploy as D1/D2, release-manager (company/engineering/readiness/2026-10-16-accounts.md)
- know: Better Auth SchemaMismatchError code is SCHEMA_MISMATCH and is cached per instance; logFailure's 5-char regex drops it (src/lib/server/http.ts)
- open: Preview-on P1 real-browser cookie check and tests 32/33 on the preview SHA are mine with release-manager (company/engineering/readiness/2026-10-16-accounts.md)
- open: Register R-a once chief of staff gives a W-id; fold R-d into R-028 at next re-score (company/ops/risks.json)
