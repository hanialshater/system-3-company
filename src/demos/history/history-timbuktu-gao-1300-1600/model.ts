export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "timbuktuQadi",
    "text": "UNESCO identifies Al Aqib as Timbuktu’s qadi and imam and dates his enlargement of Djingareyber to 1570–83, restoration of Sankore to 1578–82, and work at Sidi Yahia to 1577–78.",
    "requiredContext": "Named mosque/qadi and Gao court witnesses; no modern university label or uniform jurisdiction inferred. Sources differ in abbreviated succession and conquest dates; do not adopt TDV’s direct overthrow phrasing. Captivity, forced removal and 1591 interruption preserved; manuscripts uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-timbuktu-gao-1300-1600.c1",
      "history.history-timbuktu-gao-1300-1600.c2",
      "history.history-timbuktu-gao-1300-1600.c3",
      "history.history-timbuktu-gao-1300-1600.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "timbuktu",
        "url": "https://whc.unesco.org/en/list/119/",
        "title": "Timbuktu, Statement of Outstanding Universal Value",
        "bodyPath": "/tmp/history-next15f-source-bodies/timbuktu.web.txt",
        "bodySha256": "d84ef05125e3ef1716392e60c34b54f52cbe165659672c9e6be5d52796cbc62c",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "UNESCO World Heritage Centre",
        "publicationOrDocumentDate": "Current institutional body; inscription 1988, statement adoption date not separately established",
        "sourceLevel": "Institutional heritage retrospective",
        "locator": "web L 50–52",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/timbuktu.web.json",
        "rawToolResponseSha256": "9e8b50f09bd796a3b7ad037c7e66a5b8864599ca87100341b414fa472ca9a715",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Use named mosques and Qadi restoration dates; UNESCO modern university terminology and student/population estimates not adopted. No manuscript or architecture asset reused."
      }
    ]
  },
  {
    "id": "gaoCourt",
    "text": "Gao’s account distinguishes the Songhai ruler’s 1324 submission to Mali and royal hostages from later Sonni and Askia court authority; UNESCO independently associates Askia Muhammad with his capital Gao in 1495.",
    "requiredContext": "Named mosque/qadi and Gao court witnesses; no modern university label or uniform jurisdiction inferred. Sources differ in abbreviated succession and conquest dates; do not adopt TDV’s direct overthrow phrasing. Captivity, forced removal and 1591 interruption preserved; manuscripts uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-timbuktu-gao-1300-1600.c5",
      "history.history-timbuktu-gao-1300-1600.c6",
      "history.history-timbuktu-gao-1300-1600.c7",
      "history.history-timbuktu-gao-1300-1600.c8",
      "history.history-timbuktu-gao-1300-1600.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "gaoTDV",
        "url": "https://islamansiklopedisi.org.tr/gao",
        "title": "GAO",
        "bodyPath": "/tmp/history-next15f-source-bodies/gaoTDV.web.txt",
        "bodySha256": "a475455e743734e94cf1bf7bd1c4735fadd9093f496a95873bfc421229c8e6d7",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Rıza Kurtuluş; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1996",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L 100–103",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/gaoTDV.web.json",
        "rawToolResponseSha256": "477c7074f6768da6b0b7dd3b1956e2c071615f44fbb6ce233f0768cee1847013",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Mali hostage relation, Songhai court and 1591 conquest distinct; no uniform population assent. Detailed 1324/1339 chronology remains this retrospective’s attribution, not independent original dating."
      },
      {
        "sourceId": "gao",
        "url": "https://whc.unesco.org/en/list/1139/",
        "title": "Tomb of Askia",
        "bodyPath": "/tmp/history-next15f-source-bodies/gao.web.txt",
        "bodySha256": "52e166caca151c4f45c332db1101f867fd052cf5154f3c77fae92fecf80a6e53",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "UNESCO World Heritage Centre",
        "publicationOrDocumentDate": "Inscribed 2004; current statement publication date not separately established",
        "sourceLevel": "Institutional heritage retrospective",
        "locator": "web L 4–5,L 48",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/gao.web.json",
        "rawToolResponseSha256": "911734c2a1356d6c190f9c67368618ba743bb6dbf7253aaa7c1945ce42ca4afc",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "1495 association and capital Gao independently supported; no inference of universal territorial control from royal building."
      }
    ]
  },
  {
    "id": "conquestAndCaptivity",
    "text": "Timbuktu’s mosque/qadi institutions differ from Gao’s dynastic court. Timbuktu passed through Tuareg and 1468 Songhai conquest, with pressure on scholars and merchants; the 1591 Moroccan army defeated Songhai and took enslaved people to Marrakesh, so these relationships were neither simultaneous nor consensual uniform administration.",
    "requiredContext": "Named mosque/qadi and Gao court witnesses; no modern university label or uniform jurisdiction inferred. Sources differ in abbreviated succession and conquest dates; do not adopt TDV’s direct overthrow phrasing. Captivity, forced removal and 1591 interruption preserved; manuscripts uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-timbuktu-gao-1300-1600.c10",
      "history.history-timbuktu-gao-1300-1600.c11",
      "history.history-timbuktu-gao-1300-1600.c12",
      "history.history-timbuktu-gao-1300-1600.c13",
      "history.history-timbuktu-gao-1300-1600.c14",
      "history.history-timbuktu-gao-1300-1600.c15"
    ],
    "sourcePins": [
      {
        "sourceId": "timbuktuTDV",
        "url": "https://islamansiklopedisi.org.tr/tinbuktu",
        "title": "TİNBÜKTÜ",
        "bodyPath": "/tmp/history-next15f-source-bodies/timbuktuTDV.web.txt",
        "bodySha256": "d78153c0b8b753d37b1b31eb9aca3cb07411b32643f7033631e68f04aefb28db",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Ahmet Kavas; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2012",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L 100,L 105",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/timbuktuTDV.web.json",
        "rawToolResponseSha256": "4e71fb8725a6ecc8e598e6fdca12fb126b39af5687aaf751609c85221881c297",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Contains inconsistent abbreviateddynastic succession phrasing; do not adopt that Sonni Ali was directly overthrown by Askia. Bounded 1468 conquest and pressure /1591 army and enslavement only."
      },
      {
        "sourceId": "timbuktu",
        "url": "https://whc.unesco.org/en/list/119/",
        "title": "Timbuktu, Statement of Outstanding Universal Value",
        "bodyPath": "/tmp/history-next15f-source-bodies/timbuktu.web.txt",
        "bodySha256": "d84ef05125e3ef1716392e60c34b54f52cbe165659672c9e6be5d52796cbc62c",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "UNESCO World Heritage Centre",
        "publicationOrDocumentDate": "Current institutional body; inscription 1988, statement adoption date not separately established",
        "sourceLevel": "Institutional heritage retrospective",
        "locator": "web L 50–52",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/timbuktu.web.json",
        "rawToolResponseSha256": "9e8b50f09bd796a3b7ad037c7e66a5b8864599ca87100341b414fa472ca9a715",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Use named mosques and Qadi restoration dates; UNESCO modern university terminology and student/population estimates not adopted. No manuscript or architecture asset reused."
      },
      {
        "sourceId": "gaoTDV",
        "url": "https://islamansiklopedisi.org.tr/gao",
        "title": "GAO",
        "bodyPath": "/tmp/history-next15f-source-bodies/gaoTDV.web.txt",
        "bodySha256": "a475455e743734e94cf1bf7bd1c4735fadd9093f496a95873bfc421229c8e6d7",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Rıza Kurtuluş; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1996",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L 103",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/gaoTDV.web.json",
        "rawToolResponseSha256": "477c7074f6768da6b0b7dd3b1956e2c071615f44fbb6ce233f0768cee1847013",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Mali hostage relation, Songhai court and 1591 conquest distinct; no uniform population assent. Detailed 1324/1339 chronology remains this retrospective’s attribution, not independent original dating."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "timbuktuQadi",
    "text": "1570–1583 Timbuktu Al Aqib Qadi/imam Mosque enlargement/restoration UNESCO retrospective Originals uncollated Not modern university Different local function",
    "claim": "history.history-timbuktu-gao-1300-1600.c3",
    "countedWords": 18,
    "whitespaceTokens": 19
  },
  {
    "id": "gaoCourt",
    "text": "1324 Gao Mali submission Royal hostages Later Sonni/Askia court 1495 Askia capital TDV/UNESCO retrospectives Working English Originals uncollated Separate dates",
    "claim": "history.history-timbuktu-gao-1300-1600.c7",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "conquestAndCaptivity",
    "text": "1468 Timbuktu Songhai conquest Scholars/merchants pressured 1591 Moroccan army Defeat Enslavement TDV/UNESCO scholarship Working English Originals uncollated Not popular consent",
    "claim": "history.history-timbuktu-gao-1300-1600.c12",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "Timbuktu Al Aqib Qadi/mosques Gao Court 1324 Hostages 1495 Askia capital 1468/1591 Conquest/enslavement TDV/UNESCO Working English Originals uncollated Different institutions Not consent",
    "claim": "history.history-timbuktu-gao-1300-1600.c16",
    "countedWords": 21,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "timbuktuQadi",
  "gaoCourt",
  "conquestAndCaptivity"
];
export const ATTACHMENTS = {
  "timbuktuQadi": [
    "timbuktuQadi"
  ],
  "gaoCourt": [
    "gaoCourt"
  ],
  "conquestAndCaptivity": [
    "conquestAndCaptivity"
  ]
};
export const PREDICTION = {
  "question": "Does shared imperial affiliation make Timbuktu’s scholarly institutions and Gao’s royal court identical or consensual authority?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "UNESCO identifies Al Aqib’s work as qadi and imam at Timbuktu’s mosques. Gao’s accounts describe royal submission, hostages and later court/capital authority. Those institutions differ, while conquest, pressure on scholars and merchants, and later enslavement and forced removal interrupt any picture of homogeneous consensual rule. The separately dated accounts do not turn Timbuktu into a modern university or scholarly office into Gao’s royal jurisdiction. Original manuscripts remain uncollated.";
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
