## Run and manifest
| field | value |
|---|---|
| criterion status | frozen (eval-s1-1020, 2026-10-20). The freeze is the commit that first adds this file with this line; its hash and this file's sha256 at that commit go in §11, written in the next commit. Nothing below changes after the first scored number; a change after that is a new criterion and the old result stands. |
| freeze commit / frozen criterion sha256 | bdebacc27be85077074a43397bfce4876420d1a2 / 40a82a40fb2b4005083c259ee63681d61674fbd33d8e299cedd5fa4ba9d64ef9 |
| run commit / criterion sha256 at the run commit | 743379aa6154bf7eadc6400b65897b5a851b6371 / 1798c8c28d4bebb1b65dc3c3eb514773191e93d0879af711be8611baeb2f6973 |
| paths changed after the freeze | company/ops/progress.md, company/personalization/eval/2026-10-20-session-criterion.md, company/personalization/eval/harness/cs/README.md, company/personalization/eval/harness/cs/RUN-PLAN-s1.md, company/personalization/eval/harness/cs/partsCheckS.mjs, company/personalization/eval/harness/cs/readoutS-tables.mjs, company/roles/memory/personalization-eval/2026-10-20-eval-s1-plan-1020.md |
| §11 formatter / parts check | 6344d79bf985b1d88980396febb4d87f71a8baa4384f15eeb9c4ced1331d448b / e32fecce11d3ebc3c56974cfb6156eacbee5216bfff93fb0d23acbedb45f2a82 |
| parts check | OK |
| S, seeds | 2000, 70001..72000 |
| candidate pin check | true |
| catalogue sha256, lessons | c65feabb2277d214a324e9869cfda1a6170fb1729b820fa5c823f3f515f8ff5f, 231 |
| model / composer / serving mode / session size | model-v0.4.4 / composer-v0.3-session / compose-session-serve-in-order / 5 |
| E1 / E3 | c8c09eac7613720c7d1499958d5c416b57ed7d614e7e68eb8a132068f7482840 / 0e120add6ada34da159d77bc7d994f092318b4bba802941f4477a4273fc1927a |
| node | v22.22.0 |
| unit errors | none |
| merged verdicts.json sha256 | 39d54187ed93cfe0aa78428a67c3af8d566410cc147e7a93394e4a5461c1df8d |

| chunk | §8 part | seconds | results lines (expected) | results.ndjson sha256 | manifest.json sha256 |
|---|---|---|---|---|---|
| A1 | A | 2777.154 | 84 (84) | cd69b88efb232bd756e661e512c0068776a4e1a90fd48521ab7a583eafd07d08 | 31ef71277cc0925a0845c1b8c52a9c5e5ceba0e9ed35526f58e5b9fdbe8a0174 |
| A2 | A | 2067.63 | 60 (60) | 01f82e2f0fd4dcb0b17e846dfa63b1f3072aee86948f7e0a5a39c7eeace0fcb0 | b00cd17db354fd6d63958818eb273c44990f4a6665610f501b11a783407c88c1 |
| A3 | A | 2024.305 | 60 (60) | 07d854c2efdc26373ca814a6c251d07ab319e05f9de2d372cc1936e26d3186e0 | 01c3d94216a98be921283b6f18c0d1f61984919bd6e5baec0f0ef8fa5960478c |
| A4 | A | 3027.897 | 90 (90) | 26faa5789fd46d82420cf952f7515cc0f723d431ea5b94462576a69e4642b240 | 6d811912b4682bb131bff86d3189bfdb0f9228c0c466f426773972ce013ef5c9 |
| A5 | A | 2048.527 | 60 (60) | a874652bbaf939f6494f063c3335bb0c33e07ada0d715a68c86b5e50c037c01c | 3cd6081dc20852aa63f04b2dc1e3d5e0427ad1862c956301ef08fee04ddc33cf |
| B1 | B | 2897.392 | 90 (90) | e385872c0c97c280bfff6a72950967827a2ef09e0d2a33fa650b294f7a0a1240 | aaa22c017478223789c5e071c9c8a93ad50847fbf747ae74f7e1b1f9291f06f5 |
| B2 | B | 2880.393 | 90 (90) | 688973b1464b6202bf8c3ce5efdaa733d9cb6262d946d29a6b024bcb061ff4ce | ae1f69caeb22b27992b203b16a0a3ce3fe88858cac3b53ed1dd94c3119f8d162 |
| B3 | B | 2885.324 | 90 (90) | f459d62d11fd8190d67798b64bbd7cbb9607bcb05a42c3a0c664bbad4c97d4d1 | 5412138cdd0dd65b56917a7d4c140b3cd85dca56befc0b7de03b4a777a168730 |
| C1 | C | 2899.576 | 90 (90) | f82df0b454fdc25170e61417cd847f0d6198a3d498dd14a5a19d9b30f688841a | e086283be3e1ba28dc3a19b82f2658659689ef633ec323033a321c313f392a40 |
| C2 | C | 2609.965 | 90 (90) | d85a5ca8493e5a1b77632ce961583ce55169af6b0a96e77e3daa1942fb86b342 | 4bf389fb39d3436eac5d6aa0704aa90206c452824c6b02eaa567c2d2b4621063 |
| C3 | C | 3125.514 | 90 (90) | e3a63c02fe19ba5ee18798c274998c91dfff90b1f9fef6f520b999df7fc2e70c | 7fffd26546cd83b4efb94ce29cf91c79cc3ea09760db6c0ff7c208aa1b5e7d47 |

Harness file sha256 (runS.mjs RUN_FILES): `harnessS.mjs` e1927b22024e… · `checksS.mjs` fc0d26a1c66d… · `runS.mjs` 04b69568f219… · `runS-worker.mjs` b7cba36dc4bb… · `../c3/harness3.mjs` fc9a98ca7138… · `../c3/learner3.mjs` 90925edaff58… · `../c3/world3.mjs` 0f0d3dbfd498… · `../c3/checks3.mjs` 872c469a6d71… · `../c3b/checks3b.mjs` 3a18559c00dc… · `../c3b/harness3b.mjs` 5ff1137a568f… · `../c2/harness2.mjs` 8140f5bf72cf… · `../c2/learner2.mjs` 36b4839ca97d… · `../c2/scorer2.mjs` 2518ae27f4b4… · `../c2/world2.mjs` 876aa1b875ae… · `../harness.mjs` 458f3dc19b10… · `../personas.copy.mjs` 9cb7a911a5aa…

## Judge checks (criterion §5; a failure stops the run)
S-ID0 true (8 files vs readout 3 at b1ae294aeb5e3a7f9fa32c2646ced7678c1f78d7) · T5c true · K-e true (231 lessons, 70001..72000 (2000)) · GAM pin true · S-ID1 true (360 episode pairs) · S-ID2 true (72 episodes)

## Validity of each session arm (criterion §5; any failure makes the arm INVALID)
| arm | INVALID | T1 replay | compositions checked (T2S/T3S/NM/T4S) | T2S | T3S | NM | T4S (picks checked) | unit errors | first fails |
|---|---|---|---|---|---|---|---|---|---|
| gam-session+fixed | no | curious-newcomer true; returning-expert true | 131 | true | true | true | true (655) | none | – |
| gam-session-v3+fixed | no | curious-newcomer true; returning-expert true | 131 | true | true | true | true (655) | none | – |
| gam-session-no-cov+fixed | no | curious-newcomer true; returning-expert true | 131 | true | true | true | true (655) | none | – |
| gam-session-v3-edpbase+fixed | no | curious-newcomer true; returning-expert true | 132 | true | true | true | true (660) | none | – |

## Readings K1 to K5 (criterion §3; keep or kill is vp-personalization's, VP record §4)
| arm | K1 gate | K1 cells named | K2 veto (simultaneous) | K2 losses | unadjusted clear losses: base cell (VP §9 O12 disclosure) | unadjusted clear losses: one-at-a-time cells | K4 subject mix | K4 cells named | K5 copy gate | K5 false / moved served |
|---|---|---|---|---|---|---|---|---|---|---|
| gam-session+fixed | **FAIL** | base | **VETO** | interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|wanderer, interleave:pullScale-low|wanderer, interleave:pullScale-high|wanderer | interleave:base|wanderer | interleave:forgetScale-low|wanderer, interleave:forgetScale-high|struggling-repeater, interleave:forgetScale-high|wanderer, interleave:forgetShape-low|wanderer, interleave:forgetShape-high|returning-expert, interleave:kSpread-low|wanderer, interleave:kSpread-high|wanderer, interleave:revisitStrengthen-low|wanderer, interleave:revisitStrengthen-high|wanderer, interleave:relearn-low|wanderer, interleave:relearn-high|wanderer, interleave:priorKnowledgeMean-high|wanderer, interleave:learnRate-low|wanderer, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|struggling-repeater, interleave:prereqPenalty-low|wanderer, interleave:pullScale-low|wanderer, interleave:pullScale-high|curious-newcomer, interleave:pullScale-high|returning-expert, interleave:pullScale-high|wanderer, interleave:revisitSlotCost-low|wanderer, interleave:revisitStopScale-low|wanderer, interleave:priorRateMult-low|wanderer, interleave:priorRateMult-high|wanderer | **HOLDS** | – | **COPY-BLOCKED** | 43863 / 3998634 (0.011) |
| gam-session-v3+fixed | **FAIL** | base | **VETO** | interleave:base|wanderer, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|wanderer | interleave:base|wanderer | interleave:forgetScale-low|curious-newcomer, interleave:forgetScale-low|wanderer, interleave:forgetScale-high|wanderer, interleave:forgetShape-low|wanderer, interleave:forgetShape-high|wanderer, interleave:kSpread-low|wanderer, interleave:kSpread-high|wanderer, interleave:revisitStrengthen-low|wanderer, interleave:revisitStrengthen-high|wanderer, interleave:relearn-low|wanderer, interleave:relearn-high|wanderer, interleave:priorKnowledgeMean-low|wanderer, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|struggling-repeater, interleave:prereqPenalty-low|wanderer, interleave:prereqPenalty-low|lapsed-returner, interleave:pullScale-low|wanderer, interleave:pullScale-high|curious-newcomer, interleave:pullScale-high|wanderer, interleave:revisitSlotCost-low|wanderer, interleave:revisitStopScale-low|curious-newcomer, interleave:revisitStopScale-low|wanderer, interleave:priorRateMult-low|wanderer, interleave:priorRateMult-high|wanderer | **HOLDS** | – | **COPY-BLOCKED** | 48057 / 4276871 (0.011) |
| gam-session-no-cov+fixed | **FAIL** | base | **VETO** | interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|wanderer | interleave:base|wanderer | interleave:forgetScale-low|wanderer, interleave:forgetScale-high|struggling-repeater, interleave:forgetScale-high|wanderer, interleave:forgetShape-low|wanderer, interleave:forgetShape-high|single-subject-crammer, interleave:forgetShape-high|returning-expert, interleave:kSpread-low|single-subject-crammer, interleave:kSpread-low|wanderer, interleave:kSpread-high|wanderer, interleave:relearn-low|single-subject-crammer, interleave:relearn-high|wanderer, interleave:priorKnowledgeMean-high|wanderer, interleave:learnRate-low|wanderer, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|struggling-repeater, interleave:prereqPenalty-low|wanderer, interleave:pullScale-low|wanderer, interleave:pullScale-high|curious-newcomer, interleave:pullScale-high|returning-expert, interleave:pullScale-high|wanderer, interleave:revisitSlotCost-low|wanderer, interleave:priorRateMult-high|wanderer | **HOLDS** | – | **COPY-BLOCKED** | 44713 / 4132188 (0.011) |
| gam-session-v3-edpbase+fixed | **FAIL** | base | **VETO** | interleave:base|curious-newcomer, interleave:base|struggling-repeater, interleave:base|wanderer, interleave:base|lapsed-returner, interleave:forgetScale-low|curious-newcomer, interleave:forgetScale-low|struggling-repeater, interleave:forgetScale-low|wanderer, interleave:forgetScale-low|lapsed-returner, interleave:forgetScale-high|curious-newcomer, interleave:forgetScale-high|struggling-repeater, interleave:forgetScale-high|wanderer, interleave:forgetScale-high|lapsed-returner, interleave:forgetShape-low|curious-newcomer, interleave:forgetShape-low|struggling-repeater, interleave:forgetShape-low|wanderer, interleave:forgetShape-high|curious-newcomer, interleave:forgetShape-high|struggling-repeater, interleave:forgetShape-high|wanderer, interleave:kSpread-low|curious-newcomer, interleave:kSpread-low|struggling-repeater, interleave:kSpread-low|wanderer, interleave:kSpread-high|curious-newcomer, interleave:kSpread-high|struggling-repeater, interleave:kSpread-high|wanderer, interleave:revisitStrengthen-low|curious-newcomer, interleave:revisitStrengthen-low|struggling-repeater, interleave:revisitStrengthen-low|wanderer, interleave:revisitStrengthen-high|curious-newcomer, interleave:revisitStrengthen-high|struggling-repeater, interleave:revisitStrengthen-high|wanderer, interleave:relearn-low|curious-newcomer, interleave:relearn-low|struggling-repeater, interleave:relearn-low|wanderer, interleave:relearn-high|curious-newcomer, interleave:relearn-high|struggling-repeater, interleave:relearn-high|wanderer, interleave:priorKnowledgeMean-low|curious-newcomer, interleave:priorKnowledgeMean-low|struggling-repeater, interleave:priorKnowledgeMean-low|wanderer, interleave:priorKnowledgeMean-low|lapsed-returner, interleave:priorKnowledgeMean-high|curious-newcomer, interleave:priorKnowledgeMean-high|struggling-repeater, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|struggling-repeater, interleave:learnRate-high|wanderer, interleave:learnRate-high|lapsed-returner, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|struggling-repeater, interleave:prereqPenalty-low|wanderer, interleave:prereqPenalty-low|lapsed-returner, interleave:pullScale-low|curious-newcomer, interleave:pullScale-low|struggling-repeater, interleave:pullScale-high|curious-newcomer, interleave:pullScale-high|struggling-repeater, interleave:pullScale-high|wanderer, interleave:pullScale-high|lapsed-returner, interleave:revisitSlotCost-low|curious-newcomer, interleave:revisitSlotCost-low|struggling-repeater, interleave:revisitSlotCost-low|wanderer, interleave:revisitSlotCost-high|curious-newcomer, interleave:revisitSlotCost-high|struggling-repeater, interleave:revisitStopScale-low|curious-newcomer, interleave:revisitStopScale-low|struggling-repeater, interleave:revisitStopScale-low|lapsed-returner, interleave:revisitStopScale-high|curious-newcomer, interleave:revisitStopScale-high|struggling-repeater, interleave:priorRateMult-low|curious-newcomer, interleave:priorRateMult-low|struggling-repeater, interleave:priorRateMult-low|wanderer, interleave:priorRateMult-high|curious-newcomer, interleave:priorRateMult-high|struggling-repeater, interleave:priorRateMult-high|wanderer, interleave:priorRateMult-high|lapsed-returner | interleave:base|curious-newcomer, interleave:base|struggling-repeater, interleave:base|wanderer, interleave:base|lapsed-returner | interleave:forgetScale-low|curious-newcomer, interleave:forgetScale-low|struggling-repeater, interleave:forgetScale-low|wanderer, interleave:forgetScale-low|lapsed-returner, interleave:forgetScale-high|curious-newcomer, interleave:forgetScale-high|struggling-repeater, interleave:forgetScale-high|wanderer, interleave:forgetScale-high|lapsed-returner, interleave:forgetShape-low|curious-newcomer, interleave:forgetShape-low|struggling-repeater, interleave:forgetShape-low|wanderer, interleave:forgetShape-low|lapsed-returner, interleave:forgetShape-high|curious-newcomer, interleave:forgetShape-high|struggling-repeater, interleave:forgetShape-high|wanderer, interleave:forgetShape-high|lapsed-returner, interleave:kSpread-low|curious-newcomer, interleave:kSpread-low|struggling-repeater, interleave:kSpread-low|wanderer, interleave:kSpread-low|lapsed-returner, interleave:kSpread-high|curious-newcomer, interleave:kSpread-high|struggling-repeater, interleave:kSpread-high|wanderer, interleave:kSpread-high|lapsed-returner, interleave:revisitStrengthen-low|curious-newcomer, interleave:revisitStrengthen-low|struggling-repeater, interleave:revisitStrengthen-low|wanderer, interleave:revisitStrengthen-low|lapsed-returner, interleave:revisitStrengthen-high|curious-newcomer, interleave:revisitStrengthen-high|struggling-repeater, interleave:revisitStrengthen-high|wanderer, interleave:revisitStrengthen-high|lapsed-returner, interleave:relearn-low|curious-newcomer, interleave:relearn-low|struggling-repeater, interleave:relearn-low|wanderer, interleave:relearn-low|lapsed-returner, interleave:relearn-high|curious-newcomer, interleave:relearn-high|struggling-repeater, interleave:relearn-high|wanderer, interleave:relearn-high|lapsed-returner, interleave:priorKnowledgeMean-low|curious-newcomer, interleave:priorKnowledgeMean-low|struggling-repeater, interleave:priorKnowledgeMean-low|wanderer, interleave:priorKnowledgeMean-low|lapsed-returner, interleave:priorKnowledgeMean-high|curious-newcomer, interleave:priorKnowledgeMean-high|struggling-repeater, interleave:priorKnowledgeMean-high|wanderer, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|struggling-repeater, interleave:learnRate-high|wanderer, interleave:learnRate-high|lapsed-returner, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|single-subject-crammer, interleave:prereqPenalty-low|struggling-repeater, interleave:prereqPenalty-low|wanderer, interleave:prereqPenalty-low|lapsed-returner, interleave:pullScale-low|curious-newcomer, interleave:pullScale-low|struggling-repeater, interleave:pullScale-high|curious-newcomer, interleave:pullScale-high|struggling-repeater, interleave:pullScale-high|wanderer, interleave:pullScale-high|lapsed-returner, interleave:revisitSlotCost-low|curious-newcomer, interleave:revisitSlotCost-low|struggling-repeater, interleave:revisitSlotCost-low|wanderer, interleave:revisitSlotCost-low|lapsed-returner, interleave:revisitSlotCost-high|curious-newcomer, interleave:revisitSlotCost-high|single-subject-crammer, interleave:revisitSlotCost-high|struggling-repeater, interleave:revisitSlotCost-high|wanderer, interleave:revisitStopScale-low|curious-newcomer, interleave:revisitStopScale-low|struggling-repeater, interleave:revisitStopScale-low|wanderer, interleave:revisitStopScale-low|lapsed-returner, interleave:revisitStopScale-high|curious-newcomer, interleave:revisitStopScale-high|struggling-repeater, interleave:revisitStopScale-high|wanderer, interleave:slots-low|curious-newcomer, interleave:slots-low|struggling-repeater, interleave:slots-high|struggling-repeater, interleave:slots-high|lapsed-returner, interleave:priorRateMult-low|curious-newcomer, interleave:priorRateMult-low|struggling-repeater, interleave:priorRateMult-low|wanderer, interleave:priorRateMult-low|lapsed-returner, interleave:priorRateMult-high|curious-newcomer, interleave:priorRateMult-high|struggling-repeater, interleave:priorRateMult-high|wanderer, interleave:priorRateMult-high|lapsed-returner | **HOLDS** | – | **COPY-BLOCKED** | 892459 / 10994914 (0.081) |

### K3 attribution (base cell; tie to the simpler)
| contrast | complex | simpler | wins | clear losses (simultaneous, 6) | preferred | Δ by persona (lo, hi) | one-at-a-time wins (context) |
|---|---|---|---|---|---|---|---|
| K3a | gam-session+fixed | gam-session-no-cov+fixed | 0 | none | **gam-session-no-cov+fixed** | curious-newcomer +0.0001 (-0.0000, +0.0001); single-subject-crammer +0.0001 (-0.0002, +0.0004); struggling-repeater +0.0001 (-0.0000, +0.0003); returning-expert +0.0000 (-0.0000, +0.0001); wanderer -0.0001 (-0.0001, +0.0000); lapsed-returner +0.0001 (-0.0001, +0.0002) | forgetScale-low 0; forgetScale-high 0; forgetShape-low 0; forgetShape-high 0; kSpread-low 0; kSpread-high 0; revisitStrengthen-low 0; revisitStrengthen-high 0; relearn-low 0; relearn-high 0; priorKnowledgeMean-low 0; priorKnowledgeMean-high 0; learnRate-low 0; learnRate-high 0; prereqPenalty-low 0; prereqPenalty-high 0; pullScale-low 0; pullScale-high 0; revisitSlotCost-low 0; revisitSlotCost-high 0; revisitStopScale-low 0; revisitStopScale-high 0; slots-low 0; slots-high 0; priorRateMult-low 0; priorRateMult-high 0 |
| K3b | gam-session-v3+fixed | gam-session+fixed | 0 | none | **gam-session+fixed** | curious-newcomer -0.0000 (-0.0002, +0.0001); single-subject-crammer +0.0007 (+0.0003, +0.0011); struggling-repeater -0.0000 (-0.0003, +0.0003); returning-expert +0.0000 (-0.0000, +0.0001); wanderer -0.0001 (-0.0002, +0.0001); lapsed-returner +0.0000 (-0.0002, +0.0002) | forgetScale-low 0; forgetScale-high 0; forgetShape-low 0; forgetShape-high 0; kSpread-low 0; kSpread-high 0; revisitStrengthen-low 0; revisitStrengthen-high 0; relearn-low 0; relearn-high 0; priorKnowledgeMean-low 0; priorKnowledgeMean-high 0; learnRate-low 0; learnRate-high 0; prereqPenalty-low 0; prereqPenalty-high 0; pullScale-low 0; pullScale-high 0; revisitSlotCost-low 0; revisitSlotCost-high 0; revisitStopScale-low 0; revisitStopScale-high 0; slots-low 0; slots-high 0; priorRateMult-low 0; priorRateMult-high 0 |
| K3c | gam-session-v3-edpbase+fixed | gam-session-v3+fixed | 0 | curious-newcomer, struggling-repeater, wanderer, lapsed-returner | **gam-session-v3+fixed** | curious-newcomer -0.0031 (-0.0040, -0.0022); single-subject-crammer +0.0005 (-0.0004, +0.0013); struggling-repeater -0.0029 (-0.0037, -0.0021); returning-expert +0.0015 (+0.0008, +0.0021); wanderer -0.0014 (-0.0022, -0.0006); lapsed-returner -0.0013 (-0.0021, -0.0005) | forgetScale-low 0; forgetScale-high 0; forgetShape-low 0; forgetShape-high 0; kSpread-low 0; kSpread-high 0; revisitStrengthen-low 0; revisitStrengthen-high 0; relearn-low 0; relearn-high 0; priorKnowledgeMean-low 0; priorKnowledgeMean-high 0; learnRate-low 0; learnRate-high 0; prereqPenalty-low 0; prereqPenalty-high 0; pullScale-low 0; pullScale-high 0; revisitSlotCost-low 0; revisitSlotCost-high 0; revisitStopScale-low 0; revisitStopScale-high 0; slots-low 0; slots-high 0; priorRateMult-low 0; priorRateMult-high 0 |

### K2 base-cell simultaneous intervals (Bonferroni, 6 personas)
| arm | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|
| gam-session+fixed | -0.0002 (-0.0007, +0.0003) | -0.0005 (-0.0013, +0.0004) | -0.0001 (-0.0008, +0.0006) | -0.0001 (-0.0002, +0.0001) | -0.0003 (-0.0007, +0.0000) | -0.0001 (-0.0007, +0.0005) |
| gam-session-v3+fixed | -0.0002 (-0.0007, +0.0004) | +0.0003 (-0.0006, +0.0011) | -0.0001 (-0.0008, +0.0006) | -0.0000 (-0.0002, +0.0002) | -0.0004 (-0.0007, -0.0000) | -0.0001 (-0.0007, +0.0005) |
| gam-session-no-cov+fixed | -0.0002 (-0.0007, +0.0003) | -0.0005 (-0.0014, +0.0003) | -0.0003 (-0.0009, +0.0004) | -0.0001 (-0.0003, +0.0001) | -0.0003 (-0.0006, +0.0001) | -0.0002 (-0.0008, +0.0004) |
| gam-session-v3-edpbase+fixed | -0.0033 (-0.0046, -0.0020) | +0.0007 (-0.0004, +0.0019) | -0.0030 (-0.0041, -0.0019) | +0.0014 (+0.0006, +0.0023) | -0.0018 (-0.0028, -0.0007) | -0.0014 (-0.0025, -0.0003) |

### K4 outside-home share of served new cards: variant − default-order, every pass cell (lower end ≥ −0.05 holds)
#### gam-session+fixed: HOLDS; dropped episodes 0
| cell | curious-newcomer Δ (lo, hi) · ref level | single-subject-crammer Δ (lo, hi) · ref level | struggling-repeater Δ (lo, hi) · ref level | returning-expert Δ (lo, hi) · ref level | wanderer Δ (lo, hi) · ref level | lapsed-returner Δ (lo, hi) · ref level |
|---|---|---|---|---|---|---|
| interleave:base | +0.0001 (-0.0007, +0.0009) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0038 (+0.0027, +0.0048) · 0.520 | -0.0000 (-0.0005, +0.0005) · 0.503 | -0.0000 (-0.0008, +0.0008) · 0.502 | +0.0007 (-0.0005, +0.0018) · 0.510 |
| interleave:forgetScale-low | +0.0001 (-0.0008, +0.0009) · 0.502 | -0.0001 (-0.0006, +0.0005) · 0.582 | +0.0037 (+0.0027, +0.0047) · 0.520 | -0.0000 (-0.0005, +0.0005) · 0.503 | +0.0000 (-0.0008, +0.0008) · 0.502 | +0.0005 (-0.0006, +0.0016) · 0.509 |
| interleave:forgetScale-high | +0.0002 (-0.0006, +0.0010) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0038 (+0.0028, +0.0048) · 0.520 | -0.0001 (-0.0006, +0.0004) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.509 |
| interleave:forgetShape-low | +0.0001 (-0.0007, +0.0009) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0038 (+0.0028, +0.0048) · 0.520 | +0.0000 (-0.0005, +0.0005) · 0.503 | +0.0000 (-0.0008, +0.0008) · 0.502 | +0.0006 (-0.0005, +0.0017) · 0.510 |
| interleave:forgetShape-high | +0.0001 (-0.0008, +0.0009) · 0.502 | -0.0005 (-0.0010, +0.0001) · 0.582 | +0.0037 (+0.0027, +0.0047) · 0.519 | -0.0001 (-0.0005, +0.0004) · 0.503 | -0.0000 (-0.0008, +0.0007) · 0.502 | +0.0006 (-0.0005, +0.0017) · 0.510 |
| interleave:kSpread-low | +0.0000 (-0.0008, +0.0009) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0038 (+0.0028, +0.0048) · 0.520 | -0.0000 (-0.0005, +0.0005) · 0.503 | -0.0000 (-0.0008, +0.0007) · 0.502 | +0.0007 (-0.0004, +0.0019) · 0.510 |
| interleave:kSpread-high | +0.0001 (-0.0008, +0.0009) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0039 (+0.0029, +0.0050) · 0.520 | -0.0000 (-0.0005, +0.0005) · 0.503 | +0.0000 (-0.0008, +0.0008) · 0.502 | +0.0006 (-0.0005, +0.0017) · 0.509 |
| interleave:revisitStrengthen-low | +0.0001 (-0.0007, +0.0009) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0038 (+0.0027, +0.0048) · 0.520 | -0.0000 (-0.0005, +0.0005) · 0.503 | -0.0000 (-0.0008, +0.0008) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.510 |
| interleave:revisitStrengthen-high | +0.0001 (-0.0007, +0.0009) · 0.502 | -0.0003 (-0.0008, +0.0002) · 0.582 | +0.0038 (+0.0027, +0.0048) · 0.520 | -0.0000 (-0.0005, +0.0005) · 0.503 | -0.0000 (-0.0008, +0.0008) · 0.502 | +0.0007 (-0.0005, +0.0018) · 0.510 |
| interleave:relearn-low | +0.0002 (-0.0006, +0.0010) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0035 (+0.0025, +0.0045) · 0.520 | -0.0000 (-0.0005, +0.0005) · 0.503 | -0.0000 (-0.0008, +0.0008) · 0.502 | +0.0006 (-0.0006, +0.0017) · 0.510 |
| interleave:relearn-high | +0.0001 (-0.0007, +0.0009) · 0.502 | -0.0003 (-0.0008, +0.0003) · 0.582 | +0.0037 (+0.0027, +0.0048) · 0.519 | -0.0000 (-0.0005, +0.0005) · 0.503 | -0.0000 (-0.0008, +0.0008) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.509 |
| interleave:priorKnowledgeMean-low | +0.0001 (-0.0008, +0.0009) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0034 (+0.0024, +0.0045) · 0.520 | -0.0001 (-0.0006, +0.0004) · 0.503 | +0.0001 (-0.0007, +0.0009) · 0.502 | +0.0006 (-0.0005, +0.0016) · 0.510 |
| interleave:priorKnowledgeMean-high | -0.0003 (-0.0011, +0.0004) · 0.502 | -0.0020 (-0.0025, -0.0015) · 0.582 | +0.0003 (-0.0007, +0.0013) · 0.519 | -0.0001 (-0.0006, +0.0004) · 0.503 | +0.0003 (-0.0005, +0.0011) · 0.502 | -0.0011 (-0.0022, +0.0001) · 0.509 |
| interleave:learnRate-low | -0.0000 (-0.0009, +0.0008) · 0.502 | -0.0008 (-0.0014, -0.0003) · 0.582 | +0.0033 (+0.0023, +0.0043) · 0.520 | -0.0001 (-0.0006, +0.0004) · 0.503 | -0.0002 (-0.0010, +0.0006) · 0.502 | +0.0006 (-0.0005, +0.0017) · 0.510 |
| interleave:learnRate-high | -0.0000 (-0.0008, +0.0008) · 0.502 | -0.0002 (-0.0007, +0.0004) · 0.582 | +0.0035 (+0.0024, +0.0045) · 0.519 | -0.0000 (-0.0005, +0.0005) · 0.503 | -0.0000 (-0.0008, +0.0008) · 0.502 | +0.0003 (-0.0008, +0.0014) · 0.509 |
| interleave:prereqPenalty-low | -0.0001 (-0.0009, +0.0007) · 0.502 | -0.0001 (-0.0007, +0.0004) · 0.582 | +0.0035 (+0.0025, +0.0046) · 0.519 | -0.0000 (-0.0005, +0.0005) · 0.503 | +0.0001 (-0.0007, +0.0009) · 0.502 | +0.0005 (-0.0006, +0.0016) · 0.509 |
| interleave:prereqPenalty-high | +0.0001 (-0.0007, +0.0009) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0035 (+0.0025, +0.0045) · 0.519 | -0.0001 (-0.0006, +0.0004) · 0.503 | +0.0001 (-0.0007, +0.0009) · 0.502 | +0.0004 (-0.0007, +0.0016) · 0.510 |
| interleave:pullScale-low | +0.0004 (-0.0004, +0.0012) · 0.502 | -0.0051 (-0.0057, -0.0045) · 0.582 | -0.0018 (-0.0029, -0.0008) · 0.520 | +0.0001 (-0.0005, +0.0006) · 0.503 | +0.0001 (-0.0008, +0.0009) · 0.502 | -0.0014 (-0.0025, -0.0002) · 0.510 |
| interleave:pullScale-high | +0.0000 (-0.0009, +0.0009) · 0.502 | +0.0017 (+0.0011, +0.0023) · 0.582 | +0.0053 (+0.0043, +0.0063) · 0.520 | +0.0000 (-0.0004, +0.0005) · 0.503 | +0.0005 (-0.0004, +0.0014) · 0.502 | +0.0023 (+0.0012, +0.0034) · 0.510 |
| interleave:revisitSlotCost-low | +0.0001 (-0.0007, +0.0009) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0038 (+0.0027, +0.0048) · 0.520 | -0.0000 (-0.0005, +0.0005) · 0.503 | -0.0000 (-0.0008, +0.0008) · 0.502 | +0.0007 (-0.0005, +0.0018) · 0.510 |
| interleave:revisitSlotCost-high | -0.0002 (-0.0010, +0.0007) · 0.502 | +0.0002 (-0.0004, +0.0008) · 0.582 | +0.0022 (+0.0011, +0.0033) · 0.519 | +0.0002 (-0.0004, +0.0008) · 0.503 | +0.0004 (-0.0004, +0.0013) · 0.502 | +0.0008 (-0.0003, +0.0020) · 0.510 |
| interleave:revisitStopScale-low | -0.0003 (-0.0011, +0.0005) · 0.502 | -0.0005 (-0.0010, +0.0001) · 0.582 | +0.0049 (+0.0039, +0.0059) · 0.520 | +0.0001 (-0.0004, +0.0006) · 0.503 | +0.0004 (-0.0003, +0.0012) · 0.502 | +0.0004 (-0.0007, +0.0015) · 0.510 |
| interleave:revisitStopScale-high | -0.0001 (-0.0010, +0.0008) · 0.501 | -0.0000 (-0.0006, +0.0005) · 0.582 | +0.0007 (-0.0005, +0.0018) · 0.519 | +0.0001 (-0.0004, +0.0007) · 0.503 | -0.0003 (-0.0011, +0.0006) · 0.503 | +0.0005 (-0.0007, +0.0018) · 0.509 |
| interleave:slots-low | +0.0006 (-0.0005, +0.0018) · 0.502 | -0.0004 (-0.0012, +0.0005) · 0.587 | -0.0085 (-0.0098, -0.0072) · 0.516 | +0.0000 (-0.0008, +0.0009) · 0.503 | +0.0002 (-0.0009, +0.0013) · 0.502 | -0.0018 (-0.0032, -0.0003) · 0.509 |
| interleave:slots-high | -0.0004 (-0.0011, +0.0002) · 0.502 | -0.0009 (-0.0016, -0.0002) · 0.602 | +0.0025 (+0.0016, +0.0034) · 0.520 | -0.0001 (-0.0004, +0.0003) · 0.504 | +0.0002 (-0.0005, +0.0008) · 0.502 | +0.0000 (-0.0010, +0.0010) · 0.510 |
| interleave:priorRateMult-low | +0.0001 (-0.0008, +0.0009) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0038 (+0.0027, +0.0048) · 0.520 | -0.0000 (-0.0005, +0.0005) · 0.503 | -0.0000 (-0.0008, +0.0008) · 0.502 | +0.0007 (-0.0005, +0.0018) · 0.510 |
| interleave:priorRateMult-high | +0.0002 (-0.0007, +0.0010) · 0.502 | -0.0003 (-0.0009, +0.0002) · 0.582 | +0.0038 (+0.0027, +0.0048) · 0.520 | -0.0000 (-0.0005, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0006 (-0.0005, +0.0017) · 0.510 |

#### gam-session-v3+fixed: HOLDS; dropped episodes 0
| cell | curious-newcomer Δ (lo, hi) · ref level | single-subject-crammer Δ (lo, hi) · ref level | struggling-repeater Δ (lo, hi) · ref level | returning-expert Δ (lo, hi) · ref level | wanderer Δ (lo, hi) · ref level | lapsed-returner Δ (lo, hi) · ref level |
|---|---|---|---|---|---|---|
| interleave:base | -0.0001 (-0.0009, +0.0007) · 0.502 | -0.0001 (-0.0007, +0.0005) · 0.582 | +0.0049 (+0.0039, +0.0059) · 0.520 | +0.0000 (-0.0004, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0008) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.510 |
| interleave:forgetScale-low | -0.0002 (-0.0010, +0.0007) · 0.502 | +0.0002 (-0.0003, +0.0008) · 0.582 | +0.0046 (+0.0036, +0.0056) · 0.520 | +0.0000 (-0.0004, +0.0005) · 0.503 | -0.0000 (-0.0008, +0.0008) · 0.502 | +0.0008 (-0.0003, +0.0019) · 0.509 |
| interleave:forgetScale-high | -0.0002 (-0.0010, +0.0007) · 0.502 | -0.0002 (-0.0008, +0.0004) · 0.582 | +0.0049 (+0.0039, +0.0059) · 0.520 | +0.0001 (-0.0004, +0.0005) · 0.503 | -0.0002 (-0.0010, +0.0006) · 0.502 | +0.0008 (-0.0003, +0.0020) · 0.509 |
| interleave:forgetShape-low | -0.0001 (-0.0009, +0.0007) · 0.502 | -0.0001 (-0.0006, +0.0005) · 0.582 | +0.0050 (+0.0040, +0.0060) · 0.520 | +0.0001 (-0.0004, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0008) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.510 |
| interleave:forgetShape-high | -0.0001 (-0.0009, +0.0007) · 0.502 | -0.0003 (-0.0008, +0.0003) · 0.582 | +0.0049 (+0.0038, +0.0059) · 0.519 | +0.0000 (-0.0005, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0008) · 0.502 | +0.0008 (-0.0003, +0.0019) · 0.510 |
| interleave:kSpread-low | -0.0002 (-0.0010, +0.0007) · 0.502 | -0.0001 (-0.0007, +0.0005) · 0.582 | +0.0050 (+0.0040, +0.0061) · 0.520 | +0.0000 (-0.0004, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.510 |
| interleave:kSpread-high | -0.0002 (-0.0010, +0.0007) · 0.502 | -0.0000 (-0.0006, +0.0005) · 0.582 | +0.0049 (+0.0039, +0.0060) · 0.520 | +0.0000 (-0.0005, +0.0005) · 0.503 | -0.0002 (-0.0010, +0.0006) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.509 |
| interleave:revisitStrengthen-low | -0.0002 (-0.0010, +0.0007) · 0.502 | -0.0001 (-0.0007, +0.0005) · 0.582 | +0.0050 (+0.0039, +0.0060) · 0.520 | +0.0000 (-0.0004, +0.0005) · 0.503 | -0.0000 (-0.0009, +0.0008) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.510 |
| interleave:revisitStrengthen-high | -0.0001 (-0.0009, +0.0007) · 0.502 | -0.0001 (-0.0007, +0.0005) · 0.582 | +0.0049 (+0.0039, +0.0060) · 0.520 | +0.0000 (-0.0004, +0.0005) · 0.503 | -0.0000 (-0.0009, +0.0008) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.510 |
| interleave:relearn-low | -0.0000 (-0.0009, +0.0008) · 0.502 | -0.0000 (-0.0006, +0.0005) · 0.582 | +0.0048 (+0.0038, +0.0058) · 0.520 | +0.0000 (-0.0005, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0008) · 0.502 | +0.0006 (-0.0005, +0.0017) · 0.510 |
| interleave:relearn-high | -0.0002 (-0.0010, +0.0007) · 0.502 | -0.0001 (-0.0007, +0.0004) · 0.582 | +0.0050 (+0.0039, +0.0060) · 0.519 | +0.0000 (-0.0005, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0008) · 0.502 | +0.0006 (-0.0005, +0.0018) · 0.509 |
| interleave:priorKnowledgeMean-low | -0.0005 (-0.0014, +0.0004) · 0.502 | -0.0001 (-0.0006, +0.0005) · 0.582 | +0.0046 (+0.0036, +0.0057) · 0.520 | -0.0001 (-0.0006, +0.0003) · 0.503 | +0.0002 (-0.0006, +0.0010) · 0.502 | +0.0011 (+0.0000, +0.0023) · 0.510 |
| interleave:priorKnowledgeMean-high | -0.0003 (-0.0011, +0.0005) · 0.502 | -0.0020 (-0.0025, -0.0015) · 0.582 | +0.0013 (+0.0003, +0.0023) · 0.519 | -0.0001 (-0.0006, +0.0004) · 0.503 | +0.0002 (-0.0006, +0.0010) · 0.502 | -0.0007 (-0.0018, +0.0004) · 0.509 |
| interleave:learnRate-low | -0.0001 (-0.0009, +0.0008) · 0.502 | -0.0004 (-0.0010, +0.0002) · 0.582 | +0.0049 (+0.0038, +0.0059) · 0.520 | -0.0001 (-0.0006, +0.0004) · 0.503 | -0.0004 (-0.0013, +0.0004) · 0.502 | +0.0010 (-0.0001, +0.0021) · 0.510 |
| interleave:learnRate-high | -0.0001 (-0.0010, +0.0007) · 0.502 | +0.0001 (-0.0004, +0.0007) · 0.582 | +0.0041 (+0.0031, +0.0051) · 0.519 | +0.0001 (-0.0004, +0.0006) · 0.503 | +0.0001 (-0.0007, +0.0009) · 0.502 | +0.0002 (-0.0009, +0.0013) · 0.509 |
| interleave:prereqPenalty-low | -0.0001 (-0.0010, +0.0007) · 0.502 | +0.0001 (-0.0005, +0.0006) · 0.582 | +0.0048 (+0.0038, +0.0058) · 0.519 | +0.0000 (-0.0004, +0.0005) · 0.503 | +0.0003 (-0.0005, +0.0012) · 0.502 | +0.0008 (-0.0003, +0.0019) · 0.509 |
| interleave:prereqPenalty-high | +0.0000 (-0.0008, +0.0009) · 0.502 | -0.0002 (-0.0008, +0.0003) · 0.582 | +0.0051 (+0.0040, +0.0061) · 0.519 | -0.0001 (-0.0006, +0.0004) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0008 (-0.0004, +0.0019) · 0.510 |
| interleave:pullScale-low | +0.0002 (-0.0006, +0.0010) · 0.502 | -0.0049 (-0.0054, -0.0043) · 0.582 | -0.0010 (-0.0021, +0.0001) · 0.520 | -0.0001 (-0.0007, +0.0004) · 0.503 | -0.0002 (-0.0010, +0.0007) · 0.502 | -0.0011 (-0.0022, +0.0001) · 0.510 |
| interleave:pullScale-high | +0.0002 (-0.0007, +0.0012) · 0.502 | +0.0017 (+0.0011, +0.0023) · 0.582 | +0.0066 (+0.0055, +0.0076) · 0.520 | +0.0001 (-0.0004, +0.0005) · 0.503 | -0.0003 (-0.0012, +0.0005) · 0.502 | +0.0025 (+0.0014, +0.0036) · 0.510 |
| interleave:revisitSlotCost-low | -0.0001 (-0.0009, +0.0007) · 0.502 | -0.0001 (-0.0007, +0.0005) · 0.582 | +0.0049 (+0.0039, +0.0059) · 0.520 | +0.0000 (-0.0004, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0008) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.510 |
| interleave:revisitSlotCost-high | -0.0002 (-0.0011, +0.0007) · 0.502 | +0.0007 (+0.0000, +0.0013) · 0.582 | +0.0032 (+0.0021, +0.0042) · 0.519 | +0.0002 (-0.0004, +0.0008) · 0.503 | +0.0005 (-0.0004, +0.0014) · 0.502 | +0.0005 (-0.0007, +0.0017) · 0.510 |
| interleave:revisitStopScale-low | -0.0004 (-0.0013, +0.0004) · 0.502 | -0.0003 (-0.0008, +0.0003) · 0.582 | +0.0057 (+0.0048, +0.0067) · 0.520 | +0.0001 (-0.0004, +0.0006) · 0.503 | +0.0003 (-0.0004, +0.0011) · 0.502 | +0.0007 (-0.0003, +0.0018) · 0.510 |
| interleave:revisitStopScale-high | -0.0003 (-0.0012, +0.0006) · 0.501 | +0.0002 (-0.0004, +0.0008) · 0.582 | +0.0011 (-0.0000, +0.0023) · 0.519 | +0.0002 (-0.0003, +0.0007) · 0.503 | -0.0007 (-0.0016, +0.0001) · 0.503 | +0.0006 (-0.0007, +0.0018) · 0.509 |
| interleave:slots-low | +0.0004 (-0.0007, +0.0016) · 0.502 | +0.0013 (+0.0004, +0.0022) · 0.587 | -0.0082 (-0.0095, -0.0069) · 0.516 | -0.0002 (-0.0011, +0.0007) · 0.503 | +0.0003 (-0.0008, +0.0015) · 0.502 | -0.0014 (-0.0029, +0.0001) · 0.509 |
| interleave:slots-high | -0.0004 (-0.0010, +0.0003) · 0.502 | -0.0006 (-0.0013, +0.0001) · 0.602 | +0.0030 (+0.0021, +0.0040) · 0.520 | -0.0001 (-0.0004, +0.0002) · 0.504 | +0.0000 (-0.0007, +0.0007) · 0.502 | +0.0006 (-0.0004, +0.0016) · 0.510 |
| interleave:priorRateMult-low | -0.0001 (-0.0010, +0.0007) · 0.502 | -0.0001 (-0.0007, +0.0004) · 0.582 | +0.0049 (+0.0039, +0.0060) · 0.520 | +0.0000 (-0.0004, +0.0005) · 0.503 | -0.0000 (-0.0009, +0.0008) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.510 |
| interleave:priorRateMult-high | -0.0001 (-0.0009, +0.0007) · 0.502 | -0.0001 (-0.0007, +0.0005) · 0.582 | +0.0049 (+0.0039, +0.0059) · 0.520 | +0.0000 (-0.0004, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.510 |

#### gam-session-no-cov+fixed: HOLDS; dropped episodes 0
| cell | curious-newcomer Δ (lo, hi) · ref level | single-subject-crammer Δ (lo, hi) · ref level | struggling-repeater Δ (lo, hi) · ref level | returning-expert Δ (lo, hi) · ref level | wanderer Δ (lo, hi) · ref level | lapsed-returner Δ (lo, hi) · ref level |
|---|---|---|---|---|---|---|
| interleave:base | +0.0000 (-0.0008, +0.0008) · 0.502 | -0.0002 (-0.0008, +0.0003) · 0.582 | +0.0038 (+0.0028, +0.0048) · 0.520 | +0.0001 (-0.0004, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0010 (-0.0001, +0.0021) · 0.510 |
| interleave:forgetScale-low | -0.0000 (-0.0008, +0.0008) · 0.502 | -0.0001 (-0.0006, +0.0005) · 0.582 | +0.0039 (+0.0028, +0.0049) · 0.520 | +0.0001 (-0.0004, +0.0006) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0008 (-0.0003, +0.0019) · 0.509 |
| interleave:forgetScale-high | +0.0001 (-0.0007, +0.0009) · 0.502 | -0.0003 (-0.0009, +0.0003) · 0.582 | +0.0037 (+0.0027, +0.0047) · 0.520 | +0.0000 (-0.0005, +0.0005) · 0.503 | -0.0002 (-0.0010, +0.0006) · 0.502 | +0.0011 (-0.0000, +0.0022) · 0.509 |
| interleave:forgetShape-low | -0.0000 (-0.0008, +0.0008) · 0.502 | -0.0002 (-0.0008, +0.0003) · 0.582 | +0.0038 (+0.0028, +0.0048) · 0.520 | +0.0001 (-0.0004, +0.0006) · 0.503 | -0.0000 (-0.0008, +0.0007) · 0.502 | +0.0009 (-0.0002, +0.0020) · 0.510 |
| interleave:forgetShape-high | -0.0001 (-0.0009, +0.0007) · 0.502 | -0.0004 (-0.0009, +0.0002) · 0.582 | +0.0038 (+0.0027, +0.0048) · 0.519 | +0.0000 (-0.0004, +0.0005) · 0.503 | -0.0002 (-0.0010, +0.0006) · 0.502 | +0.0011 (-0.0000, +0.0022) · 0.510 |
| interleave:kSpread-low | -0.0001 (-0.0009, +0.0007) · 0.502 | -0.0002 (-0.0008, +0.0003) · 0.582 | +0.0037 (+0.0027, +0.0048) · 0.520 | +0.0001 (-0.0004, +0.0006) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0010 (-0.0001, +0.0021) · 0.510 |
| interleave:kSpread-high | +0.0000 (-0.0008, +0.0008) · 0.502 | -0.0003 (-0.0008, +0.0003) · 0.582 | +0.0040 (+0.0030, +0.0050) · 0.520 | +0.0001 (-0.0004, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0009 (-0.0002, +0.0020) · 0.509 |
| interleave:revisitStrengthen-low | +0.0000 (-0.0008, +0.0009) · 0.502 | -0.0002 (-0.0008, +0.0003) · 0.582 | +0.0038 (+0.0028, +0.0048) · 0.520 | +0.0001 (-0.0004, +0.0006) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0011 (-0.0000, +0.0022) · 0.510 |
| interleave:revisitStrengthen-high | -0.0000 (-0.0008, +0.0008) · 0.502 | -0.0002 (-0.0008, +0.0003) · 0.582 | +0.0038 (+0.0028, +0.0048) · 0.520 | +0.0001 (-0.0004, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0010 (-0.0001, +0.0021) · 0.510 |
| interleave:relearn-low | +0.0000 (-0.0008, +0.0008) · 0.502 | -0.0002 (-0.0008, +0.0003) · 0.582 | +0.0036 (+0.0025, +0.0046) · 0.520 | +0.0001 (-0.0004, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0010 (-0.0001, +0.0021) · 0.510 |
| interleave:relearn-high | -0.0000 (-0.0008, +0.0008) · 0.502 | -0.0002 (-0.0008, +0.0003) · 0.582 | +0.0038 (+0.0028, +0.0048) · 0.519 | +0.0000 (-0.0004, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0011 (-0.0001, +0.0022) · 0.509 |
| interleave:priorKnowledgeMean-low | +0.0002 (-0.0006, +0.0010) · 0.502 | -0.0006 (-0.0012, -0.0001) · 0.582 | +0.0036 (+0.0025, +0.0046) · 0.520 | +0.0000 (-0.0005, +0.0005) · 0.503 | +0.0003 (-0.0006, +0.0011) · 0.502 | +0.0003 (-0.0007, +0.0014) · 0.510 |
| interleave:priorKnowledgeMean-high | -0.0005 (-0.0012, +0.0003) · 0.502 | -0.0025 (-0.0031, -0.0020) · 0.582 | +0.0003 (-0.0007, +0.0012) · 0.519 | -0.0002 (-0.0007, +0.0003) · 0.503 | +0.0002 (-0.0006, +0.0010) · 0.502 | -0.0010 (-0.0021, +0.0002) · 0.509 |
| interleave:learnRate-low | -0.0001 (-0.0009, +0.0007) · 0.502 | -0.0009 (-0.0015, -0.0003) · 0.582 | +0.0030 (+0.0019, +0.0040) · 0.520 | -0.0000 (-0.0005, +0.0005) · 0.503 | -0.0001 (-0.0010, +0.0007) · 0.502 | +0.0009 (-0.0002, +0.0021) · 0.510 |
| interleave:learnRate-high | -0.0000 (-0.0009, +0.0008) · 0.502 | -0.0001 (-0.0007, +0.0004) · 0.582 | +0.0035 (+0.0024, +0.0045) · 0.519 | +0.0001 (-0.0004, +0.0006) · 0.503 | +0.0001 (-0.0007, +0.0009) · 0.502 | +0.0005 (-0.0006, +0.0016) · 0.509 |
| interleave:prereqPenalty-low | -0.0001 (-0.0009, +0.0007) · 0.502 | -0.0001 (-0.0007, +0.0004) · 0.582 | +0.0035 (+0.0025, +0.0045) · 0.519 | +0.0001 (-0.0004, +0.0006) · 0.503 | +0.0000 (-0.0007, +0.0008) · 0.502 | +0.0007 (-0.0004, +0.0018) · 0.509 |
| interleave:prereqPenalty-high | +0.0001 (-0.0007, +0.0009) · 0.502 | -0.0003 (-0.0009, +0.0003) · 0.582 | +0.0034 (+0.0024, +0.0044) · 0.519 | +0.0000 (-0.0004, +0.0005) · 0.503 | -0.0000 (-0.0008, +0.0008) · 0.502 | +0.0008 (-0.0003, +0.0020) · 0.510 |
| interleave:pullScale-low | +0.0003 (-0.0005, +0.0011) · 0.502 | -0.0052 (-0.0058, -0.0046) · 0.582 | -0.0020 (-0.0030, -0.0010) · 0.520 | +0.0001 (-0.0005, +0.0006) · 0.503 | -0.0001 (-0.0010, +0.0007) · 0.502 | -0.0011 (-0.0023, +0.0001) · 0.510 |
| interleave:pullScale-high | +0.0001 (-0.0008, +0.0010) · 0.502 | +0.0014 (+0.0008, +0.0020) · 0.582 | +0.0049 (+0.0039, +0.0059) · 0.520 | +0.0000 (-0.0004, +0.0005) · 0.503 | +0.0003 (-0.0006, +0.0012) · 0.502 | +0.0021 (+0.0010, +0.0032) · 0.510 |
| interleave:revisitSlotCost-low | +0.0000 (-0.0008, +0.0008) · 0.502 | -0.0002 (-0.0008, +0.0003) · 0.582 | +0.0038 (+0.0028, +0.0048) · 0.520 | +0.0001 (-0.0004, +0.0005) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0010 (-0.0001, +0.0021) · 0.510 |
| interleave:revisitSlotCost-high | -0.0003 (-0.0012, +0.0006) · 0.502 | -0.0001 (-0.0007, +0.0005) · 0.582 | +0.0019 (+0.0008, +0.0029) · 0.519 | +0.0001 (-0.0005, +0.0007) · 0.503 | +0.0004 (-0.0004, +0.0013) · 0.502 | +0.0009 (-0.0003, +0.0020) · 0.510 |
| interleave:revisitStopScale-low | -0.0003 (-0.0011, +0.0005) · 0.502 | -0.0004 (-0.0010, +0.0001) · 0.582 | +0.0050 (+0.0040, +0.0060) · 0.520 | +0.0002 (-0.0003, +0.0006) · 0.503 | +0.0003 (-0.0005, +0.0010) · 0.502 | +0.0006 (-0.0005, +0.0017) · 0.510 |
| interleave:revisitStopScale-high | +0.0000 (-0.0009, +0.0009) · 0.501 | -0.0003 (-0.0009, +0.0003) · 0.582 | +0.0007 (-0.0005, +0.0018) · 0.519 | +0.0002 (-0.0003, +0.0007) · 0.503 | -0.0001 (-0.0010, +0.0007) · 0.503 | +0.0007 (-0.0005, +0.0019) · 0.509 |
| interleave:slots-low | +0.0003 (-0.0009, +0.0014) · 0.502 | -0.0007 (-0.0016, +0.0001) · 0.587 | -0.0085 (-0.0098, -0.0072) · 0.516 | +0.0001 (-0.0008, +0.0010) · 0.503 | +0.0006 (-0.0006, +0.0017) · 0.502 | -0.0017 (-0.0031, -0.0002) · 0.509 |
| interleave:slots-high | -0.0005 (-0.0011, +0.0002) · 0.502 | -0.0010 (-0.0017, -0.0003) · 0.602 | +0.0026 (+0.0017, +0.0035) · 0.520 | -0.0000 (-0.0003, +0.0003) · 0.504 | -0.0000 (-0.0007, +0.0006) · 0.502 | +0.0000 (-0.0010, +0.0010) · 0.510 |
| interleave:priorRateMult-low | -0.0000 (-0.0008, +0.0008) · 0.502 | -0.0002 (-0.0008, +0.0003) · 0.582 | +0.0038 (+0.0028, +0.0048) · 0.520 | +0.0001 (-0.0004, +0.0006) · 0.503 | -0.0001 (-0.0009, +0.0007) · 0.502 | +0.0010 (-0.0001, +0.0022) · 0.510 |
| interleave:priorRateMult-high | +0.0001 (-0.0008, +0.0009) · 0.502 | -0.0002 (-0.0008, +0.0003) · 0.582 | +0.0038 (+0.0028, +0.0048) · 0.520 | +0.0001 (-0.0004, +0.0006) · 0.503 | -0.0001 (-0.0009, +0.0006) · 0.502 | +0.0010 (-0.0002, +0.0021) · 0.510 |

#### gam-session-v3-edpbase+fixed: HOLDS; dropped episodes 0
| cell | curious-newcomer Δ (lo, hi) · ref level | single-subject-crammer Δ (lo, hi) · ref level | struggling-repeater Δ (lo, hi) · ref level | returning-expert Δ (lo, hi) · ref level | wanderer Δ (lo, hi) · ref level | lapsed-returner Δ (lo, hi) · ref level |
|---|---|---|---|---|---|---|
| interleave:base | +0.0004 (-0.0018, +0.0027) · 0.502 | +0.0275 (+0.0264, +0.0286) · 0.582 | +0.0409 (+0.0394, +0.0425) · 0.520 | +0.0000 (-0.0016, +0.0016) · 0.503 | -0.0006 (-0.0029, +0.0016) · 0.502 | +0.0204 (+0.0179, +0.0228) · 0.510 |
| interleave:forgetScale-low | +0.0002 (-0.0020, +0.0024) · 0.502 | +0.0266 (+0.0255, +0.0278) · 0.582 | +0.0401 (+0.0385, +0.0416) · 0.520 | +0.0001 (-0.0015, +0.0017) · 0.503 | -0.0005 (-0.0027, +0.0018) · 0.502 | +0.0204 (+0.0179, +0.0228) · 0.509 |
| interleave:forgetScale-high | +0.0005 (-0.0018, +0.0028) · 0.502 | +0.0286 (+0.0275, +0.0297) · 0.582 | +0.0408 (+0.0393, +0.0424) · 0.520 | -0.0001 (-0.0018, +0.0015) · 0.503 | -0.0009 (-0.0032, +0.0014) · 0.502 | +0.0212 (+0.0188, +0.0237) · 0.509 |
| interleave:forgetShape-low | +0.0004 (-0.0019, +0.0026) · 0.502 | +0.0275 (+0.0263, +0.0286) · 0.582 | +0.0408 (+0.0393, +0.0424) · 0.520 | +0.0000 (-0.0016, +0.0017) · 0.503 | -0.0007 (-0.0030, +0.0016) · 0.502 | +0.0202 (+0.0178, +0.0226) · 0.510 |
| interleave:forgetShape-high | +0.0004 (-0.0018, +0.0027) · 0.502 | +0.0275 (+0.0264, +0.0286) · 0.582 | +0.0407 (+0.0392, +0.0422) · 0.519 | -0.0001 (-0.0017, +0.0016) · 0.503 | -0.0008 (-0.0031, +0.0015) · 0.502 | +0.0206 (+0.0181, +0.0230) · 0.510 |
| interleave:kSpread-low | +0.0004 (-0.0018, +0.0026) · 0.502 | +0.0274 (+0.0262, +0.0285) · 0.582 | +0.0413 (+0.0398, +0.0428) · 0.520 | +0.0000 (-0.0016, +0.0016) · 0.503 | -0.0002 (-0.0025, +0.0021) · 0.502 | +0.0204 (+0.0180, +0.0228) · 0.510 |
| interleave:kSpread-high | +0.0004 (-0.0019, +0.0026) · 0.502 | +0.0276 (+0.0265, +0.0287) · 0.582 | +0.0407 (+0.0392, +0.0423) · 0.520 | -0.0001 (-0.0017, +0.0015) · 0.503 | -0.0008 (-0.0031, +0.0015) · 0.502 | +0.0204 (+0.0180, +0.0228) · 0.509 |
| interleave:revisitStrengthen-low | +0.0005 (-0.0017, +0.0027) · 0.502 | +0.0274 (+0.0263, +0.0286) · 0.582 | +0.0410 (+0.0394, +0.0425) · 0.520 | -0.0000 (-0.0016, +0.0016) · 0.503 | -0.0007 (-0.0029, +0.0016) · 0.502 | +0.0204 (+0.0180, +0.0228) · 0.510 |
| interleave:revisitStrengthen-high | +0.0004 (-0.0018, +0.0027) · 0.502 | +0.0275 (+0.0264, +0.0286) · 0.582 | +0.0409 (+0.0394, +0.0424) · 0.520 | +0.0000 (-0.0016, +0.0016) · 0.503 | -0.0006 (-0.0029, +0.0016) · 0.502 | +0.0203 (+0.0179, +0.0227) · 0.510 |
| interleave:relearn-low | +0.0003 (-0.0019, +0.0025) · 0.502 | +0.0275 (+0.0264, +0.0287) · 0.582 | +0.0409 (+0.0394, +0.0424) · 0.520 | -0.0000 (-0.0016, +0.0016) · 0.503 | -0.0006 (-0.0029, +0.0016) · 0.502 | +0.0205 (+0.0180, +0.0229) · 0.510 |
| interleave:relearn-high | +0.0004 (-0.0018, +0.0026) · 0.502 | +0.0275 (+0.0263, +0.0286) · 0.582 | +0.0410 (+0.0394, +0.0425) · 0.519 | +0.0000 (-0.0016, +0.0017) · 0.503 | -0.0006 (-0.0029, +0.0016) · 0.502 | +0.0204 (+0.0180, +0.0229) · 0.509 |
| interleave:priorKnowledgeMean-low | +0.0002 (-0.0021, +0.0024) · 0.502 | +0.0288 (+0.0277, +0.0299) · 0.582 | +0.0408 (+0.0393, +0.0423) · 0.520 | +0.0006 (-0.0011, +0.0023) · 0.503 | +0.0003 (-0.0020, +0.0026) · 0.502 | +0.0217 (+0.0193, +0.0240) · 0.510 |
| interleave:priorKnowledgeMean-high | +0.0001 (-0.0021, +0.0023) · 0.502 | +0.0206 (+0.0195, +0.0218) · 0.582 | +0.0391 (+0.0375, +0.0408) · 0.519 | +0.0006 (-0.0011, +0.0022) · 0.503 | +0.0005 (-0.0016, +0.0026) · 0.502 | +0.0202 (+0.0179, +0.0225) · 0.509 |
| interleave:learnRate-low | +0.0005 (-0.0017, +0.0027) · 0.502 | +0.0284 (+0.0273, +0.0296) · 0.582 | +0.0399 (+0.0383, +0.0414) · 0.520 | -0.0008 (-0.0025, +0.0009) · 0.503 | -0.0004 (-0.0026, +0.0019) · 0.502 | +0.0202 (+0.0177, +0.0226) · 0.510 |
| interleave:learnRate-high | +0.0003 (-0.0019, +0.0026) · 0.502 | +0.0253 (+0.0242, +0.0263) · 0.582 | +0.0408 (+0.0394, +0.0423) · 0.519 | +0.0002 (-0.0014, +0.0018) · 0.503 | -0.0000 (-0.0022, +0.0021) · 0.502 | +0.0207 (+0.0183, +0.0231) · 0.509 |
| interleave:prereqPenalty-low | +0.0007 (-0.0015, +0.0029) · 0.502 | +0.0270 (+0.0259, +0.0281) · 0.582 | +0.0404 (+0.0389, +0.0419) · 0.519 | +0.0003 (-0.0013, +0.0019) · 0.503 | -0.0004 (-0.0026, +0.0018) · 0.502 | +0.0205 (+0.0181, +0.0229) · 0.509 |
| interleave:prereqPenalty-high | +0.0001 (-0.0021, +0.0024) · 0.502 | +0.0284 (+0.0273, +0.0295) · 0.582 | +0.0413 (+0.0397, +0.0428) · 0.519 | -0.0003 (-0.0020, +0.0013) · 0.503 | -0.0001 (-0.0024, +0.0022) · 0.502 | +0.0208 (+0.0183, +0.0233) · 0.510 |
| interleave:pullScale-low | -0.0016 (-0.0039, +0.0006) · 0.502 | +0.0208 (+0.0196, +0.0220) · 0.582 | +0.0410 (+0.0393, +0.0427) · 0.520 | +0.0002 (-0.0016, +0.0019) · 0.503 | -0.0002 (-0.0025, +0.0021) · 0.502 | +0.0189 (+0.0165, +0.0212) · 0.510 |
| interleave:pullScale-high | -0.0002 (-0.0023, +0.0019) · 0.502 | +0.0367 (+0.0356, +0.0377) · 0.582 | +0.0397 (+0.0383, +0.0411) · 0.520 | -0.0000 (-0.0018, +0.0018) · 0.503 | +0.0012 (-0.0010, +0.0035) · 0.502 | +0.0187 (+0.0164, +0.0210) · 0.510 |
| interleave:revisitSlotCost-low | +0.0004 (-0.0018, +0.0027) · 0.502 | +0.0275 (+0.0264, +0.0286) · 0.582 | +0.0409 (+0.0394, +0.0425) · 0.520 | +0.0000 (-0.0016, +0.0016) · 0.503 | -0.0006 (-0.0029, +0.0016) · 0.502 | +0.0204 (+0.0179, +0.0228) · 0.510 |
| interleave:revisitSlotCost-high | +0.0001 (-0.0022, +0.0024) · 0.502 | +0.0314 (+0.0301, +0.0327) · 0.582 | +0.0419 (+0.0402, +0.0435) · 0.519 | -0.0000 (-0.0020, +0.0019) · 0.503 | +0.0005 (-0.0020, +0.0030) · 0.502 | +0.0202 (+0.0176, +0.0227) · 0.510 |
| interleave:revisitStopScale-low | +0.0003 (-0.0019, +0.0025) · 0.502 | +0.0272 (+0.0261, +0.0283) · 0.582 | +0.0421 (+0.0406, +0.0435) · 0.520 | +0.0004 (-0.0012, +0.0020) · 0.503 | +0.0000 (-0.0022, +0.0022) · 0.502 | +0.0199 (+0.0177, +0.0222) · 0.510 |
| interleave:revisitStopScale-high | +0.0005 (-0.0017, +0.0027) · 0.501 | +0.0276 (+0.0264, +0.0288) · 0.582 | +0.0402 (+0.0385, +0.0420) · 0.519 | -0.0003 (-0.0020, +0.0014) · 0.503 | -0.0009 (-0.0032, +0.0014) · 0.503 | +0.0194 (+0.0168, +0.0220) · 0.509 |
| interleave:slots-low | +0.0017 (-0.0008, +0.0042) · 0.502 | +0.0191 (+0.0173, +0.0209) · 0.587 | +0.0437 (+0.0415, +0.0459) · 0.516 | +0.0002 (-0.0022, +0.0026) · 0.503 | -0.0010 (-0.0037, +0.0018) · 0.502 | +0.0179 (+0.0150, +0.0208) · 0.509 |
| interleave:slots-high | -0.0013 (-0.0033, +0.0008) · 0.502 | +0.0281 (+0.0272, +0.0291) · 0.602 | +0.0417 (+0.0404, +0.0430) · 0.520 | +0.0003 (-0.0012, +0.0017) · 0.504 | +0.0008 (-0.0012, +0.0028) · 0.502 | +0.0177 (+0.0156, +0.0198) · 0.510 |
| interleave:priorRateMult-low | +0.0004 (-0.0018, +0.0027) · 0.502 | +0.0275 (+0.0264, +0.0286) · 0.582 | +0.0409 (+0.0394, +0.0425) · 0.520 | +0.0000 (-0.0016, +0.0016) · 0.503 | -0.0006 (-0.0029, +0.0017) · 0.502 | +0.0204 (+0.0180, +0.0228) · 0.510 |
| interleave:priorRateMult-high | +0.0004 (-0.0018, +0.0027) · 0.502 | +0.0275 (+0.0264, +0.0286) · 0.582 | +0.0409 (+0.0394, +0.0425) · 0.520 | -0.0000 (-0.0016, +0.0016) · 0.503 | -0.0005 (-0.0028, +0.0017) · 0.502 | +0.0203 (+0.0179, +0.0227) · 0.510 |

### K5 served moved cards by cell
#### gam-session+fixed: COPY-BLOCKED; pooled: moved served 3998634, carries true 3954771, false 43863, missing 0, near-ties 277 (context), served new 25726154
| cell | moved served | false | true | missing | near-ties | false share |
|---|---|---|---|---|---|---|
| interleave:base | 148191 | 1630 | 146561 | 0 | 11 | 0.011 |
| interleave:forgetScale-low | 146126 | 1586 | 144540 | 0 | 11 | 0.011 |
| interleave:forgetScale-high | 152036 | 1652 | 150384 | 0 | 10 | 0.011 |
| interleave:forgetShape-low | 148114 | 1627 | 146487 | 0 | 11 | 0.011 |
| interleave:forgetShape-high | 148903 | 1628 | 147275 | 0 | 11 | 0.011 |
| interleave:kSpread-low | 148020 | 1623 | 146397 | 0 | 11 | 0.011 |
| interleave:kSpread-high | 148502 | 1624 | 146878 | 0 | 11 | 0.011 |
| interleave:revisitStrengthen-low | 148203 | 1629 | 146574 | 0 | 11 | 0.011 |
| interleave:revisitStrengthen-high | 148184 | 1630 | 146554 | 0 | 11 | 0.011 |
| interleave:relearn-low | 148209 | 1629 | 146580 | 0 | 12 | 0.011 |
| interleave:relearn-high | 148250 | 1620 | 146630 | 0 | 11 | 0.011 |
| interleave:priorKnowledgeMean-low | 151486 | 1536 | 149950 | 0 | 8 | 0.010 |
| interleave:priorKnowledgeMean-high | 144745 | 1709 | 143036 | 0 | 7 | 0.012 |
| interleave:learnRate-low | 156705 | 1770 | 154935 | 0 | 9 | 0.011 |
| interleave:learnRate-high | 141567 | 1547 | 140020 | 0 | 11 | 0.011 |
| interleave:prereqPenalty-low | 145900 | 1584 | 144316 | 0 | 11 | 0.011 |
| interleave:prereqPenalty-high | 152205 | 1700 | 150505 | 0 | 10 | 0.011 |
| interleave:pullScale-low | 159357 | 2006 | 157351 | 0 | 8 | 0.013 |
| interleave:pullScale-high | 151748 | 1075 | 150673 | 0 | 10 | 0.007 |
| interleave:revisitSlotCost-low | 148191 | 1630 | 146561 | 0 | 11 | 0.011 |
| interleave:revisitSlotCost-high | 145680 | 1582 | 144098 | 0 | 7 | 0.011 |
| interleave:revisitStopScale-low | 152823 | 1613 | 151210 | 0 | 13 | 0.011 |
| interleave:revisitStopScale-high | 140087 | 1632 | 138455 | 0 | 10 | 0.012 |
| interleave:slots-low | 102169 | 1589 | 100580 | 0 | 6 | 0.016 |
| interleave:slots-high | 176739 | 1751 | 174988 | 0 | 13 | 0.010 |
| interleave:priorRateMult-low | 148172 | 1630 | 146542 | 0 | 11 | 0.011 |
| interleave:priorRateMult-high | 148322 | 1631 | 146691 | 0 | 11 | 0.011 |

#### gam-session-v3+fixed: COPY-BLOCKED; pooled: moved served 4276871, carries true 4228814, false 48057, missing 0, near-ties 255 (context), served new 25732820
| cell | moved served | false | true | missing | near-ties | false share |
|---|---|---|---|---|---|---|
| interleave:base | 158356 | 1780 | 156576 | 0 | 9 | 0.011 |
| interleave:forgetScale-low | 155474 | 1709 | 153765 | 0 | 10 | 0.011 |
| interleave:forgetScale-high | 163406 | 1831 | 161575 | 0 | 10 | 0.011 |
| interleave:forgetShape-low | 158184 | 1777 | 156407 | 0 | 9 | 0.011 |
| interleave:forgetShape-high | 159216 | 1780 | 157436 | 0 | 9 | 0.011 |
| interleave:kSpread-low | 158164 | 1763 | 156401 | 0 | 9 | 0.011 |
| interleave:kSpread-high | 158679 | 1779 | 156900 | 0 | 9 | 0.011 |
| interleave:revisitStrengthen-low | 158391 | 1779 | 156612 | 0 | 9 | 0.011 |
| interleave:revisitStrengthen-high | 158353 | 1780 | 156573 | 0 | 9 | 0.011 |
| interleave:relearn-low | 158340 | 1776 | 156564 | 0 | 9 | 0.011 |
| interleave:relearn-high | 158426 | 1773 | 156653 | 0 | 9 | 0.011 |
| interleave:priorKnowledgeMean-low | 163866 | 1721 | 162145 | 0 | 6 | 0.011 |
| interleave:priorKnowledgeMean-high | 152548 | 1849 | 150699 | 0 | 7 | 0.012 |
| interleave:learnRate-low | 170036 | 1938 | 168098 | 0 | 9 | 0.011 |
| interleave:learnRate-high | 149186 | 1626 | 147560 | 0 | 11 | 0.011 |
| interleave:prereqPenalty-low | 155050 | 1706 | 153344 | 0 | 9 | 0.011 |
| interleave:prereqPenalty-high | 163804 | 1865 | 161939 | 0 | 8 | 0.011 |
| interleave:pullScale-low | 169475 | 2118 | 167357 | 0 | 9 | 0.012 |
| interleave:pullScale-high | 167142 | 1293 | 165849 | 0 | 14 | 0.008 |
| interleave:revisitSlotCost-low | 158356 | 1780 | 156576 | 0 | 9 | 0.011 |
| interleave:revisitSlotCost-high | 153468 | 1745 | 151723 | 0 | 10 | 0.011 |
| interleave:revisitStopScale-low | 163333 | 1771 | 161562 | 0 | 11 | 0.011 |
| interleave:revisitStopScale-high | 149095 | 1784 | 147311 | 0 | 11 | 0.012 |
| interleave:slots-low | 110540 | 1822 | 108718 | 0 | 8 | 0.016 |
| interleave:slots-high | 189096 | 1954 | 187142 | 0 | 14 | 0.010 |
| interleave:priorRateMult-low | 158352 | 1780 | 156572 | 0 | 9 | 0.011 |
| interleave:priorRateMult-high | 158535 | 1778 | 156757 | 0 | 9 | 0.011 |

#### gam-session-no-cov+fixed: COPY-BLOCKED; pooled: moved served 4132188, carries true 4087475, false 44713, missing 0, near-ties 277 (context), served new 25724882
| cell | moved served | false | true | missing | near-ties | false share |
|---|---|---|---|---|---|---|
| interleave:base | 153143 | 1652 | 151491 | 0 | 11 | 0.011 |
| interleave:forgetScale-low | 150840 | 1599 | 149241 | 0 | 11 | 0.011 |
| interleave:forgetScale-high | 157017 | 1682 | 155335 | 0 | 11 | 0.011 |
| interleave:forgetShape-low | 153047 | 1649 | 151398 | 0 | 11 | 0.011 |
| interleave:forgetShape-high | 153811 | 1652 | 152159 | 0 | 11 | 0.011 |
| interleave:kSpread-low | 152961 | 1645 | 151316 | 0 | 11 | 0.011 |
| interleave:kSpread-high | 153472 | 1649 | 151823 | 0 | 11 | 0.011 |
| interleave:revisitStrengthen-low | 153149 | 1652 | 151497 | 0 | 11 | 0.011 |
| interleave:revisitStrengthen-high | 153138 | 1652 | 151486 | 0 | 11 | 0.011 |
| interleave:relearn-low | 153149 | 1653 | 151496 | 0 | 12 | 0.011 |
| interleave:relearn-high | 153200 | 1646 | 151554 | 0 | 11 | 0.011 |
| interleave:priorKnowledgeMean-low | 157029 | 1582 | 155447 | 0 | 7 | 0.010 |
| interleave:priorKnowledgeMean-high | 149411 | 1780 | 147631 | 0 | 7 | 0.012 |
| interleave:learnRate-low | 162470 | 1786 | 160684 | 0 | 11 | 0.011 |
| interleave:learnRate-high | 146249 | 1575 | 144674 | 0 | 10 | 0.011 |
| interleave:prereqPenalty-low | 150774 | 1613 | 149161 | 0 | 11 | 0.011 |
| interleave:prereqPenalty-high | 157278 | 1714 | 155564 | 0 | 9 | 0.011 |
| interleave:pullScale-low | 163942 | 2092 | 161850 | 0 | 8 | 0.013 |
| interleave:pullScale-high | 157079 | 1116 | 155963 | 0 | 12 | 0.007 |
| interleave:revisitSlotCost-low | 153143 | 1652 | 151491 | 0 | 11 | 0.011 |
| interleave:revisitSlotCost-high | 150425 | 1631 | 148794 | 0 | 7 | 0.011 |
| interleave:revisitStopScale-low | 157741 | 1641 | 156100 | 0 | 13 | 0.010 |
| interleave:revisitStopScale-high | 144517 | 1636 | 142881 | 0 | 10 | 0.011 |
| interleave:slots-low | 106261 | 1640 | 104621 | 0 | 5 | 0.015 |
| interleave:slots-high | 182547 | 1818 | 180729 | 0 | 12 | 0.010 |
| interleave:priorRateMult-low | 153130 | 1652 | 151478 | 0 | 11 | 0.011 |
| interleave:priorRateMult-high | 153265 | 1654 | 151611 | 0 | 11 | 0.011 |

#### gam-session-v3-edpbase+fixed: COPY-BLOCKED; pooled: moved served 10994914, carries true 10102455, false 892459, missing 0, near-ties 125 (context), served new 25712881
| cell | moved served | false | true | missing | near-ties | false share |
|---|---|---|---|---|---|---|
| interleave:base | 409863 | 33178 | 376685 | 0 | 4 | 0.081 |
| interleave:forgetScale-low | 407749 | 32936 | 374813 | 0 | 3 | 0.081 |
| interleave:forgetScale-high | 413611 | 33600 | 380011 | 0 | 4 | 0.081 |
| interleave:forgetShape-low | 409783 | 33134 | 376649 | 0 | 3 | 0.081 |
| interleave:forgetShape-high | 410471 | 33274 | 377197 | 0 | 4 | 0.081 |
| interleave:kSpread-low | 409689 | 33239 | 376450 | 0 | 6 | 0.081 |
| interleave:kSpread-high | 410300 | 33212 | 377088 | 0 | 4 | 0.081 |
| interleave:revisitStrengthen-low | 409935 | 33174 | 376761 | 0 | 4 | 0.081 |
| interleave:revisitStrengthen-high | 409855 | 33178 | 376677 | 0 | 4 | 0.081 |
| interleave:relearn-low | 409859 | 33188 | 376671 | 0 | 4 | 0.081 |
| interleave:relearn-high | 409941 | 33171 | 376770 | 0 | 4 | 0.081 |
| interleave:priorKnowledgeMean-low | 413014 | 31274 | 381740 | 0 | 3 | 0.076 |
| interleave:priorKnowledgeMean-high | 404538 | 37981 | 366557 | 0 | 7 | 0.094 |
| interleave:learnRate-low | 417090 | 33643 | 383447 | 0 | 3 | 0.081 |
| interleave:learnRate-high | 403036 | 32625 | 370411 | 0 | 6 | 0.081 |
| interleave:prereqPenalty-low | 407502 | 33060 | 374442 | 0 | 6 | 0.081 |
| interleave:prereqPenalty-high | 413814 | 33508 | 380306 | 0 | 4 | 0.081 |
| interleave:pullScale-low | 421496 | 46415 | 375081 | 0 | 4 | 0.110 |
| interleave:pullScale-high | 408754 | 23945 | 384809 | 0 | 4 | 0.059 |
| interleave:revisitSlotCost-low | 409863 | 33178 | 376685 | 0 | 4 | 0.081 |
| interleave:revisitSlotCost-high | 389381 | 30413 | 358968 | 0 | 11 | 0.078 |
| interleave:revisitStopScale-low | 425258 | 34021 | 391237 | 0 | 5 | 0.080 |
| interleave:revisitStopScale-high | 379601 | 31250 | 348351 | 0 | 4 | 0.082 |
| interleave:slots-low | 261832 | 20961 | 240871 | 0 | 2 | 0.080 |
| interleave:slots-high | 508788 | 38524 | 470264 | 0 | 10 | 0.076 |
| interleave:priorRateMult-low | 409843 | 33176 | 376667 | 0 | 4 | 0.081 |
| interleave:priorRateMult-high | 410048 | 33201 | 376847 | 0 | 4 | 0.081 |

## K1 detail: each variant vs default-order + fixed
### gam-session+fixed: FAIL
| cell | wins | harmed | guardrail fails | beats | Δ by persona (lo, hi) |
|---|---|---|---|---|---|
| interleave:base | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:forgetScale-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.001); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:forgetScale-high | 0 | – | – | **no** | curious +0.000 (-0.000, +0.000); single -0.000 (-0.000, +0.000); struggling -0.000 (-0.000, -0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, -0.000); lapsed -0.000 (-0.000, +0.000) |
| interleave:forgetShape-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:forgetShape-high | 0 | – | – | **no** | curious +0.000 (-0.000, +0.000); single -0.001 (-0.001, +0.000); struggling +0.000 (-0.000, +0.001); returning -0.000 (-0.000, -0.000); wanderer -0.000 (-0.000, +0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:kSpread-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:kSpread-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitStrengthen-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitStrengthen-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:relearn-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:relearn-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorKnowledgeMean-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, +0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorKnowledgeMean-high | 0 | – | – | **no** | curious -0.000 (-0.000, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.000, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed +0.000 (-0.000, +0.000) |
| interleave:learnRate-low | 0 | – | – | **no** | curious +0.000 (-0.000, +0.001); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, -0.000); lapsed -0.000 (-0.000, +0.000) |
| interleave:learnRate-high | 0 | – | – | **no** | curious -0.001 (-0.001, -0.000); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.001); returning -0.000 (-0.000, +0.000); wanderer -0.001 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:prereqPenalty-low | 0 | – | – | **no** | curious -0.001 (-0.001, -0.001); single -0.001 (-0.001, +0.000); struggling -0.001 (-0.001, -0.000); returning -0.000 (-0.000, +0.000); wanderer -0.001 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:prereqPenalty-high | 0 | – | – | **no** | curious +0.001 (+0.001, +0.001); single +0.000 (-0.000, +0.001); struggling +0.001 (+0.000, +0.001); returning +0.000 (-0.000, +0.000); wanderer +0.000 (+0.000, +0.001); lapsed +0.000 (-0.000, +0.001) |
| interleave:pullScale-low | 0 | – | – | **no** | curious -0.000 (-0.000, +0.000); single +0.001 (-0.000, +0.001); struggling +0.000 (-0.000, +0.001); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.000, +0.000) |
| interleave:pullScale-high | 0 | – | – | **no** | curious -0.000 (-0.001, -0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, -0.000); wanderer -0.001 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitSlotCost-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitSlotCost-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.001, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, +0.000); lapsed +0.000 (-0.000, +0.001) |
| interleave:revisitStopScale-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.001, +0.001); struggling -0.000 (-0.001, +0.000); returning +0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitStopScale-high | 0 | – | – | **no** | curious -0.000 (-0.000, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.001); returning +0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, +0.000); lapsed +0.000 (-0.000, +0.001) |
| interleave:slots-low | 0 | – | – | **no** | curious +0.001 (+0.001, +0.002); single +0.000 (+0.000, +0.001); struggling +0.001 (+0.001, +0.002); returning +0.000 (-0.000, +0.000); wanderer +0.001 (+0.000, +0.001); lapsed +0.001 (+0.000, +0.001) |
| interleave:slots-high | 0 | – | – | **no** | curious +0.000 (-0.000, +0.000); single +0.001 (-0.000, +0.001); struggling +0.000 (-0.000, +0.001); returning +0.000 (-0.000, +0.000); wanderer +0.000 (-0.000, +0.000); lapsed +0.000 (-0.000, +0.001) |
| interleave:priorRateMult-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorRateMult-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorRateMult-outer | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:price-corner | 0 | – | – | **no** | curious +0.001 (+0.001, +0.002); single +0.001 (+0.000, +0.001); struggling +0.001 (+0.001, +0.002); returning +0.000 (-0.000, +0.001); wanderer +0.001 (+0.001, +0.001); lapsed +0.001 (+0.000, +0.001) |

#### interleave:base: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0005 to +0.0002 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.4935 (-0.5173 to -0.4697) | -0.0341 (-0.0352 to -0.0330) | -0.0640 (-0.1204 to -0.0076) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0001 |  |  | -0.0004 (-0.0007 to -0.0000) | -0.4095 (-0.6100 to -0.2090) | -0.0131 (-0.0142 to -0.0121) | -0.1495 (-0.2738 to -0.0252) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0045 (+0.0040 to +0.0050) | -0.5130 (-0.6243 to -0.4017) | -0.0419 (-0.0435 to -0.0404) | -0.0730 (-0.1577 to +0.0117) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0012) | +0.0000 (-0.0135 to +0.0135) | -0.0028 (-0.0035 to -0.0021) | +0.0000 (-0.0246 to +0.0246) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to -0.0001 |  |  | +0.0023 (+0.0019 to +0.0027) | -0.3725 (-0.3966 to -0.3484) | -0.0227 (-0.0238 to -0.0216) | -0.0725 (-0.1151 to -0.0299) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0022 (+0.0017 to +0.0027) | -0.2150 (-0.3188 to -0.1112) | -0.0272 (-0.0288 to -0.0256) | -0.0400 (-0.1102 to +0.0302) | holds | holds | holds | holds |

#### interleave:forgetScale-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0004 | -0.0009 to +0.0001 |  |  | +0.0042 (+0.0039 to +0.0046) | -0.4635 (-0.4873 to -0.4397) | -0.0328 (-0.0339 to -0.0317) | -0.0710 (-0.1239 to -0.0181) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0014 to +0.0003 |  |  | -0.0001 (-0.0005 to +0.0002) | -0.4055 (-0.6075 to -0.2035) | -0.0129 (-0.0140 to -0.0118) | -0.1300 (-0.2538 to -0.0062) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0008 to +0.0006 |  |  | +0.0045 (+0.0040 to +0.0050) | -0.4845 (-0.5936 to -0.3754) | -0.0404 (-0.0419 to -0.0389) | -0.0510 (-0.1348 to +0.0328) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | +0.0020 (-0.0114 to +0.0154) | -0.0027 (-0.0034 to -0.0020) | +0.0010 (-0.0233 to +0.0253) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0007 to -0.0001 |  |  | +0.0021 (+0.0018 to +0.0025) | -0.3575 (-0.3814 to -0.3336) | -0.0219 (-0.0230 to -0.0208) | -0.0610 (-0.1024 to -0.0196) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0008 to +0.0004 |  |  | +0.0022 (+0.0017 to +0.0027) | -0.2040 (-0.3098 to -0.0982) | -0.0263 (-0.0279 to -0.0247) | -0.0425 (-0.1128 to +0.0278) | holds | holds | holds | holds |

#### interleave:forgetScale-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0000 | -0.0002 to +0.0002 |  |  | +0.0043 (+0.0040 to +0.0047) | -0.5360 (-0.5599 to -0.5121) | -0.0366 (-0.0378 to -0.0355) | -0.0730 (-0.1304 to -0.0156) | holds | holds | holds | holds |
| single-subject-crammer | -0.0001 | -0.0004 to +0.0002 |  |  | -0.0004 (-0.0007 to -0.0000) | -0.3480 (-0.5527 to -0.1433) | -0.0140 (-0.0151 to -0.0129) | -0.1110 (-0.2360 to +0.0140) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0005 to -0.0000 |  |  | +0.0045 (+0.0040 to +0.0050) | -0.6080 (-0.7190 to -0.4970) | -0.0440 (-0.0455 to -0.0424) | -0.1245 (-0.2103 to -0.0387) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0014 (-0.0017 to -0.0011) | -0.0010 (-0.0147 to +0.0127) | -0.0031 (-0.0038 to -0.0023) | -0.0055 (-0.0307 to +0.0197) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0003 to -0.0000 |  |  | +0.0024 (+0.0020 to +0.0028) | -0.3950 (-0.4197 to -0.3703) | -0.0237 (-0.0248 to -0.0225) | -0.0780 (-0.1221 to -0.0339) | holds | holds | holds | holds |
| lapsed-returner | -0.0000 | -0.0002 to +0.0002 |  |  | +0.0023 (+0.0018 to +0.0028) | -0.2580 (-0.3632 to -0.1528) | -0.0285 (-0.0301 to -0.0269) | -0.0525 (-0.1256 to +0.0206) | holds | holds | holds | holds |

#### interleave:forgetShape-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.4940 (-0.5178 to -0.4702) | -0.0341 (-0.0352 to -0.0330) | -0.0660 (-0.1226 to -0.0094) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0001 |  |  | -0.0004 (-0.0007 to -0.0000) | -0.4060 (-0.6060 to -0.2060) | -0.0131 (-0.0142 to -0.0121) | -0.1490 (-0.2731 to -0.0249) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0045 (+0.0040 to +0.0051) | -0.5125 (-0.6236 to -0.4014) | -0.0418 (-0.0434 to -0.0403) | -0.0810 (-0.1659 to +0.0039) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0012) | +0.0005 (-0.0130 to +0.0140) | -0.0028 (-0.0035 to -0.0021) | +0.0000 (-0.0246 to +0.0246) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to -0.0001 |  |  | +0.0022 (+0.0019 to +0.0026) | -0.3705 (-0.3946 to -0.3464) | -0.0226 (-0.0237 to -0.0215) | -0.0735 (-0.1160 to -0.0310) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0021 (+0.0016 to +0.0027) | -0.2085 (-0.3123 to -0.1047) | -0.0271 (-0.0287 to -0.0255) | -0.0420 (-0.1123 to +0.0283) | holds | holds | holds | holds |

#### interleave:forgetShape-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0001 | -0.0002 to +0.0005 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.5020 (-0.5258 to -0.4782) | -0.0343 (-0.0354 to -0.0332) | -0.0675 (-0.1243 to -0.0107) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0000 |  |  | -0.0004 (-0.0008 to -0.0001) | -0.3770 (-0.5797 to -0.1743) | -0.0135 (-0.0146 to -0.0125) | -0.1590 (-0.2839 to -0.0341) | holds | holds | holds | holds |
| struggling-repeater | +0.0001 | -0.0003 to +0.0005 |  |  | +0.0045 (+0.0040 to +0.0051) | -0.5210 (-0.6339 to -0.4081) | -0.0425 (-0.0440 to -0.0410) | -0.0720 (-0.1577 to +0.0137) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0003 to -0.0000 |  |  | -0.0014 (-0.0017 to -0.0012) | -0.0005 (-0.0141 to +0.0131) | -0.0028 (-0.0035 to -0.0021) | -0.0015 (-0.0262 to +0.0232) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0004 to +0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3795 (-0.4037 to -0.3553) | -0.0229 (-0.0240 to -0.0217) | -0.0795 (-0.1225 to -0.0365) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0003 |  |  | +0.0023 (+0.0018 to +0.0028) | -0.2175 (-0.3216 to -0.1134) | -0.0274 (-0.0290 to -0.0258) | -0.0390 (-0.1110 to +0.0330) | holds | holds | holds | holds |

#### interleave:kSpread-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0005 to +0.0002 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.4920 (-0.5158 to -0.4682) | -0.0340 (-0.0351 to -0.0329) | -0.0670 (-0.1226 to -0.0114) | holds | holds | holds | holds |
| single-subject-crammer | -0.0004 | -0.0010 to +0.0002 |  |  | -0.0003 (-0.0006 to +0.0001) | -0.3785 (-0.5789 to -0.1781) | -0.0132 (-0.0143 to -0.0122) | -0.1235 (-0.2468 to -0.0002) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0046 (+0.0041 to +0.0051) | -0.5230 (-0.6344 to -0.4116) | -0.0420 (-0.0435 to -0.0404) | -0.0780 (-0.1617 to +0.0057) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0012) | +0.0005 (-0.0130 to +0.0140) | -0.0028 (-0.0035 to -0.0021) | +0.0020 (-0.0226 to +0.0266) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3730 (-0.3970 to -0.3490) | -0.0225 (-0.0237 to -0.0214) | -0.0645 (-0.1072 to -0.0218) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0003 |  |  | +0.0022 (+0.0017 to +0.0027) | -0.2060 (-0.3109 to -0.1011) | -0.0269 (-0.0285 to -0.0253) | -0.0385 (-0.1098 to +0.0328) | holds | holds | holds | holds |

#### interleave:kSpread-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0005 to +0.0003 |  |  | +0.0044 (+0.0041 to +0.0048) | -0.4995 (-0.5235 to -0.4755) | -0.0343 (-0.0354 to -0.0332) | -0.0530 (-0.1093 to +0.0033) | holds | holds | holds | holds |
| single-subject-crammer | -0.0004 | -0.0011 to +0.0002 |  |  | -0.0004 (-0.0007 to +0.0000) | -0.3985 (-0.6015 to -0.1955) | -0.0134 (-0.0145 to -0.0124) | -0.1555 (-0.2818 to -0.0292) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0046 (+0.0041 to +0.0051) | -0.5320 (-0.6443 to -0.4197) | -0.0418 (-0.0433 to -0.0403) | -0.0715 (-0.1562 to +0.0132) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | +0.0005 (-0.0131 to +0.0141) | -0.0028 (-0.0035 to -0.0021) | +0.0015 (-0.0231 to +0.0261) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0006 to -0.0001 |  |  | +0.0024 (+0.0020 to +0.0028) | -0.3755 (-0.3996 to -0.3514) | -0.0226 (-0.0237 to -0.0214) | -0.0785 (-0.1213 to -0.0357) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0007 to +0.0002 |  |  | +0.0022 (+0.0017 to +0.0028) | -0.2335 (-0.3378 to -0.1292) | -0.0273 (-0.0289 to -0.0257) | -0.0555 (-0.1270 to +0.0160) | holds | holds | holds | holds |

#### interleave:revisitStrengthen-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.4955 (-0.5193 to -0.4717) | -0.0341 (-0.0352 to -0.0330) | -0.0750 (-0.1312 to -0.0188) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0001 |  |  | -0.0004 (-0.0007 to +0.0000) | -0.4215 (-0.6219 to -0.2211) | -0.0131 (-0.0142 to -0.0120) | -0.1545 (-0.2786 to -0.0304) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0046 (+0.0041 to +0.0051) | -0.5110 (-0.6234 to -0.3986) | -0.0419 (-0.0434 to -0.0404) | -0.0725 (-0.1575 to +0.0125) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0012) | +0.0005 (-0.0130 to +0.0140) | -0.0028 (-0.0035 to -0.0021) | +0.0005 (-0.0241 to +0.0251) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to -0.0001 |  |  | +0.0023 (+0.0019 to +0.0027) | -0.3730 (-0.3971 to -0.3489) | -0.0227 (-0.0238 to -0.0216) | -0.0715 (-0.1141 to -0.0289) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0022 (+0.0017 to +0.0027) | -0.2215 (-0.3254 to -0.1176) | -0.0271 (-0.0287 to -0.0255) | -0.0400 (-0.1101 to +0.0301) | holds | holds | holds | holds |

#### interleave:revisitStrengthen-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0005 to +0.0002 |  |  | +0.0043 (+0.0039 to +0.0046) | -0.4930 (-0.5168 to -0.4692) | -0.0342 (-0.0353 to -0.0331) | -0.0615 (-0.1181 to -0.0049) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0001 |  |  | -0.0004 (-0.0007 to +0.0000) | -0.4240 (-0.6246 to -0.2234) | -0.0131 (-0.0142 to -0.0121) | -0.1545 (-0.2789 to -0.0301) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0045 (+0.0040 to +0.0050) | -0.5125 (-0.6238 to -0.4012) | -0.0419 (-0.0435 to -0.0404) | -0.0740 (-0.1586 to +0.0106) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0012) | +0.0000 (-0.0135 to +0.0135) | -0.0028 (-0.0035 to -0.0021) | +0.0005 (-0.0241 to +0.0251) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to -0.0001 |  |  | +0.0023 (+0.0019 to +0.0027) | -0.3725 (-0.3966 to -0.3484) | -0.0227 (-0.0238 to -0.0216) | -0.0725 (-0.1151 to -0.0299) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0003 |  |  | +0.0022 (+0.0016 to +0.0027) | -0.2125 (-0.3162 to -0.1088) | -0.0272 (-0.0288 to -0.0256) | -0.0395 (-0.1091 to +0.0301) | holds | holds | holds | holds |

#### interleave:relearn-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0043 (+0.0040 to +0.0047) | -0.4945 (-0.5183 to -0.4707) | -0.0341 (-0.0352 to -0.0330) | -0.0700 (-0.1272 to -0.0128) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0012 to +0.0000 |  |  | -0.0004 (-0.0007 to -0.0000) | -0.4315 (-0.6324 to -0.2306) | -0.0131 (-0.0141 to -0.0120) | -0.1630 (-0.2877 to -0.0383) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0005 to +0.0004 |  |  | +0.0045 (+0.0040 to +0.0050) | -0.5025 (-0.6137 to -0.3913) | -0.0420 (-0.0436 to -0.0405) | -0.0550 (-0.1391 to +0.0291) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | +0.0000 (-0.0135 to +0.0135) | -0.0028 (-0.0035 to -0.0021) | +0.0005 (-0.0242 to +0.0252) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to -0.0001 |  |  | +0.0023 (+0.0019 to +0.0026) | -0.3730 (-0.3971 to -0.3489) | -0.0227 (-0.0238 to -0.0216) | -0.0700 (-0.1126 to -0.0274) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0021 (+0.0016 to +0.0027) | -0.2180 (-0.3215 to -0.1145) | -0.0271 (-0.0287 to -0.0255) | -0.0455 (-0.1172 to +0.0262) | holds | holds | holds | holds |

#### interleave:relearn-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.4930 (-0.5167 to -0.4693) | -0.0341 (-0.0352 to -0.0330) | -0.0705 (-0.1254 to -0.0156) | holds | holds | holds | holds |
| single-subject-crammer | -0.0004 | -0.0010 to +0.0002 |  |  | -0.0003 (-0.0007 to +0.0000) | -0.4195 (-0.6195 to -0.2195) | -0.0131 (-0.0141 to -0.0120) | -0.1250 (-0.2477 to -0.0023) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0008 to +0.0002 |  |  | +0.0045 (+0.0039 to +0.0050) | -0.5295 (-0.6418 to -0.4172) | -0.0420 (-0.0435 to -0.0404) | -0.1055 (-0.1906 to -0.0204) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0012) | +0.0000 (-0.0135 to +0.0135) | -0.0028 (-0.0035 to -0.0021) | +0.0000 (-0.0247 to +0.0247) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to -0.0001 |  |  | +0.0023 (+0.0019 to +0.0027) | -0.3730 (-0.3971 to -0.3489) | -0.0226 (-0.0238 to -0.0215) | -0.0785 (-0.1210 to -0.0360) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0006 to +0.0003 |  |  | +0.0022 (+0.0017 to +0.0027) | -0.2205 (-0.3244 to -0.1166) | -0.0272 (-0.0288 to -0.0256) | -0.0435 (-0.1133 to +0.0263) | holds | holds | holds | holds |

#### interleave:priorKnowledgeMean-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0049 (+0.0045 to +0.0053) | -0.5410 (-0.5650 to -0.5170) | -0.0388 (-0.0399 to -0.0377) | -0.0690 (-0.1299 to -0.0081) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0005 to +0.0009 |  |  | -0.0003 (-0.0007 to +0.0000) | -0.2575 (-0.4685 to -0.0465) | -0.0159 (-0.0170 to -0.0148) | -0.0075 (-0.1478 to +0.1328) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0008 to +0.0003 |  |  | +0.0048 (+0.0043 to +0.0053) | -0.5445 (-0.6539 to -0.4351) | -0.0438 (-0.0453 to -0.0423) | -0.0925 (-0.1797 to -0.0053) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0008 (-0.0010 to -0.0005) | -0.0245 (-0.0382 to -0.0108) | -0.0055 (-0.0063 to -0.0048) | +0.0000 (-0.0256 to +0.0256) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to +0.0000 |  |  | +0.0034 (+0.0030 to +0.0039) | -0.4520 (-0.4776 to -0.4264) | -0.0289 (-0.0300 to -0.0277) | -0.0680 (-0.1148 to -0.0212) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0031 (+0.0025 to +0.0036) | -0.3360 (-0.4453 to -0.2267) | -0.0338 (-0.0355 to -0.0322) | -0.0700 (-0.1496 to +0.0096) | holds | holds | holds | holds |

#### interleave:priorKnowledgeMean-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0005 to +0.0002 |  |  | +0.0035 (+0.0031 to +0.0038) | -0.2955 (-0.3174 to -0.2736) | -0.0216 (-0.0226 to -0.0205) | -0.0425 (-0.0890 to +0.0040) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0003 to +0.0007 |  |  | -0.0020 (-0.0024 to -0.0017) | -0.0065 (-0.2108 to +0.1978) | -0.0066 (-0.0076 to -0.0056) | -0.0280 (-0.1222 to +0.0662) | holds | holds | holds | holds |
| struggling-repeater | -0.0000 | -0.0004 to +0.0004 |  |  | +0.0021 (+0.0016 to +0.0026) | -0.2670 (-0.3756 to -0.1584) | -0.0291 (-0.0305 to -0.0276) | -0.0170 (-0.0845 to +0.0505) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0020 (-0.0023 to -0.0017) | +0.0320 (+0.0187 to +0.0453) | +0.0004 (-0.0003 to +0.0010) | -0.0095 (-0.0300 to +0.0110) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0001 |  |  | +0.0002 (-0.0002 to +0.0006) | -0.2475 (-0.2695 to -0.2255) | -0.0120 (-0.0131 to -0.0110) | -0.0555 (-0.0927 to -0.0183) | holds | holds | holds | holds |
| lapsed-returner | +0.0001 | -0.0003 to +0.0004 |  |  | +0.0011 (+0.0006 to +0.0017) | -0.1515 (-0.2525 to -0.0505) | -0.0181 (-0.0197 to -0.0166) | -0.0160 (-0.0722 to +0.0402) | holds | holds | holds | holds |

#### interleave:learnRate-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0001 | -0.0002 to +0.0005 |  |  | +0.0045 (+0.0041 to +0.0049) | -0.5735 (-0.5980 to -0.5490) | -0.0381 (-0.0392 to -0.0370) | -0.0015 (-0.0570 to +0.0540) | holds | holds | holds | holds |
| single-subject-crammer | -0.0001 | -0.0005 to +0.0003 |  |  | -0.0008 (-0.0012 to -0.0004) | -0.3040 (-0.5103 to -0.0977) | -0.0154 (-0.0165 to -0.0144) | -0.0590 (-0.1465 to +0.0285) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0007 to +0.0001 |  |  | +0.0044 (+0.0038 to +0.0049) | -0.7265 (-0.8346 to -0.6184) | -0.0469 (-0.0485 to -0.0453) | -0.0820 (-0.1497 to -0.0143) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0075 (-0.0215 to +0.0065) | -0.0039 (-0.0047 to -0.0032) | +0.0025 (-0.0184 to +0.0234) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0027 (+0.0023 to +0.0031) | -0.4390 (-0.4648 to -0.4132) | -0.0264 (-0.0276 to -0.0252) | -0.0565 (-0.0969 to -0.0161) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0004 to +0.0003 |  |  | +0.0026 (+0.0020 to +0.0031) | -0.2870 (-0.3939 to -0.1801) | -0.0307 (-0.0324 to -0.0290) | -0.0315 (-0.0862 to +0.0232) | holds | holds | holds | holds |

#### interleave:learnRate-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0007 | -0.0010 to -0.0003 |  |  | +0.0042 (+0.0038 to +0.0046) | -0.4440 (-0.4674 to -0.4206) | -0.0315 (-0.0325 to -0.0304) | -0.1360 (-0.1842 to -0.0878) | holds | holds | holds | holds |
| single-subject-crammer | -0.0003 | -0.0010 to +0.0005 |  |  | -0.0002 (-0.0006 to +0.0001) | -0.2745 (-0.4755 to -0.0735) | -0.0120 (-0.0130 to -0.0109) | -0.1070 (-0.2599 to +0.0459) | holds | holds | holds | holds |
| struggling-repeater | -0.0000 | -0.0006 to +0.0005 |  |  | +0.0045 (+0.0039 to +0.0050) | -0.4045 (-0.5146 to -0.2944) | -0.0373 (-0.0388 to -0.0359) | -0.0660 (-0.1652 to +0.0332) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0001 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | +0.0065 (-0.0062 to +0.0192) | -0.0022 (-0.0029 to -0.0016) | +0.0125 (-0.0142 to +0.0392) | holds | holds | holds | holds |
| wanderer | -0.0006 | -0.0008 to -0.0003 |  |  | +0.0018 (+0.0014 to +0.0022) | -0.3195 (-0.3422 to -0.2968) | -0.0204 (-0.0215 to -0.0193) | -0.1110 (-0.1511 to -0.0709) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0019 (+0.0014 to +0.0024) | -0.2055 (-0.3098 to -0.1012) | -0.0240 (-0.0256 to -0.0225) | -0.0555 (-0.1353 to +0.0243) | holds | holds | holds | holds |

#### interleave:prereqPenalty-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0009 | -0.0012 to -0.0005 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.4745 (-0.4983 to -0.4507) | -0.0333 (-0.0344 to -0.0322) | -0.1830 (-0.2345 to -0.1315) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0012 to +0.0001 |  |  | -0.0002 (-0.0005 to +0.0002) | -0.3205 (-0.5210 to -0.1200) | -0.0126 (-0.0137 to -0.0116) | -0.1835 (-0.3146 to -0.0524) | holds | holds | holds | holds |
| struggling-repeater | -0.0007 | -0.0012 to -0.0002 |  |  | +0.0047 (+0.0042 to +0.0052) | -0.4685 (-0.5774 to -0.3596) | -0.0402 (-0.0417 to -0.0387) | -0.2085 (-0.2931 to -0.1239) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0012) | +0.0005 (-0.0129 to +0.0139) | -0.0027 (-0.0034 to -0.0020) | -0.0030 (-0.0267 to +0.0207) | holds | holds | holds | holds |
| wanderer | -0.0007 | -0.0009 to -0.0005 |  |  | +0.0021 (+0.0018 to +0.0025) | -0.3535 (-0.3772 to -0.3298) | -0.0220 (-0.0231 to -0.0208) | -0.1590 (-0.1978 to -0.1202) | holds | holds | holds | holds |
| lapsed-returner | -0.0004 | -0.0008 to +0.0001 |  |  | +0.0021 (+0.0015 to +0.0026) | -0.1885 (-0.2928 to -0.0842) | -0.0258 (-0.0274 to -0.0242) | -0.1035 (-0.1741 to -0.0329) | holds | holds | holds | holds |

#### interleave:prereqPenalty-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0010 | +0.0005 to +0.0014 |  |  | +0.0045 (+0.0041 to +0.0049) | -0.5170 (-0.5411 to -0.4929) | -0.0358 (-0.0369 to -0.0346) | +0.1395 (+0.0770 to +0.2020) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0004 to +0.0007 |  |  | -0.0005 (-0.0008 to -0.0001) | -0.3250 (-0.5263 to -0.1237) | -0.0138 (-0.0149 to -0.0127) | +0.0145 (-0.1003 to +0.1293) | holds | holds | holds | holds |
| struggling-repeater | +0.0010 | +0.0005 to +0.0014 |  |  | +0.0045 (+0.0040 to +0.0050) | -0.5880 (-0.6982 to -0.4778) | -0.0440 (-0.0456 to -0.0424) | +0.1935 (+0.1075 to +0.2795) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0001 to +0.0002 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0000 (-0.0134 to +0.0134) | -0.0031 (-0.0038 to -0.0024) | +0.0235 (-0.0029 to +0.0499) | holds | holds | holds | holds |
| wanderer | +0.0003 | +0.0000 to +0.0006 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.4030 (-0.4282 to -0.3778) | -0.0244 (-0.0256 to -0.0233) | +0.0720 (+0.0249 to +0.1191) | holds | holds | holds | holds |
| lapsed-returner | +0.0004 | -0.0000 to +0.0008 |  |  | +0.0023 (+0.0018 to +0.0028) | -0.2030 (-0.3097 to -0.0963) | -0.0285 (-0.0301 to -0.0269) | +0.0680 (-0.0018 to +0.1378) | holds | holds | holds | holds |

#### interleave:pullScale-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0005 to +0.0002 |  |  | +0.0040 (+0.0036 to +0.0043) | -0.2920 (-0.3143 to -0.2697) | -0.0149 (-0.0160 to -0.0139) | -0.0505 (-0.1001 to -0.0009) | holds | holds | holds | holds |
| single-subject-crammer | +0.0005 | -0.0001 to +0.0011 |  |  | -0.0050 (-0.0054 to -0.0046) | +0.1060 (-0.1003 to +0.3123) | -0.0028 (-0.0037 to -0.0018) | +0.0340 (-0.0939 to +0.1619) | holds | holds | holds | holds |
| struggling-repeater | +0.0000 | -0.0005 to +0.0005 |  |  | +0.0008 (+0.0003 to +0.0013) | -0.2450 (-0.3546 to -0.1354) | -0.0250 (-0.0265 to -0.0235) | -0.0395 (-0.1241 to +0.0451) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0026 (-0.0029 to -0.0022) | +0.0520 (+0.0373 to +0.0667) | +0.0016 (+0.0010 to +0.0022) | +0.0015 (-0.0279 to +0.0309) | holds | holds | holds | holds |
| wanderer | -0.0005 | -0.0008 to -0.0002 |  |  | -0.0012 (-0.0017 to -0.0008) | -0.2470 (-0.2691 to -0.2249) | -0.0073 (-0.0083 to -0.0063) | -0.0815 (-0.1247 to -0.0383) | holds | holds | holds | holds |
| lapsed-returner | -0.0000 | -0.0005 to +0.0005 |  |  | +0.0009 (+0.0002 to +0.0015) | -0.1960 (-0.3007 to -0.0913) | -0.0146 (-0.0162 to -0.0130) | -0.0475 (-0.1196 to +0.0246) | holds | holds | holds | holds |

#### interleave:pullScale-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0005 | -0.0009 to -0.0000 |  |  | +0.0064 (+0.0060 to +0.0068) | -0.6500 (-0.6728 to -0.6272) | -0.0499 (-0.0510 to -0.0488) | -0.1090 (-0.1732 to -0.0448) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0004 to +0.0008 |  |  | +0.0016 (+0.0012 to +0.0020) | -0.3675 (-0.5801 to -0.1549) | -0.0236 (-0.0248 to -0.0225) | -0.0050 (-0.1369 to +0.1269) | holds | holds | holds | holds |
| struggling-repeater | -0.0004 | -0.0009 to +0.0001 |  |  | +0.0062 (+0.0057 to +0.0068) | -0.8095 (-0.9192 to -0.6998) | -0.0553 (-0.0569 to -0.0537) | -0.1620 (-0.2487 to -0.0753) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0003 to -0.0000 |  |  | -0.0002 (-0.0005 to +0.0000) | -0.0515 (-0.0645 to -0.0385) | -0.0098 (-0.0106 to -0.0090) | -0.0160 (-0.0395 to +0.0075) | holds | holds | holds | holds |
| wanderer | -0.0005 | -0.0008 to -0.0002 |  |  | +0.0057 (+0.0052 to +0.0061) | -0.5380 (-0.5640 to -0.5120) | -0.0364 (-0.0376 to -0.0352) | -0.1070 (-0.1534 to -0.0606) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0046 (+0.0041 to +0.0051) | -0.4195 (-0.5254 to -0.3136) | -0.0411 (-0.0427 to -0.0394) | -0.0610 (-0.1321 to +0.0101) | holds | holds | holds | holds |

#### interleave:revisitSlotCost-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0005 to +0.0002 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.4935 (-0.5173 to -0.4697) | -0.0341 (-0.0352 to -0.0330) | -0.0640 (-0.1204 to -0.0076) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0001 |  |  | -0.0004 (-0.0007 to -0.0000) | -0.4095 (-0.6100 to -0.2090) | -0.0131 (-0.0142 to -0.0121) | -0.1495 (-0.2738 to -0.0252) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0045 (+0.0040 to +0.0050) | -0.5130 (-0.6243 to -0.4017) | -0.0419 (-0.0435 to -0.0404) | -0.0730 (-0.1577 to +0.0117) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0012) | +0.0000 (-0.0135 to +0.0135) | -0.0028 (-0.0035 to -0.0021) | +0.0000 (-0.0246 to +0.0246) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to -0.0001 |  |  | +0.0023 (+0.0019 to +0.0027) | -0.3725 (-0.3966 to -0.3484) | -0.0227 (-0.0238 to -0.0216) | -0.0725 (-0.1151 to -0.0299) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0022 (+0.0017 to +0.0027) | -0.2150 (-0.3188 to -0.1112) | -0.0272 (-0.0288 to -0.0256) | -0.0400 (-0.1102 to +0.0302) | holds | holds | holds | holds |

#### interleave:revisitSlotCost-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0003 | -0.0007 to +0.0001 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.3915 (-0.4143 to -0.3687) | -0.0375 (-0.0387 to -0.0363) | -0.0580 (-0.1121 to -0.0039) | holds | holds | holds | holds |
| single-subject-crammer | +0.0000 | -0.0005 to +0.0006 |  |  | -0.0001 (-0.0005 to +0.0004) | -0.4540 (-0.6329 to -0.2751) | -0.0176 (-0.0187 to -0.0165) | -0.0865 (-0.1975 to +0.0245) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0042 (+0.0036 to +0.0047) | -0.5000 (-0.5949 to -0.4051) | -0.0455 (-0.0471 to -0.0438) | -0.0450 (-0.1238 to +0.0338) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0035 (-0.0039 to -0.0032) | -0.0840 (-0.1050 to -0.0630) | -0.0064 (-0.0072 to -0.0056) | -0.0105 (-0.0409 to +0.0199) | holds | holds | holds | holds |
| wanderer | -0.0001 | -0.0003 to +0.0002 |  |  | +0.0026 (+0.0022 to +0.0031) | -0.3085 (-0.3312 to -0.2858) | -0.0252 (-0.0264 to -0.0239) | -0.0265 (-0.0699 to +0.0169) | holds | holds | holds | holds |
| lapsed-returner | +0.0002 | -0.0002 to +0.0006 |  |  | +0.0022 (+0.0016 to +0.0028) | -0.1435 (-0.2387 to -0.0483) | -0.0311 (-0.0328 to -0.0295) | +0.0100 (-0.0565 to +0.0765) | holds | holds | holds | holds |

#### interleave:revisitStopScale-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0003 | -0.0007 to +0.0001 |  |  | +0.0043 (+0.0039 to +0.0046) | -0.5660 (-0.5896 to -0.5424) | -0.0327 (-0.0337 to -0.0317) | -0.0850 (-0.1416 to -0.0284) | holds | holds | holds | holds |
| single-subject-crammer | +0.0000 | -0.0006 to +0.0007 |  |  | -0.0006 (-0.0009 to -0.0002) | -0.1860 (-0.3898 to +0.0178) | -0.0126 (-0.0136 to -0.0115) | -0.0530 (-0.1787 to +0.0727) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0008 to +0.0002 |  |  | +0.0050 (+0.0045 to +0.0055) | -0.6115 (-0.7243 to -0.4987) | -0.0377 (-0.0392 to -0.0363) | -0.0965 (-0.1838 to -0.0092) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0001 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0012) | +0.0165 (+0.0048 to +0.0282) | -0.0025 (-0.0032 to -0.0018) | +0.0100 (-0.0135 to +0.0335) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0021 (+0.0017 to +0.0025) | -0.3595 (-0.3837 to -0.3353) | -0.0208 (-0.0219 to -0.0197) | -0.0555 (-0.0941 to -0.0169) | holds | holds | holds | holds |
| lapsed-returner | -0.0004 | -0.0008 to +0.0000 |  |  | +0.0020 (+0.0015 to +0.0025) | -0.3250 (-0.4364 to -0.2136) | -0.0236 (-0.0251 to -0.0221) | -0.1045 (-0.1755 to -0.0335) | holds | holds | holds | holds |

#### interleave:revisitStopScale-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0000 | -0.0004 to +0.0004 |  |  | +0.0048 (+0.0044 to +0.0052) | -0.3405 (-0.3622 to -0.3188) | -0.0384 (-0.0397 to -0.0371) | -0.0275 (-0.0837 to +0.0287) | holds | holds | holds | holds |
| single-subject-crammer | +0.0003 | -0.0003 to +0.0009 |  |  | -0.0001 (-0.0005 to +0.0003) | -0.3185 (-0.5204 to -0.1166) | -0.0148 (-0.0158 to -0.0137) | -0.0085 (-0.1299 to +0.1129) | holds | holds | holds | holds |
| struggling-repeater | -0.0000 | -0.0006 to +0.0005 |  |  | +0.0034 (+0.0028 to +0.0040) | -0.3615 (-0.4612 to -0.2618) | -0.0489 (-0.0506 to -0.0471) | -0.0015 (-0.0832 to +0.0802) | holds | holds | holds | holds |
| returning-expert | +0.0001 | -0.0001 to +0.0002 |  |  | -0.0021 (-0.0024 to -0.0018) | -0.0310 (-0.0475 to -0.0145) | -0.0036 (-0.0043 to -0.0028) | +0.0215 (-0.0049 to +0.0479) | holds | holds | holds | holds |
| wanderer | -0.0001 | -0.0003 to +0.0002 |  |  | +0.0024 (+0.0020 to +0.0028) | -0.2940 (-0.3164 to -0.2716) | -0.0260 (-0.0273 to -0.0247) | -0.0285 (-0.0731 to +0.0161) | holds | holds | holds | holds |
| lapsed-returner | +0.0003 | -0.0002 to +0.0008 |  |  | +0.0027 (+0.0021 to +0.0034) | -0.1070 (-0.1995 to -0.0145) | -0.0385 (-0.0404 to -0.0366) | +0.0165 (-0.0490 to +0.0820) | holds | holds | holds | holds |

#### interleave:slots-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0011 | +0.0006 to +0.0016 |  |  | +0.0097 (+0.0091 to +0.0103) | -0.0625 (-0.0737 to -0.0513) | -0.0560 (-0.0578 to -0.0543) | +0.1185 (+0.0741 to +0.1629) | holds | holds | holds | holds |
| single-subject-crammer | +0.0005 | +0.0000 to +0.0009 |  |  | -0.0004 (-0.0011 to +0.0003) | -0.0520 (-0.1437 to +0.0397) | -0.0327 (-0.0343 to -0.0312) | +0.0535 (-0.0127 to +0.1197) | holds | holds | holds | holds |
| struggling-repeater | +0.0011 | +0.0007 to +0.0016 |  |  | +0.0009 (+0.0001 to +0.0017) | -0.1580 (-0.2066 to -0.1094) | -0.0655 (-0.0676 to -0.0634) | +0.1525 (+0.0939 to +0.2111) | holds | holds | holds | holds |
| returning-expert | +0.0001 | -0.0002 to +0.0005 |  |  | +0.0016 (+0.0009 to +0.0022) | -0.0020 (-0.0040 to -0.0000) | -0.0204 (-0.0218 to -0.0190) | +0.0215 (-0.0219 to +0.0649) | holds | holds | holds | holds |
| wanderer | +0.0007 | +0.0003 to +0.0011 |  |  | +0.0031 (+0.0024 to +0.0038) | -0.0340 (-0.0421 to -0.0259) | -0.0468 (-0.0486 to -0.0450) | +0.0790 (+0.0346 to +0.1234) | holds | holds | holds | holds |
| lapsed-returner | +0.0008 | +0.0004 to +0.0012 |  |  | +0.0026 (+0.0018 to +0.0034) | -0.0145 (-0.0661 to +0.0371) | -0.0519 (-0.0540 to -0.0499) | +0.1005 (+0.0471 to +0.1539) | holds | holds | holds | holds |

#### interleave:slots-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0002 | -0.0001 to +0.0005 |  |  | +0.0020 (+0.0018 to +0.0023) | -0.2420 (-0.2636 to -0.2204) | -0.0243 (-0.0252 to -0.0234) | +0.0480 (-0.0064 to +0.1024) | holds | holds | holds | holds |
| single-subject-crammer | +0.0006 | -0.0003 to +0.0015 |  |  | -0.0008 (-0.0015 to -0.0001) | -0.1635 (-0.5849 to +0.2579) | -0.0107 (-0.0117 to -0.0097) | -0.0060 (-0.2633 to +0.2513) | holds | holds | holds | holds |
| struggling-repeater | +0.0003 | -0.0003 to +0.0009 |  |  | +0.0030 (+0.0026 to +0.0035) | -0.4820 (-0.6584 to -0.3056) | -0.0329 (-0.0343 to -0.0316) | -0.0270 (-0.1531 to +0.0991) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0001 to +0.0001 |  |  | -0.0002 (-0.0003 to -0.0001) | -0.0105 (-0.0168 to -0.0042) | -0.0041 (-0.0046 to -0.0036) | +0.0075 (-0.0143 to +0.0293) | holds | holds | holds | holds |
| wanderer | +0.0000 | -0.0002 to +0.0002 |  |  | +0.0003 (+0.0001 to +0.0006) | -0.1045 (-0.1208 to -0.0882) | -0.0164 (-0.0173 to -0.0155) | -0.0055 (-0.0435 to +0.0325) | holds | holds | holds | holds |
| lapsed-returner | +0.0003 | -0.0003 to +0.0008 |  |  | +0.0010 (+0.0006 to +0.0015) | -0.3475 (-0.5304 to -0.1646) | -0.0197 (-0.0211 to -0.0183) | -0.0405 (-0.1430 to +0.0620) | holds | holds | holds | holds |

#### interleave:priorRateMult-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.4935 (-0.5173 to -0.4697) | -0.0341 (-0.0352 to -0.0330) | -0.0660 (-0.1225 to -0.0095) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0001 |  |  | -0.0004 (-0.0007 to -0.0000) | -0.4145 (-0.6152 to -0.2138) | -0.0131 (-0.0142 to -0.0121) | -0.1495 (-0.2741 to -0.0249) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0045 (+0.0040 to +0.0050) | -0.5130 (-0.6243 to -0.4017) | -0.0419 (-0.0435 to -0.0404) | -0.0735 (-0.1582 to +0.0112) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0012) | +0.0000 (-0.0135 to +0.0135) | -0.0028 (-0.0035 to -0.0021) | +0.0000 (-0.0246 to +0.0246) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to -0.0001 |  |  | +0.0023 (+0.0019 to +0.0027) | -0.3730 (-0.3971 to -0.3489) | -0.0227 (-0.0238 to -0.0216) | -0.0715 (-0.1141 to -0.0289) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0003 |  |  | +0.0022 (+0.0017 to +0.0027) | -0.2150 (-0.3188 to -0.1112) | -0.0272 (-0.0288 to -0.0256) | -0.0390 (-0.1092 to +0.0312) | holds | holds | holds | holds |

#### interleave:priorRateMult-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0005 to +0.0002 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.4935 (-0.5172 to -0.4698) | -0.0343 (-0.0354 to -0.0332) | -0.0630 (-0.1197 to -0.0063) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0012 to +0.0001 |  |  | -0.0003 (-0.0007 to +0.0000) | -0.4170 (-0.6173 to -0.2167) | -0.0131 (-0.0142 to -0.0121) | -0.1565 (-0.2806 to -0.0324) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0045 (+0.0040 to +0.0050) | -0.5110 (-0.6223 to -0.3997) | -0.0420 (-0.0435 to -0.0404) | -0.0700 (-0.1547 to +0.0147) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0014 (-0.0017 to -0.0012) | -0.0010 (-0.0145 to +0.0125) | -0.0028 (-0.0035 to -0.0021) | -0.0010 (-0.0257 to +0.0237) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to -0.0001 |  |  | +0.0023 (+0.0019 to +0.0027) | -0.3735 (-0.3976 to -0.3494) | -0.0227 (-0.0238 to -0.0216) | -0.0720 (-0.1147 to -0.0293) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0004 |  |  | +0.0022 (+0.0017 to +0.0028) | -0.2185 (-0.3225 to -0.1145) | -0.0272 (-0.0288 to -0.0256) | -0.0400 (-0.1106 to +0.0306) | holds | holds | holds | holds |

#### interleave:priorRateMult-outer: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.4980 (-0.5218 to -0.4742) | -0.0344 (-0.0355 to -0.0333) | -0.0705 (-0.1272 to -0.0138) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0001 |  |  | -0.0003 (-0.0007 to +0.0001) | -0.4150 (-0.6159 to -0.2141) | -0.0133 (-0.0143 to -0.0122) | -0.1520 (-0.2770 to -0.0270) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0046 (+0.0040 to +0.0051) | -0.5150 (-0.6262 to -0.4038) | -0.0420 (-0.0435 to -0.0405) | -0.0720 (-0.1568 to +0.0128) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0014 (-0.0017 to -0.0011) | -0.0025 (-0.0161 to +0.0111) | -0.0028 (-0.0035 to -0.0021) | -0.0010 (-0.0258 to +0.0238) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0006 to -0.0001 |  |  | +0.0023 (+0.0019 to +0.0027) | -0.3780 (-0.4021 to -0.3539) | -0.0228 (-0.0239 to -0.0216) | -0.0740 (-0.1168 to -0.0312) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0004 |  |  | +0.0022 (+0.0017 to +0.0027) | -0.2205 (-0.3247 to -0.1163) | -0.0272 (-0.0288 to -0.0256) | -0.0365 (-0.1073 to +0.0343) | holds | holds | holds | holds |

#### interleave:price-corner: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0013 | +0.0007 to +0.0018 |  |  | +0.0100 (+0.0094 to +0.0107) | -0.0600 (-0.0711 to -0.0489) | -0.0591 (-0.0609 to -0.0573) | +0.1305 (+0.0859 to +0.1751) | holds | holds | holds | holds |
| single-subject-crammer | +0.0006 | +0.0001 to +0.0011 |  |  | -0.0010 (-0.0017 to -0.0003) | +0.0150 (-0.0736 to +0.1036) | -0.0345 (-0.0361 to -0.0329) | +0.0740 (+0.0097 to +0.1383) | holds | holds | holds | holds |
| struggling-repeater | +0.0012 | +0.0007 to +0.0017 |  |  | +0.0019 (+0.0011 to +0.0028) | -0.1525 (-0.1998 to -0.1052) | -0.0690 (-0.0712 to -0.0668) | +0.1455 (+0.0882 to +0.2028) | holds | holds | holds | holds |
| returning-expert | +0.0002 | -0.0002 to +0.0005 |  |  | +0.0025 (+0.0018 to +0.0032) | -0.0015 (-0.0032 to +0.0002) | -0.0234 (-0.0248 to -0.0220) | +0.0305 (-0.0141 to +0.0751) | holds | holds | holds | holds |
| wanderer | +0.0011 | +0.0007 to +0.0015 |  |  | +0.0035 (+0.0028 to +0.0043) | -0.0350 (-0.0433 to -0.0267) | -0.0518 (-0.0537 to -0.0500) | +0.1155 (+0.0703 to +0.1607) | holds | holds | holds | holds |
| lapsed-returner | +0.0007 | +0.0003 to +0.0012 |  |  | +0.0028 (+0.0019 to +0.0037) | -0.0070 (-0.0539 to +0.0399) | -0.0576 (-0.0599 to -0.0552) | +0.1020 (+0.0504 to +0.1536) | holds | holds | holds | holds |

### gam-session-v3+fixed: FAIL
| cell | wins | harmed | guardrail fails | beats | Δ by persona (lo, hi) |
|---|---|---|---|---|---|
| interleave:base | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:forgetScale-low | 0 | – | – | **no** | curious -0.001 (-0.001, -0.000); single +0.000 (-0.001, +0.001); struggling -0.000 (-0.001, +0.001); returning +0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.001) |
| interleave:forgetScale-high | 0 | – | – | **no** | curious -0.000 (-0.000, +0.000); single +0.000 (-0.000, +0.000); struggling -0.000 (-0.000, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, -0.000); lapsed +0.000 (-0.000, +0.000) |
| interleave:forgetShape-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:forgetShape-high | 0 | – | – | **no** | curious +0.000 (-0.000, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.000, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.000, +0.000) |
| interleave:kSpread-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:kSpread-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitStrengthen-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitStrengthen-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:relearn-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:relearn-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorKnowledgeMean-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorKnowledgeMean-high | 0 | – | – | **no** | curious -0.000 (-0.000, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.000, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, +0.000); lapsed +0.000 (-0.000, +0.000) |
| interleave:learnRate-low | 0 | – | – | **no** | curious +0.000 (-0.000, +0.001); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, +0.000); lapsed -0.000 (-0.000, +0.000) |
| interleave:learnRate-high | 0 | – | – | **no** | curious -0.001 (-0.001, -0.000); single -0.000 (-0.001, +0.001); struggling -0.000 (-0.001, +0.000); returning +0.000 (-0.000, +0.000); wanderer -0.001 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:prereqPenalty-low | 0 | – | – | **no** | curious -0.001 (-0.001, -0.001); single +0.000 (-0.001, +0.001); struggling -0.001 (-0.001, -0.000); returning -0.000 (-0.000, +0.000); wanderer -0.001 (-0.001, -0.001); lapsed -0.000 (-0.001, -0.000) |
| interleave:prereqPenalty-high | 0 | – | – | **no** | curious +0.001 (+0.001, +0.002); single +0.001 (+0.000, +0.001); struggling +0.001 (+0.001, +0.002); returning +0.000 (-0.000, +0.000); wanderer +0.000 (+0.000, +0.001); lapsed +0.001 (+0.000, +0.001) |
| interleave:pullScale-low | 0 | – | – | **no** | curious -0.000 (-0.000, +0.000); single +0.001 (+0.000, +0.001); struggling +0.000 (-0.000, +0.001); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed +0.000 (-0.000, +0.001) |
| interleave:pullScale-high | 0 | – | – | **no** | curious -0.000 (-0.001, -0.000); single +0.000 (-0.001, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitSlotCost-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitSlotCost-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.001); struggling -0.000 (-0.001, +0.000); returning +0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, +0.000); lapsed +0.000 (-0.000, +0.001) |
| interleave:revisitStopScale-low | 0 | – | – | **no** | curious -0.000 (-0.001, -0.000); single +0.001 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning +0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitStopScale-high | 0 | – | – | **no** | curious -0.000 (-0.000, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning +0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, +0.000); lapsed +0.000 (-0.000, +0.001) |
| interleave:slots-low | 0 | – | – | **no** | curious +0.001 (+0.001, +0.002); single +0.000 (+0.000, +0.001); struggling +0.001 (+0.001, +0.002); returning +0.000 (-0.000, +0.001); wanderer +0.001 (+0.000, +0.001); lapsed +0.001 (+0.000, +0.001) |
| interleave:slots-high | 0 | – | – | **no** | curious +0.000 (-0.000, +0.000); single +0.001 (-0.000, +0.002); struggling +0.000 (-0.000, +0.001); returning +0.000 (-0.000, +0.000); wanderer +0.000 (-0.000, +0.000); lapsed +0.000 (-0.000, +0.001) |
| interleave:priorRateMult-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorRateMult-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorRateMult-outer | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.001, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:price-corner | 0 | – | – | **no** | curious +0.001 (+0.001, +0.002); single +0.001 (+0.000, +0.001); struggling +0.001 (+0.001, +0.002); returning +0.000 (-0.000, +0.001); wanderer +0.001 (+0.001, +0.001); lapsed +0.001 (+0.000, +0.001) |

#### interleave:base: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.5055 (-0.5292 to -0.4818) | -0.0360 (-0.0371 to -0.0348) | -0.0675 (-0.1256 to -0.0094) | holds | holds | holds | holds |
| single-subject-crammer | +0.0003 | -0.0004 to +0.0009 |  |  | -0.0001 (-0.0005 to +0.0002) | -0.2015 (-0.4081 to +0.0051) | -0.0145 (-0.0156 to -0.0135) | -0.0145 (-0.1401 to +0.1111) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0057 (+0.0051 to +0.0062) | -0.5525 (-0.6610 to -0.4440) | -0.0454 (-0.0469 to -0.0438) | -0.0685 (-0.1543 to +0.0173) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0015 (-0.0118 to +0.0148) | -0.0033 (-0.0040 to -0.0026) | +0.0080 (-0.0164 to +0.0324) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0006 to -0.0001 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.3890 (-0.4136 to -0.3644) | -0.0243 (-0.0254 to -0.0231) | -0.0815 (-0.1245 to -0.0385) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0030 (+0.0024 to +0.0035) | -0.2115 (-0.3172 to -0.1058) | -0.0301 (-0.0317 to -0.0284) | -0.0355 (-0.1081 to +0.0371) | holds | holds | holds | holds |

#### interleave:forgetScale-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0005 | -0.0010 to -0.0000 |  |  | +0.0050 (+0.0046 to +0.0054) | -0.4835 (-0.5072 to -0.4598) | -0.0343 (-0.0354 to -0.0332) | -0.0845 (-0.1390 to -0.0300) | holds | holds | holds | holds |
| single-subject-crammer | +0.0000 | -0.0008 to +0.0009 |  |  | +0.0000 (-0.0003 to +0.0004) | -0.2585 (-0.4648 to -0.0522) | -0.0141 (-0.0151 to -0.0130) | -0.0430 (-0.1680 to +0.0820) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0009 to +0.0005 |  |  | +0.0054 (+0.0049 to +0.0060) | -0.5255 (-0.6338 to -0.4172) | -0.0435 (-0.0451 to -0.0420) | -0.0630 (-0.1482 to +0.0222) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0002 to +0.0002 |  |  | -0.0014 (-0.0017 to -0.0011) | +0.0035 (-0.0097 to +0.0167) | -0.0033 (-0.0040 to -0.0026) | +0.0080 (-0.0163 to +0.0323) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0007 to -0.0001 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.3720 (-0.3962 to -0.3478) | -0.0234 (-0.0245 to -0.0222) | -0.0635 (-0.1054 to -0.0216) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0007 to +0.0005 |  |  | +0.0030 (+0.0025 to +0.0036) | -0.2270 (-0.3346 to -0.1194) | -0.0292 (-0.0308 to -0.0276) | -0.0340 (-0.1066 to +0.0386) | holds | holds | holds | holds |

#### interleave:forgetScale-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0000 | -0.0003 to +0.0002 |  |  | +0.0052 (+0.0048 to +0.0056) | -0.5410 (-0.5649 to -0.5171) | -0.0389 (-0.0401 to -0.0377) | -0.0775 (-0.1376 to -0.0174) | holds | holds | holds | holds |
| single-subject-crammer | +0.0001 | -0.0002 to +0.0004 |  |  | -0.0002 (-0.0006 to +0.0002) | -0.2045 (-0.4121 to +0.0031) | -0.0156 (-0.0167 to -0.0144) | +0.0065 (-0.1198 to +0.1328) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0005 to +0.0000 |  |  | +0.0057 (+0.0052 to +0.0063) | -0.6530 (-0.7608 to -0.5452) | -0.0483 (-0.0499 to -0.0467) | -0.1275 (-0.2141 to -0.0409) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0001 to +0.0000 |  |  | -0.0013 (-0.0016 to -0.0010) | -0.0020 (-0.0157 to +0.0117) | -0.0037 (-0.0044 to -0.0030) | +0.0040 (-0.0209 to +0.0289) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0003 to -0.0000 |  |  | +0.0028 (+0.0024 to +0.0032) | -0.4195 (-0.4448 to -0.3942) | -0.0258 (-0.0270 to -0.0246) | -0.0790 (-0.1240 to -0.0340) | holds | holds | holds | holds |
| lapsed-returner | +0.0001 | -0.0002 to +0.0003 |  |  | +0.0032 (+0.0026 to +0.0037) | -0.2680 (-0.3738 to -0.1622) | -0.0321 (-0.0337 to -0.0304) | -0.0190 (-0.0928 to +0.0548) | holds | holds | holds | holds |

#### interleave:forgetShape-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.5060 (-0.5297 to -0.4823) | -0.0359 (-0.0371 to -0.0348) | -0.0680 (-0.1262 to -0.0098) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0004 to +0.0008 |  |  | -0.0001 (-0.0005 to +0.0002) | -0.2085 (-0.4151 to -0.0019) | -0.0145 (-0.0156 to -0.0135) | -0.0195 (-0.1451 to +0.1061) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0057 (+0.0052 to +0.0063) | -0.5515 (-0.6598 to -0.4432) | -0.0453 (-0.0469 to -0.0437) | -0.0810 (-0.1669 to +0.0049) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0001 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0020 (-0.0113 to +0.0153) | -0.0033 (-0.0040 to -0.0026) | +0.0080 (-0.0164 to +0.0324) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0007 to -0.0001 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.3860 (-0.4106 to -0.3614) | -0.0242 (-0.0253 to -0.0230) | -0.0840 (-0.1268 to -0.0412) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0030 (+0.0024 to +0.0035) | -0.2105 (-0.3161 to -0.1049) | -0.0300 (-0.0316 to -0.0284) | -0.0355 (-0.1080 to +0.0370) | holds | holds | holds | holds |

#### interleave:forgetShape-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0001 | -0.0003 to +0.0005 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.5110 (-0.5347 to -0.4873) | -0.0361 (-0.0372 to -0.0350) | -0.0695 (-0.1280 to -0.0110) | holds | holds | holds | holds |
| single-subject-crammer | +0.0001 | -0.0005 to +0.0007 |  |  | -0.0002 (-0.0006 to +0.0002) | -0.1810 (-0.3884 to +0.0264) | -0.0150 (-0.0160 to -0.0139) | -0.0165 (-0.1421 to +0.1091) | holds | holds | holds | holds |
| struggling-repeater | -0.0000 | -0.0005 to +0.0004 |  |  | +0.0056 (+0.0050 to +0.0061) | -0.5945 (-0.7041 to -0.4849) | -0.0461 (-0.0476 to -0.0445) | -0.0975 (-0.1848 to -0.0102) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0013 (-0.0016 to -0.0011) | +0.0000 (-0.0134 to +0.0134) | -0.0034 (-0.0041 to -0.0027) | +0.0075 (-0.0170 to +0.0320) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0026 (+0.0022 to +0.0030) | -0.3950 (-0.4197 to -0.3703) | -0.0246 (-0.0257 to -0.0234) | -0.0805 (-0.1237 to -0.0373) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0004 |  |  | +0.0032 (+0.0027 to +0.0037) | -0.2160 (-0.3221 to -0.1099) | -0.0304 (-0.0320 to -0.0288) | -0.0290 (-0.1023 to +0.0443) | holds | holds | holds | holds |

#### interleave:kSpread-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0051 (+0.0047 to +0.0054) | -0.5080 (-0.5317 to -0.4843) | -0.0358 (-0.0369 to -0.0346) | -0.0760 (-0.1333 to -0.0187) | holds | holds | holds | holds |
| single-subject-crammer | +0.0001 | -0.0005 to +0.0008 |  |  | -0.0001 (-0.0005 to +0.0002) | -0.1985 (-0.4052 to +0.0082) | -0.0146 (-0.0157 to -0.0135) | -0.0145 (-0.1390 to +0.1100) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0056 (+0.0050 to +0.0061) | -0.5665 (-0.6773 to -0.4557) | -0.0455 (-0.0470 to -0.0439) | -0.0780 (-0.1645 to +0.0085) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0020 (-0.0113 to +0.0153) | -0.0033 (-0.0040 to -0.0026) | +0.0095 (-0.0149 to +0.0339) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0006 to -0.0001 |  |  | +0.0026 (+0.0021 to +0.0030) | -0.3895 (-0.4141 to -0.3649) | -0.0241 (-0.0252 to -0.0229) | -0.0780 (-0.1212 to -0.0348) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0004 |  |  | +0.0030 (+0.0025 to +0.0036) | -0.2065 (-0.3126 to -0.1004) | -0.0298 (-0.0314 to -0.0281) | -0.0345 (-0.1077 to +0.0387) | holds | holds | holds | holds |

#### interleave:kSpread-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0003 |  |  | +0.0052 (+0.0048 to +0.0056) | -0.5100 (-0.5338 to -0.4862) | -0.0362 (-0.0373 to -0.0350) | -0.0580 (-0.1160 to +0.0000) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0004 to +0.0008 |  |  | -0.0001 (-0.0005 to +0.0003) | -0.2295 (-0.4361 to -0.0229) | -0.0147 (-0.0157 to -0.0136) | -0.0360 (-0.1627 to +0.0907) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0007 to +0.0004 |  |  | +0.0058 (+0.0052 to +0.0063) | -0.5515 (-0.6597 to -0.4433) | -0.0455 (-0.0471 to -0.0440) | -0.0740 (-0.1591 to +0.0111) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0001 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0011) | +0.0020 (-0.0114 to +0.0154) | -0.0034 (-0.0041 to -0.0026) | +0.0110 (-0.0133 to +0.0353) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0007 to -0.0001 |  |  | +0.0026 (+0.0022 to +0.0030) | -0.3920 (-0.4166 to -0.3674) | -0.0244 (-0.0256 to -0.0233) | -0.0880 (-0.1313 to -0.0447) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0031 (+0.0025 to +0.0036) | -0.2345 (-0.3393 to -0.1297) | -0.0302 (-0.0318 to -0.0286) | -0.0475 (-0.1211 to +0.0261) | holds | holds | holds | holds |

#### interleave:revisitStrengthen-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.5085 (-0.5322 to -0.4848) | -0.0360 (-0.0371 to -0.0348) | -0.0760 (-0.1338 to -0.0182) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0004 to +0.0008 |  |  | -0.0001 (-0.0005 to +0.0002) | -0.2210 (-0.4271 to -0.0149) | -0.0145 (-0.0155 to -0.0134) | -0.0285 (-0.1539 to +0.0969) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0057 (+0.0052 to +0.0063) | -0.5445 (-0.6541 to -0.4349) | -0.0454 (-0.0469 to -0.0438) | -0.0650 (-0.1516 to +0.0216) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0001 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0020 (-0.0113 to +0.0153) | -0.0033 (-0.0040 to -0.0026) | +0.0085 (-0.0159 to +0.0329) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0006 to -0.0001 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.3895 (-0.4140 to -0.3650) | -0.0243 (-0.0254 to -0.0232) | -0.0805 (-0.1235 to -0.0375) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0030 (+0.0024 to +0.0035) | -0.2160 (-0.3219 to -0.1101) | -0.0300 (-0.0316 to -0.0284) | -0.0335 (-0.1060 to +0.0390) | holds | holds | holds | holds |

#### interleave:revisitStrengthen-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0050 (+0.0047 to +0.0054) | -0.5050 (-0.5287 to -0.4813) | -0.0360 (-0.0371 to -0.0348) | -0.0650 (-0.1232 to -0.0068) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0004 to +0.0008 |  |  | -0.0001 (-0.0005 to +0.0003) | -0.2115 (-0.4184 to -0.0046) | -0.0145 (-0.0156 to -0.0134) | -0.0195 (-0.1452 to +0.1062) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0057 (+0.0051 to +0.0062) | -0.5520 (-0.6605 to -0.4435) | -0.0453 (-0.0469 to -0.0438) | -0.0705 (-0.1561 to +0.0151) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0015 (-0.0118 to +0.0148) | -0.0033 (-0.0040 to -0.0026) | +0.0085 (-0.0159 to +0.0329) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0006 to -0.0001 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.3890 (-0.4136 to -0.3644) | -0.0243 (-0.0254 to -0.0231) | -0.0810 (-0.1240 to -0.0380) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0004 |  |  | +0.0030 (+0.0024 to +0.0035) | -0.2090 (-0.3145 to -0.1035) | -0.0301 (-0.0317 to -0.0285) | -0.0345 (-0.1066 to +0.0376) | holds | holds | holds | holds |

#### interleave:relearn-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.5040 (-0.5277 to -0.4803) | -0.0360 (-0.0371 to -0.0348) | -0.0710 (-0.1301 to -0.0119) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0004 to +0.0008 |  |  | -0.0001 (-0.0004 to +0.0003) | -0.2245 (-0.4310 to -0.0180) | -0.0144 (-0.0155 to -0.0134) | -0.0230 (-0.1492 to +0.1032) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0057 (+0.0051 to +0.0062) | -0.5610 (-0.6687 to -0.4533) | -0.0455 (-0.0470 to -0.0439) | -0.0670 (-0.1521 to +0.0181) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0015 (-0.0118 to +0.0148) | -0.0034 (-0.0041 to -0.0026) | +0.0080 (-0.0165 to +0.0325) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to -0.0001 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.3895 (-0.4140 to -0.3650) | -0.0243 (-0.0254 to -0.0231) | -0.0770 (-0.1201 to -0.0339) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0029 (+0.0024 to +0.0035) | -0.2150 (-0.3204 to -0.1096) | -0.0300 (-0.0316 to -0.0284) | -0.0390 (-0.1124 to +0.0344) | holds | holds | holds | holds |

#### interleave:relearn-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.5045 (-0.5282 to -0.4808) | -0.0359 (-0.0371 to -0.0348) | -0.0725 (-0.1293 to -0.0157) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0004 to +0.0008 |  |  | -0.0001 (-0.0005 to +0.0003) | -0.2305 (-0.4360 to -0.0250) | -0.0144 (-0.0155 to -0.0134) | -0.0045 (-0.1280 to +0.1190) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0008 to +0.0002 |  |  | +0.0057 (+0.0051 to +0.0062) | -0.5760 (-0.6850 to -0.4670) | -0.0454 (-0.0469 to -0.0438) | -0.1050 (-0.1906 to -0.0194) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0015 (-0.0118 to +0.0148) | -0.0033 (-0.0040 to -0.0026) | +0.0080 (-0.0164 to +0.0324) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0006 to -0.0001 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.3905 (-0.4150 to -0.3660) | -0.0243 (-0.0254 to -0.0231) | -0.0830 (-0.1258 to -0.0402) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0030 (+0.0024 to +0.0035) | -0.2180 (-0.3237 to -0.1123) | -0.0301 (-0.0317 to -0.0285) | -0.0350 (-0.1071 to +0.0371) | holds | holds | holds | holds |

#### interleave:priorKnowledgeMean-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0060 (+0.0056 to +0.0064) | -0.5700 (-0.5940 to -0.5460) | -0.0409 (-0.0421 to -0.0398) | -0.0610 (-0.1239 to +0.0019) | holds | holds | holds | holds |
| single-subject-crammer | +0.0003 | -0.0004 to +0.0010 |  |  | +0.0001 (-0.0003 to +0.0005) | -0.2395 (-0.4514 to -0.0276) | -0.0176 (-0.0187 to -0.0165) | -0.0050 (-0.1468 to +0.1368) | holds | holds | holds | holds |
| struggling-repeater | -0.0004 | -0.0009 to +0.0002 |  |  | +0.0059 (+0.0054 to +0.0065) | -0.6215 (-0.7290 to -0.5140) | -0.0479 (-0.0495 to -0.0463) | -0.0990 (-0.1874 to -0.0106) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0008 (-0.0011 to -0.0005) | -0.0205 (-0.0342 to -0.0068) | -0.0062 (-0.0069 to -0.0055) | -0.0020 (-0.0276 to +0.0236) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0007 to -0.0001 |  |  | +0.0040 (+0.0036 to +0.0045) | -0.4855 (-0.5116 to -0.4594) | -0.0323 (-0.0335 to -0.0310) | -0.0855 (-0.1338 to -0.0372) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0006 to +0.0003 |  |  | +0.0040 (+0.0035 to +0.0046) | -0.3345 (-0.4395 to -0.2295) | -0.0373 (-0.0389 to -0.0356) | -0.0650 (-0.1436 to +0.0136) | holds | holds | holds | holds |

#### interleave:priorKnowledgeMean-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0005 to +0.0002 |  |  | +0.0037 (+0.0033 to +0.0041) | -0.3160 (-0.3385 to -0.2935) | -0.0226 (-0.0237 to -0.0215) | -0.0390 (-0.0868 to +0.0088) | holds | holds | holds | holds |
| single-subject-crammer | +0.0005 | -0.0000 to +0.0009 |  |  | -0.0020 (-0.0024 to -0.0017) | +0.0995 (-0.1070 to +0.3060) | -0.0078 (-0.0088 to -0.0067) | +0.0255 (-0.0682 to +0.1192) | holds | holds | holds | holds |
| struggling-repeater | -0.0000 | -0.0004 to +0.0004 |  |  | +0.0029 (+0.0024 to +0.0034) | -0.2910 (-0.3973 to -0.1847) | -0.0310 (-0.0325 to -0.0295) | -0.0225 (-0.0899 to +0.0449) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0020 (-0.0023 to -0.0017) | +0.0370 (+0.0236 to +0.0504) | +0.0002 (-0.0005 to +0.0008) | -0.0075 (-0.0283 to +0.0133) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0004 to +0.0000 |  |  | +0.0002 (-0.0002 to +0.0006) | -0.2575 (-0.2797 to -0.2353) | -0.0129 (-0.0140 to -0.0118) | -0.0470 (-0.0846 to -0.0094) | holds | holds | holds | holds |
| lapsed-returner | +0.0001 | -0.0003 to +0.0004 |  |  | +0.0015 (+0.0009 to +0.0021) | -0.1770 (-0.2789 to -0.0751) | -0.0200 (-0.0216 to -0.0184) | -0.0180 (-0.0756 to +0.0396) | holds | holds | holds | holds |

#### interleave:learnRate-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0002 | -0.0002 to +0.0006 |  |  | +0.0054 (+0.0050 to +0.0058) | -0.5780 (-0.6024 to -0.5536) | -0.0408 (-0.0419 to -0.0396) | +0.0055 (-0.0530 to +0.0640) | holds | holds | holds | holds |
| single-subject-crammer | -0.0000 | -0.0005 to +0.0004 |  |  | -0.0004 (-0.0008 to +0.0000) | -0.3215 (-0.5316 to -0.1114) | -0.0169 (-0.0180 to -0.0158) | -0.0535 (-0.1428 to +0.0358) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0057 (+0.0051 to +0.0062) | -0.7655 (-0.8746 to -0.6564) | -0.0526 (-0.0543 to -0.0510) | -0.0660 (-0.1360 to +0.0040) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0001 to +0.0001 |  |  | -0.0013 (-0.0016 to -0.0010) | -0.0110 (-0.0251 to +0.0031) | -0.0048 (-0.0056 to -0.0041) | +0.0080 (-0.0126 to +0.0286) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0005 to +0.0000 |  |  | +0.0032 (+0.0028 to +0.0036) | -0.4605 (-0.4868 to -0.4342) | -0.0295 (-0.0307 to -0.0283) | -0.0570 (-0.0977 to -0.0163) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0002 |  |  | +0.0034 (+0.0028 to +0.0040) | -0.3385 (-0.4448 to -0.2322) | -0.0348 (-0.0365 to -0.0330) | -0.0450 (-0.1008 to +0.0108) | holds | holds | holds | holds |

#### interleave:learnRate-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0008 | -0.0011 to -0.0004 |  |  | +0.0047 (+0.0043 to +0.0050) | -0.4560 (-0.4793 to -0.4327) | -0.0327 (-0.0338 to -0.0316) | -0.1520 (-0.2009 to -0.1031) | holds | holds | holds | holds |
| single-subject-crammer | -0.0001 | -0.0008 to +0.0007 |  |  | +0.0001 (-0.0003 to +0.0004) | -0.2310 (-0.4346 to -0.0274) | -0.0129 (-0.0140 to -0.0119) | -0.0730 (-0.2274 to +0.0814) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0007 to +0.0004 |  |  | +0.0050 (+0.0045 to +0.0056) | -0.4440 (-0.5540 to -0.3340) | -0.0403 (-0.0418 to -0.0388) | -0.0765 (-0.1763 to +0.0233) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0001 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0012) | +0.0080 (-0.0046 to +0.0206) | -0.0027 (-0.0034 to -0.0020) | +0.0160 (-0.0107 to +0.0427) | holds | holds | holds | holds |
| wanderer | -0.0007 | -0.0009 to -0.0004 |  |  | +0.0021 (+0.0017 to +0.0024) | -0.3295 (-0.3523 to -0.3067) | -0.0213 (-0.0224 to -0.0202) | -0.1265 (-0.1672 to -0.0858) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0026 (+0.0021 to +0.0031) | -0.1900 (-0.2946 to -0.0854) | -0.0260 (-0.0276 to -0.0245) | -0.0465 (-0.1268 to +0.0338) | holds | holds | holds | holds |

#### interleave:prereqPenalty-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0010 | -0.0014 to -0.0006 |  |  | +0.0050 (+0.0046 to +0.0054) | -0.4925 (-0.5161 to -0.4689) | -0.0348 (-0.0359 to -0.0337) | -0.2015 (-0.2543 to -0.1487) | holds | holds | holds | holds |
| single-subject-crammer | +0.0000 | -0.0006 to +0.0007 |  |  | -0.0000 (-0.0004 to +0.0004) | -0.1735 (-0.3790 to +0.0320) | -0.0141 (-0.0152 to -0.0131) | -0.0775 (-0.2099 to +0.0549) | holds | holds | holds | holds |
| struggling-repeater | -0.0008 | -0.0014 to -0.0003 |  |  | +0.0055 (+0.0050 to +0.0061) | -0.5315 (-0.6400 to -0.4230) | -0.0437 (-0.0452 to -0.0421) | -0.2340 (-0.3197 to -0.1483) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0025 (-0.0107 to +0.0157) | -0.0032 (-0.0039 to -0.0025) | +0.0040 (-0.0195 to +0.0275) | holds | holds | holds | holds |
| wanderer | -0.0008 | -0.0010 to -0.0005 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.3690 (-0.3929 to -0.3451) | -0.0233 (-0.0244 to -0.0221) | -0.1680 (-0.2072 to -0.1288) | holds | holds | holds | holds |
| lapsed-returner | -0.0005 | -0.0009 to -0.0000 |  |  | +0.0027 (+0.0022 to +0.0033) | -0.1905 (-0.2965 to -0.0845) | -0.0285 (-0.0301 to -0.0269) | -0.1150 (-0.1870 to -0.0430) | holds | holds | holds | holds |

#### interleave:prereqPenalty-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0011 | +0.0007 to +0.0016 |  |  | +0.0054 (+0.0050 to +0.0058) | -0.5300 (-0.5540 to -0.5060) | -0.0380 (-0.0392 to -0.0369) | +0.1610 (+0.0963 to +0.2257) | holds | holds | holds | holds |
| single-subject-crammer | +0.0006 | +0.0000 to +0.0012 |  |  | -0.0003 (-0.0006 to +0.0001) | -0.1915 (-0.3970 to +0.0140) | -0.0153 (-0.0164 to -0.0142) | +0.1005 (-0.0150 to +0.2160) | holds | holds | holds | holds |
| struggling-repeater | +0.0012 | +0.0006 to +0.0017 |  |  | +0.0057 (+0.0051 to +0.0062) | -0.6155 (-0.7267 to -0.5043) | -0.0489 (-0.0505 to -0.0472) | +0.2300 (+0.1424 to +0.3176) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0001 to +0.0002 |  |  | -0.0013 (-0.0016 to -0.0011) | -0.0015 (-0.0151 to +0.0121) | -0.0038 (-0.0045 to -0.0031) | +0.0270 (+0.0007 to +0.0533) | holds | holds | holds | holds |
| wanderer | +0.0004 | +0.0001 to +0.0006 |  |  | +0.0030 (+0.0026 to +0.0034) | -0.4265 (-0.4524 to -0.4006) | -0.0265 (-0.0277 to -0.0253) | +0.0800 (+0.0316 to +0.1284) | holds | holds | holds | holds |
| lapsed-returner | +0.0005 | +0.0001 to +0.0010 |  |  | +0.0030 (+0.0025 to +0.0036) | -0.2175 (-0.3246 to -0.1104) | -0.0321 (-0.0337 to -0.0304) | +0.0900 (+0.0192 to +0.1608) | holds | holds | holds | holds |

#### interleave:pullScale-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0005 to +0.0002 |  |  | +0.0042 (+0.0038 to +0.0046) | -0.2940 (-0.3162 to -0.2718) | -0.0156 (-0.0166 to -0.0145) | -0.0575 (-0.1078 to -0.0072) | holds | holds | holds | holds |
| single-subject-crammer | +0.0007 | +0.0000 to +0.0013 |  |  | -0.0047 (-0.0051 to -0.0043) | +0.1865 (-0.0199 to +0.3929) | -0.0036 (-0.0046 to -0.0026) | +0.0675 (-0.0620 to +0.1970) | holds | holds | holds | holds |
| struggling-repeater | +0.0000 | -0.0005 to +0.0005 |  |  | +0.0014 (+0.0009 to +0.0020) | -0.2515 (-0.3591 to -0.1439) | -0.0275 (-0.0290 to -0.0259) | -0.0285 (-0.1128 to +0.0558) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0025 (-0.0028 to -0.0021) | +0.0500 (+0.0353 to +0.0647) | +0.0013 (+0.0007 to +0.0019) | +0.0040 (-0.0260 to +0.0340) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0007 to -0.0002 |  |  | -0.0009 (-0.0014 to -0.0005) | -0.2505 (-0.2728 to -0.2282) | -0.0081 (-0.0091 to -0.0070) | -0.0700 (-0.1139 to -0.0261) | holds | holds | holds | holds |
| lapsed-returner | +0.0002 | -0.0003 to +0.0006 |  |  | +0.0016 (+0.0010 to +0.0022) | -0.1565 (-0.2613 to -0.0517) | -0.0170 (-0.0186 to -0.0153) | -0.0210 (-0.0947 to +0.0527) | holds | holds | holds | holds |

#### interleave:pullScale-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0005 | -0.0010 to -0.0000 |  |  | +0.0076 (+0.0072 to +0.0081) | -0.6820 (-0.7051 to -0.6589) | -0.0534 (-0.0546 to -0.0523) | -0.1220 (-0.1894 to -0.0546) | holds | holds | holds | holds |
| single-subject-crammer | +0.0000 | -0.0006 to +0.0006 |  |  | +0.0018 (+0.0014 to +0.0022) | -0.4215 (-0.6270 to -0.2160) | -0.0257 (-0.0269 to -0.0246) | -0.0400 (-0.1682 to +0.0882) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0009 to +0.0002 |  |  | +0.0076 (+0.0070 to +0.0081) | -0.8075 (-0.9190 to -0.6960) | -0.0617 (-0.0633 to -0.0601) | -0.1315 (-0.2240 to -0.0390) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0001 (-0.0003 to +0.0001) | -0.0545 (-0.0674 to -0.0416) | -0.0107 (-0.0115 to -0.0099) | -0.0095 (-0.0334 to +0.0144) | holds | holds | holds | holds |
| wanderer | -0.0005 | -0.0008 to -0.0002 |  |  | +0.0062 (+0.0058 to +0.0067) | -0.5730 (-0.5994 to -0.5466) | -0.0400 (-0.0412 to -0.0388) | -0.0890 (-0.1377 to -0.0403) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0004 |  |  | +0.0055 (+0.0050 to +0.0060) | -0.3985 (-0.5050 to -0.2920) | -0.0457 (-0.0474 to -0.0440) | -0.0545 (-0.1274 to +0.0184) | holds | holds | holds | holds |

#### interleave:revisitSlotCost-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.5055 (-0.5292 to -0.4818) | -0.0360 (-0.0371 to -0.0348) | -0.0675 (-0.1256 to -0.0094) | holds | holds | holds | holds |
| single-subject-crammer | +0.0003 | -0.0004 to +0.0009 |  |  | -0.0001 (-0.0005 to +0.0002) | -0.2015 (-0.4081 to +0.0051) | -0.0145 (-0.0156 to -0.0135) | -0.0145 (-0.1401 to +0.1111) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0057 (+0.0051 to +0.0062) | -0.5525 (-0.6610 to -0.4440) | -0.0454 (-0.0469 to -0.0438) | -0.0685 (-0.1543 to +0.0173) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0015 (-0.0118 to +0.0148) | -0.0033 (-0.0040 to -0.0026) | +0.0080 (-0.0164 to +0.0324) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0006 to -0.0001 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.3890 (-0.4136 to -0.3644) | -0.0243 (-0.0254 to -0.0231) | -0.0815 (-0.1245 to -0.0385) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0003 |  |  | +0.0030 (+0.0024 to +0.0035) | -0.2115 (-0.3172 to -0.1058) | -0.0301 (-0.0317 to -0.0284) | -0.0355 (-0.1081 to +0.0371) | holds | holds | holds | holds |

#### interleave:revisitSlotCost-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0003 | -0.0007 to +0.0002 |  |  | +0.0058 (+0.0054 to +0.0062) | -0.3955 (-0.4184 to -0.3726) | -0.0397 (-0.0409 to -0.0385) | -0.0555 (-0.1120 to +0.0010) | holds | holds | holds | holds |
| single-subject-crammer | -0.0001 | -0.0006 to +0.0005 |  |  | +0.0005 (+0.0000 to +0.0009) | -0.4905 (-0.6732 to -0.3078) | -0.0188 (-0.0199 to -0.0177) | -0.0995 (-0.2118 to +0.0128) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0051 (+0.0046 to +0.0057) | -0.5070 (-0.6023 to -0.4117) | -0.0496 (-0.0513 to -0.0479) | -0.0290 (-0.1098 to +0.0518) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0001 to +0.0002 |  |  | -0.0035 (-0.0039 to -0.0032) | -0.0840 (-0.1048 to -0.0632) | -0.0067 (-0.0075 to -0.0059) | +0.0055 (-0.0245 to +0.0355) | holds | holds | holds | holds |
| wanderer | -0.0001 | -0.0004 to +0.0002 |  |  | +0.0033 (+0.0028 to +0.0037) | -0.3205 (-0.3433 to -0.2977) | -0.0274 (-0.0287 to -0.0261) | -0.0240 (-0.0698 to +0.0218) | holds | holds | holds | holds |
| lapsed-returner | +0.0002 | -0.0003 to +0.0006 |  |  | +0.0027 (+0.0022 to +0.0033) | -0.1790 (-0.2775 to -0.0805) | -0.0340 (-0.0357 to -0.0323) | -0.0035 (-0.0727 to +0.0657) | holds | holds | holds | holds |

#### interleave:revisitStopScale-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0004 | -0.0008 to -0.0000 |  |  | +0.0050 (+0.0046 to +0.0054) | -0.5930 (-0.6169 to -0.5691) | -0.0343 (-0.0353 to -0.0333) | -0.1040 (-0.1616 to -0.0464) | holds | holds | holds | holds |
| single-subject-crammer | +0.0005 | -0.0001 to +0.0011 |  |  | -0.0004 (-0.0008 to -0.0001) | -0.0690 (-0.2792 to +0.1412) | -0.0138 (-0.0149 to -0.0128) | +0.0340 (-0.0936 to +0.1616) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0008 to +0.0002 |  |  | +0.0059 (+0.0054 to +0.0064) | -0.6450 (-0.7584 to -0.5316) | -0.0412 (-0.0427 to -0.0397) | -0.0995 (-0.1886 to -0.0104) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0001 to +0.0002 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0160 (+0.0046 to +0.0274) | -0.0032 (-0.0039 to -0.0025) | +0.0140 (-0.0091 to +0.0371) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0024 (+0.0020 to +0.0028) | -0.3740 (-0.3987 to -0.3493) | -0.0223 (-0.0234 to -0.0212) | -0.0555 (-0.0951 to -0.0159) | holds | holds | holds | holds |
| lapsed-returner | -0.0004 | -0.0008 to +0.0001 |  |  | +0.0027 (+0.0022 to +0.0032) | -0.3505 (-0.4630 to -0.2380) | -0.0259 (-0.0274 to -0.0244) | -0.1025 (-0.1750 to -0.0300) | holds | holds | holds | holds |

#### interleave:revisitStopScale-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0000 | -0.0005 to +0.0004 |  |  | +0.0054 (+0.0050 to +0.0059) | -0.3555 (-0.3773 to -0.3337) | -0.0410 (-0.0423 to -0.0397) | -0.0285 (-0.0865 to +0.0295) | holds | holds | holds | holds |
| single-subject-crammer | +0.0004 | -0.0003 to +0.0010 |  |  | +0.0003 (-0.0001 to +0.0007) | -0.3245 (-0.5310 to -0.1180) | -0.0164 (-0.0175 to -0.0153) | +0.0030 (-0.1187 to +0.1247) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0009 to +0.0003 |  |  | +0.0040 (+0.0034 to +0.0046) | -0.4235 (-0.5249 to -0.3221) | -0.0537 (-0.0555 to -0.0519) | -0.0250 (-0.1086 to +0.0586) | holds | holds | holds | holds |
| returning-expert | +0.0001 | -0.0001 to +0.0002 |  |  | -0.0021 (-0.0024 to -0.0018) | -0.0285 (-0.0445 to -0.0125) | -0.0041 (-0.0049 to -0.0033) | +0.0210 (-0.0052 to +0.0472) | holds | holds | holds | holds |
| wanderer | -0.0001 | -0.0004 to +0.0002 |  |  | +0.0030 (+0.0026 to +0.0035) | -0.3030 (-0.3257 to -0.2803) | -0.0282 (-0.0295 to -0.0269) | -0.0360 (-0.0822 to +0.0102) | holds | holds | holds | holds |
| lapsed-returner | +0.0005 | -0.0000 to +0.0010 |  |  | +0.0034 (+0.0028 to +0.0041) | -0.0810 (-0.1761 to +0.0141) | -0.0412 (-0.0431 to -0.0393) | +0.0475 (-0.0195 to +0.1145) | holds | holds | holds | holds |

#### interleave:slots-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0012 | +0.0006 to +0.0017 |  |  | +0.0098 (+0.0092 to +0.0104) | -0.0615 (-0.0728 to -0.0502) | -0.0599 (-0.0616 to -0.0582) | +0.1205 (+0.0736 to +0.1674) | holds | holds | holds | holds |
| single-subject-crammer | +0.0005 | +0.0000 to +0.0010 |  |  | +0.0009 (+0.0002 to +0.0016) | -0.0930 (-0.1847 to -0.0013) | -0.0372 (-0.0389 to -0.0356) | +0.0545 (-0.0125 to +0.1215) | holds | holds | holds | holds |
| struggling-repeater | +0.0011 | +0.0006 to +0.0016 |  |  | +0.0016 (+0.0008 to +0.0024) | -0.1605 (-0.2086 to -0.1124) | -0.0702 (-0.0723 to -0.0681) | +0.1610 (+0.1009 to +0.2211) | holds | holds | holds | holds |
| returning-expert | +0.0002 | -0.0002 to +0.0005 |  |  | +0.0034 (+0.0027 to +0.0041) | -0.0010 (-0.0024 to +0.0004) | -0.0246 (-0.0260 to -0.0232) | +0.0220 (-0.0240 to +0.0680) | holds | holds | holds | holds |
| wanderer | +0.0009 | +0.0005 to +0.0013 |  |  | +0.0038 (+0.0031 to +0.0045) | -0.0450 (-0.0543 to -0.0357) | -0.0515 (-0.0533 to -0.0497) | +0.1040 (+0.0569 to +0.1511) | holds | holds | holds | holds |
| lapsed-returner | +0.0007 | +0.0003 to +0.0011 |  |  | +0.0029 (+0.0021 to +0.0037) | -0.0205 (-0.0723 to +0.0313) | -0.0562 (-0.0582 to -0.0541) | +0.0925 (+0.0368 to +0.1482) | holds | holds | holds | holds |

#### interleave:slots-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0002 | -0.0001 to +0.0005 |  |  | +0.0022 (+0.0019 to +0.0024) | -0.2450 (-0.2669 to -0.2231) | -0.0253 (-0.0262 to -0.0243) | +0.0505 (-0.0045 to +0.1055) | holds | holds | holds | holds |
| single-subject-crammer | +0.0008 | -0.0001 to +0.0017 |  |  | -0.0007 (-0.0013 to +0.0000) | -0.1275 (-0.5608 to +0.3058) | -0.0121 (-0.0132 to -0.0111) | +0.0470 (-0.2198 to +0.3138) | holds | holds | holds | holds |
| struggling-repeater | +0.0002 | -0.0004 to +0.0008 |  |  | +0.0040 (+0.0035 to +0.0045) | -0.5225 (-0.6982 to -0.3468) | -0.0353 (-0.0367 to -0.0339) | -0.0385 (-0.1628 to +0.0858) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0001 to +0.0001 |  |  | -0.0002 (-0.0003 to -0.0001) | -0.0095 (-0.0156 to -0.0034) | -0.0045 (-0.0050 to -0.0040) | +0.0075 (-0.0148 to +0.0298) | holds | holds | holds | holds |
| wanderer | +0.0000 | -0.0002 to +0.0002 |  |  | +0.0004 (+0.0002 to +0.0007) | -0.1105 (-0.1270 to -0.0940) | -0.0177 (-0.0186 to -0.0168) | -0.0060 (-0.0448 to +0.0328) | holds | holds | holds | holds |
| lapsed-returner | +0.0003 | -0.0002 to +0.0009 |  |  | +0.0014 (+0.0010 to +0.0019) | -0.3465 (-0.5244 to -0.1686) | -0.0216 (-0.0231 to -0.0202) | -0.0305 (-0.1302 to +0.0692) | holds | holds | holds | holds |

#### interleave:priorRateMult-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.5060 (-0.5298 to -0.4822) | -0.0360 (-0.0371 to -0.0348) | -0.0700 (-0.1281 to -0.0119) | holds | holds | holds | holds |
| single-subject-crammer | +0.0003 | -0.0003 to +0.0009 |  |  | -0.0001 (-0.0005 to +0.0002) | -0.1970 (-0.4039 to +0.0099) | -0.0145 (-0.0156 to -0.0134) | -0.0115 (-0.1373 to +0.1143) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0057 (+0.0051 to +0.0062) | -0.5525 (-0.6610 to -0.4440) | -0.0453 (-0.0469 to -0.0438) | -0.0685 (-0.1543 to +0.0173) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0015 (-0.0118 to +0.0148) | -0.0033 (-0.0040 to -0.0026) | +0.0080 (-0.0164 to +0.0324) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0006 to -0.0001 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.3895 (-0.4141 to -0.3649) | -0.0243 (-0.0254 to -0.0231) | -0.0805 (-0.1235 to -0.0375) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0030 (+0.0024 to +0.0035) | -0.2115 (-0.3172 to -0.1058) | -0.0301 (-0.0317 to -0.0284) | -0.0350 (-0.1076 to +0.0376) | holds | holds | holds | holds |

#### interleave:priorRateMult-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.5065 (-0.5302 to -0.4828) | -0.0362 (-0.0373 to -0.0350) | -0.0665 (-0.1247 to -0.0083) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0004 to +0.0008 |  |  | -0.0001 (-0.0005 to +0.0003) | -0.2140 (-0.4189 to -0.0091) | -0.0146 (-0.0156 to -0.0135) | -0.0180 (-0.1421 to +0.1061) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0057 (+0.0051 to +0.0062) | -0.5540 (-0.6626 to -0.4454) | -0.0454 (-0.0469 to -0.0438) | -0.0675 (-0.1532 to +0.0182) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0010 (-0.0124 to +0.0144) | -0.0033 (-0.0041 to -0.0026) | +0.0065 (-0.0179 to +0.0309) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0007 to -0.0002 |  |  | +0.0025 (+0.0021 to +0.0030) | -0.3915 (-0.4161 to -0.3669) | -0.0244 (-0.0255 to -0.0232) | -0.0850 (-0.1282 to -0.0418) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0031 (+0.0025 to +0.0036) | -0.2145 (-0.3205 to -0.1085) | -0.0301 (-0.0317 to -0.0285) | -0.0385 (-0.1114 to +0.0344) | holds | holds | holds | holds |

#### interleave:priorRateMult-outer: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.5100 (-0.5337 to -0.4863) | -0.0364 (-0.0375 to -0.0353) | -0.0725 (-0.1309 to -0.0141) | holds | holds | holds | holds |
| single-subject-crammer | +0.0001 | -0.0005 to +0.0007 |  |  | -0.0001 (-0.0004 to +0.0003) | -0.2295 (-0.4331 to -0.0259) | -0.0147 (-0.0158 to -0.0136) | -0.0325 (-0.1564 to +0.0914) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0057 (+0.0052 to +0.0063) | -0.5575 (-0.6658 to -0.4492) | -0.0454 (-0.0470 to -0.0439) | -0.0660 (-0.1519 to +0.0199) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0014 (-0.0016 to -0.0011) | +0.0000 (-0.0134 to +0.0134) | -0.0034 (-0.0041 to -0.0027) | +0.0075 (-0.0172 to +0.0322) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0007 to -0.0002 |  |  | +0.0026 (+0.0022 to +0.0030) | -0.3960 (-0.4206 to -0.3714) | -0.0244 (-0.0256 to -0.0233) | -0.0870 (-0.1303 to -0.0437) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0006 to +0.0004 |  |  | +0.0031 (+0.0025 to +0.0036) | -0.2225 (-0.3288 to -0.1162) | -0.0302 (-0.0318 to -0.0286) | -0.0350 (-0.1077 to +0.0377) | holds | holds | holds | holds |

#### interleave:price-corner: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0014 | +0.0009 to +0.0020 |  |  | +0.0101 (+0.0095 to +0.0108) | -0.0585 (-0.0694 to -0.0476) | -0.0620 (-0.0638 to -0.0602) | +0.1385 (+0.0919 to +0.1851) | holds | holds | holds | holds |
| single-subject-crammer | +0.0007 | +0.0003 to +0.0012 |  |  | +0.0002 (-0.0005 to +0.0010) | -0.0060 (-0.0939 to +0.0819) | -0.0393 (-0.0410 to -0.0376) | +0.0885 (+0.0241 to +0.1529) | holds | holds | holds | holds |
| struggling-repeater | +0.0012 | +0.0007 to +0.0017 |  |  | +0.0028 (+0.0019 to +0.0036) | -0.1615 (-0.2076 to -0.1154) | -0.0724 (-0.0746 to -0.0701) | +0.1575 (+0.0987 to +0.2163) | holds | holds | holds | holds |
| returning-expert | +0.0003 | -0.0001 to +0.0007 |  |  | +0.0039 (+0.0032 to +0.0047) | -0.0020 (-0.0040 to -0.0000) | -0.0282 (-0.0297 to -0.0267) | +0.0475 (+0.0003 to +0.0947) | holds | holds | holds | holds |
| wanderer | +0.0010 | +0.0006 to +0.0014 |  |  | +0.0038 (+0.0031 to +0.0046) | -0.0455 (-0.0547 to -0.0363) | -0.0564 (-0.0583 to -0.0545) | +0.1110 (+0.0633 to +0.1587) | holds | holds | holds | holds |
| lapsed-returner | +0.0006 | +0.0002 to +0.0011 |  |  | +0.0032 (+0.0022 to +0.0041) | -0.0305 (-0.0773 to +0.0163) | -0.0605 (-0.0628 to -0.0582) | +0.1030 (+0.0503 to +0.1557) | holds | holds | holds | holds |

### gam-session-no-cov+fixed: FAIL
| cell | wins | harmed | guardrail fails | beats | Δ by persona (lo, hi) |
|---|---|---|---|---|---|
| interleave:base | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:forgetScale-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.002, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:forgetScale-high | 0 | – | – | **no** | curious -0.000 (-0.000, +0.000); single -0.000 (-0.000, +0.000); struggling -0.000 (-0.000, -0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, -0.000); lapsed -0.000 (-0.000, +0.000) |
| interleave:forgetShape-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:forgetShape-high | 0 | – | – | **no** | curious +0.000 (-0.000, +0.000); single -0.001 (-0.001, -0.000); struggling -0.000 (-0.000, +0.000); returning -0.000 (-0.000, -0.000); wanderer -0.000 (-0.000, +0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:kSpread-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, -0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:kSpread-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitStrengthen-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, +0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitStrengthen-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, +0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:relearn-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, -0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, +0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:relearn-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorKnowledgeMean-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.001, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, +0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorKnowledgeMean-high | 0 | – | – | **no** | curious -0.000 (-0.000, +0.000); single +0.000 (-0.000, +0.001); struggling +0.000 (-0.000, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, -0.000); lapsed +0.000 (-0.000, +0.000) |
| interleave:learnRate-low | 0 | – | – | **no** | curious +0.000 (-0.000, +0.001); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.000, +0.000) |
| interleave:learnRate-high | 0 | – | – | **no** | curious -0.001 (-0.001, -0.000); single -0.000 (-0.001, +0.000); struggling -0.000 (-0.001, +0.001); returning -0.000 (-0.000, +0.000); wanderer -0.001 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:prereqPenalty-low | 0 | – | – | **no** | curious -0.001 (-0.001, -0.001); single -0.001 (-0.001, +0.000); struggling -0.001 (-0.001, -0.000); returning -0.000 (-0.000, +0.000); wanderer -0.001 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:prereqPenalty-high | 0 | – | – | **no** | curious +0.001 (+0.001, +0.001); single +0.000 (-0.000, +0.001); struggling +0.001 (+0.000, +0.001); returning +0.000 (-0.000, +0.000); wanderer +0.000 (+0.000, +0.001); lapsed +0.000 (-0.000, +0.001) |
| interleave:pullScale-low | 0 | – | – | **no** | curious -0.000 (-0.000, +0.000); single +0.000 (-0.000, +0.001); struggling +0.000 (-0.000, +0.001); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed +0.000 (-0.000, +0.001) |
| interleave:pullScale-high | 0 | – | – | **no** | curious -0.000 (-0.001, -0.000); single +0.000 (-0.000, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, -0.000); wanderer -0.001 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitSlotCost-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitSlotCost-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, +0.000); lapsed +0.000 (-0.000, +0.001) |
| interleave:revisitStopScale-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.000 (-0.001, +0.001); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, +0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:revisitStopScale-high | 0 | – | – | **no** | curious -0.000 (-0.000, +0.000); single +0.000 (-0.000, +0.001); struggling +0.000 (-0.001, +0.001); returning +0.000 (-0.000, +0.000); wanderer -0.000 (-0.000, +0.000); lapsed +0.000 (-0.000, +0.001) |
| interleave:slots-low | 0 | – | – | **no** | curious +0.001 (+0.001, +0.002); single +0.000 (-0.000, +0.001); struggling +0.001 (+0.001, +0.002); returning +0.000 (-0.000, +0.000); wanderer +0.001 (+0.000, +0.001); lapsed +0.001 (+0.000, +0.001) |
| interleave:slots-high | 0 | – | – | **no** | curious +0.000 (-0.000, +0.000); single +0.000 (-0.001, +0.001); struggling +0.000 (-0.000, +0.001); returning +0.000 (-0.000, +0.000); wanderer +0.000 (-0.000, +0.000); lapsed +0.000 (-0.000, +0.001) |
| interleave:priorRateMult-low | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, +0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorRateMult-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:priorRateMult-outer | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single -0.001 (-0.001, +0.000); struggling -0.000 (-0.001, +0.000); returning -0.000 (-0.000, +0.000); wanderer -0.000 (-0.001, -0.000); lapsed -0.000 (-0.001, +0.000) |
| interleave:price-corner | 0 | – | – | **no** | curious +0.001 (+0.001, +0.002); single +0.001 (+0.000, +0.001); struggling +0.001 (+0.001, +0.002); returning +0.000 (-0.000, +0.000); wanderer +0.001 (+0.001, +0.001); lapsed +0.001 (+0.000, +0.001) |

#### interleave:base: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0043 (+0.0040 to +0.0047) | -0.4990 (-0.5227 to -0.4753) | -0.0342 (-0.0353 to -0.0331) | -0.0710 (-0.1276 to -0.0144) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0001 |  |  | -0.0004 (-0.0007 to +0.0000) | -0.4060 (-0.6106 to -0.2014) | -0.0130 (-0.0141 to -0.0119) | -0.1700 (-0.2956 to -0.0444) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0007 to +0.0002 |  |  | +0.0048 (+0.0043 to +0.0054) | -0.5355 (-0.6455 to -0.4255) | -0.0428 (-0.0443 to -0.0413) | -0.0980 (-0.1829 to -0.0131) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0020 (-0.0154 to +0.0114) | -0.0031 (-0.0038 to -0.0024) | -0.0030 (-0.0277 to +0.0217) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3720 (-0.3958 to -0.3482) | -0.0227 (-0.0238 to -0.0216) | -0.0580 (-0.1013 to -0.0147) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0021 (+0.0016 to +0.0026) | -0.2260 (-0.3313 to -0.1207) | -0.0273 (-0.0290 to -0.0257) | -0.0555 (-0.1255 to +0.0145) | holds | holds | holds | holds |

#### interleave:forgetScale-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0004 | -0.0009 to +0.0001 |  |  | +0.0042 (+0.0039 to +0.0046) | -0.4735 (-0.4972 to -0.4498) | -0.0329 (-0.0340 to -0.0318) | -0.0725 (-0.1258 to -0.0192) | holds | holds | holds | holds |
| single-subject-crammer | -0.0007 | -0.0015 to +0.0001 |  |  | -0.0002 (-0.0005 to +0.0002) | -0.4050 (-0.6114 to -0.1986) | -0.0129 (-0.0140 to -0.0118) | -0.1570 (-0.2813 to -0.0327) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0010 to +0.0004 |  |  | +0.0047 (+0.0042 to +0.0052) | -0.5055 (-0.6143 to -0.3967) | -0.0411 (-0.0426 to -0.0396) | -0.0740 (-0.1579 to +0.0099) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0018 to -0.0012) | +0.0005 (-0.0128 to +0.0138) | -0.0030 (-0.0037 to -0.0023) | -0.0005 (-0.0250 to +0.0240) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0007 to -0.0000 |  |  | +0.0021 (+0.0018 to +0.0025) | -0.3535 (-0.3771 to -0.3299) | -0.0219 (-0.0230 to -0.0208) | -0.0525 (-0.0944 to -0.0106) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0009 to +0.0004 |  |  | +0.0021 (+0.0016 to +0.0027) | -0.2150 (-0.3222 to -0.1078) | -0.0263 (-0.0279 to -0.0247) | -0.0540 (-0.1245 to +0.0165) | holds | holds | holds | holds |

#### interleave:forgetScale-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0000 | -0.0003 to +0.0002 |  |  | +0.0045 (+0.0041 to +0.0048) | -0.5425 (-0.5665 to -0.5185) | -0.0367 (-0.0378 to -0.0356) | -0.0820 (-0.1397 to -0.0243) | holds | holds | holds | holds |
| single-subject-crammer | -0.0001 | -0.0004 to +0.0002 |  |  | -0.0004 (-0.0008 to -0.0000) | -0.3780 (-0.5864 to -0.1696) | -0.0141 (-0.0152 to -0.0130) | -0.1270 (-0.2525 to -0.0015) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0047 (+0.0042 to +0.0053) | -0.6195 (-0.7282 to -0.5108) | -0.0451 (-0.0467 to -0.0435) | -0.1345 (-0.2202 to -0.0488) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0014 (-0.0017 to -0.0011) | -0.0030 (-0.0167 to +0.0107) | -0.0033 (-0.0040 to -0.0026) | -0.0080 (-0.0333 to +0.0173) | holds | holds | holds | holds |
| wanderer | -0.0001 | -0.0003 to -0.0000 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.4020 (-0.4266 to -0.3774) | -0.0237 (-0.0249 to -0.0226) | -0.0685 (-0.1131 to -0.0239) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0003 to +0.0001 |  |  | +0.0022 (+0.0016 to +0.0027) | -0.2715 (-0.3756 to -0.1674) | -0.0288 (-0.0305 to -0.0271) | -0.0680 (-0.1399 to +0.0039) | holds | holds | holds | holds |

#### interleave:forgetShape-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0003 | -0.0007 to +0.0001 |  |  | +0.0043 (+0.0040 to +0.0047) | -0.4995 (-0.5232 to -0.4758) | -0.0341 (-0.0352 to -0.0330) | -0.0725 (-0.1292 to -0.0158) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0012 to +0.0000 |  |  | -0.0004 (-0.0007 to -0.0000) | -0.4035 (-0.6077 to -0.1993) | -0.0130 (-0.0141 to -0.0119) | -0.1700 (-0.2954 to -0.0446) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0008 to +0.0002 |  |  | +0.0049 (+0.0043 to +0.0054) | -0.5310 (-0.6410 to -0.4210) | -0.0426 (-0.0441 to -0.0411) | -0.1055 (-0.1906 to -0.0204) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0020 (-0.0154 to +0.0114) | -0.0031 (-0.0038 to -0.0024) | -0.0030 (-0.0277 to +0.0217) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3705 (-0.3943 to -0.3467) | -0.0226 (-0.0237 to -0.0215) | -0.0605 (-0.1036 to -0.0174) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0006 to +0.0003 |  |  | +0.0021 (+0.0015 to +0.0026) | -0.2175 (-0.3228 to -0.1122) | -0.0273 (-0.0289 to -0.0256) | -0.0550 (-0.1253 to +0.0153) | holds | holds | holds | holds |

#### interleave:forgetShape-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0001 | -0.0003 to +0.0004 |  |  | +0.0044 (+0.0040 to +0.0048) | -0.5070 (-0.5307 to -0.4833) | -0.0343 (-0.0354 to -0.0332) | -0.0705 (-0.1273 to -0.0137) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0012 to -0.0001 |  |  | -0.0005 (-0.0009 to -0.0001) | -0.3920 (-0.5984 to -0.1856) | -0.0133 (-0.0144 to -0.0122) | -0.1855 (-0.3108 to -0.0602) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0005 to +0.0004 |  |  | +0.0049 (+0.0043 to +0.0054) | -0.5490 (-0.6599 to -0.4381) | -0.0434 (-0.0449 to -0.0418) | -0.0960 (-0.1812 to -0.0108) | holds | holds | holds | holds |
| returning-expert | -0.0002 | -0.0003 to -0.0000 |  |  | -0.0014 (-0.0017 to -0.0012) | -0.0025 (-0.0160 to +0.0110) | -0.0031 (-0.0038 to -0.0024) | -0.0050 (-0.0298 to +0.0198) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0004 to +0.0001 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3765 (-0.4004 to -0.3526) | -0.0229 (-0.0240 to -0.0218) | -0.0620 (-0.1056 to -0.0184) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0022 (+0.0017 to +0.0028) | -0.2290 (-0.3338 to -0.1242) | -0.0276 (-0.0292 to -0.0259) | -0.0590 (-0.1304 to +0.0124) | holds | holds | holds | holds |

#### interleave:kSpread-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0001 |  |  | +0.0044 (+0.0040 to +0.0047) | -0.4975 (-0.5212 to -0.4738) | -0.0340 (-0.0351 to -0.0329) | -0.0750 (-0.1308 to -0.0192) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0012 to -0.0000 |  |  | -0.0003 (-0.0007 to +0.0001) | -0.4005 (-0.6057 to -0.1953) | -0.0130 (-0.0141 to -0.0120) | -0.1670 (-0.2919 to -0.0421) | holds | holds | holds | holds |
| struggling-repeater | -0.0004 | -0.0008 to +0.0001 |  |  | +0.0049 (+0.0044 to +0.0054) | -0.5420 (-0.6526 to -0.4314) | -0.0428 (-0.0443 to -0.0412) | -0.1030 (-0.1872 to -0.0188) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0015 (-0.0149 to +0.0119) | -0.0031 (-0.0038 to -0.0024) | -0.0010 (-0.0257 to +0.0237) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3750 (-0.3988 to -0.3512) | -0.0226 (-0.0237 to -0.0215) | -0.0560 (-0.0991 to -0.0129) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0006 to +0.0003 |  |  | +0.0021 (+0.0016 to +0.0027) | -0.2165 (-0.3224 to -0.1106) | -0.0271 (-0.0288 to -0.0255) | -0.0515 (-0.1221 to +0.0191) | holds | holds | holds | holds |

#### interleave:kSpread-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0045 (+0.0041 to +0.0049) | -0.5035 (-0.5274 to -0.4796) | -0.0343 (-0.0354 to -0.0332) | -0.0655 (-0.1221 to -0.0089) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0001 |  |  | -0.0004 (-0.0007 to -0.0000) | -0.4040 (-0.6101 to -0.1979) | -0.0132 (-0.0143 to -0.0121) | -0.1710 (-0.2977 to -0.0443) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0049 (+0.0044 to +0.0054) | -0.5430 (-0.6540 to -0.4320) | -0.0427 (-0.0442 to -0.0412) | -0.0870 (-0.1714 to -0.0026) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0015 (-0.0150 to +0.0120) | -0.0031 (-0.0038 to -0.0024) | -0.0010 (-0.0257 to +0.0237) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to -0.0000 |  |  | +0.0023 (+0.0019 to +0.0027) | -0.3740 (-0.3979 to -0.3501) | -0.0227 (-0.0238 to -0.0215) | -0.0660 (-0.1093 to -0.0227) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0006 to +0.0003 |  |  | +0.0022 (+0.0016 to +0.0027) | -0.2360 (-0.3408 to -0.1312) | -0.0276 (-0.0292 to -0.0259) | -0.0535 (-0.1250 to +0.0180) | holds | holds | holds | holds |

#### interleave:revisitStrengthen-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0044 (+0.0040 to +0.0047) | -0.5005 (-0.5242 to -0.4768) | -0.0342 (-0.0353 to -0.0331) | -0.0785 (-0.1348 to -0.0222) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0012 to +0.0001 |  |  | -0.0004 (-0.0007 to +0.0000) | -0.4100 (-0.6146 to -0.2054) | -0.0129 (-0.0140 to -0.0119) | -0.1725 (-0.2982 to -0.0468) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0049 (+0.0044 to +0.0054) | -0.5290 (-0.6400 to -0.4180) | -0.0428 (-0.0444 to -0.0413) | -0.0920 (-0.1769 to -0.0071) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0020 (-0.0154 to +0.0114) | -0.0031 (-0.0038 to -0.0024) | -0.0025 (-0.0273 to +0.0223) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0005 to +0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3720 (-0.3958 to -0.3482) | -0.0227 (-0.0238 to -0.0216) | -0.0565 (-0.0998 to -0.0132) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0007 to +0.0002 |  |  | +0.0021 (+0.0016 to +0.0026) | -0.2315 (-0.3367 to -0.1263) | -0.0273 (-0.0289 to -0.0257) | -0.0545 (-0.1245 to +0.0155) | holds | holds | holds | holds |

#### interleave:revisitStrengthen-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0043 (+0.0040 to +0.0047) | -0.4985 (-0.5222 to -0.4748) | -0.0342 (-0.0353 to -0.0331) | -0.0685 (-0.1252 to -0.0118) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0012 to +0.0001 |  |  | -0.0003 (-0.0007 to +0.0000) | -0.4175 (-0.6221 to -0.2129) | -0.0130 (-0.0140 to -0.0119) | -0.1740 (-0.2998 to -0.0482) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0002 |  |  | +0.0048 (+0.0043 to +0.0054) | -0.5350 (-0.6449 to -0.4251) | -0.0428 (-0.0444 to -0.0413) | -0.0990 (-0.1837 to -0.0143) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0020 (-0.0154 to +0.0114) | -0.0031 (-0.0038 to -0.0024) | -0.0025 (-0.0272 to +0.0222) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to +0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3720 (-0.3958 to -0.3482) | -0.0227 (-0.0238 to -0.0216) | -0.0575 (-0.1007 to -0.0143) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0021 (+0.0016 to +0.0026) | -0.2235 (-0.3286 to -0.1184) | -0.0274 (-0.0290 to -0.0257) | -0.0540 (-0.1235 to +0.0155) | holds | holds | holds | holds |

#### interleave:relearn-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0003 | -0.0007 to +0.0001 |  |  | +0.0044 (+0.0040 to +0.0048) | -0.5035 (-0.5273 to -0.4797) | -0.0342 (-0.0353 to -0.0331) | -0.0740 (-0.1313 to -0.0167) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0012 to -0.0000 |  |  | -0.0004 (-0.0008 to -0.0000) | -0.4270 (-0.6316 to -0.2224) | -0.0130 (-0.0141 to -0.0119) | -0.1750 (-0.3009 to -0.0491) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0048 (+0.0043 to +0.0053) | -0.5270 (-0.6368 to -0.4172) | -0.0429 (-0.0445 to -0.0414) | -0.0820 (-0.1661 to +0.0021) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0020 (-0.0154 to +0.0114) | -0.0031 (-0.0038 to -0.0024) | -0.0025 (-0.0273 to +0.0223) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0005 to +0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3725 (-0.3963 to -0.3487) | -0.0227 (-0.0238 to -0.0216) | -0.0540 (-0.0972 to -0.0108) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0007 to +0.0002 |  |  | +0.0021 (+0.0016 to +0.0026) | -0.2305 (-0.3353 to -0.1257) | -0.0273 (-0.0289 to -0.0257) | -0.0595 (-0.1308 to +0.0118) | holds | holds | holds | holds |

#### interleave:relearn-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0003 | -0.0006 to +0.0001 |  |  | +0.0044 (+0.0040 to +0.0047) | -0.4980 (-0.5217 to -0.4743) | -0.0341 (-0.0352 to -0.0330) | -0.0740 (-0.1290 to -0.0190) | holds | holds | holds | holds |
| single-subject-crammer | -0.0004 | -0.0010 to +0.0002 |  |  | -0.0003 (-0.0007 to +0.0001) | -0.4035 (-0.6079 to -0.1991) | -0.0130 (-0.0141 to -0.0120) | -0.1350 (-0.2584 to -0.0116) | holds | holds | holds | holds |
| struggling-repeater | -0.0004 | -0.0009 to +0.0001 |  |  | +0.0048 (+0.0043 to +0.0053) | -0.5480 (-0.6589 to -0.4371) | -0.0428 (-0.0443 to -0.0413) | -0.1245 (-0.2093 to -0.0397) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0015 (-0.0150 to +0.0120) | -0.0031 (-0.0038 to -0.0024) | -0.0040 (-0.0288 to +0.0208) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3725 (-0.3963 to -0.3487) | -0.0227 (-0.0238 to -0.0216) | -0.0635 (-0.1067 to -0.0203) | holds | holds | holds | holds |
| lapsed-returner | -0.0003 | -0.0007 to +0.0002 |  |  | +0.0021 (+0.0016 to +0.0027) | -0.2375 (-0.3429 to -0.1321) | -0.0273 (-0.0290 to -0.0257) | -0.0640 (-0.1337 to +0.0057) | holds | holds | holds | holds |

#### interleave:priorKnowledgeMean-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0003 |  |  | +0.0051 (+0.0047 to +0.0055) | -0.5400 (-0.5640 to -0.5160) | -0.0387 (-0.0398 to -0.0376) | -0.0630 (-0.1238 to -0.0022) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0005 to +0.0009 |  |  | -0.0005 (-0.0009 to -0.0001) | -0.2540 (-0.4669 to -0.0411) | -0.0159 (-0.0170 to -0.0148) | -0.0125 (-0.1528 to +0.1278) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0008 to +0.0002 |  |  | +0.0051 (+0.0046 to +0.0056) | -0.5410 (-0.6504 to -0.4316) | -0.0449 (-0.0464 to -0.0433) | -0.0955 (-0.1836 to -0.0074) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0003 to +0.0000 |  |  | -0.0009 (-0.0012 to -0.0006) | -0.0260 (-0.0398 to -0.0122) | -0.0058 (-0.0066 to -0.0051) | -0.0065 (-0.0325 to +0.0195) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0006 to +0.0000 |  |  | +0.0033 (+0.0029 to +0.0038) | -0.4645 (-0.4906 to -0.4384) | -0.0292 (-0.0304 to -0.0281) | -0.0690 (-0.1169 to -0.0211) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0031 (+0.0025 to +0.0036) | -0.3460 (-0.4531 to -0.2389) | -0.0343 (-0.0360 to -0.0326) | -0.0710 (-0.1504 to +0.0084) | holds | holds | holds | holds |

#### interleave:priorKnowledgeMean-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0005 to +0.0002 |  |  | +0.0035 (+0.0032 to +0.0039) | -0.3105 (-0.3328 to -0.2882) | -0.0217 (-0.0227 to -0.0206) | -0.0390 (-0.0861 to +0.0081) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0003 to +0.0007 |  |  | -0.0023 (-0.0027 to -0.0020) | -0.0180 (-0.2277 to +0.1917) | -0.0068 (-0.0078 to -0.0058) | -0.0265 (-0.1230 to +0.0700) | holds | holds | holds | holds |
| struggling-repeater | +0.0000 | -0.0004 to +0.0004 |  |  | +0.0023 (+0.0018 to +0.0028) | -0.2670 (-0.3763 to -0.1577) | -0.0299 (-0.0313 to -0.0284) | -0.0140 (-0.0822 to +0.0542) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0021 (-0.0024 to -0.0018) | +0.0325 (+0.0190 to +0.0460) | +0.0001 (-0.0005 to +0.0007) | -0.0100 (-0.0309 to +0.0109) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0005 to -0.0000 |  |  | +0.0001 (-0.0003 to +0.0005) | -0.2550 (-0.2771 to -0.2329) | -0.0124 (-0.0135 to -0.0114) | -0.0480 (-0.0853 to -0.0107) | holds | holds | holds | holds |
| lapsed-returner | +0.0001 | -0.0003 to +0.0005 |  |  | +0.0011 (+0.0006 to +0.0017) | -0.1660 (-0.2679 to -0.0641) | -0.0190 (-0.0206 to -0.0174) | -0.0140 (-0.0713 to +0.0433) | holds | holds | holds | holds |

#### interleave:learnRate-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0002 | -0.0002 to +0.0006 |  |  | +0.0044 (+0.0041 to +0.0048) | -0.5735 (-0.5978 to -0.5492) | -0.0383 (-0.0395 to -0.0372) | +0.0045 (-0.0517 to +0.0607) | holds | holds | holds | holds |
| single-subject-crammer | -0.0002 | -0.0006 to +0.0003 |  |  | -0.0010 (-0.0014 to -0.0006) | -0.3400 (-0.5500 to -0.1300) | -0.0159 (-0.0171 to -0.0148) | -0.0755 (-0.1641 to +0.0131) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0043 (+0.0038 to +0.0049) | -0.7195 (-0.8286 to -0.6104) | -0.0481 (-0.0498 to -0.0465) | -0.0665 (-0.1347 to +0.0017) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0115 (-0.0257 to +0.0027) | -0.0043 (-0.0050 to -0.0036) | -0.0005 (-0.0217 to +0.0207) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0026 (+0.0021 to +0.0030) | -0.4460 (-0.4721 to -0.4199) | -0.0269 (-0.0281 to -0.0257) | -0.0565 (-0.0976 to -0.0154) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0003 |  |  | +0.0025 (+0.0020 to +0.0031) | -0.2880 (-0.3961 to -0.1799) | -0.0315 (-0.0332 to -0.0297) | -0.0365 (-0.0917 to +0.0187) | holds | holds | holds | holds |

#### interleave:learnRate-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0008 | -0.0011 to -0.0004 |  |  | +0.0043 (+0.0039 to +0.0047) | -0.4545 (-0.4779 to -0.4311) | -0.0315 (-0.0325 to -0.0304) | -0.1500 (-0.1985 to -0.1015) | holds | holds | holds | holds |
| single-subject-crammer | -0.0004 | -0.0011 to +0.0003 |  |  | -0.0002 (-0.0006 to +0.0001) | -0.3055 (-0.5083 to -0.1027) | -0.0117 (-0.0128 to -0.0106) | -0.1430 (-0.2963 to +0.0103) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0006 to +0.0005 |  |  | +0.0046 (+0.0040 to +0.0051) | -0.4175 (-0.5280 to -0.3070) | -0.0379 (-0.0393 to -0.0364) | -0.0755 (-0.1748 to +0.0238) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0016 (-0.0018 to -0.0013) | +0.0035 (-0.0092 to +0.0162) | -0.0026 (-0.0033 to -0.0019) | +0.0105 (-0.0162 to +0.0372) | holds | holds | holds | holds |
| wanderer | -0.0006 | -0.0008 to -0.0004 |  |  | +0.0019 (+0.0015 to +0.0022) | -0.3235 (-0.3462 to -0.3008) | -0.0204 (-0.0215 to -0.0194) | -0.1165 (-0.1573 to -0.0757) | holds | holds | holds | holds |
| lapsed-returner | -0.0003 | -0.0008 to +0.0002 |  |  | +0.0019 (+0.0014 to +0.0024) | -0.2225 (-0.3272 to -0.1178) | -0.0245 (-0.0261 to -0.0230) | -0.0765 (-0.1563 to +0.0033) | holds | holds | holds | holds |

#### interleave:prereqPenalty-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0010 | -0.0013 to -0.0006 |  |  | +0.0044 (+0.0040 to +0.0047) | -0.4825 (-0.5062 to -0.4588) | -0.0332 (-0.0343 to -0.0321) | -0.1955 (-0.2469 to -0.1441) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0012 to +0.0001 |  |  | -0.0002 (-0.0006 to +0.0001) | -0.3200 (-0.5244 to -0.1156) | -0.0125 (-0.0135 to -0.0114) | -0.1980 (-0.3303 to -0.0657) | holds | holds | holds | holds |
| struggling-repeater | -0.0008 | -0.0013 to -0.0003 |  |  | +0.0048 (+0.0043 to +0.0053) | -0.4935 (-0.6015 to -0.3855) | -0.0408 (-0.0423 to -0.0393) | -0.2405 (-0.3243 to -0.1567) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0015 (-0.0149 to +0.0119) | -0.0030 (-0.0037 to -0.0023) | -0.0080 (-0.0318 to +0.0158) | holds | holds | holds | holds |
| wanderer | -0.0007 | -0.0009 to -0.0005 |  |  | +0.0021 (+0.0017 to +0.0025) | -0.3560 (-0.3798 to -0.3322) | -0.0219 (-0.0230 to -0.0208) | -0.1560 (-0.1953 to -0.1167) | holds | holds | holds | holds |
| lapsed-returner | -0.0004 | -0.0008 to +0.0001 |  |  | +0.0019 (+0.0014 to +0.0025) | -0.1830 (-0.2887 to -0.0773) | -0.0261 (-0.0277 to -0.0245) | -0.1035 (-0.1742 to -0.0328) | holds | holds | holds | holds |

#### interleave:prereqPenalty-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0010 | +0.0005 to +0.0014 |  |  | +0.0046 (+0.0042 to +0.0049) | -0.5245 (-0.5485 to -0.5005) | -0.0359 (-0.0371 to -0.0348) | +0.1415 (+0.0785 to +0.2045) | holds | holds | holds | holds |
| single-subject-crammer | +0.0001 | -0.0005 to +0.0006 |  |  | -0.0005 (-0.0009 to -0.0001) | -0.3875 (-0.5916 to -0.1834) | -0.0141 (-0.0152 to -0.0130) | -0.0135 (-0.1289 to +0.1019) | holds | holds | holds | holds |
| struggling-repeater | +0.0010 | +0.0005 to +0.0015 |  |  | +0.0047 (+0.0042 to +0.0052) | -0.5910 (-0.7024 to -0.4796) | -0.0449 (-0.0465 to -0.0433) | +0.1955 (+0.1086 to +0.2824) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0001 to +0.0002 |  |  | -0.0014 (-0.0017 to -0.0012) | -0.0020 (-0.0154 to +0.0114) | -0.0034 (-0.0041 to -0.0027) | +0.0205 (-0.0061 to +0.0471) | holds | holds | holds | holds |
| wanderer | +0.0004 | +0.0001 to +0.0007 |  |  | +0.0025 (+0.0021 to +0.0029) | -0.4065 (-0.4317 to -0.3813) | -0.0246 (-0.0258 to -0.0235) | +0.0855 (+0.0379 to +0.1331) | holds | holds | holds | holds |
| lapsed-returner | +0.0003 | -0.0001 to +0.0008 |  |  | +0.0023 (+0.0018 to +0.0029) | -0.2205 (-0.3277 to -0.1133) | -0.0288 (-0.0304 to -0.0271) | +0.0600 (-0.0099 to +0.1299) | holds | holds | holds | holds |

#### interleave:pullScale-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0005 to +0.0003 |  |  | +0.0040 (+0.0036 to +0.0044) | -0.3045 (-0.3276 to -0.2814) | -0.0150 (-0.0161 to -0.0140) | -0.0490 (-0.0996 to +0.0016) | holds | holds | holds | holds |
| single-subject-crammer | +0.0004 | -0.0002 to +0.0010 |  |  | -0.0050 (-0.0054 to -0.0046) | +0.0830 (-0.1258 to +0.2918) | -0.0030 (-0.0039 to -0.0020) | +0.0150 (-0.1144 to +0.1444) | holds | holds | holds | holds |
| struggling-repeater | +0.0001 | -0.0004 to +0.0006 |  |  | +0.0007 (+0.0002 to +0.0012) | -0.2355 (-0.3447 to -0.1263) | -0.0255 (-0.0270 to -0.0239) | -0.0240 (-0.1089 to +0.0609) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0027 (-0.0030 to -0.0024) | +0.0530 (+0.0380 to +0.0680) | +0.0013 (+0.0007 to +0.0019) | -0.0005 (-0.0301 to +0.0291) | holds | holds | holds | holds |
| wanderer | -0.0005 | -0.0007 to -0.0002 |  |  | -0.0013 (-0.0018 to -0.0009) | -0.2490 (-0.2713 to -0.2267) | -0.0076 (-0.0086 to -0.0066) | -0.0770 (-0.1205 to -0.0335) | holds | holds | holds | holds |
| lapsed-returner | +0.0002 | -0.0003 to +0.0006 |  |  | +0.0009 (+0.0003 to +0.0015) | -0.1800 (-0.2847 to -0.0753) | -0.0155 (-0.0171 to -0.0139) | -0.0220 (-0.0935 to +0.0495) | holds | holds | holds | holds |

#### interleave:pullScale-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0005 | -0.0009 to -0.0000 |  |  | +0.0065 (+0.0061 to +0.0069) | -0.6470 (-0.6699 to -0.6241) | -0.0499 (-0.0510 to -0.0487) | -0.1070 (-0.1717 to -0.0423) | holds | holds | holds | holds |
| single-subject-crammer | +0.0001 | -0.0005 to +0.0008 |  |  | +0.0014 (+0.0010 to +0.0018) | -0.3950 (-0.6063 to -0.1837) | -0.0242 (-0.0254 to -0.0231) | -0.0200 (-0.1495 to +0.1095) | holds | holds | holds | holds |
| struggling-repeater | -0.0004 | -0.0010 to +0.0001 |  |  | +0.0060 (+0.0054 to +0.0065) | -0.8260 (-0.9342 to -0.7178) | -0.0561 (-0.0577 to -0.0545) | -0.1685 (-0.2552 to -0.0818) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0003 to -0.0000 |  |  | -0.0003 (-0.0006 to -0.0001) | -0.0565 (-0.0697 to -0.0433) | -0.0101 (-0.0108 to -0.0093) | -0.0155 (-0.0393 to +0.0083) | holds | holds | holds | holds |
| wanderer | -0.0005 | -0.0008 to -0.0002 |  |  | +0.0056 (+0.0051 to +0.0060) | -0.5400 (-0.5660 to -0.5140) | -0.0369 (-0.0380 to -0.0357) | -0.0990 (-0.1459 to -0.0521) | holds | holds | holds | holds |
| lapsed-returner | -0.0001 | -0.0005 to +0.0003 |  |  | +0.0045 (+0.0040 to +0.0051) | -0.4425 (-0.5490 to -0.3360) | -0.0414 (-0.0431 to -0.0397) | -0.0615 (-0.1329 to +0.0099) | holds | holds | holds | holds |

#### interleave:revisitSlotCost-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0043 (+0.0040 to +0.0047) | -0.4990 (-0.5227 to -0.4753) | -0.0342 (-0.0353 to -0.0331) | -0.0710 (-0.1276 to -0.0144) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0001 |  |  | -0.0004 (-0.0007 to +0.0000) | -0.4060 (-0.6106 to -0.2014) | -0.0130 (-0.0141 to -0.0119) | -0.1700 (-0.2956 to -0.0444) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0007 to +0.0002 |  |  | +0.0048 (+0.0043 to +0.0054) | -0.5355 (-0.6455 to -0.4255) | -0.0428 (-0.0443 to -0.0413) | -0.0980 (-0.1829 to -0.0131) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0020 (-0.0154 to +0.0114) | -0.0031 (-0.0038 to -0.0024) | -0.0030 (-0.0277 to +0.0217) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3720 (-0.3958 to -0.3482) | -0.0227 (-0.0238 to -0.0216) | -0.0580 (-0.1013 to -0.0147) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0021 (+0.0016 to +0.0026) | -0.2260 (-0.3313 to -0.1207) | -0.0273 (-0.0290 to -0.0257) | -0.0555 (-0.1255 to +0.0145) | holds | holds | holds | holds |

#### interleave:revisitSlotCost-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0003 | -0.0007 to +0.0001 |  |  | +0.0050 (+0.0046 to +0.0054) | -0.3890 (-0.4116 to -0.3664) | -0.0374 (-0.0386 to -0.0362) | -0.0540 (-0.1088 to +0.0008) | holds | holds | holds | holds |
| single-subject-crammer | -0.0001 | -0.0007 to +0.0005 |  |  | -0.0004 (-0.0008 to +0.0001) | -0.5055 (-0.6871 to -0.3239) | -0.0176 (-0.0187 to -0.0164) | -0.1195 (-0.2322 to -0.0068) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0007 to +0.0002 |  |  | +0.0042 (+0.0036 to +0.0047) | -0.5175 (-0.6124 to -0.4226) | -0.0461 (-0.0477 to -0.0444) | -0.0565 (-0.1345 to +0.0215) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0002 to +0.0001 |  |  | -0.0035 (-0.0039 to -0.0032) | -0.0920 (-0.1133 to -0.0707) | -0.0066 (-0.0074 to -0.0057) | -0.0100 (-0.0408 to +0.0208) | holds | holds | holds | holds |
| wanderer | -0.0001 | -0.0004 to +0.0001 |  |  | +0.0025 (+0.0021 to +0.0030) | -0.3190 (-0.3420 to -0.2960) | -0.0255 (-0.0268 to -0.0243) | -0.0355 (-0.0796 to +0.0086) | holds | holds | holds | holds |
| lapsed-returner | +0.0002 | -0.0002 to +0.0007 |  |  | +0.0022 (+0.0016 to +0.0028) | -0.1475 (-0.2445 to -0.0505) | -0.0318 (-0.0335 to -0.0301) | +0.0040 (-0.0635 to +0.0715) | holds | holds | holds | holds |

#### interleave:revisitStopScale-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0003 | -0.0007 to +0.0000 |  |  | +0.0043 (+0.0040 to +0.0047) | -0.5720 (-0.5957 to -0.5483) | -0.0326 (-0.0336 to -0.0315) | -0.0900 (-0.1473 to -0.0327) | holds | holds | holds | holds |
| single-subject-crammer | -0.0000 | -0.0007 to +0.0006 |  |  | -0.0006 (-0.0009 to -0.0002) | -0.1865 (-0.3937 to +0.0207) | -0.0126 (-0.0137 to -0.0116) | -0.0690 (-0.1961 to +0.0581) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0008 to +0.0001 |  |  | +0.0052 (+0.0047 to +0.0056) | -0.6125 (-0.7247 to -0.5003) | -0.0384 (-0.0399 to -0.0370) | -0.1045 (-0.1914 to -0.0176) | holds | holds | holds | holds |
| returning-expert | -0.0000 | -0.0001 to +0.0001 |  |  | -0.0014 (-0.0017 to -0.0012) | +0.0170 (+0.0054 to +0.0286) | -0.0029 (-0.0036 to -0.0022) | +0.0070 (-0.0165 to +0.0305) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0004 to +0.0001 |  |  | +0.0020 (+0.0017 to +0.0024) | -0.3650 (-0.3891 to -0.3409) | -0.0209 (-0.0220 to -0.0199) | -0.0375 (-0.0769 to +0.0019) | holds | holds | holds | holds |
| lapsed-returner | -0.0004 | -0.0008 to +0.0000 |  |  | +0.0018 (+0.0013 to +0.0023) | -0.3390 (-0.4512 to -0.2268) | -0.0237 (-0.0252 to -0.0221) | -0.1120 (-0.1838 to -0.0402) | holds | holds | holds | holds |

#### interleave:revisitStopScale-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0000 | -0.0004 to +0.0004 |  |  | +0.0049 (+0.0045 to +0.0053) | -0.3390 (-0.3605 to -0.3175) | -0.0384 (-0.0396 to -0.0371) | -0.0300 (-0.0861 to +0.0261) | holds | holds | holds | holds |
| single-subject-crammer | +0.0003 | -0.0003 to +0.0009 |  |  | -0.0002 (-0.0006 to +0.0002) | -0.3270 (-0.5327 to -0.1213) | -0.0146 (-0.0157 to -0.0135) | -0.0280 (-0.1500 to +0.0940) | holds | holds | holds | holds |
| struggling-repeater | +0.0000 | -0.0005 to +0.0005 |  |  | +0.0034 (+0.0027 to +0.0040) | -0.3745 (-0.4737 to -0.2753) | -0.0495 (-0.0513 to -0.0477) | -0.0045 (-0.0861 to +0.0771) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0001 to +0.0002 |  |  | -0.0021 (-0.0024 to -0.0018) | -0.0320 (-0.0485 to -0.0155) | -0.0038 (-0.0046 to -0.0031) | +0.0160 (-0.0109 to +0.0429) | holds | holds | holds | holds |
| wanderer | -0.0001 | -0.0004 to +0.0002 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.2955 (-0.3180 to -0.2730) | -0.0263 (-0.0276 to -0.0251) | -0.0330 (-0.0781 to +0.0121) | holds | holds | holds | holds |
| lapsed-returner | +0.0002 | -0.0002 to +0.0007 |  |  | +0.0027 (+0.0020 to +0.0033) | -0.1150 (-0.2064 to -0.0236) | -0.0393 (-0.0412 to -0.0374) | +0.0135 (-0.0519 to +0.0789) | holds | holds | holds | holds |

#### interleave:slots-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0012 | +0.0006 to +0.0017 |  |  | +0.0098 (+0.0092 to +0.0104) | -0.0625 (-0.0737 to -0.0513) | -0.0562 (-0.0580 to -0.0545) | +0.1195 (+0.0744 to +0.1646) | holds | holds | holds | holds |
| single-subject-crammer | +0.0004 | -0.0000 to +0.0009 |  |  | -0.0010 (-0.0018 to -0.0003) | -0.0645 (-0.1587 to +0.0297) | -0.0330 (-0.0346 to -0.0315) | +0.0495 (-0.0168 to +0.1158) | holds | holds | holds | holds |
| struggling-repeater | +0.0012 | +0.0008 to +0.0017 |  |  | +0.0009 (+0.0001 to +0.0017) | -0.1480 (-0.1968 to -0.0992) | -0.0662 (-0.0683 to -0.0641) | +0.1640 (+0.1051 to +0.2229) | holds | holds | holds | holds |
| returning-expert | +0.0001 | -0.0003 to +0.0004 |  |  | +0.0013 (+0.0007 to +0.0020) | -0.0025 (-0.0047 to -0.0003) | -0.0213 (-0.0227 to -0.0199) | +0.0145 (-0.0293 to +0.0583) | holds | holds | holds | holds |
| wanderer | +0.0007 | +0.0003 to +0.0010 |  |  | +0.0033 (+0.0026 to +0.0039) | -0.0355 (-0.0436 to -0.0274) | -0.0483 (-0.0501 to -0.0466) | +0.0765 (+0.0312 to +0.1218) | holds | holds | holds | holds |
| lapsed-returner | +0.0007 | +0.0003 to +0.0012 |  |  | +0.0026 (+0.0018 to +0.0034) | -0.0195 (-0.0712 to +0.0322) | -0.0529 (-0.0550 to -0.0509) | +0.0925 (+0.0381 to +0.1469) | holds | holds | holds | holds |

#### interleave:slots-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0002 | -0.0001 to +0.0005 |  |  | +0.0021 (+0.0019 to +0.0024) | -0.2300 (-0.2518 to -0.2082) | -0.0246 (-0.0255 to -0.0237) | +0.0510 (-0.0038 to +0.1058) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0007 to +0.0011 |  |  | -0.0009 (-0.0016 to -0.0003) | -0.3090 (-0.7377 to +0.1197) | -0.0106 (-0.0116 to -0.0095) | -0.1150 (-0.3773 to +0.1473) | holds | holds | holds | holds |
| struggling-repeater | +0.0003 | -0.0003 to +0.0009 |  |  | +0.0031 (+0.0026 to +0.0035) | -0.4640 (-0.6411 to -0.2869) | -0.0336 (-0.0350 to -0.0323) | -0.0225 (-0.1502 to +0.1052) | holds | holds | holds | holds |
| returning-expert | +0.0000 | -0.0001 to +0.0001 |  |  | -0.0002 (-0.0003 to -0.0000) | -0.0100 (-0.0162 to -0.0038) | -0.0044 (-0.0049 to -0.0039) | +0.0095 (-0.0124 to +0.0314) | holds | holds | holds | holds |
| wanderer | +0.0000 | -0.0002 to +0.0002 |  |  | +0.0002 (-0.0000 to +0.0005) | -0.1040 (-0.1198 to -0.0882) | -0.0167 (-0.0176 to -0.0158) | -0.0050 (-0.0437 to +0.0337) | holds | holds | holds | holds |
| lapsed-returner | +0.0001 | -0.0005 to +0.0006 |  |  | +0.0010 (+0.0006 to +0.0014) | -0.4015 (-0.5790 to -0.2240) | -0.0201 (-0.0215 to -0.0186) | -0.0710 (-0.1716 to +0.0296) | holds | holds | holds | holds |

#### interleave:priorRateMult-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0003 | -0.0006 to +0.0001 |  |  | +0.0043 (+0.0040 to +0.0047) | -0.4990 (-0.5228 to -0.4752) | -0.0341 (-0.0352 to -0.0330) | -0.0735 (-0.1301 to -0.0169) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0011 to +0.0001 |  |  | -0.0004 (-0.0007 to +0.0000) | -0.4035 (-0.6081 to -0.1989) | -0.0130 (-0.0141 to -0.0119) | -0.1645 (-0.2902 to -0.0388) | holds | holds | holds | holds |
| struggling-repeater | -0.0003 | -0.0007 to +0.0002 |  |  | +0.0048 (+0.0043 to +0.0054) | -0.5355 (-0.6455 to -0.4255) | -0.0428 (-0.0443 to -0.0413) | -0.0985 (-0.1834 to -0.0136) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0001 |  |  | -0.0015 (-0.0017 to -0.0012) | -0.0020 (-0.0154 to +0.0114) | -0.0031 (-0.0038 to -0.0024) | -0.0030 (-0.0277 to +0.0217) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0005 to +0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3720 (-0.3958 to -0.3482) | -0.0227 (-0.0238 to -0.0216) | -0.0565 (-0.0998 to -0.0132) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0006 to +0.0003 |  |  | +0.0021 (+0.0016 to +0.0026) | -0.2260 (-0.3313 to -0.1207) | -0.0273 (-0.0290 to -0.0257) | -0.0545 (-0.1245 to +0.0155) | holds | holds | holds | holds |

#### interleave:priorRateMult-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0043 (+0.0040 to +0.0047) | -0.4980 (-0.5217 to -0.4743) | -0.0343 (-0.0354 to -0.0332) | -0.0705 (-0.1272 to -0.0138) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0013 to +0.0000 |  |  | -0.0004 (-0.0007 to +0.0000) | -0.4145 (-0.6197 to -0.2093) | -0.0130 (-0.0140 to -0.0119) | -0.1780 (-0.3037 to -0.0523) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0002 |  |  | +0.0048 (+0.0043 to +0.0053) | -0.5340 (-0.6439 to -0.4241) | -0.0428 (-0.0444 to -0.0413) | -0.0955 (-0.1803 to -0.0107) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0014 (-0.0017 to -0.0012) | -0.0030 (-0.0164 to +0.0104) | -0.0031 (-0.0038 to -0.0024) | -0.0040 (-0.0288 to +0.0208) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3720 (-0.3958 to -0.3482) | -0.0227 (-0.0238 to -0.0216) | -0.0560 (-0.0993 to -0.0127) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0021 (+0.0016 to +0.0027) | -0.2325 (-0.3380 to -0.1270) | -0.0273 (-0.0290 to -0.0257) | -0.0580 (-0.1286 to +0.0126) | holds | holds | holds | holds |

#### interleave:priorRateMult-outer: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0003 | -0.0006 to +0.0001 |  |  | +0.0043 (+0.0040 to +0.0047) | -0.5015 (-0.5253 to -0.4777) | -0.0344 (-0.0355 to -0.0333) | -0.0785 (-0.1353 to -0.0217) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0013 to +0.0000 |  |  | -0.0003 (-0.0007 to +0.0000) | -0.4220 (-0.6277 to -0.2163) | -0.0131 (-0.0142 to -0.0120) | -0.1755 (-0.3020 to -0.0490) | holds | holds | holds | holds |
| struggling-repeater | -0.0002 | -0.0007 to +0.0002 |  |  | +0.0048 (+0.0043 to +0.0054) | -0.5380 (-0.6479 to -0.4281) | -0.0429 (-0.0444 to -0.0413) | -0.0975 (-0.1825 to -0.0125) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0002 to +0.0000 |  |  | -0.0014 (-0.0017 to -0.0011) | -0.0045 (-0.0180 to +0.0090) | -0.0031 (-0.0038 to -0.0024) | -0.0035 (-0.0284 to +0.0214) | holds | holds | holds | holds |
| wanderer | -0.0003 | -0.0005 to -0.0000 |  |  | +0.0022 (+0.0018 to +0.0026) | -0.3760 (-0.3999 to -0.3521) | -0.0228 (-0.0239 to -0.0216) | -0.0580 (-0.1014 to -0.0146) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0007 to +0.0003 |  |  | +0.0021 (+0.0016 to +0.0026) | -0.2375 (-0.3431 to -0.1319) | -0.0274 (-0.0290 to -0.0257) | -0.0585 (-0.1293 to +0.0123) | holds | holds | holds | holds |

#### interleave:price-corner: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0012 | +0.0007 to +0.0018 |  |  | +0.0101 (+0.0095 to +0.0107) | -0.0575 (-0.0684 to -0.0466) | -0.0591 (-0.0609 to -0.0573) | +0.1255 (+0.0802 to +0.1708) | holds | holds | holds | holds |
| single-subject-crammer | +0.0006 | +0.0001 to +0.0011 |  |  | -0.0015 (-0.0022 to -0.0008) | +0.0000 (-0.0908 to +0.0908) | -0.0348 (-0.0364 to -0.0332) | +0.0750 (+0.0108 to +0.1392) | holds | holds | holds | holds |
| struggling-repeater | +0.0014 | +0.0009 to +0.0019 |  |  | +0.0015 (+0.0007 to +0.0024) | -0.1520 (-0.1993 to -0.1047) | -0.0699 (-0.0721 to -0.0677) | +0.1665 (+0.1083 to +0.2247) | holds | holds | holds | holds |
| returning-expert | +0.0001 | -0.0003 to +0.0005 |  |  | +0.0023 (+0.0016 to +0.0030) | -0.0020 (-0.0040 to -0.0000) | -0.0246 (-0.0261 to -0.0231) | +0.0190 (-0.0260 to +0.0640) | holds | holds | holds | holds |
| wanderer | +0.0010 | +0.0006 to +0.0014 |  |  | +0.0034 (+0.0027 to +0.0042) | -0.0405 (-0.0494 to -0.0316) | -0.0530 (-0.0548 to -0.0511) | +0.1115 (+0.0656 to +0.1574) | holds | holds | holds | holds |
| lapsed-returner | +0.0007 | +0.0003 to +0.0012 |  |  | +0.0030 (+0.0021 to +0.0039) | -0.0095 (-0.0558 to +0.0368) | -0.0587 (-0.0610 to -0.0564) | +0.1030 (+0.0510 to +0.1550) | holds | holds | holds | holds |

### gam-session-v3-edpbase+fixed: FAIL
| cell | wins | harmed | guardrail fails | beats | Δ by persona (lo, hi) |
|---|---|---|---|---|---|
| interleave:base | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.001 (-0.000, +0.002); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.001 (-0.002, -0.001) |
| interleave:forgetScale-low | 0 | – | struggling-repeater:G2 | **no** | curious -0.005 (-0.006, -0.003); single +0.001 (+0.000, +0.003); struggling -0.005 (-0.006, -0.004); returning +0.002 (+0.001, +0.003); wanderer -0.002 (-0.003, -0.001); lapsed -0.002 (-0.003, -0.001) |
| interleave:forgetScale-high | 0 | – | struggling-repeater:G2 | **no** | curious -0.002 (-0.002, -0.001); single -0.000 (-0.001, +0.000); struggling -0.001 (-0.001, -0.001); returning +0.000 (+0.000, +0.001); wanderer -0.001 (-0.001, -0.001); lapsed -0.001 (-0.001, -0.000) |
| interleave:forgetShape-low | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.001 (+0.000, +0.002); struggling -0.003 (-0.004, -0.002); returning +0.002 (+0.001, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.001 (-0.002, -0.001) |
| interleave:forgetShape-high | 0 | – | struggling-repeater:G2 | **no** | curious -0.002 (-0.003, -0.001); single -0.000 (-0.001, +0.000); struggling -0.002 (-0.003, -0.001); returning +0.000 (-0.000, +0.001); wanderer -0.002 (-0.002, -0.001); lapsed -0.001 (-0.002, -0.000) |
| interleave:kSpread-low | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.000 (-0.000, +0.001); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.002 (-0.002, -0.001); lapsed -0.001 (-0.002, -0.001) |
| interleave:kSpread-high | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.001 (-0.000, +0.002); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.001 (-0.002, -0.001) |
| interleave:revisitStrengthen-low | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.001 (-0.000, +0.002); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.001 (-0.002, -0.001) |
| interleave:revisitStrengthen-high | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.001 (-0.000, +0.002); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.001 (-0.002, -0.001) |
| interleave:relearn-low | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.001 (-0.000, +0.002); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.001 (-0.002, -0.001) |
| interleave:relearn-high | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.001 (-0.000, +0.002); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.001 (-0.002, -0.001) |
| interleave:priorKnowledgeMean-low | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single -0.000 (-0.001, +0.001); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.000, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.002 (-0.003, -0.001) |
| interleave:priorKnowledgeMean-high | 0 | – | – | **no** | curious -0.002 (-0.003, -0.001); single +0.001 (+0.000, +0.002); struggling -0.002 (-0.003, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.001 (-0.002, -0.000); lapsed -0.001 (-0.001, +0.000) |
| interleave:learnRate-low | 0 | – | struggling-repeater:G2 | **no** | curious -0.001 (-0.002, +0.000); single -0.000 (-0.001, +0.000); struggling -0.001 (-0.001, +0.000); returning +0.001 (+0.000, +0.001); wanderer -0.001 (-0.001, +0.000); lapsed -0.000 (-0.001, +0.001) |
| interleave:learnRate-high | 0 | – | – | **no** | curious -0.007 (-0.008, -0.006); single +0.001 (-0.000, +0.002); struggling -0.005 (-0.006, -0.004); returning +0.003 (+0.002, +0.003); wanderer -0.004 (-0.004, -0.003); lapsed -0.003 (-0.004, -0.002) |
| interleave:prereqPenalty-low | 0 | – | struggling-repeater:G2 | **no** | curious -0.007 (-0.008, -0.006); single -0.001 (-0.002, -0.001); struggling -0.006 (-0.007, -0.006); returning +0.001 (+0.000, +0.001); wanderer -0.004 (-0.005, -0.004); lapsed -0.004 (-0.005, -0.003) |
| interleave:prereqPenalty-high | 0 | – | struggling-repeater:G2 | **no** | curious +0.004 (+0.003, +0.005); single +0.004 (+0.004, +0.005); struggling +0.003 (+0.002, +0.004); returning +0.003 (+0.002, +0.004); wanderer +0.003 (+0.002, +0.003); lapsed +0.003 (+0.002, +0.004) |
| interleave:pullScale-low | 0 | – | – | **no** | curious -0.002 (-0.003, -0.001); single +0.002 (+0.001, +0.003); struggling -0.002 (-0.002, -0.001); returning +0.002 (+0.001, +0.003); wanderer -0.000 (-0.001, +0.001); lapsed +0.000 (-0.001, +0.001) |
| interleave:pullScale-high | 0 | – | struggling-repeater:G2 | **no** | curious -0.004 (-0.005, -0.003); single -0.000 (-0.001, +0.000); struggling -0.004 (-0.005, -0.003); returning +0.001 (+0.000, +0.002); wanderer -0.002 (-0.003, -0.002); lapsed -0.002 (-0.003, -0.001) |
| interleave:revisitSlotCost-low | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.001 (-0.000, +0.002); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.001 (-0.002, -0.001) |
| interleave:revisitSlotCost-high | 0 | – | struggling-repeater:G2 | **no** | curious -0.004 (-0.005, -0.003); single -0.001 (-0.002, -0.000); struggling -0.002 (-0.003, -0.002); returning +0.001 (+0.000, +0.002); wanderer -0.001 (-0.002, -0.000); lapsed -0.001 (-0.002, +0.000) |
| interleave:revisitStopScale-low | 0 | – | – | **no** | curious -0.003 (-0.004, -0.002); single +0.001 (+0.000, +0.002); struggling -0.003 (-0.004, -0.002); returning +0.002 (+0.001, +0.002); wanderer -0.001 (-0.002, -0.000); lapsed -0.002 (-0.002, -0.001) |
| interleave:revisitStopScale-high | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.000 (-0.001, +0.001); struggling -0.002 (-0.003, -0.001); returning +0.001 (+0.001, +0.002); wanderer -0.001 (-0.002, -0.000); lapsed +0.000 (-0.001, +0.001) |
| interleave:slots-low | 0 | – | single-subject-crammer:G2, struggling-repeater:G2 | **no** | curious -0.002 (-0.003, -0.001); single -0.000 (-0.001, +0.000); struggling -0.001 (-0.002, -0.000); returning -0.000 (-0.001, +0.000); wanderer +0.000 (-0.001, +0.001); lapsed +0.001 (-0.000, +0.002) |
| interleave:slots-high | 0 | – | – | **no** | curious -0.000 (-0.001, +0.000); single +0.000 (-0.001, +0.001); struggling -0.001 (-0.002, -0.000); returning +0.000 (-0.000, +0.001); wanderer -0.000 (-0.001, +0.000); lapsed -0.001 (-0.002, -0.000) |
| interleave:priorRateMult-low | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.001 (-0.000, +0.002); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.001 (-0.002, -0.001) |
| interleave:priorRateMult-high | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.000 (-0.000, +0.001); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.002 (-0.002, -0.001) |
| interleave:priorRateMult-outer | 0 | – | struggling-repeater:G2 | **no** | curious -0.003 (-0.004, -0.002); single +0.000 (-0.001, +0.001); struggling -0.003 (-0.004, -0.002); returning +0.001 (+0.001, +0.002); wanderer -0.002 (-0.003, -0.001); lapsed -0.002 (-0.003, -0.001) |
| interleave:price-corner | 0 | – | curious-newcomer:G2, struggling-repeater:G2 | **no** | curious -0.002 (-0.004, -0.001); single -0.000 (-0.001, +0.001); struggling -0.001 (-0.002, -0.000); returning -0.000 (-0.001, +0.000); wanderer +0.000 (-0.001, +0.001); lapsed +0.000 (-0.001, +0.001) |

#### interleave:base: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0033 | -0.0042 to -0.0023 |  |  | +0.0377 (+0.0366 to +0.0387) | -3.0110 (-3.0557 to -2.9663) | -0.1418 (-0.1438 to -0.1399) | -0.5545 (-0.6941 to -0.4149) | holds | holds | holds | holds |
| single-subject-crammer | +0.0007 | -0.0001 to +0.0016 |  |  | +0.0281 (+0.0271 to +0.0292) | -1.8500 (-2.0752 to -1.6248) | -0.1195 (-0.1212 to -0.1179) | +0.2035 (+0.0225 to +0.3845) | holds | holds | holds | holds |
| struggling-repeater | -0.0030 | -0.0038 to -0.0021 |  |  | +0.0403 (+0.0390 to +0.0415) | -3.1875 (-3.3023 to -3.0727) | -0.1612 (-0.1636 to -0.1589) | -0.6885 (-0.8327 to -0.5443) | holds | **fails** | holds | holds |
| returning-expert | +0.0014 | +0.0008 to +0.0021 |  |  | +0.0274 (+0.0264 to +0.0284) | -0.0210 (-0.0689 to +0.0269) | -0.0891 (-0.0906 to -0.0875) | +0.3605 (+0.2391 to +0.4819) | holds | holds | holds | holds |
| wanderer | -0.0018 | -0.0025 to -0.0010 |  |  | +0.0387 (+0.0374 to +0.0399) | -2.3465 (-2.3966 to -2.2964) | -0.1361 (-0.1381 to -0.1341) | -0.2845 (-0.4223 to -0.1467) | holds | holds | holds | holds |
| lapsed-returner | -0.0014 | -0.0022 to -0.0006 |  |  | +0.0414 (+0.0399 to +0.0429) | -2.2805 (-2.3991 to -2.1619) | -0.1726 (-0.1753 to -0.1698) | -0.2670 (-0.4064 to -0.1276) | holds | holds | holds | holds |

#### interleave:forgetScale-low: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0047 | -0.0059 to -0.0034 |  |  | +0.0371 (+0.0360 to +0.0381) | -2.9570 (-3.0018 to -2.9122) | -0.1403 (-0.1423 to -0.1384) | -0.5460 (-0.6832 to -0.4088) | holds | holds | holds | holds |
| single-subject-crammer | +0.0014 | +0.0003 to +0.0026 |  |  | +0.0272 (+0.0262 to +0.0283) | -1.7910 (-2.0205 to -1.5615) | -0.1178 (-0.1194 to -0.1162) | +0.2285 (+0.0459 to +0.4111) | holds | holds | holds | holds |
| struggling-repeater | -0.0051 | -0.0063 to -0.0039 |  |  | +0.0395 (+0.0382 to +0.0407) | -3.1835 (-3.2985 to -3.0685) | -0.1603 (-0.1626 to -0.1579) | -0.7345 (-0.8792 to -0.5898) | holds | **fails** | holds | holds |
| returning-expert | +0.0020 | +0.0012 to +0.0028 |  |  | +0.0271 (+0.0261 to +0.0281) | -0.0075 (-0.0551 to +0.0401) | -0.0887 (-0.0903 to -0.0872) | +0.3545 (+0.2319 to +0.4771) | holds | holds | holds | holds |
| wanderer | -0.0024 | -0.0034 to -0.0013 |  |  | +0.0378 (+0.0366 to +0.0391) | -2.3025 (-2.3531 to -2.2519) | -0.1350 (-0.1370 to -0.1330) | -0.3040 (-0.4420 to -0.1660) | holds | holds | holds | holds |
| lapsed-returner | -0.0021 | -0.0032 to -0.0010 |  |  | +0.0410 (+0.0395 to +0.0425) | -2.2845 (-2.4039 to -2.1651) | -0.1709 (-0.1737 to -0.1681) | -0.2790 (-0.4180 to -0.1400) | holds | holds | holds | holds |

#### interleave:forgetScale-high: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0016 | -0.0021 to -0.0011 |  |  | +0.0392 (+0.0381 to +0.0403) | -3.0985 (-3.1428 to -3.0542) | -0.1442 (-0.1462 to -0.1423) | -0.6165 (-0.7585 to -0.4745) | holds | holds | holds | holds |
| single-subject-crammer | -0.0002 | -0.0006 to +0.0002 |  |  | +0.0291 (+0.0280 to +0.0301) | -1.9890 (-2.2138 to -1.7642) | -0.1219 (-0.1235 to -0.1202) | +0.1600 (-0.0196 to +0.3396) | holds | holds | holds | holds |
| struggling-repeater | -0.0011 | -0.0014 to -0.0007 |  |  | +0.0406 (+0.0393 to +0.0418) | -3.2205 (-3.3331 to -3.1079) | -0.1624 (-0.1647 to -0.1601) | -0.7055 (-0.8486 to -0.5624) | holds | **fails** | holds | holds |
| returning-expert | +0.0004 | +0.0000 to +0.0008 |  |  | +0.0282 (+0.0272 to +0.0292) | -0.0575 (-0.1051 to -0.0099) | -0.0903 (-0.0918 to -0.0887) | +0.3270 (+0.2044 to +0.4496) | holds | holds | holds | holds |
| wanderer | -0.0010 | -0.0014 to -0.0006 |  |  | +0.0395 (+0.0383 to +0.0408) | -2.3935 (-2.4435 to -2.3435) | -0.1385 (-0.1405 to -0.1364) | -0.3065 (-0.4437 to -0.1693) | holds | holds | holds | holds |
| lapsed-returner | -0.0007 | -0.0011 to -0.0003 |  |  | +0.0426 (+0.0411 to +0.0441) | -2.3380 (-2.4562 to -2.2198) | -0.1743 (-0.1771 to -0.1715) | -0.3180 (-0.4587 to -0.1773) | holds | holds | holds | holds |

#### interleave:forgetShape-low: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0034 | -0.0044 to -0.0024 |  |  | +0.0376 (+0.0366 to +0.0387) | -3.0080 (-3.0526 to -2.9634) | -0.1418 (-0.1437 to -0.1399) | -0.5540 (-0.6937 to -0.4143) | holds | holds | holds | holds |
| single-subject-crammer | +0.0009 | +0.0001 to +0.0018 |  |  | +0.0281 (+0.0270 to +0.0291) | -1.8290 (-2.0540 to -1.6040) | -0.1195 (-0.1211 to -0.1178) | +0.2240 (+0.0430 to +0.4050) | holds | holds | holds | holds |
| struggling-repeater | -0.0031 | -0.0039 to -0.0022 |  |  | +0.0402 (+0.0390 to +0.0415) | -3.1880 (-3.3025 to -3.0735) | -0.1612 (-0.1636 to -0.1589) | -0.6905 (-0.8349 to -0.5461) | holds | **fails** | holds | holds |
| returning-expert | +0.0015 | +0.0009 to +0.0022 |  |  | +0.0273 (+0.0263 to +0.0284) | -0.0180 (-0.0658 to +0.0298) | -0.0891 (-0.0906 to -0.0875) | +0.3595 (+0.2381 to +0.4809) | holds | holds | holds | holds |
| wanderer | -0.0018 | -0.0026 to -0.0010 |  |  | +0.0386 (+0.0373 to +0.0398) | -2.3440 (-2.3941 to -2.2939) | -0.1360 (-0.1381 to -0.1340) | -0.2850 (-0.4226 to -0.1474) | holds | holds | holds | holds |
| lapsed-returner | -0.0014 | -0.0022 to -0.0006 |  |  | +0.0412 (+0.0397 to +0.0427) | -2.2780 (-2.3965 to -2.1595) | -0.1725 (-0.1752 to -0.1697) | -0.2600 (-0.3996 to -0.1204) | holds | holds | holds | holds |

#### interleave:forgetShape-high: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0021 | -0.0030 to -0.0013 |  |  | +0.0378 (+0.0367 to +0.0389) | -3.0200 (-3.0645 to -2.9755) | -0.1423 (-0.1442 to -0.1403) | -0.5555 (-0.6951 to -0.4159) | holds | holds | holds | holds |
| single-subject-crammer | -0.0004 | -0.0011 to +0.0004 |  |  | +0.0282 (+0.0271 to +0.0292) | -1.8855 (-2.1116 to -1.6594) | -0.1201 (-0.1217 to -0.1184) | +0.1815 (+0.0007 to +0.3623) | holds | holds | holds | holds |
| struggling-repeater | -0.0020 | -0.0027 to -0.0013 |  |  | +0.0400 (+0.0387 to +0.0413) | -3.2105 (-3.3243 to -3.0967) | -0.1615 (-0.1639 to -0.1592) | -0.7025 (-0.8454 to -0.5596) | holds | **fails** | holds | holds |
| returning-expert | +0.0005 | -0.0001 to +0.0011 |  |  | +0.0277 (+0.0266 to +0.0287) | -0.0285 (-0.0762 to +0.0192) | -0.0893 (-0.0909 to -0.0878) | +0.3540 (+0.2322 to +0.4758) | holds | holds | holds | holds |
| wanderer | -0.0017 | -0.0023 to -0.0010 |  |  | +0.0388 (+0.0375 to +0.0400) | -2.3580 (-2.4083 to -2.3077) | -0.1366 (-0.1386 to -0.1345) | -0.2875 (-0.4255 to -0.1495) | holds | holds | holds | holds |
| lapsed-returner | -0.0010 | -0.0017 to -0.0003 |  |  | +0.0416 (+0.0401 to +0.0431) | -2.2985 (-2.4183 to -2.1787) | -0.1732 (-0.1760 to -0.1704) | -0.2660 (-0.4065 to -0.1255) | holds | holds | holds | holds |

#### interleave:kSpread-low: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0033 | -0.0042 to -0.0024 |  |  | +0.0375 (+0.0364 to +0.0385) | -2.9950 (-3.0398 to -2.9502) | -0.1419 (-0.1439 to -0.1400) | -0.5580 (-0.6975 to -0.4185) | holds | holds | holds | holds |
| single-subject-crammer | +0.0005 | -0.0004 to +0.0013 |  |  | +0.0280 (+0.0269 to +0.0291) | -1.8870 (-2.1113 to -1.6627) | -0.1193 (-0.1209 to -0.1176) | +0.1675 (-0.0125 to +0.3475) | holds | holds | holds | holds |
| struggling-repeater | -0.0030 | -0.0038 to -0.0022 |  |  | +0.0405 (+0.0392 to +0.0418) | -3.1905 (-3.3060 to -3.0750) | -0.1613 (-0.1637 to -0.1590) | -0.6730 (-0.8173 to -0.5287) | holds | **fails** | holds | holds |
| returning-expert | +0.0014 | +0.0008 to +0.0021 |  |  | +0.0274 (+0.0264 to +0.0284) | -0.0175 (-0.0651 to +0.0301) | -0.0891 (-0.0906 to -0.0875) | +0.3605 (+0.2388 to +0.4822) | holds | holds | holds | holds |
| wanderer | -0.0017 | -0.0025 to -0.0009 |  |  | +0.0386 (+0.0374 to +0.0399) | -2.3420 (-2.3924 to -2.2916) | -0.1362 (-0.1382 to -0.1342) | -0.2860 (-0.4235 to -0.1485) | holds | holds | holds | holds |
| lapsed-returner | -0.0013 | -0.0021 to -0.0005 |  |  | +0.0410 (+0.0395 to +0.0425) | -2.2820 (-2.4013 to -2.1627) | -0.1727 (-0.1755 to -0.1699) | -0.2740 (-0.4158 to -0.1322) | holds | holds | holds | holds |

#### interleave:kSpread-high: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0034 | -0.0045 to -0.0024 |  |  | +0.0380 (+0.0370 to +0.0391) | -3.0120 (-3.0566 to -2.9674) | -0.1420 (-0.1439 to -0.1401) | -0.5495 (-0.6896 to -0.4094) | holds | holds | holds | holds |
| single-subject-crammer | +0.0008 | -0.0001 to +0.0017 |  |  | +0.0281 (+0.0271 to +0.0292) | -1.8740 (-2.1001 to -1.6479) | -0.1198 (-0.1215 to -0.1182) | +0.2045 (+0.0224 to +0.3866) | holds | holds | holds | holds |
| struggling-repeater | -0.0030 | -0.0039 to -0.0020 |  |  | +0.0402 (+0.0390 to +0.0415) | -3.1975 (-3.3120 to -3.0830) | -0.1616 (-0.1639 to -0.1592) | -0.6975 (-0.8411 to -0.5539) | holds | **fails** | holds | holds |
| returning-expert | +0.0014 | +0.0008 to +0.0021 |  |  | +0.0273 (+0.0263 to +0.0284) | -0.0240 (-0.0716 to +0.0236) | -0.0890 (-0.0906 to -0.0875) | +0.3595 (+0.2378 to +0.4812) | holds | holds | holds | holds |
| wanderer | -0.0019 | -0.0027 to -0.0010 |  |  | +0.0386 (+0.0374 to +0.0398) | -2.3485 (-2.3989 to -2.2981) | -0.1363 (-0.1383 to -0.1342) | -0.2880 (-0.4255 to -0.1505) | holds | holds | holds | holds |
| lapsed-returner | -0.0014 | -0.0023 to -0.0006 |  |  | +0.0416 (+0.0401 to +0.0431) | -2.2800 (-2.3978 to -2.1622) | -0.1723 (-0.1751 to -0.1696) | -0.2630 (-0.4026 to -0.1234) | holds | holds | holds | holds |

#### interleave:revisitStrengthen-low: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0033 | -0.0043 to -0.0023 |  |  | +0.0377 (+0.0367 to +0.0388) | -3.0120 (-3.0566 to -2.9674) | -0.1419 (-0.1438 to -0.1400) | -0.5610 (-0.7003 to -0.4217) | holds | holds | holds | holds |
| single-subject-crammer | +0.0007 | -0.0002 to +0.0015 |  |  | +0.0281 (+0.0270 to +0.0291) | -1.8465 (-2.0731 to -1.6199) | -0.1195 (-0.1212 to -0.1179) | +0.2040 (+0.0230 to +0.3850) | holds | holds | holds | holds |
| struggling-repeater | -0.0030 | -0.0038 to -0.0022 |  |  | +0.0404 (+0.0391 to +0.0416) | -3.1825 (-3.2978 to -3.0672) | -0.1613 (-0.1636 to -0.1589) | -0.6885 (-0.8331 to -0.5439) | holds | **fails** | holds | holds |
| returning-expert | +0.0014 | +0.0008 to +0.0021 |  |  | +0.0274 (+0.0264 to +0.0285) | -0.0220 (-0.0699 to +0.0259) | -0.0891 (-0.0906 to -0.0875) | +0.3585 (+0.2371 to +0.4799) | holds | holds | holds | holds |
| wanderer | -0.0017 | -0.0025 to -0.0010 |  |  | +0.0387 (+0.0374 to +0.0399) | -2.3470 (-2.3972 to -2.2968) | -0.1361 (-0.1381 to -0.1341) | -0.2850 (-0.4229 to -0.1471) | holds | holds | holds | holds |
| lapsed-returner | -0.0014 | -0.0022 to -0.0006 |  |  | +0.0413 (+0.0398 to +0.0429) | -2.2835 (-2.4022 to -2.1648) | -0.1725 (-0.1753 to -0.1697) | -0.2605 (-0.3999 to -0.1211) | holds | holds | holds | holds |

#### interleave:revisitStrengthen-high: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0033 | -0.0042 to -0.0023 |  |  | +0.0377 (+0.0366 to +0.0387) | -3.0105 (-3.0552 to -2.9658) | -0.1418 (-0.1437 to -0.1399) | -0.5510 (-0.6906 to -0.4114) | holds | holds | holds | holds |
| single-subject-crammer | +0.0007 | -0.0001 to +0.0016 |  |  | +0.0281 (+0.0271 to +0.0292) | -1.8510 (-2.0766 to -1.6254) | -0.1195 (-0.1212 to -0.1179) | +0.2060 (+0.0249 to +0.3871) | holds | holds | holds | holds |
| struggling-repeater | -0.0030 | -0.0038 to -0.0022 |  |  | +0.0402 (+0.0390 to +0.0415) | -3.1850 (-3.3000 to -3.0700) | -0.1612 (-0.1636 to -0.1589) | -0.6930 (-0.8372 to -0.5488) | holds | **fails** | holds | holds |
| returning-expert | +0.0014 | +0.0008 to +0.0021 |  |  | +0.0274 (+0.0264 to +0.0284) | -0.0210 (-0.0689 to +0.0269) | -0.0891 (-0.0906 to -0.0875) | +0.3600 (+0.2386 to +0.4814) | holds | holds | holds | holds |
| wanderer | -0.0017 | -0.0025 to -0.0010 |  |  | +0.0387 (+0.0374 to +0.0399) | -2.3475 (-2.3976 to -2.2974) | -0.1361 (-0.1381 to -0.1341) | -0.2830 (-0.4208 to -0.1452) | holds | holds | holds | holds |
| lapsed-returner | -0.0013 | -0.0021 to -0.0005 |  |  | +0.0413 (+0.0398 to +0.0428) | -2.2760 (-2.3945 to -2.1575) | -0.1726 (-0.1754 to -0.1698) | -0.2625 (-0.4017 to -0.1233) | holds | holds | holds | holds |

#### interleave:relearn-low: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0032 | -0.0042 to -0.0023 |  |  | +0.0379 (+0.0368 to +0.0389) | -3.0100 (-3.0548 to -2.9652) | -0.1417 (-0.1436 to -0.1398) | -0.5595 (-0.6998 to -0.4192) | holds | holds | holds | holds |
| single-subject-crammer | +0.0007 | -0.0001 to +0.0016 |  |  | +0.0282 (+0.0271 to +0.0292) | -1.8535 (-2.0801 to -1.6269) | -0.1195 (-0.1211 to -0.1178) | +0.2100 (+0.0284 to +0.3916) | holds | holds | holds | holds |
| struggling-repeater | -0.0030 | -0.0038 to -0.0022 |  |  | +0.0403 (+0.0390 to +0.0415) | -3.1945 (-3.3087 to -3.0803) | -0.1611 (-0.1634 to -0.1587) | -0.6855 (-0.8293 to -0.5417) | holds | **fails** | holds | holds |
| returning-expert | +0.0014 | +0.0008 to +0.0021 |  |  | +0.0273 (+0.0263 to +0.0283) | -0.0205 (-0.0684 to +0.0274) | -0.0890 (-0.0906 to -0.0875) | +0.3605 (+0.2392 to +0.4818) | holds | holds | holds | holds |
| wanderer | -0.0018 | -0.0026 to -0.0010 |  |  | +0.0386 (+0.0374 to +0.0399) | -2.3490 (-2.3990 to -2.2990) | -0.1361 (-0.1382 to -0.1341) | -0.2880 (-0.4260 to -0.1500) | holds | holds | holds | holds |
| lapsed-returner | -0.0014 | -0.0023 to -0.0006 |  |  | +0.0413 (+0.0398 to +0.0428) | -2.2900 (-2.4089 to -2.1711) | -0.1726 (-0.1754 to -0.1698) | -0.2860 (-0.4259 to -0.1461) | holds | holds | holds | holds |

#### interleave:relearn-high: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0034 | -0.0043 to -0.0024 |  |  | +0.0375 (+0.0365 to +0.0386) | -3.0125 (-3.0571 to -2.9679) | -0.1418 (-0.1438 to -0.1399) | -0.5780 (-0.7170 to -0.4390) | holds | holds | holds | holds |
| single-subject-crammer | +0.0008 | -0.0001 to +0.0016 |  |  | +0.0282 (+0.0271 to +0.0292) | -1.8350 (-2.0600 to -1.6100) | -0.1196 (-0.1213 to -0.1180) | +0.2175 (+0.0366 to +0.3984) | holds | holds | holds | holds |
| struggling-repeater | -0.0032 | -0.0040 to -0.0024 |  |  | +0.0403 (+0.0390 to +0.0416) | -3.2080 (-3.3227 to -3.0933) | -0.1612 (-0.1636 to -0.1589) | -0.7200 (-0.8645 to -0.5755) | holds | **fails** | holds | holds |
| returning-expert | +0.0014 | +0.0008 to +0.0021 |  |  | +0.0274 (+0.0264 to +0.0284) | -0.0195 (-0.0674 to +0.0284) | -0.0890 (-0.0906 to -0.0875) | +0.3620 (+0.2405 to +0.4835) | holds | holds | holds | holds |
| wanderer | -0.0018 | -0.0026 to -0.0010 |  |  | +0.0387 (+0.0375 to +0.0399) | -2.3460 (-2.3962 to -2.2958) | -0.1362 (-0.1382 to -0.1342) | -0.2970 (-0.4348 to -0.1592) | holds | holds | holds | holds |
| lapsed-returner | -0.0015 | -0.0023 to -0.0006 |  |  | +0.0415 (+0.0400 to +0.0430) | -2.2875 (-2.4061 to -2.1689) | -0.1724 (-0.1752 to -0.1696) | -0.2800 (-0.4196 to -0.1404) | holds | holds | holds | holds |

#### interleave:priorKnowledgeMean-low: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0033 | -0.0043 to -0.0023 |  |  | +0.0382 (+0.0372 to +0.0393) | -3.2205 (-3.2654 to -3.1756) | -0.1441 (-0.1460 to -0.1423) | -0.5800 (-0.7213 to -0.4387) | holds | holds | holds | holds |
| single-subject-crammer | -0.0001 | -0.0010 to +0.0008 |  |  | +0.0294 (+0.0284 to +0.0305) | -1.9590 (-2.1820 to -1.7360) | -0.1251 (-0.1267 to -0.1235) | -0.0200 (-0.2090 to +0.1690) | holds | holds | holds | holds |
| struggling-repeater | -0.0029 | -0.0037 to -0.0021 |  |  | +0.0399 (+0.0387 to +0.0411) | -3.2095 (-3.3173 to -3.1017) | -0.1611 (-0.1634 to -0.1588) | -0.6655 (-0.8089 to -0.5221) | holds | **fails** | holds | holds |
| returning-expert | +0.0012 | +0.0005 to +0.0018 |  |  | +0.0297 (+0.0287 to +0.0307) | -0.3490 (-0.3968 to -0.3012) | -0.0967 (-0.0983 to -0.0951) | +0.3220 (+0.1898 to +0.4542) | holds | holds | holds | holds |
| wanderer | -0.0020 | -0.0028 to -0.0012 |  |  | +0.0400 (+0.0388 to +0.0412) | -2.6195 (-2.6688 to -2.5702) | -0.1413 (-0.1433 to -0.1394) | -0.3715 (-0.5073 to -0.2357) | holds | holds | holds | holds |
| lapsed-returner | -0.0023 | -0.0031 to -0.0014 |  |  | +0.0416 (+0.0402 to +0.0431) | -2.5860 (-2.7017 to -2.4703) | -0.1737 (-0.1764 to -0.1710) | -0.4155 (-0.5582 to -0.2728) | holds | holds | holds | holds |

#### interleave:priorKnowledgeMean-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0021 | -0.0030 to -0.0012 |  |  | +0.0357 (+0.0347 to +0.0368) | -2.4470 (-2.4907 to -2.4033) | -0.1313 (-0.1333 to -0.1292) | -0.3705 (-0.5015 to -0.2395) | holds | holds | holds | holds |
| single-subject-crammer | +0.0010 | +0.0003 to +0.0018 |  |  | +0.0208 (+0.0197 to +0.0218) | -1.0800 (-1.3031 to -0.8569) | -0.1076 (-0.1093 to -0.1060) | +0.2975 (+0.1400 to +0.4550) | holds | holds | holds | holds |
| struggling-repeater | -0.0023 | -0.0031 to -0.0016 |  |  | +0.0393 (+0.0380 to +0.0407) | -2.7625 (-2.8787 to -2.6463) | -0.1575 (-0.1599 to -0.1550) | -0.4770 (-0.6132 to -0.3408) | holds | holds | holds | holds |
| returning-expert | +0.0013 | +0.0008 to +0.0018 |  |  | +0.0279 (+0.0269 to +0.0290) | +0.4600 (+0.4152 to +0.5048) | -0.0800 (-0.0815 to -0.0784) | +0.3110 (+0.2116 to +0.4104) | holds | holds | holds | holds |
| wanderer | -0.0011 | -0.0018 to -0.0004 |  |  | +0.0334 (+0.0322 to +0.0346) | -1.7875 (-1.8361 to -1.7389) | -0.1255 (-0.1276 to -0.1233) | -0.1555 (-0.2814 to -0.0296) | holds | holds | holds | holds |
| lapsed-returner | -0.0006 | -0.0014 to +0.0001 |  |  | +0.0378 (+0.0363 to +0.0393) | -1.8115 (-1.9270 to -1.6960) | -0.1704 (-0.1733 to -0.1675) | -0.0975 (-0.2226 to +0.0276) | holds | holds | holds | holds |

#### interleave:learnRate-low: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0009 | -0.0018 to +0.0000 |  |  | +0.0369 (+0.0359 to +0.0380) | -3.1625 (-3.2062 to -3.1188) | -0.1437 (-0.1456 to -0.1418) | -0.1285 (-0.2595 to +0.0025) | holds | holds | holds | holds |
| single-subject-crammer | -0.0003 | -0.0010 to +0.0004 |  |  | +0.0289 (+0.0278 to +0.0299) | -2.1120 (-2.3389 to -1.8851) | -0.1240 (-0.1257 to -0.1224) | +0.0100 (-0.1328 to +0.1528) | holds | holds | holds | holds |
| struggling-repeater | -0.0007 | -0.0015 to +0.0000 |  |  | +0.0391 (+0.0379 to +0.0404) | -3.2230 (-3.3364 to -3.1096) | -0.1611 (-0.1633 to -0.1588) | -0.2135 (-0.3460 to -0.0810) | holds | **fails** | holds | holds |
| returning-expert | +0.0009 | +0.0004 to +0.0014 |  |  | +0.0290 (+0.0280 to +0.0300) | -0.1615 (-0.2091 to -0.1139) | -0.0939 (-0.0955 to -0.0923) | +0.2250 (+0.1239 to +0.3261) | holds | holds | holds | holds |
| wanderer | -0.0006 | -0.0013 to +0.0001 |  |  | +0.0390 (+0.0378 to +0.0403) | -2.4665 (-2.5175 to -2.4155) | -0.1407 (-0.1427 to -0.1387) | -0.0920 (-0.2143 to +0.0303) | holds | holds | holds | holds |
| lapsed-returner | -0.0002 | -0.0009 to +0.0005 |  |  | +0.0418 (+0.0403 to +0.0433) | -2.3910 (-2.5079 to -2.2741) | -0.1748 (-0.1775 to -0.1720) | -0.0190 (-0.1401 to +0.1021) | holds | holds | holds | holds |

#### interleave:learnRate-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0068 | -0.0077 to -0.0059 |  |  | +0.0378 (+0.0367 to +0.0388) | -2.8605 (-2.9056 to -2.8154) | -0.1389 (-0.1408 to -0.1369) | -1.1305 (-1.2542 to -1.0068) | holds | holds | holds | holds |
| single-subject-crammer | +0.0008 | -0.0002 to +0.0018 |  |  | +0.0259 (+0.0249 to +0.0269) | -1.6500 (-1.8788 to -1.4212) | -0.1140 (-0.1157 to -0.1124) | +0.2455 (+0.0396 to +0.4514) | holds | holds | holds | holds |
| struggling-repeater | -0.0050 | -0.0058 to -0.0041 |  |  | +0.0401 (+0.0389 to +0.0413) | -3.0325 (-3.1447 to -2.9203) | -0.1590 (-0.1613 to -0.1567) | -1.1735 (-1.3139 to -1.0331) | holds | holds | holds | holds |
| returning-expert | +0.0026 | +0.0020 to +0.0033 |  |  | +0.0269 (+0.0259 to +0.0279) | +0.0995 (+0.0541 to +0.1449) | -0.0865 (-0.0881 to -0.0850) | +0.6270 (+0.4992 to +0.7548) | holds | holds | holds | holds |
| wanderer | -0.0035 | -0.0043 to -0.0028 |  |  | +0.0373 (+0.0361 to +0.0385) | -2.2095 (-2.2598 to -2.1592) | -0.1318 (-0.1338 to -0.1298) | -0.6430 (-0.7730 to -0.5130) | holds | holds | holds | holds |
| lapsed-returner | -0.0028 | -0.0036 to -0.0019 |  |  | +0.0406 (+0.0391 to +0.0420) | -2.1620 (-2.2817 to -2.0423) | -0.1692 (-0.1720 to -0.1665) | -0.5565 (-0.7028 to -0.4102) | holds | holds | holds | holds |

#### interleave:prereqPenalty-low: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0071 | -0.0080 to -0.0062 |  |  | +0.0372 (+0.0361 to +0.0383) | -2.9625 (-3.0077 to -2.9173) | -0.1409 (-0.1429 to -0.1390) | -1.1870 (-1.3207 to -1.0533) | holds | holds | holds | holds |
| single-subject-crammer | -0.0015 | -0.0024 to -0.0006 |  |  | +0.0276 (+0.0265 to +0.0287) | -1.7730 (-2.0008 to -1.5452) | -0.1179 (-0.1195 to -0.1163) | -0.3925 (-0.5779 to -0.2071) | holds | holds | holds | holds |
| struggling-repeater | -0.0064 | -0.0072 to -0.0056 |  |  | +0.0398 (+0.0385 to +0.0410) | -3.1520 (-3.2668 to -3.0372) | -0.1598 (-0.1621 to -0.1575) | -1.4215 (-1.5639 to -1.2791) | holds | **fails** | holds | holds |
| returning-expert | +0.0007 | +0.0001 to +0.0014 |  |  | +0.0273 (+0.0263 to +0.0283) | +0.0010 (-0.0464 to +0.0484) | -0.0886 (-0.0901 to -0.0870) | +0.2095 (+0.0891 to +0.3299) | holds | holds | holds | holds |
| wanderer | -0.0043 | -0.0051 to -0.0036 |  |  | +0.0381 (+0.0369 to +0.0393) | -2.3295 (-2.3799 to -2.2791) | -0.1346 (-0.1367 to -0.1326) | -0.8135 (-0.9459 to -0.6811) | holds | holds | holds | holds |
| lapsed-returner | -0.0041 | -0.0049 to -0.0032 |  |  | +0.0408 (+0.0394 to +0.0423) | -2.2310 (-2.3485 to -2.1135) | -0.1711 (-0.1738 to -0.1683) | -0.7940 (-0.9337 to -0.6543) | holds | holds | holds | holds |

#### interleave:prereqPenalty-high: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0037 | +0.0027 to +0.0047 |  |  | +0.0385 (+0.0375 to +0.0396) | -3.0835 (-3.1279 to -3.0391) | -0.1433 (-0.1452 to -0.1414) | +0.6230 (+0.4775 to +0.7685) | holds | holds | holds | holds |
| single-subject-crammer | +0.0044 | +0.0035 to +0.0052 |  |  | +0.0289 (+0.0278 to +0.0299) | -1.9615 (-2.1910 to -1.7320) | -0.1217 (-0.1233 to -0.1201) | +1.1725 (+0.9967 to +1.3483) | holds | holds | holds | holds |
| struggling-repeater | +0.0031 | +0.0022 to +0.0039 |  |  | +0.0407 (+0.0394 to +0.0419) | -3.1825 (-3.2953 to -3.0697) | -0.1616 (-0.1639 to -0.1594) | +0.6135 (+0.4649 to +0.7621) | holds | **fails** | holds | holds |
| returning-expert | +0.0030 | +0.0024 to +0.0036 |  |  | +0.0282 (+0.0272 to +0.0292) | -0.0565 (-0.1039 to -0.0091) | -0.0902 (-0.0917 to -0.0886) | +0.6960 (+0.5724 to +0.8196) | holds | holds | holds | holds |
| wanderer | +0.0026 | +0.0018 to +0.0033 |  |  | +0.0397 (+0.0384 to +0.0409) | -2.4020 (-2.4522 to -2.3518) | -0.1385 (-0.1405 to -0.1365) | +0.5995 (+0.4586 to +0.7404) | holds | holds | holds | holds |
| lapsed-returner | +0.0030 | +0.0022 to +0.0038 |  |  | +0.0424 (+0.0409 to +0.0439) | -2.2900 (-2.4057 to -2.1743) | -0.1749 (-0.1776 to -0.1721) | +0.5840 (+0.4462 to +0.7218) | holds | holds | holds | holds |

#### interleave:pullScale-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0019 | -0.0028 to -0.0009 |  |  | +0.0381 (+0.0369 to +0.0392) | -2.1300 (-2.1728 to -2.0872) | -0.1339 (-0.1362 to -0.1317) | -0.3385 (-0.4745 to -0.2025) | holds | holds | holds | holds |
| single-subject-crammer | +0.0021 | +0.0012 to +0.0030 |  |  | +0.0212 (+0.0200 to +0.0223) | -0.4175 (-0.6463 to -0.1887) | -0.1039 (-0.1056 to -0.1022) | +0.5815 (+0.3986 to +0.7644) | holds | holds | holds | holds |
| struggling-repeater | -0.0016 | -0.0024 to -0.0007 |  |  | +0.0411 (+0.0397 to +0.0425) | -2.3625 (-2.4736 to -2.2514) | -0.1661 (-0.1688 to -0.1635) | -0.4405 (-0.5843 to -0.2967) | holds | holds | holds | holds |
| returning-expert | +0.0020 | +0.0014 to +0.0027 |  |  | +0.0309 (+0.0299 to +0.0319) | +0.7845 (+0.7425 to +0.8265) | -0.0772 (-0.0788 to -0.0757) | +0.5065 (+0.3785 to +0.6345) | holds | holds | holds | holds |
| wanderer | -0.0001 | -0.0009 to +0.0007 |  |  | +0.0388 (+0.0374 to +0.0401) | -1.4420 (-1.4889 to -1.3951) | -0.1288 (-0.1312 to -0.1265) | +0.0300 (-0.1103 to +0.1703) | holds | holds | holds | holds |
| lapsed-returner | +0.0002 | -0.0007 to +0.0010 |  |  | +0.0398 (+0.0383 to +0.0413) | -1.3845 (-1.4974 to -1.2716) | -0.1812 (-0.1842 to -0.1783) | -0.0130 (-0.1625 to +0.1365) | holds | holds | holds | holds |

#### interleave:pullScale-high: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0043 | -0.0053 to -0.0033 |  |  | +0.0355 (+0.0346 to +0.0364) | -3.5490 (-3.5934 to -3.5046) | -0.1485 (-0.1502 to -0.1468) | -0.7095 (-0.8486 to -0.5704) | holds | holds | holds | holds |
| single-subject-crammer | -0.0004 | -0.0013 to +0.0005 |  |  | +0.0372 (+0.0362 to +0.0381) | -2.9050 (-3.1250 to -2.6850) | -0.1284 (-0.1299 to -0.1268) | -0.0445 (-0.2310 to +0.1420) | holds | holds | holds | holds |
| struggling-repeater | -0.0037 | -0.0045 to -0.0029 |  |  | +0.0390 (+0.0378 to +0.0401) | -3.6850 (-3.8008 to -3.5692) | -0.1601 (-0.1623 to -0.1580) | -0.8625 (-1.0037 to -0.7213) | holds | **fails** | holds | holds |
| returning-expert | +0.0011 | +0.0005 to +0.0018 |  |  | +0.0312 (+0.0303 to +0.0322) | -0.7050 (-0.7517 to -0.6583) | -0.1015 (-0.1031 to -0.1000) | +0.2870 (+0.1634 to +0.4106) | holds | holds | holds | holds |
| wanderer | -0.0025 | -0.0032 to -0.0017 |  |  | +0.0404 (+0.0393 to +0.0415) | -2.9710 (-3.0212 to -2.9208) | -0.1445 (-0.1464 to -0.1427) | -0.4385 (-0.5738 to -0.3032) | holds | holds | holds | holds |
| lapsed-returner | -0.0022 | -0.0029 to -0.0014 |  |  | +0.0399 (+0.0385 to +0.0412) | -2.8770 (-2.9916 to -2.7624) | -0.1686 (-0.1712 to -0.1661) | -0.4280 (-0.5615 to -0.2945) | holds | holds | holds | holds |

#### interleave:revisitSlotCost-low: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0033 | -0.0042 to -0.0023 |  |  | +0.0377 (+0.0366 to +0.0387) | -3.0110 (-3.0557 to -2.9663) | -0.1418 (-0.1438 to -0.1399) | -0.5545 (-0.6941 to -0.4149) | holds | holds | holds | holds |
| single-subject-crammer | +0.0007 | -0.0001 to +0.0016 |  |  | +0.0281 (+0.0271 to +0.0292) | -1.8500 (-2.0752 to -1.6248) | -0.1195 (-0.1212 to -0.1179) | +0.2035 (+0.0225 to +0.3845) | holds | holds | holds | holds |
| struggling-repeater | -0.0030 | -0.0038 to -0.0021 |  |  | +0.0403 (+0.0390 to +0.0415) | -3.1875 (-3.3023 to -3.0727) | -0.1612 (-0.1636 to -0.1589) | -0.6885 (-0.8327 to -0.5443) | holds | **fails** | holds | holds |
| returning-expert | +0.0014 | +0.0008 to +0.0021 |  |  | +0.0274 (+0.0264 to +0.0284) | -0.0210 (-0.0689 to +0.0269) | -0.0891 (-0.0906 to -0.0875) | +0.3605 (+0.2391 to +0.4819) | holds | holds | holds | holds |
| wanderer | -0.0018 | -0.0025 to -0.0010 |  |  | +0.0387 (+0.0374 to +0.0399) | -2.3465 (-2.3966 to -2.2964) | -0.1361 (-0.1381 to -0.1341) | -0.2845 (-0.4223 to -0.1467) | holds | holds | holds | holds |
| lapsed-returner | -0.0014 | -0.0022 to -0.0006 |  |  | +0.0414 (+0.0399 to +0.0429) | -2.2805 (-2.3991 to -2.1619) | -0.1726 (-0.1753 to -0.1698) | -0.2670 (-0.4064 to -0.1276) | holds | holds | holds | holds |

#### interleave:revisitSlotCost-high: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0036 | -0.0047 to -0.0026 |  |  | +0.0384 (+0.0373 to +0.0395) | -3.0140 (-3.0579 to -2.9701) | -0.1564 (-0.1585 to -0.1544) | -0.5345 (-0.6689 to -0.4001) | holds | holds | holds | holds |
| single-subject-crammer | -0.0010 | -0.0019 to -0.0002 |  |  | +0.0315 (+0.0303 to +0.0328) | -2.9435 (-3.1308 to -2.7562) | -0.1278 (-0.1296 to -0.1261) | -0.2340 (-0.4039 to -0.0641) | holds | holds | holds | holds |
| struggling-repeater | -0.0025 | -0.0033 to -0.0017 |  |  | +0.0411 (+0.0397 to +0.0425) | -3.1260 (-3.2277 to -3.0243) | -0.1701 (-0.1724 to -0.1677) | -0.5825 (-0.7251 to -0.4399) | holds | **fails** | holds | holds |
| returning-expert | +0.0010 | +0.0003 to +0.0017 |  |  | +0.0335 (+0.0323 to +0.0348) | -0.7020 (-0.7542 to -0.6498) | -0.1064 (-0.1081 to -0.1048) | +0.2415 (+0.1155 to +0.3675) | holds | holds | holds | holds |
| wanderer | -0.0012 | -0.0020 to -0.0003 |  |  | +0.0429 (+0.0416 to +0.0443) | -2.5455 (-2.5921 to -2.4989) | -0.1500 (-0.1522 to -0.1478) | -0.2490 (-0.3879 to -0.1101) | holds | holds | holds | holds |
| lapsed-returner | -0.0008 | -0.0017 to +0.0000 |  |  | +0.0419 (+0.0403 to +0.0435) | -2.1650 (-2.2654 to -2.0646) | -0.1870 (-0.1897 to -0.1843) | -0.1825 (-0.3233 to -0.0417) | holds | holds | holds | holds |

#### interleave:revisitStopScale-low: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0029 | -0.0039 to -0.0020 |  |  | +0.0384 (+0.0374 to +0.0394) | -3.0210 (-3.0677 to -2.9743) | -0.1347 (-0.1365 to -0.1329) | -0.4975 (-0.6392 to -0.3558) | holds | holds | holds | holds |
| single-subject-crammer | +0.0009 | +0.0001 to +0.0018 |  |  | +0.0277 (+0.0267 to +0.0288) | -1.6640 (-1.8936 to -1.4344) | -0.1178 (-0.1194 to -0.1162) | +0.2665 (+0.0833 to +0.4497) | holds | holds | holds | holds |
| struggling-repeater | -0.0029 | -0.0037 to -0.0021 |  |  | +0.0414 (+0.0402 to +0.0426) | -3.3230 (-3.4465 to -3.1995) | -0.1511 (-0.1533 to -0.1489) | -0.7260 (-0.8738 to -0.5782) | holds | holds | holds | holds |
| returning-expert | +0.0015 | +0.0009 to +0.0021 |  |  | +0.0278 (+0.0268 to +0.0288) | +0.1015 (+0.0565 to +0.1465) | -0.0861 (-0.0876 to -0.0845) | +0.3775 (+0.2557 to +0.4993) | holds | holds | holds | holds |
| wanderer | -0.0012 | -0.0020 to -0.0005 |  |  | +0.0377 (+0.0366 to +0.0389) | -2.1900 (-2.2424 to -2.1376) | -0.1302 (-0.1321 to -0.1284) | -0.1805 (-0.3191 to -0.0419) | holds | holds | holds | holds |
| lapsed-returner | -0.0017 | -0.0025 to -0.0010 |  |  | +0.0407 (+0.0393 to +0.0421) | -2.3935 (-2.5168 to -2.2702) | -0.1554 (-0.1581 to -0.1528) | -0.3460 (-0.4863 to -0.2057) | holds | holds | holds | holds |

#### interleave:revisitStopScale-high: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0029 | -0.0039 to -0.0019 |  |  | +0.0359 (+0.0348 to +0.0371) | -2.9200 (-2.9637 to -2.8763) | -0.1573 (-0.1594 to -0.1551) | -0.4655 (-0.6006 to -0.3304) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0007 to +0.0011 |  |  | +0.0283 (+0.0272 to +0.0294) | -2.1705 (-2.3960 to -1.9450) | -0.1229 (-0.1246 to -0.1212) | +0.0620 (-0.1175 to +0.2415) | holds | holds | holds | holds |
| struggling-repeater | -0.0021 | -0.0030 to -0.0013 |  |  | +0.0393 (+0.0378 to +0.0407) | -2.9360 (-3.0377 to -2.8343) | -0.1814 (-0.1838 to -0.1790) | -0.5105 (-0.6436 to -0.3774) | holds | **fails** | holds | holds |
| returning-expert | +0.0013 | +0.0007 to +0.0020 |  |  | +0.0277 (+0.0266 to +0.0288) | -0.2730 (-0.3244 to -0.2216) | -0.0943 (-0.0959 to -0.0928) | +0.3190 (+0.1948 to +0.4432) | holds | holds | holds | holds |
| wanderer | -0.0011 | -0.0019 to -0.0002 |  |  | +0.0389 (+0.0376 to +0.0402) | -2.4130 (-2.4603 to -2.3657) | -0.1527 (-0.1550 to -0.1504) | -0.2055 (-0.3408 to -0.0702) | holds | holds | holds | holds |
| lapsed-returner | +0.0003 | -0.0006 to +0.0012 |  |  | +0.0404 (+0.0388 to +0.0421) | -1.9155 (-2.0187 to -1.8123) | -0.1977 (-0.2003 to -0.1950) | -0.0375 (-0.1699 to +0.0949) | holds | holds | holds | holds |

#### interleave:slots-low: wins 0 of 6, harmed none, guardrail fails single-subject-crammer:G2, struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0019 | -0.0031 to -0.0008 |  |  | +0.0354 (+0.0340 to +0.0368) | -2.1570 (-2.1991 to -2.1149) | -0.1900 (-0.1920 to -0.1880) | -0.2420 (-0.3522 to -0.1318) | holds | holds | holds | holds |
| single-subject-crammer | -0.0005 | -0.0014 to +0.0004 |  |  | +0.0199 (+0.0181 to +0.0216) | -2.3280 (-2.4250 to -2.2310) | -0.2015 (-0.2037 to -0.1994) | -0.1185 (-0.2485 to +0.0115) | holds | **fails** | holds | holds |
| struggling-repeater | -0.0011 | -0.0020 to -0.0002 |  |  | +0.0431 (+0.0413 to +0.0448) | -2.4020 (-2.4641 to -2.3399) | -0.2050 (-0.2075 to -0.2025) | -0.2600 (-0.3742 to -0.1458) | holds | **fails** | holds | holds |
| returning-expert | -0.0005 | -0.0014 to +0.0005 |  |  | +0.0339 (+0.0323 to +0.0356) | -1.2255 (-1.2631 to -1.1879) | -0.1942 (-0.1963 to -0.1920) | -0.0680 (-0.1884 to +0.0524) | holds | holds | holds | holds |
| wanderer | +0.0003 | -0.0007 to +0.0013 |  |  | +0.0390 (+0.0373 to +0.0407) | -1.7750 (-1.8168 to -1.7332) | -0.2123 (-0.2146 to -0.2100) | -0.0010 (-0.1208 to +0.1188) | holds | holds | holds | holds |
| lapsed-returner | +0.0008 | -0.0001 to +0.0017 |  |  | +0.0413 (+0.0394 to +0.0431) | -1.3970 (-1.4586 to -1.3354) | -0.2202 (-0.2228 to -0.2176) | +0.0905 (-0.0265 to +0.2075) | holds | holds | holds | holds |

#### interleave:slots-high: wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0005 | -0.0012 to +0.0003 |  |  | +0.0374 (+0.0366 to +0.0382) | -1.7545 (-1.8092 to -1.6998) | -0.1190 (-0.1205 to -0.1175) | -0.0125 (-0.1552 to +0.1302) | holds | holds | holds | holds |
| single-subject-crammer | +0.0002 | -0.0008 to +0.0012 |  |  | +0.0282 (+0.0273 to +0.0291) | -1.7805 (-2.2127 to -1.3483) | -0.0728 (-0.0742 to -0.0713) | +0.0975 (-0.1859 to +0.3809) | holds | holds | holds | holds |
| struggling-repeater | -0.0013 | -0.0022 to -0.0005 |  |  | +0.0418 (+0.0407 to +0.0429) | -2.7995 (-2.9941 to -2.6049) | -0.1363 (-0.1382 to -0.1343) | -0.4020 (-0.5826 to -0.2214) | holds | holds | holds | holds |
| returning-expert | +0.0004 | -0.0001 to +0.0008 |  |  | +0.0224 (+0.0213 to +0.0234) | -0.0820 (-0.1132 to -0.0508) | -0.0441 (-0.0453 to -0.0429) | +0.1715 (+0.0603 to +0.2827) | holds | holds | holds | holds |
| wanderer | -0.0004 | -0.0010 to +0.0002 |  |  | +0.0384 (+0.0375 to +0.0393) | -1.1250 (-1.1728 to -1.0772) | -0.1064 (-0.1081 to -0.1048) | -0.0155 (-0.1499 to +0.1189) | holds | holds | holds | holds |
| lapsed-returner | -0.0009 | -0.0017 to -0.0001 |  |  | +0.0374 (+0.0361 to +0.0386) | -1.9820 (-2.1627 to -1.8013) | -0.1343 (-0.1368 to -0.1318) | -0.2080 (-0.3646 to -0.0514) | holds | holds | holds | holds |

#### interleave:priorRateMult-low: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0033 | -0.0042 to -0.0023 |  |  | +0.0377 (+0.0366 to +0.0388) | -3.0115 (-3.0562 to -2.9668) | -0.1418 (-0.1438 to -0.1399) | -0.5510 (-0.6906 to -0.4114) | holds | holds | holds | holds |
| single-subject-crammer | +0.0007 | -0.0001 to +0.0016 |  |  | +0.0281 (+0.0271 to +0.0292) | -1.8540 (-2.0794 to -1.6286) | -0.1194 (-0.1211 to -0.1178) | +0.1980 (+0.0172 to +0.3788) | holds | holds | holds | holds |
| struggling-repeater | -0.0030 | -0.0038 to -0.0021 |  |  | +0.0403 (+0.0390 to +0.0415) | -3.1875 (-3.3023 to -3.0727) | -0.1612 (-0.1636 to -0.1589) | -0.6890 (-0.8332 to -0.5448) | holds | **fails** | holds | holds |
| returning-expert | +0.0015 | +0.0008 to +0.0021 |  |  | +0.0274 (+0.0264 to +0.0284) | -0.0215 (-0.0694 to +0.0264) | -0.0890 (-0.0906 to -0.0875) | +0.3615 (+0.2400 to +0.4830) | holds | holds | holds | holds |
| wanderer | -0.0017 | -0.0025 to -0.0009 |  |  | +0.0386 (+0.0374 to +0.0399) | -2.3450 (-2.3952 to -2.2948) | -0.1361 (-0.1381 to -0.1340) | -0.2835 (-0.4213 to -0.1457) | holds | holds | holds | holds |
| lapsed-returner | -0.0013 | -0.0021 to -0.0005 |  |  | +0.0414 (+0.0399 to +0.0429) | -2.2800 (-2.3987 to -2.1613) | -0.1725 (-0.1753 to -0.1697) | -0.2660 (-0.4053 to -0.1267) | holds | holds | holds | holds |

#### interleave:priorRateMult-high: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0032 | -0.0042 to -0.0023 |  |  | +0.0377 (+0.0367 to +0.0388) | -3.0150 (-3.0597 to -2.9703) | -0.1419 (-0.1438 to -0.1399) | -0.5460 (-0.6861 to -0.4059) | holds | holds | holds | holds |
| single-subject-crammer | +0.0004 | -0.0005 to +0.0013 |  |  | +0.0282 (+0.0271 to +0.0292) | -1.8460 (-2.0712 to -1.6208) | -0.1198 (-0.1214 to -0.1181) | +0.2040 (+0.0228 to +0.3852) | holds | holds | holds | holds |
| struggling-repeater | -0.0030 | -0.0038 to -0.0022 |  |  | +0.0403 (+0.0390 to +0.0415) | -3.1870 (-3.3018 to -3.0722) | -0.1613 (-0.1636 to -0.1589) | -0.6860 (-0.8302 to -0.5418) | holds | **fails** | holds | holds |
| returning-expert | +0.0013 | +0.0007 to +0.0019 |  |  | +0.0275 (+0.0265 to +0.0285) | -0.0230 (-0.0708 to +0.0248) | -0.0891 (-0.0907 to -0.0876) | +0.3555 (+0.2340 to +0.4770) | holds | holds | holds | holds |
| wanderer | -0.0020 | -0.0027 to -0.0012 |  |  | +0.0386 (+0.0374 to +0.0399) | -2.3450 (-2.3951 to -2.2949) | -0.1362 (-0.1382 to -0.1342) | -0.2870 (-0.4248 to -0.1492) | holds | holds | holds | holds |
| lapsed-returner | -0.0016 | -0.0024 to -0.0008 |  |  | +0.0415 (+0.0400 to +0.0430) | -2.2930 (-2.4125 to -2.1735) | -0.1728 (-0.1755 to -0.1700) | -0.2785 (-0.4181 to -0.1389) | holds | holds | holds | holds |

#### interleave:priorRateMult-outer: wins 0 of 6, harmed none, guardrail fails struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0032 | -0.0041 to -0.0022 |  |  | +0.0379 (+0.0368 to +0.0390) | -3.0175 (-3.0623 to -2.9727) | -0.1421 (-0.1441 to -0.1402) | -0.5360 (-0.6759 to -0.3961) | holds | holds | holds | holds |
| single-subject-crammer | +0.0000 | -0.0008 to +0.0009 |  |  | +0.0283 (+0.0273 to +0.0294) | -1.8595 (-2.0852 to -1.6338) | -0.1200 (-0.1216 to -0.1183) | +0.1825 (+0.0006 to +0.3644) | holds | holds | holds | holds |
| struggling-repeater | -0.0030 | -0.0038 to -0.0022 |  |  | +0.0403 (+0.0391 to +0.0416) | -3.1875 (-3.3023 to -3.0727) | -0.1612 (-0.1636 to -0.1589) | -0.6870 (-0.8311 to -0.5429) | holds | **fails** | holds | holds |
| returning-expert | +0.0011 | +0.0006 to +0.0017 |  |  | +0.0276 (+0.0266 to +0.0286) | -0.0280 (-0.0759 to +0.0199) | -0.0893 (-0.0908 to -0.0877) | +0.3610 (+0.2392 to +0.4828) | holds | holds | holds | holds |
| wanderer | -0.0021 | -0.0028 to -0.0013 |  |  | +0.0388 (+0.0375 to +0.0400) | -2.3515 (-2.4015 to -2.3015) | -0.1363 (-0.1383 to -0.1343) | -0.2835 (-0.4213 to -0.1457) | holds | holds | holds | holds |
| lapsed-returner | -0.0017 | -0.0025 to -0.0009 |  |  | +0.0417 (+0.0402 to +0.0432) | -2.2980 (-2.4172 to -2.1788) | -0.1729 (-0.1757 to -0.1701) | -0.2730 (-0.4132 to -0.1328) | holds | holds | holds | holds |

#### interleave:price-corner: wins 0 of 6, harmed none, guardrail fails curious-newcomer:G2, struggling-repeater:G2, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0023 | -0.0036 to -0.0011 |  |  | +0.0361 (+0.0347 to +0.0375) | -2.1015 (-2.1436 to -2.0594) | -0.1900 (-0.1921 to -0.1878) | -0.2935 (-0.4034 to -0.1836) | holds | **fails** | holds | holds |
| single-subject-crammer | -0.0004 | -0.0013 to +0.0006 |  |  | +0.0206 (+0.0188 to +0.0224) | -2.2245 (-2.3198 to -2.1292) | -0.2053 (-0.2075 to -0.2031) | -0.0920 (-0.2206 to +0.0366) | holds | holds | holds | holds |
| struggling-repeater | -0.0010 | -0.0019 to -0.0000 |  |  | +0.0415 (+0.0397 to +0.0433) | -2.1960 (-2.2575 to -2.1345) | -0.2021 (-0.2048 to -0.1995) | -0.1920 (-0.3020 to -0.0820) | holds | **fails** | holds | holds |
| returning-expert | -0.0005 | -0.0014 to +0.0005 |  |  | +0.0337 (+0.0320 to +0.0354) | -1.1795 (-1.2168 to -1.1422) | -0.1991 (-0.2013 to -0.1969) | -0.0570 (-0.1776 to +0.0636) | holds | holds | holds | holds |
| wanderer | +0.0002 | -0.0008 to +0.0013 |  |  | +0.0387 (+0.0370 to +0.0404) | -1.6735 (-1.7152 to -1.6318) | -0.2148 (-0.2172 to -0.2125) | +0.0130 (-0.1060 to +0.1320) | holds | holds | holds | holds |
| lapsed-returner | +0.0003 | -0.0007 to +0.0012 |  |  | +0.0388 (+0.0369 to +0.0408) | -1.2310 (-1.2910 to -1.1710) | -0.2165 (-0.2194 to -0.2137) | +0.0265 (-0.0874 to +0.1404) | holds | holds | holds | holds |

## Context (no rule reads these; criterion §4)
### gam-session+fixed vs gam+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ | 95% interval | win | harm |
|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0004 to +0.0002 |  |  |
| single-subject-crammer | +0.0001 | -0.0004 to +0.0007 |  |  |
| struggling-repeater | +0.0004 | -0.0001 to +0.0008 |  |  |
| returning-expert | +0.0001 | -0.0001 to +0.0002 |  |  |
| wanderer | -0.0001 | -0.0003 to +0.0001 |  |  |
| lapsed-returner | -0.0004 | -0.0008 to +0.0001 |  |  |

### gam-session-v3+fixed vs gam+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ | 95% interval | win | harm |
|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0004 to +0.0002 |  |  |
| single-subject-crammer | +0.0009 | +0.0003 to +0.0015 |  |  |
| struggling-repeater | +0.0004 | -0.0001 to +0.0008 |  |  |
| returning-expert | +0.0001 | -0.0000 to +0.0002 |  |  |
| wanderer | -0.0002 | -0.0004 to +0.0000 |  |  |
| lapsed-returner | -0.0004 | -0.0008 to +0.0000 |  |  |

### gam-session-no-cov+fixed vs gam+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ | 95% interval | win | harm |
|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0005 to +0.0001 |  |  |
| single-subject-crammer | +0.0001 | -0.0005 to +0.0007 |  |  |
| struggling-repeater | +0.0002 | -0.0002 to +0.0007 |  |  |
| returning-expert | +0.0001 | -0.0001 to +0.0002 |  |  |
| wanderer | -0.0000 | -0.0003 to +0.0002 |  |  |
| lapsed-returner | -0.0005 | -0.0009 to -0.0000 |  |  |

### gam-session-v3-edpbase+fixed vs gam+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ | 95% interval | win | harm |
|---|---|---|---|---|
| curious-newcomer | -0.0032 | -0.0041 to -0.0023 |  |  |
| single-subject-crammer | +0.0013 | +0.0005 to +0.0022 |  |  |
| struggling-repeater | -0.0025 | -0.0033 to -0.0017 |  |  |
| returning-expert | +0.0016 | +0.0009 to +0.0022 |  |  |
| wanderer | -0.0016 | -0.0023 to -0.0008 |  |  |
| lapsed-returner | -0.0016 | -0.0024 to -0.0008 |  |  |

### gam+fixed vs default-order+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0005 to +0.0004 |  |  | +0.0064 (+0.0059 to +0.0068) | -0.4910 (-0.5146 to -0.4674) | -0.0395 (-0.0406 to -0.0383) | -0.0535 (-0.1142 to +0.0072) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0012 to +0.0000 |  |  | -0.0007 (-0.0011 to -0.0003) | -0.4225 (-0.6305 to -0.2145) | -0.0137 (-0.0148 to -0.0126) | -0.1735 (-0.3022 to -0.0448) | holds | holds | holds | holds |
| struggling-repeater | -0.0005 | -0.0010 to +0.0001 |  |  | +0.0068 (+0.0062 to +0.0074) | -0.5800 (-0.6890 to -0.4710) | -0.0484 (-0.0500 to -0.0468) | -0.1070 (-0.1957 to -0.0183) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0003 to +0.0000 |  |  | -0.0020 (-0.0023 to -0.0017) | +0.0220 (+0.0074 to +0.0366) | -0.0047 (-0.0054 to -0.0039) | -0.0115 (-0.0394 to +0.0164) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0005 to +0.0001 |  |  | +0.0032 (+0.0028 to +0.0037) | -0.3915 (-0.4164 to -0.3666) | -0.0271 (-0.0283 to -0.0260) | -0.0490 (-0.0952 to -0.0028) | holds | holds | holds | holds |
| lapsed-returner | +0.0003 | -0.0002 to +0.0007 |  |  | +0.0032 (+0.0026 to +0.0037) | -0.1695 (-0.2744 to -0.0646) | -0.0327 (-0.0345 to -0.0310) | +0.0250 (-0.0481 to +0.0981) | holds | holds | holds | holds |

### draft-rules+fixed vs default-order+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails curious-newcomer:G1, struggling-repeater:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0006 | -0.0015 to +0.0004 |  |  | +0.0547 (+0.0530 to +0.0565) | -0.3590 (-0.3919 to -0.3261) | -0.0725 (-0.0752 to -0.0698) | -0.0515 (-0.1885 to +0.0855) | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0023 | +0.0015 to +0.0031 |  |  | +0.0329 (+0.0316 to +0.0341) | +0.5210 (+0.3013 to +0.7407) | -0.0475 (-0.0492 to -0.0458) | +0.7180 (+0.5449 to +0.8911) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0009 to +0.0007 |  |  | +0.0559 (+0.0539 to +0.0579) | -0.5310 (-0.6462 to -0.4158) | -0.0839 (-0.0868 to -0.0810) | -0.0445 (-0.1862 to +0.0972) | **fails** | holds | holds | holds |
| returning-expert | +0.0022 | +0.0016 to +0.0029 |  |  | +0.0477 (+0.0465 to +0.0489) | +1.2575 (+1.2138 to +1.3012) | -0.0400 (-0.0416 to -0.0383) | +0.5555 (+0.4298 to +0.6812) | holds | holds | holds | holds |
| wanderer | +0.0002 | -0.0006 to +0.0010 |  |  | +0.0544 (+0.0527 to +0.0562) | -0.1665 (-0.2053 to -0.1277) | -0.0688 (-0.0712 to -0.0664) | +0.1265 (-0.0093 to +0.2623) | **fails** | holds | holds | holds |
| lapsed-returner | +0.0004 | -0.0004 to +0.0012 |  |  | +0.0721 (+0.0699 to +0.0743) | -0.8065 (-0.9088 to -0.7042) | -0.1250 (-0.1281 to -0.1219) | +0.0765 (-0.0699 to +0.2229) | **fails** | holds | holds | holds |

### random+fixed vs default-order+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails curious-newcomer:G1, curious-newcomer:G3, single-subject-crammer:G1, single-subject-crammer:G3, struggling-repeater:G1, struggling-repeater:G3, returning-expert:G1, returning-expert:G3, wanderer:G1, wanderer:G3, lapsed-returner:G1, lapsed-returner:G3, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0040 | -0.0056 to -0.0025 |  |  | +0.1621 (+0.1601 to +0.1640) | +0.3175 (+0.2785 to +0.3565) | +0.1161 (+0.1132 to +0.1190) | -0.6215 (-0.8475 to -0.3955) | **fails** | holds | **fails** | holds |
| single-subject-crammer | +0.0042 | +0.0030 to +0.0053 |  |  | +0.1540 (+0.1522 to +0.1557) | -0.2350 (-0.4581 to -0.0119) | +0.1148 (+0.1118 to +0.1177) | +1.3035 (+1.0507 to +1.5563) | **fails** | holds | **fails** | holds |
| struggling-repeater | -0.0023 | -0.0035 to -0.0011 |  |  | +0.1607 (+0.1585 to +0.1629) | -0.1170 (-0.2289 to -0.0051) | +0.1103 (+0.1072 to +0.1135) | -0.4860 (-0.7061 to -0.2659) | **fails** | holds | **fails** | holds |
| returning-expert | +0.0030 | +0.0019 to +0.0040 |  |  | +0.1621 (+0.1605 to +0.1637) | +1.6230 (+1.5693 to +1.6767) | +0.1012 (+0.0984 to +0.1040) | +0.6735 (+0.4656 to +0.8814) | **fails** | holds | **fails** | holds |
| wanderer | -0.0009 | -0.0021 to +0.0003 |  |  | +0.1611 (+0.1591 to +0.1630) | +0.5920 (+0.5491 to +0.6349) | +0.1049 (+0.1019 to +0.1079) | -0.2140 (-0.4328 to +0.0048) | **fails** | holds | **fails** | holds |
| lapsed-returner | -0.0003 | -0.0015 to +0.0008 |  |  | +0.1587 (+0.1563 to +0.1610) | +0.0740 (-0.0403 to +0.1883) | +0.0950 (+0.0916 to +0.0984) | +0.0370 (-0.1699 to +0.2439) | **fails** | holds | **fails** | holds |

### oracle-order+fixed vs default-order+fixed (interleave:base): wins 6 of 6, harmed none, guardrail fails none, beats: yes
| persona | Δ | 95% interval | win | harm |
|---|---|---|---|---|
| curious-newcomer | +0.1128 | +0.1111 to +0.1144 | win |  |
| single-subject-crammer | +0.0829 | +0.0817 to +0.0841 | win |  |
| struggling-repeater | +0.0849 | +0.0836 to +0.0862 | win |  |
| returning-expert | +0.1512 | +0.1502 to +0.1522 | win |  |
| wanderer | +0.1072 | +0.1060 to +0.1084 | win |  |
| lapsed-returner | +0.1080 | +0.1067 to +0.1093 | win |  |

Ordering headroom in this world (oracle-order vs default-order, criterion 2 §2.3): **HEADROOM**

## Descriptive, base cell (means per episode; engagement and descriptive, never a pass input)
EDP-style need coverage and domain diversity are labelled **"circular: diagnostic only"** (founder decision Q3): printed beside R₇, never a pass score.

| arm | persona | R₁ | R₇ | R₃₀ | circular: need coverage | circular: domain diversity | nNew | nAll | cards | reveal | revisitShare | movedShare | R1d | g1TopDomainShare | g2Concepts | g3PrereqFirst | g4Gain | servedNew | servedOutHome | movedServed | carriesFalse | carriesTrue | nearTie | composes | served by session slot | moved by session slot |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 1.007 | 0.918 | 0.795 | 0.097 | 1.000 | 76.192 | 80.093 | 108.368 | 0.962 | 0.271 | 0.000 | 0.679 | 0.505 | 75.066 | 0.553 | 43.986 | 79.057 | 39.649 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| default-order+fixed | single-subject-crammer | 0.705 | 0.630 | 0.526 | 0.153 | 0.980 | 87.788 | 111.780 | 123.490 | 0.975 | 0.271 | 0.000 | 0.700 | 0.578 | 85.039 | 0.495 | 45.734 | 89.995 | 52.381 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| default-order+fixed | struggling-repeater | 0.606 | 0.513 | 0.398 | 0.123 | 0.998 | 65.263 | 80.251 | 94.708 | 0.947 | 0.274 | 0.000 | 0.647 | 0.520 | 64.311 | 0.542 | 38.309 | 68.767 | 35.728 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| default-order+fixed | returning-expert | 1.882 | 1.835 | 1.745 | 0.152 | 0.998 | 94.202 | 123.883 | 131.643 | 0.983 | 0.273 | 0.000 | 0.829 | 0.524 | 91.314 | 0.452 | 32.344 | 95.731 | 48.167 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| default-order+fixed | wanderer | 1.225 | 1.149 | 1.030 | 0.126 | 0.999 | 76.960 | 94.947 | 109.701 | 0.964 | 0.273 | 0.000 | 0.715 | 0.514 | 75.561 | 0.519 | 39.055 | 79.742 | 40.046 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| default-order+fixed | lapsed-returner | 1.524 | 1.444 | 1.315 | 0.134 | 0.998 | 61.917 | 82.930 | 90.458 | 0.940 | 0.274 | 0.000 | 0.729 | 0.519 | 60.894 | 0.551 | 29.480 | 65.665 | 33.469 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| gam-session+fixed | curious-newcomer | 1.007 | 0.918 | 0.795 | 0.183 | 0.999 | 76.192 | 80.093 | 108.368 | 0.962 | 0.271 | 0.135 | 0.682 | 0.510 | 74.572 | 0.519 | 43.922 | 79.057 | 39.657 | 10.611 | 0.023 | 10.588 | 0.001 | 22.269 | 22.269 19.735 17.768 10.380 8.905 | 9.229 1.222 0.154 0.007 0.000 |
| gam-session+fixed | single-subject-crammer | 0.704 | 0.630 | 0.526 | 0.198 | 0.980 | 87.608 | 111.600 | 123.287 | 0.974 | 0.271 | 0.154 | 0.700 | 0.577 | 84.629 | 0.482 | 45.585 | 89.848 | 52.264 | 13.800 | 0.202 | 13.598 | 0.003 | 24.090 | 24.090 22.526 21.040 11.575 10.617 | 10.977 2.104 0.569 0.139 0.011 |
| gam-session+fixed | struggling-repeater | 0.606 | 0.513 | 0.398 | 0.201 | 0.997 | 65.234 | 80.222 | 94.670 | 0.947 | 0.274 | 0.171 | 0.650 | 0.524 | 63.798 | 0.500 | 38.236 | 68.743 | 36.003 | 11.616 | 0.072 | 11.543 | 0.001 | 20.515 | 20.515 17.078 14.851 9.028 7.269 | 9.580 1.762 0.258 0.015 0.000 |
| gam-session+fixed | returning-expert | 1.882 | 1.835 | 1.745 | 0.200 | 0.998 | 94.202 | 123.883 | 131.643 | 0.983 | 0.273 | 0.152 | 0.829 | 0.523 | 91.314 | 0.449 | 32.344 | 95.731 | 48.164 | 14.508 | 0.227 | 14.281 | 0.000 | 25.154 | 25.154 23.939 22.835 12.289 11.515 | 11.511 2.591 0.381 0.024 0.002 |
| gam-session+fixed | wanderer | 1.225 | 1.148 | 1.030 | 0.192 | 0.998 | 76.960 | 94.947 | 109.701 | 0.964 | 0.273 | 0.156 | 0.716 | 0.517 | 75.189 | 0.496 | 38.983 | 79.742 | 40.047 | 12.418 | 0.130 | 12.288 | 0.001 | 22.399 | 22.399 19.913 17.992 10.439 8.998 | 9.972 2.143 0.289 0.013 0.001 |
| gam-session+fixed | lapsed-returner | 1.523 | 1.444 | 1.314 | 0.200 | 0.997 | 61.870 | 82.882 | 90.391 | 0.940 | 0.274 | 0.172 | 0.731 | 0.521 | 60.679 | 0.524 | 29.439 | 65.619 | 33.490 | 11.144 | 0.162 | 10.982 | 0.002 | 19.999 | 19.999 16.314 13.925 8.615 6.766 | 8.883 1.972 0.272 0.017 0.000 |
| gam-session-v3+fixed | curious-newcomer | 1.007 | 0.918 | 0.795 | 0.187 | 0.999 | 76.192 | 80.093 | 108.368 | 0.962 | 0.271 | 0.142 | 0.682 | 0.511 | 74.560 | 0.517 | 43.919 | 79.057 | 39.646 | 11.232 | 0.024 | 11.209 | 0.001 | 22.269 | 22.269 19.735 17.768 10.380 8.905 | 9.087 1.881 0.240 0.023 0.001 |
| gam-session-v3+fixed | single-subject-crammer | 0.705 | 0.630 | 0.527 | 0.201 | 0.980 | 87.841 | 111.834 | 123.585 | 0.974 | 0.271 | 0.166 | 0.700 | 0.577 | 84.838 | 0.480 | 45.720 | 90.061 | 52.406 | 14.909 | 0.229 | 14.680 | 0.002 | 24.133 | 24.133 22.578 21.098 11.604 10.649 | 10.958 2.950 0.779 0.198 0.024 |
| gam-session-v3+fixed | struggling-repeater | 0.606 | 0.513 | 0.398 | 0.206 | 0.997 | 65.225 | 80.213 | 94.654 | 0.947 | 0.274 | 0.187 | 0.650 | 0.525 | 63.759 | 0.497 | 38.240 | 68.734 | 36.074 | 12.698 | 0.080 | 12.618 | 0.001 | 20.512 | 20.512 17.078 14.850 9.026 7.267 | 9.326 2.910 0.419 0.041 0.003 |
| gam-session-v3+fixed | returning-expert | 1.882 | 1.835 | 1.745 | 0.203 | 0.998 | 94.202 | 123.883 | 131.643 | 0.983 | 0.273 | 0.160 | 0.829 | 0.523 | 91.316 | 0.449 | 32.352 | 95.731 | 48.169 | 15.225 | 0.235 | 14.989 | 0.000 | 25.154 | 25.154 23.939 22.835 12.289 11.515 | 11.464 3.131 0.551 0.063 0.015 |
| gam-session-v3+fixed | wanderer | 1.224 | 1.148 | 1.030 | 0.195 | 0.998 | 76.960 | 94.947 | 109.701 | 0.964 | 0.273 | 0.167 | 0.716 | 0.517 | 75.172 | 0.494 | 38.974 | 79.742 | 40.043 | 13.294 | 0.145 | 13.149 | 0.000 | 22.399 | 22.399 19.913 17.992 10.439 8.998 | 9.873 2.937 0.437 0.043 0.005 |
| gam-session-v3+fixed | lapsed-returner | 1.523 | 1.444 | 1.314 | 0.204 | 0.997 | 61.885 | 82.897 | 90.407 | 0.940 | 0.274 | 0.182 | 0.731 | 0.522 | 60.682 | 0.521 | 29.444 | 65.629 | 33.494 | 11.820 | 0.178 | 11.642 | 0.002 | 20.001 | 20.001 16.314 13.930 8.617 6.768 | 8.749 2.602 0.410 0.054 0.004 |
| gam-session-no-cov+fixed | curious-newcomer | 1.007 | 0.918 | 0.795 | 0.185 | 0.999 | 76.192 | 80.093 | 108.368 | 0.962 | 0.271 | 0.139 | 0.682 | 0.510 | 74.567 | 0.519 | 43.915 | 79.057 | 39.650 | 10.937 | 0.022 | 10.915 | 0.001 | 22.269 | 22.269 19.735 17.768 10.380 8.905 | 9.207 1.515 0.205 0.009 0.000 |
| gam-session-no-cov+fixed | single-subject-crammer | 0.704 | 0.629 | 0.526 | 0.199 | 0.980 | 87.609 | 111.600 | 123.296 | 0.974 | 0.271 | 0.162 | 0.700 | 0.577 | 84.633 | 0.482 | 45.565 | 89.850 | 52.273 | 14.511 | 0.197 | 14.315 | 0.003 | 24.093 | 24.093 22.520 21.049 11.569 10.620 | 10.914 2.530 0.808 0.246 0.013 |
| gam-session-no-cov+fixed | struggling-repeater | 0.606 | 0.513 | 0.398 | 0.203 | 0.997 | 65.215 | 80.203 | 94.647 | 0.947 | 0.274 | 0.177 | 0.650 | 0.524 | 63.776 | 0.500 | 38.211 | 68.725 | 35.996 | 12.039 | 0.072 | 11.967 | 0.001 | 20.512 | 20.512 17.076 14.845 9.025 7.265 | 9.556 2.122 0.341 0.021 0.000 |
| gam-session-no-cov+fixed | returning-expert | 1.882 | 1.835 | 1.745 | 0.202 | 0.998 | 94.202 | 123.883 | 131.643 | 0.983 | 0.273 | 0.156 | 0.829 | 0.523 | 91.313 | 0.449 | 32.341 | 95.731 | 48.170 | 14.839 | 0.236 | 14.604 | 0.000 | 25.154 | 25.154 23.939 22.835 12.289 11.515 | 11.428 2.917 0.467 0.025 0.003 |
| gam-session-no-cov+fixed | wanderer | 1.225 | 1.148 | 1.030 | 0.193 | 0.998 | 76.960 | 94.947 | 109.701 | 0.964 | 0.273 | 0.162 | 0.716 | 0.517 | 75.189 | 0.496 | 38.997 | 79.742 | 40.041 | 12.816 | 0.133 | 12.683 | 0.001 | 22.399 | 22.399 19.913 17.992 10.439 8.998 | 9.944 2.498 0.358 0.014 0.002 |
| gam-session-no-cov+fixed | lapsed-returner | 1.523 | 1.444 | 1.314 | 0.201 | 0.997 | 61.867 | 82.879 | 90.389 | 0.940 | 0.274 | 0.176 | 0.730 | 0.521 | 60.668 | 0.524 | 29.424 | 65.618 | 33.509 | 11.430 | 0.167 | 11.263 | 0.002 | 19.995 | 19.995 16.316 13.928 8.613 6.764 | 8.816 2.255 0.340 0.020 0.000 |
| gam-session-v3-edpbase+fixed | curious-newcomer | 1.003 | 0.915 | 0.793 | 0.287 | 0.993 | 76.192 | 80.093 | 108.368 | 0.962 | 0.271 | 0.398 | 0.694 | 0.543 | 72.055 | 0.411 | 43.431 | 79.057 | 39.669 | 31.402 | 1.679 | 29.723 | 0.000 | 22.269 | 22.269 19.735 17.768 10.380 8.905 | 18.113 10.405 1.899 0.853 0.133 |
| gam-session-v3-edpbase+fixed | single-subject-crammer | 0.705 | 0.631 | 0.527 | 0.277 | 0.963 | 87.645 | 111.638 | 123.332 | 0.974 | 0.271 | 0.432 | 0.707 | 0.606 | 83.189 | 0.375 | 45.938 | 89.885 | 54.779 | 38.700 | 3.297 | 35.402 | 0.001 | 24.107 | 24.107 22.509 21.049 11.586 10.633 | 19.951 13.476 3.254 1.573 0.446 |
| gam-session-v3-edpbase+fixed | struggling-repeater | 0.602 | 0.510 | 0.396 | 0.299 | 0.986 | 65.131 | 80.119 | 94.535 | 0.947 | 0.274 | 0.448 | 0.665 | 0.560 | 61.124 | 0.381 | 37.620 | 68.653 | 38.499 | 30.621 | 1.806 | 28.814 | 0.000 | 20.506 | 20.506 17.053 14.817 9.014 7.263 | 16.302 10.674 2.619 0.859 0.167 |
| gam-session-v3-edpbase+fixed | returning-expert | 1.883 | 1.837 | 1.746 | 0.288 | 0.990 | 94.202 | 123.883 | 131.643 | 0.983 | 0.273 | 0.414 | 0.830 | 0.552 | 91.293 | 0.363 | 32.705 | 95.731 | 48.170 | 39.496 | 4.461 | 35.035 | 0.001 | 25.154 | 25.154 23.939 22.835 12.289 11.515 | 21.095 13.434 2.994 1.518 0.454 |
| gam-session-v3-edpbase+fixed | wanderer | 1.222 | 1.147 | 1.029 | 0.287 | 0.989 | 76.960 | 94.947 | 109.701 | 0.964 | 0.273 | 0.437 | 0.725 | 0.553 | 73.215 | 0.383 | 38.770 | 79.742 | 40.016 | 34.720 | 2.679 | 32.041 | 0.001 | 22.399 | 22.399 19.913 17.992 10.439 8.998 | 18.256 12.293 2.866 1.111 0.193 |
| gam-session-v3-edpbase+fixed | lapsed-returner | 1.522 | 1.443 | 1.314 | 0.298 | 0.985 | 61.769 | 82.781 | 90.267 | 0.940 | 0.274 | 0.460 | 0.741 | 0.560 | 58.614 | 0.379 | 29.212 | 65.531 | 34.719 | 29.993 | 2.665 | 27.328 | 0.000 | 19.985 | 19.985 16.292 13.902 8.602 6.752 | 15.611 10.023 3.009 1.121 0.230 |
| gam+fixed | curious-newcomer | 1.007 | 0.918 | 0.795 | 0.196 | 0.999 | 76.192 | 80.093 | 108.368 | 0.962 | 0.271 | 0.162 | 0.682 | 0.512 | 74.575 | 0.513 | 43.932 | 79.057 | 39.572 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| gam+fixed | single-subject-crammer | 0.704 | 0.629 | 0.526 | 0.218 | 0.980 | 87.615 | 111.606 | 123.276 | 0.974 | 0.271 | 0.193 | 0.700 | 0.577 | 84.617 | 0.481 | 45.561 | 89.834 | 52.233 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| gam+fixed | struggling-repeater | 0.605 | 0.512 | 0.398 | 0.221 | 0.997 | 65.197 | 80.184 | 94.617 | 0.947 | 0.274 | 0.211 | 0.651 | 0.526 | 63.731 | 0.494 | 38.202 | 68.701 | 36.152 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| gam+fixed | returning-expert | 1.882 | 1.835 | 1.745 | 0.218 | 0.998 | 94.202 | 123.883 | 131.643 | 0.983 | 0.273 | 0.190 | 0.829 | 0.522 | 91.337 | 0.447 | 32.333 | 95.731 | 48.176 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| gam+fixed | wanderer | 1.225 | 1.148 | 1.030 | 0.212 | 0.998 | 76.960 | 94.947 | 109.701 | 0.964 | 0.273 | 0.197 | 0.717 | 0.518 | 75.169 | 0.491 | 39.006 | 79.742 | 40.069 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| gam+fixed | lapsed-returner | 1.524 | 1.445 | 1.315 | 0.220 | 0.997 | 61.926 | 82.938 | 90.469 | 0.940 | 0.274 | 0.210 | 0.731 | 0.522 | 60.724 | 0.519 | 29.505 | 65.677 | 33.486 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| draft-rules+fixed | curious-newcomer | 1.006 | 0.917 | 0.795 | 0.213 | 0.985 | 76.192 | 80.093 | 108.368 | 0.962 | 0.271 | 0.369 | 0.683 | 0.560 | 74.707 | 0.480 | 43.934 | 79.057 | 39.542 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| draft-rules+fixed | single-subject-crammer | 0.706 | 0.632 | 0.528 | 0.219 | 0.959 | 87.275 | 111.267 | 122.841 | 0.974 | 0.271 | 0.341 | 0.696 | 0.610 | 85.560 | 0.447 | 46.453 | 89.545 | 55.050 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| draft-rules+fixed | struggling-repeater | 0.605 | 0.513 | 0.398 | 0.206 | 0.976 | 65.037 | 80.025 | 94.399 | 0.947 | 0.274 | 0.339 | 0.652 | 0.575 | 63.781 | 0.458 | 38.264 | 68.550 | 39.219 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| draft-rules+fixed | returning-expert | 1.884 | 1.838 | 1.746 | 0.262 | 0.982 | 94.202 | 123.883 | 131.643 | 0.983 | 0.273 | 0.415 | 0.826 | 0.572 | 92.572 | 0.412 | 32.900 | 95.731 | 48.251 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| draft-rules+fixed | wanderer | 1.224 | 1.149 | 1.030 | 0.228 | 0.981 | 76.960 | 94.947 | 109.701 | 0.964 | 0.273 | 0.397 | 0.717 | 0.569 | 75.394 | 0.450 | 39.181 | 79.742 | 39.984 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| draft-rules+fixed | lapsed-returner | 1.524 | 1.445 | 1.315 | 0.245 | 0.967 | 61.639 | 82.651 | 90.107 | 0.940 | 0.274 | 0.447 | 0.734 | 0.591 | 60.087 | 0.426 | 29.556 | 65.423 | 35.567 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| random+fixed | curious-newcomer | 1.002 | 0.914 | 0.793 | 0.126 | 0.911 | 76.192 | 80.093 | 108.368 | 0.962 | 0.271 | 0.995 | 0.675 | 0.668 | 75.383 | 0.669 | 43.364 | 79.057 | 39.419 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| random+fixed | single-subject-crammer | 0.709 | 0.634 | 0.529 | 0.130 | 0.829 | 85.955 | 109.947 | 121.174 | 0.972 | 0.271 | 0.994 | 0.679 | 0.732 | 84.804 | 0.610 | 47.038 | 88.380 | 64.921 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| random+fixed | struggling-repeater | 0.603 | 0.511 | 0.397 | 0.124 | 0.895 | 64.794 | 79.782 | 94.088 | 0.946 | 0.274 | 0.994 | 0.640 | 0.680 | 64.195 | 0.653 | 37.822 | 68.335 | 46.563 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| random+fixed | returning-expert | 1.885 | 1.838 | 1.747 | 0.138 | 0.893 | 94.202 | 123.883 | 131.643 | 0.983 | 0.273 | 0.993 | 0.820 | 0.686 | 92.938 | 0.553 | 33.017 | 95.731 | 48.367 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| random+fixed | wanderer | 1.223 | 1.148 | 1.029 | 0.128 | 0.903 | 76.960 | 94.947 | 109.701 | 0.964 | 0.273 | 0.994 | 0.709 | 0.675 | 76.153 | 0.623 | 38.841 | 79.742 | 40.255 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| random+fixed | lapsed-returner | 1.523 | 1.444 | 1.314 | 0.130 | 0.897 | 61.498 | 82.510 | 89.909 | 0.939 | 0.274 | 0.994 | 0.722 | 0.677 | 60.968 | 0.646 | 29.517 | 65.285 | 38.440 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| oracle-order+fixed | curious-newcomer | 1.116 | 1.031 | 0.898 | 0.141 | 0.932 | 76.192 | 80.093 | 108.368 | 0.962 | 0.271 | 0.995 | 0.672 | 0.642 | 75.186 | 0.476 | 50.401 | 79.057 | 39.319 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| oracle-order+fixed | single-subject-crammer | 0.792 | 0.713 | 0.592 | 0.132 | 0.782 | 85.619 | 109.611 | 120.769 | 0.971 | 0.271 | 0.995 | 0.667 | 0.761 | 84.420 | 0.474 | 54.323 | 88.085 | 67.328 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| oracle-order+fixed | struggling-repeater | 0.689 | 0.598 | 0.468 | 0.134 | 0.911 | 64.933 | 79.921 | 94.276 | 0.946 | 0.274 | 0.995 | 0.659 | 0.661 | 64.119 | 0.483 | 41.124 | 68.473 | 45.386 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| oracle-order+fixed | returning-expert | 2.060 | 1.987 | 1.855 | 0.141 | 0.867 | 94.202 | 123.883 | 131.643 | 0.983 | 0.273 | 0.994 | 0.690 | 0.708 | 93.050 | 0.490 | 61.119 | 95.731 | 48.446 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| oracle-order+fixed | wanderer | 1.340 | 1.256 | 1.115 | 0.140 | 0.914 | 76.960 | 94.947 | 109.701 | 0.964 | 0.273 | 0.994 | 0.676 | 0.663 | 76.033 | 0.479 | 49.813 | 79.742 | 40.209 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
| oracle-order+fixed | lapsed-returner | 1.643 | 1.552 | 1.396 | 0.138 | 0.899 | 61.450 | 82.462 | 89.847 | 0.939 | 0.274 | 0.995 | 0.673 | 0.674 | 60.755 | 0.519 | 39.705 | 65.242 | 38.346 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 0.000 0.000 0.000 0.000 | 0.000 0.000 0.000 0.000 0.000 |
