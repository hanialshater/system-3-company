// The hidden acceptance rubric for the storybook benchmark: both arms are judged by this file.
import fs from "node:fs";
import path from "node:path";
export const ROOT = () => process.env.BOOK_ROOT;
const syl = (w) => Math.max(1, (w.toLowerCase().replace(/e\b/, "").match(/[aeiouy]+/g) || []).length);
export function page(task) {
  const f = path.join(ROOT(), task, "page.md");
  if (!fs.existsSync(f)) return { missing: true };
  const text = fs.readFileSync(f, "utf8"); const lines = text.split("\n");
  const body = lines.filter((l) => !/^#/.test(l)).join(" ");
  const words = body.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  const sentences = Math.max(1, (body.match(/[.!?]+(\s|$)/g) || []).length);
  const ease = 206.835 - 1.015 * (words.length / sentences) - 84.6 * (words.reduce((s, w) => s + syl(w.replace(/[^\p{L}]/gu, "")), 0) / Math.max(1, words.length));
  return { text, title: /^# \S/.test(lines[0] ?? ""), words: words.length, ease, pip: /\bPip\b/.test(text), banned: ["scary", "kill", "die", "dead", "blood", "hate", "stupid"].filter((b) => new RegExp(`\\b${b}\\b`, "i").test(text)) };
}
export function bible() {
  const f = path.join(ROOT(), "BIBLE", "page.md");
  if (!fs.existsSync(f)) return { missing: true };
  const t = fs.readFileSync(f, "utf8");
  const plan = t.split(/^##\s*Page plan/im)[1] ?? "";
  return { characters: /^##\s*Characters/im.test(t), setting: /^##\s*Setting/im.test(t), plan: !!plan, beats: (plan.match(/^\s*(?:[-*]|\d+[.)])\s*(?:\*\*)?Page\s*\d/gim) || []).length, pip: /\bPip\b/.test(t) };
}
