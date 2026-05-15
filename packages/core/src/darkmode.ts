import { parseClass } from "@snapcss/parser";
import { resolve } from "./resolver";
import { applyStyles, removeStyles } from "./applier";

interface DarkEntry {
  el: Element;
  styles: Record<string, string>;
  styleKeys: string[];
}

const darkEntries: DarkEntry[] = [];

export function storeDarkClass(el: Element, snapClasses: string[]): void {
  for (const cls of snapClasses) {
    const parsed = parseClass(cls);
    if (parsed.modifier?.type !== "dark") continue;

    const styles = resolve({ ...parsed, modifier: null });
    if (!Object.keys(styles).length) continue;

    darkEntries.push({ el, styles, styleKeys: Object.keys(styles) });
  }
}

export function applyDarkMode(): void {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  for (const entry of darkEntries) {
    if (isDark) {
      applyStyles(entry.el, entry.styles);
    } else {
      removeStyles(entry.el, entry.styleKeys);
    }
  }
}

export function setupDarkModeListener(): void {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyDarkMode);
}

export function clearDarkEntries(): void {
  darkEntries.length = 0;
}
