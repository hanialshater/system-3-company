# Spec: deleted-key-breaks-search

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #16 · wireframe: `deleted-key-breaks-search.svg`

**Format: Before / after toggle.** The lesson is one change, how a delete is done, with a visible effect: the same search for C on the same table stops early, or walks past the gap. The "after" (gone marker, C found) persists into the reveal, next to the logged "before" result.

**Brief check (node, 2026-10-14):** 8 slots, A, B, C all hash to 1 and land in 1, 2, 3. Empty slot 2, then search C: probes `1:A, 2:empty`, stop, **not found**. With a marker in slot 2: `1:A, 2:gone, 3:C`, **found**. The brief's answer (B) holds.

## Stage at 390×844 (~300 px at predict, ~420 px in explore)
1. Rule line (muted): "Toy table, 8 slots. A, B, C all hash to slot 1; each takes the next free slot." (16 words)
2. **Table**: one row of 8 slots, 40 × 56 px each with 4 px gaps (348 px), index 0–7 under each slot. Keys A, B, C in slots 1, 2, 3. A small "hash → 1" tick above slot 1. An empty slot is blank; a gone marker is a hatched tile with "gone" in small type (pattern and text, not colour only).
3. **Probe trace**, drawn above the table after a search: numbered markers (①, ②, ③) above each probed slot, joined by arrows, starting at slot 1. The slot where the search stopped gets a heavy outline: "stop: empty" or "C ✓".
4. **Results log**, two lines max, each tagged with the delete mode it ran on: "Emptied slot: search C stopped at slot 2. Not found." / "Gone marker: search C passed slot 2. Found in slot 3." Before any search: "Search C: ?".
5. Controls (below).

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Delete B" | deletes B in the current mode: slot 2 goes blank (emptying) or hatched "gone" (marker). Disabled after use, label "B deleted" |
| 2 | Control | "Search C" | probes from slot 1, one hop highlighted every 80 ms (≤ 300 ms total, instant under reduced motion); draws the trace and writes a tagged log line. Works before a delete too (finds C in 3 probes) |
| 3 | Control toggle | "Delete by: emptying the slot" ⇄ "Delete by: leaving a gone marker" (`aria-pressed`) | flips the mode. If B is already deleted, the delete is redone in the new mode (slot 2 changes between blank and hatched). If a search has run, it reruns on the new table and adds its own tagged log line; the earlier line stays |

Start: mode "emptying the slot" (the question's own delete), B present. All 3 controls render at first paint, disabled while `locked`. No reset button: the toggle is the before/after switch, and nothing empties the stage.

QA path (each once, DOM order): Delete B (slot 2 blank) · Search C (stops at 2, "Not found": milestone 1) · toggle (slot 2 hatched, search reruns, "Found in slot 3": milestone 2). Both log lines are on the stage at the reveal.

## States
- **Predict:** table with A, B, C in 1, 2, 3; no trace; "Search C: ?". Controls disabled. Nothing on the stage shows the result.
- **Delete B (emptying):** slot 2 blank. The learner sees a gap inside the A–C run.
- **Search C:** hop ① lands on A (not C), hop ② lands on the blank slot, outline "stop: empty". Log: "Not found." C is visibly sitting one slot to the right of where the search stopped.
- **Toggle to marker:** slot 2 becomes hatched "gone"; the probe replays: ① A, ② gone (keep going), ③ C ✓. Second log line.
- **Reveal:** stage unchanged: the marker table, its trace, and both log lines. The reveal quotes the log: "Emptying slot 2 made your search stop there: C, one slot further, was not found. With a gone marker, the same search kept going and found C in slot 3." Then the payoff (an empty slot means the run ends here) and claim 3 (markers pile up, so tables get rebuilt). Only lines present in the log are quoted.

Milestones (`minInteractions=2`): `missed-after-empty` (a search for C that stops at an emptied slot), `found-past-marker` (a search for C that passes a gone marker and finds C). Either order works; a learner who toggles first and then flips back reaches both.

## Shown, not told
The learner makes the gap, runs the search, and sees it stop one slot short of C. The reveal only names the rule ("empty means the run ends") that their trace already showed.

## Colour and access
Keys `--fg` on `--bg-2` tiles; probe arcs `--fg`; stop outline `--bad-fill` plus the "stop: empty" text; found outline `--good-fill` plus "C ✓". Gone marker uses a hatch pattern and the word "gone". Slots 40 px wide are not controls. Controls use `.tap` (44 px); Delete and Search side by side (~178 px each), toggle full width. `aria-live` on the log.

## Claims this spec adds
None beyond the brief. Table size 8 is a stage choice; the result is the same for any size ≥ 4.
