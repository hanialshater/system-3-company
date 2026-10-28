# Independent fact check: stack-without-bend

Checker: fact-checker · 2026-10-27 · current lesson v3

Artifact: http://localhost:3001/d/stack-without-bend, supplied frozen production build f693857f. Public HTML fetched before implementation/source checking; separate phone walkthrough captured in this worktree at artifacts/walkthroughs/stack-without-bend/transcript.md. No builder review/account was used as evidence. Underlying current source inspected; only verification metadata changes are proposed. This record attests only the addressed claims below, not publication readiness, QA or learner effectiveness.

## ai.stack-without-bend.c4: VERIFIED

Claim: A nonlinearity between layers is what lets extra layers add power; neural networks commonly include nonlinear activation functions between hidden layers.

Independent algebra: W₂(W₁x+b₁)+b₂=(W₂W₁)x+(W₂b₁+b₂). Thus any all-affine stack collapses. ReLU introduces two different slopes (0 and 6 here), which a single affine map cannot represent. Opened Dive into Deep Learning, Multilayer Perceptrons, subsection From Linear to Nonlinear, https://raw.githubusercontent.com/d2l-ai/d2l-en/master/chapter_multilayer-perceptrons/mlp.md (HTTP 200, retrieved 2026-10-27). It explicitly gives the collapse and describes ReLU as a popular hidden-unit activation. Exact scope: standard feedforward affine layers and their usual nonlinear activations; no claim that every architecture uses this arrangement.

Reproduction: `node company/reviews/checks-first/2026-10-27-independent-claims.mjs`; retained results: `company/reviews/checks-first/2026-10-27-independent-results.json`. Source address for this check: `company/reviews/stack-without-bend/2026-10-27-fact-check-checks-first.md#ai.stack-without-bend.c4`.

