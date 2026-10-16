import { readFileSync,writeFileSync } from 'node:fs';
import {calculateModel} from '../../../../src/lib/books/model.ts';
const requests=JSON.parse(readFileSync(new URL('./final-artifact-engine-requests.json',import.meta.url),'utf8'));
const rows=requests.map(r=>{const actual=calculateModel(r.family,r.values).output;
 return {key:r.key,expected:r.expected,actual,pass:Math.abs(actual-r.expected)<=Math.max(1e-8,Math.abs(r.expected)*1e-12)};});
const result={label:'Final actual idea.json inputs; independent Fraction Python oracle vs production comparison',count:rows.length,
 matches:rows.filter(r=>r.pass).length,failures:rows.filter(r=>!r.pass),rows};
writeFileSync(new URL('./final-artifact-engine-comparison.json',import.meta.url),JSON.stringify(result)+'\n');
console.log(JSON.stringify({count:result.count,matches:result.matches,failures:result.failures},null,2));
if(result.failures.length)process.exitCode=1;
