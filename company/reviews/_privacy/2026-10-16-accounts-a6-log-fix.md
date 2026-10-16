# Privacy read: the A-6 log fix on `accounts` (6ff15ba..00bf9b7)

owner: privacy-reviewer (Elif) · date: 2026-10-16 · class: tier-2 privacy read of a logging and telemetry change (EDD-007) · batch: first-light/2026-10-16-r3-quality#B3 · checked by: principal-engineer (answers each finding in his merge record), principal-engineer-ops (reads the verdict for readiness rows A-1 and A-6)

Read, in this order: `git -C /home/user/s3c-acct diff 6ff15ba 00bf9b7 -- src tests/accounts`, the tip's `src/lib/server/{auth,account-api,db,email}.ts` by `git show 00bf9b7:<path>`, `git blame` for which commit owns each line, and a `git grep` for every `console.*` and `stderr` in `src/lib`, `src/app/api` and `tools` at 00bf9b7. Then my own EDD-008 review and M1-M6 re-read. I read the readiness record and the commit messages only after the rows below were written. Tip checked: **00bf9b7** (the named tip; A-13's rebase had not been named to me).

How sure I am about the evidence: I read code and test source. I did **not** run the tests: this host has `psql` but no Postgres server and no `TEST_DATABASE_URL`, so the A-6 test, which needs a real CHECK violation, has not been seen to pass by me. I did not read Better Auth's source; what the library does with `onAPIError.throw` and with `logger.log` is taken from the code's comments and its test.

## Verdict

**verdict: with condition.** A-6 is closed **on reading**: every path that writes a line from the changed code prints only a fixed set of keys and no learner-supplied string. It becomes closed **in fact** when condition A6-1 holds.

- **A6-1 (principal-engineer-ops, on the rebased tip).** The two A-6 tests (`accounts.test.mjs` lines 606 and 636 at 00bf9b7) pass against a real Postgres, and the run output is attached to the readiness record. Reason: the first test is the only check that the library's own output, not just our code's, is clean, and it needs the database. Until then A-1/A-6 stay open.
- **A6-2 (backend-engineer, small).** `failed()` (`account-api.ts` lines 22-27, unchanged in this range) now receives every library error, including ones that used to be handled inside the router. The suite's reused-link test (line 309: `error=INVALID_TOKEN` as a redirect) says the redirect path survives. Please add one assertion that an expired link and a bad token still return the redirect and not a 500 through `failed()`, so `onAPIError.throw` is shown not to turn a learner mistake into a server error and a log line. That is a behaviour question, not a leak, so it does not hold the verdict.

I am not holding the verdict for anything else, and I propose no block.

## One row per changed log or telemetry path

| # | Path | SHA (introduced) and line at 00bf9b7 | What it prints or sends now | Result |
|---|---|---|---|---|
| 1 | Better Auth's logger (all library log calls) | 217414b, `auth.ts` 132 (`logger: { level: "error", log: ... }`) and 89-94 (`libraryLogLine`) | one JSON line: `at`, `accounts: "library"`, `level`, `kind` (constructor name of the first object argument, or `"message"`), and `code` only if it matches `^[A-Za-z0-9_]{1,40}$`. The message string (`_message`) is discarded; no argument is printed. Level stays `error`, so the library's warn, info and debug do not reach the sink | **pass.** An address cannot pass the `code` pattern (no `@`, no `.`). `kind` is a class name. Test 636 feeds a pg-shaped error with `detail` holding an address and shows 5 keys and none of the detail |
| 2 | better-call's own `console.error("# SERVER_ERROR: ", error)` | 217414b, `auth.ts` 134 (`onAPIError: { throw: true }`) | nothing from this path: errors are rethrown to the caller | **pass, on the code's account.** This is the path that would print a whole pg error with the failing row. I rely on the comment (lines 17-19) and on test 606, which asserts `SERVER_ERROR` and `Failing row` are absent from captured stderr and console. Not run (A6-1) |
| 3 | The catch that now receives those errors | not in the range; `account-api.ts` 22-27, 161-174 (blame: 42539127) | `{at, accounts:"error", kind}`, class name only; 503 `not_configured` with no log for a config error | **pass.** Same class-only rule, one place. This is the half of the fix that was already correct; the range makes it the only sink. See A6-2 for the behaviour question |
| 4 | Telemetry from the environment (A-5) | 11da999, `auth.ts` 102-108 (`telemetryVariableSet`) and 117-118; `db.ts` 7-8 | nothing sent. `createAuth` refuses to construct if any name starting `BETTER_AUTH_TELEMETRY` exists in the passed env or `process.env`, any value, empty included. The error carries the variable's **name**, never its value | **pass.** This closes the hole my EDD-008 review recorded (telemetry on from an env var). Test 648 shows 3 names x 3 values, `process.env`, and that a secret-looking endpoint value is not in the message. The refusal is a 503 with no log line, so an operator sees `not_configured` and must read the thrown name elsewhere; a usability gap, not a privacy one |
| 5 | The library's rate limiter, `/magic-link/verify` raised from 5 to 30 per 60 s per IP | ae30e38, `auth.ts` 34 and 141 | no log or telemetry. The limiter keeps raw IPs in memory per instance, as before (my EDD-008 finding F-c, library side); a higher cap holds the same keys, not more of them | **pass, no new field.** Tokens are hashed, single use and 300 s, so the cap does not weaken guessing resistance in any way I can see. `start` stays at 5 per IP and per email (test 570 asserts it). I rule only on privacy; the numbers are backend-engineer's |
| 6 | Other sinks in the accounts code, checked for completeness | unchanged in the range: `db.ts` 20 (pool error: SQLSTATE `code` only), `email.ts` 24 (`status` only) | no address, token, name or row | **pass.** `git grep` at 00bf9b7 finds no other `console.*` or `stderr` write under `src/lib` or `src/app/api` except the one below |
| 7 | **Outside the range, still open:** `src/app/api/events/route.ts` line 17, `console.log(JSON.stringify({ at, ...body }))` | not in 6ff15ba..00bf9b7 | the whole beacon body | **not an A-6 finding; the open C1 of my `exp` ruling.** Listed so nobody reads "no other sink" as "no other unfiltered log". Backend-engineer's beacon branch owns it |

## What the fix does not cover (so nobody reads it as more than it is)

- **Vercel's request log** holds the full URL of `/api/account/auth/magic-link/verify?token=...`, plus IP and user agent. Unchanged by this range, already rated low in my EDD-008 review (token hashed, single use, dead in 300 s) with log retention unknown (E13).
- **Node's own output** for an exception no code catches (an unhandled rejection in a fire-and-forget promise) is outside `libraryLogLine` and `failed()`. I found no such promise in the changed code. I did not search the library for background tasks.
- **Resend's log** of the learner's address is unchanged and not deletable by us (P1.7, G2).

## Objections

None raised against this verdict. The one thing I would resist, if proposed: widening `libraryLogLine` to print the library's message "so failures can be diagnosed". The message is where a quoted row would appear. A new key needs a new read from me, with a test that feeds it an address.

## Next

1. principal-engineer-ops: A6-1 on the rebased tip. 2. backend-engineer: A6-2. 3. principal-engineer: answer each finding above in his accounts merge record; if A-13 changes any SHA, the rows map by commit subject (A-6, A-5, F-f), and I re-read only if a line in rows 1-5 changed.
