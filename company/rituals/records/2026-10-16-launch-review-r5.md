# Launch Review: 2026-10-16 (round 5, W-1233): nine gate-clean lessons

chair: head-of-product (Priya) · executes: release-manager · attests: qa-tester, fact-checker, learner-evaluator, analytics-steward

Brief: `company/ops/dispatch-requests/2026-10-16-r5-product.md` B1 (slate and readings in R3). Read on 2026-10-16 at about 13:55Z in worktree `/home/user/s3c-hop` (branch product-r5-b1, HEAD 6838dba, which includes the History-wide publish holds of 7418879).

Lessons: best-of-twenty-on-one-test (ai), order-of-the-bad-year (economics), tax-now-or-tax-later (economics), two-cells-sum-any-range (cs), zebra-sorts-before-apple (cs), more-digits-not-bigger (math), more-detail-less-likely (probability), one-circle-fewer-introductions (probability), twenty-flips-run-of-five (probability).

## Readings applied

- **Floor:** `node tools/publish-ready.mjs` (list only, no `--publish`). It lists exactly these nine as candidates: "candidates: 9 best-of-twenty-on-one-test, two-cells-sum-any-range, zebra-sorts-before-apple, order-of-the-bad-year, tax-now-or-tax-later, more-digits-not-bigger, more-detail-less-likely, one-circle-fewer-introductions, twenty-flips-run-of-five". No History lesson and neither patience-wins-the-split nor two-right-angles-never-meet appear (holds in 7418879 apply). On top of the floor, the chair read every newest verdict file and every QA record by hand.
- **QA counts only if a qa-tester wrote it** (R3; `company/ceo-office/dispatch-requests.md` §4). An integration `npm run verify` does not count. Each row below names a record whose header says "recorded by: qa-tester (company qa-record)", committed by author qa-tester.
- **Version match:** the verdict file's `lesson version: vN` must equal `meta.json` `version`.
- **Lesson unchanged since QA and walk:** for every slug, the only change to the lesson directory between the QA build SHA and HEAD is a 2-line `meta.json` evidence edit (adding the 2026-10-16 QA path). Checked with `git diff <qa-sha> HEAD -- <lesson dir>`. No `Demo.tsx` changes.
- **No publish freeze:** none is written by the founder or lane 11 (searched `company/` for "publish freeze": only the dispatch brief itself mentions the term).
- **Side effect:** the list-only run wrote evidence links into 8 Life Hacks `meta.json` files (none on this slate, same 8 as objection 2 of the brief). I reverted them in this worktree with `git checkout --`. Nothing on the slate needed a link, so the script wrote no slate link to commit.

## Per-lesson rows

Builders are demo-builder agents (wave-i-ai, wave-i-economics, wave-i-cs, wave-i-math, wave-i-probability), as their `build.md` files say. Every claim is `status: verified, checkedBy: fact-checker`, so no builder verified its own claims. Four claims were reset after the pass-35 fixes (W-637: zebra c5, twenty-flips c5, two-cells c3, tax c3). They were re-verified by a fresh fact-checker instance in pass 36 (commit 112c602, 2026-10-14). QA records: `company/reviews/<slug>/2026-10-16-qa.md`. Learner files: `company/reviews/<slug>/<file>` as named.

| Lesson | meta version | Claims verified (count, by) | QA record (file · writer · commit · build SHA) | Newest learner verdict (file · verdict · version) | Holds | Decision |
|---|---|---|---|---|---|---|
| best-of-twenty-on-one-test | v1 | 5/5, fact-checker (2026-10-14/15) | 2026-10-16-qa.md · qa-tester · 0e9cbf8 · bc0edc0 · phone+desktop pass, R4 exploratory no soft lock | 2026-10-16-learner-adult-beginner-r14.md · launch · v1 (learner-evaluator, d7725fb) | none | **go with conditions** (objection 1) |
| order-of-the-bad-year | v1 | 5/5, fact-checker (2026-10-14) | 2026-10-16-qa.md · qa-tester · 0e9cbf8 · bc0edc0 · pass, no soft lock | 2026-10-16-learner-adult-beginner-r14.md · launch · v1 (d7725fb) | none | **go** |
| tax-now-or-tax-later | v2 | 4/4, fact-checker (c3 re-verified pass 36, W-637) | 2026-10-16-qa.md · qa-tester · 0e9cbf8 · bc0edc0 · pass, no soft lock (slow: 6 passes) | 2026-10-16-learner-adult-beginner-r14.md · launch · v2 (d7725fb) | none | **go** |
| two-cells-sum-any-range | v2 | 4/4, fact-checker (c3 re-verified pass 36, W-637) | 2026-10-16-qa.md · qa-tester · 0e9cbf8 · bc0edc0 · pass, no soft lock; QA notes four exact milestones with no cue but the exploreHint | 2026-10-16-learner-adult-beginner-r14.md · launch · v2 (d7725fb) | none | **go with conditions** (objection 1) |
| zebra-sorts-before-apple | v2 | 6/6, fact-checker (c5 re-verified pass 36, W-637) | 2026-10-16-qa.md · qa-tester · 0e9cbf8 · bc0edc0 · pass, no soft lock | 2026-10-16-learner-adult-beginner-r14.md · launch · v2 (d7725fb) | none | **go** |
| more-digits-not-bigger | v1 | 5/5, fact-checker (2026-10-14) | 2026-10-16-qa.md · qa-tester · 2d6b4d5 · 5b2fee7 · pass, no soft lock | 2026-10-16-learner-adult-beginner-r1.md · launch · v1 (learner-evaluator, 914dd05) | none | **go** |
| more-detail-less-likely | v1 | 4/4, fact-checker (2026-10-14/15) | 2026-10-16-qa.md · qa-tester · 2d6b4d5 · 5b2fee7 · pass, no dead end | 2026-10-16-learner-adult-beginner-r1.md · launch · v1 (914dd05) | none | **go** |
| one-circle-fewer-introductions | v1 | 5/5, fact-checker (2026-10-14) | 2026-10-16-qa.md · qa-tester · 2d6b4d5 · 5b2fee7 · pass, no dead end | 2026-10-16-learner-adult-beginner-r1.md · launch · v1 (914dd05) | none | **go** |
| twenty-flips-run-of-five | v2 | 5/5, fact-checker (c5 re-verified pass 36, W-637) | 2026-10-16-qa.md · qa-tester · 2d6b4d5 · 5b2fee7 · pass, no dead end | 2026-10-16-learner-adult-beginner-r1.md · launch · v2 (914dd05) | none | **go** |

Each learner file has exactly one `Verdict: launch` line and one `lesson version:` line. Each file says "Findings (written from the walkthrough before reading build.md or meta.json)" and "build.md not read". Every verdict reason reads "no finding blocks a first-time learner". The notes in those files are not blocks. They go to the owning category managers as v-next material (objection 5).

## Gates (template)
- [x] All claims verified by someone other than the builder: 43/43 claims, fact-checker (table above).
- [x] Computer-use QA record (phone + desktop): one qa-tester record per lesson, dated 2026-10-16 (table above). None is integration-only.
- [x] Borrowed-mind learner review: `Verdict: launch` on the current version for all nine (table above). The verdicts are simulated, not real learners.
- [ ] Accessibility review: none on file for any of the nine (no `company/reviews/<slug>/*accessibility*.md`). **Condition** (objection 4).
- [x] Confidence mark matches evidence: `confidence` is empty for all nine. No `**` is claimed, and no human-learner evidence exists.

## Committed predictions (analytics steward, before launch)

Written by analytics-steward on **2026-10-16 at about 14:00Z**, before any publish commit for these nine slugs. All nine `meta.json` files still say `status: review` at HEAD abeb7cb, so none of these predictions is late. They cover all nine go and go-with-conditions lessons: best-of-twenty-on-one-test, order-of-the-bad-year, tax-now-or-tax-later, two-cells-sum-any-range, zebra-sorts-before-apple, more-digits-not-bigger, more-detail-less-likely, one-circle-fewer-introductions, twenty-flips-run-of-five.

**There are no real learners yet, so none of these predictions can be tested today.** `/api/events` only writes to function logs, and nothing keeps them (W-706, backend-engineer, still open). Publishing is not deploying, and any deploy needs the founder's approval of that deploy. The learner verdicts this launch rests on are simulated. They are gate inputs, not evidence that anyone learned anything. So this section says what will be measured once real events exist, and what result would count against the launch.

**Period.** Day 0 is the first day that persisted production events exist for any of the nine slugs, which needs both W-706 and a founder-approved deploy that carries this publish. The read is at day 0 + 14. If a minimum sample below is not reached by then, the read is **"no read"**, not a pass. The window can be extended once, to day 0 + 28, and this has to be written here before that extension starts. If the minimum is still not reached at day 28, the read stays "no read" and these rows are re-committed, not re-interpreted.

**Definitions** (event types are from `src/kit/types.ts`). A *start* is a `view` followed by at least one `predict` or `interact` in the same session. *Reveal reached* means a `reveal` event for that slug after a start. *First revisit recall* is the first `recall` event per learner and slug with `spacedDays >= 1` (`REVISIT_SCHEDULE_DAYS = [1, 3, 7, 21]`, so the first one is due on day 1). *Prediction correct* is the first `predict` per learner and slug. Every recall card has 3 options, so chance is 33%. All rates are pooled across the nine unless a row says otherwise.

| # | Metric | Prediction | Period | Minimum sample | would_be_wrong_if |
|---|---|---|---|---|---|
| P1 | First revisit recall rate (the learning metric) | >= 50% correct, pooled over the nine | day 0 to day 0 + 14 | >= 30 first revisits pooled | < 40% correct across >= 30 first revisits (near chance, 33%, plus about 7 points) |
| P2 | Recall gain over the first prediction (same learners, same slugs) | first revisit recall exceeds first-prediction correctness by >= 15 points | day 0 to day 0 + 14 | >= 30 learner-slug pairs with both events | the gain is <= 0 points across >= 30 pairs. Then recall is not evidence that the lesson changed anyone's mind, whatever P1 says |
| P3 | First-prediction correct rate (does the lesson target a real misconception?) | <= 50% correct, pooled | day 0 to day 0 + 14 | >= 50 first predictions pooled | > 70% correct across >= 50 first predictions. Then most learners already knew the point, and a high P1 cannot be credited to the lesson |
| P4 | Reveal reached, pooled (completion, not learning) | >= 70% of starts reach the reveal | day 0 to day 0 + 14 | >= 50 starts pooled | < 50% across >= 50 starts |
| P5 | Reveal reached, per lesson (the simulated "launch" verdicts predicting no real dead end) | every one of the nine >= 50% | day 0 to day 0 + 14 | >= 20 starts for that lesson | any lesson with >= 20 starts has < 30% reaching the reveal. That lesson goes back to its CM and release-manager as a possible dead end (the record's unpublish condition) |
| P6 | Reveal reached, the two conditional lessons against the other seven (objection 1: an unsignposted unlock treated as a condition, not a hold) | best-of-twenty-on-one-test and two-cells-sum-any-range are each within 15 points of the pooled rate of the other seven | day 0 to day 0 + 14 | >= 20 starts each, and >= 50 for the seven | either lesson is >= 20 points below the other seven's pooled rate. Then the "condition, not hold" reading of objection 1 was wrong, and the evidence goes to W-1333 (principal-pm-verticals) |
| P7 | Median dwell on `complete` (engagement only, **never reported as learning**) | between 45 s and 120 s, pooled | day 0 to day 0 + 14 | >= 50 completes | the median is < 30 s or > 180 s. This tests the 60-second format only. Longer dwell can mean confusion as easily as interest |

**Checks before reading any row** (Twyman: anything that looks interesting is probably wrong until these pass).
- Logging: events persist for all nine slugs, and every event type above appears at least once per slug. Our own QA, smoke tests and learner-evaluator walks are excluded (by agent and session marker) before counting.
- Sample ratio: starts per slug should not differ by more than about 3x between lessons in the same domain once the feed exposes them. A lesson with no `view`s is a logging or exposure fault, not a result.
- Novelty: report day 0-2 and day 3-14 separately. A P4 or P7 move that exists only in day 0-2 is not read as preference.
- Recall selection: only learners who come back can produce P1. Report P1 next to the revisit rate (first revisits / starts). P1 on a revisit rate under 10% is reported as "survivors only", not as the cohort's recall.

These rows are scored at the first WBR after day 0 + 14 (analytics-steward, WBR metrics section). Results are added beside this section and never written into it. The standing EXP-002 prediction (recall >= 60%, wrong if <= 45%) is separate and unchanged. It is a moderated 5 x 5 session design, and these rows are passive feed telemetry.

Signed: analytics-steward (Grace), 2026-10-16.

## Open objections travelling with this launch
| # | Objection | Raised by · owner | Why we proceed anyway (what happened to it) |
|---|---|---|---|
| 1 | **Unsignposted unlock.** best-of-twenty-on-one-test opens the reveal only if "Fresh test" is pressed while 20 models is selected, and "no on-screen cue says" so. two-cells-sum-any-range needs four exact milestones (range 3-7 included) "with no on-screen cue other than the exploreHint". This is the same class as W-1333, which holds patience-wins-the-split. | qa-tester (2026-10-16 QA records, R4 notes) · raised here by the chair · owner principal-pm-verticals (W-1333) | **Accepted as a condition, not a hold.** The difference from patience-wins-the-split: that lesson's hold also cites no launch verdict on its current version. Here, the learner walk on the current version reached the reveal by the natural path (default 20 models, Run, Fresh test; build, then sliders). The learner said launch and flagged the cue only as a note ("nothing prompts me to tap Fresh test again"; "a learner who skips around may not see the predicted range highlighted"). QA found no dead end. **Condition:** W-1333's answer applies to these two. If it rules that a cue is required, both go into its fix list as v-next revisions. If a dead end is ever found, the lesson is unpublished. |
| 2 | **QA build ancestry (stricter R3 reading).** The bc0edc0 records say src/components (483a52b) and src/lib (1f31231) have commits that are not ancestors of the build SHA, and that "stricter R3 reading would hold this record". | qa-tester · owner evaluation-steward | **Checked by the chair and answered.** `git diff --stat bc0edc0 HEAD -- src/kit src/components src/lib src/app` touches only `src/components/lifehacks/*`, `src/lib/lifehacks/*`, `src/lib/events-intake.ts` and `src/app/api/events/route.ts`. Outside the lifehacks directories, a grep shows those files are imported only by the events API route and by Life Hacks demos. No change touches src/kit or the render path of these nine. From 5b2fee7 to HEAD, the only shell change is `src/components/lifehacks/HomeLesson.tsx`. Evaluation-steward may still rule the stricter reading. If it does, the five bc0edc0 lessons wait for a re-run. |
| 3 | **Unnamed candidates.** more-detail-less-likely, one-circle-fewer-introductions and twenty-flips-run-of-five were not nominated by any lane. They are here because they pass on the gates (R3). | head-of-product (R3) · owner cm-probability | **Open to cm-probability.** If cm-probability objects before the publish pass, release-manager leaves the three out, and the objection is written in this row. No objection is on file at signing. |
| 4 | **No accessibility review** of any of the nine. | chair · owner accessibility-reviewer | **Go with conditions,** the same as the 2026-10-13 precedent. QA covered keyboard, reduced motion, dark scheme and 360x640 overflow. That is not an accessibility review. **Condition:** an accessibility review of all nine within the next cycle (board ask below). A lesson that fails with a lock-out is unpublished. W-057, which carried the earlier condition, was dropped, so this needs a new item, not a reference to W-057. |
| 5 | **Learner-review notes** (examples: best-of-twenty's frozen "seed" status line; twenty-flips' "tallest bar is 4" sentence; more-detail-less-likely's giveaway question wording). | learner-evaluator · owners: the category managers (cm-ai, cm-economics, cm-cs, cm-math, cm-probability) | **Not blocking,** in the reviewer's own words ("no finding blocks a first-time learner"). The notes go to each CM as v-next material. They are not translated into a hold. |
| 6 | **Simulated evidence only.** No verdict here is real-learner evidence, and recall cannot be measured before a deploy. | standing caveat (brief objection 3) · owner analytics-steward | **Proceed.** This is what the gates allow. B2 predicts on what will be measurable, and the confidence mark stays empty. |
| 7 | **W-1237 reading** (qa-tester records count, integration verify does not). | head-of-product (R3) · owner release-manager | **Applied here.** Release-manager records W-1237 in its own words. If it reads §4 otherwise, it writes the objection in this row before publishing, and the chair re-reads. |
| 8 | **Stale internal source text.** twenty-flips c5's source says "the first source sentence still describes v1". This is not learner-visible. | fact-checker (pass 36) · owner demo-builder | **Proceed.** The claim is verified on v2. The source sentence is a builder edit, and it must not change the claim text. |

## Not in this review (from R3, recorded so the next chair has it)
- The 15 e7f2904 lessons (`Verdict: pass`, W-843 vocabulary): wait on evaluation-steward A3(a).
- metal-feels-colder v2, ruler-catch v4, throw-it-fast-enough v7, continental-jigsaw v6: no walk on the current version.
- fifty-up-fifty-down v2: version-stamp conflict (A3(c)).
- Lane holds: two-right-angles-never-meet, patience-wins-the-split, bird-on-the-wire, head-on-is-a-wall, small-gap-big-extremes, cluster-stops-the-cascade, asthma-looks-safe, calibrated-but-unequal-alarms, cut-the-busiest-link.
- Every History lesson (incubating; History-wide hold in publish-holds.json).

## Decision
**Go: order-of-the-bad-year, tax-now-or-tax-later, zebra-sorts-before-apple, more-digits-not-bigger, more-detail-less-likely, one-circle-fewer-introductions, twenty-flips-run-of-five. Go with conditions: best-of-twenty-on-one-test, two-cells-sum-any-range (objection 1). No-go: none.** Every lesson carries the accessibility condition (objection 4).

Two preconditions for release-manager: (a) B2's committed predictions above are dated before any publish commit for these slugs. (b) cm-probability's possible objection to row 3 is checked. Publishing is release-manager's act, through the gates, and this record does not publish. **Any deploy needs the founder's approval of that specific deploy.**

This record stops being true if any of these happens: a slug's `Demo.tsx` or claims change after 6838dba, a newer learner review on that slug says anything but `Verdict: launch` on the current version, or `node tools/publish-ready.mjs` stops listing the slug. Then that slug is no-go until it is re-reviewed.

Signed: head-of-product (Priya), 2026-10-16.

## Kudos (optional)
- @qa-tester: the R4 exploratory notes named the unsignposted unlocks on best-of-twenty and two-cells, and the build-ancestry caveat, instead of passing silently. Objections 1 and 2 exist because of them.
