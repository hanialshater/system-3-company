"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;kind:'mito'|'chloro';target:string;explanation:string};
const lesson:Model={
  "question": "In a chloroplast, where do the Calvin cycle reactions take place?",
  "options": [
    "Stroma",
    "Thylakoid membrane",
    "Thylakoid lumen"
  ],
  "answer": 0,
  "kind": "chloro",
  "target": "Stroma",
  "explanation": "The Calvin cycle takes place in the stroma, the fluid space surrounding the thylakoids. It uses ATP and NADPH produced by the light reactions."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false),is=(s:string)=>shown&&lesson.target===s;
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Highlight the location on the organelle map." reveal={()=><p>{lesson.explanation} Yellow marks the selected compartment or membrane; the drawing is schematic.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={`${lesson.kind==='mito'?'Mitochondrion and surrounding cytosol':'Chloroplast with stroma and thylakoids'}. ${shown?`Highlighted: ${lesson.target}.`:'Location not highlighted.'}`}>
 {lesson.kind==='mito'?<g><rect x="2" y="5" width="316" height="180" rx="12" fill={is('Cytosol')?'#eecb75':'none'} opacity=".45"/><text x="9" y="19" fill="var(--fg)" fontSize="12">Cytosol</text><ellipse cx="160" cy="104" rx="130" ry="65" fill={is('Intermembrane space')?'#efc866':'#dba495'} stroke="#8d6260" strokeWidth="3"/><ellipse cx="160" cy="104" rx="112" ry="49" fill={is('Matrix')?'#efc866':'#f2d4bc'} stroke={is('Inner membrane')?'#e2ac38':'#a56e69'} strokeWidth={is('Inner membrane')?6:3}/><path d="M52 90 C98 78 112 94 52 102 M268 90 C222 78 208 94 268 102 M53 116 C96 104 109 124 55 130 M267 116 C224 104 211 124 265 130" fill="none" stroke={is('Inner membrane')?'#e2ac38':'#a56e69'} strokeWidth={is('Inner membrane')?5:2}/><text x="160" y="108" textAnchor="middle" fill="#3a2827" fontSize="13" fontWeight="bold">Matrix</text><text x="160" y="180" textAnchor="middle" fill="var(--muted)" fontSize="11">Inner line = inner membrane</text><text x="160" y="198" textAnchor="middle" fill="var(--muted)" fontSize="11">Gap = intermembrane space</text></g>:<g><ellipse cx="160" cy="95" rx="135" ry="70" fill={is('Stroma')?'#efc866':'#bddcb6'} stroke="#5e8b5f" strokeWidth="4"/><text x="160" y="48" textAnchor="middle" fill="#233b2a" fontSize="13" fontWeight="bold">Stroma</text>{[0,1,2,3].map(i=><rect key={i} x="95" y={65+i*18} width="130" height="15" rx="7" fill={is('Thylakoid lumen')?'#efc866':'#76b89a'} stroke={is('Thylakoid membrane')?'#e2ac38':'#4d806b'} strokeWidth={is('Thylakoid membrane')?5:2}/>)}<text x="160" y="165" textAnchor="middle" fill="var(--muted)" fontSize="12">Stack = thylakoids</text><text x="160" y="188" textAnchor="middle" fill="var(--muted)" fontSize="11">Each disc has a membrane and inner lumen</text></g>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Highlight the location</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Simplified organelle cross-section</p></div>}
 </Lesson>;
}
