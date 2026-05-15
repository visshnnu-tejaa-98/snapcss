import { extractSnapClasses } from "./scanner";
import { parseClass } from "@snapcss/parser";
import { resolve } from "./resolver";
import { getStyle, setStyle } from "./cache";
import { applyStyles } from "./applier";
import { setupStateHandlers } from "./states";
import { applyStructuralModifiers } from "./structural";
import { storeResponsiveClass, applyResponsive } from "./responsive";
import { storeDarkClass, applyDarkMode } from "./darkmode";
import { registerGroupElements, setupGroupHoverListeners } from "./group";

function processElement(el: Element): void {
  const snapClasses = extractSnapClasses(el);
  if (!snapClasses.length) return;

  setupStateHandlers(el, snapClasses);
  applyStructuralModifiers(el, snapClasses);
  storeResponsiveClass(el, snapClasses);
  storeDarkClass(el, snapClasses);
  registerGroupElements([{ el, snapClasses }]);

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

export function setupMutationObserver(): void {
  const observer = new MutationObserver((mutations) => {
    let needsResponsive = false;
    let needsDark = false;
    let needsGroupSetup = false;

    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as Element;
          processElement(el);
          el.querySelectorAll("*").forEach(processElement);
          needsResponsive = true;
          needsDark = true;
          needsGroupSetup = true;
        });
      } else if (mutation.type === "attributes") {
        const el = mutation.target as Element;
        if (mutation.attributeName === "class") {
          processElement(el);
          needsResponsive = true;
          needsDark = true;
          needsGroupSetup = true;
        } else if (mutation.attributeName === "disabled") {
          applyStructuralModifiers(el, extractSnapClasses(el));
        }
      }
    }

    if (needsResponsive) applyResponsive();
    if (needsDark) applyDarkMode();
    if (needsGroupSetup) setupGroupHoverListeners();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "disabled"],
  });
}
