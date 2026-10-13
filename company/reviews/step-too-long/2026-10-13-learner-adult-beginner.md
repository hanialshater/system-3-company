*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: step-too-long
lesson version: v1
boundary: adult beginner; knows a ball rolls to the bottom of a bowl and y = x²; does not read update rules like x ← x − η·2x.
Screenshots seen: yes (sheet.png, 8 frames)
Verdict: launch

## 1. From the artifact

- First idea I didn't have: the update rule "x ← x − η·2x" and the symbol η in the question. A beginner cannot compute from it; the hook ("What happens if each stride is too long?") and the bowl picture carry the intuition instead. "Under 0.1" is the natural pull (bigger steps = faster).
- Explore shows the break clearly: η 1.1, Step → ball jumps across the bottom to 1.200; To step 5 → a zig-zag of dashed jumps climbing the walls to 2.488. PER-STEP FACTOR ×0.2, ×0.0, ×1.0, ×1.2 as I tap sizes is a good summary.
- Told-not-shown: in this path I never stepped at η 0.4 or 0.5, so "exactly 0 at 0.5 (one step lands on the bottom)" and "bouncing forever" at 1.0 are read from the factor readout, not watched. The panel invites it; fine.
- "|1 − 2η|" in the reveal is algebra a beginner skims; the factor readouts already said it.
- Layout: large empty area above the bowl in explore frames; in the reveal the bowl shrinks but the zig-zag stays readable.

## 2. After reading the brief

- Learner field (knows gradient descent steps downhill) is slightly above my boundary; still reachable via the bowl.
- Suggested fix (minor): say "step size η (how far each stride goes)" and drop the update rule from the question, or move it to the stage caption.
