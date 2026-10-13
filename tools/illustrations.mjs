#!/usr/bin/env node
// Illustration pipeline (company/design/illustration.md, illustrator-handbook.md).
//   node tools/illustrations.mjs list            requests and their status
//   node tools/illustrations.mjs check [slug]    validate inbox deliveries (provenance, sizes, alt text)
//   node tools/illustrations.mjs accept <slug>   copy reviewed images to public/illustrations/<slug>/
// accept requires the request's front matter to record every review: style_ok, accuracy_ok, alt_ok, and
// safety_ok when safety_class is not "none". Reviewers write those lines; the illustrator never does.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REQ = path.join(ROOT, "company/design/illustration-requests");
const INBOX = path.join(ROOT, "company/design/illustration-inbox");
const PUB = path.join(ROOT, "public/illustrations");
const LIMIT = { hero: 120_000, other: 90_000 };

const front = (f) => {
  const t = fs.readFileSync(f, "utf8");
  const m = t.match(/^---\n([\s\S]*?)\n---/);
  return Object.fromEntries((m?.[1] ?? "").split("\n").map((l) => l.replace(/#.*$/, "").trim()).filter(Boolean).map((l) => [l.split(":")[0].trim(), l.slice(l.indexOf(":") + 1).trim()]));
};
const requests = () => fs.readdirSync(REQ).filter((f) => f.endsWith(".md") && f !== "TEMPLATE.md").map((f) => ({ file: path.join(REQ, f), ...front(path.join(REQ, f)) }));

function check(slug) {
  const dir = path.join(INBOX, slug);
  const req = requests().find((r) => r.slug === slug);
  const problems = [];
  if (!req) problems.push("no request file");
  const pp = path.join(dir, "provenance.json");
  if (!fs.existsSync(pp)) return [...problems, "missing provenance.json"];
  let p;
  try { p = JSON.parse(fs.readFileSync(pp, "utf8")); } catch { return [...problems, "provenance.json is not valid JSON"]; }
  for (const k of ["model", "prompt", "made", "licence", "alt", "images"]) if (!p[k] || (Array.isArray(p[k]) && !p[k].length)) problems.push(`provenance: missing ${k}`);
  for (const [i, img] of (p.images ?? []).entries()) {
    const f = path.join(dir, img);
    if (!fs.existsSync(f)) { problems.push(`missing ${img}`); continue; }
    if (!img.endsWith(".webp")) problems.push(`${img}: must be WebP`);
    const size = fs.statSync(f).size, max = req?.format === "hero" ? LIMIT.hero : LIMIT.other;
    if (size > max) problems.push(`${img}: ${Math.round(size / 1000)} KB > ${max / 1000} KB`);
    if (!p.alt?.[i] || p.alt[i].length < 15) problems.push(`${img}: alt text missing or too short`);
  }
  if (req && Number(req.images) && (p.images ?? []).length !== Number(req.images)) problems.push(`expected ${req.images} image(s), got ${(p.images ?? []).length}`);
  return problems;
}

const [cmd, slug] = process.argv.slice(2);
if (cmd === "list") {
  for (const r of requests()) console.log(`${(r.status ?? "?").padEnd(18)} ${String(r.slug).padEnd(34)} ${r.format ?? ""} ×${r.images ?? "?"}  safety: ${r.safety_class ?? "?"}`);
} else if (cmd === "check") {
  const slugs = slug ? [slug] : fs.existsSync(INBOX) ? fs.readdirSync(INBOX).filter((d) => fs.statSync(path.join(INBOX, d)).isDirectory()) : [];
  let bad = 0;
  for (const s of slugs) { const p = check(s); console.log(p.length ? `✗ ${s}: ${p.join("; ")}` : `✓ ${s}`); if (p.length) bad++; }
  if (!slugs.length) console.log("inbox is empty");
  process.exitCode = bad ? 1 : 0;
} else if (cmd === "accept") {
  const req = requests().find((r) => r.slug === slug);
  const problems = check(slug);
  const needed = ["style_ok", "accuracy_ok", "alt_ok", ...(req && req.safety_class && req.safety_class !== "none" ? ["safety_ok"] : [])];
  for (const k of needed) if (!req?.[k] || !/^(yes|true|ok)/i.test(req[k])) problems.push(`review missing: ${k} (in the request's front matter)`);
  if (problems.length) { console.log(`not accepted: ${problems.join("; ")}`); process.exitCode = 1; }
  else {
    const p = JSON.parse(fs.readFileSync(path.join(INBOX, slug, "provenance.json"), "utf8"));
    fs.mkdirSync(path.join(PUB, slug), { recursive: true });
    for (const img of p.images) fs.copyFileSync(path.join(INBOX, slug, img), path.join(PUB, slug, img));
    fs.writeFileSync(path.join(PUB, slug, "provenance.json"), JSON.stringify(p, null, 2) + "\n");
    fs.writeFileSync(req.file, fs.readFileSync(req.file, "utf8").replace(/^status:.*$/m, "status: accepted"));
    console.log(`accepted ${slug}: ${p.images.length} image(s) → public/illustrations/${slug}/`);
  }
} else console.log("usage: node tools/illustrations.mjs list | check [slug] | accept <slug>");
