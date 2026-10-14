*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): metal-feels-colder
lesson version: v1 (meta.json version 1)
boundary: touch-knower (the lesson's own: knows hot and cold, that a thermometer reads temperature, and that metal feels cold to touch; does not know that objects left in one room reach the same temperature, or that skin senses the rate heat leaves it, not the object's temperature). First learner review of this lesson.
Screenshots seen: yes (artifacts/walkthroughs/metal-feels-colder/sheet.png, release build recorded 2026-10-14T15:26Z, 7 frames; 07-reveal.png opened at full size)
Verdict: revise

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("The metal"), the pick my boundary makes.

1. **Where it first asks for an idea I don't have: nowhere before the reveal.** The thermometer is inside my boundary, and the stage leans on it first. Good order: probe (20 °C, 20 °C) before touch.
2. **No answer before the commit: fails on option shape.** Options are "The metal / The wood / Neither: both are 20 °C". The right option is the only one with an exact number and the only one that carries its own reason; the stem also says "the same 20 °C room", so "both are 20 °C" repeats the stem. The standard names exactly this ("the right option must not be the only one with an exact number ... an option worded more precisely than the others"). A learner who reads options for shape will pick it without reasoning; for my boundary the pull of "metal feels cold" is strong enough that many will not, but the rule is the rule.
3. **Shows the why: met for both gaps.** Probe readouts show 20 °C on both blocks (first gap). Touch shows "skin 21 °C" on aluminium, "skin 30 °C" on pine, with a thick solid red arrow into the metal and a thin dashed one into the wood, and the caption "Arrow: heat leaving the finger" (second gap). The reveal points at all of it.
4. **The reveal quotes a number that is not on the stage: "the metal's heat-flow arrow was 4.4 times thicker".** The arrows have no readout; I can see "thicker", not "4.4 times". Every number the reveal names must be on stage at reveal with the stage's rounding. "Thicker", or a flow readout beside each arrow, would satisfy it.
5. **"Swap metal" looks dead.** Aluminium → Steel changes the label, but the skin readout stays "skin 21 °C" and the arrow looks the same (frames 04 and 06). A learner who taps it gets no visible change and may think it did nothing, or that every metal is the same. If the point is "any metal does it", the stage does not say so; if steel should differ, the readout rounding hides it.
6. **Fit and budget: met.** Reveal 72 words; 07-reveal ~795 CSS px tall, stage top and last line on one 390×844 screen.
7. Minor: "Perfect contact, first seconds" is a modelling caveat in stage text that my boundary will not parse; harmless.
8. Trust line reads 0/7 claims checked (fact-checker's gate; finding 4's 4.4 is one to check against the arrow widths).

Where understanding first broke: it did not break on the idea; the risks are the option leak (2) and an unseeable quoted number (4).

## After reading build.md

Read after the section above; no earlier reviews exist. Pre-flight 2 flags the option itself ("the right option carries the only number, but 20 °C is the room temperature given in the question") and asks the reviewer to judge: I see it differently, because the standard's test is the option set, and repeating the stem's number in only the right option makes it the one that points. Steel was added by the builder (c3); finding 5 stands either way. Nothing else in build.md changes findings 2, 4 or 5. Fix route: demo-builder (option wording, arrow readout or drop "4.4", make Swap metal visibly do something or say why it does not); category manager owns option and reveal wording.
