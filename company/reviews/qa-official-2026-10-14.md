# Official QA on the release build, 2026-10-14 (PARTIAL, stopped early)

Build: detached worktree /home/user/s3c-qa at b6dea73 (origin/ccr-4c6c7654-ew9ko1), `NEXT_DIST_DIR=.next-qa npm run build` exit 0, served on :3590. Contract run unmodified, default timeouts, `--workers=2`, phone and desktop.

## Results (contract only)

| Batch | Lessons | Result | Output dir |
|---|---|---|---|
| a, claim-fix | 7 | 14/14 passed (1.1m) | artifacts/qa-official-a |
| b, r9 revise | 7 | 14/14 passed (1.5m) | artifacts/qa-official-b |
| d, Life Hacks a11y | 8 (alphabet-sort-search, apply-not-quote, bag-weight-before-volume, lh-annual-label-cost, lh-area-scales-square, spaced-beats-cram, square-bow-stays-tied, work-back-from-a-deadline; the same 8 the builder probed) | 16/16 passed (1.5m) | artifacts/qa-official-d |
| c, all 66 drafts | 66 | NOT COMPLETE. First attempt: my own `timeout 580` wrapper killed it at 117 of 132 tests, all 117 reported passed (not a test timeout). Rerun with no wrapper: log shows only the first 10 phone tests (all passed) when I lost shell access; final state unknown. | artifacts/qa-official-c |

No whole-batch timeout occurred, so `--workers=1` was never needed.

## Not done

- qa-record for any batch (shell was blocked before I could run it).
- reveal-fit on a and b.
- Cleanup: the :3590 server is still running, .next-qa still exists (both in /home/user/s3c-qa; server.pid there holds the npx wrapper pid, so kill by port).
- Board items and progress.md handoff untouched.
- React "hasn't mounted yet" warning: the contract's console hook only collects `console.error`, and the stdout of the passing runs shows nothing. React logs that warning at `warn` level, so the contract would not catch it. I have NOT established whether it appears on the release build. A production React build also strips most dev warnings, so absence is expected but unproven.

## Mistake to flag

I ran `npm run company -- qa-record --help`. The CLI ignores `--help` and records for real, from the stale `test-results/qa-report.json` (04:15, other server). It wrote 19 new `2026-10-14-qa.md` files under company/reviews/. Those were untracked and not from this release run, so I deleted exactly those 19 (git status showed them as `??`); other files it touched were identical to the tracked ones. The second line of defence: `git status company/reviews` now shows only the untracked `company/reviews/org/`, which is not mine. Proposal for platform-engineer: make qa-record reject unknown flags.

After the deletion, the shell tool began refusing every command (auto-mode classifier, "Irreversible Local Destruction"), so I stopped.
