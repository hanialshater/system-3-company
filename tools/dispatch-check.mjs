#!/usr/bin/env node
// Dispatch preflight: the chief of staff runs this before EVERY Agent call. Exit 1 means do not dispatch.
// Source: company/reviews/org/2026-10-14-operating-audit.md (proposed 2026-10-14, founder to ratify).
// It turns the operating loop's rules into a check that fails loudly instead of a rule someone remembers.
//
//   node tools/dispatch-check.mjs --kind=<kind> --role=<subagent_type> --source=<source> [--chooser=<role>]
//                                 [--agent=<label>] [--run=<mail run id>] [--running=N] [--builders=N] [--worktree=PATH] [--no-claim] [--json]
//
// kind:  build    new lesson builds or revisions (anything that edits src/ and runs a dev server or QA)
//        wave     a batch of new work: builds, new briefs, new categories
//        check    fact-check, learner review, QA, design review of existing work
//        ritual   running a ritual (WBR, retro, crit, launch review, digest ...)
//        incident fixing a SEV1/SEV2 or a learner-harming bug
//        other    anything else (engineering, strategy, org)
// --running / --builders: the chief of staff's own count of agents still running (from the Agent tool).
//        The event log is also read; the larger number wins, so an unlogged agent cannot hide.
//
// --role / --source / --chooser / --agent: the slot ledger (tools/lib/slots.mjs, W-1196, retro 2026-10-16 C2).
//        source = batch=<file>#B<n> | SO-<lane>-<n> | §4:<reason>. chooser defaults to the batch's poc: line
//        (chief-of-staff for §4). When the check passes, a slot file is claimed in company/ops/slots/ (O_EXCL);
//        --no-claim checks without claiming. A later report/stopped event releases it: the same --agent label
//        (or the hook's "<label> ·<hash>"), the hook's report joined through its tool-use-id to a dispatch event
//        with the same role and source, or a summary naming the batch item (slots.mjs assignReleases, W-1240 F1).
//        Give --agent the exact description of the Agent call. `node tools/lib/slots.mjs list | release <id> | prune`.
// S3_SLOTS=warn|enforce (or --slots=): warn (the default for one round, until the chief of staff writes the
//        switch-over date) prints S-rule failures as warnings and exits 0 on them; enforce makes them FAIL.
//        C1-C4, R1, R2 and I1 are unchanged by the mode. An exception in the ledger is "S3 ledger error": a warning
//        (no slot claimed) in warn mode, a FAIL in enforce mode (W-1240 F2 / PE-ops L1).
//
// Rules (each FAIL names the rule):
//   C1  at most 14 agents in flight: a dispatch that would make 15 fails (every kind). Founder 2026-10-16: 14 agents, 3 builders.
//   C2  at most 3 builders in flight: a build/wave dispatch that would make 4 fails.
//   C3  builders work in a worktree: build/wave needs --worktree=<path> that is a git worktree, not the main checkout.
//   C4  host guard: build/wave fails when the 1-minute load is above 2 x CPUs or / has under 10 GB free;
//       check fails under 5 GB free.
//   R1  rituals before new work: wave/build fails while the WBR, retro or founder digest is due (tools/rituals-due.mjs).
//   R2  incidents before new work: wave/build fails while a SEV1/SEV2 incident event has no REVIEWED COE in
//       company/rituals/records/: header (lines before the first `## `) has `status: final`, `incident: <id>`
//       and `reviewers:`; every named reviewer has a `## Review (<role>, <date>)` section with `verdict: accept`;
//       no reviewer is the owner (tools/lib/coe-coverage.mjs; W-715, W-782). S3_COE_DIR overrides the folder (tests).
//   I1  founder intake: wave fails while a founder decision record dated 2026-10-15 or later has no
//       `class:` line, no `route:` line or no "## Objections" section (company/decisions/_template-founder-intake.md).
//   S1  source: no --source, a malformed one, a batch file or item that does not exist, an item whose role: is not
//       --role, a standing order no batch issued, a §4 with no reason, or a --chooser that is not the batch's poc.
//   S2  role: --role must have .claude/agents/<role>.md; general-purpose only with --source="§4:integration: <what>".
//       A role not listed in the batch's lane on poc-map.md is a warning (the map is prose).
//   S3  slots: live slots (not released, not stale) are a third in-flight count beside the event log and --running;
//       the largest wins for C1/C2. A failure that only the slot count causes is S3 (follows the mode). A slot
//       older than 6 h is reported, not counted. Claiming an id another live slot holds is S3.
//   S4  checkers through quality: a lane-10 checker role whose source is not a lane-10 batch or standing order,
//       nor `§4:ritual: <id>` with <id> in that role's rituals: in tools/org/roles.mjs (W-1240 Q1).
//       Built but OFF until founder F-28 is answered: --s4 or S3_SLOTS_S4=on turns it on.
//   B1  budget: when --source names a project (a batch item's or header's `project: [project:<id>]`, a standing
//       order's batch header, or a mail request's project:), `ledger.mjs gate` must pass for it (tools/lib/ledger.mjs
//       gate, token-budget.md sections 4 and 6: lines never block, grace periods pass with a warning, an approved
//       major project fails at 100%). B1 always FAILs, in warn mode too. S3_LEDGER / S3_PROJECTS override (tests).
//   Hard S1/S2 (assessment 2026-10-17 finding 2): a --role that is neither in tools/org/roles.mjs nor has an agent
//       file, and a batch= source whose file does not exist, FAIL in every slot mode. The other S rules follow it.
//   M1  mailbox (F-42): with --source=mail:<id>, the message must be a not-done dispatch-request in the dispatcher
//       mailbox naming --role, reserved by the drain for --run=<run> with a live lease and not yet launched
//       (reserve before launch, assessment 2026-10-17 finding 3; tools/lib/mailbox.mjs reserve), and it must pass the lane rule again (tools/lib/mailbox.mjs laneCheck:
//       sender is its lane's POC on poc-map.md, role listed in that lane, checkers only from lane 10, never
//       release-manager or anything naming deploy). M1 always FAILs, in warn mode too: S3_SLOTS does not soften it.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { coeCoverage } from "./lib/coe-coverage.mjs";
import * as slots from "./lib/slots.mjs";
import * as mailbox from "./lib/mailbox.mjs";
import { mergeById, readJsonlFile, readSpool } from "./lib/events-spool.mjs";
import { ageText, lastHookEvent, possiblyFinished, replay } from "./lib/inflight.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const KINDS = ["build", "wave", "check", "ritual", "incident", "other"];
const kind = opt.kind;
if (!KINDS.includes(kind)) {
  console.error(`usage: node tools/dispatch-check.mjs --kind=<${KINDS.join("|")}> --role=<subagent_type> --source=<batch=<file>#B<n>|SO-<lane>-<n>|§4:<reason>> [--chooser=<role>] [--agent=<label>] [--running=N] [--builders=N] [--worktree=PATH] [--no-claim] [--json]`);
  process.exit(2);
}
const MAX_AGENTS = 14, MAX_BUILDERS = 3, STALE_H = 6, INTAKE_FROM = "2026-10-15";
const builds = kind === "build" || kind === "wave";
const fails = [], warns = [], info = [];

// ---- in flight: event log (dispatch without report/stopped in the last STALE_H hours) vs the caller's count
const evPath = process.env.S3_EVENTS ? path.resolve(process.env.S3_EVENTS) : path.join(ROOT, "company/ops/events.jsonl");
// The log plus the hook spool (ruling H2, tools/lib/events-spool.mjs): the hook writes only the spool, so in-flight
// counts must read it between the chief of staff's folds. Deduped by id; unreadable lines are skipped and counted.
const logRead = readJsonlFile(evPath);
const spool = readSpool();
const events = mergeById(logRead.events, spool.events).filter((e) => typeof e?.ts === "string").sort((a, b) => a.ts.localeCompare(b.ts));
// r5-tools B2 (tools/lib/inflight.mjs): a report or stopped event closes the open dispatch with the same run key
// (explicit key / tool-use id), else the same label (the old rule), else the same batch item. Never on a guess.
const flight = replay(events);
const fresh = flight.open.map((r) => r.dispatch).filter((e) => Date.now() - Date.parse(e.ts) < STALE_H * 3.6e6);
const isBuilder = (e) => (e.subjects ?? []).includes("demo-builder") || /builder/i.test(e.agent ?? "");
const logAgents = fresh.length, logBuilders = fresh.filter(isBuilder).length;
const lastDispatch = events.filter((e) => e.type === "dispatch").at(-1)?.ts;
if (opt.running === undefined) warns.push("no --running count given: only the event log was read, and it misses unlogged agents");
const running = Math.max(logAgents, Number(opt.running ?? 0));
const builders = Math.max(logBuilders, Number(opt.builders ?? 0));
if (logRead.bad.length || spool.skipped) warns.push(`event log has ${logRead.bad.length + spool.skipped} unreadable line(s) (log ${logRead.bad.length}, spool ${spool.skipped}): they are skipped, so in-flight may be undercounted; pass --running`);
if (spool.lines) info.push(`hook spool: ${spool.lines} unfolded event(s), oldest ${spool.oldest ?? "?"} (node tools/events.mjs fold)`);
info.push(`in flight: ${running} agents, ${builders} builders (event log ${logAgents}/${logBuilders}, caller ${opt.running ?? "-"}/${opt.builders ?? "-"}; last logged dispatch ${lastDispatch ?? "never"})`);
if (lastDispatch && Date.now() - Date.parse(lastDispatch) > 3 * 3.6e6 && opt.running === undefined) warns.push("no dispatch logged for 3 h or more: the event log may have stopped recording (pass --running)");
{
  const byRule = flight.closes.reduce((m, c) => ((m[c.rule] = (m[c.rule] ?? 0) + 1), m), {});
  if (byRule.key || byRule.batch) info.push(`in-flight matching: ${byRule.key ?? 0} closed by run key, ${byRule.batch ?? 0} by batch item, ${byRule.label ?? 0} by label (tools/lib/inflight.mjs)`);
}

// ---- hook liveness (W-1280): are the repo hooks (F-31) writing hk- events in this session tree?
const hk = lastHookEvent(events);
let f31 = false;
try { f31 = /agent-events\.mjs/.test(fs.readFileSync(path.join(ROOT, ".claude/settings.json"), "utf8")); } catch {}
if (hk) info.push(`hooks: last hk- event ${ageText(Date.now() - Date.parse(hk.ts))} ago (${hk.type}, ${hk.agent ?? hk.id})`);
else info.push("hooks: no hk- event ever: this session tree may not load the repo hooks (W-1280); dispatch/report events are hand-written");
if (f31 && (!hk || Date.now() - Date.parse(hk.ts) > STALE_H * 3.6e6)) warns.push(`hooks: F-31 is applied (.claude/settings.json wires agent-events.mjs) but no hk- event ${hk ? `in ${STALE_H} h (last ${ageText(Date.now() - Date.parse(hk.ts))} ago)` : "was ever written"}: the hooks are not running here (W-1280), so in-flight relies on hand events and the backfill`);

if (running + 1 > MAX_AGENTS) fails.push(`C1 concurrency: ${running} agents in flight; this dispatch would make ${running + 1} (limit ${MAX_AGENTS})`);
if (builds && builders + 1 > MAX_BUILDERS) fails.push(`C2 builders: ${builders} builders in flight; this dispatch would make ${builders + 1} (limit ${MAX_BUILDERS})`);

// ---- S1-S4 slot ledger (tools/lib/slots.mjs). In warn mode its failures are warnings.
const slotMode = String(opt.slots ?? process.env.S3_SLOTS ?? "warn");
if (!["warn", "enforce"].includes(slotMode)) { console.error(`S3_SLOTS must be warn or enforce, not ${slotMode}`); process.exit(2); }
const s4On = opt.s4 === true || opt.s4 === "on" || process.env.S3_SLOTS_S4 === "on";
const sFails = [];
// L1 (PE-ops) / W-1240 F2: an exception in the ledger (an unreadable slots folder, a batch file that cannot be read)
// is an S3 ledger error. In warn mode it warns and the dispatch goes ahead without a slot; in enforce mode it FAILs.
let ledgerError = null;
const ledgerFailed = (where, e) => {
  ledgerError = `S3 ledger error (${where}): ${e?.code ? `${e.code} ` : ""}${e?.message ?? e}`;
  if (slotMode === "enforce") fails.push(ledgerError);
  else warns.push(`${ledgerError} [S3_SLOTS=warn: not refused; no slot claimed]`);
};
let slotDraft = null, holder = null, ledger = null, sourceSrc = null;
try {
  const ev = slots.evaluate({ role: opt.role, source: opt.source, chooser: opt.chooser, kind, agent: opt.agent, s4: s4On, root: ROOT });
  for (const f of ev.fails) {
    if (f.hard) fails.push(`${f.rule} ${f.msg} [refused in every slot mode]`);
    else sFails.push(`${f.rule} ${f.msg}`);
  }
  sourceSrc = ev.src;
  for (const w of ev.warns) warns.push(`S2 ${w}`);
  ledger = slots.inFlight({ events });
  const byRule = ledger.released.reduce((m, s) => ((m[s.releasedRule] = (m[s.releasedRule] ?? 0) + 1), m), {});
  info.push(`slots: ${ledger.agents} live, ${ledger.builders} builders (${ledger.stale.length} stale, ${ledger.released.length} released by events${ledger.released.length ? ": " + Object.entries(byRule).map(([k, v]) => `${v} ${k}`).join(", ") : ""}); mode ${slotMode}${s4On ? ", S4 on" : ", S4 off (F-28)"}`);
  for (const s of ledger.stale) warns.push(`S3 stale slot ${s.id} (${s.role}, ${s.source}, ${s.ageH.toFixed(1)} h${s.unreadable ? ", unreadable, aged by mtime" : ""}): not counted; release it if the agent is gone (node tools/lib/slots.mjs release ${s.id})`);
  if (ledger.agents + 1 > MAX_AGENTS && running + 1 <= MAX_AGENTS) sFails.push(`S3 slots: ${ledger.agents} live slots; this dispatch would make ${ledger.agents + 1} (limit ${MAX_AGENTS}); the event log and caller count say ${running}`);
  if (builds && ledger.builders + 1 > MAX_BUILDERS && builders + 1 <= MAX_BUILDERS) sFails.push(`S3 slots: ${ledger.builders} live builder slots; this dispatch would make ${ledger.builders + 1} (limit ${MAX_BUILDERS})`);
  slotDraft = { ...ev.slot, id: slots.slotId(ev.slot) };
  holder = ledger.live.find((s) => s.id === slotDraft.id) ?? null;
  if (holder) sFails.push(`S3 slot ${slotDraft.id} is already held (${holder.role}, ${holder.source}, since ${holder.ts}); a second dispatch of the same item needs its own --agent label`);
} catch (e) { ledgerFailed("reading the ledger", e); }
if (slotMode === "enforce") fails.push(...sFails);
else for (const f of sFails) warns.push(`${f} [S3_SLOTS=warn: not refused this round]`);

// ---- M1 mailbox source (F-42): the lane rule again, as a refusal in every slot mode
if (typeof opt.source === "string" && opt.source.startsWith("mail:")) {
  const id = opt.source.slice(5).trim();
  try {
    const m = mailbox.find(id);
    if (!m) fails.push(`M1 mailbox: no message ${id} in ${mailbox.baseDir()}`);
    else if (m.fm.kind !== "dispatch-request") fails.push(`M1 mailbox: ${id} is a ${m.fm.kind}, not a dispatch-request`);
    else if (m.role !== mailbox.DISPATCHER) fails.push(`M1 mailbox: ${id} is in the ${m.role} mailbox, not the dispatcher's`);
    else {
      // Reserve before launch (assessment 2026-10-17 finding 3): the drain reserved the request for one run; this
      // check passes only for that run (--run), while its lease is live and before it is launched.
      const r = mailbox.reservation(m);
      const run = opt.run === true ? undefined : opt.run;
      if (m.done) fails.push(`M1 mailbox: ${id} is already done`);
      else if (!r) fails.push(`M1 mailbox: ${id} is not reserved: run \`node tools/mailbox.mjs drain dispatcher\` first (it reserves the request before launch and prints --run)`);
      else if (r.state === "launched") fails.push(`M1 mailbox: ${id} is already claimed (launched by run ${r.run ?? "?"} at ${r.launchedAt ?? r.ts ?? "?"}, agent ${r.agent ?? "?"}): it was dispatched once`);
      else if (mailbox.leaseExpired(r)) fails.push(`M1 mailbox: ${id}'s reservation (run ${r.run}) expired at ${r.leaseUntil}: drain again`);
      else if (!run) fails.push(`M1 mailbox: ${id} is reserved by run ${r.run}: pass --run=${r.run} (the drain printed it)`);
      else if (run !== r.run) fails.push(`M1 mailbox: ${id} is reserved by run ${r.run}, not ${run}: another drain holds it`);
      else info.push(`mailbox: ${id} reserved by run ${r.run} until ${r.leaseUntil}; after the agent starts: node tools/mailbox.mjs launched ${id} --run=${r.run}`);
      if (opt.role !== m.fm.role) fails.push(`M1 mailbox: ${id} requests role ${m.fm.role}, not ${opt.role}`);
      if (opt.chooser && opt.chooser !== true && opt.chooser !== m.fm.from) fails.push(`M1 mailbox: --chooser=${opt.chooser} but ${id} is from ${m.fm.from}`);
      const text = [m.fm.title, m.fm.budget, m.fm["done-when"], m.fm["stop-if"], m.fm.project, m.fm.role, m.body].filter(Boolean).join("\n");
      const lc = mailbox.laneCheck({ from: m.fm.from, role: m.fm.role, lane: m.fm.lane, text }, { root: ROOT });
      for (const r of lc.reasons) fails.push(`M1 mailbox lane: ${r}`);
      if (m.fm["dispatch-kind"] && m.fm["dispatch-kind"] !== kind) warns.push(`M1 mailbox: ${id} asks for --kind=${m.fm["dispatch-kind"]}, this check is --kind=${kind}`);
      info.push(`mailbox: ${id} from ${m.fm.from}, lane ${m.fm.lane}, role ${m.fm.role}, project ${m.fm.project}; brief ${m.file}`);
    }
  } catch (e) { fails.push(`M1 mailbox: ${e.message}`); }
}

// ---- B1 budget (assessment 2026-10-17 §3; token-budget.md sections 4 and 6): a source that names a project
// ([project:<id>] on the batch item or header, or the mail request's project:) must pass `ledger.mjs gate` for it.
// The gate keeps the handbook's grace rules: lines never block, in-flight projects pass with a warning until their
// grandfatheredUntil, and an approved project fails only at 100% of budget (plus approved top-ups). A gate refusal
// FAILs in every slot mode; an exception reading the ledger or register is an S3 ledger error (follows the mode).
if (typeof opt.source === "string") {
  try {
    const sp = slots.sourceProjects(opt.source, { root: ROOT });
    if (sp.projects.length) {
      const L = await import("./lib/ledger.mjs");
      const reg = L.readRegister();
      const ledgerLines = L.readLedger();
      for (const id of sp.projects) {
        const g = L.gate(reg, id, { ledger: ledgerLines });
        const head = `B1 budget ${id}${g.budget != null ? ` (${L.fmt(g.spent)} of ${L.fmt(g.budget)})` : ""}`;
        if (!g.pass) fails.push(`${head}: ${g.reasons.join("; ")} (node tools/ledger.mjs gate --project=${id})`);
        else for (const r of g.reasons) warns.push(`${head}: ${r}`);
        if (g.pass) info.push(`budget: ${id} ${g.level}${g.budget != null ? ` (${L.fmt(g.spent)} of ${L.fmt(g.budget)})` : ""}, project named by the ${sp.from}`);
      }
    }
  } catch (e) { ledgerFailed("reading the token ledger for B1", e); }
}

// ---- possibly finished (r5-tools B2 c): counted runs older than 2 h with no live slot and no spool activity. They stay
// in the count (counting less is the unsafe direction); this names them and the command that closes each one.
const maybeDone = possiblyFinished(flight.open, { now: Date.now(), minH: 2, staleH: STALE_H, slotsLive: ledger?.live ?? [], spoolEvents: spool.events, closes: flight.closes, held: flight.held });
if (maybeDone.length) {
  warns.push(`possibly finished: ${maybeDone.length} counted dispatch(es) older than 2 h with no live slot and no hook activity. First run \`node tools/events.mjs backfill\` with no --since (a backfill window that skipped their reports is the usual cause: 9 of the 11 closed by hand at 2026-10-16T13:08Z); then close any still listed that you know finished:`);
  for (const p of maybeDone) warns.push(`possibly finished: ${p.run.label} (${ageText(p.ageMs)})${p.twin ? `; same batch item as open ${p.twin}` : ""}${p.twinReported ? `; same batch item as ${p.twinReported.label}, which reported at ${p.twinReported.ts} (${p.twinReported.id})` : ""}${p.heldReport ? `; a report naming this batch item (${p.heldReport.id}${p.heldReport.label ? `, "${p.heldReport.label}"` : ""}, ${p.heldReport.ts}) closed nothing because ${p.heldReport.runs.length} runs carry the item` : ""}\n         ${p.command}`);
}

// ---- C3 worktree
if (builds) {
  const wt = opt.worktree;
  if (!wt || wt === true) fails.push("C3 worktree: a build needs --worktree=<path> (isolation: worktree); builders never work in the main checkout");
  else {
    const abs = path.resolve(String(wt));
    let list = "";
    try { list = execFileSync("git", ["worktree", "list", "--porcelain"], { cwd: ROOT, encoding: "utf8" }); } catch {}
    const trees = list.split("\n").filter((l) => l.startsWith("worktree ")).map((l) => l.slice(9));
    if (abs === ROOT || abs === trees[0]) fails.push(`C3 worktree: ${abs} is the main checkout; the main tree's dev server is for evaluators only`);
    else if (!trees.includes(abs)) fails.push(`C3 worktree: ${abs} is not a git worktree of this repository (git worktree list)`);
  }
}

// ---- C4 host guard
const load1 = os.loadavg()[0], cpus = os.cpus().length;
let freeGB = Infinity;
try { const st = fs.statfsSync("/"); freeGB = (st.bavail * st.bsize) / 1e9; } catch {}
info.push(`host: load ${load1.toFixed(1)} on ${cpus} CPUs, ${freeGB.toFixed(1)} GB free on /`);
if (builds && load1 > 2 * cpus) fails.push(`C4 host load: ${load1.toFixed(1)} > ${2 * cpus} (2 x CPUs); wait for running builds to finish`);
if (builds && freeGB < 10) fails.push(`C4 disk: ${freeGB.toFixed(1)} GB free (< 10 GB); prune build dirs first (W-525)`);
else if (kind === "check" && freeGB < 5) fails.push(`C4 disk: ${freeGB.toFixed(1)} GB free (< 5 GB)`);
else if (freeGB < 15) warns.push(`disk: ${freeGB.toFixed(1)} GB free`);

// ---- R1 rituals
try {
  const { due } = await import("./rituals-due.mjs");
  const d = due();
  const blocking = d.filter((r) => r.due && ["wbr", "retro", "founder-digest"].includes(r.ritual));
  const other = d.filter((r) => r.due && !blocking.includes(r));
  if (builds) for (const r of blocking) fails.push(`R1 ritual overdue: ${r.ritual} (${r.reasons.join("; ")}); run it before new work`);
  else for (const r of blocking) warns.push(`ritual overdue: ${r.ritual}`);
  if (other.length) warns.push(`also due: ${other.map((r) => r.ritual).join(", ")}`);
} catch (e) { warns.push(`rituals-due failed: ${e.message}`); }

// ---- R2 incidents without a reviewed final COE that names them (W-715: by incident id; W-782: reviewers accept)
const recDir = process.env.S3_COE_DIR ? path.resolve(process.env.S3_COE_DIR) : path.join(ROOT, "company/rituals/records");
const { uncovered } = coeCoverage(events, recDir);
if (uncovered.length) {
  const first = uncovered[0];
  const msg = `R2 incidents: ${uncovered.length} SEV1/SEV2 incident(s) without a reviewed final COE naming their id (${uncovered.map((e) => e.id ?? "no id").join(", ")}), e.g. "${(first.summary ?? "").slice(0, 80)}"; ${uncovered.map((e) => `${e.id ?? "?"}: ${e.why}`).join("; ")}`;
  if (builds) fails.push(msg + "; the COE needs status: final, incident: <id> and reviewers: in its header, and verdict: accept from every reviewer (none the owner)"); else warns.push(msg);
}

// ---- I1 founder intake
const decDir = path.join(ROOT, "company/decisions");
const badIntake = [];
for (const f of fs.existsSync(decDir) ? fs.readdirSync(decDir) : []) {
  if (!/^\d{4}-\d{2}-\d{2}-.+\.md$/.test(f) || f.slice(0, 10) < INTAKE_FROM) continue;
  const t = fs.readFileSync(path.join(decDir, f), "utf8");
  if (!/founder/i.test(t.split("\n").slice(0, 8).join("\n"))) continue;
  const miss = [!/^class:/m.test(t) && "class:", !/^route:/m.test(t) && "route:", !/^## Objections/m.test(t) && "## Objections"].filter(Boolean);
  if (miss.length) badIntake.push(`${f} (missing ${miss.join(", ")})`);
}
if (badIntake.length) {
  const msg = `I1 founder intake: ${badIntake.join("; ")}; see company/decisions/_template-founder-intake.md`;
  if (kind === "wave") fails.push(msg); else warns.push(msg);
}

// ---- claim the slot (only when everything that refuses has passed, and a role is named)
let claimed = null;
if (ledgerError) { /* reported above; no slot */ }
else if (fails.length === 0 && !holder && opt["no-claim"] === undefined && slotDraft.role) {
  let c;
  try {
    if (ledger.released.some((s) => s.id === slotDraft.id)) slots.release(slotDraft.id); // its agent reported: the id is free
    c = slots.claim(slotDraft);
  } catch (e) { ledgerFailed("claiming the slot", e); c = null; }
  if (!c) { /* ledger error reported */ }
  else if (c.ok) { claimed = c.id; info.push(`slot claimed: ${c.file.startsWith(ROOT + path.sep) ? path.relative(ROOT, c.file) : c.file} (role ${slotDraft.role}, lane ${slotDraft.lane ?? "?"}, source ${slotDraft.source}, chooser ${slotDraft.chooser ?? "?"})${c.replaced ? `; replaced a stale slot from ${c.replaced.ts}` : ""}`); }
  else {
    const msg = `S3 slot ${c.id} was claimed by another dispatch at the same moment (${c.held?.ts ?? "?"})`;
    if (slotMode === "enforce") fails.push(msg); else warns.push(`${msg} [S3_SLOTS=warn: not refused this round]`);
  }
} else if (!slotDraft?.role && opt["no-claim"] === undefined) warns.push("no slot claimed: pass --role, --source and --chooser so the ledger records who runs and who chose");

// ---- report
const result = { kind, ok: fails.length === 0, fails, warns, info, slot: claimed, slotMode };
if (opt.json) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`${result.ok ? "OK  " : "FAIL"} dispatch-check --kind=${kind}`);
  for (const l of info) console.log(`  ${l}`);
  for (const l of fails) console.log(`  FAIL ${l}`);
  for (const l of warns) console.log(`  warn ${l}`);
}
process.exitCode = result.ok ? 0 : 1;
