export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "kongoKing",
    "text": "The Met identifies Afonso I as Kongo king in a 1517 letter to Manuel I and separately describes his capital cross asserting authority.",
    "requiredContext": "Met caption identifies 8 June 1517 exchange, not surrender. Accession 1506/1507 uncertainty unselected; Kongo and Ndongo remain distinct. Portuguese letter uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-mbanza-kongo-luanda-1500-1700.c1",
      "history.history-mbanza-kongo-luanda-1500-1700.c2",
      "history.history-mbanza-kongo-luanda-1500-1700.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "kongoMet",
        "url": "https://www.metmuseum.org/exhibitions/listings/2015/kongo/blog/posts/kongo-christian-art",
        "bodyPath": "/tmp/history-next15d-source-bodies/kongoMet.web.txt",
        "bodySha256": "4f1b01214a7d3c9601eedafeb0aeaff6d04c96cad26a9138f0a7e084c4fd9512",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Mario Pereira and Kristen Windmuller-Luna; Metropolitan Museum of Art exhibition essay",
        "publicationOrDocumentDate": "2015-10-30",
        "languageMediation": "English museum scholarly essay;1517letter image/caption and authoraccount, Portuguese letter not collated",
        "locator": "Met L 63–69;Angolatimeline 1506/1507",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "luanda",
        "url": "https://www.angola50anos.gov.ao/pt/Historial-de-Angola",
        "bodyPath": "/tmp/history-next15d-source-bodies/luanda.web.txt",
        "bodySha256": "e31fb62e228acbd72cc8df50874cac0d86141c6359690368cb84ce9d2efd9c59",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "RepublicofAngola official50thanniversaryhistoricaltimeline",
        "publicationOrDocumentDate": "2025context;pageundated",
        "languageMediation": "Portuguese institutional retrospective; minimalEnglishagentparaphraseunreviewed; no claim this page speaks for allAngolancommunities",
        "locator": "Met L 63–69;Angolatimeline 1506/1507",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "luandaGovernor",
    "text": "Angola’s official timeline attributes Luanda’s 1576 Portuguese establishment to Novais; Governor Almeida fled in 1593 amid regional resistance.",
    "requiredContext": "Official coalition/causal account remains attributed. Colonial capital is not empty land or all Angolan communities’ consent; originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-mbanza-kongo-luanda-1500-1700.c4",
      "history.history-mbanza-kongo-luanda-1500-1700.c5",
      "history.history-mbanza-kongo-luanda-1500-1700.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "luanda",
        "url": "https://www.angola50anos.gov.ao/pt/Historial-de-Angola",
        "bodyPath": "/tmp/history-next15d-source-bodies/luanda.web.txt",
        "bodySha256": "e31fb62e228acbd72cc8df50874cac0d86141c6359690368cb84ce9d2efd9c59",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "RepublicofAngola official50thanniversaryhistoricaltimeline",
        "publicationOrDocumentDate": "2025context;pageundated",
        "languageMediation": "Portuguese institutional retrospective; minimalEnglishagentparaphraseunreviewed; no claim this page speaks for allAngolancommunities",
        "locator": "L 55–58,1576 capitaland 1593 governor",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "differentRelations",
    "text": "The 1517 royal request does not itself surrender Kongo government; later colonial authority and resistance describe different relations.",
    "requiredContext": "Royal request, colonial capital and regional resistance are different relations. No claim that coalition names represent every Kongo/Ndongo community; original letter uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-mbanza-kongo-luanda-1500-1700.c7",
      "history.history-mbanza-kongo-luanda-1500-1700.c8",
      "history.history-mbanza-kongo-luanda-1500-1700.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "kongoMet",
        "url": "https://www.metmuseum.org/exhibitions/listings/2015/kongo/blog/posts/kongo-christian-art",
        "bodyPath": "/tmp/history-next15d-source-bodies/kongoMet.web.txt",
        "bodySha256": "4f1b01214a7d3c9601eedafeb0aeaff6d04c96cad26a9138f0a7e084c4fd9512",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Mario Pereira and Kristen Windmuller-Luna; Metropolitan Museum of Art exhibition essay",
        "publicationOrDocumentDate": "2015-10-30",
        "languageMediation": "English museum scholarly essay;1517letter image/caption and authoraccount, Portuguese letter not collated",
        "locator": "Met 1517 lettercaption/L 65;Angolacoalition 1590/1593",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "luanda",
        "url": "https://www.angola50anos.gov.ao/pt/Historial-de-Angola",
        "bodyPath": "/tmp/history-next15d-source-bodies/luanda.web.txt",
        "bodySha256": "e31fb62e228acbd72cc8df50874cac0d86141c6359690368cb84ce9d2efd9c59",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "RepublicofAngola official50thanniversaryhistoricaltimeline",
        "publicationOrDocumentDate": "2025context;pageundated",
        "languageMediation": "Portuguese institutional retrospective; minimalEnglishagentparaphraseunreviewed; no claim this page speaks for allAngolancommunities",
        "locator": "Met 1517 lettercaption/L 65;Angolacoalition 1590/1593",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "kongoKing",
    "text": "1517 Mbanza Kongo Afonso I Kongo king Manuel I Royal correspondence Met/Angola retrospectives Working English Original Portuguese letter uncollated",
    "claim": "history.history-mbanza-kongo-luanda-1500-1700.c3",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "luandaGovernor",
    "text": "1576 Luanda Novais Portuguese colonial establishment 1593 Governor Almeida flees Regional resistance Angola official retrospective Working English Originals uncollated",
    "claim": "history.history-mbanza-kongo-luanda-1500-1700.c6",
    "countedWords": 19,
    "whitespaceTokens": 21
  },
  {
    "id": "differentRelations",
    "text": "1517 Afonso Royal request Not surrender 1593 Colonial governor flees Resistance Met/Angola accounts Working English Portuguese letter uncollated Distinct institutions",
    "claim": "history.history-mbanza-kongo-luanda-1500-1700.c9",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "Mbanza Kongo Afonso/Manuel Royal exchange 1517 Met Luanda Novais 1576 Colonial capital Almeida flees 1593 Resistance Official account Working English Originals uncollated Not general assent",
    "claim": "history.history-mbanza-kongo-luanda-1500-1700.c10",
    "countedWords": 24,
    "whitespaceTokens": 27
  }
];
export const REQUIRED = [
  "kongoKing",
  "luandaGovernor",
  "differentRelations"
];
export const ATTACHMENTS = {
  "kongoKing": [
    "kongoKing"
  ],
  "luandaGovernor": [
    "luandaGovernor"
  ],
  "differentRelations": [
    "differentRelations"
  ]
};
export const PREDICTION = {
  "question": "Does royal correspondence establish the same authority as a Portuguese colonial capital?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "The Met identifies Afonso’s royal exchange with Manuel, while Angola’s timeline describes Portuguese colonial establishment at Luanda and a governor’s flight amid regional resistance. A request between rulers is not surrender of Kongo government. These are different institutions and mediated histories, not empty land, one merged Kongo/Ndongo polity or evidence of general consent.";
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
