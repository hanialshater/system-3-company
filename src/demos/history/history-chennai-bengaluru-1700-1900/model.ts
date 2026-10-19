export const DOCUMENTS = [
  {
    "id": "madrasCourt",
    "text": "1727 Madras Mayor and nine aldermen formed civil Court of Record",
    "mediation": "Municipal retrospective account",
    "requiredContext": "Not every resident represented; no universal franchise inference.",
    "sourceUrl": "https://chennaicorporation.gov.in/gcc/about-GCC/greater-chennai-corporation/Inauguration-of-the-Corporation/",
    "locator": "indexed text105",
    "fieldAddresses": [],
    "claims": [
      "history.history-chennai-bengaluru-1700-1900.c1",
      "history.history-chennai-bengaluru-1700-1900.c2"
    ]
  },
  {
    "id": "madrasTax",
    "text": "1792 municipal tax power given to Company",
    "mediation": "Municipal retrospective account",
    "requiredContext": "Municipal retrospective account attributes Parliamentary Act municipal tax power to Company, not Mayor/aldermen or elected council. Actual Act uncollated; no universal representation inferred.",
    "sourceUrl": "https://chennaicorporation.gov.in/gcc/council/council-brief/",
    "locator": "indexed text113",
    "fieldAddresses": [],
    "claims": [
      "history.history-chennai-bengaluru-1700-1900.c3",
      "history.history-chennai-bengaluru-1700-1900.c4"
    ]
  },
  {
    "id": "mysore",
    "text": "1799 subsidiary treaty with Krishna Raj Wadiar; British force and subsidy",
    "mediation": "Aitchison English colonial editorial narrative, not original treaty article",
    "requiredContext": "Conditional British right to assume territory if subsidy endangered; does not establish immediate direct administration everywhere. Exclude compiler’s imperial justification.",
    "sourceUrl": "https://ignca.gov.in/Asi_data/14007.pdf",
    "locator": "PDF page198, printed183, second paragraph; retained rendered page mysore-page198.png",
    "fieldAddresses": [
      "v2.mysore.forceSubsidyCondition"
    ],
    "claims": [
      "history.history-chennai-bengaluru-1700-1900.c5",
      "history.history-chennai-bengaluru-1700-1900.c6",
      "history.history-chennai-bengaluru-1700-1900.c7"
    ]
  },
  {
    "id": "bangalore",
    "text": "Bangalore city returned to Maharaja after1799; British cantonment outside old city1809",
    "mediation": "Bengaluru district retrospective account",
    "requiredContext": "Only city/cantonment relation selected; do not inherit dubious city-capital/general narrative or infer resident consent.",
    "sourceUrl": "https://bengaluruurban.nic.in/en/history/",
    "locator": "indexed text162–163",
    "fieldAddresses": [
      "v2.bangalore.cityCantonment"
    ],
    "claims": [
      "history.history-chennai-bengaluru-1700-1900.c8",
      "history.history-chennai-bengaluru-1700-1900.c9",
      "history.history-chennai-bengaluru-1700-1900.c10"
    ]
  }
];
export const FRAMES = [
  {
    "id": "municipal",
    "text": "1727 Madras Mayor Nine aldermen Civil court 1792 Company municipal tax power Municipal retrospective accounts Actual Act uncollated Not universal representation",
    "claim": "history.history-chennai-bengaluru-1700-1900.c11",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "mysore",
    "text": "1799 Mysore Krishna Raj Wadiar British force Subsidy Territory assumption conditional on subsidy risk Aitchison editorial; treaty article uncollated",
    "claim": "history.history-chennai-bengaluru-1700-1900.c12",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "city",
    "text": "1799 Bangalore city: Maharaja 1809 British cantonment outside old city District retrospective account No uniform direct administration or resident consent",
    "claim": "history.history-chennai-bengaluru-1700-1900.c13",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "Madras court; Company municipal tax power Mysore force/subsidy Territory assumption conditional on subsidy risk Aitchison editorial Bangalore city→Maharaja 1809 British cantonment outside old city",
    "claim": "history.history-chennai-bengaluru-1700-1900.c14",
    "countedWords": 25,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "madrasCourt",
  "madrasTax",
  "mysore",
  "bangalore"
];
export const ATTACHMENTS = {
  "madrasCourt": [
    "municipal"
  ],
  "madrasTax": [
    "municipal"
  ],
  "mysore": [
    "mysore"
  ],
  "bangalore": [
    "city"
  ]
};
export const PREDICTION = {
  "question": "Do Madras municipal powers and Mysore’s subsidiary relationship establish identical direct administration throughout Bangalore?",
  "options": [
    "Uniform rule",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Madras’s municipal accounts describe court and tax powers. Aitchison’s editorial account describes Krishna Raj Wadiar’s 1799 subsidiary treaty, force, subsidy and conditional British intervention. Bengaluru’s district account distinguishes Maharaja-administered old Bangalore from the British cantonment outside it in 1809. These are different institutions, not uniform direct rule or consent.";
export const PERIOD_PROVENANCE = "";

export interface Proof {generation:number; witness:string|null; frame:string; text:string; contexts:string[]; ordinaryVisible:boolean}
export interface Snapshot {generation:number;frame:string;text:string;contexts:string[]}
export interface State {active:string|null;displayWitness:string|null;frame:string|null;generation:number;mounted:Proof|null;seen:Record<string,Snapshot>;earned:string[];comparisonReady:boolean;comparisonEverMounted:boolean;committed:boolean}
export type Action={type:"navigate";target:string}|{type:"mounted";proof:Proof}|{type:"reset"}|{type:"restart"}|{type:"commit"};
export const initialState=():State=>({active:null,displayWitness:null,frame:null,generation:0,mounted:null,seen:{},earned:[],comparisonReady:false,comparisonEverMounted:false,committed:false});
export const requiredFrame=(witness:string):string|null=>(ATTACHMENTS as Record<string,string[]>)[witness]?.[0]??null;
export const requiredContexts=(witness:string):string[]=>[...((ATTACHMENTS as Record<string,string[]>)[witness]??[]),...(DOCUMENTS.find(d=>d.id===witness)?.fieldAddresses??[])];
export const frameText=(frame:string|null):string=>FRAMES.find(f=>f.id===frame)?.text??"";
export const SELECTED_PREFIXES:Record<string,string>={"madrasCourt": "Selected 1727 civil court", "madrasTax": "Selected 1792 Company municipal tax"};
export const qualifiedFrameText=(witness:string|null):string=>`${witness&&SELECTED_PREFIXES[witness]?SELECTED_PREFIXES[witness]+" ":""}${frameText(witness?requiredFrame(witness):null)}`;
export const expectedFrameText=(state:State):string=>state.frame==="comparison"?frameText("comparison"):qualifiedFrameText(state.displayWitness);
export function validProof(state:State,proof:Proof|null):proof is Proof {
 if(!proof||!proof.ordinaryVisible||proof.generation!==state.generation||proof.frame!==state.frame||proof.text!==expectedFrameText(state))return false;
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
