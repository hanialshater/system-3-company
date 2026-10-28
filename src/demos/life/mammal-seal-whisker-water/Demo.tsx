"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A seal’s whiskers can detect which kind of cue from a nearby swimming animal?",
  "options": [
    "The swimmer’s spoken words",
    "Water movement",
    "Light produced by the whiskers"
  ],
  "answer": 1,
  "explanation": "The schematic connects a fish’s moving wake to whiskers at the seal’s muzzle. Seals can use whiskers to detect water movement; the drawing does not show a measured track or establish what a seal knows about a particular fish."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><ellipse cx="65" cy="85" rx="35" ry="25" fill="#c6c4c0" stroke="#85837f"/><path d="M91 76 L125 68 M91 85 H129 M91 94 L125 102" fill="none" stroke="#6b6b6a" strokeWidth="2"/><path d="M140 70 Q162 58 184 70 T228 70 M140 99 Q162 87 184 99 T228 99" fill="none" stroke="#71a7c0" strokeWidth="3"/><ellipse cx="262" cy="85" rx="36" ry="20" fill="#b4cbd5" stroke="#7393a1"/><text x="65" y="142" textAnchor="middle" fill="var(--fg)" fontSize="14">Seal whiskers</text><text x="262" y="142" textAnchor="middle" fill="var(--fg)" fontSize="14">Fish</text></g> : <g><ellipse cx="65" cy="85" rx="35" ry="25" fill="var(--bg-2)" stroke="var(--line)"/><ellipse cx="262" cy="85" rx="36" ry="20" fill="var(--bg-2)" stroke="var(--line)"/></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Seal and fish · schematic</p>
  </div>}
  </Lesson>;
}
