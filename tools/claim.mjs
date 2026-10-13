#!/usr/bin/env node
// Work queue for builders: claim the next brief with an exclusive lock, so two agents never build the
// same lesson (founder, 2026-10-13). Locks live in the MAIN checkout (company/ops/claims/), so builders
// in worktrees share them. A lock is created with O_EXCL: if two agents race, exactly one wins.
//
//   node /home/user/system-3-company/tools/claim.mjs next <domain> --agent="<label>"   → prints a slug, or NONE
//        add --from-end to take briefs from the end of the list
//   node …/claim.mjs release <slug> [--done]   done = built and merged; otherwise the brief goes back
//   node …/claim.mjs list
//   node …/claim.mjs seed-worktrees   lessons in progress in agent worktrees count as claimed
//
// A claim older than 6 hours with no "done" is stale and can be taken again (the agent probably died).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Always the main checkout, even when this script is run from inside a worktree.
const here = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const marker = `${path.sep}.claude${path.sep}worktrees${path.sep}`;
const ROOT = here.includes(marker) ? here.slice(0, here.indexOf(marker)) : here;
const DIR = path.join(ROOT, "company/ops/claims");
const STALE_MS = 6 * 3600_000;
fs.mkdirSync(DIR, { recursive: true });

const [cmd, arg] = process.argv.slice(2);
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const lockPath = (slug) => path.join(DIR, `${slug}.json`);
const read = (slug) => { try { return JSON.parse(fs.readFileSync(lockPath(slug), "utf8")); } catch { return null; } };

// The domain's own list first, then each sub-area strand's list (company/domains/briefs/<domain>.<strand>.md).
function briefSlugs(domain) {
  const dir = path.join(ROOT, "company/domains/briefs");
  const files = [`${domain}.md`, ...fs.readdirSync(dir).filter((f) => f.startsWith(`${domain}.`) && f !== `${domain}.md`).sort()];
  if (!fs.existsSync(path.join(dir, files[0]))) throw new Error(`no briefs for ${domain}`);
  return files.flatMap((f) => [...fs.readFileSync(path.join(dir, f), "utf8").matchAll(/^#{2,3}\s+\d+\.\s+([a-z0-9-]+)\s/gm)].map((m) => m[1]));
}
const built = (slug) => fs.readdirSync(path.join(ROOT, "src/demos")).some((d) => fs.existsSync(path.join(ROOT, "src/demos", d, slug, "meta.json")));
// Briefs known to be wrong (company/ops/brief-skips.json, each with a reason and board id) are never handed out.
const skipped = () => { try { return new Set(Object.keys(JSON.parse(fs.readFileSync(path.join(ROOT, "company/ops/brief-skips.json"), "utf8")).skips)); } catch { return new Set(); } };

function tryLock(slug, agent) {
  const prev = read(slug);
  if (prev && (prev.done || Date.now() - Date.parse(prev.at) < STALE_MS)) return false;
  if (prev) fs.rmSync(lockPath(slug)); // stale: the claimant is presumed dead
  try {
    const fd = fs.openSync(lockPath(slug), "wx");
    fs.writeSync(fd, JSON.stringify({ slug, agent, at: new Date().toISOString() }) + "\n");
    fs.closeSync(fd);
    return true;
  } catch {
    return false; // another agent won the race
  }
}

if (cmd === "next") {
  if (!arg) throw new Error("usage: claim.mjs next <domain> --agent=<label>");
  const skip = skipped();
  const list = briefSlugs(arg);
  if (opt["from-end"]) list.reverse(); // take from the end while an older builder works forward without the queue
  const slug = list.find((s) => !built(s) && !skip.has(s) && tryLock(s, String(opt.agent ?? "unknown")));
  console.log(slug ?? "NONE");
} else if (cmd === "release") {
  const prev = read(arg);
  if (!prev) console.log(`no claim for ${arg}`);
  else if (opt.done) (fs.writeFileSync(lockPath(arg), JSON.stringify({ ...prev, done: new Date().toISOString() }) + "\n"), console.log(`${arg} done`));
  else (fs.rmSync(lockPath(arg)), console.log(`${arg} released`));
} else if (cmd === "seed-worktrees") {
  // Lessons already being built in agent worktrees (present there, absent here) count as claimed.
  const wt = path.join(ROOT, ".claude/worktrees");
  let n = 0;
  for (const w of fs.existsSync(wt) ? fs.readdirSync(wt) : []) {
    const demos = path.join(wt, w, "src/demos");
    if (!fs.existsSync(demos)) continue;
    for (const d of fs.readdirSync(demos)) {
      const dd = path.join(demos, d);
      if (!fs.statSync(dd).isDirectory()) continue;
      for (const s of fs.readdirSync(dd)) if (!built(s) && fs.existsSync(path.join(dd, s, "meta.json")) && tryLock(s, w)) n++;
    }
  }
  console.log(`seeded ${n} claim(s) from agent worktrees`);
} else if (cmd === "list") {
  for (const f of fs.readdirSync(DIR).filter((f) => f.endsWith(".json")).sort()) {
    const c = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
    const age = Math.round((Date.now() - Date.parse(c.at)) / 60000);
    console.log(`${c.done ? "done " : age * 60000 > STALE_MS ? "STALE" : "held "} ${c.slug.padEnd(34)} ${String(age).padStart(4)} min  ${c.agent}`);
  }
} else {
  console.log("usage: node tools/claim.mjs next <domain> --agent=<label> | release <slug> [--done] | list");
}
