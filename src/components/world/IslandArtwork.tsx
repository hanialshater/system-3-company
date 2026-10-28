/** Only mapped islands receive bespoke art; every other island retains the ordinary fallback. */
export const ISLAND_ARTWORK = {
  "number-island": { base: "number-island.svg", layers: [
    { file: "ambient-water.svg", className: "water" },
    { file: "ambient-clouds.svg", className: "clouds" },
    { file: "ambient-beam.svg", className: "beam" },
    { file: "ambient-boat.svg", className: "boat" },
  ] },
} as const;
import styles from "./world.module.css";
export function hasIslandArtwork(id: string): id is keyof typeof ISLAND_ARTWORK { return Object.hasOwn(ISLAND_ARTWORK, id); }
export function IslandArtwork({ islandId, motionEnabled }: { islandId: keyof typeof ISLAND_ARTWORK; motionEnabled: boolean }) {
  const scene = ISLAND_ARTWORK[islandId];
  return <div className={styles.islandArtwork} data-motion={motionEnabled ? "on" : "off"} aria-hidden="true">
    <img className={styles.artBase} src={`/illustrations/world/${scene.base}`} width="1000" height="1400" alt="" draggable={false}/>
    {scene.layers.map(layer=><img key={layer.file} className={`${styles.ambientLayer} ${styles[layer.className]}`} src={`/illustrations/world/${layer.file}`} width="1000" height="1400" alt="" draggable={false}/>)}
  </div>;
}
