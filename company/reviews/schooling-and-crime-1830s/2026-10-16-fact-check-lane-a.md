# Fact-check (after lane A, open claims): schooling-and-crime-1830s

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff, after lane A: remaining open claims outside Books, fewest-open lessons first. Builder notes and build.md not read.

Method: Read Demo.tsx for the rendered sentence first (no server or walkthrough this pass; Demo.tsx unchanged since the last fact-check walkthrough), re-derived numbers by hand and in node, and opened sources only through the PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and raw.githubusercontent.com; other hosts are refused by the proxy here.

| claim | status | reason / fix |
|---|---|---|
| c1 | verified | VERIFIED. Own run: Guerry.csv fetched from raw.githubusercontent.com/vincentarelbundock/Rdatasets (sha256 13f9ff6a...8433, equal to the history-data.mjs pin); Demo.tsx RAW equals the file's [Literacy, Crime_prop, Crime_pers] in 86 of 86 rows, file order (own node script). Doc HistData/Guerry.html (opened): Literacy 'Percent of military conscripts who can read and write'; Crime_pers/Crime_prop 'Population per Crime against persons/property. Source: A2 (Compte general, 1825-1830)'; '86 departments of France around 1830'. The one phrase held by FC 58/59, hook 'young men could read', now has opened sources: Edinburgh Med Surg J 1834 (PMC5776539): 'every male upon reaching twenty years of age, is bound to enrol himself'; 1838 (PMC5772286): 'the class of young men between 20 and 21 years of age' (see literacy-split-france c4). Advisory from FC 58 stands, non-blocking: title '1830s' for 1825-1830 records ('around 1830' in the doc). |

The same text is in each claim's note in src/demos/*/schooling-and-crime-1830s/meta.json.
