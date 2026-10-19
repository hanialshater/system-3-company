export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "greek",
    "label": "1832",
    "display": "Greek crown",
    "fields": [
      {
        "address": "v2.greek.institution",
        "text": "Greek crown",
        "value": "Greek crown specified in 1832 instrument",
        "source": "gr1832",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/gr1832.txt",
          "sha256": "a037ceb5e5b82eb5c532ad4fd025e3dab908788106c86133a966ca2911603f42",
          "kind": "actual acquired body anchor",
          "anchor": "offrent la souveraineté héréditaire",
          "lineStart": 93,
          "lineEnd": 93
        }
      }
    ],
    "attribution": "MJP French edition; instrument scope, not blanket city control",
    "claims": [
      "history.history-athens-thessaloniki-1815-1900.c1"
    ]
  },
  {
    "id": "salonica",
    "label": "1876",
    "display": "Salonica: Ottoman governor Constantinople commission",
    "fields": [
      {
        "address": "v2.salonica.official",
        "text": "Ottoman governor",
        "value": "Eshrif Pasha named governor-general of Salonica",
        "source": "core:salonicaConsul",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/salonicaConsul.txt",
          "sha256": "00deb69e0ae69188644683977e8b007813ad6034fbf84913874d5e562cecb917",
          "kind": "actual acquired body anchor",
          "anchor": "Eshrif Pasha, present governor-general of Salonica",
          "lineStart": 105,
          "lineEnd": 105
        }
      },
      {
        "address": "v2.salonica.origin",
        "text": "Constantinople commission",
        "value": "commission arrived from Constantinople",
        "source": "core:salonicaConsul",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/salonicaConsul.txt",
          "sha256": "00deb69e0ae69188644683977e8b007813ad6034fbf84913874d5e562cecb917",
          "kind": "actual acquired body anchor",
          "anchor": "commission which had arrived from Constantinople",
          "lineStart": 101,
          "lineEnd": 101
        }
      }
    ],
    "attribution": "Lazzaro vice-consular report 21 June 1876, transmitted by Maynard 20 July; not Ottoman decree or neutral account of violence",
    "claims": [
      "history.history-athens-thessaloniki-1815-1900.c2",
      "history.history-athens-thessaloniki-1815-1900.c3"
    ]
  }
];
export const REQUIRED:string[] = [
  "greek",
  "salonica"
];
export const CONTEXT:Record<string,string> = {};
export const ATTACHMENTS:Record<string,string[]> = {};
export const PREDICTION = {
  "question": "Does the Greek crown instrument establish that Salonica had the same administration by 1876?",
  "options": [
    "The crown instrument changed both administrations together",
    "The 1876 Salonica report still identifies Ottoman administrative officials"
  ],
  "answer": 1
};
export const REVEAL = "MJP’s 1832 French-edition crown instrument concerns Greece. Lazzaro’s 1876 Salonica report names an Ottoman governor-general and a Constantinople commission. These show asynchronous institutions, not simultaneous city transfer. The report’s prejudicial explanations of violence are excluded; no current sovereign title or universal consent follows.";
export const PROVENANCE = "MJP French edition; Lazzaro via Maynard Asynchronous institutions";
export const RELATION = "M20 6 H120 M180 6 H280";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
