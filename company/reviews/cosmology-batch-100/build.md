# Cosmology batch: builder evidence

Owner: demo-builder  
Status: 100 drafts, not independently reviewed.  
Scope: ten questions each on cosmic scales, electromagnetic observations, expansion, the early universe, the microwave background, dark matter, dark energy, the cosmic web, stars and compact objects, and observational methods.

The 100 questions are distinct, but they use ten shared schematic visual families. Within those families, some cases use specialized scenes: for example, spectra shift left or right, absorption and emission are different, galaxy rotation and lensing use different diagrams, and compact remnants differ from stars. The cosmic web uses a simple orthographic 3D projection; neither it nor the plots are observational data. Figures are illustrations, not to scale; CMB color contrast is exaggerated. Interaction is a two-state view, not a continuously manipulable physical simulation. Several questions are conceptual and require pedagogical scrutiny of whether the picture actually demonstrates the asserted cause. The first and last lessons in a family should not be assumed to be visually or pedagogically independent.

## Builder checks

- `node --test tests/cosmology/*.test.mjs`: four tests pass: unique entries, metadata/answers, selected independently specified facts, and registry/curriculum membership. These checks do not establish that all claims are true.
- TypeScript: `tsc --noEmit --incremental false` passes after rebasing to main.
- The unchanged `tests/qa/contract.spec.ts` passed 200/200 checks in a custom lightweight browser harness rendering the actual lesson components with the app's global CSS, at phone and desktop project sizes. After the 3D web revision, the 10 structure lessons passed 20/20 retests. The harness omits Next's routing, application frame and generated production bundle. These are component-level checks, not the required full-app QA record.
- Builder visually inspected representative renders of all ten families and a phone reveal. This is not independent accessibility, pedagogy, fact-check or learner evaluation. Strict 390×844 reveal fit has not been measured in the app.
- `npm run check`: 810 errors and 5 warnings, matching the recorded existing baseline. `npm run verify` stops at two pre-existing publication-readiness failures.
- Production build and production-app QA were not run: the operating-loop host guard requires at least 10 GB free before a new build, and the host remained below that after narrowly scoped cleanup of reproducible temporary files. An attempted blanket removal of older generated build directories was automatically rejected. No protected files or deployment were changed.

## Pre-flight status

Titles and choices received a builder pass for answer leakage; no formal independent copy check was run. The model interaction is the single retained milestone; there is no reset control. Stages, interactions and explanation length were exercised in the component harness, but full-app stage/reveal fit, meaningful scientific grounding of each scene, independent fact-check and learner evidence remain open. Every scientific claim is unverified. W-2163 and W-2164 track independent review and full-app checks.
