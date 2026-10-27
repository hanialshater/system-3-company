"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;kind:'animal'|'plant';inside:string;outside:string;direction:'in'|'out'|'none';explanation:string};
const lesson:Model={
  "question": "A plant cell starts with 0.3 M nonpenetrating solute inside and 0.1 M outside. Water crosses the membrane but this solute does not. What is the initial net water direction?",
  "options": [
    "Net into the cell",
    "Net out of the cell",
    "No net movement"
  ],
  "answer": 0,
  "kind": "plant",
  "inside": "0.3 M",
  "outside": "0.1 M",
  "direction": "in",
  "explanation": "Water initially moves into the plant cell. The cell wall resists expansion and turgor pressure develops; the figure simplifies the changing forces."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false),r=!shown?43:lesson.direction==='out'?32:lesson.direction==='in'?50:43;
 const width=!shown?86:lesson.direction==='out'?60:lesson.direction==='in'?102:86;
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Show the initial net water direction and cell response." reveal={()=><p>{lesson.explanation} The picture is schematic and the labels are initial concentrations.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={`Initially inside ${lesson.inside}, outside ${lesson.outside}. ${shown?`Net water movement ${lesson.direction}.`:'Water direction hidden.'}`}>
 <rect x="4" y="25" width="312" height="150" rx="15" fill="#b9deeb" opacity=".35"/><text x="10" y="19" fill="var(--fg)" fontSize="12">Initially: outside {lesson.outside} · inside {lesson.inside}</text>
 {lesson.kind==='plant'?<g><rect x="104" y="40" width="112" height="112" rx="5" fill="#b9deeb" stroke="#4e855a" strokeWidth="6"/><rect x={160-width/2} y={96-width/2} width={width} height={width} rx="10" fill="#e5b7b5" stroke="#935f71" strokeWidth="3"/></g>:<circle cx="160" cy="96" r={r} fill="#e6b7bd" stroke="#925e72" strokeWidth="4"/>}
 {[55,77,241,264].map((cx,i)=><circle key={i} cx={cx} cy={i%2?125:70} r="5" fill="#62a9d2"/>)}
 {shown&&<g stroke="#e0a83e" strokeWidth="4" fill="none"><defs><marker id="osm-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7Z" fill="#e0a83e" stroke="none"/></marker></defs>{lesson.direction==='none'?<><path d="M55 97 H138" markerEnd="url(#osm-arrow)"/><path d="M138 111 H55" markerEnd="url(#osm-arrow)"/></>:<path d={lesson.direction==='in'?'M55 100 H138':'M138 100 H55'} markerEnd="url(#osm-arrow)"/>}</g>}
 <text x="160" y="194" textAnchor="middle" fill="var(--muted)" fontSize="12">{lesson.kind==='plant'?'Green border = wall · pink = cell':'Pink = animal cell'} · blue = water</text>
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Show water movement</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Initial net direction · simplified model</p></div>}
 </Lesson>;
}
