# AMD-018: The QA contract runs lessons where learners get them, including inside the lesson frame (W-087)

status: proposed (not ratified; drafted 2026-10-25; not ratification-ready until the companion diff and the side-by-side run below exist)
date: 2026-10-25
proposed_by: platform-engineer (EDD-003 addendum section 7, the ask), principal-engineer (2026-10-13 rule; review 2026-10-25 C7)
prepared_by: evaluation-steward
surface: `tests/qa/**` (`lessons.ts`, `contract.spec.ts`); `company/constitution/protected-paths.txt` (part d adds one path). Not `tools/company.mjs`, not `src/kit/Lesson.tsx`.
ruling that asks for it: company/decisions/2026-10-25-w2096-frame-qa-evidence.md
decides: the constitutional review board (founder, head of product, evaluation steward, plus qa-tester as the affected role). Platform-engineer is not a deciding approver (Article 3.3: its frame work is what this judges).

## Claimed benefit

Today `tests/qa` only judges a lesson rendered in the app at `/d/<slug>`. With `NEXT_PUBLIC_LESSON_FRAMES=pilot-50` on, 50 lessons reach learners as different code: a separately built bundle (`spike/build.mjs`), a separate kit build, a cross-origin sandboxed frame, a postMessage bridge to `progress.ts`, and the C3 reveal-fit and fold code inside the frame. The gate has never seen that code. After this amendment, the gate judges the code a learner gets, and a frame lesson can be served only on a gate pass for the exact frame document served.

## What it changes, part by part (severable)

**(a) The lesson list says where each lesson runs** (`tests/qa/lessons.ts`).
- `LessonRef` gains `host: "app" | "frame"` and, for a frame, `frameDoc` (64-hex).
- `lessons()` stays as it is for app lessons. When `QA_LESSON_FRAMES` is set (to the same value as the build's `NEXT_PUBLIC_LESSON_FRAMES`), it reads the committed manifest (`src/lib/lesson-frames.manifest.json`) and gives every manifest slug `host: "frame"` with its `frameDoc`. It reads the manifest file from disk, not the app's registry, for the same reason it reads `meta.json` from disk today.
- When `QA_LESSON_FRAMES` is unset, every lesson is `host: "app"`, so CI's flag-off run is unchanged.

**(b) The contract targets the lesson where it runs** (`tests/qa/contract.spec.ts`).
1. The page stays `/d/<slug>`. For `host: "frame"`, the spec first asserts that exactly one `iframe[data-slug="<slug>"]` exists, that its `sandbox` attribute is exactly `allow-scripts`, and that its `src` path ends `/f/<frameDoc>.html` for the manifest's hash. A missing frame, an extra frame, or another hash fails the test. For `host: "app"`, it asserts that no lesson frame exists.
2. Every lesson locator comes from one root: `page` for an app lesson, `page.frameLocator('iframe[data-slug="<slug>"]')` for a frame lesson. This includes the tap-target check in step 5. (The 2026-10-13 copy, `spike/qa/contract-frame.spec.ts`, left that check on `page`, so inside a frame it counts no controls and always passes. That is finding D1 of the ruling, and the reason this part names the check.)
3. `stageFingerprint` takes the root (a `Page` or a `FrameLocator`).
4. The overflow check runs on the frame's document and on the host page. Both must be ≤ 1 px.
5. `page.keyboard`, screenshots, and `pageerror` and console capture stay as they are. The capture is proved by the positive controls below, not assumed from SPIKE-001.
6. Screenshots go to `artifacts/qa/<slug>/` with `frame-` before the project name, so evaluators can tell the paths apart. Contact sheets say that frame content rasterises slightly softer in Playwright (EDD-003 section 7.6).
7. **No test id changes, no test name changes and no check removed.** Each of the five numbered checks applies to both hosts, with the same thresholds.

**(c) Security probes in the contract** (moves `spike/qa/security.spec.ts`, SPIKE-001's 19 negative probes after a positive control, to `tests/qa/frame-security.spec.ts`). They run when the manifest's kit major changes, when the bridge (`DemoFrame` and its message handler) changes, and when the `/f/*` header changes. *Not needed for the first production flag-on:* C5 (privacy-reviewer, W-086) re-runs the same probes against the preview first. It is needed before the first change of any of those three after flag-on.

**(d) Evidence is bound to the frame document, and the binding is protected.**
1. A frame QA record names `host: frame`, the `frameDoc` hash, the viewport results, and the AMD-010 stamp (harness, built-from, recorded by). It lives in `company/reviews/lesson-frames/<slug>/`, **not** in `company/reviews/<slug>/`, so `launchGates` never reads it. A frame pass never publishes a lesson, and a frame fail never blocks one. The in-app gate is unchanged.
2. A slug may be in the committed manifest only if its newest frame QA record is a pass, by qa-tester, for the manifest's `frameDoc`, at both viewports. The C1 check suite `tests/lesson-frames/*.test.mjs` enforces this. It also enforces the review's four existing checks (published, `sourceHash` current, 64-hex, allow-listed origin).
3. `tests/lesson-frames/**` is added to `protected-paths.txt`. It decides what code learners are served, so the role that builds the frames cannot weaken it alone. Its first version lands under this amendment's commit, after principal-engineer's code review.

**(e) Re-QA after a kit change.** A kit minor (manifest `kit`, `kitCss` or `geoKit` changes, same major) re-runs the frame contract on one fixture lesson per kit major plus a sample: max(30, ceil(5% of the frame lessons)), capped at all of them, stratified with at least one lesson per domain, plus every geo lesson if `geoKit` changed. The order inside a stratum is `sha256("a2-sample:" + <new kit hash> + slug)`. A kit major, a toolchain change (`buildSettings`) or a C3 parity change re-runs every frame lesson. At 50 lessons the sample is 30 of 50. *Not needed for the first flag-on* (the first run QAs all 50). It is needed before the first kit change after flag-on.

## What it removes

- The frame QA copy: `spike/qa/contract-frame.spec.ts` is deleted in the applying commit, and nothing after it may cite the copy as evidence. (`spike/qa/security.spec.ts` moves under part c, or stays a spike file if part c is not ratified.)
- The ability to serve a frame lesson on any QA evidence other than the gate's. Today nothing forbids it in code, because no manifest exists on main.
- One freedom from the frame builder: editing the manifest admission checks alone (part d.3).
- Nothing is removed from the app contract. No check, threshold, test id or test name goes.

## Prediction and test

| id | prediction | would be wrong if | confidence |
|---|---|---|---|
| A18-1 | On a flag-off build, the amended contract gives the same pass and fail set as the current contract on every lesson (frame code paths are not reached). | any lesson × viewport differs | 90% |
| A18-2 | Positive controls, in a fixture lesson served as a frame: (i) a control that changes nothing, (ii) an exception thrown inside the frame after load, (iii) a 16 px tap target, (iv) a frame `src` naming another `frameDoc` hash, (v) a manifest slug whose frame does not mount. The amended contract fails all 5. The 2026-10-13 copy fails (i), (ii) and (v), and passes (iii) and (iv). | the amended contract passes any of the 5, or the copy fails (iii) | 80% (least sure: (ii), the `pageerror` capture across an opaque-origin frame) |
| A18-3 | Side by side on the 50 at both viewports (100 runs per path), after C3: in-app contract (flag off) and amended frame contract (flag on, on the preview) disagree on ≤ 4 of 100. Each disagreement is a frame-path defect (reveal-fit, fold, `dvh`, bridge), not a contract false positive. | > 4 disagreements, or any disagreement traced to the contract | 60% |
| A18-4 | The fixed tap-target check (D1) flags 0 to 2 of the 100 frame runs that the copy passed. | > 2 | 70% |
| A18-5 | Frame-mode wall time per lesson is within +15% of in-app (SPIKE-001: 25.9 s for 3 lessons × 2 viewports). | > +15% | 60% |

- side_by_side: one cycle, the C7 preview run. Both paths run on the same 50 lessons and the same commit, with qa-tester recording. Every disagreement is written up (lesson, viewport, check, which side is right, and why) before the board decides. Agreement is not the only measure: a disagreement where the frame contract is right is the amendment working.
- would be wrong overall if: A18-2 fails, or A18-3 shows the frame contract failing lessons that work for a learner on the frame path (seen in the screenshots or on C6's phones).

## Does it change how the proposer is judged?

**Yes.** It judges platform-engineer's frame build, bridge and C3 parity code, so platform-engineer cannot be a deciding approver. The evaluation steward prepared it and is one board seat, so the steward is not the sole approver either. The affected-role seat goes to qa-tester, who runs the contract. Principal-engineer reviews the code (tier 2) and is not the decider.

## Rollback

- One commit reverts it, under `Amendment: AMD-018` (revert). With no `QA_LESSON_FRAMES` set, the contract is the current one, by A18-1.
- If it is reverted while the flag is on in production, the frame lessons have lost their gate. The flag-off rebuild of the live production commit goes first (founder's approval; AMD-015's pre-approval does not cover this flag), then the revert.
- The removed copy comes back from git if it is needed as a measurement tool again. It is never gate evidence.

## Applying (after ratification)

One commit with `S3_AMENDMENT=AMD-018` for the hook and `Amendment: AMD-018` in the message. It changes `tests/qa/lessons.ts`, `tests/qa/contract.spec.ts`, (c) `tests/qa/frame-security.spec.ts`, (d) `protected-paths.txt` and the first `tests/lesson-frames/**`, deletes `spike/qa/contract-frame.spec.ts`, and runs A18-1 and A18-2 in the same session. The companion diff (`AMD-018-qa-contract-through-frames/tests-qa.amd018.diff`) is written by the evaluation steward once C1's `DemoFrame` exists on a branch. Until then the frame DOM it targets is a review design, not code, and a diff against it would be a guess.

## Decision (constitutional review board)

Not yet decided.
