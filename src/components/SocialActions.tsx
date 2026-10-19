"use client";

import { useEffect, useRef, useState } from "react";

type Reaction = { title: string; liked: boolean; saved: boolean };
type Reactions = Record<string, Reaction>;
const KEY = "s3-social-v1";
function read(): Reactions {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(Object.entries(value).filter(([, v]) => v && typeof v.title === "string" && typeof v.liked === "boolean" && typeof v.saved === "boolean"));
  } catch { return {}; }
}

export function SocialActions({ slug, title }: { slug: string; title: string }) {
  const [reactions, setReactions] = useState<Reactions>({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const collectionButton = useRef<HTMLButtonElement>(null);
  const close = () => { setOpen(false); collectionButton.current?.focus(); };
  useEffect(() => {
    const sync = () => setReactions(read());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("s3-social", sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener("s3-social", sync); };
  }, []);
  const current = reactions[slug];
  const toggle = (field: "liked" | "saved") => {
    const all = read();
    const next = { ...all, [slug]: { title, liked: all[slug]?.liked ?? false, saved: all[slug]?.saved ?? false, [field]: !all[slug]?.[field] } };
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setReactions(next);
      window.dispatchEvent(new Event("s3-social"));
      setMessage(field === "saved" ? (next[slug].saved ? "Saved on this device" : "Removed from saved") : "");
    } catch { setMessage("Couldn’t save your choice. Device storage is unavailable."); }
  };
  const share = async () => {
    const url = new URL(`/d/${slug}`, location.origin).href;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else { await navigator.clipboard.writeText(url); setMessage("Link copied"); }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) setMessage("Couldn’t share. Open the lesson and copy its address.");
    }
  };
  return <>
    <div className="social-actions" aria-label="Lesson actions">
      <button type="button" aria-pressed={!!current?.liked} onClick={() => toggle("liked")}><ActionIcon name="heart" />{current?.liked ? "Liked" : "Like"}</button>
      <button type="button" aria-pressed={!!current?.saved} onClick={() => toggle("saved")}><ActionIcon name="bookmark" />{current?.saved ? "Saved" : "Save"}</button>
      <button type="button" onClick={share}><ActionIcon name="share" />Share</button>
      <button ref={collectionButton} type="button" onClick={() => setOpen(true)}><ActionIcon name="collection" />Library</button>
    </div>
    <p className="social-message" role="status">{message}</p>
    {open && <div className="sheet" role="dialog" aria-modal="true" aria-label="Saved lessons" onKeyDown={(e) => {
      if (e.key === "Escape") { e.stopPropagation(); close(); }
      if (e.key === "Tab") {
        const elements = e.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
        const first = elements[0], last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }}>
      <div className="sheet-inner"><div className="sheet-head"><h3>Saved lessons</h3><button autoFocus type="button" className="link" onClick={close}>Close</button></div>
        <p className="muted small">Your collection on this device.</p>
        <ul className="saved-lessons">{Object.entries(reactions).filter(([, r]) => r.saved).map(([id, r]) => <li key={id}><a href={`/d/${encodeURIComponent(id)}`}>{r.title}</a></li>)}</ul>
        {!Object.values(reactions).some((r) => r.saved) && <p>Save a lesson to find it here later.</p>}
      </div>
    </div>}
  </>;
}

function ActionIcon({ name }: { name: "heart" | "bookmark" | "share" | "collection" }) {
  const paths = {
    heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
    bookmark: "M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z",
    share: "m14 3 8 8-8 8v-5C8 14 4 16 2 21c0-10 5-14 12-14V3Z",
    collection: "M4 6h4v15H4V6Zm6-3h4v18h-4V3Zm6 4 4-1 4 14-4 1-4-14Z",
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="30" height="30"><path d={paths[name]} /></svg>;
}
