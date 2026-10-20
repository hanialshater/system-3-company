export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "cuscoAccession",
    "text": "Cieza’s account of Huascar’s accession at Cusco separates royal inauguration from city government, left with the officer previously entrusted by Huayna Capac; provincial lords attended the funeral and ceremony.",
    "requiredContext": "Actually accessible publisher chapter excerpt labelled Summary, not full chapter. Early colonial retrospective and nineteenth-century translation; no legitimacy/universal allegiance adopted.",
    "fieldAddresses": [],
    "claims": [
      "history.history-cusco-quito-1492-1530.c1",
      "history.history-cusco-quito-1492-1530.c2",
      "history.history-cusco-quito-1492-1530.c3",
      "history.history-cusco-quito-1492-1530.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "ciezaSelected",
        "url": "https://www.cambridge.org/core/books/abs/second-part-of-the-chronicle-of-peru/how-huascar-was-acknowledged-as-king-in-cuzco-after-the-death-of-his-father/562844843BA057530A73019810311093",
        "bodyPath": "/tmp/history-next15e-source-bodies/ciezaSelected.web.txt",
        "bodySha256": "d42679fce18dc2795118efc6b170d43409720c6977c9497fffaa9618753c6af7",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Pedro de Cieza de León; translated Clements R. Markham; Cambridge University Press",
        "publicationOrDocumentDate": "Sixteenth-century account; translation first published 1883; reprint 2010, online 2011-08-05",
        "sourceLevel": "Publisher-hosted edited translation excerpt of early colonial chronicle",
        "languageMediationAndLimits": "Actually accessible chapter excerpt labelled Summary, not full chapter access. Colonial retrospective and nineteenth-century translation mediated; universal allegiance/legitimacy wording not adopted.",
        "locator": "chapter LXX accessible excerpt, web L526–528",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/ciezaSelected.web.json",
        "rawToolResponseSha256": "358a7e337387098949c3aac8c48560e82365542d664b68bd3a1c4ad2428d4d75",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "quitoHousehold",
    "text": "The Met situates Huayna Capac, an Inca ruler, in Quito at his death around 1527; Cieza’s accession account records Huascar sending named-status Orejones to Quito to retrieve his father’s household.",
    "requiredContext": "Met dates death approximately; Cieza describes Huascar’s named-status agents. Later 1532 capture/death and Spanish conquest outcomes lie beyond 1530.",
    "fieldAddresses": [],
    "claims": [
      "history.history-cusco-quito-1492-1530.c5",
      "history.history-cusco-quito-1492-1530.c6",
      "history.history-cusco-quito-1492-1530.c7",
      "history.history-cusco-quito-1492-1530.c8",
      "history.history-cusco-quito-1492-1530.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "inca",
        "url": "https://www.metmuseum.org/es/toah/ht/08/sanc.html",
        "bodyPath": "/tmp/history-next15e-source-bodies/inca.web.txt",
        "bodySha256": "558d93b5a2b213dbae1f60cfb1bf64f7e86dcd8b36df56fb76f85e037653c589",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "The Metropolitan Museum of Art, Heilbrunn Timeline of Art History",
        "publicationOrDocumentDate": "2006 chronology; exact publication date not established from body",
        "sourceLevel": "Institutional retrospective synthesis",
        "languageMediationAndLimits": "Approximate chronology explicitly ca. 1527; conflicting chronicle dating not resolved. 1532 death/capture excluded from 1530 endpoint.",
        "locator": "web L234–236",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/inca.web.json",
        "rawToolResponseSha256": "7804d8b4a3328e3dd5e6261f66aa27cfe7e854608bc85fde3ddbfeb3f92f97b8",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "ciezaSelected",
        "url": "https://www.cambridge.org/core/books/abs/second-part-of-the-chronicle-of-peru/how-huascar-was-acknowledged-as-king-in-cuzco-after-the-death-of-his-father/562844843BA057530A73019810311093",
        "bodyPath": "/tmp/history-next15e-source-bodies/ciezaSelected.web.txt",
        "bodySha256": "d42679fce18dc2795118efc6b170d43409720c6977c9497fffaa9618753c6af7",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Pedro de Cieza de León; translated Clements R. Markham; Cambridge University Press",
        "publicationOrDocumentDate": "Sixteenth-century account; translation first published 1883; reprint 2010, online 2011-08-05",
        "sourceLevel": "Publisher-hosted edited translation excerpt of early colonial chronicle",
        "languageMediationAndLimits": "Actually accessible chapter excerpt labelled Summary, not full chapter access. Colonial retrospective and nineteenth-century translation mediated; universal allegiance/legitimacy wording not adopted.",
        "locator": "web L528",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/ciezaSelected.web.json",
        "rawToolResponseSha256": "358a7e337387098949c3aac8c48560e82365542d664b68bd3a1c4ad2428d4d75",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "royalAndLocal",
    "text": "A succession dispute follows Huayna Capac’s death around 1527 in the Met account. Cusco’s royal inauguration and delegated city officer differ from the royal household in Quito; no 1532 death or Spanish captivity is pulled into 1530.",
    "requiredContext": "Keep city government distinct from accession and household; conflict chronology approximate, no whole civil-war outcome imported from after endpoint.",
    "fieldAddresses": [],
    "claims": [
      "history.history-cusco-quito-1492-1530.c10",
      "history.history-cusco-quito-1492-1530.c11",
      "history.history-cusco-quito-1492-1530.c12",
      "history.history-cusco-quito-1492-1530.c13",
      "history.history-cusco-quito-1492-1530.c14"
    ],
    "sourcePins": [
      {
        "sourceId": "inca",
        "url": "https://www.metmuseum.org/es/toah/ht/08/sanc.html",
        "bodyPath": "/tmp/history-next15e-source-bodies/inca.web.txt",
        "bodySha256": "558d93b5a2b213dbae1f60cfb1bf64f7e86dcd8b36df56fb76f85e037653c589",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "The Metropolitan Museum of Art, Heilbrunn Timeline of Art History",
        "publicationOrDocumentDate": "2006 chronology; exact publication date not established from body",
        "sourceLevel": "Institutional retrospective synthesis",
        "languageMediationAndLimits": "Approximate chronology explicitly ca. 1527; conflicting chronicle dating not resolved. 1532 death/capture excluded from 1530 endpoint.",
        "locator": "web L234–247",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/inca.web.json",
        "rawToolResponseSha256": "7804d8b4a3328e3dd5e6261f66aa27cfe7e854608bc85fde3ddbfeb3f92f97b8",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "ciezaSelected",
        "url": "https://www.cambridge.org/core/books/abs/second-part-of-the-chronicle-of-peru/how-huascar-was-acknowledged-as-king-in-cuzco-after-the-death-of-his-father/562844843BA057530A73019810311093",
        "bodyPath": "/tmp/history-next15e-source-bodies/ciezaSelected.web.txt",
        "bodySha256": "d42679fce18dc2795118efc6b170d43409720c6977c9497fffaa9618753c6af7",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Pedro de Cieza de León; translated Clements R. Markham; Cambridge University Press",
        "publicationOrDocumentDate": "Sixteenth-century account; translation first published 1883; reprint 2010, online 2011-08-05",
        "sourceLevel": "Publisher-hosted edited translation excerpt of early colonial chronicle",
        "languageMediationAndLimits": "Actually accessible chapter excerpt labelled Summary, not full chapter access. Colonial retrospective and nineteenth-century translation mediated; universal allegiance/legitimacy wording not adopted.",
        "locator": "web L526–528",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/ciezaSelected.web.json",
        "rawToolResponseSha256": "358a7e337387098949c3aac8c48560e82365542d664b68bd3a1c4ad2428d4d75",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "cuscoAccession",
    "text": "Cusco Huascar Royal accession City officer retained Cieza/Markham 1883 translated excerpt Original uncollated Ceremony ≠ every local office or universal allegiance",
    "claim": "history.history-cusco-quito-1492-1530.c3",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "quitoHousehold",
    "text": "Circa 1527 Quito Huayna Capac Royal household Orejones retrieve household Met/Cieza translated accounts Originals uncollated Approximate chronology Not 1532 captivity",
    "claim": "history.history-cusco-quito-1492-1530.c7",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "royalAndLocal",
    "text": "Cusco Royal inauguration Delegated city officer Quito Royal household Succession dispute Met/Cieza/Markham accounts Originals uncollated Approximate pre-1530 chronology Not Spanish conquest",
    "claim": "history.history-cusco-quito-1492-1530.c12",
    "countedWords": 23,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Cusco Accession Delegated city officer Quito Royal household Circa 1527 Succession dispute Met/Cieza/Markham colonial translated excerpt Originals uncollated Not universal allegiance Not 1532 conquest",
    "claim": "history.history-cusco-quito-1492-1530.c15",
    "countedWords": 24,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "cuscoAccession",
  "quitoHousehold",
  "royalAndLocal"
];
export const ATTACHMENTS = {
  "cuscoAccession": [
    "cuscoAccession"
  ],
  "quitoHousehold": [
    "quitoHousehold"
  ],
  "royalAndLocal": [
    "royalAndLocal"
  ]
};
export const PREDICTION = {
  "question": "Does royal succession establish identical city government and household authority at Cusco and Quito?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Cieza’s translated accession account separates Huascar’s royal ceremony from Cusco’s delegated city government. The Met and Cieza place Huayna Capac’s household at Quito and describe retrieval after his death, dated approximately. These are different royal and local relations before 1530. The accessible excerpt and uncollated originals do not establish universal allegiance, a precise civil-war chronology or later Spanish captivity.";
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
