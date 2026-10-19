export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "baghdadAdministration",
    "text": "Hulagu put Ata-Malek Jovayni in charge of Baghdad administration in 1259, after its 1258 capture; under Abaqa, a Mongol general held overall provincial governorship alongside him.",
    "requiredContext": "Hulagu appointed the administrator after capture. Under Abaqa, a Mongol general held overall provincial governorship; do not collapse the two offices.",
    "fieldAddresses": [],
    "claims": [
      "history.history-baghdad-tabriz-1200-1279.c1",
      "history.history-baghdad-tabriz-1200-1279.c2",
      "history.history-baghdad-tabriz-1200-1279.c3",
      "history.history-baghdad-tabriz-1200-1279.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "baghdad",
        "url": "https://www.iranicaonline.org/articles/jovayni-ala-al-din/",
        "bodyPath": "/tmp/history-next15e-source-bodies/baghdad.web.txt",
        "bodySha256": "70712fb25be1f7a53d7ff6bcf99fa3292c84040aba085671c0f7d5eb3ec8f902",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "George E. Lane; Encyclopaedia Iranica",
        "publicationOrDocumentDate": "2009-06-15; updated 2017-05-08",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Original Persian accounts uncollated; author’s praise and explanation of Jovayni’s loyalty are not adopted.",
        "locator": "web L48–50",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/baghdad.web.json",
        "rawToolResponseSha256": "034e5fbedd0f70c984270e56a1d273f676f64ca9e20ca296932ae667e1d15268",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "tabrizCourt",
    "text": "Abaqa established his capital at Tabriz on accession in 1265, usually spending summers there and winters in Mazandaran; Shams al-Din Jovayni held the sahib-divan office throughout his reign.",
    "requiredContext": "Abaqa usually spent summers at Tabriz and winters in Mazandaran; Shams al-Din held the sahib-divan office throughout his reign. No uniform recovery or popular approval.",
    "fieldAddresses": [],
    "claims": [
      "history.history-baghdad-tabriz-1200-1279.c5",
      "history.history-baghdad-tabriz-1200-1279.c6",
      "history.history-baghdad-tabriz-1200-1279.c7",
      "history.history-baghdad-tabriz-1200-1279.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "abaqa",
        "url": "https://www.iranicaonline.org/articles/abaqa/",
        "bodyPath": "/tmp/history-next15e-source-bodies/abaqa.web.txt",
        "bodySha256": "8e9ce437dda790b23831f4f4d070eedcd79faba5f0ca852d602d60455028f4fd",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Peter Jackson; Encyclopaedia Iranica",
        "publicationOrDocumentDate": "1982-12-15",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Qualified retrospective; cited originals uninspected and uncollated. Own minimal English proposed facts only.",
        "locator": "web L32–33, L51–52",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/abaqa.web.json",
        "rawToolResponseSha256": "db48b5b781ccbf0d4204fc7ac2a1ce526ff8b729c0733f14ef589e856cbebac9",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "administrationVersusCourt",
    "text": "Baghdad’s administrator and superior military governor differ from Tabriz’s seasonally resident sovereign and central divan. These named offices follow conquest rather than making conquest itself an administrative system.",
    "requiredContext": "Named distinct offices and seasonal court presence follow coercive conquest; no claim that every city had the same balance of power.",
    "fieldAddresses": [],
    "claims": [
      "history.history-baghdad-tabriz-1200-1279.c9",
      "history.history-baghdad-tabriz-1200-1279.c10",
      "history.history-baghdad-tabriz-1200-1279.c11",
      "history.history-baghdad-tabriz-1200-1279.c12",
      "history.history-baghdad-tabriz-1200-1279.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "baghdad",
        "url": "https://www.iranicaonline.org/articles/jovayni-ala-al-din/",
        "bodyPath": "/tmp/history-next15e-source-bodies/baghdad.web.txt",
        "bodySha256": "70712fb25be1f7a53d7ff6bcf99fa3292c84040aba085671c0f7d5eb3ec8f902",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "George E. Lane; Encyclopaedia Iranica",
        "publicationOrDocumentDate": "2009-06-15; updated 2017-05-08",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Original Persian accounts uncollated; author’s praise and explanation of Jovayni’s loyalty are not adopted.",
        "locator": "web L48–49",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/baghdad.web.json",
        "rawToolResponseSha256": "034e5fbedd0f70c984270e56a1d273f676f64ca9e20ca296932ae667e1d15268",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "abaqa",
        "url": "https://www.iranicaonline.org/articles/abaqa/",
        "bodyPath": "/tmp/history-next15e-source-bodies/abaqa.web.txt",
        "bodySha256": "8e9ce437dda790b23831f4f4d070eedcd79faba5f0ca852d602d60455028f4fd",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Peter Jackson; Encyclopaedia Iranica",
        "publicationOrDocumentDate": "1982-12-15",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Qualified retrospective; cited originals uninspected and uncollated. Own minimal English proposed facts only.",
        "locator": "web L51–52",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/abaqa.web.json",
        "rawToolResponseSha256": "db48b5b781ccbf0d4204fc7ac2a1ce526ff8b729c0733f14ef589e856cbebac9",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "baghdadAdministration",
    "text": "1258 Capture 1259 Baghdad Ata-Malek Jovayni Administrator Mongol general Superior governor Iranica scholarship Persian originals uncollated Conquest ≠ consent",
    "claim": "history.history-baghdad-tabriz-1200-1279.c3",
    "countedWords": 18,
    "whitespaceTokens": 21
  },
  {
    "id": "tabrizCourt",
    "text": "1265 Tabriz Abaqa Capital Seasonal residence Shams al-Din Jovayni Sahib-divan Iranica scholarship Originals uncollated Mobile court ≠ every local power",
    "claim": "history.history-baghdad-tabriz-1200-1279.c7",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "administrationVersusCourt",
    "text": "Baghdad Administrator Superior military governor Tabriz Seasonal sovereign Central divan Iranica scholarship Originals uncollated Capture ≠ identical administration or voluntary affiliation",
    "claim": "history.history-baghdad-tabriz-1200-1279.c11",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "1259 Baghdad Jovayni Administrator Superior Mongol governor 1265 Tabriz Seasonal Abaqa court Central divan Iranica scholarship Originals uncollated Conquest ≠ identical offices",
    "claim": "history.history-baghdad-tabriz-1200-1279.c14",
    "countedWords": 21,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "baghdadAdministration",
  "tabrizCourt",
  "administrationVersusCourt"
];
export const ATTACHMENTS = {
  "baghdadAdministration": [
    "baghdadAdministration"
  ],
  "tabrizCourt": [
    "tabrizCourt"
  ],
  "administrationVersusCourt": [
    "administrationVersusCourt"
  ]
};
export const PREDICTION = {
  "question": "Does conquest establish the same administrator, military governor and resident court?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Iranica distinguishes Baghdad’s appointed administrator from a superior Mongol governor after conquest. At Tabriz it describes Abaqa’s seasonal court and Shams al-Din Jovayni’s central office. These are different governing relations following coercive conquest, not an administrative system supplied by a new imperial label. The retrospective accounts and uncollated originals establish neither uniform recovery nor popular approval.";
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
