*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5, first learner review): earliest-finish-wins
lesson version: v2
boundary: adult beginner who knows a greedy rule can fail (from coin-greedy-trap) but not which greedy rule is safe for booking a room (from the meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/earliest-finish-wins/sheet.png, 4 frames)
Verdict: launch

## 1. From the artifact

- Predict: four talks (A 0-10, B 1-4, C 3-5, D 4-7), one room, three greedy rules, "which fits the most talks?". The stem adds "so B (ends at 4) and D (starts at 4) fit together". That clarifies the touching-ends rule, but it also points a careful reader at the B+D pair, i.e. at the winning schedule. I still picked earliest start, so it is a hint rather than a giveaway, but it does narrow the prediction. On phone the locked stage shows only two of the three rooms; "Earliest finish first" is below the fold until explore.
- Explore: "Book next in every room" books A in the earliest-start room (B, C and D turn dashed "clash", "Booked: 1 · full"). It books C in the shortest room (A, B and D clash, "1 · full"). It books B in the earliest-finish room, with "1 · a talk still fits". One more tap books D: "2 · full". Three rooms side by side, with clashes drawn as dashed outlines, make the comparison obvious without reading the reveal. I got "earliest finish wins here" from the stage.
- During explore the hour axis is below the fold, so the bars have no scale. The "1-4" labels carry it.
- Reveal: all three counts and picks match the stage. "A clashes with every talk, and C clashes with both B and D, so no room holds 3" is checkable on the drawing. "Swapping it into any schedule never makes it worse" (why earliest finish is always optimal) is told in one clause. The stage shows only this one instance, so the general claim rests on the sentence.

## 2. Earlier findings

- No earlier learner review exists for this lesson (company/reviews/earliest-finish-wins/ holds only a fact-check and build notes). Nothing to carry forward.

## 3. New findings

- Minor: the stem's example "B (ends at 4) and D (starts at 4) fit together" doubles as a pointer to the answer. Using a pair that is not in the winning schedule (e.g. "a talk ending at 5 and one starting at 5 fit together") would explain the rule without the hint.
- Minor: on phone the third room is below the fold at predict, and the hour axis is below the fold during explore.
- Minor: the general optimality ("never makes it worse") is told. That is fine for 60 s, but this lesson shows one instance, not the rule.
- Process note (not a learner finding): the served card shows DRAFT and "0/5 claims checked", but meta.json on disk now has 5 claims marked verified (2026-10-14 fact-check). The served build at :3450 appears to predate the fact-check. A rebuild should be confirmed before launch review relies on this walkthrough (route: qa / chief of staff).
- No FATAL.
