export function parseCsvLine(line) {
  const fields = [];
  let i = 0;
  const n = line.length;
  while (true) {
    if (line[i] === '"') {
      i++;
      let field = '';
      for (;;) {
        if (i >= n) throw new SyntaxError('Unterminated quote');
        const c = line[i];
        if (c === '"') {
          if (line[i + 1] === '"') { field += '"'; i += 2; continue; }
          i++;
          break;
        }
        field += c; i++;
      }
      fields.push(field);
      if (i >= n) return fields;
      if (line[i] !== ',') throw new SyntaxError(`Unexpected character after closing quote at ${i}`);
      i++;
    } else {
      let j = i;
      while (j < n && line[j] !== ',') {
        if (line[j] === '"') throw new SyntaxError(`Quote inside unquoted field at ${j}`);
        j++;
      }
      fields.push(line.slice(i, j));
      if (j >= n) return fields;
      i = j + 1;
    }
  }
}
