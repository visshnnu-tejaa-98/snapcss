import { describe, it, expect } from "vitest";
import { parseClass } from "../packages/parser/src";
import { resolve } from "../packages/core/src/resolver";

describe("resolver — border width (scale)", () => {
  it("border-2 → borderWidth: 2px", () => {
    expect(resolve(parseClass("border-2"))).toEqual({ borderWidth: "2px" });
  });

  it("border-t-2 → borderTopWidth only", () => {
    const r = resolve(parseClass("border-t-2"));
    expect(r).toEqual({ borderTopWidth: "2px" });
    expect(r.borderBottomWidth).toBeUndefined();
  });

  it("border-b-2 → borderBottomWidth: 2px", () => {
    expect(resolve(parseClass("border-b-2"))).toEqual({ borderBottomWidth: "2px" });
  });

  it("border-l-2 → borderLeftWidth: 2px", () => {
    expect(resolve(parseClass("border-l-2"))).toEqual({ borderLeftWidth: "2px" });
  });

  it("border-r-2 → borderRightWidth: 2px", () => {
    expect(resolve(parseClass("border-r-2"))).toEqual({ borderRightWidth: "2px" });
  });

  it("border-x-2 → left+right 2px, no top/bottom", () => {
    const r = resolve(parseClass("border-x-2"));
    expect(r).toEqual({ borderLeftWidth: "2px", borderRightWidth: "2px" });
    expect(r.borderTopWidth).toBeUndefined();
    expect(r.borderBottomWidth).toBeUndefined();
  });

  it("border-y-2 → top+bottom 2px", () => {
    const r = resolve(parseClass("border-y-2"));
    expect(r).toEqual({ borderTopWidth: "2px", borderBottomWidth: "2px" });
    expect(r.borderLeftWidth).toBeUndefined();
  });
});

describe("resolver — border width (arbitrary)", () => {
  it("border-t-[3px]", () => {
    expect(resolve(parseClass("border-t-[3px]"))).toEqual({ borderTopWidth: "3px" });
  });

  it("border-x-[2px]", () => {
    expect(resolve(parseClass("border-x-[2px]"))).toEqual({ borderLeftWidth: "2px", borderRightWidth: "2px" });
  });
});

describe("resolver — border radius (scale)", () => {
  it("rounded-lg → borderRadius: 8px", () => {
    expect(resolve(parseClass("rounded-lg"))).toEqual({ borderRadius: "8px" });
  });

  it("rounded-t-lg → top-left + top-right", () => {
    const r = resolve(parseClass("rounded-t-lg"));
    expect(r).toEqual({ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" });
    expect(r.borderBottomLeftRadius).toBeUndefined();
  });

  it("rounded-b-lg → bottom-left + bottom-right", () => {
    const r = resolve(parseClass("rounded-b-lg"));
    expect(r).toEqual({ borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" });
  });

  it("rounded-l-lg → top-left + bottom-left", () => {
    const r = resolve(parseClass("rounded-l-lg"));
    expect(r).toEqual({ borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" });
  });

  it("rounded-r-lg → top-right + bottom-right", () => {
    const r = resolve(parseClass("rounded-r-lg"));
    expect(r).toEqual({ borderTopRightRadius: "8px", borderBottomRightRadius: "8px" });
  });

  it("rounded-tl-lg → borderTopLeftRadius only", () => {
    const r = resolve(parseClass("rounded-tl-lg"));
    expect(r).toEqual({ borderTopLeftRadius: "8px" });
    expect(r.borderTopRightRadius).toBeUndefined();
  });

  it("rounded-tr-lg", () => {
    expect(resolve(parseClass("rounded-tr-lg"))).toEqual({ borderTopRightRadius: "8px" });
  });

  it("rounded-bl-lg", () => {
    expect(resolve(parseClass("rounded-bl-lg"))).toEqual({ borderBottomLeftRadius: "8px" });
  });

  it("rounded-br-lg", () => {
    expect(resolve(parseClass("rounded-br-lg"))).toEqual({ borderBottomRightRadius: "8px" });
  });

  it("rounded-full → borderRadius: 9999px", () => {
    expect(resolve(parseClass("rounded-full"))).toEqual({ borderRadius: "9999px" });
  });
});

describe("resolver — border radius (arbitrary)", () => {
  it("rounded-[6px]", () => {
    expect(resolve(parseClass("rounded-[6px]"))).toEqual({ borderRadius: "6px" });
  });

  it("rounded-t-[12px]", () => {
    expect(resolve(parseClass("rounded-t-[12px]"))).toEqual({ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" });
  });

  it("rounded-tl-[8px]", () => {
    expect(resolve(parseClass("rounded-tl-[8px]"))).toEqual({ borderTopLeftRadius: "8px" });
  });
});

describe("resolver — border style", () => {
  it("border-solid → borderStyle: solid", () => {
    expect(resolve(parseClass("border-solid"))).toEqual({ borderStyle: "solid" });
  });

  it("border-dashed", () => {
    expect(resolve(parseClass("border-dashed"))).toEqual({ borderStyle: "dashed" });
  });
});
