// A watercolor illustration on a paper frame (company/design/illustration.md). Images live in
// public/illustrations/<slug>/ and get there only through `tools/illustrations.mjs accept` (after review).
// Alt text is required. A small "AI-generated illustration" note keeps provenance honest.
import s from "./illustration.module.css";

export function Illustration({ slug, file = "01.webp", alt, ratio = "1 / 1" }: { slug: string; file?: string; alt: string; ratio?: string }) {
  return (
    <figure className={s.frame} style={{ aspectRatio: ratio }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.img} src={`/illustrations/${slug}/${file}`} alt={alt} loading="lazy" decoding="async" />
      <figcaption className={s.note}>AI-generated illustration</figcaption>
    </figure>
  );
}
