export const DOCUMENTS = [
  {
    "id": "wali",
    "text": "1837 Miles account distinguishes Said’s fort garrison and town wali",
    "requiredContext": "Retrospective1884 colonial biography; normalized OCR not inspected original convention. Wali belongs town, fort commander distinct.",
    "citation": "British colonial retrospective author; BL/QDL custodian. Language/edition: English; automatic OCR; manuscript conventions/orthography retained. Representation: web-tool normalized body with line/page locators; not raw HTML/PDF. Transport limitation: Actual representation/transport in immutable baseline; no origin HTTP200 invented. Miles colonial retrospective, 1883–1884 administration report; BL/QDL IOR/V/23/45 No. 198. QDL is custodian, not author.",
    "sourceUrl": "https://www.qdl.qa/en/archive/81055/vdc_100023580328.0x000024",
    "locator": "normalizedL77–80 f47v printed32",
    "sourceLevel": "British colonial retrospective author; BL/QDL custodian",
    "languageMediation": "English; automatic OCR; manuscript conventions/orthography retained",
    "representation": "web-tool normalized body with line/page locators; not raw HTML/PDF",
    "fieldAddresses": [
      "witnesses.wali.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mombasa-zanzibar-1700-1880.c1",
      "history.history-mombasa-zanzibar-1700-1880.c2",
      "history.history-mombasa-zanzibar-1700-1880.c3"
    ]
  },
  {
    "id": "coercion",
    "text": "Rashid and Mazrui companions invited into fort; Khalid, Said’s son, seizes them in Miles’s retrospective account",
    "requiredContext": "Preserve coercion and named local actors; no invitation interpreted as assent.",
    "citation": "British colonial retrospective author; BL/QDL custodian. Language/edition: English; automatic OCR; manuscript conventions/orthography retained. Representation: web-tool normalized body with line/page locators; not raw HTML/PDF. Transport limitation: Actual representation/transport in immutable baseline; no origin HTTP200 invented. Miles colonial retrospective, 1883–1884 administration report; BL/QDL IOR/V/23/45 No. 198. QDL is custodian, not author.",
    "sourceUrl": "https://www.qdl.qa/en/archive/81055/vdc_100023580328.0x000024",
    "locator": "normalizedL90–101",
    "sourceLevel": "British colonial retrospective author; BL/QDL custodian",
    "languageMediation": "English; automatic OCR; manuscript conventions/orthography retained",
    "representation": "web-tool normalized body with line/page locators; not raw HTML/PDF",
    "fieldAddresses": [
      "witnesses.coercion.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mombasa-zanzibar-1700-1880.c5",
      "history.history-mombasa-zanzibar-1700-1880.c6",
      "history.history-mombasa-zanzibar-1700-1880.c7"
    ]
  },
  {
    "id": "zanzibarCourt",
    "text": "Composite account places Said’s court at Zanzibar 1840 alongside enslaved plantation labour",
    "requiredContext": "Host is not established author. Court presence only, not single relocation or abandonment of Muscat; no plantation development praise.",
    "citation": "Zanzibar ministry hosted culture page; body authorship/mediation not established. Language/edition: English composite historical prose; some UTF8 mojibake; use attributed government-hosted account only. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated. Government-hosted composite; authorship unestablished. Footer reserves Zanzibar Daily rights; no open licence asserted.",
    "sourceUrl": "https://ftp.maafaznz.go.tz/culture_link_right.php?id=4",
    "locator": "text17–18",
    "sourceLevel": "Zanzibar ministry hosted culture page; body authorship/mediation not established",
    "languageMediation": "English composite historical prose; some UTF8 mojibake; use attributed government-hosted account only",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.zanzibarCourt.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mombasa-zanzibar-1700-1880.c9",
      "history.history-mombasa-zanzibar-1700-1880.c10",
      "history.history-mombasa-zanzibar-1700-1880.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "wali",
    "text": "1837 Mombasa Said’s fort garrison Town wali Miles colonial retrospective QDL normalized OCR Original convention uncollated Separate offices",
    "claim": "history.history-mombasa-zanzibar-1700-1880.c4",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "coercion",
    "text": "1837 Mombasa Rashid/Mazrui companions Invited into fort Khalid seizes them Miles colonial retrospective QDL normalized OCR Not consensual transfer",
    "claim": "history.history-mombasa-zanzibar-1700-1880.c8",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "zanzibarCourt",
    "text": "1840 Zanzibar Said’s court Enslaved plantation labour Government-hosted composite Author unestablished Not sole-capital abandonment",
    "claim": "history.history-mombasa-zanzibar-1700-1880.c12",
    "countedWords": 15,
    "whitespaceTokens": 16
  },
  {
    "id": "comparison",
    "text": "1837 Mombasa Fort garrison/town wali Rashid/Mazrui seizure Miles retrospective OCR Original convention uncollated 1840 Zanzibar court Enslaved labour Composite Author unknown Different powers",
    "claim": "history.history-mombasa-zanzibar-1700-1880.c13",
    "countedWords": 23,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "wali",
  "coercion",
  "zanzibarCourt"
];
export const ATTACHMENTS = {
  "wali": [
    "wali"
  ],
  "coercion": [
    "coercion"
  ],
  "zanzibarCourt": [
    "zanzibarCourt"
  ]
};
export const PREDICTION = {
  "question": "Does a fort garrison establish the same authority as a town office or a court?",
  "options": [
    "Same authority",
    "Distinct authority"
  ],
  "answer": 1
};
export const REVEAL = "Miles’s colonial retrospective separates the fort garrison from Mombasa’s town wali and describes Khalid’s coercive seizure of Rashid and Mazrui companions. The government-hosted composite places Said’s court in Zanzibar alongside enslaved plantation labour. A fort, town office and court are different relations; court presence does not establish sole-capital abandonment, local consent or identical power.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "fort-garrison-town-wali-coercive-seizure-and-enslaved-court-labour";

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
