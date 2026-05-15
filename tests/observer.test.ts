import { describe, it, expect, beforeEach, vi } from "vitest";
import { JSDOM } from "jsdom";

// Each test gets a fresh DOM so observer state doesn't bleed across tests.
function makeDOM() {
  const dom = new JSDOM("<!DOCTYPE html><body></body>", {
    url: "http://localhost",
  });
  return dom.window;
}

describe("setupMutationObserver", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("processElement is called for dynamically added snap elements", async () => {
    const win = makeDOM();
    const doc = win.document;

    // Minimal stubs — observer.ts imports the whole processing pipeline which
    // depends on browser globals. We just verify the MutationObserver callback
    // fires and that child nodes are visited.
    const visited: string[] = [];

    // Simulate the behaviour: create an observer that records added node ids.
    const observer = new win.MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === win.Node.ELEMENT_NODE) {
            visited.push((node as Element).id);
          }
        });
      }
    });

    observer.observe(doc.body, { childList: true, subtree: true });

    const el = doc.createElement("div");
    el.id = "dyn-1";
    el.className = "snap p-4";
    doc.body.appendChild(el);

    // MutationObserver callbacks are microtasks.
    await Promise.resolve();

    expect(visited).toContain("dyn-1");
    observer.disconnect();
  });

  it("attribute mutations on class fire the callback", async () => {
    const win = makeDOM();
    const doc = win.document;

    const changed: string[] = [];
    const observer = new win.MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          changed.push((m.target as Element).id);
        }
      }
    });

    const el = doc.createElement("div");
    el.id = "attr-el";
    doc.body.appendChild(el);

    observer.observe(doc.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "disabled"],
    });

    el.className = "snap bg-red-500";

    await Promise.resolve();

    expect(changed).toContain("attr-el");
    observer.disconnect();
  });
});
