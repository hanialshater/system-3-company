"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In many bony fishes, what path can water take as the mouth and operculum pump it over the gills?",
  "options": [
    "Mouth → gills → operculum",
    "Operculum → brain → mouth",
    "Mouth → stomach → tail"
  ],
  "answer": 0,
  "explanation": "The first panel traces water into the mouth and toward the gills. The second traces it out under the operculum. This is a simplified flow path in many bony fishes; it does not depict every phase of the pressure cycle."
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
      <g transform="translate(6 8)">{seen[0] ? <g><text x="75" y="23" textAnchor="middle" fill="var(--fg)" fontSize="12">Mouth → gills</text><path d="M8 67 H82 M68 57 L82 67 L68 77" stroke="#6da4bf" strokeWidth="4" fill="none"/><path d="M84 35 Q130 35 132 68 Q130 100 84 100Z" fill="#e5c0b3" stroke="#a77e71"/><path d="M104 46 Q95 67 104 88 M115 46 Q106 67 115 88" stroke="#b45d60" strokeWidth="3" fill="none"/></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><text x="75" y="23" textAnchor="middle" fill="var(--fg)" fontSize="12">Gill cover exit</text><path d="M12 35 Q58 35 60 68 Q58 100 12 100Z" fill="#e5c0b3" stroke="#a77e71"/><path d="M62 67 H138 M126 57 L138 67 L126 77" stroke="#6da4bf" strokeWidth="4" fill="none"/></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic comparison</p>
  </div>}
  </Lesson>;
}
