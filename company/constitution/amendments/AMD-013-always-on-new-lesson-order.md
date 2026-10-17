# AMD-013: Always-on personalised new-lesson order on the All feed, behind the company flag; its cold start; and a pre-approved flag-off withdrawal

status: drafted, awaiting founder confirmation of wording
date: 2026-10-17
board: W-1585 (with W-1603 and W-1634)
proposed_by: founder. The substance is ratified in company/decisions/2026-10-17-founder-ratify-always-on-and-withdrawal.md ("Ratify both", then "Amendment + flag-off"). The founder clarified "always on, no switch" in company/decisions/2026-10-17-founder-personalization-milestone-delegation.md.
prepared_by: evaluation-steward (Hilde). I took number 013 because AMD-012 is the highest number on disk and nothing on disk reserves 013. The chief of staff may renumber.
takes effect: when the founder has read this text and confirms the wording. Per the founder's record, that is a confirmation of wording, not a new decision. Until then, Surface Value v1 stands, the privacy rulings stand as written, and **no agent acts on the pre-approved withdrawal in Part B**.
surface:
- Part A: `company/product/surface-value.md` (protected): the first bullet of "For the feed" (line 23) and the cold-start row of "Trade-offs we accept" (line 33). Riders on AMD-008 (proposed, not ratified): F1, F4, P4, P5 and its Rollback paragraph. The stated intent of the protected QA test "home feed opens honestly and starts" (`tests/qa/feed.spec.ts` lines 5-12). The file itself does not change.
- Part B: CLAUDE.md, the "Deploys need the founder's approval" hard rule, and `company/ops/runbook-deploy.md`. Neither file is on the protected list. The founder's record puts both lines in this amendment because a standing approval contradicts CLAUDE.md as written.
edited by this draft: nothing except this file. `surface-value.md`, `tests/qa/`, CLAUDE.md, `runbook-deploy.md`, AMD-008 and the amendments README index are unchanged.
inputs read: the two founder records above; company/constitution/amendments/README.md, AMD-008, AMD-012; company/product/surface-value.md v1; tests/qa/feed.spec.ts; batch 5 §11.2, §12 (G9-G11), §14.1, §14.3, §18.5 (company/personalization/batches/2026-10-17-batch-5.md); company/product/2026-10-17-personalised-order-copy-review.md §1-§3, §7; company/engineering/edd/EDD-010-personalised-new-lesson-order.md §5.3 (flag), §8.3 (withdrawal), §12 item 3 (flag value moves to `reachable-v3`); company/reviews/_privacy/2026-10-17-edd-010-design-read.md ("Which of my earlier conditions change", E8, E9, time to withdraw); company/reviews/_privacy/2026-10-16-personalization-model-inputs.md T3; company/ops/runbook-deploy.md; tools/deploy.mjs (SHOW_REVIEW pin, line 75); company/decisions/2026-10-15-founder-show-review.md; company/decisions/2026-10-12-feed-is-not-personalised.md. I checked the candidate's hash myself: `sha256sum company/personalization/policies/reachable-v3.ts` = `53981ab02a240900a5fa2c9c1d62a1e0c49a9add07a3a35c26656f0a8e01c195`, which matches the build note's freeze line.

## How to read this

There are two parts. **Part A** is the product rule: what the feed does, at cold start and after it, and what the protected texts say about it. **Part B** is the one pre-approved deploy. The founder ratified both. B is meaningful only while A is in force and the flag is on. A does not depend on B: without B, a withdrawal is an ordinary deploy that the founder approves.

"Default order" below means today's order: subject round-robin, published first, then lessons in review labelled as such (surface-value.md line 23; `src/lib/feed-index.ts` `interleave`; company/personalization/policies/default-order-rule.md).

"The candidate" means `company/personalization/policies/reachable-v3.ts`, sha256 `53981ab0…c195`, frozen (reachable-v3-build-note.md §7). Under M1 it is the only candidate that may ever be switched on (batch 5 §15.1, EDD-010 §12).

---

## Part A: the always-on new-lesson order

### A1. What changes in surface-value.md (exact replacement text)

**Line 23 now reads:**
> - Order is subject round-robin, published first, then lessons in review, labelled as such. It is not personalised and it says so.

**Replace it with these three bullets:**
> - The default order is subject round-robin, published first, then lessons in review, labelled as such. Every subject chip shows it, and the All feed shows it when the company flag is off. Where the default order is shown, the feed says it is not personalised.
> - With the company build flag `NEXT_PUBLIC_NEW_LESSON_ORDER` on, the All feed's new lessons follow the frozen candidate named in AMD-013, for every learner. There is no learner switch. The flag is on only when its value is exactly that candidate's name (today `reachable-v3`). It is read once at build and is off in the repository. Inside the pilot subjects the candidate reorders pilot lessons among the slots the default order gives them. Every other lesson keeps its default slot. Due revisits still come first. Every card it moves says why, and the reason is true.
> - On a device with no history the order uses no learner data, and the feed says what its order is. With the flag on, a new device sees the candidate's own empty-history order: in the pilot subjects, lessons that build on fewer others come earlier, the same order on every new device. In that order a lesson in review can come before published ones, still labelled as in review. A different candidate, or a different cold-start behaviour, needs a further amendment.

**Line 33 (trade-off row) now reads:**
> | No personalisation at cold start | A less "magical" first minute | head-of-product |

**Replace it with these four rows:**
> | No learner data at cold start: a new device gets a fixed order, the same for everyone | A less "magical" first minute | head-of-product |
> | The All feed's new-lesson order is personalised for every learner, with no learner switch (founder, 2026-10-17) | A learner who dislikes the order cannot turn it off. The company flag and its withdrawal (AMD-013 Part B) are the only off | founder |
> | At cold start, with the flag on, lessons in review can come before published ones in the All feed | A learner may meet a labelled in-review lesson earlier than the default order would show it | head-of-product |
> | No live comparison group unless the founder decides one (O2) | The live effect is not measured. It is reported before/after, as description, never as cause | founder |

**Unchanged in surface-value.md:** "For a lesson" (1-5) and the engagement paragraph. "Revisits come before new lessons when due." "Nothing autoplays. There are no streaks and no guilt." The trade-off rows on predict-before-reveal and gates.

### A2. What it does at cold start (W-1603, batch 5 §14.1)

- With the flag on, a device with no history sees the candidate's `rank` order over the pilot dims with an empty history. **There is no cold-start wrapper** (vp-personalization, batch 5 §14.1). Any other cold-start behaviour, such as "default order until the first completion", would be a policy outside the hashed file, so it would need a new candidate or a further amendment.
- **It uses no learner data.** The order is a fixed function of the catalogue: pilot lessons that need fewer in-pilot prerequisite concepts come first, and ties fall back to the default order. It is byte-identical on every new device. It is byte-identical to v2's empty-history order (v3 build note test 39; EDD-010 T2 pins the 230-slug vector).
- **Where it applies:** the All feed only, and inside it only the pilot subjects (Probability and CS, 230 lessons). Non-pilot slots never move. The first card is pinned to the server-rendered default order (EDD-010 §5.4 step 4). Subject chips keep the default order with the flag on or off (head-of-product Q-H2, copy review §2). No copy may present a chip as an opt-out (privacy finding 3).
- **Measured** (head-of-product, copy review §3, on v3 and dims at 4a559d6): 229 of 230 pilot cards move. Same-subject neighbours in the first 60 cards go from 0 to 2, and across the whole feed from 47 to 80 of 946 positions.
- **Not scored.** Criterion 3b's episodes start from seeded histories, so the exact empty-history state is not a scored state. G reads curious-newcomer as the nearest scored case. G's record and the release note say so word for word (batch 5 §14.1 item 3). This amendment does not claim that 3b measured cold start.

### A3. Lessons in review before published ones at cold start (W-1634)

- **What happens:** in v3's empty-history order, the 8 pilot lessons in review sit at pilot positions 33, 187-190 and 224-226. In the default order they sit at 152 and 223-229. `weak-links-hold-it-together` (in review) comes ahead of 189 published pilot lessons, at about All-feed position 209 (copy review §3; batch 5 §18.5).
- **Which rule it breaks:** surface-value.md line 23 and AMD-008 F1, "published first, then lessons in review". A1 and the F1 rider in A4 change both, for the All feed with the flag on only.
- **Why it is accepted, not fixed:** it cannot be fixed in glue (batch 5 §12 G6). Taking review lessons out of the pilot dims would change the candidate's input, which makes it a new candidate, and none is left under M1 (§18.5). Head-of-product accepts it as a product experience because review lessons carry the "In review" label and the founder keeps them visible in production (company/decisions/2026-10-15-founder-show-review.md).
- **Measured at cold start only.** With history it has not been measured. personalization-eval reports a count in K7, reported only, not gating (§18.5).
- **What stays:** the "In review" label on every review card, and drafts never shown. Every chip, and the All feed with the flag off, still puts published lessons first.

### A4. Riders on AMD-008 (proposed, not ratified)

AMD-008 is a proposal. These riders are part of this amendment, so whichever of the two is ratified first, the other reads consistently. If AMD-008 is ratified, these lines replace its own. If it is never ratified, A1 alone governs. Every other AMD-008 rule is unchanged by this amendment: F2 and F3, P1-P3, M1-M8, A1-A10 and X1-X3.

- **F1 (replaces).** "The default order is subject round-robin, published first, then lessons in review labelled as such. Every subject chip shows it, and the All feed shows it with the company flag off. With the flag on, a fresh context's All feed shows the frozen candidate's empty-history order (Surface Value, as amended by AMD-013). That order uses no learner data, and in it lessons in review may come before published ones. *Test:* with the flag off, and on every chip with the flag on or off, the order equals the default function over the catalogue, card for card. With the flag on, two fresh contexts get the same All order, and its pilot slots equal the candidate's pinned empty-history vector (EDD-010 T2)."
- **F4 (replaces).** "The feed says what it is doing. With no history it says plainly that, on a new device, it knows nothing about the learner and is not 'for you', and it says what its order is. With the flag on, the All intro says in plain words that finishing lessons moves some new ones, and that a card that moved says so. It offers no control and implies none. *Test:* in a fresh context the intro contains the cold-start sentence (`tests/qa/feed.spec.ts`, unchanged). With the flag on, no intro sentence names a control or a setting, and every moved card renders its reason line (S1 tests)."
- **P4 (narrowed).** For the website's new-lesson order only, P4 reads: "The company is in control and says so honestly. There is no learner switch (founder, 2026-10-17). One company build flag turns the order off and returns the default order exactly, with no candidate code running. The flag is read at build only. There is no run-time, cookie, query-string or storage override, and the deploy script pins its value from the approved release (W-1604). No copy says or implies that a learner can turn the order off, set it, or that it follows their choices. Personalization never requires an account. *Test:* a flag-off build gives the default order byte for byte and does not contain the candidate module (EDD-010 T10, T22). A flag-on build has no switch element and reads no settings field. Anonymous and signed-in contexts with the same local history get the same order." **P4 as drafted (a learner control that turns personalization off) stays the rule for any other personalization surface**, for example stated subject picks or "less of this", if one is ever built.
- **P5 (narrowed).** For the website's new-lesson order only: the registered evidence is the frozen offline criterion (3b) and the G record, read by batch 5 §4 and §12, plus the W-1581 rollout registration with counters only. There is no default-order holdout arm unless the founder decides O2. In that case the live effect is reported as unmeasured. P5 is otherwise unchanged.
- **Rollback paragraph.** Replace "F1 and P4 guarantee that personalization off equals the v1 order" with "the company flag off gives the default order exactly (P4 as narrowed by AMD-013)".

### A5. Privacy rulings this lets lapse, and those that stay (privacy-reviewer's own re-ruling; recorded here, not decided here)

These rulings are not protected paths. privacy-reviewer has ruled on them, and this section records the result so the amendment states the whole change.
- **Lapses for the website's new-lesson order only, and only once this amendment takes effect:** T3 of company/reviews/_privacy/2026-10-16-personalization-model-inputs.md ("The off switch is as reachable for a teen as for anyone and works without an account"). privacy-reviewer wrote that it lapses by the founder's decision once W-1585 is ratified, and not before (design read, "Which of my earlier conditions change").
- **Moot for the website ordering, which reads no settings field:** D1, D2 and G3 of company/reviews/_privacy/2026-10-16-personalization-batch-reads.md. They stay in force for the settings API if it is ever built on.
- **Stay, and now carry more weight:** N1-N3 (computed, not stored), section 4 (no stored derived values), T1, T2, T4-T6, P3 (no traits, no comparison, no pressure), M3 (the estimate is never shown as a number or a trait), and E1-E14 of the EDD-010 design read. The ceiling on reason lines stays as privacy ruled it (no prediction tallies, no `pKnown`, no traits).

### A6. The protected QA intro test (W-1603)

**The test** (`tests/qa/feed.spec.ts` lines 5-12, "home feed opens honestly and starts"): at `/` in a fresh context, the intro card is visible and contains `not “for you”` (assertion message "cold start does not pretend to personalise"), and Start opens a lesson card.

**Its intent, restated (vp-personalization's proposal, batch 5 §14.1, supported by head-of-product, copy review §1):**
> With no history, the order uses no learner data, and the feed says what its order is.

**Does the test file change? No.** I make no edit to `tests/qa/`, and this amendment authorises none.
- Head-of-product's proposed All-feed intro with the flag on keeps "On a new device we know nothing about you, so this feed is not “for you”." That sentence is true at cold start, so the assertion still passes, and what it checks stays true (copy review §1, sentence I1).
- The chip intro ("…so this list is not “for you”.") also contains the phrase.

**What the test does not check (stated so nobody reads more into a green run than it proves):**
1. It checks one phrase. Today's flag-off copy ("It alternates subjects") and head-of-product's flag-on copy both contain it, so the test cannot tell the false flag-on sentence from the true one. batch 5 MR line 17 and the fact-checked copy (W-1579) catch that, not this test.
2. "The order uses no learner data" is checked outside `tests/qa/`: empty-history byte-identity (v3 test 39, EDD-010 T2), N3's forbidden-input invariance, and T10 and T22 for the flag. Those tests are not on the protected list.
3. `npm run qa` runs against a build of the repository, where the flag is off. The protected test sees the flag-on intro only if the build it runs against has the flag on. Whether the release's verify build carries the release's flag value is an open question below (Q3).

Gaps 2 and 3 mean the judge is softer than its stated intent. I do not fix that here. A new protected test needs its own side-by-side on a flag-on build, and no flag-on build exists on this branch (`src/lib/learner/` holds only `dims-index.generated.ts`). I propose it as a later QA amendment (open question Q4).

---

## Part B: the pre-approved flag-off withdrawal

### B1. The rule

The founder approves one kind of deploy in advance, the **flag-off withdrawal**. It is a production deploy of the exact source commit that is live in production, with the same `SHOW_REVIEW` value as the live deployment. The only difference is that `NEXT_PUBLIC_NEW_LESSON_ORDER` is off. **release-manager** runs it without asking the founder first, on a **privacy or child-safety trigger** (B2) and on no other. It then records the withdrawal and tells the founder at once (B4). **Every other deploy is unchanged and needs the founder's approval for that specific deploy**, including: turning the flag back on, `npx vercel rollback`, a withdrawal on any other G10 trigger, any `[deploy]` commit, any preview, and any deploy with any other change.

### B2. Triggers (only these)

Any role may raise a trigger by writing a trigger record (B4, item 1) that names one of the triggers below and cites its evidence (a file, a test run, or a URL with what was seen):
- **Privacy.** The live personalised order, or its copy, does one of the following: writes or fetches anything N1 forbids (beyond today's); stores a derived value (D20, section 4); reads an input outside the privacy ruling (N3, V7); puts order or reason state into the DOM, the URL or storage (E1, E2); or lets a learner-facing line exceed the privacy ceiling (a trait, a number, a prediction tally, or a control or choice it implies). privacy-reviewer withdrawing or changing its W-1586 ruling so that a G9 condition no longer holds is also a privacy trigger.
- **Child safety.** A finding that the live order or its copy exposes a learner who may be 13 to 15 to pressure, comparison, a trait or a judgement about them (privacy P3, M3, T3-T6; AMD-008 M2-M4). Counsel's answer (W-1587, W-1612) being withdrawn or changed so that the always-on order may not be applied to 13-15 year olds is also a child-safety trigger.

These G10 triggers do **not** qualify, so a withdrawal on them is asked of the founder as usual: an evidence change (a corrected 3b readout, an R4 difference), a breached guardrail counter, or a moved card without a true reason line that is not a privacy or child-safety finding.

release-manager checks only that the record names a listed trigger and cites evidence. It does not judge the finding first, because the delay is the exposure window (privacy design read, "Time to withdraw"). privacy-reviewer reads the finding afterwards. If privacy-reviewer finds it unfounded, turning the flag back on is an ordinary founder-approved deploy.

### B3. Exact replacement lines (not applied; for the founder's confirmation)

**CLAUDE.md, "Hard rules". Current line:**
> - **Deploys need the founder's approval, every time.** Never put `[deploy]` in a commit message, run `npm run deploy`, or trigger the deploy workflow unless the founder has approved that specific deploy in this conversation. Vercel's free plan allows 100 deployments a day; `vercel.json` builds only `[deploy]` commits (company/ops/runbook-deploy.md).

**Replacement:**
> - **Deploys need the founder's approval, every time.** Never put `[deploy]` in a commit message, run `npm run deploy`, or trigger the deploy workflow unless the founder has approved that specific deploy in this conversation. **One exception, pre-approved by the founder (AMD-013):** on a privacy or child-safety trigger, release-manager may run the flag-off withdrawal without asking first. That deploy is the live production commit rebuilt with `NEXT_PUBLIC_NEW_LESSON_ORDER` off and nothing else changed. release-manager then records it and tells the founder at once (company/ops/runbook-deploy.md, "Pre-approved flag-off withdrawal"). No other deploy, and no other role, is pre-approved. Vercel's free plan allows 100 deployments a day; `vercel.json` builds only `[deploy]` commits (company/ops/runbook-deploy.md).

**company/ops/runbook-deploy.md.** In the last paragraph ("Founder approval (2026-10-14)"), after "ask first, then deploy once.", add: "The only exception is the pre-approved flag-off withdrawal below (AMD-013)." Then add this section at the end of the file:

> ## Pre-approved flag-off withdrawal (AMD-013)
>
> The founder pre-approved one deploy (company/decisions/2026-10-17-founder-ratify-always-on-and-withdrawal.md; AMD-013 Part B). Nothing else in this runbook is pre-approved.
>
> **What:** a production deploy of the exact source commit that is live, with the same `SHOW_REVIEW` value as the live deployment and `NEXT_PUBLIC_NEW_LESSON_ORDER` off. Nothing else changes: no new commit, no `[deploy]` commit, no other variable.
>
> **When:** only on a privacy or child-safety trigger as AMD-013 B2 lists them, raised in a trigger record at `company/ops/withdrawals/<UTC timestamp>-new-lesson-order.md` that names the trigger and cites its evidence. Any other reason, including the other G10 triggers, is an ordinary deploy: ask the founder first.
>
> **Who:** release-manager only. If release-manager is not running, the chief of staff dispatches release-manager with the trigger record. No other role runs it.
>
> **Steps:**
> 1. Read the latest production record in `company/ops/deployments/`, and take its source commit and its `SHOW_REVIEW` value. Check out that commit, clean.
> 2. Run `npm run deploy -- production` with the new-lesson-order flag set off by the deploy script's pin (W-1604). Do not set it by hand in the Vercel dashboard.
> 3. Check, before calling it done: the new deployment record names the same source commit and the same `SHOW_REVIEW` value as the live one; the build log shows `new-lesson-order: off`; the smoke test passes (`QA_BASE_URL=https://<deployment> npx playwright test tests/qa/feed.spec.ts`); and the All feed at `/` in a fresh context shows the default order.
> 4. If the deploy or a check fails, stop. Production stays as it was (staged promotion), and every further step, including a retry or `npx vercel rollback`, needs the founder's approval.
>
> **Record and tell:** complete the trigger record with the deploy record path, the smoke result and the time it took effect. Add a `company/ops/releases.json` entry with `approved_by` set to "founder, standing pre-approval, AMD-013 Part B" and the trigger record's path. Add a priority-1 `deploy` item to `company/ops/founder-inbox.json`. Make the withdrawal the first line of your report and of the next progress handoff. Then open a COE.
>
> **Turning it back on** is a new release and needs the founder's approval for that deploy.

### B4. What release-manager must leave on disk, every time

1. The trigger record (`company/ops/withdrawals/…`): the trigger (by its B2 name), the evidence, who raised it, the time.
2. The deploy record that `tools/deploy.mjs` writes in `company/ops/deployments/`.
3. The smoke result and the default-order check.
4. The releases.json entry, the founder-inbox item and the handoff line.

---

## What does not change (both parts)

- **The website release still waits on all of these:** counsel's answer (W-1587, W-1612; G9); privacy-reviewer's final reads of the code, the rendered page and the copy (W-1586, E1-E14, V1-V15); the G record GO (batch 5 §4, §12); the MR checklist, including lines 10, 15, 16 and 17; and a **founder-approved deploy** that turns the flag on. This amendment authorises no deploy, and it does not turn the flag on.
- If counsel requires a learner control or an objection right, the website part is NO-GO until the founder decides (G9). Nobody adds a switch on their own, and this amendment would then need revising.
- Revisits, drafts never shown, the "In review" label, every chip's order, the claims rule, the reason-line truth rule (G7), the no-harm gate, and every company gate are unchanged.
- The HQ part of M1 is unaffected.

## Claimed benefit

The protected objective will describe the product that ships, so "it is not personalised and it says so" does not sit in the constitution beside a feed that personalises. Before any learner meets them, the two things nobody chose and the founder now accepts (the cold-start order, and review lessons before published ones) are written where they can be argued with. The QA intro test keeps an intent that stays true with the flag on. The withdrawal on a privacy or child-safety trigger loses the wait for the founder's reply, which is the exposure window, and gains no other power.

## What it removes

- Surface Value v1's "It is not personalised and it says so", for the All feed with the flag on.
- "Published first" as a guarantee for the All feed at cold start with the flag on (A3).
- The property that every learner sees the same order (for the All feed, flag on).
- The learner's off switch for the website's new-lesson order (AMD-008 P4 as drafted; privacy T3 for this surface).
- A default-order holdout (AMD-008 P5) for this surface, unless the founder decides O2.
- For one named deploy only: the founder's approval before it runs. The founder is told afterwards instead.

## Prediction and test

- **prediction:** (1) The first flag-on release candidate passes `tests/qa/feed.spec.ts` unchanged, in a build with the flag on and in one with it off. (2) Every fresh-context All feed on the flag-on build has the same order, equal to the pinned empty-history vector on pilot slots and to the default order elsewhere. (3) Nobody has to ask the evaluation steward what the restated intent means for a specific build. (4) If Part B is ever used, the withdrawal takes effect within one remote build (about ten minutes plus the next page load). The record shows the same commit and the same `SHOW_REVIEW` as the live deployment, and the founder-inbox item exists within the same run.
- **would_be_wrong_if:** a flag-on build shows a different order in two fresh contexts (cold start uses something learner- or device-specific); the protected intro test fails on a build whose intro is true (the test is out of date, which needs a QA amendment rather than a copy workaround); a withdrawal deploy differs from the live one in anything but the flag; Part B is used for a reason outside B2; or the founder learns of a withdrawal from anything other than the inbox item or the report.
- **side_by_side (Article 3.4):** not possible today, because no flag-on build exists on this branch. Owed before the flag-on release: run `feed.spec.ts` against a flag-off build and a flag-on build of the same commit, and add the fresh-context identity check from prediction (2). Record every disagreement in the release record. Owners: qa-tester, with personalization-engineer for the flag-on build. For Part B, release-manager writes a dry run with `npm run deploy -- production --dry-run` once W-1604 lands, and must show the plan sets the flag off and changes nothing else.

## Does it change how the proposer is judged?

- **The proposer is the founder,** who is not judged by these texts. The evaluation steward drafts and presents this amendment and abstains from deciding it, as its onboarding doc requires.
- **vp-personalization and personalization-engineer** are judged against surface-value line 23, AMD-008 F1 and the intro test, and the cold-start text came from vp-personalization. Neither may be the sole approver of Part A, and neither is.
- **release-manager** gains a power in Part B, so it is not a deciding approver for Part B.
- **Board seats (Article 3.2):** founder (confirms wording, decides), head-of-product (owner of the default order and the cold-start trade-off rows), evaluation-steward (presents, abstains), and the affected roles: vp-personalization (Part A, non-deciding), privacy-reviewer (A5 and B2), release-manager (Part B, non-deciding).

## Rollback

- **Part A:** revert surface-value.md to v1 under its own `Amendment: AMD-<n>` trailer. Behaviour needs no code revert. A flag-off build gives the default order exactly (EDD-010 T10), and nothing is stored on any device (N1), so there is nothing to clean up.
- **Part B:** remove the CLAUDE.md sentence and the runbook section, recording the founder's withdrawal of the pre-approval. Until that commit lands, the founder telling release-manager "no standing withdrawals" in conversation suspends Part B.

## Merge mechanics (after the founder confirms the wording; not before)

1. Set this file's status line to `status: ratified <date>` with the founder's words, and add the README index row.
2. In one commit with `S3_AMENDMENT=AMD-013` set and `Amendment: AMD-013` in the message: surface-value.md lines 23 and 33 exactly as in A1; the CLAUDE.md line and the runbook lines exactly as in B3. Recorded by chief-of-staff, as with AMD-012. `tests/qa/` is not touched.
3. The AMD-008 riders (A4) take effect only when AMD-008 is ratified. When that happens, the evaluation steward folds them into AMD-008's text before it is applied.
4. head-of-product marks company/decisions/2026-10-12-feed-is-not-personalised.md superseded for the All feed (copy review §7). That record is theirs.

---

## Objections

Each objection is answered with what happened to it.

1. **chief-of-staff (founder record): a standing deploy approval weakens "every deploy needs the founder".** *Answer:* narrowed further in this text. It covers one deploy that only removes the feature: the same commit, the same `SHOW_REVIEW`, the flag off. It applies on two named triggers, and B2 lists the G10 triggers it excludes. Rollback, retries and turning the flag back on are not covered. Only release-manager runs it, and the founder is told at once by the inbox item and the report.
2. **privacy-reviewer (design read, Q-P4): a company flag is not a learner control, and counsel has not said it is enough.** *Answer:* accepted. Nothing here calls the flag a learner control, and A4's P4 forbids copy that implies one. The release still waits on counsel (G9). If counsel requires a control, the website part is NO-GO and this amendment is revised.
3. **vp-personalization (batch 5 §11.4 O2): with always-on there is no holdout, so no live result can show cause.** *Answer:* written into the trade-offs (A1) and P5 (A4). It stays open as the founder's O2 question. This amendment does not decide it.
4. **vp-personalization (O5): with no way out, a wrong reason line or a missed harm matters more for 13-15 year olds.** *Answer:* §12's stricter G rules, the reason-line truth rule, counsel before release, and Part B, which shortens the exposure window on exactly these triggers.
5. **personalization-engineer (EDD-010 §11 O-S1): the cold-start order is a consequence nobody chose.** *Answer:* vp-personalization chose it (§14.1), head-of-product accepted it as a product experience (copy review §3, §7), and the founder accepts it by ratifying this text (A2). Closed, and recorded here.
6. **head-of-product (copy review §3): review lessons before published ones changes a protected line.** *Answer:* stated in A1, A3 and the F1 rider. It was measured at cold start only, and K7 reports it as a reported-only count with history.
7. **evaluation-steward (mine): the protected intro test checks one phrase, so its restated intent is wider than what it can catch.** Today's false flag-off sentence passes it too, and the "no learner data" half lives in unprotected tests. *Answer:* not fixed here, on purpose. Head-of-product's ruling is that the file need not change. A new protected test needs a side-by-side on a flag-on build, and none exists. The gaps are written in A6 so a green run is not over-read, and a follow-up QA amendment is open (Q4).
8. **evaluation-steward (mine, failure mode "Freezing the evaluator forever"): naming the candidate and its cold-start behaviour in the protected objective means any candidate change needs an amendment.** *Answer:* accepted as the cost, and wanted. The founder ratified this candidate's specific behaviour (review before published), and under M1 there is no further candidate anyway (G6). For the next candidate, an amendment is the right weight.
9. **evaluation-steward (mine): riders on a proposed, unratified amendment (AMD-008) are unusual.** *Answer:* without them, ratifying AMD-008 later would bring back an off switch (P4) and a holdout (P5) that the founder has ruled out for this surface. The riders are conditional and severable (A4, merge step 3).

## Open questions (none blocks the founder's confirmation of wording; each has an owner)

- **Q1 (founder):** B1 covers only the flag-off build. Should `npx vercel rollback` (faster, with no build) also be pre-approved on the same triggers? As drafted, it is not.
- **Q2 (release-manager with head-of-product):** `tools/deploy.mjs` line 75 pins `SHOW_REVIEW=off` for production, but the founder's decision of 2026-10-15 keeps review lessons visible in production. A3 matters only where review lessons are shown. Whether the pilot dims change with `SHOW_REVIEW` (and so whether the candidate's input changes) is for personalization-eval and vp-personalization. The withdrawal copies whatever the live value is.
- **Q3 (release-manager with platform-engineer, W-1604):** does the release's `npm run verify` build carry the release's flag value? If not, the protected intro test never sees the flag-on intro before it ships (A6 gap 3). Part B also depends on W-1604, but flag-on cannot ship without it (EDD-010 C12), so it is in place whenever Part B could apply.
- **Q4 (evaluation-steward, later):** a QA amendment that adds a flag-on cold-start test to `tests/qa/` (fresh-context identity, and intro truth for each filter). Drafted only after a flag-on build exists, with its own side-by-side.
- **Q5 (chief of staff):** who reviews a child-safety finding after the event? There is no child-safety reviewer role. As drafted, privacy-reviewer reads every trigger afterwards.

## Decision (constitutional review board)

The founder confirms the wording. Seats: head-of-product, privacy-reviewer (A5, B2), vp-personalization (Part A, non-deciding), release-manager (Part B, non-deciding), evaluation-steward (presents, abstains).

**Question for the founder:** "Is this the wording of what you ratified? Part A: the All feed's new-lesson order is personalised for every learner with no switch, behind the company flag, which is on only at `reachable-v3`. A new device gets a fixed order that uses no learner data (fewer prerequisites first), and in it review lessons can come before published ones. The QA intro test keeps its file and now means 'with no history, the order uses no learner data, and the feed says what its order is'. Part B: release-manager may, without asking you, redeploy the live commit with the flag off on a privacy or child-safety trigger, and tells you at once. Every other deploy still needs you. Yes, or what to change."

| Part | Decision | By | Date |
|---|---|---|---|
| A (surface-value, AMD-008 riders, QA intent) | | | |
| B (pre-approved flag-off withdrawal; CLAUDE.md and runbook lines) | | | |
