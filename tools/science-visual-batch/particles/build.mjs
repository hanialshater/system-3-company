import fs from 'node:fs';
const species={H2:{label:'H₂',atoms:['H','H']},He:{label:'He',atoms:['He']},H2O:{label:'H₂O',atoms:['H','H','O']},CO2:{label:'CO₂',atoms:['C','O','O']},O2:{label:'O₂',atoms:['O','O']},N2:{label:'N₂',atoms:['N','N']},O3:{label:'O₃',atoms:['O','O','O']},H2O2:{label:'H₂O₂',atoms:['H','H','O','O']},CO:{label:'CO',atoms:['C','O']},NH3:{label:'NH₃',atoms:['N','H','H','H']},CH4:{label:'CH₄',atoms:['C','H','H','H','H']}};
const cases=[
 ['particle-sample-hydrogen','A collection of particles',['H2','H2','H2','H2']],
 ['particle-sample-helium','Atoms under the lens',['He','He','He','He']],
 ['particle-sample-water','Three atoms in a group',['H2O','H2O','H2O','H2O']],
 ['particle-sample-carbon-dioxide','Carbon and oxygen in view',['CO2','CO2','CO2','CO2']],
 ['particle-sample-nitrogen-oxygen','A box of gases',['N2','O2','N2','O2']],
 ['particle-sample-water-carbon-dioxide','Looking at a gas sample',['H2O','CO2','H2O','CO2']],
 ['particle-sample-water-oxygen','Which kind of sample?',['H2O','O2','H2O','O2']],
 ['particle-sample-oxygen-ozone','Oxygen under the lens',['O2','O3','O2','O3']],
 ['particle-sample-water-peroxide','Hydrogen and oxygen',['H2O','H2O2','H2O','H2O2']],
 ['particle-sample-carbon-oxides','Carbon with oxygen',['CO','CO2','CO','CO2']],
 ['particle-sample-ammonia','Nitrogen and hydrogen',['NH3','NH3','NH3','NH3']],
 ['particle-sample-methane','Carbon and hydrogen',['CH4','CH4','CH4','CH4']]
];
const template=fs.readFileSync('tools/science-visual-batch/particles/template.txt','utf8'),cp='content/curriculum/chemistry.json',cur=JSON.parse(fs.readFileSync(cp)),sp='tools/science-visual-batch/slugs.json',slugs=JSON.parse(fs.readFileSync(sp));const source='https://openstax.org/books/chemistry-2e/pages/1-2-phases-and-classification-of-matter';
for(const [i,[slug,title,keys]] of cases.entries()){
 const mols=keys.map(k=>species[k]);const names=[...new Set(keys)],elements=[...new Set(mols.flatMap(m=>m.atoms))];const result=names.length>1?'A mixture':elements.length===1?'A pure element':'A pure compound';
 const opts=[result,...['A pure element','A pure compound','A mixture'].filter(x=>x!==result)],shift=i%3,options=opts.slice(shift).concat(opts.slice(0,shift));
 const count=names.map(k=>`${keys.filter(x=>x===k).length} ${species[k].label}`).join(' and ');
 const explanation=`The model contains ${count}. ${names.length>1?'The two different particle types represent a mixture of substances.':elements.length===1?'All particles are the same substance and contain only one element.':'All particles are the same substance and contain more than one element.'} Circles show atom counts, not molecular geometry.`;
 const q='Each touching group represents one particle. Is this specified sample one pure element, one pure compound, or a mixture of substances?';
 const lesson={question:q,options,answer:options.indexOf(result),mols,explanation};
 const recall={question:'A sample contains only identical O₂ molecules. How is it classified?',options:['A pure element','A pure compound','A mixture'],answer:0,why:'All molecules are the same substance and contain only oxygen atoms.'};
 const meta={slug,title,hook:'Look at the particles before naming the sample.',domain:'chemistry',concept:slug,status:'draft',durationSec:60,owner:{categoryManager:'cm-chemistry',builder:'demo-builder'},learner:{knows:['Atoms of each element are represented by a chemical symbol.'],doesNotKnow:['A pure element, a pure compound and a mixture differ by particle composition.']},misconception:'A molecule containing several atoms must be a compound.',objective:'Classify a specified particle sample by type and composition.',claims:[{id:`chemistry.${slug}.c1`,text:`Question, stage and reveal: ${q} ${explanation}`,support:'derivation',source:`Specified particle counts and chemical formulas; OpenStax ${source}`,status:'unverified'},{id:`chemistry.${slug}.c2`,text:'Atoms are shown as touching circles only to group particles; sizes and geometric arrangement are not molecular structures.',support:'convention',source:'Modelling convention',status:'unverified'},{id:`chemistry.${slug}.c3`,text:`Recall: ${recall.question} ${recall.why}`,support:'source',source:`OpenStax ${source}`,status:'unverified'}],confidence:'',recall,evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1};
 const out=`src/demos/chemistry/${slug}`;if(fs.existsSync(out))throw Error(`exists ${slug}`);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(`${out}/Demo.tsx`,template.replace('__CASE__',JSON.stringify(lesson,null,2)));fs.writeFileSync(`${out}/meta.json`,JSON.stringify(meta,null,2)+'\n');if(!cur.concepts.some(x=>x.id===slug))cur.concepts.push({id:slug,name:title,level:'intro',demand:2,prerequisites:[]});if(!slugs.chemistry.includes(slug))slugs.chemistry.push(slug);
}
fs.writeFileSync(cp,JSON.stringify(cur,null,2)+'\n');fs.writeFileSync(sp,JSON.stringify(slugs,null,2)+'\n');console.log('Built twelve particle-classification lessons');
