# Fact check: britain-made-most-fossil-co2-in-1850 v3 (FC pass 64)

- Fact-checker, 2026-10-16. SO-10-2, trigger d (claims reset by the v3 revision build), batch [project:history].
- Shared review server built from **6838dbac0613a3d1f2f5353e83b27d5c0dbf4f2c** (`/home/user/s3c-qa/.next-review5/BUILT_FROM`, read at start and end). R3a check: `R3a pass` (exit 0) for this lesson at main HEAD.
- Artifact first: `artifacts/walkthroughs/britain-made-most-fossil-co2-in-1850/transcript.md` (recorded 2026-10-16T14:28Z) read before the build note. I did not read the build note or the cultural review; the cultural reviewer's two number questions reached me through the chief of staff and are answered below.
- Data: pinned `artifacts/history-data/owid-co2-data.csv` (sha256 7f78e2b2..., matches history-data.mjs). I re-derived every number in my own node script (not the check script) and compared all 1,005 values in Demo.tsx `RAW` against the file rounded to 0.1 Mt: 0 mismatches. Then I compared with history-cycle1-check.mjs section 9.
- Sources opened today: OWID codebook (raw.githubusercontent.com/owid/co2-data/master/owid-co2-codebook.csv), OWID GCB metadata (raw.githubusercontent.com/owid/etl/master/etl/steps/data/garden/gcp/2025-11-13/global_carbon_budget.meta.yml), OWID "CO2 dataset sources" (ourworldindata.org/co2-dataset-sources, HTTP 200). The GCB paper (essd.copernicus.org) and globalcarbonbudget.org did not connect.

## Verdicts

| Claim | Verdict | Basis |
|---|---|---|
| c1 UK 62% of fossil CO2, 1850 | VERIFIED | 122.350/196.848 = 62.155% (stage RAW 62.195%), shown 62%. World co2 = coal_co2 in 1850. |
| c2 stage shares at 1800/1850/1900/1950 | **DISPUTED** | Stage shows **UK 95%** at 1800, the claim says 96%. The file gives 95.55% (96%), which section 9 asserts. The stage computes from 0.1 Mt rounded RAW (31.3/32.8 = 95.43%). Also, "France 0%" at 1800 shows a missing row as a zero (no France row before 1802; first row 2.239 Mt). |
| c3 21% by 1900, 122 -> 420 Mt | VERIFIED | 419.741/1,962.884 = 21.384%. |
| c4 world ×10 | verified (kept) | 9.972 (RAW 9.974). The id move is not a change (see below). |
| c5 US, Germany burned more coal | verified (kept) | Same numbers as FC39. The id move is not a change. |
| c6 "counts fuel burned in each country, not land clearing" | VERIFIED | The column is fossil fuels plus cement process CO2 (co2-dataset-sources). Cement is 0 in 1850, 0.07% of world co2 in 1900, and at most 1.13% of world co2 in any year 1750-1950 (at most 1.76% for any of the four countries). So "fuel burned" is fair for this span. Territorial: GCB meta.yml line 3. Excludes land use: line 162. |
| c7 several countries burned coal by 1850 | verified (kept) | UK, US, France and Germany each over 15 Mt, coal_co2 = co2. The id move is not a change. |
| c8 "counting land cleared for farms too ... under 5%" | **DISPUTED** | The number holds (131.764/2,910.870 = 4.527%). But "under 5%" is a sharper bound than OWID's own caveat on land-use uncertainty supports, and no opened source says "for farms". |

Counts: 6 verified (3 new: c1, c3, c6; 3 kept: c4, c5, c7), 2 disputed (c2, c8), 0 held.

## Does the id move count as a change? (c4, c5, c7)

No. For each of the three claims, text, support, source and status are byte-identical to the v2 record. I diffed Demo.tsx v2 -> v3: `RAW` is identical, and the learner text each claim addresses is unchanged (c4: the readout and "grown {g} times"; c5: "as the United States, Germany and others burned more coal"; c7: the hook's first sentence, the same in both versions). An id is the claim's address, not its content, so FC pass 39 stands. I still re-derived all three (same numbers) and set checkedOn to today. One nuance: the subject of c5's reveal sentence ("its share") now points back to "the United Kingdom" rather than "Britain". That is the same entity in the data, so the claim is unaffected.

## Cultural reviewer's questions (via the chief of staff)

1. **"UK 95%" at 1800 vs c2's 96%, and the 1800 labels summing to 99%.** This is a mismatch, not a fair rounding. The data says 95.55%, so 96%. The stage shows 95% because it divides two numbers that were each rounded to 0.1 Mt (31.3/32.8). The same label was in v2 ("Britain 95%"). FC pass 39 recorded "All round to the stage labels" because it computed the shares from the file and not from the stage's own arithmetic. That was my role's error, and this pass corrects it. The lesson is a draft and the claim was never published, so no COE. The sum is a separate rounding artefact: each band is rounded on its own, so the stage labels sum to 99% at 1800 and 101% at 1900. With unrounded inputs, 1800 sums to 100% and 1900 still to 101%. This does not block.
2. **"Under 5%" for 1850 land use, the least certain series.** "Roughly" is warranted. OWID's own page says "there is significant uncertainty in land use change emissions – significantly more than emissions from fossil fuels". World land-use CO2 (2,714 Mt) is 93% of the denominator. The 4.53% central value sits 0.47 points under the line, and a world land-use estimate about 10% lower would put the share at 5.0%. A flat "under 5%" is more precise than the series can be.

## Fixes (owner: the lesson's builder, history-builder-3; wording: cm-history)

- **c2.** Compute shares from unrounded values (store RAW at the file's 0.001 Mt precision), so the 1800 label reads UK 96%. Do not label a missing row as 0%: at 1800 write "France: no data" (or drop the label and add a short note, "France: no record before 1802"). Do not draw missing France years (before 1802, 1803, 1805-1809) as zero: leave gaps, or interpolate and say so in the claim. Then reset c2 with the new label text.
- **c8.** Suggested text: "counting land clearing too, the United Kingdom's 1850 share was roughly 5%" (or "only a few percent"). Keep 4.5% in the claim text. If "for farms" must stay, research-lead needs an opened source saying 1850 land-use CO2 was mostly clearing for agriculture. The research note's "mostly clearing forests and grasslands" has no source and does not say "for farms" either. For cm-history (a pedagogy call, not mine): "roughly 5%" in the reveal may read as confirming the predict distractor "About 5%".
- **c6 (non-blocking).** Re-cite the source to co2-dataset-sources and GCB meta.yml lines 3 and 162, not the research note.
