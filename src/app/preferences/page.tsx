import PreferenceEditor from '@/components/account/PreferenceEditor';
import { domains } from '@/lib/catalog';
export const metadata = { title: 'Feed preferences — System 3', robots: { index: false } };
export default function PreferencesPage() { return <main className="personal-page" style={{ padding: 24, maxWidth: 680, margin: 'auto' }}><nav><a href="/">← Feed</a> · <a href="/profile">Profile</a></nav><h1>Make your feed yours</h1><PreferenceEditor domains={domains.map(({ id, short }) => ({ id, short }))}/></main>; }
