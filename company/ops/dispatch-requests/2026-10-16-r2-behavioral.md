# Dispatch request: Behavioral Economics (lane 1, category) · round 2 · 2026-10-16
poc: cm-behavioral (Rasmus)
lane: 1, A category's lessons (Behavioral Economics and Irrational Behavior)
slots asked: 3 agents, of which 2 builders
since last round: (no earlier batch from this lane; results read from the board and disk)
- Briefs 1-2 `sure-million-or-long-shot` and `same-week-a-year-apart` built and merged, in review (W-1178): **accept** into review. Every claim is `unverified`, none self-verified, each type (d) line is held with its fallback written in meta.json. Both builders asked cm-behavioral how the 25-word stage budget counts (build.md "Stage word budget"); ruled in B1 below.
- head-of-product's A1.2 order (briefs 3-5 after 1-2 are built) is now met: the founder's exemption (company/decisions/2026-10-16-founder-behavioral-pilot-exemption.md) names exactly the five pilot slugs. Briefs 3 and 4 are released in B1; brief 5 is held one round (below).
- `economics/patience-wins-the-split` merged: a neighbour's lesson (cm-economics, alternating offers). **No action**: its discounting is Economics' under the boundary table, and brief 2 links `wait-or-take-now`, not this lesson. Not re-tagged, not cited.
- W-1180 (reveal-fit thumbnail misfire on brief 1's small grids): platform-engineer's, lane 7. Not in this batch.
held or declined:
- **Brief 5 `same-fifty-two-labels` build: held one round** for W-1062 (learning-designer: does option C, "Neither: it is the same $50", give the answer away, since the question says "same money and bills"?). The predict wording is the whole lesson, and a rewording goes through the check script, which is cm-behavioral's. Building first would mean a rebuild of the predict. It runs under SO-1beh-1 once the ruling is in the brief.
- **No sixth brief.** The DLR five are all written; nothing more is briefed before the Domain Launch Review reconvenes (decision §1).
- **Learner review, QA and fact-check of briefs 1-2** are lane 10's work, so they are asks to evaluation-steward (in the report), not items here.
standing orders:
- **SO-1beh-1 (new).** Trigger: one of `zero-loses-to-this-crowd`, `saved-or-die-same-600`, `same-fifty-two-labels` has no line in `company/ops/brief-skips.json`, no `src/demos/behavioral/<slug>/`, and no live claim in `node tools/claim.mjs list`. Role: demo-builder, `worktree: yes`, `node tools/claim.mjs take <slug>`, at most 2 behavioral builders at once (inside the company cap of 3). Brief: `company/domains/briefs/behavioral.md`, the slug's numbered brief, plus its check script `company/domains/briefs/checks/behavioral-<concept>.mjs`. Tag: `[project:behavioral-econ]`. Done when: the lesson is merged with `npm run check` passing, every claim `unverified` (none self-verified), each type (d) line held with its fallback, `node company/domains/briefs/checks/behavioral-<concept>.mjs` passes, and `company/reviews/<slug>/build.md` exists. Checked by: lane 10 (fact-checker, learner-evaluator, qa-tester). Expiry: 2026-10-20 or when all three slugs exist on disk, whichever is first. Covers only those three slugs; no revision builds, no new format.
for the founder: none. (Spend stays inside the approved 1.83M tranche 1; no deploy, no gate waiver.)
objections: none new. The open boundary questions travel on the board: W-1060 (cm-economics, brief 3 seed and crowd change), W-1061 (cm-books, brief 4 predict wording, non-gating), W-1062 (learning-designer, brief 5 option C).

## B1 · Release briefs 3-4 in brief-skips, re-reason brief 5's hold, write the stage word-count ruling into the briefs file · board W-1178
role: cm-behavioral
order: first
kind: other
worktree: no
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~40k tokens
inputs: company/ops/brief-skips.json (lines `zero-loses-to-this-crowd`, `saved-or-die-same-600`, `same-fifty-two-labels`); company/domains/briefs/behavioral.md; company/product/demo-standard.md ("Text budget"); company/reviews/sure-million-or-long-shot/build.md and company/reviews/same-week-a-year-apart/build.md ("Stage word budget" only); company/decisions/2026-10-16-founder-behavioral-pilot-exemption.md
outputs: (1) brief-skips.json: delete the `zero-loses-to-this-crowd` and `saved-or-die-same-600` lines; replace the `same-fifty-two-labels` reason with "Behavioral pilot brief 5: held only for W-1062 (learning-designer on option C). cm-behavioral carries the ruling into the brief and the check script, then removes this line (SO-1beh-1 then builds it)". (2) briefs/behavioral.md: a dated "Ruling: how the stage word budget counts here" section: the 25 words count every word the learner reads as text (captions, labels, buttons, readouts, the model gloss); numerals, amounts and percentages written as legends inside a picture ("89% $1M") are picture labels and are not counted; the same amounts inside a text label ("$100 at week 52") count their words but not the numbers. Under this reading brief 1 holds 15 and brief 2 holds 25, so neither changes. Marked as the category's reading of demo-standard, pending head-of-product's confirmation; if head-of-product rules that amounts count, brief 1 removes the gloss to the 11-word form already in its design note and brief 2 drops the strip text, and both go to revision builds. (3) Gate line in the briefs file updated: briefs 1-2 built, 3-4 released, 5 held for W-1062.
done when: `node tools/claim.mjs list` and a dry read of brief-skips.json show no line for `zero-loses-to-this-crowd` or `saved-or-die-same-600`, and `same-fifty-two-labels` carries the W-1062 reason; `grep -n "Ruling: how the stage word budget counts" company/domains/briefs/behavioral.md` finds the section; `npm run check` passes
checked by: none needed: mechanical file edits with a command check. The word-count reading goes to head-of-product (lane 5) as an ask, and lane 10's evaluators apply it when they review briefs 1-4
stop if: brief-skips.json carries any other hold reason on those slugs (a new board item or a neighbour's objection); W-1060 or W-1061 has been answered with an objection (then that slug stays held and the objection is copied into the brief); `npm run check` fails on something B1 touched

## B2 · Build brief 3 `zero-loses-to-this-crowd` (beauty-contest-level-k) · board W-1178
role: demo-builder
order: after B1
kind: build
worktree: yes
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~90k tokens
inputs: company/domains/briefs/behavioral.md brief 3 and its "Rules every brief below follows" and word-count ruling; `node company/domains/briefs/checks/behavioral-beauty-contest-level-k.mjs` output (every number on the stage and reveal is copied from it, seed and rule shown on the stage, the learner's own guess counted in the average); company/product/demo-standard.md; company/product/lesson-metadata.md; company/design/formats.md (Single card); `node tools/claim.mjs take zero-loses-to-this-crowd`
outputs: src/demos/behavioral/zero-loses-to-this-crowd/{Demo.tsx,meta.json,styles.module.css}; company/reviews/zero-loses-to-this-crowd/build.md (incl. stage word count under B1's rule and the reveal-fit numbers)
done when: merged on a worktree branch with `npm run check` passing; the check script passes unchanged; every claim in meta.json is `unverified` with an address and source, none self-verified; the Nagel first-round line is held with its fallback; the stage shows "simulated" and no sentence says "people"; the ceilings 66.7, 44.4 are not derived on the stage (one linked step to `two-thirds-of-the-average`); build.md exists
checked by: lane 10 (evaluation-steward: fact-checker for types a-c, learner-evaluator, qa-tester)
stop if: the check script fails or its numbers do not fit the stage; cm-economics objects on W-1060 (seed 7 to 2, crowd 99 to 100); the stage needs more than 6 controls, ticks, re-rolls or players that react to each other (that is a format question for lane 6, not a build); any predict option would be 33 / 22 / 0

## B3 · Build brief 4 `saved-or-die-same-600` (gain-loss-framing) · board W-1178
role: demo-builder
order: parallel with B2
kind: build
worktree: yes
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~90k tokens
inputs: company/domains/briefs/behavioral.md brief 4 and its rules and word-count ruling; `node company/domains/briefs/checks/behavioral-gain-loss-framing.mjs` output; company/product/demo-standard.md; company/product/lesson-metadata.md (`also`/prerequisite `books:tfs-loss-aversion`, prerequisite only); company/design/formats.md (Single card); `node tools/claim.mjs take saved-or-die-same-600`
outputs: src/demos/behavioral/saved-or-die-same-600/{Demo.tsx,meta.json,styles.module.css}; company/reviews/saved-or-die-same-600/build.md
done when: merged on a worktree branch with `npm run check` passing; the check script passes; every claim `unverified`, none self-verified; the framing result line (Tversky & Kahneman 1981, Many Labs 1 pointer) is held as type (d) with its fallback; no loss-aversion ratio, no mixed 50/50 bet, no "Thinking, Fast and Slow argues" claim, no EV asked; the outbreak is unnamed (no real disease, country or group); build.md exists
checked by: lane 10 (evaluation-steward: fact-checker, learner-evaluator, qa-tester)
stop if: the check script fails; cm-books objects on W-1061 (then the predict wording returns to the sign-off file and the build stops); the stage would need a real disease, place or group to read clearly

## Asks to other lanes (not items; named here so the chief of staff can route them)
- **Lane 10 (evaluation-steward):** (1) fact-check briefs 1-2's claims (`npm run company -- claims --open`, slugs `sure-million-or-long-shot`, `same-week-a-year-apart`), including W-1059 (do the second-hand "as reported by" attributions suffice for the held lines?) and the type (d) part of the step-9 statement (W-975/W-1040), which also sets the fold-floor recount; (2) learner review and (3) QA record for both; (4) the same three for briefs 3-4 when B2 and B3 merge. Evaluators get the walkthrough, not build.md, first.
- **Lane 6 (design-lead):** W-1062, the learning-designer's ruling on brief 5 option C. It releases brief 5 through SO-1beh-1 once cm-behavioral copies it in.
- **Lane 5 (head-of-product):** confirm or amend B1's reading of the 25-word stage budget (numerals in picture legends not counted).
- **Lane 1, other POCs:** cm-economics on W-1060 and cm-books on W-1061 (both in their own sign-off sections of company/domains/behavioral-signoffs.md).
