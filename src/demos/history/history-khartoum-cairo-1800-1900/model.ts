export interface State {active:string|null;loaded:string[];contexts:string[]}
export type Action={type:"select";id:string}|{type:"reset"}|{type:"restart"};
export const initialState=():State=>({active:null,loaded:[],contexts:[]});
export const DOCUMENTS = [
  {
    "id": "governance",
    "label": "1887",
    "display": "Mahdist council Durham catalogue",
    "fields": [
      {
        "address": "v3.mahdi.administration",
        "text": "Mahdist administration under Abdallahi",
        "value": "Durham describes Mahdist administrations under the Mahdi and successor Khalifa Abdallahi",
        "source": "core:mahdiDurham",
        "locator": "Local normalized catalogue29–31; institutional context, not literal historical decree",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/mahdiDurham.txt",
          "sha256": "763a6027ea1aa8034af7684f8cb23a339a1296c7a3ee9b8e55cabaec13a06e27",
          "kind": "actual acquired body anchor",
          "anchor": "produced or collected by the Mahdist administrations under",
          "lineStart": 29,
          "lineEnd": 29
        }
      },
      {
        "address": "v3.mahdi.council",
        "text": "Council project 1887",
        "value": "Durham describes Khalifa Abdallahi’s council discussing a second lithographed edition in April/May 1887",
        "source": "core:mahdiDurham",
        "locator": "Local normalized catalogue292–295, SAD.99/3; described council project, not independently inspected council proceeding",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/mahdiDurham.txt",
          "sha256": "763a6027ea1aa8034af7684f8cb23a339a1296c7a3ee9b8e55cabaec13a06e27",
          "kind": "actual acquired body anchor",
          "anchor": "The Khalifa `Abd Allahi's council in Shaʿbān 1304",
          "lineStart": 292,
          "lineEnd": 292
        }
      }
    ],
    "attribution": "Durham modern catalogue identifies Mahdist administrations under the Mahdi and successor Khalifa Abdallahi; its council description is custodial institutional history, not an inspected council minute or proof of uninterrupted Khartoum control.",
    "claims": [
      "history.history-khartoum-cairo-1800-1900.c1",
      "history.history-khartoum-cairo-1800-1900.c2"
    ]
  },
  {
    "id": "mahdi",
    "label": "c.1896–97",
    "display": "Menelik→Abdallahi English abstract; translator unknown; Arabic uncollated",
    "fields": [
      {
        "address": "v2.mahdi.sender",
        "text": "Menelik II",
        "value": "Menelik II diplomatic sender",
        "source": "core:mahdiDurham",
        "locator": "Durham catalogue SAD.101/22/1-2, normalized574–579 (identity sentence576); circa1896–1897 and English translation. Catalogue Menilik/display Menelik is transliteration. Image2 is English abstract-content witness only, not sender heading. No Arabic collation or translator identity.",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/mahdiDurham.txt",
          "sha256": "763a6027ea1aa8034af7684f8cb23a339a1296c7a3ee9b8e55cabaec13a06e27",
          "kind": "actual acquired body anchor",
          "anchor": "Abstract of a despatch from Menilik II, Emperor of Ethiopia to the Khalīfah `Abd Allāhi",
          "lineStart": 576,
          "lineEnd": 576
        }
      },
      {
        "address": "v2.mahdi.recipient",
        "text": "Khalifa Abdallahi",
        "value": "Mahdist diplomatic recipient",
        "source": "core:mahdiDurham",
        "locator": "Durham catalogue SAD.101/22/1-2, normalized574–579 (identity sentence576); circa1896–1897 and English translation. Catalogue Menilik/display Menelik is transliteration. Image2 is English abstract-content witness only, not sender heading. No Arabic collation or translator identity.",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-purpose-bodies/mahdiDurham.txt",
          "sha256": "763a6027ea1aa8034af7684f8cb23a339a1296c7a3ee9b8e55cabaec13a06e27",
          "kind": "actual acquired body anchor",
          "anchor": "Abstract of a despatch from Menilik II, Emperor of Ethiopia to the Khalīfah `Abd Allāhi",
          "lineStart": 576,
          "lineEnd": 576
        }
      }
    ],
    "attribution": "Durham Wingate English abstract, SAD.101/22/2/H.204; translator unknown, approximate custodian date, no Arabic collation",
    "claims": [
      "history.history-khartoum-cairo-1800-1900.c3",
      "history.history-khartoum-cairo-1800-1900.c4"
    ]
  },
  {
    "id": "agreement",
    "label": "1899",
    "display": "Appointment: Khedive, British recommendation Removal: British consent MJP French edition",
    "fields": [
      {
        "address": "v2.agreement.appointer",
        "text": "Khedive appoints",
        "value": "governor-general appointment by Egyptian Khedive",
        "source": "sd1899",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/sd1899.txt",
          "sha256": "6fc5fc1422dfabdbea3f185ee0023658c1d4efa0b771b5b6e8b740284cfecfe7",
          "kind": "actual acquired body anchor",
          "anchor": "Il sera nommé par décret\nkhédivial",
          "lineStart": 99,
          "lineEnd": 100
        }
      },
      {
        "address": "v2.agreement.constraint",
        "text": "British recommendation",
        "value": "British recommendation and removal consent",
        "source": "sd1899",
        "locator": "Acquired normalized body anchor; line numbers are local extraction lines",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/sd1899.txt",
          "sha256": "6fc5fc1422dfabdbea3f185ee0023658c1d4efa0b771b5b6e8b740284cfecfe7",
          "kind": "actual acquired body anchor",
          "anchor": "recommandation",
          "lineStart": 100,
          "lineEnd": 100
        }
      },
      {
        "address": "v4.agreement.removal",
        "text": "Removal requires British consent",
        "value": "Article3 removal requires decree with British government consent",
        "source": "sd1899",
        "locator": "Article3, normalized102",
        "claimStatus": "unverified",
        "support": "source",
        "openedWitness": {
          "path": "/tmp/history-next15-source-bodies/sd1899.txt",
          "sha256": "6fc5fc1422dfabdbea3f185ee0023658c1d4efa0b771b5b6e8b740284cfecfe7",
          "kind": "actual acquired body anchor",
          "anchor": "par décret rendu avec le consentement du gouvernement britannique",
          "lineStart": 102,
          "lineEnd": 102
        }
      }
    ],
    "attribution": "MJP French edition of Anglo-Egyptian agreement; prescription, not Sudanese/Mahdist assent Mandatory loaded qualification: Khedive appoints on British recommendation; removal requires British consent.",
    "claims": [
      "history.history-khartoum-cairo-1800-1900.c5",
      "history.history-khartoum-cairo-1800-1900.c6",
      "history.history-khartoum-cairo-1800-1900.c7"
    ]
  }
];
export const REQUIRED:string[] = [
  "governance",
  "mahdi",
  "agreement"
];
export const CONTEXT:Record<string,string> = {};
export const ATTACHMENTS:Record<string,string[]> = {};
export const PREDICTION = {
  "question": "Do the acquired accounts describe one unchanged governing relation?",
  "options": [
    "Same governing relation",
    "Different governing relations"
  ],
  "answer": 1
};
export const REVEAL = "Durham’s catalogue describes Abdallahi’s Mahdist administration/council. Its circa 1896–97 English diplomatic abstract has an unknown translator; Arabic is uncollated. MJP’s 1899 French edition prescribes Khedive appointment on British recommendation; removal requires British consent. These mediated witnesses establish neither continuous control nor assent.";
export const PROVENANCE = "";
export const RELATION = "M20 6 H120 M180 6 H280";
export function transition(state:State,action:Action):State{
 if(action.type==="restart")return initialState();
 if(action.type==="reset")return {...state,active:null};
 if(!DOCUMENTS.some(d=>d.id===action.id))return state;
 return {active:action.id,loaded:state.loaded.includes(action.id)?state.loaded:[...state.loaded,action.id],contexts:[...new Set([...state.contexts,...(ATTACHMENTS[action.id]??[])])]};
}
export function earned(state:State):boolean{return REQUIRED.every(id=>state.loaded.includes(id))&&Object.values(ATTACHMENTS).flat().every(id=>state.contexts.includes(id));}
export function compare(ids:string[]):{records:typeof DOCUMENTS;unknown:string[]}{return {records:DOCUMENTS.filter(d=>ids.includes(d.id)),unknown:ids.filter(id=>!DOCUMENTS.some(d=>d.id===id))};}
