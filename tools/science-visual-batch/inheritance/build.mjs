import fs from 'node:fs';
const cases = [
 ['cross-aa-by-aa-model','Two heterozygous parents','Aa','Aa','recessive',1],
 ['cross-aa-by-recessive-model','A carrier and a recessive parent','Aa','aa','recessive',2],
 ['cross-homozygous-opposites-model','Two different homozygotes','AA','aa','heterozygous',4],
 ['cross-dominant-by-carrier-model','A homozygote and a carrier','AA','Aa','heterozygous',2],
 ['cross-recessive-parents-model','Two recessive parents','aa','aa','recessive',4],
 ['cross-dominant-homozygotes-model','Two dominant homozygotes','AA','AA','heterozygous',0],
];
const template=fs.readFileSync('tools/science-visual-batch/inheritance/template.txt','utf8');
const curriculumPath='content/curriculum/life.json', curriculum=JSON.parse(fs.readFileSync(curriculumPath));
const slugsPath='tools/science-visual-batch/slugs.json', slugs=JSON.parse(fs.readFileSync(slugsPath));
for (const [i,[slug,title,p1,p2,kind,expected]] of cases.entries()) {
 const cells=[...p1].flatMap(a=>[...p2].map(b=>[a,b].sort().join('')));
 const count=cells.filter(x=>kind==='recessive'?x==='aa':x==='Aa').length;
 if(count!==expected)throw Error(slug);
 const condition=kind==='recessive'?'have two recessive alleles (aa)':'be heterozygous (Aa)';
 const question=`In a simple one-gene model, parents ${p1} and ${p2} each pass on one allele. Each gamete shown is equally likely. How many of the four possible combinations ${condition}?`;
 const explanation=`The four combinations are ${cells.join(', ')}. ${count} of the four ${condition}. This model assumes equally likely gametes and a single gene; it does not predict the outcome of a particular birth.`;
 const options=['0 out of 4','1 out of 4','2 out of 4','4 out of 4'];const answer=[0,1,2,4].indexOf(count);
 const lesson={question,options,answer,p1:[...p1],p2:[...p2],cells,explanation};
 const source='OpenStax Biology 2e §12.2 https://openstax.org/books/biology-2e/pages/12-2-characteristics-and-traits';
 const meta={slug,title,hook:'Combine the alleles and inspect the four possibilities.',domain:'life',concept:slug,status:'draft',durationSec:60,owner:{categoryManager:'cm-life',builder:'demo-builder'},learner:{knows:['Each parent in this model contributes one allele.'],doesNotKnow:[`How the ${p1} by ${p2} cross distributes combinations.`]},misconception:'An allele from one parent determines the whole offspring genotype.',objective:`Use a Punnett square to count ${condition} in the ${p1} by ${p2} cross.`,claims:[{id:`life.${slug}.c1`,text:`Question, grid and reveal: ${question} ${explanation}`,support:'derivation',source,status:'unverified'},{id:`life.${slug}.c2`,text:'Each square represents an equally likely combination under the stated model; siblings are not guaranteed to match the proportions.',support:'source',source,status:'unverified'},{id:`life.${slug}.c3`,text:'Recall: each parent contributes one allele to each combination.',support:'source',source,status:'unverified'}],confidence:'',recall:{question:'In this one-gene model, how many alleles does each parent contribute to an offspring?',options:['One','Two','None'],answer:0,why:'Each parent contributes one allele through a gamete in the stated model.'},evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1};
 const out=`src/demos/life/${slug}`; if(fs.existsSync(out)) throw Error(`Already exists: ${slug}`);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(`${out}/Demo.tsx`,template.replace('__CASE__',JSON.stringify(lesson,null,2)));fs.writeFileSync(`${out}/meta.json`,JSON.stringify(meta,null,2)+'\n');
 if(!curriculum.concepts.some(x=>x.id===slug))curriculum.concepts.push({id:slug,name:title,level:'intro',demand:2,prerequisites:[]});if(!slugs.life.includes(slug))slugs.life.push(slug);
}
fs.writeFileSync(curriculumPath,JSON.stringify(curriculum,null,2)+'\n');fs.writeFileSync(slugsPath,JSON.stringify(slugs,null,2)+'\n');console.log(`Built ${cases.length} inheritance examples`);
