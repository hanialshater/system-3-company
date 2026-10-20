export const DOCUMENTS = [
  {
    "id": "meccaOffice",
    "text": "Ottoman Ali Haydar appointment 1916 did not secure entry to Mecca",
    "requiredContext": "Turkish scholarly account; do not import later 1924 episode or exact day. No unanimous local assent.",
    "citation": "TDV İslâm Ansiklopedisi institutional scholarly article. Language/edition: Turkish; paraphrase; not independently reviewed. Representation: web-tool normalized body with line/page locators; not raw HTML/PDF. Transport limitation: Actual representation/transport in immutable baseline; no origin HTTP200 invented.",
    "sourceUrl": "https://islamansiklopedisi.org.tr/mekke",
    "locator": "normalizedL490–491",
    "sourceLevel": "TDV İslâm Ansiklopedisi institutional scholarly article",
    "languageMediation": "Turkish; paraphrase; not independently reviewed",
    "representation": "web-tool normalized body with line/page locators; not raw HTML/PDF",
    "fieldAddresses": [
      "witnesses.meccaOffice.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mecca-cairo-1700-1920.c1",
      "history.history-mecca-cairo-1700-1920.c2",
      "history.history-mecca-cairo-1700-1920.c3"
    ]
  },
  {
    "id": "cairoOffice",
    "text": "Ali Pasha Mubarak public works minister under Khedive Ismail",
    "requiredContext": "Selected ministry relationship only, not entire city administration or modernization judgement.",
    "citation": "Egyptian Ministry of Tourism and Antiquities. Language/edition: English institutional historical account. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://egymonuments.gov.eg/en/collections/khedivial-cairo/",
    "locator": "text80",
    "sourceLevel": "Egyptian Ministry of Tourism and Antiquities",
    "languageMediation": "English institutional historical account",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.cairoOffice.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mecca-cairo-1700-1920.c5",
      "history.history-mecca-cairo-1700-1920.c6",
      "history.history-mecca-cairo-1700-1920.c7"
    ]
  },
  {
    "id": "protectorate",
    "text": "Blake’s 20 December 1914 report reports British protectorate notice",
    "requiredContext": "Contemporary diplomatic report from Tangier, not original British instrument.",
    "citation": "US diplomatic telegram from Tangier; Office of Historian edition. Language/edition: English contemporary report, not British proclamation original. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://history.state.gov/historicaldocuments/frus1914/d1639",
    "locator": "text60–74 FRUS1914d1639",
    "sourceLevel": "US diplomatic telegram from Tangier; Office of Historian edition",
    "languageMediation": "English contemporary report, not British proclamation original",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.protectorate.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mecca-cairo-1700-1920.c9",
      "history.history-mecca-cairo-1700-1920.c10",
      "history.history-mecca-cairo-1700-1920.c11"
    ]
  },
  {
    "id": "recognition",
    "text": "Lansing 1919 explains qualified US recognition of British protectorate",
    "requiredContext": "Retain qualifications and reservations; recognition by US not consent of Egypt’s people or all powers.",
    "citation": "US Secretary of State correspondence; Office of Historian edition. Language/edition: English; US recognition scope, not popular consent. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://history.state.gov/historicaldocuments/frus1919v02/d137",
    "locator": "text65–78 FRUS1919IId137",
    "sourceLevel": "US Secretary of State correspondence; Office of Historian edition",
    "languageMediation": "English; US recognition scope, not popular consent",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.recognition.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mecca-cairo-1700-1920.c13",
      "history.history-mecca-cairo-1700-1920.c14",
      "history.history-mecca-cairo-1700-1920.c15"
    ]
  }
];
export const FRAMES = [
  {
    "id": "meccaOffice",
    "text": "1916 Mecca Ottoman-appointed Ali Haydar Cannot enter Hussein holds position TDV scholarly account Working English paraphrase Appointment ≠ presence",
    "claim": "history.history-mecca-cairo-1700-1920.c4",
    "countedWords": 19,
    "whitespaceTokens": 21
  },
  {
    "id": "cairoOffice",
    "text": "Cairo Khedive Ismail Ali Pasha Mubarak Public Works minister Ministry retrospective Not every local office",
    "claim": "history.history-mecca-cairo-1700-1920.c8",
    "countedWords": 17,
    "whitespaceTokens": 17
  },
  {
    "id": "protectorate",
    "text": "1914 Egypt British protectorate Blake diplomatic report Original proclamation uncollated Reported change ≠ all local institutions",
    "claim": "history.history-mecca-cairo-1700-1920.c12",
    "countedWords": 16,
    "whitespaceTokens": 18
  },
  {
    "id": "recognition",
    "text": "1919 Egypt US recognition Qualified by British control described in1914 notice Lansing explanation Not universal endorsement",
    "claim": "history.history-mecca-cairo-1700-1920.c16",
    "countedWords": 17,
    "whitespaceTokens": 18
  },
  {
    "id": "comparison",
    "text": "1916 Mecca Ali Haydar appointed Cannot enter TDV paraphrase Cairo Khedivial minister Ministry account 1914 Protectorate report 1919 Qualified US recognition 1914 notice control only Different transitions",
    "claim": "history.history-mecca-cairo-1700-1920.c17",
    "countedWords": 25,
    "whitespaceTokens": 29
  }
];
export const REQUIRED = [
  "meccaOffice",
  "cairoOffice",
  "protectorate",
  "recognition"
];
export const ATTACHMENTS = {
  "meccaOffice": [
    "meccaOffice"
  ],
  "cairoOffice": [
    "cairoOffice"
  ],
  "protectorate": [
    "protectorate"
  ],
  "recognition": [
    "recognition"
  ]
};
export const PREDICTION = {
  "question": "Does a named imperial appointment establish the same actual control or transition in both cities?",
  "options": [
    "Same control",
    "Distinct control"
  ],
  "answer": 1
};
export const REVEAL = "The TDV account distinguishes an Ottoman appointment from Ali Haydar’s inability to enter Mecca. Cairo’s ministerial relationship is separately recorded. Blake reports Egypt’s British protectorate; Lansing later explains qualified US recognition. Appointment, ministerial office, reported protectorate and conditional recognition do not establish identical control, popular consent or one simultaneous wartime transition.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "appointment-without-entry-ministry-protectorate-and-qualified-recognition";

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
