export const DOCUMENTS = [
  {
    "id": "dagon",
    "text": "Alaungpaya took existing Dagon and named it Yangon 1755",
    "requiredContext": "Institutional tourism narrative narrow fact only; no general modern praise, exactancientage or no earlier community inferred.",
    "sourceUrl": "https://tourism.gov.mm/en/regions/yangon",
    "locator": "indexed143 historical introduction",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.dagon.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-yangon-mandalay-1700-1900.c1",
      "history.history-yangon-mandalay-1700-1900.c2"
    ]
  },
  {
    "id": "mandalayCapital",
    "text": "Mindon planned/founded Mandalay 1857; capital inauguration 1859",
    "requiredContext": "Modern institutional account, not original royal order or proof no earlier inhabitants.",
    "sourceUrl": "https://www.myanmargeneva.org/mandalay/",
    "locator": "indexed27 Myanmar Geneva mission",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.mandalayCapital.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-yangon-mandalay-1700-1900.c4",
      "history.history-yangon-mandalay-1700-1900.c5"
    ]
  },
  {
    "id": "rangoonSeizure",
    "text": "Rangoon captured 12–14 April 1852; lower annexation later",
    "requiredContext": "NAM narrative, not universal assent or British right. Annexation exact date only if exposed with its source; comparison selects capture 1852.",
    "sourceUrl": "https://www.nam.ac.uk/explore/second-burma-war",
    "locator": "indexed48 and aftermath section",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.rangoonSeizure.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-yangon-mandalay-1700-1900.c7",
      "history.history-yangon-mandalay-1700-1900.c8"
    ]
  },
  {
    "id": "mandalayOccupation",
    "text": "Mandalay occupation 28 November 1885; Thibaw surrendered 29 November",
    "requiredContext": "Do not adopt uncorroborated exact Upper Burma annexation date. Keep royal institution/exile and different surrender day as attributed account.",
    "sourceUrl": "https://www.nam.ac.uk/explore/timeline-burma-army",
    "locator": "indexed69–72",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.mandalayOccupation.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-yangon-mandalay-1700-1900.c10",
      "history.history-yangon-mandalay-1700-1900.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "dagon",
    "text": "1755 Existing Dagon→Yangon Alaungpaya Tourism retrospective account Renaming ≠ empty-site foundation",
    "claim": "history.history-yangon-mandalay-1700-1900.c3",
    "countedWords": 11,
    "whitespaceTokens": 13
  },
  {
    "id": "mandalayCapital",
    "text": "1857 Mindon Mandalay planning/foundation 1859 Capital inauguration Mission retrospective account Distinct events; not empty land",
    "claim": "history.history-yangon-mandalay-1700-1900.c6",
    "countedWords": 15,
    "whitespaceTokens": 17
  },
  {
    "id": "rangoonSeizure",
    "text": "1852 Rangoon capture British forces NAM retrospective account Fighting precedes later annexation No signed final peace treaty",
    "claim": "history.history-yangon-mandalay-1700-1900.c9",
    "countedWords": 18,
    "whitespaceTokens": 19
  },
  {
    "id": "mandalayOccupation",
    "text": "1885-11-28 Mandalay occupation 1885-11-29 Thibaw surrender NAM retrospective account Occupation ≠ annexation or consent",
    "claim": "history.history-yangon-mandalay-1700-1900.c12",
    "countedWords": 13,
    "whitespaceTokens": 16
  },
  {
    "id": "comparison",
    "text": "1755 Dagon→Yangon Tourism account 1857/1859 Mandalay foundation/inauguration Mission account 1852 Rangoon capture 1885 Mandalay occupation/surrender NAM accounts Different acts; no empty land",
    "claim": "history.history-yangon-mandalay-1700-1900.c13",
    "countedWords": 20,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "dagon",
  "mandalayCapital",
  "rangoonSeizure",
  "mandalayOccupation"
];
export const ATTACHMENTS = {
  "dagon": [
    "dagon"
  ],
  "mandalayCapital": [
    "mandalayCapital"
  ],
  "rangoonSeizure": [
    "rangoonSeizure"
  ],
  "mandalayOccupation": [
    "mandalayOccupation"
  ]
};
export const PREDICTION = {
  "question": "Do common later colonial labels imply simultaneous city foundation and occupation?",
  "options": [
    "One simultaneous transition",
    "Different dated acts"
  ],
  "answer": 1
};
export const REVEAL = "Myanmar’s tourism account describes existing Dagon renamed Yangon. Its mission distinguishes Mandalay’s planning from capital inauguration. NAM describes Rangoon’s 1852 capture and Mandalay’s 1885 occupation before Thibaw’s surrender. These are distinct city and conquest events, not simultaneous foundation, timeless British rule or consent; occupation and annexation must not be merged.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "renaming-planned-capital-inauguration-and-distinct-seizures";

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
