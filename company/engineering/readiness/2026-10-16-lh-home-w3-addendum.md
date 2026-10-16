# Operational readiness: lh-home-w3-addendum

change: Home wave W3 (cords, socks, travel): 11 lessons moved to engine 2 with the r11 fix plan's prediction lines; Home v2 accepts two predict options; new W3 pictures (w3Picture) and a reworded cord stage in HomeLesson.tsx
change-tier: 2
paths: src/lib/lifehacks/engine-v2.ts, src/lib/lifehacks/home-lessons.ts, src/components/lifehacks/HomeLesson.tsx, src/demos/lifehacks/{long-cord-knots-itself,group-cables-with-ends,elastic-loop-release,sock-pairing-by-pattern,sock-pairs-not-all-combinations,fitted-sheet-corners-nest,shoes-opposite-ends,tote-balance-sides,jacket-last-first,suitcase-layer-access,socks-use-shoe-space}/meta.json, tests/lifehacks/engines-v2.test.mjs (W3 ratchet line only)
author: demo-builder
board: W-1070, W-1066 (template items the plan names for W3); no new item placed by me
risks: none proposed (see 7)
links: addendum to company/engineering/readiness/2026-10-15-lh-home-template-tp1-tp2.md and company/engineering/readiness/2026-10-15-lh-home-w2-addendum.md; branch lhw3, commits 22a248d, 8a9df55 and the commit that adds this file (review the branch tip: 8a9df55 alone has most W3 meta.json files reverted by an index mistake, fixed in the next commit)

Tier 2 because the Home engine renders 69 lessons (paths.json: src/lib/lifehacks/** is shared-engine). **The author does not approve it; principal-engineer-ops does.** Approval, if given, covers code and tests, not publishing: every W3 claim is unverified.

## What changed in shared code

| Change | Who else it touches | Why |
|---|---|---|
| `HomeV2Fields.options` is `[string, string] \| [string, string, string]`; `homeV2Problems` accepts 2 or 3 | Every v2 Home spec is checked by it (test "v2 specs have the section 8 required fields") | Five W3 lines in the plan have two options (sock-pairing-by-pattern, fitted-sheet-corners-nest, shoes-opposite-ends, tote-balance-sides, socks-use-shoe-space). The kit (`Lesson.tsx`) already takes any number of options. The design spec (company/design/specs/lifehacks-engines-v2.md section 8) still says three: **interaction-designer should confirm or object**. |
| `w3Picture` (HomeLesson.tsx), called after `w2Picture` in `v2Marks` | Only specs whose `model` is one of loop-release, pair-search, combinations, nest, pairpack, balance, reverse-order, access, hollow. Each of those models has exactly one lesson, all in W3 | New drawings the r11 records asked for. Returns null for every other model, so no other lesson's picture changes. |
| Cord stage (`CordStage`) text and a cord branch in `useHomeLesson` for `engine: 2` | Only long-cord-knots-itself uses model `cord` | TP-2(d): no seed, "p=", "model draws" on screen; the reveal compares both lengths with the study's 55%. The v1 cord reveal branch is now unreachable and was left in place. |
| `home-models.ts` | **Not changed.** All W3 numbers come from existing cases with changed spec values | |

## The check

1. **What can fail.**
   (a) A two-option spec reaching a code path that assumes three. Searched: `useHomeLesson` passes `spec.options` straight to the kit; nothing indexes `options[2]`. The QA contract commits the last option, so a two-option lesson exercises it (5 lessons, both viewports, passed).
   (b) tote-balance-sides is the first v2 Home lesson with a **negative** cell (balance point −10 cm). It does **not** use `plainNumbers`, so the unreached "−0" edge (PE-ops condition 2, W-1066) is still unreached: it uses R5 `sig3`, and the as-packed result is never near zero (the left side is always at least the right side; at 1 kg each both are exactly 0, printed "0 cm").
   (c) `{ratio}` is used by no W3 lesson. `{diff}` is used once (fitted-sheet-corners-nest, 32 − 14 = 18 cm, positive). Condition 1 (signed ratio) is not reached.
   (d) Hidden sliders: elastic-loop-release and fitted-sheet-corners-nest hide theirs. For both `homeSliderMatters` is false, i.e. no Seen-table cell changes anywhere in the range (the W2 revoke trigger was a hidden slider where a cell changes).
   (e) Worst case: a wrong or malformed number at a slider value nobody tried. Swept below. Learners would see it; no data is touched.
2. **How we would know.**
   - `npm run test:lifehacks`: **120/120** with the W3 ratchet line (the two inventory ratchets fail without it, as designed).
   - Every-step sweep (scratch script, not committed: tests are not mine to add): all 10 W3 v2-stage lessons at every slider step, both columns and the reveal: **78 states, 0** with a raw `{token}`, NaN, Infinity, undefined or "−0".
   - Mutation: putting `homeV2Problems` back to "exactly three options" fails "v2 specs have the section 8 required fields" (1 failure), so the existing test bites on the engine change.
   - QA contract, production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, server started and stopped by QA), harness stamp `clean: true`, contract commit 3b97991: **26/26** (the 11 W3 lessons plus packing-cube-walls (v1 slate) and towel-spread-dries-first (W2 v2) as controls, phone and desktop).
   - The feed spec (`tests/qa/feed.spec.ts`) fails "subject chips filter the feed" when run with QA_ONLY: the filter shrinks `lessons()` to 13 while the feed shows every Hacks lesson. That is a property of QA_ONLY, not of W3; the contract run above excludes it.
   - `npm run check`: passed (960 lessons, 5223 claims, 2 warnings on unrelated lessons). `npx tsc --noEmit`: exit 0.
3. **How to roll back.** Revert the W3 commits on lhw3 (or the merge, once merged). Revert the W3 line in `tests/lifehacks/engines-v2.test.mjs` with them, or the inventory ratchets fail. Minutes, no data loss. After a deploy: a new founder-approved deploy, or a Vercel rollback (runbook-deploy.md).
4. **Capacity.** Client rendering only. The largest W3 drawing is 45 lines (10 unmarked socks). `homeSliderMatters` runs over at most 22 steps for W3 specs. Build unchanged in shape; one local build dir (.next-lhw3).
5. **Security.** No new routes, parameters, scripts, dependencies or secrets.
6. **Data.** Writes nothing. No learner data.
7. **Risks.** No register change proposed. (b)-(d) are bounded by today's specs; the sweep is a scratch script, so if PE-ops wants it as a standing test like the W2 ratchet in home-v2.test.mjs, that is an evaluation-steward edit.

## Not in this change

- **laundry-sort-before-walk** (in the plan's W3 table) is not moved. Its line needs the route at 8 m, and `tests/lifehacks/home.test.mjs` pins the old 4 m value (8 items → 64 m). Routed to evaluation-steward (company/reviews/laundry-sort-before-walk/build.md).
- Claims: all W3 claims were reset to unverified. This record makes no claim about their truth.

## Approval (written by principal-engineer-ops)

- Decision: **approved with conditions** by principal-engineer-ops (copied by chief-of-staff at merge, 2026-10-16). Authority and conditions 1-5: `company/engineering/readiness/2026-10-16-lh-home-w3-addendum-approval.md` (e8b050a). W4 is not cleared until condition 1.
