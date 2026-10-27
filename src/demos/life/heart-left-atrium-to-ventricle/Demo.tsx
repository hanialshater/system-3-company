"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;route:string;explanation:string};
const lesson:Model={
  "question": "In normal circulation, blood leaving the left atrium passes into which chamber?",
  "options": [
    "Right ventricle",
    "Right atrium",
    "Left ventricle"
  ],
  "answer": 2,
  "route": "la-lv",
  "explanation": "Blood passes from the left atrium into the left ventricle through the mitral valve. The diagram is a simplified flow map, not the shape or scale of the heart and vessels."
};
const routes:Record<string,string>={'body-ra':'M302 85 L302 18 L126 18 L126 55','ra-rv':'M126 95 L126 107','rv-lungs':'M100 132 L62 132','lungs-la':'M37 85 L37 18 L212 18 L212 55','la-lv':'M212 95 L212 107','lv-body':'M237 132 L279 132'};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Trace the selected step in the flow map." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 185" className="stage-svg" role="img" aria-label={shown?`${lesson.explanation}`:'Simplified circulation map with right and left atria and ventricles; route hidden.'}>
 <defs><marker id="heart-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#f1c85c"/></marker></defs>
 <rect x="7" y="85" width="55" height="70" rx="20" fill="#bdd7e2" stroke="#657989"/><text x="35" y="124" textAnchor="middle" fill="#172a35" fontSize="12">Lungs</text>
 <rect x="279" y="85" width="54" height="70" rx="20" fill="#dec8bb" stroke="#88766e"/><text x="306" y="124" textAnchor="middle" fill="#2a2522" fontSize="12">Body</text>
 <path d="M91 44 C72 28 68 84 77 116 C87 149 119 164 169 178 C219 164 252 149 262 116 C270 84 266 28 247 44 Z" fill="#71525a" stroke="#b28187" strokeWidth="2"/>
 {([['RA',101,55,'#9ec9df'],['LA',187,55,'#e7aea3'],['RV',101,108,'#9ec9df'],['LV',187,108,'#e7aea3']] as const).map(([label,x,y,fill])=><g key={label}><rect x={x} y={y} width="50" height="43" rx="8" fill={fill} stroke="#405365"/><text x={Number(x)+25} y={Number(y)+27} textAnchor="middle" fill="#17242c" fontWeight="bold" fontSize="15">{label}</text></g>)}
 {shown&&<path d={routes[lesson.route]} fill="none" stroke="#f1c85c" strokeWidth="4" markerEnd="url(#heart-arrow)"/>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Trace the route</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>R/L = right/left · A = atrium · V = ventricle</p></div>}
 </Lesson>;
}
