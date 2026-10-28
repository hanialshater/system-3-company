"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model={
  "question": "A toy reserve starts with 20 animals. Three enter and two leave; no births or deaths occur. What is the new local count?",
  "options": [
    "25",
    "21",
    "19"
  ],
  "answer": 1,
  "explanation": "The stipulated count changes by arrivals minus departures: 20 + 3 − 2 = 21. Movement across this boundary changes the local count, not necessarily the total across both sides."
};
export default function Demo({slug}:{slug:string}){
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 function open(i:0|1,interact:()=>void){if(seenRef.current[i])return;seenRef.current[i]=true;setSeen([...seenRef.current]);interact();}
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={seen[0]&&seen[1]?model.explanation:"Two evidence panels, hidden before inspection."}>
 <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <g transform="translate(6 8)">{seen[0]?<g><rect x="38" y="42" width="70" height="53" rx="8" fill="none" stroke="var(--muted)" strokeWidth="3"/><text x="73" y="73" textAnchor="middle" fill="var(--fg)" fontSize="14">20</text><text x="75" y="118" textAnchor="middle" fill="var(--fg)" fontSize="12">Start in reserve</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g><g transform="translate(184 8)">{seen[1]?<g><rect x="38" y="42" width="70" height="53" rx="8" fill="none" stroke="var(--muted)" strokeWidth="3"/><text x="73" y="73" textAnchor="middle" fill="var(--fg)" fontSize="14">21</text><text x="75" y="118" textAnchor="middle" fill="var(--fg)" fontSize="12">+3 in · −2 out</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g></svg>
 <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p></div>}</Lesson>;
}
