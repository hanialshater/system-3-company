export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "tunisOffices",
    "text": "Kavas dates Tunis’s military dayi office to 1591, names Ibrahim first and Osman later, and distinguishes the bey’s tax/security work and beylerbeyi.",
    "requiredContext": "No timeless autonomy or all later Yusuf/Murad arrangements backdated 1591. Kavas Turkish scholarship, originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-tunis-tripoli-1500-1700.c1",
      "history.history-tunis-tripoli-1500-1700.c2",
      "history.history-tunis-tripoli-1500-1700.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "tunisOffices",
        "url": "https://islamansiklopedisi.org.tr/tunus",
        "bodyPath": "/tmp/history-next15d-source-bodies/tunisOffices.web.txt",
        "bodySha256": "4615503311b4ec4de6ffff0081d0be03cbb3caacd533e542fd8fe1272af416fd",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Ahmet Kavas;TDVİslâmAnsiklopedisi",
        "publicationOrDocumentDate": "2012",
        "languageMediation": "Turkish authored scholarly account; minimal English agent paraphrase unreviewed; cited chronicles/documents not independently collated",
        "locator": "L 338–359,1591 dayi/Osman/Yusuf/Murad",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "tripoliGovernor",
    "text": "Kavas dates Tripoli’s Ottoman conquest to 1551 and Turgut’s governorship to 1556; governor councils/jurists and competing elected dayis describe distinct institutions.",
    "requiredContext": "Conquest does not create every office instantly. Karamanli dynasty outside scope unselected; council/jurists not universal representation. Originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-tunis-tripoli-1500-1700.c4",
      "history.history-tunis-tripoli-1500-1700.c5",
      "history.history-tunis-tripoli-1500-1700.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "tripoli",
        "url": "https://islamansiklopedisi.org.tr/trablusgarp",
        "bodyPath": "/tmp/history-next15d-source-bodies/tripoli.web.txt",
        "bodySha256": "6d9f4d6588f18a763f9f7c2cdff6979d0caad6c7440f51b6942f8f0ab29c8c11",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Ahmet Kavas;TDVİslâmAnsiklopedisi",
        "publicationOrDocumentDate": "2012",
        "languageMediation": "Turkish authored scholarly account; minimal English agent paraphrase unreviewed; cited chronicles/documents not independently collated",
        "locator": "L 102–105,118–121",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "fiscalMilitary",
    "text": "Tunis allocated fiscal/security work to the bey and military work to the dayi; Tripoli’s governor led tax patrols without timar.",
    "requiredContext": "Tunis/Tripoli actual institutional allocations are bounded accounts, not universal fiscal practice or permanent autonomy. Timar exclusion specific to Tripoli.",
    "fieldAddresses": [],
    "claims": [
      "history.history-tunis-tripoli-1500-1700.c7",
      "history.history-tunis-tripoli-1500-1700.c8",
      "history.history-tunis-tripoli-1500-1700.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "tunisOffices",
        "url": "https://islamansiklopedisi.org.tr/tunus",
        "bodyPath": "/tmp/history-next15d-source-bodies/tunisOffices.web.txt",
        "bodySha256": "4615503311b4ec4de6ffff0081d0be03cbb3caacd533e542fd8fe1272af416fd",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Ahmet Kavas;TDVİslâmAnsiklopedisi",
        "publicationOrDocumentDate": "2012",
        "languageMediation": "Turkish authored scholarly account; minimal English agent paraphrase unreviewed; cited chronicles/documents not independently collated",
        "locator": "Tunis L 345–358 and Tripoli L 118–121",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "tripoli",
        "url": "https://islamansiklopedisi.org.tr/trablusgarp",
        "bodyPath": "/tmp/history-next15d-source-bodies/tripoli.web.txt",
        "bodySha256": "6d9f4d6588f18a763f9f7c2cdff6979d0caad6c7440f51b6942f8f0ab29c8c11",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Ahmet Kavas;TDVİslâmAnsiklopedisi",
        "publicationOrDocumentDate": "2012",
        "languageMediation": "Turkish authored scholarly account; minimal English agent paraphrase unreviewed; cited chronicles/documents not independently collated",
        "locator": "Tunis L 345–358 and Tripoli L 118–121",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "tunisOffices",
    "text": "1591 Tunis Ibrahim First dayi Later Osman Bey Tax/security Beylerbeyi distinct Kavas scholarship Working English Original chronicles uncollated",
    "claim": "history.history-tunis-tripoli-1500-1700.c3",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "tripoliGovernor",
    "text": "1551 Tripoli Conquest 1556 Turgut governor Council/jurists Elected dayis compete Kavas scholarship Working English Original chronicles uncollated",
    "claim": "history.history-tunis-tripoli-1500-1700.c6",
    "countedWords": 17,
    "whitespaceTokens": 19
  },
  {
    "id": "fiscalMilitary",
    "text": "Tunis Bey fiscal/security Dayi military Tripoli Governor tax patrols No timar Kavas scholarship Working English Originals uncollated Affiliation ≠ identical powers",
    "claim": "history.history-tunis-tripoli-1500-1700.c9",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Tunis Osman Dayi Military Bey Fiscal/security Tripoli Turgut governor Council Tax patrols No timar Kavas scholarship Working English Originals uncollated Different powers",
    "claim": "history.history-tunis-tripoli-1500-1700.c10",
    "countedWords": 24,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "tunisOffices",
  "tripoliGovernor",
  "fiscalMilitary"
];
export const ATTACHMENTS = {
  "tunisOffices": [
    "tunisOffices"
  ],
  "tripoliGovernor": [
    "tripoliGovernor"
  ],
  "fiscalMilitary": [
    "fiscalMilitary"
  ]
};
export const PREDICTION = {
  "question": "Does Ottoman affiliation establish identical local fiscal, military and appointment powers?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Kavas distinguishes Tunis’s military dayi, fiscal/security bey and governor from Tripoli’s governor, council, competing dayis and tax patrols. The accounts describe different local allocations of power under Ottoman affiliation. Conquest dates do not show every office appearing at once; councils and appointments neither imply universal representation nor establish timeless autonomy.";
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
