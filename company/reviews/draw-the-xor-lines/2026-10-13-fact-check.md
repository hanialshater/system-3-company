# Fact-check: draw-the-xor-lines (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; model rebuilt in artifacts/scratch/fc-aiecongeo/xor.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Convexity argument is sound (both pairs have midpoint (0.5,0.5)). Toy: best of the 24 lines is 3 of 4; 200,000 random continuous lines (either orientation) never exceed 3. |
| c2 | verified | 576 two-line settings, 54 solve all four (matches). Parallel pair at offsets +/-0.35 works. |
| c3 | verified | Minsky & Papert 1969 Perceptrons shows a single-layer perceptron cannot compute XOR; Goodfellow, Bengio, Courville 2016 s6.1 works XOR with a 2-unit hidden layer. |
| c4 | verified | 8 turns x 45 deg, 3 offsets {0, +0.35, -0.35}, as in OFFSETS/Line. |

## Added (unverified)
- c5: reveal says two lines give "a band between them". Only 18 of the 54 solutions are parallel (band); 36 are crossing lines giving opposite wedges. Wording concern for demo-builder; not a false numeric claim.

The stage 'Your best with one line was N of 4' is learner state and reported by the code, not a claim. No seeds.

## Fact-check pass 2 (independent second check, 2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | disputed | 'a band between them' holds only for parallel lines. Of the toy's solving two-line settings, non-parallel ones give two opposite wedges, not a band, and learners can build those. Fix: 'for example a band when the lines are parallel'. |
