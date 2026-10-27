import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const slugs=JSON.parse(fs.readFileSync('tools/science-visual-batch/slugs.json'));
const atoms=slugs.chemistry.filter(s=>s.endsWith('-neutron-model')||s.endsWith('-ion-electron-model'));
const cases=JSON.parse(fs.readFileSync('tools/science-visual-batch/life-processes/cases.json'));
function model(domain,slug){const s=fs.readFileSync(`src/demos/${domain}/${slug}/Demo.tsx`,'utf8');return JSON.parse(s.match(/const lesson:Model=(\{[\s\S]*?\});/)[1]);}
test('atomic models preserve mass and charge arithmetic',()=>{
 assert.equal(atoms.length,31);
 for(const slug of atoms){const m=model('chemistry',slug);const expected=m.kind==='nucleus'?m.mass-m.z:m.z-m.charge;assert.equal(m.correct,expected,slug);assert.equal(parseInt(m.options[m.answer]),expected,slug);assert.equal(new Set(m.options).size,4);assert.ok(expected>=0);if(m.kind==='ion')assert.ok(expected<=18);}
});
test('life-process answers, source ledgers and stages match the curated cases',()=>{
 assert.equal(cases.length,21);assert.equal(new Set(cases.map(c=>c.slug)).size,21);
 for(const c of cases){const m=model('life',c.slug),meta=JSON.parse(fs.readFileSync(`src/demos/life/${c.slug}/meta.json`));assert.equal(m.options[m.answer],c.options[0],c.slug);assert.equal(m.from,c.from);assert.equal(m.to,c.to);assert.equal(m.explanation,c.explanation);assert.equal(meta.status,'draft');assert.ok(meta.claims.every(x=>x.status==='unverified'));assert.ok(meta.claims[0].source.includes(c.source));}
});
test('chemistry-process answers, source ledgers and stages match the curated cases',()=>{
 const rows=JSON.parse(fs.readFileSync('tools/science-visual-batch/chem-processes/cases.json'));assert.equal(rows.length,19);assert.equal(new Set(rows.map(c=>c.slug)).size,19);
 for(const c of rows){const m=model('chemistry',c.slug),meta=JSON.parse(fs.readFileSync(`src/demos/chemistry/${c.slug}/meta.json`));assert.equal(m.options[m.answer],c.options[0],c.slug);assert.equal(m.from,c.from);assert.equal(m.to,c.to);assert.equal(m.explanation,c.explanation);assert.equal(meta.status,'draft');assert.ok(meta.claims.every(x=>x.status==='unverified'));assert.ok(meta.claims[0].source.includes(c.source));}
});
test('population models compute A frequency from the displayed counts',()=>{
 const names=['selection-a-survives-more-often','selection-reverses-advantage','drift-a-chance-sample','bottleneck-loses-one-allele','migration-adds-a-alleles','mutation-changes-one-allele','founder-group-is-not-average','equal-loss-same-frequency'];
 for(const s of names){const m=model('life',s);assert.equal(m.options[m.answer],`${m.after[0]} of ${m.after[0]+m.after[1]}`,s);assert.ok(m.before[0]+m.before[1]<=12&&m.after[0]+m.after[1]<=12);const meta=JSON.parse(fs.readFileSync(`src/demos/life/${s}/meta.json`));assert.equal(new Set(meta.recall.options).size,3);assert.equal(meta.recall.options[meta.recall.answer],`${m.after[0]} of ${m.after[0]+m.after[1]}`);}
});
test('heart routes match the stated normal-circulation destinations',()=>{
 const expected={'heart-blood-body-to-right-atrium':['body-ra','Right atrium'],'heart-right-atrium-to-ventricle':['ra-rv','Right ventricle'],'heart-right-ventricle-to-lungs':['rv-lungs','Lungs'],'heart-lungs-to-left-atrium':['lungs-la','Left atrium'],'heart-left-atrium-to-ventricle':['la-lv','Left ventricle'],'heart-left-ventricle-to-body':['lv-body','Body tissues']};
 for(const [slug,[route,answer]] of Object.entries(expected)){const m=model('life',slug);assert.equal(m.route,route);assert.equal(m.options[m.answer],answer);}
});
test('highlighted food-web links agree with the answer',()=>{
 const names=slugs.life.filter(x=>x.startsWith('foodweb-'));assert.equal(names.length,8);
 for(const s of names){const m=model('life',s);const direct=m.edges.filter(([a])=>a===m.target).map(([,b])=>m.nodes[b]);assert.equal(m.options[m.answer],direct.join(' and '),s);assert.ok(m.edges.every(([a,b])=>a>=0&&a<4&&b>=0&&b<4&&a!==b));}
});
test('ionic formula-unit models use minimal whole-number neutral ratios',()=>{
 const names=slugs.chemistry.filter(x=>x.endsWith('-neutral-ion-ratio'));assert.equal(names.length,12);
 for(const s of names){const m=model('chemistry',s);assert.equal(m.numPos*m.p,m.numNeg*m.n,s);assert.equal(m.options[m.answer],`${m.numPos} : ${m.numNeg}`,s);const g=(a,b)=>b?g(b,a%b):a;assert.equal(g(m.numPos,m.numNeg),1,s);assert.ok(m.numPos<=3&&m.numNeg<=3);}
});
test('enzyme model rates and answer choices agree with the stated examples',()=>{
 const cases=JSON.parse(fs.readFileSync('tools/science-visual-batch/enzymes/cases.json'));assert.equal(cases.length,8);
 const rate=([v,k],s)=>v*s/(k+s);
 for(const c of cases){const m=model('life',c.slug);assert.equal(m.options[m.answer],c.options[0],c.slug);assert.ok(Math.abs(rate(m.a,2)-rate(c.a,2))<1e-12);if(m.b)assert.ok(Math.abs(rate(m.b,2)-rate(c.b,2))<1e-12);}
 const m=model('life','enzyme-rate-half-maximum');assert.equal(rate(m.a,2),4);
 const c=model('life','enzyme-competitive-inhibitor-model');assert.ok(rate(c.a,2)>rate(c.b,2));
 const n=model('life','enzyme-noncompetitive-inhibitor-model');assert.equal(rate(n.b,2),2);
 const e=model('life','enzyme-double-concentration-model');assert.equal(rate(e.b,2),8);
 const t=model('life','enzyme-vmax-km-tradeoff');assert.ok(rate(t.b,2)>rate(t.a,2));
});
test('gas-law final states match the stated fixed conditions',()=>{
 const names=slugs.chemistry.filter(x=>x.startsWith('gas-')&&x.endsWith('-model'));assert.equal(names.length,8);
 for(const slug of names){const m=model('chemistry',slug);let expected;if(m.mode==='volume')expected=m.p*m.v/m.end;else if(m.mode==='tempP')expected=m.v*m.end/m.t;else if(m.mode==='tempV')expected=m.p*m.end/m.t;else if(m.mode==='amountP')expected=m.v*m.end;else expected=m.p*m.end;assert.equal(parseFloat(m.options[m.answer]),expected,slug);}
});
test('rooted-tree highlighted paths support each stated answer',()=>{
 const expecteds={'tree-balanced-first-clade':['balanced','A and B',[2,3]],'tree-balanced-second-clade':['balanced','C and D',[4,5]],'tree-balanced-closest-to-a':['balanced','B',[2,3]],'tree-balanced-closest-to-c':['balanced','D',[4,5]],'tree-balanced-a-and-c-ancestor':['balanced','R',[0,1,2,4]],'tree-balanced-compare-pairs':['balanced','A and B',[2,3]],'tree-ladder-b-compare-c-a':['ladder','C',[2,3,4]],'tree-ladder-c-and-d':['ladder','D',[4,5]],'tree-ladder-a-c-ancestor':['ladder','R',[0,1,3,4]],'tree-ladder-b-d-ancestor':['ladder','N1',[2,3,5]]};
 for(const [slug,[topology,answer,paths]] of Object.entries(expecteds)){const m=model('life',slug);assert.equal(m.topology,topology);assert.equal(m.options[m.answer],answer);assert.deepEqual(m.highlight,paths);}
});
test('particle samples classify by species and element composition',()=>{
 const names=slugs.chemistry.filter(x=>x.startsWith('particle-sample-'));assert.equal(names.length,12);
 for(const s of names){const m=model('chemistry',s),species=new Set(m.mols.map(x=>x.label)),elements=new Set(m.mols.flatMap(x=>x.atoms));const expected=species.size>1?'A mixture':elements.size===1?'A pure element':'A pure compound';assert.equal(m.options[m.answer],expected,s);assert.equal(m.mols.length,4);}
});
test('osmosis direction matches the initial nonpenetrating-solute comparison',()=>{
 const names=['animal-cell-hypertonic-water-leaves','animal-cell-hypotonic-water-enters','animal-cell-isotonic-no-net-water','plant-cell-hypotonic-turgor','plant-cell-hypertonic-plasmolysis'];
 for(const s of names){const m=model('life',s),inside=parseFloat(m.inside),outside=parseFloat(m.outside),direction=outside>inside?'out':outside<inside?'in':'none';assert.equal(m.direction,direction,s);assert.equal(m.options[m.answer],{in:'Net into the cell',out:'Net out of the cell',none:'No net movement'}[direction],s);}
});
test('cell-energy location diagrams select the curated compartment',()=>{
 const rows=JSON.parse(fs.readFileSync('tools/science-visual-batch/cell-energy/cases.json'));assert.equal(rows.length,15);
 for(const c of rows){const m=model('life',c.slug);assert.equal(m.kind,c.kind);assert.equal(m.target,c.target);assert.equal(m.options[m.answer],c.target,c.slug);assert.equal(m.explanation,c.why);}
});
test('strong-acid titration cases agree with independent excess and pH calculations',()=>{
 const names=slugs.chemistry.filter(x=>x.startsWith('titration-'));assert.equal(names.length,8);
 for(const slug of names){const m=model('chemistry',slug),base=.1*m.target,excess=1-base,ph=Math.abs(excess)<1e-9?7:excess>0?-Math.log10(excess/(10+m.target)):14+Math.log10(-excess/(10+m.target));const answer=m.options[m.answer];if(slug.includes('-ph-'))assert.equal(answer,ph.toFixed(2),slug);else if(slug.includes('-excess-')&&slug!=='titration-excess-base-amount')assert.equal(answer,excess>0?'Hydronium':excess<0?'Hydroxide':'Neither is in stoichiometric excess',slug);else if(slug==='titration-base-amount-at-equality')assert.equal(answer,`${base.toFixed(2)} mmol`);else assert.equal(answer,`${(-excess).toFixed(2)} mmol`);}
});
test('Hardy–Weinberg bars sum to 100% and selected outcomes are consistent',()=>{
 const names=slugs.life.filter(x=>x.startsWith('hardy-'));assert.equal(names.length,9);
 for(const s of names){const m=model('life',s);assert.equal(m.aa+m.het+m.rr,100,s);if(m.target==='Aa')assert.equal(m.options[m.answer],`${m.het}%`);if(m.target==='aa')assert.equal(m.options[m.answer],`${m.rr}%`);if(m.target==='dominant')assert.equal(m.options[m.answer],`${m.aa+m.het}%`);if(m.target==='conditional')assert.equal(m.options[m.answer],'2 / 3');}
});
test('neural-signaling scenes match the specified actions and answers',()=>{
 const rows=JSON.parse(fs.readFileSync('tools/science-visual-batch/neural/cases.json'));assert.equal(rows.length,9);
 for(const c of rows){const m=model('life',c.slug);assert.equal(m.kind,c.kind);assert.equal(m.action,c.action);assert.equal(m.options[m.answer],c.options[0],c.slug);assert.equal(m.explanation,c.why);}
});
test('immune models and recall records correspond to their curated interactions',()=>{
 const rows=JSON.parse(fs.readFileSync('tools/science-visual-batch/immunity/cases.json'));assert.equal(rows.length,15);
 for(const c of rows){const m=model('life',c.slug),meta=JSON.parse(fs.readFileSync(`src/demos/life/${c.slug}/meta.json`));assert.equal(m.options[m.answer],c.options[0],c.slug);assert.equal(m.toIcon,c.toIcon);assert.equal(m.explanation,c.why);assert.deepEqual(meta.recall,c.recall);assert.equal(new Set(meta.recall.options).size,3);}
});
test('reaction-energy questions match their plotted barrier and endpoint values',()=>{
 const names=slugs.chemistry.filter(x=>x.startsWith('energy-exo-')||x.startsWith('energy-endo-'));assert.equal(names.length,12);
 for(const s of names){const m=model('chemistry',s),answer=m.options[m.answer];if(s.endsWith('forward-barrier'))assert.equal(parseInt(answer),m.before-m.react,s);else if(s.endsWith('reverse-barrier'))assert.equal(parseInt(answer),m.before-m.product,s);else if(s.endsWith('catalyst-barrier'))assert.equal(parseInt(answer),m.after-m.react,s);else if(s.endsWith('endpoint-change')||s.endsWith('catalyst-endpoints'))assert.equal(parseInt(answer.replace('−','-')),m.product-m.react,s);else assert.equal(answer,m.react<m.product?'Reactants':'Products',s);assert.ok(m.after>Math.max(m.react,m.product)&&m.after<m.before);}
});
test('periodic-table comparisons match the curated higher-energy element',()=>{
 const pairs={'ionization-beryllium-vs-boron':'Be','ionization-nitrogen-vs-oxygen':'N','ionization-magnesium-vs-aluminium':'Mg','ionization-phosphorus-vs-sulfur':'P','ionization-sodium-vs-magnesium':'Mg','ionization-lithium-vs-sodium':'Li','ionization-sodium-vs-potassium':'Na','ionization-fluorine-vs-chlorine':'F','ionization-carbon-vs-nitrogen':'N','ionization-oxygen-vs-fluorine':'F','ionization-aluminium-vs-silicon':'Si','ionization-sulfur-vs-chlorine':'Cl'};
 for(const [s,w] of Object.entries(pairs)){const m=model('chemistry',s);assert.equal(m.winner,w);assert.equal(m.options[m.answer],w);}
});
test('ecological interaction signs agree with the stated case',()=>{
 const rows=JSON.parse(fs.readFileSync('tools/science-visual-batch/interactions/cases.json'));assert.equal(rows.length,12);
 for(const c of rows){const m=model('life',c.slug),meta=JSON.parse(fs.readFileSync(`src/demos/life/${c.slug}/meta.json`));assert.equal(m.options[m.answer],c.signs,c.slug);assert.deepEqual(m.signs,c.signs.split(' / '));assert.equal(meta.recall.options[meta.recall.answer],c.kind);}
});
test('condensed organic structures have valid displayed bond valences',()=>{
 const names=slugs.chemistry.filter(x=>x.startsWith('organic-'));assert.equal(names.length,15);
 const need={'CH₃':1,'CH₂':2,'CH':3,'C':4,'O':2,'H':1,'NH₂':1,'Cl':1,'N':3,'S':2};
 for(const s of names){const m=model('chemistry',s),totals=Array(m.nodes.length).fill(0);for(const [a,b,n] of m.edges){assert.ok(a>=0&&a<totals.length&&b>=0&&b<totals.length&&a!==b&&[1,2,3].includes(n));totals[a]+=n;totals[b]+=n;}for(const [i,node] of m.nodes.entries())assert.equal(totals[i],need[node.label],`${s}: ${node.label}`);assert.ok(m.highlight.every(x=>x>=0&&x<m.nodes.length));assert.equal(new Set(m.options).size,3);}
});
test('limiting-reactant models conserve atoms and identify the correct limiting ratio',()=>{
 const names=slugs.chemistry.filter(x=>x.startsWith('limit-'));assert.equal(names.length,12);
 const specs={'2 H₂ + O₂ → 2 H₂O':['H₂',2,'O₂',1],'N₂ + 3 H₂ → 2 NH₃':['N₂',1,'H₂',3],'CH₄ + 2 O₂ → CO₂ + 2 H₂O':['CH₄',1,'O₂',2],'2 CO + O₂ → 2 CO₂':['CO',2,'O₂',1]};
 const totals=ms=>ms.flatMap(m=>m.atoms).reduce((o,a)=>(o[a]=(o[a]||0)+1,o),{}),sort=x=>Object.entries(x).sort();
 for(const s of names){const m=model('chemistry',s),[a,ca,b,cb]=specs[m.equation],n1=m.before.filter(x=>x.label===a).length,n2=m.before.filter(x=>x.label===b).length,cmp=n1*cb-n2*ca;assert.equal(m.options[m.answer],cmp<0?a:cmp>0?b:'Both run out together',s);assert.deepEqual(sort(totals(m.before)),sort(totals(m.after)),s);assert.ok(m.before.length<=8&&m.after.length<=8);}
});
test('digestive maps select the curated organ or route',()=>{
 const rows=JSON.parse(fs.readFileSync('tools/science-visual-batch/digestion/cases.json'));assert.equal(rows.length,15);
 for(const c of rows){const m=model('life',c.slug),meta=JSON.parse(fs.readFileSync(`src/demos/life/${c.slug}/meta.json`));assert.equal(m.context,c.context);assert.equal(m.target,c.target);assert.equal(m.options[m.answer],c.target);assert.ok(m.options.length<=4);assert.equal(meta.recall.options[meta.recall.answer],c.target);}
});
test('endocrine diagrams and recall sources match the curated hormone pathways',()=>{
 const rows=JSON.parse(fs.readFileSync('tools/science-visual-batch/endocrine/cases.json'));assert.equal(rows.length,16);
 for(const c of rows){const m=model('life',c.slug),meta=JSON.parse(fs.readFileSync(`src/demos/life/${c.slug}/meta.json`));assert.equal(m.options[m.answer],c.options[0],c.slug);assert.equal(m.from,c.from);assert.equal(m.to,c.to);assert.equal(m.hormone,c.hormone);assert.equal(meta.recall.options[meta.recall.answer],c.from);}
});
test('calorimetry models calculate signed heat and final temperature',()=>{
 const names=slugs.chemistry.filter(s=>s.startsWith('heat-block-')||s.startsWith('cool-block-'));assert.equal(names.length,12);
 for(const s of names){const m=model('chemistry',s),final=20+m.q/(m.m*m.c);assert.equal(m.options[m.answer],`${final} °C`,s);assert.ok(final>=10&&final<=30);assert.equal(Math.sign(m.q),s.startsWith('heat-')?1:-1);}
});
test('mass-to-mole examples divide by the given molar mass',()=>{
 const names=slugs.chemistry.filter(s=>s.startsWith('moles-'));assert.equal(names.length,18);
 for(const s of names){const m=model('chemistry',s);assert.equal(m.mass/m.molarMass,m.moles,s);assert.equal(m.options[m.answer],`${m.moles} mol`,s);assert.equal(new Set(m.options).size,3);}
});
test('neutral first-18 shell counts conserve electrons and identify the outer count',()=>{
 const names=slugs.chemistry.filter(s=>s.startsWith('outer-shell-'));assert.equal(names.length,18);
 for(const s of names){const m=model('chemistry',s),n=m.shells.at(-1);assert.equal(m.shells.reduce((a,b)=>a+b,0),m.atomicNumber,s);assert.deepEqual(m.shells,[Math.min(m.atomicNumber,2),Math.min(Math.max(m.atomicNumber-2,0),8),Math.max(m.atomicNumber-10,0)].filter(Boolean));assert.equal(parseInt(m.options[m.answer]),n);}
});
test('reaction quotients and yield percentages agree with displayed values',()=>{
 const eq=slugs.chemistry.filter(s=>s.startsWith('equilibrium-k')),ys=slugs.chemistry.filter(s=>s.startsWith('percent-yield-'));assert.equal(eq.length,16);assert.equal(ys.length,15);
 for(const s of eq){const m=model('chemistry',s);assert.equal(m.q,m.b/m.a);assert.equal(m.options[m.answer],m.q<m.k?'Net forward toward B':m.q>m.k?'Net reverse toward A':'No net reaction at equilibrium',s);}
 for(const s of ys){const m=model('chemistry',s);assert.equal(m.actual/m.theoretical*100,m.percent,s);assert.equal(m.options[m.answer],`${m.percent}%`,s);assert.ok(m.actual<=m.theoretical);}
});
test('cell-cycle, plant and bacterial choices agree with each labeled model',()=>{
 const families=[['cell-cycle-',16],['plant-feature-',28],['bacterium-',14]];
 for(const [prefix,n] of families){const names=slugs.life.filter(s=>s.startsWith(prefix));assert.equal(names.length,n);for(const s of names){const m=model('life',s),meta=JSON.parse(fs.readFileSync(`src/demos/life/${s}/meta.json`));assert.equal(new Set(m.options).size,3,s);assert.equal(meta.recall.options[meta.recall.answer],prefix==='cell-cycle-'?m.phase:m.feature,s);const correct=prefix==='cell-cycle-'?(s.endsWith('-stage')?m.phase:m.event):prefix==='plant-feature-'?(s.endsWith('-identify')?m.feature:m.functionText):(s.endsWith('-identify')?m.feature:m.role);assert.equal(m.options[m.answer],correct,s);}}
});
