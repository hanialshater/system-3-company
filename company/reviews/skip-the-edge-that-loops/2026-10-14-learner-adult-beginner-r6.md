*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): skip-the-edge-that-loops
lesson version: v1
boundary: adult who knows a spanning tree joins all towns with no loops (connect-the-towns-cheaply) and that union-find tells whether two towns are in the same group; new to Kruskal's method.
Screenshots seen: yes (artifacts/walkthroughs/skip-the-edge-that-loops/sheet.png)
Verdict: launch

## 1. From the artifact

- Hook and title: "The cheap road that never got built" / "Does every cheap road make the cut?" together hint that some road is skipped, which rules out "8, every road". 5 and 4 are still a real choice, so the prediction isn't free. It is softened, though.
- Locked stage: five coloured towns and eight weighted roads, with the next road (A–C, 1) highlighted and the line "Same colour = already connected." Nothing gives away the count.
- Explore: "Test A–C (1)" built it and recoloured C to match A ("different groups, build it"). The button became "Test B–C (2)", which invites stepping. "Test the rest" finished the run: BUILT 4, SKIPPED 4, COST 11. The built roads are thick black and the skipped roads (4, 7, 8, 10) are struck through. The struck "4" sits between A and B, which are already joined through C by thick roads, so it visibly closes the triangle A–B–C. That's the lesson's point, and I could read it from the end picture even though I jumped past the moment it was tested.
- Reveal: "4 built, 4 skipped, cost 11", "A–B (4) skipped though cheaper than B–D (5), because A and B were already joined through C". All of it matches what's on stage. "One road fewer than towns" matches 4 roads for 5 towns. "No tree costs less than 11" is told. It's the brief's doesNotKnow fact ("also finds the cheapest tree"), but it's a result, not a cause the objective asks the learner to explain. One claimed sentence is acceptable under the told-vs-shown scope line.

## 2. Earlier findings

No earlier learner review. Boundary taken from meta.json → learner.

## 3. New findings

- Minor: "Test the rest" lets a learner skip the A–B test itself, where "already connected" becomes visible (both towns the same colour before the road). Either make reaching the A–B test a milestone, or have the stage line list the skipped roads at the end ("skipped: 4, 7, 8, 10, each closed a loop").
- Minor: the title tilts the prediction away from "8, every road". Something like "Which cheap roads get built?" would keep all three options live.
- Minor (judgment): the "cheapest tree" result is told. If the category manager wants it in the gap, one way is a stage line comparing 11 against the cost if A–B were forced in.
- No FATAL.
