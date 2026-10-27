"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;a:[number,number];b:[number,number]|null;explanation:string};
const lesson:Model={
  "question": "In the ideal model v = Vmax·S/(Km + S), an enzyme has Vmax = 8 and Km = 2. What is its rate when S = 2?",
  "options": [
    "4 units",
    "2 units",
    "8 units"
  ],
  "answer": 0,
  "a": [
    8,
    2
  ],
  "b": null,
  "explanation": "At S = Km = 2, the rate is 8 × 2/(2 + 2) = 4, half the stated Vmax."
};
const rate=(c:[number,number],s:number)=>c[0]*s/(c[1]+s);
const x=(s:number)=>40+s*100,y=(r:number)=>165-r*13;
function Curve({c,s,color}:{c:[number,number];s:number;color:string}){
 const points=Array.from({length:21},(_,i)=>{const v=s*i/20;return `${x(v)},${y(rate(c,v))}`}).join(' ');
 return <g><polyline points={points} fill="none" stroke={color} strokeWidth="3"/><circle cx={x(s)} cy={y(rate(c,s))} r="5" fill={color}/></g>;
}
export default function Demo({slug}:{slug:string}){
 const [s,setS]=useState(0),[complete,setComplete]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Move substrate to S = 2 to compare the model rates." reveal={()=><p>{lesson.explanation} These are ideal curves in arbitrary units, not measurements.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={s>0?`At substrate ${s}, model A rate ${rate(lesson.a,s).toFixed(2)}${lesson.b?`, model B rate ${rate(lesson.b,s).toFixed(2)}`:''}.`:'Rate chart hidden until substrate is moved.'}>
 <path d="M40 18 V165 H270" fill="none" stroke="var(--line)" strokeWidth="2"/><text x="11" y="22" fill="var(--muted)" fontSize="12">rate</text><text x="290" y="182" fill="var(--muted)" fontSize="12">S</text>
 {[0,2,4,6,8,10].map(v=><g key={v}><text x="31" y={y(v)+4} textAnchor="end" fill="var(--muted)" fontSize="11">{v}</text><line x1="38" x2="43" y1={y(v)} y2={y(v)} stroke="var(--line)"/></g>)}
 {[0,1,2].map(v=><text key={v} x={x(v)} y="182" textAnchor="middle" fill="var(--muted)" fontSize="11">{v}</text>)}
 {s>0&&<><Curve c={lesson.a} s={s} color="#70c6e5"/>{lesson.b&&<Curve c={lesson.b} s={s} color="#efbb69"/>}<text x="55" y="25" fill="#70c6e5" fontSize="12">A {rate(lesson.a,s).toFixed(2)}</text>{lesson.b&&<text x="155" y="25" fill="#efbb69" fontSize="12">B {rate(lesson.b,s).toFixed(2)}</text>}</>}
 </svg><Slider label="Substrate S" value={s} min={0} max={2} step={1} disabled={locked||complete} onChange={v=>{setS(v);if(v===2){setComplete(true);interact();}}}/><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Ideal model · arbitrary units</p></div>}
 </Lesson>;
}
