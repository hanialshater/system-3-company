// Cross-check the static index against webpack's actually resolved source files.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { CatalogueIndex } from './catalogue-index.mjs';
import { webpackConfig, LESSON_EXTERNALS } from '../../../spike/build.mjs';
const require = createRequire(import.meta.url), { webpack } = require('next/dist/compiled/webpack/webpack');
const root = path.resolve(new URL('../../../', import.meta.url).pathname);
const base = path.resolve(process.argv[2] ?? path.join(root, 'artifacts/content-hub-catalogue'));
const state = path.join(base, 'state');
const { sample } = JSON.parse(fs.readFileSync(path.join(base, 'sample-selection.json'), 'utf8'));
const index = new CatalogueIndex(state, 'resolved-graph-audit');
const results = [];
for (const id of sample) {
  const demo = index.records.get(id), { config } = webpackConfig({ name: 'audit-' + id.replaceAll('/', '--'), entry: demo.entry, externals: LESSON_EXTERNALS });
  config.context = state; config.resolve.alias['@'] = path.join(state, 'src');
  config.resolve.modules = [path.join(root, 'node_modules')];
  config.output.path = path.join(base, 'audit-work', id);
  const result = await new Promise(resolve => {
    const compiler = webpack(config); compiler.run((error, stats) => compiler.close(() => resolve({ error, stats })));
  });
  const watched = result.stats ? [...result.stats.compilation.fileDependencies].filter(f => f.startsWith(path.join(state, 'src') + path.sep) && fs.existsSync(f)) : [];
  const resolved = watched.filter(f => fs.statSync(f).isFile()).map(f => path.relative(state, f)).sort();
  const resolverDirectories = watched.filter(f => fs.statSync(f).isDirectory()).map(f => path.relative(state, f)).sort();
  const indexed = new Set(demo.files), missing = resolved.filter(f => !indexed.has(f));
  const errors = result.error ? [result.error.message] : result.stats.compilation.errors.map(e => e.message.slice(0, 500));
  results.push({ id, ok: !missing.length && !errors.length, resolvedFiles: resolved.length, resolverDirectories, missing, errors });
  fs.rmSync(config.output.path, { recursive: true, force: true });
}
const report = { checked: results.length, passed: results.filter(r => r.ok).length, results, caveat: 'Independent resolver comparison on the preselected 14-domain sample, not proof for every possible import form.' };
fs.writeFileSync(path.join(base, 'graph-audit.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (report.passed !== report.checked) process.exitCode = 1;
