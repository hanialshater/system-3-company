#!/usr/bin/env node
// Builder opt-in: selects only its own manifest lessons; never overwrites existing files.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { register } from 'node:module';
register('../tests/lifehacks/typescript-loader.mjs', import.meta.url);
const args = process.argv.slice(2);
const value = (name, fallback) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const manifest = value('manifest', 'company/domains/briefs/algorithms-200.json');
const data = JSON.parse(fs.readFileSync(manifest, 'utf8'));
const topics = value('topics', '').split(',').filter(Boolean);
const slugs = value('slugs', '').split(',').filter(Boolean);
if (!topics.length && !slugs.length) throw new Error('Select your owned --topics=id,id or --slugs=slug,slug.');
const lessons = (data.lessons ?? data.topics.flatMap((t) => t.lessons)).filter((l) => topics.includes(l.topicId) || slugs.includes(l.slug));
if (!lessons.length) throw new Error('No manifest lessons match the selected ownership.');
const modules = new Map();
for (const row of lessons) {
  if (!modules.has(row.module)) modules.set(row.module, await import(pathToFileURL(path.resolve(row.module)).href));
  const spec = modules.get(row.module)[row.specExport];
  if (!spec || spec.slug !== row.slug) throw new Error(`Missing/mismatched model: ${row.slug} (${row.specExport})`);
  const dir = path.join('src/demos/cs', row.slug);
  if (fs.existsSync(dir)) throw new Error(`Refuse to overwrite ${dir}; edit existing lesson explicitly.`);
  const source = `"use client";\n\nimport { Lesson } from "@/kit/Lesson";\nimport { Control } from "@/kit/controls";\nimport { AlgorithmStage, AlgorithmReveal, algorithmControlClass, useAlgorithmState } from "@/components/algorithms/AlgorithmLesson";\nimport { ${row.specExport} as spec } from ${JSON.stringify(row.module.replace(/^src\//, '@/').replace(/\.ts$/, ''))};\n\nexport default function Demo({ slug }: { slug: string }) {\n  const state = useAlgorithmState(spec);\n  return <Lesson slug={slug} predict={spec.predict} minInteractions={1} exploreHint={spec.exploreHint}\n    reveal={() => <AlgorithmReveal spec={spec} witness={state.witness} />}>\n    {({ locked, interact }) => <AlgorithmStage state={state}>\n      <div className={algorithmControlClass}>\n        <Control disabled={locked || !state.canRun} onClick={() => state.run(interact)}>Run example</Control>\n        <Control disabled={locked || !state.canStep} onClick={() => state.step(interact)}>Step</Control>\n        <Control disabled={locked || !state.canTryAnother} onClick={state.tryAnother}>Try another</Control>\n        <Control disabled={locked || !state.canReset} onClick={state.reset}>Reset</Control>\n      </div>\n    </AlgorithmStage>}\n  </Lesson>;\n}\n`;
  const runs = spec.cases.map((c) => c.run());
  const details = modules.get(row.module).lessonDetails?.[row.slug];
  const suppliedRecall = row.recall ?? details?.recall;
  const recall = suppliedRecall ? { question: suppliedRecall.question, options: suppliedRecall.options, answer: suppliedRecall.answer, why: suppliedRecall.why ?? suppliedRecall.explanation } : null;
  if (!recall?.question || recall.question === spec.predict.question || !recall.why || !Array.isArray(recall.options) || recall.options.length < 2 || !Number.isInteger(recall.answer) || recall.answer < 0 || recall.answer >= recall.options.length) throw new Error(`${row.slug}: author a distinct transfer recall with question/options/answer/why in lessonDetails[slug]`);
  if (!details?.mechanism) throw new Error(`${row.slug}: lessonDetails[slug].mechanism required`);
  const hook = row.hook ?? details.hook ?? 'Make a prediction. Inspect the steps. Test a second input.';
  const claims = new Map();
  const addClaim = (text, address, support = 'derivation') => {
    if (text && /\p{L}/u.test(text) && !claims.has(text)) claims.set(text, {text, address, support});
  };
  const ref = `${row.module}#${row.specExport}`;
  addClaim(details.mechanism, `${row.module}#lessonDetails[${JSON.stringify(row.slug)}].mechanism`);
  addClaim(hook, `${row.module}#lessonDetails[${JSON.stringify(row.slug)}].hook; manifest row hook`, 'convention');
  addClaim(spec.predict.question, `${ref}.predict.question`);
  spec.predict.options.forEach((text, i) => addClaim(text, `${ref}.predict.options[${i}]`));
  addClaim(spec.exploreHint, `${ref}.exploreHint`, 'convention');
  runs.forEach((run, caseIndex) => {
    const caseRef = `${ref}.cases[${caseIndex}].run()`;
    addClaim(run.proof, `${caseRef}.proof`);
    spec.reveal(run).forEach((text, i) => addClaim(text, `${ref}.reveal(${caseRef})[${i}]`));
    run.frames.forEach((frame, frameIndex) => {
      const frameRef = `${caseRef}.frames[${frameIndex}]`;
      addClaim(frame.caption, `${frameRef}.caption`);
      (frame.rows ?? []).forEach((r, i) => { addClaim(r.label, `${frameRef}.rows[${i}].label`); r.cells.forEach((c, j) => addClaim(c.text, `${frameRef}.rows[${i}].cells[${j}].text`)); });
      (frame.nodes ?? []).forEach((n, i) => addClaim(n.label, `${frameRef}.nodes[${i}].label`));
      (frame.edges ?? []).forEach((e, i) => addClaim(e.label, `${frameRef}.edges[${i}].label`));
      (frame.metrics ?? []).forEach((m, i) => { addClaim(m.label, `${frameRef}.metrics[${i}].label`); addClaim(m.value, `${frameRef}.metrics[${i}].value`); });
    });
  });
  addClaim(recall.question, `${row.module}#lessonDetails[${JSON.stringify(row.slug)}].recall.question`);
  recall.options.forEach((text, i) => addClaim(text, `${row.module}#lessonDetails[${JSON.stringify(row.slug)}].recall.options[${i}]`));
  addClaim(recall.why, `${row.module}#lessonDetails[${JSON.stringify(row.slug)}].recall.why`);
  const meta = { slug: row.slug, title: row.title, hook, domain: 'cs', concept: row.concept,
    status: 'draft', durationSec: 60, owner: { categoryManager: 'cm-cs', builder: 'demo-builder' },
    learner: { knows: row.knows ?? row.assumedKnowledge ?? ['Read small arrays and follow a highlighted step.'], doesNotKnow: [row.objective] },
    misconception: row.misconception, objective: row.objective,
    claims: [...claims.values()].map(({text,address,support}, index) => ({ id: `cs.${row.slug}.c${index + 1}`, text, support, source: `${address}; illustrative finite model inputs; independent verification pending. No external source is claimed opened.`, status: 'unverified' })),
    confidence: '', recall, evidence: { qa: [], simulatedLearner: [], pairwise: [], humanLearners: [] }, version: 1, format: 'single-card',
    curriculum: { primary: `cs:${row.concept}`, also: row.also ?? [], prerequisites: row.prerequisites ?? [], level: row.level ?? 'core', strand: 'algorithms', references: row.references ?? [], tags: ['algorithms', row.topicId] },
    interactions: ['choice-before-reveal','milestone-gate','step-through','compare-inputs'] };
  if (!meta.title || meta.title.length > 40 || hook.length > 90 || !row.concept) throw new Error(`${row.slug}: invalid title/hook/concept`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'Demo.tsx'), source);
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
  console.log(row.slug);
}
console.log(`Materialized ${lessons.length} draft lessons. Independent claims and browser review remain.`);
