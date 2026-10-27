"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;nodes:string[];edges:[number,number][];target:number;explanation:string};
const lesson:Model={
  "question": "In this simplified food web, arrows point from food to eater. Which organisms receive energy directly from Seaweed?",
  "options": [
    "Seaweed and Otter",
    "Urchin and Otter",
    "Urchin and Fish"
  ],
  "answer": 2,
  "nodes": [
    "Seaweed",
    "Urchin",
    "Fish",
    "Otter"
  ],
  "edges": [
    [
      0,
      1
    ],
    [
      0,
      2
    ],
    [
      1,
      3
    ]
  ],
  "target": 0,
  "explanation": "The highlighted arrows point from Seaweed to Urchin and Fish. These arrows represent feeding links in this stipulated web; real food webs have additional species and links."
};
const points=[[75,52],[245,52],[75,143],[245,143]];
function segment(a:number,b:number){const [x1,y1]=points[a],[x2,y2]=points[b],dx=x2-x1,dy=y2-y1;const t=Math.min(dx===0?Infinity:46/Math.abs(dx),dy===0?Infinity:20/Math.abs(dy));return [x1+dx*t,y1+dy*t,x2-dx*t,y2-dy*t];}
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Highlight the outgoing links from the named organism." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 195" className="stage-svg" role="img" aria-label={`Food web: ${lesson.edges.map(([a,b])=>`${lesson.nodes[a]} to ${lesson.nodes[b]}`).join('; ')}. ${shown?'Links from the named organism are highlighted.':''}`}>
 <defs><marker id="web-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#98b0bd"/></marker><marker id="web-highlight" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#e6b84e"/></marker></defs>
 {lesson.edges.map(([a,b],i)=>{const [x1,y1,x2,y2]=segment(a,b),active=shown&&a===lesson.target;return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={active?'#e6b84e':'#98b0bd'} strokeWidth={active?4:2} markerEnd={active?'url(#web-highlight)':'url(#web-arrow)'}/>})}
 {lesson.nodes.map((n,i)=><g key={n}><rect x={points[i][0]-46} y={points[i][1]-20} width="92" height="40" rx="12" fill={shown&&i===lesson.target?'#f0d88e':i===0?'#b4d9b8':'#c5d6e4'} stroke="#4b6876" strokeWidth="2"/><text x={points[i][0]} y={points[i][1]+5} textAnchor="middle" fill="#1a3038" fontWeight="bold" fontSize="13">{n}</text></g>)}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Highlight the links</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Arrow: food → consumer</p></div>}
 </Lesson>;
}
