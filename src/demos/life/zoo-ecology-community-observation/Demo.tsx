"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model={
  "question": "In a toy project, residents record nest locations that a separate survey did not visit. What information do their records add?",
  "options": [
    "A guarantee that all nests are known",
    "Proof every nest survived",
    "Locations observed by residents"
  ],
  "answer": 2,
  "explanation": "The first panel shows sites visited by one survey; the second adds residents’ reported nest locations. These are additional observations to check, not proof of complete coverage or survival."
};
export default function Demo({slug}:{slug:string}){
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 function open(i:0|1,interact:()=>void){if(seenRef.current[i])return;seenRef.current[i]=true;setSeen([...seenRef.current]);interact();}
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={seen[0]&&seen[1]?model.explanation:"Two evidence panels, hidden before inspection."}>
 <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <g transform="translate(6 8)">{seen[0]?<g><rect x="20" y="25" width="110" height="75" fill="none" stroke="var(--muted)" strokeWidth="2"/><circle cx="45" cy="50" r="6" fill="var(--good)"/><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Survey visit</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g><g transform="translate(184 8)">{seen[1]?<g><rect x="20" y="25" width="110" height="75" fill="none" stroke="var(--muted)" strokeWidth="2"/><circle cx="45" cy="50" r="6" fill="var(--good)"/><circle cx="102" cy="75" r="6" fill="var(--warn)"/><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Resident report added</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g></svg>
 <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p></div>}</Lesson>;
}
