# Criterion 2 readout 2: reproduction (determinism only)

owner: learner-model-engineer (Ifeoma) · run: lme-r2-1017 · date: 2026-10-17 · board: W-1550 · brief: company/personalization/batches/2026-10-16-batch-3.md §R2 (dispatch 20261017T015453089Z-vp-personalization-456f6f5e)
reproduces: company/personalization/eval/2026-10-16-criterion-2-readout.md (commit 57d2a20; identical at 281c12c)
method: only readout 2 §9, nothing else. No builder notes and no K2 report were read.
scope: determinism only, not judgement (proposal §2.5). The candidate (review-timing.ts) is mine, so this record says nothing about whether the criterion, the world, the candidate or the verdicts are right. It records only whether the bytes come out the same.

## Result

**Byte-identical.** Both parts reproduce `results.ndjson` and `verdicts.json` exactly. Each `manifest.json` differs from the committed one in only the two fields §9 allows: `seconds` and the candidate's absolute path. The §A tables, regenerated from my outputs, differ from the readout's §A only on the lines that print those same two fields.

| part | file | expected sha256 (§9) | reproduction sha256 | same |
|---|---|---|---|---|
| 1 (`base,one-at-a-time`) | results.ndjson | eb2cd760dad9981e2544f4a951e9732f1727ec0ae356ed2cfe1b1d6bfc4bd9f5 | eb2cd760dad9981e2544f4a951e9732f1727ec0ae356ed2cfe1b1d6bfc4bd9f5 | yes (740,023,885 bytes, 960 lines) |
| 1 | verdicts.json | c34a1c492e039b0e8229c083bd5ddd637c509cfccb4844d6882f32213c03ca63 | c34a1c492e039b0e8229c083bd5ddd637c509cfccb4844d6882f32213c03ca63 | yes (`cmp` with committed file, exit 0) |
| 1 | manifest.json | 3836384b… (committed) | 339763f0… | only `candidate.path` and `seconds` (below) |
| 2 (`corner`) | results.ndjson | 450022ecb3de8128526cbec8ad981619249746487002ef3d19e0c21ab0b3ce93 | 450022ecb3de8128526cbec8ad981619249746487002ef3d19e0c21ab0b3ce93 | yes (222,558,758 bytes, 288 lines) |
| 2 | verdicts.json | 46ba2d75b6ba2e4bd6b19fd2338f4b3be63fdb09c870c9c5569ed19877d1f1e2 | 46ba2d75b6ba2e4bd6b19fd2338f4b3be63fdb09c870c9c5569ed19877d1f1e2 | yes (`cmp` with committed file, exit 0) |
| 2 | manifest.json | eb1aa69e… (committed) | 59c6cc57… | only `candidate.path` and `seconds` (below) |

## Input hashes checked before the run (at b89f259)

| what | expected | got | same |
|---|---|---|---|
| criterion company/personalization/eval/2026-10-16-criterion-2.md | 7d2c95fe1adc961bf577743d14e6ac8993060db9cf11fc48799a4fe261568161 | 7d2c95fe1adc961bf577743d14e6ac8993060db9cf11fc48799a4fe261568161 | yes |
| candidate company/personalization/model/sim/review-timing.ts | afddde70…9118157 (§9; manifest afddde70d79aacf9fb30e7e37322565a4395e18ee71d99267345e90ed9118157) | afddde70d79aacf9fb30e7e37322565a4395e18ee71d99267345e90ed9118157 | yes |
| inputs (manifest `inputsSha256`) | c8c09eac…f7482840 | c8c09eac7613720c7d1499958d5c416b57ed7d614e7e68eb8a132068f7482840 in both new manifests, and `inputs` block identical | yes |

`fileSha256`: the main and corners manifests list the same 12 files with the same hashes. The paths are relative to `company/personalization/eval/harness/c2/`. All 12 match at b89f259:

| file (relative to harness/c2/) | sha256 | same |
|---|---|---|
| harness2.mjs | 4cd6ca8ed399f0969f32c57cd0ced9b2bf147a6f9d34c02a1068c4ff5ecdfbee | yes |
| learner2.mjs | 36b4839ca97d9da8f9ebba3356d450d9256a7e4ef716af490a4b3d12a2ffdc6e | yes |
| scorer2.mjs | 2518ae27f4b442f9101e5c492182f1961199cc9a86064b3250abcc1b694f075d | yes |
| world2.mjs | 876aa1b875ae8d60a15bb05de8a38f72750dca291ee8fe597ca183872418650c | yes |
| checks2.mjs | d2865d1e939cc9e4cdaf6d6617c5395b902c73947d14bbab95db364892d03d5d | yes |
| run2.mjs | 8d7c031f97e41d73339b2ddb8bb8d67f1a33ac2c5344ae5d194e768677fda8fb | yes |
| run2-worker.mjs | f48e6ee220f8ad777b9755e44dc692eb03b7c5540975b17fe6a5fbf02e64f2d4 | yes |
| ../harness.mjs | 458f3dc19b1048f2110573b4befb17dd0b8f74ac9ac0fa7a58428057f74b1864 | yes |
| ../personas.copy.mjs | 9cb7a911a5aa03a4537b0dabc7383c3a87faf91fa05b1792009abee0c9d18770 | yes |
| ../../../model/model.ts | af6545119749ff8b65a533bc9291aede4aeca57173c2ed97f51a0931890c731b | yes |
| ../../../model/sim/composer.ts | a092c3b9b52411add0e61851753e29a760d8c4527699f2d7f2a73c7e72801141 | yes |
| ../../../model/sim/catalog.mjs | 877b0807cdd77a1ad9e11457524eae23b5a352c56f3b7c8dcd00b556413effc9 | yes |

## What I ran (§9 as written)

1. Worktree /home/user/s3c-r2 (branch perso-r2 at 281c12c). Before checking out the run commit, I copied the committed records/2026-10-16-readout-2/{main,corners} and the readout to scratch, because they do not exist at b89f259. Then `git checkout --detach b89f2590f6031ae1dae9b24b4b2046eece8f6adb` and `npm ci` (exit 0; package-lock.json is the same at 281c12c and b89f259). Node v22.22.0, the version the manifest records. 4 cores and an otherwise idle machine.
2. Hashes: see above.
3. The two parts ran in one shell script, one after the other (never in parallel), from the repository root at b89f259, with outputs going to scratch:
   ```sh
   NODE_NO_WARNINGS=1 node company/personalization/eval/harness/c2/run2.mjs --seeds=2000 --candidate=company/personalization/model/sim/review-timing.ts --jobs=4 --kinds=base,one-at-a-time --out=<scratch>/r2-repro/main     # 4796.13 s, exit 0
   NODE_NO_WARNINGS=1 node company/personalization/eval/harness/c2/run2.mjs --seeds=2000 --candidate=company/personalization/model/sim/review-timing.ts --jobs=4 --kinds=corner --out=<scratch>/r2-repro/corners                 # 1400.33 s, exit 0
   ```
   Wall clock: 01:56:34Z to 03:39:58Z on 2026-10-17. The run directory is `<scratch>` = /tmp/claude-0/-home-user/870387d5-7ba1-5b1e-a22e-59c6a0ccb40b/scratchpad. K2's outputs in scratchpad/r2/ were not touched or read.
4. sha256 of each output (table above), `cmp` of verdicts.json against the committed files, and `diff` of each manifest against the committed one.
5. `node company/personalization/eval/harness/c2/readout2-tables.mjs --main=<scratch>/r2-repro/main --corners=<scratch>/r2-repro/corners` (exit 0, 279 lines, sha256 687acf54…eca88). I then ran `diff` against the readout's §A text (the lines between the `## A.` heading and `## B.`).
6. I deleted both results.ndjson files after hashing and after the tables run. The verdicts.json and manifest.json files stay in scratch until the report is sent.

## Every difference

**manifest.json, part 1** (`diff committed new`), with 2 changed lines:
- line 266 `candidate.path`: `/home/user/s3c-k2/company/personalization/model/sim/review-timing.ts` → `/home/user/s3c-r2/company/personalization/model/sim/review-timing.ts` (allowed by §9)
- line 284 `seconds`: `4869.808` → `4796.13` (allowed by §9)

**manifest.json, part 2**, with 2 changed lines:
- line 169 `candidate.path`: `/home/user/s3c-k2/…/review-timing.ts` → `/home/user/s3c-r2/…/review-timing.ts` (allowed by §9)
- line 187 `seconds`: `1288.187` → `1400.333` (allowed by §9)

No other manifest field differs: commit, criterionSha256, status, inputsSha256, inputs, modelVersion, gamFingerprint, candidate.sha256, fileSha256, kinds, seeds and errors all match.

**§A tables** (`diff readout-§A repro`):
- line 2 (the first line under `## Run`): only `4869.808 s` → `4796.13 s`. Every other field on the line is equal (commit, criterion sha256, status, inputs sha256, S, seeds, tuning, kinds, node, model, GAM fingerprint).
- line 3: only the candidate path, `/home/user/s3c-k2/…` → `/home/user/s3c-r2/…`. The sha256 and `errors 0` are equal.
- line 237 (`corner run:`): only `1288.187 s` → `1400.333 s`.
- line 280: the readout has a blank line before `## B.` that the script does not print. This comes from how I cut the text out of the readout, not from the output.
- Every table row (lines 4 to 236 and 238 to 279) is identical.

## Findings

None. No hash mismatch, no step that could not run as written, no run error, no edit to any eval file. Nothing was added to the board.
