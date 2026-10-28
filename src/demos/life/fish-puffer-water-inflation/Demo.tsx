"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "Underwater, many pufferfish inflate defensively by taking in what?",
  "options": [
    "Air from the sky",
    "Sand from the seabed",
    "Water"
  ],
  "answer": 2,
  "explanation": "The two panels show a compact outline and a larger inflated outline. Many pufferfish can rapidly take in water to inflate. This defense is stressful and the schematic does not depict a measured fish or recommend handling one."
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
      <g transform="translate(6 8)">{seen[0] ? <g><ellipse cx="75" cy="65" rx="42" ry="25" fill="#d8c38c" stroke="#aa9361" strokeWidth="3"/><text x="75" y="118" textAnchor="middle" fill="var(--fg)" fontSize="12">Before</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><circle cx="75" cy="64" r="41" fill="#d8c38c" stroke="#aa9361" strokeWidth="3"/><path d="M22 66 H35 M29 59 L36 66 L29 73" stroke="#6da4bf" strokeWidth="3" fill="none"/><text x="75" y="118" textAnchor="middle" fill="var(--fg)" fontSize="12">Water enters</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic comparison</p>
  </div>}
  </Lesson>;
}
