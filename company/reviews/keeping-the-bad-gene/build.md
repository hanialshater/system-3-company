# Build note: keeping-the-bad-gene (demo-builder, 2026-10-13)

- Design: a ring of 100 gene copies; w copies are red squares. Deterministic recursion with survival AA 85%, Aw 100%, ww 0%. Changing the start keeps the generation so both starts can be compared at gen 60.
- Reveal gate: reach generation 50 or later from the 1% start and from the 50% start, with survival at 85%.
- Survival numbers are stated on the stage (the brief's '15% better' is ambiguous: 1 vs 0.85 is 17.6% better), so the question gives survival rates instead.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.

## v2 (revision 2026-10-13)

- The stage showed only end states; the rise-and-fall was told -> the ring is replaced by a chart of w share against generation, both starts (1% and 50%) drawn together so one curve visibly rises and the other falls to the dashed "balance" line. Controls: +10 generations, To gen 60, survival slider, Restart. Generation slider and start buttons removed (they added nothing).
- Step "Start at 50%" looked identical to the previous step -> both starts are on screen at once.
- Reveal said 13 of 100 after the slider had moved the ring to 5% -> the reveal quotes the 85% result (gated by milestone "both-settle": gen 60 at 85%) and, from the learner's actual slider setting, a computed sentence ("You set no-w survival to 95%: the one-copy edge became smaller, and the balance fell to 5%"). Milestone "moved-slider" (slider moved with gen >= 50) makes sure that state was seen; both are reached on the QA path.
- Option named the answer ("settles near 13%") -> "settles at a steady share in between". "Allele" glossed ("gene version"). Reveal is about 80 words.
- Claims: c2 and c3 rewritten, c6 new (edge size vs balance), unverified.
