"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In this toy model, which flow arrangement keeps water oxygen pressure above blood oxygen pressure at all three positions?",
  "options": [
    "The same-direction flows",
    "Neither arrangement",
    "The opposite-direction flows"
  ],
  "answer": 2,
  "explanation": "In the same-direction toy case, the two pressures reach 50 at the last position. In the opposite-direction case, water stays 10 units above blood at each marked position. Opposing flows can maintain an oxygen-pressure gradient across a gill; these values are illustrative, not fish measurements."
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
      <g transform="translate(6 8)">{seen[0] ? <g><text x="75" y="28" textAnchor="middle" fill="var(--fg)" fontSize="12">Same direction</text><text x="75" y="58" textAnchor="middle" fill="var(--fg)" fontSize="12">Water → 100 70 50</text><text x="75" y="81" textAnchor="middle" fill="var(--fg)" fontSize="12">Blood → 0 30 50</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><text x="75" y="28" textAnchor="middle" fill="var(--fg)" fontSize="12">Opposite flow</text><text x="75" y="58" textAnchor="middle" fill="var(--fg)" fontSize="12">Water → 100 70 40</text><text x="75" y="81" textAnchor="middle" fill="var(--fg)" fontSize="12">Blood ← 90 60 30</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Oxygen pressure · arbitrary units</p>
  </div>}
  </Lesson>;
}
