// HQ Personalization Lab: the no-real-data grep as a test (W-1529; lab privacy DoD D4/D5,
// company/personalization/lab/2026-10-16-lab-privacy-dod.md §2 and F2).
//
// The one exception is privacy-reviewer's ruling, company/reviews/_privacy/2026-10-16-personalization-batch-reads.md
// line 36: "a hit is allowed only if it is a `fetch` of the **literal** path `/api/hq/personalization` (query
// string built from the lab's own controls) ... This is not a general allowance for `/api/` or `fetch`: any other
// URL, any variable URL, `localStorage`, `s3c:`, an accounts/event-intake import is still a finding."
// and line 39 (L1): "It must fail on any `fetch` whose first argument is not the literal route, on any other
// `/api/`, on a template that interpolates anything before the `?`, and on every other pattern in the grep
// (localStorage, `s3c:`, sessionStorage, indexedDB, `document.cookie`, `cookies()`, `headers()`, imports matching
// `account|auth|session|events-intake|progress`). The module list is updated when the accounts module lands".
//
// Beyond the ruling (stricter, so a change here needs no new read): XMLHttpRequest, sendBeacon, WebSocket,
// EventSource, any `.headers` / `.cookies` property read, `next/headers`, a non-literal import()/require(), and an
// import allowlist: any module the lab files import that is not listed below fails until someone checks it.
// A scoped file that goes missing fails too (a rename must not leave the test scanning nothing), and every file
// under the lab page folder is scanned, so a new component is covered without editing this list.
//
// Comments are scanned like code (stripping them would hide hits after a "//" inside a URL string); the route's
// header comment names /api/hq/personalization, which the /api rule allows (ruling line 36: "H3 (a comment) is not
// a hit that matters").
// Known limit: a grep cannot see a name assembled at run time (window["fe" + "tch"], "/a" + "pi/"). The import
// allowlist and review of src/app/hq/** (hq-engineer) cover that; privacy-reviewer re-reads under L2.
// The import allowlist is a trust list, not a scan: the modules on IMPORT_ALLOW (for example @/lib/hq, ../HqTop,
// ../model.ts, ./simulate.mjs) are trusted by name and their own contents are not scanned here. A change to any
// allowlisted file is re-read by hq-engineer under ruling L2 (company/reviews/hq/2026-10-16-d2-review.md M1).
// Precomputed mode (W-1572 H1): the reader module, the generator (tools/hq-lab-precompute.mjs) and the committed
// data folder are in scope; .gz files are decompressed before the scan. Data files (.json, .gz, .md) get every rule
// except the import rules, which apply to code files only (a JSON key "from" is not an import).
// CSS: any url() with a scheme (https:, http:, data: and the rest) or a protocol-relative "//" fails, so a style
// cannot load from outside the lab (D2 review M3). Lab styles need no images today.
// W-1552 (company/reviews/hq/2026-10-16-u1-review.md): `@import` and `image-set(` fail too, since neither needs `url(`.
//
// The second test proves the scanner is not blind: each forbidden pattern is planted in a temp copy and must fail.
// Run: npm run test:hq. It is enforced by `npm run verify` (which runs test:hq), not by `npm run check` (D2 review M5).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import zlib from "node:zlib";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** The lab's files (DoD §2). Directories are walked; every file in them is scanned. */
export const SCOPE = [
  "src/app/hq/personalization",
  "src/app/api/hq/personalization",
  "src/lib/hq-personalization.ts",
  "src/lib/hq-personalization-server.ts",
  "src/lib/hq-personalization-precomputed.ts",
  "src/data/hq-personalization",
  "tools/hq-lab-precompute.mjs",
  "company/personalization/model/sim/hq-cli.mjs",
  // W-1648 (batch 5 §20): frozen candidates and the Evaluation view
  "src/lib/hq-personalization-candidates.ts",
  "tools/hq-lab-candidates.mjs",
  "tools/hq-eval-index.mjs",
  "src/data/hq-personalization-eval",
];
/** Must exist (a rename or move fails the test instead of silently shrinking the scan). */
const REQUIRED = [
  "src/app/hq/personalization/page.tsx",
  "src/app/hq/personalization/Personalization.tsx",
  "src/app/api/hq/personalization/route.ts",
  "src/lib/hq-personalization.ts",
  "src/lib/hq-personalization-server.ts",
  "src/lib/hq-personalization-precomputed.ts",
  "src/data/hq-personalization/manifest.json",
  "src/data/hq-personalization/meta.json",
  "tools/hq-lab-precompute.mjs",
  "company/personalization/model/sim/hq-cli.mjs",
  "src/app/hq/personalization/candidates/page.tsx",
  "src/app/hq/personalization/candidates/Candidates.tsx",
  "src/app/hq/personalization/evaluation/page.tsx",
  "src/app/hq/personalization/evaluation/Evaluation.tsx",
  "src/lib/hq-personalization-candidates.ts",
  "tools/hq-lab-candidates.mjs",
  "tools/hq-eval-index.mjs",
  "src/data/hq-personalization-eval/evaluation.json",
];

/** Modules the lab files may import. Adding one is a read: check it touches no learner data first. */
const IMPORT_ALLOW = new Set([
  "react", "next/link", "next/navigation",
  "node:child_process", "node:fs", "node:path", "node:url", "node:crypto", "node:zlib",
  "@/lib/hq", "@/lib/hq-personalization", "@/lib/hq-personalization-server", "./hq-personalization-precomputed",
  "./hq-personalization", "./Personalization", "./personalization.module.css", "../HqTop", "../hq.module.css",
  // hq-cli.mjs → the model and simulator (learner-model-engineer's files; data inputs listed in DoD D1)
  "../model.ts", "../personas.ts", "./catalog.mjs", "./simulate.mjs", "./learner.ts", "./score.ts",
  // W-1648: the candidate and Evaluation views (server components; committed data only)
  "../../HqTop", "../../hq.module.css", "../personalization.module.css", "./Candidates", "./Evaluation",
  "@/lib/hq-personalization-candidates", "@/lib/hq-personalization-precomputed", "./hq-personalization-candidates",
  "@/data/hq-personalization-eval/evaluation.json",
  // tools/hq-lab-candidates.mjs: the lab simulator (same files as hq-cli.mjs) and the two frozen candidates, hash-checked
  "../src/lib/hq-personalization-candidates.ts", "../company/personalization/model/model.ts", "../company/personalization/model/personas.ts",
  "../company/personalization/model/sim/simulate.mjs", "../company/personalization/model/sim/learner.ts", "../company/personalization/model/sim/score.ts",
  "../company/personalization/model/sim/composer.ts", "../company/personalization/model/sim/catalog.mjs",
  "../company/personalization/policies/reachable-v2.ts", "../company/personalization/policies/reachable-v3.ts",
]);
/** Ruling L1: the module list. Update when the accounts module lands (ruling line 39). */
const FORBIDDEN_MODULE = /account|auth|session|events-intake|progress/i;

const ROUTE = "/api/hq/personalization";
// fetch( <literal route, optionally "?" + query> ) — a quote of any kind, nothing interpolated before the "?".
const ALLOWED_FETCH = /^fetch\(\s*(?:`\/api\/hq\/personalization(?:\?[^`]*)?`|"\/api\/hq\/personalization(?:\?[^"\n]*)?"|'\/api\/hq\/personalization(?:\?[^'\n]*)?')\s*[,)]/;

/** Plain patterns: any hit is a finding. [rule, regex] */
const FORBIDDEN = [
  ["localStorage", /localStorage/],
  ["s3c:", /s3c:/],
  ["sessionStorage", /sessionStorage/],
  ["indexedDB", /indexedDB/i],
  ["document.cookie", /document\s*\.\s*cookie/],
  ["cookies()", /\bcookies\s*\(/],
  ["headers()", /\bheaders\s*\(/],
  // beyond the ruling
  [".headers read", /\.\s*headers\b/],
  [".cookies read", /\.\s*cookies\b/],
  ["XMLHttpRequest", /XMLHttpRequest/],
  ["sendBeacon", /sendBeacon/],
  ["WebSocket", /WebSocket/],
  ["EventSource", /EventSource/],
  // D2 review M3: a url() that names a scheme or a host (protocol-relative) in any lab file, CSS included.
  ["url() with a scheme or host", /\burl\(\s*["']?\s*(?:[a-z][a-z0-9+.-]*:|\/\/)/i],
  // W-1552: CSS loads that need no url(): @import "…" and image-set("…") (also -webkit-image-set).
  ["@import", /@import\b/i],
  ["image-set()", /\bimage-set\s*\(/i],
];

function listFiles(root) {
  const out = [];
  for (const rel of SCOPE) {
    const abs = path.join(root, rel);
    if (!fs.existsSync(abs)) continue;
    if (fs.statSync(abs).isDirectory()) {
      const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) (e.isDirectory() ? walk(path.join(d, e.name)) : out.push(path.join(d, e.name))); };
      walk(abs);
    } else out.push(abs);
  }
  return out.map((f) => path.relative(root, f).split(path.sep).join("/")).sort();
}

const lineOf = (text, i) => text.slice(0, i).split("\n").length;

/** Scan the lab under `root`. Returns { files, findings: [{file, line, rule, text}], allowedFetches }. */
export function scanLab(root = REPO) {
  const findings = [];
  let allowedFetches = 0;
  for (const rel of REQUIRED) if (!fs.existsSync(path.join(root, rel))) findings.push({ file: rel, line: 0, rule: "missing scoped file", text: "" });
  const files = listFiles(root);
  for (const file of files) {
    const raw = fs.readFileSync(path.join(root, file));
    let text;
    try { text = file.endsWith(".gz") ? zlib.gunzipSync(raw).toString("utf8") : raw.toString("utf8"); }
    catch { findings.push({ file, line: 0, rule: "unreadable .gz", text: "" }); continue; }
    const hit = (i, rule) => findings.push({ file, line: lineOf(text, i), rule, text: text.split("\n")[lineOf(text, i) - 1].trim().slice(0, 160) });
    for (const [rule, re] of FORBIDDEN) for (const m of text.matchAll(new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g"))) hit(m.index, rule);
    // fetch: every mention must be the allowed literal call (an alias such as `const f = fetch` is a finding).
    for (const m of text.matchAll(/\bfetch\b/g)) {
      if (ALLOWED_FETCH.test(text.slice(m.index))) allowedFetches++;
      else hit(m.index, "fetch other than the literal lab route");
    }
    // /api: every mention must be the lab's own route, followed by nothing that extends the path.
    for (const m of text.matchAll(/\/api\b/g)) {
      if (!/^\/api\/hq\/personalization(?![\w/$.-])/.test(text.slice(m.index))) hit(m.index, "other /api/ path");
    }
    // imports: static (`from "x"`), side-effect (`import "x"`), dynamic (`import(x)`) and require(x). Code files only:
    // in stored JSON a key such as "from":"phase-B" is data, not an import (data files get every other rule).
    if (!/\.(?:[cm]?[jt]sx?|css)$/.test(file)) continue;
    const checkSpec = (i, spec) => {
      if (FORBIDDEN_MODULE.test(spec)) hit(i, "forbidden module import");
      else if (!IMPORT_ALLOW.has(spec)) hit(i, "import not on the allowlist");
    };
    for (const m of text.matchAll(/\b(?:from|import)\s*(["'`])([^"'`\n]*)\1/g)) checkSpec(m.index, m[2]);
    for (const m of text.matchAll(/\b(?:import|require)\s*\(\s*([^)\n]*)\)/g)) {
      const lit = /^(["'`])([^"'`$]*)\1\s*$/.exec(m[1]);
      if (!lit) hit(m.index, "non-literal import/require");
      else checkSpec(m.index, lit[2]);
    }
  }
  return { files, findings, allowedFetches };
}

const fmt = (fs_) => fs_.map((f) => `${f.file}:${f.line} [${f.rule}] ${f.text}`).join("\n");

test("lab: no path to real learner data (only fetch of the literal /api/hq/personalization)", () => {
  const { files, findings, allowedFetches } = scanLab(REPO);
  assert.ok(files.length >= REQUIRED.length, `scanned ${files.length} files`);
  assert.deepEqual(findings, [], `no-real-data grep findings:\n${fmt(findings)}`);
  assert.ok(allowedFetches >= 1, "the scanner saw the lab's own fetch (it is not blind)");
});

// Each row plants one forbidden pattern into a temp copy of the lab; the scan must report it under `rule`.
const PX = "src/app/hq/personalization/Personalization.tsx";
const RT = "src/app/api/hq/personalization/route.ts";
const CLI = "company/personalization/model/sim/hq-cli.mjs";
export const BREAKS = [
  ["fetch of a variable URL", PX, "const r0 = await fetch(url);", "fetch other than the literal lab route"],
  ["fetch of another /api/ route", PX, 'const r0 = await fetch("/api/events");', "fetch other than the literal lab route"],
  ["fetch interpolating before the ?", PX, "const r0 = await fetch(`/api/hq/personalization${who}?${q}`);", "fetch other than the literal lab route"],
  ["fetch with an interpolated prefix", PX, "const r0 = await fetch(`${origin}/api/hq/personalization?${q}`);", "fetch other than the literal lab route"],
  ["fetch of an absolute URL", PX, 'const r0 = await fetch("https://example.com/api/hq/personalization");', "fetch other than the literal lab route"],
  ["fetch of a route that extends the path", PX, 'const r0 = await fetch("/api/hq/personalization/../events");', "fetch other than the literal lab route"],
  ["fetch aliased", PX, "const f0 = globalThis.fetch;", "fetch other than the literal lab route"],
  ["fetch of a constant holding the literal", PX, 'const U = "/api/hq/personalization"; fetch(U);', "fetch other than the literal lab route"],
  ["another /api/ path in a string", PX, 'const u0 = "/api/progress";', "other /api/ path"],
  ["/api path built from pieces", PX, 'const u0 = "/api" + "/events";', "other /api/ path"],
  ["/api/ in CSS", "src/app/hq/personalization/personalization.module.css", ".x { background: url(/api/events); }", "other /api/ path"],
  ["external url() in CSS", "src/app/hq/personalization/personalization.module.css", ".x { background: url(https://example.com/p.png?u=1); }", "url() with a scheme or host"],
  ["quoted external url() in CSS", "src/app/hq/personalization/personalization.module.css", '.x { background-image: url( "http://example.com/p.png" ); }', "url() with a scheme or host"],
  ["protocol-relative url() in CSS", "src/app/hq/personalization/personalization.module.css", "@font-face { src: url('//example.com/f.woff2'); }", "url() with a scheme or host"],
  ["external url() in an inline style", PX, 'const st0 = { backgroundImage: "url(https://example.com/p.png)" };', "url() with a scheme or host"],
  ["localStorage", PX, 'const v0 = localStorage.getItem("x");', "localStorage"],
  ["s3c: key", CLI, 'const k0 = "s3c:progress:v1";', "s3c:"],
  ["sessionStorage", PX, "sessionStorage.clear();", "sessionStorage"],
  ["indexedDB", PX, 'indexedDB.open("s");', "indexedDB"],
  ["document.cookie", PX, "const c0 = document.cookie;", "document.cookie"],
  ["cookies()", RT, "const c0 = cookies();", "cookies()"],
  ["headers()", RT, "const h0 = await headers();", "headers()"],
  ["request header read", RT, 'const h0 = req.headers.get("cookie");', ".headers read"],
  ["XMLHttpRequest", PX, "const x0 = new XMLHttpRequest();", "XMLHttpRequest"],
  ["sendBeacon", PX, 'navigator.sendBeacon("/x", "y");', "sendBeacon"],
  ["WebSocket", PX, 'const w0 = new WebSocket("ws://x");', "WebSocket"],
  ["EventSource", PX, 'const e0 = new EventSource("/x");', "EventSource"],
  ["accounts import", PX, 'import { me } from "@/lib/accounts";', "forbidden module import"],
  ["auth import", RT, 'import { session } from "@/lib/auth";', "forbidden module import"],
  ["session import", "src/lib/hq-personalization-server.ts", 'import { s } from "./session-store";', "forbidden module import"],
  ["events-intake import", RT, 'import { intake } from "@/lib/events-intake";', "forbidden module import"],
  ["progress import", PX, 'import { read } from "@/components/progress";', "forbidden module import"],
  ["require of accounts", CLI, 'const a0 = require("../../accounts.js");', "forbidden module import"],
  ["side-effect import of progress", PX, 'import "@/lib/progress-sync";', "forbidden module import"],
  ["dynamic import of a variable", PX, "const m0 = await import(name);", "non-literal import/require"],
  ["dynamic import of a template", PX, "const m0 = await import(`@/lib/${name}`);", "non-literal import/require"],
  ["import not on the allowlist", PX, 'import { trusted } from "@/lib/trust";', "import not on the allowlist"],
  ["next/headers", RT, 'import { cookies as c } from "next/headers";', "import not on the allowlist"],
  ["new file in the lab folder", "src/app/hq/personalization/Extra.tsx", 'export const v = () => localStorage.getItem("s3c:x");', "localStorage"],
  // W-1552 (company/reviews/hq/2026-10-16-u1-review.md)
  ["@import of an external stylesheet", "src/app/hq/personalization/personalization.module.css", '@import "https://example.com/x.css";', "@import"],
  ["image-set() with an external image", "src/app/hq/personalization/personalization.module.css", '.x { background-image: image-set("https://example.com/p.png" 1x); }', "image-set()"],
  ["-webkit-image-set()", "src/app/hq/personalization/personalization.module.css", ".x { background-image: -webkit-image-set('//example.com/p.png' 1x); }", "image-set()"],
  // W-1572 H1: the precomputed reader, the generator and the committed data are scanned too.
  ["precomputed reader fetch", "src/lib/hq-personalization-precomputed.ts", 'const r0 = await fetch("/api/events");', "fetch other than the literal lab route"],
  ["precomputed reader import", "src/lib/hq-personalization-precomputed.ts", 'import { me } from "@/lib/accounts";', "forbidden module import"],
  ["generator reads storage keys", "tools/hq-lab-precompute.mjs", 'const k0 = "s3c:progress:v1";', "s3c:"],
  ["stored meta names a storage key", "src/data/hq-personalization/meta.json", '{"from":"localStorage"}', "localStorage"],
  // W-1648: candidate views, adapter, eval index generator and their data
  ["candidates view fetch", "src/app/hq/personalization/candidates/Candidates.tsx", 'const r0 = await fetch("/api/events");', "fetch other than the literal lab route"],
  ["evaluation view storage", "src/app/hq/personalization/evaluation/Evaluation.tsx", 'const v0 = localStorage.getItem("x");', "localStorage"],
  ["adapter imports reachable-v1", "tools/hq-lab-candidates.mjs", 'const v1 = await import("../company/personalization/policies/reachable-v1.ts");', "import not on the allowlist"],
  ["adapter imports the eval harness", "tools/hq-lab-candidates.mjs", 'import { w } from "../company/personalization/eval/harness/c3/world3.mjs";', "import not on the allowlist"],
  ["eval index generator imports progress", "tools/hq-eval-index.mjs", 'import { p } from "../src/kit/progress.ts";', "forbidden module import"],
  ["stored candidate (gz) names a storage key", "src/data/hq-personalization/candidates/x.reachable-v3.seed1.days7.json.gz", '{"key":"s3c:progress:v1"}', "s3c:"],
  ["stored eval index names a storage key", "src/data/hq-personalization-eval/evaluation.json", '{"quote":"localStorage"}', "localStorage"],
  ["stored trace (gz) names a storage key", "src/data/hq-personalization/runs/x.gam.seed1.days7.json.gz", '{"key":"s3c:progress:v1"}', "s3c:"],
];

function copyLab(dest) {
  for (const rel of listFiles(REPO)) {
    fs.mkdirSync(path.dirname(path.join(dest, rel)), { recursive: true });
    fs.copyFileSync(path.join(REPO, rel), path.join(dest, rel));
  }
}

test("break check: every forbidden pattern planted in a temp copy fails the scan", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hq-lab-privacy-"));
  try {
    const clean = path.join(tmp, "clean");
    copyLab(clean);
    assert.deepEqual(scanLab(clean).findings, [], "control: the unbroken copy scans clean");
    BREAKS.forEach(([name, file, code, rule], i) => {
      const dir = path.join(tmp, `b${i}`);
      copyLab(dir);
      const abs = path.join(dir, file);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      if (file.endsWith(".gz")) fs.writeFileSync(abs, zlib.gzipSync(Buffer.from(code))); // scanned decompressed
      else fs.appendFileSync(abs, `\n${code}\n`);
      const { findings } = scanLab(dir);
      assert.ok(findings.some((f) => f.file === file && f.rule === rule), `break "${name}" not caught as [${rule}]; got:\n${fmt(findings) || "(no findings)"}`);
    });
    const gone = path.join(tmp, "missing");
    copyLab(gone);
    fs.rmSync(path.join(gone, RT));
    assert.ok(scanLab(gone).findings.some((f) => f.file === RT && f.rule === "missing scoped file"), "a missing scoped file fails");
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
});
