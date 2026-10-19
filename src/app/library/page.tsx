import LibraryView from "@/components/LibraryView";

export const metadata = { title: "Library — System 3", robots: { index: false } };
export default function LibraryPage() {
  return <main className="personal-page"><nav aria-label="Main navigation"><a href="/">← Feed</a><a href="/profile">Profile</a></nav><p className="personal-eyebrow">YOUR COLLECTION</p><h1>Library</h1><LibraryView /></main>;
}
