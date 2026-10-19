export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "gowaSummary",
    "text": "Sagimun’s 1975 biography expressly labels its Bungaya treaty contents an approximate summary; selected restrictions concern trade, fort transfer and coerced indemnity.",
    "requiredContext": "Indonesian nationalist biography, not original signed 1667 instrument. PDF 2 title and 247–249/printed 231–233 actually viewed; no prose/translations reproduced.",
    "fieldAddresses": [],
    "claims": [
      "history.history-makassar-ternate-1600-1900.c1",
      "history.history-makassar-ternate-1600-1900.c2",
      "history.history-makassar-ternate-1600-1900.c3",
      "history.history-makassar-ternate-1600-1900.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "gowaBook",
        "url": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Sultan_Hasanudin_menentang_VOC.pdf",
        "title": "Sagimun M.D., Sultan Hasanudin Menentang V.O.C.",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/gowaBook.body",
        "bodySha256": "45eb8dd99b23b9ac6263fa94cf767e0b359a120a5e761e7573c6109bb5593cb2",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Sagimun M.D., Sultan Hasanudin Menentang V.O.C.",
        "publicationOrDocumentDate": "Departemen Pendidikan dan Kebudayaan, Proyek Biografi Pahlawan Nasional,1975",
        "languageMediationAndLimits": "Indonesian nationalist historical biography; contents explicitly approximate summary, not original treaty transcription",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "PDF2title;PDF247–249/printed231–233:approximate-summary heading andArts6–13",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": null,
        "extractedTextSha256": null,
        "terms": "Commons description asserts Indonesian government-publication publicdomain status; this is platform assertion, not independent global rightsclearance."
      }
    ]
  },
  {
    "id": "ternateFief",
    "text": "De Clercq’s account, translated by Taylor and Richards, records Ternate as a Company fief in 1683 and payments to named office groups after revolt and capture.",
    "requiredContext": "Actual selected PDF 123/printed 116 glyphs legible and inspected; colonial retrospective/1999 translation, not original 1683 instrument or universal consent.",
    "fieldAddresses": [],
    "claims": [
      "history.history-makassar-ternate-1600-1900.c5",
      "history.history-makassar-ternate-1600-1900.c6",
      "history.history-makassar-ternate-1600-1900.c7",
      "history.history-makassar-ternate-1600-1900.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "ternateTranslation",
        "url": "https://www.sil.si.edu/DigitalCollections/anthropology/ternate/ternate.pdf",
        "title": "F.S.A.de Clercq, Ternate: The Residency and Its Sultanate",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/ternateTranslation.body",
        "bodySha256": "7ca041ac9d3cbaad8f9fcd4420303087d4d23b1317666e9f9689575d1948c5b0",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "F.S.A.de Clercq, Ternate: The Residency and Its Sultanate",
        "publicationOrDocumentDate": "Dutch1890; Taylor/Richards English translation, Smithsonian Institution Libraries digital edition1999",
        "languageMediationAndLimits": "Colonial official history translated; no1683original collation; selected page now legible",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "PDF123/printed116:1675/1680/1681/1683entries andnote68",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/ternateTranslation.txt",
        "extractedTextSha256": "c547f32df8909bb609f09846f2516f932ee7f07af37f7da230d0f2365664c682",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  },
  {
    "id": "renewedFighting",
    "text": "Gowa’s government account separately dates Bungaya to 18 November 1667 and renewed fighting to March 1668; formal arrangements therefore do not alone establish uninterrupted compliance.",
    "requiredContext": "The date/renewed conflict account is independent of approximate treaty summary. VOC is the Dutch East India Company; no erased coercion or present title inference.",
    "fieldAddresses": [],
    "claims": [
      "history.history-makassar-ternate-1600-1900.c9",
      "history.history-makassar-ternate-1600-1900.c10",
      "history.history-makassar-ternate-1600-1900.c11",
      "history.history-makassar-ternate-1600-1900.c12"
    ],
    "sourcePins": [
      {
        "sourceId": "gowaLocal",
        "url": "https://gowakab.go.id/site/tentang-gowa/",
        "title": "Gowa Regency Government, Tentang Gowa",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/gowaLocal.body",
        "bodySha256": "5e22bc72c485cc696a93ba267c14dc50ddf24dcecda5e8811d8c640f56bf2e06",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Gowa Regency Government, Tentang Gowa",
        "publicationOrDocumentDate": "Institutional local history; publication date unstated",
        "languageMediationAndLimits": "Indonesian retrospective; renewed1668war not treaty-as-final-peace",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "paragraph18November1667 Bungaya,9March1668 renewed fighting",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/gowaLocal.txt",
        "extractedTextSha256": "76cf23b2d9f3981bb3e591af83c73b075dcb7bddec9b807d28a4608497488e30",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "gowaSummary",
    "text": "1667 Gowa VOC Trade restrictions Fort transfer Coerced indemnity Sagimun 1975 Approximate summary Working English Signed original uncollated",
    "claim": "history.history-makassar-ternate-1600-1900.c3",
    "countedWords": 18,
    "whitespaceTokens": 20
  },
  {
    "id": "ternateFief",
    "text": "1683 Ternate VOC fief Office-group payments After revolt/capture De Clercq 1890 Taylor/Richards 1999 Colonial translation Original instrument uncollated",
    "claim": "history.history-makassar-ternate-1600-1900.c7",
    "countedWords": 17,
    "whitespaceTokens": 20
  },
  {
    "id": "renewedFighting",
    "text": "1667-11-18 Gowa Bungaya 1668 Renewed fighting Government retrospective Working English Original records uncollated Formal terms ≠ uninterrupted control or consent",
    "claim": "history.history-makassar-ternate-1600-1900.c11",
    "countedWords": 19,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "Gowa VOC Trade/fort/indemnity Approximate 1975 summary 1668 Fighting Ternate 1683 Company fief Office payments Colonial 1890/1999 translation Originals uncollated Different obligations Not consent",
    "claim": "history.history-makassar-ternate-1600-1900.c13",
    "countedWords": 21,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "gowaSummary",
  "ternateFief",
  "renewedFighting"
];
export const ATTACHMENTS = {
  "gowaSummary": [
    "gowaSummary"
  ],
  "ternateFief": [
    "ternateFief"
  ],
  "renewedFighting": [
    "renewedFighting"
  ]
};
export const PREDICTION = {
  "question": "Do Gowa and Ternate’s recorded VOC arrangements establish identical obligations or uncontested continuous rule?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Sagimun’s approximate summary describes Gowa trade restrictions, fort transfer and coerced indemnity. The local account’s renewed fighting distinguishes formal terms from continued compliance. De Clercq’s translated Ternate account instead describes a Company fief and payments to office groups after revolt and capture. The Dutch East India Company’s two recorded relationships are not identical obligations, original signed instruments or evidence of universal consent and uninterrupted rule.";
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
