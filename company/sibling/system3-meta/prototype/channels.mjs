// Channels and broadcast: one-to-many on top of the point-to-point mailbox.
//
//   channel create   company (everyone active), lane:<l> (the lane's roles), role:<level> (every role of a level),
//                    topic (explicit members). Membership of company/lane/role channels is computed at post time, so
//                    hires and retirements are always current; topic channels keep a member list.
//   post             fans out one mailbox message (kind "post") per member, each with its own key, so a re-post with the
//                    same key delivers nothing twice. `ack: true` asks every member to acknowledge.
//   status           who has read and acked a post, and who has not: "everyone was told" becomes checkable.
// Who may post: company → founder or chief of staff; lane:<l> → that lane's manager or the chief of staff;
// role:<level> → the chief of staff; topic → its members.
import { Refused, lanesOf } from "./lib.mjs";

const refuse = (m) => { throw new Refused(`HARD: ${m}`); };
const store = (co) => (co.data.channels ??= { channels: new Map(), posts: new Map(), n: 0 });

export function createChannel(co, { by, id, kind, members = [], title = "" }) {
  const s = store(co);
  if (s.channels.has(id)) refuse(`channel ${id} exists`);
  const lvl = co.org.role(by)?.level;
  if (!["company", "lane", "role", "topic"].includes(kind)) refuse("kind is company, lane, role or topic");
  if (kind !== "topic" && !["founder", "chief-of-staff"].includes(lvl) && !(kind === "lane" && lvl === "manager" && id === `lane:${co.org.role(by).lane}`)) refuse(`${by} may not create ${kind} channels`);
  if (kind === "lane" && !/^lane:/.test(id)) refuse("a lane channel is named lane:<lane>");
  if (kind === "role" && !/^role:/.test(id)) refuse("a role channel is named role:<level>");
  for (const m of members) if (!co.org.role(m)) refuse(`no role ${m}`);
  const c = { id, kind, title, by, members: kind === "topic" ? [...new Set([by, ...members])] : null, created: co.engine.clock.now() };
  s.channels.set(id, c);
  co.log.add({ type: "channel-create", channel: id, kind, by });
  return c;
}

export function membersOf(co, id) {
  const c = store(co).channels.get(id);
  if (!c) refuse(`no channel ${id}`);
  const act = co.org.active().filter((r) => !r.human || r.level === "founder");
  if (c.kind === "company") return act.map((r) => r.id);
  if (c.kind === "lane") { const lane = id.slice(5); return act.filter((r) => lanesOf(r).includes(lane)).map((r) => r.id); } // M6 prep: a builder of several lanes
  if (c.kind === "role") { const lvl = id.slice(5); return act.filter((r) => r.level === lvl).map((r) => r.id); }
  return c.members.filter((m) => co.org.role(m)?.active);
}

export function mayPost(co, by, c) {
  const r = co.org.role(by);
  if (!r) return false;
  if (["founder", "chief-of-staff"].includes(r.level)) return true;
  if (c.kind === "lane") return r.level === "manager" && `lane:${r.lane}` === c.id;
  if (c.kind === "topic") return c.members.includes(by);
  return false;
}

export function post(co, { by, channel, title, body = "", ack = false, key = null, ref = null }) {
  const s = store(co);
  const c = s.channels.get(channel);
  if (!c) refuse(`no channel ${channel}`);
  if (!mayPost(co, by, c)) refuse(`${by} may not post to ${channel}`);
  if (!title) refuse("a post has a title");
  if (key && [...s.posts.values()].some((p) => p.key === key)) { co.log.add({ type: "dedupe", post: key }); return [...s.posts.values()].find((p) => p.key === key); }
  const id = `P-${++s.n}`;
  const to = membersOf(co, channel).filter((m) => m !== by);
  const p = { id, channel, by, title, body, ack, key, ref, t: co.engine.clock.now(), to, msgs: {} };
  for (const m of to) p.msgs[m] = co.mailbox.send({ from: by, to: m, kind: "post", key: `${id}:${m}`, ref: id, body: { channel, title, ack } }).id;
  s.posts.set(id, p);
  co.log.add({ type: "post", post: id, channel, by, title, recipients: to.length, ack });
  return p;
}

/** A member reads a post (marks the delivery read); acks it if asked to. */
export function read(co, { by, post: id, ackIt = false }) {
  const p = store(co).posts.get(id);
  if (!p) refuse(`no post ${id}`);
  const mid = p.msgs[by];
  if (!mid) refuse(`${by} was not sent ${id}`);
  const m = co.mailbox.msgs.get(mid);
  if (!m.readAt) { m.readAt = co.engine.clock.now(); co.log.add({ type: "post-read", post: id, by }); }
  if (ackIt) { if (!p.ack) refuse(`${id} does not ask for acks`); if (!m.acked) { m.acked = true; co.log.add({ type: "ack", msg: mid, by, post: id }); } }
  return { post: id, channel: p.channel, title: p.title, body: p.body, by: p.by, ack: p.ack };
}

export function status(co, id) {
  const p = store(co).posts.get(id);
  if (!p) refuse(`no post ${id}`);
  const rows = p.to.map((m) => ({ member: m, read: !!co.mailbox.msgs.get(p.msgs[m]).readAt, acked: !!co.mailbox.msgs.get(p.msgs[m]).acked }));
  return { post: id, channel: p.channel, title: p.title, recipients: rows.length, read: rows.filter((r) => r.read).length, acked: rows.filter((r) => r.acked).length, missingAck: p.ack ? rows.filter((r) => !r.acked).map((r) => r.member) : [], unread: rows.filter((r) => !r.read).map((r) => r.member) };
}

/** A member's unread posts, newest first. */
export function inbox(co, by) {
  return [...store(co).posts.values()].filter((p) => p.msgs[by] && !co.mailbox.msgs.get(p.msgs[by]).readAt).sort((a, b) => b.t - a.t).map((p) => ({ post: p.id, channel: p.channel, title: p.title, ack: p.ack }));
}
