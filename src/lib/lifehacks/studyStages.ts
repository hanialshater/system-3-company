/**
 * TP-4 and TP-5 reveal sentences for the v1 schedule and queue stages (company/decisions/2026-10-15-lifehacks-r11-fix-plan.md).
 * Moved unchanged out of src/components/lifehacks/StudyLesson.tsx so they can be unit tested
 * (readiness record company/engineering/readiness/2026-10-15-lifehacks-study-tp3-tp4-tp5.md, condition 1).
 * Pure and deterministic: no randomness, no rendering imports.
 */
import { calendarClashes } from "./engine-v2";
import { calendarResult, freeGaps, queueResult, scheduleLayout, type OrderSpec, type ScheduleSpec } from "./studyModels";

export const dueRowOf=(spec:ScheduleSpec)=>spec.dueRow??(["work-back-from-a-deadline","arrival-is-not-departure"].includes(spec.slug)?0:-1);
export const plural=(n:number,one:string,many:string)=>`${n} ${n===1?one:many}`;
export const cap=(t:string)=>t.charAt(0).toUpperCase()+t.slice(1);
/** TP-4: the reveal reads the final layout. An overlap is named with its minutes and never reported as a normal finish. */
export function scheduleObservation(spec:ScheduleSpec,starts:readonly number[],long=false):string {
  const rows=scheduleLayout(spec,starts,long);
  const dueRow=dueRowOf(spec);
  const v=calendarResult(rows,spec.deadline,dueRow);
  const out:string[]=[];
  if(long&&spec.longer) out.push(`${cap(rows[spec.longer.row].label)} is drawn at its long end, ${rows[spec.longer.row].duration} minutes.`);
  if(spec.window!==undefined) {
    const g=freeGaps(rows,spec.window,spec.movable);
    out.push(`Before minute ${spec.window} there are ${g.total} free minutes in ${plural(g.gaps.length,"gap","gaps")}, and the longest gap is ${g.longest} minutes.`);
  }
  if(v.conflict) {
    const clashes=calendarClashes(rows).map(c=>`${c.a} with ${c.b}`).join(", ");
    out.push(`Your final layout overlaps for ${v.conflict} minutes (${clashes}). One person cannot do both at once, so this plan has no valid finish.`);
  } else if(dueRow>=0) {
    const f=rows[dueRow].start+rows[dueRow].duration;
    if(spec.chain) out.push(`Starting ${rows[0].label} at minute ${rows[0].start}, ${rows[dueRow].label} finishes at minute ${f}; it is due at minute ${spec.deadline}${v.spill?`, so it is ${v.spill} minutes late`:", so it is on time"}.`);
    else out.push(`Your final layout has no overlap. ${rows[dueRow].label} finishes at minute ${f} and is due at minute ${spec.deadline}${v.spill?`, so it is ${v.spill} minutes late`:", so it is on time"}.`);
  } else out.push(`Your final layout has no overlap, and everything is done by minute ${v.finish}.`);
  if(spec.claimed&&!v.conflict) out.push(`The ${spec.claimed.label.toLowerCase()} said minute ${spec.claimed.minute}: ${v.finish-spec.claimed.minute} minutes too early.`);
  return out.join(" ");
}
/** TP-5: total waiting is defined in words; when the right order waits longer, the reveal says what the goal is instead. */
export function queueObservation(spec:OrderSpec,order:readonly number[]):string {
  const v=queueResult(spec,order), names=(o:readonly number[])=>o.map(i=>spec.labels[i]).join(" → ");
  const deps=Object.keys(spec.dependencies).length>0;
  let text=`Your order ${names(order)}: total waiting ${v.waiting} minutes, ${plural(v.late,"late job","late jobs")}`;
  if(spec.switchCost) text+=`, ${plural(v.switches,"switch","switches")} (${spec.switchCost} minutes each)`;
  if(deps) text+=`, ${plural(v.breaches,"job","jobs")} run before the job ${v.breaches===1?"it needs":"they need"}`;
  const watched=(o:readonly number[])=>spec.watch===undefined?0:queueResult(spec,o).ends[o.indexOf(spec.watch)];
  if(spec.watch!==undefined) text+=`; ${spec.labels[spec.watch]} done at minute ${watched(order)}`;
  text+=".";
  const base=queueResult(spec,spec.initial);
  const atTarget=order.every((id,i)=>id===spec.target[i]);
  if(atTarget&&spec.metric!=="waiting"&&v.waiting>base.waiting) text+=` That is ${v.waiting-base.waiting} more minutes of waiting than ${names(spec.initial)}, but the goal here is ${spec.metric==="dependency"?"running each job after the job it needs":spec.metric==="switches"?"fewer switches":spec.metric==="release"&&spec.watch!==undefined?`${spec.labels[spec.watch]} done sooner (minute ${watched(order)}, not ${watched(spec.initial)})`:"no late jobs"}, not the least waiting.`;
  return text;
}
