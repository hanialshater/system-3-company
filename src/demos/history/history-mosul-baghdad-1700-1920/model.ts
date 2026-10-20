export const DOCUMENTS = [
  {
    "id": "mosulGovernor",
    "text": "Jalili family Mosul governors 1726–1834",
    "requiredContext": "Named family office, not complete roster or uninterrupted uniform authority.",
    "citation": "Mehmet İpşirli; TDV İslâm Ansiklopedisi 1993. Language/edition: Turkish; paraphrase; not independently reviewed. Representation: web-tool normalized body with line/page locators; not raw HTML/PDF. Transport limitation: Actual representation/transport in immutable baseline; no origin HTTP200 invented.",
    "sourceUrl": "https://islamansiklopedisi.org.tr/celili",
    "locator": "normalizedL71/96–98 TDV Celililer",
    "sourceLevel": "Mehmet İpşirli; TDV İslâm Ansiklopedisi 1993",
    "languageMediation": "Turkish; paraphrase; not independently reviewed",
    "representation": "web-tool normalized body with line/page locators; not raw HTML/PDF",
    "fieldAddresses": [
      "witnesses.mosulGovernor.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mosul-baghdad-1700-1920.c1",
      "history.history-mosul-baghdad-1700-1920.c2",
      "history.history-mosul-baghdad-1700-1920.c3"
    ]
  },
  {
    "id": "baghdadGovernor",
    "text": "Suleyman Pasha appointed Baghdad provincial governor 1779",
    "requiredContext": "Office distinct from later British entry; no generic uniform Ottoman control.",
    "citation": "TDV İslâm Ansiklopedisi institutional scholarly article. Language/edition: Turkish; paraphrase; not independently reviewed. Representation: web-tool normalized body with line/page locators; not raw HTML/PDF. Transport limitation: Actual representation/transport in immutable baseline; no origin HTTP200 invented.",
    "sourceUrl": "https://islamansiklopedisi.org.tr/bagdat",
    "locator": "normalizedL408 TDV Bagdat",
    "sourceLevel": "TDV İslâm Ansiklopedisi institutional scholarly article",
    "languageMediation": "Turkish; paraphrase; not independently reviewed",
    "representation": "web-tool normalized body with line/page locators; not raw HTML/PDF",
    "fieldAddresses": [
      "witnesses.baghdadGovernor.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mosul-baghdad-1700-1920.c5",
      "history.history-mosul-baghdad-1700-1920.c6",
      "history.history-mosul-baghdad-1700-1920.c7"
    ]
  },
  {
    "id": "occupation",
    "text": "British Baghdad entry March 1917 and Mosul November 1918",
    "requiredContext": "NAM14November conflicts Turkish ministry3November. Retain month only; both acquired records preserved in baseline, neither day resolved.",
    "citation": "National Army Museum UK institutional retrospective. Language/edition: English; exact Mosul occupation day conflicts with Turkish timeline. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://www.nam.ac.uk/explore/mesopotamia-campaign",
    "locator": "text126/132; Mosul day intentionally not selected",
    "sourceLevel": "National Army Museum UK institutional retrospective",
    "languageMediation": "English; exact Mosul occupation day conflicts with Turkish timeline",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.occupation.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mosul-baghdad-1700-1920.c9",
      "history.history-mosul-baghdad-1700-1920.c10",
      "history.history-mosul-baghdad-1700-1920.c11"
    ]
  },
  {
    "id": "mandate",
    "text": "San Remo 1920 provisionally recognizes Mesopotamia independence subject to administrative advice/assistance, selects Britain and leaves mandate terms for later formulation/League approval",
    "requiredContext": "UN custodian not author/UN decision. Prescription not later entry into force or the 1926 boundary award; provisional independence/administrative advice and future terms retained. Provisional recognition is subject to mandatory administrative advice and assistance until ability to stand alone; not unconditional independence.",
    "citation": "Allied Supreme Council resolution; UN UNISPAL custodian labels Non-UN document. Language/edition: English diplomatic text; mandate terms future, not later ratified instrument. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://www.un.org/unispal/document/auto-insert-207297/",
    "locator": "text42/45/47 SupremeCouncil25April1920 English/French nonUN document",
    "sourceLevel": "Allied Supreme Council resolution; UN UNISPAL custodian labels Non-UN document",
    "languageMediation": "English diplomatic text; mandate terms future, not later ratified instrument",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.mandate.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mosul-baghdad-1700-1920.c13",
      "history.history-mosul-baghdad-1700-1920.c14",
      "history.history-mosul-baghdad-1700-1920.c15"
    ]
  }
];
export const FRAMES = [
  {
    "id": "mosulGovernor",
    "text": "1726–1834 Mosul Jalili governors TDV scholarly account Working English paraphrase Not every provincial office",
    "claim": "history.history-mosul-baghdad-1700-1920.c4",
    "countedWords": 15,
    "whitespaceTokens": 16
  },
  {
    "id": "baghdadGovernor",
    "text": "1779 Baghdad Suleyman Pasha Provincial governor TDV scholarly account Working English paraphrase Original appointment uncollated",
    "claim": "history.history-mosul-baghdad-1700-1920.c8",
    "countedWords": 16,
    "whitespaceTokens": 17
  },
  {
    "id": "occupation",
    "text": "1917 March Baghdad British entry 1918 November Mosul British occupation NAM retrospective Exact Mosul day disputed",
    "claim": "history.history-mosul-baghdad-1700-1920.c12",
    "countedWords": 16,
    "whitespaceTokens": 18
  },
  {
    "id": "mandate",
    "text": "1920 SanRemo Britain selected Mesopotamia Provisional independence Requires administrative advice/assistance Mandate terms future League approval Supreme Council record UN custodian Not final boundaries",
    "claim": "history.history-mosul-baghdad-1700-1920.c16",
    "countedWords": 24,
    "whitespaceTokens": 25
  },
  {
    "id": "comparison",
    "text": "Mosul Jalili governors Baghdad Suleyman TDV paraphrase 1917/1918 British entries NAM Mosul day disputed 1920 Britain selected Provisional independence Requires administrative advice/assistance Future mandate terms",
    "claim": "history.history-mosul-baghdad-1700-1920.c17",
    "countedWords": 25,
    "whitespaceTokens": 27
  }
];
export const REQUIRED = [
  "mosulGovernor",
  "baghdadGovernor",
  "occupation",
  "mandate"
];
export const ATTACHMENTS = {
  "mosulGovernor": [
    "mosulGovernor"
  ],
  "baghdadGovernor": [
    "baghdadGovernor"
  ],
  "occupation": [
    "occupation"
  ],
  "mandate": [
    "mandate"
  ]
};
export const PREDICTION = {
  "question": "Does a mandate prescription establish identical provincial offices, occupation dates and final boundaries?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "TDV describes separate provincial offices in Mosul and Baghdad. The NAM account places British entry in different months and years; acquired accounts disagree on Mosul’s exact day. San Remo selected Britain for Mesopotamia while mandate terms still required formulation and League approval. Neither occupation nor that prescription establishes identical offices, finalized boundaries or universal consent.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "provincial-offices-distinct-occupations-and-provisional-advised-independence";

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
