#!/usr/bin/env node
// CLI over the prototype tools for live runs: state in live/state.json, one writer at a time (O_EXCL lock file).
// Every command loads the state, acts through lib.mjs, saves, and prints JSON. Time is real minutes.
//
//   node meta.mjs init [--spec=<built-in> | --spec-file=<json>]   a fresh live org and its flow (refuses if state exists);
//        --spec-file generates a company from a spec file, validated against the invariants (generator.mjs, M2)
//   node meta.mjs order new --to=<manager> --title=… --task=<T> --accept=… [--flow=<name>] [--slug=<kebab>] [--budget=200000] [--priority=now|next|later --due=<min>] [--after=O-1,O-2] [--ledger-project=<projects.json id>]
//        --accept-cmd='["node","<runner>","${workdir}"]': K26/B7, the argv of a stage `run: {argvFrom: "order"}` (refused in an agent session)
//        --slug: the order's ${slug} in packs, briefs and stage cmds (unset: its task; M4 run: LESSON-<slug> reached gates.mjs)
//        K19 --flow: one of the spec's flows (default the first); a chair flow (the ritual flow) takes --chair=<role>
//        --attendee=<role> instead of --to: the chair works its first stage, the attendee its check
//   node meta.mjs order new --flow=ritual --chair=<role> --attendee=<role> --title=… --task=<T> --accept=… [--slug=<kebab>]
//   node meta.mjs order delegate <O> --by=<manager> --to=<builder> [--budget=150000]
//   node meta.mjs order reopen <O> --by=<manager|founder> --findings=… [--reason=…]   a shipped order back to build
//   node meta.mjs order park <O> --by=<orderer|manager|founder> --reason=…   K8: stop it where it is (stage parked, messages
//        withdrawn, runs on it abandoned); order resume <O> --by --reason [--extra-loops=<n>] [--to=<stage>] puts it back at that stage (or an earlier one: M6 prep review)
//   node meta.mjs order cancel <O> --by=<orderer|manager|founder> --reason=…   K8: final; orders --after it stay blocked
//        K9: with a loop cap (spec maxLoops, lane policy maxLoops) the revise past it parks the order and asks the orderer
//   node meta.mjs queue <role|pool:level|role:id>             open work messages (K3: role:<id> holds a role signer's items)
//   node meta.mjs room enter --msg=<M> --role=<role> [--lease=30] [--as=<role> --mode=consult]
//   node meta.mjs room next --run=<R> --cap=<n> [--wait=<s>] --evidence=… [leave flags]   leave, then take the next item in the
//        same session; --wait keeps the session up to <s> seconds for the role's next item (benchmark 3: ~60k per new session)
//   node meta.mjs learn show [--last=50]   ·   learn propose --by=<retro role> [--retro=RETRO-n] --proposal='{"add":[…],"retire":[…],"sample":[…]}'
//        K28: the playbook's evidence and rules; a retro's proposal, validated change by change by code (learn.mjs)
//   node meta.mjs init --spec-file=<json> --vars='{"playbook_store":"/abs/dir"}'   K28: the spec's vars (learn.store)
//   node meta.mjs escape add --by=<role> --pattern=<regex> --why=… [--runs=a,b] | escape list   the company's known false
//        claims (escapes.json, kept across runs); every text order is checked against them
//   node meta.mjs room session-usage --session=<S> --tokens=<n>   the harness count for a whole agent process (supervisor)
//   node meta.mjs room wake-plan                              seconds until the next lease expiry: when to run recover
//   node meta.mjs flow metrics                                lead, work, critical path (--after), flow efficiency, cost
//   node meta.mjs room heartbeat --run=<R>
//   node meta.mjs room leave --run=<R> [--verdict=pass|revise [--to=<earlier stage>]] --evidence=<path> [--findings=…] [--learned=…] [--mistake=…]
//        K11: --to sends a revise back to that earlier stage instead of build (refused for the stage itself or a later one)
//        K12: a stage with a `post` cmd runs it first; a failure refuses the leave (exit 1, findings) and the run stays open,
//        unless it matches the post's `route`: then code's reading signs it (revise to that stage, or park with an ask)
//   node meta.mjs room abandon --run=<R> --by=<role> --reason=…   supervisor: end a bad run, sign nothing
//   node meta.mjs room recover                                expired leases → left-without-leave, order back in the queue
//   node meta.mjs room usage --run=<R> --tokens=<n>           the harness's token count for a run (supervisor only)
//   node meta.mjs flow advance <O> --stage=test1 --by=code    runs the builder's tests itself; signs pass or revise
//   node meta.mjs flow advance <O> --stage=<s> --by=<role> --evidence=… [--verdict=…] [--findings=…] [--to=<earlier stage>]
//   node meta.mjs flow show <O> | flow status
//   node meta.mjs mail dup <O> --by=<manager>                 send the current stage's notification again (managers only)
//   node meta.mjs batch --file=<ops.json>   [{cmd, sub?, arg?, args:{…}}, …] on one state, all or nothing; ${n.field} reads result n
//   node meta.mjs building plan|floor-propose|room-add|room-rename|room-retire|book|cancel …   floors, rooms, bookings (API.md §11)
//   node meta.mjs approval queue --approver=<role>  ·  approval decide --ids=… --by --decision=approve|deny --words --channel
//   node meta.mjs channel create|post|read|status|inbox …     channels, posts fanned out to members, acks
//   node meta.mjs item create|update|comment|link|show|search …  ·  project create  ·  cycle create  ·  board [filters]
//   node meta.mjs goal create|update|show|board|review …      goals: levels, contributes-to, RAG, code-measured criteria
//   node meta.mjs meeting open|position|read|reveal|round|board|object|decide|defer|close|show --id=<MTG> …
//   node meta.mjs ask raise|route|answer|summary …            leadership asks, routed to the lowest decider
//        K14: ask raise [--options='["A: …","B: …"]' | --options='A: …|B: …'] [--recommend=<one of them>]: what the founder inbox shows
//   node meta.mjs wbr open|close|page0 …  ·  goal-review --by  ·  digest --audience=founder|lane:<l>|company [--channel]
//   node meta.mjs help [<command>]                            these lines
//   node meta.mjs check --order=<O> [--test1]               run the order's test1 (tests or text checks) without signing: builders self-check
//        K26: at a stage with a `selftest` cmd it runs that (the worker's own check, as often as it likes); --test1 runs test1's
//   node meta.mjs usage add --role=<role> --tokens=<n> --label=…   harness usage of a session outside any room (the supervisor)
//   node meta.mjs usage correct --from-session=<S> --to-session=<S> --tokens=<n> --reason=…   append a correction (never edit)
//   node meta.mjs policy knobs | policy show --lane=<l>       the knobs a lane policy may set; the lane's versions
//   node meta.mjs policy propose --lane=<l> --by=<manager> --knobs='{…}' --reason=… --prediction=…
//   node meta.mjs policy activate --lane=<l> --version=<n> --by=<manager>   new orders pin it; orders in flight keep theirs
//   node meta.mjs manager report --lane=<l>   ·   manager cycle --lane=<l> --by=<manager> --belief=… --decision=keep|change [--version=<n>]
//   node meta.mjs contract templates   ·   contract open --by=<manager> --template=manager-onboarding [overrides]
//   node meta.mjs contract open --by=<manager> --kind=prototype|research|spike --goal=… --deliverable=… --budget=<n> --timebox=<min> [--onboarding='{…}']
//   node meta.mjs contract brief --id=<C>   ·   contract deliver --id=<C> --by=<ctr> --summary=… --path=live/contracts/<C>/… [--findings='[{claim,source,confidence}]']
//   node meta.mjs contract decide --id=<C> --by=<manager> --decision=accept|reject --reason=…   ·   contract show --id=<C>
//   node meta.mjs launch config --role=<r> [--msgs=M-1,…]   K10: the role's launch settings, its orders' workdirs and protected globs
//   node meta.mjs launch finished --launch=<L> --role=<r> --tokens=<n> [--cumulative=<n>] [--ok=false --reason=…] [--msgs=… --tasks=…]
//        the launcher's report; K13: the cumulative tokens are charged to the orders the launch touched (even split), and
//        an order at or over its budget gets no new session (room enter refuses; the supervisor asks kind:budget).
//        M5 review: the launcher's report only: refused in an agent session (as `guard denied`), and a launch id names its role
//        K26: --sdk-session=<id> records a warm role's Agent SDK session per order it worked; its next item resumes it
//   node meta.mjs launch resume-failed --launch=<L> --role=<r> --sdk-session=<id> --why=…   K26: the launcher fell back to a cold start
//   node meta.mjs guard denied --role=<r> --tool=<t> --rule=<rule> --why=… [--launch=<L>] [--detail=…]   K10: a guard denial (the launcher)
//   node meta.mjs events [--type=<t>]   ·   node meta.mjs memory <role>   ·   node meta.mjs org activity <role>
// Exit: 0 ok, 1 refused, 2 usage or state error.
import fs from "node:fs";
import path from "node:path";
import { Refused, flowMetrics, packHistory, isIndependent, isChairFlow } from "./lib.mjs";
import * as GEN from "./generator.mjs";
import * as WS from "./workspace.mjs";
import { proposePolicy, activatePolicy, managerReport, recordCycle, KNOBS } from "./policy.mjs";
import { engage, engageTemplate, briefFor, deliver, decideContract, TEMPLATES } from "./contractor.mjs";
import { absCmds, HERE, LIVE, STATE, LIVE_ROLES, TASK_FLOW, clock, make, rep, interpolate, save, load, withLock, runTests, runTest1, runCmdCheck, prepareCmd, validateChecks, describeChecks, mergeChecks, ESCAPES, readEscapes, sessionRole, briefVars, storeVars, orderArgvProblem } from "./state.mjs";
import * as B from "./building.mjs";
import * as CH from "./channels.mjs";
import * as T from "./tracker.mjs";
import * as G from "./goals.mjs";
import * as M from "./meetings.mjs";
import * as A from "./asks.mjs";
import * as JOBS from "./jobs.mjs";
import * as RIT from "./rituals.mjs";
import * as LEARN from "./learn.mjs";
export { LIVE_ROOMS, LIVE_ROLES, TASK_FLOW } from "./state.mjs";

const argv = process.argv.slice(2);
const opt = {}, pos = [];
for (const a of argv) { if (a.startsWith("--")) { const [k, ...v] = a.slice(2).split("="); opt[k] = v.length ? v.join("=") : true; } else pos.push(a); }
const out = (x) => console.log(absCmds(JSON.stringify(x, rep, 2))); // K10: kernel commands by absolute path under META_KERNEL_ABS
const need = (...ks) => { const miss = ks.filter((k) => opt[k] == null || opt[k] === true); if (miss.length) throw new Error(`missing ${miss.map((k) => `--${k}`).join(" ")}`); };


/** K12: room leave/next run the stage's post-check before taking the lock (withLock breaks a lock older than 30 s, and
 *  a QA stamp or diff guard can take longer); Rooms.leave uses the result only for this run, stage and loop, and runs
 *  the check itself under the lock when there is none (a batch, a state that changed in between). */
let prePost = null, preCheck = null; // preCheck: checkOutsideLock (M6 smoke)
// K12 review: no catch-all (a bug here fell back to the slow under-lock run in silence); a state that cannot load fails
// the same way under the lock; a leave advance refuses anyway runs nothing (Rooms.leave skips it the same way)
function postOutsideLock() {
  if (!fs.existsSync(STATE)) return null;
  const co = load(); const x = co.rooms.runs.get(opt.run); const o = x && co.engine.orders.get(x.order);
  if (!o || x.state !== "running" || o.stage !== x.stage || o.loops !== x.loops) return null;
  const sd = co.engine.flows.get(o.flow)?.stages.find((s) => s.stage === x.stage);
  if (!sd?.post || typeof opt.evidence !== "string") return null;
  if (co.engine.config.enforce && co.engine.refusesSign(o, x.stage, x.role, { evidence: opt.evidence, consult: x.consult })) return null;
  return { ...runCmdCheck(o, sd.post, { evidence: opt.evidence, verdict: opt.verdict ?? "pass", stage: x.stage }), run: x.run, stage: x.stage, loops: x.loops, outsideLock: true };
}

/** M6 smoke: `check --order` ran the builder's own node tests ("no *.test.mjs") while saying "the same check test1 will
 *  run", but a flow whose test1 has a spec `run` cmd (s3c: gates.mjs --stage=build) signs by that cmd (supervisor.mjs
 *  runCodeStage). This runs that cmd as runCodeStage would, before the lock (a gates run takes minutes; withLock would
 *  make every other writer fail meanwhile); the check itself records the self-check under the lock. Null: no such cmd. */
function checkOutsideLock() {
  if (!fs.existsSync(STATE) || typeof opt.order !== "string") return null;
  const co = load(); const o = co.engine.orders.get(opt.order);
  // K26: the stage the order is at names its worker's own self-check (`selftest`): that runs, as often as the worker
  // likes; it signs nothing (only hand-in triggers the stage). --test1 runs test1's cmd instead, as before K26
  const cur = o && co.engine.stageDef(o);
  if (cur?.selftest && !opt.test1) { const p = prepareCmd(o, cur.selftest); return { order: o.id, t: runCmdCheck(o, cur.selftest), argv: p.argv, cwd: p.cwd, kind: "selftest", stage: o.stage }; }
  const sd = o && co.engine.flows.get(o.flow)?.stages.find((s) => s.stage === "test1");
  if (!sd?.run) return null;
  const p = prepareCmd(o, sd);
  return { order: o.id, t: runCmdCheck(o, sd), argv: p.argv, cwd: p.cwd };
}

/** K5: why message `m`'s order may not be worked yet (its workspace is held or cannot be made), or null. */
const wsBlocker = (co, m) => (m && WS.specOf(co) ? WS.blocker(co, co.engine.orders.get(m.ref)) : null);
function pack(co, run, ctx, session, item) {
  const o = co.engine.orders.get(ctx.order);
  // Live run 2 findings: the workdir did not exist; the commands omitted the state prefix; cap and times were unclear.
  // K5: with a spec workspace the workdir is the order's git worktree (made by the supervisor's tick, or by the room
  // enter/next gate, wsBlocker); a git failure after that gate is reported in the pack: the run is already entered
  const ws = WS.ensure(co, o);
  const dir = ws ? ws.workdir ?? WS.dirFor(WS.specOf(co), o) ?? path.join(WS.specOf(co).root, o.task) : path.join(LIVE, "work", o.task);
  if (co.engine.isWorkStage(o, ctx.stage) && !ws) fs.mkdirSync(dir, { recursive: true }); // K25: any stage the builder works (draft too)
  const vars = { ...(o.workspace?.vars ?? {}), ...briefVars(o), ...storeVars(o), workdir: dir, task: o.task ?? "", slug: o.slug ?? o.task ?? "" }; // K5 audit: ${run} ${n} ${port} too, as briefs and cmds; M6 prep: ${brief_file}
  // Benchmark 1 finding (writer-1): the prefix dropped META_LIVE_DIR, so a copied command wrote to the wrong state
  const pre = [process.env.META_LIVE_DIR && `META_LIVE_DIR=${process.env.META_LIVE_DIR}`, process.env.META_STATE && `META_STATE=${process.env.META_STATE}`].filter(Boolean).map((x) => x + " ").join("");
  const iso = (m) => new Date(m * 60000).toISOString();
  // K6: the stage's pack rules. history:false leaves out the order's findings, its history and this role's memory of
  // the order (stage 6: the learner reads the artifact before the account); include/exclude name the files it reads
  const sd = co.engine.flows.get(o.flow)?.stages.find((x) => x.stage === ctx.stage);
  const hist = packHistory(sd), pf = WS.packFiles(dir, sd?.pack, vars);
  const mem = hist ? ctx.memory : ctx.memory.filter((e) => !String(e.did ?? "").includes(` on ${o.id}:`));
  const k6 = { ...(hist ? {} : { history_withheld: "this stage judges the artifact before the account: no prior findings, build history or notes on this order; do not look them up (flow show, item show, events, build notes)" }), ...(pf ? { files: pf.files, files_truncated: pf.truncated, read_only: pf.include.length ? pf.include : null, never_read: pf.exclude } : {}) };
  return { run, session, item, lease_min: Number(opt.lease ?? 30), order: o.id, task: o.task, title: o.title, priority: o.priority, stage: ctx.stage, accept: ws ? interpolate(o.accept ?? "", vars) : o.accept, workdir: dir + "/", workdir_exists: fs.existsSync(dir), ...(ws ? (ws.error ? { workspace_error: ws.error } : { branch: o.workspace.branch, base_sha: o.workspace.sha, env: o.workspace.env, run_meta_from: HERE }) : {}), findings: hist ? o.findings ?? null : null, memory: mem.map((e) => ({ ...e, t: iso(e.t) })), history: hist ? o.history.map((h) => ({ ...h, t: iso(h.t) })) : [], ...k6,
    // K24: the stages' kept copies in the run's artifact store (each stage's newest, by name; ${artifacts} in the pack rules)
    ...(Object.keys(o.artifacts ?? {}).length ? { artifacts: { latest: vars.artifacts, stages: Object.fromEntries(Object.entries(o.artifacts).map(([k, v]) => [k, v.dir])) } } : {}),
    ...(sd?.post ? { post_check: `your leave first runs: ${sd.post.argv.join(" ")} (code's check of this stage; a failure refuses the leave, prints its findings and keeps this run open to fix)` } : {}), // K12
    // K28: the rules the company learned from earlier orders' outcomes (validated and scored by code), for the learn roles
    ...((() => { const rules = LEARN.activeRules(co, co.rooms.runs.get(run)?.role); return rules.length ? { playbook: rules, playbook_means: "rules learned from earlier orders' outcomes (code validated and scores them): follow them where they apply; the accept criteria and the stage's own rules come first" } : {}; })()),
    ...(sd?.selftest ? { self_check: absCmds(`${pre}node meta.mjs check --order=${o.id}   runs ${sd.selftest.argv.join(" ")} in the workdir; as often as you like, it signs nothing`) } : {}), // K26
    cap_means: "--cap counts every item in this session, including the first one you entered",
    ...((co.org.role(co.rooms.runs.get(run)?.role)?.waitSec ?? 90) > 90 ? { wait_means: `room next blocks up to ${co.org.role(co.rooms.runs.get(run)?.role).waitSec} s for your next item: run it with a Bash timeout of at least ${(co.org.role(co.rooms.runs.get(run)?.role).waitSec + 60) * 1000} ms, or the call is cut off before the item arrives` } : {}),
    // K4 audit: every independent (reviewing) stage hands in a verdict, not only check (stage 6/7: next_with had no revise)
    leave_with: absCmds(`${pre}node meta.mjs room leave --run=${run} --evidence=<path>${isIndependent(sd) ? " --verdict=pass|revise --findings='…'" : ""} --learned='…'`),
    // M6 prep: a reviewer's session waits longer for its next item (spec role waitSec), so one session drains the
    // orders three parallel builders finish minutes apart (M4: reviewers were 46% of spend, each a session start-up)
    next_with: absCmds(`${pre}node meta.mjs room next --run=${run} --cap=<cap from your brief> --wait=${co.org.role(co.rooms.runs.get(run)?.role)?.waitSec ?? 90} --evidence=<path>${isIndependent(sd) ? " --verdict=pass|revise --findings='…'" : ""} --learned='…'`) };
}

let me = null; // the agent session's role (main), or null: a person or code at a terminal

function main() {
  const [cmd, sub, arg] = pos;
  // M4 integrate (K8+K9 review): in an agent session (the launcher's META_ROLE, state.mjs sessionRole) every --by and
  // --role is that session's role: a builder could otherwise resume its own capped order --by=founder, or as its manager
  me = sessionRole();
  if (me != null) for (const k of ["by", "role"]) if (opt[k] != null && opt[k] !== me) throw new Refused(`--${k}=${opt[k] === true ? "" : opt[k]} is not this agent session's role (${me}): an agent acts only as itself (a person decides as the founder outside any agent session)`);
  // benchmark 2 (writer-1): with no command or `help` the CLI printed only an error; the usage is this file's header
  if (!cmd || cmd === "help") return fs.readFileSync(new URL(import.meta.url), "utf8").split("\n").filter((l) => l.startsWith("//   node ")).map((l) => l.slice(5)).filter((l) => !sub || l.includes(` ${sub}`));
  if (cmd === "init") return withLock(() => {
    if (fs.existsSync(STATE)) throw new Error("state exists; refusing to overwrite");
    // M2: --spec-file=<json> generates a company from a spec file, validated first
    let def = null, name = opt.spec ?? "toy";
    if (opt["spec-file"]) {
      def = JSON.parse(fs.readFileSync(opt["spec-file"], "utf8"));
      const v = GEN.validateSpec(def);
      if (v.length) throw new Refused(`spec ${opt["spec-file"]} breaks ${v.length} invariant(s): ${v.join("; ")}`);
      name = def.name ?? path.basename(opt["spec-file"], ".json");
    }
    const co = make(name, def);
    co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
    // K28: the spec's vars (init --vars='{"name":"value"}' overrides them), e.g. learn.store's ${playbook_store}
    let vars = { ...(co.spec.vars ?? {}) };
    if (opt.vars != null) { let o2; try { o2 = JSON.parse(String(opt.vars)); } catch { o2 = null; } const e = o2 && LEARN.varsProblems(o2); if (!o2 || e.length) throw new Refused(`--vars is a JSON object of lower_snake names to strings${e?.length ? `: ${e.join("; ")}` : ""}`); vars = { ...vars, ...o2 }; }
    if (Object.keys(vars).length) co.data.vars = vars;
    // K19: every flow of the spec (the legacy `flow`, then `flows`), each defined and approved as the one flow was
    const keys = GEN.specFlows(co.spec).map((f) => {
      const k = co.engine.define(f.name, { stages: f.stages }, { by: "cos" });
      co.engine.approveDef(k, { by: "founder", words: "Approve the task flow for the Meta sandbox (founder: Decide for me, 2026-10-21)" });
      return k;
    });
    const key = keys[0];
    // K28: the playbook store (outside the live dir), this run's id, the sample knobs earlier runs set (inside bounds)
    const learned = co.spec.learn ? LEARN.initLearn(co, { vars, live: LIVE }) : null;
    // M6 prep: the spec's lane policies (policy.lanes: the M6 lanes' maxSessions) as each lane's first version, proposed
    // and activated by its manager, so the lane runs under them from the first order (policy.mjs pins it per order)
    for (const [lane, v] of Object.entries(co.spec.policy?.lanes ?? {})) {
      const poc = co.org.lanePOC(lane)?.id;
      const pv = proposePolicy(co.engine, { lane, by: poc, knobs: v.knobs, reason: `spec ${name}: ${v.reason}`, prediction: v.prediction });
      activatePolicy(co.engine, { lane, version: pv.version, by: poc });
    }
    if (def) {
      co.writeFile = (rel, text) => { const f = path.join(LIVE, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); };
      for (const c of def.channels ?? []) CH.createChannel(co, { by: "cos", id: c.id, kind: c.kind, members: c.members ?? [], title: c.title ?? "" });
      if (def.rules?.length) co.data.rules = def.rules.map((r) => ({ ...r, source: `spec ${name}` }));
      co.writeFile("ORG.md", GEN.orgDoc(def, name));
      if (def.context) co.writeFile("CONTEXT.md", def.context + "\n");
    }
    save(co);
    return { ok: true, spec: co.data.spec, generated: !!def, flow: key, ...(learned ? { learn: { store: learned.store, run: learned.run } } : {}), ...(keys.length > 1 ? { flows: keys } : {}), roles: co.spec.roles.map((r) => r.id), files: def ? ["ORG.md", ...(def.context ? ["CONTEXT.md"] : [])] : [] };
  });
  if (cmd === "batch") return withLock(() => {
    // Benchmark 1: set-up took 15 separate commands. A batch runs a list of commands on one state, all or nothing:
    // any refusal saves nothing. `${n.path}` in an argument is replaced by a field of the n-th result (0-based).
    need("file");
    const ops = JSON.parse(fs.readFileSync(opt.file, "utf8"));
    const co = load();
    const results = [];
    const sub$ = (v) => typeof v === "string" ? v.replace(/\$\{(\d+)\.([\w.]+)\}/g, (_, n, f) => { let x = results[Number(n)]; for (const k of f.split(".")) x = x?.[k]; if (x == null) throw new Error(`batch: \${${n}.${f}} is empty`); return String(x); }) : v;
    for (const [i, op] of ops.entries()) {
      for (const k of Object.keys(opt)) delete opt[k];
      try {
        for (const [k, v] of Object.entries(op.args ?? {})) opt[k] = typeof v === "object" && v !== null ? JSON.stringify(v) : sub$(String(v));
        results.push(dispatch(co, op.cmd, op.sub, sub$(op.arg)));
      }
      catch (e) { e.message = `batch op ${i} (${op.cmd} ${op.sub ?? ""}): ${e.message}; nothing saved`; throw e; }
    }
    save(co);
    return { ok: true, ops: ops.length, results };
  });
  const readOnly = ["queue", "events", "memory"].includes(cmd) || (cmd === "launch" && sub === "config") || (cmd === "learn" && sub === "show") || (cmd === "flow" && ["show", "status"].includes(sub)) || (cmd === "org" && sub !== "propose") || (cmd === "building" && sub === "plan") || (cmd === "item" && ["show", "search"].includes(sub)) || (cmd === "goal" && ["show", "board"].includes(sub)) || (cmd === "ask" && ["route", "summary"].includes(sub)) || (cmd === "channel" && ["status", "inbox"].includes(sub)) || (cmd === "meeting" && sub === "show") || (cmd === "wbr" && sub === "page0");
  const act = () => {
    const co = load();
    const before = co.log.events.length;
    try {
      const r = dispatch(co, cmd, sub, arg);
      if (!readOnly) save(co);
      return r;
    } catch (e) {
      // A refusal is an event too (live run 1 lost every refusal by not saving on error). HARD refusals get one here.
      if (e.refused && !readOnly) {
        // a refused command changes nothing but the record of its refusal (benchmark 2: a refused meeting decide left
        // the tracker action it had already created): reload, then append only the refusal events
        const refusals = co.log.events.slice(before).filter((x) => x.type === "refuse");
        const clean = load();
        if (refusals.length) for (const r of refusals) { const { seq, t, ...rest } = r; clean.log.add(rest); }
        else clean.log.add({ type: "refuse", rule: "hard", msg: e.message, argv: argv.join(" ") });
        save(clean);
      }
      throw e;
    }
  };
  if (cmd === "room" && ["leave", "next"].includes(sub) && typeof opt.run === "string") prePost = postOutsideLock();
  if (cmd === "check") preCheck = checkOutsideLock();
  const r = readOnly ? act() : withLock(act);
  // room next --wait: the hand-in is saved; poll (outside the lock) until the role's next item or the end of the wait
  if (cmd === "room" && sub === "next" && r?.waiting) {
    for (;;) {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 2000);
      // the pack is made under the lock and saved (K5 review: a worktree made by it, and its event, were lost)
      const w = withLock(() => {
        const co = load(); const x = co.rooms.resume(r.waiting, { leaseMin: Number(opt.lease ?? 30), filter: (m) => !wsBlocker(co, m) && !co.rooms.reservedElsewhere(m.id, r.waiting) });
        if (x.waiting) return { x };
        const p = x.next ? pack(co, x.next.run, x.next.ctx, x.next.session, x.next.item) : null;
        save(co); return { x, p };
      });
      if (w.x.waiting) continue;
      if (w.p) return { left: r.left, waited: true, ...w.p };
      return { left: r.left, session_closed: r.waiting, reason: w.x.reason, note: "your session is over: stop now" };
    }
  }
  return r;
}

function dispatch(co, cmd, sub, arg) {
  const { engine, rooms, mailbox, org, log } = co;
  if (cmd === "order" && sub === "new") {
    // K19: --flow names one of the spec's flows (default: the first); a chair flow's order (the ritual flow) names its
    // --chair and --attendee instead of a manager (--to)
    const flow = opt.flow != null ? String(opt.flow) : GEN.defaultFlow(co.spec)?.name ?? "task";
    if (!engine.active.get(flow)) throw new Refused(`no active flow ${flow} (this company's: ${[...engine.active.keys()].join(", ")})`);
    const chairFlow = isChairFlow(engine.flows.get(engine.active.get(flow)));
    need(...(chairFlow ? ["chair", "attendee"] : ["to"]), "title", "task", "accept");
    if (chairFlow && opt.to != null) throw new Refused(`flow ${flow} orders name a chair and an attendee, not a manager (--to)`);
    // K24 review: the task names the order's workdir (live/work/<task>, or its worktree) and fills ${task} in artifact
    // paths: '../../x' read and wrote outside both. One plain name, as workspace.mjs ensure already asks of a worktree
    if (!/^[\w.-]+$/.test(String(opt.task)) || /^\.+$/.test(String(opt.task))) throw new Refused("--task is one plain name (A-Z a-z 0-9 _ . -, not . or ..): it names the order's workdir");
    const o = engine.orderNew({ flow, by: opt.by ?? "cos", to: chairFlow ? null : opt.to, chair: opt.chair ?? null, attendee: opt.attendee ?? null, budget: Number(opt.budget ?? 200_000), accept: opt.accept, title: opt.title, priority: opt.priority ?? "next", dueMin: opt.due ? Number(opt.due) : null, after: opt.after ? String(opt.after).split(",") : [], fromContract: opt["from-contract"] ?? null });
    o.task = opt.task;
    // M4 run (M4-RUN.md, the one operator fix): with no --slug, ${slug} fell back to the task (LESSON-<slug>), and every
    // test1 stage-errored on gates.mjs's usage check. The slug is a company lesson slug: kebab-case, as brief.mjs reads it
    if (opt.slug != null) { if (typeof opt.slug !== "string" || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(opt.slug)) throw new Refused("--slug is a lesson slug (kebab-case: a-z, 0-9 and single hyphens)"); o.slug = opt.slug; }
    if (opt.project) o.project = opt.project; // mirrored onto its tracker item, so the roadmap counts it
    // M5 review: the company projects.json line the order is charged to: ${ledger_project} in a stage cmd (ledger-gate.mjs
    // gates it), and the founder inbox's `budget` on its budget asks (adapters/s3c/inbox-export.mjs)
    if (opt["ledger-project"] != null) { if (typeof opt["ledger-project"] !== "string" || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(opt["ledger-project"])) throw new Refused("--ledger-project is a projects.json id (kebab-case)"); o.ledgerProject = opt["ledger-project"]; }
    if (opt.goal) o.goal = opt.goal;
    // K26/B7: the acceptance cmd a stage `run: {argvFrom: "order"}` runs (the hidden-test runner): the orderer's, never
    // an agent's (a cmd code runs is never agent text, K1), so it is refused in an agent session
    if (opt["accept-cmd"] != null) {
      if (me != null) throw new Refused(`--accept-cmd is the orderer's (a program code runs): refused in an agent session (${me})`);
      let a; try { a = JSON.parse(String(opt["accept-cmd"])); } catch { a = null; }
      const e = orderArgvProblem(a); if (e) throw new Refused(e);
      o.acceptCmd = a;
    }
    if (opt.checks) { o.checks = JSON.parse(opt.checks); const e = validateChecks(o.checks); if (e) throw new Refused(`HARD: ${e}`); } // test1 by declared checks (non-code work)
    M.applyStandingRules(co, o); // decisions made before this order was placed
    // the company's known false claims travel to every text order (benchmark 3: room memory is per run, so an escape
    // found by one run's fact-check reached the next run unchanged)
    const kf = readEscapes();
    if (o.checks && kf.length) { o.checks = mergeChecks(o.checks, { knownFalse: kf.map(({ pattern, why }) => ({ pattern, why })) }); log.add({ type: "rule-applied", order: o.id, task: o.task, source: "escapes", keys: ["knownFalse"] }); }
    return { order: o.id, stage: o.stage, priority: o.priority, after: o.after, blocked: o.blocked, ...(o.slug ? { slug: o.slug } : {}) };
  }
  if (cmd === "order" && sub === "reopen") {
    need("by", "findings");
    const o = engine.orders.get(arg);
    if (!o) throw new Refused(`no order ${arg}`);
    if (opt.by !== o.manager && opt.by !== "founder") throw new Refused(`${opt.by} may not reopen ${arg}: its manager (${o.manager}) or the founder may`);
    const r = engine.reopen(arg, { by: opt.by, findings: opt.findings, reason: opt.reason ?? "changed requirement" });
    return { order: r.id, stage: r.stage, loops: r.loops };
  }
  // K8: park, resume and cancel are the order's owners' acts (its orderer, its manager, or the founder), as reopen
  if (cmd === "order" && ["park", "resume", "cancel"].includes(sub)) {
    need("by", "reason");
    const o = engine.orders.get(arg);
    if (!o) throw new Refused(`no order ${arg}`);
    const ask = o.parked?.ask ?? null;
    // K8+K9 review: an orderer the decision route cannot reach (a peer manager, a builder) has its park ask routed to the
    // manager's report (cos), who must then be able to decide it; the router's choice, not the (editable) assignee
    const askee = ask && sub !== "park" ? A.parkDecider(co, ask) : null;
    if (![o.orderer, o.manager, "founder", askee].filter(Boolean).includes(opt.by)) throw new Refused(`${opt.by} may not ${sub} ${arg}: its orderer (${o.orderer}), its manager (${o.manager})${askee ? `, its park ask's decider (${askee})` : ""} or the founder may`);
    if (sub !== "resume") for (const x of rooms.runs.values()) if (x.state === "running" && x.order === o.id) rooms.abandon(x.run, { by: opt.by, reason: `order ${sub === "park" ? "parked" : "cancelled"}: ${opt.reason}` });
    if (sub === "park") engine.park(arg, { by: opt.by, reason: opt.reason });
    if (sub === "cancel") engine.cancel(arg, { by: opt.by, reason: opt.reason });
    if (sub !== "resume") JOBS.staleFor(co, o, `order ${o.stage}`); // K8+K9 review: its K2 job is killed now, not at the next collect
    if (sub === "resume") engine.resume(arg, { by: opt.by, reason: opt.reason, extraLoops: opt["extra-loops"] != null ? Number(opt["extra-loops"]) : null, to: opt.to != null ? String(opt.to) : null });
    const closed = sub !== "park" ? A.closeParkAsk(co, ask, { by: opt.by, decision: sub === "resume" ? "yes" : "no", text: `${sub === "resume" ? `resumed at ${o.stage}` : "cancelled"}: ${opt.reason}` }) : null;
    if (sub === "cancel") A.closeBudgetAsk(co, o, { by: opt.by, text: `${o.id} cancelled: ${opt.reason}` }); // M5 review: no top-up of a cancelled order
    T.syncOrders(co);
    return { order: o.id, stage: o.stage, loops: o.loops, maxLoops: engine.maxLoopsOf(o, engine.workStages(o).length > 1 ? engine.familyOf(o, o.parked?.stage ?? o.stage) : null), ...(o.parked ? { parked_from: o.parked.stage } : {}), ...(closed ? { ask_closed: closed.id } : {}) };
  }
  if (cmd === "order" && sub === "delegate") {
    need("by", "to");
    const o = engine.delegate(arg, { by: opt.by, to: opt.to, budget: Number(opt.budget ?? 150_000) });
    return { order: o.id, builder: o.builder, messages: mailbox.thread(o.id).map((m) => m.id) };
  }
  if (cmd === "queue") return mailbox.queue(sub, "work").map((m) => ({ msg: m.id, order: m.ref, stage: m.body.stage, loop: m.body.loops, priority: m.priority, title: engine.orders.get(m.ref).title }));
  if (cmd === "room" && sub === "enter") {
    need("msg", "role");
    // K5 review: a workspace failure held the order only in tick, and `room enter` went ahead with no worktree. A
    // refusal would drop the hold (a refused command saves only its refusal), so this saves it and exits 1
    const held = wsBlocker(co, mailbox.msgs.get(opt.msg));
    if (held) { process.exitCode = 1; return { refused: `order ${mailbox.msgs.get(opt.msg).ref} is held: ${held}`, note: "do not start this item: the supervisor retries it (node supervisor.mjs retry --order=<O>)" }; }
    // M5: a stage's pre-check runs before anyone enters it; a lane at its policy's session cap starts no new session
    { const po = engine.orders.get(mailbox.msgs.get(opt.msg)?.ref); if (po && engine.preDue(po)) engine.guard(false, "pre-check", `${po.id} at ${po.stage}: its pre-check has not run yet (the supervisor runs it before any session; a park asks its orderer)`, { order: po.id, by: opt.role }); }
    rooms.checkLaneCap(opt.as ?? opt.role, org.role(engine.orders.get(mailbox.msgs.get(opt.msg)?.ref)?.manager)?.lane ?? null);
    // K13: no new session on an order at or over its charged budget (the planner plans none; this is the backstop)
    { const bo = engine.orders.get(mailbox.msgs.get(opt.msg)?.ref); if (bo && engine.overBudget(bo)) engine.guard(false, "budget", `${bo.id} has spent ${bo.spent} of its ${bo.budget}-token budget: no session until its budget ask${bo.budgetHold?.ask ? ` (${bo.budgetHold.ask})` : ""} is approved`, { order: bo.id, by: opt.role }); }
    const { run, ctx, session, item } = rooms.enter({ msg: opt.msg, role: opt.role, as: opt.as ?? null, mode: opt.mode ?? "work", leaseMin: Number(opt.lease ?? 30) });
    // the launcher (M3) names each agent process; its usage and its crash are then this session's, exactly
    const s = rooms.sessions.get(session);
    if (process.env.META_LAUNCH && s.launch == null) s.launch = process.env.META_LAUNCH;
    return pack(co, run, ctx, session, item);
  }
  if (cmd === "room" && sub === "next") {
    need("run", "evidence");
    const r = rooms.next(opt.run, { verdict: opt.verdict ?? "pass", evidence: opt.evidence, findings: opt.findings ?? null, learned: opt.learned ?? null, mistake: opt.mistake ?? null, post: prePost, to: opt.to ?? null }, { cap: Number(opt.cap ?? 3), leaseMin: Number(opt.lease ?? 30), waitMin: Number(opt.wait ?? 0) / 60, filter: (m) => !wsBlocker(co, m) && !rooms.reservedElsewhere(m.id, rooms.runs.get(opt.run)?.session) });
    const left = r.left ? { order: r.left.id, next_stage: r.left.stage, loops: r.left.loops } : { stale: true };
    if (r.waiting) return { left, waiting: r.waiting.id };
    if (!r.next) return { left, session_closed: r.closed?.id ?? true, reason: r.closed ? (r.closed.items >= Number(opt.cap ?? 3) ? "cap reached" : "queue empty") : "closed", note: "your session is over: stop now" };
    return { left, ...pack(co, r.next.run, r.next.ctx, r.next.session, r.next.item) };
  }
  if (cmd === "room" && sub === "session-usage") { need("session", "tokens"); rooms.recordSessionUsage(opt.session, Number(opt.tokens)); return { ok: true }; }
  if (cmd === "room" && sub === "wake-plan") { const t = mailbox.nextExpiry(); return { next_expiry_in_s: t == null ? null : Math.max(0, Math.round((t - clock.now()) * 60)) }; }
  if (cmd === "check") { need("order"); const o = engine.orders.get(opt.order); if (!o) throw new Refused(`no order ${opt.order}`);
    const pc = preCheck?.order === o.id ? preCheck : null, t = pc ? pc.t : runTest1(o); // M6 smoke: the flow's test1 cmd first
    // every self-check is a record (org evaluation, ISS-2): a failed one is a defect code caught before hand-in
    const by = [...rooms.runs.values()].find((r) => r.state === "running" && r.order === o.id)?.role ?? opt.by ?? null;
    log.add({ type: "self-check", order: o.id, task: o.task, by, stage: o.stage, pass: t.pass, output: String(t.output).slice(0, 400), ...(pc?.kind ? { kind: pc.kind } : {}) });
    if (pc?.kind === "selftest") return { order: o.id, task: o.task, pass: !!t.pass, stageError: !!t.stageError, output: t.output, findings: t.findings ?? null, rules: [`the ${pc.stage} stage's selftest (spec)`], cmd: pc.argv, cwd: pc.cwd, note: "your own check: run it as often as you like; nothing is signed, only your hand-in starts the next stage (--test1 runs test1's check)" };
    if (pc) return { order: o.id, task: o.task, slug: o.slug ?? o.task, pass: !!t.pass, stageError: !!t.stageError, output: t.output, findings: t.findings ?? null, route: t.route ?? null, rules: ["the flow's test1 cmd (spec run)"], cmd: pc.argv, cwd: pc.cwd, note: "the same cmd test1 will run, in the same worktree; nothing is signed" };
    return { order: o.id, task: o.task, pass: t.pass, output: t.output, rules: o.checks ? describeChecks(o.checks) : ["the builder's own tests (node --test)"], note: "the same check test1 will run; nothing is signed" }; }
  if (cmd === "flow" && sub === "metrics") { const m = flowMetrics(log, engine.orders); const r1 = (x) => Math.round(x * 100) / 100; return { ...m, orders: m.orders.map((o) => ({ ...o, lead_min: r1(o.lead), work_min: r1(o.work), critical_min: r1(o.critical), flowEfficiency: r1(o.flowEfficiency) })) }; }
  if (cmd === "room" && sub === "heartbeat") { need("run"); rooms.heartbeat(opt.run, { leaseMin: 30 }); return { ok: true }; }
  if (cmd === "room" && sub === "leave") {
    need("run", "evidence");
    // K7 review: `commit` is this leave's own commit; the head before tells it from an earlier stage's (null: nothing changed)
    const was = engine.orders.get(rooms.runs.get(opt.run)?.order)?.workspace?.head ?? null;
    const o = rooms.leave(opt.run, { verdict: opt.verdict ?? "pass", evidence: opt.evidence, findings: opt.findings ?? null, learned: opt.learned ?? null, mistake: opt.mistake ?? null, post: prePost, to: opt.to ?? null });
    // K7: the stage's commit (code's, in the order's worktree), or why it was refused and the order held
    return o ? { order: o.id, next_stage: o.stage, loops: o.loops, ...(WS.commitOf(WS.specOf(co)) && o.workspace?.dir ? { commit: o.workspace.head && o.workspace.head !== was ? o.workspace.head : null } : {}), ...(o.stageError?.kind === "workspace" ? { held: o.stageError.why } : {}) } : { stale: true, note: "the stage moved on while you worked; nothing was signed" };
  }
  if (cmd === "room" && sub === "abandon") { need("run", "by", "reason"); rooms.abandon(opt.run, { by: opt.by, reason: opt.reason }); return { ok: true }; }
  if (cmd === "room" && sub === "recover") return rooms.recover().map((x) => ({ run: x.run, role: x.role, order: x.order, msg: x.msg }));
  if (cmd === "room" && sub === "usage") { need("run", "tokens"); rooms.recordUsage(opt.run, Number(opt.tokens)); return { ok: true }; }
  if (cmd === "flow" && sub === "advance") {
    need("stage", "by");
    const o = engine.orders.get(arg);
    if (opt.stage === "test1" && opt.by === "code") {
      if (!o || o.stage !== "test1") throw new Refused(`HARD: ${arg} is not at test1`);
      const t = runTest1(o);
      engine.advance(arg, { stage: "test1", by: "code", verdict: t.pass ? "pass" : "revise", findings: t.pass ? null : t.output });
      return { order: arg, test1: t.pass ? "pass" : "revise", output: t.output, next_stage: o.stage };
    }
    engine.advance(arg, { stage: opt.stage, by: opt.by, evidence: opt.evidence ?? null, verdict: opt.verdict ?? "pass", findings: opt.findings ?? null, to: opt.to ?? null });
    return { order: arg, next_stage: o.stage, loops: o.loops };
  }
  if (cmd === "flow" && sub === "show") { const o = engine.orders.get(arg); return { ...o, messages: mailbox.thread(arg).map((m) => ({ id: m.id, stage: m.body?.stage, state: m.state, lease: m.lease })) }; }
  if (cmd === "flow" && sub === "status") return engine.status();
  // a resend is a manager's act, recorded with who did it (benchmark 4's F3 test: a checker resent its own lost
  // message with an unguarded `mail dup`; the watchdog does it by code)
  if (cmd === "mail" && sub === "dup") { need("by"); const o = engine.orders.get(arg); if (!o) throw new Refused(`no order ${arg}`);
    const lvl = org.role(opt.by)?.level; if (!["founder", "chief-of-staff", "manager"].includes(lvl)) throw new Refused(`${opt.by} may not resend work: a manager, the chief of staff or the founder may (the supervisor's watchdog resends lost messages by itself)`);
    log.add({ type: "mail-dup", order: arg, by: opt.by }); const m = engine.notifyStage(o, { duplicate: true }); return { order: arg, msg: m?.id, open_work_messages: mailbox.thread(arg).filter((x) => x.kind === "work" && x.state === "open").length }; }
  if (cmd === "usage" && sub === "add") { need("role", "tokens", "label"); log.add({ type: "usage", role: opt.role, tokens: Number(opt.tokens), label: opt.label, source: "harness", supervisor: true }); return { ok: true }; }
  if (cmd === "usage" && sub === "correct") {
    // The log is append-only: a wrong usage record is corrected by two new events, never by editing the old one.
    need("from-session", "to-session", "tokens", "reason");
    const n = Number(opt.tokens);
    const from = rooms.sessions.get(opt["from-session"]), to = rooms.sessions.get(opt["to-session"]);
    if (!from || !to) throw new Refused("HARD: unknown session");
    log.add({ type: "usage", session: from.id, role: from.role, tokens: -n, correction: true, reason: opt.reason });
    log.add({ type: "usage", session: to.id, role: to.role, tokens: n, items: to.items, source: "harness", correction: true, reason: opt.reason });
    return { ok: true, moved: n, from: from.id, to: to.id };
  }
  // ---- the manager's code: lane policy, and the cycle that changes it
  if (cmd === "policy" && sub === "knobs") return KNOBS;
  if (cmd === "policy" && sub === "show") { need("lane"); return engine.policies.get(opt.lane) ?? { versions: [], active: null }; }
  if (cmd === "policy" && sub === "propose") {
    need("lane", "by", "knobs", "reason", "prediction");
    return proposePolicy(engine, { lane: opt.lane, by: opt.by, knobs: JSON.parse(opt.knobs), reason: opt.reason, prediction: opt.prediction });
  }
  if (cmd === "policy" && sub === "activate") { need("lane", "version", "by"); return activatePolicy(engine, { lane: opt.lane, version: Number(opt.version), by: opt.by }); }
  if (cmd === "manager" && sub === "report") { need("lane"); return managerReport(engine, opt.lane, { since: opt.since ? Number(opt.since) : -Infinity }); }
  if (cmd === "manager" && sub === "cycle") {
    need("lane", "by", "belief", "decision");
    const report = managerReport(engine, opt.lane);
    return recordCycle(engine, { lane: opt.lane, by: opt.by, report, belief: opt.belief, decision: opt.decision, version: opt.version ? Number(opt.version) : null });
  }
  // ---- contractors: prototypes, research and spikes outside the delivery flow
  if (cmd === "contract" && sub === "templates") return Object.fromEntries(Object.entries(TEMPLATES).map(([k, t]) => [k, { kind: t.kind, goal: t.goal, deliverable: t.deliverable, budget: t.budget, timeboxMin: t.timeboxMin }]));
  if (cmd === "contract" && sub === "open") {
    need("by");
    const over = Object.fromEntries(Object.entries({ kind: opt.kind, goal: opt.goal, deliverable: opt.deliverable, budget: opt.budget && Number(opt.budget), timeboxMin: opt.timebox && Number(opt.timebox), onboarding: opt.onboarding && JSON.parse(opt.onboarding) }).filter(([, v]) => v != null && v !== true));
    if (!opt.template) need("kind", "goal", "deliverable", "budget", "timebox");
    const c = opt.template ? engageTemplate(co, { template: opt.template, by: opt.by, ...over }) : engage(co, { by: opt.by, onboarding: {}, ...over });
    fs.mkdirSync(path.join(LIVE, "contracts", c.id), { recursive: true });
    return { contract: c.id, contractor: c.contractor, due: new Date(c.due * 60000).toISOString(), folder: `live/contracts/${c.id}/` };
  }
  if (cmd === "contract" && sub === "brief") { need("id"); return briefFor(co, opt.id); }
  if (cmd === "contract" && sub === "deliver") {
    need("id", "by", "summary", "path");
    return deliver(co, { cid: opt.id, by: opt.by, summary: opt.summary, path: opt.path, findings: opt.findings ? JSON.parse(opt.findings) : null });
  }
  if (cmd === "contract" && sub === "decide") { need("id", "by", "decision", "reason"); return decideContract(co, { cid: opt.id, by: opt.by, decision: opt.decision, reason: opt.reason }); }
  if (cmd === "contract" && sub === "show") { need("id"); return engine.contracts.get(opt.id) ?? null; }
  const J = (k) => (opt[k] != null && opt[k] !== true ? JSON.parse(opt[k]) : undefined);
  const N = (k) => (opt[k] != null && opt[k] !== true ? Number(opt[k]) : undefined);
  const L = (k) => (opt[k] != null && opt[k] !== true ? String(opt[k]).split(",").filter(Boolean) : undefined);
  // ---- building
  if (cmd === "building" && sub === "plan") return B.plan(co);
  if (cmd === "building" && sub === "floor-propose") { need("by", "floor"); return B.proposeFloor(co, { by: opt.by, floor: N("floor"), name: opt.name }); }
  if (cmd === "building" && sub === "room-add") { need("by", "id", "floor", "kind"); return B.addRoom(co, { by: opt.by, id: opt.id, floor: N("floor"), kind: opt.kind, capacity: N("capacity") ?? 6, lane: opt.lane ?? null }); }
  if (cmd === "building" && sub === "room-rename") { need("by", "id", "to"); return B.renameRoom(co, { by: opt.by, id: opt.id, to: opt.to }); }
  if (cmd === "building" && sub === "room-retire") { need("by", "id"); return B.retireRoom(co, { by: opt.by, id: opt.id }); }
  if (cmd === "building" && sub === "book") { need("by", "room", "minutes"); const start = N("start") ?? clock.now(); return B.book(co, { by: opt.by, room: opt.room, start, end: start + N("minutes"), attendees: L("attendees") ?? [], purpose: opt.purpose ?? "" }); }
  if (cmd === "building" && sub === "cancel") { need("by", "id"); return B.cancelBooking(co, { by: opt.by, id: opt.id }); }
  // ---- approvals (the founder's queue) and org changes
  if (cmd === "approval" && sub === "queue") { need("approver"); return engine.queue(opt.approver).map((a) => ({ id: a.id, kind: a.kind, order: a.order, stage: a.stage, ref: a.ref, due: new Date(a.due * 60000).toISOString() })); }
  if (cmd === "approval" && sub === "decide") { need("ids", "by", "decision", "words", "channel"); return engine.decide(L("ids"), { by: opt.by, decision: opt.decision, words: opt.words, channel: opt.channel }).map((a) => ({ id: a.id, state: a.state })); }
  if (cmd === "org" && sub === "propose") {
    need("by", "op", "role");
    const id = org.propose({ op: opt.op, role: J("role"), reason: opt.reason ?? "", by: opt.by, to: opt.to ?? null });
    const a = engine.request({ approver: "founder", kind: "org-change", ref: id, dueMin: 24 * 60, key: `${id}:approve` });
    return { change: id, approval: a.id };
  }
  if (cmd === "org" && sub === "roles") return org.active().map((r) => ({ id: r.id, level: r.level, lane: r.lane ?? null, room: r.room }));
  if (cmd === "org" && sub === "gaps") return org.gaps(log.events, { waitP50Min: N("wait") ?? 60 });
  // ---- channels
  if (cmd === "channel" && sub === "create") { need("by", "id", "kind"); return CH.createChannel(co, { by: opt.by, id: opt.id, kind: opt.kind, members: L("members") ?? [], title: opt.title ?? "" }); }
  if (cmd === "channel" && sub === "post") { need("by", "channel", "title"); return CH.post(co, { by: opt.by, channel: opt.channel, title: opt.title, body: opt.body ?? "", ack: !!opt.ack, key: opt.key ?? null }); }
  if (cmd === "channel" && sub === "read") { need("by", "post"); return CH.read(co, { by: opt.by, post: opt.post, ackIt: !!opt.ack }); }
  if (cmd === "channel" && sub === "status") { need("post"); return CH.status(co, opt.post); }
  if (cmd === "channel" && sub === "inbox") { need("by"); return CH.inbox(co, opt.by); }
  // ---- tracker
  if (cmd === "item" && sub === "create") { need("by", "title"); return T.create(co, { by: opt.by, kind: opt.kind ?? "issue", title: opt.title, body: opt.body ?? "", assignee: opt.assignee ?? null, project: opt.project ?? null, labels: L("labels") ?? [], priority: N("priority") ?? 3, cycle: opt.cycle ?? null, due: opt.due ?? null, goal: opt.goal ?? null, state: opt.state ?? "backlog" }); }
  if (cmd === "item" && sub === "update") { need("by", "id"); const ch = {}; for (const k of ["title", "body", "state", "assignee", "project", "cycle", "due", "goal"]) if (opt[k] != null && opt[k] !== true) ch[k] = opt[k]; if (N("priority") != null) ch.priority = N("priority"); if (L("add-labels")) ch.addLabels = L("add-labels"); if (L("remove-labels")) ch.removeLabels = L("remove-labels"); return T.update(co, { by: opt.by, id: opt.id, ...ch }); }
  if (cmd === "item" && sub === "comment") { need("by", "id", "text"); return T.comment(co, { by: opt.by, id: opt.id, text: opt.text }); }
  if (cmd === "item" && sub === "link") { need("by", "id", "type", "to"); return T.link(co, { by: opt.by, id: opt.id, type: opt.type, to: opt.to }); }
  if (cmd === "item" && sub === "show") { need("id"); return T.get(co, opt.id); }
  if (cmd === "item" && sub === "search") { need("q"); return T.search(co, opt.q); }
  if (cmd === "project" && sub === "create") { need("by", "name", "lead"); return T.createProject(co, { by: opt.by, name: opt.name, lead: opt.lead, goals: L("goals") ?? [] }); }
  if (cmd === "cycle" && sub === "create") { need("by", "name", "minutes"); const start = N("start") ?? clock.now(); return T.createCycle(co, { by: opt.by, name: opt.name, start, end: start + N("minutes") }); }
  if (cmd === "board") { T.syncOrders(co); return T.board(co, { assignee: opt.assignee, project: opt.project, label: opt.label, cycle: opt.cycle, goal: opt.goal, kind: opt.kind }); }
  // ---- goals
  if (cmd === "goal" && sub === "create") { need("by", "title", "level", "owner", "why", "what", "success", "due"); return G.createGoal(co, { by: opt.by, title: opt.title, level: opt.level, owner: opt.owner, why: opt.why, what: opt.what, success: J("success"), due: opt.due, contributesTo: L("contributes-to") ?? [], status: opt.status ?? "green", reason: opt.reason ?? null, path: opt.path ?? null }); }
  if (cmd === "goal" && sub === "update") { need("by", "id"); return G.updateGoal(co, { by: opt.by, id: opt.id, status: opt.status, reason: opt.reason ?? null, path: opt.path ?? null, current: J("current") ?? {}, bind: J("bind") ?? {}, done: opt.done == null ? null : opt.done === "true" || opt.done === true, divergence: opt.divergence ?? null }); }
  if (cmd === "goal" && sub === "show") { need("id"); return G.view(co, G.getGoal(co, opt.id)); }
  if (cmd === "goal" && sub === "board") return G.goalBoard(co, { level: opt.level ?? null, owner: opt.owner ?? null });
  if (cmd === "goal" && sub === "review") { need("by", "level"); return G.reviewLevel(co, { by: opt.by, level: opt.level }); }
  // ---- meetings
  if (cmd === "meeting" && sub === "open") { need("by", "title", "invitees", "agenda"); return M.openMeeting(co, { by: opt.by, title: opt.title, room: opt.room ?? null, start: N("start"), minutes: N("minutes") ?? 30, invitees: L("invitees"), agenda: J("agenda"), channel: opt.channel ?? null }); }
  if (cmd === "meeting" && sub === "position") { need("id", "by", "item", "text"); return M.writePosition(co, { id: opt.id, by: opt.by, n: N("item"), text: opt.text }); }
  if (cmd === "meeting" && sub === "read") { need("id", "by", "item"); return M.readRound(co, { id: opt.id, by: opt.by, n: N("item"), round: N("round") ?? null }); }
  if (cmd === "meeting" && sub === "reveal") { need("id", "by", "item"); return M.reveal(co, { id: opt.id, by: opt.by, n: N("item"), force: !!opt.force }); }
  if (cmd === "meeting" && sub === "round") { need("id", "by", "item"); return M.nextRound(co, { id: opt.id, by: opt.by, n: N("item") }); }
  if (cmd === "meeting" && sub === "board") { need("id", "by", "section", "text"); return M.whiteboard(co, { id: opt.id, by: opt.by, section: opt.section, text: opt.text }); }
  if (cmd === "meeting" && sub === "object") { need("id", "by", "item", "text"); return M.object(co, { id: opt.id, by: opt.by, n: N("item"), text: opt.text }); }
  if (cmd === "meeting" && sub === "decide") { need("id", "by", "item", "decision"); return M.decide(co, { id: opt.id, by: opt.by, n: N("item"), decision: opt.decision, answers: J("answers") ?? {}, actions: J("actions") ?? [], rules: J("rules") ?? [] }); }
  if (cmd === "meeting" && sub === "defer") { need("id", "by", "item", "reason"); return M.defer(co, { id: opt.id, by: opt.by, n: N("item"), reason: opt.reason }); }
  if (cmd === "meeting" && sub === "close") { need("id", "by"); return { minutes: M.closeMeeting(co, { id: opt.id, by: opt.by }).minutes }; }
  if (cmd === "meeting" && sub === "show") { need("id"); const m = M.getMeeting(co, opt.id); return { id: m.id, title: m.title, kind: m.kind, chair: m.chair, state: m.state, invitees: m.invitees, agenda: m.agenda.map((a) => ({ n: a.n, title: a.title, rounds: a.rounds.length, revealed: a.rounds.at(-1).revealed, written: Object.keys(a.rounds.at(-1).positions), objections: a.objections.length, decided: !!a.decision })), whiteboard: m.board, pack: m.pack ?? null, minutes: m.minutes ?? null }; }
  // ---- asks and rituals
  if (cmd === "ask" && sub === "raise") { need("by", "kind", "title", "why", "due"); return A.raise(co, { by: opt.by, kind: opt.kind, title: opt.title, why: opt.why, due: opt.due, to: opt.to ?? null, amount: N("amount") ?? 0, lane: opt.lane ?? null, escalate: opt.escalate ?? null, goal: opt.goal ?? null, options: opt.options ?? null, recommend: opt.recommend === true ? "" : opt.recommend ?? null, order: opt.order ?? null, launch: process.env.META_LAUNCH || null }); }
  if (cmd === "ask" && sub === "route") { need("by", "kind"); return { decider: A.route(co, { by: opt.by, kind: opt.kind, amount: N("amount") ?? 0, lane: opt.lane ?? null, order: opt.order ?? null, launch: process.env.META_LAUNCH || null }) }; }
  if (cmd === "ask" && sub === "answer") { need("by", "id", "decision", "text"); return A.answer(co, { by: opt.by, id: opt.id, decision: opt.decision, text: opt.text }); }
  if (cmd === "ask" && sub === "summary") return A.askSummary(co);
  if (cmd === "wbr" && sub === "open") { need("by"); T.syncOrders(co); return RIT.wbrOpen(co, { by: opt.by, room: opt.room ?? null, start: opt.start ? Date.parse(opt.start) / 60000 : null, invitees: L("invitees") ?? null, channel: opt.channel ?? null }); }
  if (cmd === "wbr" && sub === "close") { need("by", "meeting", "summary"); return { doc: RIT.wbrClose(co, { by: opt.by, meeting: opt.meeting, summary: opt.summary }).doc }; }
  if (cmd === "wbr" && sub === "page0") return RIT.page0(co);
  if (cmd === "goal-review") { need("by"); return RIT.goalReview(co, { by: opt.by }); }
  if (cmd === "digest") { need("audience"); return { doc: opt.channel ? RIT.publishDigest(co, { by: opt.by ?? "cos", audience: opt.audience, channel: opt.channel }).body : RIT.digest(co, { audience: opt.audience }) }; }
  // the launcher reports a finished agent process: usage to its session(s); a crash abandons what it left running and
  // closes its session, so the work goes back to the queue and the supervisor plans it again
  if (cmd === "launch" && sub === "finished") {
    need("launch", "role", "tokens");
    // M5 review: an agent reported first (--cumulative=1) and its order's real spend was then never charged, or charged
    // any order it liked (--tasks=x:O-2): the report is the launcher's, which runs outside every agent session
    if (me != null) throw new Refused(`launch finished is the launcher's report: refused in an agent session (${me})`);
    { const m = /^\d{4}-(.+)$/.exec(String(opt.launch)); if (m && m[1] !== opt.role) throw new Refused(`launch ${opt.launch} is ${m[1]}'s, not ${opt.role}'s`); }
    const ok = opt.ok !== "false", tokens = Number(opt.tokens);
    const ss = [...rooms.sessions.values()].filter((s) => s.launch === opt.launch);
    const abandoned = [];
    for (const s of ss) {
      if (!ok) for (const x of rooms.runs.values()) if (x.session === s.id && x.state === "running") { rooms.abandon(x.run, { by: "launcher", reason: opt.reason ?? "agent process failed" }); abandoned.push(x.run); }
      if (!ok || s.waitUntil != null) { s.waitUntil = null; rooms.closeSession(s.id, ok ? "process ended" : "process failed"); }
    }
    if (ss.length) rooms.recordSessionUsage(ss[0].id, tokens, "launcher");
    else log.add({ type: "usage", role: opt.role, tokens, label: "outside a room", source: "launcher", launch: opt.launch });
    // K13: the launch's cumulative tokens (every call; --tokens, the final context, when the launcher sends none) are
    // charged to the orders it touched, split evenly: its sessions' runs, and its launch event's order tasks (the launch
    // id is the brief's name, <seq>-<role>: supervisor.mjs reserve), plus any --msgs/--tasks given. Once per launch.
    // M5 review: the msgs it was planned with count only when it entered no room at all (it crashed first: those are
    // what it spent on); otherwise a msg another launch took was charged twice. An ask task is not its order's work: the
    // tokens a decider spends on a budget or park ask are not charged to the order it decides (deciding a top-up used
    // the top-up up, and the next tick asked again)
    const le = log.events.find((e) => e.type === "launch" && `${String(e.seq).padStart(4, "0")}-${e.role}` === opt.launch);
    if (le && le.role !== opt.role) throw new Refused(`launch ${opt.launch} is ${le.role}'s, not ${opt.role}'s`);
    const touched = new Set([...rooms.runs.values()].filter((x) => ss.some((s) => s.id === x.session)).map((x) => x.order));
    for (const id of [...(ss.length ? [] : le?.msgs ?? []), ...(L("msgs") ?? [])]) { const ref = mailbox.msgs.get(id)?.ref; if (engine.orders.has(ref)) touched.add(ref); }
    for (const t of [...(le?.tasks ?? []).map((x) => x.ref), ...(L("tasks") ?? []).map((x) => x.split(":").pop())]) if (engine.orders.has(t)) touched.add(t);
    const charged = log.events.some((e) => e.type === "charge" && e.launch === opt.launch) ? [] : engine.charge([...touched], N("cumulative") ?? tokens, { launch: opt.launch });
    // K26: a warm role's Agent SDK session id, per order it worked at a work stage in this launch: the planner resumes
    // it for that order's next item (supervisor.mjs plan, warmFor). A failed process is recorded as not ok (cold next)
    const sdk = typeof opt["sdk-session"] === "string" && /^[\w-]{8,100}$/.test(opt["sdk-session"]) ? opt["sdk-session"] : null;
    const warmed = [];
    if (sdk && org.role(opt.role)?.warm) {
      for (const x of rooms.runs.values()) {
        const wo = engine.orders.get(x.order);
        if (!ss.some((s) => s.id === x.session) || !wo || !engine.isWorkStage(wo, x.stage) || warmed.includes(x.order)) continue;
        (co.data.warm ??= {})[`${x.order}|${opt.role}`] = { sdk, launch: opt.launch, ok, stage: x.stage, t: clock.now() };
        warmed.push(x.order);
      }
      if (warmed.length) log.add({ type: "warm-record", launch: opt.launch, role: opt.role, sdk, ok, orders: warmed });
    }
    log.add({ type: "launch-finished", launch: opt.launch, role: opt.role, ok, tokens, cumulative: N("cumulative") ?? null, cost: N("cost") ?? null, sessions: ss.map((s) => s.id), abandoned, reason: opt.reason ?? null, ...(sdk ? { sdk } : {}) });
    return { sessions: ss.map((s) => s.id), abandoned, charged, ...(warmed.length ? { warm: warmed } : {}) };
  }
  // K26: the launcher could not resume a warm session (gone, expired) and started cold instead: never resumed again
  if (cmd === "launch" && sub === "resume-failed") {
    need("launch", "role", "sdk-session", "why");
    if (me != null) throw new Refused(`launch resume-failed is the launcher's report: refused in an agent session (${me})`);
    const marked = Object.entries(co.data.warm ?? {}).filter(([, w]) => w.sdk === opt["sdk-session"]).map(([k, w]) => { w.failed = String(opt.why).slice(0, 300); return k.split("|")[0]; });
    return log.add({ type: "warm-fallback", launch: opt.launch, role: opt.role, sdk: opt["sdk-session"], why: String(opt.why).slice(0, 300), orders: marked });
  }
  // K10: what the launcher needs for one session (the role's tools/sessionMin/maxTurns/settingSources, the orders'
  // workdirs and protected globs), and the record of every call its guard denied (launcher/guard.mjs)
  if (cmd === "launch" && sub === "config") { need("role"); return WS.launchConfig(co, { role: opt.role, msgs: L("msgs") ?? [] }); }
  if (cmd === "guard" && sub === "denied") {
    need("role", "tool", "rule", "why");
    if (me != null) throw new Refused(`guard denied is the launcher's record: refused in an agent session (${me})`); // M5 review
    return log.add({ type: "guard", launch: opt.launch ?? null, role: opt.role, tool: opt.tool, rule: opt.rule, why: opt.why, detail: opt.detail ?? null, via: opt.via ?? null });
  }
  // K28: the playbook's evidence and rules (read-only), and a retro's proposal (validated change by change by code)
  if (cmd === "learn" && sub === "show") {
    const L = LEARN.learnOf(co); if (!L) throw new Refused("this company has no learn spec");
    const pb = LEARN.readPlaybook(L.store), ev = LEARN.readEvidence(L.store);
    return { store: L.store, run: L.run, retros: L.retros, rules: pb.rules, knobs: pb.knobs, evidence: ev.slice(-Number(opt.last ?? 50)).map((e) => ({ ...e, revises: e.revises.map((r) => ({ ...r, findings: r.findings.slice(0, 200) })) })), evidence_total: ev.length, limits: { maxRules: co.spec.learn.maxRules ?? LEARN.DEFAULT_MAX_RULES, ruleMaxChars: LEARN.RULE_MAX_CHARS, roles: co.spec.learn.roles } };
  }
  if (cmd === "learn" && sub === "propose") {
    need("by");
    const L = LEARN.learnOf(co); if (!L) throw new Refused("this company has no learn spec");
    const retro = opt.retro != null ? L.retros.find((r) => r.id === opt.retro) : null;
    if (opt.retro != null && retro?.state !== "open") throw new Refused(`no open retro ${opt.retro}`);
    const may = [co.spec.learn.retro.role, "founder"].filter(Boolean);
    if (!may.includes(opt.by)) throw new Refused(`${opt.by} may not change the playbook: its retro role (${co.spec.learn.retro.role ?? "code"}) or the founder may`);
    let proposal; try { proposal = JSON.parse(opt.file ? fs.readFileSync(String(opt.file), "utf8") : String(opt.proposal ?? "")); } catch { throw new Refused("--proposal (or --file) is JSON: {add: [{text, why: [evidence ids], targets: [classes]}], retire: [{id, why}], sample: [{stage, rate, why}]}"); }
    return LEARN.applyProposal(co, proposal, { by: opt.by, retro: retro?.id ?? null });
  }
  if (cmd === "escape" && sub === "list") return readEscapes();
  if (cmd === "escape" && sub === "add") {
    need("by", "pattern", "why");
    const e = validateChecks({ knownFalse: [{ pattern: opt.pattern, why: opt.why }] }); if (e) throw new Refused(e);
    const list = readEscapes().filter((x) => x.pattern !== opt.pattern);
    list.push({ pattern: opt.pattern, why: opt.why, by: opt.by, runs: opt.runs ? String(opt.runs).split(",") : [], added: new Date().toISOString().slice(0, 10) });
    fs.writeFileSync(ESCAPES, JSON.stringify(list, null, 1) + "\n");
    log.add({ type: "escape-added", by: opt.by, pattern: opt.pattern });
    return { ok: true, escapes: list.length };
  }
  if (cmd === "events") return log.events.filter((e) => !opt.type || e.type === opt.type);
  if (cmd === "memory") return rooms.memory.get(sub) ?? [];
  if (cmd === "org" && sub === "activity") return org.activity(log.events, arg);
  throw new Error(`unknown command: ${[cmd, sub].join(" ")}`);
}

try { const r = main(); out(r); }
catch (e) { console.error(absCmds(JSON.stringify({ error: e.message, refused: !!e.refused, ...(e.findings ? { findings: e.findings } : {}) }))); process.exit(e.refused ? 1 : 2); } // K12: a refused leave's findings
