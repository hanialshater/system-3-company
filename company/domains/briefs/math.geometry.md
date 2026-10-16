# Geometry & Measurement briefs (cm-math-geometry)

Ranked briefs for this strand, in the same format as `math.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next math` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Wave J (cm-math, 2026-10-14)

Five new concepts, none taught yet; each is added to `content/curriculum/math.json` with `subarea: "geometry"`. Ranked demand 3 first, then demand 2 in prerequisite order. Every number is recomputed by `node company/domains/briefs/checks/math-wave-j-check.mjs` (labels G1 to G5); the only non-derived fact is the Earth's radius in G1, a standard constant the fact-checker can confirm from WGS 84, and the lesson's result does not depend on it. Dedupe: grepped all `meta.json` and briefs for rope, circumference, parallelogram, shear, triangle inequality, unfold, polyhedron and Euler; nearest lessons are named per brief. `node tools/overlap.mjs` lists no pair on these concepts.
Shared build rules: as in `math.algebra.md` Wave J (stage text ≤ 25 words, reveal ≤ 90 words and fits with its picture at 390×844, labels ≥ 10 px, 44 px targets, preset buttons and Step instead of slider ranges, every milestone reached by pressing each control once in the DOM order given, current-state chip active and disabled, milestone values recorded so Reset cannot change them).

### 1. one-metre-more-rope · concept: circumference-linear-in-radius · core · demand 3 · format: Single card
- Learner knows: circumference = π × diameter (`math/pi-is-three-and-a-bit`) / does not know: that adding a fixed length to the rope round any circle lifts it by the same height, 1 ÷ 2π of that length, however big the circle.
- Misconception: an extra metre of rope round the Earth would lift it by a microscopic amount, far less than the same metre round a small ball.
- Prediction (kit text): "A rope hugs a circle. Add 1 m and lift it evenly all round. Round the Earth, compared with a small ball, the gap is…" options: A. Far smaller / B. The same / C. Far bigger (answer: B).
- Check (G1): new radius = (2πr + 1) ÷ 2π = r + 1/(2π); gap = 0.1592 m for r = 0.11 m, 0.35 m and 6,378,137 m (computed, not assumed). 1/(2π) = 0.159155.
- Stage: two parts in one picture: a small icon of the whole circle (top left, ≤ 80 px, labelled with its radius) and a large zoom window on the top of the circle showing the ground arc, the lifted rope and a 20 cm ruler, with the gap readout "gap 15.9 cm". Controls in DOM order: "Ball (r = 11 cm)", "Wheel (r = 35 cm)", "Earth (r = 6,378 km)", Reset. Initial state: the rope tight on the ball (gap 0); each chip adds the metre and lifts the rope. The zoom window is labelled "zoomed in" and its ruler is the scale, so the Earth's curve looks flat honestly.
- Stage word budget: 17 words (stimulus 0, other 17) with spaced units, binding; 11 with fused units ("11cm"). Busiest frame is any lifted frame (chips fixed, icon label swaps size). Closed list, spaced/fused: icon label "r = 11 cm" 2/1 ("r" counts, "cm" counts only when spaced; Earth: "r = 6,378 km" the same); "zoomed in" 2/2; ruler tick "20 cm" 1/0; readout "gap 15.9 cm" 2/1; chips "Ball (r = 11 cm)" 3/2, "Wheel (r = 35 cm)" 3/2, "Earth (r = 6,378 km)" 3/2, "Reset" 1/1. Numerals count 0. Prediction text is kit text (rule 4), not counted.
- Milestones: (1) a small circle lifted (ball or wheel); (2) the Earth lifted. QA path: chips 1 and 3.
- Reveal (draft, 69 words): "For your ball and for the Earth, the extra metre lifted the rope by the same 15.9 cm, enough for a cat to crawl under. The rope's length is 2π times the radius, so each extra metre adds 1 ÷ 2π, about 0.159 m, to the radius, whatever the size. The Earth's huge radius never enters the sum: the metre is shared out the same way round any circle."
- Phone fit: zoom window 340 × 180 px, icon inside its corner; reveal 69 words.
- Planned claims:
  1. Circumference = 2πr. support: definition of π; source: derivation.
  2. Adding length L to the rope raises the radius by L ÷ 2π, independent of r; for L = 1 m that is 0.159 m (15.9 cm). support: derivation; source: G1.
  3. The Earth's equatorial radius is about 6,378 km. support: citation; source: WGS 84 semi-major axis a = 6,378,137 m (NGA TR8350.2). The fact-checker confirms the constant; the gap does not depend on it.
  4. "Enough for a cat to crawl under": a 15.9 cm gap. Builder: keep only if the fact-checker accepts it as illustrative; otherwise cut the clause (the reveal stands without it).
- curriculum: `{"primary":"math:circumference-linear-in-radius","also":["math:pi-from-rolling"],"prerequisites":["math:pi-from-rolling"],"level":"core","strand":"geometry","references":[],"tags":["circles","linearity","number-sense"]}`
- Needs interaction-designer spec: no (single card; the zoom window is a drawing, not a new format).
- Differs from nearest: `math/pi-is-three-and-a-bit` measures π by rolling; `math/circle-slices-to-rectangle` is about area. Geography lessons use the Earth's circumference for distances. None shows that the change in circumference is linear in the change in radius.

### 2. push-the-frame-over · concept: parallelogram-area · intro · demand 2 · format: Single card
- Learner knows: area of a rectangle = width × height / does not know: that a parallelogram's area is base × height, so pushing a frame over keeps its sides but loses area.
- Misconception: a frame that leans keeps its area, because its sides and perimeter have not changed (or: a parallelogram's area is base × slanted side).
- Prediction (kit text): "A 4 by 3 rectangular frame is pushed so it leans. Its sides keep their lengths. Its area…" options: A. stays the same / B. shrinks / C. grows (answer: B).
- Check (G2): sides 4 and 3, angle θ: area = 4 × 3 × sin θ; 90°: 12.00, 60°: 10.39 (height 2.60), 30°: 6.00 (height 1.50); perimeter 14 in every case.
- Stage: the hinged frame on its 4-long base, with the vertical height drawn dashed and labelled; readouts "sides 4 and 3 · perimeter 14 · height 1.50 · area 6.0". Controls in DOM order: "Lean to 60°", "Lean to 30°", "Cut and slide" (cuts the triangle off the slanted end and slides it to the other end, so the frame's inside becomes a 4 by height rectangle; pressing again puts it back), Upright, Reset.
- Stage word budget: 15 words (stimulus 0, other 15); no units, so one total. Busiest frame is any leaning frame (the cut-and-slide frame adds no words). Closed list: readout "sides 4 and 3 · perimeter 14 · height 1.50 · area 6.0" 5 (sides, and, perimeter, height, area); label on the dashed height line, counted as 1 word ("h" or "height"; the builder may use "h"); chips "Lean to 60°" 2, "Lean to 30°" 2, "Cut and slide" 3, "Upright" 1, "Reset" 1. Numerals and degrees count 0.
- Milestones: (1) a lean with area below 12; (2) cut and slide shown while leaning (record the angle). QA path: chips 1, 2, 3.
- Reveal (draft, 66 words; {h}, {A} from the lean the learner had when cutting): "Leaning kept every side and the perimeter at 14, but the height fell to {h} and the area to {A}. Cutting off the slanted end and sliding it across made a rectangle 4 wide and only {h} tall. A parallelogram's area is base times height, not base times slanted side. Push the frame flat and its area goes to nothing while its sides stay the same."
- Phone fit: stage 320 × 200 px at 60 px per unit.
- Planned claims:
  1. A parallelogram with sides 4 and 3 at angle θ has height 3 sin θ and area 12 sin θ; at 60° about 10.4, at 30° 6.0. support: derivation; source: G2.
  2. Its perimeter stays 14 at every angle. support: derivation.
  3. Cutting a right triangle off one end and moving it to the other turns a parallelogram into a rectangle with the same base and height (same area). support: derivation (congruent triangles).
- curriculum: `{"primary":"math:parallelogram-area","also":["math:multiplication-as-area"],"prerequisites":["math:multiplication-as-area"],"level":"intro","strand":"geometry","references":[],"tags":["area","parallelogram","dissection"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `math/triangle-is-half` dissects a triangle into half a rectangle; `math/fence-for-biggest-pen` keeps the perimeter and changes rectangles' sides. This one keeps the sides themselves and shows the height is what counts. `lifehacks/measure-diagonal-for-square` checks squareness by diagonals, not area.

### 3. three-sticks-one-triangle · concept: triangle-inequality · intro · demand 2 · format: Single card
- Learner knows: a triangle has three sides / does not know: that three lengths make a triangle only if the two shorter add to more than the longest.
- Misconception: any three sticks can be joined into a triangle if you tilt them the right way.
- Prediction (kit text): "Sticks of 2 cm, 3 cm and 6 cm. Joined end to end, can they make a triangle?" options: A. Yes, tilted the right way / B. Only lying flat / C. No, never (answer: C).
- Check (G3): 2 + 3 = 5 < 6: the best they can do (lying flat along the 6) leaves a 1 cm gap, and raising them only shortens their reach; 3 + 4 = 7 > 6 closes; 2 + 4 = 6 meets only lying flat (zero height).
- Stage: the long stick as the base; the two short sticks hinged at its ends and drawn at 45° to start, their free ends with a gap readout "gap 2.6 cm" (computed live from the angles). Controls in DOM order: "Lay them flat" (both to 0°: gap 1.0 cm), "Raise them" (both to 60°: gap grows), "Sticks 3, 4, 6" (swaps the set; the sticks swing to meet and the triangle fills), "Sticks 2, 4, 6" (they meet only flat; the readout says "height 0"), Reset (back to 2, 3, 6 at 45°).
- Stage word budget: 13 words (stimulus 0, other 13) with spaced units, binding; 9 with fused units ("2cm"). Busiest frame is any frame with the gap readout ("height 0" is 1 word and replaces it). Closed list, spaced/fused: readout "gap 2.6 cm" 2/1; stick length labels "2 cm", "3 cm", "6 cm" 3/0 (the brief implies these labels; the builder recounts if worded otherwise); chips "Lay them flat" 3, "Raise them" 2, "Sticks 3, 4, 6" 1, "Sticks 2, 4, 6" 1, "Reset" 1 (8 in both). Numerals count 0.
- Milestones: (1) set 2, 3, 6 seen lying flat with a 1 cm gap; (2) set 3, 4, 6 closed. QA path: chips 1 and 3.
- Reveal (draft, 76 words): "Even lying flat along the 6 cm stick, the 2 and 3 cm sticks reached only 5 cm and left a 1 cm gap; raising them only widened it. The two shorter sides must add to more than the longest. 3 + 4 = 7 beats 6, and that set closed; 2 + 4 = 6 met only lying flat. A straight line is the shortest way between two points, so the detour must be longer."
- Phone fit: base 6 cm drawn 300 px wide; stage ≤ 200 px tall.
- Planned claims:
  1. Three lengths a ≤ b ≤ c form a triangle exactly when a + b > c. support: derivation (triangle inequality).
  2. For 2, 3 and 6 the free ends get no closer than 1 cm, at 0°; for 3, 4, 6 they meet above the base; for 2, 4, 6 only at 0°. support: derivation; source: G3 and the gap formula (distance between the two free ends as a function of the angles; the builder computes it in Demo.tsx from the same formula).
  3. The gap at both angles 45° is 2.6 cm for 2, 3, 6 (and the value for 60° the builder prints). support: derivation; builder records the computed numbers in meta.
- curriculum: `{"primary":"math:triangle-inequality","also":[],"prerequisites":[],"level":"intro","strand":"geometry","references":[],"tags":["triangles","inequality","geometry"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `math/straight-across-saves` (Pythagoras) compares a diagonal with walking round two sides; this one asks whether a triangle exists at all. No lesson teaches the inequality.

### 4. ant-on-a-cube · concept: surface-shortest-path · core · demand 2 · format: Before / after toggle
- Learner knows: Pythagoras (`math/two-squares-become-one`) / does not know: that the shortest walk over a surface is found by unfolding it flat and drawing a straight line.
- Misconception: the shortest walk across a box goes along its edges or along a face diagonal, because those are the straight lines you can see.
- Prediction (kit text): "An ant walks on the outside of a 1 m cube, from one corner to the opposite far corner. Its shortest walk is about…" options: A. 2.2 m / B. 2.4 m / C. 3.0 m (answer: A).
- Check (G4): along three edges 3.000 m; face diagonal then edge 1 + √2 = 2.414 m; over two faces crossing the shared edge at a point t along it, length √(1 + t²) + √(1 + (1 − t)²), minimum √5 = 2.236 m at t = 0.5 (the midpoint). A Dijkstra search over the whole cube surface (60 grid points per edge, straight segments inside faces) also finds 2.2361, so no route over three faces is shorter. The straight line through the inside would be √3 = 1.732 m (not walkable).
- Stage: the cube drawn in a fixed oblique view, the ant's two corners marked; route readout "length 3.00 m". Controls in DOM order: "Along the edges", "Diagonal then edge", "Unfold two faces" (the top and front faces fold flat into a 1 by 2 rectangle and the straight line is drawn, with "√(1² + 2²) = 2.24 m"), "Fold back up" (the straight line becomes the bent path on the cube, crossing the shared edge at its midpoint), Reset.
- Stage word budget: 16 words (stimulus 0, other 16) with spaced units, binding; 14 with fused units ("3.00m"). Before / after toggle, both states counted; the busier (unfolded) is N. Chips are on screen in both states: "Along the edges" 3, "Diagonal then edge" 3, "Unfold two faces" 3, "Fold back up" 3, "Reset" 1 = 13. Cube state: readout "length 3.00 m" 2/1 gives 15 spaced, 14 fused. Unfolded state: readout "length 2.24 m" 2/1 plus the line label "√(1² + 2²) = 2.24 m" 1/0 (only "m" has a letter) gives 16 spaced, 14 fused. Numerals and symbols count 0. If the builder labels the net's sides ("1", "2" are numerals, 0), no change; any word label added is a recount.
- Milestones: (1) a visible route ≥ 2.41 m seen; (2) the unfolded straight line seen; (3) folded back with the bent path visible (it persists into the reveal). QA path: chips 1 to 4.
- Reveal (draft, 68 words): "Along the edges was 3 m and the face diagonal plus an edge 2.41 m. Unfolding two faces into a flat 1 by 2 rectangle turned the walk into one straight line, √(1² + 2²) = √5, about 2.24 m, crossing the shared edge at its midpoint. On a flat sheet a straight line is shortest, so the best walk over a surface is found by unfolding it."
- Phone fit: cube 200 px; the unfolded net (1 by 2) fits in 300 × 150 px; one picture at a time (the toggle), never both.
- Planned claims:
  1. Route along three edges is 3 m; face diagonal then edge is 1 + √2 ≈ 2.41 m. support: derivation; source: G4.
  2. Over two faces, the shortest route is √5 ≈ 2.24 m, crossing the shared edge at its midpoint. support: derivation (unfolding plus Pythagoras); source: G4 minimisation.
  3. No surface route between opposite corners is shorter than √5. support: derivation; source: G4 surface-grid Dijkstra (upper bound equals √5) and the unfolding argument (any route crosses from a face at the start to a face at the end; every unfolding of the faces it crosses puts the corners at least √5 apart).
- curriculum: `{"primary":"math:surface-shortest-path","also":["math:pythagoras-by-rearrangement"],"prerequisites":["math:pythagoras-by-rearrangement"],"level":"core","strand":"geometry","references":[],"tags":["geometry","nets","shortest-path","pythagoras"]}`
- Needs interaction-designer spec: no (Before / after toggle is in the catalogue and builds by hand).
- Differs from nearest: `math/straight-across-saves` cuts a corner on a flat field; `lifehacks/sofa-diagonal-room` fits a sofa through a room. This one is the unfolding idea: a curved or folded surface becomes flat, and then the straight line wins.

### 5. slice-a-corner-off · concept: euler-polyhedron-formula · core · demand 2 · format: Single card
- Learner knows: corners (vertices), edges and faces of a cube / does not know: that for any convex solid, corners − edges + faces = 2, and that cutting a corner off cannot change it.
- Misconception: slicing a corner off a solid changes its counts in an unrelated way, so corners − edges + faces changes too.
- Prediction (kit text): "A cube: 8 corners − 12 edges + 6 faces = 2. Slice one corner off. Now corners − edges + faces is…" options: A. less than 2 / B. still 2 / C. more than 2 (answer: B).
- Check (G5): cube 8, 12, 6 → 2; one corner sliced (a corner where 3 edges meet): 10, 15, 7 → 2; two corners: 12, 18, 8 → 2; all eight: 24, 36, 14 → 2. Square pyramid 5, 8, 5 → 2; apex sliced (4 edges meet): 8, 12, 6 → 2. Tetrahedron 4, 6, 4 and triangular prism 6, 9, 5 also give 2. Slicing a corner where k edges meet adds k − 1 corners, k edges and 1 face: (k − 1) − k + 1 = 0.
- Stage: one solid drawn as a wireframe with hidden edges dashed; readout "10 − 15 + 7 = 2" with the change "+2 corners, +3 edges, +1 face" highlighted after each slice. Controls in DOM order: "Slice a corner", "Slice another", "Square pyramid", "Slice its tip", Reset. "Slice its tip" is enabled once the pyramid is on screen; it sits after "Square pyramid" so the QA path reaches it.
- Stage word budget: 14 words (stimulus 0, other 14); no units, so one total. Busiest frame is any frame after a slice (the change line is visible). Closed list: readout "10 − 15 + 7 = 2" 0; change line "+2 corners, +3 edges, +1 face" 3; chips "Slice a corner" 3, "Slice another" 2, "Square pyramid" 2, "Slice its tip" 3, "Reset" 1. Numerals and signs count 0. Adding "corners − edges + faces" as a readout key would add 3 and still be 17.
- Milestones: (1) a cube corner sliced (the question's case); (2) the pyramid tip sliced. QA path: chips 1 to 4.
- Reveal (draft, 78 words): "Slicing a corner off your cube lost 1 corner and made 3, so +2 corners, +3 edges and +1 face: 2 − 3 + 1 = 0, and the total stayed 2. The pyramid's tip, where 4 edges meet, gave +3 − 4 + 1 = 0 too. A slice through a corner where k edges meet always adds k − 1 corners, k edges and 1 face. For every convex solid the total is 2: Euler's formula."
- Phone fit: solid 220 px; readout under it.
- Planned claims:
  1. The stage's counts: cube 8, 12, 6; after one slice 10, 15, 7; after two 12, 18, 8; square pyramid 5, 8, 5; after slicing its tip 8, 12, 6; each gives 2. support: derivation; source: G5 (builder recounts from the drawn solids).
  2. Slicing a corner where k edges meet adds k − 1 corners, k edges and 1 face, leaving V − E + F unchanged. support: derivation.
  3. For every convex polyhedron V − E + F = 2 (Euler's polyhedron formula). support: citation (theorem) plus the counts above; source: any standard text; the name "Euler" only if the fact-checker accepts the attribution (Euler 1758); no date in learner text.
- curriculum: `{"primary":"math:euler-polyhedron-formula","also":[],"prerequisites":[],"level":"core","strand":"geometry","references":[],"tags":["polyhedra","invariants","euler"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `math/bridge-parity` (Euler paths) shares the name, not the idea; `math/two-colours-enough` is about plane maps. No lesson teaches V − E + F.
