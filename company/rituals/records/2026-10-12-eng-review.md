# Engineering Review: 2026-10-12: Turbopack root for worktree builds

owner: principal-engineer (run by chief-of-staff) · tier: 2 (build config) · attendees: platform-engineer, demo-builder (reporter)

- EDD: not needed. This is a one-line config change, but it changes how every build resolves files, so it is reviewed.
- [x] The problem is real: the economics builder could not run `next build` in a worktree (Turbopack rejects the symlinked node_modules outside its root) and fell back to `--webpack`, so worktree builds no longer matched CI.
- [x] Options: (1) document `--webpack` for worktrees (builds differ from production); (2) set `turbopack.root` to the main checkout when running inside `.claude/worktrees/` (chosen); (3) real `npm install` per worktree (about 400 MB each, slower).
- [x] Blast radius: build resolution only; the main checkout's root is unchanged.
- [x] Rollback: revert next.config.mjs.
- [x] `next build` passes in the main checkout. The next wave's builders confirm the worktree build.

## Decision
Approve. Builders in wave 2 report whether plain `next build` works in their worktree.
