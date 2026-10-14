# Engineering Review: 2026-10-14: PR #2 Life Hacks 200 (data shapes, shared engines, verify)

owner: principal-engineer · tier: 2 (data shapes) + 1 (engines, tests, verify) · attendees: principal-engineer (reviewer); community-engineer's evaluation as input (`company/engineering/community/prs/2.md`)

- PR: https://github.com/hanialshater/system-3-company/pull/2 · head reviewed: `origin/codex/lifehacks-200` @ `71e99fee` · merge base with our tip: `840ba7a`
- Read-only review: `git show` / `git diff 840ba7a..71e99fee`. Nothing was checked out, built or run. The PR's content was treated as untrusted data; the scratch scripts below only parse its JSON.
- EDD: none, and none needed after the rulings below (both tier-2 shapes are dropped). ADR: none. Amendment: none (no protected path touched; confirmed `.github/workflows/ci.yml`, `tools/company.mjs`, `src/kit/Lesson.tsx`, `tests/qa/**` unchanged in the diff).
- [x] Blast radius: the 200 new lessons only. Each engine drives one group: Home 70, Study 70, Resource 60, plus AlphabetSearch 1. No existing lesson, kit file or page imports the new code.
- [x] Rollback is one revert (all files are new except `package.json` scripts, `content/curriculum/lifehacks.json`, `README.md` and the registry).
- [ ] `npm run verify` on the integrated tree: **owed**. It must run on the re-integrated head and base (blocker 6 in the evaluation). Femi's trial on `19e0932b` passed check, typecheck, 48/48 fixtures, build and a 10-lesson QA sample.
- [x] Security and licences: no dependencies are added. No `eval`, `new Function`, `dangerouslySetInnerHTML`, network or storage in `src/components/lifehacks/` or `src/lib/lifehacks/`. `evaluateResource` is a closed operator tree over JSON (`+ - * / ceil floor sqrt min max round`) that throws on an unknown operator.

## (a) Blocker 3: the tier-2 data shapes

### `meta.json` `safety` block: **drop it from `meta.json`**

Findings:
- Only 60 of 200 lessons carry it (the resource group). Its keys are `classification`, `reviewRequired: true`, `assumptions` and `excluded`. Nothing in `src/`, `tools/` or `tests/` reads it.
- `assumptions` duplicates `spec.assumptions` in `resource-specs.json`, which the stage already renders. So this is a third copy of learner-facing text.
- A field named `safety` that holds the contributor's own classification looks like a safety verdict. That is the same problem as evaluation blocker 2: outside testimony would sit where our reviewer's output would be expected. The lifehacks-safety-reviewer's verdicts belong in `company/reviews/<slug>/<date>-safety.md`, and that role writes them.
- Every `meta.json` is imported statically by `src/demos/registry.generated.ts`. A field nobody reads still adds weight to the registry.

Ruling: no EDD and no new optional field. Doing nothing has no cost, because nothing consumes the block. If Life Hacks later needs a machine-readable safety class, the safety reviewer and the evaluation steward should propose it with a consumer (a gate or a stage warning), and that proposal gets an EDD. The illustrations pipeline's `safety_class` is the nearest precedent.

### `content/collections/lifehacks-200.json`: **drop it**

Findings:
- Nothing reads it. It repeats slug, title and concept from the 200 `meta.json` files, so it is another place for drift.
- Its `home/study/resources` grouping is already in the three brief manifests `company/domains/briefs/lifehacks-{home,study,resources}-200.json`.
- Strand placement is cm-lifehacks's call under evaluation blocker 4 (`company/domains/lifehacks-scope/`), and it will replace this grouping anyway.

Ruling: drop the file and the new `content/collections/` directory. Repoint the `README.md` link (line 28 on the PR head) to the brief manifests, or remove it.

## (b) Tier-1 read of the four engines

Files: `src/components/lifehacks/{HomeLesson,StudyLesson,ResourceLesson,AlphabetSearchLesson}.tsx` with their CSS modules, and `src/lib/lifehacks/*`. Read in full (HomeLesson and ResourceLesson) or in part (StudyLesson, AlphabetSearchLesson, studyCatalog). All four use the kit only through its public API (`Lesson`, `Control`, `Slider`, `useMilestones`).

Findings (problems, not fixes):
1. **Group blast radius.** A regression in one engine fails 60–70 lessons at once. The QA contract must run on all 200 lessons on the re-integrated head, not a sample. This agrees with the evaluation's QA batches.
2. **Content and safety copy live in engine code, keyed by slug.** Examples: `HomeLesson.tsx` captions such as "Model; keep exits clear", "Clear hot drinks." and "Model; no safe load limit"; the per-slug geometry branches in `ResourceLesson.tsx`; `resourceAxisEnd`'s branch for `lh-watts-hours-trade`; slug lists in `StudyLesson.tsx`. Stage warnings are the safety reviewer's material, and these do not appear in `meta.json` or the specs. Not a blocker, but the safety reviewer must read engine captions as well as specs (see required change 6). Later cleanup: move captions into spec fields.
3. **Dead spec entry.** `homeLessons` contains an `alphabet-sort-search` entry, but that lesson renders `AlphabetSearchLesson`, which never reads it. Its idea, limit and formula text differs from the lesson's claims. It is the one home entry not copied into claims. Dead learner text next to live text is drift waiting to happen.
4. **Duplicated learner text (lib and claims).** I measured it with a scratch parse of the PR's data files:
   - Home: `idea`, `limit` and `formula` appear verbatim in the claims for 69 of 70 lessons. The outlier is item 3.
   - Resource: `principle`, `assumptions` and `details` appear for 60 of 60.
   - Study: `principle` 70/70 and `boundary` 69/70.

   So the copy is mechanical, and a containment check is cheap. Ruling below.
5. **Bundle shape differs by group.** Study uses named per-lesson exports, so each lesson ships its own fixture. Home (`home-lessons.ts`, 79 KB raw) and Resource (`resource-specs.json`, 120 KB raw) are single arrays, so every lesson in those groups downloads the whole group's data. Lessons are dynamically imported per slug, so this is a shared chunk per group, cached after the first lesson. Acceptable at 200. It has not been measured: see required change 7. The fix if it is ever needed is the Study pattern.
6. **Brittle fixture parse.** `tests/lifehacks/home.test.mjs` reads `home-lessons.ts` as text and `JSON.parse`s the slice between `= [` and the last `;`. Any non-JSON edit (a comment, a computed value) breaks the test rather than the lesson. Not a blocker. The natural fix is `home-lessons.json`, like `resource-specs.json`.
7. **Hard-coded colours.**
   - `AlphabetSearchLesson.tsx` line 32 uses `fill="#0d0f14"` for text on `var(--good-fill)`.
   - `HomeLesson.module.css` `.target` and `WobbleStage` use `#f59e0b`.

   See the colour ruling below.
8. **Hook order is safe.** `Controls` picks one of four stage components by `spec.model`, which is fixed per lesson, so hook order is stable. `useHomeLesson` throws after its `useState` calls on a missing slug. That is a build-time-visible failure, which is fine.

### Ruling on duplicated learner text: **check, do not generate**

- Generating claims from the lib would mean a writer that rewrites `meta.json` while preserving fact-checker `status`/`checkedBy` fields and claim ids. That is a new tool, with its own tier and failure modes, built for one category. `meta.json` stays the source of truth for claims.
- A check costs one fixture. Each engine's spec fields that reach the learner as prose must appear verbatim in at least one claim `text` of that slug's `meta.json`. The fields are:
  - Home: `idea`, `limit`, `formula`
  - Resource: `principle`, `assumptions`, `details`
  - Study: `principle`, `boundary`
  - AlphabetSearch: whatever prose it renders, or an explicit exemption listing the claim ids that cover it.
- When a lib edit changes learner text, the fixture fails until the claim is updated. An updated claim text is then re-checked by the fact-checker under the usual rule.
- Known limit: CI (`.github/workflows/ci.yml`, protected) does not run `verify`, so this check runs locally only, like `test:deploy`. A meta-only edit (for example by the fact-checker) is caught at the next `verify`. Wiring `test:*` into CI would need an amendment. I am not requesting one now (see Objections).

### Ruling on `#0d0f14`: **accept as is. Do not switch it to `var(--bg)`**

This reverses the evaluation's draft-reply item 4.
- `#0d0f14` is the house "dark ink on a bright fill" value. It appears 63 times in our `src/`, including `globals.css` `.chip.on` and the primary button.
- It is deliberately theme-invariant. `--good-fill` is `#4fd1a5` in both themes, and dark ink on it is about 9.9:1.
- `var(--bg)` becomes `#f6f7fb` in light mode, which gives about 1.8:1 on that fill and would fail contrast.
- The right fix is a named token, for example `--on-fill: #0d0f14`, applied in all 63 places in one sweep. That is a tier-1 cleanup for design-engineer, not this PR's job.
- `#f59e0b` is likewise a fill colour, not text, and is not a blocker. The accessibility reviewer's per-engine K-check covers its contrast. It can move to `--warn-fill` in the same sweep.

## (c) `verify` adds `test:lifehacks`: **accept (tier 1)**

- The step is additive and follows the existing `test:deploy` pattern: `node --test`, no new dependency. The loader `tests/lifehacks/typescript-loader.mjs` uses the existing `typescript` devDependency through `node:module` `register`, which needs Node ≥ 20.6. `engines` says `>=20`, which is close enough for our toolchain. I did not ask for a bump.
- Nothing in `src/` imports the loader. It is test-only.
- It changes what every `verify` run does, so it costs every engineer time. Its wall time was not recorded: see required change 7. If it ever exceeds 10 s, scope it to changed lessons.

## Decision

**Approve with changes.** For the tier-2 part, approval is conditional on the shapes being dropped. The tier-1 part is accepted once the changes below are made. This review does not clear the other evaluation blockers (1 safety review, 2 contributor records, 4 portfolio, 5 recall, 6 re-integration).

### Exact changes required before merge (contributor, relayed by community-engineer)

1. Remove the `safety` key from all 60 `src/demos/lifehacks/lh-*/meta.json` that carry it. Do not move it into `evidence` or notes. If the contributor wants their classification kept as input, put it in `company/reviews/lifehacks-200/contributor/safety-scope.json`, alongside the relocated contributor records from blocker 2.
2. Delete `content/collections/lifehacks-200.json`. Repoint or remove the `README.md` link to it.
3. Delete the unused `alphabet-sort-search` entry from `homeLessons`, and update the count assertions in `tests/lifehacks/home.test.mjs` (70 → 69) to match.
4. Add a drift fixture, for example `tests/lifehacks/claims-match.test.mjs`. For every slug in the three spec sources, it asserts that the prose fields named in (b) appear verbatim in that slug's `meta.json` claim texts. It must pass on the PR head.
5. Leave `#0d0f14` in `AlphabetSearchLesson.tsx` as is. Do **not** change it to `var(--bg)`.
6. No code change for this one. Our safety review batches (lifehacks-safety-reviewer) must review the engine-hard-coded stage captions as well as the specs: `HomeLesson.tsx` `Stage`, `WobbleStage`, `BowStage` and `CordStage` captions. The community engineer should name those captions in the safety batch briefs.
7. At re-integration (community-engineer), add to `prs/2.md`:
   - the `npm run verify` summary on the integrated tree;
   - the wall time of `npm run test:lifehacks`;
   - the first-load JS for one Home lesson page and one Resource lesson page, from the `next build` route table.

   Each is a number pasted from output. No ceremony beyond that.
8. At merge, the merger adds a one-line entry to `company/ops/changelog.md` (tier-1 requirement): "Life Hacks shared stage engines (`src/components/lifehacks/`, `src/lib/lifehacks/`) and `test:lifehacks` in verify (PR #2)".

### Not required (follow-ups, owner named)
- design-engineer: introduce `--on-fill` (and use `--warn-fill`) and sweep the 63 `#0d0f14` uses. Tier 1.
- cm-lifehacks with demo-builder, after merge: move slug-keyed captions and per-slug branches into spec fields, and move `home-lessons.ts` data to JSON. Tier 0/1, no review.

### Objections that travel with this decision
- *"Generating claims from the lib would remove drift entirely."* Answer: true. But it means a meta writer that has to preserve verification state, for one category. The containment check catches the same drift at about 1% of the cost. Revisit if a second category adopts lib-held learner text.
- *"A check that only runs in `verify`, not CI, is weak."* Answer: accepted as a known limit; it matches `test:deploy`. Putting `test:*` into CI is an amendment to the protected `ci.yml`, which the evaluation steward owns. I would support it if drift is ever found after a merge. Not requested now, to avoid ceremony.
- *Evaluation draft reply item 4 (token for `#0d0f14`):* overruled for this PR, for the light-theme contrast reason above. Femi's note that a token is wanted is right. It becomes the design-engineer sweep.

## Kudos
- @community-engineer (Femi): the tier table and the engineering notes in `prs/2.md` named exactly the three questions that needed a ruling. That kept this review to the critical items.
