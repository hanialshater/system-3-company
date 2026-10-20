export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "tabrizCapital",
    "text": "Savory identifies Tabriz as Safavid capital from 1501; court council chaired by shah/deputy is a general Safavid description",
    "requiredContext": "Savory’s general Safavid council description does not identify every 1501 office. Conflicting Qazvin transfer years 1548/1555/1557 remain unselected.",
    "fieldAddresses": [],
    "claims": [
      "history.history-tabriz-isfahan-1500-1700.c1",
      "history.history-tabriz-isfahan-1500-1700.c2",
      "history.history-tabriz-isfahan-1500-1700.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "tabrizCourt",
        "url": "https://www.iranicaonline.org/articles/courts-and-courtiers-vi/",
        "bodyPath": "/tmp/history-next15d-source-bodies/tabrizCourt.web.txt",
        "bodySha256": "bcea8ac53c8e62c8e8e0f6ee02f538111b0a3127c2439990f4331811134f1127",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Roger M.Savory,Encyclopaedia Iranica",
        "publicationOrDocumentDate": "1993;updated2013",
        "languageMediation": "English; scholarly/institutional retrospective, underlying original not independently collated",
        "locator": "L 89,first Safavidcapital;L 40 council context",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "isfahanMove",
    "text": "Haneda/Matthee distinguish Isfahan local appointments from 1597–98 royal household transfer/capital proclamation",
    "requiredContext": "Haneda/Matthee distinguish earlier local appointments from 1597–98 household transfer; do not date every office to the proclamation. Originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-tabriz-isfahan-1500-1700.c4",
      "history.history-tabriz-isfahan-1500-1700.c5",
      "history.history-tabriz-isfahan-1500-1700.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "isfahan",
        "url": "https://www.iranicaonline.org/articles/isfahan-vii-safavid-period/",
        "bodyPath": "/tmp/history-next15d-source-bodies/isfahan.web.txt",
        "bodySha256": "9a2bb6d5634a80c06b752aa95a7a31b0eed63852516e402b76e672bde1e7d973",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Masashi Haneda and Rudi Matthee,Encyclopaedia Iranica",
        "publicationOrDocumentDate": "2006;updated2012",
        "languageMediation": "English; scholarly/institutional retrospective, underlying original not independently collated",
        "locator": "L 38,42,51–60 andlocaladministrationsection",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "titleControl",
    "text": "Tabriz retained royal-seat terminology after court transfer, while 1585–1603 Ottoman occupation interrupts blanket Safavid control",
    "requiredContext": "Royal-seat terminology is not continuous Safavid control; actual account includes 1585–1603 Ottoman occupation. No harmonized Qazvin transfer year.",
    "fieldAddresses": [],
    "claims": [
      "history.history-tabriz-isfahan-1500-1700.c7",
      "history.history-tabriz-isfahan-1500-1700.c8",
      "history.history-tabriz-isfahan-1500-1700.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "isfahan",
        "url": "https://www.iranicaonline.org/articles/isfahan-vii-safavid-period/",
        "bodyPath": "/tmp/history-next15d-source-bodies/isfahan.web.txt",
        "bodySha256": "9a2bb6d5634a80c06b752aa95a7a31b0eed63852516e402b76e672bde1e7d973",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Masashi Haneda and Rudi Matthee,Encyclopaedia Iranica",
        "publicationOrDocumentDate": "2006;updated2012",
        "languageMediation": "English; scholarly/institutional retrospective, underlying original not independently collated",
        "locator": "Isfahan L 57–60;Azarbaijan Safavidparagraphs",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "azerbaijan",
        "url": "https://www.iranicaonline.org/articles/azerbaijan-iv/",
        "bodyPath": "/tmp/history-next15d-source-bodies/azerbaijan.web.txt",
        "bodySha256": "c1f53da8ed4736a0cf3cdb5296a081e37c0d557b548e914969fb7a2de4030893",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "C.E.Bosworth,Encyclopaedia Iranica",
        "publicationOrDocumentDate": "1987;bodyupdate metadata",
        "languageMediation": "English; scholarly/institutional retrospective, underlying original not independently collated",
        "locator": "Isfahan L 57–60;Azarbaijan Safavidparagraphs",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "azerbaijanDocumentarySupplement",
        "url": "https://www.iranicaonline.org/articles/azerbaijan-iv/",
        "bodyPath": "artifacts/qa-history-next15d-documentary/azerbaijan-supplement.web.json",
        "bodySha256": "a421231e2a9026d215fc3a3b1359c84286ef4e8ace1ab2b4bb32ee01e4e9cbef",
        "representation": "web-tool normalized response JSON; not raw HTML or independent origin authentication",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "C.E.Bosworth,Encyclopaedia Iranica",
        "publicationOrDocumentDate": "1987;bodyupdate metadata",
        "languageMediation": "English; scholarly/institutional retrospective, underlying original not independently collated",
        "locator": "Bosworth L127, 1585–1603 Ottoman occupation",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "tabrizCapital",
    "text": "1501 Tabriz Safavid capital Savory scholarly account General council description Not every later office projected backward Original chronicles uncollated",
    "claim": "history.history-tabriz-isfahan-1500-1700.c3",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "isfahanMove",
    "text": "1597–1598 Isfahan Royal household transfer Capital proclamation Local governor/mayor distinct Haneda/Matthee scholarly account Original chronicles uncollated",
    "claim": "history.history-tabriz-isfahan-1500-1700.c6",
    "countedWords": 17,
    "whitespaceTokens": 18
  },
  {
    "id": "titleControl",
    "text": "Tabriz Royal-seat title persists 1585–1603 Ottoman occupation Iranica accounts Original chronicles uncollated Title ≠ continuous Safavid control",
    "claim": "history.history-tabriz-isfahan-1500-1700.c9",
    "countedWords": 17,
    "whitespaceTokens": 19
  },
  {
    "id": "comparison",
    "text": "1501 Tabriz Safavid capital 1585–1603 Ottoman occupation 1597–1598 Isfahan Household transfer Iranica accounts Originals uncollated Royal-seat titles ≠ continuous control/local offices",
    "claim": "history.history-tabriz-isfahan-1500-1700.c10",
    "countedWords": 19,
    "whitespaceTokens": 23
  }
];
export const REQUIRED = [
  "tabrizCapital",
  "isfahanMove",
  "titleControl"
];
export const ATTACHMENTS = {
  "tabrizCapital": [
    "tabrizCapital"
  ],
  "isfahanMove": [
    "isfahanMove"
  ],
  "titleControl": [
    "titleControl"
  ]
};
export const PREDICTION = {
  "question": "Does a capital title establish continuous control or identify every local office?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Savory identifies Tabriz’s early Safavid capital role. Haneda and Matthee distinguish Isfahan’s local offices from the royal household’s transfer and proclamation. Tabriz retained royal-seat terminology, but Ottoman occupation interrupts any blanket continuity claim. Capital titles describe neither every office nor uninterrupted control; the disputed earlier Qazvin transfer year is not resolved here.";
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
