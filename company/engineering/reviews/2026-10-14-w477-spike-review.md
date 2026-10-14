# Engineering Review: 2026-10-14: W-477 /spike S1 fix (c5e050b)

owner: principal-engineer · tier: 2 (security, S1) · author: platform-engineer · branch ccr-4c6c7654-ew9ko1 · not deployed

- EDD: none needed (a fix that narrows an existing route; the spike itself is EDD-003 / SPIKE-001) · ADR: none · Amendment: none (no protected path touched; commit stat: src/lib/spike.ts, src/app/spike/{page,SpikeHost}.tsx, src/app/api/events/route.ts, tests/spike/spike-guard.test.mjs, spike/qa/{playwright.config,security.spec}.ts, package.json script, board, progress)
- [x] The problem is real: production `/spike?cdn=<any>` framed any site under our origin and wrote learner localStorage and /api/events (2026-10-13 eng-review PE finding 1; 2026-10-14 ops review).
- [x] Options: delete the route from the app build vs. gate it. Gating chosen; deleting stays open (see objection 1).
- [x] Blast radius: /spike (harness only) and /api/events (every lesson's beacon, src/kit/progress.ts `track`).
- [x] Rollback is one revert of c5e050b (re-opens the S1; do not revert without a replacement).
- [ ] `npm run verify` on the integrated tree: NOT run (load average 40 on 4 cores; the author was told not to build). Covered by the post-deploy smoke below instead.
- [x] Security: reviewed adversarially below. No dependencies, no new event fields.

Reviewer saw the code before the board write-up. Files read at c5e050b; unchanged in HEAD and in the working tree.

## Evidence

- `npm run test:spike`: 5/5 pass (prod guard, allow-list, frame paths, intake deny, intake allow).
- Extra adversarial probe of the pure guards (scratch, not committed), results:
  - `spikeEnabled`: `NODE_ENV=Development` false, `SPIKE_ENABLED=" 1"` false, `"true"` false, `NEXT_PUBLIC_SPIKE_ENABLED=1` false. Only exact `development` or `1`.
  - `resolveSpikeCdn`: `HTTP://LOCALHOST:3141`, `.../../x`, `...#@evil`, userinfo, `javascript:`, `data:`, `//host`, port-suffix all return the allow-list entry itself. The returned string is always from the list.
  - `frameUrlOn`: `/\evil.com`, `/\t/evil.com`, `/\n/evil.com` refused; `/..//evil.com`, `/%2F%2Fevil.com`, `/ /evil.com` stay on the CDN origin. The `u.origin === cdn` check is the real guard and it holds.
  - `eventWriteAllowed`: Vercel-shaped request (Host = deployment host, X-Forwarded-Host = custom domain, Origin = custom domain, Referer /d/x) ALLOW; feed beacon from `/` ALLOW; Origin `null` DENY; sibling subdomain (same-site) DENY; cross-site Referer without Origin DENY; X-Forwarded-Host `evil, ours` with no other match DENY.

## Adversarial questions, answered

1. **Can production reach the spike (build-time NODE_ENV, static export)?** No, on reading. `spikeEnabled(env = process.env)` reads `env.NODE_ENV`, not the literal `process.env.NODE_ENV`, so the compiler does not inline it; and if it did, the inlined value under `next build` is `"production"`, which is false. `dynamic = "force-dynamic"` means no prerendered HTML is emitted for /spike; `next.config.mjs` has no `output: "export"` and `vercel.json` has no rewrites; there is no middleware. The SpikeHost client chunk still ships in `/_next/static`, but nothing routes to it and it needs the server-chosen `cdn` prop. The remaining path is an operator setting `SPIKE_ENABLED=1` in the Vercel project env; that is a deploy-time check, not a code defect. Confidence: high on the code, unverified on a real build (no `next build` run).
2. **Can a query string become a frame or script source?** No. `?cdn=` only selects; the string used is the allow-list entry. `?only=` filters manifest slugs; `?mode=` is a boolean. Frame `src` is `frameUrlOn(cdn, manifest path)` plus a fragment built from `window.location.origin` and encoded `domainColor`. The manifest is fetched only from the allow-listed origin. Confidence: high.
3. **Does the events guard block legitimate lesson events, including no-Origin browsers?** Not in our app today. The kit sends `navigator.sendBeacon("/api/events", string)`: a same-origin no-cors POST, which current browsers send with `Origin: <our origin>` under the default `strict-origin-when-cross-origin` policy, and Referer of the lesson page. Origin-less requests still pass (curl, old beacons). The intake is anonymous and console-only, so the guard is about browser provenance, not abuse: anyone with curl can still write, and that was true before. Confidence: medium-high (reasoned from the Fetch spec, not observed in a production browser).
4. **Is it safe behind Vercel's headers?** Yes for the deny cases, and the allow case matches the Vercel-shaped probe. Host and X-Forwarded-Host are not settable by a cross-site browser page (Host is forbidden; X-Forwarded-Host would need a CORS preflight, and the route has no OPTIONS handler), and Vercel overwrites X-Forwarded-Host. A non-browser client can set them, but it can also omit Origin, so nothing is lost. Confidence: medium-high; the author's moderate confidence is now reasoned, not observed.

## Findings (problems, not fixes)

None blocking. Non-blocking, ranked:

1. **No production-build evidence.** Nobody has run `next build && next start` or hit a preview with this commit. The claims "/spike is 404 in production" and "lesson beacons still 204 behind Vercel" rest on reading plus unit tests. Covered by the post-deploy smoke (board item added for release-manager, below).
2. **Origin `null` tripwire.** If any page ever adopts `Referrer-Policy: no-referrer` (header or `<meta name="referrer">`), browsers send `Origin: null` on its same-origin no-cors POSTs, and every lesson event from that page would be silently refused with 403. No such policy exists in `src/` today (grep 2026-10-14). Whoever adds one must re-check the intake.
3. **Port-suffixed X-Forwarded-Host** (`host:443`) would not match an Origin without a port. Vercel does not send a port; a different proxy might. Low.
4. **403 vs 204** (author's question). 403 is right: the beacon ignores the response, so learners see nothing either way, and 403 shows up in Vercel logs as a count the analytics steward can watch. A silent 204 would hide a broken guard (finding 2) from everyone.
5. **Harness note.** `spike/qa/playwright.config.ts` sets `SPIKE_ENABLED=1` on its `next start`, but `reuseExistingServer: true` means an already-running server without the flag is reused and the spike QA will see 404. Cosmetic; it fails loudly, not open.
6. When `SPIKE_ENABLED=1` is set, SpikeHost writes a `s3c_session=SECRET-host-cookie` cookie and `s3c:secret` storage on our origin (test fixtures for the negative security test). Harmless in dev; another reason the flag must never be set on the production project.

## Decision

**Approve.** W-477 moves to done. The S1 is fixed in code; it is closed in production only when this commit is deployed (founder approval, release-manager, W-534) and the smoke below passes.

Objections that travel with it:

1. Should the route leave the app build entirely at stage 1 (author's question)? Not now: the gate is two lines, tested, and the spike QA needs the route. Revisit when EDD-003 stage 1 ends: if the spike is not promoted, delete `src/app/spike` and `src/lib/spike.ts`'s spike half rather than keep a dormant gated route. Owner: principal-engineer at the EDD-003 stage review.
2. Origin-less pass is accepted (author's question) because the intake is anonymous and curl could always write; it is not an abuse control and must not be described as one.
3. Post-deploy smoke, owned by release-manager (board item): on the production URL and custom domain, (a) `GET /spike` and `/spike?cdn=https://example.com` return 404; (b) opening a lesson `/d/<slug>` produces `POST /api/events` 204 in the browser network panel and a log line in Vercel; (c) `curl -X POST -H 'Origin: null' .../api/events` returns 403; (d) Vercel project env has no `SPIKE_ENABLED`. If (b) fails, revert the events-route half only and reopen W-477.

## Kudos

- @platform-engineer: put the guards in pure functions with tests for both directions (deny and still-allow), which made this review a probe instead of a build.
