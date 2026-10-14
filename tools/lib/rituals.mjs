// Pure ritual-trigger logic, shared by tools/rituals-due.mjs and HQ (src/lib/hq.ts). No I/O here.
// A ritual is "held" when an event of a held type lands in its room.
const HELD = new Set(["ritual", "publish", "decision"]);

/** @param {{ritual:string,room:string,every?:Record<string,number>,or?:string[],orMatch?:{type:string,summary:string,label?:string}[],orHours?:number,why:string}[]} triggers
 *  @param {{ts:string,type:string,room:string,summary?:string}[]} events sorted by ts
 *  `orMatch` (2026-10-14, risk-in-ops-review decision): fire on a new event of `type` whose summary matches the
 *  regular expression `summary`, e.g. {type:"incident", summary:"^SEV[12]\\b"} fires ops-review on a new SEV1 or SEV2 only. */
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
    for (const m of tr.orMatch ?? []) {
      const re = new RegExp(m.summary);
      if (since.some((e) => e.type === m.type && re.test(e.summary ?? ""))) reasons.push(`a new ${m.label ?? m.type + " matching /" + m.summary + "/"}`);
    }
    const hours = held ? (now - Date.parse(held.ts)) / 3.6e6 : Infinity;
    if (tr.orHours && hours >= tr.orHours) reasons.push(`${Number.isFinite(hours) ? Math.round(hours) + " h" : "never held"} (limit ${tr.orHours} h)`);
    return { ritual: tr.ritual, room: tr.room, last: held?.ts ?? null, due: reasons.length > 0, reasons, why: tr.why };
  });
}
