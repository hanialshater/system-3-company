"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {points,split} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false),[contrast,setContrast]=useState(false),[earned,setEarned]=useState(false);
 const ps=points(contrast),result=split(ps),witness=split(points());
 return <Lesson slug={slug} predict={{question:"First split uses x. Which point becomes the root?",options:["B","C","D"],answer:1}} minInteractions={1} exploreHint="Split the points, then move D with Contrast." reveal={()=> <div className={s.explanation}><p>The primary split stored {witness.pivot.id} once at the root, leaving {witness.left.length} points on each side. Its two regions had areas {witness.areas[0]} and {witness.areas[1]}.</p><p>Median rank balances point counts here, not rectangle areas.{contrast?" Moving D preserved the root and counts.":""}</p></div>}>
 {({locked,interact})=><>
 <svg className={s.picture} viewBox="0 0 290 108" role="img" aria-label={shown?"Computed median split and point membership; original D outlined on contrast":"Five labelled points in a rectangle"}>
 <rect x="24" y="18" width="220" height="56" fill="none" stroke="var(--fg)"/>
 {shown?<><rect x="24" y="18" width={result.coordinate*22} height="56" fill="var(--domain)" opacity=".12"/><line x1={24+result.coordinate*22} x2={24+result.coordinate*22} y1="18" y2="74" stroke="var(--domain)" strokeDasharray="5 3"/><text x="24" y="90">Left {result.left.length}: area {result.areas[0]}</text><text x="158" y="90">Right {result.right.length}: area {result.areas[1]}</text></>:null}
 {contrast?<><circle cx={24+points()[3].x*22} cy={74-points()[3].y*7} r="6" fill="none" stroke="var(--fg)" strokeWidth="2"/><text x="130" y="14">D: ○ original ● current</text></>:null}
 {ps.map(p=><g key={p.id}><circle cx={24+p.x*22} cy={74-p.y*7} r={shown&&p.id===result.pivot.id?6:4} fill={shown&&p.id===result.pivot.id?"var(--good)":"var(--fg)"}/><text x={31+p.x*22} y={70-p.y*7}>{p.id}</text></g>)}
 <text x="2" y="79">0</text><text x="249" y="31">10,8</text><text x="24" y="104">x: 22px/unit · y: 7px/unit</text>
 </svg>
 <p className={s.summary} aria-live="polite">{earned?<>Primary root {witness.pivot.id} · left {witness.left.length} / right {witness.right.length}{contrast?<><br/>Current root {result.pivot.id} · left {result.left.length} / right {result.right.length}</>:null}</>:"x →"}</p>
 <div className={s.controls}><Control disabled={locked||shown} onClick={()=>{setShown(true);setEarned(true);if(!earned)interact();}}>Split</Control><Control disabled={locked||!earned||contrast} onClick={()=>{setContrast(true);setShown(true);}}>Contrast</Control><Control disabled={locked||!contrast} onClick={()=>{setContrast(false);setShown(earned);}}>Reset</Control></div>
 </>}
 </Lesson>;
}
