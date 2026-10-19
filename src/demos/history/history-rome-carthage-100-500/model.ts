export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "romeProcedure",
    "text": "Gaius distinguishes Rome-area citizen litigation before a single judge from proceedings dependent on magisterial imperium, whose duration can end with the issuing magistrate’s office.",
    "requiredContext": "Second-century Rome and fifth-century Carthage witnesses are separately dated within 100–500, not simultaneous endpoints. Translated legal and polemical narrative sources mediated; powers are not borrowed across cities or centuries.",
    "fieldAddresses": [],
    "claims": [
      "history.history-rome-carthage-100-500.c1",
      "history.history-rome-carthage-100-500.c2",
      "history.history-rome-carthage-100-500.c3",
      "history.history-rome-carthage-100-500.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "romeGaiusSelected",
        "url": "https://droitromain.univ-grenoble-alpes.fr/Anglica/gai4_Poste.htm",
        "title": "Gaius, Institutes, Book IV",
        "bodyPath": "/tmp/history-next15f-source-bodies/romeGaiusSelected.web.txt",
        "bodySha256": "9b390d1d56c99383ccc548513e6290530591b17c049977a30d0b3ffa1ce48989",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Gaius; English translation Edward Poste; Roman Law Library, Université Grenoble Alpes",
        "publicationOrDocumentDate": "Mid-second-century composition; translation/online edition date not established",
        "sourceLevel": "Institutional edition of translated Roman legal text",
        "locator": "Book IV §§103–109",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/romeGaiusSelected.web.json",
        "rawToolResponseSha256": "3432eb947ab4e3031f615f1c812bff2767983d5853d13844ea797c598df09af5",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Exact same response bytes reused from next 15 e acquisition, not held app material. Manuscript/edition uncollated; prescriptive legal distinction only."
      }
    ]
  },
  {
    "id": "carthageDecree",
    "text": "Victor of Vita’s account places Huneric’s succession in 477 and royal regulation of religious assemblies in Carthage; he then ordered persecution of people identified as Manichaeans, including execution and sale overseas.",
    "requiredContext": "Second-century Rome and fifth-century Carthage witnesses are separately dated within 100–500, not simultaneous endpoints. Translated legal and polemical narrative sources mediated; powers are not borrowed across cities or centuries. Victor’s Nicene polemical perspective remains attributed; no religious truth or hostile victim label is endorsed.",
    "fieldAddresses": [],
    "claims": [
      "history.history-rome-carthage-100-500.c5",
      "history.history-rome-carthage-100-500.c6",
      "history.history-rome-carthage-100-500.c7",
      "history.history-rome-carthage-100-500.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "carthage",
        "url": "https://presbytersproject.ihuw.pl/index.php?SourceID=2437&id=6",
        "title": "Presbyters in the Late Antique West, ER 2437",
        "bodyPath": "/tmp/history-next15f-source-bodies/carthage.web.txt",
        "bodySha256": "0a2a0841c63671a8536b5141575b564ad1b95131b003f58a24a372682ed789f5",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Marta Szada; University of Warsaw Presbyters Project; Victor of Vita, translated John Moorhead",
        "publicationOrDocumentDate": "Record edited 2024-06-18; Victor composed ca.484–488, edition Lancel 2002, translation Moorhead 1992",
        "sourceLevel": "Scholarly database edition/translated excerpt and contextual analysis",
        "locator": "ER 2437, web L 8–28, city locator L 31–39",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/carthage.web.json",
        "rawToolResponseSha256": "b3f15f60a928534aecaa5f8fd8ca181b6b6ac86ce3d1f837c5910ad9886434b7",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Nicene polemical narrative, original manuscripts uncollated. Claims of religious truth, barbarity or all accused being heretics are not adopted; execution/enslavement are coercion."
      }
    ]
  },
  {
    "id": "differentJurisdictions",
    "text": "A Roman procedural distinction tied to jurisdiction and a magistrate’s term differs from Huneric’s later royal succession and coercive decree. Neither witness makes western political fragmentation one universal simultaneous transfer of local powers.",
    "requiredContext": "Second-century Rome and fifth-century Carthage witnesses are separately dated within 100–500, not simultaneous endpoints. Translated legal and polemical narrative sources mediated; powers are not borrowed across cities or centuries.",
    "fieldAddresses": [],
    "claims": [
      "history.history-rome-carthage-100-500.c9",
      "history.history-rome-carthage-100-500.c10",
      "history.history-rome-carthage-100-500.c11",
      "history.history-rome-carthage-100-500.c12",
      "history.history-rome-carthage-100-500.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "romeGaiusSelected",
        "url": "https://droitromain.univ-grenoble-alpes.fr/Anglica/gai4_Poste.htm",
        "title": "Gaius, Institutes, Book IV",
        "bodyPath": "/tmp/history-next15f-source-bodies/romeGaiusSelected.web.txt",
        "bodySha256": "9b390d1d56c99383ccc548513e6290530591b17c049977a30d0b3ffa1ce48989",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Gaius; English translation Edward Poste; Roman Law Library, Université Grenoble Alpes",
        "publicationOrDocumentDate": "Mid-second-century composition; translation/online edition date not established",
        "sourceLevel": "Institutional edition of translated Roman legal text",
        "locator": "Book IV §§104–109",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/romeGaiusSelected.web.json",
        "rawToolResponseSha256": "3432eb947ab4e3031f615f1c812bff2767983d5853d13844ea797c598df09af5",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Exact same response bytes reused from next 15 e acquisition, not held app material. Manuscript/edition uncollated; prescriptive legal distinction only."
      },
      {
        "sourceId": "carthage",
        "url": "https://presbytersproject.ihuw.pl/index.php?SourceID=2437&id=6",
        "title": "Presbyters in the Late Antique West, ER 2437",
        "bodyPath": "/tmp/history-next15f-source-bodies/carthage.web.txt",
        "bodySha256": "0a2a0841c63671a8536b5141575b564ad1b95131b003f58a24a372682ed789f5",
        "representation": "Trusted web-tool normalized response, not origin HTML bytes or original manuscript",
        "makerCustodianEditor": "Marta Szada; University of Warsaw Presbyters Project; Victor of Vita, translated John Moorhead",
        "publicationOrDocumentDate": "Record edited 2024-06-18; Victor composed ca.484–488, edition Lancel 2002, translation Moorhead 1992",
        "sourceLevel": "Scholarly database edition/translated excerpt and contextual analysis",
        "locator": "web L 18–29",
        "rawToolResponsePath": "/tmp/history-next15f-source-bodies/carthage.web.json",
        "rawToolResponseSha256": "b3f15f60a928534aecaa5f8fd8ca181b6b6ac86ce3d1f837c5910ad9886434b7",
        "originPdfPath": null,
        "originPdfSha256": null,
        "languageMediationAndLimits": "Nicene polemical narrative, original manuscripts uncollated. Claims of religious truth, barbarity or all accused being heretics are not adopted; execution/enslavement are coercion."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "romeProcedure",
    "text": "Rome Citizen litigation Judge Magisterial imperium Term limits Gaius/Poste translated law Originals uncollated Second century Not fifth-century Carthage powers",
    "claim": "history.history-rome-carthage-100-500.c3",
    "countedWords": 21,
    "whitespaceTokens": 21
  },
  {
    "id": "carthageDecree",
    "text": "477 Carthage Huneric Succession Religious assembly decree Persecution Execution Sale overseas Victor translated Nicene polemical account Originals uncollated Not general consent",
    "claim": "history.history-rome-carthage-100-500.c7",
    "countedWords": 22,
    "whitespaceTokens": 23
  },
  {
    "id": "differentJurisdictions",
    "text": "Rome Judicial term Carthage Royal decree Coercion Separate centuries Legal/polemical translations Originals uncollated Fragmentation ≠ simultaneous uniform authority",
    "claim": "history.history-rome-carthage-100-500.c11",
    "countedWords": 19,
    "whitespaceTokens": 20
  },
  {
    "id": "comparison",
    "text": "Rome Magisterial imperium Term limits Carthage Huneric 477 Assembly decree Persecution Execution Sale overseas Separate centuries Gaius/Victor Legal/polemical translations Originals uncollated Different authority",
    "claim": "history.history-rome-carthage-100-500.c14",
    "countedWords": 24,
    "whitespaceTokens": 25
  }
];
export const REQUIRED = [
  "romeProcedure",
  "carthageDecree",
  "differentJurisdictions"
];
export const ATTACHMENTS = {
  "romeProcedure": [
    "romeProcedure"
  ],
  "carthageDecree": [
    "carthageDecree"
  ],
  "differentJurisdictions": [
    "differentJurisdictions"
  ]
};
export const PREDICTION = {
  "question": "Do Rome’s procedural rules establish the same authority as Huneric’s later Carthage decree?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Gaius distinguishes jurisdiction and the duration of a magistrate’s authority in Roman procedure. Victor’s later account describes Huneric’s succession, regulation of Carthage assemblies and persecution, including execution and sale overseas. A procedural limit and a coercive royal decree are different powers. Separately dated, translated legal and polemical witnesses do not make western fragmentation a simultaneous transfer of identical local government.";
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
