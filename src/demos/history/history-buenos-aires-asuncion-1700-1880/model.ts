export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "origin",
    "label": "Vice-regal",
    "display": "Buenos Aires",
    "fields": [
      {
        "address": "v2.origin.centre",
        "text": "Buenos Aires",
        "value": "former vice-regal capital",
        "source": "core:paraguayCongress",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/paraguayCongress.txt",
          "sha256": "4dc16ad51f83c84ff7601f8aeaa21651a19d340e9c02af75759caaba23ddd9fd",
          "kind": "actual acquired body anchor",
          "anchor": "cuya capital era Buenos Aires",
          "lineStart": 52,
          "lineEnd": 52
        }
      }
    ],
    "attribution": "Guido Rodríguez Alcalá, Paraguay Culture Secretariat 2011 account",
    "claims": [
      "history.history-buenos-aires-asuncion-1700-1880.c1"
    ]
  },
  {
    "id": "paraguay",
    "label": "1811",
    "display": "Asunción: government",
    "fields": [
      {
        "address": "v2.paraguay.place",
        "text": "Asunción",
        "value": "Asunción congress",
        "source": "core:paraguayCongress",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/paraguayCongress.txt",
          "sha256": "4dc16ad51f83c84ff7601f8aeaa21651a19d340e9c02af75759caaba23ddd9fd",
          "kind": "actual acquired body anchor",
          "anchor": "El congreso reunido en Asunción en junio de 1811",
          "lineStart": 47,
          "lineEnd": 47
        }
      },
      {
        "address": "v2.paraguay.act",
        "text": "Government chosen",
        "value": "separate five-member governing junta",
        "source": "core:paraguayCongress",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/paraguayCongress.txt",
          "sha256": "4dc16ad51f83c84ff7601f8aeaa21651a19d340e9c02af75759caaba23ddd9fd",
          "kind": "actual acquired body anchor",
          "anchor": "Formar una junta de gobierno de cinco miembros",
          "lineStart": 57,
          "lineEnd": 57
        }
      }
    ],
    "attribution": "Paraguay Culture 2011 account; restricted participation",
    "claims": [
      "history.history-buenos-aires-asuncion-1700-1880.c2",
      "history.history-buenos-aires-asuncion-1700-1880.c3"
    ]
  },
  {
    "id": "provinces",
    "label": "1816",
    "display": "Tucumán: declaration",
    "fields": [
      {
        "address": "v2.provinces.place",
        "text": "Tucumán",
        "value": "Tucumán Congress",
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
      },
      {
        "address": "v2.provinces.act",
        "text": "Independence declared",
        "value": "United Provinces separate declaration",
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
      }
    ],
    "attribution": "MJP French edition of United Provinces declaration; Buenos Aires is not declaration location",
    "claims": [
      "history.history-buenos-aires-asuncion-1700-1880.c4",
      "history.history-buenos-aires-asuncion-1700-1880.c5"
    ]
  }
];
export const REQUIRED:string[] = [
  "origin",
  "paraguay",
  "provinces"
];
export const CONTEXT:Record<string,string> = {};
export const ATTACHMENTS:Record<string,string[]> = {};
export const PREDICTION = {
  "question": "Did the former vice-regal centre make the two later acts one Buenos Aires declaration?",
  "options": [
    "One Buenos Aires act covered both",
    "Different actors and acts: Asunción 1811 and Tucumán 1816"
  ],
  "answer": 1
};
export const REVEAL = "Paraguay’s Culture account identifies Buenos Aires as former vice-regal capital and Asunción’s 1811 government choice. MJP’s French edition locates the separate United Provinces declaration at Tucumán in 1816. Shared administration did not make one declaration; the account explicitly describes restricted participation.";
export const PROVENANCE = "Paraguay Culture account; MJP French edition Restricted participation";
export const RELATION = "M150 0 v4 M50 10 V4 H250 V10";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
