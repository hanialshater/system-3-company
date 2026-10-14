# Life Hacks scope: the category lens (strands)

author: cm-lifehacks (Tess) · written 2026-10-14 · question: if Life Hacks should be as broad as WikiHow or Mawdoo3, what are its sub-areas (strands), what goes in each, how does PR #2's 200-lesson collection fall across them, and who owns a topic another category already teaches? · status: **proposal**. It does not change `content/curriculum/lifehacks.json` yet; the strand ids below become a `strand` field on concepts only after the founder or head of product accepts the shape. Nothing here is learner evidence: no learner has seen a Life Hacks lesson, and every demand number is an estimate.

Inputs: charter `company/domains/lifehacks.md`; curriculum `content/curriculum/lifehacks.json` (15 concepts); briefs `company/domains/briefs/lifehacks.md` (first 5); `company/product/demo-standard.md`; `company/design/formats.md`; the research lens (`research.md`, WikiHow's 19 categories and Mawdoo3's topics, mostly from search summaries) and the vertical lens (`vertical.md`, the F1–F4 fit test); the other categories' curricula and their existing lessons (`src/demos/*/*/meta.json`); and PR #2 (`origin/codex/lifehacks-200`, `content/collections/lifehacks-200.json`), read as data. **Limit:** I mapped PR #2 from its manifest (slug, title, group) only. I have not run `npm run walkthrough` on any of its lessons, so every PR verdict below is a triage from titles and must be confirmed by an evaluator who sees the artifact first.

## 1. The rule that defines a strand

A strand is a part of everyday life where people (a) search for how to do something, (b) face a choice between methods, and (c) the winner can be shown by a mechanism we can source. It is **not** a mechanism (that is what physics, chemistry and economics are organised by). A strand is named after the room or the moment the learner is in, so the feed can say "Kitchen" or "Before an exam", the way WikiHow says "Home and Garden".

Cross-cutting, not a strand: **Debunk** (format `Debunk`, `company/design/formats.md`). Any strand can carry a debunk lesson. Target: at least 1 in 4 lessons in each strand is a debunk, because "does this viral hack work?" is our sharpest hook (charter).

Strand ids are short so they can sit in `curriculum` and `meta.json`: `kitchen`, `cleaning`, `laundry`, `fix`, `storage`, `energy`, `shopping`, `study`, `time`, `digital`, `travel`, `garden`.

Demand scale (same as the curriculum, 1 low to 3 high). Basis: WikiHow and Mawdoo3 prominence plus how-to search patterns in `research.md` (medium confidence at best; the research lens could not open either site directly). Safety class per the charter: **none**, **warning**, or **review** (Life Hacks safety reviewer before any brief is claimed).

## 2. The strands

### S1 `kitchen`: Kitchen and food
- **Scope.** Heat, cold, salt, water, storage and timing in home cooking: why a method gives a better or faster result. Not recipes (taste), not nutrition or diet claims (health, refused), not food-safety rules that vary by country without an International flag.
- **WikiHow / Mawdoo3 match.** Food and Entertaining; Mawdoo3's مطبخ (cooking), its largest how-to core.
- **Lesson ideas with a checkable why.**
  - Salt plus ice chills a can faster than ice alone (freezing-point depression; the ice-salt slurry is colder than 0 °C; textbook colligative properties).
  - Rest the steak: the centre keeps rising after it leaves the pan (carry-over cooking; conduction from the hotter outer layer; USDA FSIS rest-time guidance).
  - A lid on the pot boils water sooner (evaporative heat loss; measurable on the stage as energy per minute).
  - Boil only the water you need (energy ∝ mass × ΔT; specific heat of water).
  - Hot tap water on a stuck metal lid (differential thermal expansion of metal and glass; published expansion coefficients).
  - Debunk: "searing seals in the juices" (it does not; the classic test is weight loss of seared vs unseared meat, McGee, *On Food and Cooking*).
- **Formats.** Storyboard / scrub (temperature over time), Before / after toggle, Debunk.
- **Demand.** 3 (top WikiHow and Mawdoo3 area). **Safety:** review, every lesson (heat and food).
- **PR #2 lessons here: 4** (all from `resources`): `lh-scale-recipe-portions`, `lh-capacity-batch-count`, `lh-double-container-radius`, `lh-turn-container-volume`. All four are container or portion arithmetic; none touches heat, cold or food behaviour. The highest-demand strand is effectively empty in the PR.

### S2 `cleaning`: Cleaning and stains
- **Scope.** Why a cleaning method works: dwell time, dilution, temperature, agitation, surfactants, absorbent materials, and which surface a product suits. **Refused:** mixing chemicals of any kind (bleach with acids or ammonia and similar), and anything that could be read as a mixing recipe.
- **WikiHow / Mawdoo3 match.** Home and Garden → Housekeeping; Mawdoo3 home and self-care pages.
- **Lesson ideas with a checkable why.**
  - Blot, do not rub, a fresh spill (rubbing spreads the stain over more fibre; capillary wicking; textile care guidance such as the Carpet and Rug Institute).
  - Let the spray sit before wiping (disinfectant label contact times; US EPA List N contact-time column).
  - Cold water first on a protein stain (heat denatures and sets protein; textbook protein chemistry, detergent manufacturer guidance).
  - Microfibre vs cotton cloth (fibre diameter and surface area; published microfibre studies, e.g. the UC Davis Medical Center study on microfibre mops).
  - Debunk: "vinegar plus baking soda is a super cleaner" (they neutralise each other into salt water and CO₂; stoichiometry on the stage, no mixing recipe given). Safety reviewer decides whether even this framing is allowed.
- **Formats.** Before / after toggle, Side-by-side comparison, Debunk.
- **Demand.** 3. **Safety:** review, every lesson.
- **PR #2 lessons here: 0.**

### S3 `laundry`: Laundry, clothes and knots
- **Scope.** Drying, folding, shrinking, stretching, sorting, and the knots and laces of clothing. The textile physics people meet every week.
- **WikiHow / Mawdoo3 match.** Home and Garden → Laundry; Personal Care and Style → Clothing.
- **Lesson ideas with a checkable why.**
  - Spread the towel, it dries first (exposed area; brief #1, already written).
  - The bow that stays tied (square vs granny bow; Daily-Diamond et al. 2017; brief #4, already written).
  - Hang a wet jumper or lay it flat (weight concentrated at the shoulders stretches knit; manufacturer care labels and ISO 3758 care symbols).
  - Why wool shrinks in a hot wash and cotton barely does (felting from scale structure and agitation; textile science references).
  - A dryer ball or a dry towel in the drum (debunk candidate: test what the claim predicts against drum airflow and published tests, if a source exists; drop if none).
- **Formats.** Before / after toggle, Side-by-side comparison, Single card.
- **Demand.** 2–3. **Safety:** none for drying and knots; warning for anything near a heater or tumble dryer.
- **PR #2 lessons here: 21** (all `home`). Drying alone takes **10**: `towel-spread-dries-first`, `breeze-is-not-extra-surface`, `drying-room-water-load`, `garment-overlap-hides-face`, `half-size-two-towels`, `humidity-evaporation-gap`, `laundry-gap-air-path`, `towel-over-two-bars`, `towel-thickness-hidden-volume`, `wetter-cloth-more-water`. Others: `care-label-first-choice`, `elastic-loop-release`, `file-fold-see-each-shirt`, `fitted-sheet-corners-nest`, `folded-shirt-stack-height`, `laundry-sort-before-walk`, `long-cord-knots-itself`, `sock-pairing-by-pattern`, `sock-pairs-not-all-combinations`, `square-bow-stays-tied`, `wet-knit-hang-stretch`. Ten lessons on one concept breaks the charter rule "no more than two lessons on one concept until every demand-3 concept has one". Keep 2 (the brief-#1 lesson and one humidity/airflow lesson); the rest are candidates to merge into those two as stage variants.

### S4 `fix`: Fixes, tools and measuring (DIY)
- **Scope.** Small repairs and making things fit: levers, friction, levelling, measuring and marking, cutting allowances, hanging and fixing. **Refused:** electrical work beyond changing a bulb or resetting a breaker; gas; anything that defeats a safety device; structural work.
- **WikiHow / Mawdoo3 match.** Home and Garden → Home Repair; Hobbies and Crafts (measuring, cutting).
- **Lesson ideas with a checkable why.**
  - Turn a wobbly table, less than a quarter turn (brief #3; Martin 2007, Baritompa et al. 2007).
  - Check a frame is square by its diagonals (equal diagonals of a parallelogram imply a rectangle; the 3-4-5 rule; geometry derivation on the stage).
  - Measure twice: why the tape hook moves (the hook slides by its own thickness for inside vs outside measures; tape manufacturer documentation).
  - A longer spanner loosens the stuck nut (torque = force × lever arm; see the overlap rule: physics owns the principle).
  - Soap or wax on a sticking drawer or a stuck zip (friction coefficient of lubricated vs dry wood; tribology reference).
- **Formats.** Single card, Side-by-side comparison.
- **Demand.** 2–3 ("how to fix" is the largest how-to search family, `research.md` §3). **Safety:** none for measuring; review for tools.
- **PR #2 lessons here: 22.** From `home` (14): `cm-to-inches`, `margin-before-cut`, `measure-diagonal-for-square`, `measure-inside-not-outside`, `ruler-start-not-zero`, `tape-mark-same-spacing`, `wobbly-table-quarter-turn`, `weight-spread-on-table`, `heavy-book-close-to-back`, `spacer-protects-clearance`, `resize-photo-frame-ratio`, `coiled-cord-bend-radius`, `wrapping-paper-minimum-area`, `ribbon-around-box-length`. From `resources` (8): `lh-area-scales-square`, `lh-around-versus-across`, `lh-coverage-whole-cans`, `lh-each-cut-allowance`, `lh-material-reuse-account`, `lh-offcuts-not-one-piece`, `lh-overlap-material-area`, `lh-subtract-openings-area`. Several are a unit fact or arithmetic with no popular wrong method (`cm-to-inches`, `ruler-start-not-zero`); they fail the vertical lens's F1 (choice) test.

### S5 `storage`: Storage, organising and moving house
- **Scope.** Where things go and whether they fit: shelves, drawers, boxes, getting furniture through doors, finding things. The mechanisms are geometry and search cost.
- **WikiHow / Mawdoo3 match.** Home and Garden → Organisation, Moving.
- **Lesson ideas with a checkable why.**
  - The sofa that will not go through the door, until you tilt it (the "moving sofa"/piano-mover's problem; the diagonal clearance is Pythagoras; derivation on the stage).
  - Round containers waste a fixed share of a shelf (circle packing in a square grid leaves 1 − π/4 ≈ 21.5%; derivation).
  - A fixed spot for your keys (search cost falls when the address is fixed; the claim needs a source on misplaced-item search, or it stays a derivation and is labelled as one).
  - Debunk: "vacuum bags save space in the cupboard" (they cut volume, not mass; the bag still weighs the same for a suitcase allowance).
- **Formats.** Single card, Before / after toggle.
- **Demand.** 2. **Safety:** none (warning for lifting heavy items).
- **PR #2 lessons here: 26** (all `home`): `alphabet-sort-search`, `box-handle-clearance`, `circle-tray-square-corners`, `desk-supply-near-use`, `door-swing-clearance`, `drawer-divider-cost`, `duplicates-two-stations`, `flat-pack-volume-dimensions`, `furniture-through-door`, `group-cables-with-ends`, `keys-fixed-drop-zone`, `labels-specific-address`, `lids-match-by-size`, `mug-handle-packing`, `nested-box-retrieval`, `pillowcase-set-kit`, `rectangular-bin-nesting`, `round-box-leftover-gap`, `rug-chair-pullback`, `seasonal-bin-rotation`, `shelf-front-labels`, `shelf-gap-wasted-height`, `small-items-in-mesh`, `sofa-diagonal-room`, `transparent-box-visibility`, `trays-slide-out-reach`. This is the PR's most over-supplied strand relative to demand (26 lessons at demand 2). Many are tidy-up advice whose "why" is common sense rather than a checkable mechanism (`shelf-front-labels`: "a label behind a box is hidden").

### S6 `energy`: Energy and water at home
- **Scope.** What appliances, heating, showers and leaks cost in kWh and litres, and which habit changes the number. Arithmetic on rated power and time. Money figures use stated example tariffs and are flagged for International (tariffs, plugs and voltages vary).
- **WikiHow / Mawdoo3 match.** Home and Garden → Energy saving; Finance → household bills.
- **Lesson ideas with a checkable why.**
  - What standby really costs in a year (W × 8,760 h; measured standby figures from IEA or national energy agencies).
  - Kettle vs oven vs microwave for one cup (energy to heat the mass of water vs the mass of the appliance; manufacturer ratings).
  - A dripping tap over a year (drops per minute × drop volume; water utility estimates).
  - A short hot shower vs a bath (flow rate × time vs bath volume; national water-efficiency labels).
  - Debunk: "turning the heating up high warms the room faster" (a thermostat sets the target, not the rate, for most systems; heating-system manufacturer and energy-agency guidance).
- **Formats.** Single card, Storyboard / scrub (a year accumulating), Debunk.
- **Demand.** 3 (energy bills; also a concept on the current map: `standby-power-cost`, `boil-less-water`). **Safety:** warning (no work on appliances; arithmetic only).
- **PR #2 lessons here: 13** (all `resources`): `lh-annual-label-cost`, `lh-duty-cycle-energy`, `lh-fixed-energy-charge`, `lh-fixed-volume-fill`, `lh-flow-duration-offset`, `lh-flow-times-minutes`, `lh-idle-versus-active`, `lh-purchase-plus-running`, `lh-same-energy-new-tariff`, `lh-small-leak-large-duration`, `lh-standby-days-add-up`, `lh-water-meter-units`, `lh-watts-hours-trade`. Good fit in kind; heavy overlap with physics (`kettle-vs-bulb-kwh`) and economics (`cheap-printer-dear-ink`), see §4.

### S7 `shopping`: Shopping, bills and sharing costs
- **Scope.** Arithmetic at the shelf, the checkout and the split bill: unit price, discounts, coupons, bundles, delivery fees, rounding, fair shares. **Refused:** financial recommendations (which product, card, loan or investment to choose). Arithmetic only, as the charter says.
- **WikiHow / Mawdoo3 match.** Finance and Business → Personal finance (the arithmetic half only); Mawdoo3 مال وأعمال.
- **Lesson ideas with a checkable why.**
  - The big pack can cost more per gram (unit price; this is economics' `unit-price-aisle`, see §4).
  - "20% off, then 10% off" is not 30% off (multiplicative discounts; derivation).
  - The free-shipping threshold: is adding an item cheaper than the fee? (break-even arithmetic).
  - Split the bill by what people ordered or evenly (weighted average; derivation).
  - "Buy 2, get 1 free" vs "33% off" (effective price per item; derivation).
- **Formats.** Side-by-side comparison, Single card.
- **Demand.** 3 for unit price and discounts; 2 for the rest. **Safety:** review (money).
- **PR #2 lessons here: 35** (all `resources`), the largest strand: `lh-align-price-units`, `lh-big-pack-price`, `lh-billing-rounds-hours`, `lh-buy-only-stock-gap`, `lh-cents-euros-conversion`, `lh-committed-stock`, `lh-count-before-dispatch`, `lh-count-sheets-not-rolls`, `lh-deposit-checkout-net`, `lh-discount-round-trip`, `lh-duplex-sheet-rounding`, `lh-fixed-coupon-percent`, `lh-free-shipping-gap`, `lh-indivisible-shares`, `lh-jug-rounding-extra`, `lh-lead-time-stock`, `lh-merge-overlapping-lists`, `lh-parcel-fee-repeats`, `lh-pay-for-used-quantity`, `lh-percentage-overage`, `lh-pool-spare-stock`, `lh-reuse-cost-per-use`, `lh-round-lines-versus-total`, `lh-round-replenishment`, `lh-round-snack-packs`, `lh-sequential-discounts`, `lh-split-order-fixed-fee`, `lh-ticket-bundle-unused`, `lh-two-for-one-boundary`, `lh-use-deadline-tickets`, `lh-visit-fee-crossover`, `lh-voucher-minimum`, `lh-weighted-bill-share`, `lh-weighted-unit-average`, `lh-weighted-volume-allocation`. Four of them are stock-keeping for a shop or warehouse, not a household (`lh-committed-stock`, `lh-count-before-dispatch`, `lh-lead-time-stock`, `lh-pool-spare-stock`): out of the Life Hacks audience. At least six duplicate existing economics or math lessons (§4).

### S8 `study`: Study and memory
- **Scope.** How people learn and remember: spacing, retrieval, interleaving, worked examples, flashcards, note-taking, test anxiety framed as method (not as health). Strong literature (Dunlosky et al. 2013). No other category teaches human memory, so Life Hacks owns it until a psychology category exists.
- **WikiHow / Mawdoo3 match.** Education and Communications → Studying; Mawdoo3 تعليم. In Arabic, exam season is a top search driver (`research.md` §3, medium).
- **Lesson ideas with a checkable why.**
  - Same hours, different calendar: spacing beats cramming (brief #2; Cepeda et al. 2006).
  - Test yourself, do not reread (testing effect; Roediger & Karpicke 2006).
  - Mix problem types instead of blocking them (interleaving; Rohrer & Taylor 2007).
  - Highlighting feels like studying (rated "low utility", Dunlosky et al. 2013) — debunk.
  - Debunk: "learning styles" (matching teaching to a preferred style does not improve learning; Pashler, McDaniel, Rohrer & Bjork 2008).
- **Formats.** Storyboard / scrub (forgetting over days), Side-by-side comparison, Debunk.
- **Demand.** 3. **Safety:** none (no sleep, stimulant or "brain health" claims; those move to a later, reviewed brief).
- **PR #2 lessons here: 12** (from `study`): `apply-not-quote`, `check-confidence-with-output`, `cover-before-recall`, `cue-needs-a-boundary`, `explain-the-link`, `keep-the-error-feedback`, `note-gap-check`, `one-question-one-card`, `rebuild-the-procedure`, `reverse-the-flashcard`, `separate-confusable-pairs`, `spaced-beats-cram`. Only 12 of the PR's 70 "study" lessons are about studying; the other 58 are workplace planning and software use (S9, S10). The name of the group overstates our study coverage. Interleaving and the learning-styles debunk, both high demand and well sourced, are missing.

### S9 `time`: Time, planning and getting things done
- **Scope.** Planning a day, a week or a deadline: estimates, buffers, ordering tasks, batching, interruptions. Evidence is mixed here (the charter already doubts the two-minute rule), so every lesson needs a published study or a derivation it can show; "productivity tips" with no source do not qualify.
- **WikiHow / Mawdoo3 match.** Work World; Education → Time management.
- **Lesson ideas with a checkable why.**
  - We underestimate how long tasks take (planning fallacy; Buehler, Griffin & Ross 1994).
  - Leave when you must, not when the event starts: work back from the arrival time (arithmetic; a timeline on the stage).
  - Switching between tasks costs time (task-switching cost; Rubinstein, Meyer & Evans 2001; Monsell 2003).
  - Do short homework first or the due-soonest first? (queueing: shortest-first minimises average wait, earliest-deadline-first minimises lateness; CS owns the algorithms, §4).
- **Formats.** Storyboard / scrub, Side-by-side comparison, Simulation run (queues).
- **Demand.** 2. **Safety:** none.
- **PR #2 lessons here: 32** (from `study`): `agenda-needs-an-outcome`, `arrival-is-not-departure`, `batch-by-setup`, `buffer-for-a-late-finish`, `bug-report-needs-reproduction`, `calendar-needs-travel`, `choose-the-metric-first`, `count-setup-in-the-block`, `deadline-needs-a-reference`, `delegate-the-whole-handoff`, `dependency-before-priority`, `do-not-starve-the-long-job`, `earliest-deadline-first`, `estimate-a-range`, `fit-before-fixed-slot`, `fragmented-time-does-not-fit`, `handoff-after-finish`, `handoff-needs-a-checkpoint`, `include-the-wrap-up`, `make-a-question-answerable`, `meeting-and-preparation`, `name-the-next-owner`, `one-person-two-jobs`, `record-the-reason`, `request-needs-the-object`, `reserve-an-unassigned-slot`, `separate-ready-from-blocked`, `short-jobs-clear-a-queue`, `status-and-blocker-differ`, `unlock-the-following-work`, `work-back-from-a-deadline`, `work-in-process-limit`. About half are office team process (handoffs, owners, bug reports, meeting agendas). They fit WikiHow's Work World but not a home or student learner, and few have a published study behind them. They need a decision: a `work` sub-strand, or out of scope (my recommendation: out, until Work World has its own demand signal).

### S10 `digital`: Phones, files and digital habits
- **Scope.** The durable ideas behind everyday computer and phone use: battery charging, storage, backups, passwords, search operators, file naming. **Exclude** UI-specific procedures (menu paths change with each version; the claims rot, `vertical.md` §4).
- **WikiHow / Mawdoo3 match.** Computers and Electronics (one of WikiHow's largest categories); Mawdoo3 تقنية.
- **Lesson ideas with a checkable why.**
  - Debunk: "let your phone battery drain to 0% before charging" (wrong for lithium-ion; partial cycles are gentler; Battery University and manufacturer guidance such as Apple's battery pages).
  - One backup is not a backup (3-2-1 rule; the probability two independent copies fail together; US-CERT guidance).
  - Name files 2026-10-14, not 14-10-2026 (ISO 8601 sorts correctly as text; derivation on the stage).
  - A passphrase beats a short complex password (search space; CS owns it as `four-words-beat-eight-letters`, §4).
- **Formats.** Single card, Before / after toggle, Debunk.
- **Demand.** 3 for phone and battery; 2 for files. **Safety:** warning for batteries (heat); none otherwise.
- **PR #2 lessons here: 26** (from `study`): `copy-keeps-the-original`, `cut-moves-the-selection`, `deleted-is-a-search-state`, `duplicate-before-experiment`, `equal-names-not-equal-files`, `file-modified-not-created`, `file-type-then-owner`, `find-next-is-navigation`, `iso-date-filename-sort`, `link-label-names-the-target`, `mail-exact-phrase`, `mail-minus-noise`, `mail-or-vs-and`, `plain-text-paste-scope`, `preview-replace-all`, `project-prefix-filenames`, `search-the-document-body`, `select-before-replace`, `selection-not-focus`, `shorter-folder-path`, `show-the-file-extension`, `size-is-not-recency`, `tags-are-not-copies`, `undo-then-redo`, `version-nine-and-ten`, `zoom-does-not-rewrite`. Most are software-UI behaviour (cut vs copy, find-next, zoom, paste-as-plain-text): the "why" is "that is how the editor works", which is checkable only per application and version. `iso-date-filename-sort`, `version-nine-and-ten` (text sort vs number sort) and the mail-search operators are durable and fit. Batteries, backups and phone storage, the high-demand part, are missing.

### S11 `travel`: Travel, packing and getting around
- **Scope.** Packing, luggage limits, journey timing, and basic bike and car care that is not a repair (tyre pressure, load, braking distance as a decision). Region-specific rules (airline limits, road rules) flagged for International.
- **WikiHow / Mawdoo3 match.** Travel; Cars and Other Vehicles; Mawdoo3 سياحة وسفر.
- **Lesson ideas with a checkable why.**
  - Roll or fold in a suitcase? (rolling does not reduce cloth volume; it removes air gaps and creases differently; concept `packing-rolling-vs-folding` on the map; needs a published test or a stage derivation).
  - The bag is under the size limit but over the weight limit (mass vs volume; airline published limits as examples).
  - A soft tyre costs fuel and grip (rolling resistance rises as pressure falls; tyre manufacturer and national road-safety guidance). Safety review.
  - Window seat to sleep, aisle to stretch? (taste; **drop**: no checkable why). Kept here as an example of what fails the test.
- **Formats.** Before / after toggle, Single card.
- **Demand.** 2. **Safety:** none for packing; review for vehicles.
- **PR #2 lessons here: 9** (from `home`): `bag-weight-before-volume`, `jacket-last-first`, `packing-cube-walls`, `rolled-or-folded-volume`, `shoes-opposite-ends`, `socks-use-shoe-space`, `suitcase-layer-access`, `suitcase-rotate-block`, `tote-balance-sides`. All packing; nothing on journeys or vehicles.

### S12 `garden`: Plants, garden and outdoors (later)
- **Scope.** Watering, light, soil, keeping cut flowers, keeping food fresh outdoors. Pets go to a later strand only after the safety reviewer agrees an approach (pet health is close to the refused medical list).
- **WikiHow / Mawdoo3 match.** Home and Garden → Gardening; Mawdoo3 حيوانات ونباتات.
- **Lesson ideas with a checkable why.** Water in the morning, not at noon (evaporation loss vs leaf temperature; agricultural extension services); cut flower stems at an angle under water (air embolism in xylem; horticulture extension); debunk: "a coin or aspirin in the vase keeps flowers fresh" (test against extension-service trials; drop if no source).
- **Formats.** Storyboard / scrub, Debunk.
- **Demand.** 1–2 (higher in English than in Arabic, inference). **Safety:** review for garden chemicals.
- **PR #2 lessons here: 0.**

## 3. PR #2 across the strands

| Strand | Demand | PR #2 lessons (from home / study / resources) | Fit, from titles only |
|---|---|---|---|
| S1 kitchen | 3 | 4 (0 / 0 / 4) | under-supplied; nothing on heat or food |
| S2 cleaning | 3 | 0 | empty |
| S3 laundry | 2–3 | 21 (21 / 0 / 0) | 10 on one concept (drying) |
| S4 fix | 2–3 | 22 (14 / 0 / 8) | several unit facts with no choice |
| S5 storage | 2 | 26 (26 / 0 / 0) | over-supplied for demand |
| S6 energy | 3 | 13 (0 / 0 / 13) | fits; overlaps physics and economics |
| S7 shopping | 3 | 35 (0 / 0 / 35) | largest; 4 are shop stock-keeping; ≥ 6 duplicate economics/math |
| S8 study | 3 | 12 (0 / 12 / 0) | only 12 of 70 "study" are study |
| S9 time | 2 | 32 (0 / 32 / 0) | about half are office team process |
| S10 digital | 2–3 | 26 (0 / 26 / 0) | mostly UI behaviour; batteries and backups missing |
| S11 travel | 2 | 9 (9 / 0 / 0) | packing only |
| S12 garden | 1–2 | 0 | empty (deferred anyway) |
| **Total** | | **200** (70 / 70 / 60) | |

What the shape says (medium confidence; from titles, not walkthroughs):
1. **The PR is weighted away from demand.** The three demand-3 strands with the most WikiHow and Mawdoo3 traffic (kitchen, cleaning, study) hold 16 of the 200. Storage, time and shopping arithmetic hold 93. The likely reason is sensible: those three strands need safety review, which the PR could not get, so the collection went where the safety class is "none". That is a constraint to plan around (a safety-review budget per cycle), not a reason to accept the skew.
2. **Concept discipline is missing.** The PR uses one concept per lesson (`concept` equals `slug` for 195 of the 200), so the curriculum's "two lessons per concept" rule cannot see that 10 lessons teach drying by surface area. Before any of the 200 move toward publishing, each needs a real concept id from `content/curriculum/lifehacks.json` (new concepts proposed by cm-lifehacks), plus a strand.
3. **Many fail the hack test.** A Life Hacks lesson needs a popular wrong method (vertical lens, F1). "An inch is exactly 2.54 cm", "Subtract the starting mark", "Find does not edit" have no tempting wrong answer most people hold. My rough triage of the 200 by title: about 60 fit a strand as they are, about 40 are variants to merge into a sibling, about 30 belong to another category (§4), about 70 lack a choice, a source or a home audience. **These counts are a guess from titles** and are for the evaluators to replace with findings.

## 4. Overlaps with existing categories, and who owns what

**Ownership rule (proposed).** The category that teaches the *mechanism* owns the concept. Life Hacks owns a lesson only when the hook is a household decision or a popular hack, the stage tests that decision, and the reveal names the science concept through `also` (`company/product/lesson-metadata.md`). If a Life Hacks lesson would teach the same insight as an existing lesson with a different backdrop, the existing lesson wins and the Life Hacks one is dropped or rewritten. Test question: is the learner asking "why does the world do this?" (science category) or "which should I do?" (Life Hacks)?

| Topic | Existing lesson or concept | PR #2 / curriculum item | Owner | Why |
|---|---|---|---|---|
| Unit price | economics `unit-price-aisle` (published), concept `unit-pricing` | curriculum `unit-price-shopping`; PR `lh-big-pack-price`, `lh-align-price-units` | **economics** | Same insight, already published. Life Hacks retires `unit-price-shopping` as a concept or makes it a shelf-label variant with `also: economics/unit-pricing` |
| Stacked discounts | economics `twenty-then-ten-off` (review); math `fifty-up-fifty-down` | PR `lh-sequential-discounts`, `lh-discount-round-trip` | **economics / math** | Same insight |
| Running cost | economics `cheap-printer-dear-ink` (published), `total-cost-of-ownership` | PR `lh-purchase-plus-running`, `lh-reuse-cost-per-use` | **economics** | Same insight |
| Break-even on fees | economics `break-even-cups` (review) | PR `lh-visit-fee-crossover`, `lh-free-shipping-gap` | **economics** for the concept; Life Hacks may keep free-shipping as a checkout decision | Free shipping is a distinct trap (adding items to save a fee) |
| Averages of purchases | economics `same-dollars-more-shares` (published) | PR `lh-weighted-unit-average` | **economics** | Same mechanism |
| kW vs kWh | physics `kettle-vs-bulb-kwh` (review), `power-vs-energy` | PR `lh-watts-hours-trade`, `lh-duty-cycle-energy`; curriculum `standby-power-cost`, `boil-less-water` | **physics** for kW vs kWh; **Life Hacks** for "what standby costs you a year" and "boil only what you need" | The yearly household number and the habit are the hack; the unit distinction is physics |
| Heat capacity of water | chemistry `same-heat-different-rise` (published) | curriculum `boil-less-water` | **Life Hacks** (the habit), `also: chemistry/heat-capacity-water` | Different insight: mass of water heated, not specific heat |
| Salt lowers freezing | chemistry `salt-ions-count-double` (review), `freezing-point-depression` | curriculum `salt-lowers-freezing` | **chemistry** for road salt and ions; **Life Hacks** for "ice plus salt chills a drink faster" | The chilled-drink method is the hack; the ion count is chemistry |
| Evaporation, surface area, humidity | chemistry `the-fast-ones-leave`, `cut-the-cube-surface`, `where-the-dew-forms` (review) | brief #1; PR's 10 drying lessons | **Life Hacks** for laundry drying (brief #1 already names the difference) | The household decision is distinct; but only 2 drying lessons in Life Hacks |
| Levers and torque | physics `seesaw-sit-closer` (review), `torque-lever` | curriculum `lever-opens-jars`; PR `heavy-book-close-to-back` | **Life Hacks** for jars (heat and grip join leverage); **physics** for the shelf-book lever | The book-on-shelf lesson is the seesaw lesson again |
| Pressure = force / area | physics `snowshoe-pressure` (review) | PR `weight-spread-on-table` | **physics** | Same insight |
| Braking distance and speed | physics `doubling-speed-braking` (published) | S11 vehicle ideas | **physics** | Life Hacks does not duplicate; vehicles stay at tyre pressure and load |
| Caffeine half-life | chemistry `half-life` (published) | curriculum `sleep-caffeine-half-life` | **Life Hacks** after safety review, `also: chemistry/half-life` | The bedtime decision is the hack; health-adjacent, so reviewed |
| Area and volume scaling | math `double-the-size`, `cube-the-size` (published) | PR `lh-area-scales-square`, `lh-double-container-radius` | **math** | Same insight. Life Hacks may keep one "the 16-inch pizza is two 12-inch pizzas" decision if it is distinct enough |
| Pythagoras, diagonals | math `two-squares-become-one`, `straight-across-saves` (review) | PR `measure-diagonal-for-square`, `sofa-diagonal-room`, `furniture-through-door` | **Life Hacks** for the carpenter's diagonal check and the sofa-through-door (DIY decisions); **math** for the theorem | Distinct insight: equal diagonals prove a rectangle; tilting beats the door width |
| Pairs and combinations | math `handshakes-halve` (published), `thirteen-pigeons` (review) | PR `sock-pairs-not-all-combinations` | **math** | Same counting idea. "Grab 3 socks to guarantee a pair" is pigeonhole, already in math |
| Binary search | cs `binary-search` (published), `bisect-the-bad-commit` (review) | PR `alphabet-sort-search` | **cs** | Same insight |
| Queue order | cs `shortest-job-first-wait` (review) | PR `short-jobs-clear-a-queue`, `do-not-starve-the-long-job`, `earliest-deadline-first` | **cs** for SJF; Life Hacks keeps at most one homework-order lesson that compares deadline-first with short-first | One new insight at most |
| Passwords | cs `four-words-beat-eight-letters` (published) | S10 idea | **cs** | Already published |
| Human memory and study | none (life covers biology and epidemics, not cognition) | brief #2, PR's 12 study lessons | **Life Hacks** | No other owner; revisit if a psychology category is proposed |
| Food science, cleaning chemistry, textiles, plants | none as household topics | S1, S2, S3, S12 | **Life Hacks** | No overlap; these are the gaps |

## 5. Gaps

Ranked by demand, then by whether any category covers the mechanism:
1. **Kitchen heat and cold** (S1): demand 3, 4 PR lessons, none on heat. Needs the safety reviewer's capacity; ask for a fixed safety-review slot per cycle.
2. **Cleaning** (S2): demand 3, zero lessons anywhere. The refuse list must be applied at brief time, not at review.
3. **Phone battery and backups** (S10): demand 3, absent from a 26-lesson strand.
4. **Study methods beyond spacing** (S8): interleaving, testing, learning-styles debunk; strong sources, zero lessons.
5. **Debunks** across every strand: the charter's sharpest hook, and none of the 200 is framed as one by its title.
6. **Arabic-speaking home** (`vertical.md` audience A4): appliances, units, products and food rules differ. Any S1/S2/S6/S7 lesson with a money or appliance figure needs an International flag before it is built.

## 6. How to divide the work (proposal)

- **One owner, strand leads as a working split, not new roles.** cm-lifehacks keeps the curriculum and every brief. Each strand gets a named reviewer pairing so briefs are checked by the people who own the mechanism: S1 and S2 with the chemistry category manager and the Life Hacks safety reviewer; S4 and S11 with physics; S6 with physics and International; S7 with economics; S8 and S9 with the research scientist (evidence quality); S10 with CS.
- **Per-strand cap until demand-3 strands each have 5 lessons:** no strand above 15 lessons; S1, S2, S8 and S10 battery/backup come first.
- **PR #2 triage, per strand, by evaluators who see the artifact first** (`npm run walkthrough -- <slug>`), against three questions: Is there a popular wrong method? Is there a source or stage derivation? Does another category already teach it (§4)? Outcomes: keep, merge into a sibling, transfer to another category's backlog, or drop.
- **Curriculum change after acceptance:** add `strand` to each concept in `content/curriculum/lifehacks.json`, propose real concept ids for the PR lessons that survive, and retire `unit-price-shopping` in favour of economics' `unit-pricing` unless a distinct insight is written.

Board items this implies (not added; board.json is out of scope for this task): International review of S6/S7 region dependence; safety-review capacity request for S1/S2; economics, physics, math and CS category managers to confirm the §4 ownership rows.
