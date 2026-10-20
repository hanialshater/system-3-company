export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "toledoCouncil",
    "text": "Gallego-Blanco’s study dates the Fourth Council of Toledo to December 633 under Sisenand and Isidore. Canon 75 prescribed royal succession by nobles and bishops and public judgment with leading men, excluding a popular assembly; the study distinguishes this rule from usurpation in practice.",
    "requiredContext": "Elite conciliar prescription distinguished from actual practice. No religious hierarchy or popular consent inferred. Toledo 633 and Cordoba 716–19 are specific city events, not a complete administrative account of all Iberia. Raw PDF page 5/printed 727 visually inspected; originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-toledo-cordoba-600-800.c1",
      "history.history-toledo-cordoba-600-800.c2",
      "history.history-toledo-cordoba-600-800.c3",
      "history.history-toledo-cordoba-600-800.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "toledoCouncil",
        "url": "https://revistas.mjusticia.gob.es/index.php/AHDE/article/download/4483/4483/4308",
        "title": "Los concilios de Toledo y la sucesión al trono visigodo",
        "bodyPath": "/tmp/history-next15f-source-bodies/toledoCouncil.web.txt",
        "bodySha256": "93e4036339e1915b44c9c443800b7820fe82a33a9e4a745ad7b678273b735488",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Enrique Gallego-Blanco; Anuario de Historia del Derecho Español, hosted Ministerio de Justicia",
        "publicationOrDocumentDate": "1974; author dated October 1973",
        "sourceLevel": "Authored scholarly study of conciliar acts",
        "locator": "PDFpage 5, printed 727; web L 121–149@P 4; visually inspected",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/toledoCouncil.web.json",
        "rawToolResponseSha256": "7fdf5d35e6cc82c692f6ad1a2897f07c34aa65da254c807cdb885c4537c0e911",
        "originPdfPath": "/tmp/history-next15f-source-bodies/toledoCouncil.pdf",
        "originPdfSha256": "b36e4cb4a4f32fbaafb5606adb7499435167050bf7fa1d71483a3dff4d8df11c",
        "languageMediationAndLimits": "Verified TLS raw PDF and extracted text retained; actual PDFpage 5, printed 727, visually inspected. Canon 75 prescription is not proof of practice; underlying 1808 act edition uncollated."
      }
    ]
  },
  {
    "id": "cordobaCourt",
    "text": "Cordoba’s account names al-Hurr ibn Abdal Rahman, governor 716–19, choosing the city as al-Andalus’s capital, followed by Samh’s bridge and wall repairs; later Abdal Rahman I established an independent Umayyad court and Rusafa Palace there.",
    "requiredContext": "Elite conciliar prescription distinguished from actual practice. No religious hierarchy or popular consent inferred. Toledo 633 and Cordoba 716–19 are specific city events, not a complete administrative account of all Iberia. Raw PDF page 5/printed 727 visually inspected; originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-toledo-cordoba-600-800.c5",
      "history.history-toledo-cordoba-600-800.c6",
      "history.history-toledo-cordoba-600-800.c7",
      "history.history-toledo-cordoba-600-800.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "cordoba",
        "url": "https://islamansiklopedisi.org.tr/kurtuba",
        "title": "KURTUBA",
        "bodyPath": "/tmp/history-next15f-source-bodies/cordoba.web.txt",
        "bodySha256": "51c3f3c1b0e963dd1680254d07ffb79f2ec144465996696ac662ef88a356f812",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Thomas B. Irving; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2002",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L 99–100",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/cordoba.web.json",
        "rawToolResponseSha256": "c5ecca539aadc3331829b5b0b6253b6bd2b7f6032b70bea1f5b47ab88fd93f5b",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Use dated governor’s selection of capital and later Umayyad palace institutions. Claims of gentle conquest or uniform religious persecution not adopted; later caliphal tenth-century court excluded."
      }
    ]
  },
  {
    "id": "prescriptionAndPractice",
    "text": "Toledo’s 633 elite succession prescription followed Sisenand’s armed overthrow of his predecessor, while Cordoba’s later governor and independent court exercised different offices. Neither account establishes identical local powers or acceptance throughout Iberia.",
    "requiredContext": "Elite conciliar prescription distinguished from actual practice. No religious hierarchy or popular consent inferred. Toledo 633 and Cordoba 716–19 are specific city events, not a complete administrative account of all Iberia. Raw PDF page 5/printed 727 visually inspected; originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-toledo-cordoba-600-800.c9",
      "history.history-toledo-cordoba-600-800.c10",
      "history.history-toledo-cordoba-600-800.c11",
      "history.history-toledo-cordoba-600-800.c12",
      "history.history-toledo-cordoba-600-800.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "toledoCouncil",
        "url": "https://revistas.mjusticia.gob.es/index.php/AHDE/article/download/4483/4483/4308",
        "title": "Los concilios de Toledo y la sucesión al trono visigodo",
        "bodyPath": "/tmp/history-next15f-source-bodies/toledoCouncil.web.txt",
        "bodySha256": "93e4036339e1915b44c9c443800b7820fe82a33a9e4a745ad7b678273b735488",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Enrique Gallego-Blanco; Anuario de Historia del Derecho Español, hosted Ministerio de Justicia",
        "publicationOrDocumentDate": "1974; author dated October 1973",
        "sourceLevel": "Authored scholarly study of conciliar acts",
        "locator": "PDF page 5, printed 727; visually inspected",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/toledoCouncil.web.json",
        "rawToolResponseSha256": "7fdf5d35e6cc82c692f6ad1a2897f07c34aa65da254c807cdb885c4537c0e911",
        "originPdfPath": "/tmp/history-next15f-source-bodies/toledoCouncil.pdf",
        "originPdfSha256": "b36e4cb4a4f32fbaafb5606adb7499435167050bf7fa1d71483a3dff4d8df11c",
        "languageMediationAndLimits": "Verified TLS raw PDF and extracted text retained; actual PDFpage 5, printed 727, visually inspected. Canon 75 prescription is not proof of practice; underlying 1808 act edition uncollated."
      },
      {
        "sourceId": "cordoba",
        "url": "https://islamansiklopedisi.org.tr/kurtuba",
        "title": "KURTUBA",
        "bodyPath": "/tmp/history-next15f-source-bodies/cordoba.web.txt",
        "bodySha256": "51c3f3c1b0e963dd1680254d07ffb79f2ec144465996696ac662ef88a356f812",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Thomas B. Irving; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2002",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L 99–100",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/cordoba.web.json",
        "rawToolResponseSha256": "c5ecca539aadc3331829b5b0b6253b6bd2b7f6032b70bea1f5b47ab88fd93f5b",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Use dated governor’s selection of capital and later Umayyad palace institutions. Claims of gentle conquest or uniform religious persecution not adopted; later caliphal tenth-century court excluded."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "toledoCouncil",
    "text": "633 Toledo Sisenand Isidore Council Canon 75 Nobles/bishops succession Public judgment Elite prescription Gallego-Blanco scholarship Originals uncollated Practice differs",
    "claim": "history.history-toledo-cordoba-600-800.c3",
    "countedWords": 19,
    "whitespaceTokens": 21
  },
  {
    "id": "cordobaCourt",
    "text": "716–719 Cordoba al-Hurr Governor Capital Later Samh repairs Abdal Rahman I Independent court TDV scholarship Working English Originals uncollated Separate acts",
    "claim": "history.history-toledo-cordoba-600-800.c7",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "prescriptionAndPractice",
    "text": "Toledo Succession prescription Armed usurpation Practice differs Cordoba Governor Independent court Gallego-Blanco/TDV Working English Originals uncollated Not all Iberia Not consent",
    "claim": "history.history-toledo-cordoba-600-800.c11",
    "countedWords": 23,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Toledo 633 Nobles/bishops Succession prescription Armed usurpation Cordoba 716–719 Governor Later independent court Gallego-Blanco/TDV Working English Originals uncollated Different powers Not all Iberia",
    "claim": "history.history-toledo-cordoba-600-800.c14",
    "countedWords": 23,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "toledoCouncil",
  "cordobaCourt",
  "prescriptionAndPractice"
];
export const ATTACHMENTS = {
  "toledoCouncil": [
    "toledoCouncil"
  ],
  "cordobaCourt": [
    "cordobaCourt"
  ],
  "prescriptionAndPractice": [
    "prescriptionAndPractice"
  ]
};
export const PREDICTION = {
  "question": "Does Toledo’s elite succession rule establish the same powers or acceptance as Cordoba’s later governors and court?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Gallego-Blanco distinguishes Toledo’s elite succession prescription from armed usurpation in practice. Cordoba’s account instead names a governor choosing a capital and later an independent Umayyad court, with separately situated repairs. A council rule, an appointment and a court are different relationships. These two city witnesses neither establish identical government throughout Iberia nor prove popular acceptance. The original instruments remain uncollated; the rule cannot be substituted for what actually happened.";
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
