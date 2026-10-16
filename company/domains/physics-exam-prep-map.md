# Physics exam-prep syllabus map: OpenStax College Physics for AP Courses 2e

owner: cm-physics (Omar) · written 2026-10-16 · batch `company/ops/dispatch-requests/2026-10-16-r5-physics.md#B1` · board W-543, W-808 · status: **proposal** to head-of-product (W-543) and principal-pm-verticals (exam-prep vertical doc). It is not a build plan. W-582 (the founder's exam-prep decision) is still open, and nothing here claims a build slot.

## Source and how it was read

- Collection XML: `https://raw.githubusercontent.com/openstax/osbooks-college-physics-bundle/fd1b25dfd5d8c6580c6e2b2b34a19e29cc69ada9/collections/college-physics-ap-courses-2e.collection.xml` (HTTP 200, 16,957 bytes, sha256 `e3702cc199625030f065bbac049ce6b12d2bd5dac1562df5cd0bfc3b7f98faf7`). It is byte-identical to `main` on 2026-10-16. `fd1b25d` is the bundle's HEAD from `git ls-remote` that day.
- **Commit note.** The brief says "FC 55 used bundle commit 2300d5b". That commit is in the **University Physics** bundle (see `company/reviews/second-speaker-decibels/2026-10-16-fact-check.md`). In this bundle, `.../osbooks-college-physics-bundle/2300d5b/...` returned **HTTP 404**, so I pinned this bundle's own HEAD instead.
- Section titles come from each module's `index.cnxml` `<title>` at the same commit. All 283 modules were fetched, and none failed. The XML has 34 chapter subcollections. They hold 278 modules: 34 "Connection for AP® Courses" intros plus 244 sections. A preface (m57419) sits before the chapters and 4 back-matter modules sit after them.
- Licence: CC BY-NC-SA 4.0. The table of contents is used **as a mapping reference only, never as lesson content** (vertical review 2026-10-14 §3 ask 4, research-lead).
- **AP alignment is unconfirmed.** "for AP Courses" is the publisher's title. The College Board's Course and Exam Description was not opened, because it cannot be reached from this host. A gap here means a textbook section we do not teach. It does not mean an AP topic.
- Mapping is by concept tag in each lesson's `meta.json` (`src/demos/*/*/meta.json`) and the concept names in `content/curriculum/*.json`. Other categories' lessons are named but not judged. Their maps belong to their CMs.

## Status key

- **covered**: a physics lesson on disk teaches the section's central idea. A lesson shown as [review] or [draft] is not yet published. Every other lesson named here is published.
- **partial**: a lesson teaches one idea in the section, and the note names what it leaves out.
- **other category**: another category's lesson teaches it (domain/slug).
- **on map, briefed, unbuilt**: the concept is already on the physics map with a brief (#64-70, Wave J, held by lane 2).
- **gap (textbook section; AP alignment unconfirmed)**: nothing on disk teaches it.
- **n/a**: a chapter intro, problem-solving method, framing or open-questions section.
- **In focus** means the charter's focus, everyday motion and energy, with equations and units. By chapter that is Ch 2-10 (mechanics), Ch 14-15 (heat and thermodynamics) and 16.1-16.8 (oscillations). Two exceptions are out of focus: 4.8 (a taxonomy of forces) and 7.9 (energy-use data). Fluids, gases, waves and sound, electricity and magnetism, optics and modern physics are out of focus. They stay on the physics map, but they rank behind the focus.

## Totals

Across the 244 content sections (the 34 chapter intros are not counted): **covered 56**, **partial 32**, **other category 17**, **briefed and unbuilt 7** (6 distinct briefs; #68 appears twice), **gap 128**, n/a 4.

**Gaps in focus: 22** of the 77 in-focus content sections. 17 more in-focus sections are partial. The other 106 gaps are out of focus. Most are electricity and magnetism (Ch 18-19, 21-23), optics (Ch 24-27) and modern physics (Ch 28-34).

Reading: the textbook's mechanics and energy chapters (Ch 2-10) are largely taught already. The in-focus gaps cluster in rotational kinematics (Ch 10), thermodynamics (Ch 15) and oscillator detail (Ch 16), plus three kinematics basics: displacement, average speed and motion graphs. The large gap blocks are electrostatics, magnetism, AC, wave optics and modern physics. Under the charter's focus rule those wait.

## Chapters (one row per chapter subcollection in the XML)

| No. | Title | Mapped sections (excl. n/a) | Covered | Partial | Other cat. | Briefed | Gap | Gap in focus |
|---|---|---|---|---|---|---|---|---|
| Ch 1 | Introduction: The Nature of Science and Physics | 3 | 0 | 0 | 0 | 0 | 3 | 0 |
| Ch 2 | Kinematics | 7 | 3 | 1 | 0 | 0 | 3 | 3 |
| Ch 3 | Two-Dimensional Kinematics | 5 | 4 | 1 | 0 | 0 | 0 | 0 |
| Ch 4 | Dynamics: Force and Newton's Laws of Motion | 7 | 3 | 3 | 0 | 0 | 1 | 0 |
| Ch 5 | Further Applications of Newton's Laws: Friction, Drag, and Elasticity | 3 | 2 | 1 | 0 | 0 | 0 | 0 |
| Ch 6 | Uniform Circular Motion and Gravitation | 6 | 4 | 1 | 0 | 0 | 1 | 1 |
| Ch 7 | Work, Energy, and Energy Resources | 9 | 4 | 3 | 0 | 0 | 2 | 1 |
| Ch 8 | Linear Momentum and Collisions | 7 | 6 | 0 | 0 | 0 | 1 | 1 |
| Ch 9 | Statics and Torque | 6 | 1 | 3 | 0 | 0 | 2 | 2 |
| Ch 10 | Rotational Motion and Angular Momentum | 7 | 2 | 1 | 0 | 0 | 4 | 4 |
| Ch 11 | Fluid Statics | 9 | 3 | 0 | 2 | 1 | 3 | 0 |
| Ch 12 | Fluid Dynamics and Its Biological and Medical Applications | 7 | 0 | 1 | 1 | 0 | 5 | 0 |
| Ch 13 | Temperature, Kinetic Theory, and the Gas Laws | 6 | 0 | 0 | 5 | 0 | 1 | 0 |
| Ch 14 | Heat and Heat Transfer Methods | 7 | 2 | 1 | 2 | 0 | 2 | 2 |
| Ch 15 | Thermodynamics | 7 | 0 | 1 | 2 | 0 | 4 | 4 |
| Ch 16 | Oscillatory Motion and Waves | 11 | 5 | 2 | 0 | 0 | 4 | 4 |
| Ch 17 | Physics of Hearing | 7 | 4 | 1 | 0 | 1 | 1 | 0 |
| Ch 18 | Electric Charge and Electric Field | 8 | 0 | 1 | 0 | 0 | 7 | 0 |
| Ch 19 | Electric Potential and Electric Field | 7 | 1 | 0 | 0 | 0 | 6 | 0 |
| Ch 20 | Electric Current, Resistance, and Ohm's Law | 7 | 3 | 2 | 0 | 1 | 1 | 0 |
| Ch 21 | Circuits and DC Instruments | 6 | 1 | 1 | 0 | 1 | 3 | 0 |
| Ch 22 | Magnetism | 11 | 1 | 0 | 0 | 0 | 10 | 0 |
| Ch 23 | Electromagnetic Induction, AC Circuits, and Electrical Technologies | 12 | 2 | 1 | 0 | 1 | 8 | 0 |
| Ch 24 | Electromagnetic Waves | 4 | 0 | 1 | 0 | 0 | 3 | 0 |
| Ch 25 | Geometric Optics | 7 | 4 | 1 | 0 | 1 | 1 | 0 |
| Ch 26 | Vision and Optical Instruments | 6 | 1 | 0 | 0 | 0 | 5 | 0 |
| Ch 27 | Wave Optics | 9 | 0 | 2 | 0 | 1 | 6 | 0 |
| Ch 28 | Special Relativity | 6 | 0 | 0 | 0 | 0 | 6 | 0 |
| Ch 29 | Quantum Physics | 8 | 0 | 0 | 0 | 0 | 8 | 0 |
| Ch 30 | Atomic Physics | 9 | 0 | 0 | 1 | 0 | 8 | 0 |
| Ch 31 | Radioactivity and Nuclear Physics | 7 | 0 | 1 | 3 | 0 | 3 | 0 |
| Ch 32 | Medical Applications of Nuclear Physics | 7 | 0 | 2 | 0 | 0 | 5 | 0 |
| Ch 33 | Particle Physics | 6 | 0 | 0 | 0 | 0 | 6 | 0 |
| Ch 34 | Frontiers of Physics | 6 | 0 | 0 | 1 | 0 | 5 | 0 |

Back matter (not chapters, not counted): m42699 Atomic Masses, m42702 Selected Radioactive Isotopes, m42720 Useful Information, m42709 Glossary of Key Symbols and Notation. Front matter: m57419 Preface.

## Sections, by chapter

### Ch 1. Introduction: The Nature of Science and Physics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 1.0 | m54763 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 1.1 | m42092 | Physics: An Introduction | n/a | framing, no concept | no |
| 1.2 | m42091 | Physical Quantities and Units | gap (textbook section; AP alignment unconfirmed) | units and conversions; cross-cutting skill (lifehacks decimal-unit-conversion is unbuilt) | no |
| 1.3 | m42120 | Accuracy, Precision, and Significant Figures | gap (textbook section; AP alignment unconfirmed) | nearest: big-ideas measurement-uncertainty (unbuilt) | no |
| 1.4 | m42121 | Approximation | gap (textbook section; AP alignment unconfirmed) | nearest: big-ideas fermi-estimation (unbuilt) | no |

### Ch 2. Kinematics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 2.0 | m54768 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 2.1 | m42033 | Displacement | gap (textbook section; AP alignment unconfirmed) | displacement vs distance (a round trip has zero displacement) | yes |
| 2.2 | m42124 | Vectors, Scalars, and Coordinate Systems | partial | two-tugs-right-angle (force vectors only; coordinate systems untaught) | yes |
| 2.3 | m42096 | Time, Velocity, and Speed | gap (textbook section; AP alignment unconfirmed) | average speed vs mean of speeds: ADDED average-speed-round-trip | yes |
| 2.4 | m42100 | Acceleration | covered | ball-at-the-top (velocity zero, acceleration still g) | yes |
| 2.5 | m42099 | Motion Equations for Constant Acceleration in One Dimension | covered | fall-distance-squares; doubling-speed-braking (stopping distance grows with v squared) | yes |
| 2.6 | m42125 | Problem-Solving Basics for One-Dimensional Kinematics | n/a | problem-solving method | no |
| 2.7 | m42102 | Falling Objects | covered | moon-hammer-feather; ruler-catch [review]; fall-distance-squares | yes |
| 2.8 | m42103 | Graphical Analysis of One-Dimensional Motion | gap (textbook section; AP alignment unconfirmed) | reading x-t and v-t graphs: ADDED motion-graph-slope | yes |

### Ch 3. Two-Dimensional Kinematics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 3.0 | m54777 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 3.1 | m42104 | Kinematics in Two Dimensions: An Introduction | covered | dropped-vs-fired-ball | yes |
| 3.2 | m42127 | Vector Addition and Subtraction: Graphical Methods | covered | two-tugs-right-angle | yes |
| 3.3 | m42128 | Vector Addition and Subtraction: Analytical Methods | partial | two-tugs-right-angle (right angle only; general components untaught) | yes |
| 3.4 | m42042 | Projectile Motion | covered | projectile-angle; dropped-vs-fired-ball | yes |
| 3.5 | m42045 | Addition of Velocities | covered | river-crossing-time; drop-on-the-train | yes |

### Ch 4. Dynamics: Force and Newton's Laws of Motion

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 4.0 | m54802 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 4.1 | m42069 | Development of Force Concept | partial | two-tugs-right-angle; same-push-twice-the-mass (no free-body diagram lesson) | yes |
| 4.2 | m42130 | Newton’s First Law of Motion: Inertia | covered | puck-on-ice-no-push | yes |
| 4.3 | m42073 | Newton’s Second Law of Motion: Concept of a System | covered | same-push-twice-the-mass; flour-on-the-moon (mass vs weight) | yes |
| 4.4 | m42074 | Newton’s Third Law of Motion: Symmetry in Forces | covered | truck-hits-car-force; what-pushes-the-car [review]; wrench-throw-recoil | yes |
| 4.5 | m42075 | Normal, Tension, and Other Examples of Forces | partial | elevator-scale (normal); tug-of-war-scale [draft] (tension); normal-force-incline is briefed (#66), unbuilt | yes |
| 4.6 | m42076 | Problem-Solving Strategies | n/a | problem-solving method | no |
| 4.7 | m42132 | Further Applications of Newton’s Laws of Motion | partial | elevator-scale (connected bodies, e.g. Atwood, untaught) | yes |
| 4.8 | m42137 | Extended Topic: The Four Basic Forces—An Introduction | gap (textbook section; AP alignment unconfirmed) | four basic forces (classification, not a motion mechanism; counted out of focus) | no |

### Ch 5. Further Applications of Newton's Laws: Friction, Drag, and Elasticity

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 5.0 | m54888 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 5.1 | m42139 | Friction | covered | brick-on-its-side; crate-wont-budge | yes |
| 5.2 | m42080 | Drag Forces | covered | skydiver-speed-limit | yes |
| 5.3 | m42081 | Elasticity: Stress and Strain | partial | two-springs-end-to-end (Hooke only; stress and strain of solids untaught) | yes |

### Ch 6. Uniform Circular Motion and Gravitation

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 6.0 | m54986 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 6.1 | m42083 | Rotation Angle and Angular Velocity | gap (textbook section; AP alignment unconfirmed) | v = r omega: outer points move faster at one spin rate (candidate, not added) | yes |
| 6.2 | m42084 | Centripetal Acceleration | covered | release-the-spinning-ball; bend-at-double-speed | yes |
| 6.3 | m42086 | Centripetal Force | covered | bend-at-double-speed; release-the-spinning-ball | yes |
| 6.4 | m42142 | Fictitious Forces and Non-inertial Frames: The Coriolis Force | partial | release-the-spinning-ball (no outward force); Coriolis untaught (candidate, demand 1) | yes |
| 6.5 | m42143 | Newton’s Universal Law of Gravitation | covered | iss-gravity-still-there; light-at-double-distance (inverse square); flour-on-the-moon | yes |
| 6.6 | m42144 | Satellites and Kepler’s Laws: An Argument for Simplicity | covered | higher-orbit-slower; throw-it-fast-enough [review]; also geography/iss-never-over-moscow | yes |

### Ch 7. Work, Energy, and Energy Resources

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 7.0 | m55016 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 7.1 | m42146 | Work: The Scientific Definition | covered | carry-box-level | yes |
| 7.2 | m42147 | Kinetic Energy and the Work-Energy Theorem | covered | doubling-speed-braking | yes |
| 7.3 | m42148 | Gravitational Potential Energy | covered | coaster-track-shape | yes |
| 7.4 | m42149 | Conservative Forces and Potential Energy | partial | coaster-track-shape (path independence); spring energy 1/2 k x^2 untaught (candidate, demand 1) | yes |
| 7.5 | m42150 | Nonconservative Forces | partial | doubling-speed-braking; filament-vs-led-heat (friction work as path-dependent heat untaught) | yes |
| 7.6 | m42151 | Conservation of Energy | covered | coaster-track-shape | yes |
| 7.7 | m42152 | Power | partial | kettle-vs-bulb-kwh (electrical power; mechanical P = Fv untaught) | yes |
| 7.8 | m42153 | Work, Energy, and Power in Humans | gap (textbook section; AP alignment unconfirmed) | body efficiency and food energy (candidate, not added) | yes |
| 7.9 | m42154 | World Energy Use | gap (textbook section; AP alignment unconfirmed) | world energy use (data, not a mechanism; out of focus; nearest history energy-transitions, unbuilt) | no |

### Ch 8. Linear Momentum and Collisions

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 8.0 | m55108 | Connection for AP® courses | n/a | chapter intro (AP connection), no concept | - |
| 8.1 | m42156 | Linear Momentum and Force | covered | same-push-twice-the-mass; sticky-cart-merge | yes |
| 8.2 | m42159 | Impulse | covered | crumple-zone-stopping-time | yes |
| 8.3 | m42162 | Conservation of Momentum | covered | sticky-cart-merge; wrench-throw-recoil | yes |
| 8.4 | m42163 | Elastic Collisions in One Dimension | covered | cradle-two-in-two-out | yes |
| 8.5 | m42164 | Inelastic Collisions in One Dimension | covered | sticky-cart-merge; head-on-is-a-wall [review] | yes |
| 8.6 | m42165 | Collisions of Point Masses in Two Dimensions | gap (textbook section; AP alignment unconfirmed) | glancing collisions of equal masses part at 90 degrees (candidate, demand 1) | yes |
| 8.7 | m42166 | Introduction to Rocket Propulsion | covered | wrench-throw-recoil | yes |

### Ch 9. Statics and Torque

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 9.0 | m55175 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 9.1 | m42170 | The First Condition for Equilibrium | partial | tug-of-war-scale [draft]; two-tugs-right-angle; a loaded rope never goes straight: ADDED taut-rope-never-straight | yes |
| 9.2 | m42171 | The Second Condition for Equilibrium | covered | seesaw-sit-closer; build-a-balanced-mobile | yes |
| 9.3 | m42172 | Stability | gap (textbook section; AP alignment unconfirmed) | tipping when the centre of mass leaves the base: ADDED tipping-base-of-support | yes |
| 9.4 | m42173 | Applications of Statics, Including Problem-Solving Strategies | partial | seesaw-sit-closer | yes |
| 9.5 | m42174 | Simple Machines | partial | ramp-same-work; seesaw-sit-closer (pulleys untaught; same force-for-distance insight as ramp-same-work) | yes |
| 9.6 | m42175 | Forces and Torques in Muscles and Joints | gap (textbook section; AP alignment unconfirmed) | muscles as short-arm levers: ADDED muscle-lever-force | yes |

### Ch 10. Rotational Motion and Angular Momentum

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 10.0 | m55182 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 10.1 | m42177 | Angular Acceleration | gap (textbook section; AP alignment unconfirmed) | angular acceleration (demand 1) | yes |
| 10.2 | m42178 | Kinematics of Rotational Motion | gap (textbook section; AP alignment unconfirmed) | rotational kinematics (demand 1) | yes |
| 10.3 | m42179 | Dynamics of Rotational Motion: Rotational Inertia | partial | race-down-the-ramp (rotational inertia; torque = I alpha untaught) | yes |
| 10.4 | m42180 | Rotational Kinetic Energy: Work and Energy Revisited | covered | race-down-the-ramp | yes |
| 10.5 | m42182 | Angular Momentum and Its Conservation | covered | skater-pulls-arms | yes |
| 10.6 | m42183 | Collisions of Extended Bodies in Two Dimensions | gap (textbook section; AP alignment unconfirmed) | collisions of extended bodies (demand 1) | yes |
| 10.7 | m42184 | Gyroscopic Effects: Vector Aspects of Angular Momentum | gap (textbook section; AP alignment unconfirmed) | gyroscopic effects (demand 1; the bicycle-stability story is contested, so claims would be hard to source) | yes |

### Ch 11. Fluid Statics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 11.0 | m55199 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 11.1 | m42186 | What Is a Fluid? | other category | chemistry/one-ml-of-steam (states of matter) | no |
| 11.2 | m42187 | Density | other category | chemistry/heavy-but-floats | no |
| 11.3 | m42189 | Pressure | covered | snowshoe-pressure | no |
| 11.4 | m42192 | Variation of Pressure with Depth in a Fluid | covered | dam-depth-not-width | no |
| 11.5 | m42193 | Pascal’s Principle | gap (textbook section; AP alignment unconfirmed) | Pascal: hydraulic lift | no |
| 11.6 | m42195 | Gauge Pressure, Absolute Pressure, and Pressure Measurement | on map, briefed, unbuilt | atmospheric-pressure-push (#67 longest-drinking-straw), unbuilt | no |
| 11.7 | m42196 | Archimedes’ Principle | covered | clay-boat | no |
| 11.8 | m42197 | Cohesion and Adhesion in Liquids: Surface Tension and Capillary Action | gap (textbook section; AP alignment unconfirmed) | surface tension and capillary action | no |
| 11.9 | m42199 | Pressures in the Body | gap (textbook section; AP alignment unconfirmed) | pressures in the body | no |

### Ch 12. Fluid Dynamics and Its Biological and Medical Applications

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 12.0 | m55221 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 12.1 | m42205 | Flow Rate and Its Relation to Velocity | gap (textbook section; AP alignment unconfirmed) | continuity: narrowing a hose speeds the water | no |
| 12.2 | m42206 | Bernoulli’s Equation | gap (textbook section; AP alignment unconfirmed) | Bernoulli | no |
| 12.3 | m42208 | The Most General Applications of Bernoulli’s Equation | gap (textbook section; AP alignment unconfirmed) | applications of Bernoulli | no |
| 12.4 | m42209 | Viscosity and Laminar Flow; Poiseuille’s Law | gap (textbook section; AP alignment unconfirmed) | viscosity, Poiseuille | no |
| 12.5 | m42210 | The Onset of Turbulence | gap (textbook section; AP alignment unconfirmed) | turbulence | no |
| 12.6 | m42211 | Motion of an Object in a Viscous Fluid | partial | skydiver-speed-limit (drag-limited speed) | no |
| 12.7 | m42212 | Molecular Transport Phenomena: Diffusion, Osmosis, and Related Processes | other category | chemistry/drunkards-reach; chemistry/water-follows-the-crowd; life/slow-across-a-room; life/cell-shrinks-in-brine | no |

### Ch 13. Temperature, Kinetic Theory, and the Gas Laws

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 13.0 | m55232 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 13.1 | m42214 | Temperature | other category | chemistry/twice-as-hot-not-twice-as-fast (Kelvin scale) | no |
| 13.2 | m42215 | Thermal Expansion of Solids and Liquids | gap (textbook section; AP alignment unconfirmed) | thermal expansion | no |
| 13.3 | m42216 | The Ideal Gas Law | other category | chemistry/tire-after-the-drive; chemistry/freezer-balloon | no |
| 13.4 | m42217 | Kinetic Theory: Atomic and Molecular Explanation of Pressure and Temperature | other category | chemistry/twice-as-hot-not-twice-as-fast | no |
| 13.5 | m42218 | Phase Changes | other category | chemistry/summit-kettle; chemistry/one-ml-of-steam | no |
| 13.6 | m42219 | Humidity, Evaporation, and Boiling | other category | chemistry/where-the-dew-forms; chemistry/summit-kettle | no |

### Ch 14. Heat and Heat Transfer Methods

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 14.0 | m55253 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 14.1 | m42223 | Heat | covered | metal-feels-colder [review]; coat-on-the-ice | yes |
| 14.2 | m42224 | Temperature Change and Heat Capacity | other category | chemistry/same-heat-different-rise | yes |
| 14.3 | m42225 | Phase Change and Latent Heat | other category | chemistry/heat-in-no-rise | yes |
| 14.4 | m42226 | Heat Transfer Methods | partial | coat-on-the-ice; metal-feels-colder [review] (conduction only) | yes |
| 14.5 | m42228 | Conduction | covered | metal-feels-colder [review]; coat-on-the-ice | yes |
| 14.6 | m42229 | Convection | gap (textbook section; AP alignment unconfirmed) | convection: ADDED fan-cools-you-not-room | yes |
| 14.7 | m42230 | Radiation | gap (textbook section; AP alignment unconfirmed) | thermal radiation (candidate, not added) | yes |

### Ch 15. Thermodynamics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 15.0 | m55254 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 15.1 | m42232 | The First Law of Thermodynamics | gap (textbook section; AP alignment unconfirmed) | first law: work on a gas warms it, e.g. a tyre pump (candidate, demand 1; big-ideas energy-conserved is unbuilt) | yes |
| 15.2 | m42233 | The First Law of Thermodynamics and Some Simple Processes | gap (textbook section; AP alignment unconfirmed) | PV processes (demand 1) | yes |
| 15.3 | m42234 | Introduction to the Second Law of Thermodynamics: Heat Engines and Their Efficiency | partial | filament-vs-led-heat (efficiency of a device; heat-engine efficiency untaught) | yes |
| 15.4 | m42235 | Carnot’s Perfect Heat Engine: The Second Law of Thermodynamics Restated | gap (textbook section; AP alignment unconfirmed) | Carnot limit: ADDED heat-engine-limit | yes |
| 15.5 | m42236 | Applications of Thermodynamics: Heat Pumps and Refrigerators | gap (textbook section; AP alignment unconfirmed) | heat pumps and refrigerators: ADDED heat-pump-moves-heat | yes |
| 15.6 | m42237 | Entropy and the Second Law of Thermodynamics: Disorder and the Unavailability of Energy | other category | chemistry/why-gas-spreads (big-ideas entropy-arrow-of-time is unbuilt) | yes |
| 15.7 | m42238 | Statistical Interpretation of Entropy and the Second Law of Thermodynamics: The Underlying Explanation | other category | chemistry/why-gas-spreads | yes |

### Ch 16. Oscillatory Motion and Waves

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 16.0 | m55270 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 16.1 | m42240 | Hooke’s Law: Stress and Strain Revisited | covered | two-springs-end-to-end | yes |
| 16.2 | m42241 | Period and Frequency in Oscillations | partial | pendulum-period | yes |
| 16.3 | m42242 | Simple Harmonic Motion: A Special Periodic Motion | gap (textbook section; AP alignment unconfirmed) | spring period depends on mass, unlike a pendulum (candidate, not added) | yes |
| 16.4 | m42243 | The Simple Pendulum | covered | pendulum-period | yes |
| 16.5 | m42244 | Energy and the Simple Harmonic Oscillator | gap (textbook section; AP alignment unconfirmed) | energy in a simple harmonic oscillator (demand 1) | yes |
| 16.6 | m42245 | Uniform Circular Motion and Simple Harmonic Motion | gap (textbook section; AP alignment unconfirmed) | circular motion as SHM (demand 1) | yes |
| 16.7 | m42246 | Damped Harmonic Motion | gap (textbook section; AP alignment unconfirmed) | damping (demand 1) | yes |
| 16.8 | m42247 | Forced Oscillations and Resonance | covered | push-the-swing-in-time | yes |
| 16.9 | m42248 | Waves | covered | shake-faster-same-speed; duck-rides-the-wave | no |
| 16.10 | m42249 | Superposition and Interference | covered | two-ripples-cancel; press-the-string | no |
| 16.11 | m42250 | Energy in Waves: Intensity | partial | light-at-double-distance; duck-rides-the-wave | no |

### Ch 17. Physics of Hearing

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 17.0 | m55286 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 17.1 | m42255 | Sound | covered | sound-in-the-jar | no |
| 17.2 | m42256 | Speed of Sound, Frequency, and Wavelength | covered | count-the-thunder; shake-faster-same-speed | no |
| 17.3 | m42257 | Sound Intensity and Sound Level | covered | second-speaker-decibels [review] | no |
| 17.4 | m42712 | Doppler Effect and Sonic Booms | covered | ambulance-pitch-drop | no |
| 17.5 | m42296 | Sound Interference and Resonance: Standing Waves in Air Columns | partial | press-the-string (strings; air columns untaught) | no |
| 17.6 | m42297 | Hearing | gap (textbook section; AP alignment unconfirmed) | hearing | no |
| 17.7 | m42298 | Ultrasound | on map, briefed, unbuilt | echo-round-trip (#65 clap-at-the-cliff), unbuilt; ultrasound imaging itself untaught | no |

### Ch 18. Electric Charge and Electric Field

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 18.0 | m55297 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 18.1 | m42300 | Static Electricity and Charge: Conservation of Charge | gap (textbook section; AP alignment unconfirmed) | static charge, conservation of charge | no |
| 18.2 | m42306 | Conductors and Insulators | gap (textbook section; AP alignment unconfirmed) | conductors and insulators | no |
| 18.3 | m42317 | Conductors and Electric Fields in Static Equilibrium | gap (textbook section; AP alignment unconfirmed) | fields in conductors | no |
| 18.4 | m42308 | Coulomb’s Law | partial | light-at-double-distance (the inverse square, not Coulomb) | no |
| 18.5 | m42310 | Electric Field: Concept of a Field Revisited | gap (textbook section; AP alignment unconfirmed) | electric field | no |
| 18.6 | m42312 | Electric Field Lines: Multiple Charges | gap (textbook section; AP alignment unconfirmed) | field lines | no |
| 18.7 | m42315 | Electric Forces in Biology | gap (textbook section; AP alignment unconfirmed) | electric forces in biology | no |
| 18.8 | m42329 | Applications of Electrostatics | gap (textbook section; AP alignment unconfirmed) | applications of electrostatics | no |

### Ch 19. Electric Potential and Electric Field

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 19.0 | m55349 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 19.1 | m42324 | Electric Potential Energy: Potential Difference | covered | bird-on-the-wire [review] | no |
| 19.2 | m42326 | Electric Potential in a Uniform Electric Field | gap (textbook section; AP alignment unconfirmed) | potential in a uniform field | no |
| 19.3 | m42328 | Electrical Potential Due to a Point Charge | gap (textbook section; AP alignment unconfirmed) | potential of a point charge | no |
| 19.4 | m42331 | Equipotential Lines | gap (textbook section; AP alignment unconfirmed) | equipotentials | no |
| 19.5 | m42333 | Capacitors and Dielectrics | gap (textbook section; AP alignment unconfirmed) | capacitors | no |
| 19.6 | m42336 | Capacitors in Series and Parallel | gap (textbook section; AP alignment unconfirmed) | capacitors in series and parallel | no |
| 19.7 | m42395 | Energy Stored in Capacitors | gap (textbook section; AP alignment unconfirmed) | energy in capacitors | no |

### Ch 20. Electric Current, Resistance, and Ohm's Law

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 20.0 | m55354 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 20.1 | m42341 | Current | covered | current-same-around-loop; electron-speed-in-a-wire [review] | no |
| 20.2 | m42344 | Ohm’s Law: Resistance and Simple Circuits | partial | bird-on-the-wire [review]; wire-eight-times (no V = IR lesson) | no |
| 20.3 | m42346 | Resistance and Resistivity | covered | wire-eight-times | no |
| 20.4 | m42714 | Electric Power and Energy | covered | toaster-trips-breaker; kettle-vs-bulb-kwh | no |
| 20.5 | m42348 | Alternating Current versus Direct Current | on map, briefed, unbuilt | transmission-voltage-loss (#68 power-line-voltage-loss), unbuilt; AC vs DC itself untaught | no |
| 20.6 | m42350 | Electric Hazards and the Human Body | partial | bird-on-the-wire [review; safety record owed] | no |
| 20.7 | m42352 | Nerve Conduction–Electrocardiograms | gap (textbook section; AP alignment unconfirmed) | nerve conduction | no |

### Ch 21. Circuits and DC Instruments

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 21.0 | m55364 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 21.1 | m42356 | Resistors in Series and Parallel | covered | add-a-parallel-bulb | no |
| 21.2 | m42357 | Electromotive Force: Terminal Voltage | on map, briefed, unbuilt | cells-series-parallel (#64 two-batteries-side-by-side), unbuilt; internal resistance untaught | no |
| 21.3 | m42359 | Kirchhoff’s Rules | partial | current-same-around-loop; add-a-parallel-bulb | no |
| 21.4 | m42360 | DC Voltmeters and Ammeters | gap (textbook section; AP alignment unconfirmed) | voltmeters and ammeters | no |
| 21.5 | m42362 | Null Measurements | gap (textbook section; AP alignment unconfirmed) | null measurements | no |
| 21.6 | m42363 | DC Circuits Containing Resistors and Capacitors | gap (textbook section; AP alignment unconfirmed) | RC circuits | no |

### Ch 22. Magnetism

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 22.0 | m55372 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 22.1 | m42366 | Magnets | covered | snap-the-magnet [review] | no |
| 22.2 | m42368 | Ferromagnets and Electromagnets | gap (textbook section; AP alignment unconfirmed) | ferromagnets, electromagnets | no |
| 22.3 | m42370 | Magnetic Fields and Magnetic Field Lines | gap (textbook section; AP alignment unconfirmed) | field lines | no |
| 22.4 | m42372 | Magnetic Field Strength: Force on a Moving Charge in a Magnetic Field | gap (textbook section; AP alignment unconfirmed) | force on a moving charge | no |
| 22.5 | m42375 | Force on a Moving Charge in a Magnetic Field: Examples and Applications | gap (textbook section; AP alignment unconfirmed) | applications | no |
| 22.6 | m42377 | The Hall Effect | gap (textbook section; AP alignment unconfirmed) | Hall effect | no |
| 22.7 | m42398 | Magnetic Force on a Current-Carrying Conductor | gap (textbook section; AP alignment unconfirmed) | force on a current | no |
| 22.8 | m42380 | Torque on a Current Loop: Motors and Meters | gap (textbook section; AP alignment unconfirmed) | motors | no |
| 22.9 | m42382 | Magnetic Fields Produced by Currents: Ampere’s Law | gap (textbook section; AP alignment unconfirmed) | fields of currents | no |
| 22.10 | m42386 | Magnetic Force between Two Parallel Conductors | gap (textbook section; AP alignment unconfirmed) | parallel conductors | no |
| 22.11 | m42388 | More Applications of Magnetism | gap (textbook section; AP alignment unconfirmed) | applications of magnetism | no |

### Ch 23. Electromagnetic Induction, AC Circuits, and Electrical Technologies

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 23.0 | m55405 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 23.1 | m42390 | Induced Emf and Magnetic Flux | covered | magnet-still-in-coil | no |
| 23.2 | m42392 | Faraday’s Law of Induction: Lenz’s Law | covered | magnet-still-in-coil | no |
| 23.3 | m42400 | Motional Emf | gap (textbook section; AP alignment unconfirmed) | motional emf | no |
| 23.4 | m42404 | Eddy Currents and Magnetic Damping | gap (textbook section; AP alignment unconfirmed) | eddy currents | no |
| 23.5 | m42408 | Electric Generators | gap (textbook section; AP alignment unconfirmed) | generators | no |
| 23.6 | m42411 | Back Emf | gap (textbook section; AP alignment unconfirmed) | back emf | no |
| 23.7 | m42414 | Transformers | on map, briefed, unbuilt | transmission-voltage-loss (#68), unbuilt; transformer itself untaught | no |
| 23.8 | m42416 | Electrical Safety: Systems and Devices | partial | toaster-trips-breaker | no |
| 23.9 | m42420 | Inductance | gap (textbook section; AP alignment unconfirmed) | inductance | no |
| 23.10 | m42425 | RL Circuits | gap (textbook section; AP alignment unconfirmed) | RL circuits | no |
| 23.11 | m42427 | Reactance, Inductive and Capacitive | gap (textbook section; AP alignment unconfirmed) | reactance | no |
| 23.12 | m42431 | RLC Series AC Circuits | gap (textbook section; AP alignment unconfirmed) | RLC circuits | no |

### Ch 24. Electromagnetic Waves

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 24.0 | m55423 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 24.1 | m42437 | Maxwell’s Equations: Electromagnetic Waves Predicted and Observed | gap (textbook section; AP alignment unconfirmed) | Maxwell | no |
| 24.2 | m42440 | Production of Electromagnetic Waves | gap (textbook section; AP alignment unconfirmed) | production of EM waves | no |
| 24.3 | m42444 | The Electromagnetic Spectrum | gap (textbook section; AP alignment unconfirmed) | EM spectrum | no |
| 24.4 | m42446 | Energy in Electromagnetic Waves | partial | light-at-double-distance | no |

### Ch 25. Geometric Optics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 25.0 | m55436 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 25.1 | m42452 | The Ray Aspect of Light | covered | pinhole-flips-the-world | no |
| 25.2 | m42456 | The Law of Reflection | covered | mirror-half-height | no |
| 25.3 | m42459 | The Law of Refraction | covered | lifeguard-fastest-path | no |
| 25.4 | m42462 | Total Internal Reflection | covered | torch-underwater-tilt | no |
| 25.5 | m42466 | Dispersion: The Rainbow and Prisms | gap (textbook section; AP alignment unconfirmed) | dispersion, rainbows | no |
| 25.6 | m42470 | Image Formation by Lenses | on map, briefed, unbuilt | lens-whole-image (#69 cover-half-the-lens), unbuilt; image position untaught | no |
| 25.7 | m42474 | Image Formation by Mirrors | partial | mirror-half-height (plane mirror only) | no |

### Ch 26. Vision and Optical Instruments

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 26.0 | m55444 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 26.1 | m42482 | Physics of the Eye | gap (textbook section; AP alignment unconfirmed) | the eye | no |
| 26.2 | m42484 | Vision Correction | gap (textbook section; AP alignment unconfirmed) | vision correction | no |
| 26.3 | m42487 | Color and Color Vision | covered | red-apple-green-light; also cs/light-adds-to-yellow | no |
| 26.4 | m42491 | Microscopes | gap (textbook section; AP alignment unconfirmed) | microscopes | no |
| 26.5 | m42493 | Telescopes | gap (textbook section; AP alignment unconfirmed) | telescopes | no |
| 26.6 | m42292 | Aberrations | gap (textbook section; AP alignment unconfirmed) | aberrations | no |

### Ch 27. Wave Optics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 27.0 | m55362 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 27.1 | m42501 | The Wave Aspect of Light: Interference | partial | two-ripples-cancel (water waves) | no |
| 27.2 | m42505 | Huygens's Principle: Diffraction | gap (textbook section; AP alignment unconfirmed) | diffraction | no |
| 27.3 | m42508 | Young’s Double Slit Experiment | partial | two-ripples-cancel | no |
| 27.4 | m42512 | Multiple Slit Diffraction | gap (textbook section; AP alignment unconfirmed) | gratings | no |
| 27.5 | m42515 | Single Slit Diffraction | gap (textbook section; AP alignment unconfirmed) | single slit | no |
| 27.6 | m42517 | Limits of Resolution: The Rayleigh Criterion | gap (textbook section; AP alignment unconfirmed) | resolution limit | no |
| 27.7 | m42519 | Thin Film Interference | gap (textbook section; AP alignment unconfirmed) | thin films | no |
| 27.8 | m42522 | Polarization | on map, briefed, unbuilt | polariser-third-filter (#70 third-polariser), unbuilt | no |
| 27.9 | m42290 | *Extended Topic* Microscopy Enhanced by the Wave Characteristics of Light | gap (textbook section; AP alignment unconfirmed) | microscopy | no |

### Ch 28. Special Relativity

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 28.0 | m55094 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 28.1 | m42528 | Einstein’s Postulates | gap (textbook section; AP alignment unconfirmed) | postulates | no |
| 28.2 | m42531 | Simultaneity And Time Dilation | gap (textbook section; AP alignment unconfirmed) | time dilation | no |
| 28.3 | m42535 | Length Contraction | gap (textbook section; AP alignment unconfirmed) | length contraction | no |
| 28.4 | m42540 | Relativistic Addition of Velocities | gap (textbook section; AP alignment unconfirmed) | velocity addition | no |
| 28.5 | m42542 | Relativistic Momentum | gap (textbook section; AP alignment unconfirmed) | relativistic momentum | no |
| 28.6 | m42546 | Relativistic Energy | gap (textbook section; AP alignment unconfirmed) | E = mc^2 (nearest chemistry/one-gram-two-fires) | no |

### Ch 29. Quantum Physics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 29.0 | m55065 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 29.1 | m42554 | Quantization of Energy | gap (textbook section; AP alignment unconfirmed) | quantisation | no |
| 29.2 | m42558 | The Photoelectric Effect | gap (textbook section; AP alignment unconfirmed) | photoelectric effect | no |
| 29.3 | m42563 | Photon Energies and the Electromagnetic Spectrum | gap (textbook section; AP alignment unconfirmed) | photon energies | no |
| 29.4 | m42568 | Photon Momentum | gap (textbook section; AP alignment unconfirmed) | photon momentum | no |
| 29.5 | m42573 | The Particle-Wave Duality | gap (textbook section; AP alignment unconfirmed) | wave-particle duality | no |
| 29.6 | m42576 | The Wave Nature of Matter | gap (textbook section; AP alignment unconfirmed) | matter waves | no |
| 29.7 | m42579 | Probability: The Heisenberg Uncertainty Principle | gap (textbook section; AP alignment unconfirmed) | uncertainty | no |
| 29.8 | m42581 | The Particle-Wave Duality Reviewed | gap (textbook section; AP alignment unconfirmed) | duality reviewed | no |

### Ch 30. Atomic Physics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 30.0 | m54988 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 30.1 | m42589 | Discovery of the Atom | other category | chemistry/atoms-across-a-hair; chemistry/molecules-in-one-drop | no |
| 30.2 | m42592 | Discovery of the Parts of the Atom: Electrons and Nuclei | gap (textbook section; AP alignment unconfirmed) | electrons and nuclei (big-ideas atom-mostly-empty is unbuilt) | no |
| 30.3 | m42596 | Bohr’s Theory of the Hydrogen Atom | gap (textbook section; AP alignment unconfirmed) | Bohr model (chemistry emission-spectra is unbuilt) | no |
| 30.4 | m42599 | X Rays: Atomic Origins and Applications | gap (textbook section; AP alignment unconfirmed) | X rays | no |
| 30.5 | m42602 | Applications of Atomic Excitations and De-Excitations | gap (textbook section; AP alignment unconfirmed) | atomic excitations | no |
| 30.6 | m42606 | The Wave Nature of Matter Causes Quantization | gap (textbook section; AP alignment unconfirmed) | quantisation from waves | no |
| 30.7 | m42609 | Patterns in Spectra Reveal More Quantization | gap (textbook section; AP alignment unconfirmed) | spectra patterns | no |
| 30.8 | m42614 | Quantum Numbers and Rules | gap (textbook section; AP alignment unconfirmed) | quantum numbers | no |
| 30.9 | m42618 | The Pauli Exclusion Principle | gap (textbook section; AP alignment unconfirmed) | Pauli exclusion | no |

### Ch 31. Radioactivity and Nuclear Physics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 31.0 | m54911 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 31.1 | m42623 | Nuclear Radioactivity | other category | chemistry/paper-stops-alpha | no |
| 31.2 | m42627 | Radiation Detection and Detectors | gap (textbook section; AP alignment unconfirmed) | radiation detectors | no |
| 31.3 | m42631 | Substructure of the Nucleus | other category | chemistry/no-atom-weighs-35-45 | no |
| 31.4 | m42633 | Nuclear Decay and Conservation Laws | gap (textbook section; AP alignment unconfirmed) | decay conservation laws | no |
| 31.5 | m42636 | Half-Life and Activity | other category | chemistry/half-life | no |
| 31.6 | m42640 | Binding Energy | partial | chemistry/one-gram-two-fires (scale of nuclear energy; binding energy untaught) | no |
| 31.7 | m42644 | Tunneling | gap (textbook section; AP alignment unconfirmed) | tunnelling | no |

### Ch 32. Medical Applications of Nuclear Physics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 32.0 | m54880 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 32.1 | m42649 | Diagnostics and Medical Imaging | gap (textbook section; AP alignment unconfirmed) | medical imaging | no |
| 32.2 | m42652 | Biological Effects of Ionizing Radiation | gap (textbook section; AP alignment unconfirmed) | biological effects of radiation | no |
| 32.3 | m42654 | Therapeutic Uses of Ionizing Radiation | gap (textbook section; AP alignment unconfirmed) | radiotherapy | no |
| 32.4 | m42656 | Food Irradiation | gap (textbook section; AP alignment unconfirmed) | food irradiation | no |
| 32.5 | m42659 | Fusion | partial | chemistry/one-gram-two-fires | no |
| 32.6 | m42662 | Fission | partial | chemistry/one-gram-two-fires | no |
| 32.7 | m42665 | Nuclear Weapons | gap (textbook section; AP alignment unconfirmed) | nuclear weapons | no |

### Ch 33. Particle Physics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 33.0 | m54854 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 33.1 | m42669 | The Yukawa Particle and the Heisenberg Uncertainty Principle Revisited | gap (textbook section; AP alignment unconfirmed) | Yukawa | no |
| 33.2 | m42671 | The Four Basic Forces | gap (textbook section; AP alignment unconfirmed) | four forces | no |
| 33.3 | m42718 | Accelerators Create Matter from Energy | gap (textbook section; AP alignment unconfirmed) | accelerators | no |
| 33.4 | m42674 | Particles, Patterns, and Conservation Laws | gap (textbook section; AP alignment unconfirmed) | conservation laws | no |
| 33.5 | m42678 | Quarks: Is That All There Is? | gap (textbook section; AP alignment unconfirmed) | quarks | no |
| 33.6 | m42680 | GUTs: The Unification of Forces | gap (textbook section; AP alignment unconfirmed) | GUTs | no |

### Ch 34. Frontiers of Physics

| Sec | Module | Title | Status | Lesson or note | In focus |
|---|---|---|---|---|---|
| 34.0 | m54824 | Connection for AP® Courses | n/a | chapter intro (AP connection), no concept | - |
| 34.1 | m42686 | Cosmology and Particle Physics | gap (textbook section; AP alignment unconfirmed) | cosmology (big-ideas expanding-universe is unbuilt) | no |
| 34.2 | m42689 | General Relativity and Quantum Gravity | gap (textbook section; AP alignment unconfirmed) | general relativity | no |
| 34.3 | m42691 | Superstrings | gap (textbook section; AP alignment unconfirmed) | superstrings | no |
| 34.4 | m42692 | Dark Matter and Closure | gap (textbook section; AP alignment unconfirmed) | dark matter | no |
| 34.5 | m42694 | Complexity and Chaos | other category | big-ideas/one-ten-thousandth-apart | no |
| 34.6 | m42696 | High-temperature Superconductors | gap (textbook section; AP alignment unconfirmed) | superconductors | no |
| 34.7 | m42704 | Some Questions We Know to Ask | n/a | open questions, no concept | no |

## Concepts added to `content/curriculum/physics.json` (unbuilt, so coverage shows them as unmet)

Test (brief B1): the concept is in focus, and I would rank it demand 2 or more **without** the exam-prep vertical. Twelve passed (1 at demand 3, 11 at demand 2). That is more than 8, so the stop-if applies: I added the top 8 by demand. The demand-2 tie-break is mine. It favours an everyday misconception that a number can refute, with no nearby lesson on disk. The other four are listed below for op-planning. None of these is a brief yet. A brief comes only in a later round, and lane 10 checks its lesson at build time.

| Concept id | Demand | Section | Reason (one line) |
|---|---|---|---|
| heat-pump-moves-heat | 3 | 15.5 | "More than 100% efficient" sounds impossible to most adults, and heat pumps are a live household purchase. COP = Q_hot / W (ideal Th / (Th - Tc)) is a clean equation with units, and filament-vs-led-heat only covers devices that make heat, not ones that move it. |
| average-speed-round-trip | 2 | 2.3 | 30 km/h out and 60 km/h back averages 40, not 45. This classic everyday arithmetic error, v_avg = total distance / total time, has no lesson on disk. |
| motion-graph-slope | 2 | 2.8 | Learners read a position-time graph as a picture of the route. The slope-as-speed idea has its prerequisite on the math map (math:slope-as-rate), but no physics lesson uses it. |
| tipping-base-of-support | 2 | 9.3 | Things tip only when the centre of mass passes outside the base (leaning stacks, tall vans). build-a-balanced-mobile teaches where the balance point is, but not when something falls. |
| taut-rope-never-straight | 2 | 9.1 (partial) | People expect a hard enough pull to make a loaded washing line straight. T = W / (2 sin theta) grows without limit as the sag goes to zero. tug-of-war-scale and two-tugs-right-angle stop short of this. |
| heat-engine-limit | 2 | 15.4 | Most of a car engine's fuel energy leaves as heat, and that is a limit, not a defect: efficiency is at most 1 - Tc / Th, with temperatures in kelvin. It is distinct from filament-vs-led-heat, because a bulb has no Carnot limit. |
| fan-cools-you-not-room | 2 | 14.6 | People think a fan cools the air. It cools skin by convection (P = hA delta-T, with h rising with air speed) while its motor adds heat to the room. It is the only convection concept, and convection is one of the three transfer modes, of which only conduction is taught. |
| muscle-lever-force | 2 | 9.6 | The biceps pulls about 7-8 times the weight in the hand (short-arm lever). It turns seesaw-sit-closer's torque rule around: the body gives up force to gain speed. |

**Qualified but not added (op-planning to rank; they stay here until W-582 is answered):**

| Candidate | Demand | Section | Why it is below the line |
|---|---|---|---|
| rotation-outer-faster (v = r omega, carousel horse) | 2 | 6.1 | Real, but tied with the 8 above and less everyday than they are. |
| body-efficiency-food-energy (10 floors cost about one biscuit of work, times ~4 for muscle waste) | 2 | 7.8 | Food-energy figures need careful sourcing (kcal vs kJ, efficiency ranges). Its brief would need a source plan first. |
| thermal-radiation (heat travels as light; dark surfaces absorb and emit more) | 2 | 14.7 | The second missing transfer mode. I ranked it after convection because the obvious lesson (black car in sun) is weaker as a misconception. |
| spring-period-mass (a heavier mass on a spring is slower; on a pendulum it is not) | 2 | 16.3 | Sits close to pendulum-period. It needs a distinctness line against that lesson before it is ranked. |

**In-focus gaps ranked demand 1 (map only):** 2.1 displacement, 7.4 spring energy (overlaps doubling-speed-braking's squared law), 8.6 glancing collisions, 10.1-10.2 rotational kinematics, 10.6 extended-body collisions, 10.7 gyroscopes (contested sourcing), 15.1 work heats a gas, 15.2 PV processes, 16.5-16.7 oscillator energy, circular-SHM link and damping. Also 6.4 Coriolis (partial; the sink-drain myth is attractive, but the effect is tiny at sink scale and hard to show honestly in 60 s).

**Out-of-focus gaps worth noting for a later map pass** (no demand set; the focus rule holds them): 12.1 continuity (hose nozzle), 13.2 thermal expansion, 18.1-18.2 static charge and conductors, 19.5 capacitors, 22.2 electromagnets, 22.8 motors, 23.5 generators, 25.5 rainbows, 26.1-26.2 the eye and glasses. Electricity and magnetism is the largest block: 35 of the 106 out-of-focus gaps (Ch 18-23).

## Caveats

- No learner evidence is behind any demand number here. Demand is my ranking. The syllabus shows that a textbook teaches the topic. It is not evidence that people want our format. Simulated reviews are gate inputs, not learning evidence.
- I judged "covered" from concept tags and lesson names. I did not re-walk the lessons. A published lesson can be weaker than its tag suggests, and the reviews are where that shows.
- Overlap check: `node tools/overlap.mjs` (2026-10-16) flags one physics pair, chemistry/twice-as-hot-not-twice-as-fast and physics/doubling-speed-braking (0.29, cross-category). No added concept is on that pair.
