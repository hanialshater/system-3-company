# Build note: coaster-track-shape

builder: demo-builder · 2026-10-12 · for evaluators to read after their findings

- Design intent: ramp length (steep to gentle) and curve sliders; every change races the new track against the last one (dashed). Motion is computed piece by piece from Newton's second law on 240 straight pieces, so 9.90 m/s emerges rather than being plugged in (cross-checked with RK4).
- Earned reveal: needs two track changes, and each track's bottom speed and time are shown as soon as it is chosen.
- After screenshots: first build hid results until the cart arrived, and QA reached the reveal with every readout still '?' while the reveal quoted 9.90 m/s. Results now show on change; the reveal quotes the learner's own last two times; speed labels moved below the floor so they do not sit on the track.

## v2 (revision 2026-10-13)

Findings from 2026-10-13-learner-adult-beginner.md (revise); the fact-check routed nothing.

- "Steep" and "gentle" did not map to a control ("Ramp length" reads as "bigger"): the slider is now "Slope", shown in degrees (59° down to 14°), starting at the steepest. New claim c6 (unverified) records the angles.
- Two unlabelled speed numbers stacked on the floor: removed. The readouts are labelled "Steep ramp: bottom speed, time" and "Your track: bottom speed, time".
- Solid vs dashed gap tiny by the last step (the dashed track was "last track", one slider step away): the dashed track is now a fixed reference, the steep straight ramp, so after the QA path (slope 59° -> 45° -> 32°, then curve straight -> arches a bit -> arches more) the two tracks differ visibly. The svg was also cropped to the 5 m band so the figure fills the panel.
- "Bulges high" odd, and nothing said the cart can't rise above its start: curves renamed "arches a bit / arches more"; the predict caption says "Both drop 5 m" (the track shape keeps every track at or below the start; code comment records why).
- "Faster" means both speed and time: title is now "Which ramp ends with more speed?", hook "...Does a steeper or curvier ride end with more speed?", and the reveal names the difference ("arriving sooner is not arriving faster").
- "Worked out piece by piece from gravity alone" was builder talk; v = √(2gh) undefined: both removed or glossed. The reveal says g = 9.81 m/s² (gravity) and h = 5 m (new claim c7, unverified).
- "Height becomes speed" was not on the stage: during each race both carts carry a live speed label, which climbs as the cart drops and reads 9.90 on the floor. The "steep pieces speed it up hard but briefly" sentence was not visible on the stage, so I removed it from the reveal (claim c3 stays in meta.json, its text unchanged).
- 75S chip: durationSec set to 60.
- Gate: now <Milestones> "gentle" (any slope gentler than the reference) and "curved" (any non-straight curve), both reached on the QA path.
