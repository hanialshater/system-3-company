# System 3 Company

**Sixty seconds. One idea. Guess first.**

A vertical feed of interactive lessons in the spirit of Brilliant and Distill, sized for a phone
and a spare minute. Each card asks you to commit to a prediction, then lets you act on a small
world that answers back, then tells you why. Ideas come back days later as one-question revisits.

The lessons are made by a **company of narrow AI agents** with a human founder. It is organised
around the ideas in [*System 3: Towards Fluent Autonomy*](https://github.com/hanialshater/system3):
claims with addresses, evaluators who use the artifact before reading the builder's account,
objections that travel with decisions, computer-use testing, and a constitution that keeps the
judged from editing the judge.

## Run it locally

```sh
npm install
npm run dev                         # http://localhost:3000
npm run company -- status           # the company's operating picture
npm run verify                      # check + typecheck + build + computer-use QA
```

Pages: `/` feed · `/d/<slug>` one lesson · `/catalog` the map of what we teach and don't teach yet.

## Deploy (Vercel)

The release manager deploys with `npm run deploy -- preview` or `npm run deploy -- production`
(also `/deploy` in Claude Code). One-time setup: `npx vercel login`, then
`npx vercel link --project system-3-company` in this checkout.

The command verifies the app, checks the linked project, deploys, smoke-tests the hosted pages,
and writes a release record. Production hides unpublished lessons on every page and promotes
only after the staged deployment passes its checks. Use `--dry-run` to inspect the plan.
See [the deploy runbook](company/ops/runbook-deploy.md).

The **Deploy to Vercel** GitHub Actions pipeline automatically creates a preview after successful
CI on the default branch. Run it manually with `target=production` to release production. It uses
prebuilt output and the same release-manager checks. Configure the Vercel IDs and deployment
token once in the GitHub environments described in the runbook.

## How the company works

| | |
|---|---|
| **Structure** | 26 narrow roles: founder, chief of staff, head of product, 8 category managers, domain scout, studio (learning designer, mockup artist, researcher, demo builder), quality (fact-checker, learner evaluator, pedagogy critic, computer-use QA, accessibility, evaluation steward), platform, insight. [Org chart](company/org-chart.md) · [roles](company/roles/README.md) |
| **Agents** | Every role except the founder is a Claude Code subagent in `.claude/agents/`, generated from [`tools/org/roles.mjs`](tools/org/roles.mjs) together with its onboarding doc. |
| **Product management** | Briefs, PRDs, decision records with objections, and experiments with predictions committed before results. [PM handbook](company/product/pm-handbook.md) · [Surface Value](company/product/surface-value.md) |
| **Rituals** | Operational Planning, WBR, Demo Crit, Cycle Planning, Pattern Review, Distillation Day, Creative Distrust, Launch Review, COE, Domain Launch, Retirement, Constitutional Review. [Rituals](company/rituals/README.md) |
| **Quality** | Launch gates in the CLI; computer-use QA with Playwright that presses every control; walkthrough transcripts for borrowed-mind reviewers; a fact-checked claims ledger shown to learners. [QA](company/qa/computer-use-testing.md) |
| **Governance** | [Constitution](company/constitution/constitution.md), protected paths enforced by a hook and CI, and amendments ratified by a board. |
| **Running it** | [The operating loop](company/ops/operating-loop.md): read state, choose a move, dispatch the narrowest role, record. In Claude Code: `/run`. |

## The CLI

```text
npm run company -- status | check | coverage [domain] | claims [--open] | new-demo <domain> <slug>
                   publish <slug> | ritual <name> | rituals | board [add|move] | roles | qa-record
npm run walkthrough -- <slug>       # learner's-eye transcript + screenshots for evaluators
node tools/org/generate.mjs          # regenerate roles and agents from tools/org/roles.mjs
```

## Adding a lesson

```sh
npm run company -- new-demo physics my-idea   # then follow company/product/demo-standard.md
```
