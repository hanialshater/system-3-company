// Trusted build profile for the one-demo pilot. Subprocesses are not hostile-code sandboxes.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';
import { webpackConfig, LESSON_EXTERNALS, minifyJs } from '../../../spike/build.mjs';

const require = createRequire(import.meta.url), { webpack } = require('next/dist/compiled/webpack/webpack');
const ROOT = path.resolve(new URL('../../../', import.meta.url).pathname);
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const sri = bytes => 'sha384-' + crypto.createHash('sha384').update(bytes).digest('base64');
async function bundle(root, entry, out, browser) {
  const { config } = webpackConfig({ name: browser ? 'pilot-browser' : 'pilot-test', entry, externals: browser ? LESSON_EXTERNALS : undefined });
  config.context = root; config.resolve.modules = [path.join(ROOT, 'node_modules')];
  config.output.path = out;
  if (!browser) { config.target = 'node22'; config.externalsPresets = { node: true }; }
  const errors = await new Promise(resolve => {
    const compiler = webpack(config); compiler.run((error, stats) => compiler.close(closeError => resolve(error || closeError ? [(error ?? closeError).message] : stats.compilation.errors.map(e => e.message))));
  });
  if (errors.length) throw new Error(errors.join('\n'));
  return fs.readFileSync(path.join(out, 'out.js'), 'utf8');
}
async function compile(root, config, output) {
  const runtimeRoot = path.dirname(path.join(root, config.aliases['@space/runtime']));
  const pinned = JSON.parse(fs.readFileSync(path.join(runtimeRoot, 'assets.json'), 'utf8'));
  const options = {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler, jsx: ts.JsxEmit.ReactJSX,
    strict: true, noEmit: true, skipLibCheck: true, esModuleInterop: true,
    baseUrl: root, types: ['react', 'react-dom', 'node'], typeRoots: [path.join(ROOT, 'node_modules/@types')],
    paths: { '@/kit/*': [path.join(runtimeRoot, 'types/*')], react: [path.join(ROOT, 'node_modules/@types/react/index.d.ts')], 'react/jsx-runtime': [path.join(ROOT, 'node_modules/@types/react/jsx-runtime.d.ts')], 'react-dom': [path.join(ROOT, 'node_modules/@types/react-dom/index.d.ts')] },
  };
  const program = ts.createProgram([path.join(root, config.entry), path.join(runtimeRoot, 'types/styles.d.ts')], options);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length) throw new Error(ts.formatDiagnostics(diagnostics, { getCanonicalFileName: f => path.relative(root, f), getCurrentDirectory: () => root, getNewLine: () => '\n' }));
  fs.mkdirSync(output, { recursive: true });
  const temp = path.join(path.dirname(output), 'compiler-work');
  const tests = await bundle(root, path.join(root, config.test), path.join(temp, 'tests'), false);
  const testFile = path.join(temp, 'test.mjs'); fs.writeFileSync(testFile, tests);
  const testLog = execFileSync(process.execPath, ['--test', testFile], { timeout: 10000, encoding: 'utf8', env: { PATH: process.env.PATH, NODE_ENV: 'test' } });
  const demo = await minifyJs(await bundle(root, path.join(root, config.entry), path.join(temp, 'browser'), true));
  const files = [];
  const emit = (name, bytes) => { fs.mkdirSync(path.dirname(path.join(output, name)), { recursive: true }); fs.writeFileSync(path.join(output, name), bytes); files.push(name); };
  emit('demo.js', demo);
  for (const asset of [pinned.js, pinned.css]) {
    const bytes = fs.readFileSync(path.join(runtimeRoot, asset.file));
    if (sha(bytes) !== asset.sha256) throw new Error('Pinned runtime integrity mismatch');
    emit('runtime/' + asset.file, bytes);
  }
  const boot = Buffer.from(`const m=document.querySelector('meta[name="s3c-lesson"]');m.content=new URL(m.content,location.href).href;const demo=await import(m.content);document.documentElement.dataset.deliveryRevision=demo.contentHubRevision??'A';const {mount}=await import('@s3c/kit@1');await mount();`);
  emit('boot.js', boot);
  const importMap = JSON.stringify({ imports: { '@s3c/kit@1': './runtime/' + pinned.js.file }, integrity: { ['./runtime/' + pinned.js.file]: pinned.js.sri, './demo.js': sri(demo), './boot.js': sri(boot) } });
  const mapHash = crypto.createHash('sha256').update(importMap).digest('base64');
  const csp = `default-src 'none'; script-src 'self' 'sha256-${mapHash}'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; base-uri 'none'; form-action 'none'`;
  const slug = config.entry.split('/')[1];
  emit('frame.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${csp}"><meta name="s3c-slug" content="${slug}"><meta name="s3c-lesson" content="./demo.js"><meta name="s3c-kit" content="${pinned.version}"><script type="importmap">${importMap}</script><link rel="stylesheet" href="./runtime/${pinned.css.file}" integrity="${pinned.css.sri}" crossorigin="anonymous"><script type="module" src="./boot.js" integrity="${sri(boot)}" crossorigin="anonymous"></script><title>Published lesson</title></head><body><div id="root"></div></body></html>`);
  return { entry: 'frame.html', files: files.sort(), testLog };
}
try {
  const [root, configFile, output, resultFile] = process.argv.slice(2);
  fs.writeFileSync(resultFile, JSON.stringify(await compile(root, JSON.parse(fs.readFileSync(configFile, 'utf8')), output)));
} catch (error) {
  console.error(error.message); if (error.stdout) console.error(error.stdout.toString()); process.exitCode = 1;
}
