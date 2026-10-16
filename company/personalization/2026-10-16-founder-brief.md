# Personalization: the founder's brief (F-08 answered)

owner: founder · recorded by: chief-of-staff · date: 2026-10-16 · handed to: personalization-lead (Mateo)
status: **the founder's brief.** It replaces the question "what does the founder mean by personalization" that `README.md` and `2026-10-16-draft-founder-brief.md` were waiting on. The draft is now input, not the plan: where it is narrower than this brief, this brief wins (draft objection O1 is answered: the founder means more).

## 1. The founder's words (verbatim, 2026-10-16)

> I want to create personas, fingerprints, customer needs, dims per demo then cover customer needs with the right demo provide both surprise and novelty but also engagement. The demos need to have features for that to happen. Later on we will need to keep track of what the customer learn and recommend demos to maximize their learning in a category, give them badges and points for that as well.
>
> It is a big domain, here is example html demo for related experience. I am thinking of software v3 where we use GAM and you edit the curves so it is ML model traceable in code and fast as well, then we can tune from customers data.

(Spelling normalised; nothing else changed.)

## 2. The reference: EDP Orchestrator (founder's own prior work)

Stored at `company/personalization/reference/edp-orchestrator/`:

- `edp-orchestrator-journey.html`: the runnable demo as sent (self-unpacking bundle, open in a browser).
- `src/`: the readable sources, unpacked by `unpack.py` (no code from it runs in our app).
  - `edp-engine.js` (~6 KB): the whole model. `detect()` turns a feature vector into need scores with **piecewise-linear shape functions per signal, weighted and summed** (a GAM with editable curves). `compose()` greedily fills N slots from a module registry: each module has `base`, `addr` (how much of each need it resolves), `on_rem` (bonus for remaining need), `on_cov` (complementarity or overlap with needs already covered), `slot_decay`, a repeat penalty for `seen` modules, and an **attention budget** (a candidate must resolve more than a cost to be shown). `evaluate()` simulates 240 jittered sessions over the personas and compares 7 policies (adaptive, fixed calibrated page, one-pass ranking, v1 weights, random, epsilon-greedy, noisy greedy).
  - `problem-and-signal-catalog.js`: the need catalog by journey stage and the signal catalog that feeds the fingerprints.
  - `page-registry.js`: a **fingerprint per page** (which subset of needs applies there).
  - `page-extensions-gam-v3.js`, `orchestrator-inline.js`: the GAM Curves view (drag a curve, see the page recompose; v1 vs v3), the policy tab and the explanation of every slot pick by its score terms.

## 3. How the founder's words map onto our product (chief-of-staff's reading; Mateo to correct)

| EDP Orchestrator | System 3 Company (proposed reading) |
|---|---|
| Shopper persona (feature vector) | Learner persona: a named feature vector (e.g. curious newcomer, exam crammer, returning expert) |
| Signals / fingerprint | Learner fingerprint: signals we may read (predictions right/wrong, recall, revisits, stated subjects, "less of this", lessons seen) |
| Journey problem (need), detected by GAM curves | Learner need: e.g. surprise, novelty, mastery / repair, breadth, momentum. Detected from the fingerprint by editable shape curves |
| Widget with `addr` / `on_cov` / `slot_decay` | **Lesson with dims**: per-lesson scores of how much it serves each need (its "features"), plus domain, concept, prerequisites, difficulty |
| Page with 6 slots + attention budget | A feed session: the next N cards |
| Policies simulated side by side | Rules, GAM-composer, fixed order, random, epsilon: compared offline on simulated personas before any real learner |
| v1 → v3 weights tuned | Curves start hand-set, are traceable in code, then are tuned from learner data |

**Later phase (the founder's "later on"):** a per-category learner model (what this learner has learned), recommendations that maximise learning in a category, badges and points for that learning.

## 4. What this brief does not change

These still bind, whatever the design (onboarding doc; AMD-008 as drafted; privacy gate; demo standard). Mateo must reconcile the brief with them and raise an objection where they conflict, not route around them:

- Learning is the objective; **engagement is a guardrail and a reported number, not the target** (README anti-Goodhart line; AMD-008 X1). The founder asked for "surprise, novelty and engagement": the design must say how engagement enters the objective without becoming time-on-feed.
- Learners can be 13+ (F-01, teen mode). No demographics in the model; privacy-reviewer reads every input before build.
- Every moved card can say why; there is an off switch.
- Nothing ships without a registered experiment (analytics-steward) and a privacy review. Deploys need the founder every time.
- Badges and points belong to growth-designer's scope (reward recall and understanding, never raw activity). Lesson dims touch `meta.json` (platform-engineer, principal-engineer; EDD-003) and the demo standard (head-of-product). New roles are never created by us: if a role is missing, it goes to Leonie (chief-of-staff-ceo-office).

## 5. Asked of personalization-lead now

A response to this brief (`2026-10-16-brief-response.md`): the vocabulary (persona, fingerprint, need, dim) as data shapes; the phases; what can be built and simulated before real learners; who else must be involved; objections to the brief; questions back to the founder. No code in `src/` yet.
