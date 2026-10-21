// Widths and chunks are counted in Unicode code points, so a chunk never splits a character.
// Whitespace is JS whitespace (\s, as used by trim): a line holding only whitespace is a blank line.
const LINE_BREAK = /\r\n|[\n\r\u2028\u2029]/;

export function wrap(text, width) {
  if (!Number.isInteger(width) || width < 1) throw new RangeError('width must be an integer >= 1');
  const paragraphs = [];
  let current = [];
  for (const line of String(text ?? '').split(LINE_BREAK)) {
    if (line.trim() === '') {
      if (current.length) { paragraphs.push(current.join(' ')); current = []; }
    } else current.push(line);
  }
  if (current.length) paragraphs.push(current.join(' '));
  return paragraphs.map((p) => wrapParagraph(p, width)).filter((p) => p !== '').join('\n\n');
}

function wrapParagraph(p, width) {
  const words = p.split(/\s+/).filter(Boolean).map((w) => Array.from(w));
  const lines = [];
  let line = [];
  for (let word of words) {
    while (word.length > width) {
      if (line.length) { lines.push(line.join('')); line = []; }
      lines.push(word.slice(0, width).join(''));
      word = word.slice(width);
    }
    if (!word.length) continue;
    if (!line.length) line = word;
    else if (line.length + 1 + word.length <= width) line = [...line, ' ', ...word];
    else { lines.push(line.join('')); line = word; }
  }
  if (line.length) lines.push(line.join(''));
  return lines.join('\n');
}
