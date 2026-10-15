// W-945 / W-947: checks a BUILT production output, not the source. Skips unless BUILT_DIST_DIR is set.
//
//   VERCEL=1 VERCEL_ENV=production NEXT_DIST_DIR=.next-prod npx next build
//   BUILT_DIST_DIR=.next-prod npm run test:platform
//
// W-945: no draft slug is in the prerender manifest (for /d and /api/meta), and `next start` on that build,
// started here with VERCEL, VERCEL_ENV, SHOW_DRAFTS and SHOW_REVIEW removed from its environment, returns 404
// for every draft slug on /d/<slug> and /api/meta/<slug>, twice (a 200 must never be rendered and cached).
// W-947: no prerendered RSC payload, HTML page or /api/meta body under server/app carries an internal string
// (./internal-strings.mjs), and neither do live /api/meta responses.
// Out of scope: static/chunks (the 5.3 MB client chunk that bundles every meta.json is W-946). It still leaks.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { INTERNAL_STRINGS } from "./internal-strings.mjs";

const repo = path.resolve(new URL("../..", import.meta.url).pathname);
const distArg = process.env.BUILT_DIST_DIR;
const dist = distArg ? path.resolve(repo, distArg) : null;
const skip = !dist ? "set BUILT_DIST_DIR to a production build (VERCEL=1 VERCEL_ENV=production next build)" : false;
const PORT = Number(process.env.BUILT_PORT || 3659);

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
const drafts = all.filter((m) => m.status === "draft").map((m) => m.slug);
const published = all.filter((m) => m.status === "published").map((m) => m.slug);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

test("W-945: no draft slug is in the prerender manifest or the prerendered files", { skip }, () => {
  assert.ok(drafts.length > 0, "there are drafts to check");
  const manifest = JSON.parse(fs.readFileSync(path.join(dist, "prerender-manifest.json"), "utf8"));
  const routes = Object.keys(manifest.routes);
  assert.ok(routes.some((r) => r.startsWith("/d/")), "manifest lists /d/* pages (is this a full build?)");
  const leaked = drafts.filter((s) => routes.includes(`/d/${s}`) || routes.includes(`/api/meta/${s}`));
  assert.deepEqual(leaked, [], "draft slugs in prerender-manifest.json");
  for (const route of ["d", "api/meta"]) {
    const dir = path.join(dist, "server/app", route);
    const names = new Set(fs.readdirSync(dir).map((n) => n.split(".")[0]));
    assert.deepEqual(drafts.filter((s) => names.has(s)), [], `draft files under server/app/${route}`);
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

test("W-945 / W-947: next start with VERCEL vars unset at runtime 404s every draft, twice", { skip, timeout: 180_000 }, async () => {
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
          if (r.status !== 404) bad.push(`round ${round + 1} ${p}: ${r.status}`);
        }
      }
    }
    assert.deepEqual(bad, [], "drafts must 404 with VERCEL vars unset at runtime");
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
