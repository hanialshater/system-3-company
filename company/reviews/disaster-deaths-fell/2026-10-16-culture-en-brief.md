# Cultural review, stage A (brief): disaster-deaths-fell (History brief 11)

owner: cultural-reviewer (Amira)
date: 2026-10-16
class: sensitive-topic review, stage A (brief, before build; W-626, W-764, W-960/W-1037)
route: cultural-reviewer -> cm-history (rewrites the brief; W-1038) -> research-lead/fact-checker (pin and claims) -> demo-builder (only after the brief is amended and I confirm)
recorded by: cultural-reviewer

slug: disaster-deaths-fell
stage: brief
classes: famine and group-tied epidemics, migration and demography (mortality by group or country), war and violence (famines with military causes; added by the reviewer)
reviewer: cultural-reviewer (Amira)
brief: company/domains/briefs/history.md#11. disaster-deaths-fell
research note: company/research/notes/2026-10-15-provenance-disaster-deaths-fell.md
Verdict: go with changes. Not buildable as drafted: the brief must be amended and its numbers re-scripted first (W-1038); builders do not start from the current text.

Independence: I did not draft the brief or write the note. Unbuilt. No builder notes read.
Reader I took (P3): a reader in Bengal, in Ukraine, in Henan.

## Findings

- F2 / P3 FIX (the main one). The stage is a stack labelled "drought" and "epidemic" under the heading "natural disasters". The note shows the big drought years are famines (China 1920 and 1928, USSR 1921, India 1942, Bengal 1943), and OWID's Famines page (medium) quotes Sen that speculation and panic buying were a primary cause of the Bengal famine. A reader in Bengal or Henan would not recognise those as weather events. The reveal's "Most of the 1920s deaths were recorded under drought and epidemics" repeats the database's label as if it were the cause.
- N1/N3 FIX. The headline ratios (x15 fewer, x57 per person) depend on counting epidemics as disasters. The current OWID/EM-DAT series, which its maintainers now use, has none: about x10 (x9.8 on the current series, x10.3 on the pinned file without epidemics) and about x36 per person (the note's arithmetic, low until scripted). Also the pinned file's 1918 influenza row is 449,700, which understates the pandemic a lot, so the epidemic stack is incomplete in the way that matters most. "15 times" is a number picked by a definition the field has dropped (N3: the extreme estimate for surprise).
- N5 FIX. The prediction ("about how many a year in 2010 to 2017?") is "guess how many died". Change it to a shape question (see change 2).
- N2 / P2 FIX. The limit sentence says "early records are less complete" but not why the gap is uneven: records before 2000 are mostly large events, and missingness is not random (OWID; Jones et al. 2022, PMC9481555). The fall partly measures who was counted. The held clause is now checkable from OWID's page (opened).
- F2 FIX. Care line "no 'nature is getting kinder' framing": the reveal must not read as a trend of safety. State the number as a fall in recorded deaths.
- N4 PASS with a condition: no country is on the stage; if anyone adds country labels, today's names must not be projected back ("Bangladesh 1943" in the current series). No labels, then.
- I5 PASS with a condition: the "Biggest single year" preset (1931, 3.7 million, one China flood estimate) is shown as the volatility of one estimate, with its number as a label, not as a surprise.
- L2 FIX (small). Do not write "droughts then were famines" as the brief's own care note does as a flat statement of cause; the reveal says "recorded under drought; many of these were famines".
- R-list: none hit.

## Exact changes (cm-history, in the brief)

1. Pin the current OWID `natural-disasters-deaths` series (research-lead's scratch copy, sha256 3059d030...), re-script section 11 on both series, and keep one headline: either the current series (no epidemics; x10) or the pinned file with the epidemic stack labelled "epidemics (this older copy counts them as disasters)". My preference is the current series. Builders copy numbers from the re-scripted output only.
2. Stage question shape: "Recorded deaths from natural disasters each year fell between the 1920s and 2010-2017 while the world's population grew 3.7 times. How did the deaths per million people change?" Options at one precision, for example A "About the same" / B "Fell about 10-fold" / C "Fell more than 30-fold", with the letters and numbers set by the script. (23 words as drafted: recount.)
3. Legend: "Drought (recorded as a natural disaster; many were famines)". Epidemic stack, if kept: "Epidemic (counted as a disaster in this copy)".
4. Reveal, as a shape, with placeholders for the script's numbers (about 80 words, recount):
   "Recorded deaths from natural disasters fell from about [X] a year in the 1920s to about [Y] in 2010 to 2017, while the world's population grew 3.7 times. Most 1920s deaths were recorded under drought, and many of those were famines whose causes were not only weather. Where it stops: early records hold mostly the largest events, so part of the fall is who got counted; one year can swing a decade, and 1931 alone recorded 3.7 million. This counts deaths, not how many disasters happened."
   (The clause "whose causes were not only weather" is a held claim: fact-checker opens OWID's Famines page. Fallback: "many of those were famines".)
5. "Early records hold mostly the largest events" moves from held to sourced (OWID Natural Disasters page, opened 2026-10-15).
6. No country labels; no "nature" wording in the title or hook. Suggested title: "How recorded disaster deaths changed in a century."
7. After the amendment, send me an addendum request; I confirm the rewritten stage question and reveal before the brief-skips line is removed.

## Who must act
- cm-history (Anselm's strand inactive, W-690): W-1038 item (pin current OWID series, fix the x15) plus changes 2-6.
- research-lead: pin the series (a data pin is the lead's or cm-history's call; the note proposes it).
- fact-checker: new claims.
- Tranche note: this brief is on the "new lessons" list; it waits on W-1038 regardless.

## Objections
- Against the brief's own framing "droughts then were famines" as a care note rather than a stage fact: the stage must carry it, because a care line a learner never sees protects no reader.
- Carried: file-name objection (see the khanates record).
