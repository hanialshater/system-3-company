export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "courtBranch",
    "text": "Polkinghorne reports Ponhea Yat’s court branch moving from Basan to Phnom Penh after an indeterminate stay, while rival Cambodian political centres continued; the account does not establish one uncontested relocation date.",
    "requiredContext": "Actual PDF 8/printed 262–263 inspected by research; uncertain stay and rival political centres preclude an exact universal relocation date.",
    "fieldAddresses": [],
    "claims": [
      "history.history-phnom-penh-angkor-1400-1700.c1",
      "history.history-phnom-penh-angkor-1400-1700.c2",
      "history.history-phnom-penh-angkor-1400-1700.c3",
      "history.history-phnom-penh-angkor-1400-1700.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "angkorStudy",
        "url": "https://angkordatabase.asia/libs/docs/publications/reconfiguring-kingdoms-the-end-of-angkor-and-the-emergence-of-early-modern-period-cambodia/Polkinghorne_M._2018_._Reconfiguring_Kin.pdf",
        "bodyPath": "/tmp/history-next15e-source-bodies/angkorStudy.pdf",
        "bodySha256": "e38492ad246fe9cf9be2c62ff4f4d6ac0920b493c7a5b50647de9afb5336685a",
        "representation": "Actual origin PDF bytes acquired with verified TLS; selected PDF pages8/10 operative, not truncated normalized web response",
        "makerCustodianEditor": "Martin Polkinghorne; in Angkor: Exploring Cambodia’s Sacred City, Asian Civilisations Museum exhibition volume",
        "publicationOrDocumentDate": "2018",
        "sourceLevel": "Authored archaeological/historical museum scholarship",
        "languageMediationAndLimits": "Raw PDF downloaded over verified TLS. Actual PDF pages 8 and 10 (printed 262–263, 266–267) rendered and visually inspected. Chronicles/inscriptions not collated; reoccupation reports and early dates retain uncertainty.",
        "locator": "PDF page 8, printed pp.262–263, right column; visually inspected",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/angkorStudy.web.json",
        "rawToolResponseSha256": "cab93a14f2cb3255ac9271bf1128291159640f6cb5510a9605e0f94c014d9adf",
        "originPdfPath": "/tmp/history-next15e-source-bodies/angkorStudy.pdf",
        "originPdfSha256": "e38492ad246fe9cf9be2c62ff4f4d6ac0920b493c7a5b50647de9afb5336685a",
        "limitedNormalizedRepresentation": {
          "bodyPath": "/tmp/history-next15e-source-bodies/angkorStudy.web.txt",
          "bodySha256": "833a13b395fa5cac30fc0910239d0eec6799490b9acbf08aed660905eaecc6dc",
          "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
          "rawToolResponsePath": "/tmp/history-next15e-source-bodies/angkorStudy.web.json",
          "rawToolResponseSha256": "cab93a14f2cb3255ac9271bf1128291159640f6cb5510a9605e0f94c014d9adf",
          "limit": "Ends L426@P7; does not contain selected PDFpages8/10. Retained provenance only for those later passages."
        },
        "selectedPageExtractions": [
          {
            "pdfPage": 8,
            "path": "/tmp/history-next15e-source-bodies/angkorStudy-page8.txt",
            "sha256": "cd4b99269dc6007a58c974c48bc565759b048f5fed9882c51636f5f3f53f73ec"
          }
        ]
      }
    ]
  },
  {
    "id": "angkorCommunity",
    "text": "At Angkor, mid-sixteenth-century inscriptions and royal descendants’ donations document renewed patronage, restoration and a monastic community; this occurred while political authority remained at Longvek.",
    "requiredContext": "Actual PDF 10/printed 266–267 inspected. Royal descendants’ patronage and a monastic community do not place the governing court permanently at Angkor.",
    "fieldAddresses": [],
    "claims": [
      "history.history-phnom-penh-angkor-1400-1700.c5",
      "history.history-phnom-penh-angkor-1400-1700.c6",
      "history.history-phnom-penh-angkor-1400-1700.c7",
      "history.history-phnom-penh-angkor-1400-1700.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "angkorStudy",
        "url": "https://angkordatabase.asia/libs/docs/publications/reconfiguring-kingdoms-the-end-of-angkor-and-the-emergence-of-early-modern-period-cambodia/Polkinghorne_M._2018_._Reconfiguring_Kin.pdf",
        "bodyPath": "/tmp/history-next15e-source-bodies/angkorStudy.pdf",
        "bodySha256": "e38492ad246fe9cf9be2c62ff4f4d6ac0920b493c7a5b50647de9afb5336685a",
        "representation": "Actual origin PDF bytes acquired with verified TLS; selected PDF pages8/10 operative, not truncated normalized web response",
        "makerCustodianEditor": "Martin Polkinghorne; in Angkor: Exploring Cambodia’s Sacred City, Asian Civilisations Museum exhibition volume",
        "publicationOrDocumentDate": "2018",
        "sourceLevel": "Authored archaeological/historical museum scholarship",
        "languageMediationAndLimits": "Raw PDF downloaded over verified TLS. Actual PDF pages 8 and 10 (printed 262–263, 266–267) rendered and visually inspected. Chronicles/inscriptions not collated; reoccupation reports and early dates retain uncertainty.",
        "locator": "PDF page 10, printed pp.266–267, Return to Angkor section; visually inspected",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/angkorStudy.web.json",
        "rawToolResponseSha256": "cab93a14f2cb3255ac9271bf1128291159640f6cb5510a9605e0f94c014d9adf",
        "originPdfPath": "/tmp/history-next15e-source-bodies/angkorStudy.pdf",
        "originPdfSha256": "e38492ad246fe9cf9be2c62ff4f4d6ac0920b493c7a5b50647de9afb5336685a",
        "limitedNormalizedRepresentation": {
          "bodyPath": "/tmp/history-next15e-source-bodies/angkorStudy.web.txt",
          "bodySha256": "833a13b395fa5cac30fc0910239d0eec6799490b9acbf08aed660905eaecc6dc",
          "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
          "rawToolResponsePath": "/tmp/history-next15e-source-bodies/angkorStudy.web.json",
          "rawToolResponseSha256": "cab93a14f2cb3255ac9271bf1128291159640f6cb5510a9605e0f94c014d9adf",
          "limit": "Ends L426@P7; does not contain selected PDFpages8/10. Retained provenance only for those later passages."
        },
        "selectedPageExtractions": [
          {
            "pdfPage": 10,
            "path": "/tmp/history-next15e-source-bodies/angkorStudy-page10.txt",
            "sha256": "0dca6052fad6a4317be897c41fcbf07cac442e3f82a168756ddfefeb232d5ad1"
          }
        ]
      }
    ]
  },
  {
    "id": "continuityAfterCourt",
    "text": "Relocated court authority did not end all Angkor habitation or religious institutions: the study distinguishes enduring communities and pilgrimage from the court branch at Phnom Penh and later authority at Longvek.",
    "requiredContext": "Population displacement in war remains explicit alongside surviving communities; no single national capital imposed on rival centres or exact date inferred.",
    "fieldAddresses": [],
    "claims": [
      "history.history-phnom-penh-angkor-1400-1700.c9",
      "history.history-phnom-penh-angkor-1400-1700.c10",
      "history.history-phnom-penh-angkor-1400-1700.c11",
      "history.history-phnom-penh-angkor-1400-1700.c12"
    ],
    "sourcePins": [
      {
        "sourceId": "angkorStudy",
        "url": "https://angkordatabase.asia/libs/docs/publications/reconfiguring-kingdoms-the-end-of-angkor-and-the-emergence-of-early-modern-period-cambodia/Polkinghorne_M._2018_._Reconfiguring_Kin.pdf",
        "bodyPath": "/tmp/history-next15e-source-bodies/angkorStudy.pdf",
        "bodySha256": "e38492ad246fe9cf9be2c62ff4f4d6ac0920b493c7a5b50647de9afb5336685a",
        "representation": "Actual origin PDF bytes acquired with verified TLS; selected PDF pages8/10 operative, not truncated normalized web response",
        "makerCustodianEditor": "Martin Polkinghorne; in Angkor: Exploring Cambodia’s Sacred City, Asian Civilisations Museum exhibition volume",
        "publicationOrDocumentDate": "2018",
        "sourceLevel": "Authored archaeological/historical museum scholarship",
        "languageMediationAndLimits": "Raw PDF downloaded over verified TLS. Actual PDF pages 8 and 10 (printed 262–263, 266–267) rendered and visually inspected. Chronicles/inscriptions not collated; reoccupation reports and early dates retain uncertainty.",
        "locator": "PDF page 8, pp.262–263; PDF page 10, pp.266–267; visually inspected",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/angkorStudy.web.json",
        "rawToolResponseSha256": "cab93a14f2cb3255ac9271bf1128291159640f6cb5510a9605e0f94c014d9adf",
        "originPdfPath": "/tmp/history-next15e-source-bodies/angkorStudy.pdf",
        "originPdfSha256": "e38492ad246fe9cf9be2c62ff4f4d6ac0920b493c7a5b50647de9afb5336685a",
        "limitedNormalizedRepresentation": {
          "bodyPath": "/tmp/history-next15e-source-bodies/angkorStudy.web.txt",
          "bodySha256": "833a13b395fa5cac30fc0910239d0eec6799490b9acbf08aed660905eaecc6dc",
          "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
          "rawToolResponsePath": "/tmp/history-next15e-source-bodies/angkorStudy.web.json",
          "rawToolResponseSha256": "cab93a14f2cb3255ac9271bf1128291159640f6cb5510a9605e0f94c014d9adf",
          "limit": "Ends L426@P7; does not contain selected PDFpages8/10. Retained provenance only for those later passages."
        },
        "selectedPageExtractions": [
          {
            "pdfPage": 8,
            "path": "/tmp/history-next15e-source-bodies/angkorStudy-page8.txt",
            "sha256": "cd4b99269dc6007a58c974c48bc565759b048f5fed9882c51636f5f3f53f73ec"
          },
          {
            "pdfPage": 10,
            "path": "/tmp/history-next15e-source-bodies/angkorStudy-page10.txt",
            "sha256": "0dca6052fad6a4317be897c41fcbf07cac442e3f82a168756ddfefeb232d5ad1"
          }
        ]
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "courtBranch",
    "text": "Ponhea Yat Court branch Basan→Phnom Penh Date/stay uncertain Rival centres Polkinghorne 2018 scholarship Chronicles uncollated Not single uncontested capital",
    "claim": "history.history-phnom-penh-angkor-1400-1700.c3",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "angkorCommunity",
    "text": "Mid-sixteenth century Angkor Royal donations Restoration Monastic community Longvek political authority Polkinghorne scholarship Inscriptions/chronicles uncollated Habitation ≠ court seat",
    "claim": "history.history-phnom-penh-angkor-1400-1700.c7",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "continuityAfterCourt",
    "text": "Phnom Penh Court branch Angkor Enduring communities/pilgrimage Longvek authority War displacement Polkinghorne scholarship Originals uncollated Court move ≠ total abandonment",
    "claim": "history.history-phnom-penh-angkor-1400-1700.c11",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "Phnom Penh Court branch Date uncertain Angkor Communities/monastery Longvek political authority War displacement Polkinghorne scholarship Originals uncollated Court relocation ≠ total abandonment",
    "claim": "history.history-phnom-penh-angkor-1400-1700.c13",
    "countedWords": 23,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "courtBranch",
  "angkorCommunity",
  "continuityAfterCourt"
];
export const ATTACHMENTS = {
  "courtBranch": [
    "courtBranch"
  ],
  "angkorCommunity": [
    "angkorCommunity"
  ],
  "continuityAfterCourt": [
    "continuityAfterCourt"
  ]
};
export const PREDICTION = {
  "question": "Does moving a court branch establish that all Angkor institutions and communities disappeared?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Polkinghorne distinguishes a court branch moving through Basan to Phnom Penh from rival centres and uncertain dates. At Angkor, later patronage and monastic life continued while political authority lay at Longvek. Court location, inhabited communities and religious institutions are different relations. Continued life does not erase wartime displacement; the uncollated chronicles do not establish one uncontested capital or relocation date.";
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
