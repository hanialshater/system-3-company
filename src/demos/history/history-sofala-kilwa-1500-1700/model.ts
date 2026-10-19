export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "sofalaNegotiation",
    "text": "Ana Cristina Roque names Sofala’s ruler Yusuf and the three local settlements; Pedro de Anaia, Portuguese captain in 1505–06, negotiated fort construction with him, relying on local materials, knowledge and labour.",
    "requiredContext": "Own minimal English facts from scholarly institutional bodies. Portuguese forts and shipping rules are coercive claims, not popular consent or full coastal control. A naval academy PDF request returned HTML rejection with 200 and another national-library request timed out; neither is used as a letter body. HPIP’s 1512 withdrawal and TDV’s 1513 destruction dates remain separate unselected chronology, not silently reconciled.",
    "fieldAddresses": [],
    "claims": [
      "history.history-sofala-kilwa-1500-1700.c1",
      "history.history-sofala-kilwa-1500-1700.c2",
      "history.history-sofala-kilwa-1500-1700.c3",
      "history.history-sofala-kilwa-1500-1700.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "sofala",
        "url": "https://eve.fcsh.unl.pt/pt/lugares/sofala",
        "title": "Sofala",
        "bodyPath": "/tmp/history-next15f-source-bodies/sofala.web.txt",
        "bodySha256": "674c2f9b38272e46eaa962920edf85af4de65fb899be46683b634202b55587bb",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Ana Cristina Roque; Enciclopédia Virtual da Expansão Portuguesa, NOVA FCSH",
        "publicationOrDocumentDate": "2009",
        "sourceLevel": "Authored scholarly institutional retrospective",
        "locator": "web L 34–38",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/sofala.web.json",
        "rawToolResponseSha256": "25f792b8645a3325174b0447fe0ef53942582eb3baefb3c9309a44fa4bf644d5",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Portuguese colonial terms retained as source perspective only; local skills/labour and resistance explicit. Fort negotiation does not establish popular consent or regional sovereignty."
      }
    ]
  },
  {
    "id": "kilwaReplacement",
    "text": "The OpenStax account identifies Kilwa’s Emir Ibrahim and says Francisco de Almeida’s soldiers replaced him in 1505 with Muhammad Arcone; subsequent local factional conflict and Portuguese removals followed.",
    "requiredContext": "Own minimal English facts from scholarly institutional bodies. Portuguese forts and shipping rules are coercive claims, not popular consent or full coastal control. A naval academy PDF request returned HTML rejection with 200 and another national-library request timed out; neither is used as a letter body. HPIP’s 1512 withdrawal and TDV’s 1513 destruction dates remain separate unselected chronology, not silently reconciled.",
    "fieldAddresses": [],
    "claims": [
      "history.history-sofala-kilwa-1500-1700.c5",
      "history.history-sofala-kilwa-1500-1700.c6",
      "history.history-sofala-kilwa-1500-1700.c7",
      "history.history-sofala-kilwa-1500-1700.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "kilwaOpenstax",
        "url": "https://openstax.org/books/world-history-volume-2/pages/3-3-the-swahili-coast",
        "title": "World History Volume 2, section 3.3 The Swahili Coast",
        "bodyPath": "/tmp/history-next15f-source-bodies/kilwaOpenstax.web.txt",
        "bodySha256": "582b138d738b403b56b2f8de79ffbebf7e89cee816b8371f29ab3e6257c1e4a6",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Ann Kordas, Ryan J. Lynch, Brooke Nelson, Julie Tatlock; OpenStax, Rice University",
        "publicationOrDocumentDate": "2022-12-14",
        "sourceLevel": "University scholarly textbook retrospective",
        "locator": "web L 78–83",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/kilwaOpenstax.web.json",
        "rawToolResponseSha256": "6f805c23007bd1934aaf5e2c07cbd3510860933f3df3c6dec20ec713d2056aa0",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Actual paragraph body read, not discovery snippet. Kilwa dynastic chronicle not independently collated. Own English facts only; no source images/prose reused. Wider sweeping statements about entirecoast not adopted."
      }
    ]
  },
  {
    "id": "merchantResistance",
    "text": "Portuguese shipping restrictions harmed Kilwan merchants and provoked resistance, then were modified; at Sofala, existing mobile trading networks and local merchants opposed the fixed Portuguese establishment in 1506. A fort did not erase local political and commercial agency.",
    "requiredContext": "Own minimal English facts from scholarly institutional bodies. Portuguese forts and shipping rules are coercive claims, not popular consent or full coastal control. A naval academy PDF request returned HTML rejection with 200 and another national-library request timed out; neither is used as a letter body. HPIP’s 1512 withdrawal and TDV’s 1513 destruction dates remain separate unselected chronology, not silently reconciled.",
    "fieldAddresses": [],
    "claims": [
      "history.history-sofala-kilwa-1500-1700.c9",
      "history.history-sofala-kilwa-1500-1700.c10",
      "history.history-sofala-kilwa-1500-1700.c11",
      "history.history-sofala-kilwa-1500-1700.c12",
      "history.history-sofala-kilwa-1500-1700.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "kilwaOpenstax",
        "url": "https://openstax.org/books/world-history-volume-2/pages/3-3-the-swahili-coast",
        "title": "World History Volume 2, section 3.3 The Swahili Coast",
        "bodyPath": "/tmp/history-next15f-source-bodies/kilwaOpenstax.web.txt",
        "bodySha256": "582b138d738b403b56b2f8de79ffbebf7e89cee816b8371f29ab3e6257c1e4a6",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Ann Kordas, Ryan J. Lynch, Brooke Nelson, Julie Tatlock; OpenStax, Rice University",
        "publicationOrDocumentDate": "2022-12-14",
        "sourceLevel": "University scholarly textbook retrospective",
        "locator": "web L 83–85",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/kilwaOpenstax.web.json",
        "rawToolResponseSha256": "6f805c23007bd1934aaf5e2c07cbd3510860933f3df3c6dec20ec713d2056aa0",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Actual paragraph body read, not discovery snippet. Kilwa dynastic chronicle not independently collated. Own English facts only; no source images/prose reused. Wider sweeping statements about entirecoast not adopted."
      },
      {
        "sourceId": "sofala",
        "url": "https://eve.fcsh.unl.pt/pt/lugares/sofala",
        "title": "Sofala",
        "bodyPath": "/tmp/history-next15f-source-bodies/sofala.web.txt",
        "bodySha256": "674c2f9b38272e46eaa962920edf85af4de65fb899be46683b634202b55587bb",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Ana Cristina Roque; Enciclopédia Virtual da Expansão Portuguesa, NOVA FCSH",
        "publicationOrDocumentDate": "2009",
        "sourceLevel": "Authored scholarly institutional retrospective",
        "locator": "web L 43–46",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/sofala.web.json",
        "rawToolResponseSha256": "25f792b8645a3325174b0447fe0ef53942582eb3baefb3c9309a44fa4bf644d5",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Portuguese colonial terms retained as source perspective only; local skills/labour and resistance explicit. Fort negotiation does not establish popular consent or regional sovereignty."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "sofalaNegotiation",
    "text": "1505–1506 Sofala Yusuf Pedro de Anaia Fort negotiation Local materials Knowledge Labour Roque scholarship Working English Originals uncollated Not popular consent",
    "claim": "history.history-sofala-kilwa-1500-1700.c3",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "kilwaReplacement",
    "text": "1505 Kilwa Ibrahim Almeida soldiers Replace ruler Muhammad Arcone Local factions OpenStax synthesis Working English Originals uncollated Coercive intervention",
    "claim": "history.history-sofala-kilwa-1500-1700.c7",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "merchantResistance",
    "text": "Kilwa Shipping restrictions Resistance Rules modified 1506 Sofala Merchants oppose fixed establishment Roque/OpenStax Working English Originals uncollated Local networks persist",
    "claim": "history.history-sofala-kilwa-1500-1700.c11",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "Sofala Yusuf/De Anaia Negotiated fort Labour Kilwa Almeida soldiers Ruler replacement Merchants resist Restrictions modified Roque/OpenStax Working English Originals uncollated Fort ≠ full control",
    "claim": "history.history-sofala-kilwa-1500-1700.c14",
    "countedWords": 25,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "sofalaNegotiation",
  "kilwaReplacement",
  "merchantResistance"
];
export const ATTACHMENTS = {
  "sofalaNegotiation": [
    "sofalaNegotiation"
  ],
  "kilwaReplacement": [
    "kilwaReplacement"
  ],
  "merchantResistance": [
    "merchantResistance"
  ]
};
export const PREDICTION = {
  "question": "Does a Portuguese fort establish the same governing relation at Sofala and Kilwa or erase local agency?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Roque describes a negotiated fort at Sofala involving Yusuf, Pedro de Anaia and local materials, knowledge and labour. OpenStax describes soldiers replacing Kilwa’s ruler and subsequent factional conflict. Shipping restrictions and merchants’ resistance further distinguish the relationships. A Portuguese establishment did not erase existing political or trading agency, establish full coastal control or prove popular consent. These are mediated accounts; the requested letter body was not acquired.";
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
