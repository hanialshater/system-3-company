"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "Two prints are 2 meters apart in a toy trackway. Without a time interval, can you calculate speed as distance divided by time?",
  "options": [
    "Yes: every animal has the same stride time",
    "No: the time interval is missing",
    "Yes: spacing alone is a speed"
  ],
  "answer": 1,
  "why": "Both schematic prints show a 2 meter separation. Calculating distance divided by time also needs a time interval. Scientists may estimate dinosaur speeds with additional assumptions and trackway measurements; this toy example does not.",
  "caption": "Toy trackway; no estimated real speed",
  "leftDescription": "First side: Spacing: 2 m. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><path d="M35 75 L50 90 L60 70 M50 90 L48 112 M50 90 L70 103" stroke="var(--good)" strokeWidth="7" fill="none" strokeLinecap="round"/><path d="M95 75 L110 90 L120 70 M110 90 L108 112 M110 90 L130 103" stroke="var(--good)" strokeWidth="7" fill="none" strokeLinecap="round"/><path d="M50 133 H110" stroke="var(--fg)" strokeWidth="2"/><text x="80" y="157" fill="var(--fg)" fontSize="12" textAnchor="middle">Spacing: 2 m</text></g>}
 {step>=2&&<g><circle cx="260" cy="90" r="42" fill="none" stroke="var(--muted)" strokeWidth="4"/><text x="260" y="101" fill="var(--fg)" fontSize="32" textAnchor="middle">?</text><text x="260" y="157" fill="var(--fg)" fontSize="12" textAnchor="middle">Time: unknown</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
