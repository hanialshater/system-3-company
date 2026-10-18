# Books toy models

`BookIdeaLesson` (default or named export from `@/components/books/BookIdeaLesson`)
takes `{ slug, idea: BookIdeaSpec }`. A wrapper imports only its own `idea.json`.
`BookIdeaSpec` is exported from `@/lib/books/model` and re-exported by the renderer.
`family` intentionally accepts a JSON string; `validateBookIdeaSpec` guards it
before rendering and returns the narrowed family. Invalid models throw an
addressed `Book model:` error rather than produce a bogus/NaN answer.

| Family | Input order | Label order |
|---|---|---|
| flow | capacities, 2–4 | one name for each station |
| payoff | probability percent, signed net win, signed net lose | outcome names |
| compound | initial, rate percent, steps, addition after each step | name of step/time unit |
| selection | count A, success percent A, count B, success percent B | group names |
| network | total nodes, branch factor, rounds | name of round/time unit |
| feedback | initial, inflow, outflow, steps | inflow, outflow, step/time unit |
| intervals | budget, work per chunk, overhead per chunk | work, overhead |

Bounds are documented with the types in `model.ts`. Interval models have at most
12 complete chunks so every interval can be drawn. Tree pictures draw at most
12 nodes and explicitly say how many are pictured/reached. Author network cases
with **at most 12 reached nodes** when every counted path is teaching evidence;
larger counts require a separate design review. All nodes in a <=12-node unary
path are represented by a folded path. Counts in the selection scene are expected
fractional successes / population, never claimed observations.

The first two controls observe the named scenarios. Both are unique milestones;
the scenario starts neutral so A must actually be visited. Before both cases
have been visited, Reset returns to the neutral scene. After both are seen,
Reset restores A's meaningful causal picture beside the reveal. Reset disables
itself when the scene is already in the state it would restore. Both paths
retain the computed Seen outputs and earned milestones; B → Reset → A still
requires actually visiting A. There is no timer, random data, storage or runtime claim override.
`fillSeen` substitutes only the literal `{A}` and `{B}` tokens with saved outputs,
rounded identically to the scene. It never evaluates text or inserts HTML.

Scenario controls always visibly name `A: <label>` and `B: <label>`, including
while locked, so question/reveal references to either case are defined. Their
accessible names include the full case and scenario label. The persistent Seen
row uses the same A/B aliases rather than repeating the full scenario names;
the mapping stays visible in the controls beside it. Keep scenario labels and
diagram labels short: the complete scene must meet 25 words. Bibliography and attributed `bookIdea` render in the reveal,
outside the stage; their words still count in the reveal's 90-word budget.
Use the existing reveal-fit tool and independent phone QA on actual payloads;
the pure model tests establish arithmetic and snapshot invariants only.

Compound captions show the actual operation `× (1 ± rate/100) + addition`, with
shortest round-trip input literals. They do not round a multiplier (for example,
12.5% remains 12.5/100 rather than suggesting ×1.13). Output and Seen readouts
retain their common two-decimal rounding. This changes presentation only;
calculations still use JavaScript numbers and their ordinary binary precision.

Run focused checks without a server/build:

```sh
node --import ./tests/lifehacks/register.mjs --test tests/books/models.test.mjs
./node_modules/.bin/tsc --noEmit --incremental false
```

Accessibility (B1–B4, company/engineering/reviews/2026-10-16-books-a11y-b1-b4-change.md):
the pressed case stays focusable (`aria-pressed`, no-op on repeat press) instead of
`disabled`. `describeScene` names the picture by restating only what it draws (payload
labels, unit, inputs and `calculateModel` outputs); it must never add words that state
a fact the lesson's claims do not already hold. `announceCase` feeds a visually hidden
polite live region ("Case B: 45 work minutes"); the visible Seen row is not live.
