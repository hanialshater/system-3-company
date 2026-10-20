// Pure bounded whole-catalogue ranking and snapshot pagination. No learned/behavioral inputs.
import { createHmac } from 'node:crypto';
import { matchCandidates, RECIPE, type EditorialProfile, type MatchCandidate } from '../../preference-match';
import type { AccountPreferences } from '../../account-preference-types';
import { FEED_PAGE_SIZE, type FeedItem, type FeedPage } from '../../feed-types';
export type RankedFeedPage = FeedPage & {
    accountTag: string;
    snapshot: string;
    matching: boolean;
    reasons: Record<string, string>;
};
export function accountFeedPage(baseline: readonly FeedItem[], profiles: Record<string, EditorialProfile>, settings: AccountPreferences, profileVersion: string, page: number, accountTag: string, prerequisites: Record<string, string[]> = {}): RankedFeedPage {
    const matching = settings.personalizationOn === true && !!(settings.subjects.length || settings.experiences.length || settings.challenge);
    const candidates = baseline.map(item => ({ ...item, profile: profiles[item.slug] ?? null, prerequisites: prerequisites[item.slug] ?? [] }));
    const rows = matchCandidates(candidates as (FeedItem & MatchCandidate)[], { enabled: matching, subjects: settings.subjects, experiences: settings.experiences as Parameters<typeof matchCandidates>[1]['experiences'], challenge: settings.challenge });
    const snapshot = createHmac('sha256', accountTag).update(JSON.stringify([RECIPE.version, profileVersion, settings, baseline.map(i => [i.slug, i.status]), prerequisites])).digest('hex').slice(0, 24);
    const slice = rows.slice(page * FEED_PAGE_SIZE, (page + 1) * FEED_PAGE_SIZE);
    const reasons: Record<string, string> = {};
    const experienceLabels: Record<string, string> = { surprise: 'surprise', visualExplanation: 'visual explanations', playfulness: 'play and puzzles', practicalValue: 'practical ideas', depth: 'depth' };
    for (const r of slice)
        if (r.position !== r.originalPosition) {
            const fits = [...(r.subject > 0 ? ['a subject you selected'] : []), ...Object.keys(r.experiences).filter(id => (r.experiences[id as keyof typeof r.experiences] ?? 0) > 0).map(id => experienceLabels[id]), ...(r.challenge > 0 ? ['your preferred challenge'] : [])];
            reasons[r.candidate.slug] = r.position < r.originalPosition ? `Moved earlier within a small group for its fit with ${fits.join(', ')}. Based on your stated choices and provisional editorial observations.` : 'Moved later within a small group because a nearby lesson fits your stated choices more strongly. This is not a judgment of learning quality.';
        }
    return { filter: 'all', page, items: slice.map(({ candidate: { profile: _profile, prerequisites: _prerequisites, ...item } }) => item), next: (page + 1) * FEED_PAGE_SIZE < baseline.length ? page + 1 : null, total: baseline.length, accountTag, snapshot, matching, reasons };
}
