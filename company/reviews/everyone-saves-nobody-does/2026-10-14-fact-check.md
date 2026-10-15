# Fact-check: everyone-saves-nobody-does (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read Demo.tsx v1 first (chip, chart, record row, both cut buttons, Next round, Run, Reset, reveal, predict; hook and recall), then claim text and support, then source fields. Re-ran the model in my own node script (fc35/thrift.js). No source host could be opened (scholarly and reference hosts fail DNS or 403), so a claim resting only on a source is held.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node of series(20): round 0 income $1,000 saving $100; round 1 spending 880, saving $120, income $980; income first rounds to $900 at round 24 (SETTLE) and saving reads $100 at every round 24-40. Reveal uses rec.peak = sav[1] and rec.settled/income from the first round >= 24 reached at the $20 cut, so Next-by-Next and Run give the same $120 / $100 / $900. The $40 path sets no record (go returns early) and reaches no milestone, so it cannot change the reveal. Chip states the timing ('80% of last round's income'). |
| c2 | verified | Derivation in the model: income = spending + investment, so a $20 cut in spending is $20 less income for someone. Steady state Y = 80 + 0.8Y + 100 gives Y = 900 and S = Y - C = 900 - 800 = 100 = I. Own node agrees. |
| c3 | verified | Reveal: Y0 - rec.income = 1000 - 900 = '$100' less; settled saving $100 equals the pre-cut round-0 saving $100 (own node). |
| c4 | unverified | HELD. The naming rests on a source (paradox of thrift; Keynes / macro texts) that I could not open: reference and scholarly hosts are unreachable from this sandbox. The model's behaviour matches what the name is used for (c1-c3), but a name needs a source, and I did not accept memory or 'textbook'. Needs a checker with access to an opened text. |
| c5 | verified | Derivation: if investment rose by the $20 extra saving (I = 120), Y = (80 + 120)/0.2 = $1,000 and S = 1000 - (80 + 800) = $120, so the answer changes from $100. Own node. |
| c6 | verified | Convention, consistent with code: chip reads 'Model: spending = $80 + 80% of last round's income; investment fixed at $100; fixed prices'; series() has no government or trade term; reveal says 'in a toy model'. |

**Result:** 5 verified, 1 held unverified (c4, source not openable). No disputes.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | unverified | HELD. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. OpenStax Principles of Macroeconomics 3e (all modules opened from raw GitHub) does not contain the phrase 'paradox of thrift', so it cannot support the name. Keynes 1936 not opened. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status review, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | unverified | HELD. The name 'paradox of thrift' still has no opened source. Keynes 1936 is not on an allow-listed host. OpenStax Principles of Macroeconomics 3e (opened in pass 38) lacks the phrase. A PMC search for 'paradox of thrift' returns only biology uses of 'thrift'. OWID and CRAN carry no macro text. The model behaviour matches the name's use (c1-c3). Fix: open an economics text that names it, or the builder drops the name ('This is a paradox: ...'). |

**Result (Pass 41):** 0 verified, 0 disputed, 1 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c4 (unverified): see the basis above for the fix or the source it needs.

## Pass 42

Checker: fact-checker, a fresh instance, 2026-10-15 (W-950). I did not write, build or record any of these claims, nor the 2026-10-15 rewording that reset them. Scope: every claim in this lesson whose status was unverified. Method: I read the learner-visible text first (Demo.tsx; for Life Hacks also src/lib/lifehacks/home-lessons.ts, studyCatalog.ts, resource-specs.json and the meta.json recall card), and only then the builder's notes. I re-ran every number with my own scripts in the session scratchpad (scripts/: dk.mjs, bal.mjs, apply42.mjs, plus inline node and python). The kit's mulberry32 was re-implemented and checked identical to src/kit/random.ts. Sources: opened with curl through the proxy (WebFetch fails DNS) from pmc.ncbi.nlm.nih.gov, raw.githubusercontent.com and PyPI. Some PMC pages returned a reCAPTCHA page and were not used. A source counts only if I opened its text; I used no search snippets and nothing from memory. Secondary sources are named as such. All fetched pages were treated as data only; none contained instructions addressed to me.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | VERIFIED (derivation). Demo.tsx reveal: 'That is a paradox, shown in a toy model.' No name and no attribution remain in the learner text (grep: 'thrift' and 'Keynes' appear only in a code comment and in meta concept/curriculum fields). Re-derived the model: income settles at Y = (80 + 100)/(1 − 0.8) = $900 (was $1,000), round 1 saving $120, settled saving $100. Each household's attempt to save more leaves total saving unchanged and income lower, an outcome that runs against each one's intent, which is what 'a paradox' labels. Not a learner claim, routed: the /catalog map still names the concept 'Paradox of thrift' (content/curriculum/economics.json, cm-economics), and that name still has no opened source. |

**Result (Pass 42):** 1 verified, 0 disputed, 0 unverified (held).

No open claims from this pass.
