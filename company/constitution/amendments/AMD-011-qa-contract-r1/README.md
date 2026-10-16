# AMD-011 companion: QA contract round 1

Evidence and code for `../AMD-011-qa-contract-r1.md`. Nothing here is the contract, and nothing here edits `tests/qa/**`.

| File | What |
|---|---|
| `tests-qa.amd011.diff` | The whole proposed protected change, against tests/qa at 4099918 (unchanged since 2026-10-12). Apply after ratification only, from the repo root: `patch -p1 < …`, under `S3_AMENDMENT=AMD-011`, with `Amendment: AMD-011` in the commit. Hunks by part: rule-3 lines = part 1; `test("reverse order never dead-ends")` = part 2; feed.spec.ts + `feedLessons()` in lessons.ts = part 3. |
| `checks.ts` | The same checks as plain functions (`rule3` with part 1 switchable; `orderCheck` = part 2 v3.1), used by the fixtures and the probe. |
| `fixture.spec.ts` | 7 fixtures, no server (`page.setContent`). They include a copy of long-cord-knots-itself's tap order at lhw3 5d9de52, which **must fail** part 2 (before and after W-1114) and which today's DOM-order rule 3 passes. |
| `probe.spec.ts`, `lessons.ts`, `playwright.config.ts` | The measurement: one phone page load per lesson, part 2 plus a part-1 census, with one JSON line per lesson. `lessons.ts` reads `LESSONS_ROOT` (the server's tree) and adds `feedLessons()` for part 3. |
| `probe-v31.jsonl` | The measurement on the shared review server. The SHA is in the amendment. |
| `run.sh` | Reproduces everything in a scratch dir. `run.sh <dir>` runs the fixtures; `PROBE=1` adds the probe; `ONLY=<slugs>` applies the diff to a **copy** of tests/qa and runs it against the server. |

Before ratification, principal-engineer (lane 7) reviews `tests-qa.amd011.diff` and `fixture.spec.ts`.
