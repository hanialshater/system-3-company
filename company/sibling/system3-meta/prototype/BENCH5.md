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

## Built for it (before the run)

**The company** is `specs/sheetco.json`, generated with M2's generator.
- The org: lead (the manager), dev-1, dev-2, reviewer and release, plus a meeting room.
- Agents load only this company's own context (ORG.md, CONTEXT.md), not System 3 Company's: 4b's cost lever.

**The orders:**
- the kickoff MTG-1 (the lead chairs; dev-1, dev-2 and the reviewer write positions);
- `ARCH` (ARCH.md: four slots, each `## Slot X: <file>.mjs` + `exports:`);
- `MOD-A`…`MOD-D` (after ARCH);
- `SHEET` (after the four modules).

**The hidden acceptance** is in the session scratchpad.
- ARCH: four slots with exports.
- Each slot: the module ARCH.md names loads and has its listed exports.
- SHEET: the 208-case suite filtered to the released waves, plus display and bad cell names.
- It passes on the reference at waves 1, 2 and 3.

**The waves, from the founder's schedule** (`release.mjs`). When SHEET ships at wave n, wave n+1 is appended to SPEC5.md, the hidden tests move to wave n+1, a company post goes out, and every module and SHEET is reopened.

**Faults:**
- **F1:** the 4th launch is killed after 60 s.
- **F2:** after wave 1 ships, the shipped SHEET is wrapped so a value of 10 reads as 11.
- **F3:** slot B's check message is dropped, inside the tick.
- **F4:** at the first ship in wave 3, `#CYCLE!` is renamed `#CIRC!`. Only SHEET is reopened; the team must find the owner.

**New in the kernel for it:**
- An open **ask** to an agent decider is planned as that role's work; the manager's brief carries `order reopen`.
- Builders' briefs say how to raise one instead of editing another order's module.
