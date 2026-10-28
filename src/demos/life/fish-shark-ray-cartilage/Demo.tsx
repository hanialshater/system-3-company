"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "What material makes up much of the internal skeleton in both sharks and rays?",
  "options": [
    "Wood",
    "Hollow feathers",
    "Cartilage"
  ],
  "answer": 2,
  "explanation": "The two panels highlight an internal skeleton in a shark and a ray. Both belong to cartilaginous fishes: much of their skeletal support is cartilage rather than the bony skeleton typical of many other fishes. The shapes are simplified."
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
    <svg viewBox="0 0 340 155" className="stage-svg" role="img" aria-label={seen[0] && seen[1] ? model.explanation : "Two evidence panels. Open both to compare."}>
      <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 8)">{seen[0] ? <g><path d="M12 65 Q60 28 130 65 Q60 100 12 65Z" fill="#bbcbd1" stroke="#758d95"/><path d="M33 65 H113 M71 65 L55 52 M71 65 L55 78" stroke="#e8b86e" strokeWidth="4"/><text x="75" y="118" textAnchor="middle" fill="var(--fg)" fontSize="12">Shark cartilage</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><path d="M75 22 Q116 38 129 75 Q96 94 75 84 Q53 94 21 75 Q34 38 75 22Z" fill="#bbcbd1" stroke="#758d95"/><path d="M75 32 V80 M75 56 L45 70 M75 56 L105 70" stroke="#e8b86e" strokeWidth="4"/><text x="75" y="118" textAnchor="middle" fill="var(--fg)" fontSize="12">Ray cartilage</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic comparison</p>
  </div>}
  </Lesson>;
}
