export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "samarkandConquest",
    "text": "Samarkand fell to Chinggis Khan in 1220 with killing and forced displacement. Its region lay in Chagatai’s allotment, while fiscal administrators initially answered directly to the Great Khan.",
    "requiredContext": "Actual city and regional witnesses within 1200–1279. Dynastic allotment, fiscal reporting and effective civil administration are distinct; Chagatai’s death date and general enforcement claims remain disputed. No Timur-era rebuilding or 1304 reunification imported.",
    "fieldAddresses": [],
    "claims": [
      "history.history-samarkand-kashgar-1200-1279.c1",
      "history.history-samarkand-kashgar-1200-1279.c2",
      "history.history-samarkand-kashgar-1200-1279.c3",
      "history.history-samarkand-kashgar-1200-1279.c4",
      "history.history-samarkand-kashgar-1200-1279.c5"
    ],
    "sourcePins": [
      {
        "sourceId": "samarkandSelected",
        "url": "https://islamansiklopedisi.org.tr/semerkant",
        "title": "SEMERKANT, history and architectural section",
        "bodyPath": "/tmp/history-next15f-source-bodies/samarkandSelected.web.txt",
        "bodySha256": "b3b25ebda411edd805935e25176add5488bc9f7168fb616753f850e004ae6e0e",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Osman Aydınlı (history), Yaşar Çoruhlu (architecture); TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2009",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L 136–137",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/samarkandSelected.web.json",
        "rawToolResponseSha256": "f1b4b88ba8445ee3b6335ada2e435d0b446949199445355820c05c57aab34e21",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Actual Samarkand site; own English synthesis. No Timur 1369 reconstruction backprojected before 1279. Mongol destruction includes killing and forced displacement, not an empty city inference."
      },
      {
        "sourceId": "chaghatayHistoryRetry",
        "url": "https://www.iranicaonline.org/articles/chaghatay-dynasty/i-history/",
        "title": "CHAGHATAY DYNASTY i. History",
        "bodyPath": "/tmp/history-next15f-source-bodies/chaghatayHistoryRetry.web.txt",
        "bodySha256": "e9ef4c2b2e3fa85bd21b55c6a0a1e5e538898eb4616c47f45ab71a9453b1c756",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Peter Jackson; Encyclopaedia Iranica",
        "publicationOrDocumentDate": "1991-12-15; updated 2013-06-10",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L 34–41",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/chaghatayHistoryRetry.web.json",
        "rawToolResponseSha256": "321d1b1e2c841255d24dcee4bbc7cc0297d4d898dfe0eca686d682a9494cfab2",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Fiscal reporting and dynastic allotment distinguished. Chagatai death date explicitly contested by source; no universal enforcement of yasa or later political reunification imported."
      }
    ]
  },
  {
    "id": "kashgarOffices",
    "text": "The Kashgar account dates its Chagatai allotment to 1227 but distinguishes later administration by Mahmud Yalavach and his son Masud, who founded the Masudiya madrasa there.",
    "requiredContext": "Actual city and regional witnesses within 1200–1279. Dynastic allotment, fiscal reporting and effective civil administration are distinct; Chagatai’s death date and general enforcement claims remain disputed. No Timur-era rebuilding or 1304 reunification imported.",
    "fieldAddresses": [],
    "claims": [
      "history.history-samarkand-kashgar-1200-1279.c6",
      "history.history-samarkand-kashgar-1200-1279.c7",
      "history.history-samarkand-kashgar-1200-1279.c8",
      "history.history-samarkand-kashgar-1200-1279.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "kashgar",
        "url": "https://islamansiklopedisi.org.tr/kasgar",
        "title": "KÂŞGAR",
        "bodyPath": "/tmp/history-next15f-source-bodies/kashgar.web.txt",
        "bodySha256": "d3353b9a2a65518db90899ae4ef531369dab411dc133ec21bec625fe786bcba5",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Keith Hitchins; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2022",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L 99–100",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/kashgar.web.json",
        "rawToolResponseSha256": "9a4faaeb3fd7861fc5a4de685f3952830a2c7d8b122238dca0b634a29d814588",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "City explicitly Kashgar. Allocation dated 1227 in this account; original chronicle uncollated. Its generalized gratitude/piety language is not adopted as universal assent."
      }
    ]
  },
  {
    "id": "reportingChange",
    "text": "During the 1260–66 rule of Alghu, Central Asian civil administration became subordinate to the ulus head instead of the eastern Great Khan. Thus Mongol conquest, a prince’s allotment and appointed civil/fiscal government did not establish one unchanged homogeneous authority at Samarkand and Kashgar.",
    "requiredContext": "Actual city and regional witnesses within 1200–1279. Dynastic allotment, fiscal reporting and effective civil administration are distinct; Chagatai’s death date and general enforcement claims remain disputed. No Timur-era rebuilding or 1304 reunification imported.",
    "fieldAddresses": [],
    "claims": [
      "history.history-samarkand-kashgar-1200-1279.c10",
      "history.history-samarkand-kashgar-1200-1279.c11",
      "history.history-samarkand-kashgar-1200-1279.c12",
      "history.history-samarkand-kashgar-1200-1279.c13",
      "history.history-samarkand-kashgar-1200-1279.c14"
    ],
    "sourcePins": [
      {
        "sourceId": "chaghatayHistoryRetry",
        "url": "https://www.iranicaonline.org/articles/chaghatay-dynasty/i-history/",
        "title": "CHAGHATAY DYNASTY i. History",
        "bodyPath": "/tmp/history-next15f-source-bodies/chaghatayHistoryRetry.web.txt",
        "bodySha256": "e9ef4c2b2e3fa85bd21b55c6a0a1e5e538898eb4616c47f45ab71a9453b1c756",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Peter Jackson; Encyclopaedia Iranica",
        "publicationOrDocumentDate": "1991-12-15; updated 2013-06-10",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L 35–41",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/chaghatayHistoryRetry.web.json",
        "rawToolResponseSha256": "321d1b1e2c841255d24dcee4bbc7cc0297d4d898dfe0eca686d682a9494cfab2",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Fiscal reporting and dynastic allotment distinguished. Chagatai death date explicitly contested by source; no universal enforcement of yasa or later political reunification imported."
      },
      {
        "sourceId": "kashgar",
        "url": "https://islamansiklopedisi.org.tr/kasgar",
        "title": "KÂŞGAR",
        "bodyPath": "/tmp/history-next15f-source-bodies/kashgar.web.txt",
        "bodySha256": "d3353b9a2a65518db90899ae4ef531369dab411dc133ec21bec625fe786bcba5",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Keith Hitchins; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2022",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L 100",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/kashgar.web.json",
        "rawToolResponseSha256": "9a4faaeb3fd7861fc5a4de685f3952830a2c7d8b122238dca0b634a29d814588",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "City explicitly Kashgar. Allocation dated 1227 in this account; original chronicle uncollated. Its generalized gratitude/piety language is not adopted as universal assent."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "samarkandConquest",
    "text": "1220 Samarkand Conquest Killing Forced displacement Chagatai allotment Fiscal officials→Great Khan TDV/Iranica scholarship Working English Originals uncollated Separate powers",
    "claim": "history.history-samarkand-kashgar-1200-1279.c3",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "kashgarOffices",
    "text": "1227 Kashgar Chagatai allotment Later Mahmud Yalavach Masud Administration Madrasa TDV scholarship Working English Originals uncollated Allotment ≠ every office",
    "claim": "history.history-samarkand-kashgar-1200-1279.c8",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "reportingChange",
    "text": "1260–1266 Alghu Civil administration→ulus head Earlier→Great Khan Iranica scholarship Working English Originals uncollated Reporting changes No timeless uniform administration",
    "claim": "history.history-samarkand-kashgar-1200-1279.c12",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "comparison",
    "text": "Samarkand 1220 Conquest Forced displacement Kashgar 1227 Allotment Mahmud/Masud administration 1260–1266 Civil reporting→Alghu Earlier→Great Khan TDV/Iranica scholarship Originals uncollated Distinct powers",
    "claim": "history.history-samarkand-kashgar-1200-1279.c15",
    "countedWords": 20,
    "whitespaceTokens": 23
  }
];
export const REQUIRED = [
  "samarkandConquest",
  "kashgarOffices",
  "reportingChange"
];
export const ATTACHMENTS = {
  "samarkandConquest": [
    "samarkandConquest"
  ],
  "kashgarOffices": [
    "kashgarOffices"
  ],
  "reportingChange": [
    "reportingChange"
  ]
};
export const PREDICTION = {
  "question": "Does a prince’s Mongol allotment establish unchanged civil and fiscal authority at both cities?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Samarkand’s conquest and a prince’s allotment did not put every office under the same authority. The accounts distinguish civil and fiscal reporting to the Great Khan from Kashgar’s later named administrators and madrasa. Under Alghu, civil administration shifted toward the ulus head. Conquest, allotment and reporting relationships therefore differ across time; the coercion of 1220 cannot become consent or a timeless uniform empire.";
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
