# EDD-016: Serving the EDP-faithful session composer on the live feed, only after it passes a frozen readout

author: principal-engineer (Kenji, run pe-edd016-session-serving-1020) · reviewers: **not the author**: principal-engineer-ops (tier-2 design review and readiness) + platform-engineer (Feed surface, as reviewer of personalization-engineer's Feed code) · also reads: privacy-reviewer (serving inputs, the off-switch key, rendered copy), personalization-eval (readout binding, experiment registration), analytics-steward (EXP format, counter semantics), fact-checker / RC (reason copy), learning-scientist-personalization (reason truth), evaluation-steward (the amendment this needs, §13 O1), release-manager (flag pin and withdrawal) · tier: 2 (feed contract, learner data read on the device, learner-facing copy, build flag) · status: **proposed, design only (2026-10-20)**. No serving code exists and none may be written before the gates in §10. ADR: [ADR-011](../adr/ADR-011-frozen-learner-policy-modules.md).

decision served: company/decisions/2026-10-20-founder-edp-faithful-personalization.md ("The live feed": "This decision asks for that path to be prepared. It does not approve serving or a deploy.")
inputs read: that decision; company/personalization/model/README.md ("Where the model lives", the vp-personalization ack and its carried condition); model.ts (sections 1-6, types `ComposeInput`, `HistoryItem`, `FORBIDDEN_INPUTS`, `INPUT_PRIVACY`); sim/composer.ts header and exports; self-check.mjs lines 20-40; gate.mjs; src/lib/preference-match.ts; src/lib/server/personalization/account-feed.ts, account-feed-handler.ts, preference-admission.ts; src/components/Feed.tsx (imports, fetch path, reasons, revisits); src/lib/learner/dims-index.generated.ts header; src/kit/progress.ts (record shape); company/engineering/readiness/paths.json; EDD-010 (§5.3, §5.4, §8, §12 A1-A6) and its review company/engineering/reviews/2026-10-17-edd-010-review.md; company/personalization/eval/2026-10-16-phase-a-readout-1.md; company/reviews/_privacy/2026-10-16-personalization-model-inputs.md; AMD-008 part P (proposed, F-19 open); AMD-015 (ratified); AMD-016 (ratified); tools/org/roles.mjs (analytics-steward and personalization-eval scope, card S8).
not read: the session composer itself (composer-v0.3-session, policies `gam-session` / `gam-session-v3`). It is being built concurrently in company/personalization/model/ and has not landed on this tree (`grep gam-session` finds nothing; `MODEL_VERSION` is `model-v0.2.2`). Everything this EDD says about it is a contract it must meet, not a description of it.

---

## 1. Problem and why now

The founder wants a more faithful EDP Orchestrator implementation "in all three" places, including the live feed. The decision makes the live feed conditional on five gates and asks for the path to be prepared. Without a design written now, two things go wrong later. First, a passing readout would land with nobody knowing where the code goes, how the gateway rule changes, or how the new order coexists with the stated-fit recipe that is live under AMD-016. Second, the most likely shortcut (importing the offline model from `src/`) is exactly what W-1498's boundary was written to stop.

Why now and not after the readout: the readout's criterion has to be frozen before the run, and this design adds two requirements to what the readout must score (§4.2: the readout scores the frozen single-file candidate whose hash will serve; §6: inputs the server-side and device-side code may read). If those are not known before the criterion freezes, a pass could be a pass of something that cannot be served.

## 2. Goals / non-goals

Goals
- **G1.** If and only if the gates in §10 clear, the All feed can show the session composer's order of new pilot lessons on a learner's device, behind a build flag that is off by default.
- **G2.** What serves is byte-for-byte what was scored: one frozen file, one hash, from the readout's manifest to the browser.
- **G3.** Personas, the simulator, the HQ CLI and the change-rule lab stay offline. Serving code holds typed numbers and pure functions only.
- **G4.** The gateway rule is rewritten in the same commit that creates the serving home, and is no looser for anything outside that home.
- **G5.** Every moved card says why, in copy from a closed key set, and a learner can turn the order off and get the default order exactly.
- **G6.** No stored fingerprint, need score, coverage state or composed order anywhere (privacy N1, §4). Anonymous history never leaves the device (N2).
- **G7.** Deterministic: the same history, catalogue and `now` give the same display on every engine we test.

Non-goals
- Serving anything that failed or has not been scored. Phase A's GAM failed (§3.1); nothing in this EDD revisits that verdict.
- Changing the AMD-016 stated-fit recipe, its route or its admission. It keeps serving signed-in learners who turned it on (§7).
- Server-side composition. No new route, no per-request compute from `progress` rows (§5, option C).
- Personalising subject chips. They keep the default order (AMD-015 A2, AMD-016).
- Approving a deploy, an experiment or an amendment. This EDD states the gates; it clears none.
- Building the EDD-010 reachable-v3 path. If both are ever built they share one glue (ADR-011); this EDD does not change EDD-010's conditions.

## 3. Current state (with measurements)

### 3.1 The evidence is a FAIL

Phase A readout 1 (personalization-eval, criterion frozen at e9909edc, code 5725b10a, S = 200): **gam vs default-order FAIL, gam vs draft-rules FAIL**, 0 of 6 persona wins in the base cell, 0 of 10 pass cells beaten. Mean ΔR against default order +0.0010, every persona's upper 95% bound ≤ +0.0032, nothing reaches δ_min = 0.01. The readout says this is not a power problem. At those sizes phase B would need about 890,000 learners to detect the best persona's edge (readout §3). No persona was harmed. The session composer is a different candidate (multi-card greedy fill with `remaining` and `coverage`, `on_cov`, `slot_decay`, an attention cost), so the FAIL does not bind it, but it is the honest prior: the founder's decision records vp-personalization's standing objection that the session machinery "may not change that".

### 3.2 What is live on the All feed today

- Signed-out, or signed-in with matching off: the canonical default order from `/api/feed/<filter>/<page>` (static).
- Signed-in with AMD-016 matching on and admitted: `/api/account/feed?page=n` returns `accountFeedPage()` (src/lib/server/personalization/account-feed.ts): `matchCandidates()` from src/lib/preference-match.ts, recipe `stated-fit-account-2026-10-20-v1`, five-card windows, adjacent swaps, ≤ 2 positions, reasons built server-side, snapshot HMAC for paging. Feed.tsx switches to that path when `personalPage` is set and renders reasons in a "Why this pick?" `<details>` (Feed.tsx line 306).
- `preference-admission.ts` line 6 refuses AMD-016 when `NEXT_PUBLIC_NEW_LESSON_ORDER === 'reachable-v3'`. That is the only code that reads the flag today. No reachable-v3 serving code exists (`src/lib/learner/` holds only `dims-index.generated.ts`).

### 3.3 Where the model is and what guards it

- company/personalization/model/: `model.ts` (numbers, curves, `fingerprintFrom`, `detect`, types), `personas.ts` (simulation only), `sim/composer.ts` (the composer; imports only types from `../model`), simulator, `hq-cli.mjs`.
- `self-check.mjs` (in `npm run check` through `test:personalization`) enforces: no `import` / `import()` / `require` of `personalization/model` anywhere in `src/`; `child_process` only in `src/lib/hq-personalization-server.ts`.
- The README's revisit condition: "when phase B gives serving code a home under `src/lib/`, the gateway rule must be rewritten in the same commit, not loosened afterwards."
- Frozen policy precedent: company/personalization/policies/reachable-v{1,2,3}.ts, each a single import-free file with a build note and a frozen sha256; EDD-010's review ruled that serving uses a hash-locked byte copy under `src/lib/learner/`, never an import from `company/` (EDD-010 review F1, C1).
- paths.json still has **no rule for `src/lib/learner/**` or `src/lib/server/**`**, so both classify tier 1 by default. W-1792 (mine, EDD-010 C2) is still open.

### 3.4 Speed, measured on this tree

The session composer does not exist yet, so I measured the one-card composer it extends. `gamCompose` at model-v0.2.2, plus `fingerprintFrom` and `detect`, on the pinned catalogue (230 pilot lessons), Node v22.22.0, this host (4 cores), 300 calls after 50 warm-up calls, script in the run's scratchpad (not committed):

| completions | pool | median | p95 |
|---|---|---|---|
| 0 | 230 | 0.40 ms | 0.70 ms |
| 20 | 210 | 0.45 ms | 1.03 ms |
| 150 | 80 | 0.35 ms | 0.74 ms |

A K-card greedy session is roughly K one-card passes plus coverage updates. At K = 5 that is about 2 ms on this host. **This is an estimate, not a measurement of the session composer.** EDP's "1-2 ms" target is unmeasured in the reference itself: the reference's own experience script removes the line "latency target:" from the original header as an unmeasured claim (company/personalization/reference/edp-orchestrator/src/edp-experience.js line 20-22). So the budget in §8 is ours, measured on our code, and does not lean on EDP's number.

### 3.5 Size

`dims-index.generated.ts` is 248,627 B raw for every lesson. EDD-010 C3 already rules that a pilot-only dims module is generated for serving. The session candidate's own size is unknown until it is frozen.

## 4. Proposal: where serving code lives

### 4.1 Layout

```
company/personalization/policies/<candidate>.ts      frozen by learner-model-engineer at readout time; import-free;
                                                     numbers + pure functions; no personas; sha256 in the build note
                                                     and in the readout manifest (offline, tier 0 path, never edited)
src/lib/learner/policies/<candidate>.ts              byte copy of the above (tier 2); same sha256; nothing else in it
src/lib/learner/policies/index.ts                    the one import of the copy; exports CANDIDATE_ID, CANDIDATE_SHA256,
                                                     and an adapter with the glue's interface (§4.3)
src/lib/learner/pilot-dims.generated.ts              EDD-010 C3's pilot-only dims (shared, not new here)
src/lib/learner/new-lesson-order.ts                  the glue (EDD-010 §5.4 with its review conditions): history build,
                                                     pins, fill, failure path, reason keys; candidate-agnostic
src/lib/learner/reason-copy.ts                       closed key set → copy (RC owns the text)
src/lib/learner/order-switch.ts                      the learner's off switch (§6.4)
```

The session candidate is one file. It holds its typed numbers (`as const` curves, weights, session constants, attention costs if they are constants) and the pure functions that read them: `fingerprintFrom`, `detect`, the session fill, and a `moves()` function that returns per-card moved/direction/reason key. It holds no `why` prose beyond comments (a minifier removes comments; string fields would ship), no `inspect()`, no persona type, no simulator hook. This is what "the model's typed numbers vs personas staying offline" means in code: the numbers travel inside the frozen file, the personas never get one.

Freezing is learner-model-engineer's act on the offline side. It writes the single file from the passing `model.ts` + session composer at the readout's commit, and an equivalence test (offline, in `test:personalization`) shows the single file and the `model.ts` + `sim/composer.ts` pair produce identical output on the pinned catalogue across the readout's seeds and every persona. The policy-golden test keeps `gam` at model-v0.2.2 and every existing policy byte-identical.

### 4.2 What the readout must score (requirement on the criterion, before it freezes)

The readout must load the frozen single file, by hash, as the policy under test (or score both and show the equivalence test above passed at the same commit). The readout manifest records that file's sha256. The serving copy's T1 compares against that manifest value. That chain (readout manifest → build note → offline frozen file → `src/` byte copy → built chunk sentinel) is the only proof that what serves is what passed. personalization-eval decides how to express this in the criterion. If the criterion is already frozen without it, the candidate cannot serve on that readout.

### 4.3 The glue's candidate interface

```ts
type CandidateInput  = { now: number; history: HistoryItem[]; dims: Record<string, PilotDims>; shown: string[]; dueRevisits: string[] };
type CandidateMove   = { slug: string; moved: boolean; direction: "earlier" | "later" | null; key: ReasonKey | null; names: string[] };
type Candidate       = { id: string; sha256: string; session(input: CandidateInput): CandidateMove[] };
```

`shown` is EDD-010 Q-A1 option (i): the candidate states direction against the default order with finished **and already shown** lessons removed, so the line a learner reads after a deep pin means what they see. The session composer is being built now, so this can be in its interface before it freezes (board item for vp-personalization's lane, via learner-model-engineer, is EDD-010 Q-A1's; I add no new item for it). `names` are slugs the copy may name (lessons in the learner's own history), never numbers. Nothing in `CandidateMove` carries a score, a term value, a need score or a coverage value (privacy E10, P3, P4).

### 4.4 How the session maps onto the feed

EDP composes a session of K cards. In the feed, the "session" is **the next K pilot slots at or after the pin horizon `h`**, composed in one call. When the learner's history changes (a reveal or a recall, not a swipe), the glue recomposes the next K from the new `h`. Slots beyond those K fill by the same call as `h` advances. `remaining` and `coverage` exist only inside one call and are discarded (N1). Pins, permutation, never-twice and the failure path are EDD-010 §5.4 with review conditions C4, C7 and C8 unchanged.

"Session" never means an observed visit. The attention budget is a model constant and the attention cost per card is a lesson property (constant or a dims field). Neither may be derived from time on page, dwell, session length or session count: those are `FORBIDDEN_INPUTS` (AMD-008 P2). If the candidate needs a per-lesson attention cost that is not in the dims today, it is a lesson-dims change (lesson-dims-owner) and goes into the pilot dims, not into the candidate as a learner reading.

## 5. Options considered

| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| **0. Do nothing**: keep stated-fit for opted-in accounts, default for everyone else | none | the founder's live-feed goal is not prepared; a pass later lands with no path and invites the shortcut in B | n/a |
| **A. (chosen) Frozen single file, byte copy under `src/lib/learner/policies/`, run on the device by the shared glue, behind the existing build flag with a new value** | one copy step and T1 per candidate; one glue for every candidate | the copy is a second file that could drift (T1 makes that a check failure); every visitor to `/` pays its gzip bytes when the flag is on (T11) | one flag-off build; nothing on devices except the off-switch key |
| B. Import `company/personalization/model/` from `src/` (alias or relative) | small at first | breaks W-1498 and EDD-010 F1: personas and `inspect()` one import away from a bundle; `company/**` is tier 0, so a served curve change would classify tier 0; the change rule's `MODEL_VERSION` bumps would ship without a readout | hard: the coupling spreads |
| C. Compose on the server per request (signed-in only) from `progress` rows | a route, a DB read per page, snapshot paging like AMD-016 | anonymous learners cannot get it (N2), so two orders by sign-in state, which privacy T1/P4 forbid ("anonymous and signed-in with the same history get the same order"); per-request profiling question for counsel (privacy §7) | moderate |
| D. Move model.ts and the composer into `src/lib/` and make the simulator import them from there | removes the copy | every offline experiment edits served code; a curve change ships on the next deploy without a readout; personas end up one folder away from serving | hard |
| E. Precompute orders for a grid of histories and ship a table | no compute at serve | histories are unbounded; a lookup on a learner's history is a stored derived mapping of learner state to order, which §4 of the privacy ruling refuses in spirit | easy |

A wins because it is the pattern already ruled for reachable-v2/v3 (EDD-010 C1), it keeps the readout's hash as the release identity, and it adds no route, request, dependency or storage beyond one switch key.

## 6. Inputs read at serve time, and their privacy status

All on the device, read once per recompute from Feed's existing `loadProgress()` (src/kit/progress.ts, key `s3c:progress:v1`) and the build-time pilot dims. Signed-in learners read the same local record (EDD-008's merge writes the server history into it), so one code path for both.

| Input | Source | Privacy status (company/reviews/_privacy/2026-10-16-personalization-model-inputs.md) | Notes |
|---|---|---|---|
| completions: `slug`, `completedAt` | `s3c:progress:v1` | standing conditions N1-N6 | built field by field, never spread (EDD-010 §5.4 step 1); pilot slugs only (privacy minimisation, EDD-010 A2 T4) |
| `predictedCorrectly` | same | conditions P1-P4 | null/absent is absent, never wrong (P2). P1: the recall-only fallback stays buildable; **a served fallback is a different candidate and needs its own readout row**, because the readout scored one variant. In fallback the field is not loaded into `history` at all |
| `recalls[]`: `{at, correct}` | same | standing; F1 (30-day window, never days-since-last) | |
| due revisits | `revisitDue()` (kit) | standing | due revisits come first; the candidate never reorders them |
| `now` | one `Date.now()` per page load, held for the page's life | n/a (clock) | a single read; no other clock; the candidate itself reads no clock (T2) |
| pilot lesson dims, curriculum graph | `pilot-dims.generated.ts` | not personal | includes any attention-cost field (§4.4) |
| the learner's off switch | new local key, §6.4 | **unruled: needs privacy-reviewer's read** | a stated choice, not a derived value |
| **Not read** | | | `FORBIDDEN_INPUTS` (dwell, swipes, scroll, sessionLength, sessionCount, shares, device, location, ageBand, ads, personaLabel); AMD-016 `settings` (subjects, experiences, challenge, `personalizationOn`); `signedIn`; `s3c:events:v1`, `s3c:origin:v1`, `s3c:ageband:session`; URL query/hash; referrer; `navigator`, `screen`, `matchMedia`, timezone, locale; `gapDays` (refused); `masteryOf()` (not in v0) |

### 6.1 N1-N6, how this design meets each

- **N1 computed, not stored.** Fingerprint, needs, `remaining`, `coverage`, picks, the composed order, pins and reason keys live in component state, refs or module variables only. Never in storage, the URL, `history.state`, `window.name`, a service worker, the DOM beyond the visible line, a log or an error report (EDD-010 A2 E1-E3). T3 and T16.
- **N2 anonymous stays local.** No request carries history or order. The residual EDD-010 §5.6 states still applies: lesson chunk loads and beacons follow the displayed order, so an observer of those requests can infer part of it. E4's request-multiset test (flag on vs off) holds.
- **N3 forbidden-input invariance.** T4, including age band, signed-in state and every AMD-016 settings field as varied inputs, with a positive control (a changed completion must change the order).
- **N4 no served-order log.** None. Replay is proven on seeded histories (T6).
- **N5 counters, not traces.** The experiment reads aggregate counters only (§10.2 G4). How a holdout arm is assigned and held is not decided here and needs the registration to state it.
- **N6 changes route to privacy.** A new candidate input, a new attention-cost field that reads learner data, or any stored value goes back to privacy-reviewer before the freeze.

### 6.2 What the server sees

Nothing new. No route is added. `/api/feed/*` stays static and identical for everyone. `/api/account/feed` is unchanged.

### 6.3 Reason copy per moved card

- **Key set.** `<direction>:<reason>` where direction ∈ {earlier, later} and reason ∈ the candidate's active `PickReason` values at freeze (today's type: repair, build, breadth, stretch, surprise, novelty, breadth-floor; surprise and novelty are gated off at v0.2.2). The frozen candidate exports its key set. `reason-copy.ts` must cover exactly that set: a flag-on build fails if any key lacks copy (EDD-010 C7f, T18).
- **Slots.** The copy layer receives only `{ key, title?, count? }`: `title` of a lesson named in `names` (from the learner's own history), `count` of finished lessons computed by the glue from progress. No score, term, need value, coverage value or `explainNeeds()` output (privacy E10, P3, P4). A `concept` slot stays empty until EDD-010 Q-A3 has a source.
- **Truth.** A line is shown only when the candidate says moved and its direction equals the display direction (EDD-010 A3 item 2). A moved card without a true line counts as a T9 failure, so the flag cannot be on while it happens. Whether the named reason is true of the session composer's pick (the coverage term can move a card because a *related* need is covered, which is not obviously the need the copy names) is learning-scientist-personalization's truth test on the frozen candidate's own traces, as F6/F7 were for reachable-v2/v3.
- **Wording ceiling.** Privacy P3, T3 and the E10 deny-list: an act ("you missed X on revisit"), never a trait, a comparison, a tally, urgency or the age band. RC (fact-checker) writes the text; the copy is a learner-facing claim.
- **Where it shows.** The same "Why this pick?" affordance AMD-016 uses (Feed.tsx line 306), with a different source label: "Based on lessons you finished on this device", never "your choices". Pinned with the card (EDD-010 C7d).

### 6.4 The off switch

AMD-015 removed the learner switch for **reachable-v3 only** and kept AMD-008 P4 as drafted "for any other personalization surface" (AMD-015 A4, P4 narrowed). The session composer is another surface, so this design builds a switch. Whether to ship without one is the founder's in the amendment (§13 O1), not mine; the mechanism costs little and is what P4 asks for.

- **One control**, reachable from the All feed: in the intro card and inside every "Why this pick?" panel: "Show the default order instead". Off gives the canonical default order exactly, at once (no reload), and persists.
- **Storage:** one local key, `s3c:order:v1`, value exactly `"default"` when off; absent means on. Nothing else, no timestamp. Works without an account. It is a stated choice, not a derived value, but it is a new key on a device that may belong to a child, so privacy-reviewer rules on it (G3).
- **Signed-in learners** use the same local key. It is not synced to the account in this design (no schema change). AMD-016's `personalizationOn` is a different switch, for stated choices; product decides whether learners see one control or two (Q2).
- **Off is checked before the candidate runs.** With the switch off, the candidate module is not called (T15).

## 7. Coexistence and precedence with AMD-016 stated-fit

The constraint: AMD-016 says "The AMD-015 candidate and this exception cannot run together; enabling or combining them requires a further amendment." The session composer is not the AMD-015 candidate, but the same reasoning applies, and AMD-015 itself says "a different candidate … needs a further amendment" (A1 third bullet). This design keeps the two **mutually exclusive per learner**, never combined in one order, and the amendment in §10.2 G4b must say so.

Precedence on the All feed, first match wins:

| # | Condition | Order shown |
|---|---|---|
| 1 | a revisit is due | due revisits first, as today (protected rule) |
| 2 | always | visibility: published and review only, drafts never; labels unchanged |
| 3 | filter is a subject chip | canonical default |
| 4 | build flag not exactly the frozen candidate id | canonical default (or AMD-016, row 5) |
| 5 | signed in, AMD-016 matching on and admitted (`/api/account/feed` returns `matching: true`) | the stated-fit recipe, unchanged; **the session composer does not run** |
| 6 | the learner's switch is off (`s3c:order:v1 = "default"`) | canonical default |
| 7 | otherwise (flag on) | session composer order on pilot slots at/after `h`; non-pilot slots keep their default positions |
| 8 | composer throws | pins kept; after `h`, default order minus shown slugs, no lines; nothing logged (EDD-010 C8) |

Why stated-fit wins in row 5: it is the learner's explicit, saved act; the composer is a company default. Feed.tsx already branches on `personalPage`, so the composer applies only to the path where the canonical list would otherwise render. A learner who turns AMD-016 matching off falls to rows 6-7. A learner who is mid-page when the account feed answers keeps the pinned cards (EDD-010 C7) and the account path takes over after `h`, as Feed's resume logic does today.

`preference-admission.ts` line 6 stays as it is (it refuses AMD-016 only for `reachable-v3`, which is AMD-016's own wording). The amendment may choose the other rule (flag on disables AMD-016 for everyone, as reachable-v3 does). That is simpler in code and worse for the learner who saved choices. I recommend per-learner exclusivity. Confidence: moderate; it is a product preference with an engineering cost of one branch that already exists.

## 8. The flag

- **Variable:** the existing `NEXT_PUBLIC_NEW_LESSON_ORDER`, with **a new value equal to the frozen candidate's id** (for example `gam-session-v3`; the exact string is fixed at freeze and exported as `CANDIDATE_ID`). On only when the value equals `CANDIDATE_ID` exactly; unset, empty, `reachable-v3`, any other value: the session composer is off. Read once at build through the flag module of EDD-010 C11/E8 (`new-lesson-order-flag.mjs`); no runtime, cookie, query or storage override. The repository default is off; no `.env*`, `vercel.json` or `next.config` sets it. The deploy script pins it (W-1783).
- **Why the same variable:** (a) one variable holds one value, so reachable-v3 and the session composer cannot both be on, by construction; (b) the deploy pin (W-1783) and the build log line `new-lesson-order: <value|off>` already exist in design; (c) a flag-off build of the live commit turns off whatever candidate is on.
- **Relation to AMD-015 Part B (pre-approved withdrawal).** The pre-approved withdrawal is defined mechanically as "the live production commit rebuilt with `NEXT_PUBLIC_NEW_LESSON_ORDER` off and nothing else changed", so with this design it would also withdraw the session composer. But the founder pre-approved it for the AMD-015 candidate under AMD-015's triggers. **Until the founder confirms in the new amendment that Part B covers the session composer, release-manager must treat a session-composer withdrawal as an ordinary deploy that the founder approves.** I recommend the founder extend Part B to it, with the same B2 triggers, because the exposure window argument (privacy design read, "Time to withdraw") is the same.
- **Flag off ships nothing.** Sentinels both ways (EDD-010 C6): with the flag unset, 0 learner chunks contain `CANDIDATE_ID`, `CANDIDATE_SHA256` or the candidate's exported marker; with it on, the chunks of `/` contain all three. If tree-shaking does not drop the copy, the fix is a build-time alias of `policies/index.ts` to a stub (next.config, re-reviewed), never a waiver.

## 9. Latency, determinism, tests

### 9.1 Latency budget (committed before implementation)

| Metric | Current | Target | Command |
|---|---|---|---|
| one `session()` call (K cards), Node 22 on the CI host, 0 / 20 / 150 completions | not measured (candidate not built); one-card composer 0.35-0.45 ms median, p95 ≤ 1.03 ms (§3.4) | median ≤ 2 ms, p95 ≤ 5 ms (EDP's target as a regression line, not a claim about phones) | bench in `tests/learner/` (verify) |
| same, browser, ×4 CPU throttle | not measured | median ≤ 8 ms, p95 ≤ 16 ms (one frame) | Playwright bench (verify), as EDD-010 C8 |
| calls per learner action | n/a | 1 per history change (memoised on the ordering-relevant history); 0 per swipe; the fill re-runs per swipe and is ≤ 1 ms | counted by the bench |
| Feed chunk, gzip, flag on vs off | baseline 18,089 B raw / 7,124 B gzip (EDD-010 review) | largest learner chunk ≤ 300 KB raw (T11); delta recorded, not waived | C5-style twin builds |

No runtime time trip (my D1 on EDD-010 stands): the budget is enforced before release by the bench. If the bench fails, stop and route to learner-model-engineer; do not ship a slow candidate behind a timer.

- would_be_wrong_if: the ×4 browser p95 exceeds 16 ms at 150 completions; or a flag-off build contains any sentinel; or the served display differs from the frozen candidate's offline output on any seeded vector; or any storage, DOM or request diff is attributable to the ordering path beyond the switch key.

### 9.2 Determinism and replay

- The frozen file is pure: no `Math.random`, no clock, no I/O, no imports (T2 scans it). Randomised policies (`random`, `epsilon-greedy`) can never be a serving candidate.
- `now` is read once per page load and passed in. Within a page, pins make the display stable; across reloads, the same history and day give the same order.
- Ties break by default-order index, as the candidate does it. If the candidate compares floats with `===` (reachable-v2 did), C9's near-tie count (EDD-010 review F9) applies: count near-ties on the T6 vectors, and if any exist, run the vectors in WebKit (Playwright) and require identical display lists to Node's.
- Replay (AMD-008 P1 test): on 3 seeded histories plus the empty history, the served display equals the frozen candidate's output fed the same inputs, card for card, and the empty-history display is identical for two values of `now` if the candidate's cold start reads no learner data.

### 9.3 Tests (specified now, written with the build)

| # | Test | Runs in |
|---|---|---|
| T1 | sha256 of `src/lib/learner/policies/<candidate>.ts` = offline frozen file = readout manifest value = `CANDIDATE_SHA256`; `policies/index.ts` is its only importer | check |
| T2 | the copy has zero `import`/`require`; no `Math.random`, `Date`, `performance`, `fetch`, `localStorage`, `sessionStorage`, `document`, `window`, `navigator`, `console`; no `persona`/`Persona`/`latent` token | check |
| T3 | N1: glue + candidate under stubbed storage and network: 0 writes except the switch key on toggle, 0 fetches | check |
| T4 | N3: every input in §6 "Not read" varied, order and lines unchanged; positive control changes order | check |
| T5 | P1: if the candidate reads `predictedCorrectly`, the history builder omits it in fallback mode and the fallback variant's output is invariant to it (only if a fallback candidate is ever frozen and scored) | check |
| T6 | replay and equivalence vectors (§9.2), including the readout's seeds | check |
| T7 | precedence table (§7) row by row, including flag = `reachable-v3`, chips, AMD-016 matching on/off, switch off | check |
| T8 | permutation, never twice, pilot-slot membership by dims (EDD-010 C4) | check |
| T9 | pins and lines frozen before `h` under scroll, recompute, page load, chip switch (EDD-010 C7) | check |
| T10 | server HTML of `/` identical flag on and off | verify (tests/platform) |
| T11 | chunk cap and sentinels both ways (§8) | verify |
| T12 | latency bench (§9.1) | verify |
| T13 | failure keeps pins, logs nothing (EDD-010 C8, E3) | check + verify |
| T14 | WebKit vector equality, if C9 counts > 0 | verify |
| T15 | off switch: off → default byte for byte, at once; reload → still off; anonymous works; candidate not called while off | check + verify |
| T16 | storage, DOM and request diffs: only `s3c:order:v1` added, no attribute carries a key or index, request multiset equal flag on/off (E1, E2, E4) | verify |
| T17 | reason keys: the candidate's key set = `reason-copy.ts` keys; deny-list and slot allow-list (E10, T23) | check; completeness at flag-on build |
| T18 | gateway rule (§10.1) | check (`test:personalization`) |

CI's verify job does not run `test:*` suites (EDD-010 review F11), so the merge record and the flag-on release record paste the `npm run verify` summary.

## 10. The gateway rule, and the exact gate sequence

### 10.1 The gateway rule, rewritten in the same commit that creates `src/lib/learner/policies/`

The commit that adds the serving home also edits `company/personalization/model/self-check.mjs` (owner vp-personalization; code by learner-model-engineer, who must author or co-sign that hunk). The new rule set, all failing `npm run check`:

1. **Unchanged:** no `import` / `import()` / `require` of `personalization/model` anywhere in `src/`. **Tightened:** no `src/` `.ts`/`.tsx` file imports any path under `company/` (EDD-010 C1(c)); build-time lesson scripts (`src/demos/**/gen.mjs`) excepted as today.
2. **Unchanged:** `child_process` only in `src/lib/hq-personalization-server.ts`.
3. **New:** no file under `src/` contains the tokens `personas`, `PERSONAS`, `Persona`, `latent` or `personaLabel` outside comments in `src/lib/hq-personalization*.ts` (HQ shows simulated personas through the CLI, ruling §6).
4. **New:** every file in `src/lib/learner/policies/` other than `index.ts` is a byte copy whose sha256 appears in a frozen policy build note under company/personalization/policies/, and has zero imports.
5. **New:** `src/lib/learner/policies/index.ts` is imported only by `src/lib/learner/new-lesson-order.ts`; nothing in `src/app/hq/**` or `src/lib/server/**` imports the serving modules.
6. **New:** nothing under `src/lib/learner/**` imports `src/lib/server/**`, an accounts client, `server-only`, or calls `fetch` (EDD-010 E11).

The vp-personalization ack's condition ("rewritten in the same commit, not loosened afterwards") is met if the PR's first commit containing `src/lib/learner/policies/` also contains this self-check hunk. The reviewer checks the commit, not the PR.

paths.json in the same PR: `src/lib/learner/**` tier 2 class data (W-1792), with `pilot-cards.generated.ts` tier 0 if EDD-010's split lands first.

### 10.2 The gates, in order

None is cleared by this EDD. Each names its owner and what "cleared" means on disk.

| Gate | What | Owner | Cleared when, on disk |
|---|---|---|---|
| **G0** | Criterion frozen before the run, requiring the frozen single file's hash (§4.2) | personalization-eval | criterion file with its freeze commit and hash |
| **G1** | **Passing readout** of the frozen candidate under that criterion, reproduced, and the keep decision | personalization-eval (readout), learner-model-engineer (reproduction), vp-personalization (keep) | readout file with PASS on the stated pairs, manifest with the candidate sha256; reproduction record; vp decision line. A FAIL is reported unedited and stops here |
| **G2** | **This EDD reviewed**, plus a binding addendum after G1 naming the candidate id, sha256, key set, attention-cost source and the measured bench | reviewers above (not the author); author writes the addendum | review record in company/engineering/reviews/ with a verdict and conditions; addendum in this file |
| **G3** | **Privacy read** of the serving inputs (§6), the switch key, the candidate's frozen input list, the reason key set and copy slots; W-1916 conditions applied | privacy-reviewer | ruling in company/reviews/_privacy/ |
| **G4** | **Experiment registration**: prediction committed before data, arms (holdout or not, O2), arm assignment and holding (N5), counters (cards moved by reason per day, cells < 20 suppressed), guardrails, stop rules | personalization-eval registers (card S8; tools/org/roles.mjs); analytics-steward owns the EXP format, index entry and counter event semantics | company/experiments/EXP-<n>.md, indexed |
| **G4b** | **Amendment** to company/product/surface-value.md (protected): names the session candidate, the precedence with AMD-016 (§7), the switch, cold start, and whether AMD-015 Part B covers it (§8). Not in the founder's list; required by AMD-015 A1 and AMD-016 (§13 O1) | evaluation-steward drafts; founder ratifies; head-of-product and privacy-reviewer seats | amendment file, ratified |
| **B** | **Build** (flag off), then tier-2 merge review against G2's conditions, readiness record approved by principal-engineer-ops | personalization-engineer (glue, Feed), learner-model-engineer (freeze, self-check hunk), platform-engineer (Feed review, platform tests), RC (copy) | merge record with verify summary, bench, C5-style sizes |
| **G5** | **Founder approval of that specific deploy** (flag value = `CANDIDATE_ID`), with the release record listing G0-G4b, B, W-1783 and W-1766 (counsel on 13-15) | release-manager asks; founder approves | release record and the founder's words in the conversation |

The founder's order (readout → EDD review → privacy read → registration → deploy approval) is kept. The build may start after G1-G4; G4b must be ratified before G5. A FAIL at G1 ends this path for that candidate; a new candidate restarts at G0.

## 11. Operational readiness (ops-readiness 1-7, answered once)

1. **What can fail.** The candidate throws on an odd record (failure path, T13); it is slow on old phones (bench before release; no runtime trip); a moved card's line is untrue or missing (T9, T17, truth test); the copy drifts from the frozen file (T1); the flag is set on in the Vercel dashboard without a release (W-1783 pin); AMD-016 and the composer both apply to one learner (T7); a candidate reading a forbidden input slips through the freeze (T4, T2).
2. **How we would know.** CI (check suites); verify (platform and browser tests; pasted into the records because CI does not run them); after release, only G4's aggregate counters. No per-learner telemetry by design.
3. **How to roll back.** A flag-off build of the live commit, or `npx vercel rollback`. Both are deploys and need the founder's approval, unless and until the founder extends AMD-015 Part B to this candidate (§8). Nothing to clean on devices except `s3c:order:v1`, which is harmless and stays as the learner's choice.
4. **Capacity.** No server work, no route. Client: one candidate call per history change; chunk delta measured (T11).
5. **Security.** No new input surface; the only data read is the learner's own local record. The candidate has no imports and no I/O (T2).
6. **Data.** One new local key, a stated choice. No new column, field, log or beacon event. Privacy G3 rules on the key.
7. **Risks.** The readout fails (most likely, given §3.1); the session reason is not true in learner terms; the amendment is not ratified; counsel restricts always-on or no-switch use for 13-15 (W-1766); AMD-008 part P stays unratified (F-19), so the privacy ruling's phase-B premise is unsettled.

## 12. Rollout and rollback

1. Freeze and readout (G0, G1). If FAIL, stop and record it.
2. Review (G2), privacy (G3), registration (G4), amendment drafted and ratified (G4b).
3. Build and merge with the flag off (B). No learner sees a change (T10, T11).
4. Founder approves the flag-on deploy (G5). release-manager records it.
5. Withdrawal: §11.3.

## 13. Objections and open questions

Objections (each with its answer or its owner):

- **O1 (mine): the founder's gate list misses an amendment.** AMD-015 A1 says "A different candidate, or a different cold-start behaviour, needs a further amendment", and AMD-016 says combining with a company candidate needs one. surface-value.md is protected. Serving this candidate without one would break a ratified rule. Answer: added as G4b; owner evaluation-steward, founder ratifies. It does not reorder the founder's five gates.
- **O2 (mine): phase A failed, and this design costs effort before anyone knows whether the session composer passes.** Answer: this EDD is paper only; the build waits for G1. The cost before G1 is the review (G2 can wait until after G1 if reviewers prefer) and one requirement on the criterion (§4.2). If the session composer fails, the only lasting effect is the ADR, which also serves EDD-010.
- **O3 (mine): experiment registration owner.** The founder's record names analytics-steward. Card S8 (tools/org/roles.mjs, analytics-steward out of scope; personalization-eval in scope) moved personalization experiment registrations to personalization-eval. Answer: G4 names personalization-eval as registrar and analytics-steward for the EXP format, index and counter semantics. Board items go to both. If the founder meant analytics-steward to register, the role docs need changing first, which is chief-of-staff's.
- **O4 (mine): reference labels do not match the board.** The model README cites W-1498 and W-1495; on the board W-1498 is a Books100 item (done) and the privacy ruling is filed as W-1916. This EDD cites files, not those ids. Owner: vp-personalization (README).
- **O5 (mine): the off switch vs "always on, no switch".** AMD-015 removed the switch for reachable-v3 only. This design builds one because AMD-008 P4 as drafted applies to other surfaces. If the founder wants this order with no switch too, it goes in G4b, and counsel's W-1766 answer bears on it for 13-15 year olds.
- **O6 (vp-personalization, standing, carried from the decision):** the session machinery may not change phase A's FAIL. Answer: G1 decides; this design serves nothing that has not passed.
- **O7 (personalization-eval, standing, brief response C5):** EDP's coverage metric is circular. Answer for serving: coverage never appears in copy, counters or any pass score; the experiment's success measure is recall (AMD-008 P5), coverage is not logged at all.
- **O8: AMD-008 part P is not ratified (F-19).** The privacy ruling's phase-B rulings rest on part P's P2 as drafted. Answer: not mine; G3 must say whether the ruling still stands without F-19, and G4b may need to carry P1/P2/P5 text for this surface.
- **O9 (mine): one shared glue with EDD-010 couples two designs.** If EDD-010's glue changes, this candidate's behaviour can change without a readout. Answer: ADR-011 makes the glue candidate-agnostic and requires T6 to run against every frozen candidate the glue can import, so a glue change that alters any candidate's display fails check.

Open questions:

- **Q1 (learner-model-engineer, before freeze).** Does the session candidate take `shown` (§4.3, EDD-010 Q-A1 (i)) and export its reason key set and a marker string? Needed before G0.
- **Q2 (head-of-product, with privacy-reviewer).** One learner control or two for signed-in learners (the session switch and AMD-016's matching switch)? And should the session switch sync to the account (a schema change, its own read)?
- **Q3 (lesson-dims-owner).** If the candidate needs a per-lesson attention cost, where is it rated and checked? It is a lesson property and goes into the pilot dims.
- **Q4 (release-manager, founder).** Does AMD-015 Part B extend to this candidate (§8)? Until answered: no.
- **Q5 (personalization-eval).** If cold start (empty history) is not a scored state in the readout, the amendment and release note must say so word for word, as AMD-015 A2 did for v3.
