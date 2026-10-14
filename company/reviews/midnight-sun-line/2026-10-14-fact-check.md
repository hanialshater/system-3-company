# Fact-check: midnight-sun-line, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c5 | verified | Tropic of Cancer = northern declination limit, 23.44 N; on the June solstice subsolar latitude = declination, so the noon Sun is overhead there. Solstice falls June 20-22 by year and zone; declination one day off differs by 0.0035 deg, so "June 21 longest day" holds to seconds. Suggest "around June 21". |
| c6 | verified | Read Demo.tsx: strip[h] = geoDistance(town, [(12-h)*15, 23.44]) < pi/2. Own solar-elevation formula (ms2.mjs) gives the same lit hours: 65 N 21 of 24 cells, 66.6 N 24, consistent with the Daylight readout. |

Disputes: none.

Result: 2 verified, 0 disputed, 0 withdrawn.

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node of dayHours(): 24 h first at 66.56 N (66.5 gives 23.42 h; first 0.1 slider step with 24 h is 66.6); 90-23.44 = 66.56 shown as 66.6. Since sets < 66.56 <= never, the reveal's line always lies between the two quoted latitudes. Obliquity 23.44 (IAU 2006: 23.4393 at J2000) correct to my knowledge. |
| c7 | verified | Own node: a 90-degree circle centred at 23.44 S reaches at most 66.56 N, on the antisolar meridian, leaving 23.44 degrees to the pole; any parallel above it is wholly lit. |

**Result:** 2 verified, 0 disputed, 0 withdrawn.

## Pass 29 (2026-10-14, re-check of the W-266 81-word reveal, W-269)

Checker: fact-checker. I wrote none of these claims (the text is cm-geography's, W-266, applied by the demo-builder in v4). Method: I read Demo.tsx v4 on every path: predict (locked; the gap and pole marks are hidden), exploring with the chips (65/70/80) and the latitude and time sliders, and the reveal with both milestones reached and with the fallbacks ("the south end" / "the north end"; unreachable, since minInteractions is 2 and both milestones are required). I re-ran the numbers in node (session scratchpad `fact-checker-w269-w273/check.mjs`: a copy of dayHours() and the gap geometry with d3-geo). The opened source was astronomy-engine 2.1.19, downloaded as an npm tarball into the scratchpad, read and run locally, and not added to the project. Its `mean_obliq()` uses 84381.406″ (IAU 2006), which is 23.4393° at J2000, and its `Seasons()` gives the solstice dates. Web fetch failed (DNS) in this session, so no atlas or almanac page could be opened. No build was run.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | unverified (left open) | The stage check passes. "That line is the Arctic Circle" follows P1's "The line between is about 66.6°N" (LINE = 90 − 23.44 = 66.56, shown as 66.6). The antecedent is a little distant: P2's previous sentences are about the gap and the town's circle. This is not blocking. The claim is a naming convention, and its reference could not be opened in this session. The earlier verification was from memory. It needs a re-check with an opened reference. |
| c5 | **disputed** | **(1) Prediction question vs claim:** the question says "June 21 is the longest day in the north." flatly, while c5 says "Around June 21". These contradict. astronomy-engine Seasons() gives the June solstice as 2024-06-20 20:51 UTC, 2025-06-21 02:42, 2026-06-21 08:25, 2027-06-21 14:10 and 2028-06-20 20:02, so in UTC the flat date is false in some years, and in the Americas it is false in more. Fix: "Around June 21 the north has its longest day." **(2) Reveal vs claim:** "the Tropic of Cancer (23.4°N), where the noon Sun is overhead" drops "on the June solstice". Read alone, it says the noon Sun is always overhead there, which is a common misconception. astronomy-engine gives the noon zenith distance at 23.44 N as 0.00° on 2026-06-21, 1.35° on 06-01 and 23.2° at the September equinox. Fix: "…, where the noon Sun is overhead that day." That adds 2 words, about 83 in total, under the 90 budget. The numbers hold (solstice declination 23.436–23.439, shown as 23.4). The "Tropic of Cancer" name is a convention whose reference could not be opened, so it needs an opened reference at the re-check. |
| c7 | verified | Reveal P2 matches the claim, and the orange gap ("23.4° gap = tilt", pole dot) is drawn after the lock, so it is on the stage when the reveal points at it. Node: the night circle centred at 23.44 S reaches 66.56 N on the antisolar meridian (90.000°), leaving 23.44° to the pole. Parallels at 66.57, 66.6, 70 and 80 N are lit at every longitude; 66.5 N is not. The 23.4 comes from astronomy-engine (obliquity 23.4393°, solstice declination about 23.44°). Nit, not blocking: the claim says "In June", but the lean is 23.4° only near the solstice (22.09° on June 1). "On the June solstice" would be exact. |
| c4 | withdrawal confirmed | No learner-visible sentence on any path says that air bends sunlight or that the midnight Sun is seen south of the line. "Toy: no air" is a model label. |

**Result:** 1 verified, 1 disputed, 1 left unverified (source not openable), 1 withdrawal confirmed. midnight-sun-line cannot publish until the c5 fixes land and c3 and c5 are checked against an opened reference. Also found, not a claim of mine to check: the hook "In June the far north gets a Sun that never sets." is a factual sentence with no claim address, so the demo-builder should record it as unverified. The c1 obliquity can now cite astronomy-engine instead of memory.

## Pass 31 (2026-10-14, W-275: v5 re-check of c3, c5, c7, c8)

Checker: fact-checker. I did not write c3 (demo-builder), c8 (the hook, demo-builder) or the c5 claim text (cm-geography, W-274 ruling 3). Two parts of the wording came from this role's pass 29: the c5 predict sentence and the c7 words "On the June solstice". See the independence note below. Method: I read Demo.tsx v5 on every path. In predict (locked) the gap, the pole and the "23.4° gap = tilt" label are hidden by `!locked` and the readouts show "?". In explore I used the chips 65, 70 and 80 and the latitude slider (0.1 steps, 50–85) and the time slider. The reveal has both milestones; its fallbacks "the south end" and "the north end" cannot be reached. The walkthrough transcript on disk dates from 09:17 and shows v3 text, so it is stale. I did not re-record it because the caller ordered no build. My findings rest on the v5 source. Numbers: `fact-checker-w275/scripts/check.mjs` in the session scratchpad (a copy of dayHours() plus the project's d3-geo plus astronomy-engine).

**Opened references** (downloaded into the scratchpad, read locally, not added to the project):
- **WordNet 3.1 (Princeton)**, npm `wordnet-db@3.1.14`, tarball sha256 `9b93831ae01771d02f360c1ebf3fe415ed2426a31f2201cb0943025c7403e79a`, file `package/dict/data.noun`:
  - 08513808 Arctic_Circle: "a line of latitude near but to the south of the north pole; it marks the northernmost point at which the sun is visible on the northern winter solstice and the southernmost point at which the midnight sun can be seen on the northern summer solstice"
  - 11502979 midnight_sun: "the sun visible at midnight (inside the Arctic or Antarctic Circles)"
  - 08692883 tropic: "either of two parallels of latitude about 23.5 degrees to the north and south of the equator representing the points farthest north and south at which the sun can shine directly overhead …"
  - 08693276 Tropic_of_Cancer: "a line of latitude about 23 degrees to the north of the equator"
  - 15246808 summer_solstice: "June 21, when the sun is at its northernmost point"
- **astronomy-engine 2.1.19**, npm tarball sha256 `605e9e9ebd0a364f1c5b556f10c1f163e4b8aa63b97ada1ab72e960d73189cdd`. It was run, and a grep of its docs and JSDoc found no mention of the Arctic Circle or the Tropics. It is used here for numbers only.
- Tried and failed: GitHub Natural Earth `ne_110m_geographic_lines` (gh: repository access not enabled, 403). npm search for "arctic circle", "tropic of cancer" and "geographic_lines" found no package with the lines. PyPI `naturalearth` does not exist.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | **verified** | WordNet defines the Arctic Circle as the southernmost latitude at which the midnight Sun can be seen on the June solstice. The stage computes that line: dayHours() first gives 24 h at 66.56 N (66.5 N gives 23.42 h; the first slider step at 24 h is 66.6), and LINE = 90 − 23.44 is shown as "66.6°N". So the reveal's "That line is the Arctic Circle", which follows "The line between is about 66.6°N", names the line WordNet defines. Limits: WordNet gives no number. The 66.56 rests on c1 and on astronomy-engine's obliquity (23.4393° at J2000). WordNet's "can be seen" would, with air, sit slightly south (c4, withdrawn). The stage labels itself "Toy: no air", and the convention line is the geometric one. That last point is from my knowledge only, not from an opened source. |
| c5 | all checks pass; **left unverified (independence only)** | Stage: predict "Around June 21 the north has its longest day." and reveal "…not the Tropic of Cancer (23.4°N), where the noon Sun is overhead on the June solstice." match the claim. WordNet: a tropic is the farthest-north parallel where the Sun can be directly overhead, the Tropic of Cancer is the northern one (about 23 N), and the summer solstice is "June 21, when the sun is at its northernmost point". So the noon Sun is overhead at the Tropic of Cancer on the June solstice. astronomy-engine: June solstices in 2024–2030 fall between 06-20 20:51 and 06-21 14:11 UTC, so "around June 21" holds. Solstice declination is 23.435–23.439, shown as 23.4. Noon zenith distance at 23.44 N on 2026-06-21 is 0.002°. WordNet's "about 23.5" is the older rounded value and does not contradict 23.4. |
| c7 | all checks pass; **left unverified (independence only)** | Reveal P2 is unchanged since v4 and matches the claim. The orange gap and the pole are drawn only after the lock. d3-geo: the night circle centred at 23.44 S reaches 66.560 N (90.0000° from the antisolar point), which leaves 23.44° to the pole. The parallels at 66.57, 66.6, 70 and 80 N are lit at every longitude; 66.5 N is not. Obliquity and declination are as given for c5. |
| c8 | **verified** | Hook: "In June the far north gets a Sun that never sets." astronomy-engine for 2026: the geometric midnight-Sun limit (90 − dec) is 67.97 N on June 1, 66.56 N on June 21 and 66.82 N on June 30, so north of about 68 N the Sun does not set on any June day. SearchRiseSet at 70 N 15 E finds no sunset for 30 days from 06-01. WordNet's midnight_sun agrees. "Far north" is vague but true for every June day north of 68 N. |

**Independence note (c5, c7).** In W-274 cm-geography adopted the pass-29 checker wording verbatim: ruling 1 took the predict sentence and ruling 4 took the c7 "On the June solstice". The W-258 ruling treats checker-drafted wording as a reason the fact-checker does not attest it. So I hold both and do not dispute either. W-280 (evaluation-steward) asks for a ruling: (a) an owner-adopted checker fix does not make the checker the writer, or (b) someone else redrafts the few words. Every other check passes.

**Other numbers re-run:** the reveal is 85 words with any reached pair of latitudes, and 89 with the unreachable fallbacks. Both are under 90.

**Result:** 2 verified (c3, c8), 0 disputed, 2 held on independence only (c5, c7). midnight-sun-line cannot publish until W-280 is ruled. After that come QA and walkthrough (W-270), because the transcript on disk is from v3.
