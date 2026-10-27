# Number Island: Mathematics collection and sequence

owner: cm-math
date: 2026-10-27
status: agree with changes; collection sign-off only
source: company/product/number-island-scope.md
founder intake: company/decisions/2026-10-27-founder-number-island.md

## Category answer

Agree to the twelve proposed existing Mathematics lessons, in the order below, as an open browsing collection. Keep three landmarks and the suggested route. The change is a bounded presentation of the existing category, not a complete arithmetic course, a tested progression, or a new assessment sequence. No lesson metadata, curriculum prerequisite, claim, publication status or review record is changed by this answer.

The grouping and order are accepted subject to the entry-knowledge and presentation constraints below. They are category-manager choices informed by the current curriculum and lesson knowledge boundaries. This is not an independent factual, learner, accessibility or QA verdict on those lessons.

## Approved collection labels and order

The collection name is **Number Island**. Its descriptive category label may be **Mathematics · 12 lessons** when all twelve are available through the existing catalog visibility rule. **Number Village**, **Fraction Harbour** and **Scaling Mountain** are decorative place names for the groups; they do not name attainment bands or unlock states. Keep real lesson titles from metadata, rather than substituting teaching promises or a score.

| Stop | Landmark | Existing slug | Current title | Concept |
|---|---|---|---|---|
| 1 | Number Village | `add-a-zero` | Times ten: just add a zero? | `place-value` |
| 2 | Number Village | `more-digits-not-bigger` | Which decimal is the biggest? | `decimal-magnitude` |
| 3 | Number Village | `the-equals-sign-balances` | What does = actually ask? | `equals-as-balance` |
| 4 | Fraction Harbour | `three-pizzas-four-people` | Pizzas to plates | `fractions-as-division` |
| 5 | Fraction Harbour | `add-the-slices` | A half plus a third | `fraction-addition` |
| 6 | Fraction Harbour | `scoops-in-three-cups` | Scoops in three cups | `fraction-division` |
| 7 | Fraction Harbour | `divide-six-by-zero` | What is 6 ÷ 0, really? | `division-by-zero` |
| 8 | Scaling Mountain | `split-the-sum` | One hard product, two easy ones | `multiplication-as-area` |
| 9 | Scaling Mountain | `times-can-shrink` | Where does 0.6 × 0.7 land? | `multiplying-below-one` |
| 10 | Scaling Mountain | `adding-squashes-the-photo` | Bigger photo, same face? | `multiplicative-scaling` |
| 11 | Scaling Mountain | `double-the-size` | The 12-inch pizza deal | `area-scaling` |
| 12 | Scaling Mountain | `cube-the-size` | Three times as wide, how heavy? | `volume-scaling` |

All twelve files currently say `published`. The world view must still use catalog-provided visibility and actual status; this record is not permission to hard-code availability or represent current review readiness as verified.

## Prerequisites and entry boundary

Inspection of `content/curriculum/math.json` confirms the explicit internal prerequisites occur earlier in this proposed route:

- `place-value` before `decimal-magnitude`;
- `fractions-as-division` before `fraction-addition`, `fraction-division` and `division-by-zero`;
- `multiplication-as-area` before `multiplying-below-one` and `multiplicative-scaling`;
- `area-scaling` before `volume-scaling`.

That check does not make the collection sufficient for an absolute beginner. The individual `learner.knows` fields assume existing knowledge that is not fully taught by these twelve lessons:

- Whole-number place value, addition, simple multiplication and division, and the meaning of halves/quarters.
- Equal sharing and unit fractions as equal parts of a whole.
- Rectangle width/height and the usual rectangular-area model before `split-the-sum`.
- Decimals as parts of one before `times-can-shrink`.
- Multiplication by 1.5 before `adding-squashes-the-photo`; the earlier product-below-one lesson does not establish that skill.
- Area as tile coverage and pizza diameter before `double-the-size`.

These are explicit assumed entry skills, not newly approved prerequisite lessons or new teaching content. Do not label the route “from zero,” “all the arithmetic you need,” “master arithmetic,” or imply that reaching stop 12 demonstrates mastery. If product later wants a complete beginner course or enforced prerequisite ladder, return it to the category/learning-design owners for a separate scoped task.

## Constraints for design and implementation

1. Keep every available stop directly selectable. The order is advisory; no test, completion requirement or hidden gate connects the landmarks.
2. Use the same accepted grouping/order in SVG controls and list navigation. Landmarks must not swallow or omit stops on phone layouts.
3. Keep the existing player and its knowledge boundary. Decorative art must not add a mathematical explanation or imply an additional verified claim. Reuse metadata titles/statuses rather than creating new learning copy for the map.
4. No mixed checkpoints, pizza finale, new recall question, progress read, mastery marker, reward or additional lesson is in this category sign-off.
5. If a lesson becomes unavailable under the catalog rule, follow that rule and recompute visible counts; do not keep a broken link to preserve “12.” Route a material sequence change back to `cm-math`.
6. Do not call the whole prototype approved to ship. Principal-engineer owns implementation tier and design review; independent quality owners check the artifact; release-manager owns release evidence and existing holds.

## Evidence inspected and limits

Inputs: `company/domains/math.md`, `content/curriculum/math.json`, the twelve `src/demos/math/<slug>/meta.json` files named above, the founder intake and head-of-product scope. Inspected `title`, `concept`, `status`, `learner.knows`, objectives and mapped prerequisites. No reviewer notes or evaluation-held-out records were opened. No live learner study, browser interaction, factual re-verification or new pedagogical assessment was performed in this consultation.

## Objections and answers

- **Category manager:** “Level 1” could suggest these lessons teach every entry skill in order. **Answer:** Accept Number Island as a browsing collection with assumed school arithmetic; level numbering, if used as scenery/navigation, must not imply a validated beginner course or attained level.
- **Category manager:** The photo lesson assumes multiplying by 1.5, which is not fully supplied by an earlier stop. **Answer:** Keep the existing stated learner boundary and an open route. Do not create a replacement lesson or silently claim the gap is taught; a complete-course version needs separate learning-design work.
- **Category manager:** Published metadata may be mistaken for current lesson readiness. **Answer:** Preserve actual labels and release checks; this collection sign-off adds no verification verdict.

## Handoff

Chief of staff can record the collection/grouping/order consultation as supplied, with the above constraints. Design-lead and principal-engineer should use this answer alongside `company/product/number-island-scope.md`; independent QA should compare actual map/list stops with this inventory after an artifact exists. Any added content or changed prerequisite promises returns to `cm-math` before implementation.
