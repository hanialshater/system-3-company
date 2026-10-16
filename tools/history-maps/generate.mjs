// Rebuild the 100 draft map cases from an explicitly supplied, pinned checkout.
// Usage: node tools/history-maps/generate.mjs /path/to/historical-basemaps [--write]
// Without --write this checks every generated map against source geometry.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { geoContains, geoDistance, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { cases } from "./cases.mjs";
import { normaliseGeometry } from "./geometry.mjs";

const root = process.cwd();
const source = path.resolve(process.argv[2] || "artifacts/historical-basemaps");
const write = process.argv.includes("--write");
const commit = "da7a4b735ecef70aebdc9c73e409d8a2500d50f3";
const base = `https://github.com/aourednik/historical-basemaps/blob/${commit}`;
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
if (execFileSync("git", ["-C", source, "rev-parse", "HEAD"], { encoding: "utf8" }).trim() !== commit) throw new Error("Source checkout must be at the pinned commit");
const manifestPath = "tools/history-maps/sources.json";
const previous = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath)) : null;
const manifest = { repository: "https://github.com/aourednik/historical-basemaps", commit, licence: "GPL-3.0 (upstream LICENSE, included with derived data)", projection: "Mercator; not suitable for area comparisons", files: {} };
const worlds = new Map();
for (const year of [...new Set(cases.flatMap((c) => c.years))].sort((a,b) => a-b)) {
  const file = `geojson/world_${year}.geojson`;
  const bytes = fs.readFileSync(path.join(source, file));
  manifest.files[year] = { file, sha256: hash(bytes), url: `${base}/${file}` };
  if (previous && previous.files[year]?.sha256 !== hash(bytes)) throw new Error(`Pin mismatch: ${file}`);
  const world = JSON.parse(bytes);
  worlds.set(year, { ...world, features: world.features.map((f) => ({ ...f, geometry: normaliseGeometry(f.geometry) })) });
}
for (const file of ["README.md", "LICENSE"]) {
  const bytes = fs.readFileSync(path.join(source, file));
  manifest[file] = { sha256: hash(bytes), url: `${base}/${file}` };
  if (previous && previous[file]?.sha256 !== hash(bytes)) throw new Error(`Pin mismatch: ${file}`);
}
const landPath = "src/kit/geo/land-110m.json";
const landBytes = fs.readFileSync(landPath);
manifest.land = { file: landPath, sha256: hash(landBytes), licence: "Natural Earth public domain; world-atlas ISC" };
if (previous && previous.land.sha256 !== manifest.land.sha256) throw new Error("Land pin mismatch");
const topo = JSON.parse(landBytes);
const land = feature(topo, topo.objects.land);
const options = ["Same label in both", "Different labels in both", "The relationship changes", "A dot lacks a label"];
const relation = ([a,b]) => !a.length || !b.length ? "unlabelled" : JSON.stringify(a) === JSON.stringify(b) ? "same" : "different";
const meaning = { same: "same label", different: "different labels", unlabelled: "coverage missing" };
const labelsAt = (year, point) => worlds.get(year).features.filter((f) => f.geometry && f.properties.NAME && geoContains(f, point));
function areaAnchor(p, years) {
  // City centres on the coast can lie outside these coarse polygons. Prefer the
  // nearest covered grid point within 75 km, using both years and no desired
  // answer. Preserve genuine gaps if the search finds no such point. Report the
  // offset rather than pretending that this is the original city coordinate.
  if (years.every((year) => labelsAt(year,p.coordinates).length)) return { ...p, originalCoordinates: p.coordinates, offsetKm: 0 };
  const [lon,lat] = p.coordinates;
  const candidates = [];
  for (const r of [0.08,0.16,0.32,0.5]) for (let i=0; i<16; i++) {
    const angle = i*Math.PI/8;
    const coordinates = [lon+r*Math.cos(angle)/Math.cos(lat*Math.PI/180),lat+r*Math.sin(angle)];
    const distance = geoDistance(p.coordinates,coordinates)*6371.0088;
    candidates.push({ coordinates: coordinates.map((v) => Number(v.toFixed(6))), distance });
  }
  const candidate = candidates.sort((a,b) => a.distance-b.distance).find((q) => q.distance <= 75 && years.every((year) => labelsAt(year,q.coordinates).length));
  return { ...p, originalCoordinates: p.coordinates, coordinates: candidate?.coordinates || p.coordinates, offsetKm: candidate ? Math.round(candidate.distance*10)/10 : 0 };
}
const recalls = [
  { question: "A map gives two places one label. Does that establish that their inhabitants shared one language?", options: ["Yes, labels identify language", "No, a map label does not establish language", "Only when the places are close"], answer: 1, why: "A territorial label describes this map's classification, not the languages of everyone within it." },
  { question: "A label differs between snapshots a century apart. What can these two maps establish about the change?", options: ["The exact year it occurred", "Why it occurred", "Only that the snapshots label it differently"], answer: 2, why: "Two endpoints do not locate an intervening transition or explain its cause." },
  { question: "A place has no named polygon in a reconstruction. What follows?", options: ["The dataset leaves that location unlabelled", "Nobody lived there", "No political organisation existed there"], answer: 0, why: "Missing coverage is a property of the reconstruction. It does not prove an absence of people or institutions." },
  { question: "Two maps retain the same label. Does that prove uninterrupted control between them?", options: ["Yes, the endpoints settle it", "No, intervening changes require other evidence", "Only if their colours also match"], answer: 1, why: "Matching endpoints cannot establish what happened at every intervening moment." },
  { question: "Two territories have different local labels. Could the source group both under one ruling power?", options: ["Yes; label and ruling-power fields can differ", "No; different labels mean independence", "Only if their borders are straight"], answer: 0, why: "The source distinguishes NAME from SUBJECTO. This exercise compares NAME only; it does not count sovereign states." },
  { question: "A historical border is drawn as a crisp line. What should you check before treating it as exact?", options: ["Whether the fill colour is dark", "Whether it points north", "The source's precision and limitations"], answer: 2, why: "Rendering a precise-looking line cannot make an approximate reconstruction exact." },
  { question: "Two reconstructed areas overlap at one point. How should an explorer report that?", options: ["Keep both labels and expose the overlap", "Silently choose the first polygon", "Delete both regions"], answer: 0, why: "Keeping all matching labels preserves the source's ambiguity. A draw order is not a historical verdict." },
  { question: "A region looks larger on this Mercator crop. Is that enough to compare its land area?", options: ["Yes, compare the pixels", "No; use an equal-area method or spherical calculation", "Yes, if both colours are bright"], answer: 1, why: "Mercator distorts area. This map exercise compares labels at points, not the sizes of territories." },
  { question: "A historical reconstruction assigns a region a label. Does that settle a present-day territorial claim?", options: ["Yes, older labels take precedence", "Yes, when two snapshots agree", "No; this reconstruction does not decide present-day claims"], answer: 2, why: "A dataset's historical classification does not adjudicate present-day sovereignty or rights." },
  { question: "The same coordinate receives a different label in a later map. What must have moved?", options: ["The people at that coordinate", "Nothing necessarily; the map classification changed", "The coordinate itself"], answer: 1, why: "A fixed coordinate can be classified differently without establishing migration or physical movement." },
];

let checked = 0;
const summary = [];
for (const [index, c] of cases.entries()) {
  c.points = c.points.map((p) => areaAnchor(p,c.years));
  const [a,b] = c.points.map((p) => p.coordinates);
  const mid = [(a[0]+b[0])/2,(a[1]+b[1])/2];
  const dx = Math.max(4, Math.abs(a[0]-b[0])*1.65);
  const dy = Math.max(3, Math.abs(a[1]-b[1])*1.65);
  const extent = [[mid[0]-dx/2,mid[1]-dy/2],[mid[0]+dx/2,mid[1]+dy/2]];
  const projection = geoMercator().center(mid).translate([180,96]).scale(1);
  const [p0,p1] = extent.map((p) => projection(p));
  projection.scale(Math.min(336/Math.abs(p1[0]-p0[0]),164/Math.abs(p1[1]-p0[1]))).clipExtent([[3,3],[357,189]]);
  const draw = geoPath(projection).digits(1);
  const frames = c.years.map((year) => {
    const all = worlds.get(year).features;
    const matches = c.points.map((p) => all.flatMap((f, i) => f.geometry && f.properties.NAME && geoContains(f, p.coordinates) ? [i] : []));
    const labels = matches.map((ids) => [...new Set(ids.map((i) => String(all[i].properties.NAME)))].sort());
    const shortLabels = matches.map((ids) => [...new Set(ids.map((i) => String(all[i].properties.ABBREVN || all[i].properties.NAME)))].sort());
    const shapes = all.flatMap((f, i) => {
      if (!f.geometry || !f.properties.NAME) return [];
      const d = draw(f);
      if (!d) return [];
      const inA = labels[0].includes(String(f.properties.NAME));
      const inB = labels[1].includes(String(f.properties.NAME));
      return [{ d, label: String(f.properties.NAME), featureIndex: i, focus: inA ? (inB ? "both" : "a") : inB ? "b" : "other" }];
    });
    return { year, source: manifest.files[year], labels, shortLabels, matches, relation: relation(labels), shapes };
  });
  const relations = frames.map((f) => f.relation);
  const answer = relations.includes("unlabelled") ? 3 : relations[0] !== relations[1] ? 2 : relations[0] === "same" ? 0 : 1;
  // Rotate complete option arrays, including their answer, so visual position is not a cue.
  const rotation = index % options.length;
  const rotated = [...options.slice(rotation), ...options.slice(0, rotation)];
  const title = `${c.points[0].name} / ${c.points[1].name}`;
  if (title.length > 40) throw new Error(`Title too long: ${title}`);
  const hook = `${c.years[0]} → ${c.years[1]}. Two fixed dots; compare the reconstruction's labels.`;
  const reveal = `Your trace shows ${c.years[0]}: ${meaning[relations[0]]}; ${c.years[1]}: ${meaning[relations[1]]}. The dots stay fixed while you switch the map. These approximate snapshots do not date a transition, establish continuous control, explain causes, or settle present-day claims. An unlabelled dot means missing coverage in this reconstruction, not empty land.`;
  const recall = recalls[index % recalls.length];
  const question = frames.some((f) => f.labels.some((labels) => labels.length > 1))
    ? "Are the dots' complete label lists identical in both snapshots?"
    : "Do the dots share a map label in both snapshots?";
  const spec = { slug: c.slug, title, region: c.region, points: c.points.map((p) => ({ ...p, xy: projection(p.coordinates).map((v) => Math.round(v*10)/10) })), years: c.years, extent, coast: draw(land) || "", frames, options: rotated, answer: (answer-rotation+options.length)%options.length, question, reveal, sourceCommit: commit };
  const dir = `src/demos/history/${c.slug}`;
  const sourceString = frames.map((f) => `${f.source.url} (SHA-256 ${f.source.sha256}); GeoJSON features ${JSON.stringify(f.matches)}`).join("; ");
  const claims = [
    ["positions", `${c.points.map((p) => `${p.name} area anchor: ${p.coordinates.join(", ")} (${p.offsetKm} km from the nominal location)`).join("; ")}. Modern place names orient the fixed comparison points, not historical settlement names or exact city centres.`, "convention", "tools/history-maps/cases.mjs: nominal WGS84 longitude/latitude points; generate.mjs areaAnchor prefers the nearest point covered by both snapshots within 75 km, without selecting for an answer. map.json records nominal and actual coordinates and the offset. A place name is not an ancient-settlement claim."],
    ["maps", `The ${c.years.join(" and ")} stages are clipped Mercator paths from these GeoJSON snapshots, with all matched NAME labels retained: ${JSON.stringify(frames.map((f) => f.labels))}. Map key and SVG titles use these labels; NAME is not SUBJECTO.`, "source", `Ring directions normalised for d3 spherical exteriors/holes; coordinates and feature order retained. ${sourceString}`],
    ["comparison", `At the two points, ${c.years[0]} has ${meaning[relations[0]]} and ${c.years[1]} has ${meaning[relations[1]]}. This supports the prediction answer and first reveal sentence.`, "derivation", `tools/history-maps/generate.mjs: geoContains on every feature; sorted unique NAME sets, exact set equality; missing sets stay unlabelled. ${sourceString}`],
    ["limits", "The maps are approximate reconstructions. Two snapshots do not date a transition, establish continuity, explain causes, or settle present-day claims; an unlabelled dot does not prove empty land.", "source", `${base}/README.md, sections Conceptual limitations and disputed territories / Polygons; two-endpoint inference limit. Stage caption, reveal, hook 'reconstruction', and prediction wording are covered here. Cultural and research reviews remain required.`],
    ["recall", `${recall.question} Answer: ${recall.options[recall.answer]} ${recall.why}`, "derivation", `${base}/README.md (source limitations); tools/history-maps/generate.mjs recalls[${index%recalls.length}]. Interpret the dataset fields and projection, not historical causes.`],
  ].map(([id,text,support,source]) => ({ id: `history.${c.slug}.${id}`, text, support, source, status: "unverified" }));
  const meta = { slug: c.slug, title, hook, domain: "history", concept: "border-precision-over-time", status: "draft", durationSec: 60, owner: { categoryManager: "cm-history", builder: "codex-history-maps" }, learner: { knows: ["two points can be located on a map"], doesNotKnow: [`how this reconstruction classifies ${title} in ${c.years.join(" and ")}, and what that comparison cannot establish`] }, misconception: "A historical map's region labels directly establish exact borders, continuous control and the history of everyone inside.", objective: `Compare the source's labels at two fixed points in ${c.years.join(" and ")}; distinguish the observed map pattern from claims about its cause or legitimacy.`, claims, confidence: "", recall, evidence: { qa: [], simulatedLearner: [], pairwise: [], humanLearners: [] }, version: 1, curriculum: { primary: "history:border-precision-over-time", also: ["history:border-precision"], prerequisites: ["geography:latitude-longitude"], level: "intro", strand: "maps-borders", references: [], tags: ["history maps", c.region.replaceAll("_"," "), "source comparison", "approximate borders"] }, format: "map-explorer", interactions: ["choice-before-reveal", "preset-buttons", "milestone-gate"], reviewRoute: "sensitive", careLine: "Source NAME labels are classifications, not statements of legitimate sovereignty, ethnicity, religion, language or absence of people. Modern place names are orientation aids only. Retain missing coverage and overlapping labels.", reviewRequirements: ["cm-history approval of the 100-case practice-set scope", "research-lead provenance review", "cultural-reviewer stage-A brief and stage-B walkthrough", "independent fact-check", "independent learner review", "History domain launch review"], productionSet: "history-maps-100", internalNotes: "Fact-checker to confirm every claim independently; builder checks are not verification. Company handoff: company/reviews/history-maps-100/build.md. Prototype only: no launch verdict or cultural approval is claimed." };
  const demo = `"use client";\n\nimport { Lesson } from "@/kit/Lesson";\nimport { Control } from "@/kit/controls";\nimport { Milestones } from "@/kit/milestones";\nimport { HistoryMapStage, useHistoryMapState } from "@/lib/history-maps/HistoryMapStage";\nimport type { HistoryMapSpec } from "@/lib/history-maps/types";\nimport data from "./map.json";\nconst spec = data as HistoryMapSpec;\nconst names = ["earlier", "later", "overlay"] as const;\n\nexport default function Demo({ slug }: { slug: string }) {\n  const state = useHistoryMapState();\n  return <Lesson slug={slug} predict={{ question: spec.question, options: spec.options, answer: spec.answer }}\n    exploreHint="Visit both years, then overlay. Read the trace; compare the labels at A and B." minInteractions={3}\n    reveal={() => <p>{spec.reveal}</p>}>\n    {({ locked, interact }) => <Milestones interact={interact} names={names}>\n      {(reach) => <HistoryMapStage spec={spec} mode={state.mode} seen={state.seen} locked={locked}>\n        <div className="row">{names.map((name, i) => <Control key={name} disabled={locked || state.mode === i}\n          aria-pressed={state.mode === i} className={state.mode === i ? "active" : ""}\n          onClick={() => { state.choose(i); reach(name); }}>{i < 2 ? spec.years[i] : "Overlay"}</Control>)}</div>\n      </HistoryMapStage>}\n    </Milestones>}\n  </Lesson>;\n}\n`;
  const files = { [`${dir}/map.json`]: JSON.stringify(spec)+"\n", [`${dir}/meta.json`]: JSON.stringify(meta,null,2)+"\n", [`${dir}/Demo.tsx`]: demo };
  for (const [file, data] of Object.entries(files)) {
    if (write) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file,data); }
    else if (!fs.existsSync(file) || fs.readFileSync(file,"utf8") !== data) throw new Error(`Generated file differs: ${file}`);
    checked++;
  }
  if (write) {
    const report = `company/reviews/${c.slug}/build.md`;
    fs.mkdirSync(path.dirname(report),{ recursive: true });
    fs.writeFileSync(report, `# ${title} — draft v1\n\nBuilder: codex-history-maps. Prototype, not a cultural or learner review.\n\n## Pre-flight v1\n\n1. Title/hook: "${title}" / "${hook}". Neither states the relationship.\n2. Options: ${rotated.join("; ")}. Answer index ${spec.answer}; same precision across the four outcome classes.\n3. Locked: Natural Earth physical coast and fixed dots only; no historical fill, label or relationship.\n4. Reveal values: ${c.years[0]}=${relations[0]} and ${c.years[1]}=${relations[1]}; source feature addresses in meta maps/comparison claims. Trace is earned and remains visible.\n5. QA path: ${c.years.join(" → ")} → Overlay reaches earlier/later/overlay (three milestones). Repeating an active mode is disabled.\n6. Reset: no stage reset. Returning to either snapshot retains both trace rows. Reload is a fresh lesson and clears milestones.\n7. Phone fit: see the batch's recorded browser findings in company/reviews/history-maps-100/build.md; no independent QA or learning verdict claimed here. Reveal: ${reveal.split(/\s+/).length} words.\n\nPublish needs culture-en on the walkthrough (stage B), independent fact-check, learner review, and History domain launch. Stage-A sensitive review is outstanding; keep this prototype on its draft PR, not the launch queue.\n\nReveal: ${reveal}\n`);
  }
  summary.push({ slug: c.slug, title, region: c.region, years: c.years, relations, answer: spec.answer, shapes: frames.map((f) => f.shapes.length) });
}
if (cases.length !== 100 || new Set(cases.map((c) => c.slug)).size !== 100) throw new Error("Expected 100 distinct cases");
const writeOrCheck = (file, data) => { if (write) fs.writeFileSync(file,data); else if (fs.readFileSync(file,"utf8") !== data) throw new Error(`Differs: ${file}`); };
writeOrCheck(manifestPath, JSON.stringify(manifest,null,2)+"\n");
writeOrCheck("tools/history-maps/catalog.json", JSON.stringify(summary,null,2)+"\n");
if (write) fs.copyFileSync(path.join(source,"LICENSE"), "src/lib/history-maps/DATA-LICENSE.txt");
console.log(`${write ? "Wrote" : "Verified"} ${cases.length} cases / ${checked} files from ${Object.keys(manifest.files).length} pinned snapshots; answer positions ${JSON.stringify(summary.reduce((a,c) => { a[c.answer]=(a[c.answer]||0)+1; return a; },{}))}`);
