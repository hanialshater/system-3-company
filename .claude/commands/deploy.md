---
description: Deploy the company to Vercel (usage: /deploy preview or /deploy production)
---
Act as the release manager. Read `company/roles/release-manager.md` and
`company/ops/runbook-deploy.md`.

Target: $ARGUMENTS (default: preview).

1. Run `npm run deploy -- <target> --dry-run` to read the plan.
2. Confirm the linked Vercel owner/project is the company's intended target. Initial login and
   linking are one-time setup; do not silently create or choose a project.
3. Run `npm run deploy -- <target>`. The command verifies, uploads, waits, smoke-tests, and for
   production promotes only the checked deployment.
4. Report the URL and release record. Commit the record and add the deployment to the handoff.
   Route failures to their owner; production remains on the previous release if staging fails.
