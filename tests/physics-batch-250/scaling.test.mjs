import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, "tools/physics-batch-250/manifest.json"), "utf8"));
const labels = new Map([
  ["×⅛", 1 / 8], ["×¼", 1 / 4], ["×½", 1 / 2], ["×1", 1], ["×2", 2],
  ["×4", 4], ["×8", 8], ["×16", 16], ["×1/√2", 1 / Math.sqrt(2)], ["×√2", Math.sqrt(2)],
  ["×1/27", 1 / 27], ["×1/9", 1 / 9], ["×1/3", 1 / 3], ["×3", 3], ["×9", 9],
  ["×27", 27], ["×81", 81], ["×1/√3", 1 / Math.sqrt(3)], ["×√3", Math.sqrt(3)],
]);
const close = (a, b) => Math.abs(a - b) < 1e-10;
const getLesson = (slug) => {
  const dir = path.join(root, "src/demos/physics", slug);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8"));
  const source = fs.readFileSync(path.join(dir, "Demo.tsx"), "utf8");
  const start = source.indexOf("const lesson: ScalingCase = ") + "const lesson: ScalingCase = ".length;
  const end = source.indexOf(";\n\nexport default", start);
  assert.ok(start >= 0 && end > start, slug);
  return { meta, lesson: JSON.parse(source.slice(start, end)) };
};

test("the PR batch contains exactly 250 unique physics drafts", () => {
  const slugs = JSON.parse(fs.readFileSync(path.join(root, "tools/physics-batch-250/all-slugs.json"), "utf8"));
  assert.equal(slugs.length, 250);
  assert.equal(new Set(slugs).size, 250);
  for (const slug of slugs) {
    const meta = JSON.parse(fs.readFileSync(path.join(root, "src/demos/physics", slug, "meta.json"), "utf8"));
    assert.equal(meta.domain, "physics", slug);
    assert.equal(meta.status, "draft", slug);
  }
});

test("each planned scaling scenario is a distinct registered draft", () => {
  assert.equal(manifest.count, 232);
  assert.equal(manifest.records.length, 232);
  assert.equal(new Set(manifest.records.map((r) => r.slug)).size, 232);
  const concepts = new Set();
  for (const record of manifest.records) {
    const { meta, lesson } = getLesson(record.slug);
    assert.equal(meta.slug, record.slug);
    assert.equal(meta.status, "draft");
    assert.ok(meta.claims.every((claim) => claim.status === "unverified"));
    assert.ok(!concepts.has(meta.concept), meta.concept);
    concepts.add(meta.concept);
    assert.equal(lesson.options.length, 3);
    assert.equal(new Set(lesson.options).size, 3);
    const selected = labels.get(lesson.options[lesson.answer]);
    assert.ok(selected !== undefined && close(selected, record.factor), record.slug);
    assert.ok(close(lesson.factor, record.factor), record.slug);
    assert.equal(lesson.exponent, record.power, record.slug);
    for (const input of lesson.discrete ? [1, 2, 3] : [1, 1.5, 2, 2.5, 3]) {
      const output = input ** lesson.exponent;
      assert.ok(Number.isFinite(output) && output > 0, record.slug + " interactive output");
      if (input === 2) assert.ok(close(output, record.factor), record.slug + " double");
    }
    const recall = labels.get(meta.recall.options[meta.recall.answer]);
    assert.ok(recall !== undefined && close(recall, 3 ** record.power), record.slug + " recall");
  }
});

test("integer quantum numbers and coil turns use whole-step multipliers", () => {
  for (const slug of ["scale-box-energy-quantum-number", "scale-bohr-radius-level", "scale-faraday-turn-count", "scale-string-harmonic-number"]) {
    assert.equal(getLesson(slug).lesson.discrete, true, slug);
  }
  assert.equal(getLesson("scale-blackbody-temperature").lesson.discrete, false);
});

test("selected physical laws have independently calculated scale factors", () => {
  const expected = {
    "scale-flow-radius-laminar": 16, // Poiseuille Q ∝ r^4
    "scale-blackbody-temperature": 16, // Stefan–Boltzmann P ∝ T^4
    "scale-double-slit-fringe-separation": 0.5, // fringe separation ∝ 1/d
    "scale-coulomb-force-distance": 0.25, // Coulomb force ∝ 1/r^2
    "scale-orbit-magnetic-field": 0.5, // radius ∝ 1/B
    "scale-box-energy-width": 0.25, // energy ∝ 1/L^2
    "scale-bohr-binding-charge": 4, // hydrogen-like energy ∝ Z^2
    "scale-tidal-gradient-distance": 0.125, // leading tidal difference ∝ 1/r^3
    "scale-stellar-luminosity-radius": 4, // surface area ∝ R^2
    "scale-orbit-speed-radius": 1 / Math.sqrt(2), // circular speed ∝ 1/sqrt(r)
  };
  for (const [slug, factor] of Object.entries(expected)) {
    const record = manifest.records.find((item) => item.slug === slug);
    assert.ok(record, slug);
    assert.ok(close(record.factor, factor), slug);
    const { lesson } = getLesson(slug);
    assert.ok(close(labels.get(lesson.options[lesson.answer]), factor), slug);
  }
});
