# Simple path: cultural-reviewer answer (W-1675)

date: 2026-10-18
role: cultural-reviewer
read: the 2026-10-18 decision (Path B), AMD-013 (b) and (d), the 2026-10-15 and 2026-10-14 sensitive-route decisions, AMD-006.

## (1) One generic route gate replacing AMD-006: agree with changes

One mechanism is right. A gate that reads a file beats a hold list. Changes:

- **Filename.** AMD-013 (b) looks for `*-<route>.md`. The reviews on disk are `*-culture-en.md`, and the brief file is `*-culture-en-brief.md`. For sensitive, `*-sensitive.md` matches nothing. Name the file pattern per route (sensitive = `culture-en`), or rename the records. Either way, test that the brief file never satisfies the gate.
- **Content, not just a header.** AMD-006's own "would be wrong if" (a `Verdict: publish` with no checklist items) and its audit of 5 records per cycle were dropped. Put them back. The publish record must list checklist items with PASS or finding.
- **Reviewer-added classes.** The reviewer may add a class (2026-10-14, Decision 1). (d) only reads the curriculum `sensitive` field. A lesson upgraded to sensitive at brief review must have `reviewRoute` rewritten, and only head-of-product may downgrade it.

## (2) Short "unchanged" publish verdict: agree with changes

**I decide "unchanged", never the builder, category manager or operator.** The wording "claims and reveal unchanged" is too narrow, though. My checks at publish are language (L), imagery and stage (I), and perspective (P) on the built artifact. A brief cannot show these. So "unchanged" must mean that no learner-visible text, number, image, map or interaction differs from what I reviewed.

The short record must show:
1. The brief review file, its verdict, and the lesson version it covered.
2. The current version, and a content hash of the claim list and all card text, matching the hash taken at brief review. A tool computes it, not me.
3. That I ran the walkthrough and read it before any builder notes.
4. The refuse list (R1-R11) re-run on the walkthrough, one line each.
5. The fact-check outcome. An overturned or revised sensitive number means "changed", full review.

Never "unchanged" when the brief verdict was "go with changes" and I have not confirmed the addendum. Never when the lesson was built before the brief review. Without the hash in the gate, "unchanged" is just my word, so the hash must be in the record.

## (3) Risks this opens

1. **Self-declared route.** The category lead sets `reviewRoute` and defaults to `standard`. Check (d) catches only the curriculum field. A mis-marked brief, such as a political figure in an unmarked concept, goes through the batch with no cultural review. Mitigate: sampled audit of `standard` History and Big Ideas lessons against the checklist's section 0.
2. **Batch sign-off can look like review.** A sensitive lesson in a batch of 20 is covered by head-of-product's signature. State in the batch record that the signature never stands in for the route verdict, and that sensitive lessons are never in the 1-in-10 sample. They are always 100%.
3. **Rubber stamp.** A short record is cheap to write without looking. Hence items 2-4 above.
4. **Load.** The 2026-10-15 objection on reviewer load stays open. The short record helps, but locale work still competes.

## Objections, plainly

- **Object** to "claims and reveal unchanged" as the test. Use "no learner-visible change", hash-checked.
- **Object** to dropping AMD-006's record audit.

Verdict: agree with changes.
