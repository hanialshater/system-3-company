import fs from 'node:fs';
const cases=[
 ['energy-exo-forward-barrier','A forward barrier',20,10,'forward','30 units'],
 ['energy-exo-reverse-barrier','The reverse barrier',20,10,'reverse','40 units'],
 ['energy-exo-endpoint-change','Products and reactants',20,10,'delta','−10 units'],
 ['energy-exo-catalyst-barrier','A lower route',20,10,'catalyzed','15 units'],
 ['energy-exo-catalyst-endpoints','A catalyst and endpoints',20,10,'catalystDelta','−10 units'],
 ['energy-exo-lower-endpoint','Which endpoint is lower?',20,10,'lower','Products'],
 ['energy-endo-forward-barrier','A different forward barrier',10,20,'forward','40 units'],
 ['energy-endo-reverse-barrier','A different reverse barrier',10,20,'reverse','30 units'],
 ['energy-endo-endpoint-change','A positive energy change',10,20,'delta','+10 units'],
 ['energy-endo-catalyst-barrier','Another lower route',10,20,'catalyzed','25 units'],
 ['energy-endo-catalyst-endpoints','The same endpoint change',10,20,'catalystDelta','+10 units'],
 ['energy-endo-lower-endpoint','The lower starting side',10,20,'lower','Reactants']
];
const template=fs.readFileSync('tools/science-visual-batch/reaction-energy/template.txt','utf8'),cp='content/curriculum/chemistry.json',cur=JSON.parse(fs.readFileSync(cp)),sp='tools/science-visual-batch/slugs.json',slugs=JSON.parse(fs.readFileSync(sp));const source='https://openstax.org/books/chemistry-2e/pages/12-7-catalysis';
for(const [i,[slug,title,react,product,kind,correct]] of cases.entries()){
 const before=50,after=35;let ask,choices;
 if(kind==='forward'){ask='What is the uncatalyzed forward activation barrier?';choices=[correct,`${before-product} units`,`${before} units`];}
 else if(kind==='reverse'){ask='What is the uncatalyzed reverse activation barrier?';choices=[correct,`${before-react} units`,`${before} units`];}
 else if(kind==='delta'||kind==='catalystDelta'){ask=kind==='delta'?'What is product energy minus reactant energy?':'After the lower-barrier route is added, what is product energy minus reactant energy?';choices=[correct,correct.startsWith('−')?'+10 units':'−10 units','0 units'];}
 else if(kind==='catalyzed'){ask='A catalyst provides a route with a peak at 35 units. What is its forward activation barrier?';choices=[correct,`${before-react} units`,'35 units'];}
 else{ask='Which side of the model has the lower energy?';choices=[correct,correct==='Products'?'Reactants':'Products','They are equal'];}
 if(new Set(choices).size!==3)throw Error(slug);
 const shift=i%3,options=choices.slice(shift).concat(choices.slice(0,shift));
 const question=`In this one-step energy model, reactants are at ${react} units, products at ${product} units and the uncatalyzed peak at ${before} units. ${ask}`;
 const delta=product-react,deltaText=`${delta>0?'+':'−'}${Math.abs(delta)}`;
 const explanation=`The uncatalyzed forward barrier is ${before} − ${react} = ${before-react}; the reverse barrier is ${before} − ${product} = ${before-product}. Product minus reactant energy is ${deltaText} units. The alternate peak at ${after} gives a forward barrier of ${after-react}. The catalyst changes the path, not the endpoints in this model.`;
 const lesson={question,options,answer:options.indexOf(correct),react,product,before,after,explanation};
 const recall={question:'In a one-step energy profile, how do you calculate the forward activation barrier?',options:['Peak energy minus reactant energy','Product energy minus peak energy','Reactant energy minus product energy'],answer:0,why:'The forward activation barrier is the peak energy relative to the reactant starting level.'};
 const meta={slug,title,hook:'Compare two paths over an energy barrier.',domain:'chemistry',concept:slug,status:'draft',durationSec:60,owner:{categoryManager:'cm-chemistry',builder:'demo-builder'},learner:{knows:['A reaction can be shown as an energy profile.'],doesNotKnow:['Activation barriers are measured relative to the starting side of a reaction.']},misconception:'A catalyst changes the energy difference between reactants and products.',objective:'Read forward and reverse barriers and endpoint differences from a stipulated energy profile.',claims:[{id:`chemistry.${slug}.c1`,text:`Question, diagram and explanation: ${question} ${explanation}`,support:'derivation',source:`Values specified in the model; activation profile and catalysis: OpenStax ${source}`,status:'unverified'},{id:`chemistry.${slug}.c2`,text:'The diagram is a one-step idealized energy profile in arbitrary units, not measured kinetic data.',support:'convention',source:'Modelling convention',status:'unverified'},{id:`chemistry.${slug}.c3`,text:`Recall: ${recall.question} ${recall.why}`,support:'source',source:`OpenStax ${source}`,status:'unverified'}],confidence:'',recall,evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1};
 const out=`src/demos/chemistry/${slug}`;if(fs.existsSync(out))throw Error(`exists ${slug}`);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(`${out}/Demo.tsx`,template.replace('__CASE__',JSON.stringify(lesson,null,2)));fs.writeFileSync(`${out}/meta.json`,JSON.stringify(meta,null,2)+'\n');if(!cur.concepts.some(x=>x.id===slug))cur.concepts.push({id:slug,name:title,level:'intro',demand:2,prerequisites:[]});if(!slugs.chemistry.includes(slug))slugs.chemistry.push(slug);
}
fs.writeFileSync(cp,JSON.stringify(cur,null,2)+'\n');fs.writeFileSync(sp,JSON.stringify(slugs,null,2)+'\n');console.log('Built twelve reaction-energy exercises');
