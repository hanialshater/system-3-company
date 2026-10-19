export const DOCUMENTS = [
  {
    "id": "satsuma",
    "text": "Ryukyu formally retained kingdom under Shimazu dominance; reciprocal establishments",
    "mediation": "Kagoshima prefectural Japanese institutional account; working English paraphrase",
    "requiredContext": "1609 invasion is antecedent context outside1700–1900, not a new selected-period endpoint. Account does not independently date every subsequent institutional condition.",
    "sourceUrl": "https://www.pref.kagoshima.jp/ab23/pr/gaiyou/rekishi/tyuusei/ryukyu.html",
    "locator": "indexed text42",
    "fieldAddresses": [],
    "claims": [
      "history.history-naha-kagoshima-1700-1900.c1",
      "history.history-naha-kagoshima-1700-1900.c2"
    ]
  },
  {
    "id": "royalOffice",
    "text": "Ikegusuku Anki: Sanshikan; efforts to preserve royal government",
    "mediation": "Okinawa Archives Japanese institutional account; working English paraphrase",
    "requiredContext": "Shuri government is not Naha. Naha is modern orientation only; no port/castle-location claim.",
    "sourceUrl": "https://www.archives.pref.okinawa.jp/news/that_day/4631",
    "locator": "indexed text74",
    "fieldAddresses": [],
    "claims": [
      "history.history-naha-kagoshima-1700-1900.c3",
      "history.history-naha-kagoshima-1700-1900.c4"
    ]
  },
  {
    "id": "replacement",
    "text": "1879 armed arrival and replacement with Okinawa prefecture",
    "mediation": "Okinawa Archives Japanese institutional account; working English paraphrase",
    "requiredContext": "1872 Ryukyu-han designation must load before this witness earns;27March1879 order and4April proclamation are distinct. Working English paraphrase of modern Okinawa archival account; original instruments uncollated. No uninterrupted category or continuous control inferred.",
    "sourceUrl": "https://www.archives.pref.okinawa.jp/news/that_day/4631",
    "locator": "indexed text68–70",
    "fieldAddresses": [
      "v2.replacement.intermediate1872",
      "v2.replacement.order1879"
    ],
    "claims": [
      "history.history-naha-kagoshima-1700-1900.c5",
      "history.history-naha-kagoshima-1700-1900.c6",
      "history.history-naha-kagoshima-1700-1900.c7",
      "history.history-naha-kagoshima-1700-1900.c8"
    ]
  }
];
export const FRAMES = [
  {
    "id": "antecedent",
    "text": "1609 Antecedent Shimazu invasion Kingdom retained under dominance Kagoshima account Working English paraphrase No continuous status inferred Shuri ≠ Naha",
    "claim": "history.history-naha-kagoshima-1700-1900.c9",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "office",
    "text": "Sanshikan Ikegusuku Anki Royal government preservation efforts Okinawa Archives Working English paraphrase Shuri ≠ Naha Naha: modern orientation",
    "claim": "history.history-naha-kagoshima-1700-1900.c10",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "replacement",
    "text": "1872 Ryukyu-han 1879-03-27 Armed order 1879-04-04 Prefecture proclamation Okinawa Archives Working English paraphrase Original instruments uncollated Shuri ≠ Naha No consent inferred",
    "claim": "history.history-naha-kagoshima-1700-1900.c11",
    "countedWords": 20,
    "whitespaceTokens": 24
  },
  {
    "id": "comparison",
    "text": "1609 Antecedent: Shimazu dominance Kingdom retained Kagoshima account Sanshikan preservation 1872 Ryukyu-han 1879 Armed prefecture replacement Okinawa Archives Working English paraphrase Shuri ≠ Naha Naha: modern orientation",
    "claim": "history.history-naha-kagoshima-1700-1900.c12",
    "countedWords": 25,
    "whitespaceTokens": 29
  }
];
export const REQUIRED = [
  "satsuma",
  "royalOffice",
  "replacement"
];
export const ATTACHMENTS = {
  "satsuma": [
    "antecedent"
  ],
  "royalOffice": [
    "office"
  ],
  "replacement": [
    "replacement"
  ]
};
export const PREDICTION = {
  "question": "Does a kingdom retained under Shimazu domination describe the same institutional relation as the1879 replacement?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Kagoshima describes the 1609 invasion as antecedent to retained kingship under Shimazu dominance. Okinawa Archives identifies Sanshikan Ikegusuku Anki’s preservation efforts,1872 Ryukyu-han designation and 1879 armed replacement with a prefecture. These categories differ; no uninterrupted status follows. English is a working paraphrase; Shuri is not modern-orientation Naha.";
export const PERIOD_PROVENANCE = "Selected institutional witnesses within1700–1900;1609 is antecedent context only. Naha is modern orientation; Shuri government is not located in Naha.";

export interface Proof {generation:number; witness:string|null; frame:string; text:string; contexts:string[]; ordinaryVisible:boolean}
export interface Snapshot {generation:number;frame:string;text:string;contexts:string[]}
export interface State {active:string|null;displayWitness:string|null;frame:string|null;generation:number;mounted:Proof|null;seen:Record<string,Snapshot>;earned:string[];comparisonReady:boolean;comparisonEverMounted:boolean;committed:boolean}
export type Action={type:"navigate";target:string}|{type:"mounted";proof:Proof}|{type:"reset"}|{type:"restart"}|{type:"commit"};
export const initialState=():State=>({active:null,displayWitness:null,frame:null,generation:0,mounted:null,seen:{},earned:[],comparisonReady:false,comparisonEverMounted:false,committed:false});
export const requiredFrame=(witness:string):string|null=>(ATTACHMENTS as Record<string,string[]>)[witness]?.[0]??null;
export const requiredContexts=(witness:string):string[]=>[...((ATTACHMENTS as Record<string,string[]>)[witness]??[]),...(DOCUMENTS.find(d=>d.id===witness)?.fieldAddresses??[])];
export const frameText=(frame:string|null):string=>FRAMES.find(f=>f.id===frame)?.text??"";
export function validProof(state:State,proof:Proof|null):proof is Proof {
 if(!proof||!proof.ordinaryVisible||proof.generation!==state.generation||proof.frame!==state.frame||proof.text!==frameText(state.frame))return false;
 if(state.frame==="comparison")return state.comparisonReady&&proof.witness===null;
 return proof.witness!==null&&proof.witness===state.displayWitness&&requiredFrame(proof.witness)===proof.frame&&requiredContexts(proof.witness).every(c=>proof.contexts.includes(c));
}
export function acknowledge(state:State):string[]{const p=state.mounted;if(!validProof(state,p)||p.witness===null||state.earned.includes(p.witness))return state.earned;return [...state.earned,p.witness];}
export const canComplete=(state:State):boolean=>REQUIRED.every(id=>acknowledge(state).includes(id));
export const canDeliverFinal=(state:State):boolean=>state.comparisonEverMounted&&REQUIRED.every(id=>state.earned.includes(id));
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return {...initialState(),generation:state.generation+1};
 if(action.type==="commit")return state.committed?state:{...state,committed:true};
 if(action.type==="reset")return {...state,active:null,generation:state.generation+1,mounted:null};
 if(action.type==="mounted"){
  if(!validProof(state,action.proof))return state;
  if(state.mounted?.generation===action.proof.generation&&state.mounted?.frame===action.proof.frame&&state.mounted?.witness===action.proof.witness)return state;
  if(action.proof.witness===null)return {...state,mounted:action.proof,comparisonEverMounted:true};
  return {...state,mounted:action.proof,seen:{...state.seen,[action.proof.witness]:{generation:state.generation,frame:action.proof.frame,text:action.proof.text,contexts:[...action.proof.contexts]}}};
 }
 if(action.target!=="comparison"&&!REQUIRED.includes(action.target))return state;
 const earned=acknowledge(state);const newlyComplete=!state.comparisonReady&&REQUIRED.every(id=>earned.includes(id));
 if(newlyComplete)return {...state,earned,active:"comparison",displayWitness:null,frame:"comparison",comparisonReady:true,generation:state.generation+1,mounted:null};
 if(action.target==="comparison"){
  if(!state.comparisonReady)return earned===state.earned?state:{...state,earned};
  return {...state,earned,active:"comparison",displayWitness:null,frame:"comparison",generation:state.generation+1,mounted:null};
 }
 return {...state,earned,active:action.target,displayWitness:action.target,frame:requiredFrame(action.target),generation:state.generation+1,mounted:null};
}
