export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "seat",
    "label": "1763",
    "display": "Salvador → Rio",
    "fields": [
      {
        "address": "v2.seat.origin",
        "text": "Salvador",
        "value": "Salvador",
        "source": "core:rioArchiveAdministration",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/rioArchiveAdministration.txt",
          "sha256": "79c19705489a6899821a7b27516bad2db20021933c82bb9f3006afbd1c6abea1",
          "kind": "actual acquired body anchor",
          "anchor": "em Salvador até 1763",
          "lineStart": 453,
          "lineEnd": 453
        }
      },
      {
        "address": "v2.seat.destination",
        "text": "Rio",
        "value": "Rio de Janeiro",
        "source": "core:rioArchiveAdministration",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/rioArchiveAdministration.txt",
          "sha256": "79c19705489a6899821a7b27516bad2db20021933c82bb9f3006afbd1c6abea1",
          "kind": "actual acquired body anchor",
          "anchor": "para o Rio de Janeiro quando",
          "lineStart": 453,
          "lineEnd": 453
        }
      }
    ],
    "attribution": "Arquivo Nacional modern archival account; year precision, not contemporary order wording",
    "claims": [
      "history.history-rio-salvador-1700-1900.c1",
      "history.history-rio-salvador-1700-1900.c2"
    ]
  },
  {
    "id": "empire",
    "label": "1824",
    "display": "Monarchy",
    "fields": [
      {
        "address": "v2.empire.form",
        "text": "Monarchy",
        "value": "hereditary constitutional representative monarchy",
        "source": "br1824",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/br1824.txt",
          "sha256": "da21eb62d36e4366b8654efee0150118625066abde27b767cb0fcafaf746dfe1",
          "kind": "actual acquired body anchor",
          "anchor": "Son gouvernement est héréditaire",
          "lineStart": 90,
          "lineEnd": 90
        }
      }
    ],
    "attribution": "MJP French edition of 1824 imperial constitutional text",
    "claims": [
      "history.history-rio-salvador-1700-1900.c3"
    ]
  },
  {
    "id": "republic",
    "label": "1891",
    "display": "Republic",
    "fields": [
      {
        "address": "v2.republic.form",
        "text": "Republic",
        "value": "federal representative republic",
        "source": "br1891",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/br1891.txt",
          "sha256": "4da06503a7558dfdaa5398efc5df8c419ad3740386b9579460cdd000b6881e93",
          "kind": "actual acquired body anchor",
          "anchor": "République\nfédérative proclamée",
          "lineStart": 53,
          "lineEnd": 54
        }
      }
    ],
    "attribution": "MJP French edition of 1891 constitutional text",
    "claims": [
      "history.history-rio-salvador-1700-1900.c4"
    ]
  }
];
export const REQUIRED:string[] = [
  "seat",
  "empire",
  "republic"
];
export const CONTEXT:Record<string,string> = {};
export const ATTACHMENTS:Record<string,string[]> = {};
export const PREDICTION = {
  "question": "Did the colonial seat transfer wait for the republican constitution?",
  "options": [
    "Yes: capital transfer and republic are one event",
    "No: the seat transfer precedes both later constitutional witnesses"
  ],
  "answer": 1
};
export const REVEAL = "Arquivo Nacional dates the vice-regal seat’s Salvador→Rio transfer to 1763. MJP’s French constitutional editions prescribe monarchy in 1824 and republic in 1891. A colonial capital move and later regime provisions are different events; neither establishes popular consent or freedom from slavery.";
export const PROVENANCE = "Arquivo Nacional account; MJP French editions Seat ≠ regime";
export const RELATION = "M50 2 v8 M150 2 v8 M250 2 v8";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
