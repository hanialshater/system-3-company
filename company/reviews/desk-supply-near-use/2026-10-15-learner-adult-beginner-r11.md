*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): desk-supply-near-use
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows that everyday objects have sizes, positions and amounts; does not know that repeated fetches multiply walking distance and a copy at the use point removes it)
Screenshots seen: yes (artifacts/walkthroughs/desk-supply-near-use/sheet.png, recorded 2026-10-15T22:22, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "4 m"; tapped A · Across the room, B · Copy at desk; slid Distance to 5 m; opened reveal.

1. **Where understanding first broke: the reveal contradicts itself.** It opens "Not quite: it was '48 m'", and the next sentence says "Across the room: round trip per fetch 10 m; walked, 6 fetches 60 m." The 60 m comes from my slider move to 5 m, but the reveal doesn't say so. A beginner reads "it was 48 m" and then "60 m" and does not know which to believe. This is the first thing I read after committing.
2. **What the prediction felt like.** Good trap. "4 m" (one way, once) and "24 m" (one way, six times) are both real mistakes, and the round-trip doubling is the actual surprise. The dashed path lines on the drawing hint at many trips without giving the number.
3. **B is close to obvious.** "Copy at desk: 0 m" is true by construction. The reveal does name the cost ("another storage location"), which is honest and keeps it from being a free lunch.
4. **Did the reveal answer my question?** Yes, once you get past the 48/60 clash: repeated fetches multiply the distance, and a second copy removes the route at the cost of a second place to store things.

Verdict reason: the reveal states "it was 48 m" and then reports 60 m (the slider state) with no note that the distance changed, so the first sentence after the prediction contradicts the second.

## After reading meta.json

- Walked build: a9ea371 (server on 3591). meta.json version there matches branch HEAD. The misconception text below is from branch HEAD (rewritten in 0fe98dd after the build was made, meta only; the walked build had template placeholder text).
- Objective (repeated fetches multiply walking; a copy at the use point removes it, at a storage cost) is delivered, including the cost.
- Misconception ("a short walk is negligible, however often you make it") is answered by 48 m vs 4 m. The prediction options are real mistakes (one way, no repeats).
- The 48/60 clash in the reveal (finding 1) comes from the reveal printing the slider state under the "it was 48 m" line with no "at 5 m" label. This template behaviour probably affects other lessons too (box-handle and bag show the same pattern, but there the verdict word still agrees). Owner: demo-builder, template level.
