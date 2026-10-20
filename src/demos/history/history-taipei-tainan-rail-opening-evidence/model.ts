export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;languageMediationAndLimits?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "northernOpenings",
    "text": "The official railway table distinguishes construction from opening, including Keelung–Taipei in 1891 and Taipei–Hsinchu in 1893.",
    "requiredContext": "Official retrospective table 3; original construction and operating documents not collated. Source-specificQing/Japanesecolonialperiodactor wording mustremain attributed, notmodernsovereigntyanswer.",
    "fieldAddresses": [],
    "claims": [
      "history.history-taipei-tainan-rail-opening-evidence.c1",
      "history.history-taipei-tainan-rail-opening-evidence.c2",
      "history.history-taipei-tainan-rail-opening-evidence.c3",
      "history.history-taipei-tainan-rail-opening-evidence.c4"
    ],
    "sourcePins": [
      {
        "sourceId": "taiwanRail",
        "url": "https://www.railway.gov.tw/tra-tip-web/adr/about-1-5",
        "title": "Taiwan Railway Corporation, railway construction overview",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/taiwanRail.body",
        "bodySha256": "f5c177287debb98e4462897ed9b9bcedeb06a6a3b1d2306726ab8b22c868e4a2",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Taiwan Railway Corporation, railway construction overview",
        "publicationOrDocumentDate": "Official retrospective table; page date unstated",
        "languageMediationAndLimits": "Chinese site; table distinguishes construction/operation and namedsegments; no sovereignty answerkey",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "table3rows1–2,constructionversusopening1891/1893",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/taiwanRail.txt",
        "extractedTextSha256": "cee94849148caba98f09c4f9add80248bcd1847dbdfc24ac2d0dd5b3906a90b0",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  },
  {
    "id": "southernPostalService",
    "text": "Taiwan Historica’s custodial catalogue describes a Tainan–Dagou railway postal timetable ordered on 22 November 1900 and effective on 29 November.",
    "requiredContext": "Catalogue record; original gazette page not inspected, and precise departure times not selected. Localpostalroute≠directTaipei–Tainan before 1908; historicDagou orientationneedsactualsourceifexpanded.",
    "fieldAddresses": [],
    "claims": [
      "history.history-taipei-tainan-rail-opening-evidence.c5",
      "history.history-taipei-tainan-rail-opening-evidence.c6",
      "history.history-taipei-tainan-rail-opening-evidence.c7",
      "history.history-taipei-tainan-rail-opening-evidence.c8"
    ],
    "sourcePins": [
      {
        "sourceId": "tainanPostal",
        "url": "https://catalog.digitalarchives.tw/item/00/48/9a/a1.html",
        "title": "Academia Sinica Digital Archives union catalogue / Taiwan Historica originalcustodian",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/tainanPostal.body",
        "bodySha256": "da8e6b639e67fd490c474d54b190cb3bdca51a52c97667cda07a7fbe44ed35b4",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Academia Sinica Digital Archives union catalogue / Taiwan Historica originalcustodian",
        "publicationOrDocumentDate": "GovernorGeneralGazette order22Nov1900, effective29Nov1900",
        "languageMediationAndLimits": "Chinese custodial catalogue describes postal railway timetable; fulloriginaltimetable not inspected",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "itemtitle臺南打狗間鐵道二等郵便線路郵便發著時刻; description/startdate",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/tainanPostal.txt",
        "extractedTextSha256": "2fde6357fb630d30694e257d1df58b79ed332e75893b40fa71bbe5a498021324",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  },
  {
    "id": "laterNetwork",
    "text": "The railway table and Tainan account separately identify western network completion and a 1908 opening ceremony, later than the two local services.",
    "requiredContext": "1908 network/24 Octceremony distinctfromactualtrain-by-trainservice; noall-residentconsent/cross-straitterritorialinference. Bothsourceinstitutionsmustbecredited.",
    "fieldAddresses": [],
    "claims": [
      "history.history-taipei-tainan-rail-opening-evidence.c9",
      "history.history-taipei-tainan-rail-opening-evidence.c10",
      "history.history-taipei-tainan-rail-opening-evidence.c11",
      "history.history-taipei-tainan-rail-opening-evidence.c12",
      "history.history-taipei-tainan-rail-opening-evidence.c13"
    ],
    "sourcePins": [
      {
        "sourceId": "taiwanRail",
        "url": "https://www.railway.gov.tw/tra-tip-web/adr/about-1-5",
        "title": "Taiwan Railway Corporation, railway construction overview",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/taiwanRail.body",
        "bodySha256": "f5c177287debb98e4462897ed9b9bcedeb06a6a3b1d2306726ab8b22c868e4a2",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "Taiwan Railway Corporation, railway construction overview",
        "publicationOrDocumentDate": "Official retrospective table; page date unstated",
        "languageMediationAndLimits": "Chinese site; table distinguishes construction/operation and namedsegments; no sovereignty answerkey",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "table3rows4–6,1908westernnetwork",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/taiwanRail.txt",
        "extractedTextSha256": "cee94849148caba98f09c4f9add80248bcd1847dbdfc24ac2d0dd5b3906a90b0",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      },
      {
        "sourceId": "railTainan",
        "url": "https://www.archives.gov.tw/tw/arctw/69-2011.html",
        "title": "National Archives Administration Taiwan, railway route map article",
        "bodyPath": "/private/tmp/history-special-twelve-source-bodies/railTainan.body",
        "bodySha256": "4408691ec6cea7a0f4410bf91548528f8add8bd208444e1fab98983ab25dc0d2",
        "representation": "Actual system-curl verified response bytes; PDF/HTML as recorded in acquisition",
        "makerCustodianEditor": "National Archives Administration Taiwan, railway route map article",
        "publicationOrDocumentDate": "Institutional archival essay2018approximately; displayeddate must be ownerchecked",
        "languageMediationAndLimits": "Chinese retrospective anchored to historic route archive; no maps/images copied",
        "sourceLevel": "institutional/scholarly account or expressly identified reprint",
        "locator": "paragraph1908trunklineopening/24Octceremony; source objects and captions",
        "transport": "system curl certificate verification enabled; no insecure override",
        "extractedTextPath": "/Users/hani/Documents/ChatGPT/system3-company/company/research/history-special-twelve/railTainan.txt",
        "extractedTextSha256": "e0e849eee530073c276e6f07dd7f551768ba00ac3c08b8dbe454d66563aef2f1",
        "terms": "No item-specific reuse grant established; research retention only, minimal own-English facts require independent source-use review; no text/media reproduction permission inferred."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "northernOpenings",
    "text": "1891 Keelung–Taipei 1893 Taipei–Hsinchu Openings Railway table Construction distinct Working English Originals uncollated Qing construction Not through Tainan service",
    "claim": "history.history-taipei-tainan-rail-opening-evidence.c3",
    "countedWords": 19,
    "whitespaceTokens": 21
  },
  {
    "id": "southernPostalService",
    "text": "1900-11-22 Tainan–Dagou Postal timetable order 1900-11-29 Effective Historica catalogue Japanese colonial administration Original gazette uncollated No departure times or Taipei through service",
    "claim": "history.history-taipei-tainan-rail-opening-evidence.c7",
    "countedWords": 22,
    "whitespaceTokens": 24
  },
  {
    "id": "laterNetwork",
    "text": "1908 Western network Opening ceremony Railway/Tainan retrospectives Working English Original operating records uncollated Later connection Not 1900 through service or sovereignty",
    "claim": "history.history-taipei-tainan-rail-opening-evidence.c11",
    "countedWords": 21,
    "whitespaceTokens": 23
  },
  {
    "id": "comparison",
    "text": "Taipei area 1891/1893 Openings Tainan–Dagou 1900 Postal order/service 1908 Network Railway/Historica retrospectives Colonial administration Originals uncollated Separate acts Not early through service or cross-strait sovereignty",
    "claim": "history.history-taipei-tainan-rail-opening-evidence.c14",
    "countedWords": 24,
    "whitespaceTokens": 27
  }
];
export const REQUIRED = [
  "northernOpenings",
  "southernPostalService",
  "laterNetwork"
];
export const ATTACHMENTS = {
  "northernOpenings": [
    "northernOpenings"
  ],
  "southernPostalService": [
    "southernPostalService"
  ],
  "laterNetwork": [
    "laterNetwork"
  ]
};
export const PREDICTION = {
  "question": "Does an early railway segment or postal timetable establish a direct Taipei–Tainan service or cross-strait sovereignty?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "The railway table’s northern openings, the catalogue’s southern postal-service order and the later network account describe different places and acts. The 1900 catalogue does not supply original departure times or a direct Taipei–Tainan service before the later connection. Retain colonial-administration attribution and distinguish construction from opening and operation. Infrastructure connectivity is not a cross-strait sovereignty answer or proof of general consent; original operating records remain uncollated.";
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
