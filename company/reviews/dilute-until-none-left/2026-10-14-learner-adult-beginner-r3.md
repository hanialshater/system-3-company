*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r3): dilute-until-none-left
lesson version: v4
boundary: adult with school-level science; knows kitchen dilution, not mol/L.
Screenshots seen: yes (sheet.png caught the auto-run mid-way at step 13, so I re-drove it with a Playwright probe sampling every 500 ms for 15 s; final frame in scratchpad probe/dilute-until-none-left-end.png)
Verdict: launch

## 1. From the artifact

- Predict: the locked stage shows the start tube banner (6.0 × 10²¹ molecules) and "?" readouts. No option is given away.
- Explore: "Dilute automatically" now slows at 20 and 21 and **stops at step 22** (average 0.60, "20 tubes drawn: 15 empty", one empty tube drawn). The panel tells me to watch 21 and 22. The reveal unlocks there.
- Reveal: quotes 6.02 (step 21, seen for about 1 s), 0.60 and "15 of 20 drawn tubes were empty", all on stage. The hook and the question match.

## 2. Earlier findings (r2)

1. Auto-run raced past 22: **fixed** (it stops at 22).
2. Reveal quoted 0.60 and 55% that weren't visited: **fixed** for 0.60 and the tube count. The 55% is still told, but it is now set beside an observed 15/20.
3. "A few still catch one" only told: **fixed** (20 tubes are drawn automatically at step 22).

## 3. New findings

- Minor: the reveal says "about 55% hold none" right after the stage showed 15 of 20 (75%) empty. A beginner may read that as a contradiction. A phrase like "by chance, more or fewer" would help. Not blocking.
- No FATAL.
