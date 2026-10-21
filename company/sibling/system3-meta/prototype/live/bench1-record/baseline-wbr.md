# Weekly Business Review: "Pip and the Night" picture book

Week ending 2026-10-21 · Prepared by the chief of staff · Sources: `board.md`, `work/*/page.md` (no other record exists: no git history, no dated log of each check).

## 1. Summary

The book's goal is met: the editor accepted the bible and all five pages on 2026-10-21, at the second acceptance round. The first round failed on one book-level defect. Pages 2 and 3 were in past tense while Pages 1, 4 and 5 were in present tense. Both pages were revised to present tense and passed a reader re-check. Most of the rework came from a story bible that was too thin when writing started. It gave no pronouns for Pip, Hoot or Moon, did not say which pages Mama Fox appears on, said nothing about the den having no window, and still gives no rule on tense. Those gaps produced cross-page defects (Hoot was "she" on Page 2, Page 5 had a window, and the tense split) that the per-page reader checks did not catch, so they had to be found later. Two items need a decision: which title the book carries, and whether an editor may accept a book that includes their own bible.

## 2. Page 0 metrics

Where the board keeps only each item's latest note, a count is a floor (marked "at least") and the evidence is named.

| Metric | Value | Basis in the record |
|---|---|---|
| Items on the board | 6 (BIBLE, PAGE1-PAGE5) | board.md |
| Items with status "checked" | 6 of 6 | Status column |
| Items accepted | 6 of 6 (as one book) | "Accepted by editor: 2026-10-21" |
| Open items | 0 | No item is still in progress. The Status column still says "checked", not "accepted". |
| Acceptance rounds | 2 (1 rejected, 1 accepted) | "Not accepted: 2026-10-21", then "Accepted by editor: 2026-10-21" |
| Items sent back by the acceptance round | 2 (PAGE2, PAGE3) | Not-accepted note: "PAGE2 and PAGE3 go back to present tense" |
| Items accepted with no rework | 2 (PAGE1, PAGE4) | Single "Reader: passes" note, no re-check |
| Items revised at least once | 4 (BIBLE, PAGE2, PAGE3, PAGE5) | Each has a "re-check" note |
| Revision loops, total | at least 5 | BIBLE 1 (pronouns, Mama Fox, door), PAGE2 2 (Hoot she→he, then tense), PAGE3 1 (tense), PAGE5 1 (Hoot pronoun, window) |
| Revision loops per item | 0.83 average (5 ÷ 6); range 0-2 | BIBLE 1, PAGE1 0, PAGE2 2, PAGE3 1, PAGE4 0, PAGE5 1 |
| Reader checks run | at least 11 | One first check per item (6) plus one re-check per revision loop (5) |
| Distinct defects found | 7 | Pip pronoun, Hoot/Moon pronouns, Mama Fox placement (bible); Hoot "she/her" on PAGE2 (4 instances); window on PAGE5; past tense on PAGE2; past tense on PAGE3 |
| Defects found by a reader check | 5 | 3 in the bible, Hoot pronoun (in the PAGE4 note), window (in the PAGE5 findings) |
| Defects found only at acceptance | 2 | Tense on PAGE2 and PAGE3, both previously marked "passes" |
| Story words per page, min | 168 (PAGE2) | Recounted from `work/`, excluding the `# Title` line. Matches the board. |
| Story words per page, max | 191 (PAGE3) | Same as above |
| Story words per page, each | P1 171 · P2 168 · P3 191 · P4 173 · P5 183 | Recounted; all five match the board's figures |
| Story words, total (5 pages) | 886 | Sum of the above |
| Mean words per page | 177.2 | 886 ÷ 5 |
| Bible length | 386 words (3 sections, 5 page lines, 5 characters) | Recounted from `work/BIBLE/page.md` |
| Pages with a `# Title` line | 5 of 5 | Recounted |
| Past-tense narration verbs left | 0 | grep for was/were/had/said and -ed verbs. The only hits are "red", "bed" and "white-tipped". |
| "window" on any page | 0 (only the bible's "no window") | grep |
| Calendar days, first check to acceptance | not measurable | Both acceptance rounds are dated 2026-10-21, and no per-item check is dated |

## 3. Hits and misses

**Hits**
- The goal shipped: bible plus 5 pages, accepted, all within one 168-191 word band.
- Reading the book in order at acceptance worked. It caught the tense split, which six separate per-page checks had missed.
- Word counts reported by readers are exact. All five match a recount from the files.
- The editor wrote every decision into the bible (pronouns, Mama Fox on Pages 1/3/5, a door and no window), so the fixes are recorded in one place rather than only in notes.
- Cross-page defects were sent to the right owner. The PAGE4 reader flagged the Hoot pronoun as "not a PAGE4 defect" and routed it to the editor.

**Misses**
- **The bible was underspecified before writing started.** All 7 defects are either gaps in the bible (3) or page defects that follow from a missing bible rule on pronouns, setting or tense (4). Writers worked from it before it was fixed.
- **Tense is still not in the bible.** The acceptance round fixed tense on the pages, but the bible was never updated with a present-tense rule, so the next book can repeat the same defect.
- **The per-page reader checks passed PAGE2 and PAGE3 in past tense.** The check had no consistency-with-other-pages step for tense.
- **One reader note is wrong in its detail.** The PAGE3 re-check says "Glimmer her x2 … Mama Fox no pronoun needed". The page actually has one "Her" for Glimmer (line 9) and one "her" for Mama Fox ("her bed of leaves", line 21). The page is still correct, because Mama Fox is she/her. But a reader's pronoun tally can't be relied on without a recount.
- **The record loses its history.** Each item's Notes cell is overwritten by its latest check, and nothing is dated except acceptance. Loop counts above are floors, and cycle time can't be measured.
- **The board's state is ambiguous.** Every item still reads "checked", and acceptance appears only as a footer line.
- **Not checkable from this record:** "no banned words" and "ages 4-6" are asserted by readers and the editor, but neither the banned-word list nor an age or length spec is in the record.

## 4. Roadmap and goals status

| Goal / item | RAG | Reason |
|---|---|---|
| **Overall: "Pip and the Night", bible + 5 pages, accepted** | **Green** | Accepted by editor 2026-10-21; 6 of 6 items done; 0 open. |
| Story bible | Green | Passed reader re-check; pronouns, placement and setting are explicit. (A tense rule is still missing: see asks.) |
| Pages 1-5 | Green | All accepted; present tense throughout; 168-191 words; title lines present; recounts match. |
| Book title | **Yellow** | The goal says "Pip and the Night". The bible is titled "Pip and the Night Friends". No record of which one is the book's title. |
| Independence of acceptance | **Yellow** | The editor owns BIBLE and made its decisions, then accepted the book including it. The reader did check the bible, but no one independent signed off on the whole book. |
| Record and method (markdown board) | **Yellow** | Overwritten notes and undated checks. The work is fine, but the method can't show its own history. |

## 5. Leadership asks

1. **Which title goes on the book?** "Pip and the Night" (the goal) or "Pip and the Night Friends" (the bible). → **Editor** to propose. Only the **goal's owner** (whoever set the goal) needs to confirm, and only if the editor's choice differs from the goal.
2. **Can an editor accept work that includes their own bible?** If not, name a second sign-off for book-level acceptance, for example a reader doing a read-in-order pass. → **Team lead / head of the book team**. It is a process rule, not a founder call.
3. **Add a tense rule (present tense) and the length, age and banned-word specs to the bible template**, so readers check against a written standard. → **Editor**. No escalation needed, listed so it is tracked.
4. **Keep check history on the board** (append dated notes instead of overwriting them, and set Status to "accepted"). → **Chief of staff** (me). No decision from above needed.

Nothing in this review needs the founder.
