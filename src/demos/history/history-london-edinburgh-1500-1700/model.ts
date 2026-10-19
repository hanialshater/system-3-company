export type Year = 1603 | 1707;
export type Field<T> = {status:'known'; value:T; claimId:string; sourceItem:string; locator:string} | {status:'unknown'; reason:string};
export type RecordSnapshot = {id:string;year:Year;precision:string;monarch:Field<'Shared'>;parliaments:Field<readonly {id:string;label:string}[]>};
const prefix='history.history-london-edinburgh-1500-1700.';
export const RECORDS:Record<Year,RecordSnapshot>={
  1603:{id:'london1603-institutions-v1',year:1603,precision:'year',monarch:{status:'known',value:'Shared',claimId:prefix+'c1',sourceItem:'london-1603-account',locator:'Union of the Crowns body, shared-monarch paragraph; acquisition lines155'},parliaments:{status:'known',value:[{id:'parliament-england',label:'Parliament of England'},{id:'parliament-scotland',label:'Parliament of Scotland'}],claimId:prefix+'c2',sourceItem:'london-1603-account',locator:'body paragraphs155,163–166; named-label support remains unverified'}},
  1707:{id:'london1707-institutions-v1',year:1707,precision:'from 1 May 1707',monarch:{status:'known',value:'Shared',claimId:prefix+'c3',sourceItem:'london-1707-articles',locator:'PDF index0, ArticleII lines10–25: succession to the monarchy of the united kingdom; ArticleI lines4–9 supplies effective scope'},parliaments:{status:'known',value:[{id:'parliament-great-britain',label:'Parliament of Great Britain'}],claimId:prefix+'c4',sourceItem:'london-1707-articles',locator:'PDF index0, ArticleIII lines26–27'}},
};
export type State={focus:Year|null;columns:Partial<Record<Year,RecordSnapshot>>;earned:Year[]};
export type Action={type:'select';year:Year;record?:RecordSnapshot}|{type:'reset'}|{type:'restart'};
export const initialState=():State=>({focus:null,columns:{},earned:[]});
export function complete(r:RecordSnapshot){return r.monarch.status==='known'&&r.parliaments.status==='known'&&r.parliaments.value.length>0;}
export function transition(state:State,action:Action):State {
  if(action.type==='restart')return initialState();
  if(action.type==='reset')return {...state,focus:null};
  const r=action.record??RECORDS[action.year];
  if(r.year!==action.year)throw new Error('Record date does not match selected date');
  // Copy the fixture into earned evidence; a later focus/reset never erases it.
  const snapshot=structuredClone(r);
  return {focus:action.year,columns:{...state.columns,[action.year]:snapshot},earned:complete(snapshot)&&!state.earned.includes(action.year)?[...state.earned,action.year]:state.earned};
}
export function visibleColumns(state:State,locked:boolean){return locked?{}:state.columns;}
export function ready(state:State){return ([1603,1707] as Year[]).every(y=>state.earned.includes(y)&&state.columns[y]&&complete(state.columns[y]!));}
