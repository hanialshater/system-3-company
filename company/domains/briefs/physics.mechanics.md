# Mechanics & Motion briefs (cm-physics-mechanics)

Ranked briefs for this strand, in the same format as `physics.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next physics` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Round 3 (2026-10-14, cm-physics)

New demand-3 concept `head-on-equals-wall` added to `content/curriculum/physics.json`. Cross-file rank 3 of 4 (see `physics.electricity.md` round 3 for the full list). Numbers re-run in `artifacts/scratch/cm-physics-r3/check.mjs`. No human-learner data exists.

### 1. head-on-is-a-wall · concept: head-on-equals-wall · core · demand 3 · format: Single card
- Learner knows: crashes are worse at higher speed; crumple zones (crumple-zone-stopping-time); momentum (sticky-cart-merge). / does not know: that in a symmetric head-on crash the meeting point stays still, so each car stops from its own speed exactly as against a rigid wall, and that crash damage scales with speed squared.
- Misconception: Two cars each at 50 km/h colliding head-on is like one car hitting a wall at 100 km/h.
- Prediction (stage text ≤ 25 words): "Car A crashes head-on into an identical car; both drive at 50 km/h. For car A, that crash is like hitting a solid wall at..." options: A. 25 km/h / B. 50 km/h / C. 100 km/h (answer: B).
- Check: m = 1,500 kg, v = 50 km/h = 13.89 m/s. Re-run: after a perfectly inelastic symmetric crash the pair is at rest (total momentum 0). Energy each car's crumple zone absorbs: 144.7 kJ head-on, 144.7 kJ against a wall at 50, 578.7 kJ against a wall at 100 (4×). Total head-on energy 289.4 kJ is shared by two cars.
- What the stage shows: one top-view road. Control 1: target toggle (identical car / solid wall). Control 2: car A speed chips (25 / 50 / 100 km/h). Control 3: Crash (computes, then replays the stop in ≤ 400 ms). Above car A, one "crush energy in car A" bar with a dashed outline left by each earlier run, so the comparison sits in one picture; a midpoint marker shows the meeting point does not move in the head-on case.
- Key state (milestones): (1) head-on at 50, (2) wall at 50, (3) wall at 100. Record each bar height at its milestone; the dashed outlines keep all three visible when the reveal opens, and the Seen row ("car 50: 145 kJ · wall 50: 145 kJ · wall 100: 579 kJ") survives Reset.
- Reveal payoff (draft, 78 words): "Your 50 km/h head-on crash filled car A's crush bar as high as the 50 km/h wall did; the 100 km/h wall filled it four times higher. The cars meet and stop at the midpoint, so each brakes from 50 to 0 in its own crumple zone, as if the other were a wall. Doubling the closing speed doubles the total energy, but two cars share it. Crush energy grows with speed squared, so a 100 km/h wall is four times worse."
- Phone fit: the bar sits above the road in the same picture; no table. Stage-top crop 0 px at 390×844 with the reveal open, bar outlines visible.
- Planned claims:
  1. In a head-on collision of identical cars at equal speeds, total momentum is zero, so both cars stop at the meeting point. support: derivation (momentum conservation); source: check.mjs.
  2. Each car's crumple zone absorbs ½ m v^2 = 144.7 kJ at 50 km/h for a 1,500 kg car, the same as a crash into a rigid immovable wall at 50 km/h. support: derivation; source: check.mjs. The symmetric case acts as a wall because the contact plane does not move.
  3. A wall crash at 100 km/h puts 578.7 kJ, four times as much, into one car (kinetic energy ∝ v^2). support: derivation; source: check.mjs.
  4. Idealisations stated: identical cars and crumple zones, perfectly inelastic, rigid immovable wall, no braking before impact. A lighter car in a real crash with a heavier one fares worse: one told sentence in assumptions only, claimed with derivation (the lighter car's speed change is larger).
- curriculum: `{"primary":"physics:head-on-equals-wall","also":["physics:kinetic-energy-speed-squared"],"prerequisites":["physics:momentum-collisions"],"level":"core","strand":"mechanics","tags":["collisions","momentum","energy","road safety"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: crumple-zone-stopping-time teaches that longer stopping time lowers force; truck-hits-car-force teaches equal and opposite forces; sticky-cart-merge teaches momentum sharing with one cart at rest; doubling-speed-braking teaches v^2 in braking distance. None asks what a head-on crash is equivalent to, which is the misconception here.

## Round 4 (2026-10-14, cm-physics)

Wave J briefs for this strand are in `physics.md` round 4 (#56–#70; strand named on each brief), so the claim queue hands out demand-3 concepts first across all strands.
