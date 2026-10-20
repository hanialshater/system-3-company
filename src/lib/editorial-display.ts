/** Historical editorial evidence can be a string, array or structured provenance object. Text only. */
export function editorialText(value: unknown): string {
  if (value === null || value === undefined || value === "") return "Unknown";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(editorialText).join(" · ");
  return JSON.stringify(value);
}
