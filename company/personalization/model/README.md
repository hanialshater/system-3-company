# Personalization phase A model (probability + cs pilot)

owner: personalization-lead · board: W-1493 · decision and change log: `company/decisions/2026-10-16-personalization-model-v0.md`

Offline only. Nothing here is served to a learner, and **nothing in `src/` may import this folder** until its home is ruled (W-1498). `self-check.mjs` fails if `src/` does.

| File | What | Who may read it |
|---|---|---|
| `model.ts` | Fingerprint signals (with privacy status), needs and their shape curves, cold-start dampener, `pwl()`, `detect()`, `explainNeeds()`, `fingerprintFrom()`, composer weights, constraints and the engagement floor, the objective, the policy list, `checkModel()`, `inspect()` | serving code (later), the simulator, an inspection page |
| `personas.ts` | 6 simulation personas: name, description, fingerprint means, latent ground truth | **the simulator and inspection only; never serving code** |
| `self-check.mjs` | Runs invariants and boundaries, prints need scores per persona | anyone: `node company/personalization/model/self-check.mjs` |

Plain TypeScript, erasable syntax only, no dependencies: Node 22.18 or later runs the `.ts` files directly.

## The change rule (founder, 2026-10-16, founder brief §6)

The curves live in code. To change a curve, weight, constraint, signal or persona:

1. Edit the number **and its `why` / comment**. Keep the word "guess" until data supports the value.
2. Bump `MODEL_VERSION` (model.ts) or `PERSONAS_VERSION` (personas.ts).
3. Add one line to the change table in the decision record: version, date, what, **reason**, by.
4. Commit with the reason in the message. If the edit follows a simulator run, say so.
5. Run the self-check. It fails if the new version has no decision line.

There is no curve-editing tool.

## Interface for the simulator (W-1494) and the inspection page (W-1503, W-1504)

- `fingerprintFrom(history, dims, now, {predictedCorrectly})` → `Fingerprint`. Pure. `predictedCorrectly:false` is the recall-only fallback if W-1495 refuses that input.
- `detect(fp)` → `{repair, build, breadth, stretch}`. `explainNeeds(fp)` gives the same scores with each term's `x`, `y = pwl(x)`, weight, contribution and reason, plus the dampener.
- `COMPOSER`: weights, relational dim constants (`addr`, `readiness`, `novelty`), hard constraints, `engagementGuardrail` (a floor, never a term). `ComposeInput`, `Pick`, `ComposeFn` are the composer's types; the composer is W-1494's to build. `ComposerTermName` has no engagement member on purpose.
- `OBJECTIVE` (recall over all lessons completed; breadth guardrails as top-domain share and distinct concepts since model-v0.2, and a prerequisite-order guardrail) and `POLICIES` (the 7 to compare). The pass criterion is W-1496's and is written before the first run.
- `inspect()` / `curveViews()`: the whole model as JSON-serialisable data, every curve as points with its reason and its signal's privacy status.
- A policy must never read `Persona.latent` or a persona id; the simulator jitters `fingerprintMeans` and scores the latent learner.

Ownership note: per the founder (company/decisions/2026-10-16-founder-personalization-org.md), the next steps that were routed to other teams (W-1496, W-1497, W-1498, W-1503) are "personalization org, pending role approval". The privacy review (W-1495) stays company-wide.

model-v0.2 (W-1512): compose one card then recompute, overlap/slot terms removed, surprise gated off until real ratings (company/personalization/2026-10-16-misconception-strength-ratings-plan.md), floor counting rule written into `antiBubbleFloor`. Decisions per simulator finding: the decision record's model-v0.2 section.
