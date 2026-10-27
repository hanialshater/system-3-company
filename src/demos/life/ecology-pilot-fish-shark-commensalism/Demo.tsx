"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;first:string;second:string;aIcon:string;bIcon:string;signs:string[];explanation:string};
const lesson:Model={
  "question": "A pilot fish gains food scraps near a shark; assume the shark has no appreciable benefit or harm in this example. Using + for benefit, − for harm and 0 for no appreciable effect, which signs describe Pilot fish and Shark, in that order?",
  "options": [
    "+ / 0",
    "+ / +",
    "+ / −",
    "− / −"
  ],
  "answer": 0,
  "first": "Pilot fish",
  "second": "Shark",
  "aIcon": "fish",
  "bIcon": "fish",
  "signs": [
    "+",
    "0"
  ],
  "explanation": "Pilot fish: +; Shark: 0. The fish benefits and the shark is assumed unaffected, making this stipulated case commensalism. Effects can differ in other situations."
};
function Icon({kind,x}:{kind:string;x:number}){return <g transform={`translate(${x} 80)`} stroke="#4d6670" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
 {kind==='plant'&&<g><path d="M-24 20 C-35 -12 6 -35 28 -24 C30 3 2 29 -24 20Z" fill="#a8d3a7"/><path d="M-22 18 L23 -20" fill="none"/></g>}
 {kind==='root'&&<g fill="none" stroke="#d8b680" strokeWidth="4"><path d="M0 -30 V28 M0 -5 L-23 -20 M0 8 L24 -14 M0 17 L-18 29"/></g>}
 {kind==='fungus'&&<g><path d="M-9 -2 V28 H9 V-2" fill="#eadfc5"/><path d="M-32 0 Q-27 -30 0 -31 Q27 -30 32 0 Z" fill="#d9a08e"/></g>}
 {kind==='microbe'&&<g><ellipse rx="31" ry="17" fill="#b6d5b3"/><circle cx="-12" cy="0" r="3" fill="#567c60"/><circle cx="12" cy="0" r="3" fill="#567c60"/></g>}
 {kind==='bug'&&<g><ellipse rx="24" ry="15" fill="#e8c372"/><path d="M-10 -16 L-16 -27 M10 -16 L16 -27 M-10 16 L-20 26 M10 16 L20 26" fill="none"/></g>}
 {kind==='fish'&&<g><ellipse rx="27" ry="16" fill="#9bc9df"/><path d="M24 0 L42 -17 V17 Z" fill="#9bc9df"/><circle cx="-15" cy="-3" r="2" fill="#243945"/></g>}
 {kind==='worm'&&<path d="M-32 15 C-15 -25 5 30 30 -15" fill="none" stroke="#d9958e" strokeWidth="12"/>}
 {kind==='mammal'&&<g><ellipse rx="30" ry="22" fill="#cfb6a3"/><path d="M-22 -13 L-27 -32 L-8 -22 M22 -13 L27 -32 L8 -22" fill="#cfb6a3"/><circle cx="-10" cy="-2" r="2" fill="#243945"/><circle cx="10" cy="-2" r="2" fill="#243945"/></g>}
 {kind==='bird'&&<g><ellipse rx="29" ry="20" fill="#a8c8df"/><path d="M-24 -3 L-39 3 L-24 9 Z" fill="#e6bb75"/><circle cx="-12" cy="-6" r="2" fill="#243945"/></g>}
 {kind==='tree'&&<g><rect x="-6" y="0" width="12" height="32" fill="#c4a485"/><circle cx="0" cy="-12" r="27" fill="#a8d3a7"/></g>}
 </g>}
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Reveal the modeled effect on each participant." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={`${lesson.first} and ${lesson.second}. ${shown?`Effects ${lesson.signs.join(' and ')}.`:'Effects hidden.'}`}>
 <Icon kind={lesson.aIcon} x={75}/><Icon kind={lesson.bIcon} x={265}/><text x="75" y="145" textAnchor="middle" fill="var(--fg)" fontSize="12" fontWeight="bold">{lesson.first}</text><text x="265" y="145" textAnchor="middle" fill="var(--fg)" fontSize="12" fontWeight="bold">{lesson.second}</text><path d="M125 81 H215" stroke="#90a8b4" strokeWidth="2" strokeDasharray="5 4"/>
 {shown&&<><text x="75" y="178" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#e8bd59">{lesson.signs[0]}</text><text x="265" y="178" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#e8bd59">{lesson.signs[1]}</text></>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Reveal the effects</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>+ benefit · − harm · 0 no appreciable effect</p></div>}
 </Lesson>;
}
