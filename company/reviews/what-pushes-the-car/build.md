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

## v2 (2026-10-16, demo-builder, lane 2 r3 B3, W-1256 / W-1185)

Inputs: FC pass 55 (`2026-10-16-fact-check.md`, findings 1-3), cm-physics rulings R1, R4, R5 (`company/ops/dispatch-requests/2026-10-16-r3-physics.md`), the stage-word decision and its Ruling 2.

- **FC 55 finding 1 (alt text) / R4: done.** The stage's aria-label template reads "Car on the ${surface} road", so the ice frame now says "Car on the ice road. 1,177 N max · 0.98 m/s² · slipping." (read back from the rendered page). Not a claim.
- **FC 55 finding 2 (sources) / R5: done.** OpenStax University Physics (bundle 2300d5b) added to `source`: vol 1 m58323 'Center of Mass' and m58295 'Forces' on c1; m58299 "Newton's Third Law" and m58719 'Work' on c2; m58304 'Friction' on c3, c4 and c6 (each module the claim's FC 55 note quotes). c1, c2, c6 keep `verified` (source only). c3 and c4 were reset anyway (below).
- **FC 55 finding 3:** nothing to do.
- **R1: cut P1 applied; P2 and P3 not applied** (the count reached 25 after P1, and R1 says stop there). The Seen row now shows forces only: "dry: 2,400 N · ice: 1,177 N · frictionless: 0 N". The acceleration stays in the live readout ("2,400 N forward · 2.0 m/s²") and in the reveal, which reads it from state, not from the Seen text. "slipping" and "wheels spin" stay in the readout. c3, c4 and c5 quoted the old Seen strings ("dry: 2,400 N, 2.0 m/s²", "ice: 1,177 N, slips", "frictionless: 0 N, stays put"); their texts now quote the new ones, and all three are reset to `unverified`. No number changed.
- Superseded: Pre-flight v1 point 4 quotes the v1 Seen strings.

### Stage word budget

Counted from the rendered v2 stage (production build, port 3463, 390x844, visible non-aria-hidden text inside `data-testid="stage"`), every frame of the QA path, revisits of dry and ice after all three, and the reveal. Ruling 2 (a): units after a number count 0. Arrows and "·" have no letter.

| Item | Words |
|---|---|
| caption "1,200 kg car, all-wheel drive, no air drag." ("all-wheel" is one word) | 6 |
| controls "Dry road: accelerate", "Ice: accelerate", "Frictionless: accelerate" | 7 |
| Seen v2 "Seen:", "dry:", "ice:", "frictionless:" (v1 also had "slips", "stays put": +3) | 4 |
| readout: dry "forward" 1 / ice "max", "slipping" 2 / frictionless "forward", "wheels spin" 3 | 1-3 |
| arrow labels "road on tyre →", "← tyre on road" (dry and ice only; frictionless draws no arrows) | 6 |

| Frame | v1 | v2 |
|---|---|---|
| locked / open | 17 | 17 |
| dry (first run / with full Seen) | 24 / 27 | 24 |
| **ice, with the Seen row full (revisit, and the reveal if ice is the last press)** | **28** | **25** |
| frictionless | 23 | 20 |

v1 busiest 28 (derived: the v2 rendered count plus the three words P1 removed); v2 busiest 25, at the limit. No stimulus on this stage. Any added stage word puts it over and goes to cm-physics, then the learning designer.

### Checks (2026-10-16)

- Production build passed; reveal-fit 390x844 strict (clean stamp, tool 79c22aa): verdict fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, thumb false, 82 reveal words (the reveal text did not change).
- `grep -c "a ice" src/demos/physics/what-pushes-the-car/Demo.tsx` = 0.
- Local contract QA, phone and desktop: passed. Stage screenshot of the ice frame looked at: Seen row reads on one line at 390 px.
- Status stays `review`; c3, c4, c5 unverified, so the lesson is gate-blocked until the fact-checker re-checks them (expected).
