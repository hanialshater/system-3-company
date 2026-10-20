'use client';
import { accountMe, onAccountChanged } from '@/lib/account-client';
import type { AccountPreferences } from '@/lib/account-preference-types';
export type PreferenceRead = {
    settings: AccountPreferences;
    accountTag: string;
};
let epoch = 0;
let localWithdrawal = false;
export function matchingWithdrawn() { return localWithdrawal; }
export function withdrawPreferenceMatching() { localWithdrawal = true; epoch++; if (typeof window !== "undefined")
    window.dispatchEvent(new Event("s3c:preferences-withdraw")); }
const listeners = new Set<() => void>();
export function invalidatePreferences() { epoch++; for (const cb of listeners)
    cb(); }
export function watchPreferences(cb: () => void) { listeners.add(cb); return () => { listeners.delete(cb); }; }
onAccountChanged(invalidatePreferences);
if (typeof window !== "undefined")
    window.addEventListener("s3c:account-session-reset", () => { localWithdrawal = false; invalidatePreferences(); });
export async function readAccountPreferences(): Promise<PreferenceRead | null> {
    const generation = epoch;
    const me = await accountMe(true);
    if (generation !== epoch || !me?.signedIn)
        return null;
    const r = await fetch('/api/account/settings', { credentials: 'same-origin', cache: 'no-store' });
    if (!r.ok)
        return null;
    const value = await r.json() as PreferenceRead;
    return generation === epoch && value.accountTag === me.tag ? value : null;
}
export async function writeAccountPreferences(tag: string, patch: Partial<AccountPreferences>): Promise<PreferenceRead | null> {
    const generation = ++epoch;
    const r = await fetch('/api/account/settings', { method: 'PUT', credentials: 'same-origin', cache: 'no-store', headers: { 'content-type': 'application/json', 'x-s3c-account': tag }, body: JSON.stringify(patch) });
    if (r.status === 409) {
        invalidatePreferences();
        return null;
    }
    if (!r.ok || generation !== epoch)
        return null;
    const value = await r.json() as PreferenceRead;
    if (generation !== epoch || value.accountTag !== tag)
        return null;
    localWithdrawal = value.settings.personalizationOn !== true;
    invalidatePreferences();
    return value;
}
