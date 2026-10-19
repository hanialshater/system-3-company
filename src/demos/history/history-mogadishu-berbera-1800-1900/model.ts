export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "mogadishuRelations",
    "text": "Lewis describes Zanzibar representation and Geledi influence: an 1870 Mogadishu fort required Geledi consent and assistance; his 1892 lease account gives a 25-year term and annual rent while retaining the Sultan’s property claim.",
    "requiredContext": "Attributed Lewis account, not original lease; retain Sultan property claim and specific local consent distinct from all residents.",
    "fieldAddresses": [],
    "claims": [
      "history.history-mogadishu-berbera-1800-1900.c1",
      "history.history-mogadishu-berbera-1800-1900.c2",
      "history.history-mogadishu-berbera-1800-1900.c3",
      "history.history-mogadishu-berbera-1800-1900.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "somaliaGeledi",
        "url": "https://arcadia.sba.uniroma3.it/bitstream/2307/4110/1/A%20modern%20history%20of%20Somalia.pdf",
        "title": "A Modern History of Somalia, revised updated expanded edition",
        "bodyPath": "/tmp/history-next15c-source-bodies/somaliaGeledi.pdf",
        "bodySha256": "5e2d42a16dee2604ac22f27a2cd09968dbb7de3f4390bcf1e92d7d2efe806ee1",
        "representation": "raw downloaded bytes",
        "makerCustodianEditor": "I.M.Lewis, Westview1988; Università Roma Tre repository custodian",
        "publicationOrDocumentDate": "1988",
        "languageMediationAndLimits": "English scholarly account; nineteenth-century reports/treaty originals not collated",
        "sourceLevel": "Inherited scholarly/institutional account; source level not upgraded by reuse",
        "locator": "PDF25/printed38–39;PDF31/printed51,fort1870/lease1892",
        "transport": "certificate verification disabled after local chain failure; identity not cryptographically authenticated",
        "extractedTextPath": "/tmp/history-next15c-source-bodies/somaliaGeledi.txt",
        "extractedTextSha256": "77adb35157f7a65126f06b1c22450da0c9acef701effefd5d247b73704e778a3",
        "terms": "Inherited use remains subject to independent source-use assessment; no imported source expression/media."
      }
    ]
  },
  {
    "id": "habrAwalProtection",
    "text": "Omar’s Appendix 16 reprints Hunter’s agreement with Habr Awal elders, extending British protection to signers and territory under their jurisdiction, restricting foreign agreements and giving 15 March 1886 operation.",
    "requiredContext": "Actual Appendix 16 PDF 607–608/printed 575–576 is selected, not 1884 safe-conduct or another party treaty. Narrative March 5 differs from appendix March 15; retain discrepancy. Original instrument uncollated, no nominal-roster completeness assumption.",
    "fieldAddresses": [],
    "claims": [
      "history.history-mogadishu-berbera-1800-1900.c5",
      "history.history-mogadishu-berbera-1800-1900.c6",
      "history.history-mogadishu-berbera-1800-1900.c7",
      "history.history-mogadishu-berbera-1800-1900.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "berberaOmar",
        "url": "https://arcadia.sba.uniroma3.it/bitstream/2307/2960/1/The%20scramble%20in%20the%20Horn%20of%20Africa.%20History%20of%20Somalia%20%281827-1977%29.pdf",
        "title": "Mohamed Osman Omar, The Scramble in the Horn of Africa: History of Somalia1827–1977",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/berberaOmar.body",
        "bodySha256": "1c64d090e4afc6e1ae79de266cc8b207f6cc54b7cb38432447e2d72bc25fe289",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Mohamed Osman Omar, The Scramble in the Horn of Africa: History of Somalia1827–1977",
        "publicationOrDocumentDate": "Somali Publications2001, reprint2009; RomaTre repository",
        "languageMediationAndLimits": "Authored historical book with documentary reprints; original British treaty uncollated; narrativeMarch5 conflicts appendixMarch15",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "PDF607–608/printed575–576 Appendix16 HabrAwal1886 ArtsI–III and signatories; PDF609ratification not selected",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/berberaOmar.txt",
        "extractedTextSha256": "9c266126fb78ea7ac85177322a035f32d6c6d10eadad506fe51fca4fd540a96e",
        "terms": "Actualcopyrightpage2001/reprint2009:allrightsreserved; repositoryhosting doesnotwaive rights. Onlyownminimal factualparaphrase proposed."
      }
    ]
  },
  {
    "id": "limitedAdministration",
    "text": "Lewis’s short-lived 1843 governor and later tax collector describe limits on Zanzibar’s city authority; a protection prescription is not proof of continuous administration.",
    "requiredContext": "Do not borrow Habr Awal duties into Mogadishu or transfer 1886 Warsangali wording. No present-title claim; inherited TLS limitation remains visible in source provenance.",
    "fieldAddresses": [],
    "claims": [
      "history.history-mogadishu-berbera-1800-1900.c9",
      "history.history-mogadishu-berbera-1800-1900.c10",
      "history.history-mogadishu-berbera-1800-1900.c11",
      "history.history-mogadishu-berbera-1800-1900.c12"
    ],
    "sourcePins": [
      {
        "sourceId": "somaliaGeledi",
        "url": "https://arcadia.sba.uniroma3.it/bitstream/2307/4110/1/A%20modern%20history%20of%20Somalia.pdf",
        "title": "A Modern History of Somalia, revised updated expanded edition",
        "bodyPath": "/tmp/history-next15c-source-bodies/somaliaGeledi.pdf",
        "bodySha256": "5e2d42a16dee2604ac22f27a2cd09968dbb7de3f4390bcf1e92d7d2efe806ee1",
        "representation": "raw downloaded bytes",
        "makerCustodianEditor": "I.M.Lewis, Westview1988; Università Roma Tre repository custodian",
        "publicationOrDocumentDate": "1988",
        "languageMediationAndLimits": "English scholarly account; nineteenth-century reports/treaty originals not collated",
        "sourceLevel": "Inherited scholarly/institutional account; source level not upgraded by reuse",
        "locator": "PDF25/printed38–39,1843governor/tax collector",
        "transport": "certificate verification disabled after local chain failure; identity not cryptographically authenticated",
        "extractedTextPath": "/tmp/history-next15c-source-bodies/somaliaGeledi.txt",
        "extractedTextSha256": "77adb35157f7a65126f06b1c22450da0c9acef701effefd5d247b73704e778a3",
        "terms": "Inherited use remains subject to independent source-use assessment; no imported source expression/media."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "mogadishuRelations",
    "text": "1870 Mogadishu Fort Geledi consent/assistance Zanzibar representative 1892 Lease Term/rent Lewis 1988 scholarship Originals uncollated Local relations Not universal assent",
    "claim": "history.history-mogadishu-berbera-1800-1900.c3",
    "countedWords": 19,
    "whitespaceTokens": 22
  },
  {
    "id": "habrAwalProtection",
    "text": "1886-03-15 Habr Awal elders Hunter British protection Signers/jurisdiction Foreign agreements restricted Omar reprint Narrative 1886-03-05 differs Original uncollated Not 1884/Warsangali or all-Somali assent",
    "claim": "history.history-mogadishu-berbera-1800-1900.c7",
    "countedWords": 23,
    "whitespaceTokens": 25
  },
  {
    "id": "limitedAdministration",
    "text": "1843 Mogadishu Short-lived governor Later tax collector Lewis scholarship Treaty prescription ≠ continuous administration Different parties Originals uncollated Not popular consent",
    "claim": "history.history-mogadishu-berbera-1800-1900.c11",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Mogadishu Geledi/Zanzibar Fort/lease Limited governor Habr Awal 1886 Protection Signers/jurisdiction Foreign agreements restricted Lewis/Omar scholarship Original instruments uncollated Prescription ≠ continuous control",
    "claim": "history.history-mogadishu-berbera-1800-1900.c13",
    "countedWords": 22,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "mogadishuRelations",
  "habrAwalProtection",
  "limitedAdministration"
];
export const ATTACHMENTS = {
  "mogadishuRelations": [
    "mogadishuRelations"
  ],
  "habrAwalProtection": [
    "habrAwalProtection"
  ],
  "limitedAdministration": [
    "limitedAdministration"
  ]
};
export const PREDICTION = {
  "question": "Does a party-specific protection treaty establish the same continuous city authority as Mogadishu’s recorded governing relations?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Lewis describes negotiated local relations, a lease and limited Zanzibar administration at Mogadishu. Omar’s appendix instead reprints a party-specific Habr Awal protection agreement, with obligations and jurisdiction bounded to its signers. The selected operative appendix date differs from the narrative date and is not the 1884 or Warsangali agreement. Treaty prescription neither supplies continuous city administration nor establishes all Somali assent; original instruments remain uncollated.";
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
