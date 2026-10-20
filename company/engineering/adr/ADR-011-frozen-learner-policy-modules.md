# ADR-011: Served learner policies are frozen single files, byte-copied with a hash lock into src/lib/learner/policies/, run on the device by one candidate-agnostic glue, selected by the value of one build flag

status: proposed
date: 2026-10-20
deciders: principal-engineer (author, run pe-edd016-session-serving-1020); for acceptance: the EDD-016 tier-2 reviewers (principal-engineer-ops, platform-engineer), vp-personalization (owner of company/personalization/ and its self-check), personalization-engineer (owner of the glue, EDD-010 E13)
EDD: [EDD-016](../edd/EDD-016-session-composer-serving.md) · precedent: EDD-010 review C1 and D3 (company/engineering/reviews/2026-10-17-edd-010-review.md)

## Context

The personalization org builds policies offline in company/personalization/ (model, simulator, personas, frozen candidates under policies/) and edits them under a change rule with version bumps. Two candidates now have a path to the live feed: reachable-v3 (EDD-010, AMD-015) and the EDP-faithful session composer (EDD-016, founder decision 2026-10-20). W-1498's boundary keeps `src/` from importing the model, and its revisit condition asks for "a real home under `src/lib/` behind an EDD and ADR" when a model is served. My EDD-010 review (D3) said I would write this ADR when a second candidate appeared. Reversing the placement later is expensive: once a bundle imports policy code from somewhere, every later candidate copies the pattern, and paths.json tiers, privacy tests and release identity all hang off it.

## Decision

1. **A served policy is one frozen, import-free, I/O-free file** in company/personalization/policies/, with a build note recording its sha256. It holds its typed numbers and pure functions. It holds no personas, no simulator hooks, no `inspect()` and no clock or randomness. It is never edited after freeze: a change is a new candidate with a new id.
2. **The readout scores that file, by hash.** The readout manifest records the sha256 that will serve.
3. **Serving uses a byte copy** at `src/lib/learner/policies/<candidate>.ts`. A check-time test requires its sha256 to equal the build note's and the readout manifest's. `src/lib/learner/policies/index.ts` is the copy's only importer and exports `CANDIDATE_ID`, `CANDIDATE_SHA256` and an adapter to the glue's interface.
4. **One glue for every candidate** (`src/lib/learner/new-lesson-order.ts`): history building, pins, fill, failure path, reason keys. It holds no policy. Its replay tests run against every candidate it can import, so a glue change that alters any candidate's display fails check.
5. **One build flag selects at most one candidate:** `NEXT_PUBLIC_NEW_LESSON_ORDER`, on only when its value equals a candidate's `CANDIDATE_ID` exactly. One variable means two candidates can never be on together. The deploy script pins it (W-1783).
6. **paths.json:** `src/lib/learner/**` is tier 2, class data (W-1792). company/personalization/** stays tier 0, which is acceptable only because nothing there is bundled.
7. **The boundary is enforced in `npm run check`** by the rewritten self-check rules in EDD-016 §10.1. They are rewritten in the commit that first adds `src/lib/learner/policies/`.

## Consequences (good and bad)

- Good: what serves is provably what was scored (one hash end to end). The offline lab can keep changing `model.ts` without changing what learners see. Personas cannot reach a bundle without failing check. Tier 2 applies to served policy code because it lives under `src/`.
- Good: adding a candidate is a copy, a hash and a flag value, not a new framework.
- Bad: two copies of each served file exist. T1 turns drift into a check failure, but a reviewer must still read the copy commit.
- Bad: the single-file freeze is extra work for learner-model-engineer (writing the file and an equivalence test against model.ts + sim/composer.ts).
- Bad: the shared glue couples EDD-010 and EDD-016. A glue fix needs both candidates' replay tests to pass.
- Bad: the client pays the candidate's bytes on `/` when the flag is on (measured per candidate, 300 KB chunk cap).

## Alternatives rejected and why

- **Import from company/ (alias or relative path).** company/** is tier 0, so a served change would classify tier 0. It puts `inspect()` and the personas one import away from a bundle, and the change rule's version bumps would ship without a readout (EDD-010 review F1; W-1498 rejected (a)).
- **Move the model into src/lib/ and let the simulator import it from there.** Every offline experiment then edits served code, and the readout no longer pins what ships (W-1498 rejected (b)).
- **A separate flag per candidate.** Two variables to pin and a combination that must be refused in code; nothing gained.
- **Server-side composition.** Anonymous learners could not get the same order (privacy N2, T1/P4: same history, same order regardless of sign-in), and it adds a route and per-request reads of minors' rows (privacy §7, counsel question).
