# Fact-check (after lane A, open claims): clap-at-the-cliff

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff, after lane A: remaining open claims outside Books, fewest-open lessons first. Builder notes and build.md not read.

Method: Read Demo.tsx for the rendered sentence first (no server or walkthrough this pass; Demo.tsx unchanged since the last fact-check walkthrough), re-derived numbers by hand and in node, and opened sources only through the PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and raw.githubusercontent.com; other hosts are refused by the proxy here.

| claim | status | reason / fix |
|---|---|---|
| recall | verified | VERIFIED. Recall as in meta.json: 'Sound in sea water travels 1,500 m each second', ping back after 2 s, key '1,500 m'. Arithmetic: 1,500 x 2 = 3,000 m round trip, half = 1,500 m; the other options (750 m, 3,000 m) are the halve-twice and no-halving slips. Speed: Communications Engineering 2025, 'Leveraging satellite observations and machine learning for underwater sound speed estimation' (PMC12263853, opened via PMC OAI): 'the average seawater sound speed of about 1500 m/s'; OpenStax College Physics 2e m42256 table gives 1540 m/s for one sample (FC wj64). 1,500 m/s is the standard average. Builder, non-blocking: write 'about 1,500 m each second' in the question, since real sea water varies with temperature, salinity and depth. |

The same text is in each claim's note in src/demos/*/clap-at-the-cliff/meta.json.
