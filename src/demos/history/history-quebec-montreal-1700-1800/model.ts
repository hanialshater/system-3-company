import {lessonData} from "./data";
export const RECORDS=lessonData.documents;
export interface SourcePin {url:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "proclamation",
    "text": "Civil: near English; Criminal: near English",
    "requiredContext": "British colonial prescriptions",
    "fieldAddresses": [
      "proclamation.civil",
      "proclamation.criminal"
    ],
    "claims": [
      "history.history-quebec-montreal-1700-1800.c1",
      "history.history-quebec-montreal-1700-1800.c2"
    ],
    "sourcePins": []
  },
  {
    "id": "act",
    "text": "Property/civil: laws and customs of Canada; exceptions; Criminal: English law; alterable",
    "requiredContext": "British colonial prescriptions",
    "fieldAddresses": [
      "act.property",
      "act.criminal"
    ],
    "claims": [
      "history.history-quebec-montreal-1700-1800.c3",
      "history.history-quebec-montreal-1700-1800.c4"
    ],
    "sourcePins": []
  },
  {
    "id": "frenchBritishCanadaCession",
    "text": "1763 Paris Article IV: French Crown cedes Canada/dependencies to British Crown. Avalon English transcription; French original uncollated; not Indigenous title or consent.",
    "requiredContext": "Crown treaty cession is not adjudicated Indigenous title, universal implementation, resident assent, legitimacy or modern boundaries.",
    "fieldAddresses": [
      "purposeAugmentation.witnesses.frenchBritishCanadaCession"
    ],
    "claims": [
      "history.history-quebec-montreal-1700-1800.c22"
    ],
    "sourcePins": [
      {
        "id": "paris1763",
        "url": "https://avalon.law.yale.edu/18th_century/paris763.asp",
        "path": "company/research/history-next10-four-purpose-bodies/paris1763.html",
        "http": "200",
        "exit": 0,
        "error": "",
        "sha256": "c62e94c1891afc60dd4fc81825167bd1dfe998126ba134ef45f3b5a26bd4faf6",
        "bytes": 48571,
        "normalizedPath": "company/research/history-next10-four-purpose-bodies/paris1763.txt",
        "normalizedSha256": "e733d1291dee052b32cf71341db551ac96271ee8aaec96d7b63bdd21da072b67",
        "title": "Treaty of Paris10February1763, ArticleIV",
        "historicalMaker": "Kings/plenipotentiaries of Great Britain, France and Spain; Portugal acceded",
        "custodian": "Yale Law School Lillian Goldman Law Library, Avalon Project",
        "locator": "Title/date normalized24; ArticleIV normalized33",
        "minimalOwnEnglishFact": "ArticleIV cedes Canada and its dependencies from the French Crown to the British Crown.",
        "limits": "Attributed interstate legal cession, distinct from later1763/1774legal prescriptions; not a ruling on Indigenous title, consent, legitimacy or universal implementation. No modern national border or endpoint roster inferred.",
        "editionLanguageMediation": "Avalon English documentary transcription marked Printed from the Copy; underlying original French/signature copy not collated.",
        "rights": "Evidence acquisition only; use own minimal attributed factual paraphrase. No copied prose, source translation, image, map, layout, facsimile or dataset permitted by this research packet; source-use owner assesses proposed adoption.",
        "claimStatus": "unverified",
        "checkedBy": "",
        "checkedOn": "",
        "sourceId": "paris1763",
        "bodyPath": "company/research/history-next10-four-purpose-bodies/paris1763.html",
        "bodySha256": "c62e94c1891afc60dd4fc81825167bd1dfe998126ba134ef45f3b5a26bd4faf6",
        "sourceLedger": "company/research/2026-10-19-history-next10-four-purpose-bridges-ledger.json",
        "sourceLedgerSha256": "651f751ae5c0d80e9c39e3db1341108185af405a02af7b722b5387a55e4dfe30",
        "representation": "actual acquired HTML and normalized text",
        "claimsStatus": "unverified",
        "extractedTextPath": "company/research/history-next10-four-purpose-bodies/paris1763.txt",
        "extractedTextSha256": "e733d1291dee052b32cf71341db551ac96271ee8aaec96d7b63bdd21da072b67"
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "proclamation",
    "text": "1763 Proclamation Civil: near English Criminal: near English British colonial prescriptions",
    "claim": "history.history-quebec-montreal-1700-1800.c1 history.history-quebec-montreal-1700-1800.c2"
  },
  {
    "id": "act",
    "text": "1774 Act Property/civil: laws and customs of Canada; exceptions Criminal: English law; alterable British colonial prescriptions",
    "claim": "history.history-quebec-montreal-1700-1800.c3 history.history-quebec-montreal-1700-1800.c4"
  },
  {
    "id": "frenchBritishCanadaCession",
    "text": "1763 Paris Article IV: French Crown cedes Canada/dependencies to British Crown. Avalon English transcription; French original uncollated; not Indigenous title or consent.",
    "claim": "history.history-quebec-montreal-1700-1800.c22"
  },
  {
    "id": "comparison",
    "text": "1763 France→Britain Canada cession 1763 courts near English standards 1774 Canada property/civil; English criminal Exceptions and alteration retained Treaty/prescriptions≠practice, Indigenous title or consent",
    "claim": "history.history-quebec-montreal-1700-1800.c23"
  }
];
export const REQUIRED = [
  "proclamation",
  "act",
  "frenchBritishCanadaCession"
];
export const ATTACHMENTS = {
  "proclamation": [
    "proclamation"
  ],
  "act": [
    "act"
  ],
  "frenchBritishCanadaCession": [
    "frenchBritishCanadaCession"
  ]
};
export const PREDICTION = {
  "question": "Do these two British texts prescribe one rule for both property disputes and criminal cases?",
  "options": [
    "Yes; both use one undifferentiated prescription",
    "No; compare the named legal domains"
  ],
  "answer": 1
};
export const REVEAL = "These are British colonial prescriptions, not observed practice, Indigenous law, consent or title. Religious-order, common-soccage and wills exceptions apply; provisions permit alteration. Former instruments’ revocation after 1 May 1775 differs from the Act’s label. Contemporary Kahnawà:ke and joint Huron-Wendat/Canada records represent distinct, not universal perspectives. Paris Article IV separately cedes Canada and dependencies from the French Crown to the British Crown. Avalon’s English transcription is not collation of the French original. Interstate cession differs from those legal prescriptions and establishes neither Indigenous title nor consent.";
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
