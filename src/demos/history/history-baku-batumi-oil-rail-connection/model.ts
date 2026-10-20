export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "batumiSegment",
    "text": "Ajara Museums dates the Samtredia–Batumi rail segment to 1883 and identifies the Baku oil transport relation.",
    "requiredContext": "Institutional museum account, actualHTML/extraction 35; unselected tourism 1883–1886 wording not harmonized. No pipeline date is selected.",
    "fieldAddresses": [],
    "claims": [
      "history.history-baku-batumi-oil-rail-connection.c1",
      "history.history-baku-batumi-oil-rail-connection.c2",
      "history.history-baku-batumi-oil-rail-connection.c3",
      "history.history-baku-batumi-oil-rail-connection.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "batumiMuseum",
        "url": "https://ajaramuseums.ge/en/online/forgotten-storiesPort-of-Batumi",
        "title": "Ajara Museums, #forgotten stories—Port of Batumi",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/batumiMuseum.body",
        "bodySha256": "631cba0de71e9af8843c95e6263901aa6e894e53ad15992c5193e502efa02114",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Ajara Museums, #forgotten stories—Port of Batumi",
        "publicationOrDocumentDate": "Institutional museum retrospective; publication date not given",
        "languageMediationAndLimits": "English institutional summary; original1883 operating records not collated",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "line35, Samtredia–Batumi1883 and Baku oil",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/batumiMuseum.txt",
        "extractedTextSha256": "8d86a3a6c4d2d8e3e3b5edd5440ce1d8e5ab33af61f00cfa371f8d91e4f0626d",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  },
  {
    "id": "bakuShipment",
    "text": "Azerbaijan’s Transport Council dates the first Baku–Tbilisi oil shipment to 8 May 1883 and describes the onward network to the Black Sea.",
    "requiredContext": "ActualHTML/extraction 92; two separately situated institutional records, not one passenger timetable or continuous network operation.1907 pipeline not selected or imported before 1900.",
    "fieldAddresses": [],
    "claims": [
      "history.history-baku-batumi-oil-rail-connection.c5",
      "history.history-baku-batumi-oil-rail-connection.c6",
      "history.history-baku-batumi-oil-rail-connection.c7",
      "history.history-baku-batumi-oil-rail-connection.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "bakuTransport",
        "url": "https://transit.gov.az/en/transportation-systems/railways",
        "title": "Azerbaijan Transport Coordinating Council, Railways",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/bakuTransport.body",
        "bodySha256": "cff4040cbc452e7608c1ca44e17a2a8f6f5f3d5b5577955deafb8470ceabf154",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Azerbaijan Transport Coordinating Council, Railways",
        "publicationOrDocumentDate": "Institutional transport history; publication date not given",
        "languageMediationAndLimits": "English official retrospective, not original shipment manifest",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "line92,8May1883 first Baku–Tbilisi oil shipment and onward network",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/bakuTransport.txt",
        "extractedTextSha256": "76c5adeeb7b69109f0682950b90255e7fb494544837c100c3cb9139706aeb3d9",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "batumiSegment",
    "text": "1883 Samtredia–Batumi Rail segment Baku oil route Ajara Museum retrospective Original timetable uncollated Segment ≠ direct journey or territorial legitimacy",
    "claim": "history.history-baku-batumi-oil-rail-connection.c3",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "bakuShipment",
    "text": "1883-05-08 Baku–Tbilisi Oil shipment Onward Black Sea network Transport Council retrospective Original manifest uncollated Not single direct train or pipeline",
    "claim": "history.history-baku-batumi-oil-rail-connection.c7",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "1883 Samtredia–Batumi Segment Baku–Tbilisi Oil shipment Onward Black Sea network Museum/Council retrospectives Originals uncollated Separate records Not direct journey Pipeline or sovereignty",
    "claim": "history.history-baku-batumi-oil-rail-connection.c9",
    "countedWords": 23,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "batumiSegment",
  "bakuShipment"
];
export const ATTACHMENTS = {
  "batumiSegment": [
    "batumiSegment"
  ],
  "bakuShipment": [
    "bakuShipment"
  ]
};
export const PREDICTION = {
  "question": "Do a rail segment’s opening and an oil shipment establish one direct journey or political legitimacy?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "The museum’s rail-segment date and the transport council’s dated oil shipment describe different pieces of a network. Together they support an attributed oil-transport connection, not a single direct train journey or pipeline. Both selected acts lie within the original period; no 1907 pipeline event is imported. Institutional retrospectives do not settle territorial legitimacy, and original timetables and manifests remain uncollated.";
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
