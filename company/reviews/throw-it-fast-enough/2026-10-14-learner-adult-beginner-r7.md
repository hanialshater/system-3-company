*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): throw-it-fast-enough
lesson version: v4
boundary: adult-beginner. Knows balls fall back, faster throws land further, Earth is round, speeds in m/s and km/s; has never seen that an orbit is falling round a curved planet, or the speed √(gR) (meta.json learner field, same boundary as r6).
Screenshots seen: yes (artifacts/walkthroughs/throw-it-fast-enough/sheet.png, build 4 at :3480)
Verdict: revise

## Findings (written from the walkthrough, before the brief or the previous review)

Walked the phone transcript and sheet.png (5 frames). Chose option 1 ("About 790 m/s").

1. **The prediction is a real bet.** Options 790 m/s, 7.9 km/s, 79 km/s are all "About" plus a number, a factor of 10 apart. The locked stage shows a planet, a peak and a slider with speed "?". Nothing points at 7.9. Met: no answer before the commit.
2. **While I explore, the throw speed still reads "?".** After "Slower" and after moving the slider, the readout says "Throw speed ?" while the ball lands 1,269 km and then 3,209 km away. Only when the ball orbits does the speed appear (7.9 km/s), and only then does the "fastest landing" line name 7.85 km/s. So during the landings I cannot connect "how hard" to "how far": the question is about speed, and the speed is hidden during the part where I am supposed to be finding it. The reveal says "your fastest landing, at 7.85 km/s", a speed I never saw on the dial for that throw.
3. **The why is carried by the readout, not the picture.** The caption "First minute: fell 17.6 km below the dashed line; the ground curved away 16.3 / 17.4 / 17.6 km" is the argument, and it is good: the fall is always 17.6, and only the ground changes. But on the phone the dashed straight line and the drop are a tiny red tick at the top of the planet, overlapping the "1 min" label and the "Heights ×40" header. I could not see "fell below the dashed line" in the drawing; I read it in the text. The green ring when it orbits is clear.
4. **The reveal quotes what I saw.** 7.9 km/s, 85 minutes, 3,209 km, 17.6 vs 17.4 and 17.6 vs 17.6 are on the stage when the reveal opens (readout and the "your fastest landing" line). 7.85 km/s is visible only in that line, after the fact (see finding 2). About 110 words.
5. **The idea lands.** "The ball was falling the whole time... What changed was the ground" is supported by the three numbers I watched. √(gR) and the ISS line are told context.

Where understanding first broke: at the first throw, where "Throw speed ?" stayed hidden while the ball landed, so I did not know how fast I had thrown.

## After reading the brief and the r6 review

doesNotKnow item 1 ("an orbit is falling round a curved planet") is now stood for on the stage by the fell / curved-away readout across three throws, two that land and one that orbits; the reveal points at it. Show the why: met, through the readout more than the drawing (finding 3). No answer before the commit: met. The reveal quotes what you saw: partly. Every value is on the stage, but 7.85 km/s appears only after the orbit, because Demo.tsx (the artifact) formats the speed as "?" until the ball has looped (line 159).

**Top finding (revise):** the throw speed is hidden ("?") on every throw that lands, so the learner explores "how hard is hard enough" without seeing how hard each throw was. The reveal then calls 7.85 km/s "your fastest landing". Show the speed for every throw after the commit. The slider's top is still exactly 7.9 km/s, so pushing to the end finds the answer, and 79 km/s cannot be tested. The builder chooses the fix (for example: show the speed, and let the slider go past 7.9).

| r6 finding | Status |
|---|---|
| Main: never saw a throw land; gate opens on the orbit alone | fixed (the path now sees landings at 1,269 km and 3,209 km before the orbit) |
| Reveal quotes 7.85 km/s, 3,209 km, 17.4 km never seen | partly fixed: 3,209 km and 17.4 km were seen; 7.85 km/s appears only after the orbit, in the "fastest landing" line, because the speed reads "?" while landing |
| Slider maximum is the answer; 79 km/s untestable | not fixed (Faster greys out at 7.9 km/s, frame 04) |
| Minor: tangent, red drop, "1 min" and the header text tiny at phone size | not fixed ("1 min" still overlaps "Heights ×40", frame 02 to 04) |
| Minor: reveal frame crops the planet's top | not fixed (frame 05 shows the lower half of the ring only) |

Claims 5/5 checked.
