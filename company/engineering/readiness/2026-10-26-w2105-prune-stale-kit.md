# Operational readiness: lesson frames prune handles a stale kit (W-2105)

```
change: tools/lesson-frames.mjs prune drops every entry of a stale kit (geo kit: the entries that use it); stale-kit fires only while an entry uses the kit; one comment line in DemoFrame
change-tier: 1
paths: tools/lesson-frames.mjs, tools/lib/lesson-frames.mjs, tests/lesson-frames/manifest.test.mjs, src/components/DemoFrame.tsx
author: platform-engineer
self-check: platform-engineer
board: W-2105
risks: R-034 (mitigating; W-2106 and W-2110 remain)
links: company/engineering/reviews/2026-10-26-lesson-frames-code-review.md (M2, R5), company/decisions/2026-10-26-lesson-frames-gate-scope.md, company/engineering/readiness/2026-10-26-lesson-frames-pilot.md (M-b)
```

Tier 1: none of the four paths matches a rule in `paths.json`; the DemoFrame change is a comment. It rides inside the tier-2 pilot, whose record (M-b) names W-2105 as a pre-merge condition.

1. **What can fail.** (a) prune drops more than it should: a stale main kit now drops all 50 entries, which is the intent (each names that kit), and a stale geo kit drops only the entries with a `geoKit`. (b) The relaxed rule hides a stale kit that is still served: it fires whenever any entry remains, so a kit can only be "unchecked" when nothing names it. Worst case: a flag-on build serves no frames after a prune, so every pilot lesson renders in-app. Only us and the flag-on preview see it; flag off nothing changes (O1).
2. **How we would know.** `node tools/lesson-frames.mjs check` and the flag-on build refusal (`next.config.mjs`) still list every problem; prune prints each dropped slug and its rule, and the count left framed.
3. **How to roll back.** Revert the W-2105 commit on the branch; nothing is deployed and no data moves.
4. **Tested.** `npm run test:lesson-frames`: 31 pass, 1 skip (three new prune tests, using a manifest re-hashed from today's tree so they do not depend on drift). Both mutants (no drop on stale kit; stale-kit firing with no entries) fail the new stale-kit test. Real edit: a comment appended to `src/app/globals.css`; `check` and a flag-on build refuse with `stale-kit`; `prune` dropped 50; `check` ok (0 framed); flag-on `npm run build` exit 0, 159 s; then reverted. Flag-off build exit 0, 156 s, 0 `s3c-lesson-frame-v1` matches in `.next/static`. Typecheck exit 0.
5. **Why drop, not rebuild.** A dropped lesson renders in-app at once; a rebuild needs an artifact deploy (release-manager, founder's approval) before its frames serve. The decision record rejects an automatic prune in the build; this is still a manual step whose output is committed. To frame again: `node tools/lesson-frames.mjs build`.
6. **Dependencies.** None added.
7. **Open.** W-2106 (the kit hash covers all of `globals.css`, so nearly every CSS commit stales the kit) and W-2110 (the flag-on runbook line) are unchanged by this.
