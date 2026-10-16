# Privacy re-read: /api/events allow-list, conditions C1 and C2 (0259d92..1145156)

owner: privacy-reviewer (Elif) · date: 2026-10-16 · class: tier-2 re-read of an event-API change · batch: first-light round 2 B2, lane 10 · checked by: lane 10 (evaluation-steward), principal-engineer-ops (readiness row)

Ruling being checked: `company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md`. Read: `git -C /home/user/s3c-beacon diff 0259d92..1145156` (route.ts, events-intake.ts, the test, the readiness record), read-only. Senders read at the tip: `src/kit/Lesson.tsx`, `src/components/Feed.tsx`, `src/kit/types.ts`. I read the readiness record after the code. I ran the test file: `node --import ./tests/lifehacks/register.mjs --test tests/platform/events-allow-list.test.mjs` gives 7 pass, 0 fail (the bare `node --test` fails on module resolution; `npm run test:platform` is the right entry).

## Verdict

**C1: met in code. C2: met in code, and nothing is accepted yet.** The route-line-17 finding (whole-body log) is **addressed**: route.ts no longer reads the body or spreads it; it calls `handleEventPost`, which logs `JSON.stringify(rec)` of a record built only from named keys. Whether P6.1 closes for the gate is a rows decision for the gate owner on the merged SHA; the code part is done.

## C1 per type

| Type | Keys logged (code) | Matches current sender | Extra keys |
|---|---|---|---|
| view, interact, reveal | at, type, slug | yes (Lesson.tsx 50, 64, 71) | not logged (test posts token, email, userId, sessionId, nested, client `at`) |
| predict | + option, correct | yes (Lesson.tsx 57) | not logged |
| recall | + correct, spacedDays | yes (Feed.tsx 260) | not logged |
| complete | + dwellMs | yes (Lesson.tsx 74) | not logged |

- `at` is server time; a client `at` is ignored (tested).
- Unknown type, `__proto__`, `toString` (`Object.hasOwn`), arrays, null, wrong kind, slug empty or over 200: whole event dropped, 204.
- Body over 2048 characters, or declared over 8 KB: not parsed. The 403 guard is unchanged and tested to log nothing.
- The test asserts exact key lists with `deepEqual`, so a new key fails the test. That is the evidence C1 asked for.

## C2 for `exp`

- Accepted only if: no key outside {type, exp, origin, arm, slug, correct, spacedDays}; `exp` matches `^EXP-[0-9]{1,6}$` and is in the server list and before its `closes` date (invalid date accepts nothing); origin in swap, challenge, none; arm, if present, in test, holdout (null is refused); slug 1 to 200 chars and in the catalog; correct boolean; spacedDays in 1, 3, 7, 21. Matches the ruling's definition, and is stricter in refusing any extra key.
- `REGISTERED_EXPERIMENTS` is `[]`, and a test asserts it, so today every `exp` is a silent 204. The control case with a test-injected list logs exactly `at, type, exp, origin, slug, correct, spacedDays` (+arm).
- Catalog is asked last, only for an otherwise valid, registered `exp`.
- Silent 204 holds for every drop; the only non-204 is the W-477 403, as before.
- Note: `type: "exp"` is not in the `FIELDS` table, so it cannot be reached by the generic path.

## The builder's range choices

- **option 0 to 99:** fine. Lessons have a handful of options; 100 values cannot carry an identifier. Accept.
- **dwellMs and spacedDays any safe integer, negatives included (non-exp types):** I accept it as meeting C1, with a residual. A 53-bit integer field can carry a 16-digit value, so a hostile or broken sender could put an identifier-shaped number in the log. No current sender does, and the ruling asked for a pick and caps, not numeric bounds. I would still prefer bounds (dwellMs between about -1 day and +1 day in ms is not needed; any value over a week is not a dwell; spacedDays within plus or minus 36500). This is a **non-blocking recommendation** to backend-engineer, not a new condition. The negatives rationale (clock change) is correct: both are `Date.now()` differences.
- **slug on non-exp types is any string up to 200 characters,** not a catalog slug. So an extra value can still travel in `slug` (an email in a slug is logged). The ruling's cap is met; a pattern such as `^[a-z0-9-]+$` is a cheap tightening I recommend, same status: non-blocking, residual named.

## Not covered, so not passed here

- C3 to C9 are not in this diff. C5 (signed-in network log on the release SHA, no Cookie header) still needs the log. C7 and C8: the readiness notes for W-706 say the right things; they are notes, not built. The `exp` event has no sender yet.
- Readiness section 4 raises a 5.6 MB function-bundle cost from the dynamic catalog import. Not a privacy matter; I have no objection to the pattern-only alternative if it keeps `exp` refused until registration, but C2 says "a catalog slug", so I would want the catalog check back when the first experiment is registered. Decision is principal-engineer-ops's.
- Vercel's function-log retention and whether a log line with the platform's IP is personal data: unchanged, counsel (F-25).
- I did not run a deployed or signed-in request.

## Next

1. principal-engineer-ops: tier-2 decision on the readiness record (still "not given").
2. backend-engineer: optional numeric bounds and slug pattern above; merge-time smoke line from the readiness record.
3. privacy-reviewer: C5 network log on the release SHA when a build exists.
