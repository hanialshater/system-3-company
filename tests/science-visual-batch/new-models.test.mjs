import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const slugs=JSON.parse(fs.readFileSync('tools/science-visual-batch/slugs.json'));
function model(domain,slug){const text=fs.readFileSync(`src/demos/${domain}/${slug}/Demo.tsx`,'utf8');return JSON.parse(text.match(/const lesson:Model=(\{[\s\S]*?\});/)[1]);}
const crosses=slugs.life.filter(s=>s.startsWith('cross-')&&s.endsWith('-model'));
const solutions=slugs.chemistry.filter(s=>/^(dilute|concentrate)-(four|six|eight)-particles/.test(s));
test('Punnett cells and selected outcomes match both parents',()=>{
 assert.equal(crosses.length,6);
 for(const slug of crosses){const m=model('life',slug);const expected=m.p1.flatMap(a=>m.p2.map(b=>[a,b].sort().join('')));assert.deepEqual(m.cells,expected);const genotype=m.question.includes('heterozygous')?'Aa':'aa';const count=expected.filter(x=>x===genotype).length;assert.equal(m.options[m.answer],`${count} out of 4`);}
});
test('solutions conserve dots and calculate concentration per equal volume',()=>{
 assert.equal(solutions.length,6);
 for(const slug of solutions){const m=model('chemistry',slug);assert.equal(m.n%m.before,0);assert.equal(m.n%m.after,0);assert.equal(m.options[m.answer],`${m.n/m.after} per compartment`);assert.ok(m.n/m.before<=4&&m.n/m.after<=4);}
});
