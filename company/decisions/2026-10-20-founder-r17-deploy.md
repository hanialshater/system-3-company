# Copy re-check fixes and reveal pass: deploy (r17)

owner: chief-of-staff
class: deploy
route: chief-of-staff → existing Vercel production project via the approved `[deploy]` marker on the default branch

Founder verbatim (2026-10-20, this session), answering whether to deploy the 45 re-check fixes now: "Deploy only when you finish". The work it waited on (the reveal-only pass) is finished in d5f1b0e7.

Covers 52cbd664 (45 fixes from the read-only re-check of shipped questions, titles and hooks) and d5f1b0e7 (reveal pass, ~135 lessons, 16 over-cuts restored).

## Objections
- Edited lessons' learner-review and QA records are for an older version (W-2019).
- Claim-quoted reveals and questions remain unchanged (W-2018).
- No local production build; Vercel's production build is the build check. QA contract 70/70 on 35 changed lessons and earlier 78/78 on production; check and suites at baseline.
