# Launch Review: {{date}}: <slug>

chair: head-of-product · executes: release-manager · attests: qa-tester, fact-checker, learner-evaluator, analytics-steward

## Gates (from `npm run company -- publish <slug>` dry run / `company status`)
- [ ] All claims verified by someone other than the builder
- [ ] Computer-use QA record (phone + desktop)
- [ ] Borrowed-mind learner review
- [ ] Accessibility review
- [ ] Confidence mark matches evidence (`**` requires human learners)

## Committed predictions (analytics steward, before launch)
| Metric | Prediction | Period | would_be_wrong_if |
|---|---|---|---|
| First revisit recall rate | | 2 weeks | |

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|

## Decision
go / no-go / go with conditions. Signed: head-of-product.

## Kudos (optional)
Thanks that were earned, one line each: `- @<role or agent label>: what they did and why it mattered`. Run `node tools/kudos.mjs harvest` after writing this, or use `kudos.mjs add`. Never to yourself, never for volume.
