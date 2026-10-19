export type DateId='nov1814'|'jun1905';
export const prefix='history.history-oslo-copenhagen-1800-1920.';
export const RECORDS={
 nov1814:{id:'nov1814',milestone:'novBoth',king:'Shared with Sweden',constitution:'Revised 4 November 1814',qualifier:'',kingClaim:prefix+'c1',constitutionClaim:prefix+'c2',source:'O-NOV',kingLocator:'PDF index82/printed83 §1',constitutionLocator:'PDF index82/printed83 constitutional heading'},
 jun1905:{id:'jun1905',milestone:'juneDocument',king:'Storting declares union dissolved',constitution:'Invoked by resolution',qualifier:'Declaration, not recognition',kingClaim:prefix+'c3',constitutionClaim:prefix+'c4',source:'O-JUNE',kingLocator:'7. juni-beslutningen, final-resolution block',constitutionLocator:'final-resolution authority clause, with necessary changes'}
} as const;
export type Snapshot={id:DateId;milestone:string;king:string;constitution:string;qualifier:string;kingClaim:string;constitutionClaim:string;source:string;kingLocator:string;constitutionLocator:string};
export type State={focus:DateId|null;columns:Partial<Record<DateId,Snapshot>>;earned:string[]};
export type Action={type:'select';date:DateId;record?:Snapshot}|{type:'reset'}|{type:'restart'};
export const initialState=():State=>({focus:null,columns:{},earned:[]});
export function complete(r:Snapshot){const expected=RECORDS[r.id];return !!expected&&Object.keys(expected).every(k=>r[k as keyof Snapshot]===expected[k as keyof typeof expected]);}
export function transition(s:State,a:Action):State{if(a.type==='restart')return initialState();if(a.type==='reset')return {...s,focus:null};const r=structuredClone(a.record??RECORDS[a.date]);if(r.id!==a.date)throw Error('Date mismatch');if(!complete(r))return s;return {focus:a.date,columns:{...s.columns,[a.date]:r},earned:s.earned.includes(r.milestone)?s.earned:[...s.earned,r.milestone]};}
export const visibleColumns=(s:State,locked:boolean)=>locked?{}:s.columns;
export const ready=(s:State)=>s.earned.includes('novBoth')&&s.earned.includes('juneDocument')&&(['nov1814','jun1905'] as DateId[]).every(d=>s.columns[d]&&complete(s.columns[d]!));
