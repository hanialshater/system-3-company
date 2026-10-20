export const DOCUMENTS = [
  {
    "id": "conquest",
    "text": "Portuguese conquest of Malacca 1511",
    "requiredContext": "Select year only; no exact conquest day. Local Malay municipal account, not Portuguese original.",
    "citation": "Government of Melaka institutional historical account. Language/edition: Malay; brief English paraphrase; not independently reviewed. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://www.melaka.gov.my/kerajaan/info-negeri/sejarah.html",
    "locator": "text253/275 municipal chronology",
    "sourceLevel": "Government of Melaka institutional historical account",
    "languageMediation": "Malay; brief English paraphrase; not independently reviewed",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.conquest.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-malacca-aceh-1500-1700.c1",
      "history.history-malacca-aceh-1500-1700.c2",
      "history.history-malacca-aceh-1500-1700.c3"
    ]
  },
  {
    "id": "governor",
    "text": "Stadthuys 1650 governor residence and administrative centre",
    "requiredContext": "An administrative building/function, not all population’s consent or uniform regional control.",
    "citation": "Government of Melaka institutional historical account. Language/edition: Malay; brief English paraphrase; not independently reviewed. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://www.melaka.gov.my/kerajaan/info-negeri/sejarah.html",
    "locator": "text300 municipal chronology",
    "sourceLevel": "Government of Melaka institutional historical account",
    "languageMediation": "Malay; brief English paraphrase; not independently reviewed",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.governor.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-malacca-aceh-1500-1700.c5",
      "history.history-malacca-aceh-1500-1700.c6",
      "history.history-malacca-aceh-1500-1700.c7"
    ]
  },
  {
    "id": "acehCourt",
    "text": "Iskandar Muda 1607–1636 and Darud Donya royal palace",
    "requiredContext": "No envoy quotation/translation copied; no unsupported European embassy chronology or gender-decline rhetoric.",
    "citation": "Dinas Perhubungan Banda Aceh municipal institution. Language/edition: Indonesian; brief English paraphrase; not independently reviewed. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated. Municipal account attributes Lombard and French-envoy mediation; their originals are not supplied.",
    "sourceUrl": "https://dishub.bandaacehkota.go.id/sejarah-aceh/",
    "locator": "text67/79 municipal account attributing Lombard and French envoy",
    "sourceLevel": "Dinas Perhubungan Banda Aceh municipal institution",
    "languageMediation": "Indonesian; brief English paraphrase; not independently reviewed",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.acehCourt.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-malacca-aceh-1500-1700.c9",
      "history.history-malacca-aceh-1500-1700.c10",
      "history.history-malacca-aceh-1500-1700.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "conquest",
    "text": "1511 Malacca Portuguese conquest Municipal retrospective Working English paraphrase Exact day uncollated Conquest ≠ Aceh royal office",
    "claim": "history.history-malacca-aceh-1500-1700.c4",
    "countedWords": 17,
    "whitespaceTokens": 19
  },
  {
    "id": "governor",
    "text": "1650 Malacca Dutch governor residence Administrative centre Municipal retrospective Working English paraphrase Original record uncollated",
    "claim": "history.history-malacca-aceh-1500-1700.c8",
    "countedWords": 16,
    "whitespaceTokens": 17
  },
  {
    "id": "acehCourt",
    "text": "1607–1636 Aceh Iskandar Muda Darud Donya royal palace Municipal account Attributed retrospective Working English paraphrase Original narrative uncollated",
    "claim": "history.history-malacca-aceh-1500-1700.c12",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "comparison",
    "text": "1511 Malacca Portuguese conquest 1650 Dutch governor residence Municipal accounts Aceh Iskandar Muda Royal palace Attributed retrospective Working paraphrase Original narratives uncollated Separate institutions",
    "claim": "history.history-malacca-aceh-1500-1700.c13",
    "countedWords": 24,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "conquest",
  "governor",
  "acehCourt"
];
export const ATTACHMENTS = {
  "conquest": [
    "conquest"
  ],
  "governor": [
    "governor"
  ],
  "acehCourt": [
    "acehCourt"
  ]
};
export const PREDICTION = {
  "question": "Does conquest of Malacca establish the same royal or governor institution in Aceh?",
  "options": [
    "Same offices",
    "Distinct offices"
  ],
  "answer": 1
};
export const REVEAL = "Malacca’s municipal account distinguishes Portuguese conquest from a later Dutch governor’s residence and administrative centre. Aceh’s account describes Iskandar Muda and a royal palace through an attributed retrospective. Conquest in one port does not establish the other port’s ruler, office or consent. These are separate maritime institutions, not one city’s sequence applied to both.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "port-conquest-administrative-residence-and-distinct-royal-palace";

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
