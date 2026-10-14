# Decision: Life Hacks wave state, the A3 tripwire, and whether W-556 gates Wave J (W-570)

owner: head-of-product (Priya)
date: 2026-10-14
status: decided (three rulings). Board W-570. Nothing here changes a gate, a test or the wave order.
inputs read: `company/domains/lifehacks.md` (growth rules, co-sign A1-A5), `company/domains/lifehacks-scope/README.md` §6.1, `company/domains/briefs/lifehacks.md` "## Wave J" preamble and briefs 6-14, `company/reviews/lifehacks-200/safety-wave-j-2026-10-14.md`, `company/ops/brief-skips.json`, `src/demos/lifehacks/spaced-beats-cram/meta.json`, `company/product/verticals/plan-to-2000.md` §3 and §5. Companion ruling: `company/decisions/2026-10-14-w556-wave-gate.md`.

## What the tree shows (checked 2026-10-14, not taken from the account)

- Life Hacks lessons: 200 on disk, all `review`, 0 `published`. No Life Hacks Domain Launch Review record exists in `company/rituals/records/`.
- `spaced-beats-cram` is `review`. One claim (the recall "why", Cepeda 2006) is `unverified` because no host could open the source (FC pass 35). So the wave-1 exit gate is blocked by a web-access problem as much as by review load.
- Wave J Life Hacks briefs: 9 (ranks 6-14). Safety verdicts: go 6, 7, 10; go with changes 8, 9, 11, 12, 14; 13 not buildable as drafted. All nine use non-default formats, and W-569 (interaction-designer, formats) is open.

## Ruling 1: wave 2 is **not open** on the record. Briefs 8-9 may not be built yet.

- The gate out of wave 1 (README §6.1, charter "Launch gate") is: Sana passes the first 5 Life Hacks lessons at Domain Launch Review, and `spaced-beats-cram` is published. Neither has happened.
- A1 is an exception to the **closure** of an over-cap strand, not to the **wave order**. Its own text says "once its strand's wave is open". So A1 lets digital's two gap concepts in when wave 2 opens, even though digital is at 26. It does not open wave 2.
- Writing 8-9 now was right: a brief costs little to hold, and A2 named them next. They stay written and held.
- **What opens wave 2:** a launch-review record (I chair, the safety reviewer attests) that passes 5 Life Hacks lessons, plus `spaced-beats-cram` published. Nothing else.

## Ruling 2: the A3 tripwire has **not fired**. I restate it so it tests what it was for.

- A3 as written: "if no kitchen brief and no cleaning brief exists at the next OP planning, I reopen the wave order with the founder". Four kitchen briefs exist (11-14), so the literal condition is false.
- Cleaning having no brief is the wave order working, not starvation. Cleaning is wave 4, and no rule prepares it early. cm-lifehacks was right not to write cleaning briefs and right that A2 makes this wave 9, not 10. I do not add an early-prep rule for cleaning.
- The real risk A3 was written for is that kitchen briefs exist but nothing moves, because wave 2 and wave 3 wait on review of the 200. A brief count cannot see that. **Restated tripwire (replaces A3's second bullet):** at the next OP planning, if wave 2 is still not open, or the Domain Launch Review has not been scheduled with 5 candidate lessons named, I take the Life Hacks wave order to the founder, with the trade-off written down (keep safety-class order and wait, or open digital's two gap lessons ahead of the gate). Cleaning gets the same treatment as kitchen one wave later: its briefs and pattern note are prepared during wave 3.

## Ruling 3: W-556's wave gate does **not** apply to the Life Hacks Wave J briefs.

- The plan's gate holds **Wave K** builder claims. These nine are Wave J briefs: written today under "## Wave J", for gap concepts A2 put first. Wave J is "started" in the plan's table and has no entry gate.
- The triage note on W-401 ("Brief order for Wave K; gated by W-556") misfiles them. They are Wave J.
- They are still held, by their own gates: 6, 7 and 10 by W-569 (formats, before any builder claims, cm onboarding step 5); 8-9 by Ruling 1, W-579 and W-569; 11-14 by kitchen (wave 3), the kitchen pattern note W-578, W-579 and W-569; 13 also by its rewrite.
- Priority is not the gate. The drain (P1 items) still comes first in builders' order. Three study lessons do not change that.

## Applied

- `company/ops/brief-skips.json`: **no line removed.** My ruling clears the W-570/W-556 part of every line. W-569 still holds all nine, so removing a line would let `claim.mjs` hand out a brief whose format nobody has confirmed. Each reason now says what still holds it.
- Charter: a dated ruling note added under the co-sign in `company/domains/lifehacks.md` (A3 restated). cm-lifehacks may absorb it into the text.
- Board: W-570 done. A new item for me: schedule the Life Hacks Domain Launch Review once 5 lessons clear every other gate.

## Objections, and what happened to each

| Objection | Raised by | Status |
|---|---|---|
| "A1 now": the task given to cm-lifehacks said digital's gap briefs could go now under A1. | the dispatch to cm-lifehacks (Wave J progress entry) | **Declined.** A1's text conditions on the wave being open. A dispatch cannot widen a charter rule. The cost is real: digital's two demand-3 gaps wait behind a gate that depends on the 200's review pipeline, not on digital's safety. The restated tripwire is how that wait is watched. |
| The wave-1 gate depends on the 200's queue and on web access (spaced-beats-cram's unverifiable claim), not on Life Hacks safety. So the gap strands wait for reasons unrelated to them. | head-of-product (my own A3 cost, restated) | **Accepted, and routed.** The web-capable fact-check session is one of the founder asks in W-556. The Domain Launch Review is now on the board under my name, so it is scheduled, not waited for. |
| Literal A3 means a single kitchen brief disarms the tripwire. | head-of-product (on my own wording) | **Accepted.** That is why I restated it in terms of the wave opening, not brief counts. |
| "Nothing else holds 6, 7, 10" (safety record). | lifehacks-safety-reviewer | **Corrected, not overridden.** True for safety and wave. W-569 (formats before claims) is a separate hold the safety record did not list. |
| Holding the Wave J builds behind the drain wastes ready work. | anticipated, cm-lifehacks | **Declined as a gate, accepted as a cost.** They are not gated by W-556 (Ruling 3). They wait only for W-569, which is quick. |

## This would be wrong if

- the charter or README is amended so A1 overrides wave order (then 8-9 open on safety and W-569 alone);
- a Domain Launch Review happens off the record (then the record is wrong, not the rule: write it down);
- at the next OP planning wave 2 is open and kitchen is moving, in which case the restated tripwire is spent and can be dropped.
