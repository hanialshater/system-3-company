export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "prague",
    "label": "Prague",
    "display": "Bohemian Diet Land responsibilities",
    "fields": [
      {
        "address": "v2.prague.institution",
        "text": "Bohemian Diet",
        "value": "Bohemian Land Diet met in Prague inApril 1861",
        "source": "core:pragueTradition",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/pragueTradition.txt",
          "sha256": "76bf0f3702244c081265031dea621c1f801364143e6767bc7ffc2b8de6d8ea50",
          "kind": "actual acquired body anchor",
          "anchor": "the Bohemian Land Diet met in Prague",
          "lineStart": 64,
          "lineEnd": 64
        }
      },
      {
        "address": "v2.prague.scope",
        "text": "Land responsibilities",
        "value": "bounded land-level responsibilities",
        "source": "core:pragueTradition",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/pragueTradition.txt",
          "sha256": "76bf0f3702244c081265031dea621c1f801364143e6767bc7ffc2b8de6d8ea50",
          "kind": "actual acquired body anchor",
          "anchor": "The responsibilities of the land diets were limited",
          "lineStart": 65,
          "lineEnd": 65
        }
      }
    ],
    "attribution": "Czech parliamentary modern institutional history; restricted electoral representation",
    "claims": [
      "history.history-prague-vienna-1492-1880.c1",
      "history.history-prague-vienna-1492-1880.c2"
    ]
  },
  {
    "id": "vienna",
    "label": "Vienna",
    "display": "Imperial Council Shared emperor",
    "fields": [
      {
        "address": "v2.vienna.institution",
        "text": "Imperial Council",
        "value": "Imperial Council in Vienna",
        "source": "core:pragueTradition",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/pragueTradition.txt",
          "sha256": "76bf0f3702244c081265031dea621c1f801364143e6767bc7ffc2b8de6d8ea50",
          "kind": "actual acquired body anchor",
          "anchor": "The Imperial Council in Vienna",
          "lineStart": 62,
          "lineEnd": 62
        }
      },
      {
        "address": "v2.shared.ruler",
        "text": "Emperor",
        "value": "emperor appointed Diet presiding officers",
        "source": "core:pragueTradition",
        "locator": "Czech parliamentary institutional account, normalized line65: Diet presiding officers; not earlier proposed Senate at46",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/pragueTradition.txt",
          "sha256": "76bf0f3702244c081265031dea621c1f801364143e6767bc7ffc2b8de6d8ea50",
          "kind": "actual acquired body anchor",
          "anchor": "The presiding officers of the assembly were appointed by the Emperor.",
          "lineStart": 65,
          "lineEnd": 65
        }
      }
    ],
    "attribution": "Same institutional account; exact separate competencies are not inferred from common ruler",
    "claims": [
      "history.history-prague-vienna-1492-1880.c3",
      "history.history-prague-vienna-1492-1880.c4"
    ]
  }
];
export const REQUIRED:string[] = [
  "prague",
  "vienna"
];
export const CONTEXT:Record<string,string> = {};
export const ATTACHMENTS:Record<string,string[]> = {};
export const PREDICTION = {
  "question": "Did the shared ruler eliminate the separate Bohemian Diet?",
  "options": [
    "One ruler meant one uniform assembly",
    "Prague’s separate Land Diet and Vienna’s Imperial Council coexisted"
  ],
  "answer": 1
};
export const REVEAL = "The Czech parliamentary account distinguishes Prague’s Bohemian Diet from Vienna’s Imperial Council under a shared emperor. Bounded land responsibilities and restricted electoral representation remain explicit. Shared dynastic authority did not erase separate institutions or establish equal participation; the 1918 republic is outside this comparison.";
export const PROVENANCE = "Czech parliamentary account; restricted electorate Separate institutions";
export const RELATION = "M50 10 V3 H250 V10 M150 0 V3";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
