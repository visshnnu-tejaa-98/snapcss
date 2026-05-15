import { parseClass } from "@snapcss/parser";
import { configure, SnapTheme } from "@snapcss/themes";
import { scanDOM } from "./scanner";
import { resolve } from "./resolver";
import { getStyle, setStyle } from "./cache";
import { applyStyles } from "./applier";
import { setupStateHandlers } from "./states";
import { applyStructuralModifiers } from "./structural";
import { registerGroupElements, setupGroupHoverListeners } from "./group";
import { storeResponsiveClass, applyResponsive, setupResizeListener } from "./responsive";
import { storeDarkClass, applyDarkMode, setupDarkModeListener } from "./darkmode";
import { setupMutationObserver } from "./observer";

export interface SnapCSSOptions {
  theme?: Partial<SnapTheme>;
}

export function init(options?: SnapCSSOptions): void {
  if (options?.theme) {
    configure({ theme: options.theme });
  }
  const scannedElements = scanDOM();

  // First pass: register group elements so listeners cover dynamic additions too
  registerGroupElements(scannedElements);

  for (const { el, snapClasses } of scannedElements) {
    setupStateHandlers(el, snapClasses);
    applyStructuralModifiers(el, snapClasses);
    storeResponsiveClass(el, snapClasses);
    storeDarkClass(el, snapClasses);

    for (const cls of snapClasses) {
      const parsed = parseClass(cls);
      if (parsed.modifier !== null) continue;

      let styles = getStyle(cls);
      if (!styles) {
        styles = resolve(parsed);
        setStyle(cls, styles);
      }
      applyStyles(el, styles);
    }
  }

  applyResponsive();
  applyDarkMode();
  setupGroupHoverListeners();
  setupResizeListener();
  setupDarkModeListener();
  setupMutationObserver();
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => init());
}



export { configure } from "@snapcss/themes";
export { clearCache } from "./cache";
