# Fact-check (after lane A, open claims): literacy-split-france

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff, after lane A: remaining open claims outside Books, fewest-open lessons first. Builder notes and build.md not read.

Method: Read Demo.tsx for the rendered sentence first (no server or walkthrough this pass; Demo.tsx unchanged since the last fact-check walkthrough), re-derived numbers by hand and in node, and opened sources only through the PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and raw.githubusercontent.com; other hosts are refused by the proxy here.

| claim | status | reason / fix |
|---|---|---|
| c4 | verified | VERIFIED. Rendered (Demo.tsx lines 211-212): 'Where it stops: these are young men called up for the army, not everyone'. 'Called up ... not everyone': Rdatasets HistData/Guerry doc (raw.githubusercontent.com, opened): Literacy = 'Percent of military conscripts who can read and write'. 'Young men', from contemporary reports opened first-hand via the PMC OAI API: Edinburgh Medical and Surgical Journal 1834, review of Benoiston de Chateauneuf, 'On the Mortality of the Infantry of the French Army' (PMC5776539): 'According to the conscription law, every male upon reaching twenty years of age, is bound to enrol himself' and 'Conscripts join the army shortly after they reach twenty years of age'; Edinburgh Med Surg J 1838, 'Contributions to the Statistics of Hernia among Recruits for the British, and Conscripts for the French Army' (PMC5772286): 'Force of the class of young men between 20 and 21 years of age' and 'young men exempted from military service in France'. Both describe the law in force for Guerry's years (the 1834 review names the law of 1818). Builder, non-blocking: add these two citations to the source field. |

The same text is in each claim's note in src/demos/*/literacy-split-france/meta.json.
