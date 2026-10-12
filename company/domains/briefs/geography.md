# Geography & Maps: ranked lesson briefs

owner: cm-geography · written 2026-10-12 · curriculum: `content/curriculum/geography.json` · charter: `company/domains/geography.md`

Ranked highest priority first. Ranking rule: demand-3 concepts first (none has a second lesson yet), then demand 2, then demand 1; within a tier, lessons whose surprise is visible on a real map come first. `mercator-greenland` already covers `map-projections-area`, so no brief here repeats it. Every brief marked "WorldMap" draws Natural Earth 1:110m through `@/kit/geo`. Distances are great-circle on a sphere of radius 6,371.0088 km (`EARTH_RADIUS_KM`) unless a brief says otherwise. Data checks in the briefs were computed against the kit's own 1:110m files on 2026-10-12.

Kit notes for builders: country names must match Natural Earth 1:110m exactly (for example "United States of America", "Dem. Rep. Congo"). Small islands (Hawaii, Kiribati, Diomede) do not exist at this resolution; draw them as markers, not as shapes, and make no claims about them from the shapes.

Prediction answers are lettered A / B / C in the order shown. Answer letters are deliberately mixed.

### 1. shortest-way-to-tokyo · concept: great-circle-routes · intro · demand 3
- Learner knows: that a flight from New York to Tokyo crosses the Pacific on a flat world map / does not know: that the shortest path on a sphere is an arc that looks bent on most flat maps, and why.
- Misconception: The shortest route is the straight line you draw on the map.
- Prediction: "A flight from New York (JFK) to Tokyo (Haneda) takes the shortest path. Which place does it pass closest to?" options: A) Hawaii / B) Northern Alaska / C) Mexico (answer: B). Check: great-circle JFK (40.640 N, 73.779 W) to HND (35.549 N, 139.780 E) is 10,875 km and peaks at 69.8 N near 145 W, which is over Alaska's North Slope; a straight line on Mercator stays near 38 N and (as a constant-bearing rhumb line) is 12,818 km, 18% longer.
- Interaction: A draggable midpoint on a Mercator WorldMap: the learner drags the route's midpoint north or south and a readout shows total length in km; the route is drawn as a great-circle arc with `geoInterpolate`, and a toggle to "straight on the map" shows the rhumb line. One map, one readout.
- Payoff: On a sphere the shortest path bows toward the pole, so the straight line on the map is not the shortest line on the Earth.
- Claims to check: (1) JFK to HND great-circle distance is about 10,875 km (a fact-checker recomputes with the haversine formula on R = 6,371 km; airport coordinates from the airport authority or OurAirports). (2) The great circle's northernmost point is about 70 N (compute with `geoInterpolate` or the closed-form vertex latitude). (3) The constant-bearing route is about 12,800 km (Snyder 1987 ch. 7, rhumb-line formula). (4) Real flights deviate for winds and airspace (cite an airline route map or state "ignoring winds"; do not claim any airline flies this exact path). 1:110m is irrelevant to the distances; only the coastline drawing depends on it.

### 2. closer-in-winter · concept: seasons-axial-tilt · intro · demand 3
- Learner knows: that it is hot in summer and cold in winter / does not know: where Earth is on its orbit in each season, or how the distance varies.
- Misconception: Summer happens because the Earth is closer to the Sun.
- Prediction: "On which month is the Earth closest to the Sun?" options: A) January / B) June / C) September (answer: A). Check: perihelion is around 3 January at about 147.1 million km, aphelion around 4 July at about 152.1 million km (US Naval Observatory / NASA Earth Fact Sheet: perihelion 0.9833 AU, aphelion 1.0167 AU, 1 AU = 149.598 million km), so the Earth is about 3% closer in northern winter.
- Interaction: A date handle the learner drags around a top-down orbit diagram with the axis tilt shown; readouts show Sun distance (millions of km) and the latitude where the noon Sun is overhead. Distance is the same curve for both hemispheres while the warm season flips. Not a WorldMap; one orbit diagram.
- Payoff: Distance barely changes (about 3%) and peaks in January, so tilt, which flips between hemispheres, is the cause of the seasons.
- Claims to check: (1) perihelion about 3 Jan, distance 147.1 million km (NASA Earth Fact Sheet, or USNO "Earth's Seasons" table). (2) aphelion about 4 Jul, distance 152.1 million km (same). (3) The 3% figure is (152.1 - 147.1) / 149.6 = 3.3% (arithmetic). (4) Axial tilt is about 23.4 degrees (NASA fact sheet). (5) Southern Hemisphere summer is in December to February (any almanac). The perihelion date drifts by a day or two each year; say "early January".

### 3. null-island-lat-lon · concept: latitude-longitude · intro · demand 3
- Learner knows: that places have coordinates and that the equator and prime meridian exist / does not know: what coordinates (0, 0) actually point at, or how to read a position off a map by feel.
- Misconception: Where the equator and prime meridian cross there must be something there, probably land.
- Prediction: "Latitude 0, longitude 0 is where the equator meets the prime meridian. What is there?" options: A) The Sahara in North Africa / B) A small island / C) Open ocean in the Gulf of Guinea (answer: C). Check: `geoContains` on the 1:110m land polygon is false at (0, 0); the nearest coast, near Tema in Ghana, is about 625 km north (haversine from (0, 0) to (5.62 N, 0.02 E)). Only a weather buoy marks the spot (PIRATA buoy "Soul", moored 1997).
- Interaction: WorldMap in Equirectangular with a draggable pin; readouts of latitude and longitude as the learner drags; a "target" chip asks them to place the pin on a named city (Quito, Nairobi) to feel what 0 degrees of latitude means. One map, one pin.
- Payoff: Coordinates are just a grid of angles; the point where the two zero lines cross is empty ocean, because the grid does not care what is there.
- Claims to check: (1) (0, 0) is in the Atlantic Ocean in the Gulf of Guinea (any atlas; the lesson also tests it with `geoContains`; resolution does not matter at this distance from the coast). (2) Distance to the nearest mainland coast is about 600 km (haversine; cite coordinates of Tema or Takoradi). (3) A buoy at 0 N 0 E exists in the PIRATA array (NOAA PMEL PIRATA site; mark as `source`). (4) Quito is at about 0.2 S and Nairobi at about 1.3 S (any gazetteer), so "near the equator" is accurate; do not claim they are on it.

### 4. coastline-ruler · concept: coastline-paradox · core · demand 3 [exploration]
- Learner knows: that coastlines are wiggly and that lengths are quoted in books / does not know: that a measured coastline length depends on the ruler.
- Misconception: Every coast has one true length that careful measuring would find.
- Prediction: "You walk a 200 km ruler around Great Britain's coast, then repeat with a 50 km ruler. What happens to the total length?" options: A) It stays the same / B) It gets shorter / C) It gets longer (answer: C). Check: a divider walk over the kit's 1:110m Great Britain outline gives about 2,385 km at 200 km, 2,642 km at 100 km, 3,002 km at 50 km and 3,159 km at 25 km (computed on an azimuthal equidistant projection centred on Britain; the lesson recomputes it live).
- Interaction: A ruler-length slider on a zoomed WorldMap of Great Britain; the divider steps are drawn along the coast and a readout shows steps and total km. Novel format: the learner "walks" the coast rather than reading it.
- Payoff: The shorter the ruler, the more wiggles it catches, so a coastline has no single length, only a length at a stated ruler size.
- Claims to check: (1) The 1:110m outline is generalised, so the lesson's lengths are a floor and flatten out below about 25 km because the data run out of detail (state this in the reveal; the numbers must come from the lesson's own data, not from a cited coast length). (2) Richardson (1961) and Mandelbrot (1967), "How long is the coast of Britain?", Science 156, document the ruler dependence (cite). (3) Official quoted coast lengths differ between sources for exactly this reason (cite two, for example CIA World Factbook and the Ordnance Survey, as examples only). Do not rank countries by coastline.

### 5. half-of-humanity · concept: population-distribution · intro · demand 3
- Learner knows: that China and India are very populous / does not know how few countries make up half the world.
- Misconception: People are spread roughly evenly across the countries, so "half the world" means dozens of countries.
- Prediction: "Rank countries by population. How many of the largest do you need to add up to half of humanity?" options: A) 7 / B) 3 / C) 15 (answer: A). Check: UN World Population Prospects 2024, mid-2024 (millions): India 1,451, China 1,419, USA 345, Indonesia 283, Pakistan 251, Nigeria 233, Brazil 212 sum to 4,194, which is 51.4% of 8,162; six countries reach only 48.8%.
- Interaction: A WorldMap in Equal Earth (so area is honest); the learner taps countries in any order to add them to a running share-of-humanity bar; target is 50%. Countries are filled with `highlight`. One map, one bar.
- Payoff: Seven countries hold half of humanity, so a map where area means land hides where people actually are.
- Claims to check: (1) The seven populations and the world total, from UN WPP 2024 medium variant, mid-2024 (embed the numbers in meta.json with the table cited; a fact-checker compares with the UN data portal; estimates revise every two years, so the lesson says "about" and "2024"). (2) The cumulative share arithmetic (6 countries 48.8%, 7 countries 51.4%). (3) Natural Earth 1:110m names for the seven: "India", "China", "United States of America", "Indonesia", "Pakistan", "Nigeria", "Brazil" (all present). The margin is only 1.4 points over half, so do not claim the order of Indonesia, Pakistan and Nigeria beyond "about".

### 6. continental-jigsaw · concept: plate-tectonics-fit · intro · demand 3
- Learner knows: that South America and Africa have matching-looking coasts / does not know that the match is real geometry and where exactly the bulge goes.
- Misconception: The coast match is a coincidence people over-read; continents have always been where they are.
- Prediction: "Slide South America toward Africa. Where does Brazil's eastern bulge tuck in?" options: A) Southern Africa / B) The Horn of Africa / C) The Gulf of Guinea in West Africa (answer: C). Check: rotating Brazil's easternmost tip (34.8 W, 7.1 S) by 57 degrees about the Bullard et al. (1965) pole near 44 N, 30.6 W lands it at 7.3 E, 5.0 N, which is the Niger delta and Cameroon coast in the Gulf of Guinea; the rotated continent overlaps Africa in only 3 of 1,551 sample points on the 1:110m shapes.
- Interaction: A "millions of years ago" slider on an orthographic or Equal Earth WorldMap centred on the Atlantic; South America (a union of its 1:110m countries) is rotated about the Euler pole with `geoRotation`-style rotation as the slider moves from 0 to the fit. One map.
- Payoff: Close the Atlantic by rotating one rigid piece and the coasts lock together, evidence that the continents once joined.
- Claims to check: (1) The pole and angle (about 44 N, 30.6 W, 57 degrees; Bullard, Everett and Smith 1965, Phil. Trans. R. Soc. A 258) is a published best fit of continental margins, not a plate-motion record; the lesson calls it a fit. (2) Opening of the South Atlantic began about 130 million years ago (cite a textbook, for example Frisch, Meschede and Blakey, Plate Tectonics; give the range 140 to 120). (3) The coastline used by Bullard was the 500-fathom isobath, not the present shoreline, so a fit at the 1:110m coast is approximate; the lesson must say "roughly". Do not claim exact gaps or overlaps in km.

### 7. china-one-clock · concept: time-zones · intro · demand 2
- Learner knows: that the world has time zones, about one per 15 degrees / does not know that zones are laws, not geometry.
- Misconception: A country as wide as China has several time zones, and clock time tracks the Sun.
- Prediction: "China spans about 61 degrees of longitude, roughly four hours of Sun. How many official time zones does it use?" options: A) 5 / B) 4 / C) 1 (answer: C). Check: China uses a single standard time, UTC+8 (Beijing time) nationwide since 1949 (IANA tz database lists `Asia/Shanghai` for the mainland, with `Asia/Urumqi` as a separate entry for local usage in Xinjiang; the lesson says "official standard time"). Extent from the 1:110m outline: 73.7 E to 135.0 E = 61.3 degrees = 4.1 hours.
- Interaction: A WorldMap in Equirectangular with China highlighted and a vertical "Sun" line the learner drags across longitude; a clock under it shows local solar time at a western city and an eastern city against the official UTC+8 clock. One map plus a short readout.
- Payoff: A time zone is a decision; in western China the Sun is at its highest around 15:00 on the official clock.
- Claims to check: (1) China's official standard time is UTC+8 (Chinese State Council notice 1949; or IANA tzdata `zone.tab`). (2) Kashgar (about 76.0 E) solar noon on the UTC+8 clock is 12:00 + (120 - 76.0) / 15 h = about 14:56 (minus up to 16 minutes for the equation of time, so say "about 3 p.m."). (3) China's longitude extent is about 73.7 E to 135.0 E (Natural Earth 1:110m bounds). The lesson makes no claim about borders, Xinjiang's local conventions or political status; keep to the official standard time and sun arithmetic.

### 8. shrinking-degree · concept: degree-length-by-latitude · intro · demand 2
- Learner knows: that latitude and longitude are measured in degrees / does not know that a degree of longitude covers less ground away from the equator.
- Misconception: A degree is a fixed distance everywhere.
- Prediction: "One degree of longitude is about 111 km at the equator. How far is one degree at 60 N (Oslo, Helsinki)?" options: A) 111 km / B) 56 km / C) 28 km (answer: B). Check: 111.195 km x cos 60 degrees = 55.6 km (pi x 6,371.0088 / 180 = 111.195 km per degree on the sphere).
- Interaction: A latitude handle on a WorldMap in orthographic projection with a 10 by 10 degree box that follows it; a readout shows the box's east-west width in km (computed with `geoDistance` along the parallel). One globe, one readout.
- Payoff: Meridians converge toward the pole, so a degree of longitude shrinks like the cosine of latitude, to about 19 km at 80 N.
- Claims to check: (1) 111.195 km per degree of arc on the mean sphere (arithmetic from R = 6,371.0088 km). (2) 55.6 km at 60 N; 19.3 km at 80 N (arithmetic). (3) On the real ellipsoid (WGS84) a degree of longitude at the equator is 111.32 km, so the lesson's "about 111 km" holds to 0.2%. (4) Oslo is at 59.9 N and Helsinki at 60.2 N (gazetteer).

### 9. ruler-on-mercator · concept: map-scale-varies · intro · demand 2
- Learner knows: that maps have scale bars / does not know that on a world map a bar is true in only one place.
- Misconception: A map's scale bar measures distance the same way everywhere.
- Prediction: "On a Mercator world map, a 1,000 km bar is drawn at the equator. Slide the same-length bar to 60 N. How far does it now measure on the ground?" options: A) 500 km / B) 1,000 km / C) 2,000 km (answer: A). Check: Mercator local scale k = sec(latitude) (Snyder 1987), so at 60 N k = 2 and a bar that spans 1,000 km at the equator spans 1,000 / 2 = 500 km.
- Interaction: A fixed-length ruler the learner drags up and down a Mercator WorldMap; the readout recomputes ground km between the ruler's ends by inverting the projection and taking `geoDistance`. One map, one readout.
- Payoff: Distance on the map and distance on the ground differ by a factor that changes with latitude, so a scale bar is only true along one line.
- Claims to check: (1) Mercator scale is sec(phi) (Snyder 1987, ch. 7). (2) At 60 N the factor is 2.0; at 70 N it is 2.92; at 80 N it is 5.76 (arithmetic). (3) The readout is east-west distance along the parallel; north-south measures the same factor because Mercator is conformal (Snyder). Note: the ruler should be horizontal so the claim is clean. Keep to the Mercator projection; do not say Mercator is "wrong" (see `mercator-greenland`).

### 10. tissot-circles · concept: equal-area-vs-conformal · core · demand 2
- Learner knows: that Mercator inflates high latitudes / does not know what the alternative costs, or that you cannot fix both shape and area.
- Misconception: An accurate map would simply show everything at the right size and shape.
- Prediction: "Place identical circles of 1,000 km radius at the equator and at 60 N on a Mercator map. How does the 60 N circle's area look compared with the equator circle?" options: A) The same / B) Twice as big / C) Four times as big (answer: C). Check: Mercator linear scale is sec 60 = 2, so area scales by sec^2 60 = 4; the circle stays a circle because Mercator is conformal.
- Interaction: The learner drags a `geoCircle` (1,000 km radius) around a WorldMap and flips the map between Mercator and Equal Earth; on Mercator circles stay round and swell, on Equal Earth they keep their area and squash into ovals. One map with a two-button projection toggle.
- Payoff: A flat map can keep circles round or keep areas equal, not both; every projection picks which lie to tell.
- Claims to check: (1) Mercator area factor is sec^2(phi); 4.0 at 60 N (Snyder 1987). (2) Equal Earth is equal-area (Savric, Patterson and Jenny 2018, IJGIS 33(3)); verify in the lesson by comparing `geoPath.area` of a circle at two latitudes (equal to within rounding). (3) Gauss's Theorema Egregium means no map can do both (Snyder ch. 1). (4) The ovals' shape change on Equal Earth is visible but not given a number in the lesson. Resolution does not matter; circles are synthetic.

### 11. hole-through-earth · concept: antipodes · intro · demand 2
- Learner knows: that "digging to China" is a joke / does not know where the opposite point of the Earth really is.
- Misconception: Digging straight down from anywhere in the Americas or Europe comes out in China or Asia.
- Prediction: "You dig straight through the Earth from Madrid, Spain. Where do you come out?" options: A) Australia / B) New Zealand / C) The Indian Ocean (answer: B). Check: antipode = (-lat, lon + 180): Madrid (40.42 N, 3.70 W) goes to (40.42 S, 176.30 E); `geoContains` against the 1:110m New Zealand polygon is true.
- Interaction: A draggable pin on an Equirectangular WorldMap; the pin's antipode is drawn on the same map and updates live. A readout says "land / ocean" at each end. One map, two pins.
- Payoff: Most land has ocean on the other side: only about 13% of land (about 4% of the planet's surface) is opposite more land.
- Claims to check: (1) Antipode formula (latitude negated, longitude shifted 180 degrees); Madrid (40.42 N, 3.70 W) coordinates from a gazetteer. (2) Madrid's antipode is in New Zealand's North Island (state "near the east coast of the North Island"; 1:110m is coarse here, and the point sits on the coast, so the lesson should avoid "inland" or a city name unless checked at 1:10m). (3) Share of land with land antipode: computed on a 1 degree grid from the kit's land polygon at 13% of land, and published figures are about 15% of land, or 4.4% of the Earth's surface (cite Wikipedia "Antipodes" or a paper; the lesson says "roughly one-seventh"). 1:110m matters: that figure shifts a few points with resolution, so say "about".

### 12. fifty-hour-monday · concept: date-line · intro · demand 2
- Learner knows: that the date changes at midnight and that there is an International Date Line / does not know that a calendar date lasts far longer than 24 hours somewhere on Earth.
- Misconception: Every calendar day exists everywhere for exactly 24 hours, as a single wall of midnight.
- Prediction: "Counting every time zone on Earth, for how many hours is it Monday somewhere?" options: A) 24 / B) 50 / C) 38 (answer: B). Check: the earliest zone is UTC+14, where Monday begins at 10:00 UTC on Sunday; the latest is UTC-12, where Monday ends at 12:00 UTC on Tuesday: 26 + 24 = 50 hours.
- Interaction: A UTC-time slider on an Equirectangular WorldMap; nominal 15-degree time bands are shaded by their calendar day (Sunday, Monday, Tuesday); the learner scrubs and watches Monday's band enter at the far east and leave at the far west. One map.
- Payoff: Zones span UTC-12 to UTC+14, which is 26 hours of spread, so a calendar date exists somewhere for 24 + 26 = 50 hours.
- Claims to check: (1) UTC offsets run from -12:00 (Baker and Howland Islands) to +14:00 (Line Islands, Kiribati) (IANA tz database; Wikipedia "List of UTC offsets"). (2) Kiribati moved the Line Islands to the west side of the date line on 1 January 1995 (cite news or Kiribati government). (3) The 50-hour figure follows by arithmetic. (4) Bands in the lesson are nominal 15-degree meridian bands, not legal zones; say so on the stage. 1:110m cannot show Kiribati or the Pacific islands; show them as dots with a source, and make no border claims.

### 13. honolulu-overhead · concept: tropics-polar-circles · intro · demand 2
- Learner knows: that the Sun is high in summer in the south of the US / does not know where the Sun can ever be exactly overhead.
- Misconception: The Sun is directly overhead in summer in places like Florida or Texas.
- Prediction: "Which of these cities has the Sun directly overhead at noon on at least one day of the year?" options: A) Miami (25.8 N) / B) Cairo (30.0 N) / C) Honolulu (21.3 N) (answer: C). Check: the Sun's declination ranges between 23.44 S and 23.44 N, so only latitudes within 23.44 of the equator ever have a zenith Sun; Honolulu's 21.3 N qualifies (around 27 May and 16 July by sin(declination) = sin(23.44) x sin(360 x (day - 81) / 365)), while Miami's 25.8 N and Cairo's 30.0 N never do.
- Interaction: A day-of-year slider on an orthographic WorldMap; the subsolar point (a bright dot) runs between the two tropics, and city markers light up on the day the Sun is overhead. One globe.
- Payoff: The Sun is only ever overhead between the Tropic of Capricorn and the Tropic of Cancer, at 23.4 degrees, the tilt angle.
- Claims to check: (1) Obliquity is about 23.44 degrees (IAU / Astronomical Almanac; it changes about 0.013 degrees a century). (2) City latitudes: Honolulu 21.31 N, Miami 25.76 N, Cairo 30.04 N (gazetteer; Honolulu is not in 1:110m, so show a marker). (3) Honolulu zenith dates around 26 to 27 May and 16 to 18 July (cite the NOAA Solar Calculator or Wikipedia "Honolulu"; the approximate formula above gives 27 May and 16 July). (4) Tropic of Cancer is at about 23.4 N today (Almanac). The lesson says "about" for dates.

### 14. midnight-sun-line · concept: midnight-sun · core · demand 2
- Learner knows: that days are long in northern summer / does not know the exact latitude where the Sun stops setting.
- Misconception: The Sun stays up all day only at the poles, or only well past the Arctic Circle.
- Prediction: "On the June solstice, from what latitude northward does the Sun not set at all?" options: A) 66.6 N / B) 23.4 N / C) 80 N (answer: A). Check: the Arctic Circle is at 90 - 23.44 = 66.56 N (geometric Sun centre, ignoring refraction).
- Interaction: A "hour of day" slider spins an orthographic WorldMap under a fixed solstice Sun; the night side is a `geoCircle` of radius 90 degrees centred on the antisolar point; a draggable latitude line shows when it stays in the light all day. One globe.
- Payoff: The Sun never sets exactly where the night-side circle can no longer reach, which is 90 degrees minus the tilt from the pole.
- Claims to check: (1) The Arctic Circle is at 90 - obliquity = 66.56 N (IAU; geometric, centre of the Sun's disc at the horizon). (2) With atmospheric refraction and the Sun's radius, the Sun is still visible a little south of that, reaching about 65.7 N (cite the USNO or Almanac sunrise definition of -0.833 degrees); the lesson says "geometric" and does not dispute the refracted figure. (3) The night-side circle is exact only for a spherical, airless model; state that. Tromso (69.65 N) has midnight sun from about 20 May to 22 July (Norwegian Meteorological Institute; if cited, check dates).

### 15. land-hemisphere · concept: land-water-hemispheres · intro · demand 2
- Learner knows: that Earth has more water than land / does not know how lopsided the land really is.
- Misconception: Somewhere there is a half of the Earth that is mostly land.
- Prediction: "Pick the hemisphere (any half of the globe) with the most land. What share of it is land?" options: A) About 90% / B) Just under half / C) About 29%, same as the whole planet (answer: B). Check: sampling the kit's 1:110m land polygon on a 2-degree grid, weighted by cos(latitude), the best hemisphere centre near 41 N, 3 E contains 47% land; the whole planet is 28.8% land (matches NOAA's 29%). The emptiest hemisphere, near 46 S, 180 E, is 11% land.
- Interaction: A draggable orthographic WorldMap whose rotation is the learner's drag; a live readout shows "land in this hemisphere: x%". One globe, one number.
- Payoff: Even the most land-heavy half of the planet is more than half water, so Earth really is a water planet.
- Claims to check: (1) Earth's surface is about 29% land (NOAA / USGS "Water Science School"; the lesson's own number is 28.8% on this data). (2) The land-hemisphere maximum is about 47% to 49%; published centres are near Nantes, France (cite Boggs 1945 / Wikipedia "Land and water hemispheres"); the lesson's own centre is within a few degrees. (3) 1:110m coastlines omit small islands, so land share is a slight underestimate; say "about". (4) Northern Hemisphere is 39% land and Southern 19% by the same method (state resolution).

### 16. eratosthenes-shadow · concept: earth-circumference-eratosthenes · core · demand 2
- Learner knows: that the Earth is round / does not know how anyone first measured its size, or that it needs only a shadow and a distance.
- Misconception: The size of the Earth could only be found after satellites or long voyages.
- Prediction: "At noon on the solstice a well in Syene has no shadow; in Alexandria a pole's shadow makes an angle of 7.2 degrees. The full circle is how many times the Syene to Alexandria distance?" options: A) 7 times / B) 50 times / C) 360 times (answer: B). Check: 360 / 7.2 = 50, so circumference = 50 x 5,000 stadia = 250,000 stadia (Cleomedes' account; Eratosthenes' conventional figure is 252,000).
- Interaction: A shadow-angle slider and a distance slider on an orthographic WorldMap showing Alexandria (31.20 N, 29.92 E) and Aswan (24.09 N, 32.90 E); a readout gives the implied Earth circumference in km. One globe.
- Payoff: The angle of the shadow is also the angle at the Earth's centre, so a small angle and a known distance give the whole circle.
- Claims to check: (1) The shadow angle was about 7.2 degrees, 1/50 of a circle, and the distance 5,000 stadia (Cleomedes, "On the Circular Motions of the Celestial Bodies", reported; Eratosthenes' own text is lost; mark as `source`). (2) Modern latitudes: Alexandria 31.20 N and Aswan 24.09 N differ by 7.11 degrees; their great-circle distance is 843 km (haversine); 843 x 360 / 7.11 = 42,700 km, within 7% of the true 40,008 km meridional circumference. (3) The length of the stadion is uncertain (about 157 to 185 m), so the lesson never says Eratosthenes' number was "accurate" in km. (4) Syene (Aswan) is at 24.09 N, about 0.65 degrees north of the Tropic, so the "no shadow" claim is a story from the account, not a modern measurement; say "in the account". Resolution does not matter.

### 17. fingernail-ocean · concept: plate-motion-rates · core · demand 2
- Learner knows: that continents drift / does not know how slow, or how much time that implies.
- Misconception: Continents move fast enough to notice, or not at all in human terms; both miss the scale.
- Prediction: "Plates move about as fast as a fingernail grows, 2.5 cm a year. At that speed, how long does it take to widen an ocean by 3,000 km?" options: A) 12 million years / B) 120 million years / C) 1.2 billion years (answer: B). Check: 3,000 km = 3,000,000 m; 3,000,000 / 0.025 = 120,000,000 years.
- Interaction: A years slider (0 to 150 million) on a WorldMap in Equal Earth centred on the Atlantic that translates South America away from Africa along a small circle by rate x time; a readout shows the opened gap in km. One map.
- Payoff: Tiny speeds multiplied by geological time make oceans, so 2.5 cm a year builds an Atlantic in about 120 million years.
- Claims to check: (1) The present Mid-Atlantic Ridge half-rates sum to about 2 to 4 cm a year (NASA Earth Observatory or USGS "This Dynamic Earth: Plate Motions"; the lesson says "about 2.5 cm", the Atlantic average). (2) Fingernail growth is about 3.5 mm a month, which is 4 cm a year (Cleveland Clinic or a dermatology reference; state "about as fast"); make no claim beyond comparing speeds. (3) The arithmetic. (4) Rates vary along the ridge and through time; the lesson says "average". The gap drawn is a toy translation, not a plate-motion model; say so. Pair with brief 6 only after it ships.

### 18. earth-flattening · concept: earth-shape-oblate · core · demand 2
- Learner knows: that the Earth is a sphere / does not know that it bulges at the equator, or how little.
- Misconception: Either "the Earth is a perfect sphere" or "the Earth is visibly squashed like in diagrams".
- Prediction: "Shrink the Earth to a 30 cm desk globe. How much shorter is its pole-to-pole diameter than its equator-to-equator diameter?" options: A) About 1 mm / B) About 1 cm / C) About 3 cm (answer: A). Check: WGS84 equatorial diameter 12,756.274 km, polar 12,713.505 km, difference 42.77 km, ratio 1/298.257 = 0.335%; 0.335% x 300 mm = 1.0 mm.
- Interaction: A flattening-exaggeration slider (1x to 100x) that squashes a circle outline of the Earth against a faint perfect circle; a second control switches to a "Chimborazo vs Everest" profile near the equator. Not a WorldMap; one outline.
- Payoff: The Earth is flattened by only 0.3%, yet that is enough to make Ecuador's Chimborazo, not Everest, the summit farthest from the centre.
- Claims to check: (1) WGS84 semi-major axis 6,378.137 km and flattening 1/298.257223563 (NGA WGS84 definition). (2) Polar semi-axis 6,356.752 km, difference of diameters 42.77 km (arithmetic from (1)). (3) Chimborazo's summit is about 6,384.4 km from the Earth's centre and Everest's about 6,382.3 km, a gap of about 2 km (cite a geodesy source such as Berry 2001 or the US Geological Survey; mark `unverified` until checked; if no source is found, drop the claim). (4) Everest is the highest above sea level at 8,849 m (2020 Nepal-China survey).

### 19. horizon-ruler · concept: horizon-distance · core · demand 1 [exploration]
- Learner knows: that ships vanish hull first / does not know how far the horizon is for them, or how to compute it.
- Misconception: The horizon is the limit of eyesight, not of the Earth's curve.
- Prediction: "Standing on a beach with your eyes 1.7 m above the sea, how far away is the horizon?" options: A) 1.5 km / B) 4.7 km / C) 15 km (answer: B). Check: d = sqrt(2 R h) = sqrt(2 x 6,371 km x 0.0017 km) = 4.65 km (geometric, no refraction).
- Interaction: A drag handle for the observer's height (0 to 830 m, with named stops: person, lighthouse, tall tower) on a cross-section of the Earth showing the tangent line; a readout gives horizon distance. Not a WorldMap; one diagram. Novel format: the learner reads the Earth's curve off a tangent, rather than watching a ship.
- Payoff: The horizon grows with the square root of height, so you must rise 100 times higher to see 10 times farther.
- Claims to check: (1) d = sqrt(2 R h) (Pythagoras on the tangent; derivation). (2) 4.65 km at 1.7 m; 102.7 km from the top of an 828 m tower such as the Burj Khalifa (arithmetic; height from the Council on Tall Buildings and Urban Habitat); about 219 km from 3,776 m (Mount Fuji's height from the Geospatial Information Authority of Japan). (3) Atmospheric refraction lengthens the real distance by about 8% (cite; say "ignoring refraction"). (4) Do not claim that any place can be seen from any other at these distances without checking terrain.

### 20. two-bulges · concept: tides-moon · core · demand 2 [exploration]
- Learner knows: that tides rise and fall with the Moon / does not know why most coasts have two high tides a day.
- Misconception: The Moon pulls water into one bulge facing it, so there should be one high tide a day.
- Prediction: "On most ocean coasts, how many high tides happen in one day?" options: A) 2 / B) 1 / C) 4 (answer: A). Check: the main lunar semidiurnal tide has a period of 12 h 25 min, so a 24 h 50 min lunar day contains two high tides (NOAA, "Tides and Water Levels"); some coasts, such as the Gulf of Mexico, have one (diurnal), so the claim is "most".
- Interaction: A top-down Earth the learner spins under a fixed Moon, with a water bulge on both the near and far sides and a tide gauge at a draggable coastal point showing the water level through one rotation. Not a WorldMap; one diagram. Novel format: a rotating cross-section with a pointer.
- Payoff: The Moon makes two bulges, one on each side, because it pulls the near water harder and the far water least, so a spinning coast meets two highs.
- Claims to check: (1) Mean semidiurnal period 12 h 25 min (NOAA CO-OPS). (2) Lunar day 24 h 50 min (any almanac). (3) The two-bulge explanation: the tidal force is the difference of the Moon's gravity across the Earth, which scales as 1/d^3 (Kepler; physics:inverse-square is the prerequisite); say "about", and do not give magnitudes. (4) Some coasts have one tide a day (NOAA tide classifications); the lesson says "most".

### 21. north-is-up-convention · concept: map-orientation-north-up · intro · demand 1 [exploration]
- Learner knows: that maps have north at the top / does not know that this is a convention that has changed.
- Misconception: North has always been up because that is the natural way to draw the world.
- Prediction: "On a medieval European mappa mundi such as the Hereford map (about 1300), which direction was at the top?" options: A) North / B) South / C) East (answer: C). Check: the Hereford Mappa Mundi is oriented with east at the top, which is the origin of the word "orient", and al-Idrisi's 1154 Tabula Rogeriana had south at the top.
- Interaction: A rotation dial on an Equirectangular WorldMap (using the third rotation angle of the projection) that turns the map to east-up, south-up and north-up; as the learner turns it they must tap which continent they recognise first. One map.
- Payoff: Up on a map is a choice; north-up stuck because of the magnetic compass and later printing and chart conventions, not because the Earth has a top.
- Claims to check: (1) Hereford Mappa Mundi is east-oriented (Hereford Cathedral / British Library; cite). (2) The word "orient" comes from the Latin for east, rising (OED). (3) Al-Idrisi's 1154 map is south-up (cite the Bodleian copy or a standard history). (4) Do not claim why north won beyond what a source supports; mark any causal claim as `unverified` or leave it out. The lesson uses a rotated projection of 1:110m shapes, so there is no resolution concern.

### 22. triangle-three-right-angles · concept: spherical-triangles · stretch · demand 1 [exploration]
- Learner knows: that a triangle's angles add to 180 degrees / does not know that this is true only on a flat plane.
- Misconception: Every triangle has angles summing to 180 degrees.
- Prediction: "Start at the North Pole, go south along the 0 meridian to the equator, turn and go east along the equator to 90 E, then go north back to the Pole. What do the triangle's three angles add up to?" options: A) 180 degrees / B) 270 degrees / C) 360 degrees (answer: B). Check: all three corners are right angles, 3 x 90 = 270 degrees; the spherical excess is 90 degrees, so area = (pi / 2) x R^2 = 63.76 million km^2, one-eighth of the sphere (4 pi R^2 / 8).
- Interaction: A corner handle on an orthographic WorldMap: the learner drags the third vertex along the equator and the readout shows the angle sum and the triangle's area in km^2 (via `geoArea`). One globe.
- Payoff: On a sphere, triangles bulge; the excess over 180 degrees, in radians, times R^2 is exactly the triangle's area.
- Claims to check: (1) Angle sum = 180 degrees + spherical excess (Girard's theorem, 1629). (2) Area = excess (radians) x R^2, here 63.76 million km^2, and one-eighth of the Earth's 510.07 million km^2 surface (arithmetic with R = 6,371.0088 km). (3) The octant triangle is bounded by the 0 and 90 E meridians and the equator (the lesson computes it with `geoArea` on exact vertices; no 1:110m dependence). (4) Do not label the triangle with real countries; it covers a large part of Africa, the Indian Ocean and Asia, and the lesson shows no border claims.

## Count check

22 briefs. [exploration]: 4, 19, 20, 21, 22 (five). WorldMap / geo-kit with real 1:110m data: 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 21, 22 (eighteen). Not a map: 2, 18, 19, 20.

## Not briefed yet (on the curriculum, no brief this cycle)

`map-centre-choice`, `projection-families`, `gnomonic-great-circles`, `distance-from-a-point`, `daylight-by-latitude`, `sun-path-sky`, `climate-zones`, `coriolis-effect`, `ocean-gyres`, `river-watersheds`. Rivers, climate and currents need data the geo kit does not ship (rivers, temperature grids, current vectors); a data task for the kit owner is a precondition, not a builder's problem.

---

# Round 2: briefs #23–#55

owner: cm-geography · written 2026-10-12 · target: ~55 geography concepts, 33 more briefs. Same conventions as round 1 (great-circle distances on R = 6,371.0088 km; Natural Earth 1:110m; letters mixed). New in round 2: every brief has a **Key state**, the moment on the stage that makes the answer obvious; per `earn-the-reveal`, call `interact()` only for steps toward it, and the reveal unlocks only once the learner has been there. Every prediction answer below was recomputed by the scripts in `artifacts/scratch/cm-geography-r2/` (lib.mjs plus a.mjs to j.mjs) against `src/kit/geo/countries-110m.json` and `land-110m.json` where the number is geographic. Builders: re-run the cited script section, do not trust prose. Tags: "[toy]" means the stage is a labelled simplification with no map data; "[exploration]" means a format or question the category has not used before.

Kit notes for round 2: (1) Custom projections (the central-cylindrical in #24, the Web Mercator square in #36) need `geoProjection`/`geoMercator` from d3-geo directly; the kit re-exports only the named ones. (2) City points are markers from a gazetteer, not kit data. (3) `land()` is slow under `geoContains` (about 25 s for a 0.5 degree global grid), so precompute grids at build time, not in the page.

### 23. centre-moves-the-gap · concept: map-centre-choice · intro · demand 2
- Learner knows: that world maps have the Atlantic in the middle / does not know that this puts the Pacific's two sides at opposite edges and inflates the gap between them.
- Misconception: Distances between places on a world map are simply what they are; where the map is cut is neutral.
- Prediction: "On a world map centred on Greenwich, Tokyo and Los Angeles are 258 degrees of longitude apart. Re-centre the map on the Pacific. How far apart (in map width) are they now?" options: A) The same / B) About 100 degrees, 2.5 times closer / C) About 180 degrees (answer: B). Check: Tokyo 139.78 E and Los Angeles 118.24 W differ by 258.02 degrees across the Greenwich-centred map and 101.98 degrees across the 180-centred map (ratio 2.53); a.mjs section 23.
- Interaction: An Equirectangular WorldMap with a centre-longitude slider; Tokyo and Los Angeles are markers, and a readout shows their gap in degrees of map width. One map, one slider.
- Key state: The centre is set past about 150 W/E so the markers sit on the same side of the map with the readout at about 102 degrees; before that the readout still shows 258.
- Payoff: Where the map is cut is a choice, and it decides which neighbours look near; the Earth did not change, only the seam.
- Claims to check: (1) The longitude gap arithmetic (any gazetteer for 139.78 E, 118.24 W; Haneda and LAX coordinates). (2) Equirectangular maps map longitude linearly to x (Snyder 1987). (3) The map centre on common world maps is Greenwich or near it, a convention not a rule; cite two atlases as examples and do not rank them. The great-circle distance between the two cities (about 8,800 km) is unchanged by the slider; say so.

### 24. light-in-the-cylinder · concept: projection-families · core · demand 1
- Learner knows: that Mercator and other projections exist / does not know that some are literally "light through a globe onto paper" and that the paper's shape decides what stretches.
- Misconception: Projections are arbitrary redrawings, with no geometry behind them.
- Prediction: "Put a light at the Earth's centre and wrap paper in a cylinder touching the equator. Measured in globe radii from the equator line, where does 80 N land?" options: A) 1.4 / B) 2.4 / C) 5.7 (answer: C). Check: the central cylindrical projection has y = tan(latitude), so tan 80 = 5.67 (60 N lands at 1.73); the equirectangular value is 80 degrees in radians = 1.40 and Mercator gives ln tan(45 + 40) = 2.44; a.mjs section 24.
- Interaction: A WorldMap in a central cylindrical projection (custom `geoProjection`) with a latitude handle; ray lines from the centre to the cylinder are drawn on a side-view globe inset; one readout of height in radii. A button swaps to a plane touching the north pole. One picture at a time.
- Key state: The handle is above 70 N with the readout above 2.7 radii so the ray visibly shoots off the page.
- Payoff: A projection is a rule for putting a point on a surface; a surface that touches the globe along a line stretches everything away from that line, and this one stretches without limit toward the poles.
- Claims to check: (1) y = tan(phi) for the central cylindrical (Snyder 1987, ch. 11 or the d3-geo-projection source). (2) tan 60 = 1.73, tan 80 = 5.67, tan 85 = 11.43 (arithmetic). (3) This projection is shown as a teaching case, not a recommended map; do not imply real atlases use it. (4) Mercator is not a light projection (Snyder ch. 7); the lesson must not claim that it is.

### 25. london-la-over-greenland · concept: gnomonic-great-circles · stretch · demand 1
- Learner knows: that flights curve on flat maps (see #1) / does not know how to see the true shortest path as a straight line, or what it passes over.
- Misconception: A flight from London to Los Angeles crosses open Atlantic and then Canada, because the straight line on a Mercator map does.
- Prediction: "Draw the shortest London to Los Angeles route. What land is under it between Ireland and Canada?" options: A) Iceland / B) Only open ocean / C) Greenland (answer: C). Check: sampling the great circle (8,756 km) against the 1:110m country polygons gives UK, Ireland, Greenland, Canada, USA; the Greenland leg is about 376 km from 49.8 W to 42.6 W at about 62.3 N, the route peaks at 62.4 N, and its closest approach to Iceland's outline is 432 km (b.mjs section 25).
- Interaction: A gnomonic WorldMap centred on the route's midpoint with London fixed and a draggable Los Angeles pin; a toggle compares with a Mercator map where the same great circle bows. The straight line on the gnomonic map is the shortest route. One map.
- Key state: The route is on the gnomonic map and the learner has switched to Mercator and seen the same route bow north across Greenland.
- Payoff: On a gnomonic map every great circle is straight, so the straight line on the right map is the shortest flight, and from London to California it crosses the southern tip of Greenland.
- Claims to check: (1) Gnomonic maps send great circles to straight lines (Snyder 1987, ch. 22); d3-geo `geoGnomonic`. (2) Route length 8,756 km and the Greenland crossing from the lesson's own sampling; a fact-checker re-runs b.mjs. (3) Coordinates of London and Los Angeles from a gazetteer. (4) The 1:110m outline puts the route over Greenland's southern tip; the lesson says "crosses the southern tip" and gives no km figure for the land leg. (5) Real flights deviate for winds; say "ignoring winds". A gnomonic map can only show less than a hemisphere, so say so on the stage.

### 26. dakar-nearer-brazil · concept: distance-from-a-point · core · demand 2
- Learner knows: that Africa and South America face each other across the Atlantic / does not know how close that is compared with Africa's own cities.
- Misconception: West Africa is far from Brazil and close to Europe.
- Prediction: "From Dakar, Senegal, which city is the nearest?" options: A) Paris / B) Rome / C) Natal, Brazil (answer: C). Check: great-circle from Dakar (14.72 N, 17.47 W): Natal 3,004 km, Paris 4,205 km, Rome 4,170 km (Lisbon 2,791 and Madrid 3,154 would be nearer or close but are not options); b.mjs section 26.
- Interaction: An azimuthal equidistant WorldMap (`geoAzimuthalEquidistant`) centred on Dakar with a distance-ring slider; city markers light up when inside the ring. One map, one slider.
- Key state: The ring is between about 3,000 and 4,000 km so Natal is inside it and Paris and Rome are not.
- Payoff: A distance ring shows what is within reach; from Dakar the Atlantic's far side is nearer than much of Europe.
- Claims to check: (1) City coordinates (Dakar 14.7167 N, 17.4677 W; Natal 5.79 S, 35.2 W; Paris, Rome from a gazetteer). (2) Distances as above (haversine, R = 6,371.0088 km). (3) Azimuthal equidistant preserves distance from the centre only (Snyder ch. 25); the lesson must say that distances between other pairs are distorted. Do not claim Natal is "the nearest city in Brazil" or "nearest in the world" (Lisbon is nearer).

### 27. equinox-twelve-everywhere · concept: daylight-by-latitude · core · demand 2 [exploration]
- Learner knows: that summer has long days and winter short ones / does not know that on two days a year every place on Earth has the same day length.
- Misconception: Even at the equinox, places far from the equator get longer or shorter days than the tropics.
- Prediction: "On the March equinox, how many hours is the Sun above the horizon at 60 N (Oslo, Helsinki)?" options: A) 8 h / B) 10 h / C) 12 h (answer: C). Check: with the Sun's centre as the edge and declination 0, the half-day arc is acos(-tan 60 tan 0) = 90 degrees, giving 12.000 h at every latitude from the equator to 80 N; counting sunrise at the Sun's upper limb with refraction adds about 7 minutes at the equator and 13 minutes at 60 N (b.mjs section 27). At the June solstice the same formula gives 18.5 h at 60 N and 5.5 h in December.
- Interaction: An orthographic WorldMap with the terminator (`geoCircle` of 90 degrees about the antisolar point) and a date slider from solstice to equinox; a latitude handle shows the lit fraction of its parallel. A new format for this concept: the learner searches for the one date at which all parallels are half lit.
- Key state: The date is on the equinox with the terminator passing through both poles, and the handle has been moved to two different latitudes, each half lit.
- Payoff: At the equinox the terminator is a meridian circle, so every parallel is half in the light; day length differs with latitude only when the Sun is off the equator.
- Claims to check: (1) Day-length formula cos H = -tan(phi) tan(delta) (Meeus, Astronomical Algorithms, ch. 15). (2) Geometric 12.000 h at delta = 0; real day length at the equinox is slightly over 12 h because of refraction and the Sun's width (the lesson says "about 12 hours, to within a quarter hour up to 60 N"). (3) The equinox is the instant the Sun crosses the equator, not necessarily the day with exactly 12 hours; the lesson uses the geometric statement. (4) 18.5 h at 60 N on 21 June, from the same formula. Resolution does not matter.

### 28. london-december-noon-sun · concept: sun-path-sky · core · demand 2 [toy]
- Learner knows: that the Sun is lower in winter / does not know how low, or that the noon height is simple subtraction.
- Misconception: The winter Sun in a mid-latitude city is only a little lower than at the equinox.
- Prediction: "In London (51.5 N), how high above the horizon is the Sun at noon on 21 December?" options: A) About 15 degrees / B) About 38 degrees / C) About 62 degrees (answer: A). Check: noon altitude = 90 - latitude + declination = 90 - 51.51 - 23.44 = 15.05 degrees; equinox 38.49 and June solstice 61.93 (b.mjs section 28).
- Interaction: A sky-dome diagram (not a map): the learner picks the date from a three-position slider (June, equinox, December) and the Sun's arc across a south-facing horizon is drawn with a protractor readout of noon altitude. Labelled toy: the sky dome is schematic, geometry real.
- Key state: December selected with the arc visibly low, and the readout at 15 degrees.
- Payoff: Noon altitude is the angle of the tilt-shifted equator over your horizon, so winter noon in London is 47 degrees below summer noon, twice the 23.4 degree tilt.
- Claims to check: (1) Altitude formula (any astronomy text; Meeus ch. 13). (2) London latitude 51.51 N (gazetteer). (3) Declination at solstice 23.44 degrees (Astronomical Almanac); the solstice declination changes by about 0.013 degrees per century. (4) The numbers are geometric (no refraction, which adds about 0.1 degrees at this altitude). No map data.

### 29. drift-of-a-straight-throw · concept: coriolis-effect · stretch · demand 2 [toy] [exploration]
- Learner knows: that hurricanes spin and that the Earth turns / does not know how small or large the Coriolis deflection is for ordinary motion.
- Misconception: The Coriolis effect is what makes a sink drain one way, and it is large for anything that moves.
- Prediction: "An unsteered object moves due north at 100 m/s (360 km/h) from 45 N for 1,000 km. How far east of a straight-line track does the turning Earth carry it, relative to the ground?" options: A) 5 km / B) 50 km / C) 500 km (answer: C). Check: deflection d = Omega sin(phi) v t^2 with Omega = 7.2921e-5 rad/s, phi = 45 degrees, v = 100 m/s, t = 10,000 s gives 515.6 km; the same motion over 10 km gives 0.05 km (j.mjs section 29).
- Interaction: A top-down rotating-platform toy: a launcher fires a dot at constant speed; the learner slides the speed and the distance, and the dot's path as seen from the ground is curved relative to a ruled straight line. Labelled toy (flat platform, constant latitude, no friction, small-deflection formula).
- Key state: Two runs on the same platform, one over 1,000 km and one over 10 km, have both been fired and their sideways drift compared.
- Payoff: Deflection grows with the square of the travel time, so it is invisible over a sink's width and enormous over a thousand kilometres, which is why it shapes weather and not drains.
- Claims to check: (1) Omega = 7.2921e-5 rad/s (IERS). (2) d = Omega sin(phi) v t^2 is the small-deflection result at constant latitude for a frictionless object (Holton, An Introduction to Dynamic Meteorology; mark the approximation: latitude changes by 9 degrees over 1,000 km, so the figure is about 515 km plus or minus 15%). (3) Do not claim sink-drain direction; state that no demonstration is made. (4) Equator gives 0 (sin 0); at 60 N 632 km under the same assumptions. Do not label it a "projectile in the real world"; it is an unsteered object.

### 30. three-giants-in-africa · concept: true-size-comparison · intro · demand 2
- Learner knows: that Africa is big on a map / does not know that it can swallow the biggest countries.
- Misconception: Africa is about as big as one big country.
- Prediction: "Drag the United States, China and India into Africa without overlapping. What happens?" options: A) They fit with room to spare / B) They fill it exactly / C) Africa is too small (answer: A). Check: on the kit's data (areas by `geoArea` on R = 6,371.0088 km) the US 9.49, China 9.41, India 3.15 sum to 22.05 million km^2, which is 73% of Africa's 30.04 million km^2, leaving 7.99 million; c.mjs section 30. (The kit's US omits Hawaii and small islands; its Africa is the sum of 52 polygons.)
- Interaction: A WorldMap in Equal Earth with countries as draggable shapes made with `moveToLatitude`-style rotation on the sphere, dropped onto Africa; a readout shows the share of Africa filled. One map, one bar.
- Key state: All three countries have been placed in Africa and the share bar reads about 73%.
- Payoff: Africa is 30 million km^2; the three countries together fill under three quarters of it, which a Mercator map hides by inflating the northern ones.
- Claims to check: (1) Areas from the kit's own 1:110m shapes: US 9.49, China 9.41, India 3.15, Africa 30.04 million km^2 (c.mjs); published areas (CIA World Factbook, UN) are US 9.83, China 9.60, India 3.29, Africa about 30.4 million, so the lesson says "about" and the share 73% to 74%. (2) A shape moved on the sphere keeps its area (`moveToLatitude` rotates; its own docstring). (3) "Fits" is by area, not by exact tiling; the lesson says "total area". Do not rank countries by area to the hundred thousand km^2; 1:110m drops islands.

### 31. indonesia-vs-the-us-width · concept: country-span · intro · demand 1
- Learner knows: that Indonesia is an archipelago / does not know how far east to west it stretches.
- Misconception: Indonesia is a modest cluster of islands, a fraction of a big country's reach.
- Prediction: "Compared with the contiguous United States coast to coast, how far east to west does Indonesia stretch?" options: A) About half as far / B) About the same / C) Further (answer: C). Check: farthest pair of vertices in the 1:110m outlines: Indonesia 5,323 km (5.48 N, 95.29 E to 9.12 S, 141.03 E), the lower-48 polygon 4,648 km (44.81 N 66.97 W to 38.95 N 123.73 W), a ratio of 1.15; c.mjs section 31.
- Interaction: A WorldMap in Equal Earth with each country's polygon shifted by `moveToLatitude`/rotation so both sit on the same latitude; a stretchable ruler pinned at the western tip of each shape reads km. One map, one ruler.
- Key state: The learner has laid the ruler across both shapes and the readout shows the two lengths within one screen.
- Payoff: Indonesia's islands span more than the continental US; the sea between them is part of the country's width.
- Claims to check: (1) The two straight-line extents from the lesson's own outlines (c.mjs); a fact-checker recomputes with the 1:110m polygons. (2) Published extents differ (Indonesia is often quoted as about 5,100 km east to west); the lesson says "about 5,000 km" and "about 15% longer". (3) The US figure uses the largest polygon of the "United States of America" feature, which excludes Alaska and Hawaii (the lesson states this). Territorial extents involve borders and maritime claims; the lesson claims nothing about them.

### 32. parallel-of-most-land · concept: land-by-latitude · intro · demand 2 [exploration]
- Learner knows: that Earth is about 70% ocean / does not know that the share changes sharply with latitude.
- Misconception: Land and ocean are mixed in roughly the same proportion at every latitude.
- Prediction: "Walk once around the world along a parallel. Which parallel has the most of your walk over land?" options: A) The equator / B) 40 N / C) 65 N (answer: C). Check: sampling the 1:110m land polygon every 0.1 degree of longitude gives land shares of 21.4% (equator), 45.3% (40 N), 77.4% (65 N), 3.7% (40 S) and 0.0% (60 S); across 10 degree bands the peak is 60 to 70 N at 71.2% (d.mjs, h.mjs, section 32). Global land is 28.9% by area on this data (published 29.2%).
- Interaction: An orthographic WorldMap with a slider that moves a highlighted parallel from 80 S to 80 N and a live land-share readout; the learner hunts for the highest and lowest. A search-the-sphere format, not a lookup.
- Key state: The slider has visited both a high northern parallel (60 to 70 N) and a southern one (40 to 60 S) and the readout shows the contrast.
- Payoff: Land is piled up in the north: 65 N is over three quarters land, the 60 S parallel is entirely open ocean, which is why the southern oceans are one connected belt.
- Claims to check: (1) Land fractions as computed from the kit's own polygon (the build precomputes a table; a checker re-runs h.mjs). (2) 65 N is over land for 77% of its length (Siberia, Canada, Alaska, Greenland, Scandinavia; any atlas). (3) At 1:110m, Antarctica's coast is simplified and ice shelves are mixed with land, so southern band figures at 70 to 90 S are not claimed. (4) 60 S passes through no land except possibly the Antarctic Peninsula tip; the lesson says "almost none". Say "about 29% land" for the global figure, and do not rank bands to the point.

### 33. seattle-moscow-heading · concept: initial-bearing · core · demand 2
- Learner knows: that planes fly great circles / does not know that the starting compass direction is not the direction you face at the end, nor which way to point.
- Misconception: Moscow is far east of Seattle, so you start flying east.
- Prediction: "Standing in Seattle, which way do you face to take the shortest route to Moscow?" options: A) East / B) North-east / C) Almost due north (answer: C). Check: the initial great-circle bearing from Seattle (47.61 N, 122.33 W) to Moscow (55.76 N, 37.62 E) is 11.5 degrees from north over 8,371 km; the route crosses Canada, Greenland, Norway, Finland and Russia (a.mjs, b.mjs section 33).
- Interaction: A WorldMap in an azimuthal projection centred on Seattle with a draggable compass needle; a faint arc is drawn the learner's heading would follow. The learner swings the needle until the arc meets Moscow. One map, one needle.
- Key state: The needle has been dragged to within 2 degrees of 11.5 degrees and the arc visibly lands on Moscow.
- Payoff: On a sphere the direction to a distant place depends on where you stand; to reach a place far east at high latitude you start by pointing nearly north.
- Claims to check: (1) Initial bearing formula atan2(sin dlon cos phi2, cos phi1 sin phi2 - sin phi1 cos phi2 cos dlon) (Movable Type scripts / Williams, Aviation Formulary). (2) 11.5 degrees and 8,371 km (b.mjs). (3) City coordinates (gazetteer). (4) The countries under the route from sampling against 1:110m; wording "passes over Greenland, Norway and Finland". Real flights deviate for winds and airspace; say "ignoring winds and airspace".

### 34. bearing-spiral-to-the-pole · concept: rhumb-lines · core · demand 1 [exploration]
- Learner knows: that Mercator keeps compass bearings straight / does not know what a constant bearing does over a long distance.
- Misconception: Holding a constant compass heading takes you around the world and back, or never anywhere in particular.
- Prediction: "Starting on the equator, you hold a constant compass heading of 80 degrees (just north of due east). How far do you travel before you reach the North Pole?" options: A) 10,000 km, the equator-to-pole distance / B) About 57,600 km / C) You never reach it, the path is infinitely long (answer: B). Check: constant-bearing arc length to the pole is R x (pi/2) / cos(80 degrees) = 57,631 km (numeric integration gives 57,568 km to 89.9 N); the path circles the pole 6.4 times by 89.9 N and infinitely often in all (e.mjs section 34).
- Interaction: An orthographic WorldMap centred on the pole with a heading slider from 10 to 85 degrees; the spiral is drawn and its turns and length are read out. The learner finds the spiral that is shortest or has the fewest turns.
- Key state: The slider is at 80 degrees and the readout shows the path ending at the pole with more than six turns.
- Payoff: A constant-bearing line is straight on Mercator and a spiral on the globe; it reaches the pole after a finite distance although it circles forever.
- Claims to check: (1) Loxodrome length s = R x delta-phi / cos(alpha) with alpha measured from the meridian (Snyder 1987, ch. 7 or Bowditch). (2) 57,631 km and 6.4 turns by 89.9 N from numeric integration in e.mjs. (3) "Infinitely many turns" follows from the Mercator ordinate diverging at the pole (Snyder). (4) Lengths use the sphere. The lesson does not claim that anyone navigates this way.

### 35. helsinki-spin-speed · concept: spin-speed-by-latitude · core · demand 2
- Learner knows: that the Earth spins once a day / does not know that your speed from the spin depends on where you stand.
- Misconception: Everyone on Earth is carried around at the same speed, about 1,670 km/h.
- Prediction: "Earth's spin carries someone on the equator at about 1,670 km/h. How fast is it carrying someone in Helsinki (60 N)?" options: A) 1,670 km/h / B) 830 km/h / C) 0 km/h (answer: B). Check: v = 2 pi R cos(phi) / 86,164.09 s; equator 1,672.5 km/h, Helsinki (60.17 N) 831.9 km/h, London (51.51 N) 1,041 km/h, a pole 0 (e.mjs section 35).
- Interaction: An orthographic WorldMap seen from above the north pole with a latitude handle; a circle of latitude with an arrow shows the speed, and a readout shows km/h. One globe.
- Key state: The handle has been moved to at least two latitudes, one near the equator and one above 55 N, and the readout contrasts them.
- Payoff: Everyone makes one turn in a sidereal day, but high-latitude circles are shorter, so speed falls like cos(latitude).
- Claims to check: (1) Sidereal day 86,164.09 s (IERS). (2) R = 6,371.0088 km; on the WGS84 ellipsoid the equatorial speed is 1,674.4 km/h (0.1% more); say "about 1,670". (3) Helsinki 60.17 N (gazetteer). (4) Speed is relative to Earth's axis, not to the Sun or the galaxy; state it.

### 36. web-map-cut-off-latitude · concept: web-mercator-limit · core · demand 1
- Learner knows: that Mercator stretches the poles / does not know that map apps cut the map off, and where.
- Misconception: Online maps show the whole world pole to pole; the poles are just far away.
- Prediction: "Web maps are square. At what latitude does the map stop?" options: A) 75 N / B) 85 N / C) 90 N, the pole (answer: B). Check: Web Mercator (EPSG:3857) is cut where y equals the x extent: latitude = atan(sinh(pi)) = 85.0511 degrees (e.mjs section 36).
- Interaction: A Mercator WorldMap with a draggable top edge; the learner drags the top boundary north and the map stretches until it is as tall as it is wide. One map, one readout of latitude.
- Key state: The boundary is dragged to 85 degrees where the map becomes square, and the polar caps beyond are shown dimmed.
- Payoff: Mercator's height grows without bound toward the poles, so square web maps simply drop everything beyond 85.05 degrees.
- Claims to check: (1) Latitude limit 85.0511 degrees (EPSG:3857 definition; OpenStreetMap wiki "Slippy map tilenames"). (2) The ordinate formula y = ln tan(45 + phi/2) (Snyder ch. 7) is infinite at 90. (3) Antarctica's bulk lies beyond 85 S, so a web map shows only part of it; the lesson makes no claim about the share. Do not name any map product.

### 37. half-the-globe-30-band · concept: area-by-latitude · core · demand 2
- Learner knows: that 0 to 90 degrees of latitude is half-way to the pole / does not know that equal steps of latitude are not equal areas.
- Misconception: The tropics band is a small slice of the planet.
- Prediction: "What share of the Earth's surface lies between 30 S and 30 N?" options: A) 33% / B) 50% / C) 25% (answer: B). Check: area fraction between latitudes a and b is (sin b - sin a)/2, giving exactly 0.5 for 30 S to 30 N; summing `geoArea` of the band polygon gives 49.9% (the 0.1% is a 10 degree vertex spacing), and 60 to 90 N is only 6.7% (e.mjs section 37).
- Interaction: An orthographic WorldMap with two draggable parallels; a shaded band and readout of its share of the sphere. The task: find the band with half the planet. One globe, one readout.
- Key state: The two parallels are set to a symmetric band near 30 and the readout reads about 50%.
- Payoff: Area grows with the sine of latitude, so the band within 30 degrees of the equator holds half the planet and the polar caps beyond 60 hold under 7% each.
- Claims to check: (1) Archimedes' hat-box theorem: the area of a spherical zone is 2 pi R h, where h is the height between planes (any geometry text), which gives (sin b - sin a)/2 of the sphere. (2) 0.5 and 6.7% (arithmetic, e.mjs). (3) The tropics (23.44 degrees) hold 39.8% of the surface. (4) This is a sphere; on the real ellipsoid the figure changes by under 0.2%. Resolution is irrelevant; no country data.

### 38. hawaii-chain-clock · concept: hotspot-chain-speed · core · demand 1
- Learner knows: that the Pacific plate moves / does not know how to read its speed from a line of islands.
- Misconception: Plate speeds cannot be measured directly; they are only theory.
- Prediction: "Kauai's volcano is about 5.1 million years old and Kilauea, on Hawaii island, is active now. Kauai is 529 km away. How fast has the Pacific plate moved on average?" options: A) About 1 cm/yr / B) About 10 cm/yr / C) About 1 m/yr (answer: B). Check: 529 km / 5.1 million years = 10.4 cm/yr; Kilauea to Midway (2,444 km, about 28 million years) gives 8.8 cm/yr (f.mjs section 38); published present-day motion is about 7 to 9 cm/yr.
- Interaction: A WorldMap of the north Pacific in Equal Earth with island markers (islands do not exist at 1:110m); the learner drags a ruler from Kilauea to each older island and an age label gives years; the readout shows cm/yr. One map.
- Key state: The ruler has been dragged to two islands of different age and the two cm/yr readouts are within 2 cm/yr of each other.
- Payoff: Islands strung in a line with older ones farther along are a record of a plate moving over a fixed hot spot, and the distances over the ages give centimetres a year.
- Claims to check: (1) Island ages: Kauai shield about 5.1 Ma, Midway about 28 Ma (USGS Hawaiian Volcano Observatory, "Hawaiian-Emperor chain" pages; mark as `unverified` until a checker confirms the table). (2) Coordinates for Kilauea (19.42 N, 155.29 W), Kauai (22.05 N, 159.53 W) and Midway (28.21 N, 177.37 W) from USGS or a gazetteer. (3) The hot spot is treated as fixed; some studies say it drifts, so the lesson says "about" and gives 7 to 9 cm/yr as the published range. (4) No claim on exact island ages beyond the cited table.

### 39. lap-at-89-north · concept: polar-circle-geometry · core · demand 1
- Learner knows: that meridians meet at the poles / does not know how tiny a lap around the Earth becomes near the pole.
- Misconception: Going "around the world" always means about 40,000 km.
- Prediction: "You walk once around the world on the 89 N parallel. How far is that?" options: A) 700 km / B) 7,000 km / C) 40,000 km (answer: A). Check: 2 pi R cos(89 degrees) = 698.6 km; at 85 N it is 3,489 km, at 89.9 N it is 69.9 km (f.mjs section 39).
- Interaction: An orthographic WorldMap seen from above the pole with a latitude handle; the lap is drawn and measured in km. The learner pushes it down toward the pole until a lap is walkable in a day. One globe.
- Key state: The handle is above 88.5 N so the lap is under 1,000 km.
- Payoff: The circle of latitude shrinks like cos(latitude), so near the pole you can circle the Earth in an afternoon.
- Claims to check: (1) Circumference 2 pi R cos(phi) (arithmetic). (2) 698.6, 3,489 and 69.9 km (f.mjs). (3) At the equator the figure is 40,030 km on the sphere (the real equator is 40,075 km on WGS84); say "about 40,000". (4) 89 N is the open Arctic Ocean ice, not walkable land; the lesson says "if you could". Keep to geometry.

### 40. south-east-north-walk · concept: polar-circle-geometry · core · demand 1 [exploration]
- Learner knows: that the poles are special points / does not know that the puzzle "walk south, east, north and end at the start" has more answers than one.
- Misconception: Only the North Pole works for the walk 1 km south, 1 km east, 1 km north back to the start.
- Prediction: "Where can you stand so that walking 1 km south, 1 km east, then 1 km north puts you back at the start? How many such places are there?" options: A) Just the North Pole / B) Exactly two / C) Infinitely many (answer: C). Check: the north pole works; near the south pole any start 1 km north of a parallel whose circumference is 1/k km (k = 1, 2, 3, ...) works, since the east leg then wraps k times. Starting distances from the south pole are 1.159 km (k = 1), 1.080 km (k = 2), 1.053 km (k = 3), which approach 1 km; the walk simulated at each returns exactly (f.mjs section 40, wraps = k).
- Interaction: A polar orthographic WorldMap (south pole view) where the learner drops a start pin; the three-legged walk is drawn and a readout says "back at start / off by x km". Find as many working circles as possible. One globe, one pin.
- Key state: The learner has found at least one working start point near the south pole and watched its east leg lap the small circle.
- Payoff: Near the south pole the east leg can go around a small circle whole times, so there is a ring of answers for each whole number of laps, infinitely many in all.
- Claims to check: (1) The geometry (a classic puzzle; Peter Winkler or Martin Gardner, Mathematical Puzzles; cite) and the formula: parallel circumference 1/k km at distance 1/(2 pi k) km from the pole. (2) The distances above (f.mjs). (3) On the real ellipsoid, the answer set is the same up to metre-level changes. (4) Any such place near the south pole is inside Antarctica and no one walks it; say "if you could". Do not call it a trick; the lesson shows the circles.

### 41. satellite-sees-42-percent · concept: satellite-coverage · core · demand 1
- Learner knows: that satellites hover over fixed spots / does not know how much of the Earth a very high one can see.
- Misconception: A satellite 36,000 km up sees half of the planet.
- Prediction: "A geostationary satellite orbits 35,786 km above the equator. What fraction of Earth's surface can it see?" options: A) About 50% / B) About 42% / C) About 25% (answer: B). Check: orbital radius 42,164 km; the visible cap has half-angle acos(R/r) = 81.31 degrees and area fraction (1 - cos 81.31)/2 = 42.4% (R = 6,371.0088 km; f.mjs section 41). Polar regions beyond 81.3 degrees are never in view.
- Interaction: An orthographic WorldMap whose clip angle is controlled by a height slider (200 km to 42,164 km) with the visible cap drawn; a readout shows the covered share. One globe.
- Key state: The slider is set to 35,786 km and the visible cap shows a bright disc with the polar caps dark.
- Payoff: Even from far away you see less than half the globe, because the horizon grows slowly with altitude.
- Claims to check: (1) Geostationary altitude 35,786 km above the equator (IERS/ITU), radius 42,164 km. (2) The visible-cap formula (arithmetic, f.mjs). (3) On the equator the satellite sees to 81.3 degrees of great-circle distance; usable service is less because of low elevation angles, which the lesson does not cover. (4) Spherical Earth.

### 42. due-west-from-london · concept: parallel-travel · intro · demand 2
- Learner knows: that London is "above" most US cities on the map / does not know which landmass London lines up with.
- Misconception: London shares latitude with New York or Washington, since both are across the Atlantic.
- Prediction: "Fly due west along London's latitude (51.5 N). What is the first land you reach?" options: A) The United States / B) Canada / C) Greenland (answer: B). Check: walking London's parallel west in 0.05 degree steps through the 1:110m country polygons gives open sea (Ireland and the North Atlantic) and then Canada at 55.5 W, after about 3,737 km great-circle from London; Madrid's parallel (40.4 N) meets the USA at 74 W, New York's parallel meets Portugal (g.mjs section 42).
- Interaction: An Equirectangular WorldMap with a city picker (London, Madrid, New York, Lisbon) and a parallel line drawn east to west; readout names the first country the line meets. One map, one picker.
- Key state: The learner has picked at least two cities and compared where each parallel lands across the ocean.
- Payoff: Europe is further north than it feels: London lines up with Canada, and the US cities across the Atlantic line up with Spain and Portugal.
- Claims to check: (1) City latitudes (London 51.51 N, Madrid 40.42 N, New York 40.71 N, Lisbon 38.72 N; gazetteer). (2) Landfall found by sampling the 1:110m polygons (g.mjs); a checker re-runs it. The 55.5 W longitude is at Newfoundland, but the lesson says "Canada" and gives no coastal detail. (3) Equirectangular parallels are horizontal lines (Snyder). Do not claim climate comparisons from this alone.

### 43. four-decimals-of-latitude · concept: coordinate-precision · intro · demand 1 [toy]
- Learner knows: that coordinates can be written with many decimals / does not know what each decimal place means on the ground.
- Misconception: Four decimal places of latitude resolve a point to the centimetre.
- Prediction: "A phone shows latitude 51.5074 N. If the last digit changes by one, how far have you moved?" options: A) 1 km / B) 11 metres / C) 1 centimetre (answer: B). Check: 0.0001 degree x 111.195 km/degree = 11.12 m of latitude; 0.001 degree is 111 m, 0.00001 degree is 1.1 m; for longitude at 51.5 N, 0.0001 degree = 6.92 m (f.mjs section 43).
- Interaction: A zoom-ladder toy (not a map): a slider chooses 1 to 6 decimals and a grid cell is drawn over a to-scale outline of a football pitch (105 by 68 m) and a house; a readout gives the cell side in metres. Labelled toy: schematic grid, true scale arithmetic.
- Key state: The slider has passed 4 decimals, where the cell is about the size of a house, and the learner has seen the pitch.
- Payoff: Each decimal place is ten times finer: 4 places is about 11 m, 5 is about 1 m, 6 is about 0.1 m.
- Claims to check: (1) 111.195 km per degree on the mean sphere (arithmetic; 110.57 to 111.69 km on WGS84 by latitude). (2) 11.1 m, 1.1 m, 0.11 m and the longitude figure (arithmetic). (3) Pitch dimensions (FIFA/IFAB recommended 105 x 68 m). (4) GPS accuracy is typically metres, so extra decimals are false precision; cite an official GPS performance standard (US Space Force/GPS.gov) or omit.

### 44. antarctica-vs-australia · concept: true-size-comparison · intro · demand 2
- Learner knows: that Antarctica looks huge at the bottom of Mercator maps / does not know its real size against a familiar continent.
- Misconception: Antarctica is bigger than all the other continents because of how it looks.
- Prediction: "In true area, how many Australias fit in Antarctica?" options: A) About 4 / B) About 1.6 / C) About 1 (answer: B). Check: on the kit's 1:110m shapes Antarctica is 12.24 million km^2 and Australia 7.70 million km^2, a ratio of 1.59; published areas (about 14.2 and 7.69 million km^2) give 1.8 because the 1:110m outline leaves out ice shelves (c.mjs section 44). The answer is 1.6 to 1.8, never 1 or 4.
- Interaction: A WorldMap with a projection toggle (Mercator / Equal Earth) and a draggable Australia shape moved onto Antarctica; the readout shows the area ratio from `geoArea`. One map.
- Key state: Australia has been dropped on Antarctica in Equal Earth with its footprint visibly covering well over half of it.
- Payoff: On Mercator, Antarctica swells to a band across the bottom of the page; its true area is under twice Australia's.
- Claims to check: (1) Areas from the kit's data (12.24 and 7.70 million km^2) and published (CIA World Factbook: Antarctica 14.2, Australia 7.69). (2) The kit excludes much of the ice shelf; the lesson says "about 1.6 to 1.8". (3) Moving a shape on the sphere preserves area. (4) Mercator can show Antarctica only by cutting it off (see #36). No claim about territory or treaty status.

### 45. june-sunrise-london-heading · concept: sunrise-azimuth · core · demand 1 [toy]
- Learner knows: that the Sun rises in the east / does not know how far from east it rises at high latitudes.
- Misconception: The Sun always rises due east and sets due west.
- Prediction: "In London (51.5 N) on 21 June, in which compass direction does the Sun rise?" options: A) Due east (90 degrees) / B) North-east, about 50 degrees / C) Nearly north, about 10 degrees (answer: B). Check: cos A = sin(declination)/cos(latitude) gives A = 50.3 degrees from north on 21 June, 129.7 degrees on 21 December and 90.0 degrees at the equinox (b.mjs section 45).
- Interaction: A top-down horizon compass diagram (not a map): a date slider moves the sunrise and sunset marks along the horizon between the solstices. Labelled toy: geometry only, no atmosphere.
- Key state: The slider is at June and December in turn (both visited) and the marks sit well apart from the east-west line.
- Payoff: Sunrise slides north and south of due east with the Sun's declination; at 51.5 N it swings about 80 degrees across the year.
- Claims to check: (1) Rise azimuth formula (Meeus ch. 15; the geometric horizon with no refraction, which changes it by under 1 degree). (2) Values above (b.mjs). (3) London latitude 51.51 N. (4) Declination 23.44 degrees. (5) The year-round swing 79.5 degrees (129.7 - 50.3).

### 46. pole-sun-186-days · concept: polar-day-length · core · demand 2
- Learner knows: that the poles get months of daylight / does not know that the two halves are unequal.
- Misconception: The Sun is up at the North Pole for exactly half the year, six months of 182.6 days.
- Prediction: "At the North Pole, for how many days a year is the Sun above the horizon?" options: A) About 91 days / B) About 270 days / C) About 186 days (answer: C). Check: the Sun's declination is positive for 186.4 days between the March and September equinoxes (Earth is slower in aphelion, July), 178.8 days otherwise; counting sunrise at the upper limb with refraction gives 190.7 days (i.mjs section 46, Kepler orbit with e = 0.0167).
- Interaction: An orthographic WorldMap from above the north pole with the terminator and a day slider; counters show days in sunlight and in darkness at the pole. One globe.
- Key state: The slider has been run from the March equinox to the September equinox and the day counter reads about 186.
- Payoff: Earth is slower in northern summer, so the pole's long day lasts about eight days longer than its long night.
- Claims to check: (1) Equinox-to-equinox intervals: March to September about 186 days (Astronomical Almanac / USNO "Earth's Seasons"). (2) 186.4 and 178.8 days from the Kepler model in i.mjs (e = 0.016709, perihelion longitude 283 degrees). (3) With refraction and the Sun's radius the polar day is 190 to 191 days; the lesson says "about 186 days, 190 counting refraction". (4) Equation of time and precession are ignored.

### 47. barcelona-sun-minutes · concept: sun-time-from-longitude · intro · demand 2
- Learner knows: that Madrid and Barcelona share the same clock time / does not know how much earlier the Sun reaches its peak further east.
- Misconception: Two cities on the same official clock reach midday at the same moment.
- Prediction: "Barcelona is 505 km east of Madrid. How much earlier does the Sun reach its highest point there?" options: A) 5 minutes / B) 23 minutes / C) 1 hour (answer: B). Check: longitude difference 2.17 E minus -3.70 E = 5.88 degrees, at 4 minutes per degree is 23.5 minutes; distance 505.4 km (f.mjs section 47).
- Interaction: A Spain WorldMap (Equirectangular, 1:110m outline) with a moving north-south sun line the learner drags; two city clocks display local solar time against the official clock. One map plus two readouts.
- Key state: The sun line sits on Barcelona's meridian with the Barcelona clock reading solar noon and Madrid's still about 23 minutes short.
- Payoff: Solar noon moves 4 minutes per degree of longitude, so a 500 km east-west trip changes sun time by almost half an hour on a single clock.
- Claims to check: (1) 4 minutes per degree (360 degrees / 24 h; any astronomy text). (2) City longitudes (Madrid 3.70 W, Barcelona 2.17 E). (3) The equation of time shifts both cities equally, so the 23.5 minute difference holds; say "about". (4) Both cities use the same official Spanish time (CET/CEST; any government source); the lesson makes no claim on the political choice. Spain is in the kit as "Spain".

### 48. canal-runs-southeast · concept: east-west-surprises · intro · demand 2
- Learner knows: that the Panama Canal links the Atlantic and the Pacific / does not know which way you sail through it.
- Misconception: Going from the Atlantic to the Pacific through the canal means sailing west.
- Prediction: "A ship enters the Panama Canal from the Atlantic and leaves into the Pacific. Which way is it heading overall?" options: A) South-east / B) West / C) South-west (answer: A). Check: Colon (9.36 N, 79.90 W) to Balboa (8.95 N, 79.57 W) is 58.3 km at an initial bearing of 140.9 degrees; the Pacific end is east of the Atlantic end by 0.34 degrees of longitude (f.mjs section 48).
- Interaction: A zoomed WorldMap of Panama (Mercator, 1:110m outline) with two end markers and a draggable ship along a straight line between them; a compass readout. One map.
- Key state: The ship marker is at the Pacific end with the readout showing a bearing of about 141 degrees.
- Payoff: Because the isthmus is an S-bend running east-west, the Pacific end of the canal is further east than the Atlantic end.
- Claims to check: (1) Terminal coordinates (Colon/Cristobal 9.36 N, 79.90 W and Balboa 8.95 N, 79.57 W; Panama Canal Authority or a gazetteer, mark `unverified` until checked). (2) Bearing 140.9 degrees is the straight-line bearing between terminals, not the canal's own course (it winds); the lesson says "overall". (3) The isthmus outline is 1:110m, adequate at 100 km. Avoid the political status of the Canal Zone.

### 49. miami-west-of-lima · concept: east-west-surprises · intro · demand 2
- Learner knows: that South America is south of North America / does not know that it also sits well to the east.
- Misconception: Lima, Peru is far west of Miami because it faces the Pacific.
- Prediction: "Which is further west, Miami, Florida or Lima, Peru?" options: A) Lima / B) Miami / C) They share a meridian (answer: B). Check: Miami 80.19 W, Lima 77.04 W, so Miami is 3.15 degrees further west; the meridian of Miami runs south through Cuba, Panama, Ecuador and Peru (f.mjs section 49).
- Interaction: An Equirectangular WorldMap with a draggable meridian; the learner drags it from Miami's longitude south and watches it cross the countries. One map.
- Key state: The meridian has been dragged to Miami and the learner has seen it cut Peru and Ecuador's coast while Lima sits to its right.
- Payoff: South America lies largely east of North America, so Miami's meridian meets South America at its Pacific side.
- Claims to check: (1) City longitudes (Miami 80.19 W, Lima 77.04 W; gazetteer). (2) The countries along 80.19 W by sampling 1:110m (f.mjs); the lesson says "Cuba, Panama, Ecuador and Peru". (3) Equirectangular x is linear in longitude (Snyder). The lesson draws no border conclusions.

### 50. four-lines-one-continent · concept: reference-lines · intro · demand 2
- Learner knows: that the equator, tropics and prime meridian exist / does not know which continent holds all of them.
- Misconception: The equator, both tropics and the prime meridian cross several continents each, so many continents cross all four.
- Prediction: "The equator, the Tropic of Cancer, the Tropic of Capricorn and the prime meridian: which continent do all four cross?" options: A) Asia / B) Africa / C) South America (answer: B). Check: against the 1:110m country polygons Africa meets all four; South America meets the equator and Capricorn only; Asia meets the equator and Cancer only; Europe the prime meridian only (g.mjs section 50; continent membership by explicit country lists).
- Interaction: An Equirectangular WorldMap with the four lines drawn; the learner taps each continent's name and its crossings light up. One map.
- Key state: The learner has checked at least three continents and the crossing count for each is visible.
- Payoff: Africa straddles the equator, both tropics and the prime meridian; no other continent does.
- Claims to check: (1) Continents as explicit country lists in the lesson (a convention; the lesson lists them). (2) Tropic latitude 23.4366 N/S (2025; changes by 0.47 arcsec a year; Astronomical Almanac). (3) The crossing test is against the 1:110m polygons; Madagascar and other islands included. (4) North America meets only the Tropic of Cancer and Europe only the prime meridian on this data. Antarctica is left out of the options.

### 51. britain-on-a-page · concept: map-scale-ratio · intro · demand 2
- Learner knows: that maps have a ratio like 1:50,000 / does not know how to turn the ratio into centimetres on paper.
- Misconception: A scale of 1:20,000,000 means a country's length on the page is about a tenth of its real size.
- Prediction: "On a map at 1:20,000,000, how long does Great Britain look, tip to tip (about 975 km)?" options: A) 0.5 cm / B) 5 cm / C) 50 cm (answer: B). Check: 975.3 km (the longest chord between outline vertices of the largest UK polygon, from 49.96 N 5.24 W to 58.63 N 3.00 W) divided by 20,000,000 is 4.9 cm; at 1:1,000,000 it is 97.5 cm; at 1:50,000,000, 1.95 cm (g.mjs section 51).
- Interaction: A scale-ratio slider from 1:1,000,000 to 1:100,000,000 redraws Great Britain at true paper size (a ruler in cm drawn alongside, assuming 96 CSS pixels per inch), with a readout. One drawing.
- Key state: The slider has been set to 1:20,000,000 with Britain visibly about the width of a thumb.
- Payoff: Map length equals real length divided by the ratio; a thousand kilometres becomes five centimetres.
- Claims to check: (1) Great Britain chord 975 km from the 1:110m outline (g.mjs); actual tip-to-tip is about 970 to 1,000 km (Land's End to John o' Groats is commonly quoted at about 970 km in a straight line; mark `unverified` until a source is attached). (2) Conversion (arithmetic). (3) The ruler's accuracy depends on the screen; the lesson says "on paper" and labels the drawing "to scale at 96 dpi, approximately". (4) 1:110m outline limits the figure to about 1%.

### 52. parallel-vs-arc-short-hop · concept: rhumb-lines · core · demand 1
- Learner knows: that great circles are shorter than constant-heading routes (see #1) / does not know when the difference starts to matter.
- Misconception: The great-circle saving is large even on a short east-west trip.
- Prediction: "Two places 1,000 km apart east-west along the 40 N parallel: how much shorter is the great-circle route than following the parallel?" options: A) About 0.7 km / B) About 7 km / C) About 70 km (answer: A). Check: parallel distance 1,000 km spans 11.74 degrees of longitude; great-circle distance between the endpoints is 999.28 km, a saving of 0.72 km (0.07%); at 2,000 km the saving is 5.8 km, at 5,000 km 95.6 km (1.95%), at 8,000 km 428 km (5.7%); at 60 N, 5,000 km saves 398 km (8.7%) (g.mjs section 52).
- Interaction: A distance slider (500 to 9,000 km) and a latitude picker (20, 40, 60) on a Mercator WorldMap; the parallel and the great circle between the same two points are drawn and a readout shows the saving. One map, two lines.
- Key state: The distance slider has passed 5,000 km at 40 N and the saving has visibly grown to tens of kilometres.
- Payoff: The saving grows with the square of the distance and with the latitude, so short hops are almost the same and long ones are not.
- Claims to check: (1) Great-circle distance via the spherical law of cosines (arithmetic). (2) The figures above (g.mjs). (3) A route along a parallel is a rhumb line of bearing 90 degrees (Snyder ch. 7). (4) Sphere, R = 6,371.0088 km. Real flights are limited by winds, airspace and fuel stops; the lesson makes no flight claims.

### 53. two-distances-two-places · concept: trilateration · core · demand 2 [exploration]
- Learner knows: that a phone can find its position from satellites / does not know why one or two distances are not enough.
- Misconception: Two known distances from two known points pin you to one place.
- Prediction: "A signal says you are 1,000 km from Paris and 800 km from Rome. How many places fit?" options: A) Exactly one / B) Two / C) A whole line of them (answer: B). Check: the two small circles meet at (16.01 E, 48.66 N), in Austria, and (3.35 E, 39.89 N), in the sea off Mallorca; distances 1,000/800 km from each (j.mjs section 53). A third distance of 810 km from Madrid is satisfied by the sea point only (Madrid to it is 809.8 km, to Austria 2,280 km).
- Interaction: A WorldMap in Equal Earth with `geoCircle` rings drawn around Paris and Rome whose radii the learner sets, and a third ring from Madrid on a toggle; intersections are marked. One map.
- Key state: The two rings meet in two marked points and the third ring has been added to eliminate one.
- Payoff: Each distance is a circle on the globe; two circles cross twice, and a third distance picks one crossing, which is how position fixing works.
- Claims to check: (1) Small-circle intersection formula (any spherical trigonometry text; j.mjs implements it). (2) The two intersection points and their country/sea attribution from the 1:110m data (Austria at 16.0 E 48.7 N is inland; the sea point at 3.35 E 39.89 N lies in the Mediterranean off Mallorca; the lesson says "off the Balearic Islands" and may skip names). (3) City coordinates. (4) Real GPS works in 3D with four satellites and a clock error; the lesson says "the same idea". No claim on accuracy.

### 54. iss-never-over-moscow · concept: orbit-ground-track · stretch · demand 1 [exploration]
- Learner knows: that the ISS orbits the Earth every 90 minutes / does not know that it only covers a band of latitudes.
- Misconception: Over days, the ISS passes over every city on Earth.
- Prediction: "The ISS orbit is tilted 51.6 degrees to the equator. Which of these cities can it never pass directly over?" options: A) Rome / B) London / C) Moscow (answer: C). Check: the ground track never goes beyond the orbit's inclination, 51.64 degrees; London (51.51 N) is 15 km inside the limit, Berlin (52.52 N) is 98 km beyond it, Moscow (55.76 N) is 458 km beyond and Rome (41.90 N) is well inside (g.mjs section 54).
- Interaction: A WorldMap in Equirectangular with the ISS's ground track drawn as a sine wave (`inclination` slider from 0 to 90 degrees) and city markers; the learner raises the inclination until Moscow is crossed. One map, one slider.
- Key state: The slider is at 51.64 degrees, and the track's turning latitude is visibly south of Moscow but north of London.
- Payoff: A satellite's ground track reaches latitudes up to its inclination and no further; at 51.6 degrees, it reaches London and misses Moscow.
- Claims to check: (1) ISS inclination 51.64 degrees (NASA, "International Space Station orbit"). (2) Maximum ground-track latitude equals the inclination on a spherical Earth; with oblateness it differs by about 0.2 degrees (state "about"). (3) City latitudes (gazetteer). (4) Rome, London are reachable in principle; actual overhead passes depend on orbit phase and are not guaranteed on a given day. (5) Berlin is a close call at 98 km, so it is not offered as an option.

### 55. farthest-place-from-you · concept: max-distance · intro · demand 2 [exploration]
- Learner knows: that the Earth's circumference is about 40,000 km / does not know the largest possible distance between two places.
- Misconception: Two places on Earth can be as far apart as the Earth's circumference, 40,000 km.
- Prediction: "What is the greatest distance between any two places on Earth, travelling the shortest way?" options: A) About 10,000 km / B) About 20,000 km / C) About 40,000 km (answer: B). Check: half the circumference is pi R = 20,015.1 km, reached only between antipodes; Madrid to Wellington (near its antipode) is 19,855 km (g.mjs section 55).
- Interaction: An azimuthal equidistant WorldMap centred on a draggable pin with distance rings every 5,000 km; the outermost ring collapses to a point (the antipode). One map, one pin.
- Key state: The pin has been moved and the learner has seen the 20,000 km ring shrink to one point opposite it.
- Payoff: Every point on Earth is within 20,000 km of every other, and the farthest point is a single place, the antipode.
- Claims to check: (1) pi R = 20,015.1 km on the mean sphere; on WGS84 the maximum surface distance is about 20,004 km (geodesic between near-antipodal points, within 0.1%). (2) Madrid 40.42 N 3.70 W and Wellington 41.29 S 174.78 E from a gazetteer; 19,855 km (g.mjs). (3) Azimuthal equidistant from a point shows all great-circle distances from that point exactly (Snyder ch. 25) and none between other pairs. (4) See #11 (antipodes) for the antipode idea; this brief is about the distance bound.

## Round 2 count check

33 new briefs (#23–#55), 55 in all. [exploration] in round 2: 27, 29, 32, 34, 40, 53, 54, 55 (eight of 33, 24%); with round 1 that is 13 of 55 (24%). Geo kit with real data: 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55 (twenty-nine; #38's Hawaiian points and #54's track are marker overlays on the 1:110m map). Toy or non-map: 28, 29, 43, 45 (four, all labelled). Every brief carries a Key state.

## Kit and data requests (concepts without a brief)

These curriculum concepts stay unbriefed because the geo kit has no data for them. Each is a request to the kit owner, not a builder task.
- `climate-zones` (and any Koppen-style claim): needs a gridded mean-temperature and precipitation dataset (for example WorldClim or CRU, public licence) at 1 degree resolution, shipped as a small JSON grid. A toy built on latitude alone would restate the misconception the concept exists to break.
- `ocean-gyres`: needs surface-current vectors (for example OSCAR or a 5 degree climatology) as a small JSON grid, plus an ocean-basin outline (Natural Earth 110m ocean).
- `river-watersheds`: needs river lines and basin polygons (Natural Earth 110m rivers_lake_centerlines, or HydroSHEDS level 2).
- Wanted but optional: plate-boundary lines (Natural Earth does not carry them; USGS or Bird 2003) would unlock a second plate lesson, and a populated-places list (Natural Earth 110m populated places) would let city markers be kit data instead of gazetteer entries in meta.json.
