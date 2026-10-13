# Fact-check: flour-on-the-moon, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c7+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Weight is mass times the local gravity, W = m g; a 1 kg bag weighs 9.8... | verified | W = m g: 9.81 N on Earth, 1.62 N on the Moon (Moon 1.62 agrees with NASA). |
| c2 Surface gravity: Earth 9.81, Moon 1.62, Mars 3.71 and Jupiter 24.79 m/... | DISPUTED | DISPUTED on the source, not on the physics. The source field says the four values (Earth 9.8/9.81, Moon 1.62, Mars 3.71, Jupiter 24.79) are from the NASA Goddard Planetary Fact Sheet. Searching (the NASA host was not reachable from this sandbox, so via search summaries of the sheet): NASA lists Mars mean surface gravity 3.73 (equatorial 3.69), and Jupiter at 1 bar 25.92 mean, 23.12 equatorial, 27.01 polar. 24.79 is the ESA / Wikipedia figure; 3.71 is a figure from other references (e.g. Cambridge Atlas of Mars). My own GM/R^2 check: Earth 9.82, Moon 1.62, Mars 3.73, Jupiter 25.92 (mean radius 69,911 km, no rotation; about 22.6 to 23.1 at the equator once rotation is subtracted). None of these gives 24.79, which sits between the equatorial and mean figures. So the values are within the published range (Mars 3.69-3.73, Jupiter 23.1-27.0 depending on convention and latitude) but the cited source does not contain the numbers shown. Fix: re-cite (ESA for 24.79; a source for 3.71), or use NASA's own figures (Mars 3.73) and say which convention Jupiter's is. |
| c3 A spring scale measures the pull of gravity (a force), so its reading ... | verified | Hooke: spring stretch proportional to weight; balance compares masses in the same g so g cancels. Standard. |
| c4 Mass, how much stuff there is, stays 1 kg anywhere. | verified | Mass invariant under change of place in Newtonian physics. The SI Brochure citation is loose (the kilogram's definition via the Planck constant does not itself state location independence), but the statement is true and standard. |
| c5 A bathroom scale is a spring scale: on the Moon it would read about a ... | verified | 1.62/9.81 = 0.165, about one sixth; a bathroom scale is a spring or strain-gauge force sensor calibrated in kg for Earth g. |
| c6 Gravity at the Moon's surface is about a sixth of Earth's. | verified | 1.62/9.81 = 0.1651; 1/6 = 0.1667. Moon gravity 1.62 is NASA's own figure. |

Disputed: c2. Withdrawn: none.

Recall (70 kg astronaut on Mars still 70 kg) correct. Nothing else on the stage is a number beyond c2 and c1. The "Jupiter has no solid surface" caveat is in the claim text and is correct.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

1. Source for the Mars (3.71) and Jupiter (24.79) gravity values: the trust sheet cites the NASA Planetary Fact Sheet, which lists Mars 3.73 and Jupiter 25.92/23.12/27.01 depending on convention. Re-cite to a source that shows these figures (ESA for 24.79) or change to the NASA figures, and name Jupiter's convention (1 bar, which latitude).

## Result
5 verified, 1 disputed, 0 added unverified.

## Pass 3 (2026-10-13)

c2 stays disputed (source field unchanged). Re-checked by search: NASA's planetary fact sheet table lists gravity (m/s2) Earth 9.8, Moon 1.6, Mars 3.7, Jupiter 23.1 (equatorial, 1 bar, rotation included); 24.79 is not in that table. Re-cite (ESA/other for 24.79) or use NASA's figures and name the convention.

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c2 | verified | Surface gravity: Earth 9.81, Moon 1.62, Mars 3.73 and Jupiter 23.12 m/s^2 (Jupiter has no ... | NASA NSSDC fact sheets via search (direct fetch blocked): Jupiter equatorial gravity at 1 bar 23.12 (mean 25.92, polar 27.01); Mars mean 3.73 (equatorial 3.69); Moon 1.62; Earth standard 9.80665 shown 9.81. Note ESA/Wikipedia give 24.79 for Jupiter at 1 bar, a different reference; 23.12 is the NASA equatorial figure and is labelled as such. |
| c5 | verified | A bathroom scale is a spring scale marked in kg for Earth: on the Moon it shows about a si... | Bathroom scales measure force (spring or strain-gauge load cell) and are calibrated in kg for Earth; 1.62/9.81 = 0.165, about a sixth. 'Is a spring scale' is loose for strain-gauge scales but the behaviour claimed holds for both. |
| c7 | verified | A spring scale marked in kg for Earth's gravity shows a 1 kg bag as 0.17 kg on the Moon, 0... | Node: g/9.81 = 0.165, 0.380, 2.357 -> 0.17, 0.38, 2.36 kg and 17%, 38%, 236%; matches Demo.tsx toFixed(2) and pct. NASA ratio to Earth for Jupiter 2.364 (eq.) is consistent. |

## Result (pass 4)
3 verified, 0 disputed, 0 left unverified, 0 added unverified.
