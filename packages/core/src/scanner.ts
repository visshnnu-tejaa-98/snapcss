export interface ScannedElement {
  el: Element;
  snapClasses: string[];
}

export function scanDOM(root: Element | Document = document): ScannedElement[] {
  const all = root.querySelectorAll("*");
  const result: ScannedElement[] = [];

  all.forEach((el) => {
    const snapClasses = extractSnapClasses(el);
    if (snapClasses.length > 0) {
      result.push({ el, snapClasses });
    }
  });

  return result;
}

export function extractSnapClasses(el: Element): string[] {
  return Array.from(el.classList);
}
