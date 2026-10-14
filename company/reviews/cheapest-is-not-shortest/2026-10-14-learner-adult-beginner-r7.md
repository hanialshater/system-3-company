*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): cheapest-is-not-shortest
lesson version: v4
boundary: adult beginner; can add; has used a map app; knows that spreading out from a start finds the fewest steps; has never seen Dijkstra, "settling" or "labels".
Screenshots seen: yes (artifacts/walkthroughs/cheapest-is-not-shortest/sheet.png, 6 frames)
Verdict: launch

## 1. From the artifact (written before reading r6)

- Hook: "One road or three?" / "The straight road to G, or a route with more roads. Which costs less?" A real tension, and it doesn't say which one wins.
- Predict: "Each tap settles the town with the smallest label. When S is settled, G gets its first label from the straight road. What happens to G's label before G is settled?" The options are stays the same / goes down / goes up, all worded the same way. The locked stage shows the road costs with "?" on every town, and the label definition sits under the map. Two small pointers to the answer: "its *first* label" suggests a later one, and "cheapest found so far" rules out "goes up". "Stays the same" is still the natural beginner guess (first found = the answer), so the commit still tests the misconception. I chose it and was wrong, which is the point.
- Explore: four taps, S, A, B, G. Each step's line shows the sum ("B: 3 + 4 = 7 (was 8)", "G: 7 + 2 = 9 (was 10)"), and the trace row "G's label so far: 10 → 9" keeps the moment visible. The "why" now has its own line at every settle: "Other ways to A pass B 8 or G 10: already more", "No town left that could beat 9." From the stage I could say why settling the smallest label is safe: every other open label is already bigger.
- Reveal: "10 then 9" and "G back to B would cost 11, more than B's settled 7" both appear in the trace "Your run: G 10 → 9. G to B: 11 > 7", which is still on stage when the reveal opens. The reveal ends on the idea (first found is not final, fewest roads was the dearest).
- Minor findings, not blocking:
  1. Text budget: frames 03 and 04 show about 35-40 stage words (step line + why line + label definition + trace). That is over the 25-word budget. A phone reader skims.
  2. The ∞ part of the label definition never applies: after S is settled no town shows ∞. It is dead text.
  3. "Settle" is never defined as "final" on the stage. Only the reveal says "first found is not final". The trust sheet (c5) defines it, but learners don't open that.
  4. The "first label" wording in the question leans toward "goes down" (see above).
  5. The trust sheet shows 1/5 claims checked. That is a gate for fact-checking, not for me.
- Reset: the walkthrough path didn't press "Start again", so I can't confirm the reveal survives Reset.

## 2. Earlier findings (r6, on v3)

1. The prediction was plain arithmetic from the stem: **fixed**. The stem no longer prints totals, and the question is about how labels behave.
2. "Settle", "label" and "∞" were undefined: **mostly fixed**. The label and ∞ definition is a fixed line under the map. "Settle = final" is still only implied (minor finding 3).
3. The hook gave away the answer: still **fixed**.
4. Trust sheet: **not my call**. It now shows 1/5 checked, which looks like the claims were re-opened for v4.
5. Why smallest-first is safe was told, not shown: **fixed**. The per-settle "other ways ... already more" line and the "G to B: 11 > 7" trace put it on the stage, and the reveal points at it.

## 3. After reading the brief (meta.json learner field)

- doesNotKnow: "the fewest-road route can be the dearest" is shown (G 10 → 9 via three roads). "How settling the smallest label finds true costs" is shown by the why line at each settle. This meets "Show the why you promised".
- Launch from the learner side. Publishing still needs claim verification by fact-checker.
