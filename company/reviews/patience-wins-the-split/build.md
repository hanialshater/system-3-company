# Build note: patience-wins-the-split

- Builder: ncm-e03 (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/economics.markets.md, Course NCM #24 (accepted version; prerequisites ultimatum-game + present-value).
- Intent: bars for games with a deadline after 1, 2, 3 … rounds (up to 20 drawn), each the first proposer's share by backward induction; a dashed line at the no-deadline share 1/(1 + δ). "+1 round", "+10 rounds", "400 rounds", "1 round" change the game length; "Shrink 10% / 30% / 50%" presets (instead of a free slider, so QA reaches 50%). The message line shows the backward-induction step: "First round: offer 0.9 × 10.0% = 9.0%; keep 91.0%."
- Numbers re-run: δ 0.9 gives 1, 0.1, 0.91, 0.181 …; 50 rounds 0.5236, 51 rounds 0.5288, 400 rounds 0.5263 = 1/1.9. δ 0.5 → 0.6667, δ 0.7 → 0.5882.
- One-round convention: the proposer keeps 100% (responder accepts when indifferent), as in lowball-offer-should-pass.
- Rubinstein (1982) is named only in claim c5's source; the learner sees "a simplified model".
- Milestones: long-game (50+ rounds) and half-shrink (50% preset). QA order (30%, 50%, +1, +10, 400, 1 round) reaches both.
- Not run (per dispatch): next build, QA, walkthrough, tsc.

## Revision v2 (wave E, r6 learner review)

- r6 top (the question's 10% case was off the required path; the reveal said "400 rounds gave 52.6%" when the learner's 400 rounds gave 66.7%): milestones are now long-10 (a game of 50+ rounds at the 10% shrink) and long-other (a long game at another shrink). The round buttons come first in the DOM, so pressing each control once runs 400 rounds at 10% before any shrink is switched. Every long game is recorded (shrink, rounds, share) in a row under the readouts ("Long games: 10% shrink → 52.6% · 30% shrink → 58.8% · 50% shrink → 66.7%") that "1 round" does not clear. The reveal quotes the records.
- r6 minor (dashed "no end date" line drawn as soon as a shrink was chosen): there is no pre-drawn limit. The dashed line appears only at a shrink with a recorded long game, at that recorded share, labelled "your 400 rounds: 52.6%".
- r6 minor (dark vs light bars): the axis note now says "dark = this game".
- "1 round" moved to the end of the shrink row (it is the reset).
- c2, c3, c4 reworded and unverified.

## Pre-flight v2

1. Title and hook: "Does going first win the bargain?" / "You make the first offer on a shrinking pie, with no deadline. How much can you keep?" Neither gives a share.
2. Options: "About 90%" / "About 53%" / "Exactly 50%". All whole percents. "Exactly" belongs to the fairness distractor, not the answer.
3. Locked stage: empty grid (0/50/100%), "Predict first.", readouts "?", "Shrink 10%" active. No bars, no dashed line, no share label.
4. Reveal values: "100% with one round": the 1-round bar, always on stage after unlock (a). "0.9 of a proposer's share" and the stage line "offer 0.9 × …": the 10% shrink the learner ran at milestone long-10 (b). "Your 400-round game at 10% left 52.6%": the long-10 record (b), in the records row. "1 ÷ (1 + 0.9) = 52.6%": told formula (claim c3), next to the learner's own number. "At 50% shrink your 400 rounds gave 66.7%": the last long-other record (b), in the records row.
5. QA path: +1 round (2 rounds at 10%) → +10 (12) → 400 rounds (long-10) → Shrink 30% (n stays 400: long-other) → Shrink 50% (recorded) → 1 round. The records row shows all three long games when the reveal opens.
6. Reset: "1 round" pressed last. Reveal from that run: "With one round the proposer took 100%: the other can only accept or get nothing. Each round you added in front changed that. The responder can say no and propose next round, which at a 10% shrink is worth 0.9 of a proposer's share, so the proposer must offer that much and keeps the rest. That is the line above the chart: "offer 0.9 × next share". / Your 400-round game at 10% left the first proposer 52.6%, close to 1 ÷ (1 + 0.9) = 52.6%. Going first is a small edge when waiting is cheap. At 50% shrink your 400 rounds gave 66.7%: the costlier the delay, the more going first is worth. / A simplified model: both players are rational and know the shrink rate."

## Pre-flight v3 (demo-builder, 2026-10-14, fact-check pass 24 fixes)

W-236, c2 (disputed). The reveal said "That is the line above the chart", but on the QA path that line shows the 1-round state when the reveal opens.
- The reveal now says "That was the line above the chart at 10%:" and quotes the line as it read on the recorded longest 10% run, using the same formula as the stage line. At 400 rounds it reads "First round: offer 0.9 × 52.6% = 47.4%; keep 52.6%." (re-run in node). A record is written only when that state is on stage.
- c2 is reworded and set to unverified. No mechanics changed. Not run: build, QA, walkthrough.
