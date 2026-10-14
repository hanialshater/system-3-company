# Build note: queue-or-stack-same-search

builder: algo-pair-02 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Side-by-side comparison per `company/design/specs/queue-or-stack-same-search.md` (the spec, not the brief's toggle). Two SVG panels (Queue, Stack) on one 6-node graph, driven by two controls in DOM order: "Take next", then "Take the rest" (disabled until "Take next" has been pressed once; plays remaining takes 70 ms apart, instant under reduced motion). Both runs come from one function `run(fromTop)`; the only branch is `pop()` versus `shift()`.

## Answers re-run in node
- Queue: A B C D E F. Stack: A C F E B D (the brief's A C F B E D is wrong for this undirected graph; claim c1 uses the true order).
- Hops (set when a place is added): queue A0 B1 C1 D2 E2 F2; stack A0 B1 C1 F2 E3 D2. E is 2 hops for the queue (via B), 3 for the stack (via C, F).
- Both reach all six places.

## Rules checked
- Answer not visible before predicting: at predict both panels are identical (A taken, to-do B C), no next-tile outline. Panel titles say Queue and Stack, which the question already names.
- Reveal quotes only states reached: milestone `both-done` requires takes = 6 in both panels; the stage stays on the two complete runs.
- No jump-to-answer: "Take the rest" needs the learner's own first press (the split at take 2); every take is drawn.
- Controls exist at first render, disabled while locked, 44 px (`.tap`).
- QA path: Take next (milestone split) then Take the rest (milestone both-done).

## Known gaps
- Hops labels are 8.5 px text in a ~180 px wide panel; check readability on the walkthrough sheet.
- All 5 claims start unverified; fact-checker owns c4 (CLRS Theorem 22.5, 3rd ed. numbering; `clrs-4e` is the only work in content/works.json).
- Full typecheck was killed by memory pressure on the shared box; next dev/build compiled the files, QA results recorded in the handoff.
