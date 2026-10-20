// Shared closed vocabulary; no account state or editorial profiles in this client-safe module.
export const EXPERIENCE_CHOICES = [['surprise', 'Surprise'], ['visualExplanation', 'Visual explanations'], ['playfulness', 'Play and puzzles'], ['practicalValue', 'Practical ideas'], ['depth', 'Depth']] as const;
export type AccountPreferences = {
    personalizationOn: boolean | null;
    subjects: string[];
    lessOf: string[];
    experiences: string[];
    challenge: 'gentle' | 'balanced' | 'demanding' | null;
};
export const emptyPreferences = (): AccountPreferences => ({ personalizationOn: null, subjects: [], lessOf: [], experiences: [], challenge: null });
