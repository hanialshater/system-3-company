import fs from 'node:fs';
const cases=[
 ['titration-ph-before-equivalence','A small addition of base',5,'pH before','1.48'],
 ['titration-ph-equivalence','A middle addition of base',10,'pH equal','7.00'],
 ['titration-ph-after-equivalence','More base enters',15,'pH after','12.30'],
 ['titration-excess-before','Which ion is left first?',5,'excess before','Hydronium'],
 ['titration-excess-at-equivalence','A comparison of amounts',10,'excess equal','Neither is in stoichiometric excess'],
 ['titration-excess-after','Which ion is left later?',15,'excess after','Hydroxide'],
 ['titration-base-amount-at-equality','Counting the added base',10,'added','1.00 mmol'],
 ['titration-excess-base-amount','Counting the leftover base',15,'left','0.50 mmol']
];
const template=fs.readFileSync('tools/science-visual-batch/titration/template.txt','utf8'),cp='content/curriculum/chemistry.json',cur=JSON.parse(fs.readFileSync(cp)),sp='tools/science-visual-batch/slugs.json',slugs=JSON.parse(fs.readFileSync(sp));const source='https://openstax.org/books/chemistry-2e/pages/14-7-acid-base-titrations';
for(const [i,[slug,title,target,kind,correct]] of cases.entries()){
 let choices,ask;if(kind.startsWith('pH')){choices=['1.48','7.00','12.30'];ask='What is the approximate final pH?';}else if(kind.startsWith('excess')){choices=['Hydronium','Hydroxide','Neither is in stoichiometric excess'];ask='Which species is in stoichiometric excess?';}else if(kind==='added'){choices=['0.50 mmol','1.00 mmol','1.50 mmol'];ask='How many millimoles of hydroxide were added?';}else{choices=['0.50 mmol','1.00 mmol','1.50 mmol'];ask='How many millimoles of hydroxide remain in stoichiometric excess?';}
 const shift=i%3,options=choices.slice(shift).concat(choices.slice(0,shift));
 const question=`An ideal 10 mL sample of 0.100 M HCl is mixed with ${target} mL of 0.100 M NaOH at 25 °C. Assume complete reaction, additive volumes and concentration-based pH. ${ask}`;
 const acid=1,base=target*0.1,excess=acid-base,finalVolume=10+target,ph=Math.abs(excess)<1e-9?7:excess>0?-Math.log10(excess/finalVolume):14+Math.log10(-excess/finalVolume);
 const explanation=`Initially there is 1.00 mmol acid; ${target} mL of base adds ${base.toFixed(2)} mmol hydroxide. ${excess>0?`${excess.toFixed(2)} mmol acid is left.`:excess<0?`${(-excess).toFixed(2)} mmol base is left.`:'Neither reactant is in stoichiometric excess.'} The final volume is ${finalVolume} mL and the model pH is approximately ${ph.toFixed(2)}. The model approximates activity by concentration.`;
 const lesson={question,options,answer:options.indexOf(correct),target,explanation};
 const recall={question:'For this equal-molarity HCl–NaOH model, what addition makes acid and base amounts equal?',options:['10 mL base','5 mL base','15 mL base'],answer:0,why:'10 mL of 0.100 M base supplies 1.00 mmol hydroxide, equal to the original 1.00 mmol acid.'};
 const meta={slug,title,hook:'Add base and watch the balance change.',domain:'chemistry',concept:slug,status:'draft',durationSec:60,owner:{categoryManager:'cm-chemistry',builder:'demo-builder'},learner:{knows:['Strong acid and strong base react in a 1:1 acid–base ratio.'],doesNotKnow:['How excess reagent and total volume determine pH in this ideal model.']},misconception:'Equal volumes always imply equivalence, regardless of concentration.',objective:'Use stoichiometry and the stated ideal approximation to interpret a strong-acid/base titration.',claims:[{id:`chemistry.${slug}.c1`,text:`Question, chart and reveal: ${question} ${explanation}`,support:'derivation',source:`Strong-acid/base stoichiometry and concentration approximation; OpenStax ${source}`,status:'unverified'},{id:`chemistry.${slug}.c2`,text:'The beaker is a schematic model, not a laboratory procedure or literal particle count.',support:'convention',source:'Modelling convention',status:'unverified'},{id:`chemistry.${slug}.c3`,text:`Recall: ${recall.question} ${recall.why}`,support:'derivation',source:`0.100 mol/L × 0.010 L = 0.001 mol; ${source}`,status:'unverified'}],confidence:'',recall,evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1};
 const out=`src/demos/chemistry/${slug}`;if(fs.existsSync(out))throw Error(`exists ${slug}`);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(`${out}/Demo.tsx`,template.replace('__CASE__',JSON.stringify(lesson,null,2)));fs.writeFileSync(`${out}/meta.json`,JSON.stringify(meta,null,2)+'\n');if(!cur.concepts.some(x=>x.id===slug))cur.concepts.push({id:slug,name:title,level:'intro',demand:2,prerequisites:[]});if(!slugs.chemistry.includes(slug))slugs.chemistry.push(slug);
}
fs.writeFileSync(cp,JSON.stringify(cur,null,2)+'\n');fs.writeFileSync(sp,JSON.stringify(slugs,null,2)+'\n');console.log('Built eight acid–base titration lessons');
