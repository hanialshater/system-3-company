export const DOCUMENTS = [
  {
    "id": "poona",
    "text": "Gazetteer describes Bajirav restoration at Poona for permanent subsidiary force and assigned revenue",
    "requiredContext": "Colonial Gazetteer account, not acquired original Bassein text. Exclude compiler’s claim English became sovereign and bought independence.",
    "citation": "Colonial Bombay Gazetteer; Maharashtra Gazetteers Department digital custodian. Language/edition: English. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://gazetteers.maharashtra.gov.in/cultural.maharashtra.gov.in/english/gazetteer/Poona%20District/Poona-II/history_marathas.html",
    "locator": "text776–791, Bassein31December1802 subsection",
    "sourceLevel": "Colonial Bombay Gazetteer; Maharashtra Gazetteers Department digital custodian",
    "languageMediation": "English",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.poona.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-pune-hyderabad-1700-1900.c1",
      "history.history-pune-hyderabad-1700-1900.c2",
      "history.history-pune-hyderabad-1700-1900.c3"
    ]
  },
  {
    "id": "nizamForce",
    "text": "1798 Nizam pays enlarged Company subsidiary force",
    "requiredContext": "English government compilation, not Persian counterpart or original manuscript. No universal assent or all administration inferred.",
    "citation": "British Indian governmental compilation; IGNCA scan custodian; edition title requires further collation. Language/edition: English; Persian counterpart mentioned but not collated. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://ignca.gov.in/Asi_data/14007.pdf",
    "locator": "PDF67–70/printed52–55 Articles3/5/signature; pages visually inspected",
    "sourceLevel": "British Indian governmental compilation; IGNCA scan custodian; edition title requires further collation",
    "languageMediation": "English; Persian counterpart mentioned but not collated",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.nizamForce.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-pune-hyderabad-1700-1900.c5",
      "history.history-pune-hyderabad-1700-1900.c6",
      "history.history-pune-hyderabad-1700-1900.c7"
    ]
  },
  {
    "id": "nizamLimit",
    "text": "Article 5 forbids stationing subsidiary force to collect revenue",
    "requiredContext": "Retain limitation, not force can never operate in state: actual paragraph permits specified important services but excludes revenue-stationing.",
    "citation": "British Indian governmental compilation; IGNCA scan custodian; edition title requires further collation. Language/edition: English; Persian counterpart mentioned but not collated. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://ignca.gov.in/Asi_data/14007.pdf",
    "locator": "PDF68/printed53 Article5, visually inspected",
    "sourceLevel": "British Indian governmental compilation; IGNCA scan custodian; edition title requires further collation",
    "languageMediation": "English; Persian counterpart mentioned but not collated",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.nizamLimit.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-pune-hyderabad-1700-1900.c9",
      "history.history-pune-hyderabad-1700-1900.c10",
      "history.history-pune-hyderabad-1700-1900.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "poona",
    "text": "1802 Poona Bajirav restoration Permanent subsidiary force Assigned district revenue Bombay Gazetteer account Original treaty uncollated Not direct rule proof",
    "claim": "history.history-pune-hyderabad-1700-1900.c4",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "nizamForce",
    "text": "1798 Hyderabad Nizam pays Company subsidiary force Treaty compilation Persian counterpart uncollated Prescription ≠ operation",
    "claim": "history.history-pune-hyderabad-1700-1900.c8",
    "countedWords": 15,
    "whitespaceTokens": 17
  },
  {
    "id": "nizamLimit",
    "text": "1798 Subsidiary force Not stationed for revenue collection Hyderabad Article5 English compilation Persian uncollated Military obligation ≠ all administration",
    "claim": "history.history-pune-hyderabad-1700-1900.c12",
    "countedWords": 19,
    "whitespaceTokens": 21
  },
  {
    "id": "comparison",
    "text": "1802 Poona restoration/force Assigned revenue Gazetteer 1798 Hyderabad Nizam pays Company force Revenue-stationing prohibited Article5 Compilation Original Bassein/Persian uncollated Different obligations",
    "claim": "history.history-pune-hyderabad-1700-1900.c13",
    "countedWords": 21,
    "whitespaceTokens": 23
  }
];
export const REQUIRED = [
  "poona",
  "nizamForce",
  "nizamLimit"
];
export const ATTACHMENTS = {
  "poona": [
    "poona"
  ],
  "nizamForce": [
    "nizamForce"
  ],
  "nizamLimit": [
    "nizamLimit"
  ]
};
export const PREDICTION = {
  "question": "Do these military undertakings establish identical revenue powers or direct rule?",
  "options": [
    "Same powers",
    "Distinct powers"
  ],
  "answer": 1
};
export const REVEAL = "The Bombay Gazetteer describes Bajirav’s restoration at Poona in exchange for a permanent force and assigned revenues. Hyderabad’s compiled agreement puts Company troops in the Nizam’s pay but forbids stationing them to collect revenue. Funding a force does not grant identical revenue employment or establish uniform direct rule or consent.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "restoration-assigned-revenue-and-revenue-stationing-prohibition";

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
