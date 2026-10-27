"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;from:string;to:string;hormone:string;explanation:string};
const lesson:Model={
  "question": "Which anterior-pituitary hormone helps stimulate ovarian follicle development?",
  "options": [
    "Calcitonin",
    "FSH",
    "ADH"
  ],
  "answer": 1,
  "from": "Anterior pituitary",
  "to": "Ovary",
  "hormone": "FSH",
  "explanation": "Follicle-stimulating hormone helps stimulate ovarian follicle development. Ovarian function also depends on other hormones and feedback."
};
function Organ({label,x}:{label:string;x:number}){
 const pancreas=label.startsWith('Pancreas'),adrenal=label.startsWith('Adrenal'),thyroid=label==='Thyroid'||label==='Thyroid C cells'||label==='Parathyroid',pit=label.includes('pituitary'),kidney=label==='Kidney',heart=label==='Heart',bone=label==='Bone marrow',brain=label==='Hypothalamus'||label==='Brain clocks'||label==='Pineal gland';
 return <g transform={`translate(${x} 80)`} stroke="#617e83" strokeWidth="2" strokeLinejoin="round">
 {pancreas?<path d="M-36 5 C-27 -17 -4 -14 6 -20 C20 -28 37 -15 32 -4 C24 10 12 4 0 14 C-15 23 -30 20 -36 5Z" fill="#e4bd8d"/>:null}
 {adrenal?<g><ellipse rx="32" ry="27" fill={label==='Adrenal cortex'?'#eac074':'#c7d9ce'}/><ellipse rx="16" ry="13" fill={label==='Adrenal medulla'?'#eac074':'#9e91b6'}/></g>:null}
 {thyroid?<g><path d="M-8 -10 C-35 -35 -39 16 -20 26 C-10 31 -5 14 0 8 C5 14 10 31 20 26 C39 16 35 -35 8 -10 Z" fill="#caa8b8"/>{label==='Parathyroid'&&[-16,16].flatMap(a=>[-12,12].map(b=><circle key={`${a}-${b}`} cx={a} cy={b} r="4" fill="#edc566"/>))}{label==='Thyroid C cells'&&<circle r="5" fill="#edc566"/>}</g>:null}
 {pit?<g><ellipse cx="-14" rx="18" ry="26" fill={label==='Anterior pituitary'?'#eac074':'#c9d7cd'}/><ellipse cx="14" rx="18" ry="26" fill={label==='Posterior pituitary'?'#eac074':'#c9d7cd'}/></g>:null}
 {kidney?<path d="M-28 -25 C-49 -9 -34 29 -9 27 C3 25 -4 12 -1 5 C2 -4 13 -5 18 -11 C22 -20 2 -35 -12 -30 Z" fill="#d6a49a"/>:null}
 {heart?<path d="M0 31 C-43 8 -39 -30 -18 -29 C-8 -28 -3 -20 0 -14 C3 -20 8 -28 18 -29 C39 -30 43 8 0 31Z" fill="#d99598"/>:null}
 {bone?<path d="M-26 -19 Q-38 -28 -31 -34 Q-24 -39 -17 -28 L18 16 Q29 9 34 17 Q38 25 27 27 Q27 38 18 35 Q10 32 11 22 L-23 -22 Z" fill="#e8dfc8"/>:null}
 {brain?<path d="M-27 5 C-43 -12 -25 -35 -9 -29 C0 -38 13 -32 17 -26 C37 -29 40 -7 29 3 C35 18 19 29 7 24 C-1 32 -14 27 -17 20 C-28 22 -36 14 -27 5Z" fill="#c9bed9"/>:null}
 {!pancreas&&!adrenal&&!thyroid&&!pit&&!kidney&&!heart&&!bone&&!brain?<g><circle r="34" fill="#c2d8cd"/><circle r="13" fill="#9a8bb2"/></g>:null}
 </g>;
}
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Trace the hormone from its source to a target." reveal={()=><p>{lesson.explanation} The diagram shows one selected pathway, not all effects or feedback.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 195" className="stage-svg" role="img" aria-label={`${lesson.from} and ${lesson.to}. ${shown?`${lesson.hormone} signal shown.`:'Hormone hidden.'}`}>
 <Organ label={lesson.from} x={75}/><Organ label={lesson.to} x={265}/>
 <text x="75" y="145" textAnchor="middle" fill="var(--fg)" fontSize="12" fontWeight="bold">{lesson.from}</text><text x="265" y="145" textAnchor="middle" fill="var(--fg)" fontSize="12" fontWeight="bold">{lesson.to}</text>
 {shown?<><path d="M122 80 H215 M207 72 L215 80 L207 88" fill="none" stroke="#d97979" strokeWidth="4"/><circle cx="155" cy="80" r="5" fill="#d97979"/><circle cx="185" cy="80" r="5" fill="#d97979"/><text x="170" y="58" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="bold">{lesson.hormone}</text><text x="170" y="115" textAnchor="middle" fill="var(--muted)" fontSize="11">bloodstream</text></>:<text x="170" y="89" textAnchor="middle" fill="var(--muted)" fontSize="30">?</text>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Trace the signal</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>One selected pathway · schematic</p></div>}
 </Lesson>;
}
