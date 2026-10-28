/** Original decorative marks are always paired with the subject/island's text label. */
const EMBLEMS = new Set(["math", "cs", "physics", "chemistry", "life", "geography", "history", "ai", "economics", "behavioral", "probability", "books", "lifehacks", "big-ideas", "number-island"]);
export function SubjectEmblem({ subject, className }: { subject: string; className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true" focusable="false">{EMBLEMS.has(subject) ? <use width="64" height="64" href={`/illustrations/world/subject-emblems.svg#${subject}`}/> : <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4"/>}</svg>;
}
