import {lessonData} from "./data";
export const RECORDS=lessonData.documents;
export interface SourcePin {url:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "draft",
    "text": "Court draft; Shogunal abolition proposed",
    "requiredContext": "US diplomatic translations Intention ≠ completion",
    "fieldAddresses": [
      "draft.type",
      "draft.offices"
    ],
    "claims": [
      "history.history-tokyo-kyoto-1600-1880.c1",
      "history.history-tokyo-kyoto-1600-1880.c2"
    ],
    "sourcePins": []
  },
  {
    "id": "proclamation",
    "text": "FRUS translation: residence intended; Proclamation states renaming to Tokyo",
    "requiredContext": "US diplomatic translations Intention ≠ completion",
    "fieldAddresses": [
      "proclamation.residence",
      "proclamation.name"
    ],
    "claims": [
      "history.history-tokyo-kyoto-1600-1880.c3",
      "history.history-tokyo-kyoto-1600-1880.c4"
    ],
    "sourcePins": []
  },
  {
    "id": "courtAndShogunateLocations",
    "text": "1868 FRUS: Kyoto court draft; Edo’s former shogunate in separate supplement. Diplomatic English, not a complete seat chronology or identical Japanese witness.",
    "requiredContext": "Court attribution and former shogunate relation derive from separate transmitted passages; do not infer sole capital, universal office location or permanent imperial residence.",
    "fieldAddresses": [
      "purposeAugmentation.witnesses.courtAndShogunateLocations"
    ],
    "claims": [
      "history.history-tokyo-kyoto-1600-1880.c24"
    ],
    "sourcePins": [
      {
        "sourceId": "tokyoJanuary",
        "url": "https://history.state.gov/historicaldocuments/frus1868p1/d297",
        "bodyPath": "/tmp/history-next10-source-bodies/tokyoJanuary.html",
        "bodySha256": "ecd34d99d34b487735974e102f72b2998f5327b2e7aa6eb08141dad3772cb622",
        "extractedTextPath": "/tmp/history-next10-source-bodies/tokyoJanuary.txt",
        "extractedTextSha256": "471c2d242b61f28a896de40d89b7ff32aa6f1cd4a8f929e0c44a2ace8e9ea4f9",
        "acquisitionLedger": "/tmp/history-next10-source-bodies/ledger.json",
        "originalAcquisitionRecord": {
          "id": "tokyoJanuary",
          "url": "https://history.state.gov/historicaldocuments/frus1868p1/d297",
          "finalUrl": "https://history.state.gov/historicaldocuments/frus1868p1/d297",
          "rawSha256": "ecd34d99d34b487735974e102f72b2998f5327b2e7aa6eb08141dad3772cb622",
          "bytes": 85588,
          "textChars": 33471,
          "status": "retrieved; body inspection separately required"
        },
        "representation": "actual acquired HTML and normalized text",
        "locator": "Document297 enclosureNo4, normalized lines392–393 heading Draft of a proclamation of the court of Kioto; cover16January1868 distinct",
        "languageAndScopeLimits": "Court/Kyoto is the transmitted document attribution; not proof a draft was enacted. Cover16January1868 is report date.",
        "rights": "Existing exact source-use return does not automatically cover the new teaching claim. Proposed use: own minimal attributed English facts only, no copied source prose/translation, image, facsimile, geometry, layout or dataset. Independent source-use delta required.",
        "claimsStatus": "unverified",
        "checkedBy": "",
        "checkedOn": ""
      },
      {
        "sourceId": "tokyoProclamation",
        "url": "https://history.state.gov/historicaldocuments/frus1868p1/d381",
        "bodyPath": "/tmp/history-next10-source-bodies/tokyoProclamation.html",
        "bodySha256": "b499c4abc5b94d2645993f9ae9b70b5166dfb0f5fa1e9e7c4bec20a1da80faeb",
        "extractedTextPath": "/tmp/history-next10-source-bodies/tokyoProclamation.txt",
        "extractedTextSha256": "7eddae5db0cda0ee5fccf048c2597e01d4380d83b2e54c35064f7d23bd67b8b5",
        "acquisitionLedger": "/tmp/history-next10-source-bodies/ledger.json",
        "originalAcquisitionRecord": {
          "id": "tokyoProclamation",
          "url": "https://history.state.gov/historicaldocuments/frus1868p1/d381",
          "finalUrl": "https://history.state.gov/historicaldocuments/frus1868p1/d381",
          "rawSha256": "b499c4abc5b94d2645993f9ae9b70b5166dfb0f5fa1e9e7c4bec20a1da80faeb",
          "bytes": 39321,
          "textChars": 9261,
          "status": "retrieved; body inspection separately required"
        },
        "representation": "actual acquired HTML and normalized text",
        "locator": "Document381 separate supplementary explanation after principal proclamation, normalized lines140–144; original Japanese counterpart separately marked副書",
        "languageAndScopeLimits": "Separate diplomatic English supplement says Bakufu established in Yedo and now abolished; do not make it the principal edict or identical to Japanese. Neither gives a complete prior seat chronology.",
        "rights": "Existing exact source-use return does not automatically cover the new teaching claim. Proposed use: own minimal attributed English facts only, no copied source prose/translation, image, facsimile, geometry, layout or dataset. Independent source-use delta required.",
        "claimsStatus": "unverified",
        "checkedBy": "",
        "checkedOn": ""
      }
    ]
  },
  {
    "id": "issuedRestorationOrderAccount",
    "text": "NAJ account: order issued; shogunate and prior court offices abolished; provided for three posts. Keio 3/12/9; working English, Gregorian conversion withheld.",
    "requiredContext": "Account supports reported institutional act, not universal implementation/control or identical text/version with FRUS draft. Retain prior court-office abolition; do not imply all old imperial offices survived unchanged.",
    "fieldAddresses": [
      "purposeAugmentation.witnesses.issuedRestorationOrderAccount"
    ],
    "claims": [
      "history.history-tokyo-kyoto-1600-1880.c25"
    ],
    "sourcePins": [
      {
        "sourceId": "japanRestorationArchive",
        "url": "https://www.archives.go.jp/ayumi/kobetsu/k03_1867_01.html",
        "bodyPath": "/tmp/history-next10-source-bodies/japanRestorationArchive.html",
        "bodySha256": "094ce59825878d67fd62e7d1ce7caeadd958f85aefd66eb5d613ed7cc7d210d3",
        "extractedTextPath": "/tmp/history-next10-source-bodies/japanRestorationArchive.txt",
        "extractedTextSha256": "bc4da465a157595f5922b00b9cfc23433792cdcd0d0b7d36d300ae9a2f739e53",
        "acquisitionLedger": "/tmp/history-next10-source-bodies/held-source-ledger.json",
        "originalAcquisitionRecord": {
          "id": "japanRestorationArchive",
          "url": "https://www.archives.go.jp/ayumi/kobetsu/k03_1867_01.html",
          "finalUrl": "https://www.archives.go.jp/ayumi/kobetsu/k03_1867_01.html",
          "rawSha256": "094ce59825878d67fd62e7d1ce7caeadd958f85aefd66eb5d613ed7cc7d210d3",
          "bytes": 12068,
          "textChars": 1029,
          "status": "retrieved; body inspection separately required"
        },
        "representation": "actual acquired HTML and normalized text",
        "locator": "NAJ item単00167/詔勅録 identification and normalized line181, beneath 慶応3年（1867）12月 heading",
        "languageAndScopeLimits": "Modern National Archives Japanese account says order issued, shogunate AND prior court offices abolished, provided for three posts. Own working English unreviewed; Japanese calendar label Keio3/12/9 retained, Gregorian conversion withheld. This account is separate from the FRUS draft; identical physical/version witness not established.",
        "rights": "Existing exact source-use return does not automatically cover the new teaching claim. Proposed use: own minimal attributed English facts only, no copied source prose/translation, image, facsimile, geometry, layout or dataset. Independent source-use delta required.",
        "claimsStatus": "unverified",
        "checkedBy": "",
        "checkedOn": ""
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "draft",
    "text": "January 1868 report Court draft Shogunal abolition proposed US diplomatic translations Intention ≠ completion",
    "claim": "history.history-tokyo-kyoto-1600-1880.c1 history.history-tokyo-kyoto-1600-1880.c2"
  },
  {
    "id": "proclamation",
    "text": "September 1868 report FRUS translation: residence intended Proclamation states renaming to Tokyo US diplomatic translations Intention ≠ completion",
    "claim": "history.history-tokyo-kyoto-1600-1880.c3 history.history-tokyo-kyoto-1600-1880.c4"
  },
  {
    "id": "courtAndShogunateLocations",
    "text": "1868 FRUS: Kyoto court draft; Edo’s former shogunate in separate supplement. Diplomatic English, not a complete seat chronology or identical Japanese witness.",
    "claim": "history.history-tokyo-kyoto-1600-1880.c24"
  },
  {
    "id": "issuedRestorationOrderAccount",
    "text": "NAJ account: order issued; shogunate and prior court offices abolished; provided for three posts. Keio 3/12/9; working English, Gregorian conversion withheld.",
    "claim": "history.history-tokyo-kyoto-1600-1880.c25"
  },
  {
    "id": "comparison",
    "text": "Kyoto court; Edo shogunate. FRUS supplement separate. NAJ account: shogunate/prior court offices abolished; provided for three posts. Draft/intention≠implementation; Japanese/English uncollated.",
    "claim": "history.history-tokyo-kyoto-1600-1880.c26"
  }
];
export const REQUIRED = [
  "draft",
  "proclamation",
  "courtAndShogunateLocations",
  "issuedRestorationOrderAccount"
];
export const ATTACHMENTS = {
  "draft": [
    "draft"
  ],
  "proclamation": [
    "proclamation"
  ],
  "courtAndShogunateLocations": [
    "courtAndShogunateLocations"
  ],
  "issuedRestorationOrderAccount": [
    "issuedRestorationOrderAccount"
  ]
};
export const PREDICTION = {
  "question": "Does a translated government-office draft alone establish an actual court relocation?",
  "options": [
    "Yes; office changes date completed relocation",
    "No; distinguish draft, intention and completion"
  ],
  "answer": 1
};
export const REVEAL = "January’s draft identity with the Japanese witness is unproved. FRUS says residence; the Japanese principal clause concerns attendance/oversight. Renaming is explicit; the supplement is separate. Neither record establishes draft enactment, actual move, permanent residence, one transfer day, universal agreement or everyone’s wartime experience. Report dates are not promulgation. Separate FRUS passages locate court and former shogunate at Kyoto and Edo. NAJ’s Japanese account separately reports an issued restoration order abolishing shogunate and prior court offices and providing for three posts; working English and calendar conversion remain unreviewed.";
export const ORIENTATION: {claim:string;text:string;context:string;sourcePins:never[]}[] = [];
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
