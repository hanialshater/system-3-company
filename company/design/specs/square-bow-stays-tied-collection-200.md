# square-bow-stays-tied: interaction specification

Owner: interaction-designer · 2026-10-13 · status: implementation handoff

Format: existing **Side-by-side comparison**. Preserve the prepared prediction: same laces and initial tension; Bow A across the shoe, Bow B along it. Square holds longer in the illustrated comparison; it is not guaranteed never to fail. Do not frame double knots as wrong.

## One representation

Draw two top-down shoe silhouettes in one responsive 360 × 240 SVG: A on the left, B on the right. Both toes point up. Draw the crossed first half-knot and loop-wrap crossing with visible over/under interruptions; magnify the knot within each shoe rather than adding an unrelated graph. Loop orientation is visibly across (left–right) or along (toe–heel). A small footstrike mark and swing arcs appear when walking; both knots' tightening/loosening remain on the shoes themselves.

Geometry is accuracy-critical. Follow Fieggen's prepared-source diagrams for the loop-wrap step. Distinguish the first crossing from the second wrap. A drawing made only from two rotated ellipses is not an explanation of square versus granny topology and fails this spec. The layout SVG intentionally does not supply an authoritative knot diagram.

## Controls in DOM order

Initial condition: A square/across, B granny/along; zero steps; equal initial tension.

| Order | Visible label | Action and observable response |
| --- | --- | --- |
| 1 | A: reverse | Reverse A's second-loop wrap; crossing route and loop orientation both change |
| 2 | B: reverse | Reverse B's second-loop wrap; crossing route and loop orientation both change |
| 3 | Walk 10 | Apply 10 footstrikes and end swings to both from their common tension |

Each wrap control exposes its actual over/under state through SVG routing and an accessible description. After walking, a wrap reversal reties that shoe at the same initial tension and clears that shoe's stale outcome until the next shared walk; retain the previous trial as a faint outline, so the reveal never compares unequal histories. A shared walk animates both in at most 450 ms or immediately under reduced motion. Repeat Walk 10 adds steps and changes the diagram; it does not remain enabled at a clamped no-change maximum.

The normal QA path makes A granny and B square, then walks both. This deliberately tests that the reveal follows topology, rather than always calling A the winner. The learner's prediction remains about the original A/B pair; store those original identities separately. A/B are labels, not permanent names for knot types.

## Milestones and evidence

Milestones: `wrap-reversed`, `shared-walk-after-reversal`; `minInteractions=2`. One of the wrap reversals and a subsequent shared walk earns the reveal. Merely walking the unmodified initial pair does not earn both milestones. Show the now-granny bow loosening faster and the now-square bow loosening more slowly with nonzero loosening for both.

Use stated illustrative per-step rates; neither rate is reported as a measurement from Daily-Diamond et al. Do not print “2× longer”, 100% guaranteed retention, or “never comes undone”. If a later walk causes both to fail, the preserved earlier trial must still show that the granny loosened sooner, and the reveal should refer to that observation.

## Stage copy budget

Suggested worst-state vocabulary, 22 words:

> Illustrative loosening. Same initial tension. A: granny B: square A: reverse B: reverse Walk 10 Steps 10 Across holds longer; not forever.

“Across holds longer; not forever” is hidden before prediction; it can be omitted entirely because the diagram does the comparison. Keep type/status and steps as `?` if their answer would disclose the outcome while locked. Over/under labels may replace status words, not be appended without recounting.

## Reveal-visible state and proposed body

Preserve the visited wrap crossings, original A/B orientation outlines and the latest common walk outcome. Use dynamic knot-type references, not a fixed “A stayed tied”.

> Your original across-shoe bow was the square version. After reversing the wraps, the knot types changed places. In your walk, the granny version loosened faster, though both began equally tight.
>
> Footstrikes loosen the knot; swinging ends then pull it apart. Reverse the loop-wrap direction to change the knot. The square version holds longer, not forever. Check the direction before reaching for a double knot.

The first paragraph must adapt when only one wrap was reversed; never say they “changed places” unless both did. Keep body plus kit verdict under 90 words. Claims include crossing identity, orientation, the failure mechanism and the disclosed illustrative rates; independent verification remains required.

Mockup request: two shoes, magnified accurate crossing routes, equal initial tension, shared walking marks. No generic “strength” bars or decorative knot substitution.
