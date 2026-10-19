# Founder ask: work on auth, progress tracking and social (likes, saves) now; public like counts; preview infra

owner: backend-engineer (accounts, progress, like/save storage) · growth-designer (like/save product spec)
date: 2026-10-17
status: decided
class: product
route: growth-designer (like/save spec, PRD-003 addendum) → privacy-reviewer (public counts, privacy gate §5) → backend-engineer (EDD-008 rebuild + like/save) → principal-engineer (tier-2 review) → principal-engineer-ops (readiness, W-966) → founder (preview infra accounts; every deploy)
recorded by: chief-of-staff

## What the founder said

> "ok, I want you instead to work on auth and progress tracking and social features (like, save etc)"  (conversation 2026-10-17)
> Likes: "Public like counts". Scope: "Also set up preview infra".  (answers to the chief of staff's two questions)

## What the founder decided, and what is left to the owners

- **Decided by the founder (whether):**
  - Priority now: accounts, server-side progress, and likes and saves, ahead of more lesson publishing.
  - Likes are public: a lesson shows how many people liked it. Saves are private.
  - A staff-only preview with real infrastructure (Neon EU test database, an email sender for magic links) is in scope.
- **Left to the owners (how):** the data model and API (EDD-008 plus a like/save addendum); the privacy terms of a public count (minimum count before showing, abuse and duplicate-like handling, deletion); placement in the lesson card; the readiness record.
- **Context the chief of staff found:** the earlier `accounts` branch (EDD-008 code at 2f5c500: migration 001, `src/lib/server/{auth,account-api,progress-store,...}`, tests) was never pushed and is gone. The design, reviews (2026-10-15 principal review C1-C11; privacy review M1-M6, G1-G6) and readiness gaps (A-1..A-17) survive and are the spec for the rebuild. The personalization lane's settings API (`origin/perso-m1`, `src/app/api/account/settings`) depends on these accounts and must stay compatible.

## Objections

- **chief-of-staff:** a public like count is engagement shown to learners, and it pulls toward popularity. Surface Value (company/product/surface-value.md) says engagement is never used to rank. **Answer:** counts are displayed but never read by the feed, ordering, recommendations or build choice; a test in the feed asserts it. Held to the privacy-reviewer's ruling and the principal-engineer review.
- **chief-of-staff:** public counts invite fake likes and need a child-safety answer (privacy gate: nothing social ships without moderation and a child-safety answer). **Answer:** one like per account (signed-in only), no counts below a threshold the privacy-reviewer sets, the existing age screen applies. Privacy-reviewer rules before any public display is switched on (separate flag).
- **chief-of-staff:** preview infrastructure needs external accounts and secrets the agents cannot create. **Answer:** built and tested on local Postgres first; the founder creates the Neon EU test project and the email sender and adds their keys when the code is ready (steps listed in the hand-off).

## Board

- accounts rebuild (backend-engineer) waits for the WBR (dispatch rule R1); PRD-005 like/save spec (growth-designer) in progress
