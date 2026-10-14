# Build note: middle-of-three-takes-all

builder: demo-builder (ncm-e00) · 2026-10-14 · brief: Course NCM #3

- Intent: path chips (2 / 3 people), nodes in a line, the active deal's edge highlighted, the left-out end dashed with its ask, and a $1 split bar between Bo and the current partner.
- Dynamic (lesson rule, claimed as c1/c4): each round the left-out end offers to take 10 cents less than the matched end; Bo switches. Bo's share 0.50, 0.60, ..., 1.00 in five rounds (node re-run). At $1.00 the message says no one can ask less than $0: stable. The falling ask labels are the stand-in for "the spare partner pushes the split".
- Two people: fixed even split, labelled as a model rule (c3).
- Milestones: "three" (3 people chosen) and "settled" (round 5). Controls in DOM order: 3 people, Next round, All rounds, 2 people. A single press of each reaches both.
- Empirical claim 2 of the brief (Cook et al. 1983 lab results) is kept out of learner text and meta, as the brief requires. Reveal says "in the limit" per the brief's edit.
- Not run here: build, tsc, QA.

## Pre-flight v2

Revision for r6 (adult-beginner): the title "The middle of three takes all" answered "what share does Bo end up with?". Renamed "What does the middle one get?". A trace under the $1 bar now draws Bo's share for every round reached with 3 people ($0.50 … $1.00, labelled per column); it is kept when the learner goes back to "2 people", and the reveal quotes it. The left-out person's number now reads "left out (last ask $0.10)". c1 reworded.

1. **Title and hook.** "What does the middle one get?" / "Two people split $1 evenly. Add a third who can only deal with one of them. Now what?" Neither names a share.
2. **Options.** "About half", "About two thirds", "All, or nearly all": no numbers in any, same wording.
3. **Locked stage.** Ann–Bo circles, the empty $1 track, "3 people: no rounds yet", Round ?, Bo gets ?. No share drawn.
4. **Reveal values.** "$0.50, $0.60 … $1.00", "asks fell from $0.50 to $0.00", "the whole $1": computed from `best` (furthest 3-person round, = 5 by milestone "settled"), drawn as the trace columns. "With just Ann and Bo, the split stayed even": the unlocked starting state (and the "2 people" state), shown with "No one else to turn to: they split evenly."
5. **QA path.** 3 people ("three"; trace column $0.50), Next round ($0.60), All rounds ("settled"; columns to $1.00), 2 people (back to 50/50; trace kept). Both milestones; the trace is on stage at the reveal.
6. **Reset.** "2 people" is the last control and resets k, not the trace. Reveal from that run: "Each round, whoever Bo left out offered to take 10¢ less, and Bo switched. Your trace shows Bo's share going $0.50, $0.60, $0.70, $0.80, $0.90, $1.00: the asks fell from $0.50 to $0.00, and Bo got the whole $1. There it stops: no one can ask less than nothing, and no pair can both do better by dealing together. That is the stable outcome on a line of three: the centre gets everything (in the limit). With just Ann and Bo, the split stayed even. Bo's power came from the spare partner, not from being a better bargainer."
