# ADR-010: Lesson and kit bundles are built with esbuild, exact pin 0.27.0, used only by the lesson-build tool

status: proposed (draft, 2026-10-16). It becomes accepted only when all three hold: the founder decides W-485 (decision 1 of [2026-10-14-lesson-bundler-and-memory.md](../../decisions/2026-10-14-lesson-bundler-and-memory.md)); principal-engineer passes it in the tier-2 engineering review of the [EDD-003 A2 pilot addendum](../edd/EDD-003-lesson-storage-at-scale.md#addendum-2026-10-16-a2-pilot-stage-1-first-step); and principal-engineer-ops approves the readiness record for the `package.json` change (tier 2 in `company/engineering/readiness/paths.json`)
date: 2026-10-16
deciders: founder (the new devDependency, W-485), principal-engineer (architecture, tier-2 review), platform-engineer (proposes; owner after approval, W-088)
source: [EDD-003](../edd/EDD-003-lesson-storage-at-scale.md) · [SPIKE-001](../spikes/SPIKE-001-frontend-sandbox.md) · [ADR-005](ADR-005-independent-lesson-bundles.md) · dependency record: [2026-10-16-dep-esbuild.md](../../decisions/2026-10-16-dep-esbuild.md) · batch: company/ops/dispatch-requests/2026-10-16-r2-engineering.md#B3 · board W-088 · project `[project:scale-stage-1]`

## Context
ADR-005 says each lesson builds alone into one ES module, with React and `@/kit/*` external. Something has to do that build. `tsc` cannot: it does not resolve local imports or CSS modules (SPIKE-001). The spike built 348 of 348 lessons with no new dependency by borrowing Next's vendored webpack and terser (`next/dist/compiled/*`). That is a private API. Any Next upgrade can break it, or silently change every bundle hash, and a bundle hash is a lesson version's address (ADR-004).

What the bundler has to do, measured on today's tree (965 lessons, 2026-10-16, survey script output in the addendum):
- TypeScript and TSX, with `react/jsx-runtime`.
- `@/` path aliases and local modules (70 lessons have a local `.ts`/`.tsx` besides `Demo.tsx`).
- CSS modules: 755 lessons have a `styles.module.css`, and 522 of them use `:global(...)` to style kit classes (`.control`, `.row`). None uses `composes` or `@import`. The kit itself has two CSS modules (`illustration.module.css`, `sequence.module.css`).
- Externals mapped to the kit and the geo kit: `react`, `react/jsx-runtime`, `@/kit/*`, and `d3-geo` (4 lessons import it at runtime; 6 more import only `geojson` or `d3-geo` types).
- Deterministic output: the same source gives the same bytes, so the same hash.
- A swap of `src/kit/progress.ts` for the frame-side bridge at build time, so that `src/kit/Lesson.tsx` (protected) stays byte-for-byte unchanged (SPIKE-001).

## Decision
1. **esbuild** builds the kit bundle, the geo kit bundle and every lesson bundle. It is used only by the lesson-build tool (`tools/lesson-build/`, tier 1), never by the app build, and never shipped to learners. Its output is plain ESM and plain CSS.
2. **Exact pin `0.27.0`, as a devDependency.** That is the version already in our lockfile: `vercel@63.1.2` (a devDependency) brings it in, hoisted at `node_modules/esbuild`, with its `@esbuild/linux-x64` binary. Pinning that version adds **0 packages** to the lockfile (checked, see the dependency record). A newer version (0.28.2, the latest) would add 108 lockfile entries and surface one low advisory on a nested copy. We must not import the copy that `vercel` brings without declaring it: an undeclared (phantom) dependency would move whenever the Vercel CLI moves.
3. **CSS modules use esbuild's built-in `local-css` loader** (the default for `.module.css`). Each lesson's CSS is emitted as one hashed `.css` file next to its JS bundle and travels with it: the lesson's frame document links it with SRI. The host page never links lesson CSS (addendum, "How lesson CSS travels").
4. **Settings that are part of the bundle's address:** the esbuild version, `format: "esm"`, `target`, `minify`, `jsx: "automatic"`, `charset: "utf8"`, `legalComments: "none"`, the externals map, and the `progress` swap. They live in one file in the tool, and their sha256 goes into every manifest entry. Changing any of them, or the esbuild version, changes every bundle hash, so it is scheduled like a kit major (decision record condition; the evaluation steward sets the re-QA sample, W-087).
5. **Conditions before any lesson is served from a bundle** (from the founder page, unchanged): every lesson outside Life Hacks builds through it with no import outside the contract; the 3 SPIKE-001 lessons, plus a sample from the pilot, are screenshot-compared with the spike's webpack builds; two clean builds give identical hashes.

## Consequences (good and bad)
- Good: a public, documented API, so a Next upgrade cannot move our bundle hashes.
- Good: one package and one platform binary, MIT, no runtime dependencies, no `postinstall` work beyond picking the binary. It is already on every machine that has run `npm ci` here.
- Good: built-in TSX, aliases, externals and CSS modules, so the build tool stays small (the spike needed two custom loaders and a vendored postcss-modules chain).
- Good: reversible. Bundles are plain ESM. If esbuild goes away, another bundler can produce the same contract; every bundle hash changes once, as for any bundler change.
- Bad: a native binary in the toolchain, so a supply-chain surface we did not choose for itself. The answer is the exact pin plus an audit and licence line at every upgrade.
- Bad: esbuild names local CSS classes differently from Next (`<file>_<local>` rather than Next's hashed names). Inside a frame that cannot collide with another lesson, but every lesson needs one screenshot comparison before it is served from a bundle (condition 5).
- Bad: `0.27.0` is from 2025-11-09. When `vercel` moves its own esbuild, we keep ours; a copy for `vercel` then appears nested, and that is fine. We upgrade on purpose, never by drift.
- Bad: esbuild minification is a little weaker than terser's (believed, not measured). The lesson budget is ≤ 15 KB gzip and the spike's p99 was 3.4 KB, so this has room.

## Alternatives rejected and why
| Option | Licence | Size and tree | Maintenance | Why not |
|---|---|---|---|---|
| A. Next's vendored webpack and terser (`next/dist/compiled/*`), as in the spike | MIT | 0 new packages | Private API, moves with every Next release (we just did a Next 16 upgrade) | Can break or re-hash every bundle on a Next upgrade with no warning |
| **B. esbuild 0.27.0, exact pin (chosen)** | **MIT** | **0 new lockfile entries** at this version (the package is already present through `vercel`); wrapper about 135 KB unpacked, binary about 10.8 MB | Single maintainer project, very active (0.28.2 on 2026-08-08), public API, stable since 0.18 for what we use | Chosen |
| C. webpack 5 as a public devDependency (5.112.0), with ts and CSS-module loaders | MIT | about 13.6 MB unpacked for webpack alone, 17 direct dependencies, plus `ts-loader` or `babel-loader`, `css-loader`, `mini-css-extract-plugin` and their trees | Large, mature | Much larger tree to audit; slower; the spike proved it works, but nothing in it needs webpack |
| D. Rollup 4 (4.64.7) plus plugins | MIT | Rollup itself is small (1 dependency), but TypeScript, node-resolve and CSS modules need 3 to 5 plugins, and a CSS-modules plugin pulls in postcss and its tree | Mature | More moving parts than B for the same output |
| E. Rolldown 1.x, Vite, SWC, Parcel, Bun | MIT (all) | varies | Rolldown is new (1.2.x); SWC has no stable bundler; Vite and Parcel are app bundlers, larger than we need; Bun is a runtime change | None is smaller or better known than B for a library-style ESM build |
| F. Defer stage 1 and keep one app build | n/a | 0 | n/a | Founder page, option D: rejected there because the build passes its trigger near 1,250 lessons |

## What would make this wrong
- The screenshot comparison (condition 5) shows that `local-css` changes how lessons look in a way that is not a class-name artefact. Then the fallback is option D (Rollup with a postcss-modules plugin that reproduces Next's naming), through a new dependency record.
- Two clean builds with the same settings give different hashes.
- An `npm audit` high or critical advisory on the pinned version, with no fixed version that keeps our output.
