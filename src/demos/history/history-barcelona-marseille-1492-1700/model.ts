export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "barcelonaLists",
    "text": "Barcelona’s city offices used eligible ballot lists from 1498; Ferriol was elected second conseller in 1651.",
    "requiredContext": "City lists differ from Generalitat appointments. November 1651 election/1652 resignation does not define every city right; original registers uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-barcelona-marseille-1492-1700.c1",
      "history.history-barcelona-marseille-1492-1700.c2",
      "history.history-barcelona-marseille-1492-1700.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "barcelona",
        "url": "https://www.iec.cat/recerca-v/projecte1.asp?codi=PT2008-S0119-SERRA01",
        "bodyPath": "/tmp/history-next15d-source-bodies/barcelona.web.txt",
        "bodySha256": "ebd28b07b879063a7ed0c3bd7c24e8272a343a0ebdd327f2a40c8491b49f1fd6",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Eva Serra i Puig led IEC/UniversityBarcelona archival edition project",
        "publicationOrDocumentDate": "project2008–2017;pageundated",
        "languageMediation": "Catalan andEnglish research-project description; documents atArxiuHistoricCiutatBarcelona, editions not inspected",
        "locator": "IECL 3,14–16;Crownarticle L 247–248",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "barcelonaCrown",
        "url": "https://www.enciclopedia.cat/historia-de-la-generalitat-de-catalunya-i-dels-seus-presidents/pau-del-rosso-dega-de-la-seu-de",
        "bodyPath": "/tmp/history-next15d-source-bodies/barcelonaCrown.web.txt",
        "bodySha256": "520acd826c7f8e5da2feaa16326d540ad0edee2ac362689fccaf298f294ffeff",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Història de la Generalitat de Catalunya i dels seus presidents; Enciclopèdia Catalana editorial scholarship",
        "publicationOrDocumentDate": "undatedwebedition",
        "languageMediation": "Catalan scholarly retrospective; minimalEnglishagentparaphraseunreviewed, cited municipaldiary not collated",
        "locator": "IECL 3,14–16;Crownarticle L 247–248",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "marseilleIntervention",
    "text": "Marseille’s retrospective attributes 1660 royal intervention against Niozelles to Louis XIV, reallocating municipal power from nobles to merchants/bourgeois.",
    "requiredContext": "Municipal retrospective, not original royal order. Contested fort-construction date unselected; no royal intervention as universal assent.",
    "fieldAddresses": [],
    "claims": [
      "history.history-barcelona-marseille-1492-1700.c4",
      "history.history-barcelona-marseille-1492-1700.c5",
      "history.history-barcelona-marseille-1492-1700.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "marseilleCity",
        "url": "https://www.marseille.fr/index.php/decouvrir-marseille/2600-ans-dhistoire",
        "bodyPath": "/tmp/history-next15d-source-bodies/marseilleCity.web.txt",
        "bodySha256": "4d6d85567d182744e5cbc979a91c3468f9f9be59fa0e1d931dad4f566ceb67e4",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Ville de Marseille municipal historical synthesis",
        "publicationOrDocumentDate": "undated",
        "languageMediation": "French institutional/scholarly account; minimal English agent paraphrase unreviewed; underlying medieval/earlymodern originals uncollated; source dates fortconstruction1665, which is not adopted because otherinstitutionalaccountsdate1660",
        "locator": "L 82–83,1660 Louis XIVintervention",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "barcelonaRestriction",
    "text": "After 1652 capitulation Philip reserved inclusion and removal from Barcelona city eligibility lists.",
    "requiredContext": "Actual city restriction atL 277 is separate from Diputacio and 1654 Generalitat appointments. Original registers uncollated; acquired Marseille JS stub excluded.",
    "fieldAddresses": [],
    "claims": [
      "history.history-barcelona-marseille-1492-1700.c7",
      "history.history-barcelona-marseille-1492-1700.c8",
      "history.history-barcelona-marseille-1492-1700.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "barcelonaCrown",
        "url": "https://www.enciclopedia.cat/historia-de-la-generalitat-de-catalunya-i-dels-seus-presidents/pau-del-rosso-dega-de-la-seu-de",
        "bodyPath": "/tmp/history-next15d-source-bodies/barcelonaCrown.web.txt",
        "bodySha256": "520acd826c7f8e5da2feaa16326d540ad0edee2ac362689fccaf298f294ffeff",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Història de la Generalitat de Catalunya i dels seus presidents; Enciclopèdia Catalana editorial scholarship",
        "publicationOrDocumentDate": "undatedwebedition",
        "languageMediation": "Catalan scholarly retrospective; minimalEnglishagentparaphraseunreviewed, cited municipaldiary not collated",
        "locator": "Barcelona L 274–277;Marseille L 82–83",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "marseilleCity",
        "url": "https://www.marseille.fr/index.php/decouvrir-marseille/2600-ans-dhistoire",
        "bodyPath": "/tmp/history-next15d-source-bodies/marseilleCity.web.txt",
        "bodySha256": "4d6d85567d182744e5cbc979a91c3468f9f9be59fa0e1d931dad4f566ceb67e4",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Ville de Marseille municipal historical synthesis",
        "publicationOrDocumentDate": "undated",
        "languageMediation": "French institutional/scholarly account; minimal English agent paraphrase unreviewed; underlying medieval/earlymodern originals uncollated; source dates fortconstruction1665, which is not adopted because otherinstitutionalaccountsdate1660",
        "locator": "Barcelona L 274–277;Marseille L 82–83",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "barcelonaLists",
    "text": "1498 Barcelona Eligible ballots City offices 1651 Ferriol Second conseller IEC/archival accounts Working English Original registers uncollated",
    "claim": "history.history-barcelona-marseille-1492-1700.c3",
    "countedWords": 17,
    "whitespaceTokens": 19
  },
  {
    "id": "marseilleIntervention",
    "text": "1660 Marseille Louis XIV overrides Niozelles Municipal power Nobles→merchants/bourgeois Municipal retrospective Working English Original registers uncollated Not popular consent",
    "claim": "history.history-barcelona-marseille-1492-1700.c6",
    "countedWords": 20,
    "whitespaceTokens": 21
  },
  {
    "id": "barcelonaRestriction",
    "text": "1652 Barcelona Philip reserves City-list inclusion/removal IEC historical account Working English Original registers uncollated Crown allegiance ≠ unchanged municipal rights",
    "claim": "history.history-barcelona-marseille-1492-1700.c9",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "comparison",
    "text": "Barcelona Eligible ballots Philip reserves city-list changes 1652 IEC Marseille Louis XIV 1660 Merchants/bourgeois replace nobles Municipal account Working English Registers uncollated Distinct powers",
    "claim": "history.history-barcelona-marseille-1492-1700.c10",
    "countedWords": 24,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "barcelonaLists",
  "marseilleIntervention",
  "barcelonaRestriction"
];
export const ATTACHMENTS = {
  "barcelonaLists": [
    "barcelonaLists"
  ],
  "marseilleIntervention": [
    "marseilleIntervention"
  ],
  "barcelonaRestriction": [
    "barcelonaRestriction"
  ]
};
export const PREDICTION = {
  "question": "Does crown affiliation establish identical city selection rights and royal interventions?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Barcelona’s records distinguish city eligibility lists from Philip’s later reservation of inclusion and removal powers. Marseille’s municipal account describes Louis XIV intervening against its first consul and reallocating municipal power. Crown allegiance does not specify identical selection rights. Neither elite ballots nor the royal intervention represents all residents’ consent; the two institutions and source levels remain distinct.";
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
