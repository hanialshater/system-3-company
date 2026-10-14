*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): near-and-far-links-find-the-way
lesson version: v1
boundary: adult who knows small worlds have short paths (few-shortcuts-shrink-the-world) and has never met greedy routing or link-length distributions; reads "∝" only if told.
Screenshots seen: yes (artifacts/walkthroughs/near-and-far-links-find-the-way/sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact

- Hook and title are neutral and good ("Random long links reach farthest. Do they help a message find its way?"). The locked stage shows the empty ring, "? steps" and the line "Pick a rule for the long links. Each run sends 1,000 messages." Nothing leaks. The options use "∝" ("Chance ∝ 1/distance²"), which isn't defined anywhere. For this boundary, "chance falls with distance" / "falls with distance squared" would read better.
- Explore: "Uniform" drew a dense mesh of long chords and one routed path: **29 steps**. "Chance ∝ 1/d" drew fewer, mixed-length chords: **30 steps**. "Chance ∝ 1/d²" drew almost no chords and a path crawling round the ring: **210 steps**. "Next message" (1/d²) gave 97.
- **The big number in the centre of the ring, the one thing I watch, says uniform (29) beat 1/d (30).** The means that decide the question (38.3 / 28.5 / 212.6) sit in a readout row that is cut off below "Next message" in every explore frame. I could only read them in the reveal. On what the stage showed me, my wrong answer looked confirmed.
- The cause ("1/d links come at every scale") is visible only loosely: uniform is all long chords and 1/d² has almost none, while 1/d shows a mix. Nothing labels link lengths or shows where on the path each rule loses time (the "last stretch crawls" for uniform). The reveal's uniform story is told, and the stage path I saw for uniform didn't look like it crawled at the end.
- Reveal: the means match the (hidden) readouts. "About 500 with no long links" matches a RING ONLY 500 chip I also couldn't see while exploring. Kleinberg's result is told context. That's fine.

## 2. Earlier findings

No earlier learner review. Boundary taken from meta.json → learner.

## 3. New findings

- **Revise (earn the reveal):** make the means the thing the learner reads. Move the MEAN row into view (or into the ring's centre after each run), and show the single-message count small. Alternatively, pick a disclosed seed whose first messages agree with the means. Right now the most prominent number (29 vs 30) contradicts the answer.
- **Revise (show the why you promised):** the doesNotKnow cause is "links spread across distance scales". Put that on the existing ring: tint each drawn link by length (short / medium / long) or add a tiny "links by length" tally under the ring. Have the reveal point at how only 1/d has all three, and where the uniform path wastes its steps near the target.
- Minor: define or replace "∝" in the options.
- No FATAL.
