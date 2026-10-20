'use client';
import { useEffect, useRef } from 'react';
import type { FeedPage } from '@/lib/feed-types';
import { readAccountPreferences, watchPreferences, matchingWithdrawn } from './preferences-client';
export type AccountFeedPage = FeedPage & {
    accountTag: string;
    snapshot: string;
    matching: boolean;
    reasons: Record<string, string>;
    admissionPending?: boolean;
};
/** Account-owned bridge. Ordinary Feed never imports account-client, auth libraries or editorial data. */
export default function AccountFeedController({ onChange, onChecking }: {
    onChange: (page: AccountFeedPage | null) => void;
    onChecking: (checking: boolean) => void;
}) {
    const callback = useRef(onChange);
    callback.current = onChange;
    const checking = useRef(onChecking);
    checking.current = onChecking;
    useEffect(() => {
        let generation = 0, live = true;
        let controller: AbortController | null = null;
        async function refresh() {
            const n = ++generation;
            controller?.abort();
            controller = new AbortController();
            // Pause private requests/reasons while checking; unchanged refresh preserves an active prediction.
            checking.current(true);
            try {
                const prefs = await readAccountPreferences();
                if (!live || n !== generation)
                    return;
                if (!prefs || prefs.settings.personalizationOn !== true || matchingWithdrawn()) {
                    callback.current(null);
                    return;
                }
                const r = await fetch('/api/account/feed?page=0', { credentials: 'same-origin', cache: 'no-store', signal: controller.signal });
                if (!r.ok) {
                    if (live && n === generation)
                        callback.current(null);
                    return;
                }
                const p = await r.json() as AccountFeedPage;
                if (live && n === generation) {
                    if (!matchingWithdrawn() && p.accountTag === prefs.accountTag && p.matching)
                        callback.current(p);
                    else
                        callback.current(null);
                }
            }
            catch {
                if (live && n === generation)
                    callback.current(null);
            }
            finally {
                if (live && n === generation)
                    checking.current(false);
            }
        }
        const focus = () => { if (document.visibilityState === 'visible')
            void refresh(); };
        const withdraw = () => { ++generation; controller?.abort(); callback.current(null); checking.current(false); };
        void refresh();
        window.addEventListener('focus', focus);
        document.addEventListener('visibilitychange', focus);
        window.addEventListener('s3c:account-session-reset', withdraw);
        window.addEventListener('s3c:preferences-withdraw', withdraw);
        const unwatch = watchPreferences(() => void refresh());
        return () => { live = false; ++generation; controller?.abort(); unwatch(); window.removeEventListener('focus', focus); document.removeEventListener('visibilitychange', focus); window.removeEventListener('s3c:account-session-reset', withdraw); window.removeEventListener('s3c:preferences-withdraw', withdraw); };
    }, []);
    return null;
}
