'use client';
import { useEffect, useRef, useState } from 'react';
import { EXPERIENCE_CHOICES, emptyPreferences, type AccountPreferences } from '@/lib/account-preference-types';
import { readAccountPreferences, writeAccountPreferences, watchPreferences, withdrawPreferenceMatching, type PreferenceRead } from './preferences-client';
const labels = { gentle: 'Gentle', balanced: 'Balanced', demanding: 'Demanding' };
export default function PreferenceEditor({ domains }: {
    domains: {
        id: string;
        short: string;
    }[];
}) {
    const [saved, setSaved] = useState<PreferenceRead | null>(null), [draft, setDraft] = useState<AccountPreferences>(emptyPreferences), [state, setState] = useState('loading');
    const generation = useRef(0);
    useEffect(() => {
        let live = true;
        const refresh = async () => { const n = ++generation.current; setSaved(null); setDraft(emptyPreferences()); setState('loading'); try {
            const value = await readAccountPreferences();
            if (live && n === generation.current) {
                setSaved(value);
                setDraft(value?.settings ?? emptyPreferences());
                setState(value ? 'ready' : 'unavailable');
            }
        }
        catch {
            if (live && n === generation.current)
                setState('unavailable');
        } };
        const focus = () => { if (document.visibilityState === 'visible')
            void refresh(); };
        void refresh();
        window.addEventListener('focus', focus);
        document.addEventListener('visibilitychange', focus);
        const unwatch = watchPreferences(() => void refresh());
        return () => { live = false; generation.current++; unwatch(); window.removeEventListener('focus', focus); document.removeEventListener('visibilitychange', focus); };
    }, []);
    const toggle = (key: 'subjects' | 'experiences', id: string) => setDraft(d => ({ ...d, [key]: d[key].includes(id) ? d[key].filter(v => v !== id) : [...d[key], id] }));
    async function save(mode: 'save' | 'enable' | 'off' | 'reset') {
        if (!saved)
            return;
        const tag = saved.accountTag;
        setState('saving');
        const patch: Partial<AccountPreferences> = mode === 'reset' ? { ...emptyPreferences(), personalizationOn: false } : mode === 'off' ? { personalizationOn: false } : { subjects: draft.subjects, experiences: draft.experiences, challenge: draft.challenge, ...(mode === 'enable' ? { personalizationOn: true } : {}) };
        // Off/reset withdraw the active local order before acknowledgement. Failed writes stay visibly unsaved.
        if (mode === 'off' || mode === 'reset')
            withdrawPreferenceMatching();
        try {
            const value = await writeAccountPreferences(tag, patch);
            if (!value) {
                setState('error');
                return;
            }
            setSaved(value);
            setDraft(value.settings);
            setState('saved');
        }
        catch {
            setState('error');
        }
    }
    return <section aria-labelledby="preferences-heading" style={{ display: 'grid', gap: 14, maxWidth: 600 }}>
  <h2 id="preferences-heading">Your feed preferences</h2>
  <p>Optional. Save subjects, experiences and preferred challenge to your account. They describe what you want to explore, not your ability. Choices follow your account after a refresh. You can export or clear them in your profile.</p>
  {state === 'loading' ? <p role="status">Loading saved choices…</p> : !saved ? <p>Sign in to save preferences. If you are signed in, preferences may be temporarily unavailable. <a href="/profile">Open profile</a> · <button type="button" onClick={() => window.location.reload()}>Try again</button></p> : <>
   <p>Matching is {saved.settings.personalizationOn === true ? 'on' : 'off'}.</p>
   <fieldset disabled={state === 'saving'}><legend>Subjects</legend>{domains.map(d => <label key={d.id} style={{ display: 'inline-flex', gap: 6, padding: 8, minHeight: 44, alignItems: 'center' }}><input type="checkbox" checked={draft.subjects.includes(d.id)} onChange={() => toggle('subjects', d.id)}/>{d.short}</label>)}</fieldset>
   <fieldset disabled={state === 'saving'}><legend>What would you enjoy?</legend>{EXPERIENCE_CHOICES.map(([id, label]) => <label key={id} style={{ display: 'block', padding: 8, minHeight: 44, alignItems: 'center' }}><input type="checkbox" checked={draft.experiences.includes(id)} onChange={() => toggle('experiences', id)}/> {label}</label>)}</fieldset>
   <label>Preferred challenge <select style={{ minHeight: 44 }} value={draft.challenge ?? ''} disabled={state === 'saving'} onChange={e => setDraft(d => ({ ...d, challenge: (e.target.value || null) as AccountPreferences['challenge'] }))}><option value="">Any challenge</option>{Object.entries(labels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
    <button type="button" style={{ minHeight: 44, padding: "8px 12px" }} disabled={state === 'saving'} onClick={() => void save(saved.settings.personalizationOn === true ? 'save' : 'enable')}>{saved.settings.personalizationOn === true ? 'Save changes' : 'Save and enable'}</button>
    <button type="button" style={{ minHeight: 44, padding: "8px 12px" }} disabled={state === 'saving'} onClick={() => void save('off')}>Turn matching off</button>
    <button type="button" style={{ minHeight: 44, padding: "8px 12px" }} disabled={state === 'saving'} onClick={() => void save('reset')}>Clear choices and turn off</button>
   </div>
   <p role="status">{state === 'saving' ? 'Saving…' : state === 'saved' ? 'Saved to your account. Refresh the feed to apply.' : state === 'error' ? 'Not saved. Check your connection or account, then try again.' : ''}</p>
  </>}
  <a href="/">{saved ? 'Back to feed' : 'Skip — use default feed'}</a>
 </section>;
}
