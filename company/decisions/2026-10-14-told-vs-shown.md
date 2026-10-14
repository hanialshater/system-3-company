# Decision: a "why" the brief promises must be shown on stage, not only told

owner: head-of-product
date: 2026-10-14
status: decided

## Context
Learner reviewers split on one question: can a lesson launch when its "why" is one told sentence
in the reveal, with nothing on stage that stands for it? Two wave D cases, both still at v1:

- **bending-frontier** (economics). The reveal says the curve bends because "land is not all
  alike ... the last wheat takes the best corn fields". Nothing on stage is a field. The brief's
  doesNotKnow lists "why a production frontier bows outward", and the objective asks the learner
  to *explain* that resources are unequally suited.
- **iss-gravity-still-there** (physics). "They and the station fall together" is one told
  sentence. Nothing on stage falls or moves. The brief's doesNotKnow lists "that floating in orbit
  is free fall", and the objective asks the learner to *explain* why astronauts float.

The first reviews (`company/reviews/bending-frontier/2026-10-13-learner-adult-beginner.md`,
`company/reviews/iss-gravity-still-there/2026-10-14-learner-adult-beginner.md`) found the same
gap and gave **launch**. The r5 re-reviews (`.../2026-10-14-learner-adult-beginner-r5.md`) gave
**revise**. demo-standard.md had no rule on this, so each reviewer used their own threshold.

Related board patterns: W-150 (reveals quote states the learner never visited) and W-154 (the
locked stage leaks the answer). All three come from the same rule in `earn-the-reveal`: the reveal
may only claim what the stage gave the learner. This record covers the *cause*. W-150 covers the
*values*, and it stays open separately.

## Options considered
1. **One told sentence is always enough in 60 s** (the earlier reviewers' view). It is cheap, but
   then the objective's "explain" depends on trust, and the lesson does not teach the idea it
   was built for.
2. **Every causal sentence must be shown.** Too strict. Every reveal has some supporting context,
   and showing all of it would break the one-representation and text-budget rules.
3. **Scope the rule by the brief (chosen).** If a "why" is a doesNotKnow item, or the objective
   asks the learner to explain it, the stage must hold it. Other causes may be told in one
   sentence if they are claimed.

## Decision
A lesson may not launch if a doesNotKnow item, or a cause the objective asks the learner to
explain, appears only as told text. Something on the stage must stand for it: the learner sees
it change or makes it change. The reveal may then name it in a sentence that **points at** what
the learner saw. Supporting context outside the brief's gap may still be told in one claimed
sentence. The stand-in must live on the existing stage, by tinting, labelling or moving what is
already there. It must not add a second panel, because "one representation on a phone" still
holds.

Sentence added to `company/product/demo-standard.md` under Craft rules. The file is not in
`company/constitution/protected-paths.txt` and craft guidance is mine. It goes in at `*`
(seen in two cases, not yet confirmed by Pattern Review):

> `*` **Show the why you promised.** If the brief lists a cause in doesNotKnow, or the objective asks the learner to explain it, something on the stage must stand for that cause and the reveal must point at it; a told sentence alone is a revise. Context outside the brief's gap may be told in one claimed sentence.

### Applied to the two cases
- **bending-frontier: revise.** The stage must show unequal land. One way: tint each wheat ton's
  step by the field it takes (poor corn land first, best corn land last), so the growing steps
  line up with visibly better corn land, and the reveal points at the tint. The r5 minors (drop
  the formula from the stem, the chart cropped on reveal) are not blockers under this rule.
- **iss-gravity-still-there: revise.** At 400 km the stage must show falling. One way: the
  station and astronaut both move along the orbit with a dropped-ball trace that curves with
  them. Another: a slow-throw vs fast-throw toggle where the slow throw hits the ground and the
  fast one keeps missing. A step control must be included (prefer manipulation to animation),
  and the reveal must point at the trace. Inverse square stays **acceptable as is**: the stage
  already shows 25% at twice the distance from the centre, so the reveal only needs to point at
  that stop. The gravity-bar label and the cropped Earth are minors.

## Rests on
- The four learner reviews named above (simulated learners: they find problems, they do not show learning).
- The briefs in `src/demos/economics/bending-frontier/meta.json` and `src/demos/physics/iss-gravity-still-there/meta.json`.
- Pattern `earn-the-reveal` (demo-standard.md).

## Revisit if
- Human-learner recall shows told-only causes recalled about as well as shown ones (compare recall
  on the revised versions against v1). That would make this rule a feather and push it back to option 1.
- Reviewers start sending back lessons for told *context* outside the brief's gap. That would mean the scope line is not clear enough.

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| "The reveal does answer it in one sentence, which is enough for 60 s." Showing the cause costs build time and stage space, and the lesson's main surprise (gravity is ~88%; each ton costs more) is already shown. | Earlier learner reviewers (bending-frontier 2026-10-13, iss-gravity 2026-10-14 first pass) | purpose | **Rejected for causes in the brief's gap; accepted for everything else.** The objective's own verb is "explain", and the cause is half of doesNotKnow in both lessons. A learner who takes it on trust has not got it. The cost point is accepted: told context outside the gap stays allowed, and the stand-in must reuse the existing stage. |
| Adding a field tint or a falling trace risks a second representation and the 25-word stage budget. | head-of-product (anticipated, from the craft rules) | evidence | **Accepted as a constraint, not a reason to skip.** The rule requires the stand-in on the existing picture, and both suggested fixes are overlays on it. If a builder cannot fit it, that goes back to the category manager as a scope problem (the lesson may hold two ideas). |

## 2026-10-14 (later): rulings on four NCM batch-1 lessons

Asked by session 2 after the final learner reviews. I read each final review, the current
`Demo.tsx` and the brief (`learner.doesNotKnow`, `objective`) in `meta.json`. I did not read the
build notes. These rulings apply the decision above. They do not change it.

**How I read universals (a clarification, not a new rule).** A 60-second stage can show the mechanism
on the one case the learner touches. It cannot show every case. Sentences such as "for any
values", "all 16", "any number of people" or "at least 3" are therefore *context outside the gap*.
They may be told in one claimed sentence **if** the mechanism they generalise is shown on the
instance the learner reached. A universal is a revise only when the mechanism behind it is itself
told-only.

### 1. below-critical-mass: **meets the rule, launch**
- The gap: doesNotKnow is *that* the same product and price can die out or reach most of the
  market depending on the start. The objective asks the learner to explain *that* there is a
  tipping point (shrink below it, grow above it). The stage holds both, and the gate forces the
  runs: 18 vs 25 and 19 vs 21, plus the ringed 20% crossing and the labelled "shrinks" and "grows"
  regions. The reveal points at them.
- The objective names one cause, "with network effects". The stage stands for it: the chip says
  "more users, more value", and the curve rises with the share, so the learner sees next round's
  share depend on this round's.
- "With few users the product is worth less than its price to most people" explains why this toy
  curve has the shape it has. The brief does not ask the learner to explain that. It is context
  outside the gap and is allowed as one told sentence. It is claimed (c8, verified).
- Not required, but the cheapest improvement: label the curve "share who'd pay $0.16 at this
  share" so the told sentence points at a mark.

### 2. enemy-of-my-enemy: **needs a stand-in before publish**
- The objective asks the learner to explain a cause: "*because* three camps always contain a
  trio of three enemies". The stage has a stand-in in principle: the pink unbalanced trios and
  the "3 of 10" count at ABC | D | E, and the learner can make them vanish by flipping D–E.
  It fails the rule on two counts. (a) The three trios (ADE, BDE, CDE) all share D–E, so their tints
  overlap into one blob and the learner cannot find "one person from each camp". (b) The reveal's
  "one person from each makes three enemies" does not point at anything on the stage.
- **Minimal acceptable stand-in:** on the existing stage, make the unbalanced trios individually
  findable. The cheapest way is a text line under the Unbalanced readout that names them when
  there are 4 or fewer (e.g. "ADE · BDE · CDE"). Distinct outlines instead of a shared fill also
  pass. The reveal's sentence must then name the trios the learner's own three-camp state left
  (from `seen.three`), e.g. "Your three camps left ADE, BDE, CDE: each takes one person from each
  camp, so all three pairs are −." No new panel. The preset stays.
- "All 16 balanced settings are camp splits", "at least 3" and "any number of people" are
  universals. They stay as told context (see the clarification), because the mechanism they generalise
  will now be on stage. The "must" in doesNotKnow is shown well enough for five people: the
  readouts show 0 unbalanced only alongside clean camps, and the gate requires a "not camps" state
  with unbalanced trios.
- This overrules the reviewer's "launch with notes". Their own top finding is the reason.

### 3. prices-sort-the-buyers: **meets the rule, launch**
- Both doesNotKnow items are on the stage. The stops-where-each-can-take-a-favourite point is the
  dashed over-wanted group, the wants/gets marks and the gated "cleared" state. The highest-total point
  is the gated Compare with 23 highlighted among six. "Nobody assigned the houses" points at z
  on b. The objective asks the learner to explain *that*, not *why* prices find the maximum, so
  the reviewer's finding 6 (no mechanism for optimality) is outside the gap.
- "Lowest prices that clear this market" and "for any values ..." are context and universals.
  They are told and claimed, which is allowed.
- Not told-vs-shown, and not blocking under this record: "total value" is undefined at predict
  time, and the Compare chips ("xa yc zb") are not decoded. Those are craft notes for the
  builder and learning-designer.

### 4. same-songs-different-hits: **needs a stand-in before publish**
- "Early luck compounds" is both in doesNotKnow ("rich-get-richer dynamics") and named in the
  objective ("explain that ... early luck compounds"). The On/Off toggle shows *that* copying
  changes the outcome, not *that it compounds from early picks*. The only view of compounding is
  the +100 step, which the gate does not require, and the reveal points at nothing on stage.
- **Minimal acceptable stand-in:** on the existing stage, gate an early checkpoint and point at it.
  Add a milestone reached at 100 listeners with copying on, through the existing +100 control (so
  the gate becomes early, copy-1000, nocopy-1000). Then add one reveal sentence, built from the
  reached state, that compares the early rank with the final one. In my node re-run of the
  current code (seeds 1–8), world 3's best song is 7th at 100 listeners and still 7th at 1,000,
  and song 7 leads from 100 to 1,000. So: "At 100 listeners world 3's best song was already 7th;
  900 more listeners did not move it." The builder re-runs this and records it as a claim; the
  fact-checker verifies it. No new panel. "All 1,000" stays.
- Separate issue, not ruled here: the reveal quotes "35–48%" and "at most 18%", which the stage
  never prints. That is the *values* problem tracked under W-150 and goes to the builder with it.

### Objections on these rulings
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| below-critical-mass: the "why it shrinks" is told only, so the lesson should be a block if the rule covers the why. | learner reviewer, final (`company/reviews/below-critical-mass/2026-10-14-learner-no-network-effects-final.md` finding 5) | purpose | **Declined for this brief.** The brief asks the learner to explain *that* there is a tipping point, and that is shown and gated. The value-below-price mechanism is the toy model's context. If a CM rewrites the objective to "explain why a small launch shrinks", this ruling flips to revise. |
| enemy-of-my-enemy: there is a stand-in (pink trios, count), so launch with notes. | learner reviewer, final | evidence | **Declined.** The rule needs the learner to be able to find the stand-in and the reveal to point at it. Neither holds while the three trios share one blob. The fix is a label, not a rebuild. |
| same-songs-different-hits: the toggle contrast already stands in for copying, so launch with notes. | learner reviewer, final ("close to revise") | evidence | **Partly accepted.** The toggle does stand in for *copying matters*, and it stays. It does not stand in for *compounding from early luck*, which the objective names. The minimal fix reuses the existing step control. |
| Universals ("any values", "any number", "all 16") are told, so they break the rule. | raised as a question in the session-2 request | purpose | **Declined.** See the clarification above. If reviewers start sending lessons back over universals whose mechanism is shown, that triggers this record's second revisit condition. |

Next moves (route, not done here): enemy-of-my-enemy and same-songs-different-hits go back to
demo-builder (the early gate for same-songs is learning-designer's call on wording), and then
fact-checker for the new claims. below-critical-mass and prices-sort-the-buyers go to
launch-review with their review notes. Its claims are the fact-checker's gate, not part of this ruling
(NCM-3 recorded a dispute in below-critical-mass, and c11 now reads verified).
