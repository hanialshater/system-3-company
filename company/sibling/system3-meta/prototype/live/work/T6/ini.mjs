export function parseIni(text) {
  const result = {};
  let current = '';
  const lines = String(text).split(/\r?\n/);
  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (line === '' || line.startsWith(';') || line.startsWith('#')) return;
    const sec = /^\[([^\]]*)\]$/.exec(line);
    if (sec) {
      current = sec[1].trim();
      if (!result[current]) result[current] = {};
      return;
    }
    const eq = line.indexOf('=');
    if (eq > 0) {
      const key = line.slice(0, eq).trim();
      if (key !== '') {
        if (!result[current]) result[current] = {};
        result[current][key] = line.slice(eq + 1).trim();
        return;
      }
    }
    throw new SyntaxError(`Invalid INI line ${i + 1}: ${raw}`);
  });
  if (result[''] && Object.keys(result['']).length === 0) delete result[''];
  return result;
}
