"use client";

import { useEffect, useState } from "react";
import { readReactions, type Reactions } from "./SocialActions";

export default function LibraryView() {
  const [reactions, setReactions] = useState<Reactions | null>(null);
  const [tab, setTab] = useState<"saved" | "liked">("saved");
  useEffect(() => {
    const sync = () => setReactions(readReactions());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("s3-social", sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener("s3-social", sync); };
  }, []);
  const lessons = Object.entries(reactions ?? {}).filter(([, reaction]) => reaction[tab]);
  return <>
    <div className="library-tabs" aria-label="Library views">
      <button type="button" aria-pressed={tab === "saved"} onClick={() => setTab("saved")}>Saved</button>
      <button type="button" aria-pressed={tab === "liked"} onClick={() => setTab("liked")}>Liked</button>
    </div>
    <p className="muted small">Lessons you kept on this browser. This collection does not sync with your account.</p>
    {reactions === null ? <p role="status">Loading your library…</p> : lessons.length ?
      <ul className="library-list">{lessons.map(([slug, reaction]) => <li key={slug}><a href={`/d/${encodeURIComponent(slug)}`}><span>{reaction.title}</span><span aria-hidden="true">↗</span></a></li>)}</ul> :
      <div className="library-empty"><h2>{tab === "saved" ? "Keep a good idea." : "Find your favorites."}</h2><p>{tab === "saved" ? "Tap Save on any lesson. It will be waiting here." : "Like a lesson and come back to it here."}</p><a href="/">Explore lessons →</a></div>}
  </>;
}
