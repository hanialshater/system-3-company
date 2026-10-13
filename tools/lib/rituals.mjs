// Pure ritual-trigger logic, shared by tools/rituals-due.mjs and HQ (src/lib/hq.ts). No I/O here.
// A ritual is "held" when an event of a held type lands in its room.
const HELD = new Set(["ritual", "publish", "decision"]);

/** @param {{ritual:string,room:string,every?:Record<string,number>,or?:string[],orHours?:number,why:string}[]} triggers
 *  @param {{ts:string,type:string,room:string}[]} events sorted by ts */
export function computeDue(triggers, events, now = Date.now()) {
  return triggers.map((tr) => {
    const held = events.filter((e) => e.room === tr.room && HELD.has(e.type)).at(-1);
    const since = held ? events.filter((e) => e.ts > held.ts) : events;
    const reasons = [];
    for (const [k, n] of Object.entries(tr.every ?? {})) {
      const c = since.filter((e) => e.type === k).length;
      if (c >= n) reasons.push(`${c} ${k} event(s) since last (threshold ${n})`);
    }
    for (const k of tr.or ?? []) if (since.some((e) => e.type === k)) reasons.push(`a new ${k}`);
    const hours = held ? (now - Date.parse(held.ts)) / 3.6e6 : Infinity;
    if (tr.orHours && hours >= tr.orHours) reasons.push(`${Number.isFinite(hours) ? Math.round(hours) + " h" : "never held"} (limit ${tr.orHours} h)`);
    return { ritual: tr.ritual, room: tr.room, last: held?.ts ?? null, due: reasons.length > 0, reasons, why: tr.why };
  });
}
