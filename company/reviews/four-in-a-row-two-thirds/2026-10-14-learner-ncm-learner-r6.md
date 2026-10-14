*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, r6 wave): four-in-a-row-two-thirds
lesson version: v2
boundary: NCM course learner; knows the centre of a 3-path takes nearly all, and the Nash split (each side gets its fallback plus half of what is left); has never worked out a 4-path.
Screenshots seen: yes (artifacts/walkthroughs/four-in-a-row-two-thirds/sheet.png, 5 frames, plus 03-step-2.png at full size)
Verdict: revise

## 1. From the artifact

- Predict: "A–B–C–D in a line; pairs A–B and C–D each split $1. Each pair splits fairly given outside options. What does B get?" Options $0.50 / about $0.67 / nearly $1. These are well chosen: the half-guess and the all-guess are exactly the two naive views.
- **The locked stage leaks the answer.** The empty "B's share by round" chart already has a dashed target line labelled "⅔" (frame 01). With "About $0.67" among the options, a learner who glances at the stage before committing is handed the answer. This is the W-154 pattern.
- Explore:
  - Round 1: B's fallback $0.500, B gets $0.750, and the bars show a hatched fallback block inside each pair's split.
  - "Run until settled" jumps to round 8: A $0.334, B $0.666, B's fallback $0.332. The share line wiggles and then flattens on the ⅔ line.
  - The fallback chain (B's fallback comes from the B–C dashed link, so it is whatever C would leave B) is drawn. But the step that makes it click, B's fallback rising because C's deal moved, happens only in one Next-round step before the jump. I saw the fallback go 0.000 → 0.500 → 0.332 and could not say why it went down.
- Reveal:
  - "$0.750, then $0.625, then $0.688" were never on stage as numbers. I stepped once and then ran to settle, so 0.625 and 0.688 were only unlabelled dots on the chart (W-150).
  - "Settled at $0.667 ... A kept $0.333" contradicts the stage, which reads B $0.666, A $0.334 and B's fallback $0.332. The difference is small, but the reveal is quoting numbers I did not see.
  - "C's fallback is B, so C is never desperate. Each inner person's outside option feeds the other's" is the heart of the lesson, and it is told. The reveal does not point at the hatched fallback blocks or at the dashed B–C link.
  - "B's share = 1 − half of C's" is the fixed point. It is told and not checkable on stage.
- Legibility: the "hatched = fallback" caption is drawn over the bar axis labels, so it reads "hatc3hed = fallb6ack" (frame 03). "Model: each pair covers both fallbacks, then halves the rest" is a dense first line for the stage.

## 2. Earlier findings

There is no earlier learner review. The boundary is taken from meta.json's learner field.

## 3. After reading the brief

- The objective asks the learner to *explain why each inner person's outside option depends on the other inner person's deal*. Under "Show the why you promised", the stage must stand for this and the reveal must point at it. The stand-ins exist (the hatched fallback block and the dashed B–C "fallback" link), but on the path the gate allows (one step, then run) the learner does not watch B's fallback change because C's split changed, and the reveal names the dependency in words without pointing at those marks. **Revise.**
- Top finding: the "⅔" label on the locked stage gives away option 2.
- Reveal/stage number mismatch (0.667/0.333 vs 0.666/0.334) and quoted round values not on stage: fix both, or show the round values in the readout.
- Trust sheet 0/5 checked (DRAFT): fact-checker gate.
- No FATAL (the model disclaimer is present and the numbers converge correctly).
