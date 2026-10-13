# Build note: maze-depth-first (demo-builder, 2026-10-13)

- Design intent: the question's three places drawn as a graph. Step advances depth-first search one move (neighbours alphabetical); the path on the stack is drawn thick in the domain colour, visited places grey, and a row of stack chips sits under the graph. At a dead end the Step button reads "Dead end: back up". After G is reached, "Show shortest" overlays the fewest-links path (dashed, breadth-first). A second graph, the bigger maze, has a dead end (B) and a 4-link find against a 2-link shortest.
- Key state: depth-first reaching G, then the shortest path overlaid on the same graph. Milestones ["found", "compared"], minInteractions 2. QA path: Step, Run to G, Show shortest, switch graph (Start over is disabled after a switch, so QA skips it).
- Numbers: option B's text, the reveal's link counts and paths come from dfsSteps()/shortest() in Demo.tsx, the code that draws the stage. Brief answer (B, S, A, G) re-computed in Node with an independent recursive DFS and held.
- Disclosure: the bigger maze was designed to show a long find (claim c2 says so); the reveal does not generalise a ratio from it.
- Locked: nodes and stack are drawn neutral; nothing is highlighted.
- After screenshots: the maze reads on phone with no overlaps; no changes.
