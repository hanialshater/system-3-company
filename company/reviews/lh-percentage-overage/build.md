# Build note: lh-percentage-overage

## Pre-flight v2

2026-10-14, demo-builder. Board W-357.

- **Bug:** at Required=100 the stage showed A=111. `100 * 1.1` is `110.00000000000001` in binary floating point, and the bare `Math.ceil` in `evaluateResource` turned that noise into a whole extra tile. The same error gave 56 at 50, 100 at 90 and 122 at 110 (should be 55, 99, 121).
- **Fix (shared model):** `src/lib/lifehacks/resource-model.ts` adds `snapToInteger`. Before `ceil` or `floor`, a value within a relative 1e-9 of an integer snaps to that integer. Real fractions still round (ceil(41 × 1.1) = 46).
- **Other lessons:** I swept all 14 resource specs that use ceil or floor, at every slider value. Only this lesson changed. The other 13 give the same numbers as before, so their versions are not bumped.
- **Text correction (learner-visible):** the principle said "The formulas match only at that crossover." With correct rounding, A=B at both 95 (ceil(104.5)=105) and 100 (110). It now says: "Rounding up also ties them at 95; above 100 the percentage order is larger." That changes `principle` and `recall.why` in resource-specs.json and the text of claims c3 and c4. The c2 to c4 sources record the 95/100 ties. cm-lifehacks should confirm the wording.
- **Fixture:** a new test in `tests/lifehacks/resources.test.mjs`, "ceil and floor ignore floating-point noise…", checks 100→[110,110], 50, 90, 95 and 110. `npm run test:lifehacks` passes.
- **Claims:** c1 to c4 are all unverified. Version 1 → 2.
- **Not done:** no build and no QA (the brief says so). Lesson QA and the walkthrough are still owed.
