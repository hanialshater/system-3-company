// M2: a company from a spec. A spec is a JSON file (prototype/specs/<name>.json): rooms, skills, roles, the flow, and
// optionally channels, standing rules (checks every matching order gets), a CONTEXT.md text and a product line.
// `node meta.mjs init --spec-file=<json>` validates it against the invariants below, builds the state from it, keeps
// the spec in the state (so the company runs without the file), and writes ORG.md and CONTEXT.md for agents.
//   node generator.mjs validate <spec.json>     the invariants, as a list of violations (exit 1 if any)
//   node generator.mjs export <name>            a built-in spec (specs.mjs) as JSON
import fs from "node:fs";
import { SPECS } from "./specs.mjs";
import { validateCmd } from "./state.mjs";
import { validateWorkspace, validateRoleLaunch } from "./workspace.mjs";
import { signerRole, signerName, isIndependent, packProblem, packHistory, postProblems } from "./lib.mjs";

const SIGNERS = ["builder", "code", "checker", "orderer", "release", "founder", "evaluator"]; // K4: evaluator signs as a level, independent by default
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
    // K10: per-role launch settings (launcher/launch.mjs): tools, sessionMin, maxTurns, settingSources
    { const e = validateRoleLaunch(r); need(!e, `role ${r.id}: ${e}`); }
  }
  const st = s.flow?.stages ?? [];
  need(!!s.flow?.name && st.length > 0, "the flow has a name and stages");
  need(st[0]?.stage === "build" && st[0]?.signer === "builder", "the first stage is build, signed by the builder");
  for (const x of st) {
    // K3: or {role:"<id>"}, a role that exists and is active; K4: `independent` is a boolean, never on a builder stage, and
    // an independent stage's role is not a builder (it could be the order's own builder: the guard would refuse every run)
    const rid = signerRole(x);
    if (rid) {
      const r = roles.get(rid);
      need(Object.keys(x.signer).length === 1, `stage ${x.stage}: a role signer is {role:"<id>"}`);
      need(!!r && r.active !== false, `stage ${x.stage}: signer role ${rid} exists and is active`);
      need(!r || !r.human, `stage ${x.stage}: signer role ${rid} is an agent (a person signs as founder, through approval)`);
      if (r && isIndependent(x)) need(r.level !== "builder", `stage ${x.stage}: signer role ${rid} is a builder and cannot sign an independent stage`);
    } else need(SIGNERS.includes(x.signer), `stage ${x.stage}: signer is one of ${SIGNERS.join(", ")}, or {role:"<id>"}`);
    if (x.independent != null) need(typeof x.independent === "boolean", `stage ${x.stage}: independent is true or false`);
    if (x.signer === "builder") need(x.independent !== true, `stage ${x.stage}: an independent stage cannot be signed by the builder`);
    // K6: context-pack rules (a code stage has no pack: no agent reads it)
    { const e = packProblem(x.pack); need(!e, `stage ${x.stage}: ${e}`); }
    if (x.pack != null) need(x.signer !== "code", `stage ${x.stage}: a pack is for a stage an agent works, not code`);
  }
  need(new Set(st.map((x) => x.stage)).size === st.length, "stage names are unique");
  // K1: a stage `run` is a valid cmd, on a stage code may execute (code, orderer, release: never an agent's own stage or
  // the founder's), and its routes go back to an earlier stage only (plan 2026-10-21 §3, K1/K11)
  for (const [i, x] of st.entries()) {
    // K2: `async: true` runs the stage's cmd as a job outside the lock (jobs.mjs); it needs a cmd to run
    if (x.async != null) need(typeof x.async === "boolean" && (!x.async || x.run != null), `stage ${x.stage}: async is true or false, and async needs a run`);
    // K12: a post-check is a cmd with no route (a failure refuses the leave; it sends the order nowhere), on a stage an
    // agent leaves; it comes from the spec, never from an agent (as K1's run)
    if (x.post != null) {
      const e = validateCmd(x.post);
      need(!e, `stage ${x.stage}: post: ${e}`);
      // K12 review: where it may go (never a stage the supervisor or a person signs) and no agent text in a shell or cwd
      if (!e) for (const q of postProblems(x)) need(false, `stage ${x.stage}: ${q}`);
      need(x.post?.route == null, `stage ${x.stage}: post: a post-check has no route (a failure refuses the leave)`);
    }
    if (x.run == null) continue;
    need(["code", "orderer", "release"].includes(x.signer), `stage ${x.stage}: a run is for a stage signed by code, orderer or release, not ${x.signer}`);
    const e = validateCmd(x.run, { stages: st.slice(0, i).map((y) => y.stage) });
    need(!e, `stage ${x.stage}: run: ${e}`);
  }
  const has = (lvl) => s.roles.some((r) => r.level === lvl);
  if (st.some((x) => x.signer === "builder")) need(has("builder"), "a builder exists to sign build");
  if (st.some((x) => x.signer === "checker")) need(has("checker"), "a checker exists to sign check");
  if (st.some((x) => x.signer === "evaluator")) need(has("evaluator"), "an evaluator exists to sign its stage");
  if (st.some((x) => x.signer === "release")) need(has("release"), "a release role exists to sign ship");
  if (st.some((x) => x.signer === "orderer")) need(has("manager"), "a manager exists to order work (orderer signs uat)");
  // independence (S8): someone other than every builder can check
  if (st.some((x) => x.signer === "checker")) need(s.roles.some((r) => r.level === "checker" && r.level !== "builder"), "a checker who is not a builder");
  for (const c of s.channels ?? []) { need(["company", "lane", "role", "topic"].includes(c.kind), `channel ${c.id}: kind is company, lane, role or topic`); for (const m of c.members ?? []) need(roles.has(m), `channel ${c.id}: member ${m} exists`); }
  // K5: an order workspace (one git worktree per order, workspace.mjs)
  if (s.workspace != null) { const e = validateWorkspace(s.workspace); need(!e, `workspace: ${e}`); }
  // K9: the loop cap (true: lib.mjs DEFAULT_MAX_LOOPS; a lane policy's maxLoops wins), the same range as the knob
  if (s.maxLoops != null) need(s.maxLoops === true || (Number.isInteger(s.maxLoops) && s.maxLoops >= 1 && s.maxLoops <= 10), "maxLoops is true (3) or a whole number 1-10");
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
  for (const x of s.flow.stages) L.push(`1. **${x.stage}**, signed by the ${x.signer === "code" ? "supervisor's code" : signerName(x)}${isIndependent(x) && x.stage !== "check" ? " (independent: never the builder)" : ""}${x.evidence?.length ? ` (evidence: ${x.evidence.join(", ")})` : ""}${x.pack ? ` (pack: ${[!packHistory(x) && "no prior findings or history", x.pack.include?.length && `only ${x.pack.include.join(", ")}`, x.pack.exclude?.length && `never ${x.pack.exclude.join(", ")}`].filter(Boolean).join("; ")})` : ""}`);
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
