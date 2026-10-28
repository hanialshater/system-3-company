"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "In a toy sample, 10 animals have hard parts and 10 have only soft parts. If 6 hard parts and 1 soft part are preserved, which kind dominates the sample?",
  "options": [
    "Hard-part remains",
    "Soft-part remains",
    "They are equally common"
  ],
  "answer": 0,
  "explanation": "The panels show 6 hard-part records but only 1 soft-part record from equally sized starting groups. This illustrates preservation bias; the toy numbers are not measured fossil rates.",
  "labels": [
    "Hard: 6 of 10",
    "Soft: 1 of 10"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><path d="M12 34 Q22 10 32 34 M44 34 Q54 10 64 34 M76 34 Q86 10 96 34 M12 59 Q22 35 32 59 M44 59 Q54 35 64 59 M76 59 Q86 35 96 59" fill="none" stroke="var(--good)" strokeWidth="4"/><text x="119" y="52" textAnchor="middle" fill="var(--fg)" fontSize="12">6</text></g>}{step>=2 && <g transform="translate(170 14)"><path d="M38 48 Q55 19 73 48" fill="none" stroke="var(--good)" strokeWidth="5"/><text x="70" y="69" textAnchor="middle" fill="var(--fg)" fontSize="13">1 record</text></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
