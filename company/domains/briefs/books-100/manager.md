# Books 100 PR: category-manager routing and selection

owner: cm-books (Hester) · date: 2026-10-16 · status: **selection and dispatch plan; not build permission or verification**
intake: `company/decisions/2026-10-16-founder-books-100-pr.md`
product response: `company/product/verticals/2026-10-16-books-100-pr-ruling.md` (written scoped exception).
design response: `company/design/specs/books-100-pr.md`.

## Concrete interpretation

Deliver **100 additional runnable, original, single-idea book demos from 100 distinct books**, in a pull request. Every demo has predict → explore → reveal → recall, an original manipulable toy, explicit assumptions and a separate evidence boundary. They are **draft prototypes**, not 100 full copyrighted synopses, production book decks or published lessons. The six existing Books demos and their work associations remain untouched. A new book is not a promise to cover all its ideas.

The broad founder request authorizes work now. Head-of-product has recorded the narrow exception to the previous W-556 new-build hold, the cumulative 12-draft cap and the 3–4-idea deck completeness rule for this exact 100. Retain normal active concurrency, review independence, source gates, copyright limits and deploy approval. Do not change protected paths to make this work. This is a product routing decision, not another founder permission question.

## What exists, checked against disk

- `content/curriculum/books.json`: **60 concepts across 27 works**; six are built. Thus at most 54 preexisting unbuilt concepts, not 100.
- `company/domains/briefs/books.md`: **24 written briefs; six built; 18 unbuilt**. Strand brief files are headings only. 100 existing build-ready briefs do not exist.
- Current book-deck decision is `2026-10-14-book-deck-format.md`, which supersedes older strategy/board wording: 3–4 ideas per production deck, at most 2 decks /12 draft+review lessons, 1 deck per book, all six drafts retained. The format catalogue still contains stale 4–6 wording; it is not permission to build a deck.
- W-601/W-602/W-604 and W-648/W-650/W-651 remain open; book-deck and multi-card formats are red. This PR uses the approved **single-card** format and no deck shell.
- All six existing demos remain draft. Their six work IDs are excluded from the roster: `goldratt-the-goal-1984`, `clear-atomic-habits-2018`, `gladwell-outliers-2008`, `kahneman-thinking-fast-slow-2011`, `kahneman-sibony-sunstein-noise-2021`, `ries-lean-startup-2011`.
- F1 source access and F2 legal read remain publish blockers. W-583 is marked done but no general claim of opened book chapters follows from that board state.

## Selection and authority

The frozen candidate roster below is 34 Business, 33 Psychology, 33 Science & History. `roster.json` is the machine-readable copy. **Titles, authors, years, proposed work IDs and ideas are candidate metadata, not checked citations.** Strand CMs confirm bibliographic metadata, keep existing IDs when the work is already registered, choose the actual chapter as **unconfirmed**, and may replace a row only one-for-one within its lane if it fails the stage/source/refuse-list criteria. A replacement must preserve 100 distinct books, exclude the existing six works, keep the row/slug ledger explicit and record why. Do not invent author attributions to rescue a numerical toy.

The roster deliberately omits new health/therapy advice, religious texts, memoirs and sensitive political-history causal narratives. Some psychology candidates discuss wellbeing or contested effects; use only the narrowly stated model, route a literature map and culture review if the final learner claim enters the sensitive classes. Do not claim a human effect because a toy parameter produces it. Business models are not financial advice. Demand 1–3 is an editorial estimate, never learner evidence.

## Dispatch, outputs and order

| Order | Existing role | Deliverable and acceptance |
|---|---|---|
| 1 | head-of-product | Written PR scope/slot/WIP exception in `company/product/verticals/2026-10-16-books-100-pr-ruling.md`; preserve F1/F2 and evidence gates. |
| 2 | design-lead | Existing single-card scene families and craft rules in `company/design/specs/books-100-pr.md`; no sequence/deck release inferred. |
| 3A | cm-books-business (Kwame) | Rows 1–34 → `company/domains/briefs/books-100/business.json`; original narrow answer-checked briefs and proposed works/concepts. |
| 3B | cm-books-psychology (Imogen) | Rows 35–67 → `company/domains/briefs/books-100/psychology.json`; same contract, toy effects kept separate from human evidence. |
| 3C | cm-books-science-history (Tobias) | Rows 68–100 → `company/domains/briefs/books-100/science-history.json`; same contract, no model-as-history or model-as-empirical-causation claims. |
| 4 | learning-designer / interaction-designer | Review non-default interactions and the representative brief from each mechanism family before repeated production. Design actual interaction; CM only supplies learning gap and checkable constraints. |
| 5 | principal-engineer / demo-builder | Review engineering's shared-renderer EDD before reusable code; then build exact brief/config rows in batches of at most 12 active lessons and 2 active book groups; ordinary repo slot preflights still bind. No protected kit change. |
| 6 | qa-tester | Walk artifact independently, automation at phone/desktop and Reset-last; mark failures as failures and return fixes. |
| 7 | fact-checker | Artifact first. Derivations may verify independently; book/research/edition claims stay unverified unless actually opened. Run copyright counts and flag any fabricated source. |
| 8 | learner-evaluator, accessibility-reviewer | Borrowed-mind and accessibility review of artifacts, distinguish sampled from per-demo checks; no invented learning evidence or rubber-stamped reviews. |
| 9 | courses-lead | Review and integrate `content/works.json` proposals as registry-only entries, preserving all existing works; see `company/courses/2026-10-16-books-100-works-review.md`. No new course managers implied. |
| 10 | chief-of-staff | Single-writer integrate curriculum proposals after courses-lead registry review; verify total 100/unique works and six unchanged; final checks, branch commit/push and PR. Stop before publication/deploy. |

The root coordinator dispatches these roles; this manager session does not spawn agents, build, verify or edit the shared board/events/progress.

### Strand brief payload contract

Each lane writes one JSON object with `owner`, `strand`, `date`, `briefs` (exact lane count), `works` and `concepts` as **proposed patches**, plus `holds` / `substitutions`. Do not write shared `content/works.json`, curriculum, board, progress or events concurrently. Root integrates curriculum once; courses-lead alone integrates the work registry after acceptance.

Every brief must include: reserved slug; concept/work; title/hook; audience knows/doesNotKnow; misconception; one measurable objective; nearest existing lesson and **the extra book-specific question/boundary**; approved single-card mechanism family; exact numerical model, assumptions, two materially different reachable cases, independent answer recomputation; equal-precision predict options; required milestones and reveal values retained after Reset; reveal ≤90 words; stage ≤25 words; transfer recall; full metadata `also` / prerequisites / references / level / strand / tags; separate book-attribution, derivation and world-evidence claims with addresses/sources and initial `unverified` status.

The frozen renderer API and formulas are in `company/engineering/edd/EDD-010-books-100-models.md`; architecture review is `company/engineering/reviews/2026-10-16-books-100-pr-architecture.md`. Each brief additionally supplies `spec: { book: { title, author, year, work }, family, predict: { question, options, answer }, exploreHint, scenarios: [{ label, values }, { label, values }], labels, unit, bookIdea, modelBoundary, doesItHoldUp }`. Families are `flow`, `payoff`, `compound`, `selection`, `network`, `feedback`, `intervals`; use only the EDD's exact formulas. `{A}` / `{B}` in text mean saved computed outcomes. Payoff entries are signed net outcomes; selection computes weighted expected percentages, not invented observed people; network is collision-free tree growth only; intervals drops partial chunks.

**Selection objection and disposition:** this roster's candidate ideas preceded the frozen seven-family math. Several (Code's binary carries, QED's amplitudes, The Information's coding redundancy, Six Degrees' shortest paths) do not fit it. Strand CMs must make a book-faithful narrow alternative or substitute one-for-one and record the reason; they cannot retheme a different formula. If that is impossible, escalate the specific mechanism to design/engineering before build. Candidate idea text is a request to investigate, not an already approved assertion about the book.

CM brief fields must retain these learning/evidence fields even if the renderer uses a narrower config. No title-swapped stock lesson: each row must have a distinct book-specific misconception, parameter change and boundary. Titles/years at learner exposure are claims too. Builders do not mark their claims verified.

Book attribution ≤20 words, zero quotations by default, own teaching order, no scenes/characters (including business novels), figures, cover art, famous diagram layout or book exercise. Cite chapter only inside metadata, marked unconfirmed. Separate label **Does it hold up?** may say only the bounded derivation holds inside the toy; broader applicability remains unverified. Never label a book's world claim `untested` solely because we have not checked it.

## Blockers resolved and held

| Issue | Disposition |
|---|---|
| 100 means files versus books | Chosen 100 unique books and 100 runnable one-idea prototypes; existing six excluded. |
| Existing briefs insufficient | New narrow briefs owned by the three existing strand CMs; 34/33/33 ledger below. |
| Legacy deck requirement / W-556 / cumulative draft cap | Product owner recorded specific draft-only exception in the Books 100 PR ruling. No toolkit rule waived. |
| Single-card versus red kit | Approved single-card only; no shell or handmade stepper. |
| Source access | All book/chapter/research claims held until checker opens authoritative source; candidate bibliographic values are not source verification. |
| F2 legal | Holds publication, not this draft PR. Copyright rules apply during draft preparation. |
| Overlap | Strand CM names nearest subject demo and the extra test of the book claim; identical toy/insight is a replacement request, not a relabel. |
| Simulated evidence | Simulated/borrowed-mind review finds problems only; human learner evidence not inferred. |
| 100-count pressure | If a candidate cannot yield a legitimate brief, substitute an eligible distinct book; never fabricate a chapter or model the book did not argue. |

## Board routing and final handoff

Root should create/attach one founder-request epic and lane items for the three brief files, shared implementation, independent QA and final PR. Link existing W-536 (legacy brief checks), W-649/W-661 (production deck strategy/charter revisions), W-627 (source-sheet rule), W-541/W-615 (F1/F2), W-652/W-654/W-663 (existing draft reviews) without claiming this PR finishes them. W-660/W-830/W-831 and W-648/W-650/W-651 remain the separate deck programme, not dependencies to constructing approved single-card prototypes.

**Belief:** high confidence the present disk cannot supply 100 ready briefs and that this scope preserves the founder's count without repurposing six existing demos. Candidate breadth is feasible; specific books' attributions and all publication claims remain unconfirmed. **Next owner:** chief-of-staff dispatches the three strand CMs against this roster, after the product/design decision records. Evaluators receive artifact links before builder accounts.

## Frozen 100-book candidate ledger

### business

| # | Book — author (candidate year) | Reserved slug | Candidate test, to be narrowed by strand CM |
|---|---|---|---|
| 1 | *The Checklist Manifesto* — Atul Gawande (2009) | `bk-checklist-series-reliability` | Independent success probabilities multiply; common failure breaks that assumption |
| 2 | *Thinking in Bets* — Annie Duke (2018) | `bk-bets-process-versus-outcome` | Compare identical decision policies under different outcome sequences |
| 3 | *The Mythical Man-Month* — Frederick P. Brooks Jr. (1975) | `bk-brooks-ramp-up-cost` | Onboarding and coordination can outweigh added project capacity |
| 4 | *The Innovator's Dilemma* — Clayton M. Christensen (1997) | `bk-innovator-demand-crossing` | A product trajectory can cross a changing good-enough threshold |
| 5 | *Zero to One* — Peter Thiel and Blake Masters (2014) | `bk-zero-tail-concentration` | Compare concentration of toy venture returns under two portfolios |
| 6 | *Getting to Yes* — Roger Fisher and William Ury (1981) | `bk-yes-trade-different-values` | Different rankings of two issues permit a mutually better package |
| 7 | *High Output Management* — Andrew S. Grove (1983) | `bk-grove-leverage-hours` | The same manager hour produces different team output under explicit toy multipliers |
| 8 | *The Effective Executive* — Peter F. Drucker (1967) | `bk-drucker-time-fragments` | Equal free time can fit different numbers of indivisible tasks |
| 9 | *The Personal MBA* — Josh Kaufman (2010) | `bk-personal-mba-break-even` | Contribution margin and fixed costs set a toy break-even point |
| 10 | *The E-Myth Revisited* — Michael E. Gerber (1995) | `bk-emyth-owner-bottleneck` | Route repeated tasks through an owner or a bounded handoff |
| 11 | *The Fifth Discipline* — Peter M. Senge (1990) | `bk-fifth-upstream-orders` | Small demand shifts can amplify when each toy supplier adds a buffer |
| 12 | *Good to Great* — Jim Collins (2001) | `bk-great-selected-winners` | Selecting past winners alone can create an apparent success rule |
| 13 | *The Art of Strategy* — Avinash K. Dixit and Barry J. Nalebuff (2008) | `bk-strategy-credible-commitment` | A credible commitment changes the other player's available best response |
| 14 | *Playing to Win* — A. G. Lafley and Roger L. Martin (2013) | `bk-playing-capability-fit` | A strategy's required capabilities must fit together in the toy budget |
| 15 | *Blue Ocean Strategy* — W. Chan Kim and Renee Mauborgne (2005) | `bk-blue-value-cost-trade` | Reallocate a fixed feature budget for customers with different preferences |
| 16 | *Crossing the Chasm* — Geoffrey A. Moore (1991) | `bk-chasm-segment-readiness` | An average adoption score can hide a gap between two toy segments |
| 17 | *The Innovator's Solution* — Clayton M. Christensen and Michael E. Raynor (2003) | `bk-solution-asymmetric-incentives` | A small market can meet a small firm's target but miss a large firm's target |
| 18 | *Competing Against Luck* — Clayton M. Christensen and coauthors (2016) | `bk-jobs-context-changes-choice` | The same product attributes rank differently under two disclosed tasks |
| 19 | *The Mom Test* — Rob Fitzpatrick (2013) | `bk-mom-question-evidence` | Separate hypothetical praise from an observable costly action |
| 20 | *Measure What Matters* — John Doerr (2018) | `bk-okr-output-and-quality` | Optimizing a count alone can worsen an explicitly scored quality goal |
| 21 | *Team Topologies* — Matthew Skelton and Manuel Pais (2019) | `bk-topologies-handoff-edges` | Team boundaries change required coordination edges for a toy workflow |
| 22 | *Accelerate* — Nicole Forsgren, Jez Humble and Gene Kim (2018) | `bk-accelerate-small-batches` | Smaller batches trade setup frequency against delayed feedback |
| 23 | *The DevOps Handbook* — Gene Kim and coauthors (2016) | `bk-devops-limit-work-in-progress` | Cap releases in progress and track completed work under a fixed capacity |
| 24 | *An Elegant Puzzle* — Will Larson (2019) | `bk-elegant-team-slack` | Compare overloaded capacity with a disclosed interruption reserve |
| 25 | *Designing Data-Intensive Applications* — Martin Kleppmann (2017) | `bk-data-replica-read-lag` | A write can be visible on one replica before another |
| 26 | *Release It!* — Michael T. Nygard (2007) | `bk-release-bulkhead-capacity` | Separate resource pools contain a toy failure's blast radius |
| 27 | *Peopleware* — Tom DeMarco and Timothy Lister (1987) | `bk-peopleware-interruption-cost` | Repeated startup costs reduce usable work in a fixed session |
| 28 | *Waltzing with Bears* — Tom DeMarco and Timothy Lister (2003) | `bk-bears-range-not-point` | Two equally likely durations can share a mean and differ in deadline risk |
| 29 | *The Principles of Product Development Flow* — Donald G. Reinertsen (2009) | `bk-flow-utilization-queue` | A deterministic toy arrival queue grows near fixed service capacity |
| 30 | *Turn the Ship Around!* — L. David Marquet (2012) | `bk-ship-distributed-information` | Place decision authority beside the local state it requires |
| 31 | *The Manager's Path* — Camille Fournier (2017) | `bk-manager-delegation-interface` | A complete handoff needs both an outcome and a check condition |
| 32 | *The Startup Owner's Manual* — Steve Blank and Bob Dorf (2012) | `bk-startup-test-before-scale` | Compare spending on two explicitly uncertain candidate channels |
| 33 | *Competitive Strategy* — Michael E. Porter (1980) | `bk-porter-same-budget-opportunity` | A fixed budget forces explicit opportunity costs between two competitive options |
| 34 | *How to Measure Anything* — Douglas W. Hubbard (2007) | `bk-measure-value-information` | A noisy observation can be worth more than its test cost |

### psychology

| # | Book — author (candidate year) | Reserved slug | Candidate test, to be narrowed by strand CM |
|---|---|---|---|
| 35 | *Nudge* — Richard H. Thaler and Cass R. Sunstein (2008) | `bk-nudge-default-choice-model` | Test a disclosed default-following toy rule, then set following to zero |
| 36 | *Predictably Irrational* — Dan Ariely (2008) | `bk-irrational-decoy-dominance` | Add a dominated option to explicit toy choice rules; no invented human response |
| 37 | *The Power of Habit* — Charles Duhigg (2012) | `bk-habit-cue-policy` | A repeated cue triggers a toy state transition; remove the cue to test its boundary |
| 38 | *Influence* — Robert B. Cialdini (1984) | `bk-influence-social-sample` | Compare a copied choice with a disclosed independent signal |
| 39 | *Mindset* — Carol S. Dweck (2006) | `bk-mindset-small-effect-scale` | A small hypothetical mean difference need not separate overlapping groups |
| 40 | *Stumbling on Happiness* — Daniel Gilbert (2006) | `bk-happiness-forecast-duration` | Compare an assumed forecast with two explicitly hypothetical recovery curves |
| 41 | *Scarcity* — Sendhil Mullainathan and Eldar Shafir (2013) | `bk-scarcity-attention-budget` | A fixed attention budget shifts what remains available for a second task |
| 42 | *Make It Stick* — Peter C. Brown, Henry L. Roediger III and Mark A. McDaniel (2014) | `bk-stick-retrieval-evidence` | Distinguish recognising a shown answer from producing an answer before feedback |
| 43 | *How We Learn* — Benedict Carey (2014) | `bk-learn-cue-overlap` | A disclosed cue-matching model has different retrieval under changed context |
| 44 | *A Mind for Numbers* — Barbara Oakley (2014) | `bk-numbers-chunk-workspace` | Compress repeated tokens into chunks within a toy working-space limit |
| 45 | *Learning How to Learn* — Barbara Oakley, Terrence Sejnowski and Alistair McConville (2018) | `bk-learning-link-new-to-known` | Add explicit links between new items and existing cues in a small graph |
| 46 | *Learn Like a Pro* — Barbara Oakley and Olav Schewe (2021) | `bk-pro-feedback-target` | Choose feedback that distinguishes two possible error rules |
| 47 | *How to Take Smart Notes* — Sonke Ahrens (2017) | `bk-notes-links-not-piles` | Compare retrieval through explicit links with searching disconnected notes |
| 48 | *The Extended Mind* — Annie Murphy Paul (2021) | `bk-extended-external-state` | An external record changes which toy sequence can be reconstructed |
| 49 | *The Organized Mind* — Daniel J. Levitin (2014) | `bk-organized-offload-buffer` | Move explicit pending items from a limited buffer to a visible external queue |
| 50 | *The Distracted Mind* — Adam Gazzaley and Larry D. Rosen (2016) | `bk-distracted-switching-budget` | Disclosed switch costs consume a fixed task budget |
| 51 | *Deep Work* — Cal Newport (2016) | `bk-deep-unbroken-block` | A task with setup time fits differently into contiguous and split intervals |
| 52 | *Digital Minimalism* — Cal Newport (2019) | `bk-digital-attention-allocation` | Reassign a fixed set of time tokens and compare selected-goal coverage |
| 53 | *Hyperfocus* — Chris Bailey (2018) | `bk-hyperfocus-salience-filter` | A salience filter misses a low-salience target even when it is relevant |
| 54 | *Indistractable* — Nir Eyal (2019) | `bk-indistractable-cue-access` | An extra explicit action changes which distractions fit a fixed action budget |
| 55 | *Drive* — Daniel H. Pink (2009) | `bk-drive-proxy-reward` | Rewarding a measurable proxy can redirect a toy policy from the real objective |
| 56 | *Punished by Rewards* — Alfie Kohn (1993) | `bk-rewards-metric-gaming` | Change a toy reward function and see which behavior becomes optimal |
| 57 | *The Invisible Gorilla* — Christopher Chabris and Daniel Simons (2010) | `bk-gorilla-selection-rule` | A specified counting rule ignores an event outside its selected class |
| 58 | *You Are Not So Smart* — David McRaney (2011) | `bk-smart-sunk-cost-boundary` | A past cost does not change two future payoff comparisons |
| 59 | *How Minds Change* — David McRaney (2022) | `bk-minds-sampling-representatives` | A sample selected for extremity distorts an explicit population picture |
| 60 | *The Knowledge Illusion* — Steven Sloman and Philip Fernbach (2017) | `bk-knowledge-missing-mechanism` | A complete causal chain needs the missing intermediate link |
| 61 | *Mistakes Were Made (But Not by Me)* — Carol Tavris and Elliot Aronson (2007) | `bk-mistakes-selective-evidence` | Selective acceptance of records can reinforce a toy belief despite contrary data |
| 62 | *On Being Certain* — Robert A. Burton (2008) | `bk-certain-confidence-score` | Confidence and correctness are separate columns in an invented prediction table |
| 63 | *Superforecasting* — Philip E. Tetlock and Dan Gardner (2015) | `bk-forecast-proper-score` | Compare probability forecasts using an explicit squared-error score |
| 64 | *The Wisdom of Crowds* — James Surowiecki (2004) | `bk-crowds-correlated-errors` | Independent and shared error behave differently under averaging |
| 65 | *Range* — David Epstein (2019) | `bk-range-transfer-rule` | A surface match and a structural match transfer differently on an original rule task |
| 66 | *Grit* — Angela Duckworth (2016) | `bk-grit-product-assumption` | A multiplicative effort-skill toy differs from an additive toy; neither proves human outcomes |
| 67 | *Peak* — Anders Ericsson and Robert Pool (2016) | `bk-peak-feedback-discriminates` | Targeted feedback separates two explicit practice policies |

### science-history

| # | Book — author (candidate year) | Reserved slug | Candidate test, to be narrowed by strand CM |
|---|---|---|---|
| 68 | *The Black Swan* — Nassim Nicholas Taleb (2007) | `bk-swan-unseen-regime-change` | A long stable toy record cannot rule out a stipulated regime change |
| 69 | *The Evolution of Cooperation* — Robert Axelrod (1984) | `bk-cooperation-one-error` | A single mistaken action changes repeated strategy payoffs |
| 70 | *Factfulness* — Hans Rosling, Ola Rosling and Anna Rosling Ronnlund (2018) | `bk-fact-middle-of-distribution` | A two-group display hides a supplied middle-heavy toy distribution |
| 71 | *The Signal and the Noise* — Nate Silver (2012) | `bk-signal-overfit-validation` | A curve that fits supplied training points can miss held-out points |
| 72 | *Thinking in Systems* — Donella H. Meadows (2008) | `bk-systems-delay-control` | A delayed response can overshoot an explicit target in a toy controller |
| 73 | *Silent Spring* — Rachel Carson (1962) | `bk-spring-selection-resistance` | Differential survival changes trait frequency in a disclosed toy population |
| 74 | *The Selfish Gene* — Richard Dawkins (1976) | `bk-gene-frequency-dependent` | A strategy's payoff changes with the frequency of other strategies |
| 75 | *The Blind Watchmaker* — Richard Dawkins (1986) | `bk-watchmaker-cumulative-retention` | Retaining partial matches differs from restarting a whole toy search |
| 76 | *Climbing Mount Improbable* — Richard Dawkins (1996) | `bk-climbing-small-valid-steps` | A sequence of feasible local changes reaches a state unavailable in one bounded jump |
| 77 | *The Extended Phenotype* — Richard Dawkins (1982) | `bk-phenotype-external-effect` | Move a trait's effect outside the toy agent and recompute its explicit payoff |
| 78 | *Wonderful Life* — Stephen Jay Gould (1989) | `bk-wonderful-contingent-branches` | An early stipulated branching event changes which later outcomes remain possible |
| 79 | *The Song of the Dodo* — David Quammen (1996) | `bk-dodo-fragmented-habitat` | Equal total area with different explicit connectivity yields different reachable cells |
| 80 | *The Theory of Island Biogeography* — Robert H. MacArthur and Edward O. Wilson (1967) | `bk-island-arrival-loss-balance` | Immigration and loss curves intersect at a toy equilibrium |
| 81 | *The Diversity of Life* — Edward O. Wilson (1992) | `bk-diversity-species-area-model` | An explicitly assumed species-area exponent changes area-loss estimates |
| 82 | *On the Origin of Species* — Charles Darwin (1859) | `bk-origin-selection-frequencies` | Different reproductive weights change a toy trait's frequency across generations |
| 83 | *On Growth and Form* — D'Arcy Wentworth Thompson (1917) | `bk-growth-surface-volume` | Doubling linear size changes surface and volume by different factors |
| 84 | *Scale* — Geoffrey West (2017) | `bk-scale-exponent-boundary` | Changing a fitted exponent changes extrapolation far beyond the toy observations |
| 85 | *Sync* — Steven Strogatz (2003) | `bk-sync-coupling-threshold` | Coupling and frequency mismatch compete in a disclosed phase model |
| 86 | *Linked* — Albert-Laszlo Barabasi (2002) | `bk-linked-hub-removal` | Targeted and random removal have different effects on an original small network |
| 87 | *Six Degrees* — Duncan J. Watts (2003) | `bk-degrees-shortcut-paths` | One shortcut changes shortest paths in a small toy ring |
| 88 | *Networks* — Mark E. J. Newman (2010) | `bk-networks-degree-versus-bridge` | The highest-degree node need not be the critical connection between two groups |
| 89 | *The Information* — James Gleick (2011) | `bk-information-repeated-messages` | Equal-length messages can have different redundancy under an explicit coding rule |
| 90 | *Code* — Charles Petzold (1999) | `bk-code-carry-chain` | A one-bit change can propagate through a binary carry chain |
| 91 | *Algorithms to Live By* — Brian Christian and Tom Griffiths (2016) | `bk-algorithms-cache-change` | The best cache rule depends on the supplied access sequence |
| 92 | *QED* — Richard P. Feynman (1985) | `bk-qed-add-amplitudes` | Adding signed toy amplitudes differs from adding their squared sizes |
| 93 | *Six Easy Pieces* — Richard P. Feynman (1994) | `bk-pieces-energy-reference` | Changing a potential-energy reference leaves an explicitly computed difference unchanged |
| 94 | *The Character of Physical Law* — Richard P. Feynman (1965) | `bk-law-symmetry-shift` | Shift every coordinate and compare an invariant distance-based toy rule |
| 95 | *A Brief History of Time* — Stephen Hawking (1988) | `bk-time-light-cone-budget` | An explicit finite signal speed limits which toy event can be reached |
| 96 | *Cosmos* — Carl Sagan (1980) | `bk-cosmos-scale-compression` | Compress a supplied timeline and compare relative intervals |
| 97 | *Pale Blue Dot* — Carl Sagan (1994) | `bk-pale-angular-size` | Apparent angular size changes with object size and distance in a labelled small-angle model |
| 98 | *The Order of Time* — Carlo Rovelli (2018) | `bk-order-clock-comparison` | Two prescribed clock rates accumulate different elapsed readings |
| 99 | *Chaos* — James Gleick (1987) | `bk-chaos-nearby-trajectories` | Two nearby starting points can diverge under a deterministic toy map |
| 100 | *The Drunkard's Walk* — Leonard Mlodinow (2008) | `bk-drunkard-streak-and-rate` | The same total successes can be arranged into different streak patterns |

