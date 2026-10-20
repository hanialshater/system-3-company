export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "soyoInstitutions",
    "text": "Sapede’s study distinguishes missionaries linked to Mani Soyo from those under Mani Congo in a 1785 bishop’s letter, showing Soyo elites mediating central Kongo politics.",
    "requiredContext": "Portuguese scholarly paraphrase; original 1785 letter not collated. No flattened independent/autonomous classification.",
    "fieldAddresses": [],
    "claims": [
      "history.history-soyo-cabinda-1700-1900.c1",
      "history.history-soyo-cabinda-1700-1900.c2",
      "history.history-soyo-cabinda-1700-1900.c3",
      "history.history-soyo-cabinda-1700-1900.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "soyoUSP",
        "url": "https://teses.usp.br/teses/disponiveis/8/8138/tde-10122012-110837/publico/2012_ThiagoClemencioSapede_VCorr.pdf",
        "title": "Muana Congo, Muana Nzambi Ampungu: Poder e Catolicismo no Reino do Congo pós-restauração (1769–1795)",
        "bodyPath": "/tmp/history-next15c-source-bodies/soyoUSP.pdf",
        "bodySha256": "a34bf2a6303fc356bfa8764fa6943a980d1fc3d885fce3ae34c5bb6b1716d6af",
        "representation": "raw downloaded bytes",
        "makerCustodianEditor": "Thiago Clemencio Sapede; Universidade de São Paulo2012 corrected masters dissertation",
        "publicationOrDocumentDate": "2012",
        "languageMediationAndLimits": "Portuguese; quoted1785letter located by author, original not collated; paraphrase; not independently reviewed",
        "sourceLevel": "Inherited scholarly/institutional account; source level not upgraded by reuse",
        "locator": "PDF168–169/printed167–168,1785bishop letter discussion/AHU Angola cx70doc28",
        "transport": "certificate verification disabled after local chain failure; identity not cryptographically authenticated",
        "extractedTextPath": "/tmp/history-next15c-source-bodies/soyoUSP.txt",
        "extractedTextSha256": "0ae50568d77dac4cc715e6166d35e738c2980f7f2aee2df8e19936c9be8debbb",
        "terms": "Inherited use remains subject to independent source-use assessment; no imported source expression/media."
      }
    ]
  },
  {
    "id": "ngoyoIntermediaries",
    "text": "Araujo identifies Ngoyo political and commercial intermediaries, including Prince Classe in a 1757 French agreement and a 1783 mambuku near Cabinda; these are not Soyo offices.",
    "requiredContext": "Slave-trade-era violence and competing interests are not free universal consent; original archival letters uncollated. Ngoyo/Cabinda intermediaries remain distinct from Soyo.",
    "fieldAddresses": [],
    "claims": [
      "history.history-soyo-cabinda-1700-1900.c5",
      "history.history-soyo-cabinda-1700-1900.c6",
      "history.history-soyo-cabinda-1700-1900.c7",
      "history.history-soyo-cabinda-1700-1900.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "soyoCambridge",
        "url": "https://www.cambridge.org/core/journals/journal-of-african-history/article/africans-championed-free-trade-violence-sovereignty-and-competition-in-the-era-of-atlantic-slave-trade/B6231711C7BFDE3238E451024838A7BB",
        "title": "Africans Championed Free Trade: Violence, Sovereignty, and Competition in the Era of Atlantic Slave Trade",
        "bodyPath": "/tmp/history-next15c-source-bodies/soyoCambridge.html",
        "bodySha256": "24cf5262df591f897998e91694658e0fc6a981ac60f821ce499860310178a73b",
        "representation": "raw downloaded bytes",
        "makerCustodianEditor": "Ana Lucia Araujo,Howard University; Journal of African History66(2025)e3,Cambridge, DOI10.1017/S0021853725000131",
        "publicationOrDocumentDate": "2025",
        "languageMediationAndLimits": "English research article with archival references; original letters not collated",
        "sourceLevel": "Inherited scholarly/institutional account; source level not upgraded by reuse",
        "locator": "normalized492–500;1757Prince Classe/mfuka and1783Ngoyo mambuku paragraphs",
        "transport": "certificate verification disabled after local chain failure; identity not cryptographically authenticated",
        "extractedTextPath": "/tmp/history-next15c-source-bodies/soyoCambridge.txt",
        "extractedTextSha256": "14da046cdb146f16404fd91e70a9fc8b03211597b6d3217fee9b5b4592016de0",
        "terms": "Inherited use remains subject to independent source-use assessment; no imported source expression/media."
      }
    ]
  },
  {
    "id": "cabindaProtection",
    "text": "Mavungo’s scanned reprint identifies Portuguese-authorized Capelo contracting with Cabinda princes, governors, chiefs and successors; the 1 February 1885 terms concern protection, customs, paid land and execution subject to approval.",
    "requiredContext": "Preamble contracting roles suffice for this bounded candidate, not all-name completeness or universal representation. Petition 22 January is separate; original instrument uncollated, cropped individual roster absent.",
    "fieldAddresses": [],
    "claims": [
      "history.history-soyo-cabinda-1700-1900.c9",
      "history.history-soyo-cabinda-1700-1900.c10",
      "history.history-soyo-cabinda-1700-1900.c11",
      "history.history-soyo-cabinda-1700-1900.c12"
    ],
    "sourcePins": [
      {
        "sourceId": "cabindaThesisRemoteBitstream",
        "url": "https://repositorio.iscte-iul.pt/bitstreams/f72d7f7a-9b4e-4649-9781-2ffe776a6220/download",
        "title": "José Marcos Mavungo, Estratégia e Impacto do III Fomento...Plano CALABUBE",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/cabindaThesisRemoteBitstream.body",
        "bodySha256": "419a405e898a71e549f6e65a2b9a7c3aa7476724a1c27c018d6ad58308c732f8",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "José Marcos Mavungo, Estratégia e Impacto do III Fomento...Plano CALABUBE",
        "publicationOrDocumentDate": "ISCTE masters dissertation October2019",
        "languageMediationAndLimits": "Portuguese historical dissertation with scanned treaty reprint; original1885not collated; annex omits nominal signature roster",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "PDF124–126/printed116–118,1Feb1885preamble/Arts1–3,9–11;22Janpetition separate",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/cabindaThesisRemoteBitstream.txt",
        "extractedTextSha256": "2fefb8916dfa7196aa0aeaf4b4d4b05a62595bc6c50601049ffdb60eefe5c8ba",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  },
  {
    "id": "governorLanding",
    "text": "Separate footnotes in Mavungo identify the occupying expedition and first Congo governor João de Brissac Neves Ferreira landing on 14 July 1887, distinct from the earlier treaty prescriptions.",
    "requiredContext": "PDF 61 fn 39/PDF 65 fn 53 attribution, not original operation decree. Impossible 32 May 1887 typo explicitly excluded. No conclusion on current territorial title.",
    "fieldAddresses": [],
    "claims": [
      "history.history-soyo-cabinda-1700-1900.c13",
      "history.history-soyo-cabinda-1700-1900.c14",
      "history.history-soyo-cabinda-1700-1900.c15",
      "history.history-soyo-cabinda-1700-1900.c16"
    ],
    "sourcePins": [
      {
        "sourceId": "cabindaThesisRemoteBitstream",
        "url": "https://repositorio.iscte-iul.pt/bitstreams/f72d7f7a-9b4e-4649-9781-2ffe776a6220/download",
        "title": "José Marcos Mavungo, Estratégia e Impacto do III Fomento...Plano CALABUBE",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/cabindaThesisRemoteBitstream.body",
        "bodySha256": "419a405e898a71e549f6e65a2b9a7c3aa7476724a1c27c018d6ad58308c732f8",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "José Marcos Mavungo, Estratégia e Impacto do III Fomento...Plano CALABUBE",
        "publicationOrDocumentDate": "ISCTE masters dissertation October2019",
        "languageMediationAndLimits": "Portuguese historical dissertation with scanned treaty reprint; original1885not collated; annex omits nominal signature roster",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "PDF61fn39/PDF65fn53,14July1887landing;32Maytypo excluded",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/cabindaThesisRemoteBitstream.txt",
        "extractedTextSha256": "2fefb8916dfa7196aa0aeaf4b4d4b05a62595bc6c50601049ffdb60eefe5c8ba",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "soyoInstitutions",
    "text": "1785 Soyo Mani Soyo Missionary ties Kongo mediation Sapede scholarship Working English Original bishop letter uncollated Not simple autonomy label",
    "claim": "history.history-soyo-cabinda-1700-1900.c3",
    "countedWords": 21,
    "whitespaceTokens": 22
  },
  {
    "id": "ngoyoIntermediaries",
    "text": "1757 Ngoyo Prince Classe French agreement 1783 Mambuku Commercial/political brokerage Araujo scholarship Originals uncollated Not Soyo office or universal representation",
    "claim": "history.history-soyo-cabinda-1700-1900.c7",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "cabindaProtection",
    "text": "1885 Cabinda Portugal authorizes Capelo Princes Governors Chiefs Successors Protection Customs Paid land Subsequent approval Mavungo reprint Roster cropped Originals uncollated Not universal consent",
    "claim": "history.history-soyo-cabinda-1700-1900.c11",
    "countedWords": 25,
    "whitespaceTokens": 26
  },
  {
    "id": "governorLanding",
    "text": "1887-07-14 Cabinda Occupying expedition Governor Neves Ferreira Landing Mavungo thesis Working English Originals uncollated Separate from 1885 terms No present title",
    "claim": "history.history-soyo-cabinda-1700-1900.c15",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Soyo Missionary ties Ngoyo Intermediaries 1885 Capelo/contracting chiefs Protection/customs/land Reprint Roster absent 1887 Governor landing Scholarship Working English Originals uncollated Prescription ≠ operation",
    "claim": "history.history-soyo-cabinda-1700-1900.c17",
    "countedWords": 22,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "soyoInstitutions",
  "ngoyoIntermediaries",
  "cabindaProtection",
  "governorLanding"
];
export const ATTACHMENTS = {
  "soyoInstitutions": [
    "soyoInstitutions"
  ],
  "ngoyoIntermediaries": [
    "ngoyoIntermediaries"
  ],
  "cabindaProtection": [
    "cabindaProtection"
  ],
  "governorLanding": [
    "governorLanding"
  ]
};
export const PREDICTION = {
  "question": "Does a Portuguese protection agreement erase Soyo/Ngoyo institutions or itself prove actual administration?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Sapede and Araujo describe distinct Soyo and Ngoyo institutions and intermediaries. Mavungo’s reprint separately names Capelo and contracting local roles in the 1885 protection, customs and land terms; its individual signature roster is cropped. The thesis’s later governor-landing account is an attributed operation, not identical to treaty prescription. Neither the terms nor that landing erase local institutions, establish universal consent or settle present territorial title. Originals remain uncollated.";
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
