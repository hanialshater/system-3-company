// tools/hq/lifecycle.mjs: each lesson's place in its content type's life cycle (the dashboard's pipeline).
// Fixtures for the pure rules, then today's real lessons.   node --test tools/hq/lifecycle.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { typesOf, typeFor, itemOf, pipelineOf, loadPipeline, counts, gateOptions, readCraft } from "./lifecycle.mjs";
import { readReview } from "../lib/readiness.mjs";

const HERE = path.dirname(new URL(import.meta.url).pathname), ROOT = path.resolve(HERE, "..", "..");
const REG = JSON.parse(fs.readFileSync(path.join(ROOT, "company/ops/projects.json"), "utf8"));
const TYPES = typesOf(REG);
const S = TYPES.find((t) => t.id === "single-card"), M = TYPES.find((t) => t.id === "multi-card");

// ------------------------------------------------------------ fixtures
const claim = (id, status = "verified") => ({ id, status, checkedBy: status === "verified" ? "fact-checker" : undefined, checkedOn: status === "verified" ? "2026-10-25" : undefined });
const meta = (o = {}) => ({ slug: "toy", domain: "math", title: "Toy", status: "draft", version: 1, format: "single-card", owner: { builder: "demo-builder" }, claims: [claim("math.toy.c1")], evidence: { qa: [], simulatedLearner: [], pairwise: [] }, ...o });
const R = (slug, name, t) => ({ f: `company/reviews/${slug}/${name}`, t });
const qa = (slug, d, v, extra = "") => R(slug, `${d}-qa${extra ? "-v" + v : ""}.md`, `date: ${d} · lesson version: v${v} · result: **pass**\n${extra}`);
const learner = (slug, d, v, verdict, tag = "a") => R(slug, `${d}-learner-${tag}.md`, `lesson version: v${v}\nVerdict: ${verdict}\n`);
const env = (o = {}) => ({ readiness: { versionSince: null }, firstN: new Set(), tier: "S", today: "2026-10-25", ...o });
const git = (first, ver, pub) => ({ firstAt: first ? { commit: "a", date: first } : null, versionAt: ver ? { commit: "b", date: ver } : null, publishedAt: pub ? { commit: "c", date: pub } : null });

test("the state machines come from company/ops/projects.json: lane S and lane M, each state with one owner and a kind", () => {
  assert.deepEqual(TYPES.map((t) => t.id).sort(), ["multi-card", "single-card"]);
  assert.deepEqual(S.states.map((s) => s.id), ["brief", "build", "checks", "revise", "launch", "published", "live"]);
  assert.deepEqual(M.states.map((s) => s.id), ["brief", "build", "checks", "revise", "launch", "published", "pairwise", "live"]);
  for (const t of TYPES) for (const s of t.states) assert.ok(s.owner && ["maker", "check", "owner"].includes(s.kind), `${t.id}.${s.id}`);
  assert.equal(M.states.find((s) => s.id === "build").owner, "demo-builder", "lane M: one warm maker");
  assert.equal(typeFor({ format: "multi-card-sequence" }, TYPES), M);
  assert.equal(typeFor({ format: "before-after" }, TYPES), S);
  assert.equal(typeFor({}, TYPES), S);
});

test("fixture: the cube at f431cf31e (v2, QA and probe on v2, learner walk only on v1, W-2047 open) is in checks", () => {
  const slug = "flatten-the-cube-to-a-dot";
  const m = meta({ slug, version: 2, format: "multi-card-sequence", claims: [claim("c1"), claim("c9")], evidence: { qa: [`company/reviews/${slug}/2026-10-25-qa.md`, `company/reviews/${slug}/2026-10-25-qa-v2.md`], simulatedLearner: [], pairwise: [] } });
  const records = [qa(slug, "2026-10-25", 2), qa(slug, "2026-10-25", 2, "sequence-probe 390+1280"), learner(slug, "2026-10-25", 1, "launch", "knows-faces-not-euler"), R(slug, "2026-10-25-design.md", "# Design review: math/flatten-the-cube-to-a-dot (v1)\n\n**Verdict: revise.**\n")];
  const board = [{ id: "W-2047", owner: "platform-engineer", state: "next", title: "tools/sequence-probe.mjs 'back' check fingerprints a card ~300 ms after a press" }];
  const it = itemOf({ meta: m, records, board, git: git("2026-10-25", "2026-10-25"), spec: { owner: "interaction-designer (Rafael)" }, built: true }, M, env({ firstN: new Set([slug]), tier: "N" }));
  assert.equal(it.state, "checks");
  assert.equal(it.since, "2026-10-25");
  assert.ok(it.waitingOn.includes("learner walk for v2 (newest is v1)"), it.waitingOn.join("; "));
  assert.ok(it.waitingOn.some((w) => w.startsWith("W-2047 (platform-engineer)")), "the probe fix");
  assert.ok(!it.waitingOn.some((w) => /sequence probe|QA for|fact-check|interaction review/.test(w)), it.waitingOn.join("; "));
  assert.ok(it.notes.some((n) => /design review v1: revise; v2 is the revision round/.test(n)));
  // once the v2 walk says launch and W-2047 is done, the same lesson waits only on its launch record
  const done = itemOf({ meta: m, records: [...records, learner(slug, "2026-10-25", 2, "launch", "v2")], board: [], git: git("2026-10-25", "2026-10-25"), spec: { owner: "interaction-designer" }, built: true }, M, env({ firstN: new Set([slug]) }));
  assert.equal(done.state, "launch");
  assert.deepEqual(done.waitingOn, ["batch launch record (head-of-product)"]);
});

test("fixture: euclid-three-steps (published v1, v2 made later and deployed, v2 walk says revise) is in revise", () => {
  const slug = "euclid-three-steps";
  const m = meta({ slug, status: "published", version: 2, format: "multi-card-sequence" });
  const records = [learner(slug, "2026-10-14", 1, "launch", "adult-beginner-r10"), learner(slug, "2026-10-25", 2, "revise", "knows-primes-v2"), qa(slug, "2026-10-25", 2, "sequence-probe")];
  const board = [{ id: "W-2045", owner: "demo-builder", state: "backlog", title: "math/euclid-three-steps v2 learner walk: revise" }];
  const it = itemOf({ meta: m, records, board, git: git("2026-10-14", "2026-10-20", "2026-10-15"), deploy: { id: "r14", date: "2026-10-20" }, built: true }, M, env({ firstN: new Set([slug]) }));
  assert.equal(it.state, "revise");
  assert.equal(it.since, "2026-10-25");
  assert.match(it.waitingOn[0], /^one revision round: learner walk v2 said revise/);
  assert.ok(it.waitingOn.some((w) => w.startsWith("W-2045 (demo-builder)")));
  assert.ok(it.waitingOn.includes("then design review (first 3 items)"));
  assert.ok(!it.waitingOn.some((w) => /interaction review/.test(w)), "briefed before F-52: no interaction review rule");
  assert.match(it.notes[0], /v2 is live \(r14\)/);
});

test("fixture: lane S published lessons are live when a deploy contains them, published when none does; old gaps are reported, not waited on", () => {
  const records = [learner("toy", "2026-10-14", 1, "launch"), qa("toy", "2026-10-14", 1)];
  const live = itemOf({ meta: meta({ status: "published" }), records, git: git("2026-10-12", "2026-10-12", "2026-10-14"), deploy: { id: "r9", date: "2026-10-17" }, built: true }, S, env());
  assert.deepEqual([live.state, live.since, live.waitingOn, live.deployedIn], ["live", "2026-10-17", [], "r9"]);
  const pub = itemOf({ meta: meta({ status: "published" }), records, git: git("2026-10-12", "2026-10-12", "2026-10-24"), deploy: null, built: true }, S, env());
  assert.equal(pub.state, "published");
  assert.match(pub.waitingOn[0], /^deploy: founder's approval/);
  // v2 made after the publish and deployed with no v2 check record: live, with its gaps
  const bumped = itemOf({ meta: meta({ status: "published", version: 2 }), records, git: git("2026-10-12", "2026-10-20", "2026-10-14"), deploy: { id: "r16", date: "2026-10-20" }, built: true }, S, env());
  assert.equal(bumped.state, "live");
  assert.ok(bumped.gaps.includes("learner walk for v2 (newest is v1)"));
  assert.match(bumped.notes[0], /no check record for it; v2 is live \(r16\)/);
});

test("fixture: build, checks, revise and launch from the records alone", () => {
  const b = itemOf({ meta: meta(), records: [], git: git("2026-10-20", "2026-10-20"), built: true }, S, env());
  assert.deepEqual([b.state, b.since], ["build", "2026-10-20"]);
  const c = itemOf({ meta: meta({ status: "review", claims: [claim("c1", "unverified"), claim("c2")] }), records: [qa("toy", "2026-10-21", 1)], git: git("2026-10-20", "2026-10-20"), built: true }, S, env());
  assert.equal(c.state, "checks");
  assert.deepEqual(c.waitingOn, ["fact-check: 1 unverified claim", "learner walk for v1"]);
  const d = itemOf({ meta: meta({ claims: [claim("math.toy.c1", "disputed")] }), records: [qa("toy", "2026-10-21", 1), learner("toy", "2026-10-22", 1, "launch")], git: git("2026-10-20", "2026-10-20"), built: true }, S, env());
  assert.equal(d.state, "revise");
  assert.match(d.waitingOn[0], /fact-check: 1 disputed claim \(c1\)/);
  const qf = itemOf({ meta: meta(), records: [R("toy", "2026-10-21-qa.md", "date: 2026-10-21 · lesson version: v1 · result: **fail**\n")], git: git("2026-10-20", "2026-10-20"), built: true }, S, env());
  assert.equal(qf.state, "revise");
  const l = itemOf({ meta: meta(), records: [qa("toy", "2026-10-21", 1), learner("toy", "2026-10-22", 1, "launch")], git: git("2026-10-20", "2026-10-20"), built: true, launchRecord: "company/rituals/records/2026-10-23-launch-review.md" }, S, env());
  assert.deepEqual([l.state, l.since, l.waitingOn], ["launch", "2026-10-22", ["publish (release-manager; launch record 2026-10-23-launch-review.md)"]]);
  const held = itemOf({ meta: meta(), records: [qa("toy", "2026-10-21", 1), learner("toy", "2026-10-22", 1, "launch")], git: git("2026-10-20", "2026-10-20"), built: true, hold: "held by W-1" }, S, env());
  assert.deepEqual([held.state, held.waitingOn], ["checks", ["publish hold: held by W-1"]]);
  const tierR = itemOf({ meta: meta(), records: [qa("toy", "2026-10-21", 1), learner("toy", "2026-10-22", 1, "launch")], git: git("2026-10-20", "2026-10-20"), built: true }, S, env({ tier: "R" }));
  assert.deepEqual(tierR.waitingOn, ["route verdict (tier R)"]);
});

test("fixture: a state the data drops is shown at the next state it keeps, with a note", () => {
  const noRevise = { ...S, states: S.states.filter((s) => s.id !== "revise") };
  const it = itemOf({ meta: meta(), records: [R("toy", "2026-10-21-qa.md", "date: 2026-10-21 · lesson version: v1 · result: **fail**\n")], git: git("2026-10-20", "2026-10-20"), built: true }, noRevise, env());
  assert.equal(it.state, "launch");
  assert.ok(it.notes.some((n) => /revise is not in single-card's lifecycle/.test(n)));
});

test("pipelineOf: the first 3 of a type by first commit get the first-3 checks; counts cover every item", () => {
  const ls = ["a", "b", "c", "d"].map((s, i) => ({ meta: meta({ slug: s, format: "multi-card-sequence" }), records: [], git: git(`2026-10-1${i}`, `2026-10-1${i}`), built: true }));
  const p = pipelineOf(TYPES, ls, env());
  assert.equal(p.items.length, 4);
  const c = counts(p);
  assert.equal(Object.values(c["multi-card"]).reduce((a, n) => a + n, 0), 4);
  assert.deepEqual(p.types.map((t) => t.id).sort(), ["multi-card", "single-card"]);
  assert.equal(readCraft("# Design review (v3)\n**Verdict: launch.**").version, 3);
  assert.equal(gateOptions(ROOT).versionSince, "2026-10-17", "READINESS_SINCE as tools/company.mjs states it");
});

// ------------------------------------------------------------ today's real lessons
const P = loadPipeline(ROOT);
const item = (id) => P.items.find((i) => i.id === id);
const reviews = (slug) => { const d = path.join(ROOT, "company/reviews", slug); return fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.includes("learner") && f.endsWith(".md")).map((f) => ({ f, ...readReview(fs.readFileSync(path.join(d, f), "utf8")) })) : []; };
const board = JSON.parse(fs.readFileSync(path.join(ROOT, "company/ops/board.json"), "utf8")).items;

test("real: every lesson has one state of its type, a since date and a list of waits", () => {
  const n = fs.readdirSync(path.join(ROOT, "src/demos"), { withFileTypes: true }).filter((d) => d.isDirectory()).flatMap((d) => fs.readdirSync(path.join(ROOT, "src/demos", d.name)).filter((s) => fs.existsSync(path.join(ROOT, "src/demos", d.name, s, "meta.json")))).length;
  assert.equal(P.items.length, n);
  for (const i of P.items) {
    const t = P.types.find((x) => x.id === i.type);
    assert.ok(t && t.states.some((s) => s.id === i.state), `${i.id}: ${i.type}.${i.state}`);
    assert.ok(/^\d{4}-\d\d-\d\d$/.test(i.since ?? ""), `${i.id}: since ${i.since}`);
    assert.ok(Array.isArray(i.waitingOn));
    if (!["live"].includes(i.state)) assert.ok(i.waitingOn.length > 0, `${i.id} in ${i.state} waits on nothing`);
  }
});

test("real: math/flatten-the-cube-to-a-dot is lane M v2, and waits on what its records lack", () => {
  const it = item("math/flatten-the-cube-to-a-dot"), m = JSON.parse(fs.readFileSync(path.join(ROOT, "src/demos/math/flatten-the-cube-to-a-dot/meta.json"), "utf8"));
  assert.deepEqual([it.type, it.version], ["multi-card", 2]);
  const v2launch = reviews("flatten-the-cube-to-a-dot").some((r) => r.version === 2 && r.verdict === "launch");
  assert.equal(it.waitingOn.some((w) => /^learner walk for v2/.test(w)), !v2launch && m.status !== "published", "learner walk for v2 iff no v2 launch record");
  const w2047 = board.find((i) => i.id === "W-2047");
  assert.equal(it.waitingOn.some((w) => w.startsWith("W-2047")), ["doing", "next"].includes(w2047.state) && m.status !== "published", "the probe fix iff W-2047 is open");
  if (m.status !== "published" && !v2launch) assert.equal(it.state, "checks");
  if (m.status === "published" && !m.evidence.pairwise?.length) { assert.equal(it.state, "pairwise"); assert.match(it.waitingOn[0], /^pairwise vs the single-card twin/); }
});

test("real: math/euclid-three-steps shows its v2 learner revise", () => {
  const it = item("math/euclid-three-steps");
  const v2 = reviews("euclid-three-steps").filter((r) => r.version === 2).sort((a, b) => a.f.localeCompare(b.f)).pop();
  assert.equal(it.type, "multi-card");
  if (v2?.verdict === "revise") {
    assert.equal(it.state, "revise");
    assert.match(it.waitingOn[0], /^one revision round: learner walk v2 said revise/);
  }
});

test("real: published lane S lessons are published or live, and some are live", () => {
  const pub = P.items.filter((i) => i.type === "single-card" && i.status === "published");
  assert.ok(pub.length > 100);
  const off = pub.filter((i) => !["published", "live", "checks", "revise"].includes(i.state));
  assert.deepEqual(off.map((i) => i.id), []);
  assert.ok(pub.filter((i) => ["published", "live"].includes(i.state)).length > pub.length * 0.9);
  assert.ok(pub.some((i) => i.state === "live" && i.deployedIn));
});
