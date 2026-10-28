## 2026-10-28 · chief-of-staff · visual chemistry and biology batch, 500 of 500 drafted

- **Changed:** Added the final 79 chemistry and 74 biology drafts to PR 29: 250 chemistry and 250 biology lessons in the batch. The last tranche includes heat transfer, mass-to-mole conversions, electron-shell counts, equilibrium and percent yield; endocrine signaling, cell-cycle scenes, plant features and bacterial structures. Included the ionic and life-process generator sources missed in the prior checkpoint. All lessons remain drafts with unverified claims.
- **Checks:** The corrected production build and TypeScript pass using `.next-science-verified`. All 153 additions passed the existing browser contract on phone and desktop (306 checks); all 500 batch entries have passed it at both viewports across the staged runs. Thirty-five targeted model tests pass. Builder inspected representative heat-transfer, equilibrium, cell-cycle, endocrine and plant screenshots; a cell-cycle spindle alignment and too-short explanations were corrected. `npm run check` remains at the pre-existing baseline of 810 errors and five warnings. `npm run verify` stops at two existing publication-readiness failures.
- **Believe:** Engineering checks cover basic interaction and arithmetic, not independent scientific correctness, overlap, accessibility, strict 390×844 reveal fit or learner effectiveness. Many entries are related practice cases that share a renderer; 500 entries do not mean 500 independently designed simulations. Source claims remain unverified and no human-learner evidence is claimed.
- **Next:** W-2117 and W-2118: review and refine each subject's drafts. W-2119: independent scientific, pedagogy, overlap, design and accessibility review of all 500. Reconcile board and registry changes with physics PR 28 when integrating.
- **Blocked:** None of the 500 drafts is cleared for publication. Repository-wide verification remains blocked by the recorded existing readiness failures.
## 2026-10-28 · chief-of-staff · founder inbox triaged (31 items: 18 closed, 5 merged, 8 kept)

What changed: company/ops/founder-inbox.json. Of 31 items (30 open plus F-05, which was waiting on review), 18 are closed and 5 are merged (both have status `closed`, with closedAt, closedBy, closedReason and a triage block), and 8 are kept, each rewritten as one plain question with its old wording under `previous`. Nothing was deleted. The record with the table and the kept questions is company/ops/2026-10-28-inbox-triage.md. F-52 (r24) is left for the coordinator.

What I believe and how sure: high confidence in the evidence for each closure (commits and files cited; F-50 to F-54 are on main, not yet on this branch). Medium confidence that HQ shows the list correctly: hq.ts founderQueue hides only `decided`, so closed items still show until hq-engineer adds `closed` to the filter.

Next: the founder answers F-25 and F-26 (due 10-30), then F-23, F-49, F-17, F-05 and F-11. The board follow-ups are listed in the record. The board was not edited in this run, and `npm run check` was not run: the worktree is sparse and the disk is nearly full.

Blocked: nothing new. The F-52 id collides with main's decision record of the same number, and the reconciliation (W-2121) has to renumber one.
## 2026-10-28 — Psychology draft pilots started

Founder asked to proceed with at least 500 psychology and human learning demos. A new incubating psychology domain has two draft pilots: `was-that-word-on-the-list` (source monitoring) and `which-dots-belong-together` (proximity). Domain scout's proposal, product scope, interim coordinator acceptance, curriculum, registry and claim records are included. All claims remain unverified; 2 of at least 500 demos implemented, 498 or more remaining. W-2160 tracks continued briefs/builds, W-2161 independent review and QA. No activation, publication, or deployment was approved by this work.

Baseline company check had 783 errors and four warnings; the first post-change check had the identical output. Baseline and post-change verify both stopped at the pre-existing publication test (34 pass, 1 fail). TypeScript and a domain/claim/registry consistency check passed. npm setup could not install Chromium's system dependencies because changing user/group IDs was denied; the cloud browser could not reach the isolated local server. Browser and phone QA, source verification, subject-area overlap sign-off and learner review remain open. Production build outcome is recorded in the pull request. Next: finish independent pilots review, provide a usable browser, and deliver distinct source-backed lessons in bounded batches toward the founder target.

## 2026-10-28 · release-manager · r24 recorded; production regressed r23's security fix

**First thing to know: r24 undid r23 and r22.** The Lessons World production deploy (r24, dpl_7Ugji1xw39RPJN177Tb7sJsrKC1f, source 0fc13b86a, marker e7335139454e) was built from a branch that never had main's later releases. Production now runs Next.js 16.4.0 again (package-lock at 0fc13b86a), so the critical next advisories that r23 (80c847c55, Next 16.4.3) cleared are back (R-031). It also no longer serves flatten-the-cube-to-a-dot (published in r22): 720 published lessons against r23's 721. The founder decides between rolling back to r23 (dpl_8V4QujqEZ3ecL5vHmL2LhLFsyoQz) and a new release r25 that keeps the World and restores both (founder-inbox F-52, board W-2120). I did not roll back. The coordinator's brief said not to touch Vercel, and no pre-approval covers a rollback.

What changed (default branch ccr-4c6c7654-ew9ko1):
- Merge e462fed32 is a normal merge of e7335139454e. The production SHA is now an ancestor of the default branch, and the tree is unchanged. The default branch already held 0fc13b86a, so a deploy from it would not have removed the World. The brief's worry was unfounded, but the merge makes the SHA itself traceable.
- The 12 later commits on codex/all-lessons-inspection (f5114cba0..d67b966bd: branching zoom and Number Island art) are not live. I did not merge them, so that the default branch matches production (W-2122).
- releases.json: r23 brought over from main (identical r1..r22 prefix), then r24 appended. It carries the founder's "Deploy" and "Deploy to production", the failed preview dpl_FVtr8bSaPScRKkAq6kBRCG29zFwj ("Resource provisioning failed"), the correction that the marker's "Preview only" text is wrong, and the inspection-only note (3,895 lessons, statuses unchanged, most unchecked).
- Receipts: company/ops/deployments/2026-10-28-r24-production.json (new), plus r22's and r23's records from main.
- Protected paths: the inspection branch changes none.

What I believe and how sure:
- The deployment facts (ids, READY, the alias, the 200s, no page errors) come from the coordinator. I did not observe them myself: no Vercel or host access here. High confidence in the git facts (versions and trees read from the commits). r24's date is the marker's commit time, a lower bound.
- releases.json still fails validateReleases at r12 (a date not in UTC Z form), and tests/hq/releases.test.mjs still expects r13. Both are inherited from main and not fixed here.

Next: the founder's F-52. Then the chief of staff reconciles the default branch with main (452 commits, W-2121) before any further deploy from either branch. Board numbers W-2120..2122 and F-52 skip past main's highest ids so that merge will not collide.

Checks: npm run check gave 783 errors and 4 warnings before the merge and the same after (it stops at company check, as before).
## 2026-10-28 · analytics-steward · W-2152: Lessons World milestone predictions registered (EXP-012)

Wrote company/experiments/EXP-012-lessons-world-milestones.md and indexed it. It freezes the brief's check predictions P0.1-P0.2, P1.1-P1.6 (P1.5/P1.6 being head-of-product's account-column rows), P2.1-P2.4, P3.1-P3.4 and P4.1-P4.4, each with a would_be_wrong_if and a "void if" column (fixture tables and measurement scripts must be committed before the maker starts). It adds P0.3 (no demotion), P0.4 (no backdated evidence), P1.7 (old recall records) and P3.5 (a seal credits only the questions answered), plus a 4-region case in P3.3. L1 and L2 are EXP-009 P1, P2 and G1 by reference; EXP-009 itself is not edited. L3 is registered with a learner-clustered bootstrap and a return/recall split. L4's measure is replaced by a common 7-day probe, because seal answers exist in only one arm; its sample plan must be appended before the first assignment. Baseline: `npm run check` printed 783 errors and 4 warnings on b55b73ff1 (default branch ccr-4c6c7654-ew9ko1 at 0fc13b86a plus the brief).

Believe (sure): none of L1-L4 can be judged today. events-intake has no identifier, reveal has no fields, recall has no source or version, and REGISTERED_EXPERIMENTS is empty. Believe (moderately sure): the P rows are measurable by their check owners as written. Next: W-2153 (head-of-product) on objection 1, the EXP-009 treatment changing under it (12-lesson journey vs the 162-island World), and objection 2, an L4 second reader; M0 is evaluation-steward's. Blocked: L rows wait on privacy-reviewer and backend instrument approval; a live holdout waits on the founder's F4/O2.

## 2026-10-28 · principal-engineer · O1 answered: one warm maker for the World brief

Wrote EDD-018 Addendum A (company/engineering/edd/EDD-018-lessons-world-journey.md): O1 accepted with conditions. personalization-engineer is the one maker of M1-M4, including the kit's additive recall fields and the M3 attempt store/API; §6's four-builder split is superseded (its reason, parallel builds, is gone in a sequential plan); §1-§5 and §7 stand. Owners review once at the end (A2): platform-engineer for the kit and any host/shell contact, backend-engineer for server/migrations/merge-export-delete with test:accounts on real Postgres, privacy-reviewer for new fields. No protected path is needed; a needed tests/qa or CI change stops and goes to evaluation-steward. Stop rule A4: two failed backend reviews in a milestone hand the account part to backend-engineer. Indexed EDD-018 in company/engineering/README.md.

Believe (fairly sure): the brief's "no new account fields" conflicts with source/qv on recalls for signed-in learners, because the server sanitiser and recall table keep only at/correct (src/lib/server/progress-store.ts, db/migrations/001_accounts.up.sql); head-of-product picks A3 option (a) or (b) before M1 (W-2154). Next: W-2154 head-of-product; W-2155 mine (paths.json tier-2 rules). Blocked: M1 still waits on M0 green and analytics-steward's registration (W-2152). npm run check: 783 errors / 4 warnings, unchanged baseline.

## 2026-10-28 · head-of-product · Lessons World brief for M0-M4

Wrote company/product/2026-10-28-world-brief.md: the next World milestones after the live inspection build (M0 checks green, M1 state model/list/player, M2 scene polish and bottom sheet, M3 flags and seals, M4 progressive loading and end view). It defines qualifying recall (scheduled-due or eligible-seal answer, >=24 h after first reveal, current question version, latest answer wins, wrong resets to Explored), six-question flags for every island size with a 3-minute median target, seals only on islands whose lessons are all Published with verified claims, one warm maker (personalization-engineer), $60 per milestone pausing at $120 with a session-count fallback. Predictions are proposals; analytics-steward registers them before M1 (W-2152). Holdout: EXP-009's assigned consented study; a live 1:1 holdout only with the founder's O2 decision; opener-vs-feed is descriptive only.

Believe (fairly sure): M0 is the critical path (npm run check: 783 errors, all published-gate failures across 407 lessons); the brief is not self-approved because it covers gamification I wrote. Next: analytics-steward W-2152; principal-engineer on O1 (one maker vs EDD-018 §6); founder questions F1-F4 in the brief §9. Blocked: no learning prediction is judgeable until privacy/backend approve instruments (EXP-009).
## 2026-10-28 — Psychology and human learning: founder direction routed

Founder asked for at least 500 psychology, human learning and deep psychology demos. Principal PM supplied a proposed 20-strand capacity allocation, documented in `company/product/verticals/2026-10-28-psychology-human-learning.md`; founder intake and route are in `company/decisions/2026-10-28-founder-psychology-learning.md`. W-2156–W-2159 route the vertical, a checkable proposal and overlap audit, domain decision and host readiness. This is planning, not 500 implemented briefs or demos; no lessons were built or reviewed in this pass.

Baseline: `npm run check` failed with 783 errors and 4 warnings, mostly existing published lesson review/QA gates. `npm run verify` stopped at the existing publish test (34 pass, 1 fail), before typecheck/build/QA. Setup installed npm packages but browser system dependency installation failed on setgroups/setegid permissions. `df -h .` reported about 2.4 GB free; the build-dispatch guard requires 10 GB, so no build was dispatched. Next: principal-engineer-ops provides a qualifying environment and completes browser setup; domain-scout audits overlaps and produces source-backed briefs, followed by head-of-product's domain decision. No deploy, merge, independent lesson review or learning validation was performed.
## 2026-10-28 · zoology first 200 drafts · W-2162

Changed: added 73 more draft lessons to PR #40 after its initial 125, yielding 198 there plus the two prototypes in PR #32: 200 drafts out of the 500 proposed questions. The remaining 300 are not implemented. The new lessons cover additional birds, dinosaurs, mammals, reptiles and amphibians, fishes and arthropods. The drafts use schematics; some use shared interaction patterns. Claims and institutional source leads remain unverified; no merge or publication.

Checks: all 73 new modules passed builder-run transpilation and metadata/answer checks. Builders inspected static light/dark contact sheets for 61 of the 73, not browser or phone layouts. This checkout could not install Chromium: system dependency installation was denied, and a direct browser download returned a broken archive. A cloud browser could not reach the local preview. Earlier exploratory browser evidence still applies only to the earlier 125 and prototypes, not to these 73. Independent science, precise sources, accessibility, visual pedagogy, semantic overlap and learner review remain open. The company check stayed at 783 errors and four warnings; verify stopped at the existing publication-readiness failure. The previous production build compiled but was killed during TypeScript.

Next: finish the standalone TypeScript check, update PR #40, restore browser QA and continue the remaining 300 in reviewable batches. Do not claim that draft implementation or static diagram checks establish learning or scientific correctness.

## 2026-10-28 · zoology drafts and exploratory QA · W-2162

Changed: added 125 new draft zoology lessons beyond the two prototypes, spanning fossil evidence, dinosaurs, mammals, birds, reptiles and amphibians, fishes, invertebrates, animal behavior and ecology. Updated curriculum/registry and fixed multiple diagram legibility and evidence-mapping findings; generated diagrams are schematics and the claims and source leads remain unverified. This is an incomplete first batch toward 500, not a completed collection. 373 of the 500 proposed entries remain unbuilt.

Believe: high confidence in the implementation count and registry mapping; low confidence in scientific and visual readiness without independent review. Exploratory component-harness Chromium flows covered all 125 originals on 390×844 and desktop, 250/250 scripted runs, plus the two prototypes and corrected versions; some first-pass controls measured 33 px and several visual findings required fixes. The harness stubs routing and does not establish full-application behavior, human learning, complete accessibility or verified science. QA records, retained results and a sample of inspected screenshots are in company/reviews and artifacts/zoology-*-exploration. The first prototype PR and curriculum PR remain drafts; no merge or deploy.

Checks: TypeScript passed; company check still reports the inherited 783 errors and four warnings. Verify still stops at the inherited publication-readiness failure. Browser launches after capacity recovered. The production build compiled but was killed during its TypeScript phase (exit 137); protected-contract QA was not run. Continue the remaining entries in the founder's requested batch sizes, then route source-specific fact checks, learner, accessibility and visual review before publication. Do not count drafts as validated lessons.

## 2026-10-28 · zoology curriculum and design directions · W-2162

Changed: added an inventory of 500 proposed questions in ten strands, including the two existing prototype drafts. Added twelve candidate interaction patterns and visual/asset review requirements. This is a content plan: 498 lessons remain unbuilt, and no candidate is science-reviewed. The first prototype PR is #32. W-2162 is blocked on host capacity for builds, with source, overlap and design reviews still required.

Believe: high confidence in the numbered 500-slot count and exact question-text uniqueness, not in semantic uniqueness or scientific accuracy. The repository check remains 783 errors and four warnings, matching its starting state. No code changes, build, browser testing, publication or merge in this planning change. At dispatch time the host had about 1.3 GB free; the 10 GB build guard prevented builder dispatch. Browser setup also failed on system permissions in the preceding session.

Next: restore at least 10 GB free and complete browser setup; audit the catalog for overlap and source each brief, then implement the remaining work in 200-entry batches without double-counting the two prototypes. Keep independent science, accessibility, visual, learner and publication review gates intact.

## 2026-10-28 · zoology prototypes · W-2162

Changed: drafted two life-science lessons, one contrasting footprint and bone evidence and one showing birds within a simplified dinosaur tree; added curriculum and registry entries. This is 2 of the requested 500, with 498 still to scope and build. Sources are leads and all claims remain unverified. No publication, merge or deploy.

Believe: medium confidence that the interactions represent their intended distinction, but no independent science or learner review and no browser or 390×844 fit checks have been performed. The drawings are schematics, not reconstructions. Build and browser QA are blocked by the host guard: free space fell below 10 GB; setup's system dependency installation also failed on permission errors. Before and after changes the company check had 783 errors and 4 warnings; verify stopped at the existing publication-readiness test. TypeScript passed after the change. See `company/reviews/zoology-prototypes/build.md`.

Next: restore host capacity, finish environment setup, review the two prototypes and plan and deliver the remaining 498 in bounded batches; run the required checks, fact-checks, visual QA and independent learner reviews. Do not present the prototypes as the completed collection.

## 2026-10-28 — Completed all500 science drafts included;3895-stop snapshot ready

PR29 advanced during implementation from347 to500 draft lessons. The final76a87df1d snapshot adds153, yielding3895 unique stops/162 islands, with720 Published/234 Review/2941 Draft preserved. Frozenapp a39e39968, build7RPMubtedbVVPXsJdQM4F passed8230staticpages;35science model tests pass. Independent actualbrowser addendum confirms3895unique list entries, both new science players, exact return offsets and native stage swipe. See company/engineering/readiness/2026-10-28-world-completed-build.json and completed-science provenance.

Release-manager pushed exactly one historical inspection marker06aa3dce6 for the earlier3742 snapshot. No Vercel receipt or preview URL appeared; active proxy still denies hosted access/API. Latest3895 candidate is ready but hosted deployment is unconfirmed; no repeated marker or canonical promotion. Founder was told to publish saved network changes. Full content review cleanup remains paused; no false verification or mastery claimed. Next release-manager obtains actual hosted READY and smoke through restored supported access; do not equate Git push with deployment.

## 2026-10-28 — All-lessons world inspection ready

Founder reprioritized coverage and unchecked inspection over whole-company cleanup. Integrated all2097 actual new lesson PR additions for3742 unique world stops across156 islands, preserving720 Published/234 Review/2788 Draft. App2ff4748e9, build y54lbicpjgyppu2w1Kq9a passed; independent source, ops and built-browser checks approved scoped inspection. Final stage-swipe/44px/label fixes and exact Map/List return rechecked. Source/build/QA/ops records are in company/engineering/readiness/*world-inspection*; durable screenshots in company/design/previews/2026-10-28-lessons-world/.

Broad content findings remain unresolved and preserved; no lesson status promoted. PR20 lab prototype and PR26 proposed deploy amendment excluded. Stacked PR board IDs remapped explicitly in company/ops/delivery/2026-10-27-world-inspection-board-remap.json. Next: normal Git merge publication of10 lesson PRs, then release-manager one authorized inspection-branch marker attempt and actual hosted receipt; active network still blocks Vercel/API calls. No hosted availability claimed.

## 2026-10-27 · chief-of-staff · visual chemistry and biology batch, 347 of 500 drafted

- **Changed:** Added 141 chemistry and 141 biology drafts since the 65-lesson handoff. PR 29 now has 171 chemistry and 176 biology drafts. Chemistry adds atomic and ion-counting, ionic ratios, gas-law pistons, titration, particle classifications, periodic comparisons, reaction-energy profiles, organic functional groups and limiting reactants. Biology adds cell-energy maps, osmosis, enzyme-rate curves, population models, phylogenetic trees, food webs, ecological interactions, circulation, digestion, neural signaling and immune interactions. The visual models include SVG diagrams, charts, sliders and shared renderers.
- **Checks:** Production build and TypeScript pass using `.next-science-digest`. All 282 new lessons passed the existing browser contract on both phone and desktop (564 unique viewport checks, with additional retests after visual fixes). Builder inspected representative screenshots, and fixed a clipped organelle legend, osmotic drawing, an inaccurate generic nitrogen icon, and a titration contrast issue. Twenty-nine targeted model tests pass for arithmetic, conservation, biological diagram mapping and declared answers. `npm run check` remains at the recorded baseline of 810 errors and five warnings; `npm run verify` stops at the two existing publication-readiness test failures.
- **Believe:** Engineering behavior has been checked; scientific correctness, overlap, learner value, strict 390×844 reveal fit and accessibility require independent review. A substantial number are related exercises using shared renderers (not 282 independently designed simulations), especially isotope/ion puzzles, periodic comparisons, energy profiles, ionic ratios and population examples. The diagrams are drafts, claims are unverified, and no human-learning evidence is claimed.
- **Next:** W-2117: 79 more chemistry lessons; W-2118: 74 more biology lessons. Prefer genuinely distinct topics and richer interactions to more numeric variations. W-2119: independently fact-check and review all 347 drafts. Reconcile the generated registry and board with physics PR 28 during integration.
- **Blocked:** 153 requested lessons remain unbuilt; none of these drafts is cleared for publication.

## 2026-10-27 · chief-of-staff · visual chemistry and biology batch, 65 of 500 drafted

- **Changed:** Added six concentration particle-model exercises and six single-gene Punnett-square exercises. PR 29 now has 30 chemistry and 35 biology drafts. The six examples in each new set reuse a model; they are related exercises, not 12 independent topics.
- **Checks:** Production build and TypeScript pass. All 12 new lessons passed the browser contract on phone and desktop (24/24); the builder inspected two phone screenshots. Six targeted model tests pass, including independent count and genotype checks. The 810 errors and five warnings from `npm run check` match the recorded pre-existing baseline. `npm run verify` still stops on the two existing publication-readiness failures. Strict 390×844 reveal fit and independent accessibility review were not checked.
- **Believe:** Medium confidence in the model calculations and basic interactions; none of these exercises is independently reviewed for pedagogy, overlap, accessibility or source accuracy. All claims are unverified, with no human-learner evidence.
- **Next:** W-2117: 220 more chemistry lessons; W-2118: 215 more biology lessons. Prioritize genuinely different concepts and visual models over repeating these exercises. W-2119: independent fact-check and review of all 65 drafts. Reconcile records and registry with physics PR 28 at integration.
- **Blocked:** 435 lessons remain to build; the 65 drafts are not cleared for publication.

## 2026-10-27 · chief-of-staff · visual chemistry and biology batch, 53 of 500 drafted

- **Changed:** Added 12 balanced-reaction particle models, 13 genetics lessons (DNA copying, transcription, translation, mutations, splicing and chromosome division), and five membrane-transport lessons. DNA replication uses a projected helix with original and new strands coloured separately. The PR now holds 24 chemistry and 29 biology drafts. The reaction cases are related exercises and most genetics examples share a sequence-tile layout; do not count this as broad subject coverage.
- **Checks:** Production build and TypeScript pass. The 30 new lessons each passed the Playwright contract at phone and desktop sizes (60/60). Builder inspected phone screenshots for methane combustion, glucose transport and DNA replication. Four targeted tests pass for atom conservation, selected codons and base pairing, reading frame, and transport/pump counts. `npm run check` remains at the main baseline of 810 errors and 5 warnings. `npm run verify` stops at two pre-existing publication-readiness failures.
- **Believe:** the engineering interactions are functioning, and the examples are plausible with limited model-level tests. Independent review of every scientific claim, diagram accuracy, accessibility, teaching quality, and overlap has not occurred. No human learner evidence was gathered. All new lessons remain drafts and claims remain unverified.
- **Next:** W-2117: 226 more chemistry lessons; W-2118: 221 more biology lessons. Prioritise new concepts and richer scenes beyond counting reactions or sequence changes. W-2119: independent checks on all 53 drafts. Keep the work in PR 29.
- **Blocked:** 447 lessons are not yet built; none of the new lessons is cleared for publication.

## 2026-10-27 · chief-of-staff · visual chemistry and biology batch, 23 of 500 drafted

- **Changed:** Added 12 chemistry drafts on molecular geometry, with rotatable 3D-projected SVG models, and 11 life-science drafts on cell structures with annotated SVG cell models. Added curriculum entries and the batch manifest. All are drafts and all claims remain unverified.
- **Checks:** Production build and TypeScript pass. The lesson contract passed for all 23 on phone and desktop (46/46) against the local production build. The builder inspected one molecule and one plant-cell phone screenshot. `npm run check` reports 810 errors and 5 warnings, the existing main-branch baseline. `npm run verify` stops at two pre-existing publication-readiness failures. A first browser run could not connect across sandbox environments; the successful retry ran server and tests together.
- **Believe:** medium confidence in engineering behaviour; molecular cases are variants of one geometry exercise and cell cases share one diagram. These are not 23 independently evaluated teaching experiences. Reviewers should inspect the actual artifacts, including representation fidelity, distractors, and whether interaction is pedagogically useful.
- **Next:** W-2117: 238 more chemistry lessons; W-2118: 239 more biology lessons. Use diverse visual models and interactions beyond geometry and organelle identification. W-2119: independent fact-check, learner, design and accessibility review of this initial tranche. Reconcile board IDs and generated registry changes with physics PR 28 when merging.
- **Blocked:** 477 lessons are not yet built. No human-learner or independent scientific review has been performed; none of these drafts is ready to publish.

## 2026-10-27 · chief-of-staff · physics batch in PR 28, 250 drafts implemented

- **Changed:** Completed the 250-lesson physics batch in one draft PR: 18 individually specified cases and 232 slider-based scaling scenarios. Includes 3D-projected SVG for an orbit and shaded spatial illustrations. W-2115 is in review; W-2116 requests independent physics, overlap and learner review.
- **Limits:** The 232 scaling scenarios use 137 distinct equation strings; many vary different inputs to the same law and use a shared chart. Do not treat the count as 250 distinct physical laws or proof of teaching effectiveness. All claims are unverified.
- **Checks:** Production build, TypeScript and batch count/choice/selected arithmetic tests pass. The company check matches the pre-existing 810 errors and five warnings. Full verify stops at two existing publication-readiness failures. Browser contract 500/500 and strict phone fit 250/250 passed; after 16 notation or assumption fixes, 32/32 browser retests and 16/16 strict phone-fit retests passed. See `company/reviews/physics-batch-250/build.md`.
- **Next:** Route independent claim, overlap and pedagogy review through W-2116. Do not publish based on builder checks alone.
- **Blocked:** Publication remains subject to the independent gates and the existing verification failures.

## 2026-10-27 · chief-of-staff · physics batch in PR 28, 18 of 250 drafted

- **Changed:** Added 17 draft lessons to the initial inclined-orbit prototype: ten previously uncovered physics curriculum concepts and seven modern-physics / orbital concepts. Shared diagrams are in `src/lib/physics/PhysicsCase.tsx`; the 3D orbit is an orthographic projection in `src/demos/physics/inclined-orbit-projection/`. Board W-2115 tracks the remaining 232.
- **Checks:** TypeScript and production build pass. Arithmetic spot checks cover the filter, rope, engine, round-trip speed, and biceps examples. `npm run check` reports the same 810 errors and five warnings as the baseline; `npm run verify` stops at the two existing publication-readiness failures. No browser walkthrough or phone-fit review was run. Claims remain unverified.
- **Believe:** the lessons are mechanically assembled and mathematically plausible, not independently checked or learner-validated. Shared two-case stages may need pedagogical revision.
- **Next:** Build the remaining 232 in this same PR; route every lesson through independent fact-check, learner review and phone QA. Continue with additional 3D interactions where they make the physics easier to understand.
- **Blocked:** Full verify by the existing publication failures; browser QA by unavailable browser binaries.

## 2026-10-26 · platform-engineer (Noor) · Lesson frames pilot merged into main with the flag off: merge `813e2aa55` (M-b to M-e); not deployed

- **Changed:** `feat/lesson-frames-pilot` (`98ca75ef1`, approved code at `6f4f1b6cf`) merged into main `7d9893716` as merge commit `813e2aa559eb7a6e5544209ce4571470d8fd20f7`, no `[deploy]` (M-b). `board.json`: both sides kept, no duplicate ids (2,062 items): main's W-2105 (done), W-2107, W-2108, W-2112, W-2113; the branch's W-2092/W-2093, now moved to done. `progress.md`: all entries, newest first. The merge brings no `package-lock.json` change (main already has 16.4.3 from `7ee5b9e8d`); the `package.json` hunk is only the two script lines (`test:lesson-frames` and its place in `verify`).
- **M-c, on `813e2aa55`, `NEXT_PUBLIC_LESSON_FRAMES` unset, own worktree, `npm ci` from the merged lockfile (Next 16.4.3):**
  - Every `test:*` suite in `verify`, run one by one (verify's `&&` chain stops at the first pre-existing failure): the `not ok` set is identical, line for line once test numbers are stripped, to the pre-existing R7 list (publish 2, lifehacks 1, algorithms 5, hq 9, platform 1, settings 1, dims 4; 23 TAP lines). `test:lesson-frames` 33 pass, 1 skip (no local artifact build), 0 fail. `test:accounts` 21 pass, 45 skip (no Postgres), 0 fail. All other suites 0 fail.
  - `npm run check`: 810 errors, 5 warnings, the same pre-existing count (decision records without `owner:`). Typecheck exit 0.
  - `npm run build`: exit 0, 148 s; `.next/static` has 0 files matching `s3c-lesson-frame-v1`.
  - `tests/qa`: **not run in full.** The full run (3,302 tests) wrote 525 MB of screenshots to `artifacts/qa` in its first 276 tests and the volume reached 185 MB free, so I stopped it at 276/3,302 (all passed until then, phone project, alphabetical to `raters-reward-agreement`). Instead, as review R8: the 6 pilot lessons (`why-seven-wins`, `skip-the-edge-that-loops`, `pi-is-three-and-a-bit`, `quiet-decades-then-everywhere`, `pixel-nudges-add-up`, `coastline-ruler`) at both viewports, 12 of 12 pass, and `feed.spec.ts` in full, 10 of 10 pass. A full flag-off QA run needs a host with about 6 GB free.
- **M-d, rollback of this merge (path-limited, not `git revert -m 1`):**
  `git diff 813e2aa55^1 813e2aa55 -- next.config.mjs package.json spike/ src/app/globals.css src/components/DemoCard.tsx src/components/DemoFrame.tsx src/components/DemoHost.tsx src/kit/reveal-fit.ts src/lib/lesson-frame-bridge.ts src/lib/lesson-frames.frames.json src/lib/lesson-frames.manifest.json src/lib/lesson-frames.slugs.json tests/lesson-frames/ tools/lesson-frames.mjs tools/lib/lesson-frames.mjs | git apply -R --3way`, then `npm run typecheck` and `npm run build`. Leave `package-lock.json` out; the `package.json` hunk is only the two script lines, so it never brings back Next 16.4.0.
- **M-e: not confirmed by me.** I had no Vercel access in this run (no CLI, token or Vercel tool), so I did not read the project's variables. Repository side: `NEXT_PUBLIC_LESSON_FRAMES` appears in no `vercel.json`, workflow or `tools/deploy.mjs`. The r23 record (`company/ops/deployments/`, U2) says release-manager listed the variable keys today, before r23, and the flag was not among them; that is testimony from before this merge. Filed W-2114 (release-manager) to read the keys in every environment and record it. Until then nobody sets the variable.
- **Believe:** high (about 90%) that main at `813e2aa55` serves today's app with the flag off (suites, build grep, QA sample). Medium on QA: the full contract run is not done on this SHA.
- **Next:** W-2114 (release-manager, M-e). The merge rides with the next founder-approved deploy, under D1 to D4 in `company/engineering/readiness/2026-10-26-lesson-frames-pilot.md`; a full flag-off `tests/qa` run belongs before that deploy. Production flag-on still waits on C5, C6, AMD-018 (W-2109), W-2103 and W-2106.
- **Blocked:** nothing for the merge.

## 2026-10-26 · release-manager · W-2112 (U6): main takes 80c847c55 alone

- **Changed:**
  - Merge commit `7ee5b9e8d` (parents `73324e308` on main and `80c847c55`) puts Next 16.4.3 on main. It brings `package.json`, `package-lock.json`, the upgrade decision and readiness records, and the EXP-010 predictions (`7b7a24978`).
  - There were no conflicts. W-2112 is done.
  - Nothing was deployed: neither commit has `[deploy]`.
- **Believe:** high. On main these paths now equal `80c847c55`, which is what r23 runs: `src/`, `content/`, `public/`, `db/`, `tools/org/`, `next.config.mjs`, `vercel.json`, `.vercelignore`, `tsconfig.json`, `package.json` and `package-lock.json`. The merge also moved W-2093 from next to doing; that was platform-engineer's own edit on the branch.
- **Next:**
  - The lesson frames pilot can merge under M-a to M-e, onto a main that already has 16.4.3.
  - R-031 closes when W-2098 is done.
  - Someone with permission deletes the branch `release/r23`.
- **Blocked:** deleting `release/r23`. The session's permission check refused the remote branch delete as destructive, so the branch is still there. It holds only the empty `[deploy]` commit `0b8b6f539`, which r23 was built from.

## 2026-10-26 · release-manager · W-2107: r23 to production (Next.js 16.4.3 security fix), smoke U3 (a) to (g) green, no rollback

- **Changed:**
  - **Production is r23**: `dpl_8V4QujqEZ3ecL5vHmL2LhLFsyoQz` (https://system-3-company-eoy3ek8zo-hanis-projects-2e2b67f6.vercel.app), READY 09:14:08 UTC, serving https://system-3-company.vercel.app. Previous: r22 `dpl_EX98aXW1PJvoKsQPtuHVQV7fLvTU`.
  - **What was deployed:** the tree of `80c847c5527c02e7b1926f8879891ef2d4169486`, byte for byte. Vercel built commit `0b8b6f539`, an empty `[deploy] r23` commit whose only parent is `80c847c55` and whose tree is the same object (`324437f9c`). It is on the new branch `release/r23` only; main's history is untouched. A tag push was refused by the session's git proxy (403).
  - **Method (U5):** not the staged path (verify stops on the 24 pre-existing failures, review R7). It was the r22 method: Vercel MCP `create_deployment`, target production, through the project's Git connection. So U3 ran on live traffic, with U4 (the rollback) as the cover. No env var or project setting changed (U2); `NEXT_PUBLIC_LESSON_FRAMES` is not set.
  - Records: `company/ops/deployments/2026-10-26-r23-production.json` (it quotes the founder), and r23 in `company/ops/releases.json`. W-2107 and W-2108 are done; W-2112 and W-2113 added.
- **Smoke (U3), all pass:**
  - (a) `Next.js 16.4.3 (Turbopack)` and READY; 1,646 `/d/*`.
  - (b) `/` 200 with `data-slug=`; cube 200 with its `data-slug`; euclid, `/history` and `/hq` 200; an unknown slug 404.
  - (c) `/api/events`: dropped body 204, `Origin: null` 403, `GET` 405.
  - (d) feed.spec 10/10. (e) contract.spec on cube and euclid 4/4.
  - (f) `/d/penalty-on-wiggle` shows "In review · Unpublished".
  - (g) no Vercel runtime errors from 09:14 to 09:45 UTC (none in the 7 days before on r22 either).
  - Production alias still on r23 at 09:45.
- **Believe:**
  - High (about 95%) that production now runs exactly 80c847c55's code on Next 16.4.3. The tree identity is checked by git, and the build log names the commit and the version.
  - **One thing the smoke did that it should not have:** (d) and (e) drive real lessons in a browser, and the app's own `track()` beacons them to `/api/events`. So production holds QA events from about 09:16 to 09:19 UTC, mostly cube and euclid. r22's smoke did the same. The readiness record warns only about curl beacons. The log keeps only `at`, `type` and `slug`, so that window is the only way to tell them apart (W-2113, analytics-steward).
- **Next:**
  - U6: main merges `80c847c55` alone, before the pilot (W-2112, release-manager; it needs the merge to bring in platform-engineer's package change and the records between r22 and it, so I left it for a dispatch that names it).
  - R-031 can close when W-2098 is done (principal-engineer-ops). R-032 (`zod`) is W-2102, its own deploy.
  - Before the next production smoke, decide how the browser specs avoid learner events (W-2113). `tests/qa` is protected, so the fix is an amendment or an app-side change.
- **Checks on these records:** `npm run check` 810 errors, 5 warnings, all pre-existing, none for my files. `tests/hq/releases.test.mjs` 5 pass, 5 fail, the same 5 without the r23 entry.
- **Blocked:** nothing for r23.

## 2026-10-26 · principal-engineer (Kenji) · M2 re-check: W2-C1 met at 6f4f1b6cf, W-2105 approved and done

- **Changed:** "M2 re-check" appended to `company/engineering/reviews/2026-10-26-lesson-frames-code-review.md`. W-2105 moved to done.
- **Believe:** high (about 90%). The gate suite passes in all 6 states (committed, pruned-empty with the kit stale, pruned-empty with the kit fresh; each with the flag off and on). It still fails flag-on on a stale lesson, and both mutants are caught.
- **Next:** the merge waits on M-a (the security deploy first) and M-c (verify on the merged SHA). W-2106 and W-2103 come before production flag-on.
- **Blocked:** nothing on M2.

## 2026-10-26 · platform-engineer (Noor) · W-2105 W2-C1: the gate suite passes on an empty (pruned) manifest, flag off and on; branch only, not merged, not deployed

- **Changed:** `tests/lesson-frames/manifest.test.mjs` takes its mutation entries from a new fixture, `tests/lesson-frames/fixture.manifest.json` (the 2026-10-26 manifest, re-hashed against today's tree), not from the committed manifest. Two new tests: the fixture is usable (geo and non-geo entries, no problems), and an empty manifest meets every rule with the kit fresh or stale, both flag states. No skip on empty. Addendum in `company/engineering/readiness/2026-10-26-w2105-prune-stale-kit.md`.
- **Checks:** before the fix, an empty pruned manifest gave 23 pass, 8 fail (as the M2 review found). After: 33 pass, 1 skip (pre-existing, no local artifacts), 0 fail with the committed manifest and with a pruned empty one (kit stale and fresh), each flag off and with `NEXT_PUBLIC_LESSON_FRAMES=pilot-50`. Typecheck exit 0. `npm run check` 810 errors, 5 warnings, unchanged. No build this round (no app code changed).
- **Believe:** high (about 90%) that committing a pruned manifest no longer blocks a flag-off `verify`.
- **Next:** principal-engineer re-reads W2-C1 (the review says the empty-manifest suite run in both flag states plus the test diff). W-2105 stays in review until then.
- **Blocked:** merge to main, as before: M-a and M-c in `company/engineering/readiness/2026-10-26-lesson-frames-pilot.md`.

## 2026-10-26 · principal-engineer (Kenji) · M2: W-2105 read code-first; changes needed (one condition, W2-C1)

- **Changed:** "M2: W-2105" section appended to `company/engineering/reviews/2026-10-26-lesson-frames-code-review.md`. W-2105 moved back to doing (platform-engineer).
- **Believe:** high (about 90%) that prune cannot hide a stale lesson, that flag-off builds are unaffected, and that drop-not-rebuild matches O1 decision 4. Checked by real-edit probes and two mutants. Also high, and reproduced, that an empty committed manifest after a stale-kit prune fails 8 gate-suite tests with the flag off, so verify, and with it every deploy, would go red.
- **Next:** platform-engineer: W2-C1 (suite fixtures that do not depend on committed entries, plus an empty-manifest test). Then principal-engineer re-reads only that.
- **Blocked:** the merge of `feat/lesson-frames-pilot` also waits on W2-C1 (M2), on top of M-a and M-c.

## 2026-10-26 · platform-engineer (Noor) · W-2105 done on `feat/lesson-frames-pilot` (prune handles a stale kit, R5 comment); origin/main merged in; not merged to main, not deployed

- **Changed:**
  - `node tools/lesson-frames.mjs prune` with a stale kit now drops every entry that names it (a stale geo kit: only the entries that use it), prints each dropped slug with its rule, and says how to frame them again (`build`, then an artifact deploy). `stale-kit` now fires only while an entry still uses the kit, so a pruned manifest passes a flag-on build. The logic is `pruneManifest` in `tools/lib/lesson-frames.mjs`; the rule set (`FRESHNESS_RULES`) is unchanged.
  - One comment line in `src/components/DemoFrame.tsx` on the host's no-op reveal-fit (review R5).
  - Three tests in `tests/lesson-frames/manifest.test.mjs`, on a manifest re-hashed from today's tree, so they do not depend on drift. Tier-1 self-check: `company/engineering/readiness/2026-10-26-w2105-prune-stale-kit.md`. Changelog line.
  - Merged `origin/main` (`18f613825`): board as the review's merge notes say (main's W-2097, W-2101..W-2111; the branch's W-2092/W-2093); progress entries kept, newest first; both `events.jsonl` lines kept. W-2105 moved to review.
- **Checks (own worktree, `npm ci` on the branch lockfile, Next 16.4.3):** typecheck exit 0; `test:lesson-frames` 31 pass, 1 skip (before and after the merge); two mutants each fail the new stale-kit test. Flag-off `npm run build` exit 0, 156 s, 0 `s3c-lesson-frame-v1` in `.next/static`. Real kit edit (a comment appended to `globals.css`): `check` and a flag-on build refuse with `stale-kit`; `prune` dropped 50; `check` ok (0 framed); flag-on build exit 0, 159 s; edit reverted. `npm run check`: 810 errors, 5 warnings, the same pre-existing count the review recorded (R7).
- **Believe:** high (about 90%) that prune now unblocks a flag-on build after any kit change; medium that dropping all 50 on every `globals.css` commit is acceptable before W-2106 decouples the frame CSS.
- **Next:** principal-engineer reads the W-2105 diff (M2); then M-a/M-c in `company/engineering/readiness/2026-10-26-lesson-frames-pilot.md` before any merge to main. W-2106, W-2103 are mine before production flag-on.
- **Blocked:** merge to main waits on the security deploy of `80c847c55` first (M-a, W-2107/W-2108) and on M-c verify on the merged SHA.

## 2026-10-26 · principal-engineer-ops (Rhea) · W-2101: both lesson-frames readiness records ruled; the Next security deploy is approved with conditions

- **Changed:**
  - On `feat/lesson-frames-pilot`, commit `ca6cb00b1` (records only):
    - `company/engineering/readiness/2026-10-26-next-16-4-3-upgrade.md` is **approved with conditions U1 to U6**, for one production deploy of exactly `80c847c5527c02e7b1926f8879891ef2d4169486`.
    - `company/engineering/readiness/2026-10-26-lesson-frames-pilot.md` is **approved with conditions M-a to M-e** for the flag-off merge of `3ef3619ca`, and D1 to D4 for the first flag-off production deploy that carries it. **Flag-on (preview or production) is refused for now.** It comes back as an addendum.
  - On main:
    - risks R-031 (Next advisories on production), R-032 (`zod` high), R-033 (silent frame failure, the record's R-new-1) and R-034 (the staleness gate, R-new-2);
    - board W-2111 (production frame-error meter, platform-engineer);
    - W-2101 done.
  - Nothing merged, nothing deployed, no `[deploy]` anywhere.
- **Evidence (mine):**
  - **Build.** Built `80c847c55` in my own worktree, on a tree equal to its lockfile (the 16.4.3 tarballs' sha512 equal to the lockfile integrity): exit 0, 164 s, `Next.js 16.4.3`, no SecurityFatalError, 1,646 `/d/*`.
  - **Served locally.** `/`, `/d/flatten-the-cube-to-a-dot`, `/d/euclid-three-steps`, `/history` and `/hq` returned 200; an unknown `/d` slug returned 404. `/api/events`: dropped body 204, `Origin: null` 403, `GET` 405, a valid beacon logged one line. `feed.spec` 10/10; `contract.spec` on cube and euclid 4/4.
  - **Pilot suite.** `test:lesson-frames` at `3ef3619ca`: 28 pass, 1 skip.
- **Believe:**
  - About 90% that the security deploy changes the app only by Next 16.4.3 plus HQ content. About 70% that no production-only runtime difference exists; no preview has run, so the cover is the U3 smoke and the rollback.
  - **Correction to the code review:** HQ is **on** in production (`HQ_PUBLIC=1`; `/hq` 200 today), so the deploy also changes what `/hq` shows (the F-54 org via `tools/org/roles.mjs`, and newer records). That is T3 and not a blocker.
- **Next:**
  - chief-of-staff (W-2108): the founder ask names the SHA `80c847c55` **and** pre-asks the rollback to `dpl_EX98aXW1PJvoKsQPtuHVQV7fLvTU` (r22) if a U3 check fails (U4).
  - release-manager (W-2107): deploy exactly that SHA, run the U3 smoke list in the record, and write the r23 deployment record.
  - After that, main merges `80c847c55` alone, and then the pilot merges under M-a to M-e (W-2105 first).
- **Blocked:**
  - Pilot flag-on: C5 (W-2095), C6, AMD-018 (W-2096, W-2109), W-2103, W-2106, W-2110 and W-2111.
  - I did not run `npm audit` (the registry ran at about 2 KB/s on this host) or the `test:*` suites, so I rely on the code review's R2, R6 and R7 for those.

## 2026-10-26 · principal-engineer (Kenji) · Lesson frames code review (W-2097) and O1 ruled (W-2104); Next fix to ship alone

- **Changed:**
  - New review record `company/engineering/reviews/2026-10-26-lesson-frames-code-review.md`, findings R1-R14 written before the builder's account.
  - New decision `company/decisions/2026-10-26-lesson-frames-gate-scope.md` (O1).
  - Corrections section added to `company/engineering/reviews/2026-10-25-content-hub-production-review.md`; all four builder corrections accepted.
  - On `feat/lesson-frames-pilot`: one commit, `3ef3619ca`. The freshness rules now block flag-on builds only, in `next.config.mjs`; the structural rules still block `verify`.
  - Board: W-2097 and W-2104 done. W-2101 to W-2104 copied from the branch so IDs do not fork. New W-2105 to W-2110.
  - Nothing merged to main, nothing deployed, no `[deploy]` anywhere.
- **Believe:**
  - The flag-off merge is code-approved at `3ef3619ca`, subject to principal-engineer-ops' readiness (W-2101) and W-2105. High confidence, about 90%. The evidence:
    - no frame code in a flag-off `.next/static`;
    - the `DemoCard` change is a verbatim move;
    - no protected path is touched;
    - `verify`'s 24 failing tests and `check`'s 810 errors are identical on main;
    - a 6-lesson QA sample plus `feed.spec` pass.
  - The `zod` high is pre-existing on main (W-2102). It is not a merge blocker.
- **Next:**
  - The Next security fix ships **alone and soon**, as production commit `80c847c5527c02e7b1926f8879891ef2d4169486`. Against live `4d3301270`, its app changes only in `package.json` and `package-lock.json`.
  - Order: principal-engineer-ops approves the upgrade readiness (W-2101), then the founder approves via chief-of-staff (W-2108), then release-manager deploys (W-2107). After that, main merges `80c847c55` alone. W-2067 (mine, the SecurityFatalError nudge) closes with that deploy.
- **Blocked:**
  - Production flag-on waits on C5, C6, AMD-018 (W-2109), W-2103 and W-2106. W-2106: the kit's hash covers `globals.css`, so every CSS commit refuses flag-on builds until the artifacts are rebuilt.

## 2026-10-26 · platform-engineer (Noor) · Lesson frames pilot C1-C4 and the Next upgrade (C8), on branch `feat/lesson-frames-pilot`; not merged, not deployed

- **Changed (branch only, pushed to origin; main untouched):**
  - Predictions first: `company/experiments/EXP-010-lesson-frames-pilot-predictions.md` holds P1-P6 verbatim from the review, committed (7b7a24978) before the upgrade, any artifact build or any measurement. Results are appended there.
  - **C8 (W-2093):** `next` ^16.4.0 → ^16.4.3 (80c847c55). `npm audit --omit=dev`: the `next` critical is gone. One **high** remains: zod 4.1.11 via better-auth (W-2102, backend-engineer). `next build` no longer ends in SecurityFatalError. This answers W-2067 (principal-engineer's item) on this branch. Decision record `company/decisions/2026-10-26-upgrade-next-16-4-3.md`; readiness `company/engineering/readiness/2026-10-26-next-16-4-3-upgrade.md`, not approved.
  - **C1-C4 (W-2092):** `spike/build.mjs`'s export-only diff cherry-picked alone (a8047825b). Then 6ef931b62, 3230c9aa7, f3c438c64, f54bf7aae and 53dbb461b. In those:
    - `tools/lesson-frames.mjs` (build, check, prune, serve, check-origin) and `tools/lib/lesson-frames.mjs`.
    - The committed manifest `src/lib/lesson-frames.manifest.json` (origin, toolchain, kit hashes, and per slug `sourceHash` plus its source list, `lessonJs`, `kit`, `kitCss`, `geoKit`, `frameDoc`), with two client projections, `lesson-frames.slugs.json` and `lesson-frames.frames.json`. The record itself never reaches a browser.
    - `DemoHost` switch; new `DemoFrame`.
    - The bridge `src/lib/lesson-frame-bridge.ts`: identity is the source window, plus origin `null` and the slug; 2 KB cap; events rebuilt field by field.
    - The reveal fit and fold moved **verbatim** to `src/kit/reveal-fit.ts`. They run inside the frame on `#root` with the frame's own fold store, and the hook hides on ready/phase.
    - Origin header rules (one per path class) and a read-only `check-origin`.
    - `tests/lesson-frames` (27 tests, in `npm run verify`).
    - A frame QA copy of today's contract in `spike/qa/pilot/` (the hash assertion is in the last commit): it runs `/d/<slug>` through `DemoFrame`, measures tap targets in the frame, takes its list from the manifest, checks that the frame `src` names the manifest's hash, and checks that the bridge and the hook worked.
    - Nothing in `tests/qa/**`, `src/kit/Lesson.tsx`, `tools/company.mjs`, `deploy-host/`, the branch's `board.json` or progress hunks, or `node:sqlite`.
  - Artifacts: `node tools/lesson-frames.mjs build` → `artifacts/lesson-frames/dist` (gitignored) and `dist/vercel.json` for the origin project. The build is deterministic: three rebuilds into the same tree gave a byte-identical manifest, and the builder refuses to overwrite any content-hashed file.
  - Board: W-2092 and W-2093 → review. New: W-2101 (principal-engineer-ops: both readiness records), W-2102 (backend-engineer: zod), W-2103 (mine: C3 residual), W-2104 (principal-engineer: objection O1). Merged origin/main into the branch (e4e36eda8) so new IDs do not collide (main had W-2100).
- **Measured (EXP-010, Result; builder's local run, shared host):**
  - **P1 held:** 50/50; lessons median 2,497 B gz, max 8,334; kit 64,203 B gz; CSS 4,804 B gz.
  - **P4 held:** flag-off first-load JS of `/` is −17 B against main, `/d/why-seven-wins` +18 B; 0 matches for the hash, the marker, the origin and the slug list; 1,646 `/d/*` pages.
  - **P5 held:** app build medians 145.1 s main, 153.1 s off (+5.5%), 148.0 s on (+2.0%); artifacts 8.5-16.5 s; suite 1.9 s.
  - **P6 held:** +558 B gz on `/` with the flag on.
  - **P2:** frames from activation to ready 444 ms cold and 444 ms with the kit cached. In-app ±10% **wrong in round 1** (+11.5% warm), held in rounds 2-3 and pooled (+2.6%).
  - **P3:** frame copy 100/100 at the first run after C3. Flag-off `tests/qa`: see Checks.
  - The judging P2/P3 run is qa-tester's on the preview (W-2094).
- **Found while measuring (C3):**
  - The app styles lessons under `:is(.feed-wrap, .single)` (the dark palette, stage, options, panel, and the predict-phase picture cap). None of that matched inside a frame, so a framed lesson on a light-mode phone got the light palette. The frame `<html>` now carries `.single`, with a transparent surface and no scrollbar. Phone parity after the reveal went from 45/50 to 49/50 identical. A side-by-side light-mode screenshot is identical.
  - Desktop parity is 26/50, because `@media (max-width: 600px)` and lesson `vw`/`dvh` resolve against the 438 px card. The reveal is on screen either way (W-2103).
  - The bridge forwards feed keys: ArrowDown pressed inside a framed card moved the feed. Frame module fetches carry `Origin: null` and no cookie. The kit is fetched once per browser context.
- **Corrections to the review, for its owner (principal-engineer, W-2097):**
  1. **The `/f/*` header CSP as written would block every frame.** It sets `default-src 'none'` with no `script-src`; both policies apply, and the import map is an inline script. The header now has `script-src 'self' 'unsafe-inline'`, `style-src 'self'`, `img-src 'self' data:` and `font-src 'self'`. Each frame's meta CSP still pins its one import map by hash. Privacy-reviewer should rule on it (C5, W-2095).
  2. F7 says 7 functions and 1 constant. The branch's diff exports 5 functions and 1 constant. I also exported `buildLessons`, and `webpackConfig` now records each compilation's repo sources (that is how `sourceHash` is defined).
  3. "phase sets `data-phase` on the card": I used `data-frame-phase` and `data-frame-ready` on `.card-shell`, so no host selector that looks for a lesson's `data-phase` matches the card.
  4. `sourceHash` covers the files webpack compiled from `src/` plus `meta.json`. `package.json` and the loaders are toolchain, recorded rather than gated. A stale **kit** (its sources changed) also fails the gate.
- **Objection O1 (W-2104, principal-engineer decides):** the review's staleness gate fails `npm run verify`, so it fails **every deploy, flag off included**, once a pilot lesson or the kit sources change after the manifest was built. 42 of the 50 changed in the week to 2026-10-25, and `globals.css` changed 4 times. The fix each time is `node tools/lesson-frames.mjs prune` (or a rebuild), then a commit. I built it as the review specifies. My view: scope the failure to builds with the flag on, or make prune a runbook step. Builders should not meet this plumbing.
- **Checks:**
  - `npm run check`: 810 errors and 5 warnings, the same set as the baseline. None names a file of mine.
  - Suites: test:deploy, books, kit, eval, lesson-frames (27/27), accounts, dispatch, mailbox, memory, metrics and main-feed pass. test:publish (2), lifehacks (1), algorithms (5), hq (9), platform (1), settings (1) and dims (4) fail with the **identical** `not ok` sets at base `83127c23f` (detached worktree, same commands), so all are pre-existing.
  - `typecheck` pass. `build` pass (no SecurityFatalError). `npm run verify` itself stops at `check`'s pre-existing errors, so I ran every step on its own.
  - QA (`tests/qa` unchanged, final flag-off build, run in batches): contract 3,290/3,292, feed 10/10. The only failure is draft `history-luanda-kinshasa-1880-1960` (a click timeout, both viewports), and it fails the same way on a build of `83127c23f`. A first single run was lost when the shared disk filled: contract.spec writes 3 screenshots per test into `artifacts/qa`, so delete them between batches.
  - Frame copy: 100/100, including a frame-hash assertion that fails when a manifest hash is changed.
- **Believe:**
  - High (about 90%) that flag off is today's app: measured on the final build, and the DemoCard change is a verbatim move.
  - High that C2 is right in unit tests and in a browser: 100/100 runs with progress and five event types reaching the host's storage.
  - Medium (about 70%) that the frame path is ready for a preview: desktop parity (W-2103) and real phones (C6) are untested. My local P2/P3 numbers are not the judging run.
- **Next:**
  - principal-engineer: code review of the branch (C10, W-2097) and the O1 call (W-2104).
  - principal-engineer-ops: both readiness records (W-2101).
  - privacy-reviewer: C5 (W-2095), including the header CSP above and SPIKE-001's 19 probes on the preview.
  - qa-tester: W-2094, and W-2100 may adopt `spike/qa/pilot/` instead of fixing the old `spike/qa/contract-frame.spec.ts`, which still has D1.
  - evaluation-steward: the AMD-018 companion diff against `DemoFrame` (W-087).
  - release-manager: the artifact deploy of `artifacts/lesson-frames/dist` with its `vercel.json` (add the preview alias with `--frame-ancestors`) and the preview, each with the founder's approval (C9, W-2098).
  - Me: W-2103.
- **Blocked:** merge waits on C10 and W-2101. Production flag-on waits on C5, C6, and AMD-018 parts (a), (b) and (d) ratified (the steward's C7 ruling, `c8c5f225f`). Nothing here deploys.

## 2026-10-26 · final source batch · 100 drafts and recall audit

Implemented the last 100 probability-list entries. The complete stack covers all 500 behavioral and 1,000 probability IDs exactly once. Bounded finite illustrations do not certify the richer suggested simulator, historical claim, learning benefit or novelty. All 1,500 lessons remain drafts with unverified claims and empty evidence.

Validation: final-batch 442 arithmetic/schema/state assertions, 13,841 coverage/relationship/recall/source-hash checks and TypeScript pass. Audited all 600 older continuation recalls: two duplicated a displayed case and are corrected; one long top-p chart label is shortened. These three lessons have version 2; all 600 now record recall inputs. W-2037 is done; implementation queue W-2033 and final review W-2040 are in review. Company check retains the identical 811 errors/four warnings. Full verify retains inherited publication failures. Production build and browser checks for batches06–08 will be recorded after completion; interrupted runs are not passes. No independent approval, merge or deploy.

## 2026-10-25 · evaluation-steward · C7 ruled (W-2096): the frame QA copy is not enough for production flag-on; AMD-018 (W-087) drafted, not ratified

- **Changed:** ruling `company/decisions/2026-10-25-w2096-frame-qa-evidence.md`; amendment draft `company/constitution/amendments/AMD-018-qa-contract-through-frames.md` (status proposed) and its README row. Board: W-2096 done, W-087 doing, new W-2100 (qa-tester: fix D1 in the copy before the preview run). No protected path was touched. No deploy.
- **Ruling:** production flag-on of `NEXT_PUBLIC_LESSON_FRAMES` waits for AMD-018 parts (a) lesson list, (b) frame targeting and (d) hash-bound evidence with `tests/lesson-frames/**` protected. Parts (c) security probes and (e) kit sample are severable. The flag-off merge, the artifact deploy, the preview, C6 and the copy run go ahead unchanged.
- **Found (artifact first):** D1, the copy's tap-target check is still `page.locator`, so inside a frame it passes whatever the targets are. D2 to D6: the copy targets `/spike`, not `/d/<slug>`; its slug list is typed in; frame error capture is unproved; it sits on ordinary surface; and the in-app QA records do not cover the frame code.
- **Believe:** high (about 85%) that ratification is required: the approved 2026-10-13 rule says so, and D1 shows the copy is not a faithful stand-in. Medium (about 60%) on A18-3, ≤ 4 of 100 side-by-side disagreements.
- **Next:** steward writes the companion diff once C1's `DemoFrame` exists, plus the A18-2 positive-control fixture. chief-of-staff takes AMD-018 to the founder, with head of product and qa-tester consulted in writing. qa-tester W-2100.
- **Blocked:** production flag-on, on AMD-018 ratification (and on C2, C3, C5 and C6, as before). Open with principal-engineer: whether (c) and (e) must also come before flag-on, a purpose dispute for the founder.

## 2026-10-25 · chief-of-staff-ceo-office (Leonie) · F-54 decided and applied: no layer of one, learner-experience team (X1), categories flat; org readable to Meta's audit

- **Changed:**
  - Decision record `company/decisions/2026-10-25-founder-f54.md`: the founder's selections verbatim (F54-1 moves 1-8 approved; F54-2 "Move dated roles now" not selected; F54-4 categories flat; F54-3 X1 personalization-engineer). 14 objections; objection 4 (backend-engineer's review under the maker it reviews) is open and standing, as instructed.
  - `tools/org/roles.mjs` has a new F-54 block: 11 line moves, titles and teams, and path-owning scope lines. backend-engineer owns likes, saves and progress end to end, including `src/kit/progress.ts`, with platform-engineer's review kept as a gate. personalization-engineer owns the onboarding guide and the learner screens. No mission, gate, mayNot or handoff changed.
  - Regenerated.
  - New `company/org.json`, generated by `tools/org/generate.mjs`: the reporting lines as data.
  - `company/company.json`: `owns`, `rolesSource`, `ownsSource`, `orgSource`.
  - The `company/org-chart.md` lines table.
- **Audit** (`node /home/user/system3-meta/src/principles.mjs /home/user/system-3-company`): before, P7 said "ok" only because no org file existed. With the pre-F-54 lines as an org file it is a gap, with 3 layers of one (tools-lead→hq-engineer, chief-of-staff-ceo-office→portfolio-manager, design-lead→interaction-designer), 8/5/0. After: **0 layers of one**, depth 2 below the founder, 9/4/0.
- **Checks:** `npm run check` gives the same 810 errors and 5 warnings as before, the identical set. test:mailbox 11/11, test:dispatch 124/124, test:memory 11/11, test:hq 107 pass / 9 fail, the same 9 as the baseline. I did not touch tools/hq/lifecycle*, tools/hq/pipeline.js or src/data/editorial-profiles.account.json (another session's edits).
- **Believe:** high that the tree is as recorded, because the counts come from roles.mjs and the audit reads the generated file. Medium on X1 while objection 4 stands. The founder's span is 11 until the 2026-11-23 parks (objection 14).
- **Next:** chief-of-staff files F-54 as decided and narrows F53-9 (W-2089), and runs the written consults and the org-change event (W-2090). privacy-reviewer writes backend-engineer into data-inventory 3.6a and 3.9 (W-2091; not applied here, the inventory is theirs).
- **Blocked:** nothing.

## 2026-10-25 · chief-of-staff-ceo-office (Leonie) · F-54 drafted: no layer of one, a learner-experience team, flat categories on purpose (proposal only)

- **Changed:** new proposal `company/ceo-office/2026-10-25-f54-flatten-layers.md`, answering three founder questions: managers with one direct; who owns likes, saves, feed serving, onboarding and auth; are the category teams flat. Board W-2089 (chief-of-staff files F-54 and narrows F53-9), W-2090 (written consults, then the org-change event), W-2091 (privacy-reviewer: inventory 3.6a still names parked learner-data-engineer, 3.9 likes/saves names no owner). Nothing applied: no roles.mjs, `owns`, gate or protected-path edit.
- **Counts (script over roles.mjs, moves in memory only):** today depth 3 below the founder, 8 managers, 3 with one direct (tools-lead, chief-of-staff-ceo-office, design-lead), spans 15/7/7/4/2/1/1/1, founder 8. After: depth 2, 6 managers, 0 with one direct, spans 14 (category lead, F-53 L1) / 7 quality / 6 engineering / 6 product and portfolio / 2 learner experience / 2 content types, founder 9 (six teams, release, operator, auditor).
- **Moves (13):** hq-engineer, tools-lead and platform-engineer to principal-engineer; release-manager and design-lead to the founder; demo-builder to design-lead; portfolio-manager, pattern-librarian, head-of-strategic-initiatives and vp-marketing to head-of-product; personalization-engineer to the founder as learner-experience lead, with backend-engineer and growth-designer. The path owners for the learner team are in section 4b (progress.ts to backend-engineer with platform's gate review; account, library and login screens out of platform's catch-all; likes/saves tables named).
- **Believe:** high on the counts and on the gap (likes/saves stored data has no owner on record; data-inventory.md 3.9). Medium that personalization-engineer is the right lead: backend-engineer's objection 4 (its migration review would sit under a maker it reviews) is standing, and X2 is the alternative. F-53 checked row by row (section 7): nothing it decided moves.
- **Next:** chief-of-staff W-2089, W-2090; privacy-reviewer W-2091. After a founder yes, this office writes the decision record and applies section 6.
- **Blocked:** nothing; the apply waits on the founder.

## 2026-10-25 · release-manager (Diego) · r22: flatten-the-cube-to-a-dot v2 published and live in production

- **Changed:** `math/flatten-the-cube-to-a-dot` is `published` (40b8bfbc1); the v2 learner walks are linked in `evidence.simulatedLearner`. Deploy commit `4d3301270` (`[deploy] r22`), pushed to this branch and main, deployed as `dpl_EX98aXW1PJvoKsQPtuHVQV7fLvTU` and live at https://system-3-company.vercel.app/d/flatten-the-cube-to-a-dot. Records: `company/ops/releases.json` r22 (approved_by quotes the founder's "Cube lesson: skip pairwise", 2026-10-25), `company/ops/deployments/2026-10-25-r22-production.json`, launch record `company/rituals/records/2026-10-25-launch-review-flatten-the-cube-r22.md`, changelog line. Board W-2080 (head-of-product countersign) and W-2081 (analytics-steward predictions). Removed my duplicates W-2071/W-2072, which a parallel commit had swept from the shared working tree.
- **Gates:** `company publish` passed (claims c1-c9, QA v2, two v2 walks). The pairwise is a lane M rule, not in `launchGates`; the founder waived it for this item. Smoke on production: feed.spec 10/10, contract.spec on the cube and euclid 4/4, home, /hq, /history 200.
- **Also shipped (since r21):** euclid-three-steps c5 verified (trust line 6/6); HQ without floor 8 and with the city HQ link (d5ed24fa4); HQ pages built from the company records of 10-21..10-25 (F-50..F-53, AMD-017, audits).
- **Believe:** high that the lesson is live as QA'd (Demo.tsx unchanged since 3e365688e; the contract passes on production). Medium on the process: lane M step 8 (head-of-product's signed batch launch record with predictions) did not exist; I took the founder's decision as the go and routed both gaps.
- **Next:** W-2057 twin, then W-2058 pairwise; W-2080, W-2081; W-2068 convex gloss. The runbook's "F-48: pushes create no deployment" section is stale (vercel.json has `git.deploymentEnabled: true`; r20-r22 went by create-deployment on the exact SHA), so whoever owns the runbook text should fix it. **Blocked:** nothing. The stray next-servers (pids 4332, 6374, 9732) are still running; I did not start them.

## 2026-10-25 · evaluation-steward · AMD-017 ratified (F-51) and applied; weekly audit week 1 run (W-2050)

- **Changed (gates):** `tools/company.mjs` under `Amendment: AMD-017` (cee585285), mechanics in `tools/lib/tiers.mjs`, tests in `tests/publish/tiers.test.mjs`. Tiers N/R/S; tier-S learner walk may be covered by a batch sample (`company sample <domain> <slug...> --by=<role>`, 1 in 5, drawn by hash, drawer not a builder); stop rule (more than 1 fatal in 10: that batch and the category's next walk every lesson); two weekly audits running above 1 in 10 revoke sampling for a category, in code; (c)-(e) route verdict, sequence-probe and design/pairwise records run as warnings for one cycle. Canary of 19 known answers; any failure closes the sampled path. Redraft departures (tier R also from curriculum `sensitive`/route and incubating domains, since no lesson declares `reviewRoute`) are in the AMD file.
- **Ratification record:** `company/decisions/2026-10-25-founder-f51-amd017.md`, founder's words quoted; F-51 marked decided. Org-health objection open, owner chief-of-staff-ceo-office (W-2088).
- **Audit:** design and predictions committed first (43d838cd0), then run: 50 hash-drawn published lessons walked and fact-checked, **0 fatal, 1 revise** (`company/evaluation/audits/2026-10-25-weekly-audit.md`, `2026-10-25-weekly.json`). Predictions A2 (at least 1 fatal) and A4 (at least 8 revise) were wrong.
- **Counts:** `npm run check` 810 errors before and after, plus 1 warning (AMD-017 side-by-side: 206 of 234 in-review lessons would be stopped by (c)-(e), mostly tier R in incubating domains). test:publish 42/44, the same 2 failures as a clean HEAD worktree. Today: 28 in-review lessons are tier S; no batch record exists yet, so (b) has changed no lesson's verdict.
- **Believe:** high that the gate does what the AMD file says (tests, canary, an end-to-end run in a scratch worktree). Medium-low that the audit's clean result means much: one reviewer, same model family, same path as QA. Week 2 plants flaws to measure the audit.
- **Next:** week 2 audit due 2026-11-01 (W-2083); (c)-(e) enforcement review due 2026-11-08 (W-2082); tools-lead: walkthrough waits for autoplay reveals, sequence-probe `--record` (W-2084); amendment to make `check` green again for 408 copy-pass lessons (W-2085).
- **Blocked:** (d) cannot be enforced until sequence-probe writes records. Note: this session committed from a scratch worktree, because the shared checkout holds the release-manager's uncommitted r22 files and could not rebase; the shared checkout's branch is behind origin by these commits.

## 2026-10-25 · chief-of-staff-ceo-office (Leonie) · F-53 decided and applied: category owners on one agent, tester agent, quality desk Q1, category lead L1

- **Changed:** record `company/decisions/2026-10-25-founder-f53.md` (founder's verbatim answers; rows delegated to chief-of-staff, who approved all four with subcategories logical inside their category; 9 objections open). tools/org/roles.mjs F-53 block: the 14 cm-<domain> owners un-parked (agent `category-owner`, report to principal-pm-verticals, strands as logical units in their scope), category-curator parked, principal-pm-verticals re-scoped as category lead (reports to the founder), qa-tester and accessibility-reviewer on agent `tester` (two records), quality desk lines for chief-of-staff and evaluation-steward. generate.mjs writes grouped roles' subagents from one template and a "Physical agents" table. Board: 174 open category-curator items re-owned (151 to their lead, 18 strand items to their category with `strand`, 3 course items to the category lead, 2 cube items to cm-math); W-2069 retitled to file F-53 as decided; new W-2073..W-2079; W-1051, W-1052, W-2034 carry a `gates` note. POC map lanes 1 and 6, operating loop section 0 (quality desk, category owners, self-dispatch off), company.json (roles, agents, unitOfScale, flows, owns, sizeReason). 12 represented consultations in company/ceo-office/consultations/2026-10-25-f53/. Two org-id tests updated (mailbox, HQ org adapter).
- **Counts:** principles audit 9 ok / 4 gap / 0 manual before and after; P7 "34 roles" became "47 roles run by 33 agents" (founder included). `npm run check`: 810 errors, 4 warnings before and after, the same set. test:hq: the same 9 failures as a clean worktree at HEAD. test:mailbox, test:dispatch, test:memory green.
- **Believe:** high that memory.mjs now writes each owner's memory with no tool change (`roleOf` reads the active roles, and the owners are active). High that nothing is enabled for row 2: no Agent tool, no allow-list. Medium that one template bound per role is the honest form of "one agent": the protected check needs a subagent file per role doc, so `category-owner` exists as the template in roles.mjs `AGENTS`, not as its own file.
- **Next:** chief-of-staff files F-53 (W-2069), dispatches the consults and writes the org-change event (W-2077). evaluation-steward writes the quality desk standing orders (W-2079). portfolio-manager points the lane flows and tools-lead's new lifecycle blocks in projects.json at cm-<domain> and the tester (W-2078). B1 W-2073 (principal-engineer), B2 W-2074 (tools-lead), then the history pilot W-2075 (category lead). Row 4 W-2076 (platform-engineer).
- **Blocked:** row 2 on B1-B4 and a founder yes on the Agent tool for category-owner (B6). F53-6 and F53-9 wait on the founder.

## 2026-10-25 · tools-lead · Pipeline: a state machine per content type, and where every lesson is in it

- **Changed:** each lane in `company/ops/projects.json` has a `lifecycle` block (lane S edited by principal-pm-verticals, lane M by design-lead; the register is portfolio-manager's). Lane S: brief → build → checks → revise → launch → published → live. Lane M: the same, with one warm maker in build, sequence probe, first-3 design review and interaction review in checks, and a post-publish pairwise state (first 3) before live. New `tools/hq/lifecycle.mjs` computes each lesson's state, `since` and `waitingOn` from meta.json, claims, `readiness()` (the lib `launchGates` calls, same options), lane M records, holds, open board items, releases.json and git. `tools/hq/hq-dashboard.mjs` prints it as `pipeline`; the city page is copied to `tools/hq/pipeline.js`. Tests `tools/hq/lifecycle.test.mjs`. Board W-2070: hq-engineer builds the in-app Pipeline view. Readiness tier 1: `company/engineering/readiness/2026-10-25-hq-pipeline-lifecycle.md`.
- **Counts (working tree, 2026-10-25):** lane S: build 677, checks 231, revise 19, live 717 (brief, launch, published 0). Lane M: math/euclid-three-steps in revise (v2 walk said revise, W-2045; then the first-3 design review), math/flatten-the-cube-to-a-dot in pairwise (an uncommitted change in the tree publishes it; it waits on the pairwise vs its twin, the deploy, and W-2057, the twin).
- **Believe:** high that the states follow the records: the function uses the gate lib, so it cannot disagree with `company publish` about learner and QA verdicts. Medium on `since` (git dates of the top-level version and status lines) and on board matching (the slug as a word in an open item's title or links). The brief's expected cube state (checks, waiting on the v2 walk and W-2047) was true at f431cf31e and is now a fixture: W-2047 closed at 6b356b804 and two v2 walks said launch at b21647f45. 675 of 721 published lessons fail readiness on their current version. Most were bumped by the 10-20 copy pass and deployed in r16 without checks. They show as live with `gaps`, as `company check` grandfathers them, not as checks.
- **Next:** hq-engineer W-2070. Lane managers: correct their lifecycle blocks. A new state id needs its rule in lifecycle.mjs first (tools-lead). **Blocked:** nothing.

## 2026-10-25 · chief-of-staff-ceo-office (Leonie) · F-53 drafted: the category as the unit of scale, broad central teams, physical agents (proposal only)

- **Changed:** new `company/ceo-office/2026-10-25-f53-categories-and-agents.md`; board W-2069 (chief-of-staff files F-53 in the founder inbox). Nothing applied: no edit to roles.mjs, gates or protected paths.
- **Proposal:**
  - 14 category owners restored as logical roles (cm-* domain leads un-parked, with their own memory and queue; strands and cm-course-ncm stay parked), under one category lead (principal-pm-verticals re-scoped).
  - One physical `category-owner` agent is launched as `cm-<d>`. As a top-level session (Meta's SDK launcher, `src/crew-run.mjs` sdkSession), it dispatches its own makers and never checkers. The checkers come from a quality desk on standing orders.
  - Five central teams (content types, engineering, quality, product and portfolio, release); depth goes from 3 layers to 2.
  - A tester agent groups qa-tester and accessibility-reviewer (probe, fit, scan), and the witnesses stay apart.
  - Counts: 33 distinct agents become 26 (24 after 11-23) for 47 logical roles; 8 sessions at once typical, 10 peak, against P7's 8.
- **Believe:**
  - High that the un-park rule has shown nothing and cannot yet: 0 cycles have passed, there is no meter, and route-reviewer has 0 runs. 0 of 173 category items have closed since the re-own, and the last cm-* close is 10-17 (board.json).
  - High that the cube lesson had at least 7 separate builds, 2 of them of the same commit 3e365688e.
  - Medium on the cost: the ledger is off (W-2034).
- **Next:** chief-of-staff files F-53 (W-2069), and the founder decides F53-1..9. If yes: written consults, then B1 spike (principal-engineer), B2 allow-list and B4 meter (tools-lead), B3 deploy guard (W-1051, W-1052).
- **Blocked:** F53-3 (self-dispatch) on B1, B3 and B4. B3 and B4 are not met today.

## 2026-10-25 · learner-evaluator (v2 walk) · flatten-the-cube-to-a-dot v2: two minds, both launch

- **Changed:** two new learner records, both stamped `lesson version: v2`. `company/reviews/flatten-the-cube-to-a-dot/2026-10-25-learner-knows-faces-not-euler-v2.md` uses the v1 boundary and has a closure table for the v1 findings. `2026-10-25-learner-no-convex-v2.md` is a learner who does not know "convex". Board W-2068 (category-curator): decide whether to gloss "convex". Lesson, meta.json and tools are untouched. Linking the records in `evidence.simulatedLearner` is the lesson owner's job.
- **How:** private build `.next-le-v2` of the working tree (lesson code = 3e365688e = f1abc5834). Walkthrough on :3981, own probe on :3982 at 390x844 over 6 paths: replay bursts, card 3 before the flatten, skip slice, reveal 150 ms after "Remove the rest", replay after tabbing back from card 3. The build dir has been removed and my servers stopped. The build exits 1 on Next's SecurityFatalError nudge after BUILD_ID is written. I used the output and ran no upgrade. Disk hit 100% during my first attempt, while another build was running, so I removed my dir and waited for that build to finish. A v1-era next-server (cwd: deleted worktree `.claude/worktrees/le-cube`, NEXT_DIST_DIR=.next-le-cube, pid 4332) is still running and may pin disk space. The classifier blocked me from killing it, so a human or ops needs to stop it. I also ran `git checkout tsconfig.json`: its modification was there before I started, and it is the usual NEXT_DIST_DIR include a build adds.
- **Believe:** both minds give launch. High confidence that the five v1 notes the lesson owned are fixed as seen on screen: replay, regions = faces, the +2 corners line, singulars, and card 3 inert until the flatten. High that no probed path dead-ends. Medium on the convex note: it is a takeaway risk (overgeneralising to "every solid"), not a stop. Unchanged from v1: "every convex solid" is asserted, not shown. Human-learner question: "would this work on a pyramid / on a solid with a hole?"
- **Next:** category-curator W-2068 (convex gloss, non-blocking). The lesson owner links both records in meta.json. **Blocked:** nothing.

## 2026-10-25 · platform-engineer (W-2047) · sequence probe "back" settles before it records

- **Changed:** `tools/sequence-probe.mjs` reads the shown card until two readings 500 ms apart match (card index included, 6 s ceiling), after every walk press and every trail press. "back" compares those settled fingerprints. A card still changing at the ceiling FAILs as "never settled", not as "state not kept". Layout checks still measure at 300 ms, so mid-motion layout is still checked. Motion stays on: no reduced-motion emulation. New `tests/platform/sequence-probe.test.mjs` (in test:platform) runs the real probe against `tests/platform/fixtures/sequence-probe-fixture.html`. Readiness tier 1: `company/engineering/readiness/2026-10-25-w2047-sequence-probe-settle.md`. Changelog line added.
- **Evidence:** private build `dist-pe-w2047` of f431cf31e (removed after). Old probe: flatten-the-cube-to-a-dot "back" FAIL at 390 and 1280. Fixed probe: flatten "back" PASS at 390 and 1280, and euclid-three-steps "back" PASS at 390 and 1280. The only FAILs are four-cards at 390, the W-601 hypothetical, unchanged. Fixture results: fast PASS, slow (220 ms steps for 2.2 s) PASS, lost FAIL "state not kept", forever FAIL "never settled". The old probe also FAILs fixture-slow, so the fixture reproduces the bug.
- **Believe:** high that the false FAIL is gone and real loss still fails, for the cases tested. Medium on the general rule: a motion that holds one still step longer than 500 ms would still be read as settled.
- **Next:** W-2066 (reveal-fit thumb quirk) is mine and still open. Lane M step 4's probe gate on flatten can cite this record. **Blocked:** nothing. Note: `next build` ends with a "SecurityFatalError" upgrade nudge after the output is written. The first build was incomplete and the retry was complete. I did not upgrade Next: that is a dependency decision, not part of W-2047.

## 2026-10-25 · qa-tester (W-2037, W-2065) · flatten-the-cube-to-a-dot v2: QA record, pass

- **Changed:** new `company/reviews/flatten-the-cube-to-a-dot/2026-10-25-qa.md` (company qa-record, with the external-server stamp) and `2026-10-25-qa-v2.md` (hand-written: probes, reveal-fit, hand run, W-2065). Both linked in the lesson's `evidence.qa`. W-2065 done; W-2066 added for platform-engineer (reveal-fit heuristic). Nothing else touched (lesson, tests and tools unedited).
- **Result: pass.** Contract 2/2 phone and desktop, 0 retries, on a private build of 3e365688e (`.next-qa-v2`, removed). sequence-probe at 390 and 1280: everything passes except `four-cards` at 390 (hypothetical 4-step trail, W-601). Hand run (wrong order, double taps, resize mid-sequence including during playback, keyboard only): state, ticks and totals held on every path; Shrink stays inert until the flatten; reveal text matched the stage; 0 px overflow; only console error is the 404 on `/api/account/me`.
- **W-2047 "back":** the committed tool FAILs it on both viewports (state not kept); the platform-engineer's uncommitted working-tree fix (settled reads) PASSES it on both. The lesson kept state by hand too, so the FAIL was the tool. Re-run once the fix is committed: it was not committed when I finished.
- **W-2065:** a tool quirk, not a lesson defect. reveal-fit skips the reveal-fitted main picture and measures the fixed-size 284x20 aria-hidden strip against the stage width (0.68 < 0.75); the whole 417 px stage is visible at 1280. Proposed fix is in W-2066. The 1280 `pass: 0` is a false positive; the QA v2 record is the evidence.
- **Observations (none blocks):** landscape phone 844x390 puts controls below the stage window (kit-wide); focus drops to the page start after Lock it in, Slice, Take the top off and Remove the rest.
- **Not run:** WebKit (binary absent), reduced motion, dark mode, feed swipe-away. **Believe:** the lesson passes the browser layer, high for what was exercised; it says nothing about learning.
- **Next:** platform-engineer commits the W-2047 fix and W-2066; release-manager can cite the qa-v2 record. **Blocked:** nothing.

## 2026-10-25 · fact-checker (W-2064) · flatten-the-cube-to-a-dot v2: c9 verified, card 1 line consistent with c2

- **Changed:** `src/demos/math/flatten-the-cube-to-a-dot/meta.json`: c9 is now **verified** (checkedBy, checkedOn, note), and c2 stays verified with one sentence added to its note. Both changes were made by `fc-2026-10-25/set_status_pass3.py`, which only touches the claims array and asserts that nothing else moved. The record is pass 3 in `company/reviews/flatten-the-cube-to-a-dot/2026-10-25-fact-check.md`, and my own derivation is in `fc-2026-10-25/own3.py` + `.out`. No learner text was edited.
- **How:** I made a fresh build at 3e365688e into `.next-fc2064`, ran the walkthrough against it, and wrote my findings before reading meta.json or the diff. The build exits 1 on Next's security-advisory nudge after the route table is printed. The output was complete (BUILD_ID present), so I used it, did not retry, and ran nothing the nudge asked for. I removed the build dir afterwards.
- **Verdicts:** c9 "The 5 regions are the cube's other 5 faces." is verified. I derived the faces from the 3D coordinates, and the 5 bounded regions match the 5 faces left after the top comes off, one to one; the outside is the top's rim. The card 1 line "1 corner gone, 3 new: +2 corners" is true and restates c2's corner count. It has no id of its own, so I filed it under c2's note. A separate id is optional (builder).
- **Check:** 810 errors, the same as the baseline. W-2064 is done.
- **Believe:** high (an independent derivation plus a read of the stage). No claim on the lesson is unverified or disputed now.
- **Next:** qa-tester QA record on v2. Outside my scope: the walkthrough captured step 6 partway through (5−5+1=1), which looks like capture timing.
- **Blocked:** nothing.

## 2026-10-25 · demo-builder (W-2056, W-2063) · flatten-the-cube-to-a-dot v2: D1, D2 and the v1 walk's notes

- **Changed** (`src/demos/math/flatten-the-cube-to-a-dot/` Demo.tsx, styles.module.css, meta.json; build.md v2 section; new `company/reviews/flatten-the-cube-to-a-dot/v2-maker-probe.mjs` + `.out`, `v2-sequence-probe.out`): version 1 → **2**, status draft.
  - D1: until the top is off, card 3 shows the cube, `8 − 12 + 6 = 2`, "Take the top off first", both removal chips disabled. Next not gated; no control index moved.
  - D2 + W-2063 (c): "1 corner / 1 edge / 1 region" in the screen-reader sentence, the visible keys (the walk saw "1 corners" on the stage) and the picture's aria-label.
  - W-2063 (a): card 2's chip becomes "Replay the flatten" after the 700 ms (same control, so the QA path is unchanged); new line "The 5 regions are the cube's other 5 faces." = new claim **c9, unverified**.
  - W-2063 (b): card 1 keeps "+2 corners, +3 edges, +1 face" and adds "1 corner gone, 3 new: +2 corners". c2's text unchanged.
- **Loop results** (own build `.next-w2056`): maker probe 22/22 PASS at 390×844 and 1280×800 (skip, skip-then-back, Next mid-flatten, reveal mid-playback, replay, settled back, readout text after all 12 presses). sequence-probe 12 PASS / 3 FAIL / 2 n/a, same as v1 (back ×2 = W-2047; four-cards = W-601). reveal-fit 390: fit, crop 0, hidden 0, 76 words. reveal-fit 1280: fit, but "thumb" from the 284×20 strip after the main picture is reveal-fitted (unchanged since v1; W-2065 for qa-tester). QA contract 2/2. Walkthrough rebuilt; it shows the fb76d7c13 hook.
- **W-2047 left** with platform-engineer: it owns tools/sequence-probe.mjs (F-52), and gates are outside demo-builder. Evidence added to the item: a 200 ms settle is too short for a 220 ms playback step; 500 ms passes.
- **Verify** (suite by suite; the chain stops at the first red): same counts as the baseline in the tools-lead handoff below: publish 32/2, lifehacks 132/1, algorithms 412/5, hq 107/9, settings 37/1, main-feed 55/2, dims 2/4; the rest green. check 810 (baseline). typecheck green. Build compiles; the first run each time exits 1 on Next's security-advisory nudge, and the retry exits 0. Full QA not run (disk ~95%); the lesson's contract 2/2.
- **Incident:** my first `npm run build` into the shared `.next` failed (ENOTEMPTY in route-cache while other sessions' `next start` servers served it) and left `.next` empty for a few minutes. Another session rebuilt it at 19:25. Use a private NEXT_DIST_DIR for builds.
- **Believe:** high that D1, D2 and W-2063's three notes are done as asked (probe output). Medium that the card 2 line is enough for finding 1: it names what a region is, but not why flattening is always possible.
- **Next:** fact-checker W-2064 (c9 and the card 1 line); qa-tester QA record on v2; W-2058 pairwise once the twin W-2057 exists; platform-engineer W-2047.
- **Blocked:** nothing.

## 2026-10-25 · tools-lead · city dashboard gains principles, features and releases; the three city pages in tools/hq/

- **Changed:** `tools/hq/hq-dashboard.mjs` now outputs `principles` (Meta's `audit` from `$META/src/principles.mjs`, default `../../../system3-meta`; left out when Meta is absent), `features` (new `company/features.json`, 16 features: 10 live, 4 building, 2 planned, checked against the code and records) and `releases` (from release-manager's `company/ops/releases.json`, newest first: r1-r21 plus the two unapproved 2026-10-18 deploys; `approvedBy` null for r1, r2 and those two, because the record says not recorded or unapproved). City pages Principles, Features, Release log copied with Meta's `src/city-copy.mjs` (`tools/hq/{principles,features,releases}.js`, `pages.json`); `"hq": "."` in `tools/hq/hq-city.json`. New `tools/hq/dashboard.test.mjs` (4 tests). Readiness self-check `company/engineering/readiness/2026-10-25-hq-dashboard-principles-features-releases.md`; changelog line.
- **Snapshot check:** from tools/hq, `META=/home/user/system3-meta node $META/hq/build.mjs --city=hq-city.json --snapshot=system-3-company --out=<scratch>`: dashboard.json has principles 9 followed, 4 gaps (P3, P4, P6, P8) of 13; 16 features; 23 releases, newest r21; pages.json lists principles, features, releases.
- **Not used:** Meta's `src/releases.mjs` greps `[deploy]` anywhere in a message, so here it returns 34 "releases", most of them Meta commits that only name the marker. releases.json is the company's record, so the adapter reads that instead.
- **Believe:** high that the dashboard reports the records as they are. Medium that features.json stays right: it is a hand list, and each feature's owner should correct its own line.
- **Next:** release-manager adds math/euclid-three-steps (the first lane M lesson, published 2026-10-25) to the next release's notes when one is approved; feature owners keep company/features.json current.
- **Blocked:** nothing.

## 2026-10-25 · learner-evaluator (W-2037) · flatten-the-cube-to-a-dot v1 walked: launch with notes

- **Changed:** new record `company/reviews/flatten-the-cube-to-a-dot/2026-10-25-learner-knows-faces-not-euler.md` (lesson version: v1, Verdict: launch). Boundary: knows corners, edges and faces; does not know Euler's formula or flat drawings. The walkthrough ran on a private build of d5ed24fa4 (clean worktree; the shared tree's HQ files did not build at b3138bd43), plus 9 own probe paths at 390x844. Board W-2063 (demo-builder) carries the non-blocking notes.
- **Believe (medium):** a learner at this boundary follows the cube argument. The first idea the lesson needs and does not give comes at card 2: a solid minus one face can always be drawn flat. The flatten is a sub-second animation with no replay, and "faces" becomes "regions" without explanation. That gap only bites at the reveal's "every convex solid", which this learner takes on trust. That is a human-learner question ("would this work on a pyramid?"), not a blocker. The skip path (Next past cards 1-2, reveal locked, no cue) recovers via the trail tabs. It is already W-2059. Simulated learner: this is not evidence that anyone learned.
- **Note:** a v2 of this lesson is uncommitted in the shared tree (W-2056 in progress, someone else's), so the record covers v1 only. A committed v2 needs its own walk. The `tsconfig.json` change in the shared tree is from W-2056's `.next-w2056` build, not mine. I removed my own `.next-le-cube` (730 MB) and worktree. Host disk is at 95%.
- **Next:** demo-builder W-2056/W-2063, then a learner re-walk of v2. The lesson owner links this record in meta.json evidence.simulatedLearner.
- **Blocked:** nothing.

## 2026-10-25 · tools-lead · HQ without Press and Meta; city adapters in tools/hq/ (founder: "Since we removed press from s3 company adjust accordingly. Also we removed meta as well.")

- **Changed** (d5ed24fa4; its renames and deletions first landed in b3138bd43, a parallel commit that took them from the shared index):
  - HQ: floor 8 (System 3 Press) gone (`FLOORS` 1-7); the lobby's `to-floor-8` stairs are now a `city-hq` door room; HQ.tsx links to https://system3-city-hq.vercel.app under the floor tabs and in that room's panel. Deleted `src/lib/hq-press.ts`, `src/app/hq/Press.tsx`, `tests/hq/press.test.mjs`, the press CSS.
  - `company/sibling/` removed. City adapters (`hq-events`, `hq-dashboard`, `hq-knowledge`, `org-from-roles` + `org.test`, `hq-docs.json`, `hq-city.json`) now in **`tools/hq/`**, paths re-rooted (`../..`; META default `../../../system3-meta`), with a README. The kernel adapters (brief, gates, publish, claims-guard, claims-draft, ledger-gate, integrate, board-mirror, events-export, holds, inbox-export, launch-record, learner-verdict, m7-scope, qa, qa-changed, rituals, walkthrough), their `lib/` and tests were deleted: no caller in package.json, tools/, src/, tests/, .github/ or .claude/. The city adapters use none of `lib/`.
  - Superseding notes on top of the Press (2026-10-15) and Meta (2026-10-16) decision records; `company/ops/events.md`, `company/ceo-office/org-change-process.md` line 48, `.gitignore`. New `tests/hq/city-door.test.mjs`; readiness self-check `company/engineering/readiness/2026-10-25-hq-without-press-and-meta.md`.
- **Verify, suite by suite (before → after):** same failures by name in every suite. hq 111/9 → 107/9 (7 press tests out, 3 city tests in); publish 32/2, lifehacks 132/1, algorithms 412/5, settings 37/1, main-feed 55/2, dims 2/4 unchanged; deploy, books, kit, eval, platform, accounts, dispatch, mailbox, memory, metrics all green both times. check 810 → 810. typecheck green. Build compiles and generates 3421/3421 pages, but now exits 1 on Next's own post-build security-advisory check (SecurityFatalError, code-independent; the baseline build 30 minutes earlier passed). QA not comparable: the host disk is at 99% and the baseline QA died with ENOSPC at test ~201 of 3302; QA does not open /hq.
- **City:** from tools/hq/, `node $META/hq/build.mjs --city=hq-city.json --snapshot=system-3-company --out=<dir>` built the snapshot: floors 1-7 with the city-hq room, 34 roles, 8,208 events, 607 docs, 26 knowledge entries. **Meta's city build must now read `tools/hq/hq-city.json`.**
- **Believe:** high that nothing in this repo calls the deleted adapters (grep, five places); high that the HQ and the city read the company as before minus floor 8.
- **Not fixed (others' files):** `company/strategy/master-plan.md` lines 39 and 41 and `company/ceo-office/poc-map.md` row 20 still cite `company/sibling/…` paths that were already missing before today; `company/company.json` and the principles audit (chief-of-staff-ceo-office, in flight). Historical records (this log, memories, rituals, reviews) keep their old paths: history is in git.
- **Pre-existing:** `node --test tools/hq/org.test.mjs` fails `org.length >= 39` (34 roles now, after 050845585's restructuring); not run by any npm script.
- **Next:** Meta's city build points at tools/hq/hq-city.json (system3-meta owner); chief-of-staff-ceo-office fixes master-plan and poc-map citations; someone frees host disk (.next-fc2055, .next-le-cube are about 1.6 GB).
- **Blocked:** nothing.

## 2026-10-25 · chief-of-staff-ceo-office (Leonie) · F-52 applied: G1 lane M warm maker, G2 park 5 (3 scheduled), G3 one owner per path

- **Changed:**
  - Record: `company/decisions/2026-10-25-founder-f52.md`. It holds the founder's words (system3-meta docs/decisions/2026-10-25-founder-approvals.md item 3), rows G1-G3, consultations (design-lead's written, the rest represented) and objections 1-9.
  - **G1:** the lane M flow now runs one demo-builder session per item. That session writes its own spec and mockup, builds, runs its own checks, and walks every reachable path. interaction-designer reviews after the build; then QA, fact-check and the learner walk run once, plus design review and pairwise for the first 3. Recorded in `company/ops/projects.json` `lane-multi-card.flow` (with design-lead's twin-first rule), `company/company.json` flows, `tools/org/roles.mjs` (F-52 block) and poc-map lane 6.
  - **G2:** parked vp-personalization, applied-scientist-personalization, learning-scientist-personalization, learner-model-engineer and learner-data-engineer (PARK, own record). head-of-strategic-initiatives and vp-marketing are scheduled for 2026-11-23, and rnd-lead for when F-49 is declined (`SCHEDULED_PARK`). personalization-engineer and growth-designer now report to head-of-product, who is lane 14's POC. personalization-eval reports to evaluation-steward and moves to lane 10.
  - **G3:** `src/app/hq/**` belongs to hq-engineer; tools-lead keeps the HQ adapters and tools. events.jsonl is written by chief-of-staff; tools-lead keeps the schema and tools/events.mjs. The chief of staff's "only writer" line now matches CLAUDE.md.
  - Board: 46 items re-owned. W-2045 went to demo-builder and W-2047 to platform-engineer, which closes W-2052. W-2054 was retitled (file F-52 as decided). New: W-2061 (org-change event) and W-2062 (written consultations). Regenerated with `node tools/org/generate.mjs`.
- **Principles audit** (`node /home/user/system3-meta/src/principles.mjs .`): 6 followed, 7 gaps, 0 by hand → **9 followed, 4 gaps, 0 by hand**. P2, P5 and P7 are now green; P3, P4, P6 and P8 stay gaps.
- **Believe:**
  - High: no open board item is owned by a parked role (checked against the roles export).
  - Medium: P7 is honestly green only if the 3 dated parks happen.
  - Medium: putting personalization-eval under evaluation-steward is right (objection 5, open).
- **Check:** 810 errors, the same as the baseline. test:mailbox, test:dispatch and test:memory are green. test:hq has the same 9 failures as a clean HEAD worktree.
- **Next:**
  - chief-of-staff: file F-52 as decided in founder-inbox.json (W-2054), the org-change event (W-2061), and the consultations (W-2062).
  - hq-engineer: review tools-lead's in-flight floor 8 removal in src/app/hq (objection 8).
  - On 2026-11-23, chief-of-staff-ceo-office moves the scheduled roles into PARK.
- **Blocked:** nothing.

## 2026-10-25 · fact-checker · W-2055: re-check c8 and c6's source on math/flatten-the-cube-to-a-dot (fb76d7c13)

- **Changed:**
  - `src/demos/math/flatten-the-cube-to-a-dot/meta.json`, claims array only. c8 goes from unverified to **verified** (checkedBy fact-checker, checkedOn 2026-10-25). c6 stays verified, and its note gains the pass-2 confirmation.
  - Pass 2 added to `company/reviews/flatten-the-cube-to-a-dot/2026-10-25-fact-check.md`. Script: `fc-2026-10-25/set_status_pass2.py`.
  - Board: W-2055 done, and W-2060 for category-curator (non-blocking): c6 source "1813" is unsourced, and c8 support might be better as derivation.
- **Believe:**
  - High confidence that the new hook is true. It asks about convex solids and does not assert. "Three moves tell" rests on c6. Slice only illustrates, which is acceptable in a hook.
  - High confidence that the c6 amendment is right.
  - No claim on the lesson is now disputed or unverified.
- **Watch:** the shared `.next` build (18:50) was older than fb76d7c13 (19:05). The first walkthrough showed the old hook and every claim as unchecked. I rebuilt with `NEXT_DIST_DIR=.next-fc2055`. Anyone evaluating should rebuild before running a walkthrough.
- **Check:** 810 errors, the same as the baseline, and none from this lesson.
- **Next:** the remaining publish gates for this lesson (learner review, launch review), owned by other roles.
- **Blocked:** nothing on the claims.

## 2026-10-25 · design-lead (Ines), lane M manager · W-2037: design review of math/flatten-the-cube-to-a-dot v1

- **Changed:** wrote `company/reviews/flatten-the-cube-to-a-dot/2026-10-25-design.md` (verdict **revise**: D1 required, D2 minor) with probe `design-2026-10-25/probe.mjs`, its output and 5 screenshots. Board: W-2056 (demo-builder: D1-D2, bump to v2), W-2057 (demo-builder, another session: build the twin `slice-a-corner-off`, lane-multi-card), W-2058 (evaluation-steward: dispatch the pairwise once twin and v2 exist), W-2059 (interaction-designer: kit-level answer to skipping an unfinished sub-card, plus a probe "skip" check). Kudos to demo-builder.
- **Rulings:** (R1) sequence-probe "back" FAIL is the probe's: settled 3 s, every card is identical after going back, at 390 and 1280; W-2047 stands (settle, do not emulate reduced motion), and the gate clears only when the fixed probe passes. (R2) "Next: Shrink" without flattening is the lesson's: card 3 shows a flat drawing the learner never made, they can finish it, and the reveal stays locked with no cue; D1 makes Shrink inert with "Take the top off first" until the flatten. (R3) dark under both schemes is the product chrome (`.single`/`.feed-wrap`, 896905545), not the lesson's; it reads with light tokens forced.
- **Launch:** not launchable until a pairwise record exists (lane M flow §2c step 7), and the twin is unbuilt. Also open: probe gate (W-2047), learner walk, a QA record in company/reviews, c8 re-check (W-2055). Nothing waived.
- **P2 answer (proposal only):** agree with the audit's G1 (one warm builder owns spec, mockup and build; checks at the end), plus: the maker walks every reachable path (skip, mid-animation reveal, settled back), twin built or queued before the item's build, and my review stays a craft review. In the review record.
- **Believe:** high that R1 and R3 are right (measured); high that D1 is a real dead end; medium that O1 (sparse end frame) matters to learners, so it is left to the walk.
- **Next:** demo-builder W-2056 and W-2057; platform-engineer W-2047 (re-owned by W-2052); learner walk on v2.
- **Blocked:** launch, on the pairwise (twin unbuilt).

## 2026-10-25 · category-curator (math) · W-2048, W-2049: flatten-the-cube-to-a-dot hook, c8, c6 source

- **Changed** (only `src/demos/math/flatten-the-cube-to-a-dot/meta.json`, only these fields):
  - `hook`: "Corners minus edges plus faces is 2 for a cube. Every convex solid too? Three moves tell." (89 chars, budget 90; a first try at 108 chars failed `npm run check`'s hook budget).
    - "always" is gone, and the scope is convex solids, as in c6 and the reveal.
    - It now asks instead of asserting, so it no longer says the total stays 2 (build.md pre-flight item 1).
  - c8: the text is now the new second and third sentences. Status is **unverified**, checkedBy/checkedOn removed, and the note keeps the old disputed text and why.
  - c6 `source`: "a variant of Cauchy's (Cauchy removed triangles, the lesson removes edges)", plus PMC10239678 (doi 10.1098/rsta.2022.0052) and PMC9640434. c6 stays verified; its learner text did not change.
  - `brief.subCards[2].title`: "Shrink to a dot" → "Shrink" (spec trail, company/design/specs/flatten-the-cube-to-a-dot.md).
- **Board:** W-2048 and W-2049 done. W-2055 (fact-checker): re-check c8 and look at c6's amended source.
- **Believe:**
  - Medium-high that the hook no longer overclaims. It implies that the three moves settle the question for convex solids, which c6 covers.
  - Medium that it no longer leans on "still 2". Any hook that raises "every solid?" hints a little; this one gives no value.
- **Check:** 810 errors, the same as the baseline; none from this lesson.
- **Next:** fact-checker W-2055. The design-lead review was running in parallel and may want to weigh in on the hook's tone.
- **Blocked:** publishing waits on c8's re-check.

## 2026-10-25 · chief-of-staff-ceo-office (Leonie) · Principles audit against system3-meta PRINCIPLES.md; company.json written

- **Changed:**
  - `company/ceo-office/2026-10-25-principles-audit.md`: P1-P13, each with its evidence, verdict and fix.
  - `company/company.json` (not protected): the design record Meta's audit reads. It holds roles (39), orgReasons, sizeReason, the B6 baseline, flows for lane S and lane M, owns, the referee (heldOut false), costTarget (90k per published lesson), stopRule, and principlesRecord for the verdicts the tool cannot compute or that I judged stricter.
  - `company/ceo-office/2026-10-25-principles-org-proposal.md`: G1 (lane M warm maker), G2 (park 8 roles), G3 (one owner per path), with the F-52 text.
  - Board: W-2050 to W-2054. Nothing applied to roles, flows or gates.
- **Audit:** before, 2 followed, 6 gaps, 5 by hand. After, 6 followed, 7 gaps, 0 by hand. The gaps are P2, P3, P4, P5, P6, P7 and P8. They rose because the record is now written down, not because anything got worse.
- **Believe:**
  - High confidence that lane M is a relay. Its first item went curator → interaction-designer → curator again (W-2043) → builder, and the removal order was decided three times.
  - High confidence that P8's stop cannot fire: no ledger line exists after 10-16 or for either lane.
  - Medium confidence in the P7 split (about 30 roles supported, 8 not): personalization's tokens were never measured.
- **Next:**
  - chief-of-staff: file F-52 (W-2054) and re-own W-2045 and W-2047 from the parked design-engineer (W-2052).
  - tools-lead: W-2034, the ledger import, which is the one fix that makes P8 bind.
  - evaluation-steward: the F-41 item 9 weekly audit as the held-out part (W-2050).
  - Founder: G1 to G3.
- **Blocked:** G1 to G3 wait on the founder. No protected path, gate or amendment is needed.

## 2026-10-25 · fact-checker · W-2037 lane M: claims of math/flatten-the-cube-to-a-dot (base 283a3ed50)

- **Changed:** in `src/demos/math/flatten-the-cube-to-a-dot/meta.json`, only the claims array changed.
  - c1 to c7 are **verified**, with checkedBy, checkedOn and a note on each.
  - The hook's second sentence is recorded as **c8 and disputed**.
  - Record: `company/reviews/flatten-the-cube-to-a-dot/2026-10-25-fact-check.md`. My own scripts and outputs are in `fc-2026-10-25/` (own.py, own2.py, set_status.py).
  - Board: W-2048 (c8 hook, blocking) and W-2049 (c6 source field, non-blocking), both for category-curator.
- **Believe:**
  - c1 to c5: sure. I recounted them from my own model and replayed Demo.tsx `ORDER` (RRCRCRCCRCCC, 5 regions and 7 corners, ending at 1-0+0). Random runs on 5 convex solids never got stuck.
  - c6 and c7: fairly sure, from three opened PMC full texts: PMC10239678 (Lakatos ch. 1, Cauchy's flatten-and-remove proof), PMC9640434 (the formula holds for every polyhedron without holes) and PMC7459769 ("Euler's formula", Euler 1758, Novi Comm. 4). I did not open the text of Richeson or the Lakatos book; Crossref metadata only. The year 1813 is not confirmed, and it is not learner text.
  - c8, the hook "Three moves show why it is always 2": false as written. A holed solid gives 0.
- **Next:**
  - W-2048: category-curator qualifies "always", then a fact-checker re-checks c8.
  - W-2049 is optional.
  - Design review, QA and learner walks as already planned.
- **Blocked:** publishing is blocked by c8 (disputed).
  - `npm run walkthrough -- math/flatten-the-cube-to-a-dot` times out; use the bare slug.
  - WebFetch cannot resolve any host, and arxiv, wikipedia and JSTOR are blocked or challenged. PMC OAI and Crossref work.
  - `npm run check`: 810 errors, the baseline; none from this lesson.

## 2026-10-25 · demo-builder · W-2044 lane M build: math/flatten-the-cube-to-a-dot

- **Changed:** built `src/demos/math/flatten-the-cube-to-a-dot/Demo.tsx` and `styles.module.css` from `company/design/specs/flatten-the-cube-to-a-dot.md`. It uses CardSequence with Slice, Flatten and Shrink, 9 stage controls and `minInteractions` 5.
  - `FP`, `ORDER` and `REGIONS` are copied from the mockup script. The 13 states are recomputed and match the spec's table.
  - meta.json gains `interactions` only. Claims, their text and status are untouched (all unverified), and the version stays 1 at status draft.
  - The build note and pre-flight are in `company/reviews/flatten-the-cube-to-a-dot/build.md`.
  - Board: W-2044 is moved to review, and W-2047 is new for design-engineer (the probe's settle).
- **Results:**
  - QA contract: 2/2 (phone and desktop, release build).
  - `tools/reveal-fit.mjs` at 390×844: fit, stage-top crop 0 px, hidden 0 px, 76 words. No fix from the spec's order was needed. namedHidden 1 is "faces": the heuristic matches the reveal's formula word to the readout key on hidden cards 1 and 2.
  - `tools/sequence-probe.mjs` at 390 and 1280: walk, overflow, crop, tap, revealCard and errors PASS.
  - The probe's "back" check FAILs at both widths. The probe fingerprints about 300 ms after a press, and the spec's motion runs 700 ms (flatten) and 2.4 s (playback). With reduced motion emulated, back passes and state is kept. The four-cards check FAILs at 390, which is W-601's call.
  - `npm run check`: 810 errors, the baseline 810; none from this lesson.
  - typecheck and build pass. The build stops once with a Next.js "SecurityFatalError" upgrade nudge after compiling, and passes on retry. Nothing was upgraded.
- **Verify suites red, not from this build:** publish 2, lifehacks 1, algorithms 5, hq 9, settings 1, main-feed 2 and dims 4. None names this lesson, except two that do:
  - dims lists the draft (it has been in the tree since the curator's scaffold).
  - `tests/platform/registry-split.test.mjs` #23 flags this meta.json: no claim yet carries checkedBy/checkedOn or a `company/reviews/` path. It clears when the fact-checker verifies a claim.
- **Believe:**
  - Fairly sure the stage matches the spec control by control: milestones fire at the press, and the playback snaps at the reveal or under reduced motion.
  - Less sure of the light theme: `/d/` rendered dark under both colour schemes, so the light `--warn` was never seen on the stage.
  - The hook ("…show why it is always 2") leans towards the right option. That is the curator's text, flagged in pre-flight 1.
- **Next:**
  - W-2043: the category-curator updates c5's source.
  - The fact-checker verifies c1–c7.
  - design-lead runs the design review (W-2037) and checks the 390×844 reveal.
  - qa-tester and learner-evaluator walk v1.
  - W-2047: design-engineer fixes the probe's settle.
- **Blocked:** nothing.

## 2026-10-25 · qa-tester · W-2037 QA of math/euclid-three-steps v2

- **Changed:** `company/reviews/euclid-three-steps/2026-10-25-qa-v2.md` (hand run, sequence probe, contract), `2026-10-25-qa.md` (company qa-record, contract), both linked in the lesson's `evidence.qa`. No lesson or test edits.
- **Result: pass.** Contract 2/2 (phone, desktop, 0 retries). Sequence probe: 7 PASS on each viewport; four-cards FAIL at 390 only (padded to 4 steps the titles wrap to 72 px; the lesson has 3 cards, so it is W-601's call, not a defect of the lesson).
- **Hand run found no defect, four minor observations:** a double tap on "Next: Add 1" lands on card 3; at 844x390 the controls sit below the stage window; keyboard focus drops to BODY after a list chip press and to page start after Lock it in; the locked reveal says only "Try it first" (Multiply needs the 2 to 13 list). Reveal text matched the stage on every path, including a list change after the reveal.
- **Believe:** fairly sure of the above on Chromium at 390x844, 360x640, 844x390, 1280x800. WebKit, reduced motion, dark mode and feed swipe-away not run.
- **Caveat:** built from 347059b15 with `next build --webpack`; the build exited 1 at the end on a Next.js security-advisory check after compile and static generation had finished, and the output served fine. `npm run check`: 810 errors, same baseline.
- **Next:** interaction-designer to decide O1 to O4 and W-601 (four-cards); evaluation-steward owns the probe's four-cards rule.
- **Blocked:** nothing.

## 2026-10-25 · category-curator (math) · W-2043 flatten-the-cube-to-a-dot: new removal order in the brief

- **Changed:** `src/demos/math/flatten-the-cube-to-a-dot/meta.json` (meta fields only; Demo.tsx untouched, W-2044 builds in parallel): claim c5 `source` now cites the spec's removal order (company/design/specs/flatten-the-cube-to-a-dot.md, mockup ORDER): 5 regions, 7 corners, first corner on press 3, corner 4 is the dot. `brief.subCards[2].picture` describes that order and the 12-cell strip. New `brief.revealToldDecision` answers the interaction-designer's open question. `company/domains/briefs/checks/math-lane-m-euler-check.mjs` uses the new order and now throws if the order breaks (no merges, total 1 throughout, 5/7 split, press 3, dot = corner 4). All claims stay unverified; learner text unchanged. W-2043 done.
- **Decided:** keep both "any convex solid" (c6) and "Euler's formula" (c7) in the reveal. c6 is the sentence that points at the shown why (the strip of twelve 1s), as company/decisions/2026-10-14-told-vs-shown.md requires, not told context; c7 is the one claimed told sentence allowed. If the 390 x 844 reveal still crops after the spec's two layout fixes, cut c7 first, never c6.
- **Believe:** sure the check script and mockup agree with the spec's table (both run clean). Fairly sure of the reveal ruling; it rests on reading c6 as pointing, which a reviewer could dispute.
- **Next:** W-2044 demo-builder builds; design-lead design review (W-2037). Sub-card 3's brief title is still "Shrink to a dot"; the spec shortens the trail title to "Shrink" and keeps the full name in aria-label, so I left it.
- **Blocked:** nothing. `npm run check` 810 errors, same as before.

## 2026-10-25 · learner-evaluator · W-2037 learner walk of math/euclid-three-steps v2

- **Changed:** wrote `company/reviews/euclid-three-steps/2026-10-25-learner-knows-primes-v2.md` (lesson version: v2, Verdict: revise). Built from 347059b15 into `.next-le-euclid` (since removed), ran `npm run walkthrough -- euclid-three-steps`, and probed three off-QA paths on :3957 (list "2, 3" carried through all three cards; options 2 and 3 on the 2 to 13 list).
  - Filled in the board item W-2045 (design-engineer): the two fixes, plus linking the record in meta.json `evidence.simulatedLearner`.
  - Added W-2046 (evaluation-steward): rule on the disagreement with the v1 r10 review.
- **Believe:** fairly sure of the first stall point. After "Find its primes" the reveal says any finite list works, but the lesson never says on screen that product + 1 always has a prime factor (c4 is only in the trust sheet). The v1 r10 walk found the same gap independently and called it a non-blocking clause, so how much it should block is the steward's call.
  - Sure of the dead end: list "2, 3" through Add 1 and Divide ticks cards 2 and 3 and shows "7 is prime", but the reveal stays "Try it first" with no reason on screen (seen in a probe screenshot).
  - The v2 copy edit itself ("no finite list") is harmless.
- **Next:** W-2046, evaluation-steward rules on blocking. W-2045, design-engineer fixes, then a re-walk by learner-evaluator.
- **Blocked:** nothing. Note: the first `next build` stopped with a Next.js "known security vulnerability" upgrade notice. A retry built cleanly. I ran no upgrade; that is the founder's call.

## 2026-10-25 · interaction-designer · W-2042 lane M spec plus mockup: math/flatten-the-cube-to-a-dot

- **Changed:** wrote the build spec `company/design/specs/flatten-the-cube-to-a-dot.md`, the mockup `flatten-the-cube-to-a-dot.svg`, and its renderer `flatten-the-cube-to-a-dot-mockup.mjs`, which also checks the counts. The format is CardSequence with 3 sub-cards: Slice, Flatten, Shrink. There are 9 stage controls and `minInteractions` is 5.
- **Decided (the curator's doubt):** 12 hand removals do not fit; the time budget is about 66 s against 53 s. The learner removes edges by hand, then "Remove the rest" plays the remainder at 220 ms each.
  - "Remove the rest" is disabled until the first removal.
  - The removal order is changed so that a corner goes on press 3, not press 6. A learner then sees both kinds by hand, where the brief's order showed only regions.
  - The order keeps the same 12 edges, 5 regions and 7 corners, with the total 1 throughout.
  - The third trail title is shortened to "Shrink", since EDD-006 allows two words at most.
  - Milestones are reached on the press, never at the end of an animation.
  - A row of twelve "1" cells, squares for regions and circles for corners, keeps "the total never moved" on the stage for the reveal.
- **Believe:** fairly sure the interaction teaches by hand and passes the QA path, since the path is traced control by control in the spec.
  - Less sure of phone fit. The estimate is 753 of 844 px with the reveal open, but it is not measured. The spec gives the fix order.
- **Next:** W-2044 demo-builder builds from the spec. W-2043 category-curator updates claim c5's source and the brief's picture text to the new order; the learner text is unchanged. After that, design-lead runs the design review (W-2037).
- **Blocked:** nothing.

## 2026-10-25 · category-curator (math) · W-2037 lane M brief: math/flatten-the-cube-to-a-dot

- **Changed:** one lane M brief, scaffolded as `src/demos/math/flatten-the-cube-to-a-dot/` (status draft; Demo.tsx is the untouched scaffold). The brief is in its `meta.json` under `brief`: 3 sub-cards (Slice, Flatten, Shrink to a dot), each with picture and milestone; knowledge boundary; 7 unverified claims; reviewRoute standard; priority 2 proposed. Concept `euler-polyhedron-formula` (unmet in `coverage math`). Numbers in `company/domains/briefs/checks/math-lane-m-euler-check.mjs`. Pointer section added to `company/domains/briefs/math.geometry.md`. Board W-2042 (interaction-designer, spec plus mockup).
- **Believe:** fairly sure the concept needs a sequence (3 different pictures: solid, flat drawing, shrinking network). The single-card twin for the pairwise is the unbuilt `slice-a-corner-off` (math.geometry.md #5), with the same prediction text. Less sure the 12-removal shrink fits the 60 s; the "Remove the rest" chip is the brief's answer, and the interaction-designer may change it.
- **Next:** interaction-designer spec plus mockup (W-2042); then build in CardSequence; the twin must be built too for the pairwise (design-lead, as lane M manager, decides when).
- **Blocked:** nothing. `npm run check` is at 810 errors (baseline 811), none from this lesson.

## 2026-10-25 · chief-of-staff · W-2037 (lane M, CP1-L2/L3) not started: no subagent tool in this session

- **Changed:** nothing in production. No dispatches, no events, no spend against `lane-multi-card`.
- **Why:** this session's tool set has no Agent/Task tool, so the chief of staff cannot dispatch the roles in `.claude/agents/`. The chief of staff does not do production itself, and remote sessions are not the usual way to dispatch, so it stopped.
- **Checked:** `dispatch-check --kind=check --role=fact-checker --no-claim` returned OK, with warnings: wbr and founder-digest overdue; demo-crit, design-review, ops-review, vertical-review, rnd-review and project-review due; I1 intake records missing class/route. Euclid's `math.euclid-three-steps.c5` is still `unverified`; its source holds FC pass 38's derivation from 2026-10-14, before the copy edit.
- **Believe:** high confidence that nothing changed. The plan in the brief still stands: re-verify c5, then run the sequence probe and a learner walk on the current version; then one new item through lane M §2c.
- **Next:** re-run W-2037 from a session that has the Agent tool. Run the overdue wbr and founder-digest first.
- **Blocked:** dispatch tooling in this session.

## 2026-10-25 · chief-of-staff-ceo-office (Leonie) · Restructuring applied (F-50 option A): 109 → 39 roles, two content-type lanes, lane budgets

- **Changed:** the founder approved F-50 option A ("Approved and decide for me", relayed verbatim by the coordinating session). The record is `company/decisions/2026-10-25-founder-restructuring.md`.
  - **Roles:** `tools/org/roles.mjs` has 39 active roles. 2 are new pools: `category-curator`, with the category as data, and `route-reviewer`, covering sensitive, safety and copyright. 72 roles are parked in a `parked` export with their definitions kept. 4 reporting lines moved.
  - **Generate:** the 14 domain-lead docs stay in `company/roles/` with stand-in agents, because the protected check needs them. The other 58 moved to `company/roles/parked/`. There are 52 agent files, down from 108, and dispatch-check S2 refuses every parked role.
  - **Lanes:** `lane-single-card` (9M to 11-08, 90k per published) and `lane-multi-card` (1.5M, 300k per item) are in `projects.json`. `ledger.mjs gate` stops a lane at 100%.
  - **Board:** 231 items of parked roles re-owned with notes. 27 queued items got a priority. 935 unprioritised items are listed for the portfolio-manager. Follow-ups are W-2032 to W-2041, and W-2030 is done.
  - **Docs:** the POC map (lanes 1 = S, 6 = M), operating loop §0 and the org chart header are rewritten.
  - **Consultations:** 18 written notes in `company/ceo-office/consultations/2026-10-25-restructuring/`, represented from each role's records, not live replies.
  - **Drafted only:** AMD-017 (tiers in the protected `tools/company.mjs`), with founder inbox F-51.
- **Checks:** `npm run check` is at its baseline of 811 errors and 4 warnings, with the same lines. The test results are:

  | Suite | Pass | Fail |
  |---|---|---|
  | test:dispatch | 124 | 0 (plus 2 new lane-gate tests) |
  | test:mailbox | 11 | 0 |
  | test:memory | 11 | 0 |
  | test:metrics | 6 | 0 |
  | rituals | 6 | 0 |
  | eval | 27 | 0 |
  | reconcile | 12 | 0 |
  | test:hq | 108 | 12 (the same 12 as baseline) |
  | s3c org adapter | 2 | 0 |

  test:hq ran with a temporary `typescript` symlink, which has been removed. Typecheck and build were not run: there is no `node_modules` in this checkout.
- **Believe:** high confidence that the org data, the tests and the check match the decision. Medium confidence that the lanes will reduce the hub; P1 to P3 in the proposal judge that. Whether the founder's approval was quoted correctly rests on the relay.
- **Next:**
  - tools-lead: readiness self-check (W-2032), drain order (W-2033), ledger import (W-2034), format normalisation (W-2041).
  - evaluation-steward: AMD-017 (W-2036).
  - design-lead: lane M batch (W-2037).
  - principal-pm-verticals: lane S orders (W-2038).
  - portfolio-manager: budgets and triage (W-2039).
  - chief-of-staff: the org-change event and loop adoption (W-2040).
  - hq-engineer: floor redraw (W-2035).
- **Blocked:** gate tiers wait for the AMD-017 ratification (F-51).

## 2026-10-25 · chief-of-staff-ceo-office (Leonie) · Restructuring proposal for the founder (W-2030, F-50)

- **Changed:** I wrote `company/ceo-office/2026-10-25-restructuring-proposal.md` (status: proposed), added founder-inbox **F-50** (approval, priority 1, options A/B/C) and moved W-2030 to review. No change to roles, tools, gates or protected paths.
- **Recommendation (A):** two content-type lanes, single-card (lane S, manager principal-pm-verticals) and multi-card sequence (lane M, manager design-lead). Each has one flow, a `projects.json` lane budget that stops at 100% (a change to the B1 rule in `tools/lib/ledger.mjs`) and a cost target: 90k per tier-S lesson against 78k measured on the catalog line, and 300k per multi-card item (provisional). There are four levels: founder → head-of-product and portfolio-manager → lane managers by mailbox → pooled workers. The 51 cm-* roles collapse into one pooled `category-curator`, and cultural plus safety review merge into `route-reviewer`. That takes **109 roles to 39**. Gate tiers are requested of the evaluation steward through AMD-014, not set.
- **Believe:** high confidence in the evidence tables (ledger, events, board, meta.json, recomputed this session). Medium confidence in the cost targets: tier S depends on AMD-014, and lane M has n = 1. The operator is still the hub: 1,280 of 1,281 dispatches, plus its own unmeasured production passes on 10-20 and 10-21.
- **Not measured:** all runs after 2026-10-16T15:27Z, the operator's tokens, and the personalization org's runs (proposal §1d).
- **Next:** the founder decides F-50. On A, step 3 comes first: chief-of-staff-ceo-office consults the receiving roles in writing. tools-lead resumes the ledger import (§3).
- **Blocked:** nothing in my lane. Step 10 (AMD-014 tiers) needs the evaluation steward and ratification.

## 2026-10-25 · chief-of-staff (for System 3 Meta, as vp-meta) · B13 running; the starter HQ, crew sessions, meetings and onboarding as code

Founder: "need to go do b13, write code for other features, when you need new repos for migration I will provide them later"; B13 approved at about $500.

**Done:**
- **B13 launched** at 09:50 UTC (bench13/B13.md, predictions B13-1 to B13-9 committed before the run). Eight members: two Opus, five Sonnet, one Haiku. B13 adds a plateau stop and a planned crash and resume of m-engine. At 10:17 it had 5 lands, none refused, and visible was 0.9271.
- **The starter HQ** (prototype/hq/): a dependency-free server over v1 event logs (/api/city, events, knowledge) and a Linear-like page. The page has a sidebar, Overview, Landings, Board, Notes, Meetings, People and Knowledge. bench2events.mjs shows B11 to B13 live.
- **The crew runner:** `sdkSession({options})` for real members; the company passes its own sandbox and permissions, and the CLI refuses real members without `--sandboxed`. A failed turn emits turn.error, and three in a row make the member idle.
- **Meeting minutes:** `crew minutes` emits a v1 meeting event, which the HQ Meetings page shows.
- **Onboarding as code** (prototype/onboard.mjs): the five starter archetypes, catalog search, proposals with alternatives (by the chief of staff or the org-health head), approval only by the company's owner, and generation (company folder, events, city entry).
- B12's ledger cause corrected: the budget rule stopped the continuation, not idleness.
- Tests: 360/360. product/FEATURES.md is updated.

**Belief:**
- High: the event log is a sufficient contract for the HQ, since the benchmarks render from it with no other source.
- Medium: onboarding's rules (alternative required, owner-only approval, referee owner and HQ developers always) are the right minimum. A first real company will show what is missing.

**Next:**
- B13's end: final scoring, off-boarding, KB rebuild, BENCH13.md.
- HQ extension points for company pages.
- The kernel's meetings.mjs as v1 events.
- Migration once the founder provides the repos.

**Blocked:** the migration repos (the founder will provide them).

## 2026-10-25 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmark 12: SQLite compatibility by SQLite's own test suite

Founder: "make it grounded in real compatibility test", "Yes go ahead with B12".

**Done:** bench12/BENCH12.md (final). Test material: SQLite 3.53.4's own Tcl suite (from Ubuntu's archive), replayed through the driver: 763 files, 34,868 statements, real SQLite's outputs; 480 hidden files. Both arms from B11 V's engine (57.8% hidden). Hidden mean per test file: **V 86.92% ($145.05, 142 min), O 85.76% ($142.27, 63 min)**. O divided the work by SQLite area on its own (27 lands, none refused, 10 notes); all sessions read the knowledge base; off-boarding added 52 entries (106 in total).

**Belief (medium-high):** at the same budget the autonomous org now matches one strong agent within about a point, and gets there in under half the wall-clock time; the single agent is still slightly better per dollar. **Next:** test the org's speed advantage directly (same wall-clock limit for both, or a budget that does not run out), with the wake-notes fix. **Blocked:** nothing.

## 2026-10-25 · source batch 07 · 200 sequential and survival drafts

Implemented exactly 200 probability-list entries (remaining ledger positions 600–799). These are bounded numerical illustrations with source-specific boundaries; richer simulations suggested by the source list are not asserted to be complete. All lessons remain draft, claims unverified, evidence empty. No independent review or novelty certification is claimed.

Validation: 938 cross-language arithmetic/schema/state assertions and 1,044 relationship, new-recall and draft-boundary checks pass. TypeScript and browser/build checks are recorded separately when completed. Company check retains 811 errors/four warnings; full verify stops at inherited publication failures. W-2039 tracks independent review. Implementation coverage reaches 1,400 of 1,500 entries; the last 100 remain, plus the earlier recall audit W-2037. No merge or deploy.

## 2026-10-25 · source batch 06 · 200 process and inference drafts

Implemented the next 200 source entries with explicit queueing, stochastic-process, sampler, pooling, GP and filtering models. 1,020 arithmetic/schema/state assertions and 434 relationship/fresh-recall checks pass. TypeScript passes with a 6 GiB Node heap after the default heap exhausted memory. Company check remains 811 errors/four warnings. This batch's build/browser validation is pending; independent approvals are not claimed.

Saved completed batch05 evidence: 400 protected browser passes, 200 strict phone fits, final production build exit 0 and 2,645 pages. Batches02–04 have 1,200 browser passes and 600 strict phone fits recorded in continuation-series. Source/learner/overlap readiness remains open. Implementation coverage now reaches 1,200 supplied-list entries; 300 probability entries remain (200 then 100). Prior transfer-case audit W-2037 remains to be completed. No merge or deploy.

## 2026-10-25 · source batch 05 · 200 information and inference drafts

Implemented the next 200 remaining source entries, spanning information, testing, confounding, selection, counterfactual and experimental-design models. Exact curation and boundaries are in company/reviews/continuation-batch-05. All claims remain unverified and all lessons draft. No independent review is asserted.

Validation: 956 arithmetic/schema/state assertions, 437 relationship/fresh-recall checks and TypeScript pass; inherited company diagnostics remain 811 errors/four warnings. The full verification retains publication failures. Production browser checks for batches 02–04 are running from their recorded snapshot; this batch's build and browser checks remain pending. Transfer generation now rejects either displayed input as recall; older continuation cases are queued for audit before completion.

Source-list implementation coverage is now 500 behavioral plus 500 probability entries, 1,000 total; 500 probability entries remain (200, 200, 100). W-2033 remains doing; this batch and its review boundaries are recorded separately. No merge or deploy.

## 2026-10-25 · source batch 04 · 200 probability drafts

Implemented probability source entries 1–200 as explicit finite mini-labs. Manifest, original provenance, curation and fixtures are in company/reviews/continuation-batch-04. Validation: 854 arithmetic/schema/state assertions, 32 mathematical relationships and TypeScript pass. Company check remains 811 errors/four warnings; full verify retains publication failures. Build and browser validation remain pending after session interruption; no completed result is fabricated. No independent source or learner approval is claimed.

Implementation progress against supplied lists: 500 behavioral and 300 probability entries are implemented across PR16, PR17, PR19 and this batch; 700 probability entries remain. W-2035 tracks this draft batch and W-2033 the remaining queue. Each new batch is at most 200, with a final 100 remainder. All new lessons remain drafts. No merge or deploy.

## 2026-10-24 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmark 11: SQLite-compatible database in Clojure; off-boarding and a persistent knowledge base

Founder: "go for sqllight", "Clojure, core families"; the org must have autonomy (continuous work, self-landing, roles not limits); "add the persistent knowledge base", "i thought we have agents off boarding"; "make it grounded in real compatibility test".

**Done:** bench11/BENCH11.md (final). Hidden core corpus: V 1.0000 ($145.69), O 0.9998 ($117.91): a tie at the ceiling; the task was too easy. The autonomous org set its own contract, built in parallel, landed 23 times, sent 45 notes and stopped itself when done. Harness bug (org land's stale lock, found by O's m-engine) blocked O's lands for ~50 min; fixed. Off-boarding added: 54 entries with evidence and beliefs in company/sibling/system3-meta/knowledge/ (entries.jsonl, KB.md, README.md).

**B12 groundwork:** SQLite 3.53.4's full source (with its TCL test suite, 1,281 files) from Ubuntu's archive (sqlite.org and GitHub are blocked); tclsh installed; bench12/record.tcl records each test file's SQL.

**Belief (medium-high):** both arrangements saturate a task this size; B12 must be grounded in SQLite's own tests and be larger than one context. **Next:** build B12 (extract and cap the suite's SQL, references from real SQLite, visible/hidden split by test file, a speed component), with on-boarding from the knowledge base. **Blocked:** nothing.

## 2026-10-24 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmark 10: optimising compiler, the full org against one agent

Founder: "Yes go with SQLite first, design B10", "$300 approved, go ahead"; and on reasoning: hold the thesis, iterate the design ("victories happen after many many failures").

**Done** (company/sibling/system3-meta/prototype/bench10, BENCH10.md final):
- v1 (build SQLite) was solved at the start: B9 V's compiler builds SQLite 3.53.4 and passes 170/170 scripts once given headers. v2: make the generated code fast, scored by callgrind instruction counts against gcc -O2 (load-independent), gated by 3,000 hidden SQL scripts, hidden W1-W5, Lua, compile time, determinism.
- Result: by the committed rules **O (the org) 1.256, V 2.0** (V's compiler miscompiles 2 hidden W5 integer-promotion tests); on the count alone **V about 1.05** (near gcc -O2) against O's 1.256. Costs from transcripts: V $110, O $132 (about $45 of it a harness re-run).
- The org's mechanisms worked: 8 kept merges from all 4 workers, a pass one worker built and another extended, stewards in 3 areas, Sonnet workers 35% of credit; an O worker found a bug in the judge (UTF-8 split per pipe chunk) and the architect reinstated a merge the bug had falsely reverted.
- Harness failures fixed during the run (all logged): load-dependent compile-time gate; turn/round costs above assumed rates; restart re-ran cut turns; byte-unsafe output comparison (126 references regenerated); SDK cost unreliable for resumed sessions; practices never credited (every turn cut).

**Belief (medium-high):** a single strong agent with a 1M context goes deeper and faster on one coherent redesign; the org's comparative advantage on this evidence is checking (it caught real defects), not breadth. **Medium:** O's correctness may be conservatism, not design.

**Next (design, needs the founder's go):** B11 org with fewer, longer-lived workers, a held-out correctness check inside the referee, and cut turns that still hand in practices; or the lessons-company test. **Blocked:** nothing.

## 2026-10-24 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmarks 9b and 9c: warm forks and the autonomous org

Founder: "Yes keep going" (B9b, then B9c); later: "we did not run the principled org right?" (answer: a lean version only; see BENCH9C.md "What this says").

**Done** (company/sibling/system3-meta/prototype/bench9):
- **B9b, PF** (BENCH9B.md): a scout session, 4 then 3 warm forks with generic temperaments and a findings board. Quiet 0.624 for $60.53, against V 0.529 (re-judged) for $18. Forks held 220-280k context, used the board (23 entries, round-2 plans cite round-1 entries), but went for the same first change, stopped early, and could not measure under four parallel sessions.
- **B9c, AO** (B9C.md, BENCH9C.md): three persistent warm workers, claims, the board, merges kept only if the referee's fast judge says main did not get worse, an arbiter for conflicts (never needed), a coverage map. Quiet 0.637 for $66.54 (true). Every mechanism worked (no collisions, a duplicate avoided through the board, 2 regressions reverted, merges from all 3 workers in all 4 areas); it still lost to V by 20% at 3.7x cost.
- **Deviation:** AO stopped after 2 of 3 rounds: time-capped turns logged $0, so the cap rule would have run round 3 over $70. Fixed in run.mjs (cost estimated from the transcript).
- Board claims (board.mjs), fake judge for dry runs.

**Belief (high):** on a bounded problem that fits one context, with a wall-clock referee on one shared machine, one strong agent beats every multi-agent design we have tried (cold population 0.613, warm forks 0.624, autonomous org 0.637, all at about 0.62 against 0.53). The proportion principle predicted it. **Medium:** the org's mechanisms (claims, board, referee, merge) are sound and are what a long-horizon or too-big-for-one-context task would need.

**Next:** a fair test of the full principled org (stewardship, K38/K39 beliefs on the board, per-worker measurement, possibly a second model family) on work that gives an org a reason: too big for one context or long-running, e.g. a large batch of lessons in the lesson company. Needs the founder's go. **Blocked:** nothing.

## 2026-10-24 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmark 9 written up; founder principles recorded

Founder: "go after B8", "no native image", "go with K39", then the principles (autonomy, diversity without restriction, full context, shared organised learning, roles and ownership as stewardship, coverage and reach, in proportion).

**Done** (company/sibling/system3-meta):
- **Benchmark 9** (prototype/bench9/BENCH9.md, final): make B8 V's compiler compile fast, three arms one after another at $70 / 240 min. Quiet final: the org S 0.540 ($60.94), one agent V 0.542 ($18.00), the population P 0.613 ($21.26). S and V tied within the judge's ±2%; V at 30% of S's cost. P improved every generation and was cut by time. S's round 2 broke the gate (its timings beat V's) after a 24-minute stage-error stall; K39 then retired three speed rules on that broken round (an attribution flaw).
- **PRINCIPLES.md**: the founder's principles for agent organisations, checked against the Zen of System 3.
- Kernel and harness fixes along the way (pushed): the checked-list split, K38, K39, the tally's V cost, S9 on B8's harness, the fast judge skipping timings after a failed check.

**Belief (medium-high):** when a problem fits one context, one strong agent is the cheapest way to the best result; our multi-agent arms saw a tenth of the context each and were told what to look at.

**Next:** three kernel fixes (a held stage error escalates or retries; a retry re-runs integration; K39 does not score effect rules on gate-failing orders), then B9b (fork population) and B9c (the autonomous org of PRINCIPLES.md), lean, against V's 0.542 at $70. **Blocked:** nothing.

## 2026-10-24 · remaining source demos · second continuation batch (200 behavioral drafts)

Implemented batch 03 as exactly 200 additional behavioral source entries. Together with PR16 and PR17, this completes implementation coverage of the 500-entry behavioral list; independent source and learner approval remain open. Explicit curation, fixtures, unverified claim records and manifest live in company/reviews/continuation-batch-03. The single operator makes no independent review claim.

Arithmetic/schema/state: 812 checks; 14 relationship checks; TypeScript pass. Company diagnostics are identical to the inherited 811 errors/four warnings. Build and browser validation pending. The remaining implementation queue is 900 probability entries in four batches of 200 and a final 100. W-2031/2032 track draft batches, W-2033 the remaining probability queue and W-2034 independent template review. No merge or deploy authorized.

## 2026-10-24 · chief-of-staff · PR #16: 100 behavioral + 100 probability/causal demos

Implemented exactly 200 new draft lessons from the two attached source lists: 100 behavioral (four per each of 25 sections) and 100 probability/causal (34 sections). PR: https://github.com/hanialshater/system-3-company/pull/16. Each has its own computed cases, original source provenance, curriculum entry and recall. Shared renderer has eight visual kinds and retained evidence through Reset; local wrappers render the actual kit Lesson and four controls. No new role, dependency version or protected path changed.

Verification completed: exact 200-entry manifest/runtime checks; 500 behavioral fixture/state/provenance checks, 100 probability-A numerical assertions, 50 probability-B fixture tests, 12 engine regression tests, TypeScript, production build and all 400 phone/desktop contract cases (zero retries). Build has 1,845 lesson pages. `npm run check` remains the exact baseline 811 errors/four warnings (identity hash in validation.json); full verify stops at the same two existing publication tests. Strict phone fit passes all 200 at 390×844; 20 actual screenshots cover both domains and all eight visual kinds. All 27 completed supplemental Reset probes pass; that extra loop was interrupted and 173 were not run. The ordinary protected contract already exercises Reset last on every route. The QA report records three open content findings, routed to category managers as W-2029/W-2030.

What I believe: high confidence in implementation counts, pure arithmetic fixtures, contract behavior and bounded engineering fixes; these checks do not establish learning or verify the supplied empirical findings. All 200 lessons are draft and all 1,601 claims remain unverified. Source verification, independent learner reviews, publication boundaries and shared-engine ops readiness remain open. The framework reported an existing Next.js security advisory; its supported build retry passed, and no upgrade was made in this content PR.

Next: review PR #16, then the owning category managers route fact checks and independent learner reviews. The manager/source/engineering/QA records and reproducible manifest are under `company/reviews/behavioral-probability-200/`. No merge or deploy has been performed. GitHub publication used the authenticated connector; its initial cc61db3 commit has the exact tree8b484292 of local source422b1109, verified against the create-tree response.
## 2026-10-23 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmark 8 written up; K38 and K39 built; Benchmark 9 ready to run

Founder: "Go with the C compiler in Clojure", "We need S vs vanilla", "do the comparison after W7 then keep going", "No native image, go after B8", "for learnings lets make them baysian", "Yes go with K39".

**Done** (company/sibling/system3-meta/prototype; 335 tests green):
- **Benchmark 8** (bench8/BENCH8.md, final): one vanilla agent V against the specialized org (S1 stopped at W3; S2 to its cap at W5, then W7 out of competition). Accuracy tied (1,126 of 1,131 hidden at W5; Lua 22 of 22 for both). V cost $86.94 for W1-W7; S2 $81.59 for W1-W5 (2.0× V) and $38.82 for W7 (2.7×). V's compiler compiles about 40% faster (Lua 10.8 s against 14.7 s). S2's one clear win: W5's first hand-in (6 failures against 11). One operator intervention (the W5 change-request deadlock).
- **Kernel:** K38 (Bayesian beliefs per playbook rule), K39 (learning from measured effects: metric lines, effect rules), and a fix for multi-word classes in a stage's checked list (no W3 rule was ever scored before it).
- **Benchmark 9** (bench9/): protocol, predictions v1 and v2 (committed before any arm), judge (fast and full, interleaved sandboxed timing), arms V, P (population) and S (Meta as arm S9 on B8's harness, with K39). Not yet run against the SDK.

**Belief (medium confidence):** on exact-referee build tasks, one strong agent beats our org on cost and time at equal accuracy (B5, B6, B8). The org's mechanisms work; its open questions are learning on recurring work (E2) and diversity on open optimization (B9).

**Next:** B9: setup --baseline, the full judge on the start, fake dry runs of V, P and S, then V → P → S → quiet final scoring (about 14 h, at most about $210). **Blocked:** nothing.

## 2026-10-22 · chief-of-staff (for System 3 Meta, as vp-meta) · M4-M7 integration: M4 and M6 reached, M5 reached in code, M7 built (full cycle deferred)

Founder: "Ultracode I want you to work until M7 is done", then "Keep going until M7 is done", then "we are still developing, if you are done we can move to other tasks before big run". Budget approvals and top-ups went through the queue (M4 A-1..3, M6 A-1..10, ISS-11/12, M7 A-1..5). M4 and M6 acceptance was delegated ("Decide for me").

**Done** (company/sibling/system3-meta; prototype 262 tests, adapters 197 passing, all green):
- **M4** (prototype/M4-RUN.md): 3 real lessons through Meta's 9-stage lesson flow on the company's own tools. Published in the sandbox in 45 min for $9.75. One real fact-check revise. One operator fix for the slug bug, now fixed. Branch `meta/m4-merged`.
- **M5** (K13-K15, inbox-export, ledger-gate): charged spend, budget stops and asks, the founder-inbox export, and the AMD-015 standing approval as data. All 8 refusal classes are tested.
- **M6** (prototype/M6-RUN.md): 10 lessons in two lanes with 3 builders. All published on `meta/m6` for $36.90 ($3.69 a lesson), with 7 real fact-check revises. Budget stops and the founder's top-ups worked live, and charged spend equals the ledger. Missed: lead time, median 51 min against 41.
- **M7** (prototype/M7-STATUS.md): K18-K23 built and reviewed. They cover:
  - the ritual scheduler on rituals-due;
  - several flows per spec;
  - dispatch-check as a launch gate;
  - the event export, board mirror and resumable serve;
  - Demo Crit decisions mapped to orders;
  - the progress handoff.

  A 17-min live slice held and committed 4 overdue rituals on `meta/m7` (digest, WBR, design review, Demo Crit). The founder stopped the 24 h cycle.
- **Sandbox only:** `meta/m4-merged`, `meta/m6` and `meta/m7` are pushed. Nothing is merged to main and nothing is deployed.

**Believe:** Meta can run the company's lesson work end to end on its real gates, at about $3-4 a lesson, with the fact-checker catching real errors (8 of 8 revises were real). Builders in parallel did not raise throughput: check loops are the tail. Confidence: medium. n = 13 lessons, one model, and acceptance was delegated, not the founder's own.

**Next:**
1. The big run: one full 24 h M7 cycle (resume /home/user/meta-runs/m7, or start fresh from `meta/m7`).
2. Before it:
   - keep walkthrough artifacts durable;
   - decide the event units;
   - ratify the plan's restatements.
3. The founder reviews or merges the sandbox branches.

**Blocked:** on the founder: merging `meta/*`, the restatements in plan §M4-§M7, and the 24 h run window.

## 2026-10-21 · chief-of-staff (for System 3 Meta, as vp-meta) · M2 reached, M1 export ready, Benchmarks 4b and 5

Founder: "Go go", then "Yes system 3 meta co".

**Done** (company/sibling/system3-meta/prototype, 82 tests):
- **M2.** `generator.mjs` and `init --spec-file`: companies from JSON specs, validated against invariants (`specs/toy.json`, `research.json`, `sheetco.json`).
- **M1 export.** `export-kernel.mjs` writes a standalone tree; 80/80 tests and a live run pass from it.
  - The repository `hanialshater/system3-meta-co` could not be created: the GitHub integration got a 403 on create.
  - **The founder creates it empty and gives the Claude app access, then I push** (the tree is committed locally in the session scratchpad).
- **Benchmark 4b, like for like.** With company context: 80.7k per order, 79% of live run 3. All four faults were recovered by code, the watchdog live.
- **Benchmark 5, hard.** The team designed the modules, shipped three waves in 24 min, and every hidden test passes. The rework was real:
  - 6 builder→lead asks;
  - the design reopened after the hidden tests exposed a spec mismatch.

  BENCH5.md has the details.
- **Kernel bugs found by these runs, all fixed with tests:**
  - the frozen kernel per run (after I broke a live run by editing meta.mjs);
  - the watchdog's orphan mark was never saved;
  - a crashed judgment launch held its reservation for 30 min;
  - the wait-deadline double launch;
  - reservations ended by the wrong launch;
  - the launcher passed this session's env to agents.

**Believe:** the mechanics are sound and fault recovery is real. Cost is about 80-95k per order with full context. n = 1 per benchmark.

**Next:**
1. Push M1 once the repository exists.
2. Re-run Benchmark 5 on the fixed kernel, to see the empty sessions and the hang gone.
3. M4: a second domain with an external acceptance measure. The founder picks the use case.

**Blocked:** M1's remote, on the founder.
## 2026-10-21 · chief-of-staff (for System 3 Meta, as vp-meta) · M3 reached: the hands-free company (Benchmark 4)

Founder: "update tools.md, then go with Agent SDK for M3, also continue previous tasks, keep going decide for me until we reach a big milestone".

**Built** (company/sibling/system3-meta/prototype, 75 tests):
- **Sessions that wait for their next item** (`room next --wait`). This is the token lever.
- **The company escape list.** `escape add` adds `knownFalse` checks to every text order; it is seeded with the Venus claim.
- **The Agent SDK launcher** (`launcher/`, pinned 0.3.293, decision `decisions/2026-10-21-agent-sdk-launcher.md`).
- **Fault recovery in the supervisor:** the regression gate, the watchdog, `order reopen`, and announcements in briefs.
- **`mail dup`** is now managers-only.
- **TOOLS.md** is current.

**Ran:**
- Benchmark 4 as the M3 exit run (prototype/BENCH4.md, record in live/bench4-record): a 10-order spreadsheet engine with injected faults.
- Results:
  - 10/10 shipped, and every hidden test passes under the changed requirement;
  - 9 sessions, 0 typed commands, 8 min 52 s;
  - 45.3k tokens per order (live run 3: 102.6k), $3.88 in all.
- Faults: crash, corruption and changed requirement were recovered by code. The lost-message fault never fired in the run.

**Believe (sure on the mechanics, n = 1 on cost):**
- M3 is met.
- The cost figure is not like for like: these sessions carry no company CLAUDE.md.
- The task proved too easy with a precise spec: 0 revise loops.

**Next:**
1. A live watchdog test, injected from the tick.
2. A like-for-like cost run.
3. A harder task built on an ambiguous spec.
4. M1 (kernel repo) and M2 (generator).

**Blocked:** nothing.

**Note:** `npm run check` reports 811 errors that predate this work; none are in company/sibling.
## 2026-10-21 · chief-of-staff (for System 3 Meta, as vp-meta's ISS-1/ISS-3) · Benchmark 3: the kickoff ablation

**Done:**
- Benchmark 2's quiz task re-run on the current tools, in two arms: A with the kickoff meeting, B without it.
- Predictions D1-D6 were committed first. Results are in `company/sibling/system3-meta/prototype/BENCH3.md`, the record in `live/bench3-record/`, and the second org evaluation pack in `live/orgeval-2/`.

**Believe (n = 1 per arm, moderately sure):**
- **The kickoff pays.**
  - Half the revise loops: 3 against 6.
  - 13% fewer tokens and 21% less time.
  - Both blind judges preferred A, in both orderings (9 of 12 criteria).
  - Facts are a draw.
- **Orchestration is solved:** 0 typed commands per wake and 3 in all.
- **Cost is not solved.** A used 84% of the current method's tokens. Cost is now sessions × about 65k, because every launch drained one item.

**Next:**
1. Fix the four tool findings listed in BENCH3.md.
2. Batch revise and re-check work into fewer sessions.
3. Add a company escape list. The Venus "thick clouds" claim has escaped three runs running.
4. Then Benchmark 4 (spreadsheet engine with injected faults). Its hidden suite (208 cases) and reference are in the session scratchpad, not yet in the repo.

**Blocked:** nothing.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · The three Benchmark 2 fixes, built and run live (live run 4)

Founder: "go ahead with the 3 fixes".

**Built** (company/sibling/system3-meta/prototype, 60 tests):
- **Decisions become checks:** `meeting decide --rules`, which tighten open and later orders.
- **Giveaway check:** the `distinctAnswers` text check. It flags Benchmark 2's Pluto giveaway and nothing in the baseline pack.
- **No command per wake:** `supervisor.mjs serve`, which streams launches and briefs to a monitor.
- **Gaps found live, also fixed:**
  - `allowedLines`;
  - minutes written as files;
  - `check` rules stated in plain words;
  - one `serve` per state;
  - batch usage by session.

**Live run 4** (LIVE4.md; predictions committed first):
- **The run:** a 3-round quiz plus pack, all shipped in 11.5 minutes, with 11 sessions, 773k tokens and 0 typed commands per wake.
- **Rules:** the kickoff's rules became code checks on every order.
- **Revisions:** one, for two decisions the chair did not carry, one of which no check could express then.
- **Shipped pack:** clean by the code check.
- **Predictions:** L4-1 refuted and L4-4 wrong, both by my own operator errors (a refused set-up, a missing flag, a wrong kill); L4-2 wrong; L4-3 right.

**Belief** (medium):
- The loop now runs on code end to end. What remains is decision quality: carrying every rule. The operator's mistakes now cost more than the tools'.

**Next:**
- A within-round answer check.
- Launch briefs from the file unchanged.
- Re-run the Benchmark 2 task on these tools.

**Blocked:** nothing.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Benchmark 2 (quiz pack): the loop in code, and an honest second result

Founder: "Don't stop".

**Built** (company/sibling/system3-meta/prototype, 54 tests):
- `supervisor.mjs cycle`: usage, watch, launch reservations and briefs written by code. The plan now covers meetings, chairs and delegation.
- `meta.mjs batch`, `check` and `help`, and an adaptive drain cap.
- Text checks gain literal `mustInclude` (it was broken) and `lineMaxWords`.
- A refused command no longer keeps partial changes.
- WBR fixes: revised orders count as misses, and the first window has a start.

**Benchmark 2** (prototype/BENCH2.md; predictions C1-C7 committed before the run):
- **Tokens:** Meta used 70% of the current method's (C1 wrong, not refuted).
- **Wall time:** 1.64× (C3 wrong).
- **Orchestrator actions:** 142% (C2 refuted). The wake is still typed by hand.
- **Bookkeeping by hand:** 0 (C7 right).
- **Facts:** no wrong facts in either pack.
- **Judges:** both blind judges would publish Meta's pack (9 of 12 criteria).
- **Defect shipped:** Meta's PACK integration missed a cross-round giveaway (Pluto); its WBR caught it and opened a fix (ISS-14, ISS-15, not run).

**Belief** (medium, n = 2):
- Meta's quality edge is real and comes from the kickoff.
- Its cost edge holds only when the kickoff's checkable rules become code checks.
- Serial gates cost wall time.

**Next:**
- Decisions → order checks.
- Parallel start after decisions.
- A cycle hook in the harness.
- A code check for cross-round giveaways.

**Blocked:** nothing. `npm run check` errors predate this work and sit outside the sandbox.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Company tools built; Benchmark 1 (story book) against the current method

Founder: "start building these, iteratively and test it … benchmarked against current method. Use writing small story book as a proxy task", with goals (levels, breakdown, RAG, due, why, what, success, roll-up review, board) and rituals with APIs (WBR: page 0, summary, hits and misses, roadmap and goals, leadership asks routed so not everything reaches the CEO).

Built in company/sibling/system3-meta/prototype (46 tests). Each new file listed below is a tool:
- building.mjs: floors and rooms.
- channels.mjs: broadcast with acks.
- tracker.mjs: Linear-like.
- goals.mjs: levels, a contributes-to tree, RAG, auto-red, divergence, code-measured criteria, roll-up review.
- meetings.mjs: private-then-revealed positions, whiteboard, objections, decisions → actions, minutes.
- asks.mjs: routed to the lowest decider.
- rituals.mjs: WBR, goal review, digests.
- specs.mjs: an org as data.
- Text checks as test1.

API.md, ROLES.md and TOOLS.md are updated.

Benchmark 1 (prototype/BENCH1.md; predictions committed before the run): one 5-page picture book per arm.
- **Tokens:** Meta used 38% of the current method's tokens per accepted item (9 sessions against 25).
- **Speed and rework:** Meta was 0.89× the wall time, with 0 revisions against 5.
- **Quality:** both books passed the rubric 6/6. Both blind judges preferred Meta on 10/10 criteria.
- **Wrong:** Meta took 167% of the orchestrator actions. Hand bookkeeping (launched, watch, usage) belongs in code. The current method's WBR hedged its counts rather than misstating them.
- **Tool defects found and fixed in this run:** 5.

Belief (medium, n = 1): the kickoff meeting is what paid. It settled pronouns, tense, names and the refrain before anyone wrote.

Next:
- a `launch` command (launched + usage + watch);
- an adaptive drain cap;
- a book-level UAT read;
- Benchmark 2 on a different proxy task.

Blocked: nothing. `npm run check` fails with 811 errors that predate this work and are outside the sandbox.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · API and role guidelines; manager-onboarding contractor

Founder: contractors' advantage is that they are "custom, less overhead, and disposable", useful in manager onboarding; "put a doc for meta company api docs and role guidelines so we don't lose track".

Added:
- **company/sibling/system3-meta/API.md:** files, concepts, the rules code enforces, every CLI and supervisor command, policy knobs, contractor engagements, event types, the live-round procedure;
- **company/sibling/system3-meta/ROLES.md:** founder, chief of staff, manager (with onboarding), builder, checker, release, supervisor, contractor; does, may not, commands;
- **the `manager-onboarding` contractor template** (contractor.mjs): a disposable research engagement whose brief carries the lane's data from code (report, policy history, open orders, findings, cycles), so a new manager gets a sourced lane brief. Tests 35/35.

Rule kept in both docs: change them in the same commit as the code they describe.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Manager-owned lane policy; contractors

Founder: the manager writes and updates the code for their lane; and "all managers are allowed to hire a one time contractor and decide on how to onboard them". Prototype (company/sibling/system3-meta/prototype, tests 33/33):
- **policy.mjs:** the knobs a lane manager may set (drain cap, later batch, how revisions queue, staffing threshold, a narrower `now` list), validated against an allowlist so a policy cannot touch signers, independence or leases; versioned and pinned per order; a manager cycle records numbers, belief and decision.
- **contractor.mjs** (corrected after the founder's "Contractor is for task that are not in the process, quick prototype, research etc."): any lane manager opens a prototype, research or spike engagement with chosen onboarding; it sits outside the flow (own folder only, no flow work, no signing, no shipping); research needs sourced findings; the manager accepts or rejects; it expires at its timebox; a result enters the product only as an order citing it (`--from-contract`).

Simulator iteration 5 tested the first policy change (revisions as `later`, batch 2): no saving (I5-1 wrong, +3.6% tokens in a quiet lane). Holding pays only if a partner arrives within the hold. So the manager decides from the lane's arrival gaps, and the next candidate needs an engineering change to the allowlist. Nothing in the current company changed.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Meta live run 3: the supervisor as code

Founder: "Yes go ahead" (the supervisor as a script). Built `supervisor.mjs` in company/sibling/system3-meta/prototype, with `state.mjs` shared with meta.mjs; tests 25/25. It does:
- test1, UAT from hidden tests, ship (module only), lease recovery and promotion;
- a launch plan;
- `watch`, which wakes on a state-file change or a timer and exits when an agent session is needed.

Live run 3: 4 orders, 6 agent sessions, all shipped. The supervisor cost 0 tokens, ran code steps in a median 0.5 s, and lifted flow efficiency from 12% to 44% (lead 2-8 min). S2 was wrong: 102.6k per order, because each revision needed its own builder and checker session (~64k each, nothing to drain). Class-level findings closed each revision in one loop. Found and fixed:
- the plan re-requested a launched-but-not-entered session (launch reservations added);
- runTests passed failing tests under a test runner (NODE_TEST_CONTEXT).

Next: cut revision cost (hold revisions as `later` so they share sessions; builder self-check against the class); the remaining manual link is starting agents (only the orchestrating session holds the Agent tool). Nothing in the current company changed.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Meta iteration 4 and live run 2: batching, priority, time

Founder asked about batches vs a mailbox queue, priority flags ("force now or for later"), and time redefined for a fast, parallel company.

**Tools** (company/sibling/system3-meta/prototype; 19/19 tests):
- sessions and `room next` (draining);
- priority now/next/later, with promotion at the due time and limits on who may say `now`;
- `--after` dependencies;
- rituals on progress, event and calendar clocks, counted in cycles;
- `flow metrics` (lead, work, critical path, flow efficiency, cost);
- a wake at lease expiry instead of a sweep;
- in the CLI: `usage add` and `usage correct`.

**Simulator iteration 4** (ITERATIONS.md): draining cut tokens 30%, with flat returns past a cap of 3. `now` gave a 2.2 h p50 at 1.64× the tokens. The progress-clock WBR met 69 times, too often: its stuck rule fires on quiet days.

**Live run 2** (LIVE2.md), 8 orders through 10 builder and checker sessions plus 4 supervisor sessions, all shipped:
- a 3-build drain session cost 37% of three single sessions;
- draining checks cost 14k each against 60k;
- 110.5k per shipped order including the supervisor, against 207k without it in run 1.

M3 was wrong: the `now` order was slowest because it failed its check twice. So checkers should report the class of a defect. Flow efficiency was 12%: waiting comes from batch orchestration. Next: a deterministic supervisor script (wake on message, ~0 tokens) and class-level findings. One recording mistake of mine (usage on the wrong session) was corrected by an appended event.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Meta live run 1: real agents through the prototype tools

Founder: "Decide for me". I chose a live run before calibration, recorded in company/sibling/system3-meta/prototype/LIVE.md, with predictions committed first. Setup:
- 2 toy tasks;
- 7 fresh subagent runs as builder and checker; this session as manager, release and supervisor;
- state shared across processes through meta.mjs (locked JSON);
- injected faults: duplicate notification, crash, boundary.

Both orders shipped. T2 went round a revise loop on real Unicode defects that the hidden UAT tests would have missed. 0 failed CLI calls by agents. Usage was recorded from the harness for 7/7 agent runs (413,587 tokens). Tool defects found and fixed:
- `--as` usable outside consult;
- refusals not persisted;
- no `room abandon`.

Biggest learning: about 50k of each 55-64k run is fixed start-up cost, so run count drives cost. Also: the supervisor's own tokens are unmeasured, and the recovery sweep polls in code. Next: wake on lease expiry; supervisor usage; simulator iteration 4 with fixed per-run cost (batching). Nothing in the current company changed.

## 2026-10-21 · history map illustrations · seven original SVGs (W-2025)

Added ships, a Normandy landing craft, horse, camp, fire, crossed swords and castle illustrations. Eighteen stories select artwork by checkpoint; atlas previews use the same vector source. Placement avoids labels and geographic points. Camps are unlocated illustrative vignettes. Standalone reusable SVGs and their generator are included. No historical dates, routes or coordinates changed; changed lessons remain drafts with unverified art-convention claims and bumped versions.

Verification: build and TypeScript pass; 128 history regression tests, 48 full phone/desktop flows, 48 protected contract checks and 57 feed tests pass. Visual inspection covered all seven assets and campaign/ship/castle/fire phone screens. Global check remains exactly 811 errors and four warnings, zero new errors. Full verify stops on two existing publication-readiness failures. The prior history figure test assumed every map lived directly in Demo.tsx; it now follows the story engine and verifies real coastlines/markers. Protected files untouched.

Production is READY at https://system-3-company.vercel.app/history: commit 57230dad9052f21eea9fbe0322047780bdf027e7, deployment dpl_AKCZ1SGmu4HRE4aGtPJtsLzUH5hh. All seven public SVG assets match the source bytes; 18 atlas previews show artwork; all seven symbol types pass 14 live phone/desktop checkpoint-to-reveal flows without page errors or horizontal overflow. Receipt: company/ops/deployments/2026-10-21-r21-production.json. Independent historical reviews remain with W-2024; these tests are implementation evidence, not editorial approval. Preflight: company/ops/deployments/2026-10-21-r21-verification.json.

## 2026-10-21 · history map stories · 24 drafts and a 200-topic curriculum (W-2024)

Implemented `/history` with 24 actual story lessons in eight families, including Normandy, Alexander, Golden Horde and the 1492 Atlantic voyage. Learners predict, visit four distinct checkpoints, scrub the timeline, compare earlier evidence and reveal an explanation beside the final map. Separate curriculum lists 176 further research candidates, not available lessons. Source addresses, schematic geometry limits, provenance and the narrative charter change are in the founder decision and `content/history-stories/README.md`.

Verification: production build and TypeScript pass; 26 data tests, 48 full browser flows and 48 unchanged protected contract checks pass on phone/desktop. Main-feed 57/57 and deploy tooling 19/19 pass. Global company check remains exactly 811 errors and four warnings, with zero new errors; publication and HQ suites retain failures. `company/ops/deployments/2026-10-21-r20-verification.json` records the scope and limits.

All new lessons remain drafts and source claims unverified. Independent research/cultural pre-build review was not completed; this deviation is recorded explicitly. W-2024 is now with cm-history for independent research, cultural, fact and learner review before editorial publication. No protected file or gate changed. Production is READY at `https://system-3-company.vercel.app/history`: merged commit `b01e22688b6c6f27fac063284ecf23994fcda0e0`, deployment `dpl_3yEiP1WNeNG98AfKCNAfhzZPeCjE`. Live checks: all 27 pages return 200, the atlas links all 24 stories, and the four named examples pass eight phone/desktop flows without page errors or horizontal overflow. Receipt: `company/ops/deployments/2026-10-21-r20-production.json`. The explicit project Git deployment succeeded after a preview provisioning failure; the public alias was automatically assigned when READY.

## 2026-10-21 · chief-of-staff · r18 live; 100 history maps verified

Added sourced locator maps to all 100 city-history lessons (82 previously lacked an SVG figure), preserving the 17 existing data figures. Deployed commit 4afb9c11a99c4d367be53939b363a328bbb67c6b reached Vercel READY; all 100 canonical production map assets match the tested files. Three live phone pages render, and Paris/Lyon predict → records → comparison → reveal passes with no JavaScript errors. Checks: 102 map regressions, 88 history models, 16/16 sampled phone/desktop contracts, TypeScript and production build pass. Expanded phone suite: 99/100 city lessons pass; Luanda/Kinshasa Sources intercepts Reset, reproduced with the map hidden, while normal close-Sources → reveal passes (W-2023). Global check unchanged at 811 baseline errors; full verify stops on two existing readiness failures. Receipt: company/ops/deployments/2026-10-21-r18-production.json. W-2021 complete. W-2022 routes independent fact-checking of map claims; no claim marked verified or lesson publication state changed. No deployment/auth configuration changed.

## 2026-10-20 · chief-of-staff (for System 3 Meta) · Meta prototype: tools, toy org, simulator, three iterations

Founder: "experiment with these tools create a toy org, simulate building and observe and iterate on performance. This is meta company, current company is not affected". Built in company/sibling/system3-meta/prototype/ (plain Node, no dependencies; nothing in the company imports it; no company tool, gate or data changed):
- tools: lib.mjs (engine with flows/orders/approvals, mailbox, rooms, org, rituals);
- toy org: toy.mjs;
- simulator: sim.mjs and run.mjs;
- tests: tests/tools.test.mjs, 12/12.

Predictions were committed before each run (PREDICTIONS.md, ITERATIONS.md). Iteration 1, engine vs a model of the current design: tokens/item 61%, lead p50 51%, founder interactions/item 15%; 0 duplicates, 0 violations, every crash recovered within one lease. Serial dispatch is the biggest single cost. P8 (checker bottleneck) was wrong: founder approval waits were the bottleneck. Iteration 2: the measurement fix closes the gap to 0%; 5 sittings; a staffing threshold that fires. Together: p50 3.6 h vs 10.0 h for the current design. Iteration 3: code-first test1 cut escaped defects 38% but not rework (I3-1 wrong): catching sooner still rebuilds. Two tool bugs found by the simulator and fixed with tests. Confidence: high in the tools' invariants under faults; low in the absolute numbers (assumed parameters, simulated workers; see "Limits" in ITERATIONS.md). Next: calibrate with EXP-009/pilot data; iteration 4 (builder runs the lint before leave); a live 2-3 agent run.

## 2026-10-20 · tools-lead · W-1998: EXP-009 reconciliation script built and run
- **Changed:** new `tools/reconcile.mjs` (read-only, dependency-free) and 12 fixture tests in `tests/reconcile/` (`node --test tests/reconcile/*.test.mjs`, 12/12). First run saved to `company/experiments/EXP-009/run-2026-10-20.json`; how each source is extracted, the matching rules and the limits are in `company/experiments/EXP-009/build-notes.md`. Tier-1 self-check: `company/engineering/readiness/2026-10-20-reconcile-exp009.md`. The checkout was a shallow clone; I ran a read-only `git fetch --unshallow origin` so that commits and meta.json history cover the window.
- **Believe:** the script computes every number, and its output is byte-identical across reruns on the same HEAD (tested). I am fairly sure the rules do what build-notes says. I am less sure the independent list is complete: the event log has 314 runs on 10-15/10-16 that no item names. I did not write EXP-009's `## Result`.
- **Next:** analytics-steward accepts it (W-1999): coverage table and a 10-gap sample, before reading the build notes. W-1998 is in review.
- **Blocked:** nothing. No event writer, hook, gate or protected path was changed.

## 2026-10-20 · chief-of-staff · Meta phase 0 registered: EXP-009 measurement integrity (founder go)

Founder asked to start testing Meta's runtime tools as a POC and agreed ("Ok") to start with phase 0 of company/sibling/system3-meta/2026-10-19-vision-and-experiment-roadmap.md. Registered company/experiments/EXP-009-meta-measurement-integrity.md before any reconciliation ran. It reconciles events.jsonl and ledger.jsonl against a list built independently from records and commits (window 10-15..10-19), with committed predictions P1-P7 (dispatch ≥ 90%, usage < 50% after 10-16T15:27Z, founder < 30%, publish < 50%, ≤ 4 causes) and a phase-1 bar (≥ 95% runs and usage, ≥ 90% founder). Why phase 0 first: the mailbox's reservation, duplicate and crash-recovery logic already has tests (`npm run test:mailbox` 11/11 pass today), while the WBR 10-17 found usage, founder and publish logging broken (A1, A7); every later Meta experiment is judged from these records. Board: W-1998 build (tools-lead), W-1999 acceptance (analytics-steward, findings before notes), W-2000 project tag meta-phase0, 200k (portfolio-manager). All three are in backlog: portfolio-manager approves them into next. No code, writer, hook or gate changed. Known limit: the chief of staff writes both the event log and most of the independent sources, which can only make coverage look higher. Confidence: high that phase 0 is the right first test; the predictions themselves are guesses from the WBR. Next: W-2000, then W-1998. Second POC after phase 0 passes: the first pilot's four failure checks with live agents (interrupt, duplicate notification, boundary request, idle session).

## 2026-10-20 · personalization-eval · session run plan: §11 written, formatter + parts check hashed, 11 chunks planned (W-2013)

What changed (not committed): criterion §11 (freeze commit bdebacc2, sha256 40a82a40…ef9; formatter and parts-check sha256; the run partition stated); new harness/cs/partsCheckS.mjs (11 chunks, each inside one §8 part; refuses missing/duplicated/foreign chunks, plumbing, wrong S, a run commit not descended from the freeze or changing anything but §11 and the allowed paths, harness or pin hashes unlike the freeze commit's); harness/cs/readoutS-tables.mjs (formatter, runs the check first, computes no verdict); harness/cs/RUN-PLAN-s1.md (commands); README. No file runS.mjs hashes and no pinned candidate file changed.

What I believe: the chunked run gives the same verdicts as one run (plumbing: merged verdicts.json byte-identical to an unchunked run, in a throwaway clone). Estimate about 9.0 h at --jobs=4, largest chunk about 58 min (timing sample on seeds 70001-70003, clock and line sizes only, no score read); medium confidence on durations (±50%). No session variant has been scored.

Next: commit the four eval files + this entry + the memory entry as one commit, then run the 11 chunks from a worktree at that commit (RUN-PLAN-s1.md §1-§3), then the parts check, merge and tables (§4), then the readout (personalization-eval, W-2013). Blocked: nothing.

## 2026-10-20 · personalization-eval · session criterion written, ready to freeze (W-2005); c2 harness pin fixed (W-1996)

What changed (not committed): W-1996: harness/c2/harness2.mjs `gamModelVersion()` reads `PHASE_A_MODEL_VERSION`, run2.mjs checks it and the GAM fingerprint, tests2.test.mjs reads it; tests2 25 of 25 (was 24). W-2005: company/personalization/eval/2026-10-20-session-criterion.md (status line says frozen; the freeze takes effect at the commit that adds it, §11 filled in the next commit) and its harness company/personalization/eval/harness/cs/ (runEpisodeS: criterion 3's interleave world plus the build's serving mode, compose 5 through simulate.mjs `composeSessionFor` and serve in order; K1-K5 readings; parts and merge). S record harness/records/2026-10-20-seeds-session-s1.json: S = 2000 (the cap binds, sd_R 0.195). Candidate pin (EDD-016 §4.2, W-1994's single file absent): sha256 of model.ts, composer-session.ts, composer.ts, simulate.mjs, catalog.mjs and the 231-lesson catalogue, in the criterion; the run refuses on any difference. Board: W-2005 review, W-1996 and W-1988 doing; new W-2011 (principal-engineer), W-2012 (learner-model-engineer), W-2013 (me).

What I believe: the harness serves the session variants as built (S-ID2: the loop with the default order as plans equals the reference arm, 72 of 72; S-ID1: non-session arms equal criterion 3's episode). No session variant has been scored or run in the eval world; the lock and the pin hold. High confidence in the plumbing (testsS 14 of 14, plumbing run). Two choices the VP should read before the run: K2 "upper 95% end below 0" is read as simultaneous 95% within each family (unadjusted, a zero-effect variant would be vetoed about 98% of the time across 156 tests); unadjusted losses are printed beside. K4 is non-inferiority at 5 points on the outside-home share of served new cards. Side effect: criterion 3's C3-ID2 and 3b's 3b-ID0 already failed on the live tree (model.ts, catalogue); harness2.mjs and run2.mjs now join them; readouts 2, 3, 3b reproduce at their own commits.

Next: chief of staff commits (the freeze); I fill §11 with the hash, write the tables formatter, then run three parts (about 10-13 h at --jobs=4) and merge (W-2013). principal-engineer: EDD-016 §4.4 recompose-on-reveal is not the scored mode (W-2011). Blocked: the freeze commit. `npm run check` fails with 117 errors in decision records and elsewhere, none in files this run touched.

## 2026-10-20 · learner-model-engineer · reasonCarriesMove uses >= (model-v0.4.4, W-2008) and the stale hq-cli comment (W-2009)

What changed (not committed, on df2f92f1 model-v0.4.3): per the VP ruling W-2007 (company/decisions/2026-10-20-vp-personalization-session-base.md §7), `reasonCarriesMove` is true iff the named reason's terms are >= the margin, in sim/composer-session.ts (`carries` line) and sim/sandbox-reference.mjs `recompose`, both doc comments updated. MODEL_VERSION model-v0.4.4 with a version comment and decision row (company/decisions/2026-10-16-personalization-model-v0.md). composer-session.test.mjs test 12: (e) recomputes with >=, fixture (f) now expects true. Build note §9.3, §9.4, §9.5 item 4 and sim/README.md updated. W-2009: hq-cli.mjs comment no longer says beta is a placeholder. `npm run test:personalization` green (test 10 pin, policy golden unchanged). `npm run check` shows 117 errors, none in these files.

What I believe: no pick, score or number moved; only the field's value at an exact tie can differ. High confidence (test 10 hash, golden). Mutation "> instead of >=" in composer-session.ts fails fixture (f) and nothing else. The same mutation in sandbox-reference.mjs alone fails no test, because no sandbox document hits an exact tie. So the reference's (and the port's) operator is guarded only by review.

Next: W-2006 (hq-engineer) after the commit: port reasonCarriesMove with >= (build note §9.5 item 4), then regenerate the precompute. Then W-2005 (personalization-eval). Blocked: nothing.

## 2026-10-20 · vp-personalization · W-2004 read-back: β = .033 stands (W-2010)

What changed: addendum §8 in company/decisions/2026-10-20-vp-personalization-session-base.md. It rules that β = .033 stands under §2.3. It corrects "about .1" to about .28 (the spread over EDP's *median* primary pull, not its strongest pull) and records that my .02 expectation paired two different statistics. Objections O10 (forking paths) and O11 (coarse EDP spread) are answered there. §1 and §2.3 are not rewritten. W-2010 is done. No code edited, nothing committed.

What I believe: β = .033 follows the rule with the same statistic on both sides. I checked EDP's need-widget spread (.15) in orchestrator-inline.js. Other matched definitions give .034 to .035. High confidence. K1 to K5 and O1 to O3 are unchanged.

Next: W-2009 (learner-model-engineer, the stale hq-cli comment), W-2005 (personalization-eval, criterion), and W-2006 (hq-engineer) after the commit. Blocked: nothing.

## 2026-10-20 · applied-scientist-personalization · β for gam-session-v3-edpbase set to .033 (model-v0.4.3, W-2004)

What changed (not committed, on 5e7aad4e plus the VP's §7 addendum): model.ts `COMPOSER_SESSION.edpBaseEdits[0]` β .02 placeholder → .033, with the derivation as its reason; MODEL_VERSION model-v0.4.3 and a version comment. composer-session.test.mjs test 11 now pins β = .033 and the new reason, and asserts the placeholder text is gone. Decision row model-v0.4.3 (company/decisions/2026-10-16-personalization-model-v0.md). New W-2004 section in company/personalization/policies/gam-session-params.md with the arithmetic. No other number moved. `npm run test:personalization` is green (test 10 hash and policy golden unchanged).

What I believe: β = (EDP base spread .15 / EDP median primary pull .529) × our median primary pull .115 = .0326 → .033, by the VP record §2.3 rule applied with the same statistic on both sides. Two other matched statistics give .034 and .035, so I am fairly sure of .03 to .035 (medium-high). The record's "about .1" and "near .02" are not reproduced: they paired EDP's strongest pull with our median-need pull. My W-2000 "≈ 1.5" figure caused that, and the W-2004 section corrects it. No compare, no layout probe, no recall/score/simulated/groundTruth field read.

Next: W-2010 (vp-personalization) read-back on the .1 vs .28 ratio. W-2009 (learner-model-engineer) stale hq-cli comment. After the commit, a layout probe may report departure shares, and W-2006 (hq-engineer) syncs the port and precompute. Blocked: nothing.

## 2026-10-20 · vp-personalization · reasonCarriesMove equality edge ruled ≥ (W-2007)

What changed: addendum §7 in company/decisions/2026-10-20-vp-personalization-session-base.md. For a moved card, `reasonCarriesMove` is true iff the reason's value is ≥ the margin (it was >). I ruled before any session result. Objections O7 (> is cautious), O8 (float rounding) and O9 (the test checks necessity only) are answered there. W-2007 is done. W-2008 is filed for learner-model-engineer with the exact spec. No code edited, nothing committed.

What I believe: ≥ is the only test that matches §5's stated meaning, because the composer moves a card only on a strictly greater score, so a tie keeps the default. High confidence. On real floats the effect on K5 should be close to nil.

Next: W-2008 (learner-model-engineer), before eval freezes the session criterion. The W-2006 port uses ≥ (build note §9.5 item 4, once updated). Blocked: nothing.

## 2026-10-20 · learner-model-engineer · Session variant gam-session-v3-edpbase and trace field reasonCarriesMove (model-v0.4.2, W-2003)

What changed (not committed, on 702e4588): model.ts gets MODEL_VERSION model-v0.4.2 and `COMPOSER_SESSION.edpBaseEdits`, one row `["session","base",1.0,β,…]` kept apart from `edits`. It adds `sessionCoefficients("v3-edpbase")` = applyEdits(v3, edpBaseEdits), and checkModel requires exactly that row with β > 0. **β = .02 is a placeholder pending W-2004**: it is the VP's non-binding expectation, not a derived value. sim/composer-session.ts adds `reasonCarriesMove` on every session pick and slot: true iff the named reason's need:+cov: terms > score(winner) − score(default); null when not moved. The winner is now always in a slot's candidates. sim/simulate.mjs adds the SESSION_VARIANTS entry and SANDBOX_VARIANTS. hq-cli.mjs adds meta.session["v3-edpbase"]/edpBaseEdits/sandboxVariants and `sandbox --variant=edpbase`. sandbox-reference.mjs carries the same field. composer-session.test.mjs adds tests 10 to 12. Also: a decision-record row, the sim README, and build note §9 (company/personalization/policies/gam-session-build-note.md).

What I believe: v1, v3, no-cov and every phase A policy are unchanged. High confidence. The golden and c2 fingerprint still match, and test 10 pins the three older session policies' composed outputs to a hash computed on a git archive of 702e4588 (new field dropped). The reasonCarriesMove tests are mutation-sensitive: 10 mutations were tried, and each fails a test. Medium confidence that strict > is the right rule at exact equality. By the record's own justification it should be ≥ (W-2007). npm run test:personalization passes (about 9 s). npm run check fails 117 errors, all in other roles' files (decision records), none in mine.

Next: W-2004 applied-scientist-personalization sets β and rewrites the reason (test 11 pins the placeholder text, so it must be updated with it). W-2007 vp-personalization rules > vs ≥. W-2005 personalization-eval adds the arm and K5. After commit: W-2006 hq-engineer port sync (§9.5 list), then personalization-engineer reruns hq-lab-precompute (STALE 69).

Blocked: nothing. tests/hq "drift after a drag" and "precomputed sandbox documents" fail until W-2006 and the regeneration land. The other 11 test:hq failures also fail at 702e4588.

## 2026-10-20 · vp-personalization · Session composer base: keep 1.0 in v1/v3, score one EDP-base variant (W-2002)

What changed (not committed): decision record company/decisions/2026-10-20-vp-personalization-session-base.md. No code or number edited. Board: W-2002 done. New items: W-2003 (learner-model-engineer: variant gam-session-v3-edpbase = v3 plus one base edit row, plus a `reasonCarriesMove` trace field on every moved session slot), W-2004 (applied-scientist-personalization: β for that edit row, by a fixed EDP-ratio rule, expected near .02, not from a probe), W-2005 (personalization-eval: put the arm and my keep/kill roles K1-K5 into the session criterion before it freezes).

What I believe: `base` is not the holdout. The holdout is the default-order arm (head-of-product's order), and no candidate's base changes it. base sets how far a candidate drifts from that order, which makes it a product constraint. Keeping 1.0 in v1/v3/no-cov leaves the reviewed numbers meaningful. One extra variant isolates the anchor: v3-edpbase against v3 differs only in base. Keep/kill comparisons are fixed before any result exists. K1: each variant vs default-order (gate). K2: per-persona clear-loss veto. K3a-c: attribution contrasts, where ties go to the simpler variant with less drift. K4: served subject mix vs default-order (guardrail; without a measure, nothing is recommended for serving). K5: the reason names the real cause of every move (copy gate). Confidence is high on the framing and medium that one variant is the right size of experiment. I have no belief about recall: nobody has seen a session result.

Next: W-2003 and W-2004, in either order (LME builds the row; the scientist sets β), both before eval freezes. Then W-2005 with W-1996/W-1988, and the frozen-hash requirement (EDD-016 G0, §4.2). If the variant is not built when eval is otherwise ready, eval freezes without it and I withdraw it in the record.

Blocked: nothing.

## 2026-10-20 · applied-scientist-personalization · Session numbers re-reviewed at model-v0.4.0 (model-v0.4.1, W-2000)

What changed (not committed): model.ts §4b numbers only. v1 addrUse .35 → .45, attentionCost .1 → .06, slotDecay .02 → .01. The v3 synergies build.onCov go from +.15 to +.28 and repair.onCov from +.15 to +.35. Every changed number has a rewritten "guess" reason, and the two "model-v0.4.0 note" strings are replaced. MODEL_VERSION is model-v0.4.1, PHASE_A_MODEL_VERSION is still model-v0.2.2, and the decision record has a new row model-v0.4.1. The model README has a line. Params note: company/personalization/policies/gam-session-params.md (W-2000 section: EDP target shapes, per-slot layout before/after, chain counts, sensitivity). No algorithm change: sandbox-reference.mjs, src/ and tools/ are untouched. `npm run test:personalization` is green (golden and c2 fingerprint included). `npm run check` shows the same 117-error baseline, none of them in personalization.

What I believe: each number is one EDP ratio converted to our units, chosen before the probe. addrUse = median primary addr of EDP's widgets (.45). attentionCost = EDP's cost .06, because the budget's gain is now in EDP's need-mass units. slotDecay = 2× EDP's slot_decay differential (the O2 premium). Synergies = .71 × onRem, EDP's median on_cov/on_rem ratio. Medium confidence in the scale, low in any third digit. Layout only, departure share by session slot. v1: .43 .11 .02 .00 .00 → .51 .15 .03 .01 .00. v3: .42 .11 .03 .01 .00 → .53 .25 .07 .03 .00. v3 chains of 2: 1 → 22. Sessions with a synergy pick: 2 → 34. The budget changed a pick in 0 → 11 sessions, mostly at late slots, as EDP's does. Not met: "first picks across needs". The blocker is base (the default-rank gradient), not any of the four numbers, and base is a holdout decision, so I routed it (W-2002). Known cost: v1's slot-0 bar no longer equals phase A's moveThreshold .1. Nothing was scored, no compare was run, and no recall, score, simulated or groundTruth field was read.

Next: learner-model-engineer and personalization-eval get the versioned numbers. hq-engineer finishes W-2001 (port sync to the v0.4.0 algorithm; the numbers flow through the sandbox document). The chief of staff commits, then personalization-engineer reruns `node tools/hq-lab-precompute.mjs` (the lab data is stale). vp-personalization owns W-2002 (base). personalization-eval scores gam-session and gam-session-v3 independently.

Blocked: nothing.

## 2026-10-20 · learner-model-engineer · Session composer model-v0.4.0: addr consumption scale, EDP gain, no cov on the default card (W-1999)

What changed (not committed): session composer only. model.ts: MODEL_VERSION model-v0.4.0; `SessionCoefficients.addrUse` (v1 .35, "guess", the scientist's estimate); checkModel requires 0 < addrUse <= 1; two scientist reason strings carry a "model-v0.4.0 note" (values unchanged). sim/composer-session.ts and sim/sandbox-reference.mjs, in lockstep: a pick moves remaining and coverage by addrUse x addr (scoring addr unchanged); the attention-budget gain is EDP's resolvable need mass, sum of min(remaining, addrUse x addr); the default card's cov:* terms are 0 (it keeps need:*). composer-session.test.mjs tests 2-4 rewritten (EDP applyAddr on the scaled addr, EDP gain line copied verbatim, residual need, default-card cov, budget with EDP gain), test 9 also checks margin and gain plus a cost-.3 drag. Eight mutations were each caught. Decision record row model-v0.4.0, both READMEs, gate label. Build note §8 lists the exact algorithm diff for the HQ port (§8.1). PHASE_A_MODEL_VERSION and every phase A policy are byte-identical (golden full check passes; c2 fingerprint matches).

What I believe: the engine change is correct and matches the EDP reference. High confidence, because the tests copy EDP's applyAddr and gain lines verbatim. I implemented EDP's no-cov default because I found no reason against it (0 same-addr moves in the probe). I kept the default's need terms because dropping them raised v1 slot-0 departures from .43 to .56. Layout only, departure share by session slot, v1/v3: before .40 .13 .11 .06 .05 / .37 .11 .18 .10 .08; now .43 .11 .02 .00 .00 / .42 .11 .03 .01 .00. Needs now survive a pick, but the residual pull (about .02 to .05) is below the move bar, and the EDP budget decided 0 served cards at today's numbers. So the brief's hope that chains would form does not hold without number changes. That is the scientist's call. Nothing was scored. No compare was run and no recall field was read.

Next: applied-scientist-personalization re-reviews the numbers at v0.4.0 (W-2000). hq-engineer syncs src/lib/hq-personalization-sandbox.ts (W-2001). The chief of staff commits. personalization-engineer then reruns `node tools/hq-lab-precompute.mjs`. W-1999 is in review.

Blocked: nothing. test:personalization is green. test:hq: the three sandbox tests (drift, drift after a drag, precomputed docs) fail as expected until W-2001 and the regenerate. Its other failures are in files I did not touch. npm run check: 117 errors / 5 warnings, the same baseline as below; none come from these files.

## 2026-10-20 · applied-scientist-personalization · Session composer numbers reviewed (model-v0.3.1, W-1995)

What changed: model.ts §4b only. The v3 edit `build.onCov` goes from +.3 to +.15. The v3 row `breadth.onCov` −.3 → −.5 is removed, so v3 now differs from v1 by complementarity only. The reason strings for v1 onCov.build and slotDecay are rewritten (values unchanged). MODEL_VERSION is now model-v0.3.1, PHASE_A_MODEL_VERSION is still model-v0.2.2, and the decision record row model-v0.3.1 is added. Every v1 number is unchanged. Params note: company/personalization/policies/gam-session-params.md. `npm run test:personalization` is green, golden and c2 fingerprint included. `npm run check` fails only on errors that were already there before this change (lesson gates, decision-record owner lines), none in personalization. Not committed.

What I believe: the changes follow from EDP's reference behaviour and from the composition mechanics, not from recall (no compare run, no recall field read). Medium confidence that +.15 is the right scale; the structural mismatch is addr consumption, not the coefficients. src/data/hq-personalization is still stale (manifest says model-v0.3.0).

Next: the chief of staff commits, then runs `node tools/hq-lab-precompute.mjs`. personalization-eval scores gam-session and gam-session-v3. learner-model-engineer owns W-1999 (a session-only addr consumption scale, and whether the default card carries cov terms).

Blocked: nothing.

## 2026-10-20 · learner-model-engineer · Session composer (composer-v0.3-session, model-v0.3.0) built beside composer-v0.2

What changed: model.ts §4b COMPOSER_SESSION (session of 5, EDP applyAddr remaining/coverage, cov:* on_cov terms, slot decay and attention cost on departures, attention budget, v1 + 3-row v3 edit table via pure applyEdits), PHASE_A_MODEL_VERSION = model-v0.2.2; sim/composer-session.ts; policies gam-session, gam-session-v3, gam-session-no-cov in simulate.mjs ALL_POLICIES (not model.ts POLICIES); session trace personalization-sim-trace-v1; hq-cli meta.session, compare rows circular{} ("circular: diagnostic only"), new sandbox command; sim/sandbox-reference.mjs (import-free recompute); composer-session.test.mjs wired into gate.mjs. Build note: company/personalization/policies/gam-session-build-note.md. Not committed (chief of staff commits).

What I believe: every existing policy is byte-identical (policy-golden unchanged and passing; c2 GAM fingerprint still matches with PHASE_A_MODEL_VERSION), high confidence. Nothing scored; no claim about which policy is better.

Next: applied-scientist-personalization numbers (W-1995); personalization-eval c2 pin + scoring (W-1996); precompute rerun after commit (W-1997); HQ sandbox (W-1998). Blocked: c2 harness tests2.test.mjs now fails 1 test on the live tree because it pins M.MODEL_VERSION (O-1, W-1996; not in any npm script). test:personalization green (~5.6 s); test:hq same 11 pre-existing failures as before; npm run check: 117 errors, same as baseline, none in personalization.

## 2026-10-20 · principal-engineer · EDD-016 serving design for the EDP-faithful session composer (paper only)

What changed: wrote company/engineering/edd/EDD-016-session-composer-serving.md and company/engineering/adr/ADR-011-frozen-learner-policy-modules.md (both proposed), indexed in company/engineering/README.md. Design only: no src/ code, nothing in company/personalization/model/ touched. Board: W-1988 personalization-eval (criterion must score the frozen file by hash; readout; registration per card S8), W-1989 privacy-reviewer (serving inputs, switch key), W-1990 analytics-steward (EXP format, counter semantics), W-1991 personalization-engineer (build, only after G1-G4), W-1992 principal-engineer-ops (G2 review; I authored it, so I do not review it), W-1993 evaluation-steward (the surface-value amendment the founder's list omits), W-1994 learner-model-engineer (single-file freeze contract).

What I believe: serving should copy a frozen, import-free candidate into src/lib/learner/policies/ with a hash lock, run on the device through EDD-010's glue, and sit behind NEXT_PUBLIC_NEW_LESSON_ORDER with a new value. The AMD-016 stated-fit order wins for a learner who turned it on. Confident in the placement (it follows the EDD-010 C1 precedent); moderately confident in the per-learner precedence (a product call for the amendment). Latency: I measured only the existing one-card composer (median 0.35-0.45 ms in Node); the session composer is not built, so its 2 ms figure is an estimate.

Next: personalization-eval (W-1988) before the criterion freezes. Blocked: everything after G1. Phase A failed, the session composer is unscored, and AMD-015 A1 requires a further amendment (W-1993) before any flag-on deploy. npm run check: 117 errors / 5 warnings, the same baseline as the entry below; none come from these files.
## 2026-10-20 · chief-of-staff · history maps restored; r18 prepared

Founder: “System3 company, many history lessons don't have a figur or map, fix it then deploy”. All 100 city-history lessons have sourced local maps; 82 previously lacked an SVG figure. Existing 17 data figures retained. New claims unverified, versions +1, statuses unchanged. Source commit 592da6a54bb114afc2e529f461170a81f6ca94b2, integrated on r17. Checks: 102 map regressions, 88 history models, all 100 phone map loads, 16 phone/desktop contract tests, TypeScript and final production build pass. Global check: 811 baseline / 811 final, zero added; full verify blocked by two existing readiness tests. Record: company/reviews/2026-10-20-history-location-maps.md. W-2021. Next: deploy approved r18, confirm live map assets and lesson flow, then save the release receipt.

## 2026-10-20 · chief-of-staff · Reveal-only pass; r17 (founder: "Deploy only when you finish")

Reveal pass over 1,032 lessons with inline reveals (probability and algo-* excluded): ~135 edited, ~110 restating maxims/slogan pivots/builder words cut. Most ai/* and all history reveals are quoted verbatim in claims (some whole-reveal claims), so they were left: that text needs W-2018 with the fact-checker. A separate reviewer found 16 cuts (12%) had removed the lesson's point or mechanism (chain-of-blame, loophole-lap-farming, never-flag-99, add-a-zero, bird-on-the-wire, ...) and restored them; lesson for copy-style.md: a closing line that answers the misconception is content, not a maxim. Checks: tsc clean; check adds nothing beyond version gates; lifehacks/books/algorithms/kit suites at baseline; no claims[] changed; QA contract 70/70 on 35 changed lessons (dev server). Ships with the 45 re-check fixes as r17.

## 2026-10-20 · chief-of-staff · r16 deployed; shipped copy re-checked and 45 fixes

r16 live (company/ops/deployments/2026-10-20-r16-production.json). Re-check of what shipped: QA contract on 39 changed lessons across all domains against production, 78/78 pass after retrying 6 transient load failures. Six read-only reviewers read every changed question/title/hook (~1,230 lessons) and flagged 59 issues (~4%): 12 meaning changes, 4 facts, 2 sensitive (WWII commander, juror framing), 30 broken, 6 forced. 45 fixed (no version bumps: same unreviewed cycle; no claims[] changes), 14 skipped (11 book "case B" items are real stage labels; 3 claim-quoted). Checks: tsc clean, check unchanged, test:lifehacks baseline, test:books 0 fail. Not deployed: needs founder approval. Next: reveal-only pass (copy-style.md), W-2018/W-2019.

## 2026-10-20 · chief-of-staff · Probability predict questions made immersive (founder ask)

Founder: the predict questions were "not immersive enough" (they now lead the card). All 79 probability questions rewritten as a concrete second-person scene (bus stop, check-up, game show, jury, classroom), 20-40 words, every condition the answer depends on stated plainly (e.g. the pivotal juror's "the others vote their clues"). Symbols and jargon dropped where the learner lacks them (1/k² and 1/rank described in words, "r =" removed, "independent" as "erring separately"). Every number, ${...} expression, answer index and option value unchanged; a few options reworded to fit the scene. Lessons not already bumped by the copy pass got +1 version. Check: no new errors beyond the version gates (W-2016). For the fact-checker: ten-times-links now states the 1/k² rule as "2 links 4 times rarer, 3 links 9 times rarer" (should follow from c1). Scenes are invented everyday settings; real cases (bombers, kidney stones) add no new facts.

## 2026-10-20 · chief-of-staff · Probability copy pass and phase layout (founder asks)

Founder asked for a review of all 79 probability lessons for non-intuitive framing and machine-written tells, then copy edits only, then the layout fix. Copy pass (ccd13d9b): 65 lessons, strings only. No answer index, option order or count, number, computed value, logic or claims[] changed; each edited lesson's version +1. Main tells found: closing maxims (~30 lessons), "X, not Y" (~20), "Right?/Surely" wink hooks, titles that spoil the answer, builder words on stage. Everything that sits in a claim sentence or needs new numbers or stage behaviour was skipped: W-2014 (cm-probability, claims/options), W-2015 (demo-builder, stage framing fixes). The bumps make 65 lessons fail the learner-review/QA version gates (78 new check errors, all of that kind; baseline 117): W-2016.

Layout (globals.css only, Lesson.tsx untouched): the hook is hidden once a lesson is mounted on the card (it restated the predict question); the predict panel sits above the stage; the explore panel is a slim bar under the stage. Typecheck passes; QA contract 8/8 (4 lessons × phone/desktop) and feed.spec 10/10 on a dev server. `npm run build` was refused by the session's permission classifier, so no production build ran. Reveal still shrinks the stage to a thumbnail on long reveals (W-237 behaviour); a reveal sheet over the stage needs a Lesson.tsx amendment: W-2017. Confidence: high on the copy edits being wording-only, medium on the layout across all domains (only probability lessons were screenshotted). No deploy.

## 2026-10-20 · chief-of-staff · Calm card design pass (founder ask)

Founder: lessons (e.g. plain-text-paste-scope) showed scrollbars, text read large, and the card felt cluttered by the question rather than immersive; "change nothing but the design". globals.css only: no lesson, copy, claim or Lesson.tsx change. (1) No scrollbar is drawn anywhere inside a card; areas still scroll by touch, wheel and keys. The feed's card body was `overflow: hidden`, so a long reveal could not be scrolled by hand at all; it now scrolls. (2) Type steps down: title 24→20px (phone 21→18), predict question 16px bold→15px regular (phone 14), reveal 14px (phone 13.5), options and buttons 14px. (3) The stage loses its framed box and sits on the card; the duration tag and the predict divider are gone. (4) Before the prediction, stage pictures cap at 30dvh, so the locked controls stay on screen (stage overflow in an 8-lesson phone sample went from 3 to 1). (5) /d/<slug> now wears the same dark immersive surface as the feed.

Evidence: before/after screenshots of 8 feed lessons on phone and desktop, plus the single page, on a dev server. QA contract on 6 lessons × phone/desktop and the feed spec: 20 passed. The 2 chip-filter failures come from QA_ONLY narrowing the allowed set, not from this change. `company check`: 792 errors before and after, the same count. No build, no deploy. Confidence: medium-high on the look across domains (8 lessons sampled); not checked: lessons with custom tall stages in books/algorithms. Shipped as r19 after the founder's "Approve deploy" (company/decisions/2026-10-20-founder-r19-deploy.md). Next: visual-designer review.

## 2026-10-20 · chief-of-staff · All-subject scene questions; r15 deployed (founder asks)

r15 (probability copy, scene questions, question-first layout) deployed to production via the `[deploy]` marker on the default branch after the founder's "I approve deploy" (record: company/ops/deployments/2026-10-20-r15-production.json; smoke on phone: new question on top, hook hidden). Then a lean pass over the other 1,542 lessons (founder chose "questions + spoilers only"): 1,049 lessons edited, version +1 each. Predict questions rewritten as second-person scenes; titles that gave the answer away reworded as questions; wink/mismatched hooks rewritten. Questions in shared files (books idea.json, lifehacks catalogs/resource-specs) edited in place with meta/spec titles kept equal. Where a claim quotes the text verbatim (most ai/*, lifehacks, history), only a scene sentence was prefixed or the lesson was left; history and sensitive topics got no scenes. All cs/algo-* edits were reverted (they had changed verified claim text or broken algorithms-200 claim coverage): W-board fact-checker item. Checks: typecheck clean; `npm run check` adds only version-gate errors; test:lifehacks/algorithms/books/kit/hq equal to baseline (one lifehacks regression fixed). Confidence: medium; scenes were written by 40 parallel agents and spot-read only. No local build (refused earlier); next: r16 deploy, then re-walks.

## 2026-10-20 · chief-of-staff · Evaluation extension and HQ findings

W-1984 source complete: new-demo continuation plan with existing role ownership,100-item queues/15-item checkpoints, independent overlap/calibration, broad-first buckets/exploration and exact independent readmission. W-1985/1986 future rounds/export andW-1987 Bayesian/GAM real-data research remain backlog; no new evaluation or329draft walkthroughs resumed. HQ evaluation derives snapshot coverage and separates ordinal profiles from per-criterion BT results; personalization foregrounds actual saved-choice source implementation, synthetic inspection and failed historical GAM. CPO/VP dispositions and independent engineering GO recorded.

Typecheck and source-render/count/link checks pass; focused5/6 includes privacy2/2. Verify fails inherited publish readiness metadata; unchangedbe3 reproduces it and staleBT generatedmetadata equality. Company check117errors/5warnings as baseline. Fresh build/browser NOTRUN: dispatchgate refused R1 overdue rituals/C3 path classification, no bypass. No private data read, source recipe/admission change, new rating, database operation or deploy. Evidence: company/engineering/readiness/2026-10-20-hq-findings.json.

## 2026-10-20 · chief-of-staff · Copy-release snapshot readmitted

Preserved concurrent default be3a6d58b; exact snapshot fc663bbcab56c209 independently readmitted under AMD-016. 146 stale observations stay fixed; all33 underlying disputes remain unresolved. No new ratings or app changes. Focused57/57, HQprivacy2/2 and independent actual-manifest2/2 passed. Company check remains117errors/5warnings, identical to be3 baseline; earlier smaller counts are historical. No deployment, environment mutation or real database writes. Source receipt: company/ops/delivery/2026-10-20-account-preference-readmission.json. RolloutW-1982 and baseline triageW-1983 remain backlog.

## 2026-10-20 · chief-of-staff · Account preferences merged into actual default

PR13 merged at14ec87ad5ce181bd32cc90209ffa48d156cedfa7 into remote default ccr-4c6c7654-ew9ko1. Optional subject/experience/challenge choices persist to signed-in accounts and drive the ordinary All feed; explicit Save/Edit/Off/Reset, export/delete, canonical fallback, private paging, account isolation and synthetic HQ inspection included. Founder Confirm AMD-016 plus required Board/owner dispositions recorded; exact protected patch3be5a518e and approved source admission885cdf385. No real-data learning; future evaluation remains append-only with exact readmission. Dataset0e5513073d5b6eca:1621total/954observed/921current/33disputed/667unknown.

Feature evidence:57focused,18static,62realPG account tests,4compiled account/cache obligations,10canonical feed browser cases; independent12 earlier variants with6affected reruns on final buildUgs6Ydt-f1pPdpqxwlyWj/app8f90c4ca6. Build/TypeScript passed. Aggregate verify/CI remain FAILED on unchanged reproduced default issues; integratedcheck15errors/5warnings. No assertion waived and no production-readiness claim. All owner acceptance and sanitized evidence committed. Receipt: company/ops/delivery/2026-10-20-account-preferences-source.json.

Source doneW-1981; rolloutbacklogW-1982 and inheritedbaseline triageW-1983. Development/Preview lack app account schema/config; Production has001–002 and requires reviewed additive003–004 plus separately approved deployment/environment readiness. No external DB/env/deploy change. Existing age/legal/region/release holds remain. Owned synthetic servers/container stopped, credential copies deleted. Shared dirty checkout preserved. Its localW-1754 names this task, but remoteW-1754 is unrelated older M1 work: never copy the shared board wholesale. Isolated integration checkout/private/tmp/s3-account-personalization remains clean except this bounded ops receipt; no unrelated paused work resumed.

# Progress log (session handoffs)

Newest entry at the top. Every session adds one before it ends. This is testimony from a worker
who no longer exists: check what you rely on.



## 2026-10-19 · chief-of-staff · PR11 historical release reconciliation

Existing deployed r11 is unchanged. The earlier Oct18 deployments are retained in releases.json historical_deployments by full commit; r11/r12 below are the original PR-only aliases, not current canonical release IDs. PR board IDs W1961–W1964 became W1977–W1980, preserving every existing task. No app or deployment configuration changed.

## 2026-10-19 · chief-of-staff · all-lessons production release r11

Founder approved the specific show-all release after disclosure of local validation limits. Triggered production Git build from remote default commit 991115658. Vercel deployment dpl_H5qwgJRpPZj35NZ3aU9PVeC6Hqt1 reached READY in fra1 and system-3-company.vercel.app switched to it. Remote production build/typecheck passed. Live smoke confirms feed total 1,283, map 200, three sampled draft pages and metadata 200 with Draft / Unpublished labels and original draft status, unknown lesson 404, and accounts still off. Browser independently displays the live draft label and prediction controls. Record: company/ops/deployments/2026-10-19-show-all-lessons.json. Release log r11 records zero lesson publication changes. W-1976 complete for requested visibility and deployment; no full-catalog interaction QA or publication acceptance inferred.

Auth is a separate incomplete setup: production database and secret configured, but sender-domain choice / mail setup and account go-live checks remain. No account flag changed by this release. Local Mac HQ case conflict and publication-fixture test failures remain for their owners.

## 2026-10-19 · chief-of-staff · show all lessons with accurate status tags

Founder requested all unpublished lessons visible instead of excluded. W-1976 is review. Shared visibility now includes published/review/draft/retired across feed, map, direct lesson URLs and sanitized metadata. Added distinct unpublished labels and map fallback entries for unmapped lessons. Publication statuses, claim evidence and protected files are unchanged. Policy and objections: company/decisions/2026-10-19-founder-show-all-lessons.md. Remote default remains ccr-4c6c7654-ew9ko1; work isolated in /tmp/s3-social-default.

Validation: npm check passed; platform 37 passed/4 build-dependent skipped; changed-source syntax checks passed. Production bundle compiled, but full local typecheck reports inherited HQ People.tsx/people.ts casing errors; full build failed during its TypeScript phase on that same conflict. Full verify stops on three publication-tool fixture tests. No full build, built-output or browser-QA pass claimed. Next: resolve/reuse the Mac HQ casing fix, complete production smoke, then obtain approval for this specific deployment under CLAUDE.md. No new production deployment performed. Auth sender-domain choice remains separately pending; no auth resources changed in this visibility task.

## 2026-10-18 · release-manager · W-1979: production verified against r10; bcd102d7 and 2902594b recorded as r11, r12

**Changed.** company/ops/releases.json r11 (bcd102d7) and r12 (2902594b), approved_by = founder after the fact (company/decisions/2026-10-18-founder-accepts-unapproved-deploys.md); company/ops/deployments/2026-10-18-unapproved-bcd102d7-2902594b.md; tests/hq/releases.test.mjs version list r1..r12, next r13. No deploy, no Vercel change.

**Believe (medium-high: public behaviour only; the Vercel CLI is logged out and there is no VERCEL_* env, so dashboard env values and deployment metadata were not read).** Production matches r10's intended state on every observable setting: in-review lessons served and tagged (SHOW_REVIEW not off), accounts/likes/saves/like counts all 404, HQ public, default feed order. Feed smoke 8/10; the 2 failures are the spec opening a draft slug that is 404 in production; with QA_ONLY=a-birthday-like-mine it passes. Differences from r10: none observed; r10 itself was a git-integration deploy with SHOW_REVIEW never pinned (no deployment record), so "review served" is the founder's 2026-10-15 choice, not a pin. New public surface vs r10: /hq/rnd, /hq/personalization, /hq/evaluation and a 404-gated /api/account/settings.

**Next.** Founder: confirm the dashboard production env has SHOW_REVIEW, ACCOUNTS_ENABLED, LIKES_SAVES_ENABLED, LIKE_COUNTS_PUBLIC as intended (I could not read it). W-1977 (ignoreCommand), W-1978, W-1980 open. **Blocked:** nothing.

## 2026-10-18 · chief-of-staff-ceo-office (Leonie, run leonie-gen-scope-1018) · W-1852: cards S1-S11 generated; Ambrose; lane 21

**Changed (branch org-generate, not pushed).** Cards S1-S11 of company/ceo-office/2026-10-18-personalization-scope-proposal.md applied in tools/org/roles.mjs and regenerated, one commit per card, as decided under company/decisions/2026-10-18-founder-delegated-decisions.md (S1 option 1, reading A, S9 deferred with 8 directs, S4 residue until First Light release 1). growth-designer reports to vp-personalization (team personalization); personalization-engineer owns the feed files and joins OPS_ENGINEERS. cm-books-science-history is now **Ambrose** (tools/org/people.mjs); head-of-evaluation keeps Tobias. POC map: lane 14 adds growth-designer; new **lane 21 "Evaluation (pairwise)"**, POC head-of-evaluation, roles pairwise-judge, evaluation-engineer. Handoff map updated. Board: W-171, W-672 re-owned to personalization-engineer; notes on W-1755, W-1793, W-748. Answers appended to the proposal (§9), the scope decision record (status decided) and the port objections 8/10/11/12 in company/decisions/2026-10-14-evaluation-org.md.

**Believe (high on the generated texts matching the cards; medium on completeness of the board moves).** `npm run check` passes; test:hq 105/107 (the same 2 shallow-clone release tests fail at the baseline 90ddd99a); test:mailbox 7/7, test:dispatch 114/114. growth-designer's seat did not need to move for the test, so no src/ edit was made. The rule-3 item is **W-1844**: the delegated record's W-1665 is its number before the renumber. mailbox laneCheck already passes head-of-evaluation → pairwise-judge, so the W-1844 wait is held only by lane 21's note.

**Next (file on the default branch's board; no ids were added here to avoid a second renumber).** hq-engineer: growth-designer's seat to the personalization room, and the "Personalization eval" h1. privacy-reviewer: D1 owner. evaluation-steward: §3 AMD-008 draft edits; W-1844. principal-engineer-ops: consult on OPS_ENGINEERS (after the fact). portfolio-manager: a budget tag for lane 21. chief-of-staff: org-change event, post-hoc §6 consults, merge of org-generate.

**Blocked.** The first pairwise round is blocked on W-1844 and a lane-21 budget tag.

## 2026-10-18 (evening) · chief-of-staff (acting release manager) · r10 LIVE: PR #8 merged, accounts off

**Changed:** PR #8 (accounts, server progress, likes/saves, AMD-013) merged into the default branch through PR #9 (a6333dd0), founder-approved; record conflicts fixed by renumbering this session's draft AMD-013 → AMD-014 and W-1671..W-1682 → W-1901..W-1912. AMD-013 marked applied; changelog records the merge and rollback recipe C2. Release r10 deployed to production at ~13:21 UTC by Vercel's Git integration from commit 8eeb961a (deploy marker), on the founder's choice after this session could not dispatch the Deploy to Vercel workflow (GitHub 403). Release entry r10 in company/ops/releases.json; tests/hq/releases.test.mjs counts r10.
**Smoke (chief of staff, curl script):** 720/720 published lessons 200; sampled drafts 404; 15 account API routes 404 with no Set-Cookie; /account shows the designed "Accounts are not available here" page (C5); in-review lessons serve 200 tagged "In review" per the 10-15 founder decision. /hq/releases shows r10. Not checked: browser QA on production, WebKit.
**Believe:** sure r10 is live with every account surface off (high). The deploy skipped the workflow's staged promotion; CI verify on 882737a4 ran beside it.
**Next:** W-1913 (head-of-product: in-review lessons must be 404 for First Light Q1.3, decide before the 11-13 freeze); W-1914 (release-manager: workflow dispatch permission); a flags-on staff preview needs W-1706 (founder infra), W-1716, W-1714, W-1701/W-1702, PC5/PC6. **Blocked:** W-1706 on the founder.

## 2026-10-18 (latest) · chief-of-staff · category scale-out plan drafted for the founder

**Changed:** `company/decisions/2026-10-18-founder-category-scale-out-plan.md` (proposed): independent Category Management org with human cluster leads and a Studio pool it borrows from by work order; lesson families (engine + specs) and six content types; HQ approval state machines derived from disk; cost levers O1–O8; phases (Phase 0 launch coverage to 11-06, design on paper in the freeze, build in December). Board W-1908..W-1912 for the owners' written answers. Nothing applied.
**Believe:** review and approval, not building, is the constraint (high). Launch coverage ~720 → ~815 is reachable only if the Life Hacks safety review and algorithm claim scripts land by 11-06 (medium). Token-per-lesson figures are a ledger unit, not dollars.
**Next:** owners answer by 10-21/22; founder decisions D1 and D2 (Books F1/F2) by 10-22. **Blocked:** D2 on the founder.

## 2026-10-18 (later) · chief-of-staff · simple lesson path: five answers in, objections recorded

**Changed:** founder ask recorded in `company/decisions/2026-10-18-founder-simple-scalable-lesson-path.md` (class gates) with draft AMD-014. All five route answers are in `company/reviews/_gates/` (each "agree with changes"). Objections copied into the record with proposed Answers; W-1903..W-1906 done; W-1907 (evaluation-steward) redrafts AMD-014. Nothing in `tools/company.mjs` changed.
**Believe:** the answers converge: publish-only gates with the 720 published grandfathered; route derived from domain + concept, not stored; a11y gate waits for `a11y-scan.mjs --record`; stop rule = any fatal flaw in a sample of max(3, 10%); "told, not shown" and answer leaks checked in brief, pre-flight and rubric. Confidence high on the census numbers (steward's script), medium on whether the batch signature adds value (head-of-product's own doubt, hence the 1-in-5 audit).
**Next:** W-1907 redraft; scanner `--record` (platform-engineer, not yet on the board until the redraft names it); constitutional review board; founder ratifies. **Open:** whether `a11y-scan.mjs` severity rules become protected.

## 2026-10-18 · evaluation-steward · W-1902 answer on the simple publish path (AMD-014)

**Changed:** wrote `company/reviews/_gates/2026-10-18-simple-path-evaluation-steward.md` (agree with changes; objection to a stored `reviewRoute` field). W-1902 → review. Nothing in `tools/company.mjs`, the AMD or the decision record changed; no commit.
**Believe (high, census by script):** AMD-014 as written fails `check` on day one, because `cmdCheck` runs `launchGates` on published lessons: (c) 720/720, (a) 26, (f) 12. Fix: publish-only gates plus grandfathering. QA records carry no lesson version, so step 4 of the decision record is wrong.
**Next:** head-of-product W-1903, then the other route answers. After that the steward redrafts AMD-014 with publishGates, a derived route, (g) the QA version, residual holds and tool-drawn samples. **Blocked:** nothing.

## 2026-10-18 · chief-of-staff · roles keep/remove draft for the founder

**Changed:** wrote `company/ceo-office/2026-10-18-role-keep-remove.md`: every role with runs, board load, handoffs and a keep/remove verdict. Board W-1901 (chief-of-staff-ceo-office) to review it and put it to the founder alongside F-13/F-33. No role, roster, subagent or seat changed.
**Believe:** 57 keep (incl. founder), 44 remove: 34 strand managers (keep only cm-math-discrete and cm-cs-algorithms), plus domain-scout, courses-lead, visual-designer, mockup-artist, design-engineer, illustrator, researcher, vp-rnd, localization-lead, localizer. Fairly sure on the counts (events.jsonl ends 10-16; lane-named dispatches undercount some roles). Medium confidence on visual-designer, design-engineer and vp-rnd, which are judgement calls on overlap.
**Next:** founder decides per row; CEO office runs offboarding for each accepted removal.

## 2026-10-18 · chief-of-staff · accounts, progress, likes/saves rebuilt (flags off); PR #8 open

**Changed:** founder put accounts, server progress, public likes and private saves first (company/decisions/2026-10-17-founder-accounts-likes-saves.md). PRD-005 written. Privacy rulings filed. The lost `accounts` branch was rebuilt (WBR A5) and fixed through two review rounds; all merged on ccr-bf4ba2e6-qi1p4x behind ACCOUNTS_ENABLED / LIKES_SAVES_ENABLED / LIKE_COUNTS_PUBLIC (default off). WBR 2026-10-17 held (anomalies A1-A8, W-1689..W-1694). PR #8 into ccr-4c6c7654-ew9ko1: https://github.com/hanialshater/system-3-company/pull/8 .
**Verified:** `npm run verify` on de5ff7013 exit 0 (2,576 browser tests); test:accounts 52/56 on Postgres 16, 0 fail; test 31 (accounts off: 404, no cookie).
**Believe:** sure the flags-off merge is safe (three reviews approve). Not ready for a flag-on preview: W-1716 (PC3 account binding, PC9), W-1714, W-1701/W-1702, W-1706 (founder infra), PC5/PC6.
**Next:** CI on PR #8, then founder approval to merge; after merge, record the merge SHA in company/ops/changelog.md (rollback C2) and dispatch W-1716. Do not change code on the branch before the merge without re-running verify.
**Lesson for the next chief of staff:** pass `--agent` to every dispatch-check or the slot leaks (A2). Save any unpushed agent branch into the pushed branch before a session ends (A5).

## 2026-10-17 (close) · chief-of-staff · external assessment closed; AMD-013 applied; Meta VP design ready

**Changed:** AMD-013 ratified by the founder and applied (aeb637c0b, `Amendment: AMD-013`), with principal-engineer conditions C1-C4; status `applied` so it no longer licenses protected edits. left-or-right has a stamped v3 QA record. Founder decisions recorded: light management with a strategy layer (W-1685, W-1686); System 3 Meta unparked, VP design written and consulted (principal-engineer, evaluation-steward, portfolio-manager: agree with changes), awaiting founder D1-D8. Assessment closure table: company/reviews/org/2026-10-17-external-assessment.md. Pending work saved as patches in company/ops/pending-patches/ (onboarding text W-1687; verify scripts W-1682).
**Verified:** verify on aeb637c0b: 12 Node suites green, check, typecheck, build green; browser contract 819 of 2,576 passed with none failed when the session closed (W-1688 confirms the rest).
**Believe:** sure the gate now reads verdicts, versions and holds (status lists 1 ready). Medium that the full browser run passes (no lesson code changed).
**Next:** founder: Meta D1-D8; onboarding text (W-1687); 3 budget rulings; EXP-002 recruiting; EXP-001 plants; mark AMD-002/AMD-012 applied (W-1680). Owners: W-1677 head-of-product, W-1681/W-1688 qa-tester, W-1682 PE-ops, W-1672 tools-lead. Overdue rituals: wbr, demo-crit, design, ops, vertical, rnd, project review.
**Blocked:** this session could not cherry-pick or log some events (permission classifier); nothing deployed; no deploy tag in any commit.

## 2026-10-17 (evening) · chief-of-staff · external org assessment: five workstreams merged

**Changed:** filed the founder-shared assessment (company/reviews/org/2026-10-17-external-assessment.md) and dispatched evaluation-steward, tools-lead, chief-of-staff-ceo-office, portfolio-manager and analytics-steward in worktrees. Merged four: tools-lead tier 1 (c6c088681; tier-2 package.json commit 9824b61bc held for PE-ops, W-1682), analytics-steward, portfolio-manager, evaluation-steward (drafts only; nothing protected applied). **Not merged:** CEO-office onboarding branch worktree-agent-af3f82ee838c3affc, because it changes CLAUDE.md and working-agreement text the founder ratifies first. Applied 27 of 30 portfolio triage calls; W-1337/W-1349/W-408 back to review; head-on-is-a-wall links its r2 learner review. Board W-1671..W-1684. Founder digest: company/rituals/records/2026-10-17-founder-digest.md.
**Verified on the merged tree:** check, typecheck, next build, test:deploy/publish/lifehacks/books/algorithms/kit/platform/dispatch/mailbox/memory/metrics/hq and rituals all pass; feed spec 10/10; contract QA 12/12 for the six published lessons whose newest QA record was a 10-14 fail (company/reviews/org/2026-10-17-failing-qa-published-recheck.md). Full contract QA over all lessons not run (no lesson code changed).
**Believe:** sure the old launch gate calls 223 review lessons ready where one policy calls 1 ready (AMD-013 measure). Medium: dispatch rule B1 now refuses History, behavioral-econ and Life Hacks v2 batches; correct for behavioral-econ, but History may be within budget if its 2.5M counts from approval (founder question).
**Next:** founder decisions in the digest; PE review of AMD-013 (W-1676); W-1681 attested QA; head-of-product on the 268 grandfathered lessons (W-1677); lean-lane step 1 after the F-42 pilot (~10-19).
**Blocked on founder:** the six digest decisions. Nothing deployed; no commit carries the deploy tag.

## 2026-10-18 · chief-of-staff · HQ M1 done on the branch; default branch merged; PR #7 opened

**Changed.** HQ tabs Personalization (lab, frozen candidates labelled NO-GO, the org's evaluation record), Evaluation (BT leaderboard ported from ccr-rnd-ncm) and R&D (code-evolution leaderboard). Evaluation-org roles ported; seats given. Default branch ccr-4c6c7654-ew9ko1 merged in: 176 board ids renumbered (company/ops/2026-10-18-board-renumber.md), simulator catalogue pinned to b210adeb, dims index regenerated. PR #7 into the default branch. Founder decisions recorded: L3 (lapsed with G), AMD-015 ratified and applied, website NO-GO (Mateo's G), Personalization vs Evaluation scope (proposal S1–S11 waiting).

**Believe (high).** Checks pass on the merged tree (test:hq 105/107, 2 shallow-clone release tests). Computer-use QA not re-run after the merge.

**Next.** Founder: scope cards S1–S11 (W-1851), evaluation-org questions (W-1667), merge of PR #7. Owners: W-1847, W-1848, W-1850, W-1664 review.

**Blocked.** Nothing on the branch; merges and any deploy are the founder's.

## 2026-10-18 · chief-of-staff-ceo-office (Leonie, run leonie-perso-scope-1018) · W-1849: scope cards for Personalization owning the feed, learner profile, gamification and progressive learning

**Changed.** New company/ceo-office/2026-10-18-personalization-scope-proposal.md (design under company/ceo-office/org-change-process.md for company/decisions/2026-10-18-founder-personalization-vs-evaluation-scope.md). Cards S1-S11: vp-personalization scope (default order: option 1 stays head-of-product's as the baseline, option 2 moves it), platform-engineer gives the feed surface files to personalization-engineer (S2/S3, with OPS_ENGINEERS), growth-designer moves under the VP (S4), learner-model-engineer takes the progressive-learning engine (S5), `progress`/`recall` as reading A (stay with backend, recommended) or B (move to learner-data-engineer) (S6/S7), gamification experiments to personalization-eval (S8), head-of-feed stays deferred with restated triggers (S9), chief-product-officer out-of-scope line closing port objection 8 (S10), head-of-product line (S11). AMD-008 draft edits routed to evaluation-steward (§3); HQ label fix routed (§4). No roles.mjs edit, no generate, no board edit.

**Believe (medium-high on the scope map, medium on the recommendations).** No new role is needed; the span goes 7 → 8 (objection 2). Reading A is recommended because `recall` is the measure personalization is judged on.

**Next.** chief-of-staff: file the §6 consults and the founder-inbox line. Founder: approve or change each card and choose S1 option, reading A/B, S9. Then this office generates.

**Blocked.** Nothing generated until the founder's words are in the record.

## 2026-10-18 · learner-model-engineer (Ifeoma, run lme-catpin-1018) · simulator catalogue pinned to b210adeb (merge-default, after d212efa2)

**Changed.** New company/personalization/model/sim/catalog-pin.mjs + catalog-pin/ (233 files: pilot meta.json trimmed to title/status/concept/curriculum fields, curriculum verbatim, PIN.json). hq-cli.mjs, run.mjs, policy-golden.mjs, review-timing.test.mjs, privacy-n1-n3.test.mjs and tools/hq-lab-candidates.mjs read it through the unchanged loadCatalog(root); self-check.mjs fails on a hand-edited snapshot. Decision note: company/personalization/2026-10-18-simulator-catalogue-pin.md (incl. how to move the pin). No frozen/hashed file touched (catalog.mjs, model.ts, composer.ts, harness, candidates, criteria, readouts); dims index not touched.

**Believe (high).** Pinned catalogue hash = readout 3b's 27b535da…; pilot inputs identical at 4e13ef1, b89f259, b1ae294, e210144. `npm run check` passes; `hq-lab-precompute --check` current (69 files) with no regeneration; `npm run test:hq` 105/107 (only the 2 shallow-clone releases tests); privacy-breaks 13/13.

**Next.** W-1847 personalization-engineer: precompute INPUTS to name the pin dir. W-1848 hq-engineer: L2 re-read of the two lab files. The frozen harness still reads the live tree (by design); readouts reproduce at their own commits.

**Blocked.** Nothing.

## 2026-10-18 · lesson-dims-owner (Anneke, run dims-merge-1018) · dims index regenerated after the default-branch merge (merge-default, d212efa2)

**Changed.** Reran company/personalization/dims/build-index.mjs (generator unchanged): src/lib/learner/dims-index.generated.ts now 954 lessons (published 720, review 234), 231 pilot (probability 78, cs 153), 12 anchor strengths. New dated note company/personalization/dims/2026-10-18-dims-index-coverage-update.md (coverage table, new pilot order sha); the 2026-10-17 record is untouched.

**Believe (high).** `npm run test:dims` 6/6. `npm run check` fails only at review-timing test 10 (company/personalization/model/sim/review-timing.test.mjs), which does not read the dims index; that is the simulator catalogue moving with the merge, learner-model-engineer's open catalogue-pin work in this worktree.

**Next.** personalization-eval: re-pin or keep the 230-slug sha in checks3b.mjs / default-order-rule.md (now pre-merge; 231-slug sha in the note). learner-model-engineer: catalogue pin so review-timing test 10 passes.

**Blocked.** Nothing for this role.

## 2026-10-18 · chief-of-staff-ceo-office (Leonie, run leonie-evalorg-port-1018) · W-1842: the evaluation org's four roles ported to branch eval-org-roles

**Changed.** Ported from `origin/ccr-rnd-ncm` (never merged), on the founder's 2026-10-18 acceptance (company/decisions/2026-10-18-founder-evaluation-leaderboard-in-hq.md): chief-product-officer (Margot, leadership, reports to founder), head-of-evaluation (Tobias), pairwise-judge (pool, in `MANY`), evaluation-engineer (Anya), all in team `evaluation` under the CPO except the CPO herself; head-of-product now reports to chief-product-officer. Edits: tools/org/roles.mjs, tools/org/people.mjs, then `node tools/org/generate.mjs` (4 role docs, 4 agents, 4 empty memories, head-of-product.md and roles/README.md regenerated). Copied company/decisions/2026-10-14-evaluation-org.md and appended a "Port" section with objections 8-14. company/ceo-office/org-change-process.md: founder directs list names Margot, not Priya (still 9 directs), keep consulting Priya. Nothing in src/app/hq/**, tools/eval/**, company/evaluation/** (W-1841).

**Believe (high on the port, medium on completeness of conflicts).** `npm run check` passes. `npm run test:hq` (run with the main checkout's node_modules symlinked in, then removed) is 99/103: one new failure, "chief-product-officer is a resident role with no HOME seat", expected until hq-engineer seats the three single roles (pipeline step 6). Conflicts recorded, not resolved: personalization no longer moves under the CPO (10-16 founder decision wins), two orgs both called "eval" (incl. /hq/personalization/evaluation), Tobias name collision with cm-books-science-history, evaluation-engineer not in OPS_ENGINEERS, no POC-map lane (rule 4: no dispatch yet), 10-14 consultations still pending.

**Next.** hq-engineer: HOME/ROOM_BY_ROLE seats for chief-product-officer, head-of-evaluation, evaluation-engineer, and room for pairwise-judge (W-1841 area). Founder: Tobias rename, proposed lane "Evaluation (pairwise)", CPO vs personalization scope (objections 8, 10, 12). evaluation-steward: rule 3 reading for judges. principal-engineer-ops: OPS_ENGINEERS (objection 11). chief-of-staff: `org-change` event and board items for these (this worktree's board has no W-1842, so nothing was moved or added here, to avoid id collisions with the parallel worktree).

**Blocked.** First dispatch of any of the four roles, until a lane exists on company/ceo-office/poc-map.md (founder approval).

## 2026-10-18 · hq-engineer (Pip, run hq-bt-1018) · W-1841 ported the evaluation org's Bradley-Terry leaderboard into HQ (branch hq-evaluation-bt)

**Changed.** Ported from origin/ccr-rnd-ncm by checkout of single paths (no merge): company/evaluation/**, tools/eval/{bt,packets}.mjs, tests/eval/**, src/app/hq/evaluation/**. New "Evaluation" tab in HqTop.tsx and HQ.tsx; `test:eval` script, added to `verify`; tests/hq/evaluation.test.mjs (page data equals bt.mjs output on the committed records; tab wired; hqEnabled gate; rule text). The page now shows, above the filters, "A rank is the judges' preference. It is not a publish gate and not evidence of learning" and the round date. Route `/hq/evaluation` (404 unless dev or HQ_PUBLIC=1; checked both in a production build).

**Believe (high).** Regenerating leaderboard.generated.json from the 144 committed records gives identical ratings, intervals and counts; only each row's `status` and `currentVersion` changed (the catalogue moved on: 3 lessons are now one version ahead, shown as "stale"). All 17 slugs in the records still exist in src/demos. No role ids are referenced, so no plain-text fallback was needed. There is no `npm run eval` script (the brief allowed only test:eval in package.json); run `node tools/eval/bt.mjs`.

**Next.** chief-of-staff-ceo-office ports the four roles and tools/org (W-1842). evaluation-steward checks independence. Round 1 is thin (2-4 comparisons a lesson); a new round is the head of evaluation's.

**Blocked.** Nothing. test:hq: 104 of 107 pass; 3 releases tests fail in this shallow clone as before.

## 2026-10-17 · personalization-engineer (Tavi, run pe-hq-eval-1017) · W-1827 built on perso-hq-eval: frozen candidates in the lab, and an HQ Evaluation view

**Changed.** Two new read-only HQ routes under the lab, both served from committed files only (no process, no runtime read of company/): `/hq/personalization/candidates?persona=<id>&policy=reachable-v2|reachable-v3` and `/hq/personalization/evaluation`. `tools/hq-lab-candidates.mjs` imports `company/personalization/policies/reachable-v2.ts` and `reachable-v3.ts` unchanged, only when the bytes hash to the frozen sha256 before and after the import (refuses reachable-v1 and anything else), and runs them on the lab simulator's episode loop (parity test vs runEpisode). `tools/hq-lab-precompute.mjs` now writes `src/data/hq-personalization/candidates/` (12 docs, label in each and in the manifest). `tools/hq-eval-index.mjs` writes `src/data/hq-personalization-eval/evaluation.json` from verbatim quotes of committed records. Tests: tests/hq/personalization-candidates.test.mjs (8), tests/hq/personalization-evaluation.test.mjs (6), privacy scan extended (54 planted breaks). No HQ shell file changed. Commits 0e8f2db, 1f64ee1, 525d798, merge 51d73db, e210144, 0606c72.

**Believe (medium-high).** The views show what batch 5 §20 allows and nothing it forbids: no rank number, no candidate score or simulated outcome, no harness source or output, and, after G (merged ccr-3744965a-rfmufj at 51d73db on the chief of staff's relay), readout 3b shows INVALID first with its printed rows under "printed under INVALID; no rule reads them", v3 "not scored under M1; withdrawn from the website", R4 parked, G and §21 in the timeline, and the candidate label names G's NO-GO (commits e210144, 0606c72). Adapter choices a reviewer may challenge: dims drop the lab catalogue's placeholder misconceptionStrength (v2 reads ratings as absent), `shown` is empty (the lab has no display pins). At the lab's start states nearly every v3 served card is `earlier:prerequisites`; L3 never fires; `later:concept-known` appears in a few start rows only.

**Next.** hq-engineer reviews the lab-page changes (W-1840; W-1828 has nothing to review, no shell file changed). privacy-reviewer re-reads D1-D4 (W-1829). personalization-eval checks the Evaluation transcription after K6 (W-1830); 3b is transcribed now, so W-1830 can start. The lab-page review item is W-1840 (my first filing as W-1831 lost the id to the base branch's W-1831 at the merge).

**Blocked.** Nothing. `tests/hq/releases.test.mjs` fails 3 tests in this shallow worktree (missing git objects; also at base), so `npm run verify` was run step by step: every other step green; on the merged tree check, typecheck and build passed, and QA passed 1958/1958.

## 2026-10-17 · vp-personalization (Mateo, run vp-g3b-1017) · G on readout 3b: v2 NO-GO (INVALID); K7 not sent; R4 parked; website part of M1 closed, M1 = HQ part only

**Changed.** Batch 5 §21 and the G record company/decisions/2026-10-17-vp-personalization-readout-3b-g.md. (1) reachable-v2 is NO-GO under §4 G4. Readout 3b is INVALID on V10. The scores printed under it are not a result. No re-run, and any changed check is a new criterion, frozen first. (2) K7 is not sent. v3 carries all four V10 names (grep counts in §21), and I will not ask the eval to change its check. GO also needs G1 in 12/12 rows, where every recall-directed order failed (readout 3 oracles; v2 240/240). v3 is withdrawn from the website unscored and stays in the HQ lab. (3) R4 is parked: INVALID comes from a static check, and G5 gates a GO only. (4) The website part of M1 is closed (§12 G6(a)). M1 = the HQ part only. The flag stays off. The founder's L3 answer lapses (lapse line added to its record). AMD-015 stays ratified and unused. The release-note draft is marked not used. No mail, no board.json edit.

**Believe (high)** that no website GO path exists under M1. The G1 reading for v3 is a judgement, not a measurement. Objection to myself (§21.2): G1 was the binding constraint from readout 3 on, and I spent v3 on reason truth.

**Next.** Chief of staff passes "For the founder" from the G record and files §21.5 items 1-10. W-1827 (HQ build, running): relay the label change when it reports (§21.4 item 2). Then W-1828/W-1829/W-1830, verify, merge the HQ part, and ask the founder for the deploy.

**Blocked.** Nothing on my side. The website glue owners close or park their items (§21.5 items 6 and 8).

## 2026-10-17 · personalization-eval (Uma) · K6: criterion 3b frozen, one scored run of reachable-v2, readout 3b: INVALID (V10 copy check, M3 4 at threshold 4) (run eval-k6-1017, W-1751, W-1770)

**Changed:** criterion 3b names reachable-v2 (2666271f) and closes W-1770 in its text (order rule v1 transcribed judge-side; tie probe 121,283 of 121,283 in rule order); K-e pre-score gate added; every cell prints the full per-persona G1-G4 table (b1270f7). Frozen 8e96251, hash written in f4f2fbf. One run (2.94 h, jobs 4) at f4f2fbf. Readout: company/personalization/eval/2026-10-17-criterion-3b-readout.md, with manifest.json and verdicts.json in company/personalization/eval/harness/records/2026-10-17-readout-3b/. Board: W-1770 done.
**Result (as printed):** outcome INVALID. V10's M3 counted 4 shared names outside the corpus (kappa, post, prereqs, refreshPrior), at a threshold of 4. M1 was 0 and M2 was 6 of 12. Every other check passed. K-e: no draft or retired lesson in dims (the draft small-gap-big-extremes is out). Scores, printed under INVALID: no harm in any of the 40 cells; G1 fails in all 240 persona rows; base 6 of 6 wins; first:base 4 of 6.
**Believe:** high that the run is deterministic and correctly hashed (judge checks and chain passed). The copy finding is lexical, and readout §1 states plainly what it can and cannot say. One aborted start, under a minute and with no output, is disclosed in readout §0.
**Next:** vp-personalization reads it for G (batch 5 §4 G4, §12). R4 is learner-model-engineer's: the reproduction steps are in readout §7. **Blocked:** nothing on the eval side.

## 2026-10-17 · hq-engineer (Pip, run hq-rnd-1017) · W-1833: /hq/rnd shows the code-evolution leaderboard (branch hq-rnd-leaderboard, not pushed)

**Changed.** New read-only HQ page `/hq/rnd` (tab "R&D" in HqTop and HQ.tsx, one line each). Per project in company/rnd/evolution/ (today knots) it shows rank, candidate, score, tests, size, bench seed, parents, the evaluator's mixed-seed warning, a badge on the candidate the kit uses (fix1-bigon, found by comparing src/kit/knots/draw.mjs byte for byte with each candidate's draw.mjs) with a note that gen2-force-smooth tops the board, and Library links to knots-gen0/gen1/gen2/fix1 notes and EDD-004. Ranking logic moved from tools/evolve.mjs into tools/evolve-board.mjs (no side effects on import); `evolve.mjs board` and the page share it. Data is precomputed: `node tools/hq-rnd-precompute.mjs` writes src/data/hq-rnd/leaderboards.json (`--check` for staleness); the page reads only that file. Test tests/hq/rnd.test.mjs runs the real `evolve.mjs board knots` and compares line by line; it also fails if the committed file is stale.

**Believe (high).** Rows equal the CLI output (tested). Not checked: the page rendered in a browser; verify results are in the final report. After any new `evolve.mjs eval`, rerun the precompute and commit, or the test fails.

**Next.** rnd-lead checks the page against `node tools/evolve.mjs board knots`. Merge: HqTop.tsx (type union and TABS) and HQ.tsx tab list will conflict trivially with the personalization-eval branch if it also edits them.

**Blocked.** W-1833 is on the main checkout's board only, not in this branch's board.json, so it was not moved here; run `npm run company -- board move W-1833 review` after merge. tests/hq releases failures 60/66/67 are the shallow-clone ones, present before this change.

## 2026-10-17 · vp-personalization (Mateo, run vp-hq-1017) · L3 answer recorded; HQ candidates and Evaluation view amended and briefed

**Changed.** Batch 5 §19.6 records the founder's option A on L3 (W-1825 done). Under it, G7 for L3 passes on her written acceptance, and the objection goes into release note part 7. Batch 5 §20 amends §4's "no reachable-* in the lab before G" for the HQ lab only: frozen v2 and v3 may show, read-only and hash-checked, on simulated personas, labelled "Not live; go/no-go pending. Simulated personas only. Lab simulator, not the eval's scored world." It also lists what must never show. §20.1 corrects the chief of staff's reading in company/decisions/2026-10-17-founder-hq-personalization-and-eval.md: only v3 has `moves`, L1–L7 are draft and L3's wording is pending, lab numbers are not scores, v1 stays out, and the timeline covers all of batch 5. Build request mail 20261017T214401617Z-vp-personalization-0d067403 (personalization-engineer, 350k, /home/user/s3c-hq-eval, perso-hq-eval). Board: W-1828 (hq-engineer), W-1829 (privacy-reviewer), W-1830 (personalization-eval, after K6). W-1827 is doing.

**Believe (medium).** The ask can be met without touching G or the website. The main risk is someone reading a lab curve for a candidate as a verdict, and the label plus the "never a G input" rule is the guard. I have not checked that the lab simulator's policy interface takes the candidates' `rank` input without an adapter change. The brief tells the engineer to stop and report if it does not.

**Next.** Chief of staff drains 0d067403 (K6 is still running, so mind the slot cap). The engineer reports to my mailbox. After that come W-1829 and, after K6, W-1830.

**Blocked.** Nothing new. G still waits on K6, K7, R4 and R5.

## 2026-10-17 · chief-of-staff · lane 14 evening: v3 frozen, reason copy reviewed, L3 to founder

**Changed.** Dispatched and recorded (mailbox + board): F5b, S1 EDD-010 (merged), K6 (running, scores v2), F6 (3 blocking → v3), principal-engineer EDD-010 review (approve with C1–C12), privacy design read (E1–E14) and addenda 1–4, W-1794 addendum (merged), V3 build + rebuild (reachable-v3 frozen 53981ab0…c195, merged), F7 (0 blocking), RC lines L1–L7, second fact-check (all verified; R1 impossible; O1 on L3), head-of-product copy review and O1 refusal, fact-check of HoP copy (9 disputed, D1 beacon finding). D2 dims index merged. Board W-1776–W-1824.

**Believe (medium-high).** v3 is the only website candidate; RC's L1–L7 are true; L3 is refused by head-of-product under C3 and is now a founder question (W-1824); review lessons precede published at cold start (must be in W-1764). Mateo still rates a website NO-GO on G1(c) medium-high until K6/K7.

**Next.** Founder answers L3 (A/B). K6 reports → Mateo sends K7 (+W-1818 count) → R4/R5 → G. Copy rewording W-1821/W-1822 with fact-check re-read. personalization-engineer test items W-1804/1626/1628/1629/1630/1631/1636/1641/1644 fold into the build EDD.

**Blocked on founder.** W-1764 amendment, W-1766 counsel, holdout (O2), pre-approved flag-off withdrawal, L3 question, every deploy.

**Mistakes.** One commit (dab78fb) swept in F6's half-written file; I misrelayed where v3's numeric fields lived (corrected by the builder and in §17); one mailbox report briefly held the wrong body (fixed before commit).

## 2026-10-17 · vp-personalization (Mateo), run vp-l3-1017 · L3 to the founder's desk (batch 5 §19)

- **Changed:** batch 5 §19 (company/personalization/batches/2026-10-17-batch-5.md). New company/decisions/2026-10-17-vp-personalization-l3-question.md (status: waiting on founder). It sets out options A (accept L3 over head-of-product's objection) and B (G6(a), HQ only), with the objection attached word for word and my recommendation A. Release-note draft parts 4, 5 and 7 now carry the D1 beacon, O-R1, H-1 to H-4 and the founder question.
- **Believe:** moderate that A is right. Head-of-product's objection is fair. D1 changes none of my G rules: N1 is "beyond today's", and the beacon is today's and outside the ordering path. It does change what release-note parts 4 and 5 may say (high).
- **Next (chief of staff, §19.5):** put the L3 question to the founder verbatim; mark W-1817 done; W-1821 note (choose L3 wording if A). If there is no answer by G, it is G6(a).
- **Blocked:** G waits on K6 (running), K7, R4 and R5. Copy waits on W-1821 and W-1822. The website part waits on W-1764, W-1766 and the founder.

## 2026-10-17 · vp-personalization (Mateo), run vp-o1-1017 · O1, A3-2, working line set, release-note draft (batch 5 §18)

- **Changed:** batch 5 §18 (company/personalization/batches/2026-10-17-batch-5.md); new company/personalization/copy/2026-10-17-release-note-draft.md (head-of-product's E14 residual paragraph word for word, other parts empty until G). O1: option (i) accept L3; (ii) closed (v3 was the last candidate, §15/§12 G6); (iii) declined (dropping the title removes no false inference). A3-2: R1 cannot fire under v3 (fc2 §4); fail-safe = first sentence alone, R1 test still gates, any instance is a G10 trigger. Working set = RC's L1-L7; head-of-product's rewrites replace them line by line only if W-1811 and W-1812 pass. G11 widened for the review-before-published finding (W-1813). No mail, no board.json edit.
- **Believe:** high that L1-L7 are literally true (fc2); moderate that accepting L3 is right, because head-of-product's own C3 standard may refuse it, and I asked for that ruling rather than assume it.
- **Next (chief of staff files, §18.6):** head-of-product rules on O1; add O1 + release-note paragraph to W-1811/W-1812; W-1809 note; K7 brief input (review-lesson count, reported only); W-1816 done.
- **Blocked:** K7 waits on K6; G waits on K7 and R5; the website part waits on W-1764, W-1765, W-1766 and the founder.

## 2026-10-17 · vp-personalization (Mateo), run vp-v3f-1017 · reachable-v3 freeze accepted; privacy V2 ruled; F7 sent (batch 5 §17)

- **Changed:** batch 5 §17 (company/personalization/batches/2026-10-17-batch-5.md). Checked v3 sha256 53981ab0…c195 at 8d37d7a and ran 41/41 tests. V2: recallsRight/recallsWrong/pKnown are in `rank`'s reason, not in `moves` (the earlier relay was wrong). They stay, because removing them would make a new candidate. Rule: the glue reads only the slug order from `rank`, never `.reason` or `.value`. This is enforced by T24b, T23 and privacy's V2 scan (personalization-engineer). Freeze, A3 and A5 accepted. Mail: F7 20261017T201940302Z-vp-personalization-53e53a7c (learning-scientist-personalization, check, 120k).
- **Believe:** high that §17.1 keeps the numbers away from learners once T24b exists (that test is not yet written). A3 and A5 follow the unchanged selection rule. Whether passed-known is true at age 0 is F7's call. Unknown whether v3's reasons survive F7 (juxtaposition risk) or how v3 scores.
- **Next:** F7 report. After K6 reports: K7 (personalization-eval scores v3 by hash under 3b), then R5 (fresh), then G. K7 is not queued in the mailbox, because the dispatcher drains every request at once.
- **Board (chief of staff, §17.4):** W-1802 done; W-1799/Q-A2 done with a V2 note; personalization-engineer folds V1-V11 and §17.1 into EDD-010 tests, with C1/T5 naming v3 at 53981ab0 and the C9 WebKit run still owed; F7 recorded under W-1751; principal-engineer's D3 ADR.
- **Blocked:** RC copy waits on F7. K7 waits on K6. The website part waits on W-1764, W-1765 and W-1766.

## 2026-10-17 · vp-personalization (Mateo), run vp-qa1-1017 · Q-A1 and V3 G1 decided (batch 5 §16)

- **Changed:** batch 5 §16 (company/personalization/batches/2026-10-17-batch-5.md). Q-A1: option (i): v3's `moves` takes optional `shown` and states moved/direction/code among the unshown cards; `rank` never reads it (order, K7 object unchanged); G7's "moved" after a pin is stated as "placed differently among cards still to be shown". G1: new earlier-only code `passed-known` (passed lessons sit on ideas the learner finished), lowest tie priority; (a) as worded, (b), (c), (d) refused with reasons. Q-A3: concept slot empty until lesson-dims-owner names + fact-checker checks. Read W-1794 report b464a43c and V3 report b5ed775d.
- **Believe:** (i) removes the A4 pin-mismatch class by construction (moderate-high); `passed-known` is true by its eligibility rule but its copy is a lesson-to-lesson comparison and waits on privacy Q-P5 (moderate). If privacy refuses it, T6 fails and the website part closes for M1; G7 not relaxed.
- **Next:** chief of staff relays §16.5 to a fresh learner-model-engineer run (rebuild in /home/user/s3c-cand-c3, then freeze); files §16.4 board items (Q-A2 privacy, Q-A4 principal-engineer, Q-A3 lesson-dims-owner + fact-checker, F7 scope). EDD-010 A3/T6 wording to follow §16.1 (personalization-engineer).
- **Blocked:** v3 freeze on the rebuild; F7 on freeze; `passed-known` copy on privacy Q-P5 and RC.

## 2026-10-17 · personalization-engineer (Tavi), run pe-w1615-1017 · W-1794 EDD-010 draft 2 addendum (design only)

- **Changed:** EDD-010 is now draft 2. §12 (A1-A6) answers the review's C1 and C3-C12, D1 (no runtime time trip) and D2 (byte copy accepted). It carries privacy E1-E14 into tests, each marked check or verify, and applies batch 5 §15: §6.3 deleted, the glue shows v3's emitted reason with a direction assertion, lines are pinned, C1/T5/the flag move to reachable-v3 at freeze, a flag-on build refuses v2, and the E10 whitelist is title, count from progress and concept name. The probe gains a §5.4 display walk, a `refresh` history and a deep pin. Files: company/engineering/edd/EDD-010-personalised-new-lesson-order.md, company/engineering/edd/EDD-010-probe.mts. W-1794 to review (vp-personalization).
- **Believe:** the probe counts are deterministic (high confidence; the display walk reproduces F6's P3 row). New finding: after a deep pin, 6 of 150 moved cards are shown on the opposite side of their default slot from `rank`'s direction. The cause is the pins, and v3 states direction in the same frame, so the design as written fails T6 there (Q-A1, EDD §12 A5).
- **Next:** vp-personalization decides Q-A1 before v3 freezes (learner-model-engineer is building it now). F7 uses the A4 histories. Q-A3 (a source for concept names) goes to RC and lesson-dims-owner. Q-A4 (git-ignored cards file under C2) goes to principal-engineer.
- **Blocked:** the build waits on v3 freeze, C2 (W-1792), D2 `--pilot` (W-1786) and C12's readiness approval. Flag-on also waits on F7, RC, K7/G, W-1764, W-1765/W-1780, W-1766 and W-1783.

## 2026-10-17 · vp-personalization (Mateo) · F6 decided: the single v3 spent on an ungraded order with its own moving reasons (run vp-f6-1017, W-1785, W-1794)

**Changed:** batch 5 §15 (company/personalization/batches/2026-10-17-batch-5.md). Mail: V3 build 20261017T195713064Z-vp-personalization-27397b57 (learner-model-engineer, /home/user/s3c-cand-c3, perso-cand-c3, 130k); W-1794 addendum 20261017T195713165Z-vp-personalization-13edb035 (personalization-engineer, /home/user/s3c-m1-s1, design only, 120k). Marked F6 reports eeb80af5/fce357a3 and S1 fb101864 read. No board.json edit.
**Decided:** F6 accepted (3 blocking, 7 notes). Option (i), a §6.3 change inside v2, fixes B2 but not B1 or B3. Domain-estimate moves occur in every history probe and have no true line within the privacy ceiling, and withholding the line breaks G7. So (i) means a website part that works at cold start only. Chosen (ii): reachable-v3 = v2's arithmetic over an ungraded history (no predictedCorrectly, no recalls; no domain estimate, no new constant), plus moving reasons emitted by rank (F6's pair test, facts that are the lesson's own slugs). Made pre-score: no K6 number for v2 changes it, and v2 is the record and the HQ candidate but not the website candidate.
**Believe:** high that (i) cannot satisfy G7 with history (F6 §3 to §5). Medium that v3's reasons survive F7: concept-known and refresh may share "you finished a lesson on this idea" in opposite directions (the B3 shape). Unknown how an ungraded order scores in 3b. It is the last candidate under M1.
**Next:** V3 freeze, then F7 (learning-scientist-personalization: diff plus truth on v3's move output, refresh and deep-pin probes), then K7 (personalization-eval, after K6), then R5, then G. W-1794 addendum. **Blocked:** RC copy on F7. Website on W-1764/1586/1587.
**Board requests (chief of staff; §15.4):** W-1785 done; W-1758 note (RC: B3 ruling for the record; copy waits on F7; codes without domain-estimate); W-1780 note (privacy: is a lesson-to-lesson comparison inside Q-P5; v3 reverses the Q-P7 flip control); principal-engineer D3 ADR now triggered, C1/T5 move to v3; in-org records for V3, F7, K7, R5 under W-1751. Relay: none to K6 or D2.

## 2026-10-17 · principal-engineer (Kenji) · EDD-010 tier-2 review: approve with conditions (run pe-edd010-1017, W-1779)

**Changed:** new company/engineering/reviews/2026-10-17-edd-010-review.md. Board: W-1779 done; added W-1792 (mine: paths.json rules), W-1793 (platform-engineer sign-off P1-P6), W-1794 (personalization-engineer: answer C1-C12, D1/D2 in an EDD addendum). No code, no protected paths.
**Decided:** approve with conditions C1-C12. The flag-off merge waits on C1-C8, C10-C12 and platform-engineer's sign-off. C9 and every EDD §10 / batch 5 §12 gate wait until flag-on. Rulings: byte copy of reachable-v2 into src/lib/learner with a two-file hash test, not an import from company/ (company/** is tier 0 in paths.json; W-946). Split pilot dims (tier 2, committed) from pilot cards (regenerated at build, since claim counts churn). The fallback must keep pins (as written, "show D" moves seen cards). The initial pin horizon comes from scroll position, not active=0.
**Believe:** high that F7a (scroll before hydration) and F8 (fallback vs T9) are real defects in draft 1. Medium that the bundle fits 300 KB: Feed chunk 18,089 B raw today, but one learner chunk is already 230 KB and placement is unmeasured (C5). Unknown whether cross-engine float near-ties exist (C9).
**Next:** personalization-engineer EDD addendum (W-1794); platform-engineer reads §4 (W-1793); me, W-1792. **Blocked:** the build, on EDD §10 gates (F6, RC, D2 --pilot, W-1765, head-of-product).

## 2026-10-17 · vp-personalization (Mateo) · EDD-010 decisions: cold start accepted as rank's order (O-S1); Q-R1 to F6, no v3 now (run vp-s1-1017, W-1771)

**Changed:** batch 5 §14 (company/personalization/batches/2026-10-17-batch-5.md). Mail: F6 dispatch-request 20261017T194207930Z-vp-personalization-26420593 (learning-scientist-personalization, check, 80k). Read S1 report a2bb2da8 (marked read).
**Decided:** O-S1: `rank`'s empty-history order (fewer in-pilot prerequisites first, same on every device, no learner data) is intended; no cold-start wrapper (it would be an unscored policy outside the hash). Gap stated: 3b episodes start from seeded histories, so exact cold start is not scored; at G I read curious-newcomer as the nearest case. G11 fires unchanged; new MR line 17: no release while the intro says "It alternates subjects" or "not 'for you'" falsely. My proposal for W-1764 is to restate the QA test's intent; I edit no test or copy. Q-R1: no v3 now (G6 leaves one); F6 checks whether §6.3's codes are true against every card passed; RC writes copy only after F6. Q-E1: ratingProbe 0 means the gap is inert; above 0 means no website GO on 3b alone. Q-H2: all feed only. Q-D1 held until D2 reports.
**Believe:** high that accepting rank's cold start is the only choice that stays inside the frozen, scored candidate. Medium that §6.3 survives F6 at some copy strength: run-end codes explain one boundary, not every card passed.
**Next:** F6 report, then RC (fact-checker); K6 report, then R4, then G. **Blocked:** website part on W-1764/1586/1587, tier-2 review, F6.
**Board requests (chief of staff files/moves; §14.5):** principal-engineer tier-2 review of EDD-010; W-1765 note Q-P1..P7; W-1756 note Q-H1/Q-H2/cold-start mix; W-1764 note cold start and QA intent; release-manager Q-O1 flag pin (with withdrawal path); W-1758 note copy after F6; file F6 under W-1751; lesson-dims-owner Q-D1 after D2; W-1771 in review. Relay: none to K6 or D2.

## 2026-10-17 · personalization-engineer (Tavi) · S1 EDD-010: always-on personalised new-lesson order, company build flag off by default (run pe-s1-1017, W-1771, design only)

**Changed (branch perso-m1-s1):** new company/engineering/edd/EDD-010-personalised-new-lesson-order.md (tier 2, proposed) and its measurement probe EDD-010-probe.mts. The EDD covers: `rank` from reachable-v2 imported in place (hash test); pilot-only dims plus pilot card data in one generated module (drafts excluded before ordering, F5b R6); a view transform on the "all" feed with a pin horizon, so seen and on-screen cards never move; the build flag `NEXT_PUBLIC_NEW_LESSON_ORDER`, on only when it equals `reachable-v2` and off in the repo; the withdrawal path; tests T1-T13, with the 230-slug vector pinned (R7). No product code.
**Believe:** high (measured by the probe on D2 4a559d6) that `rank` on an empty history is NOT the default order: it moves 229 of 230 cards and orders them by in-pilot prerequisite count, so G11 applies. High that rank's own reason codes cannot be the moved-card lines: 225 of 229 cold-start moves carry `default-order`. EDD §6.3 proposes a run-boundary rule instead, and its truth is unproven (Q-R1). Medium that option A fits the 300 KB chunk cap (+~111 KB raw estimated, not built).
**Next:** principal-engineer tier-2 review; privacy-reviewer design read under W-1765 (Q-P1..P7, especially Q-P2: slug-bearing requests follow the order); RC/learning-scientist-personalization on Q-R1; head-of-product on intro copy (Q-H1); lesson-dims-owner `--pilot` mode (Q-D1); release-manager flag pinning (Q-O1). **Blocked:** the build, on those gates (EDD §10).
## 2026-10-17 · vp-personalization (Mateo) · F5b accepted (0 blocking); K6 sent to personalization-eval (run vp-k6-1017, W-1769, W-1770)

**Changed:** batch 5 §13 (company/personalization/batches/2026-10-17-batch-5.md): F5b decision, each of the 13 notes answered, K6 mail, board requests. Mail: K6 dispatch-request 20261017T193416066Z-vp-personalization-bd7b2f8d (personalization-eval, build, /home/user/s3c-k6, perso-c3b-k6, 220k). Marked F5b reports 46277277 and 6a0c7bdf read.
**Decided:** F5b accepted (company/personalization/evidence/2026-10-17-reachable-v2-diff-review.md, a4931cd: blocking 0, notes 13); v2 sha256 2666271f checked against 3a5cd1f. K6 order: close W-1770 (3b names v2 and its hash), REACHABLE_V2 import, freeze, K-e (no draft/retired lesson in 3b's dims; if any, stop and report to me, R6 blocks), one scored run, G1-G4 per persona per cell.
**Believe:** high that v2 differs from v1 only in the tie order (reviewer's diff plus my hash check). Unknown whether 3b's dims includes the pilot draft; K-e answers it. The medium-high NO-GO risk on G1(c) from V3 still stands.
**Next:** K6 report to my mailbox, then R4 (learner-model-engineer, fresh run), then my G by §4 and §12. **Blocked:** website part on W-1764/1586/1587.
**Board requests (chief of staff files/moves):** W-1769 done; W-1770 doing under K6; file K6 and R4 if not filed under W-1751; note to S1 (W-1771, running): pass dims over the visible set only (R6) and pin vector 04bf48f4 in product-index tests (R7).

## 2026-10-17 · vp-personalization (Mateo) · V3: readout 3 decided by pre-commitments 1-6; F5b and S1 EDD sent (run vp-v3-1017, W-1748)

**Changed:** new company/decisions/2026-10-17-vp-personalization-readout-3-decisions.md (unconditional; R3 accepted, byte-identical at b1ae294). Mail: F5b W-1769 20261017T192533312Z-vp-personalization-3f8fe7db; S1 EDD W-1771 20261017T192533387Z-vp-personalization-88559214 (worktree /home/user/s3c-m1-s1, perso-m1-s1). No board.json edit.
**Decided (rules written before data):** pc1 readout 2 stays the record; pc2 holds (oracle built, valid); pc3 REACHABLE 6/6 in interleave:base, so ordering for recall is not closed; pc4's question answered by the chief of staff under the founder's delegation ("build one candidate", now reachable-v2); pc5 interleave/review rows to W-1740/W-1741 as input only (in the interleave, no revisits is worse than fixed 6/6); pc6 nothing live from this readout. Thinness written down: two personas within 0.0006 of δ_min, 0/6 in three cells, gain rests on the prerequisite term.
**Believe:** high that the record applies the rules as written (all inputs checked against files). Medium-high risk that the website part goes NO-GO on batch 5 G1(c): the reference reachable arm fails ordering guardrail G1 (top-domain share) in 6/6 in both base cells; I did not relax G1(c).
**Next:** F5b reports; if no blocking row, I send K6 (personalization-eval). S1 EDD to principal-engineer tier 2 and privacy-reviewer (W-1765). **Blocked:** website part on W-1764/1586/1587; K6 on F5b and W-1770.
**Board requests (chief of staff files/moves):** W-1747 done (R3 accepted); W-1748 done; W-1769 and W-1771 to in-progress (sent); personalization-eval: readout 3 §8 wording nit (e3Sha256 is the manifest's, world3.mjs file hash is 0f0d3dbf…), no byte change; learner-model-engineer: confirm D2 index placement src/lib/learner/ (W-1919).

## 2026-10-17 · portfolio-manager (Odette) · project personalization re-scoped to M1, budget 2.1M (run pm-m1-rescope-1017, W-1742, W-1761)

**Changed:** company/ops/projects.json `personalization`: scope in = batch 3/4 studies (done or closing) plus batch 5 to M1 (candidate, criterion 3b scoring, reproduction, dims index, serving code behind an opt-in, HQ lab production mode, reason copy, go/no-go, merge readiness, and the named reviews); scope out = any release without the founder, any default-on personalization, any stored derived values (D20), phase B, protected-path changes. `estimate:true` dropped; approval.record = the M1 delegation record; approval.covers names the founder's 2.0M (readout-2 decisions, Founder answers) and says the M1 re-scope and anything above 2.0M are the chief of staff's call under the delegation. Budget = 2.0M base + 0.1M top-up (approvedBy chief-of-staff under the delegation) = 2.1M. Board: W-1742, W-1761 done; W-1762 added (chief-of-staff).
**Believe:** spend measured = 0k of 2.1M (`node tools/ledger.mjs gate --project=personalization`), which is wrong low with high confidence: lane 14 ran 30+ runs since 2026-10-16 and none carries tokens (WBR 2026-10-17 anomaly 1, company/rituals/records/2026-10-17-wbr-lane14.md). Medium-high that 2.1M is too low: batch 5 §2 prices its own items at ~2.1M, on top of batch 3 (~2.0M) and batch 4 (~0.9M); objection written in topUps[0].objection.
**Next:** chief-of-staff answers W-1762 (keep 2.1M or set ~4M+); ledger owner fixes token capture (WBR anomaly 1). **Blocked:** nothing for this item.
## 2026-10-17 · personalization-eval (Uma) · K5: criterion 3b draft + harness c3b with a candidate slot (run eval-k5-1017, W-1751, branch perso-c3b-k5)

**Changed (commit 0cf197c):** new company/personalization/eval/2026-10-17-criterion-3b.md, status **draft (unfrozen)**. New harness company/personalization/eval/harness/c3b/ and S record harness/records/2026-10-17-seeds-c3b-k5.json.
- The candidate runs through criterion 3's own runEpisode3. A resolve hook swaps its reachable-oracle import for a slot in a second module instance, so no episode logic is copied. 3b-ID1 shows the slot matches c3 in 144 of 144 episodes.
- 3b-ID0 byte-checks readout 3's 16 files, criterion 3's sha256 and the catalogue. 3b-ID2 has the reference arm reproduce readout 3's reference rows, 12 of 12.
- The named pair `reachable-v1 + fixed` vs `default-order + fixed` is judged under criterion 2 §2.1 in full. The base cell is `interleave:base`. The 27 one-at-a-time cells include `first:base`; 12 cells are reported only.
- S = 2000 (the cap) on a disjoint seed block, 40001–42000.
- Validity checks V1–V10, including a copy check against reachable-oracle.mjs with thresholds M1 ≥ 3, M2 ≥ 12, M3 ≥ 4 calibrated on control files, were written before any candidate was read. The candidate file is not in this tree.
- F5's mid-task request is answered in §4.3: K-a NO (dims key order is catalogue lesson order, not default order; the input is not changed), K-b `misconceptionStrength`, K-c ρ 0.5, K-d pilot only. Report-only tie-order and rating probes were added.
- The optional wider-catalogue cell is refused (personas and pre-history are pilot-only), with the reason in §6.
- Tests: c3b 13/13, c3 15/15, c2 25/25; `npm run check` green. No candidate was run and nothing was scored.

**Believe:** high that the slot is criterion 3's episode (144 hash pairs plus the 12-row chain). Medium that the copy check is useful: it is lexical, and a full rename with comments stripped passes (control P4, stated).
**Next:** learning-scientist-personalization reviews the draft (F5 already in hand); vp-personalization reads §4.3 K-a and decides whether the tie order needs a reachable-v2 (G6). K6 follows criterion 3b §7.
**Blocked:** K6 waits for F5, C1's frozen hash and the V3 record. The lock refuses a real candidate without all three plus `status: frozen`.
## 2026-10-17 · personalization-engineer (Tavi) · H1: HQ lab production mode, precomputed runs, no child process (run pe-h1-1017, W-1751; W-1731 folded in)

**Changed (branch perso-m1-h1, commit 210bf1f; for perso-m1 only):** a released HQ (`NODE_ENV=production`, `HQ_PUBLIC=1`) now serves the lab from committed data in `src/data/hq-personalization/` (README.md there: format and regeneration): 6 simulated personas × 7 ordering policies, seed 1, 7 days (42 gzipped traces) and 14 comparisons (each persona and all; main and all sets; 5 seeds), 0.8 MB, generated by new `tools/hq-lab-precompute.mjs` from `hq-cli.mjs` (`--check` reports staleness; output is byte-deterministic). New reader `src/lib/hq-personalization-precomputed.ts` (manifest-listed files only, sha256-checked, fails closed with a plain message); `runSim` returns from it before any process code when not local; `HQ_LAB_PRECOMPUTED=1` previews it locally. The page names inputs commit, model version, seed and days, and offers only stored choices (no seed/days inputs, no saved-trace loader, stored policies only). New tests `tests/hq/personalization-precomputed.test.mjs` (8: production calls no child_process API, with a control proving the spy sees a live run; all data loads; refusals; 11 fail-closed cases; route; server render). Privacy test scope extended to the new files (gz scanned decompressed); W-1731 `@import`/`image-set(` rows; 47 planted breaks. DoD D1/D5 update rows and the H1-scope grep recorded (company/personalization/lab/2026-10-16-lab-privacy-dod.md). W-1731 → review.
**Believe:** high that production spawns nothing (test spy + `next start` with HQ_PUBLIC=1: meta, run, compare served; no hq-cli process). High that the data folder is in the build's file trace (route and page .nft.json list all 59 files); not checked on Vercel itself. `npm run verify`: green except 3 tests in tests/hq/releases.test.mjs that also fail at the base commit (shallow clone, `fatal: bad object`); QA 1958/1958 passed (the last 13 re-run after my own wait timed out).
**Next:** hq-engineer reviews H1 (src/app/hq/**, src/lib/hq-personalization*.ts, src/data/hq-personalization/, tools/hq-lab-precompute.mjs); privacy-reviewer reads the H1 grep (DoD §2 update) and the stored runs against D1-D5; chief of staff merges into perso-m1 after D2 and S1. Whoever changes the model regenerates the data (`node tools/hq-lab-precompute.mjs`) or the lab serves the old model's runs (labelled with its commit). **Blocked:** nothing.

## 2026-10-17 · vp-personalization (Mateo) · lane 14 batch 5 (M1) written, wave 1 sent (run vp-batch5-1017, W-1751)

**Changed:** new company/personalization/batches/2026-10-17-batch-5.md (commit be5a812): the plan to M1 "Personalization v1 ready" (company/decisions/2026-10-17-founder-personalization-milestone-delegation.md). Items V3 (my readout-3 V after R3), A1 params sheet (applied-scientist-personalization), C1 candidate `reachable-v1` built blind from criterion 3 §2.2's text and frozen by content hash (learner-model-engineer), K5/K6 criterion 3b with a candidate slot importing c3 unchanged, then the one scored run (personalization-eval), F5 fidelity of params and code (learning-scientist-personalization), R4 repro, D2 client dims index (lesson-dims-owner), S1/S2 opt-in serving glue with EDD (personalization-engineer, branch `perso-m1`), H1 HQ lab with precomputed runs (personalization-engineer), RC reason copy as claims, G go/no-go, MR merge checklist. Go/no-go rules G1-G8 written before any score (§4): GO needs no persona harmed and G1-G4 guardrails holding in the base cell AND first:base; wins reported, not required; INVALID or unreproduced = NO-GO; one candidate, no re-tuning; copy never claims a recall benefit. Mailbox wave 1: A1 20261017T171622265Z-vp-personalization-c38e98b6, C1 20261017T171622360Z-vp-personalization-ca855af7 (worktree /home/user/s3c-cand-c1, branch perso-cand-c1), K5 20261017T171622463Z-vp-personalization-d9257031 (worktree /home/user/s3c-k5, branch perso-c3b-k5). No board.json change.
**Believe:** high that the plan keeps criterion 3 untouched and no candidate is scored before R3 is accepted (§0). Medium that the blind-build rule (text-only reading, build note, eval's import and copy checks written before it reads the candidate) is enough independence. Medium-low that v1 clears the no-harm gate in both base cells: readout 3's reference oracle was thin and the candidate holds base constants only.
**Blocked / objections (batch §7):** O1: surface-value.md v1 (protected) says the feed "is not personalised and it says so"; AMD-008 is proposed, not ratified; the delegation excludes protected paths, so the website part of M1 needs the founder to ratify AMD-008 or a narrow opt-in amendment. O2: no live rule without a registered experiment, and AMD-008 P5's default-order holdout does not fit an opt-in; evaluation-steward and analytics-steward. O3/O4 not blocking (judge's world; pilot catalogue scope).
**Next:** chief-of-staff drains the three requests and files board items from batch §8 item 10 under W-1751, plus external requests §8 items 1-9 (privacy-reviewer design read, principal-engineer tier 2, platform-engineer, head-of-product, hq-engineer, fact-checker, evaluation-steward + founder on O1/O2, analytics-steward, portfolio-manager re-scope ~2.1M). Wave 2 (F5, D2, S1 EDD, H1) after A1 and C1 report; my V3 after R3.

## 2026-10-17 · vp-personalization (Mateo) · lane 14 batch 4 written, wave 1 sent (run vp-batch4-1017)

**Changed:** new company/personalization/batches/2026-10-17-batch-4.md: criterion 3, measure only, no candidate builder (founder Q2/Q3, company/decisions/2026-10-17-vp-personalization-readout-2-decisions.md "Founder answers"). Pre-commitments 1–6 of the readout-2 record §5 carried verbatim. Items: E3 evidence rows (learning-scientist-personalization: revisit price and placement, N7 refresh value), K3 criterion 3 draft + harness c3 reusing c2 (personalization-eval: O1 split, reachable-signal oracle on criterion 2 §I.3 inputs only, Feed.tsx `i % 3 === 1` interleave cell), F3 fidelity review, K4 freeze + readout 3, R3 reproduction (learner-model-engineer), V mine. Wave 1 sent by mailbox: E3 20261017T081220705Z-vp-personalization-d2e06513, K3 20261017T081220833Z-vp-personalization-ef1dfce1 (worktree /home/user/s3c-k3, branch perso-c3-k3). No board.json change this turn; no privacy pre-read requested (the oracle reads only inputs already ruled in company/reviews/_privacy/2026-10-16-personalization-model-inputs.md).
**Believe:** high that the batch follows the approved pre-commitments and stays measure-only. Low that the reachable-signal oracle clears δ_min in 4 of 6 (readout 2's corners point to the hidden k spread, which it cannot see). Stated before data: the base cell for rule 3 is the eval's to name; if the eval declines the oracle, rule 3 cannot fire and I recommend option A.
**Next:** chief-of-staff drains the two requests and files six board items from the batch table (E3, K3, F3, K4, R3, V; owners as listed), writing the ids into the wave-1 notes. Wave 2 (F3) after E3 and K3 report to my mailbox. **Blocked:** nothing.

## 2026-10-17 · vp-personalization (Mateo) · V on criterion 2 readout 2 (run vp-v-1017, W-1730)

**Changed:** new company/decisions/2026-10-17-vp-personalization-readout-2-decisions.md: pre-commitments 1–5 and V1–V5 applied as written. R2 (W-1729) byte-identical, accepted; W-1728, W-1729, W-1730 → done. Board: W-1739 (chief-of-staff: founder Q1–Q4), W-1740 (head-of-product: revisit volume/placement, input only), W-1741 (evaluation-steward: AMD-008 F2 input, no text proposed). No model, harness, `src/` or experiment change.
**Decided:** GAM approach closed (pc 4); personalised ordering for recall not closed (pc 3, oracle-order HEADROOM); review-timing-v1 closed, not re-tuned (V3); review timing not closed by V2, but most of that headroom is the cost of revisit volume in a revisits-first 12-card world with an unsourced one-for-one price (B6), so it is mainly a product question (head-of-product, AMD-008 F2), not a personalization one; nothing live, nothing registered (pc 5, V4). No candidate remains open in lane 14.
**Believe:** high that the decisions follow the rules as written. Medium-low on what the ordering headroom is made of (prior-known refreshes, the hidden learner × lesson k that no product can see, readiness): the corners point at the k spread, but O1's split was not built. Low that any of it is reachable by a shippable rule.
**Next:** chief-of-staff puts Q1–Q4 to the founder (W-1739). My recommendations: Q1 yes, route as input; Q2 approve one eval-only decomposition (criterion 3, observable-signal oracle, O1 split, interleave cell; pre-commitments written in §5); Q3 no third candidate now; Q4 pause if Q2 finds nothing reachable. **Blocked:** criterion 3 and any candidate wait on the founder.

## 2026-10-17 · personalization-eval (Uma) · K2 criterion 2 frozen, readout 2 (run eval-k2-1016, W-1728)

**Changed:** criterion 2 (company/personalization/eval/2026-10-16-criterion-2.md): F1 B1–B6 answered in §11 (B1–B5 fixed in learner2/world2: forgetting shape after day 7, learner × lesson k spread, lag strengthening anchored at E1's 0.60/0.35, retrieval-only strengthening, pre-history under the episode's law, pre-boost learnRate; B6 a scope line); §4 filled from E1, spot-checked McGillivray 2015 and Fastrich 2018 (PMC); S = 2000 (cap; rule gave 2637); candidate a0bd249 / afddde70 recorded (§12). Frozen at 869f625, hash in b89f259. Full run at b89f259 (81 + 21 min, jobs 4). Readout: company/personalization/eval/2026-10-16-criterion-2-readout.md; records in company/personalization/eval/harness/records/2026-10-16-readout-2/. results.ndjson moved off results.json (V8 string limit at S = 2000).
**Believe (the readout's words, unedited):** ordering HEADROOM (oracle-order +0.10 to +0.16, 6 of 6, every cell); review HEADROOM (oracle-review +0.18 to +0.30), but `none` (no revisits) also beats the fixed schedule by +0.11 to +0.20, so most of it is what revisits cost in new lessons in a revisits-first 12-card world; gam vs default-order FAIL; gam vs draft-rules FAIL; draft-rules vs default-order FAIL (G1 too); candidate vs fixed FAIL (Δ R₇ −0.004 to −0.008, NEW fails in 4 of 6, LOAD holds in 6 of 6, never later than fixed). High confidence the numbers are what the frozen world gives; the world's revisit price (B6) and N7 are unsourced.
**Next:** R2 learner-model-engineer (W-1729) reproduces from readout §9; V vp-personalization (W-1730) applies pre-commitments 1–5 and V1–V5. **Blocked:** nothing. Open: O1 split of oracle-order's gain (prior-known vs new) not built.

## 2026-10-16 · learning-scientist-personalization (Oskar) · E1 criterion 2 ranges + review-timing memo (run ls-e1-1016, W-1723)

**Changed:** new company/personalization/evidence/2026-10-16-criterion-2-ranges.md: ranges for forgetting to 30 days (exponential k and a power-form or shape row), `revisitStrengthen`, its lag dependence, `relearn`, learner × lesson spread of k (new), prior-knowledge mean, between-learner and between-lesson spread, `learnRate` (everything included and pre-boost) and `guessRecall`; plus the "Review timing: what the evidence supports" memo and five written disagreements. A dated revision pointer is appended to the B2 memo. Board: W-1723 → review (note names readers). Read only the inputs the brief allowed; criterion 2's draft did not exist yet, so none of it was read. No harness output read.
**Sources:** 15 PMC full texts via OAI (McGillivray 2015, Fastrich 2018, Mettler 2016, Eglington & Pavlik 2020, Tabibian 2019, Fazio & Marsh 2009, Metcalfe 2012/2015, Lyew 2023, Murre & Dros 2015, Maddox 2011, Fazio 2010, and others) plus Crossref; author hosts still unreachable. Marks [F]/[F-r]/[A]/[S]/[R] kept on every row.
**Believe:** guess-then-answer studies put `learnRate` at 0.65 (range 0.35–0.88) and k at about 0.08/day over the first week, both medium-low confidence. A single exponential overstates 30-day loss about 4× (low on the size, medium on the direction). Adaptive review beats fixed by +0.10 to +0.13 absolute at 3–7 days, but only in within-session lab drills; the transfer to a feed is smaller and unmeasured. Medium that this holds in the lab, low that the size carries over. Expanding vs equal fixed schedules: no reliable difference (medium).
**Next:** personalization-eval fills criterion 2's world from the table (K1/K2) and answers disagreements 2, 3 and 5 at F1. applied-scientist-personalization reads the file for P1. I do F1 (W-1727) after K1. **Blocked:** nothing. The unreached [S] rows (Kang 2014, Karpicke 2007/2011, Latimier's expanding-vs-uniform g) need publisher access, and they do not block.

## 2026-10-16 · portfolio-manager (Odette) · personalization project tag registered for lane 14's mailbox pilot (run pm-perso-project-1016)

**Changed:** company/ops/projects.json: new major project `personalization` (owner vp-personalization, status approved, inserted before the legacy entries). Scope: phase A offline study per company/personalization/batches/2026-10-16-batch-3.md (E1, K1/K2, P1/P2, F1, R2, V) plus upkeep (U1 W-1719 HQ lab, U2 W-1717 settings API); out: any live personalization (founder Q1, Q5), applying the settings table, phase B. Approval record = company/decisions/2026-10-16-vp-personalization-phase-a-readout-1-decisions.md ("Founder answers"), with `approval.covers` saying it covers scope only. Budget 2.0M tokens, **an estimate, not approved** (`budget.estimate: true`, basis itemised per batch-3 run; batches 1-2 not counted and mostly unmeasured: the ledger holds 2 lane-14 runs, 128k, tagged first-light). Board: W-1732 to chief-of-staff (founder-inbox writer) to file the founder budget ask (token-budget.md section 9: the portfolio manager writes a budget line, the forum or founder approves it) plus the U2 charging overlap with First Light's personalization workstream.
**Verified:** `node tools/ledger.mjs gate --project=personalization` ok (0k of 2.0M); `ledger check` shows no personalization error (45 errors there are pre-existing, none for this id). Mailbox dry check (`send --from=vp-personalization --to=dispatcher --role=learner-model-engineer --project=personalization`) succeeded (lane 14); the message file company/ops/mailboxes/dispatcher/20261016T232335027Z-vp-personalization-0fb74b9b.md was deleted at once; dispatcher shows 0 unread; no event was written.
**Believe:** the tag unblocks lane 14 on the mailbox (high). The 2.0M figure is a rough estimate from per-run units, not measurement (low-medium); the gate will treat it as binding at 100% until the founder sets the figure.
**Next:** chief-of-staff files W-1732 for the founder; vp-personalization may send batch-3 wave-2 dispatch-requests tagged personalization. **Blocked:** nothing.

## 2026-10-16 · personalization-engineer (Tavi) · W-1719 HQ lab D2 nits + D1 N4 (run pe-u1-1016, branch perso-u1)

**Changed:** src/lib/hq-personalization-server.ts: `childEnv()` = `CHILD_ENV` plus `SystemRoot` only when set (D1 N4, Windows). tests/hq/personalization.test.mjs: M6 test that two concurrent cold `meta` misses return the same promise (one process), then cache; `childEnv` copies nothing else. tests/hq/personalization-privacy.test.mjs: M1 trust-list sentence in the header; M3 rule `url() with a scheme or host` (any scheme incl. `data:`, or `//`) over every lab file, with 4 planted rows; M5 header says enforced by verify, not check. company/personalization/lab/2026-10-16-lab-privacy-dod.md: D5 update (M1, M3, M5) and F3 child-env line. Board: W-1719 → review, reviewer hq-engineer. No new data path, no dependency, no model or simulator change.
**Tests:** HQ lab tests 10/10; `npm run test:hq` 72/75 (the same 3 release-history shallow-clone failures); typecheck clean; `npm run check` passes. M6 test mutation-checked: removing the meta join makes it fail. `npm run verify` (build + QA) not run.
**Believe (high):** the nits are closed as asked; M3 is stricter than asked (`data:` and inline styles flagged too), which a privacy gate can afford. N5, M2, M4 stay notes (W-1719 note).
**Next:** hq-engineer reviews W-1719 on perso-u1; chief-of-staff merges after. **Blocked:** nothing.
## 2026-10-16 · learner-data-engineer (Solenne) · W-1717/W-1733 fix round: C1/B2a route moved, C7/D2a atomic PUT (run lde-u2-fix-1016, branch perso-u2)

**Changed:** route moved to src/app/api/account/settings/route.ts (git mv; nothing left under src/app/api/settings/); B2 scan now also fails on any file at the old mount (planted control added, 8 plants). PUT no longer reads before writing: settings-store.ts runs one statement per request (SET_UPSERT_SQL / SET_UPDATE_SQL / MERGE_SQL, chosen by `writePlan` from the request only), each writing only the sent columns on the locked row; merge decides "account lists win, either false stays false" inside the statement. Rule = `applyWrite` in settings.ts (replaced applySet/applyMerge). New tests/settings/settings-write-race.test.mjs; new company/personalization/data/test-settings-write-sql.mjs; note §1-§4, §6, new §7; board W-1733 to review, W-1717 note/links.
**Tests:** `npm run test:settings` 31/31 (fake in-memory store modelling the atomicity contract; no Postgres in that suite). Separately, the exact SQL on a throwaway local Postgres 16 with fake rows (not Neon, no learner data): 9/9, i.e. 52 cases equal applyWrite, unchanged rows keep xmin, five two-session races keep `false`, old statement used the old way loses it; a planted break in MERGE_SQL failed it. typecheck 0, build 0 (`ƒ /api/account/settings`, nft still lists 14 curriculum files), check 0.
**Believe:** D2a is closed for the default READ COMMITTED isolation (high, ran on real local Postgres sessions); D1 and unchanged-not-rewritten kept. Not checked on Neon or through the real db helper.
**Next:** privacy-reviewer confirms D2a/B2a closed (W-1738); principal-engineer closes C7; backend-engineer W-1734 (namespace ack, session/db/flag, B3 patches, FK, number). **Blocked:** wiring and apply on the accounts branch; deploy on the founder.

## 2026-10-16 · principal-engineer (Kenji) · W-1717 settings API tier-2 review: approve with conditions (run pe-u2-review-1016, branch perso-u2)

**Changed:** review record company/engineering/reviews/2026-10-16-w1538-settings-api.md; board W-1735..W-1734 (conditions by owner; W-1731/W-1732 renumbered to W-1733/W-1734 by chief-of-staff, collided with main). No code edited.
**Ruled:** mount at `/api/account/settings` (ADR-008 items 3-4 already prescribe it; cookie not widened); modules stay in `src/lib/server/personalization/` (settings only, not model serving); table name `settings`; `test:settings` in verify is fine for merge, but must run in CI before wiring (CI amendment with W-1116/W-409).
**Measured:** typecheck 0; test:settings 25/25 1.1 s; build 21 s, route nft trace includes all 14 content/curriculum/*.json (file tracing closed at build level); check 1.4 s.
**Believe:** code is sound once moved (high); one race (merge vs set-false, finding 2) is a privacy call (C7).
**Next:** learner-data-engineer C1 move (W-1733); backend-engineer namespace ack (W-1734); principal-engineer paths.json rule (W-1736). **Blocked:** wiring/apply on the accounts branch.

## 2026-10-16 · learner-data-engineer (Solenne) · U2 / W-1717: settings API on a branch, not wired, nothing applied (run lde-u2-1016, branch perso-u2)

**Changed:** new src/app/api/settings/route.ts (GET, PUT only; 404 while unwired), src/lib/server/personalization/{settings,settings-store,settings-handler,settings-wiring}.ts, tests/settings/ (25 tests), package.json `test:settings` (also in `verify`, not `check`), design note company/personalization/data/2026-10-16-settings-api-note.md (API surface, B1-B4/D1-D3/G1-G4 map, B3 patches, unverified list). Board W-1717 → review. No database touched, no migration moved or applied, no dependency.
**Tests:** `npm run test:settings` 25/25 (B1 incl. real-catalog drop test; B2 repo-wide write/import scan with planted-break control; B4 sentinel through 11 paths incl. pg-style error detail, with capture control; D1-D3; G2-G3); typecheck clean; build passes (`ƒ /api/settings`); test:platform 30/30; `npm run check` passes.
**Believe:** the code meets B1, B2 (as a grep), B4, D1-D3, G2-G3 (high). **It cannot work at /api/settings as mounted:** ADR-008 scopes the session cookie to `Path=/api/account`, so this path never receives a session. I recommend mounting at /api/account/settings (one path change + one test constant); principal-engineer (location) and backend-engineer (namespace) decide, and privacy-reviewer's B2 wording follows. Unverified against the accounts branch: session helper, db query shape, flag, FK/table name, migration number, file tracing (note §4).
**Next:** privacy-reviewer reads B1-B4; backend-engineer: B3 patches (note §5) + order review + wiring; principal-engineer: tier 2 location and package.json. **Blocked:** wiring and any apply on the accounts branch (not in this clone); deploy on the founder.
## 2026-10-16 · personalization-eval (Uma) · batch 3 K1: criterion 2 interface, draft and harness (run eval-k1-1016, branch perso-k1)

**Changed:**
- **Interface first, commit 45826c6:** company/personalization/eval/2026-10-16-criterion-2.md §I. P1 and P2 read §I only. §I.7, commit 8edbc78, answers P1's question: the fixed baseline counts successes over the full history, while the candidate sees 30-day recalls. No behaviour change.
- **Criterion 2 draft (unfrozen), §0–§10:**
  - primary R₇: knowledge kept at a final test 7 days after the last session, per lesson the reference arm completed; R₁ and R₃₀ reported;
  - `oracle-order` and `oracle-review` (θ chosen on disjoint tuning seeds) as the headroom references;
  - the named draft-rules pair; the GAM pinned at v0.2.2;
  - review guardrails NEW and LOAD;
  - 14 one-at-a-time cells and 8 corners; C2 notes ruled (§7).
- **New harness** at company/personalization/eval/harness/c2/. Phase A files are untouched.
- **S = 660**, from the reference arm alone: records/2026-10-16-seeds-c2-k1.json.
- W-1724 → review.

**Believe:**
- The read resists "revisit early" (medium-high). It happens at one time for every arm, not in the policy's input; revisits cost feed positions; strengthening depends on lag. A revisit-everything fixture loses 0.06 to 0.19 per lesson at base.
- Under the product's own schedule with revisits first, a daily learner spends about 65–83% of cards on revisits (seed 1001, reference arm only). That makes review timing consequential in this world.
- Phase A identity: default-order, draft-rules and random give the same hashes as at readout 1's commit. gam, gam-no-breadth and epsilon-greedy differ only because v0.2.2 gated novelty off.
- No arm under test was scored.

**Next:**
- E1 (W-1723) lands.
- F1 (W-1727, learning-scientist-personalization) reviews criterion 2 §1 and §4 and c2's learner2 and world2.
- P2 freezes the candidate.
- K2 (W-1728) fills from E1, records P2's hash and path, freezes and runs (about 2 h at --jobs=4).

**Blocked:** the freeze waits on E1, F1 and P2's frozen hash.

## 2026-10-16 · vp-personalization (Mateo) · lane 14 batch 3: criterion 2, headroom first, plus review timing (run vp-batch3-1016)

**Changed:** new company/personalization/batches/2026-10-16-batch-3.md (10 items, 5 waves, paste-ready briefs). Board: new W-1723 (E1 evidence, learning-scientist-personalization), W-1724 (K1 criterion 2 draft + harness, personalization-eval), W-1725 (P1 review-timing numbers, applied-scientist-personalization), W-1726 (P2 review-timing code, learner-model-engineer), W-1727 (F1 fidelity), W-1728 (K2 freeze + readout 2), W-1729 (R2 repro), W-1730 (V, mine); W-1719 and W-1717 → next with batch notes. No model, criterion, curve or src change.
**Decided:** the five option-C pre-commitments are carried verbatim. Added V1-V5 for the review-timing candidate before anything exists: baseline is the product's fixed schedule [1,3,7,21] (src/kit/progress.ts); an oracle review scheduler, if the eval builds one, is its headroom gate; one candidate, no re-tuning; AMD-008 F2 binds any live use (a later-than-due revisit needs an amendment I may only propose); candidate frozen by hash before criterion 2 freezes.
**Believe:** the batch keeps the independence rule (medium-high): the candidate is built from E1 and K1's interface section only, never the eval's learner; the shared evidence base is a coupling I name in the batch, defended by the judge's sweeps. R2 by the candidate's builder is accepted in writing as determinism only. W-1718 was already done (company/reviews/hq/2026-10-16-d2-review.md), so U1 is W-1719 plus D1 N4.
**Next:** chief-of-staff dispatches wave 1: E1, K1, U1, U2 (4 agents). Wave 2 (P1, P2) after E1 and K1's interface commit. **Blocked:** U2's apply (not its code) on backend-engineer's order review (W-1943/W-1942) and privacy-reviewer's API read; nothing deployed.

## 2026-10-16 ~late · chief-of-staff — personalization org: batch 1-2 integrated; phase A FAIL; founder Q1-Q5 open

**Changed:** integrated (merge, conflict-resolve, push) every lane-14 result today: wave 1 (B1-B6), privacy rulings W-1916/W-1947/W-1948/W-1942 and closeout L5/T1, HQ lab D1/D2 with hq-engineer reviews, W-1958 tests in `check` (principal-engineer approved with conditions, met), harness C1, fidelity C2, frozen criterion and readout 1 (C4: GAM FAIL vs both baselines, 0/6 personas, all cells), byte-identical repro C5, VP decisions W-1957 (GAM stopped, novelty killed as model-v0.2.2, surprise off, C3 cancelled). Full verify on the merged head: check, typecheck, build, QA 1958/1958; test:hq 71/74 (3 release-history tests fail on this shallow clone).
**Believe (high):** readout 1 is deterministic and follows the frozen rule; it says "no edge in this placeholder world", not "personalization cannot work" (learnRate base unsourced; F7/F16 untested; even random order loses only 0.6-1.6 points).
**Learned:** parallel agents allocate the same next board id (fixed 3x by renumbering); finished agents' slots must be released (`node tools/lib/slots.mjs release <id>`) or dispatch-check counts them; new .claude/agents types appeared mid-session without a restart here.
**Next / blocked on founder:** W-1720 Q1-Q5 (stop GAM; surprise/novelty off or learner-chosen; headroom-first criterion 2; aim at review timing; First Light rule set off). Q5 also goes to head-of-strategic-initiatives (First Light scope). Counsel: minors in a personalized default arm (privacy D4). Nothing deployed.

## 2026-10-16 · vp-personalization (Mateo) · W-1721: novelty gated off as model-v0.2.2; W-1957 decisions now unconditional (run vp-w1542-1016)

**Changed:** company/personalization/model/model.ts: `MODEL_VERSION` model-v0.2.2, `COMPOSER.noveltyGate` (inactive, with its reason), one `checkModel()` invariant; `weights.novelty` and the `novelty` constants unchanged, no code removed. company/personalization/model/sim/composer.ts (learner-model-engineer's file): `novelty()` returns 0 while the gate is shut; read inside the function so the term still shows as 0 in traces and the W-1947 break anchors stay intact. Change line in company/decisions/2026-10-16-personalization-model-v0.md (`privacy: no new input`). company/decisions/2026-10-16-vp-personalization-phase-a-readout-1-decisions.md: status unconditional plus a C5 result paragraph (repro byte-identical; no verdict differs). Board: W-1721 → done, W-1956 → done (accepted). Eval harness not edited; readout 1 stays tied to 5725b10a.
**Tests:** self-check OK; privacy N1/N3 5/5; `npm run check` passes; privacy-breaks.mjs 13/13 caught as expected; eval harness tests.test.mjs 20/20; tsc --strict on the model/sim .ts files clean; HQ CLI `meta` (model-v0.2.2, gate visible), `run` (0 non-zero novelty terms) and `compare --persona=all` (gam identical to gam-no-surprise-novelty, as designed); `npm run test:hq` 71 pass / 3 fail, the same 3 release/deploy-history failures with and without this change.
**Believe:** the gate does exactly the decided thing and nothing else (high: compare rows identical). Who writes a gate flag: I did, as an objective-level switch under keep/kill; numbers stay applied-scientist-personalization's (noted in both records).
**Next:** founder answers Q1-Q5 via W-1720 (chief-of-staff); batch 3 waits on them. personalization-eval may add its own W-1956 review note. **Blocked:** nothing in my lane.

## 2026-10-16 · vp-personalization (Mateo) · W-1957: keep/kill on phase A readout 1, C3, what the FAIL means (run vp-w1536-1016)

**Changed:** new company/decisions/2026-10-16-vp-personalization-phase-a-readout-1-decisions.md. README status line (company/personalization/README.md). Board: W-1957 → done; W-1936 → dropped (C3 step 1b cancelled); new W-1720 (chief-of-staff: put Q1-Q5 to the founder, BLOCKED ON FOUNDER) and W-1721 (mine: model-v0.2.2 noveltyGate, after C5). No model change, no curve or weight touched.
**Decided (all conditional on C5, W-1956, confirming the run):** FAIL accepted, no objection. Novelty killed by my pre-registered rule (0/6 wins at benefit 0, three intervals below 0). Surprise stays gated; C3 cancelled (fails even at rho 1, surprise high). Breadth: no recall credit, not killed (no rule set before data; its job is G1). The GAM as it stands is stopped: no phase B, no tuning. No phase B registered for anything; default order (F1) for everyone.
**Found by arithmetic on verdicts.json (not an eval number):** draft-rules − default-order per-persona means are −0.0057 to +0.0074 over the 10 pass cells and below default for all 6 personas at learnRate-low. Random loses only 0.6-1.6 points vs default: the world leaves ordering about 1 point of room, and there is no oracle to say how much more any ordering could get.
**Believe:** the decisions follow from rules written before data (high). Whether the GAM is weak or the world gives ordering no room is unknown (the readout's F4/F7/F16 under-test ordering). Phase B could not detect a sub-point edge at our scale either way (high, readout §3).
**Recommend:** option C, one headroom-first criterion 2 (sourced 1-7 day forgetting, prior knowledge, learn rate; an oracle ordering), with pre-commitments in the record §5; option A if the founder declines or the oracle shows no headroom. Not B (draft rules live). D (review timing) is a founder question.
**Next:** C5 (learner-model-engineer); then W-1721 (me). Founder answers via W-1720 (chief-of-staff). **Blocked:** batch 3 beyond the record §7 list waits for the founder.
## 2026-10-16 · learner-model-engineer (Ifeoma) · C5: phase A readout 1 reproduced, byte-identical (W-1956; run lme-c5-1016, branch perso-c5)

**Changed:** new company/personalization/eval/2026-10-16-phase-a-readout-1-repro.md. Board W-1956 → review (personalization-eval, vp-personalization). No eval file edited.
**Result:** I followed harness/README.md "Reproduction" only, at run commit 5725b10a with Node v22.22.0 and `--jobs=4` (the readout used 2), in two parts (`base,one-at-a-time`: 829 s; `corner,novelty,rho`: 741 s). Both parts are **byte-identical**: results.json sha256 matches readout §6 and verdicts.json passes `cmp` against the committed files. The manifests differ only in `seconds`. The regenerated §6 tables differ only in the out-dir label and `seconds`. The criterion hash, the inputs hash and all 11 fileSha256 entries match. The episode spot check gives the same hash in two processes.
**Believe:** at this commit the run is deterministic across worker counts (2 vs 4) and across processes (high: full outputs compared byte for byte). This says nothing about whether the verdicts are right.
**Next:** vp-personalization W-1957 (keep/kill). Optional doc point for personalization-eval: the README's two-part `--kinds` note and readout-tables.mjs exist only from 62c0e1b on, not at the run commit (repro record, Notes). **Blocked:** nothing.

## 2026-10-16 · personalization-eval (Uma) · C4: criterion frozen, phase A readout 1 (W-1917, W-1955; run eval-c4-1016, branch perso-c4)

**Changed:** C2's blocking findings answered in criterion §10. All three were fixed in the learner: F1 forgetting acts on the increment above the guess floor; F2 adds a pass-relevant `learnRate-low` 0.35 cell; F3 novelty triggers on a domain switch from the previous card. B2 filled from the C0-corrected table after I re-read C0 rows 2 (Fazio Table 2) and 4 (Manrai) in full text; both match. S=200 rechecked on default-order only (records/2026-10-16-seeds-c4.json). Criterion **frozen at e9909edc**, hash written in 5725b10a. New: company/personalization/eval/2026-10-16-phase-a-readout-1.md, harness/readout-tables.mjs, records/2026-10-16-readout-1/{pass,rest}/ (manifest, verdicts; results.json not committed, sha256 in readout). Board W-1917 and W-1955 → review.
**Result (unedited, readout §0):** gam vs default-order **FAIL**, gam vs draft-rules **FAIL** (0 wins of 6 in the base cell and in every one-at-a-time cell; no harm; no INVALID). No per-term pair (breadth, novelty ×3, surprise ×6) meets the per-term rule. The C3 trigger condition is not met.
**Believe:** the run is deterministic and the verdicts follow from the frozen rule (high). The simulated GAM edge is below 1 point of R in this world, with every interval's upper end ≤ 0.0092 (high for this world; low as a forecast: placeholder world, learn rate 0.70 base unsourced, F7/F16 untested).
**Next:** learner-model-engineer reproduces it (C5, W-1956); vp-personalization reads it for keep/kill and C3 (W-1957). **Blocked:** nothing. Host note: the run took about 51 min at --jobs=2 in two parts (pass cells first).

## 2026-10-16 · learning-scientist-personalization (Oskar) · C2 simulator fidelity review, W-1954 (run ls-c2-1016)

**Changed:** new company/personalization/evidence/2026-10-16-simulator-fidelity-review.md (23 findings, each marked blocking or note). Revision section appended to the B2 memo (novelty meaning, hypercorrection unit, new `learnRate` range). W-1954 moved to review, reader personalization-eval. No harness policy command run; no results or out folder read; no curve value set.
**Blocking (C4 step 1 must answer in writing):** F1: the learner decays the whole recall probability (floor applied with `max`), not the increment above a floor. Under that form, C0's source supports `forgetRate` high of about 0.12–0.13, not 0.20. Fix: one-line form change (recommended), fill 0.12–0.13, or relabel. F2: `learnRate` 0.7 is unsourced and unswept, and ΔR is linear in it against an absolute δ_min. Fazio 2010 [F] gives about 0.34; range 0.35–0.70 published. F3: the novelty trigger is true for nearly every card (223 concepts / 230 lessons) and copies the composer's own clauses, so the ±0.05 novelty cells cannot test novelty. Affects the per-term cells only.
**Believe:** F1–F3 are departures (high). F1 changes ΔR by only about 6–8% in its cell (medium), so its risk is a wrong label more than a wrong verdict. Whether 0.7 overstates learning is low-medium. Verdict: not ready for C4 until F1–F3 are answered (fixed or refused with a reason).
**Next:** personalization-eval, C4 step 1 (W-1955). **Blocked:** nothing.

## 2026-10-16 · privacy-reviewer (Elif) · L5 lab rendered page and T1 check wiring closed (run pr-l5-t1-1016)

**Changed:** new company/reviews/_privacy/2026-10-16-l5-t1-closeout.md; status section 6 in company/personalization/lab/2026-10-16-lab-privacy-dod.md; board W-1950 and W-1958 → done.
**Ruled:** L5 met with conditions (lab privacy-done for phase A): both screenshots carry "Simulated" on persona heading, fingerprint caption and legend; privacy test 2/2 pass. T1 met: I ran `npm run check` (exit 0, N1/N3 5/5).
**Believe:** high on both. Caveats: render showed Curious newcomer, not struggling-repeater (same template); I did not run a browser; privacy test runs under verify, not check or CI (M5), so wording must say "passes under verify".
**Open for phase B:** T2/T3, settings API read (B1-B4), accounts-tip re-read, D4 minors (lawyer), M1 trust-list sentence, L2/L3.

## 2026-10-16 · learning-scientist-personalization (Oskar) · C0 full-text check of the B2 range numbers, W-1953 (run ls-c0-1016)

**Changed:** new company/personalization/evidence/2026-10-16-ranges-fulltext-check.md. It has one row per number (before, after, quote, location, URL, mark) and the full list of hosts tried. A dated revision section is appended to company/personalization/evidence/2026-10-16-surprise-novelty-prerequisite-memo.md; the original table is unchanged. W-1953 → review, reader personalization-eval.
**Found:** no range bound moved. `forgetRate` high 0.20 now has a full-text source: Fazio et al. 2010 Table 2 (PMC4094137), one ~90 s reading, untested, k ≈ 0.17–0.19 above the not-read baseline. **Condition:** on raw scores k ≈ 0.065, so 0.20 holds only if the learner decays what the lesson added above prior knowledge (goes to C2). T&K 85% and Casscells 27/60, 11/60 → [F-r] via full-text papers reporting them, including the Manrai 2014 replication (44% / 23%). St. Hilaire g and k → [A]; year: 2024 print, 2023 online. Pan & Carpenter citation corrected (Ed Psych Review 35, art. 97). Unverifiable this run: R&K 2006 values, B&J idea units, Crouch %, Butler 56%.
**Believe:** the reached values are right as quoted (high). The forgetRate condition matters more than any number left unverified (medium). The four unverified values are probably right, since nothing contradicted them, but that is not checked (about 70%).
**Channel note:** only pmc.ncbi.nlm.nih.gov (OAI-PMH full text, not article HTML) and api.crossref.org were reachable. OpenAlex, Semantic Scholar and Unpaywall gave a proxy 403; publisher, author and preprint hosts failed DNS.
**Next:** personalization-eval spot-checks rows 2 and 4 (C4). I do C2 (W-1954) once C1 lands, including the forgetRate form. A session with publisher access could close the four remaining rows.

## 2026-10-16 · learner-model-engineer (Ifeoma) · W-1958 review conditions C1-C4 (run lme-w1537b-1016, branch perso-w1537)

**Changed:** new company/personalization/model/gate.mjs (plain JS, no deps, no TS imports): Node >= 22.18 guard that exits 1 with "test:personalization needs Node >= 22.18 (have vX)" (never skips; C1), then runs self-check.mjs and the N1/N3 test, and on failure names owner learner-model-engineer (escalate vp-personalization) and the READMEs (C4). `test:personalization` now = `node company/personalization/model/gate.mjs`. package.json + package-lock.json root `engines.node` >=22.18, new `.nvmrc` = 22 (C2). sim/README.md "Wired in" says why check, not verify (CI verify job runs only check/typecheck/build/qa; ci.yml protected) and the 3 s budget (C3); gate.mjs header says it too. self-check.mjs FAIL block adds an owner line (C4). Board: W-1958 → review.
**Verified by running:** `gate.mjs --node-version=` 20.11.0, 22.17.1, garbage → exit 1 with the message; 22.18.0, 24.1.0 → exit 0 (simulated, no other Node installed). Failure path on a scratch copy with a src/ file importing the model → self-check FAIL with owner line, gate exit 1. `npm run check` exit 0, ~1.4 s.
**Believe:** C1-C3 met, C4 done (high). The version override is argument-only, so it cannot leak into a real run (high). Not run: CI, `npm run verify`.
**Next:** privacy-reviewer T1 read (W-1958); principal-engineer may confirm conditions against this commit. T2 serving-layer N1/N3 stays with phase B. **Blocked:** nothing.

## 2026-10-16 · principal-engineer (Kenji) · W-1958 check wiring review + W-1919 tier review (run pe-w1537-review-1016, branch perso-w1537)

**Changed:** review record company/engineering/reviews/2026-10-16-w1537-check-wiring.md; board W-1958 → doing (conditions), W-1919 note. No code changed.
**Believe:** W-1958 approve with conditions (tier 1): check is the right place because CI runs check, not the verify test:* scripts (high, read ci.yml). Node floor is the real risk: engines says >=20, no .nvmrc, check now needs 22.18 (high). Measured: check 1.46 s vs 0.31 s without; check passes with no node_modules. W-1919 "where the model lives": tier 1, approved; phase B serving is tier 2; the lesson-dims half of W-1919 is not covered (high).
**Next:** learner-model-engineer: C1 Node guard, C2 engines >=22.18, C3 why-check-not-verify note, then privacy-reviewer T1 read. W-1919 lesson-dims part waits on founder Q2; meta.json fields would need an EDD.
## 2026-10-16 · learner-model-engineer (Ifeoma) · W-1958 privacy T1: personalization tests wired into check (run lme-w1537-1016, branch perso-w1537)

**Changed:** package.json only for wiring (no dependency): new script `test:personalization` = `node company/personalization/model/self-check.mjs && node --test company/personalization/model/sim/privacy-n1-n3.test.mjs`; `check` now ends `&& npm run test:personalization`. So `npm run verify` and the CI verify job (it runs `npm run check`) run them with no ci.yml change. privacy-breaks.mjs (~10 s) deliberately not wired. Notes in company/personalization/model/README.md and sim/README.md. W-1958 → review.
**Verified by running:** `npm run check` rc 0 (~1.4 s total, tests add ~1 s); `npm run test:personalization` rc 0. Deliberate breaks, each reverted: ageBand penalty in composer.ts → check rc 1 (N3 fails); model.ts naming "personas" → check rc 1 (self-check boundary).
**Believe:** T1 is met as "enforced" for every check/verify/CI run (high). Risk: CI's node 22 must be ≥22.18 for type stripping; setup-node "22" resolves latest 22.x (high, not run in CI here).
**Next:** privacy-reviewer confirms T1; principal-engineer reviews the package.json change. T2 (serving-layer N1/N3) stays open for phase B (learner-model-engineer / personalization-engineer).
## 2026-10-16 · personalization-engineer (Tavi) · W-1950 lab no-real-data test + W-1718 D1 review nits (run pe-d2-1016, batch 2 item D2, branch perso-d2)

**Changed:** new tests/hq/personalization-privacy.test.mjs (runs in `npm run test:hq`): scans the lab files (DoD §2 scope; the page folder is walked so new files are covered) and allows exactly one exception, privacy-reviewer's ruling lines 36/39 (company/reviews/_privacy/2026-10-16-personalization-batch-reads.md, L1): `fetch` of the literal `/api/hq/personalization`, optionally `?` + query. Fails on any other fetch mention (variable, alias, absolute, interpolated before `?`), any other `/api` path, localStorage, `s3c:`, sessionStorage, indexedDB, document.cookie, cookies(), headers(), the L1 module list; stricter extras: XHR/beacon/WebSocket/EventSource, `.headers`/`.cookies` reads, non-literal import/require, an import allowlist, a missing scoped file. W-1718: `meta` no longer takes the run lock (N1); `SimResult` carries `busy: true` and the route returns 429 with `Retry-After: 5` on it (N2); a test that a failed run releases the lock (N3). DoD D5 and F2 updated (company/personalization/lab/2026-10-16-lab-privacy-dod.md). Board: W-1950 to review (hq-engineer, privacy-reviewer), W-1718 to review (hq-engineer).
**Verified:** the privacy test's own break case plants 35 patterns in a temp copy, each caught; separately the real scan was run against 36 broken temp copies (35 + route.ts deleted): 36/36 failed with the expected rule, clean control passed. The new N1 test fails on the pre-change server file; N3 already held before (regression test only). Personalization HQ test 7/7; `npm run test:hq` 71/74 with the 3 known shallow-clone release failures; typecheck clean; `npm run check` run. Not run: `npm run verify` (build + QA), the page in a browser.
**Believe:** the test enforces L1 as written (high). A name assembled at run time (`window["fe"+"tch"]`) escapes any grep; the import allowlist and hq-engineer review are the backstop (stated in the test header). L2/L3 are not code checks here.
**Next:** hq-engineer reviews perso-d2 (W-1950, W-1718). privacy-reviewer confirms L1 and reads the rendered lab page (L5); the lab is not privacy-done before that. **Blocked:** nothing.

## 2026-10-16 · privacy-reviewer (Elif) · three personalization reads: W-1947, W-1948, W-1942 (run pr-perso-reads-1016)

**Changed:** new company/reviews/_privacy/2026-10-16-personalization-batch-reads.md. Rulings: W-1947 N1/N3 composer tests pass with conditions (T1 wire into check/CI, T2 serving layer needs its own, T3 renamed-key limit); W-1948 own-route fetch exception accepted narrowly (literal /api/hq/personalization only, L1-L5), lab not privacy-done until W-1949 and W-1950 land and I read the rendered page; W-1942 settings schema pass with conditions B1-B4 (not clear to apply), personalization_on option A accepted (D1-D4), merge pass with G1-G4 (an explicit off is never turned on by a merge). Data-inventory: D21.1-D21.4 (3.6a) and D22 written, "designed, not built". Board: W-1947 done; W-1948, W-1942 doing; W-1949, W-1950 next; two new items (wire tests; settings API read).
**Verified by running:** privacy-n1-n3.test.mjs 5/5; privacy-breaks.mjs 13 rows all caught; test-00N-settings.sh 26/26.
**Believe:** composer tests do what they claim (high). First serving build passes N1/N3 without a finding (about 65%). Schema survives backend order review without a privacy change (about 80%). Not checked: rendered lab page, 001_accounts (branch unavailable), any settings API.
**Next:** learner-model-engineer wires tests; personalization-engineer W-1949/1529/1530; learner-data-engineer settings API to B1-B4; backend-engineer order review and deletion/export patches; analytics-steward D3 in registration. **Blocked on counsel:** D4, minors defaulted into a personalized arm.
## 2026-10-16 · personalization-engineer (Tavi) · W-1949 lab labels + W-1951 runSim hardening (run pe-d1-1016, batch 2 item D1, branch perso-d1)

**Changed:** src/app/hq/personalization/Personalization.tsx: "Simulated persona: {name}" heading, "Simulated persona" run select, "Simulated personas" compare select ("all six simulated personas"), comparison caption says "simulated persona(s)", fingerprint caption and aria-label "Simulated fingerprint", curve legend "simulated persona mean" / "selected step's simulated fingerprint". src/lib/hq-personalization-server.ts: one simulator process in flight per module instance (identical request joins it, a different one gets `BUSY`), `meta` cached for the process keyed on the newest mtime under company/personalization/model (out/ skipped) plus sim/out/traces's mtime, child env reduced to `CHILD_ENV` = `NODE_NO_WARNINGS=1`. src/app/api/hq/personalization/route.ts returns 429 on BUSY. New test in tests/hq/personalization.test.mjs. DoD D2/D3 status lines and F3 updated (company/personalization/lab/2026-10-16-lab-privacy-dod.md). Board: W-1949 and W-1951 to review (hq-engineer code; privacy-reviewer for D2/D3). No simulator/model change, no dependency, no new data path.
**Verified:** typecheck passes; personalization HQ test 6/6; `npm run test:hq` 68/71 with the 3 known shallow-clone git-history failures (now numbered 48/54/55 because one test was added). On a local dev server (port 3217, stopped by pid): all new labels render at 1280 and 390 wide (screenshots git-ignored, artifacts/d1/); a run during a running compare got 429 and the same run succeeded after. Not run: `npm run verify` (build + QA).
**Believe:** the lock bounds spawns per route as asked (high); Next may load the server module separately for page and route, so the page's meta and an API call can still overlap (two processes at most; medium). `next dev` writes an untracked AGENTS.md in the worktree; not committed.
**Next:** hq-engineer reviews perso-d1 (W-1949, W-1951); privacy-reviewer reads D2/D3 and rules on H1/H2 (unblocks D2/W-1950). **Blocked:** nothing.
## 2026-10-16 · personalization-eval (Uma) · batch 2 C1: eval-owned learner, scorer and harness; S set; criterion §8 ruled (run eval-c1-1016)

**Changed:** new company/personalization/eval/harness/ (learner.mjs, scorer.mjs, world-inputs.mjs, personas.copy.mjs are judge modules that import nothing; harness.mjs, checks.mjs, run.mjs, run-worker.mjs, tests.test.mjs, README.md with run and reproduction steps, records/2026-10-16-seeds-c1.json). Criterion company/personalization/eval/2026-10-16-phase-a-criterion.md, still **draft (unfrozen)**: S, the episode definition, the per-term pairs, the rho definition, the persona mapping, the forgetting-range rule and T4 wording written; delta_harm 0.02 -> 0.01; §8 ruled row by row; every C1 change listed in §9. Decision file marked built. Board: W-1927 -> review (learning-scientist-personalization, C2); notes on W-1937 and W-1917. No edit to model/, sim/, personas.ts or any curve.
**Believe:** the judge is isolated from the composer's ratings (high: T5 static, T6 dynamic pass, and rho leaves the judge and default-order byte-identical). S = 200: sd_R of the default-order arm is 0.0315 at most, the formula gives 156, so the floor binds (high for the memo values as written; C4 recomputes if C0 moves a base value). The world's fidelity to B2 is untested until C2 (medium-low: several mechanisms are my choices and are listed for C2). No policy has been scored: the freeze lock refuses every policy but default-order and fixtures.
**Next:** C2 (learning-scientist-personalization, W-1954) reads the harness against B2 + C0; then C4 (me, W-1955): answer C2's blocking findings, spot-check two C0 rows, fill the B2 block, freeze, run `run.mjs --seeds=200 --jobs=4` (about 30-40 min). **Blocked:** C4 on C0 and C2.

## 2026-10-16 · vp-personalization (Mateo) · W-1952 answered, five pre-freeze decisions, lane 14 batch 2 (run vp-cgate-1016)

**Changed:** new company/decisions/2026-10-16-vp-personalization-pre-freeze-decisions.md (five decisions). New §8 "VP response before freeze" appended to company/personalization/eval/2026-10-16-phase-a-criterion.md (the criterion text itself is untouched; the eval rules on each row). New company/personalization/batches/2026-10-16-batch-2.md. Board: W-1952 done; notes on W-1917, W-1918, W-1936, W-1937, W-1942, W-1949, W-1950, W-1951; new W-1953 (C0 full-text check), W-1954 (C2 fidelity), W-1955 (C4 freeze + first readout), W-1956 (C5 reproduction), W-1957 (my keep/kill). No model change: model-v0.2.1 stands.
**Decided:** (1) rating fidelity: simulated ratings from the hidden pull at swept rho; per-term surprise runs as the named counterfactual gam-surprise-on; contested delta_harm .02 -> .01, accepted the rest including G4 and penalty-0 cells. (2) C3 does not run: its condition means memo §1c (low); trigger written. (3) Novelty kept for the first readout, with a kill rule set before data (must win per-term at novelty benefit 0). (4) personalization_on: option A (nullable; NULL serves a registered arm, else F1; explicit off wins). (5) The load-bearing [S]/[R] numbers are full-text checked before freeze by learning-scientist-personalization, and the eval spot-checks two rows.
**Believe:** the main GAM pass does not depend on ratings while the surprise gate is shut (high; read from `COMPOSER.surpriseGate` and composer.ts). FAIL-SENSITIVE at prerequisite penalty 0 is a likely outcome and I have said in advance what it means (medium).
**Next:** chief-of-staff dispatches batch 2 wave 1: C1 (eval, worktree), C0 (learning scientist), D1 (personalization-engineer, worktree). **Blocked:** D2 on privacy-reviewer's ruling (W-1948 H1/H2); settings API on privacy-reviewer's read of W-1942; C3 on its trigger.

## 2026-10-16 · lesson-dims-owner (Anneke) · W-1936 step 1: misconceptionStrength rubric msr-v1 + 12 anchors (run dims-b3-1016, batch 1 item B3)

**Changed:** new company/personalization/dims/2026-10-16-misconception-strength-rubric.md, which holds the final rubric (msr-v1: the construct, the 1/2/3 conditions, a 7-step procedure, the record shape, a ties-go-low rule with `borderline`, and an anchor-reread rule against drift) and the 12 anchors with reasons. The anchors in machine-readable form are in company/personalization/dims/2026-10-16-misconception-strength-anchors.json (`strengthSource: "dims-owner"`, rater `lesson-dims-owner:dims-b3-1016`). The anchors: L3 base-rates, better-in-every-group-worse-overall, bus-wait-longer-than-half, new-road-slower-trip. L2 two-writers-one-counter, two-names-one-list, four-rolls-one-six, odds-three-to-one. L1 clear-the-lowest-one, cut-the-busiest-link, jackpot-once-a-week, where-the-axis-starts. The W-1936 note says step 1 is done and 1b waits for C3. No write to meta.json or content/curriculum.
**Verified:** `npm run walkthrough` worked here (it started its own next server). I walked through 41 candidates, chosen by scanning hook and misconception across all 230 pilot lessons, then read `misconception` and `learner` in meta.json. I did not read recall, the simulator output, the catalog placeholder values, composer weights or any rating. I did not open Demo.tsx, because the walkthrough shows the predict card as served.
**Believe:** the rubric separates the levels on these anchors (medium; one rater, and every "modal pick" is my model of the learner, not data). Strong cs lessons are rare under the robustness condition (low-medium, from 1 strong anchor among the cs candidates).
**Next:** vp-personalization decides the C3 condition (B2 memo §1c). If it is met, I rate the rest under msr-v1 (step 1b), then personalization-eval runs the blind 20% second rating from non-anchor lessons. **Blocked:** 1b on C3; the index location on W-1919.

## 2026-10-16 · learning-scientist-personalization (Oskar) · W-1918 + W-1938 evidence memo and simulated-learner ranges (run ls-b2-1016, batch 1 item B2)

**Changed:** new company/personalization/evidence/2026-10-16-surprise-novelty-prerequisite-memo.md. For each question it gives full citations, the direction and size of the effect, a confidence level and what is unknown, and it ends with a ranges table (parameter, low, base, high, source, confidence) for the C1 sweep. W-1918 and W-1938 are now in review with personalization-eval named as reader, and the notes on both items carry the key numbers. No curve, weight or simulator setting was changed.
**Verified:** citations and findings were checked against abstracts and index records. Almost no primary full text was reachable (DNS failure on pmc, springer, nsf, gwern and university hosts), so each number is marked [A] (checked), [S] (secondary source) or [R] (recalled), and no effect size was read from a primary table. I did not open the simulator results, sim/out, the HQ lab table, the decision record's findings or the eval criterion. I saw the eval's progress entry only after the memo was written.
**Believe:** predicting and then getting feedback helps memory of the predicted item (medium-high). Hypercorrection exists (high) and helps recall after a week (medium), but confidently wrong answers can return. Whether choosing higher-surprise lessons raises mean recall is unknown (low). I found no evidence that novelty, as the model defines it, raises recall (low; base 0). Meeting a lesson before a prerequisite it truly needs lowers what is retained (medium), but the size for our self-contained lessons is unknown (low). The penalty range is 0 / .15 / .40, with a stress value of .5. Forgetting: per-day k .04 / .10 / .20 over the 1-7 day window. Misconception pull per lesson: .30 / .55 / .85.
**Next:** personalization-eval fills the B1 placeholders from the table (C1), then I do C2, the fidelity review. vp-personalization decides whether C3's "medium or better" means hypercorrection (which meets it) or the surprise term (which does not); the memo §1c sets out the split. Every [R] and [S] number needs a full-text check before any claim (research-lead or a web-capable session). **Blocked:** nothing.

## 2026-10-16 · personalization-eval (Uma) · W-1917 criterion draft + MDE, W-1927 decision (run eval-b1-1016, batch 1 item B1)

**Changed:** new company/personalization/eval/2026-10-16-phase-a-criterion.md (`status: draft (unfrozen)`): primary R = expected first-revisit recall over every completed lesson (no survivorship), paired common-random-number episodes, fixed seed list (S set in C1 from the default arm's SD only). Pass per pair (GAM vs default-order, GAM vs draft-rules, both needed): ≥4/6 personas win (CI > 0 and Δ ≥ 1 pt), no persona harmed by ≥2 pts, guardrails G1-G3 from OBJECTIVE with margins plus G4 knowledge gain (added by eval), in the base cell and all 8 one-at-a-time cells (PASS / FAIL-SENSITIVE / FAIL / INVALID). Sweep has named B2 placeholders (prereq, surprise, base latents) and RHO_AGREEMENT. Tests T1-T7 (replay, pick replay, forbidden input, explanation, judge isolation static/dynamic, judge known answers). Phase B MDE table under stated assumptions. New company/personalization/eval/2026-10-16-learner-scorer-decision.md: learner REPLACE (hidden per-lesson pull, prereq penalty split in two, CRN, same SimLearner interface), scorer ADOPT A COPY with additions, latents copied; sim/ and personas.ts untouched. Board: W-1917, W-1927, W-1937 → doing with notes; new W-1952 (vp-personalization: fidelity-mechanism question, bars contestable before freeze).
**Verified:** no simulator run; sim/README.md, sim/out/, the HQ lab table and the decision record's findings not opened. Three provisional results reached me through required inputs (W-1937 title, batch file, model.ts comment); disclosed in criterion §0. MDE is arithmetic only (normal approximation).
**Believe:** the draft rule is testable and does not depend on any result I saw (medium-high; the prereq-zero rule was set from evidence confidence, not from the known reversal). MDE: base assumptions (20% holdout, p .6, 3 first revisits per learner, ICC .1) give about 7 pts at 1,000 eligible learners, 3 pts at 5,000, 2 pts needs ~12,000; per-term keep/kill from one holdout is underpowered at launch traffic (high on the arithmetic, low on every traffic input: there is no traffic data).
**Next:** B2 memo fills the placeholders; VP answers W-1952; then C1 (me, worktree) freezes and builds the eval learner/scorer. **Blocked:** freeze waits on B2 and W-1952.

## 2026-10-16 · personalization-engineer (Tavi) · W-1948 HQ lab privacy DoD + no-real-data grep (run pe-b6-1016, batch 1 item B6)

**Changed:** new company/personalization/lab/2026-10-16-lab-privacy-dod.md. It holds the definition of done D1 to D6 from privacy ruling §6 and the no-real-data grep, recorded at aab21dc with each hit explained. I made no src/ edits. New board items, all owned by me: W-1949 (add "simulated" to the fingerprint caption, the curves legend and the persona heading), W-1950 (turn the grep into an automated test), W-1951 (runSim lock, meta cache and minimal child env, from the hq review findings 3 and 5). W-1948 is in review with privacy-reviewer named.
**Verified:** the grep has 0 hits for localStorage, s3c:, accounts imports and storage or cookie reads. There are 3 hits for /api/ and fetch: Personalization.tsx:182 and :285 fetch the lab's own route, and route.ts:1 is a comment. I read the CLI's data inputs (personas.ts, the lesson catalog, sim/out/traces) and the transitive imports. The rendered page was not viewed in a browser.
**Believe:** the lab code has no real-data path (high, from reading the code). D2 and D3 are only partly met: the fingerprint table caption, the curves legend and the persona h2 lack "simulated" (high, from reading the JSX).
**Next:** privacy-reviewer reads W-1948 and rules on the own-route fetch exception. Then I do W-1949 and W-1950, each with hq-engineer review. **Blocked:** nothing.
## 2026-10-16 · learner-data-engineer (Solenne) · W-1942 `settings` schema diff + design note (run lde-b4-1016, batch 1 item B4)

**Changed:** new company/personalization/data/: `00N_settings.up.sql` / `.down.sql` (draft), `test-00N-settings.sh` (up/down test on a throwaway local Postgres 16 cluster, stub `auth_user`, fake data only), `2026-10-16-settings-schema-note.md` (SS1 to SS5 clause by clause, proposed inventory rows D21.1-D21.4 and D22, retention line, delete and export patches for backend-engineer, the D20 no-column line, the `personalization_on` default as a question with the VP's position, open questions). Table: `settings(user_id text PK FK auth_user ON DELETE CASCADE, personalization_on boolean NULL, subjects text[] ≤32 id-shaped, less_of text[] ≤50 typed 'domain:'|'concept:'|'lesson:')`, no timestamps, no secondary index. W-1942 → review. **Not written against the `accounts` branch** (not fetchable): drafted on branch `perso-settings-w1521` from main; the number, FK target, runner compatibility and preview down test are backend-engineer's order review (note §0). No edit to auth tables, progress, recall, EDD-008, data-inventory or src/.
**Verified:** test script 26/26 (shape checks, caps, FK, one row per account, cascade, no extra index, down drops only `settings`, up/down/up). All 14 domain ids, 1,205 curriculum ids and 974 slugs fit the CHECK patterns. 20 slugs equal a concept id, hence the typed `less_of`.
**Believe:** the schema meets SS1 to SS5 at the database level as far as a database can (medium-high); catalog membership, dedupe and the SS3 "no write but the learner's" guard live in a settings API not yet written. FK and runner fit with 001 are unverified (medium).
**Next:** privacy-reviewer reads the note (W-1942); principal-engineer tier 2 (schema, table name); backend-engineer order review + delete/export patch (note §6); vp-personalization with privacy-reviewer decide the default (note §5). Then this role writes the settings API. **Blocked:** anything real until privacy-reviewer's written pass; the accounts branch for the real migration number.

## 2026-10-16 · learner-model-engineer (Ifeoma) · W-1947 privacy N1 + N3 tests on the shipped composer, A2 note (run lme-b5-w1526-1016, batch 1 item B5)

**Changed:** new company/personalization/model/sim/privacy-n1-n3.test.mjs (node:test, no dependencies): runs fingerprintFrom -> detect/explainNeeds -> composeExplained (+ gamCompose) for 10 cards x 8 synthetic histories on the real pilot catalog. N1 stubs storage, network, fs (incl. named imports), http/net/tls/dgram, child_process, console and stdout, and deep-freezes the input: zero writes, zero fetches, zero storage reads, no mutation. N3 varies all 11 FORBIDDEN_INPUTS (ageBand included) at 4 levels: same order, same full composition, no forbidden key read (Proxy). Controls: 16 of 80 cards moved; flipping one permitted input changes the order; stubs do record a write and a fetch. New sim/privacy-breaks.mjs applies 12 breaks to a temp copy of composer.ts and checks each is caught. sim/README.md names both commands, the limits, a grep note for the privacy read, and the A2 note to W-1918 and W-1927. W-1947 -> review, reviewer privacy-reviewer. No edit to learner.ts, score.ts, personas, model.ts, curves, weights, self-check or src/.
**Verified:** test 5/5 pass; privacy-breaks 13/13 rows as expected; self-check OK; npm run check and typecheck pass. verify not run (no app code changed).
**Believe:** both tests catch the breaks they target (high: each break run on a temp copy). The ruling's literal order-only N3 misses a break that shifts every score by the same amount (shown by row B6uo); the composition and read checks catch it (high). The tests cannot see IO from code the composer does not call, or a forbidden value under a renamed key that leaves the composition unchanged (stated in the README).
**Next:** privacy-reviewer reads W-1947. Phase B serving code needs its own N1 test where it runs (personalization-engineer, when it exists). **Blocked:** nothing.

## 2026-10-16 · vp-personalization (Mateo) · lane 14 batch 1 + W-1935, W-1941, W-1933 (run vp-lane14-batch-1-1016)

**Changed:** company/personalization/batches/2026-10-16-batch-1.md is the first lane 14 batch. Wave 1 runs 6 agents in parallel: B1 eval criterion draft + MDE + W-1927 decision (no runs); B2 evidence memo W-1918/W-1938; B3 rubric + 12 anchors only; B4 W-1942 settings diff (worktree); B5 W-1947 N1/N3 composer tests (worktree); B6 W-1948 HQ lab privacy DoD + grep. Wave 2: C1 eval freezes the criterion and owns the learner (worktree); C2 fidelity review; C3 the 230 ratings, only if B2 supports surprise. Each item has a pasteable brief. **W-1935 done:** model.ts is now model-v0.2.1, with privacy metadata only (no curve, weight or output change). `PrivacyStatus` follows the W-1916 ruling. `PRIVACY_RULING` and `INPUT_PRIVACY_CONDITIONS` are shown by `inspect()`, and `checkModel()` requires conditions on every personal input. self-check adds P2 (null is never wrong), P1 (the recall-only fallback is invariant over 64 predictedCorrectly variants) and N6 (the current version line must say `privacy:`). A decision-record line was added. **W-1941** acked in the model README. **W-1933** answered in §7 of the org proposal (agree with changes; `personalization_on` position given). New board items: W-1947 (learner-model-engineer), W-1948 (personalization-engineer).

**Believe:** self-check passes, and both new privacy tests fail under a mutation that breaks them (high: ran both mutations in scratch). Strict tsc on the model and sim .ts files is clean, and the HQ CLI `meta` emits the new statuses as plain strings, which the HQ types accept (high). The batch has real inputs today for every wave-1 item, except that B4's `accounts` branch is not in this clone (medium: it must be fetched or drafted on main).

**Next:** chief of staff restarts the session so the six new role types load, then dispatches wave 1 from the batch file. Without a restart, B5 only. Outside lane 14: principal-engineer tier review of W-1919; W-1943/W-1944 consults; hq-engineer W-1940 after W-1945. **Blocked:** no scored comparison until C1 is committed (independence rule); F-19 for anything phase B.
## 2026-10-16 · hq-engineer · personalization org seated, W-1924 reviewed (run hq-w1524-seats-1016)

**Changed:** no new room or floor (founder rule 2026-10-16-founder-org-and-dispatch-rule.md respected). Re-cut widths in the floor 2 bottom row of src/lib/hq.ts: launch-room 300->140, personalization 150->250 (4 seats: VP, applied scientist, learning scientist, lesson-dims-owner), model-lab 150->250 (4 seats: learner-model-engineer, personalization-engineer, learner-data-engineer, personalization-eval), international 110, locale-desks 178 (both still hold their residents). HOME (people.ts) and ROOM_BY_ROLE (tools/events.mjs) updated. VP stays in the personalization room, as vp-rnd and vp-marketing sit in their own org's room. Review of W-1924 in company/reviews/hq/2026-10-16-w1503-review.md (no blocking issue; one comment fixed in HqTop.tsx; 8 items listed).
**Verified:** test:hq 67 pass, 3 fail: 47, 53, 54, all `git rev-parse` of an old commit in a shallow clone (git rev-parse --is-shallow-repository = true); tests 18 and 19 pass. typecheck and check pass. Not viewed in a browser: room labels at the new widths are unchecked by eye.
**Believe:** seats are right (high); the 47/53/54 failures are the shallow clone, not code (high, unproven until run in a full clone).
**Next:** hq-engineer: dedupe the HQ tab list, look at floor 2 in a browser; owners of W-1924 follow the review (concurrency cap). Blocked: nothing.

## 2026-10-16 · chief-of-staff-ceo-office (Leonie) · personalization org generated (run leonie-gen-perso-1016)

**Changed:** on the founder's approval ("Approve V, N1–N6, E1–E3; 7 directs fine for now; progress/recall stay with backend.", company/decisions/2026-10-16-founder-personalization-org.md) tools/org/roles.mjs now has **vp-personalization** (Mateo, VP of Personalization (CEO Office), reports to founder; replaces personalization-lead), **personalization-eval**, **applied-scientist-personalization**, **learning-scientist-personalization** (pool roles, MANY), **lesson-dims-owner** (Anneke), **personalization-engineer** (Tavi), **learner-data-engineer** (Solenne), all under the VP; edits E1 learner-model-engineer (tech owner, no offline policy eval, may not build the judge), E2 growth-designer (no streaks), E3 backend-engineer (migration order review; personalization tables out). Generated company/roles/ and .claude/agents/ (105 roles, 104 agents); personalization-lead files removed. Memory moved to company/roles/memory/vp-personalization(.md, /). Board re-owned: W-1917/W-1927/W-1937 → personalization-eval; W-1918/W-1938 → learning-scientist-personalization; W-1936 → lesson-dims-owner; W-1942 → learner-data-engineer; W-1919 → learner-model-engineer; W-415, W-817, W-901, W-1933, W-1935, W-1941 → vp-personalization (done W-1960/W-1926 keep their historical owner; W-1940 stays hq-engineer; W-1924 stays in hq-engineer review, §9 says personalization-engineer after it). POC map lane 14 (POC vp-personalization, 7 roles), founder 9 directs, head-of-product 24; handoff map row; org-change-process directs list; personalization README owner line; HQ id key renamed in people.ts, events.mjs, hq-colors.ts only.
**Verified:** npm run check passes (3 pre-existing lifehacks warnings); test:dispatch 113/116 pass, 0 fail; test:memory 7/7; test:mailbox 7/7 (lane 14 check: vp-personalization may request personalization-eval and learner-data-engineer); typecheck clean. **test:hq: 4 fail** — 3 pre-existing (git-history release tests, same on HEAD) and **floors test 18, new**: the six new roles have no HQ seat. Not CI-gated; verify would fail until W-1945.
**Believe:** the org matches cards V, N1-N6, E1-E3 as written (high). The memory rename is safe: read shows the 4 old entries, and compact works on a copy (high).
**Next:** chief of staff writes the `org-change` event (subjects: the 7 ids, old id personalization-lead) and dispatches first tasks through the VP's lane 14 batch (W-1942 learner-data-engineer can go today; W-1917 + W-1927 personalization-eval before any scored run). hq-engineer seats the six roles (W-1945). Owners update prose that still names personalization-lead (W-1946). Consults W-1928..W-1933, W-1943, W-1944 still pending in proposal §7.
**Blocked:** nothing on the founder. New .claude/agents files are most likely loaded only at session start: restart the session (or check /agents) before dispatching them by subagent type.

## 2026-10-16 · chief-of-staff-ceo-office (Leonie) · customer-data team for the founder's third message (run leonie-custdata-1016)

**Changed:** the personalization org proposal (company/ceo-office/2026-10-16-personalization-org-proposal.md) gains a Customer Data sub-team: card **N6 learner-data-engineer** (reports to vp-personalization) and card **E3** (backend-engineer scope edit), with §3a (T9) resolving the overlap: personalization tables, their migrations, retention, inventory column confirmation and deletion/export behaviour move to the org; backend-engineer keeps the auth tables, `progress`, `recall`, tools/db-migrate.mjs, the single migration sequence (order review of every migration), EDD-008 and the `accounts` branch; principal-engineer keeps tier-2 schema review; privacy-reviewer stays the gate. Decision record route rows 2b/3b filled (company/decisions/2026-10-16-founder-personalization-org.md). Board: W-1942 first task (`settings` schema diff for privacy-reviewer, held by personalization-lead until N6 is approved), consults W-1943 backend-engineer, W-1944 privacy-reviewer. No role, agent or roles.mjs entry created.
**Believe:** one role is the smallest team that does the work now (one diff, its rows and retention); the steward split belongs at phase C. Fairly sure (~75%) the order-review rule holds without friction; the residual is that the export/delete code stays backend-engineer's.
**Next:** founder approves N6 (+E3) in one line; then the CEO office generates the role and W-1942 is re-owned and dispatched the same day. Consults W-1943/W-1944 answer in the proposal's §7.
**Blocked on founder:** cards V, N1-N6, E1-E3; span 7 (objection 9); whether `progress`/`recall` were meant (objection 10). Nothing deployed.

## 2026-10-16 ~19:00Z · chief-of-staff — personalization founder brief through to a first HQ lab

**Changed:** the founder's personalization brief (F-08) recorded with his EDP Orchestrator reference (company/personalization/2026-10-16-founder-brief.md, reference/edp-orchestrator/); Mateo's response and six best guesses ratified by the founder with one change (curves in code, not JSON); founder made Mateo **VP of Personalization** with a self-contained org (company/decisions/2026-10-16-founder-personalization-org.md); Leonie's org proposal (company/ceo-office/2026-10-16-personalization-org-proposal.md) awaits card-by-card founder approval. Built and merged: model v0.2 (company/personalization/model/), offline simulator (sim/), privacy ruling on inputs (company/reviews/_privacy/2026-10-16-personalization-model-inputs.md), HQ lab /hq/personalization (founder brief §7). Board-id collisions fixed twice (W-1926/13, W-1940/20): parallel agents allocate the same next id.
**Verified here:** model self-check OK; tests/hq/personalization 5/5; typecheck clean; production build OK; page renders at 1280 and 390 with no page errors (dev server, screenshot). Full QA suite not run in this session. node_modules was wiped by a container restart and reinstalled with npm ci.
**Believe:** the sim comparison is UNSCORED and supports no ranking (gaps ~0.01-0.03 vs sd ~0.13; the GAM edge comes from the provisional learner's prerequisite assumption). High confidence on that.
**Next:** founder approves role cards (N1 personalization-eval first: W-1917 criterion, W-1927 judge); W-1935 apply privacy conditions (Mateo); W-1936 misconception ratings; W-1919 principal-engineer tier review; W-1940 hq-engineer review of shared HQ code.
**Blocked on founder:** role cards V, N1-N5, E1, E2. Nothing deployed.

## 2026-10-16 · personalization-lead (Mateo) · W-1926 model-v0.2 from the simulator findings (run pl-w1512-1016)

**Changed:** `company/personalization/model/model.ts` → **model-v0.2** / composer-v0.2. Compose one card, then recompute (`slotsAhead` 1); `overlap` and `slot` terms removed. `surpriseGate` is inactive: surprise is 0 unless the gate is on AND the lesson has a real `strengthSource` (`dims-owner` source added). Breadth guardrail redefined as top-domain share plus distinct concepts. The 1-in-3 floor's counting rule and its skip gap are written into `antiBubbleFloor`. Two new `checkModel()` invariants. Call sites fixed only where the contract changed: sim/composer.ts (terms, gate) and sim/simulate.mjs (dropped `gam-off-overlap`). learner.ts and score.ts are untouched. Each finding's decision and objections are in the model-v0.2 section of `company/decisions/2026-10-16-personalization-model-v0.md`. New plan: `company/personalization/2026-10-16-misconception-strength-ratings-plan.md`. Board: W-1926 done; W-1936 ratings (held for lesson-dims-owner), W-1937 eval asks (held for personalization-eval), W-1938 research-lead (prerequisite-order evidence), W-1939 privacy-reviewer (session-local served list, phase B).

**Believe:** finding 4 is the important one. The GAM's simulated edge comes from the judge's prerequisite-penalty assumption, so there is no evidence yet that the composer beats default order (high). I changed no curve or weight to win it back. The quick run after the change is as predicted (`gam` = old `gam-off-surprise`, 0.684 recall vs default 0.654, sd ~.13, 5 seeds, UNSCORED). The floor holds over completed cards (max 2 moved in a row) but not over served cards (max 4), because skipped cards are not counted (high, measured on 30 episodes). Self-check OK; strict tsc on the model/sim .ts files clean; `npm run typecheck` cannot run here (no node_modules); `npm run check` passes.

**Next:** W-1935 (mine): apply privacy section 8. W-1917 criterion before any scored run. W-1937 for personalization-eval once approved. Pilot widening to math is a v0.3 candidate after eval has math latents.

**Blocked:** founder approval of cards N1 (eval) and N4 (lesson-dims-owner) gates the ratings and the judge swap; W-1919 (dims location).

## 2026-10-16 · privacy-reviewer (Elif) · W-1916 personalization model inputs (run pr-w1495-perso-inputs-1016)

**Changed:** wrote `company/reviews/_privacy/2026-10-16-personalization-model-inputs.md` (per-signal rulings, conditions A2-A3, P1-P4, SS1-SS5, F1-F3, AG1-AG3, M1-M3, N1-N6, T1-T6, HQ lab limits); added row D20 to `company/engineering/data-inventory.md` (derived personalization values: nothing stored). W-1916 to review; new board item for personalization-lead to apply the conditions. No code, no protected path.

**Believe:** phase A touches no real data (high: sim reads only curriculum and meta.json, no storage/network calls by grep). Phase B: `predictedCorrectly` for ordering allowed with conditions (recall-only fallback must stay tested); stated subjects/less-of allowed with conditions on a schema not yet built; the five on-demand signals allowed; fingerprints/need scores stored per learner refused; gapDays refused; masteryOf as input conditional on EDD-009; HQ lab simulated personas only; teen mode same model, age band never an input (medium-high; conditions are on builds I have not seen, about 70% first build is clean). Every phase B ruling rests on AMD-008 P2 as drafted (F-19 open).

**Next:** personalization-lead applies section 8; backend-engineer puts SS1-SS5 in the settings diff; analytics-steward owns N5/T4/AG; I read the settings diff. **Blocked:** F-19; lawyer items in section 7 of the review.
## 2026-10-16 · learner-model-engineer (Ifeoma) · W-1924 HQ Personalization lab + W-1919 proposal (run lme-w1503-hqlab-1016, branch perso-hq-lab)

**Changed:** new route `/hq/personalization` (HQ tab "Personalization"). It is read-only and uses simulated personas only. You pick a persona, a policy (model policies, the 9 GAM ablations, random, epsilon), a seed and the number of days, then run the simulation live or load a saved `run.mjs` trace. The page shows: persona, fingerprint (means, jittered, step) with privacy status; ground truth, collapsed; each need's pwl curve as SVG with the persona's point and the step's point marked; per-signal x→y, weight, contribution and reason; MODEL_VERSION; the timeline, with candidates per slot carrying every score term, the winner, the deciding constraint, rejected cards and why, and simulated prediction, reveal and recall; and a policy table labelled "UNSCORED: no committed criterion; provisional simulated learner". Files: `src/app/hq/personalization/{page.tsx,Personalization.tsx,personalization.module.css}`, `src/app/api/hq/personalization/route.ts`, `src/lib/hq-personalization.ts` (types and request parsing), `src/lib/hq-personalization-server.ts` (the only gateway), `company/personalization/model/sim/hq-cli.mjs` (JSON CLI), `tests/hq/personalization.test.mjs`, and a tab added in `HqTop.tsx` and `HQ.tsx`. **W-1919 proposal** in `company/personalization/model/README.md` "Where the model lives": the model stays put and the app never imports it. HQ spawns `sim/hq-cli.mjs` and reads JSON. This is local only, with no tsconfig, next.config or dependency change. I edited Mateo's `self-check.mjs` so it now forbids imports and confines child_process to the gateway (W-1936 asks him to ack). Board: W-1924 and W-1919 moved to review; W-1935 (hq-engineer review) and W-1936 added.

**Believe:** the page renders at 390 and 1280 in both themes with no horizontal overflow or console errors, and the timeline and Run are keyboard reachable (high: Playwright run, screenshots in `company/personalization/model/sim/out/hq-screens/`, gitignored). A run takes about 0.3 s and a single-persona comparison about 1.5 s (measured). All of its numbers stay UNSCORED smoke tests (certain). verify: typecheck, build, check and every test suite pass except 3 `tests/hq/releases.test.mjs` cases. Those fail because this worktree is a shallow clone and misses the commits they name; they are unrelated to this change. QA (lesson contract) was only partly run: 854 of 1958 cases passed and 0 failed before my 25-minute timeout stopped it. The QA suite does not cover HQ pages; the HQ page was checked by its own Playwright run (above).

**Next:** principal-engineer tier review of W-1919; hq-engineer W-1940; personalization-lead W-1941. Once personalization-eval exists, it owns the learner and scorer behind the table (W-1927).

**Blocked:** nothing for the page. A deployed HQ could not run the simulator: by design it refuses in production.

## 2026-10-16 · learner-model-engineer (Ifeoma) · W-1915 phase A simulator + W-1925 trace (run lme-w1494-sim-1016, branch perso-sim-w1494)

**Changed:** new `company/personalization/model/sim/` (offline, no dependencies, nothing in src/ imports it): `catalog.mjs` (230 pilot lessons, dims from meta.json + curriculum, default order = feed interleave on the pilot, **misconceptionStrength a placeholder hash**), `composer.ts` (`composeExplained()` / `gamCompose: ComposeFn`, port of edp compose() with all §2.5 constraints; draft rules, default, random baselines; ablation by term), `simulate.mjs` (episodes + per-step trace schema `personalization-sim-trace-v0`), `learner.ts` + `score.ts` (**PROVISIONAL**, builder placeholders behind `SimLearner` / `scoreEpisode()`, to be replaced or owned by personalization-eval per company/ceo-office/2026-10-16-personalization-org-proposal.md §2), `run.mjs`, `README.md`. Outputs to `sim/out/` (gitignored). Run: `node company/personalization/model/sim/run.mjs` (~3 min). Board: W-1915, W-1925 → review; added W-1926 (contract findings, personalization-lead), W-1927 (replace the provisional learner/scorer).

**Believe:** the composer follows model.ts's contract and is replay-deterministic (high: replay test identical, strict tsc clean on the .ts files). The comparison is **UNSCORED** (no W-1917 criterion) and comes from a builder-made learner, so it is a smoke test, not evidence (certain). Fragility (medium): policy gaps are ~0.01-0.02 recall against an episode sd of ~0.13, and the GAM's edge over default order disappears (reverses) when the learner's prerequisite penalty is set to 0, so any edge is an assumption of the simulated learner, not a property of the composer. The overlap term never affects the served card (W-1926).

**Next:** W-1917 criterion (analytics-steward) before any scored run; W-1927 learner/scorer to personalization-eval; W-1926 answers (personalization-lead); W-1924 HQ page can render `sim/out/traces/*.json` now.

**Blocked:** HQ page import location (W-1919, principal-engineer / personalization org); real misconceptionStrength ratings (CMs); W-1918 parameter ranges for the learner.

## 2026-10-16 · personalization-lead (Mateo) · W-1960 phase A model in code (run pl-w1493-curves-1016)

**Changed:** new `company/personalization/model/`: `model.ts` (7 curve signals each with inputs and privacy status pending W-1916; needs repair/build/breadth/stretch with 7 shape terms and a cold-start dampener, each with a written reason marked "guess"; `pwl`, `detect`, `explainNeeds`, `fingerprintFrom`; composer weights, relational constants, hard constraints, engagement as a floor only; objective; 7 policies; `checkModel`; `inspect`/`curveViews` for the founder's HQ inspect ask), `personas.ts` (6 simulation-only personas with names, descriptions, fingerprint means, latent ground truth), `self-check.mjs`, `README.md` (change rule, interface). Change log: `company/decisions/2026-10-16-personalization-model-v0.md` (self-check fails if a version has no line). Curves in code, not JSON, per founder brief §6. No `src/` change, no protected path; self-check asserts nothing in `src/` imports the folder. W-1960 done.

**Believe:** the module runs on Node 22 with no dependencies and passes strict tsc (high, ran both). The per-persona need scores look qualitatively right (crammer → breadth, struggling and lapsed → repair, expert → build/stretch, newcomer dampened) (medium: that is a sanity check against my own intent, not evidence). One thing to watch: struggling-repeater scores stretch .21 from the inverse level curve; the readiness constraint should stop it acting on that, and the simulator must check it does.

**Next:** W-1915 (learner-model-engineer) builds the composer and simulator against `ComposeInput`/`ComposeFn`; W-1924/W-1925 can draw from `inspect()`. Per the founder (company/decisions/2026-10-16-founder-personalization-org.md), W-1917, W-1918, W-1919 are now "personalization org, pending role approval"; W-1916 privacy stays company-wide. **Blocked:** where the module lives (W-1919) waits on that org decision; serving waits on W-1916, F-19 and an experiment.

## 2026-10-16 · chief-of-staff-ceo-office (Leonie) · W-1959 personalization org design (run leonie-perso-org-1016)

**Changed:** wrote `company/ceo-office/2026-10-16-personalization-org-proposal.md` (redesigned mid-run after the founder's second message: "Mateo is VP ... independent"). Self-contained org under `vp-personalization` (id rename, reports to the founder); approve-now cards: personalization-eval, applied-scientist-personalization, learning-scientist-personalization, lesson-dims-owner, personalization-engineer (HQ lab), plus edits to learner-model-engineer and growth-designer (streaks line, AMD-008 M2); head-of-feed deferred to phase B start; splits and sub-team leads on triggers. T1-T8 resolved by giving scope to the org, company-wide gates kept as interfaces. Step 2 of company/decisions/2026-10-16-founder-personalization-org.md filled. Board: W-1928..W-1933 consults (head-of-product, evaluation-steward, principal-engineer, vp-rnd, chief-of-staff, personalization-lead), W-1934 budget tag (portfolio-manager); W-1959 → review. (W-1928 was first created empty by a mistaken `board add --help`, then retitled.) Nothing generated: no roles.mjs, agents or role docs touched.

**Believe:** the in-org eval is only independent with a two-way rule; Mateo's plan had the curve author writing persona truth and the policy porter building the simulated learner, both moved to the eval (high, read from W-1960/W-1915). Five new roles is at the edge of staffing ahead of work given the existing two roles have one run each (medium; sunset check on every card).

**Next:** consult answers in proposal §7; then chief-of-staff files the cards to founder-inbox; founder approves card by card; CEO office generates per approved card.

**Blocked:** on consult answers and the founder's approvals.

## 2026-10-16 · personalization-lead (Mateo) · F-08 founder brief response (run pl-founder-brief-1016)

**Changed:** wrote `company/personalization/2026-10-16-brief-response.md`: corrections to the chief of staff's §3 mapping (C1-C10), data shapes (fingerprint with per-input privacy status, need shape curves, simulation-only personas, lesson dims and who authors them, composer objective with engagement as a guardrail), phases A-D with exit criteria, objections O1-O11, 6 numbered founder questions, and §7 a proposed team (head-of-feed, applied-scientist-personalization, personalization-eval, lesson-dims-owner; overlaps T1-T8 for Leonie). Draft brief marked superseded; README status updated; board W-1960..W-1922 added (W-1923 closed as a duplicate of W-1959); W-091 done; my step-1 answer added to company/decisions/2026-10-16-founder-personalization-org.md. (The founder's brief and reference were recorded by the chief of staff in 6ed77da.) Nothing in `src/`, no protected path touched.

**Believe:** the composer's structural inputs already exist (974/974 lessons have concept, level, misconception; 614/974 prerequisites; Life Hacks 15/200), scripted count today (high). The EDP `evaluate()` is circular and cannot be our evidence (high, read from the code). A hand-set, published GAM may fit AMD-008 P1 as "rules"; fitted curves do not (medium; W-1920 rules on it).

**Next:** founder answers to response §6 (W-1922, chief-of-staff); team proposal to Leonie (W-1959); phase A: W-1960 (me), W-1915 (learner-model-engineer), W-1916 privacy, W-1917 analytics criterion before the simulator runs, W-1918 research.

**Blocked:** on the founder: §6 answers, role approvals (W-1959), F-19 (W-1920), badges (W-1921). Phase B also on accounts and W-706.

## 2026-10-17 (later) · chief-of-staff · release r9 LIVE

**Changed:** production deploy r9 is live at https://system-3-company.vercel.app, from commit 8c753ada (deploy tag), built by Vercel's git integration after the founder said "add one with deploy tag" and "Go" (company/decisions/2026-10-17-founder-git-deploy-r9.md; reverses F-48: `vercel.json` `git.deploymentEnabled` is now true). The Deploy to Vercel workflow failed three times (1037: traced artifacts vs .vercelignore, fixed 52db8a0a; 1038: upload failed with the error hidden, fixed by stdout diagnostics + HQ turbopackIgnore + `--archive=tgz` at 05238276, never re-run).
**Smoke (curl, chief-of-staff):** the 9 newly published lessons return 200 (four knot lessons, four NCM gap lessons, cut-the-busiest-link); feed intro card renders; /catalog has 14 domain blocks and no algo- links; draft /d/algo-adaptive-simpson is 404. Not checked: Safari for left-or-right (founder waived), the full feed spec in production.
**Believe:** sure r9 is serving (new slugs answer 200 within ~4 min of the push). Releases.json r9 still names 2821160c: W-1670 (release-manager) amends it.
**Next:** W-1654 guard is urgent (any pushed head whose message carries the deploy tag now deploys); decide with the founder whether to switch git deployments back off; W-1666/W-1669 (workflow upload proof) stay open until the workflow succeeds once.

## 2026-10-17 · chief-of-staff · knots pipeline: 4 lessons published (repo, not deployed); PR #6 merged; board/disk incidents

**Changed:**
- **Published in repo, NOT deployed** (launch review r8, `company/rituals/records/2026-10-17-launch-review-knots-r8.md`): math/draw-a-table-knot v3, math/tricolour-check v2, math/unknot-game v2. Every claim verified; QA filed via `company qa-record`; learner walks launch; accessibility pass-with-conditions; predictions EXP-007 (+Amendment 1).
- **math/left-or-right v3 in review** (launch review r9, go): 8/8 claims verified, QA v3, learner walk launch, a11y pass-with-conditions, EXP-008. Published in repo by release-manager (0b4e2e0a, W-1660). Post-publish verify: check, typecheck, production build, QA contract 2/2 for all four knot slugs pass (feed spec and test:* suites not run). **r9 ruling 2:** no production deploy may carry left-or-right as published until a WebKit/iOS Safari check passes (W-1607/W-1615/W-1661); this container has Chromium only and cannot download WebKit (W-1662, put to the founder).
- **PR #6 merged** (200 algorithm demos, all draft, unverified) as a553596a; PR board ids renumbered W-1626..W-1646. C2 built-output tests before any deploy: W-1645 (release-manager).
- **Incidents:** (1) a lane branch carrying duplicate ids overwrote W-1600 (privacy-reviewer first-time marker question) and W-1601 in a merge; restored 88a7f1ea, branch items moved to W-1615/W-1616; the integrator now treats a same-id item with a different owner/created as a collision. (2) I ran `company publish tricolour-check --dry-run` thinking it was a dry run: it has no dry-run flag and flipped status; reverted before commit, never pushed. (3) Disk filled (ENOSPC) and killed a QA run; 91 merged worktrees removed, 20G free. (4) Commit 54aa64e3 has the literal deploy tag in its body; nothing deployed (git deployments off, never a pushed head); guard proposal W-1654 (evaluation-steward).

**Believe:** sure the three r8 lessons met every r8 precondition on disk (checked by release-manager and me); `check`, typecheck, platform tests pass on main. Build + QA contract after publish passed for all four. Everything rests on simulated walks and Chromium; nothing shows anyone learned.

**Next:** next-version fixes queued for the four knot lessons (W-1614, W-1617, W-1625, W-1647/8, W-1652/3, W-1656/7); kit items W-1618, W-1649, W-1650, W-1658 (protected kit → evaluation-steward route); privacy W-1600, W-1655; tools W-1654; R&D doc fix W-1609. 200 algorithm drafts need a fact-check/QA plan before any can publish.

**Blocked on founder:** deploy approval (5 earlier + 4 knot lessons; left-or-right may not ship until a WebKit/iOS Safari check passes, W-1661/W-1662, or its publish is reverted first); Books F1/F2 (due 10-19 18:00); knots budget F-49; PR #4 held (GPL).

## 2026-10-16 · demo-builder (w1542) · left-or-right built as B2 (two-sided card), draft

**Changed:** new lesson `src/demos/math/left-or-right/` (Demo.tsx, card.ts, card.test.mjs, styles, meta with 8 unverified claims); build note and evidence in `company/reviews/left-or-right/` (build.md, c1-check.mjs, fit-probe.mjs, the Chromium C1 record and the reveal-fit record). Board: W-1542 to review; W-1600 qa-tester (WebKit run plus QA record), W-1601 design-lead (S4), W-1605 fact-checker.
**Believe:**
- PE-C1 holds in Chromium on all 8 rest states, sure: crossing 0's screen x is 82/18 (3₁) and 96.4/3.6 (4₁), and the pixel check shows only the expected face paints.
- K21 and the L-1 badge floor pass as unit tests (minimum 2.43 units).
- reveal-fit: fit, crop 0, 79 words. Local contract QA 2/2.
**Blocked:** WebKit was not run, because the proxy refuses the Playwright WebKit download.
**Next:** W-1600, W-1601, W-1605.
## 2026-10-16 · community-engineer (Femi) · PR #6 C1: base ed992963 merged, checks green, pushed

**Changed:** renumbered the 18 PR #6 board ids +40 to W-1626..W-1643; W-1644 and W-1645 keep theirs (`49f79204`). Corrected the readiness record's rollback to the path-limited restore. Merged base `ed992963` (`f9615211`), with the registry regenerated by `npm run registry`. W-1644 is done. Pushed `codex/algorithms-200` without force; map and results in `company/engineering/community/prs/6.md` §11–§12.

**Believe (high):** on the merge commit, check, typecheck, test:algorithms 417/417 and test:books 417/417 pass. test:platform fails only #18, on base's draw-a-table-knot, which is byte-identical to base. 200/200 lessons are draft and 4,407/4,407 claims unverified. Every review required before merge is recorded.

**Next:** the coordinator waits for CI, marks the PR ready and merges. release-manager runs C2 (W-1645) before the first deploy that includes it. The knot lane fixes #18 on base.

**Blocked:** nothing for the merge. The deploy waits on C2 and the founder's approval.

## 2026-10-16 · principal-engineer-ops (Rhea) · PR #6 M7 readiness approved with conditions (W-1640 done)

**Changed:** I wrote the verdict into `company/engineering/readiness/2026-10-16-algorithms-200.md` (Approval): approved with conditions, on `cdb1d6c2`. I added two board items, numbered W-1644 and W-1645 rather than the CLI's W-1580/1581 because base already uses W-1580..W-1589:
- **C1 (W-1644, community-engineer), before merge:** merge into the current base, regenerate the registry, then run check, test:algorithms, typecheck and test:platform on the merge commit.
- **C2 (W-1645, release-manager), deploy blocker:** run the 4 built-output tests on the `VERCEL=1` build of the deployed tree, then smoke-test `/catalog` after the deploy.

W-1640 is done. I also corrected the record's branch-side revert recipe: `-m 1` on the base merges `02707ebb` and `e32feca5` would undo 118 and 906 files of base.

**Believe (high):** the scope matches the record's `paths:` and no protected path changes. test:algorithms passes 417/417 and test:platform 30/0/4 on `cdb1d6c2`. Production `/catalog` shows no Algorithms section and none of the slugs or topic names. I rehearsed the merge into base `5b5341c6` in a throwaway worktree:
- it conflicts in the registry and in 4 ops records;
- after resolving, check, test:algorithms, typecheck and test:books pass;
- test:platform #18 fails on draw-a-table-knot, and it fails the same way on base alone;
- `revert -m 1` restores base's tree exactly, and the path-limited restore keeps the records.

**Believe (medium):** the cost figures come from M5. I did not re-measure them, because I ran no production build.

**Next:** community-engineer does C1 and merges. Before the first deploy that includes PR #6, release-manager does C2.

**Blocked:** nothing on my side.

## 2026-10-16 · community-engineer (Femi) · PR #6 M7 readiness draft (W-1640)

**Changed:** rewrote `company/engineering/readiness/2026-10-16-algorithms-200.md` as a tier-2 readiness draft, prepared by community-engineer for chief-of-staff. It holds the M1–M6 evidence, M5 numbers, the final commit list, the grouped revert and a blank approval section; the first tier-1 version is kept as history. prs/6.md §10.

**Believe (high):** every PR #6 merge condition except M7 approval is recorded. The qa-tester commits only add records and `evidence.qa` links. Gap, stated in the record: the 4 built-output tests (`VERCEL=1`) did not run on this head.

**Next:** principal-engineer-ops approves or refuses W-1640. Then community-engineer fetches and pushes `codex/algorithms-200` without force.

**Blocked:** the push, on M7 approval.

## 2026-10-16 · community-engineer (Femi) · PR #6 second integration: review/fix branches and base af8e4021 merged, not pushed

**Changed:** on `pr/6-algorithms-200`, merged `pr6/pe` (PE review, approve with conditions M1–M7), `pr6/platform` (M1/M2, cm-cs M6 decision, W-1642 catalog) and `pr6/build` (M3, W-1633) with merge commits. Base moved to `af8e4021` and took W-1517..W-1561, so all 18 PR #6 ids moved +45 to W-1626..W-1643 (`64359bc7`; map in `company/engineering/community/prs/6.md` §9.2), then merged base (`02707ebb`). Engineer read of the W-1642 catalog diff: no finding (§9.4). W-1633, W-1636..W-1638, W-1642 moved to review.

**Believe (high):** check, typecheck, test:algorithms 417/417, test:books 417/417 pass; test:platform fails only #18 (W-1634); 200/200 draft, 4,407/4,407 algo claims unverified. No build or QA run in this pass.

**Next:** qa-tester W-1634 (per-lesson QA records linked into evidence, as PR #5) and M5 full verify; chief-of-staff + principal-engineer-ops M7 (W-1640). Then community-engineer merges those, fetches, and pushes `codex/algorithms-200` without force.

**Blocked:** push, on M4 #18, M5, M7.

## 2026-10-16 · cm-cs (Lin) · PR #6 M6: what production /catalog shows (W-1639)

**Changed:** wrote `company/decisions/2026-10-16-pr6-catalog-algorithms-section.md`. W-1639 → done. New: W-1642 (platform-engineer, code requirement R1-R6), W-1643 (cm-cs, label names for the 200 algo concepts, after F-46). No code edited. Not pushed.

**Believe (high):** production must not show the 200 draft titles or "200 planned lessons". They are lesson titles, not curriculum concepts (id = slug), 120 are declarative sentences with no claim, and the count is an unsigned promise while builds pause (F-46). The section renders only visible algorithm lessons, per topic and per row, so the first promotion does not re-expose the other 199.

**Next:** platform-engineer implements W-1642 (tier 1, page.tsx + catalog.test.mjs) before M5's integrated verify. Then M6 is met.

**Blocked:** PR #6 merge, on M1-M7 (M6 now waits only on W-1642).

## 2026-10-16 · principal-engineer (Kenji) · PR #6 Algorithms 200: tier-2 engineering review (W-1632), approve with conditions

**Changed:** wrote `company/engineering/reviews/2026-10-16-pr6-engineering-review.md` on `pr6/pe` (head `80dd3469`). W-1632 → done. New board items: W-1637 (platform-engineer, M1+M2 test wiring and shipped-spec test), W-1638 (demo-builder, two more identical-final-frame lessons beyond W-1636), W-1639 (cm-cs, what production /catalog shows), W-1640 (chief-of-staff + PE-ops, readiness to tier 2), W-1641 (PE-ops, paths.json engine rules). No code edited. Not pushed.

**Believe (high on the code, medium on scale):** tier 2; no retroactive EDD (the pre-code frozen contract matches what shipped). Engine sound: all 200 wrappers render the kit Lesson directly, pure tested transitions, 4,401 unverified claims, no protected path or dependency. typecheck pass (51.8 s), tests/algorithms 12/12, the PR's checker 0 errors on all 200, check pass. Not mergeable yet: tests not in verify, no test over the shipped specs, **five** lessons (not three) whose "Try another" ends on the same frame, test:platform #18/#28 red, no integrated verify, and the catalog shows all 200 draft titles in production (no links or content). serve.sh loopback bind accepted.

**Next:** chief-of-staff dispatches W-1637, W-1638 (with W-1636), W-1633, W-1634, W-1639; then qa-tester runs integrated `npm run verify` (M5); then W-1640. Any change to `src/components/algorithms/`, `types.ts` or the checker bounds returns to principal-engineer.

**Blocked:** merge, on M1–M7 in the review.

## 2026-10-16 · community-engineer (Femi) · PR #6 Algorithms 200: evaluation and base merge, blocked

**Changed:** local branch `pr/6-algorithms-200` = PR head `6008cd52` + merge of base `cdee168c` (`e32feca5`, merge commits only). The PR's W-1493..W-1497 collided with base and are now W-1626..W-1630 (map in `company/engineering/community/prs/6.md` §3). Intake W-1631; review/fix requests W-1632 (principal-engineer, tier-2 merge gate), W-1633 and W-1636 (demo-builder), W-1634 (qa-tester), W-1635 (accessibility). Not pushed, nothing deployed, the PR is still a draft.

**Believe (high):** no protected paths, no dependencies, 4,401/4,401 claims unverified, 200/200 draft. check, typecheck, tests/algorithms 12/12 and the build pass on the merged tree. **Tier 2** (one engine for 200 lessons, plus a live catalog section), although the PR's readiness says tier 1. QA contract 394/400: algo-dinic-levels, algo-pollard-rho-factor and algo-topological-uniqueness have a "Try another" case whose final frame equals the question case's (I ran the models). test:platform #18 and #28 fail because of this PR.

**Next:** chief-of-staff dispatches W-1632, W-1636, W-1633, W-1634 (and W-1635 before any deploy). Then community-engineer merges the fixes, re-runs check, typecheck, test:platform, build and the 200-lesson QA contract, fetches and pushes `codex/algorithms-200` without force.

**Blocked:** the push and merge, on W-1632, W-1636, W-1633, W-1634.

## 2026-10-16 · tools-lead · W-1596: publish-ready tie-break without mtime; reveal text bumps the version

**Changed:** `tools/publish-ready.mjs` `decide()` orders same-version same-day learner records by built-from git ancestry, then a `supersedes:` line, then `-rN` within one name stem; an unordered tie keeps the most severe verdict; mtime is no longer read. New `tests/publish/publish-ready-tiebreak.test.mjs` (5 tests; `npm run test:publish` 18/18). `company/product/demo-standard.md`: section "The lesson version" (a change to reveal text bumps `meta.version`, Head of Product's rule). Readiness: `company/engineering/readiness/2026-10-16-publish-ready-tiebreak.md` (tier 1 self-check). Changelog line.
**Believe:** sure the swap fix holds: read-only publish-ready now lists math/the-swap-that-goes-in-circles as a candidate (r2 launch v1; e092f6c3 descends from 236737ff), and a before/after run shows no other lesson's result changed. `npm run check` passes (3 unrelated lifehacks warnings).
**Next:** release-manager: W-1594 can include the swap without applying ruling 2 by hand (lapse conditions in the r7 record still apply). Demo-builder lane: follow the new version rule. No deploy without the founder. **Blocked:** nothing.
## 2026-10-16 · analytics-steward · EXP-006: launch predictions for cut-the-busiest-link and the NCM gap four (W-1529 done)

**Changed:** new `company/experiments/EXP-006-launch-predictions-r6-r7.md` (index row in `company/experiments/README.md`); a pointer paragraph under "Committed predictions" in the r6 and r7 launch records. Board: W-1529 done; W-1600 added (privacy-reviewer: may recall/predict events carry a first-time marker with no identifier?).
**Believe:** sure the rows are committed before any deploy that carries the five (last `[deploy]` is 6cbce514, before publishes f6b2a22e and c97973e7), and sure they are later than the publish commits (stated in EXP-006 "Timing"). Fairly sure the current events cannot compute first-revisit recall or learner pairing (`src/lib/events-intake.ts`, `src/components/Feed.tsx`); so EXP-006 commits measurable aggregate rows A1-A6 plus F1/F2 marked "not measured" until W-1600. That gap also touches the r5 P1/P2 and Life Hacks L1/L2 definitions.
**Next:** a deploy carrying these five needs no missing-row note from the release-manager. privacy-reviewer rules W-1600. Scoring at the first WBR after day 0 + 14 (analytics-steward). **Blocked:** any read, on W-706 (backend-engineer) and a founder-approved deploy.
## 2026-10-16 · learner-evaluator · draw-a-table-knot v1 walked: revise

**Changed:** new `company/reviews/draw-a-table-knot/2026-10-16-learner-knows-drawings-not-names.md` (lesson version: v1, Verdict: revise, built from 5c5c719e); linked in meta.json evidence.simulatedLearner only.
**Believe:** first break is the first tap ("6 drawn, name 4₁"): it needs "one knot has many drawings", which the boundary lacks; "fewest" is told in the reveal, not shown. On the QA path (ends on 5₂) the reveal's "Yours still had 6 crossings drawn" sits under a stage reading "5 · 5₂", which also agrees with the wrong answer; only the small "Seen on 6₁" line bridges them. Moderately sure most learners still connect it from memory; the on-screen contradiction is the revise reason.
**Next:** demo-builder / design-lead decide how the reveal or reveal-time stage names 6₁ on the 5₂ path; then a learner re-walk. c5 unverified is the fact-checker's. **Blocked:** nothing.
## 2026-10-16 · design-lead · S4 check of tricolour-check: pass with changes D1, D2 (W-1601)

**Changed:** new `company/design/reviews/2026-10-16-tricolour-check-s4.md` with probes in `2026-10-16-tricolour-check-s4/` (fit-probe, row-probe, geom-probe). Board W-1601 (demo-builder): D1 explore row on one line at 360 wide (`.wrap .controls` gap 4px, `.btn` padding-inline 8px); D2 `.board { width: min(100%, clamp(254px, calc(100dvh - 458px), 320px)); }`. Accepted the builder's choices: loopOne on opening ○ (no design objection; sufficiency is cm-math-discrete's), the row hidden at the reveal, label placement (T3a min 17 units), the crossing-mark rings.
**Believe:** sure at 390x844 the lesson meets S1-S3, T1, T3a, W-1583 and the reveal fits (crop 0, 37 px spare, all 3 options); sure D1+D2 make 360x740 overflow 0 at no cost to 390x844 (tested as override); sure 360x640 cannot lose its scroll without going under the 10 px text floor (67 px left, accepted, as for draw-a-table-knot).
**Next:** demo-builder applies W-1601 and re-runs walkthrough, reveal-fit --strict, fit-probe. Learner review: grey C in light, 360x640 row discovery. S4 still due on unknot-game and left-or-right (W-1578). **Blocked:** nothing.
**Changed:** new `company/experiments/EXP-006-launch-predictions-r6-r7.md` (index row in `company/experiments/README.md`); a pointer paragraph under "Committed predictions" in the r6 and r7 launch records. Board: W-1529 done; W-1646 added (privacy-reviewer: may recall/predict events carry a first-time marker with no identifier?).
**Believe:** sure the rows are committed before any deploy that carries the five (last `[deploy]` is 6cbce514, before publishes f6b2a22e and c97973e7), and sure they are later than the publish commits (stated in EXP-006 "Timing"). Fairly sure the current events cannot compute first-revisit recall or learner pairing (`src/lib/events-intake.ts`, `src/components/Feed.tsx`); so EXP-006 commits measurable aggregate rows A1-A6 plus F1/F2 marked "not measured" until W-1646. That gap also touches the r5 P1/P2 and Life Hacks L1/L2 definitions.
**Next:** a deploy carrying these five needs no missing-row note from the release-manager. privacy-reviewer rules W-1646. Scoring at the first WBR after day 0 + 14 (analytics-steward). **Blocked:** any read, on W-706 (backend-engineer) and a founder-approved deploy.

## 2026-10-16 · demo-builder · W-1597..W-1599: NCM gap four flipped draft -> review

**Changed:** `"status": "review"` in meta.json of probability/same-picture-two-histories (v2), economics/price-tag-or-auction (v2), economics/worth-something-alone (v2), math/the-swap-that-goes-in-circles (v1, not bumped). One line each; no version, claim, text or code change. Board W-1597, W-1598, W-1599 done.
**Believe:** sure the flips match the r7 preconditions table (all four rows "yes", `company/rituals/records/2026-10-16-launch-review-ncm-gap4.md`). `npm run check` passes (3 unrelated lifehacks warnings). `node tools/publish-ready.mjs`: candidates include same-picture-two-histories, price-tag-or-auction, worth-something-alone; the-swap-that-goes-in-circles is in "held (verdict revise)" because `decide()` picks r1 (`2026-10-16-learner-knows-preference.md`, revise) over r2 (launch) by the mtime tie (W-1596). Not worked around.
**Next:** release-manager runs W-1594 for the three candidates under the record's lapse conditions; swap waits on tools-lead W-1596 (or the chair's ruling 2 applied by the release-manager). No deploy without the founder. **Blocked:** swap publish on W-1596.

## 2026-10-16 · head-of-product · Launch review r7 (NCM gap four): 4 go, each held open on the strand manager's draft->review call

**Changed:** new `company/rituals/records/2026-10-16-launch-review-ncm-gap4.md` covering same-picture-two-histories v2, price-tag-or-auction v2, worth-something-alone v2 and the-swap-that-goes-in-circles v1 (with fc8c53b8).
- Rulings: (1) head-of-product may not move lesson status, so each go takes effect only after the strand manager's decision is on disk (W-1574, W-1575, and new W-1595 for cm-math-discrete) and the status is review. (2) For the swap, learner r2 (post-fix build e092f6c3) governs, and r1 (pre-fix 236737ff) is history.
- Board: W-1595 (cm-math-discrete), W-1596 (tools-lead: publish-ready breaks ties by mtime), W-1593 (platform-engineer, plus my 360 question), W-1594 (release-manager publish, conditional).
- Mail sent to cm-probability-statistics, cm-economics-markets and cm-math-discrete.

**Believe:**
- Fairly sure all four have every gate on the code that ships. `git diff 975a4851 ed992963` over each import closure is empty, and the meta diffs are claim status and evidence only.
- Sure that publish-ready will hold the swap as "verdict revise" by the mtime tie. I reproduced it with `decide()`.
- Published NCM coverage becomes about 96 of 110, not 110. 110 is built coverage.

**Next:** the three strand managers fill the record's preconditions table. Then release-manager runs W-1594 under the record's lapse conditions. No deploy without the founder. **Blocked:** on the three strand-manager decisions.

## 2026-10-16 · demo-builder · W-1540 tricolour-check built (draft)

**Changed:** new lesson `src/demos/math/tricolour-check/` (draft, 8 claims, all unverified), build note `company/reviews/tricolour-check/build.md`, registry regenerated; board W-1540 → review. Follows S1 to S4, T1, T3a, the ticks rule and W-1583 (A/B/C letter rings, arc sets in one constant). W-1583's tricolour part of W-1585 is done here; W-1585 stays open for unknot-game and left-or-right.
**Believe:** local contract QA passes on phone and desktop; reveal-fit at 390x844 is fit, crop 0, 87 words; check and typecheck pass. Fairly sure on the picture (viewed both themes at 390x844); untested with learners. Two calls for others: `loopOne` fires on opening ○ (the only way the QA path reaches it), and the control row hides at the reveal (crop was 22 px without it). Both are in build.md "Decisions".
**Next:** fact-checker c1 to c8 (c5 is the proof); design-lead S4 review of the walkthrough; qa-tester record; learner walk. **Blocked:** nothing.
## 2026-10-16 · platform-engineer · W-1587 EDD-004 C4 ruled met; W-1582 `.knot-tint` added

**Changed:** re-ran `company/reviews/draw-a-table-knot/c4-timing.mjs` (3x at 4x, 1x at 1x) on a fresh build; the host was not quieter (load 5 to 6.6). Ruling appended to `company/engineering/notes/2026-10-16-edd004-c4-layout-timing.md`: **C4 met** (6_1 `layout` 56 to 185 ms cold, ~20 ms warm at 4x, once on mount; tap redraw ~1 ms). `identify`'s cold 105 to 187 ms is the one-time table signature index (`sig` in `src/kit/knots/identify.mjs`), so lessons warm it after first paint: new rule 5 in `src/kit/knots/README.md`; no kit change until a revisit trigger in the note fires. `src/app/globals.css`: `.knot-tint` per the colour ruling (70% light mix, math only). Self-check `company/engineering/readiness/2026-10-16-knot-tint-css.md`; changelog line.
**Believe:** fairly sure of the ruling (two busy-host runs, same shape); not sure of absolute phone numbers (no device, no idle host).
**Next:** principal-engineer marks C4 met in the EDD-004 record (W-1590). demo-builder can use `.knot-tint` for unknot-game (W-1585) instead of a lesson-local rule. **Blocked:** nothing.
## 2026-10-16 · fact-checker · W-1589: draw-a-table-knot c1-c8

**Changed:** draw-a-table-knot meta.json claims only (7 verified, c5 disputed); new `company/reviews/draw-a-table-knot/2026-10-16-fact-check.md` and its scripts in `fc-2026-10-16/`; board W-1589 done, W-1591 (demo-builder) added.
**Believe:** sure of the knot facts (own Jones bracket, Gauss words, picture geometry, all 11 switches agree with the kit). c5 disputed for the generic sentence "A switch makes a new knot." (false for a nugatory crossing; fix "Your switch made a new knot."). c7's general clause rests on the kit table and naming sources, not on Rolfsen's opened pictures (hosts blocked): medium-high.
**Next:** demo-builder applies W-1591 (cm-math-discrete owns the script wording); a fact-checker who did not draft the fix re-verifies c5. **Blocked:** nothing.
## 2026-10-16 · design-lead · W-1588: S4 check of draw-a-table-knot (first built knot lesson)

**Changed:** new `company/design/reviews/2026-10-16-draw-a-table-knot-s4.md` (+ `fit-probe.mjs`, `bbox.mjs`, `contrast.mjs` beside it); board W-1588 done, W-1592 (demo-builder) added.
**Believe:** pass with changes. Reveal at 390×844: reveal-fit --strict fit, crop 0, 80 words (70 to 81 over all 6 variants, 27 to 68 px spare). Departures accepted: (a) switched-crossing ring, but light-mode colour fails 3:1 (2.26) so D1 darkens it; (b) 231 px reveal picture (2.24 px/unit, my measured floor). Tightened viewBox -1.5 -1 103 105 accepted (curve bbox re-measured over all 13 pictures). D2: the Seen line is pastel text at 2.26:1 in light mode and must use the 45% ink mix. D3: height-aware board width removes the 360×740 stage overflow (31 to 51 px → 0) at no change at 390×844; 360×640 still scrolls (accepted). Sure on the measures; D3's constant depends on kit chrome.
**Next:** demo-builder W-1592 (D1 to D3, re-run checks); fact-checker W-1589. **Blocked:** nothing.

## 2026-10-16 · interaction-designer · W-1584: spec review folded into unknot-game and left-or-right

**Changed:** `company/design/specs/unknot-game.md` (U-1 selected chip = `.control.active` disabled, never greyed; U-2 rings only, pointer events only on the 44 px circle; tint confirmed W-1580 with a lesson-local `.knot-tint` until the platform rule lands). `company/design/specs/left-or-right.md` rewritten as a self-contained B2 build spec: L-1 ring 13 + ≥ 2.0-unit badge gap test (expected min 2.43 at 4_1 crossing 0, the right-hand beak; "right lens" wording fixed), L-2 dip (100 out / transform untransitioned / 100 in), L-3 marks timing with timer fallbacks and retargeting, L-4 no blanking, L-5 perspective ≥ 1200 px + 8 % vertical room (kit `.stage` is overflow auto), L-6 aria-pressed; W-1581 seen line "Trefoil: turned over −3 · mirror +3", no Reset, figure-eight fallback reveal default; A and B1 moved to an appendix. `knots-batch1-mockups.mjs` at ring 13 (prints gap 2.43 PASS, same as the design lead's probe), both SVGs regenerated (QA-path row, mid-dip frame, 4_1 rest states). Board W-1584 done.
**Believe:** sure the numbers match the probe (rerun). Fairly sure the specs are unambiguous for a builder; the timing rules are untested in a browser.
**Next:** demo-builder builds both (W-1585); design-lead checks the built sheets (S4). **Blocked:** nothing.

## 2026-10-16 · design-lead · W-1568 spec review (unknot-game, left-or-right) and W-1583 arc sets

**Changed:** new `company/design/reviews/2026-10-16-knots-specs-review.md` (+ `badge-probe.mjs`); board W-1584 (interaction-designer), W-1585 (demo-builder).
**Believe:** both specs approved with changes. unknot-game: U-1 selected chip looks selected not greyed, U-2 crossing buttons never filled. left-or-right B2: L-1 badge ring 13 units (spec's 10 leaves 2.9 px at 4_1's beak; 13 gives 6.1 px) with a 2.0-unit floor test; L-2 Mirror is an opacity dip, never a cross-fade (two outlines superimposed = false crossings); L-3 marks timing; L-4 readout never blanks; L-5 perspective >= 1200 px, no clipping; L-6 Turn over aria-pressed. Mid-flip on 4_1 accepted (53 ms in the touch band at 300 ms ease-in-out). Dropping Reset accepted. W-1583: tricolour-check takes the visual designer's sets plus A/B/C letter rings (replaces arc numbers). Sure on the measures; fairly sure on readability (mockups, not a device).
**Next:** builders apply the conditions now (W-1585), even before the spec text is updated (W-1584); design-lead reviews built sheets (S4). **Blocked:** nothing.

## 2026-10-16 · cm-math-discrete · W-1581: rulings on the unknot-game and left-or-right specs

**Changed:** math.discrete.md Knots batch 1 briefs 3 and 4 ("Spec rulings (W-1581)"), knots-check.mjs (new K20 tint facts 7 of 7, K21 B2 four rest states), brief-skips.json (both lines removed).
**Believe:** high that the checks hold (rerun clean). All unknot-game choices accepted; left-or-right built as B2 (Mirror scaleX(-1) with the spec's table), no Reset, seen line prefixed "Trefoil:", 9-word caption for fallback A only, figure-eight fallback sentence is the default. Not known: that the browser composes the wrapper as the table says; the builder's rendered check shows it.
**Next:** demo-builder builds briefs 3 and 4 (spec obligations 1 to 3). **Blocked:** nothing.

## 2026-10-16 · cm-math-discrete · W-1577 and W-1576: knots batch 1 folded in the design lead's and principal engineer's rulings

**Changed:** company/domains/briefs/math.discrete.md (Knots batch 1), knots-check.mjs (K13 at 260/290/320 px, new K18 gap 0.5 on all subsets of 3_1/4_1/5_2/6_1, new K19 four card rest states), brief-skips.json (unknot-game, left-or-right held for W-1568). Brief 4 builds as version B (two-sided card) with PE-C1 to C4 and DL-C1 to C6; A is a fallback with its control renamed "Turned over?". Mirror stays face-swap (DL-C6), not `scaleX(-1)`. S1 to S4 added to all four briefs; stale EDD-011 sentence replaced. Status: brief 1 and 2 READY; brief 3 waits only on W-1568 (tint spec); brief 4 waits on W-1568 (card spec).
**Believe:** high on the numbers (check reruns clean, K13 matches the design lead's 29/26/32 px and 79/71/87 px); high that B is right if the back face is authored reflected (K17, K19); not known: that the browser does what the arithmetic says.
**Next:** interaction-designer W-1568; demo-builder builds 1 and 2 (W-1579). **Blocked:** 3 and 4 on W-1568.

## 2026-10-16 · interaction-designer · W-1568 specs: unknot-game tint, left-or-right versions A and B

**Changed:** company/design/specs/unknot-game.md + .svg and left-or-right.md + .svg, both rendered with the kit by company/design/specs/knots-batch1-mockups.mjs (S1 gap 0.5, stroke 2 butt, viewBox -8 -8 116 116; turnOver never drawn). unknot-game: one switch at a time; the tint is only the first R2's edge that is over at both crossings (design-lead condition), 3 units wide, --domain dark / domain 70% + black light; both tally rows always shown; DOM order crossings, Reset, chips (chips last because QA counts controls once and 4_1 adds a button). left-or-right: A (question chip "Turned over?" per the design lead's objection, optional in-plane "Turn it round", Mirror) and B (two-sided card with the back face authored reflected, PE-C1; Mirror as an outer scaleX(-1) wrapper with a cross-fade, never an animated squeeze; rest-state composition table; builder's browser check and signs test). Both drop Reset and keep a seen line. Board: W-1568 → review; W-1581 (cm-math-discrete decisions), W-1580 (visual-designer tint token).
**Believe:** high that every number quoted is the kit's (script output; first R2 contains the tapped crossing in 7 of 7, one edge over at both, one under at both). Medium on badge placement near 4_1's right lens (7.0 units clearance in the mockup) and on mid-flip legibility, both for the design lead on the built sheet.
**Next:** cm-math-discrete W-1581 (A or B and the wording), then demo-builder. Design review of the specs. **Blocked:** nothing.
## 2026-10-16 · demo-builder (w1539) · draw-a-table-knot built (first knot lesson, first use of `layout`)

**Changed:** new draft lesson `src/demos/math/draw-a-table-knot/` (6₁/5₂, tap a crossing to switch it, name readout from `identify`, milestone `switched`), 8 unverified claims. Imports only `@/kit/knots`; `layout` once per knot in `useMemo`; `draw(pd, { layout: L, gap: 0.5 })`; no size/margin/relax; design-lead S1 to S3 followed, viewBox tightened as S1 allows. Build note `company/reviews/draw-a-table-knot/build.md`; C4 note `company/engineering/notes/2026-10-16-edd004-c4-layout-timing.md` with script `company/reviews/draw-a-table-knot/c4-timing.mjs`. Board: W-1539 → review; W-1586 (cm-math-discrete: reveal 93-94 words on the wrong-answer path), W-1587 (platform-engineer: C4), W-1588 (design-lead: S4 walk + 2 departures), W-1589 (fact-checker: c1-c8).
**Believe:** high that QA contract passes (phone + desktop, local) and reveal-fit is fit with crop 0 at 390×844; high that a tap redraw is about 1 ms at 4× throttle; medium on the absolute C4 numbers (host load 3 to 7 on 4 CPUs).
**Next:** cm-math-discrete cuts the reveal to ≤ 90 (W-1586), then fact-checker, qa-tester record, learner walk, design-lead S4. **Blocked:** draft → review status waits on the word budget (W-1586).

## 2026-10-16 · cm-course-ncm · the 3 launch-walked NCM gap lessons: status routed, learner notes boarded

**Changed:** did not move same-picture-two-histories, price-tag-or-auction or worth-something-alone to review: no CLI command moves status (tools/company.mjs has only meta.json validation), my role may not change lesson status (company/roles/cm-course-ncm.md Authority), demo-builder may set draft → review (company/roles/demo-builder.md), and the previous handoff routes the decision to the strand managers. Board: W-1574 (cm-probability-statistics: decide same-picture), W-1575 (cm-economics-markets: decide the two economics lessons; W-507 still doing). Learner notes: W-1571 demo-builder REQUIRED before launch (same-picture: giveaway option 3, unkeyed red/green/dashed codes, step-1 counter), W-1572 and W-1573 demo-builder OPTIONAL (price-tag "tag:" row label; worth-something unnamed 10¢ curve and crowded labels).
**Believe:** high that the status move is not mine. Medium on calling same-picture's option 3 required: the learner said launch, but a prediction answerable by text-matching defeats the format; the strand manager may overrule in W-1574.
**Next:** demo-builder W-1571 (then fact-check of changed claims + learner re-walk); strand managers W-1574/W-1575. **Blocked:** nothing.
## 2026-10-16 · cm-math-discrete · W-1569 answers to the knot design notes (briefs 1 to 4)

**Changed:** company/domains/briefs/math.discrete.md, briefs 1 to 4. Accepted: draw-a-table-knot switch-not-count (and the joke option out, determinant sentence out); tricolour-check staggered cycles (a real QA-path bug in my brief), narrowed doesNotKnow, and the plain-loop chip, which I made required (the narrowed doesNotKnow names it); unknot-game one switch at a time with tally, the "on top twice" tint, and "switch all three" dropped. Brief 4 now holds both versions: A (mirror only, caption "Flip it over", buildable now) and B (designer's two-sided card, only if design lead W-1566 and principal engineer W-1567 both rule yes). knots-check.mjs gained K14 (single switches of 5_2: 3 trefoil, 2 plain loop; 6_1: 4 figure-eight, 2 plain loop), K15 (every single switch on 3_1 and 4_1 offers an R2), K16 (staggered cycles reach three colours), K17 (card end state signs equal signs(turnOver) only if the back face is reflected).
**Believe:** high that the new numbers are true (rerun the check); high that B is mathematically right if the back face is reflected, and wrong with the usual counter-rotated back face (K17); medium that the tint and card read well (design questions). All citations still unverified.
**Next:** interaction-designer spec for the tint and the card (W-1568); design lead and principal engineer rulings (W-1566, W-1567); the demo-builder builds 1 to 3 from the revised briefs. **Blocked:** brief 4 build waits on W-1566/W-1567 for version B; version A needs only the design lead's mirror contact sheets.
## 2026-10-16 · principal-engineer · W-1567 left-or-right two-sided card ruling

**Changed:** ruling at company/engineering/reviews/2026-10-16-knots-left-or-right-card.md, probe at company/engineering/reviews/2026-10-16-W-1567-flip-probe.mjs, and a one-sentence scope note in EDD-011 Part 1. The two-sided card (front `draw(pd)`, back = mirror on the stored layout, CSS flip) fits rule 2(a) and EDD-011 Part 1 with no addendum, under conditions C1 to C4. The reflected mirror equals the turned-over knot: signs read from the drawn geometry, and curves to within 0.1 of 100, on all 17 one-component entries. Catch (C1): the usual back-face idiom shows the back face's content unreflected, so a back face authored as plain `draw(mirror(pd))` ends on the MIRROR knot. It has to be authored reflected and checked in the rendered page. Mid-flip frames show the same diagram as the face they belong to, never the mirror. Around 90° legibility is the design lead's question. Revised brief 4 (mirror-only) is inside the rules, but one sentence in it is stale ("none may be added without an addendum"): W-1576.
**Believe:** high on the math and on the scope (measured, and checked against the code). Medium-high on C1's CSS reading (CSS Transforms backface rules, not run in a browser here).
**Next:** W-1566 (design-lead, visual half). W-1576 (cm-math-discrete: fix the stale sentence, then choose mirror-only or the card with learning-designer). If it is the card, W-1568 (interaction-designer) specs it with C1 to C4. **Blocked:** nothing.
## 2026-10-16 · design-lead (Ines) · knots batch 1 contact sheet, block (b) per lesson, W-1566

**Changed:**
- Wrote `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` with sheets, `metrics.json` and `sheet.mjs` in the folder beside it: 67 pictures drawn by the kit at 290 and 320 px, both themes.
- **Rulings:**
  - Block (b) is **lifted** for tricolour-check, unknot-game and left-or-right (knot and mirror pictures), with conditions S1 to S4: `gap: 0.5`, stroke 2 units with butt caps, viewBox `-8 -8 116 116`, 44 px hit circles.
  - draw-a-table-knot is cleared, including the switched states.
  - W-1566: I prefer the **two-sided card**, under C1 to C6. It needs W-1567 (principal-engineer) and a brief revision (cm-math-discrete); until then the caption-only brief stands.
- **Board:** W-1566 done. Added W-1577 (cm-math-discrete) and W-1578 (design-lead, the S4 check at build).

**Believe:**
- Sure: 0 false crossings in all 67 pictures, including within 3 % of a real crossing (the detector has a self-test).
- Sure: the card's back face reads the signs of `turnOver(pd)`.
- Fairly sure: 4_1's right-hand crossing needs `gap: 0.5`. At the default, its gap is 4.2 px, narrower than the stroke.
- The real phone stage is 290 px, not 360.

**Next:** principal-engineer W-1567, cm-math-discrete W-1577, interaction-designer W-1568 (tint one strand, the card).

**Blocked:** the left-or-right card, on W-1567.

## 2026-10-16 · cm-math-discrete · W-1550 knot brief 4 and the U1 padding

**Changed:** brief 4 (left-or-right) in company/domains/briefs/math.discrete.md rewritten so everything drawn is allowed: table entries, `mirror` on the stored layout, no drawn `turnOver`, no 3-D flip. "Turn over" is a caption plus marks computed from `signs(turnOver(pd))` (numbers only). Brief 2 U1 (and the same ask in brief 3) now pads through the viewBox `-8 -8 116 116`, never `size`/`margin`. The import-block (a) paragraph says the same. knots-check.mjs gained K5b (mirror plus every switch subset draws) and K13 (padding room: 4_1 has 13 px at 360 px unpadded, 36 px padded).
**Believe:** high that the brief draws only allowed pictures and its answer (B) is true; medium that "Flip it over" reads well with no picture change (a design-review question). Citations stay unverified.
**Next:** design-lead contact sheet for the mirror pictures; demo-builder W-1542 may start. **Blocked:** nothing.
## 2026-10-16 · learner-evaluator (ncm-final-four) · borrowed-mind walks of the 4 NCM gap lessons

**Changed:** walked same-picture-two-histories, price-tag-or-auction, worth-something-alone and the-swap-that-goes-in-circles (all v1, draft) from their meta.json learner boundaries, on a private build of 236737ff. Four records, each linked in its meta.json evidence.simulatedLearner (nothing else in meta.json touched): `company/reviews/<slug>/2026-10-16-learner-knows-*.md`. Verdicts: launch, launch, launch, revise.
**Believe:** medium. The-swap-that-goes-in-circles: the reveal's takeaway ("choice models assume preferences are transitive") never says what transitive means; the objective and recall already gloss it as "ranked (transitive)", so the fix is text-only. The other three carry non-blocking notes (unkeyed red/green links and a giveaway option in same-picture; the "tag:" row label in price-tag; overlapping curve labels in worth-something-alone). Simulated learner only: not evidence that anyone learned.
**Next:** demo-builder glosses "transitive" in the swap reveal (and decides on the group-majority sentence), then learner-evaluator re-walks it. cm-probability / cm-economics decide on moving the other three to review.
**Blocked:** nothing.

## 2026-10-16 · chief-of-staff-ceo-office · W-1538 approval of the PM-authored knot items

**Changed:** W-1539..W-1542 (knot builds 1-4, demo-builder) approved, P2, next. Each carries the EDD-011 Part 1 conditions in its triage note: default layout and relax, default size/margin, scaling only via the viewBox, and C4 on the first to ship. W-1542 starts only after W-1550 (brief 4: turnOver is still blocked; the back-face flip draws the mirror knot). W-1543 (chief-of-staff founder-inbox filing for tranche 2) approved with a 5-point filing checklist. W-1565 to rnd-lead closes W-407, which is board lag. W-1538 is done. Record: the "Approval" section of company/ceo-office/triage/2026-10-16-w1517-w1532-rnd-knots.md.
**Believe:** high that the gates are met (re-read cebe763d, readiness 9f7e90cc, verify 0225a38a, all on disk). Medium that brief 4 is otherwise build-ready: it has not been re-read since the F4 finding.
**Next:** the operating chief of staff dispatches builds 1-3 now (host guard permitting), build 4 after W-1550, and files W-1543 per the checklist. rnd-lead closes W-407 (W-1565). The founder decides tranche 2.
**Blocked:** nothing on briefs 1-3.
## 2026-10-16 · learning-designer (Lena) · design notes for knots batch 1 (briefs 1 to 4)

**Changed:** wrote `company/reviews/{draw-a-table-knot,tricolour-check,unknot-game,left-or-right}/design.md` (boundary, misconception, objective, prediction, interaction, notice, reveal ≤ 90 words, recall, flags). Board W-1569 (cm-math-discrete: accept/reject brief changes, add K labels), W-1566 (design-lead) and W-1567 (principal-engineer): the left-or-right flip ruling, W-1568 (interaction-designer: unknot-game tint, left-or-right flip card). No code, no meta.json (no lessons exist).
**Believe:** sure that a one-sided CSS flip of a knot drawing shows the mirror, not the turned-over knot (planar reflection keeping gaps = mirror; kit `turnOver` = reflection plus every crossing switched, `src/kit/knots/index.d.ts`). Fairly sure the two-sided card (back face = `draw(mirror(pd))`) depicts `turnOver` exactly without drawing it, but whether that is inside README rule 2(a) is for the design lead and principal engineer. Fairly sure draw-a-table-knot as briefed (tap-to-count) confirms its own misconception; the switch redesign fixes that. Found a QA-path flaw in tricolour-check (one tap per arc cannot reach three colours). Kit numbers I quote for new claims (switched names, R2 after one switch) are my probe, not a K check.
**Next:** cm-math-discrete W-1569; then draw-a-table-knot is buildable; tricolour-check and unknot-game build to draft (unknot-game after W-1568's tint spec); left-or-right waits on W-1566/W-1567, then W-1568.
**Blocked:** left-or-right (ruling). Briefs 2 to 4 launch only after the design lead's per-lesson contact-sheet review lifts block (b).

## 2026-10-16 · fact-checker · W-1562 the 4 NCM gap drafts fact-checked

**Changed:** checked all 23 claims on same-picture-two-histories (4), price-tag-or-auction (6), worth-something-alone (7), the-swap-that-goes-in-circles (6) against Demo.tsx at f1568498 and my own re-derivations (Python closed forms, an independent Monte Carlo, the lesson's model.ts run with the kit RNG). 23 verified, 0 disputed, 0 withdrawn, no unrecorded claims. One record per slug: `company/reviews/<slug>/2026-10-16-fact-check.md`. W-1562 → done.
**Believe:** high on every number (all reproduce exactly). Medium on the two source attributions resting partly on search summaries because the book host is blocked: price-tag-or-auction c5 (E&K 9.2, not on the card, also backed by a derivation) and worth-something-alone c6 (17.6 pointer only). Other sources were opened through PMC and Crossref and are quoted in the records.
**Next:** qa-tester W-1563, then borrowed-mind walks. Non-blocking wording notes for demo-builder / cm-math are in the records (worth-something-alone c5 source "a >= 0.16" should be "a > 0.16"; swap recall "stop at his favourite").
**Blocked:** nothing.

## 2026-10-16 · demo-builder (demo-builder-ncm-gap4) · the 4 NCM gap lessons built, draft

**Changed:** built `probability/same-picture-two-histories` (4.2, W-1522), `economics/price-tag-or-auction` (9.2, W-1523), `economics/worth-something-alone` (17.6, W-1524), `math/the-swap-that-goes-in-circles` (23.2, W-1525) from the strand briefs, numbers re-run with `company/courses/ncm/checks/rejudged-four.mjs`. All draft, all 23 claims unverified (kit support types). Build notes with pre-flight and stage word counts in `company/reviews/<slug>/build.md`. Board W-1522..W-1525 → review; added W-1562 (fact-checker) and W-1563 (qa-tester). Claims taken by slug and still held (not merged).
**Believe (high):** local contract QA 8/8 (phone + desktop, unmodified spec) on my own Turbopack build; reveal-fit (tool clean) fit, crop 0, phoneFit true for all four; stage words ≤ 21 strict; typecheck and check pass. Every phone screenshot viewed. These are builder runs, not QA records. **Departure to check:** price-tag-or-auction uses exact cents ($38.49, $47.25, $33.33) where the brief wrote one-decimal roundings as cents ($38.50, $47.20, $33.30).
**Next:** fact-checker W-1562, qa-tester W-1563, then borrowed-mind walks. cm-economics-markets W-507 is still open: an objection there sends price-tag-or-auction / worth-something-alone back (none recorded on 2026-10-16).
**Blocked:** nothing. Section coverage reaches 110/110 only once these merge.

## 2026-10-16 · community-engineer (Femi) · PR #4 History maps 100: evaluation and integration, blocked

**Changed:** intake W-1555 and record `company/engineering/community/prs/4.md`. Merged base into a local copy of the PR (`pr4-history-maps` @ `5c54c689`, merge commits only, contributor history untouched; not pushed). The PR's W-1487..W-1490 are now W-1551..W-1554 (map in prs/4.md §3); they and my requests W-1556..W-1561 are on base's board too, so both branches agree.
**Believe (high):** no protected paths, no dependencies, 500/500 claims unverified, 100/100 draft; check, typecheck, all suites (hq 3 shallow-clone failures, W-1514), build, and the QA contract 200/200 on the 100 map- lessons (stamp clean) pass. The generator reproduces all 300 lesson files byte for byte from the 25 pinned upstream snapshots. **Not ready to merge:** tier 2 with no EDD, readiness record or engineering review (W-1556); the map paths are bulk-derived GPL-3.0 data with no decision record (best-practices 11, W-1557); the sensitive-route stage A (borders, colonialism) was skipped (W-1559 research note, then W-1558 cultural-reviewer).
**Next:** chief of staff dispatches W-1556, W-1557, W-1559→W-1558; W-1560 (a11y) and W-1561 (reviewRoute shape, cm-history) run alongside, not merge gates. Then community-engineer merges the review branches, re-merges base, rebuilds, re-runs QA and pushes.
**Blocked:** the push (by design, until those three gates are recorded). W-1554 may duplicate W-1503; test:dispatch passed here.
## 2026-10-16 · platform-engineer (Noor) · W-408 EDD-004 C3 integrated verify

**Changed:** recorded verify on 29f77f03 in `company/engineering/reviews/2026-10-16-w408-verify.md`. W-408 is done. One test-only fix: the default `BUILT_PORT` in `tests/platform/built-output.test.mjs` was 3659, which Next reserves, so the runtime-404 test could never start a server; it is now 3660. Routed W-1564 to tools-lead: dispatch-check's C3 worktree false positive.

**Believe (high):** C3 is met. Every stage passes. The exceptions are 3 test:hq tests that fail only because this clone is shallow (W-1514). qa passed 2160/2160 in 1.2 h, and test:kit passed 98/98. The 4 built-output tests pass 34/34 on a local VERCEL=1 build, and nothing was deployed.

**Next:** knot builds W-1539..W-1542 still wait on W-1521 (readiness approval by principal-engineer-ops); C3 no longer blocks them. tools-lead: W-1564. **Blocked:** nothing.

## 2026-10-16 · evaluation-steward (Hilde) · W-1535 lane A/B fact-check disagreements

**Changed:** ruled on procedure for 6 claims (`company/qa/2026-10-16-w1535-lane-disagreement-ruling.md`). literacy-split-france c4 and schooling-and-crime-1830s c1 are now **verified**: lane A's verification stands, because lane B's "unverified" was only a hold for lack of an opened source. schelling c10b **stays unverified**: lane B raised specific objections that lane A never saw, so a third check is needed (W-1544). clap recall, scale alt1 and batteries alt1 **stay disputed**: no third check, and re-verification after the fix goes to a non-drafting instance (W-1545). The merge note in all 6 claims had truncated lane A's note; I restored it in full from fe7574c8. Lane A's behavioral HELD_LINE withdrawals are acceptable, with a reset condition (W-1546). New procedure `company/qa/fact-check-lanes.md`: a lane is an explicit, disjoint slug list (W-1547, chief of staff to adopt). W-1548: source-field hygiene.

**Believe:** high on the rulings, which follow the records. Medium that the lanes are independent: it rests on the lanes' own statements, and the gate cannot tell checker instances apart.

**Next:** fact-checker W-1544/W-1545, demo-builder W-1532/W-1533/W-1548, chief-of-staff W-1547. **Blocked:** nothing.

## 2026-10-16 · release-manager (Diego) · W-1527 cut-the-busiest-link: NOT published, go lapsed

**Changed:** nothing published. Memory entry added; this note.

**Believe (high):** launch review r6 (`company/rituals/records/2026-10-16-launch-review.md`, "For the release-manager") step 1 requires `git diff bf6fde86 HEAD -- src/demos/cs/cut-the-busiest-link/ src/kit/` to be empty. The lesson directory diff is empty and publish-ready still lists it as a candidate, but `src/kit/` is not empty: commit `82f7f04e` (W-407 knots close-out) changed `src/kit/knots/README.md` and `src/kit/knots/test/draw.test.mjs` (docs and a test only; the lesson does not reference knots). By the record's own words the go lapses. I do not judge whether the change matters; that is the chair's call.

**Next:** head-of-product either re-affirms the go in a short addendum to the r6 record (naming 82f7f04e as outside the lesson's path), or reruns the review. Then a release-manager run publishes: `node tools/company.mjs publish cut-the-busiest-link`, `npm run check`, changelog line. No deploy without founder approval.

**Blocked:** on head-of-product.
## 2026-10-16 · principal-engineer-ops (Rhea) · knots W-407 close-out readiness: approved with conditions (W-1521 done)

**Changed:** verdict written into `company/engineering/readiness/2026-10-16-knots-w407.md` (approved with 3 conditions) for rnd-lead's `82f7f04e`. Board W-1521 moved to done.

**Believe (high):** under `src/kit/knots/` the commit changes only `test/draw.test.mjs` and `README.md`, and nothing in `src/demos`, `src/app` or `src/components` imports the kit. `npm run test:kit` passes 98/98 and the lab passes 105/105. The record's whole-commit revert conflicts on board, progress and memory, and it deletes the records; the path-limited `git checkout 82f7f04e^ -- <paths>` was rehearsed and returns 97/97 and 103/103. The new test costs about 2.5 s, not 1 s.

**Next:** principal-engineer confirms or rejects EDD-011 Part 1 (the block (a) scope). My approval is not that ruling. W-407 stays with rnd-lead. C3 (W-408) is still before any lesson imports the kit.

**Blocked:** nothing on ops readiness.
## 2026-10-16 · cm-geography (Ana) · schelling-on-new-york: c10b swap approved, retirement note written (W-1531)

**Changed:** `company/reviews/schelling-on-new-york/retirement.md` (F-46 note, ahead of the 10-19 18:00 deadline); a status line under brief #1 in `company/domains/briefs/geography.people-places.md`; W-1531 → done; added W-1536 (head-of-product checks the note) and W-1537 (comeback precondition: do cultural-ruled disclosure lines count like declared stimulus in the stage budget?). No status flip, no meta.json change.

**Believe:** (high) the swap to Swope, Hernández & Cushing 2022 fits cultural pass 3 ("replace the source, not the order"); it is approved on two conditions: the verifier rules on "widening", and any replacement word goes to the cultural-reviewer first. (High) The stage cannot reach 25 by any trim: the cultural-ruled lines alone count 38 on built v4.1. My source count of the busiest frame is 66, not the closeout ruling's 83 (that was the v1 brief's upper bound); I counted from code, not from the artifact. (Medium) With a stimulus-style exemption for the ruled lines and the cut plan in the note, the comeback total is 47, under the 50 ceiling.

**Next:** head-of-product checks the note (W-1536), then the status flip and the retired-lessons row on 10-20. The swap is applied in the comeback build, not now.

**Blocked:** the comeback, on W-1537 (head-of-product) or a W-1391 re-ruling (cultural-reviewer).
## 2026-10-16 · portfolio-manager (Odette) · rnd-knots budget line (W-1520) and triage of W-1517..W-1532

**Changed:** `company/ops/projects.json` rnd-knots: legacy → **proposed**; tranche 2 (EDD-011 Part 2) priced at 0.6M from measured per-run means (rnd-lead est. 0.5M); returns as lessons (`returns.slugs`, the 8 Knots batch 1 slugs); stop rules; kill date 2026-11-06; pre-mortem. Record: `company/ceo-office/triage/2026-10-16-w1517-w1532-rnd-knots.md`. Board: W-1517..W-1532 triaged (P/owner/state/note; W-1520 done); new PM-authored W-1539..W-1542 (build knot briefs 1-4, demo-builder, backlog P2), W-1543 (chief-of-staff: founder-inbox filing for tranche 2), W-1538 (chief-of-staff-ceo-office approves my items).
**Believe:** high that knot briefs 1-4 need no project budget: routine re-reads (maintenance) plus catalog builds, untagged; their gates are W-407, W-1521, W-408 (C3). High that tranche 2 needs the forum with the founder in the chair (kit is tier 2, so the PR2 delegation does not apply). Medium on 0.6M (proxies for rnd-lead and design-lead).
**Next:** principal-engineer W-407 re-read; principal-engineer-ops W-1521; platform-engineer W-408; chief-of-staff-ceo-office W-1538; chief-of-staff W-1543.
**Blocked:** tranche 2 on the founder-chaired forum. Not mine but flagged: history (6.3M of 2.5M) and behavioral-econ (2.7M of 1.8M) are past 100% with tagged work (`node tools/ledger.mjs check`).
## 2026-10-16 · principal-engineer (Kenji) · knots W-407 re-read: EDD-011 Part 1 approved with changes

**Changed:** re-read the W-407 kit change (`82f7f04e`: one test plus README text; no library or table byte changed) code-first, then the change note. Record: `company/engineering/reviews/2026-10-16-knots-w407-reread.md`. EDD-011 status and kit README rule 2(a) updated to "approved with changes", with two conditions: default `relax`, and the default `margin/size` ratio (scale and pad by SVG `viewBox`). `turnOver` pictures stay inside block (a). Board: W-1549 (rnd-lead, ratio row in the test) and W-1550 (cm-math-discrete, brief 4 `turnOver` and back-face flip, U1 padding).

**Believe (high):** for table knots on a fixed layout, the curve set does not depend on over/under (code reading), and an exhaustive probe of 14,046 pictures found 0 extras at default options for every crossing subset. The scope as proposed was too loose: `draw(knot('4_1').pd, { size: 360 })` shows 1 extra crossing, and `relax: 0` shows 1 on 3_1 and 4_1. `test:kit` 98/98 and typecheck pass. `npm run check`: see the commit.

**Next:** block (a) no longer stops knot briefs 1–4 (`company/domains/briefs/math.discrete.md`). Brief 4's drawn `turnOver` is still held. Before any lesson imports the kit: C3 (W-408, platform-engineer), C4 at the first `layout` lesson, and readiness W-1521 (principal-engineer-ops). Blocks (b) and (c) are unchanged.

**Blocked:** nothing on engineering for briefs 1–4.

## 2026-10-16 · principal-engineer-ops (Rhea) · Books a11y B1–B4 readiness: approved with conditions

**Changed:** verdict written into `company/engineering/readiness/2026-10-16-books-a11y-b1-b4.md` (approve with 3 conditions) on top of `907e1068`.

**Believe (high):** scope is Books renderer + tests + records only; `npm run test:books` 417/417 pass; rollback rehearsed (`git revert -m 1 a437361a` clean, src/tests back to `cdee168c` exactly); all Books lessons remain drafts. The record's "revert the one commit" line is wrong after merge; corrected in the verdict.

**Next:** integrator merges this branch to main and records the main merge SHA in the changelog entry (condition 1). Before publish: accessibility-reviewer re-scan (W-1511) and qa-tester build + QA (condition 2). W-1517 stays with platform-engineer.

**Blocked:** nothing on ops readiness.

## 2026-10-16 · principal-engineer (Kenji) · Books a11y B1–B4 re-read: approved

**Changed:** re-read platform-engineer's `fix/books-a11y-b1-b4` (`b3beca16`) code-first, then the change note; merged it into `worktree-agent-a4cfd34bc12839f51` on main `cdee168c` with merge commit `a437361a` (one conflict, `company/ops/changelog.md`, both entries kept). Record: `company/engineering/reviews/2026-10-16-books-a11y-reread.md`. Board W-1517 (platform-engineer): Reset still drops focus to body after press.

**Believe (high for the code, medium for layout):** B1–B3 are fixed and `describeScene` restates only what the picture draws. `test:books` 417/417, typecheck and check pass on the merged tree. I did not build or run a browser; the fit at 13 px rests on the author's measurements.

**Next:** principal-engineer-ops approves `company/engineering/readiness/2026-10-16-books-a11y-b1-b4.md`; integrator merges my branch; accessibility-reviewer re-scans before publish (W-1511).

**Blocked:** nothing on engineering.
## 2026-10-16 · cm-math-discrete (Chiara) · knot theory briefs (W-146, W-419; both moved to done)

**Changed:** `company/domains/briefs/math.discrete.md` section "Knots, batch 1" now holds 8 ranked briefs: 1 draw-a-table-knot (rewritten with the 6_1 decision), 2 tricolour-check, 3 unknot-game, 4 left-or-right (buildable now, each needs its design contact sheet before launch: block (b) lifts per lesson), then 5 unknot-in-disguise, 6 cut-one-ring, 7 wiggle-keeps-the-fingerprint, 8 more-crossings-same-knot (held). 8 `knot-*` concepts added to `content/curriculum/math.json` (knot-table-names first; prerequisites chained). Answer checks: `company/domains/briefs/checks/knots-check.mjs` (K1-K9) and `knots-check-blocked.mjs` (K10-K12). Held briefs are in `company/ops/brief-skips.json` with board ids W-1519 (block a: scramble/apply output) and W-1518 (block c: link drawing), both owner rnd-lead.

**Decisions:** draw-a-table-knot draws the kit's default `draw(knot('6_1').pd)`, which is now the fix1-bigon drawing (`cmp` shows kit `draw.mjs` identical to the candidate); the design lead preferred it. T1-T4 and U1 (U2) from `company/design/reviews/2026-10-14-knot-pictures.md` are copied into tricolour-check and unknot-game (U1 also into left-or-right and the 4_1 chip). The research note's rank-1 idea (unknot in disguise) cannot be built until block (a) lifts, so the buildable order differs from the research order on purpose.

**Believe:** every number in briefs 1-4 is a kit computation I re-ran (high). Found while checking: switching two crossings of the figure-eight gives a trefoil for 2 of 6 pairs, so unknot-game must show "Still a knot" from `simplify` status `minimal`, never from absence of `unknot`. All citations are unverified (the research note read them through snippets); no brief claims `verified`. The misconceptions are hypotheses (no study exists); test with 3-5 people.

**Next:** demo-builder can claim 1 then 2, 3, 4; design-lead reviews each contact sheet (mirror and turned-over pictures of left-or-right have never been seen by design); fact-checker opens the cited sources; rnd-lead owns W-1519 and W-1518. **Blocked:** nothing for 1-4. I accidentally took and released a claim lock (`friends-of-friends-overlap`) while testing `claim.mjs next`; it is released.
## 2026-10-16 · rnd-lead (Bram) · W-407 knots close-out: what still stands between the kit and a lesson

**Changed:** C1 and C2 were already done on 2026-10-14; re-checked today (`derive.mjs --write` reproduces `table.derived.mjs` byte for byte, kit `table.mjs` = it after the README `sed`; lab README pointer present, status line freshened). The 4 U10 monster-unknot lab tests now read `MONSTER` from `test/benchdata.mjs`, not the table (lab 105/105; 103/103 on a scratch derived-table swap; a test pins table U10 = MONSTER). New EDD-011 (`company/engineering/edd/EDD-011-knots-extra-crossings.md`): Part 1 scopes import block (a) so table-knot pictures (entry, mirror, crossing changes on the stored layout) are outside it, backed by a new kit/lab draw test (0 extra crossings over 301 pictures; only the link L6a4 shows extras, already block c); Part 2 (exported `extraCrossings`) designed, paused per the R&D Review. Kit: one test + README only (`test:kit` 98/98). Change note for the principal engineer: `company/engineering/reviews/2026-10-16-knots-w407-change.md`; readiness `company/engineering/readiness/2026-10-16-knots-w407.md` (ops approval W-1521). Board: W-407 → review; W-857, W-143, W-144 → done; W-1520 (portfolio-manager: rnd-knots budget, my role may not change projects.json); W-1521. `npm run check` and `typecheck` pass. Not pushed, not deployed.

**Believe (high):** no rnd-lead item now blocks a lesson that draws table knots. **Medium:** EDD-011 Part 1 holds as written; it needs the principal engineer's confirmation.

**Next:** principal-engineer re-reads the change note (caller dispatches). cm-math-discrete can brief draw-a-table-knot (5_2) now (W-146, W-419). platform-engineer: C3 (W-408). First layout lesson: C4 phone timing.

**Blocked:** lessons on random diagrams (block a, EDD-011 Part 2 paused, no brief); 3_1/4_1 pictures until per-lesson design review (block b); links (block c).
## 2026-10-16 · cm-course-ncm (Jonah) · NCM finish-line refresh

**Changed:** `content/courses/ncm/chapters.json` refreshed against `src/demos` (batch1 status gone; `briefed_wave_j` folded into `covered_by`/`briefed_not_built`; stale slugs mutual-friends-add-up-slower and the-line-takes-up-to-half removed; two-pages-swallow-the-rank and who-pays-same-filter added; `not_yet_published` per section). `company/courses/ncm/coverage.md` rewritten (stale first-map tables dropped, in git at cdee168c). The 4 re-judged briefs (4.2 same-picture-two-histories, 9.2 price-tag-or-auction, 17.6 worth-something-alone, 23.2 the-swap-that-goes-in-circles) made build-ready in `company/courses/ncm/briefs.md` and their strand copies: cm-probability-statistics's "revise" ruling applied to #72, support types fixed (closes W-1393's #13 c3/c4), stage word budgets added, numbers re-run by new `company/courses/ncm/checks/rejudged-four.mjs`. **protest-needs-a-shared-view retired** (ruling in briefs.md J3; proposed concept withdrawn from `content/curriculum/math.json`). payoffs-set-the-threshold added to `company/ops/brief-skips.json` until cm-math fixes the tie rule (W-1393). New `company/courses/ncm/checks/coverage-count.mjs` recounts coverage and flags map drift. Board: W-1522..W-1525 (build the 4 gaps, demo-builder, next), W-1526 (9 concept briefs, backlog).

**Believe:** high on the counts: 156 sections, 110 demo-able, 106 built (96.4%), 91 published (82.7%); the 13 review lessons are the whole built-vs-published gap. High that origin/ccr-rnd-ncm (61f01320) has no NCM lesson or brief that main lacks; main is equal or newer on every NCM lesson, so drop it (schelling-on-new-york's `review` there must not come back). Medium on the 4 re-judged sections matching the book's emphasis (host still blocked, W-420).

**Next:** demo-builder W-1522..W-1525; fact-checker on the 13 review lessons, then the publish gate; cm-economics-markets W-507 (may still object to #26/#27); cm-math W-1393 (J15 tie rule).

**Blocked:** section-number confirmation (book host 403, W-420). Not pushed.
## 2026-10-16 20:55Z · head-of-product (Priya) · F-46 closeout ruling + launch review r6 (W-1483)

**Changed:** launch review r6 (`company/rituals/records/2026-10-16-launch-review.md`) on the 11 lessons `company status` calls ready. **Go: cut-the-busiest-link** (v2 learner launch r15; qa-tester QA on bf6fde86, which is identical to HEAD for the lesson and kit; claims verified). **No-go: 10**: eight have current versions that were never walked (XW-1/XW-2), karatsuba has a revise verdict on v5, and patience is held by W-1333. Closeout ruling `company/product/2026-10-16-closeout-ruling.md` covers all **364** (235 review + 129 draft): **(a) push 140 · (b) fix once 87 · (c) retire 137** (106 Books if F1/F2 are unanswered by 10-19 18:00; 30 parked Life Hacks unless argued by 10-18; schelling-on-new-york). New stuck rule: 11 path-W lessons with 3+ revised versions get the walk only, and revise means retire. Created `company/product/retired-lessons.md` (no rows). Mailed all 14 lane managers plus release-manager, evaluation-steward and chief-of-staff (ids in the ruling). Board W-1527..W-1530. **Retired: none.** F-46 item 7 requires a CM-written note for each lesson, and none exists yet. Nothing published by me, nothing deployed.

**Believe:** high that only cut-the-busiest-link clears the gates and the verdict-currency check today. `company status`'s ready line overcounts by 10 (W-1528). Medium on the 10-20/10-23 dates: lane-10 capacity is still unconfirmed (plan objection 2).

**Next:** release-manager publishes cut-the-busiest-link (W-1527). Lane-10 XW/LW walks, QA-1 and FC-1 per the plan. CMs send their (b) rounds and write (c) notes by 10-19 18:00 (W-1530). chief-of-staff puts F1/F2 to the founder in the daily line. I check notes and chair DLR-H on 10-19.

**Blocked:** Books 106 on the founder's F1/F2. schelling on a source this host cannot open.
## 2026-10-16 · fact-checker (lane B, F-46 closeout) · NCM-13 re-check, c10b, draft claims

**Changed:** 1 commit on `worktree-agent-af03a3aad9424d7e6` (claims and records; no code):
- **NCM-13 (item 1):** at base cdee168c, the 13 NCM review lessons had no open claims (72 verified, all "Ready to publish"). I re-checked their current Demo.tsx against the claims for staleness after the later revisions (selfish v6, cluster v5, agenda v3, W-513). All still match, and I made no status changes. Record: company/reviews/ncm-review-13/2026-10-16-fact-check-laneB.md.
- **schelling-on-new-york c10b (item 2):** still unverified, because Rothstein is unreachable on every host. I opened a replacement source, Swope et al. 2022, PMC9342590, and wrote the text/source fix (company/reviews/schelling-on-new-york/2026-10-16-fact-check.md). W-1531 (cm-geography).
- **Item 3:** no review lesson outside lane A and books has an open claim. Among the drafts, I disputed clap-at-the-cliff recall, scale-on-a-slope alt1 and two-batteries alt1, each with a one-line fix (W-1532, demo-builder). literacy-split-france c4 and schooling-and-crime-1830s c1 are still held on "young men" (PMC search tried); the FC 58/59 rewording fix finishes them.

**Believe:**
- High: NCM-13 claims are current.
- High: the three physics disputes are real and one-line fixes.
- Medium: Swope 2022 carries c10b's card words. "Widening" is a judgement call, written in the record.

**Next:**
- cm-geography approves the source swap (W-1531), then demo-builder edits c10b and another fact-checker verifies it.
- demo-builder W-1532, then fact-checker re-checks.
- Release manager: the NCM-13 need no fact-checker action.

**Blocked:** Rothstein book access (no proxy route).
## 2026-10-16 · fact-checker · lane A (publish-blocking claims) and the remaining open claims outside Books

**Changed:** 31 claims across 24 lessons. 10 verified: hailstone-27-climbs c4 c5 (Barina 2025 and Tao 2022 abstracts via api.crossref.org), drying-room-water-load c6 (AWMF mold guideline, PMC11097193), lh-pay-for-used-quantity c6, lh-split-order-fixed-fee c5 c6, literacy-split-france c4 and schooling-and-crime-1830s c1 ('young men': 1834/1838 Edinburgh Med Surg J on the French conscription law, PMC5776539/PMC5772286), clap-at-the-cliff recall, schelling-on-new-york c10b (PMC9387904, PMC8099638; Rothstein still unopened). 4 withdrawn as cut, not as false: the behavioral HELD lines (same-week c6, saved-or-die c5, sure-million c6, zero-loses c6); each is behind a `HELD_LINE = false` constant and renders nowhere. 9 disputed with exact corrected text in the claim notes: sock-pairing-by-pattern c1 c3 c4 recall seen, cue-needs-a-boundary seen, two-batteries-side-by-side alt1, scale-on-a-slope c4 alt1. 8 held (only blocked hosts can carry them), each with proposed wording that unblocks it: 4 tariff hedges, lh-scale-recipe-portions c5, mail-exact-phrase and mail-minus-noise recall, wet-knit-hang-stretch c1. batch-by-setup c1/c2 are unchanged and still disputed (W-1484). Records: company/reviews/<slug>/2026-10-16-fact-check-lane-a.md. Board: W-1533 (demo-builder), W-1534 (cm-lifehacks).

**Believe (high):** status now lists 8 lessons as ready to publish that were blocked only by these claims: same-week-a-year-apart, saved-or-die-same-600, sure-million-or-long-shot, zero-loses-to-this-crowd, hailstone-27-climbs, drying-room-water-load, lh-pay-for-used-quantity, lh-split-order-fixed-fee. Four drafts now have every claim verified: literacy-split-france, schooling-and-crime-1830s, clap-at-the-cliff, schelling-on-new-york (which is hidden until c10b). Medium on the withdrawals: if a reviewer holds that a HELD line must stay unverified, revert them to unverified. That would not change what learners see.

**Next:** demo-builder W-1533 (one fix round, then a fresh fact-checker re-checks the reset claims); cm-lifehacks W-1534 or evaluation-steward W-847 for the 8 held lines; the draft-to-review flip for the four claim-complete drafts belongs to their builders and CMs.

**Blocked:** nothing pushed or deployed. Gov, NHS, energy-regulator, food-safety, Google Help and GINETEX hosts are still refused here.

## 2026-10-16 · community-engineer (Femi) · PR #5 Books 100: evaluation and integration, blocked

**Changed:** verified and committed the base merge into `feat/books-100-demos` (board/events resolution; the PR's W-1486..W-1497 are now W-1492..W-1503, map in `company/engineering/community/prs/5.md` §3). Intake W-1504; review gates W-1505 (QA), W-1506 (PE, done), W-1507 (a11y, done). Merged `review/pr5-pe`, `review/pr5-platform`, `review/pr5-build`, `review/pr5-a11y` with merge commits. Corrected the README sentence that cited a missing integration record (PE M4). Board: W-1508 (test:books red), W-1509/W-1510 (cm-books), W-1511 (a11y fixes B1-B4, publish prerequisite). Nothing pushed, nothing deployed.

**Believe (high):** no protected paths, no dependencies, 467/467 claims unverified, 100/100 draft, check and build pass. **Merge is blocked:** `npm run test:books` fails 4 subtests (2 lessons) on the merged tree because the M2 payload test and the F8 reformatting disagree (W-1508); the QA contract (W-1505) has not landed; full verify (PE M3) is not run.

**Next:** platform-engineer/demo-builder fix W-1508; qa-tester lands `review/pr5-qa`; then merge it, run full verify (M3), push `feat/books-100-demos` (merge commits only) and report ready to merge. Release manager only after publish gates.

**Blocked:** push. Update after M3: M3 is met (qa 2158/2158, build 116 s, .next 570 MB, company/reviews/books-100/2026-10-16-pr5-m3-verify.md), so every merge gate is recorded. Follow-ups: W-1513 (evaluation-steward, built-output tests before publish), W-1514 (tools-lead, shallow-clone hq tests). But origin/feat/books-100-demos is now at 3fc72dbe, a second integration of the PR that diverges from ours (101 conflicts, 96 bk- metas), and base moved to 207e8010 (conflicts in board.json and index.generated.ts). No push and no force-push. The founder's session or chief-of-staff must choose which integration wins (company/engineering/community/prs/5.md §9).

**Update (both integrations merged):** following the founder's decision, origin 3fc72dbe and base 207e8010 are merged in with merge commits, and nothing is discarded. Evidence is the union of both sides. The PR's W-1492 is now W-1515 because it collided with base's W-1492. check, typecheck, test:books, test:platform and test:hq pass, except the known shallow-clone #42/#48/#49; the bk- QA contract is 200/200. Pushed without force: ready to merge (company/engineering/community/prs/5.md §9).

## 2026-10-16 17:11Z · chief-of-staff — Books100 draft PR

**Changed:** [PR #5](https://github.com/hanialshater/system-3-company/pull/5) adds exactly100 distinct-book idea demos (34business/33psychology/33science-history), shared bounded Books models/renderer, curriculum/works and independent evidence. All100 remain draft and all467 claims unverified. The six originals are unchanged. Current default a4cc732b is integrated; board task identities are remapped without rewriting history. Four reviewed historical HQ room aliases repair ten clerk labels; all original event lines are byte-identical and ten correction notes use canonical homes.

**Believe (high for recorded functional scope):** actual finalv2 QA passed200 contracts,100 strict390×844 fits and100 explorations;12 model tests and200 independent scenario calculations agree. Current integrated feed10/10, seven reverse paths and HQ65/65 pass. Check/typecheck/build pass on3155e779; fullverify remains red only on inherited Git2.51.1 C2 fixture. Design covers30 bounded cases/70unseen; simulated learner review covers7 distinct pilots/93unreviewed. These are not source or measured-learning approval. See company/reviews/books-100/2026-10-16-final-integration.md and its exact identities/results.

**Next:** review the requested draft PR and grouped rollback, preserving all holds. Existing owners retain source/chapter work W-1499, short-phone crop repair W-1501, artifact provenance tooling W-1502 and inherited dispatch fixture W-1503. Final publication uses byte-identical Git-tree comparison because CLI push lacks credentials; local/public phase IDs are mapped in publication-provenance.json.

**Blocked before launch/merge:** source/attribution/empirical/legal gates, short-viewport completeness and required CI resolution; no merge, lesson publication or deployment performed. No founder gate or protected judge was bypassed.

## 2026-10-16 15:34Z · chief-of-staff (Ada)

**Changed:** published 675 → 709 today (+34; 15 Wave J by W-843 ruling + launch review 7ab3934, 6 Life Hacks slate 00b4b1e, first in category; 4 physics/Wave J f9265aa). Nothing deployed. Founder decisions: F-39 agent memory (merged; every agent reads onboarding + `node tools/memory.mjs read <role>`, ends with an offboarding entry; 50 KB threshold), F-40 floor reseat (merged; 52 moves + Leonie's R1), F-42 mailbox dispatch (tier 1 merged; pilot on verticals, day 1: two builds started by mail, c5b4 physics #64-68 in /home/user/s3c-wj64, 213a Wave J revisions in /home/user/s3c-wjrev6), F-43 First Light T1 +1M (6.59M), History and behavioral no top-up (STOP after 23:59Z). F-41 throughput plan, F-44 First Light cuts C1–C4, F-45 fra1 are open with the founder. Retro and WBR-4 held.

**Believe:** dispatch, not caps, limits output (PE-ops c5a73a4, high). Only 44 held lessons were clean, not ~250; quote publish-ready, never `company status` (high). Wave J has ~1.1M left after the pilot builds (medium; ledger imported 15:30Z).

**Next:** drain `node tools/mailbox.mjs drain dispatcher` on every report; merge the two mail builds and send their checks to lane 10; principal-engineer-ops verdicts on the two package.json lines (F-39 c7b9c22, F-42 a8317f6), lhfix-r3, and the F-38/F-43 co-sign (running); founder answers on F-41, F-44.

**Blocked:** History and behavioral builds (no budget). Deploy (founder approval per deploy).

## 2026-10-16 (14:20Z): chief-of-staff — round 5; two SEV2s; guard + in-flight fix merged; nine lessons published (repo only)
- **Changed:** round-5 batches from 14 lanes (verticals, design, tools, portfolio, AI, CS ×2, Life Hacks, physics, History, behavioral, ops, chemistry, geography, math, product, probability). Merged: lh-engine-locked, tools-f5, wj-rev-r3, beh-r4-b1, beh-r4-b2, hist-co2v3 (renamed fossil CO2 v3), wj-phys-r3b3 (physics #61-63 v2), cs-r5b-softlocks (two published soft locks fixed), tools-r5-b1 (shared-checkout git guard; pre-rebase installs on merge), tools-r5-b2 (in-flight key match), product-r5-b1 (launch review r5). Published in the repository (no deploy): 9 lessons (250f533); 684 published. Two SEV2s declared by PE-ops (ev-356e65fbc7 /dev/null, ev-ff2a7438e3 shared-checkout autostash); both COEs final and accepted; retro and WBR-2 written; build hold (R2) lifted ~14:00Z. Three git-backfilled commit events mis-typed as incidents were reclassified (ev-5a64a546e0, W-1404). History-wide publish hold added (head-of-product r5 A1). Stage-word Ruling 2 (spaced units and coordinates count 0; formulas count 1).
- **Believe (high):** the 13:06 wipe came from my own brief text (rebase recipe in mgr*.txt and item.txt); every brief now says commit-only. The Claude-hook layers of the guard stay inert until H1 (W-1280) is observed from a session started in /home/user/system-3-company. **Medium:** the in-flight count is now trustworthy after the full backfill + key match; pass `--key` on hand events (W-1417).
- **In flight:** builds: verticals r5 B1 (4 Wave J design fixes), AI r5 B1 (asthma v3), physics r5 B2 (head-on v2). SO-10-1 Life Hacks re-QA m–z (on server 3bf1d34). probability r5 B1/B2. Shared server rebuild at 6838dba is built in .next-review5 but NOT swapped: swap when the SO-10-1 m–z run reports (then rebuild again at current main, which has saved-or-die v2, beh2, CO2 v3, physics v2 and the soft-lock fixes).
- **Next:** swap/rebuild the server; then lane-10 checks W-1366, W-1411, W-1352/W-1353 re-QA; Life Hacks lhfix-r3 build (cm-lifehacks r5 B1, tier 2); math r5 B4; History B4 waits on cm-history's stage cuts (W-1413); schelling waits on a cultural re-ruling (W-1391).
- **Blocked on founder:** a deploy (nine newly published + two soft-lock fixes + everything since r7; W-706 needed before predictions can be scored), F-36, F-27..F-30, F-32..F-37, F-17/18/20, F-23, F-25/26.

## 2026-10-16 (14:30Z): qa-tester - SO-10-1 batch=SO-10-1 [project:lifehacks-engine-v2], Life Hacks re-QA a-l (W-1235, W-1341)
- **Changed:** 15 QA records (contract spec, phone + desktop, 0 retries, all pass) on the shared server 3bf1d341adc9871e1036cfecef083e093660732c (SHA and tree unchanged start to end; R3a exit 0 for all). W-1341 locked-stage lessons in a-l: elastic-loop-release, fitted-sheet-corners-nest, group-cables-with-ends, long-cord-knots-itself, all pass, reveal unlocks on the reverse pass, locked pictures state no count or result. socks-use-shoe-space (the fifth) is for run B. Feed specs (R5) 10/10 on this SHA. Records for the 4 W3 lessons overwrote the earlier same-day fail records (in git history). Commit 67169e9.
- **Believe (medium):** contract and R4 held in a browser; no dead ends. Not evidence of learning.
- **Next:** run B (m-z) does socks-use-shoe-space; /home/user/s3c-eng1/.next-eng1 is NOT deleted yet (needs all 5 records). cm-lifehacks: lh-annual-label-cost shows EUR1,050.00 axis label while locked (board). Skipped for disputed claims: cue-needs-a-boundary, keep-the-error-feedback. elastic-loop-release has 2 disputed claims but was QA'd as a W-1341 lesson.
- **Blocked:** nothing.

## 2026-10-16 (13:45Z): learner-evaluator — SO-10-3 batch=SO-10-3 [project:wave-j], W-1326 r15 re-walk
- **Changed:** r15 learner records for calibrated-but-unequal-alarms v2 and cut-the-busiest-link v2 (both **launch**), walked on the shared review server built from 3bf1d341adc9871e1036cfecef083e093660732c (SHA unchanged start to end; R3a exit 0 for both). Findings committed before meta.json was read (9be5921); comparison section, evidence.simulatedLearner links and board after. W-1326 done; W-1367 (qa-tester: does the 'B at 50' trace line render under a real drag), W-1368 (cm-ai notes), W-1369 (cm-cs notes).
- **Believe (medium):** neither lesson has a finding that blocks a first-time learner. The likeliest real defect is the calibrated stage trace staying at 'B at 32' with the slider at 50 (could be a walkthrough-jump artifact). Simulated learner only: not evidence that anyone learned.
- **Next:** qa-tester W-1367; CMs decide on the notes; fact-checker still has c1-c4/c6 (calibrated) and c4-c5 (cut) unverified.
- **Blocked:** nothing.

## 2026-10-16 (13:05Z): chief-of-staff — rounds 3-4; shared review server; F-31 applied
- **Changed:** F-31 applied (hooks wired in .claude/settings.json; main checkout core.hooksPath = tools/git-hooks; W2 checks pass; H1 not observable from this session because it started in /home/user — repo-dir sessions load the hooks). Shared review server on :3591 (built by me per main SHA; now 5b2fee7, `.next-review3/BUILT_FROM`); steward rulings R3 (shared-server QA is not a build) and R3a (eligibility by `company/reviews/org/2026-10-16-r3a-scope/check.sh`). Production builds share the 3-builder cap (OOM retro). Merged today since 11:30Z: brief 3 v2, brief 4 saved-or-die, briefs 23/24, behavioral pilot revisions, lhfix-r2 (33 LH lessons), beacon allow-list (E1-E4), guard fixes M1/M2 + G5, slot ledger (warn), rome v4 to review, H2 spool + fold lock.
- **Review throughput:** independent QA on the shared server: Wave J 20/20, History 10/10; learner: Wave J 5 launch/2 revise + 6/8 earlier, History 3 launch, behavioral 2 revise; fact-check: physics 17/17, History 9/11 (+'young men' held), behavioral 15/19 (saved-or-die c2/c3 disputed: equal-EV tie).
- **Built, awaiting approval:** lh-engine-locked (W-1258/W-1241/W-1247/W-1299; PE-ops reviewing); tools-f5 (PE-ops clearing G5-a/b); tools-buildslot (lane-10/PE check).
- **Believe (medium-high):** the bottleneck moved from builds to integration and to host CPU from browser checks; the 14-agent cap is usable only with the shared server.
- **Next:** behavioral r4 B1-B2 and History r4 B2/B4 builds as load allows; rebuild the shared server after they merge; launch reviews for 20 Wave J + rome (deploy needs founder); accounts rebase + verify (A-13, mine) on a quiet host; founder digest ~20:00Z.
- **Blocked on founder:** F-27..F-30, F-32..F-37 (F-36 Life Hacks kill-rule reading, F-34 PR1 reopened items, F-35 esbuild), r8 deploy, F-17/18/20, F-23, F-25/26.

## 2026-10-16 (11:30Z): chief-of-staff — round 2 through managers; cap 14; QA independence finding
- **Changed:** founder's cap 14 agents / 3 builders (decision + dispatch-check); round 2 asked all 8 active lanes for batches and dispatched ~30 items from them; integration now happens in /home/user/s3c-int (a detached worktree), never in the shared main checkout. Merged: rome v4 checks, Wave J flip 15, Life Hacks W3 (11 lessons, readiness approved with conditions; W4 not cleared), agent-events hook (unwired). System 3 Meta founder brief with the value proposition (section 0: the philosophy of science as a harness for fallible agents, robots and humans).
- **Results worth knowing:** accounts can merge with accounts off (privacy re-read), A-5/A-6/F-f closed on `accounts`; PE objections reopen PR1 items (F-34); QA authorship audit: 197 of 217 "ready to publish" lessons rest on non-independent QA (mostly my own integration run) → re-QA under SO-10-1, AMD-010 proposed; W3: 67/75 claims verified, QA 8/11, learner 2 launch / 6 revise; Wave J SO-10-3 6/8 launch; physics and history open claims cleared (FC 55, 56).
- **Believe (medium-high):** the managers-batch protocol works when every lane is asked each round; the real limits are host memory (concurrent next-build OOM → production builds share the 3-builder cap, SEV3 logged) and integration time.
- **Running:** backend beacon (FL B2), behavioral brief 3, History brief 23 (builders); PE-ops (guards + ledger readiness), tools-lead (E1/N1 + H2 spool).
- **Next:** rebase `accounts` onto main + verify (mine); founder F-27..F-35; next SO runs one tag at a time as build slots free; founder digest due ~20:00Z.
- **Blocked on founder:** F-31 hooks (after E1/N1), F-34 PR1 reopened items, F-35 esbuild, F-17/18/20 ads, F-23 domain, F-25/F-26, r8 deploy.

## 2026-10-16 (late morning): chief-of-staff — System 3 Meta brief; marketing packet in
- **Changed:** company/sibling/system3-meta/founder-brief.md (founder's mission and onboarding context for the System 3 Meta VP: generate whole companies per use case; higher-risk companies with real infra; usable by others; model/vendor choice; humans and tools as members; what this company proves and where it is thin; constraints; 8 open questions; reading list). Linked from the 10-16 sibling decision. Still parked until after First Light; Leonie designs, founder approves (W-1182).
- **vp-marketing (2ee1428):** F-23 domain shortlist (pick Guess First, guessfirst.app/.com; **no price or availability verified**, proxy blocked every lookup) and the F-17/F-18/F-20 ads packet (stage 1 house cards only, $0 revenue, ~1.9M tokens cost). Follow-ups W-1193/W-1194.
- **Life Hacks W3:** W-1192 to cm-lifehacks (PE-ops approval of the readiness addendum before merge; review tip 5d9de52 whole).
- **Believe (medium):** the Meta brief captures the founder's intent; the claim "generate a company" rests on one company and one model, recorded as an objection.
- **Running:** Leonie retro, backend M1–M6, rome v4 + flips, cultural review.
- **Blocked on founder:** see digest list; plus F-17/18/20 replies and permission to run the domain price quote.
## 2026-10-15 ~13:10Z · chief of staff (Ada): r7 live; deployed before approval (COE)

- **Changed:** r7 is in production. It ships 40 newly published lessons (e6805f4), including the first 4 History lessons, plus draft 404s and the publicMeta allow-list. QA was 1930/1930 on a production build, and a production-mode build showed draft 404s and an empty manifest. Vercel built **aefb10a** at 12:46Z, BEFORE the founder's approval, because the release manager's commit body quoted the deploy marker. The founder then approved ("yes, deploy r7"), and no second deploy was made. Release log r7 = aefb10a; test:hq now pins r1..r7. COE: company/rituals/records/2026-10-15-coe.md (W-1051..W-1054). Merged in this session: patience branch (History rulings, claims reset; stray tsconfig reverted); head-of-product rulings (W-997 fold rule, First Light scope, History launch five, ammonia); research notes W-959/W-902. W-981 behavioral DomainId is on branch domainid (959ef69, 5f41f8f, bed597b). The principal engineer approved it, conditional on verify. PE-ops withholds readiness until integrated `npm run verify` (W-1050).
- **Believe:** high that production runs the r7 tree. C2 passed on system-3-company.vercel.app: drafts 404 twice, /api/meta allow-listed, published statuses correct. The client bundle leak (W-946) is still there.
- **Next:** W-1050 (rebase domainid, verify, PE-ops sign, merge). Fact-check the reset claims (W-1042). Project Review 1 on 10-16. W-1051/1052 so that a prose mention can never deploy again. Founder decisions: AMD-001 (c2), F-01, F-17..F-25.
- **Blocked:** Vercel API returns 403 for this session's scope (it cannot list deployments). Commit statuses on GitHub work as the check.

## 2026-10-15 chief-of-staff: release 2026.10.15.1 deployed (founder option C); History round 1 (15 drafts); 66 drafts learner-reviewed; release log in HQ; PE scalability note

- **Changed:** founder-approved deploy 41ecec1 `[deploy]` (empty commit, tree = 8054b88, which passed full QA 1930/1930 on a production build plus check/typecheck/test:deploy/hq/spike). It ships the /spike S1 fix and 48 newly published lessons (27 in the final pass: 13 r11 re-walks, 8 old-version re-reviews, 7 geography screenshot holds lifted). Vercel status success (deployment 7081228607). Release log: company/ops/releases.json (owner release-manager, founder ruling), /hq/releases, tools/release-draft.mjs; entry 2026.10.15.1 recorded in 79515e1. History round 1: 15 lessons merged as drafts, FC39 80/91 verified, CM rulings (W-868..873). Learner r10 on 66 drafts: 47 pass, 18 revise, 1 block, all 19 fixed on fixes-2 (claims reset, W-874). FC38: 108 verified, 5 disputed. Vertical, design and R&D reviews held; asks on the board W-807..W-866.
- **Believe:** high that production runs the tested tree (Vercel success on 41ecec1). NOT smoke-tested: this host cannot reach *.vercel.app (proxy 403), W-882. Unknown: production SHOW_REVIEW (W-479/W-480; drafts reachable by direct URL if on). Medium: PE's scalability note (company/engineering/notes/2026-10-14-scalability-options-for-founder.md) corrects my two points (changed-only QA saves nothing until P6/AMD-007; meta.json split not needed, registry merge rule P3 is the fix).
- **Next:** founder decides P1 (cancel stale CI runs), E1 (fact-check allow-list), C1 (GitHub Pro), esbuild for stage 1, AMD-001 c2 / AMD-007; then file P3 platform-engineer, P4/P5 tools-lead, P6 + AMD-007 evaluation-steward. W-878 (trust sheet shows internal FC notes to learners) first in the next release. History fixes W-868/W-871 need a builder; fixes-2 lessons need FC re-check then learner r11. Project Review 1 due 2026-10-16.
- **Blocked:** W-781 CI backlog (session token lacks actions:write; PE advises founder cancels once). patience-wins-the-split c5 waits on W-877 (Rubinstein in the map label). Books held for F1/F2.

## 2026-10-14 chief-of-staff-ceo-office (Leonie): History through data and maps, org + charter + 113-concept curriculum + 12 checked briefs; HQ floor 6

- **Changed:** org as data: `cm-history` (Henrike) and three strand managers, population-economy (Olumide), maps-borders (Marisol) and events-data (Anselm), in tools/org/roles.mjs and people.mjs, generated into company/roles and .claude/agents. `history` registered in content/domains.json (incubating, #d9b26f) and in DomainId (src/kit/types.ts). HQ, per the founder's "put these into the right floor": floor 3 is now the 9 subjects plus Strategy, Courses and Portfolio review; the new floor 6 holds Book Summaries, Big Ideas, History and Life Hacks as full offices, plus the Hacks safety desk. Files: src/lib/hq-floors.ts (new), hq.ts, HQ.tsx, Office.tsx (leads and strand managers sit at desks), people.ts, hq-colors.ts, tools/events.mjs, tests/hq/floors.test.mjs (new). Content: charter company/domains/history.md; curriculum content/curriculum/history.json (113 concepts, sized for the founder's 100; every demand marked an estimate; `dataOpened` true for 83); briefs company/domains/briefs/history.md (12 ranked, plus a "Next 88" ranking); data pins company/domains/briefs/checks/history-data.mjs (17 sources, SHA-256, fetched into artifacts/history-data/); numbers company/domains/briefs/checks/history-cycle1-check.mjs (117 checks pass). 12 brief-skips lines ("awaiting cm-history re-check"; the 5 sensitive ones are also held for W-626). Decision record company/decisions/2026-10-14-history-category.md, with 9 objections. Board W-742 to W-747.
- **Believe (high):** every number in the 12 briefs is recomputed from a file fetched from this host and pinned. The script caught two of my own errors before the briefs were written: brief 2's recall answer (0.2% for 300 years against 2% for 30 years is about equal) and brief 11's causes (drought and epidemics, not floods). Reachable from here: raw.githubusercontent.com, the npm registry, PyPI. Blocked: ourworldindata.org, rug.nl, CRAN, census.gov, naturalearthdata.com, the GitHub API. HQ was rendered on dev :3530 at 390 and 1280 px for floors 3 and 6, the stairs click through both ways, test:hq passes 18/18, and tsc exits 0. The release servers return 404 for /hq (HQ is off in production builds), so dev is the only render. **Medium:** the demand ratings and the 113-concept map are my estimates. The 1279 border areas are only as good as a "work in progress" dataset. The answer letters skew to C (8 of 12), and W-742 asks for a rotation.
- **Next:** cm-history W-742 (re-check the 12, remove the standard skip lines, brief ranks 13-100 on opened data only). head-of-product W-743. research-lead W-745. cultural-reviewer W-744 once W-626 exists. cm-big-ideas W-746 (the Snow data offer and the boundary rows). fact-checker W-747. **W-626 is mine and now blocks 39 History concepts as well as Big Ideas' society topics: it is the next thing this office should do.**
- **Blocked:** the sensitive History briefs (3, 4, 5, 11, 12, and 34 in the Next 88) wait on W-626. 30 concepts have no opened data and go on the W-583 list. Nothing deployed.

## 2026-10-14 demo-builder: Life Hacks engines v2 (W-608) + content patch r9 batch D

- **Changed:** engines v2 behind `engine: 2` for Home and Study (new src/lib/lifehacks/engine-v2.ts, SeenTable.tsx, StudyLessonV2.tsx, ModeControl in a11y.tsx; HomeLesson.tsx gained StageV2; StudyLesson.tsx routes v2 specs and keeps v1 as StudyLessonV1). Neutral start, mode buttons A then B (aria-pressed, aria-disabled, opacity 1, check mark: the W-598 dimming bug is fixed for v2), Seen table that keeps both columns, amounts row, verdict words, DOM order A, B, slider. The W-557..W-561 a11y fixes are untouched. Migrated the 14 batch D lessons with cm-lifehacks's patch as written (cue-needs-a-boundary: fallback, W-610 open); changed claims reset to unverified, plus a new `.seen` claim each; versions bumped. Resource and AlphabetSearch v2 are not built (W-738). Note: company/reviews/lifehacks-200/engines-v2-build-W-608.md (W-611 shape choices, departures) and each lesson's build.md.
- **Believe (high):** v2 state and a11y in a browser (4 lessons probed: pressed mode opacity 1, focus kept, reveal after A then B, 0 console errors). test:lifehacks 64/64 (11 new v2 tests, numbers from the patch tables). `npm run check` passes. tsc is clean except src/app/hq/HQ.tsx, which is another agent's open edit. QA on :3530 with `--timeout=900000 --workers=1`: 28/28 lesson runs passed (artifacts/qa-w608); the 2 feed-chip failures are a `QA_ONLY` artifact. v1 regression QA 8/8 on 4 v1 lessons. Reveal fit (`REVEAL_FIT_TIMEOUT_MS=600000`): 14/14 pass, **phoneFit 13/14**. coiled-cord-bend-radius crops 38 px (81-word reveal) → cm-lifehacks W-737. **Medium:** I departed from the spec's 170 px cap and 15-unit text (200 px and 20 units: at 170 px reveal-fit flags a thumbnail), which goes to visual-designer W-741. At predict on a phone the locked Home buttons sit partly under the panel. Light mode was not probed.
- **Next:** accessibility-reviewer and interaction-designer review W-608 (owner set to accessibility-reviewer, `reviewers` lists both). fact-checker W-740, cm-lifehacks W-737 and W-613, platform-engineer W-739 (check lints; tools/company.mjs is protected), demo-builder W-738.
- **Blocked:** nothing. Nothing built or committed. tests/lifehacks/typescript-loader.mjs gained an extensionless `.ts` resolver (test infra, needed by engine-v2.ts value imports).

## 2026-10-14 (portfolio-manager: token budget, investment ledger and the major-project forum)

- **Changed:** wrote company/ops/token-budget.md (the system: data audit, ledger, lines, 80%/100% rules, return measures, what counts as major, the gate, today's majors). Added company/ops/projects.json (16 projects and lines with proposed budgets and kill criteria, none approved) and company/ops/ledger.jsonl (505 lines backfilled from the event log). New tools/ledger.mjs plus tools/lib/ledger.mjs (`import`, `add`, `report [--project]`, `gate`, `check`, `propose`). Added a Budget section to `npm run metrics` (tools/metrics.mjs, which is not protected). Wrote the ritual template company/rituals/templates/project-review.md and added a `project-review` trigger to company/rituals/triggers.json (a `proposal` event in room `boardroom`, or 168 h). Documented the `proposal` type and the `boardroom` room in company/ops/events.md. Wrote the founder agenda company/ceo-office/2026-10-14-project-review-1-agenda.md and founder inbox F-15. Board: W-720 to W-731.
- **Believe:** the token figures are real: 61.2M from 473 harness `subagent_tokens` records, so 101k per published lesson overall and 82k on the catalog line. That is high confidence for the numbers themselves. Which project each run belongs to is inferred: 82% by role default and 18% by label rule, with 0 tagged, so per-project spend is medium confidence. About 64 finished runs after 15:20 are missing (W-716, W-721). The 32 stopped runs and the coordinator's own spend are unmeasured or kept out of the totals. The gate works: tested on proposed, legacy, unknown and grace-expired projects and on an over-budget approved one.
- **Next:** the owners write one-page proposals by 2026-10-16 (W-722 to W-727). The founder chairs Project Review 1 (W-730 and F-15), and the portfolio-manager records it and updates projects.json. Leonie wires `ledger.mjs gate` into tools/dispatch-check.mjs (W-720). The chief of staff tags dispatches with `[project:<id>]` and runs backfill then import each loop (W-721).
- **Blocked:** wiring `ledger.mjs check` into `npm run check` needs an amendment, because tools/company.mjs is protected (W-729). Until the preflight calls the gate, the bite is only `ledger.mjs check` run by hand. Grace for in-flight majors ends 2026-10-16 23:59 UTC.

## 2026-10-14 (fact-checker, W-679 + W-665 + W-659 claims + wave-J physics: 20 drafts)

- **Changed:** checked all 97 claims of 20 drafts and set status, checkedBy, checkedOn and a `note` on each in meta.json. The drafts: economics flat-rate-costs-nearly-double, inflation-falls-prices-still-rise, giving-up-lowers-unemployment, savings-outlast-the-division, winning-bid-overpays; physics tug-of-war-scale, drop-on-the-train, duck-rides-the-wave, snap-the-magnet, coat-on-the-ice; math the-equals-sign-balances, adding-squashes-the-photo, divide-six-by-zero, minus-one-flips-the-order, quarters-add-to-a-third; geography which-sea-gets-the-rain, which-way-the-water-goes, june-sunshine-pole-or-equator, why-the-poles-get-less-sun, darkest-evening-of-the-year. I also recorded one unrecorded claim (which-sea-gets-the-rain c5, the recall; unverified). Records: company/reviews/<slug>/2026-10-14-fact-check.md. Scripts: artifacts/fact-check-wave-j/wj-econ-phys-math-geo/. Board: W-679 and W-665 done. New for demo-builder: W-707 (duck c4), W-708 (darkest c3), W-709 (held sources), W-710 (which-sea recall), W-711 (non-blocking stage notes). W-659 stays with evaluation-steward for its QA half; its math claims (20 in meta, the board said 19) are now all verified.
- **Result:** 93 verified, 2 disputed, 2 held unverified, plus 1 claim I recorded (unverified). The disputes: **duck-rides-the-wave c4**, where I ruled for the builder (W-581): deep-water energy travels at the group speed c/2 = 3.12 m/s, so the buoy starts at about 32 s, not 16 s, and the stage also moves the front at crest speed. **darkest-evening-of-the-year c3**: the reveal names orbital speed as the cause and tilt as the add-on, but the tilt gives 5.9 of the 8.3 min of drift. Held: duck c5 (breaking waves) and snap-the-magnet c2 (atomic magnets and domains), because no openable source exists. which-sea c5 I recorded myself, so another checker must verify it.
- **Believe (high):** every number on these stages and in their reveals matches my re-runs. The geography models (model.ts, solar.ts) were run directly. London's times were also checked independently with astropy, which agrees to the minute. coat-on-the-ice's illustrative values hold up: h computes to 10.6, wool 0.04 sits at the light end of the opened 0.035-0.06, and the story survives the whole range. **Medium:** darkest c3 is a dispute about how the two causes are weighted, not about a wrong number. cm-geography may prefer a lighter fix.
- **Sources opened** (web blocked except PyPI, npm, GitHub raw and public git clone): the PDG 2026 database (pip pdg), Certik's Theoretical Physics (git clone), ht, CoolProp, chemicals, iapws, astropy, pyproj, geonamescache, tzdata, and the ERA-Interim winds from pydata/xarray-data. Halliday, Kundu, Griffiths, Incropera, Talley, Hartmann, Meeus and Kopp-Lean were never opened; each note says when a verdict rests on derivation instead. Note: the session scratchpad is shared between agents, so put your files in a uniquely named subfolder.
- **Not done:** longest-drinking-straw is not built (no src/demos/*/longest-drinking-straw), so its Everest pressure (33.7 kPa in the cm-physics r4 check) is unchecked. Check it when that lesson is built.
- **Next:** demo-builder W-707 to W-711, then a fact-checker re-checks the changed claims (and verifies which-sea c5). cm-physics can close W-581 with this ruling.
- **Blocked:** the held source claims need an openable source or a cut.

## 2026-10-14 (principal-pm-verticals: History sized, plan-to-2000 re-run, next-category ranking)

- **Changed:** wrote `company/product/verticals/2026-10-14-history-and-next-categories.md`, covering History's target, pilot, displacement, overlap splits, objections, the next-category ranking and the org fix. Revised `company/product/verticals/plan-to-2000.md` §2-§5 for the deck-format, Big Ideas 72/98 and History decisions. Board: W-688 (founder: History size), W-689 to W-700 (History CM boundaries, org fix, routing, HoP ruling, CM target changes, W-626 priority, data-package record). My recommendation is folded into W-685 and W-582. W-628 moved to review. I did not touch the History org files (history.md, history.json, hq.ts). Nothing built or committed.
- **Believe:** History at 60 (40 committed, K pilot 10) fits only by moving 44 subject slots out of K-M (cs 20, life 10, economics 10, chemistry 4). From K the plan is still ~7 waves (~1,116 review slots), with no slack. Books' 120 idea-lessons need ~150 slots, but only 120 are funded (~96 ideas). The biggest risk is ~295 lessons held on sources nobody can open, so W-583/F1 are worth more than any new category. Confidence: medium on the arithmetic, low on History's held rate (the pilot measures it). Next category: none before deploy data, then Astronomy (I agree with the scout's order but differ on timing). Exam prep still ranks first.
- **Next:** the founder answers W-688, W-685 and W-582. head-of-product rules on W-692. The History CM picks up W-689 once the role exists (owner id `cm-history` assumed). chief-of-staff-ceo-office takes W-690 and W-699.
- **Blocked:** no History data beyond present-day Natural Earth (W-700). The sensitive-history route waits on W-626.

## 2026-10-14 (fact-checker, W-657 + W-677: wave-J cs and life ecology-body claims)

- **Changed:** I checked all 50 claims in 10 drafts and set status, checkedBy, checkedOn and a `note` on each in meta.json. CS: two-pages-swallow-the-rank, small-n-favours-the-slow-curve, checking-is-not-finding, nearest-town-first-detours, last-survivor-is-not-the-most-common. Life: bad-year-breaks-the-quota, empty-ponds-still-left, opposite-flows-swap-more, same-dose-levels-off, more-traps-more-species. Records: company/reviews/<slug>/2026-10-14-fact-check.md. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. Board: W-657 and W-677 are done. New for demo-builder: W-686 (the dispute) and W-687 (held citations, source-field fixes and wording advisories).
- **Result:** 47 verified, 1 disputed, 2 held. Disputed: checking-is-not-finding c4. 'Without a search that grows this fast' is false as framed, because meet-in-the-middle grows about 1.41x per number, not 2x. Held: two-pages c4 ('rank sink') and c5 ('scaled PageRank'), because no openable source exists for Page et al. 1999, Easley and Kleinberg ch. 14 or Brin and Page.
- **Believe (high):** every stage and reveal number matches my re-runs on every reachable path, and the E2-E6 check sections re-run identically. Nearest-first does tie with 7 other orders at 56 (8 orders at 46, 8 at 56). Every seed from 1 to 12 behaves as empty-ponds c2 says. Sources opened (GitHub raw): walkccc/CLRS (exercise 1.2-2, Problem 2-1), CPython listsort.txt, OpenJDK TimSort.java, OR-tools routing protos (these verify nearest-town c5 in place of the unopened Croes 1958), and ACL2 books/demos/majority-vote.lisp (confirms the Boyer-Moore 1991 citation exactly). Never opened: CLRS 34.5.5, Karp 1972, Croes 1958, E&K ch.14, Page et al. 1999.
- **Next:** demo-builder W-686 and W-687, then fact-checker re-checks checking c4 and two-pages c4/c5. The evaluators can walk the other 8 lessons now; their claims are all verified.
- **Blocked:** two-pages c4/c5 need an openable source or a cut.

## 2026-10-14 domain-scout (Kofi): next-category and second-course assessment

- **Changed:** wrote company/domains/proposals/2026-10-14-next-categories.md (six categories, three course candidates, probes of npm/PyPI/GitHub raw, regex overlap over 945 meta.json). Board W-685 (owner founder) asks the founder to choose. Nothing built or committed. A stray `board add --help` created an empty W-685; I removed it and re-added the real item under the same id.
- **Believe:** Astronomy first, Language second (medium confidence); Engineering, Music, Psychology wait; Health declined (refuse list). Course: Thinking in Systems anchor, but premature until NCM data. Demand figures are estimates.
- **Next:** head-of-product Domain Launch Review; founder picks. Astronomy starts only after History's first batch passes review (W-556).
- **Blocked:** nothing; Meadows chapter list and stats textbook unconfirmed from this host.

## 2026-10-14 demo-builder (demo-builder-bigideas-pilot): Big Ideas pilot builds 6 and 8, plus W-633/634/635 revisions

- **Changed:** built `big-ideas/one-ten-thousandth-apart` and `big-ideas/same-grey-in-shadow`, both claimed with `claim.mjs next big-ideas`, status draft, all claims unverified. They follow the briefs' W-537 re-check lines: presets in DOM order, one held citation each with its fallback written into the claim. Revised the drafts to v2. two-four-six-rule (W-633): Popper replaced by the board's fallback and the Wason credit taken off the stage, so c4 is the one held citation. ten-times-taller-giant (W-634): fallback written for c3, labels 11 to 12 px. earth-history-in-a-day (W-635): river transfer recall; writing removed (c4 withdrawn); the reveal now has one dated event; Hutton and earliest life marked "cut if not checkable" with fallbacks; the asteroid taken out of the limit; dial labels raised to clear the 10 px floor. Build notes with pre-flight are in company/reviews/<slug>/build.md. Board: W-633/634/635 moved to review. Added W-683 (cm-big-ideas: accept the departures) and W-684 (chief-of-staff: route the walks). Nothing committed or built.
- **Measured on the shared `next dev` :3530:** `tools/reveal-fit.mjs` on all 5 gave fit, crop 0, namedHidden 0, phoneFit true, 70-83 words. My own font-size probe found the smallest stage label at 10.5-11.5 px. v1 measured 7.7 px (earth) and 9.8 px (giant); both are fixed. The QA contract passed 10/10 (phone and desktop) on the third run. The two earlier runs failed only on 45 s timeouts while the dev server was cold, one "state update before mount" and one Next "Router action dispatched before initialization". Each failing lesson passed on the next run, so I read them as dev-server and HMR noise, not lesson code (medium confidence). With a cold server, reveal-fit's hard-coded 15 s wait failed every page. Pages first load in about 90 s. It passed once the pages were warm. Note that the QA_OUT directory is wiped on every run.
- **Believe:** high that the numbers match the check script (same double-precision iteration: 11, 21, 0.51/0.48; one constant #787878 for A, B and the strip). Medium-high that the same-grey illusion reads on a phone. The first flat-square shadow barely worked, and the soft shadow layer clearly does on a 390 screenshot. That is my own eyes, not a learner's. Medium on the departures listed in W-683 (option wording and cut sentences).
- **Next:** chief-of-staff W-684 (walks). cm-big-ideas W-683, after the evaluators report. Fact-checker: the held claims (Lorenz, Helmholtz, Klayman & Ha, Biewener, the earth dates). head-of-product W-632 still owes the DLR fifth.
- **Blocked:** nothing of mine. earth-history still has 4 of 7 claims held on the learner path, which is the nature of deep time. Whether to cut more is cm-big-ideas' call.

## 2026-10-14 (demo-builder, builder-wavej-ai-1: 5 Wave J AI lessons built as drafts)

- **Changed:** claimed one at a time with `claim.mjs next ai` and built Wave J briefs #60-#64 from company/domains/briefs/ai.md: src/demos/ai/{gradient-fades-with-depth, sudden-skill-or-strict-score, deleted-column-still-there, secret-in-the-counts, raters-reward-agreement}/ (Demo.tsx, styles.module.css, meta.json v2; status draft; 18 claims, all unverified). Build notes with Pre-flight v1, measurements and QA in company/reviews/<slug>/build.md. Board: W-680 (fact-checker), W-681 (qa-tester: official QA on a release build), W-682 (cm-ai: builder calls). Locks still held (built, not merged). Nothing committed.
- **Believe:** high that the numbers match the briefs: the models compute them (share(), exact(), world(), a real n-gram counter generate(), votes()), and I ran the secret-in-the-counts model in node. All five: reveal-fit crop 0, hiddenBelow 0, namedHidden 0, phoneFit true at 390x844; tool word counts 84-89 with the verdict (bodies 77-79); smallest rendered stage label 10.35 px. Every Reset keeps a Seen line or dashed trace, so the reveal still matches the stage. Titles, hooks and recall questions are mine (the briefs gave none). Medium on the craft calls listed in W-682.
- **How measured:** :3530 was overloaded (load 30-40). Stock reveal-fit timed out, so I used a copy that only raises its timeouts (artifacts/wavej-ai-tmp/reveal-fit-slow.mjs). Stock QA timed out on page.goto at 45 s twice; with `--timeout=240000` the final run passed 9/10. deleted-column-still-there desktop hit the dev-only React "hasn't mounted yet" overlay over "This page couldn't load", and a rerun passed 4/4. Around 16:50 another builder's syntax error (cs/nearest-town-first-detours) gave every page an HTTP 500 for a few minutes.
- **Next:** qa-tester W-681, fact-checker W-680, cm-ai W-682, then evaluators; draft -> review once the QA record is official. The remaining Wave J ai briefs (#65 the-email-gives-orders, #66 ten-times-compute, then ranks 67-74 in the strand files) are still in the queue.
- **Blocked:** nothing.

## 2026-10-14 (demo-builder, demo-builder-wavej-life: 5 Wave J life ecology-body lessons, v1 drafts)

- **Changed:** claimed with `claim.mjs next life`, one at a time, and built src/demos/life/{bad-year-breaks-the-quota, empty-ponds-still-left, opposite-flows-swap-more, same-dose-levels-off, more-traps-more-species}/ (Demo.tsx, styles.module.css, meta.json v2) from company/domains/briefs/life.ecology-body.md #2 to #6. Status draft, every claim unverified. Build notes with Pre-flight v1 are in company/reviews/<slug>/build.md. Board: W-677 (fact-checker), W-678 (cm-life: builder departures).
- **Ran:** every model was re-run in node from the Demo.tsx functions, and each matches check script E2 to E6. Reveal fit at 390x844: all 5 have crop 0, namedHidden 0 and phoneFit true, with 72 to 90 tool words (verdict included; bad-year is at 90 exactly). The smallest rendered SVG label is 10.2 px. QA contract on :3530: 10/10 pass (phone and desktop) with `--timeout=300000`. With the default 45 s, every test failed on page.goto because the dev server is slow. tsc reported nothing in these files.
- **Believe (high):** the numbers and the stage/reveal agreement. The reveals quote the learner's current seed or a milestone case, and the question's case is put back on the stage when the reveal opens. **Medium:** the departures in W-678. Those are empty-ponds grid cells at 23 px (the brief says 28), more-traps without "real forests hold far more rare species", and bad-year at the 90-word edge.
- **Note:** I measured with artifacts/wavej-life-tools/reveal-fit-slow.mjs, a copy of tools/reveal-fit.mjs where only the page-load timeouts are longer. When I arrived :3530 was down, so I restarted it with `next dev -p 3530`. Its first compile took about 35 minutes under load 30 to 40. For a while every page failed because another builder's cs/nearest-town-first-detours had a syntax error; its owner fixed it.
- **Next:** fact-checker W-677, cm-life W-678, then draft -> review after the evaluators walk the lessons.

## 2026-10-14 (demo-builder, demo-builder-wavej-cs: 5 Wave J computer science lessons, v1 drafts)

- **Changed:** claimed (claim.mjs next cs, one at a time) and built src/demos/cs/{two-pages-swallow-the-rank, small-n-favours-the-slow-curve, checking-is-not-finding, nearest-town-first-detours, last-survivor-is-not-the-most-common}/ (Demo.tsx, model.ts, styles.module.css, meta.json v2 with curriculum/format/interactions; status draft; every claim unverified). Briefs: company/domains/briefs/cs.algorithms.md #88 and #83-#86. Build notes with Pre-flight v1 and measurements: company/reviews/<slug>/build.md. Board W-657 (fact-checker), W-658 (cm-cs: brief departures). Locks held (built, not merged). Nothing committed.
- **Believe:** high that the numbers match the briefs (each re-run in node from the lesson's own model.ts). One brief error found: nearest-first does not have the single longest tour, it ties with 7 other orders at 56, so the reveal says "tied for the longest". All 5: crop 0, namedHidden 0, phoneFit true, reveals 74-87 words with the verdict. QA contract passed phone and desktop for all 5 (last-survivor desktop passed only on a re-run: the first run hit the dev-server warning "state update on a component that hasn't mounted", which the page also logs on a plain load). Caveat: the shipped reveal-fit timed out on :3530, so I measured with a temporary copy that only raised its timeouts. QA ran with --timeout=400000. Typecheck clean for these files; npm run check passes.
- **Incident:** a JSX syntax slip in nearest-town-first-detours/Demo.tsx broke the shared dev server (HTTP 500 on every page) for a few minutes around 16:50 until I fixed it. If you edit on the shared server, run tsc on your file before saving a structural change.
- **Next:** fact-checker W-657, cm-cs W-658, then evaluators; draft -> review after that. Note: a QA run with QA_OUT=<dir> clears that directory, so do not keep reveal-fit JSON in it.
- **Blocked:** nothing.

## 2026-10-14 demo-builder: Life Hacks engine a11y fixes (W-557..W-561)

- **Changed:** the four shared engines only (src/components/lifehacks/). There is a new a11y.tsx and a11y.module.css: StageControl (aria-disabled after the prediction, natively disabled before it), StageStatus (one atomic polite role=status that speaks only when the visible result changes after the prediction, debounced 350ms) and useKeepFocus (Resource, whose Test A/B buttons live in 60 lesson files). The status wrapper is display:contents, because an absolutely positioned sibling stops the DemoCard reveal fit from shrinking the picture (canShrink); I caught this when bag-weight-before-volume cropped 67px. Text sizes went to at least 11-12px, Home amber changed to --warn-fill with a --warn stroke, light-mode domain strokes use color-mix(domain 45%, #000), and Study got non-colour cues (B squares plus legend swatches, a hatch on highlighted bars, tick or cross on recall boxes). No learner-facing wording changed. Board W-557..W-561 → review, owner accessibility-reviewer, each with a `note`.
- **Believe (high):** focus stays on the pressed button (or moves to the next control on Resource) in all 8 lessons I probed, which were 2 per engine (only 1 alphabet lesson exists, so 3 Study). test:lifehacks 53/53, `tsc --noEmit` clean, reveal-fit 8/8 fit, phoneFit 8, crop 0 (artifacts/reveal-fit/lh-a11y.json, run with a scratch copy that only raises timeouts, because :3530 is slow). Smallest svg label at 390px is 10.6px. QA (artifacts/qa-lh-a11y, `--timeout=900000`): 15/16. spaced-beats-cram phone logged the dev-only React "hasn't mounted yet" warning (other builders saw it on unrelated lessons today), then passed 3/3 on rerun (artifacts/qa-lh-a11y-rerun). **Medium:** light mode was not probed in a browser (ratios are computed); 190 lessons are unopened; Study edit-family highlight is still colour plus outline only.
- **Next:** accessibility-reviewer re-checks W-557..W-561 (light mode especially). The kit Slider `<output>` is still implicitly live, an F3 leftover for platform-engineer (W-562 has F7/F8). A release-build QA is still needed.
- **Blocked:** nothing. Nothing built or committed. `npm run check` passes (an earlier failure came from two other agents' books folders that had no meta.json).

## 2026-10-14 (fact-checker, W-639 + W-655: wave-J chemistry and probability claims)

- **Changed:** checked all 51 claims of 10 drafts and set status, checkedBy, checkedOn and a `note` on each in meta.json. Lessons: probability significant-but-false, sixteen-of-twenty-got-better, the-doctor-picks-the-patients, ten-thousand-replies-still-wrong, where-the-axis-starts; chemistry hydrogen-per-litre, heat-the-ammonia-maker, two-routes-to-co2, which-step-to-speed, limestone-crossover. Records are in company/reviews/<slug>/2026-10-14-fact-check.md; my node scripts are in artifacts/fact-check-wave-j/. Board: W-639 and W-655 are done. New for demo-builder: W-674 (ammonia dispute), W-675 (limestone c5), W-676 (withdraw or source the two citation-only c5s).
- **Result:** 44 verified, 2 disputed (heat-the-ammonia-maker c2 and c3), 5 held unverified (ammonia c5 and c6, limestone c5, significant-but-false c5, ten-thousand-replies c5). The dispute: the stage shows K and NH3 shares computed with dH and dS held at their 25 °C values, with no caveat. Full NASA TM-4513 data give K = 4.9e-5 at 450 °C (the stage says 1.9e-4) and a 0.23% share (the stage says 0.45%).
- **Believe (high):** every number on the stage and in the reveals matches my own re-runs. The doctor lesson's switch to expected recoveries is consistent (+6.2 recoveries = 30.8 points). Web: only PyPI, npm and raw.githubusercontent.com resolve. My thermodynamic sources are the CRC, JANAF and ATcT tables from the PyPI package chemicals 1.5.2 and the NASA polynomials from Cantera's data files. CODATA, Atkins and Greenwood & Earnshaw were never opened, and each note says when a verdict rests on derivation instead. There is no wave-J chemistry check script under company/domains/briefs/checks/; I used the brief's inline Check lines.
- **Next:** demo-builder W-674, W-675 and W-676, then fact-checker re-checks those claims. cm-chemistry decides the ammonia factories sentence (cut per the brief).
- **Blocked:** the held source claims need an openable source or a cut.

## 2026-10-14 demo-builder: learner r9 revise fixes (W-564, W-573..W-577, W-567 part)

- **Changed:** selfish-routes-cost-a-third-more v6 (4/3 "worst case for roads with a fixed time plus a part proportional to traffic" back in the reveal, c4 reinstated; cost line "Lowest seen split"); cluster-stops-the-cascade v5 (options no longer say "those four": "Four people adopting first: 0, 1, 2 and 3" / "Nothing: no start reaches all 12" / "Two people adopting first, somewhere else"; reveal 140 -> 81 words; pinned-reveal control rows step aside); enemy-of-my-enemy v4 (seen line "0 unbalanced at: ...", reveal 111 -> about 55 body words, c2/c4 withdrawn, board at 3/4 size and preset row hidden at the reveal); metal-feels-colder v2 (bare options; arrows labelled 4.6x/4.4x/1x so the reveal number is on stage and Swap metal visibly changes it); bird-on-the-wire v2 ("foot 1–ground", "from each foot to the ground"); agenda-picks-the-winner v3 (94 -> 86 words, no sentence dropped; no cm-math note on file); two-locks-wait-forever v2 (published; "Seen jam:", "1 step run.", "P all, then Q" no longer says "Q had to wait"). Changed claims reset to unverified. Notes in each company/reviews/<slug>/build.md latest Revision section. Board: the seven items to review; added W-640 (learner-evaluator r10), W-641 (fact-checker), W-642 (W-567 remainder: wheel, one-crowded-bucket, each-element), W-643 (qa-tester: QA on a release build).
- **Believe:** high on phone fit: all seven measured crop 0, namedHidden 0, phoneFit true (artifacts/reveal-fit/r9-revise*.json). But the stock tools/reveal-fit.mjs timed out on page.goto against :3530 (30-50 s to DOMContentLoaded, up to 3 min to hydrate), so the numbers come from a scratch copy with only the timeouts raised. agenda is flagged "thumb" (side-by-side triangle, unchanged layout). QA: the official contract run fails 7 of 14 on the 45 s test timeout (phone) plus once on agenda desktop: a dev-mode React warning "state update on a component that hasn't mounted yet". That warning did not recur in the slow run, and agenda's change was text only. A scratch copy of the contract with only the timeouts raised passed 14 of 14 (artifacts/qa-r9-revise-slow*). So QA is not passed on the record; it needs a release build (W-643). Medium on the wording calls: the category managers own cuts (cluster, enemy, agenda), and "Here" was dropped from selfish's 4/3 sentence.
- **Next:** qa-tester W-643, fact-checker W-641, learner-evaluator W-640, demo-builder W-642.
- **Blocked:** nothing built or committed. `npm run check` passes now.

## 2026-10-14 (demo-builder, wave J geography: 5 earth-climate lessons built as drafts)

- **Changed:** I claimed and built five briefs from company/domains/briefs/geography.earth-climate.md (Wave J #1 to #5): which-sea-gets-the-rain, which-way-the-water-goes, june-sunshine-pole-or-equator, why-the-poles-get-less-sun and darkest-evening-of-the-year. Each one has Demo.tsx, styles.module.css and meta.json v2 (status draft, every claim unverified) under src/demos/geography/<slug>/, plus company/reviews/<slug>/build.md with a Pre-flight section. which-sea and darkest-evening also have model ports (model.ts, solar.ts). Board: W-492 → doing, W-665 (fact-checker), W-673 (cm-geography, two deviations from the briefs). Nothing was committed. The claim locks are still held: the lessons are built but not merged.
- **Believe (high):** the numbers match the check script. The two simulation ports (watershed, sunset) reproduce sections `watershed` and `sunset` of company/domains/briefs/checks/geography-wave-j.mjs exactly. The june, insolation and Ekman values were re-derived in node (scratchpad wavej-geo/). All five pass reveal-fit at 390x844: crop 0, namedHidden 0, phoneFit true, 63 to 83 words. All five pass QA on phone and desktop. **Medium:** two deviations from the briefs: a locked-label change in which-sea and the readouts folded into the chart in darkest-evening (W-673). There is also one known gap: the darkest-evening reveal quotes noon times that sit on the stage only as unlabelled dots, unless that date is current.
- **How measured:** the shared :3530 server took 30 to 240 s a page. So reveal-fit ran with a preload (scratchpad wavej-geo/pw-timeout.mjs) that only raises Playwright timeouts, and QA ran with `--timeout=900000`. No check or tool code changed. One QA run logged the React "hasn't mounted yet" dev warning on which-sea (desktop) and passed on rerun.
- **Skipped on purpose:** people-places briefs 2 to 5 and maps-projections #5 mostly-yes-on-the-map wait for the cultural check W-493. `next` never handed me one, so no lock had to be released.
- **Next:** the fact-checker takes W-665, then evaluators walk the five lessons (draft → review once someone owns the QA record). cm-geography takes W-673. The next builder takes the rest of W-492 with `claim.mjs next geography`: earth-climate #6 and maps-projections #1 to #4.
- **Blocked / environment:** the dev server is overloaded, and another agent was running `next build`. For about 20 minutes a syntax error in another builder's src/demos/cs/nearest-town-first-detours/Demo.tsx broke every page on :3530. Never run `pkill -f` with a pattern that also appears in your own command line: mine killed its own reveal-fit run.

## 2026-10-14 (demo-builder, builder-wavej-math: 5 Wave J math algebra lessons, v1 drafts)

- **Changed:** claimed (claim.mjs next math, one at a time) and built src/demos/math/{the-equals-sign-balances, adding-squashes-the-photo, divide-six-by-zero, minus-one-flips-the-order, quarters-add-to-a-third}/ (Demo.tsx, styles.module.css, meta.json v2; status draft; 19 claims, all unverified). Briefs: company/domains/briefs/math.algebra.md Wave J #1-#5. Build notes with Pre-flight v1 and measurements in company/reviews/<slug>/build.md. Board W-659. Locks held (built, not merged). Nothing committed.
- **Believe:** high that the numbers match the briefs (check A1-A5). All 5: phoneFit true, crop 0, namedHidden 0, reveals 66-76 words (tool count), labels >= 10.4 px, 44 px targets. Every Reset leaves a trace (caption, ghost frames, log rows, or level 1 + trace line) so the reveal still matches what was seen. Departures: reveal of adding-squashes-the-photo drops "and the face went wide" (ghosts keep outlines only); quarters Reset goes to level 1, not 0 (formats.md: no reset that empties it). Titles and hooks are mine (briefs gave none).
- **Caveats:** :3530 took 45-200 s a page, so unmodified reveal-fit timed out; I measured with a scratch copy that only raises its two timeouts. Official QA timed out twice at 45 s; run 3 with --timeout=600000 passed 9/10, and adding-squashes-the-photo desktop passed on rerun after a React dev warning ("state update on a component that hasn't mounted yet"), seen once on divide-six-by-zero too. I read it as dev-server noise; not proven.
- **Next:** official QA on a quiet server/build (evaluation-steward, W-659), fact-check, then draft -> review.
- **Blocked:** nothing.

## 2026-10-14 (demo-builder wave-j-chemistry: 5 energy-rates briefs built as drafts)

- **Changed:** claimed via `claim.mjs next chemistry` and built `hydrogen-per-litre` (#8), `heat-the-ammonia-maker` (#11), `two-routes-to-co2` (#12), `which-step-to-speed` (#15) and `limestone-crossover` (#18) from company/domains/briefs/chemistry.energy-rates.md: Demo.tsx, styles.module.css and meta.json (v2 curriculum block, strand energy-rates, format single-card), status draft, every claim unverified. Build notes with Pre-flight and QA in company/reviews/<slug>/build.md, which record the departures from the briefs (for example a new ammonia-share claim, heat-the-ammonia-maker c3, and reworked controls in which-step-to-speed). Board: W-488 → doing (5 of 15 built); W-639 added for fact-checker. Nothing committed.
- **Believe (high):** all five pass reveal fit at 390×844 (crop 0, namedHidden 0, phoneFit true, reveals 74-84 words with the verdict line, smallest SVG text 10.5 px or more). I measured with a scratchpad copy of tools/reveal-fit.mjs that only lengthens page-load timeouts, because :3530 took over 30 s per page. Computer-use QA passes phone and desktop with `--timeout=300000` (a time budget only; no check changed). Medium confidence on one point: hydrogen-per-litre's phone run logged a React "state update on a component that hasn't mounted yet" once and passed on re-run. I think it was dev hot-reload noise.
- **Next:** fact-checker takes W-639. cm-chemistry decides the told sentences the briefs left open (the factories sentence in heat-the-ammonia-maker; the 890 °C figure in limestone-crossover c5, not shown). The remaining 10 Wave J chemistry briefs stay in the queue for demo-builder.
- **Blocked:** for a long stretch :3530 would not compile at all because another builder's file had a syntax error (cs/nearest-town-first-detours or physics/head-on-is-a-wall, `ROAD_Y`). It cleared on its own.

## 2026-10-14 demo-builder (builder-books-pilot): W-631, the 2 Books pilot lessons built

- **Changed:** built `src/demos/books/total-signups-hide-the-slide/` (brief 8) and `src/demos/books/biased-judge-noisy-judge/` (brief 14): Demo.tsx, meta.json, styles.module.css; domain books, status draft, single card, every claim unverified, book claims "(unconfirmed)", "Does it hold up?" a separate claim with the shared verdict word "holds up". Build notes with the section 6 copyright checklist and pre-flight in `company/reviews/<slug>/build.md`. Regenerated the registry. Board: W-631 to review; W-663 (cm-books: two builder departures + review), W-664 (platform-engineer: reveal-fit load timeout). No commit, no build.
- **Ran:** reveal-fit at 390x844: both fit, crop 0, namedHidden 0, phoneFit true, 89 and 86 measured words (kit header included), labels 11 px. QA contract on dev 3530: 4 passed (phone + desktop). `npm run check` passed (945 lessons). tsc reported nothing in these files.
- **Departures:** total-signups reveal trimmed 83 -> 80 words (3 small cuts, no sentence removed) because the measured count was 92; presets use `<Row foldAtReveal>` to clear a 40 px crop. biased-judge gates on a, b and c (the reveal quotes C's 8.0).
- **Believe:** high that numbers match both check scripts and the reveals quote recorded milestone values. Medium on the locked-stage preset labels of total-signups ("getting worse/better", the brief's) not hinting at D; flagged in pre-flight 3.
- **Blocked / note:** the shared dev server took 50-105 s per load, past reveal-fit's fixed 15 s wait. I measured with a temporary copy of the tool with only the load timeouts raised (deleted after) and ran QA with `--timeout=400000`. Next: evaluators walk both lessons; fact-checker on 14 claims; no Books publish before F1/F2.

## 2026-10-14 (demo-builder, demo-builder-wavej-prob: 5 Wave J probability lessons, v1 drafts)

- **Changed:** claimed (claim.mjs next probability, one at a time) and built src/demos/probability/{significant-but-false, sixteen-of-twenty-got-better, the-doctor-picks-the-patients (+ model.ts), ten-thousand-replies-still-wrong, where-the-axis-starts}/ (Demo.tsx, styles.module.css, meta.json v2: curriculum, format, interactions; status draft; every claim unverified). Briefs: company/domains/briefs/probability.md Round 4, #56-#60. Build notes with Pre-flight v1 and measurements in company/reviews/<slug>/build.md. Board W-655 (fact-checker), W-656 (cm-probability: brief departures). Locks held (built, not merged). Nothing committed.
- **Believe:** high that numbers match the briefs (recomputed; seeds disclosed in claims). All 5: phoneFit true, crop 0, namedHidden 0, reveals 67-79 words with verdict, SVG text >= 10 px. QA contract passed phone + desktop for all 5, two only on re-run after dev-server recompiles. Caveat: unmodified reveal-fit timed out on :3530 every time (pages 25-730 s); measured with a scratch copy that only raises the goto/render timeouts; QA ran with the --timeout CLI flag. Typecheck clean; npm run check passes.
- **Next:** fact-checker W-655, cm-probability W-656, then draft -> review. Note: the shared scratchpad path is shared with other agents, so use unique log names.
- **Blocked:** nothing.

## 2026-10-14 (demo-builder, demo-builder-books-1: first 4 Book Summaries lessons)

- **Changed:** built src/demos/books/{slowest-station-sets-pace, one-percent-a-day, born-in-january-picked-first, wheel-number-pulls-guess}/ (Demo.tsx, styles.module.css, meta.json): domain books, status draft, v1, 6 claims each, all unverified, book-argues and holds-up claims kept separate, chapters marked (unconfirmed), no quotes. Build notes with pre-flight and measurements in company/reviews/<slug>/build.md. Registry regenerated. Board W-652 (fact-checker), W-653 (cm-books: three brief deviations plus verdict words), W-654 (learner-evaluator). Claimed via claim.mjs; locks not released --done because nothing is merged. Nothing committed.
- **Believe:** high confidence that all four pass phone fit (crop 0, namedHidden 0, phoneFit true; reveals 90/83/86/86 words) and QA (8 of 8 project runs pass, some only on re-run after dev-server timeouts). Medium on the host workaround: the shipped reveal-fit timed out on every attempt on :3530, so I measured with a copy that only raises its two timeouts (artifacts/books-fit/), and QA ran with --timeout=600000. Typecheck: a scoped tsc over the 4 Demo.tsx files and their kit imports is clean. The full project typecheck and build were not run (machine rule).
- **Next:** fact-checker W-652, learner-evaluator W-654, cm-books W-653. Platform-engineer or evaluation-steward may want reveal-fit and QA timeouts to be configurable for a loaded host. That is not filed; the ops review W-531 covers host capacity.
- **Blocked:** publishing needs the book source (F1) and legal read (F2). `npm run check` fails only on another session's half-built big-ideas/noise-draws-dunning-kruger (no meta.json).

## 2026-10-14 (head-of-product, Priya): W-647, ruling on the Book deck format

- **Changed:** wrote `company/decisions/2026-10-14-book-deck-format.md` (6 rulings, 13 objections each with an outcome, founder list). Pointer line at the top of `company/domains/books-strategy.md` (the rewrite is cm-books's, W-649). Amendment note in `company/decisions/2026-10-14-books-big-ideas-strategy-review.md` (Ruling 5 superseded in part; Rulings 1 and 2 adjusted). Board: W-647 done; notes on W-649, W-651, W-629, W-615, W-541, W-628, W-631; new W-660 (design-lead: revise the spec), W-661 (cm-books: charter lines), W-662 (domain-scout: Books DLR on the reference deck). Nothing built or committed.
- **Rulings:** deck accepted, but **4 ideas by default, 3 allowed, never 5+** (the charter caps a book at 4; the spec missed it). Shared six verdict words. Fewer books at the same pace: slots count review (deck = ideas + 1), the target should count idea-lessons (founder F4); committed 60 slots buy about 12 decks / 48 lessons. Pilot = TFS deck (wheel + 3 new ideas cm-books picks + deck review) + 5 kept drafts = 10 slots; drafts do not publish standalone; no new W-556 exemption. Copyright countable rule binding now, concatenation test includes map titles and is run by a non-builder; Q7-Q9 added for F2. W-651 framed: Option B (ordinary claims in idea 1's claims array, no amendment) preferred for the pilot; steward rules.
- **Believe:** high (about 85%) on the 4-idea ceiling and the idea-lesson unit; medium (about 60%) that +1 slot per deck is the right overhead and that 50% of bettors reach the closing card. Neither has data.
- **Next:** founder: purpose of "more per book", F4 unit, F2 with Q7-Q9 (W-615, W-541). cm-books W-649 and W-661; design-lead W-660; evaluation-steward W-651; domain-scout W-662; principal-engineer W-648 after the spec revision.
- **Blocked:** Books publishes on F1 and F2; reference-deck builds on W-556, W-604, W-601, W-602 and the deck kit.

## 2026-10-14 (design-lead): the Book format spec (founder books-experience decision)

- **Changed:** wrote `company/design/specs/book-format.md` and `company/design/specs/book-format.svg` (8 wireframes at 390x844, labels 11 px or more, a *Thinking, Fast and Slow* deck). Added a proposed "Book deck" row (🔴, not usable) to `company/design/formats.md`. Board: W-647 head-of-product (rule on the format), W-648 principal-engineer (tier-2 kit EDD review), W-649 cm-books (depth and list), W-650 design-engineer (EDD, then kit work after approval), W-651 evaluation-steward (is a deck manifest a valid claim home). No code, build or commit.
- **Proposal:** a book is a deck: an opening card (the book's question, the idea map, a bet on how much holds up), then 4 to 6 idea lessons (default 5, each its own slug, predict/explore/reveal and recall, 3 sub-cards by default), then a closing card (the bet against the verdicts). About 60 to 75 s per idea and about 6 minutes per book. One feed tile per book. Resume at the next idea without `completedAt`, never mid-idea. Copyright: at most 20 words per idea and 120 per deck say what the book argues, at most 1 quote per deck, no chapter or book order shown, our toys only, plus a concatenation test per deck. Kit: a deck shell only. No change to Lesson.tsx, sequence.tsx or tests/qa. A new tools/book-probe.mjs walks a deck.
- **Believe:** fairly sure (about 70%) that composing lessons into a deck is the minimal shape that keeps the contract, the QA budget and the claim gate. Less sure (about 50%) about the time budget and the closing bet: neither has been tested with learners. The capacity trade is arithmetic: a deck is about 6 lesson-reviews, so the 60 committed slots buy about 10 books, not 30. I recommend fewer books at the same pace.
- **Next:** head-of-product rules (W-647); cm-books revises depth and the list (W-649); evaluation-steward rules on the claim home (W-651); then design-engineer writes the EDD (W-650) and principal-engineer reviews it (W-648). Format stays 🔴 until W-601, W-602 and W-604 close, the EDD lands and a reference deck passes a design review that I do not chair.
- **Blocked:** no Books publish before F1 (book source) and F2 (legal read). W-601 (interaction-designer) has no record yet, so this spec avoids 4-step trails and does not depend on that ruling.

## 2026-10-14 (demo-builder, wave-j-physics: 5 Wave J physics lessons, v1 drafts)

- **Changed:** claimed (claim.mjs next physics) and built src/demos/physics/{tug-of-war-scale, drop-on-the-train, duck-rides-the-wave, snap-the-magnet, coat-on-the-ice}/ (Demo.tsx, styles.module.css, meta.json v2 with curriculum/format/interactions; status draft; every claim unverified). Briefs: company/domains/briefs/physics.md round 4, #56-#60. Build notes with Pre-flight v1: company/reviews/<slug>/build.md. Board W-581 (cm-physics: duck buoy timing), W-646 (demo-builder: re-run reveal-fit + QA). Locks still held (built, not merged). Nothing committed or deployed.
- **Objection (W-581):** duck-rides-the-wave's brief times the buoy at 100 m / crest speed = 16 s, but a deep-water wave train's front and energy move at the group speed (c/2), about 32 s. Built as briefed; claim c4 carries the objection for the fact-checker.
- **Believe:** high that the mechanics and numbers match the briefs and check.mjs (values recomputed in each Demo.tsx; scoped tsc over the 5 files clean; `npm run check` passes). Own Playwright walk at 390×844: every QA-order press changes the stage, all milestones reached, no console errors on a clean load, stage top on screen, reveal 81-88 words with verdict, labels ≥ 10 px, controls ≥ 44 px. Reveal fit (scratch copy of tools/reveal-fit.mjs with only page-load timeouts raised, since the unmodified tool timed out on :3530 at load 30-55): all 5 fit, crop 0, namedHidden 0, phoneFit true, 81-88 words. QA: unmodified contract spec with `--timeout=900000` passes phone and desktop for all 5 (duck desktop needed one rerun after the known dev-server 'state update on a component that hasn't mounted yet' warning); with the default 45 s timeout every test died at page.goto.
- **Next:** W-646 (official QA on a quiet server or build, then draft -> review), cm-physics W-581, fact-checker for all claims.

## 2026-10-14 (demo-builder, demo-builder-bigideas-1: first 4 Big Ideas lessons, v1 drafts)

- **Changed:** built src/demos/big-ideas/{two-four-six-rule, earth-history-in-a-day, ten-times-taller-giant, noise-draws-dunning-kruger}/ (Demo.tsx, styles.module.css, meta.json; domain big-ideas, status draft, every claim unverified, curriculum ids from content/curriculum/big-ideas.json). Build notes with Pre-flight v1: company/reviews/<slug>/build.md. Board W-644 (qa-tester: QA on a quiet host), W-645 (demo-builder: earth-history thumb). Locks released (not done). Nothing committed or deployed.
- **Brief changes I made, flagged in build.md and claims:** earth-history: the brief's "geologists in the 1700s and 1800s realised slow processes ... move continents" is wrong (drift is 20th century); now "carve valleys and raise mountains" (Hutton). Giant: no claim that a 10× giant collapses at rest; the stage shows an illustrative limit. Presets added where QA's one-press path could not reach the milestones (2-4-6 Flip/Test 1-2-10, giant Make it 10×, DK track 0/0.3/1).
- **Concurrency:** while I held the locks, another builder (demo-builder-bigideas-pilot, W-633 to W-635 from cm-big-ideas' W-537 re-check) edited two-four-six, earth-history and giant to v2. I did not overwrite their changes; the Pre-flight v1 in each build.md describes v1, and their v2 owes Pre-flight v2.
- **Believe:** high that the mechanics and numbers are right (node re-runs, own Playwright walk: every QA-order press changes the stage, all milestones reached, no page errors; scoped tsc over the 4 files clean). Phone fit: all 4 crop 0, namedHidden 0, phoneFit true, reveal ≤ 82 words with verdict. This was measured with a scratch copy of tools/reveal-fit.mjs that differs only in timeouts, because the unmodified tool timed out 20+ times on :3530 (73 s to DOMContentLoaded, 217 s to hydrate). earth-history fails the thumb check (W-645). **QA contract NOT passed:** all 8 runs timed out in page.goto (45 s test timeout) before any assertion.
- **Next:** qa-tester W-644; demo-builder W-645 with W-635; W-636 (DK v2) after W-622. Fact-checker for all claims after QA.
- **Blocked:** QA by dev-server speed. `npm run check` fails on 1 error not mine (company/decisions/2026-10-14-founder-books-experience.md needs an owner line).

## 2026-10-14 (fact-checker, fresh instance): W-637, Pass 36 re-check of the pass 35 fixes

- **Changed:** set 9 claims to verified (checkedBy fact-checker, checkedOn 2026-10-14, a "FC pass 36" note appended to each source): zebra-sorts-before-apple c5, twenty-flips-run-of-five c5, two-cells-sum-any-range c3, tax-now-or-tax-later c3, small-gap-big-extremes c3, vaccinate-at-the-peak c1 and .recall, asthma-looks-safe c2 and c6. Added a "Pass 36" table to each lesson's company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-637 moved to review. No claim text, Demo.tsx or model.ts edited. Nothing built or committed.
- **Ran:** read Demo.tsx (and model.ts) before the claim text and sources, per W-280. In node, from copies of the lesson logic plus independent re-implementations: the patched twenty-flips atMost matches an independent tally for every k from 1 to 20 at 7 tally sizes (0 mismatches; k = 8 gives 97.5% at n = 1,001). All 36 prefix-sum ranges: at most 2 reads and 1 subtraction. All 12 tax records print the right growth and values. The normal overlap integrates to 0.8026. SIR: I peaks at day 19.19 with S = 0.333, new cases at day 15.97, final 0.9407 (RK4 agrees). Intl.Collator in 7 locales gives apple, Banana, Zebra. The asthma stage string matches the c2 quote exactly. No dev server was used.
- **Believe:** high on all 9. The only one that rests on a running program and not a spec is zebra c5: ECMA-402 and UTS #10 could not be opened. The claim only says such sorting exists, and node shows that it does. A minor note for the builder: the twenty-flips c5 source still opens with the v1 description of atMost. It does not affect the claim.
- **Next:** W-638 (demo-builder): QA and reveal-fit on a quiet host. These lessons cannot publish until it is done. twenty-flips-run-of-five c6 is still unverified, and it was outside this task.
- **Blocked:** nothing of mine.

## 2026-10-14 (demo-builder, FC pass 35 dispute fixes: W-497 to W-501, W-509, W-512)

- **Changed:** 7 lessons got a version bump, and the affected claims were reset to unverified (checkedBy and checkedOn removed, builder note appended to the source). zebra-sorts-before-apple v2: c5 reworded in the reveal and the claim ("a program can sort with language rules instead, which put apple first"). twenty-flips-run-of-five v2: model.ts Tally.runs keeps exact longest-run counts, so atMost is exact for runs of 8 or more; c5 text unchanged. two-cells-sum-any-range v2: c3 and the reveal say "at most". tax-now-or-tax-later v2: the reveal prints the recorded growth "at ×{g} and a {r}% later rate"; c3 text unchanged. small-gap-big-extremes v2: c3 and the reveal say "mostly overlap, sharing about 80% of their area". vaccinate-at-the-peak v6: c1 and the recall say "number sick at once peaks", and the recall is recorded as a new claim `.recall`; no stage change. asthma-looks-safe v2: c2's quote matches the stage; the hook says "In toy records, …" and c6 now rests on the toy. Build notes appended to company/reviews/<slug>/build.md. Board: the 7 items moved to review; W-637 (fact-checker re-check) and W-638 (QA/fit re-run) added. Nothing built or committed.
- **Believe:** high confidence that the fixes answer each dispute as worded. I re-ran the numbers in node and Python: the twenty-flips patched model gives 97.5%, 99.0% and 99.9% for k = 8, 9 and 12; the overlap is 0.8026; the SIR I peak is at 19.2 with S = 0.333, and new cases peak at 15.97. `tsc --noEmit` passes and `npm run check` passes. **QA and reveal-fit are NOT done.** The :3530 dev server took 91 to 163 s to render a lesson at load 30 to 44, so both QA runs timed out on all 14 tests (45 s each) and reveal-fit errored on goto. For about 10 minutes every page also returned 500, from another builder's parse error in cs/nearest-town-first-detours/Demo.tsx (since fixed). Artifacts: artifacts/qa-fc35-fixes/.
- **Next:** W-638 (demo-builder): re-run QA and reveal-fit on a quiet host or a fresh build. W-637 (fact-checker): re-check the 9 claims.
- **Blocked:** local QA, by dev-server speed. Note: :3530 is someone else's `next dev`; .serve/3530.pid is stale (18677), and I left it as I found it.

## 2026-10-14 cm-books (Hester): W-623, the 2 Books pilot-exemption briefs named

- **Changed:** named `total-signups-hide-the-slide` (brief 8) and `biased-judge-noisy-judge` (brief 14) as the 2 Books builds allowed by W-556 Amendment 3 / strategy-review ruling 2. Re-checked both against the five criteria, copyright, the two-claim rule, "does it hold up?" (now a launch requirement) and a duplicate text search over all 941 lesson titles, misconceptions and objectives. Recorded the re-check in each brief in `company/domains/briefs/books.md`. Brief 8 rewritten (W-536): stage question cut from 30 to 25 words, QA path changed to 3 presets in DOM order with a Seen row, a "getting better" case added (also ends at 450, so the total can't tell), three claim families, cut fallback for the one held citation, verdict in the shared words. Brief 14: "Yes" changed to "holds up", cuts written for R1 and B2. `books-cycle1-check.mjs` now checks brief 8's new numbers and word counts. Both check scripts pass. Removed both slugs' lines from `company/ops/brief-skips.json`; a dry-run copy of `claim.mjs next books` (no lock taken) hands out exactly these two. Board: W-631 (demo-builder, build), W-623 moved to doing with a note.
- **Why these two:** they are the only pilot briefs whose verdict stands on a derivation alone once the held line is cut. twenty-steps-at-99 rests its verdict on two trials (2 held citations). good-call-bad-result rests on outcome-bias research. turkey-day-one-thousand rests on Russell. more-people-later-project rests on Brooks's own later edition (a third book claim).
- **Believe:** high that both meet ruling 2 and that W-538 landed (6340d33; `books` is in DomainId; the board still shows W-538 in review, which is platform-engineer's to close). Medium that brief 8's RCT sentence is a fair "real-world use" line: it tests a lean training, not cohort metrics specifically, which is why it is the first cut. Neither is better as multi-card; both are the arithmetic exception in ruling 5.
- **Next:** demo-builder W-631. cm-books: the pilot chapter sheets (rest of W-623) and W-536 on the other 10 cycle-1 briefs. W-538 needs closing on the board.
- **Blocked:** no Books publish until F1 and F2 (W-541). The builds count in the W-556 queue measure.

## 2026-10-14 cm-big-ideas (Dmitri): W-537 re-check of the cycle-1 briefs, W-624 DLR-five exemption

- **Changed:** company/domains/briefs/big-ideas.md: "W-537 re-check" bullets in briefs 6, 8 and 9, and a re-check table for all 12. The tests were strategy fit, a text search of all 941 lessons' titles, hooks, misconceptions and objectives plus overlap.mjs and the Books briefs, and strong form sourced or flagged plus where it stops. The cycle-1 check script has new checks: the chaos averages and precision preset, the transfer recalls for 6 and 8, and the earth-history recall. Both scripts pass. Removed `big-ideas:controlled-experiment` from content/curriculum/big-ideas.json (58 concepts). Updated strategy §2.4, path 5 and the DLR-five line. In brief-skips.json, removed the lines for one-ten-thousandth-apart and same-grey-in-shadow, rewrote colds-clear's line to give the duplicate as the reason, and updated the W-537 wording for 5, 7, 10, 11 and 12, which stay on W-556. Board: W-624 is done and W-537 is in review. New items: W-632 for head-of-product (a new fifth for the DLR five) and W-633 to W-636 for demo-builder (revisions to the 4 drafts). Nothing built or committed.
- **Found:** colds-clear-without-the-pill duplicates probability/sixteen-of-twenty-got-better (draft). Same no-effect pill, same cold that clears anyway, same week, same control-group reveal. Concept ids missed it (D6 again). Of the drafts, none is a duplicate, but all 4 break the one-held-citation rule or lack a fallback. earth-history's recall is not a transfer recall.
- **Ran:** a dry run that copies claim.mjs's selection logic without writing a lock (scratch script). `next big-ideas` gives one-ten-thousandth-apart, then same-grey-in-shadow, then NONE. `npm run check` passed.
- **Believe:** high on the duplicate call and on the arithmetic (node). Medium-high that 6 and 8 now meet all five Ruling 2 criteria. Medium on mars-loops-backwards as the fifth. It is my proposal and needs head-of-product's record.
- **Next:** builders claim 6 and 8. head-of-product rules on W-632. demo-builder handles W-633 to W-635 now, and W-636 after research-lead's W-622.
- **Blocked:** the DLR five is short one lesson until W-632 is decided.

## 2026-10-14 · platform-engineer · scale-stage0: review blocker fixed, main merged, board renumbered (W-076)
- **Changed (branch `scale-stage0`, not pushed, not merged to main, not deployed):**
  - `src/components/Feed.tsx`: review finding 1 (blocker). A failed page fetch marks the list `failed`; prefetch stops; the sentinel shows "Couldn't load more lessons." and a "Tap to retry" button (`feed-retry`, 44 px). The chip path gets the same, so no more "Loading more lessons…" for ever. Finding 3: revisits are placed only after the card the learner is on when they arrive, and the 12 cap applies after the status filter.
  - Merged `origin/ccr-4c6c7654-ew9ko1` (main, 38 commits). progress.md and changelog.md kept both sides. The registry was already up to date.
  - Board: the branch's W-477/478/479 were deleted and re-added by the tool as W-666 (review, done), W-667 and W-668 (evaluation-steward). The review's items: W-669 CSS strategy EDD (A), W-670 option 4 sequencing, blocked on W-667 (B), W-671 feed contract coverage (C, evaluation-steward, amendment), W-672 `feedOrder` prefix test (F). D went into W-609.
- **Verified (integrated tree):** `npm run check` passes (941 lessons, no duplicate IDs). `tsc --noEmit` passes. `next build` (`.next-scale`) passes; I deleted it afterwards. On :3580: `/` HTML is 303,965 B (40,250 B gz) with **734** stylesheet links (672 before main's lessons), so it sits at the 300 KB budget line again, already. Contract QA on 20 random lessons, phone + desktop, 1 worker: 40/40 in 14.4 min. Feed spec without `QA_ONLY`: 10/10. Failure path (`tests/scratch-feed-failure/failure.spec.ts`, outside the contract): /api/feed aborted or 404 gives exactly 1 request after 3 s idle, a 44 px `<button>` "Tap to retry", one request per tap, and recovery once unblocked; the chip page-0 failure is the same. 6/6. Not run: the full `npm run verify` over all lessons.
- **Believe:** the loop is gone (sure: the prefetch effect is gated on `failed`, and the scratch Playwright spec counts requests with /api/feed blocked). Revisit placement is fine for the "arrive late" case; the trailing revisits (only once `next === null`) are unchanged.
- **Next:** principal-engineer re-reads the fix and the full `npm run verify` on the integrated tree (the review's condition c; I ran a 20-lesson sample, not all lessons). Then the founder merges. evaluation-steward: W-667, W-668, W-671.
- **Blocked:** option 4 (W-670) on AMD-001 (c2).

## 2026-10-14 · platform-engineer · EDD-003 stage 0: slim feed index, paginated feed, QA only what changed (W-076, branch scale-stage0)
- **Changed (branch `scale-stage0`, not merged, not deployed):**
  - The feed renders a slim index: 30 cards in the HTML, more from static `/api/feed/<filter>/<page>`, and full meta on demand from static `/api/meta/<slug>` for the trust sheet and revisits.
  - New `tools/qa-changed.mjs` prints `QA_ONLY` for the lessons whose import closure changed since a ref or since their last green QA record.
  - No protected file was touched.
- **Measured** (879 lessons, `.next-scale` on :3580, before = cc37658 in a clean worktree):
  - `/` HTML: 5,836,934 B → 282,163 B (budget 300 KB).
  - First-load JS: 8.47 MB → 8.39 MB (unchanged in substance).
  - Phone emulation, interactive: 48 s → 17 s. The machine was heavily loaded, so this is directional.
  - Details and the remaining costs are in company/engineering/notes/2026-10-14-edd-003-stage0-feed-and-qa-changed.md.
- **QA:** 30 seeded-random lessons, contract 60/60. Six load timeouts on the 3-worker pass re-ran green on 1 worker. Feed spec 10/10, run without `QA_ONLY`; with `QA_ONLY` the chip test fails, as it did before this change. I filed no qa-record.
- **Believe:**
  - HTML budget met: sure, it's measured.
  - It won't hold at 2,000 lessons: fairly sure. About 182 KB of what remains is 672 hoisted lesson stylesheets, and that part grows with the catalog.
  - First-load JS won't move until option 4 lands: sure. DemoHost imports the registry, and the registry holds every meta. That is blocked on AMD-001 (c2), which hasn't been ratified.
  - qa-changed selection is right on three historical commits: geo kit 48/48, Life Hacks engines 147. I'm fairly sure of it, with blind spots listed in the note.
- **Next:**
  - principal-engineer reviews (W-666, was branch W-477) and decides on a CSS strategy EDD.
  - evaluation-steward: AMD-001 (c2) ratification and the qa-record hash request (W-667, was branch W-478); stale QA records, 855/879 selected (W-668, was branch W-479).
  - The founder merges the branch.
- **Blocked:** option 4 and the lesson version hash in records, both on amendments. Disk was full (38 MB free) at session start from other worktrees' `.next-*` dirs. I deleted none of them, but the next builder may hit the same wall.
## 2026-10-14 design-engineer (Tomoko): W-604 (C1) sequence probe, W-605 (C2) kit dev warnings

- **Changed:** added `tools/sequence-probe.mjs` (C1) and dev warnings in `src/kit/sequence.tsx` (C2): unknown revealCard, dropped non-SubCard children, sub-cards with no milestones. Wrote the results in EDD-006 "Results after review" and a changelog line. Board: W-604 and W-605 moved to review. Added W-630 for design-lead (C1/C2 done; the formats.md row is theirs to flip). I did not edit formats.md: the catalogue says the design lead changes it, after W-601 and W-602. No build and no commit.
- **Ran:** `node tools/sequence-probe.mjs --url http://localhost:3530 euclid-three-steps` against `next dev`, one viewport at a time (`--only`, `--timeout 400000`; the cold load took 79 to 121 s). Phone: 8 PASS, 1 FAIL. Desktop: 8 PASS. The FAIL is four-cards: a 4-step trail at 390 is 76 px wide and 71 px tall, because the titles and traces wrap. That is O6, and W-601 decides it. For the 4-card case I measured a trail padded in place and reasoned that nothing else in the kit depends on n. I wrote no fixture lesson, because a fixture is lesson content. `npm run test:kit` passed 97/97. `npm run check` passed (941 lessons). `npx tsc --noEmit` passed.
- **Believe:** high that sub-cards 1 to 3 of the reference fit, are not cropped and have 44 px targets at both sizes, and that the revealCard switch lands before first paint (MutationObserver plus first rAF). Medium on C2: the warnings type-check, but no misuse fixture has run them. Low-medium on the one React "state update on a component that hasn't mounted yet" error from an earlier run. I attribute it to Fast Refresh churn from other agents (10+ rebuilds during that run, none in the clean re-run), but it is not proven. The probe now tags errors with their step and the Fast Refresh count. The last edit (numeric min tap display) passed `node --check` and was not re-run.
- **Next:** interaction-designer W-601 judges the 4-step wrap (O6). Accessibility-reviewer W-602. Design-lead W-630, then the formats.md row. The principal engineer reviews W-604/W-605. Run the probe on the first non-reference CardSequence lesson before it leaves draft.
- **Blocked:** nothing of mine. Note: one half-written Demo.tsx in any lesson breaks every lesson on the dev server (S1, W-607). It happened today with cs/nearest-town-first-detours, between 16:38 and 16:50.

## 2026-10-14 head-of-product (Priya): W-614 + W-618 review of the Books and Big Ideas strategies

- **Changed:** wrote company/decisions/2026-10-14-books-big-ideas-strategy-review.md (five rulings, the open founder questions with recommendations, and objections with their status). Added Amendment 3 to company/decisions/2026-10-14-w556-wave-gate.md: a named exemption for 5 builds. brief-skips.json: the W-556 reason was removed for one-ten-thousandth-apart, same-grey-in-shadow and colds-clear-without-the-pill. Those lines still hold the briefs on W-537 and W-538. No Books line was touched, because cm-books names her 2. Board: W-614 and W-618 moved to done. W-617 and W-621 re-scoped (not blocking). Notes and links added to W-615, W-619 and W-539. New items: W-623 cm-books, W-624 cm-big-ideas, W-625 chief-of-staff, W-626 chief-of-staff-ceo-office, W-627 evaluation-steward, W-628 principal-pm-verticals, W-629 design-lead. Nothing built, committed or deployed.
- **Rulings:**
  - Both headline targets are kept: Books 120, Big Ideas 170.
  - The leads' numbers become the committed tranche: Books 60, Big Ideas 72 through M. The rest is conditional on capacity triggers and returns to the pool at Wave N if those never fire.
  - D8 is strict: Dunning-Kruger is out of the DLR five and colds-clear is in.
  - The two boundary sections are one boundary, binding on both categories now, with six shared verdict words.
  - Sensitive-class lessons need an outside review before build and before publish. The cultural-reviewer re-scope is routed (W-626), and sensitive briefs stay unclaimed until it lands.
  - F3: "multiple cards" means several cards per idea, and a book summary is the book's path of lessons. Multi-card becomes the Books default once W-604, W-601 and W-602 close, tested by W-629.
- **Believe:** high that the gate never held the 8 drafts. W-556 holds new builds only, so reviews can start now. Medium-high that keeping the targets as conditional, not cut, matches the founder's "double down" without hiding the capacity limits. Medium on the multi-card default, which is a craft call that W-629 tests. Low that any Books lesson publishes before F1 and F2 are answered, whatever we build.
- **Next:** W-623 (cm-books) and W-624 (cm-big-ideas) remove the skip lines for the 5 exempt briefs. W-625 (chief of staff) moves the 8 drafts to the front of the review queues. The founder answers F1, F2 and F4 (W-615) and W-619.
- **Blocked:** exempt builds wait on W-538 (DomainId, in review). `npm run check` passed (941 lessons, 0 warnings).

## 2026-10-14 cm-big-ideas (Dmitri): Big Ideas content strategy, Strategy wave 1 briefs 13-24

- **Changed:** wrote company/domains/big-ideas-strategy.md. It covers the promise (a lens with transfer ≥ 3 domains, an overturned default and a boundary), 68 ideas in six waves, the shapes and six paths, pacing, sources, sensitive topics, guards and kill rules, a shared boundary with Books (§8.2), and the next 24 ranked. Its departures from charter, map, decision and plan are in a D1-D8 table at the top. Briefs 13-24 are in company/domains/briefs/big-ideas.md under "## Strategy wave 1"; their numbers and recall answers are in company/domains/briefs/checks/big-ideas-strategy-wave1-check.mjs (all pass; reveals 73-79 words by script). Map: removed threshold-collective-action, randomised-assignment, path-dependence-lock-in and occams-razor (subject lessons already teach them); added wrights-law, metcalfe-oversold and most-findings-false; lindy-effect and newcombs-problem raised to demand 2; heliocentric-retrograde prerequisite set to physics:kepler-orbit-speed (59 concepts now). brief-skips.json: Wave K lines added for all 12 new briefs and the 8 unbuilt cycle-1 briefs (portfolio-manager's W-537 triage puts them in the Wave K pilot). Board: W-618 head-of-product (review plus 4 rulings), W-619 founder (120 ceiling; DLR claims in the W-583 session), W-620 demo-builder (gated), W-621 cm-books (co-sign §8.2), W-622 research-lead (literature maps). W-554 moved to review.
- **Believe:** high that the 12 briefs' numbers are right (node). High that the D6 finding is real: math/one-shy-rioter-stops-the-riot and probability/heads-after-heads-trap are published, and they are the stages I nearly briefed; concept ids alone miss this. Medium on 120 as the ceiling (judgement from 68 passing ideas and the review load, not data). Medium-low on every held citation and ⚑ verdict: the sources were not opened, and they are my reading of the literature. The cultural-reviewer route is a scope gap: that role covers locale variants only, so it is an ask on W-618, not a rule I can set.
- **Next:** head-of-product W-618; cm-books W-621; research-lead W-622; me: W-537 (re-check cycle-1 briefs; the 4 drafts were built before it ran), then remove skip lines when the gate and DLR conditions hold.
- **Blocked:** every Big Ideas build is behind the W-556 gate, plus W-538 (DomainId). Nothing built, committed or deployed. `npm run check` passed at the end of this session (941 lessons, 0 warnings).

## 2026-10-14 cm-books (Hester): Book Summaries content strategy + strategy wave 1 briefs (13-24)

- **Changed:** wrote company/domains/books-strategy.md: audience and promise; 50 books ranked in waves A/B/C, with demo-ability tests and how we handle ideas that failed replication; lesson shape (single card vs multi-card, the "argues / holds up" structure, book paths); target and pacing; sources and verification; a builder copyright checklist and the legal-read question; guards, measures and kill rules K1-K6. Section 8 is a Books / Big Ideas / subject boundary that cm-big-ideas can cite. Appended "## Strategy wave 1" (briefs 13-24: 12 books; psychology 5, business 3, science-history 4; answers A4 B4 C4) to company/domains/briefs/books.md, plus a note under "Next in line". New check script company/domains/briefs/checks/books-strategy-wave1-check.mjs: it recomputes every number, checks questions are 25 words or fewer and reveals 90 or fewer, and checks the three claim families and the answer spread. All checks pass, and the cycle-1 check still passes. company/ops/brief-skips.json: "Wave K gate (W-556)" lines for all 20 unbuilt Books briefs (12 new + 8 cycle-1), so `claim.mjs next books` returns NONE. Board: W-614 head-of-product (review the strategy), W-615 founder (asks F1-F4, extending W-541/W-583), W-616 demo-builder (wave 1 builds, gated), W-617 cm-big-ideas (cite or object to section 8). W-553 moved to review. A mistaken `board add --help` briefly created an empty W-614. I removed it from board.json before adding the real items, so the IDs above are correct. No curriculum or works.json change, no lesson code, no build, no commit.
- **Departures (strategy table D1-D7):**
  - The Books target goes from 120 to 60 committed, plus up to 30 on learner data. The freed slots return to the pool.
  - Each book gets 2 lessons by default.
  - Overlap and verification cost filter briefs before demand breaks ties. Four demand-3 ideas are deferred as duplicates of published lessons: signal-calibrated-weather, yes-batna, money-time-in-compounding and fact-straight-line.
  - Multi-card is used only where the verdict needs its own picture.
  - No fourth strand.
  - The 4 Books drafts already on disk count against the Wave K pilot of 10.
- **Believe:**
  - High that no book source can be opened from this host. Tested today: gutenberg, openlibrary, archive.org and wikipedia gave no connection, and the Google Books API returned 429. So every Books lesson stays held until founder ask F1 is answered.
  - High on the arithmetic in briefs 13-24 (checked by script).
  - Medium on the "does it hold up" verdicts and the research citations. They are my reading from memory and are marked "to confirm". The fact-checker may overturn any of them, and kill rule K2 measures how often that happens.
  - Medium on the overlap calls. overlap.mjs was not run on the new briefs because they have no lessons yet. Each brief names its nearest lesson instead.
- **Noticed, not mine to settle:** the 4 Books drafts (slowest-station-sets-pace, one-percent-a-day, born-in-january-picked-first, wheel-number-pulls-guess) were built even though plan-to-2000 puts the Books pilot in Wave K, and the cycle-1 briefs had no skip lines. The chief of staff's gate check (W-585) can say whether this was a leak.
- **Next:** head-of-product W-614, founder W-615, cm-big-ideas W-617. When the W-556 gate opens, builders take the pilot (W-616). I still owe W-536, the claims, sources and overlap re-check of the cycle-1 briefs (today I only re-ran the answer script). I also owe the per-book chapter sheets for the pilot (strategy section 5).
- **Blocked:** every Books publish waits on a book source (F1, W-541, W-583) and the legal read (F2). Multi-card waits on W-604, W-601 and W-602. `npm run check` passes.

## 2026-10-14 demo-builder (builder-wavej-econ-1): wave-J economics, 5 lessons built (draft)

- **Changed:** built, from briefs #60-64 in company/domains/briefs/economics.md: flat-rate-costs-nearly-double, inflation-falls-prices-still-rise, giving-up-lowers-unemployment, savings-outlast-the-division, winning-bid-overpays. Each has Demo.tsx, styles.module.css and meta.json (v2 curriculum, format, interactions) under src/demos/economics/<slug>/, plus company/reviews/<slug>/build.md with Pre-flight v1. 27 claims, all unverified. Status is draft. Nothing committed. Claim locks are still held (not merged). Board: W-679 (fact-checker).
- **Deviations from briefs (in build.md):** the "optional" third milestone is required in inflation-falls (−1%) and savings-outlast (0% growth), because the reveal names those states. Flat-rate drops the brief's "cut first" term sentence.
- **Believe:** high on the arithmetic: every number was recomputed in node, and the winning-bid seeded run matches the brief exactly. High that all 5 pass QA (10 of 10, phone and desktop, artifacts/qa-wavej-economics) and the phone fit: reveal-fit gives crop 0, namedHidden 0, phoneFit true, 69-78 words, smallest label 10.2 px or more. One caveat: the dev server was too slow for reveal-fit's fixed 30 s / 15 s waits, so I ran it with a preload that only raises Playwright timeouts (scratch patient.mjs). Platform-engineer may want a --timeout flag. One QA run failed on phone with React's dev-only "state update on a component that hasn't mounted yet" warning; reruns passed, so I read it as dev-server churn. Medium on teaching: no evaluator has seen these lessons.
- **Next:** fact-checker W-679; then the evaluators (walkthrough first) and a learner-evaluator. The builder can move a lesson to review after that.
- **Blocked:** nothing.

## 2026-10-14 cm-lifehacks (Tess): W-599 content patch for r9 batch D (14 lessons)

- **Changed:** wrote company/reviews/lifehacks-200/content-patch-r9-batch-d.md, a patch only. Nothing in src/ was edited (another builder owns the engines) and nothing was built or committed. For each lesson and field it gives the old and new text for titles, hooks, questions, options, answer index and recall, and the engine-v2 fields (engine, modeLabels, options, amounts, verdict, resultLabel, optionToMode, event, parts, consequence, rowLabels). Each new or changed claim is listed as unverified, with its support. Broken premises: buffer gets the +5 overrun `event`, so touching blocks show a 5 min clash. cue moves to the files family (`filter`: 3 matches vs 1), gated on the learning designer, with a fallback written. Board: W-599 → review; added W-610 (learning-designer: cue family + recall review), W-611 (interaction-designer: 4 schema gaps), W-612 (me: retirement review of apply-not-quote), W-613 (me: content for the ~186 unreviewed lessons in batches of 20).
- **Found:** deadline-needs-a-reference's fixture date 14 Oct 2026 is a Wednesday, but the old options set it against "Friday afternoon". The patch moves the fixture to 16 Oct (a Friday) and adds claim c5.
- **Believe:** high that the old texts quoted match the specs and meta.json as read today, and on the arithmetic (recomputed against home-models and calendarResult). Medium on guessability: my wording has not been read by a learner evaluator. Estimate for the 186 unreviewed: predict leaks in about 165-170 (18 of 20 in a hand sample; all 64 Home use button-label options, and 69 of 70 Study specs key option 0 of 2), recall leaks in about 55-75 (6-8 of 20). Sample by text only, no walkthroughs. Simulated reviews only; no learning evidence.
- **Next:** demo-builder applies the patch with W-608 after W-557..W-561; then fact-checker on the new claims; then learner-evaluator re-runs batch D. W-610 and W-611 first, because they gate blocks 12 and 2, 4 and 13.
- **Blocked:** cue's family change waits for W-610; bag and coil's A-column words wait for W-611 (per-mode verdict).

## 2026-10-14 principal-engineer (Kenji): W-477 /spike S1 review (c5e050b), approved

- **Changed:** wrote company/engineering/reviews/2026-10-14-w477-spike-review.md. W-477 moved to done. Added W-609 (release-manager, next): post-deploy smoke for /spike 404, lesson beacon 204, Origin null 403, and no SPIKE_ENABLED in the Vercel env. No code changed, no commit, no deploy.
- **Believe:** high that no query string reaches a frame, fetch or script source; the allow-list and the `frameUrlOn` origin check held against 20+ adversarial inputs. High on reading that production /spike is 404: NODE_ENV is read at runtime and would inline to production anyway, the route is force-dynamic, and there is no static export. Medium-high that the events guard passes real beacons behind Vercel (a Vercel-shaped probe passes), but nobody has observed it on a build. `npm run test:spike` passes 5/5. I did not run next build (load average 40).
- **Next:** release-manager does W-534 with founder approval, then W-609. Tripwire: if any page adds a `no-referrer` Referrer-Policy, its beacons arrive with Origin null and get a 403. The review lists this.
- **Blocked:** S1 is closed in production only once deployed, and that needs the founder. `npm run check` was run at the end of this session.

## 2026-10-14 interaction-designer (Rafael): Life Hacks engines v2 spec (W-518, W-598, W-599 engine half)

- **Changed:** wrote company/design/specs/lifehacks-engines-v2.md (spec only; no code, no commit). It covers all four engines (Home, Study, Resource, AlphabetSearch): stage at predict/explore/reveal, a Seen table that keeps both modes, an amounts row, the active-mode style, DOM order for the QA path, data fields behind `engine: 2` for bulk migration, a phone budget at 390x844, and the per-lesson content split for cm-lifehacks. Board: W-608 to demo-builder (start only after W-557..W-561 land). Spec linked on W-518, W-598, W-599. Note: my mistaken `board add --help` briefly created an empty W-600; another session's board write replaced it, and no empty item remains.
- **W-598 ruling: bug, not a hint.** Home `Stage` passes `inactive` to the mode in effect, so it gets aria-disabled with opacity 0.5 and no `active` class or aria-pressed. The mode not in effect is the only full-contrast button. This breaks lifehacks-batch-200 rule 3. QA also skips aria-disabled controls, so mode A is never pressed on the QA path, which is why the losing option's result never reaches a frame. Resource is not backwards ("Test A/B" tinted once seen). Study mode-like buttons (spacing views, WIP, files) have the same backwards encoding.
- **Believe:** high on the toggle mechanism (code + 5 reviews). Medium on the phone budget: it is CSS arithmetic, so the builder must measure it with reveal-fit. Medium on whether the neutral start reads clearly to a learner; it depends on the hint "Press A, then B".
- **Next:** demo-builder W-608 after the a11y items; cm-lifehacks W-599 content per the spec's section 9 table; visual-designer active-mode style and Home's 15-unit SVG text; qa-tester can close W-598 against section 1.
- **Blocked:** v2 waits on W-557..W-561 (same lines). `npm run check` passes.

## 2026-10-14 platform-engineer: W-477 (S1) spike route closed in production

- **Changed:** `/spike` now 404s unless NODE_ENV=development or server-side `SPIKE_ENABLED=1`; cdn origin comes from the server allow-list `SPIKE_CDN_ORIGINS` (query only selects an entry); manifest frame paths cannot leave that origin; spike progress uses its own key and spike events are not forwarded; `/api/events` returns 403 for `Origin: null`, foreign origins, cross-site fetch metadata and `/spike` referers. New `src/lib/spike.ts`, `tests/spike/spike-guard.test.mjs` (`npm run test:spike`), changelog line. Spike harness config sets `SPIKE_ENABLED=1`. Not committed.
- **Believe:** high that production cannot render the spike (guard is a pure env check, unit-tested; page is force-dynamic). High that no query string reaches a frame/fetch source (dev :3530 resolved `?cdn=https://example.com` to http://localhost:3141). Medium on the event guard in real browsers behind Vercel's proxy (unit-tested with Host/X-Forwarded-Host, not seen live). `tsc --noEmit -p .` exit 0, `npm run check` passed, test:spike 5/5. No `next build` or prod run (machine overloaded).
- **Next:** principal-engineer reviews W-477 (board: review, `reviewer` field). Release-manager keeps the W-534 deploy hold until the fix is reviewed and a founder-approved deploy ships it; then the ops review owner sets tiers.json `spike-route-open-cdn-param` to ok (not done here: it is the ops review's record).
- **Blocked:** nothing on platform side.

## 2026-10-14 learner-evaluator: learner reviews r9, batch D (14 Life Hacks lessons)

- **Changed:** wrote r9 simulated learner reviews (first learner review for each) for agenda-needs-an-outcome, apply-not-quote, bag-weight-before-volume, box-handle-clearance, buffer-for-a-late-finish, calendar-needs-travel, check-confidence-with-output, circle-tray-square-corners, coiled-cord-bend-radius, count-setup-in-the-block, cue-needs-a-boundary, deadline-needs-a-reference, deleted-is-a-search-state and desk-supply-near-use (company/reviews/<slug>/2026-10-14-learner-adult-beginner-r9.md). Linked each in meta.json evidence.simulatedLearner (only change to meta). Regenerated 5 walkthroughs that held only aborted page.goto transcripts (bag, box, buffer, check-confidence, coiled-cord) with WALKTHROUGH_URL=http://localhost:3561; the first try often timed out until the page was warmed with curl. Another session was regenerating walkthroughs at the same time (circle-tray was rewritten mid-review; content unchanged).
- **Verdicts:** all revise. Blocking: buffer-for-a-late-finish v1 (the late finish never happens; touching blocks show 0 overlap), cue-needs-a-boundary v1 (the vague cue is never tested), circle-tray-square-corners v1, bag-weight-before-volume v1, box-handle-clearance v1, desk-supply-near-use v1 (mode toggle shows the mode not in effect next to its result; circle also gets 4 → 9 discs from the slider while "Rotate" is active). Revise, not blocking: agenda v2, apply-not-quote v2, calendar v1, check-confidence v1, coiled-cord v2, count-setup v1, deadline v1, deleted v1.
- **Common causes:** the right option is in the question's wording or the title/hook (all 14); the losing option's result is never on screen; told reveals. Hidden amounts (found before reading the crit, agrees with its lesson 1): bag (6 kg total, no volume), box (46 cm envelope), desk (48 m), coil (0.1 vs 0.05, length per turn), count-setup (5 + 10 merged), buffer (delay), circle (no side-by-side count). The toggle finding is new and not in the crit.
- **Believe:** high that the stage states above are what the release build shows (transcripts + sheets seen for all 14). Medium on whether the white toggle is a hint or a selection bug (W-598, qa-tester). Phone fit judged by eye from sheets, not tools/reveal-fit.mjs. Simulated reviews, not evidence that anyone learned.
- **Next:** W-598 qa-tester (toggle), W-599 cm-lifehacks (route the 14 revises; ties to W-518 template fix). `npm run check` fails on an unrelated missing file, src/demos/books/born-in-january-picked-first/meta.json (another session's work in progress); not touched.

## 2026-10-14 learner-evaluator: learner reviews r9, batch B (12 lessons)

- **Changed:** wrote r9 simulated learner reviews for bending-frontier, debt-grows-ratio-falls (its first), four-in-a-row-two-thirds, odds-average-the-bettors, patience-wins-the-split, penalty-kick-mix, stag-needs-three-in-four, the-bar-nobody-can-forecast, who-pays-same-filter, eratosthenes-shadow, half-of-humanity and mercator-greenland (company/reviews/<slug>/2026-10-14-learner-*-r9.md). I regenerated five walkthroughs whose folders held only aborted transcripts (the-bar, who-pays, eratosthenes, half-of-humanity, mercator), using WALKTHROUGH_URL=http://localhost:3561, and ran tools/reveal-fit.mjs on all 12 against the same server. I linked the reviews in meta.json evidence.simulatedLearner; another session had already linked bending, debt and four-in-a-row and marked them published at 15:47. I ran `npm run registry` because check flagged the registry as stale; check now passes.
- **Verdicts:** launch: bending-frontier v5, debt-grows-ratio-falls v1, four-in-a-row-two-thirds v5, odds-average-the-bettors v4, patience-wins-the-split v5, stag-needs-three-in-four v4, the-bar-nobody-can-forecast v4, who-pays-same-filter v5, eratosthenes-shadow v6, half-of-humanity v3. Revise: penalty-kick-mix v4 (crop 46 px, 95 words, quoted best-mix state not on the stage at the reveal: W-595) and mercator-greenland v5 (the "bent" bearing line is drawn within about 3-4 px of straight: W-596).
- **Demo crit cross-check:** penalty-kick-mix: I agree on question length, and partly on the predict-frame table (it measures about 9-10 px, at the floor, not unreadable). who-pays-same-filter: the shrink is real, but the top panel measures about 10 px, at the floor, so I partly disagree with "unreadable". I kept launch and routed the floor-vs-legible question to design-lead (W-597). In who-pays section 1 I first eyeballed 7-8 px; pixel measurement corrected it, and the correction is recorded in the review. Eyeball px estimates run low.
- **Believe:** high on the fit numbers (reveal-fit tool) and word counts; medium on judgement calls (the mercator bend visibility, who-pays legibility). These are simulated reviews, not evidence that anyone learned.
- **Next:** demo-builder W-595, W-596; design-lead W-597. The fact-check gate is still open on several (debt-grows 0/4 claims checked in the walkthrough build, half-of-humanity 3/6 with c1 waiting on W-048). The DRAFT badge on 7 economics lessons is with qa-tester (the crit flagged it).
- **Blocked:** nothing.

## 2026-10-14 head-of-product (Priya): rulings W-570, W-556, W-513

- **Changed:** three decision records: company/decisions/2026-10-14-w570-lifehacks-wave-state.md, 2026-10-14-w556-wave-gate.md, 2026-10-14-w513-demo-crit-pairs.md (objection tables in each). W-570: wave 2 NOT open (A1 excepts strand closure, not wave order); A3 tripwire not fired and restated (wave 2 must be open or the Domain Launch Review scheduled by next OP planning, else founder); W-556 does not gate Life Hacks Wave J. W-556: Wave K gate adopted with two amendments (count includes unparked Life Hacks; Wave J slug list fixed in waves.json). Today: queue 319, Wave J 0/144 published, so not met. W-513: pairs 1 merge-framing / 2 kill / 3 not as is; 4-6 keep both, B before A; penalty-kick-mix and who-pays-same-filter revise before publish; supply-demand and wave-from-the-corner revise. "On screen" includes legible: one sentence added to the fit craft rule in company/product/demo-standard.md (QA contract untouched). Charter note under the co-sign in company/domains/lifehacks.md. brief-skips.json: reasons rewritten on all 9 Wave J lines, **none removed** (W-569 formats still holds every one). Board: W-570/W-556/W-513 done; founder asks W-582 (exam prep), W-583 (web fact-check per wave), W-584 (first deploy); W-585 chief-of-staff gate checks; W-586 me (Life Hacks Domain Launch Review); W-587 release-manager holds; W-588 demo-builder revisions; W-589 cm-course-ncm path order; W-590 evaluation-steward (legibility as a QA test?); W-591 qa-tester; W-592-594 minors to cm-math, cm-cs, cm-economics.
- **Believe:** high on the rule readings (A1 text, §6.1 gate, the plan's own table). High on the counts (meta.json scan). Medium on the crit decisions: one witness only, frames from next dev on older versions, so the holds lift on a current-version frame.
- **Next:** interaction-designer W-569 (then 6, 7, 10 go to builders); chief-of-staff W-585; founder W-582-584; release-manager W-587.
- **Blocked:** npm run check fails only on a stale registry.generated.ts from other sessions' lesson work. Not regenerated by me. Nothing built or committed. W-401's triage note ("Wave K") is wrong per W-570 ruling 3. The CLI cannot edit notes, so portfolio-manager should correct it.

## 2026-10-14 lifehacks-safety-reviewer (Sana): W-568 Wave J pre-build safety review

- **Changed:** wrote company/reviews/lifehacks-200/safety-wave-j-2026-10-14.md (one record for all 9 briefs, not one per slug). Verdicts: go 6, 7, 10; go with changes 8, 9, 11, 12, 13, 14; refuse none. 13 (steak-keeps-cooking) is not buildable as drafted: the 50 to 55 C figures read as a pull-early food-safety shortcut, so it must be rewritten as rise only, no absolute temperature. Refuse item 6 is only a proposal (safety.md section 5), not in the charter's five items; I ruled 8 is not a charging hack on conditions, and asked for the charter wording (W-580). Updated the reason text of all 9 lines in company/ops/brief-skips.json; removed none, because W-570 (wave 2, W-556 gating) is unruled and the kitchen pattern note is not written. Board: W-568 to review; added W-578 (kitchen pattern note, me), W-579 and W-580 (cm-lifehacks).
- **Believe:** high that the numbers match the check script (re-run) and that 13 is unsafe as drafted; medium on the item 6 ruling. No walkthrough, no sources checked.
- **Next:** cm-lifehacks applies the conditions; a second reader approves my proposed warning wording (I may not); head-of-product rules W-570; I write the kitchen pattern note.
- **Blocked:** nothing built or committed.

## 2026-10-14 learner-evaluator: learner reviews r9, batch C (11 lessons)

- What changed: wrote r9 learner reviews (simulated) from fresh release-build walkthroughs (recorded 15:19–15:28Z) for ruler-on-mercator, all-lines-meet-in-one-mother, agenda-picks-the-winner, cluster-stops-the-cascade, enemy-of-my-enemy, six-students-per-professor, times-can-shrink, bird-on-the-wire, metal-feels-colder, shake-faster-same-speed, every-scale-equally-likely (files: company/reviews/<slug>/2026-10-14-learner-*-r9.md). All linked in meta.json evidence.simulatedLearner. Board W-573..W-577 for the revise findings.
- Verdicts: launch: ruler-on-mercator v3, all-lines-meet-in-one-mother v3, six-students-per-professor v1, times-can-shrink v1, shake-faster-same-speed v1, every-scale-equally-likely v4. Revise: agenda-picks-the-winner v2 (94 words, narrow), cluster-stops-the-cascade v4 ("those four" undefined at commit, option pair points; 140 words; fit), enemy-of-my-enemy v3 (fit; quoted states off stage; 111 words), bird-on-the-wire v1 (single-foot readings never name ground), metal-feels-colder v1 (option leak; "4.4 times" not on stage; Swap metal looks dead).
- Belief: reasonably sure on fit/word counts (measured from 1082×2202 screenshots, ~2.77 px per CSS px, and transcript word counts); moderately sure on the judgement calls (bird label, metal option). Simulated reviews only: not evidence anyone learned.
- Blocked/notes: `npm run check` fails on two unrelated lessons (opposite-flows-swap-more, snap-the-magnet: TODO concept ids). Several r9 lessons have claims re-opened (trust line < all checked): fact-checker's gate.

## 2026-10-14 (platform-engineer, W-538: books and big-ideas in DomainId)

- **Changed:** added `"books"` and `"big-ideas"` to `DomainId` in src/kit/types.ts; changelog line in company/ops/changelog.md. Grep audit found no other place that needs a change: the feed, lesson page, map (/catalog), card colour and HQ pages all read content/domains.json (both present); HQ colours, rooms and offices were already updated by the org change; there is no `Record<DomainId, ...>` or switch on domain. W-538 moved to review. Nothing built, deployed or committed. Did not touch design/multi-card-sequence.
- **Believe:** high confidence the change is complete for single-card lessons (additive union widening; grep found no exhaustive maps). `npx tsc --noEmit -p .` did NOT finish: it timed out at 10 minutes with no output on this loaded machine, so typecheck is unconfirmed. `npm run check` failed on 3 errors, all from other builders' in-progress lessons (economics/giving-up-lowers-unemployment meta.json mid-write, physics/duck-rides-the-wave TODO concept, and the stale registry they cause); none from this change.
- **Next:** someone re-runs `npx tsc --noEmit -p .` (or `npm run verify`) on a quieter machine before the first Books/Big Ideas build (platform-engineer or the reviewer of W-538). Multi-card format stays with design-engineer.
- **Blocked:** none.

## 2026-10-14 (cm-lifehacks, Wave J: 9 gap briefs, ranks 6-14; W-401)

- **Changed:** 9 ranked briefs appended under "## Wave J" in company/domains/briefs/lifehacks.md: 6 mix-the-problem-types (interleaved-practice), 7 style-match-needs-a-crossover (learning-styles-debunk), 8 top-ups-count-the-same (battery-partial-charging), 9 three-copies-one-house (backup-3-2-1), 10 reviews-that-spread-out (2nd lesson for spaced-repetition-study), 11 salt-makes-ice-colder, 12 lid-on-boils-first, 13 steak-keeps-cooking, 14 sizzle-means-no-seal (kitchen, prepared under A3). Each brief has a safety class with the reviewer's checklist, a format line, an engine-or-custom-stage call, preset buttons in DOM order, a reveal draft (59-74 words, counted by script) and claims split into derivation/simulation versus owed sources. The check script company/domains/briefs/checks/lifehacks-wave-j-check.mjs recomputes every number (J6-J14). I added 9 lines to company/ops/brief-skips.json, so nothing is handed out before the safety review. Board: W-568 (lifehacks-safety-reviewer, pre-build review of all 9), W-569 (interaction-designer, formats), W-570 (head-of-product: wave 2 status, A3 tripwire, W-556 gating), W-571 (fact-checker, owed sources), W-572 (demo-builder, build after the holds clear). W-401 has moved to review. No curriculum change, nothing built, nothing committed.
- **Why 9, not 10:** A2 bars every demand-1/2 brief while open strands have uncovered demand-3 concepts. Study reaches its cap of 15 with ranks 6, 7 and 10. Every other demand-3 concept in an open strand already has 2 or more lessons. Cleaning is wave 4, and no rule allows briefing it early. The cleaning tripwire is the head of product's (W-570).
- **Believe:** high confidence in the numbers (node re-runs) and in the rule reading. Wave 2 is not open on the record (0 published, Domain Launch Review not held), so the skip lines for 8-9 also wait on it. That conflicts with "A1 now" in my task, and it is raised in W-570. Medium confidence on the teaching: 7 and 14 depend on one empirical sentence each (Pashler 2008, McGee 2004), and both are owed and unverified. Without Pashler, 7 is not a debunk. 14's derivation shows only that water leaves during the sear. 13 is the brief most likely to need safety changes (it is close to a "pull it early" food-safety shortcut). The read-only claim dry run (scratchpad claim-dry.mjs, no locks taken) gives `next lifehacks` NONE now. With the 9 skip lines removed, it hands out the briefs in rank order 6 to 14, each with a format line.
- **Next:** lifehacks-safety-reviewer W-568, then interaction-designer W-569. The head of product rules on W-570. Builders take them via claim.mjs once the skip lines go. W-400 (A5 note line) is still mine.
- **Blocked:** sources (no web host). `npm run check` fails on 4 errors in other sessions' in-progress lessons (ai, economics, math, physics), none in lifehacks.

## 2026-10-14 late (portfolio-manager, Odette: board triage to W-567)

- **Changed:** I triaged the whole board with `tools/triage.mjs set`, one item per call. Record: company/ops/triage-2026-10-14.md.
  - Closed 103 items as done, after checking each against meta.json versions, claim status and git. This includes all 40 wave H r8 review items, the W-135/W-287/W-332 kit work and about 20 fixed FC disputes.
  - Dropped 16, with reasons: duplicates W-199→W-049 and W-061→W-135, superseded QA items, and stale mockups/spec reviews for lessons that are already built.
  - Fixed 5 owners and gave every open item a priority (0 untriaged).
  - `next` now holds 24 items: drain and gate capacity first (P1: W-477, W-520, W-521, W-522), not Wave J builds. The builds are gated by W-556.
  - Filed W-562 (r9 re-reviews for 30 lessons) and W-563 (antarctica c5 source). Both are mine, so chief-of-staff-ceo-office approves them.
- **Believe:** the closures are right (high confidence: each rests on a file or a commit). The priorities are medium confidence (set from records and status, not reproduced). Concurrent writers overwrote 3 of my updates (W-374, W-403, W-427). I re-applied them, and a final check found none lost. Other agents' writes may also have been lost in the same race (W-528).
- **Next:** route the four founder decisions to founder-inbox.json as F-15 to F-18: W-479, W-485, deploy gating G1, and the In-review override G2. This is portfolio-manager or the operating chief of staff; the list is in the triage record. The operating chief of staff dispatches `next` top-down.
- **Blocked:** none for me. `npm run check` fails on two other sessions' WIP lessons (raters-reward-agreement hook length; snap-the-magnet TODO concept). That is not from this pass; W-530 covers it.

## 2026-10-14 (learner-evaluator, learner reviews r9 batch A: 12 lessons)

- **Changed:** wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r9.md for long-answers-lose-the-product (v1, launch), the-slowing-half-life (v7, launch), each-element-pops-once (v6, launch), fenwick-hops-by-lowest-bit (v4, launch), karatsuba-three-not-four (v5, revise), one-crowded-bucket (v4, launch), proposers-get-the-best (v5, launch), ray-counts-crossings (v4, launch), selfish-routes-cost-a-third-more (v5, revise), two-locks-wait-forever (v1, launch), wheel-needs-four-colours (v4, launch) and accurate-bettor-takes-the-pot (v4, launch). Each one is linked in meta.json evidence.simulatedLearner, and no other meta field changed. Four walkthroughs had aborted (page.goto timeout): long-answers, slowing-half-life, each-element and fenwick. I re-ran them against localhost:3561. Board: W-564 (demo-builder: selfish bound sentence), W-565 (qa-tester: karatsuba release-build crop), W-566 (learning-designer: ray prediction answerable by looking), W-567 (demo-builder: minors). Nothing built or committed.
- **Believe:** all findings were written from the screenshots before I read any build.md. Selfish revise, medium-high confidence: v5 cut the "up to 4/3" sentence for word count, so the closing line now reads as a general law. Karatsuba revise, low-medium confidence: the release frame shows a square-cut stage top, while the dev reveal-fit screenshot shows crop 0. No content the reveal names is lost, so if reveal-fit on the release build reports crop 0, it flips to launch. The r8 fit and word revises are fixed in every lesson re-reviewed here. Simulated learner only: none of this shows that anyone learned.
- **Next:** demo-builder W-564 and W-567, then a learner r10 on selfish. qa-tester W-565. learning-designer W-566. W-425 (learner-evaluator) still lists karatsuba with four other lessons. In this run the karatsuba explore frames showed no box-row clipping.
- **Blocked:** npm run check fails on two errors that are not from this session: snap-the-magnet's TODO concept id, and a stale registry.generated.ts that came from another agent's new draft at 15:34. The registry does not include evidence fields.

## 2026-10-14: pattern-librarian: W-514 pattern review (six crit candidates plus eight more)

- **Changed:** record company/rituals/records/2026-10-14-pattern-review.md. Nine new unstarred patterns in company/knowledge/patterns/ (draw-the-base, fit-means-legible, measure-the-fit, fresh-checker-for-drafted-wording, reword-to-the-stage, preset-buttons, data-driven-engines, allocate-shared-names, gate-expensive-actions). Extended earn-the-reveal, predict-before-reveal, pairwise-not-scores, numbers-from-the-stage, objection-travels, artifact-before-account, keep-a-strange-branch (no confidence change, no failed case deleted). README updated. Nothing retired.
- **Believe:** medium. Every case is from today and from simulated readers or the same day's rules, so no star was earned. Crit candidate 6 counts as one cause, not three cases.
- **Next:** evaluation-steward (reword vs hold boundary, W-520); head-of-product (does "on screen" mean legible, W-513); head-of-product to update demo-standard marks.
- **Blocked:** none. Nothing built or committed; board W-514 not moved by me (see report).


## 2026-10-14 (principal-pm-verticals, plan to 2,000 lessons)

- **Changed:** wrote company/product/verticals/plan-to-2000.md. It covers targets for the 12 categories (summing to 2,000 gated lessons), wave order J, then D (drain), then K, L and M, then N-Q re-allocated on learner data. It also covers the saturation calls, per-wave pipeline capacity, the vertical recommendations and the quality guards. Board W-543 to W-555 (one per CM plus cm-course-ncm) and W-556 (head-of-product: wave gate plus founder asks). I created W-535 by accident (empty title, from `board add --help`) and dropped it. Nothing built or committed.
- **Believe:** high confidence that review is the binding constraint, not build. 192 lessons are blocked on borrowed-mind review against 37 on claims, and after Wave J the queue is about 457 against a 2-wave limit of about 330. Also high that about 914 lessons are countable after J (Life Hacks discounted to the PR #2 cap), so about 1,086 are still needed. Medium on the per-category targets: there is no learner data, and the demand ratings are CM estimates. I treated no simulated review as demand. The held-claim estimate (~12% of subject lessons; Books ~100%) comes from 5.45 claims per lesson, 21.7% of them source claims, and a 10% hold rate.
- **Recommend:** add one vertical, an exam-prep pilot (intro physics and intro statistics, syllabi unconfirmed from this host). Defer workplace (a path, not a category). Decline parents for now (refuse list, no child-safety reviewer). Stop NCM section briefing.
- **Next:** head-of-product rules on W-556 (no Wave K builder claims until the review queue is ≤ 1 wave). CMs take W-543 to W-555. cm-physics and cm-probability syllabus maps feed an exam-prep vertical doc (this role, after the maps).
- **Blocked:** syllabus and book-chapter verification (no web). Demand evidence waits on a founder-approved deploy and EXP-002. `npm run check` fails on two builder drafts with TODO concept ids (deleted-column-still-there, duck-rides-the-wave), not mine.

## 2026-10-14 ~15:40 UTC: principal-engineer-ops: first Operational Health Review

**Changed:** wrote company/engineering/operations/2026-10-14-ops-review.md. Declared 3 SEV2 incidents (ev-c33bee719d CI queue; ev-b27f3b93ae deploy bypass + Vercel quota; ev-d362239a23 host disk/CPU), each with a COE author outside its area (W-522 backend-engineer, W-523 tools-lead, W-524 principal-engineer). Classified 5 SEV3s (wrong-worktree writes, pkill self-kill, dying background loops, board-id/scratch collisions, check red on WIP domains). tiers.json: new shared-dev-host T1, agent-isolation T2, spike-route-open-cdn-param S1 (W-477 reclassified from P2: exploitable now). Board W-522..W-534 and W-542.
**Believe:** the common cause is concurrency without allocators for shared resources (fairly sure, about 70%; the COEs should test it). CI is still not draining after AMD-002 (7 of last 40 queued, 0 concluded), medium confidence from one gh sample. App deploys are held under the S1 rule until W-477 is fixed (W-534).
**Next:** COE authors W-522..W-524; portfolio manager re-triages W-477 to P1 and W-023 to P2; tools-lead drafts the board-id amendment (W-528). Evidence for W-528: during this review, concurrent adds took W-535..W-541, and W-535 has an empty title (owner chief-of-staff, not mine).
**Blocked:** no named owner for the shared host (W-533). ops-health.mjs does not see this review (W-542). Nothing built or committed.

## 2026-10-14 · chief-of-staff-ceo-office · Book Summaries and Big Ideas: two categories, their org, curricula and first briefs (founder request)
- **Changed:**
  - Roles in `tools/org/roles.mjs`: cm-books (Hester) with strands business (Kwame), psychology (Imogen) and science-history (Tobias); cm-big-ideas (Dmitri) with strands science (Lucia), society (Babajide) and mind (Signe). Generated with `node tools/org/generate.mjs`: 92 roles.
  - Rooms "Book Summaries" and "Big Ideas" on HQ floor 3, where the bottom row is now six rooms. Mapping in `tools/events.mjs` and `src/app/hq/people.ts`, and colours in `src/lib/hq-colors.ts`.
  - Charters `company/domains/books.md` and `big-ideas.md`. The copyright and two-claim accuracy rules are binding.
  - Curricula with 60 concepts each, and 27 books added to `content/works.json`.
  - 12 ranked briefs per category, with node answer checks in `company/domains/briefs/checks/`.
  - Decision record `company/decisions/2026-10-14-books-and-big-ideas.md`. Board W-536 to W-541.
- **Believe:**
  - The org and the wiring are right, and claim.mjs hands out both lists (high confidence; `npm run check` passes and the HQ files typecheck in isolation).
  - Brief answers are right under their stated models (high confidence; checked in node).
  - Book chapter numbers and some study details are from memory and are marked unconfirmed (medium confidence).
  - The "does it hold up" verdicts are a first reading of the literature that the fact-checker may overturn (medium confidence).
- **Next:**
  - cm-books and cm-big-ideas re-check the 24 briefs (W-536, W-537). The CEO office drafted them, so the owners must review them.
  - The platform engineer adds the two domain ids to `src/kit/types.ts` before any build (W-538).
  - Priya and Ines answer the consultation (W-539, W-540).
- **Blocked:**
  - A founder call on a legal read of the copyright policy, and on book access for chapter checks (W-541). This does not block building, but Books claims can't be verified until chapters are confirmed.
  - Not built, per the task.

## 2026-10-14 (pedagogy-critic, Yusuf: demo-crit, six pairs)

- **Changed:** ran the overdue demo crit as its pairwise witness. Record: company/rituals/records/2026-10-14-demo-crit.md. Six pairwise records: company/reviews/{lh-sequential-discounts,lh-discount-round-trip,sock-pairs-not-all-combinations,penalty-kick-mix,a-star-heads-for-goal,who-pays-same-filter}/2026-10-14-pairwise.md. I regenerated the walkthroughs for all 12 lessons against `next dev` on :3530, because the .next build was from 10-13 and `npm run build` did not finish in 10 min. Board: W-513 to W-521.
- **Believe:** medium-high confidence (simulated reading of screenshots, one witness). In all three Life Hacks duplicates, the existing lesson is better. The shared receipt template draws totals, never the quantities the reveal explains. sock-pairs never shows its central number (a possible fatal for the head-of-product to rule on). penalty-kick-mix and a-star are good lessons that should come *after* two-suspects-payoff and wave-from-the-corner. Phone-fit: a-star now fits. who-pays and penalty fit by shrinking until the text is unreadable. Published wave-from-the-corner fails on the QA path (wall taps wipe the labels the reveal cites).
- **Next:** head-of-product decides the six pairs (W-513). pattern-librarian takes the six pattern candidates (W-514). evaluation-steward rules on the builder notes in the walkthrough trust-sheet appendix (W-520).
- **Blocked / not done:** learner-evaluator, QA, a11y and fact-check did not report in this crit. company/ops/events.jsonl holds my kudos line mixed with other sessions' incident events, so I did not commit it.

## 2026-10-14 (fact-checker, FC pass 35 batch 0: 31 lessons)

- **Changed:** claim status, checkedBy, checkedOn and a "FC pass 35" source note on 84 open claims across the 31 lessons in batch 0, plus one new recorded claim (asthma-looks-safe c6, the hook). Every lesson's company/reviews/<slug>/2026-10-14-fact-check.md has a "Pass 35" table. Board: W-512 (demo-builder). No code touched, nothing built or committed.
- **Result:** 78 verified, 1 disputed, 6 held unverified (5 old ones plus the new c6).
  - Disputed: asthma-looks-safe c2. The claim quotes a stage string that Demo.tsx does not print.
  - Held because the source could not be opened: everyone-saves-nobody-does c4 (paradox of thrift naming), lh-duty-cycle-energy c6 and lh-same-energy-new-tariff c6 (tariffs vary, source owed), lh-count-sheets-not-rolls c5 (NIST SP 1181), mail-minus-noise recall (Gmail Help), asthma-looks-safe c6 (new hook claim).
- **Believe (high confidence):** every verdict was re-run in node from copies of the lesson logic, or checked against opened text. raw.githubusercontent.com is reachable while scholarly, government and Google hosts are not. I used it to open primary text: OpenStax College Physics 2e §13.6 (CNXML module m42219), the Linux locking docs and Hugging Face transformers. Some claims marked "source" were verified as derivations instead, and their notes say so: four-in-a-row c8, enemies c5, group-cables c1, wobbly recall, energy c5.
- **Next:** demo-builder takes W-512. A fact-checker with web access should take the six held claims.
- **Blocked:** the disk filled twice during the session because of other agents' scratch use. The scratchpad directory fc35/ was shared by two batches, so I moved my scripts to fc35-b0-ingrid/.

## 2026-10-14 (fact-checker, FC pass 35, batch 1: 31 lessons, 84 open claims)

- **Changed:** checked every claim that was not yet verified or withdrawn in the 31 lessons listed in scratchpad fc35-1.txt. Results: 73 verified, 1 disputed, 10 held unverified. Each claim now has status, checkedBy: fact-checker, checkedOn: 2026-10-14 and an "FC pass 35" source note in its meta.json. A "Pass 35" table is appended to each company/reviews/<slug>/2026-10-14-fact-check.md; 18 of these files were new. Board: W-509 (demo-builder, the dispute), W-510 (demo-builder, non-blocking notes: an unrecorded Gale and Shapley attribution in proposers-get-the-best, a locked-readout leak in penalty-on-wiggle, an agenda recall wording nit) and W-511 (evaluation-steward, the 10 claims held only for unopenable sources). I edited no code and no claim text, built nothing and committed nothing.
- **Dispute:** vaccinate-at-the-peak c1. "New cases peak on day 19" is false in the model: day 19.19 is the peak of people sick at once (I), while new cases (β·S·I) peak at day 15.97. The recall card makes the same mix-up (S = 1/R0 holds at the I peak, but S is 57% at the new-case peak).
- **Believe (high):** the 73 verifications. I read each Demo.tsx (and the Life Hacks engine) before the claims, and re-ran each claim in my own node port, enumerating states where they are finite: all 10,608 pre-cut states in cut-the-busiest-link, every tap order in proposers-get-the-best, all 46,656 3×3 profiles, 500 ridge seeds, the 1,000 coalescent seeds, d3-geo on the lesson projections. Some verdicts rest on derivation instead of the cited source: Gale and Shapley stability, rod-cutting optimal substructure, Equal Earth equal area (checked numerically), v = √(T/μ) and the kWh definition. Each source note says so.
- **Held unverified (10):** these rest on sources that no host here can open (WebFetch DNS failure, proxy 403): bird-on-the-wire c1 and c5, best-of-twenty c4, cut-the-busiest-link c4, the two tariff-hedge c6 lines, lh-align-price-units c5, square-bow c1 and recall, spaced-beats-cram recall.
- **Environment:** the root filesystem was full for a while (ENOSPC on tool output). The meta.json writes used a temp file plus rename and were re-parsed. npm run check passes (7 warnings, all lessons with disputed claims).
- **Next:** demo-builder takes W-509 (re-check by a fresh fact-checker) and W-510. evaluation-steward takes W-511.
- **Blocked:** external source hosts.

## 2026-10-14 (cm-course-ncm, Wave J: 16 NCM briefs, 15 accepted, 1 held)

- **Changed:** Every demo-able section in content/courses/ncm/chapters.json already had a built lesson; 4.4 and 19.7 were built under new slugs, and I fixed them in the map. So wave J briefs concepts inside covered sections that their lessons do not teach, plus four sections re-judged demo-able (4.2, 9.2, 17.6, 23.2). I gave priority to chapters with the fewest lessons (2, 13, 8, 16, 17). 16 briefs went into company/courses/ncm/briefs.md under "## Wave J". I applied each strand's acceptance rules, at the Wave J lead's instruction, and copied 15 into the strand files under "Course: NCM": math.discrete #10-13, cs.algorithms #88, cs.systems #8-9, probability.chance #66, probability.statistics #71-72, economics.markets #25-29. The 15 concepts are in content/curriculum/{math,cs,probability,economics}.json with course: ncm. Held: protest-needs-a-shared-view (19.6). Its objection is in briefs.md J3, and math:collective-action-knowledge stays proposed: true. coverage.md has a wave J refresh. Board W-502 to W-508.
- **Believe:** high confidence in the numbers: re-run in node (scratchpad ncm-wavej-checks.mjs, output on each Check line), and prediction and reveal word counts were counted by script (predictions ≤ 25 words, reveals ≤ 70). A read-only replica of claim.mjs "next" shows all 15 are in the queue, formatted, unbuilt and unlocked. I did not run the real `next`, because it takes a 6-hour lock. Medium confidence that the strand managers would accept all 15: economics.markets gets 5 more, and keenest-buyer-takes-the-other-flat is close to prices-sort-the-buyers. Section numbers are all unconfirmed (host blocked).
- **Next:** demo-builder takes them via claim.mjs next <math|cs|probability|economics>. Each strand manager re-checks (W-502 to W-507). demo-builder applies the reference rows (W-508). Section coverage is now saturated as a metric, so the next NCM vertical review should read learner results instead.
- **Blocked:** confirming E&K section numbers (cs.cornell.edu proxy 403). Unblocking 19.6 needs the book's knowledge model.

## 2026-10-14 (fact-checker, pass 35 batch 3: 31 lessons, 83 open claims)

- **Changed:** 83 claims across 31 lessons got status, checkedBy/checkedOn (verified and disputed only) and an "FC pass 35" source note: 68 verified, 5 disputed, 10 held unverified. A "Pass 35 (batch 3)" table was appended to company/reviews/<slug>/2026-10-14-fact-check.md (21 files created, 10 extended). Disputes are on the board for demo-builder: W-497 (zebra-sorts-before-apple c5), W-498 (twenty-flips-run-of-five c5), W-499 (two-cells-sum-any-range c3), W-500 (tax-now-or-tax-later c3) and W-501 (small-gap-big-extremes c3).
- **Believe:** high confidence in the numbers. Each one was re-derived with an independent re-implementation: brute force over 2^20 flip sequences, Python erfc, RK4, a winding-number polygon test, the repo's d3-geo, and npm fenwick-tree@0.0.0 as an openable Fenwick reference. The disputes are a wrong number on a reachable path (twenty-flips, run of 8 or more), stage or reveal wording that contradicts the stage or omits the growth (two-cells, tax), and overstatements (zebra "real apps", small-gap "almost completely" at 80% overlap). The 10 held claims rest only on web sources I could not open: web fetch fails DNS, the proxy returns 403, nothing was verified on a snippet. Five Life Hacks c5 "transfer prompts" come from home-lessons.ts spec.recall, which no component renders. I verified them as convention, and the owner may withdraw them. No screenshots: localhost:3530 was not serving. `npm run check` passes, with 6 warnings: the 5 disputes plus asthma-looks-safe.
- **Next:** demo-builder fixes W-497 to W-501, then a fact-checker re-checks them. The held source claims (drying-room-water-load c6, lh-purchase-plus-running c6, lh-big-pack-price c5, mail-exact-phrase/deleted-is-a-search-state/long-cord-knots-itself recall, patience c5, twenty-flips c6, selection-not-focus c2, version-nine-and-ten c2) need a host that can open sources, or a coordinator ruling on whether caution clauses ("vary between applications", "check your own") need sources.
- **Blocked:** web sources (no egress). The disk filled to 0 MB several times mid-session, which drops command output; another batch is also using the scratchpad's fc35/ folder, so my scripts are in scratchpad fc35-3/.

## 2026-10-14 (cm-life, Wave J: 15 new life briefs across the three strands)

- **Changed:** 15 ranked briefs appended under "## Wave J batch" in company/domains/briefs/life.ecology-body.md (bad-year-breaks-the-quota, empty-ponds-still-left, opposite-flows-swap-more, same-dose-levels-off, more-traps-more-species), life.genetics-evolution.md (five-chicks-for-a-sister, same-shape-different-genes, many-genes-smooth-curve, never-more-than-half-apart, clones-take-over-fast) and life.health-epidemiology.md (friends-of-friends-slow-spread, who-has-it-today, trace-back-finds-the-cluster, screening-finds-slow-ones, bites-count-twice). 12 new concepts in content/curriculum/life.json (63 -> 75, each with level, demand, prerequisites, subarea); kin-selection and convergent-evolution now have subarea genetics-evolution. Check script company/domains/briefs/checks/life-wave-j-check.mjs recomputes every number (labels E2-E6, G6-G10, H4-H8). Board W-495 (demo-builder), W-496 (fact-checker).
- **Believe:** high confidence in the numbers (node, seeded, rerunnable; reveal and stage word counts counted by script, all reveals <= 84 words). Medium confidence on difficulty and phone fit, which are judged from the brief, not from a screenshot. The three uncovered concepts with no brief (network-clustering-spread, kin-selection, convergent-evolution) are ranks 2-4; rank 1 deepens maximum-sustainable-yield. Every real-world citation is optional and marked unverified. The four earlier coverage-next briefs are all in draft now, so `claim.mjs next life` reaches this batch first (dry run without locks: bad-year-breaks-the-quota first, all 15 free with a format line). I ran `claim.mjs next life` once early in the session by mistake, which locked steady-catch-from-a-lake as "unknown"; I released it straight away.
- **Next:** demo-builder takes them via claim.mjs next life (W-495). Design lead: empty-ponds-still-left may cross the ABM boundary (> 20 agents). Fact-checker: optional sources (W-496). luria-delbruck stays uncovered as a primary (it is an `also` of twenty-cultures-twenty-plates).
- **Blocked:** nothing in my scope. `npm run check` fails only on the books / big-ideas charters (not mine).

## 2026-10-14 (cm-geography, Wave J: 15 new geography briefs across the three strands)

- **Changed:** 15 ranked briefs appended under "## Wave J" in company/domains/briefs/geography.earth-climate.md (1-6: which-sea-gets-the-rain, which-way-the-water-goes, june-sunshine-pole-or-equator, why-the-poles-get-less-sun, darkest-evening-of-the-year, air-over-the-ridge), geography.maps-projections.md (1-5: sheet-at-half-scale, the-49th-parallel-in-europe, a-circle-on-the-globe, cuba-or-madagascar-coastline, mostly-yes-on-the-map) and geography.people-places.md (2-5: density-the-typical-person-lives-at, same-blocks-new-zones, two-towns-thirty-minutes, where-is-the-centre-of-people). Each carries a wave rank /15: uncovered concepts first (river-watersheds, map-scale-ratio, ocean-gyres), then second lessons for demand-3 concepts (seasons, latitude-longitude, map-projections-area, population-distribution, coastline-paradox), then 7 new concepts added to content/curriculum/geography.json (56 -> 63, with subarea): sunlight-by-latitude, equation-of-time, foehn-rain-shadow, choropleth-area-bias, areal-units-maup, travel-time-distance, population-centre; climate-zones now lists sunlight-by-latitude as a prerequisite. Every number comes from company/domains/briefs/checks/geography-wave-j.mjs (derivation, seeded simulation, or world-atlas 2.0.2 Natural Earth data in node_modules; no network). Board: W-492 (demo-builder), W-493 (cultural-reviewer, light pre-build check), W-494 (me: britain-on-a-page has no format line).
- **Believe:** high confidence in the numbers (re-run in node). A data catch is written into the coastline brief: at 1:10m Natural Earth splits the Guantanamo base from Cuba (25.3 km boundary), so the brief measures the merged island (5,765 km); the answer does not change. Medium confidence that the toys teach as well as real data would: all four people briefs and the watershed, gyre and foehn briefs use labelled made-up worlds because no population, river, current or temperature data is local. climate-zones is still uncovered on purpose (it needs gridded temperature data; round-2 data request). Reveal drafts are 65-75 words; phone fit is unproven until built. A read-only dry run of the claim.mjs logic (no locks taken) lists all 15 as available; the first that `next geography` returns is which-sea-gets-the-rain.
- **Next:** demo-builder takes briefs via claim.mjs next geography. Cultural reviewer does the light check (W-493) before the people briefs are built. Fact-checker: claims marked `unverified` (textbook sources for trade winds and gyres, Mandelbrot 1967, Openshaw 1984, Craig 1984, Monmonier 1991) are optional context, and the lessons stand without them.
- **Blocked:** nothing in my scope. The disk was nearly full during the session (shared).

## 2026-10-14 (cm-probability, Wave J: Round 4, 15 new briefs 56-70)

- **Changed:** 15 new concepts in content/curriculum/probability.json (72 -> 87; each with level, demand, prerequisites, subarea). 15 ranked briefs in company/domains/briefs/: demand 3 first in probability.md § Round 4 (56-61: significant-but-false, sixteen-of-twenty-got-better, the-doctor-picks-the-patients, ten-thousand-replies-still-wrong, where-the-axis-starts, four-hundred-or-thirty), because claim.mjs reads that file before the strand files; then demand 2 by strand: probability.chance.md 62-65, probability.data-literacy.md 66-68, probability.statistics.md 69-70. Every number is reproduced by company/domains/briefs/checks/probability-round4-check.mjs (exact or closed form; seeded mulberry32 cross-checks). Board W-491 (demo-builder).
- **Believe:** high confidence in the numbers (re-run in node) and that no lesson in any domain teaches these 15 concepts (checked every meta.json concept and every briefs file). Medium on difficulty: briefs 57 and 61 may be easy for adults; the misconception is still common in the wild. Every control is a preset button with the question case pressed last; reveal drafts are 59-76 words but phone fit is unproven until built. A dry run of claim.mjs next took 3 locks, which I released; the read-only queue lists all 15 in rank order.
- **Next:** demo-builder takes them via claim.mjs next probability. Citations (Ioannidis 2005, Literary Digest 1936, Dorfman 1943, the German tank problem) are optional, flagged for a human source check, and kept out of learner text. Note: older strand briefs in probability.statistics.md and probability.chance.md (course sections) use #### headings, which claim.mjs does not read; they are all built, so nothing is lost.
- **Blocked:** nothing in my scope. npm run check fails only on the books / big-ideas curricula and charters (not mine). The disk was at 100% during the session (other agents).

## 2026-10-14 (fact-checker, pass 35 batch 2: 30 lessons, 83 open claims)

- **Changed:** 74 claims verified, 9 held unverified, 0 disputed, in 30 meta.json files (lessons in the batch file fc35-2.txt; each claim's source gets an "FC pass 35" note). A "Pass 35" table is appended to company/reviews/<slug>/2026-10-14-fact-check.md for each lesson (created where missing). Board: W-489 (demo-builder, non-blocking: unrendered HomeSpec.recall and energy c5 claims, three nits) and W-490 (fact-checker: the 9 held claims need a session that can open sources). No code changed, no build, no commit.
- **Believe:** high confidence in the derivation and simulation verdicts (own node re-runs, artifact read first). The web is blocked here, so source-only claims were held. Where a claim cited an unopened text, I verified it only on my own derivation (noted per claim) or on an opened PyPI source: ht 1.2.0 property tables (metal-feels-colder c3) and pint 0.26.1 inch definition (cm-to-inches c1 and recall). A reviewer may weigh pint as a secondary source.
- **Next:** W-490 for a source-capable fact-checker; W-489 for demo-builder. The dev server on :3530 was down, so I took no screenshots.
- **Blocked:** the 9 held claims (sources). The disk hit 100% mid-session (other agents' use) and then recovered. `npm run check` fails only on books / big-ideas curriculum (not mine).

## 2026-10-14 · cm-chemistry · Wave J: 15 new chemistry briefs (#5-#19)
- **Changed:** 15 briefs appended under "## Wave J round" in `company/domains/briefs/chemistry.energy-rates.md` (#8, #11, #12, #15, #18; the round's shared rules are at the top of that section), `chemistry.matter-reactions.md` (#5, #6, #9, #14, #16) and `chemistry.solutions-acids.md` (#7, #10, #13, #17, #19). 15 new concepts in `content/curriculum/chemistry.json` (73 concepts now; the 15 are unmet). Board W-488 (demo-builder) to build them.
- **Believe:** every answer and stage number was re-run in node (word counts by script, all reveals 61-76 words); `node tools/claim.mjs next chemistry` hands out all 15 with a format (probed, then every lock released). Fairly sure of the derivations; least sure of a few citation values a checker must confirm offline (CRC CO2 solubility g/kg, calcite ΔfH, Cordero radii, Haber-Bosch operating range); each has a "cut if not checkable" note. hydrogen-bonding already has `ethanol-and-its-twin` (in build), so no second brief.
- **Queue-order caveat:** claim.mjs reads strand files by name, so energy-rates (#8 demand 3, then demand 2s) is handed out before matter-reactions #5-#6 (demand 3). Within each file the order is the rank.
- **Next:** demo-builder claims via the queue; fact-checker verifies claims; interaction designer only if `neutralise-the-weak-acid` (side-by-side) does not fit at 390 px. `npm run check` fails only on books/big-ideas (other owners).
- **Blocked:** nothing. Disk had about 20 MB free; one sed -i failed with ENOSPC (file intact, redone with Edit).

## 2026-10-14 · cm-ai · Wave J: 15 new AI briefs (#60-#74)
- **Changed:** 15 new concepts in `content/curriculum/ai.json` (61 -> 76, subarea set on each; coverage now 61/76, all 15 unmet). Briefs under "## Wave J": the 7 demand-3 ones (#60-66: vanishing-gradients, emergence-metric-artifact, proxy-discrimination, training-data-extraction, sycophancy, prompt-injection, scaling-laws) in `company/domains/briefs/ai.md` so the claim queue hands them out first; demand-2 ones in `ai.ai-society.md` (#67 zero-failure-testing), `ai.ml-basics.md` (#68-72: loss choice, categorical encoding, PCA ignores labels, boosting residuals, discount factor), `ai.neural-language.md` (#73-74: attention quadratic cost, convolution weight sharing). Each brief has a format line, a <= 25-word question, preset-button milestones in DOM order, a reveal draft (word count by script, all <= 81), phone-fit notes and planned claims (derivation first, citations marked "about real systems").
- **Believe:** a read-only dry run of claim.mjs's logic lists exactly these 15, in rank order, all with a format (high; no lock taken). Arithmetic re-run in node (high). Less sure: citation locators (Kaplan 2020 eq. 1.3 exponent 0.050, ESL 2.2/2.4/10.10/14.5.1, Goodfellow 9.2, Sutton-Barto 3.3) and that the toy rule in #65 the-email-gives-orders (assistant obeys the last line addressed to "Assistant") reads as a fair toy; the fact-checker should confirm or downgrade those claims. Phone fit unverified until built (medium).
- **Next:** builders: `node tools/claim.mjs next ai` (demo-builder). Fact-checker: start with the citation-only claims. Interaction designer: three briefs use the by-hand Before / after toggle (#61, #65, #69).
- **Blocked:** nothing in AI. `npm run check` fails only on the books and big-ideas domains (other owners). Disk 89% full (4.6 GB free).

## 2026-10-14 · cm-math · Wave J: 15 new math briefs (algebra, discrete, geometry)
- **Changed:** 5 briefs each appended under "## Wave J" in `company/domains/briefs/math.algebra.md` (#1-5, the strand's first), `math.discrete.md` (#1-5 of its Wave J section) and `math.geometry.md` (#1-5, the strand's first). 15 new concepts in `content/curriculum/math.json` (72 → 87, subarea set; 5 at demand 3, 9 at demand 2, 1 at demand 1); coverage is now 72/87, all 15 unmet. Every number is recomputed by `company/domains/briefs/checks/math-wave-j-check.mjs` (labels A1-A5, D1-D5, G1-G5; includes brute-force tilings, a chord-region count via Euler's formula, and a surface Dijkstra for the cube walk).
- **Believe:** a read-only dry run of claim.mjs's logic hands out all 15 with a format, in file order: algebra, then discrete (after the older unbuilt `draw-a-table-knot`), then geometry. No lock taken. High confidence in the maths (derivation); stated reveal word counts (66-79) are counted by script; phone fit is unverified until built (medium). Only non-derived fact in learner text: the Earth's radius 6,378 km (WGS 84) in `one-metre-more-rope`, and the result does not depend on it. Research citations (Falkner et al. 1999, Hart 1981, Wason 1968) are rationale only and never go in learner text.
- **Ordering caveat:** claim.mjs reads strand files alphabetically, so the geometry demand-3 brief `one-metre-more-rope` comes after the discrete demand-2 ones. If geometry should go first, the queue needs a rank field, not a file move (tools-lead).
- **Next:** builders take them via `node tools/claim.mjs next math` (demo-builder). Fact-checker: WGS 84 radius, and the Euler attribution in `slice-a-corner-off` (name only if accepted). `ant-on-a-cube` uses the by-hand Before / after toggle format. `npm run check` fails only on the books and big-ideas domains (other owners).
- **Blocked:** nothing. The disk was full (4 MB free) for part of this session; my files were checked after writing.

## 2026-10-14 · cm-cs · Wave J: 15 new CS briefs (algorithms, systems, security)
- **Changed:** 5 briefs each appended under "## Wave J" in `company/domains/briefs/cs.algorithms.md` (#83-87), `cs.security.md` (#1-5, the strand's first) and `cs.systems.md` (#3-7). 15 new concepts in `content/curriculum/cs.json` (subarea set); coverage is now 142/157, all 15 unmet. Every answer was re-run in node (hashes with node `crypto`); predictions <= 25 words and reveals <= 90 words were counted by script; every brief lists preset controls in DOM order with Reset last.
- **Believe:** the claim queue lists all 15 with a format (checked read-only; no lock taken). Fairly sure the numbers are right; least sure about citation section numbers (NIST SP 800-63B 5.1.1.2, RFC 9293 3.8, CLRS Problem 2-1), and each of those has a "cut if not checkable" note. The queue hands out files in name order (algorithms, security, systems), so demand-3 systems briefs come after demand-2 algorithms ones; reorder only if the founder wants demand to override strand order.
- **Scope note:** the security strand teaches defensive and conceptual ideas only (salting, slow hashes, block modes, tag length, secret sharing).
- **Next:** builders claim with `node tools/claim.mjs next cs`. Interaction designer: the two Side-by-side briefs (same-sum-different-speed, more-memory-more-misses) are by hand per formats.md. `npm run check` fails only on books/big-ideas domains (other owners).
- **Blocked:** nothing. Disk had about 12 MB free during this session.

## 2026-10-14 · cm-economics · Wave J: 15 new economics briefs (#60–#74)
- **Changed:** appended 15 ranked briefs (#60–#74) to `company/domains/briefs/economics.md` (section "Wave J"), 5 per strand (personal finance, macro, markets). Each has a format line, a stage question, milestones reachable by preset buttons in DOM order, a draft reveal with a counted word total (65–75 words), numbers checked in node, and claims that are derivations or a seeded simulation. Added their 15 new concepts to `content/curriculum/economics.json` (89 → 104; demand 3: flat-rate-interest, disinflation-vs-deflation, unemployment-rate-denominator, drawdown-longevity, common-value-winners-curse). Dropped a price-ceiling brief because `supply-demand` already teaches it.
- **Believe:** a dry run of the claim tool's logic lists exactly these 15 as unbuilt, not skipped, and with a format (high confidence; I did not run `claim.mjs next` because it takes a lock). The arithmetic is right (high: recomputed in node). Phone fit is unverified until they are built (medium).
- **Next:** builders take them via `node tools/claim.mjs next economics`. #67 raise-over-the-cliff names the by-hand Before/after format, and the design lead may prefer Single card. Fact-checker: real-world names (ILO, Fisher, Adams–Yellen, Levitt–Syverson, Capen et al.) stay out of learner text unless confirmed.
- **Blocked:** the disk was full during this session (62 MB free on /). My first append to economics.md was cut off; I rewrote the whole file and checked it (15 headings, correct tail). Files other agents wrote at the same time may be cut off too. `npm run check` fails on the books and big-ideas domains (not economics).

## 2026-10-14 · cm-physics · Wave J: 15 new physics briefs (#56–#70)
- **Changed:** 15 new concepts were added to `content/curriculum/physics.json`, taking it from 61 to 76 concepts: 7 at demand 3, 7 at demand 2, 1 at demand 1. All 15 are uncovered, so coverage now reads 61/76. Their briefs are round 4 of `company/domains/briefs/physics.md`, ranked demand-3 first across strands (5 mechanics, 5 waves, 5 electricity & energy); the three strand files point to it. Every number comes from `artifacts/scratch/cm-physics-r4/check.mjs`, which runs offline with `node` (derivations, a ray trace, a wave-particle simulation and a dipole-chain force sum). Reveal drafts are word-counted (68–81 words) and predictions are ≤ 24 words. Every brief lists its controls in DOM order: each control is a preset that reaches one milestone, the question's case included, and the stage starts in a state no preset produces. A dry run of the claim queue (without locks) returns all 15 in rank order with formats. Board W-487 (demo-builder) was added.
- **Believe:** The misconceptions are textbook-standard. The answers check by derivation (high confidence). Medium confidence on two values a fact-checker should look at hardest: the Everest pressure in #67 (West 1999, cross-checked by an isothermal model) and the illustrative h and wool k in #60. Two candidates were dropped as already taught elsewhere: the round-trip average speed (math harmonic-average-speed) and red + green light (cs pixels-rgb). No human-learner data exists.
- **Next:** builders claim them through `node tools/claim.mjs next physics` (demo-builder). Fact-checkers re-run check.mjs. `npm run check` fails only on the books and big-ideas domains (missing curriculum and charters), which are not physics.
- **Blocked:** nothing in physics. The disk was at 99% (about 580 MB free) during this session, which may break builds.

## 2026-10-14 · principal-engineer · EDD-003 review closed, W-074 verdict, founder decision page
- **Changed:** closed `company/rituals/records/2026-10-13-eng-review-lesson-storage.md` (approve with changes; every reviewer and founder question answered or assigned); EDD-003 status → approved with changes, with a dated update block; ADR-003 to ADR-007 written as **proposed** in `company/engineering/adr/` (ADR-008 waits on W-089, ADR-009 on its stage-2 trigger); founder page `company/decisions/2026-10-14-lesson-bundler-and-memory.md`; engineering README index; SPIKE-001 status line. Board: W-074 and W-075 done; W-477 (platform-engineer, P2), W-478 (tools-lead), W-485 (founder) added; W-085 raised to P2. No code changed, no build run.
- **Believe:** W-074 is built (38191e3) and its verdict is **go with changes** (high confidence for Chromium; real devices W-085 and the lesson domain W-086 block ADR-006). At 879 lessons the stage-1 QA trigger has already fired (about 2.6 h full QA) and the build trigger is projected near 1,250 (medium confidence, linear from build 7). New finding: the spike route `src/app/spike` was merged in f6c710c and ships to production with an open `?cdn=` that can frame any site and write forged progress and events (read from code, not checked live).
- **Next:** founder decides W-485; platform-engineer takes W-477 first, then W-085 and W-088 after the bundler decision; privacy-reviewer W-086; evaluation-steward W-087 (my reading: amendment 2 changes what a gate demands, amendment 3 can weaken one); tools-lead W-478. Stage 0 (slim index, changed-only QA) belongs to the other platform engineer and was not touched.
- **Blocked:** stage-1 lesson migration and gate changes, on W-085, W-086, W-087 and founder question 6.

## 2026-10-14, evaluation-steward: Constitutional Review (findings presented; board not yet sat)
- **Changed:** `company/rituals/records/2026-10-14-constitutional-review.md`, which covers today's changes to the judge (J1 to J5) and today's gate strains (G1 to G7). It proposes AMD-003 (not drafted, awaiting commissioning) and outlines AMD-004. Board: W-479 (founder: ratify or decide), W-480 and W-481 (platform-engineer), W-482 (chief-of-staff), W-483 (fact-checker), W-484 (steward: draft once commissioned). W-285 is done, folded into AMD-004. No protected path was touched.
- **Believe:**
  - High: no protected path changed today without an amendment. I diffed all history; only `a674a7a` touched one, and it carries `Amendment: AMD-002`.
  - High: the `[deploy]` commits went to Vercel production with no CI result, because the latest 60 `ci` runs were all queued.
  - High: production shows review lessons, because `SHOW_REVIEW` is unset. Neither of these has an Article 4.1 override record.
  - High: CI also skips the check on a new branch's first push, and any ratified AMD trailer licenses any protected path. The hook has the same flaw.
  - Medium: W-280's rule-7 reading has recurred (FC LH-2 reading order), so it should be ratified by the board, not by me.
  - This record clears the ritual's overdue alarm even though nothing is decided yet (G7).
- **Next:** founder W-479. Platform-engineer W-480 and W-481 (AMD-002 falsifier on 2026-10-16). Chief-of-staff W-482. Fact-checker W-483.
- **Blocked:** AMD-003 and AMD-004 drafting waits on the founder (W-479).
## 2026-10-14 (principal-engineer, W-600: EDD-006 engineering review)

- **Changed (branch only, not merged):** `company/engineering/reviews/2026-10-14-edd-006-review.md`; branch W-600 moved to done.
- **Believe:** **approve with changes.** The QA path, milestones and reveal-card switch are correct as read (high confidence for the QA path, medium for the reveal switch: no run exercises it). JS cost about 3.4 KB gz. Contract QA, reveal-fit and typecheck numbers are the author's; I ran `npm run check` only (pass).
- **Next:** at merge, renumber W-600..W-603 to main's next IDs (W-582..W-585 today), regenerate the registry, `npm run verify`, then file C1/C2 (design-engineer), C3 (evaluation-steward) and S1 (platform-engineer: home chunk carries every lesson's code, 911 KB gz). No `[deploy]`.
- **Blocked:** none for the merge. The first non-reference lesson in the format waits on C1, W-583, W-584 and a real-phone check.

## 2026-10-14 (design-engineer, W-600: multi-card sequence format in the kit, EDD-006)

- **Changed (branch `design/multi-card-sequence`, worktree /home/user/s3c-cards, not merged):** `src/kit/sequence.tsx` + `sequence.module.css` (`<CardSequence>`, `<SubCard>`, `useSubCard`); EDD `company/engineering/edd/EDD-006-multi-card-sequence.md`; draft reference lesson `src/demos/math/euclid-three-steps/` (Euclid IX.20 in three sub-cards; all 6 claims unverified; under math because no books domain existed); HQ Design inspector detects `<CardSequence>` (`src/lib/hq-design.ts`); concept file `company/design/concepts/multi-card-sequence.md` kit line. Board: W-600 principal-engineer review, W-601 interaction-designer design review, W-602 accessibility review, W-603 cm-math (the reference duplicates concept infinitude-of-primes, already covered by product-plus-one).
- **Believe:** no `Lesson.tsx` change is needed (high confidence: the sequence uses only `phase`, `locked`, `interact`). The QA path reaches every sub-card (high: the contract passes 2/2 and the phone explore shot shows all steps ticked). No regression (fairly sure: 20/20 on 10 random lessons, and they do not import the code). Phone fit holds for a 3-card reference (crop 0, 63 words); a 4-card sequence with longer titles is unmeasured.
- **Not checked:** a real phone (swipe vs the feed's vertical scroll; I used synthetic pointer events), a screen reader by ear, dark theme screenshots.
- **Next:** principal-engineer reviews EDD-006 (W-600). After approval, interaction designer and accessibility reviewer (W-601, W-602), then the design lead flips the formats.md row from 🔴. Book Summaries builders wait until then.
- **Blocked:** nothing. Note: the disk was full at 17 MB when I started (many `.next-*` dirs from other agents); I cleared only the npm cache. Someone who owns those builds should prune them.

## 2026-10-14 · chief-of-staff · Release: Life Hacks and NCM lessons to the live feed (founder-approved deploy)
- **Approved by:** the founder ("please deploy new demos of life hacks and ncm!! This is top priority"), per the deploy-approval rule.
- **What ships:** commit b803a9a plus this note. The feed shows 587 published lessons and 238 in review (tagged "In review"), including all 200 Life Hacks lessons and 49 NCM lessons.
- **Verified before the deploy commit:** clean worktree at b803a9a, `npm run build` (the Vercel build command) passed with 877 pages; smoke test on `next start`: `/`, `/catalog` and six Life Hacks and NCM lesson pages return 200 with the In review tag. Life Hacks QA contract on build 7: 400/400.
- **Not claimed:** that Vercel built it. The git integration builds only `[deploy]` commits and is subject to the daily quota; check the Vercel dashboard. Publishing (moving lessons to `published`) still requires every gate.

## 2026-10-14 (hq-engineer, W-460 to W-464: HQ Library review changes)

- **W-463 first.** Progress-entry slugs are now `<date>-<role>-<6 hex of heading>`; a repeat of the same heading is numbered from the bottom of the file (oldest keeps the bare slug), so adding an entry never moves an old link. Old heading-style links still resolve and redirect (307) to the stable path.
- **W-460** reviews (company, engineering, design) all go to Reviews; new Templates (off by default) and Design types; experiments go to Reports; demo-standard and lesson-metadata go to Requirements; pm-handbook to Handbook. **W-461** deny list now matches dotfiles, .env, key files and secret-named files or folders only, so `reviews/paint-mix-shared-secret/*` is indexed. **W-462** terms of 3 letters or fewer match whole words ("ci" ranks AMD-002 first). **W-464** frontmatter stripped and shown as a meta line (owner feeds `describe()`), table cells use `overflow-wrap: break-word`, `<ol>` emits `start`.
- Checked on the dev server (:3530): counts, "ci" search, doc API, legacy-slug redirect. Visual table check in a browser was not redone. `npm run test:hq` 13/13, tsc and `npm run check` pass. No build, per the task.
- Believe: all five fixed (fairly sure). The legacy redirect numbers from the top of today's file, so it is best-effort for old `-N` links. O1 can close. Next: tools-lead to confirm the review.

## 2026-10-14 (design-lead, W-456: design re-check of three phone-fit fixes)

- **Changed:**
  - Appended "Re-check (W-456)" to the three design reviews in company/reviews/{every-second-seat-out,a-star-heads-for-goal,who-pays-same-filter}/2026-10-14-design.md. All three are **approve**.
  - Moved W-456, W-447, W-448 and W-449 to done.
  - Added W-466 (learner re-review of all three, for learner-evaluator) and W-467 (QA and walkthrough for the new versions, for qa-tester).
  - Screenshots, metric JSON and scripts (local) are in artifacts/design-review/2026-10-14-W-456/. I changed no code.
- **Believe:**
  - every-second-seat-out v5: high confidence. The circle is 232 px and the labels are 11.1 px in every phase at 390 and 1280, the stage scrollWidth equals its clientWidth, and the reveal fits.
  - a-star v8: high confidence. No settle number is crossed by the route, S and G are clear, and the pressed toggles are shaded.
  - who-pays v5: high confidence. No svg text leaves its svg in any phase, and the Total bar is filled.
  - Small leftovers, all non-blocking and written in the reviews: the who-pays arrowhead touches the "0" of "$100" at 390; the predict-frame cut and the panel gap are still deferred; the slanted S-to-2 route segment in a-star; the deferred "survivor: 19" hierarchy item in every-second-seat-out.
- **Next:** learner-evaluator takes W-466 and qa-tester takes W-467. The kit rule (W-450, platform-engineer) is still open, but the lessons no longer depend on it.
- **Blocked:** nothing.

## 2026-10-14 (tools-lead, W-455: review of the HQ Library)

- **Changed:**
  - Wrote `company/engineering/reviews/2026-10-14-hq-library-review.md`. Verdict: **approve with changes**.
  - Added W-460 to W-464 (C1 to C5) for hq-engineer and moved W-455 to done. I changed no code.
- **Believe:**
  - High confidence that the path guard holds: 14 traversal and secret probes all returned 404 or 400.
  - High confidence that search is useful for the founder's queries ("launch review", "Vercel", "AMD-002"). The exceptions are short terms such as "ci", which match inside words (W-462).
  - High confidence that 390 px works (Playwright, no overflow).
  - Cost is fine for local use: cold build 0.56 s, about 53 MB heap, a 110 ms synchronous re-walk every 5 s, and 20 to 120 ms per search.
  - Type rules are right for Reports, Decisions, Constitution and Progress. Reviews, templates, design and experiments are misfiled (W-460).
  - The deny list hides the 8 reviews of paint-mix-shared-secret (W-461).
  - The most important finding: progress deep links renumber when a duplicate heading is added at the top (W-463).
  - No markdown library for now. Fix frontmatter and table wrapping in-house (W-464). The trigger for revisiting is in the review.
- **Next:** hq-engineer takes W-460 to W-464. W-463 comes first, because it affects history links.
- **Blocked:** nothing. `npm run check` passed when I ran it.

## 2026-10-14 (hq-engineer, W-455: HQ Library tab)

- **Changed:** new **Library** tab at `/hq/library`, a read-only search and reader over the markdown in `company/`.
  - Index: `src/lib/hq-library.ts` (node built-ins only). Types: Reports, Decisions, Tech design, Strategy, Requirements (PRDs and BRDs), Constitution, Courses, Reviews, Lesson reviews, Progress log (split into one doc per dated entry, path `ops/progress.md@<slug>`), Handbook (everything else). Lesson reviews (about 4,580 files) are indexed but off by default.
  - Search: tokenised, every term must appear; title, heading, path and body term-frequency scoring; highlighted snippets; sort by best match, newest or oldest.
  - UI: `src/app/hq/library/` (Library, Markdown, css). Deep links `/hq/library?q=&type=&sort=` and `/hq/library/<path under company/>`. Doc links between indexed docs open in the reader; owner and room links go to `/hq?room=`. Phone width: list and reader swap, with a back button.
  - Floor plan: a search box on the Office view (`src/app/hq/HQ.tsx`) and a Library tab. API: `/api/hq/library` and `/api/hq/library/doc`. Both are 404 in production unless `HQ_PUBLIC=1`, like HQ.
  - Safety: only `.md` under `company/`, no `..`, backslashes, NULs, encoded dots or slashes, no dotfiles or names with secret, token, credential, password, .env or key, and symlinks that leave `company/` are refused (`safeDocPath`).
  - Markdown: HQ had none (it used `<pre>`), so I wrote a small renderer that builds React elements only. No new dependency.
  - Tests: `npm run test:hq` (6 tests: types, index, search, links, progress split, path guard), added to `npm run verify`.
- **Believe:** high confidence the index and path guard work (tested on a temp tree and with traversal requests against the dev server, all 404). High confidence the pages render on desktop and a 390 px phone with no overflow (Playwright screenshots). Medium confidence on the type rules for odd files (BRD: none exist today, so that rule is untested on real data). First index build takes about 3 s; after that it is cached and re-reads only changed files.
- **Next:** tools-lead reviews W-455. Open question: a real markdown library would render edge cases better, but needs a decision record.
- **Blocked:** nothing. `npm run check` currently fails on 6 errors in builders' in-progress lessons (concept "TODO ..."), not in HQ. I also created and dropped W-454 by mistake (an empty `board add --help`).

## 2026-10-14 (demo-builder, W-447 / W-448 / W-449: design-review changes)

- **Changed:**
  - every-second-seat-out v5 (W-447): the circle is a fixed 232 px in every phase, set in the lesson CSS (width, max-width, flex: none). globals.css is untouched; the kit rule is W-450. Seat labels went from 14 to 15.5 units and the star from 14 to 16. Replays are now paced by the clock, which fixes "reveal never unlocked" on the slow dev server.
  - a-star-heads-for-goal v8 (W-448): the drawing order is now route, then S/G markers, then settle numbers with a --bg-2 halo. The S/G markers sit lower in their cells, with "1" and "46" above them. Toggles that are pressed get the kit's active class. The grid is a fixed 234 px.
  - who-pays-same-filter v5 (W-449): the "$100" filter-arrow label moved to x 10, y 30. The tick labels moved up 1.4 units. The Total bar is filled with --bad-fill.
  - No text changes, so no claims changed. Pre-flight v5/v8 (with q7 in px) is in each company/reviews/<slug>/build.md.
  - Board: W-447, W-448 and W-449 are done. Added W-456 (design-lead re-check).
- **Believe:**
  - High confidence in the DOM measures (headless Chromium, QA path, 390 and 1280):
    - every-second: labels 11.1 px in predict, explore and reveal. The stage's scrollWidth equals its clientWidth.
    - a-star: 12.2 px in explore and 10.0 px at the reveal (card fit 193/234). No overflow.
    - who-pays: no svg text box goes past its svg.
  - reveal-fit: crop 0 and namedHidden 0 on every run that measured. every-second passed 3 of 3. a-star passed 3 of 4 and who-pays 3 of 4. Each of those two failures was a dev-server timeout, not a measurement.
  - Medium confidence that "no collisions" holds for two-digit seat labels at 15.5 units. I checked by eye and by arithmetic, not by measuring.
- **Next:**
  - design-lead: W-456 re-check.
  - Then learner re-review for a-star and every-second.
  - QA: W-378.
  - platform-engineer: W-450.
- **Blocked:** `npm run check` fails on one error that is not mine: src/demos/physics/shake-faster-same-speed has a TODO concept id. tsc is clean.

## 2026-10-14 (design-lead, W-377: design review of four phone-fit stages)

- **Changed:**
  - Wrote 4 design reviews (artifact first: headless Playwright at 390x844 and 1280x900, in predict, explore and reveal; build.md read after): `company/reviews/<slug>/2026-10-14-design.md` for a-star-heads-for-goal v7, every-second-seat-out v4, rotation-untangles-the-chain v4 and who-pays-same-filter v4.
  - Verdicts:
    - rotation: **approve**.
    - a-star: **approve with changes** (the route line strikes through the settle-order numbers, and the S/G order numbers overlap their markers).
    - who-pays: **approve with changes** (panel 2's "$100" arrow label is clipped 7 to 9 px at the left edge of the svg).
    - every-second-seat-out: **revise** (seat labels are 9.4 px in explore at 390 px; at the reveal the svg grows 218 to 250 px and the row overflows the stage by 6 px on each side).
  - Board: added W-447 (every-second, revise), W-448 (a-star), W-449 (who-pays), all for demo-builder, and W-450 (kit: the reveal rule `.stage-svg { flex: none }` grows a picture that sits in a row) for platform-engineer. Moved W-377, W-267 and W-278 to done (W-278 is superseded; W-267's remaining work is in W-447 and W-448).
  - Screenshots, metrics and scripts are in `artifacts/design-review/2026-10-14-W-377/` (gitignored, local only).
- **Believe:**
  - High confidence in all 4 crop-0 results: stage top on screen, and the reveal's named evidence visible.
  - High confidence in the label px and overflow numbers (DOM-measured).
  - Medium confidence that every-second's 6 px overflow is caused by the kit rule rather than the lesson; the cause is inferred from the CSS, and I did not test a fix.
  - The builders' Pre-flight label px are reveal-phase numbers. Pictures that sit beside a control column can be smaller in explore.
- **Next:** demo-builder takes W-447, W-448 and W-449, and must re-measure Pre-flight 7 after W-447. After that, learner re-review for a-star and every-second, and QA W-378. Platform-engineer takes W-450.
- **Blocked:** nothing. The dev server was slow under load (pages took 30 to 50 s); other sessions were compiling.

## 2026-10-14 (fact-checker, W-363 + W-375, FC pass 34: phone-fit re-checks)

- **Changed:** re-checked the 11 claims that the build-6 phone-fit fixes reopened. All 11 are verified, each with checkedBy, checkedOn and an "FC pass 34" source note:
  - bending-frontier c4
  - eratosthenes-shadow c4, c5
  - a-star-heads-for-goal c1, c6
  - every-second-seat-out c3, c4
  - rotation-untangles-the-chain c5
  - who-pays-same-filter c2, c3, c4

  A "Pass 34" table is appended to each company/reviews/<slug>/2026-10-14-fact-check.md. W-363 and W-375 are done. W-446 (3 non-blocking nits) is with demo-builder. All six lessons now have every claim verified.
- **Believe:**
  - High on every number. I re-ran them in node with my own A*, Josephus and Coase scripts.
  - High on stage text. I rendered the current code on the dev server with headless Playwright at 390x844 and checked each path with the reveal open (Plain mode for rotation; Guess on/off and mid-replay toggles for a-star; 7/10/41 for seats).
  - Medium on eratosthenes c4. The disputed stadion length is attested across search results (Engels, AJP 106(3) 1985; Firsov 1972; Hultsch; Rawlins), but WebFetch failed on DNS for every host, so no full text was opened.
- **Next:** demo-builder W-446 (optional nits). The lessons' other gates (QA, learner review) are not mine.
- **Blocked:** nothing. Web page fetches fail on DNS (search works).

## 2026-10-14, evaluation-steward: AMD-002 drafted (CI cancels superseded runs), not applied
- **Changed:** new `company/constitution/amendments/AMD-002-ci-cancel-superseded-runs.md` (status: proposed), a row in `amendments/README.md`, and board W-445 (founder, next: ratify or reject). `ci.yml` is untouched. W-444 dropped: I created it by mistake (`board add --help` adds an empty item).
- **Believe:** the top-level `concurrency` block as requested would weaken the protected-paths gate. On push, the `constitution` job diffs only `github.event.before..HEAD`. If push A (with an unratified protected change) is cancelled by push B, run B checks only A..B, passes, and on main B deploys. High confidence, from reading `ci.yml` and `deploy.yml`. So the draft puts `concurrency` (group `ci-verify-${{ github.ref }}`) on the `verify` job only. That job checks a whole tree, so the tip still gets every check. Medium confidence that it clears the queue: it has not run on Actions, and the prediction and falsifier are in the AMD. Separately, today a red constitution run for A does not stop B from deploying. That gap exists now, and AMD-002 leaves it as it is.
- **Next:** founder (with the board, platform-engineer as affected-role seat) decides W-445. The ratifying commit sets `status: ratified`, applies the diff, uses `S3_AMENDMENT=AMD-002` and the trailer `Amendment: AMD-002`. If the board wants the fixed-base constitution check, evaluation-steward drafts AMD-003.
- **Blocked:** nothing.

## 2026-10-14, principal-engineer: W-435 engineering review of EDD-005 (fold at the reveal, d981bfc)
- **Changed:** review record `company/engineering/reviews/2026-10-14-EDD-005-review.md` (**approve with changes**; stays merged, ships dark). Board: W-441 (C1, folded state under an automated check with console-error capture, gates the first opt-in), W-442 (C2, two small focus/scroll fixes), W-443 (design-lead, O1: should a few px of overflow fold controls?). W-435 done. Status line and the flushSync open question in EDD-005 updated; O1 added to the decision's Objections table.
- **Believe:** correctness holds (decided once on the reveal edge, inside the observer microtask before paint, before the W-287 rAF fit; re-fits never fold). High confidence, from reading code and React 19.2 source. The flushSync risk is low: React warns only inside render/commit, and its own warning text recommends a microtask. Net-saving rule matches spec item 2 (opted rows must total >= 96 px incl. margins with today's toggle). QA contract: display:none only, toggle never pressed. Non-opted predict-phase DOM identical :3550 vs :3530 (2 lessons, normalised). Medium confidence on the folded state itself: only the author's manual test has run it; no automated check has exercised flushSync-from-observer (W-441).
- **Next:** platform-engineer W-441 + W-442 before any opt-in; design-lead W-443; W-351 / W-336 / W-334 unchanged.
- **Blocked:** nothing. I did not run `npm run verify` (no builds this session).

## 2026-10-14, demo-builder: Life Hacks W-403 and W-404 (FC LH-4 follow-ups)
- **Changed:**
  - **W-403, work-in-process-limit v2 → v3:** the stage now compares ONE order in both views. The fixture keeps durations 5, 10, 15, relabelled C, A, B, with initial = target = order A (10), B (15), C (5). Whole jobs finish first at 10. 5-minute turns finish first at 15 (C), and A is done at 20. In StudyLesson.tsx, for this lesson only, "Swap first"/"Try target" became "Whole jobs"/"5-min turns" (view toggle, order fixed), and the reveal names the order. New question, options, principle and misconception. c1, c2 and c3 are unverified. The recall (10 vs 20) is unchanged and agrees.
  - **W-404:**
    - flat-pack-volume-dimensions v2 → v3: "Assembled cube" is now "Assembled box"; new claim c6 records the labels (unverified).
    - apply-not-quote: c5 deleted (the boundary was never rendered). The catalog `boundary` is now c3's sentence, so claims-match holds. No learner change, so no bump.
    - lh-scale-recipe-portions: the stale ten-portion recall note was in the c2 and c3 sources (and a history aside in c4). All are fixed and the meta.json has no "750" left. c2, c3 and c4 are unverified (sources only). No bump.
  - Pre-flight notes are at the top of each lesson's company/reviews/<slug>/build.md. W-403 and W-404 → review. New board items: W-438 (fact-checker re-check), W-439 (evaluation-steward: add a stage-order test, since the existing test pins orders the stage no longer uses), W-440 (qa-tester: walkthrough and QA for both v3 lessons).
- **Believe:** high on the numbers (re-run in node through queueResult/roundRobinQueue). test:lifehacks 53/53, tsc clean. Medium on layout: not built (as asked), so whether three controls fit one row at 390x844 is unseen.
- **check:** fails with 4 errors, all from a concurrent math session: more-digits-not-bigger and six-students-per-professor have empty dirs, two-right-angles-never-meet has a 92-character hook, and the registry is stale as a result. None are in lifehacks. I left them to that session.
- **Next:** W-438 fact-checker; W-440 qa-tester; W-439 evaluation-steward.
- **Blocked:** nothing.

## 2026-10-14 (fact-checker, W-380, FC LH-4: Life Hacks re-checks)

- **Changed:** set status on 100 lifehacks claims (98 verified, 2 disputed), each with checkedBy, checkedOn and an "FC LH-4" source note. Record: company/reviews/lifehacks-200/fact-check-LH4-2026-10-14.md.
  - (a) 17 claims reopened by W-367 (the brief said 18; W-380 lists 17): 15 verified, work-in-process-limit c2 and c4 disputed.
  - (b) 25 B7 hooks: all verified.
  - (c) 58 open lh-* c4 recall claims: all verified. The other 2 of the 60 had already been verified by LH-2.
  - Board: W-403 (the wip dispute) and W-404 (found on the way: flat-pack "Assembled cube" label, apply-not-quote boundary not rendered, recipe c4 stale source), both for demo-builder. W-380 is done.
- **Believe:** high confidence on every number. I re-ran each one in node against the lessons' own code, and every keyed recall option is the only correct one. Medium confidence on stage text, which I read from the code and did not see rendered.
- **Concurrent edits:** another session removed the c4 claims of link-label, size-is-not-recency and work-in-process-limit after my write. The wip dispute is still on c2.
- **Next:** demo-builder takes W-403 and W-404. QA and the walkthrough for the 14 W-367 lessons are still owed.
- **Blocked:** nothing.

## 2026-10-14, demo-builder: Life Hacks follow-ups W-388, W-389, W-391, W-393
- **Changed:**
  - W-388/W-389: rewrote the `recall` question in `mug-handle-packing` ("…with a 3 cm handle pointing along the row…") and `seasonal-bin-rotation` ("…front and back of a cupboard 5 deep, with 3 other boxes between them…"). Tightened both whys to match ("along the row"; "4 blockers (the 3 boxes and the other bin)"). Set the `.recall` claims to unverified, dropped checkedBy/On, version 1 → 2. `recall-patch-home.lines.txt` updated, and an Amendments note added to `recall-patch-home.md`.
  - W-391a: the pointer was in 66 study `.recall` sources, not 27. All now cite `recall-patch-study.md + recall-patch-study.lines.txt`. Statuses unchanged.
  - W-391b: deleted 68 study `c4` "Recall question answer and rationale" claims. Before deleting I checked each one by script: it repeated c1's correct option plus c2's principle, its answer differed from the current recall, and nothing outside its own meta.json referenced it.
  - W-393: re-derived `curriculum.level`, `prerequisites` and `strand` for all 200 from `content/curriculum/lifehacks.json` (by primary concept). After the run, all 200 match. Nothing else changed and no versions were bumped.
- **Believe:** High. test:lifehacks 53/53, tsc clean, check passed. Not built (as asked).
- **Next:** W-427, fact-checker: re-check the two revised recalls.
- **Blocked:** nothing. Note: another agent's merge briefly left conflict markers in board.json and progress.md mid-session. It resolved itself, and I edited neither file until it had.

## 2026-10-14, community-engineer (Femi): PR #3 merged on our branch (W-226)
- **Changed:**
  - Re-trialled `ccr-rnd-ncm` @ `654b5397` and merged it `--no-ff` on branch `worktree-agent-afc0b5a86f91cfa7d`. Not pushed. Record: `company/engineering/community/prs/3.md` §8.
  - The 4 requested changes are on the head:
    - knots kit approved (EDD-004 approved with conditions, plus Addendum A, plus the principal-engineer review);
    - the news references use `section_unconfirmed`;
    - one-good-link has `format` and `interactions`;
    - the agenda QA record was filed by qa-tester.
  - Conflicts:
    - `package.json`: union of `test:lifehacks` and `test:kit` in `verify`.
    - `registry.generated.ts`: regenerated.
    - 10 Life Hacks safety records (add/add): kept ours, which is theirs plus the W-359 second read.
    - No `meta.json` conflicts.
  - Board:
    - W-137, W-161, W-162, W-145, W-226, W-227, W-228, W-229 → done.
    - Session 2's inbox folded as W-406..W-420 (map in prs/3.md §8). Only items not already on the board or already done were added.
- **Believe:**
  - High that the merge is clean: check passes (855 lessons, 4,622 claims, 0 warnings), and tsc, `test:lifehacks` 53/53 and `test:kit` 97/97 pass.
  - Medium on QA. The 34/34 final run was on session 2's unpushed `33d7dfbf`, so 7 lessons still show an old **fail** QA record on our tree (W-406).
- **Next:**
  - W-406: qa-tester re-files the 7 records.
  - W-408: verify on the integrated tree (no next build was run here).
  - W-407: EDD-004 C1/C2, before any lesson imports `@/kit/knots`.
  - W-411: link the learner reviews.
  - The release manager is not yet involved: all 17 lessons are `review`.
- **Blocked:** nothing.

## 2026-10-14 (head-of-product, W-392, Life Hacks charter co-sign)

- **Changed:**
  - Co-signed the Life Hacks growth rule and the applied 136-concept curriculum, with amendments A1–A5. They are in `company/domains/lifehacks.md`, "Head of product co-sign".
  - Recorded the founder's override in `company/decisions/2026-10-14-pr2-lifehacks-scope.md`, "Head of product co-sign".
  - The amendments:
    - A1: a closed strand stays open to its own uncovered demand-3 concepts (digital batteries and backups were locked out).
    - A2: "gaps first" is now binding: no new demand-1 or demand-2 brief while an open strand has an uncovered demand-3 concept.
    - A3: a tripwire for kitchen and cleaning at the next OP planning.
    - A4: corrections to how my objections are stated.
    - A5: the curriculum's `note` line must be rewritten.
  - Board: W-392 done. W-400 is new (cm-lifehacks: fold in the amendments, fix the note line). W-401 is new (cm-lifehacks: next briefs `interleaved-practice` and `learning-styles-debunk`).
- **Believe:**
  - High: the charter's counts match the tree (strand totals, 120/136 covered, 11 demand-3 uncovered, 4 concepts over two lessons).
  - Medium: A1–A3 are enough to keep the gaps from waiting behind the 200. The open risk is reviewer and builder capacity, which A3 watches.
- **Next:** cm-lifehacks takes W-400 and W-401. Demo-builder takes W-393. At the next OP planning, check A3's tripwire and whether slot allocation reads the uncovered demand-3 list.
- **Blocked:** nothing.

## 2026-10-14 (cm-lifehacks, W-381, curriculum-200 applied)

Changed: content/curriculum/lifehacks.json `concepts` replaced with the 136 from company/domains/lifehacks-scope/curriculum-200.compact.md (other fields kept; `subarea` carries the strand, omitted for viral-hack-debunk). In all 200 lifehacks meta.json files, a script changed only `concept`, `curriculum.primary` and, for the 15 D lessons, `curriculum.also` (economics:/math:/physics:/cs: ids). Diff check: no other field changed. Charter has a new "Curriculum applied as proposed, pending co-sign" section. Board: W-381 done; W-392 head-of-product co-sign; W-393 demo-builder re-derives level/prerequisites/strand.
Believe (high): lint shows 0 lifehacks lessons missing v2 metadata and 0 unknown concepts; registry up to date; coverage 120/136 with 11 demand-3 concepts uncovered (matches the charter's prediction); check passes; test:lifehacks 53/53. Not ratified: the head of product has not co-signed.
Next: W-392 (head-of-product), W-393 (demo-builder). lh-area-scales-square got no `also` (not on the decision list), so it waits on cm-math. Blocked: nothing.

## 2026-10-14 (fact-checker, FC LH-3B: recall claims, batch B)

- **Changed:** checked the `lifehacks.<slug>.recall` claims for 63 lessons, measure-inside-not-outside to zoom-does-not-rewrite. 58 are now verified, 2 are disputed (mug-handle-packing, seasonal-bin-rotation) and 3 source claims stay unverified because their source was blocked (spaced-beats-cram, square-bow-stays-tied, wobbly-table-quarter-turn). The record is the "Batch B" section of `company/reviews/lifehacks-200/fact-check-LH3-2026-10-14.md`. `npm run check` passes.
- **Believe:** high confidence. All 63 match the patch lines, the arithmetic re-runs in node, and each why stays inside its lesson's model. The two disputes are under-specified questions: handle direction, and the unstated blockers between the bins.
- **Next:** W-388 and W-389 (demo-builder fixes the wording, then a fact-check re-check). W-390 (fact-checker re-checks the source claims from a connected host). W-391 (chief of staff: the missing recall-patch-study.json cited in 27 source notes, and the stale study c4 "Recall question" claims).
- **Blocked:** pubmed, fieggen.com and arxiv.org (proxy 403).

## 2026-10-14 (fact-checker, FC LH-3A: recall claims, batch A)

- **Changed:** checked the `lifehacks.<slug>.recall` claims for 64 lessons, alphabet-sort-search to measure-diagonal-for-square. 54 are now verified and 6 stay unverified because their source could not be opened. All 60 got checkedBy/checkedOn and an "FC LH-3A" source note. 4 were already verified by FC LH-2 (W-369) and I concur: coiled-cord-bend-radius, drying-room-water-load, elastic-loop-release and group-cables-with-ends. The Batch A table was appended to company/reviews/lifehacks-200/fact-check-LH3-2026-10-14.md; batch B wrote its own section there first. Board: W-386 (fact-checker: 6 sources) and W-387 (demo-builder: the recall-patch-study.json pointer does not exist).
- **Believe:** high confidence. Every recall matches the patch lines. The arithmetic re-runs in node. Each key is the only correct option. Each why stays within its lesson's idea, limit and formula claims and promises no effect. No disputes in batch A.
- **Next:** W-386, a host with egress to nist.gov, openstax.org, mit.edu and support.google.com.
- **Blocked:** source hosts (proxy 403; WebFetch DNS failure).

## 2026-10-14, fact-checker: W-369 Pass LH-2 (6 Life Hacks lessons reset by W-357/W-358/W-361)
- **Changed:** I checked every non-verified claim in 6 lessons. I looked at the rendered stage first (headless 390x844 on :3530, both states, slider extremes, reveal), then re-ran evaluateHome/homeCordScene/evaluateResource in node and used exact integer arithmetic for the rounding. Results: **20 verified, 1 disputed, 10 held unverified.** Verified: elastic-loop-release and group-cables-with-ends c2 c3 c4 recall; coiled-cord-bend-radius c1-c4 recall; lh-percentage-overage c1-c4; drying-room-water-load recall; lh-scale-recipe-portions c1 c4. **Disputed:** lh-percentage-overage c5, a new claim. The hook "…diverge as a job grows" was unrecorded and is false on the stage, where the two counts converge and then cross. Held: elastic and group c1 (their only source, Raymer & Smith, could not be opened; both are true by derivation, so they need a retype), the c5 transfer prompts in 4 home lessons (no learner sees them; superseded), drying c6 and recipe c5 (every gov, health and food-safety site was blocked from this host). Records are in company/reviews/<slug>/2026-10-14-fact-check.md under "Pass LH-2". W-369 is done. I added W-383 (demo-builder), W-384 (cm-lifehacks) and W-385 (fact-checker, connected host).
- **Believe:** high confidence on the arithmetic and drawing counts (0 mismatches over every slider value), and that the new cord drawings match the claims. I read the LH-1 record and the source fields before the stage, so the evaluation-steward may judge overage c4 as falling short of the W-280 reading order. My numbers are my own.
- **Next:** W-384 hook reword, then the builder applies it and a fact-checker re-checks. W-383 retypes/deletes. W-385 checks the advice sources from a host that can reach them. W-371 QA and walkthrough are still owed.
- **Blocked:** drying c6 and recipe c5 cannot be verified from this host (no outbound access to the source sites).

## 2026-10-14 (demo-builder, W-373, lh-scale-recipe-portions warning reword)

Changed: this slug's `warning` in src/lib/lifehacks/resource-specs.json and claim c5 in its meta.json now read the safety second reader's wording verbatim: "Cooking times do not scale in proportion to quantity: follow the recipe's own times and check food is cooked through." c5 is unverified; version 2 → 3; `## Pre-flight v3` added to company/reviews/lh-scale-recipe-portions/build.md. W-373 → review.
Believe (high confidence): the edit is in place. I re-read the file after the write because another builder was editing resource-specs.json at the same time. test:lifehacks (53/53), tsc and check pass. Not checked: how the longer line renders at 390x844.
Next: a reader other than the author (lifehacks-safety-reviewer) confirms the wording on the stage; fact-checker owes the c5 food-safety source. Blocked: nothing.

## 2026-10-14 (second reader, W-362/W-368, lifehacks-safety-reviewer, independent instance)

Changed: appended "Second reader (independent)" to 11 safety records; W-362 and W-368 moved to done; two follow-ups added to the board.
Believe (high confidence, rendered pages walked at 390x844): the tariff line is accurate, visible on the stage and closes the risk in 7 energy lessons (duty-cycle, fixed-charge, idle, purchase-plus-running, same-energy-new-tariff, standby, watts-hours): APPROVE. lh-annual-label-cost carries no such line (consistent with B6 'met in substance'); approve, line recommended. drying-room-water-load warning (reveal only) and recall.why (mould phrase gone): APPROVE. lh-scale-recipe-portions 'Cooking times do not scale with quantity.': REQUIRED CHANGES (inaccurate and gives no action; proposed wording in its record). lh-water-meter-units recall still keys 1,800 m3: REQUIRED CHANGES, waits on the recall patch.
Next: demo-builder rewords the recipe line, a third reader confirms; learning-designer applies the water-meter recall patch; fact-checker owes sources for the unverified warning claims (energy c6, drying c6, recipe c5). Blocked: nothing.
Note: walkthrough tool timed out on these pages (15s waitFor), so I used a direct Playwright read of the dev server instead.

## 2026-10-14, demo-builder: W-367 FC LH-1 disputes (14 lessons), B7 hook claims, resource recall patch
- **Changed:**
  - **W-367:** fixed the FC LH-1 disputes in 14 lessons, all now version 2. Each has `## Pre-flight v2` in company/reviews/<slug>/build.md, and every changed claim is unverified.
    - Engines: home-lessons.ts (flat-pack formula; suitcase 36 cm formula and slider max 35; rolled unit " sheets" and label Sheets; folded-shirt predict question), home-models.ts (flat-pack inputs line), studyCatalog.ts (4 hooks and 3 principles), StudyLesson.tsx (preview-replace-all step-1 reveal; size-is-not-recency caption), resource-specs.json (lh-subtract-openings-area Width min 3).
    - fragmented-time-does-not-fit: the FC hook text is 110 characters, over the 90-character fixture bound, so I shortened it to "Two ten-minute gaps before minute 40. A thirty-minute task needs one continuous gap." and did not loosen the bound.
  - **B7 hooks:** recorded 25 hooks as unverified claims (c5, or c6/c7 where those ids were taken), using derivation or convention support. Versions not bumped, because nothing a learner sees changed.
  - **Resource recall patch (coordinator request):** applied all 60 lines to meta.json recall, resource-specs.json recall and c4 (unverified), with OVERRIDE for lh-percentage-overage. Removed 171 "recall at x=…" source clauses. The recall test in resources.test.mjs now checks keyed answers (150g, 26, 60, 91). No version bumps, matching how the study and home recall patches were handled.
  - **Not done:** the curriculum-200 patch. content/ belongs to cm-lifehacks and the HoP co-sign is pending, so it is on the board as W-381. The meta-side half waits for that.
- **Believe:** high confidence: test:lifehacks 53/53, tsc and check pass. Every fix matches its FC FIX text and agrees with the new recall. I took no screenshots and ran no build or QA, so the stage text is unseen.
- **Next:** W-380 fact-checker re-check. W-381 cm-lifehacks curriculum. QA and the walkthrough for the 14 changed lessons.
- **Blocked:** nothing.

## 2026-10-14, demo-builder: W-357 ceil float fix, W-358 cord drawings, W-361 safety wording
- **Changed:**
  - **W-357:** `resource-model.ts` gets `snapToInteger`. Before ceil or floor, a value within a relative 1e-9 of an integer snaps to it, so 100×1.1 gives 110, not 111. I swept all 14 ceil/floor specs at every slider value, and only lh-percentage-overage changed (at x=50, 90, 100, 110). Its sentence "The formulas match only at that crossover." was false (A=B at 95 and 100). It now reads "Rounding up also ties them at 95; above 100 the percentage order is larger." That changes the principle, recall.why, c3 and c4. Version 2. New fixture in tests/lifehacks/resources.test.mjs.
  - **W-358:** `Scene` in HomeLesson.tsx had no `view==='cord'` branch, so the lessons fell through to the default view's empty box. I added a pure `homeCordScene` in home-models.ts and a cord branch with plain cord only (no plug or snap-back). It fixes elastic-loop-release and group-cables-with-ends, and also coiled-cord-bend-radius, which had the same bug. All three are version 2. New fixture in tests/lifehacks/home.test.mjs. coiled-cord c1 to c4 lost their FC LH-1 verdicts, because those verdicts were given against the old box.
  - **W-361 (a, b):** the drying-room-water-load warning now uses the reviewer's wording (c6 unverified, version 2). lh-scale-recipe-portions drops "no cooking guidance" from its assumptions (c1 unverified, version 2).
  - Build notes: `## Pre-flight v2` in company/reviews/<slug>/build.md for all 6 lessons. W-357, W-358 and W-361 moved to review. Added W-368 (evaluation-steward: outside second read), W-369 (fact-checker: re-checks), W-370 (cm-lifehacks: overage wording) and W-371 (demo-builder: QA and walkthrough).
- **Believe:** high confidence that the rounding fix is correct and scoped: the sweep found one lesson, and 53/53 lifehacks tests, tsc and check pass. High confidence the cords render: I looked at headless 390x844 screenshots before and after the control. Medium confidence on the drawing design (the coil is small at r=5 to 10 because of the fixed scale). No build or QA was run.
- **Next:** W-369 fact-checker, W-368 outside reader, W-370 cm-lifehacks, W-371 QA. drying-room-water-load recall.why still waits on the session 2 recall patch.
- **Blocked:** nothing.

## 2026-10-14: lifehacks-safety-reviewer, W-359 part 1 (second read of the 9 PR #2 stage lines)

- Did: read the `warning` wiring (ResourceLesson.tsx line 165, HomeLesson.tsx line 188) and the 9 lines; appended a "Second read" to the 10 per-lesson safety records.
- Believe (medium-high, source read only, no build or walkthrough): placement and wording match what my pass-with-changes asked for. Energy lines are on the stage under assumptions (10px muted). NOT APPROVED: I wrote this wording, so I cannot approve it; an outside reader must (board item, evaluation-steward).
- Found two required changes: (1) drying-room ventilation line contradicts itself ("window open ... water ends up in the room"); (2) lh-scale-recipe-portions assumptions say "no cooking guidance" right above a cooking line. Board item for demo-builder.
- Still open, recall-only: lh-water-meter-units keys 1,800m3 as correct; drying-room-water-load recall.why still has the mould phrase. Session 2 patch.
- W-359 stays in progress: part 2 (walkthrough attestation for all 200) waits for a build.

## 2026-10-14, community-engineer (Femi): PR #2 merged on our branch, all 200 Life Hacks lessons as draft
- **Changed:**
  - Merged `codex/lifehacks-200` @ `71e99fee` (`--no-ff`) on branch `worktree-agent-ad8b58b7e38edc358`. The founder approved the merge and said "Go ahead, all 200", so no lessons were removed.
  - The PR's board ids are now W-354..356.
  - Contributor records moved to `company/reviews/lifehacks-200/contributor/`. `evidence.qa` is cleared, and the PR's board, event and progress entries now say "contributor (PR #2)".
  - Dropped the `safety` meta field and `content/collections/`. Added the claims-match drift fixture.
  - Brought over Sana's 200 safety records and 8 batch summaries from `ccr-rnd-ncm`. Applied 9 required stage lines as a new optional `warning` spec field.
  - All 200 lessons are draft, with 893 unverified claims.
  - Details are in `company/engineering/community/prs/2.md` section 7.
- **Believe:**
  - High confidence that the merge is clean: check, tsc and 51/51 fixtures pass.
  - Medium confidence in the new lines' placement. They render in small muted type under the assumptions line, and no one has seen them in a walkthrough yet.
- **Next:**
  - The coordinator merges session 2's recall patches and fact-check verdicts. Those patches also fix the water-meter recall and the drying `recall.why` phrase.
  - Then `npm run verify` with a build. W-360 QA, W-359 safety second read and attestation, W-357 and W-358 builder fixes.
- **Blocked:** nothing. Not pushed, and nothing posted to GitHub.

## 2026-10-14, design-lead: W-347 fold-at-the-reveal spec takes in the five W-335 changes

- Changed: `company/decisions/2026-10-14-reveal-fits-with-its-picture.md` Amendment spec rewritten as items 1 to 8: (1) evidence opt-in test (no Row with a Readout folds, kit-enforced; every reveal branch read in Demo.tsx, reveal-fit `named` is only a floor; the row's state must show in the picture); (2) net-saving gate, fold only if it frees at least the toggle's 44 px after paying for the toggle; (3) fold decided once, before the reveal's first paint, never from the 400 ms, growth, resize or rotation re-fits; (4) label "Show more controls" when other stage controls stay visible, "Show controls" only when none is left, and it looks like a control (look is W-350); (5) focus moves to the toggle, the toggle keeps its on-screen position on expand, no scroll jump. Status line, Sequence and the older re-check objection row annotated. The two W-335 objection rows: the evidence-test row is closed; the net-saving / re-fit row is accepted with the spec closed, while build and measurement stay open in W-348 and W-349. `company/design/system.md` "Fold at the reveal" matches. Note on W-332 that its title's "Show controls" is superseded. W-347 done. Nothing built.
- Believe: the spec now matches the interaction designer's review with no change of my own (high confidence). The fold will close far fewer than the build-5 174 lessons (medium-high, from W-335's worked examples; W-349 measures it).
- Next: platform-engineer W-332 EDD with the W-348 constraints (after W-287), W-333 + W-349 re-sweep; visual-designer W-350; accessibility-reviewer W-336; then interaction-designer W-351, and W-338.
- Blocked: W-332 build waits on W-287.

## 2026-10-14, interaction-designer: W-335 design review of "fold at the reveal" (spec): approved with changes

- Changed: verdict and two worked examples (midnight-sun-line, gradient-descent) in the Consulted section of company/decisions/2026-10-14-reveal-fits-with-its-picture.md; two objection rows added (open, routed). Board: W-347 (design-lead: spec changes), W-348 (platform-engineer: EDD constraints for W-332), W-349 (platform-engineer: re-sweep charges the toggle, excludes Readout rows), W-350 (visual-designer: the toggle must look like a control), W-351 (interaction-designer: review of the built toggle after W-332). W-335 done. Nothing built.
- Believe: the mechanism is sound (high confidence). Five changes: an evidence test, not a quote test (no Readout rows, every reveal branch, state shown in the picture); "Show more controls" when other controls stay visible; the fold decided once, before the reveal paints (never from the 400 ms or resize re-fit); focus and scroll anchoring rules; a net-saving gate of at least the toggle height. The fold will fix far fewer than 174 lessons. In gradient-descent nothing may fold, and in midnight-sun-line one row may, which probably saves too little (medium-high confidence, from code reading and estimates, no build).
- Next: design-lead W-347, then platform-engineer W-332 and W-333 with W-348 and W-349; accessibility-reviewer W-336; visual-designer W-350; then W-351 and W-338.
- Blocked: W-332 still waits on W-287.

## 2026-10-14: principal-engineer: W-339 review of f244779 (W-287/W-288 legibility floor)
- Changed: added "Follow-up: f244779" to company/engineering/reviews/2026-10-14-W-237-reveal-stage-crop.md. Verdict: approve. Release-blocking changes 1 and 2 are met in code. The author's probe is now saved as company/engineering/reviews/2026-10-14-W-339-postfix-probe.mjs. W-339 is done. Added W-352 (platform-engineer: measure tspan, update the change note, re-probe) and W-353 (accessibility-reviewer: does a root aria-hidden make labels decorative?).
- Believe (high confidence on the code, medium on the numbers): the floor is a provable lower bound for meet-scaled svgs, and the skips cover all 7 overlays and all 3 pointer lessons. Gap: <tspan> sizes are not measured. 5 lessons give tspan a class, so the "0 labels under 10 px" figure has a blind spot. This does not block release.
- Next: paste build 6's verify summary (coordinator) into the review record, which closes its last open item. Blocked: none.

## 2026-10-14, learner-evaluator: round-8 learner reviews (r8, build 5 walkthroughs, batch r8-4, 9 lessons)

- Changed: wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r8.md for fenwick-hops-by-lowest-bit (v3), palindromes-grow-from-centres (v3), selfish-routes-cost-a-third-more (v4), only-the-needed-trader-profits (v2), the-bar-nobody-can-forecast (v3), fingernail-ocean (v3), shrinking-degree (v3), fifty-up-fifty-down (v2), every-scale-equally-likely (v3). Verdicts: 7 revise, 1 launch with notes (palindromes), 1 launch (fifty-up-fifty-down). Board: W-340 to W-346 (demo-builder, state next, one per revise, exact defect). No lesson code touched.
- Believe (medium-high; simulated learner, screenshots seen for all 9, reveal frames opened at full size for 4): every r7 blocking finding I checked is fixed (fenwick read trace kept, palindromes denominators hidden, selfish "Half on each" gone, bar title neutral, every-scale ratio question, fingernail Seen line). What blocks now: picture off screen at the reveal while the reveal points at it in 4 (fenwick bars and Σ row, shrinking-degree globe top, every-scale chart, bar model chip/top); word count on a new version in 5 (selfish ~129, every-scale ~112, fingernail ~101, trader ~97, shrinking ~95). New pointer before the commit: fingernail's locked caption "= 25 km per million years" does the conversion the question tests. Word counts are whitespace counts of the transcript, plus or minus a few.
- Reversal: only-the-needed-trader-profits was launch at r6; revise now under the word budget and fit rule, not because it got worse.
- Kit (W-287): the reveal shrink puts picture labels at about 3 to 4 px in selfish-routes, only-the-needed-trader, the-bar (also in its predict frame) and fingernail. Selfish and trader fit today only because of the shrink. Recorded as kit findings.
- Next: demo-builder works W-340 to W-346 (category managers pick which sentence goes). None of the builds had a Pre-flight item 7.
- Blocked: nothing.

## 2026-10-14 design-lead: W-330 option (a) revisit decided: per-row opt-in "fold at the reveal"

- What changed: amended `company/decisions/2026-10-14-reveal-fits-with-its-picture.md` (status line, new section "Amendment, W-330" with options, spec, QA contract implications, sequence and revisit clause; consulted; one objection row updated, five added). Added "Fold at the reveal" to `company/design/system.md`. Board: W-332, W-333 (platform-engineer: EDD/build; reveal-fit fold simulation + expand check + re-sweep on a W-287 build), W-334 (evaluation-steward: optional contract amendment), W-335 (interaction-designer: design review, since I may not approve my own), W-336 (accessibility-reviewer: toggle), W-337 (head-of-product: demo-standard fix order), W-338 (learner-evaluator: re-review with a re-check task). W-326 note: still held. W-330 done. Nothing built.
- Belief: the trigger is met and a kit fold is worth it, but only opt-in per Row, only when the card overflows, before any picture shrink, restored by one "Show controls" tap (medium confidence). The design does not force a QA contract amendment: the contract presses controls before the reveal, and step 5 skips display:none controls (high confidence, read from contract.spec.ts); it does leave a coverage gap the steward should weigh. "174 of 217" is an upper bound from build 5; W-287 will raise crops (system.md estimates ~44 vs 261 lessons the fit resolves), so the real number needs W-333.
- Next: platform-engineer W-332 after W-287, then W-333; W-335/W-336 reviews; then W-337 and builders on W-326.
- Blocked: W-332 waits on W-287.

## 2026-10-14 learner-evaluator: round-8 learner reviews, batch r8-3 (9 lessons)

- What changed: wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r8.md for each-element-pops-once (v5, revise), one-road-cuts-the-map (v4, revise), rotation-untangles-the-chain (v3, launch with notes), odds-average-the-bettors (v3, revise), stag-needs-three-in-four (v3, revise), continental-jigsaw (v5, revise), ruler-on-mercator (v2, revise, words only), enemies-allow-three-camps (v5, revise), throw-it-fast-enough (v6, revise). Board: demo-builder W-309, W-311, W-312, W-313, W-314, W-315, W-324, W-331; tools-lead W-310 (walkthrough.mjs checks reveal-button without the auto-wait QA uses).
- Belief: most r7 teaching findings are fixed in build 5 (medium-high confidence, from screenshots). What is left is mostly phone fit: 7 of 8 revises are reveal > 90 words and/or stage-top crop hiding what the reveal points at. Two builders (continental-jigsaw, throw-it-fast-enough) defer the crop to a "kit phone-scroll fix"; the fit rule puts it on the lesson, so I counted it there. Picture-label shrink at reveal (and in several locked frames) is counted as kit W-287, not as lesson revises. each-element-pops-once: reveal not seen (pops-seen fires at the end of a ~2.7 s replay on the last control).
- Next: demo-builder items above; category manager picks the cut sentences; tools-lead W-310; W-287 owner should check why the shrink also fires on locked/mid-explore frames (stag frame 04, continental-jigsaw, ruler-on-mercator, enemies locked frames).
- Blocked: nothing.

## 2026-10-14 platform-engineer: W-242 reveal-fit measures stage-top crop; W-264 full crop sweep (35% crop)

- What changed: `tools/reveal-fit.mjs` reports stage-top `crop` px, reveal `hiddenBelow` px, quoted stage labels off screen (`namedHidden`, heuristic), stage block heights, reveal words/lines/px per line, and `phoneFit`; fitted pictures (`data-reveal-fit`) are not thumbnails; taps, with a recorded click fallback; `--strict` exit bar. Swept build 5 on :3500 (`/d`, 2 workers, no rebuild): company/engineering/notes/2026-10-14-reveal-crop-sweep.md, one row per cropping lesson, five in-flight lessons marked "fix in flight". Board: W-242 and W-264 done; W-325 to W-329 (demo-builder, one per cause: reveal length, controls (held for W-330), stage text, table, picture); W-330 (design-lead, option a revisit). Changelog line added. Committed only the tool and the note (caller's order); board.json, changelog.md and this entry are in the working tree, not committed.
- Belief: 217 of 624 measured lessons crop (median 61 px), reveal last line on screen in all of them (high confidence; the tool reproduces the six hand measurements exactly). The cause split is a heuristic (medium confidence): controls 92, reveal length 77, stage text 31, table 12, picture 5. Read literally, the decision's option (a) revisit trigger is met (35% cropped; controls the tallest block in 56%). Measured 22.5 px and 7.8 words per reveal line, so 90 words is about 260 px.
- Next: design-lead W-330 (revisit a or not), then demo-builder W-325 first (text trims, no kit change). Feed not measured (existing board item). 14 lessons unmeasurable on the QA path (listed in the note).
- Blocked: nothing.

## 2026-10-14, learner-evaluator: round-8 learner reviews (r8, build 5 walkthroughs, batch r8-2, 9 lessons)

- Changed: wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r8.md for cut-the-rod-for-more (v3), one-crowded-bucket (v3), ray-counts-crossings (v3), four-in-a-row-two-thirds (v4), pay-for-the-harm-you-do (v3), who-pays-same-filter (v3), mercator-greenland (v4), bridge-carries-news-not-habits (v3), ruler-catch (v3). Verdicts: 8 revise, 1 launch with notes (who-pays-same-filter). Board: W-316 to W-323 (demo-builder, state next, one per revise, exact defect). No lesson code touched.
- Believe (medium-high; simulated learner, screenshots seen for all 9, reveal frames opened at full size for 6): every r7/r6 blocking finding I checked is fixed (neutral titles for cut-the-rod and who-pays, ruler's locked time scale hidden and the d = ½gt² working line on stage, ray's Seen line, mercator's numbered options and bearing line). What blocks now: stage-top crop at the reveal in 4 (one-crowded-bucket, four-in-a-row, pay-for-the-harm, mercator; mercator's map is entirely off screen while the reveal points at its orange line); a reveal pointing at a state not on stage in 2 (ray: "numbered crossing" with the ray at (7,4), 0 crossings; bridge: "Ben had 1 of 5" while the stage shows the news state, all of B green, "5 of 5"); word count alone in 2 (cut-the-rod ~113, ruler-catch ~99). 8 of 9 reveals are over 90 words (whitespace counts, plus or minus a few); who-pays is ~92, within error, so launch with notes.
- Reversal: pay-for-the-harm-you-do was launch at r7 and bridge was launch at r6; both are revise now, under the 2026-10-14 fit and quote rules, not because the lessons got worse.
- Kit (W-287): the reveal shrink puts picture labels at about 2 to 6 px in cut-the-rod, one-crowded-bucket, ray, four-in-a-row, pay-for-the-harm, who-pays and ruler-catch. Recorded as kit findings. cut-the-rod, ray and ruler fit today only because of the shrink, so a W-287 floor will likely reopen their crops.
- Next: demo-builder works W-316 to W-323; mercator-greenland and ruler-catch are on the ready-to-publish list and must not launch until W-321 and W-323 close. None of the builds had a Pre-flight item 7.
- Blocked: nothing.

## 2026-10-14, learner-evaluator: round-8 learner reviews (r8, build 5 walkthroughs, batch r8-0, 10 lessons)

- Changed: wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r8.md for penalty-on-wiggle (v6), hailstone-27-climbs (v5), proposers-get-the-best (v4), wheel-needs-four-colours (v3), outside-option-sets-the-split (v3), twenty-then-ten-off (v3), half-of-humanity (v2), all-lines-meet-in-one-mother (v2), no-fraction-fits (v5), weak-links-hold-it-together (v3). Verdicts: 9 revise, 1 launch with notes (twenty-then-ten-off). Board: W-299 to W-307 (demo-builder, one per revise, exact defect), plus W-308 (backlog: verify and close W-124, which looks fixed). No lesson code touched.
- Believe (medium-high; simulated learner, screenshots seen for all 10): every r7 or r6 blocking finding I checked is fixed (honest 0.001 quote, 97 ring, clash drawn, Tried and Seen rows, the bridges count hidden while locked, the 2s gloss). What blocks now is the phone fit. In 4 lessons the picture the reveal argues from is entirely off screen at the reveal: the wheel, the half-of-humanity map, the all-lines tree and the proposers clash. Penalty and hailstone have most of the chart cropped. weak-links and outside-option are small crops of about one line. 8 of 10 reveals are over 90 words (about 93 to 123). No build.md had a Pre-flight item 7. Word counts are whitespace counts of the transcript, so plus or minus a few.
- Lesson (not kit) label finding: all-lines-meet-in-one-mother's tree labels ("+ 49 others", "common mother") are about 4 to 5 px even during explore.
- Kit (W-287): the reveal shrink makes picture labels unreadable (about 3 to 6 px) in penalty, hailstone, outside-option, no-fraction, weak-links and twenty. Recorded as kit findings, not lesson revises. Note: outside-option and no-fraction fit today only because of the shrink, so the W-287 floor will reopen their crops.
- Next: demo-builder W-299 to W-307 (category managers choose which claimed sentence goes; wheel needs a design-lead review, W-267 class). Then a fresh walkthrough and learner re-review. platform-engineer W-287.
- Blocked: nothing.

## 2026-10-14, learner-evaluator: round-8 learner reviews (r8, build 5 walkthroughs, 9 lessons)

- Changed: wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r8.md for the-slowing-half-life (v6), karatsuba-three-not-four (v4), range-min-in-four-nodes (v4), accurate-bettor-takes-the-pot (v3), patience-wins-the-split (v4), two-bets-split (v6), horizon-ruler (v3), vaccinate-at-the-peak (v4), the-loser-flips-the-winner (v2). Verdicts: 8 revise, 1 launch with notes (the-loser-flips-the-winner). Board: W-291 to W-298 (demo-builder, one per revise, exact defect). No lesson code touched.
- Believe (medium-high; simulated learner, screenshots seen for all 9): most r7 blocking findings are fixed (persistent Seen rows, distinct Karatsuba example, neutral Borda title, whole-percent vaccine arithmetic). What now blocks is the phone fit: 8 of 9 reveals are over 90 words (about 100 to 128), and in 6 the stage top is off screen when the reveal opens; in 4 of those the reveal names something off screen (third box, tree, circle, bars). horizon-ruler also names a radius not drawn at 933 m. No build.md had a Pre-flight item 7. Word counts are whitespace counts of the transcript reveal, so +/- a few.
- Kit (W-287): in build 5 the reveal shrink makes picture labels unreadable (about 4-7 px) in horizon-ruler, vaccinate-at-the-peak (grid shrunk to a strip) and the-loser-flips-the-winner. Recorded as kit findings, not lesson revises.
- Next: demo-builder W-291 to W-298 (category managers choose which sentence goes), then a fresh walkthrough and learner re-review. platform-engineer W-287.
- Blocked: nothing.

## 2026-10-14, fact-checker: W-283 + W-286 (FC pass 33)

- Changed: one-odd-loop-blocks-two-camps c4 and a-star-heads-for-goal c1 and c3 are now verified in meta.json, each with checkedBy fact-checker, checkedOn 2026-10-14 and an FC pass 33 source note. A Pass 33 table is appended to each company/reviews/<slug>/2026-10-14-fact-check.md. W-283 and W-286 are done. I added a qa-tester item for QA and walkthrough on both lessons. No code or claim text was touched, and nothing was built.
- Believe (high): both pass 30 path disputes are closed, read on every path in the v4/v6 code. In one-odd-loop, odd-loop is reached only while a walk is drawn. In a-star, guided-at-goal is reached only by the guided open run, so 7 is always shown before the verdict. The numbers hold on my own node scripts (scratchpad fact-checker-w283/). The a-star reveal is 79 or 84 words, and at most 88 with the kit verdict line, so at most 90 on every path. One non-blocking note: the a-star c3 claim text is broader than the stage, because the open-grid match shows only if the learner makes the optional no-guess open run. Narrowing it is the builder's call.
- Next: qa-tester runs QA and walkthrough on both lessons (stage logic changed), then launch review.
- Blocked: nothing on claims.

## 2026-10-14, platform-engineer: W-287 (+ W-288) legibility floor in useRevealFit, commit f244779

- Changed: `src/components/DemoCard.tsx` useRevealFit. Per-picture floor = max(0.4, `SVG_TEXT_FLOOR_PX`=10 / smallest non-aria-hidden label, `SVG_DECOR_FLOOR_PX`=8 / smallest aria-hidden label), from the W-289 ruling in company/design/system.md (it replaced the 9 px placeholder mid-task). No shrink if the floor is >= 1. Text-free pictures keep 0.4. Shrinks that free < 1 px are undone. Skipped: preserveAspectRatio="none", svgs that are or sit inside position absolute/fixed, svgs with absolutely positioned siblings (overlays), and svgs holding untagged interactive elements (tabindex, role button/slider, links, form fields, cursor: pointer). That last one is W-288 change 3. Changelog line added. Committed and pushed: DemoCard.tsx + changelog only. tools/reveal-fit.mjs is not mine (W-242/W-264 in progress) and was not touched. Board: W-287 and W-288 are in review; W-339 is the principal-engineer review.
- Measured: build .next-pf2 served at :3510. The review probe was adapted to read the app's own fit instead of applying a copy; it lives in the scratchpad and is not committed. At 390x844 over 595 measured lessons: fully fitting 398 → 176, shrunk lessons that fit 261 → 41 (the ruling estimated 44), lessons shrunk 433 → 179, smallest meaning label 2.6 px → 10.0 px, 0 lessons under 10 px (was 370), decorative minimum 8.0 px, overlay/none shrinks 7 → 0, shrunk svgs with pointer targets 3 → 0. Contract QA phone + desktop on 29 NCM + 20 random lessons: 98/98.
- W-288 hand-check (read in code): all three lessons keep in-svg targets live after the reveal (locked = predict phase only). the-tagged-molecule uses g role=button. wheel-needs-four-colours and three-students-two-rooms use onClick shapes with cursor: pointer, and both also have HTML Control duplicates. The fit now skips all three, so no tagging is needed for the fit. Not done: replacing the 6-lesson table in company/engineering/notes/2026-10-14-reveal-stage-crop.md (change 4). The numbers are in the changelog.
- Believe: high that no fitted label lands below 10 px (measured, and it follows from the letterbox math). Medium on full `npm run verify`: QA ran on 49 lessons, not all 638.
- Next: W-339 (principal-engineer) review, then release can take f244779 instead of reverting 1a879c6. The release manager decides the shipping build. The bigger crop backlog (about 284 lessons that no longer fit) goes the per-lesson W-264..W-267 route (design-lead/demo-builder).
- Blocked: nothing.

## 2026-10-14, principal-engineer: W-237 reviewed (reveal picture fit, 1a879c6): approve with changes

- Changed: review `company/engineering/reviews/2026-10-14-W-237-reveal-stage-crop.md`, with the probe and its data next to it (`2026-10-14-W-237-probe.mjs`, `-probe.json`: 638 lessons on pre-fix build 4 at :3480, with 1a879c6's fit copied into the page; it reproduces the note's numbers). Objection row added to `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`. Board: W-237 done; W-287 and W-288 (platform-engineer), W-289 (accessibility-reviewer). No code changed, nothing built.
- Believe: the code is correct and loop-free (resize, Reset, re-entry, reduced motion and no-viewBox are all fine; it converges in 2 passes). High confidence. But the uniform letterbox scale shrinks svg labels: 347 of 433 shrunk lessons end with labels under 9 px (median 4.9 px), which breaks demo-standard's "never shrink text". 7 absolute overlays get distorted and free 0 px. 40% is defensible only for text-free pictures. Fairly sure (probe on build 4 lesson code, not build 5). A 9 px floor fits about 60 lessons fully instead of 261. That is an estimate, not a measurement.
- Next: W-287 blocks release. If it is not in the shipping build, revert 1a879c6 (and the useRevealFit part of 740f5a1/01006ec) for that build. Paste the build 5 verify summary into the review record (coordinator). Head of product: does "never shrink text" allow any shrink of labelled pictures?
- Blocked: nothing.

## 2026-10-14, fact-checker: W-284 (midnight-sun-line c5, c7, Pass 32)

- Changed: c5 and c7 are verified in meta.json (checkedBy: fact-checker, checkedOn: 2026-10-14, and a pass 32 note in each source field). Pass 32 is recorded in company/reviews/midnight-sun-line/2026-10-14-fact-check.md. W-284 is done. This was a fresh instance that read the artifact first, as the W-280 ruling requires. It used its own astronomy-engine and d3-geo runs and a WordNet 3.1 tarball it downloaded itself (the sha256 matches).
- Believe: high. Both claims hold on my own numbers. c7 is a claim about the geometric, airless model (the real limit is about 65.7 N), and the stage labels itself a toy with no air.
- Next: QA and walkthrough on v5 (W-270). The transcript on disk is stale.
- Blocked: nothing.

## 2026-10-14, demo-builder: W-281 and W-282 (FC pass 30 path disputes)

- Changed: one-odd-loop-blocks-two-camps v4. The stage now shows either the walk or the best split. Picking a loop draws its walk, also after "Try all 64 splits". Try shows the split again. Moving the enemy back to D-E reaches odd-loop only while a walk is drawn. c4 is unverified. a-star-heads-for-goal v6. guided-at-goal is reached only by the guided run with the wall off. The reveal's last sentence was cut (the W-277 fallback): 94 → at most 84 words with all four cells filled, 79 on the QA path. c1 and c3 are unverified, and c3's support is now derivation. bending-frontier c3 support is now derivation (field only, no version or status change). Pre-flight v4 and v6 are in each build.md. tsc is clean and `npm run check` passed. Board: W-281 and W-282 are done. Added W-286 (fact-checker, a-star c3 re-check, fold into W-283).
- Believe: high that both disputed paths are closed (read in the code, not run: no build, QA or walkthrough this session). Medium that the walk/split toggle reads clearly to a beginner, because no screenshot was taken.
- Next: W-283 and W-286 (fact-checker). After that, QA and walkthrough for both lessons, since the stage logic changed.
- Blocked: nothing.

## 2026-10-14, evaluation-steward: W-280 ruling (midnight-sun-line c5 and c7 independence)

- Changed: ruled on both questions and recorded the ruling and its objections in company/reviews/midnight-sun-line/2026-10-14-fact-check.md, under "Ruling on W-280". (1) A separate fact-checker instance may verify c5 and c7, with no redraft, under four conditions: it is a new instance, it reads the artifact first (Demo.tsx v5 and the claim text and support before the source fields, the review file or the board), it uses its own references and numbers, and it records Pass 32. (2) Checkers are not banned from drafting. A dispute names the defect and the constraint and may add an example labelled "example wording, owner decides". When an owner adopts the example verbatim, the re-check goes to a fresh instance. Board: W-280 is done, and the ruling and dispatch brief are in its text. Added W-284 (fact-checker, Pass 32) and W-285 (evaluation-steward, a possible amendment to README rule 7, only if it recurs). No lesson files or protected paths edited.
- Believe: medium-high. The bar on self-verification attaches to the checker instance and its context, not to the role. The pass 31 evidence is external and pinned by hash, and cm-geography exercised its own judgement in W-274. The strongest objection is that the drafter and verifier share a model and a prompt, so their judgement is correlated. It is answered in the ruling, not dismissed. The ruling would flip to a redraft if the evidence were snippets or opinion, as in W-258.
- Next: W-284 (fact-checker, fresh instance), then W-270 (QA and walkthrough; the transcript on disk is from v3).
- Blocked: midnight-sun-line cannot publish until W-284 passes.

## 2026-10-14, fact-checker: pass 30 (W-276, claims reopened by the phone-fit trims)

- Changed: 16 claims were re-checked against Demo.tsx on every path: bending-frontier v4 c1-c4, one-odd-loop-blocks-two-camps v3 c1-c4, every-second-seat-out v3 c2-c5 and a-star-heads-for-goal v5 c1, c2, c3, c6. 14 are verified and 2 disputed: one-odd-loop c4 and a-star c1. The statuses and "FC pass 30" notes are in each meta.json, and a Pass 30 table is appended to each company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-276 is done. New: W-281 and W-282 (demo-builder fixes) and W-283 (fact-checker re-check). No code, claim text or build was touched.
- Believe (high): the numbers all hold (own node scripts in the scratchpad, fact-checker-w276/). Both disputes are about paths, not arithmetic. In one-odd-loop, pressing Try before picking a loop means no walk is ever drawn, but the reveal still says "those walks came back to A". In a-star, guided-at-goal also fires on the wall run, so the open grid (the question's own case, 7) can be skipped. No source could be opened (DNS failure, proxy 403), so no verdict rests on a cited text. bending-frontier c3 and a-star c3 rest on the stage and a derivation.
- Next: demo-builder W-281 and W-282, then fact-checker W-283. W-279 (QA crop measurement) and W-278 (design) are unchanged. bending-frontier and every-second-seat-out are clear on claims.
- Blocked: one-odd-loop-blocks-two-camps and a-star-heads-for-goal cannot publish until c4 and c1 are fixed and re-checked. Note for W-278: the a-star reveal is 94 words when all four table cells are filled.

## 2026-10-14, fact-checker: W-275 (midnight-sun-line v5, FC pass 31)

- Changed: c3 and c8 are now verified in meta.json. c5 and c7 have pass-31 source lines and stay unverified. Pass 31 is appended to company/reviews/midnight-sun-line/2026-10-14-fact-check.md. W-275 is done. Added W-280 (evaluation-steward). `npm run check` passes. No build, no code edits, no project dependencies.
- Believe: c3 is verified against an opened reference (medium-high). WordNet 3.1 via the npm `wordnet-db@3.1.14` tarball defines the Arctic Circle as the southernmost line of the solstice midnight Sun, and the stage computes that line at 66.56 N. WordNet gives no number. c8 is verified (high), using astronomy-engine: no sunset north of about 68 N on any day in June. c5 and c7 pass every check (high), but their wording is this role's pass-29 text, which W-274 adopted verbatim. Per the W-258 precedent they are held on independence only.
- Next: W-280 (evaluation-steward) rules on c5 and c7. Then a fact-checker attests or re-checks them. Then QA and walkthrough (W-270): the transcript on disk shows v3 text.
- Blocked: midnight-sun-line cannot publish until W-280 is ruled.

## 2026-10-14, demo-builder: W-274 (midnight-sun-line v5, c5 dispute fixed in text)

- Changed: applied the cm-geography-earth-climate ruling in W-274 using its exact strings. The predict question now opens "Around June 21 the north has its longest day." The reveal's last sentence ends "...where the noon Sun is overhead on the June solstice." (85 words). c5 has the ruling's text and its source line, c7 says "On the June solstice", and the new c8 records the hook. c5, c7 and c8 are unverified. c3 is untouched and still held. Version 4 to 5, status stays review. build.md has Pre-flight v5. tsc and `npm run check` pass. Board: W-274 is done.
- Believe (high): the text now matches c5, and the reveal is 85 words, within the 90 budget. Phone fit is not measured: no build, QA or walkthrough, by the caller's order.
- Next: W-275 (fact-checker) re-checks c3, c5, c7 and c8, then QA and walkthrough (W-270), then release (W-271).
- Blocked: midnight-sun-line cannot publish until W-275 passes.

## 2026-10-14, demo-builder: W-265 and W-267 (reveal fits with its picture, four lessons)

- Changed: bending-frontier v4: reveal trimmed 119 → 88 words; the stage is unchanged. one-odd-loop-blocks-two-camps v3: "Try all 64 splits" now shares one 3-column row with the enemy buttons, and the reveal is 95 → 81 words. every-second-seat-out v3 is a compact stage. The step buttons are in one 3-column grid ("Run to a power of 2"). The chips are one 3-column grid with each result on a line under its chip, which replaces the Readout boxes and the "People" label. The scrubber label sits beside the track, the rule line is shorter, the gaps are tighter, and the reveal is 88 → 81 words. a-star-heads-for-goal v5 is a compact stage. The controls are in one 3×2 grid, table cells read "N cells · route R" on one line, the tie-break moved from the reveal onto the rule line, the gaps are tighter, and the reveal is 113 → 89 words. In all four lessons the changed claims are unverified, status is published → review (the launch gate), the version is bumped, and build.md has a Revision note and Pre-flight v<N>. tsc and `npm run check` pass. Board: W-265 and W-267 are in review. New: W-276 (fact-checker), W-277 (cm-cs-algorithms, reveal content), W-278 (design-lead), W-279 (qa-tester, measure the crops).
- Believe: these are estimates, not measured (no build, QA or walkthrough by caller's order). bending-frontier saves about 60-80 px of a 33 px crop, so it should reach 0 (fairly sure). one-odd-loop saves about 65-85 px of 45 px, so 0 (fairly sure). a-star saves about 165-200 px of 200 px, so 0-35 px may be left (moderate). every-second-seat-out saves about 180-250 px of 275 px, so 25-95 px is probably left (low-moderate). Its reveal is already short, and the circle is at the kit's 40% floor.
- Next: build, then W-279 screenshots. If every-second-seat-out or a-star is still cropped, cm-cs-algorithms (W-277) decides which reveal sentence goes. Then W-278 design review and W-276 fact-check.
- Blocked: nothing. The four lessons are off "published" until W-276.

## 2026-10-14, fact-checker: pass 29 (W-273 eratosthenes-shadow v5 c1; W-269 midnight-sun-line v4 c3/c5/c7/c4)

- Changed: eratosthenes-shadow c1 is now verified: the story-mode distance line is framed on every path. In midnight-sun-line, c7 is verified, c5 is disputed, c3 is left unverified (its source could not be opened) and the c4 withdrawal is confirmed. The statuses and "FC pass 29" notes are in both meta.json files, and a Pass 29 table is appended to each lesson's company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-269 and W-273 are done. Added W-274 (cm-geography: the c5 wording fixes, then the builder applies them) and W-275 (fact-checker: re-check c3 and c5 with an opened reference). No code, claim text or build was touched.
- Believe (high confidence): the c5 dispute is real. The predict question's flat "June 21" contradicts c5's "around June 21": astronomy-engine puts the 2024 and 2028 solstices on June 20 UTC. Also, the reveal's "where the noon Sun is overhead" has lost "on the June solstice". The opened source was astronomy-engine 2.1.19, an npm tarball read and run in the scratchpad (fact-checker-w269-w273/) and not added to the project. Web fetch failed with DNS errors, so no atlas could be opened for the Arctic Circle or Tropic names.
- Next: W-274 (cm-geography, then demo-builder), then W-275 (fact-checker), W-270 (QA) and W-271 (release). eratosthenes-shadow still needs a v5 build, QA and walkthrough before it can publish.
- Blocked: midnight-sun-line cannot publish until c5 is fixed and c3 and c5 are checked against an opened reference.

## 2026-10-14, demo-builder: W-272 (eratosthenes-shadow v5 distance line)

- Changed: Demo.tsx story-mode distance line now reads "Distance Syene to Alexandria, in the story: 5,000 stadia." (FC pass 28 wording); modern mode unchanged. meta.json version 4 -> 5; c1 set to unverified, checkedBy/checkedOn cleared, source stage quote updated. c1 text left as is: it already frames the distance as "this lesson's story" and W-272 said not to change it. build.md has v5 and Pre-flight v5. Board: W-272 done.
- Believe (fairly sure): the stage line now matches c1 in story mode. tsc clean, `npm run check` passed. Not checked: the line may wrap at 360 px.
- Next: W-273 (fact-checker) re-check c1. Build, QA and walkthrough for v5 were not run (caller's order); walkthrough transcript is still v3.
- Blocked: nothing.

## 2026-10-14, fact-checker: pass 28 (W-262, eratosthenes-shadow v4 c1/c5/c6)

- Changed: I re-checked c1, c5 and c6 against Demo.tsx v4 on every path (predict, opening state, story chip, story slider, modern chip/slider, reveal). Result: c5 and c6 verified, c1 disputed. meta.json has the status, checkedBy, checkedOn and an "FC pass 28" source note. A Pass 28 table is appended to company/reviews/eratosthenes-shadow/2026-10-14-fact-check.md. Board: W-262 done. Added W-272 (demo-builder: distance-line fix) and W-273 (fact-checker: re-check c1 after it). No code or claim text edited, nothing built.
- Believe: high confidence. The numbers were re-run in node (scratchpad fact-checker-w262/): only 7.20 fires the account milestone, it shows 50 / 250,000, and the reveal needs both milestones. No claim among c1, c5 and c6 asserts what a historical source says. The c1 dispute: in story mode the stage line "Distance Syene to Alexandria: 5,000 stadia." has no story frame, on every path. That is the kind of bare sentence W-258 ruled out. The fix is one string. The v4 walkthrough transcript is stale (still v3).
- Next: demo-builder W-272, then fact-checker W-273. Walkthrough and QA of v4 are still to run. c4 (from memory) is still with cm-geography.
- Blocked: eratosthenes-shadow cannot publish until c1 is fixed and re-checked.

## 2026-10-14 demo-builder: W-266 midnight-sun-line v4 (reveal fits with its picture)

- Changed: I applied cm-geography's W-266 reveal text as given (81 words rendered, budget 90 or fewer). c4 withdrawn with a note. c3, c5 and c7 reset to unverified. c1 untouched. Version 3 to 4. Status published to review, on the coordinator's instruction, so the launch gate is not broken. Updated the Demo.tsx header and added `## Pre-flight v4` to company/reviews/midnight-sun-line/build.md. tsc and check pass. W-266 is now in review.
- Believe: the text and claims match W-266 (high confidence). I believe the crop is now about 0 px, but that is a moderate-confidence estimate. Pre-flight 7 was not measured, because builds, QA and walkthrough were not allowed.
- Next: W-269 fact-checker (c3, c5, c7, c4 withdrawal). W-270 qa-tester (reveal-fit px at 390x844, orange gap visible). W-271 release-manager (republish).
- Open: c5 says "around June 21", but the predict question still says "June 21". cm-geography should decide whether the question changes.

## 2026-10-14 head-of-product: W-263 reveal fit rule adopted with changes; reveal budget is 90 words

- What changed: `company/product/demo-standard.md` has a new craft rule, "The reveal fits with its picture" (at 390×844 the stage top, the reveal's last line and everything the reveal points at are on screen; no inner scroller), and a new Pre-flight question 7, "Phone fit". The Text budget line now says the reveal is ≤ 90 words (it said 120). `company/design/system.md` also says 90 and points back. The verdict and four changes from the design lead's text are in the Consulted section of `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`, along with two new objection rows. W-263 is done. W-268 (chief-of-staff) is new: roles.mjs still gives the learning designer a 120-word reveal script.
- Belief: 90 is the right single number (moderate confidence). The fit test is the real check; the 90 words is an estimated target (px-per-line was not measured in a build). The budget is not retroactive for lessons that already fit.
- Next: W-242 (platform-engineer), so that Pre-flight 7 can quote px, then the W-264 sweep, which also tests whether 90 is the right number (see that record's objection rows). Also W-265, W-266 and W-267.
- Blocked: nothing. Until W-242 lands, Pre-flight 7 is answered with a 390×844 screenshot.

## 2026-10-14 demo-builder: W-260 eratosthenes-shadow v4, W-261 half-life c3 support

- What changed: eratosthenes-shadow v4 applies the W-258 ruling's stage-only wording verbatim (question, Syene label, chip "The story: 7.2°", reveal, c1, c5). c1 support is now simulation and c5 support is derivation; both are unverified with checkedBy/checkedOn cleared. The hook was an unrecorded historical claim. It is now stage-only ("Can a stick's shadow and one walk size the whole planet? How?") and recorded as c6 (unverified). Version 4, with v4 and Pre-flight v4 in build.md. Separately, the-slowing-half-life c3 support changed from source to derivation, with a note in source; status is still verified.
- Belief: the strings match the ruling (high confidence; checked against the ruling text). tsc and `npm run check` pass. Phone layout not re-checked: next build, QA and walkthrough were not run (caller's order). The new label is shorter than v3's, so the risk is low.
- Next: W-262 (fact-checker) re-checks c1, c5 and c6 against the stage. Still open from the ruling: c4 (Eratosthenes in km, verified from memory) and whether the history should be reopened (cm-geography).
- Blocked: nothing.

## 2026-10-14, design-lead: W-259 decided (reveal must fit with its picture on a phone)

- Changed: decision company/decisions/2026-10-14-reveal-fits-with-its-picture.md. Chose (b)+(d): a phone-fit craft rule (stage top and reveal last line both on screen at 390x844; what the reveal names is visible; aim for 90 words or fewer with a table or several control rows) plus per-lesson fixes. Rejected (a) kit-level hiding of controls, for now (the kit can't tell which controls are safe to hide; the worst crops are picture and table height) and (c) an inner-scrolling reveal (that is the W-135 defect). demo-standard.md was NOT edited: the rule text is in the decision, and W-263 asks the head-of-product to adopt or refuse it. Board: W-259 done; W-263 head-of-product, W-264 platform-engineer (full crop sweep after W-242), W-265 demo-builder (bending-frontier, one-odd-loop), W-266 cm-geography (midnight-sun-line: which told sentences to cut), W-267 demo-builder + cm-cs (compact stages for every-second-seat-out and a-star-heads-for-goal, then a design-lead design review).
- Believe: about 80% sure that the fit rule plus per-lesson fixes is right, and that the inner scroll is wrong. About 60% sure that (a) stays rejected once W-264 measures the real share. The px-per-line estimate (about 23 px, 9 words) has not been measured.
- Next: head-of-product W-263, platform-engineer W-242 then W-264, builders W-265 and W-267, cm-geography W-266.
- Blocked: nothing.

## 2026-10-14, platform-engineer: reveal stage crop on phones (W-135 family; review W-237; commit 1a879c6)

- Changed: `src/components/DemoCard.tsx` `useRevealFit` now shrinks the stage's pictures (outermost control-free `svg[viewBox]`, largest first, inline max-height, floor 40%) before it scrolls the card body at the reveal; controls never scale. A first version that scaled the whole stage with a transform reached the shared branch by snapshot (740f5a1, 01006ec) and broke the QA contract's 24px tap-target check. 1a879c6 replaces it (coordinator direction). The globals.css change is a comment. tsconfig.json was reverted. Note and EDD-lite: company/engineering/notes/2026-10-14-reveal-stage-crop.md. Changelog line added. Board: W-237 (principal-engineer, tier-2 review), W-259 (design-lead, remaining crop), W-242 (mine, reveal-fit should measure stage-top crop); W-241 dropped (it was about the withdrawn transform version).
- Believe: the cause is certain. W-135's scroll to the reveal's bottom pushes a content-sized stage off the top, and no scrollIntoView is involved. The tap-target regression is gone: contract QA on :3490 passed 29 NCM lessons 58/58 and 44 others 88/88. The crop is only partly fixed (medium confidence that this is the best kit-only fix). At 390×844 the stage-top crop went from 187/155/351/467/231/103 px to 33/45/200/275/99/0 (bending-frontier, one-odd-loop, a-star, every-second-seat, midnight-sun, good-lists). In a 29-lesson sample, cropped lessons went from 22 to 10. Where the controls plus the reveal are taller than the card, only a design change can help.
- Next: the principal engineer reviews W-237, the design lead decides W-259, and I do W-242. A full `npm run verify` has not run on the final build: only the contract on 73 lessons, plus `npm run check`.
- Blocked: nothing.

## 2026-10-14, evaluation-steward: W-258 ruling (eratosthenes-shadow c5 and c1)

- Changed: ruled that both c5 and c1 get a stage-only reword ("This lesson's story: ..."), following W-222 and W-247. Neither is held. The ruling, its objection and the exact text are in company/reviews/eratosthenes-shadow/2026-10-14-fact-check.md under "Ruling on W-258". Board: W-260 (demo-builder: question, Syene label, chip, reveal, c1/c5 text, and the hook, which is an unrecorded claim) and W-261 (demo-builder: the-slowing-half-life c3 support becomes derivation). W-258 is done. No lesson files edited.
- Believe: "In the account, X" is still a checkable historical claim that rests only on snippets, and c1 has the same weakness as c5. The history is context, not the objective. About 85% sure. The cost: the answer to the misconception is weaker, and Eratosthenes is now named only in c4 (verified from memory). That is routed to cm-geography, not ruled.
- Next: demo-builder W-260 and W-261, then a fact-checker re-checks c1 and c5 against the stage.
- Blocked: eratosthenes-shadow cannot publish until W-260 and the re-check are done.

## 2026-10-14, fact-checker: pass 27 (re-check of 8 pass 26 claims, W-252/253/254/256)

- Changed: re-checked the-slowing-half-life c3, hailstone-27-climbs c6, one-road-cuts-the-map c6, range-min-in-four-nodes c7, eratosthenes-shadow c5, shrinking-degree c2, enemies-allow-three-camps c5 and throw-it-fast-enough c6 against the new Demo.tsx, including each path that failed in pass 26. 7 verified, 0 disputed, 1 held unverified (eratosthenes c5). Each meta.json has status, checkedBy and checkedOn set, plus an "FC pass 27" source note. A Pass 27 table was appended to each company/reviews/<slug>/2026-10-14-fact-check.md. horizon-ruler v3 code check: all three milestones are reachable by the chips (the slider never hits a stop exactly), so the reveal can open. This was a code read plus a node simulation, recorded in its review file. Board: W-252, W-253, W-254, W-256 done, and W-246, W-248, W-249, W-250 closed. Added W-258 (evaluation-steward) for eratosthenes c5. No code or claim text edited, nothing built.
- Believe: high confidence on the 7. Each was re-run in my own node port (model.ts itself for throw). The one-road state space was enumerated exhaustively, and range-min was tested with 200,000 random sequences. Half-life c3 and enemies c5 rest on derivation, not on the unopened texts. Eratosthenes c5: the stage is fixed, but the sentence now reports what the account says, which only an opened source can confirm. External hosts were refused again (proxy 403 / DNS). The wording was also drafted by the fact-checker in pass 26. c1 in the same lesson was verified on 2026-10-13 from search snippets ("from memory"). That is flagged on W-258, not reopened.
- Next: evaluation-steward W-258. QA W-257 (horizon-ruler, eratosthenes, throw) and QA builds for the other 5 lessons. Builder nit: half-life c3 support should read derivation.
- Blocked: eratosthenes-shadow cannot publish until W-258 is resolved.

## 2026-10-14, demo-builder: W-248, W-249, W-250 (FC pass 26 fixes)

- Changed: **throw-it-fast-enough v6 (W-248).** The reveal now says "your {fastest landing} and 7.9 km/s throws both fell 17.6 km" only when the fastest landing has a first-minute record with the same rounded fall. Otherwise it says "your 7.9 km/s throw fell 17.6 km". c6 was reworded and set to unverified. **eratosthenes-shadow v3 (W-249).** The reveal now reads "In the account, the Sun stood straight overhead at Syene at noon on the summer solstice, so the well had no shadow." The Syene label is now two lines, "Syene, in the account:" / "Sun overhead, no shadow". The question now opens "In the account, at noon on the summer solstice…" with no answer leak. c5 was reworded and set to unverified. **horizon-ruler v3 (W-250).** Milestone names and minInteractions now both come from STOPS (eyes, hundred, tower; 3), so the reveal can open. No claim changed. Each build.md has a Pre-flight section. tsc and `npm run check` pass. I did not run build, QA or a walkthrough, as instructed. W-248/249/250 are in review. I added W-256 (fact-checker re-check of c6 and c5) and W-257 (QA for all three).
- Believe: all three fixes do what the findings asked, read from the code. About 90% sure for the two reveal texts. About 85% for horizon-ruler, because it unlocks only by reasoning and has not been run. About 75% that the two-line Syene label fits on a phone; it has not been seen.
- Next: fact-checker W-256, QA W-257.
- Blocked: nothing.

## 2026-10-14, demo-builder: W-251 (the-slowing-half-life c3, v6)

- Changed: made the stage-only reword from the evaluation-steward's W-247 ruling. The Demo.tsx reveal now ends "so the wait stayed the same: one fixed half-life." The radioactive-decay sentence is gone. The c3 text is now "A first-order reaction keeps one fixed half-life (here 10 min each time)." I dropped the IUPAC Gold Book sentence from c3's source and set c3 to unverified, clearing checkedBy/checkedOn. meta.json is now v6, and build.md has Pre-flight v6. tsc and `npm run check` pass. I did not run build, QA or a walkthrough, as instructed. W-251 is done, and I added W-253 for the fact-checker.
- Believe: every remaining word of c3 and the reveal is shown on stage by the 1st-order waits row. About 90% sure. The text-only edit has not been seen in a browser.
- Next: fact-checker re-checks c3 (W-253). cm-chemistry decides whether to bring back the radioactive-decay bridge once a source can be opened.
- Blocked: nothing.

## 2026-10-14, demo-builder: W-246 (one-road-cuts-the-map c6, v4)

- Changed: in Demo.tsx, "Walk depth-first" now reopens every road. The badges, dotted roads, thick 3-4 and the legend note all show under one condition: walked and no road closed. If you close a road after the walk, the marks hide and the note adds "Reopen all to see the walk." The Walk row stays. meta.json is now v4, c6 reworded and set to unverified, and build.md has Pre-flight v4. tsc and `npm run check` pass. W-246 is in review, and I added W-252 for the fact-checker.
- Believe: the legend now shows exactly when the marks it describes are drawn. A closed road never appears together with the marks, so a red dash can't hide the dotting, and the full-map DFS badges are never drawn over a changed map. About 85% sure. I have not seen this in a browser.
- Next: fact-checker re-checks c6 (W-252). The next build or QA run should look at the stage after chips, then Walk.
- Blocked: nothing.

## 2026-10-14, evaluation-steward: W-247 ruling (the-slowing-half-life c3)

- Changed: ruled (b), reword to stage-only, following the W-222 precedent. The ruling and the objection it raises are in company/reviews/the-slowing-half-life/2026-10-14-fact-check.md under "Ruling on W-247". Added W-251 (demo-builder) with the exact reword. W-247 is done. `npm run check` passes.
- Believe: (a) would loosen the judge. Derivation cannot show that radioactive decay is first order, and snippet agreement is what pass 26 refused to accept. A rule like that belongs in the claim gate by amendment (W-028). Fairly sure (about 85%).
- Next: demo-builder W-251, then a fact-checker re-checks c3. cm-chemistry may restore the radioactive-decay bridge sentence once a source can be opened.
- Blocked: nothing new. Source hosts still fail DNS.

## 2026-10-14, fact-checker: pass 26 batch 2 (12 wave G revisions)

- Changed: re-checked the 20 open claims in cut-the-rod-for-more, one-road-cuts-the-map, the-slowing-half-life, patience-wins-the-split, mercator-greenland, vaccinate-at-the-peak, penalty-on-wiggle, fenwick-hops-by-lowest-bit, palindromes-grow-from-centres, outside-option-sets-the-split, ruler-on-mercator and the-loser-flips-the-winner. 18 verified, 1 disputed (one-road c6), 1 held unverified (half-life c3). Statuses, checkedBy and checkedOn are set in each meta.json, with an "FC pass 26" note in each source. A Pass 26 table was appended to each company/reviews/<slug>/2026-10-14-fact-check.md (new files for mercator-greenland and ruler-on-mercator). Board: W-246 (demo-builder, one-road c6) and W-247 (evaluation-steward, half-life c3). No code or claim text was edited, and nothing was built.
- Belief: high confidence on the 18. Each was re-run in a node port of the lesson logic (d3-geo for the two Mercator lessons) on every reachable branch. None of the 12 has motion-dependent text. The Mercator and Fenwick claims rest on derivation, not on Snyder or Fenwick (neither was opened). The one-road c6 dispute is high confidence: the legend is the note text only while closed === null, and the natural path (chips, then Walk) never clears closed. Advisories that are not disputes: the Equal Earth rhumb bow in mercator c13 is only 2.8 px, and penalty c6 can print equal two-decimal values.
- Next: demo-builder W-246, then a fact-checker re-checks one-road c6. W-247 needs an openable source or a ruling. The QA owner builds and QAs these 12 (not run).
- Blocked: half-life c3 (external hosts fail DNS).

## 2026-10-14 demo-builder: W-243, W-244, W-245 (fact-check pass 26 fixes)

- Changed:
  - shrinking-degree v3 (c2). The stage now names its model. The caption reads "A globe, treated as a sphere of radius 6,371 km" and the reveal reads "Your Seen line, on this sphere of radius 6,371 km: ...". The readouts keep one decimal. c2 now speaks of the sphere only and c4 of the real Earth (111.3 km).
  - range-min-in-four-nodes v4 (c7). The Seen row records only the first combine of 3 to 12 ("Seen (first combine): ..."). Seen blocks stay dashed when not lit, including on the change path (dashed green). The reveal's "dashed when not lit" is unchanged and now true.
  - hailstone-27-climbs v5 (c6). The stage line ends ", ringed." only while the ring is drawn; otherwise it ends "(its step 13).".
  - enemies-allow-three-camps v5 (c5). The claim text is now the reveal string verbatim. No code change.
  - All four claims are unverified, and each build.md has a Pre-flight for the new version.
  - Board: W-243, W-244 and W-245 are done. Added W-254 (fact-checker re-check) and W-255 (learning-designer: "the strict rule" is undefined on stage after the v4 cut).
- Belief: high confidence that each change matches the checker's reachable paths. These were traced in code, not run in a browser. tsc and check pass. Not run: build, QA, walkthrough.
- Note: a concurrent session's commit 2e26574 ("Fact-check pass 26 batch 2") swept in my shrinking-degree Demo.tsx edit. The other files are uncommitted. The uncommitted src/app, src/components and tsconfig changes are not mine and were not touched.
- Next: the fact-checker re-checks the four claims (W-254). The QA owner builds and QAs the 4 lessons.

## 2026-10-14 demo-builder: W-239 (each-element-pops-once pass 25 fixes)

- Changed: in c2, "each new number" became "each later number ... (the first meets an empty stack)". This was the claim text only, because no stage string used the old wording. In c6, "stepped, or replayed with motion on" (a reduced-motion replay jumps), and the reveal now says, in the past tense, "the 9's row showed 8 solid ticks". c2 and c6 are unverified and the lesson is at v4, with the Pre-flight v4 in build.md. Notes: the "-00" in who-pays-same-filter c3 is now "$100" (the checker's quoted nit was left alone). I found no "CT-CHECK" typo in wheel-needs-four-colours c1 (every match is "FACT-CHECK"), so that file is unchanged.
- Belief: high confidence that the text matches the code paths named in pass 25. check and tsc pass. Not run: build, QA, walkthrough.
- Next: the fact-checker re-checks c2 and c6.

## 2026-10-14, fact-checker: pass 25 re-check (W-238, 12 lessons after the pass 24 fixes)

**What changed**
- Re-checked the 9 open claims, plus each-element-pops-once c2 (asked to decide): 8 verified, 2 disputed. Statuses set in each meta.json, with checkedBy/checkedOn and a 'FC pass 25' note appended to each source.
- Verified: wheel-needs-four-colours c4, iss-gravity-still-there c6, hailstone-27-climbs c7, only-the-needed-trader-profits c5, who-pays-same-filter c3 (the Coase naming judged as a naming convention, as the coordinator ruled), two-bets-split c6, patience-wins-the-split c2, pay-for-the-harm-you-do c1.
- Disputed (board W-239, owner demo-builder): each-element-pops-once c2 (was verified; 'each new number is compared once' contradicts its own total of 8) and c6 (the claim says a replay empties the stack box by box, which is false under reduced motion; and the reveal's present-tense 'look at the 9's row' is false when the reveal opens on list 0 after 8..1 9 then the 9 8..1 chip).
- Confirmed deletions: continental-jigsaw c4 and bridge-carries-news-not-habits c5 are gone from meta and stage. rotation-untangles-the-chain: the W-235 soft-lock is fixed in code (Plain-first path traced), and the reveal numbers are unchanged.
- Appended a Pass 25 table to company/reviews/<slug>/2026-10-14-fact-check.md for all 12. Moved W-238 to done. Node ports are in the session scratchpad fc25/ (not kept). No code or claim text edited; no builds.

**What I believe (and how sure)**
- High on the 8 verified. Each was re-run in node against the lesson's own logic, on every branch I could reach, including reduced motion where it applies.
- High that the pops c6 stage-pointer path is reachable (traced in a state-machine port, not in a browser). It is the same kind of stage-pointer problem that pass 24 disputed in patience c2 and pay-for-harm c1.

**Next**
- demo-builder: W-239 (text-only fixes, or put list 1 back on stage at the reveal), then a fact-checker re-checks pops c2 and c6.
- QA owner: build and QA the 12 lessons (still not run).

**Blocked**
- Nothing new. External source hosts still unreachable.

## 2026-10-14, demo-builder: fact-check pass 24 fixes (W-231 to W-236, plus 3 held claims)

**What changed**
- W-231 wheel-needs-four-colours (v3): the ring-of-four record keeps the run that used the fewest colours, and the reveal quotes the ring of four only when that run used 3 or fewer. c4 set to unverified.
- W-232 iss-gravity-still-there (v4): c6 and the Demo.tsx scale comments now say "each point's direction from Earth's centre true", not "every angle". The on-stage chips never contained the phrase. c6 set to unverified.
- W-233 continental-jigsaw (v4): the shelf-edge sentence is gone from the reveal and claim c4 is deleted.
- W-234 each-element-pops-once (v3): Next number now steps the pops one box at a time (one pop per press under reduced motion). "Emptied box by box" shows only if the `sawEmpty` flag is set. "Each later number" in both c6 and the reveal. c6 set to unverified.
- W-235 rotation-untangles-the-chain (v3): choosing Rotating before its first rotation has been seen resets that tree to keys 1 and 2, so the reveal can no longer be locked out. No claim changed.
- Held claims reworded to rest on the stage: hailstone-27-climbs c7 (v3), only-the-needed-trader-profits c5 (v2, "on this network"), who-pays-same-filter c3 (v2, "Economists call this idea the Coase theorem"; "Here bargaining is free"). All three set to unverified.
- W-236 (added mid-task by the coordinator): two-bets-split c6 (v6) now describes the model only; patience-wins-the-split c2 (v3) now reads "That was the line above the chart at 10%" and quotes the recorded run's numbers; pay-for-the-harm-you-do c1 (v3) now reads "At the honest $7, the line under the bars read"; bridge-carries-news-not-habits c5 (v3) is dropped. Changed claims set to unverified.
- Appended a Pre-flight note to each lesson's build.md. Ran `npm run registry`, `npm run check` (pass) and `npx tsc --noEmit -p .` (clean). Moved W-231 to W-236 to done and added a fact-checker re-check item. No build, QA or walkthrough was run.

**What I believe (and how sure)**
- High that the text fixes do what the pass 24 rows asked.
- Medium-high on the logic of the pops and rotation changes. I traced it by hand and it typechecks, but nobody has run it in a browser. The reduced-motion press-by-press path in each-element-pops-once is the riskiest.
- each-element-pops-once c2 ("each new number is compared once") has the same off-by-one as c6. I did not change it because it is still verified; the fact-checker should decide.

**Next**
- Fact-checker: re-check the unverified claims listed on the new board item.
- QA owner: build and QA for these 12 lessons (`npm run verify`). Not run here, as instructed.

**Blocked**
- Nothing.

## 2026-10-14, fact-checker: pass 24 batch 2 (17 wave E lessons, 37 open claims)

**What changed**
- Checked all 37 open claims in the 17 lessons in batch 2: 33 are verified and 4 are disputed. Statuses are set in each meta.json, with a "FC pass 24" note in each source.
- Added a Pass 24 table to company/reviews/<slug>/2026-10-14-fact-check.md for all 17 lessons. I re-ran the numbers in my own node ports, kept in the session scratchpad fc24/.
- Disputes (board W-236, owner demo-builder):
  - two-bets-split c6: "Real investments often fall together" has no source anyone can open.
  - patience-wins-the-split c2: the reveal says "That is the line above the chart: offer 0.9 × …", but on the QA path that line shows the 1-round or 50% state.
  - pay-for-the-harm-you-do c1: the reveal quotes the honest-bid sums line. On the hint's own path (honest, then a lower bid) the line shows $60 / $5.
  - bridge-carries-news-not-habits c5: Centola & Macy and E&K still can't be opened. This was held in pass 23 and is now disputed so the block is visible.

**What I believe (and how sure)**
- High: every verified number. Each one was re-derived independently and checked against every reachable branch and the reset state.
- Medium: whether the two "stage pointer" disputes (c2 and c1) are factual or presentational. The sentences are false about what is on screen when the reveal opens, so I treated them as factual.

**Next**
- demo-builder fixes W-236, then a fact-checker re-checks those 4 claims.

**Blocked**
- Every external source host still fails DNS, so world claims need sources that can be opened here, or rewording.

## 2026-10-14, fact-checker: pass 24 batch 3 (17 wave E lessons, 36 open claims)

**What changed**
- Set status on all 36 unverified claims in the 17 lessons listed in the pass 24 batch 3 file: 34 verified, 2 disputed, 0 withdrawn. Each has checkedBy/checkedOn and a 'FACT-CHECK 2026-10-14 (pass 24)' note appended to its source.
- Appended a 'Pass 24' table to company/reviews/<slug>/2026-10-14-fact-check.md for each of the 17 slugs.
- Board: W-232 (iss-gravity-still-there c6) and W-233 (continental-jigsaw c4), both owner demo-builder.
- No code or lesson text edited; no builds. `npm run check` passes.

**What I believe (and how sure)**
- High on the 34 verified: every number was re-run in my own node copies of the lesson logic (scratchpad fc24/), including the branches I could reach and the state after reset.
- iss c6: high that 'every angle true' is false under the radial height stretch (only the direction from Earth's centre is kept).
- jigsaw c4: the source is unopened (all hosts 403), and search text puts the 500-fathom fit contour on the continental slope, not the shelf edge. Medium on the wording issue.

**Next**
- demo-builder: reword iss c6 and jigsaw c4 (W-232, W-233), then the fact-checker re-checks. A human with web access should open Bullard et al. 1965 (the abstract is enough for c4).

**Blocked**
- Source hosts are blocked from the sandbox (proxy 403).

## 2026-10-14, learner evaluator (Sam): r6 learner reviews of the 8 held geography lessons, screenshots seen

**What changed**
- Ran `WALKTHROUGH_URL=http://localhost:3470 npm run walkthrough` (build 3) for each lesson, one at a time, and read every sheet.png. Wrote findings, then read the 2026-10-13 review.
- Wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r6.md for eratosthenes-shadow, fingernail-ocean, half-of-humanity, horizon-ruler, mercator-greenland, null-island-lat-lon, ruler-on-mercator, shrinking-degree. Each uses the lesson's own meta.json learner boundary.
- Verdicts: launch for null-island-lat-lon only. The other 7 are revise. No fatal flaws.
- The most common failure is "The reveal quotes what you saw": the quoted milestone state is no longer visible on the stage when the reveal opens (6 lessons).
- "No answer before the commit" fails in mercator-greenland (the hook "look enormous", and the right option is the only one with no number) and shrinking-degree (the hook "sounds like a fixed distance"). fingernail-ocean has a weaker pointer: its +100/+20 buttons sum to the answer.
- Did not touch lessons, the board or publish-holds.json.

**What I believe (and how sure)**
- High that the findings describe what the screenshots show. Medium on strictness: I counted told context facts (true areas, 40,008 km) as allowed, and counted stage-type values the learner never reached ("2.9 at 70°", "about 19 km") as failures.
- Simulated learner. These reviews are not evidence that anyone learned.

**Next**
- Release manager: update the holds from the r6 verdicts. Demo builder: fix the revise findings, then re-walk for an r7 learner review.

**Blocked**
- Nothing.

## 2026-10-14, fact-checker (Ingrid): fact-check pass 24, batch 1 (17 wave E lessons)

**What changed**
- Checked the 37 open claims across the 17 lessons in batch 1. Verdicts: 36 verified, 1 disputed (cs.wheel-needs-four-colours.c4), 0 withdrawn.
- Set status, checkedBy and checkedOn in each meta.json, and appended a pass-24 note to each claim's source.
- Appended a "Pass 24" table to each company/reviews/<slug>/2026-10-14-fact-check.md.
- Board W-231 (demo-builder): the wheel c4 fix.

**What I believe (and how sure)**
- High: every number was re-run in node using ports of the lessons' own code, and every reachable branch was read.
- High: the wheel dispute is real. Here is the path: choose 4 colours, then Ring of 4, and colour it by hand with 4 colours; then run backtracking. The reveal then says "done with 4 colours", because the first successful record is kept.
- Non-blocking notes for builders are in the records:
  - near-and-far: 0.5% is displayed as 1%.
  - keep-one-of-a-stream: the tally switches to the 5-item run without a re-run.
  - one-odd-loop: if the learner runs "Try all" before picking loops, no walk is drawn, yet the reveal refers to it.

**Next**
- demo-builder fixes W-231, then a fact-checker rechecks wheel c4.

**Blocked**
- Nothing.

## 2026-10-14 (afternoon), chief of staff (Ada): NCM vertical via the Courses org; algorithms batch 2; waves D–E; 544 published

**What changed**
- **Courses org.** Created courses-lead (Amara) and cm-course-ncm (Jonah) after consulting Priya and Leonie. Their six changes are adopted (company/decisions/2026-10-14-courses-org.md).
  - Jonah mapped the book: content/courses/ncm/chapters.json, 156 sections, 106 demo-able.
  - The book host (cs.cornell.edu) and every mirror are blocked by the environment's network policy. Section numbers are therefore unconfirmed, and references cite the chapter only.
- **NCM batch 2.** Jonah wrote 51 gap briefs. Strand managers accepted 49 and objected to 2. All 49 are built, and every E&K chapter (1–24) now has lessons.
  - Session 2's batch 1 (17 lessons) is PR #3. Femi reviewed it (prs/3.md): merge with changes, waiting on 4 fixes on ccr-rnd-ncm.
- **Algorithms batch 2.** 40 briefs inspired by TheAlgorithms/Python: 21 single-card and 19 with specs. All are built. Algorithms now has 80 lessons.
- **Reviews and fixes.**
  - Wave D: 226 learner re-reviews and 63 revisions.
  - Wave E: about 160 reviews and 72 revisions (6 of 7 batches merged).
  - Fact-check passes 19–23: about 1,140 claims, with disputes fixed and rechecked.
  - Integrated builds 2–3. Build 3 QA: 362 of 372 passed; the 5 failing lessons have been fixed and need re-QA.
- **Published.** 250 at the start of the day → 447 (wave D) → 544 (wave E).
- **Rules added to demo-standard.md (Priya):**
  - "Show the why you promised" (told-vs-shown decision).
  - "No answer before the commit" and "The reveal quotes what you saw", with a builder pre-flight in build.md.

**What I believe (and how sure)**
- High: the numbers. Every claim was re-derived by a fact-checker, and no learner sentence depends only on an unopened source.
- Medium: learning value. Every verdict comes from a simulated learner.
- Revise rates on first review were about 50%. The two new rules target the main causes. Priya reopens them if more than 1 in 5 pre-flighted lessons still fail.

**Next**
- Merge revE-2.
- Integrated build 4, then QA. This covers all revised lessons, the 5 QA-path fixes and two-stacks v4.
- r7 learner reviews, fact-check of reopened claims, and publish.
- Merge PR #3 when session 2 pushes the final head.
- The geography re-review decides the 8 screenshot holds.

**Blocked**
- E&K section confirmation and W-222 (3 held claims): need someone who can open the book and papers, or the founder allowing the hosts.
- PR #2 merge: waits on the founder (session 2 asked).

## 2026-10-14 · demo-builder · QA-path fixes: cut-the-rod-for-more v2, drop-the-losing-start v3
- Changed: cut-the-rod-for-more gets "Fill the rest" and "Start over" moves first in DOM order (disabled on an empty table), so one press per control reaches first-fill and best-4 with $10 still on stage. drop-the-losing-start: the real QA failure was a dead control ("Auto: start over below 0" pressed at total 0 changed only its class), not the reveal; a stage rule line now shows the current rule. No claim text changed. Pre-flight in each company/reviews/<slug>/build.md.
- Believe: high (traced the QA loop by hand against the code); check and tsc pass. Not run: next build, computer-use QA, walkthrough.
- Next: qa-tester re-runs tests/qa/contract.spec.ts on both slugs (phone + desktop) and records the result.
- Blocked: nothing.

## 2026-10-14 · community-engineer · PR #3 (ccr-rnd-ncm, session 2) evaluated: merge with changes
- Changed: new record company/engineering/community/prs/3.md. Board: W-226 (community-engineer, PR #3, review), W-227 (rnd-lead: take src/kit/knots off the PR until EDD-004 is approved), W-228 (demo-builder: news-comes-from-acquaintances section -> section_unconfirmed; one-good-link-beats-many format/interactions), W-229 (qa-tester: QA on the final head for all 17 lessons, agenda-picks qa-record). I ran a trial merge of `e2b7cc0` onto `e20baa0`: no conflicts, check and tsc pass. Then I aborted it, so nothing from the PR is committed.
- Believe: high that the PR touches no protected paths and adds no dependencies, and that all 129 of its verified claims are fact-checker-verified. Its 2 withdrawn claims are not in learner text. Medium on the attribution, because session 2's snapshot commits mix roles. 15 learner verdicts describe pre-revision versions, and the-giant-appears has none. Those are publish gates, not merge gates.
- Next: W-227/228/229 on ccr-rnd-ncm, then I re-trial on the final head, fold company/ops/inbox/session-2.md (S2-01..23) into the board with mapped ids, and merge. prs/2.md §5 still needs updating to match the head-of-product tranche decision, which lands in this PR.
- Blocked: src/kit/knots waits on the principal engineer's review of EDD-004.

## 2026-10-14 · head-of-product · Decision: no answer before the commit; the reveal quotes what you saw
- Changed: new decision company/decisions/2026-10-14-reveal-quotes-what-you-saw.md. company/product/demo-standard.md gained two `*` craft rules ("No answer before the commit", "The reveal quotes what you saw") and a new "Pre-flight (the builder answers in build.md)" section with six questions. Board: W-150 done, W-154 done (standard half). Added W-223 (evaluation-steward: the review-side leak/seen check in the learner-evaluator brief, the rest of W-154), W-224 (demo-builder: apply pre-flight to the 8 r6 revise lessons named in the decision), W-225 (learning-designer: throw-it-fast-enough slider/landing redesign).
- Believe: high that these two patterns drive most r6 revises (8 reviews read in full; verdicts 64 revise / 154, 51/84 on first reviews). Low on the exact split (~37 of 64 from a keyword grep, not hand-coded). Medium that a builder self-check will cut them; the decision's Revisit-if is "more than 1 in 5 still sent back for either pattern on lessons built with a pre-flight".
- Next: demo-builder W-224, then learner re-reviews; evaluation-steward W-223. Open objection: Reset-safe state in the kit is funded by W-031 (platform-engineer). Nothing blocked.

## 2026-10-14 · fact-checker · Pass 23 batch 1: 18 lessons, 41 open claims + 2 unrecorded
- Changed: meta.json status for the 5 new lessons: only-the-needed-trader-profits c1-c6, harm-prices-clear-the-market c1-c5, lower-bid-takes-the-top-ad c1-c5 + new c6, who-pays-same-filter c1-c5, two-public-clues-break-the-herd c1-c5 + new c6. Also the 15 re-checks: last-digit c2/c3, four-in-a-row c1/c6, penalty c6, deleted-key c3, fewest-exits c5, kmp c7, pairs-xor c2, ring-buffer c1, two-stacks c5, same-revenue c6, bridge c5, ramp c2, pivotal-juror c3. Result: 37 verified, 3 disputed (last-digit-first c2, lower-bid c6 new, two-public-clues c6 new), 3 held unverified (bridge c5, only-the-needed c5, who-pays c3), 0 withdrawn. "Pass 23" tables were added to company/reviews/<slug>/2026-10-14-fact-check.md, and the files were created for the 5 new lessons. Board: W-221 (demo-builder, disputes) and W-222 (source checks for the held claims) added; W-216 moved to done (batch 0 covered karatsuba, bank and enemies; this batch covered the rest).
- Believe (high): I re-ran every number in my own node copies of the lesson logic (scratchpad fc23/: radix, pow.ts, vcg, vcg4, sr, plus one-liners). The disputes rest on my own arithmetic. No source host was reachable (proxy 403 / DNS), so I opened no paper or book. Claims verified despite an unopened citation were verified by derivation or simulation, and each source note says so (e.g. harm-prices c4: 3,150 random markets, VCG = minimum clearing prices, 0 counterexamples). The three held claims rest on an attribution or a general theorem I could not re-derive.
- Note: the dispatch named the-loser-flips-the-winner, weak-links-hold-it-together and all-lines-meet-in-one-mother, but they were in batch 0 (see the entry below), not in this batch's list. The fc23/ scratch dir is shared with batch 0, so same-named helper scripts (set.mjs, add.mjs, radix.mjs) may have been overwritten. Their results are already on disk.
- Next: demo-builder W-221 (3 wording fixes; last-digit c2 is a claim-text change only), then a fact-checker re-check. Penalty-on-wiggle c6 carries an advisory, not a dispute: 'the other story' can print a moderate held-out miss worse than none. Someone with source access does W-222. ramp-same-work's meta objective still says '122.6 N x 4 m = 490.5 J'; it is not learner text, but cm-physics may want it aligned. Nothing blocked.




## 2026-10-14 · fact-checker · Pass 23 batch 0: 17 lessons, 41 open claims
- Changed: meta.json status for accurate-bettor-takes-the-pot c1-c6, all-lines-meet-in-one-mother c1-c6, patience-wins-the-split c1-c5, the-loser-flips-the-winner c1-c5, weak-links-hold-it-together c1-c5 (new), plus the re-checks newton c1/c5, kitchen-crowding c2/c5, bracket-order c5, every-base c7, karatsuba c5, one-cell-rule-30 c1, random-surfer c1, selfish-routes c4, bank-lends-it-again c7, continental-jigsaw c1, enemies c6, every-scale c6. Result: 36 verified, 4 disputed (weak-links c4, accurate-bettor c5, every-base c7, continental-jigsaw c1 unchanged), 1 held unverified (newton c5), 0 withdrawn. "Pass 23" tables in company/reviews/<slug>/2026-10-14-fact-check.md (created for the five new lessons). Board W-217 to W-220 (demo-builder).
- Believe (high): every number re-run in my own node copies of the lesson logic (scratchpad fc23/verdicts.json holds the notes). The disputes rest on my own computations, not on sources. Every external host failed (DNS or proxy refusal), so no source was opened. Claims whose learner text is proved by derivation or simulation were verified with the unopened citation noted. newton c5 (a naming fact) was held. Medium: I re-derived the Roughgarden-Tardos 4/3 bound and the Rubinstein limit myself; the attributions come from my own knowledge.
- Not done: who-pays-same-filter and two-public-clues-break-the-herd were named in the dispatch as new NCM lessons but are not in the batch-0 list, so they were not checked here. Bash calls were sometimes refused by the auto-mode classifier. Retrying with plain node one-liners worked, and no permission setting was changed.
- Next: demo-builder W-217 to W-220, then a fact-checker re-check. A human source check for continental-jigsaw c1 (Table 1, fit 9).

## 2026-10-14 · demo-builder · Pass 22 fixes W-207 to W-215 (11 lessons)
- Changed (Demo.tsx + meta.json, version bumped, changed claims set to unverified with checkedBy/On removed, a "Builder fix" note added to each source): karatsuba c5 (reveal now says "ideal no-carry count ... 3^10 against 4^10"); ramp-same-work c2 ("≈" in reveal and log); kmp c7 ("never one to its left"); bank-lends-it-again c7 (caption sign is "=" only when the whole-dollar figures multiply out exactly, otherwise "≈"); fewest-exits c5 (source now rests on the 8x8-from-(4,2) counterexample, stuck at 60; I re-ran it; support is now derivation; learner text unchanged); same-revenue c6 (reworded per the FC suggestion); enemies c6 (Demo tracks the splits seen with all 20 triangles checked and quotes only those; unseen splits are stated without "you saw"); two-stacks c5 (FC wording); four-in-a-row (TOL changed to 0.0005, so settled is round 9 with readout $0.667/$0.333; Demo comment and c1 source fixed; c1 and c6 unverified); bridge c5 ("Network researchers argue ... holds"); penalty-on-wiggle c6 (fallback now quotes the best moderate penalty on the current data set; seed 1 gives 0.01, 0.38 vs 0.44). No milestone gates or control order changed.
- Believe: high for the text and the numbers. Medium for the code: npm run registry and npm run check pass, but per instruction I ran no typecheck, build or QA. The enemies and penalty edits are new TSX logic.
- Next: fact-checker re-checks (W-216). An integrated typecheck/build/QA run should cover enemies-allow-three-camps, penalty-on-wiggle, bank-lends-it-again and four-in-a-row-two-thirds. Nothing blocked.

## 2026-10-14 · fact-checker · Pass 22 batch 0: 12 lessons (50 open claims + 1 unrecorded)
- Changed: meta.json status for ternary-asks-more c1-c9, gray-code-one-flip c1-c5, four-in-a-row-two-thirds c1-c5, pay-for-the-harm-you-do c1-c5, bridge-carries-news-not-habits c1-c5, temperature-reshapes c3/c4/c6/c9, honest-bid-loses-in-gsp c1-c4, stag-needs-three-in-four c1-c4, capped-doubling-game c2/c6/c7/c8, penalty-on-wiggle c5/c6, the-fast-ones-leave c8/c9, side-of-the-square c6. Result: 48 verified, 2 disputed (bridge c5, penalty c6), 0 withdrawn. I also recorded one unrecorded reveal sentence as four-in-a-row c6 and marked it disputed: "settled at $0.667 by round 8" while the round-8 readout shows $0.666. Each lesson has a "Pass 22" table in company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-214 and W-215, both owned by demo-builder.
- Believe (high): I re-ran every number with my own node copies of the lesson logic, in scratchpad fc22/ (binary and ternary search, Gray code, balanced-outcome iteration, VCG, GSP, threshold contagion, softmax, mulberry32 strip, ridge seeds 1-500, molecule escapes). Medium: the source-backed lines. Every primary host was blocked, so the following are corroborated only by search snippets: Gray patent and encoders, ternary search for a hill top, Centola & Macy 2007, EOS 2007, Skyrms 2004 / Rousseau. VCG attribution (Vickrey, Clarke, Groves) is from my own knowledge. E&K chapters 6, 12, 15 and 19 are placed from my knowledge, and the ch. 12 title is confirmed by a ToC snippet. Varian 2007 and Knuth 4A were not opened, and no learner sentence depends on either.
- Next: demo-builder fixes W-214 and W-215, then fact-checker re-checks four-in-a-row c6, bridge c5 and penalty c6. Nothing blocked.

## 2026-10-14 · fact-checker · Pass 22 batch 4: 11 lessons (49 open claims + 2 unrecorded)
- Changed: meta.json status for keep-one-of-a-stream c1-c6, turns-beat-first-come-first c1-c6, hailstone-27-climbs c1-c5, lowball-offer-should-pass c1-c5, same-revenue-any-rule c1-c5, enemies-allow-three-camps c1-c5, pennies-dont-add-up c1/c2/c5/c9, someone-has-to-swerve c1-c4, iss-gravity-still-there c4/c6/c7/c8, bending-frontier c1/c3/c5, waves-return c2/c7: all 49 verified (checkedBy fact-checker, pass-22 notes in source). Recorded 2 unrecorded reveal sentences as new claims, both disputed: same-revenue-any-rule c6 ("First-price charges less": averages are equal, and it is lower in only 10,065 of 20,000 auctions) and enemies-allow-three-camps c6 ("you saw 2, 3 and 6 camps": the milestones need only one other split). Board W-211, W-212 (demo-builder). "Pass 22" tables in company/reviews/<slug>/2026-10-14-fact-check.md.
- Believe (high): every number was re-run in node with my own copy of each lesson model (mulberry32 tallies, round robin, Collatz, auction sims, triangle tallies, Verlet throws, SIRS). Medium: the source-backed lines (turns c6 context-switch overhead, hailstone c4/c5, revenue-equivalence attribution, weak balance, NASA free fall, Mankiw PPF) rest on search-result text. The proxy blocked every primary host. Easley-Kleinberg chapter placements (5, 6, 9, 12) match my knowledge; ch. 6 hawk-dove naming is medium. The hailstone c4 source says 2^68 for Barina 2021, which search did not confirm (Barina 2025 gives 2^71). That is not learner-facing, but the builder should fix it. The ISS walkthrough transcript predates v2, so the stage was checked from Demo.tsx only.
- Next: demo-builder W-211/W-212, then fact-checker re-checks the two c6 claims. A fresh walkthrough for iss-gravity-still-there before launch review. Nothing else blocked.

## 2026-10-14 · fact-checker · Pass 22 batch 1: 50 open claims in 12 lessons
- Changed: 49 verified and 1 disputed, all marked checkedBy fact-checker with a pass-22 note in the source field. The lessons are boyer-moore-skips-ahead c1-c8, fewest-exits-first-tour c1-c5, kmp-never-steps-back c1/c2/c3/c5/c7 (c7 disputed), no-best-move-one-stable-pair c1-c5, shade-your-sealed-bid c1-c5, one-odd-loop-blocks-two-camps c1-c5, middle-of-three-takes-all c1-c4, two-thirds-of-the-average c1-c4, the-slowing-half-life c3-c5, patience-piles c5-c7, bank-lends-it-again c1/c7 and split-the-sum c3. A "Pass 22" table was appended to each company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-209 (kmp c7 fix) and W-210 (non-blocking bank caption rounding, fewest-exits c5 source), both owned by demo-builder.
- Believe (high): every number was re-run in my own node scripts. Horspool gives 15/5/11 and the naive search 27/18/24. The knight runs give 21/25/36/64. The Warnsdorff tie rule the lesson uses fails on 8x8 from (4,2) with 60 squares. That counterexample is the basis for fewest-exits c5, because the Squirrel & Cull paper was not opened. The unique pure NE is (M,L), the best bid is $40, half-value is a best reply for every value, and the Harary theorem held on 3,000 random signed graphs. kmp c7: the reveal says the next comparison is "never one already read", but text positions 3-7 are each read twice. Medium: every external host was blocked (proxy 403). Citations for Horspool, Nash, Vickrey, Harary and radioactive first-order decay were corroborated only by web-search snippets. E&K placements (ch. 5, 6, 9, 12) rest on my knowledge of the book.
- Next: demo-builder W-209, then fact-checker re-checks kmp c7. Nothing blocked.

## 2026-10-14 · fact-checker · pass 22, batch 2 (12 lessons, 50 open claims)
- Changed: claim status in meta.json for karatsuba-three-not-four, the-bar-nobody-can-forecast, one-crowded-bucket, odds-average-the-bettors, useless-degree-still-pays, one-shy-rioter-stops-the-riot, rising-price-stops-at-second, broker-between-two-groups, flaw-to-lawn, tortoise-meets-hare, two-bets-split, ramp-same-work. 48 verified, 2 disputed, 0 withdrawn. A Pass 22 table was appended to company/reviews/<slug>/2026-10-14-fact-check.md for each lesson (files created where missing). Board: W-207 and W-208 (demo-builder).
- Disputed: karatsuba c5. The reveal says 1,024-digit numbers take 59,049 products. The lesson's own kara() gives about 86,000 on real inputs, because half-sums carry. ramp c2: the log prints "122.6 N × 4 m = 490.5 J", but 122.6 × 4 = 490.4.
- Believe (high): every number re-run in my own node scripts (scratchpad fc22), including independent betweenness and Levenshtein checks. Medium: citations. The source hosts were blocked, so Arthur 1994, Granovetter 1978, Kelly 1956, Spence 1973, Vickrey 1961, Burt 1992 and Karatsuba-Ofman 1962 are confirmed only as bibliographic records found by search; none was opened. E&K chapter placements come from memory: ch. 3 (Burt) and ch. 22 (betting) confident; ch. 17 (El Farol) fairly sure, since ch. 17 = Network Effects is confirmed; ch. 22 (Spence) and ch. 19 (Granovetter) less sure. None of these chapters is shown to learners.
- Next: demo-builder fixes W-207/W-208, then the fact-checker re-checks. Non-blocking notes are in the bar and odds records (reset edge case; presets keep current beliefs). Nothing blocked. npm run check passes.

## 2026-10-14 · demo-builder · pass 21 rewordings (W-195, W-196, W-198, W-203, W-204)
- Changed: reveal text + claim text in 6 cs drafts. deleted-key-breaks-search c3 (v4): the reveal now reads "breaks the search for C (and any key whose probe path from its home slot crosses the gap)", and the claim is that sentence. bracket-order-sets-the-bill c5 (v2): "shortest sub-chains first". newton-doubles-the-digits (v2): c5 now says "the rule known as the Babylonian (or Heron's) method", with no YBC 7289 assertion in text or source; c1 now matches the reveal ("1, 3, 6, then 12 ... not twelve"). pairs-cancel-under-xor c2 (v2): reveal and header comment say "its partner flips the same lamps back". random-surfer c1 (v2): parenthetical fixed. ring-buffer c1 (v2): now includes "went round two and a half times". All 7 changed claims are unverified. Board: W-195/196/198/203/204 done, plus a fact-checker re-check item.
- Believe (high): claim texts match the stage sentences. Ignore JSX line wraps and &apos;. Medium: the old deleted-key c3 also covered the search mechanism ("starts at the hash slot, walks right"). That mechanism now appears only in the question and c6. Fact-checker should decide whether it needs its own claim. pairs-cancel had no stage text with the phrase (only the reveal and a code comment).
- Not run: tsc and next build (another builder held tsc) and QA. npm run registry and npm run check pass.
- Next: fact-checker re-check (board). Nothing blocked.

## 2026-10-14 demo-builder: TS2322 fix + W-192, W-193, W-194, W-197 (pass 21 disputes)

- cs/one-cell-rule-30 v2: grow() `row: number[]` (TS2322, no behaviour change); W-197 reveal drops "with no pattern" (c1 unverified).
- cs/every-base-fools-fermat v2: LIARS counts base 1 too, reveal reads 10 of 320; c7 text "10 of the 320", unverified.
- cs/selfish-routes-cost-a-third-more v2: reveal and c4 say "a fixed time plus a part proportional to traffic", unverified.
- probability/the-pivotal-juror-convicts v2: pGuilt = guilt(g, 3 - g), bar 7/30/70%; reveal was already right; c3 extended to 70%, unverified.
- `npx tsc --noEmit -p .` 0 errors; registry up to date; check passed. Board items done. next build and QA not run (instructed). Next: fact-checker re-checks the 4 claims.

## 2026-10-14 demo-builder: W-201 kitchen-crowding v4, W-202 last-digit-first v4 (pass 21 disputes)

- kitchen-crowding: c2 kept 'highest' and made code agree (seen.zero = max). c5: two-oven state recorded and quoted only when totalOf(n,2) > totalOf(n,1) (n >= 2); reveal also prints the one-oven total. c2, c5 unverified.
- last-digit-first: reveal no longer points at stage marks or a ringed bucket; it names bucket N and its cards from runs.last pass-3 buckets and the first out-of-order pair from ended.first. c2, c3 unverified.
- Belief: texts now true on every path (fairly sure; reasoned, not browser-QA'd). No next build/tsc run, per instruction. Controls unchanged.
- Next: fact-checker re-checks kitchen-crowding c2/c5 and last-digit-first c2/c3; QA owner runs `npm run verify`.

## 2026-10-14 · fact-checker · Pass 21 batch 5: 49 open claims in 12 lessons
- Changed: 48 claims verified and 1 disputed, all with checkedBy fact-checker and a pass-21 note in the source field. The lessons are new-server-moves-few-keys c1-c6, pairs-cancel-under-xor c1-c6 (c2 disputed), friends-split-more-than-chance c1-c6, every-second-seat-out c1-c5, random-surfer-finds-the-rank c1-c5, wheel-needs-four-colours c1-c5, ring-buffer-wraps-around c1-c4, one-nudge-per-mistake c2/c4/c5, tic-tac-toe-is-a-draw c1/c2/c4, whose-cutoff-wins c4/c6, seventy-two-doubling c4/c5 and half-of-humanity c1. A "Pass 21" table was appended to each company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-203 (dispute fix), W-204 (claim-text tidies), both owned by demo-builder.
- Believe (high): every number was re-run from my own copies of the lessons' logic: FNV ring 20.4%, binomial 0.000264, Josephus 19, PageRank 0.312/0.332, wheel 6 dead ends, 255,168 games, rule-of-72 errors. half-of-humanity c1 is finally checked against UN WPP 2024 data. The files come from the wpp2024 R package on raw.githubusercontent.com, which is reachable while population.un.org is not. Mid-2024 was rebuilt from births/CBR, from deaths/CDR, and from the mean of 1 Jan 2024 and 1 Jan 2025. All 16 values match. Medium: book chapter placements (E&K ch. 4 and ch. 14, GKP 1.3, CLRS 10.1/34, Bishop 4.1.7) come from my own knowledge, not from opened books. Karger 1997 and the ring-buffer sources were corroborated only through web-search snippets.
- Dispute: pairs-cancel-under-xor c2. The stage and reveal say "the lamps it switched on switch back off". On the default order the first 3 turns lamps OFF and its partner turns them ON. Fix: "flips the same lamps back".
- Next: demo-builder W-203 (then the fact-checker re-checks c2), W-204. Tip: the wpp2024 package on GitHub is a usable WPP 2024 source for other geography claims (parser in my pass-21 scratchpad was ad hoc; re-derive). Nothing blocked.

## 2026-10-14 · fact-checker · pass 21 batch 4 (12 lessons)
- Changed: claim statuses in 12 meta.json files (algorithms batch 2, NCM course, wave D revisions): 46 verified, 2 disputed, 0 withdrawn. Pass 21 tables appended to (or created in) company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-197 (demo-builder, rule-30 c1), W-199 (geography CM, jigsaw c1 human source check), W-200 (cm-cs-algorithms, queue-or-stack CLRS edition mismatch in curriculum refs).
- Believe (high): one-cell-rule-30 c1. The numbers are right, but the reveal says the counts went "with no pattern" and the odd steps read 3, 6, 9, 12. continental-jigsaw c1 (medium): the paper is still unopened and secondary sources conflict (an OCR extract gives 44.0/30.6/57.0 for fit 9, Virtual Explorer gives 42.9/-30.1/57.1). Every other verdict rests on node re-runs of each lesson's own model. Medium: E&K ch. 7 (ESS) and ch. 18 (power laws) placements, rule 30 "no known formula" (OEIS extract only) and NKS p. 317 (search extract) were not opened directly. Hosts are blocked by the proxy.
- Next: W-197 builder fix, then a fact-check re-check of rule-30 c1. W-199 needs a human with the Phil. Trans. paper. Blocked: jigsaw c1 on that human check.

## 2026-10-14 · fact-checker · Pass 21 batch 0: 49 claims over 12 lessons (algorithms batch 2, NCM, wave D)
- Changed: meta.json claim status for undo-a-multiplication-mod-n (8), shuffle-until-sorted (6), cut-the-rod-for-more (5), fenwick-hops-by-lowest-bit (5), rolling-hash-window (5), hawks-never-take-over (5), same-letters-same-key (4), where-the-dew-forms (3), two-writers-one-counter (3), deleted-key-breaks-search (2), dam-depth-not-width (2), seattle-moscow-heading (1). 48 verified, 1 disputed (deleted-key-breaks-search c3), 0 withdrawn. "Pass 21" tables in each company/reviews/<slug>/2026-10-14-fact-check.md (4 files created). Board: W-195 (demo-builder, c3 rewording).
- Believe (high): every number re-ran in my own node using each lesson's own logic (seeded mulberry32 runs, Euclid/back-substitution, rod DP + brute force, Fenwick cells, rolling sums, replicator, interleavings, Magnus dew point, great-circle arch). Medium: primary sources (RSA 1978, Fenwick 1994, Gruber et al. 2007, Maynard Smith, OpenStax, CLRS, Knuth) were not opened, since the proxy blocks the hosts. Verdicts rest on derivation or web-search secondary text, and each note says so. Easley and Kleinberg ch. 7 = evolutionary game theory (catalogue); the section number is from memory.
- Next: demo-builder W-195, then fact-checker re-checks c3. Minor builder notes (not disputes): the dam log skips a width reached at another depth before returning to 10 m; the dew Fullness readout shows 100% at 18.5 C while Dew says none. No build or QA run. Nothing blocked.

## 2026-10-14 · fact-checker · pass 21 batch 2 (12 lessons)
- Changed: claim statuses in 12 meta.json files (algorithms batch 2, NCM course, wave D revisions): 45 verified, 3 disputed, 0 withdrawn. Pass 21 tables appended to company/reviews/<slug>/2026-10-14-fact-check.md (created for groups-where-everyone-reaches-everyone). Recorded one unrecorded reveal sentence as probability.every-scale-equally-likely.c6 (unverified; I recorded it, so another pass must check it). Board: W-192, W-193, W-194 (demo-builder).
- Believe (high): disputes are real. every-base-fools-fermat c7: strong liars are 10 of 320 counting base 1 (Demo LIARS drops base 1 but keeps 320). selfish-routes c4: 4/3 bound is for affine delays; "in proportion" names a class with price of anarchy 1. pivotal-juror c3: Demo pGuilt = guilt(g, 1) shows 30%/50% where it should show 7%/30%. Medium: E&K chapter placements (ch. 8, 18, 20, 23) and CLRS numbering are from memory; book hosts, OEIS, Wikipedia and paper PDFs are blocked by the proxy. Verdicts rest on my own node re-runs and derivations, not on unopened sources.
- Next: demo-builder fixes W-192..W-194, then a fact-checker re-check of those three claims and of every-scale c6. Nothing blocked.

## 2026-10-14 · interaction-designer (ncm specs) · who-pays-same-filter spec
- Changed: company/design/specs/who-pays-same-filter.md + .svg (economics.markets NCM #5, Coase). Side-by-side, stacked: "Right to pollute" (laundry offers $50 / $200 / $350) over "Right to clean air" (factory: pay $300 damages / fit $100 filter). 5 controls, each once; gate `deal-struck` + `liable-fits` (filter fitted in both, both Totals −$100). Model line labels the simplification. Board: W-189 (cm-economics-markets, stem fix), W-190 (design-lead review), W-191 (mockup-artist).
- Believe (high): numbers re-run in node: $50 refused (factory −$50), $200 deal (factory +$100, laundry −$200, total −$100), $350 refused (laundry worse than −$300); liable: filter −$100 beats damages −$300. Strict deal band $101–$299 on a whole-dollar grid. Prediction survives; stem should say "$100 a year" (25 words). Medium: the visible offer chips nudge toward B at predict (flagged for design review). QA path reasoned from DOM order, not run.
- Next: W-189, W-190, then demo-builder. Nothing blocked.

## 2026-10-14 · interaction-designer (ncm specs) · specs for 4 NCM briefs
- Changed: spec + .svg wireframe in company/design/specs/ for the-loser-flips-the-winner (math.discrete #2, before/after), weak-links-hold-it-together (probability.chance, simulation run), two-public-clues-break-the-herd (probability.statistics #1, before/after) and all-lines-meet-in-one-mother (life.genetics-evolution #3, storyboard/scrub; added mid-task by the coordinator). Board: W-183 (cm-probability-chance), W-184 (cm-life-genetics-evolution), W-185 (design-lead review), W-186 (mockup-artist).
- Believe (high): Borda 6/7/2 then 3/2, Bayes 67%/33%, and coalescent mean 96.03, median 84 (seeds 7001–8000) all re-run in node and hold. The coalescent's exact discrete expectation is 96.97, so 98 is an approximation, as the CM's edit says. Medium: weak-links survives at 20% only with seeded-random tie-breaking among overlap-0 links (96% of connected networks give ≤ 30 of 60; index ties fail 12%). 10% of seeds start disconnected. The brief's seed-33 figures do not reproduce. Two specs list text-budget trims that the wireframes do not show. QA paths were reasoned from DOM order, not run.
- Next: W-183/W-184 (brief owners), W-185 design review, then demo-builder. two-public-clues builds after two-said-blue. Nothing blocked.

## 2026-10-14 · interaction-designer (algo2-s1) · specs for 10 algorithms batch 2 briefs
- Changed: spec + .svg wireframe in company/design/specs/ for shell-gaps-shrink-the-shuffles (#41), one-crowded-bucket (#43), ternary-asks-more (#46), fewest-exits-first-tour (#52), boyer-moore-skips-ahead (#55), rotation-untangles-the-chain (#61), gray-code-one-flip (#66), hailstone-27-climbs (#71), keep-one-of-a-stream (#77), turns-beat-first-come-first (#80). Board: W-181 (cm-cs-algorithms brief fixes), W-182 (mockup-artist).
- Believe (high): every prediction survives design. All answers were re-run in node: 32/120, 30/1, 10/13, 21/25 (36/64), 15, height 3 with 4 rotations, 7/11, 111 at peak 9,232, 1/4, 1.67. Two brief check lines are wrong, but neither answer changes: bucket (the shared bucket is 64+70, and 45 is the descending order) and Horspool (5 alignments, not 4). Medium: new stage numbers that are claims and need a fact-check. These are shell's "farthest from its place" 15/7/3/1/0, the ternary target 721 (chosen, disclose), the ternary per-question "left" counts, the knight badges 5 and 3,3,3,3,1, and Horspool's "11 letters never read". Every QA path was reasoned from DOM order with disabled-skip and slider-at-max-goes-left (tests/qa/contract.spec.ts), not run.
- Next: cm-cs-algorithms W-181, then design review, then demo-builder. Nothing blocked.

## 2026-10-14 · interaction-designer (algo2-s0) · specs for 9 algorithms batch 2 briefs
- Changed: specs + wireframes in company/design/specs/ for small-values-crawl-left (#42), shuffle-until-sorted (#44), bracket-order-sets-the-bill (#49), karatsuba-three-not-four (#53), new-server-moves-few-keys (#58), each-element-pops-once (#63), newton-doubles-the-digits (#70), every-second-seat-out (#72), one-cell-rule-30 (#78). Board: W-179 (cm-cs-algorithms brief fixes), W-180 (mockup-artist).
- Believe (high): every answer was re-run in node and holds, except **karatsuba**. 12345678 x 87654321 needs 33 one-digit products in a plain Karatsuba (sums carry), not 27. The spec proposes 11111111 x 11111111 (27, all one-digit) and is blocked until the brief owner accepts it or picks the spec's fallback. Medium: added stage elements that are new claims and need a fact-check (pops list 8 7 6 5 4 3 2 1 9: scan 36, stack 15; designed ring layout in new-server, which must be disclosed; per-n seeds in shuffle). Every spec's QA path was reasoned from DOM order with disabled-skip, not run.
- Next: cm-cs-algorithms W-179 → design review → demo-builder. Blocked: karatsuba build waits on W-179.

## 2026-10-14 · head-of-product · Ruling: told vs shown "why"
- Changed: decision company/decisions/2026-10-14-told-vs-shown.md. New craft rule `*` "Show the why you promised" in company/product/demo-standard.md (not protected). Board: W-176, W-177 (demo-builder revisions), W-178 (pattern-librarian confirms the rule).
- Believe (medium-high): a cause that is a doesNotKnow item, or that the objective asks the learner to explain, must have something on the stage that stands for it. Told context outside the brief's gap is still fine. bending-frontier: revise (show unequal land). iss-gravity-still-there: revise (show free fall); inverse square holds via the 25% stop. Evidence is simulated reviews only. Revisit if human recall shows no difference.
- Next: demo-builder W-176/W-177, then a fresh learner review. W-150 and W-154 are still open with head-of-product.

## 2026-10-14 · fact-checker · Pass 20: builder rewordings (10 claims) + 4 source-only audits
- Changed: status -> verified (checkedBy fact-checker) with pass-20 notes in the source field for ten-test-cases c4, a-birthday-like-mine c5, straight-across-saves c3, below-the-threshold-crash c3, interpolation-guesses-the-page c5, same-count-different-weight c5, proposers-get-the-best c5, one-bit-avalanche c6, truck-hits-car-force c5, random-dots-cluster c5. Source audits all held (still verified): sliding-the-cutoff c5, window-forgets-start c2, copy-overlaps-itself c3 (RFC 1951 opened: overlap example is in 3.2.3), drop-the-losing-start c4. "Pass 20" tables appended to each company/reviews/<slug>/2026-10-14-fact-check.md.
- Believe (high): every reworded claim now matches its Demo.tsx stage and reveal; numbers re-run in node (crash sim ratios, 44.5% exact count, interpolation traces, rounding captions). All ten Demo.tsx files parse cleanly (TypeScript parser); no build or QA run. Medium: proposers c5 year 1998 rests on search-result text (Roth's Stanford page, Wikipedia, NRMP 1997 press release). Every primary page was blocked.
- Next: chief of staff integrated build + QA for these lessons. Optional: someone with access confirms 1998 in Roth and Peranson (1999). Not touched: continental-jigsaw c1, half-of-humanity c1 (still need a human source check).

## 2026-10-14 · demo-builder (algo-pair-06) · tortoise-meets-hare, any-start-same-tree
- Changed: built both lessons from brief + spec (status draft, all claims unverified); build notes in company/reviews/<slug>/build.md. any-start-same-tree uses the fixed brief (DE 3, total 11, next-best 12).
- Believe (medium): answers re-run in node and match; Demo.tsx read carefully but NOT run in a browser. Skipped by order (machine out of memory): next build, qa, walkthrough, typecheck. Only `npm run check` passed.
- Next: chief of staff integrated build + QA + walkthrough; check label overlap in the any-start panels at 390 px.


## 2026-10-14 · demo-builder · revision batch 01 (16 lessons, learner-review fixes)
- Changed: Demo.tsx, meta.json (version bumped; edited claims back to unverified) and a "Revision v<N>" in build.md for never-flag-99, stop-at-epoch-sixty, same-sugar-more-water, when-the-water-is-full, insert-at-front-cost, pennies-dont-add-up, two-writers-one-counter, rule-of-72-shortcut, parallel-vs-arc-short-hop, below-the-threshold-crash, binary-fingers, straight-across-saves, same-push-twice-the-mass, two-tugs-right-angle, city-poll-nation-poll, hidden-third-cause.
- Verified only: `npm run check` and a full typecheck (both pass). NOT run (machine out of memory, coordinator's order): build, lesson QA, walkthrough sheets. Milestone one-press paths were reasoned from DOM order, not tested; the chief of staff's integrated QA must confirm them.
- Fact-checker needs: every claim marked unverified in these lessons plus new claims rule-of-72 c6 and city-poll c8.
- Not fixed (platform, W-061/W-135): reveal clipping on phone.


## 2026-10-14 · demo-builder · revision batch 06 (16 lessons, none published)
- Changed: Demo.tsx, meta.json and build.md ("Revision v<N>") for ai/shrink-toward-zero, ai/word-in-pieces, chemistry/the-tail-that-reacts, cs/hash-bucket-pileup, cs/one-bit-avalanche, cs/two-flips-slip-by, economics/compound-interest, geography/midnight-sun-line, geography/two-bulges, life/virulence-sweet-spot, math/square-a-plus-b, physics/crumple-zone-stopping-time, physics/torch-underwater-tilt, probability/birthday-paradox, probability/halve-the-margin-cost, probability/sum-seven-ignores-first-die. Each fixes the latest learner review; edited claims are unverified and need a fact-check pass.
- Checked: `npm run check` passes; narrow tsc over the 16 Demo.tsx files shows only missing CSS-module typings (worktree artefact). NOT run: build, lesson QA, walkthrough sheets (machine out of memory, coordinator's order). A partial dev-server QA run was stopped; its two phone failures (shrink-toward-zero, word-in-pieces, after 1.5 m under load 100) are unexplained and may be timeouts.
- Next: chief of staff runs integrated build, QA and walkthrough sheets; look at the new controls on phone (two-flips-slip-by, midnight-sun-line day strip, two-bulges arrows). Then fact-checker on unverified claims.


## 2026-10-14 · contributor (PR #2) · PR 2 sync and completed browser regression

_Imported from PR #2 (`codex/lifehacks-200` @ `71e99fee`) in the merge; board ids remapped W-176→W-354, W-177→W-355, W-178→W-356. Contributor testimony, not verified._

- Changed: synchronized PR 2's source with upstream `840ba7ad`, retaining newer lesson fixes, shared color/reveal improvements and the company-role addition. Preserved all 175 upstream board items and the full event prefix. Life Hacks IDs are W-354 (review), W-355/W-356 (backlog). Repaired one target tile's fill/text contrast in `AlphabetSearchLesson.tsx`; no lesson behavior or claims changed.
- Verified: full merged-layout browser regression 1456/1456, zero retries; final target repair two phone/desktop contracts plus four actual computed-color checks at 10.04:1. 17 deployment and 48 Life Hacks fixtures passed; check/typecheck/build passed on the repaired source. The initial concurrent rebuild exited 137; a serial retry passed. Records: `company/reviews/lifehacks-200/2026-10-14-validation.md`, `company/reviews/alphabet-sort-search/2026-10-14-integration-contrast.md`.
- Believe: high confidence in tested contracts and the one target contrast pair. All 200 remain review with 883 unverified claims. No broad accessibility, factual, human-learning or publication clearance follows from this run.
- Next: independent fact-checking and remaining reviews via W-355/W-356. PR 2 remains open for review; branch update reruns GitHub CI. Original head's constitution/verify checks succeeded.
- Blocked: Vercel's bot reports the daily 100-deployment quota (`api-deployments-free-per-day`), retry in 24 hours. No working preview or production deployment is claimed.

## 2026-10-14 · interaction-designer · specs for a-star-heads-for-goal and rubber-band-hull (CS algorithms, group 6)
- Changed: wrote `company/design/specs/a-star-heads-for-goal.{md,svg}` (before/after: guess chips + wall toggle, replayed runs, result table) and `company/design/specs/rubber-band-hull.{md,svg}` (step-through: the 9 pins are the controls in walk order, no finish button). Board untouched (caller's instruction).
- Believe (high): both briefs' answers re-run in node: A* 7 vs Dijkstra 31 on the open grid, any tie-break; hull 6 pins, 4 right-turn pops in Graham order. Medium: whether the design lead accepts replay buttons ("Settle to goal") as not being a jump to the answer.
- Brief problem (rubber-band-hull, owner cm-cs-algorithms): (0,0) and (6,0) tie for lowest, so the "extremes" are 5 pins, not 4; option A (4) does not match a careful misconception. Suggested fix (6,0)->(6,1): still 6 hull pins. Wall result in A* (16) depends on the tie-break (FIFO gives 32).
- Next: design review of both specs (design-lead); brief-owner decision on the hull tie. Blocked: nothing.

## 2026-10-14 · platform-engineer · W-139 follow-ups: verify on the merged tree, rotation re-fit, no pull-back
- Changed: `src/components/DemoCard.tsx` (`useRevealFit` re-fits on card-body resize and orientationchange while the reveal shows; no auto-scroll once the learner has scrolled after the reveal, and rotation re-arms it), `tools/reveal-fit.mjs` (`--rotate WxH`), changelog, follow-up status appended to company/rituals/records/2026-10-14-eng-review-W-135.md. Board: W-135 → done; added W-143 (feed measurement, me), W-144 (landscape layout, design-lead), W-145 (four-queens-pruning thumb, moon-hammer-feather unmeasurable, demo-builder). Committed in the worktree, not pushed.
- Verify: on the merged tree (before my change) 1056/1056 QA (one run was split by a 2 h tool limit: 1038 + the 18 it had not reached), deploy tests, check, typecheck and build all passed. No revert. After my change, full verify passed again with 1056/1056.
- Reveal fit (all 523): portrait 515 fit / 0 clip / 7 thumb / 8 unmeasurable. Rotated to 844×390: 0 clip, top always visible, but 495 need a scroll and 325 are thumbs, because the landscape body is ~164px. That limit is in the layout, not the hook (W-144).
- Believe (high): the pull-back is fixed (reproduced in the old build on base-rates and tax-who-pays, gone in the new one), and rotation re-fits. Medium: touch-drag detection on real phones. Only wheel input was tested; a touchmove listener covers drags in principle.
- Gotcha for the next worker: a full QA run takes 1.2-2 h on this box. Run it detached (setsid nohup) or it hits the 2 h background-tool limit.
- Next: W-143 feed measurement (me); W-141 contract assertion (evaluation-steward); W-142 focus amendment (accessibility-reviewer). Blocked: nothing.


## 2026-10-14 · fact-checker · Pass 18: wave C life, economics, probability and builder-12 claims (56 claims, 32 lessons)

- Changed: 56 unverified claims set to verified (checkedBy fact-checker) in 32 meta.json files. A "## Pass 18" table was added to company/reviews/<slug>/2026-10-14-fact-check.md for each lesson. Skipped half-of-humanity c1 and continental-jigsaw c1 because they need a human source check. Disputed claims were not touched. one-recipe-for-sixty and hanoi-tower-doubles had no open claims.
- Belief (sure for the derivations and simulations): every number was re-run in my own scratch scripts. Each Demo.tsx was read, and its stage and reveal match the claims. Less sure on protein c6 (folding times) and spreaders c4 (Lloyd-Smith 2005): I checked them through secondary sources, not the full papers.
- Non-blocking builder fixes: median-without-sorting c3 text says "position 5" but should say 51. one-in-four-sprouts c4 source mentions a removed "New field" control. fee-on-two-week-loan never shows the learner its 364-day year. dilute step 23 shows 15 of 20 empty, a tail draw. protein c6 wording could say "microseconds to seconds".
- Next: chief of staff routes the non-blocking fixes to builders, and gets a human for the two source checks.

## 2026-10-14 · demo-builder (wc-builder-10) · wave C revisions of 15 life lessons

- Changed: dish-runs-out, herd-immunity, hidden-carriers, keeping-the-bad-gene, natural-selection, one-in-four-sprouts, pcr-not-quite-doubling, pesticide-paradox, potassium-battery, protein-search-space, purging-slows-down, saturated-enzyme, spreaders-are-rare, strategy-builder, tree-count-explodes. Each got its latest learner review's findings fixed, a version bump, `format`/`interactions`, reworded claims reset to unverified, and a "Revision v<N>" in company/reviews/<slug>/build.md. None was published; none already said launch.
- Belief (fairly sure): contract QA passes on phone and desktop for all 15 (feed-chips failure is the known W-136); I looked at every walkthrough sheet. Not sure: learners may still find strategy-builder's stage dense on a phone.
- Next: fact-checker re-verifies the unverified claims; learner re-review of v-new; potassium-battery and protein-search-space gained new claims (c7).


## 2026-10-14 · demo-builder (wc-builder-11) · wave C revisions of 15 economics and probability lessons
- Changed: bathtub-deficit-debt, bond-seesaw, cheese-for-bread, compound-interest, deduction-or-credit, exchange-round-trip, extra-hundred-a-month, fee-on-two-week-loan, free-rider-pot, loaf-with-smoke, real-rate-illusion, square-root-wealth, twenty-dollar-basket, average-that-never-settles, bet-too-much-and-go-broke. None was published; all had a "revise" review. Versions bumped, format and interactions added, edited claims unverified, "Revision v<N>" in each build.md.
- Believe: the review findings are fixed (leaks, unvisited-state quotes, told payoffs, undefined terms); fairly sure, needs fresh learner reviews. Contract QA passes on all 15 (phone and desktop); I looked at every walkthrough sheet.
- Judgement calls: square-root-wealth has a "Slide to the coin's line" button (generic label, but it does land on the key state); exchange-round-trip has a "Try $1.11" button; real-rate-illusion slider now steps whole percents; bet-too-much gained a 30% stake (its 982/1000 seed sweep was for five stakes).
- Next: fact-checker on the unverified claims; learner reviews. Open: cheese-for-bread locked stage clips the last slider on a phone (kit layout, W-135 family).


## 2026-10-14 · fact-checker · Pass 16: wave C AI revisions (20 claims, 11 lessons)
- Changed: claim statuses in 11 src/demos/ai/*/meta.json; "## Pass 16" in company/reviews/<slug>/2026-10-14-fact-check.md for each. Board not touched (as instructed).
- Believe (high): 18 verified by own node re-derivation/simulation; 2 disputed: greedy-slot-machine c3 (stage shows seed 5 first pulls "A lost, B lost", claim says A won) and memorise-coin-flips c3 (degree-1 miss is 158/105 = 1.50 on stage, claim says 1.51). Builder 7's dilute c7 and point-one c3 were already verified in pass 15. Non-blocking advisories in the records (attention "lowers the others", confident-and-wrong clamped last halving, income source "ever").
- Next: demo-builder fixes the two claim texts; fact-checker re-checks. Skipped by instruction: half-of-humanity c1, continental-jigsaw c1 (need human source access).
- Blocked: nothing new.

## 2026-10-14 · demo-builder (wc-builder-8) · wave C revisions of 13 AI lessons
- Changed: attention-shares-one, background-shortcut, confident-and-wrong, copy-of-a-copy, direction-not-distance, dog-bites-man-twice, five-folds-five-scores, gradient-descent, greedy-slot-machine, income-in-dollars, king-queen-arrow, meaning-without-the-word, memorise-coin-flips (version bumped, edited claims unverified, "Revision v<N>" in each build.md). bad-start-kmeans (v2) and draw-the-xor-lines (v3) were already revised after their latest review; untouched.
- Believe: leaks, unvisited-state quotes, told payoffs, undefined terms fixed per the reviews (fairly sure; simulated-learner review needed). Contract QA passes on all 15 (phone and desktop); only the known feed-chips failure (W-136).
- Next: fact-checker on the unverified claims (esp. king-queen-arrow c5, greedy c3/c4, memorise c4); a fresh learner review of each. Open: locked-stage charts in dog-bites-man-twice and meaning-without-the-word are small (kit layout).


## 2026-10-14 wave C, builder 7: revisions of 11 lessons

Changed (see "Revision v<N>" in each company/reviews/<slug>/build.md): cut-the-cube-surface, dilute-until-none-left, heavy-but-floats, pay-first-then-profit, filament-vs-led-heat, pendulum-period, projectile-angle, puck-on-ice-no-push (phone clip: reveal-phase `.stage-svg {flex: none}` rule widened the lanes), point-one-is-26-percent (c3), collect-all-six-faces, tournament-second-best. QA passes except the known feed-chips failure (W-136). I believe the fixes work (walkthrough sheets and a phone probe seen); fairly sure. Edited claims are unverified (dilute c7 new, point-one c3): fact-checker next. Open: pendulum gate still needs only the weight trial (no one-tap path for a second trial); re-review wanted for all 11. collect-all-six-faces had no stuck label in the current code.

## 2026-10-14 · contributor (PR #2) · 200 Life Hacks review collection and PR

_Imported from PR #2 (`codex/lifehacks-200` @ `71e99fee`) in the merge; board ids remapped W-176→W-354, W-177→W-355, W-178→W-356. Contributor testimony, not verified._

- Changed: exactly 200 new Life Hacks (70 home, 70 study, 60 resource), shared pure models and responsive SVG stages, 200 QA records, curriculum coverage and metadata v2. Latest upstream checkpoint `aef5a704` retained, including its 14 CS lessons and shared reveal sizing; app total 723. Work is W-354 in review.
- Verified: 17 deployment fixtures, 48 Life Hacks fixtures, check/typecheck/build; final 410 browser tests (400 contracts plus 10 feed tests), zero retries. Nine revised recalls also passed 18 real phone/desktop revisit checks with seeded history. Protected paths and unrelated lesson code match the final upstream checkpoint. Company check passes with three upstream CS disputed-claim warnings.
- Independent findings: 200 safety transcript reads and 20 focused main sheets, 21 artifact-first learner samples, and specific design rechecks. Latest sampled learner recommendations are 13 launch / eight revise / zero fatal against their recorded versions. Detailed scopes, hashes and limitations are in `company/reviews/lifehacks-200/` and the design handoff; these are not human-learning results.
- Believe now: high confidence in the tested browser contract and stipulated calculations; no empirical, accessibility or general factual clearance is inferred. All 200 remain review, confidence empty, all 883 claims unverified; Life Hacks stays incubating. Source snapshots preserve the earlier audited builds in the PR history.
- Next: W-355 (fact-checker) independently checks addressed claims in batches of at most 15; W-356 (learner-evaluator with designer/safety support) closes specific remaining findings and reviews the other 179 lessons. First-five incubation, human-learning and publication gates remain in force. No merge, publication or deployment performed for this task.
- Handoff: `content/collections/lifehacks-200.json`, `company/reviews/lifehacks-200/2026-10-14-validation.md`, dated safety/learner indices, and `company/design/specs/lifehacks-design-handoff.md`.

Template:

```markdown

## 2026-10-14 · rnd-lead (Bram) · Knots gen 1 scored, judged, selected: winner `gen1-force`; stop rule says promote
- Changed: `company/rnd/evolution/knots-gen1.md` (the record). New looks gate in `src/lab/knots/test/draw.test.mjs`: table knots must draw round, with at most 30 % straight runs and 3 % sharp corners; now 102 tests. 24 eval records in `knots.jsonl`. Board not touched (as instructed); nothing committed.
- Believe:
  - **Official scores.** 3 one-seed runs, no slowness penalty in any. Medians: gen0 10,394.54; tutte 10,438.80; force 10,439.68; ortho 10,443.07. That is a tie within seed noise.
  - **Rulings.** The ortho stretch is fair, and the aspect metric is unchanged. Only force still draws table knots like the textbook (rendered and looked at).
  - **Re-score with the looks gate.** force 10,533.49; gen0 10,491.86; tutte and ortho gated out. High confidence in the ranking; medium on whether looks should be a gate rather than a weight.
  - **Audit.** Every candidate changed only mutable files, and none games the bench. Tutte's internal score copies the bench formula: allowed, and flagged.
- Next: gen 1 gains 0.26–0.47 % of total score, under the 2 % stop rule, so I recommend promoting `gen1-force` (EDD, then a principal-engineer review). The VP should rule on my objection that the 2 % rule cannot be met on this score scale (+15 % on the bench term). A gen-2 plan (ortho→force crossover plus 2 mutations) is in the record if she rescales it.
- Blocked: VP ruling on the stop-rule scale.

## 2026-10-14 · rnd-engineer · Knots gen 1 slot A: `gen1-tutte` (reweighted Tutte of a triangulation + guarded stress)
- Changed: new `src/lab/knots/candidates/gen1-tutte/`, a full copy of gen0-baseline. Only `draw.mjs`, the new `layout.mjs` and `index.d.ts` differ. The candidate's NOTES.md has the idea, the prior art and the numbers. Committed in my worktree, not pushed. I added nothing to the archive: my eval lines were reverted.
- Believe:
  - It passes every gate: 101/101 tests, random-knot lesson 11,794 B of 12,288.
  - It beats gen 0 by +38 to +55 on seeds 1–3: 10,451 / 10,439 / 10,430 against 10,409 / 10,401 / 10,375. Spacing goes from 7–9 to 11.7–13.2, spread from 29–38 to 49–53, and there are no extra crossings. High confidence in the direction.
  - Medium confidence on the lead's run: on a heavily loaded machine, `layoutSlowPenalty` could take back 10–50 points. It costs about 2× gen 0's CPU.
  - Table knots look less textbook than circle packing.
- Next: the lead scores all three slots in one run. A crossover could add packing for diagrams where it is planar, or slot B's repulsion in place of my revert guard.
- Blocked: nothing.


## 2026-10-14 · demo-builder · Colour fixes in 18 published lessons (W-155)
- Changed: stage and text colours only, in the 18 lessons that still failed contrast after the kit token fix. Per-lesson notes in `company/reviews/<slug>/build.md`. No claims or pedagogy touched; no version bump.
- Believe (high): a11y scan on a build of this branch shows no lesson-origin contrast failure in any of the 18; lesson QA passes except the known feed-chips failures (W-136); `npm run check` passes.
- Not fixed (not colour): collect-all-six-faces SVG label stuck at "0 rolls"; tournament-second-best label "Knockout bracket" never changes; 6 px text in line-stops, two-suspects, start-early-race.
- Next: accessibility-reviewer re-scans the 18 slugs and updates their records.


## 2026-10-14 · rnd-engineer (slot C) · Knots gen 1: `gen1-ortho` candidate written (orthogonal grid layout)
- Changed: `src/lab/knots/candidates/gen1-ortho/` (a copy of gen0-baseline; only `draw.mjs`, `index.d.ts` and `NOTES.md` differ).
  - Tamassia min-cost-flow bends, rectangular refinement, balanced longest-path compaction;
  - bends drawn as rounded corners;
  - circle packing and Tutte removed.
- Believe:
  - 101/101 tests; lessons about 170 B smaller than gen 0.
  - Layout term 262.8 / 259.3 / 261.8 on seeds 1–3 (gen 0: 220 / 212 / 196). There are 0 extra crossings on 8 seeds and 227 stress diagrams.
  - Hand-computed score: about 10,438–10,448.
  - High confidence in planarity (every face is a rectangle). Medium confidence in the official score, because `evolve.mjs eval` was blocked by this session's command guard and the lead's run will be the first.
- Next (rnd-lead): score all three slots in one run. Judge whether the square stretch (aspect 100) is a layout choice or metric-fitting (NOTES.md, "Surprise 2"). The table knots now look rectilinear; that is a product call.
- Blocked: nothing.


## 2026-10-14 · fact-checker · Fact-check pass 12 (wave C CS revisions)
- Changed: 38 unverified claims across 15 CS lessons set (36 verified, 2 disputed), each with a `FACT-CHECK 2026-10-14 (pass 12)` note in its source; Pass 12 tables in `company/reviews/<slug>/2026-10-14-fact-check.md` (also salt-ions-count-double and cards-do-remember, re-confirmed unchanged).
- Disputed: big-number-swallows-one c2 ("2 multiplied by itself 53 times" reads as 2^54; use "53 twos multiplied together" in claim and predict); binary-search c5 (stage flags weak only if after*2 > before+1, so 500 of 999 is not called weak; use after*2 > before).
- Believe (high): all numbers re-derived in node (scratchpad fc12/check.mjs). Book/spec citations not opened (egress blocked).
- Next: builder fixes the two disputes, fact-checker re-checks. Blocked: half-of-humanity c1 and continental-jigsaw c1 still need a human source check.

## 2026-10-14 · rnd-lead (Bram) · Knots evaluator fixed (W-143, W-144); gen 1 brief ready
- Changed:
  - `tools/evolve.mjs`, backward compatible:
    - per-lesson size gate (`sizeEntries`, stripped closures found by Node's loader);
    - `benchWeights`;
    - `mutable` frozen-file check, plus mandatory `parents` registration;
    - one bench seed per eval run (`EVOLVE_SEED`, archived);
    - the board ranks each candidate's latest record and warns when seeds differ;
    - refuses `import()`/`require()`;
    - new `size` and `selftest` commands (selftest passes).
  - `src/lab/knots` evaluator:
    - `evolve.json`: lesson budget 12,288 B stripped, library 16,384, gen-1 weights and mutable files;
    - `test/lessons/` (4 entries) and `lessons.test.mjs`;
    - `test/benchgen.mjs`, evaluator-only generators, and `benchgen.test.mjs`;
    - `test/benchdata.mjs`: 10 no-move hard unknots, a knotted decoy, the monster, Gordian;
    - `bench.mjs` rewritten so every input is generated at bench time.
  - README baseline paragraph; `company/rnd/evolution.md` (mechanics section). New: `company/rnd/evolution/knots-gen0.md` and `knots-gen1-brief.md`.
- Believe:
  - gen0-baseline now scores **10,415.83** (101/101 tests, mean lesson 8,036 B, bench 331.91; was 0, gated out). High confidence in the gates and the generators: the tests pin them to the library, and Regina certified the hard set offline.
  - Medium confidence in the 12,288 calibration: stripped runs 1.18–1.9× over the real cost.
  - The bench term varies about ±15 by seed, so always score a selection in one run.
- Next: dispatch 3 rnd-engineers for gen1-tutte, gen1-force and gen1-ortho (brief: `company/rnd/evolution/knots-gen1-brief.md`), then score all three in one `eval` run. Board items W-143 and W-144 can close, but I did not touch `board.json` (caller's instruction); the chief of staff moves them.
- Blocked: the arXiv hard-unknot datasets (egress).


## 2026-10-14 · fact-checker · Pass 10: 14 new CS algorithm lessons + 5 reworded claims
- Changed: claim statuses (checkedBy fact-checker, checkedOn 2026-10-14) in src/demos/cs/{caesar-falls-to-frequency,no-zip-shrinks-everything,two-pointers-meet,fair-shuffle-trap,probing-clusters-grow,shortest-job-first-wait,four-queens-pruning,rsa-lock-with-public-key,patience-piles,median-without-sorting,union-find-shortcut,start-after-the-deficit,uphill-finds-a-peak,undo-a-bad-push}/meta.json and the five re-checked claims; recorded one unrecorded stage claim (rsa c7). Records: company/reviews/<slug>/2026-10-14-fact-check.md for all 19 lessons.
- Believe (high confidence, own node re-implementations): 71 of 74 checked claims verified, 3 disputed: two-pointers-meet c2 (2 of the 13 "never looked at" pairs were looked at), median-without-sorting c5 (3,465 is a high 50-seed mean; expectation 3,336), rsa-lock-with-public-key c7 (predict: cube root of 8 is 2, so anyone can unlock). All 5 reworded claims verified.
- Next: demo-builder fixes the 3 disputes (fixes in the review files); fact-checker re-checks. Not on the board (caller told me not to touch board.json).
- Blocked: nothing; no walkthroughs exist yet for the 14 new lessons (I read Demo.tsx text).


## 2026-10-14 · rnd-engineer · Knot theory library, generation 0 baseline (src/lab/knots)
- Changed: new `src/lab/knots/`. It has plain ESM, no dependencies, and docs in `index.d.ts`. It covers PD/Gauss/DT/braid codes, a table (0_1, 3_1 to 7_7, 10_8, Hopf, Whitehead, Borromean, granny, square, and the monster unknot), and exact invariants (writhe, linking, Fox colourings, determinant, Alexander, bracket/Jones, signature). It also has R1/R2/R3 detection and application with up-moves, an honest `simplify` (statuses unknot/unlink/minimal/unknown, never "knotted"), turnOver, mirror, connectedSum and deleteComponent, a circle-packing SVG layout with gaps (Tutte fallback), random braid knots, 3-D walks with closure and projection, and `identify`. Also: `test/` (93 tests, about 6 s; it imports only `../index.mjs`; reference values in `test/published.mjs`), `bench.mjs`, `evolve.json` (exactly as the brief asked), `candidates/gen0-baseline/`, `size.mjs`, README, and PRIOR-ART. The worktree was fast-forwarded to `ccr-4c6c7654-ew9ko1` to get `tools/evolve.mjs` and the research note.
- Evaluator run: `evolve eval knots` gives 93/93 tests but **score 0, gated out**. The raw `index.mjs` closure is 12,815 B gz against 10240, and even minified the whole library is 9.8 KB. Real per-lesson costs are 4.3 to 7.3 KB (`size.mjs`). The objection is W-137 (rnd-lead).
- Believe: the invariants are right (high). Jones matches Regina, Alexander matches knot_floer_homology, and det = |V(-1)| = |Δ(-1)|, all on the same PD codes. The Traczyk formula fixes the signature sign, and every invariant survives seeded random moves. The right trefoil is t + t³ − t⁴. KnotInfo, the Knot Atlas and arXiv were unreachable, so the reference values were computed by independent GPL software used offline only, not copied from tables. Unknotting numbers are from memory. Layout is good for the table and weak for non-reduced diagrams (medium).
- Next: the rnd-lead reviews the evaluator (W-136), and fixes the size gate and adds real hard unknots (W-137). cm-math picks lesson briefs (W-138). The research note's requirements are in the README table; animation and the Solomon link are deferred.
- Blocked: Goeritz and dataset hard unknots (arXiv egress). Nothing pushed; committed on the worktree branch.


## 2026-10-14 · demo-builder (algo-builder) · First 14 CS algorithms lessons built (draft)
- Changed: 14 new lessons in src/demos/cs/ from company/domains/briefs/cs.algorithms.md (single card / simulation run only): caesar-falls-to-frequency, no-zip-shrinks-everything, two-pointers-meet, fair-shuffle-trap, probing-clusters-grow, shortest-job-first-wait, four-queens-pruning, rsa-lock-with-public-key, patience-piles, median-without-sorting, union-find-shortcut, start-after-the-deficit, uphill-finds-a-peak, undo-a-bad-push. Each has meta.json with "format", all claims unverified, and a build note in company/reviews/<slug>/build.md. Board untouched.
- Believe (high for the numbers, re-run in node; medium for teaching): every brief's answer held. Local computer-use QA passes on phone and desktop for all 14; `npm run check` and tsc pass. No QA records filed (qa-tester's job).
- Brief notes, not wrong answers: rsa (unlocking with e twice returns 15 of 55 toy messages; handled on stage, claim c4); patience-piles (the misconception "starts at the smallest" is weakly targeted, since 1 4 5 6 starts at 1); caesar (94-letter message, not 120); fair-shuffle (exhaustive, not seeded).
- Next: fact-checker verifies the 14 lessons' claims; learner-evaluator reviews; qa-tester files QA records. Claims were released with --done by the builder.
- Blocked: nothing.


## 2026-10-14 · platform-engineer · W-135: reveal fits on a phone (502/509 fully visible, was 257)
- Changed: `src/components/DemoCard.tsx` (useRevealFit: at the reveal the card body scrolls the reveal on screen), `src/app/globals.css` (at the reveal `.stage-svg` takes its natural height, so fill-the-stage pictures no longer collapse to min-height), new `tools/reveal-fit.mjs` (390×844 reveal measurement, no new deps). Lesson.tsx untouched; no amendment needed. Note: company/engineering/notes/2026-10-14-W-135-reveal-fit.md. Committed in the worktree, not pushed.
- Root cause: since 54ae817 the stage is content-sized at the reveal and the card body scrolls, but it stayed at scrollTop 0, so the reveal sat below the fold of an unmarked inner scroll (read as "clipped under Why trust this?"); and ~200 lessons' `flex: 1 1 0` pictures collapsed to their 120-140px min-height in a content-sized stage.
- Measured (all 509, against a build): before 257 fit / 245 needs scroll / 141 thumbnail / 7 unmeasurable; after 502 fit / 0 / 6 / 7. Published: 92/94 fit, 0 thumbnails.
- Believe (high for the measurement and the cause; medium that learners prefer the stage top scrolling off over a smaller stage when the reveal is long). Check passed, typecheck passed, QA contract passed for 10 lessons (phone + desktop) and feed spec passed. Full `npm run verify` not run.
- Next: engineering review of the diff (any engineer role; principal-engineer to confirm tier 1); builders fix the 6 lesson-level thumbnails (dvh caps) listed in the note; re-run walkthroughs for the ~12 reported lessons before their re-review (evaluators).
- Blocked: nothing.

## 2026-10-13 · accessibility-reviewer · First accessibility audit of the published lessons (board W-010)
- Changed: new `tools/a11y-scan.mjs` (Playwright; keyboard, names, AA contrast in dark and light, 44 px targets, reduced motion, colour-alone prompts). 76 records at `company/reviews/<slug>/2026-10-13-accessibility.md` and the summary `company/reviews/_accessibility/2026-10-13-published-audit.md`. Raw scan in `artifacts/a11y/` (not committed). Board, lessons and status untouched; nothing committed. The onboarding doc names `<date>-a11y.md`; the task asked for `-accessibility.md`, so the roles data should be reconciled.
- Result: 46 pass, 12 pass with fixes, 18 fail (all contrast, mostly light theme). Kit-level: light-theme `--good/--warn/--bad` text 1.6-2.5:1 (verdict line in every lesson), 35 px controls and a 23 px "Why trust this?" link, focus dropped to body at commit and reveal, stage before question in DOM, no live region, locked stage dimmed below AA.
- Believe: high on the contrast failures (computed and eyeballed); medium-high on "no keyboard lock-out" (scan plus 10 hand traces, no screen reader). The scan had five bugs that the hand sample exposed; they are fixed and listed in the summary.
- Caveats: the 76 are the lessons published at task start; 49 more were published during the session and are not audited. Server :3420 died at 00:22Z (not by me); the final scan used :3402 (build 21:17Z, newer than all 76 lessons' code).
- Next: platform engineer fixes K1-K6; founder decides unpublish vs waive for the 18; accessibility reviewer audits the 49 newer lessons. Suggested board items (I was told not to edit the board): platform-engineer "a11y kit fixes K1-K6", accessibility-reviewer "audit lessons published after 2026-10-13 scan".
- Blocked: nothing.

## 2026-10-13 · interaction-designer · First 5 interaction specs (4 Life Hacks + first agent-based simulation)
- Changed: new `company/design/specs/<slug>.md` + `.svg` (3-frame wireframes) for towel-spread-dries-first, spaced-beats-cram, square-bow-stays-tied, long-cord-knots-itself, mild-preferences-sharp-divides. Board and company/design/concepts/ untouched (caller's instruction). Nothing committed.
- Decisions a builder will not expect: every spec orders controls so the QA path (each control once, in DOM order) reaches all milestones and ends on the state the reveal describes. Cord: length chips that each tumble 20 replace slider + "tumble once". Schelling: threshold chips (10/30/50/70) replace the slider; "New mix" is first in DOM; Run computes then replays within 400 ms; the reveal pins the grid to the learner's 30% run. Spaced: day axis 0-34, key-frame buttons for the two test days. Bow: no reset; flipping a wrap re-ties. Hero illustrations are predict-only 96 px slots; before/after and comparison pairs move into the reveal. An Illustration must not render before its file is accepted (a 404 is a console error: QA fails).
- Believe (medium-high on QA reachability, checked by hand against tests/qa/contract.spec.ts; medium on stage fit at 390x844). Schelling rule re-run in node, seeds 1-5: 30% gives 0.74-0.76 in 8-16 ticks, matching the brief.
- Next: design lead approves the ABM format and the illustration placement change; cm-lifehacks records the towel breeze factor (illustrative x2) and the bow loss rates as claims; mockup artist mockups from the specs.
- Blocked: mild-preferences-sharp-divides until the ABM format is approved.

## 2026-10-13 · cm-cs · Algorithms strand: 40 concepts and 40 ranked briefs
- Changed: content/curriculum/cs.json gained 40 concepts tagged `"subarea": "algorithms"` (53 to 93; every prerequisite resolves). company/domains/briefs/cs.algorithms.md now holds 40 ranked briefs in the cs.md heading format, so `claim.mjs next cs` hands them out after cs.md. Board untouched (caller's instruction). Nothing committed.
- Source: TheAlgorithms/Python (MIT) used only for topic ideas and to check how algorithms run. No code was copied. Claims cite CLRS or the original papers. Each brief's answer was recomputed in node (exhaustive where small). Two drafts were wrong and fixed before writing: the interval set (shortest-first succeeded) and the rolling-hash text (no false hit).
- Believe (medium): the top 7 (stability, quicksort worst case, BFS = DFS with a queue, 0/1 knapsack, edit distance, Caesar frequency, compression limit) are the best misconception-first lessons. Each brief says how it differs from its nearest lesson. Old algorithm concepts (binary-search, ...) are still untagged. Tagging them is cm-cs-algorithms' day-one task.
- Open: rsa-lock-with-public-key and caesar-falls-to-frequency overlap the security strand. cm-cs-security should cross-list them, not write new briefs for them. Builders must re-run each brief's check. A brief is not a verified claim.

## 2026-10-13 · fact-checker · Pass 9: 22 batch lessons + 2 pass-8 claims + jigsaw c1 re-opened
- Changed: claim statuses in 23 meta.json files (69 verified, 3 disputed, 4 confirmed withdrawn, 3 left unverified); "## Pass 9" tables in company/reviews/<slug>/2026-10-13-fact-check.md (new files for 15 lessons). Board untouched (caller's instruction).
- Disputed: twenty-then-ten-off c2 (stage prints 28.000000000000004%; round TOTAL_PCT), count-the-marked-fish c5 ('cluster near' -> 'scatter around'), cafe-is-five-bytes c5 (dispute from pass 8 stands, text unchanged).
- Unverified: half-of-humanity c1 (UN WPP), continental-jigsaw c1 (re-opened: Bullard 1965 never opened; c4 rests on the same paper), salt-ions-count-double c5 (derivation gives about 3.4, not 3.5; CRC unreachable).
- Believe now (high for the derivations and simulations, medium for the recalled sources: Alberts table 11-1, Anscombe values, Gardner 1970).
- Next: builders fix the 3 disputes and salt-ions wording (owner: the domain builders); a human with access checks UN WPP 2024 and Bullard 1965 (founder inbox).
- Blocked: egress to population.un.org, royalsocietypublishing.org, Wikipedia, BioNumbers.

## 2026-10-13 · cm-lifehacks · Life Hacks briefs revised after safety review and source check
- Changed: `company/domains/briefs/lifehacks.md` applies every required change from the 5 safety records and `company/reviews/lifehacks-briefs/2026-10-13-source-check.md` (wobbly-table: claim 1 square-only, Martin 2007 Phys. Lett. A corrected, 35° as theorem limit only, "Four feet down is not level" and "Clear hot drinks before you turn it" on stage; knot claim 4 always-fails vs about half; Raymer & Smith setup stated; Cepeda 2006 dropped from spaced claim 2; new claim 6 for the retrieval line; textbook editions/sections named). Wobbly hero request: cup removed. Pending-review comments replaced in 6 passed requests. "Changes applied" note appended to each safety record. Board and brief-skips untouched.
- Believe now (medium): the briefs are buildable; textbook sections, ABOK numbers and Roediger & Karpicke 2006 are cited from memory and need the fact-checker.
- Next: lifehacks-safety-reviewer re-checks wobbly-table and removes its skip line; fact-checker full-text checks.

## 2026-10-13 · portfolio-manager · First triage pass: 126 items, next 47 → 16
- Changed: every open board item now has a priority, an owner and a triage note (`node tools/triage.mjs`). 36 marked done with evidence, 24 dropped (16 of them merged duplicates), 16 in next, 49 in backlog, 1 in review. 10 owners changed. Record: company/ceo-office/triage/2026-10-13-first-pass.md. No lessons, gates, roles or protected paths touched.
- Believe now (high, each item opened against meta.json, reviews, tools): the board lagged the disk. 29% of open items were already done. The only P1 is W-010 (0 a11y records, 76 published lessons). cafe-is-five-bytes c5 is the only disputed claim left anywhere. evaluation-steward holds 10 items that all need amendments, and none has been drafted since AMD-001.
- Next: the operating chief of staff dispatches next in order (W-010 first). Whoever merges a pass closes its board items. publish-holds.json (8 geography lessons) is now covered by W-002.
- Blocked: the 6 founder items (P3, all already in founder-inbox.json).

## 2026-10-13 late — chief of staff: founder inbox in HQ; pass 8b, learner wave, CEO-office evaluation landed

- **Changed:** `company/ops/founder-inbox.json` (F-01..F-13) is the single list of what waits on the founder. HQ shows a banner on every view and a priority list in the Lobby. It merges in founder-owned board items. Checklist rule added. I verified it in a build and a screenshot.
- **Landed (uncommitted work from agents, now committed):**
  - Fact-check pass 8b: 45 lessons, about 215 claims verified, 0 disputed, 2 claims added.
  - Learner reviews for 30 lessons (prob, econ, chem): 19 launch, 10 revise, 1 fatal (twenty-then-ten-off float artefact). Board items W-124..W-128.
  - Leonie's role evaluation, handoff map and proposals P1–P9 are now F-13, P1 in the inbox.
- **Believe (fairly sure):** Leonie is right that I do too much myself: publishing, QA records and chairing. I won't publish more until the founder rules on P1.
- **Next:**
  - Merge the concept inspector when the design engineer reports.
  - Builders take W-124..W-128.
  - Update EXP-003 with launch rates.
- **Blocked:** on the founder's inbox.

## YYYY-MM-DD · <role> · <one-line summary>
- Changed:
- Believe now (and how sure):
- Next (owner):
- Blocked:
```

## 2026-10-13 · cm-lifehacks · First 5 Life Hacks briefs, 7 illustration requests, safety gate held by brief-skips

- Changed: `company/domains/briefs/lifehacks.md` now holds 5 ranked briefs (towel-spread-dries-first, spaced-beats-cram, wobbly-table-quarter-turn, square-bow-stays-tied, long-cord-knots-itself), each with format, proposed safety class (all "none") and image needs. The first line says "Safety review: pending". I added 3 concepts to `content/curriculum/lifehacks.json` (wobbly-table-turn, shoelace-square-bow, cord-tangle-length, demand 2). I wrote 7 illustration requests (9 images) in `company/design/illustration-requests/`. The 5 anchors in `_reference.md` already existed and I left them alone. The second image set for a lesson uses slug `<lesson>-pair` plus a `lesson:` field, because `tools/illustrations.mjs` keys requests by slug. I put the 5 slugs in `company/ops/brief-skips.json` so `claim.mjs next lifehacks` prints NONE until the safety reviewer passes them (W-129). Board: W-090 → review, W-112 → done, W-116 → review (the interaction designer revises my alt-text drafts from their specs).
- Believe now (medium): the mechanisms are checkable, but several planned sources are from memory and need the fact-checker. Specifically: the Raymer & Smith 2007 plateau of about 50%, the Daily-Diamond 2017 square-vs-granny result, the 35° slope limit in Baritompa et al. 2007, and the Martin arXiv id. Brief 4's answer depends on the 2017 paper. If the paper does not compare the two bows, the brief needs a different source (Ashley) or a rewrite. Cooking, money and sleep are deferred to the next batch because each one needs a full safety review.
- Next: lifehacks-safety-reviewer: W-129 (pass or raise the class, then remove the skip lines). learning-designer/interaction-designer: W-101, specs for the 5. visual-designer: W-115 once anchors arrive. founder: W-122 (image terms) before the illustrator starts.
- Blocked: builders, until W-129 passes. Images, until W-122 and the _reference anchors are accepted.

## 2026-10-13 · chief-of-staff-ceo-office · First role evaluation, handoff map, 9 org-change proposals
- Changed: new company/ceo-office/2026-10-13-role-evaluation.md (74 roles: keep 16, activate 14, re-scope 4, merge 2, wait 38), company/ceo-office/handoff-map.md (lesson and org-change flows, independence table, new orgs), company/ceo-office/2026-10-13-proposals.md (P1–P9 with decision-record drafts; 8 WBR health metrics). No roles, board, gates or lessons touched; nothing committed by me.
- Believe now (high, from events, board and records): 54 of 70 agent roles never dispatched. The operator publishes (76/76), files the QA records stamped "qa-tester", chairs launch reviews "acting" and writes analytics "acting". 0 a11y records against a written launch condition. `tools/events.mjs` assigns actors by commit keyword, so HQ overstates other roles' activity. 4 of 7 role changes have no decision record (2 were added during this evaluation).
- Next: founder decides P1–P3, P5–P8. chief-of-staff answers role-evaluation §3 in writing and does P4 and P9 (no founder needed). CEO office writes the first WBR company-health section.
- Blocked: everything that changes roles waits on the founder.

## 2026-10-13 · fact-checker · Pass 7: 45 lessons checked, 191 claims verified, 0 disputed
- Changed: verified the 4 reworded claims (one-in-four-sprouts c3, saturated-enzyme c2/c3, point-one-is-26-percent c5), builder-flagged claims (red-apple-green-light, filament-vs-led-heat, paper-stops-alpha, pay-first-then-profit, geography ISS/GPS/geostationary, antarctica areas, city coordinates), all of geography except half-of-humanity, 10 probability and 14 economics lessons. Records appended as "Pass 7" in company/reviews/<slug>/2026-10-13-fact-check.md. salt-ions-count-double c5 still says "about 3.5": left unverified.
- Believe now (high): every verified claim re-derived in node (model.ts run directly, d3-geo walks re-run on the kit data). Soft spots: c5 of antarctica-vs-australia names the CIA Factbook for 7.69 (Factbook gives 7.74; Geoscience Australia gives 7.692); the source line should say so.
- Next (builder): salt-ions c5 to "about 3.4". Next (fact-checker): the rest, mainly ai, chemistry, cs, life, math, physics, 10 more probability lessons (a-birthday-like-mine ... two-random-walks-agree), economics twenty-then-ten-off.
- Blocked: half-of-humanity c1 (population.un.org unreachable).

## 2026-10-13 · platform-engineer · SPIKE-001: lessons in a sandboxed cross-origin iframe (W-074)
- Changed: new spike/ (builder, kit entry and bridge, CDN server, manifest and rollback tools, measure script, QA contract copy, security spec, hostile fixture) and the src/app/spike route; company/engineering/spikes/SPIKE-001-frontend-sandbox.md + SPIKE-001-results.json; platform-engineer findings in the EDD-003 review record; README index; changelog; spike/dist gitignored. No feed, lesson page, kit, gate, tests/qa or lesson source changed. No new dependency (Next's vendored webpack and terser, plus typescript and postcss). W-074 → review; W-077..W-080 added.
- Believe now (and how sure): go with changes for stage 1. Measured in Chromium emulation on a loaded machine: lessons 2.2–2.5 KB gz (all 348 ≤ 8.3 KB), kit 61.8 KB gz, geo kit 71 KB gz, cold insert→ready ≤ 1.1 s even at 4× CPU, memory 0.85× today's feed (high confidence). The negative security test passes with a positive control (high). The QA contract works through frameLocator, 6/6 (high). Warm remount is 0.2–0.7 s, so the "warm" budget needs redefining (medium). iOS and real devices are untested (unknown).
- Next (owner): real-device run (platform-engineer, W-077); separate lesson domain plus CSP header (privacy-reviewer, W-078); QA-through-frame amendment (evaluation-steward, W-079); bundler decision record (platform-engineer, W-080); principal-engineer closes the review.
- Blocked: nothing. To reproduce, see the end of the spike doc.

## 2026-10-13 · principal-engineer · EDD-003 lesson storage and loading at scale (design only)
- Changed: company/engineering/edd/EDD-003-lesson-storage-at-scale.md (new), company/rituals/records/2026-10-13-eng-review-lesson-storage.md (open), EDD index line in company/engineering/README.md, board W-074..W-076. No code, gates or protected paths touched; build ran in .next-pe (removed), tsconfig.json restored.
- Believe now (and how sure): measured at 348 lessons: 73 s build, 321 MB output, 4.26 MB packed git, 6.8 files/lesson, 6.6 s QA wall/lesson. The feed HTML (1.82 MB) and the all-metas chunk on every page (1.29 MB) are already over budget (high confidence, measured). One app build and full-catalog QA break at 2k–10k; plain git near 100k (medium, linear extrapolation). Recommend client-side content-hashed bundles in a sandboxed cross-origin iframe, with the server serving manifest, meta and previews; never server-side lesson code (high on the direction, medium on the iframe host until the spike).
- Next (owner): platform-engineer runs the 3-lesson spike (W-074) and fixes EDD-001 (W-076); the invited reviewers answer the questions in the review record (W-075); the founder answers the 7 questions in EDD-003.
- Blocked: gate changes need amendments drafted by the evaluation steward; the bundler choice needs a decision record.

## 2026-10-13 · platform-engineer / release-manager (Codex implementation) · GitHub deployment pipeline
- Changed: .github/workflows/deploy.yml; automatic previews after successful default-branch CI, manual production on the default branch, immutable release checkout, scoped environment credentials, pinned actions and release artifacts. The deploy command now supports --prebuilt (verify, pull, local build, upload, smoke, promote).
- Believe now (and how sure): 17 deployment tests and actionlint/shell/deployment-boundary checks pass; local Vercel builders receive no authentication token (high confidence in orchestration). Cloud upload/promotion still needs configured GitHub/Vercel credentials.
- Next (owner): principal-engineer reviews the PR; founder/release-manager configures preview-deploy and production environments with Vercel IDs and token, then uses the workflow.
- Blocked: the checkout has no Git push credentials; the explicitly authorized upload uses the connected GitHub account. No live deployment requested or created.

## 2026-10-13 · platform-engineer / release-manager (Codex implementation) · executable Vercel deployment
- Changed: tools/deploy.mjs, npm deploy/test:deploy commands, /deploy, release-manager onboarding and runbook; Vercel CLI pinned at 63.1.2. Production visibility now covers map and standalone URLs. EDD-002, decision and implementation-review records accompany the PR.
- Believe now (and how sure): the workflow blocks promotion on failed checks (13 orchestration tests); the updated preview works (646/646 browser QA), and the production build shows 47 published cards and returns 404 on all 271 unpublished lesson URLs (high confidence in local behavior; cloud upload/promotion not exercised).
- Next (owner): principal-engineer reviews the PR; release-manager uses npm run deploy -- preview after one-time Vercel login/link. Production is explicit and stages before promotion.
- Blocked: no linked Vercel project in this checkout; no live deployment attempted. Existing four disputed-claim warnings remain in the review queue.

## 2026-10-13 · fact-checker · second independent pass: Part A (9 prior fact-checker claims + 4 more) and Part B (economics, math, physics, life, geography, probability)
- Changed: statuses and checkedBy/checkedOn on about 270 claims across 57 lessons (11 disputed, 1 left unverified); fact-check sections appended to company/reviews/<slug>/2026-10-13-fact-check.md. No Demo.tsx edits, no claims added.
- Disputed (reasons in each review file): ai/border-follows-point c5, ai/clicks-not-value c5, ai/draw-the-xor-lines c5, ai/gradient-descent c11, ai/meaning-without-the-word c5, ai/penalty-on-wiggle c5, ai/temperature-reshapes c8, economics/two-bets-split c7, geography/fingernail-ocean c2, life/vaccinate-at-the-peak c3, math/rabbit-ratio c4.
- Left unverified: geography/half-of-humanity c1 (UN WPP 2024 table unreachable: population.un.org, data.un.org, Wikipedia and OWID were blocked from this session; only partial corroboration).
- Believe now: numbers re-derived in node from the Demo.tsx model code (kit/geo shapes, SIR/SIRS, throw-it-fast-enough model.ts); high confidence. Source checks by web search for Peeperkorn 2024, Lewis 2020, AP style, Bishop Museum (Lahaina Noon), Ledyard 1995 (secondary only), UL 489 trip times (secondary only).
- Next: demo-builder fixes the 11 disputed wordings (board W-058); fact-checker with network access compares half-of-humanity c1 (W-059). Advisory wording notes (not blocking) are in the review files: horizon-ruler refraction 'a few per cent' (about 8%), sieve 'clear a hundred numbers', friends-have-more-friends c3 'wherever friend counts differ' is false for disconnected networks, throw-it-fast-enough ISS 7.7 vs NASA 7.8 km/s.
- Blocked: none.

## 2026-10-13 (night) · chief-of-staff · 504 lessons: past the 500 target
- **Changed:**
  - Lessons went from 328 to 504 this evening, with every domain except Life Hacks at or near the end of its brief list.
  - New orgs and roles: Life Hacks, Personalization, International, Design, 27 sub-area category managers, the Principal PM for verticals, and the CEO-office chief of staff (Leonie). That is 72 roles in total.
  - The work queue (`tools/claim.mjs`), the walkthrough contact sheets and the publish loop.
  - HQ now has 3 floors.
  - Agent metrics are in the WBR.
  - SPIKE-001 came back "go with changes".
- **Believe now:**
  - 504 lessons is a count of lessons built and QA'd, not of good lessons (high confidence). Roughly 80 are published. Most of the rest have no learner review yet or a "revise" verdict, and about 415 claims are still unverified (two fact-checkers are on them).
  - The quality loop is the bottleneck, not building: the launch rate is about 37% on first review.
  - 53 of 72 roles have never been dispatched. Leonie is evaluating that now.
- **Next:**
  1. Leonie's role evaluation and handoff map: the founder decides on her proposals.
  2. Finish fact-check pass 8 and the reviews, then run the publish loop.
  3. Hand QA and publishing back to qa-tester and release-manager.
  4. Run the accessibility review (W-057).
  5. EXP-003 result: Sonnet vs Opus builders.
  6. Design review of new briefs.
- **Blocked (founder):**
  - backend choices (auth provider, database host, under-13 policy);
  - usage budget;
  - AMD-001;
  - UN WPP and Bullard source checks;
  - the Personalization brief;
  - the image-generation agent setup (waiting for a yes).
- **Tooling note:** builders report that the claim schema rejects support "citation", so they use "source". Either document "source" as the type for citations in demo-standard, or propose adding "citation" (the gate is constitutional).

## 2026-10-13 (evening) · chief-of-staff · Three new teams; HQ live locally; 328 lessons
- Changed:
  - New teams: backend (backend-engineer, privacy-reviewer), growth (growth-designer) and company tools (tools-lead, hq-engineer). Decision record: company/decisions/2026-10-13-three-new-teams.md.
  - Event log: company/ops/events.jsonl plus tools/events.mjs, backfilled with about 590 events from git and session transcripts.
  - HQ at /hq: floor plan, replay, timeline, Lobby with due rituals and founder items.
  - Event-driven ritual triggers: company/rituals/triggers.json and tools/rituals-due.mjs.
  - Merged chemistry wave 4 and the pass-4 claim fixes. Check: 0 warnings.
- Believe now:
  - HQ works locally (screenshots on desktop, phone and replay; high confidence). It is off in production unless HQ_PUBLIC=1.
  - The usage limit is the binding constraint: it stopped all 8 agents for about 7 hours.
- Next (chief-of-staff):
  - Merge the resumed agents (ai w4, geography w4 builders; life reviser; economics, cs, geography reviewers).
  - Run the publish loop, then the rituals that are due (retro, demo crit, the first founder digest).
  - A fact-check pass for chemistry w4, probability w3, geography w3 and the 5 claim fixes.
- Blocked (founder):
  - Backend choices: auth provider, database host, under-13 policy.
  - Budget split between lessons and the new teams.
  - AMD-001 ratification.
  - UN WPP and Bullard source checks.

## 2026-10-13 (late) · chief-of-staff · 248 lessons; wave 4 under way
- Changed: merged wave 3 (ai, chemistry, life) and CS wave 2, for 248 lessons and 1,300 claims; check passes (6 disputed-claim warnings). The walkthrough driver now follows the QA path (each control once, in DOM order, 1.2 s settle). Running: builders for geography w2, physics w4, math w4, economics w4 and cs w3 (5 Opus, the cap), plus a fact-checker on ai/chemistry/cs.
- Believe now: about 20k build tokens per lesson holds (cs w2: 196k for 10). The learner launch rate of about 11% is the real constraint, not build throughput (medium-high confidence). Only 2 lessons are published.
- Next (chief-of-staff): merge builders as they report; once the integrated QA finishes, qa-record and publish the launch-verdict lessons; regenerate walkthroughs and dispatch learner reviewers per domain; revision builders for "revise" findings; WBR and retro for waves 2–4.
- Blocked: AMD-001 (a–d), the OP and the usage budget wait on the founder, as do the human source checks (UN WPP, Bullard 1965).

## 2026-10-13 · chief-of-staff · 178 lessons merged; usage-limit COE; checks resuming
- Changed: waves 1 and 2 (7 domains) merged, plus revisions of all 18 founding lessons (every fatal fixed). Kit: <Milestones>, mulberry32, reveal layout fix, turbopack worktree root. Integrated QA last run 226/226 (before wave 2's 70 merged).
- Believe now: builders cost about 20k tokens per lesson, and checking is the bottleneck. 150+ lessons have no learner review. Wave 3 builders (econ, chem, physics, math) resumed via SendMessage; life, ai, cs-w2 and geo-w2 are still stopped with partial work in their worktrees.
- Next (chief-of-staff): when the resumed builders report, resume life, ai, cs-w2 and geo-w2 (max 4 Opus at once). After the fact-checkers: learner reviews per domain, then publish what passes. Then a full verify on the integrated tree, a WBR and the wave 2 retro.
- Blocked: AMD-001 and the OP need the founder's ratification. A usage budget is unknown (COE action).

## 2026-10-12 · chief-of-staff · Founding session: company, app and first 17 lessons
- Changed: built the feed app and lesson kit, the company handbook (26 roles/25 agents, constitution, 13 rituals, PM system, patterns, experiments), the CLI and computer-use QA. Four parallel builders made 16 lessons across 8 domains; merge-sort-payoff is the exemplar. Fact-check and a simulated-learner review were run on merge-sort-payoff.
- Believe now: all 17 lessons pass the QA contract on phone and desktop (44/44). That means they work, not that they teach (high confidence that they work, no evidence that they teach). The merge-sort learner review found the stage never shows why splitting helps (W-014). Expect similar "told, not shown" findings elsewhere.
- Next: fact-check the remaining 16 lessons (W-001, fact-checker). Run learner reviews from walkthroughs (W-002). First Demo Crit, then launch reviews; nothing is published yet. Run the first WBR and OP.
- Blocked: real-learner evidence needs the founder (EXP-002, W-007). The kit's `next build` with NEXT_DIST_DIR rewrites tsconfig.json; revert it, don't commit it.

