# Overview

snap is a lightweight utility-first runtime CSS engine built in JavaScript.

Instead of writing CSS manually, developers use utility classes like:

```html
<div class="snap-p-4 snap-bg-red-500 snap-text-center"></div>
```

The engine scans the DOM, parses utility classes, converts them into style objects, and applies inline styles dynamically.

---

# Primary Goals

## Goals

### Core Runtime Engine

- Parse utility classes
- Apply styles dynamically
- Support responsive modifiers
- Support pseudo states
- Support dark mode
- Support themes
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

**Flexbox**

- flex
- justify
- align
- gap

**Grid**

- grid-cols
- grid-rows
- col-span

**Spacing**

- padding
- margin

**Sizing**

- width
- height

**Typography**

- font-size
- font-weight
- line-height
- text-align
- color

**Borders**

- border
- radius

**Backgrounds**

- bg-color

**States**

- hover:
- focus:
- active:

**Responsive**

- sm:
- md:
- lg:
- xl:

**Dark Mode**

- dark:

---

# Non-Functional Requirements

## Performance

- Initial scan under 50ms for 1000 nodes
- Efficient caching
- Avoid duplicate parsing

## Compatibility

- Vanilla JS
- React
- Vue
- Angular
- SSR-safe architecture later

---

# Architecture Style

Runtime Utility Engine

```
DOM → Scanner → Parser → Style Generator → Inline Style Applier
```

---

# 2. HIGH LEVEL ARCHITECTURE

# System Architecture

```
User HTML
   ↓
DOM Scanner
   ↓
Class Extractor
   ↓
Parser Engine
   ↓
Utility Resolver
   ↓
Style Object Generator
   ↓
Inline Style Application
```

---

# 3. TECH STACK

## Backend / Tooling

### Use Express.js For

- Playground server
- Dev server
- Package testing
- Documentation server
- Live preview sandbox

NOT for styling logic.

---

# Main Stack

| Purpose          | Tech          |
| ---------------- | ------------- |
| Runtime engine   | Vanilla JS    |
| Package bundling | Rollup / tsup |
| Dev server       | Express.js    |
| Language         | TypeScript    |
| Playground       | Vite          |
| Docs             | Docusaurus    |
| Linting          | ESLint        |
| Formatting       | Prettier      |

---

# 4. FOLDER STRUCTURE

```
snapcss/
│
├── packages/
│   ├── core/
│   ├── parser/
│   ├── utilities/
│   ├── themes/
│   ├── presets/
│   └── cli/
│
├── playground/
│
├── docs/
│
├── examples/
│
├── tests/
│
├── scripts/
│
├── package.json
├── tsconfig.json
├── turbo.json
└── README.md
```

---

# 5. STEP-BY-STEP DEVELOPMENT ROADMAP

# PHASE 1 — PROJECT SETUP

## Step 1 — Initialize Project

```
mkdir snapcss
cd snapcss
npm init-y
```

---

## Step 2 — Install Dependencies

```
npm install typescript tsup express eslint prettier-D
```

---

## Step 3 — Setup TypeScript

```
npx tsc--init
```

---

## Step 4 — Create Core Structure

```
mkdir src
mkdir playground
mkdir tests
```

---

# PHASE 2 — BUILD THE ENGINE

# Step 5 — Create Utility Config

## spacing.ts

```jsx
export const spacingScale = {
  1: "2px",
  2: "4px",
  3: "8px",
  4: "16px",
  5: "32px",
};
```

---

## typography.ts

```jsx
export const fontSizes = {
  xs: "12px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  xxl: "32px",
  xxxl: "48px",
};
```

---

## colors.ts

```jsx
export const colors = {
  red: {
    100: "#fee2e2",
    500: "#ef4444",
    900: "#7f1d1d",
  },
};
```

---

# Step 6 — Create DOM Scanner

## scanner.ts

```jsx
export function scanDOM() {
  return document.querySelectorAll("*");
}
```

---

# Step 7 — Extract snap-\* Classes

```jsx
export function extractClasses(el:Element) {
	return [...el.classList].filter((c) =>
		c.startsWith("snap-")
  );
}
```

---

# Step 8 — Create Parser Engine

## Example

```jsx
chai - p - 4;
```

Becomes:

```jsx
{
	utility:"p",
	value:"4"
}
```

---

## parser.ts

```jsx
export function parseClass(cls:string) {
	const clean = cls.replace("chai-","");
	const parts = clean.split("-");

	return {
    utility: parts[0],
    value: parts[1],
  };
}
```

---

# Step 9 — Build Utility Resolver

## resolver.ts

```jsx
export function resolveUtility(parsed) {
  switch (parsed.utility) {
    case "p":
      return {
        padding: spacingScale[parsed.value],
      };

    case "bg":
      return {
        backgroundColor: parsed.value,
      };

    default:
      return {};
  }
}
```

---

# Step 10 — Apply Styles

## applier.ts

```jsx
export functionapplyStyles(el,styles) {
	Object.assign(el.style,styles);
}
```

---

# Step 11 — Main Runtime

## index.ts

```jsx
functioninit() {
	const elements = scanDOM();

	elements.forEach((el) => {
	const classes = extractClasses(el);

	classes.forEach((cls) => {
	const parsed=parseClass(cls);
	const styles=resolveUtility(parsed);

	applyStyles(el,styles);
    });
  });
}

document.addEventListener("DOMContentLoaded",init);
```

---

# PHASE 3 — ADD UTILITIES

# Priority Order

## Tier 1

- spacing
- colors
- typography
- flex
- width/height

---

## Tier 2

- grid
- border
- positioning
- overflow

---

## Tier 3

- animation
- transform
- filters

---

# 6. CLASS PARSING STRATEGY

# Example Utility Map

| Class             | CSS                |
| ----------------- | ------------------ |
| chai-p-4          | padding:16px       |
| chai-m-2          | margin:4px         |
| chai-bg-red-500   | background-color   |
| chai-text-xl      | font-size          |
| chai-flex         | display:flex       |
| chai-items-center | align-items:center |

---

# Parser Design

Use tokenized parsing.

## Example

```jsx
chai - bg - red - 500;
```

Tokens:

```jsx
["bg", "red", "500"];
```

Then resolve via maps.

---

# 7. RESPONSIVE SYSTEM

# Example

```html
<div class="snap-md:p-4"></div>
```

Parser:

```jsx
{
	breakpoint:"md",
	utility:"p",
	value:"4"
}
```

Breakpoints:

```jsx
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};
```

Use:

```jsx
window.innerWidth;
```

---

# 8. HOVER / FOCUS STATES

# Example

```jsx
<buttonclass="snap-hover:bg-red-500"></button>
```

Implementation:

```jsx
el.addEventListener("mouseenter", ...)
el.addEventListener("mouseleave", ...)
```

---

# 9. DARK MODE

# Example

```html
<div class="chai-dark:bg-black"></div>
```

Detect:

```jsx
window.matchMedia("(prefers-color-scheme: dark)");
```

---

# 10. THEME SYSTEM

# themes/default.ts

```jsx
export const theme = {
  colors,
  spacing,
  typography,
};
```

Allow user override:

```jsx
chaiTailwind.configure({
  theme: {},
});
```

---

# 11. PERFORMANCE OPTIMIZATION

# Important

Inline styles are expensive.

You need:

## Style Cache

```jsx
Map<string,CSSStyleDeclaration>
```

---

## Mutation Observer

For dynamically added nodes.

```jsx
newMutationObserver(...)
```

---

## Avoid Re-parsing

Cache parsed utilities.

---

# 12. EXPRESS.JS USAGE

# Express Dev Playground

## server.js

```jsx
const express = require("express");
const app = express();

app.use(express.static("playground"));

app.listen(3000);
```

---

# Playground Structure

```
playground/
├── index.html
├── app.js
└── chai-tailwind.js
```

---

# 13. PACKAGE BUILDING

# Use tsup

Install:

```bash
npm install tsup-D
```

---

## tsup.config.ts

```tsx
import { defineConfig } from "tsup";

exportdefaultdefineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
});
```

---

# Build

```bash
npm run build
```

---

# 14. NPM PACKAGE SETUP

# package.json

```jsx
{
  "name":"chai-tailwind",
  "version":"1.0.0",
  "main":"./dist/index.js",
  "types":"./dist/index.d.ts"
}
```

---

# 15. DEPLOYMENT FLOW

# Step-by-Step

## Login

```bash
npm login
```

---

## Publish

```bash
npm publish--access public
```

---

# 16. VERSIONING STRATEGY

Use semantic versioning.

| Type  | Example |
| ----- | ------- |
| Patch | 1.0.1   |
| Minor | 1.1.0   |
| Major | 2.0.0   |

---

# 17. FUTURE ROADMAP

# V2 Features

## Build-Time Compiler

Like Tailwind JIT.

Instead of runtime parsing:

```
HTML → CSS generation
```

Much faster.

---

## Babel Plugin

Compile utilities at build time.

---

## React/Vue Integrations

```html
<ChaiProvider />
```

---

## CSS Variables Engine

Dynamic themes.

---

# 18. RECOMMENDED IMPLEMENTATION ORDER

# Week-by-Week Plan

## Week 1

- setup
- parser
- spacing
- colors

---

## Week 2

- typography
- flex
- grid
- positioning

---

## Week 3

- responsive
- hover/focus
- dark mode

---

## Week 4

- optimization
- caching
- mutation observer

---

## Week 5

- testing
- docs
- npm publishing
