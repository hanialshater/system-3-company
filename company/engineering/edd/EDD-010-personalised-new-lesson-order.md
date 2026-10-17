# EDD-010: Personalised new-lesson order on the device, always on, behind a company build flag that is off by default (M1 website part)

author: personalization-engineer (Tavi), run pe-s1-1017 · reviewers: principal-engineer (tier 2) + platform-engineer (Feed.tsx) · also reads: privacy-reviewer (design read under the always-on re-ruling W-1586), head-of-product (default order, intro copy), fact-checker / RC (reason copy, W-1579), learning-scientist-personalization (reason truth, §6.3), release-manager (withdrawal path, §8) · tier: 2 (feed contract, learner data read on the device, learner-facing copy) · status: **proposed, draft 1 (2026-10-17)**. Design only: no product code exists for it.
board: W-1592 (this) · brief: company/ops/mailboxes/dispatcher/20261017T192533387Z-vp-personalization-88559214.md · plan: company/personalization/batches/2026-10-17-batch-5.md §11.2 (it replaces §6's opt-in S1) and §12 (G7, G9, G10, G11)
inputs read: `company/personalization/policies/reachable-v2.ts` (sha256 `2666271f…6714`, checked with `sha256sum` on this tree), `reachable-v2-build-note.md`, `default-order-rule.md`; D2's index at `4a559d6` on perso-m1-d2 (`src/lib/learner/dims-index.generated.ts`, `company/personalization/dims/2026-10-17-dims-index-coverage.md`; perso-m1-d2's head 648b1ac only adds a memory file); `src/components/Feed.tsx`, `src/components/DemoHost.tsx`, `src/components/DemoCard.tsx` (first 60 lines), `src/lib/feed-index.ts`, `src/lib/feed-types.ts`, `src/kit/progress.ts`, `src/kit/Lesson.tsx` lines 55-75; `tests/qa/feed.spec.ts` lines 1-12; `company/product/surface-value.md` lines 15-35; `tests/platform/built-output.test.mjs` lines 60-110; privacy rulings `company/reviews/_privacy/2026-10-16-personalization-model-inputs.md` §3 (N1-N6) and `2026-10-16-personalization-batch-reads.md` §1 (T2); `company/ops/runbook-deploy.md` (Rollback); board rows W-1577, W-1579, W-1581, W-1585, W-1586, W-1587.
measurements: `company/engineering/edd/EDD-010-probe.mts` (usage in its header). Every number in §3 comes from one run of it on 2026-10-17, Node 22.22.0.

---

## 1. Problem and why now

The founder decided on 2026-10-17 that the personalised order is always on, with no learner switch (batch 5 §11.2). M1's website part needs a design before anyone builds it. The design has to say: where `rank` runs, what it reads, how its order enters a paginated, server-ordered feed without moving cards the learner can see, how every moved card gets a true reason line, and how the company turns it off. The candidate is frozen (`reachable-v2`), and D2's index exists. What is missing is the glue between them and the feed. Nothing ships until the gates in §10 clear. This EDD lets the reviews start on paper.

## 2. Goals / non-goals

Goals (batch 5 §11.2 items 1-7, numbered as in the brief):
- G-1. **No learner control.** No "Personalise my feed" UI, no read of `personalization_on` or any settings field. Nothing on the serving path depends on the settings API.
- G-2. **On the device only.** New-lesson order = `rank` from `reachable-v2.ts`, shipped byte-identical (hash test), over pilot-only dims built from D2's index and the local progress record (`s3c:progress:v1`). Recomputed on the device after completions. Revisits and their interleave in Feed.tsx stay exactly as they are. Signed-in learners get the same local computation, and nothing is computed on the server.
- G-3. **Nothing derived is stored.** Zero writes and zero fetches beyond today's (N1, D20).
- G-4. **True reason lines.** Every card moved out of its default position shows one line of approved reason copy, chosen by reason code. Unmoved cards show none. A moved card with no line fails a test.
- G-5. **Pilot only.** Only probability and cs entries (230 lessons) reach `rank`. Every non-pilot lesson keeps its default position. Pilot lessons are re-ordered only among the positions the default order gives pilot lessons.
- G-6. **Company build flag, off in the repository.** When it is off, the feed serves the default order exactly and no candidate code runs.
- G-7. **Cold start reported** (§3.1; it is not the default order).
- G-8. **First render is the server's default order**, and a reorder never moves a card that has been seen or is on screen.

Non-goals: any learner control, holdout or arm marker (O2 is the founder's call, §11.4); any server computation, stored value, log or new beacon field; any change to `reachable-v2.ts`, `src/kit/Lesson.tsx`, `tests/qa/**` or `company/product/surface-value.md` (protected or frozen); personalising subject-filtered feeds (§5.6, Q-H2); non-pilot domains; HQ (H1 is separate).

## 3. Current state (with measurements)

### 3.1 Cold start: `rank` on an empty history is **not** the default order (G11 applies)

`rank({ now, history: [], dims: pilotDims, slots })` returns 230 lessons. **229 of the 230 are at a different position from the default order.** Only one (`armour-where-no-holes`) keeps its place. There are exactly 4 distinct values. With no history, `q`, `refresh` and `newGain` are the same for every lesson, so the only term that varies is the prerequisite factor `1 − 0.15·(1 − ∏ pKnown)`, with every pilot prerequisite concept at the prior mean, and a prerequisite outside the pilot counted as known (build note choice 6). The cold-start order is therefore **lessons with fewer in-pilot prerequisite concepts first (0, then 1, 2, 3), with ties broken by the default order.** First six by rank: armour-where-no-holes, back-button-stack, bad-hash-one-bucket, base-rates, binary-numbers, binary-search. First six in the default order: a-birthday-like-mine, a-star-heads-for-goal, armour-where-no-holes, alias-wave-wagon-wheel, at-least-one-boy, any-start-same-tree.

What this means:
- It is **the same order for every new device**. It uses no learner data, so it is not personal. It is still not the default order, so batch 5 G11 applies: MR is not ready until evaluation-steward resolves the conflict with the protected QA test "cold start does not pretend to personalise" inside W-1585, and every moved cold-start card carries its true reason line. This EDD edits nothing under `tests/qa/`.
- **The QA assertion itself would still pass mechanically.** It checks that the intro card contains "not “for you”" (`tests/qa/feed.spec.ts` line 9), and this design does not touch the intro copy. The conflict is about truth, not about the test failing: (a) the same intro says "It alternates subjects". Refilling the pilot slots changes the subject at 94 of the 230 pilot positions in the cold-start feed. In the first 60 cards, same-subject neighbours go from 0 to 2, and over the whole feed from 47 to 80. (b) The intro is shown on every visit (Feed.tsx always puts it first), so for a returning learner with history, "this feed is not 'for you'" becomes false with the flag on. (c) `surface-value.md` line 23 (protected) says the order "is not personalised and it says so". Owners: W-1585 (evaluation-steward drafts, founder ratifies) for (c) and the QA test, and head-of-product with RC for the intro sentences (Q-H1). S1 changes no copy.

### 3.2 `rank`'s own reason codes do not explain a move

`rank` explains each card against **the next card in its ranked list** (`versus`), not against the card's default position. At cold start, 225 of the 229 moved cards carry code `default-order` ("tied with the next one, the default order broke the tie"), 3 carry `prerequisites`, and 1 carries `last`. With small histories the result is the same: 215 of 225 moved cards (5 completions), 189 of 209 (20 completions, all predictions wrong) and 182 of 208 (20 completions three days ago, one recall each) carry `default-order`. A `default-order` line on a card that the candidate moved away from its default place would be false. **So G-4 cannot be met by printing `rank`'s own code.** §6.3 proposes a rule that derives the moving reason from `rank`'s output without editing it. Under that rule, every moved card in all four probes has a `prerequisites`, `domain-estimate` or `concept-known` reason, and none falls back to `default-order`, `last` or nothing. That the copy for those codes is *true* of each card is not shown here. It is Q-R1.

### 3.3 The feed today

- Server-ordered and paginated. `feedOrder(filter)` (`src/lib/feed-index.ts`) is the round-robin, published first. The first page (30 cards) comes in the HTML, and later pages come from `/api/feed/<filter>/<page>` (static JSON) as the learner nears the end. In the "all" feed, pilot lessons sit at positions 0, 1, 13, 14, 26, 27, … (6 pilot slots on page 0). The 230 pilot slots run across 946 positions.
- Completed lessons are **not** removed from the new-lesson list today. They show again at their default place, and they also come back as revisits when due.
- Revisits are inserted in `items` (Feed.tsx `useMemo`) at `i % 3 === 1`, only at item positions at or after `revisitFrom` (= active + 2 when they arrive).
- Only the active card and its neighbours mount a demo (`active={Math.abs(active - i) <= 1}`). Lesson code loads per slug through `DemoHost`'s `next/dynamic` loaders.
- The progress record is written by the kit at reveal (`Lesson.tsx` line 73: `completedAt` kept from the first time, `predictedCorrectly`) and by the revisit card (Feed.tsx line 259: `recalls`).

### 3.4 Size and speed

- Pilot-only dims as `rank` needs them: 54,173 bytes as JSON (230 entries). Pilot card data (the `FeedItem` fields: slug, title, hook, domain, status, durationSec, claim counts): about 56.6 KB as JSON. Together that is about 111 KB raw, under the 300 KB per-chunk cap (`tests/platform/built-output.test.mjs` line 85). The full D2 index is 240 KB raw (41 KB gzip).
- `rank` over the 230 pilot dims: 3.6 to 5.0 ms per call on this machine for histories of 0 to 20 lessons, and 10.7 ms for 150 completions with recalls (scratch run). A low-end phone may be 5 to 10 times slower (an estimate, not measured). §7 sets the budget.

### 3.5 D2 open points, checked

- **Cross-domain successors (19 pilot entries).** They are filtered to `probability:` and `cs:` when the pilot dims are built (§5.2). `rank` does not read `successors` at all. The filter is kept so the shipped dims equal what criterion 3b scored (D2 test 5b).
- **misconceptionStrength.** vp-personalization decided to drop it (and `strengthSource`) from the shipped pilot dims, so every lesson reads "absent" (P14 `pullByRating.absent` = 0.567). **The gap, stated plainly:** the world criterion 3b scored gave a rating on every lesson (the simulator's hash placeholder), while the shipped world gives none. Predictions therefore update the domain estimate with one pull value for every lesson, not with that lesson's own rating. Whether that changes 3b's reading is G's question, through criterion 3b's rating probe. S1 does not answer it.
- **euclid-gcd.** In D2's index, concept ids carry their domain: `cs:euclid-gcd` (euclid-leftover-rectangle, pilot) and `math:euclid-gcd` (euclid-square-cutting, not pilot) are two different ids. Across all 946 entries, the concept's prefix equals the entry's domain (0 exceptions), and no pilot concept id appears under two domains. So `estimate()`'s first-domain-by-key-order rule (build note O1) cannot fire on this index. Pilot-only dims are still enforced and tested (T7), because a future index without prefixes would bring it back.
- **File size.** A pilot-only generated module is proposed (§5.2), about a quarter of the full index.

## 4. Options considered

| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| **0. Do nothing** (default order for everyone) | none | M1's website part does not ship; HQ part (H1) unaffected | n/a |
| **A. Client view transform in Feed, pilot dims + pilot card data bundled, static import gated by a build constant** (proposed) | One generated module (~111 KB raw), one glue module, a small Feed.tsx change at one place in the `items` memo | Reason truth (Q-R1); N2 reading of per-lesson requests (Q-P2) | Flag-off build or Vercel rollback; nothing on devices to clean up |
| B. Re-rank only the pilot cards already loaded (no bundled card data) | Smaller: dims only | The order is no longer `rank`'s. It would choose among ~6 loaded pilot cards per page, not among all eligible lessons, which is a different policy from the one 3b scored (a new candidate under G6). | Same as A |
| C. Fetch the ranked lessons' cards on demand (`/api/meta/<slug>` or a new route) | No bundled card data | **Breaks N1/N2**: a request keyed by `rank`'s output tells the server the derived order | Same as A |
| D. Server computes the order for signed-in learners | Server code | Out of bounds by the brief and G-2 | n/a |
| E. Dynamic `import()` of the candidate chunk when the flag is on | Keeps the Feed chunk small | One extra static fetch per visit with the flag on. The asset is the same for everyone, but it is still a fetch beyond today's (G-3 reads it literally) | Same as A |

A is the only option that keeps `rank`'s semantics and adds no fetch. E is the fallback if A's Feed chunk breaks the 300 KB cap; it needs privacy-reviewer to say that a learner-independent static chunk is not a fetch "beyond today's" (Q-P3).

## 5. Proposal

### 5.1 Files (all new except Feed.tsx; owners for the build in §10)

| Path | What | Tier / review |
|---|---|---|
| `company/personalization/policies/reachable-v2.ts` | The candidate, **imported in place** (no copy, so nothing can drift). If the Next/TS config cannot import from `company/`, a byte copy at `src/lib/learner/reachable-v2.ts` with the hash test T5 instead. Never edited. | frozen |
| `src/lib/learner/pilot-dims.generated.ts` | Generated from D2's index by a new mode of D2's generator (`build-index.mjs --pilot`, lesson-dims-owner): pilot entries only, the fields `slug, domain, concept, level, prerequisites, successors, status`, successors filtered to pilot domains, **no** `misconceptionStrength`, `strengthSource`, `rating` or `pilot`. Also holds `PILOT_CARDS: Record<slug, FeedItem>` built by the same code path as `toFeedItem` (`src/lib/feed-index.ts`), so a card is identical to its `/api/feed` copy. Not personal. | tier 2 (path rule of D2's note §4) |
| `src/lib/learner/new-lesson-order.ts` | The flag constant and the pure glue (`orderView`, §5.4). No React, no storage, no network: it takes the default list, the progress map, `now` and the pin state, and returns the display list with a reason code per moved card. | tier 2 |
| `src/lib/learner/reason-copy.ts` | RC's approved lines, one per code, as data (W-1579). Empty until RC approves. **The flag cannot be on while it is empty** (T6 fails). | tier 2, claims via fact-checker |
| `src/components/Feed.tsx` | One change: inside the `items` memo, `list.items` is replaced by `orderView(...)` **only for filter "all" and only when the flag is on**. The revisit interleave lines are unchanged byte for byte. `DemoCard` receives an optional `reason` prop and renders one line when it is given. | platform-engineer review |
| `src/components/DemoCard.tsx` | The optional `reason` line (no layout change when it is absent). | platform-engineer review |
| tests (§6) | `tests/personalization/new-lesson-order*.test.mjs`, and built-output additions in `tests/platform/` (platform-engineer). Nothing under `tests/qa/`. | — |

### 5.2 Pilot-only dims (G-5)

The shipped dims map has exactly the 230 entries whose domain is `probability` or `cs`, as listed by `visibleDemos()` with the production environment (published + review). **The visible set is fixed before ordering: drafts are excluded first, as `src/lib/feed-index.ts` / `visibleDemos()` does, and only then does `rank` derive its default order** (F5b review R6, company/personalization/evidence/2026-10-17-reachable-v2-diff-review.md, relayed by vp-personalization: adding the one pilot draft, `probability/small-gap-big-extremes`, changes the order of the 230 visible lessons, because the rule's round-robin runs over every entry it is given). A draft never enters `PILOT_DIMS`, not even as a `status: "draft"` entry. T7 asserts this. Non-pilot entries never enter the module, so `rank` cannot see them. A prerequisite outside the pilot is then counted as known (build note choice 6), the same as in the simulator's pilot catalogue that 3b scored (D2 test 5b). The generator fails if any entry's concept prefix differs from its domain, or if a concept id appears under two domains (this is the euclid-gcd guard).

### 5.3 The flag (G-6)

- Name: **`NEXT_PUBLIC_NEW_LESSON_ORDER`**. It is **on only when its value is exactly `reachable-v2`**. Unset, empty or any other value means off. Naming the candidate in the value means that turning the flag on cannot silently ship a different candidate: a v3 needs a new value, a new EDD addendum and a new release.
- Read once, at build. `src/lib/learner/new-lesson-order.ts` exports `export const NEW_LESSON_ORDER_ON = process.env.NEXT_PUBLIC_NEW_LESSON_ORDER === "reachable-v2";`. Next inlines `NEXT_PUBLIC_*` at build, so the browser has a literal `false` or `true`. Nothing reads the flag at run time, and no learner can change it.
- **The repository default is off.** No `.env*` file in the repository sets it. `vercel.json` and `next.config` do not set it.
- **When it is off:** Feed.tsx renders `list.items` exactly as today. `orderView` is not called, and `pilot-dims.generated.ts` and `reachable-v2.ts` are not evaluated. The call sites are `if (NEW_LESSON_ORDER_ON) …` with static imports of side-effect-free modules, which the production build removes as dead code. T1 checks both behaviour and built output.
- **Who can turn it on: only a release the founder approves.** A Vercel dashboard variable could turn it on without a commit, so the deploy path should set the value explicitly from the approved release, the way `tools/deploy.mjs` already pins `SHOW_REVIEW` in the pulled environment (runbook-deploy.md). That is release-manager's and platform-engineer's change (Q-O1), not S1's. Until it lands, the readiness check is: the build log line `new-lesson-order: on|off` (printed by next.config) is read in the release record.

### 5.4 The view transform (G-2, G-5, G-8)

Inputs on each recompute: `D` = `lists.all.items` as fetched (the server's default order, never mutated, so `chooseFilter`'s seed from "all" and every page merge keep working as today); `progress` = `loadProgress()` (today's storage read; no new key); `now` = `Date.now()`; and the pin state (below).

1. **History.** For each `[slug, p]` in `progress` with `p.completedAt` set: `{ slug, completedAt: p.completedAt, predictedCorrectly: p.predictedCorrectly, recalls: p.recalls.map(r => ({ at: r.at, correct: r.correct })) }`. The object is built field by field and never spread, so no other field can reach `rank` (N3). Non-pilot slugs may stay in, because `rank` ignores slugs not in dims.
2. **Rank.** `R = rank({ now, history, dims: PILOT_DIMS, slots: 1 })`, called once per recompute on the full pilot dims. Dims are never trimmed to "what is left": trimming would change the default order and the prerequisite estimates inside `rank` (default-order-rule.md step 5: derive first, then remove).
3. **Slots.** A position `i` of `D` is a *pilot slot* if `D[i]` is a pilot lesson. Non-pilot positions always show `D[i]`.
4. **Pins.** `h` = the pin horizon in `D` positions: everything before `h` keeps exactly the card it last showed. `h` never decreases. It is raised to cover the highest item index the learner has been active on, plus one (the mounted neighbour), plus every item index at or before the last revisit insert point. In Feed terms, `h` maps from `max(maxActiveSeen + 1, …)` items back to `D` positions, skipping the intro and revisit items. At first render `h` covers the intro and the first lesson card (index 0 to 1), so the first lesson the learner sees is always the server's.
5. **Fill.** Walk the pilot slots at or after `h` in order. A slot whose default lesson `D[i]` was completed before this page load (in `progress` at mount) **and** is not already shown before `h` keeps `D[i]` (unmoved, as today's feed shows completed lessons in place). Every other pilot slot takes the next slug of `R` that is not already shown (before `h` or earlier in this walk). Its card comes from `PILOT_CARDS`, so the lesson does not need to be on a loaded page. If `R` runs out (it should not; T8 asserts it), the remaining slots show the undisplayed pilot lessons in default order.
6. **Moved.** A card is *moved* if the slug shown at position `i` differs from `D[i]`. Only moved cards get a reason (§6.3).
7. **Never twice.** When a later page of `D` loads, its pilot positions are pilot slots, and their default lessons are either already shown or still in `R`. No slug can appear twice (T8).

**When it recomputes:** after hydration (a `useEffect`, so the server HTML and the first client render match: the server's default order, G-8), and whenever `active` changes. The completion write happens at reveal on the active card, and the learner's next swipe changes `active`, so every completion is reflected before any card past `h` can be seen. Recomputing on every `active` change costs one `rank` call (§3.4) and covers recalls too. No event from the kit is needed, so `Lesson.tsx` (protected) and `progress.ts` (kit) stay untouched.

**On screen and seen cards never move:** positions before `h` are frozen by construction (T9). The active card and its mounted neighbour are always before `h`, and `h` only grows. Revisit insertion keeps its own rule (`revisitFrom`) unchanged. Because the transform keeps the length of `list.items`, revisits land at the same `i % 3 === 1` item positions as today.

**Filters.** The transform applies to the "all" feed only. Subject chips (including probability and cs) serve the default order, as today. A chip's list is seeded from `lists.all.items` (the default `D`, untouched), so the seeding property in `feed-index.ts` still holds. Personalising a subject chip is not what 3b scored (Q-H2).

**Failure.** If `rank` or the transform throws, or a recompute takes longer than the budget in §7, the feed shows `D` for that render and every later one in the page's life: the default order, with no reason lines. Nothing is logged: no `console`, no error report, no beacon, because a stack or message could carry order data (N4).

### 5.5 Signed-in learners

They run the same code over the same local record. EDD-008's merge writes the server history into `s3c:progress:v1`, and that is the only place this design reads. No route, server component or API reads progress for ordering. `/api/feed/*` pages stay static and identical for everyone.

### 5.6 What the server can see (N2), stated so privacy-reviewer can rule on it (Q-P2)

The design adds no request. Requests that exist today still carry a lesson slug: lesson code chunks load per slug (`DemoHost`), `/api/meta/<slug>` loads when "Why trust this?" is opened, and `track()` sends `predict`, `reveal` and `complete` beacons with the slug. With the flag on, **the sequence of those requests follows the personalised order**, so a party who sees them could infer part of the derived order. No derived value is sent. Today the same requests follow the default order.

## 6. Tests (specified now, written with the build, all in `npm run check` unless marked)

| # | Test | Fails when |
|---|---|---|
| T1 | **Flag off = default order, candidate not executed.** (a) With `NEW_LESSON_ORDER_ON` false, Feed's list for any progress map (empty, seeded, random) equals `list.items` exactly, with no reason line. (b) A module-evaluation probe (a counter set by importing `pilot-dims.generated.ts` / `reachable-v2.ts` through a loader hook) stays at 0. (c) Built output (verify, `tests/platform/built-output.test.mjs`, platform-engineer): with the flag unset, no client chunk contains the candidate marker string `reachable-v2` or a pilot-dims marker; with it set to `reachable-v2`, exactly the learner chunks that import Feed do. | the flag-off path differs in any byte of order or copy, or candidate code is evaluated or shipped |
| T2 | **Order rule over pilot dims = `feedOrder("all")` restricted to pilot.** The rule (default-order-rule.md steps 1-4) over `PILOT_DIMS` equals `feedOrder("all").filter(pilot)`. **The 230-slug default-order vector is pinned in the product-index tests** (F5b review R7): the slugs joined by "\n" hash to `04bf48f41a703b88be6973717e209b4e39a3a0abaa283879725a5cfd16233853`, the order rule's test vector, checked against both `PILOT_DIMS` and `feedOrder("all")` restricted to pilot. A status change updates the vector in the same commit, with head-of-product's note; it never updates silently. Code-unit order equals `localeCompare` on every shipped slug. | the candidate's tie order and the product's order disagree |
| T3 | **N1: zero writes and zero fetches.** The glue (history build, `rank`, transform, reason pick), run over seeded histories with the composer's N1 stubs (fetch, XHR, WebSocket, EventSource, sendBeacon, localStorage/sessionStorage writes, indexedDB, caches, cookie, console, stderr; batch-reads ruling §1), records 0 writes and 0 network calls. The one storage read (`loadProgress`) is the Feed's existing call, outside the glue, and is asserted to be the only read. | any write, fetch or log from the ordering path |
| T4 | **N3: forbidden-input invariance on the shipped glue.** Every `FORBIDDEN_INPUTS` name (company/personalization/model/model.ts line 109) plus `settings`, `personalization_on`, `persona`, `ageBand` and unknown extra fields, each at two values, on progress records and in `localStorage` under other keys, gives identical display lists and reason codes. Controls: flipping one `predictedCorrectly` must change the order. | a forbidden or unknown input changes what the learner sees, or the test is blind |
| T5 | **Candidate file hash.** sha256 of the imported `reachable-v2.ts` = `2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714`, and the glue imports `rank` from that file only. | the candidate is edited, copied with drift, or swapped |
| T6 | **Every moved card has a reason line; unmoved cards have none.** Property test over seeded histories and scroll sequences: for every position, moved ⇒ exactly one line, from `reason-copy.ts`, for the code §6.3 picks; unmoved ⇒ none. Also fails if `reason-copy.ts` lacks a line for any code the candidate can emit. | a moved card without a line, a line on an unmoved card, or unapproved copy |
| T7 | **Pilot-only dims.** Every `PILOT_DIMS` entry has domain in {probability, cs}; it has exactly 230 entries today; no draft is in it (every entry's status is published or review, and the slug set equals `visibleDemos()` restricted to pilot; R6); it has no `misconceptionStrength`, `strengthSource`, `rating` or `pilot`; successors are pilot-only; concept prefix = domain; no concept id under two domains; `PILOT_DIMS` equals the generator's output (`--check`). | a non-pilot or rated entry reaches `rank` |
| T8 | **Permutation and positions.** With all pages loaded, the display list is a permutation of `D` (each slug once); non-pilot positions equal `D`; pilot lessons appear only in pilot slots; `R` never runs out. Checked under random completion and page-load orders. | a duplicate, a lost lesson, or a non-pilot move |
| T9 | **Pins.** Across any sequence of recomputes, no position before `h` changes, `h` never decreases, and the active card and its neighbour are always before `h`. | a seen or on-screen card moves |
| T10 | **First render.** Server HTML of `/` is byte-identical with the flag on and off (verify). | the server order depends on the flag |
| T11 | **Bundle and requests** (verify, platform-engineer). With the flag on, every learner chunk is ≤ 300 KB raw and W-946's internal-string check stays at 0 new hits (`concept` must stay unquoted, as D2 did). The home page's client reference manifest lists the same number of chunks with the flag on as off (no new request). | the cap or ratchet breaks, or a chunk is added |
| T12 | **Cold-start vector.** `rank` on an empty history over `PILOT_DIMS` gives the pinned order (hash in the test). A change is visible and goes to vp-personalization, not into a silent update. | the cold-start order changes unseen |
| T13 | **Failure fallback.** A throwing or over-budget `rank` gives `D` with no reason lines and no console or network call. | a failure shows a partial order or logs |

### 6.3 Which reason a moved card shows (proposal; decision with RC and learning-scientist-personalization, Q-R1)

`rank` sorts by value, and lessons with equal value form a *run*. The proposal derives a moving reason only from `rank`'s output, so the candidate is not edited:
- **Shown earlier than its default slot:** the code at the **end of its run** (the reason the run sits above the next lower run).
- **Shown later than its default slot:** the code of the **row just before its run** (the reason the run above sits ahead of it).
- **`default-order`, `last` or no row:** no moving reason exists, so T6 fails and the flag cannot be on. In the four probes (§3.2) this never happened.

Facts passed to the copy are that row's `ReasonFacts`, minus anything the copy rules forbid. The estimate is never shown as a number or a trait (G7; F5 N19; privacy M3). `versus` is never named, because in the display it may not be the neighbouring card. RC writes copy per code and direction (for example `earlier:prerequisites`, `later:domain-estimate`) that is true for every card the rule assigns it to. learning-scientist-personalization checks that claim against the rule. If either says no, the fallback is a v3 candidate that emits moving reasons itself (G6: a new candidate, a new score).

## 7. Measurements that will show it worked (committed before implementation)

- Flag off, order identical to today: T1 and T10 pass. Current: n/a. Target: pass. Command: `npm run check` and `npm run verify`.
- Moved cards with a true line: 100% (T6). Current: rank's own code fails for 225 of 229 at cold start (§3.2). Target: 0 failures over the property run. Command: `node --test tests/personalization/new-lesson-order.test.mjs`.
- Ordering-path writes, fetches, logs: 0 (T3). Command: same file.
- Recompute time: ≤ 16 ms median and ≤ 50 ms p95 per call with Playwright CPU throttle ×4, for 0, 20 and 150 completions. Current: 3.6 to 10.7 ms unthrottled on this machine (scratch). Command: a verify-only bench (platform-engineer).
- Largest learner chunk with the flag on: ≤ 300 KB raw (T11). Estimate: the Feed chunk grows by about 111 KB raw.
- would_be_wrong_if: a moved card shows a line its facts do not support (RC/F5 read); any card before `h` changes (T9); the flag-off build differs from today by any byte in the server HTML (T10); the cold-start order is shown with the intro still saying it alternates subjects and is not "for you" (Q-H1 unresolved at release); privacy-reviewer rules that the slug sequence in today's requests is a disclosure of the order (Q-P2), and nothing has been done about it.
- Live effect: **unmeasured.** There is no holdout (O2). W-1581's counters (N5) give a descriptive before/after only.

## 8. Operational readiness (ops-readiness sections 1-7, answered once)

1. **What can fail.** `rank` throws on an odd record (handled: §5.4 fallback); recompute is slow on old phones (budget, fallback); the pilot module and the feed disagree after a status change (T2 and T7 on `--check`; the build fails); the chunk grows past the cap (T11); the flag is turned on by a dashboard variable without a release (Q-O1); the reason copy is untrue (T6 tests that a line exists; truth comes from RC and F5, not from a test).
2. **How we would know.** CI (T1-T13). After release: W-1581's counters, if registered (cards moved per day by reason code, cells under 20 suppressed). No per-learner telemetry, by design. A wrong line can only be found by review or a report.
3. **How to roll back (the withdrawal path, G10).** Either (a) a **flag-off build**: unset `NEXT_PUBLIC_NEW_LESSON_ORDER`, or set any value other than `reachable-v2`, then deploy. It takes effect after one remote build (the deploy waits up to ten minutes for READY, runbook-deploy.md) plus the learner's next page load. Or (b) **release-manager's rollback** to the previous deployment (`npx vercel rollback`, runbook-deploy.md "Rollback", then a COE). This needs no build and takes effect on the next page load. **Both are deploys, so both need the founder's approval each time** (CLAUDE.md). Whether a flag-off withdrawal may be pre-approved is the founder's question through chief-of-staff (batch 5 §11.6 item 7). Withdrawal leaves nothing on any device to clean up: nothing was stored (N1). Withdrawal never means editing the candidate (G6, G10).
4. **Capacity.** No server work, no new route, the same static pages. Client: one `rank` call per card change, plus about 111 KB raw in the Feed chunk.
5. **Security.** No new input surface. The only data read is the learner's own localStorage record, on their device. The candidate has no imports and no I/O (build note §5, source scan).
6. **Data.** No new key, column, field, log or beacon event. What the ordering computes lives in React state for the page's life and is gone on reload (Q-P1 asks whether that counts as "stored").
7. **Risks.** Reason truth (Q-R1), the cold-start and intro conflict (G11, Q-H1), the N2 reading (Q-P2), counsel on minors with no opt-out (W-1587, G9), and the scored world rating every lesson while the shipped world rates none (§3.5).

## 9. Rollout and rollback

1. Merge with the flag off: no learner sees a change (T1, T10). This can happen before any release gate, once the tier-2 review approves.
2. A release turns the flag on (`reachable-v2`) only when every gate in §10 is met, and the founder approves that deploy.
3. Withdrawal: §8.3, with G10's triggers.

## 10. Gates (stated, not cleared here)

- **The build waits for:** this EDD's tier-2 review (principal-engineer); privacy-reviewer's design read under the always-on re-ruling **W-1586**; RC's reason copy (W-1579, fact-checker) with Q-R1 answered; D2 merged to perso-m1 with the `--pilot` mode (lesson-dims-owner); platform-engineer's review of the Feed.tsx and DemoCard change; head-of-product on the default order and the intro copy (W-1577, Q-H1).
- **Shipping to learners also waits for:** W-1585 ratified by the founder (the always-on amendment, which also settles G11's QA-test conflict and surface-value.md line 23); W-1586 passed with its conditions met in the code; W-1587 counsel's answer (G9: if counsel requires a learner control or an objection right, the website part is NO-GO until the founder decides, and S1 adds no switch on its own); K6's GO under batch 5 §4 and §12; the withdrawal path written by release-manager (MR line 16).

## 11. Open questions and objections

W-1586 (privacy-reviewer), written against the re-ruling's open questions:
- **Q-P1.** Is the display order and reason state held in React memory for one page's life "stored" under D20/N1? Proposed: no (it is never persisted, and it is gone on reload).
- **Q-P2.** N2 says "the server learns nothing about the order shown". Lesson chunk loads, `/api/meta` on opening the trust sheet, and `predict/reveal/complete` beacons already carry slugs, and with the flag on their sequence follows the personalised order (§5.6). Is that acceptable (no derived value is sent, and lesson identity flows today), or is a condition needed (for example no slug sequence in the beacon, or batching)? S1 cannot change the beacon or `track()` (kit).
- **Q-P3.** If option A breaks the chunk cap, may option E's single static chunk (same URL and bytes for every learner) count as no fetch "beyond today's"?
- **Q-P4.** What replaces the D2/G3 off-switch conditions: is the company build flag (§5.3) plus the withdrawal path (§8.3) the condition, and must the flag value be pinned by the deploy script (Q-O1)?
- **Q-P5.** Which `ReasonFacts` may a reason line show on screen? For example, may a line show "you got 2 of 3 first predictions right in probability"? Proposed: counts of the learner's own actions only, never `pKnown`, `estimate` or any probability (G7, M3).
- **Q-P6.** Signed-in learners: is it confirmed that ordering reads only the local record and never the server `progress` row (§5.5)?
- **Q-P7.** N3's forbidden list for the serving layer: the composer's `FORBIDDEN_INPUTS` plus `settings` and `personalization_on` (T4). Is anything else needed?

Others:
- **Q-R1 (RC, learning-scientist-personalization, vp-personalization). Blocking.** Accept §6.3's moving-reason rule, or ask for a v3 that emits moving reasons? With `rank`'s own codes, G-4 fails for 225 of 229 cold-start moves.
- **Q-H1 (head-of-product, evaluation-steward in W-1585).** The intro sentences "this feed is not 'for you'" and "It alternates subjects" with the flag on: at cold start the order is the same for everyone but is not the round-robin (94 pilot slots change subject), and for returning learners it is personal. The copy needs a decision before release. The QA test (protected) checks only the first phrase, at cold start.
- **Q-H2 (vp-personalization, head-of-product).** "All" feed only (proposed), or also the probability and cs chips? 3b scored the all-subject order.
- **Q-O1 (release-manager, platform-engineer).** Pin `NEXT_PUBLIC_NEW_LESSON_ORDER` in `tools/deploy.mjs` from the approved release, as `SHOW_REVIEW` is pinned, so a dashboard variable cannot turn it on unseen.
- **Q-D1 (lesson-dims-owner).** Add `build-index.mjs --pilot` emitting `PILOT_DIMS` and `PILOT_CARDS`, and confirm that `toFeedItem`'s claim counts can be computed in the generator without bringing internal strings into the client chunk.
- **Q-E1 (vp-personalization → personalization-eval).** The rating gap in §3.5 (the shipped dims have no ratings, while 3b's world rated every lesson). G reads criterion 3b's rating probe.

Objections carried (batch 5 §11.4, unchanged by this EDD): O2 (no holdout, so live effect cannot be causal: founder's call via chief-of-staff); O5 (always-on for 13-15 year olds raises the cost of a wrong line: answered by §12's gates, the flag, G10 and counsel). This EDD adds one of its own: **O-S1. The cold-start order is a design consequence nobody chose.** `reachable-v2` moves 229 of 230 cards for a learner it knows nothing about, ordering them by prerequisite count. That may be fine pedagogically, but it is not "the default order until we know something", which the intro copy and the protected QA test assume. Route: vp-personalization decides whether that is the intended behaviour, and W-1585 records it.
