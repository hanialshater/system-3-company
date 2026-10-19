export const lessonData = {
  "documents": [
    {
      "id": "declaration",
      "label": "1776 Declaration",
      "date": "1776-07-04",
      "source": "ny1776",
      "fields": [
        {
          "address": "declaration.actor",
          "text": "Congress declares",
          "value": "Representatives in General Congress",
          "source": "ny1776",
          "locator": "final resolution beginning We therefore",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Congress declares",
          "claim": "history.history-new-york-boston-1700-1900.c1"
        },
        {
          "address": "declaration.act",
          "text": "Independence asserted",
          "value": "declaration of free and independent states",
          "source": "ny1776",
          "locator": "same final resolution",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "Independence asserted",
          "claim": "history.history-new-york-boston-1700-1900.c2"
        }
      ]
    },
    {
      "id": "recognition",
      "label": "1783 Treaty",
      "date": "1783-09-03",
      "source": "ny1783",
      "fields": [
        {
          "address": "recognition.actor",
          "text": "British king acknowledges",
          "value": "His Britannic Majesty",
          "source": "ny1783",
          "locator": "Article1",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "British king acknowledges",
          "claim": "history.history-new-york-boston-1700-1900.c3"
        },
        {
          "address": "recognition.named",
          "text": "New York; Massachusetts named",
          "value": [
            "New York",
            "Massachusetts Bay"
          ],
          "source": "ny1783",
          "locator": "Article1 list",
          "claimStatus": "unverified",
          "support": "source",
          "originalText": "New York; Massachusetts named",
          "claim": "history.history-new-york-boston-1700-1900.c4"
        }
      ]
    }
  ],
  "qualifiers": [
    "Not enslaved people’s or Indigenous nations’ consent"
  ],
  "reveal": "These records show different actors’ acts: Congress declares; the British king acknowledges the named states’ independence, including Massachusetts Bay. Neither record alone tracks wartime control of Boston or New York, or establishes the rights or consent of enslaved people or Indigenous nations.",
  "prediction": {
    "question": "Does Congress’s declaration alone establish British recognition?",
    "options": [
      "No, inspect the other party’s act",
      "Yes, declaration and recognition are identical"
    ],
    "answer": 0
  },
  "commonNotice": "Own-English factual summaries and original schematic; not an official translation or official legal text. No source images reproduced.",
  "credit": "Source records are linked for their factual evidence. No source expression, image, layout, map, coordinates, seal or facsimile is reproduced. No blanket licence or institutional/community endorsement is implied.",
  "provenance": "Selected documentary records only. Modern city names and original endpoint ranges identify the inherited case; they do not imply continuous territorial coverage. Historical makers differ from later custodians and documentary editors.",
  "sources": [
    {
      "id": "ny1776",
      "url": "https://www.archives.gov/founding-docs/declaration-transcript",
      "maker": "Continental Congress, 4 July 1776",
      "custodian": "US National Archives",
      "type": "Transcription of Stone Engraving of1776 Declaration",
      "language": "English",
      "locator": "4July1776 heading; final resolution beginning We therefore; signing list separately groups Massachusetts/NewYork",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    },
    {
      "id": "ny1783",
      "url": "https://www.archives.gov/milestone-documents/treaty-of-paris",
      "maker": "British Crown and United States treaty parties, 3 September 1783",
      "custodian": "US National Archives",
      "type": "1783 Treaty of Paris transcript",
      "language": "English",
      "locator": "3September1783 closing date and Article1 acknowledgment; Article7 withdrawal terms are not a city-control dataset",
      "accessed": "2026-10-19",
      "limitation": "retrieved; body inspection separately required"
    }
  ],
  "links": []
} as const;
