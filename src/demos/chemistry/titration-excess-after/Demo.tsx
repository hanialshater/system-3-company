"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;target:number;explanation:string};
const lesson:Model={
  "question": "An ideal 10 mL sample of 0.100 M HCl is mixed with 15 mL of 0.100 M NaOH at 25 °C. Assume complete reaction, additive volumes and concentration-based pH. Which species is in stoichiometric excess?",
  "options": [
    "Neither is in stoichiometric excess",
    "Hydronium",
    "Hydroxide"
  ],
  "answer": 2,
  "target": 15,
  "explanation": "Initially there is 1.00 mmol acid; 15 mL of base adds 1.50 mmol hydroxide. 0.50 mmol base is left. The final volume is 25 mL and the model pH is approximately 12.30. The model approximates activity by concentration."
};
function state(step:number){const vol=lesson.target*step/2,excess=1-.1*vol,pH=Math.abs(excess)<1e-9?7:excess>0?-Math.log10(excess/(10+vol)):14+Math.log10(-excess/(10+vol));return {vol,acid:Math.max(0,excess),base:Math.max(0,-excess),pH};}
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0),[complete,setComplete]=useState(false),a=state(step),color=a.pH<6?'#e5a0a3':a.pH>8?'#b1a1dc':'#a3d5bd',top=120-a.vol*2;
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint={`Move the slider to add ${lesson.target} mL of base.`} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={`Added base ${a.vol.toFixed(1)} mL; excess acid ${a.acid.toFixed(2)} mmol; excess base ${a.base.toFixed(2)} mmol; pH ${a.pH.toFixed(2)}.`}>
 <path d="M100 35 V150 Q100 160 110 160 H210 Q220 160 220 150 V35" fill="none" stroke="#8ea4b4" strokeWidth="3"/><path d={`M102 ${top} H218 V150 Q218 158 210 158 H110 Q102 158 102 150 Z`} fill={color} opacity=".9"/>
 <text x="160" y="24" textAnchor="middle" fill="var(--fg)" fontWeight="bold" fontSize="16">pH {a.pH.toFixed(2)}</text><text x="160" y="145" textAnchor="middle" fill="#273442" fontSize="12">ideal solution</text>
 <text x="160" y="182" textAnchor="middle" fill="var(--fg)" fontSize="12">Acid left {a.acid.toFixed(2)} · base left {a.base.toFixed(2)} mmol</text>
 </svg><Slider label="Base added (mL)" value={step} min={0} max={2} step={1} disabled={locked||complete} format={v=>(lesson.target*v/2).toFixed(1)} onChange={v=>{setStep(v);if(v===2){setComplete(true);interact();}}}/><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Ideal strong acid + strong base · 25 °C</p></div>}
 </Lesson>;
}
