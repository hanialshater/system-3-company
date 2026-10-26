#!/usr/bin/env node
// Lesson frames pilot (EDD-003 stage 1): build the 50 pilot artifacts and the committed manifest; check, prune, serve
// and verify the artifact origin. Spec: company/engineering/reviews/2026-10-25-content-hub-production-review.md.
// Rules and file names: tools/lib/lesson-frames.mjs. Gate: tests/lesson-frames (npm run test:lesson-frames, in verify).
//
//   node tools/lesson-frames.mjs build [--out=artifacts/lesson-frames/dist] [--frame-ancestors=<origin>,...]
//        builds the kit and every published pilot slug with spike/build.mjs into --out (content-hashed, never
//        overwritten), writes the manifest and its two client projections, and --out/vercel.json (the origin's headers).
//        The manifest always names the allow-listed origin; a local origin is only for a scratch copy (--origin, --manifest-dir).
//   node tools/lesson-frames.mjs check            the gate's rules (exit 1 on any problem)
//   node tools/lesson-frames.mjs prune            drop entries that are stale or no longer published (then commit)
//   node tools/lesson-frames.mjs serve --dir=<out> [--port=4801] [--frame-ancestors=http://localhost:3000]
//        a local artifact origin with the same headers (development and QA only)
//   node tools/lesson-frames.mjs check-origin [--origin=<url>] [--frame-ancestors=...]
//        C4, read-only, at release time: every artifact the manifest names returns 200 with its path class's headers
//        and bytes whose sha256 is the hash in its name
//
// Deploying the artifacts is release-manager's, with the founder's approval of that deploy (runbook-deploy.md).

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";
import {
  ALLOWED_ORIGIN,
  PRODUCTION_HOST,
  ROOT,
  headersFor,
  lessonStatus,
  findLessonDir,
  manifestFrom,
  originVercelJson,
  pilotSlugs,
  problems,
  readManifest,
  sha256,
  writeManifest,
  MANIFEST,
  CLIENT_SLUGS,
  CLIENT_FRAMES,
} from "./lib/lesson-frames.mjs";

const [cmd, ...rest] = process.argv.slice(2);
const args = Object.fromEntries(rest.map((a) => a.replace(/^--/, "").split("=")).map(([k, v]) => [k, v ?? true]));
const list = (v, d) => (typeof v === "string" ? v.split(",").filter(Boolean) : d);
const ancestors = list(args["frame-ancestors"], [PRODUCTION_HOST]);

async function build() {
  const out = path.resolve(ROOT, args.out ?? "artifacts/lesson-frames/dist");
  const origin = args.origin ?? ALLOWED_ORIGIN;
  // spike/build.mjs reads --out from process.argv when it is imported.
  process.argv = [process.argv[0], process.argv[1], `--out=${out}`];
  const { buildKit, buildLessons } = await import("../spike/build.mjs");
  const t0 = performance.now();
  const refused = [];
  const todo = [];
  for (const slug of pilotSlugs()) {
    const dir = findLessonDir(slug);
    const status = dir ? lessonStatus(slug) : null;
    if (status !== "published") refused.push({ slug, reason: `status ${status ?? "missing"}` });
    else todo.push({ slug, domain: dir.split("/")[2], entry: path.join(ROOT, dir, "Demo.tsx") });
  }
  const kit = await buildKit();
  const tKit = performance.now() - t0;
  const built = await buildLessons(todo, kit);
  const tAll = performance.now() - t0;
  const ok = built.filter((r) => r.ok);
  for (const r of built.filter((x) => !x.ok)) refused.push({ slug: r.slug, reason: `build: ${r.unknownImports?.join(",") || r.errors?.[0] || "?"}` });
  const m = manifestFrom({ kit, lessons: ok, origin });
  const outside = Object.entries(m.lessons).flatMap(([slug, e]) => e.sources.filter((f) => !f.startsWith(findLessonDir(slug) + "/")).map((f) => `${slug}: ${f}`));
  const mdir = args["manifest-dir"] ? path.resolve(ROOT, args["manifest-dir"]) : ROOT;
  if (mdir !== ROOT) {
    for (const rel of [MANIFEST, CLIENT_SLUGS, CLIENT_FRAMES]) fs.mkdirSync(path.dirname(path.join(mdir, rel)), { recursive: true });
  }
  writeManifest(m, mdir);
  fs.writeFileSync(path.join(out, "vercel.json"), JSON.stringify(originVercelJson(ancestors), null, 2) + "\n");
  const g = ok.map((r) => r.gzip).sort((a, b) => a - b);
  const report = {
    at: new Date().toISOString(),
    origin,
    out: path.relative(ROOT, out),
    wallMs: Math.round(tAll),
    kitWallMs: Math.round(tKit),
    kit: { js: kit.js, css: kit.css, boot: kit.boot, geo: kit.geo },
    lessons: ok.map(({ slug, raw, gzip, brotli, hash, frameHash, geo }) => ({ slug, raw, gzip, brotli, hash, frameHash, geo })),
    gzip: { n: g.length, median: g[Math.floor((g.length - 1) / 2)], max: g[g.length - 1], over15k: g.filter((x) => x > 15360).length },
    refused,
    sourcesOutsideLessonDir: outside,
    toolchain: m.toolchain,
  };
  const rdir = path.join(ROOT, "artifacts/scratch/platform-engineer");
  fs.mkdirSync(rdir, { recursive: true });
  fs.writeFileSync(path.join(rdir, "lesson-frames-build.json"), JSON.stringify(report, null, 2));
  console.log(
    `lesson-frames: ${ok.length}/${pilotSlugs().length} built in ${(tAll / 1000).toFixed(1)} s (kit ${(tKit / 1000).toFixed(1)} s) · ` +
      `kit js ${kit.js.gzip} B gz · css ${kit.css.gzip} B gz · geo ${kit.geo.gzip} B gz · lessons gz median ${report.gzip.median} max ${report.gzip.max} over 15 KB ${report.gzip.over15k}`,
  );
  for (const r of refused) console.log(`  refused ${r.slug}: ${r.reason}`);
  for (const o of outside) console.log(`  note: source outside the lesson folder: ${o}`);
  console.log(`  manifest: ${path.relative(ROOT, path.join(mdir, MANIFEST))} · artifacts: ${path.relative(ROOT, out)} · report: artifacts/scratch/platform-engineer/lesson-frames-build.json`);
}

function check() {
  const ps = problems(readManifest());
  for (const p of ps) console.log(`  ${p.slug ?? "(manifest)"}: ${p.rule}: ${p.detail}`);
  console.log(ps.length ? `lesson-frames check: ${ps.length} problem(s)` : `lesson-frames check: ok (${Object.keys(readManifest().lessons).length} framed)`);
  process.exit(ps.length ? 1 : 0);
}

function prune() {
  const m = readManifest();
  const drop = new Set(problems(m).filter((p) => p.slug && ["stale", "published", "pilot", "fallback"].includes(p.rule)).map((p) => p.slug));
  for (const s of drop) delete m.lessons[s];
  writeManifest(m);
  console.log(drop.size ? `lesson-frames prune: dropped ${[...drop].join(", ")} (they render in-app); commit the three files` : "lesson-frames prune: nothing to drop");
}

function serve() {
  const dir = path.resolve(ROOT, args.dir ?? "artifacts/lesson-frames/dist");
  const port = Number(args.port ?? 4801);
  const local = list(args["frame-ancestors"], ["http://localhost:3000"]);
  const TYPES = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html; charset=utf-8" };
  http
    .createServer((req, res) => {
      const url = new URL(req.url ?? "/", "http://x");
      const rel = path.normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, "");
      const file = path.join(dir, rel);
      const h = headersFor(url.pathname, local);
      if (!h || !file.startsWith(dir + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return res.writeHead(404).end("not found");
      let body = fs.readFileSync(file);
      const headers = { ...h, "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream", Vary: "Accept-Encoding" };
      if (/\bgzip\b/.test(String(req.headers["accept-encoding"] ?? ""))) {
        body = zlib.gzipSync(body, { level: 6 });
        headers["Content-Encoding"] = "gzip";
      }
      headers["Content-Length"] = body.length;
      res.writeHead(200, headers).end(req.method === "HEAD" ? undefined : body);
    })
    .listen(port, "127.0.0.1", () => console.log(`lesson-frames origin on http://127.0.0.1:${port} (localhost too), frames embeddable by ${local.join(" ")}`));
}

async function checkOrigin() {
  const m = readManifest();
  const origin = args.origin ?? m.origin;
  const urls = new Map();
  const add = (p, h) => urls.set(p, h);
  add(`/kit/${m.kitVersion}/kit.${m.kit.js}.js`, m.kit.js);
  add(`/kit/${m.kitVersion}/kit.${m.kit.css}.css`, m.kit.css);
  add(`/kit/${m.kitVersion}/boot.${m.kit.boot}.js`, m.kit.boot);
  add(`/kit-geo/${m.kitVersion}/geo.${m.kit.geo}.js`, m.kit.geo);
  for (const e of Object.values(m.lessons)) {
    add(`/l/${e.lessonJs}.js`, e.lessonJs);
    add(`/f/${e.frameDoc}.html`, e.frameDoc);
  }
  const bad = [];
  await Promise.all(
    [...urls].map(async ([p, hash]) => {
      try {
        const r = await fetch(origin + p);
        const body = Buffer.from(await r.arrayBuffer());
        const want = headersFor(p, ancestors);
        if (r.status !== 200) return bad.push(`${p}: HTTP ${r.status}`);
        if (sha256(body) !== hash) bad.push(`${p}: bytes do not match the hash in the name`);
        for (const [k, v] of Object.entries(want)) if (r.headers.get(k) !== v) bad.push(`${p}: ${k} is ${JSON.stringify(r.headers.get(k))}, expected ${JSON.stringify(v)}`);
      } catch (e) {
        bad.push(`${p}: ${e.message}`);
      }
    }),
  );
  for (const b of bad.sort()) console.log(`  ${b}`);
  console.log(`lesson-frames check-origin ${origin}: ${urls.size - new Set(bad.map((b) => b.split(":")[0])).size}/${urls.size} artifacts ok`);
  process.exit(bad.length ? 1 : 0);
}

const cmds = { build, check, prune, serve, "check-origin": checkOrigin };
if (!cmds[cmd]) {
  console.error(`usage: node tools/lesson-frames.mjs ${Object.keys(cmds).join("|")} (see the header of this file)`);
  process.exit(2);
}
Promise.resolve(cmds[cmd]()).catch((e) => {
  console.error(e);
  process.exit(1);
});
