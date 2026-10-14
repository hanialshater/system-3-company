# Build notes: eratosthenes-shadow

## v1 (2026-10-13, wave 2)
- Not a map: a cross-section of the Earth with parallel sunlight, a well at Syene and a pole at Alexandria. I chose this over the brief's orthographic globe because the payoff (the shadow angle equals the centre angle) is only visible in cross-section. Angles are drawn true; the well and the pole are not to scale (labelled on the stage).
- Brief answer holds: 360 / 7.2 = 50. Tick marks around the circle draw floor(360 / angle) copies of the arc, so at 7.2 the learner sees 50.
- Modern numbers are computed in the page: latitude difference 31.20 - 24.09 = 7.11; distance by geoDistance x 6,371.0088 = 843 km; 42,684 km (the reveal rounds to 42,700), 7% over the 40,008 km meridian. Matches the brief.
- Key state: the shadow at 7.2 degrees, with 50 arcs counted. One milestone, "account". The "The account: 7.2°" chip is first in DOM order.
- Locked: the arcs and circumference readouts show "?". The start angle is 20 degrees (18 arcs).
- The brief's caveat 4 (Syene is about 0.65 degrees north of the Tropic) is covered by "as the account tells it". The stage makes no modern claim about the well.
- Iteration: on the phone, "Alexandria" sat on the ticks and the caption overlapped the bottom of the circle. I shrank the circle (R 82 to 74), moved it up, and put the label beside the pole top.

## v2 (2026-10-14, answering 2026-10-14-learner-round-earth-360-r6.md)
- Two milestones now, `account` (shadow exactly 7.20° in account mode) and `modern` (exactly 7.11° in modern mode); minInteractions 2. Each records a row on a new stage line "Seen: 7.2° → 50 arcs, 250,000 stadia · 7.11° → 50.6 arcs, 42,684 km". The reveal quotes those rows, so the quoted states stay on the stage when the reveal opens (finding 1).
- The reveal no longer says "about 42,700 km"; it uses the readout's rounding, 42,684 km (finding 2). Claim c3 text changed and is unverified.
- The angle at the centre is drawn on a radius-30 arc (was 18) and both angle labels are 12 px (were 10) so the 7.2° wedge is visible on a phone (finding 3). Not checked on a phone: I was told not to run a build or QA.
- Syene's label now reads "Syene: Sun overhead, no shadow", and the reveal says it (finding 4). New claim c5, unverified.
- No Reset control exists in this lesson; the Seen rows cannot be cleared by any control.

## Pre-flight v2
1. Title and hook: "Measure the Earth with a shadow" / "Over 2,000 years ago someone sized the whole planet with a stick and a walk. How?" No option can be guessed from them.
2. Options: "7 times" / "50 times" / "360 times". All numbered, same precision.
3. Locked stage: shadow 20.00°, 20.0° at the centre, 18 ticks, readouts "?", Seen "nothing yet". Nothing drawn says 50.
4. Reveal values: 50 (answer); "7.2° → 50 arcs, 250,000 stadia" (b) milestone `account`, Seen row; "7.11° → 50.6 arcs, 42,684 km" (b) milestone `modern`, Seen row; 7% and 40,008 km are told context (claim c3), not presented as seen.
5. QA path: account chip (reaches `account`), modern chip (reaches `modern`), slider two presses (7.13°). Both milestones reached; both Seen rows still on the stage at reveal.
6. Reset: there is no Reset control. After the QA path the reveal reads: "50 times. The Sun is so far away that its rays arrive parallel (the dashed lines), so the shadow's angle in Alexandria is also the angle at the Earth's centre. At Syene the Sun was straight overhead, so the well had no shadow. You saw 7.2° → 50 arcs, 250,000 stadia: 50 × 5,000 stadia, as the account tells it. / With modern numbers you saw 7.11° → 50.6 arcs, 42,684 km, within 7% of the true 40,008 km. Nobody knows the exact length of a stadion, so we cannot say how close Eratosthenes was in km. The method needed only a shadow and a distance." (Composed from the code, not from a run.)
