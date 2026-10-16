/** Compare production model to the fact-checker's separately implemented Python oracle.
 * Run after independent_models.py. This invokes production code only as comparison.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { calculateModel } from '../../../../src/lib/books/model.ts';
const requests=JSON.parse(readFileSync(new URL('./engine-requests.json',import.meta.url),'utf8'));
const results=requests.map(r=>{
  try {
    const actual=calculateModel(r.family,r.values);
    const delta=Math.abs(actual.output-r.expected);
    const pass=!r.reject&&delta<=Math.max(1e-8,Math.abs(r.expected)*1e-12);
    return {...r,actual:actual.output,trace:actual.trace,pass};
  } catch(e) {return {...r,rejected:String(e),pass:!!r.reject};}
});
let nanRejected=false;
try{calculateModel('payoff',[50,NaN,0]);}catch{nanRejected=true;}
const record={label:'Production comparison; Python oracle supplies independent expected values',cases:results,nanRejected,
  failures:results.filter(x=>!x.pass)};
writeFileSync(new URL('./engine-comparison.json',import.meta.url),JSON.stringify(record,null,2)+'\n');
console.log(JSON.stringify({cases:results.length,nanRejected,failures:record.failures},null,2));
if(record.failures.length||!nanRejected)process.exitCode=1;
