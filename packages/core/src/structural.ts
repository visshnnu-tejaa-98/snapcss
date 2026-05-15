import { parseClass } from "@snapcss/parser";

export const applyStructuralModifiers = (
  el: Element,
  snapClasses: string[],
): void => {
  for (const cls of snapClasses) {
    const parsed = parseClass(cls);
  }
};
