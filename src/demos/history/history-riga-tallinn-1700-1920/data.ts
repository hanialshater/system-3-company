export const lessonData = {
  "documents": [
    {
      "id": "tartu",
      "label": "1920 Tartu",
      "date": "1920-02-02",
      "source": "tallinn1920",
      "fields": [
        {
          "address": "tartu.recognizer",
          "text": "Russia (1920 treaty party) recognises",
          "value": "Russia",
          "source": "tallinn1920",
          "locator": "reproduced ArticleII",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Russia (1920 treaty party) recognises",
          "claim": "history.history-riga-tallinn-1700-1920.c1"
        },
        {
          "address": "tartu.state",
          "text": "Estonia named",
          "value": "State of Estonia",
          "source": "tallinn1920",
          "locator": "ArticleII named state, not genericBalticregion",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Estonia named",
          "claim": "history.history-riga-tallinn-1700-1920.c2"
        }
      ]
    },
    {
      "id": "riga",
      "label": "1920 Riga",
      "date": "1920-08-11",
      "source": "rigaLNTS",
      "fields": [
        {
          "address": "riga.recognizer",
          "text": "Russia (1920 treaty party) recognises",
          "value": "Russia",
          "source": "rigaLNTS",
          "locator": "LNTSvolume2 printed213 Article2",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Russia (1920 treaty party) recognises",
          "claim": "history.history-riga-tallinn-1700-1920.c3"
        },
        {
          "address": "riga.state",
          "text": "Latvia named",
          "value": "Latvian state",
          "source": "rigaLNTS",
          "locator": "same operative clause",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Latvia named",
          "claim": "history.history-riga-tallinn-1700-1920.c4"
        }
      ]
    }
  ],
  "qualifiers": [
    "Signing ≠ effect or fulfilment"
  ],
  "reveal": "Each treaty names its own state; a regional label cannot replace that evidence. Russia here means the 1920 treaty party. Signing alone does not establish entry into force; these excerpts establish neither every resident’s wishes, settled borders nor later fulfilment of treaty promises.",
  "prediction": {
    "question": "Does the Estonia treaty’s recognition alone establish Latvia’s recognition?",
    "options": [
      "Yes, both areBaltic",
      "No, check Latvia’s own treaty"
    ],
    "answer": 1
  },
  "commonNotice": "Own-English factual summaries and original schematic; not an official translation or official legal text. No source images reproduced.",
  "credit": "Source records are linked for their factual evidence. No source expression, image, layout, map, coordinates, seal or facsimile is reproduced. No blanket licence or institutional/community endorsement is implied.",
  "provenance": "Selected documentary records only. Modern city names and original endpoint ranges identify the inherited case; they do not imply continuous territorial coverage. Historical makers differ from later custodians and documentary editors.",
  "sources": [
    {
      "id": "rigaLNTS",
      "url": "https://treaties.un.org/doc/Publication/UNTS/LON/Volume%202/v2.pdf",
      "maker": "Latvia and Russia (1920 treaty party), treaty signed 11 August 1920",
      "custodian": "League of Nations Secretariat, hosted by UN",
      "type": "Contemporary treaty-series English translation of Latvia-Russia treaty",
      "language": "English translation; Latvian/Russian originals elsewhere in item",
      "locator": "Volume2 No67, printed213/PDFindex212 Article2; own summary distinguishes recognized State of Latvia; date11August1920 from item heading",
      "accessed": "2026-10-19",
      "limitation": "Actual UN-hosted PDF acquired and raw bytes pinned; operative Article2 read through web PDF extraction, printed213/PDFindex212"
    },
    {
      "id": "tallinn1920",
      "url": "https://vm.ee/en/tartu-peace",
      "maker": "Estonia and Russia (1920 treaty party), treaty signed 2 February 1920",
      "custodian": "Estonian Ministry of Foreign Affairs",
      "type": "Official reproduction of Tartu treaty ArticleII plus modern context",
      "language": "English translation",
      "locator": "ArticleII block; signing2February1920 and entered force30March1920 from surrounding institutional account; teach signing not effect",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    }
  ],
  "links": []
} as const;
