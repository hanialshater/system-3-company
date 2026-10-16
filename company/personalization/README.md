# Personalization team

owner: personalization-lead (Mateo) · engineer: learner-model-engineer (Ifeoma) · reports to: head-of-product · status: **the founder's brief arrived 2026-10-16; response written; questions back to the founder open (response §6); nothing built**

## The three files (read in this order)
1. [`2026-10-16-founder-brief.md`](2026-10-16-founder-brief.md): the founder's brief (F-08), verbatim words, the EDP Orchestrator reference (`reference/edp-orchestrator/`), the chief of staff's mapping, the constraints that still bind.
2. [`2026-10-16-brief-response.md`](2026-10-16-brief-response.md): personalization-lead's response: corrections to the mapping, data shapes (fingerprint, need curves, personas, lesson dims, composer objective), phases A to D, board items W-1493 to W-1501 (team design: W-1492), objections, six questions to the founder, and the proposed team (§7, for Leonie and the founder).
3. [`2026-10-16-draft-founder-brief.md`](2026-10-16-draft-founder-brief.md): the earlier rule-based draft. **Superseded**; kept as input.

## Standing lines (unchanged by the brief)
- We **build nothing irreversible** and ship nothing without a registered experiment (analytics-steward) and a privacy review (privacy-reviewer); deploys need the founder every time.
- We personalise for recall and understanding, never for time-on-feed, and never on demographics. Engagement is a guardrail and a reported number, not a term in the score (response §2.5, objection O1, founder question 1).
- Personas are simulation fixtures only; nothing derived is stored per learner (privacy gate P3.2).
- Depends on: accounts (EDD-008), persisted events (W-706), EDD-003 (lessons as data), EDD-009 (mastery state), F-19 (AMD-008 part P).

## Next
Phase A (offline simulator, no learner data, nothing in `src/`): see response §3 and board W-1493 to W-1499.

## Earlier open questions (2026-10-13), now answered or carried
1. What adapts: the next cards' order, by a GAM-style composer (founder's brief §1); variants and difficulty are founder question 2 in the response.
2. Which signals: completions, predictions, recall, stated choices, the curriculum graph (response §2.1).
3. Visible and controllable: a reason per moved card from the score terms, one off switch (response §2.5).
4. What we may store: privacy-reviewer, W-1495.
5. How we know it worked: analytics-steward, W-1496 (offline criterion) and the phase B registration.
