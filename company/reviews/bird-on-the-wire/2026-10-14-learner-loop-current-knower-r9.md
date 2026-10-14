*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): bird-on-the-wire
lesson version: v1 (meta.json version 1)
boundary: loop-current-knower (the lesson's own: knows current flows round a loop (current-same-around-loop) and that high voltage is dangerous; does not know that voltage is a difference between two points, or that current flows through something only when its two ends sit at different voltages). First learner review of this lesson.
Screenshots seen: yes (artifacts/walkthroughs/bird-on-the-wire/sheet.png, release build recorded 2026-10-14T15:25Z, 7 frames; 07-reveal.png opened at full size)
Verdict: revise (narrow: one label)

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("About 11,000 V"), the pick my boundary makes: the line "is" 11,000 V, so the bird is.

1. **Where it first asks for an idea I don't have: the "Foot 1" and "Foot 2" readings.** The meter box says "foot 1 · 11,000 V" and the seen line "feet 11,000 V". For me, who does not yet know voltage is between two points, that reads as "this foot is at 11,000 V", a one-point voltage, which is my misconception. The second lead does go from the meter down to the ground line in frames 02–03, but it is a thin black line with no label, and nothing says "to ground". Then the reveal opens "Your voltmeter read 11,000 V at each foot" and closes "Voltage is always between two points". Read together, I am told voltage is between two points right after being shown (and told) a voltage "at" one point. The answer is in the picture (the black lead), but the words on the stage and in the reveal point the other way. This is the brief's first doesNotKnow item, so it matters more than a label nit.
2. **No answer before the commit: met.** "About 11,000 V / About 5,500 V / Less than 1 V", all numeric, same form. Locked stage: "? V", controls disabled, line labelled 11,000 V · 200 A (the question's own number).
3. **Shows the why for the second idea: met.** "Across feet" reads 0.002 V at 5 cm, 0.003 V at 7 cm, and "bird 0.2 µA" / "0.3 µA" sits by the bird; wing on pole turns the bird path thick red, "bird 1.1 A", meter "foot–pole 11,000 V". Current-follows-difference is on the stage, and the reveal points at it.
4. **The reveal quotes what I saw: met.** 11,000 V, 0.003 V, 7 cm, 11,000 V to pole are all on the seen line at reveal ("seen: feet 11,000 V / across 7 cm 0.003 V / to pole 11,000 V"). 200 A is on the line label.
5. **Fit and budget: met.** Reveal 76 words; 07-reveal ~795 CSS px tall, stage top and last line on one 390×844 screen.
6. Minor: at reveal the stage is in the wing-on-pole state, so the bird shows 1.1 A while the reveal's first paragraph is about the feet-only case ("almost none goes through the bird"); the 0.003 V is on the seen line but the 0.3 µA is not. A seen-line entry for the feet-only bird current would let the contrast be read at once.
7. Minor: "Never approach real power lines: current can jump across air" is a safety line, told; fine as context (claimed?).
8. Trust line reads 0/6 claims checked (fact-checker's gate).

Where understanding first broke: at step 1, "foot 1 · 11,000 V", which confirms the one-point idea the lesson exists to replace.

## After reading build.md

Read after the section above; no earlier reviews exist. Nothing in build.md changes finding 1. Fix route: demo-builder (name the second point on the single-foot readings, for example "foot 1 to ground", and the matching reveal words); category manager owns the reveal wording.
