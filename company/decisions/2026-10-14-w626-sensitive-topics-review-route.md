# Decision (proposed): the review route for sensitive society and history topics (W-626)

owner: chief-of-staff-ceo-office (org design and route design); **the founder decides the org change**
date: 2026-10-14
status: **proposed**. The checklist and the gate mechanics below use files that already exist and need no org change. The cultural-reviewer scope change is a patch that has **not** been applied. It waits for the founder's decision and for localization-lead's consent to the load (ruling 4).
class: org (scope change to an existing role) + process (a review route)
route: head-of-product (requirement, ruling 4) → chief-of-staff-ceo-office (design, this record) → localization-lead (consents to the load), head-of-product, evaluation-steward, cm-history, cm-big-ideas, cm-books, research-lead (consulted) → founder (decides the scope change) → chief-of-staff (applies the patch, places the holds)
requirement: `company/decisions/2026-10-14-books-big-ideas-strategy-review.md`, ruling 4 (a review by someone outside the category, before build on the brief and before publish on the walkthrough)
blocked by its absence: History's sensitive concepts (48 concepts in `content/curriculum/history.json` carry a `sensitive` value today; the dispatch counted 39) and the 5 History briefs already held "for W-626" in `company/ops/brief-skips.json`; Big Ideas' society and mind briefs in a section 6 class; Books titles in those classes; the sensitive part of the founder's 100 History lessons (`company/decisions/2026-10-14-founder-history-100.md`, step 4)
pattern: `company/ceo-office/org-change-process.md`

## What is true today (checked 2026-10-14)
- History's charter (`company/domains/history.md`, Sensitive topics) and Big Ideas' strategy (section 6) already define the route's steps: brief marking and care line, research-lead note, cultural-reviewer `culture-en` review before build and before publish, then fact-check. The missing piece is only step 3's reviewer: `cultural-reviewer`'s scope is locale variants only.
- `tools/claim.mjs` never hands out a brief that has a line in `company/ops/brief-skips.json`. `tools/publish-ready.mjs` (the chief of staff's publish loop) never offers a lesson that has a line in `company/ops/publish-holds.json`. **`company publish` itself reads neither.** So the publish hold is a loop rule, not a gate, until AMD-006 (below) is ratified.
- HQ already has a `culture-review` room (src/lib/hq.ts) and `tools/events.mjs` maps `cultural-reviewer` to it. Extending the role needs no HQ or events change.

## Decision 1. Which topics trigger the route
The union of the History charter's classes, Big Ideas section 6 and the dispatch's list: war and violence; colonialism and empire; slavery and forced labour; genocide and mass killing; religion; borders and territory (disputed today or approximate in the source); race, ethnicity and group comparisons; political figures (any named leader, ruler, party or movement, living or dead) and voting and political philosophy; famine and group-tied epidemics; migration and demography; economic policy; mind and wellbeing claims. Books titles in these classes are on the route whatever the lesson's idea. The full table is section 0 of `company/international/sensitive-topics-checklist.md`.

Rules: a curriculum concept with a non-empty `sensitive` field is on the route. The category manager marks the brief "Review route: sensitive (<class>)" and writes the care line (charter step 1). The reviewer may add a class, never remove one. When unsure, it is on the route. Downgrading a marked concept needs a head-of-product record.

New relative to the charters: **race and ethnicity** and **political figures** are named classes. History's charter and Big Ideas section 6 cover them only as "comparisons of groups" and "voting and political philosophy". cm-history owns the charter's Sensitive topics section, so the charter is not edited here (board).

## Decision 2. Who reviews: extend cultural-reviewer; do not create a role
**Proposed:** cultural-reviewer gains source-language sensitive reviews, still reporting to localization-lead. Patch: `company/ceo-office/patches/2026-10-14-w626-cultural-reviewer-sensitive-scope.patch` (tools/org/roles.mjs plus the three files it regenerates: company/roles/cultural-reviewer.md, .claude/agents/cultural-reviewer.md, company/roles/README.md). It applies cleanly to HEAD as of this record (`git apply --check`). Apply it with `git apply <patch>`, then run `node tools/org/generate.mjs` to confirm there is no drift, then add the `org-change` event.

Why extend rather than add a sensitive-history-reviewer:
- Head-of-product named this role as the right reviewer (ruling 4). Its mission ("the example that lands wrong, the norm that differs") is the perspective check this route most needs: reading the lesson as a resident of the place, or a member of the group, it is about.
- `cultural-reviewer` is already in `MANY` (tools/org/people.mjs), so parallel instances are allowed. The load is instance-hours, not a headcount problem.
- A new role adds a role, a person, an HQ mapping and an agent to fix what is a missing *process step*. That is this office's first named failure mode.
- Independence holds. The reviewer is outside the category (ruling 4), may not review what they drafted, built or researched, and reads the walkthrough before any account.

Alternative held in reserve: a `sensitive-topics-reviewer` under head-of-product. Trigger for proposing it: localization-lead declines the load, or the sensitive queue holds more than 10 briefs or lessons unreviewed for longer than one operating loop for two loops running. The patch's wording already lets the work move without a rewrite.

Load estimate: up to 48 History concepts, a handful of Big Ideas and Books briefs, two reviews each, so about 100 to 110 records over the History run. Each review is short, because the checklist is fixed.

## Decision 3. What a review checks
`company/international/sensitive-topics-checklist.md` lists, for both stages, these checks: framing (F1-F6); the sources behind numbers about people (N1-N5); whose perspective is shown (P1-P5); language (L1-L6); imagery and stage (I1-I5); and a refuse list (R1-R11) drawn from the History charter, Big Ideas section 6, and two items added here: genocide denial or minimisation, and a Books thesis about groups adopted without its critics. A refuse-list hit is refuse or block, never "go with changes". The verdicts are: brief go / go with changes / refuse; lesson publish / revise / block. Each verdict says who acts next.

## Decision 4. How it gates (existing mechanisms; no new code)
| When | Mechanism | Who writes it | Who lifts it, and on what |
|---|---|---|---|
| Brief written | `company/ops/brief-skips.json` line: "sensitive route (W-626): <classes>; held until a research-lead note and a cultural-reviewer culture-en-brief verdict of go exist" | the category manager (or the drafter, as for the 5 History lines today) | the category manager, citing both files, after Stage A says **go** (or **go with changes** plus the reviewer's confirming addendum) |
| Brief written | `company/ops/publish-holds.json` line for the slug: "sensitive route (W-626): needs a cultural-reviewer culture-en publish verdict for the current version". A hold for an unbuilt slug is harmless, because publish-ready only reads lessons on disk. | chief of staff (the file's owner) | chief of staff, when `company/reviews/<slug>/<date>-culture-en.md` says `Verdict: publish` and its `lesson version` equals meta.json `version` |
| Build | meta.json `reviewRoute`, copied from the brief by the builder: `{"route": "sensitive", "classes": [...], "research": "<note>", "briefReview": "<culture-en-brief file>", "publishReview": null}` | builder (route, classes, research, briefReview), never publishReview | chief of staff fills `publishReview` when lifting the hold |
| Fact-check | as usual; an overturned sensitive number goes to the category manager and research-lead, not to the builder (charter step 4) | fact-checker | n/a |

Making the publish hold a **gate** (so `company publish` refuses a `reviewRoute.route: "sensitive"` lesson without a matching publish verdict, and `check` fails when a lesson on a sensitive concept has no `reviewRoute`) is a change to `tools/company.mjs`, which is protected. I have drafted it as `company/constitution/amendments/AMD-006-sensitive-review-gate.md` for evaluation-steward to own. It is not applied.

## Applied in this session
- New: `company/international/sensitive-topics-checklist.md`, this record, the patch, and the AMD-006 draft (with its row in the amendments README).
- Not applied: the patch (the founder decides). Not edited: brief-skips.json, publish-holds.json, the board, progress.md, any charter, any meta.json.

## Consulted (owed; each answers here in writing: agree / agree with changes / object, with a reason)
- localization-lead: consent to the load (ruling 4 makes this a precondition). Owed.
- head-of-product (Priya): does this meet ruling 4? Owed.
- evaluation-steward (Hilde): AMD-006 ownership, and whether the hold-as-loop-rule is acceptable until it is ratified. Owed.
- cm-history, cm-big-ideas, cm-books: the trigger list and the two added classes. Owed.
- research-lead: the provenance note is the input to N2 and F5. Owed.

## Objections, and what happened to each
| Objection | By | Status |
|---|---|---|
| "The cultural-reviewer route is not in that role's scope." | cm-big-ideas (section 6) | **Answered by the patch** once the founder accepts it. Until then, sensitive briefs stay held. |
| "Locale reviewers are the wrong expertise for historiography." | anticipated | **Partly accepted.** The historiography (who counted, alternatives) is research-lead's note, and the reviewer checks the lesson against it (N2, F5). The reviewer's own job is perspective, language and imagery, which is that role's skill. If Stage B reviews keep finding N-items the note missed, the route is wrong, not the reviewer: send it back to research-lead. |
| "A publish hold the CLI does not enforce is not a gate." | anticipated (evaluation-steward) | **Accepted.** That is why AMD-006 is drafted. Until it is ratified, the hold binds only the chief of staff's publish loop, as every hold in that file does today. |
| "Two reviews per lesson slow the founder's 100." | anticipated (principal-pm-verticals) | **Accepted as a cost.** Standard History briefs are not on the route and go ahead (founder record, step 4). Briefs on the route are ranked below standard ones in the charter already. |

## This would be wrong if
- no sensitive brief has a Stage A record within two operating loops after the patch is applied (the route exists on paper only);
- Stage B blocks or revises more than 1 in 3 lessons that passed Stage A (then Stage A is not catching what it should, and the brief template needs a stronger care line);
- learner-evaluators or the founder flag a published sensitive lesson for a checklist item the review marked PASS.
