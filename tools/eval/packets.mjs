#!/usr/bin/env node
// Blind pairwise packets: shared helpers for round builders, and a packet check.
//
//   node tools/eval/packets.mjs check <run dir | pair dir>     e.g. artifacts/pairwise/round-2
//   npm run eval:packets -- check artifacts/pairwise/round-2
//
// WHY (task E1, company/evaluation/rounds/2026-10-14-round-1.md section 3). Round-1 screenshots showed
// the card's status tag ("In review") and the "Why trust this? (k/n claims checked)" counter. The
// counter is fact-check process state and was cited in trust reasons; the status tag becomes a
// status/recency signal once some lessons are published. From round 2 packets must not carry either.
//
// HOW.
// 1. Capture with `npm run walkthrough -- <slug> --blind`. The walkthrough injects BLIND_CSS before the
//    first screenshot (status tag and trust link hidden with visibility:hidden, so layout does not
//    shift and the duration tag stays), checks the visible page text against FORBIDDEN after every
//    frame, skips the trust-sheet appendix and the recording timestamp, and writes the frames,
//    sheet.png, transcript.md and a capture.json marker to artifacts/walkthroughs-blind/<slug>/.
// 2. A round builder calls copySide(capture, packet/A) etc. copySide refuses a capture without the
//    blind marker and strips any forbidden line from the transcript.
// 3. checkPacket / the CLI fails a packet if any text file in it shows a claim counter, a "Why trust
//    this?" link or a status tag, or if a side's images do not come from a blind capture. Images are
//    not OCR'd: their guarantee is the capture-time text check recorded in capture.json. A reviewer
//    still eyeballs one sheet.png per packet (the CLI lists them).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Selectors from src/components/DemoCard.tsx (card chrome, not the lesson contract).
export const BLIND_SELECTORS = {
  "status tag": ".card-tags .tag.status",
  "claim counter": '[data-testid="trust-button"]',
};
export const BLIND_CSS = `${Object.values(BLIND_SELECTORS).join(", ")} { visibility: hidden !important; }`;
export const BLIND_MARKER = "capture.json";

export const FORBIDDEN = [
  { what: "claim counter", re: /claims?\s+checked/i },
  { what: "claim counter", re: /\b\d+\s*\/\s*\d+\s+claims?\b/i },
  { what: "trust link", re: /why trust this/i },
  { what: "status tag", re: /\bin review\b/i },
];
// A status tag rendered on its own (DemoCard shows meta.status when it is not "published"/"review").
const STATUS_LINE = /^\s*(?:[-*>]\s*)?\[?(draft|review|in review|published|retired|status:\s*\w+)\]?\s*$/i;

// Every forbidden hit in a text: [{ what, line, text }]. Lines are 1-based.
export function findForbidden(text) {
  const hits = [];
  String(text)
    .split("\n")
    .forEach((line, i) => {
      for (const f of FORBIDDEN) if (f.re.test(line)) hits.push({ what: f.what, line: i + 1, text: line.trim().slice(0, 120) });
      if (STATUS_LINE.test(line)) hits.push({ what: "status tag", line: i + 1, text: line.trim().slice(0, 120) });
    });
  return hits;
}

// Transcript redaction for packets: drop the trust-sheet appendix and the recording timestamp, then
// drop any remaining line that shows a forbidden element. Returns { text, removed } (removed = lines).
export function redactTranscript(t) {
  let text = String(t).replace(/^## Appendix: trust sheet[\s\S]*$/m, "");
  text = text.replace(/ · recorded [0-9T:.\-Z]+/, "");
  const removed = [];
  text = text
    .split("\n")
    .filter((line) => {
      const bad = findForbidden(line).length > 0;
      if (bad) removed.push(line);
      return !bad;
    })
    .join("\n");
  return { text: text.trimEnd() + "\n", removed };
}

export function readMarker(dir) {
  const f = path.join(dir, BLIND_MARKER);
  if (!fs.existsSync(f)) return null;
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    return null;
  }
}

function markerProblems(m) {
  if (!m) return [`no ${BLIND_MARKER}: images are not from a blind capture (npm run walkthrough -- <slug> --blind)`];
  const out = [];
  if (m.mode !== "blind") out.push(`${BLIND_MARKER}: mode is ${JSON.stringify(m.mode)}, not "blind"`);
  for (const k of Object.keys(BLIND_SELECTORS)) if (!(m.hidden ?? []).includes(k)) out.push(`${BLIND_MARKER}: "${k}" not hidden`);
  if (m.visibleTextCheck !== "pass") out.push(`${BLIND_MARKER}: capture-time visible-text check did not pass`);
  return out;
}

// Copy one blind capture into a packet side (A/ or B/): frames, sheet.png, redacted transcript, marker.
export function copySide(captureDir, dstDir) {
  const problems = markerProblems(readMarker(captureDir));
  if (problems.length) throw new Error(`${captureDir}: ${problems.join("; ")}`);
  fs.mkdirSync(dstDir, { recursive: true });
  for (const f of fs.readdirSync(captureDir)) if (f.endsWith(".png")) fs.copyFileSync(path.join(captureDir, f), path.join(dstDir, f));
  const { text, removed } = redactTranscript(fs.readFileSync(path.join(captureDir, "transcript.md"), "utf8"));
  fs.writeFileSync(path.join(dstDir, "transcript.md"), text);
  fs.copyFileSync(path.join(captureDir, BLIND_MARKER), path.join(dstDir, BLIND_MARKER));
  return { removed };
}

const TEXT_EXT = new Set([".md", ".json", ".txt", ".jsonl", ".html"]);
const JUDGE_OUTPUT = new Set(["verdict.json", "leak.md"]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}

// Check one pair packet. Returns { ok, problems: string[], sheets: string[] }.
export function checkPacket(pairDir) {
  const problems = [];
  const sheets = [];
  for (const side of ["A", "B"]) {
    const d = path.join(pairDir, side);
    if (!fs.existsSync(d)) {
      problems.push(`${side}/ missing`);
      continue;
    }
    for (const p of markerProblems(readMarker(d))) problems.push(`${side}/${p}`);
    if (fs.existsSync(path.join(d, "sheet.png"))) sheets.push(path.join(d, "sheet.png"));
    else problems.push(`${side}/sheet.png missing`);
    if (!fs.existsSync(path.join(d, "transcript.md"))) problems.push(`${side}/transcript.md missing`);
  }
  for (const f of walk(pairDir)) {
    if (!TEXT_EXT.has(path.extname(f)) || JUDGE_OUTPUT.has(path.basename(f))) continue;
    for (const h of findForbidden(fs.readFileSync(f, "utf8"))) problems.push(`${path.relative(pairDir, f)}:${h.line}: ${h.what}: ${h.text}`);
  }
  return { ok: problems.length === 0, problems, sheets };
}

// A run dir holds pair-* dirs; a pair dir holds A/ and B/.
export function checkPackets(root) {
  const pairs = fs.existsSync(path.join(root, "A"))
    ? [root]
    : fs
        .readdirSync(root, { withFileTypes: true })
        .filter((e) => e.isDirectory() && e.name.startsWith("pair-"))
        .map((e) => path.join(root, e.name))
        .sort();
  return pairs.map((dir) => ({ dir, ...checkPacket(dir) }));
}

function main() {
  const [cmd, root] = process.argv.slice(2);
  if (cmd !== "check" || !root) {
    console.log("usage: node tools/eval/packets.mjs check <run dir | pair dir>");
    process.exit(2);
  }
  if (!fs.existsSync(root)) {
    console.log(`no such directory: ${root}`);
    process.exit(2);
  }
  const results = checkPackets(root);
  let bad = 0;
  for (const r of results) {
    if (r.ok) continue;
    bad++;
    console.log(`FAIL ${r.dir}`);
    for (const p of r.problems.slice(0, 12)) console.log(`  ! ${p}`);
    if (r.problems.length > 12) console.log(`  … ${r.problems.length - 12} more`);
  }
  console.log(`packets: ${results.length} checked, ${results.length - bad} pass, ${bad} fail`);
  if (results.length && !bad) {
    console.log("Reviewer: eyeball one sheet.png per packet before dispatch (images are not OCR'd), for example:");
    for (const r of results) console.log(`  ${r.sheets[0]}`);
  }
  if (bad || !results.length) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
