import {lessonData} from './data';
export const mechanism="Inspect two different earlier arrangements, then a later attributed national notification; no fabricated 1918 two-city table.";
export const RECORDS=lessonData.documents;
export type Snapshot=typeof RECORDS[number];
export type DocumentId=Snapshot['id'];
export type State={focus:DocumentId|null;columns:Partial<Record<DocumentId,Snapshot>>;earned:DocumentId[]};
export type Action={type:'select';id:DocumentId;record?:Snapshot}|{type:'reset'}|{type:'restart'};
export const initialState=():State=>({focus:null,columns:{},earned:[]});
export function complete(r:Snapshot){const expected=RECORDS.find(d=>d.id===r.id);return !!expected&&JSON.stringify(r)===JSON.stringify(expected);}
export function transition(state:State,action:Action):State{if(action.type==='restart')return initialState();if(action.type==='reset')return {...state,focus:null};const expected=RECORDS.find(d=>d.id===action.id);if(!expected)throw Error('Unknown record');const record=action.record??expected;if(record.id!==action.id||!complete(record))return state;return {focus:action.id,columns:{...state.columns,[action.id]:structuredClone(record)},earned:state.earned.includes(action.id)?state.earned:[...state.earned,action.id]};}
export const visibleColumns=(state:State,locked:boolean)=>locked?{}:state.columns;
export const ready=(state:State)=>RECORDS.every(d=>state.earned.includes(d.id)&&!!state.columns[d.id]&&complete(state.columns[d.id]!));
