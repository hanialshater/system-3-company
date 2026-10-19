export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "kalbidCourt",
    "text": "Altan describes Kalbid loyalty to Fatimid caliphs and the succession replacing Jafar with Ahmad in 1019.",
    "requiredContext": "Earlier 998 context is antecedent. Kalbid loyalty does not mean Cairo appointed every local office; Arabic originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-palermo-cairo-1000-1200.c1",
      "history.history-palermo-cairo-1000-1200.c2",
      "history.history-palermo-cairo-1000-1200.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "kalbid",
        "url": "https://islamansiklopedisi.org.tr/kelbiler",
        "bodyPath": "/tmp/history-next15d-source-bodies/kalbid.web.txt",
        "bodySha256": "dfc631569d4141b0685ea33d679959c20759ad975b0b1ef080db445641ce4663",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "İbrahim Altan;TDVİslâmAnsiklopedisi revised electronicarticle",
        "publicationOrDocumentDate": "2022",
        "languageMediation": "Turkish authored scholarly account; minimal English agent paraphrase unreviewed; cited chronicles/documents not independently collated",
        "locator": "L 100–103,Palermo Cafer 998–1019/Ahmed 1019–38",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "cairoTraining",
    "text": "Al-Hakim’s 1004 Cairo institution trained Ismaili dais for a specified political/religious purpose.",
    "requiredContext": "Training institution has a specified Ismaili political/religious purpose, not all Cairo offices or every religious voice. Original records uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-palermo-cairo-1000-1200.c4",
      "history.history-palermo-cairo-1000-1200.c5",
      "history.history-palermo-cairo-1000-1200.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "cairoFatimid",
        "url": "https://islamansiklopedisi.org.tr/kahire",
        "bodyPath": "/tmp/history-next15d-source-bodies/cairoFatimid.web.txt",
        "bodySha256": "df731215279666d894b92c28234af7b7ae2513a5155598d0eb098b1befd827a8",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Eymen Fuâd Seyyid;TDVİslâmAnsiklopedisi",
        "publicationOrDocumentDate": "2001",
        "languageMediation": "Turkish authored scholarly account; minimal English agent paraphrase unreviewed; cited chronicles/documents not independently collated",
        "locator": "Kahire L 140–141;Darülhikmefoundationparagraph 1004",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "cairoDar",
        "url": "https://islamansiklopedisi.org.tr/darulhikme",
        "bodyPath": "/tmp/history-next15d-source-bodies/cairoDar.web.txt",
        "bodySha256": "41bc3ad7e1e37c3d98b95f0f4eb6e41fbb9567315e681e535915afabb460d0ce",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Mahmut Kaya;TDVİslâmAnsiklopedisi",
        "publicationOrDocumentDate": "1993",
        "languageMediation": "Turkish authored scholarly account; minimal English agent paraphrase unreviewed; cited chronicles/documents not independently collated; datesfoundation1004,not independently adjudicated against1005chronologies",
        "locator": "Kahire L 140–141;Darülhikmefoundationparagraph 1004",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "normanRecords",
    "text": "Buresi’s review describes Norman reuse of tax records, dues to local Norman lords and later Arabic administrative adaptation.",
    "requiredContext": "Actual source is Pascal Buresi’s 2004 review, not direct reading of Johns’s 2002 book. Underlying originals uncollated; reused records do not mean unchanged Fatimid subordination.",
    "fieldAddresses": [],
    "claims": [
      "history.history-palermo-cairo-1000-1200.c7",
      "history.history-palermo-cairo-1000-1200.c8",
      "history.history-palermo-cairo-1000-1200.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "palermoDiwan",
        "url": "https://www.persee.fr/doc/bcai_0259-7373_2004_num_20_1_1009_t3_0073_0000_1",
        "bodyPath": "/tmp/history-next15d-source-bodies/palermoDiwan.web.txt",
        "bodySha256": "0689bd2875be92b1713a3276b7cc9bddb8c0e5fd5260ab0df99f80f8e52d3a17",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Pascal Buresi;Bulletincritique desAnnalesislamologiques20,pp73–74;Perséeinstitutionalcustodian",
        "publicationOrDocumentDate": "2004",
        "languageMediation": "French scholarly review of2002monograph; reviewed book not acquired, argument must stay attributed; OCRdiacritics corrupt, nosourcequotedpassagesreused",
        "locator": "Buresireview L 33–52,especially 39–46,1130–43",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "kalbidCourt",
    "text": "1019 Palermo Jafar replaced by Ahmad Kalbid succession Fatimid loyalty Altan scholarship Working English Arabic originals uncollated Loyalty ≠ every appointment",
    "claim": "history.history-palermo-cairo-1000-1200.c3",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "cairoTraining",
    "text": "1004 Cairo al-Hakim Dai training Political/religious purpose TDV scholarship Working English Original records uncollated Not Palermo local government",
    "claim": "history.history-palermo-cairo-1000-1200.c6",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "normanRecords",
    "text": "Norman Sicily Reused tax records Dues→local lords Later Arabic adaptation Buresi 2004 review of Johns Book unacquired Working English Originals uncollated",
    "claim": "history.history-palermo-cairo-1000-1200.c9",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Palermo Kalbid succession Fatimid loyalty Cairo 1004 Dai institution TDV Norman Records reused Dues→lords Buresi review Johns unacquired Working English Originals uncollated Different institutions",
    "claim": "history.history-palermo-cairo-1000-1200.c10",
    "countedWords": 25,
    "whitespaceTokens": 26
  }
];
export const REQUIRED = [
  "kalbidCourt",
  "cairoTraining",
  "normanRecords"
];
export const ATTACHMENTS = {
  "kalbidCourt": [
    "kalbidCourt"
  ],
  "cairoTraining": [
    "cairoTraining"
  ],
  "normanRecords": [
    "normanRecords"
  ]
};
export const PREDICTION = {
  "question": "Do dynastic loyalty or borrowed records establish unchanged local administration?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Altan separates Kalbid government in Sicily from Fatimid loyalty; TDV describes alHakim’s Cairo training institution. Buresi’s review attributes reused tax records and dues to Norman lords to a later administrative adaptation. Borrowed forms do not prove unchanged government or continued Fatimid subordination. The reviewed Johns book and underlying originals remain unacquired or uncollated.";
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
