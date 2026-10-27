"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;kind:'membrane'|'synapse';action:string;explanation:string};
const lesson:Model={
  "question": "For a typical neuron near its resting potential, voltage-gated sodium channels open. In which direction is the initial net sodium movement?",
  "options": [
    "Into the neuron",
    "Out of the neuron",
    "No net sodium movement"
  ],
  "answer": 0,
  "kind": "membrane",
  "action": "na-in",
  "explanation": "Under these usual conditions, sodium enters through open sodium channels down its electrochemical gradient. Other currents can also affect the membrane."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false),na=lesson.action==='na-in';
 const paths:Record<string,string>={calcium:'M163 43 L120 65',fusion:'M100 95 L142 95',release:'M100 95 L161 95',bind:'M165 95 L205 95',reuptake:'M165 115 L130 115'};
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Trace the selected movement or signaling step." reveal={()=><p>{lesson.explanation} The diagram shows a selected step, not all currents or molecules.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={`${lesson.kind==='membrane'?'Neuron membrane, outside above and inside below':'Chemical synapse with sending cell on left and receiving cell on right'}. ${shown?lesson.explanation:'Movement hidden.'}`}>
 <defs><marker id="neural-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7Z" fill="#e7b84e"/></marker></defs>
 {lesson.kind==='membrane'?<g><text x="10" y="21" fill="var(--fg)" fontSize="12">Outside</text><text x="10" y="194" fill="var(--fg)" fontSize="12">Inside neuron</text><rect x="10" y="92" width="300" height="12" fill="#9dc9b0"/><path d="M10 92 H310 M10 104 H310" stroke="#62977c" strokeWidth="2"/><rect x="143" y="84" width="34" height="28" rx="8" fill="#9277b4" stroke="#5e4b80" strokeWidth="2"/>{[65,100,225,260].map((cx,i)=><g key={i}><circle cx={cx} cy={i<2?56:145} r="13" fill={i<2?'#94c5e6':'#e6ad88'} stroke="#516777"/><text x={cx} y={i<2?61:150} textAnchor="middle" fill="#1e3038" fontSize="11" fontWeight="bold">{i<2?'Na⁺':'K⁺'}</text></g>)}{shown&&<><path d={na?'M160 48 V142':'M160 145 V48'} stroke="#e7b84e" strokeWidth="4" markerEnd="url(#neural-arrow)"/><text x="180" y="77" fill="var(--fg)" fontSize="12">{na?'Na⁺ in':'K⁺ out'}</text></>}</g>:<g><rect x="8" y="43" width="130" height="105" rx="38" fill="#c9c1db" stroke="#776890" strokeWidth="3"/><rect x="187" y="43" width="125" height="105" rx="30" fill="#b6d6c0" stroke="#668a70" strokeWidth="3"/><text x="73" y="26" textAnchor="middle" fill="var(--fg)" fontSize="12">Sending neuron</text><text x="249" y="26" textAnchor="middle" fill="var(--fg)" fontSize="12">Receiving cell</text><circle cx="96" cy="95" r="17" fill="#eacb81" stroke="#9a8144" strokeWidth="2"/><circle cx="198" cy="95" r="9" fill="#a06f9d" stroke="#6b4a69"/><text x="160" y="169" textAnchor="middle" fill="var(--muted)" fontSize="12">Synaptic cleft</text>{shown&&<><path d={paths[lesson.action]} fill="none" stroke="#e7b84e" strokeWidth="4" markerEnd="url(#neural-arrow)"/><text x="160" y="190" textAnchor="middle" fill="var(--fg)" fontSize="12">{lesson.action==='calcium'?'Ca²⁺ entry':lesson.action==='fusion'?'Vesicle fusion':lesson.action==='release'?'Transmitter release':lesson.action==='bind'?'Receptor binding':'Reuptake'}</text></>}</g>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Trace the step</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Selected step · schematic</p></div>}
 </Lesson>;
}
