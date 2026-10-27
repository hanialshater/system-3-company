# AMD-019: Deploys only the founder can trigger (Codex hardening M2)

status: proposed (not ratified; drafted 2026-10-27; the founder ratifies)
date: 2026-10-27
proposed_by: S3 Donkey (the city's infrastructure company), for M2 of the founder-approved Codex plan (system3-meta `docs/proposals/2026-10-26-codex-compatibility.md` §4.2-4.3; founder: "Approve, start M1–M2 (Rec.)", `docs/decisions/2026-10-27-founder-codex.md`)
prepared_by: S3 Donkey (not this company's evaluation steward; the steward should review it)
surface: `vercel.json`, `.claude/settings.json`, `company/constitution/protected-paths.txt` (adds three paths); `.github/workflows/deploy.yml` becomes protected (it is not changed)
decides: the founder (deploy approval is the founder's rule). S3 Donkey proposed it and does not decide.

## Claimed benefit

Today any session that can commit can deploy: a commit whose message carries the marker builds production through
Vercel's Git integration. That gate holds only against agents that choose to obey it. After this amendment no Git push
builds anything. A deploy is a manual run of `deploy.yml` whose job waits in the GitHub environment `production` (or
`preview-deploy`) until the founder approves it in GitHub's interface. `VERCEL_TOKEN` lives only in those environments.

## What it changes (severable)

- **(a) Vercel's Git builds off.** `vercel.json` `git.deploymentEnabled: false`. The ignore command stays as a second
  line, tightened: a Git build runs only for a commit whose **subject line** carries the marker **and** whose GitHub
  author login is the founder's. Agent commits are authored `Claude <noreply@anthropic.com>`, so their login is not the
  founder's. A marker that a body only mentions in prose no longer counts (system3-meta's HQ went to production on
  2026-10-26 from a commit whose body said "release log from … commits" with the marker in it).
- **(b) The allow-list no longer pre-approves the deploy script.** `Bash(npm run deploy:*)` leaves `.claude/settings.json`
  (proposal row G17). `npm run test:deploy` stays.
- **(c) The three deploy files become protected paths**: `vercel.json`, `.github/workflows/deploy.yml`,
  `.claude/settings.json`. Changing a deploy gate then needs an amendment, like changing the constitution.
- **(d) Founder settings, outside this repository** (they cannot be made by a PR, and S3 Donkey changes no setting):
  `production` and `preview-deploy` environments with the founder as required reviewer, deployment branches `main`
  only for `production`, and `VERCEL_TOKEN` as an environment secret only. Steps: S3 Donkey
  `company/runbooks/codex-hardening.md`.

## The objection that travels: AMD-015's pre-approved withdrawal

AMD-015 lets release-manager run the flag-off withdrawal without asking first. With (a) and (d), every production
deploy waits for the founder's click, so the withdrawal would wait too. Two ways, the founder chooses:
1. **Accept the click** (recommended by S3 Donkey). The founder is told "at once" under AMD-015 anyway; approving a
   pending run takes one tap in GitHub's mobile app. A withdrawal is slower by the founder's reaction time.
2. **Keep AMD-015 agent-triggerable**: a separate `withdrawal` environment without a reviewer, used only by a job that
   rebuilds the live production commit with `NEXT_PUBLIC_NEW_LESSON_ORDER` off. That is a deploy an agent can trigger by
   design, and it would need its own workflow and review. Not written here.

## What it removes

The ability of any session, of any vendor, to deploy by writing text into a commit message. Also the convenience of
an agent making the approved deploy itself: after this, the agent prepares and the founder runs it.

## What it does not stop until M3 (a separate agent identity)

Every agent session today pushes as the founder. The session token is a GitHub App user token: it cannot read or change
environments or branch protection (refused by the proxy and the App's permissions, observed 2026-10-27). But:
- whether it can **approve a pending deployment** through the REST API (`POST …/pending_deployments`) is
  **unconfirmed**. If it can, an agent could dispatch `deploy.yml` and approve its own run, as the founder. GitHub's
  "prevent self-review" cannot help while agent and founder are one identity: it would block the founder's own approvals too;
- an agent can still **merge** a PR through the API with the marker in the merge title, as the founder, so (a)'s second
  line is narrowed, not closed;
- any session holding a **Vercel credential** (the Vercel connector, a CLI login) can deploy, promote or roll back
  directly, past every Git gate.

## Prediction and test

- prediction: after (a)-(d), no Git push to this repository creates a Vercel deployment, and every production deploy
  in the following two weeks shows a GitHub environment approval by the founder.
- would_be_wrong_if: any Vercel deployment of this project in those two weeks has a Git source and no matching
  approved `deploy.yml` run.
- side_by_side: none needed; the first deploy after ratification is the test (the founder approves it and reads the
  run's environment review).

## Does it change how the proposer is judged?

Yes, a little: S3 Donkey is judged on whether deploys happen without the owner's approval. So S3 Donkey is not a
deciding approver.
