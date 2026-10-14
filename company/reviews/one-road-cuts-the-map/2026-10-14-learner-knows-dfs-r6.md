*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): one-road-cuts-the-map
lesson version: v1
boundary: knows-dfs (from meta.json learner.knows: depth-first search visits every town it can reach; a map of towns and roads is a graph. Does not know that some single roads are critical (bridges), or how to tell which.)
Screenshots seen: yes (artifacts/walkthroughs/one-road-cuts-the-map/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: "For how many roads does the network fall apart?" 0 / 1 / 7. The locked stage draws two triangles joined by a single 3–4 link, so the answer is visible before committing. Anyone who looks at the picture sees one road holding the halves together. The misconception the lesson is aimed at (the busiest town's roads are the weak points) gets no option of its own: there is no "3" (the three roads at town 3 or 4) or "5" (every road touching 3 or 4). "7" is a straw man. I picked 0 only because the walkthrough does.
- Explore: each road button closes one road, marks it with a red dashed ✕, and darkens the roads traffic now uses. Closing 1–2 darkens 1–3–2, which shows "the other way round". Closing 3–4 turns 4, 5 and 6 red, "3 of 6 towns reachable", MAP SPLITS 1. Tallies reach 6 whole / 1 split, 7/7. The gate needs all 7, which is right. "Reopen all" resets the picture but keeps the tallies.
- Reveal: points at what was seen: 6 of 7 left the map whole, only 3–4 cut 4, 5, 6 off; towns 3 and 4 each touch three roads but closing a triangle road beside them changed nothing. Good, and it answers the degree misconception after the fact.
- Then: "Depth-first search finds every bridge in one pass by noting, for each road it walks down, whether the towns below can climb back above it by another road." This is the algorithm. Nothing on stage is a DFS: no visit order, no "climbs back above" marker. Even with DFS in my knows list, the sentence is dense and I could not reproduce it.

Told vs shown check (brief): doesNotKnow "some single roads are critical and others are not" is shown (6 vs 1). "How to tell which ones they are" is half shown: the loop test (a detour lights up, 3–4 has none). The DFS half is told. The objective explicitly asks the learner to explain "that depth-first search can find all bridges in one pass". Under "Show the why you promised", a told-only part of the objective is a revise. The fix is either on stage (for example, number the towns in DFS order from town 1 and tint 3–4 as the one road whose lower side cannot climb back) or a category-manager call to drop DFS from the objective and doesNotKnow, leaving it as one claimed context sentence.

## 2. Earlier findings

No earlier learner review exists. Boundary taken from meta.json.

## 3. New findings

- **Revise:** the DFS one-pass part of the objective is told only (above). Either show it on the existing graph or rescope the brief (cm-cs).
- **Revise (prediction):** the locked drawing gives away "1". A map where the bridge is not visually obvious (for example the triangles drawn overlapping, or a 4-cycle with a pendant road placed in the middle), or options that tempt the degree misconception ("the 3 roads at the busiest town"), would make the guess cost something.
- Minor: the stem spells out the whole graph ("a triangle 1-2-3, a road 3-4, and a triangle 4-5-6"), which also tells the answer.
- Minor: at reveal the graph scrolls mostly off; tallies stay visible.
- No FATAL.
