# Probability copy pass, immersive questions and phase layout: push and deploy

owner: chief-of-staff
class: deploy
route: chief-of-staff → existing Vercel production project via the approved `[deploy]` marker on the default branch

Founder verbatim (2026-10-20, this session): "Ok push to default then deploy then copy edit all then deploy again", and after the first push was blocked by the session permission check: "I approve deploy".

This record covers the first deploy: commits ccd13d9b (probability copy pass, 65 lessons), 69a965ee (phase layout: hook hidden on an open card, predict panel above the stage), 7fbfe1be (all 79 probability predict questions rewritten as scenes). The second deploy, after the all-domain copy pass, is approved by the same words and gets its own release entry.

## Objections
- Edited lessons are version-bumped, so their learner-review and QA gates are stale (W-2016); all 1,621 demos stay live under the existing show-all policy.
- `npm run build` was refused locally by the session's permission classifier; the Vercel production build is the first full build of this tree. Layout QA: contract 84/84 on 42 lessons across all 14 domains and feed.spec 10/10, on a dev server.
- Claim-bearing copy and stage-level framing fixes were skipped (W-2014, W-2015).
