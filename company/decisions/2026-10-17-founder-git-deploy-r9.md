# Founder decision: deploy r9 through Vercel's git integration (reverses F-48 for now)

owner: release-manager · recorded by: chief-of-staff
date: 2026-10-17
status: decided
class: engineering

## What the founder said

After failed "Deploy to Vercel" workflow runs (1037: traced artifacts collided with .vercelignore; 1038: upload failed, error hidden; fixes merged at 05238276, not re-run), the founder wrote in this conversation on 2026-10-17: "It keeps failing, i connected vercel again, add one with deploy tag", and after the trade-offs were laid out: "Go".

## What changes

- `vercel.json` `git.deploymentEnabled` goes from `false` (F-48, company/decisions/2026-10-16-founder-no-git-deployments.md) back to `true`. The `ignoreCommand` is unchanged: Vercel builds only a commit whose message carries the deploy tag.
- The release commit carries the deploy tag. Vercel builds it remotely from source (`npm ci`, `npm run build`), so the workflow's verify, staged promote and smoke steps do not run. Evidence for this tree: check, typecheck, test:platform, test:deploy, test:hq pass on 05238276; PR #6 built-output tests (W-1645) passed on 2821160c; full browser QA passed inside workflow runs 1037 and 1038 (same lesson code).
- Release r9's approval ("Deploy", "Ship it anyway") stands: company/decisions/2026-10-17-founder-deploy-r9-left-or-right-safari.md.

## Objections

| Objection | Raised by | Status |
|---|---|---|
| With git deployments on, any pushed head whose message quotes the deploy tag deploys (54aa64e3 shows a body mention happens). | chief-of-staff | Open: W-1654 (guard). Keep the literal tag out of commit messages unless the founder approved that deploy. |
| A git deploy goes straight to production with no staged smoke check. | chief-of-staff | Accepted by the founder for this deploy; release-manager smoke-tests production right after; instant rollback to r8 in the Vercel dashboard on failure. |

## What would make this record wrong

The Vercel build or production smoke fails: roll back, then decide whether to restore F-48.
