import fs from 'node:fs';
const cases=[
 ['dilute-four-particles-twice','Adding water to a solution',4,2,4],
 ['concentrate-four-particles','Removing water from a solution',4,4,2],
 ['dilute-six-particles-threefold','A threefold dilution',6,2,6],
 ['concentrate-six-particles','Concentrating six particles',6,3,2],
 ['dilute-eight-particles','Dilution with more solute',8,2,4],
 ['concentrate-eight-particles','Less volume, same solute',8,4,2]
];
const template=fs.readFileSync('tools/science-visual-batch/concentration/template.txt','utf8');
const curriculumPath='content/curriculum/chemistry.json', curriculum=JSON.parse(fs.readFileSync(curriculumPath));
const slugsPath='tools/science-visual-batch/slugs.json',slugs=JSON.parse(fs.readFileSync(slugsPath));
for(const [slug,title,n,before,after] of cases){
 if(n%before||n%after||n/after>4||after>6)throw Error(slug);
 const target=n/after, direction=after>before?'add water':'remove water';
 const question=`A model solution has ${n} solute particles in ${before} equal-volume compartments. You ${direction} until the volume is ${after} compartments, without losing solute. Once evenly mixed, how many particles per compartment on average?`;
 const explanation=`The same ${n} particles occupy ${after} equal compartments, so the average is ${n} ÷ ${after} = ${target} per compartment. The dots are a counting model; real particles move and are not fixed in compartments.`;
 const options=['1 per compartment','2 per compartment','3 per compartment','4 per compartment'];
 const lesson={question,options,answer:target-1,n,before,after,explanation};
 const source='OpenStax Chemistry 2e §3.3 https://openstax.org/books/chemistry-2e/pages/3-3-molarity';
 const meta={slug,title,hook:'Keep the solute; change the space it occupies.',domain:'chemistry',concept:slug,status:'draft',durationSec:60,owner:{categoryManager:'cm-chemistry',builder:'demo-builder'},learner:{knows:['Concentration compares the amount of solute with the volume of solution.'],doesNotKnow:['How changing volume with fixed solute changes average concentration.']},misconception:'Adding water removes solute particles.',objective:'Relate concentration to the ratio of solute amount to solution volume in a particle model.',claims:[{id:`chemistry.${slug}.c1`,text:`Question, stage and reveal: ${question} ${explanation}`,support:'derivation',source,status:'unverified'},{id:`chemistry.${slug}.c2`,text:'The compartments are equal-volume counting regions, not physical barriers; the particles represent a simplified evenly mixed model.',support:'convention',source:'Modelling convention',status:'unverified'},{id:`chemistry.${slug}.c3`,text:'When the amount of solute is unchanged, doubling the solution volume halves its concentration.',support:'source',source,status:'unverified'}],confidence:'',recall:{question:'You double a solution’s volume by adding solvent, keeping all solute. What happens to its concentration?',options:['It halves','It doubles','It stays the same'],answer:0,why:'Concentration is amount divided by volume; the same amount in twice the volume gives half the concentration.'},evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1};
 const out=`src/demos/chemistry/${slug}`;if(fs.existsSync(out))throw Error(`Already exists: ${slug}`);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(`${out}/Demo.tsx`,template.replace('__CASE__',JSON.stringify(lesson,null,2)));fs.writeFileSync(`${out}/meta.json`,JSON.stringify(meta,null,2)+'\n');
 if(!curriculum.concepts.some(x=>x.id===slug))curriculum.concepts.push({id:slug,name:title,level:'intro',demand:2,prerequisites:[]});if(!slugs.chemistry.includes(slug))slugs.chemistry.push(slug);
}
fs.writeFileSync(curriculumPath,JSON.stringify(curriculum,null,2)+'\n');fs.writeFileSync(slugsPath,JSON.stringify(slugs,null,2)+'\n');console.log(`Built ${cases.length} concentration exercises`);
