export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "reorganise",
    "label": "1905",
    "display": "Reorganization",
    "fields": [
      {
        "address": "v2.reorganise.class",
        "text": "Reorganization",
        "value": "colonial administrative reorganization discussed in 1906",
        "source": "core:bengal1905",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/bengal1905.txt",
          "sha256": "2bb258c840107c83da5697386fa6a0709c559ecc0a139d84dd75f54c9e99da27",
          "kind": "actual acquired body anchor",
          "anchor": "Eastern Bengal was added to Assam",
          "lineStart": 23,
          "lineEnd": 23
        }
      }
    ],
    "attribution": "1906 Hansard debate about already enacted 1905 change; speaker motives excluded",
    "claims": [
      "history.history-dhaka-kolkata-1900-1994.c1"
    ]
  },
  {
    "id": "announce",
    "label": "1911",
    "display": "Announced reorganization",
    "fields": [
      {
        "address": "v2.announce.class",
        "text": "Reorganization announced",
        "value": "announced Bengal/Bihar-Orissa/Assam administrative change",
        "source": "core:bengal1911",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/bengal1911.txt",
          "sha256": "c2a4a2d84a36253907f61c55ab6cc601d0fd2bf199b916a5456471121a8d11e8",
          "kind": "actual acquired body anchor",
          "anchor": "a Governorship for the Presidency of Bengal",
          "lineStart": 22,
          "lineEnd": 22
        }
      }
    ],
    "attribution": "King’s announcement reproduced in Commons; implementation distinct",
    "claims": [
      "history.history-dhaka-kolkata-1900-1994.c2"
    ]
  },
  {
    "id": "partition",
    "label": "1947",
    "display": "Partition",
    "fields": [
      {
        "address": "v2.partition.class",
        "text": "Partition",
        "value": "Bengal province ceases; East/West Bengal provinces",
        "source": "india1947",
        "locator": "Indian Independence Act1947, §3(1)(a–b), normalized64–67; Bengal cessation and East/West provinces, not first Bengal hit in§2 at57",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/india1947.txt",
          "sha256": "486509284d713ea2fec36635289b5cb39b3ccf1a1711582eca4a87e666128a04",
          "kind": "actual acquired body anchor",
          "anchor": "(a)the Province of Bengal, as constituted under the [26 Geo. 5 & 1 Edw. 8. c. 2.] Government of India Act, 1935, shall cease to exist; and\n(b)there shall be constituted in lieu thereof two new Provinces, to be known respectively as East Bengal and West Bengal.",
          "lineStart": 66,
          "lineEnd": 67
        }
      }
    ],
    "attribution": "British 1947 Act; sovereignty does not imply safe movement",
    "claims": [
      "history.history-dhaka-kolkata-1900-1994.c3"
    ]
  },
  {
    "id": "proclaim",
    "label": "1971",
    "display": "Mujibnagar independence 10 April; effect 26 March",
    "fields": [
      {
        "address": "v2.proclaim.class",
        "text": "Independence proclaimed",
        "value": "Bangladesh independence proclamation",
        "source": "core:dhakaOfficialGazette2011",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/dhakaOfficialGazette2011.txt",
          "sha256": "c9a0d3016bd7111aa2cbf26db18d1842d02844c5719837ba972226cfeff9bbde",
          "kind": "actual acquired body anchor",
          "anchor": "sovereign People's Republic",
          "lineStart": 1701,
          "lineEnd": 1701
        }
      },
      {
        "address": "v2.proclaim.dates",
        "text": "10 April; effect 26 March",
        "value": "10 April instrument asserts effect 26 March 1971",
        "source": "core:dhakaOfficialGazette2011",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/dhakaOfficialGazette2011.txt",
          "sha256": "c9a0d3016bd7111aa2cbf26db18d1842d02844c5719837ba972226cfeff9bbde",
          "kind": "actual acquired body anchor",
          "anchor": "Dated 10th day of April, 1971.",
          "lineStart": 1653,
          "lineEnd": 1653
        }
      }
    ],
    "attribution": "Mujibnagar instrument reproduced in official 2011 Gazette; not contemporaneous 1971 print",
    "claims": [
      "history.history-dhaka-kolkata-1900-1994.c4",
      "history.history-dhaka-kolkata-1900-1994.c5"
    ]
  }
];
export const REQUIRED:string[] = [
  "reorganise",
  "announce",
  "partition",
  "proclaim"
];
export const CONTEXT:Record<string,string> = {};
export const ATTACHMENTS:Record<string,string[]> = {};
export const PREDICTION = {
  "question": "Do all four selected years represent the same kind of independence event?",
  "options": [
    "Four identical independence events",
    "Administrative changes, partition and an independence proclamation are different classes"
  ],
  "answer": 1
};
export const REVEAL = "Hansard distinguishes 1905 reorganization from 1911 announced changes; the British Act partitions Bengal in 1947. The 2011 Gazette reproduces Mujibnagar’s 10 April 1971 proclamation, asserting effect from 26 March. These differ from one another; they establish neither Dacca’s 1905 seat nor safe migration.";
export const PROVENANCE = "Hansard; British Act; Bangladesh 2011 Gazette reproduction";
export const RELATION = "M15 3 h120 v6 h-120z M165 3 h120 v6 h-120z";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
