#!/usr/bin/env node
// Personal memory for every role (F-39, company/decisions/2026-10-16-founder-agent-memory-basics.md).
// Dependency-free. The policy (threshold, target, entry cap) is one constant: tools/org/memory-policy.mjs.
//
// Layout (company/roles/memory/):
//   <role>.md                      the role's memory: Lessons, Mistakes not to repeat, Standing context, Open threads, Entries
//   <role>/<date>-<runkey>.md      one offboarding entry per run, created with O_EXCL: parallel runs never write the same file
//   <role>.archive-<date>.md       what compaction moved out (narrative, closed items). Nothing is deleted.
//
//   node tools/memory.mjs read <role> [--no-compact]       the memory plus unmerged run entries (compacts first past the threshold)
//   node tools/memory.mjs add <role> --run=<runkey> [--by=<label>] --did=… --learned=… --mistake=… --know=… --open=… --closed=…
//        (each flag repeatable; or --text="did: …\nlearned: …" or the lines on stdin with --stdin). ≤ 12 lines.
//        learned/mistake/know/open lines must cite a file (a path, W-n board id or commit sha).
//   node tools/memory.mjs compact <role>|--all [--force]    merge run entries; past the threshold archive oldest entries to the target
//        (--force: archive every entry, lifting its lessons, mistakes, standing context and open threads)
//   node tools/memory.mjs check                            warnings only, exit 0: missing memory files, files over the threshold
//   node tools/memory.mjs init <role>|--all                create missing memory files (never overwrites)
//
// Env (tests): S3_MEMORY_DIR overrides the directory; S3_MEMORY_DATE fixes today's date (YYYY-MM-DD).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MEMORY_POLICY as P, kb } from "./org/memory-policy.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = () => path.resolve(ROOT, process.env.S3_MEMORY_DIR || P.dir);
const today = () => process.env.S3_MEMORY_DATE || new Date().toISOString().slice(0, 10);
const KEPT = ["Lessons", "Mistakes not to repeat", "Standing context", "Open threads"];
const FIELD_SECTION = { learned: "Lessons", mistake: "Mistakes not to repeat", know: "Standing context", open: "Open threads" };
const FIELDS = ["did", "learned", "mistake", "know", "open", "closed"];
const CITE = /([\w.-]+\/[\w./#:-]+|\b[\w-]+\.(md|mjs|js|json|jsonl|ts|tsx|txt|sh|yml)\b|\bW-\d+\b|\b[0-9a-f]{7,40}\b)/;
const LOCK_STALE_MS = 10 * 60 * 1000;

let ROLES = null;
async function roles() {
  if (!ROLES) ROLES = (await import("./org/roles.mjs")).roles;
  return ROLES;
}
async function roleOf(id) {
  const r = (await roles()).find((x) => x.id === id);
  if (!r) throw new Error(`unknown role "${id}" (not in tools/org/roles.mjs)`);
  return r;
}

export const memoryPath = (id) => path.join(DIR(), `${id}.md`);
export const runDir = (id) => path.join(DIR(), id);
export const archivePath = (id, date = today()) => path.join(DIR(), `${id}.archive-${date}.md`);

// ---------------------------------------------------------------- template

export function template(r) {
  const human = r.human
    ? "This is a human role: no agent reads or writes this file on its behalf."
    : `Testimony, not truth. Read it at the start of every run, right after your onboarding doc \`company/roles/${r.id}.md\` (\`node tools/memory.mjs read ${r.id}\` also shows run entries not yet merged), and check the cited file before acting on a line.`;
  return `# Memory: ${r.title} (${r.id})

owner: ${r.id} · rules: F-39 (${P.decision}) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

${human} This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through \`node tools/memory.mjs add ${r.id} --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"\` at the end of a run (≤ ${P.entryMaxLines} lines). Each run gets its own file in \`${P.dir}/${r.id}/\`, so parallel runs never collide; never edit another run's entry. Past ${kb(P.maxBytes)} the tool compacts to ≤ ${kb(P.targetBytes)}: it keeps the four sections below and moves narrative and closed items into \`${r.id}.archive-<date>.md\` beside this file. Nothing is deleted.

${KEPT.map((s) => `## ${s}\n`).join("\n")}
## Entries
`;
}

// ---------------------------------------------------------------- parse / render

export function parse(text) {
  const lines = text.split("\n");
  const doc = { header: [], sections: new Map(), order: [] };
  let cur = null;
  for (const l of lines) {
    const m = l.match(/^## (.+?)\s*$/);
    if (m) {
      cur = m[1];
      if (!doc.sections.has(cur)) {
        doc.sections.set(cur, []);
        doc.order.push(cur);
      }
      continue;
    }
    if (cur === null) doc.header.push(l);
    else doc.sections.get(cur).push(l);
  }
  for (const s of [...KEPT, "Entries"])
    if (!doc.sections.has(s)) {
      doc.sections.set(s, []);
      doc.order.push(s);
    }
  // Entries last, always.
  doc.order = [...doc.order.filter((s) => s !== "Entries"), "Entries"];
  return doc;
}

const trimBlank = (xs) => {
  const a = [...xs];
  while (a.length && !a[0].trim()) a.shift();
  while (a.length && !a[a.length - 1].trim()) a.pop();
  return a;
};

export function render(doc) {
  const out = [trimBlank(doc.header).join("\n"), ""];
  for (const s of doc.order) {
    const body = trimBlank(doc.sections.get(s));
    out.push(`## ${s}`, "");
    if (body.length) out.push(body.join("\n"), "");
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

export function splitEntries(lines) {
  const entries = [];
  let cur = null;
  for (const l of lines) {
    if (/^### /.test(l)) {
      cur = { head: l, body: [] };
      entries.push(cur);
    } else if (cur) cur.body.push(l);
  }
  return entries.map((e) => ({ ...e, body: trimBlank(e.body), date: e.head.match(/^### (\d{4}-\d{2}-\d{2})/)?.[1] ?? "" }));
}
const entryText = (e) => [e.head, ...e.body].join("\n");

// ---------------------------------------------------------------- entries

export function entryLines(opts) {
  const lines = [];
  for (const f of FIELDS) for (const v of [].concat(opts[f] ?? [])) if (String(v).trim()) lines.push(`- ${f}: ${String(v).trim()}`);
  if (opts.text)
    for (const raw of String(opts.text).replace(/\\n/g, "\n").split("\n")) {
      const l = raw.trim().replace(/^-\s*/, "");
      if (l) lines.push(`- ${l}`);
    }
  return lines;
}

export function validateEntry(lines) {
  const errs = [];
  if (!lines.length) errs.push("empty entry: give at least --did, --learned, --know or --open");
  if (lines.length > P.entryMaxLines) errs.push(`entry has ${lines.length} lines; the cap is ${P.entryMaxLines} (F-39 point 3)`);
  for (const l of lines) {
    const f = l.match(/^- (\w+):/)?.[1];
    if (f && FIELD_SECTION[f] && !CITE.test(l)) errs.push(`"${l.slice(0, 70)}" must cite a file (a path, W-n or a commit sha)`);
  }
  return errs;
}

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "run";

function pending(id) {
  const d = runDir(id);
  if (!fs.existsSync(d)) return [];
  return fs
    .readdirSync(d)
    .filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(f))
    .sort()
    .map((f) => ({ file: path.join(d, f), text: fs.readFileSync(path.join(d, f), "utf8") }));
}

export function effectiveBytes(id) {
  const p = memoryPath(id);
  let n = fs.existsSync(p) ? fs.statSync(p).size : 0;
  for (const x of pending(id)) n += Buffer.byteLength(x.text);
  return n;
}

// ---------------------------------------------------------------- lock

function withLock(id, fn) {
  fs.mkdirSync(runDir(id), { recursive: true });
  const lock = path.join(runDir(id), ".lock");
  try {
    if (Date.now() - fs.statSync(lock).mtimeMs > LOCK_STALE_MS) fs.rmSync(lock, { force: true });
  } catch {}
  let fd;
  try {
    fd = fs.openSync(lock, "wx");
  } catch (e) {
    if (e.code === "EEXIST") throw new Error(`memory of ${id} is being compacted by another run (${path.relative(ROOT, lock)}); try again in a minute`);
    throw e;
  }
  try {
    fs.writeSync(fd, `${process.pid} ${new Date().toISOString()}\n`);
    return fn();
  } finally {
    fs.closeSync(fd);
    fs.rmSync(lock, { force: true });
  }
}

function writeAtomic(p, text) {
  const tmp = `${p}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tmp, text);
  fs.renameSync(tmp, p);
}

// ---------------------------------------------------------------- compact

// Pure: takes the memory text and the pending run entries, returns the new memory text and the archived text.
export function compactText(text, pendingTexts, { force = false, maxBytes = P.maxBytes, targetBytes = P.targetBytes } = {}) {
  const doc = parse(text);
  const entryLinesNow = doc.sections.get("Entries");
  const heads = new Set(splitEntries(entryLinesNow).map((e) => e.head.trim()));
  let merged = 0;
  for (const t of pendingTexts) {
    const es = splitEntries(t.split("\n"));
    for (const e of es) {
      if (heads.has(e.head.trim())) continue; // already merged by an interrupted compaction
      entryLinesNow.push("", ...entryText(e).split("\n"));
      heads.add(e.head.trim());
      merged++;
    }
  }
  const archived = [];
  const size = () => Buffer.byteLength(render(doc));
  const over = size() > maxBytes;
  if (over || force) {
    // 1. Close open threads named by "closed:" lines, and archive items marked [closed] or struck through.
    const closers = [];
    for (const e of splitEntries(doc.sections.get("Entries")))
      for (const l of e.body) {
        const m = l.match(/^- closed:\s*(.+)$/);
        if (m) closers.push(m[1].replace(/\s*\(.*$/, "").trim().toLowerCase());
      }
    for (const s of KEPT) {
      const keep = [];
      for (const l of doc.sections.get(s)) {
        const low = l.toLowerCase();
        const closed = /^- /.test(l) && (/\[closed\]/i.test(l) || /^- ~~/.test(l) || (s === "Open threads" && closers.some((c) => c.length > 8 && low.includes(c))));
        if (closed) archived.push(`- (${s}, closed) ${l.slice(2)}`);
        else keep.push(l);
      }
      doc.sections.set(s, keep);
    }
    // 2. Archive entries oldest first until at or under the target, lifting their dated lessons, mistakes,
    //    standing context and open threads (each with its citation) into the kept sections.
    let entries = splitEntries(doc.sections.get("Entries"));
    const kept = (s) => new Set(doc.sections.get(s).map((l) => l.replace(/^- (\d{4}-\d{2}-\d{2} · )?/, "").trim()));
    while (entries.length && (force || size() > targetBytes)) {
      const e = entries.shift();
      for (const l of e.body) {
        const m = l.match(/^- (\w+):\s*(.+)$/);
        const sec = m && FIELD_SECTION[m[1]];
        if (!sec) continue;
        const item = m[2].trim();
        const isClosed = sec === "Open threads" && closers.some((c) => c.length > 8 && m[2].toLowerCase().includes(c));
        if (isClosed || kept(sec).has(item)) continue;
        doc.sections.get(sec).push(`- ${e.date} · ${m[2].trim()}`);
      }
      archived.push(entryText(e));
      doc.sections.set("Entries", entries.flatMap((x) => ["", x.head, ...x.body]));
    }
  }
  const out = render(doc);
  return { text: out, archived: archived.join("\n\n"), merged, bytes: Buffer.byteLength(out), compacted: over || force };
}

export function compact(id, { force = false, quiet = false } = {}) {
  return withLock(id, () => {
    const p = memoryPath(id);
    if (!fs.existsSync(p)) throw new Error(`no memory file for ${id}: run \`node tools/memory.mjs init ${id}\``);
    const pend = pending(id);
    const before = effectiveBytes(id);
    const r = compactText(fs.readFileSync(p, "utf8"), pend.map((x) => x.text), { force });
    if (r.archived) {
      const ap = archivePath(id);
      const head = fs.existsSync(ap) ? "" : `# Memory archive: ${id} (${today()})\n\nMoved out of ${P.dir}/${id}.md by \`node tools/memory.mjs compact\`. Nothing here was deleted from history; it is narrative and closed items.\n`;
      fs.appendFileSync(ap, `${head}\n## Compacted ${new Date().toISOString()}\n\n${r.archived}\n`);
    }
    writeAtomic(p, r.text);
    for (const x of pend) fs.rmSync(x.file, { force: true }); // merged (or already present): their text is in the memory file now
    const rel = path.relative(ROOT, p);
    if (!quiet) console.log(`${rel}: merged ${r.merged} run entr${r.merged === 1 ? "y" : "ies"}; ${kb(before)} -> ${kb(r.bytes)}${r.compacted ? `; compacted${r.archived ? `, archive ${path.relative(ROOT, archivePath(id))}` : ""}` : ""}`);
    if (r.compacted && r.bytes > P.targetBytes)
      console.log(`warn: ${rel} is ${kb(r.bytes)} after compaction, above the ${kb(P.targetBytes)} target: the kept sections themselves are too long. The role's next holder merges lessons by hand (the tool never deletes them).`);
    return r;
  });
}

// ---------------------------------------------------------------- add / read

export function add(id, lines, { run, by, noCompact = false } = {}) {
  if (!run) throw new Error("--run=<runkey> is required (a short label unique to this run, e.g. the Agent call's description)");
  const errs = validateEntry(lines);
  if (errs.length) throw new Error(errs.join("\n"));
  if (!fs.existsSync(memoryPath(id))) throw new Error(`no memory file for ${id}: run \`node tools/memory.mjs init ${id}\``);
  const date = today();
  const key = slug(run);
  const body = `### ${date} · ${key} · ${by || id}\n${lines.join("\n")}\n`;
  if (effectiveBytes(id) + Buffer.byteLength(body) > P.maxBytes) {
    if (noCompact) throw new Error(`compact first: ${id}'s memory is past ${kb(P.maxBytes)} (node tools/memory.mjs compact ${id})`);
    compact(id);
    if (effectiveBytes(id) + Buffer.byteLength(body) > P.maxBytes)
      throw new Error(`compact first: ${id}'s memory is still past ${kb(P.maxBytes)} after compaction; its kept sections must be merged by hand`);
  }
  fs.mkdirSync(runDir(id), { recursive: true });
  for (let i = 1; ; i++) {
    const f = path.join(runDir(id), `${date}-${key}${i > 1 ? `-${i}` : ""}.md`);
    try {
      const fd = fs.openSync(f, "wx");
      fs.writeSync(fd, i > 1 ? body.replace(` · ${key} · `, ` · ${key}-${i} · `) : body);
      fs.closeSync(fd);
      return f;
    } catch (e) {
      if (e.code !== "EEXIST") throw e;
    }
  }
}

export function read(id, { noCompact = false } = {}) {
  if (!fs.existsSync(memoryPath(id))) return `(no memory file for ${id} yet: ${path.relative(ROOT, memoryPath(id))})\n`;
  if (effectiveBytes(id) > P.maxBytes) {
    if (noCompact) console.error(`warn: ${id}'s memory is past ${kb(P.maxBytes)}; compact it before relying on it`);
    else compact(id);
  }
  let out = fs.readFileSync(memoryPath(id), "utf8");
  const pend = pending(id);
  if (pend.length) out += `\n## Unmerged run entries (${pend.length}; merged by \`compact\`)\n\n${pend.map((x) => x.text.trim()).join("\n\n")}\n`;
  return out;
}

// ---------------------------------------------------------------- check / init

export async function check() {
  const warns = [];
  let ok = 0;
  for (const r of await roles()) {
    const p = memoryPath(r.id);
    if (!fs.existsSync(p)) {
      warns.push(`${path.relative(ROOT, p)}: missing (node tools/memory.mjs init ${r.id})`);
      continue;
    }
    const n = effectiveBytes(r.id);
    if (n > P.maxBytes) warns.push(`${path.relative(ROOT, p)}: ${kb(n)} is over the ${kb(P.maxBytes)} threshold (node tools/memory.mjs compact ${r.id})`);
    else ok++;
  }
  return { ok, warns };
}

export async function init(ids) {
  const made = [];
  fs.mkdirSync(DIR(), { recursive: true });
  for (const id of ids) {
    const r = await roleOf(id);
    const p = memoryPath(id);
    try {
      fs.writeFileSync(p, template(r), { flag: "wx" });
      made.push(p);
    } catch (e) {
      if (e.code !== "EEXIST") throw e;
    }
  }
  return made;
}

// ---------------------------------------------------------------- CLI

function parseArgs(argv) {
  const pos = [];
  const o = {};
  for (const a of argv) {
    const m = a.match(/^--([\w-]+)(?:=(.*))?$/s);
    if (!m) pos.push(a);
    else {
      const k = m[1];
      const v = m[2] ?? true;
      if (FIELDS.includes(k)) (o[k] ??= []).push(v);
      else o[k] = v;
    }
  }
  return { pos, o };
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const { pos, o } = parseArgs(rest);
  const id = pos[0];
  try {
    if (cmd === "read") {
      await roleOf(id);
      process.stdout.write(read(id, { noCompact: !!o["no-compact"] }));
    } else if (cmd === "add") {
      await roleOf(id);
      if (o.stdin) o.text = fs.readFileSync(0, "utf8");
      const f = add(id, entryLines(o), { run: o.run, by: o.by, noCompact: !!o["no-compact"] });
      console.log(`wrote ${path.relative(ROOT, f)}`);
    } else if (cmd === "compact") {
      const ids = o.all ? (await roles()).map((r) => r.id).filter((x) => fs.existsSync(memoryPath(x))) : [(await roleOf(id)).id];
      for (const x of ids) compact(x, { force: !!o.force, quiet: o.all && !pending(x).length && effectiveBytes(x) <= P.maxBytes && !o.force });
    } else if (cmd === "check") {
      const { ok, warns } = await check();
      for (const w of warns) console.log(`warn: memory: ${w}`);
      console.log(`memory: ${ok} role memory file(s) within ${kb(P.maxBytes)}${warns.length ? `, ${warns.length} warning(s) (never a failure)` : ""}`);
    } else if (cmd === "init") {
      const ids = o.all ? (await roles()).map((r) => r.id) : [id];
      const made = await init(ids);
      console.log(`created ${made.length} memory file(s)`);
    } else {
      console.log("usage: node tools/memory.mjs read|add|compact|check|init <role> (see the header of tools/memory.mjs)");
      process.exitCode = cmd ? 1 : 0;
    }
  } catch (e) {
    console.error(`memory: ${e.message}`);
    process.exitCode = cmd === "check" ? 0 : 1; // the check only ever warns
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
