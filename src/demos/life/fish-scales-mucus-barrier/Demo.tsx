"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In the pictured fish covering, what can lie outside overlapping scales?",
  "options": [
    "A shell borrowed from a snail",
    "A layer of mucus",
    "A layer of feathers"
  ],
  "answer": 1,
  "explanation": "The first panel shows overlapping scales; the blue outer line adds a schematic mucus layer. In many fishes scales and mucus contribute to protection, although coverings and functions vary between species. This enlarged section is not to scale.",
  "labels": [
    "Overlapping scales",
    "Mucus outside"
  ],
  "base": "<path d=\"M12 112 H144\" stroke=\"#a47b70\" stroke-width=\"8\"/><path d=\"M19 100 Q31 71 53 91 Q65 67 84 90 Q98 65 121 91 L139 104\" fill=\"#bdd4c7\" stroke=\"#718d82\" stroke-width=\"3\"/>",
  "one": "<path d=\"M48 91 L49 103 M80 90 L81 103 M118 91 L119 103\" stroke=\"#708e82\" stroke-width=\"2\"/>",
  "two": "<path d=\"M12 78 Q31 67 47 76 Q66 62 83 75 Q104 61 123 76 L144 82\" fill=\"none\" stroke=\"#7dbed0\" stroke-width=\"7\" stroke-linecap=\"round\"/>"
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 const open=(n:number,interact:()=>void)=>{if(seenRef.current[n])return;seenRef.current[n]=true;setSeen([...seenRef.current]);interact();};
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open both evidence views; compare what each drawing shows." minInteractions={2} reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 175" className="stage-svg" role="img" aria-label={seen[0] && seen[1] ? model.explanation : `${seen[0] ? model.labels[0] : "First view hidden"}. ${seen[1] ? model.labels[1] : "Second view hidden"}.`}>
  <rect x="5" y="8" width="155" height="150" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="180" y="8" width="155" height="150" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
  {seen[0] && <g transform="translate(5 10)"><g dangerouslySetInnerHTML={{__html:model.base}}/><g dangerouslySetInnerHTML={{__html:model.one}}/><text x="78" y="142" textAnchor="middle" fill="var(--fg)" fontSize="12">{model.labels[0]}</text></g>}
  {seen[1] && <g transform="translate(180 10)"><g dangerouslySetInnerHTML={{__html:model.base}}/><g dangerouslySetInnerHTML={{__html:model.two}}/><text x="78" y="142" textAnchor="middle" fill="var(--fg)" fontSize="12">{model.labels[1]}</text></g>}
  {!seen[0] && <text x="82" y="89" textAnchor="middle" fill="var(--muted)" fontSize="24">?</text>}{!seen[1] && <text x="257" y="89" textAnchor="middle" fill="var(--muted)" fontSize="24">?</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open first view</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open second view</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Conceptual drawing · not to scale</p></div>}
 </Lesson>;
}
