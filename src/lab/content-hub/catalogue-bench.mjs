// Real-catalogue experiment. All artifacts/source copies stay outside production paths.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { DatabaseSync } from 'node:sqlite';
import { catalogue, CatalogueIndex, sha256 } from './catalogue-index.mjs';
import { buildKit, webpackConfig, LESSON_EXTERNALS, minifyJs, frameHtml, write } from '../../../spike/build.mjs';

const require = createRequire(import.meta.url), { webpack } = require('next/dist/compiled/webpack/webpack');
const ROOT = path.resolve(new URL('../../../', import.meta.url).pathname);
const OUT = path.resolve(process.argv.find(a => a.startsWith('--out='))?.slice(6) ?? path.join(ROOT, 'artifacts/content-hub-catalogue/dist'));
const BASE = path.dirname(OUT), STATE = path.join(BASE, 'state');
const save = (file, data) => fs.writeFileSync(path.join(BASE, file), JSON.stringify(data, null, 2));
const measure = fn => { const start = performance.now(); const value = fn(); return { value, ms: performance.now() - start }; };
const git = (...args) => execFileSync('git', ['-C', STATE, ...args], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
const sri = bytes => 'sha384-' + crypto.createHash('sha384').update(bytes).digest('base64');
const gzip = bytes => require('node:zlib').gzipSync(bytes).length;

async function compileDemo(demo, kit, key) {
  const start = performance.now();
  const config = webpackConfig({ name: 'catalogue-' + demo.id.replaceAll('/', '--'), entry: demo.entry, externals: LESSON_EXTERNALS });
  config.config.context = STATE;
  config.config.resolve.alias['@'] = path.join(STATE, 'src');
  config.config.resolve.modules = [path.join(ROOT, 'node_modules')];
  config.config.output.path = path.join(BASE, 'compiler-work', demo.id);
  // Readiness isn't established by compilation. Keep unknown imports visible as migration work.
  const result = await new Promise(resolve => {
    const compiler = webpack(config.config);
    compiler.run((error, stats) => compiler.close(closeError => resolve({ error: error ?? closeError, stats })));
  });
  const errors = result.error ? [result.error.message] : result.stats.compilation.errors.map(e => e.message);
  if (errors.length) return { id: demo.id, key, ok: false, errors: errors.map(e => e.slice(0, 1500)), extraImports: [...config.unknown], ms: performance.now() - start };
  try {
    const bytes = await minifyJs(fs.readFileSync(path.join(config.config.output.path, 'out.js'), 'utf8'));
    const hash = sha256(bytes), bundle = write(`l/${hash}.js`, bytes);
    const geo = config.used.has('@/kit/geo') || config.used.has('d3-geo');
    const html = frameHtml({ slug: demo.slug, lesson: { url: bundle, sri: sri(bytes) }, kit, geo });
    const frame = write(`f/${sha256(html)}.html`, html);
    return { id: demo.id, key, ok: true, hash, bundle, frame, geo, raw: bytes.length, gzip: gzip(bytes), extraImports: [...config.unknown], ms: performance.now() - start };
  } catch (error) { return { id: demo.id, key, ok: false, errors: [error.message], ms: performance.now() - start }; }
  finally { fs.rmSync(config.config.output.path, { recursive: true, force: true }); }
}

async function main() {
  if (fs.existsSync(STATE)) throw new Error('Use a fresh output directory for a reproducible benchmark');
  fs.mkdirSync(BASE, { recursive: true }); fs.mkdirSync(STATE);
  const sourceCommit = execFileSync('git', ['-C', ROOT, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  const archive = execFileSync('git', ['-C', ROOT, 'archive', 'HEAD', 'src/demos', 'src/kit', 'src/lib', 'src/components', 'content', 'public'], { maxBuffer: 128 * 1024 * 1024 });
  execFileSync('tar', ['-x', '-C', STATE], { input: archive });
  git('init', '-b', 'main'); git('add', '.');
  const ingest = measure(() => git('-c', 'user.name=R&D benchmark', '-c', 'user.email=benchmark@example.invalid', 'commit', '-m', 'Import frozen real catalogue'));
  const real = catalogue(STATE);
  const sample = [...new Set(real.map(d => d.domain))].map(domain => real.find(d => d.domain === domain).id);
  save('sample-selection.json', { sourceCommit, sample, selectedBeforeCompilation: true });
  const compilerIdentity = sha256(Buffer.concat([
    fs.readFileSync(path.join(ROOT, 'package-lock.json')),
    ...['src/lab/content-hub/catalogue-bench.mjs', 'spike/build.mjs', 'spike/tooling/ts-loader.cjs', 'spike/tooling/css-module-loader.cjs'].map(f => fs.readFileSync(path.join(ROOT, f))),
  ]));
  const indexed = measure(() => new CatalogueIndex(STATE, compilerIdentity)), index = indexed.value;
  const keys = measure(() => new Map(real.map(d => [d.id, index.key(d.id)])));
  console.log(`Indexed ${real.length} real demos in ${Math.round(indexed.ms)} ms; keys ${Math.round(keys.ms)} ms`);
  const kit = await buildKit();
  save('kit.json', kit);
  const db = new DatabaseSync(path.join(BASE, 'builds.sqlite'));
  db.exec('CREATE TABLE builds(id TEXT PRIMARY KEY, input_key TEXT, ok INTEGER, result TEXT)');
  const builds = [], started = performance.now(), batchSize = 4;
  for (let i = 0; i < real.length; i += batchSize) {
    const batch = await Promise.all(real.slice(i, i + batchSize).map(d => compileDemo(d, kit, keys.value.get(d.id))));
    for (const result of batch) { builds.push(result); db.prepare('INSERT INTO builds VALUES(?,?,?,?)').run(result.id, result.key, result.ok ? 1 : 0, JSON.stringify(result)); }
    if (i % 100 < batchSize || i + batchSize >= real.length) console.log(`Compiled ${Math.min(i + batchSize, real.length)}/${real.length}; failures ${builds.filter(b => !b.ok).length}; ${Math.round((performance.now() - started) / 1000)} s`);
  }
  const coldBuildMs = performance.now() - started;
  save('builds.json', builds);
  const warm = measure(() => real.map(d => db.prepare('SELECT ok,result FROM builds WHERE id=? AND input_key=?').get(d.id, index.key(d.id))));
  const success = builds.filter(b => b.ok), failed = builds.filter(b => !b.ok);
  const byDomain = Object.fromEntries([...new Set(real.map(d => d.domain))].map(domain => [domain, {
    total: real.filter(d => d.domain === domain).length,
    built: success.filter(b => b.id.startsWith(domain + '/')).length,
  }]));
  function checkChanges(paths) {
    const overrides = new Map(paths.map(f => [f, fs.readFileSync(path.join(STATE, f), 'utf8') + '\n/* isolated benchmark edit */\n']));
    const selected = measure(() => index.affected(paths));
    const independentlyRehashed = measure(() => real.filter(d => index.key(d.id, overrides) !== keys.value.get(d.id)).map(d => d.id).sort());
    assert.deepEqual(selected.value, independentlyRehashed.value);
    return { selected: selected.value, indexedMs: selected.ms, fullKeyComparisonMs: independentlyRehashed.ms };
  }
  const isolated = real.filter(d => index.affected([path.relative(STATE, d.entry)]).length === 1);
  const one = isolated[0], ten = isolated.slice(0, 10);
  const changes = {
    one: checkChanges([path.relative(STATE, one.entry)]),
    ten: checkChanges(ten.map(d => path.relative(STATE, d.entry))),
    docs: { selected: index.affected(['docs/benchmark.md']) },
    shared: checkChanges(['src/kit/controls.tsx']),
  };
  assert.equal(changes.one.selected.length, 1); assert.equal(changes.ten.selected.length, 10); assert.equal(changes.docs.selected.length, 0);
  // Exercise a real Git scoped edit and independently compile its changed artifact.
  const original = fs.readFileSync(one.entry, 'utf8');
  const changedSource = original.replace(/(return\s*\(\s*)/, '$1/* isolated source revision */');
  fs.writeFileSync(one.entry, changedSource === original ? original + '\n/* isolated source revision */\n' : changedSource);
  git('add', '--', path.relative(STATE, one.entry));
  const commitEdit = measure(() => git('-c', 'user.name=R&D benchmark', '-c', 'user.email=benchmark@example.invalid', 'commit', '-m', 'One scoped demo edit'));
  const changedKey = index.key(one.id, new Map([[path.relative(STATE, one.entry), fs.readFileSync(one.entry)]]));
  const changedBuild = await compileDemo(one, kit, changedKey);
  fs.writeFileSync(one.entry, original); git('add', '--', path.relative(STATE, one.entry));
  git('-c', 'user.name=R&D benchmark', '-c', 'user.email=benchmark@example.invalid', 'commit', '-m', 'Restore original demo inputs');
  assert.equal(index.key(one.id), keys.value.get(one.id));
  const scopedBuild = { demo: one.id, commitMs: commitEdit.ms, build: changedBuild, restoredKeyMatches: true };
  // Actual additional source directories, explicitly marked capacity copies; no learner publication.
  for (let i = 0; i < 1000; i++) {
    const origin = real[i % real.length];
    fs.cpSync(origin.directory, path.join(path.dirname(origin.directory), '__capacity-' + String(i).padStart(4, '0')), { recursive: true });
  }
  git('add', 'src/demos');
  const growthCommit = measure(() => git('-c', 'user.name=R&D benchmark', '-c', 'user.email=benchmark@example.invalid', 'commit', '-m', 'Add 1000 labelled capacity copies'));
  const grownIndex = measure(() => new CatalogueIndex(STATE, compilerIdentity));
  const grown = catalogue(STATE), successfulKeys = new Set(success.map(b => b.key));
  const growthKeys = measure(() => grown.filter(d => d.synthetic).map(d => grownIndex.value.key(d.id)));
  const growthPlanning = measure(() => grownIndex.value.affected([path.relative(STATE, one.entry)]));
  const report = {
    sourceCommit, sourceCatalogueCommit: '60eaf60ac461e502094cc3cdf6f784bb00ccd784', runtime: { node: process.version, cpus: os.availableParallelism(), platform: process.platform },
    realDemos: real.length, sample, byDomain,
    git: { importCommitMs: ingest.ms, scopedCommitMs: commitEdit.ms, growthCommitMs: growthCommit.ms, statusMs: measure(() => git('status', '--porcelain')).ms, trackedFiles: git('ls-files').trim().split('\n').length },
    index: { buildMs: indexed.ms, allKeysMs: keys.ms, uniqueFiles: index.reverse.size, unresolved: index.unresolved },
    compilation: { attempted: builds.length, successful: success.length, failed: failed.length, coldBuildMs, kitBuildMs: kit.buildMs, warmLookupMs: warm.ms, successfulCacheHits: warm.value.filter(v => v?.ok).length, cachedFailuresExcluded: warm.value.filter(v => v && !v.ok).length },
    changes, scopedBuild,
    growth: { totalRecords: grown.length, syntheticCopies: 1000, realDemos: real.length, indexMs: grownIndex.ms, keysMs: growthKeys.ms, reusableSuccessfulInputKeys: growthKeys.value.filter(k => successfulKeys.has(k)).length, planningMs: growthPlanning.ms, affectedOnOriginalEdit: growthPlanning.value.length, novelProgramsTested: 0 },
    artifacts: { rawBytes: success.reduce((n,b)=>n+b.raw,0), gzipBytes: success.reduce((n,b)=>n+b.gzip,0) },
    caveats: ['Compilation is a React catalogue adapter, not the original DOM-only compiler.', 'Full artifact-build baseline is not a measured monolithic Next.js build.', 'Static index is cross-checked against input hashes, not claimed as a production resolver.', '1000 growth records are copied source, not incoming authored demos.', 'Compilation is not editorial acceptance, complete QA, or hostile-code isolation.'],
  };
  save('report.json', report); db.close();
  console.log(JSON.stringify({ real: report.realDemos, compilation: report.compilation, growth: report.growth, out: BASE }, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
