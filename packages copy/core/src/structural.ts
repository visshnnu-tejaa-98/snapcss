import { parseClass } from "@snapcss/parser";
import { resolve } from "./resolver";
import { applyStyles } from "./applier";


export function applyStructuralModifiers(el: Element, snapClasses: string[]): void {
  for (const cls of snapClasses) {
    const parsed = parseClass(cls);
    if (parsed.modifier?.type !== "structural") continue;

    const kind = parsed.modifier.kind;
    const styles = resolve({ ...parsed, modifier: null });
    if (!Object.keys(styles).length) continue;

    if (kind === "disabled") {
      if ((el as HTMLElement & { disabled?: boolean }).disabled || el.hasAttribute("disabled")) {
        applyStyles(el, styles);
      }
    } else if (kind === "first") {
      if (el === el.parentElement?.firstElementChild) {
        applyStyles(el, styles);
      }
    } else if (kind === "last") {
      if (el === el.parentElement?.lastElementChild) {
        applyStyles(el, styles);
      }
    } else if (kind === "odd" || kind === "even") {
      const parent = el.parentElement;
      if (!parent) continue;
      const index = Array.from(parent.children).indexOf(el);
      const isOdd = index % 2 === 0; // 0-based: 0,2,4 → odd children (1st,3rd,5th)
      if ((kind === "odd" && isOdd) || (kind === "even" && !isOdd)) {
        applyStyles(el, styles);
      }
    }
  }
}
