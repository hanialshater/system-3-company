(function(root){
  'use strict';
  const sum = o => Object.values(o).reduce((a,b)=>a+b,0);
  const clamp = n => Math.max(0,Math.min(1,n));
  function rng(seed){ return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;}; }
  function pwl(x,c){if(x<=c.bps[0])return c.vals[0];for(let i=1;i<c.bps.length;i++)if(x<=c.bps[i])return c.vals[i-1]+(c.vals[i]-c.vals[i-1])*(x-c.bps[i-1])/(c.bps[i]-c.bps[i-1]);return c.vals[c.vals.length-1];}
  function detect(feat,shapes,confirmed={}){const out={};for(const [p,cs] of Object.entries(shapes)){let w=0,s=0;for(const c of cs){w+=c.w;s+=c.w*pwl(feat[c.signal]??0,c);}out[p]=clamp(s/Math.max(w,1e-9))*(1-clamp(confirmed[p]||0));}return out;}
  function terms(mod,remaining,exposure,slot){return [{label:'Base',value:mod.base||0},...Object.entries(mod.on_rem||{}).map(([p,w])=>({label:'Remaining need',problem:p,value:w*(remaining[p]||0)})),...Object.entries(mod.on_cov||{}).map(([p,w])=>({label:w>0?'Complementarity':'Overlap penalty',problem:p,value:w*(exposure[p]||0)})),{label:'Position penalty',value:-(mod.slot_decay||0)*slot}];}
  function compose({problems,modules,slots=6,policy='adaptive',cost=.06,excluded=[],seen=[],random=rng(42),fixedOrder}){
    const remaining={...problems}, exposure=Object.fromEntries(Object.keys(problems).map(p=>[p,0]));const page=[],used=new Set(excluded),log=[];
    const initial=Object.fromEntries(Object.keys(problems).map(p=>[p,0]));
    const initialRank=Object.keys(modules).sort((a,b)=>sumTerms(terms(modules[b],problems,initial,0))-sumTerms(terms(modules[a],problems,initial,0)));
    const staticRank=fixedOrder||Object.keys(modules).sort((a,b)=>modules[b].base-modules[a].base);
    for(let slot=0;slot<slots;slot++){
      const candidates=Object.entries(modules).filter(([name])=>!used.has(name)).map(([name,mod])=>{
        const contributions=terms(mod,remaining,exposure,slot),attention=Math.max(.5,1-slot*.08);
        const gain=Object.entries(mod.addr||{}).reduce((s,[p,v])=>s+Math.min(remaining[p]||0,v*attention),0);
        const repeatPenalty=seen.includes(name)?.25:0;
        return {name,mod,contributions,score:sumTerms(contributions)-repeatPenalty,gain,attention,repeatPenalty};
      });
      candidates.sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name));
      let available=candidates;
      if(['adaptive','noisy','epsilon','v1'].includes(policy))available=candidates.filter(c=>c.gain>cost);
      if(!available.length){log.push({slot,reason:'No remaining candidate clears the attention cost.'});break;}
      let winner=available[0];
      if(policy==='fixed'||policy==='independent'){const order=policy==='fixed'?staticRank:initialRank;winner=available.reduce((a,b)=>order.indexOf(a.name)<order.indexOf(b.name)?a:b);}
      if(policy==='random'||policy==='epsilon'&&random()<.15)winner=available[Math.floor(random()*available.length)];
      if(policy==='noisy')winner=available.map(c=>({...c,noisy:c.score+(random()-.5)*.6})).sort((a,b)=>b.noisy-a.noisy)[0];
      const before={...remaining},priorExposure={...exposure};
      for(const [p,v] of Object.entries(winner.mod.addr||{})){if(!(p in remaining))continue;remaining[p]=Math.max(0,remaining[p]-v*winner.attention);exposure[p]=Math.min(1,exposure[p]+v);}
      used.add(winner.name);page.push({...winner,slot,before,priorExposure,after:{...remaining},candidates:available.map(c=>({name:c.name,score:c.score,gain:c.gain})),gain:sum(before)-sum(remaining)});
    }
    const mass=sum(problems),resolved=mass-sum(remaining);
    return {page,problems,remaining,exposure,log,resolved,coverageRate:mass?resolved/mass:0,initialMass:mass,netUtility:resolved-page.length*cost};
  }
  function sumTerms(ts){return ts.reduce((s,t)=>s+t.value,0);}
  const policyNames={adaptive:'Adaptive + attention budget',fixed:'Fixed page · calibrated',independent:'Personalized · one-pass ranking',v1:'Original weights + attention budget',random:'Random selection',epsilon:'Greedy + 15% exploration',noisy:'Noisy greedy · no learning'};
  function evaluate({personas,shapes,modules,modulesV1,slots,n=240,seed=2026,cost=.06}){
    const random=rng(seed),keys=Object.keys(personas),trials=[];
    for(let i=0;i<n;i++){const vals=personas[keys[i%keys.length]].vals,feat={};for(const [k,v] of Object.entries(vals))feat[k]=clamp(v+(random()-.5)*.05);trials.push({persona:keys[i%keys.length],problems:detect(feat,shapes)});}
    // Calibrate a fixed page on unjittered preset means, then evaluate on held-out jittered sessions.
    const means={};for(const p of Object.values(personas)){const probs=detect(p.vals,shapes);for(const [k,v]of Object.entries(probs))means[k]=(means[k]||0)+v/keys.length;}
    const fixedOrder=compose({problems:means,modules,slots,cost:0}).page.map(e=>e.name);
    for(const k of Object.keys(modules))if(!fixedOrder.includes(k))fixedOrder.push(k);
    const output={};
    for(const [policy,label]of Object.entries(policyNames)){
      const prng=rng(seed+Object.keys(policyNames).indexOf(policy)*997),logs=[],counts={},positions={},days=Array(30).fill(0),perPersona={};let initialMass=0,resolved=0,totalSlots=0,net=0;
      for(let i=0;i<trials.length;i++){
        const t=trials[i],r=compose({problems:t.problems,modules:policy==='v1'?modulesV1:modules,slots,policy,cost,random:prng,fixedOrder});
        logs.push({persona:t.persona,index:i,result:r});initialMass+=r.initialMass;resolved+=r.resolved;totalSlots+=r.page.length;net+=r.netUtility;
        const a=perPersona[t.persona]||(perPersona[t.persona]={initial:0,resolved:0,sessions:0,widgets:0});a.initial+=r.initialMass;a.resolved+=r.resolved;a.sessions++;a.widgets+=r.page.length;
        for(const e of r.page){counts[e.name]=(counts[e.name]||0)+1;(positions[e.name]||(positions[e.name]=Array(slots).fill(0)))[e.slot]++;days[Math.min(29,Math.floor(i*30/n))]++;}
      }
      output[policy]={policy,label,logs,counts,positions,days,perPersona,coverageRate:initialMass?resolved/initialMass:0,avgWidgets:totalSlots/n,avgResidual:(initialMass-resolved)/n,netUtility:net/n,n};
    }
    return {output,seed,n,cost,fixedOrder};
  }
  const api={sum,clamp,rng,pwl,detect,terms,compose,evaluate,policyNames};root.EDPEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
