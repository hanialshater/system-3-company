# Fact-check (after lane A, open claims): scale-on-a-slope

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff, after lane A: remaining open claims outside Books, fewest-open lessons first. Builder notes and build.md not read.

Method: Read Demo.tsx for the rendered sentence first (no server or walkthrough this pass; Demo.tsx unchanged since the last fact-check walkthrough), re-derived numbers by hand and in node, and opened sources only through the PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and raw.githubusercontent.com; other hosts are refused by the proxy here.

| claim | status | reason / fix |
|---|---|---|
| c4 | disputed | STILL DISPUTED (Demo.tsx unchanged since FC wj64, 738aef9). I re-derived it: on a 60 degree platform the person needs friction mg sin 60 against normal mg cos 60, so mu >= tan 60 = 1.732 between shoes and platform; the stop block (drawn at the scale's downhill end) holds only the scale. Exact corrected text, keeping the drawing: 'Idealisations: a rigid scale that measures only the perpendicular force, the person at rest, a stop block holding the scale at 60°, and shoes that grip the platform perfectly (at 60° they would need a friction coefficient of at least 1.73). The arrows are drawn to scale with each other (62 px for the full weight), not with the person.' Demo.tsx comment line 6 and the caption need no change for that wording; if the builder instead draws a foot rail against the shoes, say so in c4 instead. |
| alt1 | disputed | DISPUTED. Demo.tsx line 109 uses one sentence for every angle, so at 0 degrees the picture text says 'Flat ground. The person's weight arrow splits into a part into the ramp and a part along the ramp.' What is wrong: on flat ground there is no ramp and the along-slope part is mg sin 0 = 0; the stage draws one arrow. Corrected statement for th === 0: 'Flat ground. The person's whole weight presses into the scale.' (keep the existing sentence for th > 0). Then update this claim's text to the flat-ground sentence and reset it for a fact-checker. |

The same text is in each claim's note in src/demos/*/scale-on-a-slope/meta.json.
