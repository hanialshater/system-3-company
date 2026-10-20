export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "coast",
    "label": "1802",
    "display": "Batavian holdings → Britain",
    "fields": [
      {
        "address": "v2.coast.scope",
        "text": "Batavian holdings",
        "value": "Batavian possessions/establishments in Ceylon",
        "source": "amiens1802",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/amiens1802.txt",
          "sha256": "3fe3724b209cd4b87e30e47224f67e088a66cfc1d6f5db00fa558249079a697c",
          "kind": "actual acquired body anchor",
          "anchor": "possessions et établissemens",
          "lineStart": 163,
          "lineEnd": 163
        }
      },
      {
        "address": "v2.coast.relation",
        "text": "Coastal context",
        "value": "coastal cession distinct from Kandyan treaty context",
        "source": "kandyContext",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/kandyContext-context.web.txt",
          "sha256": "7f06d9b88e91988bd81466e7e36ea29fe7e82044734090ec8f2c562896b9a94c",
          "kind": "actual acquired body anchor",
          "anchor": "coastal",
          "lineStart": 4,
          "lineEnd": 4
        }
      },
      {
        "address": "v4.coast.recipient",
        "text": "Ceded to Britain",
        "value": "Article V Batavian holdings ceded to British monarch",
        "source": "amiens1802",
        "locator": "Amiens Article V normalized159–166",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/amiens1802.txt",
          "sha256": "3fe3724b209cd4b87e30e47224f67e088a66cfc1d6f5db00fa558249079a697c",
          "kind": "actual acquired body anchor",
          "anchor": "et souveraineté, à sa majesté Britannique, toutes",
          "lineStart": 162,
          "lineEnd": 162
        }
      }
    ],
    "attribution": "French Amiens edition plus Sri Lanka archival context; Article V does not itself name Colombo. The specified transfer recipient is the British monarch.",
    "claims": [
      "history.history-colombo-kandy-1700-1900.c1",
      "history.history-colombo-kandy-1700-1900.c2",
      "history.history-colombo-kandy-1700-1900.c3"
    ]
  },
  {
    "id": "kandy",
    "label": "1815",
    "display": "Kandyan provinces: British sovereignty; rights reserved; Buddhist protection promised",
    "fields": [
      {
        "address": "v2.kandy.scope",
        "text": "Kandyan provinces",
        "value": "distinct Kandyan convention/provinces",
        "source": "kandy1815",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/kandy1815.txt",
          "sha256": "d98a9c2b994817cc58fe4f6b5e7ec9d1f3770f2065199ffd7daa4bab8b03183a",
          "kind": "actual acquired body anchor",
          "anchor": "Kandyan",
          "lineStart": 7,
          "lineEnd": 7
        }
      },
      {
        "address": "v2.kandy.rights",
        "text": "Reserved rights; protection promised",
        "value": "chiefs/customary rights reserved; Buddhist protection promised",
        "source": "kandy1815",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/kandy1815.txt",
          "sha256": "d98a9c2b994817cc58fe4f6b5e7ec9d1f3770f2065199ffd7daa4bab8b03183a",
          "kind": "actual acquired body anchor",
          "anchor": "Boodho",
          "lineStart": 10,
          "lineEnd": 10
        }
      },
      {
        "address": "v4.kandy.authority",
        "text": "British sovereignty; rights reserved",
        "value": "Article4 Kandyan dominion vested in Sovereign of British Empire, with reserved chief/customary rights",
        "source": "kandy1815",
        "locator": "Convention Article4, normalized9",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/kandy1815.txt",
          "sha256": "d98a9c2b994817cc58fe4f6b5e7ec9d1f3770f2065199ffd7daa4bab8b03183a",
          "kind": "actual acquired body anchor",
          "anchor": "The dominion of the Kandyan provinces is vested in the Sovereign of the British Empire",
          "lineStart": 9,
          "lineEnd": 9
        }
      }
    ],
    "attribution": "English reproduction; Sinhala original not collated; later resistance is independently attributed archive context. The specified authority holder is the British sovereign/Empire; reserved rights and promised protection are not universal equality or fulfilment.",
    "claims": [
      "history.history-colombo-kandy-1700-1900.c4",
      "history.history-colombo-kandy-1700-1900.c5",
      "history.history-colombo-kandy-1700-1900.c6"
    ]
  }
];
export const REQUIRED:string[] = [
  "coast",
  "kandy"
];
export const CONTEXT:Record<string,string> = {
  "kandy": "Sri Lanka archive: resistance"
};
export const ATTACHMENTS:Record<string,string[]> = {
  "kandy": [
    "v2.context.resistance"
  ]
};
export const PREDICTION = {
  "question": "Did the 1802 Batavian cession itself transfer the distinct Kandyan polity?",
  "options": [
    "Same territorial scope",
    "Different territorial scopes"
  ],
  "answer": 1
};
export const REVEAL = "Amiens’s French edition cedes Batavian holdings to Britain. The English-reproduced Kandyan convention vests British sovereignty, reserves chiefs’/customary rights and promises Buddhist protection; Sinhala original uncollated. Sri Lanka’s archive records resistance. Neither establishes universal consent, fulfilled protection or equal lived rights.";
export const PROVENANCE = "MJP French edition; English reproduction; Sinhala uncollated";
export const RELATION = "M15 2 h100 v8 h-100z M165 2 h120 v8 h-120z";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
