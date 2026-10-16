# Fact-check: schelling-on-new-york, c10b (2026-10-16, lane B)

- Checker: fact-checker, lane B of the F-46 closeout (W-1483). Worktree base cdee168c, meta.json version 4. I did not write c10b.
- Scope: c10b only (Rothstein 2017, p. 143 lead). It is the last open claim. The lesson is hidden until c10b is verified.
- Result: **c10b still unverified.** I found a replacement source that I could open. The fix is below.

## The book: still not opened

Every route to *The Color of Law* was refused from this host:

- archive.org (also its advancedsearch), books.google.com, openlibrary.org search-inside: proxy CONNECT 403.
- The Google Books API: daily quota 0.
- The licensed classroom excerpts (Learning for Justice "COL Lesson 3" handout; 1619 Education "Day 9 Excerpt 3"): refused by both curl and WebFetch.
- Web search: Clemson News, Boston College and PIX11 write-ups of Rothstein's talks only. No page number.

The p. 143 (Levittown) lead from pass 3 is still unconfirmed. Five passes have now failed to open the book.

## Replacement source (cultural pass 3: "replace the source, not the order")

Swope, C. B., Hernández, D., & Cushing, L. J. (2022). The Relationship of Historical Redlining with Present-Day Neighborhood Environmental and Health Outcomes: A Scoping Review and Conceptual Model. *Journal of Urban Health* 99(6): 959-983. doi:10.1007/s11524-022-00665-z. PMC9342590. Opened in full through the PMC OAI API (`pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/?verb=GetRecord&identifier=oai:pubmedcentral.nih.gov:9342590&metadataPrefix=pmc`); DOI to PMCID through the PMC idconv API.

Quotes:

- "Redlining thereby contributed to segregation, disinvestment, and racial inequities in opportunities for homeownership and wealth accumulation."
- "Redlining created unequal opportunity for homeownership and wealth accumulation, contributing to present-day inequalities in wealth and income"

What it supports on the card ("housing and lending discrimination by race, including late-1930s government maps grading neighbourhoods for lending risk, then widening wealth gaps"):

- Racial discrimination in housing and lending (redlining) contributed to racial gaps in wealth. Supported.
- "widening" is my judgement call: unequal wealth accumulation makes a gap grow, so I read "widening" as fair. A stricter checker could ask for "lasting".
- The order (discrimination first, then wealth gaps) is kept.

What it does not support: c10b's own words "largely through home equity". That phrase is not on the card, so the claim text should drop it.

Caveat carried from the review itself: it reports "evidence to suggest that HOLC maps were not major determinants of access to mortgage loans". That concerns c10e and c10f (the maps), which are already verified with their own hedges. It does not weaken c10b's general discrimination-to-wealth-gap sentence.

## Fix (demo-builder applies; cm-geography approves the source swap)

- c10b text: "In US cities, housing and lending discrimination by race contributed to wealth gaps between groups (card: housing and lending discrimination by race ... then widening wealth gaps)."
- c10b source: the Swope et al. 2022 citation and the two quotes above.
- Status stays unverified. A fact-checker who is not the builder verifies it.
- Card text: no change needed.

Alternative: someone with the book confirms the Rothstein page, and c10b keeps its source.

## Status changes

None. The note on c10b is appended in meta.json.
