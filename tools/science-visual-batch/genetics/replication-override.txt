"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";

function Helix({x, newStrand}: {x:number; newStrand:boolean}) {
 const length=108;
 const strand=(phase:number)=>Array.from({length:49},(_,i)=>{
  const t=i/48*Math.PI*3, y=38+i/48*length;
  return `${i?'L':'M'}${(x+14*Math.sin(t+phase)).toFixed(2)} ${y.toFixed(2)}`;
 }).join(' ');
 return <g>
  {Array.from({length:13},(_,i)=>{const t=i/12*Math.PI*3,y=38+i/12*length, dx=14*Math.sin(t); return <line key={i} x1={x+dx} x2={x-dx} y1={y} y2={y} stroke="#8293aa" strokeWidth="2.3"/>})}
  <path d={strand(0)} fill="none" stroke="#7399e3" strokeWidth="4.5" strokeLinecap="round"/>
  <path d={strand(Math.PI)} fill="none" stroke={newStrand?'#efc655':'#7399e3'} strokeWidth="4.5" strokeLinecap="round"/>
 </g>;
}
export default function Demo({slug}:{slug:string}) {
 const [copied,setCopied]=useState(false);
 return <Lesson slug={slug} predict={{question:"During semiconservative DNA replication, what does each newly formed double helix contain?",options:["One original strand and one new strand","Two original strands","Two new strands"],answer:0}}
  exploreHint="Copy the strands and compare the colours in each helix."
  reveal={()=><p>The two original strands separate and each acts as a template. Each resulting double helix contains one original blue strand and one newly synthesised yellow strand. The picture is a simplified 3D projection, not a scale molecular structure.</p>}>
  {({locked,interact})=><div>
   <svg viewBox="0 0 330 205" className="stage-svg" role="img" aria-label={copied ? "Original double helix with two blue strands. Each of the two copied double helices has one blue original strand and one yellow new strand." : "Original double helix with two blue strands; two copied helices are hidden."}>
    <text x="57" y="23" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="600">Before</text>
    <Helix x={57} newStrand={false}/>
    <path d="M88 92 H123 M115 85 L123 92 L115 99" fill="none" stroke="var(--muted)" strokeWidth="2.5"/>
    {copied ? <g>
     <text x="176" y="23" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="600">Copy 1</text>
     <text x="265" y="23" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="600">Copy 2</text>
     <Helix x={176} newStrand/><Helix x={265} newStrand/>
    </g> : <text x="220" y="105" textAnchor="middle" fill="var(--muted)" fontSize="29">?</text>}
    <circle cx="81" cy="181" r="5" fill="#7399e3"/><text x="92" y="185" fontSize="13" fill="var(--fg)">original</text>
    {copied && <g><circle cx="191" cy="181" r="5" fill="#efc655"/><text x="202" y="185" fontSize="13" fill="var(--fg)">new</text></g>}
   </svg>
   <Row><Control disabled={locked || copied} onClick={()=>{setCopied(true);interact();}}>Copy the strands</Control></Row>
   <p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Projected helix model · not to scale</p>
  </div>}
 </Lesson>;
}
