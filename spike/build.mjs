#!/usr/bin/env node
// SPIKE-001 (EDD-003 stage-1 spike; never merged): build lessons as independent, content-hashed
// ES module bundles against one shared, versioned kit, plus a frame document per lesson version
// and a manifest. Output is a static "CDN" tree (spike/dist) served by spike/cdn-server.mjs.
//
// No new dependency: webpack 5 and terser are the copies Next vendors (next/dist/compiled/*),
// TypeScript transpiles, postcss + Next's vendored postcss-modules plugins do CSS modules.
// See company/engineering/spikes/SPIKE-001-frontend-sandbox.md.
//
//   node spike/build.mjs                 kit + geo kit + the 3 spike lessons + hostile fixture
//   node spike/build.mjs --all           also build every lesson in src/demos (sizes only, scratch dir)
//
// Lesson sources are read, never written.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { webpack } = require("next/dist/compiled/webpack/webpack");
const terser = require("next/dist/compiled/terser");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");
const SPIKE = path.join(ROOT, "spike");
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const OUT = path.resolve(ROOT, args.out ?? "spike/dist");
const TMP = path.join(ROOT, "artifacts/scratch/platform-engineer/spike-build");
const KIT_VERSION = "1.0.0";
const KIT_MAJOR = KIT_VERSION.split(".")[0];
const KIT = `@s3c/kit@${KIT_MAJOR}`;
const GEO = `@s3c/kit-geo@${KIT_MAJOR}`;
export const SPIKE_LESSONS = ["why-seven-wins", "throw-it-fast-enough", "bearing-spiral-to-the-pole"];

const sha256 = (b) => crypto.createHash("sha256").update(b).digest("hex");
const sri = (b) => `sha384-${crypto.createHash("sha384").update(b).digest("base64")}`;
const gz = (b) => zlib.gzipSync(b, { level: 9 }).length;
const br = (b) => zlib.brotliCompressSync(b).length;
const sizes = (b) => ({ raw: b.length, gzip: gz(b), brotli: br(b) });

// The import-map contract: the only bare specifiers a lesson may import, and where they resolve.
const LESSON_EXTERNALS = {
  react: [KIT, "react"],
  "react/jsx-runtime": [KIT, "jsx_runtime"],
  "@/kit/Lesson": [KIT, "kit_Lesson"],
  "@/kit/controls": [KIT, "kit_controls"],
  "@/kit/milestones": [KIT, "kit_milestones"],
  "@/kit/random": [KIT, "kit_random"],
  "@s3c/kit-runtime": [KIT, "runtime"],
  "@/kit/geo": GEO,
  "d3-geo": [GEO, "d3geo"],
};

function webpackConfig({ name, entry, externals, replaceProgress = false }) {
  const plugins = [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ];
  if (replaceProgress) {
    plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^\.\/progress$/, (r) => {
        if (path.resolve(r.context) === path.join(SRC, "kit")) r.request = path.join(SPIKE, "kit/progress-bridge.ts");
      }),
    );
  }
  const used = new Set();
  const unknown = new Set();
  return {
    used,
    unknown,
    config: {
      name,
      mode: "production",
      context: ROOT,
      entry,
      target: ["web", "es2020"],
      devtool: false,
      cache: false,
      experiments: { outputModule: true },
      output: {
        path: path.join(TMP, name),
        filename: "out.js",
        module: true,
        library: { type: "module" },
        chunkFormat: "module",
        clean: true,
      },
      resolve: { extensions: [".ts", ".tsx", ".mjs", ".js", ".json"], alias: { "@": SRC } },
      module: {
        rules: [
          { test: /\.tsx?$/, use: path.join(SPIKE, "tooling/ts-loader.cjs") },
          { test: /\.module\.css$/, use: path.join(SPIKE, "tooling/css-module-loader.cjs") },
        ],
      },
      externalsType: "module",
      externals: [
        ({ request }, cb) => {
          if (externals && request in externals) {
            used.add(request);
            return cb(null, externals[request]);
          }
          // Lessons may import only relative files and the contract above.
          if (externals && !request.startsWith(".") && !path.isAbsolute(request) && request !== entry) unknown.add(request);
          cb();
        },
      ],
      optimization: { minimize: false, splitChunks: false, runtimeChunk: false, concatenateModules: true, usedExports: true },
      performance: { hints: false },
      stats: "errors-warnings",
      plugins,
    },
  };
}

function run(configs) {
  return new Promise((resolve, reject) => {
    webpack(
      configs.map((c) => c.config),
      (err, stats) => {
        if (err) return reject(err);
        const errors = stats.stats.flatMap((s) => s.compilation.errors.map((e) => `${s.compilation.name}: ${e.message}`));
        resolve(errors);
      },
    );
  });
}

async function minifyJs(code) {
  const out = await terser.minify(code, { module: true, compress: { passes: 2 }, mangle: true, format: { comments: false } });
  return Buffer.from(out.code);
}

function write(rel, buf) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file) && !fs.readFileSync(file).equals(buf)) throw new Error(`immutable artifact changed: ${rel}`);
  fs.writeFileSync(file, buf);
  return "/" + rel;
}

function findLesson(slug) {
  for (const d of fs.readdirSync(path.join(SRC, "demos"))) {
    const dir = path.join(SRC, "demos", d, slug);
    if (fs.existsSync(path.join(dir, "Demo.tsx"))) return { dir, domain: d };
  }
  throw new Error(`no lesson ${slug}`);
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

async function buildKit() {
  const t0 = performance.now();
  const kit = webpackConfig({ name: "kit", entry: path.join(SPIKE, "kit/entry.ts"), replaceProgress: true });
  const geo = webpackConfig({
    name: "kit-geo",
    entry: path.join(SPIKE, "kit/geo-entry.ts"),
    externals: { react: [KIT, "react"], "react/jsx-runtime": [KIT, "jsx_runtime"] },
  });
  const errors = await run([kit, geo]);
  if (errors.length) throw new Error(errors.join("\n"));
  const kitJs = await minifyJs(fs.readFileSync(path.join(TMP, "kit/out.js"), "utf8"));
  const geoJs = await minifyJs(fs.readFileSync(path.join(TMP, "kit-geo/out.js"), "utf8"));
  const css = Buffer.from(
    minifyCss(fs.readFileSync(path.join(SRC, "app/globals.css"), "utf8") + "\n" + fs.readFileSync(path.join(SPIKE, "kit/frame.css"), "utf8")),
  );
  const boot = fs.readFileSync(path.join(SPIKE, "kit/boot.js"));
  const art = {
    version: KIT_VERSION,
    js: { url: write(`kit/${KIT_VERSION}/kit.${sha256(kitJs)}.js`, kitJs), sri: sri(kitJs), ...sizes(kitJs) },
    css: { url: write(`kit/${KIT_VERSION}/kit.${sha256(css)}.css`, css), sri: sri(css), ...sizes(css) },
    boot: { url: write(`kit/${KIT_VERSION}/boot.${sha256(boot)}.js`, boot), sri: sri(boot), ...sizes(boot) },
    geo: { url: write(`kit-geo/${KIT_VERSION}/geo.${sha256(geoJs)}.js`, geoJs), sri: sri(geoJs), ...sizes(geoJs) },
    buildMs: Math.round(performance.now() - t0),
  };
  return art;
}

function frameHtml({ slug, lesson, kit, geo }) {
  const imports = { [KIT]: kit.js.url };
  const integrity = { [kit.js.url]: kit.js.sri, [kit.boot.url]: kit.boot.sri, [lesson.url]: lesson.sri };
  if (geo) {
    imports[GEO] = kit.geo.url;
    integrity[kit.geo.url] = kit.geo.sri;
  }
  const importMap = JSON.stringify({ imports, integrity });
  const mapHash = crypto.createHash("sha256").update(importMap).digest("base64");
  const csp = [
    "default-src 'none'",
    `script-src 'self' 'sha256-${mapHash}'`,
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
  ].join("; ");
  const pre = (u, s) => `<link rel="modulepreload" href="${u}" integrity="${s}">`;
  return Buffer.from(
    [
      "<!doctype html>",
      '<html lang="en"><head><meta charset="utf-8">',
      `<meta http-equiv="Content-Security-Policy" content="${csp}">`,
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      `<meta name="s3c-slug" content="${slug}">`,
      `<meta name="s3c-lesson" content="${lesson.url}">`,
      `<meta name="s3c-kit" content="${KIT_VERSION}">`,
      `<script type="importmap">${importMap}</script>`,
      `<link rel="stylesheet" href="${kit.css.url}">`,
      pre(kit.js.url, kit.js.sri),
      geo ? pre(kit.geo.url, kit.geo.sri) : "",
      pre(lesson.url, lesson.sri),
      `<script type="module" src="${kit.boot.url}" integrity="${kit.boot.sri}"></script>`,
      '</head><body><div id="root"></div></body></html>',
    ]
      .filter(Boolean)
      .join("\n"),
  );
}

/** Build lesson bundles in parallel batches. variant: a label appended after minification (rollback demo). */
async function buildLessons(list, kit, { emit = true, batch = 24 } = {}) {
  const results = [];
  for (let i = 0; i < list.length; i += batch) {
    const chunk = list.slice(i, i + batch);
    const cfgs = chunk.map((l) => webpackConfig({ name: `l-${l.slug}${l.variant ? "-" + l.variant : ""}`, entry: l.entry, externals: LESSON_EXTERNALS }));
    const t0 = performance.now();
    const errors = await run(cfgs);
    const wall = performance.now() - t0;
    for (let j = 0; j < chunk.length; j++) {
      const l = chunk[j];
      const c = cfgs[j];
      const errs = errors.filter((e) => e.startsWith(c.config.name + ":"));
      if (errs.length || c.unknown.size) {
        results.push({ slug: l.slug, ok: false, errors: errs.map((e) => e.slice(0, 300)), unknownImports: [...c.unknown] });
        continue;
      }
      let js = await minifyJs(fs.readFileSync(path.join(c.config.output.path, "out.js"), "utf8"));
      if (l.variant) js = Buffer.concat([js, Buffer.from(`\n/* s3c build variant ${l.variant} */\n`)]);
      const hash = sha256(js);
      const geo = c.used.has("@/kit/geo") || c.used.has("d3-geo");
      const r = { slug: l.slug, domain: l.domain, ok: true, variant: l.variant ?? "A", hash, geo, ...sizes(js), batchWallMs: Math.round(wall), batchSize: chunk.length };
      if (emit) {
        const lesson = { url: write(`l/${hash}.js`, js), sri: sri(js) };
        const html = frameHtml({ slug: l.slug, lesson, kit, geo });
        const fhash = sha256(html);
        r.bundle = lesson.url;
        r.frame = write(`f/${fhash}.html`, html);
        r.frameHash = fhash;
        r.frameBytes = html.length;
      }
      results.push(r);
    }
  }
  return results;
}

function lessonMeta(slug) {
  const { dir } = findLesson(slug);
  const m = JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8"));
  const domains = JSON.parse(fs.readFileSync(path.join(ROOT, "content/domains.json"), "utf8")).domains;
  const d = domains.find((x) => x.id === m.domain);
  return { title: m.title, hook: m.hook, domain: m.domain, domainColor: d?.color ?? "#7c9cff", domainShort: d?.short ?? m.domain };
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const kit = await buildKit();
  console.log(`kit ${kit.version}: js ${kit.js.raw} B (${kit.js.gzip} gz) · css ${kit.css.gzip} gz · geo ${kit.geo.raw} B (${kit.geo.gzip} gz) · ${kit.buildMs} ms`);

  const spikeList = SPIKE_LESSONS.map((slug) => {
    const { dir, domain } = findLesson(slug);
    return { slug, domain, entry: path.join(dir, "Demo.tsx") };
  });
  // Per-lesson build time, measured one at a time (the EDD's "≤ 10 s per changed lesson").
  const built = [];
  for (const l of spikeList) {
    const t0 = performance.now();
    const [r] = await buildLessons([l], kit);
    r.buildMs = Math.round(performance.now() - t0);
    built.push(r);
  }
  // Version B of why-seven-wins for the rollback-by-hash drill (same source, different bytes).
  const [b] = await buildLessons([{ ...spikeList[0], variant: "B" }], kit);
  built.push(b);
  // Hostile fixture for the negative security test (spike-only, not a lesson).
  const [hostile] = await buildLessons([{ slug: "__hostile", domain: "spike", entry: path.join(SPIKE, "fixtures/hostile/Demo.tsx") }], kit);
  built.push(hostile);

  for (const r of built) {
    if (!r.ok) throw new Error(`build failed: ${JSON.stringify(r)}`);
    console.log(`${r.slug}${r.variant !== "A" ? " (" + r.variant + ")" : ""}: ${r.raw} B (${r.gzip} gz) · ${r.hash.slice(0, 12)} · frame ${r.frameHash.slice(0, 12)}${r.buildMs ? " · " + r.buildMs + " ms" : ""}`);
  }

  // builds.json: every version ever built (append-only history); manifest.json: the live pointers.
  const histFile = path.join(OUT, "builds.json");
  const hist = fs.existsSync(histFile) ? JSON.parse(fs.readFileSync(histFile, "utf8")) : { kit: {}, lessons: {} };
  hist.kit[kit.js.url] = kit;
  for (const r of built) {
    hist.lessons[r.slug] ??= {};
    hist.lessons[r.slug][r.frameHash] = { ...r, builtAt: new Date().toISOString() };
  }
  fs.writeFileSync(histFile, JSON.stringify(hist, null, 2));

  const manifestFile = path.join(OUT, "manifest.json");
  const prev = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, "utf8")) : null;
  const manifest = { version: (prev?.version ?? 0) + 1, kit: { [KIT_MAJOR]: { version: KIT_VERSION, js: kit.js.url, css: kit.css.url, geo: kit.geo.url } }, lessons: {}, fixtures: {} };
  for (const r of built.filter((x) => x.variant === "A")) {
    const entry = { frame: r.frame, bundle: r.bundle, kit: KIT_VERSION, geo: r.geo };
    if (r.slug.startsWith("__")) manifest.fixtures[r.slug] = { ...entry, title: "Hostile fixture", hook: "Security probe", domainColor: "#ff7a7a", domainShort: "Spike" };
    else manifest.lessons[r.slug] = { ...entry, ...lessonMeta(r.slug) };
  }
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));

  const results = { kit, lessons: built };
  if (args.all) {
    const all = [];
    for (const d of fs.readdirSync(path.join(SRC, "demos"))) {
      const ddir = path.join(SRC, "demos", d);
      if (!fs.statSync(ddir).isDirectory()) continue;
      for (const slug of fs.readdirSync(ddir)) {
        const entry = path.join(ddir, slug, "Demo.tsx");
        if (fs.existsSync(entry)) all.push({ slug, domain: d, entry });
      }
    }
    const t0 = performance.now();
    const r = await buildLessons(all, kit, { emit: false, batch: Number(args.batch ?? 24) });
    results.all = { wallMs: Math.round(performance.now() - t0), lessons: r };
    const ok = r.filter((x) => x.ok);
    const g = ok.map((x) => x.gzip).sort((a, b) => a - b);
    const q = (p) => g[Math.min(g.length - 1, Math.floor(p * g.length))];
    console.log(`all: ${ok.length}/${r.length} built in ${results.all.wallMs} ms · gzip p50 ${q(0.5)} p90 ${q(0.9)} p99 ${q(0.99)} max ${g[g.length - 1]} · over 15 KB: ${g.filter((x) => x > 15360).length}`);
    for (const x of r.filter((y) => !y.ok)) console.log(`  FAIL ${x.slug}: ${x.unknownImports?.join(",") || ""} ${x.errors?.[0] ?? ""}`);
  }
  fs.mkdirSync(path.join(ROOT, "artifacts/scratch/platform-engineer"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "artifacts/scratch/platform-engineer/spike-build-results.json"), JSON.stringify(results, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
