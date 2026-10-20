# A more faithful EDP Orchestrator implementation: offline model, HQ lab, then the live feed

owner: vp-personalization
date: 2026-10-20
status: decided (founder); build routed to owners
class: product
route: vp-personalization → learner-model-engineer (composer code) → applied-scientist-personalization (numbers and reasons) → personalization-eval (scoring, independent) → hq-engineer / personalization-engineer (HQ lab) → principal-engineer (serving EDD) → privacy-reviewer, analytics-steward (before anything live)
recorded by: chief-of-staff

## What the founder said

After a comparison of `company/personalization/reference/edp-orchestrator/` against the phase A model, the stated-fit feed recipe and HQ (conversation, 2026-10-20):

> Yes I want better and more faithful implementation

Answers to the three questions put back:

1. **Where:** all three: the offline model and simulator, the HQ lab in the EDP style, and the live feed.
2. **Curve editing:** a **sandbox drag in HQ**: curves can be dragged and the composed session recomputes live in the browser; nothing is saved; a "copy as code diff" gives the edit to apply in `model.ts` under the change rule.
3. **Policy metrics:** **both, labelled**: EDP-style need coverage and diversity per policy, labelled "circular: diagnostic only", beside simulated recall from the independent learner.

## What this changes and what it does not

- **Changes founder brief §6 Q3 in one respect only.** The curves still live in code and are changed only by the change rule (`company/personalization/model/README.md`). The no-tool ruling is narrowed: a browser-only, non-saving sandbox is allowed. A tool that writes curves back is still not.
- **The EDP parts the phase A model dropped come back as a new composer version beside the stopped one**, not as an edit of it: a multi-card session filled greedily with `remaining` and `coverage` state, `on_cov` (complementarity: a lesson scores higher once a related need is already covered), `slot_decay`, an attention cost per card (EDP's budget), and the v1 ↔ v3 comparison. `gam` at model-v0.2.2 and every existing policy stay byte-identical (policy-golden test).
- **What still binds** (founder brief §4 and the phase A readout): EDP's dwell, tab-switching, zoom and device signals stay forbidden inputs (AMD-008 P2, `FORBIDDEN_INPUTS`); personas stay simulation fixtures; engagement is a guardrail, not a term; the builder never scores its own policy (personalization-eval does).
- **The live feed.** Serving the new composer needs, in order: a passing readout under a criterion frozen before the run, the serving EDD and ADR for a home under `src/lib/` (W-1498 "revisit when served", with the gateway rule rewritten in the same commit), a privacy read of the serving inputs (W-1495 conditions), a registered experiment (analytics-steward), and the founder's approval of that specific deploy. This decision asks for that path to be prepared. It does not approve serving or a deploy.

## Objections

- **vp-personalization (standing, from the readout):** the one-card GAM failed phase A with a mean edge of +0.001 in recall; adding EDP's session machinery may not change that. **Answer:** the session composer is scored like any candidate, and a FAIL is reported unedited. Faithfulness to the reference is the founder's goal; the readout decides what serves.
- **personalization-eval (standing, brief response C5):** EDP's coverage metric is circular. **Answer:** shown only with the label "circular: diagnostic only", never as a pass score, and always beside simulated recall.
