# Build note: the-middle-voter-decides

builder: ncm-m1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report
brief: company/domains/briefs/math.discrete.md, "## Course: NCM (2026-10-14)" #1 (accepted version)

## What was built
Single card. A 0-10 line with five voters at 1, 2, 3, 8, 10. Chips pick the position under test (3, 4.8 avg, 5 centre; the active chip is disabled). A slider moves a rival in steps of 0.2. Voters fill with the colour of the position they are nearer to. A dashed "halfway" line marks the split, and a strip shows the tested position against every whole-number rival 0-10 (✓ win, ✗ loss, = tie). The middle voter gets a thick ring and a label once the prediction is in. The halfway line, the colouring and the strip are hidden until then, so the stage does not give the answer away.
The why on stage: the halfway line. A rival right of 3 always leaves 1, 2, 3 on 3's side; a rival left of 3 leaves 3, 8, 10 there. The reveal points at that line.
Milestones: average-loses (any action while 4.8 or 5 is under test) and median-holds (3 under test). QA path in DOM order: Test 3, then 4.8, which reaches both.

## Answers re-run in node (Demo.tsx duel(), extracted and run with strip-types)
- Mean 4.8. Whole-number positions 0..10 beat 4, 6, 8, 10, 8, 6, 4, 3, 2, 1, 0 others: only 3 beats all 10. 3 beats 5 by 3-2, 3 beats 4.8 by 3-2, and 4 beats 4.8 by 3-2. 3 also beats every 0.2-step slider rival.
- Recall (0, 1, 2, 4, 9, 9, 10): the only whole-number majority winner is 4; the mean is 5.

## Known gaps
- Not run: next build, tsc, QA, walkthrough (shared machine, per dispatch). Types were checked by reading only.
- The brief planned claim support "citation". The checker accepts only derivation, simulation, source and convention, so the theorem claim (c6) is "source".
- Equidistant voters abstain, which only matters when the rival sits exactly at a mirrored spot.
- All claims are unverified.

## Pre-flight v2

Revision for r6 learner review (knows-majority-vote, revise): the reveal said "a rival at 4" beat 4.8, but the learner never saw that. The rival started at 6, where every candidate wins. The gate opened on just testing 4.8. The strip cells had no labels, and the hook's "Surely" pointed away from the average.
Changes:
- The rival starts at 4. The tested position starts at 5, so all three test buttons are enabled in turn.
- Milestones: `median-holds` (3 tested), `average-loses` (4.8 tested while the rival beats it), `centre-loses` (5 tested while the rival beats it), minInteractions 3.
- The rival position at which each one first lost is recorded and shown in a "Seen:" line on the stage. The reveal quotes that rival and the voters nearer it, both computed.
- Strip cells are labelled with the rival position (0-10).
- The new hook is "Five voters on a left-right line. Which spot can beat every rival head-to-head?".
- The options are worded alike: "3 (the third voter)", "4.8 (the average)", "5 (the centre)". The old "3" was the only bare one.
- c3 is reworded and set unverified, and c7 is new (4 beats 5).

1. **Title and hook.** "Which spot wins every vote?" / "Five voters on a left-right line. Which spot can beat every rival head-to-head?" No: neither names the average, the centre or the middle.
2. **Options.** "3 (the third voter)", "4.8 (the average)", "5 (the centre)": each is a number plus a short gloss.
3. **Locked stage.** The 0-10 line, the five voters (1, 2, 3, 8, 10, also in the question) and the tested marker at 5, a distractor. No rival, no halfway line, no "middle voter" label and no strip; those appear only after the commit.
4. **Reveal values.** "lost to your rival at 4": (b) milestone `average-loses`, recorded as lostTo.mean and shown as "4.8 lost to 4" in the Seen line. "voters 1, 2, 3 were nearer it": (a) computed from that recorded rival. "The centre, 5, lost too, to the rival at 4": (b) `centre-loses`, shown as "5 lost to 4" in the Seen line. "Position 3 won against every rival on the strip": (b) `median-holds`, shown as "3 beat every rival" in the Seen line. The halfway-line paragraph and the theorem: told context (c4, c5, c6).
5. **QA path.** 3 (3rd voter) (`median-holds`, all ✓) -> 4.8 (avg) (the rival at 4 wins 3–2, `average-loses`) -> 5 (centre) (the rival at 4 wins 3–2, `centre-loses`) -> Rival slider two arrows (4.4). All three milestones are reached. The Seen line holds all three when the reveal opens.
6. **Reset.** There is no reset. Moving the rival or the tested position does not clear the Seen record. Reveal (QA path): "The average, 4.8, lost to your rival at 4: voters 1, 2, 3 were nearer it, and three is a majority. The centre, 5, lost too, to the rival at 4. Position 3 won against every rival on the strip. / The halfway line shows why. Put a rival anywhere right of 3 and voters 1, 2 and 3 stay on 3's side; put it left and 3, 8 and 10 do. The middle voter is on the winning side of every split. / The average is pulled by how far away 8 and 10 sit; a vote only asks which side each voter is on. When each voter prefers nearer, the median voter's favourite beats every rival."
