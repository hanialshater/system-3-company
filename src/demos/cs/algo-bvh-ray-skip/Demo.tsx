"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {ray,test,triangles} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false),[contrast,setContrast]=useState(false),[earned,setEarned]=useState(false);
 const r=ray(contrast),result=test(contrast),witness=test();const x=(n:number)=>18+n*34,y=(n:number)=>68-n*10;
 return <Lesson slug={slug} predict={{question:"The ray misses the parent box. How many triangle tests are still needed?",options:["0","1","2"],answer:0}} minInteractions={1} exploreHint="Test the containing box; Contrast changes the ray." reveal={()=> <div className={s.explanation}><p id="reveal-primary">Primary: {witness.boxTests} box test, {witness.triangleTests} triangle tests. Both triangles are inside the box; a ray missing it cannot hit either.</p><p id={contrast?"reveal-contrast":"reveal-principle"}>{contrast?`The diagonal entered at t=${result.interval?.[0]} and left at t=${result.interval?.[1]}. Its ${result.triangleTests} candidate tests found ${result.hits} triangle hits. A box hit retains candidates, not a proven triangle hit.`:"A box hit would retain candidates, not prove a triangle hit."}</p></div>}>
 {({locked,interact})=><>
 <svg className={s.picture} viewBox="0 0 290 88" role="img" aria-label={shown?(contrast?"Ray crosses empty box space; triangle candidates tested with no hits":"Ray outside box; enclosed triangles skipped"):"Ray, parent box and two contained triangles"}>
 <rect x={x(2)} y={y(4)} width={68} height={20} fill="none" stroke="var(--fg)" strokeDasharray="5 3"/>
 {triangles.map((t,i)=><g key={i}><polygon points={t.map(p=>`${x(p[0])},${y(p[1])}`).join(" ")} fill="var(--domain)" fillOpacity={shown&&!contrast?.12:.45} stroke="var(--domain)" strokeDasharray={shown&&!contrast?"2 3":undefined}/><text x={x(t[0][0])+(i?22:-20)} y={y(t[0][1])-(i?1:7)}>T{i+1}</text></g>)}
 <line x1={x(r.origin[0])} y1={y(r.origin[1])} x2={x(5.4)} y2={y(contrast?5.4:1)} stroke="var(--domain)" strokeWidth="3"/>
 <circle cx={x(r.origin[0])} cy={y(r.origin[1])} r="4" fill="var(--fg)"/><text x={x(5.4)-10} y={y(contrast?5.4:1)+17}>→</text>
 {contrast?<><line x1={x(0)} y1={y(1)} x2={x(5.4)} y2={y(1)} stroke="var(--muted)" strokeDasharray="3 3"/><text x="211" y="35">Primary ⋯</text><text x="211" y="51">Current —</text><text x={x(2)} y={y(2)-4}>t=2</text><text x={x(4)} y={y(4)-4}>t=4</text></>:null}
 <text x="2" y="84">x: 34px/unit · y: 10px/unit</text>
 </svg>
 <p className={s.summary} aria-live="polite">{shown?`Box tests ${result.boxTests} · triangle tests ${result.triangleTests} · hits ${result.hits}`:"Ray t ≥ 0"}{contrast?<><br/>Primary: box {witness.boxTests} · triangle {witness.triangleTests} · hits {witness.hits}</>:null}</p>
 <div className={s.controls}><Control disabled={locked||shown} onClick={()=>{setShown(true);setEarned(true);if(!earned)interact();}}>Test box</Control><Control disabled={locked||!earned||contrast} onClick={()=>{setContrast(true);setShown(true);}}>Contrast</Control><Control disabled={locked||!contrast} onClick={()=>{setContrast(false);setShown(earned);}}>Reset</Control></div>
 </>}
 </Lesson>;
}
