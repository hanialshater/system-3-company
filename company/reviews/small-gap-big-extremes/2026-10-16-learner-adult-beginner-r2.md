*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: small-gap-big-extremes
lesson version: v3
boundary: adult beginner: knows averages and has seen a bell curve; does not know standard deviation, tail probabilities or likelihood ratios
Screenshots seen: yes (/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/wt/0dbb/artifacts/walkthroughs/small-gap-big-extremes/sheet.png, recorded 2026-10-16T15:56:10Z, phone, choice 1)
Server: http://localhost:3591, BUILT_FROM bf6fde86961edff82325289e54bb1e93d24c3c60 at start and at end (unchanged; contains 169e88d)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: the unlabeled "130" tick under the B/A share bar at the 140 cm cutoff. Nothing says what it marks (B's share at 130? a cutoff?). I guessed it is where the bar split sat at 130 cm, but I was not sure. Also, the walkthrough slid straight from 120 to 140 and "Show me why" unlocked; the 130 cm state, the one the question asks about (82%), was never on my screen, so the reveal's headline 82% arrived as text, not as something I saw. The panel does say "Slide the cutoff to 130 cm, then to 140 cm", so a learner who follows it will see it; one who drags to the end will not.
2. What the prediction felt like: genuine. "Same spread, 5 cm taller" made "About 50%" or "About 65%" feel right; "spread (10 cm)" is opaque to me (I do not know it is a standard deviation) but I did not need it to guess. Minor: the locked stage's picture description reads "B is 75% of plants above it" at 120 cm while the readout shows "-"; a screen-reader learner gets a strong hint before predicting.
3. Whether the reveal answered my question: mostly. My question was "how can a tiny gap make B dominate the top?" The counts per 100,000 (135 vs 621, then 3 vs 23) made it concrete and the last line names the idea. It tells me A's tail falls faster but not why; for 60 seconds I accept that. At 140 cm the shaded tails are invisible on the chart, so the counts line carries the whole point there.

Verdict reason: no finding blocks a first-time adult learner; notes 1 (unlabeled 130 tick; the 82% case can be skipped by dragging to the end) and the predict-state alt-text hint are fixes worth making.

## After reading meta.json and the previous round (r1, v2)

- meta.json version is 3, matching the stamp. Objective: say that a 5 cm gap makes B 82% above 130 cm and 88% above 140 cm, because A's curve falls away faster. The "because" is carried in v3 by the per-100,000 counts (135 to 3 vs 621 to 23), which worked for me better than a sentence about steepness would.
- r1 finding (a), the second, unrelated 80% ("sharing about 80% of their area"): fixed. The v3 reveal says only "The two curves mostly overlap"; the only 80-ish number is the answer.
- r1 finding (b), reveal unlocks before the learner sets 130 cm: **not fixed**. I found the same thing independently (finding 1). r1 called it blocking; I called it a note. My reason: the panel tells the learner to stop at 130, the reveal states the 82% and the 4.6-to-1 ratio in words, and the 140 cm case the learner did see shows the same effect more strongly. This is a disagreement with r1, recorded here so it travels: if the evaluation-steward or cm-probability treats "the asked-about number must be seen, not read" as a standard, this verdict should be read as revise on that point.
- r1's note on the "130" marker on the share bar: still unlabelled in v3 (my finding 1).
- Verdict changed from revise (r1) to launch.
