# Fact-check: raters-reward-agreement

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERIFIED. votes(): N 100, USER_WRONG 0.5; when the user is right the votes split evenly (right/2 each); when the user is wrong, round(50 x agree) go to Agreeable, with agree 0.7 on 'Collect 100 votes'. Stage caption 'User right: both models answer alike. Rates invented.' matches. |
| c2 | verified | VERIFIED. Own node: agree 0.7 -> Agreeable 25 + 35 = 60, Correct 25 + 15 = 40; 0.5 -> 50/50; 0.3 -> 40/60. ACCURACY is Agreeable 50%, Correct 100%. Agreeable wins exactly when 25 + 50a > 50, i.e. a > 50%. 'tie-seen' is required, so the reveal's 'At 50% the models tied' follows a seen run. |
| c3 | unverified | HELD. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. Sharma et al. 2024: the authors' dataset repository README (meg-tong/sycophancy-eval, opened) shows sycophancy prompts but does not state the finding that humans and preference models prefer sycophantic answers; Perez et al. 2023 not opened. The first clause (a reward model fitted to these toy votes would favour agreement) follows from c2. |

**Result:** 2 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
