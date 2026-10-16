# Fact-check (after lane A, open claims): two-batteries-side-by-side

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff, after lane A: remaining open claims outside Books, fewest-open lessons first. Builder notes and build.md not read.

Method: Read Demo.tsx for the rendered sentence first (no server or walkthrough this pass; Demo.tsx unchanged since the last fact-check walkthrough), re-derived numbers by hand and in node, and opened sources only through the PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and raw.githubusercontent.com; other hosts are refused by the proxy here.

| claim | status | reason / fix |
|---|---|---|
| alt1 | disputed | DISPUTED. Demo.tsx line 165 (picture text in the series state): 'The bulb glows four times as bright'. What is wrong: the lesson's model gives four times the power (twice the current at twice the voltage, c2 and the reveal at line 116), not four times the brightness; a filament's light output does not scale in proportion to electrical power, and the stage's glow is schematic (c4). The support named (derivation from the model) does not reach brightness. Corrected statement for the alt string: 'The bulb glows brighter, at four times the power' (so line 165 becomes '... The bulb glows brighter, at four times the power; the run-time gauge shows ...' in series mode only). Then update this claim's text and reset it for a fact-checker. |

The same text is in each claim's note in src/demos/*/two-batteries-side-by-side/meta.json.
