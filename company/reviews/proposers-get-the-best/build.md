# Build note: proposers-get-the-best

builder: algo-pair-11 · 2026-10-14 · status draft · claims all unverified

Built from brief #38 and spec `company/design/specs/proposers-get-the-best.md`.

## Node checks
Students propose: Ann-X, Bea-Y (students' first choices). Hospitals propose: X-Bea, Y-Ann (hospitals' first choices). Both stable (no blocking pair). No offer is refused in either run, so the refusal drawing (struck dashed line with a cross) is built but not on the QA path and is untested by QA.

## Deviations from the spec
- Receivers get no "waits for offers" caption (word budget); they are dimmed and disabled.
- Log lines use the stage's own stability check (`isStable`), so "stable" is computed, not hard-coded.
- Layout order: rule line, students, toggle, offer-line strip, hospitals, log.

## Controls (DOM order): Ann, Bea, toggle, X, Y. Milestones: students-proposed, hospitals-proposed (either order).
A toggle press starts a fresh run in the other mode; finished runs stay in the log; the second run's log line replaces a repeat of the same mode.

## Known risks
- Claim c5 ("for this reason") needs a source check against Roth and Peranson 1999.
- Stage text exceeds 25 words once both log lines show; names and lists are data, but a reviewer may count them.

## Pre-flight v3

Revision for r6 learner review (adult-beginner, revise): "stable" was a tag that nothing on the stage stood for. The told-only doesNotKnow was "deferred acceptance always ends stable".
Changes: a new last control, "Would a pair rather swap?", checks every finished run on the stage. For each student and the hospital they did not get, it prints whether each side wants the swap ("Swap? Ann–Y: Ann no, Y yes. Bea–X: Bea no, X yes. No double yes: stable."). A new milestone `checked-both` requires both runs to be checked (minInteractions 3). The reveal quotes who said no in each pair, from the learner's recorded check. The "· stable" tag is gone from the result lines. c3 is reworded and set unverified.
Not changed, and open for the learning designer: this 2 x 2 never refuses an offer, so "Receivers keep their best offer" is a told rule. No 2 x 2 has both a refusal and two different stable matchings: if both students want the same hospital first, there is only one stable matching. Showing a deferral would need a 3 x 3 example and a second press on the refused proposer, which the QA once-each path cannot do. c6 already discloses this.
Stage text: the finished stage carries about 45 words (the rule, two result lines, two check lines). That is over the 25-word budget, and I am flagging it rather than hiding it.

1. **Title and hook.** "Same lists, one switch" / "Same four rankings, same rules. Swap who makes the offers and the outcome changes." No: they say the outcome changes, not who wins with students proposing.
2. **Options.** "Both students", "Both hospitals", "One of each": no numbers, same precision.
3. **Locked stage.** The rule line, four cards with their rankings, the "Students propose ↓" switch, "First choices: ?", and a disabled swap-check button. There are no stars or arrows.
4. **Reveal values.** "both students got their first choice": (b) milestone `students-proposed`, and the log line "Students proposed: Ann–X ★, Bea–Y ★" stays. "both hospitals did": (b) `hospitals-proposed`, and its log line stays. Who said no in each pair: (b) recorded at `checked-both`, and the check lines stay. Gale–Shapley and the 1998 switch: told context (c4, c5).
5. **QA path.** Ann -> Bea (students' run done) -> switch to Hospitals propose -> X -> Y (hospitals' run done) -> Would a pair rather swap? (checks both, `checked-both`). All three milestones are reached in DOM order, and both log lines and both check lines are on the stage.
6. **Reset.** There is no reset. The switch starts a fresh run but keeps the log and the checks. Reveal: "When students proposed, both students got their first choice. When hospitals proposed, both hospitals did. Same four rankings. Your swap check: in the students' matching Ann–Y, Ann said no; Bea–X, Bea said no; in the hospitals' Ann–X, X said no; Bea–Y, Y said no. No pair wanted each other both ways, so both matchings are stable and neither answer was an error. / Deferred acceptance always ends stable and gives the proposing side its best stable partner (Gale and Shapley 1962). The US residency match switched to students proposing in 1998, a change studied by Roth and Peranson (1999). / A fair-looking procedure can still have a side it favours."
