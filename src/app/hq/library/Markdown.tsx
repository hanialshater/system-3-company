"use client";

// A small, safe markdown renderer for the HQ Library reader. HQ had none (it shows text in <pre>), and a
// dependency needs a decision record, so this covers what company/ docs use: headings, paragraphs, nested
// lists, tables, code fences, quotes, rules, and inline code, bold, italic and links. It builds React elements
// only (never raw HTML), so a doc cannot inject markup. Owner: hq-engineer.
import type { ReactNode } from "react";
import s from "./library.module.css";

export interface MdProps {
  text: string;
  /** Raw link target (as written) to a library path, from the server (loadDoc). */
  links: Record<string, string>;
  onOpen: (libPath: string) => void;
}

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const plain = (t: string) => t.replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "");

const INLINE = /(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)|!?\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)|\*\*([\s\S]+?)\*\*|(?<![\w*])\*([^\s*][^*]*?)\*(?![\w*])|(?<![\w_])_([^\s_][^_]*?)_(?![\w_])|(https?:\/\/[^\s<>)\]]+[^\s<>)\].,;:!?])/;

function inline(src: string, p: MdProps, key = "i"): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = src;
  let n = 0;
  while (rest) {
    const m = INLINE.exec(rest);
    if (!m) {
      out.push(rest);
      break;
    }
    if (m.index) out.push(rest.slice(0, m.index));
    const k = `${key}${n++}`;
    if (m[2] !== undefined) {
      const code = m[2].trim();
      const lib = p.links[code];
      out.push(
        lib ? (
          <a key={k} className={s.mdLink} href={`/hq/library/${lib}`} onClick={(e) => (e.preventDefault(), p.onOpen(lib))}>
            <code>{code}</code>
          </a>
        ) : (
          <code key={k}>{code}</code>
        ),
      );
    } else if (m[4] !== undefined) {
      const label = inline(m[3], p, k);
      const href = m[4];
      const lib = p.links[href];
      if (m[0].startsWith("!")) out.push(<span key={k} className={s.mdMuted}>[image: {plain(m[3]) || href}]</span>);
      else if (lib) out.push(<a key={k} className={s.mdLink} href={`/hq/library/${lib}`} onClick={(e) => (e.preventDefault(), p.onOpen(lib))}>{label}</a>);
      else if (/^https?:\/\//i.test(href)) out.push(<a key={k} href={href} target="_blank" rel="noopener noreferrer" className={s.mdExt}>{label}</a>);
      else if (href.startsWith("#")) out.push(<a key={k} href={href} className={s.mdLink}>{label}</a>);
      else out.push(<span key={k} className={s.mdMuted} title={`${href} (not in the Library)`}>{label}</span>);
    } else if (m[5] !== undefined) out.push(<strong key={k}>{inline(m[5], p, k)}</strong>);
    else if (m[6] !== undefined) out.push(<em key={k}>{inline(m[6], p, k)}</em>);
    else if (m[7] !== undefined) out.push(<em key={k}>{inline(m[7], p, k)}</em>);
    else if (m[8] !== undefined) out.push(<a key={k} href={m[8]} target="_blank" rel="noopener noreferrer" className={s.mdExt}>{m[8]}</a>);
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

const LIST = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
const ROW = (l: string) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, "|"));
const isSep = (l: string) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l) && l.includes("-");
const blockStart = (l: string) => /^(#{1,6}\s|```|>|\s*([-*+]|\d+[.)])\s|\s*(-{3,}|\*{3,}|_{3,})\s*$)/.test(l) || l.trim().startsWith("<!--");

interface Item {
  indent: number;
  ordered: boolean;
  text: string;
  kids: Item[];
}

function list(items: Item[], p: MdProps, key: string): ReactNode {
  const Tag = items[0].ordered ? "ol" : "ul";
  return (
    <Tag key={key}>
      {items.map((it, i) => (
        <li key={i}>
          {inline(it.text, p, `${key}.${i}`)}
          {it.kids.length > 0 && list(it.kids, p, `${key}.${i}k`)}
        </li>
      ))}
    </Tag>
  );
}

export default function Markdown(p: MdProps) {
  const lines = p.text.replace(/\r/g, "").split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  const seen = new Map<string, number>();
  while (i < lines.length) {
    const l = lines[i];
    const key = `b${i}`;
    if (!l.trim()) {
      i++;
      continue;
    }
    if (l.trim().startsWith("<!--")) {
      while (i < lines.length && !lines[i].includes("-->")) i++;
      i++;
      continue;
    }
    const f = /^(\s*)```+\s*([\w-]*)/.exec(l);
    if (f) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) {
        const ln = lines[i++];
        body.push(ln.startsWith(f[1]) ? ln.slice(f[1].length) : ln);
      }
      i++;
      out.push(<pre key={key} className={s.mdPre} data-lang={f[2] || undefined}><code>{body.join("\n")}</code></pre>);
      continue;
    }
    const h = /^(#{1,6})\s+(.+?)\s*#*$/.exec(l);
    if (h && h[1] === "#" && !out.length && !seen.size) {
      i++; // the reader pane already shows the doc title
      seen.set("", 1);
      continue;
    }
    if (h) {
      const lvl = Math.min(h[1].length + 1, 6); // the doc title is the pane heading, so # renders as h2
      const Tag = `h${lvl}` as "h2";
      let id = slug(plain(h[2]));
      const c = (seen.get(id) ?? 0) + 1;
      seen.set(id, c);
      if (c > 1) id += `-${c}`;
      out.push(<Tag key={key} id={id}>{inline(h[2], p, key)}</Tag>);
      i++;
      continue;
    }
    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(l)) {
      out.push(<hr key={key} />);
      i++;
      continue;
    }
    if (l.includes("|") && i + 1 < lines.length && isSep(lines[i + 1])) {
      const head = ROW(l);
      const al = ROW(lines[i + 1]).map((c) => (/^:-+:$/.test(c) ? "center" : /-:$/.test(c) ? "right" : undefined));
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) rows.push(ROW(lines[i++]));
      out.push(
        <div key={key} className={s.mdTable}>
          <table>
            <thead>
              <tr>{head.map((c, j) => <th key={j} style={{ textAlign: al[j] }}>{inline(c, p, `${key}h${j}`)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, a) => (
                <tr key={a}>{r.map((c, j) => <td key={j} style={{ textAlign: al[j] }}>{inline(c, p, `${key}r${a}c${j}`)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (l.startsWith(">")) {
      const q: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) q.push(lines[i++].replace(/^>\s?/, ""));
      out.push(<blockquote key={key}>{q.join(" ").trim() ? inline(q.join(" "), p, key) : null}</blockquote>);
      continue;
    }
    if (LIST.test(l)) {
      const roots: Item[] = [];
      const stack: Item[] = [];
      while (i < lines.length) {
        const m = LIST.exec(lines[i]);
        if (m) {
          const it: Item = { indent: m[1].replace(/\t/g, "    ").length, ordered: /\d/.test(m[2]), text: m[3], kids: [] };
          while (stack.length && stack[stack.length - 1].indent >= it.indent) stack.pop();
          (stack.length ? stack[stack.length - 1].kids : roots).push(it);
          stack.push(it);
          i++;
        } else if (lines[i].trim() && /^\s+\S/.test(lines[i]) && stack.length && !lines[i].trim().startsWith("```")) {
          stack[stack.length - 1].text += " " + lines[i++].trim();
        } else if (!lines[i].trim() && i + 1 < lines.length && (LIST.test(lines[i + 1]) || /^\s{2,}\S/.test(lines[i + 1])) && !/^\s*```/.test(lines[i + 1])) i++;
        else break;
      }
      out.push(list(roots, p, key));
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !(para.length && blockStart(lines[i])) && !(lines[i].includes("|") && i + 1 < lines.length && isSep(lines[i + 1]) && para.length)) para.push(lines[i++].trim());
    out.push(<p key={key}>{inline(para.join(" "), p, key)}</p>);
  }
  return <div className={s.md}>{out}</div>;
}
