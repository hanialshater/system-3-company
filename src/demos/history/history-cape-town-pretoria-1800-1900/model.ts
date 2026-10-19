export const DOCUMENTS = [
  {
    "id": "cape",
    "text": "Government House after 1806 British occupation",
    "requiredContext": "Building account acknowledges enslaved craftspeople; exact attribution of particular doors is speculative and unselected. No original capitulation inspected.",
    "sourceUrl": "https://www.presidency.gov.za/tuynhuys",
    "locator": "indexed34–43, especially43",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.cape.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-cape-town-pretoria-1800-1900.c1",
      "history.history-cape-town-pretoria-1800-1900.c2"
    ]
  },
  {
    "id": "pretoria",
    "text": "Pretoria 1855 founding; capital designation 3 April 1860 and transfer 1 May 1860",
    "requiredContext": "Institutional historical account, not original municipal proclamation; founding modern city does not mean no earlier inhabitants.",
    "sourceUrl": "https://www.dlrrd.gov.za/phocadownloadpap/Deeds_Journal/01%20Jul%202007-South%20African%20Deeds%20Journal.pdf",
    "locator": "PDF11/printed9 right column; rendered page inspected",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.pretoria.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-cape-town-pretoria-1800-1900.c4",
      "history.history-cape-town-pretoria-1800-1900.c5"
    ]
  },
  {
    "id": "annexation",
    "text": "1877 British annexation;1881 foreign-relations/resident limitations",
    "requiredContext": "British museum account not original convention. Exclude its claim resident actually protected African interests or independence equalled universal rights.",
    "sourceUrl": "https://www.nam.ac.uk/explore/transvaal-war",
    "locator": "indexed31–32 and68–69",
    "sourceLevel": "British museum historical account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.annexation.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-cape-town-pretoria-1800-1900.c7",
      "history.history-cape-town-pretoria-1800-1900.c8"
    ]
  }
];
export const FRAMES = [
  {
    "id": "cape",
    "text": "1806 Cape Town Government House British occupation Presidency retrospective account Enslaved building labour acknowledged Not empty land",
    "claim": "history.history-cape-town-pretoria-1800-1900.c3",
    "countedWords": 18,
    "whitespaceTokens": 19
  },
  {
    "id": "pretoria",
    "text": "1855 Pretoria founded 1860-04-03 Capital designation 1860-05-01 Government transfer Deeds Journal retrospective Distinct dates; not empty land",
    "claim": "history.history-cape-town-pretoria-1800-1900.c6",
    "countedWords": 16,
    "whitespaceTokens": 19
  },
  {
    "id": "annexation",
    "text": "1877 British annexation 1881 Foreign-relations limits Pretoria Resident NAM retrospective account Settler/imperial accounts ≠ African assent",
    "claim": "history.history-cape-town-pretoria-1800-1900.c9",
    "countedWords": 15,
    "whitespaceTokens": 18
  },
  {
    "id": "comparison",
    "text": "1806 Cape Government House Presidency account 1855 Pretoria founded 1860 Designation≠transfer Deeds Journal 1877 British annexation 1881 Limited foreign relations NAM account No consent inferred",
    "claim": "history.history-cape-town-pretoria-1800-1900.c10",
    "countedWords": 22,
    "whitespaceTokens": 27
  }
];
export const REQUIRED = [
  "cape",
  "pretoria",
  "annexation"
];
export const ATTACHMENTS = {
  "cape": [
    "cape"
  ],
  "pretoria": [
    "pretoria"
  ],
  "annexation": [
    "annexation"
  ]
};
export const PREDICTION = {
  "question": "Does a colonial institution in Cape Town establish a timeless identical Pretoria seat?",
  "options": [
    "Timeless seat",
    "Dated changes"
  ],
  "answer": 1
};
export const REVEAL = "The Presidency describes Cape Town’s Government House after 1806 occupation. The Deeds Journal distinguishes Pretoria’s founding, capital designation and actual government transfer. NAM then describes annexation and later foreign-relations limitations. A later city seat is not timeless government or consent; settler and imperial accounts cannot speak for all African residents.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "government-house-capital-designation-transfer-and-annexation";

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
