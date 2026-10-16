# Privacy ruling: the shared experiment beacon event (`type: "exp"`) and its local markers

owner: privacy-reviewer (Elif) · date: 2026-10-16 · board: W-1123 · batch first-light/2026-10-16-round-1#3 · class: tier-2 privacy review of an analytics change (EDD-007) · read once for **PRD-003 §6 R12** and **PRD-004 §9** · route: analytics-steward (registers both experiments, needs this first) → backend-engineer (route.ts) → growth-designer (sender and markers) → principal-engineer (kit boundary)

Read: PRD-003 R12 and its rows in the gate table; PRD-004 §9; `src/app/api/events/route.ts`; `src/kit/types.ts` (`LessonEvent`); `src/kit/progress.ts` (the `track()` call); the gate rows P6.1 to P6.5 and section 7.2 (`company/initiatives/first-light/privacy-gate.md`); my EDD-008 review. I read no code that implements the event, because none exists. This is a ruling on a design.

Status of the yardstick: the gate is **proposed** until the founder takes it at the 10-23 review. This ruling applies it as written. It binds the PRDs only if the founder accepts the gate; if the gate changes, I re-read. I am not approving a proposal of my own: the event is growth-designer's.

## Ruling: **conditional pass**

The design is acceptable **if and only if conditions C1 to C9 hold**. The event, as drafted, adds no identifier and no free text, and I would not block it for what it carries. I block it, as drafted, for what the route does with it: **today the route logs the whole body (route.ts line 17), so the allow-list the PRDs rely on does not exist.** C1 comes first, and nothing in this ruling lets the `exp` event ship before it.

| Row | Result | Reason |
|---|---|---|
| P6.1 allow-listed fields, per type | **conditional (C1, C2)** | `exp` is a new type with 7 fields. It passes only with an explicit per-type field pick and enum or pattern validation of each field. The existing route fails P6.1 for every type today |
| P6.2 still no identifier | **pass in design (C5, C6 keep it)** | No user id, no session id, no token, no cookie. The arm and origin are 1-bit and 3-value enums, constant per browser, not unique. The beacon looks the same signed in or anonymous |
| P6.3 retention | **conditional (C7)** | No persistence by us exists. Raw `exp` events at most 90 days, and the registered experiment ends the collection earlier |
| P6.4 kill switch, GPC and DNT | **conditional (C8)** | `exp` must obey the same switch, which is build-time today; the run-time switch is W-706's. `exp` also needs its own off switch, because an experiment must be able to stop alone |
| P6.5 local event log | **unchanged, and tied in (C4)** | The `exp` event must not be written to `s3c:events:v1`; the logless local store is already a finding |
| P1.2 anonymous means local | **pass in design** | The markers (D5) stay on the device. Opening a swap link writes nothing on the server (PRD-003 S rows) |
| Gate 7.2 item 1 and 4 | **pass** | No identifier is added. A per-tab random id in memory is allowed by 7.2 item 4 but is **not needed** here and is not to be added |

## What the event may be (the one definition both PRDs use)

Defined **outside `src/kit/`**; the kit stays unchanged (`LessonEvent` is the kit contract and protected).

```
{ type: "exp",
  exp:    "EXP-<n>"                      // from a server-side list of registered experiments
  origin: "swap" | "challenge" | "none"  // enum
  arm?:   "test" | "holdout"             // enum; PRD-004 only; absent for PRD-003 unless the analytics steward adds a randomised arm
  slug:   <catalog slug>                 // same value the recall event already sends
  correct: boolean
  spacedDays: 1 | 3 | 7 | 21 }          // the schedule
```
The server adds `at`, as for every event. Nothing else is accepted: **no token** (`/s/<token>` must never reach the beacon, the marker or a log), no sender, recipient, account or challenge id, no counts, no durations, no timestamps from the client, no free text.

## Conditions

**C1 (blocks everything, backend-engineer).** Fix P6.1 for **all** types in the same change that touches `route.ts`: log an explicit pick of fields per type, never `...body`, with a cap on string length; a POST with an extra key must not log the key. A unit test posts extra keys and shows they are not logged. Until this is merged, the `exp` type is not accepted.

**C2 (validation).** For `type: "exp"` the server accepts a record only if every field passes: `exp` is in the server's list of registered experiments (a constant that the analytics steward's registration creates and that carries an end date after which the server drops the type); `origin` and `arm` are members of the enums above; `slug` is a catalog slug of at most 200 characters; `correct` is a boolean; `spacedDays` is one of the schedule values. Anything else is dropped silently with a 204, as today. This is what makes "an enum with no identifier" true in the log and not only in the PRD.

**C3 (send only when needed, analytics-steward decides).** Send the `exp` event **only** when a marker or an arm exists for that browser. Do not send `origin: "none"` for every recall in the feed: the ordinary `recall` event already carries `slug`, `correct` and `spacedDays` for the comparison group, and sending a second copy for everyone doubles the volume of a field we are trying to keep minimal. The comparison is then aggregate (recalls minus the marked ones), which the analytics steward must show works before registering, **or** the steward names why a "none" copy is needed and I read that reason. This is the smaller design if the steward cannot accept it. The steward may also drop `slug` from `exp` if lesson-level matching is not used, and may replace the event altogether with something that needs less (both PRDs say so). I would pass any strict subset of the fields above without re-review.

**C4 (local markers, growth-designer builds, analytics-steward owns).** The markers are new device storage and each key is in the data inventory (D5):
- `s3c:origin:v1` holds, per slug, the origin **enum only**. Never a token, a sender, a link or a timestamp from the swap. Removed for a slug once that lesson's first revisit has been answered, and in any case 30 days after it was written (the first revisit comes due in 1 day, the schedule is 1, 3, 7, 21).
- The arm assignment (PRD-004's random 20%): one key holding the enum, written once, removed when the experiment closes. It is the only value allowed to persist beyond one lesson. It is never sent as anything but the `arm` enum, never on any other event, and never with the account.
- Neither marker is uploaded by the account merge (EDD-008 §8 uploads the progress map only), is in the account export, or is read by any personalization rule (P3.2). Deleting the account does not need to touch them; "also clear this device" does.
- Neither is written to `s3c:events:v1`, and the `exp` event is not stored locally.
- The marker records that a learner opened a friend's swap or a challenge. On a shared device that is visible to the next user of the browser; the data is small, and I accept it as the cost of measuring. The inventory says so.

**C5 (no identifier, ever).** The event is identical for a signed-in learner and an anonymous one, with no `Cookie` header on `/api/events` (the account cookie is `Path=/api/account`). A signed-in network log on the release SHA is the P6.2 evidence (qa-tester's log, reused). No per-tab session id is added for the experiment: the arm and the aggregate comparison make it unnecessary. If the analytics steward later needs one, 7.2 item 4 allows an in-memory per-tab random value with a new read from me.

**C6 (no join to anything that identifies).** `exp` events are analysed only as aggregates by `exp` + `origin` + `arm` + `spacedDays`. They are never joined to account rows or to the swap and report tables, and no export of raw rows goes to anyone without a new review. Cells under 20 events are not reported by arm. The Vercel request log (IP, user agent) sits beside the event on the host, as it does for every beacon event; the lawyer question in gate 7.1 (is the beacon personal data once the host's IP is beside it, and for visitors who say they are under 13) is **unchanged and still open**. The `exp` event adds one inference to that question: an IP that sent `origin: "swap"` was reached by a swap. I flag it for counsel; I do not decide it.

**C7 (retention).** Raw `exp` events at most 90 days (P6.3), then aggregates only, and the analytics steward deletes the raw rows at the experiment's close if that is sooner. Until W-706 persists events the only copy is Vercel's function log, whose retention is **unknown** (E13, not landed). The inventory records both.

**C8 (kill switch and signals).** The `exp` type obeys the global switch and sends nothing when the browser sends Global Privacy Control or Do Not Track (P6.4). It also has its own off switch, so a harmful experiment (both PRDs name a harm condition: -3 points) can be stopped without a rebuild.

**C9 (where the code sits).** The PRDs say the recall card sends the event "outside the kit". If the only place to send it is inside `src/kit/`, that is a **kit amendment**, not a change inside this ruling. principal-engineer says where it sits before the build run. The ruling covers the event and the markers, not a kit change.

## What I did not decide

- Whether the event, in the platform log with an IP, is personal data, and whether it matters for under-13 visitors: **counsel (F-25), gate 9.1 and 9.3.** My mitigation is C1 to C8 and a short log retention number from E13.
- The experiments' design, power, thresholds or whether they should run: analytics-steward and head-of-product. The privacy cost of a harmful arm is theirs to weigh; I only say the design may not carry more than this.
- Anything in PRD-003 beyond R12: the swap tables, moderation and the §5.3 read wait for F-26 and the founder's answer on "light social". **This ruling is not a pass on the PRD-003 feature**, and a pass here does not change that.

## Objections

None raised against this ruling yet. The two the PRDs anticipate are answered as follows.
| # | Objection | Answer |
|---|---|---|
| 1 | growth-designer (PRD-003 objection 6): "without it section 8 cannot be measured and the swap does not ship" | The event is allowed under C1 to C9. C3 says what smaller design passes without re-review if the steward wants less. C1 is the one cost that blocks, and it is a fix the gate asked for on 10-15 |
| 2 | analytics-steward (anticipated): "the 'none' copy for every recall is needed for the comparison" | C3: say why and I will read it. The default is that the existing `recall` event is the comparison |

## Next move
1. **analytics-steward:** register EXP for PRD-003 and PRD-004 on this definition, answering C3. Round 2 of the dispatch needs this ruling first.
2. **backend-engineer:** C1 and C2 in `route.ts`, with the tests; C7 and C8 in the W-706 design.
3. **principal-engineer:** C9, the kit boundary.
4. **growth-designer:** C4 in both PRDs' markers; correct R12 to the definition above (the two PRDs disagree on `arm`).
5. **privacy-reviewer:** re-read the diff when C1 and C2 land, and the signed-in network log on the release SHA (C5). Board items for 1 to 4 are for the caller (I did not touch the board).
