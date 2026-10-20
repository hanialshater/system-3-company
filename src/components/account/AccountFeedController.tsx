'use client';
import { accountState } from '@/lib/account-client';
import { resumeFeedTail, type FeedBookmark } from '@/lib/feed-resume';
import { useEffect, useRef } from 'react';
import type { FeedPage } from '@/lib/feed-types';
import { readAccountPreferences, watchPreferences, matchingWithdrawn, withdrawPreferenceMatching } from './preferences-client';
export type AccountFeedPage = FeedPage & {
    accountTag: string;
    snapshot: string;
    matching: boolean;
    reasons: Record<string, string>;
    admissionPending?: boolean;
    resumeOrdinal?:number;
};
/** Account-owned bridge. Ordinary Feed never imports account-client, auth libraries or editorial data. */
export default function AccountFeedController({ onChange, onChecking, getBookmark, onHistoryReady }: {
    onChange: (page: AccountFeedPage | null) => void;
    onChecking: (checking: boolean) => void;
    getBookmark:()=>FeedBookmark|null;
    onHistoryReady:()=>void;
}) {
    const callback = useRef(onChange);
    callback.current = onChange;
    const bookmarkRef=useRef(getBookmark);bookmarkRef.current=getBookmark;
    const historyReady=useRef(onHistoryReady);historyReady.current=onHistoryReady;
    const checking = useRef(onChecking);
    checking.current = onChecking;
    useEffect(() => {
        let generation = 0, live = true;
        let controller: AbortController | null = null;
        async function refresh(fresh=true) {
            const n = ++generation;
            controller?.abort();
            controller = new AbortController();
            // Pause private requests/reasons while checking; unchanged refresh preserves an active prediction.
            checking.current(true);
            const bookmark=bookmarkRef.current();
            try {
                const prefs = await readAccountPreferences(fresh);
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
                if(!live||n!==generation)return;
                if(matchingWithdrawn()||p.accountTag!==prefs.accountTag||!p.matching){callback.current(null);return;}
                if(bookmark&&bookmark.tag===p.accountTag&&bookmark.snapshot===p.snapshot){
                    const number=Math.floor(bookmark.ordinal/30);
                    let fresh=p;
                    if(number>0){
                        const response=await fetch(`/api/account/feed?page=${number}`,{credentials:'same-origin',cache:'no-store',headers:{'x-s3c-feed-snapshot':p.snapshot},signal:controller.signal});
                        if(!response.ok){if(live&&n===generation)callback.current(null);return;}
                        fresh=await response.json() as AccountFeedPage;
                    }
                    if(!live||n!==generation)return;
                    if(fresh.accountTag!==p.accountTag||fresh.snapshot!==p.snapshot||!fresh.matching){callback.current(null);return;}
                    const resumed=resumeFeedTail(fresh,bookmark);
                    callback.current(resumed);
                }else callback.current(p);
            }
            catch {
                if (live && n === generation)
                    callback.current(null);
            }
            finally {
                if(live&&n===generation){
                    checking.current(false);
                    await accountState();
                    if(live&&n===generation)historyReady.current();
                }
            }
        }
        const focus=()=>{if(document.visibilityState==='visible')void refresh();};
        const withdraw=()=>{++generation;controller?.abort();callback.current(null);checking.current(false);};
        const sessionReset=()=>{
            withdraw();const n=generation;
            void accountState().then(()=>{if(live&&n===generation)historyReady.current();});
        };
        const defaultFeed=()=>{withdrawPreferenceMatching();withdraw();};
        void refresh(false);
        window.addEventListener('focus', focus);
        document.addEventListener('visibilitychange', focus);
        window.addEventListener('s3c:account-session-reset', sessionReset);
        window.addEventListener('s3c:preferences-withdraw', withdraw);
        window.addEventListener('s3c:feed-default',defaultFeed);
        const unwatch = watchPreferences(() => void refresh());
        return () => { live = false; ++generation; controller?.abort(); unwatch(); window.removeEventListener('focus', focus); document.removeEventListener('visibilitychange', focus); window.removeEventListener('s3c:account-session-reset', sessionReset); window.removeEventListener('s3c:preferences-withdraw', withdraw);window.removeEventListener('s3c:feed-default',defaultFeed); };
    }, []);
    return null;
}
