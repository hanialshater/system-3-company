# Founder: Evaluation and Personalization are different orgs; Personalization owns the feed, the customer profile, gamification and progressive learning

owner: chief-of-staff-ceo-office (org design) · date: 2026-10-18 · status: decided (whether); how is Leonie's to design and the founder's to approve per role card
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
- **chief-of-staff:** the website part of personalised ordering just closed (NO-GO, 2026-10-17); owning the feed is not a licence to change its order. **Answer:** AMD-013 and the G record still govern ordering; ownership changes who decides future work, not what is live.
