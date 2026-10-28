# Independent fact check: draw-a-table-knot

Checker: fact-checker · 2026-10-27 · current lesson v4

Artifact: http://localhost:3001/d/draw-a-table-knot, supplied frozen production build f693857f. Public HTML fetched before implementation/source checking; separate phone walkthrough captured in this worktree at artifacts/walkthroughs/draw-a-table-knot/transcript.md. No builder review/account was used as evidence. Underlying current source inspected; only verification metadata changes are proposed. This record attests only the addressed claims below, not publication readiness, QA or learner effectiveness.

## math.draw-a-table-knot.c7: BLOCKED

Claim: Knot tables name each knot with a number, and the table draws each knot with the fewest crossings, so the kit's 6₁ drawing (and 5₂ drawing) has exactly 6 (and 5) ('Knot tables name each knot with a number, like 6₁'; 'The table draws each knot with as few crossings as possible, so 6₁ had exactly 6').

Inspected the current lesson and src/kit/knots/table.mjs: its selected 6_1 and5_2 PD arrays have six and five crossing quadruples, and the lesson draws those base arrays. This establishes the selected diagram counts, but not the entire claim that knot-table pictures always realize the minimum, nor independent identification with the authoritative Rolfsen entries. Tried https://katlas.org/wiki/The_Rolfsen_Knot_Table via inherited HTTPS proxy and TLS verification: CONNECT tunnel denied403 (curl56). Original Rolfsen Appendix C was not opened. A kit naming/identify convention alone is not independent proof of knot identity/minimality. Exact blocked scope: authoritative table pictures/naming and their minimum-crossing assertion. Preserve metadata and previous note unchanged. Next owner: source-capable fact-checker with actual Rolfsen table/edition or independently sourced diagram and minimum-crossing proof; builder may narrow wording only through normal version lane.

Reproduction: `node company/reviews/checks-first/2026-10-27-independent-claims.mjs`; retained results: `company/reviews/checks-first/2026-10-27-independent-results.json`. Source address for this check: `company/reviews/draw-a-table-knot/2026-10-27-fact-check-checks-first.md#math.draw-a-table-knot.c7`.

