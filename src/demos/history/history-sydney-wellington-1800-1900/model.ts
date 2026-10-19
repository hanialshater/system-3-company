import {lessonData} from "./data";
export const RECORDS=lessonData.documents;
export interface SourcePin {url:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "act",
    "text": "New Zealand: conditional; New South Wales",
    "requiredContext": "Colonies ≠ peoples’ consent",
    "fieldAddresses": [
      "act.nz",
      "act.nsw"
    ],
    "claims": [
      "history.history-sydney-wellington-1800-1900.c1",
      "history.history-sydney-wellington-1800-1900.c2"
    ],
    "sourcePins": []
  },
  {
    "id": "proclamation",
    "text": "New South Wales · Victoria · South Australia · Queensland · Tasmania · Western Australia; From 1901-01-01",
    "requiredContext": "Colonies ≠ peoples’ consent",
    "fieldAddresses": [
      "proclamation.members",
      "proclamation.start"
    ],
    "claims": [
      "history.history-sydney-wellington-1800-1900.c3",
      "history.history-sydney-wellington-1800-1900.c4"
    ],
    "sourcePins": []
  },
  {
    "id": "tiritiRelationshipAccount",
    "text": "1840 Tiriti, per 2016 Matike Mai: iwi/hapū rangatiratanga authority; Crown kāwanatanga governance; joint decisions. Working-group interpretation, not unanimous assent or Crown ruling.",
    "requiredContext": "Keep Māori terms and working English; report describes independent iwi/hapū and a relational sphere, not a single universal group. Keep full original six-colony list and all original Indigenous-consent exclusions in their actual qualified frames. 2016 is account edition;1840 is the historically situated treaty relationship. No silent selected-period extension.",
    "fieldAddresses": [
      "purposeAugmentation.witnesses.tiritiRelationshipAccount"
    ],
    "claims": [
      "history.history-sydney-wellington-1800-1900.c20"
    ],
    "sourcePins": [
      {
        "sourceId": "matikeReport",
        "url": "https://matikemai.maori.nz/wp-content/uploads/2024/01/MatikeMaiAotearoa25Jan16-1.pdf",
        "bodyPath": "/tmp/history-next10-source-bodies/matikeReport.pdf",
        "bodySha256": "bb51cd9f566d9060ee506b0e5bb980160ec933d9efd86cf85d58a5d3912b8322",
        "extractedTextPath": "/tmp/history-next10-source-bodies/matikeReport.txt",
        "extractedTextSha256": "1c184fbd34ebbaa44413da1cfa6edaa7128d71892a4931f644310a74cb032e50",
        "acquisitionLedger": "/tmp/history-next10-source-bodies/held-source-ledger.json",
        "originalAcquisitionRecord": {
          "id": "matikeReport",
          "url": "https://matikemai.maori.nz/wp-content/uploads/2024/01/MatikeMaiAotearoa25Jan16-1.pdf",
          "finalUrl": "https://matikemai.maori.nz/wp-content/uploads/2024/01/MatikeMaiAotearoa25Jan16-1.pdf",
          "rawSha256": "bb51cd9f566d9060ee506b0e5bb980160ec933d9efd86cf85d58a5d3912b8322",
          "bytes": 1929931,
          "status": "PDF acquired; selected operative passages read through web text extraction, not an image-asset import"
        },
        "representation": "actual acquired PDF and selected-page text extraction",
        "locator": "PDF index8 / printed9, selected extraction lines24–41; report background lines45–52 identifies1840 and working-group origin",
        "languageAndScopeLimits": "Matike Mai working-group account/interpretation of Tiriti relationship, published edition2016; not the1840signed texts, every iwi/hapū position, Crown endorsement or present legal adjudication. Historical1840relation and modern mediation are distinct.",
        "rights": "Existing exact source-use return does not automatically cover the new teaching claim. Proposed use: own minimal attributed English facts only, no copied source prose/translation, image, facsimile, geometry, layout or dataset. Independent source-use delta required.",
        "claimsStatus": "unverified",
        "checkedBy": "",
        "checkedOn": ""
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "act",
    "text": "1900-07-09 UK Act New Zealand: conditional New South Wales Colonies ≠ peoples’ consent",
    "claim": "history.history-sydney-wellington-1800-1900.c1 history.history-sydney-wellington-1800-1900.c2"
  },
  {
    "id": "proclamation",
    "text": "1900-09-17 Crown New South Wales · Victoria · South Australia · Queensland · Tasmania · Western Australia From 1901-01-01 Colonies ≠ peoples’ consent",
    "claim": "history.history-sydney-wellington-1800-1900.c3 history.history-sydney-wellington-1800-1900.c4"
  },
  {
    "id": "tiritiRelationshipAccount",
    "text": "1840 Tiriti, per 2016 Matike Mai: iwi/hapū rangatiratanga authority; Crown kāwanatanga governance; joint decisions. Working-group interpretation, not unanimous assent or Crown ruling.",
    "claim": "history.history-sydney-wellington-1800-1900.c20"
  },
  {
    "id": "comparison",
    "text": "UK Act: conditional New Zealand Crown proclamation: six colonies Tiriti, per Matike Mai: iwi/hapū rangatiratanga authority; Crown kāwanatanga governance; joint decisions Interpretation≠unanimous assent",
    "claim": "history.history-sydney-wellington-1800-1900.c21"
  }
];
export const REQUIRED = [
  "act",
  "proclamation",
  "tiritiRelationshipAccount"
];
export const ATTACHMENTS = {
  "act": [
    "act"
  ],
  "proclamation": [
    "proclamation"
  ],
  "tiritiRelationshipAccount": [
    "tiritiRelationshipAccount"
  ]
};
export const PREDICTION = {
  "question": "Does conditional naming in the Act establish actual membership in the proclamation?",
  "options": [
    "No; inspect the proclamation’s named units",
    "Yes; conditional mention proves membership"
  ],
  "answer": 0
};
export const REVEAL = "Conditional mention differs from the proclamation’s membership for 1 January 1901. These are UK parliamentary and Crown records of colonial units, not peoples. They establish neither Aboriginal and Torres Strait Islander or Māori hapū/iwi assent, extinguished institutions nor Sydney and Wellington’s whole history. Matike Mai’s 2016 account interprets the 1840 Tiriti relationship as iwi/hapū rangatiratanga authority, Crown kāwanatanga governance and joint decisions. This working-group interpretation is not unanimous assent or a Crown ruling; a colonial membership list cannot supply that agreement relationship.";
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
