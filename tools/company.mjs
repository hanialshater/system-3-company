#!/usr/bin/env node
// The company CLI. Dependency-free on purpose: any agent with a shell can run it.
//
//   node tools/company.mjs <command> [args]
//
//   status                     one-screen operating picture (start every session here)
//   check                      validate the whole company: demos, claims, roles, rituals, constitution
//   registry                   regenerate src/demos/*.generated.ts (generator: tools/registry.mjs)
//   coverage [domain]          concept coverage and unmet demand per domain
//   claims [--open]            the claims ledger; --open lists claims not yet verified
//   new-demo <domain> <slug>   scaffold a lesson from the standard template
//   publish <slug>             run the launch gates and flip status to published
//   ritual <name>              start a ritual record from its template (wbr, op-planning, ...)
//   rituals                    cadence table: last run, next due, overdue
//   board [add|move] ...       the work board (company/ops/board.json)
//   roles                      the org: every role, its scope line and its agent file
//   qa-record                  file the last Playwright run as QA records in company/reviews/
//
// Exit code is non-zero when `check` or `publish` finds a violation, so CI can gate on it.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registryFiles } from "./registry.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (...p) => path.join(ROOT, ...p);
const exists = (p) => fs.existsSync(p);
const readJSON = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const writeJSON = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + "\n");
const today = () => new Date().toISOString().slice(0, 10);
const ls = (dir) => (exists(dir) ? fs.readdirSync(dir) : []);

const color = process.stdout.isTTY
  ? { red: (s) => `\x1b[31m${s}\x1b[0m`, green: (s) => `\x1b[32m${s}\x1b[0m`, yellow: (s) => `\x1b[33m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m` }
  : { red: (s) => s, green: (s) => s, yellow: (s) => s, bold: (s) => s, dim: (s) => s };

// ---------------------------------------------------------------- loading

function loadDomains() {
  return readJSON(rel("content/domains.json")).domains;
}

function loadCurriculum(domainId) {
  const p = rel("content/curriculum", `${domainId}.json`);
  return exists(p) ? readJSON(p) : null;
}

function loadDemos() {
  const demos = [];
  for (const domain of ls(rel("src/demos"))) {
    const ddir = rel("src/demos", domain);
    if (!fs.statSync(ddir).isDirectory()) continue;
    for (const slug of ls(ddir)) {
      const dir = path.join(ddir, slug);
      if (!fs.statSync(dir).isDirectory()) continue;
      const metaPath = path.join(dir, "meta.json");
      let meta = null;
      let parseError = null;
      try {
        meta = readJSON(metaPath);
      } catch (e) {
        parseError = e.message;
      }
      demos.push({ domainDir: domain, slugDir: slug, dir, metaPath, meta, parseError });
    }
  }
  return demos.sort((a, b) => (a.domainDir + a.slugDir).localeCompare(b.domainDir + b.slugDir));
}

function loadBoard() {
  const p = rel("company/ops/board.json");
  return exists(p) ? readJSON(p) : { items: [] };
}

const RITUALS = {
  wbr: { cadenceDays: 7, title: "Weekly Business Review" },
  "demo-crit": { cadenceDays: 7, title: "Demo Crit (independent, pairwise)" },
  "cycle-planning": { cadenceDays: 14, title: "Cycle Planning" },
  "pattern-review": { cadenceDays: 14, title: "Pattern Review" },
  distillation: { cadenceDays: 30, title: "Distillation Day" },
  "creative-distrust": { cadenceDays: 30, title: "Creative Distrust Session" },
  "op-planning": { cadenceDays: 91, title: "Operational Planning (OP)" },
  "constitutional-review": { cadenceDays: 91, title: "Constitutional Review Board" },
  "domain-launch": { cadenceDays: null, title: "Domain Launch Review" },
  "launch-review": { cadenceDays: null, title: "Launch Review (go / no-go)" },
  coe: { cadenceDays: null, title: "Correction of Error" },
  retirement: { cadenceDays: null, title: "Retirement Review" },
};

function ritualRecords() {
  const dir = rel("company/rituals/records");
  return ls(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(f))
    .map((f) => ({ file: f, date: f.slice(0, 10), name: f.slice(11, -3).replace(/-\d+$/, "") }));
}

// ---------------------------------------------------------------- registry

// The generator is ordinary surface: tools/registry.mjs (AMD-001). What judges it stays here:
// `check` regenerates in memory and fails on drift, and checks generator-independent invariants.

function cmdRegistry({ quiet } = {}) {
  let changed = 0;
  for (const [file, src] of Object.entries(registryFiles(loadDemos()))) {
    const out = rel(file);
    const prev = exists(out) ? fs.readFileSync(out, "utf8") : "";
    if (prev !== src) (fs.writeFileSync(out, src), changed++);
  }
  if (!quiet) console.log(changed ? `registry: regenerated ${changed} file(s)` : "registry: up to date");
}

// ---------------------------------------------------------------- check

const REQUIRED_META = {
  slug: "string",
  title: "string",
  hook: "string",
  domain: "string",
  concept: "string",
  status: "string",
  durationSec: "number",
  owner: "object",
  learner: "object",
  misconception: "string",
  objective: "string",
  claims: "array",
  confidence: "string",
  recall: "object",
  evidence: "object",
  version: "number",
};

function typeOf(v) {
  return Array.isArray(v) ? "array" : v === null ? "null" : typeof v;
}

/** Gates a lesson must pass to be published. Returns a list of failures. */
function launchGates(meta) {
  const fails = [];
  const open = meta.claims.filter((c) => c.status !== "verified" && c.status !== "withdrawn");
  if (meta.claims.length === 0) fails.push("no claims recorded: every lesson asserts something; write it down");
  if (open.length) fails.push(`claims not verified: ${open.map((c) => c.id).join(", ")}`);
  for (const c of meta.claims) {
    if (c.status === "verified" && (!c.checkedBy || !c.checkedOn)) fails.push(`${c.id} verified without checkedBy/checkedOn`);
    if (c.status === "verified" && c.checkedBy === meta.owner.builder) fails.push(`${c.id} verified by its own builder`);
  }
  if (!meta.evidence.qa?.length) fails.push("no computer-use QA record (company/reviews/...)");
  if (!meta.evidence.simulatedLearner?.length) fails.push("no borrowed-mind learner review");
  for (const k of ["qa", "simulatedLearner", "pairwise", "humanLearners"]) {
    for (const r of meta.evidence[k] ?? []) if (!exists(rel(r))) fails.push(`evidence.${k} points at missing file ${r}`);
  }
  if (meta.confidence === "**" && !(meta.evidence.humanLearners?.length > 0))
    fails.push('confidence "**" needs human-learner evidence; simulated learners are not learners');
  return fails;
}

function cmdCheck() {
  const errors = [];
  const warnings = [];
  const err = (where, msg) => errors.push(`${where}: ${msg}`);
  const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

  // Domains and curricula
  const domains = loadDomains();
  const domainIds = new Set(domains.map((d) => d.id));
  const curricula = {};
  for (const d of domains) {
    const cur = loadCurriculum(d.id);
    if (!cur) err(`content/curriculum/${d.id}.json`, "missing curriculum for domain");
    else {
      curricula[d.id] = cur;
      const ids = new Set();
      for (const c of cur.concepts ?? []) {
        if (ids.has(c.id)) err(`curriculum ${d.id}`, `duplicate concept ${c.id}`);
        ids.add(c.id);
        for (const p of c.prerequisites ?? []) {
          const [pd, pc] = p.includes(":") ? p.split(":") : [d.id, p];
          const target = pd === d.id ? cur : loadCurriculum(pd);
          if (!target || !(target.concepts ?? []).some((x) => x.id === pc)) err(`curriculum ${d.id}/${c.id}`, `unknown prerequisite ${p}`);
        }
      }
    }
    if (!exists(rel("company/roles", `${d.categoryManager}.md`))) err(`domain ${d.id}`, `category manager ${d.categoryManager} has no onboarding doc`);
    if (!exists(rel("company/domains", `${d.id}.md`))) err(`domain ${d.id}`, "missing category charter company/domains/<id>.md");
  }

  // Demos
  const demos = loadDemos();
  const slugs = new Set();
  const claimIds = new Set();
  for (const d of demos) {
    const where = `src/demos/${d.domainDir}/${d.slugDir}`;
    if (d.parseError) {
      err(where, `meta.json unreadable: ${d.parseError}`);
      continue;
    }
    const m = d.meta;
    for (const [k, t] of Object.entries(REQUIRED_META)) if (typeOf(m[k]) !== t) err(where, `meta.${k} should be ${t}`);
    if (errors.some((e) => e.startsWith(where))) continue;
    if (m.slug !== d.slugDir) err(where, `slug "${m.slug}" does not match directory`);
    if (m.domain !== d.domainDir) err(where, `domain "${m.domain}" does not match directory`);
    if (!domainIds.has(m.domain)) err(where, `unknown domain ${m.domain}`);
    if (slugs.has(m.slug)) err(where, "duplicate slug");
    slugs.add(m.slug);
    if (!["draft", "review", "published", "retired"].includes(m.status)) err(where, `bad status ${m.status}`);
    if (!["", "*", "**"].includes(m.confidence)) err(where, `confidence must be "", "*" or "**"`);
    if (m.hook.length > 90) err(where, `hook is ${m.hook.length} chars; the hook budget is 90`);
    if (m.durationSec > 120) warn(where, `durationSec ${m.durationSec} > 120: is this still one idea?`);
    const cur = curricula[m.domain];
    if (cur && !(cur.concepts ?? []).some((c) => c.id === m.concept)) err(where, `concept "${m.concept}" is not in content/curriculum/${m.domain}.json`);
    const dom = domains.find((x) => x.id === m.domain);
    if (dom && m.owner.categoryManager !== dom.categoryManager) err(where, `owner.categoryManager should be ${dom.categoryManager}`);
    if (!m.learner.knows?.length || !m.learner.doesNotKnow?.length) err(where, "learner knowledge boundary needs both knows and doesNotKnow");
    const r = m.recall;
    if (!r.question || !Array.isArray(r.options) || r.options.length < 2 || !(r.answer >= 0 && r.answer < r.options.length) || !r.why)
      err(where, "recall needs question, ≥2 options, a valid answer index and a why");
    for (const c of m.claims) {
      if (!c.id?.startsWith(`${m.domain}.${m.slug}.`)) err(where, `claim id "${c.id}" must start with ${m.domain}.${m.slug}.`);
      if (claimIds.has(c.id)) err(where, `duplicate claim id ${c.id}`);
      claimIds.add(c.id);
      if (!["derivation", "simulation", "source", "convention"].includes(c.support)) err(where, `${c.id} bad support ${c.support}`);
      if (!["unverified", "verified", "disputed", "withdrawn"].includes(c.status)) err(where, `${c.id} bad status ${c.status}`);
      if (!c.source?.trim()) err(where, `${c.id} has no source: a claim without a trail is a feather`);
    }
    const demoPath = path.join(d.dir, "Demo.tsx");
    if (!exists(demoPath)) err(where, "missing Demo.tsx");
    else {
      const src = fs.readFileSync(demoPath, "utf8");
      if (!src.includes("<Lesson")) err(where, "Demo.tsx must render <Lesson> (the predict → explore → reveal contract)");
      if (!/data-qa="control"|<Control|<Slider/.test(src)) err(where, "no stage controls found (Control, Slider or data-qa=\"control\")");
      if (/localStorage|sessionStorage/.test(src)) err(where, "demos must not touch storage directly; progress lives in the kit");
      if (/fetch\(|https?:\/\//.test(src.replace(/\/\/.*$/gm, ""))) warn(where, "network or URL in Demo.tsx: lessons should work offline");
    }
    if (m.status === "published") for (const f of launchGates(m)) err(where, `published but fails gate: ${f}`);
    if (m.status === "review" && m.claims.some((c) => c.status === "disputed")) warn(where, "in review with a disputed claim");
  }

  // Registry: fresh, and faithful to meta.json whatever the generator does
  const files = registryFiles(demos);
  for (const [file, src] of Object.entries(files))
    if (!exists(rel(file)) || fs.readFileSync(rel(file), "utf8") !== src) err(file, "stale: run `npm run registry`");
  for (const f of ls(rel("src/demos")).filter((f) => f.endsWith(".generated.ts")))
    if (!(`src/demos/${f}` in files)) err(`src/demos/${f}`, "generated file the generator no longer produces: delete it");
  const gen = Object.values(files).join("\n");
  const imported = new Set([...gen.matchAll(/from "\.\/([^/"]+)\/([^/"]+)\/meta\.json"/g)].map((x) => `${x[1]}/${x[2]}`));
  const onDisk = new Set(demos.filter((d) => d.meta && exists(path.join(d.dir, "Demo.tsx"))).map((d) => `${d.domainDir}/${d.slugDir}`));
  for (const k of onDisk) if (!imported.has(k)) err("src/demos/*.generated.ts", `lesson ${k} is not imported from its meta.json`);
  for (const k of imported) if (!onDisk.has(k)) err("src/demos/*.generated.ts", `imports ${k}, which is not a lesson on disk`);
  if (/\bstatus"?\s*:\s*["'`]/.test(gen)) err("src/demos/*.generated.ts", "generated code sets a status literal; status comes only from meta.json");

  // Rider R1 (W-946): each loader points at its own lesson's Demo, and metas and loaders never share a file.
  const loaderRe = /"([^"]+)":\s*\(\)\s*=>\s*import\("\.\/([^/"]+)\/([^/"]+)\/Demo"\)/g;
  const loaderList = [...gen.matchAll(loaderRe)].map((x) => [x[1], `${x[2]}/${x[3]}`]);
  const slugOf = new Map(demos.filter((d) => d.meta).map((d) => [`${d.domainDir}/${d.slugDir}`, d.meta.slug]));
  const loaderCount = new Map();
  for (const [, p] of loaderList) loaderCount.set(p, (loaderCount.get(p) ?? 0) + 1);
  for (const k of onDisk) if (loaderCount.get(k) !== 1) err("src/demos/*.generated.ts", `lesson ${k} needs exactly one loader (has ${loaderCount.get(k) ?? 0})`);
  for (const [slug, p] of loaderList) if (slugOf.get(p) !== slug || !onDisk.has(p)) err("src/demos/*.generated.ts", `loader "${slug}" points at ${p}, which is not that lesson's Demo`);
  if ((gen.match(/\bimport\s*\(/g) || []).length !== loaderList.length) err("src/demos/*.generated.ts", "import() in generated code that is not a lesson loader");
  for (const [file, src] of Object.entries(files))
    if (/from "\.\/[^"]+\/meta\.json"/.test(src) && /\bimport\s*\(/.test(src)) err(file, "a generated file must not hold both metas and loaders (W-946)");
  for (const [file, src] of Object.entries(files))
    if (/(from|import)\s*\(?\s*["'][^"']*\.generated(\.ts)?["']/.test(src)) err(file, "a generated file must not import another generated file (keeps invariant 5 transitive)");


  // Roles and agents: every agent has an onboarding doc and vice versa
  const agentFiles = ls(rel(".claude/agents")).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));
  const roleFiles = ls(rel("company/roles")).filter((f) => f.endsWith(".md") && f !== "README.md" && !f.startsWith("_")).map((f) => f.slice(0, -3));
  for (const a of agentFiles) if (!roleFiles.includes(a)) err(`.claude/agents/${a}.md`, "agent has no onboarding doc in company/roles/");
  for (const r of roleFiles) {
    const doc = fs.readFileSync(rel("company/roles", `${r}.md`), "utf8");
    for (const h of ["## Mission", "## In scope", "## Out of scope", "## Authority", "## Inputs", "## Outputs", "## Day one"])
      if (!doc.includes(h)) err(`company/roles/${r}.md`, `onboarding doc missing section "${h}"`);
    const human = /^human:\s*true/m.test(doc);
    if (!human && !agentFiles.includes(r)) err(`company/roles/${r}.md`, "role has no agent definition in .claude/agents/ (or mark `human: true`)");
  }

  // Patterns
  for (const f of ls(rel("company/knowledge/patterns")).filter((f) => f.endsWith(".md") && f !== "README.md")) {
    const t = fs.readFileSync(rel("company/knowledge/patterns", f), "utf8");
    for (const k of ["id:", "confidence:", "context:", "therefore:", "would_be_wrong_if:"])
      if (!t.includes(k)) err(`company/knowledge/patterns/${f}`, `pattern missing "${k}"`);
  }

  // Decisions carry their objections
  for (const f of ls(rel("company/decisions")).filter((f) => /^\d{4}-.+\.md$/.test(f))) {
    const t = fs.readFileSync(rel("company/decisions", f), "utf8");
    if (!t.includes("## Objections")) err(`company/decisions/${f}`, 'decision record needs an "## Objections" section (write "none raised" if so)');
    if (!/^owner:/m.test(t)) err(`company/decisions/${f}`, "decision record needs an owner: line");
  }

  // Experiments: prediction committed before result
  for (const f of ls(rel("company/experiments")).filter((f) => /^EXP-.+\.md$/.test(f))) {
    const t = fs.readFileSync(rel("company/experiments", f), "utf8");
    const pred = t.indexOf("## Committed prediction");
    const res = t.indexOf("## Result");
    if (pred < 0) err(`company/experiments/${f}`, "missing committed prediction");
    if (res >= 0 && res < pred) err(`company/experiments/${f}`, "result section precedes the prediction");
    if (!/would_be_wrong_if:/.test(t)) err(`company/experiments/${f}`, "missing would_be_wrong_if");
  }

  // Constitution
  if (!exists(rel("company/constitution/protected-paths.txt"))) err("company/constitution", "protected-paths.txt missing");

  // Board
  const board = loadBoard();
  const ids = new Set();
  for (const it of board.items) {
    if (ids.has(it.id)) err("company/ops/board.json", `duplicate id ${it.id}`);
    ids.add(it.id);
    if (!["backlog", "next", "doing", "review", "done", "dropped"].includes(it.state)) err("company/ops/board.json", `${it.id} bad state ${it.state}`);
    if (!it.owner) err("company/ops/board.json", `${it.id} has no owner`);
  }

  for (const w of warnings) console.log(color.yellow("warn  ") + w);
  for (const e of errors) console.log(color.red("error ") + e);
  console.log(
    errors.length
      ? color.red(`\ncheck failed: ${errors.length} error(s), ${warnings.length} warning(s)`)
      : color.green(`check passed: ${demos.length} lessons, ${claimIds.size} claims, ${roleFiles.length} roles, ${warnings.length} warning(s)`),
  );
  process.exitCode = errors.length ? 1 : 0;
}

// ---------------------------------------------------------------- coverage

function coverage() {
  const demos = loadDemos().filter((d) => d.meta && d.meta.status !== "retired");
  return loadDomains().map((dom) => {
    const cur = loadCurriculum(dom.id) ?? { concepts: [] };
    const concepts = cur.concepts.map((c) => {
      const lessons = demos.filter((d) => d.meta.domain === dom.id && d.meta.concept === c.id).map((d) => d.meta);
      return { ...c, lessons };
    });
    const covered = concepts.filter((c) => c.lessons.length > 0).length;
    const published = concepts.filter((c) => c.lessons.some((l) => l.status === "published")).length;
    const unmet = concepts.filter((c) => c.lessons.length === 0).sort((a, b) => (b.demand ?? 0) - (a.demand ?? 0));
    return { dom, concepts, covered, published, total: concepts.length, unmet };
  });
}

function cmdCoverage(domainId) {
  for (const row of coverage()) {
    if (domainId && row.dom.id !== domainId) continue;
    console.log(color.bold(`\n${row.dom.name} (${row.dom.id}) — ${row.covered}/${row.total} concepts have a lesson, ${row.published} published · owner ${row.dom.categoryManager}`));
    for (const c of row.concepts) {
      const mark = c.lessons.some((l) => l.status === "published") ? color.green("●") : c.lessons.length ? color.yellow("◐") : "○";
      const demand = "▮".repeat(c.demand ?? 0).padEnd(3, "·");
      console.log(`  ${mark} ${demand} ${c.id.padEnd(30)} ${c.lessons.map((l) => `${l.slug} [${l.status}]`).join(", ")}`);
    }
  }
  console.log(color.dim("\n● published  ◐ in progress  ○ unmet demand   ▮ demand (1–3, set by the category manager)"));
}

// ---------------------------------------------------------------- claims

function cmdClaims(args) {
  const onlyOpen = args.includes("--open");
  for (const d of loadDemos()) {
    if (!d.meta) continue;
    for (const c of d.meta.claims) {
      if (onlyOpen && (c.status === "verified" || c.status === "withdrawn")) continue;
      const s = c.status === "verified" ? color.green(c.status) : c.status === "disputed" ? color.red(c.status) : color.yellow(c.status);
      console.log(`${c.id.padEnd(44)} ${s.padEnd(12)} ${c.support.padEnd(11)} ${c.text}`);
      console.log(color.dim(`${"".padEnd(44)} source: ${c.source}${c.checkedBy ? ` · checked by ${c.checkedBy} on ${c.checkedOn}` : ""}`));
    }
  }
}

// ---------------------------------------------------------------- rituals

function ritualTable() {
  const recs = ritualRecords();
  return Object.entries(RITUALS).map(([name, r]) => {
    const mine = recs.filter((x) => x.name === name).sort((a, b) => a.date.localeCompare(b.date));
    const last = mine.at(-1)?.date ?? null;
    let due = null;
    let overdue = false;
    if (r.cadenceDays) {
      const base = last ? new Date(last) : null;
      if (base) {
        const d = new Date(base.getTime() + r.cadenceDays * 86_400_000);
        due = d.toISOString().slice(0, 10);
        overdue = due < today();
      } else {
        due = "now";
        overdue = true;
      }
    }
    return { name, ...r, last, due, overdue, count: mine.length };
  });
}

function cmdRituals() {
  console.log(color.bold("ritual".padEnd(24) + "cadence".padEnd(10) + "last".padEnd(13) + "next due"));
  for (const r of ritualTable()) {
    const due = r.cadenceDays ? (r.overdue ? color.red(r.due + " (overdue)") : r.due) : color.dim("on event");
    console.log(`${r.name.padEnd(24)}${(r.cadenceDays ? r.cadenceDays + "d" : "—").padEnd(10)}${(r.last ?? "never").padEnd(13)}${due}`);
  }
}

function cmdRitual(name) {
  if (!name || !RITUALS[name]) {
    console.log(`usage: ritual <${Object.keys(RITUALS).join("|")}>`);
    process.exitCode = 1;
    return;
  }
  const tpl = rel("company/rituals/templates", `${name}.md`);
  if (!exists(tpl)) {
    console.log(`no template at company/rituals/templates/${name}.md`);
    process.exitCode = 1;
    return;
  }
  const dir = rel("company/rituals/records");
  fs.mkdirSync(dir, { recursive: true });
  let file = path.join(dir, `${today()}-${name}.md`);
  for (let n = 2; exists(file); n++) file = path.join(dir, `${today()}-${name}-${n}.md`);
  let body = fs.readFileSync(tpl, "utf8").replaceAll("{{date}}", today());
  if (body.includes("{{snapshot}}")) body = body.replace("{{snapshot}}", snapshotMarkdown());
  fs.writeFileSync(file, body);
  console.log(`started ${path.relative(ROOT, file)}`);
}

// ---------------------------------------------------------------- status

function snapshotMarkdown() {
  const demos = loadDemos().filter((d) => d.meta);
  const by = (s) => demos.filter((d) => d.meta.status === s).length;
  const openClaims = demos.flatMap((d) => d.meta.claims).filter((c) => c.status === "unverified" || c.status === "disputed");
  const cov = coverage();
  const lines = [];
  lines.push(`Generated by \`company status\` on ${today()}. Numbers are counts from the repository, not learning outcomes.`);
  lines.push("");
  lines.push(`| Lessons | draft | review | published | retired | open claims |`);
  lines.push(`|---|---|---|---|---|---|`);
  lines.push(`| ${demos.length} | ${by("draft")} | ${by("review")} | ${by("published")} | ${by("retired")} | ${openClaims.length} |`);
  lines.push("");
  lines.push(`| Domain | Owner | Concepts with a lesson | Published | Top unmet demand |`);
  lines.push(`|---|---|---|---|---|`);
  for (const r of cov) lines.push(`| ${r.dom.name} | ${r.dom.categoryManager} | ${r.covered}/${r.total} | ${r.published} | ${r.unmet.slice(0, 2).map((c) => c.id).join(", ") || "—"} |`);
  return lines.join("\n");
}

function cmdStatus() {
  const demos = loadDemos().filter((d) => d.meta);
  const by = (s) => demos.filter((d) => d.meta.status === s).length;
  console.log(color.bold("System 3 Company — operating picture") + color.dim(`  (${today()})`));
  console.log(`\nLessons: ${demos.length} total · ${by("draft")} draft · ${by("review")} review · ${color.green(by("published") + " published")} · ${by("retired")} retired`);

  const open = demos.flatMap((d) => d.meta.claims.map((c) => ({ ...c, slug: d.meta.slug }))).filter((c) => c.status === "unverified" || c.status === "disputed");
  console.log(`Claims awaiting the fact-checker: ${open.length ? color.yellow(open.length) : 0}${open.some((c) => c.status === "disputed") ? color.red(" (some disputed)") : ""}`);

  const blocked = demos.filter((d) => d.meta.status === "review").map((d) => ({ slug: d.meta.slug, gates: launchGates(d.meta) }));
  const ready = blocked.filter((b) => b.gates.length === 0);
  if (ready.length) console.log(color.green(`Ready to publish: ${ready.map((r) => r.slug).join(", ")}`));
  const notReady = blocked.filter((b) => b.gates.length);
  if (notReady.length) {
    console.log("In review, blocked by gates:");
    for (const b of notReady) console.log(`  ${b.slug}: ${b.gates[0]}${b.gates.length > 1 ? color.dim(` (+${b.gates.length - 1} more)`) : ""}`);
  }

  console.log(color.bold("\nCoverage"));
  for (const r of coverage()) {
    const bar = "█".repeat(r.published) + "▒".repeat(r.covered - r.published) + "░".repeat(Math.max(0, r.total - r.covered));
    console.log(`  ${r.dom.short.padEnd(12)} ${bar.padEnd(16)} ${String(r.covered).padStart(2)}/${r.total}  next: ${r.unmet[0]?.id ?? "—"}${r.dom.status !== "active" ? color.dim(` [${r.dom.status}]`) : ""}`);
  }

  const board = loadBoard();
  const st = (s) => board.items.filter((i) => i.state === s);
  console.log(color.bold("\nBoard") + `  doing ${st("doing").length} · review ${st("review").length} · next ${st("next").length} · backlog ${st("backlog").length}`);
  for (const i of [...st("doing"), ...st("review")]) console.log(`  [${i.state}] ${i.id} ${i.title} ${color.dim("— " + i.owner)}`);

  const overdue = ritualTable().filter((r) => r.overdue);
  console.log(color.bold("\nRituals") + (overdue.length ? color.red(`  overdue: ${overdue.map((r) => r.name).join(", ")}`) : color.green("  all on cadence")));

  const progress = rel("company/ops/progress.md");
  if (exists(progress)) {
    const t = fs.readFileSync(progress, "utf8");
    const first = t.split(/\n## (?=\d{4}-\d{2}-\d{2})/).slice(1, 2)[0];
    if (first) console.log(color.bold("\nLast handoff") + "\n  " + first.split("\n").slice(0, 6).join("\n  "));
  }
  console.log(color.dim("\nNext: `company check` before you push. Full detail: `company coverage`, `company claims --open`, `company rituals`."));
}

// ---------------------------------------------------------------- new-demo

function cmdNewDemo(domain, slug) {
  if (!domain || !slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    console.log("usage: new-demo <domain> <kebab-case-slug>");
    process.exitCode = 1;
    return;
  }
  const dom = loadDomains().find((d) => d.id === domain);
  if (!dom) {
    console.log(`unknown domain ${domain}`);
    process.exitCode = 1;
    return;
  }
  const dir = rel("src/demos", domain, slug);
  if (exists(dir)) {
    console.log(`${path.relative(ROOT, dir)} already exists`);
    process.exitCode = 1;
    return;
  }
  fs.mkdirSync(dir, { recursive: true });
  const tplDir = rel("tools/templates");
  fs.writeFileSync(path.join(dir, "Demo.tsx"), fs.readFileSync(path.join(tplDir, "Demo.tsx.tpl"), "utf8"));
  const meta = readJSON(path.join(tplDir, "meta.json.tpl"));
  meta.slug = slug;
  meta.domain = domain;
  meta.owner.categoryManager = dom.categoryManager;
  meta.claims = meta.claims.map((c, i) => ({ ...c, id: `${domain}.${slug}.c${i + 1}` }));
  writeJSON(path.join(dir, "meta.json"), meta);
  cmdRegistry({ quiet: true });
  console.log(`created ${path.relative(ROOT, dir)}/{Demo.tsx,meta.json}. Fill the brief fields first; build second.`);
}

// ---------------------------------------------------------------- publish

function cmdPublish(slug) {
  const d = loadDemos().find((x) => x.meta?.slug === slug);
  if (!d) {
    console.log(`no lesson ${slug}`);
    process.exitCode = 1;
    return;
  }
  const fails = launchGates(d.meta);
  if (fails.length) {
    console.log(color.red(`${slug} cannot publish:`));
    for (const f of fails) console.log(`  - ${f}`);
    process.exitCode = 1;
    return;
  }
  d.meta.status = "published";
  writeJSON(d.metaPath, d.meta);
  console.log(color.green(`${slug} published. Record the launch review in company/rituals/records/.`));
}

// ---------------------------------------------------------------- board

function cmdBoard(args) {
  const p = rel("company/ops/board.json");
  const board = loadBoard();
  const [sub, ...rest] = args;
  if (sub === "add") {
    const title = rest.filter((a) => !a.startsWith("--")).join(" ");
    const opt = (k) => rest.find((a) => a.startsWith(`--${k}=`))?.split("=")[1];
    const n = board.items.reduce((m, i) => Math.max(m, Number(i.id.split("-")[1]) || 0), 0) + 1;
    const item = { id: `W-${String(n).padStart(3, "0")}`, title, owner: opt("owner") ?? "chief-of-staff", state: opt("state") ?? "backlog", domain: opt("domain") ?? null, created: today(), links: [] };
    board.items.push(item);
    writeJSON(p, board);
    console.log(`added ${item.id}`);
    return;
  }
  if (sub === "move") {
    const [id, state] = rest;
    const it = board.items.find((i) => i.id === id);
    if (!it) {
      console.log(`no item ${id}`);
      process.exitCode = 1;
      return;
    }
    it.state = state;
    it.updated = today();
    writeJSON(p, board);
    console.log(`${id} → ${state}`);
    return;
  }
  for (const s of ["doing", "review", "next", "backlog", "done"]) {
    const items = board.items.filter((i) => i.state === s);
    if (!items.length) continue;
    console.log(color.bold(`\n${s} (${items.length})`));
    for (const i of items) console.log(`  ${i.id} ${i.title} ${color.dim(`— ${i.owner}${i.domain ? " · " + i.domain : ""}`)}`);
  }
}

// ---------------------------------------------------------------- roles

function cmdRoles() {
  const dir = rel("company/roles");
  for (const f of ls(dir).filter((f) => f.endsWith(".md") && f !== "README.md" && !f.startsWith("_"))) {
    const t = fs.readFileSync(path.join(dir, f), "utf8");
    const title = t.match(/^# (.+)$/m)?.[1] ?? f;
    const team = t.match(/^team:\s*(.+)$/m)?.[1] ?? "";
    const scope = t.split("## Mission")[1]?.trim().split("\n")[0] ?? "";
    console.log(`${color.bold(f.slice(0, -3).padEnd(26))} ${team.padEnd(12)} ${title}\n${"".padEnd(27)}${color.dim(scope.slice(0, 110))}`);
  }
}

// ---------------------------------------------------------------- qa-record

function cmdQaRecord() {
  const out = process.env.QA_OUT || "test-results";
  const reportPath = rel(out, "qa-report.json");
  if (!exists(reportPath)) {
    console.log(`no report at ${out}/qa-report.json: run \`npm run qa\` first`);
    process.exitCode = 1;
    return;
  }
  const report = readJSON(reportPath);
  const bySlug = {};
  const walk = (suite, trail) => {
    for (const s of suite.suites ?? []) walk(s, [...trail, s.title]);
    for (const spec of suite.specs ?? []) {
      if (!trail.some((t) => t.endsWith("contract.spec.ts"))) continue;
      const slug = trail.at(-1);
      for (const t of spec.tests ?? []) {
        const last = t.results?.at(-1);
        (bySlug[slug] ??= []).push({
          project: t.projectName,
          status: last?.status ?? "unknown",
          retries: Math.max(0, (t.results?.length ?? 1) - 1),
          error: last?.error?.message?.split("\n").slice(0, 3).join(" ").replace(/\x1b\[[0-9;]*m/g, "") ?? "",
        });
      }
    }
  };
  walk(report, []);
  const demos = loadDemos();
  for (const [slug, runs] of Object.entries(bySlug)) {
    const d = demos.find((x) => x.meta?.slug === slug);
    if (!d) continue;
    const passed = runs.length > 0 && runs.every((r) => r.status === "passed" && r.retries === 0);
    const dir = rel("company/reviews", slug);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${today()}-qa.md`);
    const body = [
      `# Computer-use QA: ${slug}`,
      "",
      `date: ${today()} · harness: tests/qa/contract.spec.ts · recorded by: qa-tester (company qa-record) · result: **${passed ? "pass" : "fail"}**`,
      "",
      "| Viewport | Result | Retries | First error |",
      "|---|---|---|---|",
      ...runs.map((r) => `| ${r.project} | ${r.status} | ${r.retries} | ${r.error.replace(/\|/g, "/").slice(0, 160) || "—"} |`),
      "",
      `Screenshots: \`artifacts/qa/${slug}/\` (not committed; regenerate with \`QA_ONLY=${slug} npm run qa\`).`,
      "",
      "A pass means the contract held in a browser. It is not evidence that anyone learned.",
      "",
    ].join("\n");
    fs.writeFileSync(file, body);
    const relFile = path.relative(ROOT, file);
    if (passed && !d.meta.evidence.qa.includes(relFile)) {
      d.meta.evidence.qa.push(relFile);
      writeJSON(d.metaPath, d.meta);
    }
    console.log(`${passed ? color.green("pass") : color.red("fail")} ${slug} → ${relFile}`);
  }
}

// ---------------------------------------------------------------- main

const [cmd, ...args] = process.argv.slice(2);
const commands = {
  status: () => cmdStatus(),
  check: () => cmdCheck(),
  registry: () => cmdRegistry(),
  coverage: () => cmdCoverage(args[0]),
  claims: () => cmdClaims(args),
  "new-demo": () => cmdNewDemo(args[0], args[1]),
  publish: () => cmdPublish(args[0]),
  ritual: () => cmdRitual(args[0]),
  rituals: () => cmdRituals(),
  board: () => cmdBoard(args),
  roles: () => cmdRoles(),
  "qa-record": () => cmdQaRecord(),
};
if (!cmd || !commands[cmd]) {
  console.log(fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1, 19).map((l) => l.replace(/^\/\/ ?/, "")).join("\n"));
  process.exitCode = cmd ? 1 : 0;
} else commands[cmd]();
