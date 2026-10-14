/** Pure, deterministic exercise rules. Fixtures are assumptions, never personal forecasts. */
import type { StudyV2Fields } from "./engine-v2";
export type StudyFamily = "spacing" | "recall" | "schedule" | "order" | "files" | "message" | "edit";
/** v2 fields (engine-v2.ts) are optional; a spec without `engine: 2` renders as v1. */
interface Base extends StudyV2Fields {
  family: StudyFamily; slug: string; title: string; hook: string; objective: string;
  question: string; options: string[]; answer: number; principle: string;
  boundary: string; source: string; misconception: string;
}
export interface CalendarRow { label: string; start: number; duration: number; parts?: Array<{ label: string; minutes: number }> }
export interface FileItem { name: string; value: string; [key: string]: string | number | boolean }
export interface SpacingSpec extends Base { family: "spacing"; days: number[] }
export interface RecallSpec extends Base { family: "recall"; labels: string[]; words: string[]; kind: string; candidates?: { a: number; b: number }; rowLabels?: [string, string]; hideTarget?: boolean }
export interface ScheduleSpec extends Base { family: "schedule"; rows: CalendarRow[]; target: number[]; movable: number; button?: string; deadline: number; event?: { row: number; minutes: number; label: string } }
export interface OrderSpec extends Base { family: "order"; labels: string[]; durations: number[]; due: number[]; target: number[]; initial: number[]; metric: string; dependencies: Record<string, number>; tags: string[]; switchCost: number }
export interface FilesSpec extends Base { family: "files"; items: FileItem[]; operation: string; button: string; button2: string; field?: string; field2?: string; value?: string | number; value2?: string }
export interface MessageSpec extends Base { family: "message"; labels: string[]; words: string[]; fields: string[]; aFields?: number }
export interface EditSpec extends Base { family: "edit"; before: string[]; step1: string[]; step2: string[]; button: string; button2: string }
export type StudySpec = SpacingSpec | RecallSpec | ScheduleSpec | OrderSpec | FilesSpec | MessageSpec | EditSpec;

/** Duration during which at least two blocks occupy this one resource; touching endpoints do not conflict. */
export function calendarResult(rows: readonly CalendarRow[], deadline: number, dueRow = -1) {
  const edges = [...new Set(rows.flatMap(r => [r.start, r.start + r.duration]))].sort((a,b) => a-b);
  let conflict = 0;
  for (let i=0; i<edges.length-1; i++) {
    const start=edges[i], end=edges[i+1];
    if (rows.filter(r => r.start < end && r.start+r.duration > start).length > 1) conflict += end-start;
  }
  const finish = Math.max(0,...rows.map(r => r.start+r.duration));
  const dueFinish = dueRow >= 0 ? rows[dueRow].start+rows[dueRow].duration : finish;
  return { conflict, finish, spill: Math.max(0,dueFinish-deadline) };
}
export function queueResult(spec: OrderSpec, order: readonly number[], roundRobin = false) {
  if(roundRobin) return roundRobinQueue(spec,order,5);
  let time=0, waiting=0, switches=0, late=0;
  const starts: number[] = [], ends: number[] = [], segments: {id:number;start:number;end:number}[] = [];
  order.forEach((id,i) => {
    if (i && spec.tags[id] !== spec.tags[order[i-1]]) { switches++; time += spec.switchCost; }
    starts.push(time); waiting += time; const start=time; time += spec.durations[id]; ends.push(time);segments.push({id,start,end:time});
    if (time>spec.due[id]) late++;
  });
  const breaches = order.filter(id => spec.dependencies[String(id)] !== undefined && order.indexOf(spec.dependencies[String(id)]) > order.indexOf(id)).length;
  return { time, waiting, switches, late, breaches, starts, ends, segments, firstFinish: Math.min(...ends) };
}
/** Every ready task receives one quantum before any receives its next; no switching overhead here. */
export function roundRobinQueue(spec: OrderSpec, order: readonly number[], quantum: number) {
  if(quantum<=0) throw new RangeError("quantum must be positive");
  const left=spec.durations.map(n=>n), starts=order.map(()=>-1), ends=order.map(()=>-1);
  const segments: {id:number;start:number;end:number}[]=[];let time=0;
  while(order.some(id=>left[id]>0)) {
    order.forEach((id,index)=> {
      if(left[id]<=0)return;
      if(starts[index]<0) starts[index]=time;
      const duration=Math.min(quantum,left[id]);segments.push({id,start:time,end:time+duration});
      time+=duration;left[id]-=duration;if(left[id]===0)ends[index]=time;
    });
  }
  return {time,waiting:ends.reduce((sum,end,i)=>sum+end-spec.durations[order[i]],0),switches:0,late:ends.filter((end,i)=>end>spec.due[order[i]]).length,breaches:0,starts,ends,segments,firstFinish:Math.min(...ends)};
}
export function swapPositions(order: readonly number[], a: number, b: number) {
  const next=[...order]; [next[a],next[b]]=[next[b],next[a]]; return next;
}
export function reconstructionMatches(words: readonly string[], order: readonly number[]) {
  return order.map((id,index) => words[id]===words[index]);
}
export function illustrativeMemory(day: number) {
  // Deliberately chosen decay constants, no fit and no personal prediction.
  return { cram: Math.exp(-day/7), spaced: Math.exp(-day/18) };
}

export interface FileResult { rows: FileItem[]; count: number; caption: string }
export function fileResult(spec: FilesSpec, step: number): FileResult {
  const original=spec.items.map(r => ({...r}));
  if (!step) return {rows:original,count:original.length,caption:"Records"};
  let rows=original; let caption="Matches";
  const first=step===1;
  const is = (r: FileItem,field: string | undefined,value: string | number | undefined) => field!==undefined && r[field]===value;
  switch(spec.operation) {
    case "filter": rows=rows.filter(r => is(r,spec.field,spec.value) && (first || is(r,spec.field2,spec.value2))); break;
    case "phrase": { const words=String(spec.value).split(" "); rows=rows.filter(r => first ? words.every(w => r.value.includes(w)) : r.value.includes(String(spec.value))); break; }
    case "exclude": rows=rows.filter(r => r.value.includes(String(spec.value)) && (first || !r.value.includes(String(spec.value2)))); break;
    case "date": rows=rows.filter(r => Number(r[first ? spec.field! : spec.field2!])>=Number(spec.value)); break;
    case "dateNames": rows=rows.map(r => ({...r,name:first?r.name:r.value})).sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0); caption="Order"; break;
    case "versions": rows=rows.map(r => ({...r,name:first?r.name:`v${r.value}`})).sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0); caption="Order"; break;
    case "prefix": rows=rows.map(r => ({...r,name:first?r.name:`${r.value}-${r.name}`})); caption="Unique names"; break;
    case "extension": rows=rows.map(r => ({...r,name:first?r.name.split(".")[0]:r.name})); caption="Unique names"; break;
    case "identity": caption=first?"Links":"Identities"; break;
    case "duplicates": caption=first?"Name groups":"Content groups"; break;
    case "paths": rows=rows.map(r=>({...r,name:first?r.name:r.name.replace("/old/","/"),value:String((first?r.name:r.name.replace("/old/","/")).split("/").length)}));caption="Total levels";break;
    case "sort": rows=rows.sort((a,b)=>Number(b[first?spec.field!:spec.field2!])-Number(a[first?spec.field!:spec.field2!]));caption="Order";break;
    case "trash": rows=rows.filter(r=>!first || !r.deleted);break;
    case "body": rows=rows.filter(r=>(first?r.name:r.value).includes(String(spec.value)));break;
    case "boolean": rows=rows.filter(r=>first?(is(r,spec.field,spec.value)||is(r,spec.field2,spec.value2)):(is(r,spec.field,spec.value)&&is(r,spec.field2,spec.value2)));break;
  }
  let count=rows.length;
  if (["prefix","extension"].includes(spec.operation)) count=new Set(rows.map(r=>r.name)).size;
  if(spec.operation==="identity" && !first) count=new Set(rows.map(r=>r.name)).size;
  if(spec.operation==="duplicates") count=new Set(rows.map(r=>first?r.name:r.value)).size;
  if(spec.operation==="paths") count=rows.reduce((sum,r)=>sum+Number(r.value),0);
  return {rows,count,caption};
}

export function editResult(spec: EditSpec,step: number) {
  const tokens=step===0?spec.before:step===1?spec.step1:spec.step2;
  let highlight=-1, scale=1, focus="", selection="";
  if(spec.slug==="find-next-is-navigation") highlight=step===1?0:step===2?2:-1;
  if(spec.slug==="preview-replace-all" && step===1) highlight=0;
  if(spec.slug==="zoom-does-not-rewrite") scale=step===1?1.5:step===2?0.8:1;
  if(spec.slug==="selection-not-focus") {focus=step>0?"right":"left";selection=step===2?"B":"A";}
  return {tokens,highlight,scale,focus,selection};
}
