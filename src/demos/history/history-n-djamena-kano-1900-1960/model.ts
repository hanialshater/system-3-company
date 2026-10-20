export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "fortLamyPost",
    "text": "The French diplomatic archive’s contextual description identifies Fort-Lamy, now Ndjamena, as the post founded by Émile Gentil in May 1900 after the Koussri battle against Rabah.",
    "requiredContext": "May 1900 establishment from custodial context, not original map as historical boundary evidence or Kanem-Bornu jurisdiction.",
    "fieldAddresses": [],
    "claims": [
      "history.history-n-djamena-kano-1900-1960.c1",
      "history.history-n-djamena-kano-1900-1960.c2",
      "history.history-n-djamena-kano-1900-1960.c3",
      "history.history-n-djamena-kano-1900-1960.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "fortlamySelected",
        "url": "https://archivesdiplomatiques.diplomatie.gouv.fr/ark:/14366/ks6qx4crtvhl",
        "bodyPath": "/tmp/history-next15e-source-bodies/fortlamySelected.web.txt",
        "bodySha256": "f57cbae6d8fea0440e2931dd0388dd8daa212a94965ff556fcc5d36c1565986e",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Archives diplomatiques, France; inventory finalized by Delphine Fourrez and Bérangère Fourquaux",
        "publicationOrDocumentDate": "Inventory finalized 2018–2019; described map after 1900",
        "sourceLevel": "Institutional archival contextual description",
        "languageMediationAndLimits": "Custodial description supports post establishment, not a blank-site premise or precolonial Kanem-Bornu jurisdiction. Original map not used as evidence asset.",
        "locator": "web L224–227, 7AE/11 contextual note",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/fortlamySelected.web.json",
        "rawToolResponseSha256": "164c6665b81458a420627a6c929ca68e8f530ee926adfd1f727c5e7978c44dae",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "kanoSarki",
    "text": "Kano’s institutional account says Abbas negotiated surrender, was appointed Sarki subject to probation, and initially could neither occupy the palace nor fill vacant titles; subsequent British residency could reverse title appointments.",
    "requiredContext": "Use CE 1903, not inconsistent printed AH conversion. Initial palace/title restrictions and British ability to reverse appointments remain operative conditions.",
    "fieldAddresses": [],
    "claims": [
      "history.history-n-djamena-kano-1900-1960.c5",
      "history.history-n-djamena-kano-1900-1960.c6",
      "history.history-n-djamena-kano-1900-1960.c7",
      "history.history-n-djamena-kano-1900-1960.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "kano",
        "url": "https://www.kanoemirate.org/indexa4a7.html?Itemid=60&id=51&limitstart=8&option=com_content&view=article",
        "bodyPath": "/tmp/history-next15e-source-bodies/kano.web.txt",
        "bodySha256": "ed45115d2bd413ba6dba1119396f7a512e7a991670358116877812a91e1dd9e4",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Kano Emirate institutional history, citing Fika, Christelow, Last, Lovejoy and others",
        "publicationOrDocumentDate": "Publication date not stated; reign 1903–1919",
        "sourceLevel": "Local institutional retrospective with scholarly references",
        "languageMediationAndLimits": "Dynastic institutional perspective and retrospective citations; printed AH/CE pairing for installation appears inconsistent, so only CE 1903/probation relation used. Consent under conquest is not general popular assent.",
        "locator": "web L58–66",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/kano.web.json",
        "rawToolResponseSha256": "35818b3d49555ef04382211d57e3ba594e0d108aa615de7c3e7a2586449df3ff",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "retainedOffices",
    "text": "Kano’s British-supervised Sarki and district Hakimai collecting poll tax represent retained and reorganized local offices; Fort-Lamy’s French post establishment is a different relation and does not merge Kano, Sokoto or Kanem-Bornu authorities.",
    "requiredContext": "Retained/reorganized Kano local offices are not French post administration; dynastic institutional perspective does not represent every community.",
    "fieldAddresses": [],
    "claims": [
      "history.history-n-djamena-kano-1900-1960.c9",
      "history.history-n-djamena-kano-1900-1960.c10",
      "history.history-n-djamena-kano-1900-1960.c11",
      "history.history-n-djamena-kano-1900-1960.c12",
      "history.history-n-djamena-kano-1900-1960.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "kano",
        "url": "https://www.kanoemirate.org/indexa4a7.html?Itemid=60&id=51&limitstart=8&option=com_content&view=article",
        "bodyPath": "/tmp/history-next15e-source-bodies/kano.web.txt",
        "bodySha256": "ed45115d2bd413ba6dba1119396f7a512e7a991670358116877812a91e1dd9e4",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Kano Emirate institutional history, citing Fika, Christelow, Last, Lovejoy and others",
        "publicationOrDocumentDate": "Publication date not stated; reign 1903–1919",
        "sourceLevel": "Local institutional retrospective with scholarly references",
        "languageMediationAndLimits": "Dynastic institutional perspective and retrospective citations; printed AH/CE pairing for installation appears inconsistent, so only CE 1903/probation relation used. Consent under conquest is not general popular assent.",
        "locator": "web L61–67",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/kano.web.json",
        "rawToolResponseSha256": "35818b3d49555ef04382211d57e3ba594e0d108aa615de7c3e7a2586449df3ff",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "fortlamySelected",
        "url": "https://archivesdiplomatiques.diplomatie.gouv.fr/ark:/14366/ks6qx4crtvhl",
        "bodyPath": "/tmp/history-next15e-source-bodies/fortlamySelected.web.txt",
        "bodySha256": "f57cbae6d8fea0440e2931dd0388dd8daa212a94965ff556fcc5d36c1565986e",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Archives diplomatiques, France; inventory finalized by Delphine Fourrez and Bérangère Fourquaux",
        "publicationOrDocumentDate": "Inventory finalized 2018–2019; described map after 1900",
        "sourceLevel": "Institutional archival contextual description",
        "languageMediationAndLimits": "Custodial description supports post establishment, not a blank-site premise or precolonial Kanem-Bornu jurisdiction. Original map not used as evidence asset.",
        "locator": "web L227",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/fortlamySelected.web.json",
        "rawToolResponseSha256": "164c6665b81458a420627a6c929ca68e8f530ee926adfd1f727c5e7978c44dae",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "fortLamyPost",
    "text": "1900 Fort-Lamy Emile Gentil Post after Koussri/Rabah battle French archival description Originals uncollated Modern Ndjamena orientation Not empty land",
    "claim": "history.history-n-djamena-kano-1900-1960.c3",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "kanoSarki",
    "text": "1903 Kano Abbas Sarki probation Palace/title appointments restricted British supervision Emirate retrospective Originals uncollated Surrender under conquest ≠ popular consent",
    "claim": "history.history-n-djamena-kano-1900-1960.c7",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "retainedOffices",
    "text": "Kano Sarki British supervision Hakimai poll tax Fort-Lamy French post Archive/Emirate retrospectives Originals uncollated Different institutions Not merged Kano/Sokoto/Kanem-Bornu",
    "claim": "history.history-n-djamena-kano-1900-1960.c11",
    "countedWords": 21,
    "whitespaceTokens": 21
  },
  {
    "id": "comparison",
    "text": "1900 Fort-Lamy French post 1903 Kano Sarki probation Title appointments restricted British reversal Hakimai poll tax Archive/Emirate accounts Originals uncollated Separate institutions Conquest ≠ consent",
    "claim": "history.history-n-djamena-kano-1900-1960.c14",
    "countedWords": 24,
    "whitespaceTokens": 27
  }
];
export const REQUIRED = [
  "fortLamyPost",
  "kanoSarki",
  "retainedOffices"
];
export const ATTACHMENTS = {
  "fortLamyPost": [
    "fortLamyPost"
  ],
  "kanoSarki": [
    "kanoSarki"
  ],
  "retainedOffices": [
    "retainedOffices"
  ]
};
export const PREDICTION = {
  "question": "Does establishing a colonial post create the same authority as Kano’s retained and supervised offices?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "The French archive describes Fort-Lamy’s establishment after battle. Kano’s institutional account instead records Abbas’s probation, restrictions on palace and title appointments, and later British-supervised offices collecting tax. A post and retained local offices are different relations. These retrospectives do not merge Kano, Sokoto or Kanem-Bornu, establish empty land or turn surrender under conquest into popular consent.";
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
