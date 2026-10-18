# Founder digest: 2026-10-17 morning

owner: chief-of-staff · cadence: at least every 12 h (company/rituals/triggers.json) · covers 2026-10-16 15:42Z to 2026-10-17 ~08:20Z

Scope note: this session worked only the personalization lane (lane 14) and the company-wide checks it needed. No other lane was dispatched from this session; their state is as in the last digest and the progress log. Nothing was deployed. Branch: ccr-3744965a-rfmufj (pushed).

## Shipped (on the branch, not in production)
- **Personalization org created** on your approval: Mateo is VP of Personalization reporting to you, with personalization-eval, applied and learning scientists, lesson-dims owner, personalization engineer, learner-data engineer (Customer Data); learner-model engineer moved under him (company/decisions/2026-10-16-founder-personalization-org.md).
- **Two offline studies, frozen before scoring, each reproduced byte for byte:**
  - Readout 1: the GAM recommender fails against default order and draft rules (gain under 0.25 point). Novelty killed; surprise off; 218-lesson rating job cancelled.
  - Readout 2: perfect-knowledge ordering and review timing both show headroom; the GAM and the review-timing candidate both fail. Much of the review "headroom" is the made-up cost of revisits in a revisits-first feed.
  - Decisions: company/decisions/2026-10-16-vp-personalization-phase-a-readout-1-decisions.md, company/decisions/2026-10-17-vp-personalization-readout-2-decisions.md.
- **HQ Personalization Lab** at /hq/personalization (simulated personas only; privacy-done for the offline phase).
- **Settings API** at /api/account/settings (on/off, subjects, less-of; atomic writes proven on local Postgres); not wired to accounts, nothing applied.
- **Privacy tests run in `npm run check`** (model self-check, no-storage/no-network, forbidden inputs). tsconfig now allows `.ts`-extension imports (principal-engineer review).
- **Full verify** on the merged head mid-session: check, typecheck, build, QA 1958/1958; test:hq 71/74 (3 history tests fail on this shallow clone).

## Decided by you since the last digest
- Personalization brief, ratified guesses (curves in code), VP and self-contained org, customer-data team, all role cards; mailbox pilot extended to lane 14; Q1–Q5 after readout 1 (GAM stopped, First Light rule set ships off); Q1–Q4 after readout 2 (criterion 3 measure-only study, no third candidate, pause if nothing reachable); 2.0M personalization budget.

## Running now
- Criterion 3 (batch 4): evidence (E3) running; criterion draft (K3) next. Measure-only; no candidate.

## Blocked
- Settings API wiring and the `settings` table: need the accounts branch (backend-engineer W-1734), a readiness addendum (W-1737), and `test:settings` in CI (W-1735, an amendment you ratify).

## Waiting on you
1. **Counsel:** may 13–15 year olds be put in a personalized experiment arm by default (privacy D4)? Nothing is exposed until a phase B exists.
2. **Settings API charging:** personalization (as filed) or First Light?
3. Everything listed in the 2026-10-16 digest that is still open (deploy approvals, F-25 lawyer, F-26 moderator, F-17, F-19, F-23).
