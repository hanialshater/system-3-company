import { handleAccountFeed } from '@/lib/server/personalization/account-feed-handler';
import { catalogPrerequisites } from '@/lib/server/personalization/catalog-prerequisites';
import { feedOrder } from '@/lib/feed-index';
import { settingsDeps } from '@/lib/server/personalization/settings-wiring';
import { cleanStored } from '@/lib/server/personalization/settings';
import { accountFeedPage } from '@/lib/server/personalization/account-feed';
import { RECIPE, type EditorialProfile } from '@/lib/preference-match';
import dataset from '@/data/editorial-profiles.account.json';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
    const deps = settingsDeps();
    if (!deps)
        return new Response(null, { status: 404 });
    return handleAccountFeed(req, {
        enabled: deps.enabled, userId: deps.userId, accountTag: deps.accountTag,
        settings: async (id) => cleanStored(await deps.store.get(id), await deps.catalog()),
        page: (settings, page, tag) => accountFeedPage(feedOrder('all'), dataset.profiles as unknown as Record<string, EditorialProfile>, settings, dataset.profileSetVersion, page, tag, catalogPrerequisites),
        admitted: () => process.env.NEXT_PUBLIC_NEW_LESSON_ORDER !== 'on' && process.env.ACCOUNT_PREFERENCE_RECIPE === `${RECIPE.version}:${dataset.profileSetVersion}`,
    });
}
