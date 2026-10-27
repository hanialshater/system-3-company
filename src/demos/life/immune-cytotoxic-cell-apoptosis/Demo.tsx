"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;from:string;to:string;fromIcon:string;toIcon:string;via:string;explanation:string};
const lesson:Model={
  "question": "After recognizing an appropriate infected target, what can a cytotoxic T cell induce in that target?",
  "options": [
    "Antibody production by the target",
    "Programmed cell death",
    "Photosynthesis"
  ],
  "answer": 1,
  "from": "CD8 T cell",
  "to": "Target cell",
  "fromIcon": "cell",
  "toIcon": "dying",
  "via": "Apoptosis",
  "explanation": "Activated cytotoxic T cells can induce apoptosis in appropriately recognized infected cells, limiting some intracellular infections."
};
function Icon({kind,x}:{kind:string;x:number}){return <g transform={`translate(${x} 82)`} stroke="#4a6574" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 {kind==='cell'||kind==='memory'?<g><circle r="36" fill="#b6d5c7"/><circle r="13" fill="#8e84af"/>{kind==='memory'&&<text x="22" y="-20" fontSize="20" fill="#e1a640" stroke="none">★</text>}</g>:null}
 {kind==='engulfed'&&<g><circle r="36" fill="#b6d5c7"/><circle cx="-10" r="10" fill="#8e84af"/><circle cx="15" cy="3" r="11" fill="#a5cfaa" stroke="#527c60"/></g>}
 {kind==='plasma'&&<g><circle cx="-8" r="29" fill="#b6d5c7"/><circle cx="-13" r="10" fill="#8e84af"/><path d="M22 20 V2 M22 2 L11 -9 M22 2 L33 -9" fill="none" stroke="#c98b82" strokeWidth="5"/></g>}
 {kind==='dying'&&<g><circle r="36" fill="#b6d5c7"/><circle cx="-10" cy="-5" r="6" fill="#8e84af"/><circle cx="10" cy="6" r="6" fill="#8e84af"/><path d="M-24 -27 L-14 -15 M24 -27 L14 -15 M-25 25 L-14 15 M25 25 L14 15" fill="none"/></g>}
 {kind==='pathogen'&&<g><circle r="25" fill="#a5cfaa"/>{[0,60,120,180,240,300].map(a=><line key={a} x1="0" y1="-25" x2="0" y2="-36" transform={`rotate(${a})`}/>)}<circle cx="-8" cy="-5" r="3" fill="#537a60"/><circle cx="10" cy="8" r="3" fill="#537a60"/></g>}
 {kind==='antibody'&&<path d="M0 30 V1 M0 1 L-25 -26 M0 1 L25 -26" fill="none" stroke="#c98b82" strokeWidth="10"/>}
 {kind==='antigen'&&<path d="M0 -30 L30 22 H-30 Z" fill="#e8b87c"/>}
 {kind==='barrier'&&<g fill="#d8b798"><rect x="-35" y="-24" width="70" height="16"/><rect x="-35" y="-8" width="70" height="16"/><rect x="-35" y="8" width="70" height="16"/></g>}
 {kind==='signal'&&<g fill="#b59acd"><circle cx="-20" cy="0" r="9"/><circle cx="0" cy="-15" r="9"/><circle cx="20" cy="5" r="9"/></g>}
 {kind==='blood'&&<g><rect x="-36" y="-20" width="72" height="40" rx="20" fill="#edc4bf"/><ellipse cx="-15" cy="0" rx="9" ry="5" fill="#be4f58"/><ellipse cx="12" cy="0" rx="9" ry="5" fill="#be4f58"/></g>}
 </g>}
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Trace the selected immune interaction." reveal={()=><p>{lesson.explanation} The icons summarize one selected interaction.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={`${lesson.from}; ${shown?`${lesson.via} toward ${lesson.to}.`:'interaction hidden.'}`}>
 <Icon kind={lesson.fromIcon} x={75}/><text x="75" y="150" textAnchor="middle" fill="var(--fg)" fontSize="12" fontWeight="bold">{lesson.from}</text>
 {shown?<><Icon kind={lesson.toIcon} x={265}/><path d="M126 83 H213 M205 75 L213 83 L205 91" fill="none" stroke="#8da8b5" strokeWidth="3"/><text x="169" y="64" textAnchor="middle" fill="var(--muted)" fontSize="11">{lesson.via}</text><text x="265" y="150" textAnchor="middle" fill="var(--fg)" fontSize="12" fontWeight="bold">{lesson.to}</text></>:<text x="265" y="97" textAnchor="middle" fill="var(--muted)" fontSize="40">?</text>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Trace the interaction</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Schematic interaction · not to scale</p></div>}
 </Lesson>;
}
