// HQ session lab (W-1998): the browser port of the session composer (src/lib/hq-personalization-sandbox.ts) must
// recompute exactly what the CLI composed, for every persona x variant, with and without a drag; the "copy as code
// diff" names values that really are in model.ts; the sandbox refuses when a surprise/novelty gate is open; and the
// committed sandbox documents are the CLI's output. A drift here means the port, the reference or the model moved.
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import os from "node:os";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { parseSimRequest, cliArgs } from "../../src/lib/hq-personalization.ts";
import * as P from "../../src/lib/hq-personalization-sandbox.ts";
import { readPrecomputed, clearPrecomputedCache } from "../../src/lib/hq-personalization-precomputed.ts";
import { recompose as refRecompose } from "../../company/personalization/model/sim/sandbox-reference.mjs";
import { PERSONAS } from "../../company/personalization/model/personas.ts";

const ROOT = process.cwd();
const CLI = path.join(ROOT, "company/personalization/model/sim/hq-cli.mjs");
const cli = (...a) => JSON.parse(execFileSync(process.execPath, [CLI, ...a], { cwd: ROOT, env: { NODE_NO_WARNINGS: "1" }, maxBuffer: 256 << 20, encoding: "utf8" }));
const docs = new Map();
const docOf = (persona, variant) => { const k = `${persona}.${variant}`; if (!docs.has(k)) docs.set(k, cli("sandbox", `--persona=${persona}`, `--variant=${variant}`, "--seed=1")); return docs.get(k); };
const MODEL_TS = fs.readFileSync(path.join(ROOT, "company/personalization/model/model.ts"), "utf8");

test("requests: sandbox takes a persona id, v1 or v3, a bounded seed", () => {
  const q = (o) => new URLSearchParams(o);
  assert.deepEqual(parseSimRequest(q({ op: "sandbox", persona: "wanderer", variant: "v3" })), { op: "sandbox", persona: "wanderer", variant: "v3", seed: 1 });
  assert.deepEqual(cliArgs({ op: "sandbox", persona: "wanderer", variant: "v1", seed: 2 }), ["sandbox", "--persona=wanderer", "--variant=v1", "--seed=2"]);
  for (const bad of [{ variant: "v2" }, { variant: "" }, { variant: "v1", persona: "a;b" }, { variant: "v1", seed: "0" }, { variant: "v1", seed: "x" }])
    assert.equal(typeof parseSimRequest(q({ op: "sandbox", persona: "wanderer", ...bad })), "string", JSON.stringify(bad));
});

test("drift: the port equals the CLI's composed session for every persona x variant", () => {
  for (const p of PERSONAS) for (const v of ["v1", "v3"]) {
    const d = docOf(p.id, v), c = JSON.parse(JSON.stringify(P.recompose(d))) /* as the CLI's JSON: -0 is 0 there */, ref = d.composed, tag = `${p.id}.${v}`;
    assert.equal(P.sandboxRefusal(d), null, tag);
    assert.deepEqual(c.needs, d.needs, `${tag} needs`);
    assert.equal(c.picks.length, ref.picks.length, `${tag} picks`);
    c.picks.forEach((x, i) => {
      assert.equal(x.slug, ref.picks[i].slug, `${tag} slot ${i} slug`);
      assert.equal(x.moved, ref.picks[i].moved, `${tag} slot ${i} moved`);
      assert.equal(x.reason, ref.picks[i].reason, `${tag} slot ${i} reason`);
      assert.equal(x.score, ref.picks[i].score, `${tag} slot ${i} score (bit for bit)`);
      assert.deepEqual(c.slots[i].winnerTerms, ref.picks[i].terms, `${tag} slot ${i} terms`);
      const rs = ref.slots[i];
      assert.equal(c.slots[i].defaultCard, rs.defaultCard, `${tag} slot ${i} default`);
      assert.equal(c.slots[i].gain, ref.slots[i].candidates.find((t) => t.slug === x.slug).gain, `${tag} slot ${i} resolvable gain`);
      assert.equal(c.slots[i].margin, rs.margin, `${tag} slot ${i} margin`);
      assert.deepEqual(c.slots[i].remainingAfter, rs.remainingAfter, `${tag} slot ${i} remaining`);
      assert.deepEqual(c.slots[i].coverageAfter, rs.coverageAfter, `${tag} slot ${i} coverage`);
      assert.equal(c.slots[i].top.find((t) => t.slug === x.slug)?.score ?? x.score, ref.picks[i].score, `${tag} slot ${i} top row`);
    });
    assert.deepEqual(c.remaining, ref.remaining, `${tag} remaining`);
    assert.deepEqual(c.coverage, ref.coverage, `${tag} coverage`);
    assert.equal(c.circular.coverageRate, ref.diagnostics.coverageRate, `${tag} circular coverageRate`);
    assert.equal(c.circular.label, d.circularLabel);
  }
});

test("drift after a drag: the port equals sandbox-reference.mjs for edited curves, dampener and coefficients", () => {
  let changedSomewhere = 0;
  for (const p of PERSONAS) for (const v of ["v1", "v3"]) {
    const d = docOf(p.id, v);
    let e = P.emptyEdit(d);
    e = P.withKnot(e, { need: "repair", term: 0 }, 2, 0.95);
    e = P.withKnot(e, { need: "build", term: 0 }, 1, 0.02);
    e = P.withKnot(e, { need: "stretch", term: 1 }, 0, 0.1);
    e = P.withKnot(e, { need: "breadth", term: 0 }, 2, 0.9);
    e = P.withKnot(e, { need: "dampener", term: 0 }, 1, 0.4);
    e = P.withCoef(e, "onCov.build", 0.45); e = P.withCoef(e, "onRem.repair", 0.9); e = P.withCoef(e, "attentionCost", 0.03); e = P.withCoef(e, "slotDecay", 0.05); e = P.withCoef(e, "addrUse", 0.6);
    const c = JSON.parse(JSON.stringify(P.recompose(d, e))), r = JSON.parse(JSON.stringify(refRecompose(d, { needShapes: e.needShapes, dampener: e.dampener, coefficients: e.coefficients })));
    assert.deepEqual(c.needs, r.needs, `${p.id}.${v} needs`);
    assert.deepEqual(c.picks, r.picks, `${p.id}.${v} picks`);
    assert.deepEqual(c.remaining, r.remaining);
    assert.deepEqual(c.coverage, r.coverage);
    if (c.picks.map((x) => x.slug).join() !== P.recompose(d).picks.map((x) => x.slug).join()) changedSomewhere++;
  }
  assert.ok(changedSomewhere > 0, "the drag changes at least one persona's session (the test is not blind)");
});

test("diff: names the model.ts values, is empty when nothing moved, and carries the change rule", () => {
  const d = docOf("wanderer", "v1");
  const none = P.codeDiff(d, P.emptyEdit(d));
  assert.equal(none.changes, 0);
  assert.match(none.text, /Change rule/);
  let e = P.withKnot(P.emptyEdit(d), { need: "repair", term: 0 }, 2, 0.9);
  e = P.withKnot(e, { need: "dampener", term: 0 }, 2, 0.7);
  e = P.withCoef(e, "onCov.build", -0.25);
  const diff = P.codeDiff(d, e);
  assert.equal(diff.changes, 3);
  assert.match(diff.text, /Bump MODEL_VERSION/);
  assert.match(diff.text, /not saved, not the model/);
  for (const l of diff.text.split("\n").filter((x) => x.startsWith("-") && !x.startsWith("---"))) assert.ok(MODEL_TS.includes(l.slice(1)), `model.ts holds: ${l}`);
  // v3: a change is a row of the edit table, with "from" the v1 value
  const d3 = docOf("wanderer", "v3");
  const d3diff = P.codeDiff(d3, P.withCoef(P.emptyEdit(d3), "onCov.build", 0.5));
  assert.equal(d3diff.changes, 1);
  for (const l of d3diff.text.split("\n").filter((x) => x.startsWith("-") && !x.startsWith("---"))) assert.ok(MODEL_TS.includes(l.slice(1)), `model.ts holds: ${l}`);
  assert.match(d3diff.text, /\+ {4}\["build", "onCov", -0\.1, 0\.5,/);
});

test("knots: values clamp to 0..1 and breakpoints never move", () => {
  const d = docOf("wanderer", "v1");
  const e = P.withKnot(P.emptyEdit(d), { need: "repair", term: 0 }, 0, 1.7);
  assert.equal(e.needShapes.repair[0].vals[0], 1);
  assert.deepEqual(e.needShapes.repair[0].bps, d.needShapes.repair[0].bps);
  assert.equal(P.withKnot(e, { need: "repair", term: 0 }, 0, -3).needShapes.repair[0].vals[0], 0);
});

test("refusal: an open surprise or novelty gate (or a nonzero term) stops the sandbox", () => {
  const d = structuredClone(docOf("wanderer", "v1"));
  assert.equal(P.sandboxRefusal(d), null);
  const a = structuredClone(d); a.constraints.surpriseGateActive = true;
  assert.match(P.sandboxRefusal(a), /surprise gate is active/);
  const b = structuredClone(d); b.constraints.noveltyGateActive = true;
  assert.match(P.sandboxRefusal(b), /novelty gate/);
  const c = structuredClone(d); c.candidates[3].novelty = 0.2;
  assert.match(P.sandboxRefusal(c), /nonzero/);
  const w = structuredClone(d); w.schema = "other";
  assert.match(P.sandboxRefusal(w), /unknown sandbox schema/);
});

test("precomputed: the committed sandbox documents are the CLI's output (6 personas x v1, v3)", () => {
  const dir = path.join(ROOT, "src/data/hq-personalization");
  const m = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
  assert.equal(m.sandboxes.length, PERSONAS.length * 2);
  for (const e of m.sandboxes) {
    const stored = JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(dir, e.file))).toString("utf8"));
    assert.deepEqual(stored, docOf(e.persona, e.variant), `${e.file} is current`);
    assert.equal(P.sandboxRefusal(stored), null);
  }
});

test("reader: a listed, hash-checked sandbox document is served; unlisted or damaged ones fail closed (temp root, no regeneration needed)", () => {
  const src = path.join(ROOT, "src/data/hq-personalization");
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "hq-sandbox-"));
  try {
    const dst = path.join(root, "src/data/hq-personalization");
    fs.mkdirSync(path.join(dst, "sandbox"), { recursive: true });
    fs.copyFileSync(path.join(src, "meta.json"), path.join(dst, "meta.json"));
    const m = JSON.parse(fs.readFileSync(path.join(src, "manifest.json"), "utf8"));
    const rel = "sandbox/wanderer.v1.seed1.json.gz";
    const buf = zlib.gzipSync(Buffer.from(JSON.stringify(docOf("wanderer", "v1"))));
    fs.writeFileSync(path.join(dst, rel), buf);
    m.files = { ...m.files, "meta.json": createHash("sha256").update(fs.readFileSync(path.join(dst, "meta.json"))).digest("hex"), [rel]: createHash("sha256").update(buf).digest("hex") };
    m.sandboxes = [{ persona: "wanderer", variant: "v1", seed: 1, file: rel }];
    fs.writeFileSync(path.join(dst, "manifest.json"), JSON.stringify(m));
    clearPrecomputedCache();
    const ok = readPrecomputed({ op: "sandbox", persona: "wanderer", variant: "v1", seed: 1 }, root);
    assert.equal(ok.ok, true);
    assert.deepEqual(ok.data, docOf("wanderer", "v1"));
    const miss = readPrecomputed({ op: "sandbox", persona: "wanderer", variant: "v3", seed: 1 }, root);
    assert.equal(miss.ok, false); assert.match(miss.error, /Not precomputed/);
    fs.writeFileSync(path.join(dst, rel), Buffer.concat([buf, Buffer.from([0])]));
    clearPrecomputedCache();
    const bad = readPrecomputed({ op: "sandbox", persona: "wanderer", variant: "v1", seed: 1 }, root);
    assert.equal(bad.ok, false); assert.match(bad.error, /does not match its hash|unavailable/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); clearPrecomputedCache(); }
});
