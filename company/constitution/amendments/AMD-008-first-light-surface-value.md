# AMD-008: Surface Value v2 for First Light (rule-based personalization, mastery without streaks or guilt, one labelled ad slot)

status: proposed (draft, not applied). Surface Value v1 stays in force until the founder ratifies.
date: 2026-10-15
board: W-906 · founder inbox: F-19 (and F-17 for part A)
proposed_by: founder (decision company/decisions/2026-10-15-founder-first-light.md, item 6: "One amendment covers rule-based personalization, mastery-based gamification and the ad slot. Drafted by the evaluation-steward and ratified by the founder.")
prepared_by: evaluation-steward (Hilde). Number 008 taken because 003, 004 and 007 are reserved and 005, 006 are drafted; the chief of staff may renumber.
surface: `company/product/surface-value.md` (protected), sections "For the feed" and "Trade-offs we accept", plus three new sections. Nothing else. The tests that encode it are a separate amendment (AMD-FL-B, `tests/qa/surfaces/*.spec.ts` and the rewrite of the feed.spec.ts test "cold start does not pretend to personalise"), written against the ratified text.
inputs read: surface-value.md v1; company/marketing/2026-10-15-monetization-ads-proposal.md (rules 1 to 8 and amendment points a to d); company/decisions/2026-10-12-feed-is-not-personalised.md (head-of-product); company/initiatives/first-light/quality-bar.md (Q1.6, Q1.7, Q1.9, Q4.2); company/personalization/README.md; company/roles/growth-designer.md; founder-inbox F-01, F-17, F-19; board W-891, W-892, W-895.

Nothing below has been applied. `company/product/surface-value.md` is unchanged.

## How to read this

Each rule has an ID (P = personalization, M = mastery, A = ad slot, X = all three), one sentence of rule, and the **test** that decides it. A rule without a test that can fail is not in this draft. AMD-FL-B turns each test into a spec, so a builder's reading of the rule never becomes the rule.

The three parts are **severable**: the founder can ratify P, M and A separately. Part A is operative only if F-17 is decided (a); if ads slip to release 2 (decision item 4), A can still be ratified now as the conditions for any future slot, or held.

"Learner data" below means anything recorded about a learner or their device: history, attempts, identifiers, device, location finer than country.

## The changes (proposed text of Surface Value v2)

### For the feed (replaces the v1 section)

- **F1.** The default order is subject round-robin, published first, then lessons in review labelled as such (First Light launches with published lessons only, decision item 7). The default is what every learner with no history sees, and what anyone sees with personalization off. *Test:* with personalization off, and for a fresh anonymous context, the feed order equals the default function over the catalog, card for card.
- **F2.** Due revisits come before new lessons. No personalization rule, mastery feature or ad card may push a due revisit later. *Test:* seeded history with k due revisits; the first k lesson cards are those revisits in every mode (default, personalized, ads on).
- **F3.** Nothing autoplays (lessons, ads, sound, video, carousels). *Test:* no media element plays and no card advances without a learner action, on 3 seeded feeds.
- **F4.** The feed says what it is doing. With no history it says plainly that it knows nothing about the learner yet and is not "for you" (the v1 promise, kept for cold start). With history and personalization on, it says which rules are on, in one line, with the control to turn them off. *Test:* intro text in a fresh context contains the cold-start sentence; in a seeded context it names the active rules and the off control exists and works.

### For personalization (new)

- **P1. Rules, not a model.** The feed may reorder lessons only by rules written in a published rule list (owner: personalization-lead; each rule added or changed by a head-of-product decision record). Each rule is a deterministic function of the permitted inputs (P2). No learned ranking model in First Light; one needs a further amendment. *Test:* replay a learner's event log through the published rule list; the replayed order equals the served order, card for card, on 3 seeded histories.
- **P2. Permitted inputs only.** A rule may read: the learner's own completions, predictions (made or not, right or wrong), revisit recall results, due revisits, choices the learner states (subjects picked, "less of this"), and the curriculum's prerequisite and concept graph. It may **not** read: engagement (dwell, swipes, scroll speed, shares, session length or count), anything about ads (impressions, taps, revenue), demographics, device, or location finer than country. *Test:* two seeded histories identical in permitted inputs and different in every forbidden input produce the same order; a code audit of the rule inputs lists only P2 fields.
- **P3. Every moved card says why.** A card placed differently from the default shows a reason that names the rule that fired, in learner language ("Because you got X right, next is Y, which builds on it"). The reason is a learner-facing claim and must be true. *Test:* 0 cards whose shown reason disagrees with the rule log (quality bar Q1.6); 0 moved cards without a reason.
- **P4. The learner is in control.** One control, reachable from the feed, turns personalization off and returns the default order (F1) at once, and the choice persists. Personalization never requires an account: it works from anonymous history and signing up only keeps it. *Test:* toggle off, order equals F1; reload, still off; an anonymous context with history gets the same rules as a signed-in one with the same history.
- **P5. Personalize for recall and understanding.** A rule is kept only if its registered experiment shows it does not lower Surface Value #4 (first spaced-revisit recall) or #5 (prediction to reveal completion) against a default-order holdout. Engagement is reported, never a success measure for a rule. *Test:* every rule in the list links an experiment in company/experiments/ with a prediction committed before data and a holdout arm; a rule without one is off in the release build.

### For mastery and challenges (new)

- **M1. Mastery is computed from learning evidence only.** A learner's state for a concept is a pure function of three event types: reveal reached (completion), prediction made, and spaced-revisit recall (right or wrong). Default states, until the learner-model engineer publishes a definition table before AMD-FL-B: *seen* (reveal reached), *recalled* (first spaced revisit right), *held* (right on two spaced revisits at least 7 days apart). Opening the app, dwell, swipes, shares, social actions and ads give no mastery credit. *Test:* replay seeded event logs; state equals the table's function; adding any non-permitted event changes nothing.
- **M2. No streaks.** No count or display of consecutive days, sessions or lessons, anywhere: feed, map, account, share images, notifications or emails. "All due revisits done" may be shown as today's state; it may not be counted across days. *Test:* no stored or rendered counter of consecutive periods; banned-phrase scan (M4) over every surface string.
- **M3. No loss, no guilt.** A state goes down only when a recall is answered wrong, never because time passed or the learner was away. A due revisit is described neutrally ("ready to revisit"), never as something being lost. Nothing counts down. *Test:* a seeded learner away for 60 days keeps every state; no timer element on any mastery or challenge surface; copy scan (M4).
- **M4. Banned phrases.** No surface string (UI, notification, email, share text, house-ad creative) contains, in any case or inflection: "streak", "in a row", "don't lose", "you'll lose", "you lost", "losing your", "keep it alive", "don't break", "you missed", "we miss you", "falling behind", "last chance", "hurry", "before it's too late", "only N left", "ahead of you" (about other learners), "don't let", "you haven't" (as a reproach). The list is extended (never shortened) by the learner-evaluator's findings and by translation into each shipped language. *Test:* the string scan over the release build and all copy files: 0 hits.
- **M5. No ranking of people, no speed.** No points, scores or leaderboards for speed or volume, and no comparison of a learner with other learners. A learner is compared only with their own past. *Test:* no leaderboard or rank element; no rendered number derived from other learners' data on any mastery surface.
- **M6. Challenges keep the lesson contract.** A challenge is a lesson or a sequence of lessons: a prediction before every reveal, no timer on the prediction, no reward for answering fast. *Test:* every challenge passes the predict-before-reveal checks of the QA contract; 0 challenges whose reveal is reachable without a prediction (quality bar Q1.7).
- **M7. Mastery copy is a claim.** A mastery message says what was measured ("You recalled this 9 days later"), never more ("You've mastered physics"). It is recorded and verified like any learner-facing sentence. *Test:* every mastery string is in the claims register with an address (quality bar Q3.4); 0 strings that assert learning beyond the measured event.
- **M8. Nothing nags.** Reminders are off by default, opt-in, only about due revisits, at most one a day, and fall under M4. *Test:* a fresh account receives 0 reminders; with opt-in, at most 1 per day over a 14-day seeded script.

### For the ad slot (new; operative only if F-17 is (a))

- **A1. Never inside a lesson.** No ad on the stage, controls, reveal, "Does it hold up?" line, claims or sources sheet, or inside the lesson frame; `src/kit/Lesson.tsx` stays ad-free. *Test:* DOM audit of every lesson card and lesson page: 0 ad elements.
- **A2. Only between lessons, after one.** An ad card appears only after the learner has moved past a lesson (finished or swiped on); never between a prediction and its reveal, never inside a multi-card sequence. *Test:* on 3 seeded feeds, every ad card's predecessor is a whole lesson and its successor is a lesson's first card.
- **A3. Labelled and separate.** A full-height feed card labelled "Ad" (final wording per head-of-product's W-891 ruling), visually distinct from a lesson, with no prediction buttons, no "claims checked" mark and nothing that imitates a lesson. It can be swiped past at once: no countdown, no interstitial, no "skip in 5 s". *Test:* label present and readable (contrast per quality bar Q2.5); no lesson controls inside the card; a swipe passes it immediately.
- **A4. Never first, never next to a revisit.** No ad card is the first card of a session, and none sits directly before or after a due revisit. *Test:* seeded feeds with due revisits: 0 violations.
- **A5. Static.** Text and one still image. No video, animation, sound or autoplay. *Test:* the ad card contains no media, animated image or CSS animation.
- **A6. Capped, and the cap only goes down.** At most 1 ad card per 6 lessons, and none on a lesson's own page (`/l/<slug>`, `/d/<slug>`). A registered experiment may lower the frequency; raising it above 1 in 6 needs an amendment. *Test:* in any window of 7 consecutive cards, at most 1 ad; 0 ads on lesson pages.
- **A7. Contextual, never personal.** An ad is chosen only by the subject of the lesson before it. It uses no learner data. No personalised or behavioural advertising while learners may be under the local age of digital consent (that is, until F-01 and the privacy reviewer say otherwise, and then only by a further amendment). *Test:* two seeded learners with different histories and the same preceding lesson get the same ad candidate set; the ad request carries no identifier or history.
- **A8. Ads never move a lesson.** The lesson order is identical with ads on and off; ads are inserted, never reorder. No lesson is chosen, built, kept or moved because of ad performance or a sponsorship. Sponsored lessons are not allowed by this amendment (W-895 must first write, or reject, the sponsor-independence rule). *Test:* the lesson sequence with ads removed equals the ads-off sequence, card for card.
- **A9. First-party only.** Ads are served from our own origin, with no third-party script on the host page and no cookie or identifier set for ads. A third-party network needs a further amendment and the privacy reviewer's approval (W-892), and would run only in its own sandboxed cross-origin frame. *Test:* 0 requests from the host page to origins outside the privacy ruling's allow-list; 0 cookies or storage keys written by the ad path.
- **A10. A kill switch, and guardrails beat revenue.** One flag turns the slot off and restores the ads-off feed exactly. A guardrail breach in the registered ad experiment (W-894) turns the slot off; revenue never overrides a guardrail. *Test:* flag off, the feed equals the ads-off feed; the experiment file names the guardrails and the kill rule before any data.

### For all three (new)

- **X1.** Replaces the v1 engagement paragraph: "Engagement (dwell, swipes, shares, ad taps) and revenue are reported, each labelled as what it is, and **never** used to rank lessons against each other, to choose what to build, to drive a personalization rule, or to give mastery credit. The ad frequency is set only by a registered experiment, within A6." *Test:* the code audits in P2, M1 and A8; the WBR labels engagement and revenue separately from Surface Value metrics.
- **X2.** Every sentence a learner sees on these surfaces (personalization reasons, mastery messages, empty states that state facts, house-ad creatives) is a recorded claim with an address and a source, and it is verified before launch. Paid ad copy is the advertiser's, not ours, and A3 keeps it unmistakable. *Test:* quality bar Q3.4.
- **X3. Review of these rules.** Each P, M and A rule is reviewed at the first distillation after 30 days of real-learner data. A rule that has never failed a test and protects nothing measurable is proposed for removal there, by amendment. *Test:* the distillation agenda after 30 days of data lists every rule here with its test history.

### Trade-offs we accept (replaces the cold-start row, adds three)

| Trade-off | Accepted cost | Owner |
|---|---|---|
| Honest cold start: no personalization without history | A less "magical" first minute | head-of-product |
| Rules only, every move explained | A less clever order than a learned model might give | head-of-product |
| No streaks, no guilt | Fewer return visits than streak mechanics would buy | founder |
| One capped, static, contextual ad slot | Far less revenue than personalised or more frequent ads; a swipe of friction every 6 lessons | founder |

## Claimed benefit

The three First Light surfaces add the strongest pressures a learning feed meets: an order that can be tuned for time-on-feed, rewards that can be tuned for opening the app, and revenue that grows with swipes. Written here, each pressure has a stated limit and a test that fails when the limit is crossed, so it cannot enter as an "invisible override" in a builder's PRD. The quality bar rows Q1.6, Q1.7 and Q1.9 get a ratified text to test against instead of this office's reading of the founder's words.

## What it removes

- The v1 sentence "It is not personalised and it says so" for learners with history (kept for cold start, F4), and with it the feed.spec.ts test "cold start does not pretend to personalise" as written (AMD-FL-B replaces it, it is not deleted without a replacement).
- The guarantee that every card in the feed is a lesson or a revisit (part A).
- The property that every learner sees the same order (part P).
- "Recall-based streaks (today's revisits done)" from the growth designer's scope (company/roles/growth-designer.md, via tools/org/roles.mjs): M2 rules out any cross-day count.
- The freedom to raise ad frequency on experiment results alone (A6): the proposal said "set by the experiment"; this draft makes 1 in 6 a ceiling.
- Sponsored lessons, until W-895 rules (A8).

## Prediction and test

- **prediction:** (1) AMD-FL-B encodes every rule above as a spec with no rule left as "reviewer judgement", and every spec fails on a planted violation. (2) At the T-7 dry run (2026-11-16) every row Q1.6, Q1.7, Q1.9 resolves to pass or fail from these specs, with 0 disputes about what a rule means. (3) In the first 30 days with real learners, first spaced-revisit recall and prediction to reveal completion with personalization on are within 2 points of the default-order holdout or better, and the ad arm stays inside W-894's guardrails.
- **would_be_wrong_if:** a rule cannot be written as a failing spec (rewrite the rule before ratification, not the test after); either Q4.2 borrowed mind reads mastery as a streak or a score to defend, or cannot say why a card was suggested; personalized recall or completion falls 3 points or more below the holdout; or builders ask the steward what a rule means more than twice per surface (the text is not testable enough).
- **side_by_side:** run AMD-FL-B in warn-only mode for the first build of each surface and list every disagreement between the spec and the learner-evaluator's Q4 findings; keep a personalization-off holdout and an ads-off holdout for one cycle after launch (owner: analytics-steward, W-894 and the personalization experiments).

## Does it change how the proposer is judged?

Yes, in two places. (1) The evaluation steward drafts these rules, writes the AMD-FL-B specs that encode them, and gives the quality go/no-go against them, so this office would be judging work against its own text. It therefore cannot be the deciding approver: the founder ratifies (decision item 6), with the constitutional review board seated. (2) Part A's rules came from vp-marketing, whose work is judged on revenue, so vp-marketing is not a deciding approver for part A either.

## Rollback

Revert `company/product/surface-value.md` to v1 under its own `Amendment: AMD-<n>` trailer. Behaviour rolls back without a code revert: F1 and P4 guarantee that personalization off equals the v1 order, A10 guarantees that the slot flag off equals the ads-off feed, and the mastery surface ships behind a flag. Rolling back while learners hold mastery states keeps their records and hides the surface.

## Objections

Every objection below is answered with what happened to it. Where a role's view could not be read from records, this says so.

1. **head-of-product (from company/decisions/2026-10-12-feed-is-not-personalised.md):** "Personalisation language without signal is a lie with good typography." Their record also sets "revisit when ≥ 50 lessons are published" (now 635) and accepted cm-math's objection with "prerequisite-aware ordering is on the roadmap". *Answer:* accepted into the text. F4 keeps the honest cold-start sentence for every learner without history, P3 requires a true reason on every moved card, and P2 names the prerequisite graph as a permitted input. The cold-start row stays theirs.
2. **head-of-product, not yet on record:** W-891 (the ad-slot numbers, the label, and whether a school offer or an ad-free tier goes on the roadmap) is in backlog, and I found no head-of-product record on mastery. *Answer:* A3 and A6 take the proposal's numbers as the starting text and cite W-891; if head-of-product rules before ratification (the bar asks for it before 2026-10-30), the founder ratifies their numbers instead. Head-of-product holds a seat at ratification for parts P and M. Open until they rule; not assumed.
3. **growth-designer (role scope, company/roles/growth-designer.md):** the scope lists "Recall-based streaks (today's revisits done)". *Answer:* rejected for First Light. M2 allows "All due revisits done" as today's state and forbids counting it across days, which keeps the recall signal and drops the habit lever the role itself names as a failure mode ("A streak that rewards opening the app"). After ratification the chief of staff updates the role data.
4. **vp-marketing (proposal, rule 6):** the frequency should be "set by the experiment". *Answer:* partly accepted. The experiment may lower the frequency; raising it above 1 in 6 needs an amendment (A6), because a higher frequency is the revenue pressure Surface Value exists to keep visible.
5. **vp-marketing (proposal, "Note"):** ads on the public feed and school licences pull against each other. *Answer:* not a Surface Value question. A10's flag makes an ad-free mode trivial. The roadmap call is head-of-product's (W-891).
6. **personalization team (company/personalization/README.md):** the founder's personalization brief (W-091) is still pending, and "rule-based" may be narrower than what the founder means. *Answer:* the founder's First Light decision says "rule-based personalization", so P1 holds to rules, and a learned model needs a further amendment. If W-091 says otherwise, that is the founder's call at F-19.
7. **privacy-reviewer (W-892, open):** P2's inputs and A7 and A9 touch data and age questions that the privacy reviewer decides. *Answer:* this text sets a floor, not a ceiling. A privacy ruling may be stricter and wins, and a looser one needs an amendment. F-01 stays open, so A7 assumes a learner may be a child.
8. **evaluation steward (this office, failure mode "Freezing the evaluator forever"):** writing 30 testable rules into a protected document makes the product harder to change than it needs to be. *Answer:* X3 puts every rule on the first data-backed distillation for removal, and the parts are severable, so a part can be ratified, held or rejected on its own.
9. **First Light decision objection "dates are a guess":** ratification by 2026-10-30 is on the critical path for AMD-FL-B (2026-11-06). *Answer:* the draft goes out now, ahead of the 2026-10-21 date in the quality bar. If F-19 slips, AMD-FL-B is written against this draft in warn-only mode, and the founder is told that Q1.6, Q1.7 and Q1.9 then rest on unratified text.

## Decision (constitutional review board)

Founder ratifies (F-19). Seats: head-of-product (P, M, and A's numbers), privacy-reviewer (P2, A7, A9), growth-designer (M), personalization-lead (P), vp-marketing (A, non-deciding), evaluation-steward (presents, non-deciding).

| Part | Decision | By | Date |
|---|---|---|---|
| F, X | | | |
| P | | | |
| M | | | |
| A | | | |
