export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "guangzhouTrade",
    "text": "Shi describes Wu Tingju’s 1514 trade rule and joint Guangzhou inspections; Zhou separately describes early Qing office reorganization.",
    "requiredContext": "Shi challenges 1535 Macau bureau-relocation claim; unselected. Zhou describes later Qing changes, so no Ming 1700 label. Original chronicles uncollated; no universal trade enforcement.",
    "fieldAddresses": [],
    "claims": [
      "history.history-guangzhou-hanoi-1400-1700.c1",
      "history.history-guangzhou-hanoi-1400-1700.c2",
      "history.history-guangzhou-hanoi-1400-1700.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "guangzhouMing",
        "url": "https://www.icm.gov.mo/rc/viewer/10034/623",
        "bodyPath": "/tmp/history-next15d-source-bodies/guangzhouMing.web.txt",
        "bodySha256": "a2218f10b5a4185cbda0775737268e02ce699d8d0cd8adf00204e1df27136db3",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "施存龍(ShiCunlong);MacauCulturalInstitute,RevistadeCultura",
        "publicationOrDocumentDate": "1998Spring",
        "languageMediation": "Chinese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited original chronicles not collated; sourcechallenges1535bureau relocationandcomparesconflictingchronicles; nohistoricalmap/labelsreused",
        "locator": "Shi L 40–65,1514 rule/L 53 inspection;Zhou L 13–17",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "guangzhouQing",
        "url": "https://www.gdwsw.gov.cn/wsgdsdjy/content/post_22107.html",
        "bodyPath": "/tmp/history-next15d-source-bodies/guangzhouQing.web.txt",
        "bodySha256": "4884053dd829805ee577dab102087d5f5bc64fbaca06b7f74a5a01addc99d9ea",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "周海霞(ZhouHaixia);文史广东 institutionalhistoricalportal",
        "publicationOrDocumentDate": "2018-07-06",
        "languageMediation": "Chinese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited original chronicles not collated; regionalofficechangesnotclaimeduniversalcustomsenforcement",
        "locator": "Shi L 40–65,1514 rule/L 53 inspection;Zhou L 13–17",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "dongkinhCourt",
    "text": "Heritage accounts distinguish Ming Dong Quan occupation from Le Loi’s 1428 Dong Kinh court and later shared Le/Trinh power.",
    "requiredContext": "Dong Quan occupation, Le court and Le/Trinh shared power are distinct. Exclude typographic 1965/1967 and post 1700 material. Originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-guangzhou-hanoi-1400-1700.c4",
      "history.history-guangzhou-hanoi-1400-1700.c5",
      "history.history-guangzhou-hanoi-1400-1700.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "thanglongLe",
        "url": "https://hoangthanhthanglong.vn/hoang-thanh-dong-kinh-thoi-le/",
        "bodyPath": "/tmp/history-next15d-source-bodies/thanglongLe.web.txt",
        "bodySha256": "7638e25ae982aa3ef4319310ebc2beb5cf52514c092e739c8389df091c39660b",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "ThangLong–Hanoi HeritageConservationCenter institutionalhistory",
        "publicationOrDocumentDate": "2010-01-16",
        "languageMediation": "Vietnamese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited chronicles not collated; pageprints1465/1467as1965/1967,excluded without silentcorrection",
        "locator": "Le L 63–72;Trinh L 62–63",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "thanglongTrinh",
        "url": "https://hoangthanhthanglong.vn/chua-trinh-tai-thiet-thanh-dai-la/",
        "bodyPath": "/tmp/history-next15d-source-bodies/thanglongTrinh.web.txt",
        "bodySha256": "01c5564fb392b2489c964962ead2a8d14788e8acc022526d2d2b83e11ca2703d",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "ThangLong–Hanoi HeritageConservationCenter institutionalhistory",
        "publicationOrDocumentDate": "2010-01-18",
        "languageMediation": "Vietnamese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited chronicles not collated;1749/1782–83 material outside1700endpoint excluded",
        "locator": "Le L 63–72;Trinh L 62–63",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "inspectionVersusCouncil",
    "text": "Guangzhou’s ship-inspection offices differ from Dong Kinh’s royal council; later Qing changes prevent a Ming 1700 label or identical dynastic powers.",
    "requiredContext": "Ship inspection and royal council are different functions. No held map or dynastic uniformity; original chronicles uncollated and actual enforcement not universal.",
    "fieldAddresses": [],
    "claims": [
      "history.history-guangzhou-hanoi-1400-1700.c7",
      "history.history-guangzhou-hanoi-1400-1700.c8",
      "history.history-guangzhou-hanoi-1400-1700.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "guangzhouMing",
        "url": "https://www.icm.gov.mo/rc/viewer/10034/623",
        "bodyPath": "/tmp/history-next15d-source-bodies/guangzhouMing.web.txt",
        "bodySha256": "a2218f10b5a4185cbda0775737268e02ce699d8d0cd8adf00204e1df27136db3",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "施存龍(ShiCunlong);MacauCulturalInstitute,RevistadeCultura",
        "publicationOrDocumentDate": "1998Spring",
        "languageMediation": "Chinese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited original chronicles not collated; sourcechallenges1535bureau relocationandcomparesconflictingchronicles; nohistoricalmap/labelsreused",
        "locator": "Shi L 53,63–65;Zhou L 13–17;Le L 63–72",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "guangzhouQing",
        "url": "https://www.gdwsw.gov.cn/wsgdsdjy/content/post_22107.html",
        "bodyPath": "/tmp/history-next15d-source-bodies/guangzhouQing.web.txt",
        "bodySha256": "4884053dd829805ee577dab102087d5f5bc64fbaca06b7f74a5a01addc99d9ea",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "周海霞(ZhouHaixia);文史广东 institutionalhistoricalportal",
        "publicationOrDocumentDate": "2018-07-06",
        "languageMediation": "Chinese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited original chronicles not collated; regionalofficechangesnotclaimeduniversalcustomsenforcement",
        "locator": "Shi L 53,63–65;Zhou L 13–17;Le L 63–72",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "thanglongLe",
        "url": "https://hoangthanhthanglong.vn/hoang-thanh-dong-kinh-thoi-le/",
        "bodyPath": "/tmp/history-next15d-source-bodies/thanglongLe.web.txt",
        "bodySha256": "7638e25ae982aa3ef4319310ebc2beb5cf52514c092e739c8389df091c39660b",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "ThangLong–Hanoi HeritageConservationCenter institutionalhistory",
        "publicationOrDocumentDate": "2010-01-16",
        "languageMediation": "Vietnamese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited chronicles not collated; pageprints1465/1467as1965/1967,excluded without silentcorrection",
        "locator": "Shi L 53,63–65;Zhou L 13–17;Le L 63–72",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "guangzhouTrade",
    "text": "1514 Guangzhou WuTingju Trade rule Bureau inspections Later Qing reorganization Shi/Zhou scholarship Working English Original chronicles uncollated Not Ming 1700",
    "claim": "history.history-guangzhou-hanoi-1400-1700.c3",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "dongkinhCourt",
    "text": "1428 Dong Kinh Le Loi Court council Later Le/Trinh shared power Heritage retrospectives Working English Originals uncollated Modern Hanoi orientation Not uniform dynasty",
    "claim": "history.history-guangzhou-hanoi-1400-1700.c6",
    "countedWords": 24,
    "whitespaceTokens": 25
  },
  {
    "id": "inspectionVersusCouncil",
    "text": "Guangzhou Joint ship inspection Dong Kinh Royal council Later Qing office changes Shi/Zhou/Heritage Working English Originals uncollated Different institutions Not universal enforcement",
    "claim": "history.history-guangzhou-hanoi-1400-1700.c9",
    "countedWords": 24,
    "whitespaceTokens": 24
  },
  {
    "id": "comparison",
    "text": "Guangzhou WuTingju 1514 Trade/inspection Later Qing offices Dong Kinh Le Loi 1428 Court Later Le/Trinh Shi/Zhou/Heritage paraphrases Originals uncollated Not Ming 1700 or identical powers",
    "claim": "history.history-guangzhou-hanoi-1400-1700.c10",
    "countedWords": 24,
    "whitespaceTokens": 27
  }
];
export const REQUIRED = [
  "guangzhouTrade",
  "dongkinhCourt",
  "inspectionVersusCouncil"
];
export const ATTACHMENTS = {
  "guangzhouTrade": [
    "guangzhouTrade"
  ],
  "dongkinhCourt": [
    "dongkinhCourt"
  ],
  "inspectionVersusCouncil": [
    "inspectionVersusCouncil"
  ]
};
export const PREDICTION = {
  "question": "Does a dynastic label establish identical ship inspection and court functions?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "Shi and Zhou describe Guangzhou’s trade inspection offices and later Qing changes. The heritage accounts instead describe Dong Kinh’s court and later shared Le/Trinh power. Ship inspection and royal council are distinct functions with different transitions. Rejecting a stale khanate label does not justify another uniform dynasty label, a Ming 1700 claim or assumed universal enforcement.";
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
