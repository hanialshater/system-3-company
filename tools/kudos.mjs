#!/usr/bin/env node
// Kudos: thanks from one role (or the founder) to another, shown on the HQ Kudos board.
// Stored as `kudos` events in company/ops/events.jsonl, so they replay with everything else.
//
//   node tools/kudos.mjs add --from=<role> --to=<role or agent label> --for="what, specifically" [--ref=path] [--emoji=🎉]
//   node tools/kudos.mjs list [n]
//   node tools/kudos.mjs harvest   pick up "## Kudos" sections in ritual and review records (idempotent)
//
// Rules (working agreement 8): earned and specific, never to yourself, never for volume. Not a metric.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const LOG = "company/ops/events.jsonl";
const [cmd, arg] = process.argv.slice(2);
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const all = () => fs.readFileSync(LOG, "utf8").trim().split("\n").map((l) => JSON.parse(l));
const roleOf = (to) => to.split(/\s*[·(]/)[0].trim();

function add({ from, to, why, ref, emoji, ts, id }) {
  if (!from || !to || !why) throw new Error('usage: add --from=<role> --to=<role|agent> --for="…"');
  if (roleOf(from) === roleOf(to)) throw new Error("no kudos to yourself");
  const ev = {
    id: id ?? "kudos-" + crypto.createHash("sha1").update(`${from}|${to}|${why}`).digest("hex").slice(0, 10),
    ts: ts ?? new Date().toISOString(), type: "kudos", room: "lobby", actor: from,
    summary: `${emoji ?? "🎉"} ${from} → ${to}: ${why}`, subjects: [to], refs: ref ? [ref] : [], body: why,
  };
  if (all().some((e) => e.id === ev.id)) return false;
  fs.appendFileSync(LOG, JSON.stringify(ev) + "\n");
  return true;
}

if (cmd === "add") {
  console.log(add({ from: opt.from, to: opt.to, why: opt.for, ref: opt.ref, emoji: opt.emoji }) ? "kudos added" : "already given");
} else if (cmd === "list") {
  for (const e of all().filter((e) => e.type === "kudos").slice(-(Number(arg) || 20))) console.log(`${e.ts.slice(0, 16)}  ${e.summary}`);
} else if (cmd === "harvest") {
  // Lines like "- @fact-checker: caught the 28.000000000000004% float" under a "## Kudos" heading.
  let n = 0;
  const dirs = ["company/rituals/records", ...fs.readdirSync("company/reviews").map((d) => path.join("company/reviews", d))];
  for (const d of dirs) {
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((f) => f.endsWith(".md"))) {
      const p = path.join(d, f), t = fs.readFileSync(p, "utf8");
      const sec = t.match(/^##\s+\d*\.?\s*Kudos[^\n]*\n([\s\S]*?)(?=^##\s|$(?![\s\S]))/m);
      if (!sec) continue;
      const giver = (t.match(/^(?:owner|by|reviewer|recorded by|signed)[^:]*:\s*([a-z0-9-]+)/im) ?? [])[1] ?? "unknown";
      for (const m of sec[1].matchAll(/^[-*]\s*@?([a-z0-9][a-z0-9 ·()#-]*?):\s*(.+)$/gm)) {
        try { if (add({ from: giver, to: m[1].trim(), why: m[2].trim(), ref: p, ts: fs.statSync(p).mtime.toISOString() })) n++; } catch {}
      }
    }
  }
  console.log(`harvested ${n} new kudos`);
} else {
  console.log("usage: node tools/kudos.mjs add|list|harvest (see the header)");
}
