export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "tenochtitlanCapital",
    "text": "At Tenochtitlan, INAH identifies rulers’ palaces and the ceremonial centre before conquest; after Spanish and Indigenous troops took it in 1521, Cortés directed reconstruction of the new capital on the same site.",
    "requiredContext": "The actual city site lies beneath Mexico City; no substitution of a distant archaeological site or later 1560–61 viceregal palace use.",
    "fieldAddresses": [],
    "claims": [
      "history.history-mexico-city-oaxaca-1492-1530.c1",
      "history.history-mexico-city-oaxaca-1492-1530.c2",
      "history.history-mexico-city-oaxaca-1492-1530.c3",
      "history.history-mexico-city-oaxaca-1492-1530.c4",
      "history.history-mexico-city-oaxaca-1492-1530.c5"
    ],
    "sourcePins": [
      {
        "sourceId": "mexico",
        "url": "https://lugares.inah.gob.mx/es/node/6116",
        "bodyPath": "/tmp/history-next15e-source-bodies/mexico.web.txt",
        "bodySha256": "1b36a291d5b4803f3a7cab13abb4f16d4f98b89518f4cc4466f2a8af7a3c6819",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "INAH",
        "publicationOrDocumentDate": "Publication date not stated",
        "sourceLevel": "Institutional heritage retrospective",
        "languageMediationAndLimits": "General retrospective, not a surviving appointment instrument; ancient palace site and post-conquest planning are separately bounded.",
        "locator": "web L186–188",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/mexico.web.json",
        "rawToolResponseSha256": "6858fc6428f924875a079783f2fcaf6f9d4831fd0e19cc01c26a80ad649f9d31",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "mexicoSite",
        "url": "https://lugares.inah.gob.mx/es/node/4833?page=%2C%2C%2C1%2C0%2C0%2C0",
        "bodyPath": "/tmp/history-next15e-source-bodies/mexicoSite.web.txt",
        "bodySha256": "6b24735891bd877b11b81b8c7a08706803d553c45dc042f957a8f272c65693ea",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Instituto Nacional de Antropología e Historia",
        "publicationOrDocumentDate": "Publication date not stated",
        "sourceLevel": "Institutional heritage retrospective",
        "languageMediationAndLimits": "Actual city-site narrative; 1521 conquest includes Spanish and Indigenous troops. Later 1560–61 viceregal use of palace excluded.",
        "locator": "web L127",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/mexicoSite.web.json",
        "rawToolResponseSha256": "b51d66bc6ee5caef666ee63ce1015eaf6567ee76b8b0923917fe60d2a0b3d34c",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "antequeraOffice",
    "text": "INAH places the Mexica military base of Huaxyacac at the actual Oaxaca city site, then names Juan Peláez de Berrio as alcalde mayor in 1529, instructed to lay out the villa and allocate lots for the cabildo and other buildings.",
    "requiredContext": "Actual Oaxaca city site includes earlier Mexica military base; 1486 is antecedent. No Monte Alban/all Mixtec or Zapotec polities substituted; 1532 city title excluded.",
    "fieldAddresses": [],
    "claims": [
      "history.history-mexico-city-oaxaca-1492-1530.c6",
      "history.history-mexico-city-oaxaca-1492-1530.c7",
      "history.history-mexico-city-oaxaca-1492-1530.c8",
      "history.history-mexico-city-oaxaca-1492-1530.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "oaxaca",
        "url": "https://lugares.inah.gob.mx/es/node/4807",
        "bodyPath": "/tmp/history-next15e-source-bodies/oaxaca.web.txt",
        "bodySha256": "1ff1c2004cac9271ac3cddf643b14623717d517e5b93df7af7f710774e8fe616",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "INAH",
        "publicationOrDocumentDate": "Publication date not stated",
        "sourceLevel": "Institutional heritage retrospective",
        "languageMediationAndLimits": "Actual Huaxyacac/Antequera city site, not all Oaxaca or Monte Albán. Mexica base established 1486 is antecedent; 1532 city title excluded from endpoint.",
        "locator": "web L138–142",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/oaxaca.web.json",
        "rawToolResponseSha256": "d85c9f876aae32fc7fd6dc57d023e4571586ce2b54272ec624e1f70c1c696198",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "settlementVersusCapital",
    "text": "Antequera’s appointed alcalde and specified settlement duties differ from Tenochtitlan’s conquered palace-capital and Cortés’s reconstruction orders. Cortés’s attempted annexation of Huaxyacac to his marquesado did not succeed.",
    "requiredContext": "Cortes’s attempted annexation of Huaxyacac to his marquesado failed; an appointed officer and cabildo lots are not identical to capital reconstruction or community consent.",
    "fieldAddresses": [],
    "claims": [
      "history.history-mexico-city-oaxaca-1492-1530.c10",
      "history.history-mexico-city-oaxaca-1492-1530.c11",
      "history.history-mexico-city-oaxaca-1492-1530.c12",
      "history.history-mexico-city-oaxaca-1492-1530.c13",
      "history.history-mexico-city-oaxaca-1492-1530.c14"
    ],
    "sourcePins": [
      {
        "sourceId": "oaxaca",
        "url": "https://lugares.inah.gob.mx/es/node/4807",
        "bodyPath": "/tmp/history-next15e-source-bodies/oaxaca.web.txt",
        "bodySha256": "1ff1c2004cac9271ac3cddf643b14623717d517e5b93df7af7f710774e8fe616",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "INAH",
        "publicationOrDocumentDate": "Publication date not stated",
        "sourceLevel": "Institutional heritage retrospective",
        "languageMediationAndLimits": "Actual Huaxyacac/Antequera city site, not all Oaxaca or Monte Albán. Mexica base established 1486 is antecedent; 1532 city title excluded from endpoint.",
        "locator": "web L140–142",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/oaxaca.web.json",
        "rawToolResponseSha256": "d85c9f876aae32fc7fd6dc57d023e4571586ce2b54272ec624e1f70c1c696198",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "mexico",
        "url": "https://lugares.inah.gob.mx/es/node/6116",
        "bodyPath": "/tmp/history-next15e-source-bodies/mexico.web.txt",
        "bodySha256": "1b36a291d5b4803f3a7cab13abb4f16d4f98b89518f4cc4466f2a8af7a3c6819",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "INAH",
        "publicationOrDocumentDate": "Publication date not stated",
        "sourceLevel": "Institutional heritage retrospective",
        "languageMediationAndLimits": "General retrospective, not a surviving appointment instrument; ancient palace site and post-conquest planning are separately bounded.",
        "locator": "web L187–188",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/mexico.web.json",
        "rawToolResponseSha256": "6858fc6428f924875a079783f2fcaf6f9d4831fd0e19cc01c26a80ad649f9d31",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "tenochtitlanCapital",
    "text": "Tenochtitlan Palaces 1521 Spanish/Indigenous conquest Cortes orders capital reconstruction INAH retrospective Working English Originals uncollated Same site Not empty land",
    "claim": "history.history-mexico-city-oaxaca-1492-1530.c3",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "antequeraOffice",
    "text": "1529 Huaxyacac/Antequera Juan Pelaez de Berrio Alcalde mayor Lays villa Allocates cabildo lots INAH retrospective Working English Originals uncollated Modern Oaxaca orientation",
    "claim": "history.history-mexico-city-oaxaca-1492-1530.c8",
    "countedWords": 23,
    "whitespaceTokens": 24
  },
  {
    "id": "settlementVersusCapital",
    "text": "Tenochtitlan Conquered capital Reconstruction Antequera Appointed alcalde Specified settlement duties Cortes annexation attempt fails INAH retrospective Working English Originals uncollated No universal assent",
    "claim": "history.history-mexico-city-oaxaca-1492-1530.c12",
    "countedWords": 25,
    "whitespaceTokens": 25
  },
  {
    "id": "comparison",
    "text": "1521 Tenochtitlan Conquest/reconstruction 1529 Antequera Alcalde mayor Villa/cabildo duties Failed marquesado annexation INAH retrospective Working English Originals uncollated Actual city sites Not universal assent",
    "claim": "history.history-mexico-city-oaxaca-1492-1530.c15",
    "countedWords": 24,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "tenochtitlanCapital",
  "antequeraOffice",
  "settlementVersusCapital"
];
export const ATTACHMENTS = {
  "tenochtitlanCapital": [
    "tenochtitlanCapital"
  ],
  "antequeraOffice": [
    "antequeraOffice"
  ],
  "settlementVersusCapital": [
    "settlementVersusCapital"
  ]
};
export const PREDICTION = {
  "question": "Does conquest establish the same capital reconstruction and settlement office at both actual city sites?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "INAH describes Tenochtitlan’s palaces and reconstruction after Spanish and Indigenous conquest. At the actual Oaxaca city site, it names an alcalde mayor with villa and cabildo-lot duties; Cortés’s attempted annexation failed. Capital reconstruction and a specified settlement office are different relations. These retrospectives do not establish empty land, universal Indigenous consent or later city titles.";
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
