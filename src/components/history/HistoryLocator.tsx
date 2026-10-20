import s from "./HistoryLocator.module.css";

/** Geographic context only; the lesson's records carry its historical evidence. */
export function HistoryLocator({ slug, places }: { slug: string; places: readonly string[] }) {
  return (
    <figure className={s.figure} data-testid="history-locator">
      <img
        className={s.image}
        src={`/history-maps/${slug}.svg`}
        width={360}
        height={164}
        alt={`Location map: ${places.join(" and ")}. Approximate modern reference points; no historical borders or routes.`}
      />
      <figcaption className={s.caption}>Location guide · modern coastlines</figcaption>
    </figure>
  );
}
