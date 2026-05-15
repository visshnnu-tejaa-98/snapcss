import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { JSDOM } from "jsdom";
import {
  storeResponsiveClass,
  applyResponsive,
  clearResponsiveEntries,
} from "../packages/core/src/responsive";

function setupDOM() {
  const dom = new JSDOM("<!DOCTYPE html><body></body>", { url: "http://localhost" });
  global.document = dom.window.document as unknown as Document;
  global.Element = dom.window.Element as unknown as typeof Element;
  global.HTMLElement = dom.window.HTMLElement as unknown as typeof HTMLElement;
  global.window = dom.window as unknown as Window & typeof globalThis;
  return dom.window.document;
}

function setInnerWidth(width: number) {
  Object.defineProperty(global.window, "innerWidth", {
    value: width,
    writable: true,
    configurable: true,
  });
}

describe("responsive", () => {
  beforeEach(() => {
    clearResponsiveEntries();
  });

  afterEach(() => {
    clearResponsiveEntries();
  });

  it("does not store non-responsive classes", () => {
    const doc = setupDOM();
    const el = doc.createElement("div");
    storeResponsiveClass(el, ["p-4", "bg-red-500"]);
    setInnerWidth(800);
    expect(() => applyResponsive()).not.toThrow();
  });

  it("applies responsive style when viewport meets breakpoint", () => {
    const doc = setupDOM();
    const el = doc.createElement("div");
    doc.body.appendChild(el);

    storeResponsiveClass(el, ["md:p-4"]);

    setInnerWidth(1024);
    applyResponsive();

    expect((el as HTMLElement).style.padding).toBe("16px");
  });

  it("removes responsive style when viewport drops below breakpoint", () => {
    const doc = setupDOM();
    const el = doc.createElement("div");
    doc.body.appendChild(el);

    // Use opacity (non-shorthand) because JSDOM's removeProperty has a known
    // bug where shorthand property getters return stale values after removal
    // even though cssText is correctly cleared.
    storeResponsiveClass(el, ["md:opacity-50"]);

    setInnerWidth(1024);
    applyResponsive();
    expect((el as HTMLElement).style.opacity).toBe("0.5");

    setInnerWidth(480);
    applyResponsive();
    expect((el as HTMLElement).style.opacity).toBe("");
  });

  it("applies sm: at exactly 640px", () => {
    const doc = setupDOM();
    const el = doc.createElement("div");
    doc.body.appendChild(el);

    storeResponsiveClass(el, ["sm:text-xl"]);

    setInnerWidth(640);
    applyResponsive();

    expect((el as HTMLElement).style.fontSize).toBeTruthy();
  });

  it("clearResponsiveEntries resets state so applyResponsive is a no-op", () => {
    const doc = setupDOM();
    const el = doc.createElement("div");
    doc.body.appendChild(el);

    storeResponsiveClass(el, ["md:p-4"]);
    clearResponsiveEntries();

    setInnerWidth(1024);
    applyResponsive();

    expect((el as HTMLElement).style.padding).toBe("");
  });
});
