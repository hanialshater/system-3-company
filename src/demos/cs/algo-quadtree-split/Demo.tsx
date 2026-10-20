"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {construct,points,leaves,splits,type Cell} from "./model";
import s from "./styles.module.css";
function branches(c:Cell):Cell[]{return c.children.length?[c,...c.children.flatMap(branches)]:[];}
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0),[contrast,setContrast]=useState(false),[earned,setEarned]=useState(false);
 const ps=points(contrast),tree=construct(ps,3,step),count=splits(tree),occupied=leaves(tree).filter(c=>c.points.length).length;
 const primary=construct(points()),witness={splits:splits(primary),occupied:leaves(primary).filter(c=>c.points.length).length};
 const x=(n:number)=>14+n*5,y=(n:number)=>50-n*5;
 return <Lesson slug={slug} predict={{question:"After the root splits, which child must split again?",options:["Lower-left","Upper-right","Neither"],answer:0}} minInteractions={1} exploreHint="Split the root, then refine its overflowing child." reveal={()=><div className={s.explanation}><p id="reveal-primary">A and B shared the lower-left cell. Refining it separated them; C stayed coarse: {witness.splits} splits, {witness.occupied} occupied leaves.</p>{contrast?<p id="reveal-contrast">Moving B needs {count} root split, with {occupied} occupied leaves.</p>:null}<p id="reveal-rule">Refine only overflowing cells, subject to depth limit. Midpoint boundaries go right/up. Capacity is 1; at depth 3 overflow stays in a bucket.</p></div>}>
 {({locked,interact})=><>
 <svg className={s.picture} viewBox="0 0 290 64" role="img" aria-label={step===0?"Three labelled points in the root rectangle":`Computed quadtree: ${count} splits and ${occupied} occupied leaves.${earned?` Retained primary: ${witness.splits} splits and ${witness.occupied} occupied leaves.`:""}`}>
 <rect x={x(0)} y={y(8)} width="40" height="40" fill="none" stroke="var(--fg)"/>
 {branches(tree).map(c=>{const [a,b,d,e]=c.bounds,mx=(a+b)/2,my=(d+e)/2;return <g key={c.bounds.join(",")}><line x1={x(mx)} x2={x(mx)} y1={y(d)} y2={y(e)} stroke="var(--domain)"/><line x1={x(a)} x2={x(b)} y1={y(my)} y2={y(my)} stroke="var(--domain)"/></g>;})}
 {ps.map(p=><g key={p.id}><circle cx={x(p.x)} cy={y(p.y)} r="3" fill="var(--fg)"/><text x={x(p.x)+(p.id==="A"?-18:5)} y={y(p.y)+(p.id==="A"?-5:-2)}>{p.id}</text></g>)}
 {contrast?<g stroke="var(--muted)" fill="none" strokeDasharray="3 2"><line x1={x(2)} x2={x(2)} y1={y(0)} y2={y(4)}/><line x1={x(0)} x2={x(4)} y1={y(2)} y2={y(2)}/><circle cx={x(2)} cy={y(2)} r="4"/></g>:null}
 <text x="1" y="58">0</text><text x="70" y="14">8</text><text x="99" y="13">Capacity 1 · depth ≤3</text>{earned?<><text x="99" y="29">Primary A/B: lower-left</text><text x="99" y="45">C: coarse · dashed=primary</text></>:null}
 {step?<text x="44" y="61" aria-live="polite">Splits / occupied leaves: {count}/{occupied}{earned?`; primary ${witness.splits}/${witness.occupied}`:""}</text>:null}
 </svg>
 <div className={s.controls}><Control disabled={locked||step>0} onClick={()=>setStep(1)}>Split root</Control><Control disabled={locked||step!==1||contrast} aria-label={contrast?"Refine: no overflowing child":"Refine"} onClick={()=>{setStep(3);setEarned(true);if(!earned)interact();}}>Refine</Control><Control disabled={locked||!earned||contrast} onClick={()=>{setContrast(true);setStep(3);}}>Contrast</Control><Control disabled={locked||!contrast} onClick={()=>{setContrast(false);setStep(earned?3:0);}}>Reset</Control></div>
 </>}
 </Lesson>;
}
