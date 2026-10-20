export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "thanglongCourt",
    "text": "The heritage centre describes Le Loi’s 1428 Dong Kinh court/council and the later Le throne sharing Trinh power in 1592.",
    "requiredContext": "Exclude typographic 1965/1967 rather than silently correcting them, and post 1700 events 1749/1782–83. Original chronicles uncollated; modern Hanoi orientation.",
    "fieldAddresses": [],
    "claims": [
      "history.history-hanoi-hue-1400-1700.c1",
      "history.history-hanoi-hue-1400-1700.c2",
      "history.history-hanoi-hue-1400-1700.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "thanglongLe",
        "url": "https://hoangthanhthanglong.vn/hoang-thanh-dong-kinh-thoi-le/",
        "bodyPath": "/tmp/history-next15d-source-bodies/thanglongLe.web.txt",
        "bodySha256": "7638e25ae982aa3ef4319310ebc2beb5cf52514c092e739c8389df091c39660b",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Thang Long–Hanoi Heritage Conservation Center institutional history",
        "publicationOrDocumentDate": "2010-01-16",
        "languageMediation": "Vietnamese institutional/scholarly account; brief English paraphrase; not independently reviewed; cited chronicles not collated; the page prints 1465/1467 as 1965/1967; those entries are excluded rather than silently corrected",
        "locator": "Le L 63–72;Trinh L 62–63",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "thanglongTrinh",
        "url": "https://hoangthanhthanglong.vn/chua-trinh-tai-thiet-thanh-dai-la/",
        "bodyPath": "/tmp/history-next15d-source-bodies/thanglongTrinh.web.txt",
        "bodySha256": "01c5564fb392b2489c964962ead2a8d14788e8acc022526d2d2b83e11ca2703d",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Thang Long–Hanoi Heritage Conservation Center institutional history",
        "publicationOrDocumentDate": "2010-01-18",
        "languageMediation": "Vietnamese institutional/scholarly account; brief English paraphrase; not independently reviewed; cited chronicles not collated;1749/1782–83 material outside the 1700 endpoint excluded",
        "locator": "Le L 63–72;Trinh L 62–63",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "phuxuanResidence",
    "text": "Hue University’s study places Nguyen Phuc Thai’s principal residence at Phu Xuan from 1687; selected interval ends 1700.",
    "requiredContext": "Actual Hue PDF 1/printed 93 visually inspected. Source 1687–1712 selected only through 1700. Phu Xuan site, not 1802 national capital; parish perspective not all residents.",
    "fieldAddresses": [],
    "claims": [
      "history.history-hanoi-hue-1400-1700.c4",
      "history.history-hanoi-hue-1400-1700.c5",
      "history.history-hanoi-hue-1400-1700.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "hueStudyRaw",
        "url": "https://jos.hueuni.edu.vn/index.php/hujos-ssh/article/download/5533/924/17776",
        "bodyPath": "/tmp/history-next15d-source-bodies/hueStudy.pdf",
        "bodySha256": "3f09362c444ec7853188840fa65a9d22bf75cbdc76402ee1d678c9e0632e5284",
        "representation": "rawPDFbytes",
        "transport": "systemcurl verification enabled; no bypass",
        "makerCustodianEditor": "Phạm Đăng Nhật Thái and Trần Thành Nhân; Hue University Journal of Science 129(6A), pp. 93–105; DOI 10.26459/hueuni-jssh.v129i6A.5533",
        "publicationOrDocumentDate": "2020",
        "languageMediation": "Vietnamese institutional/scholarly account; brief English paraphrase; not independently reviewed; cited chronicles not collated;PDF1/printed93 visuallyinspected, actualrawPDF andextractedtext acquired",
        "locator": "PDF 1/printed 93 abstractandintroduction;Parish L 34",
        "extractedTextPath": "/tmp/history-next15d-source-bodies/hueStudy.txt",
        "extractedTextSha256": "5693793d1786db5aa74e3c5341f94d8006d9e7e6924ad9ec7aa77db89d99413e"
      },
      {
        "sourceId": "hueParish",
        "url": "https://tonggiaophanhue.org/tgp-hue/hat-huong-quang-phong/luoc-su-giao-so-phu-xuan/",
        "bodyPath": "/tmp/history-next15d-source-bodies/hueParish.web.txt",
        "bodySha256": "e1625d35bf8b3a0f11995155792284bcfab7c4545dd31174ea650bac29899aa4",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Archdiocese of Hue parish historical account",
        "publicationOrDocumentDate": "2019context;pagepublicationdate seebody",
        "languageMediation": "Vietnamese institutional/scholarly account; brief English paraphrase; not independently reviewed; cited chronicles not collated;Catholic institutional perspective, not the voice of all residents",
        "locator": "PDF 1/printed 93 abstractandintroduction;Parish L 34",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "sharedVersusResidence",
    "text": "A Le/Trinh shared court at Thang Long differed from the Nguyen principal residence at Phu Xuan; neither establishes identical reach or complete independence.",
    "requiredContext": "No geographic reach map, shifted site or complete independence inferred from separate residences. Nominal Le authority is not identical administrative operation. Originals uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-hanoi-hue-1400-1700.c7",
      "history.history-hanoi-hue-1400-1700.c8",
      "history.history-hanoi-hue-1400-1700.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "thanglongTrinh",
        "url": "https://hoangthanhthanglong.vn/chua-trinh-tai-thiet-thanh-dai-la/",
        "bodyPath": "/tmp/history-next15d-source-bodies/thanglongTrinh.web.txt",
        "bodySha256": "01c5564fb392b2489c964962ead2a8d14788e8acc022526d2d2b83e11ca2703d",
        "representation": "official web-tool normalized response text; not raw HTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "Thang Long–Hanoi Heritage Conservation Center institutional history",
        "publicationOrDocumentDate": "2010-01-18",
        "languageMediation": "Vietnamese institutional/scholarly account; brief English paraphrase; not independently reviewed; cited chronicles not collated;1749/1782–83 material outside the 1700 endpoint excluded",
        "locator": "Trinh L 62–63;Hue PDF 1/printed 93",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "hueStudyRaw",
        "url": "https://jos.hueuni.edu.vn/index.php/hujos-ssh/article/download/5533/924/17776",
        "bodyPath": "/tmp/history-next15d-source-bodies/hueStudy.pdf",
        "bodySha256": "3f09362c444ec7853188840fa65a9d22bf75cbdc76402ee1d678c9e0632e5284",
        "representation": "rawPDFbytes",
        "transport": "systemcurl verification enabled; no bypass",
        "makerCustodianEditor": "Phạm Đăng Nhật Thái and Trần Thành Nhân; Hue University Journal of Science 129(6A), pp. 93–105; DOI 10.26459/hueuni-jssh.v129i6A.5533",
        "publicationOrDocumentDate": "2020",
        "languageMediation": "Vietnamese institutional/scholarly account; brief English paraphrase; not independently reviewed; cited chronicles not collated;PDF1/printed93 visuallyinspected, actualrawPDF andextractedtext acquired",
        "locator": "Trinh L 62–63;Hue PDF 1/printed 93",
        "extractedTextPath": "/tmp/history-next15d-source-bodies/hueStudy.txt",
        "extractedTextSha256": "5693793d1786db5aa74e3c5341f94d8006d9e7e6924ad9ec7aa77db89d99413e"
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "thanglongCourt",
    "text": "1428 Dong Kinh Le Loi Court council 1592 Le throne Trinh shared power Heritage retrospectives Working English Originals uncollated Modern Hanoi orientation",
    "claim": "history.history-hanoi-hue-1400-1700.c3",
    "countedWords": 22,
    "whitespaceTokens": 24
  },
  {
    "id": "phuxuanResidence",
    "text": "1687–1700 Phu Xuan Nguyen Phuc Thai Principal residence Selected interval Hue University 2020/Parish retrospectives Working English Originals uncollated Modern Hue orientation Not 1802 capital",
    "claim": "history.history-hanoi-hue-1400-1700.c6",
    "countedWords": 24,
    "whitespaceTokens": 26
  },
  {
    "id": "sharedVersusResidence",
    "text": "Thang Long Le/Trinh shared court Phu Xuan Nguyen residence Heritage/Hue University accounts Working English Original chronicles uncollated Presence ≠ uniform reach or complete independence",
    "claim": "history.history-hanoi-hue-1400-1700.c9",
    "countedWords": 25,
    "whitespaceTokens": 26
  },
  {
    "id": "comparison",
    "text": "Dong Kinh Le/Trinh shared court Phu Xuan Nguyen Phuc Thai residence 1687–1700 Heritage/study Working English Originals uncollated Modern Hanoi/Hue Not 1802 capital Presence ≠ uniform reach",
    "claim": "history.history-hanoi-hue-1400-1700.c10",
    "countedWords": 25,
    "whitespaceTokens": 28
  }
];
export const REQUIRED = [
  "thanglongCourt",
  "phuxuanResidence",
  "sharedVersusResidence"
];
export const ATTACHMENTS = {
  "thanglongCourt": [
    "thanglongCourt"
  ],
  "phuxuanResidence": [
    "phuxuanResidence"
  ],
  "sharedVersusResidence": [
    "sharedVersusResidence"
  ]
};
export const PREDICTION = {
  "question": "Does a dynasty name establish identical court presence and administrative reach at both sites?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "The heritage accounts distinguish a Le court and later shared Trinh power at Thang Long. Hue University’s study places Nguyen Phuc Thai’s principal residence at Phu Xuan from 1687, selected here only through 1700. These are distinct court institutions. Modern Hanoi and Hue orient the sites; neither residence nor dynasty name establishes uniform administrative reach, complete independence or the later 1802 capital.";
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
