# Life Hacks 200: integration and validation

chief-of-staff / qa-tester · 2026-10-14 · founder-requested review PR

## Delivered scope

Exactly 200 distinct lesson folders and globally unique slugs: 70 home, 70 study and
60 resource lessons. The authoritative inventory is
`content/collections/lifehacks-200.json`; its group counts total 200. All lessons use
predict → explore → reveal, addressed claims, recall, curriculum links, registered
format/interaction IDs and the existing kit. No dependencies or protected paths changed.

The initial PR integration checkpoint was upstream `aef5a704`. It retained the 14 CS
lessons and phone reveal sizing from `2c9c9e5`, plus subsequent unrelated lesson
fixes and company records. At that checkpoint, shared UI and Life Hacks source matched the initial tested build. The complete app has 723 lessons. This PR adds
the 200 Life Hacks and preserves upstream work.

## Follow-up integration: `840ba7ad`

The branch now includes upstream `840ba7ad`, including the shared color tokens and
reveal resize/scroll fixes from `77c95b1f`, and the later company-role addition.
The 200-lesson inventory, teaching content, claims and pure models are unchanged.
The label-search target alone uses a bright shape fill plus dark ink to retain
contrast under the new semantic color tokens.

- Full app regression on the merged `77c95b1f` layout, before that small fill repair:
  **1456/1456 browser tests passed in 21.2 minutes**, zero failures, skips or retries.
  This includes all 200 Life Hacks on phone/desktop and both feed suites.
- The final label-search repair passed **two additional phone/desktop contracts**
  against a rebuilt production app. Four real searches measured **10.04:1** target
  contrast across phone/desktop and light/dark. See the dedicated integration record.
- The 17 deployment fixtures and 48 Life Hacks fixtures passed. Check reported
  723 lessons, 3622 claims and zero warnings at `77c95b1f`; the earlier upstream
  disputed claims were resolved there. Check/typecheck/build passed after the fill repair.
  After including `840ba7ad`, check again passed with 723 lessons, 3622 claims,
  82 roles and zero warnings; TypeScript and the final production build passed.
- A concurrent second build exited 137 while the full browser sweep ran. Its
  serial retry after the sweep passed; the final contrast evidence uses that successful build.
- Earlier GitHub CI on `19e0932b` also passed constitution and all 1456 browser checks.
- Vercel's PR bot reports `api-deployments-free-per-day` (more than 100 deployments),
  asking to retry in 24 hours. This is a preview quota blocker; no preview URL or
  production deployment is claimed.

Upstream board items and the exact latest event-log prefix are preserved. Life Hacks
work IDs are now **W-176** (PR), **W-177** (fact-checking) and **W-178** (remaining
learner/safety review); an append-only correction retains the older event history.
All 200 lessons remain review with all 883 claims unverified. Specialist reviews
remain scoped to their recorded artifacts; the fresh technical run is not a new
human-learning, whole-collection accessibility or publication approval.

## Initial 200-lesson computer-use evidence

Browser build `a60d245`, after the final upstream merge:

| Check | Actual result |
|---|---|
| Deployment orchestration fixtures | 17 passed |
| Life Hacks model, geometry and transfer fixtures | 48 passed |
| Company check | Passed; 723 lessons, 3577 claims, 81 roles |
| TypeScript and production build | Passed |
| Phone/desktop contracts for every new lesson | 400 passed, zero retries |
| Feed, filtering, provenance, spaced revisit and curriculum | 10 passed, zero retries |

The final browser run passed **410/410** in 5.7 minutes. Its original report is
`test-results-lifehacks-final-layout/qa-report.json`. The QA recorder received only
the 200 contract suites copied from that real report; result entries were not changed.
It filed 200 individual `2026-10-14-qa.md` records and their metadata evidence paths.
Existing lessons' QA metadata was not rewritten.

An additional real browser exercise seeded a two-day completion history for nine
revised lessons and checked their actual revisit prompts, options and explanations
on phone and desktop: **18 passed**. These captures are explicitly scripted UI
evidence, not human learning or retention evidence. They use build `64b7b1e`;
the later upstream change affects lesson reveal layout, not the revisit component.

Three company-check warnings were present at the initial checkpoint in upstream CS lessons:
`median-without-sorting`, `rsa-lock-with-public-key`, `two-pointers-meet` have disputed
claims. None is a new Life Hacks warning. No unrelated lesson code or protected path
differs from the final upstream checkpoint.

## Independent review and remaining gates

- Safety reviewer read all 200 main transcripts, the nine replacement transcripts,
  and nine real recall transcripts. Nineteen focused sheets, one representative sheet
  and four focused recall pairs were actually inspected. See the dated safety index
  for warnings, hashes, unsampled visuals and the later-layout scope.
- Learner evaluator reviewed 21 distinct samples artifact-first. Latest recommendations
  before the final shared-layout merge: 13 launch, eight revise, zero fatal. The
  earlier energy-axis fatal is retained historically and resolved against a fresh render.
- Interaction designer inspected specific phone frames and fresh walkthroughs for
  masking, geometry, axes, water levels, cylinder proportions, bow step accounting and
  visible search elimination. The handoff distinguishes code inspection from actual images.
- After the last layout merge, all 200 lessons received fresh browser contracts and
  25 focused phone walkthroughs were regenerated. Dated specialist records state exactly
  which layout and capture they reviewed; a prior pass is not silently transferred.
  The safety reviewer reread those 25 transcripts and inspected all 19 focused current
  sheets plus one representative sheet. No new blocker was observed within that scope;
  180 other main sheets remain visually unsampled.

All 200 remain **review**, with empty confidence and **883 unverified claims**.
The category remains incubating. No fact-check, accessibility clearance, human-learning
result, publication, activation or deployment is inferred from technical QA or simulated
learner recommendations.

`W-176` is the delivered PR work. `W-177` owns independent source/claim checking.
`W-178` owns remaining artifact/learner reviews and specific findings, including towel
baseline/flux visibility, table continuity/variants, laundry framing, abstract cord
geometry, selection highlights, queue waiting trade and mechanism-specific recall.

## Earlier failures and fixes

The initial 709-lesson regression passed 1426 tests and failed the same no-op Cover
control on phone and desktop. Rule application now uses visible inputs and genuine
sorting/checking; the final runs pass. Independent reviews also led to masked future
spacing curves, accurate ruler/packing scales, return arrows, fixed water scales and
tap paths, actual energy durations, proportional cylinder caps, concrete transfer
recalls, explicit zero-step bow motion and observable midpoint elimination.

A narrow rerun initially included the feed suite with `QA_ONLY` set to nine lessons.
That made its expected inventory nine while the feed correctly displayed all 200
Life Hacks. Contract-only reruns and feed reruns without `QA_ONLY` passed; protected
tests were not changed. The final 410-pass run includes the full 200-lesson inventory.
Metadata fixtures now allow recorded QA and independent verification, rather than
permanently requiring the initial empty evidence or old engine's exact prose.

## Reproduction and versioned source

```sh
npm ci
npx playwright install chromium
SHOW_REVIEW=on NEXT_PUBLIC_EVENTS=off npm run verify
```

For a single lesson use `QA_ONLY=<slug> npm run qa -- tests/qa/contract.spec.ts`.
Run feed tests without `QA_ONLY`. `npm run walkthrough -- <slug> --viewport phone`
regenerates its learner-visible transcript and frames after a fresh review build.
Browser outputs are ignored artifacts; records commit the results, boundaries and
reproduction route.

The local build labels in historical reviews map to exact source trees preserved as
reachable snapshot commits in this PR's history:

| Local build label | Published source snapshot |
|---|---|
| bf149a5 | [d932f66](https://github.com/hanialshater/system-3-company/commit/d932f66f3c73cc490b4735feec8b4ba0bc880edb) |
| be775a7 | [ba71889](https://github.com/hanialshater/system-3-company/commit/ba71889d510765712aa29186322ee25f0170c8de) |
| fc2b349 | [6de8a19](https://github.com/hanialshater/system-3-company/commit/6de8a19d685332428215b8cc075b9f74c29b62cc) |
| 64b7b1e | [d0af55c](https://github.com/hanialshater/system-3-company/commit/d0af55c96380e3107f671f51b0e1d5014b7a6785) |

The snapshot tree SHAs were checked against the local builds; `source-snapshots.json`
records the mapping. Canonical walkthrough paths now hold the newer captures for
25 replaced lessons. Historical hashes remain tied to their historical versions;
175 unchanged earlier captures were archived locally. The 25 superseded captures were
not archived; their historical records retain that limitation and their source versions.

After resolving PR conflicts against `aef5a704`, company check passed with 723 lessons, 3598 claims and the same three upstream warnings. No shared UI or Life Hacks implementation changed in that merge; the final 410-pass contract run still tests the delivered Life Hacks code.
