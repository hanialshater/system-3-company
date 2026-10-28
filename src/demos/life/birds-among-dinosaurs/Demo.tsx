"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";

export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug}
    predict={{question:"On a family tree, where do living birds belong relative to dinosaurs?",options:["Inside the dinosaur branch", "Outside the dinosaur branch", "On a separate tree"],answer:0}}
    exploreHint="Trace the shared branch to its tips."
    reveal={()=><p>On this simplified tree, the dinosaur branch includes both Triceratops, T. rex and birds. Birds are living dinosaurs. The two extinct dinosaur examples are branches of the tree, not ancestors of the birds shown here.</p>}>
    {({locked,interact})=><div>
      <svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={shown ? "A simplified branching tree: crocodilians branch outside dinosaurs; Triceratops, T. rex and living birds lie inside the dinosaur branch." : "Crocodilians, Triceratops, T. rex and birds; their branching relationships are hidden."}>
        {shown && <><path d="M20 90 H70 M70 28 V150 M70 28 H205 M70 150 H110 M110 68 V150 M110 68 H205 M110 150 H150 M150 110 V150 M150 110 H205 M150 150 H205" fill="none" stroke="var(--line)" strokeWidth="4" strokeLinecap="round"/><path d="M70 150 H110 M110 68 V150 M110 68 H205 M110 150 H150 M150 110 V150 M150 110 H205 M150 150 H205" fill="none" stroke="#58a68f" strokeWidth="5" strokeLinecap="round"/><text x="90" y="179" fill="var(--fg)" fontSize="13">Dinosaur branch</text></>}
        <text x="212" y="32" fill="var(--fg)" fontSize="13">Crocodilians</text>
        <text x="212" y="72" fill="var(--fg)" fontSize="13">Triceratops</text>
        <text x="212" y="114" fill="var(--fg)" fontSize="13">T. rex</text>
        <text x="212" y="154" fill="var(--fg)" fontSize="13">Birds today</text>
      </svg>
      <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Trace the branch</Control></Row>
    </div>}
  </Lesson>;
}
