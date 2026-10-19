"use client";
import {useEffect,useRef} from "react";
import {DOCUMENTS,PERIOD_PROVENANCE,requiredFrame,frameText} from "./model";
import s from "./styles.module.css";
export function Sources({id,onClose}:{id:string;onClose:()=>void}){
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{heading.current?.focus();const escape=(e:KeyboardEvent)=>{if(e.key==="Escape"){e.preventDefault();onClose();}};document.addEventListener("keydown",escape);return()=>document.removeEventListener("keydown",escape);},[onClose]);
 return <section id={id} className={s.sources} aria-labelledby={`${id}-heading`}><h2 id={`${id}-heading`} tabIndex={-1} ref={heading}>Sources and scope</h2><button type="button" onClick={onClose}>Close sources</button>{DOCUMENTS.map(d=><p key={d.id} data-claim={d.claims.join(" ")}><strong>{d.mediation}.</strong>{" "}{d.text}. {d.requiredContext}{" "}<a href={d.sourceUrl} target="_blank" rel="noreferrer">Source: {d.locator}</a></p>)}{PERIOD_PROVENANCE&&<p data-claim="period-provenance">{PERIOD_PROVENANCE}</p>}<p data-claim="asset-boundary">Selected documentary accounts do not establish continuous control, residents’ consent or universal representation. Original English factual summaries and original nongeographic schematic; no official translation or source media.</p></section>;
}

export function RecordDetails({id,witness,onClose}:{id:string;witness:string;onClose:()=>void}){const heading=useRef<HTMLHeadingElement>(null);useEffect(()=>{heading.current?.focus();const escape=(e:KeyboardEvent)=>{if(e.key==="Escape"){e.preventDefault();onClose();}};document.addEventListener("keydown",escape);return()=>document.removeEventListener("keydown",escape);},[onClose]);return <section id={id} className={s.sources} aria-labelledby={`${id}-heading`}><h2 id={`${id}-heading`} tabIndex={-1} ref={heading}>Selected record</h2><button type="button" onClick={onClose}>Close record</button><p data-claim={`qualified.${witness}`}>{frameText(requiredFrame(witness))}</p></section>;}
