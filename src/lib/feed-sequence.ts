import type { FeedItem } from './feed-types';
import type { PublicMeta } from './trust';
export type FeedSlot = {
    kind: 'intro';
    key: string;
} | {
    kind: 'lesson';
    key: string;
    meta: FeedItem;
} | {
    kind: 'revisit';
    key: string;
    meta: PublicMeta;
};
/** Due retrieval stays outside taste matching. Never insert at/before the frozen active boundary. */
export function feedSequence(lessons: readonly FeedItem[], revisits: readonly PublicMeta[], filter: string, revisitFrom: number, matching: boolean, ended: boolean): FeedSlot[] {
    const due = revisits.filter(r => filter === 'all' || r.domain === filter);
    const out: FeedSlot[] = [{ kind: 'intro', key: 'intro' }];
    lessons.forEach((meta, i) => {
        if (matching && filter === 'all' && due.length && out.length >= revisitFrom)
            for (const r of due.splice(0))
                out.push({ kind: 'revisit', key: `revisit-${r.slug}`, meta: r });
        if ((!matching || filter !== 'all') && i % 3 === 1 && due.length && out.length >= revisitFrom) {
            const r = due.shift()!;
            out.push({ kind: 'revisit', key: `revisit-${r.slug}`, meta: r });
        }
        out.push({ kind: 'lesson', key: meta.slug, meta });
    });
    if (ended)
        for (const r of due)
            out.push({ kind: 'revisit', key: `revisit-${r.slug}`, meta: r });
    return out;
}
