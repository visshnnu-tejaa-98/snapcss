import { parseClass } from "@snapcss/parser";
import { resolve } from "./resolver";
import { applyStyles, removeStyles } from "./applier";

interface GroupChild {
  el: Element;
  styles: Record<string, string>;
  styleKeys: string[];
}

const groupRegistry = new Map<Element, GroupChild[]>();

export function registerGroupElements(scannedElements: Array<{ el: Element; snapClasses: string[] }>): void {
  for (const { el, snapClasses } of scannedElements) {
    for (const cls of snapClasses) {
      const parsed = parseClass(cls);
      if (parsed.modifier?.type !== "group") continue;

      const styles = resolve({ ...parsed, modifier: null });
      if (!Object.keys(styles).length) continue;

      // Find nearest ancestor with group
      const groupRoot = el.closest(".group");
      if (!groupRoot) continue;

      const children = groupRegistry.get(groupRoot) ?? [];
      children.push({ el, styles, styleKeys: Object.keys(styles) });
      groupRegistry.set(groupRoot, children);
    }
  }
}

export function setupGroupHoverListeners(): void {
  groupRegistry.forEach((children, groupRoot) => {
    groupRoot.addEventListener("mouseenter", () => {
      children.forEach(({ el, styles }) => applyStyles(el, styles));
    });
    groupRoot.addEventListener("mouseleave", () => {
      children.forEach(({ el, styleKeys }) => removeStyles(el, styleKeys));
    });
  });
}

export function clearGroupRegistry(): void {
  groupRegistry.clear();
}
