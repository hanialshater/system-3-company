#!/usr/bin/env node
// Triage for the whole portfolio (company/ops/triage.md). Owned by the portfolio manager.
// Priority, triage notes and GitHub links live on board items as extra fields; the protected CLI
// ignores fields it does not know, so this tool needs no amendment.
//
//   node tools/triage.mjs list [--untriaged] [--owner=<role>] [--p=1]   open items, highest priority first
//   node tools/triage.mjs set <W-id> --p=<1-4> [--owner=<role>] [--state=next|backlog|dropped] --note="why"
//   node tools/triage.mjs import <issues.json>   mirror GitHub issues (an array of {number,title,labels,body,url})
//                                               into the board as untriaged items; already mirrored ones are skipped
//   node tools/triage.mjs stats                  counts by priority, state and owner, oldest P1/P2

import fs from "node:fs";

const P = "company/ops/board.json";
const board = JSON.parse(fs.readFileSync(P, "utf8"));
const [cmd, arg] = process.argv.slice(2);
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const open = board.items.filter((i) => !["done", "dropped"].includes(i.state));
const today = new Date().toISOString().slice(0, 10);
const age = (i) => Math.round((Date.now() - Date.parse(i.created)) / 86400_000);
const save = () => fs.writeFileSync(P, JSON.stringify(board, null, 2) + "\n");
const byPrio = (a, b) => (a.priority ?? 9) - (b.priority ?? 9) || a.id.localeCompare(b.id, undefined, { numeric: true });

if (cmd === "list") {
  let xs = open;
  if (opt.untriaged) xs = xs.filter((i) => !i.priority);
  if (opt.owner) xs = xs.filter((i) => i.owner === opt.owner);
  if (opt.p) xs = xs.filter((i) => i.priority === Number(opt.p));
  for (const i of xs.sort(byPrio)) console.log(`${i.priority ? "P" + i.priority : "--"}  ${i.id.padEnd(6)} ${i.state.padEnd(8)} ${i.owner.padEnd(26)} ${i.github ? "gh#" + i.github + " " : ""}${i.title}`);
  console.log(`\n${xs.length} item(s)${opt.untriaged ? " untriaged" : ""}`);
} else if (cmd === "set") {
  const it = board.items.find((i) => i.id === arg);
  if (!it) throw new Error(`no item ${arg}`);
  if (!opt.note) throw new Error("--note is required: say why");
  if (opt.p) { const p = Number(opt.p); if (![1, 2, 3, 4].includes(p)) throw new Error("--p must be 1-4"); it.priority = p; }
  if (opt.owner) it.owner = String(opt.owner);
  if (opt.state) { if (!["backlog", "next", "doing", "review", "done", "dropped"].includes(opt.state)) throw new Error("bad state"); it.state = String(opt.state); }
  it.triage = { at: today, by: String(opt.by ?? "portfolio-manager"), note: String(opt.note) };
  save();
  console.log(`${it.id} → P${it.priority ?? "-"} ${it.state} ${it.owner}`);
} else if (cmd === "import") {
  const issues = JSON.parse(fs.readFileSync(arg, "utf8"));
  let n = Math.max(...board.items.map((i) => Number(i.id.split("-")[1]) || 0));
  let added = 0;
  for (const is of issues) {
    if (board.items.some((i) => i.github === is.number)) continue;
    const labels = (is.labels ?? []).map((l) => (typeof l === "string" ? l : l.name));
    board.items.push({ id: `W-${String(++n).padStart(3, "0")}`, title: is.title, owner: "portfolio-manager", state: "backlog", domain: null, created: today, links: [is.url ?? `github#${is.number}`], github: is.number, labels });
    added++;
  }
  save();
  console.log(`mirrored ${added} new issue(s); ${issues.length - added} already on the board`);
} else if (cmd === "stats") {
  const count = (f) => open.reduce((m, i) => ((m[f(i)] = (m[f(i)] ?? 0) + 1), m), {});
  console.log("open:", open.length, " untriaged:", open.filter((i) => !i.priority).length);
  console.log("by priority:", count((i) => (i.priority ? "P" + i.priority : "untriaged")));
  console.log("by state:", count((i) => i.state));
  for (const p of [1, 2]) { const o = open.filter((i) => i.priority === p).sort((a, b) => age(b) - age(a))[0]; if (o) console.log(`oldest P${p}: ${o.id} (${age(o)} d) ${o.title}`); }
} else {
  console.log("usage: node tools/triage.mjs list|set|import|stats (see the header of this file)");
}
