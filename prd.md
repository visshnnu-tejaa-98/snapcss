# Overview

**snapcss** is a lightweight, utility-first runtime CSS engine built in TypeScript.

Instead of writing CSS manually, developers use utility classes directly — no prefix required:

```html
<div class="p-4 bg-red-500 text-center flex items-center justify-center"></div>
```

The engine scans the DOM, parses utility classes, converts them into style objects, and applies inline styles dynamically. No build step, no PostCSS, no configuration file required.

---

# Primary Goals

## Goals

### Core Runtime Engine

- Parse utility classes with no prefix
- Apply styles dynamically as inline styles
- Support responsive modifiers (sm: md: lg: xl: 2xl:)
- Support pseudo states (hover: focus: active: focus-visible:)
- Support dark mode (dark:)
- Support structural modifiers (disabled: first: last: odd: even:)
- Support group-hover via `.group` ancestor class
- Support arbitrary values via bracket notation (e.g. `p-[150px]`, `bg-[#ff5733]`)
- Support theme customization
- Zero CSS files required

---

## Secondary Goals

- Plugin architecture
- Tree-shaking
- SSR support later
- Build-time compiler later
- Framework integrations later

---

# Target Users

- Frontend learners
- JS developers
- Design system creators
- Developers learning compiler/runtime architecture

---

# MVP Features

## Utility Categories

**Layout**

- display
- position
- z-index
- overflow
- visibility

**Flexbox**

- flex
- justify
- align
- gap
- flex-wrap / flex-grow / flex-shrink

**Grid**

- grid-cols
- grid-rows
- col-span / row-span
- gap

**Spacing**

- padding (p, pt, pb, pl, pr, px, py)
- margin (m, mt, mb, ml, mr, mx, my, auto)
- space-between (space-x, space-y)

**Sizing**

- width (w, min-w, max-w)
- height (h, min-h, max-h)
- inset (top, right, bottom, left, inset, inset-x, inset-y)

**Typography**

- font-size (text-xs … text-9xl)
- font-weight (font-thin … font-black)
- line-height (leading-\*)
- letter-spacing (tracking-\*)
- text-align, text-transform, text-decoration
- font-family (font-sans, font-serif, font-mono)
- text-overflow / white-space / line-clamp

**Borders**

- border width (border, border-t, border-b, border-l, border-r, border-x, border-y)
- border radius (rounded, rounded-t, rounded-full, etc.)
- border style (solid, dashed, dotted, double, none)
- border color
- outline

**Backgrounds**

- bg-color (full color palette)
- bg-size (cover, contain)
- bg-position (center, top, bottom, left, right)
- bg-repeat (repeat, no-repeat, repeat-x, repeat-y, round, space)
- bg-attachment (fixed, local, scroll)

**Effects**

- box-shadow
- opacity
- transitions (transition, duration, ease, delay)
- transforms (scale, rotate, translate-x, translate-y, skew-x, skew-y)

**Interactivity**

- cursor
- pointer-events
- user-select
- aspect-ratio
- object-fit / object-position

**States**

- hover:
- focus:
- active:
- focus-visible:

**Responsive**

- sm: (≥ 640px)
- md: (≥ 768px)
- lg: (≥ 1024px)
- xl: (≥ 1280px)
- 2xl: (≥ 1536px)

**Dark Mode**

- dark:

**Structural**

- disabled:
- first:
- last:
- odd:
- even:

**Group**

- group-hover: (requires `.group` on ancestor)

---

# Non-Functional Requirements

## Performance

- Initial scan under 50ms for 1000 nodes
- Parse cache: `Map<string, CSSProperties>` — identical classes never parsed twice
- MutationObserver for dynamically added nodes
- Debounced re-scan on DOM mutations

## Compatibility

- Vanilla JS
- React
- Vue
- Angular
- SSR-safe architecture (browser-only, graceful skip in Node.js)

---

# Architecture Style

Runtime Utility Engine

```
DOM → Scanner → Parser → Resolver → Cache → Style Applier
```

---

# 2. HIGH LEVEL ARCHITECTURE

# System Architecture

```
User HTML
   ↓
DOM Scanner          querySelectorAll("*"), collect all class names
   ↓
Parser Engine        tokenize class string → { modifier, utility, value, isArbitrary }
   ↓
Utility Resolver     map tokens → CSS property/value pairs
   ↓
Style Cache          Map<string, CSSProperties> — skip re-parsing identical classes
   ↓
Inline Style Applier Object.assign(el.style, styles)
```

---

# 3. TECH STACK

## Backend / Tooling

### Express.js Used For

- Playground dev server
- Live preview sandbox

NOT for styling logic.

---

# Main Stack

| Purpose          | Tech           |
| ---------------- | -------------- |
| Runtime engine   | TypeScript     |
| Package bundling | tsup           |
| Dev server       | Express.js     |
| Language         | TypeScript     |
| Docs site        | Vite + React   |
| Playground       | Vite           |
| Linting          | ESLint         |
| Formatting       | Prettier       |
| Monorepo         | npm workspaces |

---

# 4. FOLDER STRUCTURE

```
snapcss/
│
├── packages/
│   ├── core/          ← init(), scanner, applier, group, MutationObserver
│   ├── parser/        ← tokenizer, modifier extractor, parseClass()
│   ├── utilities/     ← spacing, typography, colors, borders, effects, …
│   └── themes/        ← default theme, color palette, spacing scale
│
├── docs-site/         ← Vite + React documentation app
│
├── playground/        ← Express.js + live HTML sandbox
│
├── tests/             ← unit + integration tests
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# 5. CLASS SYNTAX

## Format

```
[modifier:]utility[-value]
```

- **modifier** — optional prefix ending with `:` (e.g. `hover:`, `md:`, `dark:`)
- **utility** — the CSS property group (e.g. `p`, `bg`, `text`, `flex`)
- **value** — a scale token (e.g. `4`, `red-500`, `xl`) or arbitrary value in `[…]`

## Examples

| Class                 | CSS output                                    |
| --------------------- | --------------------------------------------- |
| `p-4`                 | `padding: 16px`                               |
| `m-2`                 | `margin: 4px`                                 |
| `bg-red-500`          | `background-color: #ef4444`                   |
| `text-xl`             | `font-size: 20px`                             |
| `flex`                | `display: flex`                               |
| `items-center`        | `align-items: center`                         |
| `hover:bg-blue-500`   | `background-color: #3b82f6` (on hover)        |
| `md:p-8`              | `padding: 32px` (when ≥ 768px)                |
| `dark:bg-gray-900`    | `background-color: #111827` (dark mode)       |
| `p-[150px]`           | `padding: 150px` (arbitrary value)            |
| `bg-[#ff5733]`        | `background-color: #ff5733` (arbitrary color) |
| `grid-cols-[1fr_2fr]` | `grid-template-columns: 1fr 2fr`              |

---

# 6. PARSING STRATEGY

## Pipeline

```
class string
   ↓
extractModifier()   → { modifier, rest }
   ↓
tokenize(rest)      → string[]
   ↓
resolve(tokens)     → CSSProperties
   ↓
cache.set(cls, styles)
```

## Tokenizer

Input: `"px-[24px]"`
Tokens: `["px", "[24px]"]`

Detects `[` to mark arbitrary value. Underscore inside `[…]` → space.

## Parser examples

```ts
parseClass("pt-2");
// → { modifier: null, utility: "pt", value: "2", isArbitrary: false }

parseClass("pt-[150px]");
// → { modifier: null, utility: "pt", value: "150px", isArbitrary: true }

parseClass("hover:bg-red-500");
// → { modifier: { type: "state", state: "hover" }, utility: "bg", value: "red-500", isArbitrary: false }

parseClass("md:p-4");
// → { modifier: { type: "responsive", breakpoint: "md" }, utility: "p", value: "4", isArbitrary: false }
```

---

# 7. RESPONSIVE SYSTEM

Classes are re-evaluated on `resize`:

```ts
window.addEventListener("resize", () => applyResponsiveClasses());
```

Breakpoints:

```ts
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};
```

Modifier check: `window.innerWidth >= breakpoints[breakpoint]`

---

# 8. HOVER / FOCUS / ACTIVE STATES

Event listeners attached per element:

```ts
el.addEventListener("mouseenter", () => applyStyles(el, hoverStyles));
el.addEventListener("mouseleave", () => removeStyles(el, hoverStyleKeys));
el.addEventListener("focus", () => applyStyles(el, focusStyles));
el.addEventListener("blur", () => removeStyles(el, focusStyleKeys));
```

---

# 9. DARK MODE

Detected via:

```ts
window.matchMedia("(prefers-color-scheme: dark)");
```

Re-evaluated on `change` event. `dark:` classes apply when the media query matches.

---

# 10. GROUP HOVER

Requires `.group` class on an ancestor element:

```html
<div class="group p-4">
  <span class="group-hover:text-white">Reveals on parent hover</span>
</div>
```

Implementation: registers children in a `groupRegistry` Map, attaches `mouseenter`/`mouseleave` listeners on the `.group` root.

---

# 11. THEME SYSTEM

Default theme defined in `packages/themes/src/`:

```ts
export const theme = {
  colors, // full 22-family palette
  spacing, // scale 0.5 → 96
  fontSize, // xs → 9xl
  // …
};
```

User override via `init()`:

```ts
import { init } from "snapcss";

init({
  theme: {
    colors: {
      brand: { 500: "#7c6cf2", 600: "#6d5ce0" },
    },
  },
});
```

Deep-merged with defaults — only overridden keys change.

---

# 12. PERFORMANCE OPTIMIZATION

## Style Cache

```ts
const styleCache = new Map<string, CSSProperties>();
```

Full class string is the cache key (e.g. `"pt-[150px]"`, `"rounded-tl-lg"`).
Identical classes across elements are resolved once.

## MutationObserver

Watches for new nodes / class attribute changes:

```ts
new MutationObserver((mutations) => {
  // collect added nodes, re-scan
}).observe(document.body, { childList: true, subtree: true, attributes: true });
```

## Scanner

Collects all class names from every element. Unknown utilities return `{}` from the resolver and are silently ignored — no opt-in mechanism required.

---

# 13. EXPRESS.JS PLAYGROUND

## server.js

```ts
import express from "express";
const app = express();
app.use(express.static("playground"));
app.listen(3000);
```

## Playground Structure

```
playground/
├── index.html
├── app.js
└── snapcss.js   ← local build output
```

---

# 14. PACKAGE BUILDING

## tsup.config.ts

```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
});
```

Build: `npm run build`

---

# 15. NPM PACKAGE

## package.json

```json
{
  "name": "snapcss",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

---

# 16. DEPLOYMENT FLOW

```bash
npm login
npm publish --access public
```

---

# 17. VERSIONING STRATEGY

Semantic versioning:

| Type  | Example | When                        |
| ----- | ------- | --------------------------- |
| Patch | 1.0.1   | Bug fixes                   |
| Minor | 1.1.0   | New utilities, non-breaking |
| Major | 2.0.0   | Breaking API changes        |

---

# 18. FUTURE ROADMAP

## V2 Features

### Build-Time Compiler

Like Tailwind JIT — scan HTML/JSX at build time, emit a static CSS file. Much faster than runtime parsing.

### Babel / Vite Plugin

Compile utilities at build time inside existing toolchains.

### React / Vue Integrations

```tsx
<SnapProvider theme={customTheme}>
  <App />
</SnapProvider>
```

### CSS Variables Engine

Dynamic theming via CSS custom properties instead of inline styles.

---

# 19. IMPLEMENTATION ORDER

## Week 1

- monorepo setup
- parser (tokenizer, modifier extractor)
- spacing + colors utilities

## Week 2

- typography, flex, grid, positioning utilities
- theme system

## Week 3

- responsive modifier
- hover / focus / active states
- dark mode

## Week 4

- performance optimization (cache, MutationObserver)
- arbitrary values

## Week 5

- group-hover, disabled, first/last/odd/even modifiers
- testing

## Week 6

- docs site (Vite + React)
- playground
- npm publishing
