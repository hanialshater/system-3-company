"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [moved,setMoved]=useState(false);
 return <Lesson slug={slug} predict={{question:"A fault cuts and offsets two sediment layers. Did the movement occur before or after those layers formed?",options:["Before both layers","After both layers","Their order cannot be inferred"],answer:1}} exploreHint="Move one side of the fault and inspect the cut layers." reveal={()=><p>Both layers extend across the break and are displaced by it. In this simple model, those layers had to exist before the movement that displaced them. The cut alone does not date any later layers that it does not displace.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 175" className="stage-svg" role="img" aria-label={moved?"Two layers are displaced at a fault. Matching layers are higher on the right.":"Two aligned layers; fault movement is hidden."}>
 <rect x="30" y="45" width="140" height="42" fill="#a9c0ad"/><rect x="30" y="87" width="140" height="42" fill="#d7bd91"/>
 <g transform={moved?"translate(0 -20)":undefined}><rect x="170" y="45" width="140" height="42" fill="#a9c0ad"/><rect x="170" y="87" width="140" height="42" fill="#d7bd91"/></g>
 {moved&&<><path d="M170 19 V139" stroke="var(--fg)" strokeWidth="4" strokeDasharray="4 3"/><path d="M290 150 V130 M285 135 L290 130 L295 135" fill="none" stroke="var(--fg)" strokeWidth="2"/><text x="172" y="164" textAnchor="middle" fontSize="13" fill="var(--fg)">Fault cuts both layers</text></>}
 </svg><Row><Control disabled={locked||moved} onClick={()=>{setMoved(true);interact();}}>Move the fault</Control></Row></div>}
 </Lesson>;
}
