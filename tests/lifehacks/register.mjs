// Test-only TypeScript loading, using the existing compiler dependency. Keep
// model fixtures runnable on Node 20 as well as Node versions with type stripping.
import { register } from "node:module";

register("./typescript-loader.mjs", import.meta.url);
