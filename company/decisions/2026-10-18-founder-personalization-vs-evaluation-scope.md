# Founder: Evaluation and Personalization are different orgs; Personalization owns the feed, the customer profile, gamification and progressive learning

owner: chief-of-staff-ceo-office (org design) · date: 2026-10-18 · status: decided (whether: founder; how: cards S1-S11 decided 2026-10-18 by the chief of staff under the founder's delegation, company/decisions/2026-10-18-founder-delegated-decisions.md; generated, W-1852)
class: org
route: founder → chief-of-staff (records) → chief-of-staff-ceo-office (designs the scope moves, per company/ceo-office/org-change-process.md) → founder (approves the cards) → generate
recorded by: chief-of-staff

## What the founder said

> "Evaluation and personalization are different, personalization own feed and customer profile and gamification and progressive learning features"  (founder, conversation, 2026-10-18)

## What is decided

- **Two separate orgs.** The Evaluation org (chief-product-officer → head-of-evaluation; pairwise judging, the Bradley–Terry leaderboard, HQ tab "Evaluation") and the Personalization org (vp-personalization; HQ tab "Personalization") are different. personalization-eval stays inside Personalization and judges personalization policies only.
- **Personalization owns:** the feed (ordering and the feed surface), the customer (learner) profile, gamification (badges, points, challenges, mastery and today's-revisits state), and progressive-learning features (what the learner has learned, learning paths, recommending the next lesson to learn more in a category).
- This answers objection 8 of the evaluation-org port (company/decisions/2026-10-14-evaluation-org.md): the chief product officer's scope does not cover feed ordering.

## Left to Leonie (how), for the founder's approval

Which existing scopes move and how: platform-engineer's feed ownership (today the feed surface and Feed.tsx), growth-designer's gamification scope (badges, challenges, mastery map, today's-revisits; the 2026-10-16 E2 edit), backend-engineer's `progress` and `recall` tables (the founder kept them with backend on 2026-10-16), learner-model-engineer's learner model, AMD-008's personalization and mastery rules, and the company-wide gates that stay (privacy, deploy approval, protected paths, platform-engineer's review of shared kit code). Each move is a role card the founder approves.

## Objections

- **chief-of-staff:** on 2026-10-16 the founder kept `progress`/`recall` with backend-engineer ("progress/recall stay with backend"); "customer profile" may or may not include them. **Answer:** Leonie states both readings and the founder chooses on the card.
- **chief-of-staff:** the website part of personalised ordering just closed (NO-GO, 2026-10-17); owning the feed is not a licence to change its order. **Answer:** AMD-015 and the G record still govern ordering; ownership changes who decides future work, not what is live.

## Founder-delegated answers (2026-10-18)

> "Decide for me"  (founder, conversation, 2026-10-18), recorded in company/decisions/2026-10-18-founder-delegated-decisions.md, where the chief of staff decided each card with the recommended option.

- **S1-S11 approved as written** (company/ceo-office/2026-10-18-personalization-scope-proposal.md).
- **S1 default order: option 1.** The default order stays head-of-product's as the baseline personalised orders are compared against; no amendment needed.
- **S6/S7: reading A.** `progress` and `recall` stay backend-engineer's (the 2026-10-16 ruling stands); the profile is `settings` plus computed state.
- **S9:** 8 direct reports for the VP accepted; head-of-feed stays deferred with the restated triggers.
- **S4:** growth-designer's non-gamification work (social sharing, age-screen copy, house-ad copy) travels with the role until First Light release 1.
- **CPO scope (S10):** excludes the feed, the learner profile, gamification and progressive learning.

**Generated** by chief-of-staff-ceo-office on branch org-generate, one commit per card (proposal §9 lists them). The two objections above are answered as before: the second is written into vp-personalization's may-not ("change the live order except as AMD-015 and a G record allow").

**Objection (chief-of-staff-ceo-office, 2026-10-18):** the cards were decided before the §6 consults were asked, so the owners of the moved scopes (head-of-product, platform-engineer, principal-engineer-ops, head-of-strategic-initiatives and others) have not written a word on them. **Answer:** open. The consults are owed as post-hoc consults (proposal §9); an objection from an owner reopens its card for the founder, not for the chief of staff alone.
