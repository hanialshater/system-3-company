# Founder digest: 2026-10-16 morning

owner: chief-of-staff · cadence: at least every 12 h (company/rituals/triggers.json)

## Shipped overnight (on main; production is still r7)
- **AMD-001 (c2)+R1 applied** (0d76ae1): the lesson index is split, so the browser no longer downloads every lesson's metadata; about 12× less JavaScript on `/`. Full verify exit 0 (QA 1930/1930), CI green, steward's audit passed, licence closed (status "applied in part"). Reaches learners only with the next deploy you approve.
- **Automatic preview deploy removed** (your decision): deploys now start only by hand after your approval.
- **Life Hacks:** all three templates fixed and merged (Home, Study, Resource); 45 lessons rewritten in waves W1, W2, W6, W7, W9; the selected-button fix for the launch slate. Tests 120/120.
- **Accounts (F-01, decided):** Better Auth + Neon (EU), 13+ with teen mode. Your Neon and Resend setup is done (Neon is the dev/preview test database). Spike passed locally: cookies scoped, IP and device blanked, no names stored, delete/export/merge work, builds with sign-in off.
- **First Light:** full scope restored (your call); status and stand-up updated.

## Decided by you since the last digest
- Ads and richer social back in release 1. F-01 and F-24. Neon as the test database. Remove the auto-deploy trigger.

## Blocked
- **Accounts region:** pinning sign-in to Frankfurt needs a Vercel project setting (deploy config, your approval) — W-1149.
- **Accessibility fix for toggle buttons:** needs an amendment to the protected QA contract (W-1128).
- **Social:** cannot ship without a named moderator (F-26).

## Waiting on you (most important first)
1. **Project Review 1 (F-15), due today 23:59 UTC** — gates behavioral builds and First Light tranche 1.
2. **r8 deploy** when you want it: AMD-001 speed and leak fix plus patience-wins-the-split.
3. **F-25 lawyer** and **F-26 moderator**, both by 10-30.
4. **F-17 ads** (proposed by 10-23), **F-23 domain name**, **F-19 Surface Value amendment** (by 10-30).
5. Life Hacks park list (25 lessons outside the charter).
