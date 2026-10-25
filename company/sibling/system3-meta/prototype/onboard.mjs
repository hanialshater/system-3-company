#!/usr/bin/env node
// Company onboarding (product/ONBOARDING.md, decided 2026-10-25) as code: the starter archetypes, the one catalog of
// roles, the org-design proposal (one design and at least one alternative, by the company's chief of staff or its
// org-health head), the CEO's approval (the company's owner, nobody else), and generation of the company's folder:
// company.json, a v1 event log the starter HQ reads, a knowledge base, the archetype's own files (crew.json for the
// crew-shaped archetypes, a spec skeleton for corporate) and its entry for the city file.
//   node onboard.mjs archetypes
//   node onboard.mjs search <words> [--catalog=<domain roles .json|.mjs>]   (Meta's starter catalog always included)
//   node onboard.mjs propose <intake.json> <designs.json> --by=<role>   → proposal.json beside the intake
//   node onboard.mjs approve <proposal.json> --by=<owner> --choice=<n>
//   node onboard.mjs generate <proposal.json> <company dir>
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export class OnboardRefusal extends Error {}
const refuse = (m) => { throw new OnboardRefusal(m); };

/** the first starter kit's archetypes (founder, 2026-10-25); committee and open source join when a company has tried them */
export const ARCHETYPES = {
  corporate: { title: "Corporate (Amazon-like)", shape: "spec", decides: "written documents; single-threaded owners decide in their lane", referee: "gates per lane", needs: ["chief-of-staff"] },
  "dynamic-workflow": { title: "Dynamic workflow (autonomous)", shape: "crew", decides: "members choose, claim and land their own work past the referee", referee: "a land is accepted only if the score does not fall", needs: [] },
  science: { title: "Science (lab)", shape: "crew", decides: "hypotheses with predictions committed before any run; independent review", referee: "held-out tests and pre-registered criteria", needs: [], heldOut: true },
  population: { title: "Population (evolutionary)", shape: "crew", decides: "selection by a fixed evaluator", referee: "the fixed evaluator", needs: [] },
  "single-agent": { title: "Single strong agent", shape: "crew", decides: "the agent", referee: "the referee", needs: [], maxMembers: 1 },
};
/** every company has a referee owner and HQ developers (ONBOARDING.md step 3) */
export const ALWAYS = ["evaluation-steward", "hq-engineer"];
/** the generic roles that move to the starter catalog (Meta-owned); the rest are domain roles other companies may copy */
export const STARTER_ROLES = ["chief-of-staff", "chief-of-staff-ceo-office", "principal-engineer", "evaluation-steward", "fact-checker", "qa-tester", "release-manager", "hq-engineer", "portfolio-manager", "analytics-steward", "privacy-reviewer"];
const PROPOSERS = ["chief-of-staff", "chief-of-staff-ceo-office"];

/** the catalog: Meta's starter catalog (../catalog/roles.json, the generic roles) plus any domain catalogs a company
 *  adds (a .json with { roles } or a .mjs exporting `roles`, e.g. System 3 Company's tools/org/roles.mjs) */
export const STARTER_CATALOG = path.join(HERE, "..", "catalog", "roles.json");
export async function loadCatalog(files = []) {
  const list = [STARTER_CATALOG, ...(Array.isArray(files) ? files : [files]).filter(Boolean)], out = new Map();
  for (const f of list) {
    const roles = f.endsWith(".json") ? JSON.parse(fs.readFileSync(f, "utf8")).roles : (await import(pathToFileURL(path.resolve(f)).href)).roles;
    for (const r of roles) if (!out.has(r.id)) out.set(r.id, { id: r.id, title: r.title, team: r.team, reportsTo: r.reportsTo ?? null, mission: r.mission ?? "", description: r.description ?? "", layer: STARTER_ROLES.includes(r.id) ? "starter" : "domain" });
  }
  return [...out.values()];
}
/** roles ranked by how many of the words they mention (id, title, team, mission, description) */
export function searchCatalog(catalog, words) {
  const ws = String(words).toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  return catalog.map((r) => { const hay = `${r.id} ${r.title} ${r.team} ${r.mission} ${r.description}`.toLowerCase(); return { ...r, hits: ws.filter((w) => hay.includes(w)).length }; }).filter((r) => r.hits).sort((a, b) => b.hits - a.hits || a.id.localeCompare(b.id));
}

const INTAKE = ["name", "purpose", "product", "measure", "budget", "owner"];
/** step 2-3: one design and at least one alternative; each names its archetype, its reason, its roles from the catalog
 *  (or new domain roles with a mission, added to the catalog later) and always the referee owner and HQ developers */
export function propose(catalog, intake, designs, by) {
  for (const k of INTAKE) if (intake?.[k] == null || intake[k] === "") refuse(`the intake needs ${k} (ONBOARDING.md step 1)`);
  if (!/^[a-z0-9-]+$/.test(intake.id ?? "")) refuse("the intake needs an id: lowercase letters, digits and dashes");
  if (!PROPOSERS.includes(by)) refuse(`the org design is proposed by the company's chief of staff or its org-health head (${PROPOSERS.join(", ")}), not ${by}`);
  if (intake.owner === by) refuse("the proposer is not the approver");
  if (!Array.isArray(designs) || designs.length < 2) refuse("propose one design and at least one alternative");
  const ids = new Set(catalog.map((r) => r.id));
  designs.forEach((d, n) => {
    const a = ARCHETYPES[d.archetype]; if (!a) refuse(`design ${n + 1}: no archetype ${d.archetype} (one of ${Object.keys(ARCHETYPES).join(", ")})`);
    if (!String(d.reason ?? "").trim()) refuse(`design ${n + 1}: a design carries its reason`);
    const roles = d.roles ?? [];
    for (const r of roles) if (typeof r === "string" ? !ids.has(r) : !(r?.id && r?.mission)) refuse(`design ${n + 1}: ${typeof r === "string" ? `no role ${r} in the catalog (a new role needs an id and a mission)` : "a new role needs an id and a mission"}`);
    const have = roles.map((r) => (typeof r === "string" ? r : r.id));
    for (const r of [...ALWAYS, ...a.needs]) if (!have.includes(r)) refuse(`design ${n + 1}: every ${a.title} company includes ${r}`);
    if (a.maxMembers && (d.members ?? []).length > a.maxMembers) refuse(`design ${n + 1}: ${a.title} has ${a.maxMembers} member`);
    if (a.shape === "crew" && !(d.members ?? []).length) refuse(`design ${n + 1}: a ${a.title} company names its members (id, role, model)`);
  });
  return { v: 1, intake, designs, by, t: new Date().toISOString(), status: "proposed", choice: null };
}

/** step 3b: the company's CEO (its owner, from the intake) approves one design; no one else can */
export function approve(proposal, by, choice) {
  if (proposal.status !== "proposed") refuse(`the proposal is ${proposal.status}`);
  if (by !== proposal.intake.owner) refuse(`only the company's owner (${proposal.intake.owner}) approves its org design`);
  const n = Number(choice); if (!Number.isInteger(n) || n < 1 || n > proposal.designs.length) refuse(`choose a design, 1 to ${proposal.designs.length}`);
  return { ...proposal, status: "approved", choice: n, approvedBy: by, approvedAt: new Date().toISOString() };
}

/** step 6: the company's folder from an approved proposal; returns its city entry */
export function generate(proposal, dir, catalog = []) {
  if (proposal.status !== "approved") refuse("generate needs an approved proposal (its owner approves it first)");
  const { intake } = proposal, d = proposal.designs[proposal.choice - 1], a = ARCHETYPES[d.archetype];
  if (fs.existsSync(path.join(dir, "company.json"))) refuse(`${dir} already holds a company`);
  if (a.heldOut && !intake.referee?.heldOut) refuse(`a ${a.title} company needs a held-out referee (intake.referee.heldOut) before it starts`);
  fs.mkdirSync(path.join(dir, "knowledge"), { recursive: true });
  const t = new Date().toISOString(), roles = (d.roles ?? []).map((r) => (typeof r === "string" ? r : r.id));
  fs.writeFileSync(path.join(dir, "company.json"), JSON.stringify({ v: 1, id: intake.id, name: intake.name, owner: intake.owner, archetype: d.archetype, intake, design: d, approvedBy: proposal.approvedBy, approvedAt: proposal.approvedAt, roles, newRoles: (d.roles ?? []).filter((r) => typeof r !== "string") }, null, 2) + "\n");
  fs.writeFileSync(path.join(dir, "knowledge", "entries.jsonl"), "");
  // the org file (the HQ's Org page): the chosen roles, each reporting to its catalog manager if that role was chosen
  // too, else to the owner; a crew's members report to the owner
  const byId = Object.fromEntries(catalog.map((r) => [r.id, r])), chosen = new Set(roles);
  const org = [{ id: intake.owner, title: "Owner (CEO)", reportsTo: null }, ...(d.roles ?? []).map((r) => { const id = typeof r === "string" ? r : r.id, c = byId[id]; return { id, title: c?.title ?? (typeof r === "string" ? id : r.title ?? id), reportsTo: chosen.has(c?.reportsTo) ? c.reportsTo : intake.owner, team: c?.team ?? null }; }), ...(d.members ?? []).map((m) => ({ id: m.id, title: m.role, reportsTo: intake.owner, team: "crew", model: m.model }))];
  fs.writeFileSync(path.join(dir, "org.json"), JSON.stringify(org, null, 1) + "\n");
  fs.mkdirSync(path.join(dir, "hq"), { recursive: true }); fs.writeFileSync(path.join(dir, "hq", "pages.json"), "[]\n"); // the HQ developers' pages
  if (a.shape === "crew") fs.writeFileSync(path.join(dir, "crew.json"), JSON.stringify({ members: d.members.map((m) => ({ id: m.id, model: m.model, role: m.role, tree: path.join(dir, "trees", m.id) })), main: path.join(dir, "main"), referee: intake.referee ?? { cmd: "" }, budget: intake.budget, minutes: intake.minutes ?? 600, task: intake.task ?? null, knowledge: path.join(dir, "knowledge", "KB.md"), plateauMin: intake.plateauMin ?? null }, null, 2) + "\n");
  else fs.writeFileSync(path.join(dir, "spec.json"), JSON.stringify({ name: intake.id, roles: roles.map((id) => ({ id })), rooms: [], skills: [], flow: null, _todo: "complete the spec (generator.mjs validate) before `meta.mjs init --spec-file`" }, null, 2) + "\n");
  const ev = [{ type: "company.proposed", by: proposal.by, t: proposal.t, designs: proposal.designs.map((x) => x.archetype) }, { type: "company.approved", by: proposal.approvedBy, t: proposal.approvedAt, archetype: d.archetype }, { type: "company.start", by: "meta", t, archetype: d.archetype, roles, budget: intake.budget }];
  fs.writeFileSync(path.join(dir, "events.jsonl"), ev.map((e) => JSON.stringify({ v: 1, ...e })).join("\n") + "\n");
  return { id: intake.id, name: intake.name, archetype: a.title, owner: intake.owner, events: path.join(dir, "events.jsonl"), knowledge: path.join(dir, "knowledge"), hq: path.join(dir, "hq"), orgCmd: a.shape === "crew" ? `CREW_DIR=${JSON.stringify(dir)} node ${JSON.stringify(path.join(HERE, "crew.mjs"))} org` : `cat ${JSON.stringify(path.join(dir, "org.json"))}` };
}

// ---------------------------------------------------------------- CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const [cmd, ...rest] = process.argv.slice(2);
  const opt = Object.fromEntries(rest.filter((x) => x.startsWith("--")).map((x) => { const [k, ...v] = x.slice(2).split("="); return [k, v.join("=") || true]; }));
  const args = rest.filter((x) => !x.startsWith("--")), J = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
  try {
    if (cmd === "archetypes") for (const [id, a] of Object.entries(ARCHETYPES)) console.log(`${id.padEnd(17)} ${a.title}: ${a.decides}; referee: ${a.referee}`);
    else if (cmd === "search") for (const r of searchCatalog(await loadCatalog(opt.catalog), args.join(" ")).slice(0, 15)) console.log(`${r.id.padEnd(34)} ${r.layer.padEnd(7)} ${r.mission.slice(0, 90)}`);
    else if (cmd === "propose") { const p = propose(await loadCatalog(opt.catalog), J(args[0]), J(args[1]), opt.by), out = path.join(path.dirname(args[0]), "proposal.json"); fs.writeFileSync(out, JSON.stringify(p, null, 2) + "\n"); console.log(`proposed ${p.designs.length} designs → ${out}; the owner (${p.intake.owner}) approves one`); }
    else if (cmd === "approve") { const p = approve(J(args[0]), opt.by, opt.choice); fs.writeFileSync(args[0], JSON.stringify(p, null, 2) + "\n"); console.log(`approved design ${p.choice} (${p.designs[p.choice - 1].archetype})`); }
    else if (cmd === "generate") console.log(JSON.stringify(generate(J(args[0]), path.resolve(args[1]), await loadCatalog(opt.catalog)), null, 2));
    else refuse("usage: onboard.mjs archetypes | search <words> | propose <intake> <designs> --by= | approve <proposal> --by= --choice= | generate <proposal> <dir>");
  } catch (e) { if (e instanceof OnboardRefusal) { console.error(e.message); process.exit(1); } throw e; }
}
