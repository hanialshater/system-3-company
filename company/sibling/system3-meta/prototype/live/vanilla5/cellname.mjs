// Cell naming: A1..Z99, case-insensitive.
const NAME = /^([A-Za-z])([1-9]\d?)$/;
export function isCellName(name) {
  return typeof name === 'string' && NAME.test(name);
}
export function normalizeCell(name) {
  if (!isCellName(name)) throw new Error(`Invalid cell name: ${name}`);
  return name.toUpperCase();
}
export function parseCell(name) {
  const m = NAME.exec(normalizeCell(name));
  return { col: m[1].toUpperCase().charCodeAt(0) - 65, row: Number(m[2]) };
}
