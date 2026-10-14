# Earth, Sky & Climate briefs (cm-geography-earth-climate)

Ranked briefs for this strand, in the same format as `geography.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next geography` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Wave J (cm-geography, 2026-10-14)

Written for Wave J (879 to 2,000 lessons). Global rank across the three strand files is given as "wave rank N/15"; inside this file the briefs are in wave-rank order. Ranking rule: uncovered concepts first (`river-watersheds`, `ocean-gyres`), then a second lesson for demand-3 concepts with only one (`seasons-axial-tilt`), then new concepts by demand. `climate-zones` stays uncovered on purpose: its own misconception ("climate follows latitude only") can only be broken with gridded temperature data, which the kit does not ship (round-2 data request still open); brief 4 below teaches its prerequisite, `sunlight-by-latitude`, and says so.

Every number below is printed by `node company/domains/briefs/checks/geography-wave-j.mjs <section>` (no network; derivation or seeded simulation). Builders re-run the section; fact-checkers check the derivation and the cited formula, not the prose. Common rules for all Wave J briefs:
- Reveal at most 90 words (drafts below are about 70) and it must fit on a 390 x 844 phone with the top of the stage visible; if it does not fit, cut the last told sentence first (this role's call, per demo-standard).
- Every stage label, axis tick and legend at least 10 px. Tap targets 44 px (`.tap`).
- Controls are listed in DOM order. Pressing each once (sliders: two arrow presses) reaches every milestone, including the question's own case. The initial state is never equal to a preset, so every preset changes the stage when pressed (QA rule 3).
- Quoted values are recorded when their milestone fires and stay visible as a trace or readout after Reset.
- "[toy]" means a labelled, made-up world; the stage says so in words.

### 1. which-sea-gets-the-rain · concept: river-watersheds · core · demand 2 [toy]
- Format: Single card (preset buttons + one picture).
- Wave rank 1/15 (uncovered concept).
- Learner knows: rivers run downhill to the sea / does not know: that a drainage divide, not distance, decides which sea gets the rain, and that a divide near one coast sends most of the land to the far one.
- Misconception: Rain that falls on land flows to the nearest sea.
- Prediction: "Rain falls at the dot on this made-up island: 55 km from the west sea and 150 km from the east sea. Where does the water reach the sea?" options: A) The west sea / B) The east sea / C) Neither: it soaks in on the way (answer: B). Check: section `watershed`: 40 x 24 squares of 5 km, ridge at x = 7 +/- 1.5 (seeded noise, mulberry32 seed 7), D8 steepest descent after priority-flood pit filling; the drop at (10, 12) ends in the east sea after 30 steps; a drop at (5, 12), west of the ridge, ends west. 764 of 960 squares (79.6%) drain east; 284 squares that are nearer the west coast still drain east.
- Locked stage: island outline, the dot and the two sea labels only. No relief shading, no ridge line, no path (relief would point at the answer).
- Interaction (DOM order): "Drop rain at the dot" (draws the path, milestone `dot`) / "Drop rain west of the ridge" (milestone `west`) / "Colour the land by its sea" (every square takes its sea's colour, the divide drawn as a line, milestone `divide`) / Reset. Relief shading appears on unlock. Two neutral hues for the two seas, differing in lightness; legend in words.
- Key state: both paths drawn and the land coloured, the divide visibly hugging the west coast.
- Reveal draft (about 70 words): "The drop ran east, 150 km, though the west sea was only 55 km away. Water follows the slope, and the slope is set by the ridge, not by the nearest coast. The ridge is a divide: every drop on one side ends in one sea, every drop on the other side in the other. Here the divide sits near the west coast, so about four fifths of the island drains east."
- Recall: "A ridge runs 20 km from a country's west coast. Most of its rain probably reaches which coast, and why?" (east: the divide, not the distance, decides).
- Claims: (1) path and outlet of the dot (simulation, section `watershed`; rule D8 after O'Callaghan and Mark 1984, pit filling after Barnes, Lehman and Mulla 2014 priority-flood; seed 7 disclosed, chosen before running). (2) 79.6% of squares drain east (simulation). (3) A drainage divide separates land draining to different outlets (definition; true by construction in the model: each square has one outlet). (4) Stage line "Made-up island, 1 square = 5 km" (judgement/scope). No real river is named on the card (no river data in the kit; real basins wait for the Natural Earth rivers request).
- Curriculum metadata for meta.json: primary `geography:river-watersheds`; also []; prerequisites []; level core; strand earth-climate; references none.
- Nearest lessons: none on rivers. `coastline-ruler` uses coasts, not drainage. Distinct.

### 2. which-way-the-water-goes · concept: ocean-gyres · core · demand 1 [toy]
- Format: Single card (preset buttons, one top-down view at a time).
- Wave rank 3/15 (uncovered concept).
- Learner knows: Earth's spin deflects moving things (`drift-of-a-straight-throw`) / does not know: that wind-driven water ends up moving at right angles to the wind, and that this is what piles water into the middle of an ocean and makes it circle.
- Misconception: The wind pushes the sea the way the wind blows.
- Prediction: "North of the equator, a steady wind blows toward the north over open sea. Averaged over the wind-driven top layer, which way does the water move?" options: A) East / B) North / C) West (answer: A). Check: section `ekman`: Ekman transport M = (tau_y / (rho f), -tau_x / (rho f)) with f = 2 Omega sin(latitude); wind toward N at 30 N gives transport toward E, 1.34 m^2/s per metre for tau = 0.1 N/m^2; south of the equator f < 0 and it goes W.
- Locked stage: a square of sea seen from above, wind arrow drawn, no water arrows.
- Interaction (DOM order): "Start the wind" (water arrows appear for the question's wind: a fan of layer arrows shrinking and turning with depth, the top one 45 degrees right of the wind, and one thick "net flow" arrow 90 degrees right; milestone `q`) / "Wind toward the west (trade winds)" (milestone `trades`) / "Wind toward the east (westerlies)" (milestone `westerlies`) / "South of the equator" toggle (arrows turn left; milestone `south`) / "Ocean view" (replaces the square with one idealised basin: trades at 15 N, westerlies at 45 N, net-flow arrows meeting near 30 N and a circling arrow; milestone `gyre`). Stage line: "Idealised deep ocean, steady wind, no coasts." (8 words.)
- Key state: the ocean view, with both net-flow arrows pointing at the 30 N middle.
- Reveal draft (about 75 words): "The water went east, at right angles to the wind. Earth's spin turns moving water to the right north of the equator and to the left south of it. The top layer drifts 45 degrees off the wind, each layer below turns further, and the layer as a whole moves 90 degrees to the right. Trade winds push water north, westerlies push it south, so water piles up between them, and the ocean circles that mound: a gyre."
- Recall: "South of the equator a wind blows toward the east. Which way does the wind-driven layer move?" (north, 90 degrees left).
- Claims: (1) Ekman transport is 90 degrees to the right of the wind stress in the Northern Hemisphere, left in the Southern (derivation from the steady Ekman balance; Ekman 1905; any oceanography text, for example Talley et al. 2011, Descriptive Physical Oceanography, ch. 7). (2) Surface current 45 degrees from the wind (Ekman's solution for a deep ocean with constant eddy viscosity: an idealisation, the card says "idealised"). (3) Trade winds blow toward the west in the tropics and westerlies toward the east in mid-latitudes (source needed: a textbook figure, for example Talley et al. 2011 or Hartmann 2016; mark `unverified` until read). (4) Converging Ekman transport between them drives the clockwise subtropical gyres of the northern oceans (same textbook; `unverified` until read). (5) Magnitudes stay in the claim, not on the card.
- Curriculum metadata: primary `geography:ocean-gyres`; also [`geography:coriolis-effect`]; prerequisites [`geography:coriolis-effect`]; level core; strand earth-climate.
- Nearest lesson: `drift-of-a-straight-throw` (deflection of one thrown object). This one: the net flow of a whole wind-driven layer is at right angles, and that builds a gyre.

### 3. june-sunshine-pole-or-equator · concept: seasons-axial-tilt · core · demand 3
- Format: Single card (preset buttons drive one 24-hour chart).
- Wave rank 4/15 (demand-3 concept with one lesson, `closer-in-winter`).
- Learner knows: seasons come from tilt, not distance / does not know: that tilt works through both Sun height and day length, and that on 21 June the never-setting Sun gives the North Pole more sunlight per day than anywhere else.
- Misconception: The equator always gets the most sunlight, because the Sun is highest there.
- Prediction: "On 21 June, counting all 24 hours, which place gets the most sunlight per square metre at the top of the atmosphere?" options: A) The equator / B) The North Pole / C) 45 degrees north (answer: B). Check: section `june`: daily-mean top-of-atmosphere insolation, S0 = 1,361 W/m^2, declination 23.44, Earth-Sun distance 1.0163 AU: equator 384.8 W/m^2 (9.2 kWh/m^2 per day), 45 N 483.4 (11.6), North Pole 524.2 (12.6); the maximum is at the pole.
- Locked stage: empty axes (hour of day 0 to 24, sunlight W/m^2), no curve.
- Interaction (DOM order): presets "Equator" / "45 degrees N" / "North Pole" (each draws that place's 24-hour sunlight curve with its area filled and a total in kWh/m^2; earlier curves stay as faint labelled traces; milestones `eq`, `mid`, `pole`) / a latitude slider (0 to 90 N) for free exploration. Initial: no place selected. Each curve's label shows day length and noon Sun height (pole 24 h, 23 degrees; equator 12 h, 67 degrees).
- Key state: all three curves on the axes, the pole's long low band visibly enclosing the most area.
- Reveal draft (about 70 words): "The pole won: 12.6 kWh per square metre against the equator's 9.2. At the pole the Sun stays 23 degrees up for all 24 hours; at the equator it climbs to 67 degrees but sets after 12. In June, tilt gives the north both a higher Sun and longer days, and near the pole never setting beats being high. This is sunlight arriving above the air, not warmth at the ground."
- Recall: "Why can a place where the Sun never gets high receive more sunlight in a day than the equator?" (it never sets: hours times height).
- Claims: (1) daily-mean insolation formula Q = (S0/pi)(a/r)^2 (h0 sin(lat) sin(dec) + cos(lat) cos(dec) sin(h0)) (derivation; Berger 1978, or any climate text such as Hartmann 2016 ch. 2). (2) S0 = 1,361 W/m^2 (Kopp and Lean 2011). (3) Declination 23.44 and distance 1.0163 AU on 21 June (Meeus 1998 equations, as in section `sunset`). (4) The three values and kWh conversions (arithmetic). (5) "Top of the atmosphere, not ground temperature" (scope statement).
- Curriculum metadata: primary `geography:seasons-axial-tilt`; also [`geography:polar-day-length`, `geography:sunlight-by-latitude`]; prerequisites [`geography:seasons-axial-tilt`]; level core; strand earth-climate.
- Nearest lessons: `closer-in-winter` (distance is not the cause), `polar-day-length` and `midnight-sun-line` (how long the Sun is up). This one is about the energy total, where duration beats height.

### 4. why-the-poles-get-less-sun · concept: sunlight-by-latitude · intro · demand 2
- Format: Single card (preset buttons, one side-view picture).
- Wave rank 9/15 (new concept; prerequisite for the still-uncovered `climate-zones`).
- Learner knows: the poles are cold / does not know: that it is the angle of the sunlight, not extra distance from the Sun, that cuts their yearly sunlight to about two fifths of the equator's.
- Misconception: The poles are cold because they are farther from the Sun.
- Prediction: "Over a whole year, how much sunlight reaches a square metre at the North Pole (top of the atmosphere), compared with a square metre at the equator?" options: A) About 99% / B) About 10% / C) About 40% (answer: C). Check: section `insol-annual`: annual means 415.5 W/m^2 at the equator, 277.0 at 51.5 N (67%), 236.3 at 60 N (57%), 172.3 at the pole (41.5%). The pole is at most one Earth radius, 6,371 km, farther from the Sun: 0.0043% of 1 AU, 0.0085% less light.
- Locked stage: side view of the Earth with a band of parallel sunbeams of fixed width, a marker at 30 N, no readouts.
- Interaction (DOM order): presets "Equator" / "51.5 degrees N" / "60 degrees N" / "North Pole" (milestones `eq`, `pole` required; the beam band lands on a ground patch whose length grows as 1/cos(latitude) at equinox noon, and at the pole the band grazes the horizon). Readouts: "Extra distance from the Sun" (km and %) and "Year's sunlight vs equator" (%). Initial: 30 N (not a preset).
- Key state: the pole selected, the distance readout at 0.004% beside the yearly-sunlight readout at 41%.
- Reveal draft (about 65 words): "The pole gets about 41% of the equator's yearly sunlight. Distance is not why: the pole is at most 6,371 km farther from the Sun, 0.004% of the way, worth less than 0.01% of the light. The cause is the angle. Near the poles the same beam lands on more ground, so each square metre gets less."
- Recall: "Name the reason a square metre near the pole gets less sunlight in a year than one at the equator." (the same beam is spread over more ground).
- Claims: (1) annual-mean insolation by latitude (derivation, same formula as brief 3, averaged over a circular orbit; Hartmann 2016 ch. 2 shows about 417 and 173 W/m^2). (2) 1 AU = 149,597,870.7 km (IAU 2012 resolution B2); Earth radius 6,371.0088 km (IUGG mean radius). (3) Flux falls as 1/r^2 (derivation). (4) Beam spread 1/cos(latitude) at equinox noon (geometry).
- Curriculum metadata: primary `geography:sunlight-by-latitude`; also [`geography:climate-zones`]; prerequisites [`geography:latitude-longitude`]; level intro; strand earth-climate.
- Nearest lessons: `closer-in-winter` (orbit distance and seasons), brief 3 (one day in June). This one: a year, and the pole's tiny extra distance against the angle. It does not claim to explain climate zones (that needs temperature data).

### 5. darkest-evening-of-the-year · concept: equation-of-time · core · demand 2
- Format: Single card (date presets plus a date slider driving one chart).
- Wave rank 10/15 (new concept).
- Learner knows: the shortest day is about 21 December / does not know: that solar noon drifts later through December, so the earliest sunset comes before the shortest day and the latest sunrise after it.
- Misconception: The earliest sunset of the year is on the shortest day.
- Prediction: "In London the shortest day is about 21 December. When is London's earliest sunset?" options: A) About 21 December / B) About 13 December / C) About 30 December (answer: B). Check: section `sunset` (NOAA solar calculator equations after Meeus 1998, refraction 0.833 degrees, 51.5074 N 0.1278 W, GMT): earliest sunset 13 December, 15:51 (within 30 s of it from 9 to 16 December); shortest day 21 December, 7 h 50 min; latest sunrise 30 December, 08:06; solar noon 11:55 on 13 December, 11:59 on 21 December, 12:03 on 31 December.
- Locked stage: a chart, dates 1 December to 15 January across, clock time up, no curves.
- Interaction (DOM order): presets "13 Dec" / "21 Dec" / "30 Dec" / "15 Jan" (milestones `d13`, `d21`, `d30`), then a date slider (1 December to 15 January). Each visited date plots its sunrise, solar noon and sunset dots; visited dots stay. Readouts: sunrise, sunset, day length, solar noon. Initial: 1 December (not a preset). Every option date has a preset, so no option is singled out.
- Key state: 13, 21 and 30 December plotted, the sunset dots lowest at 13 December and the sunrise dots highest at 30 December, with the noon dots climbing.
- Reveal draft (about 75 words): "London's earliest sunset, 15:51, comes around 13 December, a week before the shortest day. The latest sunrise, 08:06, comes around 30 December. The day is shortest on the 21st, but the whole day is sliding later: solar noon moves from 11:55 to 12:03 across those weeks, because Earth moves fastest in early January and its tilt adds to the drift. A shrinking day on a sliding noon puts the darkest evening early."
- Recall: "Why does the earliest sunset come before the shortest day?" (solar noon drifts later through December).
- Claims: (1) sunrise and sunset times (derivation, NOAA solar calculator equations; Meeus 1998, Astronomical Algorithms ch. 25 and 28), 2026 values; they move by under a minute between years (state "about"). (2) London coordinates 51.51 N, 0.13 W (gazetteer; the result holds across central London). (3) Equation of time from orbital eccentricity and obliquity (Meeus ch. 28). (4) Perihelion in early January (Meeus; the date is 2 to 5 January). (5) Clock is GMT, no daylight saving in December.
- Curriculum metadata: primary `geography:equation-of-time`; also [`geography:sun-time-from-longitude`]; prerequisites [`geography:sun-time-from-longitude`]; level core; strand earth-climate.
- Nearest lesson: `barcelona-sun-minutes` (solar noon shifts with longitude). This one: solar noon shifts with the date.

### 6. air-over-the-ridge · concept: foehn-rain-shadow · core · demand 2 [toy]
- Format: Single card (preset stops move one air parcel along one mountain profile).
- Wave rank 13/15 (new concept).
- Learner knows: air gets colder as it rises / does not know: that air which rains out on the way up comes down the far side warmer and drier than it started.
- Misconception: Air that crosses a mountain comes down the other side at the temperature it started with.
- Prediction: "Air at 20 C at sea level is pushed over a 3,000 m mountain. Cloud forms on the way up and it rains. Back at sea level on the far side, the air is about:" options: A) 29 C / B) 20 C / C) 12 C (answer: A). Check: section `foehn` (parcel model, dew point 12 C, 1000 hPa, all condensate falls out): cloud base about 1,000 m at 10.2 C; summit -0.5 C; far side at sea level 28.8 C; relative humidity 59% at the start, 21% on the far side; with no rain (cloud re-evaporates) it returns to 20.0 C.
- Locked stage: mountain profile, parcel at the windward foot labelled 20 C, no other temperatures.
- Interaction (DOM order): presets "To cloud base" / "To the summit" / "To the far side" (each moves the parcel along the profile and writes its temperature at that stop; stops already visited keep their labels; milestones `base`, `top`, `lee`) / "No rain this time" toggle (replays the climb with the cloud kept, ending at 20 C; milestone `norain`) / Reset. Initial: parcel at the windward foot (not a preset). Stage line: "Idealised air parcel; all rain falls out." (7 words.)
- Key state: the far-side label at about 29 C next to the 20 C start, then the no-rain run back at 20 C.
- Reveal draft (about 70 words): "It came down at about 29 C, 9 degrees warmer than it started, and much drier. Rising air cools 9.8 C per km while dry, but more slowly once cloud forms, because condensing water releases heat. The rain took that water away, so on the way down nothing could evaporate and the air warmed at the full dry rate. Keep the cloud instead and it comes back at 20 C."
- Recall: "Why is the side of a mountain away from a rainy wind often warm and dry?" (the air lost its water as rain and warms at the dry rate coming down).
- Claims: (1) dry adiabatic lapse rate g/cp = 9.76 C per km (derivation; any meteorology text, for example Wallace and Hobbs 2006 ch. 3). (2) Saturated (pseudo-adiabatic) lapse rate formula (AMS Glossary of Meteorology, "pseudoadiabatic lapse rate"; derivation in the script). (3) Saturation vapour pressure (Bolton 1980). (4) The starting state (20 C, dew point 12 C) is chosen and disclosed. (5) Idealisation: no mixing, no radiation, all condensate removed (scope). Optional one-sentence context, only with a source the fact-checker reads: such winds have local names (foehn, chinook); otherwise leave out.
- Curriculum metadata: primary `geography:foehn-rain-shadow`; also []; prerequisites []; level core; strand earth-climate.
- Nearest lessons: none in Geography; check Physics for adiabatic-cooling lessons with `node tools/overlap.mjs` before build (none found by grep on 2026-10-14).
