export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "congo",
    "label": "1960-06-30",
    "display": "Congo independence Léopoldville FRUS editorial",
    "fields": [
      {
        "address": "v2.congo.event",
        "text": "Independent 30 June 1960",
        "value": "Congo independence on 30 June 1960",
        "source": "core:congoImplementation",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/congoImplementation.txt",
          "sha256": "8b3c2df6de6f2d38bc93f0df082fc17fb6b502719a36f6781ba5a6097f18e1b4",
          "kind": "actual acquired body anchor",
          "anchor": "On June 30, 1960",
          "lineStart": 59,
          "lineEnd": 59
        }
      },
      {
        "address": "v2.congo.city",
        "text": "Léopoldville",
        "value": "capital Léopoldville, modern Kinshasa orientation",
        "source": "core:congoImplementation",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/congoImplementation.txt",
          "sha256": "8b3c2df6de6f2d38bc93f0df082fc17fb6b502719a36f6781ba5a6097f18e1b4",
          "kind": "actual acquired body anchor",
          "anchor": "capital at Léopoldville",
          "lineStart": 59,
          "lineEnd": 59
        }
      }
    ],
    "attribution": "FRUS modern editorial note summarizing independence and embassy transition",
    "claims": [
      "history.history-luanda-kinshasa-1880-1960.c1",
      "history.history-luanda-kinshasa-1880-1960.c2"
    ]
  },
  {
    "id": "angola",
    "label": "Angola",
    "display": "Portuguese claim US policy",
    "fields": [
      {
        "address": "v2.angola.claim",
        "text": "Portuguese claim",
        "value": "U.S. policy account of Portuguese integral-parts claim",
        "source": "core:angolaPolicy",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/angolaPolicy.txt",
          "sha256": "0cea0f3d103a9e9a2195aed751b6c44a1631e4ab71a38625ae3ffd08cdc7312d",
          "kind": "actual acquired body anchor",
          "anchor": "integral parts of Portugal",
          "lineStart": 310,
          "lineEnd": 310
        }
      }
    ],
    "attribution": "NSC 6001 U.S. policy account 19 January 1960; attribution is not endorsement or Luanda office evidence",
    "claims": [
      "history.history-luanda-kinshasa-1880-1960.c3"
    ]
  },
  {
    "id": "voice",
    "label": "Lumumba",
    "display": "coercion MJP French edition",
    "fields": [
      {
        "address": "v2.voice.experience",
        "text": "Coercion recalled",
        "value": "Lumumba attributed account of discrimination/coercion",
        "source": "cd1960ind",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/cd1960ind.txt",
          "sha256": "8e47736be1f9a94a61b24acb690e3db51e7d712dea19d41eba9a640f3cfdf096",
          "kind": "actual acquired body anchor",
          "anchor": "Nous avons connu les ironies",
          "lineStart": 405,
          "lineEnd": 405
        }
      }
    ],
    "attribution": "MJP French edition of Lumumba’s distinct independence speech, not all Congolese opinion",
    "claims": [
      "history.history-luanda-kinshasa-1880-1960.c4"
    ]
  },
  {
    "id": "independence1975",
    "label": "1975-11-11",
    "display": "Luanda Largo da Independência proclamation Modern provincial account",
    "fields": [
      {
        "address": "v3.angola.proclamationDate",
        "text": "11 November 1975",
        "value": "modern provincial account dates independence proclamation 11 November 1975",
        "source": "core:luandaProclamationSite",
        "locator": "Web extractionL43, actual acquired institutional account",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-luandaProclamationSite.web.json",
          "sha256": "0b7343d9df373998732e47f8c9e67327e5841cc8dc58e19be5cebbec917aac4e",
          "kind": "actual acquired body anchor",
          "anchor": "a 11 de novembro de 1975",
          "lineStart": 16,
          "lineEnd": 16
        }
      },
      {
        "address": "v3.angola.proclamationSite",
        "text": "Luanda; Largo da Independência",
        "value": "modern provincial account places proclamation at Largo da Independência",
        "source": "core:luandaProclamationSite",
        "locator": "Web extractionL43; modern site account, not literal act",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-luandaProclamationSite.web.json",
          "sha256": "0b7343d9df373998732e47f8c9e67327e5841cc8dc58e19be5cebbec917aac4e",
          "kind": "actual acquired body anchor",
          "anchor": "O Largo da Independência foi o palco da proclamação",
          "lineStart": 16,
          "lineEnd": 16
        }
      }
    ],
    "attribution": "Luanda provincial government modern site account: Largo da Independência proclamation on 11November1975; not a collated historical proclamation or an account of every political actor.",
    "claims": [
      "history.history-luanda-kinshasa-1880-1960.c5",
      "history.history-luanda-kinshasa-1880-1960.c6"
    ]
  }
];
export const REQUIRED:string[] = [
  "congo",
  "angola",
  "voice",
  "independence1975"
];
export const CONTEXT:Record<string,string> = {};
export const ATTACHMENTS:Record<string,string[]> = {};
export const PREDICTION = {
  "question": "Do the selected Congo and Angola witnesses show one simultaneous independence transition?",
  "options": [
    "One transition",
    "Separate transitions"
  ],
  "answer": 1
};
export const REVEAL = "FRUS’s editorial account places Congo independence at Léopoldville on 30 June 1960. Luanda’s modern provincial account dates the Largo da Independência proclamation to 11 November 1975. U.S. policy attributes Portugal’s Angola claim; Lumumba recalls coercion. Separate transitions establish neither universal consent nor peaceful outcomes.";
export const PROVENANCE = "";
export const RELATION = "M15 3 h120 v6 h-120z M165 3 h120 v6 h-120z";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
