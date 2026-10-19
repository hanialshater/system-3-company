import {lessonData} from "./data";
export const RECORDS=lessonData.documents;
export interface SourcePin {url:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "protocol",
    "text": "Cuba: relinquishment promised; Puerto Rico: cession promised",
    "requiredContext": "Spain ↔ United States No resident consent established",
    "fieldAddresses": [
      "protocol.cuba",
      "protocol.puertoRico"
    ],
    "claims": [
      "history.history-havana-san-juan-1800-1960.c1",
      "history.history-havana-san-juan-1800-1960.c2"
    ],
    "sourcePins": []
  },
  {
    "id": "treaty",
    "text": "Cuba: relinquishment/occupation; Puerto Rico: cession",
    "requiredContext": "Spain ↔ United States No resident consent established",
    "fieldAddresses": [
      "treaty.cuba",
      "treaty.puertoRico"
    ],
    "claims": [
      "history.history-havana-san-juan-1800-1960.c3",
      "history.history-havana-san-juan-1800-1960.c4"
    ],
    "sourcePins": []
  },
  {
    "id": "puertoRicoExecutivePrescription",
    "text": "1900 Puerto Rico governor: US President appoints with Senate consent. Statute; elected delegates coexist, congressional annulment retained. Prescription≠operation; scan/OCR unverified.",
    "requiredContext": "Keep elected delegates (§27) and congressional annulment (§31); never imply no elections or unrestricted self-government. Printed81§17/PDFindex4 operative visual check remains independent; own extraction attempt produced no usable scan text.",
    "fieldAddresses": [
      "purposeAugmentation.witnesses.puertoRicoExecutivePrescription"
    ],
    "claims": [
      "history.history-havana-san-juan-1800-1960.c18"
    ],
    "sourcePins": [
      {
        "id": "foraker",
        "url": "https://www.govinfo.gov/content/pkg/STATUTE-31/pdf/STATUTE-31-Pg77.pdf",
        "path": "company/research/history-next10-four-purpose-bodies/foraker.pdf",
        "http": "200",
        "exit": 0,
        "error": "",
        "sha256": "9465587f47154c64228fa9a99857b4764de2439228358eaaf910ccfa054d92d6",
        "bytes": 2471850,
        "title": "US Statutes at Large31Stat77, Act12April1900 ch191",
        "historicalMaker": "US Congress; approval12April1900",
        "custodian": "GovInfo/Government Publishing Office",
        "locator": "PDF fifth page (zero-based4), printed81 §17; printed82 §27 and83 §31 optional institutional qualifications",
        "minimalOwnEnglishFact": "The1900Act prescribes a Puerto Rican governor appointed by the US President with Senate consent.",
        "limits": "Statutory prescription alone does not demonstrate actual appointment or operation; Puerto Rican elected delegates coexist (§27), and US congressional annulment power persists (§31); do not say no elections or full self-government.",
        "editionLanguageMediation": "English official printed statute scan; web OCR consulted, operative visual page to be independently checked.",
        "rights": "Evidence acquisition only; use own minimal attributed factual paraphrase. No copied prose, source translation, image, map, layout, facsimile or dataset permitted by this research packet; source-use owner assesses proposed adoption.",
        "claimStatus": "unverified",
        "checkedBy": "",
        "checkedOn": "",
        "sourceId": "foraker",
        "bodyPath": "company/research/history-next10-four-purpose-bodies/foraker.pdf",
        "bodySha256": "9465587f47154c64228fa9a99857b4764de2439228358eaaf910ccfa054d92d6",
        "sourceLedger": "company/research/2026-10-19-history-next10-four-purpose-bridges-ledger.json",
        "sourceLedgerSha256": "651f751ae5c0d80e9c39e3db1341108185af405a02af7b722b5387a55e4dfe30",
        "representation": "actual acquired PDF scan",
        "claimsStatus": "unverified"
      }
    ]
  },
  {
    "id": "cubanExecutivePrescription",
    "text": "1901 Cuba: indirect presidential election. 1904 French edition; Spanish uncollated. MJP editorial introduction: US intervention constraints. Prescription≠operation or universal franchise.",
    "requiredContext": "Adoption/text date is not commencement or an observed election. Platt intervention appendix remains a constraint; not unrestricted independence. Annuaire1904 French reproduction; Spanish original/1904edition uncollated; working French/English review required. Intervention is attributed to the acquired modern MJP editorial introduction61–73; no operative linked appendix text was acquired.",
    "fieldAddresses": [
      "purposeAugmentation.witnesses.cubanExecutivePrescription"
    ],
    "claims": [
      "history.history-havana-san-juan-1800-1960.c19"
    ],
    "sourcePins": [
      {
        "id": "cuba-constitution",
        "url": "https://mjp.univ-perp.fr/constit/cu1901.htm",
        "path": "company/research/history-next10-four-purpose-bodies/cuba-constitution.html",
        "http": "200",
        "exit": 0,
        "error": "",
        "sha256": "280d79443cc36b421d6838800585bafcf291b020d22cff3f0f0e4baf36ad09d9",
        "bytes": 72265,
        "normalizedPath": "company/research/history-next10-four-purpose-bodies/cuba-constitution.txt",
        "normalizedSha256": "4f52a138fa42119dda8f36fb3bb229f8878e4bfdb25b24d972087286f0173579",
        "title": "Cuban Constitution21February1901, MJP French edition",
        "historicalMaker": "Cuban Constitutional Convention; dated21February1901, appendix acceptance separately12June1901 in editorial introduction",
        "custodian": "Université de Perpignan Digithèque MJP",
        "locator": "Source note normalized109–111 (Annuaire de législation étrangère1904); TitleVII Arts64/66, normalized1032–1062",
        "minimalOwnEnglishFact": "The French edition prescribes presidential executive power and indirect presidential election.",
        "limits": "Constitutional prescription is not demonstrated electoral operation, universal franchise, popular ratification or unrestricted independence; retain appended Platt intervention constraints and separate adoption/effect dates.",
        "editionLanguageMediation": "French reproduction attributed to Annuaire de législation étrangère1904. Spanish original and1904 edition not collated; English here is working factual paraphrase, not certified translation.",
        "rights": "Evidence acquisition only; use own minimal attributed factual paraphrase. No copied prose, source translation, image, map, layout, facsimile or dataset permitted by this research packet; source-use owner assesses proposed adoption.",
        "claimStatus": "unverified",
        "checkedBy": "",
        "checkedOn": "",
        "sourceId": "cuba-constitution",
        "bodyPath": "company/research/history-next10-four-purpose-bodies/cuba-constitution.html",
        "bodySha256": "280d79443cc36b421d6838800585bafcf291b020d22cff3f0f0e4baf36ad09d9",
        "sourceLedger": "company/research/2026-10-19-history-next10-four-purpose-bridges-ledger.json",
        "sourceLedgerSha256": "651f751ae5c0d80e9c39e3db1341108185af405a02af7b722b5387a55e4dfe30",
        "representation": "actual acquired HTML and normalized text",
        "claimsStatus": "unverified",
        "extractedTextPath": "company/research/history-next10-four-purpose-bodies/cuba-constitution.txt",
        "extractedTextSha256": "4f52a138fa42119dda8f36fb3bb229f8878e4bfdb25b24d972087286f0173579",
        "webEditionCredit": "Jean-Pierre Maury, MJP web-edition author/editor; ©2009, distinct from Cuban Constitutional Convention and Annuaire de législation étrangère1904; printed source and Spanish original not collated."
      },
      {
        "id": "cuba-constitution",
        "url": "https://mjp.univ-perp.fr/constit/cu1901.htm",
        "path": "company/research/history-next10-four-purpose-bodies/cuba-constitution.html",
        "http": "200",
        "exit": 0,
        "error": "",
        "sha256": "280d79443cc36b421d6838800585bafcf291b020d22cff3f0f0e4baf36ad09d9",
        "bytes": 72265,
        "normalizedPath": "company/research/history-next10-four-purpose-bodies/cuba-constitution.txt",
        "normalizedSha256": "4f52a138fa42119dda8f36fb3bb229f8878e4bfdb25b24d972087286f0173579",
        "title": "Cuban Constitution21February1901, MJP French edition",
        "historicalMaker": "Jean-Pierre Maury, MJP web-edition author/editor, modern editorial account; not the historical Cuban constitutional convention",
        "custodian": "Université de Perpignan Digithèque MJP",
        "locator": "Actual MJP modern French editorial introduction normalized61–73; Platt intervention/account of12June1901appendix acceptance. Linked appendix heading1836onward is NOT acquired operative text.",
        "minimalOwnEnglishFact": "The modern MJP editorial introduction describes US intervention constraints and separately reports appendix acceptance on12June1901.",
        "limits": "Do not cite Arts64/66 or linked appendix heading as support for intervention. Editorial account is separate from constitutional prescription; no unrestricted independence or exact appendix-text claim.",
        "editionLanguageMediation": "Modern French editorial introduction; own working English unreviewed, not the operative linked appendix or Spanish original.",
        "rights": "Evidence acquisition only; use own minimal attributed factual paraphrase. No copied prose, source translation, image, map, layout, facsimile or dataset permitted by this research packet; source-use owner assesses proposed adoption.",
        "claimStatus": "unverified",
        "checkedBy": "",
        "checkedOn": "",
        "sourceId": "cuba-constitution-editorial-intervention",
        "bodyPath": "company/research/history-next10-four-purpose-bodies/cuba-constitution.html",
        "bodySha256": "280d79443cc36b421d6838800585bafcf291b020d22cff3f0f0e4baf36ad09d9",
        "sourceLedger": "company/research/2026-10-19-history-next10-four-purpose-bridges-ledger.json",
        "sourceLedgerSha256": "651f751ae5c0d80e9c39e3db1341108185af405a02af7b722b5387a55e4dfe30",
        "representation": "actual acquired HTML and normalized text",
        "claimsStatus": "unverified",
        "extractedTextPath": "company/research/history-next10-four-purpose-bodies/cuba-constitution.txt",
        "extractedTextSha256": "4f52a138fa42119dda8f36fb3bb229f8878e4bfdb25b24d972087286f0173579",
        "webEditionCredit": "Jean-Pierre Maury, MJP web-edition author/editor; ©2009, distinct from Cuban Constitutional Convention and Annuaire de législation étrangère1904; printed source and Spanish original not collated."
      }
    ]
  },
  {
    "id": "woodTransferReport",
    "text": "1902 Wood reports transfer to Cuban President/Congress under constitution. FRUS transcription, original uncollated; not unrestricted sovereignty, resident consent or continuing operation.",
    "requiredContext": "Do not adopt Wood’s gratitude/fulfilment rhetoric as residents’ testimony or proof of consent/fair elections.",
    "fieldAddresses": [
      "purposeAugmentation.witnesses.woodTransferReport"
    ],
    "claims": [
      "history.history-havana-san-juan-1800-1960.c20"
    ],
    "sourcePins": [
      {
        "id": "cuba-frus",
        "url": "https://history.state.gov/historicaldocuments/frus1902/d272",
        "path": "company/research/history-next10-four-purpose-bodies/cuba-frus.html",
        "http": "200",
        "exit": 0,
        "error": "",
        "sha256": "a016ba6bba842078890c8f416b7d4c53bd4a56eabc70545a5ba23c5939466c73",
        "bytes": 131155,
        "normalizedPath": "company/research/history-next10-four-purpose-bodies/cuba-frus.txt",
        "normalizedSha256": "e9622376592ccedf35cb1e2d3fe605bb7800e55c13a31553483d929ef293cb76",
        "title": "FRUS1902 Document272, Wood telegram",
        "historicalMaker": "Leonard Wood, US military governor of Cuba, telegram to US Adjutant-General, Habana20May1902",
        "custodian": "US Department of State Office of the Historian",
        "locator": "Document272; normalized lines57–73; operative first paragraph",
        "minimalOwnEnglishFact": "Wood reports transferring government/control to Cuba’s President and Congress on20May1902 under its constitution.",
        "limits": "Attributed official report, not proof of unrestricted sovereignty, residents’ consent, electoral fairness or continuing operation.",
        "editionLanguageMediation": "English FRUS documentary transcription; no original telegram facsimile collated.",
        "rights": "Evidence acquisition only; use own minimal attributed factual paraphrase. No copied prose, source translation, image, map, layout, facsimile or dataset permitted by this research packet; source-use owner assesses proposed adoption.",
        "claimStatus": "unverified",
        "checkedBy": "",
        "checkedOn": "",
        "sourceId": "cuba-frus",
        "bodyPath": "company/research/history-next10-four-purpose-bodies/cuba-frus.html",
        "bodySha256": "a016ba6bba842078890c8f416b7d4c53bd4a56eabc70545a5ba23c5939466c73",
        "sourceLedger": "company/research/2026-10-19-history-next10-four-purpose-bridges-ledger.json",
        "sourceLedgerSha256": "651f751ae5c0d80e9c39e3db1341108185af405a02af7b722b5387a55e4dfe30",
        "representation": "actual acquired HTML and normalized text",
        "claimsStatus": "unverified",
        "extractedTextPath": "company/research/history-next10-four-purpose-bodies/cuba-frus.txt",
        "extractedTextSha256": "e9622376592ccedf35cb1e2d3fe605bb7800e55c13a31553483d929ef293cb76"
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "protocol",
    "text": "1898 Protocol Cuba: relinquishment promised Puerto Rico: cession promised Spain ↔ United States No resident consent established",
    "claim": "history.history-havana-san-juan-1800-1960.c1 history.history-havana-san-juan-1800-1960.c2"
  },
  {
    "id": "treaty",
    "text": "1898 Treaty Cuba: relinquishment/occupation Puerto Rico: cession Spain ↔ United States No resident consent established",
    "claim": "history.history-havana-san-juan-1800-1960.c3 history.history-havana-san-juan-1800-1960.c4"
  },
  {
    "id": "puertoRicoExecutivePrescription",
    "text": "1900 Puerto Rico governor: US President appoints with Senate consent. Statute; elected delegates coexist, congressional annulment retained. Prescription≠operation; scan/OCR unverified.",
    "claim": "history.history-havana-san-juan-1800-1960.c18"
  },
  {
    "id": "cubanExecutivePrescription",
    "text": "1901 Cuba: indirect presidential election. 1904 French edition; Spanish uncollated. MJP editorial introduction: US intervention constraints. Prescription≠operation or universal franchise.",
    "claim": "history.history-havana-san-juan-1800-1960.c19"
  },
  {
    "id": "woodTransferReport",
    "text": "1902 Wood reports transfer to Cuban President/Congress under constitution. FRUS transcription, original uncollated; not unrestricted sovereignty, resident consent or continuing operation.",
    "claim": "history.history-havana-san-juan-1800-1960.c20"
  },
  {
    "id": "comparison",
    "text": "1898 Cuba relinquishment/occupation Puerto Rico cession 1900 Puerto Rico governor US appointed 1901 Cuban indirect election 1902 Wood transfer report Prescriptions≠operation",
    "claim": "history.history-havana-san-juan-1800-1960.c21"
  }
];
export const REQUIRED = [
  "protocol",
  "treaty",
  "puertoRicoExecutivePrescription",
  "cubanExecutivePrescription",
  "woodTransferReport"
];
export const ATTACHMENTS = {
  "protocol": [
    "protocol"
  ],
  "treaty": [
    "treaty"
  ],
  "puertoRicoExecutivePrescription": [
    "puertoRicoExecutivePrescription"
  ],
  "cubanExecutivePrescription": [
    "cubanExecutivePrescription"
  ],
  "woodTransferReport": [
    "woodTransferReport"
  ]
};
export const PREDICTION = {
  "question": "Do these agreements give Cuba and Puerto Rico identical clauses?",
  "options": [
    "Yes, Spain’s departure means identical arrangements",
    "No, compare the operative clauses"
  ],
  "answer": 1
};
export const REVEAL = "The clauses distinguish relinquishment from cession, including US occupation obligations for Cuba. Signature differs from effect: ratifications were exchanged in April 1899. Spain and the United States’ records establish neither residents’ consent, unrestricted self-government nor either place’s whole history. Puerto Rico’s statute prescribes US appointment with Senate consent; Cuba’s French edition, Spanish original uncollated, prescribes indirect presidential election. MJP’s modern introduction describes intervention constraints. Wood reports a 1902 transfer to Cuba’s President and Congress. Prescriptions and reports establish neither unrestricted sovereignty nor operation.";
export const ORIENTATION: {claim:string;text:string;context:string;sourcePins:never[]}[] = [];
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
