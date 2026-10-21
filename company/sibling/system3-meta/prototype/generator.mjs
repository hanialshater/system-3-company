// M2: a company from a spec. A spec is a JSON file (prototype/specs/<name>.json): rooms, skills, roles, the flow, and
// optionally channels, standing rules (checks every matching order gets), a CONTEXT.md text and a product line.
// `node meta.mjs init --spec-file=<json>` validates it against the invariants below, builds the state from it, keeps
// the spec in the state (so the company runs without the file), and writes ORG.md and CONTEXT.md for agents.
//   node generator.mjs validate <spec.json>     the invariants, as a list of violations (exit 1 if any)
//   node generator.mjs export <name>            a built-in spec (specs.mjs) as JSON
import fs from "node:fs";
import { SPECS } from "./specs.mjs";

const SIGNERS = ["builder", "code", "checker", "orderer", "release", "founder"];
const LEVELS = ["founder", "chief-of-staff", "vp", "manager", "builder", "checker", "release", "evaluator", "contractor"];
const KINDS = ["lobby", "office", "lane", "quality", "launch", "meeting"];

/** Every violation of the invariants a company must hold before it runs. Empty means valid. */
export function validateSpec(s) {
  const v = [];
  const need = (ok, msg) => { if (!ok) v.push(msg); };
  if (!s || typeof s !== "object") return ["a spec is an object"];
  for (const k of ["rooms", "skills", "roles", "flow"]) need(s[k] != null, `missing ${k}`);
  if (v.length) return v;
  const rooms = new Map(s.rooms.map((r) => [r.id, r]));
  need(rooms.size === s.rooms.length, "room ids are unique");
  for (const r of s.rooms) { need(KINDS.includes(r.kind), `room ${r.id}: kind is one of ${KINDS.join(", ")}`); need(Number.isInteger(r.floor) && r.floor >= 1, `room ${r.id}: floor is a whole number from 1`); if (r.kind === "lane") need(!!r.lane, `lane room ${r.id} names its lane`); }
  const roles = new Map(s.roles.map((r) => [r.id, r]));
  need(roles.size === s.roles.length, "role ids are unique");
  const founders = s.roles.filter((r) => r.level === "founder");
  need(founders.length === 1 && founders[0].human, "exactly one founder, and the founder is a person (human: true)");
  for (const r of s.roles) {
    need(LEVELS.includes(r.level), `role ${r.id}: level is one of ${LEVELS.join(", ")}`);
    need(rooms.has(r.room), `role ${r.id}: room ${r.room} exists`);
    if (rooms.has(r.room)) need(rooms.get(r.room).floor === r.floor, `role ${r.id}: floor ${r.floor} is room ${r.room}'s floor (${rooms.get(r.room).floor})`);
    for (const k of r.skills ?? []) need(s.skills.includes(k), `role ${r.id}: skill ${k} is declared`);
    if (r.level !== "founder") need(roles.has(r.reportsTo), `role ${r.id}: reports to an existing role (${r.reportsTo})`);
    // the chain ends at the founder, with no loop
    const seen = new Set(); let x = r;
    while (x && x.level !== "founder" && !seen.has(x.id)) { seen.add(x.id); x = roles.get(x.reportsTo); }
    need(x?.level === "founder", `role ${r.id}: its reporting chain reaches the founder`);
    if (["builder", "manager"].includes(r.level) && r.lane) need(s.rooms.some((m) => m.kind === "lane" && m.lane === r.lane), `role ${r.id}: lane ${r.lane} has a lane room`);
    if (r.level === "builder") { const m = roles.get(r.reportsTo); need(m?.level === "manager", `builder ${r.id} reports to a manager (who delegates its work)`); }
  }
  const st = s.flow?.stages ?? [];
  need(!!s.flow?.name && st.length > 0, "the flow has a name and stages");
  need(st[0]?.stage === "build" && st[0]?.signer === "builder", "the first stage is build, signed by the builder");
  for (const x of st) need(SIGNERS.includes(x.signer), `stage ${x.stage}: signer is one of ${SIGNERS.join(", ")}`);
  need(new Set(st.map((x) => x.stage)).size === st.length, "stage names are unique");
  const has = (lvl) => s.roles.some((r) => r.level === lvl);
  if (st.some((x) => x.signer === "builder")) need(has("builder"), "a builder exists to sign build");
  if (st.some((x) => x.signer === "checker")) need(has("checker"), "a checker exists to sign check");
  if (st.some((x) => x.signer === "release")) need(has("release"), "a release role exists to sign ship");
  if (st.some((x) => x.signer === "orderer")) need(has("manager"), "a manager exists to order work (orderer signs uat)");
  // independence (S8): someone other than every builder can check
  if (st.some((x) => x.signer === "checker")) need(s.roles.some((r) => r.level === "checker" && r.level !== "builder"), "a checker who is not a builder");
  for (const c of s.channels ?? []) { need(["company", "lane", "role", "topic"].includes(c.kind), `channel ${c.id}: kind is company, lane, role or topic`); for (const m of c.members ?? []) need(roles.has(m), `channel ${c.id}: member ${m} exists`); }
  for (const r of s.rules ?? []) need(!!r.tasks && r.checks && typeof r.checks === "object", "a standing rule is {tasks, checks}");
  return v;
}

/** ORG.md: the company as agents read it (generated, never edited by hand). */
export function orgDoc(s, name) {
  const L = [`# ${s.title ?? name}: the organisation (generated from the spec \`${name}\`; do not edit)`, ""];
  if (s.product) L.push(s.product, "");
  L.push("## Roles", "", "| Role | Level | Reports to | Room (floor) | Lane | Skills |", "|---|---|---|---|---|---|");
  for (const r of s.roles) L.push(`| ${r.id} | ${r.level}${r.human ? " (a person)" : ""} | ${r.reportsTo ?? "-"} | ${r.room} (${r.floor}) | ${r.lane ?? "-"} | ${(r.skills ?? []).join(", ") || "-"} |`);
  L.push("", "## How work flows", "", `Every order goes through the \`${s.flow.name}\` flow; each stage is signed by one kind of role, and nobody checks their own work.`, "");
  for (const x of s.flow.stages) L.push(`1. **${x.stage}**, signed by the ${x.signer === "code" ? "supervisor's code" : x.signer}${x.evidence?.length ? ` (evidence: ${x.evidence.join(", ")})` : ""}`);
  if (s.rules?.length) { L.push("", "## Standing rules (checked by code on every matching order)", ""); for (const r of s.rules) L.push(`- orders whose task starts with \`${r.tasks}\`: ${Object.keys(r.checks).join(", ")}`); }
  if (s.channels?.length) { L.push("", "## Channels", ""); for (const c of s.channels) L.push(`- \`${c.id}\` (${c.kind})${c.title ? `: ${c.title}` : ""}`); }
  return L.join("\n") + "\n";
}

export const builtinSpec = (name) => { const s = SPECS[name]; if (!s) throw new Error(`no built-in spec ${name}`); return JSON.parse(JSON.stringify(s)); };

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, arg] = process.argv.slice(2);
  if (cmd === "validate") { const v = validateSpec(JSON.parse(fs.readFileSync(arg, "utf8"))); console.log(JSON.stringify({ valid: !v.length, violations: v }, null, 1)); process.exit(v.length ? 1 : 0); }
  else if (cmd === "export") console.log(JSON.stringify(builtinSpec(arg), null, 1));
  else { console.error("usage: node generator.mjs validate <spec.json> | export <name>"); process.exit(2); }
}
