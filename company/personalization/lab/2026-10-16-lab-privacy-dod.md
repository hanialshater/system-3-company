# HQ Personalization Lab: privacy definition of done and the no-real-data grep (W-1527)

owner: personalization-engineer (Tavi) · date: 2026-10-16 · run: pe-b6-1016 · board: W-1527 · reviewer: privacy-reviewer
brief: lane 14 batch 1 item B6 (company/personalization/batches/2026-10-16-batch-1.md)
source of the rules: privacy ruling W-1495 §6 (company/reviews/_privacy/2026-10-16-personalization-model-inputs.md)
code read at: commit aab21dc, after hq-engineer's W-1519 and W-1524 merged (review: company/reviews/hq/2026-10-16-w1503-review.md)
method: I read the files and ran grep. I did not change any file under src/. I did not run the page in a browser, so every "shown" below comes from reading the JSX, not from a rendered screen.
I am not the author of the lab code: hq-engineer built it under W-1503, and hq-cli.mjs belongs to learner-model-engineer. The lab is now mine to maintain.

## 1. Definition of done

The lab is privacy-done when all of the following hold **and** privacy-reviewer has read §2 of this file (ruling §6, "Test": "I read that grep before the lab is called done").

| # | Requirement (ruling §6) | How it is checked | Status at aab21dc |
|---|---|---|---|
| D1 | **Simulated personas only.** Every persona, fingerprint, history and trace the lab shows comes from `company/personalization/model/personas.ts`, the simulator, or saved simulator traces under `sim/out/traces/`. Lesson and curriculum data may also be shown. | The CLI's only data inputs are read: `personas.ts`, `loadCatalog()` (content/curriculum/*.json and src/demos/<pilot>/*/meta.json, catalog.mjs:31-41), and `sim/out/traces/*.json` (hq-cli.mjs:44, :73). The route accepts only `op=meta|run|saved|compare` with id-shaped arguments (`parseSimRequest`; tests/hq/personalization.test.mjs rejects `op=learners` and `../../etc/passwd`). | **Met.** |
| D2 | **"Simulated" wherever a fingerprint shows.** | Read every place the JSX renders fingerprint values: the fingerprint table (Personalization.tsx:243-262), the curve charts' persona and step points (:22-39, :418-433), and the step detail (:133-168). | **Partly met.** The page-level marks are present: the HqTop subtitle "Personalization lab (simulation)" (:338), the badge "simulated personas only" (:346), and `meta.simulatedOnly` (:350). The step outcomes say "simulated" (:139, :153-155). But the fingerprint table caption reads "Fingerprint (what a composer sees; never the latent truth)" (:248), and the curves legend reads "persona mean" and "selected step's fingerprint" (:422-423). Neither says "simulated". A screenshot of either panel taken alone would not carry the word. Fix filed (§4, F1). <br>**Update 2026-10-16 (W-1528, run pe-d1-1016, branch perso-d1): met in code, awaiting hq-engineer and privacy-reviewer.** Caption now "Simulated fingerprint (…)", table aria-label "Simulated fingerprint", legend "simulated persona mean" and "selected step's simulated fingerprint". Checked in a rendered page at 1280 and 390 wide (Playwright, local dev; screenshots git-ignored under artifacts/d1/). |
| D3 | **No persona label presented as a learner category.** Personas never exist at serve time (brief-response C2, O6). | Read where persona names render: the select (:361-362), the section heading `<h2>{persona.name}</h2>` (:403), the "Showing …" line (:396), and the Compare select and caption (:201, :221). | **Partly met.** The names are behavioural ("Struggling repeater", "Lapsed returner", personas.ts:41-81), and the page states "simulated personas only". But the heading shows the bare name as a title, with no "simulated persona" qualifier. "Struggling repeater" set as a heading can read as a segment that a real learner could be put in. Fix filed (§4, F1). <br>**Update 2026-10-16 (W-1528, run pe-d1-1016): met in code, awaiting review.** Heading "Simulated persona: {name}", run select label "Simulated persona", Compare select "Simulated personas" with option "all six simulated personas", comparison caption "simulated persona {name}" / "N simulated personas". Rendered check as D2. |
| D4 | **No path to real data in the code**, so that a leak of the `hqEnabled()` gate leaks only invented personas. No `localStorage`, no `s3c:` keys, no fetch except the lab's own route, no import from accounts or event-intake code, and no "load my progress" button. | The grep in §2, plus the reads of the imports in §3. | **Met**, subject to privacy-reviewer's ruling on hits H1 to H3 (the page calling its own route). |
| D5 | **The grep is re-runnable and stays at zero unexplained hits.** | Today it is a manual command (§2). There is no automated test. | **Not yet.** Filed as F2 (§4) so that a regression fails CI instead of waiting for someone to re-read. <br>**Update 2026-10-16 (W-1529, run pe-d2-1016, branch perso-d2): met in code, awaiting hq-engineer and privacy-reviewer.** `tests/hq/personalization-privacy.test.mjs` (in `npm run test:hq`) applies privacy-reviewer's exception exactly as ruled (company/reviews/_privacy/2026-10-16-personalization-batch-reads.md lines 36 and 39, L1): the only allowed `fetch` is of the literal `/api/hq/personalization`, optionally `?` + query; every other `fetch` mention, `/api` path, the L1 patterns and the L1 module list fail, plus stricter extras (XHR, beacon, sockets, `.headers`/`.cookies` reads, non-literal imports, an import allowlist, a missing scoped file). Its second case plants 35 breaks in a temp copy and requires each to be caught; a separate run of the real scan against 36 broken temp copies failed on all 36 and passed on the clean control. |
| D6 | **Allowed but not built:** a hand-typed "custom persona" or "paste a history" editor. If one is ever added, its values must be typed in by the viewer and never loaded from storage. | n/a | Not present. If one is added, it must pass D1 to D5 again. |

## 2. The no-real-data grep (recorded)

Files (the scope given in the brief): `src/app/hq/personalization/` (page.tsx, Personalization.tsx, personalization.module.css), `src/app/api/hq/personalization/route.ts`, `src/lib/hq-personalization.ts`, `src/lib/hq-personalization-server.ts`, `company/personalization/model/sim/hq-cli.mjs`.

```
FILES="src/app/hq/personalization/ src/app/api/hq/personalization/ src/lib/hq-personalization.ts src/lib/hq-personalization-server.ts company/personalization/model/sim/hq-cli.mjs"
for p in 'localStorage' 's3c:' '/api/' 'fetch'; do echo "== $p"; grep -rnF "$p" $FILES; done
grep -rnE "from ['\"][^'\"]*(account|auth|session|events-intake|progress)[^'\"]*['\"]|require\(['\"][^'\"]*(account|auth)" $FILES
grep -rnE "sessionStorage|indexedDB|document\.cookie|cookies\(\)|headers\(\)" $FILES   # extra, beyond the ruling
```

Output at aab21dc:

```
== localStorage        (no hits)
== s3c:                (no hits)
== /api/
src/app/hq/personalization/Personalization.tsx:182:      const r = await fetch(`/api/hq/personalization?${q}`);
src/app/hq/personalization/Personalization.tsx:285:      const r = await fetch(`/api/hq/personalization?${q}`);
src/app/api/hq/personalization/route.ts:1:// HQ simulation lab API (W-1503): GET /api/hq/personalization?op=run|saved|compare|meta&…
== fetch
src/app/hq/personalization/Personalization.tsx:182:   (same line as above)
src/app/hq/personalization/Personalization.tsx:285:   (same line as above)
== accounts imports    (no hits; src/ has no accounts module today: ls src/lib)
== extra storage/cookie/header reads (no hits)
```

The ruling asks for **zero hits**. There are three distinct hits, all of them the lab talking to itself:

| Hit | Line | Is it a real-data path? | Why |
|---|---|---|---|
| H1 | Personalization.tsx:182 `fetch('/api/hq/personalization?…')` (Compare) | **No** (my read) | The URL is a fixed literal for the lab's own route. The query is built from `op=compare`, a persona id chosen from `meta.personas` (simulator output), and bounded integers. The route forwards only a `parseSimRequest` result to `runSim`, which runs `hq-cli.mjs`. The CLI's data inputs are listed under D1. The browser sends nothing of the viewer's own: no storage reads, no cookies read by the route. |
| H2 | Personalization.tsx:285 `fetch('/api/hq/personalization?…')` (run / saved) | **No** (my read) | Same route and same gateway. `op=run` uses a persona id, policy, seed and days. `op=saved` uses a file name that must match `^[a-z0-9-]+\.[a-z0-9-]+\.seed\d{1,3}\.json$` and must be in the CLI's own listing of `sim/out/traces/` (hq-cli.mjs:44, :72). |
| H3 | route.ts:1 (a comment naming the route) | **No** | A comment, not code. |

**The expected exception, for privacy-reviewer to rule on:** the page calling its own local API (H1, H2) is how the lab works by design. Without it, the page cannot run the simulator. I propose that the rule be restated as "zero hits except `fetch` of the literal `/api/hq/personalization`, and that route's only data sources are the ones listed in D1". privacy-reviewer decides whether to accept that exception. I have not applied it anywhere.

## 3. Beyond the grep: what else I read, and residual notes

- **Transitive imports.** page.tsx and route.ts also import `@/lib/hq` (only `hqEnabled`) and `../HqTop`. Grepping both for the same patterns: HqTop.tsx has no hits. src/lib/hq.ts:181 has a `/api/hq/event/<id>` in a comment. hq.ts reads company files (rituals, roles, press), which are org data, not learner data, and the lab does not call those readers. The model and simulator files that hq-cli.mjs imports (model.ts, personas.ts, catalog.mjs, simulate.mjs, composer.ts, learner.ts, score.ts) have no `localStorage`, `s3c:`, `/api/` or `fetch(` hits. The one "account" hit, model.ts:93, is a string in the settings conditions list, not an import.
- **Saved traces (residual, low).** `op=saved` loads any JSON in `sim/out/traces/` whose name matches the pattern. The folder is git-ignored (`.gitignore`: `out/`), so it holds local files only. The code does not check that a file there came from `run.mjs`. A person could drop a file in by hand, but that is a manual act on the machine, not a code path to learner storage. If real-data traces ever exist, they must not be written to this folder. I note this here rather than filing it as a fix.
- **Child environment (residual, low).** `runSim` passes `{ ...process.env }` to the CLI (hq-personalization-server.ts:22). The CLI reads no environment variables (grep of company/personalization/model: no `process.env`), so this is not a data path today. Passing only the variables the CLI needs would remove the question. Filed with F3.
- **Production.** `simLocal()` refuses to spawn the CLI when `NODE_ENV === "production"`, even with `HQ_PUBLIC=1` (hq-personalization-server.ts:13, :17; hq-engineer's review confirms it). On a deployed build, the lab returns an error, never data.
- **Ground truth panel.** The lab shows `persona.groundTruth.latent` in a closed `<details>` (Personalization.tsx:407-411). This is invented simulator data, and ruling §6 allows the personas.

## 4. Fixes filed (to me, after W-1519; src/app/hq/** changes need hq-engineer's review)

- **F1 = W-1528** (D2, D3): "simulated" on the fingerprint table caption and the curves legend, and "Simulated persona:" before the persona heading and in the persona select label.
- **F2 = W-1529** (D5): an automated no-real-data grep test over the lab files, with the own-route exception only if privacy-reviewer accepts it. Update 2026-10-16 (run pe-d2-1016): done as tests/hq/personalization-privacy.test.mjs, exception in the ruled form only (L1).
- **F3 = W-1530** (hq review findings 3 and 5, plus the child-env note in §3): a single in-flight lock on `runSim`, a cached `meta`, and a minimal child environment. Update 2026-10-16 (run pe-d1-1016): done in src/lib/hq-personalization-server.ts; the child env is now only `NODE_NO_WARNINGS=1` (`CHILD_ENV`), which closes the §3 child-environment residual once reviewed. A refused concurrent request returns 429 from the route. Tested in tests/hq/personalization.test.mjs.

W-1527 is in review with privacy-reviewer named (company/ops/board.json).

## 5. Not checked

- The rendered page in a browser (D2 and D3 are judged from JSX).
- Whether a future accounts module will be named in a way the import grep catches. The pattern covers `account|auth|session|events-intake|progress`. F2 should list the real module path once one exists (company/engineering/data-inventory.md).

## 6. Privacy-reviewer status (2026-10-16, run pr-l5-t1-1016)

**Privacy status: PRIVACY-DONE for phase A (met with conditions).** Basis: ruling L5 in company/reviews/_privacy/2026-10-16-personalization-batch-reads.md, closed in company/reviews/_privacy/2026-10-16-l5-t1-closeout.md. D1 to D5 met (D2 and D3 read in the rendered page; D5 as "passes under `npm run verify` (test:hq)", not "enforced in check", per hq-engineer M5). D6 stays "not present". Conditions that stay open: L2, L3, M1 trust-list note, phase B re-read. Lapses if the route or CLI reads any learner data source (L2).
