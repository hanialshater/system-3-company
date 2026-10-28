"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model={
  "question": "A toy population starts with 20 animals. Four are born and three die; no animals enter or leave. How many remain?",
  "options": [
    "17",
    "27",
    "21"
  ],
  "answer": 2,
  "explanation": "The stated ledger gives 20 + 4 − 3 = 21 animals. This arithmetic describes only the assumed closed population; it is not an estimate of a real population."
};
export default function Demo({slug}:{slug:string}){
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 function open(i:0|1,interact:()=>void){if(seenRef.current[i])return;seenRef.current[i]=true;setSeen([...seenRef.current]);interact();}
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={seen[0]&&seen[1]?model.explanation:"Two evidence panels, hidden before inspection."}>
 <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <g transform="translate(6 8)">{seen[0]?<g><text x="75" y="36" textAnchor="middle" fill="var(--fg)" fontSize="13">Start 20</text><path d="M25 58 H125" stroke="var(--muted)" strokeWidth="3"/><text x="75" y="91" textAnchor="middle" fill="var(--fg)" fontSize="14">Births +4</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g><g transform="translate(184 8)">{seen[1]?<g><text x="75" y="36" textAnchor="middle" fill="var(--fg)" fontSize="13">After births 24</text><path d="M25 58 H125" stroke="var(--muted)" strokeWidth="3"/><text x="75" y="91" textAnchor="middle" fill="var(--fg)" fontSize="14">Deaths −3 → 21</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g></svg>
 <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p></div>}</Lesson>;
}
