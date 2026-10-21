export function wrap(text, width) {
  if (!Number.isInteger(width) || width < 1) throw new RangeError('width must be an integer >= 1');
  const trimmed = String(text ?? '').trim();
  if (trimmed === '') return '';
  const paragraphs = trimmed.split(/\n[ \t\r\f\v]*\n\s*/);
  return paragraphs.map((p) => wrapParagraph(p, width)).filter((p) => p !== '').join('\n\n');
}

function wrapParagraph(p, width) {
  const words = p.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (let word of words) {
    while (word.length > width) {
      if (line) { lines.push(line); line = ''; }
      lines.push(word.slice(0, width));
      word = word.slice(width);
    }
    if (!word) continue;
    if (!line) line = word;
    else if (line.length + 1 + word.length <= width) line += ' ' + word;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines.join('\n');
}
