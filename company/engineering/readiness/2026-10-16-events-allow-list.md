# Operational readiness: /api/events field allow-list and `exp` validation (privacy ruling C1, C2)

```
change: /api/events logs an explicit pick of fields per type (never the body), caps slug at 200 chars and the body at 2048, drops wrongly typed events; type "exp" is accepted only when every field validates against a server-side REGISTERED_EXPERIMENTS list that is empty in this change
change-tier: 2
paths: src/app/api/events/route.ts, src/lib/events-intake.ts, tests/platform/events-allow-list.test.mjs
author: backend-engineer
board: W-999, W-1181
risks: none added or closed; see 7 (proposes a re-read of the P6.1 finding as met when merged)
links: company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md (C1, C2, C7, C8); company/initiatives/first-light/privacy-gate.md P6.1 to P6.4; EDD-007; branch fl-beacon (/home/user/s3c-beacon), commit 7e5207f
```

Status: **not approved.** Tier 2 because it touches the event API (`src/app/api/**`, `src/lib/events*`). The approver is principal-engineer-ops. The author does not approve it. No EDD: the change narrows an existing route to a ruling's definition, adds no route, no dependency, no data field and no storage. If principal-engineer-ops or principal-engineer think it needs one, that is a finding against this record.

## 1. What can fail

- **A legitimate event is dropped.** The new checks drop an event whose field is the wrong kind (for example `option` not an integer 0 to 99, `dwellMs` not a safe integer, slug over 200 characters). The current senders (`src/kit/Lesson.tsx`, `src/components/Feed.tsx`, typed by `LessonEvent` in `src/kit/types.ts`) send only values that pass. Negative `dwellMs` and `spacedDays` (a clock change) are still accepted on purpose. Who sees it: only us, as fewer log lines. Learners see nothing: the answer is 204 either way and `sendBeacon` ignores it.
- **An existing field is lost.** None is: every field in `LessonEvent` for each of the six types is in the pick table, and the test asserts the exact key list per type. No code reader of the log lines exists (grep of `tools/`, `src/`, `tests/` for `dwellMs` and `spacedDays` finds only the senders and the type).
- **Worst case:** the route throws for every request. It cannot answer anything but 204 or 403: the parse and pick sit in a try/catch, and the W-477 guard is unchanged and tested.

## 2. How we would know

- `npm run test:platform` (in `npm run verify`) runs `tests/platform/events-allow-list.test.mjs`: exact logged keys per type with extra keys posted, the drop cases, the empty experiment list, and the 403 guard.
- In production there is **no meter** for the event volume (the logs are Vercel's function log only, no persistence by us; W-706). A drop in beacon lines after the deploy would be seen only by someone reading the function log. That gap already exists for the beacon and is W-706's; I do not add a risk for it here.
- Post-deploy smoke line for release-manager (text, not a runbook edit): `curl -s -i -X POST -H 'content-type: text/plain' --data '{"type":"view","slug":"x","extra":1}' https://<host>/api/events` shows `HTTP/... 204`, and the function log line for it has the keys `at, type, slug` only.

## 3. How to roll back

`git revert 7e5207f` (one commit, three files), then the next founder-approved deploy. No data is lost: nothing is stored by us. Rollback brings back the P6.1 finding (full-body log), so it should be paired with a privacy-reviewer note. It needs the founder only for the deploy itself.

## 4. Capacity

- Request path: one bounded `req.text()` (skipped when `Content-Length` declares more than 8 KB), one `JSON.parse`, a fixed table walk. No new I/O. Same as before in practice.
- **Function bundle (for the approver to rule on).** `route.ts` reaches the catalog through a **dynamic** `import("@/lib/catalog")`, only for an `exp` event that has already passed every other check (so never in this change, with the list empty). Next still traces it: in the build at 7e5207f, `.next-beacon/server/app/api/events/route.js.nft.json` lists `chunks/src_demos_..._.js` at **5,607,426 bytes** and `chunks/src_lib_catalog_ts_..._.js`; non-`node_modules` traced files total 5,740,034 bytes. I did not measure the route's trace on main, but the old route imported only `src/lib/spike.ts`, so I believe the 5.6 MB is new to this function. It is not loaded on the common path, so I expect no cold-start cost, but the deployed function is larger. The alternative is to check the slug with a pattern (`^[a-z0-9-]+$`, at most 200) and do the catalog check when the first experiment is registered. That meets C2 only partly ("a catalog slug"), so I chose the catalog check and leave the trade to principal-engineer-ops.
- CI, host, Vercel quota: none beyond one more unit test file (about 2 s).

## 5. Security

- No new route, parameter, header read, secret or permission. The W-477 guard (`eventWriteAllowed`) is called first, unchanged.
- What a stranger can do with a URL is narrower than before: they can no longer put arbitrary keys or long strings into our function log (log injection of a token or an email address through `...body` is gone).
- Prototype keys: `type: "__proto__"` or `"toString"` are refused (`Object.hasOwn` on the table), tested.

## 6. Data

- Writes: one `console.log` line per accepted event to the function log, as before. Fields: `at` (server time) plus exactly the `LessonEvent` fields for the type (`view`, `interact`, `reveal`: `slug`; `predict`: `slug, option, correct`; `recall`: `slug, correct, spacedDays`; `complete`: `slug, dwellMs`). For `exp`, once a registered experiment exists: `exp, origin, arm?, slug, correct, spacedDays`, the ruling's definition and nothing else.
- Fewer data than before: extra keys and client `at` are no longer logged. No identifier is read or added (P6.2 unchanged: no cookie, no IP read by our code, no session id). Retention is Vercel's function log (unknown, E13), unchanged.
- privacy-reviewer is consulted through her re-read of this diff (her next move 5, lane 10 via evaluation-steward). This record does not claim her pass.

## 7. Risks

None added. When merged, the P6.1 finding (route.ts logs the full body, privacy-gate section 7 finding and the ruling's C1) is met in code. Whether it closes is privacy-reviewer's ruling, not mine. No risks.json entry names it, so nothing to re-score.

## Notes for the W-706 design (C7 and C8; not built here)

- **C7 retention.** When W-706 persists events: raw `exp` rows at most 90 days, then aggregates only (by `exp`, `origin`, `arm`, `spacedDays`), and deleted at the experiment's close if that is sooner. Never stored with an IP or user agent. Until then the only copy is Vercel's function log, retention unknown (E13). The persisted schema should take the logged record from `pickEvent` as its only input, so the allow-list is the store's schema too.
- **C8 switches.** (a) Global: `NEXT_PUBLIC_EVENTS` is build-time today; W-706 needs a run-time switch (an env read on the server per request, so the intake can drop everything without a rebuild, plus the client not sending). (b) Signals: the sender sends nothing under Global Privacy Control or Do Not Track; the server can also drop `exp` (and, if analytics-steward agrees, all types) when `Sec-GPC: 1` or `DNT: 1` arrives. Not done here, because the item limits C8 to notes and dropping existing types is a measurement change (analytics-steward). (c) Per experiment: `REGISTERED_EXPERIMENTS[].closes` already stops one experiment, at the cost of a rebuild. W-706's run-time switch should accept a per-`exp` off list too, so a harmful arm (-3 points, both PRDs) stops without a rebuild.
- **Registering an experiment** is a code change to `REGISTERED_EXPERIMENTS` in `src/lib/events-intake.ts` (tier 2, event API), with `id` and `closes` from analytics-steward's registration. If an experiment never has an arm, analytics-steward can ask for `arm` to be refused for it; today `arm` is optional for every experiment.

## Approval (tier 2; written by principal-engineer-ops)

- Decision: **approved with conditions E1-E4** by principal-engineer-ops (copied by chief-of-staff at merge, 2026-10-16); the catalog check stays for this change, and the catalog leaves the events bundle before the first experiment registers (E1). Authority: `company/engineering/readiness/2026-10-16-events-allow-list-approval.md` (790efeb).
