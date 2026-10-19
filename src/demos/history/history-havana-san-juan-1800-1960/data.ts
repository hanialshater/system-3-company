export const lessonData = {
  "documents": [
    {
      "id": "protocol",
      "label": "1898 Protocol",
      "date": "1898-08-12",
      "source": "havanaProtocol",
      "fields": [
        {
          "address": "protocol.cuba",
          "text": "Cuba: relinquishment promised",
          "value": "Spain will relinquish claim",
          "source": "havanaProtocol",
          "locator": "ArticleI",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Cuba: relinquishment promised",
          "claim": "history.history-havana-san-juan-1800-1960.c1"
        },
        {
          "address": "protocol.puertoRico",
          "text": "Puerto Rico: cession promised",
          "value": "Spain will cede to United States",
          "source": "havanaProtocol",
          "locator": "ArticleII",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Puerto Rico: cession promised",
          "claim": "history.history-havana-san-juan-1800-1960.c2"
        }
      ]
    },
    {
      "id": "treaty",
      "label": "1898 Treaty",
      "date": "1898-12-10",
      "source": "havanaTreaty",
      "fields": [
        {
          "address": "treaty.cuba",
          "text": "Cuba: relinquishment/occupation",
          "value": "Spain relinquishes claim; United States occupation and duties specified",
          "source": "havanaTreaty",
          "locator": "ArticleI including second paragraph",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Cuba: relinquishment/occupation",
          "claim": "history.history-havana-san-juan-1800-1960.c3"
        },
        {
          "address": "treaty.puertoRico",
          "text": "Puerto Rico: cession",
          "value": "Spain cedes to United States",
          "source": "havanaTreaty",
          "locator": "ArticleII",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Puerto Rico: cession",
          "claim": "history.history-havana-san-juan-1800-1960.c4"
        }
      ]
    }
  ],
  "qualifiers": [
    "Spain ↔ United States",
    "No resident consent established"
  ],
  "reveal": "The clauses distinguish relinquishment from cession, including US occupation obligations for Cuba. Signature differs from effect: ratifications were exchanged in April 1899. Spain and the United States’ records establish neither residents’ consent, unrestricted self-government nor either place’s whole history.",
  "prediction": {
    "question": "Do these agreements give Cuba and Puerto Rico identical clauses?",
    "options": [
      "Yes, Spain’s departure means identical arrangements",
      "No, compare the operative clauses"
    ],
    "answer": 1
  },
  "commonNotice": "Own-English factual summaries and original schematic; not an official translation or official legal text. No source images reproduced.",
  "credit": "Source records are linked for their factual evidence. No source expression, image, layout, map, coordinates, seal or facsimile is reproduced. No blanket licence or institutional/community endorsement is implied.",
  "provenance": "Selected documentary records only. Modern city names and original endpoint ranges identify the inherited case; they do not imply continuous territorial coverage. Historical makers differ from later custodians and documentary editors.",
  "sources": [
    {
      "id": "havanaProtocol",
      "url": "https://history.state.gov/historicaldocuments/frus1898/d711a",
      "maker": "Spain and United States, protocol signed 12 August 1898",
      "custodian": "US Department of State Office of the Historian",
      "type": "FRUS1898 documentary protocol, English/French",
      "language": "English and French",
      "locator": "Document711a; signed12August1898; ArticlesI/II future commitments; V/VI negotiations/hostilities",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    },
    {
      "id": "havanaTreaty",
      "url": "https://history.state.gov/historicaldocuments/frus1898/d712a",
      "maker": "Spain and United States, treaty signed 10 December 1898; ratifications exchanged 11 April 1899",
      "custodian": "US Department of State Office of the Historian",
      "type": "FRUS1898 Treaty of Paris documentary bilingual text",
      "language": "English and Spanish",
      "locator": "Document712a; ArticlesI/II, preamble signed10December1898 and ratifications exchanged11April1899",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    }
  ],
  "links": []
} as const;
