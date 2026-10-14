# Build note: deleted-column-still-there (demo-builder, builder-wavej-ai-1, 2026-10-14)

Brief: `company/domains/briefs/ai.md` item 62 (Wave J). Status draft, version 1. Claims c1-c4 unverified; c4 (Barocas, Hardt and Narayanan 2023; Pedreshi et al. 2008) is the real-systems citation.

- Stage: header "Past lenders approved ○ A 80%, ▢ B 40%" and the current layout ("80% together"); two neighbourhood boxes of 50 shapes (circle A, square B; 10 x 5). Applying the model fills every dot in an approved neighbourhood and outlines the box; box label "N1 past 72% → approve". Summary line "Model approves A 80% · B 20% (filled)". A muted "Seen:" line keeps every layout applied so far ("80% together A 80% · B 20%; mixed A 100% · B 100%; ...") and survives Reset.
- The toy rule (approve a whole neighbourhood if most past applicants there were approved) is in the explore hint and visible in the box labels (past rate and verdict), not in a separate stage caption, to stay near the 25-word stage budget.
- Controls in DOM order: "Train without group" (80%), "Mixed neighbourhoods" (50%), "90% together", Reset (back to the 80% layout with no model applied). Active preset disabled; Reset disabled when no model is applied; preset row folds at the reveal.
- Dot positions inside each box: deterministic shuffle, mulberry32 seed 1 (first seed, untuned; positions change no number), disclosed in c1.
- Milestones: question-case, mixed-seen (gated); extreme-seen recorded in the Seen line only.
- Stage text at its maximum (after all three layouts) is about 30 words, over the 25-word budget: the Seen line carries three results so that Reset cannot hide what the reveal quotes.
