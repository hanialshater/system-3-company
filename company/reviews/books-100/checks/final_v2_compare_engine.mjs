/** Actual v2 payload comparison. Python supplies independent expected arithmetic and
 * exact-input caption strings; production is invoked here only as the target. */
import {readFileSync,writeFileSync} from 'node:fs';
import {calculateModel,formatCompoundOperation} from '../../../../src/lib/books/model.ts';
const requests=JSON.parse(readFileSync(new URL('./final-v2-artifact-engine-requests.json',import.meta.url),'utf8'));
const captions=JSON.parse(readFileSync(new URL('./final-v2-caption-requests.json',import.meta.url),'utf8'));
const rows=requests.map(r=>{const actual=calculateModel(r.family,r.values).output;
 return {key:r.key,expected:r.expected,actual,pass:Math.abs(actual-r.expected)<=Math.max(1e-8,Math.abs(r.expected)*1e-12)};});
const captionRows=captions.map(r=>{const actual=formatCompoundOperation(r.rate,r.addition);
 return {...r,actual,pass:actual===r.expectedCaption};});
const result={label:'v2 actual idea.json inputs: independent Fraction Python oracle and exact literal captions vs production comparison',count:rows.length,
 matches:rows.filter(r=>r.pass).length,failures:rows.filter(r=>!r.pass),captionCount:captionRows.length,
 captionMatches:captionRows.filter(r=>r.pass).length,captionFailures:captionRows.filter(r=>!r.pass),rows,captionRows};
writeFileSync(new URL('./final-v2-artifact-engine-comparison.json',import.meta.url),JSON.stringify(result)+'\n');
console.log(JSON.stringify({count:result.count,matches:result.matches,failures:result.failures,captionCount:result.captionCount,
 captionMatches:result.captionMatches,captionFailures:result.captionFailures},null,2));
if(result.failures.length||result.captionFailures.length)process.exitCode=1;
