export type ModifierType =
  | { type: "responsive"; breakpoint: string }
  | { type: "state"; state: string }
  | { type: "structural"; kind: string }
  | { type: "group"; kind: string }
  | { type: "dark" }
  | null;

const BREAKPOINTS = new Set(["sm", "md", "lg", "xl", "2xl"]);
const STATES = new Set(["hover", "focus", "active", "focus-visible"]);
const STRUCTURAL = new Set(["disabled", "first", "last", "odd", "even"]);

/**
 * Extracts the modifier prefix before the first ":" in a class.
 * e.g. "hover:bg-red-500" → { modifier: { type: "state", state: "hover" }, rest: "bg-red-500" }
 *
 * Returns { modifier, rest } where rest is the utility part after ":".
 */
export function extractModifier(cls: string): {
  modifier: ModifierType;
  rest: string;
} {
  const withoutPrefix = cls;
  const colonIdx = withoutPrefix.indexOf(":");

  if (colonIdx === -1) return { modifier: null, rest: withoutPrefix };

  const prefix = withoutPrefix.slice(0, colonIdx);
  const rest = withoutPrefix.slice(colonIdx + 1);

  if (BREAKPOINTS.has(prefix)) {
    return { modifier: { type: "responsive", breakpoint: prefix }, rest };
  }
  if (STATES.has(prefix)) {
    return { modifier: { type: "state", state: prefix }, rest };
  }
  if (STRUCTURAL.has(prefix)) {
    return { modifier: { type: "structural", kind: prefix }, rest };
  }
  if (prefix === "dark") {
    return { modifier: { type: "dark" }, rest };
  }
  if (prefix === "group-hover") {
    return { modifier: { type: "group", kind: "group-hover" }, rest };
  }

  return { modifier: null, rest: withoutPrefix };
}
