export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "gothicCourt",
    "text": "Procopius describes Vitigis and Gothic notables negotiating under siege at Ravenna",
    "requiredContext": "Procopius is an imperial participant; hostile labels not reproduced. Dewing 1924 edited translation, Greek uncollated; royal negotiation not popular consent.",
    "fieldAddresses": [],
    "claims": [
      "history.history-ravenna-istanbul-500-600.c1",
      "history.history-ravenna-istanbul-500-600.c2",
      "history.history-ravenna-istanbul-500-600.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "procopius",
        "url": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/6E%2A.html",
        "bodyPath": "/tmp/history-next15d-source-bodies/procopius.web.txt",
        "bodySha256": "6ceb0280e15736aba878325af1cdf5b201deab6cacdf965d3f47e75a606762d6",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Procopius sixth-century author; H.B.Dewing Loeb translation1924; Bill Thayer LacusCurtius/UniversityChicago custodian",
        "publicationOrDocumentDate": "sixth-century text/1924 translation",
        "languageMediation": "English edited translation; Greek not collated; explicit book/chapter/paragraph locators",
        "locator": "Wars II.28–29,especially 29.24–38;UNESCOL 49",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "ravenna",
        "url": "https://whc.unesco.org/en/list/788/",
        "bodyPath": "/tmp/history-next15d-source-bodies/ravenna.web.txt",
        "bodySha256": "959b751c618f8aa6b6717c22520b0fd2d7a2e97ea6dab80adceacba7e63f1462",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "UNESCO World Heritage institutional synthesis",
        "publicationOrDocumentDate": "undated",
        "languageMediation": "English; scholarly/institutional retrospective, underlying original not independently collated",
        "locator": "Wars II.28–29,especially 29.24–38;UNESCOL 49",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "imperialOffice",
    "text": "Sarris describes Justinian’s Constantinople imperial office and John Cappadocian’s disputed tax oversight in 538–39 edict",
    "requiredContext": "Sarris interprets an edict concerning Egyptian tax administration and Constantinople oversight, not Ravenna taxation or uniform imperial control. Original edict uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-ravenna-istanbul-500-600.c4",
      "history.history-ravenna-istanbul-500-600.c5",
      "history.history-ravenna-istanbul-500-600.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "constantinople",
        "url": "https://assets.cambridge.org/97805218/65432/excerpt/9780521865432_excerpt.htm",
        "bodyPath": "/tmp/history-next15d-source-bodies/constantinople.web.txt",
        "bodySha256": "bfa02d898bfd7938e199059601b06633b05dea2caeb4c05e4eb4e17bfa133278",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Peter Sarris; Cambridge University Press official excerpt",
        "publicationOrDocumentDate": "2006",
        "languageMediation": "English; scholarly/institutional retrospective, underlying original not independently collated",
        "locator": "L 5–16,538–39 edictdiscussion",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "captureCommand",
    "text": "Procopius describes Belisarius entering Ravenna, holding Vitigis and claiming palace money for emperor; kingship refused",
    "requiredContext": "Selected passage ends the fifth war-year, conventionally 540 without an exact month. Capture, custody, palace money and refused kingship do not establish a later exarchate. Greek uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-ravenna-istanbul-500-600.c7",
      "history.history-ravenna-istanbul-500-600.c8",
      "history.history-ravenna-istanbul-500-600.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "procopius",
        "url": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/6E%2A.html",
        "bodyPath": "/tmp/history-next15d-source-bodies/procopius.web.txt",
        "bodySha256": "6ceb0280e15736aba878325af1cdf5b201deab6cacdf965d3f47e75a606762d6",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Procopius sixth-century author; H.B.Dewing Loeb translation1924; Bill Thayer LacusCurtius/UniversityChicago custodian",
        "publicationOrDocumentDate": "sixth-century text/1924 translation",
        "languageMediation": "English edited translation; Greek not collated; explicit book/chapter/paragraph locators",
        "locator": "Wars II.29.30–38 and II.30.2,28–30",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "gothicCourt",
    "text": "Ravenna Vitigis Gothic court Negotiations under siege Procopius imperial participant Dewing 1924 translation Greek uncollated Not popular consent",
    "claim": "history.history-ravenna-istanbul-500-600.c3",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "imperialOffice",
    "text": "538–539 Constantinople Istanbul today Justinian Imperial office John Cappadocian Prefect Disputed Egyptian tax oversight Sarris scholarly account Original edict uncollated",
    "claim": "history.history-ravenna-istanbul-500-600.c6 history.history-ravenna-istanbul-500-600.c14",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "captureCommand",
    "text": "Fifth war-year Ravenna Belisarius Enters Holds Vitigis Palace money for emperor Kingship refused Procopius Dewing 1924 translation Greek uncollated",
    "claim": "history.history-ravenna-istanbul-500-600.c9",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "comparison",
    "text": "Ravenna Vitigis court Belisarius capture Palace money for emperor Procopius Dewing 1924 Greek uncollated Constantinople Istanbul today Justinian Prefect Sarris Edict uncollated Different powers",
    "claim": "history.history-ravenna-istanbul-500-600.c10 history.history-ravenna-istanbul-500-600.c14",
    "countedWords": 25,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "gothicCourt",
  "imperialOffice",
  "captureCommand"
];
export const ATTACHMENTS = {
  "gothicCourt": [
    "gothicCourt"
  ],
  "imperialOffice": [
    "imperialOffice"
  ],
  "captureCommand": [
    "captureCommand"
  ]
};
export const PREDICTION = {
  "question": "Does a city’s capture establish the same authority as a royal court or imperial tax office?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Procopius describes Vitigis’s court under siege and Belisarius’s capture, custody and claim on palace money for the emperor. Sarris separately describes Justinian’s imperial office and disputed Egyptian tax oversight. Royal negotiation, military capture and fiscal supervision are different relations. Neither an imperial participant’s account nor an edict establishes universal consent or effortless control.";
export const ORIENTATION: {claim:string;text:string;context:string;sourcePins:SourcePin[]}[] = [
  {
    "claim": "history.history-ravenna-istanbul-500-600.c14",
    "text": "Constantinople is located on the historic peninsula of Istanbul today.",
    "context": "Modern reader orientation only. Preserve historical Constantinople; no identical modern boundaries, continuity of government, territorial equivalence or new anchor geometry. This pin does not support the historical imperial-office facts.",
    "sourcePins": [
      {
        "sourceId": "istanbulUNESCOOrientation",
        "url": "https://whc.unesco.org/en/list/356/",
        "title": "Historic Areas of Istanbul",
        "bodyPath": "company/research/history-special-twelve/istanbulUNESCO-normalized.txt",
        "bodySha256": "39aa4d792b9c589f7e9f78f4e8106a6990703af341ee1fa8e683e469e4b2932d",
        "representation": "trusted web-tool normalized full body; not origin HTML or raw source SHA",
        "makerCustodianEditor": "UNESCO World Heritage Centre; adopted site Outstanding Universal Value synthesis",
        "publicationOrDocumentDate": "Undated retained UNESCO Outstanding Universal Value synthesis; modern orientation only",
        "locator": "web body lines46–47, Outstanding Universal Value / Brief synthesis",
        "transportLimit": "Direct verified curl returned403 retained in acquisition03; web normalized full body acquired. No raw HTTP200 claim."
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
