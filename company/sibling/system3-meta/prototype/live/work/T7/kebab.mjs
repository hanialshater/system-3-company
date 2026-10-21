export function toKebab(s) {
  if (typeof s !== 'string') throw new TypeError('toKebab expects a string');
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase())
    .join('-');
}
