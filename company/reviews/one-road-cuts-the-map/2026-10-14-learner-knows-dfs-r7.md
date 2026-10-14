*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7, wave F): one-road-cuts-the-map
lesson version: v2
boundary: knows-dfs. Knows depth-first search visits every town it can reach, and that a map of towns and roads is a graph; does not know that some single roads are critical (bridges), or how to tell which (meta.json learner field, same tag as r6).
Screenshots seen: yes (artifacts/walkthroughs/one-road-cuts-the-map/sheet.png, 11 frames)
Verdict: revise

## 1. From the artifact (written before reading r6 or the brief)

- Predict: options 0 / 1 / 3 / 7 of 7, all same form. "3 of 7" now tempts the busy-town idea. The locked drawing is tangled (crossing roads, no visible triangles), so the bridge cannot be read off the picture. Good. Small leak: the title "Which closed road splits the map?" is singular and so points at "1 of 7"; the hook ("Which closures actually cut...") is plural and fine.
- Explore: each road chip closes one road (red dashed ✕) and darkens the detour traffic now uses; 3–4 turns towns 4, 5, 6 red, "3 of 6 towns reachable", MAP SPLITS 1. The 6-whole / 1-split tally is earned by testing all 7. This half of the idea (a road on a loop has a detour) is shown well.
- "Walk depth-first" labels each town "#visit ↑#n", draws some roads dotted and tints 3–4 green, with the line "Depth-first from 1: #visit ↑highest climb back. Bridge: 3–4."
- **Where it loses me (top finding):** the DFS part. (a) "↑highest climb back" and the reveal's "nothing climbs back higher than #3" mean "reaches an *earlier* (smaller) visit number". Higher = smaller is backwards from how the numbers read, and nothing on stage says it. (b) The dotted roads and the green road have no legend; I cannot tell that dotted means "a road back up the tree". (c) In the reveal frame the graph and every #/↑ label the reveal quotes ("town 4 was visited #3", "↑#3", "Town 3 is #2") are scrolled out of view; only #4, #5, #6 at the cut edge show. So the reveal's second paragraph, which is the objective's "DFS finds all bridges in one pass", points at something I cannot see and could not decode when I could. In practice it is told.
- Reveal paragraph 1 quotes my own run correctly (7 closed, 6 whole, 3–4 split off 4, 5, 6). "Towns 3 and 4 each touch three roads ... traffic went the other way round" answers the busy-town trap from what I saw.
- Minor: the reveal says "a triangle road beside them", but with the new tangled drawing no triangle is visible; the loops only show as darkened detours.
- Minor: "Reopen all" keeps the tallies (good) but the chip ticks remain, which is fine.

## 2. Earlier findings (r6, v1)

1. DFS one-pass told only: **partly fixed**. There is now a DFS walk with visit numbers and climb-back marks, on the path to the reveal, but the notation is undecoded and out of view at reveal (top finding).
2. Locked drawing gave away "1": **fixed** (tangled layout).
3. No option for the degree misconception: **fixed** ("3 of 7").
4. Stem spelled out the graph: **fixed**.
5. Graph scrolls off at reveal: **not fixed**, and it now matters more because the reveal quotes the DFS labels.

## 3. Verdict

revise. The loop half of the idea is shown and earned. The DFS half, which the objective asks the learner to explain, rests on "↑#n / climbs back higher" labels that are not explained, read backwards, and are off screen when the reveal names them. Minor: singular title hints at the answer. No FATAL.
