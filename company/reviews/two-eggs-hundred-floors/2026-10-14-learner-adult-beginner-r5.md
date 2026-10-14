*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5, first learner review): two-eggs-hundred-floors
lesson version: v2
boundary: adult who knows binary search halves a sorted range and has met reusing answers; does not know that halving is the wrong plan when you can only fail once or twice (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/two-eggs-hundred-floors/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact

- Predict: the highest safe floor of 100 with 2 eggs; a broken egg is gone. The fewest drops that always work: 7 / 14 / 50? "7" (halving, about log₂100) is the natural pull, and the hook "Halving finds anything fast. Does it with 2 eggs?" sets it up honestly. The locked stage shows two empty 100-floor towers (A: start 50, halve; B: after you predict) and an empty tries table. Nothing leaks.
- Explore: the chips choose when egg 1 breaks. 1st: A drops at 50, breaks, egg 2 climbs 1–49, so 50 drops; B drops at 14, breaks, egg 2 climbs 1–13, so 14. 2nd: A 26 vs B 14. 3rd: 15 vs 14. 4th: 9 vs 14. Never: 7 vs 12. The table builds A's column 50/26/15/9/7 against B's flat 14/14/14/14/12, with "Worst: 50" vs "Worst: 14" under each tower. The flat column is the insight: B pays the same whatever happens. I checked several rows (75 → egg 2 51–74 = 26; 27 → egg 2 15–26 = 14) and they are consistent.
- Reveal: cites the 1st-drop case and the worst values seen, explains the shrinking gaps (14, 13, 12…) and why 13 fails (91 floors), and notes the 12-vs-7 price. The gap rule is told, but the B tower's ticks get visibly closer going up, so it is half shown.
- Finding (minor): "fewest that always works" asks for a minimum. The stage shows that B's worst is 14, not that nothing beats 14. "13 cover only 91" carries the minimality as a told sentence. Acceptable for 60 s.
- Finding (minor): the text inside the towers ("× 27", "egg 2: 15–26", "Drops / Worst") is very small at phone size. The tries table carries the comparison.
- Finding (minor): in the reveal frame the stage's caption line is clipped at the top.
- Finding (route): the card shows DRAFT and "0/8 claims checked". The claims are not fact-checked yet (fact-checker item). My launch verdict concerns the learner experience only.

## 2. Earlier findings

- No earlier learner review exists for this lesson (only a fact-check), so there is nothing to check off.

## 3. New findings

- Minor only (section 1). The launch verdict is the learner view. The 0/8 claims still need the fact-checker before any launch gate.
- No FATAL.
