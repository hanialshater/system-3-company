# Readiness approval: lh-home-locked-stage-addendum (Home engine locked stage)

approved-by: principal-engineer-ops · date: 2026-10-16 · change-tier: 2 · board: W-1258, W-1241, W-1247, W-1299 (and W-1094 for 1b5fa53)
record approved: `company/engineering/readiness/2026-10-16-lh-home-locked-stage-addendum.md` **on branch lh-engine-locked at 387ab8c** (a2f14c3 engine, 1b5fa53 group-cables dots, 110ac21 tests, 387ab8c record + changelog). The branch is not merged and its worktree (/home/user/s3c-eng1) is read-only to me, so the approval lives in this file. When the branch merges, the chief of staff copies the Decision line into the record's "Approval" section and links this file. This file is the authority until then.
parents: 2026-10-15-lh-home-template-tp1-tp2.md, 2026-10-15-lh-home-w2-addendum.md, 2026-10-16-lh-home-w3-addendum.md (approval 2026-10-16-lh-home-w3-addendum-approval.md)

## Decision

**Approved, with conditions, for the code and tests at 387ab8c** (and any later commit on the branch that leaves `src/`, `tests/` and `package.json` unchanged). `git diff 110ac21 387ab8c` touches only the record and `company/ops/changelog.md`, so the builder's dist (built at 110ac21) is the reviewed artifact. **This clears the lh-engine-locked merge**, merged whole with `--no-ff`. It does not cover publishing, and any deploy still needs the founder.

**W3 approval condition 1 is closed** (answer-range test and the W3 every-step ratchet; the tote `answer`=2 mutation now fails the suite). From lane 8's side W4 may now come with its own addendum.

**1b5fa53 (group-cables dots) is approved as code but is separable**: the W-1094 safety re-look may keep it or revert it alone (record, "How to roll back"). My approval does not pre-empt that re-look. See condition 2.

Not my area: the author is platform-engineer and the change is a lesson engine. I am the approver.

## Ruling asked of me: are the four remaining locked-picture numbers "givens"?

**No. The givens count is 2, and the B1 stop-if ("more than 3 givens need allow-listing") does not fire.**

A given, in the sense of the W-1258 ruling and the B1 stop-if, is a picture text that *would break the rule* (it states a count, amount or result for one of the modes) and is allowed only because the question states it. Only those need allow-listing. The four numbers are not mode quantities:

| Text (as served, locked) | What it is | Why it is not a given |
|---|---|---|
| box-handle-clearance "42 cm opening" | The fixed constraint both modes are compared against | Same in A and B. A's and B's amounts are 40 cm and 46 cm and the results +2 / −4 cm; none is drawn. The question states 42 cm |
| desk-supply-near-use "4m one-way" | The input the A amount is derived from (A's amount is "8 m", the result "48 m") | Not a cell. The question states "4 m from your desk". This is the closest case: on the strictest reading (a property of mode A's arrangement) it would count, which makes 3, still not more than 3 |
| long-cord-knots-itself "0.3 m strings", "3 m strings" | Group names, identical to the mode buttons | They name the modes. They state no count or result; the counts are drawn as "?" until pressed |

So the total is 2 by definition and 3 at the very strictest. It cannot reach 6. The record already lists all four, which is what B1 output (1) asks. Test (ii) ("every number in the picture is one the question or a mode label already states") is the guard that keeps this class honest: my mutation M-A below is caught only by (ii), not by (i).

One more setup quantity the regex cannot see: the cord svg's aria-label says "Twenty simulated strings". The cord cells hold "20" (the sample size), so a digit "20" would trip (i). As a word it is not a result and leaks nothing. I record it here rather than condition it.

## What I checked (my own runs, not the record's numbers)

A clean detached worktree of 387ab8c under my scratchpad, node_modules hard-link-copied from /home/user/s3c-eng1. Nothing in /home/user/s3c-eng1 was edited. I built nothing: I served the builder's `.next-eng1` from my worktree through a symlink, on port 4187, and stopped it by its exact PID (21498). Then I removed the worktree and the symlink. `.next-eng1` is still in place for lane 10.

| Claim in the record | Command | Result |
|---|---|---|
| Suite green | `npm run test:lifehacks` | **130/130** |
| Types | `npx tsc --noEmit` | exit 0 |
| Check | `npm run check` | passed: 969 lessons, 5295 claims, 3 warnings (disputed claims in 3 lessons; content) |
| M3 (cord reach('long') only) fails | sed, run, `git checkout` | 129/1, "W-1241 … either press order" |
| Main has not moved under the engine | `git diff --name-only acb4025 origin/ccr-4c6c7654-ew9ko1 -- src/components/lifehacks src/lib/lifehacks tests/lifehacks src/kit` | empty (only package.json `verify` gained `test:dispatch`) |
| Merges | `git merge-tree --write-tree origin/ccr-4c6c7654-ew9ko1 387ab8c` | **one conflict, `company/ops/changelog.md`** (text, both sides add lines). No code conflict |
| Locked pictures on the artifact | Playwright (chromium, 390×844) against the served dist, 10 lessons: each picture's `<text>` and aria-label, locked, then after commit before the first press | group-cables: no count, 0 target marks. socks, shoes, fitted-sheet, coiled-cord: no size text. jacket: "Jacket, Sweater, Shoes", 0 targets. box: "42 cm opening". desk: "4m one-way". tote: "3 kg", "1 kg". cord: "0.3 m strings", "3 m strings", "?", "?". Same in both states |
| W-1241 on the artifact | Same run: commit, press "Tumble 3 m" only | reveal button enabled |
| Real kit counts two milestones in one press | Read `src/kit/milestones.tsx` and `Lesson.tsx` `interact` | `setInteractions((n) => n + 1)`, functional, so two `reach` calls in one handler give +2. The test's spy is faithful on this point |

**Mutations of my own** (each on the clean tree, then reverted; `git status` clean after):

| Mutation | Result |
|---|---|
| M-A: socks "cm³ empty" drawn at mode null | 128/2: both "every number … the question or a mode label already states" tests |
| M-B: jacket neutral branch disabled | 129/1: "W-1299 jacket-last-first, locked …" |
| M-C: group-cables dots always `target` | 129/1: "W-1299 group-cables-with-ends, locked …" |
| M-D: `neutral` only while locked (not before the first press) | 128/2: both "unlocked before the first press" tests |

## Conditions

None gates the merge. I do not write to the board. The chief of staff places the new items.

1. **Merger (chief of staff, §4 integration):** resolve the `company/ops/changelog.md` conflict by keeping both sides' lines, merge `--no-ff`, run `npm run verify` on the merged tree, and do not split the merge (engine and tests revert together). If content patch r3 (lhfix-r3) lands first, expect the textual conflict in `tests/lifehacks/home-v2.test.mjs` the record names. Re-run `npm run test:lifehacks` after resolving it.
2. **W-1094 safety re-look (safety reviewer) owns 1b5fa53.** If it wants the end highlight back while locked, revert 1b5fa53 alone, together with the "W-1299 group-cables-with-ends …" test, as the record says. That revert needs no new approval from me. Any other change to that picture does.
3. **R2 vs the jacket picture (new item, interaction-designer, lane 6):** amend company/design/specs/lifehacks-engines-v2.md R2 ("A's arrangement, unless that arrangement answers the question") or object. If the designer objects, the `reverse-order` hunk of a2f14c3 is reverted with its test, and that revert needs a readiness note. The lesson does not publish while the spec and the picture disagree.
4. **Locked highlights elsewhere (new item, cm-lifehacks, lane 1, in the r3 "Arrangement re-check"):** on the artifact, socks-use-shoe-space, shoes-opposite-ends, desk-supply-near-use and tote-balance-sides each still draw 1 `target`-class mark while locked. These are arrangement, not text, so they are outside W-1258 and this approval. Lane 1 says, for each one, whether the mark gives the answer away. The `SceneV2Props` comment ("no highlight that marks what to look at") describes the end-paths case only. Correct it in the next engine change.
5. **Lane 10 (qa-tester):** the 5-lesson QA re-run on `.next-eng1` (brief, ask (1)) is still owed. The builder's 28/28 is testimony. My Playwright probe is not the contract. Whoever finishes with `.next-eng1` deletes it.

## What would make me revoke it

- `test:lifehacks` failing on main after the merge.
- A locked or not-yet-pressed engine-2 picture drawing a mode's count, amount or result, other than tote's "3 kg"/"1 kg".
- Any v1 Home lesson rendering differently from acb4025 (the builder's 0 of 41).
- A later commit touching `src/components/lifehacks`, `src/lib/lifehacks` or `tests/lifehacks` merging with the branch without a readiness note.
- `GIVENS` growing past 3, or test (ii) being loosened, without a new ruling.

## Objections raised, and what happened to each

- *Author: the jacket neutral picture is not "A's arrangement" (R2).* Accepted as a real spec conflict. It does not block merge, because the picture draws the items in use order and states no result. It is condition 3, owned by lane 6, and it blocks publishing that lesson until answered.
- *Author: the group-cables dots precede the W-1094 safety re-look.* Accepted. The commit is separate and reverts alone. It is condition 2, owned by the safety reviewer. I approve the code, not the safety question.
- *Author: does "given" include non-cell numbers?* Ruled above: no. The count is 2 (3 at the strictest reading), and the stop-if does not fire.
- *Mine: the record's "no highlight" generalisation.* It holds for group-cables only. Four other lessons keep a target mark while locked. That is condition 4 (lane 1), and the comment fix rides on the next engine change.
- *Mine: the changelog merge conflict was not in the record.* That is condition 1. It is text only.
- No other objections are on record.
