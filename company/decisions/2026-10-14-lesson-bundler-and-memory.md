# Two founder decisions for EDD-003 stage 1: the lesson bundler, and whether "the disk is the memory" means git

owner: founder (decides both) · prepared by: principal-engineer (Kenji)
date: 2026-10-14
status: awaiting founder decision. Revisit on the founder's answer.
Sources: [EDD-003](../engineering/edd/EDD-003-lesson-storage-at-scale.md), [review (closed, approve with changes)](../rituals/records/2026-10-13-eng-review-lesson-storage.md), [SPIKE-001](../engineering/spikes/SPIKE-001-frontend-sandbox.md)

## Context
We have 879 lessons and the target is 2,000. Build 7 took about 7.1 min (0.48 s per lesson, growing faster than linear) with 1.2 GB of output, and full QA is about 2.6 h. Stage 1 builds each lesson on its own. The spike did that with no new dependency by borrowing Next's internal webpack and terser (`next/dist/compiled/*`), which is a private API. Stage 1 also moves "what learners see" from a compiled registry to a manifest of hashes, so we need to say what the company's memory is.

## Decision 1: the lesson bundler (a new devDependency needs your approval)

| Option | For | Against |
|---|---|---|
| A. Stay on Next's internal webpack/terser | No new dependency; works today on 348/348 lessons | Private API: any Next upgrade can break or silently change every bundle hash. We just did a Next 16 upgrade. |
| **B. esbuild, exact-pinned devDependency, used only by the lesson-build tool** | One package plus one platform binary, MIT, fast, built-in CSS modules (`local-css`). Bundles are plain ESM, so the choice is reversible. | A native binary in the toolchain. Its CSS-module naming differs from Next's, so lessons must be screenshot-compared once. |
| C. webpack (or Rollup/Vite) as a public devDependency | Public API; webpack is what the spike already proved | Much larger dependency tree to audit; slower |
| D. Defer stage 1 and stay on one app build to 2,000 | No dependency, no migration | Linear projection: about 16 min and 2.7 GB per build at 2,000, past the 10-min trigger at about 1,250. Every kit change still re-tests every lesson. |

**Recommendation: B.** Conditions: exact version pin; `npm audit` and a license check recorded when it is added (best practice 5); before any lesson migrates, all lessons build through it and a sample is screenshot-compared with the spike's webpack builds; a bundler upgrade is scheduled like a kit major (it changes every bundle hash). Owner after approval: platform-engineer (W-088). Confidence: medium-high. I have not run esbuild here (it is not installed). The license and size claims are from its published package and need checking when it is added.

## Decision 2: constitutional question 7, does "the disk is the memory" mean git?
Fact first: the phrase is in `CLAUDE.md` and in every role's working agreement, **not in the constitution**, and neither file is protected. Today it is a working rule, not constitutional surface.

| Option | Meaning | Against |
|---|---|---|
| A. Git, literally | Every record and every version lives in a git repository | Fine to 100k lessons (EDD-003). Rules out an append-only content store at stage 3 without a new decision. |
| **B. Git now; the rule is the properties, not the tool** | Memory must be durable, append-only, content-addressed, readable by the next worker with repository tools, and must not depend on a person. Git is how we meet that, and the only accepted way until a stage-3 EDD shows another store meets every property (with git exports). | Looser words can be stretched; needs an amendment to protect it. |
| C. Any persistent store | Databases count as memory | Loses audit and the "next worker knows nothing" guarantee. Not recommended. |

**Recommendation: B, plus two rules that matter in stage 1, not only at stage 3.** (1) Every manifest change (publish, rollback) is a git commit, so git always says what learners were served. (2) Built bundles on the CDN are derived artifacts, not memory: they must be rebuildable from git (the spike showed identical hashes from two clean builds). If you want this protected, the evaluation steward drafts an amendment that adds the principle to the constitution. Confidence: high that B is right for stage 1; the stage-3 store question stays open by design.

## Rests on
SPIKE-001 measurements (bundle sizes, deterministic hashes, rollback drill); build 7 and QA timings (2026-10-14); EDD-003 extrapolation table.

## Revisit if
Next exposes a supported bundling API (Decision 1, option A becomes safe); esbuild's CSS-module output fails the screenshot comparison; a stage-3 trigger fires (Decision 2).

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| A new native-binary dependency enlarges the supply chain | principal-engineer | evidence | Open: answered only by exact pinning plus audit and license check at the time it is added. You decide whether that is enough. |
| Changing the bundler changes every bundle hash, so every lesson needs QA again | principal-engineer | evidence | Accepted: pin it exactly, schedule upgrades like a kit major; the evaluation steward sets the re-QA sample (W-087). |
| Option D (no stage 1 before 2,000) is cheaper this month | principal-engineer | purpose | Rejected because the build passes its trigger near 1,250 lessons and full QA already passes its trigger (2.6 h vs 2 h). Reopen if stage 0's changed-only QA plus a build under 10 min holds at 1,500. |
| Option B's wording can be stretched to justify a database early | principal-engineer | purpose | Open: the guard is that only a stage-3 EDD and an amendment can name another store. Your call. |
| The spike route that tested all this was merged and ships to production | principal-engineer | evidence | Open, funded: W-477 (platform-engineer, P2). Not a reason to delay these decisions. |
