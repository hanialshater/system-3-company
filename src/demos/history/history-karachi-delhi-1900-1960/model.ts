export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "statute",
    "label": "Statute",
    "display": "India/Pakistan 15 August 1947",
    "fields": [
      {
        "address": "v2.statute.units",
        "text": "India; Pakistan",
        "value": "two dominions India and Pakistan",
        "source": "india1947",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/india1947.txt",
          "sha256": "486509284d713ea2fec36635289b5cb39b3ccf1a1711582eca4a87e666128a04",
          "kind": "actual acquired body anchor",
          "anchor": "two independent Dominions",
          "lineStart": 48,
          "lineEnd": 48
        }
      },
      {
        "address": "v2.statute.day",
        "text": "15 August 1947",
        "value": "appointed day 15 August 1947",
        "source": "india1947",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/india1947.txt",
          "sha256": "486509284d713ea2fec36635289b5cb39b3ccf1a1711582eca4a87e666128a04",
          "kind": "actual acquired body anchor",
          "anchor": "fifteenth day of August",
          "lineStart": 52,
          "lineEnd": 52
        }
      }
    ],
    "attribution": "British Indian Independence Act; modern Karachi/Delhi orientation is not a city-boundary or consent claim",
    "claims": [
      "history.history-karachi-delhi-1900-1960.c1",
      "history.history-karachi-delhi-1900-1960.c2"
    ]
  },
  {
    "id": "relief",
    "label": "Delhi",
    "display": "refugee relief; resettlement",
    "fields": [
      {
        "address": "v2.relief.short",
        "text": "Refugee relief",
        "value": "Asaf Ali reports Minister of Refugees",
        "source": "core:partitionConsequences",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/partitionConsequences.txt",
          "sha256": "79b2fdd48ed432c6a141b192a521371a9e81382626a4f6fbfcb6db4c15c83fe6",
          "kind": "actual acquired body anchor",
          "anchor": "Minister of Refugees",
          "lineStart": 106,
          "lineEnd": 106
        }
      },
      {
        "address": "v2.relief.long",
        "text": "Resettlement",
        "value": "Asaf Ali reports Minister of Resettlement",
        "source": "core:partitionConsequences",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/partitionConsequences.txt",
          "sha256": "79b2fdd48ed432c6a141b192a521371a9e81382626a4f6fbfcb6db4c15c83fe6",
          "kind": "actual acquired body anchor",
          "anchor": "Minister of Resettlement",
          "lineStart": 108,
          "lineEnd": 108
        }
      }
    ],
    "attribution": "Asaf Ali account recorded by Lovett 7 October 1947; Pakistani arrangements expressly unknown",
    "claims": [
      "history.history-karachi-delhi-1900-1960.c3",
      "history.history-karachi-delhi-1900-1960.c4"
    ]
  }
];
export const REQUIRED:string[] = [
  "statute",
  "relief"
];
export const CONTEXT:Record<string,string> = {
  "relief": "Indian Assembly minority promise"
};
export const ATTACHMENTS:Record<string,string[]> = {
  "relief": [
    "v2.context.indianPromise"
  ]
};
export const PREDICTION = {
  "question": "Did naming two dominions remove the need for refugee-relief administration?",
  "options": [
    "The statute itself supplied relief and safety",
    "Delhi relief and resettlement required separate reported administrative action"
  ],
  "answer": 1
};
export const REVEAL = "The British Act appoints 15 August for two dominions. Asaf Ali’s account recorded by Lovett later reports Delhi refugee-relief and resettlement administration. The Indian Assembly minority assurance remains a promise. Neither Indian witness establishes Pakistani arrangements or assent; statutory transition did not itself administer displacement.";
export const PROVENANCE = "British Act; Asaf Ali/Lovett report Pakistani arrangements unknown";
export const RELATION = "M20 6 H120 M180 6 H280";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
