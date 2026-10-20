"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {trace} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
const [step,setStep]=useState(0),[contrast,setContrast]=useState(false);const t=trace(contrast?0:.5),w=trace();
return <Lesson slug={slug} predict={{"question": "Your game agent makes a move that earns nothing but lands somewhere with value ahead. Zero reward, next estimates 2 and 4. With \u03b3=.5 and \u03b1=.5, what does old 0 become?", "options": ["0", "1", "2"], "answer": 1}} minInteractions={1} exploreHint="Update, replay, then inspect the terminal transition." reveal={()=><><p>Zero immediate reward still produced target {w.first.target}: half of the largest next estimate, 4. Moving halfway from 0 gave {w.first.value}; replaying gave {w.second.value}.</p><p>The terminal update ignored its stored 99: continuation {w.terminal.continuation}, target {w.terminal.target}, new estimate {w.terminal.value}. Here γ discounts the next estimate; α sets the fraction moved toward the target.{contrast?" With γ=0, Start stayed 0.":""}</p></>}>
{({locked,interact})=><>
<svg className={s.picture} viewBox="0 0 340 190" role="img" aria-label="Experience tuple and computed old, target, new values">
 {[["Start",35],["Bridge",145],["Terminal",260]].map(([name,x])=><g key={name}><rect x={Number(x)-17} y="20" width="91" height="38" rx="5" fill="var(--bg-2)" stroke="var(--line)"/><text x={Number(x)-8} y="44">{name}</text></g>)}
 <text x="110" y="44">→</text><text x="224" y="44">→</text><text x="23" y="79">right, r=0</text><text x="144" y="79">Q: 2, 4</text><text x="267" y="79">99</text>
 <text x="20" y="109">old → target → new</text>
 {step>0?<text x="28" y="135">{t.first.old} → {t.first.target} → {t.first.value}</text>:null}
 {step>1?<text x="28" y="159">{t.second.old} → {t.second.target} → {t.second.value}</text>:null}
 {step>2?<><line x1="263" y1="65" x2="294" y2="82" stroke="var(--bad)"/><text x="184" y="135">{t.terminal.old} → {t.terminal.target} → {t.terminal.value}</text><text x="184" y="159">continuation {t.terminal.continuation}</text><text x="184" y="182">separate tuple</text></>:null}
 </svg>
<p className={s.summary} aria-live="polite"><>α=.5 · γ={contrast?0:.5}{contrast?<><br/>Primary 0→2→1; 1→2→1.5; terminal1→4→2.5</>:null}</></p>
<div className={s.controls}><Control disabled={locked||step>0} onClick={()=>setStep(1)}>Update</Control><Control disabled={locked||step!==1} onClick={()=>setStep(2)}>Replay</Control><Control disabled={locked||step!==2} onClick={()=>{setStep(3);interact();}}>Terminal</Control><Control disabled={locked||step!==3||contrast} onClick={()=>setContrast(true)}>γ=0</Control><Control disabled={locked||!contrast} onClick={()=>setContrast(false)}>Reset</Control></div>
</>}
</Lesson>;
}
