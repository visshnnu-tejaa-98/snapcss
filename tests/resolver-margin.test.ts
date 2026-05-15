import { describe, it, expect } from "vitest";
import { parseClass } from "../packages/parser/src";
import { resolve } from "../packages/core/src/resolver";

describe("resolver — margin (scale)", () => {
  it("m-4 → margin: 16px", () => {
    expect(resolve(parseClass("m-4"))).toEqual({ margin: "16px" });
  });

  it("mt-2 → marginTop: 4px only", () => {
    const r = resolve(parseClass("mt-2"));
    expect(r).toEqual({ marginTop: "4px" });
    expect(r.marginBottom).toBeUndefined();
  });

  it("mb-2 → marginBottom: 4px", () => {
    expect(resolve(parseClass("mb-2"))).toEqual({ marginBottom: "4px" });
  });

  it("ml-2 → marginLeft: 4px", () => {
    expect(resolve(parseClass("ml-2"))).toEqual({ marginLeft: "4px" });
  });

  it("mr-2 → marginRight: 4px", () => {
    expect(resolve(parseClass("mr-2"))).toEqual({ marginRight: "4px" });
  });

  it("mx-4 → marginLeft + marginRight 16px", () => {
    const r = resolve(parseClass("mx-4"));
    expect(r).toEqual({ marginLeft: "16px", marginRight: "16px" });
    expect(r.marginTop).toBeUndefined();
    expect(r.marginBottom).toBeUndefined();
  });

  it("my-4 → marginTop + marginBottom 16px", () => {
    const r = resolve(parseClass("my-4"));
    expect(r).toEqual({ marginTop: "16px", marginBottom: "16px" });
    expect(r.marginLeft).toBeUndefined();
    expect(r.marginRight).toBeUndefined();
  });

  it("mx-auto → left+right auto", () => {
    const r = resolve(parseClass("mx-auto"));
    expect(r).toEqual({ marginLeft: "auto", marginRight: "auto" });
  });
});

describe("resolver — margin (arbitrary)", () => {
  it("mt-[150px]", () => {
    expect(resolve(parseClass("mt-[150px]"))).toEqual({ marginTop: "150px" });
  });

  it("mx-[30px] → both sides 30px", () => {
    expect(resolve(parseClass("mx-[30px]"))).toEqual({ marginLeft: "30px", marginRight: "30px" });
  });

  it("my-[2rem] → top+bottom 2rem", () => {
    expect(resolve(parseClass("my-[2rem]"))).toEqual({ marginTop: "2rem", marginBottom: "2rem" });
  });
});
