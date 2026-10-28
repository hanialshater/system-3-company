"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model={
  "question": "In a toy habitat, species A feeds from 6–8 and species B feeds from 18–20. Do the stated feeding intervals overlap?",
  "options": [
    "Yes, they overlap completely",
    "No, the intervals are separate",
    "Yes, they are identical"
  ],
  "answer": 1,
  "explanation": "The marked intervals 6–8 and 18–20 are separate on the same 24-hour clock. This stated timing alone does not prove whether the species compete in other ways."
};
export default function Demo({slug}:{slug:string}){
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 function open(i:0|1,interact:()=>void){if(seenRef.current[i])return;seenRef.current[i]=true;setSeen([...seenRef.current]);interact();}
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={seen[0]&&seen[1]?model.explanation:"Two evidence panels, hidden before inspection."}>
 <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <g transform="translate(6 8)">{seen[0]?<g><path d="M15 82 H135" stroke="var(--muted)" strokeWidth="3"/><rect x="45" y="64" width="10" height="18" fill="var(--good)"/><text x="55" y="55" textAnchor="middle" fill="var(--fg)" fontSize="13">6–8</text><text x="15" y="101" textAnchor="middle" fill="var(--fg)" fontSize="11">0</text><text x="135" y="101" textAnchor="middle" fill="var(--fg)" fontSize="11">24</text><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">A: 24-hour clock</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g><g transform="translate(184 8)">{seen[1]?<g><path d="M15 82 H135" stroke="var(--muted)" strokeWidth="3"/><rect x="105" y="64" width="10" height="18" fill="var(--good)"/><text x="115" y="55" textAnchor="middle" fill="var(--fg)" fontSize="13">18–20</text><text x="15" y="101" textAnchor="middle" fill="var(--fg)" fontSize="11">0</text><text x="135" y="101" textAnchor="middle" fill="var(--fg)" fontSize="11">24</text><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">B: same clock</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g></svg>
 <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p></div>}</Lesson>;
}
