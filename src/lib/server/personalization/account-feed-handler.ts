import type { AccountPreferences } from '../../account-preference-types';
import type { RankedFeedPage } from './account-feed';
type Dependencies = {
    enabled: () => boolean;
    userId: (request: Request) => Promise<string | null>;
    accountTag: (id: string) => string;
    settings: (id: string) => Promise<AccountPreferences>;
    page: (settings: AccountPreferences, page: number, tag: string) => RankedFeedPage;
    admitted: () => boolean;
};
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'private, no-store' } });
/** Cookie namespace only; account identity and snapshots travel in private responses, never public cache keys. */
export async function handleAccountFeed(req: Request, deps: Dependencies): Promise<Response> {
    try {
        if (!deps.enabled())
            return new Response(null, { status: 404, headers: { 'cache-control': 'private, no-store' } });
        const id = await deps.userId(req);
        if (!id)
            return json(401, { error: 'signed_out' });
        const params = new URL(req.url).searchParams, raw = params.get('page') ?? '0';
        if(params.has('snapshot'))return json(400,{error:'query'});
        if (!/^\d{1,5}$/.test(raw))
            return json(400, { error: 'page' });
        const settings = await deps.settings(id), admitted = deps.admitted();
        const result = deps.page(admitted ? settings : { ...settings, personalizationOn: false }, Number(raw), deps.accountTag(id));
        if (Number(raw) > 0 && req.headers.get('x-s3c-feed-snapshot') !== result.snapshot)
            return json(409, { error: 'refresh_required' });
        return json(200, { ...result, ...(!admitted ? { admissionPending: true } : {}) });
    }
    catch {
        return json(503, { error: 'unavailable' });
    }
}
