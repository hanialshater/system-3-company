"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;m:number;c:number;q:number;explanation:string};
const lesson:Model={
  "question": "A model block has mass 10 g and constant specific heat 2 J/(g·°C). It begins at 20 °C and loses 40 J as heat. With no phase change or other energy transfer, what is its final temperature?",
  "options": [
    "16 °C",
    "18 °C",
    "20 °C"
  ],
  "answer": 1,
  "m": 10,
  "c": 2,
  "q": -40,
  "explanation": "Using q = mcΔT, ΔT = -40/(10 × 2) = -2 °C. Starting at 20 °C gives 18 °C. This is an ideal block with constant specific heat."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0),[complete,setComplete]=useState(false),heat=lesson.q*step/2,temp=20+heat/(lesson.m*lesson.c),level=145-(temp-10)*5;
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Move the control to transfer the stated amount of heat." reveal={()=><p>{lesson.explanation} For a fixed mass and specific heat, a larger magnitude of heat transfer produces a larger temperature change.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={`Heat ${heat} J; temperature ${temp.toFixed(1)} degrees Celsius.`}>
 <rect x="40" y="70" width="100" height="72" rx="10" fill="#c7d6de" stroke="#657c88" strokeWidth="3"/><text x="90" y="103" textAnchor="middle" fill="#1d3038" fontWeight="bold" fontSize="13">{lesson.m} g</text><text x="90" y="124" textAnchor="middle" fill="#1d3038" fontSize="12">c = {lesson.c}</text>
 {step>0&&<path d={lesson.q>0?'M15 106 H35 M28 99 L35 106 L28 113':'M35 106 H15 M22 99 L15 106 L22 113'} fill="none" stroke="#e9b651" strokeWidth="4"/>}
 <rect x="220" y="45" width="24" height="105" rx="12" fill="#edf1ed" stroke="#6a7b81" strokeWidth="2"/><rect x="224" y={level} width="16" height={145-level} rx="7" fill="#d85f61"/><circle cx="232" cy="151" r="14" fill="#d85f61" stroke="#6a7b81" strokeWidth="2"/>
 {[10,20,30].map(v=><text key={v} x="255" y={149-(v-10)*5} fill="var(--fg)" fontSize="12">{v}°C</text>)}<text x="160" y="185" textAnchor="middle" fill="var(--fg)" fontSize="14" fontWeight="bold">Temperature {temp.toFixed(1)} °C</text>
 </svg><Slider label="Heat transfer (J)" value={step} min={0} max={2} step={1} disabled={locked||complete} format={v=>String(lesson.q*v/2)} onChange={v=>{setStep(v);if(v===2){setComplete(true);interact();}}}/><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Ideal block · constant specific heat</p></div>}
 </Lesson>;
}
