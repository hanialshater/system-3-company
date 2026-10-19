#!/usr/bin/env node
// Structural coverage checks, not algorithm-answer verification or learner evidence.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../../../..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'company/domains/briefs/algorithms-200.json'), 'utf8'));
const curriculum = JSON.parse(fs.readFileSync(path.join(root, 'content/curriculum/cs.json'), 'utf8'));
const lessons = data.lessons;
assert.equal(lessons.length, 200);
assert.equal(data.topics.length, 20);
for (const key of ['slug', 'concept', 'objective']) assert.equal(new Set(lessons.map(r => r[key])).size, 200, `${key} must be unique`);
const ids = new Set(curriculum.concepts.map(c => c.id));
let pending = 0;
let builderChecked = 0;
for (const topic of data.topics) {
  assert.equal(topic.slugs.length, 10, `${topic.id}: ten lessons`);
  assert.equal(lessons.filter(r => r.topicId === topic.id).length, 10);
}
for (const row of lessons) {
  assert(row.slug.startsWith('algo-'));
  assert(row.title.length <= 40, `${row.slug} title too long`);
  assert(row.objective && row.misconception && row.action && row.fixtureSpecification);
  assert(data.sources[row.sourceId]?.url.startsWith('https://'), `${row.slug}: missing source lead`);
  assert(fs.existsSync(path.join(root, 'src/demos/cs', row.nearestExisting.slug, 'meta.json')), `${row.slug}: missing nearest existing`);
  assert(lessons.some(r => r.slug === row.nearestNew.slug && r.slug !== row.slug), `${row.slug}: missing distinct nearest new`);
  assert(row.nearestExisting.distinction && row.nearestNew.distinction);
  const concept = curriculum.concepts.find(c => c.id === row.concept);
  assert.equal(concept?.subarea, 'algorithms');
  assert.equal(concept?.topic, row.topicId);
  for (const prerequisite of row.prerequisites) assert(ids.has(prerequisite), `${row.slug}: unresolved prerequisite ${prerequisite}`);
  if (row.fixture.status === 'pending-builder-model-check') {
    assert.equal(row.fixture.checkedAnswer, null, 'Pending fixtures must not claim checked answers');
    pending++;
  } else {
    assert.equal(row.fixture.status, 'builder-model-checked', `${row.slug}: unknown fixture status`);
    assert.equal(row.fixture.owner, 'demo-builder');
    assert(row.fixture.input.question && row.fixture.input.initialFrame, `${row.slug}: missing exact implemented input`);
    assert.notEqual(row.fixture.checkedAnswer, null);
    assert(row.fixture.countercase.initialFrame);
    assert.notEqual(row.fixture.countercase.checkedAnswer, null);
    assert.equal(row.fixture.sourceAddress, `${row.module}#${row.specExport}.cases[0].run()`);
    assert.equal(row.fixture.checkPath, `company/domains/briefs/checks/algorithms-200-${Math.floor((row.topicOrder - 1) / 5) + 1}.mjs`);
    assert(fs.existsSync(path.join(root, row.fixture.checkPath)));
    assert(fs.existsSync(path.join(root, row.fixture.checkResultPath)));
    assert(row.fixture.cases.length >= 2 && row.fixture.cases.every(c => c.initialFrame && c.traceFrames >= 2 && c.proof));
    assert.equal(row.fixture.cases[0].checkedAnswer, row.fixture.checkedAnswer);
    assert.equal(row.fixture.cases[1].checkedAnswer, row.fixture.countercase.checkedAnswer);
    assert(row.fixture.scope.includes('No independent claim verification'));
    builderChecked++;
  }
}
console.log(JSON.stringify({rows:200,topics:20,perTopic:10,uniqueSlugs:200,uniqueConcepts:200,uniqueObjectives:200,curriculumAdditions:200,pendingBuilderFixtures:pending,builderModelCheckedFixtures:builderChecked,sourceLeads:Object.keys(data.sources).length,scope:'taxonomy and fixture metadata shape checks only; retained builder numerical checks and independent gate reviews remain separate'},null,2));
