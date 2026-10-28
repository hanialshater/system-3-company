"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";

// A Newman projection looks along the C–C bond. The front and rear hydrogens
// are drawn separately, including in the eclipsed state.
function Projection({ eclipsed }: { eclipsed: boolean }) {
  const cx = 160, cy = 98;
  const point = (degrees: number, radius: number) => {
    const a = (degrees - 90) * Math.PI / 180;
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
  };
  const front = [0, 120, 240];
  const rear = front.map(a => a + (eclipsed ? 0 : 60));
  return <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={`Newman projection of ethane, viewed along its carbon–carbon bond. The rear bonds are ${eclipsed ? "aligned with" : "between"} the front bonds.`}>
    {rear.map((a, i) => { const [x1,y1]=point(a,34), [x2,y2]=point(a,64); return <g key={i}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d88d36" strokeWidth="5" strokeDasharray="5 3"/><circle cx={x2} cy={y2} r="11" fill="#fae3bc" stroke="#ac6519"/><text x={x2} y={y2+4} textAnchor="middle" fontSize="11" fill="#462c14">H</text></g>; })}
    <circle cx={cx} cy={cy} r="34" fill="none" stroke="#d88d36" strokeWidth="3"/>
    {front.map((a,i) => { const [x,y]=point(a, eclipsed ? 52 : 64); return <g key={i}><line x1={cx} y1={cy} x2={x} y2={y} stroke="#3b78bb" strokeWidth="4"/><circle cx={x} cy={y} r="11" fill="#c9e5ff" stroke="#3b78bb"/><text x={x} y={y+4} textAnchor="middle" fontSize="11" fill="#173b5e">H</text></g>; })}
    <circle cx={cx} cy={cy} r="6" fill="#3b78bb"/>
    <text x="160" y="188" textAnchor="middle" fontSize="13" fill="currentColor">Blue: front carbon · Orange: rear carbon</text>
  </svg>;
}

export default function Demo({slug}:{slug:string}) {
  const [turned,setTurned]=useState(false);
  return <Lesson slug={slug} predict={{question:"Starting from staggered ethane, what happens to its potential energy when the rear carbon turns 60° to the eclipsed position?",options:["It rises","It falls","It stays the same"],answer:0}} exploreHint="Turn the rear carbon and compare the bond positions." reveal={()=><p>The orange rear bonds move from between the blue front bonds to alignment with them. In ethane this eclipsed conformation is about 12 kJ/mol higher in potential energy than the staggered one; rotation changes the conformation, not the connectivity.</p>}>
    {({locked,interact}) => <div><Projection eclipsed={turned}/><Row><Control disabled={locked||turned} onClick={()=>{setTurned(true);interact();}}>Turn rear carbon 60°</Control></Row></div>}
  </Lesson>;
}
