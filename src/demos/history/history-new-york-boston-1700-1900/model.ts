import {lessonData} from "./data";
export const RECORDS=lessonData.documents;
export interface SourcePin {url:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "declaration",
    "text": "Congress declares; Independence asserted",
    "requiredContext": "Not enslaved people’s or Indigenous nations’ consent",
    "fieldAddresses": [
      "declaration.actor",
      "declaration.act"
    ],
    "claims": [
      "history.history-new-york-boston-1700-1900.c1",
      "history.history-new-york-boston-1700-1900.c2"
    ],
    "sourcePins": []
  },
  {
    "id": "recognition",
    "text": "British king acknowledges; New York; Massachusetts named",
    "requiredContext": "Not enslaved people’s or Indigenous nations’ consent",
    "fieldAddresses": [
      "recognition.actor",
      "recognition.named"
    ],
    "claims": [
      "history.history-new-york-boston-1700-1900.c3",
      "history.history-new-york-boston-1700-1900.c4"
    ],
    "sourcePins": []
  },
  {
    "id": "wartimeNewYorkControl",
    "text": "1776–1783 NPS: British control of New York City after Brooklyn battle. Modern account; year-level interval, not capture day, Boston control or modern boundaries.",
    "requiredContext": "No exact15September capture day; no Boston control claim; no modern borough-wide or all-state control inference. Recognition date does not prove instantaneous evacuation or the day control changed.",
    "fieldAddresses": [
      "purposeAugmentation.witnesses.wartimeNewYorkControl"
    ],
    "claims": [
      "history.history-new-york-boston-1700-1900.c16"
    ],
    "sourcePins": [
      {
        "id": "nyc-nps",
        "url": "https://www.nps.gov/gois/learn/historyculture/battle-of-brooklyn.htm",
        "path": "company/research/history-next10-four-purpose-bodies/nyc-nps.html",
        "http": "200",
        "exit": 0,
        "error": "",
        "sha256": "e3cf8edb355aabfe3d069afd8d066c6070f9100e2485a845c709cdba12ccd804",
        "bytes": 57899,
        "normalizedPath": "company/research/history-next10-four-purpose-bodies/nyc-nps.txt",
        "normalizedSha256": "8b6bbe13deee4fa0fab1cfcbffcefbfb0690f3c42e24c1d8c9fdabac0ba955a1",
        "title": "NPS Role of Governors Island in the American Revolution",
        "historicalMaker": "Modern NPS historical account, updated26February2015",
        "custodian": "US National Park Service, Governors Island National Monument",
        "locator": "Normalized55, paragraph beginning After the battle; preceding51 dates Brooklyn battle1776",
        "minimalOwnEnglishFact": "NPS reports British control of New York City after the1776Brooklyn battle until1783.",
        "limits": "Modern retrospective account; use1776–1783/year-level postbattle interval, not invented exact capture day or all present-day borough boundaries; treaty recognition is a separate act, not proof of instantaneous evacuation or control across all states. Boston’s control not newly established here.",
        "editionLanguageMediation": "English institutional summary, not contemporary military order; image credits belong to separate assets not imported.",
        "rights": "Evidence acquisition only; use own minimal attributed factual paraphrase. No copied prose, source translation, image, map, layout, facsimile or dataset permitted by this research packet; source-use owner assesses proposed adoption.",
        "claimStatus": "unverified",
        "checkedBy": "",
        "checkedOn": "",
        "sourceId": "nyc-nps",
        "bodyPath": "company/research/history-next10-four-purpose-bodies/nyc-nps.html",
        "bodySha256": "e3cf8edb355aabfe3d069afd8d066c6070f9100e2485a845c709cdba12ccd804",
        "sourceLedger": "company/research/2026-10-19-history-next10-four-purpose-bridges-ledger.json",
        "sourceLedgerSha256": "651f751ae5c0d80e9c39e3db1341108185af405a02af7b722b5387a55e4dfe30",
        "representation": "actual acquired HTML and normalized text",
        "claimsStatus": "unverified",
        "extractedTextPath": "company/research/history-next10-four-purpose-bodies/nyc-nps.txt",
        "extractedTextSha256": "8b6bbe13deee4fa0fab1cfcbffcefbfb0690f3c42e24c1d8c9fdabac0ba955a1"
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "declaration",
    "text": "1776 Declaration Congress declares Independence asserted Not enslaved people’s or Indigenous nations’ consent",
    "claim": "history.history-new-york-boston-1700-1900.c1 history.history-new-york-boston-1700-1900.c2"
  },
  {
    "id": "recognition",
    "text": "1783 Treaty British king acknowledges New York; Massachusetts named Not enslaved people’s or Indigenous nations’ consent",
    "claim": "history.history-new-york-boston-1700-1900.c3 history.history-new-york-boston-1700-1900.c4"
  },
  {
    "id": "wartimeNewYorkControl",
    "text": "1776–1783 NPS: British control of New York City after Brooklyn battle. Modern account; year-level interval, not capture day, Boston control or modern boundaries.",
    "claim": "history.history-new-york-boston-1700-1900.c16"
  },
  {
    "id": "comparison",
    "text": "Congress declares 1776 NPS: British New York control after battle until 1783 British king acknowledges 1783 Assertion/control/recognition differ Modern account; Boston control unproved",
    "claim": "history.history-new-york-boston-1700-1900.c17"
  }
];
export const REQUIRED = [
  "declaration",
  "recognition",
  "wartimeNewYorkControl"
];
export const ATTACHMENTS = {
  "declaration": [
    "declaration"
  ],
  "recognition": [
    "recognition"
  ],
  "wartimeNewYorkControl": [
    "wartimeNewYorkControl"
  ]
};
export const PREDICTION = {
  "question": "Does Congress’s declaration alone establish British recognition?",
  "options": [
    "No, inspect the other party’s act",
    "Yes, declaration and recognition are identical"
  ],
  "answer": 0
};
export const REVEAL = "These records show different actors’ acts: Congress declares; the British king acknowledges the named states’ independence, including Massachusetts Bay. Neither record alone tracks wartime control of Boston or New York, or establishes the rights or consent of enslaved people or Indigenous nations. NPS separately reports British control of New York City after the 1776 Brooklyn battle until 1783. This year-level modern account supplies wartime control, not an exact capture day or Boston’s control. Assertion, control and recognition require different evidence.";
export const ORIENTATION: {claim:string;text:string;context:string;sourcePins:never[]}[] = [];
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
