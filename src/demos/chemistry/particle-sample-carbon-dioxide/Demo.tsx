"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Molecule={label:string;atoms:string[]};type Model={question:string;options:string[];answer:number;mols:Molecule[];explanation:string};
const lesson:Model={
  "question": "Each touching group represents one particle. Is this specified sample one pure element, one pure compound, or a mixture of substances?",
  "options": [
    "A pure compound",
    "A pure element",
    "A mixture"
  ],
  "answer": 0,
  "mols": [
    {
      "label": "CO₂",
      "atoms": [
        "C",
        "O",
        "O"
      ]
    },
    {
      "label": "CO₂",
      "atoms": [
        "C",
        "O",
        "O"
      ]
    },
    {
      "label": "CO₂",
      "atoms": [
        "C",
        "O",
        "O"
      ]
    },
    {
      "label": "CO₂",
      "atoms": [
        "C",
        "O",
        "O"
      ]
    }
  ],
  "explanation": "The model contains 4 CO₂. All particles are the same substance and contain more than one element. Circles show atom counts, not molecular geometry."
};
const positions=[[75,48],[245,48],[75,143],[245,143]],colors:Record<string,string>={H:'#f4f1e9',He:'#dfc38e',O:'#ed9990',N:'#8bbfe6',C:'#aeb7c3'};
const offsets:Record<number,number[][]>={1:[[0,0]],2:[[-12,0],[12,0]],3:[[-12,-8],[12,-8],[0,12]],4:[[-12,-12],[12,-12],[-12,12],[12,12]],5:[[0,0],[-19,0],[19,0],[0,-19],[0,19]]};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Group identical particles and compare their atoms." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={`Sample: ${lesson.mols.map(m=>m.atoms.join(' ')).join('; ')}. ${shown?'Identical particle types outlined in the same colour.':''}`}>
 {lesson.mols.map((m,i)=>{const [cx,cy]=positions[i],same=m.label===lesson.mols[0].label;return <g key={i}>{shown&&<ellipse cx={cx} cy={cy} rx="43" ry="36" fill="none" stroke={same?'#e8ba58':'#80b6dd'} strokeWidth="3"/>}{m.atoms.map((atom,j)=>{const [dx,dy]=offsets[m.atoms.length][j];return <g key={j}><circle cx={cx+dx} cy={cy+dy} r="11" fill={colors[atom]} stroke="#526777" strokeWidth="1"/><text x={cx+dx} y={cy+dy+4} fill="#192732" textAnchor="middle" fontWeight="bold" fontSize="10">{atom}</text></g>})}{shown&&<text x={cx} y={cy+50} textAnchor="middle" fill="var(--fg)" fontSize="12">{m.label}</text>}</g>})}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Group matching particles</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Touching circles = one particle · not geometry</p></div>}
 </Lesson>;
}
