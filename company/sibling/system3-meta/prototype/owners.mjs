// K29-K33 (Benchmark 8: a specialized org, several owners on one growing codebase): divided ownership, routed
// failures, parallel owners on one worktree, interface change requests and scoped playbooks. Generic: a spec names its
// own modules, routes and interfaces; nothing here knows what the work is.
//
//   modules     {<name>: {paths: [globs], owner: <role>, readers: "all"}}   (K29) a path's owner; every role reads it
//   interfaces  [{name, paths, owner, contract: <cmd>}]                         (K32) shared contracts: the owner (the
//               architect) writes them; anyone else needs its approval (an ask kind change-request), and the contract
//               cmd must pass at the next integration check after a change to its paths
//   routes      [{match: <regex on a defect category>, owner: <role | module>}] (K30) a revise's findings, split by owner
//   triage      <role>   unmatched categories (default: the order's manager, the lead)
//   architect   <role>   who else may approve a change request (default: the first interface's owner)
//   integration {run: <cmd>, at: "head"|"workdir", maxTries: n}                (K31) the shared check after each hand-in
//
// K29: a write to a path another role owns is refused by the launcher's guard (launcher/guard.mjs, an "owned" root
// from workspace.mjs launchConfig) and by K7's commit (workspace.mjs commit: the stage's staged change), unless the
// owner (or the architect) approved a change request for that order. Reads are never refused (readers: "all").
// K30/K31: with ownership in the spec, every work stage the builder signs is worked in parts: one work item per owner
// (a message to role:<owner> on the same order and loop). A revise's findings are split into categories (the K28
// classify regex: "<category>: …" lines) and routed; each owner's item carries only its own lines. Each owner hands in
// its own part (room leave); code commits only that owner's paths (serialized, workspace.mjs commitLock) and runs the
// integration check (and the contracts due) on the commit as made; a failure is routed again as reopened parts. The
// stage advances only when every part is in and the last integration check passed.
// K33: evidence records which owner and module each defect category was routed to (learn.mjs evidenceFor), rules get a
// scope {role, module}, and a pack carries the rules in its role's scope plus the global ones.
// K35: late findings (an advisory review's, after the order moved on) are routed into the order's parts (routeLate).
// K36: `order delegate --scope=<modules>` staffs the owners of those modules; a role with `activate: "on-demand"` gets
//   no part otherwise (lib.mjs Engine.delegate), except by routed work or a borrow review.
// K37: spec `borrow: true`: an owner may write another module's paths (never an interface's: K32 stays an approval)
//   without waiting. The guard lets the write through and reports it (a `borrow` record); K7's commit of that owner's
//   part includes the borrowed files it wrote, records them, and the module's owner gets a non-blocking review-borrow
//   ask with the diff (a no comes back to it as work on that order).
import { classNorm, DEFAULT_CLASSIFY, Refused } from "./lib.mjs";
import { create as createItem } from "./tracker.mjs";

export const OWN_KEYS = ["modules", "interfaces", "routes", "triage", "architect", "integration", "borrow"];
const INTEGRATION_KEYS = ["run", "at", "maxTries"];
export const DEFAULT_MAX_TRIES = 3;
const NAME = /^[a-z][a-z0-9-]*$/;
const goodGlob = (g) => typeof g === "string" && g.length > 0 && g.length <= 300 && !g.startsWith("/") && !g.split("/").includes("..") && !/[\0\n]/.test(g);
const badRe = (x) => { try { new RegExp(x); return false; } catch { return true; } };

/** A path glob as a regex on a workdir-relative path (the protected-paths translation: `*` in one segment, `**` any
 *  depth, a trailing `/` the whole folder). */
export const ownGlobRe = (g) => new RegExp("^" + g.replace(/\/$/, "/**").replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "§").replace(/\*/g, "[^/]*").replace(/§/g, ".*") + "$");

/** The spec's ownership, normalized, or null (no modules and no interfaces: every spec before K29). */
export function ownershipOf(spec) {
  if (!spec || (spec.modules == null && spec.interfaces == null)) return null;
  const modules = Object.entries(spec.modules ?? {}).map(([name, m]) => ({ kind: "module", name, paths: m.paths ?? [], owner: m.owner }));
  const interfaces = (spec.interfaces ?? []).map((i) => ({ kind: "interface", name: i.name, paths: i.paths ?? [], owner: i.owner, contract: i.contract ?? null }));
  return { modules, interfaces, routes: spec.routes ?? [], triage: spec.triage ?? null, architect: spec.architect ?? interfaces[0]?.owner ?? null, integration: spec.integration ?? null, borrow: spec.borrow === true ? modules.map((m) => m.name) : Array.isArray(spec.borrow?.modules) ? spec.borrow.modules : null };
}

/** Why a spec's ownership keys are invalid ([] when fine or absent). `roles`: the spec's roles by id; `validateCmd`
 *  (state.mjs) judges the contract and integration cmds. */
export function ownersProblems(s, roles = new Map(), validateCmd = () => null) {
  const p = [], agent = (r) => roles.get(r) && !roles.get(r).human;
  if (s.modules != null) {
    if (typeof s.modules !== "object" || Array.isArray(s.modules) || !Object.keys(s.modules).length) p.push("modules is {<name>: {paths: [globs], owner: <role>, readers: \"all\"}}");
    else for (const [n, m] of Object.entries(s.modules)) {
      if (!NAME.test(n)) p.push(`module ${n}: a kebab-case name`);
      if (!m || typeof m !== "object" || Array.isArray(m) || Object.keys(m).some((k) => !["paths", "owner", "readers"].includes(k))) { p.push(`module ${n} is {paths, owner, readers}`); continue; }
      if (!(Array.isArray(m.paths) && m.paths.length && m.paths.every(goodGlob))) p.push(`module ${n}: paths is a list of workdir-relative globs`);
      if (!agent(m.owner)) p.push(`module ${n}: owner ${m.owner} is an agent role of the spec`);
      if (m.readers != null && m.readers !== "all") p.push(`module ${n}: readers is "all" (every role reads every module)`);
    }
  }
  const ifs = s.interfaces;
  if (ifs != null) {
    if (!Array.isArray(ifs) || !ifs.length) p.push("interfaces is [{name, paths, owner, contract}]");
    else for (const i of ifs) {
      if (!i || typeof i !== "object" || Object.keys(i).some((k) => !["name", "paths", "owner", "contract"].includes(k))) { p.push("an interface is {name, paths, owner, contract}"); continue; }
      if (!NAME.test(String(i.name))) p.push(`interface ${i.name}: a kebab-case name`);
      if (!(Array.isArray(i.paths) && i.paths.length && i.paths.every(goodGlob))) p.push(`interface ${i.name}: paths is a list of workdir-relative globs`);
      if (!agent(i.owner)) p.push(`interface ${i.name}: owner ${i.owner} is an agent role of the spec (the architect)`);
      if (i.contract == null) p.push(`interface ${i.name}: contract is the cmd that must pass after a change to its paths`);
      else { const e = validateCmd(i.contract, { stages: [] }); if (e) p.push(`interface ${i.name}: contract: ${e}`); else if (i.contract.route) p.push(`interface ${i.name}: contract has no route`); }
    }
    const names = ifs.map?.((i) => i?.name) ?? [];
    if (new Set(names).size !== names.length) p.push("interface names are unique");
    if (Object.keys(s.modules ?? {}).some((n) => names.includes(n))) p.push("an interface and a module do not share a name");
  }
  if (s.routes != null) {
    if (s.modules == null) p.push("routes need modules (a route sends a category to a module's owner or a role)");
    if (!Array.isArray(s.routes) || !s.routes.length) p.push("routes is [{match: <regex on a category>, owner: <role or module>}]");
    else for (const r of s.routes) {
      if (!r || typeof r !== "object" || Object.keys(r).some((k) => !["match", "owner"].includes(k)) || typeof r.match !== "string" || !r.match || badRe(r.match)) { p.push("a route is {match: <regular expression>, owner}"); continue; }
      if (!(s.modules?.[r.owner] || agent(r.owner))) p.push(`route ${r.match}: owner ${r.owner} is a module or an agent role`);
    }
  }
  if (s.borrow != null) {
    const ok = typeof s.borrow === "boolean" || (s.borrow && typeof s.borrow === "object" && !Array.isArray(s.borrow) && Object.keys(s.borrow).every((k) => k === "modules") && Array.isArray(s.borrow.modules) && s.borrow.modules.length && s.borrow.modules.every((m) => s.modules?.[m]));
    if (!ok) p.push("borrow is true (every module) or {modules: [<module>, …]} (those modules may be borrowed; interfaces never)");
    if (s.modules == null) p.push("borrow needs modules (an owner borrows another module's paths)");
  }
  for (const k of ["triage", "architect"]) if (s[k] != null) { if (!agent(s[k])) p.push(`${k} ${s[k]} is an agent role of the spec`); if (s.modules == null && s.interfaces == null) p.push(`${k} needs modules or interfaces`); }
  if (s.integration != null) {
    const I = s.integration;
    if (s.modules == null && s.interfaces == null) p.push("integration needs modules or interfaces (it checks the owners' hand-ins)");
    if (!I || typeof I !== "object" || Array.isArray(I) || Object.keys(I).some((k) => !INTEGRATION_KEYS.includes(k))) p.push(`integration is {${INTEGRATION_KEYS.join(", ")}}`);
    else {
      if (I.run != null) { const e = validateCmd(I.run, { stages: [] }); if (e) p.push(`integration.run: ${e}`); else if (I.run.route) p.push("integration.run has no route"); }
      if (I.at != null && !["head", "workdir"].includes(I.at)) p.push("integration.at is head (the commit as made, default) or workdir");
      if (I.maxTries != null && !(Number.isInteger(I.maxTries) && I.maxTries >= 1 && I.maxTries <= 10)) p.push("integration.maxTries is a whole number 1-10");
    }
  }
  // two modules (or two interfaces) never claim one literal path: ownership is one owner per path
  const lit = new Map();
  for (const [kind, list] of [["module", Object.entries(s.modules ?? {}).map(([n, m]) => ({ name: n, paths: m?.paths }))], ["interface", Array.isArray(ifs) ? ifs : []]]) {
    for (const x of list) for (const g of Array.isArray(x?.paths) ? x.paths : []) {
      const k = `${kind}:${g}`;
      if (lit.has(k) && lit.get(k) !== x.name) p.push(`${kind}s ${lit.get(k)} and ${x.name} both claim ${g}`);
      lit.set(k, x.name);
    }
  }
  return p;
}

/** The entry (interface first, then module) that owns workdir-relative path `rel`, or null (an unowned path). */
export function ownerOf(own, rel) {
  if (!own) return null;
  for (const e of [...own.interfaces, ...own.modules]) if (e.paths.some((g) => ownGlobRe(g).test(rel))) return e;
  return null;
}
/** The roles that may approve a change request for `e`: its owner and the architect. */
export const approversOf = (own, e) => [...new Set([e.owner, own.architect].filter(Boolean))];
/** The change requests approved for role `role` on order `o` (data.grants): their globs. */
export function grantsFor(co, o, role) {
  return (co.data?.grants ?? []).filter((g) => g.order === o?.id && g.role === role).flatMap((g) => g.paths);
}
/** Why role `role` may not write `rel` in order `o`'s workdir ({entry, why}), or null. */
export function writeDenial(co, o, role, rel) {
  const own = ownershipOf(co.spec), e = ownerOf(own, rel);
  if (!e || e.owner === role) return null;
  if (grantsFor(co, o, role).some((g) => ownGlobRe(g).test(rel))) return null;
  if (own.borrow?.includes(e.name) && e.kind === "module" && borrowsOf(co, o, role).includes(rel)) return null; // K37: a recorded borrow
  return { entry: e, why: `${rel} is in ${e.kind} ${e.name}, owned by ${e.owner}: every role reads it, only ${e.owner} writes it. Ask for the change: node meta.mjs ask raise --by=${role} --kind=change-request --module=${e.name} --order=${o?.id ?? "<O>"} --title=… --why=… --due=<min> (decided by ${approversOf(own, e).join(" or ")})` };
}
/** The guard root for role `role` on workdir `dir` of order `o` (launcher/guard.mjs pathDenial reads it): the
 *  ownership table, minus what this role owns, with its approved grants. */
export function guardRoot(co, o, role, dir) {
  const own = ownershipOf(co.spec);
  if (!own || !dir) return null;
  const owned = [...own.interfaces, ...own.modules].map((e) => ({ kind: e.kind, name: e.name, owner: e.owner, globs: e.paths }));
  return { dir, kind: "owned", role, owned, granted: grantsFor(co, o, role), order: o?.id ?? null, file: "the spec's modules and interfaces (K29)", ...(own.borrow?.length ? { borrow: own.borrow } : {}) };
}
/** The paths a role owns (its modules', its interfaces'), plus its grants on order `o`: git pathspecs for its commit. */
export function ownedPaths(co, o, role) {
  const own = ownershipOf(co.spec);
  if (!own) return [];
  return [...new Set([...[...own.interfaces, ...own.modules].filter((e) => e.owner === role).flatMap((e) => e.paths), ...grantsFor(co, o, role)])];
}

// ---- K30: categories and routes
/** One finding line's category ("<category>: …" by the classify regex; a short line of a code check is itself one), or
 *  null. */
export function lineCategory(line, { re, byCode = false }) {
  const l = String(line).trim();
  if (!l || /^# (tests|pass|fail|suites|duration|cancelled|skipped|todo)\b/.test(l) || /^\[route: /.test(l)) return undefined; // not a finding
  if (/^not ok \d+/.test(l)) return "tests";
  const m = re.exec(l);
  if (m?.[1]) return classNorm(m[1]) || null;
  if (byCode && l.length <= 40) return classNorm(l) || null;
  return null;
}
/** The finding lines of a revise, with their categories: [{line, category}] (category null: no category). A code
 *  stage's first line is its cmd's summary (`<cmd>: exit 1`), never a finding (learn.mjs classesOf reads it the same). */
export function categorize(findings, { skipFirst = false, byCode = false, classify = null } = {}) {
  const re = new RegExp(classify ?? DEFAULT_CLASSIFY);
  const lines = String(findings ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
  const out = [];
  for (const line of skipFirst ? lines.slice(1) : lines) { const c = lineCategory(line, { re, byCode }); if (c !== undefined) out.push({ line, category: c }); }
  if (!out.length && skipFirst && lines[0]) out.push({ line: lines[0], category: null }); // only the summary: the failure itself
  return out;
}
/** Where category `c` goes: {owner, module, route} by the first matching route; null when none matches. */
export function routeOf(own, c) {
  if (!own || c == null) return null;
  for (const r of own.routes) {
    if (!new RegExp(r.match).test(c)) continue;
    const m = own.modules.find((x) => x.name === r.owner);
    return { owner: m ? m.owner : r.owner, module: m ? m.name : own.modules.find((x) => x.owner === r.owner)?.name ?? null, route: r.match };
  }
  return null;
}
/** Split order `o`'s findings by owner: { items: {role: {categories, findings}}, routed: {category: {owner, module}} }.
 *  Unmatched categories go to `fallback` (the spec's triage, else the order's manager). No findings: everything is
 *  `whole`'s (the builder). */
export function split(co, o, { findings, from = null, by = null, fallback = null, whole = null }) {
  const own = ownershipOf(co.spec), def = co.engine.flows.get(o.flow), sd = def?.stages.find((x) => x.stage === from);
  const triage = fallback ?? own?.triage ?? o.manager;
  const lines = categorize(findings, { skipFirst: !!sd?.run || (by === "code" && from === "test1"), byCode: by === "code", classify: co.spec?.learn?.classify ?? null });
  const items = {}, routed = {};
  if (!lines.length) { const w = whole ?? o.builder; items[w] = { categories: [], findings: findings ? String(findings) : null }; return { items, routed }; }
  for (const { line, category } of lines) {
    const r = routeOf(own, category), to = r?.owner ?? triage;
    const it = (items[to] ??= { categories: [], lines: [] });
    if (category && !it.categories.includes(category)) it.categories.push(category);
    it.lines.push(line);
    if (category) routed[category] = { owner: to, module: r?.module ?? null, ...(r ? {} : { triage: true }) };
  }
  for (const it of Object.values(items)) { it.findings = it.lines.join("\n").slice(0, 2000); delete it.lines; }
  return { items, routed };
}

/** Engine hook (state.mjs make): the parts of a builder-signed work stage when it is sent: the initial owners
 *  (`order delegate --owners`/`--scope`), plus (K35) the late findings a finished order left for this one, split by
 *  owner; or the last revise's findings split by owner; else one part, the builder's. */
export function partsFor(co, o) {
  const last = [...(o.history ?? [])].reverse().find((h) => h.verdict === "revise" || h.verdict === "reopen");
  if (o.loops === 0 || !last || !o.findings) {
    const owners = o.loops === 0 && o.initialOwners?.length ? o.initialOwners : [o.builder];
    const items = Object.fromEntries(owners.map((r) => [r, { categories: [], findings: o.loops === 0 ? null : o.findings ?? null }]));
    let routed = {};
    if (o.loops === 0 && o.carried?.length) {
      for (const c of o.carried) {
        const s = c.owner ? { items: { [c.owner]: { categories: [], findings: c.findings } }, routed: {} } : split(co, o, { findings: c.findings, whole: o.builder });
        for (const [r, it] of Object.entries(s.items)) { const x = (items[r] ??= { categories: [], findings: null }); x.categories = [...new Set([...x.categories, ...it.categories])]; x.findings = [x.findings, `${c.kind} findings from ${c.stage} on ${c.from} (${c.by}):\n${it.findings}`].filter(Boolean).join("\n").slice(0, 2000); }
        routed = { ...routed, ...s.routed };
      }
      delete o.carried;
    }
    return { items, routed };
  }
  const s = split(co, o, { findings: o.findings, from: last.stage, by: last.by });
  last.routed = s.routed; // the record K33's evidence reads (which owner and module each category went to)
  return s;
}

/** K30: the triage role (or any owner) hands categories of its open part on to the owner they belong to: those lines
 *  leave its part and open (or join) `to`'s part on the same order and loop. */
export function reroute(co, o, { by, to, categories }) {
  const { engine } = co, p = engine.partsNow(o), it = p?.items?.[by];
  const no = (m) => { throw new Refused(`HARD: ${m}`); };
  if (!it || it.state !== "open") no(`${by} has no open part of ${o.id} at ${o.stage} to route from`);
  const r = co.org.role(to);
  if (!r?.active || r.human || to === by) no(`--to=${to}: an active agent role other than ${by}`);
  const want = new Set(categories.map(classNorm));
  const lines = categorize(it.findings, { classify: co.spec?.learn?.classify ?? null }).map((x) => ({ ...x, category: x.category ?? "uncategorized" }));
  const moved = lines.filter((x) => want.has(x.category)), kept = lines.filter((x) => !want.has(x.category));
  if (!moved.length) no(`${by}'s part of ${o.id} has no findings in ${[...want].join(", ")} (it has: ${[...new Set(lines.map((x) => x.category))].join(", ") || "none"})`);
  it.findings = kept.map((x) => x.line).join("\n") || null;
  it.categories = it.categories.filter((c) => !want.has(c));
  // the record K33's evidence reads: the revise's routed categories (its history entry) and the parts' copy
  const h = [...o.history].reverse().find((x) => x.routed);
  for (const x of moved) if (x.category !== "uncategorized") { const v = { owner: to, module: ownershipOf(co.spec)?.modules.find((m) => m.owner === to)?.name ?? null, by }; p.routed[x.category] = v; if (h) h.routed[x.category] = v; }
  const t = p.items[to];
  const findings = [t?.state === "open" ? t.findings : null, ...moved.map((x) => x.line)].filter(Boolean).join("\n").slice(0, 2000);
  const cats = [...new Set([...(t?.state === "open" ? t.categories : []), ...moved.map((x) => x.category).filter((c) => c !== "uncategorized")])];
  co.log.add({ type: "part-route", order: o.id, stage: o.stage, by, to, categories: [...want] });
  if (t?.state === "open") { t.findings = findings; t.categories = cats; return t; }
  engine.reopenPart(o, to, { categories: cats, findings, maxTries: Infinity, by });
  return p.items[to];
}

// ---- K35: late findings into the order's parts
/** Engine hook (lib.mjs Engine.lateOn): late findings `r` split by owner (K30 routes; unmatched: the triage role;
 *  r.owner: that role) and sent as reopened or new parts of the order's work stage. */
export function routeLate(co, o, r) {
  const s = r.owner ? { items: { [r.owner]: { categories: [], findings: r.findings } }, routed: {} } : split(co, o, { findings: r.findings, whole: o.builder });
  for (const [role, it] of Object.entries(s.items)) {
    if (!co.engine.partsNow(o)) break; // parked by a part's tries
    co.engine.reopenPart(o, role, { categories: it.categories, findings: `${r.kind} findings from ${r.stage}${r.carried ? ` on ${r.from}` : ""} (${r.by}):\n${it.findings ?? r.findings}`.slice(0, 2000), maxTries: Infinity, by: r.by });
  }
  const p = co.engine.partsNow(o); if (p) Object.assign(p.routed, s.routed);
  return s;
}

// ---- K36: staffing on demand
/** Engine hook (lib.mjs Engine.delegate --scope): the owners of `mods` (module names), or a refusal. */
export function scopeOwners(co, o, mods) {
  const own = ownershipOf(co.spec);
  if (!own?.modules.length) throw new Refused("HARD: --scope needs a spec with modules");
  const bad = mods.filter((m) => !own.modules.some((x) => x.name === m));
  if (bad.length || !mods.length) throw new Refused(`HARD: --scope=${mods.join(",")}: ${bad.length ? `${bad.join(", ")} ${bad.length > 1 ? "are" : "is"} not` : "name at least one of"} this company's modules (${own.modules.map((x) => x.name).join(", ")})`);
  return [...new Set(mods.map((m) => own.modules.find((x) => x.name === m).owner))];
}

// ---- K37: borrow
/** The files role `role` borrowed on order `o` and has not committed yet. */
export function borrowsOf(co, o, role) {
  return (co.data?.borrows ?? []).filter((b) => b.order === o?.id && b.role === role && b.state === "open").map((b) => b.file);
}
/** The launcher's record of a borrowed write (guard.mjs: an owned root with borrow on let it through): role `role`
 *  wrote `file` (workdir-relative) of module `module` on order `order`. Refused for an interface or a path the role
 *  owns, or with borrow off. */
export function recordBorrow(co, { order, role, file, launch = null }) {
  const own = ownershipOf(co.spec), o = co.engine.orders.get(String(order ?? ""));
  const no = (m) => { throw new Refused(`HARD: ${m}`); };
  if (!own?.borrow?.length) no("this company does not borrow (spec borrow)");
  if (!o) no(`no order ${order}`);
  const e = ownerOf(own, String(file ?? ""));
  if (!e || e.kind !== "module" || e.owner === role || !own.borrow.includes(e.name)) no(`${file} is not a path of another role's module that may be borrowed (an interface needs a change request)`);
  const bs = (co.data.borrows ??= []);
  if (!bs.some((b) => b.order === o.id && b.role === role && b.file === file && b.state === "open")) bs.push({ order: o.id, role, file, module: e.name, owner: e.owner, state: "open", t: co.engine.clock.now(), launch });
  co.log.add({ type: "borrow", order: o.id, role, file, module: e.name, owner: e.owner, launch });
  return { order: o.id, role, file, module: e.name, owner: e.owner };
}
/** K7's commit of `role`'s part took borrowed `files` (sha `sha`, `diff` the commit's diff of them): recorded, and one
 *  non-blocking review-borrow ask per module owner (an ask: the owner's session starts only for it). */
export function borrowCommitted(co, o, { role, files, sha, diff = "" }) {
  const bs = (co.data?.borrows ?? []).filter((b) => b.order === o.id && b.role === role && b.state === "open" && files.includes(b.file));
  const by = new Map();
  for (const b of bs) { b.state = "committed"; b.sha = sha; (by.get(b.owner) ?? by.set(b.owner, { module: b.module, files: [] }).get(b.owner)).files.push(b.file); }
  const out = [];
  for (const [owner, x] of by) {
    const due = new Date((co.engine.clock.now() + 60) * 60000).toISOString().slice(0, 10);
    const it = createItem(co, { by: "engine", kind: "ask", title: `review-borrow: ${role} changed ${x.module} on ${o.id} (${x.files.length} file${x.files.length > 1 ? "s" : ""})`, body: `${role} wrote your module's ${x.files.join(", ")} in ${o.id}'s worktree (commit ${String(sha).slice(0, 7)}), without waiting (K37 borrow). Read the diff and answer: yes if it is right, or no with what must change (it comes back to you as work on ${o.id}).\n\n${String(diff).slice(0, 3000)}`, assignee: owner, due, labels: ["ask:review-borrow"], state: "todo", priority: 2 });
    it.ask = { kind: "review-borrow", from: role, decider: owner, routedTo: owner, order: o.id, module: x.module, files: x.files, sha, answer: null };
    co.log.add({ type: "ask", item: it.id, from: role, to: owner, kind: "review-borrow", order: o.id });
    out.push({ owner, module: x.module, files: x.files, item: it.id });
  }
  return out;
}
/** asks.mjs answer: a review-borrow answered no comes back to the module's owner as work on its order (K35 late
 *  findings: its part now, or held, or the next order's when that one is done). */
export function borrowAnswered(co, it, { decision, text }) {
  if (decision === "yes") return null;
  const o = co.engine.orders.get(it.ask.order);
  if (!o) return null;
  return co.engine.lateFindings(o, { stage: "review-borrow", by: it.ask.decider, kind: "review-borrow", owner: it.ask.decider, findings: `${it.ask.module}: ${it.ask.from}'s borrowed change to ${it.ask.files.join(", ")} -> ${text}` });
}
