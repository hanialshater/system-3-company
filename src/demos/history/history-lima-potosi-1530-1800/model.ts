export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "limaPermission",
    "text": "Peru’s presidency distinguishes Lima’s 1535 colonial foundation from later viceroyal residence and Velasco’s 1603 palace-stall permission.",
    "requiredContext": "Actual substantive raw HTML, not failed request. Exclude Toledo praise and empty-valley inference; foundation differs from later offices.",
    "fieldAddresses": [],
    "claims": [
      "history.history-lima-potosi-1530-1800.c1",
      "history.history-lima-potosi-1530-1800.c2",
      "history.history-lima-potosi-1530-1800.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "limaRawRaw",
        "url": "https://www.gob.pe/institucion/presidencia/informes-publicaciones/19921-historia-de-palacio",
        "bodyPath": "/tmp/history-next15d-source-bodies/limaRaw.html",
        "bodySha256": "0bdafd0de695d304122e40197d41acf74523550c8b801b792637b393993e0553",
        "representation": "Raw HTML bytes containing the substantive text",
        "transport": "systemcurl verification enabled; no bypass",
        "makerCustodianEditor": "Presidencia de la República del Perú public institutional history",
        "publicationOrDocumentDate": "2018-06-06",
        "languageMediation": "Spanish governmental retrospective; substantive HTML text acquired after failed web requests; brief English paraphrase; not independently reviewed",
        "locator": "raw HTMLparagraphs 45–59;Toledo 1569/Velasco 1603",
        "extractedTextPath": "/tmp/history-next15d-source-bodies/limaRaw.txt",
        "extractedTextSha256": "3073b0ce218819f03dbb809509f4f609137178edb705dc0b11bf248967f935c0"
      }
    ]
  },
  {
    "id": "potosiOffices",
    "text": "Zagalsky describes the Potosi corregidor’s labour assignments and Velasco’s 1604 appointment of Garcia de Llanos as mines inspector.",
    "requiredContext": "Zagalsky’s archival references support the account, not direct inspection of all allocations or an entire office roster. Spanish working English.",
    "fieldAddresses": [],
    "claims": [
      "history.history-lima-potosi-1530-1800.c4",
      "history.history-lima-potosi-1530-1800.c5",
      "history.history-lima-potosi-1530-1800.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "mita",
        "url": "https://www.scielo.cl/scielo.php?lng=es&nrm=iso&pid=S0717-73562014000300005&script=sci_arttext",
        "bodyPath": "/tmp/history-next15d-source-bodies/mita.web.txt",
        "bodySha256": "208a9645d6bc5423ae17fce916ef8616a0a223d5dfb384a6d2e2d538f646cd61",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Paula C. Zagalsky; Chungara Revista de Antropología Chilena 46(3), SciELO publisher text",
        "publicationOrDocumentDate": "2014",
        "languageMediation": "Spanish original research article; brief English paraphrase; not independently reviewed; underlying repartimiento records and curaca petitions uncollated; precise archive locators in body",
        "locator": "L117–119,127 labour assignments; L147 Velasco1604 appointment of Garcia de Llanos",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "compulsoryMita",
    "text": "Toledo’s 1575 compulsory regional mita specified weekly thirds; a 1578 Lima order expanded quotas while rest remained theoretical.",
    "requiredContext": "Specified regional contingents only, not all Andes. Wages and theoretical rest do not erase compulsory labour, continued work or abuse; originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-lima-potosi-1530-1800.c7",
      "history.history-lima-potosi-1530-1800.c8",
      "history.history-lima-potosi-1530-1800.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "mita",
        "url": "https://www.scielo.cl/scielo.php?lng=es&nrm=iso&pid=S0717-73562014000300005&script=sci_arttext",
        "bodyPath": "/tmp/history-next15d-source-bodies/mita.web.txt",
        "bodySha256": "208a9645d6bc5423ae17fce916ef8616a0a223d5dfb384a6d2e2d538f646cd61",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Paula C. Zagalsky; Chungara Revista de Antropología Chilena 46(3), SciELO publisher text",
        "publicationOrDocumentDate": "2014",
        "languageMediation": "Spanish original research article; brief English paraphrase; not independently reviewed; underlying repartimiento records and curaca petitions uncollated; precise archive locators in body",
        "locator": "L 114–125,1575/1578 repartimientos",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "limaPermission",
    "text": "1535 Lima Colonial foundation Later viceroyal residence 1603 Velasco permits palace stalls Presidency retrospective Working English Not empty land",
    "claim": "history.history-lima-potosi-1530-1800.c3",
    "countedWords": 19,
    "whitespaceTokens": 21
  },
  {
    "id": "potosiOffices",
    "text": "1604 Potosi Velasco appoints Llanos Mines inspector Corregidor labour assignments Zagalsky 2014 scholarship Working English Original allocations uncollated",
    "claim": "history.history-lima-potosi-1530-1800.c6",
    "countedWords": 18,
    "whitespaceTokens": 20
  },
  {
    "id": "compulsoryMita",
    "text": "1575/1578 Toledo Specified regional compulsory mita Weekly thirds Rest theoretical Zagalsky scholarship Working English Original allocations uncollated Pay ≠ consent",
    "claim": "history.history-lima-potosi-1530-1800.c9",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "Lima Velasco 1603 Palace-stall permission Presidency Potosi 1604 Inspector/corregidor Zagalsky Toledo 1575/1578 Regional compulsory mita Theoretical rest Working English Originals uncollated Pay ≠ consent",
    "claim": "history.history-lima-potosi-1530-1800.c10",
    "countedWords": 22,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "limaPermission",
  "potosiOffices",
  "compulsoryMita"
];
export const ATTACHMENTS = {
  "limaPermission": [
    "limaPermission"
  ],
  "potosiOffices": [
    "potosiOffices"
  ],
  "compulsoryMita": [
    "compulsoryMita"
  ]
};
export const PREDICTION = {
  "question": "Does a viceroyal or foundation label establish identical local powers and voluntary labour?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Peru’s presidency describes foundation, viceroyal residence and a specific palace-stall permission at Lima. Zagalsky distinguishes Potosí’s inspector and labour assignments from Toledo’s compulsory regional mita allocations. Specified quotas and theoretical rest did not make that labour voluntary. A shared viceroyal label cannot replace these different powers, and neither formal pay nor colonial foundation establishes consent or empty land.";
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
