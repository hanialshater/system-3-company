*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r2): herd-immunity
lesson version: v4
boundary: adult with school-level science; knows vaccines protect people and has heard "herd immunity" and "R0", but could not say what R0 does
Screenshots seen: yes (sheet.png, 11 frames, phone viewport, server :3427; plus a viewport-only Playwright screenshot at 70%)
Previous reviews: 2026-10-13-learner-adult-beginner-v3-seen.md and -v3.md (v3, revise)

## 1. From the artifact (fresh)

- Predict: the question now defines R0 ("each sick person would infect about 4 others (that number is called R0)"). The hook asks "What happens to them when most others are immune?", which no longer leans. Nearly all 80 / About 20 / Just a handful is a real guess.
- Explore: 80% run to end gives "2 of 80". 50% gives 168 of 200 with the dots in dashed "had it" rings, 60% gives 100 of 160, 70% fizzled, 75% gives "4 × 25% = 1.0 (just replaces itself)", and 80/90 shrink. The new 75% button and the 1.0 readout are exactly what was missing.
- Where understanding broke (layout): on the phone, the stage is a scrolling box. After any run, the readouts "EACH CASE INFECTS" and "AVERAGE, 200 RUNS" sit below the 90 button, out of view, in every explore frame. They're visible only in the reveal frame, after the stage scrolls. The panel says "watch the number under Each case infects", but on the phone I can't see that number without knowing to scroll inside the stage. The key number is hidden.
- Layout bug: at 70%, the two-line caption "Over: 2 of 120. Fizzled by luck, even above 1 per case. Try a new one." overflows onto the Next step / Run to end buttons. The text sits on top of the buttons (06-step-5, and confirmed in my own screenshot).
- Reveal: every number it quotes was reached (2 of 80, 2 of 100, 168 of 200). "One run is noisy; the average ... about 4 of the 80" settles the single-run vs average question. The phrase "Below it a case more than replaces itself" is ambiguous: below the threshold immune share, or below 1? It's a minor point.

## 2. Earlier findings

- Single run vs average confusion: FIXED (the 70% caption explains luck, and the reveal names noise and the average). But the average readout is now scrolled out of view (see N1).
- The 75% threshold and 1 − 1/R0 not on the stage: FIXED (a 75% button and a "1.0 (just replaces itself)" readout).
- The 70% fizzle contradicts the rule (v3): FIXED ("even above 1 per case").
- R0 used before it is defined: FIXED (defined in the question).
- The hook leans to yes: FIXED.
- "Step 1: 1 new case" vs "2 caught it so far": NOT FIXED (the picture label still counts 2 after step 1). Minor.
- Dense reveal paragraph two: mostly FIXED (it is now about the 75% case the learner saw).

New findings:
- N1 (blocking on phone): the per-case and average readouts the panel tells me to watch are below the fold of the scrolling stage in every explore frame.
- N2 (blocking, cosmetic): the 70% caption overlaps the Next step / Run to end buttons.
- N3 (minor): "Below it" in the reveal is ambiguous.

Verdict: revise
