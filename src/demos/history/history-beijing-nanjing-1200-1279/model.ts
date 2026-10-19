export interface SourcePin {url:string;makerCustodianEditor:string;locator:string;publicationOrDocumentDate:string;bodySha256:string;representation:string;languageMediation?:string;transport?:string;transportLimit?:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "beijingWorks",
    "text": "The bureau-hosted account distinguishes earlier Yanjing administration, 1264 Zhongdu naming, 1267 palace-city works and 1276 completion of the imperial city’s principal buildings.",
    "requiredContext": "Actual PDF 17/printed 11 visually inspected. Host is not established author; URL 2020 date is not publication evidence.1283 completion/royal move excluded; earlier site retained.",
    "fieldAddresses": [],
    "claims": [
      "history.history-beijing-nanjing-1200-1279.c1",
      "history.history-beijing-nanjing-1200-1279.c2",
      "history.history-beijing-nanjing-1200-1279.c3"
    ],
    "sourcePins": [
      {
        "sourceId": "beijingStudyRaw",
        "url": "https://wwj.beijing.gov.cn/bjww/resource/cms/article/bjww_362762/10845811/2020081209102378689.pdf",
        "bodyPath": "/tmp/history-next15d-source-bodies/beijingStudy.pdf",
        "bodySha256": "bbcafc474cfbe4410173d132e7ef084a49e72962c33a9745712f28fcb19cc2d8",
        "representation": "rawPDFbytes",
        "transport": "systemcurl verification enabled; no bypass",
        "makerCustodianEditor": "BeijingMunicipalCulturalHeritageBureau hosted108pagecompilation; selectedarticleauthor/editor/publicationyear not established",
        "publicationOrDocumentDate": "undatedcompilation;PDFpublicURL2020-08-12 ishostingdate,notpublicationproof",
        "languageMediation": "Chinese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited original chronicles not collated;image-onlyPDF17/printed11 actuallyvisuallyinspected; citedYuanshinotcollated; no maporlabelsused",
        "locator": "Beijing PDF 17/printed 11 rightcolumn;Tourismdualcapitalparagraph",
        "extractedTextPath": "/tmp/history-next15d-source-bodies/beijingStudy.txt",
        "extractedTextSha256": "52252f318d291ba67e7dcf0e898ee820d0abedeb665d6ab96bde5bf41ff3f18b"
      },
      {
        "sourceId": "beijingTourism",
        "url": "https://s.visitbeijing.com.cn/attraction/117825",
        "bodyPath": "/tmp/history-next15d-source-bodies/beijingTourism.web.txt",
        "bodySha256": "268055e1648c3967d076d06a64840d29a64ed5c50246246ee3d4043cd6b41990",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "BeijingTourismpublicinstitutionalportal",
        "publicationOrDocumentDate": "undated",
        "languageMediation": "Chinese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited original chronicles not collated",
        "locator": "Beijing PDF 17/printed 11 rightcolumn;Tourismdualcapitalparagraph",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "jiankangOffices",
    "text": "Official biography names Ma Guangzu’s 1255 Jiankang prefectural/military office and 1264 return; an archaeologist report describes Bayan’s 1275 palace occupation.",
    "requiredContext": "Official 2024 biography and 2011 report quoting archaeologist Wang Zhigao are mediated accounts, not original 1275 chronicle or proof of universal approval. Modern Nanjing orientation.",
    "fieldAddresses": [],
    "claims": [
      "history.history-beijing-nanjing-1200-1279.c4",
      "history.history-beijing-nanjing-1200-1279.c5",
      "history.history-beijing-nanjing-1200-1279.c6"
    ],
    "sourcePins": [
      {
        "sourceId": "nanjing1264",
        "url": "https://jw.nanjing.gov.cn/xwzx/yw/202405/t20240510_4662306.html",
        "bodyPath": "/tmp/history-next15d-source-bodies/nanjing1264.web.txt",
        "bodySha256": "0f4e0d3b646ac6c5213ac82f6efbe84eeddfa26399ceb31e1fc13c90945a9cbf",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "中国纪检监察报 reprintedonNanjingMunicipalDisciplineInspectionCommission site; celebratoryofficialbiographicalaccount",
        "publicationOrDocumentDate": "2024-05-10",
        "languageMediation": "Chinese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited original chronicles not collated; praise/universalpopularapproval not adopted",
        "locator": "officialbiography L 23–33;2011 report 1275 palaceparagraph",
        "extractedTextPath": null,
        "extractedTextSha256": null
      },
      {
        "sourceId": "nanjingArchaeology",
        "url": "https://news.sina.com.cn/c/2011-09-27/023823221028.shtml",
        "bodyPath": "/tmp/history-next15d-source-bodies/nanjingArchaeology.web.txt",
        "bodySha256": "aa9dd0b9d901924eaf65415d3a747afdc45af8b735825ba504dcb2875ba4aca9",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "南京晨报2011report carriedbySina;quotesNanjingMunicipalMuseumarchaeologistWangZhigao(王志高)",
        "publicationOrDocumentDate": "2011-09-27",
        "languageMediation": "Chinese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited original chronicles not collated; qualifiedinstitutionalexpertaccountviareport, not original1275chronicle",
        "locator": "officialbiography L 23–33;2011 report 1275 palaceparagraph",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  },
  {
    "id": "constructionVersusOccupation",
    "text": "The account’s Yanjing imperial-building works and 1276 completion differ from Jiankang’s offices and 1275 palace occupation; its 1283 city completion lies outside the endpoint.",
    "requiredContext": "1276 completion of principal imperial buildings is not whole city completed or royal move.1283 outside endpoint unselected. Actual article author/editor/year unresolved; original Yuanshi uncollated.",
    "fieldAddresses": [],
    "claims": [
      "history.history-beijing-nanjing-1200-1279.c7",
      "history.history-beijing-nanjing-1200-1279.c8",
      "history.history-beijing-nanjing-1200-1279.c9"
    ],
    "sourcePins": [
      {
        "sourceId": "beijingStudyRaw",
        "url": "https://wwj.beijing.gov.cn/bjww/resource/cms/article/bjww_362762/10845811/2020081209102378689.pdf",
        "bodyPath": "/tmp/history-next15d-source-bodies/beijingStudy.pdf",
        "bodySha256": "bbcafc474cfbe4410173d132e7ef084a49e72962c33a9745712f28fcb19cc2d8",
        "representation": "rawPDFbytes",
        "transport": "systemcurl verification enabled; no bypass",
        "makerCustodianEditor": "BeijingMunicipalCulturalHeritageBureau hosted108pagecompilation; selectedarticleauthor/editor/publicationyear not established",
        "publicationOrDocumentDate": "undatedcompilation;PDFpublicURL2020-08-12 ishostingdate,notpublicationproof",
        "languageMediation": "Chinese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited original chronicles not collated;image-onlyPDF17/printed11 actuallyvisuallyinspected; citedYuanshinotcollated; no maporlabelsused",
        "locator": "Beijing PDF 17/printed 11 Yuan Shiquotation/construction;Nanjing 1275 report",
        "extractedTextPath": "/tmp/history-next15d-source-bodies/beijingStudy.txt",
        "extractedTextSha256": "52252f318d291ba67e7dcf0e898ee820d0abedeb665d6ab96bde5bf41ff3f18b"
      },
      {
        "sourceId": "nanjingArchaeology",
        "url": "https://news.sina.com.cn/c/2011-09-27/023823221028.shtml",
        "bodyPath": "/tmp/history-next15d-source-bodies/nanjingArchaeology.web.txt",
        "bodySha256": "aa9dd0b9d901924eaf65415d3a747afdc45af8b735825ba504dcb2875ba4aca9",
        "representation": "official web-tool normalized response text; not rawHTML/PDF",
        "transport": "web-tool origin retrieval; local response SHA256 is representation pin, not independent origin authentication",
        "makerCustodianEditor": "南京晨报2011report carriedbySina;quotesNanjingMunicipalMuseumarchaeologistWangZhigao(王志高)",
        "publicationOrDocumentDate": "2011-09-27",
        "languageMediation": "Chinese institutional/scholarly account; minimal English agent paraphrase unreviewed; cited original chronicles not collated; qualifiedinstitutionalexpertaccountviareport, not original1275chronicle",
        "locator": "Beijing PDF 17/printed 11 Yuan Shiquotation/construction;Nanjing 1275 report",
        "extractedTextPath": null,
        "extractedTextSha256": null
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "beijingWorks",
    "text": "1264 Zhongdu 1267 Palace works 1276 Principal imperial buildings Earlier Yanjing centre Bureau-hosted account Author/year unresolved Working English Yuanshi uncollated",
    "claim": "history.history-beijing-nanjing-1200-1279.c3",
    "countedWords": 19,
    "whitespaceTokens": 22
  },
  {
    "id": "jiankangOffices",
    "text": "1255/1264 Jiankang Ma Guangzu Prefect/military official 1275 Bayan palace occupation Official biography/archaeologist report Working English Originals uncollated Modern Nanjing orientation",
    "claim": "history.history-beijing-nanjing-1200-1279.c6",
    "countedWords": 20,
    "whitespaceTokens": 22
  },
  {
    "id": "constructionVersusOccupation",
    "text": "Yanjing Imperial construction 1276 Jiankang Palace occupation 1275 Bureau-hosted account Author/year unresolved Archaeologist report Working English Originals uncollated Different acts Not 1283 completion",
    "claim": "history.history-beijing-nanjing-1200-1279.c9",
    "countedWords": 22,
    "whitespaceTokens": 25
  },
  {
    "id": "comparison",
    "text": "Yanjing/Zhongdu Works 1267 Principal imperial buildings 1276 Bureau-hosted Author/year unresolved Jiankang Ma Guangzu offices Bayan 1275 Occupation Report Working English Originals uncollated Not 1283 completion Distinct government",
    "claim": "history.history-beijing-nanjing-1200-1279.c10",
    "countedWords": 25,
    "whitespaceTokens": 29
  }
];
export const REQUIRED = [
  "beijingWorks",
  "jiankangOffices",
  "constructionVersusOccupation"
];
export const ATTACHMENTS = {
  "beijingWorks": [
    "beijingWorks"
  ],
  "jiankangOffices": [
    "jiankangOffices"
  ],
  "constructionVersusOccupation": [
    "constructionVersusOccupation"
  ]
};
export const PREDICTION = {
  "question": "Does a name change or palace work establish simultaneous identical government at both sites?",
  "options": [
    "Same relation",
    "Distinct relations"
  ],
  "answer": 1
};
export const REVEAL = "The bureau-hosted account distinguishes earlier Yanjing administration, renaming and palace construction; its author and publication year remain unresolved. The Nanjing accounts describe Jiankang’s prefectural/military offices and later palace occupation. Completion of principal imperial buildings is not the later 1283 city completion or royal move. Name, construction and occupation do not establish simultaneous identical government or empty land.";
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
