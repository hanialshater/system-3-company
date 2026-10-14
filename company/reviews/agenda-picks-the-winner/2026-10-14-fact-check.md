# Fact-check: agenda-picks-the-winner, 2026-10-14

## Pass NCM-1

Checker: fact-checker (did not write these claims). Method: read Demo.tsx and the walkthrough transcript, then counted every pairwise vote by hand and ran all six agenda orders against the RANK table in Demo.tsx.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 A beats B, B beats C, C beats A, each 2-1 | verified | A vs B: voters 1 (ABC) and 3 (CAB) prefer A, voter 2 B. B vs C: voters 1, 2 prefer B. C vs A: voters 2 (BCA), 3 prefer C. Transcript tallies: "A vs B: A 2–1", "B vs C: B 2–1", "A vs C: C 2–1". |
| c2 agendas elect C, A, B; held-back option wins | verified | A vs B -> A, then A vs C -> C. B vs C -> B, then B vs A -> A. A vs C -> C, then C vs B -> B. Over all six orders each option wins twice, always the one held to the last vote. Predict answer is C (computed from `run(AGENDAS[0])`), correct. |
| c3 no majority favourite; agenda setter picks the winner | verified | No Condorcet winner, since each option loses one pairwise vote (c1); with sincere voting the last-held option always wins (c2), so choosing the order chooses the winner. This is the Condorcet paradox / agenda-setting point. E&K ch. 23: search found the chapter (Cambridge "Voting", p. 645) and study notes listing "23.2 Individual Preferences"; a Cambridge-TOC snippet reported "23.3 Voting Systems: Majority Rule", but a second search could not reproduce that heading, so `section_unconfirmed` 23.3 stays. |
| c4 sincere voting assumption; no claim about real elections | verified | The reveal states "when every voter backs the option they rank higher"; no real election is named. |

Recall (Ana P>Q>R, Ben Q>R>P, Cy R>P>Q; Q vs R, then P) is the same profile relabelled (A=P, B=Q, C=R) and the agenda "B vs C, then A": Q beats R 2-1 (Ana, Ben), P beats Q 2-1 (Ana, Cy), winner P, answer index 0. Correct.

Unrecorded claims: none found.

Result: 4 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

**Reveal check:** No unverified claims (4 of 4 verified in NCM-1). Re-read the reveal: it computes each agenda's winner with run() and all three agendas are milestones; no new learner-visible claim found.

**Result:** 0 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 4 verified.

## Pass NCM-3 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the final-polish revisions, plus a fresh read of every predict, stage label and reveal sentence against the claims. Method: diffed Demo.tsx/model since the NCM-2 record (commit 319d2bda), re-ran the lesson's current code in node 22 via tsx (model files imported directly; Demo-only functions reproduced verbatim or re-implemented independently), and traced each reveal sentence to a milestone-guaranteed state or a claim. No fresh walkthrough: the transcripts predate the v3 commits and a build was not attempted in this shared checkout, so stage text was read from code.

| Claim | Check | Result |
|---|---|---|
| c3 | Recomputed from RANK: A>B, B>C, C>A, each 2-1, so no option beats both others. All 6 agendas run: the option held to the last vote always wins, so the order picks the winner. E&K 23.3 still unconfirmed (book site unreachable from here; web search did not surface the TOC). No learner text depends on it. | verified |
| c4 | Reveal paragraph 2 ends "as long as each voter votes for the option they like better in every vote"; votesFor() is sincere voting. Title, hook, predict, reveal and recall make no claim about real elections. | verified |
| c5 | Each ranking is a strict order of three distinct options; the loop is only in the pairwise majorities. | verified |

**Reveal check:** paragraph 1 is computed from run() for the three agendas (C, A, B; c2), all milestone-gated; the reveal pins the stage to the asked agenda. Recall card: Q beats R (Ana, Ben), P beats Q (Ana, Cy), answer P: correct.

**Result:** 3 verified, 0 disputed. Lesson now: 5 verified.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | VERIFIED (v3). Own recount from RANK: A beats B (voters 1, 3), B beats C (1, 2), C beats A (2, 3), each 2-1, so no option beats both others. Agendas: A vs B then C -> C; B vs C then A -> A; A vs C then B -> B. The held-back option always wins, so the order picks the winner. The v3 reveal sentence says this. |
| c4 | verified | VERIFIED (v3). votesFor() counts each voter for the option ranked higher: sincere voting. The reveal ends 'as long as everyone votes for the option they like better'. No learner text (title, hook, predict, reveal, recall) mentions elections or real cycles. |
| c5 | verified | VERIFIED (v3). A>B>C, B>C>A and C>A>B are each a strict order; the loop exists only in the pairwise majorities. The reveal reads 'Each voter's ranking is consistent, yet the group's majorities loop: A beats B, B beats C, C beats A, each 2 to 1.' |

**Result:** 3 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
