# Triage: first pass of the whole board (2026-10-13)

owner: portfolio-manager (Odette, CEO office) · method: company/ops/triage.md · tool: `node tools/triage.mjs`
GitHub: 0 open issues (checked by the caller), so nothing was imported.

I opened every item and what it links to before setting it. For lesson items that meant the lesson's `meta.json` (version, status, the named claims), its review records (verdict, lesson version) and its build note. For tool items it meant the file in `tools/`, `src/kit`, `next.config.mjs` or `globals.css`. Every item carries a triage note on the board saying why. I wrote none of these items, so I approved them myself. W-129 was filed by another session while I worked, and I triaged it too.

## Counts

**Before** (`node tools/triage.mjs stats`):

```
open: 125  untriaged: 125
by priority: { untriaged: 125 }
by state: { next: 47, backlog: 77, review: 1 }
```

**After:**

```
open: 66  untriaged: 0
by priority: { P1: 1, P2: 21, P3: 37, P4: 7 }
by state: { next: 16, backlog: 49, review: 1 }
oldest P1: W-010 (2 d) Accessibility review of the kit and first lessons
oldest P2: W-001 (2 d) Fact-check claims of all lessons in review
```

What happened to the 126 items triaged (125 open plus W-129): 36 marked done, 24 dropped (16 of them merged duplicates), 16 approved into `next`, 49 left in `backlog`, 1 in `review`.

## Approved `next` (16), in priority order

Ties are broken by: blocks other items, then on a published lesson, then age.

| # | Item | P | Owner | Why it is next |
|---|---|---|---|---|
| 1 | W-010 | P1 | accessibility-reviewer | 0 accessibility records exist and 76 lessons are published. That breaks the written launch condition of 2026-10-13. Merged in W-057 and half of W-102. |
| 2 | W-073 | P2 | evaluation-steward | Launch verdicts were written without anyone seeing the screenshots. `publish-ready.mjs` still cannot tell when that happened (8 holds, 12 re-reviews after the fact). |
| 3 | W-046 | P2 | demo-builder | one-in-a-million-match is **published**, and its reveal presents a chosen seed's 5 matches as what happens. |
| 4 | W-076 | P2 | platform-engineer | The EDD-001 trigger has fired: the feed HTML is 1.82 MB against a 300 KB budget. This has to land before any deploy (F-04). |
| 5 | W-075 | P2 | principal-engineer | The EDD-003 review record is still open, and founder item F-05 waits on it. |
| 6 | W-096 | P2 | head-of-product | The format catalogue is not approved, and the whole design team waits on it. |
| 7 | W-129 | P2 | lifehacks-safety-reviewer | 0 safety records exist. The whole Life Hacks domain waits on this review. |
| 8 | W-003 | P2 | pedagogy-critic | Demo Crit has been overdue since 10-12, and 0 pairwise records exist. |
| 9 | W-001 | P2 | fact-checker | 73 claims are unverified and 1 is disputed. They are mostly in new lessons. |
| 10 | W-002 | P2 | learner-evaluator | About 40 lessons have no learner review. This item now also covers screenshot re-reviews of the 8 geography holds, and reviews of the current version for binary-search v3, heavy-but-floats v3 and point-one v3. |
| 11 | W-124 | P2 | demo-builder | twenty-then-ten-off shows `28.000000000000004%`. It is the only open fatal verdict. |
| 12 | W-123 | P2 | demo-builder | cafe-is-five-bytes c5 is the only disputed claim in the whole catalogue. |
| 13 | W-070 | P2 | demo-builder | salt-ions c5 is still "about 3.5" and unverified. antarctica c5's source still says "from memory". Merged in W-113. |
| 14 | W-128 | P2 | demo-builder | count-the-marked-fish c5 is unverified and blocks launch. |
| 15 | W-061 | P2 | platform-engineer | The summit-kettle v2 review still reports clipped reveal text after the CSS fix. Reproduce it first. |
| 16 | W-014 | P2 | demo-builder | merge-sort-payoff v3: the v2 review says the split round is still never shown on the path. |

`review`: W-074 (P2, SPIKE-001 done, waiting for the principal engineer to close the review).

P2 items left in `backlog` on purpose, because demo-builder capacity goes to hard blockers first: W-019, W-020, W-125, W-126, W-127 (lessons revised once whose current review still says revise).

## Marked done (36), with evidence

| Item | Evidence |
|---|---|
| W-004 | WBR records exist for 10-12 and 10-13 |
| W-005 | `rituals/records/2026-10-12-op-planning.md`. Ratification is the founder's (W-011) |
| W-009 | cs/sketch-the-counts is built and verified |
| W-012 | Independent re-check of c4–c8 in `reviews/merge-sort-payoff/2026-10-13-fact-check.md` |
| W-013 | v2 build note covers F1 and F2. F3 (the Knuth page) cannot be opened, and the verdicts rest on the derivation |
| W-015 | The merged row has `role=group` and `aria-label` (Demo.tsx:336) |
| W-016, W-017 | base-rates v2 and half-life v2 are published, with v2 verdict launch |
| W-018, W-077 | binary-search v2 gates the reveal; v3 fixed the dead end on the QA path |
| W-022 | mercator c3, c8–c10 and c12 were verified by a different checker |
| W-030 | `next.config.mjs` sets `turbopack.root` |
| W-032 | shared-pasture was built with 18 cows / 36 (c4) |
| W-033 | Reveal-phase CSS fix (changelog 2026-10-13) |
| W-035 | Every domain has 55 briefs |
| W-038, W-039, W-040, W-042, W-045, W-050, W-058, W-064 | Every claim named is now verified. The only disputed claim left anywhere is cafe c5 |
| W-052 | `walkthrough.mjs` presses up to 16 controls |
| W-053, W-065 | No checker-added ai, cs or geography claim is unverified any more |
| W-056 | summit 0.3 atm, "in this setup", point-one v3 |
| W-060 | friends c3 now says "connected", verified and published |
| W-062, W-063 | `tools/publish-ready.mjs` checks verdict and version and links evidence (interim, until AMD-001(d)) |
| W-078, W-079 | heavy-but-floats v3 opens at 800; point-one v3 reaches pH 8.1 |
| W-081 | All 12 lessons have a `-seen` re-review |
| W-090 | 5 Life Hacks briefs written. During this pass, another session wired the 5 skips into `brief-skips.json` and filed W-129 |
| W-103 | All 37 category and sub-area manager role docs carry the format rule (from `tools/org/roles.mjs`) |
| W-116 | 7 illustration requests exist in `company/design/illustration-requests/` |

## Dropped (24), with reasons

- **Duplicates merged (16):** W-055 into W-053; W-057 into W-010; W-059 into W-048; W-113 into W-070; W-043, W-047, W-051, W-083 and W-071 into W-041; W-104 to W-112 into W-103.
- **Moot (5):** W-080, W-084, W-093 and W-094 asked for corrections to briefs whose lessons are already built. The builders recomputed the numbers and recorded the brief error in `build.md`, so a spent brief has no reader.
- **Superseded (1):** W-021. The tainted v1 review is no longer the evidence, because an independent v2 review exists. The general question goes to EXP-001 (W-006).
- **Nothing to triage (1):** W-121. `lifehacks-ideas.md` holds only its header.
- W-112 also counts here: it duplicates W-103, and it was already true (Life Hacks briefs name a format).

## Duplicates merged

| Kept | Merged in | Why |
|---|---|---|
| W-010 | W-057, half of W-102 | Same accessibility review. The 5 published lessons are now 76 |
| W-041 | W-043, W-047, W-051, W-083, W-071 | All are advisory wording notes from fact-check records, split by domain. One item, P3 |
| W-048 | W-059 | Same UN WPP 2024 check (founder item F-10) |
| W-053 | W-055 | Same 9 claims added by the checker |
| W-061 | half of W-098 | Same clipped reveal |
| W-070 | W-113 | Same salt-ions c5 fix. W-113 also brought the antarctica source |
| W-103 | W-104 … W-112 | 10 copies of one broadcast notice |

## Owners changed (10)

| Item | From → to | Why |
|---|---|---|
| W-003 | chief-of-staff → pedagogy-critic | The chief of staff convenes Demo Crit, but the work is pairwise judgement |
| W-124, W-125 | cm-economics → demo-builder | Revising a lesson is builder work. The category manager may still choose to retire it |
| W-126 | cm-probability → demo-builder | same |
| W-127 | cm-chemistry → demo-builder | same |
| W-128 | cm-life → demo-builder | A claim's wording in the lesson |
| W-095 | cm-math → demo-builder | The brief half is moot. What remains is a missing citation on ruler-catch c3 |
| W-114 | evaluation-steward → head-of-product | The cheap fix is one line in demo-standard. That takes load off the steward |
| W-025 | evaluation-steward → analytics-steward | `EXP-*.md` is the analytics steward's scope |
| W-103 | cm-math → head-of-product | A rule for every category lead (closed as done) |

## Patterns

1. **The board lags the disk.** 36 of 125 open items (29%) were already finished. Most were claim fixes and revisions done in batch passes that never moved the board. Of the 47 items that were in `next`, 20 were already done, 4 were duplicates, and only 5 stay in `next`. Whoever merges a pass should close the items it covers, or the board stops being the operating picture.
2. **Too many items for one owner.** demo-builder has 13 open items, and builders do run. evaluation-steward has 10 and has run once. Every one of its items needs an amendment, and none has been drafted since AMD-001. platform-engineer has 9. The steward is the bottleneck the role evaluation named, and triage cannot fix that. It needs a dispatch, which is the operating chief of staff's call.
3. **Roles that hold work but have never run.** These roles hold open items and have 0 dispatches: accessibility-reviewer (3, including the only P1), pedagogy-critic, qa-tester, design-lead, visual-designer, learning-designer (2), privacy-reviewer, analytics-steward, lifehacks-safety-reviewer (2), domain-scout, localization-lead. Five of the 16 `next` items belong to roles that have never been dispatched.
4. **Brief errors are caught at build time, not at brief time.** In 7 cases (W-032, W-080, W-084, W-093, W-094, W-095, plus a brief skip noted in W-036) a builder recomputed a category manager's "Check" figure and found it wrong. Nothing checks a brief's figures before it is built. I propose (not decide) that head-of-product consider a fact-check of each brief's Check line, or have the brief carry its node output.
5. **Owner by domain instead of by work.** Learner-review findings were filed to the category manager of the domain (W-124 to W-128), and a broadcast was filed as 10 copies (W-103 to W-112). Filers should name the role whose scope holds the action.
6. **Verified claims whose sources were never opened.** continental-jigsaw c1 rests on "parameters from recall, not opened". ruler-catch c3's source reads "TO CITE". Both are verified. This is the live case for W-028 (a "source not opened" status).
7. **Untracked holds.** `company/ops/publish-holds.json` holds 8 geography lessons with no board item. I folded them into W-002 instead of filing a new item.
8. **Concurrent edits.** W-129 and the Life Hacks skips landed while I was triaging. I first set W-090 to P1 because the safety hold written in `lifehacks.md` was missing from `brief-skips.json`. It was fixed within minutes, so W-090 is done and W-129 is P2.

## Founder

All 6 founder-owned items are in `company/ops/founder-inbox.json` by their `board` field: W-007 (F-11), W-011 (F-12), W-048 and W-049 (F-10), W-091 (F-08), W-122 (F-07). Each is P3 in `backlog`. I gave them a priority and decided nothing. Nothing needed adding. W-059 merged into W-048, which F-10 already covers.

These items touch founder decisions without needing one to start: W-010, where the review can run now and only unpublish-or-waive is F-13 P2; W-076, before F-04; and W-075, before F-05.
