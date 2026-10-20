export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "naplesSeggi",
    "text": "Treccani places Naples’s San Lorenzo tribunal and seggi in the Angevin city, with one popular elected representative against five noble representatives; capital status did not imply equal civic representation.",
    "requiredContext": "Retain unequal representation and bounded medieval setting; no exact disputed 1442/1443 conquest day selected.",
    "fieldAddresses": [],
    "claims": [
      "history.history-naples-tunis-1200-1500.c1",
      "history.history-naples-tunis-1200-1500.c2",
      "history.history-naples-tunis-1200-1500.c3",
      "history.history-naples-tunis-1200-1500.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "naples",
        "url": "https://www.treccani.it/enciclopedia/napoli/",
        "bodyPath": "/tmp/history-next15e-source-bodies/naples.web.txt",
        "bodySha256": "fad259bdc59af7906afc341cb2163ad9030ae9e6238070171cacd862fa991e51",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Istituto della Enciclopedia Italiana, Treccani; section author not stated",
        "publicationOrDocumentDate": "Publication/update date not stated",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Modern encyclopedia institutional synthesis; no day of 1442/43 conquest fixed. Elite/popular representation is unequal, not universal participation.",
        "locator": "web L74",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/naples.web.json",
        "rawToolResponseSha256": "1cf9aa6970c72064d70d3eb9ce69b4b4fae203fadae9d4ede9dac37e7a927d69",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "tunisCourt",
    "text": "The Hafsid account dates Abu Zakariya’s break with Almohad authority to 1229 and locates the sultan’s palace, divans and guards in Tunis’s kasba; a chief qadi sat in Tunis.",
    "requiredContext": "The institutional description spans the longer Hafsid dynasty; selected medieval offices are not all backdated unchanged to 1229.",
    "fieldAddresses": [],
    "claims": [
      "history.history-naples-tunis-1200-1500.c5",
      "history.history-naples-tunis-1200-1500.c6",
      "history.history-naples-tunis-1200-1500.c7",
      "history.history-naples-tunis-1200-1500.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "hafsids",
        "url": "https://islamansiklopedisi.org.tr/hafsiler",
        "bodyPath": "/tmp/history-next15e-source-bodies/hafsids.web.txt",
        "bodySha256": "469fdc0baaf5bc8e3accdae54087c1586d2847145813dd5a45e41f2b3e84d888",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Muhammed Rezûk; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1997",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Dynasty spans beyond 1500; use 1229 establishment and bounded medieval account, not a claim every described office persisted unchanged throughout all reigns.",
        "locator": "web L102, L107, L168–171",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/hafsids.web.json",
        "rawToolResponseSha256": "39c075528c1d0307271f8d1051ffc6ada1c14939dbbefa32d0ccdd047e91a7d4",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "selectionContrast",
    "text": "Naples’s unequal civic seggi representation differs from Tunis’s sultan-selected consultation, differentiated divans and qadi appointments. Court and dynasty labels alone do not identify those operative institutions.",
    "requiredContext": "Different civic constituency and court selection, not all residents participating. No original municipal statute or court record inspected.",
    "fieldAddresses": [],
    "claims": [
      "history.history-naples-tunis-1200-1500.c9",
      "history.history-naples-tunis-1200-1500.c10",
      "history.history-naples-tunis-1200-1500.c11",
      "history.history-naples-tunis-1200-1500.c12",
      "history.history-naples-tunis-1200-1500.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "naples",
        "url": "https://www.treccani.it/enciclopedia/napoli/",
        "bodyPath": "/tmp/history-next15e-source-bodies/naples.web.txt",
        "bodySha256": "fad259bdc59af7906afc341cb2163ad9030ae9e6238070171cacd862fa991e51",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Istituto della Enciclopedia Italiana, Treccani; section author not stated",
        "publicationOrDocumentDate": "Publication/update date not stated",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Modern encyclopedia institutional synthesis; no day of 1442/43 conquest fixed. Elite/popular representation is unequal, not universal participation.",
        "locator": "web L74",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/naples.web.json",
        "rawToolResponseSha256": "1cf9aa6970c72064d70d3eb9ce69b4b4fae203fadae9d4ede9dac37e7a927d69",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "hafsids",
        "url": "https://islamansiklopedisi.org.tr/hafsiler",
        "bodyPath": "/tmp/history-next15e-source-bodies/hafsids.web.txt",
        "bodySha256": "469fdc0baaf5bc8e3accdae54087c1586d2847145813dd5a45e41f2b3e84d888",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Muhammed Rezûk; TDV İslâm Ansiklopedisi",
        "publicationOrDocumentDate": "1997",
        "sourceLevel": "Authored scholarly encyclopedia retrospective",
        "languageMediationAndLimits": "Dynasty spans beyond 1500; use 1229 establishment and bounded medieval account, not a claim every described office persisted unchanged throughout all reigns.",
        "locator": "web L168–171",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/hafsids.web.json",
        "rawToolResponseSha256": "39c075528c1d0307271f8d1051ffc6ada1c14939dbbefa32d0ccdd047e91a7d4",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "aragoneseSuccessionResidence",
    "text": "The National Library of Naples associates Alfonso V’s Aragonese succession with 1442 and describes a fortified royal residence. The Italian Institute of Castles distinguishes his 1442 arrival from rebuilding in 1443. The residence/works chronology is separate from the earlier civic constituencies and the Hafsid court institutions.",
    "requiredContext": "1442 arrival/succession, 1443 rebuilding and Treccani’s separate 1443 royal title are not one identical act; 1441 designation not silently reconciled. No exact conquest day or universal office continuity. National Library/Institute Italian retrospectives, cited treasury originals uncollated; municipal restoration PDF is excluded as transition proof.",
    "fieldAddresses": [],
    "claims": [
      "history.history-naples-tunis-1200-1500.c14",
      "history.history-naples-tunis-1200-1500.c15",
      "history.history-naples-tunis-1200-1500.c16",
      "history.history-naples-tunis-1200-1500.c17",
      "history.history-naples-tunis-1200-1500.c18"
    ],
    "sourcePins": [
      {
        "sourceId": "naplesNationalLibrary",
        "url": "https://www.bnnonline.it/it/283/musei",
        "title": "Biblioteca Nazionale di Napoli, Castelli",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/naplesNationalLibrary.body",
        "bodySha256": "a2143a3b67fc21560366a28371e55af294b3494083528d875a9890210358d10c",
        "representation": "Actual system-curl response bytes; HTML",
        "makerCustodianEditor": "Biblioteca Nazionale di Napoli, Castelli",
        "publicationOrDocumentDate": "Institutional cultural history; page date unstated",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "languageMediationAndLimits": "Italian retrospective; broadtransition chronology not exactday",
        "locator": "CasteldellOvo paragraphAlfonsoV iniziatore...1442–1503;MaschioAngioino paragraphsuccessors/fortifiedresidence",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/naplesNationalLibrary.txt",
        "extractedTextSha256": "35b0d5c12ae9a7899e4c104da810bac74b92f4556fb1d38abb87b5c8740183d2",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      },
      {
        "sourceId": "naplesCastlesInstitute",
        "url": "https://www.castcampania.it/castelli-di-napoli---castel-nuovo.html",
        "title": "Istituto Italiano dei Castelli, Campania, Castel Nuovo",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/naplesCastlesInstitute.body",
        "bodySha256": "345f11b46c745b57462608adcadbafe335c54e50be77ea2f8c63de2119809806",
        "representation": "Actual system-curl response bytes; HTML",
        "makerCustodianEditor": "Istituto Italiano dei Castelli, Campania, Castel Nuovo",
        "publicationOrDocumentDate": "Institutional architectural history; date unstated",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "languageMediationAndLimits": "Italian retrospective, cites treasury slips; originals not collated",
        "locator": "La reggia–fortezza aragonese:1442arrival;1443works,1447pause,1448restart",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/naplesCastlesInstitute.txt",
        "extractedTextSha256": "a1172b2241f4ac8b0f0c7ccd81b661f3c4d43c158d621ff2431da00b180811b9",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "naplesSeggi",
    "text": "Angevin Naples San Lorenzo Tribunal Seggi One popular representative Five nobles Treccani retrospective Working English Originals uncollated Not equal universal representation",
    "claim": "history.history-naples-tunis-1200-1500.c3",
    "countedWords": 23,
    "whitespaceTokens": 23
  },
  {
    "id": "tunisCourt",
    "text": "1229 Tunis Abu Zakariya Breaks Almohad authority Kasba Palace/divans/guards Chief qadi TDV scholarship Working English Originals uncollated Not unchanged every reign",
    "claim": "history.history-naples-tunis-1200-1500.c7",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "selectionContrast",
    "text": "Naples Unequal seggi Tunis Sultan-selected consultation Divans Qadi appointments Treccani/TDV retrospectives Working English Originals uncollated Capital ≠ identical powers or universal representation",
    "claim": "history.history-naples-tunis-1200-1500.c11",
    "countedWords": 23,
    "whitespaceTokens": 24
  },
  {
    "id": "aragoneseSuccessionResidence",
    "text": "1442 Naples Alfonso V Aragonese succession Royal residence 1443 Rebuilding Library/Institute retrospectives Working English Originals uncollated Separate acts Not exact conquest day",
    "claim": "history.history-naples-tunis-1200-1500.c16",
    "countedWords": 22,
    "whitespaceTokens": 24
  },
  {
    "id": "comparison",
    "text": "Naples One popular/Five noble representatives 1442 Aragonese succession 1443 Residence rebuilding Tunis Sultan-selected consultation Divans/Qadi Treccani/TDV/Library/Institute retrospectives Working English Originals uncollated Not universal representation",
    "claim": "history.history-naples-tunis-1200-1500.c19",
    "countedWords": 24,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "naplesSeggi",
  "tunisCourt",
  "selectionContrast",
  "aragoneseSuccessionResidence"
];
export const ATTACHMENTS = {
  "naplesSeggi": [
    "naplesSeggi"
  ],
  "tunisCourt": [
    "tunisCourt"
  ],
  "selectionContrast": [
    "selectionContrast"
  ],
  "aragoneseSuccessionResidence": [
    "aragoneseSuccessionResidence"
  ]
};
export const PREDICTION = {
  "question": "Do capital and dynasty labels establish identical civic representation and court appointments?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Treccani describes Naples’s unequal civic representation, with one popular representative against five nobles. TDV describes Tunis’s sultan-selected consultation, divans and qadi offices within the Hafsid setting. These are different constituencies and governing institutions, not powers supplied by a capital or dynasty label. The retrospectives leave originals uncollated and do not make every office unchanged across all reigns. The library dates Aragonese succession to 1442; the institute distinguishes arrival from 1443 rebuilding of the royal residence. These are separate acts.";
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
