export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "marrakeshGovernors",
    "text": "After Abu Yusuf Yaqub entered Marrakesh in 1269 and the Marinid governing centre moved to Fez, Marrakesh was governed by powerful governors and later princes, some rebelling against the Fez sultans.",
    "requiredContext": "Governors’ and princes’ powers/challenges remain. The same retrospective’s later 1524 Saadi capture/capital witness is within selected 1200–1524 but beyond the original 1500 endpoint.",
    "fieldAddresses": [],
    "claims": [
      "history.history-marrakesh-fez-1200-1500.c1",
      "history.history-marrakesh-fez-1200-1500.c2",
      "history.history-marrakesh-fez-1200-1500.c3",
      "history.history-marrakesh-fez-1200-1500.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "marrakesh",
        "url": "https://islamansiklopedisi.org.tr/merakes",
        "bodyPath": "/tmp/history-next15e-source-bodies/marrakesh.web.txt",
        "bodySha256": "a2892e04dc4b6985244119a4510e8810880d6425486e824e5ee394a59176134d",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Muhammed Rezûk; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2004",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "1524 Saadi capture explicitly outside 1200–1500. Rulers’ claims and governors’ rebellions do not establish uniform territorial control.",
        "locator": "web L106–108",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/marrakesh.web.json",
        "rawToolResponseSha256": "9be888b22f2267127e568ccb7149acf3de42da98b35b179b4c32b023f4076e75",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "fezInstitutions",
    "text": "The Fez city article describes Abu Yusuf’s order for a new city in 1275, containing the royal palace, princely residences, guards’ barracks and mint; this is a court and military institution at the actual city.",
    "requiredContext": "Source-specific 1275 order retained rather than silently harmonized with UNESCO’s 1276 foundation; no source claim authorizes an empty-settlement premise.",
    "fieldAddresses": [],
    "claims": [
      "history.history-marrakesh-fez-1200-1500.c5",
      "history.history-marrakesh-fez-1200-1500.c6",
      "history.history-marrakesh-fez-1200-1500.c7",
      "history.history-marrakesh-fez-1200-1500.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "fezCity",
        "url": "https://islamansiklopedisi.org.tr/fas--fas",
        "bodyPath": "/tmp/history-next15e-source-bodies/fezCity.web.txt",
        "bodySha256": "96904b18a03f55b485781770474ca5308dacaf619b17380968e3ebf6b9983b22",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "İbrahim Harekât; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1995",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Article dates order for new city 1275; UNESCO uses foundation 1276. Do not silently collapse dates. Later institutional/ethnic generalizations not adopted.",
        "locator": "Marinid paragraph beginning 648/1250, new-city order 674/1275",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/fezCity.web.json",
        "rawToolResponseSha256": "f1b3594f48ba96dfb8fe574ffcdd3179c1880d236a2c8af47d7cc0b875b2734e",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "courtVersusReach",
    "text": "The TDV retrospective dates Ahmed al-Araj’s Saadi capture of Marrakesh and renewed capital status to 1524. Earlier Marrakesh governors and rebellious princes distinguish local power from Fez’s court location; a later capital transition does not establish uniform obedience or general consent.",
    "requiredContext": "1524 is within explicitly selected 1200–1524, beyond original 1200–1500. Ahmed al-Araj’s capture and renewed capital status are the named account’s later dynastic transition, not proof of universal consent or uniform territorial control. Earlier settlement remains; source renewal rhetoric is not empty land. Original chronicles uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-marrakesh-fez-1200-1500.c9",
      "history.history-marrakesh-fez-1200-1500.c10",
      "history.history-marrakesh-fez-1200-1500.c11",
      "history.history-marrakesh-fez-1200-1500.c12",
      "history.history-marrakesh-fez-1200-1500.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "marrakesh",
        "url": "https://islamansiklopedisi.org.tr/merakes",
        "bodyPath": "/tmp/history-next15e-source-bodies/marrakesh.web.txt",
        "bodySha256": "a2892e04dc4b6985244119a4510e8810880d6425486e824e5ee394a59176134d",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Muhammed Rezûk; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2004",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "1524 Saadi capture explicitly outside 1200–1500. Rulers’ claims and governors’ rebellions do not establish uniform territorial control.",
        "locator": "web L107–108",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/marrakesh.web.json",
        "rawToolResponseSha256": "9be888b22f2267127e568ccb7149acf3de42da98b35b179b4c32b023f4076e75",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "fezCity",
        "url": "https://islamansiklopedisi.org.tr/fas--fas",
        "bodyPath": "/tmp/history-next15e-source-bodies/fezCity.web.txt",
        "bodySha256": "96904b18a03f55b485781770474ca5308dacaf619b17380968e3ebf6b9983b22",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "İbrahim Harekât; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1995",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Article dates order for new city 1275; UNESCO uses foundation 1276. Do not silently collapse dates. Later institutional/ethnic generalizations not adopted.",
        "locator": "Marinid new-city paragraph",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/fezCity.web.json",
        "rawToolResponseSha256": "f1b3594f48ba96dfb8fe574ffcdd3179c1880d236a2c8af47d7cc0b875b2734e",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "marrakeshGovernors",
    "text": "1269 Marrakesh Marinid entry Centre moves Fez Governors/princes Rebel against Fez sultans TDV scholarship Working English Originals uncollated Not uniform obedience",
    "claim": "history.history-marrakesh-fez-1200-1500.c3",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "fezInstitutions",
    "text": "1275 Fez New-city order Palace/princes Guards Mint TDV scholarly account Working English Originals uncollated Order ≠ UNESCO 1276 foundation date",
    "claim": "history.history-marrakesh-fez-1200-1500.c7",
    "countedWords": 19,
    "whitespaceTokens": 22
  },
  {
    "id": "courtVersusReach",
    "text": "1524 Marrakesh Ahmed al-Araj Saadi capture Renewed capital TDV retrospective Working English Originals uncollated No general consent Court location ≠ uniform obedience",
    "claim": "history.history-marrakesh-fez-1200-1500.c11",
    "countedWords": 22,
    "whitespaceTokens": 24
  },
  {
    "id": "comparison",
    "text": "1269 Marrakesh Governors/rebellions Fez 1275/1276 Order/foundation Palace/guards/mint 1524 Ahmed al-Araj Saadi capture Capital TDV Working English Originals uncollated Court ≠ uniform obedience",
    "claim": "history.history-marrakesh-fez-1200-1500.c14",
    "countedWords": 20,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "marrakeshGovernors",
  "fezInstitutions",
  "courtVersusReach"
];
export const ATTACHMENTS = {
  "marrakeshGovernors": [
    "marrakeshGovernors"
  ],
  "fezInstitutions": [
    "fezInstitutions"
  ],
  "courtVersusReach": [
    "courtVersusReach"
  ]
};
export const PREDICTION = {
  "question": "Does moving the governing centre establish uncontested local obedience or an empty new city?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "TDV describes Marrakesh governors and rebellious princes after the Marinid centre moved to Fez. Its Fez account dates a palace, guards and mint order to 1275, distinct from 1276 foundation. The same retrospective dates Ahmed al-Araj’s Saadi capture and renewed Marrakesh capital status to 1524. A court’s location and a later dynastic transition do not prove uniform obedience, empty land or general consent. The selected period extends beyond the original 1500 endpoint; underlying originals remain uncollated.";
export const EXPLORE_HINT = "Read each record, then compare them.";
export const PERIOD_DISCLOSURE = "Original proposal: 1200–1500. Selected comparison extends to 1524.";
export const PERIOD_SCOPE = "Original research limits and pin languageMediationAndLimits are immutable acquisition history: 1524 is outside original 1200–1500, now within explicitly selected 1200–1524. They must not be displayed as current selected-period exclusions. Other source/date/mediation limits still apply.";
export const PERIOD_CLAIM = "history.history-marrakesh-fez-1200-1500.c18";
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
