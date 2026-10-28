"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "Some sharks have a large oil-rich liver. How can the oil contribute to buoyancy?",
  "options": [
    "Its low density can help support the body in water",
    "It creates an air-filled swim bladder",
    "It stops gravity acting on the shark"
  ],
  "answer": 0,
  "explanation": "The cutaway highlights oil within a shark liver. Oil is less dense than water and an oil-rich liver can contribute to buoyancy. The diagram isolates one contributor; it does not show the contributions of fins, motion or the rest of the body."
};
export default function Demo({slug}:{slug:string}) {
  const [seen,setSeen] = useState([false,false]);
  const seenRef = useRef([false,false]);
  function open(index:0|1, interact:()=>void) {
    if (seenRef.current[index]) return;
    seenRef.current[index] = true;
    setSeen([...seenRef.current]);
    interact();
  }
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare their evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 155" className="stage-svg" role="img" aria-label={seen[0] && seen[1] ? model.explanation : "Two schematic shark profiles; the internal organ highlight is hidden."}>
      <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 8)">{seen[0] ? <g><path d="M23 59 L6 39 L9 76 L24 69 Q39 87 74 85 L87 96 L85 82 Q103 78 126 64 Q110 50 90 46 L72 20 L68 44 Q39 42 23 59Z" fill="#9cb4bd" stroke="#5e7984" strokeWidth="2"/><path d="M62 76 L70 92 L86 79" fill="#78939e" stroke="#5e7984" strokeWidth="2"/><path d="M99 51 V64 M104 52 V65 M109 53 V65" stroke="#5e7984" strokeWidth="1.5"/><circle cx="117" cy="56" r="2" fill="#263c42"/><text x="75" y="117" textAnchor="middle" fill="var(--fg)" fontSize="12">Body outline</text></g> : <g><g opacity="0.48"><path d="M23 59 L6 39 L9 76 L24 69 Q39 87 74 85 L87 96 L85 82 Q103 78 126 64 Q110 50 90 46 L72 20 L68 44 Q39 42 23 59Z" fill="#9cb4bd" stroke="#5e7984" strokeWidth="2"/><path d="M62 76 L70 92 L86 79" fill="#78939e" stroke="#5e7984" strokeWidth="2"/><path d="M99 51 V64 M104 52 V65 M109 53 V65" stroke="#5e7984" strokeWidth="1.5"/><circle cx="117" cy="56" r="2" fill="#263c42"/></g><text x="75" y="125" textAnchor="middle" fill="var(--muted)" fontSize="12">Panel A</text></g>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><path d="M23 59 L6 39 L9 76 L24 69 Q39 87 74 85 L87 96 L85 82 Q103 78 126 64 Q110 50 90 46 L72 20 L68 44 Q39 42 23 59Z" fill="#9cb4bd" stroke="#5e7984" strokeWidth="2"/><path d="M62 76 L70 92 L86 79" fill="#78939e" stroke="#5e7984" strokeWidth="2"/><path d="M99 51 V64 M104 52 V65 M109 53 V65" stroke="#5e7984" strokeWidth="1.5"/><circle cx="117" cy="56" r="2" fill="#263c42"/><ellipse cx="72" cy="65" rx="25" ry="10" fill="#e7c87a" stroke="#a78d4f" strokeWidth="2"/><text x="75" y="117" textAnchor="middle" fill="var(--fg)" fontSize="12">Oil-rich liver</text></g> : <g><g opacity="0.48"><path d="M23 59 L6 39 L9 76 L24 69 Q39 87 74 85 L87 96 L85 82 Q103 78 126 64 Q110 50 90 46 L72 20 L68 44 Q39 42 23 59Z" fill="#9cb4bd" stroke="#5e7984" strokeWidth="2"/><path d="M62 76 L70 92 L86 79" fill="#78939e" stroke="#5e7984" strokeWidth="2"/><path d="M99 51 V64 M104 52 V65 M109 53 V65" stroke="#5e7984" strokeWidth="1.5"/><circle cx="117" cy="56" r="2" fill="#263c42"/></g><text x="75" y="125" textAnchor="middle" fill="var(--muted)" fontSize="12">Panel B</text></g>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic comparison</p>
  </div>}
  </Lesson>;
}
