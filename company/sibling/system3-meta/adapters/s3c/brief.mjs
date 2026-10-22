#!/usr/bin/env node
// brief.mjs: read one System 3 Company brief section and turn it into the input of Meta's
// `order new --accept` (plan 2026-10-21-m4-m7-plan.md §4, row "brief.mjs"; §M4 "Live run": the
// `accept` field holds the brief text from brief.mjs). Read-only: it never writes a byte.
//
//   node brief.mjs <brief-file> <slug> [--json] [--repo=<path>]
//        <brief-file>: absolute, relative to --repo, or a bare name under company/domains/briefs/
//        prints the accept text, then one JSON line {ok, findings[], brief, eligibility, accept, orderArgv}
//   node brief.mjs --list [--domain=<id>] [--any-format] [--repo=<path>]
//        prints the eligible queue: the same rules as `tools/claim.mjs next`, computed read-only
//   --locks=<dir>[,<dir>]  the checkouts whose company/ops/claims are read; default: --repo's claim root
//        plus the main checkout /home/user/system-3-company, where real builders' locks land (lockState)
//
// Exit: 0 pass · 1 revise (a blocking finding: not found, duplicate, built, skipped, no format, locked) ·
//       2 usage · 3 stage-error (the repo is not a company checkout; environment, not a defect).
//
// Why the queue rules are COPIED, not imported: tools/claim.mjs runs fs.mkdirSync(company/ops/claims)
// at module load (claim.mjs:25) and dispatches on argv at top level, so importing it writes and runs a
// command (maps.json maps[1].facts[1], risks[9]; plan §4 "Does not import tools/claim.mjs").
// tests/brief.test.mjs guards the copy two ways: it asserts the regex literals below still appear
// verbatim in claim.mjs, and it drives the real claim.mjs `next` in a temp repo until NONE and
// compares the hand-out order with --list.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_REPO = "/home/user/s3c-wt/base";
const BRIEFS = "company/domains/briefs";
// The main checkout. Company builders run /home/user/system-3-company/tools/claim.mjs (the path in its
// usage header, claim.mjs:6), and claim.mjs keeps its locks under the checkout the script sits in
// (claim.mjs:19-23), so a lock a real builder holds lives here, not in the sandbox --repo.
export const MAIN_CHECKOUT = "/home/user/system-3-company";

// --- regexes copied verbatim from tools/claim.mjs (the parity test greps for these sources) ---
// claim.mjs:36 briefSlugs(): the brief heading; group 1 is the slug.
export const HEADING_RE = /^#{2,3}\s+\d+\.\s+([a-z0-9-]+)\s/gm;
// claim.mjs:48 formatOf(): sections are split at each numbered heading (lookahead keeps the heading).
export const SPLIT_RE = /^(?=#{2,3}\s+\d+\.\s)/m;
// claim.mjs:50 formatOf(): the format line, searched anywhere in the split part (heading included).
export const FORMAT_RE = /\*{0,2}format\*{0,2}\s*[:\u2014-]\s*\*{0,2}\s*([^\n]+)/i;
// claim.mjs:26 STALE_MS: a lock older than 6 h with no "done" can be taken again.
export const STALE_MS = 6 * 3600_000;

const SEV = { error: "error", warn: "warn" };
const finding = (severity, code, msg, extra = {}) => ({ severity, code, msg, ...extra });

// ---------------------------------------------------------------------------------------------
// Repo access (all reads). A "repo" is a company checkout or worktree (default: the sandbox base).

export function openRepo(repo) {
  const root = path.resolve(repo);
  for (const p of [BRIEFS, "src/demos", "content/domains.json"]) {
    if (!fs.existsSync(path.join(root, p))) return { root, error: `not a company checkout: ${path.join(root, p)} missing` };
  }
  return { root, error: null };
}

// claim.mjs:39 built(): any src/demos/<d>/<slug>/meta.json makes the slug built.
export function isBuilt(root, slug) {
  const demos = path.join(root, "src/demos");
  return fs.readdirSync(demos).some((d) => fs.existsSync(path.join(demos, d, slug, "meta.json")));
}
// Where it is built (for the finding text only).
function builtAt(root, slug) {
  const demos = path.join(root, "src/demos");
  const d = fs.readdirSync(demos).find((d) => fs.existsSync(path.join(demos, d, slug, "meta.json")));
  return d ? `src/demos/${d}/${slug}/meta.json` : null;
}

// claim.mjs:41 skipped(): keys of company/ops/brief-skips.json .skips; unreadable file = no skips.
export function readSkips(root) {
  try { return JSON.parse(fs.readFileSync(path.join(root, "company/ops/brief-skips.json"), "utf8")).skips ?? {}; } catch { return {}; }
}

// claim.mjs:19-23: ROOT is the checkout the script sits in, cut back to the main checkout when the script
// path contains /.claude/worktrees/. This is the root whose company/ops/claims a --repo's own claim.mjs uses.
export function claimRootOf(repo) {
  const marker = `${path.sep}.claude${path.sep}worktrees${path.sep}`;
  const r = path.resolve(repo);
  return r.includes(marker) ? r.slice(0, r.indexOf(marker)) : r;
}

// The checkouts whose company/ops/claims are read. Default: the --repo's claim root, plus MAIN_CHECKOUT
// when it exists and differs, because that is where real company builders' locks land (see above). A lock
// in ANY of them blocks: the adapter must not hand Meta a brief a company builder is building (double
// build). Plan §4 says Meta's lease replaces the claim lock for Meta's own orders; it does not remove
// the company builders' locks. `--locks=<dir>[,<dir>]` replaces the default (the tests pin it).
export function defaultLockRoots(root) {
  const roots = [claimRootOf(root)];
  if (fs.existsSync(MAIN_CHECKOUT) && !roots.includes(path.resolve(MAIN_CHECKOUT))) roots.push(path.resolve(MAIN_CHECKOUT));
  return roots;
}

// claim.mjs:62-75 tryLock(), evaluated without writing, for one claims dir. A lock blocks when it is done or
// younger than STALE_MS. claim.mjs read() (claim.mjs:30) returns null when the file does not parse, and
// otherwise the parsed value, which may be falsy (`null`, `0`, `false`, `""`). For ANY falsy value, tryLock
// skips both the "held" test (`prev && …`) and the stale rmSync (`if (prev)`), so openSync("wx") fails on the
// existing file and the slug is never handed out: it blocks. A truthy non-object (`1`, `true`, `[]`, `"x"`)
// has no .done and Date.parse(undefined) is NaN, so tryLock deletes it as stale and takes the slug: stale,
// not blocking. A lock with an unparsable `at` is stale for the same NaN reason.
function lockStateIn(lockRoot, slug, now) {
  const p = path.join(lockRoot, "company/ops/claims", `${slug}.json`);
  if (!fs.existsSync(p)) return { blocks: false, state: "none" };
  let c;
  try { c = JSON.parse(fs.readFileSync(p, "utf8")); } catch { return { blocks: true, state: "unreadable", path: p }; }
  if (!c) return { blocks: true, state: "unreadable", path: p, value: c };
  if (c.done) return { blocks: true, state: "done", agent: c.agent, at: c.at, done: c.done, path: p };
  const fresh = now - Date.parse(c.at) < STALE_MS;
  return fresh ? { blocks: true, state: "held", agent: c.agent, at: c.at, path: p } : { blocks: false, state: "stale", agent: c.agent, at: c.at, path: p };
}

// The lock state over every lock root: the first blocking one, else the first stale one, else none.
export function lockState(lockRoots, slug, now = Date.now()) {
  const states = (Array.isArray(lockRoots) ? lockRoots : [lockRoots]).map((r) => lockStateIn(r, slug, now));
  return states.find((s) => s.blocks) ?? states.find((s) => s.state === "stale") ?? { blocks: false, state: "none" };
}

// claim.mjs:33-37 briefSlugs(domain): "<domain>.md" first, then every other file starting "<domain>."
// sorted by name. Throws (as claim.mjs does) when "<domain>.md" is missing.
export function domainFiles(root, domain) {
  const dir = path.join(root, BRIEFS);
  const files = [`${domain}.md`, ...fs.readdirSync(dir).filter((f) => f.startsWith(`${domain}.`) && f !== `${domain}.md`).sort()];
  if (!fs.existsSync(path.join(dir, files[0]))) throw new Error(`no briefs for ${domain}`);
  return files;
}

// claim.mjs:44-57 formatOf(domain): slug → format text (undefined when the part has no format line).
// Same file set and order as claim.mjs (unsorted readdir), so a duplicated slug resolves the same way.
export function formatMap(root, domain) {
  const dir = path.join(root, BRIEFS);
  const m = new Map();
  for (const f of fs.readdirSync(dir).filter((f) => f === `${domain}.md` || f.startsWith(`${domain}.`))) {
    const parts = fs.readFileSync(path.join(dir, f), "utf8").split(SPLIT_RE);
    for (const p of parts) {
      const h = p.match(/^#{2,3}\s+\d+\.\s+([a-z0-9-]+)\s/);
      if (!h) continue;
      const fm = p.match(FORMAT_RE);
      m.set(h[1], fm ? fm[1].replace(/\*+/g, "").trim() : undefined);
    }
  }
  return m;
}

// ---------------------------------------------------------------------------------------------
// The queue (`--list`): claim.mjs:77-88 `next`, for every candidate rather than the first.
// A slug is handed out when: not built, not in brief-skips, has a format (or --any-format; the
// NEW_STYLE grandfather clause at claim.mjs:60/83 is `fmt !== undefined || built(s)`, and built slugs
// are already excluded, so it reduces to "has a format"), and tryLock would succeed (no live lock).

// Duplicates: briefSlugs() (claim.mjs:37) keeps every heading, so a slug written in two files (or twice
// in one) appears twice in the list, but every rule above is per SLUG (built, skips, formatOf's Map, the
// lock file name). The first copy takes the lock and the second then fails tryLock, and the same holds
// across domains. So the slug is handed out once: the first copy in domain order (content/domains.json,
// then the file order of domainFiles) is kept and later copies are counted as duplicates with a finding.
export function queue(root, { domains = null, anyFormat = false, now = Date.now(), lockRoots = defaultLockRoots(root) } = {}) {
  const all = JSON.parse(fs.readFileSync(path.join(root, "content/domains.json"), "utf8")).domains ?? [];
  const ids = domains ?? all.map((d) => d.id);
  const skips = readSkips(root);
  const findings = [];
  const eligible = [];
  const ineligible = { skipped: 0, noFormat: 0, locked: 0 }; // built slugs are not counted as unbuilt at all
  const perDomain = {};
  const seen = new Map(); // slug → "file:line" of the first copy
  let unbuilt = 0, duplicateHeadings = 0;
  for (const domain of ids) {
    let files;
    try { files = domainFiles(root, domain); } catch (e) {
      // `claim.mjs next <domain>` throws here; briefs in strand files of such a domain are unreachable.
      findings.push(finding(SEV.warn, "no-domain-file", `claim.mjs next ${domain} throws "${e.message}": ${BRIEFS}/${domain}.md is missing`, { domain }));
      perDomain[domain] = { next: null, eligible: 0, error: e.message };
      continue;
    }
    const fmt = formatMap(root, domain);
    const rows = [];
    for (const f of files) {
      const text = fs.readFileSync(path.join(root, BRIEFS, f), "utf8");
      for (const m of text.matchAll(HEADING_RE)) {
        const slug = m[1];
        const line = text.slice(0, m.index).split("\n").length;
        const at = `${BRIEFS}/${f}:${line}`;
        if (seen.has(slug)) {
          duplicateHeadings++;
          findings.push(finding(SEV.warn, "duplicate", `${slug} at ${at} repeats ${seen.get(slug)}; claim.mjs hands the slug out once (the first copy)`, { slug, at, first: seen.get(slug) }));
          continue;
        }
        seen.set(slug, at);
        if (isBuilt(root, slug)) continue;
        unbuilt++;
        if (Object.hasOwn(skips, slug)) { ineligible.skipped++; continue; }
        if (!anyFormat && fmt.get(slug) === undefined) { ineligible.noFormat++; continue; }
        const lock = lockState(lockRoots, slug, now);
        if (lock.blocks) { ineligible.locked++; continue; }
        rows.push({ slug, domain, file: `${BRIEFS}/${f}`, line, format: fmt.get(slug) ?? null, lock: lock.state });
      }
    }
    perDomain[domain] = { next: rows[0]?.slug ?? null, eligible: rows.length };
    eligible.push(...rows);
  }
  const byFile = {};
  for (const r of eligible) byFile[path.basename(r.file)] = (byFile[path.basename(r.file)] ?? 0) + 1;
  return { eligible, counts: { unbuilt, eligible: eligible.length, ineligible, duplicateHeadings, byFile }, perDomain, findings, lockRoots };
}

// ---------------------------------------------------------------------------------------------
// Parsing one brief section. The field names come from the brief format the category managers use
// (maps.json maps[1].facts[0]; e.g. math.geometry.md lines 10-28). Bullet labels vary across the 56
// files ("Planned claims" / "Claims to check" / "Claims", "Prediction (kit text)" / "Prediction"),
// so every top-level bullet is kept raw in `fields`, and the named fields are best-effort extractions.

const norm = (label) => label.replace(/\*+/g, "").replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim().toLowerCase();

// Locate <slug>'s heading in a file's text. Returns null when absent.
export function locate(text, slug) {
  const hits = [...text.matchAll(HEADING_RE)].filter((m) => m[1] === slug);
  if (!hits.length) return null;
  const lines = text.split("\n");
  const startLine = text.slice(0, hits[0].index).split("\n").length - 1; // 0-based
  // The section ends at the next heading of level 1-3 (a numbered brief or a group heading such as
  // "## Wave J"). claim.mjs's own split (SPLIT_RE) runs to the next NUMBERED heading and so swallows
  // a following group intro; that split is used only for the format rule, to stay in parity.
  let end = lines.length;
  for (let i = startLine + 1; i < lines.length; i++) if (/^#{1,3}\s/.test(lines[i])) { end = i; break; }
  // The group this brief sits under: the nearest earlier non-numbered heading and its intro text
  // (it holds shared build rules, e.g. math.geometry.md:5-8 "Shared build rules: as in …").
  let group = null;
  for (let i = startLine - 1; i >= 0; i--) {
    if (/^#{1,3}\s/.test(lines[i]) && !/^#{2,3}\s+\d+\.\s/.test(lines[i])) {
      let j = i + 1;
      while (j < lines.length && !/^#{1,3}\s/.test(lines[j])) j++;
      group = { heading: lines[i].replace(/^#+\s*/, ""), line: i + 1, intro: lines.slice(i + 1, j).join("\n").trim() };
      break;
    }
  }
  const part = text.slice(hits[0].index).split(SPLIT_RE)[0];
  return { count: hits.length, line: startLine + 1, endLine: end, section: lines.slice(startLine, end).join("\n").replace(/\s+$/, ""), part, group };
}

// "### 1. one-metre-more-rope · concept: … · core · demand 3 · format: Single card"
export function parseHeading(line) {
  const m = line.match(/^(#{2,3})\s+(\d+)\.\s+([a-z0-9-]+)\s*(.*)$/);
  const out = { level: m[1].length, n: Number(m[2]), slug: m[3], concept: null, level_: null, demand: null, format: null, extras: [] };
  for (const raw of m[4].split(/\s+·\s+/).map((s) => s.trim()).filter(Boolean)) {
    const piece = raw.replace(/^·\s*/, "");
    let k;
    if ((k = piece.match(/^concept:\s*(.+)$/i))) out.concept = k[1].trim();
    else if ((k = piece.match(/^demand\s+(\d+)/i))) out.demand = Number(k[1]);
    else if ((k = piece.match(/^\*{0,2}format\*{0,2}\s*[:\u2014-]\s*(.+)$/i))) out.format = k[1].replace(/\*+/g, "").trim();
    else if (/^(intro|core|stretch)$/i.test(piece)) out.level_ = piece.toLowerCase();
    else out.extras.push(piece);
  }
  const { level_, ...rest } = out;
  return { ...rest, headingLevel: out.level, level: level_ };
}

// Top-level "- Label: value" bullets, with their continuation lines (indented sub-items included).
export function parseBullets(section) {
  const lines = section.split("\n").slice(1);
  const bullets = [];
  for (const l of lines) {
    const b = l.match(/^[-*] (.*)$/);
    if (b) {
      const lm = b[1].match(/^\*{0,2}([A-Za-z][^:`"“]{0,60}?)\*{0,2}:\*{0,2}\s*([\s\S]*)$/);
      bullets.push(lm ? { label: lm[1].trim(), key: norm(lm[1]), value: lm[2], sub: [] } : { label: null, key: null, value: b[1], sub: [] });
    } else if (bullets.length && /^\s+\S/.test(l)) {
      bullets[bullets.length - 1].sub.push(l);
    } else if (bullets.length && l.trim() && !/^\s/.test(l)) {
      bullets[bullets.length - 1].value += "\n" + l; // a wrapped line at column 0
    }
  }
  return bullets;
}

// Inline list on the bullet line: "Claims to check: (1) a; (2) b; (3) c." (economics.md:17-49, the geography
// and history files). Markers must run 1, 2, 3 … in order, so "(1+r)^t" or a stray "(2)" inside a
// claim is not taken as a marker. Returns [] unless there are at least two markers starting at (1).
export function splitInline(text) {
  const marks = [];
  let want = 1;
  for (const m of text.matchAll(/(^|[\s;:,])\((\d+)\)\s+/g)) {
    if (Number(m[2]) !== want) continue;
    marks.push({ n: want, start: m.index + m[1].length, body: m.index + m[0].length });
    want++;
  }
  if (marks.length < 2) return [];
  return marks.map((k, i) => ({ n: k.n, raw: text.slice(k.body, i + 1 < marks.length ? marks[i + 1].start : text.length).trim().replace(/[;,.]\s*$/, "").trim() }));
}

// Numbered sub-items ("  1. text … support: x; source: y. Note.") → planned claims; when there are none,
// an inline "(1) … (2) …" list on the bullet itself (style "inline").
export function parseClaims(bullet) {
  let items = [];
  const loose = [];
  for (const l of bullet.sub) {
    const m = l.match(/^\s+(\d+)\.\s+(.*)$/);
    if (m) items.push({ n: Number(m[1]), raw: m[2] });
    else if (items.length) items[items.length - 1].raw += " " + l.trim();
    else loose.push(l.trim());
  }
  let style = "sub-items";
  if (!items.length) { items = splitInline([bullet.value, ...loose].join(" ")); style = "inline"; }
  return items.map(({ n, raw }) => {
    const si = raw.search(/\bsupport:/i);
    const text = (si >= 0 ? raw.slice(0, si) : raw).trim();
    let support = null, source = null, note = null;
    if (si >= 0) {
      const rest = raw.slice(si);
      const sm = rest.match(/^support:\s*([^;]*?)\s*(?:;|$)/i);
      support = sm ? sm[1].replace(/\.$/, "").trim() || null : null;
      const so = rest.match(/\bsource:\s*([\s\S]*)$/i);
      if (so) {
        // The source runs to the first sentence break ("… (NGA TR8350.2). The fact-checker …").
        const cut = so[1].search(/\.\s+(?=[A-Z])/);
        source = (cut >= 0 ? so[1].slice(0, cut) : so[1]).replace(/\.$/, "").trim();
        note = cut >= 0 ? so[1].slice(cut + 1).trim() : null;
      } else {
        const after = rest.slice(sm ? sm[0].length : 0).trim();
        note = after || null;
      }
    }
    // The company claim schema allows support ∈ derivation|simulation|source|convention
    // (tools/company.mjs cmdCheck; maps.json maps[0].facts[0]). The brief's own word is kept raw;
    // `supportEnum` is set only when the brief already uses an enum word (or "citation" → source).
    const w = (support ?? "").toLowerCase().split(/[\s(,;]/)[0];
    const supportEnum = ["derivation", "simulation", "source", "convention"].includes(w) ? w : w === "citation" ? "source" : null;
    return { n, text, support, supportEnum, source, note, notClaimed: /^not claimed\b/i.test(text), style, raw };
  });
}

// "\"Question…\" options: A. x / B. y / C. z (answer: B)."
export function parsePrediction(value) {
  const q = value.match(/[“"]([^”"]+)[”"]/);
  const om = value.match(/options:\s*([\s\S]*?)\s*(?:\(answer:|$)/i);
  const options = om ? om[1].split(/\s+\/\s+/).map((s) => s.match(/^([A-Z])\.\s*(.+?)\s*$/)).filter(Boolean).map((m) => ({ key: m[1], text: m[2] })) : [];
  const a = value.match(/\(answer:\s*([A-Z])\b/i);
  return { question: q ? q[1] : null, options, answer: a ? a[1].toUpperCase() : null };
}

const CLAIM_KEYS = ["planned claims", "claims to check", "claims"];

// Needs interaction-designer spec. Plan §M4: "The SPEC stage is skipped only if the brief says no", so a
// missed "yes" must not read as "no"; the forms below are the ones in company/domains/briefs today. Searched
// over the whole section (it may sit inside another bullet, math.discrete.md:461), first match per rule:
//   1 explicit "Needs [an] [**]interaction-designer spec[**]: yes|no|done" → that word (143 of 145 cases;
//     "an" form: probability.statistics.md:24).
//   2 "No interaction-designer spec needed|required" → no (behavioral.md:27, cs.systems.md:31).
//   3 any other "need(s) [an] [**]interaction-designer spec" → yes: a colon followed by prose
//     ("**Needs an interaction-designer spec**: the toggle…", cs.systems.md:18), no colon
//     (probability.chance.md:39), "(spec: needs interaction-designer spec)" (economics.markets.md:59),
//     "New need: interaction-designer spec" (math.discrete.md:371).
//   4 a heading or format marker "needs spec" / "needs interaction-designer spec" (cs.algorithms.md:576,
//     math.discrete.md:96, life.genetics-evolution.md:21) → yes.
// `form` names the rule that fired. A marker that says yes beside an explicit no gives `conflict`.
export function parseNeedsSpec(section, headLine = "", formatValue = "") {
  const MARK = /needs\s+(?:interaction-designer\s+)?spec\b/i;
  const formatMarker = MARK.test(headLine) || MARK.test(formatValue);
  const ex = section.match(/needs\s+(?:an\s+)?\**\s*interaction-designer spec\**\s*:\s*\**\s*(yes|no|done)\b([^\n]*)/i);
  if (ex) return { value: ex[1].toLowerCase(), form: "explicit", line: ex[0].replace(/\*+/g, "").trim(), formatMarker, conflict: formatMarker && ex[1].toLowerCase() === "no" };
  const no = section.match(/\bno\s+interaction-designer spec\s+(?:is\s+)?(?:needed|required)[^\n]*/i);
  if (no) return { value: "no", form: "no-spec-needed", line: no[0].trim(), formatMarker, conflict: formatMarker };
  const yes = section.match(/\bneeds?\b\W{0,6}(?:an\s+)?\**\s*interaction-designer spec\b[^\n]*/i);
  if (yes) return { value: "yes", form: "stated-need", line: yes[0].replace(/\*+/g, "").trim(), formatMarker, conflict: false };
  return { value: formatMarker ? "yes" : null, form: formatMarker ? "format-marker" : null, line: null, formatMarker, conflict: false };
}

export function parseSection(loc, relFile) {
  const headLine = loc.section.split("\n")[0];
  const heading = parseHeading(headLine);
  const bullets = parseBullets(loc.section);
  // Exact label first; then a label that starts with it ("claims (unverified)" normalises to "claims").
  const get = (k) => bullets.find((b) => b.key === k) ?? bullets.find((b) => b.key?.startsWith(k + " ")) ?? null;
  const fields = {};
  for (const b of bullets) if (b.key && !(b.key in fields)) fields[b.key] = [b.value, ...b.sub].join("\n").trim();

  const knows = get("learner knows");
  let learnerKnows = null, learnerDoesNotKnow = null;
  if (knows) {
    const [k, ...dn] = knows.value.split(/\s+\/\s+does not know:\s*/i);
    learnerKnows = k.trim(); learnerDoesNotKnow = dn.join(" / ").trim() || null;
  }
  const pred = get("prediction");
  const claimsBullet = CLAIM_KEYS.map(get).find(Boolean) ?? null;
  const cur = get("curriculum");
  let curriculum = null;
  if (cur) { const j = cur.value.match(/`(\{[\s\S]*\})`/); if (j) try { curriculum = JSON.parse(j[1]); } catch { curriculum = null; } }

  const needsSpec = parseNeedsSpec(loc.section, headLine, get("format")?.value ?? "");

  return {
    file: relFile, line: loc.line, endLine: loc.endLine, heading: headLine.replace(/^#+\s*/, ""),
    n: heading.n, slug: heading.slug, concept: heading.concept, level: heading.level, demand: heading.demand,
    format: heading.format ?? (get("format") ? get("format").value.replace(/\*+/g, "").trim() : null),
    headingExtras: heading.extras,
    learnerKnows, learnerDoesNotKnow,
    misconception: get("misconception")?.value.trim() ?? null,
    prediction: pred ? { raw: pred.value.trim(), ...parsePrediction(pred.value) } : null,
    check: get("check") ? { label: get("check").label, text: get("check").value.trim() } : null,
    stage: get("stage")?.value.trim() ?? null,
    stageWordBudget: get("stage word budget")?.value.trim() ?? null,
    milestones: get("milestones")?.value.trim() ?? null,
    qaPath: (get("milestones")?.value.match(/QA path:\s*([^\n]+)/i)?.[1] ?? "").replace(/\.$/, "").trim() || null,
    reveal: get("reveal") ? { label: get("reveal").label, text: get("reveal").value.trim(), words: Number(get("reveal").label.match(/(\d+)\s*words/)?.[1] ?? NaN) || null } : null,
    phoneFit: get("phone fit")?.value.trim() ?? null,
    plannedClaims: claimsBullet ? parseClaims(claimsBullet) : [],
    plannedClaimsRaw: claimsBullet ? [claimsBullet.value, ...claimsBullet.sub].join("\n").trim() : null,
    plannedClaimsLabel: claimsBullet?.label ?? null,
    curriculum,
    needsSpec,
    differsFromNearest: get("differs from nearest")?.value.trim() ?? get("differs from")?.value.trim() ?? null,
    fields,
    group: loc.group,
    section: loc.section,
  };
}

// The category manager who orders the lesson. Plan §M4: "Orders are placed by chief-of-staff to
// cm-math"; maps.json maps[1].meta_mapping[0]: the orderer is the lane (= domain) manager. The domain
// is the brief file's prefix (math.geometry.md → math), as in claim.mjs briefSlugs(<domain>).
function managers(root, domain, strand) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(root, "content/domains.json"), "utf8")).domains.find((x) => x.id === domain);
    return { manager: d?.categoryManager ?? null, strandManager: d?.subareas?.find((s) => s.id === strand)?.categoryManager ?? null, domainStatus: d?.status ?? null };
  } catch { return { manager: null, strandManager: null, domainStatus: null }; }
}

// The accept text: a factual header, the group's shared rules, then the brief section verbatim.
// Maps: "The brief text is the order's accept field and goes into its context pack."
export function acceptText(b, who) {
  const real = b.plannedClaims.filter((c) => !c.notClaimed), nc = b.plannedClaims.filter((c) => c.notClaimed);
  const head = [
    `LESSON ${b.slug} · domain ${b.domain}${b.strand ? ` (strand ${b.strand})` : ""} · brief ${b.file}:${b.line}-${b.endLine} (#${b.n})`,
    `Concept: ${b.concept ?? "?"} · level ${b.level ?? "?"} · demand ${b.demand ?? "?"} · format: ${b.format ?? "none"} · Needs interaction-designer spec: ${b.needsSpec.value ?? "not stated"}`,
    // "Not claimed…" items are listed in the brief but are not claims, so they are not in the count.
    `Planned claims: ${real.length}${nc.length ? ` (+${nc.length} not claimed)` : ""}${real.length ? " (" + real.map((c) => `${c.n}: ${c.supportEnum ?? c.support ?? "no support"}`).join(", ") + ")" : ""}${!b.plannedClaims.length && b.plannedClaimsRaw ? " (not itemised; read the brief's claims bullet)" : ""} · orderer ${who.manager ?? "?"}${who.strandManager ? ` (strand manager ${who.strandManager})` : ""}`,
    "Lessons follow company/product/demo-standard.md; every learner-visible factual sentence is a claim in meta.json (CLAUDE.md).",
  ];
  const group = b.group?.intro ? [``, `Shared rules from the group "${b.group.heading}" (${b.file}:${b.group.line}):`, b.group.intro] : [];
  return [...head, ...group, ``, `Brief (verbatim):`, b.section].join("\n");
}

// Every heading of <slug> in company/domains/briefs/*.md (plus the given file when it lies outside that dir).
function headingsOf(root, slug, extraAbs) {
  const dir = path.join(root, BRIEFS);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort().map((f) => path.join(dir, f)).filter((f) => fs.statSync(f).isFile());
  if (extraAbs && !files.includes(extraAbs)) files.push(extraAbs);
  const out = [];
  for (const f of files) {
    const text = fs.readFileSync(f, "utf8");
    for (const m of text.matchAll(HEADING_RE)) if (m[1] === slug) out.push({ abs: f, line: text.slice(0, m.index).split("\n").length });
  }
  return out;
}

export function readBrief(root, fileArg, slug, { now = Date.now(), anyFormat = false, lockRoots = defaultLockRoots(root) } = {}) {
  const findings = [];
  const cands = path.isAbsolute(fileArg) ? [fileArg] : [path.join(root, fileArg), path.join(root, BRIEFS, fileArg)];
  const abs = cands.find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
  if (!abs) return { usage: `brief file not found: ${cands.join(" or ")}` };
  const rel = path.relative(root, abs).split(path.sep).join("/");
  const text = fs.readFileSync(abs, "utf8");
  const loc = locate(text, slug);
  if (!loc) {
    findings.push(finding(SEV.error, "not-found", `no heading "### N. ${slug} " in ${rel} (heading regex ${HEADING_RE.source})`));
    return { findings, brief: null };
  }
  const base = path.basename(abs, ".md");
  const [domain, ...st] = base.split(".");
  const b = { ...parseSection(loc, rel), domain, strand: st.join(".") || null };
  // Concept: headings often write "concept: <domain>:<id>" (life.*, cs.systems.md:39, economics.markets.md:84),
  // but content/curriculum/<domain>.json ids and meta.json `concept` carry no prefix (company.mjs:376 compares
  // m.concept with the ids). A leading "<known domain id>:" is stripped; the raw text stays in conceptRaw.
  b.conceptRaw = b.concept;
  let conceptPrefix = null;
  if (b.concept) {
    const pm = b.concept.match(/^([a-z][a-z0-9-]*):(.+)$/);
    let ids = [];
    try { ids = (JSON.parse(fs.readFileSync(path.join(root, "content/domains.json"), "utf8")).domains ?? []).map((d) => d.id); } catch {}
    if (pm && ids.includes(pm[1])) { conceptPrefix = pm[1]; b.concept = pm[2].trim(); }
  }
  if (conceptPrefix && conceptPrefix !== domain) findings.push(finding(SEV.warn, "concept-prefix-mismatch", `concept ${b.conceptRaw} names domain ${conceptPrefix}, but the brief file is in domain ${domain}`));
  // Duplicates: within the file (loc.count) and across every brief file. All claim.mjs rules are per slug,
  // so the slug is handed out once (see queue()); two sections for one slug leave the order's accept text
  // ambiguous, so either case blocks until a category manager removes one.
  const copies = headingsOf(root, slug, abs);
  if (copies.length > 1) {
    const where = copies.map((c) => `${path.relative(root, c.abs).split(path.sep).join("/")}:${c.line}`);
    findings.push(finding(SEV.error, "duplicate", `${slug} has ${copies.length} headings (${where.join(", ")}); this read used ${rel}:${loc.line}, and claim.mjs hands the slug out once`, { copies: where }));
  }
  const inRepo = !path.relative(root, abs).startsWith("..") && !path.isAbsolute(path.relative(root, abs));
  if (!inRepo) findings.push(finding(SEV.warn, "outside-repo", `${abs} is outside --repo ${root}: built, skips and the queue are read from --repo, not from the file's own checkout`));

  // Eligibility, the claim.mjs `next` rules for this one slug (see queue()).
  const inBriefsDir = path.dirname(abs) === path.join(root, BRIEFS);
  const skips = readSkips(root);
  const fmtQueue = inBriefsDir ? formatMap(root, domain).get(slug) : (loc.part.match(FORMAT_RE)?.[1].replace(/\*+/g, "").trim());
  const lock = lockState(lockRoots, slug, now);
  const built = builtAt(root, slug);
  let reachable = false, position = null, queueEntry = null;
  if (inBriefsDir) {
    try {
      reachable = domainFiles(root, domain).includes(path.basename(abs));
      if (reachable) { const q = queue(root, { domains: [domain], anyFormat, now, lockRoots }).eligible; const i = q.findIndex((r) => r.slug === slug); position = i >= 0 ? i + 1 : null; queueEntry = i >= 0 ? `${q[i].file}:${q[i].line}` : null; }
    } catch { reachable = false; }
  }
  const eligibility = { built: !!built, builtAt: built, skipped: Object.hasOwn(skips, slug) ? skips[slug] : null, formatForQueue: fmtQueue ?? null, lock, lockRoots, reachableByClaimNext: reachable, queuePosition: position, queueEntry };
  if (built) findings.push(finding(SEV.error, "built", `${slug} is already built (${built}); claim.mjs never hands it out`));
  if (eligibility.skipped) findings.push(finding(SEV.error, "skipped", `${slug} is in company/ops/brief-skips.json: ${eligibility.skipped}`));
  if (fmtQueue === undefined && !anyFormat) findings.push(finding(SEV.error, "no-format", `no format line in the brief (claim.mjs formatOf regex); a builder may not take it without --any-format`));
  if (lock.blocks) findings.push(finding(SEV.error, "locked", `${lock.path ?? `company/ops/claims/${slug}.json`} blocks it (${lock.state}${lock.agent ? `, ${lock.agent}` : ""})`));
  if (inBriefsDir && !reachable) findings.push(finding(SEV.warn, "unreachable", `claim.mjs next ${domain} does not read ${rel} (no ${BRIEFS}/${domain}.md, or the file name does not start "${domain}.")`));

  // Advisory findings: things the orderer (or the builder's first step) must act on.
  if (b.needsSpec.value === "yes") findings.push(finding(SEV.warn, "needs-spec", `brief needs an interaction-designer spec (${b.needsSpec.line ?? "format marked needs spec"}); plan §M4: the builder writes company/design/specs/${slug}.md inside build`));
  if (b.needsSpec.value === null) findings.push(finding(SEV.warn, "needs-spec-unstated", `the brief does not say "Needs interaction-designer spec: yes|no"`));
  if (b.needsSpec.conflict) findings.push(finding(SEV.warn, "needs-spec-conflict", `"${b.needsSpec.line}" says no, but the heading or format line is marked needs spec`));
  if (!b.plannedClaims.length) findings.push(finding(SEV.warn, "no-planned-claims", b.plannedClaimsRaw ? `claims bullet "${b.plannedClaimsLabel}" is not itemised` : "no planned-claims bullet"));
  // Sub-item lists name "support: …" per claim, so a missing one is reported per claim. Inline "(1) … (2) …"
  // lists (economics.md) state support informally ("redo by calculator", "arithmetic") if at all, so one
  // finding lists the claims without a "support:" word instead of one per claim.
  const noSup = b.plannedClaims.filter((c) => !c.notClaimed && !c.support);
  for (const c of noSup.filter((c) => c.style !== "inline")) findings.push(finding(SEV.warn, "claim-no-support", `planned claim ${c.n} names no support (the builder must give support and source in meta.json)`, { claim: c.n }));
  const inl = noSup.filter((c) => c.style === "inline");
  if (inl.length) findings.push(finding(SEV.warn, "inline-claims-no-support", `inline claims ${inl.map((c) => c.n).join(", ")} have no "support:" (the builder must give support and source in meta.json)`, { claims: inl.map((c) => c.n) }));
  if (b.prediction && !b.prediction.answer) findings.push(finding(SEV.warn, "prediction-no-answer", "prediction names no (answer: X)"));
  if (!b.prediction) findings.push(finding(SEV.warn, "no-prediction", "no prediction bullet"));
  // company check errors on an unknown concept (maps.json maps[1].facts[5]), so test1 would fail later.
  if (b.concept) {
    try {
      // (b.concept is the prefix-stripped id; see conceptRaw above.)
      const cur = JSON.parse(fs.readFileSync(path.join(root, "content/curriculum", `${domain}.json`), "utf8"));
      if (!(cur.concepts ?? []).some((c) => c.id === b.concept)) findings.push(finding(SEV.warn, "unknown-concept", `concept ${b.concept} is not in content/curriculum/${domain}.json`));
    } catch { findings.push(finding(SEV.warn, "no-curriculum", `content/curriculum/${domain}.json unreadable`)); }
  }
  const who = managers(root, domain, b.strand);
  const accept = acceptText(b, who);
  // Plan §M4 "Live run": placed by chief-of-staff to cm-<domain>, --budget=3000000 --priority=next. M4 run (M4-RUN.md):
  // `--by=cos` named no role of specs/s3c-lessons.json, and with no --slug the order's ${slug} was its task
  // (LESSON-<slug>), so every test1 stage-errored; the kernel's `order new --slug` takes the lesson slug itself
  const orderArgv = ["order", "new", `--by=chief-of-staff`, `--to=${who.manager ?? `cm-${domain}`}`, `--task=LESSON-${slug}`, `--slug=${slug}`, `--title=${slug}`, `--budget=3000000`, `--priority=next`, `--accept=${accept}`];
  return { findings, brief: b, eligibility, managers: who, accept, orderArgv };
}

// ---------------------------------------------------------------------------------------------
// CLI

export function parseArgs(argv) {
  const opt = {}; const pos = [];
  for (const a of argv) {
    if (a.startsWith("--")) { const [k, ...v] = a.slice(2).split("="); opt[k] = v.length ? v.join("=") : true; } else pos.push(a);
  }
  return { opt, pos };
}

const USAGE = "usage: brief.mjs <brief-file> <slug> [--json] [--repo=<path>] [--locks=<dir>[,<dir>]] | brief.mjs --list [--domain=<id>[,<id>]] [--any-format] [--repo=<path>] [--locks=<dir>[,<dir>]]";

export function main(argv, out = console.log) {
  const { opt, pos } = parseArgs(argv);
  const emit = (code, obj) => { out(JSON.stringify(obj)); return code; };
  if (opt.help || (!opt.list && pos.length !== 2) || (opt.list && pos.length)) return emit(2, { ok: false, findings: [finding(SEV.error, "usage", USAGE)] });
  const { root, error } = openRepo(opt.repo === true ? DEFAULT_REPO : (opt.repo ?? DEFAULT_REPO));
  if (error) return emit(3, { ok: false, stageError: error, findings: [finding(SEV.error, "stage-error", error)] });
  const now = opt.now ? Date.parse(opt.now) : Date.now(); // --now=<ISO> pins the lock clock (tests)
  // --locks=<dir>[,<dir>]: the checkouts whose company/ops/claims are read (default: defaultLockRoots).
  const lockRoots = typeof opt.locks === "string" ? opt.locks.split(",").filter(Boolean).map((d) => path.resolve(d)) : defaultLockRoots(root);

  if (opt.list) {
    const domains = typeof opt.domain === "string" ? opt.domain.split(",") : null;
    const q = queue(root, { domains, anyFormat: !!opt["any-format"], now, lockRoots });
    for (const r of q.eligible) out(`${r.domain.padEnd(12)} ${r.slug.padEnd(40)} ${`${r.file}:${r.line}`.padEnd(58)} ${r.format ?? "(any-format)"}`);
    out(`eligible ${q.counts.eligible} of ${q.counts.unbuilt} unbuilt · skipped ${q.counts.ineligible.skipped} · no format ${q.counts.ineligible.noFormat} · locked ${q.counts.ineligible.locked} · duplicate headings ${q.counts.duplicateHeadings} · locks read from ${lockRoots.join(", ")}`);
    return emit(0, { ok: true, findings: q.findings, repo: root, ...q });
  }

  const r = readBrief(root, pos[0], pos[1], { now, anyFormat: !!opt["any-format"], lockRoots });
  if (r.usage) return emit(2, { ok: false, findings: [finding(SEV.error, "usage", r.usage)] });
  const blocking = r.findings.filter((f) => f.severity === SEV.error);
  if (r.brief && !opt.json) out(r.accept);
  const { section, fields, ...briefShort } = r.brief ?? {};
  return emit(blocking.length ? 1 : 0, { ok: !blocking.length, findings: r.findings, repo: root, brief: r.brief ? { ...briefShort, fields } : null, eligibility: r.eligibility ?? null, managers: r.managers ?? null, accept: r.accept ?? null, orderArgv: r.orderArgv ?? null });
}

if (process.argv[1] && import.meta.url === pathToFileURL(fs.realpathSync(process.argv[1])).href) {
  try { process.exitCode = main(process.argv.slice(2)); } catch (e) {
    console.log(JSON.stringify({ ok: false, stageError: String(e?.stack ?? e), findings: [{ severity: "error", code: "stage-error", msg: String(e?.message ?? e) }] }));
    process.exitCode = 3;
  }
}
