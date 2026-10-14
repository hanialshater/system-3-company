*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7, wave F): drop-the-losing-start
lesson version: v3
boundary: adult-beginner. Knows a running total (assumed); does not know that a negative running total can be thrown away, or Kadane's algorithm (meta.json learner field; no r6 exists, tag kept from r5).
Screenshots seen: yes (artifacts/walkthroughs/drop-the-losing-start/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact (written before reading r5 or the brief)

- Predict: "Daily gains: -2 1 -3 4 -1 2 1 -5 4. What is the biggest total over a run of consecutive days?" Options 4 / 6 / 12, all numbered. 4 (best single day) and 12 (all positives) are honest traps. The title names the method ("drop the stretch that went negative"), not the answer. Locked stage shows the chips and an empty chart; the y-axis ticks (4, 8, 12) include two wrong options, nothing marks 6. No leak.
- Explore: "Next day" plots −2; "Start over" resets the solid line to 0, labelled "dropped −2". With "Auto: start over below 0" and "Play to day 9" the solid line drops −2 again after day 3, then climbs to "Best 6, days 4–7" while the dashed "Kept everything" line stays at or below 2. The gap between the two lines is the stand-in for the why: dropping a negative stretch lifts everything after it.
- "Check all 45 stretches" fills a start × end triangle and rings 6: "Your best 6 matches the 45 stretches." The brute-force check is seen.
- Reveal: −2 after day 1, −2 after day 3, days 4 to 7, 6, "never got above 2", 45 all came from my run. It points at the dashed line, which is the stage element for the why.
- Minor: in the reveal frame the chart (the dashed line the reveal points at, and the "dropped" labels) is scrolled out of view; only the triangle and controls show. The learner saw it a second earlier and can scroll back, but the quoted state is not in view when the reveal opens.
- Minor: "dropped −2" labels under the chips are clipped at the left edge ("lropped −2").
- Minor: the 45-stretch triangle is dense on a phone; the ring on 6 carries it.
- Minor: the panel asks me to drop "when it has become a burden"; the actual rule only appears on the Auto button and the rule line.
- Minor: "without trying every pair" (hook) means start/end pairs; "every stretch" is plainer.

## 2. Earlier findings (r5, v2)

1. "Burden" left to the learner: **not fixed** (minor).
2. "dropped −2" clipped at left edge: **not fixed**.
3. Triangle dense; chart scrolled out in the reveal frame: **not fixed**.
4. Hook "every pair": **not fixed**.
5. Trust link "0/5 claims checked": **fixed** (now "5/5 claims checked").

## 3. Verdict

launch. The idea (a negative stretch can only drag down what follows, so drop it; one pass finds what 45 checks find) is on the stage as the solid line pulling away from the dashed line. Minors are layout only. No FATAL.
