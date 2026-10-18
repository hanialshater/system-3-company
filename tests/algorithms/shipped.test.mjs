// Shipped algorithm specs (PR #6 review F2/F13, M2: company/engineering/reviews/2026-10-16-pr6-engineering-review.md).
// The other algorithm tests use fixtures only. Each topic module runs code at import and the wrapper
// runs cases[0].run() in render, with nothing on the lesson path to catch a throw, and ten lessons
// share one module. This test runs the real manifest and the real 200 wrappers, so a bad spec fails
// `npm run test:algorithms` (and verify) instead of ten pages.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { checkAlgorithms } from "../../tools/algorithms-200-check.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const manifest = JSON.parse(readFileSync(join(root, "company/domains/briefs/algorithms-200.json"), "utf8"));
const lessons = manifest.lessons;
const csDir = join(root, "src/demos/cs");

test("checkAlgorithms on the real manifest: 200 specs, zero errors, zero warnings", async () => {
  const report = await checkAlgorithms({ root });
  assert.equal(report.count, 200);
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.warnings, []);
});

test("every algo-* lesson directory is in the manifest, and every manifest lesson has one", () => {
  const dirs = readdirSync(csDir).filter((name) => name.startsWith("algo-")).sort();
  assert.deepEqual(dirs, lessons.map((l) => l.slug).sort());
});

// All 200 wrappers are one template; only the spec import line varies. Exact match, not a substring
// (the checker's old `source.includes` test accepted any file that mentioned both names).
const wrapper = (exportName, specifier) => `"use client";

import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { AlgorithmStage, AlgorithmReveal, algorithmControlClass, useAlgorithmState } from "@/components/algorithms/AlgorithmLesson";
import { ${exportName} as spec } from "${specifier}";

export default function Demo({ slug }: { slug: string }) {
  const state = useAlgorithmState(spec);
  return <Lesson slug={slug} predict={spec.predict} minInteractions={1} exploreHint={spec.exploreHint}
    reveal={() => <AlgorithmReveal spec={spec} witness={state.witness} />}>
    {({ locked, interact }) => <AlgorithmStage state={state}>
      <div className={algorithmControlClass}>
        <Control disabled={locked || !state.canRun} onClick={() => state.run(interact)}>Run example</Control>
        <Control disabled={locked || !state.canStep} onClick={() => state.step(interact)}>Step</Control>
        <Control disabled={locked || !state.canTryAnother} onClick={state.tryAnother}>Try another</Control>
        <Control disabled={locked || !state.canReset} onClick={state.reset}>Reset</Control>
      </div>
    </AlgorithmStage>}
  </Lesson>;
}
`;

for (const lesson of lessons) {
  test(`${lesson.slug}: wrapper is the template with the exact manifest import`, () => {
    const source = readFileSync(join(csDir, lesson.slug, "Demo.tsx"), "utf8");
    const specifier = lesson.module.replace(/^src\//, "@/").replace(/\.ts$/, "");
    assert.equal(source, wrapper(lesson.specExport, specifier));
  });
}

// What AlgorithmFrameView and the stage caption render (src/components/algorithms/AlgorithmLesson.tsx).
// `result` is deliberately absent: the stage never shows it (review F13). Written independently of the
// checker's visibleFrameKey so loosening one does not loosen both.
const visible = (frame) => ({
  caption: frame.caption,
  rows: (frame.rows ?? []).map((r) => [r.label, r.cells.map((c) => [c.text, c.tone ?? "plain"])]),
  nodes: (frame.nodes ?? []).map((n) => [n.id, n.label, n.x, n.y, n.tone ?? "plain"]),
  edges: (frame.edges ?? []).map((e) => [e.from, e.to, e.label ?? "", Boolean(e.directed), e.tone ?? "plain"]),
  metrics: (frame.metrics ?? []).map((m) => [m.label, m.value]),
});

const modules = new Map();
for (const lesson of lessons) {
  test(`${lesson.slug}: "Try another" ends on a visibly different final frame`, async () => {
    if (!modules.has(lesson.module)) modules.set(lesson.module, await import(pathToFileURL(join(root, lesson.module)).href));
    const spec = modules.get(lesson.module)[lesson.specExport];
    assert.ok(spec, `missing export ${lesson.specExport} in ${lesson.module}`);
    const [a, b] = [spec.cases[0].run(), spec.cases[1].run()];
    assert.notDeepEqual(visible(b.frames.at(-1)), visible(a.frames.at(-1)),
      `case 1 (${spec.cases[1].label}) final frame shows the same thing as case 0 (${spec.cases[0].label})`);
  });
}

// Catalog drop hazard (review, "Catalog"): src/app/catalog/page.tsx lists a CS lesson in a topic only if
// its slug is in topic.slugs AND its concept is in topic.concepts, and hides grouped concepts and slugs
// from the plain CS list. A CS lesson that satisfies one side but not the other would be listed nowhere.
test("no CS lesson falls between the algorithm topics and the plain CS list in the catalog", () => {
  const { topics } = JSON.parse(readFileSync(join(root, "content/algorithms-200.json"), "utf8"));
  const topicOfSlug = new Map(topics.flatMap((t) => t.slugs.map((s) => [s, t])));
  const groupedConcepts = new Set(topics.flatMap((t) => t.concepts.map((c) => c.id)));
  const dropped = [];
  for (const slug of readdirSync(csDir)) {
    const metaPath = join(csDir, slug, "meta.json");
    if (!existsSync(metaPath)) continue;
    const meta = JSON.parse(readFileSync(metaPath, "utf8"));
    const topic = topicOfSlug.get(slug);
    if (topic) {
      if (!topic.concepts.some((c) => c.id === meta.concept)) dropped.push(`${slug}: grouped slug, concept ${meta.concept} not in topic ${topic.id}`);
    } else if (groupedConcepts.has(meta.concept)) dropped.push(`${slug}: concept ${meta.concept} is grouped but the slug is in no topic`);
  }
  assert.deepEqual(dropped, []);
});
