# First Light: the full-scope re-estimate (W-1121), with the ad slot, the prediction swap and challenges

owner: principal-engineer (Kenji), tech lead · for: head-of-strategic-initiatives (W-1122, D-40), portfolio-manager (tranche 2 and the stop rule at the 10-23 checkpoint), founder · date: 2026-10-16 · batch: first-light/2026-10-16-round-1#2 · tier: advice (no change made) · budget: `[project:first-light]`, tranche 1
Supersedes the dates and odds in [the 10-15 re-estimate](2026-10-15-first-light-reestimate.md) §2, §3 and the cut order. Its Q5 measurement (§1) and unit costs stand.
Inputs: [founder: ads and social back](../../decisions/2026-10-15-founder-first-light-ads-social-back.md), [PRD-003 swap](../../product/prds/PRD-003-first-light-social-prediction-swap.md), [PRD-004 challenges](../../product/prds/PRD-004-first-light-challenges.md), [privacy review of EDD-008](../../reviews/_privacy/2026-10-16-edd-008-accounts.md), SPIKE-002 results (branch `accounts`), [my rulings on R1, R2, C11](../reviews/2026-10-15-accounts-f01-review.md) (addendum 2026-10-16), [quality bar §3](../../initiatives/first-light/quality-bar.md), [Project Review 1](../../rituals/records/2026-10-16-project-review.md) item 7, `src/kit/progress.ts` and `src/kit/Lesson.tsx` (read only).

**Every date and percentage below is my estimate, not a measurement**, unless it is marked *measured*. Run counts carry the 10-15 note's 1.25x to 1.5x error.

## Short answer

1. **Go/no-go 11-23: about 50%. Launch 11-30: about 45%.** These assume the pre-declared 11-06 cuts are honoured on the day. **Full scope actually in the release** (ad slot, swap and challenges all shipping): **about 3%.** If the founder takes cut 1 now (the swap to release 2), go/no-go rises to about 60%. Taking cuts 1 and 2 brings it to about 65%.
2. **Why it is not 25% any more.** Four things went better than planned. F-01 was decided on time. SPIKE-002's local part passed six days early. The privacy reviewer's first-ever run happened, and it is a conditional pass. And **A1 is already on main** (0d76ae1, 10-16), not due 10-30, so Q5 and the halved build time are real now. The 25% assumed everything had to be ready on the day, and on that basis the figure is now worse (3%). The pre-declared cuts let surfaces drop without moving the date. What still costs odds is the full scope crowding the privacy reviewer, me and the builders in the fortnight 10-26 to 11-09. That is where the date slips if it slips.
3. **Cut order:** (1) the prediction swap, (2) the ad slot, (3) challenges, (4) share links never by hand, (5) personalization switches itself off. Never cut: auth with history kept, progress, legal, infra, mastery state.
4. **Latest starts:** the swap's EDD (W-1131) **by 10-27**, with approval by 10-31. That is before F-26's 10-30, so I recommend a low-cost draft in round 2, from 10-23. The challenges build **by 11-01**, recommended 10-30. The ad-slot build **by 11-01**, after F-17 on 10-23 and W-893.
5. **EDD-008 on 10-28 holds (about 75%)** after the privacy conditions, if run 1 gets a builder slot by 10-22. **EDD-009 on 10-30 holds for the mastery half (about 65%), not for the whole EDD (about 30%).** I propose approving it in two parts and keying the slip rule on the mastery half only.
6. **Engineering T2 at full scope: about 8.5M** (range 8.2M to 8.6M before the run-count error). Tranche 2 as approved is 8.17M, so engineering alone already exceeds it. Add the cadence line (1.49M) and the quality line (about 9.2M at full scope, 6.3M minimum), and T2 comes to **about 19.2M (16.3M at the quality minimum)**, against the stop rule's 10.2M. Re-basing the stop rule is the portfolio-manager's and the founder's call. Tokens still do not bind. Review capacity and the privacy reviewer do.

## 1. What changed since 10-15

| Item | 10-15 plan | Now | Effect |
|---|---|---|---|
| F-01 | due 10-23 | decided 10-15 | half the slip rule met |
| Auth spike | done by 10-22 | local part passed 10-16. The preview part (Q8, Q12, Q13, Q15) waits on `fra1` (W-1149) and a founder-approved preview | ahead, except the preview |
| Privacy first read | before 10-26 | done 10-16, conditional pass, M1 to M6 before merge, G1 to G6 before real email | the largest single risk in the 10-15 note is retired |
| A1 (W-946) | merged about 10-30 | **applied 0d76ae1, 10-16** (*measured* on 10-15: first load 230 KB gzip, 0.89 s) | Q5 headroom exists now. `accounts` must rebase onto it (C9 re-measure) |
| Scope | cut (no ads, share links only) | full: ads, swap, challenges | +1.27M engineering and about 9 quality runs for the swap, plus the ad slot's 0.53M and 1.4M back in |
| `fra1` | assumed in code | `preferredRegion` does nothing for Node functions. Deploy config needed (my Ruling 3) | one platform run, one founder-approved preview |

## 2. Workstream figures (T2, the 10-15 units)

Only rows that changed are shown. The rest are as in the 10-15 note §2.

| Workstream | Runs → tokens | Change from 10-15 | On the critical path? |
|---|---|---|---|
| Auth and progress | 28 runs → 2.46M as before. M1 to M6 fit in the two fix runs already counted. The spike's code may save about 2 code runs (0.22M) if it merges as written. I do not count that saving yet | 0 | **Yes** |
| Infra and readiness | 1.61M − A1 (0.22M, already spent outside T2) + `fra1` (1 platform run + 1 release run, 0.15M) → **1.54M** | −0.07M | A1 is done. `fra1` is on the path (before any accounts-on preview) |
| Light social: share links | 6 runs → 0.50M | 0 | No |
| **Light social: prediction swap (PRD-003)** | EDD 2 runs (0.22M) + 4 code (0.44M) + 1 fix (0.11M) + 2 PE (EDD and code, 0.14M) + 3 privacy (0.225M) + 1 readiness (0.081M, new stored data path) + 2 QA (0.054M) = 15 runs → **1.27M** | +1.27M | **It leans on it.** It is built on accounts (16+ band, account view, migration 002), so its code cannot start before accounts merge. It shares the privacy reviewer and me with the critical path |
| Ad slot (house cards) | 7 runs → 0.53M | back in | No, but F-17 (10-23), F-18, F-20, W-891, W-893, W-894 and a privacy ruling come into the window |
| Mastery and challenges | 1.04M (challenges about 0.40M of it, 3 code + 1 fix + QA) | 0 | Mastery yes. Challenges no |
| **Engineering T2 total** | **about 8.5M** (7.27 − 0.07 + 1.27). Without the swap 7.2M, without the swap and the ad slot 6.7M | +1.2M | |

The quality line (evaluation steward, quality-bar §3) already assumed six surfaces including ads and social, so full scope means its 9.2M figure. Cutting the swap removes about 9 runs (about 1.4M), and cutting the ad slot removes about 9 more (about 1.4M).

## 3. The binding constraint, counted

Between 10-26 and 11-09, full scope asks for the following (estimates):
- **Principal-engineer reviews: about 11.** EDD-008 approval, the accounts merge pass, EDD-009 (in two parts), W-1131 EDD, the swap code, W-893 ads engineering, personalization code, two auth and progress code reviews, and the readiness co-reads. That is one about every 1.4 days, on top of everything else. Challenges and the ad slot's card are tier 1 and need **no** engineering review. I will not add one.
- **Privacy-reviewer runs: about 9.** The M1 to M6 re-read, `db-deletion-check` on a preview, the data inventory, the beacon ruling, the PRD-003 read after F-26, the W-1131 schema read, the swap's P4.3 evidence, the ad-slot ruling, and the legal drafts with counsel. All of it runs through one reviewer, and five of the nine are on or beside the accounts path (FL-06).
- **Builder runs in 10-28 to 11-06: about 33.** Auth and progress UI and the rest about 10, mastery and personalization about 7, share links 3, ad slot 4, swap 5, challenges 4. Three builder slots serve the whole company. **This is the week the full scope does not fit.** Something drops on 11-06, and the cut order says what, in advance.

## 4. Odds

| Outcome | 10-15 figure | Now | What moves it |
|---|---|---|---|
| Go/no-go held on 11-23 (a passing RC with whatever survives the cuts) | 25% full / 60% cut | **about 50%** | the 11-06 cuts honoured on the day. EDD-008 by 10-28. Builder slots in the week of 10-28 |
| Launch on 11-30 | n/a | **about 45%** | the go/no-go, and the founder's launch-week deploy approvals |
| Go/no-go held if the swap is cut now | n/a | about 60% | |
| Go/no-go held if the swap and the ad slot are cut now | 60% | about 65% | |
| Everything in scope ships 11-30 | 25% | **about 3%** | below the weakest surface (the swap) and above the plain product of the rows below (about 1%), because the surfaces rise and fall together with builder capacity |

Each surface, the chance it is in the release build (estimates):

| Surface | Chance | The weakest link |
|---|---|---|
| Auth, progress, legal, infra, mastery state | about 70% (this is mostly the go/no-go figure) | EDD-008 by 10-28; F-25 counsel for P1.7 and G1 before real email |
| Share links | about 85% | a builder slot. It does not depend on F-26 |
| Personalization switched on | about 50% | F-19 (AMD-008) by 10-30; F-08 brief not on disk |
| Challenges | about 45% | builder slots 10-30 to 11-05; the experiment registered by 10-31; lists on 11-04 (fixture until then) |
| Ad slot | about 30% | F-17 yes on 10-23; F-18 Pro; W-891 and W-893 by 10-29; the experiment's guardrails |
| Prediction swap | about 7% | F-26 by 10-30 (I put it at 50%) × the M5 reading for it (70%) × feature-complete by 11-06 after an EDD approved 10-31 (30%) × P4.3 pass on 11-09 (70%) |

## 5. Cut order (full scope)

1. **The prediction swap, first.** It has the most outside conditions (F-26, the founder's "light social" answer, the M5 reading, three privacy runs, P4.3). It is built on accounts, so it competes for the same week, builder and reviewers as the critical path. It is also the only cut surface with stored data, so it carries a readiness record. Its 11-06 cut stands. I would take it earlier: **if the founder's answer at the 10-23 review to "is the swap what you meant?" is no, cut it that day** and spend nothing on W-1131.
2. **The ad slot.** The founder has accepted its four decisions as a cost, so it moves from first to second. It has no stored data, no accounts dependency and no `src/kit/` change, so it competes less with the critical path. **If F-17 is not yes on 10-23, it leaves scope that day.** I propose it gets the same pre-declared line as the others: feature-complete on a preview by **11-06**, or release 2. That line is head-of-strategic-initiatives' to propose and the founder's to accept.
3. **Challenges.** The 11-06 cut stands as ruled. They are cheap, tier 1 and built on mastery, so they go after the two surfaces with outside dependencies.
4. **Share links** are never cut by hand. They are the release's social in every case (P4.2).
5. **Personalization** is never cut by hand. It switches off if W-906 or F-19 misses (quality bar §4).

Never cut: auth with history kept, progress, legal, infra, mastery state.

## 6. Latest starts

| Work | Must be true by | Latest start | Recommended | Why |
|---|---|---|---|---|
| **Swap EDD (W-1131)**, growth-designer with me | EDD approved **10-31** (PRD-003 proposes 11-02) | **10-27** (draft, review and privacy read, revision: about 4 days) | **10-23**, as a low-cost round-2 draft, after the founder hears the "light social" question | Swap code can start only after accounts merge (about 10-29 to 10-30). Five build runs plus a preview by 11-06 leave no room for an 11-02 approval: P(feature-complete \| approved 11-02) is about 15%, against 30% at 10-31. Starting on 10-23 also keeps my W-1131 review out of the 10-28 and 10-30 approvals. **Sunk cost if F-26 is no:** about 0.37M (two drafting runs, my review, one privacy read) |
| **Challenges build** (PRD-004 R1 to R11), platform-engineer | feature-complete on a preview **11-06** | **11-01** (3 code + 1 fix, preview 11-06) | **10-30**, the day the M1 table is approved | It needs the M1 table (EDD-009 mastery half) and the experiment registered before any build run, so the registration must land by **10-31**. It uses a fixture `content/challenges.json` until the category managers' lists land on 11-04 |
| **Ad slot build** | feature-complete on a preview 11-06 (proposed line) | **11-01** | 10-30 | F-17 on 10-23, W-891 rules and my W-893 review by 10-29, W-894 registered first |
| **`fra1` (W-1149)** | before any preview with accounts on | **10-22** | round 2 | the proof preview runs with accounts **off** (Ruling 3, condition 3), so it can run before M1 to M6 land |

### A design input for W-1131, found while estimating
PRD-003 R2 reads the sealed prediction from server progress "if EDD-008 stores the predicted option". **It does not.** EDD-008 stores `predicted_correctly` only, and the privacy review's P3.1 pass rests on "no option". The fallback is the local event log, and `track()` in `src/kit/progress.ts` keeps only the **last 500 events** (`log.slice(-500)`) in one browser. So the "Swap predictions" control can appear only on lessons played recently on the sender's own browser. Storing the option on the server is a new field that needs a privacy ruling. **W-1131 should take the smaller design:** show the control only where the local log has the first `predict` event, and add no column. This needs no `src/kit/` change.

## 7. Do 10-28 and 10-30 still hold?

**EDD-008 approved 10-28: holds, about 75%.** What approval needs, and what it does not:
- Needs: M1 to M6 on `accounts` (run 1, about 1 builder run), the EDD text corrected (O2; §10 region line "intended, not yet in place"), the privacy reviewer's re-read of the diff, my rulings (on disk today), and a first-pass readiness gap list (run 4).
- Does not need: the preview evidence (`fra1` proof, Q8, Q12, Q13, Q15). That gates the merge's go-live conditions (G3) and any accounts-on preview, not the design. Merging needs approval plus readiness (W-966), the rebase onto main after A1 with `npm run verify`, and the C9 re-measure.
- **Risk:** run 1 waits for a builder slot. If it has not started by 10-22, I put 10-28 at about 50%. Then the slip rule triggers, and head-of-strategic-initiatives proposes the move.

**EDD-009 approved 10-30: holds for the mastery half, about 65%. The whole EDD only about 30%.**
- The mastery half (M1 definition table, progress shape, no streaks) has every input on disk. Run 5 drafts it now, and challenges and mastery need only this half.
- The personalization half needs the founder's F-08 brief, which does not exist, and F-19 (AMD-008) is due the same day.
- **Proposal:** approve EDD-009 in two parts. The mastery part on 10-30 is the slip-rule date. The personalization part is approved by **11-03** at the latest, or personalization ships switched off (quality bar §4). This changes nothing in the bar, only which half the date applies to.

## 8. Objections, including against me

| Objection | Raised by | Answer |
|---|---|---|
| "50% looks like good news after 25%. Did the estimate get softer?" | principal-engineer (against myself) | No. The 25% was the chance that full scope ships on the date, and that is now about 3%, worse. The 50% is a different question: whether the date holds once the founder's own pre-declared cuts are honoured. Both are in §4, so nobody has to pick the flattering one |
| "Cutting the swap first reverses the founder's 10-15 overrule." | anticipated from the founder's decision | It does not cut anything. The cut order says what goes first **if** something must go, and the 11-06 lines already decide when. Whether to cut now is head-of-strategic-initiatives' to propose and the founder's to decide (W-1122) |
| "A W-1131 draft before F-26 spends money on a feature that may not happen." | head-of-strategic-initiatives (dispatch, "What would make this batch wrong") | **Accepted as a cost, sized.** About 0.37M at most, and only if the founder does not say no on 10-23. The alternative is about a 15% chance of making 11-06 at all |
| "The ad slot also needs Vercel Pro, so it may be blocked by F-18, not by engineering." | principal-engineer | **Open,** with F-18 in run 6's packet. Hobby's terms are still unread from this host |
| "~33 builder runs in ten days is a guess." | principal-engineer | Agreed. It is a count of runs, not a measured throughput. The conclusion (something drops on 11-06) holds unless First Light gets all three slots for the whole week |

## 9. Board asks (for the chief of staff; I did not edit board.json)

1. **head-of-strategic-initiatives:** take §4 and §5 into the date and cut-order proposal (W-1122, D-40). Ask the founder on 10-23 whether the swap is what he meant. If yes, dispatch the W-1131 draft in round 2. Propose the ad slot's 11-06 line.
2. **growth-designer with principal-engineer:** W-1131 draft from 10-23 (latest 10-27), using the local-log design in §6.
3. **portfolio-manager:** engineering T2 at full scope is about 8.5M, and T2 with cadence and quality about 19.2M (16.3M at the quality minimum), for the 10-23 checkpoint and the stop-rule re-base.
4. **analytics-steward:** register the challenges experiment by 10-31 (after run 3's beacon ruling).
5. **learner-model-engineer:** EDD-009 in two parts, mastery first, for 10-30.
6. **principal-engineer:** close W-1121 against this note.
