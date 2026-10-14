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
