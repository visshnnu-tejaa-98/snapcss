import { parseClass } from "@snapcss/parser";
import { resolve } from "./resolver";
import { applyStyles, removeStyles } from "./applier";

const BREAKPOINTS: Record<string, number> = {
  sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536,
};

interface ResponsiveEntry {
  el: Element;
  breakpoint: number;
  styles: Record<string, string>;
  styleKeys: string[];
}

const responsiveEntries: ResponsiveEntry[] = [];

export function storeResponsiveClass(el: Element, snapClasses: string[]): void {
  for (const cls of snapClasses) {
    const parsed = parseClass(cls);
    if (parsed.modifier?.type !== "responsive") continue;

    const bp = BREAKPOINTS[parsed.modifier.breakpoint];
    if (bp === undefined) continue;

    const styles = resolve({ ...parsed, modifier: null });
    if (!Object.keys(styles).length) continue;

    responsiveEntries.push({ el, breakpoint: bp, styles, styleKeys: Object.keys(styles) });
  }
}

export function applyResponsive(): void {
  const width = window.innerWidth;
  for (const entry of responsiveEntries) {
    if (width >= entry.breakpoint) {
      applyStyles(entry.el, entry.styles);
    } else {
      removeStyles(entry.el, entry.styleKeys);
    }
  }
}

let resizeTimer: ReturnType<typeof setTimeout> | null = null;

export function setupResizeListener(): void {
  window.addEventListener("resize", () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyResponsive, 150);
  });
}

export function clearResponsiveEntries(): void {
  responsiveEntries.length = 0;
}
