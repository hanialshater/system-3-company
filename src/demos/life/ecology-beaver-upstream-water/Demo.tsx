"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A beaver builds a dam across a stream. What can happen to water immediately upstream?",
  "options": [
    "It can collect and form a pond",
    "It must vanish instantly",
    "It must turn into dry land"
  ],
  "answer": 0,
  "explanation": "The first panel shows a flowing channel; the second shows a dam with water collecting upstream. Beaver dams can slow and impound water, creating pond or wetland habitat. Actual extent and effects depend on the stream, terrain and dam."
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
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 155" className="stage-svg" role="img" aria-label={seen[0] && seen[1] ? model.explanation : "Two ecological evidence panels. Open both to compare."}>
      <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 8)">{seen[0] ? <g><path d="M6 91 H144" stroke="#79aabc" strokeWidth="12"/><path d="M35 69 H107 M95 59 L107 69 L95 79" stroke="#79aabc" strokeWidth="3" fill="none"/><g transform="translate(70 44)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ae8a70" stroke="#806b5a"/><ellipse cx="23" cy="6" rx="12" ry="5" fill="#806b5a"/><circle cx="-18" cy="-4" r="9" fill="#ae8a70"/><circle cx="-21" cy="-6" r="1.6" fill="#293c40"/><path d="M-27 -1 L-31 3" stroke="#f2e5c9" strokeWidth="3"/></g><text x="75" y="126" textAnchor="middle" fill="var(--fg)" fontSize="12">Flowing channel</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><path d="M6 91 H144" stroke="#79aabc" strokeWidth="12"/><path d="M8 82 Q40 49 95 78 V97 H8Z" fill="#a9d1df"/><path d="M99 68 V104 M108 68 V104 M117 68 V104" stroke="#9b7a60" strokeWidth="6"/><g transform="translate(58 57)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ae8a70" stroke="#806b5a"/><ellipse cx="23" cy="6" rx="12" ry="5" fill="#806b5a"/><circle cx="-18" cy="-4" r="9" fill="#ae8a70"/><circle cx="-21" cy="-6" r="1.6" fill="#293c40"/><path d="M-27 -1 L-31 3" stroke="#f2e5c9" strokeWidth="3"/></g><text x="75" y="126" textAnchor="middle" fill="var(--fg)" fontSize="12">Water upstream</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
