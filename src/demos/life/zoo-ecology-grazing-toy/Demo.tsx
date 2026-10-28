"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model={
  "question": "In a toy plot, 12 plant patches start present. Grazers consume 3 patches in one scenario and 7 in another; no patches regrow. Which scenario leaves more?",
  "options": [
    "Both leave the same",
    "The 3-patch scenario",
    "The 7-patch scenario"
  ],
  "answer": 1,
  "explanation": "The stipulated plot leaves 12 − 3 = 9 patches in A and 12 − 7 = 5 in B. This is a bookkeeping example, not a prediction for a real grazing system."
};
export default function Demo({slug}:{slug:string}){
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 function open(i:0|1,interact:()=>void){if(seenRef.current[i])return;seenRef.current[i]=true;setSeen([...seenRef.current]);interact();}
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={seen[0]&&seen[1]?model.explanation:"Two evidence panels, hidden before inspection."}>
 <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <g transform="translate(6 8)">{seen[0]?<g><text x="75" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">12 start − 3 eaten</text><rect x="25" y="53" width="90" height="24" fill="var(--good)"/><text x="75" y="98" textAnchor="middle" fill="var(--fg)" fontSize="14">9 remain</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g><g transform="translate(184 8)">{seen[1]?<g><text x="75" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">12 start − 7 eaten</text><rect x="25" y="53" width="50" height="24" fill="var(--good)"/><text x="75" y="98" textAnchor="middle" fill="var(--fg)" fontSize="14">5 remain</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g></svg>
 <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p></div>}</Lesson>;
}
