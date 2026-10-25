import type {MiniLabFrame, MiniLabScenario, MiniLabSpec, MiniLabVisual} from '../mini-lab/types';
import {formatNumber} from '../mini-lab/model';

export type CuratedCase = {
 id:string; title:string; op:string; labels:string[]; outputs:string[];
 a:number[]; b:number[]; question:string; questionTemplate?:string; explain:string; lens:string;
 kind:'bars'|'curve'|'timeline'|'grid'|'scatter'|'table'|'intervals'|'graph'; answerPosition:number; plot?:[number,number,number]; recall?:number[]; graph?:string; binary?:boolean;
};
export type Calculator=(p:number[])=>number[];
const f=formatNumber;
function checked(calc:Calculator,p:number[]) {
 if(!p.length || p.some(v=>!Number.isFinite(v))) throw Error('Invalid curated inputs');
 const v=calc(p);
 if(!v.length || v.some(n=>!Number.isFinite(n)||Math.abs(n)>1e15)) throw Error('Invalid curated arithmetic');
 return v;
}
function picture(c:CuratedCase,p:number[],v:number[],calc:Calculator):MiniLabVisual {
 if(c.kind==='graph') {
  const pattern=c.graph==='dsep'?['fork','chain','collider'][p[0]]:c.graph;
  const middle=pattern==='fork'||pattern==='counterfactual'?'U':pattern==='collider'?'S':pattern==='instrument'?'T':pattern==='spillover'?'Neighbors':'M';
  const nodes=[{id:'x',label:'X',x:40,y:130},{id:'m',label:middle,x:160,y:40},{id:'y',label:'Y',x:280,y:130}];
  if(pattern==='instrument')nodes[0].label='Z';
  const active=c.graph==='dsep'?Boolean(v[0]):true;
  const edges=pattern==='fork'?[{from:'m',to:'x',active:c.graph==='dsep'?active:c.op!=='confounded'||p[3]!==1},{from:'m',to:'y',active}]:pattern==='collider'?[{from:'x',to:'m',active},{from:'y',to:'m',active}]:pattern==='counterfactual'||pattern==='spillover'?[{from:'x',to:'y',active},{from:'m',to:'y',active}]:[{from:'x',to:'m',active},{from:'m',to:'y',active}];
  if(pattern==='fork'||c.op==='mediation')edges.push({from:'x',to:'y',active:true});
  if(c.graph==='dsep'&&pattern==='fork')edges.pop();
  return {kind:'graph',nodes,edges};
 }
 if(c.kind==='grid') return {kind:'grid',cells:v.map((value,i)=>({label:c.outputs[i],value}))};
 if(c.kind==='scatter' && p.length>=4) return {kind:'scatter',points:[{x:p[0],y:p[1]},{x:p[2],y:p[3]}],xLabel:'First',yLabel:'Second'};
 if(c.kind==='scatter') return {kind:'scatter',points:[{x:0,y:0},{x:p[0],y:p[1]}],xLabel:c.labels[0],yLabel:c.labels[1]};
 if(c.kind==='curve') {
  const index=c.plot?.[0]??(c.op==='hyperbolic'?2:c.op==='slope'?2:0);
  const minimum=c.plot?.[1]??0, maximum=c.plot?.[2]??(c.op==='weightprob'?1:Math.max(10,p[index]));
  const points=Array.from({length:25},(_,i)=>{const q=[...p];q[index]=minimum+(maximum-minimum)*i/24;return {x:q[index],y:checked(calc,q)[0]};});
  return {kind:'curve',points,xLabel:c.labels[index],yLabel:c.outputs[0]};
 }
 if(c.kind==='timeline') {
  let events:{label:string,value:number}[];
  if(c.op==='annual'||c.op==='commit') {
   const k=c.op==='annual'?2:3, horizon=p[k];
   events=[0,horizon/3,2*horizon/3,horizon].map(t=>{const q=[...p];q[k]=t;return {label:f(t),value:checked(calc,q)[0]};});
  } else if(c.op==='flow') events=[0,p[1]/2,p[1]].map(t=>({label:f(t),value:p[0]-t*p[2]}));
  else if(c.op==='target') events=[0,v[0]/2,v[0]].map(t=>({label:`${f(t)}h`,value:t*p[1]}));
  else if(c.op==='net') events=[{label:'Start',value:p[0]},{label:'Bonus',value:p[0]+p[1]},{label:'End',value:v[0]}];
  else if(c.op==='groupedloss') events=[{label:'0',value:0},{label:'1',value:p[0]},{label:'2',value:p[0]-p[1]},{label:'3',value:v[1]}];
  else if(c.op==='adjust') events=Array.from({length:Math.min(7,Math.floor(p[2])+1)},(_,i)=>({label:String(i),value:p[1]+(p[0]-p[1])*Math.pow(1-p[3],i)}));
  else if(c.op==='cost') events=[0,p[1]/2,p[1]].map(t=>({label:f(t),value:p[0]*t-p[2]}));
  else if(c.op==='annuity') events=[1,2,3,p[1]].filter((x,i,a)=>x<=p[1]&&a.indexOf(x)===i).map(t=>({label:f(t),value:p[0]/Math.pow(1+p[2],t)}));
  else if(c.op==='beta') events=[{label:'Now',value:p[0]},{label:`t${f(p[2])}`,value:p[1]}];
  else if(c.op==='repeat') events=Array.from({length:6},(_,i)=>({label:String(i+1),value:p[0]*(1-Math.pow(p[2],i+1))/(1-p[2])}));
  else if(c.op==='feedback') events=[0,p[2]/4,p[2]/2,3*p[2]/4,p[2]].map(t=>({label:f(t),value:p[0]*Math.pow(p[1],t)}));
  else events=[{label:'Input',value:p[0]},{label:'Result',value:v[0]}];
  return {kind:'timeline',events};
 }
 // A visual interval here is a displayed span, never an inferred confidence interval.
 if(c.kind==='intervals'&&c.op==='waldinterval') return {kind:'intervals',items:[{label:'Estimate',low:v[0],mid:p[0],high:v[1]}]};
 if(c.kind==='intervals') return {kind:'intervals',items:[{label:c.outputs[0],low:Math.min(0,v[0]),mid:v[0],high:Math.max(0,v[0])}]};
 if(c.kind==='table') return {kind:'table',columns:['Quantity','Value'],rows:v.map((x,i)=>[c.outputs[i],x])};
 return {kind:'bars',items:v.map((value,i)=>({label:c.outputs[i],value}))};
}
export function makeCuratedSpec(c:CuratedCase,calc:Calculator):MiniLabSpec {
 const a=checked(calc,c.a), b=checked(calc,c.b);
 const changes=c.labels.map((_,i)=>i).filter(i=>c.a[i]!==c.b[i]);
 if(!changes.length) throw Error('Unchanged contrast');
 const scenario=(p:number[],v:number[],i:number):MiniLabScenario=>{
  const variable=changes.slice(0,2).map(k=>`${c.labels[k]}=${f(p[k])}`).join(' ');
  const summary=`${variable}; ${c.outputs[0]}=${f(v[0])}`;
  const frames:MiniLabFrame[]=[
   {caption:'Toy inputs',visual:{kind:'table',columns:['Given','Value'],rows:p.map((x,k)=>[c.labels[k],x])}},
   {caption:'Toy result',visual:picture(c,p,v,calc),metrics:[{label:c.outputs[0],value:f(v[0])},{label:c.labels[changes[0]],value:f(p[changes[0]])}]}
  ];
  return {id:i?'contrast':'question',label:i?'Changed case':'Question case',frames,summary};
 };
 const scenarios=[scenario(c.a,a,0),scenario(c.b,b,1)];
 const value=a[0], delta=Math.max(Math.abs(value)*.4,.1);
 const options=[f(value-delta),f(value+delta)];options.splice(c.answerPosition,0,f(value));
 if(new Set(options).size!==3) throw Error('Indistinguishable choices');
 return {id:c.id,family:c.op,setup:'Toy model: two stated cases',hint:'Run the question case, then compare the changed condition.',
  predict:{question:c.question,options:c.binary?['0: no / blocked','1: yes / active']:options,answer:c.binary?(value===0?0:1):c.answerPosition},scenarios,
  reveal:[`The retained results are ${scenarios[0].summary} and ${scenarios[1].summary}.`,`${c.explain} This comparison isolates ${c.lens}.`]
 };
}
