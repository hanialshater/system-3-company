"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model={
  "question": "In a toy model, food per animal falls when more animals share fixed food; a storm removes the same proportion at either density. Which rule is density-dependent?",
  "options": [
    "The fixed storm proportion",
    "Both rules change with density",
    "Food per animal"
  ],
  "answer": 2,
  "explanation": "Sharing fixed food changes the amount per animal as density changes. The stipulated storm fraction is fixed in both cases. Real weather and populations can behave differently."
};
export default function Demo({slug}:{slug:string}){
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 function open(i:0|1,interact:()=>void){if(seenRef.current[i])return;seenRef.current[i]=true;setSeen([...seenRef.current]);interact();}
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={seen[0]&&seen[1]?model.explanation:"Two evidence panels, hidden before inspection."}>
 <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <g transform="translate(6 8)">{seen[0]?<g><text x="75" y="35" textAnchor="middle" fill="var(--fg)" fontSize="13">12 food units</text><text x="75" y="68" textAnchor="middle" fill="var(--fg)" fontSize="13">4 animals → 3 each</text><text x="75" y="98" textAnchor="middle" fill="var(--fg)" fontSize="13">6 animals → 2 each</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g><g transform="translate(184 8)">{seen[1]?<g><text x="75" y="35" textAnchor="middle" fill="var(--fg)" fontSize="13">Toy storm rule</text><text x="75" y="68" textAnchor="middle" fill="var(--fg)" fontSize="13">4 animals → ½</text><text x="75" y="98" textAnchor="middle" fill="var(--fg)" fontSize="13">6 animals → ½</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g></svg>
 <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p></div>}</Lesson>;
}
