type Styles = Record<string, string>;

export function applyStyles(el: Element, styles: Styles): void {
  const htmlEl = el as HTMLElement;
  if ("--snap-space-x" in styles) {
    applySpaceBetween(el, "--snap-space-x", styles["--snap-space-x"], "marginLeft");
    return;
  }
  if ("--snap-space-y" in styles) {
    applySpaceBetween(el, "--snap-space-y", styles["--snap-space-y"], "marginTop");
    return;
  }

  Object.assign(htmlEl.style, styles);
}

export function removeStyles(el: Element, keys: string[]): void {
  const htmlEl = el as HTMLElement;
  for (const key of keys) {
    htmlEl.style.removeProperty(
      key.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`)
    );
  }
}

export function saveStyles(el: Element, keys: string[]): Styles {
  const htmlEl = el as HTMLElement;
  const saved: Styles = {};

  for (const key of keys) {
    const cssKey = key.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
    saved[key] = htmlEl.style.getPropertyValue(cssKey);
  }
  return saved;
}

function applySpaceBetween(
  el: Element,
  _marker: string,
  value: string,
  prop: "marginLeft" | "marginTop"
): void {
  const children = Array.from(el.children);
  children.forEach((child, i) => {
    (child as HTMLElement).style[prop] = i === 0 ? "" : value;
  });
}
