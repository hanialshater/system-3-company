export const DOCUMENTS = [
  {
    "id": "capital",
    "text": "Joseon capital ministries;1405 Changdeokgung palace",
    "requiredContext": "Modern city orientation;1394 antecedent explicitly outside 1400–1900, no stale khanate label or universal participation.",
    "sourceUrl": "https://english.seoul.go.kr/seoul-views/meaning-of-seoul/1-history/",
    "locator": "indexed239–242",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.capital.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-seoul-busan-1400-1900.c1",
      "history.history-seoul-busan-1400-1900.c2"
    ]
  },
  {
    "id": "imperial",
    "text": "Gojong’s 1897 Gyeongungung-based imperial transition",
    "requiredContext": "Korean institutional synthesis agent paraphrase, not original proclamation or proof all foreign interference ended.",
    "sourceUrl": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r400100",
    "locator": "indexed47 NIKH Gojong account",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.imperial.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-seoul-busan-1400-1900.c4",
      "history.history-seoul-busan-1400-1900.c5"
    ]
  },
  {
    "id": "foreignOffice",
    "text": "Dongnae magistrate responsible for Waegwan/foreign affairs",
    "requiredContext": "Exact promotion 1547/1574 dispute unselected. Normalized body hash not rawHTML/HTTP 200; local magistrate not all sovereignty.",
    "sourceUrl": "https://www.busan.go.kr/eng/history-of-busan",
    "locator": "normalized English bodyL266–268",
    "sourceLevel": "local institutional web body; normalized representation, direct HTTP401",
    "representation": "Web tool normalized source-body response; NOT raw HTML or raw-source SHA",
    "fieldAddresses": [
      "witnesses.foreignOffice.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-seoul-busan-1400-1900.c7",
      "history.history-seoul-busan-1400-1900.c8"
    ]
  },
  {
    "id": "portOffice",
    "text": "1883 Busan gamri concurrently held by Dongnae official; customs context and 1876 opening coerced by Japan",
    "requiredContext": "DirectHTTP 401 preserved. No post 1900 events selected. Coercion in opening context ordinary-flow; source says original appointment not inspected. The existing Korean L460–461 account identifies Japan compelling treaty conclusion; no universal-control inference.",
    "sourceUrl": "https://www.busan.go.kr/historyopen/view",
    "locator": "normalized Korean bodyL460–462;1883-08-19",
    "sourceLevel": "local institutional web body in Korean; normalized representation, direct HTTP401",
    "representation": "Web tool normalized source-body response; NOT raw HTML or raw-source SHA",
    "fieldAddresses": [
      "witnesses.portOffice.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-seoul-busan-1400-1900.c10",
      "history.history-seoul-busan-1400-1900.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "capital",
    "text": "1405 Seoul royal palace Joseon ministries Seoul institutional account 1394 capital origin antecedent Not every institution unchanged",
    "claim": "history.history-seoul-busan-1400-1900.c3",
    "countedWords": 17,
    "whitespaceTokens": 19
  },
  {
    "id": "imperial",
    "text": "1897 Gojong Gyeongungung Imperial transition NIKH synthesis Working English paraphrase Original proclamation uncollated Not universal independence or consent",
    "claim": "history.history-seoul-busan-1400-1900.c6",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "foreignOffice",
    "text": "Busan Dongnae magistrate Waegwan/foreign affairs Municipal account Normalized web body Direct HTTP401 Not identical to Seoul court",
    "claim": "history.history-seoul-busan-1400-1900.c9",
    "countedWords": 19,
    "whitespaceTokens": 19
  },
  {
    "id": "portOffice",
    "text": "1883 Busan gamri Dongnae official concurrently Municipal account Working English paraphrase 1876 Japan coerced opening Normalized body; original instrument uncollated",
    "claim": "history.history-seoul-busan-1400-1900.c12",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "Seoul Joseon court 1897 Imperial transition Seoul/NIKH accounts Busan Dongnae Waegwan/1883 gamri Municipal accounts Working paraphrase 1876 Japan coerced opening Different institutions",
    "claim": "history.history-seoul-busan-1400-1900.c13",
    "countedWords": 22,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "capital",
  "imperial",
  "foreignOffice",
  "portOffice"
];
export const ATTACHMENTS = {
  "capital": [
    "capital"
  ],
  "imperial": [
    "imperial"
  ],
  "foreignOffice": [
    "foreignOffice"
  ],
  "portOffice": [
    "portOffice"
  ]
};
export const PREDICTION = {
  "question": "Do a royal capital and Busan’s foreign-trade offices establish one uniform unchanged institution?",
  "options": [
    "Uniform offices",
    "Distinct offices"
  ],
  "answer": 1
};
export const REVEAL = "Seoul’s account describes Joseon court institutions; NIKH describes Gojong’s 1897 imperial transition. Busan’s accounts distinguish Dongnae’s foreign-affairs role and the 1883 gamri office amid coerced opening. A shared dynasty name does not establish identical court and port institutions, uninterrupted local powers or consent. Korean material is working paraphrase, not original-instrument collation.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "royal-court-imperial-transition-and-concurrent-port-offices";

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
