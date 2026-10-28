# Independent fact check: rebuild-the-procedure

Checker: fact-checker · 2026-10-27 · current lesson v3

Artifact: http://localhost:3001/d/rebuild-the-procedure, supplied frozen production build f693857f. Public HTML fetched before implementation/source checking; separate phone walkthrough captured in this worktree at artifacts/walkthroughs/rebuild-the-procedure/transcript.md. No builder review/account was used as evidence. Underlying current source inspected; only verification metadata changes are proposed. This record attests only the addressed claims below, not publication readiness, QA or learner effectiveness.

## lifehacks.rebuild-the-procedure.c2: VERIFIED

Claim: This procedure has an explicit order: collect, sort, file. The check compares positions, so remembering the words alone is insufficient.

Inspected current Demo.tsx delegation to StudyLesson, study_rebuild_the_procedure.words = [collect,sort,file], reconstructionMatches(words,order) comparing words[id]===words[index], and the current reconstruction display/check. All six permutations contain the same words, but only [0,1,2] has three correct positions: [0,2,1] and [1,0,2] have one; the two 3-cycles have none; [2,1,0] has one. Thus word membership alone cannot distinguish correct order. Exact scope: this fixture's explicit rule; no retrieval-practice benefit or empirical retention result is verified, and Roediger/Karpicke is not needed for this claim.

Reproduction: `node company/reviews/checks-first/2026-10-27-independent-claims.mjs`; retained results: `company/reviews/checks-first/2026-10-27-independent-results.json`. Source address for this check: `company/reviews/rebuild-the-procedure/2026-10-27-fact-check-checks-first.md#lifehacks.rebuild-the-procedure.c2`.

