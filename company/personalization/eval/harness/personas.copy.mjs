// COPY, not edit (decision file company/personalization/eval/2026-10-16-learner-scorer-decision.md; W-1510).
// Verbatim copy of id, fingerprintMeans and latent of the six personas in company/personalization/model/personas.ts
// at personas-v0.1 (commit 92b9a6d), made by personalization-eval run eval-c1-1016. Never edited here:
// the eval world derives its parameters from these values through the written rules in world-inputs.mjs.
// fingerprintMeans feed only the visible pre-history (what a policy may see); latent is the judge's ground truth.
export const PERSONAS_SOURCE = { file: "company/personalization/model/personas.ts", version: "personas-v0.1", commit: "92b9a6d" };
export const PERSONAS = [
  {
    "id": "curious-newcomer",
    "fingerprintMeans": {
      "historySize": 0.13,
      "missRecent": 0.4,
      "recallFailRate": 0,
      "successRecent": 0.6,
      "levelRecent": 0.1,
      "domainConcentration": 0.5,
      "frontierOpen": 0.9
    },
    "latent": {
      "priorKnowledge": {
        "probability": 0.1,
        "cs": 0.15
      },
      "forgetRate": 0.1,
      "misconceptionPull": 0.6,
      "prereqPenalty": 0.3,
      "interest": {
        "probability": 0.6,
        "cs": 0.6
      },
      "stopHazard": 0.08
    }
  },
  {
    "id": "single-subject-crammer",
    "fingerprintMeans": {
      "historySize": 0.8,
      "missRecent": 0.2,
      "recallFailRate": 0.35,
      "successRecent": 0.7,
      "levelRecent": 0.5,
      "domainConcentration": 0.95,
      "frontierOpen": 0.6
    },
    "latent": {
      "priorKnowledge": {
        "probability": 0.4,
        "cs": 0.05
      },
      "forgetRate": 0.12,
      "misconceptionPull": 0.4,
      "prereqPenalty": 0.2,
      "interest": {
        "probability": 0.9,
        "cs": 0.2
      },
      "stopHazard": 0.05
    }
  },
  {
    "id": "struggling-repeater",
    "fingerprintMeans": {
      "historySize": 0.5,
      "missRecent": 0.7,
      "recallFailRate": 0.6,
      "successRecent": 0.3,
      "levelRecent": 0.2,
      "domainConcentration": 0.6,
      "frontierOpen": 0.4
    },
    "latent": {
      "priorKnowledge": {
        "probability": 0.05,
        "cs": 0.05
      },
      "forgetRate": 0.2,
      "misconceptionPull": 0.7,
      "prereqPenalty": 0.45,
      "interest": {
        "probability": 0.5,
        "cs": 0.4
      },
      "stopHazard": 0.1
    }
  },
  {
    "id": "returning-expert",
    "fingerprintMeans": {
      "historySize": 1,
      "missRecent": 0.1,
      "recallFailRate": 0.1,
      "successRecent": 0.95,
      "levelRecent": 0.3,
      "domainConcentration": 0.5,
      "frontierOpen": 0.7
    },
    "latent": {
      "priorKnowledge": {
        "probability": 0.7,
        "cs": 0.6
      },
      "forgetRate": 0.04,
      "misconceptionPull": 0.2,
      "prereqPenalty": 0.1,
      "interest": {
        "probability": 0.7,
        "cs": 0.7
      },
      "stopHazard": 0.04
    }
  },
  {
    "id": "wanderer",
    "fingerprintMeans": {
      "historySize": 0.6,
      "missRecent": 0.3,
      "recallFailRate": 0.3,
      "successRecent": 0.5,
      "levelRecent": 0.4,
      "domainConcentration": 0.2,
      "frontierOpen": 0.9
    },
    "latent": {
      "priorKnowledge": {
        "probability": 0.25,
        "cs": 0.25
      },
      "forgetRate": 0.1,
      "misconceptionPull": 0.45,
      "prereqPenalty": 0.3,
      "interest": {
        "probability": 0.5,
        "cs": 0.5
      },
      "stopHazard": 0.07
    }
  },
  {
    "id": "lapsed-returner",
    "fingerprintMeans": {
      "historySize": 0.7,
      "missRecent": 0.5,
      "recallFailRate": 0.7,
      "successRecent": 0.4,
      "levelRecent": 0.5,
      "domainConcentration": 0.5,
      "frontierOpen": 0.5
    },
    "latent": {
      "priorKnowledge": {
        "probability": 0.35,
        "cs": 0.3
      },
      "forgetRate": 0.15,
      "misconceptionPull": 0.4,
      "prereqPenalty": 0.25,
      "interest": {
        "probability": 0.6,
        "cs": 0.5
      },
      "stopHazard": 0.12
    }
  }
];
