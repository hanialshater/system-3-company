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

## Attempt 1 (20:39-20:42 UTC): stopped on a crash-recovery hole, before any build

- **The crash.** The three kickoff positions were written; then F1 killed the lead while it chaired MTG-1.
- **The hole.** Chairing is judgment work outside a room, so there was no run to abandon. Its launch reservation would have held the meeting for the full 30-minute grace period, and nothing would have relaunched the chair.
- **The fix.** A launch the launcher reports finished, ok or crashed, reserves nothing. 82 tests (`tests/faults.test.mjs`: the chair is planned again at once).
- The record is in `live/bench5-attempt1/`. Restarted from scratch.

## Results (attempt 2, run 20:43-21:08 UTC; scored after the run, predictions above unchanged)

The record is in `live/bench5/`: the state, the serve log, the outbox briefs, and the launcher ledger `launches.jsonl`. The wave releaser's log, the hidden acceptance and the wave files are in the session scratchpad; they are copied to `live/bench5-record/`.

| Measure | Result |
|---|---|
| Waves shipped | **3 / 3**: wave 1 at 20:56:58 (13 min), wave 2 at 21:01:02 (4 min), wave 3 at 21:08:10 (7 min). That is 24 min 44 s from the start |
| Final hidden acceptance (wave 3, `#CIRC!`) | **19 / 19 categories**, shipped and work copies alike: the 208 SHEET cases, display, bad names, ARCH and all four slots |
| Orders shipped (ARCH, four slots, SHEET, each per wave) | 18 ships |
| Typed commands after the start | **0** |
| Agent sessions | 33 (lead 10, reviewer 10, dev-1 7, dev-2 6). One is a dev-2 session still hung after the run, below |
| Tokens (final context) | **1,777,989** for all 33 sessions: **98.8k per ship** (4b: 80.7k per order) |
| Cumulative tokens · cost | 17.5M · **$14.15** |
| Revise loops | 4 (hidden tests 2, the reviewer 2). Plus **4 reopens by the lead** from builders' asks, and the founder's 8 wave reopens |
| Asks from builders to the lead | **6**: 4 answered yes with a reopen, 2 redirected as duplicates |
| Self-checks | 24, of which 2 failed |

**What the team did, by itself:**
1. **Designed the system** in MTG-1:
   - four slots (A syntax, B values and errors, C evaluation, D the graph);
   - an ARCH.md contract;
   - errors as objects (`{error:"#DIV/0!"}`), which every position proposed.
2. **Found that the design broke the spec** from the hidden tests' category names alone.
   - SHEET failed `wave1/errors`, and dev-1 asked the lead (ISS-9).
   - The lead ran about 40 error cases, concluded that objects cannot match a spec that says "the error value `#DIV/0!`", and **reopened ARCH**. `get()` now returns strings.
3. **Routed defects across modules without anyone editing another's code:**
   - ISS-10, the left-error precedence in slot B;
   - ISS-11 and ISS-12, wave 2 needed `#REF!` in B;
   - ISS-13, wave 3's `#CIRC!` in B.

   Each went builder → lead → reopen of the owning slot.
4. **Corrected itself.** The reviewer reported that its own earlier SHEET pass was wrong. Later it re-read the spec and withdrew a claim that went too far.

**Faults:**
- **F1:** the lead was killed while chairing. It was relaunched in 0.2 s and continued from item 2 (its killed predecessor had decided item 1). In attempt 1 the same fault would have held the meeting for 30 min; that is fixed.
- **F2:** the corrupted SHEET was **caught by agents**: dev-1 in ISS-12, and the reviewer, who wrote "the shipped copy of SHEET has been altered". Wave 2's reopen of SHEET came at the same moment, and the rebuilt sheet removed the wrapper. The regression gate never had a later ship to catch it on.
- **F3:** slot B's check message was dropped at 20:49:15. **The watchdog re-sent it at 20:51:17 (2 min 2 s).**
- **F4:** `#CIRC!` was posted. The founder's reopen of SHEET was refused because SHEET was already open; the post and the briefs carried the change. The team found the owner (slot B, ISS-13) and fixed it in about 7 min.

**Scoring:**
- **H1 right.** No revise loop came from two modules disagreeing on ARCH. The failures were spec-versus-design (errors as objects) and a defect inside one module.
- **H2 right.** 4 revise loops and 4 ask-driven reopens. **The task was finally hard enough to need rework.**
- **H3 right, by judgment.**
  - One class repeated: "slot B lacks an error kind" (wave 2's `#REF!`, then wave 3's `#CIRC!`, which F4 caused).
  - No defect class from wave 1 (error representation, precedence) recurred.
  - The lessons were in ARCH.md and room memory.
- **H4 partly right.**
  - No person was needed for any fault.
  - F1 and F3 were recovered by code.
  - F2 was caught by agents, not by the gate: the wave reopen pre-empted it.
  - F4 was recovered by the team, as designed.
- **H5 right.** All waves shipped, and 19/19 hidden categories pass under `#CIRC!`.
- **H6 right.** 0 commands, and 98.8k per ship against ≤ 161k (2 × 4b).

**What it cost that it should not have** (kernel bugs, all fixed in the source after the run started; this run's kernel was frozen):
- **5 empty sessions (about 172k, 10%).** Three reviewers and one dev-1 found their item already taken: the waiting session's deadline race. One lead was planned twice for one ask, because an older launch's finish freed a newer reservation.
- **A hung session (56k, and 30 minutes of its slot).**
  - dev-2's 0715 launch had its `room enter` refused because another session held the item. It then chose to **wait for that session's 30-minute lease**, sleeping in the background until the session cap aborted it at 21:31:55. Its last words: "The lease on M-113 runs out in about 29 minutes. I'm waiting for it."
  - Fixed in the briefs: if an item is held or already done, stop and report; never wait for a lease.
  - Fixed in the launcher too: agents no longer inherit this session's `CLAUDE_AUTO_BACKGROUND_TASKS` (which let the wait go to the background) or `CLAUDE_CODE_SESSION_ID` (which put every agent's transcript in one file).

**Final summary from the launcher:** 33 launches, 2 failed (F1's kill and the hung session's abort), 1,777,989 tokens, $14.15.

## Benchmark 5R and 5V (predictions committed before either run)

**5R, the re-run on the fixed kernel.** The task, faults, company spec and launcher are the same, plus the fixes found in attempt 2:
- the wait-deadline race;
- reservations matched by launch id;
- no lease-waiting;
- the launcher's agent environment.

**5V, a vanilla agent.** One Claude Code agent (Agent SDK, same model, same tools, no settings) in one resumed session, with no company.
- A script plays the founder and the hidden tests. It gives wave 1, then the failing-category lines after each turn: exactly what the company's UAT findings carry. It allows up to 5 rounds per wave, then releases the next wave.
- The same faults where they apply:
  - F1, the first turn killed after 60 s, then resumed;
  - F2, sheet.mjs wrapped after wave 1;
  - F4, the rename during wave 3.
- F3 has no analogue for a single agent.

| # | Prediction | would_be_wrong_if |
|---|---|---|
| R1 | 5R has 0 empty sessions and no hung session | any |
| R2 | 5R ships all waves with 19/19 hidden categories, at ≤ 90k per ship (attempt 2: 98.8k) | any failure, or > 98.8k |
| V1 | The vanilla agent also ends at 19/19. The task is within one agent's reach | it fails a wave after 5 rounds |
| V2 | **The vanilla agent is cheaper**: ≤ 50% of the company's dollars ($14.15) | > 75% |
| V3 | The vanilla agent is at least as fast as the company (≤ 25 min) | > 35 min |
| V4 | The vanilla agent catches F2 only through the hidden-test feedback (no reviewer), and F4 in one round | F2 never detected, or F4 > 2 rounds |

**What I expect this to show.** On a self-contained task of this size, a single strong agent beats a company on cost. The company's case rests elsewhere:
- parallel hands;
- independent review;
- durable state and recovery when a process dies;
- an audit trail;
- requirement changes that reach every role.

If V2 and V3 hold, Meta's cost has to be justified by those, or by tasks too big for one context.
