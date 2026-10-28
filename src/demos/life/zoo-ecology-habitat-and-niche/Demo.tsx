"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model={
  "question": "A frog lives in a pond and eats insects at night. Which description is a part of its ecological role rather than the place?",
  "options": [
    "Living in the pond",
    "The pond’s location",
    "Eating insects at night"
  ],
  "answer": 2,
  "explanation": "The pond identifies the stipulated habitat; feeding on insects at night describes one aspect of how the frog uses resources. A full niche includes more than this one behavior."
};
export default function Demo({slug}:{slug:string}){
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 function open(i:0|1,interact:()=>void){if(seenRef.current[i])return;seenRef.current[i]=true;setSeen([...seenRef.current]);interact();}
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={seen[0]&&seen[1]?model.explanation:"Two evidence panels, hidden before inspection."}>
 <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <g transform="translate(6 8)">{seen[0]?<g><ellipse cx="75" cy="75" rx="55" ry="28" fill="#a4cbd2"/><circle cx="75" cy="67" r="14" fill="#95bd8f"/><circle cx="67" cy="57" r="4" fill="#95bd8f"/><circle cx="83" cy="57" r="4" fill="#95bd8f"/><circle cx="67" cy="57" r="1.5" fill="#213c30"/><circle cx="83" cy="57" r="1.5" fill="#213c30"/><text x="75" y="120" textAnchor="middle" fill="var(--fg)" fontSize="12">Pond: place</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g><g transform="translate(184 8)">{seen[1]?<g><circle cx="55" cy="70" r="15" fill="#95bd8f"/><circle cx="49" cy="60" r="4" fill="#95bd8f"/><circle cx="61" cy="60" r="4" fill="#95bd8f"/><circle cx="49" cy="60" r="1.5" fill="#213c30"/><circle cx="61" cy="60" r="1.5" fill="#213c30"/><circle cx="105" cy="62" r="6" fill="var(--muted)"/><path d="M99 55 L95 51 M111 55 L115 51 M99 67 L95 71 M111 67 L115 71" stroke="var(--muted)" strokeWidth="2"/><path d="M70 69 H94 M87 62 L95 69 L87 76" stroke="var(--fg)" strokeWidth="2" fill="none"/><text x="75" y="115" textAnchor="middle" fill="var(--fg)" fontSize="12">Eats insects at night</text></g>:<text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g></svg>
 <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p></div>}</Lesson>;
}
