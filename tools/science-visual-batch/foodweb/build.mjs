import fs from 'node:fs';
const cases=[
 ['foodweb-grass-feeds-two','A meadow splits the meal',['Grass','Rabbit','Mouse','Fox'],[[0,1],[0,2],[1,3],[2,3]],0],
 ['foodweb-algae-supports-two','A pond web',['Algae','Snail','Fish','Heron'],[[0,1],[0,2],[1,2],[2,3]],0],
 ['foodweb-grasshopper-eaten','From insect to predator',['Grass','Grasshopper','Frog','Snake'],[[0,1],[1,2],[2,3]],1],
 ['foodweb-bird-feeds-hawk','A woodland sequence',['Leaves','Caterpillar','Bird','Hawk'],[[0,1],[1,2],[2,3]],2],
 ['foodweb-seaweed-two-consumers','A coastal web',['Seaweed','Urchin','Fish','Otter'],[[0,1],[0,2],[1,3]],0],
 ['foodweb-rabbit-two-hunters','One prey, two hunters',['Grass','Rabbit','Fox','Hawk'],[[0,1],[1,2],[1,3]],1],
 ['foodweb-krill-two-consumers','A marine web',['Plankton','Krill','Fish','Whale'],[[0,1],[1,2],[1,3]],1],
 ['foodweb-snake-to-hawk','A longer route',['Seeds','Mouse','Hawk','Snake'],[[0,1],[1,2],[1,3],[3,2]],3]
];
const template=fs.readFileSync('tools/science-visual-batch/foodweb/template.txt','utf8'),cp='content/curriculum/life.json',cur=JSON.parse(fs.readFileSync(cp)),sp='tools/science-visual-batch/slugs.json',slugs=JSON.parse(fs.readFileSync(sp));
const source='https://openstax.org/books/biology-2e/pages/46-1-ecology-of-ecosystems';
for(const [i,[slug,title,nodes,edges,target]] of cases.entries()){
 const direct=edges.filter(([a])=>a===target).map(([,b])=>nodes[b]);if(direct.length<1||direct.length>2)throw Error(slug);
 const correct=direct.join(' and ');const alternatives=direct.length===1?nodes.filter(x=>x!==correct).slice(0,2):[nodes[0]+' and '+nodes[3],nodes[1]+' and '+nodes[3]].filter(x=>x!==correct);
 const opts=[correct,...alternatives];if(opts.length!==3||new Set(opts).size!==3)throw Error(slug);
 const shift=i%3,options=opts.slice(shift).concat(opts.slice(0,shift));
 const question=`In this simplified food web, arrows point from food to eater. Which ${direct.length===1?'organism receives':'organisms receive'} energy directly from ${nodes[target]}?`;
 const explanation=`The highlighted ${direct.length===1?'arrow points':'arrows point'} from ${nodes[target]} to ${correct}. These arrows represent feeding links in this stipulated web; real food webs have additional species and links.`;
 const lesson={question,options,answer:options.indexOf(correct),nodes,edges,target,explanation};
 const recall={question:`An arrow goes from ${nodes[target]} to ${direct[0]} in a food web. What does the arrow indicate?`,options:[`${direct[0]} eats ${nodes[target]}`,`${nodes[target]} eats ${direct[0]}`,'Neither receives energy'],answer:0,why:'The arrow points from the food source toward the consumer.'};
 const meta={slug,title,hook:'Follow the arrows through a small food web.',domain:'life',concept:slug,status:'draft',durationSec:60,owner:{categoryManager:'cm-life',builder:'demo-builder'},learner:{knows:['Organisms obtain energy by feeding.'],doesNotKnow:['Food-web arrows point from a food source to its consumer.']},misconception:'A food-web arrow points from predator to prey.',objective:'Read direct feeding links and energy-flow direction in a specified food web.',claims:[{id:`life.${slug}.c1`,text:`Question, diagram and explanation: ${question} ${explanation}`,support:'convention',source:`Stipulated teaching model; arrow convention: OpenStax ${source}`,status:'unverified'},{id:`life.${slug}.c2`,text:'This web is a selected hypothetical model, not a complete or universally observed food web.',support:'convention',source:'Modelling convention',status:'unverified'},{id:`life.${slug}.c3`,text:`Recall: ${recall.question} ${recall.why}`,support:'source',source:`OpenStax ${source}`,status:'unverified'}],confidence:'',recall,evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1};
 const out=`src/demos/life/${slug}`;if(fs.existsSync(out))throw Error(`exists ${slug}`);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(`${out}/Demo.tsx`,template.replace('__CASE__',JSON.stringify(lesson,null,2)));fs.writeFileSync(`${out}/meta.json`,JSON.stringify(meta,null,2)+'\n');if(!cur.concepts.some(x=>x.id===slug))cur.concepts.push({id:slug,name:title,level:'intro',demand:2,prerequisites:[]});if(!slugs.life.includes(slug))slugs.life.push(slug);
}
fs.writeFileSync(cp,JSON.stringify(cur,null,2)+'\n');fs.writeFileSync(sp,JSON.stringify(slugs,null,2)+'\n');console.log('Built eight food-web lessons');
