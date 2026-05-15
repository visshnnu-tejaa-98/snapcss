import { describe, it, expect } from "vitest";
import { JSDOM } from "jsdom";
import { setupStateHandlers } from "../packages/core/src/states";

function setupDOM() {
  const dom = new JSDOM("<!DOCTYPE html><body></body>", { url: "http://localhost" });
  global.document = dom.window.document as unknown as Document;
  global.Node = dom.window.Node as unknown as typeof Node;
  global.Element = dom.window.Element as unknown as typeof Element;
  global.HTMLElement = dom.window.HTMLElement as unknown as typeof HTMLElement;
  return dom.window;
}

describe("state handlers", () => {
  it("hover: applies style on mouseenter and removes on mouseleave", () => {
    const win = setupDOM();
    const el = win.document.createElement("div");

    setupStateHandlers(el, ["hover:bg-red-500"]);

    el.dispatchEvent(new win.MouseEvent("mouseenter"));
    expect((el as HTMLElement).style.backgroundColor).toBeTruthy();

    el.dispatchEvent(new win.MouseEvent("mouseleave"));
    expect((el as HTMLElement).style.backgroundColor).toBe("");
  });

  it("focus: applies style on focus and removes on blur", () => {
    const win = setupDOM();
    const el = win.document.createElement("input");

    setupStateHandlers(el, ["focus:bg-blue-500"]);

    el.dispatchEvent(new win.Event("focus"));
    expect((el as HTMLElement).style.backgroundColor).toBeTruthy();

    el.dispatchEvent(new win.Event("blur"));
    expect((el as HTMLElement).style.backgroundColor).toBe("");
  });

  it("active: applies style on mousedown and removes on mouseup", () => {
    const win = setupDOM();
    const el = win.document.createElement("button");

    setupStateHandlers(el, ["active:opacity-50"]);

    el.dispatchEvent(new win.MouseEvent("mousedown"));
    expect((el as HTMLElement).style.opacity).toBe("0.5");

    el.dispatchEvent(new win.MouseEvent("mouseup"));
    expect((el as HTMLElement).style.opacity).toBe("");
  });

  it("active: removes style on mouseleave (drag-out case)", () => {
    const win = setupDOM();
    const el = win.document.createElement("button");

    setupStateHandlers(el, ["active:opacity-50"]);

    el.dispatchEvent(new win.MouseEvent("mousedown"));
    expect((el as HTMLElement).style.opacity).toBe("0.5");

    el.dispatchEvent(new win.MouseEvent("mouseleave"));
    expect((el as HTMLElement).style.opacity).toBe("");
  });

  it("ignores classes without a state modifier", () => {
    const win = setupDOM();
    const el = win.document.createElement("div");

    expect(() => setupStateHandlers(el, ["p-4", "bg-blue-500"])).not.toThrow();
  });

  it("handles multiple state modifiers on the same element", () => {
    const win = setupDOM();
    const el = win.document.createElement("div");

    setupStateHandlers(el, ["hover:text-white", "hover:bg-violet-500"]);

    el.dispatchEvent(new win.MouseEvent("mouseenter"));
    expect((el as HTMLElement).style.color).toBeTruthy();
    expect((el as HTMLElement).style.backgroundColor).toBeTruthy();

    el.dispatchEvent(new win.MouseEvent("mouseleave"));
    expect((el as HTMLElement).style.color).toBe("");
    expect((el as HTMLElement).style.backgroundColor).toBe("");
  });
});
