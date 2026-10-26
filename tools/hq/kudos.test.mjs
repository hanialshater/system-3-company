// System 3 Company's kudos in the city HQ (2026-10-26): a kudos (tools/kudos.mjs, company/ops/events.jsonl) is the city's
// v1 kudos event as well as a note, the copied Kudos page groups them, and the dashboard carries company/logo.svg.
//   node --test tools/hq/kudos.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { toV1 } from "./hq-events.mjs";
import { dashboard } from "./hq-dashboard.mjs";
import { render, kudosList, refLink } from "./kudos.js";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const K = { id: "kudos-1", ts: "2026-10-13T23:54:12.318Z", type: "kudos", room: "lobby", actor: "chief-of-staff", summary: "🔍 chief-of-staff → fact-checker: caught the float leak", subjects: ["fact-checker"], refs: ["company/reviews/x/fact-check.md"], body: "caught the float leak" };

test("a kudos stays a note and is also the city's kudos event: from, to, for, refs", () => {
  const [note, k] = toV1(K);
  assert.equal(note.type, "note"); assert.equal(note.kind, "kudos");
  assert.deepEqual({ type: k.type, by: k.by, from: k.from, to: k.to, for: k.for, refs: k.refs, emoji: k.emoji, id: k.id }, { type: "kudos", by: "chief-of-staff", from: "chief-of-staff", to: "fact-checker", for: "caught the float leak", refs: ["company/reviews/x/fact-check.md"], emoji: "🔍", id: "kudos-1:kudos" });
  assert.equal(toV1({ ...K, summary: "plain" })[1].emoji, undefined);
});

test("the Kudos page groups by recipient, links each record on GitHub, and says so when there are none", () => {
  const ev = [toV1(K)[1], toV1({ ...K, id: "kudos-2", ts: "2026-10-20T00:00:00Z", subjects: ["writer"], body: "a clean draft" })[1]];
  assert.equal(kudosList(ev).length, 2);
  const html = render({ events: ev, esc, company: { id: "system-3-company", repo: "hanialshater/system-3-company" } });
  assert.match(html, /2 kudos/); assert.match(html, /fact-checker/);
  assert.equal(refLink("company/x.md", "hanialshater/system-3-company"), "https://github.com/hanialshater/system-3-company/blob/main/company/x.md");
  assert.equal(refLink("../x.md", "o/r"), null);
  assert.match(render({ events: [], esc, company: null }), /No kudos yet/);
});

test("the dashboard carries the company's logo (company/logo.svg) as a data URI", () => {
  assert.match(dashboard(ROOT).logo, /^data:image\/svg\+xml;base64,/);
});
