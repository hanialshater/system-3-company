import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {accountPreferenceAdmitted} from '../../src/lib/server/personalization/preference-admission.ts';
const root=new URL('../../',import.meta.url);
const read=path=>JSON.parse(fs.readFileSync(new URL(path,root),'utf8'));
const manifest=read('src/data/account-preference-admission.json');
const dataset=read('src/data/editorial-profiles.account.json');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const production={NODE_ENV:'production',VERCEL_ENV:'production'};
const pair=`${manifest.recipeVersion}:${dataset.profileSetVersion}`;
test('actual admitted source and review records retain exact independent identity',()=>{
 assert.equal(manifest.status,'approved');
 assert.equal(manifest.recipeSourceSha256,hash(fs.readFileSync(new URL('src/lib/preference-match.ts',root))));
 assert.equal(manifest.profileContentsSha256,hash(JSON.stringify(dataset.profiles)));
 assert.equal(manifest.profileSetVersion,dataset.profileSetVersion);
 for(const path of manifest.reviews)assert.equal(fs.existsSync(new URL(path,root)),true,path);
});
test('actual final manifest admits production unset/exact and rejects withdrawal or drift',()=>{
 assert.equal(accountPreferenceAdmitted(production,dataset,manifest),true);
 assert.equal(accountPreferenceAdmitted({...production,ACCOUNT_PREFERENCE_RECIPE:pair},dataset,manifest),true);
 for(const value of ['','off','unknown',`${pair}-drift`])assert.equal(accountPreferenceAdmitted({...production,ACCOUNT_PREFERENCE_RECIPE:value},dataset,manifest),false);
 for(const key of ['profileSetVersion','recipeSourceSha256','profileContentsSha256'])assert.equal(accountPreferenceAdmitted(production,{...dataset,[key]:'drift'},manifest),false);
 assert.equal(accountPreferenceAdmitted({...production,NEXT_PUBLIC_NEW_LESSON_ORDER:'reachable-v3'},dataset,manifest),false);
 assert.equal(accountPreferenceAdmitted({...production,ACCOUNT_PREFERENCE_RECIPE:pair},dataset,{...manifest,status:'proposed'}),false);
 assert.equal(accountPreferenceAdmitted({NODE_ENV:'production',VERCEL_ENV:'preview',ACCOUNT_PREFERENCE_RECIPE:pair},dataset,{...manifest,status:'proposed'}),true);
});
