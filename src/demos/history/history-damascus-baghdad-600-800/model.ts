export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "damascusCapital",
    "text": "Muawiya made Damascus capital 661; the account records Christian officials continuing",
    "requiredContext": "TDV Turkish account, bounded working English. No broad persecution-free or universal-assent claim; Arabic chronicles uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-damascus-baghdad-600-800.c1",
      "history.history-damascus-baghdad-600-800.c2",
      "history.history-damascus-baghdad-600-800.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "damascus",
        "url": "https://islamansiklopedisi.org.tr/sam--suriye",
        "bodyPath": "/tmp/history-next15d-source-bodies/damascus.web.txt",
        "bodySha256": "054c8f63f463ca362fb97d8b0c3144255ad7438dac590136b643f4519b250f3b",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Cengiz Tomar,TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2010",
        "languageMediation": "Turkish scholarship; minimal English agent paraphrase unreviewed",
        "locator": "L 123–130",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "baghdadBureaus",
    "text": "al-Mansur’s works began 762; palace/mosque/bureaus complete by 763 at a site with earlier settlement",
    "requiredContext": "At least palace/mosque/bureaus by 763 is not entire city completion, separately dated 766. Earlier settlement retained; Arabic chronicles uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-damascus-baghdad-600-800.c4",
      "history.history-damascus-baghdad-600-800.c5",
      "history.history-damascus-baghdad-600-800.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "baghdad",
        "url": "https://islamansiklopedisi.org.tr/bagdat",
        "bodyPath": "/tmp/history-next15d-source-bodies/baghdad.web.txt",
        "bodySha256": "64118485a573db20f7c793b45b91a74191e7597d1f3b0b838e24ed9034d93f4b",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Abdülaziz ed-Dûrî,TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1991",
        "languageMediation": "Turkish scholarship; minimal English agent paraphrase unreviewed",
        "locator": "L 138–156,182",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "damascusChanges",
    "text": "Damascus lost capital status to Harran 744, came under Abbasids 750, and had a changed government house",
    "requiredContext": "Source’s 744 conversion remains attributed. Harran transfer,750 entry and later government-house change are separate from Baghdad foundation, not one simultaneous handover.",
    "fieldAddresses": [],
    "claims": [
      "history.history-damascus-baghdad-600-800.c7",
      "history.history-damascus-baghdad-600-800.c8",
      "history.history-damascus-baghdad-600-800.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "damascus",
        "url": "https://islamansiklopedisi.org.tr/sam--suriye",
        "bodyPath": "/tmp/history-next15d-source-bodies/damascus.web.txt",
        "bodySha256": "054c8f63f463ca362fb97d8b0c3144255ad7438dac590136b643f4519b250f3b",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Cengiz Tomar,TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2010",
        "languageMediation": "Turkish scholarship; minimal English agent paraphrase unreviewed",
        "locator": "Damascus L 129–130;Baghdad L 144–156",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "baghdad",
        "url": "https://islamansiklopedisi.org.tr/bagdat",
        "bodyPath": "/tmp/history-next15d-source-bodies/baghdad.web.txt",
        "bodySha256": "64118485a573db20f7c793b45b91a74191e7597d1f3b0b838e24ed9034d93f4b",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Abdülaziz ed-Dûrî,TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1991",
        "languageMediation": "Turkish scholarship; minimal English agent paraphrase unreviewed",
        "locator": "Damascus L 129–130;Baghdad L 144–156",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "damascusCapital",
    "text": "661 Damascus Muawiya Governor becomes caliph Christian officials continue TDV scholarship Working English Arabic chronicles uncollated",
    "claim": "history.history-damascus-baghdad-600-800.c3",
    "countedWords": 17,
    "whitespaceTokens": 18
  },
  {
    "id": "baghdadBureaus",
    "text": "762–763 Baghdad al-Mansur Palace/mosque/bureaus Earlier settlement TDV scholarship Working English Arabic chronicles uncollated Not empty land",
    "claim": "history.history-damascus-baghdad-600-800.c6",
    "countedWords": 17,
    "whitespaceTokens": 18
  },
  {
    "id": "damascusChanges",
    "text": "744 Damascus Capital moves Harran 750 Abbasid entry Palace prison New government house TDV scholarship Working English Originals uncollated",
    "claim": "history.history-damascus-baghdad-600-800.c9",
    "countedWords": 19,
    "whitespaceTokens": 21
  },
  {
    "id": "comparison",
    "text": "661 Damascus Muawiya 744 Harran transfer 750 Abbasid entry Changed government house 762–763 Baghdad bureaus Earlier settlement TDV paraphrase Originals uncollated Separate acts",
    "claim": "history.history-damascus-baghdad-600-800.c10",
    "countedWords": 21,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "damascusCapital",
  "baghdadBureaus",
  "damascusChanges"
];
export const ATTACHMENTS = {
  "damascusCapital": [
    "damascusCapital"
  ],
  "baghdadBureaus": [
    "baghdadBureaus"
  ],
  "damascusChanges": [
    "damascusChanges"
  ]
};
export const PREDICTION = {
  "question": "Did the new Baghdad capital cause one simultaneous handover of Damascus government?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "TDV separates Damascus’s capital role, its earlier transfer to Harran and later Abbasid entry. It describes changed government buildings there before Baghdad’s palace and bureaus. al-Mansur’s foundation used a site with earlier settlement. These are distinct governing acts, not one simultaneous Damascus-to-Baghdad handover or evidence of uniform control.";
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
