export const DOCUMENTS = [
  {
    "id": "kabulCourt",
    "text": "Late eighteenth century Kabul Durrani capital under Timur Shah/Shah Zaman",
    "requiredContext": "Use the late eighteenth century, not a disputed exact transfer date in 1773–76. Court location does not establish continuous city control.",
    "citation": "May Schinasi; Iranica2009/update2016. Language/edition: English; no manuscript collation. Representation: web-tool normalized body including line numbers; NOT raw HTML. Transport limitation: Actual representation/transport in immutable baseline; no origin HTTP200 invented.",
    "sourceUrl": "https://www.iranicaonline.org/articles/kabul-iii-history/",
    "locator": "Schinasi Iranica normalizedL34–36",
    "sourceLevel": "May Schinasi; Iranica2009/update2016",
    "languageMediation": "English; no manuscript collation",
    "representation": "web-tool normalized body including line numbers; NOT raw HTML",
    "fieldAddresses": [
      "witnesses.kabulCourt.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-kabul-peshawar-1700-1900.c1",
      "history.history-kabul-peshawar-1700-1900.c2",
      "history.history-kabul-peshawar-1700-1900.c3"
    ]
  },
  {
    "id": "peshawarSalt",
    "text": "Peshawar Sikh salt-revenue contracts 1839–49; later British Kohat Salt Department",
    "requiredContext": "Peshawar monopoly and Kohat regional offices, not invented Sikh city governor; no broad commerce-progress rhetoric.",
    "citation": "Federal Board of Revenue, Pakistan. Language/edition: English. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://www.fbr.gov.pk/DisplayDocs/129",
    "locator": "extractedtext14–15 Kohat Division/Peshawar monopoly",
    "sourceLevel": "Federal Board of Revenue, Pakistan",
    "languageMediation": "English",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.peshawarSalt.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-kabul-peshawar-1700-1900.c5",
      "history.history-kabul-peshawar-1700-1900.c6",
      "history.history-kabul-peshawar-1700-1900.c7"
    ]
  },
  {
    "id": "durand",
    "text": "1893 Amir/Government of India non-interference and later joint demarcation prescriptions",
    "requiredContext": "Appendix reprints a 2009 brochure; original signed text, map and Dari version uncollated. Truncated clause5 excluded. No current boundary/title or community-consent adjudication.",
    "citation": "Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://www.files.ethz.ch/isn/126743/020111_ACUS_Nawaz_PakistanCounterinsurgency.pdf",
    "locator": "Appendix1 PDF33–34/printed27–28 clauses2/4; visually inspected; cited2009FrontierCorpsreprint",
    "sourceLevel": "See URL/rawbody; not qualified or used as evidence",
    "languageMediation": "Unqualified discovery candidate, not a witness",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.durand.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-kabul-peshawar-1700-1900.c9",
      "history.history-kabul-peshawar-1700-1900.c10",
      "history.history-kabul-peshawar-1700-1900.c11"
    ],
    "displayCitation": "Atlantic Council appendix; cited 2009 Frontier Corps reprint. English reprint; original signed text, map and Dari uncollated."
  }
];
export const FRAMES = [
  {
    "id": "kabulCourt",
    "text": "Late eighteenth century Kabul Durrani capital Timur Shah/Shah Zaman Schinasi scholarly account Normalized body Exact transfer year unresolved",
    "claim": "history.history-kabul-peshawar-1700-1900.c4",
    "countedWords": 20,
    "whitespaceTokens": 20
  },
  {
    "id": "peshawarSalt",
    "text": "1839–49 Peshawar Sikh salt contracts Later British Kohat Salt Department FBR retrospective account Not citywide governor",
    "claim": "history.history-kabul-peshawar-1700-1900.c8",
    "countedWords": 17,
    "whitespaceTokens": 18
  },
  {
    "id": "durand",
    "text": "1893 Amir/Government of India Non-interference Joint demarcation Reprint Clauses2/4 Original map/Dari uncollated Prescription ≠ every local office",
    "claim": "history.history-kabul-peshawar-1700-1900.c12",
    "countedWords": 17,
    "whitespaceTokens": 19
  },
  {
    "id": "comparison",
    "text": "Kabul Durrani court Schinasi Peshawar Sikh contracts/British Kohat salt offices FBR 1893 Non-interference Joint demarcation Reprint Original map/Dari uncollated Frontier prescription≠city administration",
    "claim": "history.history-kabul-peshawar-1700-1900.c13",
    "countedWords": 23,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "kabulCourt",
  "peshawarSalt",
  "durand"
];
export const ATTACHMENTS = {
  "kabulCourt": [
    "kabulCourt"
  ],
  "peshawarSalt": [
    "peshawarSalt"
  ],
  "durand": [
    "durand"
  ]
};
export const PREDICTION = {
  "question": "Does the frontier text describe the same institution as Kabul’s court or Peshawar’s revenue administration?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Schinasi describes Kabul’s Durrani capital; FBR describes Peshawar salt contracts and later British regional salt administration. The 1893 reprint prescribes non-interference and joint demarcation, not these offices. Court, revenue institution and frontier undertaking are different powers; neither administrative change nor a ruler’s signature establishes all communities’ consent or current title.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "durrani-court-regional-salt-contracts-and-frontier-prescription";

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
