# Decision: the lesson frames staleness gate blocks flag-on builds only, and blocks them at the build (O1, W-2104)

owner: principal-engineer (Kenji) · date: 2026-10-26 · class: engineering (tier 2: `next.config.mjs` `build`, the gate suite) · status: decided; code on `feat/lesson-frames-pilot` at `3ef3619ca`
review: [2026-10-26 code review](../engineering/reviews/2026-10-26-lesson-frames-code-review.md) (R12 to R14) · spec it changes: [2026-10-25 production review](../engineering/reviews/2026-10-25-content-hub-production-review.md), "Publication keeps the editorial gates"

## The question

The 2026-10-25 review put four manifest checks in `tests/lesson-frames`, inside `npm run verify`, which `tools/deploy.mjs` runs before every deploy. One of them, "the slug's current `sourceHash` differs from the built one", fails whenever a pilot lesson's compiled sources or its `meta.json` change after the manifest was built. Its sibling, "stale kit", fails whenever any of the kit's 10 sources changes, `src/app/globals.css` included. platform-engineer objected (O1): that fails **every** deploy, flag off included. 42 of the 50 pilot lessons changed in the week to 2026-10-25 (re-measured: 42 folders with commits since 2026-10-18, all with code or CSS changes), and `globals.css` had 18 commits in 15 days.

## Decided

1. **The freshness rules (`stale`, `stale-kit`, `published`, `fallback`) block only builds with the flag on.** With `NEXT_PUBLIC_LESSON_FRAMES` unset (or anything but `pilot-50`), `tests/lesson-frames` reports them as a test diagnostic and passes. With the flag off, no client chunk holds the manifest, its projections or `DemoFrame` (P4, re-measured in the review, R3), so a stale entry serves nothing to anyone.
2. **They block at the build itself.** `next.config.mjs` calls `flagOnBuildRefusal()` from `tools/lib/lesson-frames.mjs`. With the flag on, any manifest problem (freshness or structural) throws, and `next build` fails before it compiles anything. The build is the only step that knows the flag value the deployed app gets. A `--prebuilt` deploy builds with the pulled Vercel environment, not the shell `verify` ran in. A `[deploy]` commit builds on Vercel with `vercel.json`'s `buildCommand`, which runs no `verify` at all (review R13). So the scoped gate is stronger than the original on the path that matters: the original could pass a flag-on deploy built on Vercel.
3. **The structural rules block always**, in `verify`: schema, allow-listed origin, 64-hex hashes, pilot-list membership, kit names, and the two client projections matching the record. They change only when someone regenerates the manifest, so they cost a flag-off deploy nothing.
4. **No runbook step is added for flag-off deploys.** Nobody needs to run `prune` before a deploy that serves no frame. Before a **flag-on** build (preview or production), the fix for a refusal is `node tools/lesson-frames.mjs prune` (the lesson renders in-app) or a rebuild plus an artifact deploy, then a commit. release-manager adds that line to the flag-on steps (board item in the review).
5. Only the exact value `pilot-50` turns frames on, in `DemoHost`, `next.config.mjs` and the gate alike (tested: unset, `""`, `off`, `1`, `true`, `PILOT-50` and `pilot-50 ` are all off).

Tests (on the branch, 28 pass, 1 skip): a mutated manifest (stale lesson, stale kit, bad hash) blocks on all three with the flag on, and only on the hash with it off. A real edit to a pilot `Demo.tsx` and to `globals.css` gave: flag-off suite green with a 2-problem diagnostic; flag-on suite red; `next.config.mjs` refused to load with the flag on and loaded with it off. A flag-off `npm run build` after the change: exit 0, 144 s, and still 0 frame markers in `.next/static`.

## Options considered

- **Keep the gate in verify and add `prune` to the deploy runbook** (O1's first option). Rejected. It makes every deploy, flag off included, depend on a step about a feature that is off, and every prune is a commit that drops pilot lessons for no learner benefit. It also leaves the hole in decision 2: `verify` does not see the deployed build's flag.
- **Run `prune` automatically in the build.** Rejected. A build that edits committed files hides drift instead of reporting it, and a flag-on build would silently serve fewer frames than the preview tested.
- **Drop the freshness rules.** Rejected. With the flag on they are what keeps a learner from being served frame code for a source tree that no longer exists, for example a lesson whose wrong sentence was fixed in-app.

## Objections that travel with this decision

- **O1 (platform-engineer, 2026-10-26, W-2104):** "the review's staleness gate fails every deploy, flag off included … Builders should not meet this plumbing." Answer: **accepted.** The failure is scoped to flag-on builds, and moved to the step that knows the flag (decisions 1 and 2). Builders of the 50 pilot lessons meet it only if they turn frames on.
- **Against this decision (mine, recorded so it is not lost):** with the flag on, the kit's `sourceHash` covers `src/app/globals.css`. Every `globals.css` commit will then refuse flag-on builds until the kit is rebuilt and the artifact origin redeployed, which needs the founder's approval. At 18 commits in 15 days, that is a real cost for production flag-on. This decision does not solve it. It is an open item for platform-engineer before production flag-on: either the frame CSS stops depending on the whole of `globals.css`, or the kit's staleness is judged on the built CSS bytes, not on source files. Until then, the cost is the price of serving only tested bytes.
- **AMD-018 part (d) (evaluation-steward's draft, not ratified)** makes `tests/lesson-frames/**` protected and adds a hash-bound QA-record check to it. This decision changes that suite's first version before it is protected. The steward's companion diff should build on `3ef3619ca`, and say whether its new QA-record rule is a freshness rule (flag-on only) or structural. My recommendation: freshness, since a missing frame QA record matters only when frames are served.

## Revisit if

A flag-on build is wanted without the manifest check, the deploy path changes so `verify` runs in the build's environment, or AMD-018 is ratified with a different scope.
