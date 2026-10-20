export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "delhiCapital",
    "text": "Shah Jahan’s Delhi fort construction 1639–48 accompanied a new capital; public/private audience spaces had different access",
    "requiredContext": "Actual ICOMOS PDF 2–3/printed 98–99 visually inspected. Retrospective evaluation, not a Mughal original or one date for moving all administration.",
    "fieldAddresses": [],
    "claims": [
      "history.history-delhi-agra-1530-1700.c1",
      "history.history-delhi-agra-1530-1700.c2",
      "history.history-delhi-agra-1530-1700.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "redfortIcomosRaw",
        "url": "https://whc.unesco.org/archive/advisory_body_evaluation/231rev.pdf",
        "bodyPath": "/tmp/history-next15d-source-bodies/redfortIcomos.pdf",
        "bodySha256": "8a9ecb5491e4e88b2038bf6e64853b93faafbd0f7cbcb7e2afea2ad937ab8c17",
        "representation": "raw PDF bytes",
        "transport": "/usr/bin/curl with TLS verification enabled; no -k or bypass",
        "makerCustodianEditor": "ICOMOS advisory body / UNESCO custodian",
        "publicationOrDocumentDate": "2007",
        "languageMediation": "English institutional evaluation; relevant PDF2–3/printed98–99 visually inspected",
        "locator": "PDF 2–3/printed 98–99;Diwan-i-Am/Diwan-i-Khas and construction 1639–48",
        "extractedTextPath": "/tmp/history-next15d-source-bodies/redfortIcomos.txt",
        "extractedTextSha256": "4995cfabc7fc8e4ae59067a6e35dcc3a32dc12792db5b83a94bc04b4e357dcf4"
      }
    ]
  },
  {
    "id": "agraCouncil",
    "text": "Husain 1937 attributes Agra private audiences and council state business to its Diwan-i-Khas, with 1636–37 inscription",
    "requiredContext": "Actual Husain 1937 PDF 40/printed 25 visually inspected. Private audiences concern rulers/envoys/nobles. Persian inscription/chronicles uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-delhi-agra-1530-1700.c4",
      "history.history-delhi-agra-1530-1700.c5",
      "history.history-delhi-agra-1530-1700.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "agraGuideRaw",
        "url": "https://ignca.gov.in/Asi_data/30301.pdf",
        "bodyPath": "/tmp/history-next15d-source-bodies/agraGuide.pdf",
        "bodySha256": "a8ec81b1d641527c047b029dc3f8ee930adc074afcfba3ea8388a77ca721235d",
        "representation": "raw PDF bytes",
        "transport": "/usr/bin/curl with TLS verification enabled; no -k or bypass",
        "makerCustodianEditor": "Maulvi Muhammad Ashraf Husain, Archaeological Survey Northern Circle; Delhi Manager of Publications; IGNCA custodian",
        "publicationOrDocumentDate": "1937",
        "languageMediation": "English colonial archaeological account; PDF page 6 (title), 12 (preface) and 40 (printed page 25) visually inspected; text extraction from the image-only pages was empty",
        "locator": "PDF 12 preface and PDF 40/printed 25,Diwan-i-Khas",
        "extractedTextPath": "/tmp/history-next15d-source-bodies/agraGuide.txt",
        "extractedTextSha256": "81ce26fe229a3498f531fd3d30720e4d477a72ad1b30a98690ea4fc8a2ee7a6a"
      }
    ]
  },
  {
    "id": "audienceAccess",
    "text": "Delhi’s NaubatKhana passage limited mounted access beyond the gate to princes; source comparison does not establish identical municipal jurisdiction",
    "requiredContext": "Delhi PDF 2 and Agra PDF 40 visually inspected. Comparable court functions do not prove every Agra office operated unchanged after transfer or establish municipal jurisdiction.",
    "fieldAddresses": [],
    "claims": [
      "history.history-delhi-agra-1530-1700.c7",
      "history.history-delhi-agra-1530-1700.c8",
      "history.history-delhi-agra-1530-1700.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "agraGuideRaw",
        "url": "https://ignca.gov.in/Asi_data/30301.pdf",
        "bodyPath": "/tmp/history-next15d-source-bodies/agraGuide.pdf",
        "bodySha256": "a8ec81b1d641527c047b029dc3f8ee930adc074afcfba3ea8388a77ca721235d",
        "representation": "raw PDF bytes",
        "transport": "/usr/bin/curl with TLS verification enabled; no -k or bypass",
        "makerCustodianEditor": "Maulvi Muhammad Ashraf Husain, Archaeological Survey Northern Circle; Delhi Manager of Publications; IGNCA custodian",
        "publicationOrDocumentDate": "1937",
        "languageMediation": "English colonial archaeological account; PDF page 6 (title), 12 (preface) and 40 (printed page 25) visually inspected; text extraction from the image-only pages was empty",
        "locator": "Agra PDF 40/printed 25;Delhi PDF 2–3/printed 98–99",
        "extractedTextPath": "/tmp/history-next15d-source-bodies/agraGuide.txt",
        "extractedTextSha256": "81ce26fe229a3498f531fd3d30720e4d477a72ad1b30a98690ea4fc8a2ee7a6a"
      },
      {
        "sourceId": "redfortIcomosRaw",
        "url": "https://whc.unesco.org/archive/advisory_body_evaluation/231rev.pdf",
        "bodyPath": "/tmp/history-next15d-source-bodies/redfortIcomos.pdf",
        "bodySha256": "8a9ecb5491e4e88b2038bf6e64853b93faafbd0f7cbcb7e2afea2ad937ab8c17",
        "representation": "raw PDF bytes",
        "transport": "/usr/bin/curl with TLS verification enabled; no -k or bypass",
        "makerCustodianEditor": "ICOMOS advisory body / UNESCO custodian",
        "publicationOrDocumentDate": "2007",
        "languageMediation": "English institutional evaluation; relevant PDF2–3/printed98–99 visually inspected",
        "locator": "Agra PDF 40/printed 25;Delhi PDF 2–3/printed 98–99",
        "extractedTextPath": "/tmp/history-next15d-source-bodies/redfortIcomos.txt",
        "extractedTextSha256": "4995cfabc7fc8e4ae59067a6e35dcc3a32dc12792db5b83a94bc04b4e357dcf4"
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "delhiCapital",
    "text": "1639–1648 Delhi Shah Jahan New capital Public/private audiences ICOMOS retrospective Construction ≠ simultaneous administrative transfer",
    "claim": "history.history-delhi-agra-1530-1700.c3",
    "countedWords": 15,
    "whitespaceTokens": 17
  },
  {
    "id": "agraCouncil",
    "text": "1636–1637 Agra Diwan-i-Khas Private audiences State councils Husain 1937 colonial guide Persian inscription/chronicles uncollated",
    "claim": "history.history-delhi-agra-1530-1700.c6",
    "countedWords": 14,
    "whitespaceTokens": 16
  },
  {
    "id": "audienceAccess",
    "text": "Delhi Court gate Mounted passage Only princes ICOMOS retrospective Agra private council Husain 1937 Persian uncollated Comparable functions ≠ identical municipal jurisdiction",
    "claim": "history.history-delhi-agra-1530-1700.c9",
    "countedWords": 22,
    "whitespaceTokens": 24
  },
  {
    "id": "comparison",
    "text": "Delhi New capital Public/private access ICOMOS Agra Private audience/council Husain 1937 Persian uncollated Shared court functions ≠ identical municipal jurisdiction",
    "claim": "history.history-delhi-agra-1530-1700.c10",
    "countedWords": 20,
    "whitespaceTokens": 22
  }
];
export const REQUIRED = [
  "delhiCapital",
  "agraCouncil",
  "audienceAccess"
];
export const ATTACHMENTS = {
  "delhiCapital": [
    "delhiCapital"
  ],
  "agraCouncil": [
    "agraCouncil"
  ],
  "audienceAccess": [
    "audienceAccess"
  ]
};
export const PREDICTION = {
  "question": "Does a capital transfer establish identical court access and municipal jurisdiction?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "ICOMOS describes Delhi’s new capital and controlled court access. Husain’s 1937 guide describes Agra’s private audiences and council business through an uncollated Persian inscription and chronicles. Similar court functions do not establish identical municipal jurisdiction or one day when every institution moved. Capital location, access and local powers are separate questions.";
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
