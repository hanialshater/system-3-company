export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "aof",
    "label": "AOF",
    "display": "colonial; Dakar",
    "fields": [
      {
        "address": "v2.aof.members",
        "text": "Senegal; French Sudan",
        "value": "shared French colonial administration",
        "source": "core:aofArchive",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/aofArchive.txt",
          "sha256": "734a526a4f5af0396fdf6062564200dce41095b9dacd56d6be48bc5524b348bc",
          "kind": "actual acquired body anchor",
          "anchor": "Côte d'Ivoire, Guinée, Sénégal et Soudan français",
          "lineStart": 81,
          "lineEnd": 81
        }
      },
      {
        "address": "v2.aof.seat",
        "text": "Dakar",
        "value": "later AOF seat at Dakar",
        "source": "core:aofArchive",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/aofArchive.txt",
          "sha256": "734a526a4f5af0396fdf6062564200dce41095b9dacd56d6be48bc5524b348bc",
          "kind": "actual acquired body anchor",
          "anchor": "Le siège de la fédération est transféré de Saint-Louis à Dakar",
          "lineStart": 82,
          "lineEnd": 82
        }
      }
    ],
    "attribution": "French diplomatic archive modern administrative history",
    "claims": [
      "history.history-dakar-bamako-1880-1960.c1",
      "history.history-dakar-bamako-1880-1960.c2"
    ]
  },
  {
    "id": "federation",
    "label": "Mali Federation",
    "display": "Senegal/Sudan",
    "fields": [
      {
        "address": "v2.federation.members",
        "text": "Senegal; Sudan",
        "value": "distinct later Mali Federation",
        "source": "core:aofArchive",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/aofArchive.txt",
          "sha256": "734a526a4f5af0396fdf6062564200dce41095b9dacd56d6be48bc5524b348bc",
          "kind": "actual acquired body anchor",
          "anchor": "fédération associant les anciens territoires du Sénégal et du Soudan français",
          "lineStart": 91,
          "lineEnd": 91
        }
      }
    ],
    "attribution": "Same modern archive account; not 1895 decree body",
    "claims": [
      "history.history-dakar-bamako-1880-1960.c3"
    ]
  },
  {
    "id": "separate",
    "label": "Separate 1960",
    "display": "Senegal/Mali",
    "fields": [
      {
        "address": "v2.separate.actors",
        "text": "Senegal; Mali",
        "value": "separate countries in U.S. recognition recommendation",
        "source": "core:maliRecognition",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/maliRecognition.txt",
          "sha256": "386df3df0cdbb90b7ae3684a94c4251660f4e9be46824d3214fa53a089ff6ea8",
          "kind": "actual acquired body anchor",
          "anchor": "two separate countries",
          "lineStart": 67,
          "lineEnd": 67
        }
      }
    ],
    "attribution": "Dillon memorandum to Eisenhower 23 September 1960; recommendation is a U.S. act, not universal sovereignty test",
    "claims": [
      "history.history-dakar-bamako-1880-1960.c4"
    ]
  }
];
export const REQUIRED:string[] = [
  "aof",
  "federation",
  "separate"
];
export const CONTEXT:Record<string,string> = {};
export const ATTACHMENTS:Record<string,string[]> = {};
export const PREDICTION = {
  "question": "Were AOF and the Mali Federation the same institution continuing unchanged?",
  "options": [
    "One federation continued unchanged",
    "Different institutions; Senegal and Mali became separate actors"
  ],
  "answer": 1
};
export const REVEAL = "The French diplomatic archive distinguishes colonial AOF, later seated at Dakar, from the Mali Federation. Dillon’s 1960 memorandum recommends separate U.S. recognition for Senegal and Mali. Shared earlier administration did not make these institutions identical; recognition is a particular diplomatic act, not universal consent.";
export const PROVENANCE = "French archive history; Dillon US recommendation Different institutions";
export const RELATION = "M20 6 H120 M180 6 H280";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
