export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "romeActions",
    "text": "Gaius distinguishes actions at Rome within the first milestone, between Roman citizens before one judge, from actions dependent on a magistrate's imperium.",
    "requiredContext": "Keep the Rome/first-milestone/citizen/single-judge conditions; this is not every Roman or provincial action. Translation and legal prescription do not establish uniform practice.",
    "fieldAddresses": [],
    "claims": [
      "history.history-rome-athens-100-400.c1",
      "history.history-rome-athens-100-400.c2",
      "history.history-rome-athens-100-400.c3",
      "history.history-rome-athens-100-400.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "romeGaiusSelected",
        "url": "https://droitromain.univ-grenoble-alpes.fr/Anglica/gai4_Poste.htm",
        "bodyPath": "/tmp/history-next15e-source-bodies/romeGaiusSelected.web.txt",
        "bodySha256": "9b390d1d56c99383ccc548513e6290530591b17c049977a30d0b3ffa1ce48989",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Gaius; English translation Edward Poste; Roman Law Library, Université Grenoble Alpes",
        "publicationOrDocumentDate": "Ancient composition mid-second century CE; online/translation edition date not established",
        "sourceLevel": "Institutional edition of translated Roman legal text",
        "languageMediationAndLimits": "Translation mediation; manuscript and translation edition not collated. Legal prescription, not evidence of universal implementation.",
        "locator": "Book IV §§103–105, web L145–150",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/romeGaiusSelected.web.json",
        "rawToolResponseSha256": "3432eb947ab4e3031f615f1c812bff2767983d5853d13844ea797c598df09af5",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "athensOil",
    "text": "The Athenian oil law dated 124/5 CE or later assigns smaller cases to the Council, larger cases to Council and People, and provides appeal to emperor or proconsul.",
    "requiredContext": "The inscription is fragmentary/reconstructed and date is 124/5 CE or later. Council is not silently replaced by Areopagus; uncertain lost recipient is not invented.",
    "fieldAddresses": [],
    "claims": [
      "history.history-rome-athens-100-400.c5",
      "history.history-rome-athens-100-400.c6",
      "history.history-rome-athens-100-400.c7",
      "history.history-rome-athens-100-400.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "athensOil",
        "url": "https://www.atticinscriptions.com/inscription/IGII2/1100",
        "bodyPath": "/tmp/history-next15e-source-bodies/athensOil.web.txt",
        "bodySha256": "aeb29fc5a77e88dc08e0c8f0faca63075d872721556f55ce129614aeb1b57bab",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Attic Inscriptions Online scholarly inscription edition",
        "publicationOrDocumentDate": "Inscription 124/5 CE or later; online edition date not established",
        "sourceLevel": "Edited inscription and scholarly English translation",
        "languageMediationAndLimits": "Fragmentary/reconstructed inscription. Lost recipient in line 13 is uncertain; do not substitute Areopagus for Council in this law.",
        "locator": "translation, web L14–21",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/athensOil.web.json",
        "rawToolResponseSha256": "29c8d94d8319a9314dbae6928cd6db6b45af61399925fbb2c94053cf79704443",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "jurisdictionContrast",
    "text": "Imperial affiliation leaves operative jurisdictional differences: Gaius links some actions to the issuing magistrate's term, while the Athenian law names civic decision makers and an imperial/proconsular appeal.",
    "requiredContext": "Specific procedural distinctions, not an entire 100/400 office roster; translated editions are mediated and the original manuscripts/inscription are not independently collated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-rome-athens-100-400.c9",
      "history.history-rome-athens-100-400.c10",
      "history.history-rome-athens-100-400.c11",
      "history.history-rome-athens-100-400.c12",
      "history.history-rome-athens-100-400.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "romeGaiusSelected",
        "url": "https://droitromain.univ-grenoble-alpes.fr/Anglica/gai4_Poste.htm",
        "bodyPath": "/tmp/history-next15e-source-bodies/romeGaiusSelected.web.txt",
        "bodySha256": "9b390d1d56c99383ccc548513e6290530591b17c049977a30d0b3ffa1ce48989",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Gaius; English translation Edward Poste; Roman Law Library, Université Grenoble Alpes",
        "publicationOrDocumentDate": "Ancient composition mid-second century CE; online/translation edition date not established",
        "sourceLevel": "Institutional edition of translated Roman legal text",
        "languageMediationAndLimits": "Translation mediation; manuscript and translation edition not collated. Legal prescription, not evidence of universal implementation.",
        "locator": "Book IV §§104–109",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/romeGaiusSelected.web.json",
        "rawToolResponseSha256": "3432eb947ab4e3031f615f1c812bff2767983d5853d13844ea797c598df09af5",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "athensOil",
        "url": "https://www.atticinscriptions.com/inscription/IGII2/1100",
        "bodyPath": "/tmp/history-next15e-source-bodies/athensOil.web.txt",
        "bodySha256": "aeb29fc5a77e88dc08e0c8f0faca63075d872721556f55ce129614aeb1b57bab",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Attic Inscriptions Online scholarly inscription edition",
        "publicationOrDocumentDate": "Inscription 124/5 CE or later; online edition date not established",
        "sourceLevel": "Edited inscription and scholarly English translation",
        "languageMediationAndLimits": "Fragmentary/reconstructed inscription. Lost recipient in line 13 is uncertain; do not substitute Areopagus for Council in this law.",
        "locator": "web L20–21",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/athensOil.web.json",
        "rawToolResponseSha256": "29c8d94d8319a9314dbae6928cd6db6b45af61399925fbb2c94053cf79704443",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "romeActions",
    "text": "Rome First milestone Citizen parties One judge Magistrate imperium distinct Gaius/Poste translated law Originals uncollated Prescription ≠ universal enforcement",
    "claim": "history.history-rome-athens-100-400.c3",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "athensOil",
    "text": "124/5 or later Athens Oil cases Council Smaller cases Council/People Larger cases Emperor/proconsul appeal AIO translation Fragmentary Greek uncollated",
    "claim": "history.history-rome-athens-100-400.c7",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "jurisdictionContrast",
    "text": "Rome Imperium actions Magistrate term Athens Civic decision makers Imperial/proconsular appeal Gaius/AIO translations Originals uncollated Membership ≠ identical jurisdiction",
    "claim": "history.history-rome-athens-100-400.c11",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "comparison",
    "text": "Rome Conditional actions Magistrate term Athens Council/People Emperor/proconsul appeal Gaius/Poste/AIO translations Fragmentary inscription Greek/manuscript uncollated Shared empire ≠ identical jurisdiction",
    "claim": "history.history-rome-athens-100-400.c14",
    "countedWords": 21,
    "whitespaceTokens": 22
  }
];
export const REQUIRED = [
  "romeActions",
  "athensOil",
  "jurisdictionContrast"
];
export const ATTACHMENTS = {
  "romeActions": [
    "romeActions"
  ],
  "athensOil": [
    "athensOil"
  ],
  "jurisdictionContrast": [
    "jurisdictionContrast"
  ]
};
export const PREDICTION = {
  "question": "Does shared imperial affiliation establish the same civic judges, appeal route and duration of actions?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Gaius’s translated law distinguishes specified Rome actions from those dependent on magistrate imperium. Athens’s translated oil law assigns cases to civic bodies and allows imperial or proconsular appeal. These are different operative jurisdictions, not one uniform imperial procedure. The fragmentary inscription and uncollated editions establish prescriptions, not universal enforcement or complete endpoint office rosters.";
export const EXPLORE_HINT = "Read each record, then compare them.";
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
