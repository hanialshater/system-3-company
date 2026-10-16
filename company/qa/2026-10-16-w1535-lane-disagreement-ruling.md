# W-1535: ruling on claims where fact-check lanes A and B disagreed

evaluation-steward · 2026-10-16 · base 82e560a0 · procedure only: I did not re-check any fact.

Read: the lane records (`company/reviews/<slug>/2026-10-16-fact-check-lane-a.md`, `-laneB.md`, and for schelling, literacy and schooling the lane B passes in `2026-10-16-fact-check.md`), the claim notes in meta.json at 82e560a0 and the lane A versions at fe7574c8. I also read company/reviews/README.md, company/knowledge/README.md, company/knowledge/patterns/fresh-checker-for-drafted-wording.md and src/lib/trust.ts.

## Two defects in the merge (82e560a0)

1. **Lane A's notes were cut off.** The merge quoted the "other lane's note" inside a bracket and cut it mid-sentence (for example clap recall "VERIFIED. Recall a]"). On literacy c4 and schooling c1 it quoted the old FC 58 history again, and lane A's verdict text did not survive. Lane A's records say "the same text is in each claim's note", which was no longer true. **Fixed:** in all six claims I replaced the merge bracket with lane A's full note, restored from fe7574c8, plus this ruling.
2. **"Keep the more cautious status" was used as a final status.** It is a fair interim rule. As a final rule, it treats "I could not open a source" as evidence against a claim that someone else opened and quoted. The new procedure (company/qa/fact-check-lanes.md) keeps the cautious status only until a ruling.

## Rulings

| Claim | Lane A | Lane B | Ruling | Third check? | meta.json |
|---|---|---|---|---|---|
| literacy-split-france c4 | verified (PMC5776539, PMC5772286, quoted) | held: no source for "young men" could be opened | **Verified stands.** B's hold is an absence, not a finding. FC 58/59 named "open a conscription source" as option (b), and A did that. A states it did not record c4 (FC 58 did). The claim text is unchanged since A. | No | Set to verified (checkedBy fact-checker, 2026-10-16) |
| schooling-and-crime-1830s c1 | verified (same sources, plus the 86/86 data check) | held on "young men" only | **Verified stands**, for the same reason. | No | Set to verified |
| schelling-on-new-york c10b | verified on PMC9387904 and PMC8099638, not the cited Rothstein | unverified. B also raised two specific points: "largely through home equity" is not on the card, and "widening" is a judgement call. B drafted replacement text and a source swap (W-1531). | **Unverified stands.** A ran in parallel and never met B's two points. A verify that has not answered a recorded objection does not override it. | **Yes.** It must be an instance that is neither A nor B (B drafted wording). Preferred: after W-1531 and the builder's text/source fix, which makes the third check the ordinary verify-after-fix. If cm-geography declines the swap, it checks the current text against both lanes' opened sources and answers B's two points by name. | Status unchanged; note restored |
| clap-at-the-cliff recall | verified ("about 1,500"), while asking the builder to add "about" to the question | disputed: the rendered question states 1,500 m/s as exact | **Disputed stands.** B's finding concerns the learner-visible question. A checked the claim text, which is narrower (the fact-checker's first failure mode). A's own fix concedes the point, so the lanes agree on the facts. | No. After the fix (W-1532), the verifier must not be wj64, A or B, because all three drafted "about 1,500 m each second". | Status unchanged; note restored |
| scale-on-a-slope alt1 | disputed | disputed | **Disputed stands.** Same sentence, same reason. Only the drafted wording differs. | No. One fix, then a verifier that drafted none of the wordings (not wj64, A or B). | Status unchanged; note restored |
| two-batteries-side-by-side alt1 | disputed | disputed | **Disputed stands.** Same finding (power is not brightness). The wordings differ by one word. | No. Same condition as above. | Status unchanged; note restored |

Note for the builder: W-1532 (lane B wording) and W-1533 (lane A wording) both carry the scale alt1 and batteries alt1 fixes. Apply each fix once and record which wording you used. The choice of wording belongs to the builder and cm-physics, not to me.

Owed, non-blocking: the literacy c4 and schooling c1 source fields still say no source was opened for "young men". The builder adds the two PMC citations (W-1533 already lists literacy c4; I add schooling c1 to the routed item). The source field does not reach learners (src/lib/trust.ts: only the URLs found in it are shown), so the verdict does not wait on this.

## Lane A's withdrawals of held lines (behavioral)

The claims are same-week-a-year-apart c6, saved-or-die-same-600 c5, sure-million-or-long-shot c6 and zero-loses-to-this-crowd c6. Lane B did not touch these slugs.

**Acceptable.** Reasons:
- The fact-checker may set withdrawn (tools/org/roles.mjs, fact-checker).
- Each line sits behind `const HELD_LINE = false`, with a single render path, cited by line number. FC 57/63 confirmed on the shared server that the saved-or-die, sure-million and zero-loses lines render nowhere.
- Withdrawn claims leave the trust sheet and its counts (src/lib/trust.ts). The learner therefore no longer sees "HELD ..." claim text there, which the unverified status had shown.
- Each note says "withdrawn as cut, not as false" and states the reset condition.

company/knowledge/README.md says "a withdrawn claim must also leave the lesson's text". I read "the lesson's text" as what the learner is shown. A dead constant branch in Demo.tsx is not shown.

Condition: the gate is blind to one risk. If someone turns HELD_LINE on, an unchecked line goes live with its claim still withdrawn. So the commit that turns HELD_LINE on must reset that claim to unverified in the same commit, or the dead branch is deleted. Routed to cm-behavioral. I am not adding a mechanical check: nothing has gone wrong yet, and tools/company.mjs is protected.

same-week-a-year-apart c6 has no rendered-page confirmation after W-1244 (lane A read Demo.tsx only). The next walkthrough of that lesson should confirm the line is absent. This is a confirmation, not a hold.

## Routed

- W-1536 fact-checker: the third check on schelling c10b (conditions above).
- W-1537 fact-checker: re-verify clap recall, scale alt1 and batteries alt1 once W-1532/W-1533 land, with an instance other than wj64, A and B.
- W-1538 cm-behavioral: the HELD_LINE reset rule, and confirm same-week c6 is absent at the next walkthrough.
- W-1539 chief-of-staff: adopt company/qa/fact-check-lanes.md in dispatch briefs, and fix the merge-note format.
- W-1540 demo-builder: add the PMC citations to the source fields of literacy c4 and schooling c1.
