"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;symbol:string;atomicNumber:number;shells:number[];explanation:string};
const lesson:Model={
  "question": "A neutral aluminium atom has atomic number 13. In this simplified ground-state shell count, how many electrons are in its outermost occupied shell?",
  "options": [
    "1 electron",
    "2 electrons",
    "3 electrons"
  ],
  "answer": 2,
  "symbol": "Al",
  "atomicNumber": 13,
  "shells": [
    2,
    8,
    3
  ],
  "explanation": "A neutral atom has 13 electrons. Its shell count is 2, 8, 3, so its outermost occupied shell has 3."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Place the electrons into the displayed shell model." reveal={()=><p>{lesson.explanation} The highlighted outer electrons are a count in the highest occupied shell, not a picture of electrons following circular paths.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 230" className="stage-svg" role="img" aria-label={`${lesson.symbol}, atomic number ${lesson.atomicNumber}. ${shown?`Electrons by shell: ${lesson.shells.join(', ')}.`:'Electron shells hidden.'}`}>
 {[38,70,102].map((r,i)=><circle key={r} cx="160" cy="115" r={r} fill="none" stroke={i<lesson.shells.length?'#91a6a2':'#aebbb6'} strokeWidth="1.5" strokeDasharray="4 4"/>)}<circle cx="160" cy="115" r="19" fill="#e7be7f"/><text x="160" y="120" textAnchor="middle" fill="#293b38" fontWeight="bold">{lesson.symbol}</text>
 {shown&&lesson.shells.flatMap((n,s)=>Array.from({length:n},(_,i)=>{const angle=2*Math.PI*i/n-Math.PI/2,r=[38,70,102][s];return <circle key={`${s}-${i}`} cx={160+r*Math.cos(angle)} cy={115+r*Math.sin(angle)} r="5" fill={s===lesson.shells.length-1?'#e89c77':'#82a9c5'}/>;}))}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Show electrons</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Shell diagram is a counting model, not electron paths.</p></div>}
 </Lesson>;
}
