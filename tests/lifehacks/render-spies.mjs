// Spies for tests/lifehacks/home-locked.test.mjs (see render-loader.mjs). The real kit modules are re-exported;
// only useMilestones and Control are wrapped, and both still behave as the kit's do.
import { createElement } from "react";
import * as realControls from "../../src/kit/controls.tsx";

export * from "../../src/kit/controls.tsx";

globalThis.__lhReached ??= new Set();
globalThis.__lhControls ??= [];

/** Like the kit's hook (each name counts once, unknown names are ignored), but the reached set outlives one render. */
export function useMilestones(interact, names) {
  const reach = (name) => {
    if (!names.includes(name) || globalThis.__lhReached.has(name)) return;
    globalThis.__lhReached.add(name);
    interact();
  };
  return { reach, reached: (name) => globalThis.__lhReached.has(name), count: () => globalThis.__lhReached.size };
}

const textOf = (node) => (node == null || typeof node === "boolean" ? "" : typeof node === "string" || typeof node === "number" ? String(node)
  : Array.isArray(node) ? node.map(textOf).join("") : textOf(node.props?.children));

/** The kit's Control, recording the visible text and the click handler it was given (StageControl's guarded one). */
export function Control(props) {
  globalThis.__lhControls.push({ text: textOf(props.children).replace(/^✓\s*/, "").trim(), onClick: props.onClick, disabled: props.disabled === true, ariaDisabled: props["aria-disabled"] === true });
  return createElement(realControls.Control, props);
}
