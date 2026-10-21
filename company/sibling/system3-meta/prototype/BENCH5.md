# Benchmark 5: the spreadsheet with no module spec. The team designs it, in three requirement waves (design; predictions committed before the run)

owner: vp-meta · run by chief-of-staff · date: 2026-10-21

## Why

Benchmark 4 had a precise spec for each module. Every module passed its hidden tests on the first try, so the run showed that the code works, not that agents can collaborate or improve.

The founder asked for a task that "needs agent collaboration and self improvement and fault recovery". This one removes the part that made Benchmark 4 easy.

## The task

**One spec, behaviour only: `SPEC5.md`.**
- It gives what a user sees: cell input, formulas, functions and error values, with examples.
- It says nothing about modules, files or interfaces.
- The team gets the same engine as in Benchmark 4, described from the outside.

**Requirements come in three waves.** Each wave is released only when the one before has shipped.
1. **Wave 1:** numbers, text, arithmetic, comparison and strings. A cell sees only literals.
2. **Wave 2:** references, ranges, the nine functions, and recalculation.
3. **Wave 3:** cycles, error propagation, and 99-row chains.

**Collaboration is required.**
- **The kickoff.** Meeting MTG-1 (the manager chairs, with both builders and the checker) decides the module split and every interface. The minutes are the design.
- **Orders.** The manager places them for the modules the meeting decided, plus an INTEGRATION order that wires `createSheet()`.
- **The hidden tests** run on the integrated sheet only (`sheet.mjs`). A failure names categories, not modules. The team must work out together whose module broke.

**Self-improvement is measured.**
- For each wave, it is the number of defects in classes already found in an earlier wave.
- A repeat after a lesson was written (room memory) or decided (a standing rule) is a learning failure.

**Fault recovery.** The four Benchmark 4 faults, injected from the tick or the launcher:
- a crash;
- a corrupted shipped module;
- a lost message;
- a requirement change, `#CYCLE!` → `#CIRC!`, in wave 3.

**The org:** the `toy` spec, with the frozen kernel and the launcher as in Benchmark 4b.

## Committed predictions (to be scored only after the run; nothing below is a result)

| # | Prediction | would_be_wrong_if |
|---|---|---|
| H1 | The kickoff produces an interface the modules honour. At most 1 revise loop in wave 1 comes from two modules disagreeing on an interface | ≥ 3 such loops |
| H2 | **Rework appears** (the point of the task): at least 3 revise loops over the run come from the hidden tests or the checker | 0 (the task is still too easy) |
| H3 | **Learning:** later waves repeat at most 1 defect class an earlier wave already found | ≥ 3 repeats |
| H4 | All four faults are recovered by code with no person; the lost message by the watchdog within 3 min | any needs me or an agent workaround |
| H5 | All waves ship, and the final hidden suite (208 cases under `#CIRC!`) passes 100% | any wave unshipped or any case failing |
| H6 | 0 typed commands after the start; cost ≤ 2× Benchmark 4b per shipped module | any command, or > 2× |

## Open before it runs

- Write `SPEC5.md`: the behaviour, derived from the 208 cases' categories, with examples.
- The wave orders need a release step: `serve` must place the next wave's order when the last one ships. This needs a small "on shipped" rule.
- A UAT for module orders: the meeting's decided exports, checked by a test the chair writes as a rule. Or else module orders skip UAT and only INTEGRATION has hidden tests.
