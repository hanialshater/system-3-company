import type { HomeSpec } from "./home-models";

/** Builder specifications. All claims remain unverified and all numeric models are explicit. */
export const homeLessons: HomeSpec[] = [
  {
    "slug": "towel-spread-dries-first",
    "title": "Same towel, smaller doorway",
    "model": "dry",
    "view": "cloth",
    "initial": 70,
    "min": 60,
    "max": 90,
    "step": 1,
    "values": [
      140,
      4,
      0.6,
      0.1020408163
    ],
    "choices": [
      "Quarter-fold",
      "Spread flat"
    ],
    "question": "Same water and model flux: which towel layout dries sooner?",
    "idea": "Spreading the towel exposes both large faces. This constant-rate model divides water mass by exposed area and assumed flux; a smaller evaporation doorway gives a longer model time.",
    "limit": "Real drying depends on fabric, temperature, humidity and airflow; this is not a twelve-hour promise.",
    "formula": "Area=2×(width/100)×1.4/layers; layers=4 or 1. Model hours=0.6/(area×0.1020408163). Edges and falling-rate drying omitted.",
    "recall": "What should you change before comparing the drying speed of two towel layouts?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 1,
    "concept": "surface-area-drying",
    "unit": "cm",
    "inputLabel": "Width",
    "hook": "Same water and model flux: which towel layout dries sooner?"
  },
  {
    "slug": "wobbly-table-quarter-turn",
    "title": "Turn the table, lose the wobble",
    "model": "wobble",
    "view": "wobble",
    "initial": 0,
    "min": 0,
    "max": 90,
    "step": 1,
    "values": [
      4
    ],
    "choices": [
      "Start angle",
      "Find balance"
    ],
    "question": "Can a turn help this square equal-leg table?",
    "idea": "The illustrated signed gap crosses zero during a quarter turn. For square equal-leg tables on suitably gentle continuous ground, a balanced position exists.",
    "limit": "Four feet down is not level. Clear hot drinks before turning; steps, holes and unequal legs fall outside this model.",
    "formula": "Illustrative gap=4cos(2×angle) mm; angle=0 initially or 45 at balance. This is an illustration of a sign change, not a physical contact solver.",
    "recall": "Does having four feet down guarantee a level tabletop?",
    "source": "Baritompa, Löwen, Polster & Ross, Mathematical table turning revisited, full text opened 2026-10-14 at https://arxiv.org/pdf/math/0511490. Square equal-leg table, continuous ground and slope/leg length conditions; proof of sign change and balanced position. Our cosine gap is an illustration, not a solution of the full contact geometry.",
    "answer": 1,
    "concept": "wobbly-table-turn",
    "unit": "°",
    "inputLabel": "Turn",
    "hook": "Can a turn help this square equal-leg table?"
  },
  {
    "slug": "square-bow-stays-tied",
    "title": "Which way does your bow lie?",
    "model": "bow",
    "view": "bow",
    "initial": 0,
    "min": 0,
    "max": 40,
    "step": 1,
    "values": [
      20,
      0.8,
      0.3
    ],
    "choices": [
      "Matching wraps",
      "Opposing wraps"
    ],
    "question": "Which wrap pattern tends to hold better?",
    "idea": "Opposing knot stages make the balanced slipped reef bow sit across the shoe. The granny bow tends to turn along it; impact and moving lace ends can work a bow loose.",
    "limit": "Both can fail. The schematic is not a tying tutorial; loop loss is illustrative, not measured walking data.",
    "formula": "Both illustrative loops start at 20 mm at step 0. Changing the second wrap changes its geometry and model loss rate without advancing steps. Walk 20 steps advances from 0 to 20: remaining loop = max(0, 20 − steps × rate) mm, with matching rate 0.8 and opposing rate 0.3. The displayed results are 4 mm and 14 mm. No empirical lifetime is claimed.",
    "recall": "A bow points along your shoe. Which knot step could you reverse?",
    "source": "Ian Fieggen, Granny Knot Info, https://www.fieggen.com/shoelace/grannyknot.htm (opened 2026-10-14), balanced/opposing stages and bow orientation; Daily-Diamond, Gregg & O'Reilly 2017, doi:10.1098/rspa.2016.0770, full paper opened at https://escholarship.org/content/qt7qs984k7/qt7qs984k7_noSplash_66a8485e2a04a2d12bd2baeb463325cf.pdf. The model step decrements are illustrative, not data.",
    "answer": 1,
    "concept": "shoelace-square-bow",
    "unit": "steps",
    "inputLabel": "Steps",
    "hook": "Which wrap pattern tends to hold better?"
  },
  {
    "slug": "long-cord-knots-itself",
    "title": "Long cord, more loops",
    "model": "cord",
    "view": "cord",
    "initial": 30,
    "min": 30,
    "max": 400,
    "step": 10,
    "values": [
      16
    ],
    "choices": [
      "0.3m string",
      "3m string"
    ],
    "question": "In the paper’s setup, which length knotted more often?",
    "idea": "The experiment used a 30cm box, one revolution per second and ten seconds of tumbling. Its short strings had no observed knots; three-metre strings knotted in 55% of the reported trials. The stage samples those observed frequencies with seed 17.",
    "limit": "These are study-conditioned model draws, not household knot odds. Plain cord; storage only.",
    "formula": "20 deterministic Bernoulli draws each with p=0 and p=0.55, fixed seed17; reported count=sum(draws). The probabilities are observed setup-specific frequencies, not true universal probabilities.",
    "recall": "Why should a tumbling-box knot frequency not be treated as your drawer’s knot probability?",
    "source": "Raymer & Smith 2007, Spontaneous knotting of an agitated string, doi:10.1073/pnas.0611320104, full text opened 2026-10-14 at https://www.mit.edu/~kardar/research/seminars/knots/RaymerSmithPNAS.pdf; p.16432 standard 0.30m box, 1 revolution/s, 10s, length dependence; p.16435 end weaving model. No household knot probability is asserted.",
    "answer": 1,
    "concept": "cord-tangle-length",
    "unit": "cm",
    "inputLabel": "Length",
    "hook": "In the paper’s setup, which length knotted more often?"
  },
  {
    "slug": "door-swing-clearance",
    "title": "A door needs a quarter-circle",
    "model": "swing",
    "view": "swing",
    "initial": 80,
    "min": 70,
    "max": 100,
    "step": 1,
    "values": [
      65
    ],
    "choices": [
      "In swing",
      "Beyond swing"
    ],
    "question": "Where can this light basket clear the door?",
    "idea": "A hinged door sweeps an arc. In this top-down drawing, placing the basket outside the door radius removes the collision; the wall opening alone does not show the space needed.",
    "limit": "Real handles and basket shapes need extra clearance. Keep exits unobstructed.",
    "formula": "Basket center radius=65cm or door width+10cm; point-basket collision when radius<door width. Door sweeps 90°.",
    "recall": "What area should you measure before putting a basket behind a door?",
    "source": null,
    "answer": 1,
    "concept": "door-swing-clearance",
    "unit": "cm",
    "inputLabel": "Door width",
    "hook": "Where can this light basket clear the door?"
  },
  {
    "slug": "furniture-through-door",
    "title": "Volume is not doorway fit",
    "model": "fit",
    "view": "fit",
    "initial": 75,
    "min": 65,
    "max": 95,
    "step": 1,
    "values": [
      80,
      60
    ],
    "choices": [
      "Broad face",
      "Narrow face"
    ],
    "question": "Which face clears the pictured opening?",
    "idea": "An object can have a small volume yet fail an opening. This drawing compares a rigid box’s two widths with the clear doorway width. Turning it changes the blocking dimension.",
    "limit": "Only a straight opening is modelled; corners, hands and trim need further measurements. Do not lift heavy furniture alone.",
    "formula": "Clearance=opening−object width; broad face=80cm, narrow=60cm. Height/depth not checked here.",
    "recall": "Which measurements matter more than litres when checking a doorway?",
    "source": null,
    "answer": 1,
    "concept": "furniture-through-door",
    "unit": "cm",
    "inputLabel": "Opening",
    "hook": "Which face clears the pictured opening?"
  },
  {
    "slug": "sofa-diagonal-room",
    "title": "The diagonal hides more length",
    "model": "diagonal",
    "view": "diagonal",
    "initial": 120,
    "min": 100,
    "max": 160,
    "step": 1,
    "values": [
      90,
      140
    ],
    "choices": [
      "Along edge",
      "On diagonal"
    ],
    "question": "Which line can contain the pictured 140cm rod?",
    "idea": "The rectangle’s diagonal is longer than either edge. A thin rod can fit along it when it is too long for the width; area alone does not answer a length-fit question.",
    "limit": "This is a thin rod, not a sofa manoeuvring guarantee; thickness and entry paths matter.",
    "formula": "Available length=width or sqrt(width²+90²); rod=140cm. Margin=available−140.",
    "recall": "Why might a thin poster tube fit diagonally but not along a box edge?",
    "source": null,
    "answer": 1,
    "concept": "sofa-diagonal-room",
    "unit": "cm",
    "inputLabel": "Room width",
    "hook": "Which line can contain the pictured 140cm rod?"
  },
  {
    "slug": "box-handle-clearance",
    "title": "A box is wider with handles",
    "model": "clearance",
    "view": "fit",
    "initial": 42,
    "min": 38,
    "max": 52,
    "step": 1,
    "values": [
      40,
      3
    ],
    "choices": [
      "Body only",
      "Include handles"
    ],
    "question": "Which measurement catches this shelf collision?",
    "idea": "The external envelope includes protrusions. Adding two handles to the body width changes the fit test even though the advertised box-body dimensions stay the same.",
    "limit": "Measure the real outermost points; soft handles may flex, which this rigid drawing does not model.",
    "formula": "Test width=40 or 40+2×3 cm. Shelf margin=opening−test width.",
    "recall": "Which parts should be included in the width of a storage box?",
    "source": null,
    "answer": 1,
    "concept": "box-handle-clearance",
    "unit": "cm",
    "inputLabel": "Shelf opening",
    "hook": "Which measurement catches this shelf collision?"
  },
  {
    "slug": "drawer-divider-cost",
    "title": "Dividers eat drawer width",
    "model": "divider",
    "view": "grid",
    "initial": 40,
    "min": 30,
    "max": 50,
    "step": 1,
    "values": [
      4,
      1
    ],
    "choices": [
      "Ignore walls",
      "Count walls"
    ],
    "question": "Which estimate leaves room for four compartments?",
    "idea": "Dividers occupy space too. The usable width of each compartment is the drawer width minus the internal walls, divided by the number of compartments.",
    "limit": "Use inside dimensions and the actual material thickness; this is a straight rectangular drawer.",
    "formula": "Four compartments: naive width=W/4; actual width=(W−3×1)/4 cm.",
    "recall": "Why can four ten-centimetre compartments fail in a forty-centimetre drawer?",
    "source": null,
    "answer": 1,
    "concept": "drawer-divider-cost",
    "unit": "cm",
    "inputLabel": "Inside width",
    "hook": "Which estimate leaves room for four compartments?"
  },
  {
    "slug": "suitcase-rotate-block",
    "title": "Rotate before buying a bigger bag",
    "model": "gridfit",
    "view": "grid",
    "initial": 30,
    "min": 28,
    "max": 40,
    "step": 1,
    "values": [
      36,
      18,
      12
    ],
    "choices": [
      "Long way",
      "Quarter-turn"
    ],
    "question": "Which orientation fits more identical blocks?",
    "idea": "For these rigid rectangles, rotation changes how many complete rows and columns fit. Empty area can remain unusable when it is in strips narrower than another block.",
    "limit": "No compression or overlapping is permitted; real clothes are not rigid rectangles.",
    "formula": "Count=floor(W/itemW)×floor(24/itemH), item=18×12 or 12×18 cm.",
    "recall": "Why does equal empty area not imply room for another packing block?",
    "source": null,
    "answer": 1,
    "concept": "suitcase-rotate-block",
    "unit": "cm",
    "inputLabel": "Bag width",
    "hook": "Which orientation fits more identical blocks?"
  },
  {
    "slug": "shoes-opposite-ends",
    "title": "Toe next to heel",
    "model": "pairpack",
    "view": "grid",
    "initial": 28,
    "min": 26,
    "max": 36,
    "step": 1,
    "values": [
      12,
      6
    ],
    "choices": [
      "Toes together",
      "Toe-to-heel"
    ],
    "question": "Which pair uses a narrower envelope?",
    "idea": "These simplified shoes have wide toes and narrow heels. Reversing one matches a wide section with a narrow section, reducing the maximum pair width without shrinking either shoe.",
    "limit": "Actual shoe contours and cleanliness matter; the shapes are illustrative.",
    "formula": "Pair envelope is 2×toe width or toe+heel width; toe=12, heel=6 cm. Bag width input; margin=bag−envelope.",
    "recall": "When can reversing an irregular object help two fit together?",
    "source": null,
    "answer": 1,
    "concept": "shoes-opposite-ends",
    "unit": "cm",
    "inputLabel": "Bag width",
    "hook": "Which pair uses a narrower envelope?"
  },
  {
    "slug": "socks-use-shoe-space",
    "title": "Use an existing hollow",
    "model": "hollow",
    "view": "volume",
    "initial": 200,
    "min": 100,
    "max": 400,
    "step": 10,
    "values": [
      600,
      800
    ],
    "choices": [
      "Beside shoe",
      "Inside hollow"
    ],
    "question": "Where do these socks add less outer volume?",
    "idea": "The shoe envelope already contains a hollow. Filling that empty region with compatible soft socks can use space that would otherwise remain empty instead of adding another outside bundle.",
    "limit": "Use clean, dry items; do not force or deform footwear. This is an ideal hollow-volume model.",
    "formula": "Outer added volume=sock volume, or max(0,socks−600); shoe envelope=800cm³.",
    "recall": "Why can filling a hollow use less bag space than adding a separate bundle?",
    "source": null,
    "answer": 1,
    "concept": "socks-use-shoe-space",
    "unit": "cm³",
    "inputLabel": "Sock volume",
    "hook": "Where do these socks add less outer volume?"
  },
  {
    "slug": "packing-cube-walls",
    "title": "A cube has an inside and an outside",
    "model": "inner-volume",
    "view": "volume",
    "initial": 30,
    "min": 24,
    "max": 36,
    "step": 1,
    "values": [
      20,
      10,
      1
    ],
    "choices": [
      "Outer volume",
      "Usable volume"
    ],
    "question": "Which figure describes space available to contents?",
    "idea": "Container walls consume some of its external volume. Multiplying the outer dimensions counts material as storage; subtracting both walls in each direction gives the ideal inner capacity.",
    "limit": "Real seams, zips and curved corners change usable space further.",
    "formula": "Outer V=W×20×10; inner V=(W−2)×18×8 cm³ for 1cm walls.",
    "recall": "Which dimensions should you multiply to estimate the contents a box can hold?",
    "source": null,
    "answer": 1,
    "concept": "packing-cube-walls",
    "unit": "cm",
    "inputLabel": "Outer width",
    "hook": "Which figure describes space available to contents?"
  },
  {
    "slug": "rolled-or-folded-volume",
    "title": "Rolling cannot erase the cloth",
    "model": "conserve",
    "view": "cloth",
    "initial": 12,
    "min": 8,
    "max": 20,
    "step": 1,
    "values": [
      30,
      20,
      0.2
    ],
    "choices": [
      "Fold it",
      "Roll it"
    ],
    "question": "With no compressed air, which uses less cloth volume?",
    "idea": "Changing shape does not remove material. This ideal sheet has the same volume rolled or folded. Real space differences come from air gaps, compression and how shapes share a bag.",
    "limit": "This is a volume conservation check, not a claim that rolling always wins or loses.",
    "formula": "Material volume=30×20×0.2 cm³ per sheet; total=input count×120, unchanged by layout.",
    "recall": "What could change real packing volume even if the cloth amount stays the same?",
    "source": null,
    "answer": 2,
    "concept": "rolled-or-folded-volume",
    "unit": "shirts",
    "inputLabel": "Count",
    "hook": "With no compressed air, which uses less cloth volume?"
  },
  {
    "slug": "folded-shirt-stack-height",
    "title": "Half the footprint, twice the stack",
    "model": "layers",
    "view": "cloth",
    "initial": 6,
    "min": 4,
    "max": 12,
    "step": 1,
    "values": [
      0.4,
      2
    ],
    "choices": [
      "One fold",
      "Two folds"
    ],
    "question": "What changes when you halve the footprint again?",
    "idea": "An ideal incompressible sheet trades footprint for thickness. Doubling the layers doubles the height of an equally sized stack while conserving material volume.",
    "limit": "Real fabrics compress and trap air; these are sheet-model dimensions.",
    "formula": "Stack height=N×0.4×layers cm, layers=2 or 4; footprint fraction=1/layers.",
    "recall": "Why can smaller folded shirts make a drawer too shallow?",
    "source": null,
    "answer": 1,
    "concept": "folded-shirt-stack-height",
    "unit": "shirts",
    "inputLabel": "Count",
    "hook": "What changes when you halve the footprint again?"
  },
  {
    "slug": "file-fold-see-each-shirt",
    "title": "See every shirt edge",
    "model": "visibility",
    "view": "order",
    "initial": 8,
    "min": 5,
    "max": 12,
    "step": 1,
    "values": [
      1
    ],
    "choices": [
      "Horizontal stack",
      "Vertical row"
    ],
    "question": "Which arrangement exposes every coloured edge?",
    "idea": "This drawing counts visible item edges. A horizontal stack hides the lower tops, while a standing row exposes each edge. The benefit here is selection, not a magical volume reduction.",
    "limit": "Choose a stable arrangement and drawer depth suited to the garments.",
    "formula": "Visible edges=1 for stack or N for row; hidden=N−visible. No claimed retrieval-time measurement.",
    "recall": "What does file folding improve even when it saves no material volume?",
    "source": null,
    "answer": 1,
    "concept": "file-fold-see-each-shirt",
    "unit": "shirts",
    "inputLabel": "Count",
    "hook": "Which arrangement exposes every coloured edge?"
  },
  {
    "slug": "suitcase-layer-access",
    "title": "Pack for the first thing you need",
    "model": "access",
    "view": "order",
    "initial": 6,
    "min": 3,
    "max": 10,
    "step": 1,
    "values": [
      1
    ],
    "choices": [
      "Target at bottom",
      "Target at top"
    ],
    "question": "Which layout needs fewer removals for the orange item?",
    "idea": "Access has a cost. In this stack model, retrieving the bottom item requires lifting everything above it; placing the first-needed item on top removes those intermediate moves.",
    "limit": "The model counts removals, not travel time; pockets and side access change the result.",
    "formula": "Removals=N−1 at bottom or 0 at top; one target and N−1 other layers.",
    "recall": "Which packing question should you ask after checking that everything fits?",
    "source": null,
    "answer": 1,
    "concept": "suitcase-layer-access",
    "unit": "layers",
    "inputLabel": "Layers",
    "hook": "Which layout needs fewer removals for the orange item?"
  },
  {
    "slug": "jacket-last-first",
    "title": "Pack the return order backwards",
    "model": "reverse-order",
    "view": "order",
    "initial": 4,
    "min": 3,
    "max": 7,
    "step": 1,
    "values": [
      1
    ],
    "choices": [
      "Use order",
      "Reverse use order"
    ],
    "question": "Which stack lets you unpack in the requested order?",
    "idea": "A top-access stack behaves last-in, first-out. To retrieve items in a known use order, put them in the reverse order; the item packed last is the first accessible.",
    "limit": "Only this stack is modelled; side-opening bags behave differently.",
    "formula": "For request order 1..N, pack 1..N causes N−1 blockers for first request; pack N..1 causes 0.",
    "recall": "Why is the last thing packed sometimes the right first thing to use?",
    "source": null,
    "answer": 1,
    "concept": "jacket-last-first",
    "unit": "items",
    "inputLabel": "Count",
    "hook": "Which stack lets you unpack in the requested order?"
  },
  {
    "slug": "heavy-book-close-to-back",
    "title": "Same weight, shorter lever",
    "model": "torque",
    "view": "mechanics",
    "initial": 2,
    "min": 1,
    "max": 4,
    "step": 0.1,
    "values": [
      30,
      10
    ],
    "choices": [
      "Far from back",
      "Near back"
    ],
    "question": "Which placement produces less static turning moment?",
    "idea": "The same weight produces a smaller static moment when its horizontal distance from the support is shorter. The drawing changes distance, not the book’s mass.",
    "limit": "This simplified support model does not predict posture, comfort or injury; follow the pack’s limits.",
    "formula": "Moment=mass×9.81×distance/100 N·m; distance=30 or 10cm.",
    "recall": "What changes when you move the same book closer to a pack’s support?",
    "source": "REI, How to Pack a Backpack, https://www.rei.com/learn/expert-advice/loading-backpack.html (opened 2026-10-14), core heavy gear, balanced sides, accessory pocket access. Card arithmetic is a static simplified model, not a comfort or safety prediction.",
    "answer": 1,
    "concept": "heavy-book-close-to-back",
    "unit": "kg",
    "inputLabel": "Book mass",
    "hook": "Which placement produces less static turning moment?"
  },
  {
    "slug": "tote-balance-sides",
    "title": "Two sides, one centre",
    "model": "balance",
    "view": "mechanics",
    "initial": 3,
    "min": 2,
    "max": 6,
    "step": 0.1,
    "values": [
      1,
      20
    ],
    "choices": [
      "Unequal sides",
      "Balance sides"
    ],
    "question": "Which layout centres the shown load?",
    "idea": "The load’s centre is a mass-weighted average of positions. Moving some of the load to the other side can put that average under the handle while leaving total mass unchanged.",
    "limit": "A centred drawing does not certify a bag’s strength or make a heavy load safe.",
    "formula": "Initial masses=m and 1kg at x=−20,+20cm; after each side=(m+1)/2. Centre=sum(mx)/sum(m).",
    "recall": "Why is the total weight insufficient to describe balance?",
    "source": "REI, How to Pack a Backpack, https://www.rei.com/learn/expert-advice/loading-backpack.html (opened 2026-10-14), core heavy gear, balanced sides, accessory pocket access. Card arithmetic is a static simplified model, not a comfort or safety prediction.",
    "answer": 1,
    "concept": "tote-balance-sides",
    "unit": "kg",
    "inputLabel": "Left mass",
    "hook": "Which layout centres the shown load?"
  },
  {
    "slug": "bag-weight-before-volume",
    "title": "A half-empty bag can be overweight",
    "model": "weight-limit",
    "view": "volume",
    "initial": 4,
    "min": 2,
    "max": 7,
    "step": 0.1,
    "values": [
      2,
      5
    ],
    "choices": [
      "Ignore mass",
      "Check mass"
    ],
    "question": "Which check notices the illustrated weight limit?",
    "idea": "Capacity in litres and a weight limit answer different questions. The example sums the contents’ masses; unused space does not subtract from that total.",
    "limit": "The five-kilogram limit is chosen for this example, not an airline or manufacturer rule.",
    "formula": "Total=variable load+2kg; chosen limit=5kg; overload=max(0,total−5). Volume not used in this calculation.",
    "recall": "Can empty space make a bag meet a weight limit?",
    "source": null,
    "answer": 1,
    "concept": "bag-weight-before-volume",
    "unit": "kg",
    "inputLabel": "Contents",
    "hook": "Which check notices the illustrated weight limit?"
  },
  {
    "slug": "towel-over-two-bars",
    "title": "Give both towel faces air",
    "model": "exposed",
    "view": "cloth",
    "initial": 70,
    "min": 50,
    "max": 90,
    "step": 1,
    "values": [
      140,
      0.5
    ],
    "choices": [
      "Faces touching",
      "Faces separated"
    ],
    "question": "Which arrangement exposes more of the chosen faces?",
    "idea": "Two cloth faces pressed together are hidden from the surrounding air in this geometric model. Separating them restores exposed area; the cloth amount has not changed.",
    "limit": "This is exposed-area bookkeeping, not a measured drying-time prediction.",
    "formula": "Area=2×W×140/10000 times fraction; touching fraction=0.5, separated=1.",
    "recall": "What should a drying-rack layout preserve besides total hanging space?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 1,
    "concept": "towel-over-two-bars",
    "unit": "cm",
    "inputLabel": "Towel width",
    "hook": "Which arrangement exposes more of the chosen faces?"
  },
  {
    "slug": "laundry-gap-air-path",
    "title": "A gap is an air path",
    "model": "gaps",
    "view": "cloth",
    "initial": 60,
    "min": 45,
    "max": 80,
    "step": 1,
    "values": [
      5,
      8
    ],
    "choices": [
      "Touching rows",
      "Spaced rows"
    ],
    "question": "Which layout leaves clear paths between these items?",
    "idea": "In this rack drawing, positive separation leaves an open channel. Packing more garments onto the same width eventually removes those channels; the count of gaps shows the trade-off.",
    "limit": "The diagram does not calculate airflow or real drying time; fabric shapes and room ventilation matter.",
    "formula": "Available gap=(rack width−5×8)/4cm; touching method sets spacing=0. Four channels count only when spacing>0.",
    "recall": "What changes when a rack is full enough that neighbouring garments touch?",
    "source": null,
    "answer": 1,
    "concept": "laundry-gap-air-path",
    "unit": "cm",
    "inputLabel": "Rack width",
    "hook": "Which layout leaves clear paths between these items?"
  },
  {
    "slug": "garment-overlap-hides-face",
    "title": "Overlap can hide a drying face",
    "model": "overlap",
    "view": "cloth",
    "initial": 30,
    "min": 10,
    "max": 60,
    "step": 1,
    "values": [
      100,
      60
    ],
    "choices": [
      "Overlapped",
      "Separate"
    ],
    "question": "Which layout exposes more cloth area?",
    "idea": "Overlap hides the contacting regions from surrounding air. Separating the illustrated sheets restores those regions, although the total amount of cloth stays the same.",
    "limit": "Real draping and edge exposure differ; no universal time saving is claimed.",
    "formula": "Two sheets each 100×60cm, both faces: 24000cm². Contact hides 2×overlap×60; separation hides 0.",
    "recall": "Why does hanging two sheets in the same outline not expose both fully?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 1,
    "concept": "garment-overlap-hides-face",
    "unit": "cm",
    "inputLabel": "Overlap",
    "hook": "Which layout exposes more cloth area?"
  },
  {
    "slug": "drying-room-water-load",
    "title": "The water goes somewhere",
    "model": "water-load",
    "view": "volume",
    "initial": 4,
    "min": 1,
    "max": 8,
    "step": 1,
    "values": [
      250,
      30
    ],
    "choices": [
      "One item",
      "Whole load"
    ],
    "question": "Which number describes water released by all items?",
    "idea": "Water leaving laundry enters the surroundings. This example multiplies retained water per item by the item count; it is a mass balance, not a forecast of room humidity.",
    "limit": "Ventilation, temperature and condensation affect the room. This card counts water only; it does not predict room humidity.",
    "warning": "Dry indoors with a window open or a vent on: the water you dry goes into the room's air, and without ventilation it can cause damp and mould.",
    "formula": "Water=250g for one item or count×250g; hypothetical complete drying, 30m³ room shown only as context.",
    "recall": "Why should you count the whole wet load rather than one garment?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 1,
    "concept": "drying-room-water-load",
    "unit": "items",
    "inputLabel": "Count",
    "hook": "Which number describes water released by all items?"
  },
  {
    "slug": "humidity-evaporation-gap",
    "title": "Humid air narrows the gap",
    "model": "humidity",
    "view": "cloth",
    "initial": 70,
    "min": 40,
    "max": 90,
    "step": 1,
    "values": [
      1
    ],
    "choices": [
      "Humid setting",
      "Drier setting"
    ],
    "question": "Which equal-temperature setting has the larger vapour-pressure gap?",
    "idea": "At equal temperature, higher relative humidity means a smaller difference between a wet surface’s saturation vapour pressure and surrounding water vapour. This model shows the gap, not a drying clock.",
    "limit": "Surface temperature, airflow and fabric also matter; no room-control advice is implied.",
    "formula": "Normalised gap=1−RH/100; comparison RH=max(0,input−30). Assumes wet surface and air have equal temperature.",
    "recall": "At the same temperature, why can high humidity hinder evaporation?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 1,
    "concept": "humidity-evaporation-gap",
    "unit": "%",
    "inputLabel": "Humidity",
    "hook": "Which equal-temperature setting has the larger vapour-pressure gap?"
  },
  {
    "slug": "breeze-is-not-extra-surface",
    "title": "Airflow and surface are different",
    "model": "flux",
    "view": "cloth",
    "initial": 1,
    "min": 1,
    "max": 3,
    "step": 0.1,
    "values": [
      2,
      1
    ],
    "choices": [
      "Still-air model",
      "Moving-air model"
    ],
    "question": "Which change alters flux while keeping exposed area fixed?",
    "idea": "The model keeps cloth area fixed and changes the assumed mass-transfer flux. Area and transfer conditions multiply; changing one does not secretly change the other.",
    "limit": "The doubled flux is an illustrative parameter, not a measured benefit from any fan.",
    "formula": "Rate=exposed area×chosen flux; area=input m²; still flux=1, moving flux=2 arbitrary water units/(m²·step).",
    "recall": "Does improving airflow expose an inner towel face that is still folded shut?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 1,
    "concept": "breeze-is-not-extra-surface",
    "unit": "m²",
    "inputLabel": "Area",
    "hook": "Which change alters flux while keeping exposed area fixed?"
  },
  {
    "slug": "wetter-cloth-more-water",
    "title": "Same layout, more water",
    "model": "water-time",
    "view": "cloth",
    "initial": 200,
    "min": 100,
    "max": 500,
    "step": 10,
    "values": [
      100
    ],
    "choices": [
      "One water load",
      "Double water load"
    ],
    "question": "Which load needs more model steps at the same rate?",
    "idea": "If the removal rate is fixed, twice as much water takes twice as many model steps. Spreading the cloth and reducing retained water address different parts of the same equation.",
    "limit": "The chosen constant rate is illustrative; real drying rates usually change over time.",
    "formula": "Steps=water/rate; rate=100g/step; water=input or 2×input.",
    "recall": "Which two quantities determine duration in a constant-rate drying model?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 1,
    "concept": "wetter-cloth-more-water",
    "unit": "g",
    "inputLabel": "Water",
    "hook": "Which load needs more model steps at the same rate?"
  },
  {
    "slug": "half-size-two-towels",
    "title": "Cut size, keep area",
    "model": "split-area",
    "view": "cloth",
    "initial": 80,
    "min": 60,
    "max": 100,
    "step": 1,
    "values": [
      120
    ],
    "choices": [
      "One rectangle",
      "Two halves"
    ],
    "question": "Does splitting this fully exposed sheet add face area?",
    "idea": "Splitting a flat rectangle preserves the combined front-and-back face area. It adds edges, but does not double the large faces; separating folded layers is a different operation.",
    "limit": "Edges and fabric thickness are omitted from this area comparison.",
    "formula": "Both layouts have area=2×width×120/10000 m²; each half has height60cm.",
    "recall": "How is cutting one flat sheet different from opening a folded one?",
    "source": null,
    "answer": 2,
    "concept": "half-size-two-towels",
    "unit": "cm",
    "inputLabel": "Width",
    "hook": "Does splitting this fully exposed sheet add face area?"
  },
  {
    "slug": "wet-knit-hang-stretch",
    "title": "Hanging concentrates the load",
    "model": "support-load",
    "view": "cloth",
    "initial": 600,
    "min": 300,
    "max": 900,
    "step": 10,
    "values": [
      2,
      6
    ],
    "choices": [
      "Two support points",
      "Six support points"
    ],
    "question": "Which ideal support shares less load per point?",
    "idea": "In an ideal equal-share model, more support points reduce the load assigned to each. A garment’s care label can require flat drying; this drawing explains support sharing without predicting fabric stretch.",
    "limit": "Real knit deformation is not calculated. Follow the garment’s drying instructions.",
    "formula": "Load per point=water-plus-garment mass/2 or /6 g-equivalent; equal sharing assumed.",
    "recall": "Why should a flat-dry instruction take priority over a convenient hanger?",
    "source": "GINETEX, CARE SYMBOLS, https://www.ginetex.net/article/FR/care-symbols (opened 2026-10-14), natural drying: flat, line, drip and shade; this lesson uses text instructions and original clothing drawings, not licensed care-symbol artwork.",
    "answer": 1,
    "concept": "wet-knit-hang-stretch",
    "unit": "g",
    "inputLabel": "Wet mass",
    "hook": "Which ideal support shares less load per point?"
  },
  {
    "slug": "towel-thickness-hidden-volume",
    "title": "Thicker cloth, less face per volume",
    "model": "area-volume",
    "view": "cloth",
    "initial": 2,
    "min": 1,
    "max": 5,
    "step": 0.1,
    "values": [
      50,
      100
    ],
    "choices": [
      "Thin sheet",
      "Double thickness"
    ],
    "question": "Which sheet has less face area per material volume?",
    "idea": "Doubling thickness at the same width and length doubles material volume while keeping the two large face areas fixed. The area-to-volume ratio therefore halves.",
    "limit": "This geometric ratio alone does not determine a fabric’s drying time.",
    "formula": "Face area=2×50×100cm²; volume=50×100×thickness/10 cm³, doubled for comparison. Ratio=area/volume cm⁻¹.",
    "recall": "What happens to face-area-to-volume ratio when thickness doubles?",
    "source": null,
    "answer": 1,
    "concept": "towel-thickness-hidden-volume",
    "unit": "mm",
    "inputLabel": "Thickness",
    "hook": "Which sheet has less face area per material volume?"
  },
  {
    "slug": "fitted-sheet-corners-nest",
    "title": "Put the corner inside the corner",
    "model": "nest",
    "view": "cloth",
    "initial": 4,
    "min": 3,
    "max": 7,
    "step": 1,
    "values": [
      8,
      2
    ],
    "choices": [
      "Separate pockets",
      "Nested pockets"
    ],
    "question": "Which ideal arrangement uses less pocket envelope?",
    "idea": "These hollow corner pockets occupy separate envelopes when spread apart. Nesting them shares that hollow region while leaving a layer allowance for each extra corner.",
    "limit": "Real elastic and seams change the envelope; this is a nesting model, not a complete folding tutorial.",
    "formula": "Separate height=count×8cm; nested height=8+(count−1)×2cm.",
    "recall": "Why can nesting hollow shapes save envelope space without removing material?",
    "source": null,
    "answer": 1,
    "concept": "fitted-sheet-corners-nest",
    "unit": "corners",
    "inputLabel": "Count",
    "hook": "Which ideal arrangement uses less pocket envelope?"
  },
  {
    "slug": "pillowcase-set-kit",
    "title": "One set, one retrieval",
    "model": "group-access",
    "view": "order",
    "initial": 4,
    "min": 3,
    "max": 7,
    "step": 1,
    "values": [
      3
    ],
    "choices": [
      "Scattered pieces",
      "One set kit"
    ],
    "question": "Which setup uses fewer container visits for a complete set?",
    "idea": "The example counts separate locations, not seconds. Keeping the chosen set’s pieces together replaces multiple location visits with one, while separating unlike sets can preserve identification.",
    "limit": "It is an organisation trade-off, not proof that every object should be grouped.",
    "formula": "Chosen set has three pieces: scattered visits=min(input locations,3), kit visits=1.",
    "recall": "When is grouping by a complete set more useful than grouping by item type?",
    "source": null,
    "answer": 1,
    "concept": "pillowcase-set-kit",
    "unit": "places",
    "inputLabel": "Locations",
    "hook": "Which setup uses fewer container visits for a complete set?"
  },
  {
    "slug": "sock-pairing-by-pattern",
    "title": "Match a pattern before searching",
    "model": "pair-search",
    "view": "order",
    "initial": 6,
    "min": 4,
    "max": 10,
    "step": 2,
    "values": [
      2
    ],
    "choices": [
      "One mixed pile",
      "Two pattern bins"
    ],
    "question": "Which search pool contains fewer candidate socks?",
    "idea": "Sorting the pictured socks by pattern shrinks the candidate pool for a match. The model counts candidates; it does not claim a measured time saving or guarantee that both socks are present.",
    "limit": "Extra bins add setup work; sorting only helps if the labels match the question.",
    "formula": "Candidate count=N−1 in mixed pool, ceil(N/2)−1 in one of two equal pattern groups.",
    "recall": "What makes a sorting rule useful for finding a matching sock?",
    "source": null,
    "answer": 1,
    "concept": "sock-pairing-by-pattern",
    "unit": "socks",
    "inputLabel": "Socks",
    "hook": "Which search pool contains fewer candidate socks?"
  },
  {
    "slug": "sock-pairs-not-all-combinations",
    "title": "Six socks are not six possible pairs",
    "model": "combinations",
    "view": "order",
    "initial": 6,
    "min": 4,
    "max": 10,
    "step": 2,
    "values": [
      1
    ],
    "choices": [
      "All possible pairs",
      "Marked partners"
    ],
    "question": "Which method checks fewer pairs in this matching puzzle?",
    "idea": "Without partner marks, every unordered pair is a candidate. Unique partner marks reduce the pictured task to one match per marked pair. The combinatorial growth explains the appeal of distinctive patterns.",
    "limit": "Real socks may have multiple identical partners; unique marks are an assumption here.",
    "formula": "Candidates=N(N−1)/2 versus floor(N/2) marked pairs; N is an even illustrative sock count after rounding down.",
    "recall": "Why can a unique partner mark change a matching task more than a tidy pile?",
    "source": null,
    "answer": 1,
    "concept": "sock-pairs-not-all-combinations",
    "unit": "socks",
    "inputLabel": "Count",
    "hook": "Which method checks fewer pairs in this matching puzzle?"
  },
  {
    "slug": "laundry-sort-before-walk",
    "title": "Carry once, sort at the start",
    "model": "trips",
    "view": "route",
    "initial": 8,
    "min": 4,
    "max": 12,
    "step": 1,
    "values": [
      4
    ],
    "choices": [
      "One-item trips",
      "Grouped trip"
    ],
    "question": "Which plan travels less in the pictured route?",
    "idea": "For a fixed route and unlimited carrying capacity, one grouped trip pays the distance once instead of once per item. The picture compares repeated travel with a single batch.",
    "limit": "Capacity and urgency may rule out batching; the result is route arithmetic, not measured chore time.",
    "formula": "Round trip distance=2×4m; total=8×item count or 8m for one batch.",
    "recall": "What assumption can make one large batch infeasible?",
    "source": null,
    "answer": 1,
    "concept": "laundry-sort-before-walk",
    "unit": "items",
    "inputLabel": "Count",
    "hook": "Which plan travels less in the pictured route?"
  },
  {
    "slug": "small-items-in-mesh",
    "title": "Count items inside the boundary",
    "model": "contain",
    "view": "grid",
    "initial": 8,
    "min": 4,
    "max": 12,
    "step": 1,
    "values": [
      2
    ],
    "choices": [
      "Loose items",
      "Closed mesh bag"
    ],
    "question": "Which boundary keeps the pictured small items together?",
    "idea": "The closed bag in this simplified drawing keeps the listed items in one group. The useful question is whether the closure and mesh suit the items; merely placing them near one another adds no boundary.",
    "limit": "Follow appliance and garment guidance. The picture does not estimate damage prevention or cleaning performance.",
    "formula": "Contained count=0 with no boundary or N with a closed ideal bag; all items larger than openings.",
    "recall": "Which two properties matter when a bag is meant to retain small items?",
    "source": "Bosch manufacturer, product 00461036 Wäschenetz, https://www.bosch-home.com/de/de/product/waschen-trocknen/zubehoer-trockner/wollekorb-trockner/00461036 (retrieved 2026-10-14); two nets for delicate/small items. Card only models retaining items, not measured damage reduction.",
    "answer": 1,
    "concept": "small-items-in-mesh",
    "unit": "items",
    "inputLabel": "Count",
    "hook": "Which boundary keeps the pictured small items together?"
  },
  {
    "slug": "care-label-first-choice",
    "title": "The label beats the fastest layout",
    "model": "label-rule",
    "view": "cloth",
    "initial": 3,
    "min": 2,
    "max": 6,
    "step": 1,
    "values": [
      1
    ],
    "choices": [
      "Hang every item",
      "Respect flat-dry text"
    ],
    "question": "Which layout follows the shown flat-dry instruction?",
    "idea": "The example garment’s instruction is flat dry. Selecting a convenient line-dry arrangement does not override that instruction; the task is to choose a compatible method before optimising space.",
    "limit": "Read the real label; different garments permit different processes. No care-symbol artwork is reproduced.",
    "formula": "Compatible items=0 if all chosen garments hang, or N when placed flat, given the stated flat-dry instruction.",
    "recall": "Which information should you check before applying a generic drying hack?",
    "source": "GINETEX, CARE SYMBOLS, https://www.ginetex.net/article/FR/care-symbols (opened 2026-10-14), natural drying: flat, line, drip and shade; this lesson uses text instructions and original clothing drawings, not licensed care-symbol artwork.",
    "answer": 1,
    "concept": "care-label-first-choice",
    "unit": "items",
    "inputLabel": "Count",
    "hook": "Which layout follows the shown flat-dry instruction?"
  },
  {
    "slug": "shelf-front-labels",
    "title": "A label behind a box is hidden",
    "model": "label-face",
    "view": "order",
    "initial": 6,
    "min": 4,
    "max": 10,
    "step": 1,
    "values": [
      1
    ],
    "choices": [
      "Labels on back",
      "Labels on front"
    ],
    "question": "Which layout exposes the written addresses?",
    "idea": "The picture uses opaque boxes. A rear-facing label is blocked when the boxes stay on the shelf; a front-facing address is visible from the shown viewpoint.",
    "limit": "Visibility is viewpoint-dependent; this card does not measure search time.",
    "formula": "Visible addresses=0 for rear faces or N for front faces in opaque front-view geometry.",
    "recall": "Why is label placement part of an address system?",
    "source": null,
    "answer": 1,
    "concept": "shelf-front-labels",
    "unit": "boxes",
    "inputLabel": "Count",
    "hook": "Which layout exposes the written addresses?"
  },
  {
    "slug": "transparent-box-visibility",
    "title": "See through, or open it",
    "model": "transparent",
    "view": "grid",
    "initial": 6,
    "min": 4,
    "max": 10,
    "step": 1,
    "values": [
      1
    ],
    "choices": [
      "Opaque boxes",
      "Clear fronts"
    ],
    "question": "Which layout shows the orange item without opening boxes?",
    "idea": "Under this ideal clear-front assumption, contents are visible from the shown viewpoint. Opaque boxes require another cue such as an address; transparency changes observation, not where the item is.",
    "limit": "Real translucent materials, crowded contents and lighting can still obscure objects.",
    "formula": "Visible target=0 in opaque model,1 in clear model; possible boxes=N.",
    "recall": "What can still prevent identification through a clear container?",
    "source": null,
    "answer": 1,
    "concept": "transparent-box-visibility",
    "unit": "boxes",
    "inputLabel": "Count",
    "hook": "Which layout shows the orange item without opening boxes?"
  },
  {
    "slug": "group-cables-with-ends",
    "title": "A bundle still has loose ends",
    "model": "end-paths",
    "view": "cord",
    "initial": 4,
    "min": 2,
    "max": 8,
    "step": 1,
    "values": [
      2
    ],
    "choices": [
      "Loose ends",
      "Secure bundle ends"
    ],
    "question": "Which layout removes the depicted free-end paths?",
    "idea": "Bundling the middle leaves ends that can still weave through loops. The drawing distinguishes keeping strands together from restricting the ends’ routes.",
    "limit": "Plain cord; storage only. The drawing gives no electrical safety limit or product-specific bend radius.",
    "formula": "Free ends=2×cord count before,0 depicted accessible ends after securing; knots/tangles not simulated.",
    "recall": "Why might a tie around the middle leave an end-related tangle pathway?",
    "source": "Raymer & Smith 2007, Spontaneous knotting of an agitated string, doi:10.1073/pnas.0611320104, full text opened 2026-10-14 at https://www.mit.edu/~kardar/research/seminars/knots/RaymerSmithPNAS.pdf; p.16432 standard 0.30m box, 1 revolution/s, 10s, length dependence; p.16435 end weaving model. No household knot probability is asserted.",
    "answer": 1,
    "concept": "group-cables-with-ends",
    "unit": "cords",
    "inputLabel": "Count",
    "hook": "Which layout removes the depicted free-end paths?"
  },
  {
    "slug": "elastic-loop-release",
    "title": "A loop is not a permanent knot",
    "model": "loop-release",
    "view": "cord",
    "initial": 20,
    "min": 15,
    "max": 35,
    "step": 1,
    "values": [
      10
    ],
    "choices": [
      "End through loop",
      "Slide loop off"
    ],
    "question": "Which manipulation removes the drawn crossing?",
    "idea": "A crossing in a two-dimensional drawing is not enough to prove a knot. This open loop can be slid over an accessible end, removing the shown crossing without cutting the cord.",
    "limit": "Plain cord; storage only. The drawing gives no electrical safety limit or product-specific bend radius.",
    "formula": "Depicted crossings=1 or0; available free end=input cm, required loop travel=10cm.",
    "recall": "Why does the position of a free end matter when judging a tangle?",
    "source": "Raymer & Smith 2007, Spontaneous knotting of an agitated string, doi:10.1073/pnas.0611320104, full text opened 2026-10-14 at https://www.mit.edu/~kardar/research/seminars/knots/RaymerSmithPNAS.pdf; p.16432 standard 0.30m box, 1 revolution/s, 10s, length dependence; p.16435 end weaving model. No household knot probability is asserted.",
    "answer": 1,
    "concept": "elastic-loop-release",
    "unit": "cm",
    "inputLabel": "Free end",
    "hook": "Which manipulation removes the drawn crossing?"
  },
  {
    "slug": "coiled-cord-bend-radius",
    "title": "Tighter coils, more curvature",
    "model": "coil-radius",
    "view": "cord",
    "initial": 10,
    "min": 5,
    "max": 20,
    "step": 0.5,
    "values": [
      200
    ],
    "choices": [
      "Chosen radius",
      "Double radius"
    ],
    "question": "Which coil bends the cord more gently?",
    "idea": "A circle’s curvature is the reciprocal of its radius. A larger-radius loop uses more length per turn and bends less sharply; neither the cord material nor total length changes.",
    "limit": "Plain cord; storage only. The drawing gives no electrical safety limit or product-specific bend radius.",
    "formula": "Circumference=2πr; turns=200/(2πr); curvature=1/r cm⁻¹; comparison radius=2r.",
    "recall": "Which dimension determines the sharpness of a circular bend?",
    "source": null,
    "answer": 1,
    "concept": "coiled-cord-bend-radius",
    "unit": "cm",
    "inputLabel": "Radius",
    "hook": "Which coil bends the cord more gently?"
  },
  {
    "slug": "mug-handle-packing",
    "title": "Handles break the neat circle",
    "model": "handle-envelope",
    "view": "grid",
    "initial": 36,
    "min": 30,
    "max": 48,
    "step": 1,
    "values": [
      8,
      3
    ],
    "choices": [
      "Body diameter",
      "Handle envelope"
    ],
    "question": "Which estimate avoids the pictured handle overlap?",
    "idea": "Counting only cup diameters ignores their handles. The conservative side-by-side layout uses the complete horizontal envelope for each empty cup.",
    "limit": "These are empty cups on a low surface; no hot-liquid packing advice. Handles may interleave in other layouts.",
    "formula": "Row count=floor(W/8) ignoring handle or floor(W/(8+3)) including handle.",
    "recall": "Why does a cup’s diameter not give its complete packing width?",
    "source": null,
    "answer": 1,
    "concept": "mug-handle-packing",
    "unit": "cm",
    "inputLabel": "Tray width",
    "hook": "Which estimate avoids the pictured handle overlap?"
  },
  {
    "slug": "circle-tray-square-corners",
    "title": "Rotating a circle changes nothing",
    "model": "circle-fit",
    "view": "grid",
    "initial": 28,
    "min": 22,
    "max": 34,
    "step": 1,
    "values": [
      10
    ],
    "choices": [
      "First orientation",
      "Rotate circles"
    ],
    "question": "Can rotation alone put more equal circles in this grid?",
    "idea": "A circle is unchanged by rotation. In the selected square-grid arrangement, rotating each disc cannot alter the row count; changing the arrangement would be a separate experiment.",
    "limit": "This is not an optimal circle-packing solver; staggered rows can behave differently.",
    "formula": "Count=floor(W/10)² in both selected square grids, disc diameter10cm.",
    "recall": "Which kind of packing change can matter for circles when rotation cannot?",
    "source": null,
    "answer": 2,
    "concept": "circle-tray-square-corners",
    "unit": "cm",
    "inputLabel": "Tray side",
    "hook": "Can rotation alone put more equal circles in this grid?"
  },
  {
    "slug": "round-box-leftover-gap",
    "title": "Round inside square leaves corners",
    "model": "circle-area",
    "view": "geometry",
    "initial": 20,
    "min": 15,
    "max": 30,
    "step": 1,
    "values": [
      1
    ],
    "choices": [
      "Square footprint",
      "Inscribed circle"
    ],
    "question": "Which shape leaves unused corners in this square space?",
    "idea": "The inscribed circle touches all four sides yet occupies less area than the square. Corner gaps remain outside the circular footprint; touching the sides is not the same as filling the region.",
    "limit": "This is two-dimensional area, not a complete storage-capacity estimate.",
    "formula": "Square=W²; circle=π(W/2)²; unused corner area=W²−πW²/4 cm².",
    "recall": "Why can a round tray touching four sides still leave unused area?",
    "source": null,
    "answer": 1,
    "concept": "round-box-leftover-gap",
    "unit": "cm",
    "inputLabel": "Square side",
    "hook": "Which shape leaves unused corners in this square space?"
  },
  {
    "slug": "rectangular-bin-nesting",
    "title": "Walls limit nesting depth",
    "model": "nested-wall",
    "view": "volume",
    "initial": 4,
    "min": 2,
    "max": 8,
    "step": 1,
    "values": [
      10,
      1
    ],
    "choices": [
      "Separate bins",
      "Nested bins"
    ],
    "question": "Which ideal stack has a shorter outside height?",
    "idea": "For these tapered ideal bins, nesting shares hollow height while each additional rim adds a small increment. Solid boxes without a nesting shape do not share the same geometry.",
    "limit": "Check real taper and rims; this is not a universal storage ratio.",
    "formula": "Separate height=N×10; nested height=10+(N−1)×1 cm.",
    "recall": "Which shape feature allows empty containers to nest?",
    "source": null,
    "answer": 1,
    "concept": "rectangular-bin-nesting",
    "unit": "bins",
    "inputLabel": "Count",
    "hook": "Which ideal stack has a shorter outside height?"
  },
  {
    "slug": "flat-pack-volume-dimensions",
    "title": "Same panels, different envelope",
    "model": "flat-pack",
    "view": "volume",
    "initial": 1,
    "min": 0.5,
    "max": 3,
    "step": 0.1,
    "values": [
      40,
      30,
      6
    ],
    "choices": [
      "Assembled cube",
      "Panels stacked"
    ],
    "question": "Which empty-object envelope is smaller?",
    "idea": "An empty assembled object includes a large hollow in its envelope. Stacking the ideal panels removes that hollow from the outside dimensions while retaining all panel material.",
    "limit": "Real hardware and edges add volume; never dismantle furniture unless its instructions permit it.",
    "formula": "Six panels 40×30×input cm. Stack V=40×30×6×input; assembled reference envelope=40×30×30 cm³.",
    "recall": "What disappears when an empty panel-built object becomes a flat stack?",
    "source": null,
    "answer": 1,
    "concept": "flat-pack-volume-dimensions",
    "unit": "cm",
    "inputLabel": "Panel thickness",
    "hook": "Which empty-object envelope is smaller?"
  },
  {
    "slug": "rug-chair-pullback",
    "title": "Chairs need room beyond the table",
    "model": "rug-clearance",
    "view": "geometry",
    "initial": 120,
    "min": 100,
    "max": 160,
    "step": 1,
    "values": [
      60
    ],
    "choices": [
      "Table footprint",
      "Include pullback"
    ],
    "question": "Which rug covers the pictured chair movement?",
    "idea": "The drawing reserves space outside the table footprint for the selected chair movement. Adding that allowance at both sides produces a wider rectangle; the table dimensions alone omit it.",
    "limit": "The sixty-centimetre movement is chosen for this illustration, not an ergonomic recommendation. Check actual furniture and clear paths.",
    "formula": "Rug width=table width or table width+2×60cm; fixed chosen pullback60cm each side.",
    "recall": "Which extra dimension matters when planning a rug around movable chairs?",
    "source": null,
    "answer": 1,
    "concept": "rug-chair-pullback",
    "unit": "cm",
    "inputLabel": "Table width",
    "hook": "Which rug covers the pictured chair movement?"
  },
  {
    "slug": "shelf-gap-wasted-height",
    "title": "Small boxes under tall gaps",
    "model": "shelf-height",
    "view": "grid",
    "initial": 35,
    "min": 25,
    "max": 45,
    "step": 1,
    "values": [
      12,
      3
    ],
    "choices": [
      "Fixed tall gap",
      "Adjust gap"
    ],
    "question": "Which layout wastes less vertical space above these boxes?",
    "idea": "The illustration subtracts box height from shelf clearance. Adjusting unused gap can create useful room elsewhere, provided the new opening still fits the box and hand allowance.",
    "limit": "Shelf strength and mounting are outside this card; use manufacturer instructions.",
    "formula": "Unused height=gap−12 or max(0,15−12)cm; chosen hand allowance3cm.",
    "recall": "Which clearance should remain when reducing a shelf gap?",
    "source": null,
    "answer": 1,
    "concept": "shelf-gap-wasted-height",
    "unit": "cm",
    "inputLabel": "Gap",
    "hook": "Which layout wastes less vertical space above these boxes?"
  },
  {
    "slug": "trays-slide-out-reach",
    "title": "Move the tray, shorten the reach",
    "model": "reach",
    "view": "geometry",
    "initial": 50,
    "min": 35,
    "max": 65,
    "step": 1,
    "values": [
      30
    ],
    "choices": [
      "Fixed back item",
      "Slide tray out"
    ],
    "question": "Which position reduces the shown horizontal reach?",
    "idea": "Sliding the tray brings the same back item toward the front. The drawing subtracts travel from depth; it changes access distance without changing the shelf’s storage volume.",
    "limit": "Use trays and slides within their limits; this card models only horizontal distance.",
    "formula": "Reach=depth or max(0,depth−30)cm, selected tray travel30cm.",
    "recall": "Which dimension changes when a rear item rides forward on a tray?",
    "source": null,
    "answer": 1,
    "concept": "trays-slide-out-reach",
    "unit": "cm",
    "inputLabel": "Shelf depth",
    "hook": "Which position reduces the shown horizontal reach?"
  },
  {
    "slug": "desk-supply-near-use",
    "title": "Store it where the route ends",
    "model": "distance-use",
    "view": "route",
    "initial": 4,
    "min": 2,
    "max": 8,
    "step": 0.5,
    "values": [
      6
    ],
    "choices": [
      "Across room",
      "At work point"
    ],
    "question": "Which location reduces this repeated retrieval route?",
    "idea": "For the pictured task, retrieving the same supply across the room repeatedly multiplies the walking distance. A copy at the use point removes that route, at the cost of another storage location.",
    "limit": "The model ignores setup and clutter; it is not a productivity measurement.",
    "formula": "Distance=2×input metres×6 uses or0m at use point.",
    "recall": "When can a second storage location remove repeated travel?",
    "source": null,
    "answer": 1,
    "concept": "desk-supply-near-use",
    "unit": "m",
    "inputLabel": "Distance",
    "hook": "Which location reduces this repeated retrieval route?"
  },
  {
    "slug": "keys-fixed-drop-zone",
    "title": "An address changes the search",
    "model": "known-address",
    "view": "order",
    "initial": 6,
    "min": 3,
    "max": 10,
    "step": 1,
    "values": [
      1
    ],
    "choices": [
      "Unknown box",
      "Known address"
    ],
    "question": "Which search needs fewer possible box checks?",
    "idea": "In the stated worst-case search, an unknown location may require checking every box. A maintained address directs the search to one box; the benefit depends on returning the item to that address.",
    "limit": "This counts checks, not forgetfulness or memory performance.",
    "formula": "Worst-case checks=N unknown boxes or1 maintained address.",
    "recall": "What ongoing action makes an assigned storage address reliable?",
    "source": null,
    "answer": 1,
    "concept": "keys-fixed-drop-zone",
    "unit": "boxes",
    "inputLabel": "Possible places",
    "hook": "Which search needs fewer possible box checks?"
  },
  {
    "slug": "duplicates-two-stations",
    "title": "One tool or two locations?",
    "model": "two-stations",
    "view": "route",
    "initial": 5,
    "min": 3,
    "max": 9,
    "step": 0.5,
    "values": [
      4
    ],
    "choices": [
      "One shared tool",
      "One at each desk"
    ],
    "question": "Which layout removes the shown shuttle trips?",
    "idea": "The example alternates between two stations. A tool at each avoids carrying one back and forth, while increasing the number of tools stored; the stage makes that trade-off explicit.",
    "limit": "This is a chosen route, not a claim that duplicates always improve organisation.",
    "formula": "Travel=distance×4 transfers or0; stored tools=1 or2.",
    "recall": "Which cost increases when duplicates remove a shared-tool route?",
    "source": null,
    "answer": 1,
    "concept": "duplicates-two-stations",
    "unit": "m",
    "inputLabel": "Desk distance",
    "hook": "Which layout removes the shown shuttle trips?"
  },
  {
    "slug": "labels-specific-address",
    "title": "A category is not a location",
    "model": "address-specific",
    "view": "order",
    "initial": 8,
    "min": 4,
    "max": 12,
    "step": 1,
    "values": [
      2
    ],
    "choices": [
      "Broad category",
      "Unique box address"
    ],
    "question": "Which label narrows this search to one box?",
    "idea": "A broad category may include several boxes. A unique box address specifies one location in the pictured system; category and location labels answer different questions.",
    "limit": "The item must still be put back correctly; labels alone do not enforce storage.",
    "formula": "Candidate boxes=ceil(N/2) in a chosen category or1 unique address.",
    "recall": "What does a location label add beyond a category name?",
    "source": null,
    "answer": 1,
    "concept": "labels-specific-address",
    "unit": "boxes",
    "inputLabel": "Count",
    "hook": "Which label narrows this search to one box?"
  },
  {
    "slug": "seasonal-bin-rotation",
    "title": "Frequent use belongs near access",
    "model": "weighted-access",
    "view": "order",
    "initial": 8,
    "min": 4,
    "max": 12,
    "step": 1,
    "values": [
      1,
      4
    ],
    "choices": [
      "Frequent bin at back",
      "Frequent bin at front"
    ],
    "question": "Which layout needs fewer removals over these requests?",
    "idea": "Access cost should be counted across uses. Moving the frequently requested bin to the front reduces repeated blocker removals in this particular queue; the rarely requested bin can tolerate a longer path.",
    "limit": "The frequencies are chosen examples, not measured household behaviour.",
    "formula": "Two bins, access positions1 andN; frequent request4 times, rare1. Removals before=4(N−1), after=(N−1).",
    "recall": "Why can frequency matter more than a single retrieval when arranging bins?",
    "source": null,
    "answer": 1,
    "concept": "seasonal-bin-rotation",
    "unit": "depth",
    "inputLabel": "Back position",
    "hook": "Which layout needs fewer removals over these requests?"
  },
  {
    "slug": "lids-match-by-size",
    "title": "Fit needs diameter, not a colour",
    "model": "diameter-match",
    "view": "geometry",
    "initial": 18,
    "min": 14,
    "max": 24,
    "step": 1,
    "values": [
      18,
      20
    ],
    "choices": [
      "Match colour",
      "Match diameter"
    ],
    "question": "Which lid matches the pictured round opening?",
    "idea": "This fit test compares the opening diameter with lid diameter. A matching colour supplies no geometric constraint; the selected equal-diameter example meets the simplified size condition.",
    "limit": "Real lids also need the right rim, seal and shape; equal diameter alone does not guarantee compatibility.",
    "formula": "Mismatch=abs(opening−20cm) for colour choice or0 for a selected matching-diameter lid.",
    "recall": "Why does equal diameter still fail to guarantee a real lid fit?",
    "source": null,
    "answer": 1,
    "concept": "lids-match-by-size",
    "unit": "cm",
    "inputLabel": "Opening diameter",
    "hook": "Which lid matches the pictured round opening?"
  },
  {
    "slug": "nested-box-retrieval",
    "title": "Saved space can cost access",
    "model": "nest-access",
    "view": "order",
    "initial": 5,
    "min": 3,
    "max": 8,
    "step": 1,
    "values": [
      1
    ],
    "choices": [
      "Deep nesting",
      "Separate boxes"
    ],
    "question": "Which layout gives the inner target fewer blockers?",
    "idea": "Nesting can share empty envelope space while adding objects that must be removed to reach an inner target. Separate storage trades a larger footprint for immediate access in this drawing.",
    "limit": "The best choice depends on use frequency and space; this is not a universal ranking.",
    "formula": "Blockers=N−1 nested containers or0 separately accessible containers.",
    "recall": "Which second metric should accompany space saved by nesting?",
    "source": null,
    "answer": 1,
    "concept": "nested-box-retrieval",
    "unit": "boxes",
    "inputLabel": "Count",
    "hook": "Which layout gives the inner target fewer blockers?"
  },
  {
    "slug": "spacer-protects-clearance",
    "title": "A fit with no margin is fragile",
    "model": "tolerance",
    "view": "fit",
    "initial": 30,
    "min": 27,
    "max": 35,
    "step": 0.1,
    "values": [
      28,
      1
    ],
    "choices": [
      "Nominal fit",
      "Allow uncertainty"
    ],
    "question": "Which fit check includes the pictured size uncertainty?",
    "idea": "Subtracting the largest plausible object size from the smallest plausible opening produces a more conservative margin than comparing nominal values. The card makes the uncertainty allowance visible.",
    "limit": "The one-centimetre bounds are hypothetical; measure real parts and use appropriate tolerances.",
    "formula": "Nominal margin=opening−28; bounded margin=(opening−1)−(28+1) cm.",
    "recall": "Which extremes should be compared for a conservative clearance check?",
    "source": null,
    "answer": 1,
    "concept": "spacer-protects-clearance",
    "unit": "cm",
    "inputLabel": "Opening",
    "hook": "Which fit check includes the pictured size uncertainty?"
  },
  {
    "slug": "wrapping-paper-minimum-area",
    "title": "A box has six faces",
    "model": "box-area",
    "view": "geometry",
    "initial": 20,
    "min": 15,
    "max": 30,
    "step": 1,
    "values": [
      10,
      8
    ],
    "choices": [
      "One rectangle",
      "All six faces"
    ],
    "question": "Which estimate covers the entire closed box surface?",
    "idea": "The box has three pairs of equal faces. A single footprint rectangle omits the top and sides; adding all six gives the ideal surface area before overlaps.",
    "limit": "Wrapping paper also needs overlaps, folds and trim; this is only a geometric lower bound.",
    "formula": "Surface=2(W×10+W×8+10×8)cm²; footprint=W×10cm².",
    "recall": "Why is a box’s surface area only a lower bound for wrapping paper?",
    "source": null,
    "answer": 1,
    "concept": "wrapping-paper-minimum-area",
    "unit": "cm",
    "inputLabel": "Box length",
    "hook": "Which estimate covers the entire closed box surface?"
  },
  {
    "slug": "ribbon-around-box-length",
    "title": "Two loops share the same height",
    "model": "ribbon",
    "view": "geometry",
    "initial": 20,
    "min": 15,
    "max": 30,
    "step": 1,
    "values": [
      10,
      8,
      20
    ],
    "choices": [
      "Around one direction",
      "Crossed loops"
    ],
    "question": "Which length includes both crossed ribbon loops?",
    "idea": "Each rectangular loop travels around a width and the box height. Crossing two loops counts the height four times; then the chosen bow allowance is added separately.",
    "limit": "Real knots and routing can need extra ribbon; the allowance is illustrative.",
    "formula": "One loop=2(W+8)+20; crossed=2(W+8)+2(10+8)+20cm.",
    "recall": "Which box dimension appears in both crossed ribbon loops?",
    "source": null,
    "answer": 1,
    "concept": "ribbon-around-box-length",
    "unit": "cm",
    "inputLabel": "Box length",
    "hook": "Which length includes both crossed ribbon loops?"
  },
  {
    "slug": "tape-mark-same-spacing",
    "title": "Small step errors accumulate",
    "model": "mark-error",
    "view": "ruler",
    "initial": 5,
    "min": 3,
    "max": 10,
    "step": 1,
    "values": [
      10,
      0.2
    ],
    "choices": [
      "Step from last mark",
      "Measure from origin"
    ],
    "question": "Which method avoids compounding this repeated bias?",
    "idea": "A biased step repeated from the previous mark adds its error each time. Measuring each chosen position from one origin avoids that particular accumulation, though the measuring tool can still have its own errors.",
    "limit": "The bias is hypothetical, not a specification for real tape measures.",
    "formula": "Nth error=N×0.2cm for stepped marks or0.2cm for one-origin readings; target pitch10cm.",
    "recall": "Which error does a common measuring origin prevent?",
    "source": null,
    "answer": 1,
    "concept": "tape-mark-same-spacing",
    "unit": "marks",
    "inputLabel": "Count",
    "hook": "Which method avoids compounding this repeated bias?"
  },
  {
    "slug": "measure-diagonal-for-square",
    "title": "Equal sides do not prove square",
    "model": "square-test",
    "view": "diagonal",
    "initial": 70,
    "min": 60,
    "max": 80,
    "step": 1,
    "values": [
      60
    ],
    "choices": [
      "Sheared corner",
      "Square corner"
    ],
    "question": "Which shape has equal diagonals in this example?",
    "idea": "A parallelogram can retain opposite side lengths while its corners skew. Its two diagonals differ unless the included angle is ninety degrees in this example; a diagonal comparison detects the skew.",
    "limit": "Equal diagonals alone do not prove every arbitrary quadrilateral is a rectangle; the parallelogram condition matters.",
    "formula": "For side lengths60 and input cm: square diagonals=sqrt(a²+b²); skew angle70° gives sqrt(a²+b²±2abcos70°).",
    "recall": "Which shape assumption makes this diagonal check informative?",
    "source": null,
    "answer": 1,
    "concept": "measure-diagonal-for-square",
    "unit": "cm",
    "inputLabel": "Side",
    "hook": "Which shape has equal diagonals in this example?"
  },
  {
    "slug": "ruler-start-not-zero",
    "title": "Subtract the starting mark",
    "model": "ruler-offset",
    "view": "ruler",
    "initial": 18,
    "min": 12,
    "max": 25,
    "step": 1,
    "values": [
      3
    ],
    "choices": [
      "Read endpoint",
      "Subtract start"
    ],
    "question": "Which reading gives this object’s length?",
    "idea": "The object begins at the three-centimetre mark. Its length is the endpoint minus its start; the endpoint reading alone includes the unused part of the ruler.",
    "limit": "A damaged zero can be bypassed with a known start, but check the ruler’s scale.",
    "formula": "Length=endpoint−3cm; raw endpoint overstates length by3cm.",
    "recall": "What calculation works when an object starts away from the ruler’s zero?",
    "source": null,
    "answer": 1,
    "concept": "ruler-start-not-zero",
    "unit": "cm",
    "inputLabel": "Endpoint",
    "hook": "Which reading gives this object’s length?"
  },
  {
    "slug": "measure-inside-not-outside",
    "title": "Outside width can fool the fit",
    "model": "inside-width",
    "view": "fit",
    "initial": 40,
    "min": 34,
    "max": 48,
    "step": 1,
    "values": [
      2,
      37
    ],
    "choices": [
      "Outer width",
      "Clear inside width"
    ],
    "question": "Which measurement checks whether this insert fits?",
    "idea": "A container’s outer width includes both walls. The insert must fit the clear inside opening, so subtracting the walls can change an apparent fit into a collision.",
    "limit": "Real corners and tapers may narrow the opening further.",
    "formula": "Clear width=outer−2×2cm; insert=37cm; margin uses outer or clear width.",
    "recall": "Which width should be compared with a rigid drawer insert?",
    "source": null,
    "answer": 1,
    "concept": "measure-inside-not-outside",
    "unit": "cm",
    "inputLabel": "Outer width",
    "hook": "Which measurement checks whether this insert fits?"
  },
  {
    "slug": "cm-to-inches",
    "title": "An inch is exactly 2.54cm",
    "model": "conversion",
    "view": "ruler",
    "initial": 30,
    "min": 20,
    "max": 40,
    "step": 0.1,
    "values": [
      2.54,
      2.5
    ],
    "choices": [
      "Use rough 2.5",
      "Use exact 2.54"
    ],
    "question": "Which conversion avoids the shown rounding shortcut?",
    "idea": "The inch is defined as exactly 25.4 millimetres. Dividing centimetres by 2.54 gives inches; using 2.5 is a convenient approximation with a visible error that grows with length.",
    "limit": "Measurement uncertainty remains even when the conversion factor is exact.",
    "formula": "Inches=centimetres/2.5 for shortcut or /2.54 exact; absolute difference shown.",
    "recall": "Does an exact conversion factor make an imprecise measurement exact?",
    "source": "NIST, SI Units - Length, https://www.nist.gov/pml/owm/si-units-length (opened 2026-10-14), exact inch definition 25.4mm.",
    "answer": 1,
    "concept": "cm-to-inches",
    "unit": "cm",
    "inputLabel": "Length",
    "hook": "Which conversion avoids the shown rounding shortcut?"
  },
  {
    "slug": "margin-before-cut",
    "title": "Mark the allowance, not just the face",
    "model": "cut-allowance",
    "view": "ruler",
    "initial": 20,
    "min": 15,
    "max": 30,
    "step": 1,
    "values": [
      2
    ],
    "choices": [
      "Finished width",
      "Include two folds"
    ],
    "question": "Which blank includes the two shown fold allowances?",
    "idea": "The finished face is narrower than the blank when two side folds consume material. Adding one allowance at each edge gives the required blank width in this ideal paper model.",
    "limit": "This card uses paper geometry only; cutting-tool safety and material stretch are outside scope.",
    "formula": "Blank width=finished+2×2cm; face-only width=finished.",
    "recall": "Why is finished width not always the width of the unfolded blank?",
    "source": null,
    "answer": 1,
    "concept": "margin-before-cut",
    "unit": "cm",
    "inputLabel": "Face width",
    "hook": "Which blank includes the two shown fold allowances?"
  },
  {
    "slug": "resize-photo-frame-ratio",
    "title": "Fit the photo without stretching",
    "model": "aspect-fit",
    "view": "geometry",
    "initial": 30,
    "min": 24,
    "max": 40,
    "step": 1,
    "values": [
      20,
      4,
      3
    ],
    "choices": [
      "Stretch to frame",
      "Keep ratio"
    ],
    "question": "Which layout preserves the pictured photo’s proportions?",
    "idea": "Uniform scaling keeps the width-to-height ratio. In this frame, preserving a four-to-three photo may leave margins; forcing both dimensions to the frame would distort that ratio.",
    "limit": "Cropping is a third option that this comparison does not perform.",
    "formula": "Frame=input×20cm; ratio4/3; scale=min(W/4,20/3), photo=4s×3s; empty area=W×20−12s².",
    "recall": "Which property does uniform scaling preserve when fitting a photo?",
    "source": null,
    "answer": 1,
    "concept": "resize-photo-frame-ratio",
    "unit": "cm",
    "inputLabel": "Frame width",
    "hook": "Which layout preserves the pictured photo’s proportions?"
  },
  {
    "slug": "weight-spread-on-table",
    "title": "Same load, different pressure",
    "model": "pressure",
    "view": "mechanics",
    "initial": 2,
    "min": 1,
    "max": 4,
    "step": 0.1,
    "values": [
      10,
      30
    ],
    "choices": [
      "Small footprint",
      "Wide footprint"
    ],
    "question": "Which footprint gives lower average pressure?",
    "idea": "Average pressure is force divided by contact area. Spreading the same load over more area lowers this calculated average; it does not reduce the total weight carried by the table.",
    "limit": "This does not establish a safe table load or local material stress; follow furniture limits.",
    "formula": "Pressure=mass×9.81/(area/10000)Pa; chosen contact areas10 or30cm².",
    "recall": "Does a wider footprint reduce the total load on a table?",
    "source": null,
    "answer": 1,
    "concept": "weight-spread-on-table",
    "unit": "kg",
    "inputLabel": "Mass",
    "hook": "Which footprint gives lower average pressure?"
  }
];
