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
