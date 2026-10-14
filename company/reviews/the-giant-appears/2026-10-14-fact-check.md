# Fact-check: the-giant-appears

## Pass NCM-1

date: 2026-10-14 · checker: fact-checker (did not write the claims or the model) · result: **6 of 6 claims verified, 0 disputed**

Method: I read meta.json, Demo.tsx and model.ts, then checked the stage and reveal text against the claims, not only the claims as written.

| Claim | Check | Result |
|---|---|---|
| c1 | Ran the real `biggest()` from model.ts (tsx): 9, 36, 110, 148, 183 at m = 50, 100, 150, 200, 300. Also re-implemented the rule independently (copied mulberry32, pair rule a != b, no repeats, first m links, union-find): same five numbers. Percentages: 36/200 = 18%, 148/200 = 74%, 110/200 = 55%, 183/200 = 91.5% (renders 92%), 9/200 = 4.5% (renders 5%). Stage and reveal derive these from the same function, so what the learner sees matches. The "seed 1 was first tried" disclosure is in the source. | verified |
| c2 | Independent re-run, seeds 1 to 20: means 3.92, 16.77, 59.10, 79.42, 93.97 percent at 0.5, 1, 1.5, 2, 3 friends each (claim: 3.9, 16.8, 59.1, 79.4, 94.0). Range at 2.0 is 72.0 to 85.5 percent. | verified |
| c3 | Citation: Erdős and Rényi, "On the evolution of random graphs", Publ. Math. Inst. Hung. Acad. Sci. 5 (1960) 17-61. Confirmed by Zentralblatt MATH and the Rényi Institute's own PDF (static.renyi.hu, "1960_renyi_on_the_evolution_of_random_graphs_17_61.pdf"). The giant-component threshold at mean degree 1 is the paper's central result. Derivation: fixed point of S = 1 - exp(-cS), iterated: c = 1.5 gives 58.28, c = 2 gives 79.68 (the 79.7% in the source), c = 3 gives 94.05 percent. Claim text says "about 80%": fair. | verified |
| c4 | 2 x links / 200: 50, 100, 150, 200, 300 links give 0.5, 1, 1.5, 2, 3. Arithmetic and handshake argument correct. Matches chips in model.ts (`linksFor`). | verified |
| c5 | Mechanism matches the union-find run. Wording check: the claim says "usually"; the reveal says "a new link joins two small groups" without it. Singletons count as small groups, so it is not false, and the reveal's "jump comes near one friend each" matches c3. Not overclaiming. | verified (see note 1) |
| c6 | Scope statement; the reveal says "not a measurement of any real network" and states no real-data number. True as written. The Easley and Kleinberg (2010) section in `curriculum.references` stays `section_unconfirmed: "2.2"`; I did not confirm it and did not change it. | verified for the lesson sentence only (see note 2) |

## Notes (none block publishing)

1. Optional wording for the builder: add "usually" to the first reveal sentence ("Early on, a new link usually joins two small groups") so it matches c5 as recorded.
2. The E&K section is still unconfirmed. Nothing a learner sees depends on it. Owner: curriculum or category manager to confirm against the book's table of contents.
3. Finite-size caution: at 1.0 friends each the lesson world shows 18% (mean over 20 worlds 16.8%), while the large-n share there is 0. The lesson says the jump is "near one friend each", which is consistent; do not let later copy say "no giant below 1" for 200 people.
4. Predict options read "about 36% of people", while the question gives 36 people (18%). The numbers are not wrong, but the 36 coincides with a count; pedagogy is out of my scope, flagging for the demo-critic.
5. Walkthrough transcript was not present under artifacts/walkthroughs/the-giant-appears; I read Demo.tsx directly for rendered text.


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

**Reveal check:** No unverified claims (6 of 6 verified in NCM-1). Re-read predict and reveal against c1, c3-c6; no new learner-visible claim found.

**Result:** 0 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 6 verified.
