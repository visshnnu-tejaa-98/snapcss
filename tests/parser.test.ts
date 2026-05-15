import { describe, it, expect } from "vitest";
import { parseClass } from "../packages/parser/src";

describe("parseClass — no modifier", () => {
  it("parses simple padding", () => {
    const r = parseClass("p-4");
    expect(r.utility).toBe("p");
    expect(r.value).toBe("4");
    expect(r.isArbitrary).toBe(false);
    expect(r.modifier).toBeNull();
  });

  it("parses directional padding (pt)", () => {
    const r = parseClass("pt-2");
    expect(r.utility).toBe("pt");
    expect(r.value).toBe("2");
    expect(r.isArbitrary).toBe(false);
  });

  it("parses px (padding-x)", () => {
    const r = parseClass("px-4");
    expect(r.utility).toBe("px");
    expect(r.value).toBe("4");
  });

  it("parses arbitrary padding", () => {
    const r = parseClass("p-[150px]");
    expect(r.utility).toBe("p");
    expect(r.value).toBe("150px");
    expect(r.isArbitrary).toBe(true);
  });

  it("parses arbitrary directional padding", () => {
    const r = parseClass("pt-[150px]");
    expect(r.utility).toBe("pt");
    expect(r.value).toBe("150px");
    expect(r.isArbitrary).toBe(true);
  });

  it("parses px-[24px]", () => {
    const r = parseClass("px-[24px]");
    expect(r.utility).toBe("px");
    expect(r.value).toBe("24px");
    expect(r.isArbitrary).toBe(true);
  });

  it("parses py-[2rem]", () => {
    const r = parseClass("py-[2rem]");
    expect(r.utility).toBe("py");
    expect(r.value).toBe("2rem");
    expect(r.isArbitrary).toBe(true);
  });

  it("parses border-t-2", () => {
    const r = parseClass("border-t-2");
    expect(r.utility).toBe("border-t");
    expect(r.value).toBe("2");
    expect(r.isArbitrary).toBe(false);
  });

  it("parses border-t-[3px]", () => {
    const r = parseClass("border-t-[3px]");
    expect(r.utility).toBe("border-t");
    expect(r.value).toBe("3px");
    expect(r.isArbitrary).toBe(true);
  });

  it("parses border-x-[2px]", () => {
    const r = parseClass("border-x-[2px]");
    expect(r.utility).toBe("border-x");
    expect(r.value).toBe("2px");
    expect(r.isArbitrary).toBe(true);
  });

  it("parses rounded-tl-lg", () => {
    const r = parseClass("rounded-tl-lg");
    expect(r.utility).toBe("rounded-tl");
    expect(r.value).toBe("lg");
    expect(r.isArbitrary).toBe(false);
  });

  it("parses rounded-t-[12px]", () => {
    const r = parseClass("rounded-t-[12px]");
    expect(r.utility).toBe("rounded-t");
    expect(r.value).toBe("12px");
    expect(r.isArbitrary).toBe(true);
  });

  it("parses grid-cols-[1fr_2fr_1fr] with underscores → spaces", () => {
    const r = parseClass("grid-cols-[1fr_2fr_1fr]");
    expect(r.utility).toBe("grid-cols");
    expect(r.value).toBe("1fr 2fr 1fr");
    expect(r.isArbitrary).toBe(true);
  });

  it("parses bg-red-500", () => {
    const r = parseClass("bg-red-500");
    expect(r.utility).toBe("bg");
    expect(r.value).toBe("red-500");
    expect(r.isArbitrary).toBe(false);
  });

  it("parses text-xl", () => {
    const r = parseClass("text-xl");
    expect(r.utility).toBe("text");
    expect(r.value).toBe("xl");
  });

  it("parses text-[20px]", () => {
    const r = parseClass("text-[20px]");
    expect(r.utility).toBe("text");
    expect(r.value).toBe("20px");
    expect(r.isArbitrary).toBe(true);
  });

  it("parses inset-x-4", () => {
    const r = parseClass("inset-x-4");
    expect(r.utility).toBe("inset-x");
    expect(r.value).toBe("4");
  });

  it("parses translate-x-4", () => {
    const r = parseClass("translate-x-4");
    expect(r.utility).toBe("translate-x");
    expect(r.value).toBe("4");
  });

  it("parses rotate-[-45deg] with negative value", () => {
    const r = parseClass("rotate-[-45deg]");
    expect(r.utility).toBe("rotate");
    expect(r.value).toBe("-45deg");
    expect(r.isArbitrary).toBe(true);
  });
});

describe("parseClass — modifiers", () => {
  it("parses hover:bg-red-500", () => {
    const r = parseClass("hover:bg-red-500");
    expect(r.modifier).toEqual({ type: "state", state: "hover" });
    expect(r.utility).toBe("bg");
    expect(r.value).toBe("red-500");
  });

  it("parses md:p-4", () => {
    const r = parseClass("md:p-4");
    expect(r.modifier).toEqual({ type: "responsive", breakpoint: "md" });
    expect(r.utility).toBe("p");
    expect(r.value).toBe("4");
  });

  it("parses dark:bg-black", () => {
    const r = parseClass("dark:bg-black");
    expect(r.modifier).toEqual({ type: "dark" });
    expect(r.utility).toBe("bg");
    expect(r.value).toBe("black");
  });

  it("parses focus-visible:outline-2", () => {
    const r = parseClass("focus-visible:outline-2");
    expect(r.modifier).toEqual({ type: "state", state: "focus-visible" });
    expect(r.utility).toBe("outline");
    expect(r.value).toBe("2");
  });

  it("parses disabled:opacity-50", () => {
    const r = parseClass("disabled:opacity-50");
    expect(r.modifier).toEqual({ type: "structural", kind: "disabled" });
    expect(r.utility).toBe("opacity");
    expect(r.value).toBe("50");
  });

  it("parses first:pt-0", () => {
    const r = parseClass("first:pt-0");
    expect(r.modifier).toEqual({ type: "structural", kind: "first" });
    expect(r.utility).toBe("pt");
    expect(r.value).toBe("0");
  });

  it("parses odd:bg-gray-100", () => {
    const r = parseClass("odd:bg-gray-100");
    expect(r.modifier).toEqual({ type: "structural", kind: "odd" });
    expect(r.utility).toBe("bg");
  });

  it("parses group-hover:text-white", () => {
    const r = parseClass("group-hover:text-white");
    expect(r.modifier).toEqual({ type: "group", kind: "group-hover" });
    expect(r.utility).toBe("text");
    expect(r.value).toBe("white");
  });

  it("parses hover:pt-[10px]", () => {
    const r = parseClass("hover:pt-[10px]");
    expect(r.modifier).toEqual({ type: "state", state: "hover" });
    expect(r.utility).toBe("pt");
    expect(r.value).toBe("10px");
    expect(r.isArbitrary).toBe(true);
  });

  it("parses md:px-[24px]", () => {
    const r = parseClass("md:px-[24px]");
    expect(r.modifier).toEqual({ type: "responsive", breakpoint: "md" });
    expect(r.utility).toBe("px");
    expect(r.value).toBe("24px");
    expect(r.isArbitrary).toBe(true);
  });
});
