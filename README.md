# @visshnnu-tejaa/snapcss

A lightweight utility-first runtime CSS engine. No build step required — works entirely in the browser, like TailwindCSS but at runtime.

## Features

- Zero build step — drop a script tag and go
- Utility-first class names (Tailwind-compatible syntax)
- Responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- Dark mode support (`dark:`)
- State variants (`hover:`, `focus:`, `focus-visible:`, `active:`)
- Group hover (`group` / `group-hover:`)
- Structural modifiers (`disabled:`, `first:`, `last:`)
- Space between utilities (`space-x-*`, `space-y-*`)
- Dynamic DOM support via MutationObserver
- Themeable via design tokens

## Installation

### npm

```bash
npm install @visshnnu-tejaa/snapcss
```

```js
import { init } from "@visshnnu-tejaa/snapcss";
init();
```

### CDN (browser)

Drop one Script tag - no npm, no builder, no config needed. Auto initialization on `DOMContentLoaded`

```html
<!-- unpkg -->
<script src="https://unpkg.com/@visshnnu-tejaa/snapcss/dist/snapcss.min.js"></script>

<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@visshnnu-tejaa/snapcss/dist/snapcss.min.js"></script>
```

The global `window.SnapCSS` is also exposed if you need to call `SnapCSS.init()` manually

The script auto-initialises on `DOMContentLoaded` — no extra code needed.

## Usage

Add utility classes to any element:

```html
<div class="p-8 bg-cyan-500 text-white rounded-xl hover:bg-violet-500">
  Hello snapcss
</div>
```

## Custom Theme

```js
import { init } from "@visshnnu-tejaa/snapcss";

init({
  theme: {
    colors: {
      brand: { 500: "#22d3ee" },
    },
  },
});
```

## Development

```bash
npm install
npm run build        # compile npm package to dist/
npm run test         # run test suite
npm run playground   # local playground server
```

## License

MIT © Visshnnu Tejaa
