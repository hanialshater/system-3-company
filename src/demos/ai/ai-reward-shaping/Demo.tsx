"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {routes,type Mode} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
const [step,setStep]=useState(0),[gamma,setGamma]=useState(.5),[terminal,setTerminal]=useState(0);const modes:Mode[]=["raw","bonus","potential"],current=routes(modes[step],gamma,terminal),raw=routes("raw"),bonus=routes("bonus"),potential=routes("potential");
return <Lesson slug={slug} predict={{"question": "You are coaching a grid-world robot that can take one of two routes. Cash returns 3. A detour returns 0 then 5, with \u03b3=.5. Add 2 on entering Bridge: which route wins?", "options": ["Cash", "Detour"], "answer": 1}} minInteractions={2} exploreHint="Compare the arbitrary bonus, then the potential difference." reveal={()=><><p>Raw returns were {raw.cash} versus {raw.detour}; the arbitrary Bridge bonus changed them to {bonus.cash} versus {bonus.detour}, flipping the winner to detour.</p><p>With zero terminal potential, F=γΦ(next)−Φ(now) gave {potential.cash} versus {potential.detour}: both raw returns shifted by −2, preserving cash. On the two-step route, the Bridge terms cancel.{terminal?" Terminal Φ=10 violates that boundary and gives unequal offsets.":gamma===1?" At γ=1, potential shaping still preserves the raw detour winner.":""}</p></>}>
{({locked,interact})=><>
<svg className={s.picture} viewBox="0 0 340 190" role="img" aria-label="Two routes, their transition rewards and computed discounted returns">
 <text x="8" y="25">Start</text><text x="235" y="25">Terminal</text><path d="M50 25 L226 25 M50 30 L112 75 L226 30" fill="none" stroke="var(--domain)" strokeWidth="2"/><text x="120" y="75">Bridge</text>
 <text x="110" y="16">cash {current.cash}</text><text x="50" y="62">{current.rewards[0]}</text><text x="194" y="62">{current.rewards[1]}</text>
 <text x="12" y="107">{modes[step]}: {current.cash} / {current.detour} → {current.winner}</text>
 <text x="12" y="133">Φ: 2 → 4 → {terminal} · γ={gamma}</text>
 {step===2?<><text x="12" y="158">Primary: {raw.cash}/{raw.detour} → {bonus.cash}/{bonus.detour} → {potential.cash}/{potential.detour}</text><text y="181"><tspan x="12">+{gamma*4}</tspan><tspan x="62">−2</tspan><tspan x="112">−{gamma*4}</tspan><tspan x="162">+{gamma*gamma*terminal}</tspan><tspan x="212">= {gamma*gamma*terminal-2}</tspan></text><line x1="12" x2="33" y1="174" y2="181" stroke="var(--bad)"/><line x1="112" x2="134" y1="174" y2="181" stroke="var(--bad)"/></>:null}
 </svg>
<p className={s.summary} aria-live="polite"><>return = r₀ + γr₁</></p>
<div className={s.controls}><Control disabled={locked||step!==0} onClick={()=>{setStep(1);interact();}}>Bonus</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Potential</Control><Control disabled={locked||step!==2||gamma===1||terminal!==0} onClick={()=>setGamma(1)}>γ=1</Control><Control disabled={locked||step!==2||terminal!==0} onClick={()=>{setGamma(.5);setTerminal(10);}}>Terminal Φ=10</Control><Control disabled={locked||step!==2||(gamma===.5&&terminal===0)} onClick={()=>{setGamma(.5);setTerminal(0);}}>Reset</Control></div>
</>}
</Lesson>;
}
