"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;phase:string;scene:string;event:string;explanation:string};
const lesson:Model={
  "question": "Which cell-cycle stage is most associated with this event: Chromosomes condense and the spindle starts to form.",
  "options": [
    "Prophase",
    "G1",
    "S phase"
  ],
  "answer": 0,
  "phase": "Prophase",
  "scene": "prophase",
  "event": "Chromosomes condense and the spindle starts to form.",
  "explanation": "Prophase: Chromosomes condense and the spindle starts to form. Stages are a useful description of a continuous process."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false),s=lesson.scene;
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Reveal the chromosome scene and follow the stage." reveal={()=><p>{lesson.explanation} Some cells pause or leave the cycle; the model highlights one event within a much longer, regulated sequence.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 330 200" className="stage-svg" role="img" aria-label={`${shown?`${lesson.phase}: ${lesson.event}`:'Cell-cycle scene hidden.'}`}>
 <ellipse cx="165" cy="98" rx="116" ry="76" fill="#d0e5d9" stroke="#749b89" strokeWidth="3"/>
 {!shown?<text x="165" y="108" textAnchor="middle" fill="#36564a" fontSize="32">?</text>:<g>
 {(s==='g1'||s==='s'||s==='g2')&&<><circle cx="165" cy="96" r="48" fill="#d6c9e8" stroke="#967eab" strokeWidth="2"/><path d={s==='g1'?'M140 85 q15 -17 25 0 t24 0 M140 107 q15 17 25 0 t24 0':'M135 80 q15 -12 26 0 t28 0 M135 91 q15 -12 26 0 t28 0 M135 106 q15 12 26 0 t28 0 M135 117 q15 12 26 0 t28 0'} fill="none" stroke="#855ba0" strokeWidth="3"/></>}
 {(s==='prophase'||s==='prometaphase'||s==='metaphase')&&<>{s!=='prophase'&&(s==='prometaphase'?[[ -25,-15],[15,3],[-8,26]]:[[0,-25],[0,0],[0,25]]).map(([x,y],i)=><path key={i} d={`M72 95 L${165+x} ${96+y} M258 95 L${165+x} ${96+y}`} fill="none" stroke="#b5b6a0" strokeWidth="1.5"/>)}{(s==='prophase'?[[-22,-15],[4,2],[23,20]]:s==='prometaphase'?[[-25,-15],[15,3],[-8,26]]:[[0,-25],[0,0],[0,25]]).map(([x,y],i)=><path key={i} d={`M${157+x} ${88+y} l16 16 m-16 0 l16 -16`} stroke="#8d5ca3" strokeWidth="4"/>)}</>}
 {s==='anaphase'&&<><path d="M72 95 L140 75 M72 95 L140 100 M72 95 L140 125 M258 95 L190 75 M258 95 L190 100 M258 95 L190 125" fill="none" stroke="#9faf9f" strokeWidth="1.5"/>{[75,100,125].map(y=><g key={y}><path d={`M140 ${y-6} l-8 6 l8 6 M190 ${y-6} l8 6 l-8 6`} fill="none" stroke="#8d5ca3" strokeWidth="4"/></g>)}</>}
 {s==='telophase'&&<><circle cx="117" cy="98" r="35" fill="#d6c9e8" stroke="#967eab" strokeWidth="2"/><circle cx="213" cy="98" r="35" fill="#d6c9e8" stroke="#967eab" strokeWidth="2"/><path d="M100 90 q17 -13 31 0 M100 105 q17 13 31 0 M196 90 q17 -13 31 0 M196 105 q17 13 31 0" fill="none" stroke="#855ba0" strokeWidth="3"/></>}
 </g>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Show the scene</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Simplified animal-cell scene · not to scale</p></div>}
 </Lesson>;
}
