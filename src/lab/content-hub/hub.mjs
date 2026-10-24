import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import ts from 'typescript';

const COMPILER = new URL('./compiler.mjs', import.meta.url).pathname;
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const identifier = value => {
  if (typeof value !== 'string' || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(value)) throw new Error('Invalid identifier');
  return value;
};
const safePath = value => {
  if (typeof value !== 'string' || !value || value.includes('\\') || value.includes('\0') || path.posix.isAbsolute(value) || value.split('/').some(p => !p || p === '.' || p === '..' || p.startsWith('.git'))) throw new Error('Invalid source path');
  return value;
};
const git = (repo, ...args) => execFileSync('git', ['-C', repo, ...args], {
  encoding: 'utf8', maxBuffer: 16 * 1024 * 1024,
  env: { PATH: process.env.PATH, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null' },
  stdio: ['ignore', 'pipe', 'pipe'],
});

export class ContentHub {
  constructor(root) {
    this.root = path.resolve(root);
    fs.mkdirSync(this.root, { recursive: true });
    this.db = new DatabaseSync(path.join(this.root, 'metadata.sqlite'));
    this.db.exec(`PRAGMA journal_mode=WAL;
      CREATE TABLE IF NOT EXISTS spaces(id TEXT PRIMARY KEY);
      CREATE TABLE IF NOT EXISTS revisions(space TEXT, sha TEXT, PRIMARY KEY(space,sha));
      CREATE TABLE IF NOT EXISTS jobs(id INTEGER PRIMARY KEY, space TEXT, sha TEXT, demo TEXT,
        input_key TEXT, status TEXT, artifact TEXT, log TEXT, milliseconds REAL,
        UNIQUE(space,sha,demo));
      CREATE TABLE IF NOT EXISTS artifacts(space TEXT, hash TEXT, manifest TEXT, PRIMARY KEY(space,hash));
      CREATE TABLE IF NOT EXISTS publications(space TEXT, demo TEXT, job INTEGER, generation INTEGER,
        PRIMARY KEY(space,demo));
      CREATE TABLE IF NOT EXISTS releases(id INTEGER PRIMARY KEY, space TEXT, demo TEXT, job INTEGER, generation INTEGER);
    `);
    this.compilerIdentity = hash(JSON.stringify({
      source: fs.readFileSync(COMPILER, 'utf8'), typescript: ts.version,
      node: process.versions.node, sdk: 'content-hub-dom-v1',
    }));
  }
  close() { this.db.close(); }
  repo(space) { return path.join(this.root, 'spaces', identifier(space)); }
  head(space) {
    if (!this.db.prepare('SELECT id FROM spaces WHERE id=?').get(space)) throw new Error('Unknown space');
    return git(this.repo(space), 'rev-parse', 'HEAD').trim();
  }
  createSpace(space) {
    const repo = this.repo(space);
    if (this.db.prepare('SELECT id FROM spaces WHERE id=?').get(space)) throw new Error('Space exists');
    if (fs.existsSync(repo)) throw new Error('Repository path exists');
    fs.mkdirSync(repo, { recursive: true });
    git(repo, 'init', '-b', 'main');
    git(repo, '-c', 'user.name=Content Hub', '-c', 'user.email=hub@example.invalid', 'commit', '--allow-empty', '-m', 'Create space');
    this.db.prepare('INSERT INTO spaces VALUES(?)').run(space);
    this.reconcile(space);
    return this.head(space);
  }
  snapshot(space, sha) {
    const files = new Map();
    for (const item of git(this.repo(space), 'ls-tree', '-rz', sha).split('\0').filter(Boolean)) {
      const [meta, file] = item.split('\t');
      const [mode, kind, object] = meta.split(' ');
      safePath(file);
      if (kind !== 'blob' || !['100644', '100755'].includes(mode)) throw new Error('Only regular source files supported');
      files.set(file, git(this.repo(space), 'cat-file', 'blob', object));
    }
    return files;
  }
  write(space, { expectedHead, scope, files, message = 'Scoped source write' }) {
    const head = this.head(space);
    if (expectedHead !== head) throw new Error('Stale HEAD; refresh before writing');
    safePath(scope);
    if (!/^(demos\/[a-z0-9-]+|packages\/[a-z0-9-]+\/[0-9]+\.[0-9]+\.[0-9]+|docs)$/.test(scope)) throw new Error('Invalid scope');
    if (!files || !Object.keys(files).length) throw new Error('Empty patch');
    const previous = this.snapshot(space, head);
    if (scope.startsWith('packages/') && [...previous.keys()].some(f => f.startsWith(scope + '/'))) throw new Error('Package version is immutable; write a new version');
    for (const [file, content] of Object.entries(files)) {
      safePath(file);
      if (!file.startsWith(scope + '/')) throw new Error('Write outside requested scope');
      if (typeof content !== 'string' && content !== null) throw new Error('Source must be text or null');
      if (content !== null && Buffer.byteLength(content) > 1024 * 1024) throw new Error('Source file too large');
    }
    const repo = this.repo(space);
    if (git(repo, 'status', '--porcelain').trim()) throw new Error('Repository has uncommitted changes');
    for (const [file, content] of Object.entries(files)) {
      const dest = path.join(repo, file);
      if (content === null) fs.rmSync(dest, { force: true });
      else { fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, content); }
    }
    git(repo, 'add', '--all', '--', scope);
    if (!git(repo, 'diff', '--cached', '--name-only').trim()) return { sha: head, jobs: [] };
    git(repo, '-c', 'user.name=Content Hub', '-c', 'user.email=hub@example.invalid', 'commit', '-m', message);
    const sha = this.head(space);
    this.reconcile(space);
    return { sha, jobs: this.jobs(space).filter(j => j.sha === sha) };
  }
  inputs(snapshot, demo) {
    identifier(demo);
    const prefix = `demos/${demo}/`;
    if (!snapshot.has(prefix + 'demo.json')) throw new Error('Missing demo manifest');
    const config = JSON.parse(snapshot.get(prefix + 'demo.json'));
    if (config.sdk !== 'content-hub-dom-v1') throw new Error('Unsupported host SDK');
    safePath(config.entry); safePath(config.test);
    const selected = new Map([...snapshot].filter(([f]) => f.startsWith(prefix)));
    const aliases = {};
    const visiting = new Set();
    const visited = new Set();
    const addPackage = (name, version) => {
      identifier(name);
      if (!/^[0-9]+\.[0-9]+\.[0-9]+$/.test(version)) throw new Error('Dependencies require exact versions');
      const base = `packages/${name}/${version}/`;
      const alias = `@space/${name}`;
      if (aliases[alias] && aliases[alias] !== base + 'index.ts') throw new Error('Conflicting transitive dependency pins');
      aliases[alias] = base + 'index.ts';
      if (visiting.has(base)) throw new Error('Dependency cycle');
      if (visited.has(base)) return;
      visiting.add(base);
      if (!snapshot.has(base + 'index.ts') || !snapshot.has(base + 'package.json')) throw new Error(`Missing pinned dependency ${name}@${version}`);
      for (const item of snapshot) if (item[0].startsWith(base)) selected.set(...item);
      for (const [child, pin] of Object.entries(JSON.parse(snapshot.get(base + 'package.json')).dependencies ?? {})) addPackage(child, pin);
      visiting.delete(base); visited.add(base);
    };
    for (const [name, version] of Object.entries(config.dependencies ?? {})) addPackage(name, version);
    if (!selected.has(prefix + config.entry) || !selected.has(prefix + config.test)) throw new Error('Missing entry or test');
    const key = hash(JSON.stringify({ compiler: this.compilerIdentity, files: [...selected].sort(([a], [b]) => a.localeCompare(b)) }));
    return { key, files: selected, config: { entry: prefix + config.entry, test: prefix + config.test, aliases } };
  }
  reconcile(space) {
    // Durable Git history is the outbox: a restart discovers commits not indexed before a crash.
    for (const sha of git(this.repo(space), 'rev-list', '--reverse', 'HEAD').trim().split('\n').filter(Boolean)) {
      if (this.db.prepare('SELECT sha FROM revisions WHERE space=? AND sha=?').get(space, sha)) continue;
      const snapshot = this.snapshot(space, sha);
      const parent = git(this.repo(space), 'rev-list', '--parents', '-n', '1', sha).trim().split(' ')[1];
      const previous = parent ? this.snapshot(space, parent) : new Map();
      this.db.exec('BEGIN IMMEDIATE');
      try {
        for (const file of snapshot.keys()) {
          const match = /^demos\/([^/]+)\/demo\.json$/.exec(file);
          if (!match) continue;
          const demo = identifier(match[1]);
          let current, before;
          try { current = this.inputs(snapshot, demo); } catch (error) {
            this.db.prepare('INSERT OR IGNORE INTO jobs(space,sha,demo,status,log) VALUES(?,?,?,?,?)').run(space, sha, demo, 'failed', error.message);
            continue;
          }
          try { before = this.inputs(previous, demo); } catch { /* New or previously invalid demo. */ }
          if (before?.key === current.key) continue;
          this.db.prepare('INSERT OR IGNORE INTO jobs(space,sha,demo,input_key,status) VALUES(?,?,?,?,?)').run(space, sha, demo, current.key, 'queued');
        }
        this.db.prepare('INSERT INTO revisions VALUES(?,?)').run(space, sha);
        this.db.exec('COMMIT');
      } catch (error) { this.db.exec('ROLLBACK'); throw error; }
    }
  }
  jobs(space) { identifier(space); return this.db.prepare('SELECT * FROM jobs WHERE space=? ORDER BY id').all(space); }
  work() {
    // One local worker only. Recover jobs interrupted by process exit; artifacts are immutable.
    this.db.exec("UPDATE jobs SET status='queued' WHERE status='building'");
    const completed = [];
    for (const job of this.db.prepare("SELECT * FROM jobs WHERE status='queued' ORDER BY id").all()) {
      const start = performance.now();
      this.db.prepare("UPDATE jobs SET status='building' WHERE id=?").run(job.id);
      let scratch;
      try {
        const input = this.inputs(this.snapshot(job.space, job.sha), job.demo);
        if (input.key !== job.input_key) throw new Error('Compiler inputs changed; enqueue under current compiler');
        const cached = this.db.prepare("SELECT artifact FROM jobs WHERE space=? AND demo=? AND input_key=? AND status IN ('ready','cached') AND artifact IS NOT NULL LIMIT 1").get(job.space, job.demo, job.input_key);
        let artifact, status = 'ready', log;
        if (cached) {
          this.artifact(job.space, cached.artifact); // Verify bytes before trusting a cache hit.
          artifact = cached.artifact; status = 'cached'; log = 'Reused successful test/build for identical inputs';
        } else {
          const workRoot = path.join(this.root, 'work'); fs.mkdirSync(workRoot, { recursive: true });
          scratch = fs.mkdtempSync(path.join(workRoot, 'build-'));
          const source = path.join(scratch, 'source'), output = path.join(scratch, 'output');
          for (const [file, content] of input.files) {
            const dest = path.join(source, file); fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, content);
          }
          const configFile = path.join(scratch, 'config.json'), resultFile = path.join(scratch, 'result.json');
          fs.writeFileSync(configFile, JSON.stringify(input.config));
          execFileSync(process.execPath, [COMPILER, source, configFile, output, resultFile], {
            timeout: 30000, maxBuffer: 1024 * 1024, env: { PATH: process.env.PATH, NODE_ENV: 'test' }, stdio: ['ignore', 'pipe', 'pipe'],
          });
          const result = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
          const files = Object.fromEntries(result.files.map(f => [f, fs.readFileSync(path.join(output, f))]));
          const manifest = { entry: result.entry, sdk: 'content-hub-dom-v1', files: Object.fromEntries(Object.entries(files).map(([f, bytes]) => [f, { sha256: hash(bytes), bytes: bytes.length }])) };
          artifact = hash(JSON.stringify(manifest));
          const dest = path.join(this.root, 'objects', job.space, artifact);
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          if (!fs.existsSync(dest)) {
            const stage = path.join(scratch, 'artifact'); fs.mkdirSync(stage);
            for (const [file, bytes] of Object.entries(files)) {
              const target = path.join(stage, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, bytes);
            }
            fs.renameSync(stage, dest);
          }
          this.db.prepare('INSERT OR IGNORE INTO artifacts VALUES(?,?,?)').run(job.space, artifact, JSON.stringify(manifest));
          log = result.testLog;
        }
        this.db.prepare('UPDATE jobs SET status=?,artifact=?,log=?,milliseconds=? WHERE id=?').run(status, artifact, log, performance.now() - start, job.id);
      } catch (error) {
        const log = error.stderr?.toString() || `${error.message}\nstatus=${error.status ?? ''} signal=${error.signal ?? ''} code=${error.code ?? ''}`;
        this.db.prepare("UPDATE jobs SET status='failed',log=?,milliseconds=? WHERE id=?").run(log, performance.now() - start, job.id);
      } finally { if (scratch) fs.rmSync(scratch, { recursive: true, force: true }); }
      completed.push(this.db.prepare('SELECT * FROM jobs WHERE id=?').get(job.id));
    }
    return completed;
  }
  artifact(space, artifact) {
    identifier(space);
    if (!/^[a-f0-9]{64}$/.test(artifact)) throw new Error('Invalid artifact hash');
    const record = this.db.prepare('SELECT manifest FROM artifacts WHERE space=? AND hash=?').get(space, artifact);
    if (!record) throw new Error('Unknown artifact');
    const manifest = JSON.parse(record.manifest);
    if (hash(record.manifest) !== artifact) throw new Error('Manifest integrity failure');
    for (const [file, meta] of Object.entries(manifest.files)) {
      safePath(file);
      if (hash(fs.readFileSync(path.join(this.root, 'objects', space, artifact, file))) !== meta.sha256) throw new Error('Artifact integrity failure');
    }
    return manifest;
  }
  publication(space, demo) {
    identifier(space); identifier(demo);
    return this.db.prepare('SELECT p.*,j.sha,j.artifact FROM publications p JOIN jobs j ON j.id=p.job WHERE p.space=? AND p.demo=?').get(space, demo) ?? null;
  }
  publish(space, demo, jobId, { expectedGeneration, rollback = false } = {}) {
    identifier(space); identifier(demo);
    const job = this.db.prepare("SELECT * FROM jobs WHERE id=? AND space=? AND demo=? AND status IN ('ready','cached')").get(jobId, space, demo);
    if (!job) throw new Error('No successful build for this space and demo');
    this.artifact(space, job.artifact);
    if (!rollback) {
      const latest = this.inputs(this.snapshot(space, this.head(space)), demo);
      if (latest.key !== job.input_key) throw new Error('Build is stale; use explicit rollback to publish historical inputs');
    }
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const generation = this.publication(space, demo)?.generation ?? 0;
      if (expectedGeneration !== generation) throw new Error('Stale publication generation');
      this.db.prepare('INSERT INTO publications VALUES(?,?,?,?) ON CONFLICT(space,demo) DO UPDATE SET job=excluded.job,generation=excluded.generation').run(space, demo, job.id, generation + 1);
      this.db.prepare('INSERT INTO releases(space,demo,job,generation) VALUES(?,?,?,?)').run(space, demo, job.id, generation + 1);
      this.db.exec('COMMIT');
      return this.publication(space, demo);
    } catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
}
