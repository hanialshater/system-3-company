#!/usr/bin/env node
// Metadata reconciliation only. Successful builder checks are not independent
// fact-checking, general correctness proofs, browser QA, or learner evidence.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {register} from 'node:module';

register('../../../../tests/lifehacks/typescript-loader.mjs', import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const dir = 'company/domains/briefs/checks';
const manifestPath = path.join(root, 'company/domains/briefs/algorithms-200.json');
const outputPath = path.join(root, dir, 'algorithms-200-fixture-sync-output.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const write = process.argv.includes('--write');
assert.equal(manifest.lessons.length, 200);
const hashFile = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const checks = [];

// All four checkers must pass before any fixture is relabelled. Their retained
// stdout is builder evidence; this script does not impersonate a quality role.
for (let batch = 1; batch <= 4; batch++) {
  const checkPath = `${dir}/algorithms-200-${batch}.mjs`;
  assert(fs.existsSync(path.join(root, checkPath)), `Missing builder checker ${checkPath}`);
  const run = spawnSync(process.execPath, [checkPath, ...([1, 4].includes(batch) ? ['--json'] : [])], {
    cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024,
  });
  assert.equal(run.error, undefined, `${checkPath}: ${run.error}`);
  assert.equal(run.status, 0, `${checkPath} failed:\n${run.stderr}\n${run.stdout}`);
  const resultPath = `${dir}/algorithms-200-${batch}-results.json`;
  const result = JSON.parse(run.stdout);
  if (write) fs.writeFileSync(path.join(root, resultPath), JSON.stringify(result, null, 2) + '\n');
  checks.push({batch, checkPath, checkerSha256: hashFile(checkPath), resultPath, passed: true});
}

const models = new Map();
let cases = 0;
let mismatches = 0;
for (const row of manifest.lessons) {
  if (!models.has(row.module)) models.set(row.module, await import(pathToFileURL(path.join(root, row.module)).href));
  const spec = models.get(row.module)[row.specExport];
  assert.equal(spec?.slug, row.slug, `${row.slug}: module/export address mismatch`);
  assert.equal(spec.topic, row.topicId);
  assert(spec.predict.question && spec.cases.length >= 2, `${row.slug}: exact question and countercase required`);
  const runs = spec.cases.map(c => c.run());
  const batch = Math.floor((row.topicOrder - 1) / 5) + 1;
  const checker = checks[batch - 1];
  const fixture = {
    status: 'builder-model-checked',
    owner: 'demo-builder',
    input: {question: spec.predict.question, caseLabel: spec.cases[0].label, initialFrame: runs[0].frames[0]},
    checkedAnswer: runs[0].result,
    countercase: {caseLabel: spec.cases[1].label, initialFrame: runs[1].frames[0], checkedAnswer: runs[1].result},
    sourceAddress: `${row.module}#${row.specExport}.cases[0].run()`,
    checkPath: checker.checkPath,
    checkResultPath: checker.resultPath,
    modelSha256: hashFile(row.module),
    cases: runs.map((run, index) => {
      assert.deepEqual(run, spec.cases[index].run(), `${row.slug}/${index}: deterministic`);
      assert(run.frames.length >= 2 && run.proof, `${row.slug}/${index}: trace and proof required`);
      return {caseLabel: spec.cases[index].label, sourceAddress: `${row.module}#${row.specExport}.cases[${index}].run()`, initialFrame: run.frames[0], checkedAnswer: run.result, traceFrames: run.frames.length, proof: run.proof};
    }),
    scope: 'Retained builder finite-fixture checks passed. Countercases are model outputs; semantic oracle coverage is defined by the cited checker. No independent claim verification, general correctness proof, browser QA, or learner approval is implied.',
  };
  cases += runs.length;
  if (JSON.stringify(row.fixture) !== JSON.stringify(fixture)) mismatches++;
  row.fixture = fixture;
}
manifest.fixturePolicy = 'All 200 rows contain exact model questions, initial states and actual primary/countercase results from their addressed exports. Status builder-model-checked records successful retained builder finite-fixture checkers only. The tiny fixtureSpecification remains the planning brief; fixture.input is the implemented case. Claims and independent quality gates remain unverified/open until their designated roles record findings.';
manifest.coverageSummary.reviewState = 'CM taxonomy audit and builder finite-fixture reconciliation complete; independent artifact review remains separate and open.';
manifest.coverageSummary.builderModelCheckedFixtures = 200;
manifest.coverageSummary.pendingBuilderFixtures = 0;
const output = {
  rows: 200, cases, topics: 20, builderModelCheckedFixtures: 200, pendingBuilderFixtures: 0,
  checks, models: models.size,
  scope: 'Manifest metadata reconciliation from actual model exports after retained builder checkers passed; no lesson claims or independent quality gates changed.',
};
if (write) {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');
} else {
  assert.equal(mismatches, 0, `Fixture metadata differs in ${mismatches} rows; use --write after reviewing changed models.`);
}
console.log(JSON.stringify({...output, mode: write ? 'write' : 'check'}, null, 2));
