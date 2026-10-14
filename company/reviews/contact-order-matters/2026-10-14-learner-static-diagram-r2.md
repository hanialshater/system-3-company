# Learner review r2: contact-order-matters (v2) — static-diagram learner

Simulated learner. This review finds problems; it is not evidence that anyone learned.

Boundary borrowed: reads "who met whom" diagrams and assumes anyone connected can pass infection on; has never thought about when contacts happen. Screenshots seen: sheet.png (all 8 frames). Demo.tsx read: milestones gate "one-way" (E to A), "forward" (A to E) and "two-way" (Overlap with E as first case) before reveal, so the reveal quotes only visited states.

## Section 1: from the artifact only

**Idea the learner lacks:** infection moves only forward in time, so the order of contacts changes who can be reached even when the "who met whom" diagram is the same.

**Before predicting.** The stem lists the contacts and the order "D-E, C-D, B-C, A-B" and asks how many others can be infected. Options 1 / 0 / 4. A static-diagram learner will say 4 (a chain), which is the trap. The title "Who can catch it, and when?" has "when" in it; the hook says "Four meetings link A to E in a line". No answer is shown. The locked stage already shows all four contacts and a "?"; fine.

**Prediction feel.** A guess for most; careful readers can trace it: D-E happens first, E not infected yet, so nothing, until A-B at the end. That reading is hard without an example, so the learner relies on the stage.

**Where understanding first broke.**
1. "A→E" and "E→A" on the order buttons are not defined on the stage. They read as the direction infection travels, but they mean the order of meetings. The stem uses a different notation (the list "D-E, C-D, ..."), so the learner has to map one to the other. First press of "E→A" gives reached 1: the learner may think "E to A" means infection starting at E.
2. The stage has a lot to decode at once: a day slider, a Day 4 button, three order chips, a day-axis with blue line, bars for meetings, filled/open dots, and a six-item legend (first case, infected, healthy, meeting done, meeting to come, infected stretch). The legend is cramped. The learner must decode a time diagram before seeing the idea.
3. Overlap is a different idea (concurrency): every pair meets every day. It is a second contrast and the reveal itself says "a different change, not another order".
4. The reveal frame shows the final state the script visited, Overlap with E as first case (4 of 4). The text first discusses E→A and A→E. The picture beside "In E→A, A met B only on day 4... only B was reached" is the overlap picture, where all four are reached. The picture contradicts the first paragraph on its face. Rows A and B are also cropped out of the frame.
5. "A diagram of who met whom can overstate who can be reached" is told. It is shown by the learner's own comparison (the same four contacts give 1 or 4), and the predict stage carries the diagram, so the claim is backed.

**Answer visible before predicting?** No.

**Reveal quotes only reached states?** Yes, gated by milestones. Pass.

**Told vs shown.** "Infection only moves forward in time" is shown by the blue day line and the infected stretch crossing only later meetings. Pass. Concurrency sentence (Morris and Kretzschmar) is context outside the stage, one claimed sentence: allowed under the decision.

**Top finding:** the reveal frame is pinned to the Overlap state while the reveal text speaks about E→A and A→E, so the headline contrast is not on the screen next to the text; the order-button notation "A→E" is undefined.

**Verdict for v2 (before checking earlier findings): revise.** Pin the reveal to the order contrast the text discusses, define the order chips.

## Section 2: after reading the brief, the earlier learner review and build.md

Earlier review (launch with notes) vs v2:
- Timeline unlabeled (finding 1): **fixed** (legend now has meeting done, meeting to come, infected stretch). It is a six-item legend, which is heavy.
- Title/hook gave the angle away: **fixed in part** (title now asks "who can catch it, and when?"); "when" still hints at time.
- "Contacts" ambiguity: **fixed** ("four meetings").
- Overlap presented as another ordering (finding 7, top finding): **improved but not closed.** The reveal now has its own paragraph calling Overlap "a different change". The muted line still reads concurrency for what the stage shows (every pair meeting every day), and the reveal frame is pinned to Overlap, so the stage shows the second idea beside the text about the first.
- "Tap E" affordance (finding 6): **not fixed** (builder says so).
- New from me: the notation "A→E / E→A" is undefined, and the reveal-frame pin. The builder's note says "reveal fits" in the walkthrough; I could see that the final state fits but A and B rows are cropped, and the state shown is not the one the text opens with.
- Builder confirms Overlap is built as every pair meeting every day (repeated contact); that is the intent for the brief's "two-way" idea but is a stretch of what Morris and Kretzschmar call concurrency (a call for the learning designer).

**Verdict for the current version (v2): revise.** Not a block on truth (nothing false found), but the reveal frame contradicts its own first paragraph, and the one idea of the card (order) shares the stage with a second idea (Overlap). Pin the reveal to the E→A versus A→E contrast, and name the notation.
