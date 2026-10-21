# Weekly Business Review: Solar System Quiz Pack

Week ending 2026-10-21 · chief of staff · sources: `board.md`, `work/*/page.md`

## 1. Summary

The goal is met. The editor accepted the pack (style sheet + 5 rounds) on 2026-10-21, on the second acceptance round. The first pack read sent Round 5 back because its required heading "(rockets, astronauts, rovers)" gave away two answers. The writer replaced Q1 and Q2 with Neil Armstrong and the International Space Station, and a reader re-check passed. All 6 board items are `checked`, none are open, and my own recount of the files matches the board's numbers. One thing is still unsettled: the rule that sent Round 5 back was not applied to Rounds 2 and 3. Their headings also list their answers (4 of 4 in Round 3, 3 of 4 in Round 2), and the editor logged this as a non-blocking note. The editor should decide that, not the founder.

## 2. Page 0 metrics

Counts come from the board notes and the files as they stand now. Word counts are `wc -w` on each page, including the heading and markup, and they match the board's figures. Where the board lost an earlier step, I mark the count as inferred.

| Metric | Value | Basis |
|---|---|---|
| Board items | 6 (STYLE, ROUND1-5) | board.md |
| Items `checked` | 6 of 6 | board.md |
| Open items | 0 | board.md |
| Pack acceptance rounds | 2 (1 not accepted, 1 accepted) | "Not accepted" + "Accepted by editor" lines, both 2026-10-21 |
| Goal accepted | Yes, 2026-10-21, by editor | "Accepted by editor" line |
| Revision loops, total | 5 | STYLE 1, R1 0, R2 1, R3 0, R4 2, R5 1 |
| Revision loops per item | 0.83 (5 / 6); rounds only 0.8 (4 / 5) | |
| Items accepted with no revision | 2 (R1, R3) | |
| Max loops on one item | 2 (ROUND4: fact fix, then Why-length + number-rule fix) | |
| Reader checks run | 11 (9 recorded, 2 inferred) | STYLE 2, R1 1, R2 2 (1 inferred), R3 1, R4 3 (1 inferred), R5 2. The first R2 and R4 checks show up only as "Fixed both FACT items" / "now explains"; their findings were overwritten. |
| Editor passes | 5 style-revision passes (all "no change"), 2 checks of revised files (R2, R4), 2 pack reads | board.md |
| Defects found by reader | at least 5: 2 FACT (R2), at least 1 FACT (R4, first check), Why length + number rule (R4) | R4's first-check count is not recorded |
| Defects found by editor pack read | 1 (R5 heading gives away Q1/Q2) | |
| STYLE findings by reader | 5 + 1 heading note, all fixed on recheck | |
| Questions in pack | 20 (4 per round) | files |
| Words per round | min 139 (R2) / max 155 (R3); R1 144, R4 148, R5 152; total 738 | `wc -w` |
| STYLE sheet length | 601 words | `wc -w` |
| Question length | 8-17 words (limit 20) | files |
| Why length | 13-25 words (limit 25); 1 Why exactly at the limit (R1 Q4) | files |
| Repeated answers across rounds | 0 | Answer lines |
| Banned words in rounds | 0 | grep |
| Rounds whose heading lists answers | 3 at acceptance (R2 3/4, R3 4/4; R5's two given-away answers were fixed) | files |
| Non-blocking notes still open | 4 | see below |

## 3. Hits and misses

**Hits**
- The goal was delivered and accepted within the week. Every round meets the format, length, number and banned-word rules, and I re-verified each of those against the files.
- The pack read worked. Reading the rounds as one quiz caught a defect that five separate per-round checks had missed (R5's heading gave away its answers).
- The style sheet revision settled every ownership overlap (Earth, Apollo, Mars rovers) before the rounds were finished. None of the five style-revision passes needed a round to change.
- The reader checked facts with real figures (Olympus Mons vs Everest, the 27.3- vs 29.5-day cycles, ISS occupied since 2000) instead of just approving them.

**Misses**
- **The acceptance standard was applied unevenly.** R5 went back because its heading gave away 2 answers. R3's heading names all 4 of its answers, and R2's names 3 of 4. Both were accepted with a "non-blocking" note. For an 8-10 audience, a heading that lists the answers works like a multiple-choice list, and STYLE bans multiple-choice lists in Answer lines.
- **The board keeps a poor record.** Each item has one Notes cell that grows over time. The original reader findings for R2 and R4 were overwritten (they survive only as "Fixed..."), most entries have no date, and the R5 notes run out of order (the newest revision comes first). Two of the 11 reader checks can only be inferred.
- **Rework was concentrated in one round.** R4 took 2 loops. The second loop fixed a defect that the first fix created: the new Q3 Why ran to 29 words and included "29.5". The editor flagged it, but it still needed another reader round trip.
- The per-item checks missed the R5 heading problem in the first place. The initial reader check and the editor's style revision both passed it.

**Open non-blocking notes (4):** eclipses and tides have no owner (STYLE); R2/R3 answers can be guessed from the heading list; R4 Q3 Why does not explain why the full-moon cycle is longer; R5 Q2's question contains "space station", which is 2 of the 3 words in its answer.

## 4. Roadmap and goals status

| Item | RAG | Reason |
|---|---|---|
| **Goal: Solar System Quiz Pack, style sheet + 5 rounds, accepted** | **Green** | Editor acceptance recorded 2026-10-21; 6/6 items checked; 0 open. |
| STYLE | Green | The reader rechecked it and confirmed all 5 findings plus the heading note are fixed. Only open note: eclipses and tides need an owner, and no current round uses them. |
| ROUND1 | Green | No defects on first check; no revision. |
| ROUND2 | Yellow | Both fact fixes are verified. Its heading lists 3 of its 4 answers, which is the same kind of defect that sent R5 back. |
| ROUND3 | Yellow | No defects against the written rules. Its heading lists all 4 answers, so Q4 (Neptune) can be got by elimination. |
| ROUND4 | Green | 2 loops, now clean; one minor non-blocking note on Q3's Why. |
| ROUND5 | Green | Give-away fixed and re-checked; facts verified. |
| Acceptance consistency (process) | Yellow | Rule applied to R5 but not to R2/R3. If nobody decides, the next pack will repeat the same argument. |

## 5. Leadership asks

1. **To the editor, who owns STYLE and acceptance: is "the heading lists the answers" blocking?** If it is, R2 and R3 go back, either with headings that drop the parenthetical lists or with questions whose answers are not in the list, and the goal moves to Yellow until they return. If it is not, record why R5 counted as a defect and R2/R3 did not, and write that distinction into STYLE. Needed before this pack is used, or by the next pack at the latest.
2. **To the editor: name an owner for eclipses and tides in STYLE** (the reader suggested R4). This is low priority and only matters for the next pack.
3. **To the founder (one item only): confirm that the editor's acceptance is the final gate for this goal,** or name who releases the pack. The record says "accepted by editor" and nothing about release, so this is the only open question above the team.

No ask is needed for the board record problem. It is the chief of staff's own fix: keep reader findings instead of overwriting them, and date every entry.
