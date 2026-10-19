export const DOCUMENTS = [
  {
    "id": "ashgabatOffice",
    "text": "1881 Russian district centre developed at earlier aul",
    "requiredContext": "Existing settlement expressly retained; no founding count or empty land.",
    "citation": "Bertold Spuler; Encyclopaedia Iranica1987 updated2016. Language/edition: English. Representation: web-tool normalized body with line/page locators; not raw HTML/PDF. Transport limitation: Actual representation/transport in immutable baseline; no origin HTTP200 invented.",
    "sourceUrl": "https://www.iranicaonline.org/articles/ashkhabad/",
    "locator": "normalizedL33 Iranica Spuler",
    "sourceLevel": "Bertold Spuler; Encyclopaedia Iranica1987 updated2016",
    "languageMediation": "English",
    "representation": "web-tool normalized body with line/page locators; not raw HTML/PDF",
    "fieldAddresses": [
      "witnesses.ashgabatOffice.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-ashgabat-mashhad-1800-1900.c1",
      "history.history-ashgabat-mashhad-1800-1900.c2",
      "history.history-ashgabat-mashhad-1800-1900.c3"
    ]
  },
  {
    "id": "mashhadOffice",
    "text": "1834 Asaf alDawla appointed Khorasan governor; Mashhad control contested later",
    "requiredContext": "Do not turn provincial appointment into continuous uncontested Mashhad administration.",
    "citation": "Yousef Motavalli Haghighi; Encyclopaedia Iranica. Language/edition: English. Representation: web-tool normalized body with line/page locators; not raw HTML/PDF. Transport limitation: Actual representation/transport in immutable baseline; no origin HTTP200 invented.",
    "sourceUrl": "https://www.iranicaonline.org/articles/khorasan-xi-history-in-the-qajar-and-pahlavi-periods/",
    "locator": "normalizedL56–61 Iranica",
    "sourceLevel": "Yousef Motavalli Haghighi; Encyclopaedia Iranica",
    "languageMediation": "English",
    "representation": "web-tool normalized body with line/page locators; not raw HTML/PDF",
    "fieldAddresses": [
      "witnesses.mashhadOffice.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-ashgabat-mashhad-1800-1900.c5",
      "history.history-ashgabat-mashhad-1800-1900.c6",
      "history.history-ashgabat-mashhad-1800-1900.c7"
    ]
  },
  {
    "id": "boundary",
    "text": "1881 Russia/Persia frontier line and appointment of special boundary commissioners",
    "requiredContext": "AitchisonXIII1933 English translation from Russian by Stephens; selectedI/II only. ArticleV Persian difference excluded. Actual image uninspected; normalized OCR not raw scan.",
    "citation": "Government of India treaty compilation; BL/QDL custodian. Language/edition: English translation from Russian; QDL OCR, image not inspected. Representation: web-tool normalized body with line/page locators; not raw HTML/PDF. Transport limitation: Actual representation/transport in immutable baseline; no origin HTTP200 invented. Aitchison XIII, 1933; Mr Stephens translated from Russian. QDL item copyright status unknown; original Russian/Persian and source images uncollated.",
    "sourceUrl": "https://www.qdl.qa/en/archive/81055/vdc_100023947391.0x0000c4",
    "locator": "normalizedL71–110 ArticlesI/II; introduction edition/ratification separately acquired",
    "sourceLevel": "Government of India treaty compilation; BL/QDL custodian",
    "languageMediation": "English translation from Russian; QDL OCR, image not inspected",
    "representation": "web-tool normalized body with line/page locators; not raw HTML/PDF",
    "fieldAddresses": [
      "witnesses.boundary.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-ashgabat-mashhad-1800-1900.c9",
      "history.history-ashgabat-mashhad-1800-1900.c10",
      "history.history-ashgabat-mashhad-1800-1900.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "ashgabatOffice",
    "text": "1881 Ashgabat Russian district centre Earlier aul Iranica scholarly account Not empty land or timeless city foundation",
    "claim": "history.history-ashgabat-mashhad-1800-1900.c4",
    "countedWords": 18,
    "whitespaceTokens": 19
  },
  {
    "id": "mashhadOffice",
    "text": "1834 Khorasan Asaf alDawla governor Mashhad later contested Iranica scholarly account Qajar appointment ≠ uniform control",
    "claim": "history.history-ashgabat-mashhad-1800-1900.c8",
    "countedWords": 16,
    "whitespaceTokens": 18
  },
  {
    "id": "boundary",
    "text": "1881 Russia/Persia Frontier line Special commissioners Aitchison English translation Russian/Persian uncollated 1882 Ratification QDL OCR Prescription ≠ city offices",
    "claim": "history.history-ashgabat-mashhad-1800-1900.c12",
    "countedWords": 18,
    "whitespaceTokens": 21
  },
  {
    "id": "comparison",
    "text": "1881 Ashgabat Russian centre Earlier aul 1834 Qajar Khorasan governor Mashhad contested Iranica 1881 Frontier/commissioners Translation Originals uncollated 1882 Ratification Different powers",
    "claim": "history.history-ashgabat-mashhad-1800-1900.c13",
    "countedWords": 20,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "ashgabatOffice",
  "mashhadOffice",
  "boundary"
];
export const ATTACHMENTS = {
  "ashgabatOffice": [
    "ashgabatOffice"
  ],
  "mashhadOffice": [
    "mashhadOffice"
  ],
  "boundary": [
    "boundary"
  ]
};
export const PREDICTION = {
  "question": "Does a boundary convention establish identical city foundation and provincial offices?",
  "options": [
    "Same offices",
    "Distinct offices"
  ],
  "answer": 1
};
export const REVEAL = "Iranica distinguishes Ashgabat’s Russian district centre at an earlier settlement from a Qajar provincial appointment and contested Mashhad control. The compiled English convention prescribes a Russia–Persia frontier and special commissioners, with later ratification. A boundary undertaking does not establish either city’s foundation or identical local offices; the original Russian and Persian texts remain uncollated.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "earlier-settlement-provincial-appointment-contested-city-and-frontier-commission";

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
