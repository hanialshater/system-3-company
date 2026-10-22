// K24: durable stage artifacts. Found live in M7 (M7-STATUS.md "Found live" 1): the walkthrough sheets lived only in
// an order's worktree (the company gitignores artifacts/), so once the M6 worktrees were removed to free disk the
// design review saw none. A stage may now name the files it leaves for later readers:
//   artifacts: { paths: ["artifacts/walkthroughs/${slug}/", "test-results/${task}/qa-report.json"], required: true, maxMB: 50 }
// paths are globs relative to the order's workdir (packGlobRe: `**/` any depth, `*` and `?` in one segment, a trailing
// `/` the whole folder) and may use ${slug} ${task} ${run} ${n} ${port}. When the stage passes (a code stage's pass, or
// an agent's leave with pass, after its post-check), code copies the matching files into the run's store,
//   <live>/artifacts/<order>/<stage>/v<loops>/<workdir-relative path>   (every loop's copy is kept; v<loops>-2 … if a
//                                                                         loop passes the stage again, after a retry)
// atomically (a temp folder renamed into place), with a manifest beside it (<stage>/v<loops>.json: each file's path,
// bytes and sha256) and an `artifacts` event naming the same. Links, never followed: <order>/latest/<stage> → the
// newest copy of that stage, and by-slug/<slug> → the order's folder (a ritual that judges lessons reads them by slug).
// Rules: a symlink in the workdir is never followed or copied (a link out of the workdir is not the work's file); .git
// and node_modules are never entered; the files together are at most maxMB (default 50: the copy runs under the state
// lock); `required: true` with no file matching (or over the cap, or a copy that failed) is a stage-error for a code
// stage (held, not signed, until `supervisor.mjs retry`) and a refused leave for an agent's stage (the run stays open,
// as a failed post-check); not required, it is an `artifacts` event with the reason and the stage still passes.
// Read back as ${artifacts} (<live>/artifacts/<order>/latest: each stage's newest copy under its name),
// ${artifacts_of:<stage>} (that stage's newest copy, once there is one) and ${artifacts_root} (<live>/artifacts), in
// cmds, briefs and packs (a pack include that starts with one of them lists the store's files by absolute path).
// Workspace cleanup never touches the store (workspace.mjs cleanup refuses a path on it), and nothing here deletes.
// Why the store and not the integration checkout (decided for System 3 Company, plan 2026-10-21 K24): the company
// gitignores artifacts/ (its walkthroughs are untracked by its own rule, while it does track 154 review PNGs under
// company/reviews/ and company/design/), a gitignored copy in the integration worktree is no more durable than the
// order's (both are removed with the run's worktrees) and never reaches a ritual's own worktree, and committing sheets
// into company/reviews/<slug>/ would change the company's convention, which is the company's to decide. So the run's
// store holds them, outside every checkout, and rituals and packs name it.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { LIVE, STATE } from "./state.mjs";
import { packGlobRe } from "./workspace.mjs";

export const ARTIFACT_KEYS = ["paths", "required", "maxMB"];
export const ARTIFACT_VARS = ["slug", "task", "run", "n", "port"];
export const DEFAULT_MAX_MB = 50, MAX_MB = 1024, MAX_FILES = 2000, EVENT_FILES = 100;
const SKIP_DIR = (n) => n === ".git" || n === "node_modules";
const WILD = /[*?[]/;
/** The run's artifact store (under the live dir, outside every checkout); a second state file in the same live dir
 *  (META_STATE, as jobs.mjs JOBS) gets its own, <live>/artifacts/<state name>/, since its order ids are its own. */
export const storeRoot = () => { const n = path.basename(STATE).replace(/\.json$/, ""); return n === "state" ? path.join(LIVE, "artifacts") : path.join(LIVE, "artifacts", n); };
export const orderStore = (o) => path.join(storeRoot(), String(o.id));
const fillVars = (s, vars) => s.replace(/\$\{([a-z_]+)\}/g, (m, k) => (ARTIFACT_VARS.includes(k) && k in vars ? vars[k] : m));

/** Why a stage's `artifacts` is invalid, or null. */
export function artifactsProblem(a, s = {}) {
  if (a == null) return null;
  if (typeof a !== "object" || Array.isArray(a)) return "artifacts is {paths, required, maxMB}";
  const bad = Object.keys(a).filter((k) => !ARTIFACT_KEYS.includes(k));
  if (bad.length) return `artifacts has unknown key${bad.length > 1 ? "s" : ""} ${bad.join(", ")} (${ARTIFACT_KEYS.join(", ")})`;
  if (!(Array.isArray(a.paths) && a.paths.length && a.paths.length <= 50 && a.paths.every((g) => typeof g === "string" && g.trim() && !g.startsWith("/") && !g.split("/").includes("..") && !g.includes("\0")))) return "artifacts.paths is a list (1-50) of workdir-relative globs (no leading /, no ..)";
  for (const g of a.paths) { const v = [...g.matchAll(/\$\{([^}]*)\}/g)].map((m) => m[1]).find((k) => !ARTIFACT_VARS.includes(k)); if (v != null) return `artifacts.paths: unknown variable \${${v}} in ${g} (known: ${ARTIFACT_VARS.join(", ")})`; }
  if (a.required != null && typeof a.required !== "boolean") return "artifacts.required is true or false";
  if (a.maxMB != null && !(typeof a.maxMB === "number" && a.maxMB > 0 && a.maxMB <= MAX_MB)) return `artifacts.maxMB is a number of megabytes above 0, at most ${MAX_MB}`;
  if (s.signer === "founder") return "artifacts are for a stage code or an agent signs (a founder's approval leaves no files)";
  return null;
}

const real = (p) => { try { return fs.realpathSync(p); } catch { return null; } };
const lst = (p) => { try { return fs.lstatSync(p); } catch { return null; } };
/** The static folder a glob starts in (its segments before the first wildcard one), and whether the glob is one file. */
function globBase(g) {
  const segs = g.replace(/\/+$/, "").split("/").filter(Boolean), out = [];
  for (const x of segs) { if (WILD.test(x)) break; out.push(x); }
  return { base: out, exact: out.length === segs.length && !g.endsWith("/") };
}
/** The workdir files the globs name: { files: [{rel, abs, size}], skipped: [why] }. Never follows a symlink: each
 *  segment down to a glob's folder must be a real folder of the workdir, and a link met in a walk is skipped. */
export function matchFiles(root, globs) {
  const files = new Map(), skipped = [], rroot = real(root);
  if (!rroot || !lst(root)?.isDirectory()) return { files: [], skipped: [`no workdir ${root}`] };
  for (const g of globs) {
    const re = packGlobRe(g), { base, exact } = globBase(g);
    let at = root, ok = true;
    for (const [i, x] of base.entries()) {
      at = path.join(at, x);
      const st = lst(at);
      if (!st) { ok = false; break; }
      if (st.isSymbolicLink()) { skipped.push(`${base.slice(0, i + 1).join("/")}: a symlink (never followed)`); ok = false; break; }
      if (st.isFile() && i === base.length - 1 && exact) { if (!files.has(base.join("/"))) files.set(base.join("/"), { rel: base.join("/"), abs: at, size: st.size }); ok = false; break; }
      if (!st.isDirectory() || SKIP_DIR(x)) { ok = false; break; }
    }
    if (!ok) continue;
    const walk = (rel) => {
      let ents; try { ents = fs.readdirSync(path.join(root, rel), { withFileTypes: true }); } catch { return; }
      for (const e of ents.sort((a, b) => a.name.localeCompare(b.name))) {
        if (files.size >= MAX_FILES) return;
        const r = rel ? `${rel}/${e.name}` : e.name;
        if (e.isSymbolicLink()) { skipped.push(`${r}: a symlink (never followed)`); continue; }
        if (e.isDirectory()) { if (!SKIP_DIR(e.name)) walk(r); continue; }
        if (!e.isFile() || !re.test(r) || files.has(r)) continue;
        const st = lst(path.join(root, r));
        if (st?.isFile()) files.set(r, { rel: r, abs: path.join(root, r), size: st.size });
      }
    };
    walk(base.join("/"));
  }
  return { files: [...files.values()].sort((a, b) => a.rel.localeCompare(b.rel)), skipped: [...new Set(skipped)] };
}

/** Replace (or make) symlink `at` → `target`, atomically (a temp link renamed over it). */
function relink(at, target) {
  fs.mkdirSync(path.dirname(at), { recursive: true });
  const tmp = `${at}.tmp-${process.pid}-${crypto.randomBytes(4).toString("hex")}`;
  fs.symlinkSync(target, tmp);
  fs.renameSync(tmp, at);
}

/** Copy stage `sd`'s artifacts of order `o` into the store (see the header). Returns null (no artifacts on the stage),
 *  { ok: true, dir, files, bytes } (dir null when nothing matched and none was required), or { stageError: true, why }
 *  when the stage may not pass. Logs one `artifacts` event either way. */
export function storeArtifacts(co, o, sd, { stage = sd?.stage ?? o.stage } = {}) {
  const a = sd?.artifacts;
  if (!a) return null;
  const root = o.workdir ?? path.join(LIVE, "work", o.task ?? "");
  const vars = { ...(o.workspace?.vars ?? {}), task: o.task ?? "", slug: o.slug ?? o.task ?? "" };
  const globs = a.paths.map((g) => fillVars(g, vars));
  const cap = (a.maxMB ?? DEFAULT_MAX_MB) * 2 ** 20;
  const base = { type: "artifacts", order: o.id, stage, loops: o.loops };
  const fail = (why, extra = {}) => {
    co.log.add({ ...base, error: why, required: !!a.required, files: [], ...extra });
    return a.required ? { stageError: true, why: `artifacts: ${why}` } : { ok: true, dir: null, files: [], bytes: 0, error: why };
  };
  let m;
  try { m = matchFiles(root, globs); } catch (e) { return fail(`reading ${root}: ${e.message}`); }
  const bytes = m.files.reduce((x, f) => x + f.size, 0), skipped = m.skipped.length ? { skipped: m.skipped.slice(0, 20) } : {};
  if (!m.files.length) return a.required ? fail(`required, but no file in ${root} matches ${globs.join(", ")}`, skipped) : (co.log.add({ ...base, files: [], count: 0, bytes: 0, note: `nothing matches ${globs.join(", ")}`, ...skipped }), { ok: true, dir: null, files: [], bytes: 0 });
  if (m.files.length >= MAX_FILES) return fail(`${m.files.length}+ files match ${globs.join(", ")} (at most ${MAX_FILES - 1})`, skipped);
  if (bytes > cap) return fail(`${(bytes / 2 ** 20).toFixed(1)} MB in ${m.files.length} files is over maxMB ${a.maxMB ?? DEFAULT_MAX_MB}`, skipped);
  const sdir = path.join(orderStore(o), stage);
  let name = `v${o.loops}`;
  for (let k = 2; fs.existsSync(path.join(sdir, name)); k++) name = `v${o.loops}-${k}`;
  const dir = path.join(sdir, name), tmp = path.join(sdir, `.${name}.tmp-${process.pid}-${crypto.randomBytes(4).toString("hex")}`);
  const list = [];
  try {
    for (const f of m.files) {
      const buf = fs.readFileSync(f.abs);
      const to = path.join(tmp, f.rel);
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.writeFileSync(to, buf);
      list.push({ path: f.rel, bytes: buf.length, sha256: crypto.createHash("sha256").update(buf).digest("hex") });
    }
    const manifest = { order: o.id, task: o.task ?? null, slug: o.slug ?? null, stage, loops: o.loops, version: name, from: root, at: new Date().toISOString(), files: list };
    fs.writeFileSync(path.join(sdir, `.${name}.json.tmp`), JSON.stringify(manifest, null, 1) + "\n");
    fs.renameSync(tmp, dir); // the copy appears whole, or not at all
    fs.renameSync(path.join(sdir, `.${name}.json.tmp`), path.join(sdir, `${name}.json`));
    relink(path.join(orderStore(o), "latest", stage), path.join("..", stage, name));
    const key = o.slug ?? o.task;
    if (typeof key === "string" && /^[\w.-]+$/.test(key)) relink(path.join(storeRoot(), "by-slug", key), path.join("..", String(o.id)));
  } catch (e) {
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch {} // only our own temp folder
    return fail(`copy into ${sdir} failed: ${e.message}`, skipped);
  }
  const total = list.reduce((x, f) => x + f.bytes, 0);
  o.artifacts ??= {};
  const prev = o.artifacts[stage]?.versions ?? [];
  o.artifacts[stage] = { latest: name, dir, versions: [...prev, { v: name, loops: o.loops, files: list.length, bytes: total, t: co.engine.clock.now() }].slice(-20) };
  co.log.add({ ...base, dir, version: name, count: list.length, bytes: total, files: list.slice(0, EVENT_FILES), ...(list.length > EVENT_FILES ? { truncated: true } : {}), ...skipped });
  return { ok: true, dir, files: list, bytes: total };
}

/** ${artifacts}, ${artifacts_root} and ${artifacts_of:<stage>} for order `o` (state.mjs storeVars). */
export function artifactVars(o) {
  const out = { artifacts: path.join(orderStore(o ?? {}), "latest"), artifacts_root: storeRoot() };
  for (const [st, x] of Object.entries(o?.artifacts ?? {})) if (x?.dir) out[`artifacts_of:${st}`] = x.dir;
  return out;
}

/** Is `p` the store, inside it, or a folder that holds it? (workspace cleanup never removes such a path) */
export function touchesStore(p) {
  const s = real(storeRoot()) ?? path.resolve(storeRoot()), r = real(p) ?? path.resolve(p);
  return r === s || r.startsWith(s + path.sep) || s.startsWith(r + path.sep);
}

/** The store files a pack include names (an include that starts with the store: ${artifacts}, ${artifacts_of:…},
 *  ${artifacts_root}), by absolute path; the store's own links (latest/, by-slug/) are followed, never out of it. */
export function storeFiles(glob, exclude = [], max = 400) {
  const sroot = real(storeRoot());
  if (!sroot || !path.isAbsolute(glob)) return [];
  const re = packGlobRe(glob), { base } = globBase(glob.slice(1)), out = [];
  const start = "/" + base.join("/");
  const inside = (p) => { const r = real(p); return r && (r === sroot || r.startsWith(sroot + path.sep)); };
  if (!inside(start)) return [];
  const walk = (abs, depth) => {
    if (out.length >= max || depth > 12) return;
    let st; try { st = fs.statSync(abs); } catch { return; }
    if (!inside(abs)) return;
    if (st.isFile()) { if (re.test(abs) && !exclude.some((x) => x.test(abs))) out.push(abs); return; }
    if (!st.isDirectory()) return;
    let ents; try { ents = fs.readdirSync(abs).filter((n) => !n.startsWith(".")).sort(); } catch { return; }
    for (const n of ents) walk(path.join(abs, n), depth + 1);
  };
  walk(start, 0);
  return out;
}
