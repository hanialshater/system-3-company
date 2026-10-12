# Distillation Day: 2026-10-12

owners: pattern-librarian, evaluation-steward

The selection record counts what each change **removes** as well as what it adds. A rule, check
or ritual that did as well with less should win.

Honesty about the sample: this is the founding day. Everything has run once, on 18 lessons, in one wave. "Has not caught anything yet" is weak evidence of uselessness; I recommend removal only where something is duplicated, unmeasurable, or has produced inconsistency. Nothing was deleted by me. Protected items (QA contract, review rules) can only change by amendment, which I name instead of doing.

## Candidates for removal
| Item (check / rule / ritual / pattern / kit feature) | Why it exists (incident, link) | Has that risk changed? | Evidence it still catches things | Remove? |
|---|---|---|---|---|
| Marks (`**` / `*`) printed in `product/demo-standard.md` craft rules | Show builders which rules are well-supported | No, but the same marks are kept in a second place (the pattern files) and have already diverged: demo-standard prints `**` for predict-before-reveal and `*` for teach-the-payoff / remove-the-easy-path, which the pattern review (2026-10-12) lowered. "One representation on a phone `**`" and "Numbers the learner can feel `*`" have no pattern file at all. | None for the duplication; the pattern files are the source of truth. | **Yes.** Remove the marks from demo-standard and link to `knowledge/patterns/README.md`. Keep the rules. Owner: head-of-product. |
| Status tables copied into ritual records (WBR section 1, cycle-planning top) | `company ritual` pastes `company status` so the record is self-contained | The copies go stale in the file: on 2026-10-12 the WBR says "open claims 44" and "Mathematics 2/56", cycle-planning says "107" and "2/10" for the same repository on the same day (generated at different moments, or different concept counts; I did not establish which). A reader cannot tell which is true. | The numbers disagree, so the paste added risk, not information. | **Yes, in cycle-planning** (drop the table, link to the WBR). Keep in WBR, which exists to hold it. Owner: chief-of-staff. |
| Per-lesson QA record file `<date>-qa.md` when it says pass | The QA contract (5 checks) is constitutional; the record proves the browser saw it | No change | 17 of 17 records read "phone passed, desktop passed, retries 0, first error none". The checks that matter did not fire: 5 lessons were FATAL for a reveal that unlocked after one tap, and check 4 ("unlocks without interaction") passed every one of them. | **Fold, not delete:** one wave-level table instead of 17 identical files, with a file only for a failure. Owner: qa-tester; the format is in `reviews/README.md` (protected), so it needs an amendment. |
| QA check 4, second clause: "reveal says fewer than 120 characters" | Catches an empty or stub reveal | Floor of 120 characters against a craft ceiling of 120 **words** in demo-standard: two numbers, two units, one name. The floor passed every lesson (I did not measure reveal lengths) | 0 of 17 failures | **Keep, but rename** in the contract ("120 characters minimum") and in demo-standard ("120 words maximum") so nobody reads one as the other. A protected-path edit. |
| QA checks 1, 2, 3, 5 (page error, locked-before-predict, dead control, overflow / 24 px target) | Kit and platform regressions; the slider tap-target bug was worked around four times (retro) | The slider bug is fixed once before waves (retro) | 0 failures recorded in 17 lessons, because the kit enforces 2 by construction and the slider defect was fixed once in the kit before the wave (retro) | **Keep.** They protect a kit that will change; an unfired regression test is working. Re-ask when the kit has been stable for two waves. |
| Pattern `pairwise-not-scores` as a separate pattern | Rule 3 of `reviews/README.md`: no absolute scores | Rule 3 already forbids scores, and every review obeyed it with findings alone, so the pattern adds only "use pairs" | No pairwise record exists (needs two versions) | **Not yet.** Revisit at the next review. Fold into `demo-crit` if still no case by 2026-12. Already lowered to unstarred. |
| Patterns `remove-the-easy-path` + `keep-a-strange-branch` (and constitution Art. 5's 20% reserve) | One mechanism stated three ways: reserve capacity for the strange, and constrain one branch | Cycle-planning's exploration-bets table is empty, so none has changed a decision | None; zero cases for each | **Merge** into one pattern at the next review if no bet is placed by then. Do not delete either's failed-case lines. |
| Ritual: Cycle Planning's four-part body (slots / exploration bets / platform / not-doing) | Make the OP allocation visible | Sections 2 and 3 are empty on the founding day; section 5 holds two lines | Nothing was decided in it that the board and WBR do not hold | **Wait one cycle.** If section 2 is empty again, merge into the WBR's decisions section. |
| Ritual: Demo Crit's pairwise step (as it is written) | Independent pairwise judgement of lessons in review | Reviews so far are single-artifact; the demo-crit record could not run pairwise | No pairwise record | **Keep.** Needed for the v2s now coming (merge-sort-payoff, mercator). |
| `verified` status for claims whose source was not opened | Fact-checker could not open IUPAC, USGS, NEJM, Feller (egress blocked); verified from search results and own working | The risk is status inflation, not a check to remove | 14 of the 18 fact-checks mention a source not opened, unreachable, blocked or secondary (grep, not read one by one); the checks did find 2 real disputes (mercator c3, herd-immunity c5) | **Do not remove; add a status.** `verified-secondary` or a `source_opened: false` field, so the trust sheet does not show a book citation as read. Owner: evaluation-steward (schema change in `src/kit/types.ts` is the platform-engineer's). |
| The same decision recorded in three places (second fact-check: checklist step 6, retro table, WBR anomaly row "done (checklist)") | Make sure the change outlives the retro | None | The checklist is the enforced copy | **Remove the WBR row and the repetition** once the checklist carries it. Low value, low cost. |

Not recommended for removal: the fact-check (2 disputes on ~152 claims, plus ~3 unrecorded claims per lesson found), the isolated learner review (all 5 fatals), the claims ledger.

Unrun and therefore unmeasurable, not candidates: a11y reviews (no `*-a11y.md` exists), EXP-001, EXP-002, the Constitutional Review Board.

## Removals run as experiments
Remove on a branch; run the full QA and review set on held-out lessons; compare.
- **Fold per-lesson QA files into a wave table** (protected format; requires amendment first, so no experiment can run until it is ratified).
- **Strip the marks from demo-standard.** Experiment: have two builders in wave 1 read the standard with and without marks; measure whether any decision in their build.md cites a mark. Prediction: none will.
- **Drop the status table from cycle-planning** this cycle and see whether the planner asks for it.

## Folded knowledge
Repeated corrections this wave that became a pattern, but not yet a kit default or a lint:
- Question and reveal numbers that disagree with the stage (5 lessons) → `numbers-from-the-stage`. Candidate for a kit default: derive strings from the stage values.
- Reveal gate reachable without the key state (17 of 18) → `earn-the-reveal`; AMD-001 (kit support) awaits ratification. This was the only correction repeated across the whole wave; folding it into the kit is worth more than any removal above.
- Model label only in the reveal (6 lessons) → `label-the-model-on-the-stage`.
