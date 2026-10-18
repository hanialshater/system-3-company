// HQ simulation lab, production mode (W-1572 H1; company/personalization/batches/2026-10-17-batch-5.md section H1).
// A released HQ build serves only the committed runs in src/data/hq-personalization/ (README.md there) and never
// runs a process. These tests show: production never calls execFile/spawn (and the spy is not blind); the committed
// data loads, holds only the simulated personas, and renders with its provenance and only the choices it can serve;
// missing, damaged or unlisted data fails closed with a plain message.
// Run: npm run test:hq
import { register, syncBuiltinESMExports } from "node:module";
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import cp from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { createHash } from "node:crypto";

register("../lifehacks/render-loader.mjs", import.meta.url);
register("./lab-render-loader.mjs", import.meta.url);
const { readPrecomputed, clearPrecomputedCache, PRECOMPUTED_DIR, REGENERATE } = await import("../../src/lib/hq-personalization-precomputed.ts");
const { runSim, simLocal } = await import("../../src/lib/hq-personalization-server.ts");
const { servableGroups, precomputedLine, UNSCORED_LABEL } = await import("../../src/lib/hq-personalization.ts");
const { PERSONAS } = await import("../../company/personalization/model/personas.ts");

const ROOT = process.cwd();
const DIR = path.join(ROOT, PRECOMPUTED_DIR);
const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "manifest.json"), "utf8"));
const SIMULATED = PERSONAS.map((p) => p.id).sort();

/** Run fn with NODE_ENV (and friends) set, restoring them after. */
async function withEnv(vars, fn) {
  const old = Object.fromEntries(Object.keys(vars).map((k) => [k, process.env[k]]));
  Object.assign(process.env, vars);
  try { return await fn(); } finally { for (const [k, v] of Object.entries(old)) { if (v === undefined) delete process.env[k]; else process.env[k] = v; } }
}

test("mode: production is never live, whatever else is set; HQ_LAB_PRECOMPUTED=1 previews it locally", () => {
  assert.equal(simLocal({ NODE_ENV: "production" }), false);
  assert.equal(simLocal({ NODE_ENV: "production", HQ_PUBLIC: "1", HQ_LAB_PRECOMPUTED: "0" }), false);
  assert.equal(simLocal({ NODE_ENV: "development" }), true);
  assert.equal(simLocal({ NODE_ENV: "development", HQ_LAB_PRECOMPUTED: "1" }), false);
  assert.ok(!/child_process/.test(fs.readFileSync(path.join(ROOT, "src/lib/hq-personalization-precomputed.ts"), "utf8")), "the reader does not even import child_process");
});

test("production never calls execFile, spawn or their siblings (and the spy sees a live run)", async () => {
  const names = ["execFile", "spawn", "exec", "fork", "execFileSync", "spawnSync", "execSync"];
  const spies = names.map((n) => mock.method(cp, n));
  syncBuiltinESMExports(); // the server's named import of execFile now points at the spy
  const calls = () => spies.reduce((s, m) => s + m.mock.callCount(), 0);
  try {
    await withEnv({ NODE_ENV: "production", HQ_PUBLIC: "1" }, async () => {
      const reqs = [
        { op: "meta" }, { op: "run", persona: "wanderer", policy: "gam", seed: 1, days: 7 }, { op: "run", persona: "wanderer", policy: "gam", seed: 2, days: 7 },
        { op: "run", persona: "a-real-learner", policy: "gam", seed: 1, days: 7 }, { op: "saved", file: "wanderer.gam.seed1.json" },
        { op: "compare", persona: "all", seeds: 5, set: "main", days: 7 }, { op: "compare", persona: "wanderer", seeds: 3, set: "main", days: 7 },
      ];
      for (const r of reqs) await runSim(r);
      await runSim({ op: "meta" }, path.join(os.tmpdir(), "no-such-lab-root")); // missing data: still no process
    });
    assert.equal(calls(), 0, "no child process API was called in production");
    // Control: the same spy counts a live run, so a zero above is not a blind spy.
    const live = await withEnv({ NODE_ENV: "development", HQ_LAB_PRECOMPUTED: "" }, () => runSim({ op: "run", persona: "wanderer", policy: "gam", seed: 9, days: 1 }));
    assert.ok(live.ok, live.error);
    assert.ok(spies[0].mock.callCount() >= 1, "the execFile spy saw the live run");
  } finally { mock.restoreAll(); syncBuiltinESMExports(); }
});

test("committed data: simulated personas only, every listed file loads, no reachable-* candidate, provenance on each run", async () => {
  assert.equal(manifest.schema, "personalization-hq-precomputed-v1");
  assert.deepEqual([...manifest.personas].sort(), SIMULATED, "exactly the personas of personas.ts");
  assert.ok(!manifest.policies.some((p) => /reachable/.test(p)), "no reachable-* run before go/no-go G");
  assert.ok(manifest.policies.includes("gam") && manifest.policies.includes("default-order"));
  assert.equal(manifest.runs.length, manifest.personas.length * manifest.policies.length * manifest.seeds.length);
  const meta = readPrecomputed({ op: "meta" });
  assert.ok(meta.ok, meta.error);
  assert.deepEqual(meta.data.saved, [], "no local saved traces in the released lab");
  assert.deepEqual(meta.data.personas.map((p) => p.id).sort(), SIMULATED);
  assert.ok(!JSON.stringify(meta.data.policies).includes("reachable"));
  assert.equal(meta.data.precomputed.inputsCommit, manifest.inputsCommit);
  assert.equal(meta.data.precomputed.files, undefined, "hashes stay on the server");
  for (const e of manifest.runs) {
    const r = readPrecomputed({ op: "run", persona: e.persona, policy: e.policy, seed: e.seed, days: e.days });
    assert.ok(r.ok, `${e.file}: ${r.error}`);
    assert.ok(SIMULATED.includes(r.data.persona.id), e.file);
    assert.equal(r.data.label, UNSCORED_LABEL);
    assert.equal(r.data.run.source, precomputedLine(meta.data.precomputed));
    assert.match(r.data.run.source, new RegExp(`inputs commit ${manifest.inputsCommit.replace("+", "\\+")}.*seed 1, 7 days`));
  }
  for (const e of manifest.compares) {
    const c = readPrecomputed({ op: "compare", persona: e.persona, seeds: e.seeds, set: e.set, days: e.days });
    assert.ok(c.ok, `${e.file}: ${c.error}`);
    assert.equal(c.data.unscored, UNSCORED_LABEL);
  }
});

test("committed data matches the simulator when the model is unchanged (else: regenerate)", async (t) => {
  const live = await withEnv({ NODE_ENV: "development", HQ_LAB_PRECOMPUTED: "" }, () => runSim({ op: "run", persona: "struggling-repeater", policy: "gam", seed: 1, days: 7 }));
  assert.ok(live.ok, live.error);
  if (live.data.modelVersion !== manifest.modelVersion) return t.skip(`model ${live.data.modelVersion} != stored ${manifest.modelVersion}: run ${REGENERATE}`);
  const stored = readPrecomputed({ op: "run", persona: "struggling-repeater", policy: "gam", seed: 1, days: 7 });
  assert.equal(JSON.stringify(stored.data.steps), JSON.stringify(live.data.steps), `stored run differs from a live run of the same model: ${REGENERATE}`);
});

test("refusals: other seeds, days, policies, comparisons and saved traces are not served, and say why", () => {
  const no = (r, re) => { assert.equal(r.ok, false); assert.match(r.error, re); };
  no(readPrecomputed({ op: "run", persona: "wanderer", policy: "gam", seed: 2, days: 7 }), /^Not precomputed: wanderer · gam · seed 2 · 7 days\. This lab serves precomputed from inputs commit/);
  no(readPrecomputed({ op: "run", persona: "wanderer", policy: "gam", seed: 1, days: 3 }), /Not precomputed/);
  no(readPrecomputed({ op: "run", persona: "wanderer", policy: "gam-off-repair", seed: 1, days: 7 }), /Not precomputed/);
  no(readPrecomputed({ op: "run", persona: "a-real-learner", policy: "gam", seed: 1, days: 7 }), /Not precomputed/);
  no(readPrecomputed({ op: "compare", persona: "all", seeds: 3, set: "main", days: 7 }), /comparisons at 5 seeds and 7 days only/);
  no(readPrecomputed({ op: "saved", file: "wanderer.gam.seed1.json" }), /local only/);
});

function copyData(name) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), `hq-lab-pre-${name}-`));
  fs.cpSync(DIR, path.join(root, PRECOMPUTED_DIR), { recursive: true });
  return root;
}
const rehash = (root, rel) => {
  const mf = path.join(root, PRECOMPUTED_DIR, "manifest.json");
  const m = JSON.parse(fs.readFileSync(mf, "utf8"));
  m.files[rel] = createHash("sha256").update(fs.readFileSync(path.join(root, PRECOMPUTED_DIR, rel))).digest("hex");
  fs.writeFileSync(mf, JSON.stringify(m));
};

test("fails closed: missing, damaged, unlisted or wrong-shaped data is a plain error, never a run or a throw", async () => {
  const run = { op: "run", persona: "wanderer", policy: "gam", seed: 1, days: 7 };
  const rel = "runs/wanderer.gam.seed1.days7.json.gz";
  const cases = [
    ["no data folder", (r) => fs.rmSync(path.join(r, PRECOMPUTED_DIR), { recursive: true }), { op: "meta" }, /manifest\.json is missing/],
    ["manifest not JSON", (r) => fs.writeFileSync(path.join(r, PRECOMPUTED_DIR, "manifest.json"), "{oops"), { op: "meta" }, /not readable JSON/],
    ["manifest wrong schema", (r) => fs.writeFileSync(path.join(r, PRECOMPUTED_DIR, "manifest.json"), '{"schema":"x"}'), { op: "meta" }, /unknown schema/],
    ["meta.json edited", (r) => fs.appendFileSync(path.join(r, PRECOMPUTED_DIR, "meta.json"), " "), { op: "meta" }, /meta\.json does not match its hash/],
    ["meta.json missing", (r) => fs.rmSync(path.join(r, PRECOMPUTED_DIR, "meta.json")), { op: "meta" }, /meta\.json is missing/],
    ["run file missing", (r) => fs.rmSync(path.join(r, PRECOMPUTED_DIR, rel)), run, /is missing/],
    ["run file swapped", (r) => fs.copyFileSync(path.join(r, PRECOMPUTED_DIR, "runs/wanderer.random.seed1.days7.json.gz"), path.join(r, PRECOMPUTED_DIR, rel)), run, /does not match its hash/],
    ["run file not gzip (rehashed)", (r) => { fs.writeFileSync(path.join(r, PRECOMPUTED_DIR, rel), "plain"); rehash(r, rel); }, run, /not readable JSON/],
    ["run file another trace (rehashed)", (r) => { fs.copyFileSync(path.join(r, PRECOMPUTED_DIR, "runs/wanderer.random.seed1.days7.json.gz"), path.join(r, PRECOMPUTED_DIR, rel)); rehash(r, rel); }, run, /is not the trace it is listed as/],
    ["run file wrong shape (rehashed)", (r) => { fs.writeFileSync(path.join(r, PRECOMPUTED_DIR, rel), zlib.gzipSync('{"schema":"x"}')); rehash(r, rel); }, run, /is not the trace it is listed as/],
    ["entry points outside the folder", (r) => {
      const mf = path.join(r, PRECOMPUTED_DIR, "manifest.json"); const m = JSON.parse(fs.readFileSync(mf, "utf8"));
      m.runs.find((e) => e.file === rel).file = "../../../package.json"; m.files["../../../package.json"] = "0".repeat(64); fs.writeFileSync(mf, JSON.stringify(m));
    }, run, /is not listed in manifest\.json/],
  ];
  for (const [name, breakIt, req, re] of cases) {
    const root = copyData(name.replace(/\W+/g, "-"));
    try {
      breakIt(root);
      const r = readPrecomputed(req, root);
      assert.equal(r.ok, false, name);
      assert.match(r.error, re, name);
      assert.match(r.error, /^The precomputed lab data is unavailable \(.+\)\. Nothing was run\. Regenerate it locally with `node tools\/hq-lab-precompute\.mjs`/, name);
      const viaServer = await withEnv({ NODE_ENV: "production" }, () => runSim(req, root));
      assert.equal(viaServer.ok, false, `${name} (through runSim)`);
    } finally { fs.rmSync(root, { recursive: true, force: true }); clearPrecomputedCache(); }
  }
});

test("route in production: 404 with HQ off; serves stored runs with HQ_PUBLIC=1; refuses others with 422", async () => {
  const { GET } = await import("../../src/app/api/hq/personalization/route.ts");
  const get = (q) => GET(new Request(`http://hq.test/api/hq/personalization?${q}`));
  await withEnv({ NODE_ENV: "production", HQ_PUBLIC: "" }, async () => assert.equal((await get("op=meta")).status, 404));
  await withEnv({ NODE_ENV: "production", HQ_PUBLIC: "1" }, async () => {
    const m = await get("op=meta");
    assert.equal(m.status, 200);
    assert.equal((await m.json()).precomputed.inputsCommit, manifest.inputsCommit);
    const r = await get("op=run&persona=lapsed-returner&policy=draft-rules&seed=1&days=7");
    assert.equal(r.status, 200);
    assert.match((await r.json()).run.source, /^precomputed from inputs commit/);
    const no = await get("op=run&persona=lapsed-returner&policy=draft-rules&seed=4&days=7");
    assert.equal(no.status, 422);
    assert.match((await no.json()).error, /^Not precomputed/);
  });
});

test("render: the page names the data's commit and seed, offers only stored choices, and keeps 'simulated'", async () => {
  const { createElement: h } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { default: Personalization } = await import("../../src/app/hq/personalization/Personalization.tsx");
  const meta = readPrecomputed({ op: "meta" }).data;
  const html = renderToStaticMarkup(h(Personalization, { meta, error: null, initial: { persona: "wanderer", policy: "gam-off-repair", seed: 7, days: 3, step: null } }));
  const text = html.replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'").replace(/\s+/g, " ");
  assert.match(text, /Precomputed: this lab runs nothing\./);
  assert.ok(text.includes(precomputedLine(meta.precomputed)), "provenance line shown");
  assert.match(text, new RegExp(`inputs commit ${manifest.inputsCommit.replace("+", "\\+")}`));
  assert.match(text, /Seed 1 · 7 days \(precomputed\)/);
  assert.match(text, /Load a precomputed simulation/);
  assert.ok(!/type="number"/.test(html), "no seed, days or seeds number inputs it could not honour");
  assert.ok(!/Saved trace/.test(text), "no saved-trace loader");
  const options = [...html.matchAll(/<option[^>]*value="([^"]*)"/g)].map((m) => m[1]);
  for (const p of manifest.policies) assert.ok(options.includes(p), p);
  assert.ok(!options.includes("gam-off-repair"), "an ablation that is not stored is not offered");
  assert.match(html, /<option[^>]*value="gam"[^>]*selected/, "an unstored policy in the link falls back to gam");
  assert.match(text, /simulated personas only/);
  assert.match(text, /Simulated persona: Wanderer/);
  assert.deepEqual(servableGroups(meta.policies, meta.precomputed).flatMap((g) => g.items).sort(), [...manifest.policies].sort());
  // Live mode is unchanged: number inputs and no precomputed banner.
  const { precomputed: _p, ...liveMeta } = meta;
  const live = renderToStaticMarkup(h(Personalization, { meta: liveMeta, error: null, initial: { persona: null, policy: null, seed: null, days: null, step: null } }));
  assert.ok(/type="number"/.test(live) && !/Precomputed:/.test(live));
  // Missing data: the page shows the plain message, nothing else.
  const err = readPrecomputed({ op: "meta" }, path.join(os.tmpdir(), "no-such-lab-root"));
  const down = renderToStaticMarkup(h(Personalization, { meta: null, error: err.error, initial: { persona: null, policy: null, seed: null, days: null, step: null } }));
  assert.match(down, /role="alert"[^>]*>The precomputed lab data is unavailable \(manifest\.json is missing\)/);
});
