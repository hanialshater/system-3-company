"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Atom={label:string;x:number;y:number};type Model={question:string;options:string[];answer:number;nodes:Atom[];edges:[number,number,number][];highlight:number[];explanation:string};
const lesson:Model={
  "question": "Which listed functional group best describes the distinctive group in this condensed structural diagram?",
  "options": [
    "Amide",
    "Ester",
    "Carboxylic acid"
  ],
  "answer": 1,
  "nodes": [
    {
      "label": "CH₃",
      "x": 40,
      "y": 110
    },
    {
      "label": "C",
      "x": 110,
      "y": 110
    },
    {
      "label": "O",
      "x": 110,
      "y": 46
    },
    {
      "label": "O",
      "x": 190,
      "y": 110
    },
    {
      "label": "CH₃",
      "x": 265,
      "y": 110
    }
  ],
  "edges": [
    [
      0,
      1,
      1
    ],
    [
      1,
      2,
      2
    ],
    [
      1,
      3,
      1
    ],
    [
      3,
      4,
      1
    ]
  ],
  "highlight": [
    1,
    2,
    3
  ],
  "explanation": "This diagram represents methyl ethanoate. An ester has the connectivity –C(=O)–O–C. The highlighted carbonyl carbon is bonded to an oxygen linked to another carbon group. Lines show bonds; grouped labels such as CH₃ are condensed notation."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Highlight the atoms belonging to the named group." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={`Condensed structure: ${lesson.nodes.map(n=>n.label).join(', ')}; bonds ${lesson.edges.map(([a,b,n])=>`${lesson.nodes[a].label} to ${lesson.nodes[b].label} order ${n}`).join('; ')}. ${shown?'Functional group highlighted.':''}`}>
 {lesson.edges.flatMap(([a,b,order],i)=>{const p=lesson.nodes[a],q=lesson.nodes[b],dx=q.x-p.x,dy=q.y-p.y,len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len,offsets=order===1?[0]:order===2?[-3,3]:[-5,0,5];return offsets.map((d,j)=><line key={`${i}-${j}`} x1={p.x+nx*d} y1={p.y+ny*d} x2={q.x+nx*d} y2={q.y+ny*d} stroke="#9eb0ba" strokeWidth="2"/>);})}
 {lesson.nodes.map((n,i)=><g key={i}><circle cx={n.x} cy={n.y} r="22" fill={shown&&lesson.highlight.includes(i)?'#f0d17e':'#c4d5df'} stroke="#5f7785" strokeWidth="2"/><text x={n.x} y={n.y+5} textAnchor="middle" fill="#1c303a" fontSize="14" fontWeight="bold">{n.label}</text></g>)}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Highlight the group</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Condensed 2D structure · not molecular geometry</p></div>}
 </Lesson>;
}
