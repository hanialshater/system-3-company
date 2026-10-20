export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "changanCourt",
    "text": "The Daming Palace account places the Tang complex at Chang’an, now Xi’an, dates initial construction to 634 and renovations/name changes to 662 and 670, and identifies Xuanzheng Hall as a court for conferring titles and announcing policies.",
    "requiredContext": "Chang’an/modern Xi’an anchored to the Tang Daming Palace site, not an uninspected same-named modern county. Luoyang 516 Northern Wei commission is an intervening court witness. Tang name changes and dynastic gaps do not mean city abandonment; no continuous Han–Tang uniform government inferred.",
    "fieldAddresses": [],
    "claims": [
      "history.history-xian-luoyang-200-700.c1",
      "history.history-xian-luoyang-200-700.c2",
      "history.history-xian-luoyang-200-700.c3",
      "history.history-xian-luoyang-200-700.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "daming",
        "url": "https://en.chinaculture.org/gb/en_travel/2003-09/24/content_34024.htm",
        "title": "Daming Palace",
        "bodyPath": "/tmp/history-next15f-source-bodies/daming.web.txt",
        "bodySha256": "042e12cf88be2d85aec8ea247feed07202458ac0db080f00563fcc11fa662d01",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "ChinaCulture institutional cultural heritage account",
        "publicationOrDocumentDate": "URLdated 2003-09-24; body update date not stated",
        "sourceLevel": "Institutional heritage retrospective",
        "locator": "openingchronology and Xuanzheng Hall paragraph",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/daming.web.json",
        "rawToolResponseSha256": "33891af628bacf73e319b0c8cdff6430b6ad838af5ff2675dc1b0ea4de997128",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Actual Tang Chang’an site near modern Xi’an. Names 635/662/670/701 not treated as newcities;701 outsideendpoint. Generic court functions not assigned unchanged to everyyear."
      }
    ]
  },
  {
    "id": "luoyangCommission",
    "text": "The Nara Institute report places Northern Wei Luoyang’s Yongning-sitemple beside the imperial road before the imperial palace and dates Empress Hu’s commission to 516 under Emperor Xiaoming.",
    "requiredContext": "Chang’an/modern Xi’an anchored to the Tang Daming Palace site, not an uninspected same-named modern county. Luoyang 516 Northern Wei commission is an intervening court witness. Tang name changes and dynastic gaps do not mean city abandonment; no continuous Han–Tang uniform government inferred.",
    "fieldAddresses": [],
    "claims": [
      "history.history-xian-luoyang-200-700.c5",
      "history.history-xian-luoyang-200-700.c6",
      "history.history-xian-luoyang-200-700.c7",
      "history.history-xian-luoyang-200-700.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "luoyang",
        "url": "https://www.nabunken.go.jp/english/historical-material/47.html",
        "title": "The Yongning-si Temple in Northern Wei Luoyang: Excavations during 1979–1994",
        "bodyPath": "/tmp/history-next15f-source-bodies/luoyang.web.txt",
        "bodySha256": "4716e29bbdf0f6fe4553acfffa885a39bf483d63ff15f56fdd88c2c18fc44479",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Nara National Research Institute for Cultural Properties institutional report on Chinese Academy archaeological excavation",
        "publicationOrDocumentDate": "Online publication date not stated; report describes 1979–1994 excavations",
        "sourceLevel": "Institutional archaeological report",
        "locator": "web L 180–181",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/luoyang.web.json",
        "rawToolResponseSha256": "c44fc097688068f6b815eeda98257bd723d1aedf2e483cd6a56f07b52852b0b2",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Northern Wei 516 court/state-temple commission; no claim Hanand Tangcontinuousgovernment. Translated report phrasing and citedancientbook uncollated."
      }
    ]
  },
  {
    "id": "interveningInstitutions",
    "text": "Luoyang’s 516 imperial commission belongs to Northern Wei between Han and Tang, while Chang’an’s later Tang court used a distinct palace complex and court functions. These dated institutions prevent the gap from being read as no government or one continuous dynasty.",
    "requiredContext": "Chang’an/modern Xi’an anchored to the Tang Daming Palace site, not an uninspected same-named modern county. Luoyang 516 Northern Wei commission is an intervening court witness. Tang name changes and dynastic gaps do not mean city abandonment; no continuous Han–Tang uniform government inferred.",
    "fieldAddresses": [],
    "claims": [
      "history.history-xian-luoyang-200-700.c9",
      "history.history-xian-luoyang-200-700.c10",
      "history.history-xian-luoyang-200-700.c11",
      "history.history-xian-luoyang-200-700.c12",
      "history.history-xian-luoyang-200-700.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "luoyang",
        "url": "https://www.nabunken.go.jp/english/historical-material/47.html",
        "title": "The Yongning-si Temple in Northern Wei Luoyang: Excavations during 1979–1994",
        "bodyPath": "/tmp/history-next15f-source-bodies/luoyang.web.txt",
        "bodySha256": "4716e29bbdf0f6fe4553acfffa885a39bf483d63ff15f56fdd88c2c18fc44479",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Nara National Research Institute for Cultural Properties institutional report on Chinese Academy archaeological excavation",
        "publicationOrDocumentDate": "Online publication date not stated; report describes 1979–1994 excavations",
        "sourceLevel": "Institutional archaeological report",
        "locator": "web L 180–181",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/luoyang.web.json",
        "rawToolResponseSha256": "c44fc097688068f6b815eeda98257bd723d1aedf2e483cd6a56f07b52852b0b2",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Northern Wei 516 court/state-temple commission; no claim Hanand Tangcontinuousgovernment. Translated report phrasing and citedancientbook uncollated."
      },
      {
        "sourceId": "daming",
        "url": "https://en.chinaculture.org/gb/en_travel/2003-09/24/content_34024.htm",
        "title": "Daming Palace",
        "bodyPath": "/tmp/history-next15f-source-bodies/daming.web.txt",
        "bodySha256": "042e12cf88be2d85aec8ea247feed07202458ac0db080f00563fcc11fa662d01",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "ChinaCulture institutional cultural heritage account",
        "publicationOrDocumentDate": "URLdated 2003-09-24; body update date not stated",
        "sourceLevel": "Institutional heritage retrospective",
        "locator": "openingchronology; Xuanzheng Hall court functions",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/daming.web.json",
        "rawToolResponseSha256": "33891af628bacf73e319b0c8cdff6430b6ad838af5ff2675dc1b0ea4de997128",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Actual Tang Chang’an site near modern Xi’an. Names 635/662/670/701 not treated as newcities;701 outsideendpoint. Generic court functions not assigned unchanged to everyyear."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "changanCourt",
    "text": "634/662/670 Chang’an Xi’an today Daming Palace Xuanzheng Hall Titles/policies Tang institutional account Working English Originals uncollated Name changes ≠ abandonment",
    "claim": "history.history-xian-luoyang-200-700.c3",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "luoyangCommission",
    "text": "516 Luoyang Northern Wei Empress Hu Emperor Xiaoming Yongning-si Temple Imperial road/palace Nara report Working English Originals uncollated Intervening court",
    "claim": "history.history-xian-luoyang-200-700.c7",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "interveningInstitutions",
    "text": "516 Luoyang Northern Wei Imperial commission Later Chang’an Tang Court functions Institutional accounts Working English Originals uncollated Dynastic gap ≠ no government",
    "claim": "history.history-xian-luoyang-200-700.c11",
    "countedWords": 22,
    "whitespaceTokens": 24
  },
  {
    "id": "comparison",
    "text": "Luoyang 516 Northern Wei Imperial commission Chang’an Xi’an today 634/662/670 Tang Palace Titles/policies Institutional accounts Working English Originals uncollated Gap ≠ no government",
    "claim": "history.history-xian-luoyang-200-700.c14",
    "countedWords": 22,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "changanCourt",
  "luoyangCommission",
  "interveningInstitutions"
];
export const ATTACHMENTS = {
  "changanCourt": [
    "changanCourt"
  ],
  "luoyangCommission": [
    "luoyangCommission"
  ],
  "interveningInstitutions": [
    "interveningInstitutions"
  ]
};
export const PREDICTION = {
  "question": "Does a gap between Han and Tang labels mean no governing institution existed at the cities in between?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "The Luoyang report places Empress Hu’s temple commission beside Northern Wei’s imperial road and palace in 516. The later Chang’an account identifies a Tang palace court that conferred titles and announced policies, with distinct construction and naming dates. These intervening institutions prevent a Han-to-Tang label gap from meaning no government. They do not prove continuous Han–Tang rule, city abandonment or identical powers at both sites. Originals remain uncollated.";
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
