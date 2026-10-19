// Child of engagement-not-ranking.test.mjs: prints feedOrder for "all" and every domain as one JSON line.
import { register } from "node:module";
register("./alias-loader.mjs", import.meta.url);
const { feedOrder, feedPageParams } = await import("../../src/lib/feed-index.ts");
const filters = ["all", ...new Set(feedPageParams().map((p) => p.filter))];
process.stdout.write(JSON.stringify(Object.fromEntries(filters.map((f) => [f, feedOrder(f)]))));
