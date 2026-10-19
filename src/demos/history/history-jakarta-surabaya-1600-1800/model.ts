export const DOCUMENTS = [
  {
    "id": "bataviaCouncil",
    "text": "VOC Governor-General/Council met at Batavia Castle; trade/government/justice competences",
    "requiredContext": "Archival institutional description, not all minutes independently inspected or Surabaya practice.",
    "sourceUrl": "https://sejarah-nusantara.anri.go.id/archive/",
    "locator": "indexed43 Supreme Government",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.bataviaCouncil.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-jakarta-surabaya-1600-1800.c1",
      "history.history-jakarta-surabaya-1600-1800.c2"
    ]
  },
  {
    "id": "diplomacy",
    "text": "1619–1799 Batavia diplomatic centre with mediated translated correspondence",
    "requiredContext": "Indonesian institutional account; translation bureau and mediated surviving Dutch letters, not original letter endorsement.",
    "sourceUrl": "https://sejarah-nusantara.anri.go.id/id/diplomatic-letters/",
    "locator": "indexed37–38",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.diplomacy.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-jakarta-surabaya-1600-1800.c4",
      "history.history-jakarta-surabaya-1600-1800.c5"
    ]
  },
  {
    "id": "surabayaRuler",
    "text": "Before 1743 Mataram-appointed Surabaya prince with VOC approval; subsequent VOC control described",
    "requiredContext": "2019 Ginaris archaeological article historical background, not original 1743 treaty/appointment. Do not upgrade synthesis or use its historical map/media.",
    "sourceUrl": "https://ejournal.brin.go.id/berkalaarkeologi/article/download/4235/3064",
    "locator": "PDF5/printed187, Sejarah Kota Surabaya; visually inspected",
    "sourceLevel": "institution-hosted academic synthesis; political paragraph is not original1743 treaty",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.surabayaRuler.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-jakarta-surabaya-1600-1800.c7",
      "history.history-jakarta-surabaya-1600-1800.c8"
    ]
  }
];
export const FRAMES = [
  {
    "id": "bataviaCouncil",
    "text": "Batavia VOC Governor-General Council Trade/government/justice powers ANRI institutional account Not every local practice",
    "claim": "history.history-jakarta-surabaya-1600-1800.c3",
    "countedWords": 15,
    "whitespaceTokens": 15
  },
  {
    "id": "diplomacy",
    "text": "1619–1799 Batavia diplomacy Translation bureau ANRI account Working English paraphrase Surviving translations ≠ unmediated local voices",
    "claim": "history.history-jakarta-surabaya-1600-1800.c6",
    "countedWords": 16,
    "whitespaceTokens": 18
  },
  {
    "id": "surabayaRuler",
    "text": "Surabaya Mataram prince VOC approval Before 1743; later VOC control BRIN-hosted synthesis Working English paraphrase Original treaty uncollated",
    "claim": "history.history-jakarta-surabaya-1600-1800.c9",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "comparison",
    "text": "Batavia VOC council ANRI account Diplomacy mediated Surabaya Mataram prince VOC approval Before 1743; later Company control BRIN-hosted synthesis Working paraphrase Original treaty uncollated",
    "claim": "history.history-jakarta-surabaya-1600-1800.c10",
    "countedWords": 25,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "bataviaCouncil",
  "diplomacy",
  "surabayaRuler"
];
export const ATTACHMENTS = {
  "bataviaCouncil": [
    "bataviaCouncil"
  ],
  "diplomacy": [
    "diplomacy"
  ],
  "surabayaRuler": [
    "surabayaRuler"
  ]
};
export const PREDICTION = {
  "question": "Does Batavia’s Company council establish the same governing relation in Surabaya?",
  "options": [
    "One identical Company institution everywhere",
    "Different institutions and a mediated local transition"
  ],
  "answer": 1
};
export const REVEAL = "ANRI describes Batavia’s Company council and mediated diplomatic correspondence. Ginaris’s institutional-hosted synthesis describes a Mataram-appointed Surabaya prince with VOC approval before 1743 and later Company control. These are different relations, not one timeless institution. The synthesis is not an inspected treaty, and Batavia records do not establish every Surabaya practice.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "company-council-mediated-diplomacy-and-approved-local-prince";

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
