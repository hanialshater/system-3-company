"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;from:string;to:string;fromIcon:string;toIcon:string;via:string;explanation:string};
const lesson:Model={
  "question": "At the lung, where does carbon dioxide move from pulmonary capillary blood under the usual gradient?",
  "options": [
    "Into bone",
    "Into the kidney tubule",
    "Into alveolar air"
  ],
  "answer": 2,
  "from": "Blood",
  "to": "Alveolar air",
  "fromIcon": "blood",
  "toIcon": "lung",
  "via": "CO₂ diffuses",
  "explanation": "Carbon dioxide diffuses from pulmonary capillary blood into alveolar air under the usual partial-pressure gradient. It can then leave the body in exhaled air."
};
function Icon({kind,x,label}:{kind:string;x:number;label:string}){
 const ink="#263d4c",green="#8fcca2",blue="#8bc5dc",red="#e89891",gold="#f1cb78";
 return <g transform={`translate(${x} 85)`} stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 {kind==='leaf'&&<g><path d="M-28 17 C-35 -15 8 -38 29 -28 C32 0 2 30 -28 17Z" fill={green}/><path d="M-27 18 L23 -22 M-7 1 L-14 -13 M4 -9 L16 -4" fill="none"/></g>}
 {kind==='root'&&<g fill="none" stroke={gold} strokeWidth="4"><path d="M0 -31 V28 M0 -4 L-24 -20 M0 7 L25 -13 M0 17 L-20 30 M0 21 L17 32"/></g>}
 {kind==='lung'&&<g fill={red}>{[[-15,-14],[9,-19],[-27,7],[-3,7],[20,4],[-10,28],[15,25]].map(([a,b],i)=><circle key={i} cx={a} cy={b} r="13"/>)}</g>}
 {kind==='blood'&&<g><rect x="-35" y="-20" width="70" height="40" rx="20" fill="#f4cecb"/><ellipse cx="-18" cy="0" rx="10" ry="6" fill="#c64a51"/><ellipse cx="4" cy="-6" rx="10" ry="6" fill="#c64a51"/><ellipse cx="20" cy="6" rx="10" ry="6" fill="#c64a51"/></g>}
 {kind==='air'&&<g fill={blue}><circle cx="-18" cy="3" r="15"/><circle cx="2" cy="-10" r="19"/><circle cx="21" cy="4" r="14"/><rect x="-23" y="2" width="48" height="16" rx="7" stroke="none"/></g>}
 {kind==='cell'&&<g><ellipse cx="0" cy="0" rx="36" ry="27" fill="#b6d9ca"/><circle cx="-4" cy="1" r="11" fill="#8977ae"/></g>}
 {kind==='molecule'&&(label==='Nitrogen gas'?<g><path d="M-12 0 H12"/><circle cx="-13" r="13" fill={blue}/><circle cx="13" r="13" fill={blue}/></g>:['Ammonia','Ammonium','Nitrite','Nitrate'].includes(label)?<g><circle r="13" fill={blue}/>{Array.from({length:label==='Ammonium'?4:label==='Ammonia'||label==='Nitrate'?3:2},(_,i)=>{const n=label==='Ammonium'?4:label==='Ammonia'||label==='Nitrate'?3:2,a=i*2*Math.PI/n-Math.PI/2,x=29*Math.cos(a),y=29*Math.sin(a);return <g key={i}><line x1="0" y1="0" x2={x} y2={y}/><circle cx={x} cy={y} r="8" fill={label==='Ammonia'||label==='Ammonium'?'#f4f1e9':red}/></g>})}<circle r="12" fill={blue}/></g>:<g><circle r="29" fill="#b2bedb"/><circle cx="-10" cy="-9" r="6" fill="#eff4fa" stroke="none"/></g>)}
 {kind==='chain'&&<g>{[-27,-9,9,27].map((n,i)=><circle key={i} cx={n} cy={i%2?8:-5} r="10" fill={i%2?blue:gold}/>)}</g>}
 {kind==='tube'&&<path d="M-26 -24 V10 C-26 35 26 35 26 10 V-24" fill="none" stroke={blue} strokeWidth="12"/>}
 {kind==='cup'&&<g><path d="M-30 -18 C-30 28 30 28 30 -18" fill="none" stroke={blue} strokeWidth="7"/><circle r="15" fill={red}/></g>}
 {kind==='flower'&&<g fill={red}>{[0,60,120,180,240,300].map(a=><ellipse key={a} cx="0" cy="-18" rx="8" ry="15" transform={`rotate(${a})`}/>)}<circle r="9" fill={gold}/></g>}
 {kind==='seed'&&<path d="M-22 15 C-38 -12 -4 -38 19 -24 C36 -13 28 18 8 26 C-4 31 -16 26 -22 15Z" fill={gold}/>}
 {kind==='neuron'&&<g><path d="M-30 -23 L-12 -10 M-33 3 L-14 1 M-28 24 L-11 11 M13 0 L36 0" fill="none" stroke={gold} strokeWidth="4"/><circle r="15" fill={gold}/></g>}
 </g>;
}
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Show the path and inspect the destination." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={`${lesson.from}. ${shown?`${lesson.via} to ${lesson.to}.`:'Destination hidden.'}`}>
 <Icon kind={lesson.fromIcon} x={75} label={lesson.from}/><text x="75" y="153" textAnchor="middle" fontWeight="bold" fill="var(--fg)" fontSize="13">{lesson.from}</text>
 {shown?<><Icon kind={lesson.toIcon} x={265} label={lesson.to}/><path d="M127 87 H210 M203 80 L211 87 L203 94" stroke="#8ca7b5" strokeWidth="3" fill="none"/><text x="169" y="69" textAnchor="middle" fill="var(--muted)" fontSize="12">{lesson.via}</text><text x="265" y="153" textAnchor="middle" fontWeight="bold" fill="var(--fg)" fontSize="13">{lesson.to}</text></>:<text x="265" y="99" textAnchor="middle" fill="var(--muted)" fontSize="40">?</text>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Show the path</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Schematic icons · not to scale</p></div>}
 </Lesson>;
}
