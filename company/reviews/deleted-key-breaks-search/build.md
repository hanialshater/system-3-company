# Build note: deleted-key-breaks-search (algo-pair-10, 2026-10-14)

- Built from the brief (#16) and spec `company/design/specs/deleted-key-breaks-search.md`. Layout, 3 controls (Delete B, Search C, mode toggle), two milestones (`missed-after-empty`, `found-past-marker`) as specced. All controls render at first paint, disabled while locked. No reset.
- Answer re-run in node (scratchpad `algo10-verify.mjs`): empty slot 2 gives probes 1:A, 2:empty, not found; gone marker gives 1:A, 2:gone, 3:C, found. Brief answer (B) holds.
- Choices where the spec was silent: Delete B clears the trace (the table changed) but keeps the log; the toggle reruns the search only if B is deleted and a search has run; the stage shows the last two log lines; probe trace appears instantly (no 80 ms animation). The rule line is cut to "A, B, C all hash to slot 1." and the "each takes the next free slot" rule moved into the question, to stay near the 25-word stage budget.
- Reveal quotes the two log lines the learner must have produced (both milestones are required).
- Reference only: TheAlgorithms/Python not pasted; nothing copied.
- meta.json v2 filled (curriculum, format, interactions). All 5 claims `unverified`. c5 ("rebuilt now and then") is general practice rather than CLRS; fact-checker should confirm or soften.
- Known: feed-chips QA failures are W-136, not this lesson.
