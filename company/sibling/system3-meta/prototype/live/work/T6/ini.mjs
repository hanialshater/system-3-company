// Write an own, enumerable data property. Plain assignment would hit
// inherited accessors (__proto__) or inherited members (constructor, toString).
function put(obj, key, value) {
  Object.defineProperty(obj, key, { value, writable: true, enumerable: true, configurable: true });
}

export function parseIni(text) {
  const result = {};
  let current = '';
  const section = (name) => {
    if (!Object.hasOwn(result, name)) put(result, name, {});
    return result[name];
  };
  const lines = String(text).split(/\r?\n/);
  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (line === '' || line.startsWith(';') || line.startsWith('#')) return;
    const sec = /^\[([^\]]*)\]$/.exec(line);
    if (sec) {
      current = sec[1].trim();
      section(current);
      return;
    }
    const eq = line.indexOf('=');
    if (eq > 0) {
      const key = line.slice(0, eq).trim();
      if (key !== '') {
        put(section(current), key, line.slice(eq + 1).trim());
        return;
      }
    }
    throw new SyntaxError(`Invalid INI line ${i + 1}: ${raw}`);
  });
  if (Object.hasOwn(result, '') && Object.keys(result['']).length === 0) delete result[''];
  return result;
}
