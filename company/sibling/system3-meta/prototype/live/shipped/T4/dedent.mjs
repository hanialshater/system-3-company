const isBlank = (l) => /^[ \t]*$/.test(l);

export function dedent(text) {
  let s = String(text);
  if (s.startsWith('\r\n')) s = s.slice(2);
  else if (s.startsWith('\n')) s = s.slice(1);
  let lines = s.split('\n');
  // Remove a final whitespace-only line (the line after the last newline).
  if (lines.length > 1 && isBlank(lines[lines.length - 1])) lines.pop();

  let prefix = null;
  for (const line of lines) {
    if (isBlank(line)) continue;
    const lead = line.match(/^[ \t]*/)[0];
    if (prefix === null) { prefix = lead; continue; }
    let k = 0;
    while (k < prefix.length && k < lead.length && prefix[k] === lead[k]) k++;
    prefix = prefix.slice(0, k);
    if (prefix === '') break;
  }
  const cut = prefix ? prefix.length : 0;
  return lines.map((l) => (isBlank(l) ? '' : l.slice(cut))).join('\n');
}
