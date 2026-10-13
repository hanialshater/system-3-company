# Decision: three new teams: backend, growth, company tools

date: 2026-10-13 · decided by: founder (request), chief-of-staff (design) · status: accepted

## Context
The founder asked for three things:
- a backend team (auth, a real app, progress saved in a database);
- social features and gamification;
- a dedicated company-tools team, because rituals run on a day cadence while agents work in minutes, and the founder wants Sococo-style rooms and a timeline to go back through meetings and notes.

## Decision
- **Backend:** `backend-engineer` and `privacy-reviewer`, both reporting to the principal engineer.
  - Anonymous-first play; sign-in merges anonymous progress.
  - Store attempts and revisit schedules so the revisit recall rate becomes measurable.
  - Every schema, provider or dependency choice is tier 2: an EDD, an ADR and an engineering review.
  - **Blocked on the founder:** the auth provider, the database host, and whether learners may be under 13.
- **Growth:** `growth-designer`, reporting to the head of product.
  - Rewards point at recall (a streak means today's revisits were done; mastery comes from the map), never at taps.
  - Points or leaderboards for speed or volume are rejected (Goodhart).
  - Social features start with "challenge a friend's prediction", wait for real learners, and each feature ships as an experiment with predictions committed first.
- **Company tools:** `tools-lead` (reporting to the chief of staff) and `hq-engineer`.
  - The append-only event log `company/ops/events.jsonl` is the source for HQ: a floor plan of rooms and agents, a timeline, a replay slider and meeting pages.
  - Rituals move to event triggers (`company/rituals/triggers.json`). The cadence table inside the gate CLI changes only by amendment.

## Order
1. Company tools (cheap; it helps run the company and lets the founder follow it).
2. Deploy, then the backend.
3. Recall-based gamification.
4. Social.

## Objections that travel
- **Three teams compete with lesson production for the same usage budget,** and the limit was hit twice on 2026-10-13. Owner: founder (budget split, still unanswered).
- **HQ could become a dashboard nobody opens.** Mitigation: the founder's Lobby shows only "decisions needed" and "blocked" first.
- **Agent "meetings" are sequential reports, not live talk,** so a room's chat reads as a thread. Accepted.
