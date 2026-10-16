# Phase A readout 1: reproduction (determinism only)

owner: learner-model-engineer (Ifeoma) · run: lme-c5-1016 · date: 2026-10-16 · board: W-1535 · brief: company/personalization/batches/2026-10-16-batch-2.md §C5
reproduces: company/personalization/eval/2026-10-16-phase-a-readout-1.md (run eval-c4-1016)
method: only company/personalization/eval/harness/README.md "Reproduction" steps 1 to 6, nothing else.
scope: determinism only, not judgement (independence rule §2.5). This record says nothing about whether the criterion, the world or the verdicts are right.

## Result

**Byte-identical.** Both parts of the run reproduce `results.json` and `verdicts.json` exactly. The two `manifest.json` files differ only in `seconds`, which the README (step 5) says is expected. The §6 tables, regenerated from my outputs, match the readout's §6 line for line except for the out-dir label and `seconds`.

| part | file | readout / committed sha256 | reproduction sha256 | same |
|---|---|---|---|---|
| pass (`base,one-at-a-time`) | results.json | 5df456922703d9a473500d41099903d2a32b45f915c8f577bc20f8ca03d6b899 (readout §6) | 5df456922703d9a473500d41099903d2a32b45f915c8f577bc20f8ca03d6b899 | yes |
| pass | verdicts.json | 4842e28b57bd5ff6e171f54d8181a1f3da78105c8eb339117df2423a27be3050 (committed file) | 4842e28b57bd5ff6e171f54d8181a1f3da78105c8eb339117df2423a27be3050 | yes (`cmp` exit 0) |
| pass | manifest.json | 23694a01… | 6dbb6470… | only `seconds`: 1690.596 vs 828.579 |
| rest (`corner,novelty,rho`) | results.json | c8a289cb859b4fb9b27bf440c4b264959fe4e3984f54ef73d88b04a1012e6944 (readout §6) | c8a289cb859b4fb9b27bf440c4b264959fe4e3984f54ef73d88b04a1012e6944 | yes |
| rest | verdicts.json | 100aae8c0ee510bd61e7650fc4e2bdd5df6aa8e11af3fd39f216112c62c09728 (committed file) | 100aae8c0ee510bd61e7650fc4e2bdd5df6aa8e11af3fd39f216112c62c09728 | yes (`cmp` exit 0) |
| rest | manifest.json | 3e39b8c4… | 29e9bc2d… | only `seconds`: 1378.151 vs 741.057 |

`diff` of each manifest pair shows one changed line, `seconds`. `commit` matches (5725b10a8f4505aa697a6305cc9a51378ed7b4aa), as do `criterionSha256`, `inputsSha256`, `inputs`, `fileSha256`, `S`, `seedList`, `node`, `kinds`, `modelVersion` and `composer`.

## What I ran (README steps)

1. **Worktree:** /home/user/s3c-c5 (branch perso-c5, then detached at 5725b10a8f4505aa697a6305cc9a51378ed7b4aa for the run, then back to perso-c5). No `npm ci` (README: not needed). Node v22.22.0, the same version the manifest records. 4 cores, no other load.
2. **Hashes at the run commit:** `sha256sum` of the criterion = `00797fab…dc5e8` = manifest `criterionSha256`; `status: frozen`. All 11 files in `fileSha256` (harness.mjs, learner.mjs, scorer.mjs, world-inputs.mjs, personas.copy.mjs, checks.mjs, run.mjs, run-worker.mjs, model/model.ts, model/sim/composer.ts, model/sim/catalog.mjs) match.
3. **Inputs:** `JSON.stringify(B2)` from world-inputs.mjs at the run commit equals `JSON.stringify(manifest.inputs)`; sha256 `d2fbc581…8252` = manifest `inputsSha256`. So no `--inputs=` was passed.
4. **Run**, from the repository root at the run commit, to new out dirs outside the repo, in two separate processes, one after the other:
   ```sh
   NODE_NO_WARNINGS=1 node company/personalization/eval/harness/run.mjs --seeds=200 --jobs=4 --kinds=base,one-at-a-time --out=<scratch>/repro/pass   # 828.6 s, exit 0
   NODE_NO_WARNINGS=1 node company/personalization/eval/harness/run.mjs --seeds=200 --jobs=4 --kinds=corner,novelty,rho --out=<scratch>/repro/rest   # 741.1 s, exit 0
   ```
   The readout ran `--jobs=2`; I ran `--jobs=4`. Identical bytes at a different worker count are what the README claims ("results do not depend on worker count, order or machine"), and this run is consistent with it for 2 vs 4.
5. **Compare:** `sha256sum` and `cmp` as in the table above; `diff` on the manifests.
6. **Spot check:** `harness.mjs episode --persona=wanderer --seed=1001 --cell=base --policy=gam` in two processes printed `46fe8227f6bd86faf67128d482b1a9dd624c9c62e61cf8f9ad74e1b3d65bab06` both times.

**§6 tables:** back on perso-c5 (commit 62c0e1b, where `readout-tables.mjs` exists), `readout-tables.mjs <scratch>/repro/pass <scratch>/repro/rest` exited 0. Diffed against readout §6, the only lines that differ are the two manifest rows: out-dir label (`repro/pass` vs `2026-10-16-readout-1/pass`, and the same for rest) and `seconds`. Every verdict, per-cell, per-persona and per-term row is identical.

## Every difference found

1. `manifest.json` `seconds` (both parts): expected (README step 5).
2. §6 table manifest rows: out-dir label and `seconds`. These come from where I wrote the output and how long it took, not from the results.

No defect found, so nothing goes on the board to personalization-eval.

## Notes on the instructions (documentation, not results)

- The README step 4 sentence about passing the same `--kinds=` for each part, and `readout-tables.mjs` itself, are in commit 62c0e1b, not in the run commit 5725b10a. Someone who reads only the README at the run commit would miss the two-part split. The manifest's `kinds` field still shows it, and neither file affects results. Readout §1 says its three commands were run "at commit 5725b10a", but the third (`readout-tables.mjs`) can only run at 62c0e1b or later. This is a wording point for personalization-eval if they want it; I did not put it on the board as a defect.
- `results.json` is not committed (20 MB, 19 MB). My copies were in a session scratch directory and are not kept. To check again, rerun step 4 (about 26 min at --jobs=4 on 4 cores).
