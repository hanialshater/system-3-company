"use client";
import {useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control,Row} from '@/kit/controls';
import {execute} from './model';
import s from './styles.module.css';
export default function Demo({slug}:{slug:string}) {
 const [pear,setPear]=useState(false); const [result,setResult]=useState<string|null>(null); const [seen,setSeen]=useState(false);
 return <Lesson slug={slug} predict={{"question": "Your AI assistant writes a tool request, add(7,5). It passes to an executor, and the answer lands in a result record. Which object actually computes add(7,5)?", "options": ["The request text", "The executor", "The result record"], "answer": 1}} exploreHint="Execute the request, then try the wrong-type pear request." reveal={()=> <p>The retained request produced 12 only after the executor ran. The request described the operation; it did not execute itself. In this numbers-only toy, the pear case returns a type error. These requests are scripted fixtures, not a live model.</p>}>
 {({locked,interact})=><div className={s.root}><div className={s.pipeline}><div>Request<code>{pear?'add(7,"pear")':'add(7,5)'}</code></div><b>→</b><div>Executor<code>{result===null?'waiting':'ran'}</code></div><b>→</b><div>Result<code>{result===null?'none':result}</code></div></div>
 <div className={s.proof}>{seen?'Retained: add(7,5) → 12':'Numbers-only fixture'}</div>
 <Row><Control disabled={locked||seen} onClick={()=>{setResult(String(execute(7,5)));setSeen(true);interact();}}>Execute</Control><Control disabled={locked||!seen||result==='Type error'} onClick={()=>{setPear(true);setResult(String(execute(7,'pear')));}}>Try pear</Control></Row></div>}
 </Lesson>;
}
