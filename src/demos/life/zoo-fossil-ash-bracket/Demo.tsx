"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A fossil preserved in place sits between undisturbed ash layers dated 102 and 98 million years ago. Which age range fits this simple model?",options:["Older than 102 million years","Between 102 and 98 million years","Younger than 98 million years"],answer:1}} exploreHint="Inspect the upper and lower ash constraints." reveal={()=><p>The lower ash at 102 million years is older than the fossil layer; the upper ash at 98 million years is younger. The fossil's age is bracketed between those dates if it was preserved in place. Real dates have uncertainty and require geological checks.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===2?"An upper 98-million-year ash layer and a lower 102-million-year ash layer bracket the fossil in between.":"Fossil between two ash layers; ages hidden until inspected."}>
 <rect x="30" y="27" width="280" height="36" fill="#a9becd"/><rect x="30" y="63" width="280" height="55" fill="#d7bd91"/><rect x="30" y="118" width="280" height="36" fill="#a9c0ad"/>
 <path d="M135 90 C145 75 160 75 170 90 C180 104 195 104 205 90" stroke="#705c43" strokeWidth="5" fill="none"/>
 <text x="170" y="51" textAnchor="middle" fontSize="14" fill="#263137">{step>=1?"Upper ash: 98 million years":"Upper ash"}</text>
 <text x="170" y="142" textAnchor="middle" fontSize="14" fill="#263137">{step>=2?"Lower ash: 102 million years":"Lower ash"}</text>
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect upper ash</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Inspect lower ash</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Illustrative dates; undisturbed layers</p></div>}
 </Lesson>;
}
