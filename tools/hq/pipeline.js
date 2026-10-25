// copied from system3-city pages/pipeline @ 401172d; this is the company's copy: change it freely
// The pipeline (a city page template): each content type's life cycle as a state machine, grouped by the unit of scale.
// Four views of the dashboard contract's `pipeline` (PAGE.md): the state machine (a diagram with counts and back
// edges), a kanban grouped by category, the category × state table, and a search that shows one item's path. Clicking
// a node, a cell or a row lists those items, stale first, 25 at a time. There is no flat list of every item.
// The page reads only ctx.dashboard. Its view state lives in memory (globalThis.__hqPipeline), so the HQ's refresh
// keeps it; nothing is stored, fetched or loaded.
const PAGE = 25;
const VIEWS = [["machine", "State machine"], ["kanban", "Kanban"], ["groups", "Categories"], ["search", "Search"]];

export function render(ctx) {
  const { dashboard, esc } = ctx;
  const p = dashboard?.pipeline, rawTypes = p?.types ?? [], items = p?.items ?? [];
  if (!rawTypes.length) return `<h1>Pipeline</h1><div class="empty">No pipeline recorded yet (the dashboard's pipeline: content types with their states, and items).</div>`;
  const G = (globalThis.__hqPipeline ??= {}), key = ctx.company?.id ?? "hq";
  const ui = (G[key] ??= { view: "machine", t: 0, sel: null, page: 0, open: null, more: {}, rows: {}, q: "", pick: null });
  const m = model(p, rawTypes, items);
  if (ui.t >= m.types.length) ui.t = 0;
  if (ui.open == null) ui.open = new Set(m.types[ui.t]?.groups[0] ? [m.types[ui.t].groups[0].id] : []);
  G.cur = key;
  G.draw = () => draw(m, ui, esc);
  G.redraw = () => { const el = globalThis.document?.getElementById("pl-root"); if (el) el.innerHTML = G.draw(); };
  G.act = (what, ...a) => { act(m, ui, what, a); G.redraw(); if ((what === "sel" && ui.sel) || what === "pick") globalThis.document?.getElementById(what === "pick" ? "pl-root" : "pl-drill")?.scrollIntoView({ block: what === "pick" ? "start" : "nearest", behavior: "smooth" }); };
  G.q = (v) => { ui.q = v; ui.pick = null; const el = globalThis.document?.getElementById("pl-results"); if (el) el.innerHTML = results(m, ui, esc); };
  return `${STYLE}<div id="pl-root">${G.draw()}</div>`;
}

// ------------------------------------------------------------ the model: indexes over the contract
function model(p, rawTypes, items) {
  const stale = p.staleDays ?? 7, now = Date.now();
  const age = (d) => (d ? Math.max(0, Math.floor((now - Date.parse(d)) / 86400000)) : null);
  const subBy = p.subgroupBy ?? "subgroup", groupBy = p.groupBy ?? "category";
  const gTitle = {}, sgTitle = {};
  for (const g of p.groups ?? []) { gTitle[g.id] = g.title ?? g.id; for (const s of g.subgroups ?? []) sgTitle[`${g.id}/${s.id}`] = s.title ?? s.id; }
  const all = items.map((it, n) => { const a = age(it.since), g = it.group ?? it.category ?? "all"; return { it, n, age: a, stale: a != null && a > stale, g, sg: it.subgroup ?? null }; });
  const types = rawTypes.map((t) => {
    const states = t.states ?? [], ids = states.map((s) => s.id);
    const transitions = (Array.isArray(t.transitions) ? t.transitions : states.slice(1).map((s, i) => ({ from: states[i].id, to: s.id, kind: "forward", label: "" }))).filter((x) => ids.includes(x.from) && ids.includes(x.to));
    const mine = all.filter((x) => x.it.type === t.id);
    const count = (xs) => { const c = Object.fromEntries(ids.map((s) => [s, { n: 0, stale: 0 }])); for (const x of xs) { const k = (c[x.it.state] ??= { n: 0, stale: 0 }); k.n++; if (x.stale) k.stale++; } return c; };
    const byG = new Map();
    for (const x of mine) { if (!byG.has(x.g)) byG.set(x.g, []); byG.get(x.g).push(x); }
    const groups = [...byG].map(([id, xs]) => {
      const bySg = new Map(); for (const x of xs) { const k = x.sg ?? ""; if (!bySg.has(k)) bySg.set(k, []); bySg.get(k).push(x); }
      const subs = [...bySg].map(([sid, ys]) => ({ id: sid || null, title: sid ? sgTitle[`${id}/${sid}`] ?? sid : `no ${subBy}`, xs: ys, c: count(ys), stale: ys.filter((y) => y.stale).length }))
        .sort((a, b) => (a.id == null) - (b.id == null) || b.xs.length - a.xs.length || a.title.localeCompare(b.title));
      return { id, title: gTitle[id] ?? id, xs, c: count(xs), stale: xs.filter((y) => y.stale).length, subs };
    }).sort((a, b) => b.xs.length - a.xs.length || a.title.localeCompare(b.title));
    return { id: t.id, title: t.title ?? t.id, states, ids, transitions, xs: mine, c: count(mine), stale: mine.filter((x) => x.stale).length, groups };
  });
  return { types, all, stale, groupBy, subBy, historySource: p.historySource ?? null };
}

function act(m, ui, what, a) {
  const T = m.types[ui.t];
  if (what === "view") { ui.view = VIEWS[a[0]]?.[0] ?? "machine"; ui.sel = null; ui.page = 0; }
  else if (what === "type") { ui.t = a[0]; ui.sel = null; ui.page = 0; ui.open = new Set(m.types[a[0]]?.groups[0] ? [m.types[a[0]].groups[0].id] : []); ui.more = {}; ui.rows = {}; }
  else if (what === "sel") { // [state index | -1, group index | -1, subgroup index | -1]
    const [si, gi, sgi] = a, g = T.groups[gi], sg = g?.subs[sgi];
    const sel = { s: T.ids[si] ?? null, g: g?.id ?? null, sg: sg ? sg.id ?? "" : undefined };
    const same = ui.sel && ui.sel.s === sel.s && ui.sel.g === sel.g && ui.sel.sg === sel.sg;
    ui.sel = same ? null : sel; ui.page = 0;
  }
  else if (what === "row") { const id = T.groups[a[0]]?.id; if (id != null) ui.rows[id] = !ui.rows[id]; }
  else if (what === "close") ui.sel = null;
  else if (what === "page") ui.page = Math.max(0, ui.page + a[0]);
  else if (what === "open") { const id = T.groups[a[0]]?.id; if (id != null) ui.open.has(id) ? ui.open.delete(id) : ui.open.add(id); }
  else if (what === "more") { const k = `${a[0]}:${a[1]}`; ui.more[k] = (ui.more[k] ?? PAGE) + PAGE; }
  else if (what === "pick") { ui.pick = a[0]; ui.view = "search"; ui.q = m.all[a[0]]?.it.title ?? ui.q; }
}

// ------------------------------------------------------------ the page
function draw(m, ui, esc) {
  const T = m.types[ui.t], total = m.all.length, stale = m.all.filter((x) => x.stale).length;
  const tabs = `<div class="tabs" role="tablist">${VIEWS.map(([v, label], i) => `<button class="tab${ui.view === v ? " on" : ""}" role="tab" aria-selected="${ui.view === v}" onclick="__hqPipeline.act('view',${i})">${label}</button>`).join("")}</div>`;
  const typePills = ui.view === "search" || m.types.length < 2 ? "" : `<div class="filters">${m.types.map((t, i) => `<button class="pill${i === ui.t ? " on" : ""}" onclick="__hqPipeline.act('type',${i})">${esc(t.title)} <span class="k">${t.xs.length}</span></button>`).join("")}</div>`;
  const body = ui.view === "kanban" ? kanban(m, T, ui, esc) : ui.view === "groups" ? table(m, T, ui, esc) : ui.view === "search" ? search(m, ui, esc) : machine(m, T, ui, esc);
  const drill = ui.sel && ui.view !== "search" && ui.view !== "kanban" ? drilldown(m, T, ui, esc) : "";
  return `<h1>Pipeline</h1><div class="sub1">${m.types.length} content type${m.types.length === 1 ? "" : "s"} · ${total} items · ${stale} not moved in ${m.stale}+ days · grouped by ${esc(m.groupBy)}</div>${tabs}${typePills}${body}${drill}`;
}

const KIND = { maker: "maker", check: "check", owner: "owner" };
const cut = (s, n) => { s = String(s ?? ""); return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s; };

/** (a) The state machine: nodes left to right on the forward path, off-path states (revise) on a row below. */
function machine(m, T, ui, esc) {
  const fwd = T.transitions.filter((x) => x.kind !== "back"), onPath = new Set(fwd.flatMap((x) => [x.from, x.to]));
  if (!fwd.length) T.ids.forEach((id) => onPath.add(id));
  const main = T.ids.filter((id) => onPath.has(id)), pos = {};
  const W0 = 128, H0 = 86, GAP = 156, X0 = 18, Y0 = 88, ROW2 = Y0 + H0 + 66;
  main.forEach((id, i) => (pos[id] = { x: X0 + i * GAP, y: Y0, row: 0 }));
  T.ids.forEach((id, i) => { if (pos[id]) return; const prev = T.ids.slice(0, i).reverse().find((x) => pos[x]?.row === 0); pos[id] = { x: (prev ? pos[prev].x : X0) + GAP / 2, y: ROW2, row: 1 }; });
  const hasRow2 = T.ids.some((id) => pos[id].row === 1), skips = T.transitions.some((x) => x.kind === "skip");
  const W = Math.max(...T.ids.map((id) => pos[id].x)) + W0 + X0;
  const H = (hasRow2 ? ROW2 + H0 : Y0 + H0) + (skips ? 46 : 18);
  const cx = (id) => pos[id].x + W0 / 2;
  const edge = (e, k) => {
    const a = pos[e.from], b = pos[e.to], cls = `pl-e pl-e-${e.kind}`, mk = `url(#pl-m-${e.kind}-${ui.t})`;
    let d;
    if (a.row === b.row && a.row === 0 && e.kind === "forward" && Math.abs(main.indexOf(e.to) - main.indexOf(e.from)) === 1) d = `M${a.x + W0} ${a.y + H0 / 2}H${b.x - 3}`;
    else if (a.row === b.row && e.kind === "skip") { const y = a.y + H0, dep = 34; d = `M${cx(e.from)} ${y}C${cx(e.from)} ${y + dep},${cx(e.to)} ${y + dep},${cx(e.to)} ${y + 3}`; }
    else if (a.row === b.row) { // a back (or long forward) edge on one row: an arc over the top, higher for a longer span
      const span = Math.abs(main.indexOf(e.to) - main.indexOf(e.from)), h = 22 + Math.min(4, span) * 13, y = a.y, off = e.kind === "back" ? -8 : 8;
      d = `M${cx(e.from) + off} ${y}C${cx(e.from) + off} ${y - h},${cx(e.to) - off} ${y - h},${cx(e.to) - off} ${y - 3}`;
    } else { // between the rows
      const down = a.row < b.row, o = T.ids.indexOf(e.from) < T.ids.indexOf(e.to) ? 14 : -14;
      const x1 = cx(e.from) + o, y1 = down ? a.y + H0 : a.y, x2 = cx(e.to) + o, y2 = down ? b.y - 3 : b.y + H0 + 3;
      const far = Math.abs(x2 - x1) > GAP * 0.9, my = far ? Math.max(y1, y2) + 34 : (y1 + y2) / 2;
      d = `M${x1} ${y1}C${x1} ${my},${x2} ${my},${x2} ${y2}`;
    }
    return `<path d="${d}" class="${cls}" marker-end="${mk}"><title>${esc(`${title(T, e.from)} → ${title(T, e.to)} (${e.kind})${e.label ? `: ${e.label}` : ""}`)}</title></path>`;
  };
  const node = (s, si) => {
    const full = String(s.title ?? s.id), br = full.indexOf(" ("), head = br > 0 ? full.slice(0, br) : full, paren = br > 0 ? full.slice(br + 1) : "";
    const p = pos[s.id], c = T.c[s.id] ?? { n: 0, stale: 0 }, on = ui.sel && ui.sel.s === s.id && ui.sel.g == null, kind = KIND[s.kind] ?? "other";
    return `<g class="pl-n pl-k-${kind}${on ? " on" : ""}" tabindex="0" role="button" onclick="__hqPipeline.act('sel',${si},-1,-1)" onkeydown="if(event.key==='Enter')__hqPipeline.act('sel',${si},-1,-1)"><title>${esc(`${s.title ?? s.id} · ${s.owner ?? "no owner"} · ${s.kind ?? ""}${s.what ? `\n${s.what}` : ""}\n${c.n} items${c.stale ? `, ${c.stale} stale` : ""}`)}</title>
      <rect x="${p.x}" y="${p.y}" width="${W0}" height="${H0}" rx="10" class="pl-box"/><rect x="${p.x}" y="${p.y}" width="5" height="${H0}" rx="2" class="pl-strip"/>
      <text x="${p.x + 13}" y="${p.y + 19}" class="pl-tt">${esc(cut(head, 16))}</text>${paren ? `<text x="${p.x + 13}" y="${p.y + 32}" class="pl-pa">${esc(cut(paren, 23))}</text>` : ""}
      <text x="${p.x + 13}" y="${p.y + (paren ? 47 : 37)}" class="pl-ow">${esc(cut(s.owner ?? "", 19))}</text>
      ${c.stale ? `<text x="${p.x + 13}" y="${p.y + 63}" class="pl-sc">${c.stale} stale</text>` : ""}
      <text x="${p.x + 13}" y="${p.y + 77}" class="pl-kd">${esc(s.kind ?? "")}</text>
      <text x="${p.x + W0 - 10}" y="${p.y + 77}" text-anchor="end" class="pl-ct">${c.n}</text></g>`;
  };
  const defs = ["forward", "back", "skip"].map((k) => `<marker id="pl-m-${k}-${ui.t}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="pl-mk-${k}"/></marker>`).join("");
  const svg = `<svg class="pl-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="min-width:${Math.round(W * 0.82)}px" role="img" aria-label="${esc(`${T.title}: state machine with ${T.ids.length} states`)}"><defs>${defs}</defs>${T.transitions.map(edge).join("")}${T.states.map(node).join("")}</svg>`;
  const nk = (k) => T.transitions.filter((x) => x.kind === k).length;
  const legend = `<div class="pl-legend k"><span><i class="pl-lf"></i>forward ${nk("forward")}</span><span><i class="pl-lb"></i>back ${nk("back")}</span>${nk("skip") ? `<span><i class="pl-ls"></i>skip ${nk("skip")}</span>` : ""}<span><b class="pl-dot pl-k-maker"></b>maker</span><span><b class="pl-dot pl-k-check"></b>check</span><span><b class="pl-dot pl-k-owner"></b>owner</span><span>click a state to list its items</span></div>`;
  const list = `<details class="pl-tr"><summary class="k">${T.transitions.length} transitions: what moves an item</summary><table><tr><th>from</th><th>to</th><th>kind</th><th>when</th></tr>${T.transitions.map((e) => `<tr><td>${esc(title(T, e.from))}</td><td>${esc(title(T, e.to))}</td><td><span class="chip pl-c-${esc(e.kind)}">${esc(e.kind)}</span></td><td class="k">${esc(e.label ?? "")}</td></tr>`).join("")}</table></details>`;
  return `<h2 class="pl-h2">${esc(T.title)} <span class="k">${T.xs.length} items · ${T.stale} stale</span></h2><div class="k pl-hint">swipe the diagram sideways for every state</div><div class="pl-scroll">${svg}</div>${legend}${list}`;
}
const title = (T, id) => T.states.find((s) => s.id === id)?.title ?? id;

/** (b) The category × state table; a row expands to its strands. Cells and rows open the drill-down. */
function table(m, T, ui, esc) {
  if (!T.groups.length) return `<div class="empty">No items of this type.</div>`;
  const cell = (c, si, gi, sgi) => { const x = c[T.ids[si]] ?? { n: 0, stale: 0 }, on = isSel(ui, T, si, gi, sgi);
    return x.n ? `<td class="pl-cell${on ? " on" : ""}" onclick="__hqPipeline.act('sel',${si},${gi},${sgi})" title="${x.n} items${x.stale ? `, ${x.stale} stale` : ""}"><b>${x.n}</b>${x.stale ? `<span class="pl-st">${x.stale}</span>` : ""}</td>` : `<td class="pl-cell pl-0">·</td>`; };
  const row = (g, gi) => { const open = !!ui.rows[g.id];
    const head = `<tr class="pl-g"><td class="pl-name"><button class="tog" onclick="__hqPipeline.act('row',${gi})" aria-label="${open ? "collapse" : "expand"}">${g.subs.length > 1 || g.subs[0]?.id != null ? (open ? "▾" : "▸") : ""}</button><a onclick="__hqPipeline.act('sel',-1,${gi},-1)"><b>${esc(g.title)}</b></a> <span class="k">${((n) => (n ? `${n} ${esc(m.subBy)}${n === 1 ? "" : "s"}` : ""))(g.subs.filter((s) => s.id != null).length)}</span></td>${T.ids.map((_, si) => cell(g.c, si, gi, -1)).join("")}<td class="pl-cell pl-tot" onclick="__hqPipeline.act('sel',-1,${gi},-1)"><b>${g.xs.length}</b>${g.stale ? `<span class="pl-st">${g.stale}</span>` : ""}</td></tr>`;
    const subs = open ? g.subs.map((s, sgi) => `<tr class="pl-sub"><td class="pl-name"><a onclick="__hqPipeline.act('sel',-1,${gi},${sgi})">${esc(s.title)}</a></td>${T.ids.map((_, si) => cell(s.c, si, gi, sgi)).join("")}<td class="pl-cell pl-tot" onclick="__hqPipeline.act('sel',-1,${gi},${sgi})"><b>${s.xs.length}</b>${s.stale ? `<span class="pl-st">${s.stale}</span>` : ""}</td></tr>`).join("") : "";
    return head + subs; };
  const totals = `<tr class="pl-g pl-all"><td class="pl-name"><b>All</b></td>${T.ids.map((id, si) => { const x = T.c[id]; return x.n ? `<td class="pl-cell" onclick="__hqPipeline.act('sel',${si},-1,-1)"><b>${x.n}</b>${x.stale ? `<span class="pl-st">${x.stale}</span>` : ""}</td>` : `<td class="pl-cell pl-0">·</td>`; }).join("")}<td class="pl-cell pl-tot"><b>${T.xs.length}</b>${T.stale ? `<span class="pl-st">${T.stale}</span>` : ""}</td></tr>`;
  return `<div class="k pl-note">One row per ${esc(m.groupBy)}; ▸ opens its ${esc(m.subBy)}s. A cell is the items in that state; <span class="pl-st">n</span> of them have not moved in ${m.stale}+ days. Click a cell or a name to list them.</div>
    <div class="tscroll"><table class="pl-tab"><tr><th>${esc(m.groupBy)}</th>${T.states.map((s) => `<th title="${esc(`${s.owner ?? ""} · ${s.kind ?? ""}`)}">${esc(s.title ?? s.id)}</th>`).join("")}<th>total</th></tr>${T.groups.map(row).join("")}${totals}</table></div>`;
}
const isSel = (ui, T, si, gi, sgi) => { const g = T.groups[gi], sg = g?.subs[sgi]; return !!ui.sel && ui.sel.s === (T.ids[si] ?? null) && ui.sel.g === (g?.id ?? null) && ui.sel.sg === (sg ? sg.id ?? "" : undefined); };

/** The items behind a node, cell or row: stale first, then the longest wait, 25 at a time. */
function drilldown(m, T, ui, esc) {
  const { s, g, sg } = ui.sel;
  const xs = T.xs.filter((x) => (s == null || x.it.state === s) && (g == null || x.g === g) && (sg === undefined || (x.sg ?? "") === sg)).sort(order);
  const grp = T.groups.find((x) => x.id === g), sub = grp?.subs.find((x) => (x.id ?? "") === sg);
  const what = [s != null ? title(T, s) : null, grp?.title, sub?.title].filter(Boolean).join(" · ") || T.title;
  const pages = Math.max(1, Math.ceil(xs.length / PAGE)); if (ui.page >= pages) ui.page = pages - 1;
  const from = ui.page * PAGE, shown = xs.slice(from, from + PAGE), st = xs.filter((x) => x.stale).length;
  const nav = xs.length > PAGE ? `<div class="pl-pager"><button class="pill" ${ui.page ? "" : "disabled"} onclick="__hqPipeline.act('page',-1)">‹ previous</button><span class="k">${from + 1}–${from + shown.length} of ${xs.length}</span><button class="pill" ${ui.page + 1 < pages ? "" : "disabled"} onclick="__hqPipeline.act('page',1)">next ›</button></div>` : "";
  return `<div class="card pl-drill" id="pl-drill"><div class="pl-dh"><b>${esc(what)}</b><span class="k">${xs.length} items${st ? ` · <span class="pl-warn">${st} stale</span>` : ""} · stale first</span><button class="pill" style="margin-left:auto" onclick="__hqPipeline.act('close')">close</button></div>
    ${xs.length ? `<div class="pl-cards">${shown.map((x) => card(m, T, x, esc)).join("")}</div>${nav}` : `<div class="empty">No items here.</div>`}</div>`;
}
const order = (a, b) => (b.stale - a.stale) || ((b.age ?? -1) - (a.age ?? -1)) || String(a.it.title ?? a.it.id).localeCompare(String(b.it.title ?? b.it.id));

/** The item card: the drill-down and the kanban share it. */
function card(m, T, x, esc) {
  const it = x.it, w = it.waitingOn ?? [], grp = T.groups.find((g) => g.id === x.g), sub = grp?.subs.find((s) => (s.id ?? "") === (x.sg ?? ""));
  return `<div class="pl-card${x.stale ? " stale" : ""}"><a class="pl-ct2" onclick="__hqPipeline.act('pick',${x.n})" title="show its path">${esc(it.title ?? it.id)}</a>
    <div class="k">${esc(grp?.title ?? x.g)}${sub?.id != null ? ` · ${esc(sub.title)}` : ""} · ${esc(title(T, it.state))}${it.version != null ? ` · v${esc(it.version)}` : ""}${x.age != null ? ` · ${x.age} d here` : ""}${x.stale ? ` · <b class="pl-warn">stale</b>` : ""}</div>
    ${w.length ? `<div class="pl-wait"><span class="k">waits on</span> ${esc(cut(w[0], 140))}${w.length > 1 ? ` <span class="k">+${w.length - 1} more</span>` : ""}</div>` : `<div class="k">waits on nothing</div>`}</div>`;
}

/** Kanban: one collapsible section per group, its states as columns, at most 25 cards a column until "show more". */
function kanban(m, T, ui, esc) {
  if (!T.groups.length) return `<div class="empty">No items of this type.</div>`;
  const sec = (g, gi) => {
    const open = ui.open.has(g.id);
    const chips = T.states.filter((s) => g.c[s.id]?.n).map((s) => `<span class="chip">${esc(s.title ?? s.id)} ${g.c[s.id].n}${g.c[s.id].stale ? ` <b class="pl-warn">${g.c[s.id].stale}</b>` : ""}</span>`).join(" ");
    const head = `<button class="lhead" onclick="__hqPipeline.act('open',${gi})" aria-expanded="${open}"><span class="caret">${open ? "▾" : "▸"}</span><b>${esc(g.title)}</b><span class="k">${g.xs.length} items${g.stale ? ` · <span class="pl-warn">${g.stale} stale</span>` : ""}</span><span class="pl-chips">${chips}</span></button>`;
    if (!open) return `<div class="lgroup">${head}</div>`;
    const empty = T.states.filter((s) => !g.c[s.id]?.n);
    const cols = T.states.map((s, si) => {
      if (!g.c[s.id]?.n) return "";
      const xs = g.xs.filter((x) => x.it.state === s.id).sort(order), n = ui.more[`${gi}:${si}`] ?? PAGE;
      return `<div class="pl-col"><div class="pl-colh"><b>${esc(s.title ?? s.id)}</b> <span class="k">${xs.length}</span><div class="k">${esc(s.owner ?? "")}${s.kind ? ` · ${esc(s.kind)}` : ""}</div></div>${xs.slice(0, n).map((x) => card(m, T, x, esc)).join("")}${xs.length > n ? `<button class="pill pl-more" onclick="__hqPipeline.act('more',${gi},${si})">show ${Math.min(PAGE, xs.length - n)} more <span class="k">(${xs.length - n} left)</span></button>` : ""}</div>`;
    }).join("");
    return `<div class="lgroup">${head}<div class="pl-cols">${cols}</div>${empty.length ? `<div class="k pl-note">no items in ${empty.map((s) => esc(s.title ?? s.id)).join(", ")}</div>` : ""}</div>`;
  };
  return `<div class="k pl-note">One section per ${esc(m.groupBy)}, its states as columns; stale first, ${PAGE} a column at a time. Click a title for its path.</div>${T.groups.map(sec).join("")}`;
}

/** (d) Search: an item's path through its states, with dates where the records hold them, and what it waits on now. */
function search(m, ui, esc) {
  const it = ui.pick != null ? m.all[ui.pick] : null;
  return `<input class="search" placeholder="search an item by title or id" value="${esc(ui.q)}" oninput="__hqPipeline.q(this.value)" aria-label="search items">
    <div id="pl-results">${it ? "" : results(m, ui, esc)}</div>${it ? path(m, it, esc) : ""}`;
}
function results(m, ui, esc) {
  const q = ui.q.trim().toLowerCase();
  if (!q) return `<div class="empty">Type part of a title or an id to see that item's path.</div>`;
  const hits = m.all.filter((x) => String(x.it.title ?? "").toLowerCase().includes(q) || String(x.it.id ?? "").toLowerCase().includes(q));
  if (!hits.length) return `<div class="empty">No item matches.</div>`;
  const T = (x) => m.types.find((t) => t.id === x.it.type);
  return `<div class="k pl-note">${hits.length} match${hits.length === 1 ? "" : "es"}${hits.length > 20 ? "; the first 20" : ""}</div><table><tr><th>item</th><th>state</th><th>since</th></tr>${hits.slice(0, 20).map((x) => `<tr class="click" onclick="__hqPipeline.act('pick',${x.n})"><td><b>${esc(x.it.title ?? x.it.id)}</b><div class="k">${esc(x.it.id)}</div></td><td><span class="chip">${esc(T(x) ? title(T(x), x.it.state) : x.it.state)}</span>${x.stale ? ` <b class="pl-warn">stale</b>` : ""}</td><td class="k nowrap">${esc(x.it.since ?? "")}</td></tr>`).join("")}</table>`;
}
function path(m, x, esc) {
  const T = m.types.find((t) => t.id === x.it.type) ?? m.types[0], it = x.it;
  const hist = Array.isArray(it.history) && it.history.length ? it.history : [{ state: it.state, since: it.since ?? null }];
  // what is still ahead: the forward path from the current state
  // (an off-path state such as revise goes on by its first way out, then the forward path)
  const ahead = []; let cur = it.state;
  const onPath = (id) => T.transitions.some((e) => e.kind !== "back" && (e.from === id || e.to === id));
  for (let k = 0; k < T.ids.length; k++) {
    const out = T.transitions.filter((e) => e.from === cur), nx = out.find((e) => e.kind === "forward") ?? (k === 0 && !onPath(cur) ? out[0] : null);
    if (!nx || nx.to === it.state || ahead.includes(nx.to)) break; ahead.push(nx.to); cur = nx.to;
  }
  const step = (s, i, last) => `<li class="pl-step${last ? " now" : ""}"><b>${esc(title(T, s.state))}</b><span class="k">${s.since ? esc(s.since) : "date not recorded"}</span>${last ? `<span class="chip">now${x.age != null ? ` · ${x.age} d` : ""}</span>` : ""}</li>`;
  const grp = T.groups.find((g) => g.id === x.g), sub = grp?.subs.find((s) => (s.id ?? "") === (x.sg ?? ""));
  const list = (label, xs) => (xs?.length ? `<div class="k" style="margin-top:10px">${label}</div><ul class="pl-ul">${xs.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : "");
  return `<div class="card pl-path"><div class="pl-dh"><b>${esc(it.title ?? it.id)}</b><span class="k">${esc(it.id)}</span><button class="pill" style="margin-left:auto" onclick="__hqPipeline.act('pick',null)">back to results</button></div>
    <div class="k">${esc(T.title)} · ${esc(grp?.title ?? x.g)}${sub?.id != null ? ` · ${esc(sub.title)}` : ""}${it.version != null ? ` · v${esc(it.version)}` : ""}${it.status ? ` · status ${esc(it.status)}` : ""}${it.deployedIn ? ` · live in ${esc(it.deployedIn)}` : ""}${x.stale ? ` · <b class="pl-warn">stale</b>` : ""}</div>
    <ol class="pl-steps">${hist.map((s, i) => step(s, i, i === hist.length - 1)).join("")}${ahead.map((s) => `<li class="pl-step ahead"><b>${esc(title(T, s))}</b><span class="k">ahead</span></li>`).join("")}</ol>
    ${it.history ? "" : `<div class="k">This company's records give only the current state's date.</div>`}
    ${(it.waitingOn ?? []).length ? list("waits on now", it.waitingOn) : `<div class="k" style="margin-top:10px">waits on nothing</div>`}${list("gaps (reported, not waited on)", it.gaps)}${list("notes", it.notes)}
    ${m.historySource && it.history ? `<div class="k" style="margin-top:10px">the path rests on: ${esc(m.historySource)}</div>` : ""}</div>`;
}

const STYLE = `<style>
#pl-root .pl-h2 { font-size:15px; margin:4px 0 8px; } #pl-root .pl-note { margin:0 0 8px; }
#pl-root .pl-scroll { overflow-x:auto; background:var(--panel); border:1px solid var(--line); border-radius:10px; -webkit-overflow-scrolling:touch; }
#pl-root .pl-svg { display:block; width:100%; height:auto; }
#pl-root .pl-n { cursor:pointer; outline:none; } #pl-root .pl-box { fill:var(--panel); stroke:var(--line); stroke-width:1.5; } #pl-root .pl-n:hover .pl-box, #pl-root .pl-n:focus .pl-box { stroke:var(--accent); }
#pl-root .pl-n.on .pl-box { stroke:var(--accent); stroke-width:3; fill:color-mix(in srgb, var(--accent) 8%, var(--panel)); }
#pl-root .pl-k-maker .pl-strip, #pl-root .pl-dot.pl-k-maker { fill:var(--accent); background:var(--accent); } #pl-root .pl-k-check .pl-strip, #pl-root .pl-dot.pl-k-check { fill:var(--warn); background:var(--warn); }
#pl-root .pl-k-owner .pl-strip, #pl-root .pl-dot.pl-k-owner { fill:var(--good); background:var(--good); } #pl-root .pl-k-other .pl-strip { fill:var(--muted); }
#pl-root .pl-tt { font-size:12.5px; font-weight:650; fill:var(--text); } #pl-root .pl-ow { font-size:10.5px; fill:var(--muted); } #pl-root .pl-pa { font-size:10px; fill:var(--muted); font-style:italic; } #pl-root .pl-kd { font-size:9.5px; letter-spacing:.06em; text-transform:uppercase; fill:var(--muted); }
#pl-root .pl-ct { font-size:20px; font-weight:700; fill:var(--text); font-variant-numeric:tabular-nums; } #pl-root .pl-sc { font-size:10px; font-weight:650; fill:var(--warn); }
#pl-root .pl-e { fill:none; stroke-width:1.6; } #pl-root .pl-e-forward { stroke:var(--muted); } #pl-root .pl-e-back { stroke:var(--bad); stroke-dasharray:5 4; } #pl-root .pl-e-skip { stroke:var(--muted); stroke-dasharray:1.5 4; stroke-linecap:round; }
#pl-root .pl-mk-forward, #pl-root .pl-mk-skip { fill:var(--muted); } #pl-root .pl-mk-back { fill:var(--bad); }
#pl-root .pl-legend { display:flex; flex-wrap:wrap; gap:6px 14px; align-items:center; margin:8px 2px; } #pl-root .pl-legend span { display:inline-flex; align-items:center; gap:5px; }
#pl-root .pl-legend i { display:inline-block; width:22px; height:0; border-top:2px solid var(--muted); } #pl-root .pl-legend i.pl-lb { border-top:2px dashed var(--bad); } #pl-root .pl-legend i.pl-ls { border-top:2px dotted var(--muted); }
#pl-root .pl-dot { display:inline-block; width:9px; height:9px; border-radius:3px; }
#pl-root .pl-tr { margin:4px 0 14px; } #pl-root .pl-tr summary { cursor:pointer; padding:4px 2px; } #pl-root .pl-tr table { margin-top:6px; } #pl-root .chip.pl-c-back { color:var(--bad); }
#pl-root .tscroll { overflow-x:auto; -webkit-overflow-scrolling:touch; } #pl-root table.pl-tab { min-width:640px; } #pl-root .pl-tab th { white-space:nowrap; } #pl-root .pl-tab th:first-child, #pl-root .pl-tab td:first-child { position:sticky; left:0; z-index:1; background:var(--panel); box-shadow:1px 0 0 var(--line); } #pl-root .pl-tab th:first-child { background:var(--side); } #pl-root .pl-sub td:first-child { background:var(--side); }
#pl-root .pl-cell { cursor:pointer; text-align:right; font-variant-numeric:tabular-nums; white-space:nowrap; } #pl-root .pl-cell:hover, #pl-root .pl-cell.on { background:color-mix(in srgb, var(--accent) 12%, var(--panel)); }
#pl-root .pl-cell.pl-0 { cursor:default; color:var(--muted); background:none; } #pl-root .pl-tot { border-left:1px solid var(--line); }
#pl-root .pl-st { display:inline-block; margin-left:5px; padding:0 5px; border-radius:999px; font-size:11px; font-weight:650; color:var(--text); background:color-mix(in srgb, var(--warn) 30%, var(--chip)); }
#pl-root .pl-name { white-space:normal; min-width:130px; max-width:210px; overflow-wrap:anywhere; } #pl-root .pl-name .tog { padding:0; width:18px; } #pl-root .pl-name a { cursor:pointer; } #pl-root .pl-name a:hover { color:var(--accent); } #pl-root .pl-sub td { background:var(--side); } #pl-root .pl-sub .pl-name { padding-left:38px; } #pl-root .pl-all td { border-top:2px solid var(--line); }
#pl-root .pl-warn { color:var(--warn); }
#pl-root .pl-drill, #pl-root .pl-path { margin-top:14px; } #pl-root .pl-dh { display:flex; flex-wrap:wrap; gap:8px; align-items:baseline; margin-bottom:10px; }
#pl-root .pl-cards { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:8px; }
#pl-root .pl-card { background:var(--panel); border:1px solid var(--line); border-left:3px solid var(--line); border-radius:8px; padding:8px 10px; min-width:0; overflow-wrap:anywhere; } #pl-root .pl-card.stale { border-left-color:var(--warn); }
#pl-root .pl-ct2 { font-weight:600; cursor:pointer; color:var(--text); } #pl-root .pl-ct2:hover { color:var(--accent); text-decoration:underline; } #pl-root .pl-wait { font-size:12.5px; margin-top:3px; }
#pl-root .pl-pager { display:flex; gap:10px; align-items:center; justify-content:center; margin-top:10px; } #pl-root .pill[disabled] { opacity:.45; cursor:default; }
#pl-root .lhead { flex-wrap:wrap; } #pl-root .pl-chips { display:flex; flex-wrap:wrap; gap:4px; margin-left:auto; } #pl-root .pl-chips .chip { font-size:11px; }
#pl-root .pl-cols { display:flex; gap:8px; overflow-x:auto; padding:2px 2px 10px; margin-bottom:6px; -webkit-overflow-scrolling:touch; }
#pl-root .pl-col { flex:0 0 240px; background:var(--side); border:1px solid var(--line); border-radius:10px; padding:8px; display:flex; flex-direction:column; gap:6px; } #pl-root .pl-colh { margin:0 2px 2px; } #pl-root .pl-more { align-self:center; } #pl-root .pl-none { padding:4px 2px; }
#pl-root .pl-steps { list-style:none; display:flex; flex-wrap:wrap; gap:6px; padding:0; margin:12px 0 4px; }
#pl-root .pl-step { display:flex; flex-direction:column; gap:2px; padding:7px 12px; border:1px solid var(--line); border-radius:10px; background:var(--side); position:relative; min-width:110px; }
#pl-root .pl-step:not(:last-child)::after { content:"→"; position:absolute; right:-14px; top:50%; transform:translateY(-50%); color:var(--muted); font-size:12px; }
#pl-root .pl-step { margin-right:10px; } #pl-root .pl-step.now { border-color:var(--accent); background:color-mix(in srgb, var(--accent) 10%, var(--panel)); } #pl-root .pl-step.ahead { border-style:dashed; opacity:.7; }
#pl-root .pl-ul { margin:4px 0 0 18px; padding:0; } #pl-root .pl-ul li { margin:2px 0; overflow-wrap:anywhere; }
#pl-root .pl-hint { display:none; margin:0 0 6px; }
@media (max-width:760px) { #pl-root .pl-hint { display:block; } #pl-root .pl-cards { grid-template-columns:1fr; } #pl-root .pl-col { flex-basis:78vw; } #pl-root .pl-chips { margin-left:0; } }
</style>`;
