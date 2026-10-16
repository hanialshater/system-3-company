# Books 100 draft demo review guide

This PR adds exactly100 distinct-book interactive idea demos to the six existing Books lessons. Each demo offers a prediction, two original stipulated model scenarios, an inspectable comparison, and a reveal. These are short idea prototypes, not complete book summaries. All additions remain draft; the public feed does not admit drafts.

The founder request was routed through the existing category, product, design, quality, engineering and courses owners. Their exact-100 draft ruling is in [the intake](../../decisions/2026-10-16-founder-books-100-pr.md), with no publication or deployment approval. The authoritative roster is [manifest.json](../../domains/briefs/books-100/manifest.json).

## Review locally

```sh
npm ci
npm run build
node node_modules/next/dist/bin/next start -H 127.0.0.1 -p 3000
```

Open a `/d/<slug>` path from the table. Local builds include direct draft lesson pages by default; the standard production visibility policy excludes them. Build and run with the same environment. The source has no new dependencies, APIs, authentication, storage, learner identifiers or network requests.

## Evidence boundary

- All100 briefs received learning-design review; original toy arithmetic was independently recomputed with exact rational arithmetic. Source attribution and real-world applicability remain unverified. No book or empirical paper was opened by that audit.
- Formal learner review covers seven representatives; its updated-artifact review is separate from design and QA. It is borrowed-mind inspection, not a human learning study.
- Independent design review samples the named artifacts; its results must not be described as an all100 design pass.
- Known 360×640 reveal cropping is retained as a pre-launch defect. The binding strict phone fit is390×844.
- Final validation: 200/200 phone/desktop contracts, 100/100 strict 390×844 fits and 100/100 Reset/reveal explorations on frozen v2; 12/12 model tests. The current integrated build additionally passes the upstream unmodified feed suite, 10/10, and seven reverse paths. Design covers 30 bounded artifacts (70 unseen), and formal simulated learner review covers seven distinct pilots. See [final integration](2026-10-16-final-integration.md) and [QA summary](2026-10-16-qa-summary.md) for identities, historical failures and limits. The platform metadata sentinel passes after the actual QA links were recorded; the inherited Git C2 fixture remains a disclosed red verification result.

## Board identities after concurrent base integration

The upstream company allocated the original task's board IDs concurrently. Upstream identities were preserved, and this task was reallocated through `company board add`. Historical append-only events retain their original references; this table supplies the correction.

| Earlier task ID | Final task ID |
|---|---|
| W-1464 | W-1492 |
| W-1465 | W-1493 |
| W-1466 | W-1494 |
| W-1467 | W-1495 |
| W-1468 | W-1496 |
| W-1469 | W-1497 |
| W-1470 | W-1498 |
| W-1471 | W-1499 |
| W-1472 | W-1500 |
| W-1473 | W-1501 |
| W-1474 | W-1502 |
| W-1475 | W-1503 |

## Pull request

[Draft PR #5](https://github.com/hanialshater/system-3-company/pull/5). No merge, lesson publication or deployment was performed. The PR also discloses a narrow historical HQ room-alias repair for this task’s append-only event labels.

## Inventory

34 business, 33 psychology, 33 science-history. Model families: 10 compound, 14 feedback, 7 flow, 16 intervals, 9 network, 26 payoff, 18 selection.

| Book | Author | Model | Draft route |
|---|---|---|---|
| The Checklist Manifesto | Atul Gawande | compound | `/d/bk-checklist-series-reliability` |
| Thinking in Bets | Annie Duke | payoff | `/d/bk-bets-process-versus-outcome` |
| The Mythical Man-Month | Frederick P. Brooks Jr. | intervals | `/d/bk-brooks-ramp-up-cost` |
| The Innovator's Dilemma | Clayton M. Christensen | compound | `/d/bk-innovator-demand-crossing` |
| Zero to One | Peter Thiel and Blake Masters | payoff | `/d/bk-zero-tail-concentration` |
| Getting to Yes | Roger Fisher and William Ury | payoff | `/d/bk-yes-trade-different-values` |
| High Output Management | Andrew S. Grove | network | `/d/bk-grove-leverage-hours` |
| The Effective Executive | Peter F. Drucker | intervals | `/d/bk-drucker-time-fragments` |
| The Personal MBA | Josh Kaufman | payoff | `/d/bk-personal-mba-break-even` |
| The E-Myth Revisited | Michael E. Gerber | flow | `/d/bk-emyth-owner-bottleneck` |
| The Fifth Discipline | Peter M. Senge | feedback | `/d/bk-fifth-upstream-orders` |
| Good to Great | Jim Collins | selection | `/d/bk-great-selected-winners` |
| The Art of Strategy | Avinash K. Dixit and Barry J. Nalebuff | payoff | `/d/bk-strategy-credible-commitment` |
| Playing to Win | A. G. Lafley and Roger L. Martin | flow | `/d/bk-playing-capability-fit` |
| Blue Ocean Strategy | W. Chan Kim and Renee Mauborgne | payoff | `/d/bk-blue-value-cost-trade` |
| Crossing the Chasm | Geoffrey A. Moore | selection | `/d/bk-chasm-segment-readiness` |
| The Innovator's Solution | Clayton M. Christensen and Michael E. Raynor | payoff | `/d/bk-solution-asymmetric-incentives` |
| Competing Against Luck | Clayton M. Christensen, Taddy Hall, Karen Dillon and David S. Duncan | payoff | `/d/bk-jobs-context-changes-choice` |
| Lean Analytics | Alistair Croll and Benjamin Yoskovitz | selection | `/d/bk-lean-analytics-cohort-mix` |
| Measure What Matters | John Doerr | selection | `/d/bk-okr-output-and-quality` |
| Team Topologies | Matthew Skelton and Manuel Pais | intervals | `/d/bk-topologies-handoff-edges` |
| Accelerate | Nicole Forsgren, Jez Humble and Gene Kim | intervals | `/d/bk-accelerate-small-batches` |
| The DevOps Handbook | Gene Kim, Jez Humble, Patrick Debois and John Willis | feedback | `/d/bk-devops-limit-work-in-progress` |
| An Elegant Puzzle | Will Larson | feedback | `/d/bk-elegant-team-slack` |
| Designing Data-Intensive Applications | Martin Kleppmann | feedback | `/d/bk-data-replica-read-lag` |
| Release It! | Michael T. Nygard | payoff | `/d/bk-release-bulkhead-capacity` |
| Peopleware | Tom DeMarco and Timothy Lister | intervals | `/d/bk-peopleware-interruption-cost` |
| Waltzing with Bears | Tom DeMarco and Timothy Lister | payoff | `/d/bk-bears-range-not-point` |
| The Principles of Product Development Flow | Donald G. Reinertsen | feedback | `/d/bk-flow-utilization-queue` |
| Turn the Ship Around! | L. David Marquet | flow | `/d/bk-ship-distributed-information` |
| The Manager's Path | Camille Fournier | intervals | `/d/bk-manager-delegation-interface` |
| The Startup Owner's Manual | Steve Blank and Bob Dorf | payoff | `/d/bk-startup-test-before-scale` |
| Competitive Strategy | Michael E. Porter | payoff | `/d/bk-porter-same-budget-opportunity` |
| How to Measure Anything | Douglas W. Hubbard | payoff | `/d/bk-measure-value-information` |
| Nudge | Richard H. Thaler and Cass R. Sunstein | selection | `/d/bk-nudge-default-choice-model` |
| Predictably Irrational | Dan Ariely | payoff | `/d/bk-irrational-decoy-dominance` |
| The Power of Habit | Charles Duhigg | feedback | `/d/bk-habit-cue-policy` |
| Influence | Robert B. Cialdini | network | `/d/bk-influence-social-sample` |
| Mindset | Carol S. Dweck | selection | `/d/bk-mindset-small-effect-scale` |
| The Art of Choosing | Sheena Iyengar | intervals | `/d/bk-choosing-information-budget` |
| Scarcity | Sendhil Mullainathan and Eldar Shafir | intervals | `/d/bk-scarcity-attention-budget` |
| Make It Stick | Peter C. Brown, Henry L. Roediger III and Mark A. McDaniel | selection | `/d/bk-stick-retrieval-evidence` |
| How We Learn | Benedict Carey | selection | `/d/bk-learn-cue-overlap` |
| A Mind for Numbers | Barbara Oakley | intervals | `/d/bk-numbers-chunk-workspace` |
| Learning How to Learn | Barbara Oakley, Terrence Sejnowski and Alistair McConville | network | `/d/bk-learning-link-new-to-known` |
| Learn Like a Pro | Barbara Oakley and Olav Schewe | flow | `/d/bk-pro-feedback-target` |
| How to Take Smart Notes | Sonke Ahrens | network | `/d/bk-notes-links-not-piles` |
| The Extended Mind | Annie Murphy Paul | feedback | `/d/bk-extended-external-state` |
| The Organized Mind | Daniel J. Levitin | feedback | `/d/bk-organized-offload-buffer` |
| The Distracted Mind | Adam Gazzaley and Larry D. Rosen | intervals | `/d/bk-distracted-switching-budget` |
| Deep Work | Cal Newport | intervals | `/d/bk-deep-unbroken-block` |
| Digital Minimalism | Cal Newport | payoff | `/d/bk-digital-attention-allocation` |
| Hyperfocus | Chris Bailey | selection | `/d/bk-hyperfocus-salience-filter` |
| Indistractable | Nir Eyal | intervals | `/d/bk-indistractable-cue-access` |
| Drive | Daniel H. Pink | payoff | `/d/bk-drive-proxy-reward` |
| Punished by Rewards | Alfie Kohn | intervals | `/d/bk-rewards-metric-gaming` |
| The Invisible Gorilla | Christopher Chabris and Daniel Simons | selection | `/d/bk-gorilla-selection-rule` |
| You Are Not So Smart | David McRaney | payoff | `/d/bk-smart-sunk-cost-boundary` |
| How Minds Change | David McRaney | selection | `/d/bk-minds-sampling-representatives` |
| The Knowledge Illusion | Steven Sloman and Philip Fernbach | flow | `/d/bk-knowledge-missing-mechanism` |
| Mistakes Were Made (But Not by Me) | Carol Tavris and Elliot Aronson | selection | `/d/bk-mistakes-selective-evidence` |
| On Being Certain | Robert A. Burton | payoff | `/d/bk-certain-confidence-score` |
| Superforecasting | Philip E. Tetlock and Dan Gardner | payoff | `/d/bk-forecast-proper-score` |
| The Wisdom of Crowds | James Surowiecki | selection | `/d/bk-crowds-correlated-errors` |
| Range | David Epstein | selection | `/d/bk-range-transfer-rule` |
| Grit | Angela Duckworth | compound | `/d/bk-grit-product-assumption` |
| Peak | Anders Ericsson and Robert Pool | feedback | `/d/bk-peak-feedback-discriminates` |
| The Black Swan | Nassim Nicholas Taleb | payoff | `/d/bk-swan-unseen-regime-change` |
| The Evolution of Cooperation | Robert Axelrod | payoff | `/d/bk-cooperation-one-error` |
| Factfulness | Hans Rosling, Ola Rosling and Anna Rosling Rönnlund | selection | `/d/bk-fact-middle-of-distribution` |
| The Signal and the Noise | Nate Silver | payoff | `/d/bk-signal-overfit-validation` |
| Thinking in Systems | Donella H. Meadows | feedback | `/d/bk-systems-delay-control` |
| Silent Spring | Rachel Carson | selection | `/d/bk-spring-selection-resistance` |
| The Selfish Gene | Richard Dawkins | payoff | `/d/bk-gene-frequency-dependent` |
| The Mathematical Theory of Communication | Claude E. Shannon and Warren Weaver | network | `/d/bk-watchmaker-cumulative-retention` |
| Infinite Powers | Steven Strogatz | compound | `/d/bk-climbing-small-valid-steps` |
| The Extended Phenotype | Richard Dawkins | payoff | `/d/bk-phenotype-external-effect` |
| The Computer and the Brain | John von Neumann | flow | `/d/bk-wonderful-contingent-branches` |
| The Song of the Dodo | David Quammen | network | `/d/bk-dodo-fragmented-habitat` |
| The Theory of Island Biogeography | Robert H. MacArthur and Edward O. Wilson | feedback | `/d/bk-island-arrival-loss-balance` |
| The Limits to Growth | Donella H. Meadows, Dennis L. Meadows, Jørgen Randers and William W. Behrens III | feedback | `/d/bk-diversity-species-area-model` |
| Introduction to Probability | Joseph K. Blitzstein and Jessica Hwang | payoff | `/d/bk-origin-selection-frequencies` |
| On Growth and Form | D'Arcy Wentworth Thompson | compound | `/d/bk-growth-surface-volume` |
| Scale | Geoffrey West | compound | `/d/bk-scale-exponent-boundary` |
| Computer Organization and Design, Enhanced | David A. Patterson and John L. Hennessy | flow | `/d/bk-sync-coupling-threshold` |
| The Art of Computer Programming, Volume 1: Fundamental Algorithms | Donald E. Knuth | network | `/d/bk-linked-hub-removal` |
| Computer Systems: A Programmer's Perspective | Randal E. Bryant and David R. O’Hallaron | intervals | `/d/bk-degrees-shortcut-paths` |
| Networks | Mark E. J. Newman | network | `/d/bk-networks-degree-versus-bridge` |
| The Information | James Gleick | intervals | `/d/bk-information-repeated-messages` |
| Code | Charles Petzold | compound | `/d/bk-code-carry-chain` |
| Algorithms to Live By | Brian Christian and Tom Griffiths | intervals | `/d/bk-algorithms-cache-change` |
| An Introduction to Error Analysis | John R. Taylor | payoff | `/d/bk-qed-add-amplitudes` |
| Six Easy Pieces | Richard P. Feynman | feedback | `/d/bk-pieces-energy-reference` |
| The Art of Statistics | David Spiegelhalter | selection | `/d/bk-law-symmetry-shift` |
| The Sciences of the Artificial | Herbert A. Simon | network | `/d/bk-time-light-cone-budget` |
| Cosmos | Carl Sagan | compound | `/d/bk-cosmos-scale-compression` |
| Pale Blue Dot | Carl Sagan | compound | `/d/bk-pale-angular-size` |
| The Order of Time | Carlo Rovelli | feedback | `/d/bk-order-clock-comparison` |
| Chaos | James Gleick | compound | `/d/bk-chaos-nearby-trajectories` |
| The Drunkard's Walk | Leonard Mlodinow | selection | `/d/bk-drunkard-streak-and-rate` |
