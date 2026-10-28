import fs from 'node:fs';
const here='tools/home-games',rows=fs.readFileSync(`${here}/base-games.txt`,'utf8').trim().split('\n').map(s=>s.split('|'));
const families={mime:'Acting & movement',words:'Word games',drawing:'Drawing',memory:'Memory',detective:'Guessing & deduction',observation:'Observation',story:'Storytelling',rhythm:'Rhythm & sound',paper:'Paper challenges',team:'Cooperative play'};
const formats=[
 ['classic','Classic',2,'Each player takes two turns. Give the lead one point for each successful turn. Highest score wins; ties are shared.'],
 ['teams','Teams',4,'Form two teams. Each team has four turns; only the lead’s teammates respond or assist. Each success earns the team one point. The higher team score wins; ties are shared.'],
 ['together','Together',2,'Play eight turns in total, rotating the lead. The group wins together if at least five turns succeed.'],
 ['quick','Quick round',2,'Give each attempt 30 seconds. Each player leads two turns and earns one point per success. Highest score wins; ties are shared.'],
 ['relay','Pair relay',4,'Form pairs. On each pair’s turn, both people make separate attempts with fresh challenges, helping only their partner. The pair earns one point only if both succeed. Each pair has two turns. Highest score wins.'],
];
if(rows.length!==200||rows.some(r=>r.length!==7)||new Set(rows.map(r=>r[1])).size!==200)throw Error('Expected 200 unique, complete base games');
const games=[],cur={domain:'games',owner:'cm-lifehacks',note:'200 base games grouped by mechanics; related house-rule formats share a concept.',concepts:[]};
for(const [rowIndex,row] of rows.entries()){
 const [family,id,name,materials,setup,turn,success]=row;
 if(!families[family])throw Error(`Unknown family ${family}`);cur.concepts.push({id,name,level:'intro',demand:2,prerequisites:[],subarea:family});
 for(const [modeIndex,formatRow] of formats.entries()){
  const [mode,modeName,minPlayers,format]=formatRow;
  const allowedPlayers=mode==='relay'?[4,6,8]:Array.from({length:9-minPlayers},(_,i)=>i+minPlayers),playersLabel=mode==='relay'?'4, 6 or 8':`${minPlayers}–8`;
  const slug=`game-${id}-${mode}`,title=`${name} · ${modeName}`,game={slug,baseId:id,name,title,family,familyName:families[family],mode,modeName,minPlayers,maxPlayers:8,allowedPlayers,playersLabel,materials:mode==='quick'?(materials==='None'?'A timer':`${materials}; a timer`):materials,setup,turn,success,format};games.push(game);
  const question=`In ${name}, what counts as a successful turn?`,original=[success,'The lead skips the turn without attempting it.','The group ends the round before anyone plays.'],shift=(rowIndex+modeIndex)%3,choices=original.slice(shift).concat(original.slice(0,shift)),answer=choices.indexOf(success),explanation=`Setup: ${setup} Turn: ${turn} Success: ${success} ${format}`;
  const meta={slug,title,hook:'Find a game, gather your friends and start playing.',domain:'games',concept:id,status:'draft',durationSec:60,owner:{categoryManager:'cm-lifehacks',builder:'demo-builder'},learner:{knows:['The group wants an activity to play together.'],doesNotKnow:['The setup, turn and ending for this house-rule format.']},misconception:'The group has to know a complicated rulebook before starting.',objective:`Learn how to play ${title} with friends.`,claims:[{id:`games.${slug}.c1`,text:`Original house rules: ${setup} ${turn} ${success} ${format}`,support:'convention',source:'Original playable house-rule proposal; not an authoritative ruleset for a traditional game.',status:'unverified'},{id:`games.${slug}.c2`,text:`For this version: ${playersLabel} players; materials: ${game.materials}.`,support:'convention',source:'Proposed setup and player range for this activity.',status:'unverified'}],confidence:'',recall:{question,options:choices,answer,why:success},evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1,game:{base:id,format:mode,family,minPlayers,maxPlayers:8,allowedPlayers,materials:game.materials}};
  const dir=`src/demos/games/${slug}`;if(fs.existsSync(dir)&&!process.argv.includes('--update'))throw Error(`Already exists ${slug}`);fs.mkdirSync(dir,{recursive:true});const template=fs.readFileSync(`${here}/demo-template.txt`,'utf8');fs.writeFileSync(`${dir}/Demo.tsx`,template.replace('__GAME__',JSON.stringify(game,null,2)).replace('__PREDICT__',JSON.stringify({question,choices,correct:answer,explanation},null,2)));fs.writeFileSync(`${dir}/meta.json`,JSON.stringify(meta,null,2)+'\n');
 }
}
if(games.length!==1000)throw Error(`Expected 1000, got ${games.length}`);
fs.writeFileSync('content/curriculum/games.json',JSON.stringify(cur,null,2)+'\n');fs.writeFileSync('content/home-games.json',JSON.stringify({families,games},null,2)+'\n');console.log(`Built ${games.length} labeled formats from ${rows.length} base games`);
