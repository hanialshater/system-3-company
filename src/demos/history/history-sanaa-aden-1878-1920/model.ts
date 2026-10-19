export const DOCUMENTS = [
  {
    "id": "sanaaGovernor",
    "text": "Ottoman Hasan Edib Pasha appointed governor-general at Sanaa June1891",
    "requiredContext": "Only bounded1891appointment; conflicting1914Taiz/1919Sanaa headquarters claims excluded. No continuous city control inferred.",
    "citation": "C.U. Aitchison compilation; Government of India revised colonial edition; Tufts custodian. Language/edition: English. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated. C. U. Aitchison, Government of India compilation XI, revised through 1930; Delhi 1933; Tufts custodian.",
    "sourceUrl": "https://dl.tufts.edu/downloads/6108vp897?filename=9g54xw036.pdf",
    "locator": "PDF73/printed39 first paragraph; titlePDF identifies AitchisonXI1933; surrounding Turkish Governor-General/Ottoman troops passage, same acquired compilation",
    "sourceLevel": "C.U. Aitchison compilation; Government of India revised colonial edition; Tufts custodian",
    "languageMediation": "English",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.sanaaGovernor.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-sanaa-aden-1878-1920.c1",
      "history.history-sanaa-aden-1878-1920.c2",
      "history.history-sanaa-aden-1878-1920.c3"
    ]
  },
  {
    "id": "adenOffices",
    "text": "1881–1882 Aden report separately records Political Resident and Cantonment Magistrate offices; Blair’s4March1882 Resident appointment is not a magistrate appointment",
    "requiredContext": "Direct office evidence, not proof1937CrownColony nomenclature inside1882. OCR normalized response not rawHTML; no universal rule/consent. Offices separated; Blair is not assigned magistracy.1881–1882report period is not a new1882magistrate appointment.",
    "citation": "James Blair/Bombay administration,13May1882; BL IOR/V/10/553/12; QDL automatic OCR. Language/edition: English; no manuscript collation. Representation: web-tool normalized body including line numbers; NOT raw HTML. Transport limitation: Actual representation/transport in immutable baseline; no origin HTTP200 invented.",
    "sourceUrl": "https://www.qdl.qa/en/archive/81055/vdc_100152862997.0x00000a",
    "locator": "QDL f202r normalizedL225–240, especially227–231: Resident Blair; separate Sealy/Walsh magistracy/absence duties with1881context",
    "sourceLevel": "James Blair/Bombay administration,13May1882; BL IOR/V/10/553/12; QDL automatic OCR",
    "languageMediation": "English; no manuscript collation",
    "representation": "web-tool normalized body including line numbers; NOT raw HTML",
    "fieldAddresses": [
      "witnesses.adenOffices.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-sanaa-aden-1878-1920.c5",
      "history.history-sanaa-aden-1878-1920.c6",
      "history.history-sanaa-aden-1878-1920.c7"
    ]
  },
  {
    "id": "birAli",
    "text": "1888 protection for named Wahidi sultans’ Bir Ali dependencies; foreign dealings require British sanction",
    "requiredContext": "Signature30April1888 versus ratification26February1890 distinct. Named parties/dependencies, not all Yemen; original manuscript uncollated.",
    "citation": "C.U. Aitchison compilation; Government of India revised colonial edition; Tufts custodian. Language/edition: English. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated. C. U. Aitchison, Government of India compilation XI, revised through 1930; Delhi 1933; Tufts custodian.",
    "sourceUrl": "https://dl.tufts.edu/downloads/6108vp897?filename=9g54xw036.pdf",
    "locator": "PDF183–184/printed149–150 NoLXII Arts1–3, signatures/ratification; visually inspected",
    "sourceLevel": "C.U. Aitchison compilation; Government of India revised colonial edition; Tufts custodian",
    "languageMediation": "English",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.birAli.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-sanaa-aden-1878-1920.c9",
      "history.history-sanaa-aden-1878-1920.c10",
      "history.history-sanaa-aden-1878-1920.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "sanaaGovernor",
    "text": "1891 Sanaa Ottoman Hasan Edib Pasha Governor-General Aitchison colonial account Continuous headquarters disputed",
    "claim": "history.history-sanaa-aden-1878-1920.c4",
    "countedWords": 14,
    "whitespaceTokens": 15
  },
  {
    "id": "adenOffices",
    "text": "1881–1882 Aden Political Resident Separate Cantonment Magistrate Colonial report QDL normalized body Original uncollated Not neighboring sultans’ government",
    "claim": "history.history-sanaa-aden-1878-1920.c8",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "birAli",
    "text": "1888 Bir Ali Wahidi sultans’ dependencies British protection Foreign dealings require British sanction 1890 Ratification Aitchison compilation Not Aden city",
    "claim": "history.history-sanaa-aden-1878-1920.c12",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "1891 Sanaa Ottoman Governor-General Colonial account 1882 Aden Resident/magistrate Colonial report 1888 Bir Ali dependencies Protection Foreign dealings require British sanction Compilation Different scopes",
    "claim": "history.history-sanaa-aden-1878-1920.c13",
    "countedWords": 23,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "sanaaGovernor",
  "adenOffices",
  "birAli"
];
export const ATTACHMENTS = {
  "sanaaGovernor": [
    "sanaaGovernor"
  ],
  "adenOffices": [
    "adenOffices"
  ],
  "birAli": [
    "birAli"
  ]
};
export const PREDICTION = {
  "question": "Does a neighboring protection agreement establish the same governing offices as Aden or Sanaa?",
  "options": [
    "Same offices",
    "Distinct offices"
  ],
  "answer": 1
};
export const REVEAL = "Aitchison’s colonial account names Sanaa’s 1891 governor-general. Aden’s report names a Resident and magistrate. The Bir Ali agreement instead prescribes protection and restricted foreign dealings for named Wahidi dependencies, with later ratification. These are different governing relations, not proof neighboring protection established Aden’s city offices or universal consent.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "ottoman-appointment-aden-offices-and-dependency-protection";

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
