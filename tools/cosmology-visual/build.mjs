import fs from 'node:fs';
const root='tools/cosmology-visual';
const sources={
 scales:'https://science.nasa.gov/exoplanets/what-is-a-light-year/; https://science.nasa.gov/universe/glossary/',
 light:'https://science.nasa.gov/asset/webb/absorption-and-emission-spectra-of-various-elements/; https://science.nasa.gov/ems/01_intro/; https://science.nasa.gov/mission/webb/science-overview/science-explainers/infrared-astronomy/',
 expansion:'https://science.nasa.gov/universe/the-big-bang/; https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-constant-and-tension/',
 early:'https://science.nasa.gov/universe/the-big-bang/; https://science.nasa.gov/astrophysics/programs/physics-of-the-cosmos/big-bang-and-the-evolution-of-the-universe/',
 cmb:'https://www.esa.int/Science_Exploration/Space_Science/Planck/The_cosmic_microwave_background_and_the_distribution_of_matter_in_the_Universe; https://science.nasa.gov/astrophysics/programs/physics-of-the-cosmos/big-bang-and-the-evolution-of-the-universe/',
 dark:'https://science.nasa.gov/universe/glossary-3/a-g/; https://science.nasa.gov/missions/hubble/shining-a-light-on-dark-matter/',
 energy:'https://science.nasa.gov/astrophysics/programs/physics-of-the-cosmos/expand-our-knowledge-of-dark-energy/; https://science.nasa.gov/dark-energy/',
 structure:'https://science.nasa.gov/universe/galaxies/large-scale-structures/; https://science.nasa.gov/universe/galaxies/',
 stars:'https://science.nasa.gov/universe/stars/; https://science.nasa.gov/universe/black-holes/',
 methods:'https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-constant-and-tension/; https://science.nasa.gov/universe/glossary/'
};
const lines=fs.readFileSync(`${root}/cases.txt`,'utf8').trim().split('\n'), groups={}, cases=[],seen=new Set(),curpath='content/curriculum/physics.json',curriculum=JSON.parse(fs.readFileSync(curpath));
if(lines.length!==100)throw Error(`Expected 100 concepts, got ${lines.length}`);
for(const line of lines){
 const row=line.split('|');if(row.length!==9)throw Error(`Malformed row: ${line}`);
 const [group,id,title,question,correct,d1,d2,explanation,after]=row,focus=groups[group]??0;groups[group]=focus+1;
 const slug=`cosmology-${id}`;if(seen.has(slug)||!sources[group]||new Set([correct,d1,d2]).size!==3)throw Error(`Invalid ${slug}`);seen.add(slug);
 if(title.length>40||after.length>30||explanation.length<121)throw Error(`Layout/text budget: ${slug}`);
 const earlyFocus=[0,1,2,3,4,4,5,5,5,0],visualFocus=group==='early'?earlyFocus[focus]:focus;
 const original=[correct,d1,d2],offset=focus%3,choices=original.slice(offset).concat(original.slice(0,offset)),answer=choices.indexOf(correct),before='Explore this cosmic model';
 const lesson={slug,title,group,question,choices,correct:answer,explanation,before,after,focus:visualFocus};cases.push(lesson);
 const meta={slug,title,hook:'Explore the evidence behind a cosmic question.',domain:'physics',concept:slug,status:'draft',durationSec:60,owner:{categoryManager:'cm-physics',builder:'demo-builder'},learner:{knows:['Light and gravity help astronomers study the universe.'],doesNotKnow:[explanation]},misconception:`A learner may choose: ${d1}`,objective:`Use the visual model to reason about: ${question}`,claims:[{id:`physics.${slug}.c1`,text:`Question, correct answer and explanation: ${question} ${correct}. ${explanation}`,support:'source',source:sources[group],status:'unverified'},{id:`physics.${slug}.c2`,text:`Visual caption: ${after}. The SVG is a conceptual illustration, not measured data or a scale model.`,support:'convention',source:`Schematic interpretation informed by ${sources[group]}`,status:'unverified'}],confidence:'',recall:{question,options:choices,answer,why:explanation},evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1};
 const dir=`src/demos/physics/${slug}`;if(fs.existsSync(dir))throw Error(`Already exists ${slug}`);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(`${dir}/Demo.tsx`,fs.readFileSync(`${root}/demo-template.txt`,'utf8').replace('__LESSON__',JSON.stringify(lesson,null,2)));fs.writeFileSync(`${dir}/meta.json`,JSON.stringify(meta,null,2)+'\n');
 curriculum.concepts.push({id:slug,name:title,level:'intro',demand:2,prerequisites:[]});
}
if(Object.values(groups).some(n=>n!==10)||Object.keys(groups).length!==10)throw Error(`Unexpected group sizes: ${JSON.stringify(groups)}`);
fs.writeFileSync(curpath,JSON.stringify(curriculum,null,2)+'\n');fs.writeFileSync(`${root}/manifest.json`,JSON.stringify(cases,null,2)+'\n');console.log(`Built ${cases.length} draft lessons across ${Object.keys(groups).length} visual families.`);
