# Build note: what-pushes-the-car

Builder: demo-builder (builder-wavej-pr1, project wave-j), 2026-10-16. Brief: `company/domains/briefs/physics.md` round 4 (Wave J), #63. Status draft → review (QA contract and reveal-fit passed locally); every claim unverified.

Built as briefed: one road strip and a side-view car. At each tyre's contact patch a forward arrow (domain colour) and a backward arrow (muted), drawn in proportion (1 px per 40 N per axle), labelled once "road on tyre →" and "← tyre on road". The engine's part is a curved turning arrow on each wheel, and the spokes turn by the same angle on every surface, so on the frictionless road the wheels visibly turn as hard and the car stays put. Spin marks appear when the asked-for 2,400 N exceeds μ m g. The car is drawn where it would be 2 s after pulling away (dashed outline at the start), 12 px per m. Starts parked, a state no preset produces.

Departures: title and hook written here ("What pushes a car forward?" / "Press the pedal and the car pulls away. Something has to push it. What?"). The ice case shows 1,177 N (not the brief's "~1,200 N") so that the force and the 0.98 m/s² agree on the stage; the Seen row and reveal quote 1,177 N. The 2 s position and the arrow scale are disclosed in claim c6, not on the stage.

Open item for cm-physics (not fixed): stage text counts 12 words parked and up to 31 after a run, counting every number and unit token (readout, two arrow labels, caption, the brief's three-part Seen row). The budget is 25.

## Pre-flight v1

1. **Title and hook.** "What pushes a car forward?" / "Press the pedal and the car pulls away. Something has to push it. What?" Neither names the engine, road or air.
2. **Options.** "Its engine", "The road", "The air behind it": none numbered, same plain wording.
3. **Locked stage.** A parked car on a grey road strip, caption, empty Seen row. No arrows, no readout, no labels on the road.
4. **Reveal values.** "2.0 m/s²" and "2,400 N": milestone dry (Seen "dry: 2,400 N, 2.0 m/s²"). "1,177 N" and "slipped": milestone ice (Seen "ice: 1,177 N, slips"). "went nowhere" with the wheels turning: milestone frictionless (Seen "frictionless: 0 N, stays put"; the current state at the reveal).
5. **QA path.** DOM order: Dry road (dry), Ice (ice), Frictionless (frictionless). Three presses reach all three. At the reveal the frictionless state (readout "0 N forward · 0 m/s² · wheels spin", turning arrows, spin marks, no ghost) and the full Seen row are on the stage.
6. **Reset.** No Reset control; the Seen row is never cleared. Reveal on the QA path: "On the dry road your car gained speed at 2.0 m/s², pushed by the road's 2,400 N grip on the tyres. On ice the road could give only 1,177 N and the wheels slipped. On a frictionless road the engine spun the wheels just as hard and the car went nowhere. The engine turns the wheels and the tyres push back on the road; the road pushing forward on the tyres is what moves the car."
7. **Phone fit.** `tools/reveal-fit.mjs` (clean stamp, tool commit 79c22aa) at 390×844 on a production build, port 3821, 2026-10-16: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, picScale 1, 82 reveal words including the verdict line (about 78 in the body). The reveal points at the arrows only by meaning (road on tyres, tyres on road); at the reveal (frictionless) the force arrows are at 0 N and not drawn, and the dry and ice values are in the Seen row. Builder probe: stage top 174 px, reveal bottom 715 of 844, smallest SVG label 10.5 px, every press changed the stage, no console errors.

## QA

Computer-use QA, unmodified `tests/qa/contract.spec.ts`, `QA_ONLY=electron-speed-in-a-wire,second-speaker-decibels,what-pushes-the-car` on a production build at port 3821, 2026-10-16: phone and desktop passed (6/6, default timeouts). Builder's local pass, not the qa-tester's record.
