# Deploy runbook

owner: release-manager

## Local (now)

```sh
npm install
npm run dev            # http://localhost:3000 (lessons in review are visible and tagged)
npm run verify         # check + typecheck + build + QA: must be green before any release
npm run start          # serve the production build locally
```

## Vercel (when ready)

The repo is Vercel-ready: `vercel.json` sets the framework, build and install commands.

1. Import the GitHub repository in Vercel (framework: Next.js; defaults are fine).
2. Environment variables:
   - Preview: none (lessons in review are shown, tagged "In review").
   - Production: `SHOW_REVIEW=off` once at least 8 lessons are published. Only published lessons are shown.
   - `NEXT_PUBLIC_EVENTS=off` disables the anonymous event beacon.
3. Every push to a branch gets a preview URL. The QA tester runs the exploratory checklist against it.
4. Production deploys from the default branch after a green CI run and a launch review record.

CLI alternative: `npx vercel` (preview) and `npx vercel --prod` (production).

## Rollback

Vercel dashboard → Deployments → previous deployment → *Promote to Production*, or
`npx vercel rollback`. Then open a COE.

## Smoke test after deploy (qa-tester)

```sh
QA_BASE_URL=https://<deployment> npx playwright test tests/qa/feed.spec.ts
```

(`QA_BASE_URL` skips the local web server.)
