export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "ankaraDuty",
    "text": "After the 1402 battle and Timur's withdrawal, Ankara came under Mehmed's authority. In 1411 its muhafız and sancakbeyi Yâkub Bey refused a western campaign, invoking his frontier-fortress duty; Mehmed imprisoned him.",
    "requiredContext": "1402 battle/interruption precedes this specific 1411 duty dispute. No continuous 1300–1530 control inferred; muhafiz/sancakbeyi are the bounded source offices.",
    "fieldAddresses": [],
    "claims": [
      "history.history-ankara-istanbul-1300-1530.c1",
      "history.history-ankara-istanbul-1300-1530.c2",
      "history.history-ankara-istanbul-1300-1530.c3",
      "history.history-ankara-istanbul-1300-1530.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "ankaraOttoman-selected",
        "url": "https://islamansiklopedisi.org.tr/ankara",
        "bodyPath": "/tmp/history-next15e-source-bodies/ankaraOttoman-selected.web.txt",
        "bodySha256": "8d04bfa683a9f3a2d6a2e7f7871a67f2045751dd9e8085b9947f5b0e28299281",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Rıfat Özdemir; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1991 print article; section publication metadata in retained body",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Turkish scholarly account; cited Ottoman chronicles uncollated. Specific appointment/duty relation only, no claim of continuous uniform control.",
        "locator": "web L293–294",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/ankaraOttoman-selected.web.json",
        "rawToolResponseSha256": "99bb699ebc57b713cb0dbb32ce1c26869a621933fa33cd30fda7dd60e5628efb",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "istanbulAppointments",
    "text": "Before returning to Edirne on 21 June 1453, Mehmed appointed Süleyman Bey as Istanbul subaşı with janissaries and Hızır Bey as kadı, and ordered fortification and palace works.",
    "requiredContext": "Post-capture policing/judicial appointments occur before Mehmed returns to Edirne; no claim all court/administrative offices moved simultaneously.",
    "fieldAddresses": [],
    "claims": [
      "history.history-ankara-istanbul-1300-1530.c5",
      "history.history-ankara-istanbul-1300-1530.c6",
      "history.history-ankara-istanbul-1300-1530.c7",
      "history.history-ankara-istanbul-1300-1530.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "istanbulOttoman",
        "url": "https://islamansiklopedisi.org.tr/istanbul",
        "bodyPath": "/tmp/history-next15e-source-bodies/istanbulOttoman.web.txt",
        "bodySha256": "e250ca485266e4966390a53bbc2b2b1bb5815853377c329611b1c7dcfe102088",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Halil İnalcık; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2001",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Translated synthesis only; underlying chronicles uncollated. Capture includes enslavement and confiscation, not population consent.",
        "locator": "web L611–616",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/istanbulOttoman.web.json",
        "rawToolResponseSha256": "c6bec656193c1a39a1301b3cb3e435cad1d8bd5886ff713990882c0c382a06c6",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "dutyAndCapture",
    "text": "Ankara's command dispute concerns a provincial officer's military obligation; Istanbul's post-capture policing and judicial appointments preceded the sultan's return to Edirne. Capture included enslavement and confiscation, not general consent.",
    "requiredContext": "Retain coercion from the actual scholarly account; capture does not establish general assent, identical provincial duties or permanent court residence.",
    "fieldAddresses": [],
    "claims": [
      "history.history-ankara-istanbul-1300-1530.c9",
      "history.history-ankara-istanbul-1300-1530.c10",
      "history.history-ankara-istanbul-1300-1530.c11",
      "history.history-ankara-istanbul-1300-1530.c12",
      "history.history-ankara-istanbul-1300-1530.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "ankaraOttoman-selected",
        "url": "https://islamansiklopedisi.org.tr/ankara",
        "bodyPath": "/tmp/history-next15e-source-bodies/ankaraOttoman-selected.web.txt",
        "bodySha256": "8d04bfa683a9f3a2d6a2e7f7871a67f2045751dd9e8085b9947f5b0e28299281",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Rıfat Özdemir; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1991 print article; section publication metadata in retained body",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Turkish scholarly account; cited Ottoman chronicles uncollated. Specific appointment/duty relation only, no claim of continuous uniform control.",
        "locator": "web L294",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/ankaraOttoman-selected.web.json",
        "rawToolResponseSha256": "99bb699ebc57b713cb0dbb32ce1c26869a621933fa33cd30fda7dd60e5628efb",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "istanbulOttoman",
        "url": "https://islamansiklopedisi.org.tr/istanbul",
        "bodyPath": "/tmp/history-next15e-source-bodies/istanbulOttoman.web.txt",
        "bodySha256": "e250ca485266e4966390a53bbc2b2b1bb5815853377c329611b1c7dcfe102088",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Halil İnalcık; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2001",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Translated synthesis only; underlying chronicles uncollated. Capture includes enslavement and confiscation, not population consent.",
        "locator": "web L611–616",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/istanbulOttoman.web.json",
        "rawToolResponseSha256": "c6bec656193c1a39a1301b3cb3e435cad1d8bd5886ff713990882c0c382a06c6",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "ankaraDuty",
    "text": "1411 Ankara Yakub Bey Fortress duty Refuses campaign Mehmed imprisons him TDV scholarship Working English Original chronicles uncollated Not continuous control",
    "claim": "history.history-ankara-istanbul-1300-1530.c3",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "istanbulAppointments",
    "text": "1453 Istanbul Suleyman Bey Subasi/janissaries Hizir Bey Kadi Palace/fortification works TDV scholarship Working English Originals uncollated Court returns Edirne",
    "claim": "history.history-ankara-istanbul-1300-1530.c7",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "dutyAndCapture",
    "text": "Ankara Provincial military duty Istanbul Post-capture police/judges Enslavement Confiscation Edirne return TDV scholarship Working English Originals uncollated Capture ≠ consent",
    "claim": "history.history-ankara-istanbul-1300-1530.c11",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "1411 Ankara Fortress-duty dispute 1453 Istanbul Subasi/Kadi appointments Edirne court return Enslavement/confiscation TDV scholarship Working English Originals uncollated Different powers",
    "claim": "history.history-ankara-istanbul-1300-1530.c14",
    "countedWords": 20,
    "whitespaceTokens": 22
  }
];
export const REQUIRED = [
  "ankaraDuty",
  "istanbulAppointments",
  "dutyAndCapture"
];
export const ATTACHMENTS = {
  "ankaraDuty": [
    "ankaraDuty"
  ],
  "istanbulAppointments": [
    "istanbulAppointments"
  ],
  "dutyAndCapture": [
    "dutyAndCapture"
  ]
};
export const PREDICTION = {
  "question": "Does capture establish the same military duty, policing office and court residence?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "TDV describes Yakub Bey’s disputed fortress duty and imprisonment at Ankara. Its Istanbul account names post-capture policing and judicial appointments before Mehmed returned to Edirne. Military obligation, local offices and court residence are different relations. Enslavement and confiscation remain part of conquest; neither appointment nor capture establishes universal consent or continuous control.";
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
