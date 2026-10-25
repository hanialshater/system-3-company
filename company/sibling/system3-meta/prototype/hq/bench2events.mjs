// Meta research, not part of the starter: reads a benchmark org (bench11-13's runs dir: _org/status.json, lands.jsonl, notes-log.jsonl, board.jsonl, spend.json
// and _operator/O/ledger.jsonl) as v1 crew events (crew.mjs), so the starter HQ can show the benchmarks' orgs live.
import fs from "node:fs";
import path from "node:path";

const J = (f, d) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return d; } };
const L = (f) => { try { return fs.readFileSync(f, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } };

export function benchEvents(runs) {
  const org = path.join(runs, "_org"), led = L(path.join(runs, "_operator", "O", "ledger.jsonl")), st = J(path.join(org, "status.json"), {}), ev = [];
  const start = led.find((x) => x.event === "start"), first = st.lands?.[0];
  // members: from the org's member folders (arms/O-m-*), so a run that has just started shows them; models from their org.json
  let ids = []; try { ids = fs.readdirSync(path.join(runs, "arms")).filter((d) => d.startsWith("O-m-")).map((d) => d.slice(2)); } catch {}
  const members = ids.map((id) => ({ id, model: led.find((x) => x.event === "turn" && x.label?.startsWith(`O ${id} `))?.model ?? null }));
  if (start) ev.push({ v: 1, t: start.t, type: "crew.start", by: "operator", rate: first?.before ?? st.rate ?? 0, budget: start.caps?.cost ?? null, minutes: start.caps?.min ?? null, members });
  for (const l of st.lands ?? []) ev.push({ v: 1, t: l.t, type: "land", by: l.by, head: l.head, before: l.before, after: l.after, msg: l.msg ?? "" });
  for (const r of st.refused ?? []) ev.push({ v: 1, t: r.t, type: "land.refused", by: r.by, head: r.head, why: r.why });
  for (const n of L(path.join(org, "notes-log.jsonl"))) for (const to of n.to === "all" ? members.map((m) => m.id).filter((m) => m !== n.from) : [n.to]) ev.push({ v: 1, t: n.t, type: "note", by: n.from, to, text: n.text, broadcast: n.to === "all" });
  for (const b of L(path.join(org, "board.jsonl"))) ev.push(b.kind === "claim" ? { v: 1, t: b.t, type: "claim", by: b.by, area: b.area, text: b.text } : b.kind === "drop" ? { v: 1, t: b.t, type: "claim.drop", by: b.by, area: b.area } : { v: 1, t: b.t, type: "board.post", by: b.by, kind: b.kind, area: b.area, text: b.text, evidence: b.evidence, wrongIf: b.wrongIf });
  for (const x of led) {
    if (x.event === "turn" && x.label?.startsWith("O m-")) ev.push({ v: 1, t: x.t, type: "spend", by: x.label.split(" ")[1], usd: x.cost ?? 0, turn: Number(x.label.split(" ")[2]) });
    if (x.event === "idle") ev.push({ v: 1, t: x.t, type: "idle", by: x.id });
    if (x.event === "wake") ev.push({ v: 1, t: x.t, type: "wake", by: x.id });
    if (x.event === "crash" || x.event === "recover") ev.push({ v: 1, t: x.t, type: x.event, by: x.id });
    if (x.event === "resume" || x.event === "continue") ev.push({ v: 1, t: x.t, type: "crew.resume", by: "operator", why: x.why ?? null });
    if (x.event === "end") ev.push({ v: 1, t: x.t, type: "crew.end", by: "operator", spent: x.cost ?? null });
  }
  return ev.sort((a, b) => Date.parse(a.t) - Date.parse(b.t));
}
