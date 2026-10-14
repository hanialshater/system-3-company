*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r3): clay-boat
lesson version: v4
boundary: adult beginner (school science, does not know Archimedes' principle)
Screenshots seen: yes (sheet.png, 3 frames, phone viewport, server :3425). Also my own Playwright capture of the small-cup state (one slider step, 2.5 s wait), because the contract path passes through it in a single keypress.
Previous review: 2026-10-14-learner-adult-beginner-r2.md (v3, revise)

## 1. From the artifact (fresh)

- Predict: the locked stage shows only the ball and "0.56 L", with no push/weight arrows, so nothing gives the answer away. The options 0.56 L / 1 L / 2 L are a fair guess. I chose 0.56 L.
- Explore: on the contract path, two slider steps go ball → small cup → big cup. The final frame shows "Floats: pushes aside 1.00 L of water, weighing 1.00 kg", push and weight arrows, and a ledger "Tried: ball 0.56 L · small cup 0.56 L · big cup 1.00 L".
- The small cup, when I stop on it: "Sank: held back at most 0.80 L, then flooded. Now only its clay pushes water aside." The cup is drawn full of water on the bottom, with push 0.56 kg against weight 1 kg. That is a clear, shown counter-example.
- Reveal: ball 0.56 L, big cup 1.00 L, and the small cup's 0.80 L / flooded / 0.56 L. All of these are states on the slider path, and the ledger proves the small cup was visited. On the contract path, though, the learner was on it for only a moment, and the ledger records "small cup 0.56 L", not the 0.80 L.

New findings (minor):
- N1: the ledger could say "small cup: flooded at 0.80 L". Then the reveal's 0.80 L stays on screen even for a learner who swipes straight past.
- N2: the question says "bowl" and the stage says "cup". This is a small wording mismatch.

## 2. Earlier findings (r2)

- Small cup / flooding / 0.80 L narrated but never seen: FIXED. The small cup is now a stop on the only path to the big cup, it shows the 0.80 L and the flooding, and the ledger records the visit. The residual risk of a brief visit is noted in N1.
- Push/weight labels leaking before the guess: still fixed.
- 5.9 cm / 2.5 cm labels: still fixed.

Verdict: launch
