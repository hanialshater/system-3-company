import { notFound } from 'next/navigation';
import { hqEnabled } from '@/lib/hq';
import { domains } from '@/lib/catalog';
import { catalogPrerequisites } from '@/lib/server/personalization/catalog-prerequisites';
import { feedOrder } from '@/lib/feed-index';
import { accountFeedPage } from '@/lib/server/personalization/account-feed';
import { RECIPE, type EditorialProfile } from '@/lib/preference-match';
import dataset from '@/data/editorial-profiles.account.json';
import { editorialText } from '@/lib/editorial-display';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Stated preferences — synthetic HQ lab' };
const fixtures = { baseline: { personalizationOn: false, subjects: [], experiences: [], challenge: null }, visual: { personalizationOn: true, subjects: [], experiences: ['visualExplanation'], challenge: null }, play: { personalizationOn: true, subjects: ['math', 'physics'], experiences: ['playfulness', 'surprise'], challenge: 'gentle' as const }, depth: { personalizationOn: true, subjects: ['cs', 'ai'], experiences: ['depth'], challenge: 'demanding' as const } };
export default async function PreferenceLab({ searchParams }: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    if (!hqEnabled())
        notFound();
    const params = await searchParams, fixture = typeof params.fixture === 'string' && Object.hasOwn(fixtures, params.fixture) ? params.fixture as keyof typeof fixtures : 'baseline';
    const profiles = dataset.profiles as unknown as Record<string, EditorialProfile>;
    const page = accountFeedPage(feedOrder('all'), profiles, { ...fixtures[fixture], lessOf: [] }, dataset.profileSetVersion, 0, 'synthetic-only', catalogPrerequisites);
    return <main style={{ padding: 24, maxWidth: 1100, margin: 'auto' }}><nav><a href="/hq/personalization">Simulation lab</a> · <a href="/hq/evaluation">Evaluation</a></nav>
 <h1>Stated preferences: synthetic inspection</h1><p>No customer account, saved choices, history or behavior is read here. This is an editorial candidate inspection, not measured learning or a fitted GAM.</p>
 <form><label>Synthetic choices <select name="fixture" defaultValue={fixture}>{Object.keys(fixtures).map(id => <option key={id}>{id}</option>)}</select></label> <button>Inspect</button></form>
 <p>Recipe {RECIPE.version}; profiles {dataset.profileSetVersion}. {dataset.catalogueCount} catalogue entries; {dataset.counts.reviewed} reviewed, {dataset.counts.unknown} unknown, {dataset.counts.current} entry-current, {dataset.counts.stale} stale, {dataset.counts.disputed} disputed.</p>
 <p>{dataset.freshnessScope} Missing, stale, disputed or weak evidence remains a fixed position. Published/review status and declared prerequisites constrain actual feed swaps; this synthetic page uses the same declared prerequisite constraints and bounded recipe.</p>
 <p>Later evaluation: add a new append-only round, then update the <code>editorial:account</code> script to select its source and run it. Rebuild and review the versioned candidate before enabling a new profile set. Existing account choices need no schema change.</p>
 <ol>{page.items.map(item => { const profile = profiles[item.slug]; return <li key={item.slug} style={{ padding: 16, borderBottom: '1px solid var(--border)' }}><h2><a href={`/d/${item.slug}`}>{item.title}</a></h2><p>{domains.find(d => d.id === item.domain)?.short} · {profile?.state ?? 'unknown'} · {page.reasons[item.slug] ?? 'Canonical position retained.'}</p>{profile && <details><summary>Editorial rubric and provenance</summary><p>{editorialText(profile.whyCool)}</p><p>Caveat: {editorialText(profile.caveat)}</p><p>Review: {profile.reviewRef}; source {editorialText(profile.sourceRevision)}; demo version {profile.demoVersion}</p><table><thead><tr><th>Dimension</th><th>Score</th><th>Confidence</th><th>Why / evidence</th></tr></thead><tbody>{Object.entries({ ...profile.quality, ...profile.experience }).map(([key, value]) => <tr key={key}><th>{key}</th><td>{value.score ?? 'Unknown'}</td><td>{value.confidence ?? 'Unknown'}</td><td>{editorialText(value.reason)} · {editorialText(value.evidence)}</td></tr>)}</tbody></table><p>Challenge: {profile.complexity.level}; {editorialText(profile.complexity.reason)}</p></details>}</li>; })}</ol></main>;
}
