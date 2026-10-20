export const DOCUMENTS = [
  {
    "id": "bek",
    "text": "Tashkent bek appointed by Kokand khan",
    "requiredContext": "The translated office title does not establish equivalence to a modern mayor; original decree and calendar style not checked.",
    "citation": "Edited D.A. Alimova et al.; local Uzbek historians; TSUULL university custodian; publication year not established from acquired title. Language/edition: English edition; translator not named in selected pages; not collated with Uzbek/Russian. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated. Tashkent—2200; D. A. Alimova and other local historians; university custody. English edition translator and publication year unestablished.",
    "sourceUrl": "https://tsuull.uz/sites/default/files/tashkent3.pdf",
    "locator": "PDF24; actualEnglishbookedition; visually inspected",
    "sourceLevel": "Edited D.A. Alimova et al.; local Uzbek historians; TSUULL university custodian; publication year not established from acquired title",
    "languageMediation": "English edition; translator not named in selected pages; not collated with Uzbek/Russian",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.bek.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-tashkent-almaty-1800-1900.c1",
      "history.history-tashkent-almaty-1800-1900.c2",
      "history.history-tashkent-almaty-1800-1900.c3"
    ]
  },
  {
    "id": "headquarters",
    "text": "1865 Russian capture;1867 governor-generalship creation; later Tashkent headquarters",
    "requiredContext": "Capture differs from establishing administrative headquarters. No uncritical praise or exactday/calendarassertion.",
    "citation": "Edited D.A. Alimova et al.; local Uzbek historians; TSUULL university custodian; publication year not established from acquired title. Language/edition: English edition; translator not named in selected pages; not collated with Uzbek/Russian. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated. Tashkent—2200; D. A. Alimova and other local historians; university custody. English edition translator and publication year unestablished.",
    "sourceUrl": "https://tsuull.uz/sites/default/files/tashkent3.pdf",
    "locator": "PDF27–28; visually inspected27",
    "sourceLevel": "Edited D.A. Alimova et al.; local Uzbek historians; TSUULL university custodian; publication year not established from acquired title",
    "languageMediation": "English edition; translator not named in selected pages; not collated with Uzbek/Russian",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.headquarters.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-tashkent-almaty-1800-1900.c5",
      "history.history-tashkent-almaty-1800-1900.c6",
      "history.history-tashkent-almaty-1800-1900.c7"
    ]
  },
  {
    "id": "verny",
    "text": "1854Vernyfort on earlierAlmatysite;1867citystatus",
    "requiredContext": "Actualfort/city acts not proof a Verny1867regionalgovernoroffice. ModernAlmatyorientation, nosamefoundation/governmentinference.",
    "citation": "e-history.kz national history portal. Language/edition: Kazakh; paraphrase; not independently reviewed. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://e-history.kz/kz/calendar/show/26120",
    "locator": "Kazakh1854/1867paragraphs; Russiancorrectedaccountseparatelypinnedinbaseline",
    "sourceLevel": "e-history.kz national history portal",
    "languageMediation": "Kazakh; paraphrase; not independently reviewed",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.verny.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-tashkent-almaty-1800-1900.c9",
      "history.history-tashkent-almaty-1800-1900.c10",
      "history.history-tashkent-almaty-1800-1900.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "bek",
    "text": "Tashkent bek Kokand appointment Local historical account English edition awkward Not every institution represented",
    "claim": "history.history-tashkent-almaty-1800-1900.c4",
    "countedWords": 16,
    "whitespaceTokens": 16
  },
  {
    "id": "headquarters",
    "text": "1865 Tashkent Russian capture 1867 Governor-Generalship creation Later headquarters Historical English account Year-level dates; original decree uncollated",
    "claim": "history.history-tashkent-almaty-1800-1900.c8",
    "countedWords": 17,
    "whitespaceTokens": 19
  },
  {
    "id": "verny",
    "text": "1854 Verny fort Earlier Almaty site 1867 City status Kazakh portal Working English paraphrase Not empty land or identical governor office",
    "claim": "history.history-tashkent-almaty-1800-1900.c12",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Tashkent Kokand bek Russian capture/headquarters Historical account 1854 Verny fort Earlier site 1867 City status Kazakh portal Working paraphrase Original decrees uncollated Different institutions",
    "claim": "history.history-tashkent-almaty-1800-1900.c13",
    "countedWords": 24,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "bek",
  "headquarters",
  "verny"
];
export const ATTACHMENTS = {
  "bek": [
    "bek"
  ],
  "headquarters": [
    "headquarters"
  ],
  "verny": [
    "verny"
  ]
};
export const PREDICTION = {
  "question": "Does fort foundation establish the same institution as capture and a governor’s headquarters?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "The Tashkent account describes a Kokand-appointed bek, Russian capture and later governor-general headquarters. The Kazakh portal distinguishes Verny’s fort on an earlier Almaty site from later city status. These are different institutional changes, not one empty-site foundation or identical administration; working accounts do not establish all local powers.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "kokand-office-capture-creation-and-later-headquarters-versus-fort-city";

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
