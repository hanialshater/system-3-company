"use client";
import { Molecule, type Structure } from './ReactionLesson';
export type IsomerCase={question:string;options:string[];answer:number;a:Structure;b:Structure;formulaA:string;formulaB:string;explanation:string};
function describe(s:Structure){return s.bonds.map(b=>`${s.atoms[b.a].label} ${b.order===1?'single':b.order===2?'double':'triple'} bond to ${s.atoms[b.b].label}`).join('; ');}
export function IsomerStage({model,counted}:{model:IsomerCase;counted:boolean}){
 return <svg viewBox="0 0 320 178" className="stage-svg" role="img" aria-label={`Structure A: ${describe(model.a)}. Structure B: ${describe(model.b)}. ${counted?`A formula ${model.formulaA}, B formula ${model.formulaB}.`:''}`}>
 <text x="10" y="12" fontSize="12" fill="var(--muted)">Structure A</text>{counted&&<text x="304" y="12" textAnchor="end" fontSize="13" fill="var(--fg)">{model.formulaA}</text>}<Molecule m={model.a} y={52}/><line x1="18" y1="88" x2="302" y2="88" stroke="var(--line)"/>
 <text x="10" y="104" fontSize="12" fill="var(--muted)">Structure B</text>{counted&&<text x="304" y="104" textAnchor="end" fontSize="13" fill="var(--fg)">{model.formulaB}</text>}<Molecule m={model.b} y={145}/>
 </svg>;
}
