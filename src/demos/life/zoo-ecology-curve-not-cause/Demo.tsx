"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model={
  "question": "A toy prey count falls over two years. One story says predators increased; another says food decreased. Does the prey curve alone distinguish the stories?",
  "options": [
    "No, additional evidence is needed",
    "Yes, it proves predators increased",
    "Yes, it proves food decreased"
  ],
  "answer": 0,
  "explanation": "Both panels show the same stipulated prey-count decline alongside different proposed explanations. The curve alone does not decide between them; data on predators, food and other factors would help."
};
export default function Demo({slug}:{slug:string}){
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 function open(i:0|1,interact:()=>void){if(seenRef.current[i])return;seenRef.current[i]=true;setSeen([...seenRef.current]);interact();}
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={seen[0]&&seen[1]?model.explanation:"Two evidence panels, hidden before inspection."}>
 <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <g transform="translate(6 8)">{seen[0]?<g><path d="M20 25 V100 H125" fill="none" stroke="var(--muted)" strokeWidth="2"/><path d="M25 30 L65 55 L115 95" fill="none" stroke="var(--good)" strokeWidth="4"/><text x="25" y="17" fill="var(--fg)" fontSize="11">Prey count</text><text x="102" y="112" fill="var(--fg)" fontSize="11">Time</text><text x="75" y="134" textAnchor="middle" fill="var(--fg)" fontSize="12">Predator hypothesis</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g><g transform="translate(184 8)">{seen[1]?<g><path d="M20 25 V100 H125" fill="none" stroke="var(--muted)" strokeWidth="2"/><path d="M25 30 L65 55 L115 95" fill="none" stroke="var(--good)" strokeWidth="4"/><text x="25" y="17" fill="var(--fg)" fontSize="11">Prey count</text><text x="102" y="112" fill="var(--fg)" fontSize="11">Time</text><text x="75" y="134" textAnchor="middle" fill="var(--fg)" fontSize="12">Food hypothesis</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g></svg>
 <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p></div>}</Lesson>;
}
