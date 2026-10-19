export const DOCUMENTS = [
  {
    "id": "customs",
    "text": "1887 port revenue security; French/Malagasy customs coexistence, absorption date unknown",
    "requiredContext": "French modern institutional account working English paraphrase. Loan-security supervision not total sovereignty; no invented final absorption date.",
    "sourceUrl": "https://www.douanes.gov.mg/qui-sommes-nous/historique/",
    "locator": "indexed89–94,102–103",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.customs.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-antananarivo-toamasina-1880-1960.c1",
      "history.history-antananarivo-toamasina-1880-1960.c2"
    ]
  },
  {
    "id": "queenBill",
    "text": "1896 introduced bill refers Antananarivo troops and retaining Queen Ranavalo functions",
    "requiredContext": "Bill introduced 30 May 1896, not enacted statute or actual fulfilled retained powers. Troops entering Antananarivo is not Ambohimanga location; minimal facts only.",
    "sourceUrl": "https://history.state.gov/historicaldocuments/frus1896/d102",
    "locator": "indexed169–177 and244–254; Times enclosure in FRUSd102",
    "sourceLevel": "primary transmitted bill proposal, not enacted law or implementation",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.queenBill.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-antananarivo-toamasina-1880-1960.c4",
      "history.history-antananarivo-toamasina-1880-1960.c5"
    ]
  },
  {
    "id": "tamataveNotice",
    "text": "Laroche notice transfers new American consular cases to French tribunals from 16 October 1896",
    "requiredContext": "Specific American consular jurisdiction notice, not evidence every Malagasy institution ceased. Distinguish notice/date from introduced bill.",
    "sourceUrl": "https://history.state.gov/historicaldocuments/frus1897/d146",
    "locator": "indexed65–85, FRUS1897d146",
    "sourceLevel": "primary diplomatic transmission",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.tamataveNotice.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-antananarivo-toamasina-1880-1960.c7",
      "history.history-antananarivo-toamasina-1880-1960.c8"
    ]
  }
];
export const FRAMES = [
  {
    "id": "customs",
    "text": "1887 Toamasina port revenue security French/Malagasy customs coexist Malagasy Customs retrospective Working English paraphrase Complete absorption date unknown",
    "claim": "history.history-antananarivo-toamasina-1880-1960.c3",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "queenBill",
    "text": "1896 Antananarivo Queen Ranavalo functions proposed French bill via Times/FRUS Proposal ≠ enactment French sovereignty claim ≠ legitimacy",
    "claim": "history.history-antananarivo-toamasina-1880-1960.c6",
    "countedWords": 17,
    "whitespaceTokens": 20
  },
  {
    "id": "tamataveNotice",
    "text": "1896 Tamatave American consular cases→French tribunals From 16 October Laroche notice via FRUS Claim ≠ universal implementation",
    "claim": "history.history-antananarivo-toamasina-1880-1960.c9",
    "countedWords": 16,
    "whitespaceTokens": 19
  },
  {
    "id": "comparison",
    "text": "Antananarivo Queen functions proposed Bill≠enactment Times/FRUS Toamasina customs coexist Absorption date unknown Malagasy Customs Tamatave American cases→French tribunals Laroche notice/FRUS Different scopes",
    "claim": "history.history-antananarivo-toamasina-1880-1960.c10",
    "countedWords": 24,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "customs",
  "queenBill",
  "tamataveNotice"
];
export const ATTACHMENTS = {
  "customs": [
    "customs"
  ],
  "queenBill": [
    "queenBill"
  ],
  "tamataveNotice": [
    "tamataveNotice"
  ]
};
export const PREDICTION = {
  "question": "Does a French colonial claim establish instant disappearance of Malagasy institutions at both cities?",
  "options": [
    "Uniform scope",
    "Different scopes"
  ],
  "answer": 1
};
export const REVEAL = "The transmitted French bill proposes retaining Queen Ranavalo’s internal functions; it is not enactment. Malagasy Customs describes port supervision and coexisting services without a final absorption date. Laroche’s notice concerns American consular cases at Tamatave. These distinct witnesses do not establish instant uniform replacement, legitimate title or consent.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "coexisting-customs-proposed-royal-function-and-consular-scope";

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
