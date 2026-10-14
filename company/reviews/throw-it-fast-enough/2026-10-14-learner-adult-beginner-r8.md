*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): throw-it-fast-enough
lesson version: v6 (meta.json version 6)
boundary: adult-beginner. Knows balls fall back, faster throws land further, Earth is round, m/s and km/s; does not know that an orbit is falling around a curved planet, or circular orbit speed √(gR) (meta.json learner field, same tag as r5–r7).
Screenshots seen: yes (artifacts/walkthroughs/throw-it-fast-enough/sheet.png, build 5, 5 frames)
Verdict: revise

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("About 790 m/s").

1. **No answer before the commit: met.** Options "About 790 m/s / 7.9 km/s / 79 km/s", same form, a factor of 10 apart. Locked stage: planet, peak, "No air. 10 km peak. Heights ×40.", slider "Throw speed ?", "LANDS ?". No number.
2. **Speed is shown on every throw (r7 top finding fixed).** After the commit the slider reads 7.6 / 7.85 / 7.9 km/s and LANDS reads "1,269 km away", "3,209 km away", "never: back round in 85 min". "How hard" is now tied to "how far".
3. **Shows the why: met.** The first-minute caption ("fell 17.6 km below the dashed line; the ground curved away 16.3 / 17.4 / 17.6 km") plus the "1 min" marker and dashed straight line at the peak make "falling as fast as the ground curves away" a pair of numbers I can watch converge. At 7.9 the green orbit ring closes.
4. **The reveal quotes what I saw: met.** 85 min, 7.85 km/s, 3,209 km, 17.6 km fall, 17.4 vs 17.6 km curve all match the caption, readout and fastest-landing line that are on screen in 05-reveal.
5. **Fit fails.** The reveal is 118 words (> 90 on a new version, v6), including the grey context "No air, round non-spinning Earth. The ISS orbits at about 7.7 km/s, 400 km up." In 05-reveal the stage top is cropped: the top of the planet with the peak, the "1 min" marker and the dashed straight line are above the screen, while the reveal says "fell 17.6 km below the dashed straight line". The caption carries the numbers; the picture they describe is off screen.
6. **Labels at the reveal are unreadable (kit, W-287).** The planet is shrunk; "No air. 10 km peak. Heights ×40." under it is about 3 px. The locked frame also draws the planet small with a ~4 px header. Kit finding W-287, not a lesson revise.
7. My guess (790 m/s): the QA path starts at 7.6 km/s and never visits it, so on this path the learner's own wrong answer is not shown landing. Not a rule failure; whether the slider reaches 0.79 km/s is not visible on this path (build.md v6, read afterwards, says it does).

Where understanding first broke: "Heights ×40" — as a beginner I did not know why the peak and arc look so tall; the caption is unreadable in the locked frame. After the first throw the first-minute caption carried me.

## After reading build.md (v5, v6 and Pre-flights)

v5 added speeds on every throw and stops past 7.9 (9.0 and 79 km/s); v6 gated the "both fell 17.6 km" sentence on a shown first-minute record. Both match what I saw. Build.md lists the reveal-frame planet crop as "kit phone-scroll fix in progress, not worked around". The fit rule puts the crop on the lesson (cut told context, fold stage text, merge control rows), so I count it here; only the label shrink is the kit's.

**Top finding (revise, reveal fits with its picture):** reveal 118 words on v6 (> 90), and at 390×844 the peak, "1 min" marker and dashed straight line the reveal points at are off screen. Cut told context (category manager picks; the grey "No air ... ISS" note is a candidate, "No air" is already in the stage header) and fold stage text (first-minute caption and fastest-landing line) so the planet top and the reveal's last line are both on screen. Label shrink is kit W-287.

| r7 finding | Status |
|---|---|
| Top: speed hidden on landing throws | fixed |
| Slider top was exactly 7.9; 79 km/s untestable | fixed (stops at 9.0 and 79 km/s) |
| "1 min" overlapped header | fixed (header below planet) |
| Planet cropped at reveal | not fixed (builder deferred to kit; counted here) |
