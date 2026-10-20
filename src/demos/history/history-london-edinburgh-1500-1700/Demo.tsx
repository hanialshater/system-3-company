'use client';
import {useEffect,useReducer,useRef,useState,type Dispatch,type RefObject} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {initialState,transition,visibleColumns,type State,type Action,type Year} from './model';
import { HistoryLocator } from "@/components/history/HistoryLocator";
import s from './styles.module.css';
const account='https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/act-of-union-1707/overview/union-of-the-crowns/';
const articles='https://www.parliament.uk/globalassets/documents/heritage/articlesofunion.pdf';
function Stage({ctx,state,dispatch,open,onOpen,onReset,sourceButton}:{ctx:StageContext;state:State;dispatch:Dispatch<Action>;open:boolean;onOpen:()=>void;onReset:()=>void;sourceButton:RefObject<HTMLButtonElement|null>}){
 const {locked,interact}=ctx;
 const signalled=useRef(new Set<Year>());
 useEffect(()=>{if(locked){signalled.current.clear();dispatch({type:'restart'});}},[locked,dispatch]);
 const columns=visibleColumns(state,locked);
 // Retain the original explicit unknown-field layout if an incomplete source record is supplied.
 const separateMonarchRow=Object.values(columns).some(r=>r.monarch.status==='unknown');
 const diagramHeight=separateMonarchRow?68:52;
 const choose=(year:Year)=>{const next=transition(state,{type:'select',year});dispatch({type:'select',year});if(next.earned.includes(year)&&!signalled.current.has(year)){signalled.current.add(year);interact();}};
 return <div className={s.frame}>
 <HistoryLocator slug="history-london-edinburgh-1500-1700" places={["London", "Edinburgh"]} />
  <p className={s.orientation} data-claim="history.history-london-edinburgh-1500-1700.c6">Selected institutions; modern city names orient the case.</p>
  <svg viewBox={`0 0 290 ${diagramHeight}`} width="290" height={diagramHeight} style={{height:diagramHeight}} className={s.diagram} role="group" aria-label={locked?'Institution frame, dates not yet opened':'Selected institutional evidence'}>
   <text x="1" y={separateMonarchRow?29:13} className={s.rowLabel}>Monarch</text>
   <text x="1" y={separateMonarchRow?45:29} className={s.rowLabel}>Parliament</text>
   {([1603,1707] as Year[]).map((year,i)=>{const x=120+i*112,r=columns[year];return <g key={year}>
    <rect x={x-54} y="1" width="108" height={diagramHeight-2} rx="5" fill="none" stroke={!locked&&state.focus===year?'currentColor':'var(--line)'} strokeWidth={!locked&&state.focus===year?2:1}/>
    <text x={x} y="13" textAnchor="middle" className={s.value}>{year}{!separateMonarchRow&&r?.monarch.status==='known'?<tspan data-claim={r.monarch.claimId}> {r.monarch.value}</tspan>:null}</text>
    {separateMonarchRow&&r?<text x={x} y="29" textAnchor="middle" className={s.value} data-claim={r.monarch.status==='known'?r.monarch.claimId:undefined}>{r.monarch.status==='known'?r.monarch.value:'Not established'}</text>:null}
    {!r?<path d={`M${x-22} 29 h44`} stroke="var(--muted)" strokeDasharray="4 4"/>:<>
     {r.parliaments.status==='known'?r.parliaments.value.map((node,j)=>{const words=node.label.split(' of ');return <text key={node.id} x={x} y={(separateMonarchRow?45:29)+j*16} textAnchor="middle" className={s.institution} data-institution={node.id} data-claim={r.parliaments.status==='known'?r.parliaments.claimId:undefined} aria-label={node.label}>{words[1]==='Great Britain'?<><tspan x={x}>of Great</tspan><tspan x={x} dy="16">Britain</tspan></>:`of ${words[1]}`}</text>}):<text x={x} y={separateMonarchRow?45:29} textAnchor="middle" className={s.value}>Not established</text>}
    </>}
   </g>;})}
  </svg>
  <div className={s.actions}>{([1603,1707] as Year[]).map(year=><Control key={year} className={s.date} disabled={locked||state.focus===year} aria-pressed={!locked&&state.focus===year} onClick={()=>choose(year)}>{year}</Control>)}<button type="button" data-qa="control" ref={sourceButton} className={`control ${s.tap}`} disabled={locked} aria-expanded={open} aria-controls="london-sources-pane" aria-label={open?'Close sources':'Open sources'} onClick={onOpen}>{open?'Close':'Sources'}</button><Control className={s.tap} disabled={locked||(state.focus===null&&!open)} onClick={()=>{dispatch({type:'reset'});onReset();}}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){
 const [state,dispatch]=useReducer(transition,undefined,initialState);const [open,setOpen]=useState(false);const sourceButton=useRef<HTMLButtonElement>(null);const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(open)heading.current?.focus({preventScroll:true});},[open]);
 const close=()=>{setOpen(false);requestAnimationFrame(()=>sourceButton.current?.focus());};
 return <div className={s.root}>
 <Lesson slug={slug} minInteractions={2} predict={{question:'In 1603, did a shared monarch mean a shared parliament?',options:['Shared parliament','Separate parliaments'],answer:1}} exploreHint="Select both dates and compare the institution rows." reveal={()=><p id="reveal-compact">1603: England and Scotland shared a monarch, with separate parliaments. The 1707 Articles provided for one Parliament of Great Britain. These selected records concern constitutional arrangements, not popular consent, everyone’s experience or every institution. They do not establish identical laws.</p>}>
 {ctx=><Stage ctx={ctx} state={state} dispatch={dispatch} open={open} onOpen={()=>{if(open)close();else setOpen(true);}} onReset={()=>setOpen(false)} sourceButton={sourceButton}/>}
 </Lesson>
 <div className={s.sr} role="status" aria-live="polite">{state.focus?`${state.focus} loaded.`:state.earned.length?'Selection cleared; evidence retained.':''}</div>
 {open&&<section id="london-sources-pane" className={s.sources} aria-labelledby="london-source-heading" data-testid="london-sources" onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();close();}}}><h2 id="london-source-heading" ref={heading} tabIndex={-1}>Sources and scope</h2><button type="button" className={s.close} onClick={close}>Close sources</button>
 <p><a href={account} target="_blank" rel="noreferrer">UK Parliament: Union of the Crowns</a> — modern institutional historical account; shared-monarch paragraph and discussion of separate parliaments. England + Scotland: shared monarch (1603). This is not a contemporary accession instrument.</p>
 <p><a href={articles+'#page=1'} target="_blank" rel="noreferrer">Articles of Union: documentary transcription</a> — Article I: from 1 May 1707; Article II: succession to the united monarchy; Article III: one Parliament of Great Britain. Articles XVIII/XIX (PDF page 8) limit the identical-law inference. Source maker: UK Parliament-hosted transcription.</p>
 <p>Acquired 19 October 2026. Own-word labels and original SVG; no source prose, scan, photograph, territorial geometry or held map payload is used. No official endorsement is implied.</p>
 <p>Contains Parliamentary information licensed under the <a href="https://www.parliament.uk/site-information/copyright/open-parliament-licence/" target="_blank" rel="noreferrer">Open Parliament Licence v3.0</a>.</p><p>The licence excludes third-party rights, personal data, protected arms/portcullis and other excluded assets. <a href="https://www.parliament.uk/site-information/copyright/" target="_blank" rel="noreferrer">Parliament copyright policy</a>.</p>
 </section>}
 </div>;
}
