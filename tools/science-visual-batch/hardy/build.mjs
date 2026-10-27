import fs from 'node:fs';
const cases=[
 ['hardy-heterozygote-p60','An allele-frequency puzzle',6,'Aa'],
 ['hardy-recessive-p60','The recessive genotype',6,'aa'],
 ['hardy-dominant-phenotype-p60','A dominant phenotype',6,'dominant'],
 ['hardy-heterozygote-p70','A different allele mix',7,'Aa'],
 ['hardy-recessive-p20','A common recessive allele',2,'aa'],
 ['hardy-recessive-p90','A rare recessive genotype',9,'aa'],
 ['hardy-heterozygote-p50','A balanced allele mix',5,'Aa'],
 ['hardy-dominant-phenotype-p80','A common dominant phenotype',8,'dominant'],
 ['hardy-carrier-among-dominant','A conditional genotype',5,'conditional']
];
const template=fs.readFileSync('tools/science-visual-batch/hardy/template.txt','utf8'),cp='content/curriculum/life.json',cur=JSON.parse(fs.readFileSync(cp)),sp='tools/science-visual-batch/slugs.json',slugs=JSON.parse(fs.readFileSync(sp));const source='https://openstax.org/books/biology-2e/pages/19-1-population-evolution';
const gcd=(a,b)=>b?gcd(b,a%b):a;
for(const [i,[slug,title,p,target]] of cases.entries()){
 const q=10-p,aa=p*p,het=2*p*q,rr=q*q,dom=aa+het;
 const questions={Aa:'What percentage of individuals is expected to have genotype Aa?',aa:'What percentage is expected to have genotype aa?',dominant:'If A is completely dominant, what percentage is expected to show the dominant phenotype?',conditional:'If A is completely dominant, what fraction of individuals showing the dominant phenotype is expected to be heterozygous Aa?'};
 const correct=target==='Aa'?`${het}%`:target==='aa'?`${rr}%`:target==='dominant'?`${dom}%`:`${het/gcd(het,dom)} / ${dom/gcd(het,dom)}`;
 const candidates=target==='conditional'?['1 / 2','2 / 3','3 / 4','1 / 4']:['1%','4%','16%','25%','36%','42%','48%','50%','64%','81%','84%','96%'];const opts=[correct,...candidates.filter(x=>x!==correct).slice(0,2)],shift=i%3,options=opts.slice(shift).concat(opts.slice(0,shift));
 const qtext=`In a large randomly mating population under Hardy–Weinberg assumptions, allele frequencies are p(A) = ${(p/10).toFixed(1)} and q(a) = ${(q/10).toFixed(1)}. ${questions[target]}`;
 const explain=`The model gives AA = p² = ${aa}%, Aa = 2pq = ${het}% and aa = q² = ${rr}%. ${target==='conditional'?`Among the ${dom}% with the dominant phenotype, ${het}% are Aa, so the conditional fraction is ${correct}.`:target==='dominant'?`AA and Aa both show the dominant phenotype here: ${aa}% + ${het}% = ${dom}%.`:`The requested ${target} frequency is ${correct}.`} These are ideal expectations, not a guarantee for a finite population.`;
 const lesson={question:qtext,options,answer:options.indexOf(correct),aa,het,rr,target,explanation:explain};
 const recall={question:'Under the two-allele Hardy–Weinberg model, which expression is the expected heterozygote frequency?',options:['2pq','p²','q²'],answer:0,why:'The two heterozygous combinations each contribute pq, so their sum is 2pq.'};
 const meta={slug,title,hook:'Predict the genotype mix from allele frequencies.',domain:'life',concept:slug,status:'draft',durationSec:60,owner:{categoryManager:'cm-life',builder:'demo-builder'},learner:{knows:['A and a are two alleles and their frequencies sum to one.'],doesNotKnow:['How allele frequencies determine expected genotype frequencies in the stated ideal model.']},misconception:'Allele frequency equals the frequency of its homozygous genotype.',objective:'Calculate or interpret genotype frequencies under Hardy–Weinberg assumptions.',claims:[{id:`life.${slug}.c1`,text:`Question, chart and reveal: ${qtext} ${explain}`,support:'derivation',source:`Derived from p², 2pq and q² under the stated model; OpenStax ${source}`,status:'unverified'},{id:`life.${slug}.c2`,text:'Bars are idealized expected frequencies, not measurements or guarantees for a finite population.',support:'convention',source:'Modelling convention',status:'unverified'},{id:`life.${slug}.c3`,text:`Recall: ${recall.question} ${recall.why}`,support:'derivation',source:`OpenStax ${source}`,status:'unverified'}],confidence:'',recall,evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1};
 const out=`src/demos/life/${slug}`;if(fs.existsSync(out))throw Error(`exists ${slug}`);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(`${out}/Demo.tsx`,template.replace('__CASE__',JSON.stringify(lesson,null,2)));fs.writeFileSync(`${out}/meta.json`,JSON.stringify(meta,null,2)+'\n');if(!cur.concepts.some(x=>x.id===slug))cur.concepts.push({id:slug,name:title,level:'intro',demand:2,prerequisites:[]});if(!slugs.life.includes(slug))slugs.life.push(slug);
}
fs.writeFileSync(cp,JSON.stringify(cur,null,2)+'\n');fs.writeFileSync(sp,JSON.stringify(slugs,null,2)+'\n');console.log('Built nine population-genetics expectation models');
