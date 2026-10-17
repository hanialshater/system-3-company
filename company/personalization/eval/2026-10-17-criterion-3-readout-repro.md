# Criterion 3 readout 3: reproduction (determinism only)

owner: learner-model-engineer (Ifeoma) · run: lme-r3-1017 · date: 2026-10-17 · board: W-1568 · brief: company/personalization/batches/2026-10-17-batch-4.md §R3 (dispatch 20261017T150417075Z-vp-personalization-c96fd502)
reproduces: company/personalization/eval/2026-10-17-criterion-3-readout.md (merged at 46d7302; run commit b1ae294)
method: only readout 3 §8. I read no builder notes and not the K4 report. I did not read §1 to §7 of the readout.
scope: determinism only, not judgement (proposal §2.5). This record does not say whether the criterion, the world, the oracle, the arms or the verdicts are right. It records only whether the run produces the same bytes again.

## Result

**Byte-identical.** Both parts reproduce `results.ndjson` and `verdicts.json` exactly. Each `manifest.json` differs from the committed one in one field only, `seconds`, which §8 allows. `commit` is equal because I ran at the same commit. The tables printed from my outputs differ from §A on two lines only, the two `## Run` lines. On each of those lines only the seconds figure differs. If I put the readout's seconds back into those two lines, the sha256 of my printed text is §8 step 5's f9aa1739…505de.

| part | file | expected sha256 (§8) | reproduction sha256 | same |
|---|---|---|---|---|
| interleave | results.ndjson | 951cca1ad443c3542ce27e1f783484886105dc2a85f6ed4499fbc2943850817e | 951cca1ad443c3542ce27e1f783484886105dc2a85f6ed4499fbc2943850817e | yes (1,199,840,216 bytes, 1218 lines) |
| interleave | verdicts.json | 65d8421efef462c9cdceb03dd3b709d7c1de37f0203053a46695f9562fc5d578 | 65d8421efef462c9cdceb03dd3b709d7c1de37f0203053a46695f9562fc5d578 | yes (`cmp` with the committed file: exit 0) |
| interleave | manifest.json | 65caac02f97e1a296cc5c0669c3ce54757797b965757ae14ead2cdc487cfbf7d | 391f8bb3fc0e5fcbc7967618e824eaa5a33b8d0ac31f8956b1c6e014568ffbd6 | only `seconds` differs (see below) |
| first | results.ndjson | 90085f3e4c3e59142ac44f5e626ea8627218d4a76998de2bb03331566719a1f9 | 90085f3e4c3e59142ac44f5e626ea8627218d4a76998de2bb03331566719a1f9 | yes (332,390,966 bytes, 342 lines) |
| first | verdicts.json | 89969f9fd189b5cbd4dcb361268b505030958f5f6dd101590732e980628162e3 | 89969f9fd189b5cbd4dcb361268b505030958f5f6dd101590732e980628162e3 | yes (`cmp` with the committed file: exit 0) |
| first | manifest.json | 445fa515c39c67bf397b6d00b97c9f10d6604d50175702609417f1550836c89e | c42d1e44658335fe38fcd72fd34c5e9422b9a56887a4f70000439016ad74e2bd | only `seconds` differs (see below) |
| both | readout3-tables.mjs printed text | f9aa1739048ff521f46ce3be1feff7be0856b31a7962b2d470720c1ae55505de | 137d317ecf8b542ec85d0d1663924f45079736bd67c1711c978e7e59f01ed16a; with the readout's seconds put back: f9aa1739048ff521f46ce3be1feff7be0856b31a7962b2d470720c1ae55505de | only the two seconds figures differ (see below) |

## Input hashes checked before the run (at b1ae294)

| what | expected | got | same |
|---|---|---|---|
| criterion company/personalization/eval/2026-10-17-criterion-3.md | 78e2b5131ed8024a7e81fcb2b463157ba6f7edb3b94a6a38ce04771f366927e4 | 78e2b5131ed8024a7e81fcb2b463157ba6f7edb3b94a6a38ce04771f366927e4 | yes |
| E3 block (manifest `e3Sha256`) | 0e120add…c1927a (committed manifests: 0e120add6ada34da159d77bc7d994f092318b4bba802941f4477a4273fc1927a) | 0e120add6ada34da159d77bc7d994f092318b4bba802941f4477a4273fc1927a in both new manifests. The `e3` block is identical too. | yes |
| E1 (manifest `e1Sha256`) | c8c09eac…f7482840 | equal in both new manifests | yes |

The interleave and first manifests list the same 16 `fileSha256` entries with the same hashes. The paths are relative to `company/personalization/eval/harness/c3/`, and all 16 match at b1ae294:

| file (relative to harness/c3/) | sha256 | same |
|---|---|---|
| harness3.mjs | fc9a98ca7138a7e4a88ed05146c052c839f0d093020b968c1b4b278d9d95fa51 | yes |
| learner3.mjs | 90925edaff5830f06ccba7a8a6940614ce29c1ebeed82564f28bf8d39af629e9 | yes |
| world3.mjs | 0f0d3dbfd4983e56fcffca3252a243ac6819b5d4fb2201a95162918c8094175f | yes |
| reachable-oracle.mjs | b20c11cad1894925239f031ecd9b5d88ddadf8a9f85e98da3d9d78634249b8ef | yes |
| checks3.mjs | 872c469a6d71995d893750bb6f108851bb94b58527e91b8ac1434a9c5050aa71 | yes |
| run3.mjs | 8030c8e048e86c94f56d87c1f57d3f56a42256fa3f3c4e72723fd3f6586fa11f | yes |
| run3-worker.mjs | 85b884beea60e4415482cf3aecd00623e7f5d53cf4b4ee763af8cb8306a66501 | yes |
| ../c2/harness2.mjs | 4cd6ca8ed399f0969f32c57cd0ced9b2bf147a6f9d34c02a1068c4ff5ecdfbee | yes |
| ../c2/learner2.mjs | 36b4839ca97d9da8f9ebba3356d450d9256a7e4ef716af490a4b3d12a2ffdc6e | yes |
| ../c2/scorer2.mjs | 2518ae27f4b442f9101e5c492182f1961199cc9a86064b3250abcc1b694f075d | yes |
| ../c2/world2.mjs | 876aa1b875ae8d60a15bb05de8a38f72750dca291ee8fe597ca183872418650c | yes |
| ../harness.mjs | 458f3dc19b1048f2110573b4befb17dd0b8f74ac9ac0fa7a58428057f74b1864 | yes |
| ../personas.copy.mjs | 9cb7a911a5aa03a4537b0dabc7383c3a87faf91fa05b1792009abee0c9d18770 | yes |
| ../../../model/model.ts | af6545119749ff8b65a533bc9291aede4aeca57173c2ed97f51a0931890c731b | yes |
| ../../../model/sim/composer.ts | a092c3b9b52411add0e61851753e29a760d8c4527699f2d7f2a73c7e72801141 | yes |
| ../../../model/sim/catalog.mjs | 877b0807cdd77a1ad9e11457524eae23b5a352c56f3b7c8dcd00b556413effc9 | yes |

## What I ran (§8 as written)

1. Worktree /home/user/s3c-r3 (branch perso-r3 at 46d7302). The committed records/2026-10-17-readout-3/{interleave,first} and the readout do not exist at b1ae294, so before checking out the run commit I copied them to scratch. Then I ran `git checkout --detach b1ae294aeb5e3a7f9fa32c2646ced7678c1f78d7` and `npm ci` (exit 0; package-lock.json is the same at 46d7302 and b1ae294). Node v22.22.0, which is the version the manifests record. The machine had 4 cores, 15 GB RAM and nothing else running.
2. Hashes: see the tables above.
3. One shell script ran the two parts one after the other, never in parallel. It ran from the repository root at b1ae294, detached with `setsid nohup`, and wrote its outputs to scratch:
   ```sh
   NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/c3/run3.mjs --seeds=1932 --jobs=4 --placements=interleave --out=<scratch>/r3-repro/interleave   # 12582.56 s, exit 0
   NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/c3/run3.mjs --seeds=1932 --jobs=4 --placements=first --out=<scratch>/r3-repro/first             # 2539.669 s, exit 0
   ```
   Wall clock: 15:05:56Z to 19:18:14Z on 2026-10-17. `<scratch>` = /tmp/claude-0/-home-user/870387d5-7ba1-5b1e-a22e-59c6a0ccb40b/scratchpad. I did not touch or read any other run's outputs. A first start at about 15:05Z was killed within a minute, before it wrote any output, and its empty directory was removed. I killed it because the tool's background timeout (2 h) was shorter than the run. Only the run above produced outputs.
4. sha256 of each output (table above), `cmp` of each verdicts.json against the committed file, and `diff` of each manifest against the committed one.
5. `node company/personalization/eval/harness/c3/readout3-tables.mjs --parts=<scratch>/r3-repro/interleave,<scratch>/r3-repro/first` (exit 0, 994 lines). I compared it with the readout's §A text, taken as line 94 (`## Run`) to the end of the file. That cut is 994 lines and its sha256 is exactly f9aa1739…505de. Then I ran `diff`.
6. After hashing and after the tables run, I deleted both of my results.ndjson files. The verdicts.json and manifest.json files stay in scratch until the report is sent.

## Every difference

**manifest.json, interleave** (`diff committed new`), 1 changed line:
- line 309 `seconds`: `10621.758` → `12582.56` (§8 allows this)

**manifest.json, first**, 1 changed line:
- line 85 `seconds`: `1946.392` → `2539.669` (§8 allows this)

No other manifest field differs. That includes commit (b1ae294aeb5e3a7f9fa32c2646ced7678c1f78d7), criterionSha256, criterionStatus, plumbing, e1Sha256, e3Sha256, e3, fileSha256, seeds and errors.

**Printed tables vs §A** (`diff §A repro`):
- line 2 (`- placements interleave …`): only `10621.758 s` → `12582.56 s`. Every other field on the line is equal.
- line 3 (`- placements first …`): only `1946.392 s` → `2539.669 s`. Every other field on the line is equal.
- The other 992 lines are identical.

## Findings

None that bear on determinism. No hash mismatched, no step needed a change, and no eval file was edited.

Two observations, neither of them a defect:
- Run time: on this machine the run took 12582.56 s and 2539.669 s. §8 gives 10622 s and 1946 s. That is 18% and 30% slower, with the same flags on 4 cores. The outputs are not affected. The next holder should budget about 4.2 h for the two parts here.
- Wording in §8 step 1: "The E3 block is world3.mjs's own (sha256 0e120add…c1927a)". That hash is the manifest's `e3Sha256`, the hash of the E3 block as JSON. It is not the file sha256 of world3.mjs, which is 0f0d3dbf…094175f and is listed under fileSha256. Both match. A reader who hashes the file will see a different number, so this note is here to prevent a false alarm.
