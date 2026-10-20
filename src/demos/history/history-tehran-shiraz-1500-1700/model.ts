export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "tehranResidence",
    "text": "The Tehran article distinguishes historical Tihran/Tehran names and reports that Pietro della Valle in 1618 found the beylerbeyi resident there; Tahmasp’s earlier walls and market were Safavid royal works, not proof Tehran was the sovereign’s capital.",
    "requiredContext": "Historical Tihran/Tehran name and 1618 resident beylerbeyi are not sovereign capital. Shiraz governor/madrasa and circa 1630–31 invitation remain distinct. Selected 1500–1767 adds attributed 1760 works/intended-use uncertainty and 1766–67 capital, not Zand government before 1700.1779/1791 excluded. Scholarly retrospective/working English; originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-tehran-shiraz-1500-1700.c1",
      "history.history-tehran-shiraz-1500-1700.c2",
      "history.history-tehran-shiraz-1500-1700.c3",
      "history.history-tehran-shiraz-1500-1700.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "tehranTDV",
        "url": "https://islamansiklopedisi.org.tr/tahran",
        "title": "TAHRAN",
        "bodyPath": "/tmp/history-next15f-source-bodies/tehranTDV.web.txt",
        "bodySha256": "3e89e991d7e3cbfc13fa65c9b0896cd2a70fb14d63a2e699e05ce159ebd2c540",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Esko Naskali, Osman Gazi Özgüdenli; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2010",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L 96–105",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/tehranTDV.web.json",
        "rawToolResponseSha256": "a4540d008e634329acda1502c7edeb401eb9467108740cb2acc302b0eddd95f4",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Historical name Tihran/Tehran distinct from similarly named Isfahan-province settlement.1618 governor’s residence is an in-period retrospective report, not original traveller collation. Zand 1760 works outside 1700."
      }
    ]
  },
  {
    "id": "shirazPatronage",
    "text": "In Shiraz, the account of Molla Sadra identifies Emamqoli Khan as Fars governor-general and describes his invitation to teach there around 1630–31, in the Khan madrasa completed in 1615.",
    "requiredContext": "Historical Tihran/Tehran name and 1618 resident beylerbeyi are not sovereign capital. Shiraz governor/madrasa and circa 1630–31 invitation remain distinct. Selected 1500–1767 adds attributed 1760 works/intended-use uncertainty and 1766–67 capital, not Zand government before 1700.1779/1791 excluded. Scholarly retrospective/working English; originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-tehran-shiraz-1500-1700.c5",
      "history.history-tehran-shiraz-1500-1700.c6",
      "history.history-tehran-shiraz-1500-1700.c7",
      "history.history-tehran-shiraz-1500-1700.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "shirazMadrasa",
        "url": "https://www.iranicaonline.org/articles/molla-sadra-sirazi/",
        "title": "MOLLĀ ṢADRĀ ŠIRĀZI",
        "bodyPath": "/tmp/history-next15f-source-bodies/shirazMadrasa.web.txt",
        "bodySha256": "66089eae2892ab147d433709abcc0c1d5317dd103ca7bbb9cb8f0e4b4a7687a0",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Sajjad H. Rizvi; Encyclopaedia Iranica",
        "publicationOrDocumentDate": "2005-07-20; updated 2017-06-13",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "paragraph beginning In 1040/1630–31; Madrasa-ye Khan and governor-general",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/shirazMadrasa.web.json",
        "rawToolResponseSha256": "a4bb2263d766fbf972f0b9ae32e251c4ab6b173c7e7d964edc8e2d9434b52f9f",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Teacher’s invitation attributed to governor-general with source’s possibility caveat for prior student relation.1635/1640 death dispute not used. No original travel account collation."
      }
    ]
  },
  {
    "id": "zandWorksAndCourt",
    "text": "The accounts date Karim Khan Zand’s Tehran government buildings, divan and palace-related works to 1760 and Shiraz’s capital status to 1766–67. The Tehran account presents possible intended government-centre use, not proof it became his actual capital; these later acts differ from the earlier Safavid provincial offices and patronage.",
    "requiredContext": "Historical Tihran/Tehran name and 1618 resident beylerbeyi are not sovereign capital. Shiraz governor/madrasa and circa 1630–31 invitation remain distinct. Selected 1500–1767 adds attributed 1760 works/intended-use uncertainty and 1766–67 capital, not Zand government before 1700.1779/1791 excluded. Scholarly retrospective/working English; originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-tehran-shiraz-1500-1700.c9",
      "history.history-tehran-shiraz-1500-1700.c10",
      "history.history-tehran-shiraz-1500-1700.c11",
      "history.history-tehran-shiraz-1500-1700.c12",
      "history.history-tehran-shiraz-1500-1700.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "tehranTDV",
        "url": "https://islamansiklopedisi.org.tr/tahran",
        "title": "TAHRAN",
        "bodyPath": "/tmp/history-next15f-source-bodies/tehranTDV.web.txt",
        "bodySha256": "3e89e991d7e3cbfc13fa65c9b0896cd2a70fb14d63a2e699e05ce159ebd2c540",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Esko Naskali, Osman Gazi Özgüdenli; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2010",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L107,1760 works and intended-centre uncertainty",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/tehranTDV.web.json",
        "rawToolResponseSha256": "a4540d008e634329acda1502c7edeb401eb9467108740cb2acc302b0eddd95f4",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Historical name Tihran/Tehran distinct from similarly named Isfahan-province settlement.1618 governor’s residence is an in-period retrospective report, not original traveller collation. Zand 1760 works outside 1700."
      },
      {
        "sourceId": "shiraz",
        "url": "https://islamansiklopedisi.org.tr/siraz",
        "title": "ŞÎRAZ",
        "bodyPath": "/tmp/history-next15f-source-bodies/shiraz.web.txt",
        "bodySha256": "7387d78c599651c839ac3aea67b15b7199a0988d7014f858abce0747ad285b95",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Osman Gazi Özgüdenli; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "2010",
        "sourceLevel": "Authored scholarly retrospective",
        "locator": "web L112,1766–67 capital; later1791 excluded",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/shiraz.web.json",
        "rawToolResponseSha256": "7c1078e8f5e1c5bc9bcf33c6380bd7387c15122f75b9f59f864109c33d285b20",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "City name and 1503 Safavid transition separately attested. Zand 1766–67 capital falls outside 1700; date not projected backward."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "tehranResidence",
    "text": "1618 Tihran/Tehran Resident beylerbeyi Della Valle via TDV Royal works ≠ capital Scholarly retrospective Working English Originals uncollated",
    "claim": "history.history-tehran-shiraz-1500-1700.c3",
    "countedWords": 18,
    "whitespaceTokens": 20
  },
  {
    "id": "shirazPatronage",
    "text": "1615 Shiraz Khan madrasa Circa 1630–1631 Emamqoli Khan Fars governor Invites Molla Sadra Iranica scholarship Originals uncollated Patronage ≠ capital",
    "claim": "history.history-tehran-shiraz-1500-1700.c7",
    "countedWords": 19,
    "whitespaceTokens": 22
  },
  {
    "id": "zandWorksAndCourt",
    "text": "1760 Tehran Karim Khan Zand Government buildings Intended centre uncertain 1766–1767 Shiraz Capital TDV retrospectives Working English Originals uncollated Separate acts",
    "claim": "history.history-tehran-shiraz-1500-1700.c11",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Tehran 1618 Governor residence Shiraz Governor patronage 1760 Zand works Intended centre uncertain 1766–1767 Capital TDV/Iranica Working English Originals uncollated Distinct relationships",
    "claim": "history.history-tehran-shiraz-1500-1700.c14",
    "countedWords": 21,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "tehranResidence",
  "shirazPatronage",
  "zandWorksAndCourt"
];
export const ATTACHMENTS = {
  "tehranResidence": [
    "tehranResidence"
  ],
  "shirazPatronage": [
    "shirazPatronage"
  ],
  "zandWorksAndCourt": [
    "zandWorksAndCourt"
  ]
};
export const PREDICTION = {
  "question": "Do provincial residence, patronage and later royal works establish the same capital relationship at Tehran and Shiraz?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "The accounts distinguish Tehran’s reported provincial governor residence from Shiraz’s governor-sponsored madrasa and invitation to teach. Later, Karim Khan Zand built government facilities at Tehran, while the Shiraz account places his capital there in 1766–67. Intended use of works is not proof of an actual capital. The explicitly extended selection retains both Safavid and Zand relationships without inventing Zand government before 1700 or continuous identical authority. Originals remain uncollated.";
export const EXPLORE_HINT = "Read each record, then compare them.";
export const PERIOD_DISCLOSURE = "Original proposal: 1500–1700. Selected comparison extends to 1767.";
export const PERIOD_SCOPE = "Original1700 source-limit exclusions remain acquisition history; selected1760/1766–67 now within1767. Later1779/1791 excluded.";
export const PERIOD_CLAIM = "history.history-tehran-shiraz-1500-1700.c18";
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
