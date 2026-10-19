export const lessonData = {
  "documents": [
    {
      "id": "guarantee",
      "label": "15/27 March 1809",
      "date": "1809-03-27",
      "source": "fin1809",
      "fields": [
        {
          "address": "guarantee.maker",
          "text": "Emperor and Grand Duke",
          "value": "Alexander I, Emperor of Russia and Grand Duke of Finland",
          "source": "fin1809",
          "locator": "Acte de garantie opening styles",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Emperor and Grand Duke",
          "claim": "history.history-helsinki-stockholm-1700-1920.c1"
        },
        {
          "address": "guarantee.promise",
          "text": "Existing privileges promised",
          "value": "promise to maintain fundamental laws and existing rights/privileges",
          "source": "fin1809",
          "locator": "operative guarantee,15/27March1809 dualdate",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Existing privileges promised",
          "claim": "history.history-helsinki-stockholm-1700-1920.c2"
        }
      ],
      "datePrecision": "Source dates15/27March1809; machine ordering uses27March, no single-calendar date taught."
    },
    {
      "id": "constitution",
      "label": "1919 Constitution",
      "date": "1919-07-17",
      "source": "fin1919",
      "fields": [
        {
          "address": "constitution.form",
          "text": "Sovereign republic",
          "value": "Finland is a sovereign republic",
          "source": "fin1919",
          "locator": "original §1",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Sovereign republic",
          "claim": "history.history-helsinki-stockholm-1700-1920.c3"
        },
        {
          "address": "constitution.lawmaking",
          "text": "Parliament with president",
          "value": "legislative power by parliament with republic’s president",
          "source": "fin1919",
          "locator": "original §2, legislative-power paragraph in downloaded embedded page data",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Parliament with president",
          "claim": "history.history-helsinki-stockholm-1700-1920.c4"
        }
      ]
    }
  ],
  "qualifiers": [
    "French edition",
    "Promise ≠ fulfilment"
  ],
  "reveal": "The French edition records the 15/27 March 1809 promise, not fulfilment or republican government. It remains uncollated against an 1809 original. The 1919 constitution’s legislative power includes parliament with president; these texts establish neither equal rights nor all Finnish, Sámi or Swedish-speaking residents’ consent.",
  "prediction": {
    "question": "Does an emperor’s guarantee of fundamental laws establish a republic?",
    "options": [
      "Yes, protected laws imply a republic",
      "No, form of government needs separate evidence"
    ],
    "answer": 1
  },
  "commonNotice": "Own-English factual summaries and original schematic; not an official translation or official legal text. No source images reproduced.",
  "credit": "Source records are linked for their factual evidence. No source expression, image, layout, map, coordinates, seal or facsimile is reproduced. No blanket licence or institutional/community endorsement is implied.",
  "provenance": "Selected documentary records only. Modern city names and original endpoint ranges identify the inherited case; they do not imply continuous territorial coverage. Historical makers differ from later custodians and documentary editors.",
  "sources": [
    {
      "id": "fin1809",
      "url": "https://mjp.univ-perp.fr/constit/fin1809.htm",
      "maker": "Alexander I, Emperor and Grand Duke; guarantee dated 15/27 March 1809; Paris 1900 French collection",
      "custodian": "University of Perpignan DigithèqueMJP",
      "type": "French documentary transcription attributed to La Constitution du grand-Duché de Finlande, Recueil des lois fondamentales, Paris1900",
      "language": "French",
      "locator": "Acte de garantie operative body after source note, signed Borgo15/27March1809; not the modern historical preface",
      "accessed": "2026-10-19",
      "limitation": "acquired via system curl with ordinary TLS validation; actual operative French body read"
    },
    {
      "id": "fin1919",
      "url": "https://www.finlex.fi/fi/lainsaadanto/saadoskokoelma/1919/94-001",
      "maker": "Finnish legislature, Constitution Act 17 July 1919",
      "custodian": "Finlex / Finnish Ministry of Justice",
      "type": "Official original1919 constitutional text in embedded page-data body",
      "language": "Finnish",
      "locator": "94-001/1919,17July1919, original §§1/2; page shell hides body from web extraction, actual downloaded HTML contains source text and section IDs",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    }
  ],
  "links": []
} as const;
