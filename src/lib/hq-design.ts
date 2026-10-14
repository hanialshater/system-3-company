// Read side of the HQ Design inspector (/hq/design): every UI concept (lesson format, interaction
// pattern, visual style) from company/design/concepts/*.md, the lessons that use it (detected from
// their Demo.tsx and styles.module.css), review findings that touch it, and its variants. Repo files
// only; nothing is written here. Owner: design-engineer.
//
// Detection is heuristic: each detector lists the signals it looks for and a confidence, and the
// inspector shows which signal matched for every lesson, so a designer can judge a false positive.
import { type Meta, type Verdict, front, hasSheet, latestLearnerReview, lessonMetas, ls, p, read, readJson, verdictOf } from "./hq-lessons";

export type Kind = "format" | "interaction" | "visual";
export type Status = "proposed" | "approved" | "kit-supported" | "retired";
export const KINDS: Kind[] = ["format", "interaction", "visual"];
export const STATUSES: Status[] = ["proposed", "approved", "kit-supported", "retired"];
export type Confidence = "exact" | "high" | "medium" | "low" | "none";
export type FindingTag = "layout" | "told-not-shown" | "contrast" | "tap-size" | "motion" | "pattern" | "code";

export interface Section {
  title: string;
  items: string[];
}

export interface UiConcept {
  id: string;
  name: string;
  kind: Kind;
  status: Status;
  owner: string;
  kit: string;
  /** "kit" when a kit component carries it, "by hand" when lessons build it, "none" when it cannot be built yet. */
  kitClass: "kit" | "by hand" | "none";
  seeded: boolean;
  summary: string;
  provenance: string;
  sections: Section[];
  references: string[];
  variants: string[];
  path: string;
  mockups: string[];
  detect: { how: string; confidence: Confidence; signals: string[]; note?: string };
  /** Lessons that use it: slug and the indexes (into detect.signals) of the signals that matched. -1 = listed as a reference. */
  usage: { slug: string; s: number[] }[];
  findings: number;
  findingsByTag: Partial<Record<FindingTag, number>>;
}

export interface LessonLite {
  slug: string;
  title: string;
  domain: string;
  status: string;
  verdict: Verdict | null;
  hasSheet: boolean;
}

export interface DesignIndex {
  concepts: UiConcept[];
  lessons: LessonLite[];
  domains: { id: string; name: string; color: string }[];
  errors: string[];
}

export interface Finding {
  slug: string;
  file: string;
  /** Link to the record (gated review route), or null for code findings. */
  href: string | null;
  source: "learner" | "design" | "a11y" | "code";
  tags: FindingTag[];
  text: string;
}

export interface ConceptDetail {
  id: string;
  body: string;
  findings: Finding[];
  total: number;
}

// ---------------------------------------------------------------- lessons as source text

interface Src {
  slug: string;
  meta: Meta & { dir: string };
  tsx: string;
  css: string;
  illustrated: boolean;
}

function sources(): Src[] {
  return lessonMetas().map((m) => ({
    slug: m.slug,
    meta: m,
    tsx: read(p(m.dir, "Demo.tsx")) ?? "",
    css: read(p(m.dir, "styles.module.css")) ?? "",
    illustrated: ls(p("public/illustrations", m.slug)).some((f) => f.endsWith(".webp")),
  }));
}

// ---------------------------------------------------------------- detectors

type Test = (x: Src) => boolean;
interface Detector {
  how: string;
  confidence: Confidence;
  signals: [label: string, test: Test][];
  /** Review sentences that touch this pattern (with a problem word or a finding tag). */
  terms: RegExp;
  /** Finding tags that touch this pattern even without a term (e.g. contrast for colour roles). */
  autoTags?: FindingTag[];
  /** Problems visible in the code itself. */
  code?: [label: string, test: (x: Src) => string | null][];
  note?: string;
}

const re = (r: RegExp): Test => (x) => r.test(x.tsx);
const RUN_LABEL = />\s*\{?[^<{}]{0,12}\b(Run|Step|Next|Roll|Play|Release|Flip|Draw|Simulate|Start|Spin|Toss|Deal)\b/;
const TIME_SLIDER = /<Slider[^/]{0,200}?label=["{`][^"}`]*\b(time|Time|day|Day|year|Year|frame|Frame|week|Week|month|Month|hour|Hour|minute|Minute|second|generation|Generation|step|Step|round|Round)/;
const PLAY_LOOP = /setInterval|requestAnimationFrame/;
const TOGGLE = /aria-pressed|set\w+\(\(\w+\) => !\w+\)/;
const PROJECTIONS = /\bgeo(Mercator|EqualEarth|Orthographic|NaturalEarth1|Equirectangular|ConicEqualArea|AzimuthalEqualArea|AzimuthalEquidistant|Gnomonic|Stereographic|TransverseMercator|ConicConformal)\b/g;
const projections = (x: Src) => new Set([...x.tsx.matchAll(PROJECTIONS)].map((m) => m[1])).size;
const TWO_PANEL: [string, Test][] = [
  ["maps a pair of cases (SHAPES/LANES/SIDES/[0, 1]) into the stage", re(/\{\s*(\[0, 1\]|\["a", "b"\]|\[\s*"A", "B"\s*\]|[A-Z_]*(SHAPES|LANES|PANELS|SIDES|METHODS|RULES|CASES|PAIR|BOTH)[A-Z_]*)\.map\(/)],
  ["panel / lane / side class names", re(/s\.(lane|panel|pane|side|left|right|column|col)\b/)],
  ["two <svg> elements", re(/<svg[\s\S]*<svg/)],
  ["two-column grid in styles.module.css", (x) => /grid-template-columns:\s*(1fr 1fr|repeat\(2,|minmax\(0, *1fr\) minmax\(0, *1fr\))/.test(x.css)],
  ["an 'A vs B' readout label", re(/label=\{?["`][^"`]*\bvs\.? /)],
];
const ANIMATES = (x: Src) => PLAY_LOOP.test(x.tsx) || /transition|animation|@keyframes/.test(x.css);
const REDUCED = (x: Src) => /prefers-reduced-motion/.test(x.css) || /prefers-reduced-motion/.test(x.tsx);

const DETECTORS: Record<string, Detector> = {
  // formats
  "single-card": { how: "every lesson where no other format is detected", confidence: "medium", signals: [["no other format detected", () => false]], terms: /told, not shown|one picture|single card|too many controls/i, autoTags: ["told-not-shown"] },
  "simulation-run": { how: "imports the seeded generator from kit/random", confidence: "high", signals: [["imports mulberry32 / randInt", re(/\b(mulberry32|randInt)\b/)]], terms: /\b(seed|seeded|random|trial|trials|simulat|run|runs|tally|tallies)\b/i },
  "map-explorer": { how: "renders the kit <WorldMap>", confidence: "exact", signals: [["<WorldMap>", re(/<WorldMap\b/)]], terms: /\b(map|projection|label|country|countries|continent)\b/i },
  "side-by-side": { how: "two-panel heuristics on Demo.tsx and styles.module.css", confidence: "low", signals: TWO_PANEL, terms: /\b(panel|panels|side by side|side-by-side|two (places|pictures|lanes)|both|left|right|compare|comparison)\b/i, note: "Two-panel layouts are written in many ways; expect misses and false positives." },
  "before-after": { how: "a toggle plus the words before / after on the stage", confidence: "low", signals: [["a toggle and the words before / after", (x) => TOGGLE.test(x.tsx) && /["'>`][^"'<`\n]*\b(Before|After|before|after)\b[^"'<`\n]*["'<`]/.test(x.tsx)]], terms: /\b(before|after|toggle|switch)\b/i },
  "multi-card-sequence": { how: "meta.json format names it (no kit stepper exists yet)", confidence: "exact", signals: [["meta.format is multi-card", (x) => /multi/i.test(x.meta.format ?? "")]], terms: /\b(sub-card|step \d|card \d|sequence)\b/i },
  "storyboard-scrub": { how: "a Slider labelled with time, or a play loop next to a Slider", confidence: "medium", signals: [["Slider labelled with a unit of time", re(TIME_SLIDER)], ["play loop (setInterval / requestAnimationFrame) with a Slider", (x) => PLAY_LOOP.test(x.tsx) && /<Slider\b/.test(x.tsx)]], terms: /\b(timeline|scrub|frame|frames|time|play|animation)\b/i },
  debunk: { how: "meta.json format is debunk, or a Life Hacks lesson", confidence: "high", signals: [["meta.format is debunk", (x) => /debunk/i.test(x.meta.format ?? "")], ["Life Hacks domain", (x) => x.meta.domain === "lifehacks"]], terms: /\b(claim|myth|hack|safety|test)\b/i },
  // interactions
  "slider-drives-live-chart": { how: "a Slider plus SVG marks in the same stage", confidence: "medium", signals: [["<Slider> with SVG marks (path / polyline / rect / circle / line)", (x) => /<Slider\b/.test(x.tsx) && /<svg\b/.test(x.tsx) && /<(path|polyline|rect|circle|line)\b/.test(x.tsx)]], terms: /\bslider|drag the|slide\b/i },
  "step-run-button": { how: "a Control labelled Run / Step / Next / Roll / Play …", confidence: "medium", signals: [["Control labelled Run / Step / Next / Roll / Play / Flip …", re(RUN_LABEL)]], terms: /\b(step|run|play|button|restart|reset|next)\b/i, code: [["has a play loop but no Step control", (x) => (PLAY_LOOP.test(x.tsx) && RUN_LABEL.test(x.tsx) && !/>\s*\{?[^<{}]{0,12}\bStep\b/.test(x.tsx) ? "Plays or runs, but no Step control (demo standard: if there is a play button there is also a step button)." : null)]] },
  "drag-to-place": { how: "pointer or drag handlers in Demo.tsx", confidence: "high", signals: [["pointer / drag handlers", re(/onPointer(Down|Move)|onMouseDown|onTouchStart|draggable/)]], terms: /\b(drag|dragg|handle|grab|pointer)\b/i, code: [["drag without a keyboard path", (x) => (!/onKeyDown/.test(x.tsx) ? "Pointer handlers with no onKeyDown: check that a button or slider can reach the same states." : null)]] },
  "choice-before-reveal": { how: "the Lesson predict prop (every lesson)", confidence: "exact", signals: [["<Lesson predict=…>", re(/predict=\{\{?/)]], terms: /\b(predict|prediction|option|options|question|guess)\b/i },
  "toggle-before-after": { how: "aria-pressed, or a boolean flip in an onClick", confidence: "medium", signals: [["aria-pressed", re(/aria-pressed/)], ["boolean flip set(x => !x)", re(/set\w+\(\(\w+\) => !\w+\)/)]], terms: /\b(toggle|switch|on\/off|pressed)\b/i },
  "scrubber-timeline": { how: "a Slider labelled with time, or a play loop", confidence: "medium", signals: [["Slider labelled with a unit of time", re(TIME_SLIDER)], ["play loop (setInterval / requestAnimationFrame)", re(PLAY_LOOP)]], terms: /\b(timeline|scrub|scrubber|frame|play|pause|time slider)\b/i },
  "two-panel-shared-control": { how: "two-panel heuristics plus a Slider or Control", confidence: "low", signals: TWO_PANEL.map(([l, t]) => [l, (x: Src) => t(x) && /<(Slider|Control)\b/.test(x.tsx)] as [string, Test]), terms: /\b(panel|panels|both|left|right|two places|at once)\b/i, note: "Same heuristics as side-by-side." },
  "tally-counters": { how: "a Readout labelled with a count word, or a +1 counter", confidence: "medium", signals: [["Readout labelled count / total / hits / rolls / steps …", re(/<Readout[^/]{0,80}label="[^"]*(count|Count|total|Total|tally|hits|Hits|heads|Heads|tails|runs|Runs|trials|Trials|rolls|Rolls|flips|Flips|wins|Wins|steps|Steps|placed|Placed)/)], ["a +1 counter in state", (x) => /set\w+\(\(\w+\) => \w+ \+ 1\)/.test(x.tsx) && /<Readout\b/.test(x.tsx)]], terms: /\b(count|counter|tally|readout|total)\b/i },
  "map-projection-switch": { how: "two or more d3 projections named in one Demo.tsx", confidence: "high", signals: [["two or more projections", (x) => projections(x) >= 2]], terms: /\b(projection|mercator|equal-area|equal area|distort)\b/i },
  "preset-buttons": { how: "a Control whose onClick sets a literal number", confidence: "medium", signals: [["onClick sets a literal value", re(/onClick=\{\(\) => (?:\{\s*)?set\w+\(-?\d/)]], terms: /\b(preset|button|buttons)\b/i },
  "milestone-gate": { how: "imports Milestones / useMilestones from the kit", confidence: "exact", signals: [["Milestones / useMilestones", re(/useMilestones|<Milestones\b/)]], terms: /\b(milestone|reveal (button|unlock)|unlock|gate|gated|key state)\b/i },
  "locked-readouts": { how: "a readout value written as locked ? \"?\"", confidence: "high", signals: [["locked ? \"?\"", re(/locked \? ["']\?["']/)]], terms: /\b(readout|readouts|"\?"|question mark|gave (it|the answer) away|answer (shown|visible))\b/i },
  // visual
  "chart-style": { how: "a stage SVG with text labels", confidence: "medium", signals: [["<svg> with <text> labels", (x) => /<svg\b/.test(x.tsx) && /<text\b/.test(x.tsx)]], terms: /\b(axis|axes|label|labels|legend|chart|graph|diagram|unrounded|decimal)\b/i, autoTags: ["layout"] },
  "colour-roles": { how: "styles.module.css uses the colour tokens", confidence: "exact", signals: [["uses var(--good / --bad / --warn / --domain / --accent …)", (x) => /var\(--(good|bad|warn|domain|accent|muted|fg|bg|line)/.test(x.css)]], terms: /\b(colou?r|colou?rs|red|green|hue|colour-blind|color-blind)\b/i, autoTags: ["contrast"], code: [["hard-coded colours", (x) => { const n = (x.css.replace(/var\([^)]*\)/g, "").match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).length; return n ? `${n} hard-coded hex colour${n === 1 ? "" : "s"} in styles.module.css (not a token).` : null; }]] },
  "typography-scale": { how: "styles.module.css sets its own font sizes (deviations from the scale)", confidence: "exact", signals: [["sets font-size in styles.module.css", (x) => /font-size\s*:/.test(x.css)]], terms: /\b(text|font|words|wordy|read|reading|clipped|cut off|truncat)\b/i, autoTags: ["layout"], note: "Lists the lessons that override the type scale, not every lesson that shows text." },
  motion: { how: "a play loop in Demo.tsx, or transitions / animations in styles.module.css", confidence: "high", signals: [["play loop (setInterval / requestAnimationFrame)", re(PLAY_LOOP)], ["transition / animation in CSS", (x) => /transition|animation|@keyframes/.test(x.css)]], terms: /\b(animat|motion|moves too|too fast|jump|jumps|flicker)\b/i, autoTags: ["motion"], code: [["no reduced-motion rule", (x) => (ANIMATES(x) && !REDUCED(x) ? "Animates, with no prefers-reduced-motion rule in the lesson (globals.css may still cover CSS transitions)." : null)]] },
  "illustration-hero": { how: "renders the kit <Illustration>, or has accepted images", confidence: "exact", signals: [["<Illustration>", re(/<Illustration\b/)], ["images in public/illustrations/<slug>/", (x) => x.illustrated]], terms: /\b(illustration|image|picture|watercolou?r|alt text)\b/i },
  controls: { how: "uses the kit Control / Slider / Readout", confidence: "exact", signals: [["<Control> / <Slider> / <Readout>", re(/<(Control|Slider|Readout)\b/)]], terms: /\b(button|buttons|control|controls|slider|tap|tiny|small)\b/i, autoTags: ["tap-size"], code: [["raw elements", (x) => (/<button\b|<input\b/.test(x.tsx) ? "Raw <button> or <input> in Demo.tsx: no data-qa=\"control\" and no kit styling." : null)]] },
};

const FORMAT_IDS = new Set(["simulation-run", "map-explorer", "side-by-side", "before-after", "multi-card-sequence", "storyboard-scrub", "debunk"]);

// ---------------------------------------------------------------- concept files

const CONCEPT_DIR = "company/design/concepts";
const list = (v?: string) => (v ?? "").split(",").map((x) => x.trim()).filter(Boolean);

function parseBody(md: string): { summary: string; provenance: string; sections: Section[] } {
  const body = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
  const [head, ...rest] = body.split(/^## /m);
  const lines = head.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("# "));
  const provenance = lines.find((l) => /^_.*_$/.test(l))?.replace(/^_|_$/g, "") ?? "";
  const summary = lines.filter((l) => !/^_.*_$/.test(l)).join(" ");
  const sections = rest.map((sec) => {
    const [title, ...ls2] = sec.split("\n");
    const items: string[] = [];
    for (const l of ls2) {
      if (/^\s*[-*]\s+/.test(l)) items.push(l.replace(/^\s*[-*]\s+/, "").trim());
      else if (l.trim() && items.length) items[items.length - 1] += " " + l.trim();
      else if (l.trim()) items.push(l.trim());
    }
    return { title: title.trim(), items };
  });
  return { summary, provenance, sections };
}

function conceptFiles(errors: string[]) {
  const mockups = ls(p("company/design/specs"));
  const out: (Omit<UiConcept, "usage" | "findings" | "findingsByTag" | "detect"> & { body: string })[] = [];
  for (const f of ls(p(CONCEPT_DIR)).sort()) {
    if (!f.endsWith(".md") || f === "README.md" || f === "TEMPLATE.md") continue;
    const md = read(p(CONCEPT_DIR, f)) ?? "";
    const fm = front(md);
    const id = fm.id || f.replace(/\.md$/, "");
    const kind = fm.kind as Kind;
    const status = fm.status as Status;
    if (!KINDS.includes(kind)) errors.push(`${CONCEPT_DIR}/${f}: kind "${fm.kind ?? ""}" is not format | interaction | visual`);
    if (!STATUSES.includes(status)) errors.push(`${CONCEPT_DIR}/${f}: status "${fm.status ?? ""}" is not proposed | approved | kit-supported | retired`);
    if (id !== f.replace(/\.md$/, "")) errors.push(`${CONCEPT_DIR}/${f}: id "${id}" does not match the file name`);
    const kit = fm.kit || "by hand";
    const { summary, provenance, sections } = parseBody(md);
    out.push({
      id,
      name: fm.name || id,
      kind: KINDS.includes(kind) ? kind : "interaction",
      status: STATUSES.includes(status) ? status : "proposed",
      owner: fm.owner || "design-lead",
      kit,
      kitClass: /^none/i.test(kit) ? "none" : /^by hand/i.test(kit) ? "by hand" : "kit",
      seeded: Boolean(fm.seeded),
      summary,
      provenance,
      sections,
      references: list(fm.references),
      variants: list(fm.variants),
      path: `${CONCEPT_DIR}/${f}`,
      mockups: mockups.filter((m) => m.startsWith(`${id}.`) || m.startsWith(`${id}-`)).map((m) => `company/design/specs/${m}`),
      body: md,
    });
  }
  return out;
}

// ---------------------------------------------------------------- review findings

const NEG = "(?<!\\b(?:not|no|nothing|without|never) )";
const TAGS: [FindingTag, RegExp][] = [
  ["layout", new RegExp(`${NEG}(?:clipp|overlap|clutter|cramped|cut off|truncat|spills? (?:off|over)|off-screen|offscreen)`, "i")],
  ["told-not-shown", /told,? not shown(?!\s*:\s*(?:none|nothing|n\/a)\b)/i],
  ["contrast", /\bcontrast\b/i],
  ["tap-size", /\btap (?:target|size|area)|touch target|\b44 ?px\b|too small to (?:tap|hit|press)/i],
  ["motion", /reduced[- ]motion|\banimation (?:is |was )?too/i],
];
const PROBLEM = /\b(hard to|can't|cannot|couldn't|confus|unclear|missing|too (small|many|much|long|fast|close|busy)|doesn't|does not|didn't|did not|no way|wrong|broken|fails?|failed|stuck|illegible|unreadable|ambiguous|problem|issue|fix)\b/i;
const NOT_FINDING = /^(verdict|screenshots?|persona|reviewer|date|method|checker)\b/i;

interface Sentence {
  slug: string;
  file: string;
  source: Finding["source"];
  text: string;
  tags: FindingTag[];
  problem: boolean;
}

function reviewSentences(slug: string): Sentence[] {
  const dir = `company/reviews/${slug}`;
  const files: [string, Finding["source"]][] = [];
  const learner = latestLearnerReview(slug);
  if (learner) files.push([learner.file.split("/").pop()!, "learner"]);
  for (const f of ls(p(dir)).sort()) {
    if (/-design\.md$/.test(f)) files.push([f, "design"]);
    else if (/-(a11y|accessibility)\.md$/.test(f)) files.push([f, "a11y"]);
  }
  const out: Sentence[] = [];
  for (const [f, source] of files) {
    const text = read(p(dir, f));
    if (!text) continue;
    for (const line of text.split("\n")) {
      const l = line.replace(/^[\s>#*\-|]+/, "").replace(/\*\*/g, "").trim();
      if (l.length < 12 || NOT_FINDING.test(l)) continue;
      for (const raw of l.split(/(?<=[.!?])\s+(?=[A-Z(])/)) {
        const t = raw.trim();
        if (t.length < 12) continue;
        const tags = TAGS.filter(([, r]) => r.test(t)).map(([k]) => k);
        out.push({ slug, file: `${dir}/${f}`, source, text: t.length > 320 ? t.slice(0, 317) + "…" : t, tags, problem: PROBLEM.test(t) });
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------- the scan (cached briefly)

interface Scan {
  index: DesignIndex;
  bodies: Map<string, string>;
  findings: Map<string, Finding[]>;
}
let cached: { at: number; scan: Scan } | null = null;
const TTL_MS = 15_000;

function scan(): Scan {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.scan;
  const errors: string[] = [];
  const files = conceptFiles(errors);
  const src = sources();
  const bySlug = new Map(src.map((x) => [x.slug, x]));
  const sentences = new Map<string, Sentence[]>();
  const lessons: LessonLite[] = src.map((x) => {
    const r = latestLearnerReview(x.slug);
    return { slug: x.slug, title: x.meta.title, domain: x.meta.domain, status: x.meta.status, verdict: r ? verdictOf(r.text) : null, hasSheet: hasSheet(x.slug) };
  });
  const known = new Set(src.map((x) => x.slug));

  // Which lessons match which detector.
  const hits = new Map<string, Map<string, number[]>>();
  for (const [id, d] of Object.entries(DETECTORS)) {
    const m = new Map<string, number[]>();
    for (const x of src) {
      const s = d.signals.map(([, t], i) => (t(x) ? i : -2)).filter((i) => i >= 0);
      if (s.length) m.set(x.slug, s);
    }
    hits.set(id, m);
  }
  // Single card = no other format detected.
  const single = new Map<string, number[]>();
  for (const x of src) if (![...FORMAT_IDS].some((f) => hits.get(f)?.has(x.slug))) single.set(x.slug, [0]);
  hits.set("single-card", single);

  const bodies = new Map<string, string>();
  const findingsBy = new Map<string, Finding[]>();
  const concepts: UiConcept[] = files.map(({ body, ...c }) => {
    bodies.set(c.id, body);
    const d = DETECTORS[c.id];
    const m = new Map(hits.get(c.id) ?? []);
    for (const r of c.references) {
      if (!known.has(r)) errors.push(`${c.path}: reference "${r}" is not a lesson`);
      else if (!m.has(r)) m.set(r, [-1]);
      else m.set(r, [-1, ...m.get(r)!]);
    }
    const usage = [...m.entries()].map(([slug, s]) => ({ slug, s })).sort((a, b) => Number(b.s[0] === -1) - Number(a.s[0] === -1) || a.slug.localeCompare(b.slug));

    // Findings that touch the pattern, from the lessons that use it.
    const out: Finding[] = [];
    if (d) {
      for (const { slug } of usage) {
        if (!sentences.has(slug)) sentences.set(slug, reviewSentences(slug));
        for (const st of sentences.get(slug)!) {
          const auto = st.tags.some((t) => d.autoTags?.includes(t));
          const touches = d.terms.test(st.text) && (st.tags.length > 0 || st.problem);
          if (!auto && !touches) continue;
          out.push({ slug, file: st.file, href: `/api/hq/review/${slug}/${st.file.split("/").pop()}`, source: st.source, tags: st.tags.length ? st.tags : ["pattern"], text: st.text });
        }
        const x = bySlug.get(slug);
        for (const [, test] of d.code ?? []) {
          const msg = x ? test(x) : null;
          if (msg) out.push({ slug, file: `${x!.meta.dir}/Demo.tsx`, href: null, source: "code", tags: ["code"], text: msg });
        }
      }
    }
    findingsBy.set(c.id, out);
    const byTag: Partial<Record<FindingTag, number>> = {};
    for (const f of out) for (const t of f.tags) byTag[t] = (byTag[t] ?? 0) + 1;
    return {
      ...c,
      detect: d ? { how: d.how, confidence: d.confidence, signals: d.signals.map(([l]) => l), note: d.note } : { how: "no detector yet (only reference lessons are listed)", confidence: "none", signals: [] },
      usage,
      findings: out.length,
      findingsByTag: byTag,
    };
  });
  for (const c of concepts) for (const v of c.variants) if (!concepts.some((x) => x.id === v)) errors.push(`${c.path}: variant "${v}" is not a concept`);

  const df = readJson<{ domains: { id: string; name: string; color: string }[] }>(p("content/domains.json"));
  const index: DesignIndex = { concepts, lessons, domains: (df?.domains ?? []).map(({ id, name, color }) => ({ id, name, color })), errors };
  const s: Scan = { index, bodies, findings: findingsBy };
  cached = { at: Date.now(), scan: s };
  return s;
}

export function designIndex(): DesignIndex {
  return scan().index;
}

export function isUiConcept(id: string): boolean {
  return scan().index.concepts.some((c) => c.id === id);
}

const SOURCE_RANK: Record<Finding["source"], number> = { a11y: 0, design: 1, learner: 2, code: 3 };
const MAX_FINDINGS = 150;

export function conceptDetail(id: string): ConceptDetail | null {
  const s = scan();
  if (!s.bodies.has(id)) return null;
  const all = [...(s.findings.get(id) ?? [])].sort((a, b) => Number(b.tags[0] !== "pattern") - Number(a.tags[0] !== "pattern") || SOURCE_RANK[a.source] - SOURCE_RANK[b.source] || a.slug.localeCompare(b.slug));
  return { id, body: s.bodies.get(id)!, findings: all.slice(0, MAX_FINDINGS), total: all.length };
}
