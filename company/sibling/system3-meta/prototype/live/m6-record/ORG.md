# System 3 Company lessons (M6: 10 lessons, up to 3 builders in parallel, lanes math and cs): the organisation (generated from the spec `s3c-lessons-m6`; do not edit)

60-second interactive lessons (predict, explore, reveal cards), built and judged in git worktrees of System 3 Company; Meta never deploys.

## Roles

| Role | Level | Reports to | Room (floor) | Lane | Skills |
|---|---|---|---|---|---|
| founder | founder (a person) | - | lobby (1) | - | - |
| chief-of-staff | chief-of-staff | founder | ceo-office (1) | - | - |
| head-of-product | vp | chief-of-staff | launch (3) | - | product |
| cm-math | manager | head-of-product | math-studio (2) | math | manage |
| cm-cs | manager | head-of-product | cs-studio (2) | cs | manage |
| demo-builder | builder | cm-math | math-studio (2) | math, cs | build |
| fact-checker | checker | chief-of-staff | verification (3) | - | verify |
| learner-evaluator | evaluator | chief-of-staff | verification (3) | - | learn |
| release-manager | release | head-of-product | launch (3) | - | release |

## How work flows

Every order goes through the `lesson` flow; each stage is signed by one kind of role, and nobody checks their own work.

1. **build**, signed by the builder (evidence: src/demos/<d>/<slug>/, company/reviews/<slug>/design.md, company/reviews/<slug>/build.md)
1. **test1**, signed by the supervisor's code
1. **qa**, signed by the supervisor's code
1. **walk**, signed by the supervisor's code
1. **check**, signed by the role fact-checker (evidence: company/reviews/<slug>/<date>-fact-check.md) (pack: no prior findings or history; only artifacts/walkthroughs/${slug}/, src/demos/*/${slug}/, ${brief_file}, company/roles/fact-checker.md; never build.md, design.md)
1. **learner**, signed by the role learner-evaluator (independent: never the builder) (evidence: company/reviews/<slug>/<date>-learner-<boundary>.md) (pack: no prior findings or history; only artifacts/walkthroughs/${slug}/, company/reviews/_template-learner-review.md)
1. **launch**, signed by the role head-of-product (independent: never the builder) (evidence: company/rituals/records/<date>-launch-review-<slug>.md) (pack: only artifacts/walkthroughs/${slug}/, company/reviews/${slug}/, src/demos/*/${slug}/meta.json, company/rituals/templates/launch-review.md, company/roles/head-of-product.md)
1. **gates**, signed by the supervisor's code
1. **ship**, signed by the release (evidence: meta.status published)
1. **merge**, signed by the supervisor's code
