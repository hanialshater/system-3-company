"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={slug:string;name:string;kind:'nucleus'|'ion';symbol:string;z:number;mass:number;charge:number;correct:number;question:string;options:string[];answer:number;explanation:string};
const lesson:Model={
  "slug": "carbon-12-neutron-model",
  "kind": "nucleus",
  "name": "carbon",
  "symbol": "C",
  "z": 6,
  "mass": 12,
  "charge": 0,
  "question": "A carbon-12 atom has mass number 12 and atomic number 6. How many neutrons are in its nucleus?",
  "options": [
    "5 neutrons",
    "8 neutrons",
    "6 neutrons",
    "7 neutrons"
  ],
  "answer": 2,
  "correct": 6,
  "explanation": "The nucleus has 6 protons and 6 neutrons. The mass number counts both: 6 + 6 = 12. The drawing is a counting model; nucleons are not arranged as a flat grid."
};
function Nucleus({protons,neutrons}:{protons:number;neutrons:number}){
 const count=protons+neutrons;
 return <g>{Array.from({length:count},(_,i)=>{const cols=8;return <circle key={i} cx={50+(i%cols)*28} cy={69+Math.floor(i/cols)*24} r="9" fill={i<protons?'#d96969':'#73a8d0'} stroke="#24394a" strokeWidth="1"/>})}</g>;
}
function Electrons({count}:{count:number}){
 const shells=[Math.min(2,count),Math.min(8,Math.max(0,count-2)),Math.min(8,Math.max(0,count-10))];
 return <g><circle cx="160" cy="108" r="20" fill="#d96969"/><text x="160" y="113" textAnchor="middle" fill="#1b2027" fontWeight="bold" fontSize="13">{lesson.z}p⁺</text>
 {shells.map((n,i)=>n>0&&<g key={i}><circle cx="160" cy="108" r={35+i*23} fill="none" stroke="#899db2" strokeWidth="1"/>{Array.from({length:n},(_,j)=>{const a=2*Math.PI*j/n-Math.PI/2,r=35+i*23;return <circle key={j} cx={160+Math.cos(a)*r} cy={108+Math.sin(a)*r} r="6" fill="#6cc1e9" stroke="#263c4c"/>})}</g>)}
 </g>;
}
export default function Demo({slug}:{slug:string}){
 const [built,setBuilt]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Build the picture and count the particles." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 215" className="stage-svg" role="img" aria-label={built?(lesson.kind==='nucleus'?`${lesson.z} protons and ${lesson.correct} neutrons`:`${lesson.z} protons and ${lesson.correct} electrons`):`${lesson.symbol}: ${lesson.kind==='nucleus'?`mass ${lesson.mass}, atomic number ${lesson.z}`:`${lesson.z} protons, charge ${lesson.charge}`}. Picture hidden.`}>
 <text x="160" y="20" textAnchor="middle" fontWeight="bold" fontSize="15" fill="var(--fg)">{lesson.symbol} · {lesson.kind==='nucleus'?`mass ${lesson.mass}, protons ${lesson.z}`:`protons ${lesson.z}, charge ${lesson.charge>0?'+':''}${lesson.charge}`}</text>
 {built?(lesson.kind==='nucleus'?<Nucleus protons={lesson.z} neutrons={lesson.correct}/>:<Electrons count={lesson.correct}/>):<text x="160" y="130" textAnchor="middle" fill="var(--muted)" fontSize="40">?</text>}
 {built&&<text x="160" y="204" textAnchor="middle" fill="var(--muted)" fontSize="12">{lesson.kind==='nucleus'?'red = proton · blue = neutron':'centre = nucleus · blue = electron'}</text>}
 </svg><Row><Control disabled={locked||built} onClick={()=>{setBuilt(true);interact();}}>Build the picture</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Counting model · not to scale</p></div>}
 </Lesson>;
}
