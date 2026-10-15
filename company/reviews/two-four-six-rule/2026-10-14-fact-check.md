# Fact-check: two-four-six-rule (2026-10-14)

Lesson: src/demos/big-ideas/two-four-six-rule/ (status draft, version 2).

## Pass 38

Checker: fact-checker, a fresh instance (set B: chemistry, life, big-ideas). I did not write, build or record these claims. Method: I read Demo.tsx on every reachable path before I read the claims, and checked the walkthrough transcript (artifacts/walkthroughs/two-four-six-rule/transcript.md) for learner-visible sentences. Then I re-ran every number in node from my own copies of the lesson logic. Scratch scripts were not kept in the repo; each note gives the method and the values. Web: only GitHub (raw files and public clones) and PyPI were reachable. WebFetch fails DNS, and journal, publisher, library, Gutenberg and archive.org hosts are blocked (W-583). Sources I opened: OpenStax textbooks, cloned from github.com/openstax (Chemistry 2e, Biology 2e, Concepts of Biology, Anatomy and Physiology 2e, Astronomy 2e, College Physics 2e, Psychology 2e; CNXML modules, cited by module id); PyPI chemicals 1.5.2 (CRC, JANAF, ATcT tables), ussa1976 0.3.4 (US Standard Atmosphere 1976 composition) and pyrolite 0.3.8.post1 (ICS chronostratigraphic chart 2024/12); and the NOAA CO2 series via github.com/datasets/co2-ppm. No verdict rests on a source I could not open. A claim whose cited source was not opened, but which I verified from another opened source, says so in its note.

Paths read: steppers, Flip order, Test, Test 1-2-10; the reveal reads the first split and first no-fit rows.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Convention: secret() in Demo.tsx is t0 < t1 < t2, and the reveal-phase stage prints 'Secret rule: any three increasing numbers'. Wason 1960 is off the learner path and was not opened; nothing on the card names him. |
| c2 | verified | Node, own copies of both rules: 8-10-12, 20-22-24, 1-3-5 fit both; 1-2-10 breaks +2 and fits the secret rule; 6-4-2 fits neither. Exhaustive over every triple in the stage's range 0-40: no +2 triple fails 'increasing' (0 cases), so no +2 test can separate the rules. Also checked: the stage's mismatch message can only show 'your guess said no, but it fits!', the one possible disagreement. |
| c3 | verified | Derivation, as the lesson uses it: guess +2 is a subset of 'increasing', so only triples the guess says will fail (1-2-10, 6-4-2) can come out differently under the two rules; every test the guess says will pass fits both and carries no information about which is true (c2). Read in context the sentence holds. Its limit as a general maxim is c4's job. Popper is off the learner path and was not opened. |
| c4 | unverified | HELD (the lesson's one class-H citation). Klayman and Ha 1987 (Psychological Review 94(2)) could not be opened (web blocked). The second half is derivation and holds: a positive test can only fail where the guess says yes and the rule says no, so it exposes a guess that is too broad, never one that is too narrow; here the rule is broader, so it fails. But 'testing cases that fit is often sensible' is the paper's empirical and normative claim and needs the source. The brief's fallback is ready and I verify its logic: 'Where it stops: if your guess were broader than the true rule, testing cases that fit would catch it, because some would fail. It fails here because the true rule is broader than the guess.' Use it if W-583 cannot open Klayman and Ha. |
| c5 | verified | Convention: the question stem says 'You guess add 2 each time'; the stage caption reads 'Your guess: add 2 each time. Test any three numbers.'; each logged row carries two marks from plus2() and secret(). The secret rule appears only in the reveal phase (phase === 'reveal' branch). |

**Result (Pass 38):** 4 verified, 1 unverified.

Held: c4 (Klayman and Ha 1987, the one H). The brief's derivation fallback is logically sound, and I would verify it as written.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 2. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Learner text (Demo.tsx line 70): 'Where it stops: testing cases that fit is often sensible. It fails here because the true rule is broader than the guess.' Opened on PMC: Mem Cognit 2025 53(6): 1927-1943, 'Thinking in opposites improves hypothesis testing performance in Wason's rule-discovery task' (PMC12402026). It says 'Klayman and Ha (1989) describe the positive test strategy as a general default heuristic that, while serving the basic goal of determining whether or not a hypothesis is correct in many situations, can lead to errors in particular circumstances'. It adds: 'when the hypothesis formulated by reasoners is narrower than the correct one, using a positive testing strategy makes it impossible to encounter negative feedback' (citing Klayman & Ha 1987). Both halves hold, and the second is also a derivation (pass 38). Klayman and Ha 1987 itself is not opened. |

**Result (Pass 41):** 1 verified, 0 disputed, 0 unverified (held).
