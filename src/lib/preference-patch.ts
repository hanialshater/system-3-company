import { emptyPreferences, type AccountPreferences } from './account-preference-types';
export type PreferenceAction='save'|'enable'|'off'|'reset';
/** Emit only deliberately edited keys. Another tab's newer untouched choice must survive. */
export function preferencePatch(saved:AccountPreferences,draft:AccountPreferences,action:PreferenceAction):Partial<AccountPreferences>{
 if(action==='reset')return {...emptyPreferences(),personalizationOn:false};
 if(action==='off')return {personalizationOn:false};
 const patch:Partial<AccountPreferences>={};
 for(const key of ['subjects','experiences'] as const)if(JSON.stringify(saved[key])!==JSON.stringify(draft[key]))patch[key]=[...draft[key]];
 if(saved.challenge!==draft.challenge)patch.challenge=draft.challenge;
 if(action==='enable')patch.personalizationOn=true;
 return patch;
}
