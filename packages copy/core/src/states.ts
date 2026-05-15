import { parseClass } from "@snapcss/parser";
import { resolve } from "./resolver";
import { applyStyles, saveStyles, removeStyles } from "./applier";

export function setupStateHandlers(el: Element, snapClasses: string[]): void {
  for (const cls of snapClasses) {
    const parsed = parseClass(cls);
    if (parsed.modifier?.type !== "state") continue;

    const state = parsed.modifier.state;
    const styles = resolve({ ...parsed, modifier: null });
    if (!Object.keys(styles).length) continue;

    const styleKeys = Object.keys(styles);

    if (state === "hover") {
      el.addEventListener("mouseenter", () => applyStyles(el, styles));
      el.addEventListener("mouseleave", () => removeStyles(el, styleKeys));
    } else if (state === "focus") {
      el.addEventListener("focus", () => applyStyles(el, styles));
      el.addEventListener("blur", () => removeStyles(el, styleKeys));
    } else if (state === "focus-visible") {
      el.addEventListener("focus", () => {
        if (el.matches(":focus-visible")) applyStyles(el, styles);
      });
      el.addEventListener("blur", () => removeStyles(el, styleKeys));
    } else if (state === "active") {
      el.addEventListener("mousedown", () => applyStyles(el, styles));
      el.addEventListener("mouseup", () => removeStyles(el, styleKeys));
      el.addEventListener("mouseleave", () => removeStyles(el, styleKeys));
    }
  }
}
