# Fact-check: half-size-two-towels

Independent claim checks for src/demos/lifehacks/half-size-two-towels. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Convention (a transfer prompt; spec.recall, not rendered by HomeLesson.tsx). It presupposes that cutting and unfolding differ, which matches the split-area model: area = 2 × width × 120/10000 in both layouts (unchanged by cutting), and the idea text 'separating folded layers is a different operation'. Nothing false is implied. |

**Result:** 1 verified, 0 disputed, 0 held unverified.
