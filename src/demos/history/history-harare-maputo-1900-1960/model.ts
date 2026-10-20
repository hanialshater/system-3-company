export const DOCUMENTS = [
  {
    "id": "salisburyCity",
    "text": "Salisbury city status 1935; earlier municipality 1897",
    "requiredContext": "1897 is earlier context. No answer to the 1980/1982 naming dispute is asserted. The source record identifies the study’s author and edition; it does not imply empty land.",
    "citation": "George Masimba, Dialogue on Shelter Trust; African Cities Research Consortium custodian. Language/edition: English. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated. George Masimba, Dialogue on Shelter Trust, June 2021 ACRC scoping study.",
    "sourceUrl": "https://www.african-cities.org/wp-content/uploads/2021/12/ACRC_Harare_City-Scoping-Study.pdf",
    "locator": "2021ACRC scoping study PDF2 visually inspected",
    "sourceLevel": "George Masimba, Dialogue on Shelter Trust; African Cities Research Consortium custodian",
    "languageMediation": "English",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.salisburyCity.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-harare-maputo-1900-1960.c1",
      "history.history-harare-maputo-1900-1960.c2",
      "history.history-harare-maputo-1900-1960.c3"
    ]
  },
  {
    "id": "federalCapital",
    "text": "Salisbury federation capital 1953–60 selected interval",
    "requiredContext": "The selected period remains 1900–1960; the source’s later 1961–63 context is outside it. The federation role is distinct from the modern name.",
    "citation": "George Masimba, Dialogue on Shelter Trust; African Cities Research Consortium custodian. Language/edition: English. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated. George Masimba, Dialogue on Shelter Trust, June 2021 ACRC scoping study.",
    "sourceUrl": "https://www.african-cities.org/wp-content/uploads/2021/12/ACRC_Harare_City-Scoping-Study.pdf",
    "locator": "PDF2; actualsource1953–63onlyselectedthrough1960",
    "sourceLevel": "George Masimba, Dialogue on Shelter Trust; African Cities Research Consortium custodian",
    "languageMediation": "English",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.federalCapital.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-harare-maputo-1900-1960.c5",
      "history.history-harare-maputo-1900-1960.c6",
      "history.history-harare-maputo-1900-1960.c7"
    ]
  },
  {
    "id": "colonialCapital",
    "text": "Lourenço Marques colonial capital under the 1907 reorganization",
    "requiredContext": "Portuguese scholarly/archival article;1907notOCR1901. Earlier1895/1898office transfers not silentlysameaslegaldesignation; no modernrenamingdate.",
    "citation": "Arquivo Histórico de Moçambique; Universidade Eduardo Mondlane digital custodian. Language/edition: Portuguese; brief English paraphrases; not independently reviewed. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated. 1987 Arquivo article; Universidade Eduardo Mondlane custodian.",
    "sourceUrl": "https://ahm.ghost.uem.mz/wp-content/uploads/sites/38/2025/10/Boletim-do-Arquivo-Historico-de-Mocambique-No2-Outubro-de-1987.pdf",
    "locator": "Arquivo1987 article PDF16/printed12,23May1907paragraph; visually inspected",
    "sourceLevel": "Arquivo Histórico de Moçambique; Universidade Eduardo Mondlane digital custodian",
    "languageMediation": "Portuguese; brief English paraphrases; not independently reviewed",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.colonialCapital.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-harare-maputo-1900-1960.c9",
      "history.history-harare-maputo-1900-1960.c10",
      "history.history-harare-maputo-1900-1960.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "salisburyCity",
    "text": "1897 Antecedent Salisbury municipality 1935 City status ACRC scoping study Account; original ordinance uncollated Modern Harare orientation",
    "claim": "history.history-harare-maputo-1900-1960.c4",
    "countedWords": 17,
    "whitespaceTokens": 19
  },
  {
    "id": "federalCapital",
    "text": "1953–1960 Salisbury federal capital Selected interval ACRC study Not all residents’ representation",
    "claim": "history.history-harare-maputo-1900-1960.c8",
    "countedWords": 13,
    "whitespaceTokens": 14
  },
  {
    "id": "colonialCapital",
    "text": "1907 Lourenço Marques Portuguese colonial capital Reorganization Arquivo article Working English paraphrase Original decree uncollated Modern Maputo orientation",
    "claim": "history.history-harare-maputo-1900-1960.c12",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "comparison",
    "text": "Salisbury municipality/city ACRC study 1953–1960 Federation capital 1907 Lourenço Marques Portuguese colonial capital Arquivo article Working paraphrase Original ordinances uncollated Modern names≠identical institutions",
    "claim": "history.history-harare-maputo-1900-1960.c13",
    "countedWords": 23,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "salisburyCity",
  "federalCapital",
  "colonialCapital"
];
export const ATTACHMENTS = {
  "salisburyCity": [
    "salisburyCity"
  ],
  "federalCapital": [
    "federalCapital"
  ],
  "colonialCapital": [
    "colonialCapital"
  ]
};
export const PREDICTION = {
  "question": "Do modern city names establish identical colonial or federal institutions?",
  "options": [
    "Same roles",
    "Distinct roles"
  ],
  "answer": 1
};
export const REVEAL = "The scoping study distinguishes Salisbury’s municipal/city status from its federal-capital role. The Arquivo article describes Lourenço Marques’s Portuguese colonial-capital designation under 1907 reorganization. Modern Harare and Maputo orient these different institutions; names do not establish identical authority, universal representation or an empty earlier settlement.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "municipal-federal-and-colonial-capital-roles";

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
