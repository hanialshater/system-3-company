"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model={
  "question": "In a toy fish population, 8 juveniles and 6 adults are present. A rule removes 2 adults and no juveniles. How many adults remain?",
  "options": [
    "6",
    "8",
    "4"
  ],
  "answer": 2,
  "explanation": "The stipulated adult group falls from 6 to 4 after two adults are removed; the juvenile count stays at 8. This does not predict recruitment or the effects of a real fishing rule."
};
export default function Demo({slug}:{slug:string}){
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 function open(i:0|1,interact:()=>void){if(seenRef.current[i])return;seenRef.current[i]=true;setSeen([...seenRef.current]);interact();}
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={seen[0]&&seen[1]?model.explanation:"Two evidence panels, hidden before inspection."}>
 <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <g transform="translate(6 8)">{seen[0]?<g><text x="75" y="39" textAnchor="middle" fill="var(--fg)" fontSize="13">Juveniles 8</text><text x="75" y="83" textAnchor="middle" fill="var(--fg)" fontSize="13">Adults 6</text><text x="75" y="120" textAnchor="middle" fill="var(--fg)" fontSize="12">Before</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g><g transform="translate(184 8)">{seen[1]?<g><text x="75" y="39" textAnchor="middle" fill="var(--fg)" fontSize="13">Juveniles 8</text><text x="75" y="83" textAnchor="middle" fill="var(--fg)" fontSize="13">Adults 6 − 2 = 4</text><text x="75" y="120" textAnchor="middle" fill="var(--fg)" fontSize="12">After</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g></svg>
 <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p></div>}</Lesson>;
}
