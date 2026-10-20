// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const caps=new Set(mode?['ReadPublic','WriteDraft']:['ReadPublic','WriteDraft','ReadSecret','Export','DeleteDraft']);let draft:string|null='keep',bound:number|null=null,out:number|null=null;const trace:string[]=[];for(const action of['ReadSecret','Export','DeleteDraft']){const ok=caps.has(action);trace.push(`${action}:${ok?'yes':'deny'}`);if(!ok)continue;if(action==='ReadSecret')bound=42;if(action==='Export')out=bound;if(action==='DeleteDraft')draft=null;}const attackDraft=draft,legit=caps.has('ReadPublic')&&caps.has('WriteDraft')?'7':draft;if(mode===2&&caps.has('WriteDraft'))draft='corrupt';return{values:[Number(out!==null),Number(attackDraft===null),Number(legit==='7'),Number(draft==='corrupt')],rows:[trace.slice(0,2).join(' · '),trace[2]+` · outbox=${out??'empty'}`,`attack-draft=${attackDraft??'deleted'}; legitimate-draft=${legit}`,`write-misuse=${mode===2?draft:'unrequested'} · mock`],receipt:`${['broad','restricted','misuse'][mode]} out=${out??'∅'} draft=${draft??'∅'}`};
}
