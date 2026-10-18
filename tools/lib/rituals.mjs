// Pure ritual-trigger logic, shared by tools/rituals-due.mjs and HQ (src/lib/hq.ts). No I/O here: the committed
// record files are read by tools/lib/ritual-records.mjs and passed in as record events.
//
// When is a ritual "held"? (external assessment 2026-10-17 §3: a lone event in a room used to reset Project Review)
//   1. Primary, every ritual: a committed record file for THIS ritual, company/rituals/records/<date>-<ritual>*.md
//      (or company/engineering/operations/<date>-ops-review*.md). It arrives as a record event:
//      { type: "ritual", ritual: "<id>", record: "<path>", ts: <last commit time>, room }.
//   2. Secondary, only where a trigger says so in triggers.json (`heldByEvents: [types]`): an event of one of those
//      types in the trigger's room. Today only launch-review has it (`publish`): the launch room's publishes are the
//      publish loop that the trigger asks for (triggers.json "why"; company/ops/events.md, launch-room).
// Any other event (a decision, a ritual event with no record, a note) in the room no longer resets the cadence.

const isRecordFor = (e, tr) => e.type === "ritual" && typeof e.record === "string" && e.ritual === tr.ritual;
const isSecondaryFor = (e, tr) => e.room === tr.room && Array.isArray(tr.heldByEvents) && tr.heldByEvents.includes(e.type);

/** @param {{ritual:string,room:string,every?:Record<string,number>,or?:string[],orMatch?:{type:string,summary:string,label?:string}[],orHours?:number,heldByEvents?:string[],why:string}[]} triggers
 *  @param {{ts:string,type:string,room:string,summary?:string,ritual?:string,record?:string,id?:string}[]} events sorted by ts, record events included
 *  `orMatch` (2026-10-14, risk-in-ops-review decision): fire on a new event of `type` whose summary matches the
 *  regular expression `summary`, e.g. {type:"incident", summary:"^SEV[12]\\b"} fires ops-review on a new SEV1 or SEV2 only. */
export function computeDue(triggers, events, now = Date.now()) {
  return triggers.map((tr) => {
    const held = events.filter((e) => isRecordFor(e, tr) || isSecondaryFor(e, tr)).at(-1);
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
    const heldBy = held ? (isRecordFor(held, tr) ? `record ${held.record}` : `event ${held.id ?? held.ts} (${held.type}, secondary)`) : null;
    return { ritual: tr.ritual, room: tr.room, last: held?.ts ?? null, heldBy, due: reasons.length > 0, reasons, why: tr.why };
  });
}
