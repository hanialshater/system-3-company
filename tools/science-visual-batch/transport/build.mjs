import fs from 'node:fs';import path from 'node:path';
const dir='tools/science-visual-batch/transport', cases=JSON.parse(fs.readFileSync(`${dir}/cases.json`,'utf8')),template=fs.readFileSync(`${dir}/template.txt`,'utf8');
const curriculumPath='content/curriculum/life.json',curriculum=JSON.parse(fs.readFileSync(curriculumPath,'utf8'));
const slugsPath='tools/science-visual-batch/slugs.json',slugs=JSON.parse(fs.readFileSync(slugsPath,'utf8'));
const recalls={
 'oxygen-crosses-lipid-bilayer':['Does simple diffusion directly require ATP?',['No','Yes','Only for oxygen'],'Simple diffusion is passive; it does not directly consume ATP.'],
 'glucose-carrier-down-gradient':['What helps glucose cross a membrane in facilitated diffusion?',['A carrier protein','A ribosome','A DNA polymerase'],'Facilitated glucose diffusion uses a transport protein.'],
 'sodium-potassium-pump-cycle':['In one normal Na⁺/K⁺ pump cycle, how many potassium ions move into the cell?',['Two','Three','One'],'The pump moves two potassium ions in and three sodium ions out per cycle.'],
 'endocytosis-cargo-in-vesicle':['Where does cargo enclosed by an endocytic vesicle go?',['Into the cell','Out of the cell','Into the nucleus'],'Endocytosis takes material into a vesicle inside the cell.'],
 'exocytosis-cargo-leaves-vesicle':['What happens to the soluble contents of a vesicle during exocytosis?',['They are released outside','They enter the nucleus','They become DNA'],'Fusion with the plasma membrane releases soluble vesicle contents outside.']
};
for(const [i,c] of cases.entries()){
 const correct=c.options[0],shift=i%3,options=c.options.slice(shift).concat(c.options.slice(0,shift)),answer=options.indexOf(correct);
 const {question,before,after,protein,energy,button,explanation}=c;
 const lesson={question,options,answer,before,after,protein,energy,button,explanation};
 const [rq,ro,why]=recalls[c.slug];
 const meta={slug:c.slug,title:c.title,hook:'Predict where the cargo ends up, then run the model.',domain:'life',concept:c.slug,status:'draft',durationSec:60,owner:{categoryManager:'cm-life',builder:'demo-builder'},learner:{knows:['Cells have a plasma membrane separating inside from outside.'],doesNotKnow:[explanation]},misconception:'Everything crosses a cell membrane by the same mechanism.',objective:explanation,claims:[{id:`life.${c.slug}.c1`,text:`Question, stage and reveal: ${question} ${explanation}`,support:'source',source:`OpenStax ${c.source}`,status:'unverified'},{id:`life.${c.slug}.c2`,text:`Recall: ${rq} ${why}`,support:'source',source:`OpenStax ${c.source}`,status:'unverified'},{id:`life.${c.slug}.c3`,text:'The diagram is schematic and represents only selected molecules, not trajectories or all particles.',support:'convention',source:'Modelling convention',status:'unverified'}],confidence:'',recall:{question:rq,options:ro,answer:0,why},evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1};
 const out=path.join('src/demos/life',c.slug);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'Demo.tsx'),template.replace('__CASE__',JSON.stringify(lesson,null,2)));fs.writeFileSync(path.join(out,'meta.json'),JSON.stringify(meta,null,2)+'\n');
 if(!curriculum.concepts.some(x=>x.id===c.slug))curriculum.concepts.push({id:c.slug,name:c.title,level:'intro',demand:2,prerequisites:[]});if(!slugs.life.includes(c.slug))slugs.life.push(c.slug);
}
fs.writeFileSync(curriculumPath,JSON.stringify(curriculum,null,2)+'\n');fs.writeFileSync(slugsPath,JSON.stringify(slugs,null,2)+'\n');console.log(`Built ${cases.length} membrane transport lessons`);
