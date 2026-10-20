export const DOCUMENTS = [
  {
    "id": "capital",
    "text": "1782 capital relocation and administrative buildings",
    "requiredContext": "Current royal account, not original 1782 decree; city-capital designation not direct local rule everywhere.",
    "sourceUrl": "https://www.royalgrandpalace.th/en/discover/history/",
    "locator": "indexed33 Grand Palace history",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.capital.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-bangkok-chiang-mai-1600-1900.c1",
      "history.history-bangkok-chiang-mai-1600-1900.c2"
    ]
  },
  {
    "id": "localRuler",
    "text": "Kawila appointed Chiang Mai ruler in tributary relation under Rama I",
    "requiredContext": "Thai institutional retrospective account working English paraphrase; no exact Monthon reform date or original appointment instrument collated.",
    "sourceUrl": "https://chiangmai.moc.go.th/th/content/category/detail/id/17/iid/1055",
    "locator": "indexed88 Kawila/RamaI paragraph",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.localRuler.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-bangkok-chiang-mai-1600-1900.c4",
      "history.history-bangkok-chiang-mai-1600-1900.c5"
    ]
  }
];
export const FRAMES = [
  {
    "id": "capital",
    "text": "1782 Bangkok capital relocation Administrative offices Royal Palace retrospective account Not timeless capital",
    "claim": "history.history-bangkok-chiang-mai-1600-1900.c3",
    "countedWords": 14,
    "whitespaceTokens": 15
  },
  {
    "id": "localRuler",
    "text": "Chiang Mai Kawila ruler Rama I tributary relation Commerce institutional account Working English paraphrase Original appointment instrument uncollated Not uniform direct administration",
    "claim": "history.history-bangkok-chiang-mai-1600-1900.c6",
    "countedWords": 24,
    "whitespaceTokens": 24
  },
  {
    "id": "comparison",
    "text": "1782 Bangkok capital Royal Palace account Chiang Mai Kawila local ruler Tributary relation under Rama I Commerce account Working English paraphrase Capital≠uniform rule",
    "claim": "history.history-bangkok-chiang-mai-1600-1900.c7",
    "countedWords": 24,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "capital",
  "localRuler"
];
export const ATTACHMENTS = {
  "capital": [
    "capital"
  ],
  "localRuler": [
    "localRuler"
  ]
};
export const PREDICTION = {
  "question": "Does Bangkok’s capital designation itself establish direct uniform administration in Chiang Mai?",
  "options": [
    "Capital designation proves uniform local rule",
    "Capital and tributary local institution are distinct"
  ],
  "answer": 1
};
export const REVEAL = "The Royal Palace account describes Bangkok’s 1782 capital relocation. Chiang Mai’s institutional account names Kawila as local ruler under a tributary relationship with RamaI. A central capital and a named local ruling institution are different relations. Working paraphrase and retrospective accounts do not establish timeless direct rule or universal assent.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "capital-relocation-and-tributary-local-ruler";

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
