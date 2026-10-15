# Provenance note: britain-made-most-co2-in-1850 (History brief 9, built, sensitive route)

- date: 2026-10-15 · author: research-lead (Wen) · task: W-959 · charter sensitive route, step 2 (owed late: the lesson was built before W-889 put it on the route)
- for: cultural-reviewer (W-960 `culture-en-brief`, then `culture-en` on the walkthrough), cm-history-population-economy (Olumide), cm-history, chief of staff (publish hold)
- brief: `company/domains/briefs/history.md` #9 · lesson `src/demos/history/britain-made-most-co2-in-1850/` (draft v2, 7 of 7 claims verified) · class: comparison of countries
- data read: `artifacts/history-data/owid-co2-data.csv` (pin `co2`; **the upstream master file still matches the pin today**, sha256 7f78e2b2…, re-checked 2026-10-15), the OWID `co2-data` README and `owid-co2-codebook.csv` (raw.githubusercontent.com, opened). I read the lesson's `meta.json` title, hook, objective and claims and grepped `Demo.tsx` for its learner text. I did not run the walkthrough; that is the reviewer's step.
- confidence marks: high = opened and re-run here; medium = opened secondary; low = inference; unverified (memory) = not opened

## 1. Whose record is it?

A **modern reconstruction**, not a record kept in 1850. The `co2` column's source is "Global Carbon Budget (2025)" (codebook, opened, high), maintained by the Global Carbon Project and processed by OWID (README, high). Nobody measured CO2 by country in 1850. The figures are estimates built backwards from historical statistics of fuel production, trade and use (unverified, memory, as to method: the README lists the GCP data and OWID's code but does not describe the early-year method; the GCP methods paper was not opened).

## 2. Who made it, when, for what purpose

- Global Carbon Project, Global Carbon Budget 2025: an annual scientific assessment of carbon sources and sinks (README, high that it is the source; purpose unverified, memory).
- OWID combines it with other series and publishes the dataset; the pinned file is from OWID's `master` branch (README: "updated regularly"; changelog entries through 2026-06-01, high).
- **What `co2` counts** (codebook, high): "Annual total emissions of carbon dioxide (CO₂), **excluding land-use change**, measured in million tonnes". The lesson calls it "fossil-fuel CO2", which matches the stage question. The codebook's per-capita entry describes the same family as "burning fossil fuels and industrial processes", which includes cement (high).
- Accounting is **territorial**: emissions are assigned to the country where the fuel was burned. The dataset also has `consumption_co2` (trade-adjusted, codebook, high). It is empty for 1850 in practice (unverified for every country; I did not tabulate it).

## 3. Published alternatives: the share changes with what you count (re-run on the pinned file, high)

| 1850 | UK (Mt) | World (Mt) | UK share |
|---|---|---|---|
| `co2` (fossil and industry; the lesson) | 122.35 | 196.85 | **62.2%** |
| `co2_including_luc` (adds land-use change) | 131.76 | 2,910.87 | **4.5%** |

Including land-use change (mostly clearing forests and grasslands), 1850's world emissions are about 15 times the fossil total. The United States is 26.8% and Russia 19.0% of that larger total. By 1900 the UK is 7.1% of emissions including land use. **Both numbers come from the same dataset and the same source (Global Carbon Budget 2025).** The lesson's claim is correct as stated ("the world's fossil-fuel CO2"), but "Britain made most CO2 in 1850" (the slug) is false if "CO2" means all CO2.

Other alternatives: cumulative and per-person CO2 (already kept on the sensitive route by the W-742 re-check, because those are the numbers "who owes what" arguments use). Countries with no 1850 entry (for example India and China in the fossil series) are blank, not zero (high).

## 4. Which perspectives it leaves out

- **Land-use emissions**, which in 1850 came mostly from the Americas, Russia and other agricultural frontiers (section 3). These include settler-colonial clearing of Indigenous lands (unverified, memory, as to attribution).
- **Colonies and trade.** "United Kingdom" here is the modern country code applied backwards; in 1850 the UK included all of Ireland (unverified, memory). Coal burned in Britain powered goods consumed elsewhere, and British-owned enterprises abroad are counted where they were, not to Britain. Consumption-based accounting does not exist for 1850.
- **People.** Emissions by country say nothing about who in a country burned the coal, worked the mines or bore the smoke.

## 5. Framing risks for the cultural reviewer

1. **The main one: "the world's CO2" in the built lesson's hook drops the qualifier.** The hook reads "How was the world's CO2 split between them?" (meta.json, read today). The stage question and reveal say "fossil-fuel" or "from burning fossil fuels", but the hook and the slug do not. Measured on all CO2, Britain's 1850 share is 4.5%, not 62%. A reader in Brazil, India or the United States could fairly say the lesson picked the measure that makes one industrial country dominant and erased land-clearing emissions. **Fix:** "fossil-fuel CO2" in the hook and title, and a where-it-stops clause about land use.
2. **The comparison of countries (W-889 class).** The stage compares Britain, the US, France and Germany. That is allowed as a measured quantity, with no blame, no "who owes what" and no present-day policy (care line, unchanged). Check that "Britain produced 62%" is not paired with any moral word.
3. **The current where-it-stops sentence** ("rebuilt from records of coal and other fuels, and early years are the roughest") is verified (c6), but the README I opened does not describe the early-year method. The verifier must have opened something else; the fact-check record (`company/reviews/britain-made-most-co2-in-1850/2026-10-14-fact-check.md`, not read for this note) should say what. That is for the fact-checker, not me.
4. **Master-branch pin.** The pin holds today. When OWID updates the file the check fails and the shares must be re-read. Not a framing risk, but a publish risk.

## 6. What is checkable from reachable hosts

| Item | Checkable? | Source |
|---|---|---|
| 62.2%, 21.4% in 1900, ×10, 122 → 420 Mt | yes (high) | `history-cycle1-check.mjs` section 9 on the pin |
| `co2` excludes land-use change | **yes (high)** | owid-co2-codebook.csv |
| share including land-use change, 4.5% | yes (high) | `co2_including_luc` in the pinned file; would need a script line |
| how 1850 figures were reconstructed | **no**: the GCP methods are not on a reachable host that I found | keep "early years are the roughest" |

## 7. Limit sentence: match

The lesson's "these figures are rebuilt from records of coal and other fuels, and early years are the roughest" is consistent with section 1 but not supported by what I opened. **Proposed (cm-history-population-economy decides; the lesson is built, so this is a v3 edit for a builder after the reviewer's verdict):** "Where it stops: this counts fuel burned in each country, not land clearing; counting forests cleared for farms, Britain's 1850 share was under 5%." Both numbers are data claims on the existing pin.
