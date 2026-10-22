// lib/build-stamp.mjs: "is this dist the build of the tree in front of me?" for qa.mjs --no-build and the standalone
// walkthrough.mjs (review 2026-10-22, findings 1 and 2: both accepted any dist with a BUILD_ID, so a lesson that
// throws on render passed stage 3 with a pass record, and stage 4 stamped HEAD over a transcript of older code).
// Plan §2 row 3 (the QA record is for meta.version at the worktree state) and row 4 ("transcript.md + sheet.png exist
// for the current worktree SHA") both need the build to be of the current tree; next writes nothing that says which
// sources it compiled (BUILD_ID is a random id), so qa.mjs writes a source stamp into the dist after a build and the
// consumers recompute and compare it.
//
// The source key is a sha256 over every build-input path and its content id:
//   - tracked files: `git ls-tree -r HEAD` blob ids (no file reads: 17k files in about 0.1 s);
//   - working-tree changes: `git status --porcelain -z --no-renames --untracked-files=all` (untracked but not
//     ignored files count: next compiles them), each hashed from disk (deleted = "deleted", symlink = its target);
//   - the lesson's own meta.json is hashed from disk with `evidence` dropped, because company qa-record writes
//     evidence.qa into it AFTER the build (tools/company.mjs cmdQaRecord), and the walk (stage 4) runs after that.
// Excluded (written by the pipeline after a build, or derived by the build itself):
//   company/reviews/ (QA records, reviews), company/ops/ (runtime state: events, board, claims, slots),
//   .claude/ (agents, settings), node_modules (the order worktree's symlink shows as untracked: .gitignore has
//   `node_modules/`, which matches directories only), src/demos/*.generated.ts (npm run build regenerates them from
//   src/demos via `company registry`, which is in the key), and qa.mjs BUILD_SIDE_EFFECTS (tsconfig.json: next adds
//   `<dist>/types/**`; src/data/editorial-profiles.account.json: regenerated from company/evaluation, in the key).
// Over-inclusion only forces a rebuild (safe); a missed input would be a false pass, so the list excludes only
// what is named above. Ignored files (.next*/, artifacts/, test-results/, .serve/) never appear in git status.
// Env (NEXT_PUBLIC_*) is inlined at build time; it is recorded in the stamp for the reader, not compared.

import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { execFileSync } from "node:child_process";

export const STAMP_FILE = "s3meta-build-stamp.json";
export const BUILD_SIDE_EFFECTS = ["tsconfig.json", "src/data/editorial-profiles.account.json"];

const sha = (s) => crypto.createHash("sha256").update(s).digest("hex");
const gitOut = (repo, args) => execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 256 * 1024 * 1024 });

/** Paths that are not build inputs for the key (see header). */
export function excluded(p) {
  return (
    p.startsWith("company/reviews/") ||
    p.startsWith("company/ops/") ||
    p.startsWith(".claude/") ||
    p === "node_modules" ||
    p.startsWith("node_modules/") ||
    /^src\/demos\/[^/]+\.generated\.ts$/.test(p) ||
    BUILD_SIDE_EFFECTS.includes(p)
  );
}

/** meta.json content id without `evidence` (qa-record's post-build write). Unparseable → raw bytes. */
export function metaId(text) {
  try {
    const m = JSON.parse(text);
    delete m.evidence;
    return "meta:" + sha(JSON.stringify(m));
  } catch {
    return "raw:" + sha(text);
  }
}

/** Content id of a working-tree path: sha256 of a file, a symlink's target, "dir", or "deleted". */
export function diskId(abs) {
  let st;
  try {
    st = fs.lstatSync(abs);
  } catch {
    return "deleted";
  }
  if (st.isSymbolicLink()) return "link:" + fs.readlinkSync(abs);
  if (st.isDirectory()) return "dir"; // a nested repo shows as `dir/` in status; its contents are not ours to key
  return "sha256:" + sha(fs.readFileSync(abs));
}

/** Working-tree changes to build inputs: {path: diskId} (tracked edits, deletions, untracked files one by one). */
export function workingChanges(repo) {
  const dirty = {};
  for (const rec of gitOut(repo, ["status", "--porcelain=v1", "-z", "--no-renames", "--untracked-files=all"]).split("\0")) {
    if (!rec) continue;
    const p = rec.slice(3).replace(/\/$/, "");
    if (!excluded(p)) dirty[p] = diskId(path.join(repo, p));
  }
  return dirty;
}

/**
 * The current source state: {key, head, dirty: {path: id}, files}. lessonRel = src/demos/<domain>/<slug>; its
 * meta.json is always read from disk and normalised (metaId).
 */
export function sourceState(repo, lessonRel) {
  const entries = new Map();
  const head = gitOut(repo, ["rev-parse", "HEAD"]).trim();
  for (const rec of gitOut(repo, ["ls-tree", "-r", "-z", "--full-tree", "HEAD"]).split("\0")) {
    if (!rec) continue;
    const tab = rec.indexOf("\t");
    const p = rec.slice(tab + 1);
    if (excluded(p)) continue;
    const [mode, , id] = rec.slice(0, tab).split(" ");
    entries.set(p, `${mode}:${id}`);
  }
  const dirty = workingChanges(repo);
  for (const [p, id] of Object.entries(dirty)) entries.set(p, id);
  if (lessonRel) {
    const mp = `${lessonRel}/meta.json`;
    entries.set(mp, fs.existsSync(path.join(repo, mp)) ? metaId(fs.readFileSync(path.join(repo, mp), "utf8")) : "deleted");
    if (dirty[mp]) {
      // An evidence-only edit (qa-record's link) is not a change; keep `dirty` to real ones so changedSince is exact.
      let atHead = null;
      try {
        atHead = metaId(gitOut(repo, ["show", `HEAD:${mp}`]));
      } catch {}
      if (atHead === entries.get(mp)) delete dirty[mp];
      else dirty[mp] = entries.get(mp);
    }
  }
  const lines = [...entries].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([p, id]) => `${p}\0${id}`);
  return { key: sha(lines.join("\n")), head, dirty, files: entries.size };
}

const stampFile = (repo, dist) => path.join(repo, dist, STAMP_FILE);
export const readBuildId = (repo, dist) => {
  try {
    return fs.readFileSync(path.join(repo, dist, "BUILD_ID"), "utf8").trim();
  } catch {
    return null;
  }
};

export function clearBuildStamp(repo, dist) {
  fs.rmSync(stampFile(repo, dist), { force: true });
}

/** Written by qa.mjs after a successful build whose source state did not change while it ran. */
export function writeBuildStamp(repo, dist, state) {
  const stamp = {
    buildId: readBuildId(repo, dist),
    key: state.key,
    head: state.head,
    dirty: state.dirty,
    files: state.files,
    builtAt: new Date().toISOString(),
    env: Object.fromEntries(Object.entries(process.env).filter(([k]) => k.startsWith("NEXT_PUBLIC_"))),
  };
  fs.writeFileSync(stampFile(repo, dist), JSON.stringify(stamp, null, 2) + "\n");
  return stamp;
}

/** Paths whose content differs between a stamp and the current state (for the finding text; best effort). */
export function changedSince(repo, stamp, cur) {
  const out = new Set();
  try {
    if (stamp.head !== cur.head) for (const p of gitOut(repo, ["diff", "--name-only", "--no-renames", stamp.head, cur.head]).split("\n")) if (p && !excluded(p)) out.add(p);
  } catch {
    out.add(`(stamp head ${String(stamp.head).slice(0, 9)} not comparable with HEAD)`);
  }
  for (const p of new Set([...Object.keys(stamp.dirty ?? {}), ...Object.keys(cur.dirty)])) if ((stamp.dirty ?? {})[p] !== cur.dirty[p]) out.add(p);
  return [...out];
}

/**
 * Is <dist> the build of the current tree? {ok, problem, stamp, state, changed}. A problem is one sentence naming
 * why not: no build, no stamp (built by something other than qa.mjs), a rebuild after the stamp, or changed sources.
 */
export function checkBuild(repo, dist, lessonRel) {
  const buildId = readBuildId(repo, dist);
  if (!buildId) return { ok: false, problem: `no build at ${dist}/BUILD_ID`, missing: true };
  let stamp = null;
  try {
    stamp = JSON.parse(fs.readFileSync(stampFile(repo, dist), "utf8"));
  } catch {}
  if (!stamp) return { ok: false, problem: `${dist} has no source stamp (${STAMP_FILE}): it was not built by qa.mjs, so nothing says which sources it holds` };
  if (stamp.buildId !== buildId) return { ok: false, stamp, problem: `${dist} was rebuilt after its source stamp (BUILD_ID ${buildId}, stamp ${stamp.buildId})` };
  const state = sourceState(repo, lessonRel);
  if (state.key === stamp.key) return { ok: true, stamp, state, changed: [] };
  const changed = changedSince(repo, stamp, state);
  return { ok: false, stamp, state, changed, problem: `${dist} is stale: sources changed since it was built (${changed.slice(0, 8).join(", ") || "key differs"}${changed.length > 8 ? `, +${changed.length - 8} more` : ""})` };
}
