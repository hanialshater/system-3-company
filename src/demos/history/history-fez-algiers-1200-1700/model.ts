export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "fezCouncil",
    "text": "TDV describes Fez’s Marinid administrative centre and tribal-leader council, with limited reach after Muhammad’s 1472 Wattasid accession.",
    "requiredContext": "No uniform modern Moroccan state or unlimited Wattasid reach. TDV Turkish scholarly account, original chronicles uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-fez-algiers-1200-1700.c1",
      "history.history-fez-algiers-1200-1700.c2",
      "history.history-fez-algiers-1200-1700.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "fezOffices",
        "url": "https://islamansiklopedisi.org.tr/fas",
        "bodyPath": "/tmp/history-next15d-source-bodies/fezOffices.web.txt",
        "bodySha256": "740b7a02a5c53702e48888f95537bb813f98818cafdabd371aff0849c481bf41",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "TDVİslâmAnsiklopedisi multi-author countryarticle; selectedIslamicperiodsection",
        "publicationOrDocumentDate": "1995",
        "languageMediation": "Turkish authored scholarly account; minimal English agent paraphrase unreviewed; cited chronicles/documents not independently collated",
        "locator": "L 258–263,Marinidcapital/counciland Wattasid 1472",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "algiersAppointments",
    "text": "Ottoman-appointed three-year pashas at Algiers differed from local military power; Halil Aga expelled Ali Pasha in 1659.",
    "requiredContext": "Three-year appointment does not guarantee secure control.1659 expulsion is distinct from later dayi selection; original records uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-fez-algiers-1200-1700.c4",
      "history.history-fez-algiers-1200-1700.c5",
      "history.history-fez-algiers-1200-1700.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "algiersOffices",
        "url": "https://islamansiklopedisi.org.tr/cezayir",
        "bodyPath": "/tmp/history-next15d-source-bodies/algiersOffices.web.txt",
        "bodySha256": "78dbad2dcec9b26cc00601b3f83df827a540d214aff823872939eb7094760cfd",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Kemal Kahraman;TDVİslâmAnsiklopedisi",
        "publicationOrDocumentDate": "1993",
        "languageMediation": "Turkish authored scholarly account; minimal English agent paraphrase unreviewed; cited chronicles/documents not independently collated; its1671dayistart differs fromTunusarticle1681cross-reference; selectedAlgiers-specificaccount retainedasattribution",
        "locator": "L 319–329,1587 pashas/1659 Halil Aga",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "localSelection",
    "text": "Algiers’s local dayi selection and assisting council differ from Fez’s royal council and contested reach.",
    "requiredContext": "Military/elite selection and councils are not popular consent. Avoid a generic Morocco-versus-empire binary; originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-fez-algiers-1200-1700.c7",
      "history.history-fez-algiers-1200-1700.c8",
      "history.history-fez-algiers-1200-1700.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "fezOffices",
        "url": "https://islamansiklopedisi.org.tr/fas",
        "bodyPath": "/tmp/history-next15d-source-bodies/fezOffices.web.txt",
        "bodySha256": "740b7a02a5c53702e48888f95537bb813f98818cafdabd371aff0849c481bf41",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "TDVİslâmAnsiklopedisi multi-author countryarticle; selectedIslamicperiodsection",
        "publicationOrDocumentDate": "1995",
        "languageMediation": "Turkish authored scholarly account; minimal English agent paraphrase unreviewed; cited chronicles/documents not independently collated",
        "locator": "Fez L 260–263;Algiers L 324–330",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "algiersOffices",
        "url": "https://islamansiklopedisi.org.tr/cezayir",
        "bodyPath": "/tmp/history-next15d-source-bodies/algiersOffices.web.txt",
        "bodySha256": "78dbad2dcec9b26cc00601b3f83df827a540d214aff823872939eb7094760cfd",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Kemal Kahraman;TDVİslâmAnsiklopedisi",
        "publicationOrDocumentDate": "1993",
        "languageMediation": "Turkish authored scholarly account; minimal English agent paraphrase unreviewed; cited chronicles/documents not independently collated; its1671dayistart differs fromTunusarticle1681cross-reference; selectedAlgiers-specificaccount retainedasattribution",
        "locator": "Fez L 260–263;Algiers L 324–330",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "fezCouncil",
    "text": "Fez Marinid centre Tribal-leader council 1472 Wattasid Muhammad Limited reach TDV scholarship Working English Original chronicles uncollated",
    "claim": "history.history-fez-algiers-1200-1700.c3",
    "countedWords": 18,
    "whitespaceTokens": 19
  },
  {
    "id": "algiersAppointments",
    "text": "Algiers Ottoman three-year pashas 1659 Halil Aga expels Ali Pasha TDV scholarship Working English Original records uncollated Appointment ≠ secure control",
    "claim": "history.history-fez-algiers-1200-1700.c6",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "localSelection",
    "text": "Fez Royal council Contested reach Algiers Locally selected dayis Assisting council TDV scholarship Working English Original records uncollated Not universal representation",
    "claim": "history.history-fez-algiers-1200-1700.c9",
    "countedWords": 23,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Fez Marinid council Wattasid 1472 Limited reach Algiers Ottoman appointments Halil Aga 1659 Expulsion Local dayis/council TDV scholarship Working English Originals uncollated Distinct powers",
    "claim": "history.history-fez-algiers-1200-1700.c10",
    "countedWords": 24,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "fezCouncil",
  "algiersAppointments",
  "localSelection"
];
export const ATTACHMENTS = {
  "fezCouncil": [
    "fezCouncil"
  ],
  "algiersAppointments": [
    "algiersAppointments"
  ],
  "localSelection": [
    "localSelection"
  ]
};
export const PREDICTION = {
  "question": "Does a dynastic or imperial label identify who actually appoints, advises or removes city rulers?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "TDV describes Fez’s royal council and limited Wattasid reach separately from Algiers’s appointed pashas, military expulsion and local dayi selection. These named institutions reveal contested powers that a dynastic or imperial label cannot supply. Elite councils and military choices are not all residents’ representation; appointments do not guarantee secure or uniform control.";
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
