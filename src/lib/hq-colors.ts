// Role colours for HQ, shared by the server page and the client floor plan (no node imports here).
const DOMAIN_COLOR: Record<string, string> = {
  math: "#7c9cff",
  cs: "#4fd1a5",
  probability: "#f6c453",
  physics: "#ff8a65",
  ai: "#c792ea",
  economics: "#80cbc4",
  life: "#a5d66f",
  chemistry: "#f48fb1",
  geography: "#64b5f6",
  lifehacks: "#ffb74d",
  books: "#bcaaa4",
  "big-ideas": "#4dd0e1",
  history: "#d9b26f",
  behavioral: "#e48fd6",
};

export const TEAM_COLOR: Record<string, string> = {
  "demo-builder": "#7c9cff",
  "fact-checker": "#f6c453",
  "learner-evaluator": "#4fd1a5",
  "pedagogy-critic": "#4fd1a5",
  "qa-tester": "#ff8a65",
  "principal-engineer": "#c792ea",
  "platform-engineer": "#c792ea",
  "chief-of-staff": "#eef1f7",
  founder: "#ffd54f",
  "chief-of-staff-ceo-office": "#ffd54f",
  "lifehacks-safety-reviewer": "#ffb74d",
  "personalization-lead": "#c792ea",
  "learner-model-engineer": "#c792ea",
  "localization-lead": "#4fd1a5",
  localizer: "#4fd1a5",
  "cultural-reviewer": "#4fd1a5",
  "principal-pm-verticals": "#7c9cff",
  "head-of-product": "#7c9cff",
  "design-lead": "#f48fb1",
  "interaction-designer": "#f48fb1",
  "visual-designer": "#f48fb1",
  "design-engineer": "#f48fb1",
  "mockup-artist": "#f48fb1",
  "vp-marketing": "#ff7eb6",
};

export function teamColor(role: string): string {
  if (TEAM_COLOR[role]) return TEAM_COLOR[role];
  const rest = role.replace(/^cm-/, "");
  // Longest domain id that prefixes the role, so hyphenated domains (big-ideas) keep their colour.
  const dom = Object.keys(DOMAIN_COLOR).filter((d) => rest === d || rest.startsWith(`${d}-`)).sort((a, b) => b.length - a.length)[0];
  return (dom && DOMAIN_COLOR[dom]) ?? "#9aa3b5";
}

