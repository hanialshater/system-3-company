export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "cairoPalace",
    "text": "Fatimid Cairo functioned as a restricted palace and political centre with caliph and vizier; under Saladin, from 1171, a new citadel was planned to control Cairo and Fustat together.",
    "requiredContext": "Restricted palace/political centre and later citadel plan differ; do not backproject completion or later Mamluk offices into 1000–1200.",
    "fieldAddresses": [],
    "claims": [
      "history.history-cairo-damascus-1000-1200.c1",
      "history.history-cairo-damascus-1000-1200.c2",
      "history.history-cairo-damascus-1000-1200.c3",
      "history.history-cairo-damascus-1000-1200.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "cairo",
        "url": "https://islamansiklopedisi.org.tr/kahire",
        "bodyPath": "/tmp/history-next15e-source-bodies/cairo.web.txt",
        "bodySha256": "3a1b054ec4cfe885134f7525e3e17872b5f7416527d2f66e1afc9c6cf8cfc978",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Eymen Fuâd Seyyid; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2001",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Turkish account; underlying Arabic sources uncollated. Citadel planning under Saladin does not establish completion before 1200.",
        "locator": "web L140–145",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/cairo.web.json",
        "rawToolResponseSha256": "4d97cabeb57d44dfe41c4910db8397d1907ef574561965302458e25d78972810",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "damascusAtabeg",
    "text": "Damascus's atabeg Tughtegin handled state business and established his government after Duqaq's death in 1104; Saladin took the city in 1174 and made it a military headquarters.",
    "requiredContext": "Tughtegin’s government after Duqaq’s death and Saladin’s 1174 headquarters are distinct; not all institutions or uniform Ayyubid control.",
    "fieldAddresses": [],
    "claims": [
      "history.history-cairo-damascus-1000-1200.c5",
      "history.history-cairo-damascus-1000-1200.c6",
      "history.history-cairo-damascus-1000-1200.c7",
      "history.history-cairo-damascus-1000-1200.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "damascus",
        "url": "https://islamansiklopedisi.org.tr/sam--suriye",
        "bodyPath": "/tmp/history-next15e-source-bodies/damascus.web.txt",
        "bodySha256": "50a53e9c95fb55dd90cca0cb8bd1a10a71a440e84182d65f2ace7da51f79607e",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Cengiz Tomar; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2010",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Turkish account; original chronicles uncollated. Later Mamluk offices are excluded from 1000–1200.",
        "locator": "web L141–152",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/damascus.web.json",
        "rawToolResponseSha256": "a9955ab7d484100faff2abb8fb1dec150e9a6d0920f682537ca445324dd7637e",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "palaceVersusCommand",
    "text": "Cairo's caliphal palace access and later citadel plan differ from Damascus's atabeg government and military headquarters. The 1171 Cairo and 1174 Damascus changes are separately situated.",
    "requiredContext": "Keep 1171 Cairo and 1174 Damascus separate; palace access, local government and military command are not interchangeable dynastic labels.",
    "fieldAddresses": [],
    "claims": [
      "history.history-cairo-damascus-1000-1200.c9",
      "history.history-cairo-damascus-1000-1200.c10",
      "history.history-cairo-damascus-1000-1200.c11",
      "history.history-cairo-damascus-1000-1200.c12",
      "history.history-cairo-damascus-1000-1200.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "cairo",
        "url": "https://islamansiklopedisi.org.tr/kahire",
        "bodyPath": "/tmp/history-next15e-source-bodies/cairo.web.txt",
        "bodySha256": "3a1b054ec4cfe885134f7525e3e17872b5f7416527d2f66e1afc9c6cf8cfc978",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Eymen Fuâd Seyyid; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2001",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Turkish account; underlying Arabic sources uncollated. Citadel planning under Saladin does not establish completion before 1200.",
        "locator": "web L140–145",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/cairo.web.json",
        "rawToolResponseSha256": "4d97cabeb57d44dfe41c4910db8397d1907ef574561965302458e25d78972810",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "damascus",
        "url": "https://islamansiklopedisi.org.tr/sam--suriye",
        "bodyPath": "/tmp/history-next15e-source-bodies/damascus.web.txt",
        "bodySha256": "50a53e9c95fb55dd90cca0cb8bd1a10a71a440e84182d65f2ace7da51f79607e",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Cengiz Tomar; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2010",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Turkish account; original chronicles uncollated. Later Mamluk offices are excluded from 1000–1200.",
        "locator": "web L142–152",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/damascus.web.json",
        "rawToolResponseSha256": "a9955ab7d484100faff2abb8fb1dec150e9a6d0920f682537ca445324dd7637e",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "cairoPalace",
    "text": "Cairo Fatimid caliph/vizier Restricted palace 1171 Saladin Citadel planned Cairo/Fustat TDV scholarship Working English Originals uncollated Plan ≠ completion",
    "claim": "history.history-cairo-damascus-1000-1200.c3",
    "countedWords": 19,
    "whitespaceTokens": 21
  },
  {
    "id": "damascusAtabeg",
    "text": "1104 Damascus Tughtegin Atabeg State business 1174 Saladin Military headquarters TDV scholarship Working English Originals uncollated Separate changes",
    "claim": "history.history-cairo-damascus-1000-1200.c7",
    "countedWords": 18,
    "whitespaceTokens": 20
  },
  {
    "id": "palaceVersusCommand",
    "text": "Cairo Caliph/vizier Palace access 1171 Citadel plan Damascus Atabeg government 1174 Military headquarters TDV scholarship Working English Originals uncollated Distinct powers",
    "claim": "history.history-cairo-damascus-1000-1200.c11",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Cairo Restricted caliphal palace 1171 Citadel plan Damascus 1104 Atabeg 1174 Military headquarters TDV scholarship Working English Originals uncollated Separate institutions",
    "claim": "history.history-cairo-damascus-1000-1200.c14",
    "countedWords": 20,
    "whitespaceTokens": 23
  }
];
export const REQUIRED = [
  "cairoPalace",
  "damascusAtabeg",
  "palaceVersusCommand"
];
export const ATTACHMENTS = {
  "cairoPalace": [
    "cairoPalace"
  ],
  "damascusAtabeg": [
    "damascusAtabeg"
  ],
  "palaceVersusCommand": [
    "palaceVersusCommand"
  ]
};
export const PREDICTION = {
  "question": "Do Cairo’s palace/citadel changes establish the same atabeg or military institution at Damascus?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "TDV distinguishes Fatimid Cairo’s restricted palace and later citadel plan from Damascus’s atabeg government and Saladin’s military headquarters. The 1171 Cairo and 1174 Damascus changes supply different institutions and scopes. A plan is not completed construction; shared dynastic affiliation does not establish uniform administration, identical palace access or universal assent.";
export const EXPLORE_HINT = "Read, then choose next.";
export const PERIOD_DISCLOSURE = "";
export const PERIOD_SCOPE = "";
export const PERIOD_CLAIM = "";
export const ORIENTATION: {claim:string;text:string;context:string;sourcePins:SourcePin[]}[] = [];
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
 if(!state.committed)return state;
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
