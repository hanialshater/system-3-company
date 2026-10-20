# Personalization phase A model (probability + cs pilot)

owner: vp-personalization (was personalization-lead until 2026-10-16) · board: W-1493 · decision and change log: `company/decisions/2026-10-16-personalization-model-v0.md`

Offline only. Nothing here is served to a learner, and **nothing in `src/` may import this folder** (W-1498, below). `self-check.mjs` fails if `src/` does.

| File | What | Who may read it |
|---|---|---|
| `model.ts` | Fingerprint signals (with privacy status), needs and their shape curves, cold-start dampener, `pwl()`, `detect()`, `explainNeeds()`, `fingerprintFrom()`, composer weights, constraints and the engagement floor, the objective, the policy list, `checkModel()`, `inspect()` | serving code (later), the simulator, an inspection page |
| `personas.ts` | 6 simulation personas: name, description, fingerprint means, latent ground truth | **the simulator and inspection only; never serving code** |
| `self-check.mjs` | Runs invariants and boundaries, prints need scores per persona | anyone: `node company/personalization/model/self-check.mjs`; runs automatically in `npm run check` via `npm run test:personalization` (W-1537) |

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
- **model-v0.3.0 (session composer, beside composer-v0.2):** `COMPOSER_SESSION` (version `composer-v0.3-session`; `sessionSize` 5; `servingMode` compose-session-serve-in-order; `v1` coefficients {base, onRem, onCov per need, slotDecay, attentionCost} with a `why` per number; `edits` [target, path, from, to, reason]; `ablations`; `circularLabel`), `applyEdits(coeffs, edits)` (pure; throws on a stale `from`), `sessionCoefficients("v1" | "v3")`, types `SessionTermName`, `SessionCoefficients`, `SessionEdit`, and `PHASE_A_MODEL_VERSION` (= model-v0.2.2: what every phase A policy reads and records). Nothing a phase A policy reads changed. Code: `sim/composer-session.ts`; policies `gam-session`, `gam-session-v3`, `gam-session-no-cov` (simulator only, not in `POLICIES`). HQ CLI: `meta` gains `policies.session` and `session` {version, size, servingMode, recompute, v1, v3, edits, why, ablations, circularLabel}; `compare` rows gain `circular` {label, needCoverageRate, domainDiversity, distinctDomainsServed} and the document gains `circularLabel`; new `sandbox --persona --variant=v1|v3 [--seed]` (schema `personalization-hq-sandbox-v0`, unrounded), recomputable by `sim/sandbox-reference.mjs` with no model import. Build note: company/personalization/policies/gam-session-build-note.md.
- **model-v0.4.0 (session composer only, W-1999):** `SessionCoefficients` gains `addrUse` (v1 .35, guess; editable by a `["session", "addrUse", from, to, reason]` row): a pick lowers `remaining` and raises `coverage` by `addrUse × addr` (`applyAddr(a, remaining, coverage, use)`), the scoring addr is unchanged. The attention budget's gain is EDP's: `resolvableGain()` = Σ min(remaining, addrUse × addr) > attentionCost. The default card carries no `cov:*` terms (scored 0, shown). `checkModel()` requires 0 < addrUse ≤ 1 and a reason. Minor bump because the coefficient shape (sandbox document, any port) gained a field. Build note §8.

Ownership note: per the founder (company/decisions/2026-10-16-founder-personalization-org.md), the next steps that were routed to other teams (W-1496, W-1497, W-1498, W-1503) are "personalization org, pending role approval". The privacy review (W-1495) stays company-wide.

model-v0.2 (W-1512): compose one card then recompute, overlap/slot terms removed, surprise gated off until real ratings (company/personalization/2026-10-16-misconception-strength-ratings-plan.md), floor counting rule written into `antiBubbleFloor`. Decisions per simulator finding: the decision record's model-v0.2 section.

## Where the model lives and how the app reaches it (W-1498, proposed 2026-10-16)

status: **proposed** by learner-model-engineer (Ifeoma, run lme-w1503-hqlab-1016) · review: principal-engineer (tier review, board), hq-engineer (shared HQ code), vp-personalization (owner of this folder and of `self-check.mjs`)

**vp-personalization ack (W-1520, 2026-10-16, run vp-lane14-batch-1-1016):** I acknowledge the boundary change to `self-check.mjs` without amending it. The two rules are: no `import`, `import()` or `require` of this folder from `src/`, and `child_process` near this path only in `src/lib/hq-personalization-server.ts`. They are stricter than the old rule (no `src/` file naming the folder in an import), and they keep the model out of every bundle. I ran self-check at model-v0.2.1 and it passed with the rules in place. This ack is the folder owner's only. It is not the principal-engineer tier review of W-1498 or hq-engineer's W-1519. One condition carries forward: when phase B gives serving code a home under `src/lib/`, the gateway rule must be rewritten in the same commit, not loosened afterwards.

**Context.** The founder asked for the simulation in HQ (founder brief §7, W-1503). The page needs the model (`inspect()`, `explainNeeds()`) and the simulator. The model must stay free of app imports, must not become serving code by accident, and is edited in parallel (`MODEL_VERSION` bumps). The `.ts` files use Node type stripping and the simulator runtime is `.mjs` importing `.ts` with extensions, which the Next build and `tsc` do not accept without config changes.

**Decision.** The model and simulator **stay here**. The app **does not import them**. HQ runs `sim/hq-cli.mjs` as a separate Node process and reads one JSON document from stdout (schemas `personalization-hq-meta-v0`, `personalization-hq-compare-v0`, and the trace `personalization-sim-trace-v0`). Exactly one file runs it: `src/lib/hq-personalization-server.ts`, with arguments only from `parseSimRequest()` (id-shaped, bounded integers, no shell). It is local only: it refuses in production, even with `HQ_PUBLIC=1`. `self-check.mjs` now enforces two rules: no `import` / `import()` / `require` of this folder anywhere in `src/`, and no `child_process` next to this path except in that one file. Other mentions, such as a library link or a comment, are allowed.

**Why this is the smallest change.** It needs no change to `tsconfig.json`, `next.config.mjs` or `package.json`, adds no dependency, and keeps the model out of the client and server bundles. The only coupling is the JSON contract, which is versioned by its schema name. A run takes about 0.3 s, a 7-policy × 5-seed comparison for one persona about 1.5 s, so precomputing traces was not needed.

**Rejected.** (a) A tsconfig path alias and a bundler import. That needs `allowImportingTsExtensions` or an import rewrite, and it puts `catalog.mjs`'s `import.meta.url` root inside a bundle. It also makes model code part of the app build, which is the first step towards serving it without W-1495 or an experiment. (b) Moving the module to `src/lib/personalization/`. That has the same build coupling, and it places personas (simulation only) next to serving code. (c) Precomputed JSON only. It allows no arbitrary seed, and 0.3 to 1.6 MB per trace is too large to commit.

**Revisit when** the model is served (phase B). The serving composer will then need a real home under `src/lib/` behind an EDD and ADR. The simulator and personas stay offline.

**Objections and costs.** A process per request (fine for one local founder; not for a deployed HQ). The CLI needs Node 22.18 or later (the server reports the version on failure). The type mirror in `src/lib/hq-personalization.ts` can drift from the CLI output. `tests/hq/personalization.test.mjs` runs the real CLI to catch that drift.
