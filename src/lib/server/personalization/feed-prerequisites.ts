// Content-declared prerequisite relations only; never infer mastery from completions.
export type ConceptMap = {
    domain: string;
    concepts: {
        id: string;
        prerequisites?: string[];
    }[];
};
export function feedPrerequisites(lessons: readonly {
    slug: string;
    domain: string;
    concept: string;
}[], curricula: readonly ConceptMap[]): Record<string, string[]> {
    const graph = new Map<string, string[]>();
    for (const map of curricula)
        for (const concept of map.concepts)
            graph.set(`${map.domain}:${concept.id}`, (concept.prerequisites ?? []).map(id => id.includes(':') ? id : `${map.domain}:${id}`));
    const result: Record<string, string[]> = {};
    for (const lesson of lessons) {
        const ancestors = new Set<string>();
        const visit = (id: string) => { if (ancestors.has(id))
            return; ancestors.add(id); for (const before of graph.get(id) ?? [])
            visit(before); };
        for (const id of graph.get(`${lesson.domain}:${lesson.concept}`) ?? [])
            visit(id);
        result[lesson.slug] = lessons.filter(other => ancestors.has(`${other.domain}:${other.concept}`)).map(other => other.slug);
    }
    return result;
}
