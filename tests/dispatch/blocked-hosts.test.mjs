// tools/blocked-hosts.mjs (W-1335): scan, probe and list, all on tmp fixtures. No network: probe gets a fake HEAD.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { scan, probe, classify, listing, blockedMention } from "../../tools/blocked-hosts.mjs";

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "s3-bh-"));
  const w = (rel, text) => { fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true }); fs.writeFileSync(path.join(root, rel), text); };
  w("company/reviews/a/2026-10-14-fact-check.md", "Blocked: gallica.bnf.fr, Wikipedia (proxy 403).\nOpened: raw.githubusercontent.com.\n");
  w("company/reviews/b/2026-10-16-fact-check.md", "pmc.ncbi.nlm.nih.gov open. gapminder.org returns 403.\n");
  w("src/demos/x/s/meta.json", JSON.stringify({ claims: [
    { id: "x.s.c1", status: "unverified", note: "HELD: gallica.bnf.fr refused by the proxy." },
    { id: "x.s.c2", status: "verified", note: "gallica.bnf.fr refused, verified from the CRAN doc instead." },
  ] }));
  const data = { hosts: [
    { host: "gallica.bnf.fr", match: "gallica" },
    { host: "en.wikipedia.org", match: "(?<!fr\\.)\\bwikipedia\\b" },
    { host: "www.ncbi.nlm.nih.gov", match: "(?<!pmc\\.)\\bncbi\\b" },
  ], knownOpen: [{ host: "raw.githubusercontent.com" }] };
  return { root, data };
}

test("scan: records and held claims come from sentences that name the host and a block word", () => {
  const { root, data } = fixture();
  scan(data, root);
  const g = data.hosts[0];
  assert.deepEqual(g.records, ["company/reviews/a/2026-10-14-fact-check.md"]);
  assert.equal(g.firstSeen, "2026-10-14");
  assert.deepEqual(g.heldClaims, ["x.s.c1"], "a verified claim is never counted as held");
  assert.equal(g.claimsHeld, 1);
  assert.equal(data.hosts[1].records.length, 1);
  assert.deepEqual(data.hosts[2].records, [], "'pmc.ncbi … open' next to another host's 403 is not a block of ncbi");
});

test("blockedMention needs host and block word in the same sentence", () => {
  assert.equal(blockedMention("archive.org opened. arxiv.org 403.", /archive\.org/i), false);
  assert.equal(blockedMention("archive.org and arxiv.org: proxy 403.", /archive\.org/i), true);
});

test("classify maps curl outcomes to one word", () => {
  assert.equal(classify({ exit: 56, httpCode: "000", connectCode: "403" }), "proxy-403");
  assert.equal(classify({ exit: 0, httpCode: "301", connectCode: "200" }), "http-301");
  assert.equal(classify({ exit: 28, httpCode: "000", connectCode: "000" }), "timeout");
  assert.equal(classify({ exit: 6 }), "dns");
  assert.equal(classify({ exit: 99 }), "error-99");
});

test("a second probe changes only lastProbe", async () => {
  const { root, data } = fixture();
  scan(data, root);
  let n = 0;
  await probe(data, { head: async () => "proxy-403", now: () => "2026-10-16T14:00:00.000Z" });
  const before = JSON.parse(JSON.stringify(data));
  await probe(data, { head: async (h) => { n++; return h.startsWith("raw.") ? "http-200" : "proxy-403"; }, now: () => "2026-10-16T14:05:00.000Z" });
  assert.equal(n, 4, "one HEAD per host, controls included");
  const strip = (d) => JSON.stringify(d, (k, v) => (k === "lastProbe" ? undefined : v));
  assert.equal(strip(data), strip(before));
  assert.equal(data.hosts[0].lastProbe.at, "2026-10-16T14:05:00.000Z");
  assert.match(listing(data), /gallica\.bnf\.fr/);
});
