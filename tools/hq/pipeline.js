// copied from system3-city pages/pipeline @ 8ad3229; this is the company's copy: change it freely
// The pipeline (a city page template): each content type's life cycle as columns, and where every item is in it.
export function render({ dashboard, esc }) {
  const p = dashboard?.pipeline, types = p?.types ?? [], items = p?.items ?? [];
  if (!types.length) return `<h1>Pipeline</h1><div class="empty">No pipeline recorded yet (the dashboard's pipeline: content types with their states, and items).</div>`;
  const stale = p.staleDays ?? 7, now = Date.now(), age = (d) => (d ? Math.floor((now - Date.parse(d)) / 86400000) : null);
  const chip = (it) => { const a = age(it.since), old = a != null && a > stale;
    return `<div class="card" style="margin:6px 0;padding:8px${old ? ";border-color:var(--warn,#c80)" : ""}"><div style="font-weight:600">${esc(it.title ?? it.id)}</div>
      <div class="k">${it.category ? `${esc(it.category)} · ` : ""}${it.version != null ? `v${esc(it.version)} · ` : ""}${a != null ? `${a} d here${old ? " · <b>stale</b>" : ""}` : ""}</div>
      ${(it.waitingOn ?? []).length ? `<div class="k" style="margin-top:4px">waiting on: ${it.waitingOn.map(esc).join(", ")}</div>` : ""}</div>`; };
  const board = (t) => { const mine = items.filter((i) => i.type === t.id), by = Object.fromEntries(t.states.map((s) => [s.id, []]));
    for (const i of mine) (by[i.state] ??= []).push(i);
    const col = (s) => `<div style="min-width:180px;flex:1"><div class="k" style="margin-bottom:4px"><b>${esc(s.title ?? s.id)}</b> · ${by[s.id]?.length ?? 0}</div><div class="k" style="margin-bottom:6px">${esc(s.owner ?? "")}${s.kind ? ` · ${esc(s.kind)}` : ""}</div>${(by[s.id] ?? []).slice(0, 40).map(chip).join("")}${(by[s.id]?.length ?? 0) > 40 ? `<div class="k">+${by[s.id].length - 40} more</div>` : ""}</div>`;
    return `<h2>${esc(t.title ?? t.id)} <span class="k">${mine.length} items</span></h2><div style="display:flex;gap:10px;overflow-x:auto;padding-bottom:8px">${t.states.map(col).join("")}</div>`; };
  const stuck = items.filter((i) => (age(i.since) ?? 0) > stale).length;
  return `<h1>Pipeline</h1><div class="sub1">${types.length} content types · ${items.length} items · ${stuck} not moved in ${stale}+ days</div>${types.map(board).join("")}`;
}
