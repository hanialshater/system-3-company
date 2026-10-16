# Plan: real `misconceptionStrength` ratings on the phase A pilot

owner: personalization-lead (Mateo) · date: 2026-10-16 · board: W-1512 (finding 3); ratings W-1515; eval asks W-1516 · status: plan, nothing rated yet
contract: `COMPOSER.surpriseGate` in company/personalization/model/model.ts (model-v0.2) · decision: company/decisions/2026-10-16-personalization-model-v0.md
org: company/ceo-office/2026-10-16-personalization-org-proposal.md (T6, card N4 lesson-dims-owner, card N1 personalization-eval; both pending founder approval)

## Why

Surprise is switched off in model-v0.2. The only `misconceptionStrength` on the pilot is a slug hash (company/personalization/model/sim/catalog.mjs), so the term ranked lessons by noise times readiness. To turn surprise on, two things are needed: real ratings with a `strengthSource`, and the eval's agreement readout (a version bump that sets `surpriseGate.active`). Until both exist, every phase A number is about a composer without surprise.

## What is rated

- **Set:** the 230 visible pilot lessons (probability 77 + cs 153, status published or review), the same set `catalog.mjs` loads. If the pilot widens to math (a v0.3 candidate, decision record finding 2), 80 more lessons.
- **Scale (the rubric):** how strongly the lesson's stated `misconception` pulls the prediction of a learner who does not yet know the concept.
  - **1, weak:** a newcomer's guess would split, or the misconception is a minor slip that the hook's framing barely invites.
  - **2, moderate:** most newcomers would predict the misconception from the hook as written.
  - **3, strong:** a robust intuition that the hook invites directly, and that people who have met the topic before still fall for (the birthday-paradox kind).
- **Rater reads:** `hook`, `misconception`, the predict card's options (Demo.tsx, via `npm run walkthrough -- <slug>`), `learner`. **The rater does not read:** recall results, any simulator output, composer weights, or another rater's score.
- **Record per lesson:** slug, strength 1 to 3, `strengthSource: "dims-owner"`, rater id, date, and a one-line reason. These records live in the derived dims index, and W-1498 decides where that is. They do not go into meta.json, so no shared schema changes (org proposal T6).

## Who, in order

1. **lesson-dims-owner (pending, card N4)** writes the final rubric from this draft, calibrates it on 12 anchor lessons (4 per level, with the anchors' reasons published), then rates the 230.
2. **personalization-eval (pending, card N1)** second-rates a **blind 20% sample (46 lessons)** chosen by the eval. It reports exact agreement and quadratic-weighted kappa. Proposed bar, which the eval may change before seeing data: weighted kappa ≥ .6. Below the bar, the rubric is revised and the sample is re-rated. The surprise gate stays shut.
3. **personalization-lead** bumps the model (`surpriseGate.active: true`) only after the eval's readout. The version line cites the readout.
4. **Classifier pass (later, wider catalog):** an agent reads hook, misconception and predict options, and is calibrated against the step 1-2 ratings, never before they exist. It writes `strengthSource: "classifier"`, with dims-owner spot checks.
5. **Data (phase B):** the aggregate wrong-prediction rate per lesson across learners replaces the ratings (`"data"`). This waits on W-1495 (per-lesson aggregate rates as lesson dims) and W-706.

**Separation that keeps the judge independent:** the simulated learner must not read these ratings. If surprise is tested in the simulator, personalization-eval gives the learner its own hidden per-lesson misconception pull, and the ratings are a noisy view of that pull. If the judge read the same number the composer reads, surprise would grade itself. This is a requirement on W-1513, not on the composer.

## Meanwhile (both roles pending)

- **Done in model-v0.2:** surprise is locked off twice, by the global `active: false` and by a per-lesson source check. A placeholder can never leak into a score. `gam` and `gam-off-surprise` are identical until the gate opens. That is expected, not a bug.
- **I do not rate the lessons myself,** and neither does learner-model-engineer. We own the weights and the composer that would consume the ratings, and rating would put the builder on both sides. The CMs are not asked either: T6 moves rating in-org, and the founder's self-contained-org note routes the steps here (company/decisions/2026-10-16-founder-personalization-org.md).
- **No classifier pass yet:** without human ratings there is nothing to calibrate it against.
- **What I will do now:** this rubric draft. A board item, held by me for lesson-dims-owner, that names the set, rubric and record (W-1515). A board item, held by me for personalization-eval with W-1513, carrying the separation requirement above plus the finding-2 and finding-4 asks (W-1516). The phase A exit stays as written: it is judged on a composer without surprise, and surprise gets its own ablation once rated.
- **Not blocking:** phase A can run its criterion (W-1496) without surprise. The ratings block only the *surprise* keep/kill decision.

## Open

- Founder approval of cards N1 and N4 (org proposal), which gates steps 1 and 2.
- W-1498: where the derived dims index (and these ratings) lives.
- W-1497: evidence on whether surprise (hypercorrection) helps recall at all. If it does not, the ratings still serve the stretch/readiness trace, but the surprise term would be retired.
- Before the gate opens, from privacy-reviewer's pedagogy flag (company/reviews/_privacy/2026-10-16-personalization-model-inputs.md, the note after the signal table): a wrong prediction on a lesson served *for* its surprise counts as a miss in `missRecent` and can trigger repair. Decide whether a surprise-served miss is discounted, and check that the reason shown stays true (P3). That review's lesson-rating row names CM and classifier sources; W-1514 confirms that `dims-owner` falls under the same row.
