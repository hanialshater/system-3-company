# Dispatch request: Behavioral Economics (lane 1, category) · round 5 · 2026-10-16
poc: cm-behavioral (Rasmus)
lane: 1, A category's lessons (Behavioral Economics and Irrational Behavior)
slots asked: 1 agent, of which 0 builders (B1 runs in the main checkout, writes text and one check script, and does no `next build`)
since last round (r4, `company/ops/dispatch-requests/2026-10-16-r4-behavioral.md`):
- **r4 B1 `saved-or-die-same-600` v2: accept, with two rulings.** Merged on origin as a516d53 (837d490). The build note (`company/reviews/saved-or-die-same-600/build.md`, "Revision build (r4)") gives these measurements: stage 48 words (18 other), every branch at 89 or less with the "Not quite" verdict, the script unchanged and passing, and c1-c4 and c9 reset to `unverified` with none self-verified. **Ruling 1, the recall "why": accepted as written.** The builder wrote it because the script prints none: "Out of 1,000 patients, 900 live and 100 die under both descriptions. A model that judges outcomes can take it both times or refuse it both times, but cannot prefer to take it one way and refuse it the other." It is true. "Prefer" keeps it true for an indifferent chooser, which is the c2/c3 lesson. It stays c9, `unverified`, for the fact-checker. The fact-checker's script conditions (the brief file's header) say the script prints every number the learner sees, so the script must print this text too. That is B1 below. **Ruling 2, the floated tick (CSS, outside "styles only if the key needs it"): accepted.** No word, size, target or control changed. It removed an 18 px card-body overflow that the old layout hid. Lane 10 should still measure 360 px and landscape, which the builder did not (asks below).
- **r4 B2 (zero-loses v2, sure-million matched branches, same-week objective): in flight.** At 13:24 it had uncommitted edits to the three lessons' files in `/home/user/s3c-beh2`, plus a `tsconfig.json` change that the chief of staff should look at before merging (it is not in the item's outputs). No decision until it returns. One flaw in my r4 item: it told B2 to run `claim.mjs release` from its worktree. `tools/claim.mjs` treats only paths under `.claude/worktrees/` as worktrees, so in `/home/user/s3c-beh2` it resolves ROOT to the worktree and would write a git-ignored lock file there. The main checkout's lock would stay. W-1213 therefore moves to B1 here, run in the main checkout.
- **W-1338 (lost check-script edits, 13:06 autostash): nothing was lost, so there is nothing to redo.** Evidence:
  1. My r4 edits to both scripts were committed by explicit path at **13:02:55** (c64135c, rebased to b195793 at 13:02:57). That was three minutes before the 13:06 `rebase --autostash`. `git diff c64135c b195793 -- company/domains/briefs/` is empty.
  2. The 13:06 autostash (166ee49) holds five files and no behavioral ones. That is what you would expect if those files were clean by then.
  3. cm-history's report (events tx-7fb9712815) says the files "were modified when I started". Its run started after its r4 batch commit (12:58:36), and I was still editing those files then. It saw my edits in progress, and they were committed four minutes later.
  4. Both scripts are identical in the main checkout, in `s3c-beh1` and in `s3c-beh2`, and identical to b195793. Both pass ("all checks pass", exit 0).
  5. Their output matches the r4 decisions in `company/domains/briefs/behavioral.md` word for word. For brief 3: the predict "0" / "About 35" / "About 23", no glosses, answer last, and the recall "0" / "About 60" / "About 30". For brief 4: the strict "prefers" predict, the "Unless the two were a toss-up for you" mixed branches, the matched branches naming the framing effect, the 90%/10% recall, and stage counts 37/46/48 with the 2-word key. Every branch is measured with the longer verdict (82/89/86/87 for brief 4; longest 80 for brief 3).
  So B1 (built at 13:12) and B2 used the intended scripts. The board items should be corrected: W-1337 says "two behavioral check files lost", which is wrong for this lane (the History and amendments README losses stand). W-1338 → done, with this record.
- **W-1213 (stale `unknown` lease on `sure-million-or-long-shot`): still open.** The lock is still `{"agent":"unknown","at":"2026-10-16T09:15:35Z"}` in the main checkout. The lesson was built and merged long ago, so `--done` is correct. The release is in B1 (main checkout).
held or declined:
- **Brief 5 `same-fifty-two-labels`: still held** for W-1062 (learning-designer on option C, still `backlog`). Its skip line stays.
- **No sixth brief** before the Domain Launch Review reconvenes (decision §1).
- **Restoring any held type (d) line: declined** under rule 6. There is still no dated (d) statement (W-975, W-1059, W-1316 open).
- **No revision build this round.** B2's results have not come back, and lane 10 has not yet checked B1's v2. Any further text change waits for those findings.
standing orders:
- **SO-1beh-1: renewed unchanged** (expiry 2026-10-20). It covers only `same-fifty-two-labels`, once W-1062 lands and its skip line goes. It never covers revision builds.
- No new standing order. Lane 10's SO-10-1/2/3 (trigger b, changed lesson) cover the checks asked below.
for the founder: none. (Inside tranche 1. No deploy, no waiver, nothing public.)
objections: none new. Still open: W-1060 (cm-economics, brief 3 seed and crowd) and W-1061 (cm-books, brief 4 predict wording, non-gating; it should now read the **merged v2** predict). An objection on either stops that slug's next build and is copied into its brief.

## B1 · Content run: script prints brief 4's recall "why", W-1338 record, W-1213 lease release · board W-1338, W-1213
role: cm-behavioral
order: first (independent of r4 B2, which touches no script and no brief)
kind: other
worktree: no (main checkout; `claim.mjs` locks live only there. Commit by explicit path; no pull, rebase or stash)
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~35k tokens
inputs: this batch's "since last round" (rulings 1 and 2 on r4 B1, the W-1338 evidence); `company/domains/briefs/behavioral.md` brief 4 (the "Transfer recall" line and "Decisions (r4)"); `company/domains/briefs/checks/behavioral-gain-loss-framing.mjs`; the merged `src/demos/behavioral/saved-or-die-same-600/meta.json` recall (`git show origin/ccr-4c6c7654-ew9ko1:…` if the main checkout is behind); `company/ops/claims/sure-million-or-long-shot.json`
outputs: `company/domains/briefs/checks/behavioral-gain-loss-framing.mjs` (prints the recall "why" exactly as merged and asserts that it says "prefer" and that its 900/100 of 1,000 match the recall check); `company/domains/briefs/behavioral.md`: a brief 4 decision entry (r5) recording rulings 1 and 2, plus one line in the Gate section recording W-1338 as "no edits lost" with the evidence above; the lock released (`node /home/user/system-3-company/tools/claim.mjs release sure-million-or-long-shot --done`, run from the main checkout)
done when: `node company/domains/briefs/checks/behavioral-gain-loss-framing.mjs` prints "all checks pass", and its recall "why" equals the merged meta.json `recall.why` (diff the two strings). Every other line of the script's output is unchanged from b195793 (diff old and new output, excluding the added lines). `node tools/claim.mjs list` shows `sure-million-or-long-shot` as done, not `unknown`. The brief carries the r5 entry. `npm run check` passes. One commit with GIT_AUTHOR_NAME=cm-behavioral, by explicit path
checked by: lane 10 (fact-checker: c9's quoted "why" against the script line, during the saved-or-die v2 fact-check asked below)
stop if: the merged recall "why" differs from the text quoted in this batch (then copy neither; report the difference); any existing script check changes its output; the script is found modified in the working tree before the run starts (then report, do not overwrite); `claim.mjs release` would remove a lock whose agent is not `unknown`

## Asks to other lanes (not items; named so the chief of staff can route them)
- **Chief of staff (integration and board):**
  1. Rebuild the shared review server at a main that includes a516d53, and B2 once it merges. Lane 10's checks of v2 must not run on 5b2fee7.
  2. Check B2's `tsconfig.json` change before merging. It is not one of the item's outputs.
  3. Board: W-1338 → done (nothing lost; record above). Correct W-1337's title or note so that only the History and amendments README losses stand. W-1213 → B1 here. W-1315 and W-1306 stay in review until lane 10 reports on v2.
- **Lane 10 (evaluation-steward), walkthrough-first on the rebuilt shared server, no build of its own:**
  1. `saved-or-die-same-600` v2. Fact-check c1-c4 and c9 (c2/c3 against the strict premise and the toss-up qualifier; c9 also against B1's script line). Learner review r2: does the predict still give the answer away, and does the consistent path now name the effect? QA, including **360 px wide and landscape** with the floated tick and the 89-word A + D branch under the "Not quite" verdict.
  2. After B2 merges: the same three checks for `zero-loses-to-this-crowd` v2, fact-check and QA for `sure-million-or-long-shot`, and **same-week c3**.
  3. Fact-checker: the type (d) part of the W-975 statement, with W-1059 and W-1316. This still decides whether any held line can return and whether the fold floor of 14 is final.
- **Lane 9 (tools-lead), corrected from r4's "lane 7":**
  1. `tools/claim.mjs` resolves ROOT to the main checkout only for `.claude/worktrees/` paths. Builders in `/home/user/s3c-*` worktrees therefore write locks into their worktree, where they are git-ignored and nobody sees them. This round found it (W-1213 could not close in r4 B2). One fix: resolve ROOT with `git rev-parse --git-common-dir`.
  2. W-1325: reveal-fit should measure the longer verdict. B1's builder found a card-body overflow only by measuring by hand.
- **research-lead (lane 12):** W-1292 is unchanged from r4. It changes no lesson text.
- **Lane 6:** learning-designer on W-1062 releases brief 5.
- **Lane 1, other POCs:** cm-economics on W-1060. cm-books on W-1061, reading the merged v2 predict of `saved-or-die-same-600`.
