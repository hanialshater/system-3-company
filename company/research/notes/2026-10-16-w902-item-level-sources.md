# Item-level sources for the two held behavioral c6 lines (W-902, batch r3 B2)

- date: 2026-10-16 · author: research-scientist (Dario) · task: W-902 · batch: `company/ops/dispatch-requests/2026-10-16-r3-research.md#B2` (chooser: research-lead)
- for: fact-checker (c6 in `sure-million-or-long-shot` and `same-week-a-year-apart`), cm-behavioral (whether either line returns under brief rule 6), research-lead (my finding against the 2026-10-15 note, section 3)
- inputs read: `company/research/notes/2026-10-15-w902-behavioral-economics-replication-sourcing.md`; the c6 rows and "What would change a verdict" in `company/reviews/sure-million-or-long-shot/2026-10-16-fact-check.md` and `company/reviews/same-week-a-year-apart/2026-10-16-fact-check.md`; the held lines in `company/domains/briefs/checks/behavioral-allais-certainty-effect.mjs` (lines 77-78) and `behavioral-present-bias-reversal.mjs` (line 54)
- **This note changes no claim's status.** Nothing here is verified until the fact-checker opens it.

## How to re-run, and what "opened" means here

- All PMC full texts came from the OAI-PMH endpoint: `https://pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/?verb=GetRecord&identifier=oai:pubmedcentral.nih.gov:<PMCID digits>&metadataPrefix=pmc`. It answered 200 for every id asked, 12:19-12:25Z, no captcha.
- **Hashes.** Each OAI response has a `<responseDate>` element, so the raw sha256 changes on every fetch. I checked this by fetching PMC9337702 twice: the two files were identical once that element was removed. The hashes below are of the response **with `<responseDate>…</responseDate>` deleted** (`sed 's/<responseDate>[^<]*<\/responseDate>//' f.xml | sha256sum`).
- PMC search: `https://pmc.ncbi.nlm.nih.gov/search/?term=<query>` (200, plain curl). I used it only to find candidate PMCIDs. No search page is used as evidence.
- Copies of every fetched file are in `artifacts/research-w902/` (gitignored, not committed).
- "Opened" means I fetched the full text and the quoted words are in it. "As reported by X" means an opened paper X describes Ruggeri 2020 or Augenblick 2015. I did not open either primary paper.
- Statements from my memory are marked **[memory]**. Nothing in a verdict rests on them.

| Opened file | Paper | sha256 (responseDate removed) |
|---|---|---|
| PMC9337702 | Cicerale, Blanzieri, Sacco & Soltani 2022, *PLoS ONE*, doi 10.1371/journal.pone.0270117 | `3a454b257e3f878a0d16d74fb8e8db7cc95083ded1c5c6548cbaa87757597f89` |
| PMC9963545 | Binz & Schulz 2023, *PNAS*, doi 10.1073/pnas.2218523120 | `16a7584f648aeb019abef55be9e595a56575b10199fff5aa4ad38076814ce323` |
| PMC7929998 | Tan, Li, Zhang et al. 2021, *Front Psychol*, doi 10.3389/fpsyg.2021.596745 | `a714a86269f862abe41792e7f995a9b4bb900a6dfd474eee5aaccac903c3d905` |
| PMC10489299 | Cohen, Ericson, Laibson & White 2020, *J Econ Lit*, doi 10.1257/jel.20191074 | `21ca9f5015305a131481f272a29610bc4b26faa42070c98b53ace94e4321c5ef` |
| PMC5545082 | Chakraborty, Calford, Fenig & Halevy 2017, *Exp Econ*, doi 10.1007/s10683-016-9506-z | `ad72ab4ee2611adb6c7dd501ac17e07d6301494f07185c51f723c841314f92ef` |
| PMC11628449 | Freeman, Laughren et al. 2024, "Task completion without commitment", *Exp Econ*, doi 10.1007/s10683-024-09824-2 | `4acef36c89dd56b4a8e8eb300b23b4b28ce16e677f6933cdbff0c8d92cbf7d43` |

## 1. Line one: the certainty effect (Ruggeri et al. 2020), `sure-million-or-long-shot` c6

**Held text** (check script, lines 77-78): "Re-run with 4,098 people in 19 countries, it held up, weaker than first reported." / "That is the reverse of the certainty effect, which held up with 4,098 people in 19 countries, weaker than first reported."

**The sentence the line needs:** an opened passage saying that Ruggeri et al. 2020 replicated **the certainty-effect item(s)** of Kahneman & Tversky 1979, with a smaller effect than the original. The lesson's own pair is the Allais common-consequence pair (1A 100% $1M vs 1B 10/89/1; 2A 11/89 vs 2B 10/90; fact-check c7). The best support would therefore name that pair or its K&T 1979 version.

### Routes tried

| # | Route (exact URL or query) | Time (UTC) | Result |
|---|---|---|---|
| 1 | PMC search `"Ruggeri" AND "prospect theory" AND "19 countries"` | 12:20 | 200; candidates PMC11802475, PMC9337702, PMC9347223 |
| 2 | PMC search `"Replicating patterns of prospect theory"` | 12:20 | 200; 10 candidates (PMC10434768, 11725824, 12851072, 8079223, 8904497, 9007384, 9032756, 9326354, 9337702, 9934584) |
| 3 | OAI full text for each of the 13 candidates in rows 1-2 | 12:20-12:21 | all 200. Only PMC9337702 reports item-level Ruggeri results. The others cite it only in passing (for example PMC9347223: "none of the prospect theory's theoretical constructs … were unreliable"; PMC11802475: replicated "for financial choices … in 19 countries"). |
| 4 | PMC searches `Ruggeri AND "certainty effect"`; `"Ruggeri et al" AND "certainty effect" AND "19 countries"`; `"10.1038/s41562-020-0886-x"`; `Ruggeri AND Allais AND replication` | 12:20-12:21 | 200; new candidates PMC10036405, 8095218, 9840594, 9963545, 11450482, 13576738, 7929998, 9584811 (the DOI query returned none) |
| 5 | OAI full text for the row 4 candidates | 12:21 | all 200. **PMC9963545** (Binz & Schulz) plots Ruggeri's human data per contrast, but only in a figure (row 7). **PMC7929998** gives an item-level aggregate (quoted below). The rest cite Ruggeri 2020 only in general terms (PMC8095218: the certainty effect "predicting a strong aversion to sure losses (Ruggeri et al., 2020)"; PMC9840594, 13576738, 9934584: "high variability and conflicting types of violations"). |
| 6 | PMC searches `Ruggeri AND "common consequence"`, `Ruggeri AND "common ratio"`, `Ruggeri AND "Allais paradox"` | 12:23 | 200; new candidates PMC10737683, 11586569, 12583147, 6771755 and others. On OAI, the first three are off-topic (dialysis, veterinary neurology, stem cells). No new item-level source. |
| 7 | Binz & Schulz Fig. 2D image: `https://pmc.ncbi.nlm.nih.gov/articles/PMC9963545/figure/fig02/` (200, no captcha), then the image it names, `https://cdn.ncbi.nlm.nih.gov/pmc/blobs/1843/9963545/dc008a74c259/pnas.2218523120fig02.jpg` | 12:23 | page 200; **image: proxy 403 (CONNECT refused)**. The human value per contrast is only in the figure, so it was not read. |
| 8 | Binz & Schulz data repo, named in their "Data, Materials, and Software Availability": `https://raw.githubusercontent.com/marcelbinz/GPT3goesPsychology/main/README.md` (also `master`) | 12:23 | 200, 1,143 bytes. The README lists no file paths. `github.com/marcelbinz/GPT3goesPsychology`: 403. `gh api …/git/trees/HEAD`: refused ("GitHub access to this repository is not enabled for this session"). I did not guess file paths. |
| 9 | Crossref `https://api.crossref.org/works/10.1038/s41562-020-0886-x` | 12:22 | 200 (sha256 `9be4d381…27dd`). No supplementary-file DOI. Relation: `has-preprint` 10.31219/osf.io/2nyd6. Links go only to nature.com. |
| 10 | OSF preprint: `https://osf.io/2nyd6/` 200 (a 4,207-byte shell page with no text); `https://osf.io/2nyd6/download` → 301 → `https://osf.io/download/2nyd6` → 308 → `https://files.osf.io/v1/resources/2nyd6_v1/providers/osfstorage/5d5d30ad9aa3820018fb0d28` | 12:22 | **files.osf.io: proxy 403.** Not opened. |
| 11 | Publisher: `https://www.nature.com/articles/s41562-020-0886-x` and `.pdf` | 12:22, 12:25 | 303 → `idp.nature.com/authorize…` → proxy 403 |
| 12 | `https://zenodo.org/api/records?q=…`, `https://api.osf.io/v2/`, `https://pubmed.ncbi.nlm.nih.gov/32424259/`, `https://static-content.springer.com/` | 12:22 | all proxy 403 |

### What was opened, word for word

- **Cicerale et al. 2022, PMC9337702, Discussion** (sha above): "More in general, and taking in consideration their entire sample, Ruggeri and colleagues completely replicated Prospects A-A’ and B-B’, i.e., those comparing probable vs. sure prospects. … The other prospects, those where options with different probabilities are compared, were not completely replicated by Ruggeri and colleagues. In particular, in Prospect C Ruggeri could not replicate the effect originally found by K&T in the gain domain, and in Prospect D’ Ruggeri found a strong attenuation of the effect found by K&T in the loss domain."
- **Same paper, Materials and methods, Table 1** gives the prospects: A "You have been given 4000€. Now choose between a 50% possibility of winning 4000€ or a sure win of 2000€"; B "one possibility out of 1000 of winning 30000€ or a sure winning of 30€"; **C "Choose between a 20% possibility of winning 4000€ or a 25% chance of winning 3000€"**; D "one possibility out of 1000 of winning 6000€ or two possibilities out of 1000 of winning 3000€". The primed versions are the matching losses. The methods also say they used Ruggeri's "publicly available dataset" (Italian subsample N = 117; all-country age-matched subsample N = 1,425).
- **Same paper, Results > Experiment 2 > Robustness checks**: the Ruggeri all-country subsample chose the sure option on A' 42% and B 38% (against 64% and 57% in Cicerale's samples). These are percentages for single items in an age-matched subsample. None of them is the certainty-effect pair.
- **Tan et al. 2021, PMC7929998, Introduction**: "A recent study with a total of 4,098 subjects from 19 different regions worldwide confirmed that 94% of the items suggested by PT theory could be successfully replicated, including experiments revealing the four-fold risk attitude (Ruggeri et al., 2020)."
- **Binz & Schulz 2023, PMC9963545, Fig. 2 legend**: "(D) Log-odds ratios of different contrasts used to test for cognitive biases. Positive values indicate that the given bias is present in humans (circle) or GPT-3 (triangle). Human data adapted from Ruggeri et al. (24)." The text defines "Certainty effect" as one of six contrasts but gives no human value. The value is in the image (route 7, blocked).

### Reading

- Cicerale's prospects A and B are sure-versus-risky pairs, but they are **not** the certainty-effect pairs. **[memory]** In K&T 1979, A/A' match the isolation problems (11/12, with a prior bonus) and B/B' match Problem 14/14' (a lottery against a small sure amount). Prospect C, (4000, .20) vs (3000, .25), is the **second half of K&T's common-ratio certainty-effect demonstration (Problems 3 and 4)** **[memory, from matching the numbers]**. The common-consequence Allais pair (Problems 1 and 2), which is the lesson's pair, does not appear in Cicerale's set.
- So the only opened item-level statement that touches a certainty-effect problem says that Ruggeri **"could not replicate the effect originally found by K&T"** on Prospect C, gains. That is a statement about the majority choice on one problem, not about the shift between Problems 3 and 4. A shift could still exist with no majority reversal. Cicerale does not report the shift, so the opened text cannot settle it.
- Tan et al.'s "94% of the items" is an aggregate. It does not say which items, so it neither confirms nor rules out the certainty-effect items.

### Verdict, line one: **partly sourced, and the part that is sourced cuts against the line as worded**

- Sourced (as reported by Cicerale 2022): 4,098 participants in 19 countries; the problem set was "substantially confirmed … albeit with attenuated effects"; the sure-versus-probable items A/A' and B/B' were "completely replicated".
- Not sourced: any statement that the **certainty-effect** items, in either the common-consequence form (Problems 1-2) or the common-ratio form (3-4), replicated. One half of the common-ratio pair (Prospect C, gains) was reported as **not** replicated.
- "It held up, weaker than first reported", said of the certainty effect, is therefore not supported at item level from this sandbox. The opened item-level evidence leans the other way for the common-ratio form, and says nothing either way for the lesson's common-consequence pair.
- Confidence: **high** that no opened source supports the line. **Medium** on the reading that Prospect C is half of K&T's certainty-effect pair (the numbers match K&T Problem 4 as I remember it; the fact-checker should confirm against K&T 1979). **We don't know** whether Ruggeri's own certainty-effect contrast (Fig. 2D in Binz & Schulz; the Ruggeri dataset) is positive.

## 2. Line two: "with real payments" (Augenblick, Niederle & Sprenger 2015), `same-week-a-year-apart` c6

**Held text** (check script, line 54): "With real payments, reversals are clearer for effort than for money."

**The sentence the line needs:** (a) an opened passage saying that AN&S 2015's choices were incentivised for real: work actually done and money actually paid, not hypothetical; and (b) one saying that dynamic inconsistency was clearer for effort than for money. (b) was already sourced by Cohen et al. 2020 (2026-10-15 note). The gap is (a).

### Routes tried

| # | Route | Time (UTC) | Result |
|---|---|---|---|
| 1 | OAI full text, Cohen et al. 2020, PMC10489299 | 12:19 | 200, 395,369 bytes. All 9 mentions of Augenblick read in full, plus footnote 17 (the footnote on the key passage, which is about Gill & Prowse and Casari & Dragone, not payment). The text uses "time-yoked work/effort task" and "time-dated financial flows". **It does not say that the money was really paid.** Its general passage on "real payments" in MEL tasks (§ on incentives: "the desirability of using real payments in a MEL task, as opposed to hypothetical rewards, is open to debate") does not mention AN&S. |
| 2 | PMC search `"Augenblick" AND "Sprenger" AND "Niederle"` | 12:20 | 200; PMC10489299, 5167530, 5545082, 7079766, 7946162, 9194950 |
| 3 | PMC search `Augenblick AND "real effort" AND "monetary" AND "present bias"` | 12:23 | 200; adds PMC11033307, 11628449, 12140074, 13428879, 5489713, 9569241 |
| 4 | PMC search `Augenblick AND "convex time budget" AND effort` | 12:23 | 200; no results |
| 5 | OAI full text for every row 2-3 candidate | 12:24 | 200 for all except **PMC13428879: 400** (478 bytes; not in the OAI set). I scanned every Augenblick passage for paid / payment / cash / incentivized / hypothetical. Relevant passages: PMC5545082 and PMC11628449 (below). PMC5167530's "randomly selected to be paid" is about its own study (Carvalho et al.), not AN&S. |
| 6 | Crossref `https://api.crossref.org/works/10.1093/qje/qjv020` | 12:25 | 200 (sha256 `4d6efb20…ce80`). No preprint relation, no licence. Links only to academic.oup.com. |
| 7 | Publisher `https://academic.oup.com/qje/article/130/3/1067/1931465` | 12:25 | proxy 403 |

### What was opened, word for word

- **Chakraborty, Calford, Fenig & Halevy 2017, PMC5545082, section "Augenblick et al. (2015)"**: "Augenblick et al. (2015) build on this argument, and compare the preferences elicited through CTB design using both monetary payments and effort tasks … In their first study (henceforth original experiment) subjects allocate both cash and units of effort over two dates, using a within-subject design. They also run a second study (henceforth replication experiment) in which they implement a between-subject design to replicate the findings of the first study. Augenblick et al. (2015) identify two key differences between the monetary tasks and the effort tasks. First, present bias is found only in the effort domain and, second, the proportion of interior choices is much higher in the effort domain." The same section reanalyses AN&S's own choice data (its Table 3 "Original study, work data", 720 rows; Table 4 "Original study, money data", 385 rows).
- **Freeman et al. 2024, PMC11628449, literature paragraph**: "Most papers in this literature find that subjects are present biased on average, a finding less pronounced for monetary rewards (Augenblick et al., 2015) … Our design uses a real effort task from Augenblick et al. (2015)."
- **Cohen et al. 2020, PMC10489299, § "Experimental Studies Using Time-Yoked Consumption (Instead of Financial Flows)"** (already cited 2026-10-15): "Using a time-yoked work/effort task, Augenblick, Niederle, and Sprenger (2015) found evidence of dynamic inconsistency. … When the time to work arrived, some participants were given the opportunity to change their self-selected work plans. … In contrast, they found much weaker (but still statistically significant) evidence of dynamic inconsistency with respect to participant decisions that involved time-dated financial flows."

### Verdict, line two: **partly sourced**

- Sourced, as reported: the effort was real work done at the chosen dates (Cohen: "time-yoked work/effort task", participants changed their work plans "when the time to work arrived"). The money side used "monetary payments" and subjects "allocate … cash … over two dates" (Chakraborty et al.). Dynamic inconsistency was clearer for effort than for money (all three papers).
- Not sourced: the words "real payments", or any sentence saying that the money choices were paid out rather than hypothetical. "Allocate cash" and "monetary payments" imply real cash, but they are not the statement the line makes. I would not count it as closing the gap.
- New detail the fact-checker should see: the opened secondary sources differ on money. Cohen says "much weaker (but still statistically significant)"; Chakraborty says "present bias is found only in the effort domain". Both support "clearer for effort than for money". Neither supports a stronger "none for money".
- Confidence: **high** that no opened passage says "real payments" or "paid". **Medium-high** that AN&S paid real money **[memory: the paper is an incentivised lab-and-online design with completion payments; not opened]**. A fact-checker could accept "with real effort" (sourced as reported) as a rewording, but that is cm-behavioral's call, not mine.

## 3. Finding against the 2026-10-15 note (stop-if triggered for line one)

The 2026-10-15 note gives **Allais / certainty effect: robust (smaller than in the 1979 original)**. It rests on Cicerale's summary sentence ("substantially confirmed the original findings, albeit with attenuated effects"). The same paper's Discussion, which that note did not quote, says Ruggeri **"could not replicate the effect originally found by K&T"** for Prospect C, gains, which matches the scaled half of K&T's common-ratio certainty-effect pair. That narrows the verdict:

- Proposed (for research-lead to accept or reject): **certainty effect, common-ratio form: with limits (one item not replicated, as reported by Cicerale 2022). Common-consequence Allais pair: we don't know from this sandbox.** List & Haigh 2005 (PMC545552) and Seak et al. 2025 (PMC13576738) were opened as abstracts on 2026-10-15 and still support Allais-type violations in general, so "robust" for "people often violate independence" is not overturned. What fails is the particular attribution "it held up in the 19-country re-run".
- As the stop-if requires, I stopped the Ruggeri sweep at this point. Before the finding I had already tried rows 1-12 above; none of them opened an item table.

## 4. What it means for the lessons

- Both lines are already cut (behavioral r3 B3, HELD_LINE = false). **Nothing here supports bringing either back as worded.** The pilots teach without them: the derivation (c11) and the learner's own choices carry `sure-million-or-long-shot`, and the steady-model strip carries `same-week-a-year-apart`.
- If cm-behavioral wants a type (d) line back later, these are the candidates the opened text could support, offered for cm-behavioral to word or refuse (not written as lesson text): for present bias, a line about real effort, attributed to the opened reviews; for the certainty effect, nothing about the 19-country re-run is safe beyond "the problem set as a whole replicated with smaller effects".

## 5. What would settle it (the conditional founder ask, exact list)

Neither line is reachable from this sandbox. The research lead's batch names the founder's two options. The exact items are:

- (a) Files in the repo: Ruggeri et al. 2020, *Nat Hum Behav* 4:622-633, doi 10.1038/s41562-020-0886-x, **with its supplementary item table** (or the OSF preprint file `files.osf.io/v1/resources/2nyd6_v1/providers/osfstorage/5d5d30ad9aa3820018fb0d28`); and Augenblick, Niederle & Sprenger 2015, *QJE* 130(3):1067-1115, doi 10.1093/qje/qjv020 (its design and payment section).
- (b) Host allow-list, for the founder alone to decide: `idp.nature.com` (nature.com articles), `files.osf.io` (the preprint; **this run's addition to the batch list**), `cdn.ncbi.nlm.nih.gov` (the Binz & Schulz Fig. 2D image, a cheap check of Ruggeri's certainty-effect contrast; **also new**), `academic.oup.com`. A GitHub read grant for `marcelbinz/GPT3goesPsychology` would also let a reader find the human-data file behind Fig. 2D.
- No agent may make this ask on the founder's behalf. It goes to the founder through the chief of staff, if at all. Nothing is blocked without it.

## Next, and who owns it

- **fact-checker** (lane 10, routed by evaluation-steward): at the next c6 check, open the quoted passages above (Cicerale Discussion and Table 1; Chakraborty § "Augenblick et al. (2015)"; Cohen §§ as cited), confirm or reject my Prospect C = K&T Problem 4 mapping, and record c6 in both lessons. On this evidence I expect "not checkable as worded".
- **cm-behavioral**: decide under brief rule 6 whether either line returns in another form (section 4). Research does not decide it.
- **research-lead**: accept or reject section 3's narrowing of the certainty-effect verdict in the 2026-10-15 note.
- **B4 (W-1063)**: the PMC OAI endpoint and search page are reachable (200 throughout 12:19-12:25Z), so B4's "PMC unreachable" stop-if does not fire. The PMC CDN (`cdn.ncbi.nlm.nih.gov`) is blocked, so figures in PMC papers cannot be read.
