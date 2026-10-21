// Discrete-event simulator: a toy org builds items through the prototype tools (lib.mjs), in simulated minutes.
// Workers are seeded random models, not agents. The simulator calls the real engine, mailbox, rooms, org and
// rituals, so every run is also a test of the tools under crashes, duplicates and illegal requests.
//
// Two kinds of numbers come out:
//   truth     what the simulator knows happened (every token, every interaction, every defect)
//   measured  what the company can see: computed from the event log only
// The gap between them is what EXP-009 measures in the real company.
import { rng, Refused } from "./lib.mjs";
import { build } from "./toy.mjs";
import { proposePolicy, activatePolicy } from "./policy.mjs";

// Every assumption, in one place. [m] = from the real company's metrics (tools/metrics.mjs, 2026-10-20);
// [a] = assumption, to be replaced by pilot data.
export const PARAMS = {
  days: 14,
  waveAt: 9 * 60, waveSize: 12, // [a] one wave of orders a day, like the lesson waves
  buildMin: [10, 30], checkMin: [8, 22], uatMin: [3, 8], shipMin: [5, 15], // [m] demo-builder 18 min/run; checkers 7-15 min
  buildTokens: 150_000, checkTokens: 130_000, uatTokens: 30_000, shipTokens: 20_000, // [m] 150k builder, 131k fact-checker
  defectRate: 2.0, mechShare: 0.5, reviseNewDefect: 0.1, // [a] defects per build ~ Poisson(rate·difficulty·(1.3-skill))
  detect: 0.7, selfDetect: 0.2, uatDetect: 0.3, // [a] independent checker vs self-check vs acceptance
  crash: 0.05, dup: 0.05, pSelfCheck: 0.05, pWrongLane: 0.03, refusedTokens: 5_000, // [a] fault rates
  leaseMin: 30, heartbeatMin: 20, noticeMeanMin: 240, // [a] someone notices a dead run after ~4 h without leases
  cosDispatchMin: 10, cosDispatchTokens: 25_000, // [a] serial chief-of-staff dispatch, per launch
  bookTokens: 20_000, recordProb: 0.6, // [a] manual bookkeeping per run; [m] ~60% of runs recorded (EXP-009)
  sittings: [9 * 60, 13 * 60, 18 * 60], syncMeanMin: 180, pollTokensPerHour: 2_000, founderDeny: 0.05, // [a]
  wakeFrom: 8 * 60, wakeTo: 20 * 60,
  iterate: false, wbrEveryMin: 3.5 * 24 * 60, maxAdds: 2, wbrWaitMin: 60, // P8: WBR reads org gaps and proposes staff
  recordLostUsage: false, // iteration 2a: room recover records the harness usage of a run that left without leave
  // iteration 4 (calibrated from live run 1, LIVE.md): an agent session costs a fixed start plus each item's own work,
  // plus context that grows with every item already drained in the session.
  tokenModel: "stage", sessionStart: 50_000, taskTokens: { build: 6_000, check: 8_000, uat: 3_000, ship: 2_000 }, contextPerItem: 5_000,
  drainCap: 1, // items one session may take (room next); 1 = one task per run
  priorityMix: null, // e.g. { now: 0.1, later: 0.6, laterDueMin: 480 }
  batchLaterN: 3, // a `later` item waits until this many are queued for the same worker, or its due time
  waveSizeRange: null, // e.g. [4, 20]: busy and quiet days
  leaseWake: false, // recover at lease expiry (a wake) instead of a sweep every 5 min
  wbrClock: "calendar", // "progress": every 20 shipped, or work waiting > 60 min, with a 24 h fallback
  ritualTokensPerPosition: 0, // iteration 4: each attendee's position is an agent session (live run 1: about 55k)
  policy: null, // iteration 5: lane policy knobs, proposed and activated by each lane's manager before the first wave
};

const DAY = 24 * 60;

export function simulate({ config, seed = 1, params = {} }) {
  const P = { ...PARAMS, ...params };
  const R = rng(seed);
  const co = build(config);
  const { clock, log, engine, rooms, mailbox, org, rituals } = co;
  if (P.policy) for (const lane of ["w", "g"]) {
    const mgr = org.lanePOC(lane).id;
    const v = proposePolicy(engine, { lane, by: mgr, knobs: P.policy, reason: "iteration 5 arm", prediction: "ITERATIONS.md I5" });
    activatePolicy(engine, { lane, version: v.version, by: mgr });
  }
  const batchFor = (r) => (P.policy?.batchLater ?? P.batchLaterN);
  const U = ([a, b]) => a + (b - a) * R();
  const poisson = (l) => { let k = 0, p = Math.exp(-l), s = p, u = R(); while (u > s) { k++; p *= l / k; s += p; } return k; };
  const expo = (mean) => -mean * Math.log(1 - R());

  const truth = { tokens: 0, founderInteractions: 0, crashes: 0, recovered: [], dupRuns: 0, violations: 0, escaped: 0, items: new Map(), adds: [] };
  const spend = (n, role, recorded) => { truth.tokens += n; if (recorded) log.add({ type: "usage", role, tokens: n, manual: !config.autoBookkeeping }); };

  // ---- event queue
  const q = [];
  let seq = 0;
  const at = (t, fn) => { q.push({ t, s: seq++, fn }); };
  const pop = () => { let i = 0; for (let j = 1; j < q.length; j++) if (q[j].t < q[i].t || (q[j].t === q[i].t && q[j].s < q[i].s)) i = j; return q.splice(i, 1)[0]; };

  // ---- workers and launches
  const busy = new Map(); // role → run
  const launched = new Set(); // message ids a worker may pick up
  let cosFreeAt = 0;
  const launch = (msgId) => {
    if (config.supervisor) { launched.add(msgId); return at(clock.now(), pump); }
    const start = Math.max(clock.now(), cosFreeAt);
    cosFreeAt = start + P.cosDispatchMin;
    at(cosFreeAt, () => { spend(P.cosDispatchTokens, "cos", R() < P.recordProb); launched.add(msgId); pump(); });
  };

  // every new work message gets launched (and maybe a duplicate notification)
  const seen = new Set();
  const watchMail = () => {
    for (const m of mailbox.msgs.values()) {
      if (m.kind !== "work" || seen.has(m.id)) continue;
      seen.add(m.id);
      launch(m.id);
      const o = engine.orders.get(m.ref);
      if (!m.key.includes(":dup") && R() < P.dup) at(clock.now() + 1, () => { if (o.stage === m.body.stage) { engine.notifyStage(o, { duplicate: true }); watchMail(); } });
    }
  };

  const candidates = (r) => [`pool:${r.level}`, r.id];
  const RANK = { now: 0, next: 1, later: 2 };
  const sessionOf = new Map(); // worker instance → { id, items }
  let nowInstances = 0;
  /** What this worker may take now: priority order; a `later` item only once enough of them are queued for it
   *  (a batch worth a session), or when the worker is already draining a session. */
  function pick(r, { draining = false } = {}) {
    const ms = candidates(r).flatMap((to) => mailbox.queue(to, "work")).filter((m) => launched.has(m.id))
      .filter((m) => !(m.body.stage === "check" && engine.orders.get(m.ref).builder === r.id))
      .sort((a, b) => (RANK[a.priority] - RANK[b.priority]) || a.ts - b.ts);
    const later = ms.filter((m) => m.priority === "later").length;
    return ms.find((m) => m.priority !== "later" || draining || later >= batchFor(r));
  }
  function pump() {
    mailbox.promote();
    for (const r of org.active()) {
      if (r.human || ["chief-of-staff", "founder"].includes(r.level)) continue;
      if (!busy.has(r.id)) { const m = pick(r); if (m) startRun(r, m, { inst: r.id }); continue; }
      // `now` does not interrupt the running agent: it wakes a fresh, parallel session for the one item
      const urgent = candidates(r).flatMap((to) => mailbox.queue(to, "work")).find((m) => m.priority === "now" && launched.has(m.id) && !(m.body.stage === "check" && engine.orders.get(m.ref).builder === r.id));
      if (urgent) startRun(r, urgent, { inst: `${r.id}+now${++nowInstances}`, cap: 1 });
    }
  }

  function startRun(r, m, { inst = r.id, cap = P.drainCap } = {}) {
    const o = engine.orders.get(m.ref);
    const stage = m.body.stage;
    // baseline-only fault: the builder checks its own work (a prose rule someone forgot)
    let actor = r.id;
    if (stage === "check" && R() < P.pSelfCheck && !busy.has(o.builder)) {
      try { co.rooms.guard(false, "independence", `${o.builder} checks its own ${o.id}`, { order: o.id, by: o.builder }); actor = o.builder; truth.violations++; }
      catch (e) { if (!(e instanceof Refused)) throw e; spend(P.refusedTokens, o.builder, true); }
    }
    const key = actor === r.id ? inst : actor;
    const cont = sessionOf.get(key);
    let run;
    try { run = rooms.enter({ msg: m.id, role: actor, leaseMin: P.leaseMin, session: cont?.id ?? null }).run; }
    catch (e) { if (e instanceof Refused) return; throw e; }
    const sess = cont ?? { id: rooms.runs.get(run).session, items: 0, cap };
    sess.items++;
    sessionOf.set(key, sess);
    busy.set(key, run); // a self-check is the builder's run: the checker stays free
    launched.delete(m.id);
    const dur = U(stage === "build" ? P.buildMin : stage === "check" ? P.checkMin : stage === "uat" ? P.uatMin : P.shipMin);
    const tokens = P.tokenModel === "session"
      ? (sess.items === 1 ? P.sessionStart : 0) + P.taskTokens[stage] * (stage === "build" ? 0.5 + item(o).d : 1) + P.contextPerItem * (sess.items - 1)
      : (stage === "build" ? P.buildTokens * (0.5 + item(o).d) : stage === "check" ? P.checkTokens : stage === "uat" ? P.uatTokens : P.shipTokens);
    const crashAt = R() < P.crash ? clock.now() + dur * R() : null;
    const free = () => busy.delete(key);
    const endSession = () => { sessionOf.delete(key); rooms.closeSession(sess.id, "done"); };
    if (config.leases) for (let h = clock.now() + P.heartbeatMin; h < (crashAt ?? clock.now() + dur); h += P.heartbeatMin) at(h, () => { if (rooms.runs.get(run).state === "running") rooms.heartbeat(run, { leaseMin: P.leaseMin }); });
    if (crashAt) {
      at(crashAt, () => {
        truth.crashes++;
        truth.tokens += tokens * 0.5;
        lostSpend.set(run, tokens * 0.5);
        free();
        endSession(); // the process died: the next item needs a new session
        const crashed = { at: clock.now(), msg: m.id, order: o.id, stage };
        if (!config.leases) at(clock.now() + expo(P.noticeMeanMin), () => { rooms.runs.get(run).state = "lost"; log.add({ type: "noticed-dead", run }); recoverAt(crashed); launch(m.id); });
        else pendingCrash.push(crashed);
        pump();
      });
      return;
    }
    at(clock.now() + dur, () => finishRun(r, actor, run, o, stage, tokens, free, m, { key, sess, endSession }));
  }

  /** room next: drain the next item in the same session, or end the session. */
  function continueOrEnd(r, s) {
    if (sessionOf.get(s.key) !== s.sess || busy.has(s.key)) return; // ended, or already continued by pump
    if (s.key === r.id && s.sess.items < s.sess.cap) {
      const m = pick(r, { draining: true });
      if (m) return startRun(r, m, { inst: r.id, cap: s.sess.cap });
    }
    s.endSession();
  }

  const pendingCrash = [];
  const lostSpend = new Map();
  const recoverAt = (c) => truth.recovered.push(clock.now() - c.at);

  function item(o) { return truth.items.get(o.id); }

  function finishRun(r, actor, run, o, stage, tokens, free, m, s) {
    free();
    if (s.sess.items >= s.sess.cap || s.key !== r.id) s.endSession(); // the cap is reached before anything else can reuse it
    const it = item(o);
    const isStale = o.stage !== stage || rooms.runs.get(run).loops !== o.loops;
    if (!config.autoBookkeeping) truth.tokens += P.bookTokens;
    truth.tokens += tokens;
    if (isStale) {
      truth.dupRuns++;
      rooms.leave(run, { tokens });
      if (!config.autoBookkeeping && R() < P.recordProb) log.add({ type: "usage", role: actor, tokens, manual: true });
      continueOrEnd(r, s);
      return pump();
    }
    let verdict = "pass", findings = null;
    if (stage === "build") {
      if (it.defects === null) it.defects = Array.from({ length: poisson(P.defectRate * it.d * (1.3 - (org.role(actor).skill ?? 0.6) + (it.wrongLane ? 0.3 : 0))) }, () => ({ mech: R() < P.mechShare }));
      else { it.defects = it.defects.filter((d) => !d.found); if (R() < P.reviseNewDefect) it.defects.push({ mech: R() < P.mechShare }); }
    } else if (stage === "check") {
      const p = actor === o.builder ? P.selfDetect : P.detect;
      for (const d of it.defects) if (R() < p) d.found = true;
      if (it.defects.some((d) => d.found)) { verdict = "revise"; findings = it.defects.filter((d) => d.found).length; }
    } else if (stage === "uat") {
      for (const d of it.defects) if (R() < P.uatDetect) d.found = true;
      if (it.defects.some((d) => d.found)) { verdict = "revise"; findings = 1; }
    }
    rooms.leave(run, { verdict, evidence: `${stage} record`, tokens, findings, learned: stage === "build" && o.loops > 0 ? "fix before resubmitting" : null });
    if (!config.autoBookkeeping && R() < P.recordProb) log.add({ type: "usage", role: actor, tokens, manual: true });
    afterAdvance(o);
    if (!busy.has(s.key)) continueOrEnd(r, s);
  }

  function afterAdvance(o) {
    const it = item(o);
    it.loopAt[o.stage] = o.loops;
    if (o.stage === "test1") {
      at(clock.now() + 2, () => {
        const mech = it.defects.filter((d) => d.mech);
        for (const d of mech) d.found = true;
        engine.advance(o.id, { stage: "test1", by: "code", verdict: mech.length ? "revise" : "pass", findings: mech.length });
        afterAdvance(o);
      });
      return;
    }
    if (o.stage === "release") requestRelease(o);
    if (o.stage === "build" && o.priority === "later" && o.due != null) at(o.due + 0.01, pump); // a later revision is due: wake then
    if (o.stage === "done") truth.escaped += it.defects.filter((d) => !d.found).length;
    watchMail();
    pump();
  }

  // ---- approvals: async (founder sittings) or sync (an interruption per request, the requester waits and polls)
  function requestRelease(o) {
    const a = engine.queue("founder").find((x) => x.order === o.id && x.stage === "release");
    if (!a || config.asyncApprovals) return;
    const t = nextWaking(clock.now() + expo(P.syncMeanMin));
    truth.founderInteractions++;
    truth.tokens += ((t - clock.now()) / 60) * P.pollTokensPerHour;
    at(t, () => founderDecide([a]));
  }
  function nextWaking(t) {
    const m = t % DAY;
    if (m < P.wakeFrom) return t - m + P.wakeFrom;
    if (m > P.wakeTo) return t - m + DAY + P.wakeFrom;
    return t;
  }
  function founderDecide(list) {
    for (const a of list) {
      if (a.state !== "open") continue;
      const deny = a.kind === "release" && R() < P.founderDeny;
      const words = a.kind === "release" ? "Approve deploy" : a.kind === "org-change" ? "Approve, add them" : "Approve";
      engine.decide(a.id, { by: "founder", decision: deny ? "deny" : "approve", words, channel: "chat" });
      if (a.order) afterAdvance(engine.orders.get(a.order));
    }
    watchMail();
    pump();
  }
  if (config.asyncApprovals) {
    for (let d = 0; d < P.days; d++) for (const s of P.sittings) at(d * DAY + s, () => {
      const qd = engine.queue("founder");
      if (qd.length) { truth.founderInteractions++; founderDecide(qd); }
    });
  }

  // ---- orders arrive in waves
  const lanes = ["w", "g"];
  for (let d = 0; d < P.days; d++) at(d * DAY + P.waveAt, () => {
    const size = P.waveSizeRange ? Math.round(U(P.waveSizeRange)) : P.waveSize;
    for (let i = 0; i < size; i++) {
      const lane = lanes[i % 2];
      const mgr = org.lanePOC(lane).id;
      const u = R();
      const pr = !P.priorityMix ? "next" : u < P.priorityMix.now ? "now" : u < P.priorityMix.now + P.priorityMix.later ? "later" : "next";
      const o = engine.orderNew({ flow: "item", by: "cos", to: mgr, budget: 300_000, accept: "passes check and uat", words: `Build item ${d}-${i}`, priority: pr, dueMin: pr === "later" ? P.priorityMix.laterDueMin : null });
      if (pr === "later") at(clock.now() + P.priorityMix.laterDueMin + 0.01, pump); // promotion is due then: wake, do not poll
      truth.items.set(o.id, { d: R(), defects: null, loopAt: { build: 0 }, wrongLane: false });
      const pool = org.active().filter((r) => r.level === "builder" && r.lane === lane);
      let to = pool[Math.floor(R() * pool.length)].id;
      if (R() < P.pWrongLane) {
        const other = org.active().find((r) => r.level === "builder" && r.lane !== lane).id;
        try { engine.delegate(o.id, { by: mgr, to: other, budget: 200_000 }); truth.violations++; truth.items.get(o.id).wrongLane = true; continue; }
        catch (e) { if (!(e instanceof Refused)) throw e; spend(P.refusedTokens, mgr, true); }
      }
      engine.delegate(o.id, { by: mgr, to, budget: 200_000 });
    }
    watchMail();
    pump();
  });

  // ---- lease recovery: a sweep every 5 min, or (leaseWake) a wake exactly at each lease's expiry
  const sweep = () => {
    const lost = rooms.recover({ usage: P.recordLostUsage ? (run) => lostSpend.get(run) ?? null : null });
    for (const x of lost) {
      const c = pendingCrash.find((c) => c.msg === x.msg);
      if (c) { recoverAt(c); pendingCrash.splice(pendingCrash.indexOf(c), 1); }
      launch(x.msg);
    }
  };
  if (config.leases && P.leaseWake) mailbox.onLease = (id, until) => at(until + 0.01, sweep);
  else if (config.leases) for (let t = 5; t < P.days * DAY; t += 5) at(t, sweep);

  // ---- P8: the WBR reads org gaps and proposes staff; the founder approves at the next sitting
  if (P.iterate) {
    const invite = (r) => r.rituals.some((x) => x.startsWith("wbr"));
    if (P.wbrClock === "progress") rituals.register({ id: "wbr", chair: "cos", invite, every: { shipped: 20 }, stuckMin: 60, fallbackMin: 24 * 60, minEvidence: 5 });
    else rituals.register({ id: "wbr", everyMin: P.wbrEveryMin, chair: "cos", invite });
    let since = 0;
    // the trigger is checked on the ritual's clocks; in the simulator that check runs every 15 min
    for (let t = 15; t < P.days * DAY; t += 15) at(t, () => { if (rituals.due().includes("wbr")) holdWbr(); });
    function holdWbr() {
      const rid = rituals.open("wbr", { agenda: ["efficiency", "flow status --stuck", "org gaps"] });
      const g = org.gaps(log.events, { since, waitP50Min: P.wbrWaitMin });
      for (const inv of rituals.open_.get(rid).invitees) if (inv !== "cos" && R() < 0.8) { rituals.position(rid, { by: inv, position: "ok" }); spend(P.ritualTokensPerPosition, inv, config.autoBookkeeping); }
      spend(P.ritualTokensPerPosition, "cos", config.autoBookkeeping); // the chair
      const top = g.overloaded[0];
      if (top && truth.adds.filter((a) => a.pool === top.pool).length < P.maxAdds) {
        const level = top.pool.startsWith("pool:") ? top.pool.slice(5) : org.role(top.pool)?.level;
        const like = org.role(top.pool) ?? org.active().find((r) => r.level === level);
        const id = `${like.id.split("-")[0]}-x${truth.adds.length + 1}`;
        let cid;
        try { cid = org.propose({ op: "add", role: { ...like, id, skill: like.skill ?? 0.6, rituals: [] }, by: "cos", reason: `${top.pool} wait p50 ${Math.round(top.waitP50)} min` }); }
        catch (e) {
          if (!(e instanceof Refused)) throw e;
          // e.g. an overloaded manager: one POC per lane, so this is an org-design question, not a hire
          rituals.position(rid, { by: "cos", position: `no automatic fix for ${top.pool}`, objection: e.message });
          log.add({ type: "staffing-refused", pool: top.pool, msg: e.message });
          rituals.close(rid, { by: "cos" });
          since = clock.now();
          return;
        }
        rituals.position(rid, { by: "cos", position: `propose ${id}`, action: { owner: "founder", due: 24 * 60, what: cid } });
        const a = engine.request({ approver: "founder", kind: "org-change", ref: cid, dueMin: 24 * 60, key: `${cid}:approve` });
        truth.adds.push({ pool: top.pool, id, proposedAt: clock.now() });
        if (!config.asyncApprovals) { truth.founderInteractions++; at(nextWaking(clock.now() + expo(P.syncMeanMin)), () => founderDecide([a])); }
      } else rituals.position(rid, { by: "cos", position: "no staffing change" });
      rituals.close(rid, { by: "cos" });
      since = clock.now();
    }
  }

  // ---- run
  while (q.length) {
    const e = pop();
    if (e.t >= P.days * DAY) break;
    clock.t = e.t;
    engine.tick();
    e.fn();
  }
  return { truth, log, co, P };
}

/** Everything the founder reads, from one run. measured.* comes only from the event log. */
export function summarize({ truth, log }) {
  const shipped = log.of("shipped");
  const n = shipped.length || 1;
  const leads = shipped.map((e) => e.lead).sort((a, b) => a - b);
  const pct = (p) => (leads.length ? leads[Math.min(leads.length - 1, Math.floor(p * leads.length))] : NaN);
  const measuredTokens = log.of("usage").reduce((s, e) => s + e.tokens, 0);
  return {
    shipped: shipped.length,
    tokensPerShipped: truth.tokens / n,
    measuredTokensPerShipped: measuredTokens / n,
    measureError: measuredTokens / truth.tokens - 1,
    leadP50h: pct(0.5) / 60, leadP90h: pct(0.9) / 60,
    founderPerShipped: truth.founderInteractions / n,
    escapedPerShipped: truth.escaped / n,
    reworkPerShipped: shipped.reduce((s, e) => s + e.loops, 0) / n,
    dupRuns: truth.dupRuns, violations: truth.violations, crashes: truth.crashes,
    unrecovered: truth.crashes - truth.recovered.length,
    recoverMeanMin: truth.recovered.length ? truth.recovered.reduce((s, x) => s + x, 0) / truth.recovered.length : 0,
    refusals: log.of("refuse").length, adds: truth.adds.map((a) => a.id),
    ...waitsByStage(log),
    ...byPriority(shipped),
    maxPromoteLateMin: Math.max(0, ...log.of("promote").map((e) => e.late)),
    itemsPerSession: (() => { const xs = log.of("session-close").map((e) => e.items); return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0; })(),
    wbrs: log.of("ritual-close").length,
    staffingRefused: log.of("staffing-refused").length,
    ...wbrBusyQuiet(log),
  };
}

/** flow status --stuck, from events: mean hours an item waits at each stage before work starts (or the decision). */
export function waitsByStage(log) {
  const sent = new Map(log.of("send").filter((e) => e.kind === "work").map((e) => [e.msg, e]));
  const acc = {};
  const add = (k, h) => { (acc[k] ??= []).push(h); };
  const first = new Set();
  for (const e of log.of("enter")) if (sent.has(e.msg) && !first.has(e.msg)) { first.add(e.msg); add(e.stage, (e.t - sent.get(e.msg).t) / 60); }
  for (const e of log.of("decide")) add("approval", e.wait / 60);
  const out = {};
  for (const k of ["build", "check", "uat", "approval", "ship"]) out[`wait_${k}_h`] = acc[k]?.length ? acc[k].reduce((x, y) => x + y, 0) / acc[k].length : 0;
  return out;
}

function byPriority(shipped) {
  const out = {};
  for (const p of ["now", "next", "later"]) {
    const ls = shipped.filter((e) => (e.priority ?? "next") === p).map((e) => e.lead).sort((a, b) => a - b);
    out[`leadP50h_${p}`] = ls.length ? ls[Math.floor(ls.length / 2)] / 60 : NaN;
  }
  return out;
}

/** WBRs per day on the busiest and the quietest third of days (by items shipped). */
function wbrBusyQuiet(log) {
  const DAYM = 24 * 60;
  const days = {};
  for (const e of log.of("shipped")) (days[Math.floor(e.t / DAYM)] ??= { s: 0, w: 0 }).s++;
  for (const e of log.of("ritual-close")) (days[Math.floor(e.t / DAYM)] ??= { s: 0, w: 0 }).w++;
  const xs = Object.values(days).sort((a, b) => a.s - b.s);
  if (xs.length < 3) return { wbrPerDayBusy: NaN, wbrPerDayQuiet: NaN };
  const k = Math.floor(xs.length / 3);
  const w = (ys) => ys.reduce((a, y) => a + y.w, 0) / Math.max(1, ys.length);
  return { wbrPerDayBusy: w(xs.slice(-k)), wbrPerDayQuiet: w(xs.slice(0, k)) };
}
