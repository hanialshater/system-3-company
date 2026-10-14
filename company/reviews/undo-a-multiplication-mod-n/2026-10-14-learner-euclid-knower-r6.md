*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): undo-a-multiplication-mod-n
lesson version: v1
boundary: knows that Euclid's remainders find a greatest common divisor (euclid-leftover-rectangle) and that clock arithmetic wraps at the clock size (meta.json learner field); has never run Euclid backwards or met a modular inverse.
Screenshots seen: yes (artifacts/walkthroughs/undo-a-multiplication-mod-n/sheet.png, 3 frames; plus my own probe on the same server pressing Divide ×4, Back up ×3 and Read off x, frames and reveal in the session scratchpad)
Verdict: revise

## 1. From the artifact (written before reading the brief)

- Walkthrough path: the standard once-per-control walkthrough **never unlocks the reveal**. Divide is pressed once (26 = 3 × 7 + 5). Back up and Read off x are still disabled, and the next enabled control is "Start over", which wipes everything. The QA contract walks the same path, so QA never sees the key state. A real learner following the panel ("Divide until the remainder is 0") presses again, so this is mainly a QA-reachability problem. Routed.
- Predict: the hook and question agree, and 11 / 15 / 19 are a fair choice. A careful learner can check each by multiplying (7 × 15 = 105 = 4 × 26 + 1), so the guess can be solved by brute force. That is fine. I picked 11 by gut feel.
- **There is no clock on the stage.** The title, hook and question are about a 26-hour clock, but the stage is a column of equations and two readouts. Nothing wraps, nothing turns. "The 3 × 26 part is a whole number of turns" in the reveal points at turns I never see.
- Explore (probe): Divide ×4 lists 26 = 3 × 7 + 5, 7 = 1 × 5 + 2, 5 = 2 × 2 + 1, 2 = 2 × 1 + 0, with "gcd = 1" shown. Back up ×3 rewrites 1 step by step, ending "1 = 3 × 26 − 11 × 7", and highlights the row it swaps in. Read off x gives "-11 + 26 = 15 · 7 × 15 = 105 = 4 × 26 + 1" and X (MOD 26) 15. The backward substitution is visible and in order, which is the core of the lesson. But every step is one button press, and the stage does the algebra. I watch a derivation; I do not make one. ("Prefer manipulation to animation" is met only in form.)
- Text load: the finished stage holds eight equation lines plus a caption, well over the 25-word stage budget. On a phone it fills the card.
- Reveal: it quotes what I saw (remainder 1, the rewrite, −11 → 15, 105) and names my wrong pick ("11 ... is the coefficient without its minus sign, and 7 × 11 = 77 lands on 25 o'clock"). That diagnosis is excellent. Then: "Such a and b exist exactly when the gcd is 1: only 12 of the 25 non-zero hours on this clock have an undo, and 13 has none." **Nothing on stage shows a number without an undo.** I never try 13, and I never see Euclid stop at a gcd other than 1. "This is the step RSA uses to make a private key" is one told context sentence.
- 75 s chip (product-owner item). No FATAL: the arithmetic checks out (7 × 15 = 105 = 4 × 26 + 1; 77 = 2 × 26 + 25).

## 2. After reading the brief (meta.json learner, objective, misconception only)

No earlier learner review exists (only a fact-check; build.md not read).

Show the why you promised (decision 2026-10-14-told-vs-shown):
1. doesNotKnow "Euclid's steps run backwards write 1 as a mix of 26 and 7": **shown** by the Back up rows.
2. doesNotKnow "this mix gives the x with 7x = 1 on a 26-hour clock": **shown as arithmetic** (the green −11 + 26 = 15 check line). There is no clock where the 3 × 26 vanishes as whole turns, but the check line stands for it. Pass, weakly.
3. The objective also asks the learner to explain "that such an undo exists exactly when the gcd is 1". This is **told only**. Under the rule that is a revise. One way that keeps one representation: let the learner swap 7 for 13 (or another even number) on the same equation column, so Euclid ends at gcd 2 or 13, Back up cannot reach 1, and the X readout says "none".

Misconception ("undo by dividing, or not at all"): the stage never shows dividing failing. The reveal does not mention 1/7 either. The misconception is not confronted, only bypassed.

## 3. Findings

1. **Revise (top):** "an undo exists exactly when the gcd is 1" is in the objective but only told; nothing on stage shows a multiplier with no undo.
2. **Revise:** a lesson framed on a clock shows no clock. "Whole number of turns" points at nothing. A ring of 26 hours with 7 × 15 wrapping to 1 (and 7 × 11 landing on 25) would carry the reveal's best sentence.
3. Routed (qa-tester / demo-builder): on the once-per-control QA path the reveal is unreachable, because Divide needs four presses and "Start over" comes next.
4. Minor: the finished stage is well over the 25-word text budget; each press does the algebra for the learner.
5. Minor: 75 s chip.
