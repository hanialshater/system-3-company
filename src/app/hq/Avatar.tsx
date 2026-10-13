// Deterministic SVG avatars: the same seed always draws the same face. No images, no dependencies.
// The ring colour is the role's team colour; skin, hair and expression come from the seed.

const SKIN = ["#f6d2b8", "#eab894", "#d29b72", "#b07850", "#8a5a3b", "#5e3a24"];
const HAIR = ["#1f1a17", "#4a3020", "#7a4a26", "#b8792f", "#d9b26b", "#9a9a9a", "#2b2b5c", "#7b2d43"];

export function Face({ cx, cy, r, seed, color, dim, ring }: { cx: number; cy: number; r: number; seed: number; color: string; dim?: boolean; ring?: string }) {
  const skin = SKIN[seed % SKIN.length];
  const hair = HAIR[(seed >>> 3) % HAIR.length];
  const style = (seed >>> 6) % 5;
  const smile = (seed >>> 9) % 3;
  const glasses = (seed >>> 11) % 5 === 0;
  const u = r / 10;
  return (
    <g opacity={dim ? 0.45 : 1}>
      <circle cx={cx} cy={cy} r={r} fill={color} />
      <clipPath id={`clip-${seed}-${Math.round(cx)}-${Math.round(cy)}`}>
        <circle cx={cx} cy={cy} r={r - u * 1.2} />
      </clipPath>
      <g clipPath={`url(#clip-${seed}-${Math.round(cx)}-${Math.round(cy)})`}>
        <circle cx={cx} cy={cy} r={r} fill="color-mix(in srgb, var(--bg) 25%, white)" />
        {/* shoulders */}
        <ellipse cx={cx} cy={cy + u * 10} rx={u * 7.5} ry={u * 4.5} fill={color} opacity={0.9} />
        {/* long hair sits behind the head */}
        {style === 3 && <rect x={cx - u * 5.4} y={cy - u * 4} width={u * 10.8} height={u * 9} rx={u * 3} fill={hair} />}
        <circle cx={cx} cy={cy - u * 0.6} r={u * 4.6} fill={skin} />
        {style === 0 && <path d={`M${cx - u * 4.8} ${cy - u * 1.4} a${u * 4.8} ${u * 4.8} 0 0 1 ${u * 9.6} 0 q${-u * 4.8} ${-u * 2.2} ${-u * 9.6} 0z`} fill={hair} />}
        {style === 1 && <path d={`M${cx - u * 4.9} ${cy - u * 0.6} a${u * 4.9} ${u * 4.9} 0 0 1 ${u * 9.8} 0 l${-u * 1.2} ${-u * 1.6} q${-u * 3.7} ${-u * 1.4} ${-u * 7.4} 0z`} fill={hair} />}
        {style === 2 && <circle cx={cx} cy={cy - u * 5.4} r={u * 2.4} fill={hair} />}
        {style === 2 && <path d={`M${cx - u * 4.7} ${cy - u * 1.2} a${u * 4.7} ${u * 4.7} 0 0 1 ${u * 9.4} 0z`} fill={hair} />}
        {style === 3 && <path d={`M${cx - u * 5} ${cy - u * 0.8} a${u * 5} ${u * 5} 0 0 1 ${u * 10} 0 q${-u * 5} ${-u * 3} ${-u * 10} 0z`} fill={hair} />}
        {style === 4 && <path d={`M${cx - u * 4.6} ${cy - u * 2.2} q${u * 4.6} ${-u * 4.6} ${u * 9.2} 0`} stroke={hair} strokeWidth={u * 1.6} fill="none" strokeLinecap="round" />}
        <circle cx={cx - u * 1.7} cy={cy - u * 0.3} r={u * 0.6} fill="#1b1b1b" />
        <circle cx={cx + u * 1.7} cy={cy - u * 0.3} r={u * 0.6} fill="#1b1b1b" />
        {glasses && (
          <g stroke="#1b1b1b" strokeWidth={u * 0.45} fill="none">
            <circle cx={cx - u * 1.7} cy={cy - u * 0.3} r={u * 1.3} />
            <circle cx={cx + u * 1.7} cy={cy - u * 0.3} r={u * 1.3} />
            <path d={`M${cx - u * 0.4} ${cy - u * 0.3} h${u * 0.8}`} />
          </g>
        )}
        <path
          d={smile === 0 ? `M${cx - u * 1.6} ${cy + u * 1.6} q${u * 1.6} ${u * 1.4} ${u * 3.2} 0` : smile === 1 ? `M${cx - u * 1.3} ${cy + u * 1.9} h${u * 2.6}` : `M${cx - u * 1.8} ${cy + u * 1.4} q${u * 1.8} ${u * 2} ${u * 3.6} 0`}
          stroke="#7a3b2e"
          strokeWidth={u * 0.6}
          fill="none"
          strokeLinecap="round"
        />
      </g>
      {ring && <circle cx={cx} cy={cy} r={r + u * 1.2} fill="none" stroke={ring} strokeWidth={u * 1.4} />}
    </g>
  );
}

/** An avatar as a standalone inline SVG, for lists and the org tree. */
export function Avatar({ seed, color, size = 32, dim, ring }: { seed: number; color: string; size?: number; dim?: boolean; ring?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" style={{ flex: "none" }}>
      <Face cx={14} cy={14} r={12} seed={seed} color={color} dim={dim} ring={ring} />
    </svg>
  );
}
