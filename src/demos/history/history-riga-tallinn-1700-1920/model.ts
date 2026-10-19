import {lessonData} from "./data";
export const RECORDS=lessonData.documents;
export interface SourcePin {url:string;[key:string]:unknown}
export const DOCUMENTS: {id:string;text:string;requiredContext:string;fieldAddresses:string[];claims:string[];sourcePins:SourcePin[]}[] = [
  {
    "id": "tartu",
    "text": "Russia (1920 treaty party) recognises; Estonia named",
    "requiredContext": "Signing ≠ effect or fulfilment",
    "fieldAddresses": [
      "tartu.recognizer",
      "tartu.state"
    ],
    "claims": [
      "history.history-riga-tallinn-1700-1920.c1",
      "history.history-riga-tallinn-1700-1920.c2"
    ],
    "sourcePins": []
  },
  {
    "id": "riga",
    "text": "Russia (1920 treaty party) recognises; Latvia named",
    "requiredContext": "Signing ≠ effect or fulfilment",
    "fieldAddresses": [
      "riga.recognizer",
      "riga.state"
    ],
    "claims": [
      "history.history-riga-tallinn-1700-1920.c3",
      "history.history-riga-tallinn-1700-1920.c4"
    ],
    "sourcePins": []
  },
  {
    "id": "rigaImperialTransition",
    "text": "1710 Riga taken from Swedish forces by Peter I; 1721 Vidzeme settlement. Latvian MFA modern summary, not original treaty or consent.",
    "requiredContext": "Riga1710capture is not1721Vidzeme settlement or all present-day Latvia; no universal consent.",
    "fieldAddresses": [
      "purposeAugmentation.witnesses.rigaImperialTransition"
    ],
    "claims": [
      "history.history-riga-tallinn-1700-1920.c17"
    ],
    "sourcePins": [
      {
        "id": "riga-mfa",
        "url": "https://www2.mfa.gov.lv/en/belgium/history-of-latvia",
        "path": "company/research/history-next10-four-purpose-bodies/riga-mfa.html",
        "http": "200",
        "exit": 0,
        "error": "",
        "sha256": "22481cc302b32965a4975864ba47e4fca3b00f87e26917917f23d386c7601943",
        "bytes": 67869,
        "normalizedPath": "company/research/history-next10-four-purpose-bodies/riga-mfa.txt",
        "normalizedSha256": "aa767664bc64601f661db3e97073bfb3e6f0d5fe0066251d811e9feb89da4dbb",
        "title": "History of Latvia, Embassy Belgium6March2023",
        "historicalMaker": "Modern Latvian MFA institutional account",
        "custodian": "Latvian Ministry of Foreign Affairs, Embassy Belgium",
        "locator": "Normalized23–24: Riga taken from Swedes1710, Vidzeme secured under Nystad1721",
        "minimalOwnEnglishFact": "Latvian MFA dates Riga’s seizure from Swedish forces by PeterI to1710, and Sweden-to-Russia Vidzeme settlement to1721.",
        "limits": "Modern summary, not acquired original1721treaty; do not collapse1710capture into1721cession, all Baltic regions or present-day Latvia into one simultaneous transfer. No consent inferred.",
        "editionLanguageMediation": "English institutional account; source attribution for underlying narrative not established.",
        "rights": "Evidence acquisition only; use own minimal attributed factual paraphrase. No copied prose, source translation, image, map, layout, facsimile or dataset permitted by this research packet; source-use owner assesses proposed adoption.",
        "claimStatus": "unverified",
        "checkedBy": "",
        "checkedOn": "",
        "sourceId": "riga-mfa",
        "bodyPath": "company/research/history-next10-four-purpose-bodies/riga-mfa.html",
        "bodySha256": "22481cc302b32965a4975864ba47e4fca3b00f87e26917917f23d386c7601943",
        "sourceLedger": "company/research/2026-10-19-history-next10-four-purpose-bridges-ledger.json",
        "sourceLedgerSha256": "651f751ae5c0d80e9c39e3db1341108185af405a02af7b722b5387a55e4dfe30",
        "representation": "actual acquired HTML and normalized text",
        "claimsStatus": "unverified",
        "extractedTextPath": "company/research/history-next10-four-purpose-bodies/riga-mfa.txt",
        "extractedTextSha256": "aa767664bc64601f661db3e97073bfb3e6f0d5fe0066251d811e9feb89da4dbb"
      }
    ]
  },
  {
    "id": "tallinnImperialTransition",
    "text": "1710 Tallinn: Swedish troops hand posts to Russian troops after capitulation. City Archives edited account; working Estonian/English, minutes uninspected, calendar unresolved.",
    "requiredContext": "Use1710only until Julian/Gregorian labels checked; not an inspected1721treaty. Municipal/guild signatories are not all residents; no minute prose, map or photo imported.",
    "fieldAddresses": [
      "purposeAugmentation.witnesses.tallinnImperialTransition"
    ],
    "claims": [
      "history.history-riga-tallinn-1700-1920.c18"
    ],
    "sourcePins": [
      {
        "id": "tallinn-archive",
        "url": "https://linnaarhiiv.wordpress.com/2022/09/29/tallinn-1710/",
        "http": "200 substantive acquired body",
        "path": "company/research/history-next10-four-purpose-bodies/tallinn-archive.html",
        "sha256": "89a4d346090554a4d43f2af3d283b90a1d4547219dfc8ea1753eaa16b22ccf49",
        "bytes": 191884,
        "normalizedPath": "company/research/history-next10-four-purpose-bodies/tallinn-archive.txt",
        "normalizedSha256": "e8edd0175b963c5ac0b205cc3c22bdb443037aa933c9cf9823193a394cd164fd",
        "title": "Tallinn1710, City Archives29September2022",
        "historicalMaker": "Modern City Archives exhibition text based on1710Town Council minutes; historical minutesTLA.230.1.Ab147",
        "custodian": "Tallinna Linnaarhiiv via institutional WordPress blog",
        "locator": "Normalized lines14–15 prior Swedish city and1710context;87capitulation;89–91 30September entry replacing Swedish posts with Russian troops;94 archival source TLA.230.1.Ab147. Retain year1710only; day/calendar not certified.",
        "minimalOwnEnglishFact": "The City Archives account describes1710Tallinn’s Swedish troops handing posts to Russian troops after capitulation.",
        "limits": "Use year1710 only until Julian/Gregorian day labels independently resolved; do not call it a1721treaty text. Municipal/guild signatories do not establish all residents’ consent; no copied maps/photos or translated minute prose.",
        "editionLanguageMediation": "Estonian modern exhibition account with edited minute excerpts. Own working English factual paraphrase requires independent Estonian/English semantic review; manuscript minutes not inspected.",
        "rights": "Evidence acquisition only; use own minimal attributed factual paraphrase. No copied prose, source translation, image, map, layout, facsimile or dataset permitted by this research packet; source-use owner assesses proposed adoption.",
        "claimStatus": "unverified",
        "checkedBy": "",
        "checkedOn": "",
        "sourceId": "tallinn-archive",
        "bodyPath": "company/research/history-next10-four-purpose-bodies/tallinn-archive.html",
        "bodySha256": "89a4d346090554a4d43f2af3d283b90a1d4547219dfc8ea1753eaa16b22ccf49",
        "sourceLedger": "company/research/2026-10-19-history-next10-four-purpose-bridges-ledger.json",
        "sourceLedgerSha256": "651f751ae5c0d80e9c39e3db1341108185af405a02af7b722b5387a55e4dfe30",
        "representation": "actual acquired HTML and normalized text",
        "claimsStatus": "unverified",
        "extractedTextPath": "company/research/history-next10-four-purpose-bodies/tallinn-archive.txt",
        "extractedTextSha256": "e8edd0175b963c5ac0b205cc3c22bdb443037aa933c9cf9823193a394cd164fd",
        "fullSourcesCredit": "Triin Kröönström; Tallinna Linnaarhiiv. Exhibition text2010, post29September2022, underlying1710TownCouncil minutes TLA.230.1.Ab147, manuscript not inspected; calendar not certified."
      }
    ]
  }
];
export const FRAMES = [
  {
    "id": "tartu",
    "text": "1920 Tartu Russia (1920 treaty party) recognises Estonia named Signing ≠ effect or fulfilment",
    "claim": "history.history-riga-tallinn-1700-1920.c1 history.history-riga-tallinn-1700-1920.c2"
  },
  {
    "id": "riga",
    "text": "1920 Riga Russia (1920 treaty party) recognises Latvia named Signing ≠ effect or fulfilment",
    "claim": "history.history-riga-tallinn-1700-1920.c3 history.history-riga-tallinn-1700-1920.c4"
  },
  {
    "id": "rigaImperialTransition",
    "text": "1710 Riga taken from Swedish forces by Peter I; 1721 Vidzeme settlement. Latvian MFA modern summary, not original treaty or consent.",
    "claim": "history.history-riga-tallinn-1700-1920.c17"
  },
  {
    "id": "tallinnImperialTransition",
    "text": "1710 Tallinn: Swedish troops hand posts to Russian troops after capitulation. City Archives edited account; working Estonian/English, minutes uninspected, calendar unresolved.",
    "claim": "history.history-riga-tallinn-1700-1920.c18"
  },
  {
    "id": "comparison",
    "text": "Riga 1710 seizure; Tallinn 1710 handover; Swedish→Russian Vidzeme 1721 settlement 1920 Russian recognition: Estonia/Latvia Tallinn calendar unresolved; working Estonian/English unreviewed Modern accounts/translated treaties",
    "claim": "history.history-riga-tallinn-1700-1920.c19"
  }
];
export const REQUIRED = [
  "tartu",
  "riga",
  "rigaImperialTransition",
  "tallinnImperialTransition"
];
export const ATTACHMENTS = {
  "tartu": [
    "tartu"
  ],
  "riga": [
    "riga"
  ],
  "rigaImperialTransition": [
    "rigaImperialTransition"
  ],
  "tallinnImperialTransition": [
    "tallinnImperialTransition"
  ]
};
export const PREDICTION = {
  "question": "Does the Estonia treaty’s recognition alone establish Latvia’s recognition?",
  "options": [
    "Yes, both areBaltic",
    "No, check Latvia’s own treaty"
  ],
  "answer": 1
};
export const REVEAL = "Each treaty names its own state; a regional label cannot replace that evidence. Russia here means the 1920 treaty party. Signing alone does not establish entry into force; these excerpts establish neither every resident’s wishes, settled borders nor later fulfilment of treaty promises. Modern institutional accounts separately describe Riga’s seizure from Swedish forces and Tallinn’s Swedish-to-Russian troop handover in 1710; Vidzeme’s 1721 settlement is distinct. Tallinn’s calendar remains unresolved; working Estonian/English unreviewed. These accounts are not original treaties or residents’ consent.";
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
