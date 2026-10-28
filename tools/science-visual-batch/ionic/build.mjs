import fs from 'node:fs';
const cases=[
 ['sodium-chloride-neutral-ion-ratio','Sodium meets chloride','Na⁺',1,'Cl⁻',1,'NaCl'],
 ['potassium-oxide-neutral-ion-ratio','Potassium meets oxide','K⁺',1,'O²⁻',2,'K₂O'],
 ['calcium-chloride-neutral-ion-ratio','Calcium meets chloride','Ca²⁺',2,'Cl⁻',1,'CaCl₂'],
 ['aluminium-oxide-neutral-ion-ratio','Aluminium meets oxide','Al³⁺',3,'O²⁻',2,'Al₂O₃'],
 ['magnesium-nitride-neutral-ion-ratio','Magnesium meets nitride','Mg²⁺',2,'N³⁻',3,'Mg₃N₂'],
 ['calcium-phosphide-neutral-ion-ratio','Calcium meets phosphide','Ca²⁺',2,'P³⁻',3,'Ca₃P₂'],
 ['aluminium-nitride-neutral-ion-ratio','Aluminium meets nitride','Al³⁺',3,'N³⁻',3,'AlN'],
 ['barium-fluoride-neutral-ion-ratio','Barium meets fluoride','Ba²⁺',2,'F⁻',1,'BaF₂'],
 ['lithium-nitride-neutral-ion-ratio','Lithium meets nitride','Li⁺',1,'N³⁻',3,'Li₃N'],
 ['iron-chloride-neutral-ion-ratio','Iron(III) meets chloride','Fe³⁺',3,'Cl⁻',1,'FeCl₃'],
 ['calcium-fluoride-neutral-ion-ratio','Calcium meets fluoride','Ca²⁺',2,'F⁻',1,'CaF₂'],
 ['sodium-sulfide-neutral-ion-ratio','Sodium meets sulfide','Na⁺',1,'S²⁻',2,'Na₂S']
];
const gcd=(a,b)=>b?gcd(b,a%b):a,template=fs.readFileSync('tools/science-visual-batch/ionic/template.txt','utf8'),cp='content/curriculum/chemistry.json',cur=JSON.parse(fs.readFileSync(cp)),sp='tools/science-visual-batch/slugs.json',slugs=JSON.parse(fs.readFileSync(sp));
const source='https://openstax.org/books/chemistry-2e/pages/2-6-ionic-and-molecular-compounds';
for(const [i,[slug,title,pos,p,neg,n,formula]] of cases.entries()){
 const g=gcd(p,n),numPos=n/g,numNeg=p/g,correct=`${numPos} : ${numNeg}`;
 const alternatives=[[1,1],[1,2],[2,1],[2,3],[3,2],[1,3],[3,1]].map(x=>x.join(' : ')).filter(x=>x!==correct).slice(0,2),opts=[correct,...alternatives],shift=i%3,options=opts.slice(shift).concat(opts.slice(0,shift));
 const question=`An ionic formula unit contains ${pos} and ${neg} ions. What is the smallest whole-number ratio of positive ions to negative ions that makes the total charge zero?`;
 const explanation=`One formula unit has ${numPos} ${pos} and ${numNeg} ${neg}: its positive and negative charges each have magnitude ${numPos*p}. The simplest ratio is ${correct}, written ${formula}. A real ionic solid is an extended lattice, not isolated molecules.`;
 const lesson={question,options,answer:options.indexOf(correct),pos,p,neg,n,numPos,numNeg,formula,explanation};
 const recall={question:`If every ion count in a neutral ${formula} formula unit is doubled, what happens to the total charge?`,options:['It stays zero','It becomes positive','It becomes negative'],answer:0,why:'Doubling both positive and negative charges preserves their balance.'};
 const meta={slug,title,hook:'Build a neutral combination, then double it.',domain:'chemistry',concept:slug,status:'draft',durationSec:60,owner:{categoryManager:'cm-chemistry',builder:'demo-builder'},learner:{knows:['Ions have positive or negative charge.'],doesNotKnow:['How the simplest ion ratio makes an ionic compound electrically neutral.']},misconception:'Every ionic compound has one cation for each anion.',objective:'Use ion charges to derive the smallest charge-neutral formula-unit ratio.',claims:[{id:`chemistry.${slug}.c1`,text:`Question, diagram and reveal: ${question} ${explanation}`,support:'derivation',source:`Balance the charges and reduce the ratio; OpenStax ${source}`,status:'unverified'},{id:`chemistry.${slug}.c2`,text:'The circles depict ion counts rather than the real arrangement of an ionic lattice.',support:'convention',source:'Modelling convention',status:'unverified'},{id:`chemistry.${slug}.c3`,text:`Recall: ${recall.question} ${recall.why}`,support:'derivation',source:'Doubling zero total charge leaves zero.',status:'unverified'}],confidence:'',recall,evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1};
 const out=`src/demos/chemistry/${slug}`;if(fs.existsSync(out))throw Error(`exists ${slug}`);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(`${out}/Demo.tsx`,template.replace('__CASE__',JSON.stringify(lesson,null,2)));fs.writeFileSync(`${out}/meta.json`,JSON.stringify(meta,null,2)+'\n');if(!cur.concepts.some(x=>x.id===slug))cur.concepts.push({id:slug,name:title,level:'intro',demand:2,prerequisites:[]});if(!slugs.chemistry.includes(slug))slugs.chemistry.push(slug);
}
fs.writeFileSync(cp,JSON.stringify(cur,null,2)+'\n');fs.writeFileSync(sp,JSON.stringify(slugs,null,2)+'\n');console.log('Built twelve ionic-ratio exercises');
