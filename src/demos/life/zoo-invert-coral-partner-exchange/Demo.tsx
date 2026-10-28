"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "In a simplified coral–algae partnership, what can photosynthetic partners provide to the coral animal?",
  "options": [
    "Some products of photosynthesis",
    "A mammal’s skeleton",
    "A bird feather"
  ],
  "answer": 0,
  "explanation": "The schematic shows photosynthetic partners inside coral tissue and an arrow toward the animal for food products. The animal can supply materials including carbon dioxide. This is a simplified exchange, not a complete account of every coral association.",
  "labels": [
    "Partners",
    "Exchange"
  ],
  "label": "This conceptual diagram omits nutrient quantities, cellular details and variation among coral associations.",
  "shownLabel": "This conceptual diagram omits nutrient quantities, cellular details and variation among coral associations. The schematic shows photosynthetic partners inside coral tissue and an arrow toward the animal for food products. The animal can supply materials including carbon dioxide. This is a simplified exchange, not a complete account of every coral association."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><path d="M48 106 V66 Q72 40 96 66 V106 Z" fill="#d1a98c" stroke="var(--fg)" strokeWidth="2"/><path d="M49 66 Q27 42 23 52 M60 58 L56 31 M84 58 L88 31 M95 66 Q117 42 121 52" fill="none" stroke="var(--fg)" strokeWidth="3"/><circle cx="62" cy="82" r="5" fill="#87ad79"/><circle cx="80" cy="90" r="5" fill="#87ad79"/></g>}{seen[1] && <g transform="translate(186 9)"><path d="M48 106 V66 Q72 40 96 66 V106 Z" fill="#d1a98c" stroke="var(--fg)" strokeWidth="2"/><path d="M49 66 Q27 42 23 52 M60 58 L56 31 M84 58 L88 31 M95 66 Q117 42 121 52" fill="none" stroke="var(--fg)" strokeWidth="3"/><circle cx="63" cy="86" r="8" fill="#87ad79" stroke="var(--fg)" strokeWidth="1"/><path d="M72 79 H91 M85 73 L91 79 L85 85 M90 103 L68 92 M76 93 L68 92 L72 100" stroke="var(--fg)" strokeWidth="2.5" fill="none"/><text x="101" y="81" fill="var(--fg)" fontSize="12">Food</text><text x="101" y="109" fill="var(--fg)" fontSize="12">CO₂</text></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}
