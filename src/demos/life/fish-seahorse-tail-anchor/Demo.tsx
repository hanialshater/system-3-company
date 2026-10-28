"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A seahorse wraps its tail around a plant stem. What immediate effect can the hold provide?",
  "options": [
    "It turns the tail into a gill",
    "It makes the seahorse breathe air",
    "It can anchor the seahorse to the stem"
  ],
  "answer": 2,
  "explanation": "The second panel shows the tail curved around a stem, providing a hold. Seahorses can use their tails to grip objects and anchor themselves. The schematic depicts a possible hold, not evidence that every plant or current provides secure anchorage."
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
    <svg viewBox="0 0 340 155" className="stage-svg" role="img" aria-label={seen[0] && seen[1] ? model.explanation : "Two schematic seahorses next to a plant stem; the grip is hidden."}>
      <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 8)">{seen[0] ? <g><path d="M100 19 V108 M100 43 Q112 31 119 28 M100 63 Q87 54 82 51" fill="none" stroke="#78a477" strokeWidth="6" strokeLinecap="round"/><g><path d="M46 31 Q31 31 25 43 L12 47 Q6 49 9 55 L25 56 Q29 64 39 68 Q40 82 49 91 L60 86 Q53 76 57 65 L62 51 Q62 38 52 33Z" fill="#ddbb83" stroke="#987b53" strokeWidth="2"/><path d="M59 49 Q72 45 70 58 L59 62" fill="#f0d7a4" stroke="#987b53" strokeWidth="2"/><circle cx="39" cy="42" r="3" fill="#263c42"/><path d="M45 58 Q48 64 55 65 M43 70 Q48 75 55 76" fill="none" stroke="#ae8f60" strokeWidth="2"/><path d="M55 86 Q59 101 73 101" fill="none" stroke="#b79669" strokeWidth="8" strokeLinecap="round"/></g><text x="75" y="126" textAnchor="middle" fill="var(--fg)" fontSize="12">Near a stem</text></g> : <g><g opacity="0.48"><path d="M100 19 V108 M100 43 Q112 31 119 28 M100 63 Q87 54 82 51" fill="none" stroke="#78a477" strokeWidth="6" strokeLinecap="round"/><g><path d="M46 31 Q31 31 25 43 L12 47 Q6 49 9 55 L25 56 Q29 64 39 68 Q40 82 49 91 L60 86 Q53 76 57 65 L62 51 Q62 38 52 33Z" fill="#ddbb83" stroke="#987b53" strokeWidth="2"/><path d="M59 49 Q72 45 70 58 L59 62" fill="#f0d7a4" stroke="#987b53" strokeWidth="2"/><circle cx="39" cy="42" r="3" fill="#263c42"/><path d="M45 58 Q48 64 55 65 M43 70 Q48 75 55 76" fill="none" stroke="#ae8f60" strokeWidth="2"/><path d="M55 86 Q59 101 73 101" fill="none" stroke="#b79669" strokeWidth="8" strokeLinecap="round"/></g></g><text x="75" y="125" textAnchor="middle" fill="var(--muted)" fontSize="12">Panel A</text></g>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><path d="M100 19 V108 M100 43 Q112 31 119 28 M100 63 Q87 54 82 51" fill="none" stroke="#78a477" strokeWidth="6" strokeLinecap="round"/><g><path d="M46 31 Q31 31 25 43 L12 47 Q6 49 9 55 L25 56 Q29 64 39 68 Q40 82 49 91 L60 86 Q53 76 57 65 L62 51 Q62 38 52 33Z" fill="#ddbb83" stroke="#987b53" strokeWidth="2"/><path d="M59 49 Q72 45 70 58 L59 62" fill="#f0d7a4" stroke="#987b53" strokeWidth="2"/><circle cx="39" cy="42" r="3" fill="#263c42"/><path d="M45 58 Q48 64 55 65 M43 70 Q48 75 55 76" fill="none" stroke="#ae8f60" strokeWidth="2"/><path d="M55 86 Q68 99 87 91 Q99 81 108 88 Q114 99 103 102 Q93 103 91 96" fill="none" stroke="#b79669" strokeWidth="8" strokeLinecap="round"/></g><text x="75" y="126" textAnchor="middle" fill="var(--fg)" fontSize="12">Tail around stem</text></g> : <g><g opacity="0.48"><path d="M100 19 V108 M100 43 Q112 31 119 28 M100 63 Q87 54 82 51" fill="none" stroke="#78a477" strokeWidth="6" strokeLinecap="round"/><g><path d="M46 31 Q31 31 25 43 L12 47 Q6 49 9 55 L25 56 Q29 64 39 68 Q40 82 49 91 L60 86 Q53 76 57 65 L62 51 Q62 38 52 33Z" fill="#ddbb83" stroke="#987b53" strokeWidth="2"/><path d="M59 49 Q72 45 70 58 L59 62" fill="#f0d7a4" stroke="#987b53" strokeWidth="2"/><circle cx="39" cy="42" r="3" fill="#263c42"/><path d="M45 58 Q48 64 55 65 M43 70 Q48 75 55 76" fill="none" stroke="#ae8f60" strokeWidth="2"/><path d="M55 86 Q59 101 73 101" fill="none" stroke="#b79669" strokeWidth="8" strokeLinecap="round"/></g></g><text x="75" y="125" textAnchor="middle" fill="var(--muted)" fontSize="12">Panel B</text></g>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic comparison</p>
  </div>}
  </Lesson>;
}
