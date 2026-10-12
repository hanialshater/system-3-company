# EDD-001: The feed at 500+ lessons

author: principal-engineer · reviewers: platform-engineer, qa-tester · tier: 2 · status: proposed

## Problem and why now
The company is scaling from 18 to 500+ lessons in one day. The feed page passes every lesson's
full `meta.json` (claims, evidence, brief) to the client, renders one section per lesson, and
`registry.generated.ts` statically imports every meta into the module that holds the loaders.

## Measurements to take before choosing (commit numbers here)
- First Load JS and HTML size of `/` at 18, about 120 and about 500 lessons (`next build` output; `curl -s localhost:3000 | wc -c`)
- Time to interactive on Pixel 7 emulation (Playwright trace)
- Build time and QA time per lesson

## Options
1. Do nothing: acceptable if `/` stays under 300 KB of HTML at 500 lessons.
2. Slim index: pass only {slug, title, hook, domain, status, durationSec, claim counts, recall} to the feed, and load the full meta in the trust sheet on demand.
3. Paginate the feed (30 cards, then more on scroll), with subject chips filtering on the server.
4. Split the generated registry into `index.generated.ts` (slim) and `loaders.generated.ts`. This changes the generator, which is protected, so it needs an amendment.

## Proposal
Measure at about 120 lessons (after wave 1). If `/` HTML exceeds 300 KB, or first load exceeds 2 s on the emulated phone, do 2 + 3 (tier 2, no protected paths). Do 4 only if the bundle still carries full metas.

## would_be_wrong_if
At 500 lessons, the "do nothing" feed meets both budgets.

## Rollout / rollback
One commit per option; the QA feed spec must stay green; revert the commit to roll back.
