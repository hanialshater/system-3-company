"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;feature:string;id:string;role:string;explanation:string};
const lesson:Model={
  "question": "Which bacterial feature fits this description? Helps some bacteria move.",
  "options": [
    "Flagellum",
    "Capsule",
    "Cell wall"
  ],
  "answer": 0,
  "feature": "Flagellum",
  "id": "flagellum",
  "role": "Helps some bacteria move.",
  "explanation": "Flagellum: Helps some bacteria move. This is a model; bacterial structures vary among species."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false),hi=(id:string)=>shown&&lesson.id===id?'#e79d5d':undefined;
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Reveal the feature in this model bacterium." reveal={()=><p>{lesson.explanation} Structures such as capsules and flagella are present in some bacteria, but are not universal to every species.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={`${shown?`${lesson.feature}: ${lesson.role}`:'Bacterial feature hidden.'}`}>
 <path d="M248 96 Q283 60 301 90 T332 93" fill="none" stroke={hi('flagellum')||'#80a6a1'} strokeWidth="4"/><rect x="53" y="43" width="200" height="104" rx="52" fill={hi('capsule')||'#dbe9dc'} stroke="#b6d0b7" strokeWidth="5"/><rect x="63" y="52" width="180" height="86" rx="43" fill={hi('wall')||'#bbd2bd'} stroke="#7d9f87" strokeWidth="4"/><rect x="70" y="59" width="166" height="72" rx="36" fill="#e5ece0" stroke={hi('membrane')||'#87ad9f'} strokeWidth="4"/>
 <path d="M120 79 q20 -25 45 2 t32 3 q-20 30 -39 8 t-38 -13" fill="none" stroke={hi('nucleoid')||'#8a72a1'} strokeWidth="4"/><circle cx="106" cy="100" r="9" fill="none" stroke={hi('plasmid')||'#9c80aa'} strokeWidth="3"/>
 {[[91,79],[115,119],[142,70],[180,111],[208,79],[211,109]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill={hi('ribosome')||'#6e9192'}/>)}
 {[78,100,128,157,186,216].map(x=><path key={x} d={`M${x} 48 l-5 -14`} stroke={hi('fimbriae')||'#9baea0'} strokeWidth="3"/>)}
 {shown&&<text x="170" y="178" textAnchor="middle" fill="var(--fg)" fontWeight="bold" fontSize="13">{lesson.feature}</text>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Highlight feature</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>A model bacterium · features vary across species</p></div>}
 </Lesson>;
}
