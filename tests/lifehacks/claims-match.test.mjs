// Drift check (engineering review 2026-10-14, PR #2, required change 4): learner-visible prose held in
// src/lib/lifehacks/* must appear verbatim in at least one claim text of that lesson's meta.json.
// A lib edit that changes learner text fails here until the claim is updated (and re-checked).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { studyCatalog } from '../../src/lib/lifehacks/studyCatalog.ts';

const read = path => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');
const homeSource = read('src/lib/lifehacks/home-lessons.ts');
const home = JSON.parse(homeSource.slice(homeSource.indexOf('= [') + 2, homeSource.lastIndexOf(';')));
const resource = JSON.parse(read('src/lib/lifehacks/resource-specs.json'));
const study = Object.values(studyCatalog);
const claimTexts = slug => JSON.parse(read(`src/demos/lifehacks/${slug}/meta.json`)).claims.map(c => c.text);

function check(specs, fields) {
  const missing = [];
  for (const spec of specs) {
    const texts = claimTexts(spec.slug);
    for (const field of fields) {
      const prose = spec[field];
      if (typeof prose !== 'string' || !prose.trim()) continue;
      if (!texts.some(t => t.includes(prose))) missing.push(`${spec.slug}.${field}`);
    }
  }
  assert.deepEqual(missing, [], `lib prose missing from claims: ${missing.join(', ')}`);
}

test('home: idea, limit, formula and warning appear in claims', () => check(home, ['idea', 'limit', 'formula', 'warning']));
test('resource: principle, assumptions, details and warning appear in claims', () => check(resource, ['principle', 'assumptions', 'details', 'warning']));
test('study: principle and boundary appear in claims', () => check(study, ['principle', 'boundary']));
