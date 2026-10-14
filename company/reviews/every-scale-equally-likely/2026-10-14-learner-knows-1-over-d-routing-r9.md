*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): every-scale-equally-likely
lesson version: v4 (meta.json version 4)
boundary: knows-1-over-d-routing (the lesson's own: has done near-and-far-links-find-the-way and knows 1/d long links route fastest; does not know why: with chance ∝ 1/d, a link is equally likely to land 1–2, 2–4, … or 256–512 away). Same tag as r6/r7/r8.
Screenshots seen: yes (artifacts/walkthroughs/every-scale-equally-likely/sheet.png, release build recorded 2026-10-14T15:27Z, 6 frames; 06-reveal.png opened at full size)
Verdict: launch

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("About 100×"), the per-distance intuition (1/2 vs 1/256).

1. **Where it first asks for an idea I don't have: the compare line.** "1/d, distances × chance each (vs d = 1): 2–3: 2 × 0.42 → 12.2% · 256–512: 257 × 0.0027 → 10.2% · ratio 1.2×" is the why in one line, but "chance each (vs d = 1)" and "0.42" (mean of 1/2 and 1/3) need me to unpack a normalisation I have not been shown. The bars carry the result without it, so this is a density issue, not a break. Carried from r7/r8.
2. **No answer before the commit: met.** Ratio options "About 100× / About 10× / About 1×", same form. Locked chart is nine "?" bars, no rule selected. The locked frame now shows the Band readout ("2–3: 2 × ?") in full; r8's crop minor is fixed.
3. **Shows the why: met.** Uniform piles at the far band (50), 1/d² at band 1 (61), 1/d is flat (15, 12, 11, 11, 10 … 10), with dashed outlines "1/d² 60.9%" and "Uniform 50.1%" kept for contrast. The band slider (8–15: 8 × 1/8 to 1/15 → 10.6%) shows "more distances, each less likely" for a band I choose.
4. **The reveal shows the payoff: met, and r8's main finding is fixed.** In 06-reveal the whole chart, outlines, compare line and slider readout are on screen; stage top and last line both fit (page ~795 CSS px tall at ~2.77×). "12.2%", "10.2%", "1.2×", "10–12%" are all on stage at that moment.
5. **Budget: met.** Reveal 73 words (r8: ~112).
6. Minor: "Each band holds twice as many distances as the one before, each half as likely" is told; the slider shows it per band, but no two bands are side by side in that form except on the compare line. Fine as the closing sentence.
7. Minor: the last sentence ("a link that halves its remaining distance is about equally likely: that is why 1/d links route fast") ties back to the prerequisite lesson; told context, appropriate for this boundary.
8. Trust line reads 2/8 claims checked after the v4 rewording (fact-checker's gate).

Where understanding first broke: it did not; the compare line is the hardest read (finding 1).

## After reading build.md and r8

| r8 finding | Status |
|---|---|
| Chart and outlines off screen at reveal | fixed |
| Reveal ~112 words | fixed: 73 |
| Locked frame crops readouts | fixed |
| Compare line ~20 words of arithmetic | not fixed (finding 1, minor) |
