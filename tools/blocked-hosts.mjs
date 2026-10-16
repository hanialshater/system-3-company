#!/usr/bin/env node
// Blocked-host list for fact-checking, kept as data (company/knowledge/blocked-hosts.json) and re-probed.
// Board W-1335 (for W-556: a web-capable fact-check session per wave). Batch 2026-10-16-r5-tools.md#B6.
//
//   node tools/blocked-hosts.mjs list            hosts by claims held (the W-556 founder view)
//   node tools/blocked-hosts.mjs scan            rebuild records / claims fields from company/reviews and meta.json
//   node tools/blocked-hosts.mjs probe           one HEAD per host through the configured proxy, 10 s timeout;
//                                                writes only each host's lastProbe {at, result}
//
// The list INFORMS, it does not judge: nothing here reads or writes a claim's status. A claim counted as
// "held" below is one whose status is already `unverified` and whose fact-check note names the host in a
// sentence that says it was blocked/refused/403. That count is a heuristic over free text; the claim ids are
// listed so anyone can check them.
//
// probe never crawls, follows redirects, sends credentials or retries. It refuses to run if the agent proxy
// status endpoint is unreachable or reports itself disabled/degraded (record and stop, as the batch says).
// Env: S3_BLOCKED_HOSTS (json path), S3_ROOT (repo root for scan), HTTPS_PROXY (never changed here).

import fs from "node:fs";
import path from "node:path";
import { execFile, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const BLOCK_WORDS = /\b403\b|block|refus|denied|ENOTFOUND|fails? DNS|DNS fail|unreachable|not reachable|(?:could|can)(?:not|n't| not) (?:be )?open|did not open|does not open|not opened from this host/i;

const repoRoot = () => process.env.S3_ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = () => process.env.S3_BLOCKED_HOSTS || path.join(repoRoot(), "company/knowledge/blocked-hosts.json");

export function load(p = dataPath()) { return JSON.parse(fs.readFileSync(p, "utf8")); }
export function save(data, p = dataPath()) { fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n"); }

// Sentences: split at ". ", "; ", " | " and newlines. Host names keep their dots (no space after them).
export function sentences(text) { return String(text).split(/(?<=[.;!?])\s+|\s\|\s|\n/).filter(Boolean); }
export function blockedMention(text, re) { return sentences(text).some((s) => re.test(s) && BLOCK_WORDS.test(s)); }

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith(".md")) out.push(p);
  }
  return out;
}

function recordDate(root, rel) {
  const m = rel.match(/(\d{4}-\d{2}-\d{2})/);
  if (m) return m[1];
  try {
    const d = execFileSync("git", ["-C", root, "log", "--diff-filter=A", "--format=%as", "--", rel], { encoding: "utf8" }).trim().split("\n").pop();
    return d || null;
  } catch { return null; }
}

// Rebuild the derived fields (records, firstSeen, claimsHeld, heldClaims) of every host. Probe fields are kept.
export function scan(data, root = repoRoot()) {
  const records = walk(path.join(root, "company/reviews")).map((p) => ({ rel: path.relative(root, p), text: fs.readFileSync(p, "utf8") }));
  const claims = [];
  for (const p of metaFiles(path.join(root, "src/demos"))) {
    let m; try { m = JSON.parse(fs.readFileSync(p, "utf8")); } catch { continue; }
    for (const c of m.claims ?? []) if (c.status === "unverified" && c.note) claims.push(c);
  }
  for (const h of data.hosts) {
    const re = new RegExp(h.match, "i");
    const hit = records.filter((r) => blockedMention(r.text, re)).map((r) => r.rel).sort();
    const dates = hit.map((r) => recordDate(root, r)).filter(Boolean).sort();
    h.firstSeen = [h.firstSeen, dates[0]].filter(Boolean).sort()[0] ?? null;
    h.records = hit;
    h.heldClaims = claims.filter((c) => blockedMention(c.note, re)).map((c) => c.id).sort();
    h.claimsHeld = h.heldClaims.length;
  }
  data.scannedAt = new Date().toISOString();
  return data;
}

function metaFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) metaFiles(p, out); else if (e.name === "meta.json") out.push(p);
  }
  return out;
}

// curl result -> one status word. Only the class is recorded, never headers or bodies.
export function classify({ exit, httpCode, connectCode }) {
  if (connectCode && connectCode !== "000" && connectCode !== "200") return `proxy-${connectCode}`;
  if (httpCode && httpCode !== "000") return `http-${httpCode}`;
  return ({ 28: "timeout", 6: "dns", 5: "proxy-dns", 7: "connect-refused", 35: "tls", 60: "tls", 52: "empty-reply", 56: "recv-error" })[exit] ?? `error-${exit}`;
}

function headOnce(host) {
  // One HEAD, no redirects (-L absent), no retries, 10 s cap. Response headers go to our stdout pipe and are dropped.
  return new Promise((resolve) => {
    execFile("curl", ["-sS", "--head", "--max-time", "10", "--retry", "0", "-w", "\n__S3 %{http_code} %{http_connect}", `https://${host}/`],
      { encoding: "utf8", timeout: 15000 }, (err, stdout) => {
        const m = String(stdout).match(/__S3 (\d{3}) (\d{3})/);
        const exit = err ? (typeof err.code === "number" ? err.code : -1) : 0;
        resolve(classify({ exit, httpCode: m?.[1], connectCode: m?.[2] }));
      });
  });
}

export function proxyHealthy() {
  const base = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (!base) return { ok: false, why: "HTTPS_PROXY is not set; nothing to probe through" };
  let s;
  try { s = JSON.parse(execFileSync("curl", ["-sS", "--max-time", "10", `${base.replace(/\/$/, "")}/__agentproxy/status`], { encoding: "utf8" })); }
  catch (e) { return { ok: false, why: `proxy status unreachable (${e.message.split("\n")[0]})` }; }
  if (s.enabled === false) return { ok: false, why: "proxy status: enabled=false" };
  const degraded = Object.entries(s).find(([k, v]) => /degrad/i.test(k) && v) || (/degrad/i.test(String(s.state ?? s.status ?? "")) && ["state", s.state ?? s.status]);
  if (degraded) return { ok: false, why: `proxy status reports degraded (${degraded[0]})` };
  return { ok: true };
}

export async function probe(data, { head = headOnce, now = () => new Date().toISOString(), concurrency = 4 } = {}) {
  const targets = [...data.hosts, ...(data.knownOpen ?? [])];
  let i = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (i < targets.length) {
      const t = targets[i++];
      const result = await head(t.host);
      t.lastProbe = { at: now(), result };
    }
  }));
  return data;
}

export function listing(data) {
  const rows = [...data.hosts].sort((a, b) => b.claimsHeld - a.claimsHeld || b.records.length - a.records.length || a.host.localeCompare(b.host));
  const out = [`blocked hosts (${rows.length}), by claims held. Informs only: no claim status is set from this list.`,
    "claims  records  first seen  last probe                       host"];
  for (const h of rows) {
    const p = h.lastProbe ? `${h.lastProbe.result} @ ${h.lastProbe.at.slice(0, 16)}Z` : "never probed";
    out.push(`${String(h.claimsHeld).padStart(6)}  ${String(h.records.length).padStart(7)}  ${(h.firstSeen ?? "?").padEnd(10)}  ${p.padEnd(31)}  ${h.host}`);
    out.push(`        e.g. ${h.records[0] ?? "(no record)"}${h.heldClaims.length ? `; held: ${h.heldClaims.slice(0, 3).join(", ")}${h.heldClaims.length > 3 ? ", …" : ""}` : ""}`);
  }
  for (const k of data.knownOpen ?? []) out.push(`  open control: ${k.host} (${k.lastProbe ? `${k.lastProbe.result} @ ${k.lastProbe.at.slice(0, 16)}Z` : "never probed"}) ${k.note ?? ""}`);
  return out.join("\n");
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const cmd = process.argv[2];
  if (cmd === "list") console.log(listing(load()));
  else if (cmd === "scan") { const d = scan(load()); save(d); console.log(`scanned: ${d.hosts.filter((h) => h.records.length).length}/${d.hosts.length} hosts with a record, ${d.hosts.reduce((n, h) => n + h.claimsHeld, 0)} host-claim pairs held`); }
  else if (cmd === "probe") {
    const h = proxyHealthy();
    if (!h.ok) { console.error(`probe refused: ${h.why}. Nothing written.`); process.exit(2); }
    const d = await probe(load());
    save(d);
    const tally = {};
    for (const t of [...d.hosts, ...(d.knownOpen ?? [])]) tally[t.lastProbe.result] = (tally[t.lastProbe.result] ?? 0) + 1;
    console.log(`probed ${d.hosts.length + (d.knownOpen?.length ?? 0)} hosts: ${Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(", ")}`);
  } else { console.error("usage: node tools/blocked-hosts.mjs list|scan|probe"); process.exit(1); }
}
