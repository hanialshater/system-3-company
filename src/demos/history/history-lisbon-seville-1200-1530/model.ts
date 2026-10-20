export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "lisbonConfirmation",
    "text": "Lisbon’s municipal archive identifies Afonso II’s November 1217 confirmation of the city’s earlier foral, a specific royal-to-city legal relation within the interval.",
    "requiredContext": "The actual catalogue dates confirmation November 1217; a guide elsewhere uses 1214. The 1179 grant is antecedent, not a newly inspected charter clause.",
    "fieldAddresses": [],
    "claims": [
      "history.history-lisbon-seville-1200-1530.c1",
      "history.history-lisbon-seville-1200-1530.c2",
      "history.history-lisbon-seville-1200-1530.c3",
      "history.history-lisbon-seville-1200-1530.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "lisbon",
        "url": "https://arquivomunicipal3.cm-lisboa.pt/x-arqweb/Result.aspx?id=420&type=PCD",
        "bodyPath": "/tmp/history-next15e-source-bodies/lisbon.web.txt",
        "bodySha256": "2795a1991d5b198feee624a7238915875fc0744d4a030832d1bfe8adb95d3c8b",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Arquivo Municipal de Lisboa; historical instrument maker Afonso II",
        "publicationOrDocumentDate": "Record date 1217-11-?; catalogue publication not established",
        "sourceLevel": "Institutional archival description of specific instrument, PT/AMLSB/CMLSBAH/CHR/005/001/0001",
        "languageMediationAndLimits": "Custodial catalogue content supports royal confirmation only; Latin original and particular franchise clauses not inspected. Archive guide elsewhere uses 1214; dates not silently reconciled.",
        "locator": "catalogue web L18–20, PT/AMLSB/CMLSBAH/CHR/005/001/0001",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/lisbon.web.json",
        "rawToolResponseSha256": "8d6ecc58f96e6b8aabcc2b72b90e24db6b10e996036b045de2cf64c1b5966587",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "sevilleGrants",
    "text": "Seville’s archive exhibition identifies Alfonso X’s 6 December 1253 confirmation of the Toledo fuero and territorial grant, plus the grant of two annual fairs in March 1254.",
    "requiredContext": "Institutional captions identify distinct instruments of 6 December 1253 and March 1254. Document images/full clauses are not independently collated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-lisbon-seville-1200-1530.c5",
      "history.history-lisbon-seville-1200-1530.c6",
      "history.history-lisbon-seville-1200-1530.c7",
      "history.history-lisbon-seville-1200-1530.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "sevilleArchive",
        "url": "https://www.sevilla.org/no8do-digital/expo-no8do/alfonso-x-y-sevilla/alfonso-x-1-parte/galeria-fotografica-alfonso-x-y-sevilla",
        "bodyPath": "/tmp/history-next15e-source-bodies/sevilleArchive.web.txt",
        "bodySha256": "6086d92b9f55fe8da761e1e256ec0b74e5ef1bf3cfa39b2ca1a474ab790a8021",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Ayuntamiento de Sevilla / municipal archive exhibition; instruments Alfonso X",
        "publicationOrDocumentDate": "Instruments 1253-12-06, 1254-03-18, 1254-03-22; online publication not stated",
        "sourceLevel": "Institutional exhibition descriptions of identified royal instruments",
        "languageMediationAndLimits": "Actual institutional catalogue captions; document images and full original clauses uncollated. Grant of water supply obligation is limited to named mills and recipients.",
        "locator": "captions for 1253-12-06 and 1254-03-18",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/sevilleArchive.web.json",
        "rawToolResponseSha256": "2408af2dcd48106ecee68ba9534577c77f1a784af1ca2e89a963bc9d67004dde",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "waterDuty",
    "text": "A separate 22 March 1254 Seville grant ties mills at Alcalá de Guadaíra to supplying water to the Alcázar and two fountains; this concrete obligation cannot be borrowed into Lisbon’s confirmed charter.",
    "requiredContext": "22 March 1254 grant concerns named mills at Alcala de Guadaira and named recipients; do not import this obligation into Lisbon or infer all municipal franchises.",
    "fieldAddresses": [],
    "claims": [
      "history.history-lisbon-seville-1200-1530.c9",
      "history.history-lisbon-seville-1200-1530.c10",
      "history.history-lisbon-seville-1200-1530.c11",
      "history.history-lisbon-seville-1200-1530.c12",
      "history.history-lisbon-seville-1200-1530.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "sevilleArchive",
        "url": "https://www.sevilla.org/no8do-digital/expo-no8do/alfonso-x-y-sevilla/alfonso-x-1-parte/galeria-fotografica-alfonso-x-y-sevilla",
        "bodyPath": "/tmp/history-next15e-source-bodies/sevilleArchive.web.txt",
        "bodySha256": "6086d92b9f55fe8da761e1e256ec0b74e5ef1bf3cfa39b2ca1a474ab790a8021",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Ayuntamiento de Sevilla / municipal archive exhibition; instruments Alfonso X",
        "publicationOrDocumentDate": "Instruments 1253-12-06, 1254-03-18, 1254-03-22; online publication not stated",
        "sourceLevel": "Institutional exhibition descriptions of identified royal instruments",
        "languageMediationAndLimits": "Actual institutional catalogue captions; document images and full original clauses uncollated. Grant of water supply obligation is limited to named mills and recipients.",
        "locator": "caption for 1254-03-22",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/sevilleArchive.web.json",
        "rawToolResponseSha256": "2408af2dcd48106ecee68ba9534577c77f1a784af1ca2e89a963bc9d67004dde",
        "originPdfPath": null,
        "originPdfSha256": null
      },
      {
        "sourceId": "lisbon",
        "url": "https://arquivomunicipal3.cm-lisboa.pt/x-arqweb/Result.aspx?id=420&type=PCD",
        "bodyPath": "/tmp/history-next15e-source-bodies/lisbon.web.txt",
        "bodySha256": "2795a1991d5b198feee624a7238915875fc0744d4a030832d1bfe8adb95d3c8b",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Arquivo Municipal de Lisboa; historical instrument maker Afonso II",
        "publicationOrDocumentDate": "Record date 1217-11-?; catalogue publication not established",
        "sourceLevel": "Institutional archival description of specific instrument, PT/AMLSB/CMLSBAH/CHR/005/001/0001",
        "languageMediationAndLimits": "Custodial catalogue content supports royal confirmation only; Latin original and particular franchise clauses not inspected. Archive guide elsewhere uses 1214; dates not silently reconciled.",
        "locator": "web L18–20",
        "rawToolResponsePath": "/tmp/history-next15e-source-bodies/lisbon.web.json",
        "rawToolResponseSha256": "8d6ecc58f96e6b8aabcc2b72b90e24db6b10e996036b045de2cf64c1b5966587",
        "originPdfPath": null,
        "originPdfSha256": null
      }
    ]
  },
  {
    "id": "expansionAndTransition",
    "text": "Torres and Loureiro’s 2015 documentary edition identifies Lisbon men recruited for the Ceuta fleet on 8 July 1415 and grain/legume tax relief on 6 December because fleet preparations depleted Lisbon. The Spanish Army Museum separately dates Fernando III’s Seville siege from August 1247 to 23 November 1248. These are expansion logistics and conquest, not the dates of charter confirmation.",
    "requiredContext": "The 1415 fleet event concerns Portuguese expansion via Lisbon, not Lisbon’s conquest. Original dated manuscripts remain uncollated; the Portuguese edition and Spanish military museum retrospective are mediated. Siege and tax relief are distinct acts, not popular consent. Lisbon 1147 is not selected; no out-of-period conquest or unbroken expansion inferred.",
    "fieldAddresses": [],
    "claims": [
      "history.history-lisbon-seville-1200-1530.c14",
      "history.history-lisbon-seville-1200-1530.c15",
      "history.history-lisbon-seville-1200-1530.c16",
      "history.history-lisbon-seville-1200-1530.c17",
      "history.history-lisbon-seville-1200-1530.c18"
    ],
    "sourcePins": [
      {
        "sourceId": "lisbonCeutaDocuments",
        "url": "https://scielo.pt/scielo.php?pid=S2183-31762015000200011&script=sci_arttext",
        "title": "Joana Torres and Sara Loureiro, Ceuta no Arquivo Municipal de Lisboa",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/lisbonCeutaDocuments.body",
        "bodySha256": "66210b7146eba21a4f86f0476ef5475e1244bb9cf9bbcccaa47a7c7ba8873f89",
        "representation": "Actual system-curl response bytes; HTML",
        "makerCustodianEditor": "Joana Torres and Sara Loureiro, Ceuta no Arquivo Municipal de Lisboa",
        "publicationOrDocumentDate": "Cadernos do Arquivo Municipal second series 4, December 2015, DOCUMENTA; SciELOmirror",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "languageMediationAndLimits": "Portuguese archival edition with dated transcriptions/cotas; brief English paraphrase, original manuscripts not collated",
        "locator": "items2and3:8July1415 Livro dos Pregosdoc305f216v;6Dec1415 Livro1provimentopão doc5",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/lisbonCeutaDocuments.txt",
        "extractedTextSha256": "60872c14fb1d46eba9b887b0cc9ce445491880b784a4ba2f259aa861ca416f55",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      },
      {
        "sourceId": "sevilleMuseum",
        "url": "https://ejercito.defensa.gob.es/museo/HECHOS_HISTORICOS/HECHOS_HISTORICOS/11.23_noviembre_FERNANDO_III_EL_SANTO_CONQUISTA_SEVILLA.html",
        "title": "Spanish Ministry of Defence, Museo del Ejército,23November historical item",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/sevilleMuseum.body",
        "bodySha256": "6070c5e8f20a3d7407bb5c6ff59b0baeca14774f252f001122adc2c1c4c48143",
        "representation": "Actual system-curl response bytes; HTML",
        "makerCustodianEditor": "Spanish Ministry of Defence, Museo del Ejército,23November historical item",
        "publicationOrDocumentDate": "Institutional retrospective; date of page not established",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "languageMediationAndLimits": "Spanish military museum narrative; coercive siege/Christian army terminology attributed",
        "locator": "paragraphs siegeAugust1247–23Nov1248,FernandoIII and inhabitantsdepartures",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/sevilleMuseum.txt",
        "extractedTextSha256": "448cef373e347a6a328a3d24303218eae492369c25ebe653952c5764b9c45b23",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "lisbonConfirmation",
    "text": "1217 Lisbon Afonso II Confirms earlier foral Municipal catalogue Latin uncollated 1214/1217 discrepancy Unresolved Specific franchise clauses uninspected",
    "claim": "history.history-lisbon-seville-1200-1530.c3",
    "countedWords": 18,
    "whitespaceTokens": 20
  },
  {
    "id": "sevilleGrants",
    "text": "1253 Seville Alfonso X Toledo fuero Territory grant 1254 Two annual fairs Archive exhibition Originals uncollated Not universal municipal rights",
    "claim": "history.history-lisbon-seville-1200-1530.c7",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "waterDuty",
    "text": "1254 Seville Granted mills Supply Alcazar/two fountains Specific obligation Archive exhibition Originals uncollated Not Lisbon’s charter condition or all water rights",
    "claim": "history.history-lisbon-seville-1200-1530.c11",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "expansionAndTransition",
    "text": "1415 Lisbon Ceuta fleet Recruitment Tax relief 1248 Seville Siege Fernando III Edition/Museum Working English Originals uncollated Different transitions Not confirmations",
    "claim": "history.history-lisbon-seville-1200-1530.c16",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Lisbon 1214/1217 Confirmation unresolved 1415 Ceuta fleet Seville 1248 Siege 1254 Mills→water Catalogue/edition/Museum Working English Originals uncollated Different grants/expansion Not uniform rights",
    "claim": "history.history-lisbon-seville-1200-1530.c19",
    "countedWords": 20,
    "whitespaceTokens": 24
  }
];
export const REQUIRED = [
  "lisbonConfirmation",
  "sevilleGrants",
  "waterDuty",
  "expansionAndTransition"
];
export const ATTACHMENTS = {
  "lisbonConfirmation": [
    "lisbonConfirmation"
  ],
  "sevilleGrants": [
    "sevilleGrants"
  ],
  "waterDuty": [
    "waterDuty"
  ],
  "expansionAndTransition": [
    "expansionAndTransition"
  ]
};
export const PREDICTION = {
  "question": "Does a royal charter confirmation assign both cities the same privileges and water duties?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Lisbon’s catalogue identifies Afonso II’s confirmation of an earlier foral; its date differs from a separate archive guide. Seville’s exhibition identifies later confirmations, fairs and a specified mills-for-water obligation. A royal grant does not give both cities identical duties. These custodial descriptions leave original clauses uncollated and do not establish universal municipal rights. Separately, the edition links Lisbon’s 1415 fleet preparations to Ceuta and tax relief; the museum dates Seville’s siege to 1247–48. These expansion acts are not charter confirmations.";
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
