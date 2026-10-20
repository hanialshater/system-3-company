'use client';
import { accountMe, onAccountChanged } from '@/lib/account-client';
import type { AccountPreferences } from '@/lib/account-preference-types';
export type PreferenceRead = {
    settings: AccountPreferences;
    accountTag: string;
};
let epoch = 0;
let identityRead=0;
let boundAccountTag:string|null=null;
let localWithdrawal = false;
export function matchingWithdrawn() { return localWithdrawal; }
export function withdrawPreferenceMatching() { localWithdrawal = true; epoch++; if (typeof window !== "undefined")
    window.dispatchEvent(new Event("s3c:preferences-withdraw")); }
const listeners = new Set<(source?:symbol) => void>();
export function invalidatePreferences(source?:symbol) { epoch++; for (const cb of listeners)
    cb(source); }
export function watchPreferences(cb: (source?:symbol) => void) { listeners.add(cb); return () => { listeners.delete(cb); }; }
function forgetPreferenceIdentity(){boundAccountTag=null;identityRead++;invalidatePreferences();}
onAccountChanged(forgetPreferenceIdentity);
if (typeof window !== "undefined")
    window.addEventListener("s3c:account-session-reset", () => { localWithdrawal = false; forgetPreferenceIdentity(); });
export async function readAccountPreferences(fresh=true): Promise<PreferenceRead | null> {
 const request=++identityRead,generation=epoch;
 // Initial mount honors cached accounts-off 404. A non-null probe never admits a cached identity.
 if(!fresh){
  const probe=await accountMe();
  if(request!==identityRead||generation!==epoch||probe===null)return null;
 }
 const me=await accountMe(true);
 if(request!==identityRead||generation!==epoch)return null;
 const tag=me?.signedIn?me.tag:null;
 if(boundAccountTag!==tag){boundAccountTag=tag;epoch++;}
 const acceptedEpoch=epoch;
 if(!tag)return null;
 const r=await fetch('/api/account/settings',{credentials:'same-origin',cache:'no-store'});
 if(!r.ok)return null;
 const value=await r.json() as PreferenceRead;
 return request===identityRead&&acceptedEpoch===epoch&&boundAccountTag===tag&&value.accountTag===tag?value:null;
}
export async function writeAccountPreferences(tag: string, patch: Partial<AccountPreferences>,source?:symbol): Promise<PreferenceRead | null> {
    if(boundAccountTag!==null&&boundAccountTag!==tag)return null;
    boundAccountTag=tag;
    const generation = ++epoch;
    const r = await fetch('/api/account/settings', { method: 'PUT', credentials: 'same-origin', cache: 'no-store', headers: { 'content-type': 'application/json', 'x-s3c-account': tag }, body: JSON.stringify(patch) });
    if (r.status === 409) {
        invalidatePreferences();
        return null;
    }
    if (!r.ok || generation !== epoch)
        return null;
    const value = await r.json() as PreferenceRead;
    if (generation !== epoch || boundAccountTag!==tag || value.accountTag !== tag)
        return null;
    localWithdrawal = value.settings.personalizationOn !== true;
    invalidatePreferences(source);
    return value;
}
