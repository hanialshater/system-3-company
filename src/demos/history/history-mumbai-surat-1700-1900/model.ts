export const DOCUMENTS = [
  {
    "id": "suratPowers",
    "text": "1800 Company revenue/civil/criminal administration",
    "requiredContext": "Agreement text in historical English compilation; Nawab approval 13 May 1800 onPDF 94. Not proof every prescribed power was implemented.",
    "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Treaties_andc._between_the_East-India_Company_and_the_States_bordering_on_the_Presidency_of_Bombay_%28IA_dli.granth.92505%29.pdf",
    "locator": "TreatyXXXVI PDF93/printed91 ArticleII; scan inspected",
    "sourceLevel": "Acquired body; exact source-level attribution in ordinary frame/context; independent assessment pending",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.suratPowers.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mumbai-surat-1700-1900.c1",
      "history.history-mumbai-surat-1700-1900.c2"
    ]
  },
  {
    "id": "suratException",
    "text": "ArticleVII: both parties Nawab relations/servants first referred to Nawab; others’ complaints against them initially via chief civil servant",
    "requiredContext": "Both parties Nawab relations/servants: first-instance referral to Nawab; other such complaints initially via chief civil servant. Not all court business.",
    "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Treaties_andc._between_the_East-India_Company_and_the_States_bordering_on_the_Presidency_of_Bombay_%28IA_dli.granth.92505%29.pdf",
    "locator": "PDF94/printed92 ArticlesVI–VII and execution note; scan inspected",
    "sourceLevel": "Acquired body; exact source-level attribution in ordinary frame/context; independent assessment pending",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.suratException.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mumbai-surat-1700-1900.c4",
      "history.history-mumbai-surat-1700-1900.c5"
    ]
  },
  {
    "id": "bombayPort",
    "text": "1873 Bombay Port Trust; board administers port",
    "requiredContext": "Only 1873 port institution selected;1668 transfer antecedent excluded from answer. Port trust is not civil/criminal jurisdiction over an entire city.",
    "sourceUrl": "https://www.mumbaiport.gov.in/show_content.php?lang=1&level=1&lid=56&ls_id=1042",
    "locator": "indexed367; first trustee meeting3July1873",
    "sourceLevel": "port institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.bombayPort.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-mumbai-surat-1700-1900.c7",
      "history.history-mumbai-surat-1700-1900.c8"
    ]
  }
];
export const FRAMES = [
  {
    "id": "suratPowers",
    "text": "1800 Surat Company revenue Civil/criminal administration Treaty compilation Article II Prescription ≠ operation",
    "claim": "history.history-mumbai-surat-1700-1900.c3",
    "countedWords": 13,
    "whitespaceTokens": 15
  },
  {
    "id": "suratException",
    "text": "1800 Company courts Nawab first-instance referral Both parties relations/servants Other complaints via chief civil servant Treaty compilation Articles VI–VII",
    "claim": "history.history-mumbai-surat-1700-1900.c6",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "bombayPort",
    "text": "1873 Bombay Port Trust Board administers port Port Authority retrospective account Not identical to city government",
    "claim": "history.history-mumbai-surat-1700-1900.c9",
    "countedWords": 17,
    "whitespaceTokens": 18
  },
  {
    "id": "comparison",
    "text": "1800 Surat Company revenue/courts Nawab first-instance exception Both parties Specified relations/servants Treaty compilation 1873 Bombay Port Trust Port administration Authority account Different powers",
    "claim": "history.history-mumbai-surat-1700-1900.c10",
    "countedWords": 23,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "suratPowers",
  "suratException",
  "bombayPort"
];
export const ATTACHMENTS = {
  "suratPowers": [
    "suratPowers"
  ],
  "suratException": [
    "suratException"
  ],
  "bombayPort": [
    "bombayPort"
  ]
};
export const PREDICTION = {
  "question": "Do the selected Surat agreement and Bombay port institution establish identical administration?",
  "options": [
    "Identical city administration",
    "Different scoped powers, with a retained exception"
  ],
  "answer": 1
};
export const REVEAL = "Surat’s 1800 agreement assigns Company revenue and justice powers while preserving specified Nawab first-instance proceedings. Bombay Port Authority describes a 1873 trustee board administering the port. These are different institutional competences. A port board is not an entire city government; treaty prescription establishes neither implementation nor consent.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "revenue-justice-exception-and-port-board";

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
