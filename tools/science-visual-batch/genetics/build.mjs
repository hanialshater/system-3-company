import fs from 'node:fs';
import path from 'node:path';
const dir='tools/science-visual-batch/genetics';
const cases=JSON.parse(fs.readFileSync(`${dir}/cases.json`,'utf8'));
const template=fs.readFileSync(`${dir}/template.txt`,'utf8');
const curriculumPath='content/curriculum/life.json',curriculum=JSON.parse(fs.readFileSync(curriculumPath,'utf8'));
const slugsPath='tools/science-visual-batch/slugs.json', slugs=JSON.parse(fs.readFileSync(slugsPath,'utf8'));
const recalls={
 'copy-a-dna-strand-atgc':['Which DNA base pairs with G?',['C','A','T'],'In ordinary DNA base pairing, guanine pairs with cytosine.'],
 'transcribe-a-dna-template':['What RNA base normally pairs with A in the DNA template?',['U','T','C'],'RNA uses uracil to pair with A in the DNA template.'],
 'translate-start-stop-codons':['In the standard genetic code, what does UAA signal?',['Stop translation','Add alanine','Add methionine'],'UAA is a stop codon in the standard genetic code.'],
 'two-codons-one-amino-acid':['In the standard genetic code, can two different codons encode the same amino acid?',['Yes','No','Only stop codons can'],'The genetic code is redundant: for example GAA and GAG both encode glutamate.'],
 'one-letter-changes-amino-acid':['Which amino acid does GUA specify in the standard genetic code?',['Valine','Glutamate','Tyrosine'],'GUA encodes valine in the standard genetic code.'],
 'mutation-creates-stop-codon':['Which codon signals stop in the standard genetic code?',['UAA','UAU','GUA'],'UAA signals stop; UAU specifies tyrosine and GUA specifies valine.'],
 'one-insertion-shifts-reading-frame':['A single nucleotide is inserted into a coding region. What can happen to the downstream reading frame?',['It can shift','It always stays fixed','It reverses direction'],'An insertion of one nucleotide shifts downstream triplet grouping when the same reading start is used.'],
 'splice-out-an-intron':['What is removed in the illustrated simple splicing example?',['An intron','Every exon','The DNA template'],'The example removes the intron and joins the exons.'],
 'alternate-exons-change-message':['Can different exon combinations yield different mature RNA sequences?',['Yes','No','Only in bacteria'],'Alternative splicing can join exons in different combinations in eukaryotic RNA processing.'],
 'replication-keeps-one-old-strand':['How many original strands does each daughter double helix contain after semiconservative copying?',['One','Zero','Two'],'Each daughter double helix contains one old strand and one newly synthesised strand.'],
 'chromosome-copied-before-division':['After DNA replication and before chromatid separation, how many sister chromatids are in one duplicated chromosome?',['Two','One','Four'],'A duplicated chromosome has two sister chromatids before they separate.'],
 'mitosis-two-cells-two-chromosomes':['A model cell has four chromosomes and divides by ordinary mitosis. How many chromosomes per daughter?',['Four','Two','Eight'],'Normal mitosis distributes one copy of each of the four chromosomes to each daughter cell.'],
 'meiosis-halves-chromosome-set':['A diploid model cell has 2n = 4. After normal meiosis, how many chromosomes are in each haploid cell?',['Two','Four','Eight'],'For 2n = 4 the haploid number is n = 2.']
};
for(const [i,c] of cases.entries()) {
 if(c.before.length>2||c.after.length>2||[...c.before,...c.after].some(r=>r.tokens.length>5)) throw Error('diagram overflow '+c.slug);
 let [correct,...other]=c.options; if(c.answer!==0) throw Error('input options must begin with answer');
 let options=[correct,...other], shift=i%3;options=options.slice(shift).concat(options.slice(0,shift)); const answer=options.indexOf(correct);
 const {question,before,after,button,explanation}=c;
 const lesson={question,options,answer,before,after,button,explanation};
 const [recallQuestion,recallOptions,why]=recalls[c.slug];
 const meta={slug:c.slug,title:c.title,hook:'Predict the result, then reveal the sequence.',domain:'life',concept:c.slug,status:'draft',durationSec:60,owner:{categoryManager:'cm-life',builder:'demo-builder'},learner:{knows:['DNA and RNA are sequences of chemical building blocks.'],doesNotKnow:[explanation]},misconception:'The original sequence and the resulting sequence must have the same interpretation.',objective:explanation,claims:[{id:`life.${c.slug}.c1`,text:`Question, answer, diagram and explanation: ${question} ${explanation}`,support:'source',source:`OpenStax Biology 2e ${c.source}`,status:'unverified'},{id:`life.${c.slug}.c2`,text:`Recall: ${recallQuestion} ${why}`,support:'source',source:`OpenStax Biology 2e ${c.source}`,status:'unverified'},{id:`life.${c.slug}.c3`,text:'The figure is a simplified model and is not to scale.',support:'convention',source:'Modelling convention',status:'unverified'}],confidence:'',recall:{question:recallQuestion,options:recallOptions,answer:0,why},evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1};
 const out=path.join('src/demos/life',c.slug);fs.mkdirSync(out,{recursive:true});
 fs.writeFileSync(path.join(out,'Demo.tsx'), c.slug === 'replication-keeps-one-old-strand' ? fs.readFileSync(`${dir}/replication-override.txt`, 'utf8') : template.replace('__CASE__',JSON.stringify(lesson,null,2)));
 fs.writeFileSync(path.join(out,'meta.json'),JSON.stringify(meta,null,2)+'\n');
 if(!curriculum.concepts.some(x=>x.id===c.slug))curriculum.concepts.push({id:c.slug,name:c.title,level:'intro',demand:2,prerequisites:[]});
 if(!slugs.life.includes(c.slug))slugs.life.push(c.slug);
}
fs.writeFileSync(curriculumPath,JSON.stringify(curriculum,null,2)+'\n');fs.writeFileSync(slugsPath,JSON.stringify(slugs,null,2)+'\n');
console.log(`Built ${cases.length} genetic process lessons`);
