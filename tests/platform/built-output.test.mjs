// Checks a BUILT production output, including every lesson status and metadata sanitization.
//
//   VERCEL=1 VERCEL_ENV=production NEXT_DIST_DIR=.next-prod npx next build
//   BUILT_DIST_DIR=.next-prod npm run test:platform
//
// Founder 2026-10-19: unpublished lessons are included and visibly tagged.
// W-947: no prerendered RSC payload, HTML page or /api/meta body under server/app carries an internal string
// (./internal-strings.mjs), and neither do live /api/meta responses.
// W-946 (AMD-001 (c2) + R1): no file under static/chunks (what every browser downloads) carries an internal string,
// and no chunk is over 300 KB raw (the combined registry chunk was 5.39 MB; lesson code in the shell was 3.6 MB).
// The import scan in registry-split.test.mjs guards the cause in source; this guards the result.
// Excluded: chunks that only /hq pages reference (server/app/hq/**/page_client-reference-manifest.js and no other
// manifest). /hq 404s on production (src/lib/hq.ts hqEnabled), and its chunk carries org role text ("checkedBy:
// fact-checker" in the fact-checker's scope), not meta.json. The chunk file is still fetchable by URL: reported
// separately (readiness record 2026-10-15-amd001-c2-split.md), not hidden here. The test prints what it excluded.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { INTERNAL_STRINGS, LESSON_CODE_FIELDS } from "./internal-strings.mjs";

const repo = path.resolve(new URL("../..", import.meta.url).pathname);
const distArg = process.env.BUILT_DIST_DIR;
const dist = distArg ? path.resolve(repo, distArg) : null;
const skip = !dist ? "set BUILT_DIST_DIR to a production build (VERCEL=1 VERCEL_ENV=production next build)" : false;
// Not 3659: it is on Next's reserved-port list (apple-sasl) and `next start` refuses it (W-408).
const PORT = Number(process.env.BUILT_PORT || 3660);

function metas() {
  const root = path.join(repo, "src/demos");
  const out = [];
  for (const domain of fs.readdirSync(root)) {
    const ddir = path.join(root, domain);
    if (!fs.statSync(ddir).isDirectory()) continue;
    for (const slug of fs.readdirSync(ddir)) {
      const f = path.join(ddir, slug, "meta.json");
      if (fs.existsSync(f)) out.push(JSON.parse(fs.readFileSync(f, "utf8")));
    }
  }
  return out;
}
const all = metas();
const drafts = all.filter((m) => m.status !== "published").map((m) => m.slug);
const published = all.filter((m) => m.status === "published").map((m) => m.slug);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

test("all lesson statuses have prerendered pages and sanitized metadata", { skip }, () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(dist, "prerender-manifest.json"), "utf8"));
  for (const meta of all) {
    assert.ok(manifest.routes[`/d/${meta.slug}`], `missing lesson ${meta.slug}`);
    assert.ok(manifest.routes[`/api/meta/${meta.slug}`], `missing metadata ${meta.slug}`);
    const body = JSON.parse(fs.readFileSync(path.join(dist, "server/app/api/meta", `${meta.slug}.body`), "utf8"));
    assert.equal(body.status, meta.status, `${meta.slug} status was changed`);
    if (meta.status !== "published") {
      const html = fs.readFileSync(path.join(dist, "server/app/d", `${meta.slug}.html`), "utf8");
      assert.ok(html.includes("Unpublished"), `${meta.slug} lacks a visible status label`);
    }
  }
});

test("W-947: no prerendered RSC payload, page or /api/meta body carries an internal string", { skip }, () => {
  // What next start serves: pages (.html), RSC payloads (.rsc, .segments/), route bodies (.body). Not Next's own
  // .meta (headers, cache keys) or .nft.json (file traces): those never leave the server.
  const files = walk(path.join(dist, "server/app")).filter((f) => /\.(rsc|html|body)$/.test(f) || /\.segments\//.test(f));
  assert.ok(files.some((f) => f.endsWith(".rsc")), "found RSC payloads");
  assert.ok(files.some((f) => /api\/meta\/.+\.body$/.test(f)), "found /api/meta bodies");
  const hits = [];
  for (const f of files) {
    const text = fs.readFileSync(f, "utf8");
    for (const s of INTERNAL_STRINGS) if (text.includes(s)) hits.push(`${path.relative(dist, f)}: ${s}`);
  }
  assert.deepEqual(hits.slice(0, 20), [], `${hits.length} hits`);
});

const CHUNK_MAX_RAW = 300 * 1024;
// Field names that lesson code also uses on its own, outside any meta.json: a Life Hacks UI label ("owner") and
// src/lib/lifehacks/resource-specs.json (60 resource-lesson specs with "concept", "objective", "misconception"),
// bundled with the resource lessons. Measured on the split build (2026-10-15, readiness record
// company/engineering/readiness/2026-10-15-amd001-c2-split.md): 2 chunks, both present byte-identical before the
// split. Ratchet: they may not spread to more chunks. Every other INTERNAL_STRING must have 0 hits.
// LESSON_CODE_FIELDS lives in internal-strings.mjs; registry-split.test.mjs checks the property this relies on.
const LESSON_CODE_FIELD_CHUNKS_MAX = 2;

test("W-946: no client chunk under static/chunks carries an internal string, and none is over 300 KB raw", { skip }, () => {
  const dir = path.join(dist, "static/chunks");
  const refs = (f) => new Set([...fs.readFileSync(f, "utf8").matchAll(/static\/chunks\/([^"\\]+\.(?:js|css))/g)].map((m) => m[1]));
  const manifests = walk(path.join(dist, "server/app")).filter((f) => f.endsWith("page_client-reference-manifest.js"));
  const hq = new Set(), learner = new Set();
  for (const m of manifests) for (const c of refs(m)) (/[\\/]server[\\/]app[\\/]hq[\\/]/.test(m) ? hq : learner).add(c);
  const hqOnly = new Set([...hq].filter((c) => !learner.has(c)));
  const files = walk(dir).filter((f) => /\.(js|css)$/.test(f) && !hqOnly.has(path.relative(dir, f).split(path.sep).join("/")));
  if (hqOnly.size) console.log(`# static/chunks: ${hqOnly.size} chunk(s) referenced only by /hq excluded`);
  assert.ok(files.some((f) => f.endsWith(".js")), "found client chunks (is this a full build?)");
  const hits = [];
  const fieldChunks = new Map();
  const big = [];
  for (const f of files) {
    const text = fs.readFileSync(f, "utf8");
    const name = path.relative(dist, f);
    for (const s of INTERNAL_STRINGS) {
      if (!text.includes(s)) continue;
      if (LESSON_CODE_FIELDS.includes(s)) fieldChunks.set(name, [...(fieldChunks.get(name) ?? []), s]);
      else hits.push(`${name}: ${s}`);
    }
    const size = fs.statSync(f).size;
    if (size > CHUNK_MAX_RAW) big.push(`${name}: ${size} B`);
  }
  for (const [name, found] of fieldChunks) console.log(`# lesson-code field names in ${name}: ${found.join(", ")}`);
  assert.deepEqual(hits.slice(0, 20), [], `${hits.length} internal-string hits in static/chunks`);
  assert.ok(fieldChunks.size <= LESSON_CODE_FIELD_CHUNKS_MAX, `field names ${LESSON_CODE_FIELDS.join(" ")} in ${fieldChunks.size} chunks (max ${LESSON_CODE_FIELD_CHUNKS_MAX}): ${[...fieldChunks.keys()].join(", ")}`);
  assert.deepEqual(big, [], `chunks over ${CHUNK_MAX_RAW} B raw`);
});

test("all registered lessons remain reachable when runtime environment differs from build", { skip, timeout: 180_000 }, async () => {
  const env = { ...process.env, NEXT_DIST_DIR: path.relative(repo, dist), NODE_ENV: "production" };
  for (const k of ["VERCEL", "VERCEL_ENV", "SHOW_DRAFTS", "SHOW_REVIEW", "VERCEL_URL"]) delete env[k];
  const server = spawn(process.execPath, [path.join(repo, "node_modules/next/dist/bin/next"), "start", "-p", String(PORT)], {
    cwd: repo, env, stdio: ["ignore", "pipe", "pipe"], detached: true, // own process group: next start forks next-server
  });
  let log = "";
  server.stdout.on("data", (d) => (log += d));
  server.stderr.on("data", (d) => (log += d));
  const base = `http://127.0.0.1:${PORT}`;
  try {
    let up = false;
    for (let i = 0; i < 120 && !up; i++) {
      try {
        up = (await fetch(`${base}/d/${published[0]}`)).status === 200;
      } catch {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
    assert.ok(up, `next start came up and served a published lesson\n${log}`);
    const bad = [];
    for (let round = 0; round < 2; round++) {
      for (const s of drafts) {
        for (const p of [`/d/${s}`, `/api/meta/${s}`]) {
          const r = await fetch(base + p);
          await r.arrayBuffer();
          if (r.status !== 200) bad.push(`round ${round + 1} ${p}: ${r.status}`);
        }
      }
    }
    assert.deepEqual(bad, [], "registered unpublished lessons must open with VERCEL vars unset at runtime");
    for (const s of published.slice(0, 5)) {
      assert.equal((await fetch(`${base}/d/${s}`)).status, 200, s);
      const r = await fetch(`${base}/api/meta/${s}`);
      assert.equal(r.status, 200, s);
      const body = await r.text();
      for (const k of INTERNAL_STRINGS) assert.ok(!body.includes(k), `/api/meta/${s}: ${k}`);
      assert.deepEqual(Object.keys(JSON.parse(body)).sort(), ["claims", "domain", "evidence", "recall", "slug", "status", "title"]);
    }
  } finally {
    try {
      process.kill(-server.pid, "SIGTERM"); // the group, so the forked next-server stops too
    } catch {
      server.kill("SIGTERM");
    }
  }
});
