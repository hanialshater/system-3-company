"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;mode:'volume'|'tempP'|'tempV'|'amountP'|'amountV';p:number;v:number;t:number;end:number;explanation:string};
const lesson:Model={
  "question": "An ideal gas at 300 K occupies 1 L. At constant pressure and amount, it is heated to 600 K. What is its final volume?",
  "options": [
    "0.5 L",
    "2 L",
    "1 L"
  ],
  "answer": 1,
  "mode": "tempP",
  "p": 1,
  "v": 1,
  "t": 300,
  "end": 600,
  "explanation": "At fixed pressure and gas amount, volume is proportional to absolute temperature. Doubling temperature from 300 K to 600 K doubles volume from 1 L to 2 L."
};
function state(step:number){const f=step/2;let p=lesson.p,v=lesson.v,t=lesson.t,n=6;if(lesson.mode==='volume'){v=lesson.v+(lesson.end-lesson.v)*f;p=lesson.p*lesson.v/v;}else if(lesson.mode==='tempP'||lesson.mode==='tempV'){t=lesson.t+(lesson.end-lesson.t)*f;if(lesson.mode==='tempP')v=lesson.v*t/lesson.t;else p=lesson.p*t/lesson.t;}else{const amount=1+(lesson.end-1)*f;n=6*amount;if(lesson.mode==='amountP')v=lesson.v*amount;else p=lesson.p*amount;}return {p,v,t,n};}
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0),[complete,setComplete]=useState(false);const a=state(step),top=140-a.v*43,height=140-top;
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Move the control to the final condition." reveal={()=><p>{lesson.explanation} The dots represent gas schematically, not literal molecules.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={`Volume ${a.v.toFixed(2)} litres; pressure ${a.p.toFixed(2)} atmospheres; temperature ${a.t.toFixed(0)} kelvin.`}>
 <path d="M65 28 V140 H255 V28" fill="none" stroke="#92a7b5" strokeWidth="3"/><rect x="67" y={top} width="186" height={height} fill="#b8d9e8" opacity=".45"/><line x1="65" x2="255" y1={top} y2={top} stroke="#e9c678" strokeWidth="6"/>
 {Array.from({length:a.n},(_,i)=><circle key={i} cx={88+(i%4)*47} cy={130-Math.floor(i/4)*Math.max(9,height/4)} r="6" fill="#c85c59"/>)}
 <text x="160" y="164" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="bold">V {a.v.toFixed(2)} L · P {a.p.toFixed(2)} atm</text><text x="160" y="185" textAnchor="middle" fill="var(--muted)" fontSize="12">T {a.t.toFixed(0)} K · ideal-gas model</text>
 </svg><Slider label="Change condition" value={step} min={0} max={2} step={1} disabled={locked||complete} format={v=>`${v} / 2`} onChange={v=>{setStep(v);if(v===2){setComplete(true);interact();}}}/><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Dots and piston are schematic.</p></div>}
 </Lesson>;
}
