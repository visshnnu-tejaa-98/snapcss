import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import {
  registerGroupElements,
  setupGroupHoverListeners,
  clearGroupRegistry,
} from "../packages/core/src/group";

function setupDOM() {
  const dom = new JSDOM("<!DOCTYPE html><body></body>", { url: "http://localhost" });
  global.document = dom.window.document as unknown as Document;
  global.Node = dom.window.Node as unknown as typeof Node;
  global.Element = dom.window.Element as unknown as typeof Element;
  global.HTMLElement = dom.window.HTMLElement as unknown as typeof HTMLElement;
  return dom.window.document;
}

describe("group hover", () => {
  beforeEach(() => {
    clearGroupRegistry();
  });

  it("ignores elements without a .group ancestor", () => {
    const doc = setupDOM();
    const child = doc.createElement("span");
    child.className = "snap";
    doc.body.appendChild(child);

    // group-hover: class but no .group ancestor — should not register
    expect(() =>
      registerGroupElements([{ el: child, snapClasses: ["group-hover:text-white"] }])
    ).not.toThrow();
  });

  it("registers children under a .group ancestor", () => {
    const doc = setupDOM();
    const group = doc.createElement("div");
    group.className = "group";
    const child = doc.createElement("span");
    group.appendChild(child);
    doc.body.appendChild(group);

    registerGroupElements([{ el: child, snapClasses: ["group-hover:text-white"] }]);

    // Verify listeners work — mouseenter should apply styles
    setupGroupHoverListeners();

    group.dispatchEvent(new doc.defaultView!.MouseEvent("mouseenter"));
    expect((child as HTMLElement).style.color).toBeTruthy();
  });

  it("mouseleave removes applied group styles", () => {
    const doc = setupDOM();
    const group = doc.createElement("div");
    group.className = "group";
    const child = doc.createElement("span");
    group.appendChild(child);
    doc.body.appendChild(group);

    registerGroupElements([{ el: child, snapClasses: ["group-hover:text-white"] }]);
    setupGroupHoverListeners();

    group.dispatchEvent(new doc.defaultView!.MouseEvent("mouseenter"));
    group.dispatchEvent(new doc.defaultView!.MouseEvent("mouseleave"));

    expect((child as HTMLElement).style.color).toBe("");
  });

  it("clearGroupRegistry prevents listeners from being set up", () => {
    const doc = setupDOM();
    const group = doc.createElement("div");
    group.className = "group";
    const child = doc.createElement("span");
    group.appendChild(child);
    doc.body.appendChild(group);

    registerGroupElements([{ el: child, snapClasses: ["group-hover:text-white"] }]);
    clearGroupRegistry();
    setupGroupHoverListeners();

    group.dispatchEvent(new doc.defaultView!.MouseEvent("mouseenter"));
    // No listeners registered after clear — style stays empty
    expect((child as HTMLElement).style.color).toBe("");
  });
});
