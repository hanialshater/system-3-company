// The candidate slot (criterion 3b §1.2): criterion 3's own runEpisode3, with its "reachable" order rule served by a
// candidate instead of the reachable-signal oracle. No episode logic is copied; ../c3/ is imported unchanged.
// owner: personalization-eval (Uma) · run: eval-k5-1017 · criterion: company/personalization/eval/2026-10-17-criterion-3b.md
//
// How: an in-thread resolve hook (node:module registerHooks, Node >= 22.15) redirects "./reachable-oracle.mjs" to
// ./slot-shim.mjs, but only when the importer is the instance of ../c3/harness3.mjs loaded with the query
// "?c3b-slot=candidate". The plain instance of harness3.mjs (reference arm, oracle row, criterion 3's checks) is
// untouched, and every other module (c2, learner3, world3, model.ts) is shared, one instance each.
import { registerHooks } from "node:module";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import { setSlot } from "./slot-shim.mjs";

export const SLOT_QUERY = "c3b-slot=candidate";
const SHIM_URL = new URL("./slot-shim.mjs", import.meta.url).href;
const HARNESS3_SLOT_URL = new URL(`../c3/harness3.mjs?${SLOT_QUERY}`, import.meta.url).href;
let hooked = false;
export function installSlotHook() {
  if (hooked) return;
  hooked = true;
  registerHooks({
    resolve(specifier, context, next) {
      if (specifier === "./reachable-oracle.mjs" && context.parentURL && context.parentURL.endsWith(`harness3.mjs?${SLOT_QUERY}`))
        return { url: SHIM_URL, shortCircuit: true };
      return next(specifier, context);
    },
  });
}
/** The slot instance of criterion 3's harness: { runEpisode3, ... } whose "reachable" arm serves the slot. */
export async function slotHarness() {
  installSlotHook();
  return import(HARNESS3_SLOT_URL);
}

/**
 * Load a candidate file (criterion 3b §I). Accepts named exports `decide` and `rank`, or exactly one exported object
 * holding both as functions. `fresh` gives a new module instance (a query on the URL), for the no-state check V7.
 * Returns { name, path, sha256, source, decide, rank }.
 */
export async function loadCandidate(path, { fresh = null } = {}) {
  const bytes = readFileSync(path);
  const url = pathToFileURL(path).href + (fresh == null ? "" : `?fresh=${fresh}`);
  const mod = await import(url);
  let api = null;
  if (typeof mod.decide === "function" && typeof mod.rank === "function") api = { decide: mod.decide, rank: mod.rank };
  else {
    const objs = Object.values(mod).filter((v) => v && typeof v === "object" && typeof v.decide === "function" && typeof v.rank === "function");
    if (objs.length === 1) api = { decide: objs[0].decide.bind(objs[0]), rank: objs[0].rank.bind(objs[0]) };
  }
  if (!api) throw new Error(`candidate interface: ${path} exports neither decide+rank nor exactly one object with both (criterion 3b §I.2)`);
  return { name: String(mod.NAME ?? mod.name ?? path.split("/").pop()), path, sha256: createHash("sha256").update(bytes).digest("hex"), source: bytes.toString("utf8"), ...api };
}

/** Put a loaded candidate in the slot (this thread). */
export function useCandidate(c) { setSlot({ name: c.name, decide: c.decide }); }
export { setSlot };
