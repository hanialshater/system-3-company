// Unicode-aware: \p{Ll}/\p{Lu}/\p{Lt}/\p{N} with the u flag; \p{M}* lets a
// combining mark (decomposed accents, e.g. "é") stay with its letter.
const LOWER_OR_DIGIT_THEN_UPPER = /([\p{Ll}\p{N}]\p{M}*)(?=[\p{Lu}\p{Lt}])/gu;
const ACRONYM_END = /([\p{Lu}\p{Lt}]\p{M}*)(?=[\p{Lu}\p{Lt}]\p{M}*\p{Ll})/gu;

export function toKebab(s) {
  if (typeof s !== 'string') throw new TypeError('toKebab expects a string');
  return s
    .replace(LOWER_OR_DIGIT_THEN_UPPER, '$1 ')
    .replace(ACRONYM_END, '$1 ')
    .split(/[\s_-]+/u)
    .filter(Boolean)
    .map((w) => w.toLowerCase())
    .join('-');
}
