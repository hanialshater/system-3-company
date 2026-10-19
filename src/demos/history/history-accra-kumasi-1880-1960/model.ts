export const DOCUMENTS = [
  {
    "id": "oath",
    "text": "Asantehene office and chiefs’ allegiance oaths",
    "mediation": "Manhyia museum retrospective account",
    "requiredContext": "Museum objects attest an attributed institutional description; no precise historical year assigned to this oath or claim of universal allegiance.",
    "sourceUrl": "https://manhyiapalacemuseum.org/come-visit-and-see-returned-artefacts-asantehene/",
    "locator": "indexed text71",
    "fieldAddresses": [],
    "claims": [
      "history.history-accra-kumasi-1880-1960.c1",
      "history.history-accra-kumasi-1880-1960.c2"
    ]
  },
  {
    "id": "occupation",
    "text": "1896 Kumasi occupation; forced protection",
    "mediation": "British National Army Museum account",
    "requiredContext": "Prempeh instructed non-resistance according to this account; non-resistance is not consent. No exact exile itinerary selected.",
    "sourceUrl": "https://collection.nam.ac.uk/detail.php?acc=1996-08-172-4",
    "locator": "indexed text20; accession1996-08-172-4",
    "fieldAddresses": [],
    "claims": [
      "history.history-accra-kumasi-1880-1960.c3",
      "history.history-accra-kumasi-1880-1960.c4"
    ]
  },
  {
    "id": "council",
    "text": "1898 Accra Town Council",
    "mediation": "Accra municipal retrospective account",
    "requiredContext": "Under1894 ordinance according to council account; not a Kumasi office or universal representation.",
    "sourceUrl": "https://www.ama.gov.gh/thehistory.php",
    "locator": "indexed text38",
    "fieldAddresses": [],
    "claims": [
      "history.history-accra-kumasi-1880-1960.c5",
      "history.history-accra-kumasi-1880-1960.c6"
    ]
  },
  {
    "id": "administration",
    "text": "1902 separate Ashanti administration; Chief Commissioner under Gold Coast Governor",
    "mediation": "Ghana Judicial Service retrospective account",
    "requiredContext": "Judiciary retrospective account; original Order uncollated. The1902 relation is separate from the coastal Colony; no universal administrative practice or assent inferred.",
    "sourceUrl": "https://judicial.gov.gh/jsweb/index.php/before-independence",
    "locator": "indexed text198–199",
    "fieldAddresses": [
      "v2.administration.relation"
    ],
    "claims": [
      "history.history-accra-kumasi-1880-1960.c7",
      "history.history-accra-kumasi-1880-1960.c8",
      "history.history-accra-kumasi-1880-1960.c9"
    ]
  }
];
export const FRAMES = [
  {
    "id": "oath",
    "text": "Asantehene oath Chiefs’ allegiance Manhyia museum retrospective; undated No universal assent",
    "claim": "history.history-accra-kumasi-1880-1960.c10",
    "countedWords": 13,
    "whitespaceTokens": 13
  },
  {
    "id": "occupation",
    "text": "1896 Kumasi occupation Forced protection Prempeh ordered nonresistance NAM retrospective account Nonresistance ≠ consent",
    "claim": "history.history-accra-kumasi-1880-1960.c11",
    "countedWords": 14,
    "whitespaceTokens": 16
  },
  {
    "id": "council",
    "text": "1898 Accra Town Council Municipal retrospective account Under 1894 ordinance Not Kumasi’s office or universal representation",
    "claim": "history.history-accra-kumasi-1880-1960.c12",
    "countedWords": 16,
    "whitespaceTokens": 18
  },
  {
    "id": "administration",
    "text": "1902 Separate Ashanti administration Chief Commissioner under Gold Coast Governor Judiciary retrospective Original Order uncollated No universal practice or assent inferred",
    "claim": "history.history-accra-kumasi-1880-1960.c13",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Asantehene oath Manhyia 1896 Kumasi occupation Forced protection NAM 1898 Accra council Municipal account 1902 Separate Ashanti administration Chief Commissioner under Gold Coast Governor Judiciary retrospective",
    "claim": "history.history-accra-kumasi-1880-1960.c14",
    "countedWords": 25,
    "whitespaceTokens": 28
  }
];
export const REQUIRED = [
  "oath",
  "occupation",
  "council",
  "administration"
];
export const ATTACHMENTS = {
  "oath": [
    "oath"
  ],
  "occupation": [
    "occupation"
  ],
  "council": [
    "council"
  ],
  "administration": [
    "administration"
  ]
};
export const PREDICTION = {
  "question": "Does the occupied Kumasi account establish the same institution as Accra’s council or later Ashanti administration?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Manhyia describes Asantehene and allegiance oaths. NAM describes Kumasi’s 1896 occupation and forced protection. Accra’s municipal account dates its council to 1898. Ghana’s judiciary describes separate Ashanti administration commencing 1902 under the Gold Coast Governor. Occupation, council establishment and incorporation differ; neither non-resistance nor institutional labels establish consent.";
export const PERIOD_PROVENANCE = "";

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
