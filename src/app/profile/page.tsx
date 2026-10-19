import AccountView from "@/components/account/AccountView";

export const metadata = { title: "Profile — System 3", robots: { index: false } };
export default function ProfilePage() {
  return <div className="personal-page profile-page"><nav aria-label="Main navigation"><a href="/">← Feed</a><a href="/library">Library</a></nav><p className="personal-eyebrow">YOUR SPACE</p><h1>Profile</h1><p className="muted">Your account and learning history.</p><AccountView /></div>;
}
