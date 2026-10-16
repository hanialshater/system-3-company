# Readiness approval: /api/events field allow-list and `exp` validation (W-999, W-1181)

approved-by: principal-engineer-ops · date: 2026-10-16 · change-tier: 2 (event API: `src/app/api/**`, `src/lib/events*`) · board: W-999, W-1181 · related: W-706 · risk: none added or closed
record approved: `company/engineering/readiness/2026-10-16-events-allow-list.md` **on branch fl-beacon at 1145156** (code at 7e5207f; /home/user/s3c-beacon). It is not on main. The approval is in this separate file because the branch is not merged and that worktree is read-only to me. When fl-beacon merges, the chief of staff copies the Decision line below into the record's "Approval" section and links this file.

This is not my area. backend-engineer wrote it. The ruling it implements is privacy-reviewer's (company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md, C1 and C2).

## Decision

**Approved, with conditions E1 to E4, to merge at 7e5207f + 1145156.** It ships only in a founder-approved deploy, like every other change. I agree that no EDD is needed: it adds no route, dependency, stored field or store, and it narrows what the route logs.

**Section 4 trade: I rule for the catalog check (full C2), not the slug pattern (C2 partly met), for this change only.** Reasons:
- A privacy condition met only partly is a standing finding that someone has to remember. 5.6 MB of traced files that are never loaded is a cost we can measure and remove later.
- With `REGISTERED_EXPERIMENTS` empty, the dynamic import is never reached (probe below: `expDefaultListEmpty` → null, and `isCatalogSlug` is only asked after every other check passes). The common beacon path loads nothing new.
- The function stays far under Vercel's function size limit (250 MB unzipped, from my memory of Vercel's docs; I did not check it today).

The trade is **not** accepted for good. E1 makes the first experiment registration pay it off.

## What I checked (my own runs, in a clean detached worktree of 1145156 under my scratchpad; no build, no server, nothing written to /home/user/s3c-beacon)

| Question | Command | Result |
|---|---|---|
| The record's tests | `node --import ./tests/lifehacks/register.mjs --test tests/platform/events-allow-list.test.mjs` | **7/7 pass**, 0.96 s |
| Is the 5.6 MB new to this function? (the record says "not measured") | Summed the non-`node_modules` files in `server/app/api/events/route.js.nft.json` of two existing builds of the old route in /home/user/s3c-qa (`.next-lr`, `.next-review2`, bc0edc0, route still has `...body`), read only | **6 files, 130,653 and 130,658 bytes.** The record gives 5,740,034 bytes at 7e5207f. The belief holds: about **+5.6 MB, about 44 times the old trace** |
| `exp` accepted only when registered, open, in the catalog, and with exact keys | probe script calling `pickEvent` | registered + open + catalog slug → logged with exactly `at, type, exp, origin, slug, arm, correct, spacedDays`. Default (empty) list, non-catalog slug, extra `email` key, `closes` day reached, no `isCatalogSlug` → **all null** |
| Existing types keep their fields and lose extras | same probe | `predict` with an extra `token` → `at, type, slug, option, correct` only. `option: "1"` (string) → dropped. `recall` without `spacedDays` → dropped. `complete` with `dwellMs: -5` → kept (on purpose, per the record) |
| Prototype keys | same probe | a JSON `"__proto__"` key on a view → `at, type, slug` only. `type: "__proto__"` → dropped |
| Caps | same probe | 201-char slug → dropped. A 3 KB body through `handleEventPost` → 204, nothing logged |
| Senders send what the table requires | read `src/kit/types.ts` `LessonEvent`, `src/kit/Lesson.tsx` lines 50 to 74, `src/components/Feed.tsx` line 260 | Every send carries every field its type's table requires. No sender is dropped by the new checks |

## Conditions

1. **E1, before the first `REGISTERED_EXPERIMENTS` entry (backend-engineer; that change is tier 2 and needs its own readiness record):** take the catalog out of the events function's trace. Do the catalog check against a slug-only list built with the registry (for example a generated slugs file next to `src/demos/index.generated.ts`, written by `tools/registry.mjs`), not against `@/lib/catalog`. If that is not done, that record must measure the cold start of an accepted `exp` event and of a plain `view` on a preview deployment, and the function's traced size. Then I rule again. A registration record that has neither is refused.
2. **E2, post-deploy (release-manager, the first founder-approved deploy that includes 7e5207f):** run the record's smoke line (section 2). The function log line must have `at, type, slug` and nothing else. Write the result on W-999. If it shows any other key, revert 7e5207f in the next deploy and tell privacy-reviewer.
3. **E3, closing the P6.1 finding (privacy-reviewer, her next move 5):** this approval does not close P6.1 or the C1 and C2 conditions. Her re-read of the diff does. Merging does not wait for it, because the change only narrows what is logged.
4. **E4, rollback pairing (whoever reverts):** a revert of 7e5207f brings back the full-body log (P6.1). It needs a privacy-reviewer note in the same session, as the record's section 3 says.

## Findings that do not block

- **F1 (backend-engineer, optional; W-706 is a good place for it):** the 8 KB `Content-Length` check is only advisory. A chunked body with no `Content-Length` is still read whole by `req.text()` before the 2,048-character check. This is not a regression (the old `req.json()` read the whole body too), and Vercel's request body limit bounds it. A streamed read that stops at 2,048 characters would make the cap real.
- **F2 (analytics-steward to decide, at registration):** `isCatalogSlug` in route.ts matches `allDemos`, which includes drafts and retired lessons. C2 says "a catalog slug", so this meets it. Whether an `exp` row for a retired lesson should count is an analysis question, not a readiness one.

## What would make me revoke it

- Any accepted line in the function log with a key the record's section 6 does not list.
- The route answering anything but 204 or 403.
- A drop in beacon log lines after deploy that someone notices and that is traced to a legitimate sender being refused. (There is no meter, W-706, so this rests on E2 and on anyone who reads the log.)
- An `exp` entry registered without E1.

## Believed, not checked

- The 5,740,034-byte trace at 7e5207f is the author's figure. I did not build (host load about 18, and the brief rules out a production build). I measured only the old route's side.
- That the dynamic `import("@/lib/catalog")` resolves inside the deployed route (catalog imports `server-only`). It is never reached in this change, so nothing can fail on it yet. E1 removes the question.
- That traced but unloaded files do not add to cold start in a way that matters (about 80%). This is why E1 asks for a measurement if the import stays.
- The builder's verify (1,940 QA passed, one registry-split failure on 3 new lessons awaiting fact-check) is the caller's report. I did not rerun it, and that failure is not in these paths.

## Objections raised, and what happened to each

- *The author: "the alternative is a slug pattern, which meets C2 only partly; the trade is left to principal-engineer-ops" (section 4).* Ruled: catalog check now, and E1 removes the bundle cost before it can matter. Neither option the author offered is kept for good: the slug-only generated list is a third option that meets C2 in full without the trace.
- *The author: "if principal-engineer-ops or principal-engineer think it needs an EDD, that is a finding against this record."* No EDD needed (see Decision). principal-engineer can disagree in a review; none is on record.
- *My own objections:* the bounded read (F1) and the drafts in the catalog (F2) do not block and are routed above. The unmeasured old trace is now measured (table).
- No other objections are on record for this change.
