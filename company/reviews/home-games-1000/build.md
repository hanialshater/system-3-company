# Home games category: builder record

Owner: demo-builder  
Status: draft, not independently reviewed.

## Scope and limits

The catalogue has 1,000 labeled playable formats generated from 200 base activity descriptions and five group/scoring formats. This is **not 1,000 independently distinct games**. Some of the 200 base activities are related themselves. The five formats change how turns or results are organized; they do not create new core mechanics. W-2122 tracks expansion if 1,000 genuinely distinct games are required.

A new `games` domain uses the existing `cm-lifehacks` owner; no new company role is created. The category has an ordinary feed entry per format and a separate `/games` browser with player, material and type filters. `/games/[slug]` gives setup, turn, success, ending and related formats directly, without requiring the feed prediction interaction. Rules are original house-rule proposals, not official rules of named traditional games; every claim remains unverified.

The artwork consists of ten reusable colorful SVG families, with additional paper-game-specific props. Step panels have small state changes and are not bespoke step-by-step illustrations for every game. Accessibility and whether each picture explains its specific action need independent review. Players may skip; the proposed games avoid mandatory physical contact, running, food-based dares and compelled personal disclosures. This builder statement is not a safety review or a playtest.

## Checks

- Five Node tests pass: counts, rules/ending presence, player filter constraints, timed-material disclosure, source status and selected material cases.
- TypeScript passes with a 4 GB Node heap. A prior check with the default Node heap exhausted its 2 GB limit; the catalogue is loaded on the server to avoid inferring a large JSON type union. Production memory and build performance remain unmeasured.
- The unchanged browser lesson contract passed 20/20 phone/desktop checks in a lightweight component harness, one representative game per family. This is a sample of 10, not a full-app or 1,000-entry QA run.
- A browser component harness checked search, player-count restrictions, no-material filtering, phone-width overflow and representative artwork. The actual guide server component was rendered separately for Paper Tower and checked at mobile width. Next routing, deployment file tracing and the complete production frame were not tested.
- `npm run check` reports the existing baseline of 810 errors and five warnings. `npm run verify` stops at the two existing publication-readiness failures.
- The full production build was not run: less than 1 GB was available, below the operating loop's 10 GB host guard. Strict lesson reveal fit and independent accessibility, playability and learner reviews remain open.

## Next

W-2122: grow from 200 base activities toward 1,000 independently distinct games. W-2123: independent review of game instructions, safety, playability, duplication and activity-specific illustration. W-2124: production build and full-app/mobile QA when capacity permits. Reconcile the generated registry, domain list, board IDs and progress with other open category PRs on integration.
