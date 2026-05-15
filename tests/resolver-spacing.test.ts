import { describe, it, expect } from "vitest";
import { parseClass } from "../packages/parser/src";
import { resolve } from "../packages/core/src/resolver";

describe("resolver — padding (scale)", () => {
  it("p-4 → padding: 16px", () => {
    expect(resolve(parseClass("p-4"))).toEqual({ padding: "16px" });
  });

  it("pt-2 → paddingTop: 4px only", () => {
    const r = resolve(parseClass("pt-2"));
    expect(r).toEqual({ paddingTop: "4px" });
    expect(r.paddingBottom).toBeUndefined();
    expect(r.paddingLeft).toBeUndefined();
    expect(r.paddingRight).toBeUndefined();
  });

  it("pb-2 → paddingBottom: 4px", () => {
    expect(resolve(parseClass("pb-2"))).toEqual({ paddingBottom: "4px" });
  });

  it("pl-2 → paddingLeft: 4px", () => {
    expect(resolve(parseClass("pl-2"))).toEqual({ paddingLeft: "4px" });
  });

  it("pr-2 → paddingRight: 4px", () => {
    expect(resolve(parseClass("pr-2"))).toEqual({ paddingRight: "4px" });
  });

  it("px-4 → paddingLeft + paddingRight 16px, no top/bottom", () => {
    const r = resolve(parseClass("px-4"));
    expect(r).toEqual({ paddingLeft: "16px", paddingRight: "16px" });
    expect(r.paddingTop).toBeUndefined();
    expect(r.paddingBottom).toBeUndefined();
  });

  it("py-4 → paddingTop + paddingBottom 16px, no left/right", () => {
    const r = resolve(parseClass("py-4"));
    expect(r).toEqual({ paddingTop: "16px", paddingBottom: "16px" });
    expect(r.paddingLeft).toBeUndefined();
    expect(r.paddingRight).toBeUndefined();
  });
});

describe("resolver — padding (arbitrary)", () => {
  it("p-[150px]", () => {
    expect(resolve(parseClass("p-[150px]"))).toEqual({ padding: "150px" });
  });

  it("pt-[150px]", () => {
    expect(resolve(parseClass("pt-[150px]"))).toEqual({ paddingTop: "150px" });
  });

  it("px-[24px] → both sides 24px", () => {
    expect(resolve(parseClass("px-[24px]"))).toEqual({ paddingLeft: "24px", paddingRight: "24px" });
  });

  it("py-[2rem] → top+bottom 2rem", () => {
    expect(resolve(parseClass("py-[2rem]"))).toEqual({ paddingTop: "2rem", paddingBottom: "2rem" });
  });
});
