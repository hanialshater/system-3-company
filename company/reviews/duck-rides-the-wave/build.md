# Build note: duck-rides-the-wave

Builder: demo-builder (wave-j-physics), 2026-10-14. Brief: `company/domains/briefs/physics.md` round 4, #58. Status draft; every claim unverified.

Built as briefed: one sea band (2.45 px per m across, heights 80 px per m), the leading crest tinted, a ruler to 100 m, a buoy at 100 m, and an inset on the duck that draws its own path magnified (90 px per m). The duck's path is integrated exactly as in check.mjs (1 ms steps): loop 0.19 m across in the first wave (shown "0.2 m"), drift 0.147 m after 10 waves (shown "0.15 m"). Each preset replays its simulated span in 400 ms. Title and hook written here ("Does the wave carry the duck?" / "Waves roll in for 40 seconds under a floating duck. Where does it end up?").

**Objection (physics), W-581, owner cm-physics.** The brief's buoy milestone uses the crest speed: 100 m / 6.25 m/s = 16 s. In deep water the front of a wave train, and the energy it carries, move at the group speed, half the crest speed (3.1 m/s), so a buoy 100 m away would start to bob at about 32 s. The reveal's sentence "began to bob at 16 s: the wave carried energy there" therefore times the energy at the wrong speed. I built the brief's number (the stage draws the front moving at the crest speed) and wrote the objection into claim c4 so the fact-checker sees it. If cm-physics rules for 32 s, the change is one constant (front speed C / 2) plus the brief's text; the 40 s span still covers it.

## Pre-flight v1

1. **Title and hook.** "Does the wave carry the duck?" / "Waves roll in for 40 seconds under a floating duck. Where does it end up?" Asks, does not answer.
2. **Options.** "Carried along with the crests", "Close to where it started", "Pulled back against the waves": none numbered.
3. **Locked stage.** Calm flat sea, duck, empty inset labelled "duck's path", buoy, ruler 0-100 m. No trace, no distances.
4. **Reveal values.** "0.2 m" loop: milestone one-wave (Seen row). "25 m" crest per wave: constant C x PERIOD, shown as the one-wave label. "250 m" and "0.15 m": milestone ten-waves (Seen row "10 waves: duck 0.15 m, crests 250 m"). "16 s": milestone buoy (Seen row). "100 m": the ruler.
5. **QA path.** DOM order: 1 wave passes (one-wave), 10 waves pass (ten-waves, the question's case), Watch the buoy (buoy). Three presses reach all three. At the reveal the buoy frame (t = 16 s, label "buoy starts to bob at 16 s") and the full Seen row are on the stage.
6. **Reset.** No Reset; the Seen row is never cleared. Reveal from the QA path: "During one wave your duck went round a loop about 0.2 m across and came back, while the crest moved on 25 m. After ten waves the crests had travelled 250 m and your duck had shifted only about 0.15 m. The buoy 100 m away began to bob at 16 s: the wave carried energy there, not water. Each bit of water just circles and hands the motion on. Near the shore, where waves break, the water does rush forward."
