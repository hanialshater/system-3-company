export const lessonData = {
  "documents": [
    {
      "id": "union",
      "label": "1800 Act",
      "date": "1800-07-02",
      "source": "irish1800",
      "fields": [
        {
          "address": "union.parliament",
          "text": "Act provides united parliament",
          "value": "Parliament of the United Kingdom of Great Britain and Ireland",
          "source": "irish1800",
          "locator": "Article Third",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Act provides united parliament",
          "claim": "history.history-dublin-london-1700-1960.c1"
        },
        {
          "address": "union.start",
          "text": "Union from 1801",
          "value": "1801-01-01",
          "source": "irish1800",
          "locator": "Article First",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Union from 1801",
          "claim": "history.history-dublin-london-1700-1960.c2"
        }
      ]
    },
    {
      "id": "constitution",
      "label": "1922 Text",
      "date": "1922",
      "source": "irish1922",
      "fields": [
        {
          "address": "constitution.parliament",
          "text": "Text provides Oireachtas: King + two houses",
          "value": [
            "King",
            "Dáil Éireann",
            "Seanad Éireann"
          ],
          "source": "irish1922",
          "locator": "First Schedule Article12",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Text provides Oireachtas: King + two houses",
          "claim": "history.history-dublin-london-1700-1960.c3"
        },
        {
          "address": "constitution.location",
          "text": "Dublin or chosen place",
          "value": "in or near Dublin, or another place determined by Oireachtas",
          "source": "irish1922",
          "locator": "First Schedule Article13",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Dublin or chosen place",
          "claim": "history.history-dublin-london-1700-1960.c4"
        }
      ]
    }
  ],
  "qualifiers": [
    "Partition: text ≠ territorial operation"
  ],
  "reveal": "Royal connection does not identify the legislature; Oireachtas chooses its location. Partition matters: these constitutional provisions establish neither territorial operation nor an uncontested all-island settlement. They establish neither everyone’s consent nor identical rights; a text’s provisions are not their implementation.",
  "prediction": {
    "question": "Does retaining a king establish that the same parliament continues?",
    "options": [
      "Yes, the king determines the parliament",
      "No, check the legislature separately"
    ],
    "answer": 1
  },
  "commonNotice": "Own-English factual summaries and original schematic; not an official translation or official legal text. No source images reproduced.",
  "credit": "Source records are linked for their factual evidence. No source expression, image, layout, map, coordinates, seal or facsimile is reproduced. No blanket licence or institutional/community endorsement is implied. © Government of Ireland / Houses of the Oireachtas. Houses of the Oireachtas source attribution; changed own-English nonofficial summaries, not official legislation. Source notices and disclaimers apply by reference to the linked PSI policy. Crown / legislation.gov.uk statutory source credit under the linked OGLv3.",
  "provenance": "Selected documentary records only. Modern city names and original endpoint ranges identify the inherited case; they do not imply continuous territorial coverage. Historical makers differ from later custodians and documentary editors.",
  "sources": [
    {
      "id": "irish1800",
      "url": "https://www.legislation.gov.uk/apgb/Geo3/39-40/67/data.xht?view=snippet&wrap=true",
      "maker": "Parliaments of Great Britain and Ireland, 1800; Crown statutory record",
      "custodian": "UK legislation.gov.uk",
      "type": "Official revised statutory text containing annotated historical operative ArticlesI/III",
      "language": "English",
      "locator": "Articles First and Third; use unchanged operative clauses, not modern amendment annotations",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    },
    {
      "id": "irish1922",
      "url": "https://www.irishstatutebook.ie/eli/1922/act/1/schedule/1/enacted/en/html",
      "maker": "Irish legislature, Constitution of the Irish Free State (Saorstát Éireann) Act 1922",
      "custodian": "Irish Statute Book",
      "type": "Official as-enacted First Schedule",
      "language": "English",
      "locator": "Articles1,12,13; boundary/commencement must use whole Act and Scheduled Treaty, not Article12 alone",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    }
  ],
  "links": [
    {
      "label": "Irish PSI licence, attribution and disclaimers",
      "url": "https://www.oireachtas.ie/en/copyright-and-reuse/"
    },
    {
      "label": "UK legislation OGLv3 reuse provenance",
      "url": "https://legislation.github.io/data-documentation/reuse-licence.html"
    }
  ]
} as const;
