# Build note: two-locks-wait-forever

Builder: wave-i-cs (demo-builder) · 2026-10-14 · from brief cs.md #57 (single card), board W-396.

- Brief numbers re-run in node (full enumeration of scheduler choices): opposite orders 4 runs, PPPQQQ, PQ (jam), QP (jam), QQQPPP; same order 2 runs, 0 jammed.
- Picture: P and Q on the sides with their three steps (✓ done, red ⏳ waiting), locks A and B in the middle ("P has it" / "free"). A green line joins each lock to its holder; a dashed red arrow runs from a waiting worker to the lock it waits for, so a jam draws the circle P → B → Q → A, with "waiting in a circle".
- Controls, DOM order: Step P, Step Q, Reset (row 1); "P all, then Q", "Q takes A first" toggle, "Take turns" (row 2). A blocked worker's button reads "P waits for B" and is disabled. Deviation from the brief: two preset runs were added, because QA presses each control once and the brief's four controls cannot reach all three milestones that way (one press per Step button reaches only the jam). The toggle sits between the two presets for the same reason. The toggle clears the run.
- Milestones jammed (opposite orders, both blocked; holders recorded), finished (opposite orders, both done), same-order (toggle on, both done, someone waited). Trace lines "Jam: P holds A, Q holds B." and "Same order: Q waited for A, both finished." stay after Reset and the toggle.
- Reveal = cm-cs draft unchanged (73 words). Claims c1-c5 unverified; c5 states the model in the stem.

## Pre-flight v1
1. **Title and hook.** "Two workers, two locks, opposite orders" / "Each waits politely when a lock is taken. Does someone always get to finish?" A yes/no question with no lean; "some orders" is not hinted.
2. **Options.** "No, one always finishes" / "Yes, in some orders" / "Yes, in every order": same form, none numbered.
3. **Locked stage.** P and Q circles with steps "1 take A, 2 take B, 3 release" and "1 take B, 2 take A, 3 release", both locks "free", no lines, no arrows, no trace. Nothing drawn for a jam.
4. **Reveal values.** "P held A and waited for B while Q held B and waited for A": (b) milestone jammed, holders recorded; on stage as the "Jam: P holds A, Q holds B." trace. "When Q also took A first, whoever got A could always get B": (b) milestone same-order; on stage as "Same order: Q waited for A, both finished." and the toggle shown on. The other sentences are told (claims c2, c4).
5. **QA path.** Step P (P takes A), Step Q (Q takes B: jammed), Reset, "P all, then Q" (finished), "Q takes A first" (on, run cleared), "Take turns" (Q waits for A, both finish: same-order). 3 milestones in 6 presses. At the reveal both trace lines and the finished same-order run are on stage.
6. **Reset.** Reset is pressed mid-path and the traces survive it; pressing it last only clears the run (traces stay). Reveal on that path: "Your jam: P held A and waited for B while Q held B and waited for A. Each waited for the other, a circle, so neither could ever move. It happens whenever both take their first lock before either takes its second. When Q also took A first, whoever got A could always get B, so no circle could form. Taking locks in one agreed order everywhere is a standard cure for deadlock."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 two-locks-wait-forever` (dev server, 2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, 81 words with the verdict (73 reveal). Stage 331 px (picture 148, controls 90, text 49), reveal 226 px, window 594 px. The red loop itself is not on screen on the QA path (that run ended in the same-order run); the jam is on stage as the trace line, as the brief's phone-fit line asks. Screenshot `artifacts/reveal-fit/two-locks-wait-forever.png`.

Not run: next build, QA, walkthrough. tsc and check pass.
