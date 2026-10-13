// Names for the company's agents (pure data, shared by the onboarding generator and HQ).
// A role that runs as one agent has a persona name. A role that runs as many agents at once
// (builders, checkers, reviewers) gives each dispatched instance a name from POOL, chosen by a hash
// of its label so the same agent keeps its name across HQ's replay.

export const PERSONA = {
  founder: "You",
  "chief-of-staff": "Ada",
  "head-of-product": "Priya",
  "domain-scout": "Kofi",
  "learning-designer": "Lena",
  "mockup-artist": "Tomás",
  researcher: "Mei",
  "demo-builder": "Builders",
  "fact-checker": "Ingrid",
  "learner-evaluator": "Sam",
  "pedagogy-critic": "Yusuf",
  "qa-tester": "Rosa",
  "accessibility-reviewer": "Arjun",
  "evaluation-steward": "Hilde",
  "principal-engineer": "Kenji",
  "platform-engineer": "Noor",
  "release-manager": "Diego",
  "backend-engineer": "Amara",
  "privacy-reviewer": "Elif",
  "growth-designer": "Jonah",
  "tools-lead": "Sora",
  "hq-engineer": "Pip",
  "analytics-steward": "Grace",
  "pattern-librarian": "Ottilie",
  "cm-math": "Ravi",
  "cm-cs": "Lin",
  "cm-probability": "Bea",
  "cm-physics": "Omar",
  "cm-ai": "Iris",
  "cm-economics": "Marco",
  "cm-life": "Wanjiru",
  "cm-chemistry": "Freya",
  "cm-geography": "Ana",
};

// Roles that run as many parallel agents. Their instances take names from POOL.
export const MANY = new Set(["demo-builder", "fact-checker", "learner-evaluator", "general-purpose", "pedagogy-critic", "qa-tester"]);

export const POOL = [
  "Nia", "Theo", "Zara", "Felix", "Maya", "Leo", "Ines", "Kai", "Rumi", "Oskar",
  "Lila", "Ezra", "Juno", "Malik", "Saga", "Teo", "Aiko", "Bram", "Cleo", "Dario",
  "Esme", "Femi", "Gus", "Hana", "Ivo", "Jade", "Kian", "Luz", "Milo", "Nadia",
  "Odin", "Pia", "Quinn", "Remy", "Suri", "Tariq", "Uma", "Vik", "Wren", "Yara",
];

function h(s) {
  let x = 2166136261;
  for (let i = 0; i < s.length; i++) x = Math.imul(x ^ s.charCodeAt(i), 16777619);
  return x >>> 0;
}

/** The display name for a role, or for one dispatched agent of that role. */
export function nameFor(role, label) {
  if (label && MANY.has(role)) return POOL[h(label) % POOL.length];
  return PERSONA[role] ?? (label ? POOL[h(label) % POOL.length] : role);
}

export const seedOf = h;
