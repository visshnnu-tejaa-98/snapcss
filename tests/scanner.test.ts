import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { scanDOM, extractSnapClasses } from "../packages/core/src/scanner";

let dom: JSDOM;
let document: Document;

beforeEach(() => {
  dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    url: "http://localhost",
  });
  document = dom.window.document;
  // @ts-ignore
  global.document = document;
});

describe("extractSnapClasses", () => {
  it("returns all classes from an element's classList", () => {
    const el = document.createElement("div");
    el.className = "p-4 bg-red-500 other-class";
    expect(extractSnapClasses(el)).toEqual(["p-4", "bg-red-500", "other-class"]);
  });

  it("returns empty array for an element with no class attribute", () => {
    const el = document.createElement("div");
    expect(extractSnapClasses(el)).toEqual([]);
  });

  it("handles a single class", () => {
    const el = document.createElement("div");
    el.className = "flex";
    expect(extractSnapClasses(el)).toEqual(["flex"]);
  });
});

describe("scanDOM", () => {
  it("finds all elements that have any class", () => {
    document.body.innerHTML = `
      <div class="p-4 flex">
        <span class="text-xl">hello</span>
        <span class="no-snap">world</span>
      </div>
    `;
    const results = scanDOM(document);
    expect(results).toHaveLength(3);
    expect(results[0].snapClasses).toContain("p-4");
    expect(results[0].snapClasses).toContain("flex");
    expect(results[1].snapClasses).toContain("text-xl");
    expect(results[2].snapClasses).toContain("no-snap");
  });

  it("skips elements with no class attribute", () => {
    document.body.innerHTML = `<div><span>x</span></div>`;
    expect(scanDOM(document)).toHaveLength(0);
  });

  it("accepts a subtree element as root", () => {
    document.body.innerHTML = `<section id="s"><div class="p-4">a</div><p>b</p></section>`;
    const root = document.getElementById("s")!;
    const results = scanDOM(root);
    expect(results).toHaveLength(1);
    expect(results[0].snapClasses).toContain("p-4");
  });
});
