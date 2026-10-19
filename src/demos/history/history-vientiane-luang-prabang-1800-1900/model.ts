export const DOCUMENTS = [
  {
    "id": "vientianeKing",
    "text": "Anouvong ruled Vientiane 1805–1828 and led 1826–28revolt",
    "requiredContext": "Do not adopt source lastLaneXangking as unified continuous kingdom; official commemoration perspective.",
    "citation": "KPL Lao News Agency. Language/edition: English2016 commemoration; source calls Anouvong last Lane Xang king, not adopted as unified polity premise. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://kpl.gov.la/En/detail.aspx?id=19105",
    "locator": "text39 KPL2016commemoration",
    "sourceLevel": "KPL Lao News Agency",
    "languageMediation": "English2016 commemoration; source calls Anouvong last Lane Xang king, not adopted as unified polity premise",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.vientianeKing.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-vientiane-luang-prabang-1800-1900.c1",
      "history.history-vientiane-luang-prabang-1800-1900.c2",
      "history.history-vientiane-luang-prabang-1800-1900.c3"
    ]
  },
  {
    "id": "royalKingdom",
    "text": "LuangPrabang separate royal kingdom under Siamese influence;1828 Siamese army destroys Vientiane in ICOMOS retrospective account",
    "requiredContext": "Actualinstitution adequate candidate without unsupportedOunKhamdates; no post1900reconstruction or1946capital projected backward.",
    "citation": "ICOMOS advisory evaluation; UNESCO custodian. Language/edition: English PDF OCR; actual image inspection not achieved, not visual-verified. Representation: web-tool normalized body with line/page locators; not raw HTML/PDF. Transport limitation: Actual representation/transport in immutable baseline; no origin HTTP200 invented. ICOMOS 1995 advisory assessment; UNESCO custodian. Retained normalized OCR, not image inspection.",
    "sourceUrl": "https://whc.unesco.org/archive/advisory_body_evaluation/479.pdf",
    "locator": "normalizedL44–48/57–59 ICOMOS1995assessment",
    "sourceLevel": "ICOMOS advisory evaluation; UNESCO custodian",
    "languageMediation": "English PDF OCR; actual image inspection not achieved, not visual-verified",
    "representation": "web-tool normalized body with line/page locators; not raw HTML/PDF",
    "fieldAddresses": [
      "witnesses.royalKingdom.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-vientiane-luang-prabang-1800-1900.c5",
      "history.history-vientiane-luang-prabang-1800-1900.c6",
      "history.history-vientiane-luang-prabang-1800-1900.c7"
    ]
  },
  {
    "id": "leftbank",
    "text": "1893 Siam renounces left-bank/island claims; ArticleIV permits strictly necessary local-authority police in ArticleIII zones, including25kmright-bank zone",
    "requiredContext": "3October1893instrument enclosedBoyd23October; French authoritativeArtIX. OriginalFrenchuncollated. Rightbank25km military restrictions distinct from leftbankrenunciation; localpolice not blanketabolition. Left-bank renunciation and right-bank policing permission are distinct geographic relations. The selected25kmright-bank zone is not the only ArticleIII zone: Battambong and Siam Reap provinces also specified. No blanket abolition of police.",
    "citation": "US legation Bangkok and documentary enclosure; Office of Historian. Language/edition: English translation; ArtIX says French authoritative; original French uncollated. Representation: raw downloaded bytes. Transport limitation: certificate verification disabled after local chain failure; identity not cryptographically authenticated.",
    "sourceUrl": "https://history.state.gov/historicaldocuments/frus1893/d543",
    "locator": "text104/112/116 ArticlesI/III/IV; authoritativeFrenchclauseIX",
    "sourceLevel": "US legation Bangkok and documentary enclosure; Office of Historian",
    "languageMediation": "English translation; ArtIX says French authoritative; original French uncollated",
    "representation": "raw downloaded bytes",
    "fieldAddresses": [
      "witnesses.leftbank.ordinaryFrame"
    ],
    "editionDisclosure": "",
    "claims": [
      "history.history-vientiane-luang-prabang-1800-1900.c9",
      "history.history-vientiane-luang-prabang-1800-1900.c10",
      "history.history-vientiane-luang-prabang-1800-1900.c11"
    ]
  }
];
export const FRAMES = [
  {
    "id": "vientianeKing",
    "text": "1805–1828 Vientiane Anouvong 1826–1828 Revolt KPL commemorative retrospective Working English paraphrase Not one undivided Lao polity",
    "claim": "history.history-vientiane-luang-prabang-1800-1900.c4",
    "countedWords": 16,
    "whitespaceTokens": 18
  },
  {
    "id": "royalKingdom",
    "text": "LuangPrabang Separate royal kingdom Siamese influence 1828 Siamese army destroys Vientiane ICOMOS retrospective Normalized OCR Named royal succession uncollated",
    "claim": "history.history-vientiane-luang-prabang-1800-1900.c8",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "leftbank",
    "text": "1893 Siam Left-bank renunciation Selected 25km right-bank zone Strictly necessary local-authority police permitted FRUS English translation French authoritative Uncollated",
    "claim": "history.history-vientiane-luang-prabang-1800-1900.c12",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "comparison",
    "text": "Vientiane Anouvong KPL LuangPrabang royal kingdom Siamese influence ICOMOS 1893 Left-bank renunciation Right-bank zone Necessary local-authority police permitted FRUS translation French uncollated",
    "claim": "history.history-vientiane-luang-prabang-1800-1900.c13",
    "countedWords": 23,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "vientianeKing",
  "royalKingdom",
  "leftbank"
];
export const ATTACHMENTS = {
  "vientianeKing": [
    "vientianeKing"
  ],
  "royalKingdom": [
    "royalKingdom"
  ],
  "leftbank": [
    "leftbank"
  ]
};
export const PREDICTION = {
  "question": "Does a left-bank treaty erase the different Lao royal histories and local policing conditions?",
  "options": [
    "Uniform polity",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "KPL’s commemoration describes Anouvong’s Vientiane rule and revolt. ICOMOS distinguishes Luang Prabang’s royal history and Siamese influence from Vientiane’s destruction by Siamese forces. The 1893 English treaty translation separately prescribes left-bank renunciation and restricted local policing. Neither that instrument nor a modern national label turns these into one undivided polity, identical offices or popular consent.";
export const PERIOD_PROVENANCE = "";
export const SOURCES_DISCLOSURE = "";
export const CASE_MECHANISM = "distinct-royal-histories-destruction-and-bank-specific-police-permission";

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
