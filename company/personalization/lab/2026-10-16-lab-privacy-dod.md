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
| D1 | **Simulated personas only.** Every persona, fingerprint, history and trace the lab shows comes from `company/personalization/model/personas.ts`, the simulator, or saved simulator traces under `sim/out/traces/`. Lesson and curriculum data may also be shown. | The CLI's only data inputs are read: `personas.ts`, `loadCatalog()` (content/curriculum/*.json and src/demos/<pilot>/*/meta.json, catalog.mjs:31-41), and `sim/out/traces/*.json` (hq-cli.mjs:44, :73). The route accepts only `op=meta|run|saved|compare` with id-shaped arguments (`parseSimRequest`; tests/hq/personalization.test.mjs rejects `op=learners` and `../../etc/passwd`). | **Met.** <br>**Update 2026-10-17 (W-1572 H1, run pe-h1-1017, branch perso-m1-h1): production mode, awaiting hq-engineer and privacy-reviewer.** A released HQ (`NODE_ENV=production`, `HQ_PUBLIC=1`) runs nothing; it serves only `src/data/hq-personalization/` (README.md there), written locally by `tools/hq-lab-precompute.mjs` from `hq-cli.mjs` `meta`/`run`/`compare`, so the data inputs are the same three as above. `saved` traces (local, git-ignored) are never copied (`meta.json` has `saved: []`) and `op=saved` is refused in production. The reader (`src/lib/hq-personalization-precomputed.ts`) reads only manifest-listed files by name pattern inside that folder, each checked against its sha256; tests/hq/personalization-precomputed.test.mjs asserts the stored personas are exactly personas.ts's six, no `reachable-*` run is stored, and a manifest entry pointing outside the folder is refused. |
| D2 | **"Simulated" wherever a fingerprint shows.** | Read every place the JSX renders fingerprint values: the fingerprint table (Personalization.tsx:243-262), the curve charts' persona and step points (:22-39, :418-433), and the step detail (:133-168). | **Partly met.** The page-level marks are present: the HqTop subtitle "Personalization lab (simulation)" (:338), the badge "simulated personas only" (:346), and `meta.simulatedOnly` (:350). The step outcomes say "simulated" (:139, :153-155). But the fingerprint table caption reads "Fingerprint (what a composer sees; never the latent truth)" (:248), and the curves legend reads "persona mean" and "selected step's fingerprint" (:422-423). Neither says "simulated". A screenshot of either panel taken alone would not carry the word. Fix filed (§4, F1). <br>**Update 2026-10-16 (W-1528, run pe-d1-1016, branch perso-d1): met in code, awaiting hq-engineer and privacy-reviewer.** Caption now "Simulated fingerprint (…)", table aria-label "Simulated fingerprint", legend "simulated persona mean" and "selected step's simulated fingerprint". Checked in a rendered page at 1280 and 390 wide (Playwright, local dev; screenshots git-ignored under artifacts/d1/). |
| D3 | **No persona label presented as a learner category.** Personas never exist at serve time (brief-response C2, O6). | Read where persona names render: the select (:361-362), the section heading `<h2>{persona.name}</h2>` (:403), the "Showing …" line (:396), and the Compare select and caption (:201, :221). | **Partly met.** The names are behavioural ("Struggling repeater", "Lapsed returner", personas.ts:41-81), and the page states "simulated personas only". But the heading shows the bare name as a title, with no "simulated persona" qualifier. "Struggling repeater" set as a heading can read as a segment that a real learner could be put in. Fix filed (§4, F1). <br>**Update 2026-10-16 (W-1528, run pe-d1-1016): met in code, awaiting review.** Heading "Simulated persona: {name}", run select label "Simulated persona", Compare select "Simulated personas" with option "all six simulated personas", comparison caption "simulated persona {name}" / "N simulated personas". Rendered check as D2. |
| D4 | **No path to real data in the code**, so that a leak of the `hqEnabled()` gate leaks only invented personas. No `localStorage`, no `s3c:` keys, no fetch except the lab's own route, no import from accounts or event-intake code, and no "load my progress" button. | The grep in §2, plus the reads of the imports in §3. | **Met**, subject to privacy-reviewer's ruling on hits H1 to H3 (the page calling its own route). |
| D5 | **The grep is re-runnable and stays at zero unexplained hits.** | Today it is a manual command (§2). There is no automated test. | **Not yet.** Filed as F2 (§4) so that a regression fails CI instead of waiting for someone to re-read. <br>**Update 2026-10-16 (W-1529, run pe-d2-1016, branch perso-d2): met in code, awaiting hq-engineer and privacy-reviewer.** `tests/hq/personalization-privacy.test.mjs` (in `npm run test:hq`, so it runs under `npm run verify`, not `npm run check`) applies privacy-reviewer's exception exactly as ruled (company/reviews/_privacy/2026-10-16-personalization-batch-reads.md lines 36 and 39, L1): the only allowed `fetch` is of the literal `/api/hq/personalization`, optionally `?` + query; every other `fetch` mention, `/api` path, the L1 patterns and the L1 module list fail, plus stricter extras (XHR, beacon, sockets, `.headers`/`.cookies` reads, non-literal imports, an import allowlist, a missing scoped file). Its second case plants 35 breaks in a temp copy and requires each to be caught; a separate run of the real scan against 36 broken temp copies failed on all 36 and passed on the clean control. <br>**Update 2026-10-16 (W-1540, run pe-u1-1016, branch perso-u1), from hq-engineer's D2 review (company/reviews/hq/2026-10-16-d2-review.md):** **M5** the test *passes under `npm run verify`* (test:hq); it is not enforced by `npm run check`. **M1** the import allowlist (`IMPORT_ALLOW`) is a trust list, not a scan: the allowlisted modules (`@/lib/hq`, `../HqTop`, `../model.ts`, `./simulate.mjs` and the rest) are trusted by name and their own contents are not scanned by this test; a change to any of those files is re-read by hq-engineer under ruling L2. **M3** a `url(` with a scheme (`https:`, `http:`, `data:` …) or a protocol-relative `//` in any lab file, CSS included, is now a finding; four planted rows (three CSS, one inline style) prove it. <br>**Update 2026-10-17 (W-1572 H1 and W-1552, run pe-h1-1017, branch perso-m1-h1):** scope extended to `src/lib/hq-personalization-precomputed.ts`, `tools/hq-lab-precompute.mjs` and the data folder `src/data/hq-personalization/` (every file; `.gz` decompressed before the scan; the import rules apply to code files only, since a JSON key `"from"` is data). Required files now include the reader, the generator, `manifest.json` and `meta.json`. **W-1552** (company/reviews/hq/2026-10-16-u1-review.md): `@import` and `image-set(` (also `-webkit-image-set(`) are findings. Planted breaks: 39 → 47 rows (three for W-1552; five for the new files, including a storage key planted inside a gzipped trace). Passes under `npm run verify` (test:hq). |
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

### Update 2026-10-17: the grep on the H1 scope (W-1572 H1, run pe-h1-1017, branch perso-m1-h1)

Scope added: `src/lib/hq-personalization-precomputed.ts`, `tools/hq-lab-precompute.mjs`, `src/data/hq-personalization/` (README.md, manifest.json, meta.json, 14 compare/*.json; the 42 runs/*.json.gz grepped after `zcat`). Same commands as above with the new files in `FILES`, plus `@import` and `image-set(` in the extra line, plus `for f in src/data/hq-personalization/runs/*.gz; do zcat "$f" | grep -oE "<every pattern above>"; done`. Output on perso-m1-h1 before commit:

```
== localStorage        (no hits)
== s3c:                (no hits)
== /api/
src/app/hq/personalization/Personalization.tsx:187:      const r = await fetch(`/api/hq/personalization?${q}`);
src/app/hq/personalization/Personalization.tsx:297:      const r = await fetch(`/api/hq/personalization?${q}`);
src/app/api/hq/personalization/route.ts:1:// HQ simulation lab API (W-1503): GET /api/hq/personalization?op=run|saved|compare|meta&…
== fetch               (the same two lines)
== accounts imports    (no hits)
== extra, incl. @import and image-set(   (no hits)
== gz, decompressed (42 traces)          (no hits)
```

Same three hits as at aab21dc (line numbers moved), all inside ruling L1's exception; no hit in any new file. The new files add no fetch, no `/api/`, no storage and no import outside the test's allowlist; the allowlist gains `node:crypto`, `node:zlib` and `./hq-personalization-precomputed` (the reader, itself scanned). For privacy-reviewer to read (batch 5 §5 line 8).

### Update 2026-10-17: the W-1648 scope (frozen candidates and the Evaluation view; run pe-hq-eval-1017, branch perso-hq-eval)

Scope added to `tests/hq/personalization-privacy.test.mjs`: `src/app/hq/personalization/candidates/` and `evaluation/` (already walked as part of the lab folder; now also REQUIRED), `src/lib/hq-personalization-candidates.ts`, `tools/hq-lab-candidates.mjs` (the adapter), `tools/hq-eval-index.mjs`, `src/data/hq-personalization/candidates/*.json.gz` (decompressed) and `src/data/hq-personalization-eval/evaluation.json`. Result on perso-hq-eval: 88 files scanned, 0 findings, the same 2 allowed fetches (Personalization.tsx's own route); 54 planted breaks (7 new: a fetch in the candidates view, storage in the Evaluation view, the adapter importing reachable-v1 or the eval harness, the eval generator importing progress, a storage key in a stored candidate and in the eval index), each caught. The new views are server components with no fetch and no client state. D1 for the new data: the adapter's only inputs are personas.ts, the lab catalogue, lesson titles from meta.json and the two hash-checked candidate files; the Evaluation index holds only verbatim quotes from committed .md records outside the eval harness. New allowlist entries: the views' local imports, `@/lib/hq-personalization-candidates`, `@/lib/hq-personalization-precomputed`, `@/data/hq-personalization-eval/evaluation.json`, and the adapter's literal imports of the simulator files hq-cli.mjs already uses plus `reachable-v2.ts` and `reachable-v3.ts`. For privacy-reviewer's D1-D4 re-read (W-1650); this is not that read.

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
- **Production.** `simLocal()` refuses to spawn the CLI when `NODE_ENV === "production"`, even with `HQ_PUBLIC=1` (hq-personalization-server.ts:13, :17; hq-engineer's review confirms it). On a deployed build, the lab returns an error, never data. **Update 2026-10-17 (W-1572 H1):** on a deployed build the lab now serves the committed precomputed runs (D1 update); still no process: a test spies on every `child_process` call in production mode and requires zero (and requires the same spy to see a live run).
- **Ground truth panel.** The lab shows `persona.groundTruth.latent` in a closed `<details>` (Personalization.tsx:407-411). This is invented simulator data, and ruling §6 allows the personas.

## 4. Fixes filed (to me, after W-1519; src/app/hq/** changes need hq-engineer's review)

- **F1 = W-1528** (D2, D3): "simulated" on the fingerprint table caption and the curves legend, and "Simulated persona:" before the persona heading and in the persona select label.
- **F2 = W-1529** (D5): an automated no-real-data grep test over the lab files, with the own-route exception only if privacy-reviewer accepts it. Update 2026-10-16 (run pe-d2-1016): done as tests/hq/personalization-privacy.test.mjs, exception in the ruled form only (L1).
- **F3 = W-1530** (hq review findings 3 and 5, plus the child-env note in §3): a single in-flight lock on `runSim`, a cached `meta`, and a minimal child environment. Update 2026-10-16 (run pe-d1-1016): done in src/lib/hq-personalization-server.ts; the child env is now only `NODE_NO_WARNINGS=1` (`CHILD_ENV`; since W-1540, plus `SystemRoot` when the server has it, which Node needs to start on Windows: `childEnv()`, D1 review N4), which closes the §3 child-environment residual once reviewed. A refused concurrent request returns 429 from the route. Tested in tests/hq/personalization.test.mjs.

W-1527 is in review with privacy-reviewer named (company/ops/board.json).

## 5. Not checked

- The rendered page in a browser (D2 and D3 are judged from JSX).
- Whether a future accounts module will be named in a way the import grep catches. The pattern covers `account|auth|session|events-intake|progress`. F2 should list the real module path once one exists (company/engineering/data-inventory.md).

## 6. Privacy-reviewer status (2026-10-16, run pr-l5-t1-1016)

**Privacy status: PRIVACY-DONE for phase A (met with conditions).** Basis: ruling L5 in company/reviews/_privacy/2026-10-16-personalization-batch-reads.md, closed in company/reviews/_privacy/2026-10-16-l5-t1-closeout.md. D1 to D5 met (D2 and D3 read in the rendered page; D5 as "passes under `npm run verify` (test:hq)", not "enforced in check", per hq-engineer M5). D6 stays "not present". Conditions that stay open: L2, L3, M1 trust-list note, phase B re-read. Lapses if the route or CLI reads any learner data source (L2).
