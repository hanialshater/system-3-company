*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): kmp-never-steps-back
lesson version: v4
boundary: knows-sliding-search (an adult who can search a text by sliding a word along it and count letter comparisons; does not know that a mismatch tells you where the next match could start, nor the fallback table). From meta.json learner field; same mind as r5.
Screenshots seen: yes (artifacts/walkthroughs/kmp-never-steps-back/sheet.png, 4 frames; the walkthrough reveal never unlocked, so I also took probe screenshots of a full "Run to end" and the reveal)
Verdict: revise

## 1. From the artifact

- Predict: unchanged, and fine. 24 / 14 / 4, with 24 given in the stem. The locked stage shows two lanes with zero counters and "0 1 2 0" under the reuse pattern, now labelled "numbers under AAAB: A's kept after a miss". Nothing leaks.
- Explore: Compare, then Compare ×4. Restart lane: "Comparisons 5 · arrow moved back 1" (the 1 in red). Reuse lane: "moved back 0", with the pattern slid one place and the arrow under the third A's "2". "Run to end" animates. At 1.2 s it read 15 / 14 ("Found at comparison 14"), and the gate was still shut, which is right. Probe: after about 2 s both lanes finish, "Found at comparison 24 · arrow moved back 5" vs "Found at comparison 14 · arrow moved back 0", and "Show me why" opens. **The headline numbers 24 and 14 are now seen on stage.**
- **Where it loses me (main finding):** the mechanism is the miss and the number it uses, and neither is marked when it happens. In every frame I saw, the only marks are green ✓s. No ✗ marks the mismatch, and nothing ties the "2" under the third A to the slide that just happened. All I see is the pattern one place further on, with three ✓s. The label "A's kept after a miss" is in roughly 8 px grey type. So "the number under the third A, 2, said keep two of them" in the reveal is an explanation I read, not one I watched. The fallback table is the brief's second doesNotKnow item, and the objective asks the learner to explain the slide by it.
- The walkthrough (QA path) ended before the run finished, so its record shows no reveal. demo-standard asks that an animated milestone be reachable within the QA wait or by a step button. Here "Compare" steps one at a time, and pressing each control once does not get there. This is smaller than a learner problem (about 2 s), but my own artifact had no reveal.
- Reveal (probe): it quotes 24, 5, 14 and 0, all seen. "3 + 2 × 5 + 1 = 14" is told arithmetic. It is fine as a check, but it rests on the unmarked "2" moment. The KMP name line is claimed context. Two lanes stacked is two places to watch, but they are one picture compared row by row, so I accept it.

## 2. Earlier findings (v2 review, r5)

1. Neither total (24, 14) seen; gate opened at 5: **fixed** (Run to end shows both; gate waits for both to finish).
2. "0 1 2 0" unlabelled: **partly fixed** (labelled, but in tiny grey type, and never highlighted when used).
3. "arrow moved back" contrast tiny: **partly fixed** (red 1/5 vs green 0 helps; the type is still small on phone).
4. Claims unchecked: **not fixed** (the card reads 2/7 claims checked; fact-checker item).

## 3. New findings

1. Main (told vs shown): at each miss in the reuse lane, mark the miss (✗ on the text letter) and light the table cell it uses ("2 → keep AA"). At the same moment, show the kept A's still ticked as the pattern slides. Then the reveal's "the number under the third A said keep two" points at something seen. This fits on the existing lane.
2. Route to QA / builder: "Run to end" needs about 2 s, and the walkthrough checked at 1.2 s. Shorten it or keep a step path that finishes when each control is pressed once.
3. Minor: the lane labels "Restart one on" and "Reuse the match" are very small on phone.
4. Route to fact-checker: 2/7 claims checked.
- No FATAL.
