// copied from system3-city pages/kudos @ 5372a63; this is the company's copy: change it freely
// The kudos board (a city page template): thanks from one member (or the owner) to another, earned and specific, from
// the event log's `kudos` events ({ type: "kudos", by, from, to, for, refs }). Grouped by recipient or by week, each
// kudos with what it was for and a link to its record. Not a metric: no ranking, no score. Reads only ctx.events and
// ctx.company (its repo, to link a record path); its view state lives in memory (globalThis.__hqKudos).
const WEEK = (t) => {
  const d = new Date(String(t).slice(0, 10) + "T00:00:00Z"); if (isNaN(d)) return "undated";
  const dow = (d.getUTCDay() + 6) % 7, thu = new Date(d); thu.setUTCDate(d.getUTCDate() - dow + 3);
  const y = thu.getUTCFullYear(), jan4 = new Date(Date.UTC(y, 0, 4));
  const w = 1 + Math.round(((thu - jan4) / 86400000 - 3 + ((jan4.getUTCDay() + 6) % 7)) / 7);
  return `${y}-W${String(w).padStart(2, "0")}`;
};
/** a record's link: a URL as it is; a path in the company's repository on GitHub when its card names the repository */
export function refLink(ref, repo) {
  const r = String(ref ?? "");
  if (/^https?:\/\//.test(r)) return r;
  const m = /^([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)/.exec(String(repo ?? ""));
  return m && r && !r.startsWith("/") && !r.includes("..") ? `https://github.com/${m[1]}/blob/main/${r.replace(/^\.\//, "")}` : null;
}
export function kudosList(events = []) {
  return events.filter((e) => e.type === "kudos").map((e) => ({ t: e.t, from: e.from ?? e.by, to: e.to ?? "someone", for: e.for ?? e.text ?? "", refs: e.refs ?? [], emoji: e.emoji ?? null, week: WEEK(e.t) })).sort((a, b) => String(b.t).localeCompare(String(a.t)));
}
export function render(ctx) {
  const { events, esc, company } = ctx, ks = kudosList(events);
  if (!ks.length) return `<h1>Kudos</h1><div class="empty">No kudos yet. A kudos is a <code>kudos</code> event in the log: who thanks whom, for what, with a link to the record.</div>`;
  const G = (globalThis.__hqKudos ??= {}), key = company?.id ?? "hq", ui = (G[key] ??= { by: "recipient", open: null });
  G.set = (by) => { ui.by = by; ui.open = null; const el = globalThis.document?.getElementById("kd-root"); if (el) el.innerHTML = body(); };
  G.toggle = (i) => { const g = G.order?.[i]; ui.open = (ui.open ?? G.order?.[0]) === g ? "" : g; const el = globalThis.document?.getElementById("kd-root"); if (el) el.innerHTML = body(); };
  const item = (k) => { const links = k.refs.map((r) => { const u = refLink(r, company?.repo); return u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(r.split("/").pop())} ↗</a>` : `<code>${esc(r)}</code>`; }).join(" · ");
    return `<div class="kd-item"><div><b>${esc(k.from)}</b> <span class="k">→</span> <b>${esc(k.to)}</b> <span class="k">· ${esc(String(k.t ?? "").slice(0, 10))}</span></div><div>${esc(k.for)}</div>${links ? `<div class="k">${links}</div>` : ""}</div>`; };
  const body = () => {
    const groups = new Map(); for (const k of ks) { const g = ui.by === "week" ? k.week : k.to; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(k); }
    const order = [...groups.keys()].sort((a, b) => (ui.by === "week" ? b.localeCompare(a) : groups.get(b).length - groups.get(a).length || a.localeCompare(b)));
    const first = ui.open ?? order[0]; G.order = order;
    return `<div class="filters"><button class="pill${ui.by === "recipient" ? " on" : ""}" onclick="globalThis.__hqKudos.set('recipient')">By recipient</button><button class="pill${ui.by === "week" ? " on" : ""}" onclick="globalThis.__hqKudos.set('week')">By week</button></div>
    ${order.map((g, i) => { const xs = groups.get(g), open = g === first; return `<div class="lgroup"><button class="lhead" onclick="globalThis.__hqKudos.toggle(${i})"><span class="caret">${open ? "▾" : "▸"}</span><b>${esc(g)}</b><span class="k">${xs.length} kudos${ui.by === "week" ? ` · to ${new Set(xs.map((x) => x.to)).size}` : ` · from ${new Set(xs.map((x) => x.from)).size}`}</span></button>${open ? `<div class="kd-list">${xs.slice(0, 200).map(item).join("")}</div>` : ""}</div>`; }).join("")}`;
  };
  const STYLE = `<style>.kd-list{display:grid;gap:8px;padding:8px 0 12px}.kd-item{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:10px 12px;overflow-wrap:anywhere}.kd-item a{color:var(--accent)}</style>`;
  return `${STYLE}<h1>Kudos</h1><div class="sub1">${ks.length} kudos · ${new Set(ks.map((k) => k.to)).size} people thanked · earned and specific, never a metric</div><div id="kd-root">${body()}</div>`;
}
