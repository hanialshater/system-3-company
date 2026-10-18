// Test-only: lets react-dom/server render the HQ lab page (tests/hq/personalization-precomputed.test.mjs).
// Registered after tests/lifehacks/render-loader.mjs (.tsx, "@/" alias, CSS modules). Node's ESM resolver needs the
// file name for next's CommonJS entry points, which Next's bundler resolves without it.
export async function resolve(specifier, context, nextResolve) {
  if (specifier === "next/link" || specifier === "next/navigation") return nextResolve(`${specifier}.js`, context);
  return nextResolve(specifier, context);
}
