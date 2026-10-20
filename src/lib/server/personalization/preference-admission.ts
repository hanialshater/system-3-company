import { RECIPE } from '../../preference-match';
export type ProfileIdentity={profileSetVersion:string;recipeSourceSha256:string;profileContentsSha256:string};
export type PreferenceAdmission=ProfileIdentity&{status:string;recipeVersion:string};
/** Source-pinned opt-in admission. Defined empty/unknown/off values withdraw; only unset may use approved source. */
export function accountPreferenceAdmitted(env:Record<string,string|undefined>,dataset:ProfileIdentity,manifest:PreferenceAdmission):boolean{
 if(env.NEXT_PUBLIC_NEW_LESSON_ORDER==='reachable-v3')return false;
 const matches=manifest.recipeVersion===RECIPE.version&&manifest.profileSetVersion===dataset.profileSetVersion&&manifest.recipeSourceSha256===dataset.recipeSourceSha256&&manifest.profileContentsSha256===dataset.profileContentsSha256;
 if(!matches)return false;
 const qa=env.VERCEL_ENV!=='production'&&(env.VERCEL_ENV==='preview'||env.VERCEL_ENV==='development'||env.NODE_ENV==='test');
 if(env.ACCOUNT_PREFERENCE_RECIPE!==undefined)return env.ACCOUNT_PREFERENCE_RECIPE===`${RECIPE.version}:${dataset.profileSetVersion}`&&(manifest.status==='approved'||qa);
 return manifest.status==='approved';
}
