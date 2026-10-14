*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8, build 5 walkthrough): every-scale-equally-likely
lesson version: v3 (meta.json version 3; the walkthrough shows the v3 question "How many times as many links land 2–3 away as 256–512 away?")
boundary: knows-1-over-d-routing (has done near-and-far-links-find-the-way; does not know why: with chance ∝ 1/d, each doubling band gets about the same share). Same tag as r6/r7.
Screenshots seen: yes (artifacts/walkthroughs/every-scale-equally-likely/sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact (written before reading build.md)

- No answer before the commit: pass, and the r7 blocking finding is fixed. The question now asks the ratio; options "About 100×" / "About 10×" / "About 1×", same form. "About 100×" is the per-distance intuition (1/2 vs 1/256), a fair wrong guess. Locked chart is nine "?" bars, no rule selected.
- The why is on the stage: Uniform piles at the far band (50), 1/d² at 1 (61), 1/d is flat (15, 12, 11, 11, 10 … 10) with the other two kept as dashed outlines. The compare line "2–3: 2 × 0.42 → 12.2% · 256–512: 257 × 0.0027 → 10.2% · ratio 1.2×" and the band slider (8 distances, 1/8 to 1/15, 10.6%) show "more distances, each less likely, cancel". The axis note now explains the 257 (r7 minor fixed).
- **Main finding (The reveal fits with its picture): the band chart is off screen when the reveal opens.** In 06-reveal the stage starts at the axis note (a thin, unreadable strip) and the buttons; the bars and the dashed outlines are above the visible top. The reveal points at them: "Every band from 2–3 out gets 10–12%" (the bars) and "(the dashed outlines)". The compare line it also names is visible.
- **Second finding (text budget): the reveal is ~112 words on a new version (budget 90).** Three paragraphs; the Uniform / 1/d² sentence and the 0.42 / 0.0027 restatement repeat the compare line.
- Minor (from r7): the locked frame still crops the readouts at the bottom of the stage (BAND'S SHARE cut off).
- Minor: the compare line is still about 20 words of arithmetic; stage text is near or over 25 words while 1/d is selected.

## 2. Earlier findings (r7), read after section 1

1. Blocking, the answer key fought the stage (12.2% vs 10.2% called "about equal"): FIXED (ratio question, "ratio 1.2×").
2. Minor, band edges inconsistent: FIXED (axis note).
3. Minor, compare line dense: partly fixed (totals dropped).
4. Minor, locked frame crops readouts: NOT FIXED (builder says not changed).

## 3. After reading build.md (Pre-flight v3)

- Pre-flight 5 says "1/d on stage at the reveal with the compare line and both outlines": on stage in the DOM, but not on screen at 390×844. No Pre-flight item 7; "Not run: build, QA, walkthrough, tsc."
- Verdict: revise (chart and outlines off screen while the reveal points at them; ~112 words). No FATAL.
