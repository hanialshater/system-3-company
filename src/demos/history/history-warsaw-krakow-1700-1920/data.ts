export const lessonData = {
  "documents": [
    {
      "id": "settlement",
      "label": "1815 Imperial settlement",
      "date": "1815",
      "source": "warsaw1815",
      "fields": [
        {
          "address": "settlement.warsaw",
          "text": "Duchy: Russian linkage; exceptions",
          "value": "Duchy of Warsaw except specified territories linked to Russian Empire, separate administration",
          "source": "warsaw1815",
          "locator": "Article1 with exceptions; not a wholePoland assertion",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Duchy: Russian linkage; exceptions",
          "claim": "history.history-warsaw-krakow-1700-1920.c1"
        },
        {
          "address": "settlement.krakow",
          "text": "Krakow: protected free city",
          "value": "free city under protection of Russia, Austria, Prussia",
          "source": "warsaw1815",
          "locator": "Article6; no modern sovereign legitimacy inference",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Krakow: protected free city",
          "claim": "history.history-warsaw-krakow-1700-1920.c2"
        }
      ]
    },
    {
      "id": "telegram",
      "label": "1918 Telegram",
      "date": "1918-11-16",
      "source": "warsaw1918",
      "fields": [
        {
          "address": "telegram.act",
          "text": "Piłsudski notifies Polish independence",
          "value": "Piłsudski notifies foreign governments of independent Polishstate",
          "source": "warsaw1918",
          "locator": "operative telegram opening, not modern article",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Piłsudski notifies Polish independence",
          "claim": "history.history-warsaw-krakow-1700-1920.c3"
        },
        {
          "address": "telegram.place",
          "text": "Issued Warsaw",
          "value": "Warszawa 16/XI 1918",
          "source": "warsaw1918",
          "locator": "telegram signature/date block",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Issued Warsaw",
          "claim": "history.history-warsaw-krakow-1700-1920.c4"
        }
      ]
    }
  ],
  "qualifiers": [
    "Russia, Austria, Prussia: protecting powers"
  ],
  "reveal": "The earlier arrangements include separate Duchy administration; later notification cannot erase their differences. Piłsudski asserts Polish independence, not another government’s recognition. These records establish neither guaranteed safety, popular autonomy, every city’s control, settled borders, equal rights nor all residents’ assent.",
  "prediction": {
    "question": "Does a 1918 independence notification establish that Warsaw and Krakow had identical arrangements in 1815?",
    "options": [
      "No, the earlier records must be checked",
      "Yes, later unity applies backwards"
    ],
    "answer": 0
  },
  "commonNotice": "Own-English factual summaries and original schematic; not an official translation or official legal text. No source images reproduced.",
  "credit": "Source records are linked for their factual evidence. No source expression, image, layout, map, coordinates, seal or facsimile is reproduced. No blanket licence or institutional/community endorsement is implied.",
  "provenance": "Selected documentary records only. Modern city names and original endpoint ranges identify the inherited case; they do not imply continuous territorial coverage. Historical makers differ from later custodians and documentary editors.",
  "sources": [
    {
      "id": "warsaw1815",
      "url": "https://www.staatsvertraege.de/Frieden1814-15/wka1815.htm",
      "maker": "Congress of Vienna settlement parties, 1815; exact day not adopted",
      "custodian": "staatsvertraege.de documentary edition",
      "type": "German Congress of Vienna Act transcription",
      "language": "German",
      "locator": "Articles1 and6; editorial heading says8June1815, common treaty dating conflict requires independent resolution; teach year1815 only",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    },
    {
      "id": "warsaw1918",
      "url": "https://dziennikurzedowy.msz.gov.pl/pl/p/msz_pl/ministerstwo/historia/wydarzenia/depesza_jozefa_pilsudskiego_z_16_listopada_1918_r_.html",
      "maker": "Józef Piłsudski / Tytus Filipowicz, diplomatic telegram, Warsaw 16 November 1918",
      "custodian": "Polish Ministry of Foreign Affairs archival site",
      "type": "Polish reproduced diplomatic telegram plus separate modern account",
      "language": "Polish",
      "locator": "Telegram beginning Jako wódz naczelny, signed Piłsudski/Filipowicz, Warszawa16/XI1918; exclude modern account as event proof",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    }
  ],
  "links": []
} as const;
