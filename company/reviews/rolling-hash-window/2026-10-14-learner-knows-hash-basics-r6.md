*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): rolling-hash-window
lesson version: v3
boundary (from meta.json learner field): knows what a hash is (a number made from some data, from hash-bucket-pileup); does not know that a sliding window's hash can be updated instead of recomputed, or that equal hashes still need a letter-by-letter check.
Screenshots seen: yes (artifacts/walkthroughs/rolling-hash-window/sheet.png, 5 frames, integrated build 3 at :3470)
Verdict: launch

## 1. From the artifact

- Predict: the title "One letter along: how much work?" and the hook "Do you have to add up all its letters again?" are neutral. The options All 5 / Just 2 / About 3 are equally bare. The locked stage shows "Window FEBCD: sum 20 · pattern 15" with no letters-used counter. "All 5" is the honest guess at my boundary.
- Explore: "Slide" comes first. "20 − 6 + 1 = 15" appears, with −6 over the F that left and +1 over the A that arrived, and a bracket under the four middle letters labelled "kept: already in the sum". That bracket is the stand-in for "updated, not recomputed": I can see which letters cost nothing. The counter shows "sliding 7 · adding each window again 10". The sum equals 15, so it flags. "Check letters" turns the window red: "E ≠ A at letter 1: false flag." The second doesNotKnow item is shown, and in the right order now. "Slide to end" does the rest: the sums row fills in 20 15 16 20 18 16 18 16 15, ABCDE flags, and the totals reach 21 vs 45.
- Reveal: 21 / 45, the − / + / "kept" marks and EBCDA vs ABCDE all point at what I saw. "A wider window would still cost 2 per slide" is told, but I can infer it from the "kept" bracket: the kept letters were free whatever their number.

## 2. Earlier findings (r5, v2)

1. The title, options and locked counter leaked the answer: **fixed** (neutral title, bare options, no counter before lock-in).
2. The false flag came before the slide: **fixed** (Slide is first, Check letters second).
3. "Slide to end" skips the remaining slides, so only one slide is seen step by step: **not fixed**, minor. The −/+ marks on the last window and the per-slide sums row partly make up for it.
4. No width control, so "same cost however long the pattern is" is told: **not fixed**, minor. It is a consequence of what is shown, not the brief's gap.
5. DRAFT / unchecked claims: claims now 6/6 checked. The DRAFT badge remains (not a learner item).

## 3. New findings

- Minor: count mismatch. The step-3 caption says "7 slides × 2 letters", but the reveal says "You slid the window 8 times". Both are right (1 + 7), but a learner who counts will stumble. "8 slides in all" on the stage, or "7 more slides", would fix it.
- Minor: stage text is over budget. During explore the toy-hash caption, the equation, the "kept" label, the sums row, the flag line and the letters-used line come to about 40 words on screen.
- Minor: the reveal is about 120 words, at the limit. On the reveal frame the stage is scrolled, and the toy-hash caption is cut.
- No FATAL.
