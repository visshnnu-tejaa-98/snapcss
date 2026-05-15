import { describe, it, expect, beforeEach, vi } from "vitest";
import { JSDOM } from "jsdom";
import {
  storeDarkClass,
  applyDarkMode,
  clearDarkEntries,
} from "../packages/core/src/darkmode";

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal("window", {
    ...globalThis.window,
    matchMedia: (_query: string) => ({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  });
}

function setupDOM() {
  const dom = new JSDOM("<!DOCTYPE html><body></body>", { url: "http://localhost" });
  vi.stubGlobal("document", dom.window.document);
  return dom.window.document;
}

describe("darkmode", () => {
  beforeEach(() => {
    clearDarkEntries();
    vi.restoreAllMocks();
  });

  it("does not store non-dark classes", () => {
    const doc = setupDOM();
    const el = doc.createElement("div");
    storeDarkClass(el, ["p-4", "hover:bg-red-500"]);
    stubMatchMedia(true);
    expect(() => applyDarkMode()).not.toThrow();
  });

  it("applies dark styles when prefers-color-scheme is dark", () => {
    const doc = setupDOM();
    const el = doc.createElement("div");
    doc.body.appendChild(el);

    storeDarkClass(el, ["dark:bg-gray-900"]);
    stubMatchMedia(true);
    applyDarkMode();

    expect((el as HTMLElement).style.backgroundColor).toBeTruthy();
  });

  it("removes dark styles when prefers-color-scheme is light", () => {
    const doc = setupDOM();
    const el = doc.createElement("div");
    doc.body.appendChild(el);
    (el as HTMLElement).style.backgroundColor = "rgb(17,24,39)";

    storeDarkClass(el, ["dark:bg-gray-900"]);
    stubMatchMedia(false);
    applyDarkMode();

    expect((el as HTMLElement).style.backgroundColor).toBe("");
  });

  it("clearDarkEntries resets state", () => {
    const doc = setupDOM();
    const el = doc.createElement("div");
    doc.body.appendChild(el);

    storeDarkClass(el, ["dark:text-white"]);
    clearDarkEntries();
    stubMatchMedia(true);
    applyDarkMode();

    // Nothing applied because entries were cleared
    expect((el as HTMLElement).style.color).toBe("");
  });
});
