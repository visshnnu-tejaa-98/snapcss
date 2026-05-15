import { describe, it, expect } from "vitest";
import { parseClass } from "../packages/parser/src";
import { resolve } from "../packages/core/src/resolver";
import { getStyle, setStyle, clearCache } from "../packages/core/src/cache";

function getFromCacheOrResolve(cls: string) {
  let styles = getStyle(cls);
  if (!styles) {
    styles = resolve(parseClass(cls));
    setStyle(cls, styles);
  }
  return styles;
}

describe("end-to-end: parse → resolve → cache", () => {
  it("pt-2 resolves correctly and caches", () => {
    clearCache();
    const styles = getFromCacheOrResolve("pt-2");
    expect(styles).toEqual({ paddingTop: "4px" });
    expect(getStyle("pt-2")).toEqual({ paddingTop: "4px" });
  });

  it("px-[24px] resolves both padding sides", () => {
    clearCache();
    const styles = getFromCacheOrResolve("px-[24px]");
    expect(styles).toEqual({ paddingLeft: "24px", paddingRight: "24px" });
  });

  it("border-x-2 resolves both border sides", () => {
    clearCache();
    const styles = getFromCacheOrResolve("border-x-2");
    expect(styles).toEqual({ borderLeftWidth: "2px", borderRightWidth: "2px" });
  });

  it("rounded-tl-lg resolves single corner", () => {
    clearCache();
    const styles = getFromCacheOrResolve("rounded-tl-lg");
    expect(styles).toEqual({ borderTopLeftRadius: "8px" });
  });

  it("inset-0 sets all four sides", () => {
    clearCache();
    const styles = getFromCacheOrResolve("inset-0");
    expect(styles).toEqual({ top: "0px", right: "0px", bottom: "0px", left: "0px" });
  });

  it("flex has display: flex", () => {
    clearCache();
    const styles = getFromCacheOrResolve("flex");
    expect(styles).toEqual({ display: "flex" });
  });

  it("grid has display: grid", () => {
    clearCache();
    const styles = getFromCacheOrResolve("grid");
    expect(styles).toEqual({ display: "grid" });
  });

  it("bg-red-500 resolves to a hex color", () => {
    clearCache();
    const styles = getFromCacheOrResolve("bg-red-500");
    expect(styles.backgroundColor).toMatch(/^#/);
  });

  it("text-xl resolves font size", () => {
    clearCache();
    const styles = getFromCacheOrResolve("text-xl");
    expect(styles.fontSize).toBeTruthy();
  });

  it("shadow-lg has a multi-value boxShadow", () => {
    clearCache();
    const styles = getFromCacheOrResolve("shadow-lg");
    expect(styles.boxShadow).toContain("rgba");
  });

  it("transition sets transitionProperty + timing + duration", () => {
    clearCache();
    const styles = getFromCacheOrResolve("transition");
    expect(styles.transitionProperty).toBeTruthy();
    expect(styles.transitionDuration).toBe("150ms");
  });

  it("scale-110 resolves to scale: 1.1", () => {
    clearCache();
    const styles = getFromCacheOrResolve("scale-110");
    expect(styles.scale).toBe("1.1");
  });

  it("rotate-45 resolves to rotate: 45deg", () => {
    clearCache();
    const styles = getFromCacheOrResolve("rotate-45");
    expect(styles.rotate).toBe("45deg");
  });

  it("rotate-[-45deg] resolves to rotate: -45deg", () => {
    clearCache();
    const styles = getFromCacheOrResolve("rotate-[-45deg]");
    expect(styles.rotate).toBe("-45deg");
  });

  it("opacity-50 resolves to opacity: 0.5", () => {
    clearCache();
    const styles = getFromCacheOrResolve("opacity-50");
    expect(styles.opacity).toBe("0.5");
  });

  it("cursor-pointer resolves correctly", () => {
    clearCache();
    const styles = getFromCacheOrResolve("cursor-pointer");
    expect(styles).toEqual({ cursor: "pointer" });
  });

  it("aspect-video resolves to 16 / 9", () => {
    clearCache();
    const styles = getFromCacheOrResolve("aspect-video");
    expect(styles).toEqual({ aspectRatio: "16 / 9" });
  });

  it("truncate resolves three properties", () => {
    clearCache();
    const styles = getFromCacheOrResolve("truncate");
    expect(styles.overflow).toBe("hidden");
    expect(styles.textOverflow).toBe("ellipsis");
    expect(styles.whiteSpace).toBe("nowrap");
  });
});

describe("performance", () => {
  it("resolves 1000 distinct classes in under 50ms", () => {
    clearCache();
    const classes = Array.from({ length: 1000 }, (_, i) => `p-[${i}px]`);
    const start = performance.now();
    for (const cls of classes) {
      getFromCacheOrResolve(cls);
    }
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(2000);
  });
});
