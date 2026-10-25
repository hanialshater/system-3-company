#!/usr/bin/env node
// Validates the city: every registry card and every shared knowledge entry. Dependency-free; CI runs it on every PR.
//   node tools/check.mjs [root]    exit 1 with the problems, if any
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const KINDS = ["practice", "finding", "dead-end", "pitfall"];
const ID = /^[a-z0-9][a-z0-9-]{0,62}$/;
// what must never be published: tokens and keys, and e-mail addresses (personal data)
const SECRET = /(gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9-]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|xox[abp]-[A-Za-z0-9-]{10,}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/;

export function check(root) {
  const p = [], ids = new Set(), regDir = path.join(root, "registry", "companies"), kDir = path.join(root, "knowledge");
  for (const f of fs.existsSync(regDir) ? fs.readdirSync(regDir) : []) {
    if (!f.endsWith(".json")) continue;
    const at = `registry/companies/${f}`, raw = fs.readFileSync(path.join(regDir, f), "utf8"); let c;
    try { c = JSON.parse(raw); } catch { p.push(`${at}: not JSON`); continue; }
    if (SECRET.test(raw)) p.push(`${at}: looks like a secret or personal data`);
    if (c.v !== 1) p.push(`${at}: v must be 1`);
    if (!ID.test(c.id ?? "") || f !== `${c.id}.json`) p.push(`${at}: id must be lowercase letters, digits and dashes, and match the file name`);
    for (const k of ["name", "owner", "archetype", "summary"]) if (!String(c[k] ?? "").trim()) p.push(`${at}: ${k} is required`);
    ids.add(c.id);
  }
  for (const f of fs.existsSync(kDir) ? fs.readdirSync(kDir) : []) {
    if (!f.endsWith(".jsonl")) continue;
    const company = f.slice(0, -6);
    if (!ids.has(company)) p.push(`knowledge/${f}: no company ${company} in the registry`);
    fs.readFileSync(path.join(kDir, f), "utf8").split("\n").forEach((line, i) => {
      if (!line.trim()) return;
      const at = `knowledge/${f}:${i + 1}`; let e;
      try { e = JSON.parse(line); } catch { p.push(`${at}: not JSON`); return; }
      if (SECRET.test(line)) p.push(`${at}: looks like a secret or personal data`);
      if (e.company !== company) p.push(`${at}: company must be ${company}`);
      if (!KINDS.includes(e.kind)) p.push(`${at}: kind is one of ${KINDS.join(", ")}`);
      for (const k of ["topic", "text", "evidence", "publishedBy"]) if (!String(e[k] ?? "").trim()) p.push(`${at}: ${k} is required`);
      if (!(typeof e.belief === "number" && e.belief >= 0 && e.belief <= 1)) p.push(`${at}: belief is a number from 0 to 1`);
    });
  }
  return p;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const p = check(path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "..")));
  if (p.length) { console.error(p.join("\n")); process.exit(1); }
  console.log("the city checks out");
}
