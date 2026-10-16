import type { HomeSpec } from "./home-models";

/** Builder specifications. All claims remain unverified and all numeric models are explicit. */
export const homeLessons: HomeSpec[] = [
  {
    "slug": "towel-spread-dries-first",
    "title": "Fold it or spread it?",
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
    "question": "Folded in quarters, the towel takes 12 hours in this model. Spread flat, how long?",
    "idea": "Spreading the towel opens both large faces to the air. In this model each square metre of open face dries at the same speed, so the time falls as the open face grows.",
    "limit": "Real drying depends on fabric, temperature, humidity and airflow; this is not a twelve-hour promise.",
    "formula": "Area=2×(width/100)×1.4/layers; layers=4 or 1. Model hours=0.6/(area×0.1020408163). Edges and falling-rate drying omitted.",
    "recall": "What should you change before comparing the drying speed of two towel layouts?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 0,
    "concept": "surface-area-drying",
    "unit": "cm",
    "inputLabel": "Towel width",
    "hook": "Fold it or spread it: does that change how long a towel takes to dry?",
    "engine": 2,
    "modeLabels": [
      "Folded in four",
      "Spread flat"
    ],
    "options": [
      "3 h",
      "6 h",
      "12 h: same water"
    ],
    "amounts": [
      {
        "label": "Face open to air",
        "unit": "m²",
        "a": [
          "/",
          [
            "*",
            2,
            "p",
            "a"
          ],
          [
            "*",
            10000,
            "b"
          ]
        ],
        "b": [
          "/",
          [
            "*",
            2,
            "p",
            "a"
          ],
          10000
        ]
      }
    ],
    "resultLabel": "Drying time (model)",
    "revealLine": "{A}: {amountA0} of face open to the air, {resultA} to dry. {B}: {amountB0} open, {resultB}. The same water leaves through {ratio} times the face, so it dries {ratio} times faster.",
    "plainNumbers": true
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
    "title": "Flat bow or twisted bow?",
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
    "question": "Two bows tied in the same laces: one lies flat, one twists out of line. Which comes undone first?",
    "idea": "The twisted bow comes from tying both knot stages the same way round; tying the second the opposite way makes the bow lie flat. To read your own: a flat bow lies flat, a twisted bow twists out of line.",
    "limit": "Both can fail. The schematic is not a tying tutorial; loop loss is illustrative, not measured walking data.",
    "formula": "Both illustrative loops start at 20 mm at step 0. Walk advances from 0 to 25 steps: remaining loop = max(0, 20 − steps × rate) mm, with twisted (matching) rate 0.8 and flat (opposing) rate 0.3. The displayed results are 0 mm (undone) and 12.5 mm. No empirical lifetime is claimed.",
    "recall": "A bow twists out of line. Which knot step could you reverse?",
    "source": "Ian Fieggen, Granny Knot Info, https://www.fieggen.com/shoelace/grannyknot.htm (opened 2026-10-14), balanced/opposing stages and bow orientation; Daily-Diamond, Gregg & O'Reilly 2017, doi:10.1098/rspa.2016.0770, full paper opened at https://escholarship.org/content/qt7qs984k7/qt7qs984k7_noSplash_66a8485e2a04a2d12bd2baeb463325cf.pdf. The model step decrements are illustrative, not data.",
    "answer": 1,
    "concept": "shoelace-square-bow",
    "unit": "steps",
    "inputLabel": "Steps",
    "hook": "Two bows in the same laces: one lies flat, one twists. Which comes undone first?",
    "engine": 2,
    "modeLabels": [
      "Twisted bow",
      "Flat bow"
    ],
    "options": [
      "The flat one",
      "The twisted one",
      "Neither: a bow is a bow"
    ],
    "amounts": [
      {
        "label": "Steps walked",
        "unit": "",
        "a": "p",
        "b": "p"
      }
    ],
    "resultLabel": "Loop left"
  },
  {
    "slug": "long-cord-knots-itself",
    "title": "Do long cords knot themselves?",
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
    "question": "Strings were tumbled in a box for ten seconds. How often did 3 m strings come out knotted?",
    "idea": "Raymer and Smith (2007) tumbled one string at a time in a 30 cm box, turning once a second for ten seconds. No 0.3 m string came out knotted; 3 m strings came out knotted in 55% of trials. A longer string gives its free end more loops to weave through.",
    "limit": "The 55% belongs to that box and that motion, not to your drawer. Plain cord; storage only.",
    "formula": "20 simulated strings per length, each knotted with the study's observed frequency (0 for 0.3 m, 0.55 for 3 m), drawn from one fixed sequence so every learner sees the same 20; shown count = knotted strings out of 20.",
    "recall": "Why should a tumbling-box knot frequency not be treated as your drawer’s knot probability?",
    "source": "Raymer & Smith 2007, Spontaneous knotting of an agitated string, doi:10.1073/pnas.0611320104, full text opened 2026-10-14 at https://www.mit.edu/~kardar/research/seminars/knots/RaymerSmithPNAS.pdf; p.16432 standard 0.30m box, 1 revolution/s, 10s, length dependence; p.16435 end weaving model. No household knot probability is asserted.",
    "answer": 1,
    "concept": "cord-tangle-length",
    "unit": "cm",
    "inputLabel": "Length",
    "hook": "Strings were tumbled in a box for ten seconds. How often did 3 m strings come out knotted?",
    "engine": 2,
    "modeLabels": [
      "Tumble 0.3 m",
      "Tumble 3 m"
    ],
    "options": [
      "Almost never: nobody tied them",
      "About half the time",
      "Every time"
    ],
    "amounts": [
      {
        "label": "Strings simulated",
        "unit": "",
        "a": 20,
        "b": 20
      }
    ],
    "resultLabel": "Knotted"
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
    "title": "Will this box fit the shelf?",
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
    "question": "Does this box, as drawn, fit the 42 cm opening?",
    "idea": "The external envelope includes protrusions. Adding two handles to the body width changes the fit test even though the advertised box-body dimensions stay the same.",
    "limit": "Measure the real outermost points; soft handles may flex, which this rigid drawing does not model.",
    "formula": "Test width=40 or 40+2×3 cm. Shelf margin=opening−test width.",
    "recall": "Which parts should be included in the width of a storage box?",
    "source": null,
    "answer": 1,
    "concept": "box-handle-clearance",
    "unit": "cm",
    "inputLabel": "Shelf opening",
    "hook": "The label says 40 cm wide. The shelf opening is 42 cm.",
    "engine": 2,
    "modeLabels": [
      "Body only",
      "Include handles"
    ],
    "options": [
      "Yes, with room to spare",
      "No, it is too wide",
      "Only just: it touches"
    ],
    "amounts": [
      {
        "label": "Width tested",
        "unit": "cm",
        "a": "a",
        "b": [
          "+",
          "a",
          [
            "*",
            2,
            "b"
          ]
        ]
      }
    ],
    "resultLabel": "Clearance",
    "verdict": {
      "below": "too wide",
      "above": "fits",
      "zero": "exact fit"
    },
    "pictureMark": "dimension"
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
    "max": 35,
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
    "formula": "Count=floor(W/itemW)×floor(36/itemH), item=18×12 or 12×18 cm.",
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
    "question": "Two shoes, 12 cm wide at the toe and 6 cm at the heel. How wide is the pair packed toe-to-heel?",
    "idea": "A shoe is wide at the toe and narrow at the heel. Turn one round and each wide part sits beside a narrow one, so the pair is 6 cm narrower and neither shoe is squashed.",
    "limit": "Real shoe outlines vary; these simplified shapes narrow evenly from toe to heel.",
    "formula": "Pair width=2×12=24cm toes together, 12+6=18cm toe-to-heel; room left in the bag=bag width−pair width.",
    "recall": "When can reversing an irregular object help two fit together?",
    "source": null,
    "answer": 0,
    "concept": "shoes-opposite-ends",
    "unit": "cm",
    "inputLabel": "Bag width",
    "hook": "Shoes 12 cm wide at the toe, 6 cm at the heel. How wide is the pair packed toe-to-heel?",
    "engine": 2,
    "modeLabels": [
      "Toes together",
      "Toe-to-heel"
    ],
    "options": [
      "18 cm",
      "24 cm: same shoes"
    ],
    "amounts": [
      {
        "label": "Pair width",
        "unit": "cm",
        "a": [
          "*",
          2,
          "a"
        ],
        "b": [
          "+",
          "a",
          "b"
        ]
      }
    ],
    "resultLabel": "Room left in the bag",
    "revealLine": "{A}: the pair is {amountA0} wide, leaving {resultA} of the bag. {B}: {amountB0} wide, leaving {resultB}."
  },
  {
    "slug": "socks-use-shoe-space",
    "title": "Use an existing hollow",
    "model": "hollow",
    "view": "volume",
    "initial": 200,
    "min": 100,
    "max": 800,
    "step": 50,
    "values": [
      600,
      800
    ],
    "choices": [
      "Beside shoe",
      "Inside hollow"
    ],
    "question": "Socks beside the shoe or inside it. How much packed volume do they add inside?",
    "idea": "A shoe is hollow: in this model it has 600 cm³ of empty space inside. Socks that fit in that space add nothing to what you pack. Only socks bigger than the space spill over and add volume.",
    "limit": "Use clean, dry items; do not force or deform footwear. This is an ideal hollow-volume model.",
    "formula": "Shoe=800cm³ with a 600cm³ hollow. Socks add their own volume beside the shoe, or max(0, socks−600) inside it; packed total=800+added.",
    "recall": "Why can filling a hollow use less bag space than adding a separate bundle?",
    "source": null,
    "answer": 0,
    "concept": "socks-use-shoe-space",
    "unit": "cm³",
    "inputLabel": "Sock volume",
    "hook": "Socks beside the shoe or inside it. How much packed volume do they add inside?",
    "engine": 2,
    "modeLabels": [
      "Beside the shoe",
      "Inside the shoe"
    ],
    "options": [
      "None",
      "Same as beside"
    ],
    "amounts": [
      {
        "label": "Volume the socks add",
        "unit": "cm³",
        "a": "p",
        "b": [
          "max",
          0,
          [
            "-",
            "p",
            "a"
          ]
        ]
      }
    ],
    "resultLabel": "Shoe and socks",
    "revealLine": "{A}: the socks add {amountA0}, {resultA} in all. {B}: they fill the shoe's empty space and add {amountB0}; {resultB} in all."
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
    "unit": " sheets",
    "inputLabel": "Sheets",
    "hook": "With no compressed air, which uses less cloth volume?"
  },
  {
    "slug": "folded-shirt-stack-height",
    "title": "Fold the shirts once more",
    "model": "layers",
    "view": "cloth",
    "initial": 5,
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
    "question": "Five shirts folded once stack 4 cm high. Fold each once more. How tall now?",
    "idea": "An ideal incompressible sheet trades footprint for thickness. Doubling the layers doubles the height of an equally sized stack while conserving material volume.",
    "limit": "Real fabrics compress and trap air; these are sheet-model dimensions.",
    "formula": "Stack height=N×0.4×layers cm, layers=2 or 4; footprint fraction=1/layers.",
    "recall": "Why can smaller folded shirts make a drawer too shallow?",
    "source": null,
    "answer": 0,
    "concept": "folded-shirt-stack-height",
    "unit": "shirts",
    "inputLabel": "Shirts",
    "hook": "Fold a stack of shirts smaller. What happens to its height?",
    "engine": 2,
    "modeLabels": [
      "Folded once",
      "Folded twice"
    ],
    "options": [
      "8 cm",
      "4 cm",
      "2 cm: smaller shirts"
    ],
    "plainNumbers": true,
    "amounts": [
      {
        "label": "Layers per shirt",
        "unit": "",
        "a": "b",
        "b": [
          "*",
          2,
          "b"
        ]
      }
    ],
    "resultLabel": "Stack height",
    "revealLine": "{A}: {amountA0} layers per shirt, stack {resultA}. {B}: {amountB0} layers, stack {resultB}: half the footprint, {ratio} times the height."
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
    "question": "The rain jacket is under five items. How many do you lift to reach it?",
    "idea": "Every item above the one you need has to come out first. With the jacket on top, nothing is in the way, so the thing you need first is best packed last.",
    "limit": "This counts items lifted, not time; pockets and side openings change it.",
    "formula": "Items to lift=N−1 with the jacket at the bottom of N items, 0 with it on top.",
    "recall": "Which packing question should you ask after checking that everything fits?",
    "source": null,
    "answer": 2,
    "concept": "suitcase-layer-access",
    "unit": "items",
    "inputLabel": "Items in the case",
    "hook": "The rain jacket is under five items. How many do you lift to reach it?",
    "engine": 2,
    "modeLabels": [
      "Jacket at bottom",
      "Jacket on top"
    ],
    "options": [
      "0: it's in the bag",
      "1",
      "5"
    ],
    "amounts": [
      {
        "label": "Items in the case",
        "unit": "",
        "a": "p",
        "b": "p"
      }
    ],
    "resultLabel": "Items to lift",
    "revealLine": "{A}: you lift {resultA} items to reach the jacket. {B}: you lift {resultB}."
  },
  {
    "slug": "jacket-last-first",
    "title": "Pack the return order backwards",
    "model": "reverse-order",
    "view": "order",
    "initial": 3,
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
    "question": "You need the jacket first, the sweater next, the shoes last. Which goes into the bag first?",
    "idea": "A bag that opens at the top gives back the last thing packed first. So pack in reverse: what you need last goes in first, and the jacket you need first goes in last, on top.",
    "limit": "Only a top-opening bag is modelled; side pockets and cases that open flat behave differently.",
    "formula": "Packed in use order 1..N, the first-needed item is under N−1 others; packed in reverse, N..1, it is under 0.",
    "recall": "Why is the last thing packed sometimes the right first thing to use?",
    "source": null,
    "answer": 0,
    "concept": "jacket-last-first",
    "unit": "items",
    "inputLabel": "Items packed",
    "hook": "Jacket needed first, sweater next, shoes last. Which goes into the bag first?",
    "engine": 2,
    "modeLabels": [
      "In use order",
      "Reversed"
    ],
    "options": [
      "The shoes",
      "The jacket",
      "Order doesn't matter"
    ],
    "amounts": [
      {
        "label": "Items packed",
        "unit": "",
        "a": "p",
        "b": "p"
      }
    ],
    "resultLabel": "On top of the jacket",
    "resultUnit": "items",
    "revealLine": "{A}: the jacket goes in first and ends up under {resultA}. {B}: the shoes go in first and the jacket last, so {resultB} sit on it."
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
    "min": 1,
    "max": 5,
    "step": 2,
    "values": [
      1,
      20
    ],
    "choices": [
      "Unequal sides",
      "Balance sides"
    ],
    "question": "3 kg on the left, 1 kg on the right. Move 1 kg across. Does the bag now hang straight?",
    "idea": "The heavier side pulls the balance point towards it, and the bag tilts until that point is under the handle. Move 1 kg across and both sides hold 2 kg, so the bag hangs straight, though it weighs the same.",
    "limit": "A centred drawing does not certify a bag’s strength or make a heavy load safe.",
    "formula": "As packed: m kg left and 1 kg right, at −20 and +20 cm from the handle; evened out, each side=(m+1)/2 kg. Balance point=sum(mass×position)/total mass.",
    "recall": "Why is the total weight insufficient to describe balance?",
    "source": "REI, How to Pack a Backpack, https://www.rei.com/learn/expert-advice/loading-backpack.html (opened 2026-10-14), core heavy gear, balanced sides, accessory pocket access. Card arithmetic is a static simplified model, not a comfort or safety prediction.",
    "answer": 1,
    "concept": "tote-balance-sides",
    "unit": "kg",
    "inputLabel": "Left side, as packed",
    "hook": "3 kg on the left, 1 kg on the right. Move 1 kg across. Does the bag now hang straight?",
    "engine": 2,
    "modeLabels": [
      "As packed",
      "Evened out"
    ],
    "options": [
      "No: the total didn't change",
      "Yes"
    ],
    "amounts": [
      {
        "label": "Left side",
        "unit": "kg",
        "a": "p",
        "b": [
          "/",
          [
            "+",
            "p",
            "a"
          ],
          2
        ]
      },
      {
        "label": "Right side",
        "unit": "kg",
        "a": "a",
        "b": [
          "/",
          [
            "+",
            "p",
            "a"
          ],
          2
        ]
      }
    ],
    "resultLabel": "Balance point",
    "verdict": {
      "below": "left of the handle",
      "zero": "under the handle"
    },
    "revealLine": "{A}: {amountA0} left, {amountA1} right; balance point {resultA}. {B}: {amountB0} each side; balance point {resultB}, same total."
  },
  {
    "slug": "bag-weight-before-volume",
    "title": "Will this bag pass the limit?",
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
    "question": "This 2 kg bag holds 4 kg of things and is half empty. Does it pass a 5 kg limit?",
    "idea": "Capacity in litres and a weight limit answer different questions. The example sums the contents’ masses; unused space does not subtract from that total.",
    "limit": "The five-kilogram limit is chosen for this example, not an airline or manufacturer rule.",
    "formula": "Total=variable load+2kg; chosen limit=5kg; overload=max(0,total−5). Space used is a fixed 10 of 20 L at every load; it does not enter the mass.",
    "recall": "Can empty space make a bag meet a weight limit?",
    "source": null,
    "answer": 1,
    "concept": "bag-weight-before-volume",
    "unit": "kg",
    "inputLabel": "Contents",
    "hook": "Half its space is still free.",
    "engine": 2,
    "modeLabels": [
      "Judge by space",
      "Weigh it"
    ],
    "options": [
      "Yes, half of it is empty",
      "No, it is over the limit",
      "Only just, at the limit"
    ],
    "amounts": [
      {
        "label": "Space used",
        "unit": "L",
        "a": "10 of 20",
        "b": "10 of 20"
      },
      {
        "label": "Total mass",
        "unit": "kg",
        "a": "not weighed",
        "b": [
          "+",
          "p",
          "a"
        ]
      }
    ],
    "resultLabel": "Against 5 kg limit",
    "verdict": {
      "above": "over",
      "zero": "within limit"
    },
    "resultText": {
      "a": "looks fine (not weighed)"
    }
  },
  {
    "slug": "towel-over-two-bars",
    "title": "One bar or two?",
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
    "question": "Over one bar, the towel's two inner faces touch. Across two bars, how much more face is open to the air?",
    "idea": "Two cloth faces pressed together are hidden from the surrounding air in this geometric model. Separating them restores exposed area; the cloth amount has not changed.",
    "limit": "This is exposed-area bookkeeping, not a measured drying-time prediction.",
    "formula": "Area=2×W×140/10000 times fraction; touching fraction=0.5, separated=1.",
    "recall": "What should a drying-rack layout preserve besides total hanging space?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 1,
    "concept": "towel-over-two-bars",
    "unit": "cm",
    "inputLabel": "Towel width",
    "hook": "A towel over one bar, or across two. Is more of it open to the air?",
    "engine": 2,
    "modeLabels": [
      "One bar",
      "Two bars"
    ],
    "options": [
      "None: same towel",
      "0.98 m² more",
      "1.96 m² more"
    ],
    "plainNumbers": true,
    "amounts": [
      {
        "label": "Faces touching",
        "unit": "m²",
        "a": [
          "*",
          [
            "/",
            [
              "*",
              2,
              "p",
              "a"
            ],
            10000
          ],
          [
            "-",
            1,
            "b"
          ]
        ],
        "b": 0
      }
    ],
    "resultLabel": "Face open to air",
    "revealLine": "{A}: {amountA0} of face pressed together, {resultA} open. {B}: nothing touching, {resultB} open: {diff} more face in the air, from the same towel."
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
    "title": "Two shirts, one overlap",
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
    "question": "Two shirts overlap by 1,800 cm². How much cloth is hidden from the air?",
    "idea": "Overlap hides the contacting regions from surrounding air. Separating the illustrated sheets restores those regions, although the total amount of cloth stays the same.",
    "limit": "Real draping and edge exposure differ; no universal time saving is claimed.",
    "formula": "Two sheets each 100×60cm, both faces: 24000cm². Contact hides 2×overlap×60; separation hides 0.",
    "recall": "Why does hanging two sheets in the same outline not expose both fully?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 2,
    "concept": "garment-overlap-hides-face",
    "unit": "cm",
    "inputLabel": "Overlap",
    "hook": "Two wet shirts overlap on the line. Does that hide any cloth from the air?",
    "engine": 2,
    "modeLabels": [
      "Overlapping",
      "Hung apart"
    ],
    "options": [
      "None: both are out",
      "1,800 cm²",
      "3,600 cm²"
    ],
    "amounts": [
      {
        "label": "Overlap",
        "unit": "cm²",
        "a": [
          "*",
          "p",
          "b"
        ],
        "b": 0
      },
      {
        "label": "Hidden from air",
        "unit": "cm²",
        "a": [
          "*",
          2,
          "p",
          "b"
        ],
        "b": 0
      }
    ],
    "resultLabel": "Cloth open to air",
    "revealLine": "{A}: {amountA0} of overlap hides {amountA1}, one patch on each shirt; {resultA} stays open. {B}: nothing hidden, {resultB} open."
  },
  {
    "slug": "drying-room-water-load",
    "title": "The water goes somewhere",
    "model": "water-load",
    "view": "volume",
    "initial": 12,
    "min": 1,
    "max": 16,
    "step": 1,
    "values": [
      250,
      30
    ],
    "choices": [
      "One item",
      "Whole load"
    ],
    "question": "Each wet shirt holds about 250 g of water. Twelve dry indoors. How much water goes into the room's air?",
    "idea": "Water leaving laundry enters the surroundings. This example multiplies retained water per item by the item count; it is a mass balance, not a forecast of room humidity.",
    "limit": "Ventilation, temperature and condensation affect the room. This card counts water only; it does not predict room humidity.",
    "warning": "Dry indoors with a window open or a vent on: the water you dry goes into the room's air, and without ventilation it can cause damp and mould.",
    "formula": "Water=250g for one item or count×250g; hypothetical complete drying.",
    "recall": "Why should you count the whole wet load rather than one garment?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 2,
    "concept": "drying-room-water-load",
    "unit": "shirts",
    "inputLabel": "Shirts",
    "hook": "Twelve wet shirts dry indoors. How much water goes into the room's air?",
    "engine": 2,
    "modeLabels": [
      "One shirt",
      "Whole load"
    ],
    "options": [
      "A few grams",
      "250 g",
      "3,000 g"
    ],
    "amounts": [
      {
        "label": "Shirts counted",
        "unit": "",
        "a": 1,
        "b": "p"
      }
    ],
    "resultLabel": "Water into the air",
    "revealLine": "{A}: {resultA}. {B}: {amountB0} shirts, {resultB} into the room."
  },
  {
    "slug": "humidity-evaporation-gap",
    "title": "Damp room, dry room",
    "model": "humidity",
    "view": "cloth",
    "initial": 80,
    "min": 50,
    "max": 95,
    "step": 1,
    "values": [
      1,
      40
    ],
    "choices": [
      "Humid setting",
      "Drier setting"
    ],
    "question": "Same temperature. A room at 40% humidity and one at 80%. How much weaker is the drying push in the humid room?",
    "idea": "At the same temperature, humid air already holds close to all the water vapour it can, so it takes water from a wet surface more slowly. The push is how far the air is from full.",
    "limit": "Surface temperature, airflow and fabric also matter; no room-control advice is implied.",
    "formula": "Drying push=100−humidity, out of 100; the drier room is 40 points less humid than the humid room. Assumes wet surface and air have equal temperature.",
    "recall": "At the same temperature, why can high humidity hinder evaporation?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate.",
    "answer": 2,
    "concept": "humidity-evaporation-gap",
    "unit": "%",
    "inputLabel": "Humid room",
    "hook": "Same temperature, 40% or 80% humidity: how much weaker is the drying push?",
    "engine": 2,
    "modeLabels": [
      "Humid room",
      "Drier room"
    ],
    "options": [
      "No weaker: same warmth",
      "A bit weaker",
      "A lot weaker"
    ],
    "amounts": [
      {
        "label": "Room humidity",
        "unit": "%",
        "a": "p",
        "b": [
          "-",
          "p",
          "b"
        ]
      }
    ],
    "resultLabel": "Drying push, of 100",
    "resultUnit": "",
    "revealLine": "{A}: {amountA0} humidity, drying push {resultA} of 100. {B}: {amountB0}, push {resultB}. At the same warmth the drier room pushes {ratio} times as hard."
  },
  {
    "slug": "breeze-is-not-extra-surface",
    "title": "Does a breeze help a towel dry?",
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
    "question": "Same towel, same cool air. Does a breeze make it dry sooner?",
    "idea": "The model keeps the cloth area fixed and changes only how fast the moving air takes water away. Area and air movement multiply; changing one does not secretly change the other.",
    "limit": "The doubled speed is an illustrative setting, not a measured benefit from any fan.",
    "formula": "Drying speed=cloth area×air setting; area=input m²; still air=1, breeze=2 arbitrary model units.",
    "recall": "Does improving airflow expose an inner towel face that is still folded shut?",
    "source": "OpenStax College Physics 2e §13.6, https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling (opened 2026-10-14). Evaporation is inhibited by humidity. The card's constant flux is an explicitly illustrative assumption, not a measured household drying rate. OpenStax College Physics 2e §14.6 (air flow replaces the saturated air by dry air and evaporation continues), the support for the keyed outcome.",
    "answer": 1,
    "concept": "breeze-is-not-extra-surface",
    "unit": "m²",
    "inputLabel": "Cloth area",
    "hook": "Cool day, wet towel on the line. Is a breeze any help?",
    "engine": 2,
    "modeLabels": [
      "Still air",
      "Breeze"
    ],
    "options": [
      "No: only warm air helps",
      "Yes: moving air carries the damp away",
      "Only if the breeze spreads it out"
    ],
    "plainNumbers": true,
    "amounts": [
      {
        "label": "Cloth open to air",
        "unit": "m²",
        "a": "p",
        "b": "p"
      }
    ],
    "resultLabel": "Drying speed (model)",
    "resultUnit": "",
    "revealLine": "{A}: {amountA0} of cloth open, drying speed {resultA}. {B}: the same {amountB0}, speed {resultB}: {ratio}× sooner, with no extra cloth open."
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
    "title": "Cut the towel in half?",
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
    "question": "Cut a towel in half and hang both halves flat. How much face area now?",
    "idea": "Splitting a flat rectangle preserves the combined front-and-back face area. It adds edges, but does not double the large faces; separating folded layers is a different operation.",
    "limit": "Edges and fabric thickness are omitted from this area comparison.",
    "formula": "Both layouts have area=2×width×120/10000 m²; each half has height60cm.",
    "recall": "How is cutting one flat sheet different from opening a folded one?",
    "source": null,
    "answer": 1,
    "concept": "half-size-two-towels",
    "unit": "cm",
    "inputLabel": "Width",
    "hook": "Two half towels hung flat, or one whole one. Which has more face to dry?",
    "engine": 2,
    "modeLabels": [
      "One towel",
      "Two halves"
    ],
    "options": [
      "Double",
      "The same",
      "Half"
    ],
    "amounts": [
      {
        "label": "Pieces",
        "unit": "",
        "a": 1,
        "b": 2
      }
    ],
    "resultLabel": "Face area, both sides",
    "revealLine": "{A}: {resultA} of face, front and back. {B}: two pieces, {resultB}: the same area, with more edges."
  },
  {
    "slug": "wet-knit-hang-stretch",
    "title": "Hang the jumper or lay it flat?",
    "model": "support-load",
    "view": "cloth",
    "initial": 0.6,
    "min": 0.3,
    "max": 0.9,
    "step": 0.1,
    "values": [
      2,
      6
    ],
    "choices": [
      "Two support points",
      "Six support points"
    ],
    "question": "A wet jumper holds about 0.6 kg. Pegged at two points, how much does each point carry?",
    "idea": "In an ideal equal-share model, more support points reduce the load assigned to each. A care label can require flat drying; this drawing shows load sharing, not fabric stretch.",
    "limit": "Real knit deformation is not calculated. Follow the garment’s drying instructions.",
    "formula": "Load per peg=wet mass/2 or /6 kg; equal sharing assumed.",
    "recall": "Why should a flat-dry instruction take priority over a convenient hanger?",
    "source": "GINETEX, CARE SYMBOLS, https://www.ginetex.net/article/FR/care-symbols (opened 2026-10-14), natural drying: flat, line, drip and shade; this lesson uses text instructions and original clothing drawings, not licensed care-symbol artwork.",
    "answer": 0,
    "concept": "wet-knit-hang-stretch",
    "unit": "kg",
    "inputLabel": "Wet jumper",
    "hook": "A wet jumper holds about 0.6 kg. Pegged at two points, how much does each point carry?",
    "engine": 2,
    "modeLabels": [
      "Two pegs",
      "Six pegs"
    ],
    "options": [
      "0.3 kg",
      "0.1 kg",
      "Almost nothing: it's soft"
    ],
    "plainNumbers": true,
    "amounts": [
      {
        "label": "Pegs",
        "unit": "",
        "a": "a",
        "b": "b"
      }
    ],
    "resultLabel": "Load on each peg",
    "resultUnit": "kg",
    "revealLine": "{A}: each peg carries {resultA}. {B}: {resultB} each. Pegs gather the weight onto a few points; if the label says dry flat, lay the jumper flat."
  },
  {
    "slug": "towel-thickness-hidden-volume",
    "title": "A towel twice as thick",
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
    "question": "Same size towel, twice as thick, so twice the cloth and twice the water. How much open face does each cm³ of cloth get now?",
    "idea": "Doubling thickness at the same width and length doubles material volume while keeping the two large face areas fixed. The area-to-volume ratio therefore halves.",
    "limit": "This geometric ratio alone does not determine a fabric’s drying time.",
    "formula": "Face area=2×50×100cm²; volume=50×100×thickness/10 cm³, doubled for comparison. Ratio=area/volume cm⁻¹.",
    "recall": "What happens to face-area-to-volume ratio when thickness doubles?",
    "source": null,
    "answer": 2,
    "concept": "towel-thickness-hidden-volume",
    "unit": "mm",
    "inputLabel": "Thickness",
    "hook": "Same size, twice as thick, twice the water. Does it get more face to dry from?",
    "options": [
      "The same: same size towel",
      "Twice as much",
      "Half as much"
    ],
    "engine": 2,
    "modeLabels": [
      "Single thickness",
      "Twice as thick"
    ],
    "amounts": [
      {
        "label": "Open face",
        "unit": "cm²",
        "a": [
          "*",
          2,
          "a",
          "b"
        ],
        "b": [
          "*",
          2,
          "a",
          "b"
        ]
      },
      {
        "label": "Cloth volume",
        "unit": "cm³",
        "a": [
          "/",
          [
            "*",
            "a",
            "b",
            "p"
          ],
          10
        ],
        "b": [
          "/",
          [
            "*",
            "a",
            "b",
            2,
            "p"
          ],
          10
        ]
      }
    ],
    "resultLabel": "Open face per cm³ of cloth",
    "resultUnit": "cm²",
    "plainNumbers": true,
    "revealLine": "{A}: {amountA0} of open face on {amountA1} of cloth, {resultA} per cm³. {B}: the same {amountB0} on {amountB1}, {resultB} per cm³: half as much."
  },
  {
    "slug": "fitted-sheet-corners-nest",
    "title": "Put the corner inside the corner",
    "model": "nest",
    "view": "cloth",
    "initial": 4,
    "min": 4,
    "max": 4,
    "step": 1,
    "values": [
      8,
      2
    ],
    "choices": [
      "Separate pockets",
      "Nested pockets"
    ],
    "question": "Fold a fitted sheet with its corners tucked into each other, or not. How much flatter is it?",
    "idea": "Each elastic corner is a cup of cloth. Kept apart, four cups stack as four full depths. Tucked inside one another, they share one hollow, and each extra corner adds only a thin layer of cloth.",
    "limit": "Real elastic and seams change the numbers; this counts the corners, not every fold of the sheet.",
    "formula": "Folded thickness=4×8cm with the corners apart; nested=8+(4−1)×2cm (8 cm corner depth, 2 cm per extra layer of cloth).",
    "recall": "Why can nesting hollow shapes save envelope space without removing material?",
    "source": null,
    "answer": 1,
    "concept": "fitted-sheet-corners-nest",
    "unit": "corners",
    "inputLabel": "Count",
    "hook": "Fold a fitted sheet with its corners tucked into each other. How much flatter is it?",
    "engine": 2,
    "modeLabels": [
      "Corners apart",
      "Corners nested"
    ],
    "options": [
      "Not at all: elastic always lumps",
      "18 cm flatter"
    ],
    "amounts": [
      {
        "label": "Corners",
        "unit": "",
        "a": "p",
        "b": "p"
      }
    ],
    "resultLabel": "Folded thickness",
    "revealLine": "{A}: four 8 cm corners stacked, {resultA} thick. {B}: tucked inside each other, {resultB}: {diff} flatter."
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
    "initial": 12,
    "min": 6,
    "max": 18,
    "step": 6,
    "values": [
      3
    ],
    "choices": [
      "One mixed pile",
      "Three pattern bins"
    ],
    "question": "Twelve socks of three patterns in one pile. To find one sock's partner, how many socks do you check?",
    "idea": "In a pile you pick socks up one at a time, so the partner can be the last one you check. Sorted by pattern first, you only check the socks in that pattern's bin.",
    "limit": "Sorting takes its own time, and this counts the worst case: the partner turns up last.",
    "formula": "Socks to check at most=N−1 in one mixed pile, N/3−1 in one of three equal pattern bins; N is a multiple of 6.",
    "recall": "What makes a sorting rule useful for finding a matching sock?",
    "source": null,
    "answer": 0,
    "concept": "sock-pairing-by-pattern",
    "unit": "socks",
    "inputLabel": "Socks",
    "hook": "Twelve socks, three patterns, one pile. To find one sock's partner, how many do you check?",
    "engine": 2,
    "modeLabels": [
      "One mixed pile",
      "Pattern bins"
    ],
    "options": [
      "11",
      "3"
    ],
    "amounts": [
      {
        "label": "Socks in the search",
        "unit": "",
        "a": "p",
        "b": [
          "/",
          "p",
          "a"
        ]
      }
    ],
    "resultLabel": "Socks to check, at most",
    "revealLine": "{A}: the partner could be any of the other {resultA} socks. {B}: sorted first, it is one of the other {resultB} in its pattern's bin."
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
    "question": "Six plain socks, three pairs, no marks. How many different two-sock pairings could you try?",
    "idea": "Each sock can go with any of the others, so six socks give 15 pairings: 5 + 4 + 3 + 2 + 1. The pairings grow much faster than the socks: ten socks give 45. A mark on each pair leaves one pairing per pair.",
    "limit": "This assumes pairs that look alike but are not interchangeable; identical pairs would need fewer tries.",
    "formula": "Candidates=N(N−1)/2 versus floor(N/2) marked pairs; N is an even illustrative sock count after rounding down.",
    "recall": "Why can a unique partner mark change a matching task more than a tidy pile?",
    "source": null,
    "answer": 2,
    "concept": "sock-pairs-not-all-combinations",
    "unit": "socks",
    "inputLabel": "Count",
    "hook": "Six plain socks, three pairs, no marks. How many two-sock pairings could you try?",
    "engine": 2,
    "modeLabels": [
      "No marks",
      "Marked partners"
    ],
    "options": [
      "3",
      "6",
      "15"
    ],
    "amounts": [
      {
        "label": "Socks",
        "unit": "",
        "a": "p",
        "b": "p"
      }
    ],
    "resultLabel": "Pairings to try",
    "revealLine": "{A}: {amountA0} socks give {resultA} pairings to try. {B}: only {resultB}, one per pair."
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
    "title": "What does 'dry flat' allow?",
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
    "question": "Three jumpers say 'dry flat'. You hang them on the line with the rest. How many are dried the way the label says?",
    "idea": "The example garment’s instruction is flat dry. Selecting a convenient line-dry arrangement does not override that instruction; the task is to choose a compatible method before optimising space.",
    "limit": "Read the real label; different garments permit different processes. No care-symbol artwork is reproduced.",
    "formula": "Compatible items=0 if all chosen garments hang, or N when placed flat, given the stated flat-dry instruction.",
    "recall": "Which information should you check before applying a generic drying hack?",
    "source": "GINETEX, CARE SYMBOLS, https://www.ginetex.net/article/FR/care-symbols (opened 2026-10-14), natural drying: flat, line, drip and shade; this lesson uses text instructions and original clothing drawings, not licensed care-symbol artwork.",
    "answer": 0,
    "concept": "care-label-first-choice",
    "unit": "items",
    "inputLabel": "Count",
    "hook": "The label says 'dry flat', and the line has room. Does it matter?",
    "options": [
      "None",
      "All 3: dry is dry"
    ],
    "engine": 2,
    "modeLabels": [
      "Hung on the line",
      "Laid flat"
    ],
    "amounts": [
      {
        "label": "Jumpers marked 'dry flat'",
        "unit": "",
        "a": "p",
        "b": "p"
      }
    ],
    "resultLabel": "Dried the way the label says",
    "plainNumbers": true,
    "revealLine": "{A}: {amountA0} jumpers, {resultA} dried the way the label says. {B}: {resultB} of {amountB0}."
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
    "initial": 3,
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
    "question": "Three cords tied together in the middle, or with their ends tucked. Which tangles less in a drawer?",
    "idea": "A tie round the middle holds the cords together, but every end stays free. A tangle starts when a free end weaves through a loop, so tucking the ends away takes away that start. The drawing counts loose ends; it does not simulate tangling.",
    "limit": "Plain cord; storage only. The drawing gives no electrical safety limit or product-specific bend radius.",
    "formula": "Loose ends=2×cord count with a middle tie, 0 with the ends tucked into end ties; tangling itself is not simulated.",
    "recall": "Why might a tie around the middle leave an end-related tangle pathway?",
    "source": "Raymer & Smith 2007, Spontaneous knotting of an agitated string, doi:10.1073/pnas.0611320104, full text opened 2026-10-14 at https://www.mit.edu/~kardar/research/seminars/knots/RaymerSmithPNAS.pdf; p.16432 standard 0.30m box, 1 revolution/s, 10s, length dependence; p.16435 end weaving model. No household knot probability is asserted.",
    "answer": 0,
    "concept": "group-cables-with-ends",
    "unit": "cords",
    "inputLabel": "Count",
    "hook": "Three cords tied in the middle, or with their ends tucked. Which tangles less in a drawer?",
    "engine": 2,
    "modeLabels": [
      "Tie the middle",
      "Tuck the ends"
    ],
    "options": [
      "Ends tucked",
      "Middle tie: it holds them together",
      "Same"
    ],
    "amounts": [
      {
        "label": "Cords",
        "unit": "",
        "a": "p",
        "b": "p"
      }
    ],
    "resultLabel": "Loose ends",
    "revealLine": "{A}: {amountA0} cords, {resultA} loose ends free to weave through loops. {B}: {resultB} loose ends."
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
    "question": "A hair tie is looped round a cord's end, and it looks knotted. What frees it?",
    "idea": "A hair tie round a cord is a closed loop, not a knot, so there is nothing to pick apart. While the cord's end is free, the loop slides along the cord and off the end, and the cord lies straight again.",
    "limit": "Plain cord; storage only. The drawing gives no electrical safety limit or product-specific bend radius.",
    "formula": "Crossings=1 while the hair tie is on the cord, 0 once it has slid off the free end; nothing is cut and the elastic is not stretched.",
    "recall": "Why does the position of a free end matter when judging a tangle?",
    "source": "Raymer & Smith 2007, Spontaneous knotting of an agitated string, doi:10.1073/pnas.0611320104, full text opened 2026-10-14 at https://www.mit.edu/~kardar/research/seminars/knots/RaymerSmithPNAS.pdf; p.16432 standard 0.30m box, 1 revolution/s, 10s, length dependence; p.16435 end weaving model. No household knot probability is asserted.",
    "answer": 1,
    "concept": "elastic-loop-release",
    "unit": "cm",
    "inputLabel": "Free end",
    "hook": "A hair tie is looped round a cord's end, and it looks knotted. What frees it?",
    "engine": 2,
    "modeLabels": [
      "Pick at it",
      "Slide it off"
    ],
    "options": [
      "Picking the knot apart",
      "Sliding it off the end",
      "Cutting it"
    ],
    "amounts": [
      {
        "label": "Hair tie",
        "unit": "",
        "a": "on the cord",
        "b": "off the end"
      }
    ],
    "resultLabel": "Crossings",
    "verdictByMode": {
      "a": "still looped",
      "b": "free"
    },
    "revealLine": "{A}: the hair tie stays {amountA0}, crossings {resultA}. {B}: it comes {amountB0}, crossings {resultB}, and nothing is cut."
  },
  {
    "slug": "coiled-cord-bend-radius",
    "title": "How sharp is the bend?",
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
    "question": "Against the base coil, how sharp is the bend with loops of twice the radius?",
    "idea": "A circle’s curvature is the reciprocal of its radius. A larger-radius loop uses more length per turn and bends less sharply; neither the cord material nor total length changes.",
    "limit": "Plain cord; storage only. The drawing gives no electrical safety limit or product-specific bend radius.",
    "formula": "Circumference=2πr; turns=200/(2πr); curvature=1/r cm⁻¹; comparison radius=2r.",
    "recall": "Which dimension determines the sharpness of a circular bend?",
    "source": null,
    "answer": 1,
    "concept": "coiled-cord-bend-radius",
    "unit": "cm",
    "inputLabel": "Base radius",
    "hook": "Same 2 m cord, coiled in loops twice as wide.",
    "engine": 2,
    "modeLabels": [
      "Base radius r",
      "Double, 2 × r"
    ],
    "options": [
      "Twice as sharp",
      "Half as sharp",
      "Just as sharp: same cord"
    ],
    "amounts": [
      {
        "label": "Cord per turn",
        "unit": "cm",
        "a": [
          "*",
          2,
          3.14159,
          "p"
        ],
        "b": [
          "*",
          4,
          3.14159,
          "p"
        ]
      },
      {
        "label": "Turns",
        "unit": "",
        "a": [
          "/",
          "a",
          [
            "*",
            2,
            3.14159,
            "p"
          ]
        ],
        "b": [
          "/",
          "a",
          [
            "*",
            4,
            3.14159,
            "p"
          ]
        ]
      }
    ],
    "resultLabel": "Bend (1 ÷ radius)",
    "resultUnit": "per cm",
    "verdictByMode": {
      "a": "sharper",
      "b": "gentler"
    }
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
    "title": "Turn the discs, fit more?",
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
    "question": "At this 28 cm tray, how many 10 cm discs fit in this square grid once each is turned 45°?",
    "idea": "A circle is unchanged by rotation. In the selected square-grid arrangement, rotating each disc cannot alter the row count; changing the arrangement would be a separate experiment.",
    "limit": "This model keeps a square grid; it is not a best-packing solver.",
    "formula": "Count=floor(W/10)² in both selected square grids, disc diameter10cm.",
    "recall": "Which kind of packing change can matter for circles when rotation cannot?",
    "source": null,
    "answer": 0,
    "concept": "circle-tray-square-corners",
    "unit": "cm",
    "inputLabel": "Tray side",
    "hook": "Four discs leave empty corners. Will turning each one help?",
    "engine": 2,
    "modeLabels": [
      "As placed",
      "Each turned 45°"
    ],
    "options": [
      "4 discs, as before",
      "5 discs: corners fill",
      "9 discs: rows close up"
    ],
    "amounts": [
      {
        "label": "Discs per row",
        "unit": "",
        "a": [
          "floor",
          [
            "/",
            "p",
            "a"
          ]
        ],
        "b": [
          "floor",
          [
            "/",
            "p",
            "a"
          ]
        ]
      }
    ],
    "resultLabel": "Discs in the grid",
    "pictureMark": "radius-stripe"
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
      "Assembled box",
      "Panels stacked"
    ],
    "question": "Which empty-object envelope is smaller?",
    "idea": "An empty assembled object includes a large hollow in its envelope. Stacking the ideal panels removes that hollow from the outside dimensions while retaining all panel material.",
    "limit": "Real hardware and edges add volume; never dismantle furniture unless its instructions permit it.",
    "formula": "4 panels 40×30 + 2 panels 30×30, thickness t; stack envelope 40×30×6t; assembled reference 40×30×30.",
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
    "title": "Six trips for the tape",
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
    "question": "The tape sits 4 m from your desk and you fetch it 6 times. How far do you walk?",
    "idea": "For the pictured task, retrieving the same supply across the room repeatedly multiplies the walking distance. A copy at the use point removes that route, at the cost of another storage location.",
    "limit": "The model ignores setup and clutter; it is not a productivity measurement.",
    "formula": "Distance=2×input metres×6 uses or0m at use point.",
    "recall": "When can a second storage location remove repeated travel?",
    "source": null,
    "answer": 2,
    "concept": "desk-supply-near-use",
    "unit": "m",
    "inputLabel": "Distance",
    "hook": "You need the tape six times while you work.",
    "engine": 2,
    "modeLabels": [
      "Across the room",
      "Copy at desk"
    ],
    "options": [
      "4 m",
      "24 m",
      "48 m"
    ],
    "amounts": [
      {
        "label": "Round trip per fetch",
        "unit": "m",
        "a": [
          "*",
          2,
          "p"
        ],
        "b": 0
      }
    ],
    "resultLabel": "Walked, 6 fetches"
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
