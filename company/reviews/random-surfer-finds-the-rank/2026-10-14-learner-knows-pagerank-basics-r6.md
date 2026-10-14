*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): random-surfer-finds-the-rank
lesson version: v2
boundary: knows PageRank passes rank along links (lesson one-good-link-beats-many) and that a random walk moves by chance; does not know that PageRank equals the share of time a random clicker who sometimes jumps spends on each page (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/random-surfer-finds-the-rank/sheet.png)
Verdict: revise

## 1. From the artifact
- The title gives the answer away: "One link, almost three links' worth" says that A (1 in-link) is worth almost as much as C (3 in-links), which is the "Almost the same" option. The hook asks the right question ("3 times the visits?"), but the title above it answers it. This is the first place the lesson loses me as a predictor: I would pick "Almost the same" from the title.
- Predict: options a third / half / almost the same, with 15% jumps stated. The locked stage shows the 5-page graph with in-link counts (1, 1, 3, 0, 0), and A and C tinted. The tint only marks the two pages asked about. No shares are shown.
- Explore: "1 click" gives "Click 1: jumped to A" (a jump, so the first move I watch is not a link being followed). "+1,000" already shows A 32.0% vs C 32.5%. "Run to 100,000" gives 31.2% vs 33.2%, with bars under each node, and D/E near 3%. The surprise (one in-link roughly equals three) is plainly on stage.
- The why ("A's one link comes from C, the busiest page, so every visit to C is followed by a trip to A") is told in the reveal. On stage the C→A arrow exists but is not marked, and I never watch traffic flow along it. The single-click path showed only a jump. Nothing tints the C→A edge by how often it is used, and nothing shows that the D→C and E→C arrows carry almost nothing.
- Reveal: 31.2% and 33.2% match. The stage under the reveal has been reset ("–") and is cropped at the top, so A is off-screen while the reveal talks about A. It does not say the numbers come from before the reset.
- Minor: the "1 in" label above B is crossed by the A→B arrow.

## 2. Earlier findings

No earlier learner review exists (only a fact-check), even though the lesson is at v2. The boundary is taken from meta.json.

## 3. Show the why you promised

- doesNotKnow ("PageRank = share of time the surfer spends") is shown. The time-share bars under each node grow as the surfer runs, and the reveal names them PageRank. This passes.
- The objective's "because a link from a busy page brings many visits" is only told. The stage never shows the C→A link carrying traffic (no edge tint or count, and the one watched click was a jump). Under the decision, a cause the objective asks the learner to explain must have a stand-in on stage. One option that reuses the stage: tint or thicken each arrow by how often it is followed, so C→A is visibly heavy and D→C and E→C are visibly thin, then have the reveal point at it.

## 4. New findings

- Blocking (top finding): the title "One link, almost three links' worth" gives away the answer "Almost the same". It needs a neutral title (the hook's question works).
- Blocking: the "busy page's link" cause is told only (see section 3).
- Should fix: the stage under the reveal is reset and cropped (A is off-screen). Keep the 100,000 state, or say the numbers are from before the reset.
- Minor: the first single click was a jump, so the learner does not see a link being followed. The stepping is seeded; pick a seed or opening click that follows a link, and disclose it.
- Minor: the "1 in" label above B overlaps the arrow.
- No FATAL.
