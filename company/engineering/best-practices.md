# Engineering best practices

owner: principal-engineer · review in Distillation Day; delete any line that has not caught anything in a quarter.

1. **Measure before claiming.** Performance and scale claims come with a number and the command that produced it.
2. **The integrated tree is the truth.** Parallel branches pass alone and fail together; run `npm run verify` after every merge wave.
3. **Generated files are regenerated, never hand-merged.** For example, the registry: `npm run registry`.
4. **Seeded randomness only** in lessons, so QA and screenshots are reproducible.
5. **No new dependency without a reason on record** (a decision record or ADR), plus `npm audit` and a license check.
6. **Fix shared defects once.** If two builders work around the same kit bug, the kit has a bug: fix it in the kit and remove the workarounds.
7. **Parallel agents get their own scratch space** (`artifacts/scratch/<agent>/`), their own build dir (`NEXT_DIST_DIR`), their own port (`QA_PORT`) and their own report dir (`QA_OUT`).
8. **Small, revertible commits** with the reason in the message. Merges keep history; do not rewrite shared branches.
9. **Tests judge behaviour, not code.** The QA contract uses the lesson through a browser, and so do reviewers.
10. **Delete code the agents no longer need.** A framework that a capable agent can replace with a shell command is a liability.
11. **Factual data in the kit needs a provenance we can state.** A short standard notation of one object is a fact (a DT code, a Conway notation, a braid word, a constant). For each one:
    - type it in by hand and cite where it is published;
    - derive anything bigger with our own code, and test that the result is the object the notation names;
    - say in the source file if a value was read from, or checked against, a source whose licence we have not cleared.

    Never copy a file, table or program output in bulk from such a source. Anything beyond individual facts needs a decision record. This is not legal advice. (EDD-004 review, W-145.)
