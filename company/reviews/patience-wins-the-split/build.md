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

## v4 (2026-10-14, learner r7 on v2; v3 had only rewritten the reveal sentence)

Problems (learner r7): the reveal quoted the 10% step line, which is not on the stage when the reveal opens (it shows the 1-round line at 50% after the QA path); the line's second factor was unlabelled; "About 53%" was the only non-round option; the stage never said that a long game stands in for "no deadline".
Changes: new row "Seen at 10%, 400 rounds: offer 0.9 × 52.6% = 47.4%; keep 52.6%." built by stepText() from the longest 10% record (survives "1 round" and shrink switches); the reveal quotes the same stepText and says "Your Seen row keeps the step". The live step line reads "offer 0.9 × 69.1% (their share proposing next) = …". Options now "About 90%", "About 53%", "About 47%", "Exactly 50%" (47% is the responder's long-run share, a second-mover belief). Records row starts "Long games (stand-in for no deadline):". Caption rows `flex: none`. c2 reworded and unverified; c6 new. Version 3 -> 4.
Not run here: next build, QA, walkthrough, tsc (caller's order).

## Pre-flight v4

1. Title and hook: "Does going first win the bargain?" / "You make the first offer on a shrinking pie, with no deadline. How much can you keep?" A question; no share given.
2. Options: "About 90%", "About 53%", "About 47%", "Exactly 50%": all whole percents; two of them non-round, so 53 is no longer the odd one out.
3. Locked stage: empty grid (0/50/100%), "Predict first.", readouts "?", "Shrink 10%" active, records and Seen rows empty. No bars, no dashed line.
4. Reveal values: "100%" with one round (a) the 1-round bar and step line after "1 round"; "0.9" the 10% shrink of the question; "offer 0.9 × 52.6% = 47.4%; keep 52.6%" (b) long-10 milestone record, in the Seen row; "400-round game at 10% … 52.6%" (b) long-10 record, records row; "1 ÷ (1 + 0.9) = 52.6%" told formula (c3); "At 50% shrink your 400 rounds gave 66.7%" (b) long-other record, records row.
5. QA path: +1 round -> +10 rounds -> 400 rounds (long-10) -> Shrink 10% (disabled) -> Shrink 30% (long-other) -> Shrink 50% -> 1 round. Records row and Seen row both visible under the readouts when the reveal opens.
6. Reset: "1 round" pressed last. Reveal from that run: "With one round the proposer took 100%: the other can only accept or get nothing. Each round in front changes that: the responder can say no and propose next round, worth 0.9 of a proposer's share at a 10% shrink, so the proposer must offer that much. Your Seen row keeps the step: "offer 0.9 × 52.6% = 47.4%; keep 52.6%." / Your 400-round game at 10% left the first proposer 52.6%, close to 1 ÷ (1 + 0.9) = 52.6%. Going first is a small edge when waiting is cheap. At 50% shrink your 400 rounds gave 66.7%: the costlier the delay, the more going first is worth. / A simplified model: both players are rational and know the shrink rate." The stage shows 1 round and 100% at 50%, the records row and the Seen row, so every sentence matches.

## Pre-flight v5

builder: demo-builder (wave H revisions, batch 4) · 2026-10-14 · answers r8 learner review `2026-10-14-learner-ncm-learner-r8.md` (W-295)

Changes: reveal 121 → 77 words (tool count). Paragraph 1 shortened (the "accept or get nothing" clause and "Each round in front changes that" gone; the Seen-row quote kept); paragraph 2 shortened ("= 52.6%" after the formula, "the costlier the delay, the more going first is worth" → "costlier delay, bigger edge"); the model caveat moved onto the chart as its caption "Model: both rational, both know the shrink". Stage compaction: the two readouts are gone (the step line says what the first proposer keeps, the chart footer now says "this game: n rounds, dark" or "bars 1–20 of n"); the shrink buttons read "Shrink 10%", "30%", "50%" (aria-label "Shrink n%") so they fit one row; the "1 round" button is folded into the "400 rounds" button, which reads "Back to 1" once the game has 400 rounds; the chart is 48 units shorter (viewBox 340×148). Claims c1–c5 reopened (unverified). r8 minor (chart labels ~7 px in explore): the chart now shrinks much less because the stage has fewer rows; svg labels are 11 px on a 340-wide viewBox drawn about 320 px wide.

1. **Title and hook.** Unchanged: "Does going first win the bargain?" / "You make the first offer on a shrinking pie, with no deadline. How much can you keep?"
2. **Options.** Unchanged: "About 90%", "About 53%", "About 47%", "Exactly 50%".
3. **Locked stage.** "Predict first.", chart caption "Model: both rational, both know the shrink", empty grid (0/50/100%), footer "1 round" / "20 rounds", "Shrink 10%" active, records and Seen rows empty. No bars, no dashed line.
4. **Reveal values.** "100%" with one round: bar 1 of the chart (always 100%) and the step line at one round; "0.9": the question's 10% shrink; Seen-row quote "offer 0.9 × 52.6% = 47.4%; keep 52.6%": (b) long-10 record; "your 400 rounds ... 52.6%": (b) long-10 record, records row; "1 ÷ (1 + 0.9)": told formula (c3); "At 50% shrink you saw 66.7%": (b) long-other record, records row.
5. **QA path.** +1 round → +10 rounds → 400 rounds (long-10; the button now reads "Back to 1") → Shrink 10% (disabled) → 30% (long-other) → 50%. Records row and Seen row on screen at the reveal.
6. **Reset.** "Back to 1" pressed last (n = 1 at 50%): the records and Seen rows are kept, so the reveal is unchanged: "With one round the proposer kept 100%. Each extra round lets the responder refuse and propose next, worth 0.9 of a proposer's share, so the proposer must offer that: your Seen row reads "offer 0.9 × 52.6% = 47.4%; keep 52.6%." / At 10%, your 400 rounds left the first proposer 52.6%, close to 1 ÷ (1 + 0.9): a small edge when waiting is cheap. At 50% shrink you saw 66.7%: costlier delay, bigger edge."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 patience-wins-the-split` (390×844): crop 271 px → **1 px** (within the tool's phoneFit tolerance of ≤ 1), hiddenBelow 0, namedHidden 3 → **0** ("50%", "100%" visible); 77 words; stage 373 px, reveal 226 px, window 618 px; chart fitted 135/139 px by the kit. The chart (bars, dashed "your 400 rounds" line), records row and Seen row are on screen with the reveal's last line.

## Pass 40 fallback: NOT applied (2026-10-14, demo-builder)

- The fallback (re-word c5 without "Rubinstein's", support derivation) assumed that no learner-visible text names Rubinstein. That is not true. The public map page `/catalog` (src/app/catalog/page.tsx, linked from the Feed and from every lesson page) renders the concept names in content/curriculum/economics.json. Concept `alternating-offers`, which this lesson's `concept` points at, is named "Alternating offers: patience is bargaining power (Rubinstein)", and the map shows it next to this lesson's link. The Demo.tsx line 3 comment and content/courses/ncm/chapters.json also mention Rubinstein, but learners do not see those. As instructed, I left c5 unchanged. Two ways forward: cm-economics drops "(Rubinstein)" from the concept name (content/ is theirs), and then the builder applies the fallback; or a ruling says map labels are not lesson claims.
