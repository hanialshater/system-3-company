"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { calendarResult, queueResult, fileResult, editResult, illustrativeMemory, reconstructionMatches, swapPositions, type StudySpec, type FilesSpec } from "@/lib/lifehacks/studyModels";
import s from "./StudyLesson.module.css";

interface State {
  step: number; starts: number[]; order: number[]; covered: boolean; checked: boolean;
  refined: boolean; day: number; morning: boolean; month: boolean; mode: "A" | "B" | "both";
}
const milestones = ["first-observation", "key-comparison"] as const;
const textColor = "var(--fg)";

function initialState(spec: StudySpec): State {
  return {step:0,starts:spec.family==="schedule"?spec.rows.map(r=>r.start):[],order:spec.family==="order"?spec.initial:[2,0,1],covered:false,checked:false,refined:false,day:0,morning:false,month:false,mode:"both"};
}
function Result({label,value}:{label:string;value:string|number}) {
  return <span className={s.result}><span>{label}</span><strong>{value}</strong></span>;
}
function Frame({label,children}:{label:string;children:React.ReactNode}) {
  return <svg viewBox="0 0 320 142" className={`stage-svg ${s.diagram}`} role="img" aria-label={label}>{children}</svg>;
}

/** Present the current result, so changing state after earning milestones never leaves a stale reveal. */
function observation(spec: StudySpec,state: State): string {
  if(spec.family==="spacing") {
    const v=illustrativeMemory(state.day);
    return `At day ${state.day}, the illustration shows A at ${Math.round(v.cram*100)}% and B at ${Math.round(v.spaced*100)}%. These values follow chosen decay constants, not observations of you.`;
  }
  if(spec.family==="schedule") {
    const rows=spec.rows.map((r,i)=>({...r,start:state.starts[i]}));
    const dueRow=["work-back-from-a-deadline","arrival-is-not-departure"].includes(spec.slug)?0:-1;
    const v=calendarResult(rows,spec.deadline,dueRow);
    return `Your layout has ${v.conflict} overlapping minutes and ends at minute ${v.finish}. ${dueRow>=0?`The first task extends ${v.spill} minutes beyond its minute-${spec.deadline} deadline.`:"All rows use the same person and the durations shown."}`;
  }
  if(spec.family==="order") {
    const roundRobin=spec.slug==="work-in-process-limit"&&state.step<2;
    const v=queueResult(spec,state.order,roundRobin);
    if(spec.slug==="work-in-process-limit") return `Your ${roundRobin?"five-minute round-robin":"whole-job"} schedule first completes a task at minute ${v.firstFinish}. All jobs together still require ${v.time} minutes of execution. Starting and finishing are different events.`;
    return `Your order ${state.order.map(i=>spec.labels[i]).join(" → ")} gives ${v.waiting} total waiting minutes, ${v.late} late jobs and ${v.breaches} prerequisite breaches. ${spec.switchCost?`Each context change adds ${spec.switchCost} minutes.`:"All jobs are ready except for the stated prerequisites."}`;
  }
  if(spec.family==="recall") {
    const matched=reconstructionMatches(spec.words,state.order);
    return `Your reconstruction matches ${matched.filter(Boolean).length} of ${spec.words.length} positions. The covered target was ${spec.words.join(" → ")}; your attempt was ${state.order.map(i=>spec.words[i]).join(" → ")}.`;
  }
  if(spec.family==="files") {
    const v=fileResult(spec,state.step);
    return `The current result reports ${v.count} ${v.caption.toLowerCase()}. ${v.rows.length?`Visible records: ${v.rows.map(r=>r.name).join(", ")}.`:"No records match the chosen field rule."}`;
  }
  if(spec.family==="message") {
    return `Your note contains ${state.step+1} of ${spec.fields.length} checklist fields: ${spec.fields.slice(0,state.step+1).join(", ")}. The added values stay visible beside their labels.`;
  }
  const v=editResult(spec,state.step);
  return `The local editor now contains ${v.tokens.join(" · ")}. ${v.highlight>=0?`The highlighted position is ${v.highlight+1}; finding did not rewrite the tokens.`:v.focus?`Focus is ${v.focus}; selection is ${v.selection}.`:v.scale!==1?`View scale is ${v.scale}; the stored words stay the same.`:"These are the displayed results of the two named commands."}`;
}

export function StudyLesson({slug,spec}:{slug:string;spec:StudySpec}) {
  const [state,setState]=useState<State>(()=>initialState(spec));
  return <Lesson
    slug={slug}
    predict={{question:spec.question,options:spec.options,answer:spec.answer}}
    minInteractions={2}
    exploreHint={spec.family==="recall"?"Cover the target, reconstruct it, then check the positions.":spec.family==="spacing"?"Visit both test markers, then compare the two calendars.":"Try both labelled operations; inspect what changes in the fixture."}
    reveal={()=> <><p>{observation(spec,state)}</p><p>{spec.principle}</p></>}
  >
    {({locked,interact})=> <Stage spec={spec} state={state} setState={setState} locked={locked} interact={interact}/>}
  </Lesson>;
}

function Stage({spec,state,setState,locked,interact}:{spec:StudySpec;state:State;setState:Dispatch<SetStateAction<State>>;locked:boolean;interact:()=>void}) {
  const {reach}=useMilestones(interact,milestones);
  const step=(next:number)=> {
    if(locked || next===state.step)return;
    setState(p=>({...p,step:next}));
    reach(next===1?"first-observation":"key-comparison");
  };
  if(spec.family==="spacing") {
    const values=illustrativeMemory(state.day);
    const line=(constant:number)=>Array.from({length:31},(_,d)=>`${d?"L":"M"}${28+d*9},${118-Math.exp(-d/constant)*54}`).join(" ");
    return <div className={s.wrap}>
      <div className={s.caption}>Illustrative recall·3h/plan</div>
      <Frame label={`Illustrative curves at day ${state.day}. A and B use invented decay constants; not measured memory.`}>
        <path d="M28 58 V118 H302" fill="none" stroke="var(--line)"/>
        {state.mode!=="B"&&<path d={line(7)} stroke="var(--domain)" strokeWidth="3" fill="none"/>}
        {state.mode!=="A"&&<path d={line(18)} stroke="var(--good)" strokeWidth="3" strokeDasharray="5 3" fill="none"/>}
        <line x1={28+state.day*9} x2={28+state.day*9} y1="58" y2="118" stroke={textColor} strokeWidth="2"/>
        <text x="4" y="16" fill={textColor}>A:3h@0</text>
        <rect x="236" y="4" width="60" height="14" rx="3" fill="var(--domain)"/>
        <text x="4" y="38" fill={textColor}>B:recall→1h</text>
        {spec.days.map((d,i)=><g key={d}><rect x={106+i*65} y="26" width="20" height="14" rx="3" fill="var(--good)"/><text x={116+i*65} y="53" textAnchor="middle" fill={textColor}>{d}d</text></g>)}
        <text x="2" y="65" fill={textColor}>100%</text><text x="2" y="120" fill={textColor}>0%</text><text x="298" y="136" textAnchor="end" fill={textColor}>30d</text>
        {[state.morning?1:null,state.month?30:null].filter((d): d is number=>d!==null).map(d=><g key={d}>
          {state.mode!=="B"&&<circle cx={28+d*9} cy={118-illustrativeMemory(d).cram*54} r="4" fill="var(--domain)" stroke={textColor}/>}
          {state.mode!=="A"&&<circle cx={28+d*9} cy={118-illustrativeMemory(d).spaced*54} r="4" fill="var(--good)" stroke={textColor}/>}
        </g>)}
      </Frame>
      <div className={s.results}><Result label="A" value={locked?"?":`${Math.round(values.cram*100)}%`}/><Result label="B" value={locked?"?":`${Math.round(values.spaced*100)}%`}/></div>
      <div className={s.controls}>
        <Control disabled={locked||state.day===1} onClick={()=>{setState(p=>({...p,day:1,morning:true}));reach("first-observation");}}>Next morning</Control>
        <Control disabled={locked||state.day===30} onClick={()=>{setState(p=>({...p,day:30,month:true}));reach("key-comparison");}}>One month</Control>
      </div>
      <Slider label="Day" min={0} max={30} value={state.day} disabled={locked} onChange={day=>setState(p=>({...p,day}))}/>
      <div className={s.controls}>
        <Control disabled={locked||state.mode==="A"} onClick={()=>setState(p=>({...p,mode:"A"}))}>A</Control>
        <Control disabled={locked||state.mode==="B"} onClick={()=>setState(p=>({...p,mode:"B"}))}>B</Control>
        <Control disabled={locked||(state.mode==="both"&&state.day===30)} onClick={()=>setState(p=>({...p,mode:"both",day:30}))}>Month: both</Control>
      </div>
    </div>;
  }
  if(spec.family==="schedule") {
    const rows=spec.rows.map((r,i)=>({...r,start:state.starts[i]}));
    const dueRow=["work-back-from-a-deadline","arrival-is-not-departure"].includes(spec.slug)?0:-1;
    const values=calendarResult(rows,spec.deadline,dueRow);
    const limit=100, x=(v:number)=>82+v/limit*220;
    const moved=state.starts.every((v,i)=>v===spec.target[i]);
    return <div className={s.wrap}>
      <div className={s.caption}>One person · minutes</div>
      <Frame label={`Calendar. ${rows.map(r=>`${r.label} starts ${r.start} lasts ${r.duration} minutes`).join("; ")}. ${values.conflict} conflict minutes.`}>
        {rows.map((r,i)=><g key={r.label}>
          <text x="2" y={32+i*36} fill={textColor} className={s.rowLabel}>{r.label}</text>
          <rect x={x(r.start)} y={15+i*36} width={r.duration/limit*220} height="19" rx="4" fill={i===spec.movable?"var(--domain)":"var(--line)"} stroke={textColor}/>
          <text x={x(r.start)} y={46+i*36} fill={textColor}>{r.start}–{r.start+r.duration}</text>
        </g>)}
        <text x="82" y="140" fill={textColor}>0</text><text x="302" y="140" textAnchor="end" fill={textColor}>100</text>
        {dueRow>=0&&<line x1={x(spec.deadline)} x2={x(spec.deadline)} y1="8" y2="34" stroke="var(--bad)" strokeWidth="2"/>}
      </Frame>
      <div className={s.results}><Result label="Overlap" value={state.step?`${values.conflict}m`:"?"}/><Result label={dueRow>=0?`Due${spec.deadline}`:"Finish"} value={state.step?`${dueRow>=0?rows[0].start+rows[0].duration:values.finish}m`:"?"}/></div>
      <div className={s.controls}>
        <Control disabled={locked||state.step>0} onClick={()=>step(1)}>Test plan</Control>
        <Control disabled={locked||!state.step||moved} onClick={()=>{setState(p=>({...p,step:2,starts:[...spec.target]}));reach("key-comparison");}}>{spec.button}</Control>
      </div>
      <Slider label="Start" value={state.starts[spec.movable]} min={0} max={70} disabled={locked||!state.step} format={v=>`${v}m`} onChange={v=>setState(p=>({...p,starts:p.starts.map((n,i)=>i===spec.movable?v:n)}))}/>
    </div>;
  }
  if(spec.family==="order") {
    const roundRobin=spec.slug==="work-in-process-limit"&&state.step<2;
    const v=queueResult(spec,state.order,roundRobin);
    const target=state.order.every((id,i)=>id===spec.target[i]);
    const x=(time:number)=>74+time/80*225;
    return <div className={s.wrap}>
      <div className={s.caption}>{roundRobin?"Slice=5m · duration/due":spec.switchCost?`Setup=${spec.switchCost}m/switch`:"Exercise · duration/due"}</div>
      <Frame label={`Queue order ${state.order.map(id=>spec.labels[id]).join(", ")}; durations and due times in minutes. Dependencies ${JSON.stringify(spec.dependencies)}.`}>
        {state.order.map((id,i)=><g key={id}>
          <text x="2" y={29+i*35} fill={textColor} className={s.rowLabel}>{spec.labels[id]}</text>
          {v.segments.filter(seg=>seg.id===id).map((seg,index)=><rect key={index} x={x(seg.start)} y={13+i*35} width={(seg.end-seg.start)/80*225} height="20" rx="4" fill={i===0?"var(--domain)":"var(--line)"} stroke={textColor}/>)}
          <text x="4" y={43+i*35} fill="var(--muted)">{spec.durations[id]}m/{spec.due[id]}due{spec.dependencies[String(id)]!==undefined?`←${spec.labels[spec.dependencies[String(id)]]}`:""}</text>
          <line x1={x(spec.due[id])} x2={x(spec.due[id])} y1={10+i*35} y2={34+i*35} stroke="var(--bad)" strokeWidth="2"/>
        </g>)}
        <text x="74" y="136" fill={textColor}>0</text><text x="299" y="136" textAnchor="end" fill={textColor}>80m</text>
      </Frame>
      <div className={s.results}><Result label={spec.metric==="completion"?"First":"Wait"} value={state.step?`${spec.metric==="completion"?v.firstFinish:v.waiting}m`:"?"}/><Result label="Late" value={state.step?v.late:"?"}/><Result label={spec.metric==="switches"?"Switches":"Prereq"} value={state.step?(spec.metric==="switches"?v.switches:v.breaches):"?"}/></div>
      <div className={s.controls}>
        <Control disabled={locked||state.step>0} onClick={()=>step(1)}>Run queue</Control>
        <Control disabled={locked||!state.step} onClick={()=>{setState(p=>({...p,step:2,order:swapPositions(p.order,0,1)}));reach("key-comparison");}}>Swap first</Control>
        <Control disabled={locked||!state.step||target} onClick={()=>{setState(p=>({...p,step:2,order:[...spec.target]}));reach("key-comparison");}}>Try target</Control>
      </div>
    </div>;
  }
  if(spec.family==="recall") {
    const matches=reconstructionMatches(spec.words,state.order);
    const refinement: Record<string,string> = {
      "one-question-one-card":"Split prompt", "cue-needs-a-boundary":"Add country", "reverse-the-flashcard":"Reverse",
      "note-gap-check":"Remove field", "apply-not-quote":"New values", "separate-confusable-pairs":"Add digits"
    };
    const needsRefinement=Boolean(refinement[spec.slug]);
    const reverse=spec.slug==="reverse-the-flashcard"&&!state.refined;
    const sourceWords=reverse?spec.labels:spec.words;
    const sourceLabels=reverse?spec.words:spec.labels;
    const actualLabels=spec.slug==="cue-needs-a-boundary"&&!state.refined?["capital","capital","capital"]:spec.slug==="separate-confusable-pairs"&&!state.refined?["AX","AX","AX"]:sourceLabels;
    const compound=spec.slug==="one-question-one-card"&&!state.refined;
    const application=spec.slug==="apply-not-quote"&&state.refined;
    return <div className={s.wrap}>
      <div className={s.caption}>{application?"Rule: ascending":"Local reconstruction"}</div>
      <Frame label={`Target ${state.covered?"covered":spec.words.join(", ")}. Attempt ${state.order.map(id=>spec.words[id]).join(", ")}. ${state.checked?`${matches.filter(Boolean).length} matches`:"Unchecked"}.`}>
        {compound&&<g><rect x="7" y="26" width="306" height="40" rx="9" fill="var(--bg-2)" stroke="var(--line)"/><text x="160" y="51" textAnchor="middle" fill={textColor}>who/where/when?</text></g>}
        {sourceWords.map((word,i)=><g key={i}>
          {!compound&&<><text x={54+i*106} y="18" textAnchor="middle" fill="var(--muted)">{actualLabels[i]}</text>
          <rect x={7+i*106} y="26" width="94" height="40" rx="9" fill="var(--bg-2)" stroke="var(--line)"/>
          <text x={54+i*106} y="51" textAnchor="middle" fill={textColor}>{application&&!state.checked?spec.words[[1,2,0][i]]:state.checked?word:state.covered||(spec.slug==="note-gap-check"&&state.refined&&i===1)?"?":word}</text></>}
          <path d={`M${54+i*106} 70 v10`} stroke="var(--line)"/>
          <rect x={7+i*106} y="84" width="94" height="42" rx="9" fill="var(--bg-2)" stroke={state.checked?(matches[i]?"var(--good)":"var(--bad)"):"var(--domain)"} strokeWidth="2"/>
          <text x={54+i*106} y="111" textAnchor="middle" fill={textColor}>{state.order.map(id=>sourceWords[id])[i]}</text>
        </g>)}
      </Frame>
      <div className={s.results}><Result label="Match" value={state.checked?`${matches.filter(Boolean).length}/3`:"?"}/></div>
      <div className={s.controls}>
        {needsRefinement&&<Control disabled={locked||state.refined} onClick={()=>setState(p=>({...p,refined:true,checked:false}))}>{refinement[spec.slug]}</Control>}
        <Control disabled={locked||state.covered||(needsRefinement&&!state.refined)} onClick={()=>{setState(p=>({...p,covered:true}));reach("first-observation");}}>Cover</Control>
        <Control disabled={locked||!state.covered} onClick={()=>setState(p=>({...p,order:swapPositions(p.order,0,1),checked:false}))}>Swap 1↔2</Control>
        <Control disabled={locked||!state.covered} onClick={()=>setState(p=>({...p,order:swapPositions(p.order,1,2),checked:false}))}>Swap 2↔3</Control>
        <Control disabled={locked||!state.covered||state.checked} onClick={()=>{setState(p=>({...p,checked:true}));reach("key-comparison");}}>Check</Control>
      </div>
    </div>;
  }
  if(spec.family==="files") return <FileStage spec={spec} state={state} locked={locked} step={step}/>;
  if(spec.family==="message") return <div className={s.wrap}>
    <div className={s.caption}>Exercise checklist</div>
    <Frame label={`Note fields ${spec.fields.map((f,i)=>`${f}: ${i<=state.step?spec.words[i]:"missing"}`).join("; ")}`}>
      {spec.fields.map((field,i)=><g key={field}>
        <rect x="10" y={6+i*43} width="300" height="36" rx="6" fill="var(--bg-2)" stroke={i<=state.step?"var(--domain)":"var(--line)"}/>
        <text x="24" y={29+i*43} fill="var(--muted)">{field}</text>
        <text x="294" y={29+i*43} textAnchor="end" fill={textColor}>{i<=state.step?spec.words[i]:"?"}</text>
      </g>)}
    </Frame>
    <div className={s.results}><Result label="Fields" value={`${state.step+1}/3`}/></div>
    <div className={s.controls}>
      <Control disabled={locked||state.step>=1} onClick={()=>step(1)}>Add {spec.fields[1]}</Control>
      <Control disabled={locked||state.step!==1} onClick={()=>step(2)}>Add {spec.fields[2]}</Control>
    </div>
  </div>;
  const v=editResult(spec,state.step);
  return <div className={s.wrap}>
    <div className={s.caption}>Local editor</div>
    <Frame label={`Document tokens ${v.tokens.join(", ")}; step ${state.step}. ${v.focus?`Focus ${v.focus}, selection ${v.selection}`:""}`}>
      {v.tokens.map((word,i)=><g key={`${i}-${word}`}>
        <rect x={10+(i%3)*104} y={15+Math.floor(i/3)*55} width="96" height="43" rx="6" fill={i===v.highlight|| (spec.slug==="preview-replace-all"&&state.step===1&&word==="red")?"var(--domain)":"var(--bg-2)"} stroke={textColor} strokeWidth={spec.slug==="selection-not-focus"&&word.endsWith(v.selection)?3:1}/>
        <text x={58+(i%3)*104} y={42+Math.floor(i/3)*55} textAnchor="middle" fill={textColor} fontSize={14*v.scale} fontWeight={word==="BOLD"?700:400}>{word}</text>
      </g>)}
      {v.focus&&<line x1={v.focus==="right"?114:10} x2={v.focus==="right"?210:106} y1="63" y2="63" stroke="var(--domain)" strokeWidth="4"/>}
    </Frame>
    <div className={s.results}><Result label={v.focus?"Focus":v.scale!==1?"Zoom":"Tokens"} value={v.focus|| (v.scale!==1?`${Math.round(v.scale*100)}%`:v.tokens.length)}/></div>
    <div className={s.controls}>
      <Control disabled={locked||state.step>=1} onClick={()=>step(1)}>{spec.button}</Control>
      <Control disabled={locked||state.step!==1} onClick={()=>step(2)}>{spec.button2}</Control>
    </div>
  </div>;
}

function FileStage({spec,state,locked,step}:{spec:FilesSpec;state:State;locked:boolean;step:(n:number)=>void}) {
  const v=fileResult(spec,state.step);
  // Preserve nonmatching records as faded rows: the learner can inspect exclusions, not just a magic count.
  const candidates=spec.items.map((item,i)=> {
    const transformed=v.rows.find(r=>r.name===item.name&&r.value===item.value);
    return {item,index:i,selected:Boolean(transformed)};
  });
  const transforms=["dateNames","versions","prefix","extension","paths","sort"];
  const showRows=transforms.includes(spec.operation)?v.rows:candidates.map(c=>c.item);
  return <div className={s.wrap}>
    <div className={s.caption}>{spec.operation==="date"?"C=created M=modified":"Exercise records"}</div>
    <Frame label={`${v.caption}: ${v.count}. ${v.rows.map(r=>`${r.name}: ${r.value}`).join("; ")}.`}>
      {showRows.map((item,i)=> {
        const selected=transforms.includes(spec.operation)||v.rows.some(r=>r.name===item.name&&r.value===item.value);
        return <g key={i} opacity={!state.step||selected?1:.33}>
          <rect x="6" y={7+i*32} width="308" height="28" rx="5" fill="var(--bg-2)" stroke={selected&&state.step?"var(--domain)":"var(--line)"}/>
          <path d={`M12 ${13+i*32} h7 l3 3 v12 h-10 Z`} fill="none" stroke={textColor}/>
          <text x="28" y={25+i*32} fill={textColor} className={s.fileName}>{item.name}</text>
          <text x="306" y={25+i*32} textAnchor="end" fill="var(--muted)" className={s.fileValue}>{item.value}</text>
        </g>;
      })}
    </Frame>
    <div className={s.results}><Result label={v.caption} value={state.step?v.count:"?"}/></div>
    <div className={s.controls}>
      <Control disabled={locked||state.step>=1} onClick={()=>step(1)}>{spec.button}</Control>
      <Control disabled={locked||state.step!==1} onClick={()=>step(2)}>{spec.button2}</Control>
    </div>
  </div>;
}
