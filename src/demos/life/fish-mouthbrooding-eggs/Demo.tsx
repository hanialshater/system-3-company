"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In mouthbrooding fishes, where can a parent carry eggs or young?",
  "options": [
    "Attached to a dorsal fin in every species",
    "Inside the mouth",
    "Inside a borrowed shell"
  ],
  "answer": 1,
  "explanation": "The second schematic places the dots inside the fish’s mouth to represent carried eggs. Some fishes mouthbrood eggs or young, offering them a protected place; the number of dots is illustrative and not all fishes use this strategy.",
  "labels": [
    "Eggs outside",
    "Eggs in mouth"
  ],
  "base": "<path d=\"M12 83 Q39 40 100 52 Q131 57 143 78 Q132 101 96 107 Q42 116 12 83 Z\" fill=\"#9cbfbe\" stroke=\"#668483\" stroke-width=\"3\"/><circle cx=\"116\" cy=\"70\" r=\"3\" fill=\"#263b3b\"/><path d=\"M143 78 L122 80 L143 90\" fill=\"#f0d7a5\" stroke=\"#668483\" stroke-width=\"2\"/>",
  "one": "<circle cx=\"118\" cy=\"118\" r=\"5\" fill=\"#e8bd75\"/><circle cx=\"130\" cy=\"118\" r=\"5\" fill=\"#e8bd75\"/><circle cx=\"142\" cy=\"118\" r=\"5\" fill=\"#e8bd75\"/>",
  "two": "<circle cx=\"130\" cy=\"82\" r=\"3\" fill=\"#c58d51\"/><circle cx=\"136\" cy=\"84\" r=\"3\" fill=\"#c58d51\"/><circle cx=\"132\" cy=\"88\" r=\"3\" fill=\"#c58d51\"/>"
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
