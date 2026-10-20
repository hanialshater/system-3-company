export const DOCUMENTS = [
  {
    "id": "cebu",
    "text": "Rajah Tupas/Legazpi agreement 4 June 1565 per 1985 historical marker",
    "requiredContext": "Tagalog marker is retrospective, not original 1565 signed agreement or certified translation. Official peace title does not erase conflict.",
    "sourceUrl": "https://philhistoricsites.nhcp.gov.ph/registry_database/unang-kasunduan-ng-kapyapaan-sa-pilipinas/",
    "locator": "indexed19–20 NHCP marker",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.cebu.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-manila-cebu-1500-1700.c1",
      "history.history-manila-cebu-1500-1700.c2"
    ]
  },
  {
    "id": "maynila",
    "text": "Rajah Soliman preexisting Maynila fort; 1571 Spanish conquest/replacement",
    "requiredContext": "Do not call native place blank or use later occupation/prison history as 1500–1700 evidence.",
    "sourceUrl": "https://intramuros.gov.ph/fs/",
    "locator": "indexed89 and146 Fort Santiago",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.maynila.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-manila-cebu-1500-1700.c4",
      "history.history-manila-cebu-1500-1700.c5"
    ]
  },
  {
    "id": "capital",
    "text": "Manila colonial-capital role from 1571",
    "requiredContext": "Only capital relation selected; avoid broad page’s Audiencia-from 1571 implication or extrapolating island-wide rule.",
    "sourceUrl": "https://intramuros.gov.ph/2015/01/04/intramuros/",
    "locator": "indexed88–89",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.capital.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-manila-cebu-1500-1700.c7",
      "history.history-manila-cebu-1500-1700.c8"
    ]
  }
];
export const FRAMES = [
  {
    "id": "cebu",
    "text": "1565 Cebu Tupas/Legazpi agreement NHCP retrospective marker Working English paraphrase Original treaty uncollated Not all Cebuano assent",
    "claim": "history.history-manila-cebu-1500-1700.c3",
    "countedWords": 18,
    "whitespaceTokens": 19
  },
  {
    "id": "maynila",
    "text": "Maynila Rajah Soliman fort 1571 Spanish conquest/replacement Intramuros retrospective account Preexisting institution; conquest ≠ consent",
    "claim": "history.history-manila-cebu-1500-1700.c6",
    "countedWords": 15,
    "whitespaceTokens": 17
  },
  {
    "id": "capital",
    "text": "1571 Manila colonial capital Intramuros retrospective account Distinct from Cebu agreement No universal authority or participation inferred",
    "claim": "history.history-manila-cebu-1500-1700.c9",
    "countedWords": 18,
    "whitespaceTokens": 19
  },
  {
    "id": "comparison",
    "text": "1565 Cebu Tupas agreement NHCP marker Working paraphrase Maynila Soliman fort 1571 Spanish conquest Manila capital Intramuros accounts Distinct acts; no universal consent",
    "claim": "history.history-manila-cebu-1500-1700.c10",
    "countedWords": 23,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "cebu",
  "maynila",
  "capital"
];
export const ATTACHMENTS = {
  "cebu": [
    "cebu"
  ],
  "maynila": [
    "maynila"
  ],
  "capital": [
    "capital"
  ]
};
export const PREDICTION = {
  "question": "Do these records establish one simultaneous colonial foundation on empty sites?",
  "options": [
    "One simultaneous foundation on empty sites",
    "Preexisting authorities and distinct dated acts"
  ],
  "answer": 1
};
export const REVEAL = "NHCP’s marker attributes a 1565 Cebu agreement to Tupas and Legazpi; it is not the original treaty. Intramuros describes Soliman’s existing Maynila fort, Spanish conquest and the 1571 colonial-capital role. These are different local acts, not empty sites or a simultaneous foundation; neither marker nor conquest establishes universal consent.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "local-agreement-preexisting-fort-conquest-and-capital";

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
