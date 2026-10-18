# Dims index v1: where it is, what it holds, prerequisite coverage per domain (D2)

owner: lesson-dims-owner · run: dims-d2-1017 · date: 2026-10-17 · for: vp-personalization (W-1572, batch 5 §6 D2), personalization-engineer (S1), learner-model-engineer (W-1498), personalization-eval
brief: company/ops/mailboxes/dispatcher/20261017T184941348Z-vp-personalization-4006e3ed.md · branch: perso-m1-d2

## 1. What was built

| File | What |
|---|---|
| `src/lib/learner/dims-index.generated.ts` | The index. `export const dims: Record<slug, DimsEntry>` and `DIMS_HEADER`. A plain TypeScript module, so it ships inside the bundle that imports it: no runtime fetch at all. Not personal. |
| `company/personalization/dims/build-index.mjs` | The generator (`--check` exits 1 if the committed file is stale). Inputs, read-only: `src/demos/*/*/meta.json`, `content/curriculum/*.json`, the msr-v1 anchors file, `src/lib/visibility.ts`. |
| `tests/personalization/dims-index.test.mjs` (+ `dims-loader.mjs`) | `npm run test:dims`, added to `npm run verify`. |

Entry: `slug, domain, concept, level, prerequisites, successors, status, pilot` and, only where a rating record exists, `misconceptionStrength, strengthSource`. The derivation is the simulator's (company/personalization/model/sim/catalog.mjs), widened to every domain. It is written out in the generator's header comment.

- **Lessons:** 946, every lesson `statusVisible` lists with the default environment (published 711 + review 235). The 28 drafts are out. `status` is meta.json's own status.
- **Pilot:** 230 (`pilot: true`: probability 77, cs 153). The default-order rule over these 230 gives the vector in company/personalization/policies/default-order-rule.md (sha256 `04bf48f4…3853`), and it equals `feedOrder("all")` with non-pilot lessons removed (test 4).
- **misconceptionStrength:** on 12 lessons only, the msr-v1 anchors (company/personalization/dims/2026-10-16-misconception-strength-anchors.json). They have one rater and agreement is not measured yet. Every other entry leaves the field out. The header says so, and no placeholder is written.
- **level:** taken from meta.json for all 946 entries (0 fallbacks).

## 2. Two differences from the dims criterion 3b scored (for vp-personalization and S1)

1. **Successors are catalogue-wide.** 19 of the 230 pilot entries also list successor concepts in other domains (for example `base-rates` → `ai:accuracy-paradox`). Keep only the probability: and cs: successors and every pilot entry equals the simulator's catalogue entry exactly (test 5b). If the candidate reads `successors`, S1 should filter them that way when it builds pilot-only `dims`, or say why not.
2. **12 real ratings instead of the simulator's hash placeholder.** The surprise gate is shut (company/personalization/2026-10-16-misconception-strength-ratings-plan.md). If the candidate reads `misconceptionStrength` at all, S1 should drop the field from the pilot `dims` it passes until the eval's agreement readout opens the gate.

## 3. Prerequisite coverage per domain (lessons listed by the feed, 2026-10-17)

"Taught" means the prerequisite concept is the concept of at least one listed lesson.

| domain | lessons | ≥1 prerequisite | ≥1 same-domain prerequisite | same-domain prerequisite taught | ≥1 successor |
|---|---|---|---|---|---|
| ai | 63 | 53 (84%) | 47 (75%) | 47 (75%) | 30 (48%) |
| behavioral | 4 | 4 (100%) | 1 (25%) | 0 (0%) | 3 (75%) |
| big-ideas | 2 | 0 (0%) | 0 (0%) | 0 (0%) | 0 (0%) |
| chemistry | 65 | 49 (75%) | 48 (74%) | 48 (74%) | 41 (63%) |
| **cs (pilot)** | 153 | 131 (86%) | 128 (84%) | 128 (84%) | 65 (42%) |
| economics | 94 | 77 (82%) | 71 (76%) | 71 (76%) | 47 (50%) |
| geography | 60 | 49 (82%) | 48 (80%) | 48 (80%) | 25 (42%) |
| history | 12 | 11 (92%) | 6 (50%) | 4 (33%) | 8 (67%) |
| life | 68 | 53 (78%) | 49 (72%) | 46 (68%) | 28 (41%) |
| lifehacks | 200 | 15 (8%) | 15 (8%) | 15 (8%) | 12 (6%) |
| math | 80 | 52 (65%) | 52 (65%) | 52 (65%) | 26 (33%) |
| physics | 68 | 46 (68%) | 46 (68%) | 46 (68%) | 33 (49%) |
| **probability (pilot)** | 77 | 57 (74%) | 57 (74%) | 57 (74%) | 36 (47%) |
| all | 946 | 597 (63%) | 568 (60%) | 562 (59%) | 354 (37%) |

What this means for widening past the pilot: most domains have about as many same-domain edges as the pilot does (65 to 80%). Life Hacks is the outlier at 8%, and the candidate's prerequisite term would have almost nothing to work with there. behavioral, big-ideas and history are too small to score on their own. These are counts, not a claim that the candidate generalises; criterion 3b scored the pilot only.

## 4. Open

- **W-1498 has not placed the dims index.** The principal-engineer review covered only where the model lives (company/engineering/reviews/2026-10-16-w1537-check-wiring.md). I put the index under `src/lib/learner/`, the path the org proposal names for the personalization org (company/ceo-office/2026-10-16-personalization-org-proposal.md T1, T6). That path is tier 2. learner-model-engineer to confirm or move it. A move does not change the file's contents.
- **Freshness.** The index is committed and `test:dims` fails when it is stale. The test runs in `verify`, not in `check`, so a status change made on perso-m1 without a rebuild fails verify only. Running the generator inside `npm run build` or `registry` would need a package.json or tools/company.mjs (protected) change. That is S1's or principal-engineer's call.
- **Bundle.** The file is 240 KB raw (41 KB gzip). The built-output test caps a client chunk at 300 KB raw. If S1 needs only the pilot, a pilot-only module would be about a quarter of that size. The keys are unquoted, so `"concept"` never appears quoted in the source, which keeps the W-946 chunk ratchet safe (test 5a). S1 should confirm this on the built chunks.
