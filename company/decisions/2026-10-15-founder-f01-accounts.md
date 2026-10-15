# Founder decision: F-01 accounts (and F-24 age policy) for First Light

owner: founder (recorded by chief-of-staff)
date: 2026-10-15
class: product + engineering (new processors, new dependencies)
route: backend-engineer (spike, ADR-008 auth, ADR-009 database, dependency decision records, EDD-008 data model) → principal-engineer (ADRs, EDD-008) → privacy-reviewer (EDD-008 data-model section, P1.7 processors, P1.8 email use) → principal-engineer-ops (readiness) → founder (any deploy)
recorded by: chief-of-staff
status: decided

## What the founder said
Asked "What should we implement together right now?", the founder picked **"F-01 accounts (Recommended)"**, whose text was: "Decide F-01 as recommended (Better Auth + Neon via Vercel, 13+ with teen mode), then walk you step by step through the parts only you can do on your phone". The recommendation is the backend engineer's sheet, `company/initiatives/first-light/f01-options.md`, which also says this line accepts F-24.

## Decided
1. **Sign-in:** Better Auth (MIT), email magic link only. Accounts live in our own database. Play stays anonymous and local until a learner signs up; history merges only on "Keep my history" (privacy gate 2.1).
2. **Database:** Postgres on Neon, added through the Vercel Marketplace, EU region (Frankfurt), with Vercel functions in `fra1`. Preview branches never copy production learner rows.
3. **Age (F-24):** 13+ accounts, with teen mode for 13–15; under-13s play anonymously only. Only the age band is stored, never the birth year (privacy gate §3). If counsel (F-25) reads GDPR Art. 8 strictly, the fallback is 16+ everywhere, which "costs one table row, not a redesign".
4. **Email sender:** one transactional sender, used for sign-in and recovery only (P1.8). Proposed provider: Resend (it has a Vercel integration). This is a new processor and must appear in the P1.7 inventory with its DPA.
5. **Dependencies:** `better-auth` and `pg` each need a decision record before install (CLAUDE.md rule). These records are owed by the backend engineer, not waived.

## Objections (travel with this decision)
| Objection | Raised by | Status |
|---|---|---|
| Confidence is about 65% on the sign-in choice, because Better Auth on Next 16.4 is unproven here. | backend-engineer | **Open with a trigger:** the 10-22 spike. If it fails, Auth.js v5 (beta) is the named fallback, by a follow-up record. |
| Every price, free-tier limit and region in the sheet is from memory (vendor sites were blocked by the proxy). | backend-engineer | **Open.** The founder sees the real price on the Vercel and Resend screens before any card is added. Nothing here commits spend beyond free tiers. |
| The age floor depends on counsel's reading of Art. 8; no lawyer is engaged yet. | backend-engineer, privacy-reviewer | **Open.** F-25 (lawyer by 10-30) stands. |
| An email sender without our own domain (F-23) can only send test mail. | chief-of-staff | **Accepted for the spike.** Production sign-in mail needs F-23 and DNS records. |
| DPAs for Neon, Vercel and the sender are not yet reviewed (P1.7 fails on "unknown"). | privacy-reviewer | **Open.** The lawyer reads them (F-25). |

## What would make this record wrong
- The spike fails on Next 16.4 (Auth.js fallback).
- Neon or Resend in fact requires fields the gate forbids, or cannot delete or export a user by API (privacy gate provider test).
- Counsel reads Art. 8 strictly (16+).

## Founder setup (2026-10-15, reported "Done")
The founder reported the setup done after the corrected steps: Neon via the Vercel Marketplace, Frankfurt, connected to Production only, preview branching off, no prefix, Neon Auth off; Resend account, sending-access key added as `RESEND_API_KEY` for Preview only, open and click tracking off. Recorded from the founder's word; not verified from here (the Vercel API returns 403 for this session). The backend engineer verifies the variable names, without reading values, at the start of the spike.
