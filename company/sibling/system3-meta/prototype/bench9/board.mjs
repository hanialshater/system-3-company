#!/usr/bin/env node
// Benchmark 9b: the findings board (B9B.md; PRINCIPLES.md principle 4 and R1/R2). One JSON line per entry in the
// board file named by board.json beside this script (outside every agent's folders: agents reach it only through here).
//   node board.mjs post --by=<id> --kind=finding|dead-end|hypothesis --area=<topic> --text='…' --evidence='…' --wrong-if='…'
//   node board.mjs read [--area=<topic>] [--last=50]
// An entry without evidence and a wrong-if line is refused (a finding is not a feather). Reading prints the entries,
// newest last, one block each.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(fs.readFileSync(path.join(HERE, "board.json"), "utf8"));
const cmd = process.argv[2];
const opt = Object.fromEntries(process.argv.slice(3).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const KINDS = ["finding", "dead-end", "hypothesis"];
const die = (m) => { console.error(m); process.exit(2); };
const read = () => { try { return fs.readFileSync(cfg.file, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } };

if (cmd === "post") {
  for (const k of ["by", "kind", "area", "text", "evidence", "wrong-if"]) if (typeof opt[k] !== "string" || !opt[k].trim()) die(`post needs --${k}='…' (a finding carries its evidence and the outcome that would show it wrong)`);
  if (!KINDS.includes(opt.kind)) die(`--kind is one of ${KINDS.join(", ")}`);
  if (!/^[\w-]{1,40}$/.test(opt.by)) die("--by is your id");
  const e = { n: read().length + 1, t: new Date().toISOString(), by: opt.by, kind: opt.kind, area: opt.area.slice(0, 60), text: opt.text.slice(0, 1200), evidence: opt.evidence.slice(0, 400), wrongIf: opt["wrong-if"].slice(0, 300) };
  fs.mkdirSync(path.dirname(cfg.file), { recursive: true });
  fs.appendFileSync(cfg.file, JSON.stringify(e) + "\n");
  console.log(`posted #${e.n}`);
} else if (cmd === "read") {
  const all = read().filter((e) => !opt.area || e.area === opt.area).slice(-Number(opt.last ?? 50));
  if (!all.length) console.log("the board is empty");
  for (const e of all) console.log(`#${e.n} ${e.kind} [${e.area}] by ${e.by}: ${e.text}\n   evidence: ${e.evidence}\n   wrong if: ${e.wrongIf}`);
} else die("usage: board.mjs post --by= --kind= --area= --text= --evidence= --wrong-if= | read [--area=] [--last=]");
