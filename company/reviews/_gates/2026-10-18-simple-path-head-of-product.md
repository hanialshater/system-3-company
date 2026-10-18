# Simple path: head-of-product answer (route step 2, W-1673)

role: head-of-product (owner of the lesson path, chair of launch review)
date: 2026-10-18
on: company/decisions/2026-10-18-founder-simple-scalable-lesson-path.md, AMD-013 draft
answer: **agree with changes** (objections O1 and O2 must be answered before ratification)

## 1. Path A steps: agree with changes
- **Step 1:** the brief names the stage element that stands for each doesNotKnow item or "explain" objective. `check` requires it.
- **Step 2:** pre-flight question 8, "Show the why" (I add it to demo-standard.md after ratification).
- **Gate (e)** also refuses any slug whose status is not `review`. `publish` does not check status today (rituals/records/2026-10-16-launch-review-ncm-gap4.md).
- **Keep two rules:** the stuck rule (3 or more revised versions: walk only, and a further revise retires the lesson; product/2026-10-16-closeout-ruling.md) and the version-bump rule (demo-standard.md).

## 2. Batch launch review: agree with changes
**Size:** 1 to 20 lessons, **one category per batch**, so the stop rule and accountability have one owner.

**Before signing I check, and write in the record:**
1. The `publish --batch --dry-run` output for every slug is pasted in, and every slug passes.
2. Each QA, learner and scan record names the meta version and a build SHA. The lesson's import closure is unchanged since that SHA.
3. Every learner record cites the sheet image.
4. The samples were drawn by the recorded seed, their results are in the record, and the stop-rule state is stated.
5. Each open objection is either closed or written next to its slug with the reason we go anyway.
6. The predictions line has a would_be_wrong_if.
7. If one evaluator gave launch to every lesson in a batch of 10 or more, a different evaluator walks 2 of them before I sign.

A slug's line goes void if its closure changes after signing. I remove slugs by name, with a reason; I do not judge lessons.

**O1:** evaluation-steward audits 1 in 5 of my signed records against items 1 to 7.

## 3. Samples and stop rule: agree with changes
- Samples are drawn **before publish**, by a recorded seed, never by the builder or the operator. Each batch is sampled at least once.
- **O2:** "more than 1 in 10" cannot be measured on 2 samples. Replace it with this rule: **any fatal flaw** in a sample (a revise-level learner finding, or an accessibility `fail`) holds the batch until that reviewer has checked the rest of the batch for that class of flaw. The category's next batch then runs at 100% until a clean batch.
- **Restore a dropped trigger:** design review covers every lesson with a "told, not shown" or layout finding (ops/operating-loop.md, step 3).
- If a planted false claim gets through fact-check, the next batch gets a second fact-checker.

## 4. Path B: agree with changes
- `reviewRoute` must accept more than one route (for example, safety plus sensitive).
- Safety also gets a review at the brief, because an unsafe procedure is cheapest to fix before the build.
- Copyright-route lessons do not publish until F1/F2 names an owner. They never fall back to `standard`.

## 5. Dropped quality: the learning designer
In the closeout ledger (product/2026-10-16-catalog-closeout.md), about 56 of 263 rows are told-not-shown and about 44 leak the answer. The gate catches neither.

Only 6 design.md files exist for 1,283 lessons; a designer on every lesson would not scale. Make it **required at three triggers**:
- non-default or new formats (already the rule);
- a category's first 3 briefs in a format;
- **every fix round after a told-not-shown or answer-leak revise**, where the designer writes the fix note before the revision build.

The learner-evaluator rubric should test "Show the why" and "No answer before the commit" by name.
