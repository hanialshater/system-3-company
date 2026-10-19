export const DOCUMENTS = [
  {
    "id": "diwani",
    "text": "1765 Diwani revenue rights;1772 direct assumption, distinct Nawab nizamat",
    "requiredContext": "Bangladesh Asiatic Society synthesis; not original Mughal grant. Revenue authority does not mean every sovereign function.",
    "sourceUrl": "https://en.banglapedia.org/index.php?title=Quinquennial_Settlement",
    "locator": "indexed6–8, Quinquennial Settlement opening",
    "sourceLevel": "Bangladesh Asiatic Society historical synthesis",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.diwani.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-dhaka-patna-1700-1900.c1",
      "history.history-dhaka-patna-1700-1900.c2"
    ]
  },
  {
    "id": "dhakaRevenue",
    "text": "Dacca Provincial Council revenue/general consultations 1776",
    "requiredContext": "Catalogue identifies holdings/date, not actual council decisions or full operational powers.",
    "sourceUrl": "https://searcharchives.bl.uk/?q=040-000175818&sort=hierarchy",
    "locator": "indexed35–49; IOR/G/15/14",
    "sourceLevel": "archival catalogue, not inspected proceedings",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.dhakaRevenue.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-dhaka-patna-1700-1900.c4",
      "history.history-dhaka-patna-1700-1900.c5"
    ]
  },
  {
    "id": "patnaRevenue",
    "text": "Patna Provincial Council of Revenue consultations 1772–1780",
    "requiredContext": "Exact previous acquired catalogue reused, not fresh source request or inspected proceedings.",
    "sourceUrl": "https://searcharchives.bl.uk/catalog/036-000177185",
    "locator": "indexed38; IOR/G/28",
    "sourceLevel": "archival catalogue, not inspected proceedings",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.patnaRevenue.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-dhaka-patna-1700-1900.c7",
      "history.history-dhaka-patna-1700-1900.c8"
    ]
  },
  {
    "id": "dhakaMunicipal",
    "text": "Dhaka 1772 European magistrate administration versus 1864 municipality",
    "requiredContext": "Bengali institutional account working English paraphrase;1772 original orders uncollated. Municipality not interchangeable with magistracy/revenue council.",
    "sourceUrl": "https://dscc.gov.bd/pages/static-pages/6922defc933eb65569e1eedf",
    "locator": "indexed91–93; municipality1August1864",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.dhakaMunicipal.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-dhaka-patna-1700-1900.c10",
      "history.history-dhaka-patna-1700-1900.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "diwani",
    "text": "1765 Company Diwani Revenue rights ≠ Nawab nizamat 1772 Direct assumption Banglapedia synthesis Original grant uncollated",
    "claim": "history.history-dhaka-patna-1700-1900.c3",
    "countedWords": 15,
    "whitespaceTokens": 18
  },
  {
    "id": "dhakaRevenue",
    "text": "1776 Dacca Provincial Council Revenue consultations British Library catalogue Proceedings uninspected No complete powers inferred",
    "claim": "history.history-dhaka-patna-1700-1900.c6",
    "countedWords": 16,
    "whitespaceTokens": 17
  },
  {
    "id": "patnaRevenue",
    "text": "1772–1780 Patna Provincial Council Revenue consultations British Library catalogue Proceedings uninspected No complete powers inferred",
    "claim": "history.history-dhaka-patna-1700-1900.c9",
    "countedWords": 16,
    "whitespaceTokens": 17
  },
  {
    "id": "dhakaMunicipal",
    "text": "1772 Dhaka European magistrate 1864 Municipality DSCC retrospective Original orders uncollated Working English paraphrase Distinct functions; no universal representation",
    "claim": "history.history-dhaka-patna-1700-1900.c12",
    "countedWords": 19,
    "whitespaceTokens": 21
  },
  {
    "id": "comparison",
    "text": "1765 Company Diwani Revenue ≠ nizamat 1772 Direct assumption Banglapedia 1776 Dacca/1772–1780 Patna revenue councils BL catalogues Proceedings uninspected Dhaka magistrate≠municipality DSCC working paraphrase",
    "claim": "history.history-dhaka-patna-1700-1900.c13",
    "countedWords": 22,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "diwani",
  "dhakaRevenue",
  "patnaRevenue",
  "dhakaMunicipal"
];
export const ATTACHMENTS = {
  "diwani": [
    "diwani"
  ],
  "dhakaRevenue": [
    "dhakaRevenue"
  ],
  "patnaRevenue": [
    "patnaRevenue"
  ],
  "dhakaMunicipal": [
    "dhakaMunicipal"
  ]
};
export const PREDICTION = {
  "question": "Does a Company revenue transition establish one identical local institution in Dhaka and Patna?",
  "options": [
    "Same function",
    "Distinct functions"
  ],
  "answer": 1
};
export const REVEAL = "Banglapedia distinguishes Company revenue rights from Nawab nizamat and later direct revenue assumption. British Library catalogues describe Dacca and Patna revenue-council holdings, not inspected decisions. Dhaka’s municipal account separates magistracy from municipality. Shared revenue authority does not make these local functions identical or establish total sovereignty.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "diwani-nizamat-revenue-catalogues-and-municipality";

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
