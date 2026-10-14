# Fact-check: secret-in-the-counts

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERIFIED. Own node run of the MODEL block (generate, counts, back-off): 2-word context from 'my pin is' -> '4 7 1 9' then (end); the first tally at 'pin is' is [4: 1], its only entry. Each later context ('is 4', '4 7', '7 1', '1 9') occurs once in the corpus. |
| c2 | verified | VERIFIED. Own node: 1-word tally after 'is' = ready 3, at 1, sam 1, late 1, 4 1 (7 words), output 'ready'. Secret deleted, 2-word: 'pin is' unseen, back-off to 'is' -> 'ready'. The reveal's count reads one.tally.row[0][1] = 3 -> 'three'. |
| c3 | verified | VERIFIED on the authors' own public repository for Carlini et al. 2021 (raw GitHub ftramer/LM_Memorization, README.md and Samples.md, opened 2026-10-14). The README says generated samples 'are likely to contain verbatim text from the GPT-2 training data' and that prompting with web snippets increased memorised output. Samples.md reports 604 memorised examples among 1,800 checked, including 'A phone number for a hotline', 'Memorized names' and 'Complete contact information for an individual' (a postal address, email and phone number). 'The same way' is the toy's analogy: a context seen once makes its rare continuation the likeliest one. The paper PDF (arXiv) was not opened. |
| c4 | verified | VERIFIED as a statement about the toy: the 2-word context reproduces the once-seen secret (c1), the 1-word context does not (c2). It is true of count models in general, because a longer context is at least as specific, so a unique context makes a once-seen continuation the maximum. The lesson does not claim the Carlini 2023 scaling result, and I did not check it. |

**Result:** 4 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
