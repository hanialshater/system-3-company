export const lessonData = {
  "documents": [
    {
      "id": "north",
      "label": "1867 Schedule",
      "date": "1867-04-16",
      "source": "german1867",
      "fields": [
        {
          "address": "north.prussia",
          "text": "Prussia 17",
          "value": 17,
          "source": "german1867",
          "locator": "original Article6",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Prussia 17",
          "claim": "history.history-berlin-munich-1700-1900.c1"
        },
        {
          "address": "north.total",
          "text": "Total 43",
          "value": 43,
          "source": "german1867",
          "locator": "original Article6 complete list/total",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Total 43",
          "claim": "history.history-berlin-munich-1700-1900.c2"
        },
        {
          "address": "north.bavaria",
          "text": "Bavaria: outside membership",
          "value": false,
          "source": "german1867",
          "locator": "original Article1 exhaustive members; no0-vote-member inference",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Bavaria: outside membership",
          "claim": "history.history-berlin-munich-1700-1900.c3"
        }
      ]
    },
    {
      "id": "empire",
      "label": "1871 Schedule",
      "date": "1871-04-16",
      "source": "german1871",
      "fields": [
        {
          "address": "empire.prussia",
          "text": "Prussia 17",
          "value": 17,
          "source": "german1871",
          "locator": "original Article6",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Prussia 17",
          "claim": "history.history-berlin-munich-1700-1900.c4"
        },
        {
          "address": "empire.total",
          "text": "Total 58",
          "value": 58,
          "source": "german1871",
          "locator": "original Article6 complete list/total",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Total 58",
          "claim": "history.history-berlin-munich-1700-1900.c5"
        },
        {
          "address": "empire.bavaria",
          "text": "Bavaria 6",
          "value": 6,
          "source": "german1871",
          "locator": "original Articles1/6",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Bavaria 6",
          "claim": "history.history-berlin-munich-1700-1900.c6"
        }
      ]
    }
  ],
  "qualifiers": [
    "Bundesrat votes allocated to state governments",
    "Share ≠ practical power"
  ],
  "reveal": "The unchanged 17 votes become 39.5% then 29.3% as the denominator grows. Bavaria is outside 1867 membership, not a zero-vote member. These are state-government allocations, not citizens’ votes; fractions establish neither population, individual rights, equal political influence, fairness nor practical power.",
  "prediction": {
    "question": "Prussia keeps 17 votes while the total rises 43→58. Its share?",
    "options": [
      "Falls",
      "Stays the same",
      "Rises"
    ],
    "answer": 0
  },
  "commonNotice": "Own-English factual summaries and original schematic; not an official translation or official legal text. No source images reproduced.",
  "credit": "Source records are linked for their factual evidence. No source expression, image, layout, map, coordinates, seal or facsimile is reproduced. No blanket licence or institutional/community endorsement is implied.",
  "provenance": "Selected documentary records only. Modern city names and original endpoint ranges identify the inherited case; they do not imply continuous territorial coverage. Historical makers differ from later custodians and documentary editors.",
  "sources": [
    {
      "id": "german1867",
      "url": "https://www.verfassungen.de/de67-18/verfassung67.htm",
      "maker": "North German Confederation constitution, 16 April 1867",
      "custodian": "verfassungen.de documentary edition",
      "type": "Original1867 constitution transcription with editorial framing",
      "language": "German",
      "locator": "16April1867 title; original Articles1 and6, complete43-vote list; no editorial history imported",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    },
    {
      "id": "german1871",
      "url": "https://www.verfassungen.de/de67-18/verfassung71.htm",
      "maker": "German Empire constitution, 16 April 1871; original schedule",
      "custodian": "verfassungen.de documentary edition",
      "type": "Original1871 imperial constitution with later amendments visibly separated",
      "language": "German",
      "locator": "16April1871 law; original constitutional Articles1 and6, total58; EXCLUDE later1911 Article6a annotation",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    }
  ],
  "links": []
} as const;
