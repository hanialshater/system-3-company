export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "hangzhouOffices",
    "text": "The Hangzhou account names Song chancellors and the privy council in 1276 negotiations, then records surrender of seals, abolition of former offices, and a Liangzhe governorate under Mongol and former Song appointees.",
    "requiredContext": "1276 is antecedent to 1279, not relabelled 1279. Institutional Chinese retrospective; no peaceful-conquest/valorizing interpretation or universal consent adopted.",
    "fieldAddresses": [],
    "claims": [
      "history.history-hangzhou-beijing-1279-1400.c1",
      "history.history-hangzhou-beijing-1279-1400.c2",
      "history.history-hangzhou-beijing-1279-1400.c3",
      "history.history-hangzhou-beijing-1279-1400.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "hangzhou",
        "url": "https://www.hzzx.gov.cn/hzzx/content/2010-10/26/content_5139476.htm",
        "bodyPath": "/tmp/history-next15e-source-bodies/hangzhou.web.txt",
        "bodySha256": "4636282345be51b1b40bd0b01c5382784bd6341f021e56f985fe18c815d7b088",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Hangzhou CPPCC institutional historical essay; individual author not established",
        "publicationOrDocumentDate": "2010-10-26",
        "sourceLevel": "Institutional retrospective",
        "languageMediationAndLimits": "Retrospective Chinese text; own minimal English facts, no translated passage asset. Its valorizing interpretation and claims of peaceful conquest are not adopted.",
        "locator": "web L7, paragraphs on January–February 1276",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/hangzhou.web.json",
        "rawToolResponseSha256": "7756cac3839b095ca1422626503d4ce92f4f5f09ba92d051daa7ac379321b038",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "beipingCommands",
    "text": "The Palace Museum names Beiping's Ming civil and military officials Zhang Bing and Xie Gui, their killing by the Prince of Yan in 1399, and failed imperial negotiations with Yan in the explicitly dated 1400 entry.",
    "requiredContext": "Beiping’s Ming civil/military and princely commands are contested. The Museum account identifies Nanjing as the imperial capital during the struggle; 1421 capital move excluded.",
    "fieldAddresses": [],
    "claims": [
      "history.history-hangzhou-beijing-1279-1400.c5",
      "history.history-hangzhou-beijing-1279-1400.c6",
      "history.history-hangzhou-beijing-1279-1400.c7",
      "history.history-hangzhou-beijing-1279-1400.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "beipingJianwen",
        "url": "https://www.dpm.org.cn/court/lineage/226245.html",
        "bodyPath": "/tmp/history-next15e-source-bodies/beipingJianwen.web.txt",
        "bodySha256": "8233ddba64294af2a1fb537cdfe7f9f995324f64eb41e3bb7a82633a0235cacd",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Palace Museum, Beijing",
        "publicationOrDocumentDate": "Publication date not stated; chronology explicitly 1398–1402",
        "sourceLevel": "Institutional retrospective court chronology",
        "languageMediationAndLimits": "Own English synthesis of Chinese account; chronicle originals uninspected. Institutional and dynastic perspective, no endorsement of legitimacy claims.",
        "locator": "L170–181 appointments/killing; L180–181 failed1400talks; contextual L161/184/188 Nanjing capital during struggle, not a1400entry capital statement",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/beipingJianwen.web.json",
        "rawToolResponseSha256": "6787b1573a476d016e1aa4b9625b6d56b13c366bbd12643d3bf11b18a42732ce",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "officeContrast",
    "text": "Hangzhou's surrendered offices and Beiping's contested Ming provincial and princely commands are different institutions; the Museum account identifies Nanjing as the imperial capital during the struggle, so conquest and later capital designation cannot be treated as one change.",
    "requiredContext": "Different city offices, protagonists and dates; no assumption all military capture instantly transfers a capital or all local administration.",
    "fieldAddresses": [],
    "claims": [
      "history.history-hangzhou-beijing-1279-1400.c9",
      "history.history-hangzhou-beijing-1279-1400.c10",
      "history.history-hangzhou-beijing-1279-1400.c11",
      "history.history-hangzhou-beijing-1279-1400.c12",
      "history.history-hangzhou-beijing-1279-1400.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "hangzhou",
        "url": "https://www.hzzx.gov.cn/hzzx/content/2010-10/26/content_5139476.htm",
        "bodyPath": "/tmp/history-next15e-source-bodies/hangzhou.web.txt",
        "bodySha256": "4636282345be51b1b40bd0b01c5382784bd6341f021e56f985fe18c815d7b088",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Hangzhou CPPCC institutional historical essay; individual author not established",
        "publicationOrDocumentDate": "2010-10-26",
        "sourceLevel": "Institutional retrospective",
        "languageMediationAndLimits": "Retrospective Chinese text; own minimal English facts, no translated passage asset. Its valorizing interpretation and claims of peaceful conquest are not adopted.",
        "locator": "web L7",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/hangzhou.web.json",
        "rawToolResponseSha256": "7756cac3839b095ca1422626503d4ce92f4f5f09ba92d051daa7ac379321b038",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "beipingJianwen",
        "url": "https://www.dpm.org.cn/court/lineage/226245.html",
        "bodyPath": "/tmp/history-next15e-source-bodies/beipingJianwen.web.txt",
        "bodySha256": "8233ddba64294af2a1fb537cdfe7f9f995324f64eb41e3bb7a82633a0235cacd",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Palace Museum, Beijing",
        "publicationOrDocumentDate": "Publication date not stated; chronology explicitly 1398–1402",
        "sourceLevel": "Institutional retrospective court chronology",
        "languageMediationAndLimits": "Own English synthesis of Chinese account; chronicle originals uninspected. Institutional and dynastic perspective, no endorsement of legitimacy claims.",
        "locator": "L170–181 appointments/killing; L180–181 failed1400talks; contextual L161/184/188 Nanjing capital during struggle, not a1400entry capital statement",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/beipingJianwen.web.json",
        "rawToolResponseSha256": "6787b1573a476d016e1aa4b9625b6d56b13c366bbd12643d3bf11b18a42732ce",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "hangzhouOffices",
    "text": "1276 Antecedent Hangzhou Song chancellors/privy council Surrender seals Former offices abolished Liangzhe governorate Mixed appointees CPPCC retrospective Working English Originals uncollated",
    "claim": "history.history-hangzhou-beijing-1279-1400.c3",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "beipingCommands",
    "text": "1399 Beiping Beijing today Ming Zhang Bing/Xie Gui Officials killed Prince of Yan 1400 Imperial negotiations fail Palace Museum retrospective Working English Originals uncollated",
    "claim": "history.history-hangzhou-beijing-1279-1400.c7 history.history-hangzhou-beijing-1279-1400.c18",
    "countedWords": 24,
    "whitespaceTokens": 26
  },
  {
    "id": "officeContrast",
    "text": "1276 Antecedent Hangzhou Governorate 1399–1400 Beiping Contested Ming commands Nanjing imperial capital Institutional retrospectives Working English Originals uncollated Conquest ≠ capital designation",
    "claim": "history.history-hangzhou-beijing-1279-1400.c11",
    "countedWords": 21,
    "whitespaceTokens": 24
  },
  {
    "id": "comparison",
    "text": "1276 Antecedent Hangzhou Governorate Song/Mongol appointees 1399–1400 Beiping Beijing today Ming officials/Prince of Yan Nanjing capital Institutional accounts Working English Originals uncollated Distinct acts",
    "claim": "history.history-hangzhou-beijing-1279-1400.c14 history.history-hangzhou-beijing-1279-1400.c18",
    "countedWords": 24,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "hangzhouOffices",
  "beipingCommands",
  "officeContrast"
];
export const ATTACHMENTS = {
  "hangzhouOffices": [
    "hangzhouOffices"
  ],
  "beipingCommands": [
    "beipingCommands"
  ],
  "officeContrast": [
    "officeContrast"
  ]
};
export const PREDICTION = {
  "question": "Do surrendered offices and contested provincial commands establish one simultaneous capital change?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Hangzhou’s account describes surrendered Song offices and a Liangzhe governorate in 1276, an antecedent to the selected interval. The Palace Museum instead records contested Ming commands at Beiping in 1399–1400, while the imperial capital remained Nanjing. Surrender, provincial command and capital status are different relations; these retrospectives establish neither peaceful conquest nor a later 1421 capital move.";
export const EXPLORE_HINT = "Read each record, then compare them.";
export const PERIOD_DISCLOSURE = "";
export const PERIOD_SCOPE = "";
export const PERIOD_CLAIM = "";
export const ORIENTATION: {claim:string;text:string;context:string;sourcePins:SourcePin[]}[] = [
  {
    "claim": "history.history-hangzhou-beijing-1279-1400.c18",
    "text": "Historical Beiping is Beijing today.",
    "context": "Modern name/site orientation only; historical Beiping retained. No identical municipal boundaries, continuous authority, changed selectedperiod or1421capitalmove inference. Abstract acquired, fullpaywalledarticle not acquired.",
    "sourcePins": [
      {
        "sourceId": "beipingDryburgh",
        "url": "https://www.cambridge.org/core/journals/urban-history/article/national-city-human-city-the-reimagining-and-revitalization-of-beiping-192837/68764F93113D9EA01EB177DAAF9BE009",
        "title": "National city, human city: the reimagining and revitalization of Beiping, 1928–37",
        "bodyPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-final-two/beipingDryburgh.body",
        "bodySha256": "173230f3b588cdb597f8ce462d6c5c50440f3a218c8bcc8d5b18ee5d488c2f28",
        "representation": "Actual TLS-verified publisher HTML; normalized extraction separately pinned",
        "makerCustodianEditor": "Marjorie Dryburgh; Urban History32(3), December2005, pp500–524; online6April2006; DOI10.1017/S0963926805003263",
        "publicationOrDocumentDate": "Urban History32(3), December2005, pp500–524; online6April2006; DOI10.1017/S0963926805003263",
        "sourceLevel": "Modern scholarly article; abstract only",
        "locator": "Abstract opening; normalized text line26",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-final-two/beipingDryburgh-text.txt",
        "extractedTextSha256": "a141f77ca906d040b98c75731126dfad1252cdb46339de5ac2a7b7f6f9045ec8",
        "languageMediationAndLimits": "Publisher HTML normalized with lxml: scripts/styles removed, nonempty stripped text lines retained; original HTML retained. Minimal name orientation only. No historical boundary equivalence, selected-period revision, or1421capital move inference. Acquired abstract suffices for this explicit identity; paywalled full article was not acquired.",
        "terms": "No open reuse license asserted. Research quotation and own English paraphrase only; learner source-use review remains separate."
      }
    ]
  }
];
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
