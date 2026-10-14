*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): coaster-track-shape
lesson version: v3
boundary: adult beginner (knows things speed up downhill, knows m/s)
Screenshots seen: yes (artifacts/walkthroughs/coaster-track-shape/sheet.png, 4 frames)
Verdict: launch

## 1. From the artifact

- Predict: the question defines "no friction" in plain words and offers steep / gentle / same. Locked stage: the 59° steep ramp drawn with a 0 to 5 m height scale, readouts "?". No leak. The hook adds "curvier", which the question doesn't ask about; the curve slider then answers it. Fine.
- Explore: making the slope 32° races a cart on my track against a ghost on the dashed steep ramp, each with a live speed label (steep ghost already at "9.9" at the bottom, mine at 6.9 m/s mid-way). Readouts: steep 9.90 m/s in 1.18 s; mine 9.90 m/s in 1.90 s. "Arches more" bends the track into a hump: 0.5 m/s near the top, final 9.90 m/s in 4.56 s. Same speed, very different times, both seen. That is the idea, on stage.
- Small: the readouts show my track's final speed and time while my cart is still mid-track (frame 02: label 6.9 m/s, readout already 9.90 m/s, 1.90 s). The race is spoiled by its own scoreboard; a beginner might not watch the labels climb.
- Small: the Slope slider runs "right = gentler" (59° at the left end, 32° further right). Unexpected; a learner dragging right to "increase slope" gets the opposite.
- Reveal: 9.90, 4.56 s, 1.18 s all match. "Arriving sooner is not arriving faster" pins the likely confusion (time vs speed). v = √(2gh) with g defined; told, but it only confirms a number already seen.
- 7/7 claims checked. Fits on phone.

## 2. Earlier findings (r2 review, same version v3)

1. Bottom-speed readout fills before the cart arrives: **not fixed** (same as my section 1 note).
2. Locked-stage picture description says "speed at the bottom 9.90 m/s" before the guess (screen-reader leak): **not fixed**. The transcript's locked stage still reads "[picture: Track at 59 degrees, straight; speed at the bottom 9.90 m/s]". I missed it on my own pass; it is a real leak for screen-reader users, and only for them.
3. Odd option stands out: I did not find it odd this time; "Both end at the same speed" reads as a natural third choice.
4. v = √(2gh): unchanged, acceptable.

## 3. New findings

- Minor: Slope slider direction (right = gentler) is counter-intuitive.
- Fix the alt text leak (route to demo-builder); it is cheap and it is the one thing that lets a learner skip the prediction.
- No FATAL. Same speed at different times is seen on stage before the reveal.
