*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): nearest-town-first-detours
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows a greedy rule can fail and that the number of routes explodes; does not know that always going to the nearest unvisited town can build a long round trip, because the hops it skips pile up at the end)
Screenshots seen: yes (artifacts/walkthroughs/nearest-town-first-detours/sheet.png, recorded 2026-10-14T18:57)
Verdict: launch (pass)

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Yes"; tapped Nearest-first tour, Out to 8 first, Try all 24 orders, Step, Reset; opened reveal.

1. **The prediction is genuine.** "Nearest next" sounds efficient; the options ask by how much it fails, which makes me commit to a size.
2. **The arcs make the cost visible.** Nearest-first draws hops 2, 5, 11, then a long red 23 km arc from 8 to −15, then 15 home: "2+5+11+23+15 = 56". Out to 8 first: 2, 6, 11, 12, 15 = 46. The one long red arc is the "skipped hops pile up at the end" idea in a single picture.
3. **"Try all 24 orders → 46 to 56 km"** tells me nearest-first is the worst possible here, which is more striking than "not the best". The reveal says "tied for the longest". Good.
4. **Colour is unexplained.** Red marks the 23 km hop on the greedy tour, but on the "out to 8 first" tour the 15 km hop is red too, though nothing went wrong there. I guessed red = longest hop; a legend would help.
5. **Fit:** the reveal opens after Reset, so the road is empty and no arcs are drawn; the 23 km hop the reveal leads with is only in the trace line. Showing the nearest-first arcs when the reveal opens would let the words point at the picture.
6. A learner might like to know why 46 is the floor (any round trip must reach −15 and 8 and come back, 2 × 23 = 46). Not needed; a nice optional line.
7. Trust link "0/5 claims checked" (fact-checker's lane).

Fixes (optional): legend for red; keep the greedy tour drawn when the reveal opens.

Verdict reason: the greedy failure is drawn as one long late hop, quantified against all 24 orders, and the reveal names the mechanism in the brief's terms.

## After reading the brief (meta.json)

- doesNotKnow ("the hops it skips pile up at the end") is delivered by the 23 km arc.
