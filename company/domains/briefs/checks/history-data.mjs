#!/usr/bin/env node
// History data: the openable source files behind every number in the History briefs
// (company/domains/briefs/history.md; charter company/domains/history.md, "How claims are sourced").
//
//   node company/domains/briefs/checks/history-data.mjs          fetch any missing file into artifacts/history-data/ and verify every pin
//   node company/domains/briefs/checks/history-data.mjs --list   print the manifest (id, what, where, pin)
//
// Rules:
// - Files are fetched, not committed: they are third-party data with their own licences (named below), and
//   artifacts/ is gitignored. Anyone can re-fetch them from this host: raw.githubusercontent.com and the npm
//   registry are reachable (checked 2026-10-14); ourworldindata.org, rug.nl and most web hosts are not.
// - Every file is pinned by SHA-256 as fetched on 2026-10-14. If a source changes upstream, the pin fails and the
//   check script refuses to run. Re-pin only after re-running the check and updating any brief whose numbers moved.
// - Natural Earth comes from world-atlas 2.0.2 in node_modules (no fetch).
// Written by chief-of-staff-ceo-office (Leonie), 2026-10-14, for cm-history to own.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

export const ROOT = new URL("../../../../", import.meta.url).pathname;
export const CACHE = path.join(ROOT, "artifacts/history-data");
const RD = "https://raw.githubusercontent.com/vincentarelbundock/Rdatasets/master";

// what: the dataset; doc: where its provenance is described (open it before citing); licence: as stated by the host.
export const SOURCES = {
  halley: { file: "HalleyLifeTable.csv", url: `${RD}/csv/HistData/HalleyLifeTable.csv`, doc: `${RD}/doc/HistData/HalleyLifeTable.html`, sha256: "78af6f00092f7244c002c952f2c2c706f4b5be1109e4537a838eed51633d231d", what: "Halley's 1693 Breslau life table (survivors by age from 1,000 at age 1; 1,238 births a year), via the R package HistData; data from Bacaër (2011) Table 1", licence: "HistData (GPL-2); the 1693 table is public domain" },
  breslau: { file: "Breslau.csv", url: `${RD}/csv/HistData/Breslau.csv`, doc: `${RD}/doc/HistData/Breslau.html`, sha256: "894de9fede215c66a93ce71af801c0fe4fe2f736644cde47587791cdaf6aca8d", what: "Deaths by age at death, Breslau 1687-1691 (Neumann's records as reconstructed by Graetzer; supplied by Bellhouse 2011)", licence: "HistData (GPL-2)" },
  langren: { file: "Langren1644.csv", url: `${RD}/csv/HistData/Langren1644.csv`, doc: `${RD}/doc/HistData/Langren1644.html`, sha256: "644b1008a62a8971feb7d2c2270654af123d16a6c4d7bf2aad024a9c9daf4851", what: "van Langren's 1644 graph: 12 determinations of the longitude difference Toledo-Rome, digitised by Friendly et al. (2010); the doc gives Toledo (39.86, -4.03) and Rome (41.89, 12.5)", licence: "HistData (GPL-2)" },
  oldmaps: { file: "OldMaps.csv", url: `${RD}/csv/HistData/OldMaps.csv`, doc: `${RD}/doc/HistData/OldMaps.html`, sha256: "f77604a9afca7f822c74e57c83ea6a22c633723294151fba4bd9cb7b7e1f12f9", what: "Latitude and longitude of 39 Great Lakes points read from 11 maps (1688-1818) and the actual positions (Andrews & Herzberg 1985, Table 10.1); some signs are typeset errors, so absolute values are used", licence: "HistData (GPL-2)" },
  minard: { file: "Minard.troops.csv", url: `${RD}/csv/HistData/Minard.troops.csv`, doc: `${RD}/doc/HistData/Minard.troops.html`, sha256: "a536e667ebcea58f2e1bae3adfd5f7f6a496cab71367ec4e9468d3a0c7941a68", what: "Minard's 1869 figures for the 1812 Russian campaign: survivors along the route, advance and retreat, three groups (from Wilkinson's Grammar of Graphics file). NB the doc says '1815'; the campaign was 1812", licence: "HistData (GPL-2); Minard's map is public domain" },
  minardtemp: { file: "Minard.temp.csv", url: `${RD}/csv/HistData/Minard.temp.csv`, doc: `${RD}/doc/HistData/Minard.troops.html`, sha256: "81a59a4210085392e2d43f386212885f27eaaabf3afe7b35c7f4b0bab8b1fc5f", what: "Minard's temperatures on the retreat from Moscow, by longitude and date (Oct 18 to Dec 7; the doc gives no unit, Minard's map used degrees Reaumur, to confirm)", licence: "HistData (GPL-2)" },
  nightingale: { file: "Nightingale.csv", url: `${RD}/csv/HistData/Nightingale.csv`, doc: `${RD}/doc/HistData/Nightingale.html`, sha256: "8cd1d20268a4cb1f4315d5500e0d2ec735ce6ef86b539b9401a88cb0c6a5e4c9", what: "Monthly deaths by cause (zymotic disease, wounds, other) and army strength, British army in the East, Apr 1854 - Mar 1856 (Nightingale 1858; via Pearson & Short 2007)", licence: "HistData (GPL-2); Nightingale's tables are public domain" },
  arbuthnot: { file: "Arbuthnot.csv", url: `${RD}/csv/HistData/Arbuthnot.csv`, doc: `${RD}/doc/HistData/Arbuthnot.html`, sha256: "d81babe614f7021ac7858c90d3978fcc7db68abbcf3e40d485f7cfdaa992975e", what: "London christenings by sex 1629-1710 (Arbuthnot 1710) with plague deaths and total mortality per year. Provenance (corrected W-872, cm-history, 2026-10-15, after FC39): the doc says these two columns were 'obtained by Campbell and from Creighton (1965)' and lists Campbell, R. B. (2001), Arbuthnot and the Human Sex Ratio, Human Biology 73(4): 605-610, and Creighton, C., A History of Epidemics in Britain, 2nd edition (1965 printing, vols 1-2). 1965 is the edition's date, not when the figures were compiled. The doc does not say the columns are the Bills of Mortality's own yearly totals; Campbell, Creighton and a printed Bill were not opened", licence: "HistData (GPL-2)" },
  wheat: { file: "Wheat.csv", url: `${RD}/csv/HistData/Wheat.csv`, doc: `${RD}/doc/HistData/Wheat.html`, sha256: "ea4fcf1437d5a4b2de4e804ba6a2021fb6bb5991a8b443c5e2e567538a84da5f", what: "Playfair (1821): price of wheat (shillings per quarter) and weekly wages of 'a good mechanic' (shillings), every 5 years 1565-1821; wages stop at 1810", licence: "HistData (GPL-2); Playfair 1821 is public domain" },
  cholera: { file: "Cholera.csv", url: `${RD}/csv/HistData/Cholera.csv`, doc: `${RD}/doc/HistData/Cholera.html`, sha256: "6d71f8c112cdf2a668cf35f4e6c4ba69604d30b3ac93ccd8b472423fbeda27bd", what: "Farr's 1849 London districts: cholera deaths per 10,000, elevation, water supplier (Bingham et al. 2004, Table 2). Curriculum only, no brief yet", licence: "HistData (GPL-2)" },
  vega: { file: "vega-datasets-3.2.1.tgz", url: "https://registry.npmjs.org/vega-datasets/-/vega-datasets-3.2.1.tgz", doc: "package/datapackage.json inside the tarball (resource descriptions and sources)", sha256: "6f72fda460a9863fae5fcb32f85bcd49e1761fdea6dc6cf9f4962472881cc5a3", integrity: "sha512-lTSwZA6yq6qSU2YZm+6bqILiIvTPPxn4itir7jPGFmHIdPvUfQ9pCzzcrklYywMJgLUbaIeSkZQdiJd6wBxPug==", what: "npm vega-datasets 3.2.1: jobs.json (US census occupations by sex, 1850-2000, IPUMS USA v6.0), disasters.csv (EM-DAT deaths by year and type, 1900-2017, processed by Our World in Data), crimea.json (Nightingale's Table II, a second copy)", licence: "package BSD-3-Clause; data per resource (IPUMS terms, EM-DAT terms and CC BY 4.0, public domain)", extract: true },
  maddison: { file: "maddison2020.csv", url: "https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Maddison%20Project%20Database%202020%20(Bolt%20and%20van%20Zanden%20(2020))/Maddison%20Project%20Database%202020%20(Bolt%20and%20van%20Zanden%20(2020)).csv", doc: "https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Maddison%20Project%20Database%202020%20(Bolt%20and%20van%20Zanden%20(2020))/README.md", sha256: "23a67c11f70112730d74e716841350540184b1682fcffc2860bf3ea76dff92fd", what: "Maddison Project Database 2020 (Bolt & van Zanden 2020), GDP per capita and population by country, OWID's copy. The UK series is England 1252-1700 and Britain 1700-1870 (Broadberry et al. 2015), per the README. Units are not stated in the copy we opened: use ratios only", licence: "Maddison Project (CC BY 4.0, per the project; to confirm)" },
  co2: { file: "owid-co2-data.csv", url: "https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv", doc: "https://raw.githubusercontent.com/owid/co2-data/master/README.md", sha256: "7f78e2b218ce4bb8c538bbec04fdc9a7982e8d40bff972e650df603899edd5f6", what: "Our World in Data CO2 by country and year (column co2: fossil and industry CO2, million tonnes; from the Global Carbon Project). Master branch: expect the pin to fail when OWID updates it", licence: "CC BY 4.0 (Our World in Data)" },
  basemap1279: { file: "world_1279.geojson", url: "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1279.geojson", doc: "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/README.md", sha256: "839f48f61d984dd58f70f312dfe626c3988d4d4822e78d68a123fd0784e852e2", what: "historical-basemaps, world in 1279: polygons with NAME, SUBJECTO (ruling power), BORDERPRECISION (1 = approximate for every polygon in this year). The README says 'work in progress: verify the maps by comparison to other sources'", licence: "GPL-3.0" },
  gmpop: { file: "gapminder-pop-global.csv", url: "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--fasttrack/master/global_regions_datapoints/ddf--datapoints--pop--by--global--time.csv", doc: "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--fasttrack/master/README.md", sha256: "84e8705bedd41cc2bf56e338e2b40784c33f6117a08fcb4a4cac440d2ee58122", what: "Gapminder Fast Track world population by year, 1800-2100 (estimates before 1950; projections after the present)", licence: "CC BY 4.0 (Gapminder)" },
  // Added 2026-10-14 by cm-history (Henrike), W-742, for the cycle-2 briefs (history-cycle2-check.mjs). Each file and its doc were opened from this host first.
  cholera1849: { file: "CholeraDeaths1849.csv", url: `${RD}/csv/HistData/CholeraDeaths1849.csv`, doc: `${RD}/doc/HistData/CholeraDeaths1849.html`, sha256: "b39a2c1053e3004cbfb023c9257b57b1c9605c992e07ca55c7262616eb06c87c", what: "Daily deaths registered from cholera and from diarrhoea in England, every day of 1849 (General Register Office & Farr 1852, Plate 2; transcribed by James Riley, who derived day 11 from row totals because of a fold in the scan)", licence: "HistData (GPL-2); the 1852 report is public domain" },
  bowley: { file: "Bowley.csv", url: `${RD}/csv/HistData/Bowley.csv`, doc: `${RD}/doc/HistData/Bowley.html`, sha256: "8ae779f91d2890611b0bdb74513c4b089377d2ab98c57ff4a187a5cf9b3fa38a", what: "Total value of British and Irish exports, millions of pounds, 1855-1899 (Bowley 1901, Elements of Statistics, pp. 151-154; digitised from Bowley's graph, per the doc)", licence: "HistData (GPL-2)" },
  guerry: { file: "Guerry.csv", url: `${RD}/csv/HistData/Guerry.csv`, doc: `${RD}/doc/HistData/Guerry.html`, sha256: "13f9ff6ad1413d9e75a26374147a5a840a432adc418d5faa1d4e40df763c8433", what: "Guerry (1833) moral statistics of France's 86 departments around 1830: Literacy = percent of military conscripts who can read and write; Crime_pers and Crime_prop = population per crime (Compte general 1825-1830); Region N/S/E/W/C", licence: "HistData (GPL-2)" },
  frdep: { file: "france-departements-simplifiee.geojson", url: "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson", doc: "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/README.md", sha256: "c08a1ad48299763b50ef649f05a911c1021500c94719a1aa22a9d06191e43fc3", what: "Today's 96 metropolitan French departments, simplified (from IGN Admin Express, per the README). Used only as stand-in outlines for Guerry's 1830 departments: 1830 Seine = today's 75, 92, 93, 94; Seine-et-Oise = 78, 91, 95; Haut-Rhin includes 90; Corse = 2A, 2B; 06, 73 and 74 have no 1830 value. Master branch", licence: "Licence ouverte (Etalab), per the README" },
  gmu5: { file: "gapminder-u5mr-global.csv", url: "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--fasttrack/master/global_regions_datapoints/ddf--datapoints--child_mortality_0_5_year_olds_dying_per_1000_born--by--global--time.csv", doc: "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--fasttrack/master/ddf--concepts.csv", sha256: "565faf2c68dad27f899815d853d39f4d4086ebf1598d235c71c637983e568aba", what: "Gapminder Fast Track, world child mortality (deaths before age 5 per 1,000 live births), 1800-2100 (concept u5mr v12; estimates before 1950, projections after the present). Master branch", licence: "CC BY 4.0 (Gapminder)" },
  gmlex: { file: "gapminder-lex-global.csv", url: "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--fasttrack/master/global_regions_datapoints/ddf--datapoints--lex--by--global--time.csv", doc: "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--fasttrack/master/ddf--concepts.csv", sha256: "654ce0ef98f382f82c6dc8ec9b8e6091ad1df09a22068137f63a42054fd4258b", what: "Gapminder Fast Track, world life expectancy at birth, 1800-2100 (concept lex v15; 'if the current mortality rates at different ages were to stay the same'; estimates before 1950, projections after the present). Master branch", licence: "CC BY 4.0 (Gapminder)" },
  necountries: { local: "node_modules/world-atlas/countries-50m.json", sha256: "04342cdc1e3016bcd7db1630de95684d67b79fe3c8c460321e87aef469502394", what: "Natural Earth 1:50m countries via world-atlas 2.0.2 (today's borders)", licence: "public domain (Natural Earth); world-atlas ISC" },
  neland: { local: "node_modules/world-atlas/land-50m.json", sha256: "619477ff690c086885e45cb91707d783805561bd75ae8e437b7d4694b0204e0f", what: "Natural Earth 1:50m land via world-atlas 2.0.2", licence: "public domain (Natural Earth)" },
};

const sha = (p) => crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
export const pathOf = (id) => (SOURCES[id].local ? path.join(ROOT, SOURCES[id].local) : path.join(CACHE, SOURCES[id].file));
export const vegaFile = (name) => path.join(CACHE, "vega-datasets-3.2.1", "package", "data", name);

/** Fetch (if missing) and verify every source. Returns a list of problems; empty means every pin holds. */
export function ensure({ fetch = true, quiet = false } = {}) {
  const problems = [];
  fs.mkdirSync(CACHE, { recursive: true });
  for (const [id, s] of Object.entries(SOURCES)) {
    const p = pathOf(id);
    if (!fs.existsSync(p) && fetch && s.url) {
      if (!quiet) console.log(`fetch ${id}: ${s.url}`);
      try {
        // curl honours the host's HTTPS proxy settings; Node's fetch does not.
        execFileSync("curl", ["-sSfL", "-m", "180", "-o", p, s.url], { stdio: ["ignore", "ignore", "pipe"] });
      } catch (e) {
        problems.push(`${id}: fetch failed (${String(e.stderr ?? e.message).trim()})`);
        continue;
      }
    }
    if (!fs.existsSync(p)) { problems.push(`${id}: missing ${p}`); continue; }
    const got = sha(p);
    if (got !== s.sha256) { problems.push(`${id}: SHA-256 ${got} does not match the pin ${s.sha256} (source changed upstream, or a bad download). Re-check the briefs before re-pinning.`); continue; }
    if (s.extract) {
      const dir = path.join(CACHE, "vega-datasets-3.2.1");
      if (!fs.existsSync(path.join(dir, "package"))) { fs.mkdirSync(dir, { recursive: true }); execFileSync("tar", ["-xzf", p, "-C", dir]); }
    }
  }
  return problems;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.includes("--list")) {
    for (const [id, s] of Object.entries(SOURCES)) console.log(`${id}\n  what: ${s.what}\n  from: ${s.url ?? s.local}\n  doc: ${s.doc ?? "(package)"}\n  sha256: ${s.sha256}\n  licence: ${s.licence}`);
  } else {
    const problems = ensure();
    for (const p of problems) console.log(`FAIL ${p}`);
    console.log(problems.length ? `${problems.length} problem(s)` : `ok: ${Object.keys(SOURCES).length} sources present and matching their pins (${CACHE})`);
    process.exit(problems.length ? 1 : 0);
  }
}
