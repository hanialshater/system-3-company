# Spec: proposers-get-the-best

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #38 · wireframe: `proposers-get-the-best.svg`

**Format: Before / after toggle.** One change, who proposes, on the same four preference lists. The "before" run (students propose) is kept as a logged result line, so the "after" run (hospitals propose) sits next to it at the reveal.

**Brief check (node, 2026-10-14):** students propose: Ann→X, Bea→Y, no rejections, matching Ann–X, Bea–Y (both students' first choice, both hospitals' second). Hospitals propose: X→Bea, Y→Ann, matching Ann–Y, Bea–X (both hospitals' first choice). Both matchings are stable (no student and hospital both prefer each other to their partners). The brief's answer (A) holds.
Note, not a problem: in this 2×2 case no offer is ever refused, so "the receiver holds the better offer" never fires on the QA path. The build still implements it (a refusal draws the losing line struck). The payoff (who proposes decides) is fully visible without it.

## Stage at 390×844 (~320 px at predict, ~460 px in explore)
1. Rule line (muted): "Proposers offer to their next choice. Receivers hold their best offer so far." (13 words)
2. **Students row**: two person cards, Ann and Bea, ~175 × 64 px each, each with its ranked list: "Ann: X › Y", "Bea: Y › X".
3. **Toggle** between the rows, full width: shows the proposing direction with an arrow ("Students propose ↓" / "Hospitals propose ↑").
4. **Hospitals row**: cards X and Y: "X: Bea › Ann", "Y: Ann › Bea".
5. **Offer lines** between the rows: an offer is an arrow from proposer to receiver; a held offer becomes a solid line. When a run ends, anyone matched to their first choice gets a ★ on their card.
6. **Results log**, one line per finished run, tagged by who proposed: "Students proposed: Ann–X ★, Bea–Y ★ · stable". Before any run: "First choices: ?".

## Controls, in DOM order (5)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Card button | "Ann" | in students-propose mode, if Ann is free: Ann offers to her next choice; the line is drawn and the receiver holds the better offer. Disabled when held or in the other mode |
| 2 | Card button | "Bea" | same |
| 3 | Control toggle | "Students propose ↓" ⇄ "Hospitals propose ↑" (`aria-pressed`) | swaps the proposing side and starts a fresh run on the same lists. Finished runs stay in the log; a half-finished run is cleared (it was never logged) |
| 4 | Card button | "X" | in hospitals-propose mode, if X is free: X offers to its next choice |
| 5 | Card button | "Y" | same |

The DOM order mirrors the screen: top row, toggle, bottom row. Start: students propose (the question's case). All 5 controls render at first paint, disabled while `locked`. Cards on the receiving side are disabled with a small caption "waits for offers".

QA path (each once, DOM order): Ann (offers X, held) · Bea (offers Y, held; run ends, ★ on Ann and Bea, log line: milestone 1) · toggle (hospitals propose, fresh lines, log kept) · X (offers Bea, held) · Y (offers Ann, held; run ends, ★ on X and Y, second log line: milestone 2). No control finishes a run in one press; each offer is its own tap.

## States
- **Predict:** four cards with their lists, no lines, no stars, toggle reads "Students propose ↓", "First choices: ?". Controls disabled.
- **Students' run:** two straight lines, Ann–X and Bea–Y; stars on both students; the hospitals' cards show they got their second choice (the matched name is the second in their list, underlined).
- **Toggle, hospitals' run:** lines cross: X–Bea and Y–Ann; stars move to both hospitals; the students' cards now underline their second choices.
- **Reveal:** stage keeps the last run and both log lines. The reveal quotes the log: "When students proposed, both students got their first choice. When hospitals proposed, both hospitals did. Both matchings were stable." Then the payoff: deferred acceptance always ends stable and gives the proposing side its best stable partner (Gale and Shapley 1962); the US residency match moved to students proposing for this reason (Roth and Peranson 1999). Only finished runs are quoted.

Milestones (`minInteractions=2`): `students-proposed` (a finished run with students proposing), `hospitals-proposed` (a finished run with hospitals proposing). Either order.

## Shown, not told
The same lists, one switch, and the stars jump from one row to the other. The learner sees "who proposes wins" as the stars moving, and the stable tag on both lines shows neither answer was wrong.

## Colour and access
Students `--domain` card border, hospitals `--line` border plus a small building glyph (shape cue). Offer arrows `--fg` dashed, held lines `--fg` solid 2 px, refused (not on the QA path) struck. Stars are a glyph with `aria-label` "first choice". Card buttons ≥ 64 px high, toggle 44 px (`.tap`). Stage words: rule line 13, plus log text; count before build.

## Title constraint (for the learning designer)
Title and hook must not say which side wins (the slug does, so the title must not echo it).
