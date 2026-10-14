# Build note: darkest-evening-of-the-year (v1, demo-builder, 2026-10-14)

Kept from evaluators until they report. Brief: company/domains/briefs/geography.earth-climate.md, Wave J #5.

- `solar.ts` is a port of section `sunset` of the check (same NOAA equations, noon-UT declination for each date). Re-run: 13 Dec sunset 15:51 (951.337 min, 12 Dec 951.342), 30 Dec sunrise 08:06, 21 Dec shortest (7 h 50 min), noon 11:55 (13 Dec), 11:59 (21 Dec), 12:03 (30 and 31 Dec). Identical to the check.
- One chart, three bands (sunset, solar noon, sunrise), each with its own 40-minute clock scale. On a single 07:30 to 16:30 axis the 4-minute dip in sunsets would be under 7 px; the bands make it visible. This is a broken axis and the band ticks say so (two clock ticks per band).
- The earliest visited sunset and the latest visited sunrise get a ring and their time ("earliest 15:51", "latest 08:06"), which keeps the reveal's quoted times on the stage.
- Presets 13 Dec / 21 Dec / 30 Dec / 15 Jan, then the date slider (1 Dec to 15 Jan). Start 1 December (not a preset). 15 Jan is a free preset (no milestone).

## Pre-flight

1. Title and hook: "The darkest evening of the year" / "London's shortest day is around 21 December. Is that also its earliest sunset?" Asks, does not answer.
2. Options: "About 21 December" / "About 13 December" / "About 30 December". All dates; every option date has a preset.
3. Locked stage: three empty bands with their names and clock ticks, date ticks (1 Dec, 15 Dec, 1 Jan, 15 Jan), caption. No dots, readouts "—".
4. Reveal values: 15:51 and 11:55 are DAYS[12] (13 Dec, milestone `d13`); 08:06 and 12:03 are DAYS[29] (30 Dec, milestone `d30`); "21st" is the question's own date (milestone `d21`). All are dots that stay once visited; 15:51 and 08:06 are also the ring labels.
5. QA path: 13 Dec (d13), 21 Dec (d21), 30 Dec (d30), 15 Jan, slider two presses (left from 15 Jan): all milestones in the first three presses.
6. Reset: no Reset (none in the brief); visited dots never disappear.
7. Phone fit: see the reveal-fit line below.
