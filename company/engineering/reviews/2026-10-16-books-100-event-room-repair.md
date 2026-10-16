# Books 100: preserve a historical event with a room alias

Date: 2026-10-16 · reviewer: principal-engineer (Kenji)
Decision: **approve the narrow implementation route below; classify as change tier 1.**

## Defect and evidence

The integrated `npm run verify` stops in `tests/hq/floors.test.mjs` because event `ev-e3ac33ab4b` uses `room: "categories"`, which is neither a drawn room nor an alias. The exact historical event is a 2026-10-16 15:08:11.803Z `books100-manager` dispatch from chief-of-staff to cm-books. Read-only inspection found one canonical event using that invalid room token. The target is explicit in its summary and agent, so its intended room is the existing `cm-books` office.

This is an integration clerk error introduced by this task, not an inherited failure to waive. The log's append-only rule in `company/ops/events.md` prohibits editing or deleting the original event. The unchanged HQ test correctly rejects it. A correction note by itself cannot make that historical token drawable, because the test and timeline retain every old event.

## Minimal repair and owner

Dispatch the existing **platform-engineer**, whose ordinary scope includes `src/lib/**`, to add exactly the historical mapping `"categories": "cm-books"` to the existing `ROOM_ALIASES` in `src/lib/hq-floors.ts`. Preserve the existing `"research-room": "research-lab"` mapping. A short comment may identify the affected historical event so this token is not mistaken for a new canonical room.

This is the established read-time compatibility mechanism: `loadEvents()` in `src/lib/hq.ts` already applies `ROOM_ALIASES[e.room] ?? e.room`. Raw log records, `readAll()` and detail lookup remain unchanged. No new normalization layer is needed. No new room, floor, role, org data, route, event type, event schema, gate or dependency is authorized.

The change is **tier 1**, a reversible shared HQ display/data compatibility mapping. It does not touch the event intake API, learner events, privacy/auth/data stores, protected paths, the lesson contract or the Books engine. The fact that the input is the internal append-only company timeline does not make this a change to the learner event API. It requires the ordinary tier-1 author self-check readiness record, a changelog line and review of the actual final diff by an engineer other than its author; it requires no amendment, EDD or new founder permission. principal-engineer-ops approval is not required for this ordinary tier-1 scope. Escalate if implementation expands beyond that scope.

## Append-only historical correction

The integrating **chief-of-staff** owns one new `note` event, in canonical room `cm-books`, with `corrects: "ev-e3ac33ab4b"` and references to this ruling and the repair commit. Explain that the dispatch targeted cm-books and `categories` was the clerk's invalid room label; the historical bytes are retained and the alias supplies the display location. A note must not masquerade as a second dispatch/report or change a run's open/closed state. Do not repeat the original event ID, timestamp or dispatch key.

Use the existing events CLI's `--corrects` support. Neither this reviewer nor the platform implementer edits the shared log. Future events use the canonical `cm-books` room; `categories` is a compatibility token for this historical error, not a new category-wide room or a reason to route other managers to Books.

## Validation and completion

1. Preserve original event `ev-e3ac33ab4b` byte-for-byte. Its append-only correction is a new event; no history rewrite or deletion.
2. Inspect the actual one-line alias diff and confirm `cm-books` is an already drawn room. The unchanged HQ test checks all alias targets.
3. Run `npm run test:hq`: the entire HQ suite, including the existing event-room test, must pass. Do not edit, skip, weaken or filter the test.
4. Run `npm run check` and the required integrated verification. Record any remaining inherited C2/feed failures separately; fixing this task's own HQ defect does not turn them green. Tier-1 typecheck/build/verification remains required under the normal integration workflow, with actual commands/results recorded.
5. Recheck task scope and the frozen Books rendering/payload hashes. This is an explicit narrow addition to the prior Books-only source-path statement: **one internal HQ compatibility alias plus its ordinary records**, required to repair the task's own event. Final PR scope must say so rather than claim no non-Books source change.

The 100 Books payloads, seven model calculations, renderer/state, controls and lesson assets are not changed by this alias. If their hashes stay identical, this mapping alone does not require repeating the 200 lesson contract cases or 100 phone-fit runs; preserve their existing exact-identity evidence. HQ and integrated checks still must run as above.

## Rollback and objections

Revert the alias commit to restore the prior mapping, with no data migration; the historical HQ test then correctly fails again until the room is representable. The append-only correction remains a truthful record and is not removed on rollback.

- **Do not suppress an integration error with a test waiver:** accepted. Repair the production HQ compatibility data; keep the judge unchanged.
- **A generic old room name could silently misroute future events:** accepted and bounded. Document the one historical use, write future events with canonical room IDs, and add no new generic room semantics.
- **The prior scope claimed Books-only source:** accepted as a real scope delta. Name this narrow clerk-error repair in the PR and final scope evidence; do not call it inherited or hide it among documentation.

This ruling permits the bounded repair dispatch and defines its checks. It does not claim the unimplemented patch has passed, and gives no merge, publication or deployment authorization.

## Finite addendum: complete historical-room inventory

The complete scan supersedes the initial one-token scope above: **ten task-owned historical dispatches use four invalid room tokens**. The first run found only the first failing token. This is a finite correction of this task's clerk errors, not an open-ended alias cleanup. I inspected all ten exact event records and the existing canonical role homes in `tools/events.mjs` and drawn rooms in `src/lib/hq.ts`.

**Approve exactly these four compatibility entries in the existing ROOM_ALIASES map**, preserving `research-room`:

| Historical token | Count | Existing display destination | Meaning |
|---|---:|---|---|
| `categories` | 1 | `cm-books` | The original explicit cm-books dispatch |
| `leadership` | 1 | `product` | The original Head of Product dispatch |
| `quality` | 1 | `constitution` | The original evaluation-steward dispatch |
| `design` | 7 | `design-studio` | Legacy grouped product/design-workspace display marker; not every recipient's canonical home |

There is no one-to-one original role home for the historical `design` token. Four records target design-lead/interaction-designer, whose canonical home is `design-studio`; three target learning-designer, whose canonical home is `studio`. **The alias supplies one existing room for plotting the legacy group token, not a claim that the three learning dispatches originally had canonical room design-studio.** Preserve this distinction in a source comment and the correction notes. Future role-specific events use their actual canonical homes.

The alternative, introducing an event-ID-specific normalizer or changing the reader/data schema, adds a new mechanism solely to relocate ten historical markers. It is unnecessary here: the legacy group marker plus explicit append-only per-event correction preserves both display compatibility and the correct role-routing account. Do not invent a new combined room, reseat a role, rewrite historical records, alter `loadEvent`, or change the HQ test.

### Exact corrections owned by chief-of-staff

Append ten distinct `note` records, each with `corrects` naming its original ID and a fresh timestamp/ID. Use the canonical room in this table for the **new correction note**, and state the original invalid token, intended recipient and correct role home. For each of the last three rows, also explain that the legacy `design` marker is drawn in design-studio only as a grouped historical workspace marker; the correction is in learning studio.

| Original event | Recipient / run | Room of new correction note |
|---|---|---|
| `ev-e3ac33ab4b` | cm-books / books100-manager | `cm-books` |
| `ev-88a894d86b` | head-of-product / books100-product | `product` |
| `ev-af9ed7a69d` | evaluation-steward / books100-quality | `constitution` |
| `ev-0000aadee7` | design-lead / books100-design | `design-studio` |
| `ev-cef623b38e` | design-lead / books100-design-final-route | `design-studio` |
| `ev-b72b3b26a5` | interaction-designer / books100-design-review | `design-studio` |
| `ev-7536d5e080` | interaction-designer / books100-design-final | `design-studio` |
| `ev-4bedd5c3fe` | learning-designer / books100-learning | `studio` |
| `ev-dc7275d154` | learning-designer / books100-learning-briefs | `studio` |
| `ev-75cca6823a` | learning-designer / books100-learning-final | `studio` |

If the first correction note already exists, do not create a second identical correction; retain it and append the other nine. The historical dispatch key/state semantics remain unchanged. A correction note is not another dispatch or report.

### Scope, checks and actual-diff review

The classification remains **tier 1**, same existing platform-engineer owner and one ordinary `src/lib/hq-floors.ts` change plus self-check/changelog/review records. Only the finite four aliases above are authorized. Scan all timeline room tokens after the patch; zero unmapped rooms and all alias destinations already drawn are required, followed by unchanged full `npm run test:hq`, check and normal integrated validation. Original ten event lines remain byte-identical. Preserve Books runtime/payload hashes and state the explicit narrow HQ compatibility exception in final scope.

Principal-engineer will inspect the actual final platform diff before this repair is called reviewed. This addendum approves implementation scope, not an unseen patch or test outcome. No founder permission, constitutional amendment, test weakening or new room is implied.

## Actual platform diff reviewed

**Reviewed and approved:** platform-engineer commit `5de9d2c744bcb40529741184aa3599664248aa1b`. I read its actual source diff and [tier-1 self-check readiness record](../readiness/2026-10-16-books-100-hq-room-alias.md) through read-only `git show` before integration.

The source diff touches only `src/lib/hq-floors.ts`: it preserves research-room, adds exactly the four finite mappings in this addendum, identifies the categories event and explicitly says the legacy design group marker does not move learning-designer's canonical studio home. The other commit files are its ordinary readiness, changelog and F-39 memory records. No new reader/normalizer, room/floor/role, event schema/API, raw log, Books source, dependency, protected path or test is changed. No code defect found in the final patch; this satisfies the tier-1 other-engineer diff review.

The author records the unchanged full HQ suite **65/65 passed, zero skips**, a complete scan with zero unmapped timeline rooms/zero missing targets, and company check passed at 1,074 lessons/5,797 claims. Those are inspected author validation results, not a second HQ execution by this reviewer. Root still owns integrated verification and append-only correction notes for the ten exact events, preservation of original bytes and final source-scope disclosure. This review does not claim those integration steps are already complete or any inherited failure has passed.

### Integrated commit and correction-note confirmation

The integrated patch **`3155e779ceaf63b7eaadb631ce82d647af389875` is reviewed and approved** within the same tier-1 scope. I read its actual diff and readiness record independently; the `src/lib/hq-floors.ts` blob is exactly `20fa8a4e6ad36961e7b65a46f265687895719927`, identical to the previously reviewed platform commit. No extra code, test, gate or room change was introduced by integration.

Read-only comparison of the current timeline with pre-repair commit `5479029c` confirms **all ten original event lines remain byte-identical**. There are exactly ten new `note` corrections covering ten distinct original IDs. Their canonical rooms match this addendum's table, including all three learning-designer corrections in `studio`. This closes the append-only correction and actual integrated-diff review requirements. Root's integrated verification/typecheck/build and final scope packaging remain separately recorded; no inherited C2/feed pass or production permission is claimed here.
