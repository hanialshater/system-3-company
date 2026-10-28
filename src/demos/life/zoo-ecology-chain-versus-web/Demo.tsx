"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model={
  "question": "In a toy habitat, grass feeds a rabbit and a mouse, and both can feed an owl. Which drawing represents the feeding web rather than one chain?",
  "options": [
    "Only grass → rabbit → owl",
    "Only grass → mouse → owl",
    "Both branches together"
  ],
  "answer": 2,
  "explanation": "A chain follows one route; the web includes both stipulated feeding routes. Arrows show food going to its consumer, not an animal moving along a path."
};
export default function Demo({slug}:{slug:string}){
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 function open(i:0|1,interact:()=>void){if(seenRef.current[i])return;seenRef.current[i]=true;setSeen([...seenRef.current]);interact();}
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={seen[0]&&seen[1]?model.explanation:"Two evidence panels, hidden before inspection."}>
 <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <g transform="translate(6 8)">{seen[0]?<g><text x="75" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">Grass → Rabbit</text><path d="M75 39 V70" stroke="var(--muted)" strokeWidth="3"/><path d="M67 62 L75 72 L83 62" fill="none" stroke="var(--muted)" strokeWidth="3"/><text x="75" y="95" textAnchor="middle" fill="var(--fg)" fontSize="13">Owl</text><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">One route</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g><g transform="translate(184 8)">{seen[1]?<g><text x="75" y="25" textAnchor="middle" fill="var(--fg)" fontSize="13">Grass</text><defs><marker id="food-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0 0 L5 2.5 L0 5 Z" fill="var(--muted)"/></marker></defs><path d="M65 32 L42 51" stroke="var(--muted)" strokeWidth="2" markerEnd="url(#food-arrow)"/><path d="M85 32 L108 51" stroke="var(--muted)" strokeWidth="2" markerEnd="url(#food-arrow)"/><path d="M42 75 L67 92" stroke="var(--muted)" strokeWidth="2" markerEnd="url(#food-arrow)"/><path d="M108 75 L83 92" stroke="var(--muted)" strokeWidth="2" markerEnd="url(#food-arrow)"/><text x="34" y="68" textAnchor="middle" fill="var(--fg)" fontSize="12">Rabbit</text><text x="116" y="68" textAnchor="middle" fill="var(--fg)" fontSize="12">Mouse</text><text x="75" y="110" textAnchor="middle" fill="var(--fg)" fontSize="13">Owl</text><text x="75" y="130" textAnchor="middle" fill="var(--fg)" fontSize="12">Both routes</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g></svg>
 <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p></div>}</Lesson>;
}
