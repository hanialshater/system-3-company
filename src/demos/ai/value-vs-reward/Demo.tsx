"use client";
import {useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control,Row} from '@/kit/controls';
import {returns} from './model';
import s from './styles.module.css';
export default function Demo({slug}:{slug:string}) {
 const [gamma,setGamma]=useState<1|0.5>(1),[compared,setCompared]=useState(false),[halfSeen,setHalfSeen]=useState(false);
 const totals=returns(gamma),full=returns(1),half=returns(.5);
 return <Lesson slug={slug} predict={{question:"Your first move: Cash pays 3 and ends the game; Wait pays 0, then 5 one step later. At discount 1 (later rewards count in full), which start action has the greater return?",options:["Cash","Wait","They tie"],answer:1}} minInteractions={2} exploreHint="Compare both paths, then switch the discount to see which choice wins." reveal={()=> <p>At γ=1, Cash returned {full.cash} while Wait returned 0+1×5={full.wait}. Zero now led to more over the whole path. At γ=0.5, the later 5 became {half.wait}, below Cash’s {half.cash}. Discount multiplies the later reward, so timing reversed the choice.</p>}>
 {({locked,interact})=><div className={s.root}>
  <div className={s.trace}><div>Cash → 3 → end</div><div>Wait → 0 → Bridge → 5 → end</div></div>
  <div className={s.rule}>Discount multiplies the later reward.</div>
  <div className={s.equation}>γ={gamma}: Cash {compared?totals.cash:"?"} / Wait {compared?totals.wait:"?"}</div>
  {compared?<div className={s.proof}><div>γ=1: Cash {full.cash} / Wait {full.wait}</div>{halfSeen?<div>γ=.5: Cash {half.cash} / Wait {half.wait}</div>:null}</div>:null}
  <Row><Control disabled={locked||compared} onClick={()=>{setCompared(true);interact();}}>Compare returns</Control><Control disabled={locked||!compared} onClick={()=>{setGamma(g=>g===1?.5:1);if(!halfSeen){setHalfSeen(true);interact();}}}>Switch discount</Control><Control disabled={locked||!halfSeen||gamma===.5} onClick={()=>setGamma(.5)}>Reset</Control></Row>
 </div>}
 </Lesson>;
}
