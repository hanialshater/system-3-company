export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "patna",
    "label": "Patna",
    "display": "revenue council 1772–80",
    "fields": [
      {
        "address": "v2.patna.institution",
        "text": "Revenue council",
        "value": "Patna Provincial Council of Revenue consultations 1772–1780",
        "source": "core:patnaCouncil",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/patnaCouncil.txt",
          "sha256": "7d6ce30ab965df405f58d7dc2e989d8f379cd113aa63d9078933086b4423e87e",
          "kind": "actual acquired body anchor",
          "anchor": "Consultations of the Provincial Council of Revenue, 1772-1780",
          "lineStart": 38,
          "lineEnd": 38
        }
      }
    ],
    "attribution": "British Library India Office catalogue, not unseen council instructions or full Bengal/Bihar legal hierarchy",
    "claims": [
      "history.history-kathmandu-patna-1700-1900.c1"
    ]
  },
  {
    "id": "treaty",
    "label": "Sugauli",
    "display": "Kali–Rapti lowlands Nepal/East India Company 1815 text; 1816 exchange",
    "fields": [
      {
        "address": "v3.treaty.kaliRapti",
        "text": "Kali–Rapti lowlands",
        "value": "Article3 first specified cession: lowlands between the Kali and Rapti rivers",
        "source": "core:courtOfficial",
        "locator": "textForPages[37], printed23, Article3; continuation[38], printed24",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/courtOldOfficial.txt",
          "sha256": "a2e8a74c7e6bf2812167d83514b59832f16497aaa1b36d195321d23eb3799aee",
          "kind": "actual acquired body anchor",
          "anchor": "the whole of the low lands between the Rivers Kali and Rapti.",
          "lineStart": 1,
          "lineEnd": 1
        }
      },
      {
        "address": "v2.treaty.parties",
        "text": "Nepal; East India Company",
        "value": "historical Nepal ruler and East India Company parties",
        "source": "core:courtOfficial",
        "locator": "textForPages[37], printed23",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/courtOldOfficial.txt",
          "sha256": "a2e8a74c7e6bf2812167d83514b59832f16497aaa1b36d195321d23eb3799aee",
          "kind": "actual acquired body anchor",
          "anchor": "HONOURABLE  EAST  lNDIA  COMPANY  AND  MAHA",
          "lineStart": 1,
          "lineEnd": 1
        }
      },
      {
        "address": "v2.treaty.dates",
        "text": "2 December 1815; exchange 4 March 1816",
        "value": "instrument date and received/counterpart exchange notation differ",
        "source": "core:courtOfficial",
        "locator": "textForPages[39], printed25, received/exchange notation",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/courtOldOfficial.txt",
          "sha256": "a2e8a74c7e6bf2812167d83514b59832f16497aaa1b36d195321d23eb3799aee",
          "kind": "actual acquired body anchor",
          "anchor": "4th  of  March  1816",
          "lineStart": 1,
          "lineEnd": 1
        }
      }
    ],
    "attribution": "High Court Sikkim modern English edition, compiler Yangchen Doma Gyatso; courtesy Namgyal Institute; not original Nepal manuscript or modern boundary adjudication",
    "claims": [
      "history.history-kathmandu-patna-1700-1900.c2",
      "history.history-kathmandu-patna-1700-1900.c3",
      "history.history-kathmandu-patna-1700-1900.c4"
    ]
  }
];
export const REQUIRED:string[] = [
  "patna",
  "treaty"
];
export const CONTEXT:Record<string,string> = {};
export const ATTACHMENTS:Record<string,string[]> = {};
export const PREDICTION = {
  "question": "Which selected record actually names a territorial cession?",
  "options": [
    "Patna revenue-council catalogue",
    "Sugauli territorial clause naming Kali–Rapti lowlands"
  ],
  "answer": 1
};
export const REVEAL = "The British Library catalogues Patna revenue-council consultations. Sikkim’s English edition reproduces Sugauli’s Kali–Rapti lowlands clause between Nepal’s ruler and the East India Company, with 1815 text and 1816 exchange. These establish neither blanket annexation, Patna’s transfer nor today’s disputed boundary; full Patna hierarchy remains unproved.";
export const PROVENANCE = "British Library catalogue; Sikkim Court English edition";
export const RELATION = "M20 6 H120 M180 6 H280";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
