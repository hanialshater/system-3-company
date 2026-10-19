export const DOCUMENTS = [
  {
    "id": "royalSettlement",
    "text": "Mayor account dates Taytu royal settlement to 1887",
    "requiredContext": "Municipal 1887 account does not settle 1886 alternatives or earlier inhabitants; no exact foundation-date answer key.",
    "sourceUrl": "https://addismayor.gov.et/faqs",
    "locator": "indexed27–37 FAQ",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.royalSettlement.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-addis-ababa-massawa-1880-1960.c1",
      "history.history-addis-ababa-massawa-1880-1960.c2"
    ]
  },
  {
    "id": "massawa",
    "text": "Massawa Egyptian governor institution; Italian colonial capital 1890–1899",
    "requiredContext": "Only named institutional relations, not architectural/imperial praise or full colonial control inferred.",
    "sourceUrl": "https://shabait.com/2018/08/15/massawa-pearl-of-the-r-ed-sea-2/",
    "locator": "indexed73,77,79",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.massawa.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-addis-ababa-massawa-1880-1960.c4",
      "history.history-addis-ababa-massawa-1880-1960.c5"
    ]
  },
  {
    "id": "royalProtest",
    "text": "Empress Mennen opposition to Italian invasion, transmitted translated statements",
    "requiredContext": "22/23 April statements transmitted 5 May, partly reported drafting by Emperor; not unmediated Amharic or universal opinion. War/coercion not erased.",
    "sourceUrl": "https://history.state.gov/historicaldocuments/frus1936v03/d75",
    "locator": "FRUS1936v03d75 indexed68–89",
    "sourceLevel": "primary testimony in English diplomatic transmission",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.royalProtest.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-addis-ababa-massawa-1880-1960.c7",
      "history.history-addis-ababa-massawa-1880-1960.c8"
    ]
  },
  {
    "id": "occupationNotice",
    "text": "Italian notice claims military/civil government of Addis Ababa",
    "requiredContext": "Actual report header 6 May 1936 and note dated today; researcher 5 May shorthand not adopted. No restoration 1941 claim or universal territorial control.",
    "sourceUrl": "https://history.state.gov/historicaldocuments/frus1936v03/d332",
    "locator": "FRUS1936v03d332 indexed63–82",
    "sourceLevel": "primary diplomatic report of occupying authority’s notice",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.occupationNotice.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-addis-ababa-massawa-1880-1960.c10",
      "history.history-addis-ababa-massawa-1880-1960.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "royalSettlement",
    "text": "1887 Taytu settlement Addis mayor retrospective account Foundation date disputed No resolved exact foundation answer",
    "claim": "history.history-addis-ababa-massawa-1880-1960.c3",
    "countedWords": 16,
    "whitespaceTokens": 17
  },
  {
    "id": "massawa",
    "text": "Massawa Egyptian governor institution 1890–1899 Italian colonial capital Eritrean Ministry retrospective Different trajectory; not Ethiopian royal capital",
    "claim": "history.history-addis-ababa-massawa-1880-1960.c6",
    "countedWords": 18,
    "whitespaceTokens": 19
  },
  {
    "id": "royalProtest",
    "text": "1936 Empress Mennen invasion protest English diplomatic translation via FRUS Royal testimony ≠ every Ethiopian voice",
    "claim": "history.history-addis-ababa-massawa-1880-1960.c9",
    "countedWords": 16,
    "whitespaceTokens": 18
  },
  {
    "id": "occupationNotice",
    "text": "1936 Addis Italian military/civil government claimed Engert report/FRUS Occupying notice ≠ legitimate title, consent or universal control",
    "claim": "history.history-addis-ababa-massawa-1880-1960.c12",
    "countedWords": 17,
    "whitespaceTokens": 19
  },
  {
    "id": "comparison",
    "text": "Taytu settlement Mayor account Massawa Egyptian/Italian institutions Eritrean Ministry Empress protest FRUS translation 1936 Addis Italian powers claimed Engert/FRUS Notice≠legitimacy Foundation uncertain",
    "claim": "history.history-addis-ababa-massawa-1880-1960.c13",
    "countedWords": 23,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "royalSettlement",
  "massawa",
  "royalProtest",
  "occupationNotice"
];
export const ATTACHMENTS = {
  "royalSettlement": [
    "royalSettlement"
  ],
  "massawa": [
    "massawa"
  ],
  "royalProtest": [
    "royalProtest"
  ],
  "occupationNotice": [
    "occupationNotice"
  ]
};
export const PREDICTION = {
  "question": "Does an Italian claim to power establish the same city history and universal control at both places?",
  "options": [
    "Same trajectory and control",
    "Distinct histories and claims"
  ],
  "answer": 1
};
export const REVEAL = "Addis’s mayor attributes a royal settlement to Taytu; the date does not resolve foundation alternatives. Eritrea’s ministry describes Massawa’s separate Egyptian and Italian institutions. FRUS transmits Empress Mennen’s invasion protest and an Italian notice claiming government in Addis. An occupying claim establishes neither legitimacy, consent nor universal control.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "royal-settlement-port-institution-protest-and-occupation-claim";

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
