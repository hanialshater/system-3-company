"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model={
  "question": "A vulture tears and eats pieces of a carcass; a fungus grows through remains and breaks down material. Which one is the scavenger in this example?",
  "options": [
    "Both are the same role here",
    "The vulture",
    "The fungus"
  ],
  "answer": 1,
  "explanation": "In this example the vulture consumes pieces of the carcass, while the fungus breaks down organic material. Both act on remains, but the illustrated actions differ."
};
export default function Demo({slug}:{slug:string}){
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 function open(i:0|1,interact:()=>void){if(seenRef.current[i])return;seenRef.current[i]=true;setSeen([...seenRef.current]);interact();}
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={seen[0]&&seen[1]?model.explanation:"Two evidence panels, hidden before inspection."}>
 <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <g transform="translate(6 8)">{seen[0]?<g><path d="M28 70 Q45 35 65 68 L85 75 L60 84Z" fill="var(--muted)"/><circle cx="35" cy="58" r="7" fill="var(--fg)"/><ellipse cx="112" cy="80" rx="19" ry="13" fill="#b6947e"/><path d="M75 68 L91 75" stroke="var(--fg)" strokeWidth="3"/><text x="75" y="120" textAnchor="middle" fill="var(--fg)" fontSize="12">Tears and eats</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g><g transform="translate(184 8)">{seen[1]?<g><ellipse cx="75" cy="86" rx="40" ry="16" fill="#b6947e"/><path d="M75 82 V48 M75 65 L54 54 M75 70 L97 55" stroke="var(--fg)" strokeWidth="3"/><path d="M49 48 Q75 18 101 48Z" fill="#d99d8b"/><text x="75" y="120" textAnchor="middle" fill="var(--fg)" fontSize="12">Breaks down remains</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g></svg>
 <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p></div>}</Lesson>;
}
