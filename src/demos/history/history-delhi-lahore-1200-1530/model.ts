export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "delhiCommand",
    "text": "After taking Delhi in 1296, Alauddin Khalji appointed his brother Elmas Bey, titled Ulugh Khan, to command the army; this is a specific sultanate appointment, not merely a dynastic label.",
    "requiredContext": "Specific Delhi sultanate army appointment, not a complete office roster or exact accession day; no later Lahore capital date.",
    "fieldAddresses": [],
    "claims": [
      "history.history-delhi-lahore-1200-1530.c1",
      "history.history-delhi-lahore-1200-1530.c2",
      "history.history-delhi-lahore-1200-1530.c3",
      "history.history-delhi-lahore-1200-1530.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "alauddin-selected",
        "url": "https://islamansiklopedisi.org.tr/alaeddin-halaci",
        "bodyPath": "/tmp/history-next15e-source-bodies/alauddin-selected.web.txt",
        "bodySha256": "72aa3311acc6065ffbc60e3649c58916a94cf9d432888f781b2c993f5beb00ea",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Yusuf Halaçoğlu; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1989",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "No exact 1296 accession day asserted because related retrospectives differ. Appointment does not prove uniform reach or popular assent.",
        "locator": "political narrative following 1296 accession",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/alauddin-selected.web.json",
        "rawToolResponseSha256": "2eba947074db188c6405a2227b20df066e10febf9590820ded86d6c9170c16c5",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "lahoreGovernor",
    "text": "The Babur account identifies Lahore's governor's conflict with Ibrahim Lodi, earlier dealings involving Daulat Khan Lodi in 1522, and Babur's 1525 Punjab campaign before his 1526 victory at Panipat.",
    "requiredContext": "Distinguish governor-sultan conflict, earlier dealings and repeated expeditions; no anachronistic Jahangir/1521 statement from excluded article.",
    "fieldAddresses": [],
    "claims": [
      "history.history-delhi-lahore-1200-1530.c5",
      "history.history-delhi-lahore-1200-1530.c6",
      "history.history-delhi-lahore-1200-1530.c7",
      "history.history-delhi-lahore-1200-1530.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "baburGov",
        "url": "https://islamansiklopedisi.org.tr/babur",
        "bodyPath": "/tmp/history-next15e-source-bodies/baburGov.web.txt",
        "bodySha256": "76a010b2868b8891dbd9d13d4dc8d903a23fe3083d76de8cfb3e7344baa26fb5",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Enver Konukçu; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1991",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Original Bāburnāma uninspected. No later Lahore capital date or 1533 Delhi foundation imported.",
        "locator": "web L117–120",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/baburGov.web.json",
        "rawToolResponseSha256": "20c2833d951509413f8d56722d3c708f07485962e2b76d36b68574ee893582da",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "campaignAndOffices",
    "text": "The Lahore/Punjab interventions depended on governor-sultan conflict and Babur's repeated expeditions and returns to Kabul; Delhi and Agra followed the 1526 battlefield victory, rather than a simultaneous change of identical offices.",
    "requiredContext": "No single instantaneous regional handover; campaign/returns precede battlefield victory and later city occupation, without inferring popular assent.",
    "fieldAddresses": [],
    "claims": [
      "history.history-delhi-lahore-1200-1530.c9",
      "history.history-delhi-lahore-1200-1530.c10",
      "history.history-delhi-lahore-1200-1530.c11",
      "history.history-delhi-lahore-1200-1530.c12"
    ],
    "sourcePins": [
      {
        "sourceId": "baburGov",
        "url": "https://islamansiklopedisi.org.tr/babur",
        "bodyPath": "/tmp/history-next15e-source-bodies/baburGov.web.txt",
        "bodySha256": "76a010b2868b8891dbd9d13d4dc8d903a23fe3083d76de8cfb3e7344baa26fb5",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Enver Konukçu; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1991",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Original Bāburnāma uninspected. No later Lahore capital date or 1533 Delhi foundation imported.",
        "locator": "web L117–120",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/baburGov.web.json",
        "rawToolResponseSha256": "20c2833d951509413f8d56722d3c708f07485962e2b76d36b68574ee893582da",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "delhiCommand",
    "text": "1296 Delhi Alauddin Khalji appoints Elmas Bey/Ulugh Khan Army command TDV scholarship Working English Originals uncollated Appointment ≠ universal reach",
    "claim": "history.history-delhi-lahore-1200-1530.c3",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "lahoreGovernor",
    "text": "1522–1525 Lahore Daulat Khan Lodi Governor/sultan conflict Babur Punjab expeditions TDV scholarship Working English Original Baburnama uncollated",
    "claim": "history.history-delhi-lahore-1200-1530.c7",
    "countedWords": 18,
    "whitespaceTokens": 19
  },
  {
    "id": "campaignAndOffices",
    "text": "Lahore/Punjab Governor conflict Babur returns Kabul 1526 Panipat Delhi/Agra follow TDV scholarship Working English Originals uncollated Campaign ≠ identical offices",
    "claim": "history.history-delhi-lahore-1200-1530.c11",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "1296 Delhi Army command Elmas Bey 1522–1525 Lahore Governor conflict Babur campaigns/returns 1526 Panipat TDV scholarship Working English Originals uncollated Separate acts",
    "claim": "history.history-delhi-lahore-1200-1530.c13",
    "countedWords": 21,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "delhiCommand",
  "lahoreGovernor",
  "campaignAndOffices"
];
export const ATTACHMENTS = {
  "delhiCommand": [
    "delhiCommand"
  ],
  "lahoreGovernor": [
    "lahoreGovernor"
  ],
  "campaignAndOffices": [
    "campaignAndOffices"
  ]
};
export const PREDICTION = {
  "question": "Does a dynasty change establish simultaneous identical offices at Delhi and Lahore?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "TDV identifies a specific army appointment at Delhi and a separate Lahore governor–sultan conflict involving Babur’s repeated Punjab interventions. Delhi and Agra followed his 1526 battlefield victory rather than one simultaneous change of identical offices. Army command, provincial conflict and campaign are different relations; the original Baburnama remains uncollated and conquest is not consent.";
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
