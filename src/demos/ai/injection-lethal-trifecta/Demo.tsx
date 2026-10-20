"use client";
import {useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control,Row} from '@/kit/controls';
import {instruction,route} from './model';
import s from './styles.module.css';
export default function Demo({slug}:{slug:string}) {
 const [permissions,setPermissions]=useState([false,false,false]);
 const [success,setSuccess]=useState(false),[blockedWitness,setBlockedWitness]=useState<string|null>(null);
 const result=route(permissions);
 const restored=permissions[0]&&permissions[1]&&!permissions[2];
 return <Lesson slug={slug} predict={{question:"In this toy, which permission pattern transfers the code?",options:["Private and note only","All three enabled","Outbound only"],answer:1}} minInteractions={2} exploreHint="Enable access, read the note, allow outbound, then block outbound." reveal={()=> <p>The untrusted note became a copy request. Private access supplied 42; outbound put 42 in the local outbox. The retained {blockedWitness} countercase left it empty. This deliberately vulnerable toy sends nothing externally. Blocking this route does not establish security against every injection risk.</p>}>
 {({locked,interact})=>{
  const change=(next:boolean[])=>{const nextResult=route(next);setPermissions(next);if(nextResult.outbox===42&&!success){setSuccess(true);interact();}if(success&&nextResult.blocked&&!blockedWitness){setBlockedWitness(nextResult.blocked);interact();}};
  return <div className={s.root}>
   <div className={s.note}><span>Untrusted note</span><blockquote>{instruction}</blockquote></div>
   <svg className={s.picture} viewBox="0 0 290 40" role="img" aria-label={result.request?`Note accepted as copy request; ${result.blocked?`blocked by ${result.blocked}`:"private value placed in local outbox"}`:`Private fixture access ${result.privateAccess?"open":"closed"}; empty mock outbox; note not read`}>
    <rect x="1" y="1" width="76" height="21" rx="4" fill="none" stroke={result.privateAccess?"var(--domain)":"var(--muted)"} strokeWidth="2" strokeDasharray={result.privateAccess?undefined:"4 3"}/>
    <text x="5" y="16">Private 42</text><text x="204" y="16">Outbox {result.outbox??"∅"}</text>
    <path d={result.privateAccess?"M79 11 H94 M95 5 L101 1":"M79 11 H94 M98 4 V21"} fill="none" stroke="var(--domain)" strokeWidth="2"/>
    <text x="107" y="16">{result.privateAccess?"open":"closed"}</text>
    <path d="M146 11 H198" fill="none" stroke="var(--domain)" strokeDasharray={result.privateAccess&&result.outbound?undefined:"4 3"}/>
    <text x="2" y="35">{result.request?`copy ${result.request.value??"?"}`:"request ∅"}</text>
    <text x="92" y="35">{result.blocked?`Blocked: ${result.blocked}`:"request → outbox 42"}</text>
   </svg>
   {success?<div className={s.proof}><div>Seen: note→copy42→outbox42</div>{blockedWitness?<div>{blockedWitness} blocked→∅</div>:null}</div>:null}
   <Row><Control disabled={locked} aria-pressed={permissions[0]} className={permissions[0]?"active":""} onClick={()=>change([!permissions[0],permissions[1],permissions[2]])}>Private access</Control><Control disabled={locked} aria-pressed={permissions[1]} className={permissions[1]?"active":""} onClick={()=>change([permissions[0],!permissions[1],permissions[2]])}>Read note</Control><Control disabled={locked} aria-pressed={permissions[2]} className={permissions[2]?"active":""} onClick={()=>change([permissions[0],permissions[1],!permissions[2]])}>Outbound</Control><Control disabled={locked||!success||!permissions[2]} onClick={()=>change([permissions[0],permissions[1],false])}>Block outbound</Control><Control disabled={locked||!blockedWitness||restored} onClick={()=>change([true,true,false])}>Reset</Control></Row>
  </div>;
 }}
 </Lesson>;
}
