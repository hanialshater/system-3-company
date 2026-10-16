# Personalization phase A model in code (needs, signals, composer terms, personas): change log

owner: personalization-lead (Mateo)
date: 2026-10-16
status: active (offline only; nothing served)
class: personalization
board: W-1493
code: company/personalization/model/ (model.ts, personas.ts, self-check.mjs, README.md)

## Decision

The phase A model for the probability + cs pilot is a dependency-free TypeScript module, not a JSON file, as the founder ratified with a change to Q3 (company/personalization/2026-10-16-founder-brief.md §6). The design is company/personalization/2026-10-16-brief-response.md §2. Every curve and weight is a hand-set guess with its reason written beside it. Nothing in `src/` imports it until its home is ruled (W-1498, now "personalization org, pending role approval" per company/decisions/2026-10-16-founder-personalization-org.md). The founder's inspectability ask (founder brief §7, W-1503, W-1504) is met by keeping every number and reason as plain data and exporting `explainNeeds()`, `curveViews()` and `inspect()`.

**Change rule:** every edit to a curve, weight, constraint, signal or persona bumps `MODEL_VERSION` or `PERSONAS_VERSION`, gives the reason in the commit message, and adds one line below. `self-check.mjs` fails if the current version has no line here. There is no curve-editing tool.

## Change lines

| Version | Date | What changed | Reason | By |
|---|---|---|---|---|
| model-v0.1 | 2026-10-16 | First version: 7 curve signals with privacy status, 4 needs (repair, build, breadth, stretch) with 7 shape terms, cold-start dampener, composer weights, constraints, engagement floor, objective, policies, inspect() | Founder ratified §6a with curves in code (founder brief §6); values are response §2.2 and §2.5 guesses | personalization-lead |
| personas-v0.1 | 2026-10-16 | First version: 6 simulation-only personas with names, descriptions, fingerprint means and latent ground truth | Response §2.3; each persona tests a named failure (cold start, bubble, repair, stretch, depth, recall-only repair) | personalization-lead |

## Objections

- **personalization-lead (self, O3 in the response):** 7 shape terms (about 50 numbers with breakpoints) plus composer weights is many free numbers for hand-tuning; edits that chase simulator results will overfit the simulator. **Answer:** the pass criterion (W-1496) is written before the first run, and an edit made after seeing a run must say so in its reason line.
- **personalization-lead (self):** `missRecent` and `successRecent` read `predictedCorrectly`, which W-1495 has not ruled on for ordering. **Answer:** `fingerprintFrom(..., {predictedCorrectly:false})` gives the recall-only fallback; offline simulation uses no learner data; nothing is served before W-1495.
