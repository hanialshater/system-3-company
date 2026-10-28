// Static source index for the catalogue experiment, not production authorization.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';

export const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
export function catalogue(root) {
  return fs.readdirSync(path.join(root, 'src/demos')).sort().flatMap(domain => {
    const dir = path.join(root, 'src/demos', domain);
    if (!fs.statSync(dir).isDirectory()) return [];
    return fs.readdirSync(dir).sort().flatMap(slug => {
      const directory = path.join(dir, slug), entry = path.join(directory, 'Demo.tsx');
      if (!fs.existsSync(entry) || !fs.existsSync(path.join(directory, 'meta.json'))) return [];
      return [{ id: `${domain}/${slug}`, domain, slug, directory, entry, synthetic: slug.startsWith('__capacity-') }];
    });
  });
}
export class CatalogueIndex {
  constructor(root, compilerIdentity) {
    this.root = path.resolve(root); this.compilerIdentity = compilerIdentity;
    this.direct = new Map(); this.reverse = new Map(); this.hashes = new Map(); this.records = new Map(); this.unresolved = [];
    this.options = { moduleResolution: ts.ModuleResolutionKind.Bundler, baseUrl: root, paths: { '@/*': ['src/*'] }, resolveJsonModule: true, allowJs: true };
    for (const demo of catalogue(root)) {
      const files = new Set(); this.collect(demo.entry, files);
      // Include all demo-local files for conservative invalidation of assets/CSS.
      const walk = dir => { for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const f = path.join(dir, e.name); if (e.isDirectory()) walk(f); else if (e.isFile() && e.name !== 'meta.json') files.add(f);
      } }; walk(demo.directory);
      const relative = [...files].map(f => path.relative(root, f)).sort();
      this.records.set(demo.id, { ...demo, files: relative });
      for (const f of relative) { if (!this.reverse.has(f)) this.reverse.set(f, new Set()); this.reverse.get(f).add(demo.id); }
    }
  }
  collect(file, seen) {
    if (seen.has(file)) return; seen.add(file);
    if (!this.direct.has(file)) {
      const deps = [];
      if (/\.(?:tsx?|jsx?|mjs|cjs)$/.test(file)) {
        for (const imp of ts.preProcessFile(fs.readFileSync(file, 'utf8'), true, true).importedFiles) {
          if (!imp.fileName.startsWith('.') && !imp.fileName.startsWith('@/')) continue;
          const resolved = ts.resolveModuleName(imp.fileName, file, this.options, ts.sys).resolvedModule?.resolvedFileName;
          const candidate = resolved ?? (imp.fileName.startsWith('@/') ? path.join(this.root, 'src', imp.fileName.slice(2)) : path.resolve(path.dirname(file), imp.fileName));
          if (fs.existsSync(candidate) && fs.statSync(candidate).isFile() && candidate.startsWith(this.root + path.sep)) deps.push(candidate);
          else this.unresolved.push({ file: path.relative(this.root, file), import: imp.fileName });
        }
      }
      this.direct.set(file, deps);
    }
    for (const dep of this.direct.get(file)) this.collect(dep, seen);
  }
  digest(file, overrides) {
    if (overrides?.has(file)) return sha256(overrides.get(file));
    if (!this.hashes.has(file)) this.hashes.set(file, sha256(fs.readFileSync(path.join(this.root, file))));
    return this.hashes.get(file);
  }
  key(id, overrides = new Map()) {
    const demo = this.records.get(id), prefix = path.relative(this.root, demo.directory) + '/';
    const files = demo.files.map(f => [f.startsWith(prefix) ? '$demo/' + f.slice(prefix.length) : f, this.digest(f, overrides)]).sort(([a],[b]) => a < b ? -1 : a > b ? 1 : 0);
    return sha256(JSON.stringify([this.compilerIdentity, files]));
  }
  affected(paths) {
    return [...new Set(paths.flatMap(p => [...(this.reverse.get(p) ?? [])]))].sort();
  }
}
