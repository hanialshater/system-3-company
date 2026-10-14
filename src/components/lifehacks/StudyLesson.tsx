"use client";

import { useId, useState, type Dispatch, type SetStateAction } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import { StageControl, StageStatus, resultText } from "./a11y";
import { useMilestones } from "@/kit/milestones";
import { calendarResult, queueResult, fileResult, editResult, illustrativeMemory, reconstructionMatches, swapPositions, type StudySpec, type FilesSpec } from "@/lib/lifehacks/studyModels";
import { StudyLessonV2 } from "./StudyLessonV2";
import s from "./StudyLesson.module.css";

interface State {
  step: number; starts: number[]; order: number[]; covered: boolean; checked: boolean; rearranged: boolean;
  refined: boolean; day: number; morning: boolean; month: boolean; mode: "A" | "B" | "both";
}
const milestones = ["first-observation", "key-comparison"] as const;
const textColor = "var(--fg)";

function initialState(spec: StudySpec): State {
  return {step:0,starts:spec.family==="schedule"?spec.rows.map(r=>r.start):[],order:spec.family==="order"?spec.initial:[2,0,1],covered:false,checked:false,rearranged:false,refined:false,day:0,morning:false,month:false,mode:"both"};
}
function Result({label,value}:{label:string;value:string|number}) {
  return <span className={s.result}><span>{label}</span><strong>{value}</strong></span>;
}
/** Result chips plus the stage's one polite status region (W-558). */
function Results({locked,items,lead=""}:{locked:boolean;items:Array<[string,string|number]>;lead?:string}) {
  return <><div className={s.results}>{items.map(([label,value])=><Result key={label} label={label} value={value}/>)}</div><StageStatus locked={locked} text={[lead,resultText(items)].filter(Boolean).join(". ")}/></>;
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
    if(spec.slug==="work-in-process-limit") return `In order ${state.order.map(i=>spec.labels[i]).join(" → ")}, your ${roundRobin?"five-minute-turn":"whole-job"} schedule first completes a task at minute ${v.firstFinish}. All jobs together still require ${v.time} minutes of execution. Starting and finishing are different events.`;
    return `Your order ${state.order.map(i=>spec.labels[i]).join(" → ")} gives ${v.waiting} total waiting minutes, ${v.late} late jobs and ${v.breaches} prerequisite breaches. ${spec.switchCost?`Each context change adds ${spec.switchCost} minutes.`:"All jobs are ready except for the stated prerequisites."}`;
  }
  if(spec.family==="recall") {
    const matched=reconstructionMatches(spec.words,state.order);
    if(spec.slug==="apply-not-quote") return `Your ordering ${state.order.map(i=>spec.words[i]).join(" → ")} matches ${matched.filter(Boolean).length} of ${spec.words.length} ascending positions. The input values stayed visible while you applied the rule; this was not a memory test.`;
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
  // FC LH-1 preview-replace-all.c3: both "red" tokens are highlighted at step 1, not only position 1.
  if(spec.slug==="preview-replace-all"&&state.step===1) return `The local editor now contains ${v.tokens.join(" · ")}. The preview marks 2 exact matches, at positions 1 and 3; previewing did not rewrite the tokens.`;
  return `The local editor now contains ${v.tokens.join(" · ")}. ${v.highlight>=0?`The highlighted position is ${v.highlight+1}; finding did not rewrite the tokens.`:v.focus?`Focus is ${v.focus}; selection is ${v.selection}.`:v.scale!==1?`View scale is ${v.scale}; the stored words stay the same.`:"These are the displayed results of the two named commands."}`;
}

/** Engines v2 (W-608): a spec with `engine: 2` gets the v2 stage; every other lesson renders the v1 stage below, unchanged. */
export function StudyLesson({slug,spec}:{slug:string;spec:StudySpec}) {
  return spec.engine===2?<StudyLessonV2 slug={slug} spec={spec}/>:<StudyLessonV1 slug={slug} spec={spec}/>;
}

function StudyLessonV1({slug,spec}:{slug:string;spec:StudySpec}) {
  const [state,setState]=useState<State>(()=>initialState(spec));
  return <Lesson
    slug={slug}
    predict={{question:spec.question,options:spec.options,answer:spec.answer}}
    minInteractions={2}
    exploreHint={spec.slug==="apply-not-quote"?"Try the visible values. Rearrange them into ascending order, then check.":spec.family==="recall"?"Cover the target, reconstruct it, then check the positions.":spec.family==="spacing"?"Visit both test markers, then compare the two calendars.":"Try both labelled operations; inspect what changes in the fixture."}
    reveal={()=> <><p>{observation(spec,state)}</p><p>{spec.principle}</p></>}
  >
    {({locked,interact})=> <Stage spec={spec} state={state} setState={setState} locked={locked} interact={interact}/>}
  </Lesson>;
}

function Stage({spec,state,setState,locked,interact}:{spec:StudySpec;state:State;setState:Dispatch<SetStateAction<State>>;locked:boolean;interact:()=>void}) {
  const {reach}=useMilestones(interact,milestones);
  // W-561: highlighted bars carry a hatch as well as the domain fill, so the cue is not colour alone.
  const hatch=`lh-hatch-${useId().replace(/[^a-zA-Z0-9_-]/g,"")}`;
  const hatchDefs=<defs><pattern id={hatch} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke={textColor} strokeWidth="1.5" strokeOpacity=".6"/></pattern></defs>;
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
      <Frame label={locked
        ? "Stipulated calendars: A studies three hours on day zero. B starts with recall and studies one hour on each of days minus two, minus one, and zero. Recall illustration hidden until prediction."
        : `Illustrative curves at day ${state.day}, view ${state.mode}. A: ${Math.round(values.cram*100)} percent; B: ${Math.round(values.spaced*100)} percent. Chosen decay constants, not measured memory.`}>
        <path d="M28 58 V118 H302" fill="none" stroke="var(--line)"/>
        {!locked&&state.mode!=="B"&&<path d={line(7)} stroke="var(--lh-ink)" strokeWidth="3" fill="none"/>}
        {!locked&&state.mode!=="A"&&<path d={line(18)} stroke="var(--good)" strokeWidth="3" strokeDasharray="5 3" fill="none"/>}
        {!locked&&<line x1={28+state.day*9} x2={28+state.day*9} y1="58" y2="118" stroke={textColor} strokeWidth="2"/>}
        <text x="4" y="16" fill={textColor}>A:3h@0</text>
        {/* W-561: key each row to its curve style and point shape (A solid + circle, B dashed + square). */}
        <path d="M56 11h28" stroke="var(--lh-ink)" strokeWidth="3"/><circle cx="70" cy="11" r="4" fill="var(--domain)" stroke={textColor}/>
        <rect x="236" y="4" width="60" height="14" rx="3" fill="var(--domain)" stroke="var(--lh-ink)"/>
        <text x="4" y="38" fill={textColor}>B:recall→1h</text>
        <path d="M78 33h24" stroke="var(--good)" strokeWidth="3" strokeDasharray="5 3"/><rect x="86" y="29" width="8" height="8" fill="var(--good)" stroke={textColor}/>
        {spec.days.map((d,i)=><g key={d}><rect x={106+i*65} y="26" width="20" height="14" rx="3" fill="var(--good)"/><text x={116+i*65} y="53" textAnchor="middle" fill={textColor}>{d}d</text></g>)}
        <text x="2" y="65" fill={textColor}>100%</text><text x="2" y="120" fill={textColor}>0%</text><text x="298" y="136" textAnchor="end" fill={textColor}>30d</text>
        {!locked&&[state.morning?1:null,state.month?30:null].filter((d): d is number=>d!==null).map(d=><g key={d}>
          {state.mode!=="B"&&<circle cx={28+d*9} cy={118-illustrativeMemory(d).cram*54} r="4" fill="var(--domain)" stroke={textColor}/>}
          {state.mode!=="A"&&<rect x={24+d*9} y={114-illustrativeMemory(d).spaced*54} width="8" height="8" fill="var(--good)" stroke={textColor}/>}
        </g>)}
      </Frame>
      <Results locked={locked} items={[["A",locked?"?":`${Math.round(values.cram*100)}%`],["B",locked?"?":`${Math.round(values.spaced*100)}%`]]}/>
      <div className={s.controls}>
        <StageControl locked={locked} inactive={state.day===1} onClick={()=>{setState(p=>({...p,day:1,morning:true}));reach("first-observation");}}>Next morning</StageControl>
        <StageControl locked={locked} inactive={state.day===30} onClick={()=>{setState(p=>({...p,day:30,month:true}));reach("key-comparison");}}>One month</StageControl>
      </div>
      <Slider label="Day" min={0} max={30} value={state.day} disabled={locked} onChange={day=>setState(p=>({...p,day}))}/>
      <div className={s.controls}>
        <StageControl locked={locked} inactive={state.mode==="A"} onClick={()=>setState(p=>({...p,mode:"A"}))}>A</StageControl>
        <StageControl locked={locked} inactive={state.mode==="B"} onClick={()=>setState(p=>({...p,mode:"B"}))}>B</StageControl>
        <StageControl locked={locked} inactive={(state.mode==="both"&&state.day===30)} onClick={()=>setState(p=>({...p,mode:"both",day:30}))}>Month: both</StageControl>
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
      <Frame label={`One-person calendar. ${rows.map(r=>`${r.label} starts ${r.start} lasts ${r.duration} minutes`).join("; ")}. ${state.step&&!locked?`${values.conflict} overlap minutes; ${dueRow>=0?`first task finishes at minute ${rows[0].start+rows[0].duration}, due at minute ${spec.deadline}`:`last finish at minute ${values.finish}`}.`:"Results not yet tested."}`}>
        {hatchDefs}
        {rows.map((r,i)=><g key={r.label}>
          <text x="2" y={32+i*36} fill={textColor} className={s.rowLabel}>{r.label}</text>
          <rect x={x(r.start)} y={15+i*36} width={r.duration/limit*220} height="19" rx="4" fill={i===spec.movable?"var(--domain)":"var(--line)"} stroke={textColor}/>
          {i===spec.movable&&<rect x={x(r.start)} y={15+i*36} width={r.duration/limit*220} height="19" rx="4" fill={`url(#${hatch})`} stroke={textColor} strokeWidth="2"/>}
          <text x={x(r.start)} y={46+i*36} fill={textColor}>{r.start}–{r.start+r.duration}</text>
        </g>)}
        <text x="82" y="140" fill={textColor}>0</text><text x="302" y="140" textAnchor="end" fill={textColor}>100</text>
        {dueRow>=0&&<line x1={x(spec.deadline)} x2={x(spec.deadline)} y1="8" y2="34" stroke="var(--bad)" strokeWidth="2"/>}
      </Frame>
      <Results locked={locked} items={[["Overlap",state.step?`${values.conflict}m`:"?"],[dueRow>=0?`Due${spec.deadline}`:"Finish",state.step?`${dueRow>=0?rows[0].start+rows[0].duration:values.finish}m`:"?"]]}/>
      <div className={s.controls}>
        <StageControl locked={locked} inactive={state.step>0} onClick={()=>step(1)}>Test plan</StageControl>
        <StageControl locked={locked} inactive={!state.step||moved} onClick={()=>{setState(p=>({...p,step:2,starts:[...spec.target]}));reach("key-comparison");}}>{spec.button}</StageControl>
      </div>
      <Slider label="Start" value={state.starts[spec.movable]} min={0} max={70} disabled={locked||!state.step} format={v=>`${v}m`} onChange={v=>setState(p=>({...p,starts:p.starts.map((n,i)=>i===spec.movable?v:n)}))}/>
    </div>;
  }
  if(spec.family==="order") {
    // W-403: work-in-process-limit compares ONE order in both views; only the view toggles, never the order.
    const wip=spec.slug==="work-in-process-limit";
    const roundRobin=wip&&state.step<2;
    const v=queueResult(spec,state.order,roundRobin);
    const target=state.order.every((id,i)=>id===spec.target[i]);
    const x=(time:number)=>74+time/80*225;
    return <div className={s.wrap}>
      <div className={s.caption}>{roundRobin?"Slice=5m · duration/due":wip?"Whole jobs · duration/due":spec.switchCost?`Setup=${spec.switchCost}m/switch`:"Exercise · duration/due"}</div>
      <Frame label={`Queue order: ${state.order.map(id=>`${spec.labels[id]}, duration ${spec.durations[id]} minutes, due at minute ${spec.due[id]}${spec.dependencies[String(id)]!==undefined?`, requires ${spec.labels[spec.dependencies[String(id)]]}`:""}`).join("; ")}. ${roundRobin?"Five-minute slices.":spec.switchCost?`Each context change adds ${spec.switchCost} minutes.`:"Whole-job execution."} ${state.step&&!locked?`${spec.metric==="completion"?`First completion at minute ${v.firstFinish}`:`Total waiting ${v.waiting} minutes`}; ${v.late} late jobs; ${spec.metric==="switches"?`${v.switches} context switches`:`${v.breaches} prerequisite breaches`}.`:"Results not yet tested."}`}>
        {hatchDefs}
        {state.order.map((id,i)=><g key={id}>
          <text x="2" y={29+i*35} fill={textColor} className={s.rowLabel}>{spec.labels[id]}</text>
          {v.segments.filter(seg=>seg.id===id).map((seg,index)=><g key={index}><rect x={x(seg.start)} y={13+i*35} width={(seg.end-seg.start)/80*225} height="20" rx="4" fill={i===0?"var(--domain)":"var(--line)"} stroke={textColor}/>{i===0&&<rect x={x(seg.start)} y={13+i*35} width={(seg.end-seg.start)/80*225} height="20" rx="4" fill={`url(#${hatch})`} stroke={textColor} strokeWidth="2"/>}</g>)}
          <text x="4" y={43+i*35} fill="var(--muted)">{spec.durations[id]}m/{spec.due[id]}due{spec.dependencies[String(id)]!==undefined?`←${spec.labels[spec.dependencies[String(id)]]}`:""}</text>
          <line x1={x(spec.due[id])} x2={x(spec.due[id])} y1={10+i*35} y2={34+i*35} stroke="var(--bad)" strokeWidth="2"/>
        </g>)}
        <text x="74" y="136" fill={textColor}>0</text><text x="299" y="136" textAnchor="end" fill={textColor}>80m</text>
      </Frame>
      <Results locked={locked} items={[[spec.metric==="completion"?"First":"Wait",state.step?`${spec.metric==="completion"?v.firstFinish:v.waiting}m`:"?"],["Late",state.step?v.late:"?"],[spec.metric==="switches"?"Switches":"Prereq",state.step?(spec.metric==="switches"?v.switches:v.breaches):"?"]]}/>
      <div className={s.controls}>
        <StageControl locked={locked} inactive={state.step>0} onClick={()=>step(1)}>Run queue</StageControl>
        {wip?<>
          <StageControl locked={locked} inactive={!state.step||state.step===2} onClick={()=>step(2)}>Whole jobs</StageControl>
          <StageControl locked={locked} inactive={state.step!==2} onClick={()=>setState(p=>({...p,step:1}))}>5-min turns</StageControl>
        </>:<>
          <StageControl locked={locked} inactive={!state.step} onClick={()=>{setState(p=>({...p,step:2,order:swapPositions(p.order,0,1)}));reach("key-comparison");}}>Swap first</StageControl>
          <StageControl locked={locked} inactive={!state.step||target} onClick={()=>{setState(p=>({...p,step:2,order:[...spec.target]}));reach("key-comparison");}}>Try target</StageControl>
        </>}
      </div>
    </div>;
  }
  if(spec.family==="recall") {
    const matches=reconstructionMatches(spec.words,state.order);
    const refinement: Record<string,string> = {
      "one-question-one-card":"Split prompt", "reverse-the-flashcard":"Reverse",
      "note-gap-check":"Remove field", "apply-not-quote":"Try values", "separate-confusable-pairs":"Add digits"
    };
    const needsRefinement=Boolean(refinement[spec.slug]);
    const reverse=spec.slug==="reverse-the-flashcard"&&!state.refined;
    const sourceWords=reverse?spec.labels:spec.words;
    const sourceLabels=reverse?spec.words:spec.labels;
    const actualLabels=spec.slug==="separate-confusable-pairs"&&!state.refined?["AX","AX","AX"]:sourceLabels;
    const compound=spec.slug==="one-question-one-card"&&!state.refined;
    const isApplication=spec.slug==="apply-not-quote";
    const application=isApplication&&state.refined;
    const canRearrange=isApplication?state.refined:state.covered;
    // This same displayed text feeds both the SVG and its accessible description.
    const visibleSourceWords=sourceWords.map((word,i)=>application?spec.words[[1,2,0][i]]:state.checked?word:state.covered||(spec.slug==="note-gap-check"&&state.refined&&i===1)?"?":word);
    const sourceDescription=compound?"Compound prompt: who, where, when?":isApplication?`Input ${visibleSourceWords.join(", ")}; rule ascending`:actualLabels.map((label,i)=>`${label}: ${visibleSourceWords[i]==="?"?"covered":visibleSourceWords[i]}`).join("; ");
    return <div className={s.wrap}>
      <div className={s.caption}>{application?"Rule: ascending":"Local reconstruction"}</div>
      <Frame label={`${sourceDescription}. Attempt ${state.order.map(id=>sourceWords[id]).join(", ")}. ${state.checked&&!locked?`${matches.filter(Boolean).length} matching positions`:"Unchecked"}.`}>
        {compound&&<g><rect x="7" y="26" width="306" height="40" rx="9" fill="var(--bg-2)" stroke="var(--line)"/><text x="160" y="51" textAnchor="middle" fill={textColor}>who/where/when?</text></g>}
        {sourceWords.map((word,i)=><g key={i}>
          {!compound&&<><text x={54+i*106} y="18" textAnchor="middle" fill="var(--muted)">{actualLabels[i]}</text>
          <rect x={7+i*106} y="26" width="94" height="40" rx="9" fill="var(--bg-2)" stroke="var(--line)"/>
          <text x={54+i*106} y="51" textAnchor="middle" fill={textColor}>{visibleSourceWords[i]}</text></>}
          <path d={`M${54+i*106} 70 v10`} stroke="var(--line)"/>
          <rect x={7+i*106} y="84" width="94" height="42" rx="9" fill="var(--bg-2)" stroke={state.checked?(matches[i]?"var(--good)":"var(--bad)"):"var(--lh-ink)"} strokeWidth="2"/>
          <text x={54+i*106} y="111" textAnchor="middle" fill={textColor}>{state.order.map(id=>sourceWords[id])[i]}</text>
          {/* W-561: each checked box gets a tick or cross, not only a green or red stroke. */}
          {state.checked&&!locked&&<text x={93+i*106} y="99" textAnchor="end" fill={matches[i]?"var(--good)":"var(--bad)"} fontWeight={700} aria-hidden="true">{matches[i]?"✓":"✗"}</text>}
        </g>)}
      </Frame>
      <Results locked={locked} lead={`${sourceDescription}. Attempt ${state.order.map(id=>sourceWords[id]).join(", ")}`} items={[["Match",state.checked?`${matches.filter(Boolean).length}/3`:"?"]]}/>
      <div className={s.controls}>
        {needsRefinement&&<StageControl locked={locked} inactive={state.refined} onClick={()=>{setState(p=>({...p,refined:true,checked:false}));if(isApplication) reach("first-observation");}}>{refinement[spec.slug]}</StageControl>}
        {!isApplication&&<StageControl locked={locked} inactive={state.covered||(needsRefinement&&!state.refined)} onClick={()=>{setState(p=>({...p,covered:true}));reach("first-observation");}}>Cover</StageControl>}
        <StageControl locked={locked} inactive={!canRearrange} onClick={()=>setState(p=>({...p,order:swapPositions(p.order,0,1),checked:false,rearranged:true}))}>Swap 1↔2</StageControl>
        <StageControl locked={locked} inactive={!canRearrange} onClick={()=>setState(p=>({...p,order:swapPositions(p.order,1,2),checked:false,rearranged:true}))}>Swap 2↔3</StageControl>
        <StageControl locked={locked} inactive={!canRearrange||state.checked||(isApplication&&!state.rearranged)} onClick={()=>{setState(p=>({...p,checked:true}));reach("key-comparison");}}>Check</StageControl>
      </div>
    </div>;
  }
  if(spec.family==="files") return <FileStage spec={spec} state={state} locked={locked} step={step}/>;
  if(spec.family==="message") return <div className={s.wrap}>
    <div className={s.caption}>Exercise checklist</div>
    <Frame label={`Note fields ${spec.fields.map((f,i)=>`${f}: ${i<=state.step?spec.words[i]:"missing"}`).join("; ")}`}>
      {spec.fields.map((field,i)=><g key={field}>
        <rect x="10" y={6+i*43} width="300" height="36" rx="6" fill="var(--bg-2)" stroke={i<=state.step?"var(--lh-ink)":"var(--line)"}/>
        <text x="24" y={29+i*43} fill="var(--muted)">{field}</text>
        <text x="294" y={29+i*43} textAnchor="end" fill={textColor}>{i<=state.step?spec.words[i]:"?"}</text>
      </g>)}
    </Frame>
    <Results locked={locked} items={[["Fields",`${state.step+1}/3`]]}/>
    <div className={s.controls}>
      <StageControl locked={locked} inactive={state.step>=1} onClick={()=>step(1)}>Add {spec.fields[1]}</StageControl>
      <StageControl locked={locked} inactive={state.step!==1} onClick={()=>step(2)}>Add {spec.fields[2]}</StageControl>
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
      {v.focus&&<line x1={v.focus==="right"?114:10} x2={v.focus==="right"?210:106} y1="63" y2="63" stroke="var(--lh-ink)" strokeWidth="4"/>}
    </Frame>
    <Results locked={locked} items={[[v.focus?"Focus":v.scale!==1?"Zoom":"Tokens",v.focus|| (v.scale!==1?`${Math.round(v.scale*100)}%`:v.tokens.length)]]}/>
    <div className={s.controls}>
      <StageControl locked={locked} inactive={state.step>=1} onClick={()=>step(1)}>{spec.button}</StageControl>
      <StageControl locked={locked} inactive={state.step!==1} onClick={()=>step(2)}>{spec.button2}</StageControl>
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
    <div className={s.caption}>{spec.operation==="date"?"C=created M=modified":spec.slug==="size-is-not-recency"?"d = day modified; higher = more recent":"Exercise records"}</div>
    <Frame label={`${state.step&&!locked?`${v.caption}: ${v.count}. Current selected records` : "Exercise records; results not yet tested"}: ${v.rows.map(r=>`${r.name}: ${r.value}`).join("; ")||"none"}.`}>
      {showRows.map((item,i)=> {
        const selected=transforms.includes(spec.operation)||v.rows.some(r=>r.name===item.name&&r.value===item.value);
        return <g key={i} opacity={!state.step||selected?1:.33}>
          <rect x="6" y={7+i*32} width="308" height="28" rx="5" fill="var(--bg-2)" stroke={selected&&state.step?"var(--lh-ink)":"var(--line)"}/>
          <path d={`M12 ${13+i*32} h7 l3 3 v12 h-10 Z`} fill="none" stroke={textColor}/>
          <text x="28" y={25+i*32} fill={textColor} className={s.fileName}>{item.name}</text>
          <text x="306" y={25+i*32} textAnchor="end" fill="var(--muted)" className={s.fileValue}>{item.value}</text>
        </g>;
      })}
    </Frame>
    <Results locked={locked} items={[[v.caption,state.step?v.count:"?"]]}/>
    <div className={s.controls}>
      <StageControl locked={locked} inactive={state.step>=1} onClick={()=>step(1)}>{spec.button}</StageControl>
      <StageControl locked={locked} inactive={state.step!==1} onClick={()=>step(2)}>{spec.button2}</StageControl>
    </div>
  </div>;
}
