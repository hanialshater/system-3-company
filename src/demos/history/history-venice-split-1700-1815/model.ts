export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "venetian",
    "label": "Venetian",
    "display": "Split: rector/council",
    "fields": [
      {
        "address": "v2.venetian.office",
        "text": "Rector; council",
        "value": "Split rector and limited municipal council",
        "source": "core:splitMunicipalInventory",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/splitMunicipalInventory.txt",
          "sha256": "e6472a3f251bf34161556a8af84e70239696ad1a1ac8e021f1d11198e5a7e5e7",
          "kind": "actual acquired body anchor",
          "anchor": "Kneza postavlja Venecija",
          "lineStart": 97,
          "lineEnd": 97
        }
      }
    ],
    "attribution": "Split State Archive municipal inventory, modern institutional history, not original charter",
    "claims": [
      "history.history-venice-split-1700-1815.c1"
    ]
  },
  {
    "id": "court",
    "label": "1807",
    "display": "Split: first-instance court Operation: 1 January",
    "fields": [
      {
        "address": "v2.court.office",
        "text": "Split first-instance court",
        "value": "Split first-instance court in French-period judicial organization",
        "source": "core:splitFrenchCourt",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/splitFrenchCourt.txt",
          "sha256": "8aeb41e4f6179872c2b5fa692a330888cb81bc9795a7121899f36c41f3c9e817",
          "kind": "actual acquired body anchor",
          "anchor": "di prima istanza ) u Zadru i Splitu",
          "lineStart": 103,
          "lineEnd": 103
        }
      },
      {
        "address": "v2.court.operation",
        "text": "Operation 1 January 1807",
        "value": "judicial organization began operating 1 January 1807",
        "source": "core:splitFrenchCourt",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/splitFrenchCourt.txt",
          "sha256": "8aeb41e4f6179872c2b5fa692a330888cb81bc9795a7121899f36c41f3c9e817",
          "kind": "actual acquired body anchor",
          "anchor": "s radom 1.siječnja 1807.godine.",
          "lineStart": 100,
          "lineEnd": 100
        }
      }
    ],
    "attribution": "Split State Archive French-period court inventory; distinguishes 1806 decree/rule from 1807 operation",
    "claims": [
      "history.history-venice-split-1700-1815.c2",
      "history.history-venice-split-1700-1815.c3"
    ]
  }
];
export const REQUIRED:string[] = [
  "venetian",
  "court"
];
export const CONTEXT:Record<string,string> = {};
export const ATTACHMENTS:Record<string,string[]> = {};
export const PREDICTION = {
  "question": "Does evidence of a new Split court show every maritime connection changed?",
  "options": [
    "The administrative change proves all sea links ended",
    "It shows a local institution; sea-route continuity needs different evidence"
  ],
  "answer": 1
};
export const REVEAL = "Split’s archive inventories describe Venetian municipal offices and a French-period first-instance court operating from 1 January 1807, after 1806 rules. These are local administrative witnesses, not merely treaty recipients. They do not establish whether particular maritime connections ended or persisted; that needs different evidence.";
export const PROVENANCE = "Split archive inventories Administration ≠ maritime links";
export const RELATION = "M20 6 H120 M180 6 H280";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
