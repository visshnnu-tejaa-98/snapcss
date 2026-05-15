import { describe, it, expect, beforeEach } from "vitest";
import { getStyle, setStyle, clearCache, cacheSize } from "../packages/core/src/cache";

describe("cache", () => {
  beforeEach(() => clearCache());

  it("returns undefined for a miss", () => {
    expect(getStyle("p-4")).toBeUndefined();
  });

  it("stores and retrieves a style", () => {
    setStyle("p-4", { padding: "16px" });
    expect(getStyle("p-4")).toEqual({ padding: "16px" });
  });

  it("stores multi-property styles", () => {
    setStyle("px-4", { paddingLeft: "16px", paddingRight: "16px" });
    expect(getStyle("px-4")).toEqual({ paddingLeft: "16px", paddingRight: "16px" });
  });

  it("clearCache empties the map", () => {
    setStyle("p-4", { padding: "16px" });
    clearCache();
    expect(getStyle("p-4")).toBeUndefined();
    expect(cacheSize()).toBe(0);
  });

  it("cacheSize reflects stored entries", () => {
    setStyle("p-4", { padding: "16px" });
    setStyle("m-2", { margin: "4px" });
    expect(cacheSize()).toBe(2);
  });

  it("caches arbitrary values as distinct keys", () => {
    setStyle("pt-[150px]", { paddingTop: "150px" });
    setStyle("pt-2", { paddingTop: "4px" });
    expect(getStyle("pt-[150px]")).toEqual({ paddingTop: "150px" });
    expect(getStyle("pt-2")).toEqual({ paddingTop: "4px" });
    expect(cacheSize()).toBe(2);
  });
});
