"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";

export default function Demo({slug}:{slug:string}) {
  const [opened, setOpened] = useState(false);
  return <Lesson slug={slug}
    predict={{question:"A fossil bone and a fossil footprint are found. Which one is a trace of an animal's activity?",options:["The bone", "The footprint", "Both are traces of activity"],answer:1}}
    exploreHint="Compare what each fossil preserves."
    reveal={()=><p>The footprint records contact with a surface: it is a trace fossil. The bone represents part of the animal's body. A footprint can suggest movement, but it does not reveal every detail of the animal that made it.</p>}>
    {({locked,interact})=><div>
      <svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={opened ? "Schematic bone: part of a body. Schematic footprint: mark left on a surface." : "A schematic fossil bone and footprint, with their descriptions hidden."}>
        <rect x="8" y="12" width="152" height="148" rx="16" fill="var(--bg-2)" stroke="var(--line)"/>
        <rect x="180" y="12" width="152" height="148" rx="16" fill="var(--bg-2)" stroke="var(--line)"/>
        <path d="M47 46 C35 34 28 45 36 55 C25 63 36 73 47 65 L116 96 C128 107 136 97 128 88 C138 80 129 70 117 78 Z" fill="#d6c8a9" stroke="#7f735d" strokeWidth="3"/>
        <path d="M256 92 C248 82 244 67 238 50 M256 92 C256 77 258 62 260 43 M256 92 C265 80 272 69 279 53 M256 92 L252 111" fill="none" stroke="#ad8663" strokeWidth="10" strokeLinecap="round"/>
        <text x="84" y="137" textAnchor="middle" fill="var(--fg)" fontSize="14">{opened ? "Body part" : "Bone"}</text>
        <text x="256" y="137" textAnchor="middle" fill="var(--fg)" fontSize="14">{opened ? "Surface mark" : "Footprint"}</text>
      </svg>
      <Row><Control style={{minHeight:44}} disabled={locked || opened} onClick={()=>{setOpened(true);interact();}}>Compare the evidence</Control></Row>
    </div>}
  </Lesson>;
}
