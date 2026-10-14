# Build note: lh-scale-recipe-portions

## Pre-flight v2

2026-10-14, demo-builder. Board W-361(b).

- **Problem (safety second read, company/reviews/lh-scale-recipe-portions/2026-10-14-safety.md):** the stage assumptions said "no cooking guidance" right above the required warning "Cooking times do not scale with quantity.", which is itself cooking guidance.
- **Change:** I applied the reviewer's first proposal: drop "no cooking guidance" and keep the warning as written. In `src/lib/lifehacks/resource-specs.json` the assumptions now read "Scaled model; quantities only." Claim c1 has the same text. The stage at 390x844 (headless, dev server) shows "Full scale:900g; quantities only." with "Cooking times do not scale with quantity." under it.
- **Claims:** c1 is unverified because its text changed. c5 is still unverified (advice, source owed). c2 to c4 keep their verdicts. Version 1 → 2.
- **For the second reader:** the reveal's principle still ends "not cooking or nutritional advice". I left it alone because the reviewer did not flag it, but it sits next to the warning, so the outside reader should check it (W-361(c)).
- **Not done:** no build and no QA.

## Pre-flight v3

2026-10-14, demo-builder. Board W-373.

- **Problem (safety second read, company/reviews/lh-scale-recipe-portions/2026-10-14-safety.md):** the stage warning "Cooking times do not scale with quantity." is inaccurate: cooking times do change with quantity, just not in proportion.
- **Change:** applied the independent safety reader's full proposed wording, verbatim. In `src/lib/lifehacks/resource-specs.json` (this slug's `warning` only) and claim c5 the text now reads "Cooking times do not scale in proportion to quantity: follow the recipe's own times and check food is cooked through."
- **Claims:** c5 is unverified (text changed; food-safety source still owed to the fact-checker). Other claims untouched. Version 2 → 3.
- **For the second reader:** a reader other than me confirms the wording on the stage at 390x844; the longer line may wrap to two or three lines.
- **Not done:** no screenshot or computer-use QA of the stage.
