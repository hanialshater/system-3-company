// Rebuild the committed maps from the addressed coordinates and pinned Natural Earth land.
// Usage: node tools/generate-history-maps.mjs /path/to/ne_50m_land.geojson
// With no argument, downloads the source and rejects it if its SHA256 has changed.
import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import { geoMercator, geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";

const catalog = JSON.parse(await fs.readFile("content/history-locators.json", "utf8"));
const source = catalog.sources["natural-earth-land"];
const bytes = process.argv[2]
  ? await fs.readFile(process.argv[2])
  : Buffer.from(await (await fetch(source.url)).arrayBuffer());
if (createHash("sha256").update(bytes).digest("hex") !== source.sha256) {
  throw new Error("Land source SHA256 mismatch; inspect the source before updating the pin.");
}
const land = JSON.parse(bytes.toString());
const insetTopo = JSON.parse(await fs.readFile("src/kit/geo/land-110m.json", "utf8"));
const insetLand = feature(insetTopo, insetTopo.objects.land);
const W = 360, H = 164;
const inset = geoNaturalEarth1().fitExtent([[272, 8], [350, 47]], insetLand);
// Generalize after projection to preserve islands while avoiding thousands of
// subpixel coastline vertices in a phone-sized, static image.
function outline(projection, geometry, tolerance = 0.5) {
  let points = [], result = "";
  const finish = (closed = false) => {
    if (points.length > 1) {
      const selected = [points[0]];
      for (let i = 1; i < points.length; i++) {
        const last = selected.at(-1), p = points[i];
        if (i === points.length - 1 || (p[0] - last[0]) ** 2 + (p[1] - last[1]) ** 2 > tolerance ** 2) selected.push(p);
      }
      result += selected.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("") + (closed ? "Z" : "");
    }
    points = [];
  };
  geoPath(projection).context({
    moveTo(x, y) { finish(); points.push([x, y]); },
    lineTo(x, y) { points.push([x, y]); },
    closePath() { finish(true); },
  })(geometry);
  finish();
  return result;
}
const insetPath = outline(inset, insetLand, 0.8);
const escape = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const overlap = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));

// Choose two non-overlapping, bounded labels; keep labels clear of both city markers.
function labelPositions(points, names) {
  const choices = points.map(([x, y], i) => {
    const w = names[i].length * 8.2 + 14;
    return [[x + 12, y - 12], [x - w - 12, y - 12], [x - w / 2, y - 30], [x - w / 2, y + 12]]
      .map(([left, top], rank) => ({ x: Math.max(7, Math.min(W - w - 7, left)), y: Math.max(8, Math.min(H - 29, top)), w, h: 23, rank }));
  });
  let best, cost = Infinity;
  for (const a of choices[0]) for (const b of choices[1]) {
    const boxes = [a, b];
    const next = overlap(a, b) * 100 + boxes.reduce((n, box, i) => n + box.rank +
      overlap(box, { x: 266, y: 3, w: 89, h: 49 }) * 10 +
      points.reduce((m, [x, y]) => m + overlap(box, { x: x - 8, y: y - 8, w: 16, h: 16 }) * 20, 0), 0);
    if (next < cost) { cost = next; best = boxes; }
  }
  if (overlap(best[0], best[1]) > 0) throw new Error(`Overlapping labels: ${names.join(", ")}`);
  return best;
}

await fs.mkdir("public/history-maps", { recursive: true });
for (const [slug, keys] of Object.entries(catalog.lessons)) {
  const places = keys.map((key) => catalog.places[key]);
  const coords = places.map((p) => p.coordinates);
  const longitudes = coords.map((p) => p[0]), latitudes = coords.map((p) => p[1]);
  const cx = (Math.min(...longitudes) + Math.max(...longitudes)) / 2;
  const cy = (Math.min(...latitudes) + Math.max(...latitudes)) / 2;
  const dx = Math.max(12, (Math.max(...longitudes) - Math.min(...longitudes)) * 1.7);
  const dy = Math.max(8, (Math.max(...latitudes) - Math.min(...latitudes)) * 1.7);
  const extent = { type: "MultiPoint", coordinates: [[cx - dx / 2, cy - dy / 2], [cx + dx / 2, cy + dy / 2]] };
  const projection = geoMercator().rotate([-cx, 0]).center([0, cy]).fitExtent([[25, 18], [W - 25, H - 12]], extent).clipExtent([[0, 0], [W, H]]);
  const path = geoPath(projection).digits(1);
  const points = coords.map((p) => projection(p));
  const names = places.map((p) => p.name);
  const labels = labelPositions(points, names);
  const center = inset([cx, cy]);
  const colors = ["#ffd28a", "#a8d9ff"];
  const markers = places.map((place, i) => {
    const [x, y] = points[i], box = labels[i], color = colors[i];
    if (x < 6 || x > W - 6 || y < 6 || y > H - 6) throw new Error(`Offscreen marker: ${slug}`);
    const nx = Math.max(box.x, Math.min(box.x + box.w, x));
    const ny = Math.max(box.y, Math.min(box.y + box.h, y));
    return `<g data-place="${escape(keys[i])}" data-lon="${place.coordinates[0]}" data-lat="${place.coordinates[1]}">
<path d="M${x.toFixed(1)},${y.toFixed(1)}L${nx.toFixed(1)},${ny.toFixed(1)}" stroke="${color}" stroke-width="1"/>
<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${color}" stroke="#10242b" stroke-width="2"/>
<rect data-label="${escape(keys[i])}" x="${box.x.toFixed(1)}" y="${box.y.toFixed(1)}" width="${box.w.toFixed(1)}" height="23" rx="5" fill="#10242b" fill-opacity=".96"/>
<text x="${(box.x + 7).toFixed(1)}" y="${(box.y + 16).toFixed(1)}" fill="${color}" font-family="system-ui,sans-serif" font-size="14" font-weight="600">${escape(place.name)}</text></g>`;
  }).join("\n");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="title desc">
<title id="title">${escape(names.join(" and "))} — location guide</title>
<desc id="desc">Approximate modern reference points and simplified modern coastlines. No historical borders, territorial extents or travel routes. North is up. Natural Earth; coordinate provenance in content/history-locators.json.</desc>
<rect width="360" height="164" rx="8" fill="#152c36"/>
<path d="${outline(projection, land)}" fill="#374a45" stroke="#8ca79b" stroke-width=".7"/>
<path d="${path(geoGraticule().step([5, 5])())}" fill="none" stroke="#bbd4dc" stroke-opacity=".16" stroke-width=".5"/>
<g fill="#c8d9df" font-family="system-ui,sans-serif" font-size="10"><text x="12" y="17">N</text><path d="M15 34V22M12 26L15 22L18 26" fill="none" stroke="#c8d9df" stroke-width="1.3"/></g>
<rect x="266" y="3" width="89" height="49" rx="5" fill="#10242b" stroke="#8ca79b" stroke-opacity=".4"/>
<path d="${insetPath}" fill="#72877e"/>
<circle cx="${center[0].toFixed(1)}" cy="${center[1].toFixed(1)}" r="2.5" fill="#ffd28a"/>
${markers}
</svg>\n`;
  await fs.writeFile(`public/history-maps/${slug}.svg`, svg);
}
console.log(`Generated ${Object.keys(catalog.lessons).length} coastlines-only history maps.`);
