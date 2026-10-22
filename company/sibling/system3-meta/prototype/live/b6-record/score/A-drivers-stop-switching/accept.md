# Accept: Will the drivers ever stop switching?

Verdict: accept

## Why
- Prediction commits: the stage shows the full setup (A = 10n, B = 25 + 5n, all six on B at 55 min) and three distinct, plausible answers, then "Lock it in".
- Exploring earns its place: one-at-a-time settles (255 -> 210 -> 180 -> 165, savings 45/30/15, then 0), while all-at-once flips forever (55 -> 60 -> 55 -> 60 -> 55; meter 255/210). That contrast challenges "it just settles" and gives "back and forth for ever" a real case.
- Reveal lands and is true. I recomputed every number: B with 6 = 55. Meter 0 + sum(25+5k, k=1..6) = 255. A1/B5 = 10 + 200 = 210, A2/B4 = 30 + 150 = 180, A3/B3 = 60 + 105 = 165. Driver 4 sees 40 vs 40, so no strict gain. All on A = 60 min, meter sum(10k) = 210. Rosenthal potential, so the drop always equals the saving.
- Trust claim c3 also checks out. Drivers move to A only when nA < 3 and to B only when nA > 4, so every start reaches nA in {3,4} within 3 switches, in any order.
- It fits a phone: single column, large type, all controls reachable, and the reveal fits on one screen.

## Minor defects
- "Delay meter" appears from the predict screen on, but it is undefined until the reveal. 255 is not total travel time (6 x 55 = 330), and a learner may read it as total delay. A one-line gloss or a different name would help.
- After "All at once", the one-at-a-time table (ending "165 · stays") stays above a stage that reads 255, all on B. The two runs look like one state.
- After "Start over" the stage resets, but the reveal screen shows the one-at-a-time end state and both logs again. The stage state is inconsistent across steps.
- The third option, "Stops only for some driver orders", is never explored on stage: the learner sees one order only. The reveal and c3 assert order-independence without showing it. A quick "shuffle order" run would test it.
- When the learner is right ("Your prediction held"), there is little surprise. The all-at-once contrast carries the lesson, and the reveal could signal more strongly that this is the twist.
- A large empty gap sits between the controls and the bottom panel on the explore screens.

## Blocking defects
- None.
