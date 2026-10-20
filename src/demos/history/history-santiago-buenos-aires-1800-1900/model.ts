export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "provinces",
    "label": "1816",
    "display": "United Provinces: Tucumán",
    "fields": [
      {
        "address": "v2.provinces.unit",
        "text": "United Provinces",
        "value": "United Provinces declaration",
        "source": "ar1816",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/ar1816.txt",
          "sha256": "f52ba85810114b280c2d68faaab2e33f6d924589417d31574d0b29eda5490a19",
          "kind": "actual acquired body anchor",
          "anchor": "Provinces-Unies",
          "lineStart": 45,
          "lineEnd": 45
        }
      },
      {
        "address": "v2.provinces.place",
        "text": "Tucumán",
        "value": "declaration at Tucumán, not Buenos Aires",
        "source": "ar1816",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/ar1816.txt",
          "sha256": "f52ba85810114b280c2d68faaab2e33f6d924589417d31574d0b29eda5490a19",
          "kind": "actual acquired body anchor",
          "anchor": "Tucuman",
          "lineStart": 35,
          "lineEnd": 35
        }
      }
    ],
    "attribution": "MJP French edition; Buenos Aires linked through earlier junta in editorial context",
    "claims": [
      "history.history-santiago-buenos-aires-1800-1900.c1",
      "history.history-santiago-buenos-aires-1800-1900.c2"
    ]
  },
  {
    "id": "chile",
    "label": "1818",
    "display": "Chile: Santiago deposit ordered",
    "fields": [
      {
        "address": "v2.chile.unit",
        "text": "Chile",
        "value": "separate Chilean declaration",
        "source": "cl1818",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/cl1818.txt",
          "sha256": "8f23ae3624d5f1bbf337fa00790d340e23b6d80d0768057f624eddb3d6603147",
          "kind": "actual acquired body anchor",
          "anchor": "territoire continental du Chili",
          "lineStart": 68,
          "lineEnd": 68
        }
      },
      {
        "address": "v2.chile.place",
        "text": "Santiago deposit ordered",
        "value": "Declaration prescribes deposit in Santiago municipality; completed deposit not established",
        "source": "cl1818",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/cl1818.txt",
          "sha256": "8f23ae3624d5f1bbf337fa00790d340e23b6d80d0768057f624eddb3d6603147",
          "kind": "actual acquired body anchor",
          "anchor": "municipalité\nde Santiago",
          "lineStart": 82,
          "lineEnd": 83
        }
      }
    ],
    "attribution": "MJP French edition; 1 January textual date distinct from 21 February publication date. The act orders Santiago deposit; performance/custody is not established.",
    "claims": [
      "history.history-santiago-buenos-aires-1800-1900.c3",
      "history.history-santiago-buenos-aires-1800-1900.c4"
    ]
  }
];
export const REQUIRED:string[] = [
  "provinces",
  "chile"
];
export const CONTEXT:Record<string,string> = {
  "provinces": "Earlier Buenos Aires junta"
};
export const ATTACHMENTS:Record<string,string[]> = {
  "provinces": [
    "v2.context.buenosaires"
  ],
  "chile": [
    "v2.context.chileDates"
  ]
};
export const PREDICTION = {
  "question": "Are these one declaration made simultaneously by Buenos Aires and Santiago?",
  "options": [
    "One simultaneous act",
    "Distinct named acts"
  ],
  "answer": 1
};
export const REVEAL = "MJP’s French editions distinguish the United Provinces declaration at Tucumán from Chile’s act ordering Santiago deposit. Buenos Aires belongs to earlier junta context. Chile’s 1 January textual date differs from 21 February publication. Separate named acts establish neither every territory’s participation nor a completed deposit.";
export const PROVENANCE = "MJP French editions Text: 1 January; publication: 21 February Separate named units";
export const RELATION = "M20 6 H120 M180 6 H280";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
