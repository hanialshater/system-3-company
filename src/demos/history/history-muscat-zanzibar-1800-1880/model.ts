export const DOCUMENTS = [
  {
    "id": "secondCapital",
    "text": "Saud’s memoir in 2012 Arabic translation describes Said bin Sultan establishing a second capital in Zanzibar in 1840",
    "requiredContext": "Individual memoir, not state/institution-authored account. 2012 Arabic translation of English, working English paraphrase; original English edition uncollated. Does not settle 1832 relocation chronologies or Muscat abandonment.",
    "sourceUrl": "https://culturalclub.org/wp-content/uploads/2024/01/zenjibar.pdf",
    "locator": "Arabic PDF87/printed87 upper paragraph; visually inspected",
    "sourceLevel": "Saud bin Ahmed Al Busaidi individually authored memoir, edited by Jane Jaffer; 2012 Arabic translation from English by Hasan al-Matrooshi, Cultural Club/Al-Intishar edition. Selected facts are working English paraphrases from Arabic; original English edition uncollated.",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.secondCapital.ordinaryFrame"
    ],
    "editionDisclosure": "Saud bin Ahmed Al Busaidi, مذكرات رجل عماني من زنجبار; editor Jane Jaffer; Arabic translator Hasan al-Matrooshi; 2012, Cultural Club/Al-Intishar, ISBN 978-614-404-542-8. English into Arabic; learner facts are working English paraphrase from that Arabic edition. Original English edition uncollated. This individual memoir is distinct from Salamah’s testimony. Publication permission does not license source expression in this app.",
    "claims": [
      "history.history-muscat-zanzibar-1800-1880.c1",
      "history.history-muscat-zanzibar-1800-1880.c2",
      "history.history-muscat-zanzibar-1800-1880.c3"
    ]
  },
  {
    "id": "settlement",
    "text": "1868 imperial memorandum recalls 1861 Zanzibar independence/subsidy settlement",
    "requiredContext": "Actual normalized web response only; direct 403 preserved, no fabricated 200/raw SHA. No original 1861 award/uncollated subsidy number selected.",
    "sourceUrl": "https://www.qdl.qa/en/archive/81055/vdc_100030782368.0x00002d",
    "locator": "normalized source body QDL IOR/L/PS/18/B2/4 f39v printed4;L91–118",
    "sourceLevel": "primary1868 imperial memorandum discussing1861 settlement; normalized web body only",
    "representation": "Web tool normalized source-body response; NOT raw HTML or raw-source SHA",
    "fieldAddresses": [
      "witnesses.settlement.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-muscat-zanzibar-1800-1880.c5",
      "history.history-muscat-zanzibar-1800-1880.c6"
    ]
  },
  {
    "id": "localSociety",
    "text": "Swahili urban history and Mwinyi Mkuu Hasan; plantation slavery/trade context",
    "requiredContext": "Nomination/ICOMOS institutional accounts, not all communities’ voices. Earlier urban-ruler context is antecedent, not invented 1800 event; slavery not removed from court story.",
    "sourceUrl": "https://whc.unesco.org/uploads/nominations/173rev.pdf",
    "locator": "PDF121/printed159 right column;PDF15/printed11 and16/printed12; visually inspected",
    "sourceLevel": "institutional retrospective account",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.localSociety.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-muscat-zanzibar-1800-1880.c8",
      "history.history-muscat-zanzibar-1800-1880.c9"
    ]
  },
  {
    "id": "royalHousehold",
    "text": "Salamah/Emily Ruete describes Zanzibar palace residence and audiences",
    "requiredContext": "Published autobiography/translation, not statistical or universal resident account. No copied expressive memoir prose; no original manuscript claim.",
    "sourceUrl": "https://digital.library.upenn.edu/women/ruete/arabian/arabian.html",
    "locator": "1907 Strachey English edition; indexed169 Bet il Mtoni and private-audience passages",
    "sourceLevel": "primary autobiography in1907 English translation of1886 German original",
    "representation": "raw acquired body",
    "fieldAddresses": [
      "witnesses.royalHousehold.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-muscat-zanzibar-1800-1880.c11",
      "history.history-muscat-zanzibar-1800-1880.c12"
    ]
  }
];
export const FRAMES = [
  {
    "id": "secondCapital",
    "text": "1840 Zanzibar SECOND capital Said bin Sultan Saud memoir 2012 Arabic translation Working English paraphrase Not Muscat abandonment",
    "claim": "history.history-muscat-zanzibar-1800-1880.c4",
    "countedWords": 18,
    "whitespaceTokens": 20
  },
  {
    "id": "settlement",
    "text": "1861 Zanzibar independence/subsidy settlement 1868 British memorandum via QDL Retrospective; award uncollated Normalized body, not raw HTML",
    "claim": "history.history-muscat-zanzibar-1800-1880.c7",
    "countedWords": 17,
    "whitespaceTokens": 19
  },
  {
    "id": "localSociety",
    "text": "Antecedent Mwinyi Mkuu Hasan Swahili town Plantation slavery/trade Nomination account Elite court ≠ all residents No empty town",
    "claim": "history.history-muscat-zanzibar-1800-1880.c10",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "royalHousehold",
    "text": "Zanzibar palace residence Salamah memoir Strachey English translation 1907 of 1886 original Elite testimony ≠ enslaved people’s experience",
    "claim": "history.history-muscat-zanzibar-1800-1880.c13",
    "countedWords": 17,
    "whitespaceTokens": 20
  },
  {
    "id": "comparison",
    "text": "1840 SECOND Zanzibar capital Said bin Sultan Saud memoir Arabic translation 1861 Independence/subsidy settlement 1868 British memorandum Swahili institutions Slavery Nomination Salamah translated elite testimony",
    "claim": "history.history-muscat-zanzibar-1800-1880.c14",
    "countedWords": 24,
    "whitespaceTokens": 27
  }
];
export const REQUIRED = [
  "secondCapital",
  "settlement",
  "localSociety",
  "royalHousehold"
];
export const ATTACHMENTS = {
  "secondCapital": [
    "secondCapital"
  ],
  "settlement": [
    "settlement"
  ],
  "localSociety": [
    "localSociety"
  ],
  "royalHousehold": [
    "royalHousehold"
  ]
};
export const PREDICTION = {
  "question": "Does a second capital establish the same relation as a later succession settlement?",
  "options": [
    "One event",
    "Different relations"
  ],
  "answer": 1
};
export const REVEAL = "Saud’s memoir in Arabic translation describes Zanzibar as Said bin Sultan’s second capital, not Muscat’s abandonment. A 1868 British memorandum recalls a separate 1861 settlement and subsidy. Salamah’s translated palace memoir is elite testimony; institutional accounts also retain Swahili urban institutions and slavery. Neither court presence nor arbitration establishes all residents’ experience or consent.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "Second-capital source: Saud bin Ahmed Al Busaidi memoir; Jane Jaffer editor; Hasan al-Matrooshi 2012 Arabic translation from English, Cultural Club/Al-Intishar, original English edition uncollated. Separate from Salamah/Emily Ruete 1907 Strachey translation. Mwinyi Mkuu Hasan is antecedent urban context; no newly assigned 1800–1880 event.";
export const CASE_MECHANISM = "second-court-capital-succession-urban-slavery-and-elite-memoir";

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
