# Every deploy needs the founder's approval

owner: chief-of-staff · decided by: founder · 2026-10-14

## Decision
No deploy happens without the founder's explicit approval for that deploy. That covers a `[deploy]` commit (Vercel's GitHub integration builds only those, per `vercel.json`), `npm run deploy -- preview|production`, and a manual run of `.github/workflows/deploy.yml`. The release manager may publish lessons (status changes) on the gates as before, but asks the founder before deploying them.

## Why
Vercel's free plan allows 100 deployments a day. Agents' work-in-progress pushes used them all on 2026-10-14, and real releases were rate-limited.

## Objections
- Releases wait on a human, so published lessons can sit undeployed. Answer: the founder chose this; the release manager batches publish waves so one approval ships many lessons.
