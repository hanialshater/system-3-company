"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;feature:string;region:string;functionText:string;explanation:string};
const lesson:Model={
  "question": "Which plant feature fits this description? Produces pollen grains in a flowering plant.",
  "options": [
    "Phloem",
    "Anther",
    "Xylem"
  ],
  "answer": 1,
  "feature": "Anther",
  "region": "flower",
  "functionText": "Produces pollen grains in a flowering plant.",
  "explanation": "Anther: Produces pollen grains in a flowering plant. The highlighted region locates one example, not the full microscopic structure."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false),active=(region:string)=>shown&&lesson.region===region;
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Reveal the plant region associated with the feature." reveal={()=><p>{lesson.explanation} The whole-plant image locates a region; it does not display the small cells or tissues in microscopic detail.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 210" className="stage-svg" role="img" aria-label={`${shown?`${lesson.feature}: ${lesson.functionText}`:'Plant feature hidden.'}`}>
 <path d="M140 65 V148" stroke={active('stem')?'#eaa65f':'#6c9e70'} strokeWidth={active('stem')?'9':'6'} fill="none"/><path d="M140 100 C113 62 75 69 69 65 C74 99 109 117 140 100Z M140 83 C161 48 195 48 204 49 C199 80 169 100 140 83Z" fill={active('leaf')?'#e8bf70':'#a7cfa6'} stroke="#6c9e70" strokeWidth="2"/>
 <path d="M140 147 C132 163 126 185 105 198 M140 147 C143 170 162 188 182 199 M140 147 C140 169 138 184 140 203" fill="none" stroke={active('root')?'#e29e61':'#ad9275'} strokeWidth={active('root')?'6':'3'}/>
 <g transform="translate(140 46)" fill={active('flower')?'#e7ae64':'#c9adcd'} stroke="#9b7e9e" strokeWidth="1.5">{[0,72,144,216,288].map(a=><ellipse key={a} cx="0" cy="-13" rx="7" ry="13" transform={`rotate(${a})`}/>)}<circle r="6" fill="#e8c577"/></g>
 <path d="M55 147 H225" stroke="#a9a7a0" strokeWidth="1" strokeDasharray="3 4"/>
 {shown&&<><rect x="224" y="72" width="12" height="12" rx="2" fill="#e8bf70"/><text x="242" y="82" fill="var(--fg)" fontSize="11">Selected region</text></>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Show its region</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Whole-plant schematic · microscopic structures are not shown</p></div>}
 </Lesson>;
}
