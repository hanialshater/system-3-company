export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "origin",
    "label": "Before",
    "display": "Saint-Louis",
    "fields": [
      {
        "address": "v2.origin.office",
        "text": "Saint-Louis",
        "value": "Mauritanian administration at Saint-Louis",
        "source": "core:nouakchottInterview",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/nouakchottInterview.txt",
          "sha256": "5874dbfef0751318a81c016f0486999d0e511f9b637164ea1cb6302a928ecab6",
          "kind": "actual acquired body anchor",
          "anchor": "Nous étions à Saint-Louis alors capitale de la Mauritanie",
          "lineStart": 50,
          "lineEnd": 50
        }
      }
    ],
    "attribution": "Kane Yahya recollection, AMI/Horizons interview 2010; not contemporary decree",
    "claims": [
      "history.history-nouakchott-saint-louis-1900-1960.c1"
    ]
  },
  {
    "id": "move",
    "label": "Decision",
    "display": "1957",
    "fields": [
      {
        "address": "v2.move.year",
        "text": "1957",
        "value": "decision to transfer into Mauritania in 1957",
        "source": "core:nouakchottInterview",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/nouakchottInterview.txt",
          "sha256": "5874dbfef0751318a81c016f0486999d0e511f9b637164ea1cb6302a928ecab6",
          "kind": "actual acquired body anchor",
          "anchor": "la transférer en Mauritanie en 1957",
          "lineStart": 62,
          "lineEnd": 62
        }
      }
    ],
    "attribution": "Same attributed 2010 recollection; exact physical move day not established",
    "claims": [
      "history.history-nouakchott-saint-louis-1900-1960.c2"
    ]
  },
  {
    "id": "arrival",
    "label": "After",
    "display": "Nouakchott Classroom assembly",
    "fields": [
      {
        "address": "v2.arrival.city",
        "text": "Nouakchott",
        "value": "early improvised Nouakchott offices",
        "source": "core:nouakchottInterview",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/nouakchottInterview.txt",
          "sha256": "5874dbfef0751318a81c016f0486999d0e511f9b637164ea1cb6302a928ecab6",
          "kind": "actual acquired body anchor",
          "anchor": "on s’est installé à Nouakchott",
          "lineStart": 62,
          "lineEnd": 62
        }
      },
      {
        "address": "v2.arrival.facility",
        "text": "Classroom assembly",
        "value": "classroom used as assembly",
        "source": "core:nouakchottInterview",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/nouakchottInterview.txt",
          "sha256": "5874dbfef0751318a81c016f0486999d0e511f9b637164ea1cb6302a928ecab6",
          "kind": "actual acquired body anchor",
          "anchor": "une salle de classe avait été transformée en Assemblée nationale",
          "lineStart": 62,
          "lineEnd": 62
        }
      }
    ],
    "attribution": "Same recollection of early facilities; not evidence of an uninhabited prior site",
    "claims": [
      "history.history-nouakchott-saint-louis-1900-1960.c3",
      "history.history-nouakchott-saint-louis-1900-1960.c4"
    ]
  }
];
export const REQUIRED:string[] = [
  "origin",
  "move",
  "arrival"
];
export const CONTEXT:Record<string,string> = {};
export const ATTACHMENTS:Record<string,string[]> = {};
export const PREDICTION = {
  "question": "Did the recollection place the same administration in Nouakchott all along?",
  "options": [
    "Nouakchott all along",
    "Saint-Louis first; a 1957 decision and later Nouakchott offices"
  ],
  "answer": 1
};
export const REVEAL = "Kane Yahya’s 2010 interview recalls administration in Saint-Louis, a 1957 transfer decision, and improvised Nouakchott offices, including a classroom assembly. This participant recollection supplies neither the contemporary decree nor an exact move date; it does not establish an empty earlier site or universal agreement.";
export const PROVENANCE = "Kane Yahya’s 2010 AMI interview Not an empty-site claim";
export const RELATION = "M20 6 H280 M270 1 L280 6 L270 11";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
