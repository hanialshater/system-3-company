#!/usr/bin/env node
// Explicit opt-in validation; no giant client import or registry/gate changes.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { register } from 'node:module';
register('../tests/lifehacks/typescript-loader.mjs', import.meta.url);

export const stageWords = (text) => String(text).split(/\s+/).filter((token) => /\p{L}/u.test(token) && !/^[\d.,+−%-]+(?:°?[A-Za-z]|kg|ms|cm|km|MB|KB|px|s)$/u.test(token)).length;
const finite = (x) => typeof x === 'number' && Number.isFinite(x);
const normalize = (text) => String(text).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
export function frameTexts(frame) {
  return [frame.caption, ...(frame.rows ?? []).flatMap((r) => [r.label, ...r.cells.map((c) => c.text)]),
    ...(frame.nodes ?? []).map((n) => n.label), ...(frame.edges ?? []).map((e) => e.label ?? ''),
    ...(frame.metrics ?? []).flatMap((m) => [m.label, m.value])];
}
export function validateAlgorithmSpec(spec) {
  const errors = [];
  const add = (message) => errors.push(`${spec.slug ?? '?'}: ${message}`);
  if (!spec.slug || !spec.topic) add('slug/topic missing');
  const prediction = spec.predict;
  if (!prediction?.question || !Array.isArray(prediction?.options) || prediction.options.length < 2 || prediction.options.length > 4
    || !Number.isInteger(prediction.answer) || prediction.answer < 0 || prediction.answer >= prediction.options.length) add('invalid prediction');
  if (!Array.isArray(spec.cases) || spec.cases.length < 2) { add('needs two cases'); return { errors, runs: [] }; }
  const runs = [];
  for (const [caseIndex, example] of spec.cases.entries()) {
    try {
      const run = example.run();
      runs.push(run);
      if (JSON.stringify(run) !== JSON.stringify(example.run())) add(`case ${caseIndex}: nondeterministic`);
      if (!Array.isArray(run.frames) || run.frames.length < 2 || run.frames.length > 64) add(`case ${caseIndex}: trace must have 2–64 frames`);
      if (!run.proof?.trim() || !['number', 'boolean', 'string'].includes(typeof run.result) || (typeof run.result === 'number' && !finite(run.result))) add(`case ${caseIndex}: invalid proof/result`);
      for (const [i, frame] of (run.frames ?? []).entries()) {
        if (!frame.caption?.trim()) add(`case ${caseIndex}, frame ${i}: caption missing`);
        if (!(frame.rows?.length || frame.nodes?.length)) add(`case ${caseIndex}, frame ${i}: no representation`);
        if (frame.rows?.length && frame.nodes?.length) add(`case ${caseIndex}, frame ${i}: two dominant representations`);
        if ((frame.rows?.length ?? 0) > 8 || (frame.rows ?? []).some((r) => r.cells.length > 12) || (frame.rows ?? []).reduce((n, r) => n + r.cells.length, 0) > 64) add(`case ${caseIndex}, frame ${i}: grid exceeds 8 rows, 12 columns or 64 cells`);
        if ((frame.nodes?.length ?? 0) > 24) add(`case ${caseIndex}, frame ${i}: exceeds 24 nodes`);
        const ids = new Set((frame.nodes ?? []).map((n) => n.id));
        if (ids.size !== (frame.nodes?.length ?? 0)) add(`case ${caseIndex}, frame ${i}: duplicate node IDs`);
        for (const node of frame.nodes ?? []) if (!finite(node.x) || !finite(node.y) || node.x < 0 || node.x > 300 || node.y < 0 || node.y > 180) add(`case ${caseIndex}, frame ${i}: invalid coordinates`);
        for (const edge of frame.edges ?? []) if (!ids.has(edge.from) || !ids.has(edge.to)) add(`case ${caseIndex}, frame ${i}: invalid edge endpoint`);
        for (const tone of [...(frame.rows ?? []).flatMap((r) => r.cells), ...(frame.nodes ?? []), ...(frame.edges ?? [])].map((v) => v.tone)) if (tone && !['plain','active','good','bad','muted'].includes(tone)) add(`case ${caseIndex}, frame ${i}: invalid tone`);
      }
      const initial = JSON.stringify(run.frames[0]), final = JSON.stringify(run.frames.at(-1));
      if (initial === final) add(`case ${caseIndex}: input and completed state are identical`);
      const paragraphs = spec.reveal(run);
      const count = paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
      if (count > 90 || paragraphs.join(' ').length < 120) add(`case ${caseIndex}: reveal must have ≥120 characters and ≤90 words (got ${count})`);
    } catch (error) { add(`case ${caseIndex}: ${error.message}`); }
  }
  if (runs.length >= 2) {
    const signature = (run) => JSON.stringify({ result: run.result, rows: run.frames.at(-1)?.rows, nodes: run.frames.at(-1)?.nodes, edges: run.frames.at(-1)?.edges, metrics: run.frames.at(-1)?.metrics });
    if (signature(runs[0]) === signature(runs[1])) add('second case has identical result and final algorithm state');
    for (const run of runs) for (const [i, frame] of run.frames.entries()) {
      const count = stageWords([...frameTexts(frame), 'Run example Step Try another Reset Seen', runs[0].proof].join(' '));
      if (count > 25) add(`stage frame ${i}: ${count} words exceeds 25 including retained proof/controls`);
    }
  }
  return { errors: [...new Set(errors)], runs };
}

export async function checkAlgorithms({ root = process.cwd(), manifest = 'company/domains/briefs/algorithms-200.json', allowPartial = false } = {}) {
  const data = JSON.parse(fs.readFileSync(path.resolve(root, manifest), 'utf8'));
  const lessons = data.lessons ?? (data.topics ?? []).flatMap((t) => t.lessons ?? []);
  // CM manifests use a flat authoritative lesson list and per-topic slug indexes;
  // retain support for the earlier nested lesson fixtures.
  const topicSlugs = (topic) => topic.slugs ?? (topic.lessons ?? []).map((lesson) => lesson.slug);
  const errors = [], warnings = [], seen = new Set(), modules = new Map(), objectives = new Map();
  if (!allowPartial && lessons.length !== 200) errors.push(`manifest must contain 200 lessons, got ${lessons.length}`);
  if (!allowPartial && (data.topics?.length !== 20 || data.topics.some((t) => topicSlugs(t).length !== 10))) errors.push('manifest must contain 20 topics × 10 lessons');
  if (data.topics && JSON.stringify(data.topics.flatMap(topicSlugs).sort()) !== JSON.stringify(lessons.map((l) => l.slug).sort())) errors.push('topic and flat lesson lists do not match');
  for (const lesson of lessons) {
    if (seen.has(lesson.slug)) errors.push(`${lesson.slug}: duplicate manifest slug`);
    seen.add(lesson.slug);
    try {
      if (!modules.has(lesson.module)) modules.set(lesson.module, await import(pathToFileURL(path.resolve(root, lesson.module)).href));
      const spec = modules.get(lesson.module)[lesson.specExport];
      if (!spec) throw new Error(`missing named export ${lesson.specExport}`);
      if (spec.slug !== lesson.slug) errors.push(`${lesson.slug}: spec slug mismatch`);
      if (spec.topic !== lesson.topicId) errors.push(`${lesson.slug}: spec topic differs from topicId`);
      const checked = validateAlgorithmSpec(spec);
      errors.push(...checked.errors);
      const metaPath = path.join(root, 'src/demos/cs', lesson.slug, 'meta.json');
      if (!fs.existsSync(metaPath)) { errors.push(`${lesson.slug}: missing meta.json`); continue; }
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      if (meta.slug !== lesson.slug || meta.domain !== 'cs' || meta.objective !== lesson.objective) errors.push(`${lesson.slug}: metadata differs from manifest`);
      const source = fs.readFileSync(path.join(path.dirname(metaPath), 'Demo.tsx'), 'utf8');
      if (!source.includes(lesson.specExport) || !source.includes(lesson.module.replace(/^src\//, '@/').replace(/\.ts$/, ''))) errors.push(`${lesson.slug}: wrapper imports wrong model`);
      const ledger = normalize((meta.claims ?? []).map((c) => c.text).join(' '));
      const learnerSentences = [meta.hook, spec.predict.question, ...checked.runs.flatMap((r) => [r.proof, ...spec.reveal(r), ...r.frames.flatMap(frameTexts)])].filter((s) => stageWords(s) > 0);
      const missing = [...new Set(learnerSentences)].filter((sentence) => !ledger.includes(normalize(sentence)));
      if (missing.length) warnings.push(`${lesson.slug}: ${missing.length} learner-visible texts missing exact claim coverage: ${missing.slice(0, 2).join(' | ')}`);
      const key = normalize(lesson.objective);
      if (objectives.has(key)) warnings.push(`possible duplicate objectives: ${objectives.get(key)} / ${lesson.slug}`);
      objectives.set(key, lesson.slug);
      for (const [exportName, candidate] of Object.entries(modules.get(lesson.module))) if (candidate?.slug && candidate?.cases && candidate?.predict && candidate !== spec && !lessons.some((l) => l.module === lesson.module && l.specExport === exportName)) errors.push(`${lesson.module}: unmanifested spec ${exportName}`);
    } catch (error) { errors.push(`${lesson.slug}: ${error.message}`); }
  }
  return { errors: [...new Set(errors)], warnings: [...new Set(warnings)], count: lessons.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifest = process.argv.find((a) => a.startsWith('--manifest='))?.slice(11);
  try {
    const report = await checkAlgorithms({ ...(manifest ? { manifest } : {}), allowPartial: process.argv.includes('--allow-partial') });
    for (const warning of report.warnings) console.warn(`WARN ${warning}`);
    for (const error of report.errors) console.error(`ERROR ${error}`);
    console.log(`Algorithms: ${report.count} specs; ${report.errors.length} errors; ${report.warnings.length} claim/overlap warnings.`);
    process.exitCode = report.errors.length ? 1 : 0;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
