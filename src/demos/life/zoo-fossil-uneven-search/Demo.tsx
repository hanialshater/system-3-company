"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"In a toy survey, region A has 2 finds from 2 searched sites and B has 8 finds from 8 searched sites. Which has more finds per searched site?",options:["Region A","Region B","They are equal"],answer:2}} exploreHint="Compare the search effort behind each count." reveal={()=><p>Region A has 2 finds in 2 searches and region B has 8 in 8: both have one find per searched site in this constructed example. The raw total alone can reflect unequal effort. Equal observed rates still do not establish equal true abundance.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===2?"Region A: 2 finds in 2 searched sites. Region B: 8 finds in 8 searched sites.":"Two regions with search counts hidden until inspected."}>
 <rect x="15" y="15" width="145" height="142" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="180" y="15" width="145" height="142" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 <text x="87" y="42" textAnchor="middle" fill="var(--fg)" fontSize="15">Region A</text><text x="252" y="42" textAnchor="middle" fill="var(--fg)" fontSize="15">Region B</text>
 {step>=1&&<><text x="87" y="85" textAnchor="middle" fill="var(--fg)" fontSize="25">● ●</text><text x="87" y="122" textAnchor="middle" fill="var(--fg)" fontSize="13">2 finds / 2 sites</text></>}
 {step>=2&&<><text x="252" y="75" textAnchor="middle" fill="var(--fg)" fontSize="20">● ● ● ●</text><text x="252" y="100" textAnchor="middle" fill="var(--fg)" fontSize="20">● ● ● ●</text><text x="252" y="129" textAnchor="middle" fill="var(--fg)" fontSize="13">8 finds / 8 sites</text></>}
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect A</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Inspect B</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Constructed counts, not observed data</p></div>}
 </Lesson>;
}
