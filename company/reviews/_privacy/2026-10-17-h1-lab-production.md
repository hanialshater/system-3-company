# Privacy ruling: HQ lab production mode from precomputed runs (W-1572 H1)

owner: privacy-reviewer (Elif) · date: 2026-10-17 · run: pr-h1-1017 · follows company/reviews/_privacy/2026-10-16-personalization-batch-reads.md (L1 to L5) and company/reviews/_privacy/2026-10-16-l5-t1-closeout.md · branch perso-m1-h1, commit 210bf1f (HEAD 7acee87). I approve none of my own proposals; this is personalization-engineer's work. Not legal advice.

## Ruling

| Item | Ruling |
|---|---|
| D1 simulated personas only (with the stored runs) | **Met** |
| D4 no path to real data | **Met** |
| D5 grep re-runnable, zero unexplained hits (extended scope) | **Met**, wording per M5 (passes under `npm run verify`, test:hq; not in `check`) |
| D2/D3 labelling in precomputed mode | **Met on code read**; page not rendered by me (condition P4) |
| L1 exception (literal `/api/hq/personalization` fetch only) | **Unchanged** |
| Overall: privacy-done for the HQ lab in production mode | **Met with conditions** (P1 to P4) |

## What I read and ran

Read: the DoD update (§1 D1/D5 rows, §2 update), `src/lib/hq-personalization-precomputed.ts`, `hq-personalization-server.ts`, `route.ts`, `tools/hq-lab-precompute.mjs`, the data README, the diff of `Personalization.tsx` and `hq-personalization.ts` (added lines only, searched for fetch/storage/cookie/header/import/env), the head of the privacy test.

Ran: `node --import ./tests/lifehacks/register.mjs --test tests/hq/personalization-privacy.test.mjs`: 2 of 2 pass (clean scan; break check). Also `tests/hq/personalization-precomputed.test.mjs`: 8 of 8 pass.

My own scan of `src/data/hq-personalization/` (script in my scratchpad, not committed): decompressed all 42 `.gz` traces and parsed all 57 data files. Every file is listed in the manifest and matches its sha256; every trace's `persona.id` is one of the six in `personas.ts` and none is `reachable-*`. I listed every JSON key (about 90) and the distinct string values per key. Keys are simulator vocabulary only (steps, fingerprint, need, slots, curves, rows, policies, concept/slug/domain/level, persona id/name/description, `groundTruth`-style latent fields). Every string value is a lesson slug or concept, a policy or persona id, a persona name or description ("Four lessons in, mixed results..."), a version, or a model note. No email, uuid, IP, path under /home or /Users, `s3c:`, `localStorage`, token, or account/auth id. The hits for "session", "cookie" and "ageBand" are all inside `forbiddenInputs`, the list of inputs the model refuses to read, repeated in each file. `meta.json` has `saved: []`.

## Against D1 to D5

- **D1.** The stored files come only from `hq-cli.mjs meta|run|compare` (the generator calls nothing else, with `env: { NODE_NO_WARNINGS: "1" }`). The three data inputs of D1 are unchanged. Traces under `sim/out/traces/` are not copied (`saved = []` is set in code, not read from the CLI); `op=saved` is refused in production. The reader loads only manifest-listed names matching a fixed pattern inside one folder, each hash-checked, and spawns nothing (no `child_process` import in the reader; `runSim` returns the reader's answer before any process code when `simLocal()` is false; production cannot switch back). The persona `source` field is `invented` (6); the 42 traces carry `run.source: "live"`, which means "run by the simulator just now", and the reader overwrites it with the precomputed line when serving. It does not mean a real learner (P3).
- **D2/D3.** The page diff adds the "Precomputed: this lab runs nothing ... simulator runs ... for N simulated personas" note, a fixed seed/days display, and fewer controls. The "Simulated persona" heading, "Simulated fingerprint" caption and legend that I read rendered on 2026-10-16 are untouched by the diff (I read the added lines, not a render).
- **D4.** The diff adds no `fetch`, storage, cookie/header read, env read or import beyond the allowlist additions (`node:crypto`, `node:zlib`, the reader). The pre-commit grep in the DoD shows the same three hits as before, all inside the L1 exception, and none in a new file. The test now scans the reader, generator and data folder (gz decompressed) and its break check grew from 39 to 47 plants, including a storage key inside a gzipped trace; it passes.
- **D5.** Met as above.
- **L1.** Unchanged: no new `fetch`, same literal route. L2 holds: the route still reads no cookie, header or storage; `op` stays a closed set (the reader refuses anything outside the manifest). L3 holds and now has a code expression (`saved = []`).

## Path to real data

None found. The only way real data could reach these files is a person or a later change feeding it to the generator or editing the folder. The sha256 check proves the files are unmodified since the manifest was written, not that they are simulated; the guarantee that they are simulated rests on the generator's single source (hq-cli) and on the scan test, which would fail on the patterns in L1 inside a trace. It would not catch real data under innocuous keys (for example a real slug history written as a trace). That is why P1 and P2 are conditions.

## Conditions

- **P1. Generator source stays closed.** `tools/hq-lab-precompute.mjs` may call only `hq-cli.mjs` for personas in `personas.ts`. If it gains another source (a DB, an export, `sim/out/traces`, a file argument), or if `hq-cli.mjs meta` gains a field derived from traces or accounts that `saved = []` does not empty, my ruling lapses and I read it again (extends L2/L3). Owner: personalization-engineer; hq-engineer reviews the generator under L2.
- **P2. Regeneration needs the test.** Whoever regenerates the folder runs the privacy test and the precomputed test before committing; a diff in the data that is not explained by a change under `company/personalization/model/`, `content/curriculum/` or `src/demos/` (what `inputsCommit` names) is a finding. Real-data calibration (W-1497/W-1513) never writes here.
- **P3. Rename the "live" label when convenient.** `run.source: "live"` in stored traces is read by a lab user only after the reader rewrites it, but a reader of the raw file could take "live" as "real". Suggest `"simulator"`. Low; not blocking.
- **P4. Rendered page in production mode.** I did not render the page and I did not run a production build. Before this goes in a released HQ, I read one screenshot of the precomputed page (fingerprint caption, persona heading and the "Precomputed" note must each carry "simulated"), as in L5. If the chief of staff or hq-engineer supplies it, I add a line to this record; until then this ruling stands on code and tests.

Carried unchanged: M5 (wording is "passes under `npm run verify`", not "enforced in check"; the test is not in CI's `check`), M1 trust-list note, phase B (serving real learner data to any page) is a new read, T2/T3, D4 minors (**lawyer**).

## Not checked, confidence

Not checked: a rendered page; `npm run build` or a deployed bundle (whether the data folder is included in the bundle is a deploy concern, not privacy); the full text of `personalization-precomputed.test.mjs` beyond running it; CI. Confidence that the stored files contain no real learner data: about 95% (full decompress and key/value inventory; the remaining risk is real-looking data under simulator keys, which no scan can exclude and P1/P2 cover). Confidence that no path to real data was added: about 90% (diff searched by pattern, not read line by line for the unchanged parts of the page).

## Next, by owner

1. personalization-engineer: P1/P2 noted in the generator header; P3 optional.
2. chief of staff / hq-engineer: one production-mode screenshot for P4; hq-engineer's own review of the page diff (src/app/hq/**).
3. Deploy of any HQ with `HQ_PUBLIC=1` needs the founder's approval; this ruling is not that approval.
