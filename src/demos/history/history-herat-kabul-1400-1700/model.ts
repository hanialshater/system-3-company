export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "heratGovernors",
    "text": "In Safavid Herat, resident princes could hold nominal governorship while military hakems exercised government; Shamlu commanders became effectively hereditary, and Aliqoli Khan challenged central authority in 1577–88.",
    "requiredContext": "Aliqoli Khan’s challenge and 1588–1598 Uzbek interruption are retained; prince residence does not equal effective central rule.",
    "fieldAddresses": [],
    "claims": [
      "history.history-herat-kabul-1400-1700.c1",
      "history.history-herat-kabul-1400-1700.c2",
      "history.history-herat-kabul-1400-1700.c3",
      "history.history-herat-kabul-1400-1700.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "heratSelected",
        "url": "https://www.iranicaonline.org/articles/herat-iii/",
        "bodyPath": "/tmp/history-next15e-source-bodies/heratSelected.web.txt",
        "bodySha256": "8df4d37a9f56c0a1bf9c5022cca87143e843bfcbcf480836c4246e450c1d8958",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Maria Szuppe; Encyclopaedia Iranica",
        "publicationOrDocumentDate": "2003-12-15",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Original chronicles uncollated; explicit 1588–98 interruption and distinction of nominal prince from effective military governor retained.",
        "locator": "web L105–109",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/heratSelected.web.json",
        "rawToolResponseSha256": "3661972343c21c01fadb05ca2d6f439dbcb5443c6c00da883b53f2be23aafdce",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "kabulGovernors",
    "text": "Babur made Kabul his capital after taking it in 1504; after his move to Agra, Humayun and Kamran served there as governors, separating court residence from city administration.",
    "requiredContext": "After Babur moved court to Agra, named governors administered Kabul. No burial chronology or every year’s governor roster asserted.",
    "fieldAddresses": [],
    "claims": [
      "history.history-herat-kabul-1400-1700.c5",
      "history.history-herat-kabul-1400-1700.c6",
      "history.history-herat-kabul-1400-1700.c7",
      "history.history-herat-kabul-1400-1700.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "kabulTDV",
        "url": "https://islamansiklopedisi.org.tr/kabil--afganistan",
        "bodyPath": "/tmp/history-next15e-source-bodies/kabulTDV.web.txt",
        "bodySha256": "4212952410dc521eb2a909e5d15105d0efc6c0dda0ba1f061ba01c1788088cf0",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Ahmet Kavas; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2001",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Underlying Bāburnāma uninspected. Burial chronology not used; administration distinguished from Babur’s later residence at Agra.",
        "locator": "web L108–110",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/kabulTDV.web.json",
        "rawToolResponseSha256": "3288b0fde8b7226497ab82fba201a3bd17c7e19def0fc4950c35d7a91b634447",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "nominalVersusEffective",
    "text": "Herat’s nominal prince and effective military governor, including semi-independent challenges and the 1588–98 interruption, differ from Kabul’s provincial governorship after the court moved. Residence alone does not prove actual local control.",
    "requiredContext": "Semi-independent challenges, interruption and provincial governors are real bounded relations, not uniform Safavid/Mughal control or consent.",
    "fieldAddresses": [],
    "claims": [
      "history.history-herat-kabul-1400-1700.c9",
      "history.history-herat-kabul-1400-1700.c10",
      "history.history-herat-kabul-1400-1700.c11",
      "history.history-herat-kabul-1400-1700.c12",
      "history.history-herat-kabul-1400-1700.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "heratSelected",
        "url": "https://www.iranicaonline.org/articles/herat-iii/",
        "bodyPath": "/tmp/history-next15e-source-bodies/heratSelected.web.txt",
        "bodySha256": "8df4d37a9f56c0a1bf9c5022cca87143e843bfcbcf480836c4246e450c1d8958",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Maria Szuppe; Encyclopaedia Iranica",
        "publicationOrDocumentDate": "2003-12-15",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Original chronicles uncollated; explicit 1588–98 interruption and distinction of nominal prince from effective military governor retained.",
        "locator": "web L105–109",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/heratSelected.web.json",
        "rawToolResponseSha256": "3661972343c21c01fadb05ca2d6f439dbcb5443c6c00da883b53f2be23aafdce",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "kabulTDV",
        "url": "https://islamansiklopedisi.org.tr/kabil--afganistan",
        "bodyPath": "/tmp/history-next15e-source-bodies/kabulTDV.web.txt",
        "bodySha256": "4212952410dc521eb2a909e5d15105d0efc6c0dda0ba1f061ba01c1788088cf0",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Ahmet Kavas; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2001",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Underlying Bāburnāma uninspected. Burial chronology not used; administration distinguished from Babur’s later residence at Agra.",
        "locator": "web L109–110",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/kabulTDV.web.json",
        "rawToolResponseSha256": "3288b0fde8b7226497ab82fba201a3bd17c7e19def0fc4950c35d7a91b634447",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "heratGovernors",
    "text": "Herat Safavid prince Nominal governor Military hakem Effective power Shamlu challenge 1577–1588 Iranica scholarship Originals uncollated Not homogeneous continuous control",
    "claim": "history.history-herat-kabul-1400-1700.c3",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "kabulGovernors",
    "text": "1504 Kabul Babur Capital Later Agra residence Humayun/Kamran governors TDV scholarship Working English Original Baburnama uncollated Court move ≠ no administration",
    "claim": "history.history-herat-kabul-1400-1700.c7",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "nominalVersusEffective",
    "text": "Herat Nominal prince Effective military governor 1588–1598 Uzbek interruption Kabul Governors after court moves Iranica/TDV scholarship Working English Originals uncollated Different powers",
    "claim": "history.history-herat-kabul-1400-1700.c11",
    "countedWords": 23,
    "whitespaceTokens": 24
  },
  {
    "id": "comparison",
    "text": "Herat Nominal prince Effective military governor Uzbek interruption Kabul Babur court Later governors Iranica/TDV scholarship Working English Originals uncollated Residence ≠ uniform control",
    "claim": "history.history-herat-kabul-1400-1700.c14",
    "countedWords": 24,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "heratGovernors",
  "kabulGovernors",
  "nominalVersusEffective"
];
export const ATTACHMENTS = {
  "heratGovernors": [
    "heratGovernors"
  ],
  "kabulGovernors": [
    "kabulGovernors"
  ],
  "nominalVersusEffective": [
    "nominalVersusEffective"
  ]
};
export const PREDICTION = {
  "question": "Does court presence establish the same nominal and effective governor powers in both cities?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Iranica distinguishes Herat’s nominal princely governor from effective military commanders and challenges to central power, including an Uzbek interruption. TDV describes Kabul’s governors after Babur’s court moved to Agra. Residence, nominal title and working administration are different relations. Uncollated originals and qualified retrospectives establish neither continuous homogeneous control nor identical powers at both cities.";
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
