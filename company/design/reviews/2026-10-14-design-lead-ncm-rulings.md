# Design lead rulings, 2026-10-14: Networks, Crowds, and Markets (S2-19)

decider: design-lead (Ines) · session 2, branch `ccr-rnd-ncm` · inbox item S2-19 (`company/ops/inbox/session-2.md`)
inputs: `company/rituals/records/2026-10-14-vertical-review-ncm.md` (§3 asks, objections 5 and 6), `company/product/verticals/networks-crowds-markets.md`, `company/design/formats.md`, `company/design/reviews/2026-10-13-design-lead-decisions.md` §1 (ABM rules), `company/design/system.md`, `company/design/concepts/{single-card,step-run-button}.md`, the existing hand-drawn graphs (`probability/friends-have-more-friends`, `math/handshakes-halve`, spec `negative-edge-fools-dijkstra`).
scope: format and layout only. What each lesson teaches, its graph and its numbers stay with the category managers (cm-math-discrete for the cascade). No contract change. These rules are mine, so the design reviews that test them are chaired by the visual designer (Kiri) with the accessibility reviewer, not by me.

## 1. cluster-stops-the-cascade: **single card with Step. Not ABM.**

**Ruling.** A deterministic threshold cascade on a hand-placed graph of ≤ 12 nodes is a **single card** using the **step-run-button** interaction on the interim **network stage** (§2). It does not use the agent-based simulation format, so the Schelling-only limit (2026-10-13 decisions §1.10) is not touched and no written exception is needed.

**Why.** The ABM format exists for patterns that appear only in aggregate: hundreds of agents on a grid, random placement, a metric read off a chart over ticks. Its rules (seed on stage, New mix first, Run computes then replays, metric chart with gutter labels) are there to make *that* legible and QA-stable. The cascade lesson's payoff is the opposite: the learner can check every node's rule by eye in every round and see exactly where it stops and why. Its anatomy is the step-run-button one (Step, To the end, a round counter), which is approved and in use. Putting it under ABM would add a seed, a chart and a replay that it does not need, and would make it wait on the Schelling reference for no design reason.

**Boundary test (applies to any future lesson, including batch 2).** A lesson is ABM if **any** of these holds; otherwise it is single card (with Step) or simulation run:
1. More than 20 agents, or agents in a spatial grid world.
2. Randomness in the agent rule or the starting placement that the learner re-rolls.
3. The outcome is read off an aggregate metric over ticks, not by looking at individual agents.
Under this test: `cluster-stops-the-cascade` is single card; `same-songs-different-hits` (objection 6's other case) is a **simulation run** of 8 independent worlds, not ABM (no agent sees another world, and the learner reads rankings, not a spatial pattern), and its small-multiples layout stays with the interaction designer's spec (S2-20); `the-giant-appears` and `few-shortcuts-shrink-the-world` are simulation runs whose graphs are texture (§2.6).

**Conditions the spec must meet (to the interaction designer, S2-20; I approve the spec in design review).**
1. ≤ 12 nodes, positions fixed by hand, no randomness and no seed line. Initial adopters are fixed by the brief (not learner-tapped), so the QA path cannot pick a seed set that tells a different story.
2. Rule line, ≤ 20 words, with the active threshold substituted in words or a fraction ("Joins once at least half its neighbours have"), never a bare "q". It matches code, `meta.json` and the fact-check in meaning.
3. Controls (≤ 6, all rendered at first paint): parameter chips, threshold or start set (at most 3, the values the question and reveal name; amended 2026-10-14 in design review, `2026-10-14-design-review-ncm-specs.md` §4), **Step**, **To the end**. Changing the chip returns to round 0 if the run is not final; after a final run it shows the new chip's final state (the comparison default, as in herd-immunity). DOM order is chosen so the QA path (each control pressed once) ends on the run the reveal describes: the stopped cascade with the blocking cluster outlined.
4. State: adopted = filled, not yet = hollow, initial adopters = filled with a heavy ring, adopted *this round* = `--accent` ring for that round only. Never colour alone (§2.4).
5. The blocking cluster is shown at the end as a dashed outline around its members, with a legend entry. A readout "Adopted 7 of 12 · round 3" (numbers from the CM's node run). Per-node "k of n" counts are **not** printed on every node (word budget); if the spec wants them, they appear only on the node the learner taps, which then counts toward the 12 tappable nodes and the QA path.
6. Each Step transition ≤ 300 ms, instant under `prefers-reduced-motion`. To the end jumps to the final state (no replay animation needed; the QA wait is unchanged).
7. Stage words (rule line, legend, readout labels, chip labels) ≤ 25, numbers not counted.

## 2. Network stage: interim rules for hand-built network lessons (batch 1)

Applies to every batch-1 lesson that draws a node-link graph: `news-comes-from-acquaintances`, `enemy-of-my-enemy`, `cluster-stops-the-cascade`, `web-bow-tie-reach`, `one-good-link-beats-many`, `new-road-slower-trip`, `prices-sort-the-buyers` (bipartite), and the texture graphs in `the-giant-appears` and `few-shortcuts-shrink-the-world`. It is a UI concept inside existing formats, not a new format. Existing published graph lessons are **not** redesigned to it; they change only if a learner review finds a layout problem.

### 2.1 Size
- **Tappable or named nodes: ≤ 12 per stage.** Display-only named nodes (not tappable, still read individually): ≤ 20. Above 20 the graph is texture (§2.6).
- **Tappable edges: ≤ 10 per stage.** If the graph has more edges, only the ones the question needs are tappable, and they carry a visible handle (§2.3).
- Stage: SVG `viewBox` 340 wide, height ≤ 300, scaled to the card width. Positions are hand-placed constants. No runtime force layout, and nodes never move between states (QA-stable, no layout jump).
- Check: K5 for `enemy-of-my-enemy` on a circle of radius R has its 10 edge midpoints 47 px apart at R = 130 and 49 px at R = 135 (node check today). So use **R ≥ 135**, which gives a drawing about 257 × 244 px and fits.

### 2.2 Nodes and tap targets
- Drawn node radius ≥ 14 px (28 px disc). Each tappable node has a hit circle of radius 22 (44 px target, the system's minimum).
- **Centre-to-centre distance ≥ 48 px** between any two tappable nodes, and between a node and any edge handle, so hit areas never overlap.
- Tappable nodes and edges are real buttons (or `role="button"` with keyboard focus) in a stated DOM order, with an `aria-label` that states their identity and state ("Edge A–B, weak") and `aria-pressed` where they toggle. They do not count toward the single card's 6-control row, but **the QA path taps every one once in DOM order**, so the spec states the end state after that path and it must show what the reveal describes. (Example: tapping all 10 K5 edges once flips every sign, and every triangle's balance flips with it; the spec must plan for that.)

### 2.3 Edges
- 2 px strokes in `--fg` (or `--line` for context edges). Directed edges: arrowheads ≥ 8 px, ending at the node rim, not the centre.
- **Tappable edge = a handle at the midpoint** (drawn ≥ 20 px, hit circle 44 px), not a fat invisible stroke (strokes overlap near shared nodes). Handles stay ≥ 48 px from each other and from node centres. If the edge carries a value (cost, sign, price), the handle *is* the value pill.
- Edge state is shown by **line style plus a glyph**: e.g. strong = solid 3 px, weak = dashed 2 px; friend = solid with "+", enemy = dashed with "−". Never colour alone.

### 2.4 Colour and shape
- At most **3 node states** per stage. State is shown by **fill vs hollow** first, then a heavy ring or a shape (circle vs square for two groups), and colour last. Every state has a legend entry or is named in the rule line.
- Colour roles from `company/design/system.md`: `--fg` default; `--accent` for "just changed / active this step" only; `--good-fill` / `--bad-fill` for semantic states with `--bg` ink inside; `--domain` never as text or as the only cue.
- Highlighted **sets** (stopping cluster, reachable set, giant component, a camp) use a dashed outline or a soft tint behind the nodes, labelled once in the legend, not a second colour on every node.

### 2.5 Labels
- Node names: 1 character (A–L) or a 1–2 digit number, inside the disc, ≥ 13 px, `--fg` on hollow, `--bg` on filled. No words inside nodes.
- Values (score, price, label, count): a pill beside the node, ≤ 4 characters, ≥ 11 px, placed so it never overlaps an edge handle or another pill at 390 px. If two pills would collide, move one to the other side or put the value in the readout row instead.
- Legend: one line under the stage, ≤ 6 words. It counts toward the 25-word stage budget, as do the rule line and pills that are words.
- The stage SVG has an `aria-label` that states the counts the reveal uses ("7 of 12 adopted, round 3").

### 2.6 Texture graphs (> 20 nodes: giant component, small world)
- Nodes are dots r ≥ 3 px, edges 1 px `--line`. No names, no taps, no per-node values. The learner reads a **readout or chart**, not the drawing.
- The set that matters (giant component, a shortest path) is shown by fill and a larger dot (r 4–5), and named in the legend. A ring of 100 (few-shortcuts) at 340 px gives about 9 px per node, which reads as a ring; shortcuts are drawn `--accent` 1.5 px.
- These lessons follow the simulation-run format's rules (seeded, disclosed); §2.1–2.5 do not apply to them beyond colour and legend.

### 2.7 Motion
- State changes ≤ 300 ms; instant under `prefers-reduced-motion`. Never animate node positions.

## 3. When it becomes a kit component (rule of two)
1. `news-comes-from-acquaintances` and `enemy-of-my-enemy` are built **by hand** to §2. They are the pair: one tappable-edge graph with two clusters, one complete graph with signed edges. The second reuses the first's constants (radii, hit sizes, handle drawing, legend line) by copy, not by import.
2. When **both pass design review** (chair: visual designer with the accessibility reviewer, since I wrote §2), I write `company/design/concepts/network-stage.md` (kind: interaction, status: approved) from what survived review, with both as references.
3. Then the **design engineer** proposes a kit component (working name `NetworkStage` in `src/kit/`: fixed positions, node and edge-handle buttons, state-to-style mapping, legend, aria), built with the platform engineer, and the **principal engineer** reviews it as tier 2 because it adds kit API used across categories. `src/kit/Lesson.tsx` is not touched.
4. Network lessons built before the component ships (`web-bow-tie-reach`, `one-good-link-beats-many`, `cluster-stops-the-cascade` and the rest) **are not blocked**: they build by hand to §2. They move to the component only if they fail a design review or need a change anyway, not as a sweep.
5. **Trigger to revisit the rules early:** the vertical's pause criterion (≥ 4 of the first 8 fatal or failing the 60-second fit because of the network stage). If either of the first two fails design review on size or labels, I tighten §2.1 (e.g. ≤ 10 tappable nodes) before the next network lesson is built.

## 4. Objections and what happened to them
- **"≤ 20 nodes" (the review's ask) vs my 12.** Kept 20 only for display-only nodes. At 44 px targets with 48 px spacing, 12 tappable nodes plus their edge handles and pills is what fits a 340 × 300 stage with room for labels; 20 tappable nodes do not leave room for edges.
- **"Cascades are agents reacting to neighbours, so it is ABM by definition."** True of the model, but formats are about what the learner sees and does. The boundary test (§1) is written so this question gets the same answer next time without a ruling.
- **"Existing graph lessons already make two, so build the kit now."** They were built to different rules (node sizes and labels differ: e.g. r = 10 people in handshakes-halve, 48 px towns in the Dijkstra spec). The rule of two counts lessons built to the same rules and passed review; that starts with the batch-1 pair.
- **"Hand-built stages in 7+ lessons drift apart before the kit lands."** §2 fixes the numbers, and design review of each checks them against this record, so drift is a review finding, not a rewrite.

## Routing (I do not own these steps; the caller is asked to put them on the board)
- interaction-designer: the `cluster-stops-the-cascade` spec under §1 conditions (part of S2-20).
- cm-math-discrete: brief S2-03 names the format "Single card with Step (network stage, design-lead ruling 2026-10-14)"; the CM picks the ≤ 12-node graph, the seed set and the threshold values, and checks the stop set in node.
- builders of the network lessons: follow §2; cite this file in the build notes.
- visual-designer + accessibility-reviewer: chair the design reviews of `news-comes-from-acquaintances` and `enemy-of-my-enemy`, checking §2.
- design-lead (me), after both pass: write `company/design/concepts/network-stage.md`.
- design-engineer + platform-engineer, then principal-engineer review: the `NetworkStage` kit component after that concept exists.
