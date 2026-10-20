export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "parisProvost",
    "text": "Louis IX appointed Etienne Boileau Paris prevot in 1260 or 1261; his craft-statute compilation belongs to that royal office.",
    "requiredContext": "Preserve 1260/1261 uncertainty. Larousse describes an appointed royal office, not an elected municipal representative. Original records uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-paris-lyon-1000-1500.c1",
      "history.history-paris-lyon-1000-1500.c2",
      "history.history-paris-lyon-1000-1500.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "paris",
        "url": "https://www.larousse.fr/encyclopedie/personnage/%C3%89tienne_Boileau/109307",
        "bodyPath": "/tmp/history-next15d-source-bodies/paris.web.txt",
        "bodySha256": "f2daaac3ec63e0884383f4dcbb1fed05c024756481c1c0c32fd1b1af5cc6b887",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Larousse authored editorial encyclopedia; individual article author not stated",
        "publicationOrDocumentDate": "undated",
        "languageMediation": "French institutional/scholarly account; brief English paraphrase; not independently reviewed; underlying medieval/earlymodern originals uncollated",
        "locator": "Paris L44, 1260 or1261 royal appointment and craft statutes",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "lyonCharter",
    "text": "Lyon’s 1320 arrangements distinguish royal sovereignty, archiepiscopal lordship and bourgeois consul/tax rights under conditions.",
    "requiredContext": "Original charter lost; archive describes 1336 notarized copy AA/1 fol 51 v–52 r. Tax rights are conditional, not unrestricted; original/copy Latin image uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-paris-lyon-1000-1500.c4",
      "history.history-paris-lyon-1000-1500.c5",
      "history.history-paris-lyon-1000-1500.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "lyon",
        "url": "https://www.archives-lyon.fr/documents-remarquables/charte_sapaudine",
        "bodyPath": "/tmp/history-next15d-source-bodies/lyon.web.txt",
        "bodySha256": "93d82efd4f28c57106f1aa8f772380db27d83c753e3239c09c2b7db75bdc546d",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Archives municipales de Lyon, historical/archival institutional account",
        "publicationOrDocumentDate": "2020anniversarycontext;charter21June1320,copy1336",
        "languageMediation": "French institutional/scholarly account; brief English paraphrase; not independently reviewed; underlying medieval/earlymodern originals uncollated; original lost; notarizedcopyAA/1fol51v–52r is the described surviving witness, image not directly collated",
        "locator": "chartergrant 21 June 1320;April 1320 agreementparagraph",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "consulElectors",
    "text": "Twelve Lyon consuls were half renewed annually; craftmasters elected them, rather than all inhabitants.",
    "requiredContext": "Craftmasters are the stated electorate, not all inhabitants. Twelve consuls, half renewed annually; archive accounts, not a modern-democracy claim.",
    "fieldAddresses": [],
    "claims": [
      "history.history-paris-lyon-1000-1500.c7",
      "history.history-paris-lyon-1000-1500.c8",
      "history.history-paris-lyon-1000-1500.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "lyon",
        "url": "https://www.archives-lyon.fr/documents-remarquables/charte_sapaudine",
        "bodyPath": "/tmp/history-next15d-source-bodies/lyon.web.txt",
        "bodySha256": "93d82efd4f28c57106f1aa8f772380db27d83c753e3239c09c2b7db75bdc546d",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Archives municipales de Lyon, historical/archival institutional account",
        "publicationOrDocumentDate": "2020anniversarycontext;charter21June1320,copy1336",
        "languageMediation": "French institutional/scholarly account; brief English paraphrase; not independently reviewed; underlying medieval/earlymodern originals uncollated; original lost; notarizedcopyAA/1fol51v–52r is the described surviving witness, image not directly collated",
        "locator": "Lyon L65, craft-master electors; lost original and1336 copy",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "lyonConsuls",
        "url": "https://www.archives-lyon.fr/pages/consuls-et-echevins-1320-1595",
        "bodyPath": "/tmp/history-next15d-source-bodies/lyonConsuls.web.txt",
        "bodySha256": "39407a544a773f2391d2fa36a87b925553acb0f18b7d5f17b331a08e0e0e0aa3",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Archives municipales de Lyon",
        "publicationOrDocumentDate": "undated",
        "languageMediation": "French institutional/scholarly account; brief English paraphrase; not independently reviewed; underlying medieval/earlymodern originals uncollated",
        "locator": "April/June 1320 and 12 consulsrenewalparagraph",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "parisProvost",
    "text": "1260/1261 Paris Louis IX appoints Boileau Royal prevot Craft statutes Larousse retrospective Working English Original records uncollated",
    "claim": "history.history-paris-lyon-1000-1500.c3",
    "countedWords": 18,
    "whitespaceTokens": 19
  },
  {
    "id": "lyonCharter",
    "text": "1320 Lyon King sovereignty Archbishop lordship Bourgeois elect consuls Conditional taxation Archive account Working English Lost original Copy uncollated",
    "claim": "history.history-paris-lyon-1000-1500.c6",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "consulElectors",
    "text": "1320 Lyon Twelve consuls Half renewed annually Craftmasters elect Archive accounts Working English Original lost Copy uncollated Not universal representation",
    "claim": "history.history-paris-lyon-1000-1500.c9",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "Paris Royal appointed prevot 1260/1261 Larousse Lyon 1320 King/archbishop Bourgeois consuls Conditional taxation Craftmaster electors Archive accounts Working English Lost original Copy uncollated",
    "claim": "history.history-paris-lyon-1000-1500.c10",
    "countedWords": 23,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "parisProvost",
  "lyonCharter",
  "consulElectors"
];
export const ATTACHMENTS = {
  "parisProvost": [
    "parisProvost"
  ],
  "lyonCharter": [
    "lyonCharter"
  ],
  "consulElectors": [
    "consulElectors"
  ]
};
export const PREDICTION = {
  "question": "Does royal sovereignty establish identical appointed offices and elected municipal rights?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Larousse describes a royal appointment at Paris with an unresolved 1260 or 1261 date. Lyon’s archives distinguish royal sovereignty, archiepiscopal lordship and chartered bourgeois rights, with craftmasters electing consuls. These are different powers and constituencies. The lost charter is known through later copies; neither a crown label nor elected consuls establishes universal representation or unlimited taxation.";
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
