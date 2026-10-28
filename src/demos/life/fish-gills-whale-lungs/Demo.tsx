"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A fish uses gills in water. Which organ does a whale use to take oxygen from air?",
  "options": [
    "Lungs",
    "Gills",
    "A swim bladder"
  ],
  "answer": 0,
  "explanation": "The fish panel shows water crossing gills; the whale panel shows air entering lungs. Whales are mammals that breathe air with lungs, while fish gills typically exchange gases with water. These are simplified routes, not a complete anatomy of every fish."
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
      <g transform="translate(6 8)">{seen[0] ? <g><path d="M14 63 Q65 25 128 63 Q65 101 14 63Z" fill="#b1cbd4" stroke="#73929e"/><path d="M80 46 Q70 63 80 80 M90 46 Q80 63 90 80" stroke="#bd7775" strokeWidth="3" fill="none"/><text x="75" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">Water → gills</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><path d="M14 63 Q65 25 128 63 Q65 101 14 63Z" fill="#aabcc8" stroke="#748b99"/><ellipse cx="65" cy="63" rx="13" ry="17" fill="#e0b5af"/><ellipse cx="88" cy="63" rx="13" ry="17" fill="#e0b5af"/><text x="75" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">Air → lungs</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic comparison</p>
  </div>}
  </Lesson>;
}
