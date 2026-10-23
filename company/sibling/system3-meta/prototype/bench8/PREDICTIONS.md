# Benchmark 8: predictions, committed before any run

owner: vp-meta · date: 2026-10-23 · scored by `setup.mjs tally` and `setup.mjs audit`, with the measures defined in
[PROTOCOL.md](PROTOCOL.md) · status: **committed before any arm has run**.

## The bet

S is a specialized org:
- an architect who owns the interfaces;
- four module owners working one worktree at once;
- an adversarial evaluator;
- failures routed to the module that owns them;
- a playbook per module.

V is one capable agent in one long session. The bet: specialization costs S time and money early, but it compounds.
- Routed failures land with the owner who knows the module.
- The integration check stops one owner breaking another.
- The evaluator catches defects before the hidden run.
- Each module's playbook carries what the last wave taught.

V carries everything in one context that grows and is compacted.

**How the measures are taken:**
- **Pass rates** are hidden pass / total over the tests of waves 1..n, in percentage points ("points").
  - V's first hand-in is the hidden run after its first "done" of the wave.
  - S's first hand-in is the wave's first accept run.
- **Cost** is the SDK estimate, each session counted once.
- **The W6 score** is the geometric mean of the runtime ratios against gcc -O0. Lower is better.

## Predictions

| # | Measure | Prediction | Wrong if |
|---|---|---|---|
| P8-1 | **Early cost and time** | S trails V on W1 and W2: S's cost and minutes per wave are higher on each of W1 and W2 (S pays the org: the architect's interfaces, four cold owners, the evaluator, the retro) | S's cost ≤ V's on W1 and on W2, or S's minutes ≤ V's on both |
| P8-2 | **First hand-in from W4** | S's first-hand-in hidden pass rate ≥ V's on each of W4, W5 and W6 (by then the owners' modules, the evaluator's tests and the playbooks have caught what V's single pass misses) | S < V on any 2 of W4, W5, W6 |
| P8-3 | **Final W5** | S's final W5 pass rate ≥ V's | S's final W5 rate < V's by more than 1 point |
| P8-4 | **W6 score** | S's final W6 score is better (lower) than V's: the optimizer owns IR passes and register allocation from W5, with nothing else to do | S's W6 score ≥ V's |
| P8-5 | **Total cost** | S's total cost ≤ 2 × V's | S > 2 × V |
| P8-6 | **No regressions** | S's W6 regression gate shows ≤ V's regressions (the integration check catches visible regressions per hand-in) | S's gate regressions > V's |
| P8-7 | **Routing works** | in every S wave with a revise, at least 80% of the revise's categories reach an owner by a route (not triage), and the architect routes every triaged one on or handles it | < 80% routed by route in any wave, or a triaged category left unhandled |
| P8-8 | **Ownership holds** | 0 commits in S that change another owner's paths without an approved change request (the guard and K7 refuse them), and at least 1 change request is raised and decided across the run | any such commit, or no change request at all in six waves |
| P8-9 | **Per-module knowledge accumulates** | for each module that gains rules (S's playbook, `knowledge` in the tally), its failing fraction at the first hand-in falls from the wave where the rules were added to the next, by more than V's fraction for the same module on the same routes falls | in more than half of the modules with rules, S's fall is ≤ V's fall (or S's fraction rises) |
| P8-10 | **Clean run** | the audit is clean for both arms: every session ran under the hook, every transcript was found, no hidden-test text reached a session, and no shim refused a C compile | any leak, a session without hook lines or a transcript, or a refused C compile (an attempt counts too) |

## The operator's prior (stated so the result can surprise)

These are guesses made before any run, with confidences. They do not change the predictions above.

- **P8-1 (S trails early): 75% confident it holds.** Coordination is pure overhead on a small wave. W1 is a few hundred
  lines that one agent writes in one pass.
- **P8-2 (S's first hand-in from W4): 45%.** The evaluator and the integration check should help, but V gets the same
  three hidden feedback rounds and keeps its whole context. Each S owner starts every wave cold, from the code and the
  docs.
- **P8-3 (final W5): 50%.** Both arms can reach a high final rate with three rounds. The likeliest separation is in
  `W5 floating` and `W5 misc`, where routing to the right owner matters.
- **P8-4 (W6 score): 55%.** A dedicated optimizer helps, unless S's interfaces (a rigid IR) make register allocation
  harder than V's free hand.
- **P8-5 (cost ≤ 2× V): 50%.** Benchmark 6 measured Meta at 2.3× a single agent. Warm owners and fewer reviews should
  pull that under 2×, but five roles per wave push it up.
- **P8-9 (knowledge accumulates): 35%.** Six waves is a short horizon. The categories change wave to wave, so a rule
  about W2 pointers has few later failures to prevent, except in the regression tests of earlier waves.
- **P8-10 (clean): 80%.** The likeliest failure is a C compile attempt: an agent reaching for gcc to get a reference
  output, refused by the hook. Under this table's rule that attempt makes P8-10 wrong.
