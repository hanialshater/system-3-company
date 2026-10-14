# Life Hacks scope: WikiHow and Mawdoo3 breadth, one 60-second lesson at a time

author: principal-pm-verticals (Selin) · written 2026-10-14 · status: **proposal**, for the head of product (Priya) and the founder to accept, change or reject. It changes no curriculum, charter, role, board item or lesson. The category manager (cm-lifehacks, Tess) owns the curriculum and the briefs. The safety reviewer (Sana) owns the refuse list. The founder owns the mission.

It merges five lens sections in this folder, each written by the role that owns that view:

| Lens | File | Author | What it decides or proposes |
|---|---|---|---|
| Research | [`research.md`](research.md) | research-scientist | WikiHow's 19 categories, Mawdoo3's topics, what people search for. Every direct page fetch failed, so the findings come from search summaries and memory, each one labelled. |
| Vertical | [`vertical.md`](vertical.md) | principal-pm-verticals | Positioning, audiences, the F1–F4 fit test, sequencing, metrics, kill criteria |
| Category | [`category.md`](category.md) | cm-lifehacks | 12 strands, overlap ownership, PR #2 mapped by title |
| Safety | [`safety.md`](safety.md) | lifehacks-safety-reviewer | Safety classes, the strands that need a review on every lesson, refuse-list additions, how the extra verifiers may be used |
| Localization | [`localization.md`](localization.md) | localization-lead | U/R/I claim classes, what travels to Arabic, the Ramadan scope, the locale plan |

Also read: the community engineer's evaluation of PR #2, [`company/engineering/community/prs/2.md`](../../engineering/community/prs/2.md), which recommends request changes.

**What this rests on.** Nobody has opened wikihow.com or mawdoo3.com in this work; the research lens's fetches all failed. Every demand number is an estimate. No learner has seen a Life Hacks lesson. Every PR #2 verdict here comes from titles and manifests, plus the community engineer's QA on 10 sampled lessons. None comes from an evaluator's walkthrough. Every source named next to a lesson idea below is a **candidate**: the sub-area manager checks it at brief stage, and the fact-checker checks it again before publishing. None is a claim yet.

---

## 1. The vision

**WikiHow tells you how to do X. We show which way of doing X actually works, and why.**

- **Breadth like WikiHow and Mawdoo3.** The map covers the practical parts of daily life: kitchen, cleaning, clothes, fixing, storing, bills, energy, studying, planning, phones, travel and garden. A learner who opens the Life Hacks feed should find their room or their moment ("Kitchen", "Before an exam", "Packing") the way a WikiHow reader finds "Home and Garden".
- **Our depth, not theirs.** In each topic we take only the slice that passes the fit test (`vertical.md` §4). **F1, choice:** two plausible methods, and many people pick the wrong one. **F2, mechanism:** the reason can be shown and manipulated on one phone screen. **F3, checkable:** a source or a derivation on the stage backs it. **F4, safe:** the safety class can pass. A procedure ("how to tie a tie"), a recipe or a menu path fails this test, however popular it is. Our slice is narrower than WikiHow's everywhere, and in some of their categories it is empty, on purpose.
- **The 60-second card.** Predict which method wins, try the variants on the stage, then see the mechanism (`company/product/demo-standard.md`). Debunks count as much as tips: "this viral hack doesn't work, and here is why."
- **Claim rigour at encyclopedia breadth.** This is what WikiHow and Mawdoo3 do not offer. Every factual sentence on the card is a claim in `meta.json` with an address, support and source, verified by someone other than the builder. Every required safety line is a claim too (`safety.md` §4). Each claim carries its locality: universal, region-dependent or illustrative (`localization.md` §2).
- **Who it serves** (`vertical.md` §2):
  - A1, the sceptical scroller, who wants a viral claim settled;
  - A2, the new household runner;
  - A3, the exam-season student;
  - A4, the Arabic-speaking home. This is Mawdoo3's reader, mainly in Egypt, Saudi Arabia and Algeria (`research.md` §2, medium confidence).

**Where Mawdoo3 differs.** Mawdoo3 is shaped more like an encyclopedia than a how-to site (`research.md` §2, inference). Its how-to core is cooking, study, cleaning and self-care. "Scope like Mawdoo3" therefore means following that demand map, and its seasons, Ramadan and exam season, in particular. It does not mean adding religion, poetry or health sections.

---

## 2. The strands

There are twelve strands, plus **Debunk**, which runs across all of them as a format rather than a strand. Strand ids and boundaries follow `category.md` §2. Safety classes follow `safety.md` §1–2:

| Class | Meaning |
|---|---|
| **none** | No safety review needed |
| **warning** | One required line of 15 words or fewer, shown on the stage and recorded as a claim |
| **review** | A full safety record before the brief is claimed, and another at launch |
| **refuse** | Not taught at all |

Formats come from `company/design/formats.md`. Demand runs from 1 (low) to 3 (high), from `category.md` with `research.md`'s confidence. Each strand aims for at least one debunk in every four lessons (`category.md` §1).

| # | Strand | Proposed sub-area (§5) | Demand | Safety class | PR #2 lessons | Wave (§6) |
|---|---|---|---|---|---|---|
| S1 | `kitchen` Kitchen and food | kitchen-cleaning | 3 | review, every lesson | 4 (none on heat or food) | 3 |
| S2 | `cleaning` Cleaning and stains | kitchen-cleaning | 3 | review, every lesson | 0 | 4 |
| S3 | `laundry` Laundry, clothes and knots | home | 2–3 | none (warning near heaters and dryers) | 21 (10 on drying) | 1 |
| S4 | `fix` Fixes, tools and measuring | home | 2–3 | warning (review for power tools, blades, height) | 22 | 1 |
| S5 | `storage` Storage, organising and moving | home | 2 | none (review for tall furniture and lifting) | 26 | 1 |
| S6 | `energy` Energy and water at home | money-energy | 3 | **review**, with pattern pre-clearance for arithmetic (see call 3) | 13 | 2 |
| S7 | `shopping` Shopping, bills and sharing costs | money-energy | 3 / 2 | warning (review beyond arithmetic) | 35 | 2 |
| S8 | `study` Study and memory | study-time | 3 | none (review if sleep, caffeine or health) | 12 | 1 |
| S9 | `time` Time and planning at home and school | study-time | 2 | none | 32 (about half office process) | 2 |
| S10 | `digital` Phones, files and digital habits | digital | 3 / 2 | warning (review for passwords, accounts, links) | 26 (mostly UI behaviour) | 2 |
| S11 | `travel` Travel, packing and getting around | home (packing); vehicles when opened | 2 | warning (review for vehicles, batteries, rules) | 9 (packing only) | 1 (packing), 4 (vehicles) |
| S12 | `garden` Plants, garden and outdoors | stays with cm-lifehacks | 1–2 | warning (review for chemicals and tools) | 0 | 5 |

The ten ideas listed per strand below are a starting backlog in rough priority order, not briefs. Each one says what to predict, the mechanism, a candidate source, and an existing concept id or a PR #2 slug where there is one. "→ owner" marks an idea whose mechanism another category already teaches. Life Hacks keeps the household decision and links that category's lesson through `also` (§2.13).

### S1 `kitchen`: Kitchen and food
- **Scope.** Heat, cold, salt, water, storage and timing in home cooking: why one method gives a better, faster or safer result. Not recipes (taste, procedure), not nutrition or diet, not food-safety shortcuts that contradict a food-safety body (refuse, `safety.md` §5.1). Halal is the default for Arabic examples (`localization.md` §3).
- **Formats.** Storyboard / scrub (temperature over time), Before / after toggle, Debunk.
- **Required lines.** "Use a thermometer: colour does not show doneness." "Never add water to hot fat." Every temperature or holding time cites a food-safety body and is flagged as region-dependent.
- **Demand.** 3. This is the core of Mawdoo3's how-to and WikiHow's Food and Entertaining, with medium confidence.

| # | Idea (predict…) | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | Ice alone or ice plus salt: which chills a can faster? | Freezing-point depression makes the slurry colder than 0 °C · colligative properties (→ chemistry owns the ions) | `salt-lowers-freezing` |
| 2 | Does the steak keep cooking after it leaves the pan? | Carry-over conduction from the hotter outer layer · USDA FSIS rest-time guidance | `resting-meat` |
| 3 | Full kettle or just one cup: how much longer? | Energy ∝ mass × ΔT · specific heat of water (also chemistry `same-heat-different-rise`) | `boil-less-water` |
| 4 | Lid on or off: which pot boils first? | Evaporative heat loss from the open surface · derivation on the stage | none |
| 5 | Debunk: "searing seals in the juices" | Seared and unseared meat lose comparable weight · McGee, *On Food and Cooking* | none |
| 6 | Judge doneness by colour or with a thermometer? | Colour is not a reliable doneness indicator · USDA FSIS | none |
| 7 | Cool leftovers in one deep pot or in shallow boxes? | Cooling rate depends on surface-to-volume ratio · FSIS / UK FSA cooling guidance | none |
| 8 | Stuck jar lid: twist harder, or run it under hot water first? | Metal and glass expand differently, plus leverage · expansion coefficients | `lever-opens-jars` |
| 9 | Double the recipe: does the cooking time double? | Heating time scales with thickness, not mass · heat-conduction derivation. Required line: "Cooking times do not scale with quantity." | PR `lh-scale-recipe-portions` (rebuild) |
| 10 | Debunk: "salt makes the pasta water boil faster" | Boiling-point elevation at cooking salt levels is tiny · derivation | none |

### S2 `cleaning`: Cleaning and stains
- **Scope.** Why one cleaning method works: dwell time, dilution, temperature, agitation, surfactants, absorbency, and which product suits which surface. **Refuse:** mixing products of any kind, homemade disinfectants, and reactions in closed containers (`safety.md` §2, §3.3). The only chemistry we show is why one product works on one stain, from the label or a safety body.
- **Formats.** Before / after toggle, Side-by-side comparison, Debunk.
- **Required lines.** "Never mix cleaning products." "Follow the label and open a window."
- **Demand.** 3. Highest in Arabic after recipes and study (`research.md` §4, low-medium confidence).

| # | Idea | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | Fresh spill: rub it or blot it? | Rubbing spreads the stain over more fibre; capillary wicking · carpet-care body guidance | none |
| 2 | Spray and wipe at once, or let it sit? | Disinfectants need a contact time · US EPA List N contact-time column, product labels | none |
| 3 | Protein stain: hot water or cold first? | Heat denatures and sets protein · detergent-maker guidance | none |
| 4 | Microfibre or cotton cloth for dust? | Fibre diameter and surface area · published microfibre comparisons | none |
| 5 | Debunk: "vinegar plus baking soda is a super-cleaner" | They neutralise each other · stoichiometry, no mixing recipe. **Sana decides whether this framing is allowed at all** | `viral-hack-debunk` candidate |
| 6 | Double the detergent for a dirtier load? | Overdosing leaves residue and suds that cushion agitation · manufacturer dosing guidance | none |
| 7 | Dust first or vacuum first? | Dust settles downward · cleaning-order guidance (needs a source, or drop it) | none |
| 8 | One cloth for the whole kitchen, or separate cloths? | Cross-contamination from cloths · food-safety body guidance on cloths | none |
| 9 | Greasy pan: cold water or warm? | Fats soften above their melting range, and surfactants lift them · textbook | none |
| 10 | Limescale on a kettle: scrub it or descale it? | Acid dissolves carbonate scale · descaler label (single product, as labelled; Sana reviews) | none |

### S3 `laundry`: Laundry, clothes and knots
- **Scope.** Drying, shrinking, stretching, sorting, care labels, and the knots and laces of clothing.
- **Formats.** Before / after toggle, Side-by-side comparison, Single card.
- **Required lines.** "Ventilate: indoor drying adds moisture to the room", but only when the stage quantifies the water load. No drying on heaters.
- **Demand.** 2–3.

| # | Idea | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | Towel folded on the rail or spread out: which dries first? | Exposed area drives evaporation · brief #1 | `surface-area-drying`, PR `towel-spread-dries-first` |
| 2 | Same towel, humid room or dry room? | The vapour-pressure gap drives drying · psychrometrics. **Absorbs PR's 9 other drying lessons as stage variants** | PR `humidity-evaporation-gap` |
| 3 | Why does one bow stay tied while the other slips? | Square bow vs granny bow · Daily-Diamond et al. 2017, brief #4 | `shoelace-square-bow`, PR `square-bow-stays-tied` |
| 4 | A longer cord: more knots or fewer? | Knot probability rises with length and agitation · Raymer & Smith 2007, brief #5 | `cord-tangle-length`, PR `long-cord-knots-itself` |
| 5 | Wet jumper: hang it or lay it flat? | Water weight at the shoulders stretches knit · care labels, ISO 3758 | PR `wet-knit-hang-stretch` |
| 6 | Why does wool shrink in a hot wash when cotton barely does? | Scale felting under heat and agitation · textile science | none |
| 7 | Can you read this care label? | ISO 3758 symbols · the standard | PR `care-label-first-choice` |
| 8 | Higher spin speed: how much less drying time? | More water leaves before drying starts · appliance residual-moisture figures | none |
| 9 | 30 °C or 60 °C wash: where does the energy go? | Most of the energy heats the water · energy-agency guidance (also S6) | none |
| 10 | Debunk: dryer balls or a dry towel in the drum | Test the claim against published tests. **Drop it if no source exists** | none |

### S4 `fix`: Fixes, tools and measuring
- **Scope.** Small repairs and making things fit: levelling, levers, friction, measuring and marking, cutting allowances, buying enough material. **Refuse:** electrical work beyond changing a bulb or resetting a breaker, gas, structural work, work at height beyond a step stool, and bypassing any safety device.
- **Formats.** Single card, Side-by-side comparison.
- **Required lines.** "Unplug it first." "Wear eye protection" whenever there is cutting, drilling or a spring.
- **Demand.** 2–3. "How to fix" is the largest how-to search family, with medium confidence.

| # | Idea | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | Wobbly table: fold a beer mat, or turn the table? | Intermediate value theorem · Martin 2007; Baritompa et al. 2007; brief #3 | `wobbly-table-turn`, PR `wobbly-table-quarter-turn` |
| 2 | Is this frame square? Use a set square or the diagonals? | Equal diagonals make a parallelogram a rectangle · derivation | PR `measure-diagonal-for-square` |
| 3 | Mark a right angle with nothing but a tape | The 3-4-5 triangle · derivation (→ math owns Pythagoras) | none |
| 4 | Why does the tape's hook wobble? | The hook slides by its own thickness for inside and outside measures · tape-maker documentation | PR `measure-inside-not-outside` |
| 5 | Stuck nut: push harder, or use a longer spanner? | Torque = force × arm · (→ physics `torque-lever`, linked through `also`) | none |
| 6 | Sticking drawer: sand it, or rub on soap or wax? | Lubricated vs dry friction · tribology reference | none |
| 7 | Cut eight pieces from a board: does the blade width matter? | Kerf adds up over cuts · derivation | PR `lh-each-cut-allowance` |
| 8 | Paint: round the area, or round the cans? | Whole-can rounding · coverage on the tin | PR `lh-coverage-whole-cans` |
| 9 | Wallpaper for a wall with a window: subtract the opening or not? | Area minus openings, plus pattern waste · derivation | PR `lh-subtract-openings-area` |
| 10 | Screw straight into wood, or drill a pilot hole first? | The screw wedges the fibres apart and splits the wood · woodworking reference (review: tools) | none |

### S5 `storage`: Storage, organising and moving
- **Scope.** Where things go and whether they fit: shelves, boxes, furniture through doors, finding things. The mechanisms are geometry, centre of mass and search cost. Tidy-up advice whose "why" is only common sense is out.
- **Formats.** Single card, Before / after toggle.
- **Required lines.** "Anchor tall furniture to the wall." "Get help lifting: this is not a safe-weight rating."
- **Demand.** 2. PR #2 over-supplies this strand relative to demand.

| # | Idea | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | The sofa won't go through the door. Will tilting it work? | Diagonal clearance · Pythagoras on the stage | PR `furniture-through-door` + `sofa-diagonal-room` (merge) |
| 2 | Round tubs or square tubs: which wastes more shelf? | Circle packing on a grid wastes 1 − π/4 · derivation | PR `circle-tray-square-corners` + `round-box-leftover-gap` (merge) |
| 3 | Tall bookcase: heavy books at the top or the bottom? | Centre of mass and the tipping torque · CPSC "Anchor It" guidance (review) | none |
| 4 | Books in a big box or a small box? | Mass grows with volume; a box of books is heavy · removals guidance (warning) | none |
| 5 | Debunk: "vacuum bags make the suitcase lighter" | They shrink volume, not mass · derivation (also S11) | none |
| 6 | Flat-pack box: does it fit in the car boot? | Check all three dimensions, not just the volume · derivation | PR `flat-pack-volume-dimensions` |
| 7 | Will the door swing past the new cabinet? | The arc a door sweeps · geometry | PR `door-swing-clearance` |
| 8 | Fixed shelf heights: how much space is wasted? | The gap above each item · arithmetic on the stage | PR `shelf-gap-wasted-height` |
| 9 | Nested boxes: how many must you move to reach the bottom one? | Retrieval cost grows with depth · derivation | PR `nested-box-retrieval` |
| 10 | Keys: one fixed spot or "wherever"? | Search cost with a fixed address · needs a source on search for lost items, or it is labelled as a derivation | PR `keys-fixed-drop-zone` |

### S6 `energy`: Energy and water at home
- **Scope.** What appliances, heating, cooling, showers and leaks cost in kWh and litres, and which habit changes the number. Arithmetic only. No work on appliances or cables (refuse, `safety.md` §2). Every tariff and voltage is region-dependent, recomputed per locale and dated.
- **Formats.** Single card, Storyboard / scrub (a year adding up), Debunk.
- **Required lines.** "Tariffs and appliance ratings vary: check your own." When the stage shows a powered cable: "Never coil or cover a cord that is in use."
- **Demand.** 3.

| # | Idea | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | What does standby cost in a year? | W × hours in a year · measured standby figures from an energy agency | `standby-power-cost`, PR `lh-standby-days-add-up` |
| 2 | One cup of water: kettle, microwave or hob? | Energy into the water vs into the appliance · ratings, derivation | none |
| 3 | A dripping tap: how much water in a year? | Drop rate × drop volume × time · water-utility estimates | PR `lh-small-leak-large-duration` |
| 4 | Short shower or bath? | Flow × time vs bath volume · water-efficiency labels | PR `lh-flow-times-minutes` |
| 5 | Debunk: "turn the thermostat up high and the room warms faster" | A thermostat sets the target, not the rate, for most systems · energy-agency guidance | none |
| 6 | Read the annual-energy number on the label | kWh per year × tariff · the label scheme | PR `lh-annual-label-cost` |
| 7 | Fridge door open: what does it add? | Duty cycle × power · derivation (→ physics owns kW vs kWh) | PR `lh-duty-cycle-energy` |
| 8 | AC set one degree warmer: how much does it save? | Cooling load vs set-point · energy-agency guidance. **The Arabic-native lead lesson** (`localization.md` §3) | none |
| 9 | Same light, different bulb: what changes on the bill? | Lumens per watt · bulb packaging, energy agency | none |
| 10 | The fixed daily charge vs the per-kWh price | Fixed plus variable cost; why a low-use month isn't free · tariff arithmetic | PR `lh-fixed-energy-charge` |

### S7 `shopping`: Shopping, bills and sharing costs
- **Scope.** Arithmetic at the checkout and the split bill. Economics already owns unit price, stacked discounts, running cost and break-even (`category.md` §4), so this strand keeps only the checkout decisions economics does not teach. **Refuse:** any recommendation about what to buy, borrow, sign or invest in. Shop stock-keeping is out of the audience.
- **Formats.** Side-by-side comparison, Single card.
- **Required lines.** "This is arithmetic, not financial advice", only where a real money decision is computed.
- **Demand.** 3 for discounts and fees, 2 for the rest. The examples are the most US-shaped content we have (`localization.md` §3). Arabic needs new scenarios (VAT-inclusive prices, cash on delivery, gold priced per gram by karat, Ramadan and Eid bulk buying).

| # | Idea | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | £4 short of free shipping: add an item or pay the fee? | Threshold break-even · derivation | PR `lh-free-shipping-gap` |
| 2 | "Buy 2, get 1 free" or "33% off"? | Effective price per item, and when you only need one · derivation | PR `lh-two-for-one-boundary` |
| 3 | £5 off or 10% off? | Fixed vs proportional coupon and their crossover · derivation | PR `lh-fixed-coupon-percent` |
| 4 | Split the bill evenly or by what each person ordered? | Weighted shares · derivation | PR `lh-weighted-bill-share` |
| 5 | "£10 off when you spend £50" | Minimum-spend trap · derivation | PR `lh-voucher-minimum` |
| 6 | A 10-trip ticket you won't finish | Cost per trip actually used · derivation | PR `lh-ticket-bundle-unused` + `lh-pay-for-used-quantity` (merge) |
| 7 | Round each line or round the total? | Rounding error adds up over lines · derivation | PR `lh-round-lines-versus-total` |
| 8 | Two orders or one: what does the delivery fee do? | A fixed fee repeats per order · derivation | PR `lh-split-order-fixed-fee` |
| 9 | Bottle deposit: what does the checkout really cost? | Net price after the refundable deposit · scheme rules (region-dependent) | PR `lh-deposit-checkout-net` |
| 10 | One 16-inch pizza or two 12-inch? | Area grows with the square · (→ math `double-the-size`; the one area-scaling decision Life Hacks keeps) | PR `lh-area-scales-square` (rebuild) |

Transfer to economics, not built here: `unit-price-shopping` (retire it in favour of economics `unit-pricing` unless a distinct insight is written), PR `lh-big-pack-price`, `lh-align-price-units`, `lh-sequential-discounts`, `lh-discount-round-trip`, `lh-purchase-plus-running`, `lh-reuse-cost-per-use`, `lh-weighted-unit-average`, `lh-visit-fee-crossover`.

### S8 `study`: Study and memory
- **Scope.** How people learn and remember: spacing, retrieval, interleaving, elaboration, flashcards, feedback. No other category teaches human memory. **Out:** all-nighters, stimulants, "brain boosting", medication, and academic dishonesty (`safety.md` §2).
- **Formats.** Storyboard / scrub (forgetting over days), Side-by-side comparison, Debunk.
- **Demand.** 3. Exam season is a top search driver in MENA (`research.md` §3, medium confidence). This strand is also the cheapest to ship in Arabic, because its claims are universal (`localization.md` §3).

| # | Idea | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | Same hours, different calendar: cram or space? | The spacing effect · Cepeda et al. 2006; brief #2 | `spaced-repetition-study`, PR `spaced-beats-cram` |
| 2 | Reread the chapter, or close it and recall? | The testing effect · Roediger & Karpicke 2006 | PR `cover-before-recall` |
| 3 | Block practice by type, or mix the types? | Interleaving · Rohrer & Taylor 2007 | none |
| 4 | Debunk: "highlighting is studying" | Rated low utility · Dunlosky et al. 2013 | none |
| 5 | Debunk: "learn in your learning style" | No meshing benefit · Pashler et al. 2008 | none |
| 6 | Flashcards one way or both ways? | Retrieval runs in the direction it was practised · source to find at brief stage | PR `reverse-the-flashcard` |
| 7 | Memorise it, or explain why it is true? | Elaborative interrogation and self-explanation · Dunlosky et al. 2013 | PR `explain-the-link` |
| 8 | You got it wrong, but felt sure. Check the answer? | Hypercorrection of high-confidence errors · Butterfield & Metcalfe 2001 (check at brief stage) | PR `keep-the-error-feedback` |
| 9 | Two easily confused ideas: study them apart or side by side? | Discrimination by contrast · source to find | PR `separate-confusable-pairs` |
| 10 | Coffee at 4 pm, bed at 11: how much caffeine is left? | Half-life decay · (→ chemistry `half-life`). **Review class, health-adjacent** | `sleep-caffeine-half-life` |

### S9 `time`: Time and planning, at home and at school
- **Scope.** Planning a day, a journey, a deadline or a homework evening: estimates, buffers, ordering, batching, switching, calendars. Each lesson needs a published study or a derivation it can show on the stage. **Out (call 4):** office team process such as handoffs, owners, bug reports and meeting agendas.
- **Formats.** Storyboard / scrub, Side-by-side comparison, Simulation run (queues).
- **Demand.** 2.

| # | Idea | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | How long will it take? Your guess vs what actually happens | The planning fallacy · Buehler, Griffin & Ross 1994 | PR `estimate-a-range` |
| 2 | Leave when the event starts, or work back from arrival? | A backward timeline · derivation | PR `work-back-from-a-deadline` + `arrival-is-not-departure` + `calendar-needs-travel` (merge) |
| 3 | Switch between two tasks or finish one first? | Task-switching cost · Rubinstein, Meyer & Evans 2001; Monsell 2003 | none |
| 4 | Homework order: due soonest first, or shortest first? | EDF minimises lateness, SJF minimises average wait · (→ cs `shortest-job-first-wait`; one lesson only) | PR `earliest-deadline-first` |
| 5 | Debunk or reframe: the two-minute rule | Weak evidence (charter). **Retire it or turn it into a debunk** | `two-minute-rule` |
| 6 | Three steps that each run a bit late: how much buffer do you need? | Delays add up along a chain · derivation | PR `buffer-for-a-late-finish` |
| 7 | Do the same chore type together? | Setup cost amortised over a batch · derivation | PR `batch-by-setup` |
| 8 | Twenty free minutes: start the two-hour essay? | Fragmented time and fitting a long task · derivation | PR `fragmented-time-does-not-fit` |
| 9 | Group project: what must happen first? | Dependencies set the order before priority does · critical path derivation | PR `dependency-before-priority` |
| 10 | Why does Ramadan start about 11 days earlier each year? | A ~354-day lunar year against a 365-day solar year · calendar arithmetic. Universal claim, no religious ruling (`localization.md` §3) | none |

### S10 `digital`: Phones, files and digital habits
- **Scope.** The durable ideas behind everyday phone and computer use: battery, backups, storage, file naming, sorting, search operators, and defensive security. **Out:** anything specific to one UI or version (menu paths rot), bypassing anyone's lock, account, paywall or parental control, and anything that works as a phishing tutorial. Passwords stay with CS (`four-words-beat-eight-letters`).
- **Formats.** Single card, Before / after toggle, Debunk.
- **Required lines.** "Only on your own device and accounts." "A swollen battery goes to a recycling point, not a charger."
- **Demand.** 3 for phone and battery, 2 for files.

| # | Idea | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | Debunk: "drain the battery to 0% before charging" | Lithium-ion prefers partial cycles · manufacturer battery pages, Battery University | none |
| 2 | One backup or two? | The chance that independent copies fail together; the 3-2-1 rule · CISA guidance | none |
| 3 | Name files 2026-10-14 or 14-10-2026? | ISO 8601 sorts correctly as text · derivation | PR `iso-date-filename-sort` |
| 4 | Why does "v10" sort before "v9"? | Text sort vs number sort · derivation | PR `version-nine-and-ten` |
| 5 | Search with quotes, a minus sign, or OR? | How search operators combine · the vendor's search documentation | PR `mail-exact-phrase` + `mail-or-vs-and` + `mail-minus-noise` (merge) |
| 6 | "invoice.pdf" or "invoice.pdf.exe"? | Hidden extensions hide the real file type · NCSC / CISA (defensive; review) | PR `show-the-file-extension` |
| 7 | The link says your bank. Where does it really go? | Link text vs link target · NCSC / CISA (defensive; review) | PR `link-label-names-the-target` |
| 8 | What is filling your phone? | Photo and video size × count · arithmetic from resolution | none |
| 9 | Why does a hot phone charge slower? | Battery management limits charging when hot · manufacturer guidance (warning) | none |
| 10 | Why didn't search find "أحمد" when you typed "احمد"? | Letter-form normalisation (hamza, taa marbuta) · Arabic-native (`localization.md` §3); the English twin is accents and case | none |

### S11 `travel`: Travel, packing and getting around
- **Scope.** Packing geometry, weight vs volume, and journey timing. Basic vehicle and bike decisions, such as tyre pressure, load and gearing, are not repairs and are review class. **Out:** visas, customs and other legal advice, fare tricks that breach a carrier's terms, medicines across borders, anything done while driving.
- **Formats.** Before / after toggle, Single card.
- **Required lines.** "Check your airline's current limits." "Follow your vehicle handbook."
- **Demand.** 2.

| # | Idea | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | Roll or fold? | Rolling does not shrink cloth volume; it changes air gaps and creases · a published test, or a derivation on the stage | `packing-rolling-vs-folding`, PR `rolled-or-folded-volume` |
| 2 | Half-empty bag, still over the weight limit? | Mass vs volume · airline limits as examples (region-dependent) | PR `bag-weight-before-volume` |
| 3 | Packing cubes: more space or less? | The cube's own walls take volume · derivation | PR `packing-cube-walls` |
| 4 | Socks loose, or inside the shoes? | Filling voids · derivation | PR `socks-use-shoe-space` |
| 5 | Heavy things at the wheel end or the handle end? | Centre of mass and effort at the handle · lever derivation | PR `shoes-opposite-ends` (rebuild) |
| 6 | Two connections: how much buffer do you need? | Delays chain · derivation (shares the S9 #6 mechanism; keep only one) | none |
| 7 | A slightly soft tyre: what does it cost? | Rolling resistance rises as pressure falls · tyre makers, road-safety bodies (review) | none |
| 8 | Roof box on or off for a long drive? | Aerodynamic drag on fuel use · energy-agency guidance (review) | none |
| 9 | Hill on a bike: high gear or low? | Gear ratio vs force at the pedal · (→ physics owns torque) (review) | none |
| 10 | Debunk: vacuum bags and the weight allowance | Same mass in less volume · derivation (shared with S5 #5; one lesson only, owned here) | none |

### S12 `garden`: Plants, garden and outdoors (later)
- **Scope.** Watering, light, soil, cut flowers and evaporative cooling outdoors. **Out:** homemade pesticides and weedkillers, foraging, burning, chainsaws. Pets stay out until Sana agrees an approach.
- **Formats.** Storyboard / scrub, Debunk.
- **Required lines.** "Wear gloves and wash your hands after handling soil."
- **Demand.** 1–2. Higher in English than in Arabic (inference).

| # | Idea | Mechanism · candidate source | Existing |
|---|---|---|---|
| 1 | Water in the morning or at noon? | Evaporation loss vs leaf temperature · agricultural extension services | none |
| 2 | Cut flower stems in air or under water? | Air embolism blocks the xylem · horticultural extension | none |
| 3 | Debunk: "a coin or an aspirin keeps flowers fresh" | Test against extension-service trials. **Drop it if no source exists** | none |
| 4 | Mulch or bare soil in a dry week? | Mulch cuts surface evaporation · extension services | none |
| 5 | Water a little every day, or deeply once a week? | Root depth follows the water · extension services | none |
| 6 | Terracotta or plastic pot: which dries out first? | A porous wall lets water evaporate through it · horticultural reference | none |
| 7 | Why does a clay water jar (زير / قُلّة) stay cool? | Evaporative cooling, a cousin of the towel lesson · physics. Arabic-native, travels well | none |
| 8 | Which window gets the most light? | Sun path by hemisphere and latitude · region-dependent, recomputed per city | none |
| 9 | Turn the compost or leave it? | Aerobic decomposition needs oxygen · extension services (warning) | none |
| 10 | How deep should you sow a seed? | Seed reserves vs emergence depth · seed-packet and extension guidance | none |

### 2.13 Overlap rule, and Debunk across all strands
- **Overlap ownership** (`category.md` §4). The category that teaches the *mechanism* owns the concept. Life Hacks owns a lesson only when the hook is a household decision or a popular hack. It then links the science lesson through `curriculum.also`. If the insight is the same, the existing lesson wins.
- **Ownership per topic.** Economics owns unit price, stacked discounts, running cost and break-even. Physics owns kW vs kWh, pressure and torque. Math owns area scaling, Pythagoras and pairs. CS owns binary search, queues and passwords. The five category leads confirm the rows in `category.md` §4 (asks, §7).
- **Debunk targets.** At least one in four lessons in each strand is a debunk. None of PR #2's 200 titles is framed as one.

---

## 3. Out of scope

Whatever the strand or format, debunks included (`safety.md` §3, charter refuse list, `vertical.md` §4):

1. **Medical advice:** diagnosis, treatment, dosage, symptoms, first aid beyond "call emergency services", diet, supplements, mental-health "hacks", and fasting-health or hydration advice.
2. **Legal advice:** visas, customs, tenancy, employment, tax, insurance, road rules given as advice. "Rules differ: check yours" is the most a lesson may say.
3. **Dangerous chemistry:** mixing anything, closed-container reactions, fire, fuel, fireworks, homemade disinfectants or pesticides.
4. **Children's safety:** anything that could replace adult supervision, a safety device or professional guidance on sleep, food, bathing, car seats or choking.
5. **The rest of the current refuse list:** electrical work beyond a bulb or breaker, defeating any safety device, and financial recommendations.
6. **Not our format** (the topic fails the fit test, though nothing is wrong with it):
   - pure procedures (tie a tie, change a tyre, write a cover letter, fold a fitted sheet);
   - UI- and version-specific how-tos;
   - recipes and other matters of taste (Mawdoo3's huge "طريقة عمل" stem included);
   - decorating and style;
   - relationships;
   - **religious rulings**: what breaks a fast, prayer validity, zakat as an obligation. Ramadan *calendar and arithmetic* lessons are in scope (`localization.md` §3).
7. **Not our audience:** office team process (handoffs, owners, bug reports, meeting agendas) and shop or warehouse stock-keeping (call 4).
8. **Gated strands, not opened:**
   - beauty and personal care, where what survives folds into S5 and S11;
   - parenting, where only adult-side organisation survives, in S9;
   - pets.

   Sana expects to block most briefs in these three areas (`safety.md` §2), so none becomes its own strand.

**Proposed refuse-list additions** (`safety.md` §5, plus the localization lens's proposal). These are for Tess to put in the charter and Sana to confirm the wording; neither has happened yet:
1. food-safety shortcuts that contradict a food-safety body;
2. anything applied to skin, eyes, hair or mouth other than as its label says;
3. children's sleep, feeding, bathing, car-seat and choking-hazard hacks;
4. feeding pets human food, and any pet treatment or dosing;
5. homemade pesticides, weedkillers and disinfectants;
6. damaged or swollen batteries, and any charging hack;
7. bypassing someone else's lock, account, paywall or parental control;
8. hacks done while driving, or that defeat vehicle sensors;
9. **religious rulings** (from the localization lens).

---

## 4. PR #2 mapped onto the strands

PR #2 is `codex/lifehacks-200`, read as data. Its 200 lessons come in three groups: 70 home, 70 study, 60 resources. The mapping below is cm-lifehacks's (`category.md` §3), done from titles. I re-checked it against `company/engineering/community/prs/2-slugs.txt`: every slug is assigned exactly once, and the strand totals add up to 200.

| Strand | Demand | PR #2 lessons (home / study / resources) | What they are, from titles |
|---|---|---|---|
| S1 kitchen | 3 | **4** (0 / 0 / 4) | container and portion arithmetic only; nothing on heat, cold or food |
| S2 cleaning | 3 | **0** | empty |
| S3 laundry | 2–3 | 21 (21 / 0 / 0) | 10 on one concept (drying by surface area) |
| S4 fix | 2–3 | 22 (14 / 0 / 8) | measuring and material arithmetic; some unit facts with no wrong method (`cm-to-inches`, `ruler-start-not-zero`) |
| S5 storage | 2 | 26 (26 / 0 / 0) | over-supplied for its demand; much of it is common-sense tidying |
| S6 energy | 3 | 13 (0 / 0 / 13) | a good fit in kind; overlaps physics and economics |
| S7 shopping | 3 / 2 | 35 (0 / 0 / 35) | the largest strand; 4 are shop stock-keeping; at least 6 duplicate economics or math |
| S8 study | 3 | 12 (0 / 12 / 0) | only 12 of the 70 "study" lessons are about studying |
| S9 time | 2 | 32 (0 / 32 / 0) | about half are office team process |
| S10 digital | 3 / 2 | 26 (0 / 26 / 0) | mostly editor and UI behaviour; nothing on batteries or backups |
| S11 travel | 2 | 9 (9 / 0 / 0) | packing only; no journeys, no vehicles |
| S12 garden | 1–2 | **0** | empty (deferred anyway) |

The per-strand slug lists are in `category.md` §2, under each strand's "PR #2 lessons here".

**Strands PR #2 leaves empty or effectively empty:**
- **S2 cleaning** and **S12 garden** have no lessons at all.
- **S1 kitchen** has no lesson on heat or food.
- **S10 digital** has nothing on batteries, backups or phone storage.
- **S8 study** has no interleaving lesson and no learning-styles debunk.
- **Debunks are absent in every strand.**

The three highest-demand strands (kitchen, cleaning, study) hold 16 of the 200 lessons. Storage, time and shopping hold 93. The likely reason is that the PR went where the safety class is "none", which it could fill without our review. That is a constraint to plan around, not a shape to accept.

**Quality, from the lenses and the community engineer:**
- **Templated.** `vertical.md` §9 sampled 127 of the 200 `meta.json` files: 30 share one generic misconception, and `learner.knows` takes one of three generic values. 198 of the 200 recall answers are option 0, and 63 lessons share one generic option set (`prs/2.md`).
- **Concept discipline is missing.** `concept` equals `slug` in 195 of the 200, so the two-per-concept rule cannot see that 10 lessons teach drying. The curriculum also grows from 15 concepts to more than 200, against the charter's portfolio rule.
- **Learner text sits outside the lessons.** It lives in shared engines (`src/lib/lifehacks/*`), not in each lesson. A claim's address must therefore point into a shared catalogue. Its fact-checker and its localizer need to know this (`localization.md` §1 assumes text inside each `Demo.tsx`).
- **Nothing is verified.** All 883 claims are `unverified`. The PR's safety, QA and learner records were written by the contributor under our role names. Its safety files are screenings, not verdicts (`safety.md` §6). The 200 contributor QA records satisfy the launch gate's QA check, which is blocker 2 in `prs/2.md`.

**How many survive.** The lenses disagree, and neither count comes from a walkthrough:
- cm-lifehacks: about 60 fit as they are, about 40 merge into a sibling, about 30 transfer to another category, and about 70 lack a choice, a source or a home audience (`category.md` §3).
- vertical: about a fifth, so roughly 40, survive the fit test (`vertical.md` §9).

**My call: plan capacity for 40 to 60 survivors, and replace both counts with evaluator findings** (§5.3). I do not pick either number, because both are skims of titles. The plan below holds at either end of the range.

**What happens to PR #2:**
- I agree with the community engineer, the vertical lens and cm-lifehacks: **do not merge it as a collection.**
- Triage it by strand. Evaluators run `npm run walkthrough -- <slug>` first and score against three questions: is there a popular wrong method, is there a source or a stage derivation, and does another category already teach it?
- Each lesson ends as one of four outcomes: **keep** (assign a real concept id and a strand), **merge** into a sibling as a stage variant, **transfer** to another category's backlog, or **drop**.
- Survivors enter the normal path: brief, safety, fact-check, launch.
- The shared engines may be worth keeping as kit candidates; that is an engineering decision for Kenji.
- Before anything merges, the two data-shape changes need an EDD: the `safety` field in `meta.json` and `content/collections/`.

---

## 5. Dividing the work

### 5.1 Proposed sub-area category managers (proposal only)

Adding roles needs the founder's directs consulted first (`company/ceo-office/org-change-process.md`). Nothing below goes into `tools/org/roles.mjs` until the decision record has its `## Consulted` answers.

The proposed entry for `SUBAREAS` in `tools/org/roles.mjs`. It uses the same generator, with no code change:

```js
// SUBAREAS
lifehacks: [
  ["home", "Home, Clothes & Packing"],          // S3 laundry, S4 fix, S5 storage, S11 travel (packing)
  ["kitchen-cleaning", "Kitchen & Cleaning"],   // S1 kitchen, S2 cleaning: review on every lesson
  ["money-energy", "Money & Energy Arithmetic"],// S6 energy, S7 shopping: region-dependent figures
  ["study-time", "Study & Time"],               // S8 study, S9 time
  ["digital", "Phones, Files & Digital Habits"],// S10 digital
],
// DOMAIN_NAMES
lifehacks: "Life Hacks",
```

This generates `cm-lifehacks-home`, `cm-lifehacks-kitchen-cleaning`, `cm-lifehacks-money-energy`, `cm-lifehacks-study-time` and `cm-lifehacks-digital`. Each reports to `cm-lifehacks`, runs on the sonnet model, owns the concepts tagged with its `subarea` in `content/curriculum/lifehacks.json`, and writes `company/domains/briefs/lifehacks.<sub>.md`. S12 garden and S11 vehicles stay with cm-lifehacks until they open.

**Why five sub-areas, not twelve or three.**
- Twelve roles would mean twelve agents writing briefs before any strand has 5 lessons, the "vertical per week" failure mode.
- Three would not separate the two things that set the pace: the review-every-lesson pair (kitchen and cleaning, which need Sana and the chemistry lead) and the region-dependent arithmetic pair (energy and shopping, which need economics, physics and International).
- Each of the five groups shares its partners and its safety load.

**Data.** Each concept's `subarea` holds the sub-area id. That is an existing field: `tools/meta.mjs` copies it into `meta.curriculum.strand`, and cs already uses it. The 12 strand ids live as headings inside each sub-area's briefs file. If strand-level coverage reporting is wanted later, adding a separate `strand` field is a data-shape change that needs an EDD (Kenji).

**Staged generation (call 1).** Generate a role only when its strands open:

| Stage | Roles generated | When |
|---|---|---|
| 1 | `home` and `study-time` | Now. They hold the five briefs and roughly 130 of PR #2's lessons to triage. |
| 2 | `money-energy` and `digital` | Wave 2 |
| 3 | `kitchen-cleaning` | When kitchen opens. Sana's pattern notes come first. |

A role whose strands miss their kill criteria is retired with them (`company/rituals/retro-and-offboarding.md`).

**Who to consult** (`org-change-process.md` step 2). Each answers in the decision record's `## Consulted` section.

| Who | Why | Required? |
|---|---|---|
| **Leonie** (chief-of-staff-ceo-office) | Org health | Always |
| **Priya** (head-of-product) | Owns the categories org, where the roles sit | Always |
| **Hilde** (evaluation-steward) | Safety review and the 50-verifier pool touch reviews and gates; Sana reports to her | Relevant |
| **Kenji** (principal-engineer) | The `subarea` tags, the generator run, and PR #2's shared engines and data-shape EDD | Relevant |
| **Ada** (chief-of-staff) | Dispatching the new roles and the verifier pool through the operating loop | Relevant |
| **Vera** (vp-rnd) | Research-scientist evidence checks for study and time; any kit R&D for the Debunk and Compare formats | Relevant |

Not directs, but asked because the roles take work from them:
- **Tess** (cm-lifehacks), the new roles' manager.
- **Sana** (lifehacks-safety-reviewer).
- **Yuki** (localization-lead).
- **Marco, Omar, Freya, Ravi, Lin**: the economics, physics, chemistry, math and CS leads, who own the overlap rows.

Priya then takes the decision.

### 5.2 Who else owns what
- **cm-lifehacks (Tess):**
  - keeps the charter and the curriculum shape, ranks strands, and runs the PR #2 triage outcomes;
  - writes the S12 garden briefs, and the briefs of any sub-area whose role is not yet generated.
- **Sub-area managers** write the briefs. They check each brief's answer in node before it goes on the list, and they run `node tools/overlap.mjs` before adding a brief (generator `inScope`).
- **Sana:**
  - owns each strand's safety class, plus one pattern note per strand (`safety.md` §7): the allowed mechanisms, the required line, and the list of things a hero must not show;
  - is the only role that issues block or pass verdicts.
- **Yuki:** owns the U/R/I locality tags, and is asked to make them part of the brief format from phase 0 (`localization.md` §5).

### 5.3 The founder's "50 more agents for verification"
The safety lens and the evaluator-first rule set how these extra agents can be used:
- **Verification work only.** They triage, walk through, fact-check, and write safety records for none and warning lessons. None of them builds a lesson. No instance verifies a lesson it, or its batch, helped build.
- **Artifact first.** Each instance runs `npm run walkthrough -- <slug>` and writes its findings before it reads any builder note or the PR's own records.
- **Proposed split for the PR #2 triage** (Ada dispatches, Hilde checks the independence rules):

  | Instances | Role | Load |
  |---|---|---|
  | 20 | evaluators | 10 lessons each, the three triage questions (§4) |
  | 15 | `fact-checker` | survivors' claims |
  | 10 | `lifehacks-safety-reviewer` | records for none and warning survivors |
  | 5 | learner evaluators or QA | PR #2's recall-answer and option-set problem |

- **The verdict stays with Sana.** Every review-class verdict gets a second reader before launch. A safety-reviewer instance's record counts as a record, not as a verdict.
- **Safety, not building, is the bottleneck.** Eight of the strand families are review-every-lesson, so extra verifiers do not let us open kitchen and cleaning at the same time.

---

## 6. Sequencing and kill criteria

### 6.1 Order

| Wave | Strands opened | Why | Gate to the next wave |
|---|---|---|---|
| **0, now** | none | Decisions, the PR #2 triage, Sana's pattern notes, U/R/I tags in the brief format, the refuse-list additions | Priya accepts the shape; triage findings written |
| **1** | S3 laundry, S4 fix, S5 storage, S11 packing (sub-area `home`), and S8 study (`study-time`) | The five existing briefs are all here and all safety class "none". The strongest evidence (study). PR #2 survivors cluster here. | Domain Launch Review: Sana passes the first 5 Life Hacks lessons (charter); `spaced-beats-cram` published with a working recall question |
| **2** | S7 shopping, S6 energy, S9 time, S10 digital (defensive) | Arithmetic is checkable by derivation, and demand is high. Gives Sana a track record of "arithmetic, no recommendation" before food. **Kitchen briefs and Sana's kitchen pattern note are prepared in this wave.** | Two S7 lessons pass "arithmetic, no recommendation"; one S6 lesson passes review |
| **3** | S1 kitchen (`kitchen-cleaning`) | Highest demand of any strand, and the core of Mawdoo3's how-to. The first review-every-lesson strand. | Kitchen's first 5 lessons pass Sana; no safety incident |
| **4** | S2 cleaning; S11 vehicles | One review-every-lesson strand at a time | First 5 of each pass Sana |
| **5** | S12 garden; Arabic-native lessons (`localization.md` phase 3) | Lowest demand; the platform and RTL work comes first | The Arabic pilot shows learners finish lessons |

**Caps** (`vertical.md` §6):
- Each strand builds 5 lessons, is checked against the metrics, then gets up to 10 more.
- No strand passes 15 lessons before the next strand has 5.
- No concept gets more than two lessons until every demand-3 concept has one.

**Locale track** (`localization.md` §5):
- Arabic is designed in now: U/R/I tags, and constants blocks for numbers, units and money.
- It ships second, after the English Domain Launch Review and the RTL and EDD-003 work.
- The pilot draws first on universal-claim strands: S8, S3 knots, and S4/S5 geometry.
- If the founder says Arabic comes first, the plan becomes a separate Arabic-native stream. It still waits on the same platform work.

### 6.2 Kill and shrink criteria (`vertical.md` §8, plus two for this scope)
- **Kill the vertical:** after 3 strands and 30 published lessons, the prediction commit rate is below 40%, or recall at 3 weeks is no better than the domain median. Life Hacks then folds back into a small category under physics and life.
- **Kill a strand:**
  - its fit rate is below 50% on its first 5 briefs, scored blind by someone who did not write them (it is a procedure strand in disguise); or
  - its gate pass rate is below 40% after 10 builds.

  Its sub-area role is retired with it, or shrinks to the remaining strands.
- **Stop a review strand** at the first safety incident on a published lesson, until a COE closes.
- **Freeze breadth** if more than 20% of published Life Hacks lessons fail the jobs test (`vertical.md` §3) at a vertical review.
- **New, PR #2:** if fewer than 30 of the 200 survive the triage, close the PR and keep only the merged survivors as briefs, rather than rebasing it.
- **New, safety capacity:** if Sana's queue is more than one cycle behind for two cycles in a row, no new review strand opens, whatever its demand.

**Metrics before learners exist:**
- fit rate of at least 80%;
- first-try gate pass rate of at least 60%;
- no two lessons with the same reveal (`node tools/overlap.mjs`).

**Metrics once learners exist:**
- commit rate of at least 40%;
- wrong-first rate between 30% and 70%;
- recall at 3 weeks above the domain median;
- pull, meaning a second lesson opened in the same strand.

None can be measured yet.

---

## 7. Asks to other teams

These are not on the board yet. This task does not write `board.json`, so the chief of staff or the next session adds them.

| Team | Ask | Owner |
|---|---|---|
| **Design: formats** | Kit support for **Debunk**, which shows the safety class on the card, and for Side-by-side `<Compare>` and Storyboard `<Timeline>`. Most strands lean on these three, and all three are built by hand today. A placement and style rule for the one-line required warning, so it appears on the stage at the moment of risk, not as a footer. | design-lead (Ines), interaction-designer (Rafael), design-engineer |
| **Design: learning** | A misconception-quality bar for Life Hacks briefs: each misconception must be one a real learner holds, and no generic "interchangeable methods". A rule for spreading the recall answer across options, after PR #2's 198/200 on option 0. | learning-designer (Lena) |
| **Illustration** | One hero style per sub-area. Every request carries a "must NOT show" line from Sana's pattern notes: no cup on a table being turned, no plugged-in coiled cable, no child near a risk, no phone in a driver's hand. Arabic-locale scenes (kitchens, roof water tanks, floor seating) once the pilot is set. | visual-designer → illustrator (Aquarelle) |
| **R&D / Research** | Re-run the research lens's network checks: WikiHow per-category counts (arXiv 2009.07690, Appendix B), live category trees for WikiHow and Mawdoo3, and Arabic how-to search volumes for Egypt and Saudi Arabia. Score the evidence behind S8 and S9 ideas #6–9, whose sources say "source to find". Advise whether PR #2's shared stage engines are worth an R&D pass as kit components. | vp-rnd (Vera), research-scientist (Dario), rnd-lead (Bram) |
| **Localization / International** | Make U/R/I tags part of the brief format now. Lead the RTL and Arabic font spike with platform. Answer whether Arabic is a first-wave market: this needs a founder or head-of-product decision. A cultural reviewer for each of Egypt and the Gulf. | localization-lead (Yuki), cultural-reviewer (Amira), Kenji |
| **Safety** | One pattern note per strand (`safety.md` §7), kitchen first, in wave 2. Confirm the 9 refuse-list additions with Tess. Agree the pattern pre-clearance with Hilde. State the capacity per cycle, which sets the wave gates. | lifehacks-safety-reviewer (Sana), evaluation-steward (Hilde) |
| **Fact-checking** | Plan fact-checker instances for the triage survivors. Note that PR #2's claims point into shared catalogues, not into each lesson. | fact-checker (Ingrid) |
| **Category leads** | Confirm or amend the overlap rows in `category.md` §4. Receive the PR #2 lessons transferred to you (§2 S7, and `category.md` §4). | Marco, Omar, Freya, Ravi, Lin |
| **Engineering** | The EDD for PR #2's `safety` field and `content/collections/`. Rerun the trial merge on the new heads (`prs/2.md` blocker 6). Decide on the shared engines. Later, a `strand` field if wanted. | principal-engineer (Kenji), community-engineer (Femi) |
| **Head of product** | Accept or change this scope. Take the sub-area role decision after consultation. Decide whether `vertical.md` and this README become `company/product/verticals/lifehacks.md`. | Priya |

---

## 8. Where the lenses disagree, and my calls

| # | Question | View A | View B | My call and reason |
|---|---|---|---|---|
| 1 | New sub-area roles? | category: no new roles; strand leads as a working split under one owner | vertical: the head of product decides once a strand has more than ~10 lessons in review. The founder asked for the work to be divided. | **Propose five roles, generated in stages** (§5.1). Twelve strands at WikiHow breadth will not fit in one manager's queue, and PR #2's triage already brings ~130 lessons to two sub-areas. Staging honours the category lens's concern about empty roles. |
| 2 | Which strands first? | category: by demand, so kitchen, cleaning, study and digital batteries first | vertical: home physics, then study, then money, with kitchen fourth after 10 safety passes. Safety: classes none and warning first, then one review strand at a time, kitchen first. | **Sequence by safety class, rank by demand within it** (§6.1). Sana's capacity is the binding limit, while demand is an unmeasured estimate. **Kitchen moves up to wave 3**, and its briefs and pattern note start in wave 2, so it does not wait on an arbitrary count of 10. That answers the category lens's objection that the highest-demand strand sits last. |
| 3 | Energy's safety class | category: warning (arithmetic only) | safety: review on every lesson (electricity) | **Review, as the safety lens says**, because Sana owns the classes. Arithmetic-only lessons get the lighter brief-stage review through her pattern pre-clearance, if Hilde agrees. The category lens's point that most energy lessons are arithmetic is handled there. |
| 4 | Office team process (PR's handoffs, owners, meetings) | category: out until Work World has its own demand signal | the principal-pm-verticals role description lists "workplace skills" as a possible future vertical; the vertical lens did not take it up | **Out of Life Hacks.** It fails the home and student audience and has little published evidence. If a workplace vertical is proposed later, these PR titles become its candidates, not ours. |
| 5 | PR #2 survivors | category: ~60 keep, ~40 merge | vertical: ~a fifth (~40) | **Plan for 40 to 60; evaluators decide** (§4). Both counts are title skims. |
| 6 | Beauty, parenting, pets as strands | Founder's question and the WikiHow map: include them | safety: most briefs will be blocked; fold what survives into storage and travel | **No strands for them.** An empty strand with a manager is waste. The surviving logistics lessons go to S5, S9 and S11. |
| 7 | Arabic timing | research: Arabic is a separate demand map | localization: design it in now, ship it second (flips if the founder says Arabic first) | **Design in now, ship second.** It is a founder or head-of-product decision, flagged as an ask. The kit has no RTL support, and nothing in English is verified yet. |
| 8 | Where lesson text lives | localization: assumes text sits in `Demo.tsx` constants | PR #2: text sits in shared catalogues | **Both stay possible.** Kenji's EDD on PR #2's engines decides. Localization and fact-checking follow whichever shape is chosen. |

Every objection above stays attached to its call. If Priya or the founder decides otherwise, the losing view's reason stays in this table with what happened to it.

## Confidence
- **Medium:** the strand shape and the out-of-scope list. They agree across all five lenses and fit the charter.
- **Medium:** the sequencing. It follows the safety capacity and the evidence strength visible in the repo.
- **Low:** demand per strand, survivor counts and every lesson idea's source. None has been checked against the live sites, learners or the sources themselves.
