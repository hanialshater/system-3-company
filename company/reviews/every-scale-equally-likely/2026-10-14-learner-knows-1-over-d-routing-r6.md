*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): every-scale-equally-likely
lesson version: v1
boundary: knows-1-over-d-routing (has done near-and-far-links-find-the-way: 1/d long links route fastest; does not know why, i.e. that each doubling band of distances gets about the same share). From meta.json learner field.
Screenshots seen: yes (artifacts/walkthroughs/every-scale-equally-likely/sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact

- Hook: "If nearer links are likelier, most links should be short. Are they?" This is a good tension, and it states my exact belief.
- Predict: "ring of 1,024, chance ∝ 1/d. More likely: 2–3 away or 256–512 away?" with 2–3 / 256–512 / About equal. The locked stage shows an empty band chart with "?" on each bar. No leak. On phone, the locked stage crops the readouts at the bottom edge, and "Chance ∝ 1/d²" already looks selected while locked (minor).
- Explore: "Uniform" piles bars up at the far end (50 in the 256 band). "Chance ∝ 1/d" gives an almost flat row (15, 12, 11, 11, 10 … 10), which is the answer, plain to see. The readouts for band 2–3 say "Distances in band 2 · Each distance 1/2 to 1/3 of d = 1 · Band's share 12.2%". "1/d²" piles up at 1 (61). These three contrasting shapes work.
- **Where it loses me (main finding):** the *why* lives in the readouts. Under 1/d, a far band holds many distances, each one rarely chosen, and the two cancel. On the recorded path, the band slider was moved only under 1/d², to 8–15, where the two do not cancel (4.2%). I never saw a far band under 1/d, for example "Distances in band 256 · Each distance 1/256 to 1/511 · share 10.2%". The gate opened anyway. So "each band holds twice as many distances ... each half as likely, so the two cancel" reached me as told text. That cause is the brief's only doesNotKnow item ("why: ... equally likely").
- Reveal: "2–3 got 12.2% and 256–512 got 10.2%" matches the bars I saw (12 and 10). "50.1% in the farthest band" and "60.9% at distance 1" match the other two rule shapes. "That is why 1/d links route fast" is a one-line bridge to the prerequisite, which is fine.

## 2. Earlier findings

No earlier learner review (company/reviews/every-scale-equally-likely/ has a fact-check and build.md only). The boundary is taken from meta.json.

## 3. New findings

1. Main (told vs shown): make the "band" milestone count only under 1/d, and only for a band at least, say, 64 away. Or have the slider land on 256–512 by default when 1/d is chosen. Then the reveal can point at the readouts "256 distances × each 1/256-ish ≈ same share as 2 distances × each 1/2". The stand-in already exists on stage. It just is not required.
2. Minor: show the doubling/halving as a product in the readout ("2 × ~0.4 vs 256 × ~0.003" or "×2 distances, ×½ chance"), so the cancellation is visible in one line.
3. Minor: on phone, the locked stage crops the readouts. While locked, no rule should look selected.
- No FATAL.
