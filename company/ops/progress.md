# Progress log (session handoffs)

Newest entry at the top. Every session adds one before it ends. This is testimony from a worker
who no longer exists: check what you rely on.

Template:

```markdown

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

