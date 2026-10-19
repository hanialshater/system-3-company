export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "berlinDistinction",
    "text": "The 1878 treaty prescribes Austro-Hungarian occupation/administration for Bosnia and Herzegovina and conditional recognition for Serbia subject to religious-rights provisions; Novi Bazar retains its Ottoman-administration exception.",
    "requiredContext": "Articles 25/34–35 prescriptions, not shown fulfilled or universal consent; preserve occupation≠annexation and NoviBazar exception.",
    "fieldAddresses": [],
    "claims": [
      "history.history-belgrade-sarajevo-1800-1920.c1",
      "history.history-belgrade-sarajevo-1800-1920.c2",
      "history.history-belgrade-sarajevo-1800-1920.c3",
      "history.history-belgrade-sarajevo-1800-1920.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "berlin1878",
        "url": "https://history.state.gov/historicaldocuments/frus1878/d523",
        "title": "berlin1878",
        "bodyPath": "/tmp/history-next15-source-bodies/berlin1878.txt",
        "bodySha256": "0dda493a7aa040d761af03f28a06f6ccb898a0d07cbabd41afc0ed0a3b71a1b3",
        "representation": "Inherited acquired normalized text; raw response identity retained in original fixture",
        "makerCustodianEditor": "Treaty powers enumerated in1878 preamble; US Office of the Historian / FRUS",
        "publicationOrDocumentDate": "1878-07-13",
        "sourceLevel": "Historical English diplomatic translation, enclosed with September28 report; treaty signed13July1878",
        "locator": "ArticlesXXV/XXXIV–XXXV normalized598–604,744–758",
        "languageMediationAndLimits": "English diplomatic translation/French documentary edition, originals uncollated; prior acquisition limitations unchanged",
        "terms": "No open modern-edition licence established. Own factual paraphrases/original schematic only; no copied prose, translations, images, scans, source layout, annotations or territorial geometry. Independent exact-use assessment pending."
      }
    ]
  },
  {
    "id": "serbiaConstitution",
    "text": "The French documentary edition of Serbia’s 1903 constitution prescribes a hereditary constitutional monarchy and joint legislative power of king and national representation.",
    "requiredContext": "Edition date 5 June 1903 retained without invented calendar conversion. Serbia text does not supply Bosnia 1918 bridge.",
    "fieldAddresses": [],
    "claims": [
      "history.history-belgrade-sarajevo-1800-1920.c5",
      "history.history-belgrade-sarajevo-1800-1920.c6",
      "history.history-belgrade-sarajevo-1800-1920.c7",
      "history.history-belgrade-sarajevo-1800-1920.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "rs1903",
        "url": "https://mjp.univ-perp.fr/constit/rs1903.htm",
        "title": "rs1903",
        "bodyPath": "/tmp/history-next15-source-bodies/rs1903.txt",
        "bodySha256": "c81455d51e4ee8308094bc856c3c5757d06d7f9d3b8841aa59cddf5e9ba087db",
        "representation": "Inherited acquired normalized text; raw response identity retained in original fixture",
        "makerCustodianEditor": "Serbian constitutional authorities; MJP / Université de Perpignan; historical maker distinct from modern editor",
        "publicationOrDocumentDate": "1903-06-05",
        "sourceLevel": "French documentary edition of historical operative text",
        "locator": "Articles1/33 normalized25/125",
        "languageMediationAndLimits": "English diplomatic translation/French documentary edition, originals uncollated; prior acquisition limitations unchanged",
        "terms": "No open modern-edition licence established. Own factual paraphrases/original schematic only; no copied prose, translations, images, scans, source layout, annotations or territorial geometry. Independent exact-use assessment pending."
      }
    ]
  },
  {
    "id": "bosniaCouncilTransfer",
    "text": "The Parliamentary Assembly retrospective separately identifies the Bosnia National Council on 20 October 1918 and the transfer of government on 1 November.",
    "requiredContext": "Actual verifiedHTTP 200 body despite priorweb 403; originalacts uncollated. Do not infer that war/defeat alone supplies a union institution.",
    "fieldAddresses": [],
    "claims": [
      "history.history-belgrade-sarajevo-1800-1920.c9",
      "history.history-belgrade-sarajevo-1800-1920.c10",
      "history.history-belgrade-sarajevo-1800-1920.c11",
      "history.history-belgrade-sarajevo-1800-1920.c12"
    ],
    "sourcePins": [
      {
        "sourceId": "bosniaParliament",
        "url": "https://www.parlament.ba/Content/Read/180?lang=en",
        "title": "Parliamentary Assembly of Bosnia and Herzegovina, Political representation1918–1941",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/bosniaParliament.body",
        "bodySha256": "cf40bb040b187d1915383691bb5b4ddad7ed5f5d88088654049eda2d075a0f9a",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Parliamentary Assembly of Bosnia and Herzegovina, Political representation1918–1941",
        "publicationOrDocumentDate": "Institutional parliamentary retrospective; publication date not established",
        "languageMediationAndLimits": "English site edition; original1918 acts not collated",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "extraction209–213,20Octcouncil/1Novtransfer",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/bosniaParliament.txt",
        "extractedTextSha256": "b4962cca437367c27e209207c5db4e6e2b006ff36fe19d810ccf7c890e67cdc7",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  },
  {
    "id": "governmentAndUnion",
    "text": "The Parliament and Museum retrospectives identify Atanasije Šola’s 3 November government; the Parliament connects the later 1 December Belgrade union address. The Museum notes prominent committee members were not democratically elected.",
    "requiredContext": "1 November transfer,3 November government and 1 December address are separate. Omit conflicting membership numbers. Elite institutions/union acts do not establish popular consent or minimize wartime harm.",
    "fieldAddresses": [],
    "claims": [
      "history.history-belgrade-sarajevo-1800-1920.c13",
      "history.history-belgrade-sarajevo-1800-1920.c14",
      "history.history-belgrade-sarajevo-1800-1920.c15",
      "history.history-belgrade-sarajevo-1800-1920.c16",
      "history.history-belgrade-sarajevo-1800-1920.c17"
    ],
    "sourcePins": [
      {
        "sourceId": "bosniaParliament",
        "url": "https://www.parlament.ba/Content/Read/180?lang=en",
        "title": "Parliamentary Assembly of Bosnia and Herzegovina, Political representation1918–1941",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/bosniaParliament.body",
        "bodySha256": "cf40bb040b187d1915383691bb5b4ddad7ed5f5d88088654049eda2d075a0f9a",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Parliamentary Assembly of Bosnia and Herzegovina, Political representation1918–1941",
        "publicationOrDocumentDate": "Institutional parliamentary retrospective; publication date not established",
        "languageMediationAndLimits": "English site edition; original1918 acts not collated",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "extraction209–213,3Novgovernment/1Decaddress",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/bosniaParliament.txt",
        "extractedTextSha256": "b4962cca437367c27e209207c5db4e6e2b006ff36fe19d810ccf7c890e67cdc7",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      },
      {
        "sourceId": "bosniaMuseum",
        "url": "https://www.muzej-jugoslavije.org/wp-content/uploads/2020/07/2018-Day-Worth-a-Century.pdf",
        "title": "A Day Worth a Century, Museum of Yugoslavia exhibition catalogue",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/bosniaMuseum.body",
        "bodySha256": "3a1f64172eaa308c237ffd162388e77b9d7dcd06e032adc4f398ed4451dcc652",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "A Day Worth a Century, Museum of Yugoslavia exhibition catalogue",
        "publicationOrDocumentDate": "2018 museum scholarly catalogue; chapter on Bosnia",
        "languageMediationAndLimits": "English scholarly retrospective; differing government membership count from Parliament not adopted",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "PDF80/printed70,3Novgovernment/committees not elected",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/bosniaMuseum.txt",
        "extractedTextSha256": "326eb29fd9eaee08a71e2e35f495d927bd225cee56cd4e27dc47fefe33d8b4fe",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "berlinDistinction",
    "text": "1878 Bosnia Occupation/administration Not annexation Serbia Conditional recognition Religious rights Novi Bazar Ottoman exception FRUS translation Originals uncollated",
    "claim": "history.history-belgrade-sarajevo-1800-1920.c3",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "serbiaConstitution",
    "text": "1903 Serbia Hereditary constitutional monarchy King/national representation Joint legislation MJP French edition Originals uncollated Not Bosnia constitution or popular consent",
    "claim": "history.history-belgrade-sarajevo-1800-1920.c7",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "bosniaCouncilTransfer",
    "text": "1918-10-20 Bosnia National Council 1918-11-01 Authority transfer Parliament retrospective Original acts uncollated Separate institutions Not universal representation",
    "claim": "history.history-belgrade-sarajevo-1800-1920.c11",
    "countedWords": 17,
    "whitespaceTokens": 19
  },
  {
    "id": "governmentAndUnion",
    "text": "1918-11-03 Bosnia Šola government 1918-12-01 Belgrade Union address Parliament/Museum retrospectives Originals uncollated Committees not democratically elected Membership counts unresolved",
    "claim": "history.history-belgrade-sarajevo-1800-1920.c15",
    "countedWords": 19,
    "whitespaceTokens": 21
  },
  {
    "id": "comparison",
    "text": "1878 Bosnia Occupation Serbia Conditional recognition 1903 Joint legislation 1918 Bosnia Council/Government Belgrade Union address Unelected committees Retrospectives/editions Originals uncollated Not annexation or popular consent",
    "claim": "history.history-belgrade-sarajevo-1800-1920.c18",
    "countedWords": 24,
    "whitespaceTokens": 27
  }
];
export const REQUIRED = [
  "berlinDistinction",
  "serbiaConstitution",
  "bosniaCouncilTransfer",
  "governmentAndUnion"
];
export const ATTACHMENTS = {
  "berlinDistinction": [
    "berlinDistinction"
  ],
  "serbiaConstitution": [
    "serbiaConstitution"
  ],
  "bosniaCouncilTransfer": [
    "bosniaCouncilTransfer"
  ],
  "governmentAndUnion": [
    "governmentAndUnion"
  ]
};
export const PREDICTION = {
  "question": "Does an occupation or later union address establish identical institutions or popular consent at both cities?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "The 1878 treaty distinguishes Bosnia’s occupation from Serbia’s conditional recognition. Serbia’s later constitution describes its own joint lawmaking, not Bosnia’s institution. The acquired retrospectives separately identify Bosnia’s council, transfer and Šola government before the Belgrade union address. These are actual institutional links rather than a deduction from war or a single label. The museum’s unelected-committee qualification and conflicting membership counts prevent a universal-consent inference. Original acts remain uncollated.";
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
