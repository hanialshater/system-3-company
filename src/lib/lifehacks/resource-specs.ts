import data from "./resource-specs.json";
import type { ResourceSpec } from "./resource-model";
export const resourceSpecs = data as ResourceSpec[];
export function getResourceSpec(slug: string): ResourceSpec {
  const spec = resourceSpecs.find((entry) => entry.slug === slug);
  if (!spec) throw new Error(`Unknown resource lesson ${slug}`);
  return spec;
}
