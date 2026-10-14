*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): truck-hits-car-force
lesson version: v2
boundary: adult-beginner (knows heavy trucks wreck small cars, that a push is a force, kilograms and m/s; does not know Newton's third law, that acceleration rather than force is what differs, or a = F / m).
Screenshots seen: yes (artifacts/walkthroughs/truck-hits-car-force/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: "which pushes harder on the other?" The truck / the car / equally. A strong, honest trap; I picked "the truck". The locked stage shows the truck and car at the contact line, speed-change readouts "?", and the sliders disabled. Nothing visible leaks. **But** the locked picture's accessible label reads "Crash at 0 milliseconds: each vehicle feels 389 kilonewtons", which gives the answer to screen-reader users before they commit (and 389 kN at 0 ms is odd next to the 0 kN the stage shows at 120 ms).
- Explore: "Play to the end" → 120 ms, "0 kN | 0 kN", truck speed change 2.4 m/s, car 24.1 m/s. Scrubbing "Into the crash" to 100 ms: "18 kN | 18 kN". Truck mass to 12,000 kg: "21 kN | 21 kN", speed changes 2.0 vs 24.4. Equal pushes at every instant and every mass, with very unequal speed changes, both on stage side by side. That is the whole idea, and it is visible.
- The force arrows at the contact point are tiny stubs at these instants, so the equality reads from the numbers, not the arrows. At the end of the crash the push is 0 | 0, which is correct but not where a learner should look. The rise and fall of the push through the crash is still unexplained (it was a minor before too).
- Reveal: points at the equal pushes and at the speed changes. It says "by the end the car's speed had changed by **24.5** m/s", but at 12,000 kg I saw 24.4 at 100 ms and never replayed to the end at that mass. Small, but the number should be the one on screen (W-150).
- "12 times as heavy" adapts to my slider move, which is good. The kN scale ("about the weight of a 100 kg person") is told in the reveal footer.

Told vs shown check (brief): doesNotKnow "Newton's third law" is the equal kN pair at every scrub position and mass. "Acceleration, not force, is what differs" and "a = F / m" are the speed-change readouts, about 10x (and 12x) apart under the same push; the reveal points at them. Shown.

## 2. Earlier findings (r1 review, 2026-10-13, v1)

1. "The car's velocity reversed" contradicted the picture: **fixed** (the reveal now quotes speed changes, which are on stage).
2. The second half (the lighter one changes speed more) rested on thin arrows: **fixed** (TRUCK / CAR SPEED CHANGE readouts).
3. kN had no scale: **partly fixed** (one told sentence in the reveal; nothing on stage).
4. Mass slider only went heavier: **likely fixed** (the thumb sits mid-track at 10,000 kg; not exercised below it in this run).
5. The forces rising and falling looked like noise: **not fixed** (minor).
6. No gap before contact at 0 ms: **not fixed** (minor; the vehicles still touch at the dashed line when locked).

## 3. New findings

- Moderate (accessibility, not a visual blocker): the locked picture's aria-label states the equal force (389 kN each). Make it neutral before the lock, as the visible stage is.
- Minor: the reveal's 24.5 m/s vs the 24.4 on screen. Quote the value at the learner's current mass and time, or replay to the end after a mass change.
- Minor: enlarge the force arrows, or show the peak push, so equality is also seen in the picture, not only in the numbers.
- No FATAL.
