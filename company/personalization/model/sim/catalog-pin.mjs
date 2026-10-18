#!/usr/bin/env node
// The simulator's pinned lesson catalogue (2026-10-18). owner: learner-model-engineer.
// Decision: company/personalization/2026-10-18-simulator-catalogue-pin.md.
//
// The simulator used to read the live tree (src/demos/{probability,cs}/*/meta.json, content/curriculum/{probability,cs}.json),
// so every new lesson changed the default order, the golden hashes and the HQ lab data. It now reads a committed
// snapshot of exactly those inputs in ./catalog-pin/ (same layout as the repo root), through the UNCHANGED
// loadCatalog(root) of ./catalog.mjs (frozen: hashed in every readout manifest). The snapshot keeps only the
// meta.json fields loadCatalog and the lab read: title, status, concept, curriculum.{primary, prerequisites, level}.
//
//   node company/personalization/model/sim/catalog-pin.mjs --check              snapshot == git at the pinned commit, and hash == PIN.json
//   node company/personalization/model/sim/catalog-pin.mjs --diff=<commit>      what moving the pin to <commit> would change (no writes)
//   node company/personalization/model/sim/catalog-pin.mjs --move=<commit> --reason="…"   rewrite the snapshot from <commit>
//
// Moving the pin is a deliberate act with a decision line (the note above, "Moving the pin"); it changes the golden
// hashes and the HQ lab data, which then need regenerating in the same change.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCatalog, PILOT, ROOT } from "./catalog.mjs";

const here = dirname(fileURLToPath(import.meta.url));
export const PIN_ROOT = join(here, "catalog-pin");
const PIN_FILE = join(PIN_ROOT, "PIN.json");
const sha = (s) => createHash("sha256").update(s).digest("hex");

/** Same formula as the c3b harness's catalogSha (harness3b.mjs), so the pin can be compared with readout 3b's 27b535da…. */
export const catalogueSha = (cat) => sha(JSON.stringify({ lessons: cat.lessons, defaultOrder: cat.defaultOrder, prereqsByConcept: cat.prereqsByConcept, pilotConcepts: [...cat.pilotConcepts].sort() }));

export function readPin() { return JSON.parse(readFileSync(PIN_FILE, "utf8")); }

let CACHE = null;
/** The simulator's catalogue: loadCatalog over the snapshot, refused if the snapshot no longer hashes to PIN.json. */
export function loadPinnedCatalog() {
  if (CACHE) return CACHE;
  const pin = readPin();
  const cat = loadCatalog(PIN_ROOT);
  const h = catalogueSha(cat);
  if (h !== pin.catalogueSha256) throw new Error(`catalog-pin: snapshot hashes to ${h}, PIN.json says ${pin.catalogueSha256}; the snapshot was edited by hand. Restore it or move the pin (catalog-pin.mjs --move).`);
  return (CACHE = cat);
}

// ---------------- snapshot from git ----------------
const git = (...a) => execFileSync("git", a, { cwd: ROOT, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
const trim = (m) => {
  const c = m.curriculum, out = {};
  for (const k of ["title", "status", "concept"]) if (k in m) out[k] = m[k];
  if (c) { out.curriculum = {}; for (const k of ["primary", "prerequisites", "level"]) if (k in c) out.curriculum[k] = c[k]; }
  return out;
};
/** rel path -> file text, for the catalogue inputs at <commit>. */
function snapshotAt(commit) {
  const files = new Map();
  for (const d of PILOT) files.set(`content/curriculum/${d}.json`, git("show", `${commit}:content/curriculum/${d}.json`));
  const metas = git("ls-tree", "-r", "--name-only", commit, "--", ...PILOT.map((d) => `src/demos/${d}`)).split("\n").filter((p) => /^src\/demos\/[^/]+\/[^/]+\/meta\.json$/.test(p));
  for (const p of metas.sort()) files.set(p, JSON.stringify(trim(JSON.parse(git("show", `${commit}:${p}`))), null, 1) + "\n");
  return files;
}
function onDisk() {
  const files = new Map();
  for (const d of PILOT) { const f = join(PIN_ROOT, "content/curriculum", `${d}.json`); if (existsSync(f)) files.set(`content/curriculum/${d}.json`, readFileSync(f, "utf8")); }
  for (const d of PILOT) {
    const dir = join(PIN_ROOT, "src/demos", d);
    if (!existsSync(dir)) continue;
    for (const s of readdirSync(dir).sort()) { const f = join(dir, s, "meta.json"); if (existsSync(f)) files.set(`src/demos/${d}/${s}/meta.json`, readFileSync(f, "utf8")); }
  }
  return files;
}
const diff = (a, b) => [...new Set([...a.keys(), ...b.keys()])].sort().filter((k) => a.get(k) !== b.get(k))
  .map((k) => `${a.has(k) ? (b.has(k) ? "changed" : "removed") : "added"} ${k}`);
function catAt(files) {
  // Build the catalogue a snapshot would give, in a scratch dir, with the unchanged loadCatalog.
  const tmp = join(ROOT, "node_modules", ".cache", `catalog-pin-${process.pid}`);
  rmSync(tmp, { recursive: true, force: true });
  for (const [rel, txt] of files) { mkdirSync(dirname(join(tmp, rel)), { recursive: true }); writeFileSync(join(tmp, rel), txt); }
  try { return loadCatalog(tmp); } finally { rmSync(tmp, { recursive: true, force: true }); }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
  if (process.argv.includes("--check")) {
    const pin = readPin(), want = snapshotAt(pin.commit), have = onDisk(), d = diff(want, have);
    const cat = loadPinnedCatalog();
    if (d.length) { console.error(`catalog-pin --check: snapshot differs from ${pin.commit} (${d.length}): ${d.slice(0, 8).join("; ")}`); process.exit(1); }
    console.log(`catalog-pin --check: ok, ${have.size} files = ${pin.commit.slice(0, 8)}, ${cat.lessons.length} lessons, catalogue ${pin.catalogueSha256.slice(0, 12)}…`);
  } else if (arg("diff")) {
    const c = git("rev-parse", arg("diff")).trim(), next = snapshotAt(c), d = diff(onDisk(), next);
    const a = loadPinnedCatalog(), b = catAt(next);
    console.log(`pin ${readPin().commit.slice(0, 8)} -> ${c.slice(0, 8)}: ${d.length} files differ; lessons ${a.lessons.length} -> ${b.lessons.length}; default order ${JSON.stringify(a.defaultOrder) === JSON.stringify(b.defaultOrder) ? "unchanged" : "CHANGES"}; catalogue ${catalogueSha(b).slice(0, 12)}…`);
    for (const x of d.slice(0, 40)) console.log(`  ${x}`);
  } else if (arg("move")) {
    const reason = arg("reason");
    if (!reason) { console.error("catalog-pin --move needs --reason=\"…\" (and a line in the decision note)"); process.exit(2); }
    const c = git("rev-parse", arg("move")).trim(), files = snapshotAt(c), cat = catAt(files);
    for (const sub of ["content", "src"]) rmSync(join(PIN_ROOT, sub), { recursive: true, force: true });
    for (const [rel, txt] of files) { mkdirSync(dirname(join(PIN_ROOT, rel)), { recursive: true }); writeFileSync(join(PIN_ROOT, rel), txt); }
    const lastChanged = git("log", "-1", "--format=%H", c, "--", ...PILOT.flatMap((d) => [`src/demos/${d}`, `content/curriculum/${d}.json`])).trim();
    const pin = { schema: "personalization-sim-catalog-pin-v1", commit: c, inputsLastChangedAt: lastChanged, reason,
      decision: "company/personalization/2026-10-18-simulator-catalogue-pin.md", files: files.size, lessons: cat.lessons.length, catalogueSha256: catalogueSha(cat),
      fields: "meta.json trimmed to title, status, concept, curriculum.{primary, prerequisites, level}; curriculum files verbatim" };
    writeFileSync(PIN_FILE, JSON.stringify(pin, null, 1) + "\n");
    console.log(`catalog-pin: pinned ${c.slice(0, 8)} (${files.size} files, ${cat.lessons.length} lessons, catalogue ${pin.catalogueSha256.slice(0, 12)}…). Now regenerate: node company/personalization/model/sim/policy-golden.mjs --write (if it changed), node tools/hq-lab-precompute.mjs.`);
  } else {
    console.error("usage: catalog-pin.mjs --check | --diff=<commit> | --move=<commit> --reason=\"…\"");
    process.exit(2);
  }
}
