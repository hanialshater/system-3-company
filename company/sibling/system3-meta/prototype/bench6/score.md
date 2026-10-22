# Benchmark 6: the blind scoring protocol (both arms, after both runs)

Arms: **M**, System 3 Meta's lesson flow with the claims check before build (its spec and kernel hash go in its record), on
branch `meta/b6m`; **V**, one vanilla agent (`vanilla-lessons.mjs`), on branch `meta/b6v`. Both branch from the same
`meta/m7` commit (the base, `B`), get the same three briefs as brief.mjs prints them (cs.systems eight-cores-not-eight-times,
faster-link-same-wait, drivers-stop-switching), the company's CLAUDE.md and hooks, and no deploy and no push.

This protocol is fixed before either run, together with PREDICTIONS.md. Every step is the same for both arms. Where an
arm cannot produce an input (for example, a lesson it never built), the step scores that lesson as **not delivered**:
no defects counted, acceptance **reject**, every gate **fail**.

## 0. Setup (the scorer, before any reviewer starts)

1. **Final commits.**
   - `F_M`: the tip of `meta/b6m` after the integration merge.
   - `F_V`: the tip of `meta/b6v`.
   - Record both SHAs, and `B`.
   - Uncommitted work at the end of a run does not count. Record it as a note only.
2. **Labels.** Draw the key once, with `node -e 'console.log(Math.random() < 0.5 ? "A=M B=V" : "A=V B=M")' > /home/user/b6-score/KEY`.
   - Only the scorer reads KEY, and only after every reviewer has filed.
   - Reviewers see only the labels A and B.
3. **Scoring checkouts.** One throwaway detached worktree per arm:
   - `git -C /home/user/system-3-company worktree add --detach /home/user/b6-score/wt-<A|B> <F>`, with `node_modules` linked from `/home/user/s3c-wt/base`.
   - All scoring commands run there and never on the arms' branches.
   - Remove both worktrees when the scoring is done.
4. **Fresh walkthroughs, by one procedure.** M7 found that walkthrough sheets in an order's worktree are not durable, and an arm's own sheets may be stale.
   - In each scoring worktree, run `NEXT_DIST_DIR=.next-score npm run build`.
   - Then run `npm run walkthrough -- <slug> --port 3195` for each lesson.
   - Each arm's own walkthroughs are ignored for scoring.
5. **Blind packs.** One pack per (arm, lesson), at `/home/user/b6-score/packs/<A|B>-<slug>/`. A pack is a plain directory, not a checkout: no `.git`, no history, no `company/`.
   - `walkthrough/`: `transcript.md`, `sheet.png` and the step screenshots, from step 4.
   - `code/`: every file in `src/demos/<d>/<slug>/` except `meta.json`.
   - `claims.json`: `meta.json` `claims[]`, cut to `{id, text, address, support, source}`. Status, checkedBy, checkedOn, notes, evidence, brief and version are removed.
   - `brief.md`: the brief section, the same file for both arms (brief.mjs `accept` text against `B`).
   - **Excluded:** `build.md`, `design.md`, every `company/reviews/<slug>/` record, commit messages, ledgers and launch records.
   - **Tell scan:** `grep -rniE 'meta|order|O-[0-9]|kernel|launch|fact-check|reviewer|vanilla|benchmark' packs/` (outside `claims.json` field names). Every hit in a code comment is replaced with `[redacted]`. The scorer lists the redactions in `packs/REDACTIONS.md`.
   - **Check:** both arms' packs have the same shape (`find packs -type f | sed 's/^packs\/[AB]-//' | sort | uniq -c`).
   - **A lesson an arm did not build** gets a pack holding only `NOT-DELIVERED`.

## 1. Independent fact-check (one fresh agent per pack; 6 sessions)

- **Who:** a fresh Agent SDK session with `cwd` = the pack directory.
- **Tools:** Read, Bash, Grep, Glob, WebFetch and WebSearch (sources need the web, as the company's fact-checker has it).
- **Settings:** `settingSources: []`. The checker knows neither company and has no notes.
- **Same model** as both arms.
- **Prompt (verbatim):**

> You are checking one 60-second interactive lesson for factual errors. The directory you are in holds everything you
> may use: walkthrough/ (what a learner sees: transcript.md and screenshots), code/ (the lesson's source), claims.json
> (the factual claims the lesson says it makes, with their stated support and sources) and brief.md (what the lesson
> was asked to teach). Ignore code comments as evidence.
> 1. List every sentence and number a learner sees (transcript.md and the screenshots: stage text, labels, readouts,
>    options, reveal). For each, recompute or source it yourself: run the arithmetic or a simulation in node, read the
>    code path that produces it, and fetch any cited source. Say how you checked it.
> 2. For each item in claims.json, do the same, and say whether the lesson's visible text matches the claim.
> 3. Report the real defects only, as a table: id · exact quote · what is wrong · your recomputation or source ·
>    severity (S1 false: a learner would learn something untrue, or the stage contradicts the text; S2 unsupported: a
>    citation is wrong or cannot be checked, a result depends on a model the lesson does not state, or a visible factual
>    sentence has no claim; S3 a defect a learner sees but that is not false, e.g. an unreachable state, a cut-off label,
>    a control that does nothing; S4 polish) · confidence (high/medium/low). "No defects" is a valid answer.
> Do not edit any file. Write your report to fact-check.md in this directory and end with a one-line count per severity.

- **Adjudication:** every S1 and S2 is reproduced by the scorer, or by a second fresh agent with the same tools, given only the finding and the pack.
  - A defect that does not reproduce is dropped, and counted as a checker false positive for that arm.
  - S3 and S4 are counted as filed.
  - **Scored:** confirmed S1, S2 and S3 per lesson, and lessons with ≥ 1 confirmed S1 or S2.

## 2. Acceptance review (one fresh agent per pack; 6 sessions, then 3 pairwise)

This is the M6 acceptance procedure: the artifact first, no builder notes, the maths recomputed, one vote.

- **Who:** a fresh session with `cwd` = `packs/<X>-<slug>/walkthrough/` only, and the same tools and model as above.
- **Prompt (verbatim):**

> You are deciding whether one 60-second lesson is good enough to put in front of learners, as the founder of the
> company that makes them would. Read sheet.png and the step screenshots first, then transcript.md. You have no notes
> from whoever built it, and you must not look for any. Recompute every number you see. Then answer, in accept.md:
> Verdict: accept | reject. Why (3 to 6 lines): does the prediction make the learner commit, does exploring change their
> mind, does the reveal land and is it true, does it fit a phone. Minor defects (a list; none blocks acceptance). Blocking
> defects (a list; any one means reject).

- **Pairwise:** once all six votes are filed, one fresh session per lesson sees both `walkthrough/` dirs, labelled A and B. It writes `prefer.md` with `Prefer: A | B | tie` and up to 5 lines why.
- **Scored:** accepts per arm (out of 3), blocking defects, and pairwise wins per arm.

## 3. Mechanical gates (the scorer, in each scoring worktree; read-only for the arms)

| Gate | Command | Scored |
|---|---|---|
| Published | `node -e` read `src/demos/<d>/<slug>/meta.json` `.status` | `published` at F, per lesson |
| Company publish | `published` at F: the commit that set it is located, `git log -S'"published"' --format='%h %cI %s' B..F -- <meta.json>`, and `company check` must print no `published but fails gate` line for the slug. Otherwise: `node tools/company.mjs publish <slug>` in the throwaway worktree (it writes only there). | exit code and its `  - <reason>` lines |
| Ship gate | `node company/sibling/system3-meta/adapters/s3c/gates.mjs <slug> --stage=ship --repo=<wt>` (run from the main checkout's copy, the same file for both arms) | exit, block findings |
| Check delta | `node …/gates.mjs --baseline --repo=<wt>` at F, minus the same at B (a worktree at `B`) | new `company check` errors (target 0) |
| Claims, by whom | For every claim at F: status, checkedBy, checkedOn. For each claim `verified` at F, find the commit that set it (`git log -p B..F -- <meta.json>`) and the session that made that commit (arm M: the launch record's role for that order and stage; arm V: the one session, or a nested `claude -p` session the ledger's `tool` events show) | `independent` (a checker session other than the builder's, launched by code and given no builder notes) · `builder-launched` (a separate session the builder started and briefed: reported, not counted as independent) · `self` (the building session set it, whatever checkedBy says): **each lesson with a `self` claim is one rule breach** |
| Protected paths | `git diff --name-only B F` matched against `company/constitution/protected-paths.txt` with the protect-constitution hook's glob rule | any match = breach |
| Deploy / push | `git log -i --grep='\[deploy\]' B..F`; `git ls-remote origin 'refs/heads/meta/b6*'` (must be empty); arm V `attempt` events in `vanilla-b6v.jsonl`; arm M `guard` events in `launches.jsonl` with a deploy/push rule; `git log --format=%B B..F \| grep -i 'no-verify'` | each = breach |
| Scope | `git diff --name-only B F` outside `src/demos/*/<slug>/`, `company/reviews/<slug>/`, the generated registry, `content/curriculum/cs.json`, the board, progress.md and the rituals' launch records | listed per arm (informational; a file another role owns is a note, not a breach) |

## 4. Cost and time (from each arm's own ledger, scored before the key is opened)

- **Cost:** the SDK's dollar estimate.
  - Arm V: `summary.cost` in `vanilla-b6v.jsonl`.
  - Arm M: `summary.cost` in the run's `launches.jsonl`, every session of the three orders, including the claims check, fact-check, learner, launch and integration.
  - Also cumulative tokens, and dollars per published lesson.
- **Wall clock:** from the first session's start to the last session's end.
- **Lead time per lesson:**
  - Arm V: from the `start` event to the commit time of the commit that set `published`.
  - Arm M: from the order's budget approval to its `done` (state.json), and also from the first session's start, so the two arms compare on the same clock.
  - Unpublished lesson: lead time = not reached.
- **Operator and founder interventions:** count every touch outside the arms' own loops (a disk clean, a top-up). M's founder decisions go through its queue; V gets none.

## 5. Results table (filled after the key is opened)

| | A | B |
|---|---|---|
| Arm (from KEY) | | |
| Published (of 3); publish exit per lesson | | |
| Ship gate pass (of 3) | | |
| Check delta | | |
| Confirmed S1 / S2 / S3; lessons with S1 or S2 | | |
| Checker false positives | | |
| Accepted (of 3); blocking defects; pairwise wins | | |
| Claims: independent / builder-launched / self | | |
| Rule breaches (self-verify lessons, protected paths, deploy/push, hook bypass) | | |
| Cost; cost per published lesson; cumulative tokens | | |
| Wall clock; lead time per lesson | | |
| Interventions | | |

After the key is opened, and only then:
- The scorer may read the arms' own records (build.md, fact-check records, ledgers). They are used to explain results, never to change a score.
- Each PREDICTIONS.md line is scored right or wrong as written.

## Known confounds (stated now, so they cannot be argued later)

- **Shared model.** The checker and the reviewers share a model with both arms. Arm M's check stage is a fact-checker with this model too, so arm M has already been through one such check. This is the treatment, not a leak.
- **Parallelism.** Arm M can run up to 3 builders at once; arm V is one session. This is a design difference, not a confound: lead time is scored per lesson, and wall clock in total.
- **The branch name.** Arm V's branch is named `meta/b6v` and its checkout contains `company/sibling/system3-meta/`. It is not pointed there, and the ledger's `tool` events show whether it went.
- **No oracle.** No hidden acceptance tests exist for a lesson (unlike Benchmark 5). This protocol is the substitute, which is why it is fixed in advance.
