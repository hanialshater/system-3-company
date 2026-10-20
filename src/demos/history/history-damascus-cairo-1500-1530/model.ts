export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "damascusElites",
    "text": "Damascus judges/notables submitted to Selim before 1516 entry; judge Wali Farfur proclaimed his title",
    "requiredContext": "Specified judges/notables and Wali Farfur do not represent all residents. No peaceful conquest or universal consent; originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-damascus-cairo-1500-1530.c1",
      "history.history-damascus-cairo-1500-1530.c2",
      "history.history-damascus-cairo-1500-1530.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "damascus1516",
        "url": "https://islamansiklopedisi.org.tr/sam--suriye",
        "bodyPath": "/tmp/history-next15d-source-bodies/damascus1516.web.txt",
        "bodySha256": "583b3b730ba5e63ab3d10322e2cfd862c1283cf8f6940231103246313a76bd91",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Ş.Tufan Buzpınar,TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2010",
        "languageMediation": "Turkish scholarship; brief English paraphrase; not independently reviewed",
        "locator": "L 303–306",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "cairoCourt",
    "text": "Hayir Bey governed Egypt from Cairo citadel September 1517; Saturday court used chief judges/subashi and retained selected Mamluk aides",
    "requiredContext": "Hayir’s court and selected retained Mamluk aides do not establish all local institutions replaced or universal operation. Turkish working English; originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-damascus-cairo-1500-1530.c4",
      "history.history-damascus-cairo-1500-1530.c5",
      "history.history-damascus-cairo-1500-1530.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "hayir",
        "url": "https://islamansiklopedisi.org.tr/hayir-bey",
        "bodyPath": "/tmp/history-next15d-source-bodies/hayir.web.txt",
        "bodySha256": "795a739da5132107fb49fc71c5c837c525bde225f3c72d63a820ba63d0a45c61",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Seyyid Muhammed es-Seyyid,TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1998",
        "languageMediation": "Turkish scholarship; brief English paraphrase; not independently reviewed",
        "locator": "governorshipparagraphs;13 September 1517 citadel and Saturday divan",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "damascusOffice",
    "text": "Canbirdi’s 1518 beylerbeyi appointment and 1520 revolt follow Damascus 1516 entry",
    "requiredContext": "Canbirdi’s 1518 appointment and 1520 revolt differ from 1516 entry. Original appointment decree uncollated; no automatic caliphate transfer.",
    "fieldAddresses": [],
    "claims": [
      "history.history-damascus-cairo-1500-1530.c7",
      "history.history-damascus-cairo-1500-1530.c8",
      "history.history-damascus-cairo-1500-1530.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "canbirdi",
        "url": "https://islamansiklopedisi.org.tr/canbirdi-gazali",
        "bodyPath": "/tmp/history-next15d-source-bodies/canbirdi.web.txt",
        "bodySha256": "5ef2ca38a9fe30a3336c62e200b59427a81f6b590488dde3b64a4a6d754e1772",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Feridun Emecen,TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1993",
        "languageMediation": "Turkish scholarship; brief English paraphrase; not independently reviewed",
        "locator": "Canbirdi 15 February 1518 appointment/1520 revolt;Hayır retained Mamluk officers",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "hayir",
        "url": "https://islamansiklopedisi.org.tr/hayir-bey",
        "bodyPath": "/tmp/history-next15d-source-bodies/hayir.web.txt",
        "bodySha256": "795a739da5132107fb49fc71c5c837c525bde225f3c72d63a820ba63d0a45c61",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Seyyid Muhammed es-Seyyid,TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1998",
        "languageMediation": "Turkish scholarship; brief English paraphrase; not independently reviewed",
        "locator": "Canbirdi 15 February 1518 appointment/1520 revolt;Hayır retained Mamluk officers",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "damascus1516",
        "url": "https://islamansiklopedisi.org.tr/sam--suriye",
        "bodyPath": "/tmp/history-next15d-source-bodies/damascus1516.web.txt",
        "bodySha256": "583b3b730ba5e63ab3d10322e2cfd862c1283cf8f6940231103246313a76bd91",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Ş.Tufan Buzpınar,TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2010",
        "languageMediation": "Turkish scholarship; brief English paraphrase; not independently reviewed",
        "locator": "Canbirdi 15 February 1518 appointment/1520 revolt;Hayır retained Mamluk officers",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "damascusElites",
    "text": "1516 Damascus Selim Judges/notables submit Wali Farfur proclaims title TDV scholarship Working English Originals uncollated Specified elites ≠ all residents",
    "claim": "history.history-damascus-cairo-1500-1530.c3",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "cairoCourt",
    "text": "1517 Cairo Hayir Bey Citadel Saturday court Judges/subashi Selected Mamluk aides retained TDV scholarship Working English Originals uncollated",
    "claim": "history.history-damascus-cairo-1500-1530.c6",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "damascusOffice",
    "text": "1518 Damascus Canbirdi Beylerbeyi appointment 1520 Revolt TDV scholarship Working English Original decree uncollated Conquest ≠ instant office replacement",
    "claim": "history.history-damascus-cairo-1500-1530.c9",
    "countedWords": 18,
    "whitespaceTokens": 21
  },
  {
    "id": "comparison",
    "text": "1516 Damascus Elite submission 1518 Canbirdi appointment 1520 Revolt 1517 Cairo Hayir Bey court Mamluk aides retained TDV paraphrase Originals uncollated Separate changes",
    "claim": "history.history-damascus-cairo-1500-1530.c10",
    "countedWords": 21,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "damascusElites",
  "cairoCourt",
  "damascusOffice"
];
export const ATTACHMENTS = {
  "damascusElites": [
    "damascusElites"
  ],
  "cairoCourt": [
    "cairoCourt"
  ],
  "damascusOffice": [
    "damascusOffice"
  ]
};
export const PREDICTION = {
  "question": "Does military entry establish immediate identical replacement of both cities’ governing offices?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "TDV records specified Damascus elites submitting before Selim’s entry, followed by a later appointment and revolt. Cairo’s Hayir Bey operated a court with judges and subashi while retaining selected Mamluk aides. Military entry, appointment and working institutions have different dates and scopes; neither elite submission nor conquest establishes all residents’ consent or instant replacement of every office.";
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
