"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;context:'tract'|'accessory'|'absorb';target:string;explanation:string};
const lesson:Model={
  "question": "Where does chewing mechanically break food into smaller pieces?",
  "options": [
    "Mouth",
    "Esophagus",
    "Stomach",
    "Small intestine"
  ],
  "answer": 0,
  "context": "tract",
  "target": "Mouth",
  "explanation": "Chewing in the mouth mechanically breaks food into smaller pieces and increases exposed surface area."
};
type Node={name:string;x:number;y:number};
const maps:Record<string,Node[]>={tract:[{name:'Mouth',x:170,y:22},{name:'Esophagus',x:170,y:58},{name:'Stomach',x:170,y:94},{name:'Small intestine',x:170,y:130},{name:'Large intestine',x:170,y:166}],accessory:[{name:'Liver',x:84,y:45},{name:'Gallbladder',x:84,y:145},{name:'Pancreas',x:255,y:45},{name:'Small intestine',x:255,y:145}],absorb:[{name:'Small intestine',x:170,y:48},{name:'Blood',x:85,y:145},{name:'Lymph',x:255,y:145}]};
const edges:Record<string,[number,number][]>={tract:[[0,1],[1,2],[2,3],[3,4]],accessory:[[0,1],[0,3],[1,3],[2,3]],absorb:[[0,1],[0,2]]};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false),nodes=maps[lesson.context];
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Highlight the organ or route on the simplified map." reveal={()=><p>{lesson.explanation} The diagram shows selected connections, not anatomical scale.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 205" className="stage-svg" role="img" aria-label={`${lesson.context} digestive map: ${nodes.map(n=>n.name).join(', ')}. ${shown?`${lesson.target} highlighted.`:'No answer highlighted.'}`}>
 <defs><marker id="digest-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6Z" fill="#94aab6"/></marker></defs>
 {edges[lesson.context].map(([a,b],i)=>{const p=nodes[a],q=nodes[b],dx=q.x-p.x,dy=q.y-p.y,t=Math.min(dx===0?Infinity:68/Math.abs(dx),dy===0?Infinity:15/Math.abs(dy));return <line key={i} x1={p.x+dx*t} y1={p.y+dy*t} x2={q.x-dx*t} y2={q.y-dy*t} stroke="#94aab6" strokeWidth="2" markerEnd="url(#digest-arrow)"/>})}
 {nodes.map(n=><g key={n.name}><rect x={n.x-68} y={n.y-15} width="136" height="30" rx="11" fill={shown&&n.name===lesson.target?'#efcb70':'#bed6ce'} stroke="#66837c" strokeWidth="2"/><text x={n.x} y={n.y+5} textAnchor="middle" fill="#1c3034" fontSize="13" fontWeight="bold">{n.name}</text></g>)}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Highlight the location</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Selected connections · not anatomical scale</p></div>}
 </Lesson>;
}
