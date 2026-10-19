export const DOCUMENTS = [
  {
    "id": "lagos",
    "text": "August 1861 Lagos cession; Docemo adjudication by parties’ consent, subject to British-law appeal",
    "requiredContext": "1861 is antecedent to original 1880–1960 interval. Scholarly edition, not signed sheet; no day 6 inferred. Limited jurisdiction is not universal rights. Parties’ consent is litigants’ consent to adjudication, not residents’ consent to cession.",
    "sourceUrl": "https://ardhi.unl.edu/item/ardhi.treaty.00001.html",
    "locator": "indexed36–100, ArticlesI–III; month-only execution date",
    "sourceLevel": "primary treaty in scholarly digital edition",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.lagos.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-lagos-ibadan-1880-1960.c1",
      "history.history-lagos-ibadan-1880-1960.c2"
    ]
  },
  {
    "id": "ibadan",
    "text": "1893 Ibadan Bále/authorities agreement receives officers and Lagos constabulary",
    "requiredContext": "No conquest or implemented rule inferred. Modern Johnson/Obadiah 1921 web/OCR edition; do not normalize historical names from faulty typography.",
    "sourceUrl": "https://www.yorubaheritage.app/read/app/A/",
    "locator": "indexed48–59, AppendixA§3¶37–48",
    "sourceLevel": "primary agreement transcribed in1921 locally authored history; modern digital edition",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.ibadan.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-lagos-ibadan-1880-1960.c4",
      "history.history-lagos-ibadan-1880-1960.c5"
    ]
  },
  {
    "id": "office",
    "text": "Bále identified as Ibadan ruler in Oluyole account",
    "requiredContext": "1830 Oluyole example is antecedent, not independent Fijabi 1893 identity or proof unchanged powers; preserve named local office.",
    "sourceUrl": "https://ui.edu.ng/content/university-ibadan-road-network",
    "locator": "indexed202 Oluyole entry",
    "sourceLevel": "Acquired body; exact source-level attribution in ordinary frame/context; independent assessment pending",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.office.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-lagos-ibadan-1880-1960.c7",
      "history.history-lagos-ibadan-1880-1960.c8"
    ]
  },
  {
    "id": "coercion",
    "text": "Docemo protest attributes signature to threat of bombardment",
    "requiredContext": "Actual parliamentary transmission of protest, not inspected autograph; do not make royal protest all Lagos residents’ views.",
    "sourceUrl": "https://api.parliament.uk/historic-hansard/commons/1862/jun/12/supply-civil-service-estimates",
    "locator": "12June1862 debate; Docemo letter8August1861, phrase because if I do not",
    "sourceLevel": "attributed primary testimony mediated by parliamentary report",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.coercion.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-lagos-ibadan-1880-1960.c10",
      "history.history-lagos-ibadan-1880-1960.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "lagos",
    "text": "1861 Antecedent Lagos cession Docemo adjudication by parties’ consent British law appeal UNL scholarly edition Original signed sheet uncollated",
    "claim": "history.history-lagos-ibadan-1880-1960.c3",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "ibadan",
    "text": "1893 Ibadan Bále authorities Officers and Lagos constabulary prescribed Johnson web transcription OCR defects; original pages uncollated Not conquest proof",
    "claim": "history.history-lagos-ibadan-1880-1960.c6",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "office",
    "text": "Ibadan Bále: ruler University of Ibadan retrospective account 1830 Antecedent Oluyole example; not Fijabi corroboration No unchanged powers inferred",
    "claim": "history.history-lagos-ibadan-1880-1960.c9",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "coercion",
    "text": "1862 Antecedent Docemo: bombardment threat Hansard reports protest Not inspected autograph Signature ≠ consent",
    "claim": "history.history-lagos-ibadan-1880-1960.c12",
    "countedWords": 14,
    "whitespaceTokens": 16
  },
  {
    "id": "comparison",
    "text": "1861 Antecedent Lagos cession Docemo adjudication UNL edition Ibadan Bále University account 1893 Officers/constabulary agreement Johnson web transcription 1862 Antecedent Coercion reported Hansard",
    "claim": "history.history-lagos-ibadan-1880-1960.c13",
    "countedWords": 22,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "lagos",
  "ibadan",
  "office",
  "coercion"
];
export const ATTACHMENTS = {
  "lagos": [
    "lagos"
  ],
  "ibadan": [
    "ibadan"
  ],
  "office": [
    "office"
  ],
  "coercion": [
    "coercion"
  ]
};
export const PREDICTION = {
  "question": "Do these selected records describe one identical accession institution?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "UNL’s Lagos edition prescribes cession with limited Docemo adjudication; Hansard transmits his bombardment-threat protest. Johnson’s web transcription prescribes officers and constabulary at Ibadan under named local authorities. Ibadan University corroborates the Bále office, not Fijabi’s precise powers. These are distinct mediated relations, not identical accession or universal consent.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "cession-adjudication-local-office-and-coercion";

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
