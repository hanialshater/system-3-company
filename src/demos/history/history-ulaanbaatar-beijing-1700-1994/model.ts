export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "mobileSite",
    "text": "The municipal museum distinguishes mobile Urga through 1778, Ikh Khüree in 1778–1911, Niislel Khüree in 1911–24 and Ulaanbaatar from 1924; 1639 is not a fixed modern-site foundation.",
    "requiredContext": "Mongolian municipal periodization is attributed, not a precise foundation coordinate. Different names/sites do not establish total political control.",
    "fieldAddresses": [],
    "claims": [
      "history.history-ulaanbaatar-beijing-1700-1994.c1",
      "history.history-ulaanbaatar-beijing-1700-1994.c2",
      "history.history-ulaanbaatar-beijing-1700-1994.c3",
      "history.history-ulaanbaatar-beijing-1700-1994.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "ubMuseum",
        "url": "https://www.ubmuseum.mn/sample-page/",
        "title": "Улаанбаатар хотын музей: Танилцуулга",
        "bodyPath": "/tmp/history-next15c-source-bodies/ubMuseum.html",
        "bodySha256": "56f5181c7c8d7c920623a15add48ef750619fa63caa2fed15ce33dfc13dbbead",
        "representation": "raw downloaded bytes",
        "makerCustodianEditor": "Ulaanbaatar municipal museum; undated institutional page",
        "publicationOrDocumentDate": "undated",
        "languageMediationAndLimits": "Mongolian; agent paraphrase unreviewed",
        "sourceLevel": "Inherited scholarly/institutional account; source level not upgraded by reuse",
        "locator": "normalized58 site/name periodization",
        "transport": "certificate verification disabled after local chain failure; identity not cryptographically authenticated",
        "extractedTextPath": "/tmp/history-next15c-source-bodies/ubMuseum.txt",
        "extractedTextSha256": "89545fac3ab4aa16a74ea2fa4102001b4307d4e926c59263d331bd5479ddd7f5",
        "terms": "Inherited use remains subject to independent source-use assessment; no imported source expression/media."
      }
    ]
  },
  {
    "id": "qingCommercialOffice",
    "text": "Wang Shih-ming’s English abstract attributes a 1764 Qing order to the Urga Consular Office requiring passports and monitoring Qing subjects in the Tushetu Khan region.",
    "requiredContext": "Bounded commercial/settler competence, not a first amban appointment or all Mongolia jurisdiction. Full article has Chinese extraction corruption; selected English author abstract is actual visually read PDF 57/printed 139.",
    "fieldAddresses": [],
    "claims": [
      "history.history-ulaanbaatar-beijing-1700-1994.c5",
      "history.history-ulaanbaatar-beijing-1700-1994.c6",
      "history.history-ulaanbaatar-beijing-1700-1994.c7",
      "history.history-ulaanbaatar-beijing-1700-1994.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "urgaPaper",
        "url": "https://www.his.ntnu.edu.tw/publish01/downloadfile.php?issue_id=12&locale=en&paper_id=39",
        "title": "Wang Shih-ming, same article fullPDF",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/urgaPaper.body",
        "bodySha256": "01455c1f7bbc90ed390f42a65f119d890834b32ef11316091dd1c49459ae653d",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Wang Shih-ming, same article fullPDF",
        "publicationOrDocumentDate": "2017 scholarly article,57pages+English abstract",
        "languageMediationAndLimits": "Chinese mainbody and English author abstract; some Chinese extractedglyphs corrupt; selectedEnglishpage visually read",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "PDF57/printed139 English author abstract1764 passport/whereabouts order",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/urgaPaper.txt",
        "extractedTextSha256": "f11a15ca0f803f5073727d9fb155087cb284e54051c840bcaa99b9fbbe6c0aa5",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  },
  {
    "id": "regimeRemoval",
    "text": "Kaplonski’s historical outline distinguishes Sando’s 1911 expulsion and new government from 1915 negotiations; the 1945 US memorandum is a separate retrospective diplomatic account.",
    "requiredContext": "Retrospective sovereignty vocabulary is not original 1915 clauses or universal recognition. No diplomatic claims promoted as full settled local experience.",
    "fieldAddresses": [],
    "claims": [
      "history.history-ulaanbaatar-beijing-1700-1994.c9",
      "history.history-ulaanbaatar-beijing-1700-1994.c10",
      "history.history-ulaanbaatar-beijing-1700-1994.c11",
      "history.history-ulaanbaatar-beijing-1700-1994.c12",
      "history.history-ulaanbaatar-beijing-1700-1994.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "urgaCambridgeHistory",
        "url": "https://www.amantuuh.socanth.cam.ac.uk/pages/history.php",
        "title": "Christopher Kaplonski, Cambridge Mongolia Oral History project:History",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/urgaCambridgeHistory.body",
        "bodySha256": "1714b21763f34d78060d2509fa91540cc52709f5981118a4203d58e90db082f6",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Christopher Kaplonski, Cambridge Mongolia Oral History project:History",
        "publicationOrDocumentDate": "Adapted History of Mongolia,Sneath/Kaplonski eds,2010",
        "languageMediationAndLimits": "English scholarly outline;1915uses sovereignty language; no exact treatywording/recognition instrument asserted",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "paragraphs earlyDecember1911ambanexpulsion/newgovernment and1915TripartiteTreaty",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/urgaCambridgeHistory.txt",
        "extractedTextSha256": "4ebd65d418079a6be32ef157ccc4a1fdded64958dc434723342977b69b207d93",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      },
      {
        "sourceId": "mongolia1945",
        "url": "https://history.state.gov/historicaldocuments/frus1945Berlinv02/d1215",
        "title": "Memorandum: Outer Mongolia,19July1945,FRUS Berlin II document1215",
        "bodyPath": "/tmp/history-next15c-source-bodies/mongolia1945.html",
        "bodySha256": "3030e9cdb29d2caaa9180517cb85c0a51ec7529b8229284509f21976028a1cf3",
        "representation": "raw downloaded bytes",
        "makerCustodianEditor": "US Department of State diplomatic memorandum; Office of Historian edition",
        "publicationOrDocumentDate": "1945-07-19",
        "languageMediationAndLimits": "English retrospective diplomatic account, not1915 original",
        "sourceLevel": "Inherited scholarly/institutional account; source level not upgraded by reuse",
        "locator": "Outer Mongolia normalized403–416; retrospective1911/1915 account",
        "transport": "certificate verification disabled after local chain failure; identity not cryptographically authenticated",
        "extractedTextPath": "/tmp/history-next15c-source-bodies/mongolia1945.txt",
        "extractedTextSha256": "b9d9fd4b10675759322534679a34c954b860c88cbe2e6bb779f9460495382b1e",
        "terms": "Inherited use remains subject to independent source-use assessment; no imported source expression/media."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "mobileSite",
    "text": "Urga Mobile through 1778 Ikh Khüree 1778–1911 Niislel Khüree 1911–1924 Ulaanbaatar 1924 Museum Working English Originals uncollated Not fixed 1639 site",
    "claim": "history.history-ulaanbaatar-beijing-1700-1994.c3",
    "countedWords": 18,
    "whitespaceTokens": 23
  },
  {
    "id": "qingCommercialOffice",
    "text": "1764 Urga Consular Office Qing subjects Passports Whereabouts Tushetu Khan region Wang 2017 abstract Originals uncollated Not first amban/all-Mongol rule",
    "claim": "history.history-ulaanbaatar-beijing-1700-1994.c7",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "regimeRemoval",
    "text": "1911 Urga Sando expelled New government 1915 Negotiations Cambridge/1945 diplomatic retrospectives Original treaty uncollated Not automatic recognition or uniform sovereignty",
    "claim": "history.history-ulaanbaatar-beijing-1700-1994.c11",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "Urga Mobile site 1764 Qing commercial office Passports 1911 Sando expelled 1924 Ulaanbaatar Museum/Wang/Cambridge Working English Originals uncollated Site ≠ uniform rule",
    "claim": "history.history-ulaanbaatar-beijing-1700-1994.c14",
    "countedWords": 20,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "mobileSite",
  "qingCommercialOffice",
  "regimeRemoval"
];
export const ATTACHMENTS = {
  "mobileSite": [
    "mobileSite"
  ],
  "qingCommercialOffice": [
    "qingCommercialOffice"
  ],
  "regimeRemoval": [
    "regimeRemoval"
  ]
};
export const PREDICTION = {
  "question": "Does a mobile settlement’s name establish fixed-site foundation or uniform Qing governing power?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "The museum separates mobile settlement phases from the later Ulaanbaatar name. Wang’s abstract describes a specific Qing commercial office’s passport and monitoring remit, not all Mongol government. Kaplonski separately describes Sando’s expulsion and a new government in 1911. Name, site, office competence and regime change are different kinds of evidence; later diplomatic retrospectives cannot supply an uncollated original treaty or universal recognition.";
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
