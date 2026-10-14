// Tool stamp (W-783): which commit of a measuring tool produced a result, and whether it was the committed copy.
// A verdict recorded by a private or edited copy of a tool is not a verdict. Results carry this stamp so a
// reader can tell: `clean: true` means every stamped file is byte-identical to HEAD and tracked by git.
//
//   gitStamp(["tools/reveal-fit.mjs"], { from: <any path inside the repo> })
//     -> { files, head, commit, blobs: {path: sha}, modified: [paths], clean, root } or { error, clean: false }
//
// commit = the last commit that touched any of the files (git log -1), head = HEAD when the tool ran,
// modified = `git status --porcelain` entries for the files (staged, unstaged or untracked).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const git = (cwd, args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

export function gitStamp(given, { from = process.cwd() } = {}) {
  const dir = fs.existsSync(from) && fs.statSync(from).isDirectory() ? from : path.dirname(from);
  let root;
  try { root = git(dir, ["rev-parse", "--show-toplevel"]); } catch { return { files: given, error: "not inside a git repository", clean: false }; }
  // Absolute paths become repo-relative; a file outside the repository cannot be stamped.
  const files = given.map((f) => (path.isAbsolute(f) ? path.relative(fs.realpathSync(root), fs.realpathSync(f)) : f));
  if (files.some((f) => f.startsWith(".."))) return { files: given, error: "file is outside the git repository", clean: false };
  try {
    const head = git(root, ["rev-parse", "HEAD"]);
    const commit = git(root, ["log", "-1", "--format=%H", "--", ...files]) || null;
    const tracked = git(root, ["ls-files", "--", ...files]).split("\n").filter(Boolean);
    // -z: NUL-separated "XY path" entries, untrimmed (a leading space in XY is significant).
    const raw = execFileSync("git", ["status", "--porcelain", "-z", "--untracked-files=all", "--", ...files], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    const modified = raw.split("\0").filter((l) => /^.. /.test(l)).map((l) => l.slice(3));
    const blobs = {};
    for (const f of tracked) { try { blobs[f] = git(root, ["hash-object", "--", f]); } catch { /* deleted in the working tree */ } }
    const clean = tracked.length > 0 && commit !== null && modified.length === 0;
    return { files, head, commit, blobs, modified, clean, root };
  } catch (e) {
    return { files, error: `git failed: ${String(e.message || e).split("\n")[0]}`, clean: false };
  }
}
