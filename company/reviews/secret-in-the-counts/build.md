# Build note: secret-in-the-counts (demo-builder, builder-wavej-ai-1, 2026-10-14)

Brief: `company/domains/briefs/ai.md` item 63 (Wave J). Status draft, version 1. Claims c1-c4 unverified; c3 (Carlini et al. 2021) is the real-systems citation. Brief claim 4 (Carlini et al. 2023) is not in learner text; c4 records the told sentence "Longer contexts remember rarer text." as shown by the toy, with the 2023 paper as background.

- Model: a real n-gram counter over the 7 sentences (generate() in Demo.tsx): greedy, ties to first seen, back-off to a shorter context when the context never occurred, stop at sentence end. Builder ran the MODEL block in node: 2-word "4 7 1 9"; 1-word "ready"; secret deleted, 2-word "ready" (backs off to "is").
- Stage: the 7 training sentences (the secret in the domain colour with a "private" badge; struck through with "deleted" after the delete preset), an output line "2-word context → my pin is 4 7 1 9" (red when the pin leaks), a tally chip of the first choice ("after 'pin is': 4 ×1"; 1-word: "after 'is': ready ×3, at ×1, sam ×1, …"), and a muted "Seen:" line with the 2-word and 1-word outputs, which survives Reset.
- Controls in DOM order: "Prompt with 2-word context", "Prompt with 1-word context", "Delete the secret, prompt again", Reset. Active preset disabled; Reset disabled when no output; preset row folds at the reveal.
- Milestones: leak-seen, short-context-seen (gated); deleted-seen is not gated or quoted.
- The badge is the word "private" in a red outline, not a lock icon (no icon set in the kit).
- Stage text exceeds the 25-word budget because the corpus itself is 32 words; the brief's design shows the whole corpus, which the question refers to.
