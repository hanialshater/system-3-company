"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "What can dense, groomed sea otter fur help hold near the skin?",
  "options": [
    "A layer of air",
    "A layer of stones",
    "An open water channel"
  ],
  "answer": 0,
  "explanation": "The pale circles stand for air held among dense hairs close to the skin. Sea otters groom fur that helps retain air for insulation in water. The picture is an enlarged schematic, not a measured cross-section.",
  "labels": [
    "Hair fibers",
    "Trapped air"
  ],
  "base": "<path d=\"M18 110 H143\" stroke=\"#bb8e70\" stroke-width=\"9\"/><path d=\"M29 106 Q30 55 36 34 M48 106 Q47 56 54 30 M69 106 Q67 52 74 28 M91 106 Q90 54 96 31 M113 106 Q112 57 119 35\" stroke=\"#956a4d\" stroke-width=\"5\" fill=\"none\"/>",
  "one": "<path d=\"M18 20 H143\" stroke=\"#79b6c9\" stroke-width=\"5\"/>",
  "two": "<circle cx=\"43\" cy=\"83\" r=\"6\" fill=\"#d7edf0\"/><circle cx=\"63\" cy=\"72\" r=\"6\" fill=\"#d7edf0\"/><circle cx=\"84\" cy=\"85\" r=\"6\" fill=\"#d7edf0\"/><circle cx=\"104\" cy=\"70\" r=\"6\" fill=\"#d7edf0\"/>"
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
